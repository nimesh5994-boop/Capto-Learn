"use client";

import { useEffect, useState } from "react";
import styles from "./ask.module.css";

export type Depth = "essentials" | "practitioner" | "expert";
const DEPTHS: { key: Depth; label: string; hint: string }[] = [
  { key: "essentials", label: "Essentials", hint: "What you need to act" },
  { key: "practitioner", label: "Practitioner", hint: "Conditions, figures, records" },
  { key: "expert", label: "Expert", hint: "Exceptions and edge cases" },
];
const KEY = "capto-answer-depth";

/** Shows answer points up to the chosen depth. The points are server-rendered; this only hides deeper ones. */
export function DepthSwitch({ counts, children }: { counts: Record<Depth, number>; children: React.ReactNode }) {
  const [depth, setDepth] = useState<Depth>("essentials");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a per-viewer preference after hydration
      if (saved === "essentials" || saved === "practitioner" || saved === "expert") setDepth(saved);
    } catch {}
  }, []);
  const choose = (d: Depth) => {
    setDepth(d);
    try {
      localStorage.setItem(KEY, d);
    } catch {}
  };
  const upTo = DEPTHS.findIndex((d) => d.key === depth);
  const hidden = DEPTHS.slice(upTo + 1).reduce((n, d) => n + counts[d.key], 0);

  return (
    <div className={styles.depth} data-depth={depth}>
      <div className={styles.depthBar}>
        <span className="small muted">Depth</span>
        <div className={styles.depthSeg} role="radiogroup" aria-label="How much detail to show">
          {DEPTHS.map((d) => (
            <button key={d.key} type="button" role="radio" aria-checked={depth === d.key} title={d.hint} className={depth === d.key ? styles.depthOn : undefined} onClick={() => choose(d.key)}>
              {d.label}
              {counts[d.key] > 0 && <span className={styles.depthCount}>{counts[d.key]}</span>}
            </button>
          ))}
        </div>
      </div>
      {children}
      {hidden > 0 && (
        <button type="button" className={styles.more} onClick={() => choose(DEPTHS[upTo + 1].key)}>
          Show {hidden} more detailed point{hidden === 1 ? "" : "s"} ({DEPTHS[upTo + 1].label.toLowerCase()} level) ↓
        </button>
      )}
    </div>
  );
}
