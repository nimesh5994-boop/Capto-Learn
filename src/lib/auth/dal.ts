import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles, organizations, users, type CustomRole, type Organization, type User } from "@/lib/db/schema";
import { BUILT_IN_ROLES, PLATFORM_ROLES, isBuiltInRole, isPlatformRole, permissionsFor, platformPermissionsFor, type Permission, type PlatformPermission, type PlatformRole } from "@/lib/rbac";
import { accountState, orgHasFeature, type AccountState, type Feature } from "@/lib/plans";
import { readSession } from "./session";

export interface AuthContext {
  user: User;
  org: Organization;
  customRole: CustomRole | null;
  permissions: ReadonlySet<Permission>;
  roleLabel: string;
  state: AccountState;
  /** Holds any platform role (see PLATFORM_ROLES). */
  isPlatformAdmin: boolean;
  platformRole: PlatformRole | null;
  platformCan: (p: PlatformPermission) => boolean;
  /** The Capto operator's own workspace (see lib/db/platformSync.mjs) — not a customer firm. */
  isInternal: boolean;
  can: (p: Permission) => boolean;
}

export function isPlatformAdminEmail(email: string): boolean {
  const list = (process.env.PLATFORM_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

/**
 * Authoritative per-request auth: the session must map to an active user in the same firm.
 * Deactivating a user takes effect on their very next request — no need to revoke cookies.
 */
export const getCurrentUser = cache(async (): Promise<AuthContext | null> => {
  const session = await readSession();
  if (!session) return null;
  const db = await getDb();
  const [row] = await db
    .select({ user: users, org: organizations, customRole: customRoles })
    .from(users)
    .innerJoin(organizations, eq(users.organizationId, organizations.id))
    .leftJoin(customRoles, eq(customRoles.id, users.customRoleId))
    .where(eq(users.id, session.userId));
  if (!row || row.user.organizationId !== session.organizationId || row.user.status !== "active") return null;

  // Custom roles only apply while the firm's plan includes them; otherwise fall back to the base role.
  const customRole = row.customRole && orgHasFeature(row.org, "customRoles") ? row.customRole : null;
  const permissions = permissionsFor(row.user.role, customRole?.permissions);
  const isInternal = row.org.kind === "internal";
  // Bootstrap emails are always Super admin; otherwise a stored platform role only counts inside the internal workspace.
  const platformRole: PlatformRole | null = isPlatformAdminEmail(row.user.email)
    ? "super_admin"
    : isInternal && isPlatformRole(row.user.platformRole)
      ? row.user.platformRole
      : null;
  const platformPermissions = platformPermissionsFor(platformRole);
  const isPlatformAdmin = platformRole !== null;
  return {
    user: row.user,
    org: row.org,
    customRole,
    permissions,
    roleLabel: platformRole && isInternal ? PLATFORM_ROLES[platformRole].label : (customRole?.name ?? (isBuiltInRole(row.user.role) ? BUILT_IN_ROLES[row.user.role].label : row.user.role)),
    state: isInternal ? "active" : accountState(row.org),
    isPlatformAdmin,
    platformRole,
    platformCan: (p) => platformPermissions.has(p),
    isInternal,
    can: (p) => permissions.has(p),
  };
});

export async function requireUser(): Promise<AuthContext> {
  const ctx = await getCurrentUser();
  if (!ctx) redirect("/login");
  return ctx;
}

/** Page guard: sends people without the permission back to the dashboard. */
export async function requirePermission(p: Permission): Promise<AuthContext> {
  const ctx = await requireUser();
  if (!ctx.can(p)) redirect("/?denied=1");
  return ctx;
}

export class AccessError extends Error {}

/** Action guard: throws a user-readable error instead of redirecting, so forms can show it inline. */
export async function authorize(p: Permission | null, opts: { write?: boolean; feature?: Feature } = {}): Promise<AuthContext> {
  const ctx = await getCurrentUser();
  if (!ctx) throw new AccessError("Your session has ended — please sign in again.");
  if (p && !ctx.can(p)) throw new AccessError("You don't have permission to do that. Ask an admin in your firm.");
  if (opts.write && ctx.state === "suspended") throw new AccessError("This account is suspended. Contact support to restore access.");
  if (opts.write && ctx.state === "trial_expired") throw new AccessError("Your free trial has ended — choose a plan on the Billing page to keep learning and using Ask Capto.");
  if (opts.feature && !orgHasFeature(ctx.org, opts.feature)) throw new AccessError("That feature isn't included in your current plan.");
  return ctx;
}

export async function requirePlatform(p: PlatformPermission): Promise<AuthContext> {
  const ctx = await requireUser();
  if (!ctx.platformCan(p)) redirect("/?denied=1");
  return ctx;
}

/** Action guard for the platform layer — throws AccessError instead of redirecting. */
export async function authorizePlatform(p: PlatformPermission): Promise<AuthContext> {
  const ctx = await getCurrentUser();
  if (!ctx) throw new AccessError("Your session has ended — please sign in again.");
  if (!ctx.platformCan(p)) throw new AccessError("Your platform role doesn't allow that.");
  return ctx;
}
