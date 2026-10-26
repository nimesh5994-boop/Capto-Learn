import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { AlertTriangle, Calculator, CheckCircle2, ListChecks, Scale, ShieldAlert } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { planningScenarios } from "@/lib/db/schema";
import { date, dateTime } from "@/lib/format";
import { canViewAnswer } from "@/lib/research/register";
import { suggestCalculators, type CalcSuggestion } from "@/lib/planning/calculators";
import { ReviewPanel } from "@/components/ask/ReviewPanel";
import { PlanningExport } from "@/components/planning/PlanningExport";
import { coverageLine, type IssueConfidence, type PlanningReport } from "@/lib/planning/types";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Tax planning" };

const CONFIDENCE: Record<IssueConfidence, { label: string; cls: string }> = {
  high: { label: "High confidence", cls: "pill-accepted" },
  medium: { label: "Medium confidence", cls: "pill-viewed" },
  low: { label: "Low confidence", cls: "pill-declined" },
};

function Refs({ refs }: { refs: string[] }) {
  if (!refs.length) return null;
  return (
    <span className="small faint">
      {" "}
      · {refs.map((r, i) => (
        <span key={r}>
          {i > 0 ? ", " : ""}
          <a href={`#issue-${r}`}>{r}</a>
        </span>
      ))}
    </span>
  );
}

