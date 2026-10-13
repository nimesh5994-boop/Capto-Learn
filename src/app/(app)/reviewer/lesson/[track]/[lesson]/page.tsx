import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq, sql } from "drizzle-orm";
import { ExternalLink } from "lucide-react";
import { getDb } from "@/lib/db/client";
import { contentReviewEvents, exerciseAttempts, lessonFeedback } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { lessonFlashcards } from "@/content/flashcards";
import { LEVELS } from "@/content/types";
import { reviewState } from "@/lib/learning/reviewQueue";
import { lessonHash } from "@/lib/learning/review";
import { REVIEW_CHECKLIST } from "@/lib/learning/reviewChecklist";
import { renderMarkdown } from "@/lib/markdown";
import { date, dateTime } from "@/lib/format";
import { Blocks } from "@/components/learn/Blocks";
import { ReviewPill } from "@/components/learn/bits";
import { AnswerKey } from "@/components/review/AnswerKey";
import { ReviewPanel } from "@/components/review/ReviewPanel";
import styles from "@/components/review/review.module.css";

export const metadata = { title: "Review lesson" };

const DECISION = { reviewed: "Signed off", needs_changes: "Needs changes", draft: "Reset to draft" } as const;
const CHECK_LABEL = new Map(REVIEW_CHECKLIST.map((c) => [c.key as string, c.label]));

