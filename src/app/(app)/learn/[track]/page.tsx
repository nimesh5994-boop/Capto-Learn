import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Award, BadgeCheck, CheckCircle2, Clock, Compass, Layers, ListChecks, PlayCircle, Repeat, Target } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getTrack, moduleLessons, trackLessons } from "@/content";
import { trackFlashcards } from "@/content/flashcards";
import { LEVELS } from "@/content/types";
import { myProgress, trackStats } from "@/lib/learning/progress";
import { effectiveReview, reviewRows } from "@/lib/learning/review";
import { CATEGORIES, categoryOf } from "@/lib/learning/catalogue";
import { CourseGlyph } from "@/components/learn/bits";
import styles from "./course.module.css";

const hours = (min: number) => (min < 90 ? `${min} min` : `${(min / 60).toFixed(min % 60 ? 1 : 0)} hours`);

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const ctx = await requirePermission("learning.view");
  const track = getTrack(slug);
  if (!track) notFound();
  const [progress, reviews] = await Promise.all([myProgress(ctx.user.id), reviewRows()]);
  const s = trackStats(slug, progress);
  const refs = trackLessons(slug);
  const nextUp = refs.find((r) => progress.get(r.id)?.status !== "completed");
  const minutes = refs.reduce((n, r) => n + r.lesson.minutes, 0);
  const exercises = refs.reduce((n, r) => n + r.lesson.exercises.length, 0);
  const quizQs = refs.reduce((n, r) => n + r.lesson.quiz.length, 0);
  const cards = trackFlashcards(slug).length;
  const reviewed = refs.filter((r) => effectiveReview(r.lesson, reviews.get(r.id)) === "reviewed").length;
  const category = categoryOf(slug);
  const complete = s.done === s.total;
  const ring = 2 * Math.PI * 34;

  return (
    <>
      <Link href="/learn" className={styles.back}>
        <ArrowLeft size={14} /> All courses
      </Link>

      <section className={`${styles.hero} ${styles[`hero_${category}`]}`}>
        <div className={styles.heroMain}>
          <span className={styles.heroTag}>{CATEGORIES[category].label}</span>
          <div className={styles.heroTitleRow}>
            <span className={styles.heroGlyph}>
              <CourseGlyph name={track.icon} size={30} />
            </span>
            <h1 className={styles.heroTitle}>{track.title}</h1>
          </div>
          <p className={styles.heroSummary}>{track.summary}</p>
          <div className={styles.heroFacts}>
            <span>
              <ListChecks size={14} /> {refs.length} lessons
            </span>
            <span>
              <Clock size={14} /> {hours(minutes)}
            </span>
            <span>
              <Target size={14} /> {track.modules.length} levels
            </span>
            <span>
              <BadgeCheck size={14} /> {reviewed ? `${reviewed} of ${refs.length} reviewed` : "AI-drafted, review in progress"}
            </span>
          </div>
          <div className="row" style={{ gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            {nextUp ? (
              <Link href={`/learn/${nextUp.id}`} className={`btn ${styles.heroCta}`}>
                <PlayCircle size={16} /> {s.started ? "Continue" : "Start the course"}
              </Link>
            ) : (
              <Link href={`/certificates/${slug}`} className={`btn ${styles.heroCta}`}>
                <Award size={16} /> View your certificate
              </Link>
            )}
            {nextUp && <span className={styles.heroNext}>{s.started ? `Next: ${nextUp.lesson.title}` : `First lesson: ${nextUp.lesson.title}`}</span>}
          </div>
        </div>
        <div className={styles.heroRing} aria-label={`${s.done} of ${s.total} lessons complete`}>
          <svg viewBox="0 0 80 80" width="112" height="112" aria-hidden>
            <circle cx="40" cy="40" r="34" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="7" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeDasharray={ring} strokeDashoffset={ring * (1 - s.pct / 100)} transform="rotate(-90 40 40)" />
          </svg>
          <span className={styles.ringText}>
            <strong>{s.pct}%</strong>
            <span>
              {s.done}/{s.total} done
            </span>
          </span>
        </div>
      </section>

      <div className={styles.layout}>
        <div className={styles.curriculum}>
          <h2 className={styles.h2}>Course content</h2>
          {track.modules.map((m, mi) => {
            const lessons = moduleLessons(slug, m.slug);
            const done = lessons.filter((l) => progress.get(l.id)?.status === "completed").length;
            const mMin = lessons.reduce((n, l) => n + l.lesson.minutes, 0);
            return (
              <section key={m.slug} className={styles.module}>
                <header className={styles.moduleHead}>
                  <span className={styles.moduleNum}>{mi + 1}</span>
                  <div className={styles.moduleText}>
                    <div className={styles.moduleTitle}>
                      {m.title}
                      {m.title !== LEVELS[m.level].label && <span className={styles.levelTag}>{LEVELS[m.level].label}</span>}
                    </div>
                    <div className={styles.moduleSummary}>{m.summary}</div>
                  </div>
                  <span className={styles.moduleMeta}>
                    {done}/{lessons.length} · {hours(mMin)}
                  </span>
                </header>
                <ol className={styles.lessons}>
                  {lessons.map((r, li) => {
                    const p = progress.get(r.id);
                    const state = p?.status === "completed" ? "done" : p ? "started" : "todo";
                    const isNext = nextUp?.id === r.id;
                    return (
                      <li key={r.id}>
                        <Link href={`/learn/${r.id}`} className={`${styles.lesson} ${isNext ? styles.lessonNext : ""}`}>
                          <span className={`${styles.state} ${styles[`state_${state}`]}`} aria-label={state === "done" ? "Completed" : state === "started" ? "In progress" : "Not started"}>
                            {state === "done" ? <CheckCircle2 size={18} /> : <span>{li + 1}</span>}
                          </span>
                          <span className={styles.lessonText}>
                            <span className={styles.lessonTitle}>{r.lesson.title}</span>
                            <span className={styles.lessonSummary}>{r.lesson.summary}</span>
                          </span>
                          <span className={styles.lessonMeta}>
                            {effectiveReview(r.lesson, reviews.get(r.id)) === "reviewed" && (
                              <span className={styles.reviewed} title="Checked by a qualified reviewer">
                                <BadgeCheck size={14} />
                              </span>
                            )}
                            {p?.bestQuizScore != null && <span className={styles.score}>{p.bestQuizScore}%</span>}
                            <span>{r.lesson.minutes} min</span>
                            {isNext && <span className={styles.nextTag}>{s.started ? "Up next" : "Start here"}</span>}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>

        <aside className={styles.side}>
          <section className={styles.panel}>
            <h3>What you&apos;ll learn</h3>
            <ul className={styles.learn}>
              {track.modules.map((m) => (
                <li key={m.slug}>
                  <CheckCircle2 size={15} />
                  <span>{m.summary}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.panel}>
            <h3>This course includes</h3>
            <ul className={styles.includes}>
              <li>
                <ListChecks size={15} /> {refs.length} lessons in short steps
              </li>
              <li>
                <Target size={15} /> {exercises} practice exercises · {quizQs} quiz questions
              </li>
              {cards > 0 && (
                <li>
                  <Layers size={15} /> <Link href={`/flashcards?course=${slug}`}>{cards} flashcards</Link>
                </li>
              )}
              <li>
                <Repeat size={15} /> Daily 5 review of what you&apos;ve learned
              </li>
              <li>
                <Award size={15} /> {complete ? <Link href={`/certificates/${slug}`}>Your certificate</Link> : "Certificate when you finish"}
              </li>
            </ul>
          </section>
          <section className={styles.panel}>
            <h3>Not sure where to start?</h3>
            <p className="small muted" style={{ margin: "0 0 10px" }}>
              A few adaptive questions tell you which level to begin at.
            </p>
            <Link href={`/skills-check?go=1&subjects=${slug}`} className="btn btn-sm">
              <Compass size={14} /> Check my level
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
