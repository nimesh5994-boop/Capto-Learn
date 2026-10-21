"use server";

import { redirect } from "next/navigation";
import { and, eq, gt, isNull } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { firmInvitations, invitations, joinRequests, organizations, passwordResets, users } from "@/lib/db/schema";
import { assertSeatAvailable } from "@/lib/entitlements";
import { domainAllowed, JOIN_ROLES } from "@/lib/teamRules";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { TRIAL_DAYS, planOf } from "@/lib/plans";
import { isPlatformAdminEmail } from "@/lib/auth/dal";
import { isPlatformRole } from "@/lib/rbac";
import { INVITE_ONLY_MESSAGE } from "@/lib/messages";
import { audit } from "@/lib/audit";
import { hashToken, newToken } from "@/lib/tokens";
import { emailConfigured, sendEmail } from "@/lib/email";
import { appUrl } from "@/lib/url";

export type FormState = { error?: string; success?: string } | undefined;

const PasswordSchema = z.string().min(10, { error: "Password must be at least 10 characters." }).max(200);

const SignupSchema = z.object({
  firmName: z.string().trim().min(2, { error: "Enter your firm's name." }).max(120),
  name: z.string().trim().min(1, { error: "Enter your name." }).max(120),
  email: z.email({ error: "Enter a valid email." }).transform((e) => e.toLowerCase()),
  password: PasswordSchema,
  invite: z.string().optional(),
});


/**
 * Signup is invite-only. Two ways in:
 *  - a platform-issued firm invitation (creates a new customer firm on the invited plan), or
 *  - an email listed in PLATFORM_ADMIN_EMAILS (creates the internal Capto workspace — the bootstrap path).
 * Staff joining an existing firm use team invitations instead (acceptInvitation).
 */
export async function signup(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = SignupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const { firmName, name, email, password, invite: inviteToken } = parsed.data;
  const db = await getDb();

  let firmInvite: typeof firmInvitations.$inferSelect | undefined;
  if (inviteToken) {
    [firmInvite] = await db
      .select()
      .from(firmInvitations)
      .where(and(eq(firmInvitations.tokenHash, hashToken(inviteToken)), isNull(firmInvitations.acceptedAt), isNull(firmInvitations.revokedAt), gt(firmInvitations.expiresAt, new Date())));
    if (!firmInvite) return { error: "This invitation has expired or was already used. Ask Capto for a new one." };
    if (firmInvite.email !== email) return { error: `This invitation is for ${firmInvite.email}. Sign up with that email address.` };
  }
  const isPlatformAdmin = isPlatformAdminEmail(email);
  if (!firmInvite && !isPlatformAdmin) return { error: INVITE_ONLY_MESSAGE };

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (existing) return { error: "An account with that email already exists — sign in instead." };

  const plan = firmInvite ? planOf(firmInvite.plan).key : "practice";
  const passwordHash = await hashPassword(password);
  const created = await db.transaction(async (tx) => {
    if (firmInvite) {
      const [claimed] = await tx
        .update(firmInvitations)
        .set({ acceptedAt: new Date() })
        .where(and(eq(firmInvitations.id, firmInvite.id), isNull(firmInvitations.acceptedAt)))
        .returning({ id: firmInvitations.id });
      if (!claimed) return null;
    }
    const [org] = await tx
      .insert(organizations)
      .values({
        name: firmName,
        email,
        plan,
        kind: firmInvite ? "customer" : "internal",
        trialEndsAt: plan === "trial" ? new Date(Date.now() + TRIAL_DAYS * 86_400_000) : null,
      })
      .returning({ id: organizations.id });
    const [user] = await tx.insert(users).values({ organizationId: org.id, email, name, passwordHash, role: "owner", lastLoginAt: new Date() }).returning({ id: users.id });
    if (firmInvite) await tx.update(firmInvitations).set({ organizationId: org.id }).where(eq(firmInvitations.id, firmInvite.id));
    return { orgId: org.id, userId: user.id };
  });
  if (!created) return { error: "This invitation was already used." };

  await audit(
    { organizationId: created.orgId, userId: created.userId, name },
    "firm.created",
    firmInvite ? `Firm created from an invitation by ${firmInvite.invitedByEmail} on the ${planOf(plan).label} plan` : "Internal Capto workspace created by a platform admin"
  );
  await createSession({ userId: created.userId, organizationId: created.orgId });
  redirect(firmInvite ? "/" : "/platform");
}

