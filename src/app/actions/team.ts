"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne, sql } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { customRoles, invitations, joinRequests, organizations, passwordResets, users, type Role } from "@/lib/db/schema";
import { JOIN_ROLES, newJoinCode, parseDomains, parsePeople } from "@/lib/teamRules";
import { AccessError, authorize, type AuthContext } from "@/lib/auth/dal";
import { assertSeatAvailable } from "@/lib/entitlements";
import { actorOf, audit } from "@/lib/audit";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { newToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/email";
import { appUrl } from "@/lib/url";
import { ALL_PERMISSIONS, BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, PERMISSIONS, permissionsFor, type Permission } from "@/lib/rbac";
import type { FormState } from "./auth";

export type TeamResult = { ok: true; message?: string; link?: string } | { ok: false; error: string };

const INVITE_DAYS = 7;

async function run<T extends TeamResult>(fn: () => Promise<T>): Promise<TeamResult> {
  try {
    const r = await fn();
    revalidatePath("/admin/users");
    return r;
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

/** Resolves a role choice ("admin" or "custom:<id>") and refuses to grant more than the actor holds. */
async function resolveRole(ctx: AuthContext, choice: string): Promise<{ role: Role; customRoleId: string | null; label: string }> {
  const db = await getDb();
  let role: Role;
  let customRoleId: string | null = null;
  let perms: ReadonlySet<Permission>;
  let label: string;
  if (choice.startsWith("custom:")) {
    const [cr] = await db.select().from(customRoles).where(and(eq(customRoles.id, choice.slice(7)), eq(customRoles.organizationId, ctx.org.id)));
    if (!cr) throw new AccessError("That role no longer exists.");
    await authorize("team.manage", { feature: "customRoles" });
    // Custom-role users keep "staff" as their base so they fall back safely if the plan drops custom roles.
    role = "staff";
    customRoleId = cr.id;
    perms = permissionsFor("staff", cr.permissions);
    label = cr.name;
  } else if ((BUILT_IN_ROLE_KEYS as string[]).includes(choice)) {
    role = choice as Role;
    perms = permissionsFor(role);
    label = BUILT_IN_ROLES[role as keyof typeof BUILT_IN_ROLES].label;
  } else throw new AccessError("Choose a role.");
  const escalates = [...perms].filter((p) => !ctx.can(p));
  if (escalates.length) throw new AccessError(`You can't grant permissions you don't have yourself (${escalates.map((p) => PERMISSIONS[p].label.toLowerCase()).join(", ")}).`);
  return { role, customRoleId, label };
}

async function activeOwnerCount(organizationId: string, excludingUserId?: string) {
  const db = await getDb();
  const [r] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(users)
    .where(and(eq(users.organizationId, organizationId), eq(users.role, "owner"), eq(users.status, "active"), ...(excludingUserId ? [ne(users.id, excludingUserId)] : [])));
  return r.n;
}

async function loadMember(ctx: AuthContext, userId: string) {
  const db = await getDb();
  const [member] = await db.select().from(users).where(and(eq(users.id, userId), eq(users.organizationId, ctx.org.id)));
  if (!member) throw new AccessError("That person isn't in your firm.");
  if (member.role === "owner" && ctx.user.role !== "owner") throw new AccessError("Only an owner can change another owner.");
  return member;
}

export async function inviteMember(input: { email: string; role: string }): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage", { write: true });
    const email = z.email({ error: "Enter a valid email address." }).safeParse(input.email.trim().toLowerCase());
    if (!email.success) return { ok: false, error: email.error.issues[0].message };
    const db = await getDb();
    const [exists] = await db.select({ id: users.id, org: users.organizationId }).from(users).where(eq(users.email, email.data));
    if (exists) return { ok: false, error: exists.org === ctx.org.id ? "That person is already in your team." : "That email already has a Capto Learn account with another firm." };
    await assertSeatAvailable(db, ctx.org);
    const { role, customRoleId, label } = await resolveRole(ctx, input.role);

    // Re-inviting the same address replaces any earlier open invitation.
    await db
      .update(invitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(invitations.organizationId, ctx.org.id), eq(invitations.email, email.data), sql`${invitations.acceptedAt} is null and ${invitations.revokedAt} is null`));
    const { token, hash } = newToken();
    await db.insert(invitations).values({
      organizationId: ctx.org.id,
      email: email.data,
      role,
      customRoleId,
      tokenHash: hash,
      invitedBy: ctx.user.id,
      expiresAt: new Date(Date.now() + INVITE_DAYS * 86_400_000),
    });
    const link = `${appUrl()}/invite/${token}`;
    const mail = await sendEmail({
      to: email.data,
      subject: `${ctx.user.name} invited you to ${ctx.org.name} on Capto Learn`,
      fromName: ctx.org.name,
      replyTo: ctx.user.email,
      html: `<p style="font-family:sans-serif">${ctx.user.name} has invited you to join <strong>${ctx.org.name}</strong> on Capto Learn as <strong>${label}</strong>.</p><p style="font-family:sans-serif"><a href="${link}">Accept the invitation</a> — the link expires in ${INVITE_DAYS} days.</p>`,
    });
    await audit(actorOf(ctx), "team.invited", `Invited ${email.data} as ${label}`);
    return mail.sent
      ? { ok: true, message: `Invitation emailed to ${email.data}.`, link }
      : { ok: true, message: "Invitation created. Email isn't set up yet — copy this link and send it to them yourself.", link };
  });
}

