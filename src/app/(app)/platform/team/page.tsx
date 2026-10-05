import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { organizations, users } from "@/lib/db/schema";
import { isPlatformAdminEmail, requireUser } from "@/lib/auth/dal";
import { PLATFORM_ROLES, PLATFORM_ROLE_KEYS, isPlatformRole } from "@/lib/rbac";
import { PlatformRoleSelect } from "../PlatformForms";

export const metadata = { title: "Platform team" };

export default async function PlatformTeamPage() {
  const ctx = await requireUser();
  if (!ctx.isPlatformAdmin) redirect("/?denied=1");
  const db = await getDb();
  const internalTeam = await db
    .select({ id: users.id, name: users.name, email: users.email, platformRole: users.platformRole, status: users.status })
    .from(users)
    .innerJoin(organizations, eq(organizations.id, users.organizationId))
    .where(eq(organizations.kind, "internal"))
    .orderBy(asc(users.name));

  return (
    <div className="stack" style={{ gap: 22, maxWidth: 900 }}>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Platform team</h1>
          <p className="muted">Capto staff and what each can do across every practice.</p>
        </div>
      </div>
      <section className="card">
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <h2>Platform team</h2>
          <p className="small muted">
            People in the internal Capto workspace and their platform role. Add colleagues from Team &amp; roles first, then give them a platform role here. Emails in PLATFORM_ADMIN_EMAILS are
            always Super admin.
          </p>
        </div>
        <table className="table">
          <tbody>
            {internalTeam.map((m) => {
              const locked = isPlatformAdminEmail(m.email);
              const current = locked ? "super_admin" : isPlatformRole(m.platformRole) ? m.platformRole : "none";
              return (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 560 }}>{m.name}</div>
                    <div className="small muted">{m.email}</div>
                  </td>
                  <td style={{ width: 280 }}>
                    {ctx.platformCan("platform.team.manage") && !locked && m.id !== ctx.user.id ? (
                      <PlatformRoleSelect userId={m.id} value={current} options={[{ value: "none", label: "No platform access" }, ...PLATFORM_ROLE_KEYS.map((k) => ({ value: k, label: PLATFORM_ROLES[k].label }))]} />
                    ) : (
                      <span>
                        {current === "none" ? "No platform access" : PLATFORM_ROLES[current].label}
                        {locked && <span className="small faint"> · permanent</span>}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

    </div>
  );
}
