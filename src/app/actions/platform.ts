"use server";

import { revalidatePath } from "next/cache";
import { and, eq, isNull } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { firmInvitations, invitations, organizations, users } from "@/lib/db/schema";
import { AccessError, authorizePlatform, isPlatformAdminEmail } from "@/lib/auth/dal";
import { audit } from "@/lib/audit";
import { PLANS, PLAN_KEYS, TRIAL_DAYS, type PlanKey } from "@/lib/plans";
import { PLATFORM_ROLES, isPlatformRole } from "@/lib/rbac";
import { newToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/email";
import { appUrl } from "@/lib/url";

export type PlatformResult = { ok: true; message: string; link?: string } | { ok: false; error: string };

const FIRM_INVITE_DAYS = 14;

async function guard(fn: () => Promise<PlatformResult>): Promise<PlatformResult> {
  try {
    const r = await fn();
    revalidatePath("/platform");
    return r;
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

/** Customer firms only — the internal Capto workspace is never re-planned or suspended from the console. */
async function customerFirm(orgId: string) {
  const db = await getDb();
  const [org] = await db.select().from(organizations).where(eq(organizations.id, orgId));
  if (!org) throw new AccessError("Firm not found.");
  if (org.kind === "internal") throw new AccessError("That's the internal Capto workspace — it isn't billed or suspended.");
  return { db, org };
}

async function orgAudit(orgId: string, adminName: string, action: string, summary: string) {
  // Recorded on the affected firm's own audit log so its owners can see what Capto changed.
  await audit({ organizationId: orgId, userId: null, name: `${adminName} (Capto)` }, action, summary);
}

export async function setFirmPlan(orgId: string, plan: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.firms.plan");
    if (!PLAN_KEYS.includes(plan as PlanKey)) return { ok: false, error: "Unknown plan." };
    const { db } = await customerFirm(orgId);
    await db
      .update(organizations)
      .set({ plan, trialEndsAt: plan === "trial" ? new Date(Date.now() + TRIAL_DAYS * 86_400_000) : null })
      .where(eq(organizations.id, orgId));
    await orgAudit(orgId, ctx.user.name, "billing.plan_changed", `Plan changed to ${PLANS[plan as PlanKey].label}`);
    return { ok: true, message: `Plan set to ${PLANS[plan as PlanKey].label}.` };
  });
}

export async function extendTrial(orgId: string, days: number): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.firms.plan");
    if (!Number.isInteger(days) || days < 1 || days > 90) return { ok: false, error: "Extend by 1–90 days." };
    const { db, org } = await customerFirm(orgId);
    const base = Math.max(Date.now(), org.trialEndsAt?.getTime() ?? 0);
    await db.update(organizations).set({ plan: "trial", trialEndsAt: new Date(base + days * 86_400_000) }).where(eq(organizations.id, orgId));
    await orgAudit(orgId, ctx.user.name, "billing.trial_extended", `Trial extended by ${days} days`);
    return { ok: true, message: `Trial extended by ${days} days.` };
  });
}

export async function setFirmSuspended(orgId: string, suspended: boolean, reason: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.firms.suspend");
    const { db } = await customerFirm(orgId);
    await db
      .update(organizations)
      .set({ status: suspended ? "suspended" : "active", suspendedReason: suspended ? reason.trim().slice(0, 300) || null : null })
      .where(eq(organizations.id, orgId));
    await orgAudit(orgId, ctx.user.name, suspended ? "firm.suspended" : "firm.reactivated", suspended ? `Account suspended${reason ? `: ${reason}` : ""}` : "Account reactivated");
    return { ok: true, message: suspended ? "Firm suspended — its users now have read-only access." : "Firm reactivated." };
  });
}

const FirmInviteSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).transform((e) => e.trim().toLowerCase()),
  firmName: z.string().trim().min(2, { error: "Enter the firm's name." }).max(120),
  plan: z.enum(PLAN_KEYS as [PlanKey, ...PlanKey[]]),
});

/** The only way a new customer firm can sign up — signup is invitation-only. */
export async function inviteFirm(input: { email: string; firmName: string; plan: string }): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.firms.invite");
    const parsed = FirmInviteSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
    const { email, firmName, plan } = parsed.data;
    const db = await getDb();
    const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    if (taken) return { ok: false, error: "That email already has a Capto Learn account." };
    await db
      .update(firmInvitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(firmInvitations.email, email), isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt)));
    const { token, hash } = newToken();
    const [inv] = await db
      .insert(firmInvitations)
      .values({
        email,
        firmName,
        plan,
        tokenHash: hash,
        invitedByEmail: ctx.user.email,
        expiresAt: new Date(Date.now() + FIRM_INVITE_DAYS * 86_400_000),
      })
      .returning({ id: firmInvitations.id });
    return emailFirmInvite({ id: inv.id, email, firmName, plan: plan as PlanKey, token }, ctx.user.email, "created");
  });
}