export async function revokeInvitation(inviteId: string): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage");
    const db = await getDb();
    const [inv] = await db
      .update(invitations)
      .set({ revokedAt: new Date() })
      .where(and(eq(invitations.id, inviteId), eq(invitations.organizationId, ctx.org.id)))
      .returning({ email: invitations.email });
    if (!inv) return { ok: false, error: "Invitation not found." };
    await audit(actorOf(ctx), "team.invite_revoked", `Revoked the invitation for ${inv.email}`);
    return { ok: true };
  });
}

export async function changeMemberRole(userId: string, choice: string): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage");
    const member = await loadMember(ctx, userId);
    const { role, customRoleId, label } = await resolveRole(ctx, choice);
    if (member.role === "owner" && role !== "owner" && (await activeOwnerCount(ctx.org.id, member.id)) === 0) return { ok: false, error: "Your firm needs at least one owner. Make someone else an owner first." };
    const db = await getDb();
    await db.update(users).set({ role, customRoleId }).where(eq(users.id, member.id));
    await audit(actorOf(ctx), "team.role_changed", `Changed ${member.name}'s role to ${label}`, { type: "user", id: member.id });
    return { ok: true, message: `${member.name} is now ${label}.` };
  });
}

export async function setMemberActive(userId: string, active: boolean): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage");
    if (userId === ctx.user.id) return { ok: false, error: "You can't deactivate yourself." };
    const member = await loadMember(ctx, userId);
    const db = await getDb();
    if (!active && member.role === "owner" && (await activeOwnerCount(ctx.org.id, member.id)) === 0) return { ok: false, error: "Your firm needs at least one active owner." };
    if (active) await assertSeatAvailable(db, ctx.org);
    await db.update(users).set({ status: active ? "active" : "deactivated" }).where(eq(users.id, member.id));
    await audit(actorOf(ctx), active ? "team.reactivated" : "team.deactivated", `${active ? "Reactivated" : "Deactivated"} ${member.name}`, { type: "user", id: member.id });
    return { ok: true, message: `${member.name} ${active ? "can sign in again" : "can no longer sign in"}.` };
  });
}

/** Lets an admin hand someone a reset link directly — the fallback while email isn't configured. */
export async function createResetLink(userId: string): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage");
    const member = await loadMember(ctx, userId);
    if (member.status !== "active") return { ok: false, error: "Reactivate this person first." };
    const { token, hash } = newToken();
    const db = await getDb();
    await db.insert(passwordResets).values({ userId: member.id, tokenHash: hash, expiresAt: new Date(Date.now() + 24 * 3_600_000) });
    await audit(actorOf(ctx), "team.reset_link", `Created a password reset link for ${member.name}`, { type: "user", id: member.id });
    return { ok: true, message: `Send this link to ${member.name} — it works once and expires in 24 hours.`, link: `${appUrl()}/reset-password?token=${token}` };
  });
}

const RoleSchema = z.object({
  name: z.string().trim().min(2, { error: "Give the role a name." }).max(60),
  description: z.string().trim().max(200),
  permissions: z.array(z.enum(ALL_PERMISSIONS as [Permission, ...Permission[]])).min(1, { error: "Tick at least one permission." }),
});

