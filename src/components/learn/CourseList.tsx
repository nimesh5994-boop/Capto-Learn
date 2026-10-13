"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { ProgressBar, StatusDot, TrackIcon } from "./bits";
import styles from "./courses.module.css";

export type LessonStatus = "none" | "started" | "completed";

export interface CourseListTrack {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  lessons: { id: string; title: string; summary: string; minutes: number; level: "foundation" | "practitioner" | "advanced"; module: string; status: LessonStatus }[];
}

const LEVEL_LABEL = { foundation: "Foundation", practitioner: "Practitioner", advanced: "Advanced" } as const;
type LevelFilter = "all" | keyof typeof LEVEL_LABEL;
type StatusFilter = "all" | "todo" | "started" | "completed";

/**
 * The full course list: every course and every lesson, searchable and filterable — pick any lesson and go.
 * Expanded courses are remembered in this browser.
 */
export function CourseList({ tracks }: { tracks: CourseListTrack[] }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("capto-learn:open-courses") ?? "[]") as string[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore per-browser preference after hydration
      if (Array.isArray(saved)) setOpen(new Set(saved));
    } catch {
      /* ignore */
    }
  }, []);
  const toggle = (slug: string) =>
    setOpen((prev) => {
      const n = new Set(prev);
      if (n.has(slug)) n.delete(slug);
      else n.add(slug);
      try {
        localStorage.setItem("capto-learn:open-courses", JSON.stringify([...n]));
      } catch {
        /* ignore */
      }
      return n;
    });

  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtering = terms.length > 0 || level !== "all" || status !== "all";
  const shown = useMemo(
    () =>
      tracks
        .map((t) => ({
          ...t,
          matches: t.lessons.filter(
            (l) =>
              (level === "all" || l.level === level) &&
              (status === "all" || (status === "todo" ? l.status === "none" : l.status === status)) &&
              terms.every((w) => `${l.title} ${l.summary} ${l.module} ${t.title}`.toLowerCase().includes(w))
          ),
        }))
        .filter((t) => !filtering || t.matches.length > 0),
    [tracks, level, status, filtering, terms]
  );
  const totalMatches = shown.reduce((n, t) => n + t.matches.length, 0);
  const allOpen = shown.every((t) => open.has(t.slug));

  return (
    <div className="stack" style={{ gap: 14 }}>
      <div className={`card ${styles.filters}`}>
        <label className={styles.search}>
          <Search size={15} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a topic — e.g. flat rate scheme, P11D, s455, bank reconciliation" aria-label="Find a lesson" />
        </label>
        <div className={styles.chips} role="group" aria-label="Level">
          {(["all", "foundation", "practitioner", "advanced"] as const).map((l) => (
            <button key={l} type="button" className={`${styles.chip} ${level === l ? styles.chipOn : ""}`} onClick={() => setLevel(l)}>
              {l === "all" ? "All levels" : LEVEL_LABEL[l]}
            </button>
          ))}
        </div>
        <div className={styles.chips} role="group" aria-label="Progress">
          {(
            [
              ["all", "Any progress"],
              ["todo", "Not started"],
              ["started", "In progress"],
              ["completed", "Completed"],
            ] as const
          ).map(([v, label]) => (
            <button key={v} type="button" className={`${styles.chip} ${status === v ? styles.chipOn : ""}`} onClick={() => setStatus(v)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="row between small muted">
        <span>{filtering ? `${totalMatches} lesson${totalMatches === 1 ? "" : "s"} match` : `${tracks.length} courses · ${tracks.reduce((n, t) => n + t.lessons.length, 0)} lessons`}</span>
        {!filtering && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => shown.forEach((t) => (allOpen ? open.has(t.slug) : !open.has(t.slug)) && toggle(t.slug))}>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        )}
      </div>

      {shown.map((t) => {
        const done = t.lessons.filter((l) => l.status === "completed").length;
        const isOpen = filtering || open.has(t.slug);
        const list = filtering ? t.matches : t.lessons;
        const minutes = t.lessons.reduce((n, l) => n + l.minutes, 0);
        return (
          <section key={t.slug} className={`card ${styles.course}`}>
            <button type="button" className={styles.courseHead} onClick={() => !filtering && toggle(t.slug)} aria-expanded={isOpen}>
              <TrackIcon name={t.icon} size={18} />
              <span className={styles.courseTitle}>
                <strong>{t.title}</strong>
                <span className="small muted">
                  {t.lessons.length} lessons · about {Math.round(minutes / 60)} h · {done}/{t.lessons.length} done
                </span>
              </span>
              <span className={styles.courseBar}>
                <ProgressBar pct={t.lessons.length ? (done / t.lessons.length) * 100 : 0} label={`${t.title} progress`} />
              </span>
              {!filtering && (isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
            </button>
            {isOpen && (
              <ol className={styles.lessons}>
                {list.map((l, k) => {
                  const firstOfLevel = k === 0 || list[k - 1].level !== l.level;
                  return (
                    <li key={l.id}>
                      {firstOfLevel && <div className={styles.levelLabel}>{LEVEL_LABEL[l.level]}</div>}
                      <Link href={`/learn/${l.id}`} className={styles.lessonRow}>
                        <StatusDot status={l.status} />
                        <span className={styles.lessonText}>
                          <span className={styles.lessonTitle}>{l.title}</span>
                          <span className={styles.lessonSummary}>{l.summary}</span>
                        </span>
                        <span className={styles.lessonMeta}>
                          <span>{l.minutes} min</span>
                          <span className={`${styles.action} ${l.status === "completed" ? styles.actionDone : ""}`}>{l.status === "completed" ? "Review" : l.status === "started" ? "Continue" : "Start"}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        );
      })}
      {filtering && !shown.length && <div className="card card-pad muted">No lessons match. Try a different word, or clear the filters.</div>}
    </div>
  );
}
