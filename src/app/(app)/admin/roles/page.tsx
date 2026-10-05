import Link from "next/link";
import { asc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { customRoles } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { orgHasFeature } from "@/lib/plans";
import { BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, PERMISSIONS, permissionGroups } from "@/lib/rbac";
import { RoleEditor } from "./RoleEditor";

export const metadata = { title: "Roles" };

export default async function RolesPage() {
  const ctx = await requirePermission("roles.manage");
  const db = await getDb();
  const enabled = orgHasFeature(ctx.org, "customRoles");
  const roles = await db
    .select({ role: customRoles, members: sql<number>`(select count(*)::int from users u where u.custom_role_id = "custom_roles"."id")` })
    .from(customRoles)
    .where(eq(customRoles.organizationId, ctx.org.id))
    .orderBy(asc(customRoles.name));

  return (
    <div style={{ maxWidth: 1040 }}>
      <div className="page-head">
        <div>
          <Link href="/admin/users" className="small">
            ← Team
          </Link>
          <h1 style={{ marginTop: 6 }}>Roles & permissions</h1>
          <p className="muted">Built-in roles cover most firms. Create custom roles when you need a different mix.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20, overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Permission</th>
              {BUILT_IN_ROLE_KEYS.map((k) => (
                <th key={k} style={{ textAlign: "center" }}>
                  {BUILT_IN_ROLES[k].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionGroups().flatMap((g) =>
              g.items.map((item) => (
                <tr key={item.key}>
                  <td>
                    <span className="small faint">{g.group} · </span>
                    {item.label}
                  </td>
                  {BUILT_IN_ROLE_KEYS.map((k) => (
                    <td key={k} style={{ textAlign: "center" }} aria-label={BUILT_IN_ROLES[k].permissions.includes(item.key) ? "Yes" : "No"}>
                      {BUILT_IN_ROLES[k].permissions.includes(item.key) ? "✓" : <span className="faint">—</span>}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginBottom: 12 }}>Custom roles</h2>
      {!enabled ? (
        <div className="alert alert-info">
          Custom roles are included on the Professional and Practice plans. <Link href="/admin/billing">See plans</Link>
        </div>
      ) : (
        <RoleEditor
          groups={permissionGroups()}
          granted={Object.keys(PERMISSIONS).filter((p) => ctx.can(p as keyof typeof PERMISSIONS))}
          roles={roles.map(({ role, members }) => ({ id: role.id, name: role.name, description: role.description ?? "", permissions: role.permissions, members }))}
        />
      )}
    </div>
  );
}
