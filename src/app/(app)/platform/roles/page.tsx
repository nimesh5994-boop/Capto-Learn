import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { ALL_PLATFORM_PERMISSIONS, PLATFORM_PERMISSIONS, PLATFORM_ROLES, PLATFORM_ROLE_KEYS } from "@/lib/rbac";

export const metadata = { title: "Platform roles" };

export default async function PlatformRolesPage() {
  const ctx = await requireUser();
  if (!ctx.platformCan("platform.team.manage")) redirect("/?denied=1");
  return (
    <div className="stack" style={{ gap: 22, maxWidth: 1040 }}>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Platform roles</h1>
          <p className="muted">What each platform role can do. Assign roles on the Platform team page.</p>
        </div>
      </div>
      <section className="card" style={{ overflowX: "auto" }}>
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <h2>Platform roles</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Platform permission</th>
              {PLATFORM_ROLE_KEYS.map((k) => (
                <th key={k} style={{ textAlign: "center" }} title={PLATFORM_ROLES[k].description}>
                  {PLATFORM_ROLES[k].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_PLATFORM_PERMISSIONS.map((p) => (
              <tr key={p}>
                <td>{PLATFORM_PERMISSIONS[p].label}</td>
                {PLATFORM_ROLE_KEYS.map((k) => (
                  <td key={k} style={{ textAlign: "center" }}>
                    {PLATFORM_ROLES[k].permissions.includes(p) ? "✓" : <span className="faint">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