export async function saveCustomRole(id: string | null, input: { name: string; description: string; permissions: string[] }): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("roles.manage", { feature: "customRoles" });
    const parsed = RoleSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
    const beyond = parsed.data.permissions.filter((p) => !ctx.can(p));
    if (beyond.length) return { ok: false, error: "A role can't include permissions you don't have yourself." };
    if (BUILT_IN_ROLE_KEYS.some((k) => BUILT_IN_ROLES[k].label.toLowerCase() === parsed.data.name.toLowerCase())) return { ok: false, error: "That name is used by a built-in role." };
    const db = await getDb();
    if (id) {
      const [u] = await db
        .update(customRoles)
        .set(parsed.data)
        .where(and(eq(customRoles.id, id), eq(customRoles.organizationId, ctx.org.id)))
        .returning({ id: customRoles.id });
      if (!u) return { ok: false, error: "Role not found." };
    } else await db.insert(customRoles).values({ organizationId: ctx.org.id, ...parsed.data });
    await audit(actorOf(ctx), id ? "roles.updated" : "roles.created", `${id ? "Updated" : "Created"} role “${parsed.data.name}”: ${parsed.data.permissions.join(", ")}`);
    revalidatePath("/admin/roles");
    return { ok: true, message: `Role “${parsed.data.name}” saved.` };
  });
}

export async function deleteCustomRole(id: string): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("roles.manage");
    const db = await getDb();
    const [inUse] = await db.select({ n: sql<number>`count(*)::int` }).from(users).where(and(eq(users.customRoleId, id), eq(users.organizationId, ctx.org.id)));
    if (inUse.n > 0) return { ok: false, error: `${inUse.n} ${inUse.n === 1 ? "person has" : "people have"} this role. Move them to another role first.` };
    const [d] = await db
      .delete(customRoles)
      .where(and(eq(customRoles.id, id), eq(customRoles.organizationId, ctx.org.id)))
      .returning({ name: customRoles.name });
    if (!d) return { ok: false, error: "Role not found." };
    await audit(actorOf(ctx), "roles.deleted", `Deleted role “${d.name}”`);
    revalidatePath("/admin/roles");
    return { ok: true };
  });
}

const ProfileSchema = z.object({
  name: z.string().trim().min(1, { error: "Enter your name." }).max(120),
  jobTitle: z.string().trim().max(120).transform((v) => v || null),
  phone: z.string().trim().max(40).transform((v) => v || null),
});

export async function updateMyProfile(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const ctx = await authorize(null);
    const parsed = ProfileSchema.safeParse({ jobTitle: "", phone: "", ...Object.fromEntries(formData) });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const db = await getDb();
    await db.update(users).set(parsed.data).where(eq(users.id, ctx.user.id));
    revalidatePath("/", "layout");
    return { success: "Profile saved." };
  } catch (err) {
    if (err instanceof AccessError) return { error: err.message };
    throw err;
  }
}

const PasswordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, { error: "Enter your current password." }),
    newPassword: z.string().min(10, { error: "New password must be at least 10 characters." }).max(200),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, { error: "The new passwords don't match.", path: ["confirmPassword"] });

export async function changeMyPassword(_: FormState, formData: FormData): Promise<FormState> {
  try {
    const ctx = await authorize(null);
    const parsed = PasswordChangeSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    if (!(await verifyPassword(parsed.data.currentPassword, ctx.user.passwordHash))) return { error: "Your current password is incorrect." };
    const db = await getDb();
    await db.update(users).set({ passwordHash: await hashPassword(parsed.data.newPassword) }).where(eq(users.id, ctx.user.id));
    await audit(actorOf(ctx), "user.password_changed", `${ctx.user.name} changed their password`);
    return { success: "Password changed." };
  } catch (err) {
    if (err instanceof AccessError) return { error: err.message };
    throw err;
  }
}

/* ───────────── Adding several people at once ───────────── */

export interface BulkInviteResult {
  email: string;
  name: string | null;
  ok: boolean;
  message: string;
  link?: string;
}