const LoginSchema = z.object({ email: z.string().trim().toLowerCase(), password: z.string().min(1) });

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter your email and password." };
  const db = await getDb();
  const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email));
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash)))
    return { error: "Incorrect email or password. New here? Capto Learn is invitation-only — use the link from your invitation email to set up your account." };
  if (user.status !== "active") return { error: "This account has been deactivated. Ask an admin in your firm to restore access." };
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
  await createSession({ userId: user.id, organizationId: user.organizationId });
  redirect("/");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}

const AcceptSchema = z.object({ token: z.string().min(20), name: z.string().trim().min(1, { error: "Enter your name." }).max(120), password: PasswordSchema });

export async function acceptInvitation(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = AcceptSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const db = await getDb();
  const [invite] = await db
    .select()
    .from(invitations)
    .where(and(eq(invitations.tokenHash, hashToken(parsed.data.token)), isNull(invitations.acceptedAt), isNull(invitations.revokedAt), gt(invitations.expiresAt, new Date())));
  if (!invite) return { error: "This invitation has expired or was already used. Ask your firm to send a new one." };
  const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, invite.email));
  if (taken) return { error: "An account with this email already exists — sign in instead." };

  const passwordHash = await hashPassword(parsed.data.password);
  const userId = await db.transaction(async (tx) => {
    const [claimed] = await tx
      .update(invitations)
      .set({ acceptedAt: new Date() })
      .where(and(eq(invitations.id, invite.id), isNull(invitations.acceptedAt)))
      .returning({ id: invitations.id });
    if (!claimed) return null;
    // A platform role (e.g. Content reviewer) only ever applies inside the internal Capto workspace.
    const [org] = invite.platformRole ? await tx.select({ kind: organizations.kind }).from(organizations).where(eq(organizations.id, invite.organizationId)) : [];
    const platformRole = invite.platformRole && org?.kind === "internal" && isPlatformRole(invite.platformRole) ? invite.platformRole : null;
    const [u] = await tx
      .insert(users)
      .values({ organizationId: invite.organizationId, email: invite.email, name: parsed.data.name, passwordHash, role: invite.role, customRoleId: invite.customRoleId, platformRole, lastLoginAt: new Date() })
      .returning({ id: users.id });
    return u.id;
  });
  if (!userId) return { error: "This invitation was already used." };

  await audit({ organizationId: invite.organizationId, userId, name: parsed.data.name }, "team.joined", `${parsed.data.name} <${invite.email}> accepted their invitation`);
  await createSession({ userId, organizationId: invite.organizationId });
  redirect("/");
}

export async function requestPasswordReset(_: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const generic = { success: "If that email has an account, we've sent a link to reset the password. It expires in 1 hour." };
  if (!email) return { error: "Enter your email." };
  // Checked before the account lookup so the answer is identical whether or not the email has an account.
  if (!emailConfigured())
    return { error: "Password reset emails aren't switched on for Capto Learn yet. Ask an owner or admin in your firm to create a reset link for you from the Team page." };
  const db = await getDb();
  const [user] = await db.select().from(users).where(and(eq(users.email, email), eq(users.status, "active")));
  if (!user) return generic;
  const { token, hash } = newToken();
  await db.insert(passwordResets).values({ userId: user.id, tokenHash: hash, expiresAt: new Date(Date.now() + 3_600_000) });
  const url = `${appUrl()}/reset-password?token=${token}`;
  const res = await sendEmail({
    to: user.email,
    subject: "Reset your Capto Learn password",
    fromName: "Capto Learn",
    html: `<p style="font-family:sans-serif">Someone asked to reset the password for ${user.email}. <a href="${url}">Choose a new password</a> — the link expires in 1 hour. If this wasn't you, you can ignore this email.</p>`,
    log: { kind: "password_reset", organizationId: user.organizationId, relatedId: user.id },
  });
  if (res.error) console.error("password reset email failed", res.error);
  return generic;
}

