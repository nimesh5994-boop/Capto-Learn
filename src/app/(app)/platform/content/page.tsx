import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { requirePlatform } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { exerciseAttempts, lessonFeedback, organizations, researchQueries } from "@/lib/db/schema";
import { allLessons, getLesson } from "@/content";
import { LEVELS } from "@/content/types";
import { effectiveReview, lessonSourceChanges, reviewRows, sourceChangedSinceReview, type EffectiveReview } from "@/lib/learning/review";
import { date, dateTime } from "@/lib/format";
import { ReviewPill } from "@/components/learn/bits";
import { FeedbackControls } from "./ReviewControls";

export const metadata = { title: "Content review" };

const FEEDBACK_LABEL: Record<string, string> = { error: "Error", out_of_date: "Out of date", unclear: "Unclear", suggestion: "Suggestion" };

export default async function ContentReviewPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const { show = "todo" } = await searchParams;
  await requirePlatform("platform.content.review");
  const db = await getDb();
  const [reviews, feedback, accuracy, badAnswers, sourceChanges] = await Promise.all([
    reviewRows(),
    db
      .select({ f: lessonFeedback, firm: organizations.name })
      .from(lessonFeedback)
      .innerJoin(organizations, eq(organizations.id, lessonFeedback.organizationId))
      .where(eq(lessonFeedback.status, "open"))
      .orderBy(desc(lessonFeedback.createdAt))
      .limit(100),
    // First-attempt-ish accuracy per lesson across all firms: a very low score often means a wrong answer key.
    db
      .select({ lessonId: exerciseAttempts.lessonId, pct: sql<number>`round(100.0 * avg(case when ${exerciseAttempts.correct} then 1 else 0 end))::int`, n: sql<number>`count(*)::int` })
      .from(exerciseAttempts)
      .groupBy(exerciseAttempts.lessonId),
    db
      .select({ id: researchQueries.id, question: researchQueries.question, note: researchQueries.feedbackNote, createdAt: researchQueries.createdAt })
      .from(researchQueries)
      .where(eq(researchQueries.helpful, false))
      .orderBy(desc(researchQueries.createdAt))
      .limit(20),
    lessonSourceChanges(),
  ]);
  const acc = new Map(accuracy.map((a) => [a.lessonId, a]));
  const openByLesson = new Map<string, number>();
  for (const { f } of feedback) openByLesson.set(f.lessonId, (openByLesson.get(f.lessonId) ?? 0) + 1);

  const lessons = allLessons().map((r) => ({ r, status: effectiveReview(r.lesson, reviews.get(r.id)) }));
  const counts = lessons.reduce<Record<EffectiveReview, number>>((m, l) => ((m[l.status] = (m[l.status] ?? 0) + 1), m), { draft: 0, reviewed: 0, changed: 0, needs_changes: 0 });
  const staleReviewed = lessons.filter((l) => sourceChangedSinceReview(reviews.get(l.r.id), sourceChanges.get(l.r.id)));
  const shown = lessons.filter((l) =>
    show === "all" ? true : show === "reviewed" ? l.status === "reviewed" : show === "changed" ? sourceChanges.has(l.r.id) : l.status !== "reviewed" || staleReviewed.includes(l)
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Content review</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Every lesson starts as an AI draft. A qualified reviewer signs it off here; if the lesson is edited afterwards it automatically drops back to &ldquo;edited since review&rdquo;.
          </p>
        </div>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <span className="pill pill-accepted">{counts.reviewed} reviewed</span>
        <span className="pill pill-viewed">{counts.draft} AI drafts</span>
        <span className="pill pill-viewed">{counts.changed} edited since review</span>
        <span className="pill pill-declined">{counts.needs_changes} needs changes</span>
        <span className="pill pill-sent">{feedback.length} open learner reports</span>
        {sourceChanges.size > 0 && (
          <Link href="?show=changed" className="pill pill-viewed">
            {sourceChanges.size} lessons cite guidance HMRC has changed{staleReviewed.length ? ` (${staleReviewed.length} already signed off)` : ""}
          </Link>
        )}
      </div>

      {feedback.length > 0 && (
        <section className="card" style={{ marginBottom: 18 }}>
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Learner reports</h2>
          </div>
          <table className="table">
            <tbody>
              {feedback.map(({ f, firm }) => (
                <tr key={f.id}>
                  <td style={{ width: 120 }}>
                    <span className={`pill ${f.kind === "error" || f.kind === "out_of_date" ? "pill-declined" : ""}`}>{FEEDBACK_LABEL[f.kind]}</span>
                  </td>
                  <td>
                    <Link href={`/learn/${f.lessonId}`}>{getLesson(f.lessonId)?.lesson.title ?? f.lessonId}</Link>
                    <div className="small" style={{ whiteSpace: "pre-wrap" }}>
                      {f.message}
                    </div>
                    <div className="small faint">
                      {firm} · {dateTime(f.createdAt)}
                    </div>
                  </td>
                  <td>
                    <FeedbackControls id={f.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="card" style={{ marginBottom: 18 }}>
        <div className="card-pad row between" style={{ paddingBottom: 6 }}>
          <h2 style={{ margin: 0 }}>Lessons</h2>
          <span className="row small" style={{ gap: 10 }}>
            <Link href="?show=todo">To review</Link>
            <Link href="?show=reviewed">Reviewed</Link>
            <Link href="?show=changed">Sources changed</Link>
            <Link href="?show=all">All</Link>
          </span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Status</th>
              <th className="right">Learner accuracy</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(({ r, status }) => {
              const a = acc.get(r.id);
              const row = reviews.get(r.id);
              return (
                <tr key={r.id}>
                  <td>
                    <Link href={`/learn/${r.id}`}>{r.lesson.title}</Link>
                    <div className="small faint">
                      {r.track.title} · {LEVELS[r.lesson.level].label}
                      {r.lesson.taxYear ? ` · ${r.lesson.taxYear}` : ""}
                      {openByLesson.get(r.id) ? ` · ${openByLesson.get(r.id)} open report(s)` : ""}
                    </div>
                  </td>
                  <td>
                    <ReviewPill status={status} />
                    {row?.reviewedAt && (
                      <div className="small faint">
                        {row.reviewerName} · {date(row.reviewedAt)}
                      </div>
                    )}
                    {row?.notes && <div className="small faint">{row.notes}</div>}
                    {sourceChanges.has(r.id) && (
                      <div className="small" style={{ color: "var(--warning)" }}>
                        Cited guidance changed {date(sourceChanges.get(r.id))}
                        {sourceChangedSinceReview(row, sourceChanges.get(r.id)) ? " — after sign-off, re-check" : ""}
                      </div>
                    )}
                  </td>
                  <td className="right small num" style={{ color: a && a.n >= 10 && a.pct < 40 ? "var(--danger)" : undefined }} title={a && a.pct < 40 ? "Unusually low — check the answer key" : undefined}>
                    {a ? `${a.pct}% of ${a.n}` : "—"}
                  </td>
                  <td>
                    <Link href={`/reviewer/lesson/${r.id}`} className="btn btn-sm">
                      Open review
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {badAnswers.length > 0 && (
        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 6 }}>
            <h2>Ask Capto answers rated unhelpful</h2>
          </div>
          <table className="table">
            <tbody>
              {badAnswers.map((b) => (
                <tr key={b.id}>
                  <td>
                    {b.question}
                    {b.note && <div className="small faint">“{b.note}”</div>}
                  </td>
                  <td className="small faint">{dateTime(b.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