async function emailFirmInvite(inv: { id: string; email: string; firmName: string; plan: string; token: string }, replyTo: string, verb: "created" | "renewed"): Promise<PlatformResult> {
  const link = `${appUrl()}/signup?invite=${inv.token}`;
  const planText = inv.plan === "trial" ? ` with a ${TRIAL_DAYS}-day free trial` : PLAN_KEYS.includes(inv.plan as PlanKey) ? ` on the ${PLANS[inv.plan as PlanKey].label} plan` : "";
  const mail = await sendEmail({
    to: inv.email,
    subject: "Your invitation to Capto Learn",
    fromName: "Capto Learn",
    replyTo,
    html: `<p style="font-family:sans-serif">You've been invited to set up <strong>${inv.firmName}</strong> on Capto Learn${planText}.</p><p style="font-family:sans-serif"><a href="${link}">Create your firm's account</a> — the link works once and expires in ${FIRM_INVITE_DAYS} days.</p>`,
    log: { kind: "firm_invite", organizationId: null, relatedId: inv.id },
  });
  return inviteResultMessage(mail, inv.email, link, verb);
}

/** Wording shared by every platform invitation send / re-send. */
function inviteResultMessage(mail: { sent: boolean; skipped?: boolean; error?: string }, email: string, link: string, verb: "created" | "renewed"): PlatformResult {
  const what = verb === "created" ? "Invitation created" : "New invitation link created (the old one no longer works)";
  if (mail.sent) return { ok: true, message: `Invitation ${verb === "created" ? "emailed" : "re-sent"} to ${email}.`, link };
  if (mail.skipped) return { ok: true, message: `${what}. Email isn't set up yet — copy this link and send it yourself.`, link };
  return { ok: true, message: `${what}, but the email couldn't be sent (${mail.error}). Copy this link and send it yourself.`, link };
}

/** Re-sends an open or expired firm invitation with a fresh link (the old one stops working) and a new 14-day expiry. */
export async function resendFirmInvite(id: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.firms.invite");
    const db = await getDb();
    const [inv] = await db
      .select()
      .from(firmInvitations)
      .where(and(eq(firmInvitations.id, id), isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt)));
    if (!inv) return { ok: false, error: "That invitation was already used or revoked." };
    const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, inv.email));
    if (taken) return { ok: false, error: "That email already has a Capto Learn account." };
    const { token, hash } = newToken();
    await db
      .update(firmInvitations)
      .set({ tokenHash: hash, expiresAt: new Date(Date.now() + FIRM_INVITE_DAYS * 86_400_000) })
      .where(eq(firmInvitations.id, inv.id));
    return emailFirmInvite({ id: inv.id, email: inv.email, firmName: inv.firmName, plan: inv.plan, token }, ctx.user.email, "renewed");
  });
}

export async function revokeFirmInvite(id: string): Promise<PlatformResult> {
  return guard(async () => {
    await authorizePlatform("platform.firms.invite");
    const db = await getDb();
    const [r] = await db
      .update(firmInvitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(firmInvitations.id, id), isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt)))
      .returning({ email: firmInvitations.email });
    if (!r) return { ok: false, error: "Invitation not found or already used." };
    return { ok: true, message: `Revoked the invitation for ${r.email}.` };
  });
}

/** Grants or removes a platform role for someone in the internal Capto workspace. */
export async function setPlatformRole(userId: string, role: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.team.manage");
    const db = await getDb();
    const [member] = await db
      .select({ u: users, kind: organizations.kind })
      .from(users)
      .innerJoin(organizations, eq(organizations.id, users.organizationId))
      .where(eq(users.id, userId));
    if (!member || member.kind !== "internal") return { ok: false, error: "Platform roles can only be given to people in the internal Capto workspace." };
    if (isPlatformAdminEmail(member.u.email)) return { ok: false, error: "This person is a permanent super admin (set in PLATFORM_ADMIN_EMAILS) — change it there." };
    const next = role === "none" ? null : role;
    if (next !== null && !isPlatformRole(next)) return { ok: false, error: "Unknown platform role." };
    if (member.u.id === ctx.user.id && next !== "super_admin") return { ok: false, error: "You can't remove your own super admin role." };
    await db.update(users).set({ platformRole: next }).where(eq(users.id, member.u.id));
    await audit(
      { organizationId: member.u.organizationId, userId: ctx.user.id, name: ctx.user.name },
      "platform.role_changed",
      `${member.u.name}'s platform role: ${next ? PLATFORM_ROLES[next].label : "none"}`,
      { type: "user", id: member.u.id }
    );
    return { ok: true, message: `${member.u.name} is now ${next ? PLATFORM_ROLES[next].label : "a regular workspace user"}.` };
  });
}

const PlatformInviteSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  platformRole: z.string().refine((r) => isPlatformRole(r), { error: "Choose a platform role." }),
});

/**
 * Invites someone straight into the internal Capto workspace with a platform role (e.g. Content reviewer), so
 * they arrive ready to work: one step instead of "invite as staff, then grant the role".
 */
