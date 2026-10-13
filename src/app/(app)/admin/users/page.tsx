import Link from "next/link";
import { and, asc, desc, eq, gt, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles, invitations, joinRequests, users } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth/dal";
import { redirect } from "next/navigation";
import { usage } from "@/lib/entitlements";
import { orgHasFeature, orgLimits, planOf } from "@/lib/plans";
import { BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, isBuiltInRole } from "@/lib/rbac";
import { dateTime } from "@/lib/format";
import { emailConfigured } from "@/lib/email";
import { appUrl } from "@/lib/url";
import { StaffAccess } from "./StaffAccess";
import { TeamTable } from "./TeamTable";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const ctx = await requireUser();
  if (!ctx.can("team.manage") && !ctx.can("roles.manage")) redirect("/?denied=1");
  const { org } = ctx;
  const db = await getDb();
  const [members, invites, roles, use, requests] = await Promise.all([
    db.select().from(users).where(eq(users.organizationId, org.id)).orderBy(asc(users.name)),
    db
      .select()
      .from(invitations)
      .where(and(eq(invitations.organizationId, org.id), isNull(invitations.acceptedAt), isNull(invitations.revokedAt), gt(invitations.expiresAt, new Date())))
      .orderBy(desc(invitations.createdAt)),
    db.select().from(customRoles).where(eq(customRoles.organizationId, org.id)).orderBy(asc(customRoles.name)),
    usage(db, org),
    db
      .select()
      .from(joinRequests)
      .where(and(eq(joinRequests.organizationId, org.id), eq(joinRequests.status, "pending")))
      .orderBy(asc(joinRequests.createdAt)),
  ]);
  const plan = planOf(org.plan);
  const customEnabled = orgHasFeature(org, "customRoles");
  const roleOptions = [
    ...BUILT_IN_ROLE_KEYS.map((k) => ({ value: k, label: BUILT_IN_ROLES[k].label, description: BUILT_IN_ROLES[k].description })),
    ...(customEnabled ? roles.map((r) => ({ value: `custom:${r.id}`, label: r.name, description: r.description ?? "Custom role" })) : []),
  ];
  const roleName = (u: { role: string; customRoleId: string | null }) =>
    (u.customRoleId && customEnabled ? roles.find((r) => r.id === u.customRoleId)?.name : null) ?? (isBuiltInRole(u.role) ? BUILT_IN_ROLES[u.role].label : u.role);

  return (
    <div style={{ maxWidth: 1040 }}>
      <div className="page-head">
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Practice admin</div>
          <h1>Users</h1>
          <p className="muted">
            {use.activeUsers} active{use.pendingInvites ? ` · ${use.pendingInvites} invited` : ""} · {orgLimits(org).maxUsers === null ? "unlimited seats" : `${orgLimits(org).maxUsers} seats on ${plan.label}`}
          </p>
        </div>
        {ctx.can("roles.manage") && (
          <Link href="/admin/roles" className="btn">
            Manage roles
          </Link>
        )}
      </div>
      {ctx.can("team.manage") && (
        <StaffAccess
          roleOptions={roleOptions.map(({ value, label }) => ({ value, label }))}
          emailReady={emailConfigured()}
          baseUrl={appUrl()}
          join={{ enabled: org.joinEnabled, code: org.joinCode, role: org.joinRole, domains: org.joinDomains }}
          requests={requests.map((q) => ({ id: q.id, name: q.name, email: q.email, when: dateTime(q.createdAt) }))}
        />
      )}
      {ctx.can("team.manage") ? (
        <TeamTable
          meId={ctx.user.id}
          meIsOwner={ctx.user.role === "owner"}
          roleOptions={roleOptions}
          members={members.map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            roleValue: m.customRoleId && customEnabled ? `custom:${m.customRoleId}` : m.role,
            roleLabel: roleName(m),
            isOwner: m.role === "owner",
            active: m.status === "active",
            lastLogin: m.lastLoginAt ? dateTime(m.lastLoginAt) : "Never",
          }))}
          invites={invites.map((i) => ({ id: i.id, email: i.email, roleLabel: roleName(i), expires: dateTime(i.expiresAt) }))}
        />
      ) : (
        <div className="alert alert-info">You can manage roles but not people. Ask an owner or admin to invite or change team members.</div>
      )}
    </div>
  );
}