/** Invites everyone in a pasted list (one per line), each exactly as a single invite would. */
export async function inviteMany(input: { text: string; role: string }): Promise<{ ok: true; results: BulkInviteResult[]; problems: string[] } | { ok: false; error: string }> {
  try {
    await authorize("team.manage", { write: true });
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
  const { people, problems } = parsePeople(input.text.slice(0, 20_000));
  if (!people.length) return { ok: false, error: "No email addresses found. Put one person per line, e.g. “Jo Bloggs, jo@yourfirm.co.uk”." };
  if (people.length > 100) return { ok: false, error: "Up to 100 people at a time, please." };
  const results: BulkInviteResult[] = [];
  for (const p of people) {
    const r = await inviteMember({ email: p.email, role: input.role });
    results.push(r.ok ? { email: p.email, name: p.name, ok: true, message: r.message ?? "Invited", link: r.link } : { email: p.email, name: p.name, ok: false, message: r.error });
  }
  revalidatePath("/admin/users");
  return { ok: true, results, problems };
}

/* ───────────── Firm join link ───────────── */

const JoinSettingsSchema = z.object({
  enabled: z.boolean(),
  role: z.enum(JOIN_ROLES),
  domains: z.string().max(500),
});

export async function saveJoinSettings(input: z.input<typeof JoinSettingsSchema>): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage", { write: true });
    const parsed = JoinSettingsSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Check the join link settings." };
    await resolveRole(ctx, parsed.data.role); // can't hand out more than you hold
    const db = await getDb();
    const domains = parseDomains(parsed.data.domains);
    const set: Partial<typeof organizations.$inferInsert> = { joinEnabled: parsed.data.enabled, joinRole: parsed.data.role, joinDomains: domains };
    if (parsed.data.enabled && !ctx.org.joinCode) set.joinCode = await freeJoinCode();
    await db.update(organizations).set(set).where(eq(organizations.id, ctx.org.id));
    await audit(actorOf(ctx), "team.join_link", parsed.data.enabled ? `Turned the join link on (${parsed.data.role}${domains.length ? `, auto-approve ${domains.join(", ")}` : ", approval required"})` : "Turned the join link off");
    return { ok: true, message: parsed.data.enabled ? "Join link is on." : "Join link is off — it no longer works." };
  });
}

/** A new code, so the old link stops working (e.g. it was shared too widely). */
export async function resetJoinCode(): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage", { write: true });
    const db = await getDb();
    await db.update(organizations).set({ joinCode: await freeJoinCode() }).where(eq(organizations.id, ctx.org.id));
    await audit(actorOf(ctx), "team.join_link", "Replaced the join link (the old one no longer works)");
    return { ok: true, message: "New join link created. The old one no longer works." };
  });
}

async function freeJoinCode(): Promise<string> {
  const db = await getDb();
  for (let i = 0; i < 10; i++) {
    const code = newJoinCode();
    const [taken] = await db.select({ id: organizations.id }).from(organizations).where(eq(organizations.joinCode, code));
    if (!taken) return code;
  }
  throw new AccessError("Couldn't create a join code — please try again.");
}

export async function decideJoinRequest(id: string, approve: boolean): Promise<TeamResult> {
  return run(async () => {
    const ctx = await authorize("team.manage", { write: true });
    const db = await getDb();
    const [req] = await db.select().from(joinRequests).where(and(eq(joinRequests.id, id), eq(joinRequests.organizationId, ctx.org.id), eq(joinRequests.status, "pending")));
    if (!req) return { ok: false, error: "That request has already been dealt with." };
    if (!approve) {
      await db.update(joinRequests).set({ status: "declined", decidedByName: ctx.user.name, decidedAt: new Date() }).where(eq(joinRequests.id, id));
      await audit(actorOf(ctx), "team.join_declined", `Declined ${req.name} <${req.email}>`);
      return { ok: true, message: `Declined ${req.name}.` };
    }
    const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, req.email));
    if (taken) return { ok: false, error: "Someone with that email already has an account." };
    await assertSeatAvailable(db, ctx.org);
    const role = (JOIN_ROLES as readonly string[]).includes(ctx.org.joinRole) ? (ctx.org.joinRole as Role) : "staff";
    await db.insert(users).values({ organizationId: ctx.org.id, email: req.email, name: req.name, passwordHash: req.passwordHash, role });
    await db.update(joinRequests).set({ status: "approved", decidedByName: ctx.user.name, decidedAt: new Date() }).where(eq(joinRequests.id, id));
    await audit(actorOf(ctx), "team.join_approved", `Approved ${req.name} <${req.email}> via the join link`);
    return { ok: true, message: `${req.name} can now sign in.` };
  });
}
