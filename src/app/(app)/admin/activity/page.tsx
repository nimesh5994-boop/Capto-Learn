import Link from "next/link";
import { and, desc, eq, like } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { auditLog } from "@/lib/db/schema";
import { requirePermission } from "@/lib/auth/dal";
import { orgHasFeature } from "@/lib/plans";
import { dateTime } from "@/lib/format";

export const metadata = { title: "Audit log" };

const AREAS = [
  { key: "", label: "Everything" },
  { key: "team", label: "Team" },
  { key: "roles", label: "Roles" },
  { key: "settings", label: "Settings" },
  { key: "training", label: "Training assignments" },
  { key: "billing", label: "Plan" },
  { key: "user", label: "Sign-in & passwords" },
];

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ area?: string }> }) {
  const { area = "" } = await searchParams;
  const ctx = await requirePermission("audit.view");
  if (!orgHasFeature(ctx.org, "auditLog"))
    return (
      <div className="alert alert-info" style={{ maxWidth: 640 }}>
        The audit log is included on the Practice plan. <Link href="/admin/billing">See plans</Link>
      </div>
    );
  const db = await getDb();
  const safeArea = AREAS.some((a) => a.key === area) ? area : "";
  const rows = await db
    .select()
    .from(auditLog)
    .where(safeArea ? and(eq(auditLog.organizationId, ctx.org.id), like(auditLog.action, `${safeArea}.%`)) : eq(auditLog.organizationId, ctx.org.id))
    .orderBy(desc(auditLog.createdAt))
    .limit(300);

  return (
    <div style={{ maxWidth: 1080 }}>
      <div className="page-head">
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Practice admin</div>
          <h1>Activity log</h1>
          <p className="muted">Who changed roles, pricing, overrides and settings — most recent 300 events.</p>
        </div>
      </div>
      <div className="row wrap" style={{ gap: 6, marginBottom: 14 }}>
        {AREAS.map((a) => (
          <Link key={a.key} href={a.key ? `/admin/activity?area=${a.key}` : "/admin/activity"} className={`btn btn-sm ${a.key === safeArea ? "btn-primary" : ""}`}>
            {a.label}
          </Link>
        ))}
      </div>
      <div className="card">
        {rows.length === 0 ? (
          <div className="empty">Nothing recorded yet.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>When</th>
                <th>Who</th>
                <th>What</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="small num" style={{ whiteSpace: "nowrap" }}>
                    {dateTime(r.createdAt)}
                  </td>
                  <td className="small">{r.actorName ?? "System"}</td>
                  <td>
                    {r.summary}
                    <div className="small faint">{r.action}</div>
                  </td>
                  <td className="small faint num">{r.ip ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
