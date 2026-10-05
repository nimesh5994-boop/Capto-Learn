import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { organizations } from "@/lib/db/schema";
import { requirePlatform } from "@/lib/auth/dal";
import { accountState, planOf, PLANS, PLAN_KEYS } from "@/lib/plans";
import { PLATFORM_ROLES } from "@/lib/rbac";
import { date, money } from "@/lib/format";
import { FirmControls } from "./FirmControls";

export const metadata = { title: "Platform admin" };

export default async function PlatformPage() {
  const ctx = await requirePlatform("platform.firms.view");
  const db = await getDb();
  const [firms] = await Promise.all([
    db
      .select({
        org: organizations,
        // Correlated subqueries spelled out with explicit aliases: drizzle renders bare column names inside
        // sql``, which inside a subquery would silently bind to the inner table instead of the outer firm.
        users: sql<number>`(select count(*)::int from users u where u.organization_id = "organizations"."id" and u.status = 'active')`,
        lessons: sql<number>`(select count(*)::int from lesson_progress p where p.organization_id = "organizations"."id" and p.status = 'completed')`,
        research: sql<number>`(select count(*)::int from research_queries r where r.organization_id = "organizations"."id")`,
        owner: sql<string>`(select u.email from users u where u.organization_id = "organizations"."id" and u.role = 'owner' order by u.created_at limit 1)`,
      })
      .from(organizations)
      .orderBy(desc(organizations.createdAt)),
  ]);

  const customers = firms.filter((f) => f.org.kind !== "internal");
  const mrr = customers.reduce((s, f) => s + (f.org.status === "active" && f.org.plan !== "trial" ? (planOf(f.org.plan).monthlyPrice ?? 0) : 0), 0);
  const counts = Object.fromEntries(PLAN_KEYS.map((k) => [k, customers.filter((f) => f.org.plan === k).length]));
  const canManage = { plan: ctx.platformCan("platform.firms.plan"), suspend: ctx.platformCan("platform.firms.suspend") };

  return (
    <div className="stack" style={{ gap: 22 }}>
      <div className="page-head" style={{ marginBottom: 0 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Firms</h1>
          <p className="muted">
            Signed in as {ctx.user.email} · <strong>{ctx.platformRole ? PLATFORM_ROLES[ctx.platformRole].label : ""}</strong>. Changes to a firm are recorded on that firm&apos;s own audit log.
          </p>
        </div>
      </div>

      <div className="row wrap" style={{ gap: 14 }}>
        <Stat label="Customer firms" value={customers.length} />
        <Stat label="List MRR (paid plans)" value={money(mrr)} />
        {PLAN_KEYS.map((k) => (
          <Stat key={k} label={PLANS[k].label} value={counts[k]} />
        ))}
      </div>

      <section className="card" style={{ overflowX: "auto" }}>
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <h2>Customer firms</h2>
        </div>
        {customers.length === 0 ? (
          <div className="empty">No customer firms yet — <Link href="/platform/invitations">invite one</Link>.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Firm</th>
                <th>Plan</th>
                <th className="right">Users</th>
                <th className="right">Lessons done</th>
                <th className="right">Ask Capto</th>
                <th>Created</th>
                {(canManage.plan || canManage.suspend) && <th>Quick actions</th>}
              </tr>
            </thead>
            <tbody>
              {customers.map((f) => {
                const state = accountState(f.org);
                return (
                  <tr key={f.org.id}>
                    <td>
                      <Link href={`/platform/firms/${f.org.id}`} style={{ fontWeight: 560 }}>
                        {f.org.name}
                      </Link>
                      <div className="small muted">{f.owner}</div>
                    </td>
                    <td>
                      {planOf(f.org.plan).label}
                      <div className="small">
                        {state === "suspended" ? (
                          <span className="pill pill-declined">Suspended</span>
                        ) : state === "trial_expired" ? (
                          <span className="pill pill-viewed">Trial ended</span>
                        ) : state === "trial" ? (
                          <span className="faint">until {date(f.org.trialEndsAt)}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="right num">{f.users}</td>
                    <td className="right num">{f.lessons}</td>
                    <td className="right num">{f.research}</td>
                    <td className="small muted">{date(f.org.createdAt)}</td>
                    {(canManage.plan || canManage.suspend) && (
                      <td>
                        <FirmControls orgId={f.org.id} plan={f.org.plan} suspended={f.org.status === "suspended"} canPlan={canManage.plan} canSuspend={canManage.suspend} />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card card-pad">
      <div className="small muted">{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
