import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { tracks, trackLessons } from "@/content";
import { LEVELS, type Level } from "@/content/types";
import { myProgress, trackStats } from "@/lib/learning/progress";
import { ProgressBar, TrackIcon } from "@/components/learn/bits";
import styles from "@/components/learn/learn.module.css";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const ctx = await requirePermission("learning.view");
  const progress = await myProgress(ctx.user.id);
  const all = tracks();
  const totalLessons = all.reduce((n, t) => n + trackLessons(t.slug).length, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Courses</h1>
          <p className="muted">
            {all.length} tracks · {totalLessons} lessons, from first principles to advanced technical work. Each lesson has theory, a real-world scenario, practical exercises and a quiz.
          </p>
        </div>
      </div>
      <div className="row" style={{ gap: 18, marginBottom: 18, flexWrap: "wrap" }}>
        {(Object.keys(LEVELS) as Level[]).map((l) => (
          <span key={l} className="small muted">
            <strong style={{ color: "var(--text)" }}>{LEVELS[l].label}</strong> — {LEVELS[l].blurb}
          </span>
        ))}
      </div>
      <div className={styles.trackGrid}>
        {all.map((t) => {
          const s = trackStats(t.slug, progress);
          return (
            <Link key={t.slug} href={`/learn/${t.slug}`} className={`card card-pad ${styles.trackCard}`}>
              <div className="row between">
                <TrackIcon name={t.icon} />
                <span className="small faint">{s.total} lesson{s.total === 1 ? "" : "s"}</span>
              </div>
              <h2 className={styles.trackTitle}>{t.title}</h2>
              <p className="small muted" style={{ margin: 0, flex: 1 }}>
                {t.summary}
              </p>
              <ProgressBar pct={s.pct} label={`${t.title} progress`} />
              <span className="small faint">{s.done ? `${s.done} of ${s.total} complete` : s.started ? "In progress" : "Not started"}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