function List({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

function Report({ report, coverage, calcs }: { report: PlanningReport; coverage: string; calcs: CalcSuggestion[] }) {
  const conf = CONFIDENCE[report.confidence];
  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className={styles.short}>
        <div className="row" style={{ gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
          <strong>Summary</strong>
          <span className={`pill ${conf.cls}`}>{conf.label}</span>
        </div>
        {report.executiveSummary}
        <div className="small muted" style={{ marginTop: 8 }}>
          {coverage}
        </div>
      </div>

      <section className="card card-pad stack" style={{ gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 18 }} className="row">
          <CheckCircle2 size={18} /> &nbsp;Recommendation
        </h2>
        <p style={{ margin: 0, fontWeight: 600 }}>
          {report.recommendation.headline}
          <Refs refs={report.recommendation.issueRefs} />
        </p>
        <p style={{ margin: 0 }}>{report.recommendation.reasoning}</p>
        {report.recommendation.conditions.length > 0 && (
          <div>
            <strong className="small">This holds if:</strong>
            <List items={report.recommendation.conditions} />
          </div>
        )}
      </section>

      <section className="stack" style={{ gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18 }} className="row">
          <Scale size={18} /> &nbsp;Options
        </h2>
        {report.options.map((o, i) => (
          <div key={i} className="card card-pad stack" style={{ gap: 8 }}>
            <h3 style={{ margin: 0 }}>
              {o.name}
              <Refs refs={o.issueRefs} />
            </h3>
            <p style={{ margin: 0 }}>{o.summary}</p>
            {o.suitableWhen && (
              <p className="small muted" style={{ margin: 0 }}>
                <strong>Suits:</strong> {o.suitableWhen}
              </p>
            )}
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              <div>
                <strong className="small">Advantages</strong>
                <List items={o.advantages} />
              </div>
              <div>
                <strong className="small">Disadvantages</strong>
                <List items={o.disadvantages} />
              </div>
            </div>
            <div>
              <strong className="small">Tax effect</strong>
              <p style={{ margin: "4px 0 0" }}>{o.taxEffect}</p>
            </div>
            {o.risks.length > 0 && (
              <div>
                <strong className="small">Risks</strong>
                <List items={o.risks} />
              </div>
            )}
          </div>
        ))}
      </section>

      {report.antiAvoidance.length > 0 && (
        <section className="card card-pad stack" style={{ gap: 6 }}>
          <h2 style={{ margin: 0, fontSize: 18 }} className="row">
            <ShieldAlert size={18} /> &nbsp;Anti-avoidance, penalties and time limits
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {report.antiAvoidance.map((a, i) => (
              <li key={i}>
                {a.point}
                <Refs refs={a.issueRefs} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {report.notCovered.length > 0 && (
        <section className="alert alert-warning stack" style={{ gap: 4 }}>
          <strong className="row">
            <AlertTriangle size={16} /> &nbsp;Not settled by the research — do not rely on these
          </strong>
          <List items={report.notCovered} />
        </section>
      )}

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <section className="card card-pad">
          <h3 style={{ marginTop: 0 }}>Confirm with the client</h3>
          <List items={report.informationNeeded} />
          {!report.informationNeeded.length && <p className="small muted" style={{ margin: 0 }}>Nothing further identified.</p>}
        </section>
        <section className="card card-pad">
          <h3 style={{ marginTop: 0 }}>Assumptions made</h3>
          <List items={report.assumptions} />
          {!report.assumptions.length && <p className="small muted" style={{ margin: 0 }}>None stated.</p>}
        </section>
      </div>

      <section className="card card-pad">
        <h3 style={{ marginTop: 0 }} className="row">
          <ListChecks size={16} /> &nbsp;Next steps
        </h3>
        <ol style={{ margin: "6px 0 0", paddingLeft: 20 }}>
          {report.nextSteps.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </section>

      {calcs.length > 0 && (
        <section className="card card-pad">
          <h3 style={{ marginTop: 0 }} className="row">
            <Calculator size={16} /> &nbsp;Work out the numbers
          </h3>
          <p className="small muted" style={{ margin: "0 0 8px" }}>
            This report does not calculate tax. These Capto calculators fit the issues researched here: run each option through them before advising.
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {calcs.map((c) => (
              <li key={c.id}>
                <Link href={c.href}>{c.label}</Link> <span className="small muted">— {c.why}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default async function PlanningScenarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requirePermission("research.use");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const db = await getDb();
  const [row] = await db
    .select()
    .from(planningScenarios)
    .where(and(eq(planningScenarios.id, id), eq(planningScenarios.organizationId, ctx.org.id)));
  // A scenario is private to the person who ran it, unless they can see the firm's research register.
  if (!row || !canViewAnswer({ organizationId: row.organizationId, userId: row.userId, shared: false, reviewStatus: row.reviewStatus }, { orgId: ctx.org.id, userId: ctx.user.id, canRegister: ctx.can("research.register") })) notFound();

  return (
    <>
      <div className="row between small no-print" style={{ margin: "0 0 10px", gap: 8, flexWrap: "wrap" }}>
        <Link href="/planning">← Tax planning</Link>
        <span className="row" style={{ gap: 6 }}>
          <span className="faint">
            {dateTime(row.createdAt)} · {row.input.taxYear || "no tax year"}
          </span>
          <Link href={`/planning?from=${row.id}`} className="btn btn-sm" title="Opens the form with these facts so you can change something and run it again. Runs fresh research.">
            Edit and re-run
          </Link>
          {row.issues.length > 0 && <PlanningExport id={row.id} initialReference={row.input.reference ?? ""} />}
        </span>
      </div>
      <div className={styles.layout}>
        <div className="stack" style={{ gap: 16 }}>
          <h1 className={styles.question}>{row.title}</h1>
          {row.reviewStatus === "approved" && (
            <div className="alert alert-info small">
              <strong>Reviewed and approved</strong> by {row.reviewedByName ?? "a reviewer"}
              {row.reviewedAt ? ` on ${date(row.reviewedAt)}` : ""}
              {row.reviewNote ? `: ${row.reviewNote}` : "."}
            </div>
          )}
          {row.reviewStatus === "changes" && (
            <div className="alert alert-warning small">
              <strong>A reviewer asked for changes</strong> ({row.reviewedByName ?? "reviewer"}
              {row.reviewedAt ? `, ${date(row.reviewedAt)}` : ""}): {row.reviewNote}. Don&apos;t rely on this report until it is re-run or approved.
            </div>
          )}
          {row.error && <div className={`alert ${row.status === "failed" ? "alert-error" : "alert-warning"}`}>{row.error}</div>}
          {row.report && <Report report={row.report} coverage={coverageLine(row.issues)} calcs={suggestCalculators([row.input.facts, row.input.objectives, ...row.issues.flatMap((i) => [i.title, i.question])], row.input.taxYear)} />}

          <section className="stack" style={{ gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Research behind this report</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Each issue was researched as its own Ask Capto answer, with every quote checked against its source. Open one to see the sources and the exact wording relied on.
            </p>
            {row.issues.map((i) => (
              <div key={i.id} id={`issue-${i.id}`} className="card card-pad stack" style={{ gap: 6 }}>
                <div className="row between" style={{ gap: 8, flexWrap: "wrap" }}>
                  <strong>
                    {i.id} · {i.title}
                  </strong>
                  {i.confidence ? <span className={`pill ${CONFIDENCE[i.confidence].cls}`}>{CONFIDENCE[i.confidence].label}</span> : <span className="pill pill-declined">No answer</span>}
                </div>
                <div className="small muted">{i.question}</div>
                {i.shortAnswer && <div>{i.shortAnswer}</div>}
                {i.error && <div className="small">{i.error}</div>}
                {i.queryId && (
                  <Link href={`/ask/${i.queryId}`} className="small">
                    Open the full cited answer →
                  </Link>
                )}
              </div>
            ))}
          </section>
        </div>
        <aside className="stack" style={{ gap: 14 }}>
          {row.report && ctx.can("research.register") && (
            <ReviewPanel kind="scenario" id={row.id} initial={{ status: row.reviewStatus, by: row.reviewedByName, at: row.reviewedAt?.toISOString() ?? null, note: row.reviewNote }} />
          )}
          <div className="card card-pad stack" style={{ gap: 6 }}>
            <h3 style={{ margin: 0 }}>The situation</h3>
            <p className="small" style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {row.input.facts}
            </p>
            <strong className="small">Objectives</strong>
            <p className="small" style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {row.input.objectives}
            </p>
            {row.input.constraints && (
              <>
                <strong className="small">Constraints</strong>
                <p className="small" style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {row.input.constraints}
                </p>
              </>
            )}
          </div>
          <div className="card card-pad small faint">
            A draft for a qualified adviser to review, not advice to the client. It rests only on the guidance researched above, and the adviser remains responsible for the advice given. Figures need
            calculating separately — see the{" "}
            <Link href="/calculators">calculators</Link>.
          </div>
        </aside>
      </div>
    </>
  );
}