export default async function ReviewLessonPage({ params }: { params: Promise<{ track: string; lesson: string }> }) {
  const { track, lesson: slug } = await params;
  const id = `${track}/${slug}`;
  const ref = getLesson(id);
  if (!ref) notFound();
  const l = ref.lesson;
  const db = await getDb();
  const [items, history, reports, accuracy] = await Promise.all([
    reviewState(),
    db.select().from(contentReviewEvents).where(eq(contentReviewEvents.lessonId, id)).orderBy(desc(contentReviewEvents.createdAt)).limit(30),
    db.select().from(lessonFeedback).where(and(eq(lessonFeedback.lessonId, id), eq(lessonFeedback.status, "open"))).orderBy(desc(lessonFeedback.createdAt)),
    db
      .select({ exerciseId: exerciseAttempts.exerciseId, pct: sql<number>`round(100.0 * avg(case when ${exerciseAttempts.correct} then 1 else 0 end))::int`, total: sql<number>`count(*)::int` })
      .from(exerciseAttempts)
      .where(eq(exerciseAttempts.lessonId, id))
      .groupBy(exerciseAttempts.exerciseId),
  ]);
  const acc = new Map(accuracy.map((a) => [a.exerciseId, a]));
  const at = items.findIndex((i) => i.ref.id === id);
  const me = items[at];
  const nextTodo = [...items.slice(at + 1), ...items.slice(0, at)].find((i) => i.todo);
  const inCourse = items.filter((i) => i.ref.track.slug === track);
  const pos = inCourse.findIndex((i) => i.ref.id === id);
  const prev = inCourse[pos - 1];
  const next = inCourse[pos + 1];
  const cards = lessonFlashcards(id);
  const currentHash = lessonHash(l);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="small muted">
            <Link href="/reviewer">Review centre</Link> / <Link href={`/reviewer/${track}`}>{ref.track.title}</Link> / lesson {pos + 1} of {inCourse.length}
          </div>
          <h1>{l.title}</h1>
          <div className="row small muted" style={{ gap: 10, flexWrap: "wrap" }}>
            <ReviewPill status={me.status} />
            <span>{LEVELS[l.level].label}</span>
            <span>{l.minutes} min</span>
            {l.taxYear && <span>Tax year {l.taxYear}</span>}
            <Link href={`/learn/${id}`} target="_blank">
              Open as a learner sees it <ExternalLink size={12} />
            </Link>
          </div>
        </div>
        <div className="row" style={{ gap: 6 }}>
          {prev && (
            <Link href={`/reviewer/lesson/${prev.ref.id}`} className="btn btn-sm" title={prev.ref.lesson.title}>
              ← Previous
            </Link>
          )}
          {next && (
            <Link href={`/reviewer/lesson/${next.ref.id}`} className="btn btn-sm" title={next.ref.lesson.title}>
              Next →
            </Link>
          )}
        </div>
      </div>

      <div className={styles.layout}>
        <div className="stack" style={{ gap: 16 }}>
          <nav className={styles.jump} aria-label="Jump to">
            <a href="#content">Content</a>
            {l.scenario && <a href="#scenario">Scenario</a>}
            <a href="#exercises">Exercises ({l.exercises.length})</a>
            <a href="#quiz">Quiz ({l.quiz.length})</a>
            <a href="#flashcards">Flashcards ({cards.length})</a>
            <a href="#sources">Sources ({l.sources.length})</a>
          </nav>

          <section id="content" className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Content</h2>
            <p style={{ margin: 0 }}>{l.summary}</p>
            <ul style={{ margin: 0 }}>
              {l.objectives.map((o) => (
                <li key={o} className="small">
                  {o}
                </li>
              ))}
            </ul>
            <Blocks blocks={l.body} />
          </section>

          {l.scenario && (
            <section id="scenario" className={`card ${styles.section}`}>
              <h2 className={styles.sectionTitle}>Scenario: {l.scenario.title}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(l.scenario.narrative) }} />
              <Blocks blocks={l.scenario.walkthrough} />
            </section>
          )}

          <section id="exercises" className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Exercises — answer key</h2>
            {l.exercises.map((ex, k) => (
              <AnswerKey key={ex.id} ex={ex} n={`E${k + 1}`} accuracy={acc.get(ex.id)} />
            ))}
          </section>

          <section id="quiz" className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Quiz — answer key</h2>
            {l.quiz.map((q, k) => (
              <AnswerKey key={q.id} ex={q} n={`Q${k + 1}`} accuracy={acc.get(q.id)} />
            ))}
          </section>

          <section id="flashcards" className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Flashcards</h2>
            {cards.length === 0 ? (
              <p className="small muted" style={{ margin: 0 }}>
                No flashcards for this lesson.
              </p>
            ) : (
              <div>
                {cards.map((c) => (
                  <div key={c.id} className={styles.card}>
                    <span>{c.front}</span>
                    <strong>{c.back}</strong>
                    <span className="small faint" style={{ gridColumn: "1 / -1" }}>
                      Lesson text: &ldquo;{c.evidence}&rdquo;
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="sources" className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Sources cited</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {l.sources.map((s) => (
                <li key={s.url} className="small">
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.label} <ExternalLink size={11} />
                  </a>
                </li>
              ))}
            </ul>
            {me.sourceChangedAt && (
              <div className="alert alert-warning small">
                A cited page changed on {date(me.sourceChangedAt)}
                {me.stale ? " — after this lesson was signed off. Re-check the figures." : "."}
              </div>
            )}
          </section>
        </div>

        <aside className={styles.side}>
          <section className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>Your decision</h2>
            <ReviewPanel lessonId={id} current={me.status} nextHref={nextTodo ? `/reviewer/lesson/${nextTodo.ref.id}` : null} />
          </section>

          {reports.length > 0 && (
            <section className={`card ${styles.section}`}>
              <h2 className={styles.sectionTitle}>Open learner reports ({reports.length})</h2>
              {reports.map((r) => (
                <div key={r.id} className={styles.event}>
                  <strong>{r.kind.replace("_", " ")}</strong> · {dateTime(r.createdAt)}
                  <div style={{ whiteSpace: "pre-wrap" }}>{r.message}</div>
                </div>
              ))}
            </section>
          )}

          <section className={`card ${styles.section}`}>
            <h2 className={styles.sectionTitle}>History</h2>
            {history.length === 0 ? (
              <p className="small muted" style={{ margin: 0 }}>
                No decisions yet — this lesson is an AI draft.
              </p>
            ) : (
              history.map((e) => (
                <div key={e.id} className={styles.event}>
                  <strong>{DECISION[e.status]}</strong> by {e.reviewerName ?? "a former reviewer"} · {dateTime(e.createdAt)}
                  {e.contentHash !== currentHash && <span className="faint"> · earlier version of the lesson</span>}
                  {e.notes && <div style={{ whiteSpace: "pre-wrap" }}>{e.notes}</div>}
                  {e.checklist.length > 0 && <div className="faint">Confirmed: {e.checklist.map((k) => CHECK_LABEL.get(k)?.split(" ")[0] ?? k).join(", ")}</div>}
                </div>
              ))
            )}
          </section>
        </aside>
      </div>
    </>
  );
}