const ResetSchema = z.object({ token: z.string().min(20), password: PasswordSchema });

export async function resetPassword(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = ResetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const db = await getDb();
  const [reset] = await db
    .select({ r: passwordResets, u: users })
    .from(passwordResets)
    .innerJoin(users, eq(users.id, passwordResets.userId))
    .where(and(eq(passwordResets.tokenHash, hashToken(parsed.data.token)), isNull(passwordResets.usedAt), gt(passwordResets.expiresAt, new Date())));
  if (!reset) return { error: "This reset link has expired or was already used. Request a new one." };
  if (reset.u.status !== "active") return { error: "This account has been deactivated." };
  await db.update(passwordResets).set({ usedAt: new Date() }).where(eq(passwordResets.id, reset.r.id));
  await db.update(users).set({ passwordHash: await hashPassword(parsed.data.password) }).where(eq(users.id, reset.u.id));
  await audit({ organizationId: reset.u.organizationId, userId: reset.u.id, name: reset.u.name }, "user.password_reset", `${reset.u.name} reset their password`);
  await createSession({ userId: reset.u.id, organizationId: reset.u.organizationId });
  redirect("/");
}

const JoinSchema = z.object({
  code: z.string().max(20),
  name: z.string().trim().min(2, { error: "Enter your name." }).max(120),
  email: z.email({ error: "Enter a valid email." }).transform((e) => e.toLowerCase()),
  password: PasswordSchema,
});

/**
 * Joining through a firm's join link. Emails on the firm's auto-approved domains get an account straight away;
 * anyone else's request waits for an admin to approve it (the password is kept, hashed, until then).
 */
export async function joinFirm(_: FormState, formData: FormData): Promise<FormState> {
  const parsed = JoinSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };
  const db = await getDb();
  const [org] = await db.select().from(organizations).where(and(eq(organizations.joinCode, parsed.data.code.toUpperCase()), eq(organizations.joinEnabled, true)));
  if (!org || org.status !== "active") return { error: "This join link isn't active. Ask your firm for a new one." };
  const [taken] = await db.select({ id: users.id }).from(users).where(eq(users.email, parsed.data.email));
  if (taken) return { error: "An account with this email already exists — sign in instead." };
  const passwordHash = await hashPassword(parsed.data.password);

  if (domainAllowed(parsed.data.email, org.joinDomains)) {
    try {
      await assertSeatAvailable(db, org);
    } catch {
      return { error: `${org.name} has no free seats at the moment. Ask an admin there to free one up.` };
    }
    const role = (JOIN_ROLES as readonly string[]).includes(org.joinRole) ? (org.joinRole as (typeof JOIN_ROLES)[number]) : "staff";
    const [u] = await db.insert(users).values({ organizationId: org.id, email: parsed.data.email, name: parsed.data.name, passwordHash, role, lastLoginAt: new Date() }).returning({ id: users.id });
    await audit({ organizationId: org.id, userId: u.id, name: parsed.data.name }, "team.joined", `${parsed.data.name} <${parsed.data.email}> joined via the join link`);
    await createSession({ userId: u.id, organizationId: org.id });
    redirect("/");
  }

  // Not on an approved domain: one pending request per email, refreshed if they try again.
  await db
    .update(joinRequests)
    .set({ status: "declined", decidedByName: "Replaced by a newer request", decidedAt: new Date() })
    .where(and(eq(joinRequests.organizationId, org.id), eq(joinRequests.email, parsed.data.email), eq(joinRequests.status, "pending")));
  await db.insert(joinRequests).values({ organizationId: org.id, name: parsed.data.name, email: parsed.data.email, passwordHash });
  return { success: `Thanks, ${parsed.data.name.split(" ")[0]} — your request has gone to ${org.name}. You'll be able to sign in with this email and password once an admin approves it.` };
}
