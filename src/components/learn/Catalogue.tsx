"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Award, CheckCircle2, Clock, PlayCircle, Search, X } from "lucide-react";
import { CATEGORIES, type CategoryKey } from "@/lib/learning/catalogue";
import { CourseGlyph } from "./bits";
import styles from "./catalogue.module.css";

export type LessonStatus = "none" | "started" | "completed";

export interface CatalogueCourse {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  category: CategoryKey;
  reviewed: number;
  lessons: { id: string; title: string; summary: string; minutes: number; level: "foundation" | "practitioner" | "advanced"; module: string; status: LessonStatus }[];
}

type StatusFilter = "all" | "progress" | "new" | "done";
const LEVEL_SHORT = { foundation: "Foundation", practitioner: "Practitioner", advanced: "Advanced" } as const;
const hours = (min: number) => (min < 90 ? `${min} min` : `${(min / 60).toFixed(min % 60 ? 1 : 0)} h`);

function courseState(c: CatalogueCourse) {
  const done = c.lessons.filter((l) => l.status === "completed").length;
  const started = c.lessons.some((l) => l.status !== "none");
  const next = c.lessons.find((l) => l.status !== "completed");
  return { done, total: c.lessons.length, started, complete: done === c.lessons.length, next, pct: Math.round((done / Math.max(1, c.lessons.length)) * 100) };
}

/** One course as a card: cover, title, summary, what's in it, and where you are. */
export function CourseCard({ c }: { c: CatalogueCourse }) {
  const s = courseState(c);
  const minutes = c.lessons.reduce((n, l) => n + l.minutes, 0);
  const levels = (["foundation", "practitioner", "advanced"] as const).filter((lv) => c.lessons.some((l) => l.level === lv));
  return (
    <Link href={`/learn/${c.slug}`} className={styles.card}>
      <div className={`${styles.cover} ${styles[`cover_${c.category}`]}`}>
        <span className={styles.coverGlyph}>
          <CourseGlyph name={c.icon} size={34} />
        </span>
        <span className={styles.coverTag}>{CATEGORIES[c.category].label}</span>
        {s.complete && (
          <span className={styles.coverDone}>
            <Award size={13} /> Completed
          </span>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{c.title}</h3>
        <p className={styles.summary}>{c.summary}</p>
        <div className={styles.meta}>
          <span>{c.lessons.length} lessons</span>
          <span>
            <Clock size={12} /> {hours(minutes)}
          </span>
          <span>{levels.map((l) => LEVEL_SHORT[l]).join(" · ")}</span>
        </div>
        <div className={styles.foot}>
          {s.started ? (
            <>
              <div className={styles.bar} role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title} progress`}>
                <span style={{ width: `${s.pct}%` }} />
              </div>
              <span className={styles.footText}>
                {s.complete ? (
                  <>
                    <CheckCircle2 size={13} /> All {s.total} done
                  </>
                ) : (
                  `${s.done} of ${s.total} · ${s.pct}%`
                )}
              </span>
            </>
          ) : (
            <span className={styles.footText}>
              <PlayCircle size={13} /> Start course
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/** The catalogue: every course as a card, filterable by area and progress, with a lesson-level search. */
export function Catalogue({ courses }: { courses: CatalogueCourse[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CategoryKey | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (text: string) => terms.every((t) => text.toLowerCase().includes(t));

  const shown = useMemo(
    () =>
      courses.filter((c) => {
        const s = courseState(c);
        if (category !== "all" && c.category !== category) return false;
        if (status === "progress" && !(s.started && !s.complete)) return false;
        if (status === "new" && s.started) return false;
        if (status === "done" && !s.complete) return false;
        return !terms.length || matches(`${c.title} ${c.summary}`) || c.lessons.some((l) => matches(`${l.title} ${l.summary}`));
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courses, category, status, q]
  );
  const lessonHits = terms.length
    ? courses
        .filter((c) => category === "all" || c.category === category)
        .flatMap((c) => c.lessons.filter((l) => matches(`${l.title} ${l.summary}`)).map((l) => ({ c, l })))
        .slice(0, 8)
    : [];

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses and lessons — e.g. flat rate scheme, s455, bank reconciliation" aria-label="Search courses and lessons" />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </label>
        <div className={styles.chips} role="group" aria-label="Subject area">
          {(["all", ...Object.keys(CATEGORIES)] as (CategoryKey | "all")[]).map((k) => (
            <button key={k} type="button" aria-pressed={category === k} className={`${styles.chip} ${category === k ? styles.chipOn : ""}`} onClick={() => setCategory(k)}>
              {k === "all" ? "All areas" : CATEGORIES[k].label}
            </button>
          ))}
          <span className={styles.sep} />
          {(
            [
              ["all", "Any progress"],
              ["progress", "In progress"],
              ["new", "Not started"],
              ["done", "Completed"],
            ] as [StatusFilter, string][]
          ).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={status === k} className={`${styles.chip} ${status === k ? styles.chipOn : ""}`} onClick={() => setStatus(k)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {lessonHits.length > 0 && (
        <section className={`card ${styles.hits}`}>
          <div className={styles.hitsHead}>Lessons matching “{q.trim()}”</div>
          {lessonHits.map(({ c, l }) => (
            <Link key={l.id} href={`/learn/${l.id}`} className={styles.hit}>
              <span className={`${styles.hitDot} ${l.status === "completed" ? styles.hitDone : l.status === "started" ? styles.hitStarted : ""}`} />
              <span className={styles.hitText}>
                <strong>{l.title}</strong>
                <span>
                  {c.title} · {LEVEL_SHORT[l.level]} · {l.minutes} min
                </span>
              </span>
            </Link>
          ))}
        </section>
      )}

      {shown.length ? (
        <div className={styles.grid}>
          {shown.map((c) => (
            <CourseCard key={c.slug} c={c} />
          ))}
        </div>
      ) : (
        <div className="card card-pad muted">No courses match. Try a different search or filter.</div>
      )}
    </div>
  );
}
