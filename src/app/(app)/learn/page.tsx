import Link from "next/link";
import { ArrowRight, Compass, PlayCircle } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getLesson, getTrack, tracks, trackLessons } from "@/content";
import { LEVELS } from "@/content/types";
import { myProgress } from "@/lib/learning/progress";
import { effectiveReview, reviewRows } from "@/lib/learning/review";
import { dueCount } from "@/lib/learning/daily";
import { categoryOf, PATHS } from "@/lib/learning/catalogue";
import { Catalogue, type CatalogueCourse } from "@/components/learn/Catalogue";
import { CourseGlyph } from "@/components/learn/bits";
import styles from "./learn.module.css";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const ctx = await requirePermission("learning.view");
  const [progress, reviews, reviewDue] = await Promise.all([myProgress(ctx.user.id), reviewRows(), dueCount(ctx.user.id)]);
  const all = tracks();
  const courses: CatalogueCourse[] = all.map((t) => {
    const refs = trackLessons(t.slug);
    return {
      slug: t.slug,
      title: t.title,
      icon: t.icon,
      summary: t.summary,
      category: categoryOf(t.slug),
      reviewed: refs.filter((r) => effectiveReview(r.lesson, reviews.get(r.id)) === "reviewed").length,
      lessons: refs.map((r) => {
        const p = progress.get(r.id);
        return { id: r.id, title: r.lesson.title, summary: r.lesson.summary, minutes: r.lesson.minutes, level: r.lesson.level, module: r.module.title, status: p?.status === "completed" ? "completed" : p ? "started" : "none" };
      }),
    };
  });

  const completed = [...progress.values()].filter((p) => p.status === "completed");
  const minutesDone = completed.reduce((n, p) => n + (getLesson(p.lessonId)?.lesson.minutes ?? 0), 0);
  const coursesDone = courses.filter((c) => c.lessons.every((l) => l.status === "completed")).length;
  const totalLessons = courses.reduce((n, c) => n + c.lessons.length, 0);
  const last = [...progress.values()].filter((p) => getLesson(p.lessonId)).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0];
  const lastRef = last ? getLesson(last.lessonId) : undefined;
  // Resume the lesson last touched if unfinished, otherwise the next lesson in that course.
  const resume = lastRef
    ? last.status !== "completed"
      ? lastRef
      : trackLessons(lastRef.track.slug).find((r) => progress.get(r.id)?.status !== "completed")
    : undefined;

  const pathState = PATHS.map((p) => {
    const lessons = p.courses.flatMap((slug) => trackLessons(slug));
    const done = lessons.filter((r) => progress.get(r.id)?.status === "completed").length;
    const nextCourse = p.courses.find((slug) => trackLessons(slug).some((r) => progress.get(r.id)?.status !== "completed")) ?? p.courses[0];
    return { p, done, total: lessons.length, hours: Math.round(lessons.reduce((n, r) => n + r.lesson.minutes, 0) / 60), nextCourse };
  });

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.kicker}>Capto Learn</div>
          <h1 className={styles.heroTitle}>{resume ? "Pick up where you left off" : "Learn UK practice work, one short lesson at a time"}</h1>
          {resume ? (
            <Link href={`/learn/${resume.id}`} className={styles.resume}>
              <span className={styles.resumeGlyph}>
                <CourseGlyph name={resume.track.icon} size={22} />
              </span>
              <span className={styles.resumeText}>
                <span className={styles.resumeCourse}>
                  {resume.track.title} · {LEVELS[resume.lesson.level].label} · {resume.lesson.minutes} min
                </span>
                <strong>{resume.lesson.title}</strong>
              </span>
              <span className="btn btn-primary">
                <PlayCircle size={16} /> {last?.status === "completed" ? "Next lesson" : "Continue"}
              </span>
            </Link>
          ) : (
            <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
              <Link href="/learn/foundations" className="btn btn-primary">
                Start with Accounting fundamentals <ArrowRight size={15} />
              </Link>
              <Link href="/skills-check" className="btn">
                <Compass size={15} /> Find my level first
              </Link>
            </div>
          )}
        </div>
        <dl className={styles.heroStats}>
          <div>
            <dt>Lessons done</dt>
            <dd>
              {completed.length}
              <small> / {totalLessons}</small>
            </dd>
          </div>
          <div>
            <dt>Hours learned</dt>
            <dd>{(minutesDone / 60).toFixed(1)}</dd>
          </div>
          <div>
            <dt>Courses completed</dt>
            <dd>{coursesDone}</dd>
          </div>
          <div>
            <dt>Daily 5</dt>
            <dd>{reviewDue ? <Link href="/review">{reviewDue} due</Link> : <span className={styles.ok}>Up to date</span>}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Learning paths</h2>
          <span className="small muted">Courses grouped for a role — follow one from start to finish.</span>
        </div>
        <div className={styles.paths}>
          {pathState.map(({ p, done, total, hours, nextCourse }) => (
            <Link key={p.key} href={`/learn/${nextCourse}`} className={styles.path}>
              <div className={styles.pathGlyphs}>
                {p.courses.map((slug) => (
                  <span key={slug} className={styles[`glyph_${categoryOf(slug)}`]} title={getTrack(slug)?.title}>
                    <CourseGlyph name={getTrack(slug)?.icon ?? ""} size={15} strokeWidth={2} />
                  </span>
                ))}
              </div>
              <strong className={styles.pathTitle}>{p.title}</strong>
              <span className="small muted">{p.forWho}</span>
              <span className={styles.pathMeta}>
                {p.courses.length} courses · {total} lessons · ~{hours} h
              </span>
              <span className={styles.pathBar} aria-label={`${p.title}: ${done} of ${total} lessons done`}>
                <span style={{ width: `${Math.round((done / Math.max(1, total)) * 100)}%` }} />
              </span>
              <span className={styles.pathFoot}>
                {done ? `${Math.round((done / total) * 100)}% complete` : "Not started"}
                <span className={styles.pathGo}>
                  {done ? "Continue" : "Start"} <ArrowRight size={13} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>All courses</h2>
          <span className="small muted">
            {all.length} courses · {totalLessons} lessons · from first principles to advanced
          </span>
        </div>
        <Catalogue courses={courses} />
      </section>
    </>
  );
}
