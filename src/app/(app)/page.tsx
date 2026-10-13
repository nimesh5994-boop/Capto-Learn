import Link from "next/link";
import { desc, eq, and } from "drizzle-orm";
import { ArrowRight, CalendarClock, MessageSquareQuote } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { getLesson, tracks } from "@/content";
import { myProgress, openAssignments, overallStats, trackStats, viewAssignment } from "@/lib/learning/progress";
import { orgHasFeature } from "@/lib/plans";
import { dueCount } from "@/lib/learning/daily";
import { latestSkillChecks } from "@/lib/learning/skillCheck";
import { date, dateTime } from "@/lib/format";
import { ProgressBar, TrackIcon } from "@/components/learn/bits";
import styles from "./dashboard.module.css";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const { denied } = await searchParams;
  const ctx = await requireUser();
  const { user, org, can } = ctx;
  const db = await getDb();
  const canAsk = can("research.use") && orgHasFeature(org, "research");
  const [progress, myAssignments, recent, reviewDue, checks] = await Promise.all([
    myProgress(user.id),
    openAssignments(org.id, [user.id]),
    canAsk
      ? db
          .select({ id: researchQueries.id, question: researchQueries.question, createdAt: researchQueries.createdAt })
          .from(researchQueries)
          .where(and(eq(researchQueries.organizationId, org.id), eq(researchQueries.userId, user.id)))
          .orderBy(desc(researchQueries.createdAt))
          .limit(5)
      : Promise.resolve([]),
    dueCount(user.id),
    latestSkillChecks([user.id]),
  ]);

  const overall = overallStats(progress);
  const inProgress = [...progress.values()]
    .filter((p) => p.status === "started" && getLesson(p.lessonId))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  const continueRef = inProgress[0] ? getLesson(inProgress[0].lessonId) : undefined;
  const assignmentViews = myAssignments.map((a) => viewAssignment(a, progress)).filter((v) => !v.complete);
  const passedQuizzes = [...progress.values()].filter((p) => p.bestQuizScore !== null);
  const avgQuiz = passedQuizzes.length ? Math.round(passedQuizzes.reduce((s, p) => s + (p.bestQuizScore ?? 0), 0) / passedQuizzes.length) : null;
  const myTracks = tracks().filter((t) => trackStats(t.slug, progress).started > 0);

  const stats = [
    { label: "Lessons completed", value: String(overall.done), sub: `of ${overall.total} available` },
    { label: "In progress", value: String(inProgress.length), sub: "lessons started" },
    { label: "Average quiz score", value: avgQuiz === null ? "—" : `${avgQuiz}%`, sub: "best attempt per lesson" },
    { label: "Assigned to you", value: String(assignmentViews.length), sub: assignmentViews.some((a) => a.overdue) ? "some overdue" : "open" },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>
            Good {greeting()}, {user.name.split(" ")[0]}
          </h1>
          <p className="muted">Pick up where you left off, or ask Capto a question.</p>
        </div>
        <div className="row">
          {canAsk && (
            <Link href="/ask" className="btn">
              <MessageSquareQuote size={16} /> Ask Capto
            </Link>
          )}
          {continueRef ? (
            <Link href={`/learn/${continueRef.id}`} className="btn btn-primary">
              Continue: {continueRef.lesson.title} <ArrowRight size={15} />
            </Link>
          ) : (
            <Link href="/learn" className="btn btn-primary">
              Browse courses <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>

      {denied && (
        <div className="alert alert-warning" style={{ marginBottom: 18 }}>
          You don&apos;t have access to that page. Ask an admin in your firm if you need it.
        </div>
      )}

      {can("learning.view") && !checks.has(user.id) && overall.done < 3 && (
        <Link href="/skills-check" className="card card-pad row between" style={{ marginBottom: 18, textDecoration: "none", color: "inherit", borderLeft: "4px solid var(--accent, var(--primary))" }}>
          <span>
            <strong>New here? Take the 10-minute skills check</strong>
            <span className="small muted"> · a few questions per subject, and we&apos;ll suggest where to start in each course.</span>
          </span>
          <span className="btn btn-primary btn-sm">Start</span>
        </Link>
      )}

      {reviewDue > 0 && (
        <Link href="/review" className="card card-pad row between" style={{ marginBottom: 18, textDecoration: "none", color: "inherit", borderLeft: "4px solid var(--primary)" }}>
          <span>
            <strong>Daily 5 is ready</strong>
            <span className="small muted"> · {reviewDue} question{reviewDue === 1 ? "" : "s"} due from lessons you&apos;ve taken. Two minutes keeps them fresh.</span>
          </span>
          <span className="btn btn-primary btn-sm">Start</span>
        </Link>
      )}

      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className="card card-pad">
            <div className="small muted">{s.label}</div>
            <div className={`${styles.statValue} num`}>{s.value}</div>
            <div className="small faint">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 18 }}>
          {assignmentViews.length > 0 && (
            <section className="card">
              <div className="card-pad" style={{ paddingBottom: 6 }}>
                <h2>Assigned to you</h2>
              </div>
              <table className="table">
                <tbody>
                  {assignmentViews.map((v) => (
                    <tr key={v.a.id}>
                      <td>
                        <Link href={v.a.targetType === "lesson" ? `/learn/${v.a.targetId}` : `/learn/${v.a.targetId.split("/")[0]}`}>{v.title}</Link>
                        {v.a.note && <div className="small faint">{v.a.note}</div>}
                      </td>
                      <td style={{ width: 140 }}>
                        <ProgressBar pct={v.total ? (v.done / v.total) * 100 : 0} />
                        <span className="small faint">
                          {v.done}/{v.total} lessons
                        </span>
                      </td>
                      <td className="small" style={{ whiteSpace: "nowrap", color: v.overdue ? "var(--danger)" : undefined }}>
                        {v.a.dueDate ? (
                          <>
                            <CalendarClock size={13} /> {v.overdue ? "Overdue · " : "Due "}
                            {date(v.a.dueDate)}
                          </>
                        ) : (
                          "No due date"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          <section className="card card-pad stack" style={{ gap: 12 }}>
            <div className="row between">
              <h2 style={{ margin: 0 }}>Your courses</h2>
              <Link href="/learn" className="small">
                All courses
              </Link>
            </div>
            {myTracks.length === 0 ? (
              <p className="muted small" style={{ margin: 0 }}>
                You haven&apos;t started a course yet. New to practice? Start with <Link href="/learn/foundations">Accounting fundamentals</Link>.
              </p>
            ) : (
              myTracks.map((t) => {
                const s = trackStats(t.slug, progress);
                return (
                  <Link key={t.slug} href={`/learn/${t.slug}`} className="row" style={{ gap: 12, color: "inherit", textDecoration: "none" }}>
                    <TrackIcon name={t.icon} size={17} />
                    <div style={{ flex: 1 }}>
                      <div className="row between small" style={{ marginBottom: 4 }}>
                        <strong>{t.title}</strong>
                        <span className="faint">
                          {s.done}/{s.total}
                        </span>
                      </div>
                      <ProgressBar pct={s.pct} />
                    </div>
                  </Link>
                );
              })
            )}
          </section>
        </div>

        {canAsk && (
          <section className="card card-pad stack" style={{ gap: 10 }}>
            <div className="row between">
              <h2 style={{ margin: 0 }}>Ask Capto</h2>
              <Link href="/ask" className="small">
                New question
              </Link>
            </div>
            <p className="small muted" style={{ margin: 0 }}>
              Cited answers from HMRC manuals and GOV.UK, with every quote checked against the source.
            </p>
            {recent.length ? (
              recent.map((r) => (
                <Link key={r.id} href={`/ask/${r.id}`} className="small" style={{ display: "block" }}>
                  {r.question.length > 110 ? `${r.question.slice(0, 110)}…` : r.question}
                  <span className="faint"> · {dateTime(r.createdAt)}</span>
                </Link>
              ))
            ) : (
              <Link href="/ask" className="btn btn-sm" style={{ width: "fit-content" }}>
                Ask your first question
              </Link>
            )}
          </section>
        )}
      </div>
    </>
  );
}

function greeting() {
  const h = Number(new Date().toLocaleString("en-GB", { hour: "numeric", hour12: false, timeZone: "Europe/London" }));
  return h < 12 ? "morning" : h < 18 ? "afternoon" : "evening";
}
