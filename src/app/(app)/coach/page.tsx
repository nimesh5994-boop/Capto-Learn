import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, gte } from "drizzle-orm";
import { ArrowRight, Lightbulb, MessageCircleHeart, Target } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { exerciseAttempts, users } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { LEVELS } from "@/content/types";
import { coachMessage, coachReport, MISTAKE_ADVICE, type QuestionInfo } from "@/lib/learning/coach";
import { renderMarkdown } from "@/lib/markdown";
import { daysAgo } from "@/lib/time";
import { ProgressBar } from "@/components/learn/bits";
import styles from "./coach.module.css";

export const metadata = { title: "My coach" };

const KIND_LABEL = { mcq: "Multiple choice", multi: "Select all", numeric: "Calculations", journal: "Journals", classify: "Classifying" } as const;

function lookup(lessonId: string, exerciseId: string): QuestionInfo | undefined {
  const ref = getLesson(lessonId);
  const ex = ref && [...ref.lesson.exercises, ...ref.lesson.quiz].find((e) => e.id === exerciseId);
  return ref && ex ? { ex, lessonTitle: ref.lesson.title, track: ref.track.slug, trackTitle: ref.track.title, level: ref.lesson.level } : undefined;
}

export default async function CoachPage({ searchParams }: { searchParams: Promise<{ user?: string }> }) {
  const ctx = await requirePermission("learning.view");
  const { user: asked } = await searchParams;
  const db = await getDb();
  let person = { id: ctx.user.id, name: ctx.user.name };
  if (asked && asked !== ctx.user.id) {
    if (!ctx.can("progress.view_team")) notFound();
    const [row] = await db.select({ id: users.id, name: users.name }).from(users).where(and(eq(users.id, asked), eq(users.organizationId, ctx.org.id)));
    if (!row) notFound();
    person = row;
  }
  const own = person.id === ctx.user.id;
  const rows = await db
    .select({ lessonId: exerciseAttempts.lessonId, exerciseId: exerciseAttempts.exerciseId, correct: exerciseAttempts.correct, response: exerciseAttempts.response, createdAt: exerciseAttempts.createdAt })
    .from(exerciseAttempts)
    .where(and(eq(exerciseAttempts.userId, person.id), gte(exerciseAttempts.createdAt, daysAgo(365))));
  const r = coachReport(rows, lookup);
  const first = person.name.split(" ")[0];
  const message = coachMessage(own ? first : person.name, r);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>{own ? "My coach" : `Coach report: ${person.name}`}</h1>
          <p className="muted">A personal review of every answer {own ? "you've" : `${first} has`} given in the last year — what&apos;s going well and what to work on next.</p>
        </div>
      </div>

      <section className={`card ${styles.note}`}>
        <div className={styles.avatar} aria-hidden>
          <MessageCircleHeart size={22} />
        </div>
        <div className="stack" style={{ gap: 8 }}>
          {message.map((p) => (
            <p key={p} style={{ margin: 0 }}>
              {p}
            </p>
          ))}
          <div className="small faint">— Your Capto coach{!own ? ` (as ${first} sees it)` : ""}</div>
        </div>
      </section>

      {r.suggestions.length > 0 && (
        <section className="card card-pad stack" style={{ gap: 10, marginTop: 16 }}>
          <h2 className={styles.head}>
            <Target size={16} /> Your next steps
          </h2>
          <ol className={styles.steps}>
            {r.suggestions.map((s) => (
              <li key={s.text}>
                {s.text}{" "}
                {s.href && own && (
                  <Link href={s.href} className="small">
                    Go <ArrowRight size={12} />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {r.attempts > 0 && (
        <div className="grid-2" style={{ marginTop: 16, alignItems: "start" }}>
          <section className="card card-pad stack" style={{ gap: 10 }}>
            <h2 className={styles.head}>By subject</h2>
            {r.subjects.map((s) => (
              <div key={s.track}>
                <div className="row between small">
                  <span>{s.title}</span>
                  <span className="muted">
                    {s.accuracy}% · {s.attempts} answers
                  </span>
                </div>
                <ProgressBar pct={s.accuracy} label={`${s.title} accuracy`} />
              </div>
            ))}
          </section>
          <section className="card card-pad stack" style={{ gap: 10 }}>
            <h2 className={styles.head}>By level and question type</h2>
            {r.levels
              .filter((l) => l.attempts)
              .map((l) => (
                <div key={l.level}>
                  <div className="row between small">
                    <span>{LEVELS[l.level].label}</span>
                    <span className="muted">
                      {l.accuracy}% · {l.attempts}
                    </span>
                  </div>
                  <ProgressBar pct={l.accuracy} label={`${LEVELS[l.level].label} accuracy`} />
                </div>
              ))}
            <div style={{ borderTop: "1px solid var(--border)", margin: "4px 0" }} />
            {r.byKind.map((k) => (
              <div key={k.kind}>
                <div className="row between small">
                  <span>{KIND_LABEL[k.kind]}</span>
                  <span className="muted">
                    {k.accuracy}% · {k.attempts}
                  </span>
                </div>
                <ProgressBar pct={k.accuracy} label={`${KIND_LABEL[k.kind]} accuracy`} />
              </div>
            ))}
          </section>
        </div>
      )}

      {r.mistakes.length > 0 && (
        <section className="card card-pad stack" style={{ gap: 10, marginTop: 16 }}>
          <h2 className={styles.head}>
            <Lightbulb size={16} /> Patterns in your mistakes
          </h2>
          {r.mistakes.map((m) => (
            <div key={m.kind} className={styles.pattern}>
              <strong>
                {MISTAKE_ADVICE[m.kind].title} <span className="muted">· {m.count}×</span>
              </strong>
              <div className="small">{MISTAKE_ADVICE[m.kind].advice}</div>
              <div className="small faint">For example in “{m.example}”.</div>
            </div>
          ))}
        </section>
      )}

      {r.stuck.length > 0 && (
        <section className="card" style={{ marginTop: 16 }}>
          <div className="card-pad" style={{ paddingBottom: 4 }}>
            <h2 className={styles.head}>Questions to crack</h2>
            <p className="small muted" style={{ margin: 0 }}>
              Still not right on the latest try. Read why, then have another go in the lesson.
            </p>
          </div>
          {r.stuck.map((s) => (
            <details key={`${s.lessonId}#${s.exerciseId}`} className={styles.stuck}>
              <summary>
                <span>
                  <strong>{s.lessonTitle}</strong>
                  <span className="small faint">
                    {" "}
                    · {s.trackTitle} · missed {s.wrong}×{s.everRight ? " (got it once before)" : ""}
                  </span>
                </span>
              </summary>
              <div className="prose small" dangerouslySetInnerHTML={{ __html: renderMarkdown(s.prompt) }} />
              <div className={styles.why}>
                <div className="small" style={{ fontWeight: 700 }}>
                  Why
                </div>
                <div className="prose small" dangerouslySetInnerHTML={{ __html: renderMarkdown(s.explain) }} />
              </div>
              {own && (
                <Link href={`/learn/${s.lessonId}`} className="btn btn-sm" style={{ width: "fit-content" }}>
                  Try it again in the lesson
                </Link>
              )}
            </details>
          ))}
        </section>
      )}
    </>
  );
}
