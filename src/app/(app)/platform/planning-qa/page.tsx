import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { requirePlatform } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { planningScenarios } from "@/lib/db/schema";
import { STARTERS } from "@/lib/planning/starters";
import { dateTime } from "@/lib/format";
import { costPence } from "@/lib/research/register";
import { RunStarter } from "./RunStarter";

export const metadata = { title: "Planning QA" };

export default async function PlanningQaPage() {
  const ctx = await requirePlatform("platform.content.review");
  const db = await getDb();
  const runs = ctx.isInternal
    ? await db
        .select({ id: planningScenarios.id, input: planningScenarios.input, status: planningScenarios.status, cost: planningScenarios.costMicros, createdAt: planningScenarios.createdAt })
        .from(planningScenarios)
        .where(and(eq(planningScenarios.organizationId, ctx.org.id), eq(planningScenarios.status, "completed")))
        .orderBy(desc(planningScenarios.createdAt))
        .limit(200)
    : [];
  const latest = new Map<string, (typeof runs)[number]>();
  for (const r of runs) if (r.input.qa && !latest.has(r.input.qa.starterId)) latest.set(r.input.qa.starterId, r);
  const scored = [...latest.values()];
  const avg = scored.length ? Math.round(scored.reduce((n, r) => n + (r.input.qa?.pct ?? 0), 0) / scored.length) : null;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Planning QA</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            Runs five invented tax planning scenarios on this live site, with the real knowledge base, and scores each automatically: every issue answered, quotations verified, figures grounded, and the topics a
            competent report must cover. Each run costs about 25–30p. The score checks completeness and sourcing; it cannot judge whether the advice is right, which needs a qualified reviewer reading the memoranda.
          </p>
        </div>
      </div>
      {!ctx.isInternal ? (
        <div className="alert alert-warning">Open the internal Capto workspace to run planning QA.</div>
      ) : (
        <>
          {avg !== null && (
            <div className="row" style={{ gap: 10, marginBottom: 12 }}>
              <span className="pill">{scored.length} of {STARTERS.length} scenarios scored</span>
              <span className={`pill ${avg >= 90 ? "pill-accepted" : avg >= 70 ? "pill-viewed" : "pill-declined"}`}>Average {avg}%</span>
            </div>
          )}
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Last run</th>
                  <th>Score</th>
                  <th>What failed</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {STARTERS.map((s) => {
                  const r = latest.get(s.id);
                  const qa = r?.input.qa;
                  return (
                    <tr key={s.id}>
                      <td style={{ minWidth: 220 }}>
                        {r ? <Link href={`/planning/${r.id}`}>{s.label}</Link> : s.label}
                        <div className="small faint">{s.input.title}</div>
                      </td>
                      <td className="small" style={{ whiteSpace: "nowrap" }}>
                        {r ? dateTime(r.createdAt) : "Never run"}
                        {r && <div className="faint">{costPence(r.cost)}p</div>}
                      </td>
                      <td>{qa ? <span className={`pill ${qa.pct >= 90 ? "pill-accepted" : qa.pct >= 70 ? "pill-viewed" : "pill-declined"}`}>{qa.pct}% ({qa.passed}/{qa.total})</span> : "—"}</td>
                      <td className="small" style={{ minWidth: 200 }}>
                        {qa ? (qa.failed.length ? qa.failed.join("; ") : "Nothing failed") : "—"}
                      </td>
                      <td className="right">
                        <RunStarter id={s.id} label={s.label} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
