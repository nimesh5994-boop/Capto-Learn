import Link from "next/link";
import { desc, inArray } from "drizzle-orm";
import { requirePlatform } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { benchmarkQuestions, benchmarkResults, researchQueries } from "@/lib/db/schema";
import { tracks } from "@/content";
import { latestBenchmark } from "@/lib/research/benchmark";
import { date } from "@/lib/format";
import { AddBenchmarkQuestion, BenchmarkRow } from "./BenchmarkClient";

export const metadata = { title: "Accuracy benchmark" };

export default async function BenchmarkPage() {
  const ctx = await requirePlatform("platform.content.review");
  const db = await getDb();
  const [questions, results, score] = await Promise.all([
    db.select().from(benchmarkQuestions).orderBy(desc(benchmarkQuestions.createdAt)),
    db.select().from(benchmarkResults).orderBy(desc(benchmarkResults.createdAt)),
    latestBenchmark(),
  ]);
  const queryIds = results.map((r) => r.queryId).filter((x): x is string => !!x);
  const answers = queryIds.length
    ? new Map((await db.select({ id: researchQueries.id, answer: researchQueries.answer, status: researchQueries.status }).from(researchQueries).where(inArray(researchQueries.id, queryIds))).map((a) => [a.id, a]))
    : new Map();
  const latestByQ = new Map<string, (typeof results)[number]>();
  for (const r of results) if (!latestByQ.has(r.questionId)) latestByQ.set(r.questionId, r);
  const areaTitle = new Map(tracks().map((t) => [t.slug, t.title]));

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Accuracy benchmark</h1>
          <p className="muted" style={{ maxWidth: 820 }}>
            Real practice questions with model answers set by qualified reviewers. Run each through Ask Capto (fresh research, no reuse — a few pence each), then grade the answer against the model answer. The latest grade per active question is published on the{" "}
            <Link href="/editorial">editorial standards page</Link>.
          </p>
        </div>
      </div>

      <div className="row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        <span className="pill">{questions.filter((q) => q.active).length} active questions</span>
        {score ? (
          <>
            <span className="pill pill-accepted">{score.correct} correct</span>
            <span className="pill pill-viewed">{score.partial} partly correct</span>
            <span className="pill pill-declined">{score.wrong} wrong</span>
            <span className="small muted">of {score.graded} graded · last graded {date(score.lastGraded)}</span>
          </>
        ) : (
          <span className="small muted">Nothing graded yet.</span>
        )}
      </div>

      {!ctx.user.qualifications && (
        <div className="alert alert-warning small" style={{ marginBottom: 14 }}>
          Add your professional qualifications under <Link href="/account">My account → Profile</Link> before grading — grades are published with the grader&apos;s qualifications.
        </div>
      )}

      <AddBenchmarkQuestion areas={tracks().map((t) => ({ slug: t.slug, title: t.title }))} />

      <div className="stack" style={{ gap: 12, marginTop: 14 }}>
        {questions.map((q) => {
          const r = latestByQ.get(q.id);
          const a = r?.queryId ? answers.get(r.queryId) : undefined;
          return (
            <BenchmarkRow
              key={q.id}
              q={{ id: q.id, question: q.question, modelAnswer: q.modelAnswer, area: areaTitle.get(q.area) ?? q.area, active: q.active, createdBy: q.createdByName }}
              latest={
                r
                  ? {
                      id: r.id,
                      queryId: r.queryId,
                      shortAnswer: a?.answer?.shortAnswer ?? null,
                      failed: a?.status && a.status !== "answered" ? true : false,
                      verdict: r.verdict,
                      note: r.note,
                      gradedBy: r.gradedByName ? `${r.gradedByName}${r.gradedByCredentials ? ` (${r.gradedByCredentials})` : ""}` : null,
                      gradedAt: r.gradedAt ? date(r.gradedAt) : null,
                      ranAt: date(r.createdAt),
                    }
                  : null
              }
            />
          );
        })}
        {questions.length === 0 && <div className="card card-pad small muted">No questions yet. Aim for 50–200 real questions your firm has been asked, across every course area.</div>}
      </div>
    </>
  );
}
