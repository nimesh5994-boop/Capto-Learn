/*
 * Role-based access control. Pure module (no DB) so the same rules drive server enforcement,
 * the sidebar, and the role editor.
 *
 * Built-in roles live in code so every firm gets identical, well-understood defaults; firms on a
 * plan with custom roles can define their own permission sets on top (stored per firm).
 */

export const PERMISSIONS = {
  "learning.view": { group: "Learning", label: "Take courses, exercises and quizzes" },
  "research.use": { group: "Learning", label: "Use Ask Capto (cited research assistant)" },
  "progress.view_team": { group: "Team training", label: "See everyone's training progress", help: "Without this, people only see their own progress." },
  "assignments.manage": { group: "Team training", label: "Assign training and set due dates" },
  "interviews.manage": { group: "Recruitment", label: "Run interview tests for job applicants", help: "Create test links for candidates and see their results and integrity reports." },
  "settings.firm": { group: "Settings", label: "Edit firm details and branding" },
  "team.manage": { group: "Team", label: "Invite, deactivate and change people's roles" },
  "roles.manage": { group: "Team", label: "Create and edit custom roles" },
  "billing.manage": { group: "Account", label: "Manage plan and billing" },
  "audit.view": { group: "Account", label: "View the audit log" },
} as const satisfies Record<string, { group: string; label: string; help?: string }>;

export type Permission = keyof typeof PERMISSIONS;
export const ALL_PERMISSIONS = Object.keys(PERMISSIONS) as Permission[];

export type BuiltInRole = "owner" | "admin" | "manager" | "staff" | "viewer";

export const BUILT_IN_ROLES: Record<BuiltInRole, { label: string; description: string; permissions: readonly Permission[] }> = {
  owner: {
    label: "Owner",
    description: "Full control, including plan and billing. Every firm keeps at least one.",
    permissions: ALL_PERMISSIONS,
  },
  admin: {
    label: "Admin",
    description: "Runs the firm's setup and team — everything except billing.",
    permissions: ALL_PERMISSIONS.filter((p) => p !== "billing.manage"),
  },
  manager: {
    label: "Training manager",
    description: "Learns, researches, assigns training and tracks the whole team's progress.",
    permissions: ["learning.view", "research.use", "progress.view_team", "assignments.manage", "interviews.manage", "audit.view"],
  },
  staff: {
    label: "Staff",
    description: "Takes training and uses Ask Capto; sees their own progress.",
    permissions: ["learning.view", "research.use"],
  },
  viewer: {
    label: "Trainee (courses only)",
    description: "Takes training only — no research assistant.",
    permissions: ["learning.view"],
  },
};

export const BUILT_IN_ROLE_KEYS = Object.keys(BUILT_IN_ROLES) as BuiltInRole[];

export function isBuiltInRole(v: string): v is BuiltInRole {
  return v in BUILT_IN_ROLES;
}

/** Resolves a user's effective permissions from their built-in role or custom role. */
export function permissionsFor(role: string, customRolePermissions?: readonly string[] | null): ReadonlySet<Permission> {
  if (customRolePermissions) return new Set(customRolePermissions.filter((p): p is Permission => p in PERMISSIONS));
  return new Set(isBuiltInRole(role) ? BUILT_IN_ROLES[role].permissions : []);
}

export function permissionGroups(): { group: string; items: { key: Permission; label: string; help?: string }[] }[] {
  const groups = new Map<string, { key: Permission; label: string; help?: string }[]>();
  for (const key of ALL_PERMISSIONS) {
    const def: { group: string; label: string; help?: string } = PERMISSIONS[key];
    if (!groups.has(def.group)) groups.set(def.group, []);
    groups.get(def.group)!.push({ key, label: def.label, help: def.help });
  }
  return [...groups].map(([group, items]) => ({ group, items }));
}

/*
 * Platform (software-operator) RBAC — a separate layer above the firm roles above. Only users in the
 * internal Capto workspace can hold a platform role. Emails in PLATFORM_ADMIN_EMAILS are always
 * Super admin (the bootstrap / break-glass rule, so the operator can never be locked out).
 */
export const PLATFORM_PERMISSIONS = {
  "platform.firms.view": { label: "View every firm, its usage and plan" },
  "platform.firms.invite": { label: "Invite new firms to sign up" },
  "platform.firms.plan": { label: "Change a firm's plan and extend trials" },
  "platform.firms.suspend": { label: "Suspend and reactivate firms" },
  "platform.firms.users": { label: "Manage a firm's users — invite, roles, deactivate, reset links" },
  "platform.firms.configure": { label: "Override a firm's features and limits" },
  "platform.team.manage": { label: "Grant and remove platform roles" },
  "platform.content.review": { label: "Review lessons and handle learners' error reports" },
} as const satisfies Record<string, { label: string }>;

export type PlatformPermission = keyof typeof PLATFORM_PERMISSIONS;
export const ALL_PLATFORM_PERMISSIONS = Object.keys(PLATFORM_PERMISSIONS) as PlatformPermission[];

export type PlatformRole = "super_admin" | "operations" | "content_reviewer" | "billing" | "readonly";

export const PLATFORM_ROLES: Record<PlatformRole, { label: string; description: string; permissions: readonly PlatformPermission[] }> = {
  super_admin: { label: "Software admin (super)", description: "Full control of the platform, including who else can administer it.", permissions: ALL_PLATFORM_PERMISSIONS },
  operations: {
    label: "Operations",
    description: "Onboards and supports firms: invites, trials, users, features, suspensions.",
    permissions: ["platform.firms.view", "platform.firms.invite", "platform.firms.plan", "platform.firms.suspend", "platform.firms.users", "platform.firms.configure", "platform.content.review"],
  },
  content_reviewer: { label: "Content reviewer", description: "Qualified reviewer: signs off lessons and fixes reported errors.", permissions: ["platform.content.review"] },
  billing: { label: "Billing", description: "Manages firms' plans and trials.", permissions: ["platform.firms.view", "platform.firms.plan"] },
  readonly: { label: "Read-only", description: "Can see every firm and its usage, change nothing.", permissions: ["platform.firms.view"] },
};

export const PLATFORM_ROLE_KEYS = Object.keys(PLATFORM_ROLES) as PlatformRole[];

export function isPlatformRole(v: unknown): v is PlatformRole {
  return typeof v === "string" && v in PLATFORM_ROLES;
}

export function platformPermissionsFor(role: PlatformRole | null): ReadonlySet<PlatformPermission> {
  return new Set(role ? PLATFORM_ROLES[role].permissions : []);
}
