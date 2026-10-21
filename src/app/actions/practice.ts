"use server";

import { revalidatePath } from "next/cache";
import { and, eq, isNull, ne, sql } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { invitations, organizations, passwordResets, users, type Role } from "@/lib/db/schema";
import { AccessError, authorizePlatform, type AuthContext } from "@/lib/auth/dal";
import { audit } from "@/lib/audit";
import { assertSeatAvailable } from "@/lib/entitlements";
import { FEATURE_LABELS, type Feature } from "@/lib/plans";
import { BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, type PlatformPermission } from "@/lib/rbac";
import { newToken } from "@/lib/tokens";
import { sendBuiltEmail } from "@/lib/email";
import { teamInviteEmail } from "@/lib/emailContent";
import { firmBrandOf } from "@/lib/notify";
import { appUrl } from "@/lib/url";

/*
 * Platform-side controls for ONE practice (firm), used by /platform/firms/[id]. Every action is
 * checked against a platform permission and recorded on the practice's own audit log as "(Capto)".
 */

export type PracticeResult = { ok: true; message: string; link?: string } | { ok: false; error: string };

async function run(orgId: string, permission: PlatformPermission, fn: (ctx: AuthContext, org: typeof organizations.$inferSelect) => Promise<PracticeResult>): Promise<PracticeResult> {
  try {
    const ctx = await authorizePlatform(permission);
    const db = await getDb();
    const [org] = await db.select().from(organizations).where(eq(organizations.id, orgId));
    if (!org) return { ok: false, error: "Practice not found." };
    const r = await fn(ctx, org);
    revalidatePath(`/platform/firms/${orgId}`);
    revalidatePath("/platform");
    return r;
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

const log = (orgId: string, ctx: AuthContext, action: string, summary: string, target?: { type: string; id: string }) =>
  audit({ organizationId: orgId, userId: null, name: `${ctx.user.name} (Capto)` }, action, summary, target);

const BillingSchema = z.object({
  customMonthlyPrice: z.union([z.literal(""), z.coerce.number().min(0).max(100_000)]).transform((v) => (v === "" ? null : v)),
  billingEmail: z.union([z.literal(""), z.email({ error: "Enter a valid billing email." })]).transform((v) => v || null),
  platformNotes: z.string().max(5000).transform((v) => v.trim() || null),
});

export async function updatePracticeBilling(orgId: string, input: { customMonthlyPrice: string; billingEmail: string; platformNotes: string }): Promise<PracticeResult> {
  return run(orgId, "platform.firms.plan", async (ctx, org) => {
    if (org.kind === "internal") return { ok: false, error: "The internal Capto workspace isn't billed." };
    const parsed = BillingSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
    const db = await getDb();
    await db.update(organizations).set(parsed.data).where(eq(organizations.id, orgId));
    if (parsed.data.customMonthlyPrice !== org.customMonthlyPrice)
      await log(orgId, ctx, "billing.price_changed", parsed.data.customMonthlyPrice === null ? "Price reset to the plan's list price" : `Agreed price set to £${parsed.data.customMonthlyPrice}/month + VAT`);
    return { ok: true, message: "Billing details saved." };
  });
}

const LimitSchema = z.union([z.literal(""), z.literal("unlimited"), z.coerce.number().int().min(0).max(100_000)]);

/** "" = follow the plan, "unlimited" = no limit, number = custom limit. */
export async function updatePracticeLimits(orgId: string, input: { maxUsers: string; maxResearchPerMonth: string }): Promise<PracticeResult> {
  return run(orgId, "platform.firms.configure", async (ctx, org) => {
    if (org.kind === "internal") return { ok: false, error: "The internal Capto workspace is always unlimited." };
    const u = LimitSchema.safeParse(input.maxUsers.trim());
    const p = LimitSchema.safeParse(input.maxResearchPerMonth.trim());
    if (!u.success || !p.success) return { ok: false, error: "Limits must be a whole number, “unlimited”, or blank to follow the plan." };
    const toOverride = (v: string | number) => (v === "" ? undefined : v === "unlimited" ? null : Number(v));
    const next: { maxUsers?: number | null; maxResearchPerMonth?: number | null } = {};
    const mu = toOverride(u.data);
    const mp = toOverride(p.data);
    if (mu !== undefined) next.maxUsers = mu;
    if (mp !== undefined) next.maxResearchPerMonth = mp;
    const db = await getDb();
    await db.update(organizations).set({ limitOverrides: next }).where(eq(organizations.id, orgId));
    const describe = (v: number | null | undefined) => (v === undefined ? "plan default" : v === null ? "unlimited" : String(v));
    await log(orgId, ctx, "billing.limits_changed", `Limits: users ${describe(next.maxUsers)}, research questions/month ${describe(next.maxResearchPerMonth)}`);
    return { ok: true, message: "Limits saved." };
  });
}

/** mode: "plan" follows the plan, "on"/"off" force the feature for this practice. */
export async function setPracticeFeature(orgId: string, feature: string, mode: "plan" | "on" | "off"): Promise<PracticeResult> {
  return run(orgId, "platform.firms.configure", async (ctx, org) => {
    if (!(feature in FEATURE_LABELS)) return { ok: false, error: "Unknown feature." };
    if (org.kind === "internal") return { ok: false, error: "The internal Capto workspace always has every feature." };
    const overrides = { ...(org.featureOverrides ?? {}) };
    if (mode === "plan") delete overrides[feature];
    else overrides[feature] = mode === "on";
    const db = await getDb();
    await db.update(organizations).set({ featureOverrides: overrides }).where(eq(organizations.id, orgId));
    await log(orgId, ctx, "billing.feature_override", `${FEATURE_LABELS[feature as Feature]}: ${mode === "plan" ? "follows plan" : mode === "on" ? "switched on" : "switched off"}`);
    return { ok: true, message: `${FEATURE_LABELS[feature as Feature]} ${mode === "plan" ? "now follows the plan" : mode === "on" ? "switched on" : "switched off"}.` };
  });
}

async function memberOf(orgId: string, userId: string) {
  const db = await getDb();
  const [m] = await db.select().from(users).where(and(eq(users.id, userId), eq(users.organizationId, orgId)));
  if (!m) throw new AccessError("That person isn't in this practice.");
  return m;
}

async function otherActiveOwners(orgId: string, exceptUserId: string) {
  const db = await getDb();
  const [r] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(and(eq(users.organizationId, orgId), eq(users.role, "owner"), eq(users.status, "active"), ne(users.id, exceptUserId)));
  return r.n;
}

export async function setPracticeUserRole(orgId: string, userId: string, role: string): Promise<PracticeResult> {
  return run(orgId, "platform.firms.users", async (ctx) => {
    if (!(BUILT_IN_ROLE_KEYS as string[]).includes(role)) return { ok: false, error: "Choose a role." };
    const m = await memberOf(orgId, userId);
    if (m.role === "owner" && role !== "owner" && (await otherActiveOwners(orgId, m.id)) === 0) return { ok: false, error: "The practice needs at least one active owner — make someone else owner first." };
    const db = await getDb();
    await db.update(users).set({ role: role as Role, customRoleId: null }).where(eq(users.id, m.id));
    await log(orgId, ctx, "team.role_changed", `Changed ${m.name}'s role to ${BUILT_IN_ROLES[role as keyof typeof BUILT_IN_ROLES].label}`, { type: "user", id: m.id });
    return { ok: true, message: `${m.name} is now ${BUILT_IN_ROLES[role as keyof typeof BUILT_IN_ROLES].label}.` };
  });
}

export async function setPracticeUserActive(orgId: string, userId: string, active: boolean): Promise<PracticeResult> {
  return run(orgId, "platform.firms.users", async (ctx, org) => {
    const m = await memberOf(orgId, userId);
    if (m.id === ctx.user.id) return { ok: false, error: "You can't deactivate yourself." };
    if (!active && m.role === "owner" && (await otherActiveOwners(orgId, m.id)) === 0) return { ok: false, error: "The practice needs at least one active owner." };
    const db = await getDb();
    if (active) await assertSeatAvailable(db, org);
    await db.update(users).set({ status: active ? "active" : "deactivated" }).where(eq(users.id, m.id));
    await log(orgId, ctx, active ? "team.reactivated" : "team.deactivated", `${active ? "Reactivated" : "Deactivated"} ${m.name}`, { type: "user", id: m.id });
    return { ok: true, message: `${m.name} ${active ? "can sign in again" : "can no longer sign in"}.` };
  });
}

export async function createPracticeResetLink(orgId: string, userId: string): Promise<PracticeResult> {
  return run(orgId, "platform.firms.users", async (ctx) => {
    const m = await memberOf(orgId, userId);
    if (m.status !== "active") return { ok: false, error: "Reactivate this person first." };
    const { token, hash } = newToken();
    const db = await getDb();
    await db.insert(passwordResets).values({ userId: m.id, tokenHash: hash, expiresAt: new Date(Date.now() + 24 * 3_600_000) });
    await log(orgId, ctx, "team.reset_link", `Created a password reset link for ${m.name}`, { type: "user", id: m.id });
    return { ok: true, message: `Reset link for ${m.name} — works once, expires in 24 hours.`, link: `${appUrl()}/reset-password?token=${token}` };
  });
}

export async function invitePracticeUser(orgId: string, input: { email: string; role: string }): Promise<PracticeResult> {
  return run(orgId, "platform.firms.users", async (ctx, org) => {
    const email = z.email({ error: "Enter a valid email address." }).safeParse(input.email.trim().toLowerCase());
    if (!email.success) return { ok: false, error: email.error.issues[0].message };
    if (!(BUILT_IN_ROLE_KEYS as string[]).includes(input.role)) return { ok: false, error: "Choose a role." };
    const db = await getDb();
    const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, email.data));
    if (taken) return { ok: false, error: "That email already has a Capto Learn account." };
    await assertSeatAvailable(db, org);
    await db
      .update(invitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(invitations.organizationId, orgId), eq(invitations.email, email.data), isNull(invitations.acceptedAt), isNull(invitations.revokedAt)));
    const { token, hash } = newToken();
    const [inv] = await db
      .insert(invitations)
      .values({ organizationId: orgId, email: email.data, role: input.role as Role, tokenHash: hash, invitedBy: null, expiresAt: new Date(Date.now() + 7 * 86_400_000) })
      .returning({ id: invitations.id });
    const link = `${appUrl()}/invite/${token}`;
    const label = BUILT_IN_ROLES[input.role as keyof typeof BUILT_IN_ROLES].label;
    const mail = await sendBuiltEmail({
      to: email.data,
      email: teamInviteEmail({ firm: firmBrandOf(org), inviterName: null, roleLabel: label, link, expiresAt: new Date(Date.now() + 7 * 86_400_000) }),
      fromName: "Capto Learn",
      log: { kind: "invite", organizationId: orgId, relatedId: inv.id },
    });
    await log(orgId, ctx, "team.invited", `Invited ${email.data} as ${label}`);
    return { ok: true, message: mail.sent ? `Invitation emailed to ${email.data}.` : "Invitation created — email isn't set up yet, so copy this link to them.", link };
  });
}

export async function revokePracticeInvite(orgId: string, inviteId: string): Promise<PracticeResult> {
  return run(orgId, "platform.firms.users", async (ctx) => {
    const db = await getDb();
    const [inv] = await db
      .update(invitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(invitations.id, inviteId), eq(invitations.organizationId, orgId), isNull(invitations.acceptedAt)))
      .returning({ email: invitations.email });
    if (!inv) return { ok: false, error: "Invitation not found." };
    await log(orgId, ctx, "team.invite_revoked", `Revoked the invitation for ${inv.email}`);
    return { ok: true, message: `Revoked the invitation for ${inv.email}.` };
  });
}

export async function renamePractice(orgId: string, name: string): Promise<PracticeResult> {
  return run(orgId, "platform.firms.configure", async (ctx, org) => {
    const clean = name.trim();
    if (clean.length < 2 || clean.length > 120) return { ok: false, error: "Enter a practice name (2–120 characters)." };
    const db = await getDb();
    await db.update(organizations).set({ name: clean }).where(eq(organizations.id, orgId));
    await log(orgId, ctx, "settings.firm", `Practice renamed from “${org.name}” to “${clean}”`);
    return { ok: true, message: "Practice renamed." };
  });
}