export async function invitePlatformMember(input: { email: string; platformRole: string }): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.team.manage");
    if (!ctx.isInternal) return { ok: false, error: "Platform invitations are sent from the internal Capto workspace." };
    const p = PlatformInviteSchema.safeParse({ email: input.email.trim().toLowerCase(), platformRole: input.platformRole });
    if (!p.success) return { ok: false, error: p.error.issues[0]?.message ?? "Check the details." };
    const { email, platformRole } = p.data;
    if (platformRole === "super_admin") return { ok: false, error: "Super admins are set in PLATFORM_ADMIN_EMAILS, not by invitation." };
    const db = await getDb();
    const [exists] = await db.select({ id: users.id, org: users.organizationId }).from(users).where(eq(users.email, email));
    if (exists)
      return {
        ok: false,
        error: exists.org === ctx.org.id ? "They're already in the Capto workspace — change their role in the list below." : "That email already has an account with a customer firm. Use a different email for the reviewer role.",
      };
    // Re-inviting replaces any open invitation for the same address.
    await db.update(invitations).set({ revokedAt: new Date() }).where(and(eq(invitations.organizationId, ctx.org.id), eq(invitations.email, email), isNull(invitations.acceptedAt), isNull(invitations.revokedAt)));
    const { token, hash } = newToken();
    const [inv] = await db
      .insert(invitations)
      .values({ organizationId: ctx.org.id, email, role: "staff", platformRole, tokenHash: hash, invitedBy: ctx.user.id, expiresAt: new Date(Date.now() + PLATFORM_INVITE_DAYS * 86_400_000) })
      .returning({ id: invitations.id });
    const r = await emailPlatformInvite(ctx, { id: inv.id, email, platformRole, token }, "created");
    await audit({ organizationId: ctx.org.id, userId: ctx.user.id, name: ctx.user.name }, "platform.invited", `Invited ${email} as ${PLATFORM_ROLES[platformRole as keyof typeof PLATFORM_ROLES].label}`);
    revalidatePath("/platform/team");
    return r;
  });
}

const PLATFORM_INVITE_DAYS = 7;

async function emailPlatformInvite(ctx: { org: { id: string }; user: { name: string; email: string } }, inv: { id: string; email: string; platformRole: string; token: string }, verb: "created" | "renewed"): Promise<PlatformResult> {
  const link = `${appUrl()}/invite/${inv.token}`;
  const role = isPlatformRole(inv.platformRole) ? PLATFORM_ROLES[inv.platformRole] : null;
  const label = role?.label ?? inv.platformRole;
  const mail = await sendEmail({
    to: inv.email,
    subject: `${ctx.user.name} invited you to Capto Learn as ${label}`,
    fromName: "Capto Learn",
    replyTo: ctx.user.email,
    html: `<p style="font-family:sans-serif">${ctx.user.name} has invited you to join the Capto Learn team as <strong>${label}</strong>${role ? `: ${role.description}` : "."}</p><p style="font-family:sans-serif"><a href="${link}">Accept the invitation</a> — the link expires in ${PLATFORM_INVITE_DAYS} days.</p>`,
    log: { kind: "platform_invite", organizationId: ctx.org.id, relatedId: inv.id },
  });
  return inviteResultMessage(mail, inv.email, link, verb);
}

/** Re-sends an open or expired platform invitation with a fresh link (the old one stops working) and a new 7-day expiry. */
export async function resendPlatformInvitation(id: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.team.manage");
    const db = await getDb();
    const [inv] = await db
      .select()
      .from(invitations)
      .where(and(eq(invitations.id, id), eq(invitations.organizationId, ctx.org.id), isNull(invitations.acceptedAt), isNull(invitations.revokedAt)));
    if (!inv || !inv.platformRole) return { ok: false, error: "That invitation was already accepted or revoked." };
    const [exists] = await db.select({ id: users.id }).from(users).where(eq(users.email, inv.email));
    if (exists) return { ok: false, error: "That email already has a Capto Learn account." };
    const { token, hash } = newToken();
    await db
      .update(invitations)
      .set({ tokenHash: hash, expiresAt: new Date(Date.now() + PLATFORM_INVITE_DAYS * 86_400_000) })
      .where(eq(invitations.id, inv.id));
    const r = await emailPlatformInvite(ctx, { id: inv.id, email: inv.email, platformRole: inv.platformRole, token }, "renewed");
    await audit({ organizationId: ctx.org.id, userId: ctx.user.id, name: ctx.user.name }, "platform.invite_resent", `Re-sent the platform invitation for ${inv.email} (new link)`);
    revalidatePath("/platform/team");
    return r;
  });
}

/** Withdraws an open platform invitation. */
export async function revokePlatformInvitation(id: string): Promise<PlatformResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.team.manage");
    const db = await getDb();
    const [r] = await db
      .update(invitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(invitations.id, id), eq(invitations.organizationId, ctx.org.id), isNull(invitations.acceptedAt), isNull(invitations.revokedAt)))
      .returning({ email: invitations.email });
    if (!r) return { ok: false, error: "Invitation not found or already used." };
    revalidatePath("/platform/team");
    return { ok: true, message: `Revoked the invitation for ${r.email}.` };
  });
}
