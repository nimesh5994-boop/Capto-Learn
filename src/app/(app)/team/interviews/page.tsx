import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { UserCheck } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { interviewTests } from "@/lib/db/schema";
import { tracks } from "@/content";
import { AREAS } from "@/lib/learning/placement";
import { judgeIntegrity } from "@/lib/interviews/rules";
import { interviewsThisMonth, settle } from "@/lib/interviews/store";
import { interviewLimit } from "@/lib/plans";
import { date, dateTime } from "@/lib/format";
import { daysAgo } from "@/lib/time";
import { EmptyState } from "@/components/EmptyState";
import { NewInterview } from "./NewInterview";
import { RowActions } from "./RowActions";


export const metadata = { title: "Interview tests" };

const FLAG = { clear: { label: "No concerns", cls: "pill-accepted" }, review: { label: "Review", cls: "pill-viewed" }, concern: { label: "Concern", cls: "pill-declined" } } as const;

export default async function InterviewsPage() {
  const ctx = await requireUser();
  if (!ctx.can("interviews.manage")) redirect("/?denied=1");
  const db = await getDb();
  const rows = await Promise.all((await db.select().from(interviewTests).where(eq(interviewTests.organizationId, ctx.org.id)).orderBy(desc(interviewTests.createdAt)).limit(200)).map(settle));
  const used = await interviewsThisMonth(ctx.org.id);
  const limit = interviewLimit(ctx.org);
  const all = tracks().map((t) => t.slug);
  const areas = AREAS.map((a) => ({ key: a.key, label: a.label, tracks: a.tracks.length ? a.tracks : all }));
  const now = daysAgo(0).getTime();

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Interview tests</h1>
          <p className="muted">
            Check a job applicant&apos;s technical knowledge before or during interview. They get a one-time link or code — no account — sign a no-AI declaration, and take a timed test in full
            screen. You see their score, where they&apos;re strong and weak, and an integrity report.
          </p>
        </div>
        <span className="pill">{limit === null ? `${used} this month` : `${used} of ${limit} used this month`}</span>
      </div>

      <section className="card card-pad" style={{ marginBottom: 18 }}>
        <h2 style={{ margin: "0 0 14px" }}>New test</h2>
        {limit === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            Interview tests aren&apos;t included in your plan. <Link href="/admin/billing">See Plan &amp; billing</Link>.
          </p>
        ) : (
          <NewInterview areas={areas} courses={tracks().map((t) => ({ slug: t.slug, title: t.title }))} firmName={ctx.org.name} />
        )}
      </section>

      {rows.length === 0 ? (
        <EmptyState icon={UserCheck} title="No interview tests yet" text="Set one up above and send the candidate the link or code. Results appear here as soon as they finish." />
      ) : (
        <section className="card" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Status</th>
                <th className="right">Score</th>
                <th>Integrity</th>
                <th>Code</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const integrity = r.status === "completed" || r.status === "started" ? judgeIntegrity(r.events) : null;
                const expired = r.status === "ready" && r.expiresAt.getTime() < now;
                return (
                  <tr key={r.id}>
                    <td>
                      <Link href={`/team/interviews/${r.id}`}>
                        <strong>{r.candidateName}</strong>
                      </Link>
                      <div className="small faint">
                        {r.role ? `${r.role} · ` : ""}
                        {r.questionCount} questions · {r.minutes} min · set up {date(r.createdAt)}
                      </div>
                    </td>
                    <td className="small">
                      {r.status === "completed" ? (
                        <span className="pill pill-accepted">Completed</span>
                      ) : r.status === "started" ? (
                        <span className="pill pill-sent">In progress</span>
                      ) : r.status === "revoked" ? (
                        <span className="pill">Withdrawn</span>
                      ) : expired ? (
                        <span className="pill">Expired</span>
                      ) : (
                        <span className="pill pill-viewed">Waiting</span>
                      )}
                      <div className="faint">
                        {r.completedAt ? dateTime(r.completedAt) : r.status === "ready" && !expired ? `until ${date(r.expiresAt)}` : ""}
                      </div>
                    </td>
                    <td className="right num">{r.score === null ? "—" : <strong>{r.score}%</strong>}</td>
                    <td>{integrity ? <span className={`pill ${FLAG[integrity.flag].cls}`}>{FLAG[integrity.flag].label}</span> : <span className="faint">—</span>}</td>
                    <td className="small num">{r.status === "ready" && !expired ? r.code : <span className="faint">—</span>}</td>
                    <td className="right">{r.status === "ready" && !expired ? <RowActions id={r.id} /> : <Link href={`/team/interviews/${r.id}`} className="btn btn-sm">{r.status === "completed" ? "Report" : "View"}</Link>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
