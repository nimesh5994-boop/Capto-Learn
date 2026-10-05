import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePermission } from "@/lib/auth/dal";
import { getTrack, moduleLessons } from "@/content";
import { LEVELS } from "@/content/types";
import { myProgress, trackStats } from "@/lib/learning/progress";
import { effectiveReview, reviewRows } from "@/lib/learning/review";
import { ProgressBar, ReviewPill, StatusDot, TrackIcon } from "@/components/learn/bits";
import styles from "@/components/learn/learn.module.css";

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const ctx = await requirePermission("learning.view");
  const track = getTrack(slug);
  if (!track) notFound();
  const [progress, reviews] = await Promise.all([myProgress(ctx.user.id), reviewRows()]);
  const s = trackStats(slug, progress);
  const nextUp = track.modules.flatMap((m) => moduleLessons(slug, m.slug)).find((r) => progress.get(r.id)?.status !== "completed");

  return (
    <>
      <p className="small" style={{ margin: "0 0 8px" }}>
        <Link href="/learn">← All courses</Link>
      </p>
      <div className="page-head">
        <div className="row" style={{ gap: 14, alignItems: "flex-start" }}>
          <TrackIcon name={track.icon} size={22} />
          <div>
            <h1>{track.title}</h1>
            <p className="muted" style={{ maxWidth: 720 }}>
              {track.summary}
            </p>
          </div>
        </div>
        {nextUp && (
          <Link href={`/learn/${nextUp.id}`} className="btn btn-primary">
            {s.started ? "Continue" : "Start"}: {nextUp.lesson.title}
          </Link>
        )}
      </div>
      <div className="card card-pad" style={{ marginBottom: 8 }}>
        <div className="row between small" style={{ marginBottom: 8 }}>
          <span>
            <strong>{s.done}</strong> of {s.total} lessons complete
          </span>
          <span className="muted">{s.pct}%</span>
        </div>
        <ProgressBar pct={s.pct} />
      </div>

      {track.modules.map((m) => {
        const lessons = moduleLessons(slug, m.slug);
        const done = lessons.filter((l) => progress.get(l.id)?.status === "completed").length;
        return (
          <section key={m.slug}>
            <div className={styles.levelHead}>
              <h2>{m.title}</h2>
              <span className="pill">{LEVELS[m.level].label}</span>
              <span className="small faint">
                {done}/{lessons.length} complete
              </span>
            </div>
            <p className="small muted" style={{ margin: "-4px 0 10px" }}>
              {m.summary}
            </p>
            <div className="card">
              {lessons.map((r) => {
                const p = progress.get(r.id);
                return (
                  <Link key={r.id} href={`/learn/${r.id}`} className={styles.lessonRow}>
                    <StatusDot status={p?.status === "completed" ? "completed" : p ? "started" : "none"} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.lesson.title}</div>
                      <div className="small muted">{r.lesson.summary}</div>
                    </div>
                    <div className="meta">
                      <ReviewPill status={effectiveReview(r.lesson, reviews.get(r.id))} />
                      {p?.bestQuizScore != null && <span className="pill">Quiz {p.bestQuizScore}%</span>}
                      <span className="small faint">{r.lesson.minutes} min</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
