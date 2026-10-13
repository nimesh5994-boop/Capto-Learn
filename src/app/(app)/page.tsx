import Link from "next/link";
import { desc, eq, and } from "drizzle-orm";
import { ArrowRight, BookOpenCheck, CalendarClock, ChevronRight, Compass, GraduationCap, MessageSquareQuote, PlayCircle, Repeat } from "lucide-react";
import { requireUser } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { getLesson, tracks, trackLessons } from "@/content";
import { LEVELS } from "@/content/types";
import { myProgress, openAssignments, overallStats, trackStats, viewAssignment } from "@/lib/learning/progress";
import { orgHasFeature } from "@/lib/plans";
import { dueCount } from "@/lib/learning/daily";
import { latestSkillChecks, retakeDue } from "@/lib/learning/skillCheck";
import { reviewState } from "@/lib/learning/reviewQueue";
import { categoryOf } from "@/lib/learning/catalogue";
import { date, dateTime } from "@/lib/format";
import { CourseGlyph } from "@/components/learn/bits";
import styles from "./dashboard.module.css";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const { denied } = await searchParams;
  const ctx = await requireUser();
  const { user, org, can } = ctx;
  const db = await getDb();
  const canLearn = can("learning.view");
  const canAsk = can("research.use") && orgHasFeature(org, "research");
  const [progress, myAssignments, recent, reviewDue, checks, toReview] = await Promise.all([
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
    ctx.platformCan("platform.content.review") ? reviewState().then((s) => s.filter((i) => i.todo).length) : Promise.resolve(0),
  ]);

  const overall = overallStats(progress);
  const last = [...progress.values()].filter((p) => getLesson(p.lessonId)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
  const lastRef = last ? getLesson(last.lessonId) : undefined;
  const resume = lastRef ? (last.status !== "completed" ? lastRef : trackLessons(lastRef.track.slug).find((r) => progress.get(r.id)?.status !== "completed")) : undefined;
  const resumeCourse = resume ? trackStats(resume.track.slug, progress) : null;
  const assignmentViews = myAssignments.map((a) => viewAssignment(a, progress)).filter((v) => !v.complete);
  const quizzes = [...progress.values()].filter((p) => p.bestQuizScore !== null);
  const avgQuiz = quizzes.length ? Math.round(quizzes.reduce((s, p) => s + (p.bestQuizScore ?? 0), 0) / quizzes.length) : null;
  const minutesDone = [...progress.values()].filter((p) => p.status === "completed").reduce((n, p) => n + (getLesson(p.lessonId)?.lesson.minutes ?? 0), 0);
  const myTracks = tracks()
    .map((t) => ({ t, s: trackStats(t.slug, progress) }))
    .filter(({ s }) => s.started > 0);
  const lastCheck = checks.get(user.id);
  const checkDue = canLearn && ((!lastCheck && overall.done < 3) || (!!lastCheck && retakeDue(lastCheck, org.skillCheckRetakeMonths)));

  // Today: the things worth doing now, each one line.
  const today = [
    canLearn && {
      href: "/review",
      icon: Repeat,
      title: "Daily 5",
      text: reviewDue ? `${reviewDue} question${reviewDue === 1 ? "" : "s"} due — two minutes keeps them fresh` : "All caught up — come back tomorrow",
      cta: reviewDue ? "Start" : null,
    },
    checkDue && {
      href: "/skills-check",
      icon: Compass,
      title: lastCheck ? "Fresh skills check due" : "Find your level",
      text: lastCheck ? `Last one ${date(lastCheck.completedAt)} — new questions this time` : "A few adaptive questions suggest where to start in each course",
      cta: "Start",
    },
    ...assignmentViews.slice(0, 3).map((v) => ({
      href: v.a.targetType === "lesson" ? `/learn/${v.a.targetId}` : `/learn/${v.a.targetId.split("/")[0]}`,
      icon: CalendarClock,
      title: v.title,
      text: `Assigned · ${v.done}/${v.total} lessons${v.a.dueDate ? ` · ${v.overdue ? "overdue since" : "due"} ${date(v.a.dueDate)}` : ""}`,
      cta: "Open",
      warn: v.overdue,
    })),
    toReview > 0 && {
      href: "/reviewer",
      icon: BookOpenCheck,
      title: "Review centre",
      text: `${toReview} lesson${toReview === 1 ? "" : "s"} waiting for review or re-check`,
      cta: "Open",
    },
  ].filter(Boolean) as { href: string; icon: typeof Repeat; title: string; text: string; cta: string | null; warn?: boolean }[];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>
            Good {greeting()}, {user.name.split(" ")[0]}
          </h1>
          <p className="muted">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/London" })}</p>
        </div>
        <div className="row">
          {canAsk && (
            <Link href="/ask" className="btn">
              <MessageSquareQuote size={16} /> Ask Capto
            </Link>
          )}
          {canLearn && (
            <Link href="/learn" className="btn">
              <GraduationCap size={16} /> All courses
            </Link>
          )}
        </div>
      </div>

      {denied && (
        <div className="alert alert-warning" style={{ marginBottom: 18 }}>
          You don&apos;t have access to that page. Ask an admin in your firm if you need it.
        </div>
      )}

      <div className={styles.top}>
        {canLearn &&
          (resume ? (
            <Link href={`/learn/${resume.id}`} className={`${styles.resume} ${styles[`resume_${categoryOf(resume.track.slug)}`]}`}>
              <span className={styles.resumeKicker}>{last?.status === "completed" ? "Up next" : "Continue learning"}</span>
              <span className={styles.resumeGlyph}>
                <CourseGlyph name={resume.track.icon} size={26} />
              </span>
              <strong className={styles.resumeTitle}>{resume.lesson.title}</strong>
              <span className={styles.resumeMeta}>
                {resume.track.title} · {LEVELS[resume.lesson.level].label} · {resume.lesson.minutes} min
              </span>
              {resumeCourse && (
                <span className={styles.resumeBar} aria-label={`${resumeCourse.done} of ${resumeCourse.total} lessons done in this course`}>
                  <span style={{ width: `${resumeCourse.pct}%` }} />
                </span>
              )}
              <span className={styles.resumeFoot}>
                {resumeCourse ? `${resumeCourse.done} of ${resumeCourse.total} lessons done` : ""}
                <span className={styles.resumeCta}>
                  <PlayCircle size={16} /> {last?.status === "completed" ? "Start lesson" : "Continue"}
                </span>
              </span>
            </Link>
          ) : (
            <Link href="/learn/foundations" className={`${styles.resume} ${styles.resume_accounts}`}>
              <span className={styles.resumeKicker}>Start here</span>
              <span className={styles.resumeGlyph}>
                <GraduationCap size={26} />
              </span>
              <strong className={styles.resumeTitle}>Accounting fundamentals</strong>
              <span className={styles.resumeMeta}>Double entry from first principles to a full set of accounts — the base for everything else.</span>
              <span className={styles.resumeFoot}>
                16 short lessons
                <span className={styles.resumeCta}>
                  <PlayCircle size={16} /> Start the course
                </span>
              </span>
            </Link>
          ))}

        <section className={`card ${styles.today}`}>
          <h2 className={styles.h2}>Today</h2>
          {today.length === 0 ? (
            <p className="small muted" style={{ margin: 0 }}>
              Nothing waiting. Pick a course and keep going.
            </p>
          ) : (
            <ul className={styles.todayList}>
              {today.map((t) => (
                <li key={t.href + t.title}>
                  <Link href={t.href} className={styles.todayItem}>
                    <span className={`${styles.todayIcon} ${t.warn ? styles.todayWarn : ""}`}>
                      <t.icon size={17} />
                    </span>
                    <span className={styles.todayText}>
                      <strong>{t.title}</strong>
                      <span>{t.text}</span>
                    </span>
                    {t.cta ? <span className={styles.todayCta}>{t.cta}</span> : <ChevronRight size={16} className={styles.todayChevron} />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {canLearn && (
        <dl className={styles.stats}>
          <div>
            <dt>Lessons completed</dt>
            <dd>
              {overall.done}
              <small> / {overall.total}</small>
            </dd>
          </div>
          <div>
            <dt>Hours learned</dt>
            <dd>{(minutesDone / 60).toFixed(1)}</dd>
          </div>
          <div>
            <dt>Average quiz score</dt>
            <dd>{avgQuiz === null ? "—" : `${avgQuiz}%`}</dd>
          </div>
          <div>
            <dt>Courses in progress</dt>
            <dd>{myTracks.filter(({ s }) => s.done < s.total).length}</dd>
          </div>
        </dl>
      )}

      <div className={styles.columns}>
        {canLearn && (
          <section className="card card-pad">
            <div className="row between" style={{ marginBottom: 12 }}>
              <h2 className={styles.h2} style={{ margin: 0 }}>
                Your courses
              </h2>
              <Link href="/learn" className="small">
                All courses <ArrowRight size={12} />
              </Link>
            </div>
            {myTracks.length === 0 ? (
              <p className="muted small" style={{ margin: 0 }}>
                You haven&apos;t started a course yet. New to practice? <Link href="/learn/foundations">Start with Accounting fundamentals</Link>, or{" "}
                <Link href="/skills-check">find your level</Link> first.
              </p>
            ) : (
              <ul className={styles.courseList}>
                {myTracks.map(({ t, s }) => (
                  <li key={t.slug}>
                    <Link href={`/learn/${t.slug}`} className={styles.course}>
                      <span className={`${styles.courseGlyph} ${styles[`glyph_${categoryOf(t.slug)}`]}`}>
                        <CourseGlyph name={t.icon} size={17} strokeWidth={2} />
                      </span>
                      <span className={styles.courseText}>
                        <strong>{t.title}</strong>
                        <span className={styles.courseBar}>
                          <span style={{ width: `${s.pct}%` }} />
                        </span>
                      </span>
                      <span className={styles.coursePct}>
                        {s.done}/{s.total}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {canAsk && (
          <section className="card card-pad">
            <div className="row between" style={{ marginBottom: 6 }}>
              <h2 className={styles.h2} style={{ margin: 0 }}>
                Ask Capto
              </h2>
              <Link href="/ask" className="small">
                New question <ArrowRight size={12} />
              </Link>
            </div>
            <p className="small muted" style={{ margin: "0 0 10px" }}>
              Cited answers from HMRC and GOV.UK guidance and Capto&apos;s lessons, with every quote checked.
            </p>
            {recent.length ? (
              <ul className={styles.recent}>
                {recent.map((r) => (
                  <li key={r.id}>
                    <Link href={`/ask/${r.id}`}>{r.question.length > 110 ? `${r.question.slice(0, 110)}…` : r.question}</Link>
                    <span>{dateTime(r.createdAt)}</span>
                  </li>
                ))}
              </ul>
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
