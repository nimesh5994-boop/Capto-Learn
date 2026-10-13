import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, CheckCircle2, Clock, FileSignature, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { interviewTests } from "@/lib/db/schema";
import { getLesson, getTrack } from "@/content";
import { LEVELS } from "@/content/types";
import { DIFFICULTIES, judgeIntegrity, markInterview } from "@/lib/interviews/rules";
import { quizOf, settle } from "@/lib/interviews/store";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { dateTime } from "@/lib/format";
import { ProgressBar } from "@/components/learn/bits";
import styles from "../interviews.module.css";

export const metadata = { title: "Interview test report" };

const EVENT_LABEL: Record<string, string> = {
  started: "Started the test",
  left: "Left the test page / window",
  returned: "Came back",
  "fullscreen-exit": "Exited full screen",
  paste: "Tried to paste",
  copy: "Tried to copy",
  "time-up": "Time ran out",
  finished: "Submitted",
};

export default async function InterviewReport({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requireUser();
  if (!ctx.can("interviews.manage")) redirect("/?denied=1");
  const db = await getDb();
  const [found] = await db.select().from(interviewTests).where(and(eq(interviewTests.id, id), eq(interviewTests.organizationId, ctx.org.id)));
  if (!found) notFound();
  const r = await settle(found);
  const marked = markInterview(r.questions, r.answers, (q) => quizOf(q.lessonId, q.questionId)?.answer);
  const integrity = judgeIntegrity(r.events);
  const tookMin = r.startedAt && r.completedAt ? Math.max(1, Math.round((r.completedAt.getTime() - r.startedAt.getTime()) / 60000)) : null;
  const flag = { clear: { icon: ShieldCheck, label: "No integrity concerns", cls: styles.flagClear }, review: { icon: ShieldAlert, label: "Worth asking about", cls: styles.flagReview }, concern: { icon: ShieldAlert, label: "Integrity concern — consider a supervised re-test", cls: styles.flagConcern } }[integrity.flag];

  return (
    <>
      <Link href="/team/interviews" className={styles.back}>
        <ArrowLeft size={14} /> Interview tests
      </Link>
      <div className="page-head">
        <div>
          <h1>{r.candidateName}</h1>
          <p className="muted">
            {r.role ? `${r.role} · ` : ""}
            {DIFFICULTIES[r.difficulty].label} · {r.questionCount} questions · {r.minutes} minutes · set up by {r.createdByName ?? "a colleague"}
          </p>
        </div>
      </div>

      {r.status !== "completed" ? (
        <div className="card card-pad muted">
          {r.status === "started" ? `In progress — started ${dateTime(r.startedAt)}, due to finish by ${dateTime(r.deadlineAt)}.` : r.status === "revoked" ? "This test was withdrawn." : `Waiting for the candidate. Code ${r.code}.`}
        </div>
      ) : (
        <>
          <div className={styles.summary}>
            <div className={styles.scoreCard}>
              <span className={styles.scoreBig}>{marked.score}%</span>
              <span className="small muted">
                {marked.right} of {marked.total} right
              </span>
              <span className="small faint">
                <Clock size={12} /> {tookMin} min of {r.minutes} · {dateTime(r.completedAt)}
              </span>
            </div>
            <div className={`${styles.flag} ${flag.cls}`}>
              <flag.icon size={22} />
              <div>
                <strong>{flag.label}</strong>
                {integrity.reasons.length ? (
                  <ul>
                    {integrity.reasons.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="small" style={{ margin: "2px 0 0" }}>
                    Stayed on the test, in full screen, with no copy or paste attempts.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ alignItems: "start", marginBottom: 16 }}>
            <section className="card card-pad stack" style={{ gap: 10 }}>
              <h2 style={{ margin: 0 }}>By subject</h2>
              {Object.entries(marked.bySubject).map(([slug, s]) => (
                <div key={slug}>
                  <div className="row between small">
                    <span>{getTrack(slug)?.title ?? slug}</span>
                    <span className="muted">
                      {s.right}/{s.total}
                    </span>
                  </div>
                  <ProgressBar pct={(s.right / s.total) * 100} label={`${slug} score`} />
                </div>
              ))}
            </section>
            <section className="card card-pad stack" style={{ gap: 10 }}>
              <h2 style={{ margin: 0 }}>By level</h2>
              {(["foundation", "practitioner", "advanced"] as const)
                .filter((l) => marked.byLevel[l].total)
                .map((l) => (
                  <div key={l}>
                    <div className="row between small">
                      <span>{LEVELS[l].label}</span>
                      <span className="muted">
                        {marked.byLevel[l].right}/{marked.byLevel[l].total}
                      </span>
                    </div>
                    <ProgressBar pct={(marked.byLevel[l].right / marked.byLevel[l].total) * 100} label={`${l} score`} />
                  </div>
                ))}
            </section>
          </div>
        </>
      )}

      {r.declaration && (
        <section className="card card-pad" style={{ marginBottom: 16 }}>
          <h2 className="row" style={{ gap: 8, margin: "0 0 8px" }}>
            <FileSignature size={18} /> Declaration
          </h2>
          <p className="small" style={{ margin: "0 0 8px" }}>
            Signed <em style={{ fontFamily: "var(--font-heading)", fontSize: 16 }}>{r.declaration.name}</em> on {dateTime(r.declaration.at)}
            {r.declaration.ip ? ` from ${r.declaration.ip}` : ""}.
          </p>
          <ul className="small muted" style={{ margin: 0, paddingLeft: 20 }}>
            {r.declaration.statements.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {r.events.length > 0 && (
        <section className="card card-pad" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: "0 0 8px" }}>Activity log</h2>
          <ol className={styles.timeline}>
            {r.events.map((e, i) => (
              <li key={i} className={["left", "fullscreen-exit", "paste", "copy"].includes(e.type) ? styles.timelineWarn : undefined}>
                <span>{new Date(e.t).toLocaleTimeString("en-GB", { timeZone: "Europe/London" })}</span>
                {EVENT_LABEL[e.type] ?? e.type}
                {e.type === "returned" && e.ms ? ` after ${Math.round(e.ms / 1000)}s` : ""}
              </li>
            ))}
          </ol>
        </section>
      )}

      {r.status === "completed" && (
        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 4 }}>
            <h2 style={{ margin: 0 }}>Answers</h2>
            <p className="small muted" style={{ margin: "4px 0 0" }}>
              Useful for the interview conversation — ask about the ones they missed.
            </p>
          </div>
          {r.questions.map((q, i) => {
            const quiz = quizOf(q.lessonId, q.questionId);
            const given = r.answers[`${q.lessonId}#${q.questionId}`]?.choice;
            const ok = quiz && given === quiz.answer;
            return (
              <details key={i} className={styles.answer}>
                <summary>
                  {ok ? <CheckCircle2 size={16} className={styles.ok} /> : <XCircle size={16} className={styles.bad} />}
                  <span>
                    Q{i + 1} · {getTrack(q.track)?.title} · {LEVELS[q.level].label}
                    {given === undefined ? " · not answered" : given === -1 ? " · skipped" : ""}
                  </span>
                </summary>
                {quiz && (
                  <div className={styles.answerBody}>
                    <div className="prose small" dangerouslySetInnerHTML={{ __html: renderMarkdown(quiz.prompt) }} />
                    <ul>
                      {quiz.options.map((o, k) => (
                        <li key={k} className={k === quiz.answer ? styles.optRight : k === given ? styles.optWrong : undefined}>
                          <span dangerouslySetInnerHTML={{ __html: renderInline(o) }} />
                          {k === quiz.answer ? " ✓" : k === given ? " (their answer)" : ""}
                        </li>
                      ))}
                    </ul>
                    <div className="small faint">From the lesson “{getLesson(q.lessonId)?.lesson.title}”</div>
                  </div>
                )}
              </details>
            );
          })}
        </section>
      )}
    </>
  );
}
