"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ListOrdered } from "lucide-react";
import styles from "./player.module.css";

export interface PlayerStep {
  label: string;
  kind: string;
}

/**
 * Step-by-step lesson player. Every step's content is rendered on the server and passed in; the player only
 * shows one at a time (others stay mounted but hidden, so answers typed into exercises survive navigation).
 * The current step is remembered per lesson in this browser.
 */
export function LessonPlayer({ lessonId, steps, panels }: { lessonId: string; steps: PlayerStep[]; panels: ReactNode[] }) {
  const key = `capto-learn:step:${lessonId}`;
  const [i, setI] = useState(0);
  const [showList, setShowList] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(key));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring the saved position after hydration
      if (Number.isInteger(saved) && saved > 0 && saved < steps.length) setI(saved);
    } catch {
      /* storage unavailable — start at the beginning */
    }
  }, [key, steps.length]);

  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(steps.length - 1, n));
      setI(next);
      setVisited((v) => new Set(v).add(next));
      setShowList(false);
      try {
        localStorage.setItem(key, String(next));
      } catch {
        /* ignore */
      }
      document.getElementById("lesson-player")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [key, steps.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.closest("input, textarea, select, [contenteditable]") || e.altKey || e.ctrlKey || e.metaKey)) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  const pct = Math.round(((i + 1) / steps.length) * 100);
  const last = i === steps.length - 1;

  return (
    <div id="lesson-player" className={styles.player}>
      <div className={styles.topbar}>
        <button type="button" className={styles.stepToggle} onClick={() => setShowList((s) => !s)} aria-expanded={showList}>
          <ListOrdered size={15} />
          <span>
            Step {i + 1} of {steps.length}
          </span>
          <span className={styles.stepName}>· {steps[i].label}</span>
        </button>
        <div className={styles.bar} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Lesson progress">
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {showList && (
        <ol className={styles.stepList}>
          {steps.map((s, n) => (
            <li key={n}>
              <button type="button" className={`${styles.stepItem} ${n === i ? styles.stepCurrent : ""}`} onClick={() => go(n)}>
                {visited.has(n) && n !== i ? <CheckCircle2 size={13} /> : <span className={styles.stepNum}>{n + 1}</span>}
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      )}

      <div className={styles.stage}>
        {panels.map((p, n) => (
          <section key={n} hidden={n !== i} aria-label={steps[n].label}>
            {p}
          </section>
        ))}
      </div>

      <div className={styles.nav}>
        <button type="button" className="btn" onClick={() => go(i - 1)} disabled={i === 0}>
          <ArrowLeft size={15} /> Back
        </button>
        <span className="small faint">← → keys work too</span>
        {!last && (
          <button type="button" className="btn btn-primary" onClick={() => go(i + 1)}>
            {steps[i + 1]?.kind === "quiz" ? "Take the quiz" : "Next"} <ArrowRight size={15} />
          </button>
        )}
        {last && <span className="small muted">Pass the quiz to complete the lesson</span>}
      </div>
    </div>
  );
}
