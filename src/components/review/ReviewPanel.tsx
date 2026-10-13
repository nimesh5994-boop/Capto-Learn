"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLessonReview } from "@/app/actions/training";
import { REVIEW_CHECKLIST } from "@/lib/learning/reviewChecklist";
import styles from "./review.module.css";

/** Checklist + decision. Signing off needs every box ticked; "Needs changes" needs a note saying what. */
export function ReviewPanel({ lessonId, current, nextHref }: { lessonId: string; current: string; nextHref: string | null }) {
  const router = useRouter();
  const [ticked, setTicked] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const all = ticked.length === REVIEW_CHECKLIST.length;

  const decide = (status: "reviewed" | "needs_changes" | "draft") =>
    start(async () => {
      const r = await setLessonReview(lessonId, { status, notes, checklist: status === "reviewed" ? ticked : [] });
      if (!r.ok) return setMsg({ ok: false, text: r.error });
      setMsg({ ok: true, text: r.message });
      setTicked([]);
      setNotes("");
      if (status !== "draft" && nextHref) router.push(nextHref);
      else router.refresh();
    });

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="stack" style={{ gap: 8 }}>
        {REVIEW_CHECKLIST.map((c) => (
          <label key={c.key} className={styles.check}>
            <input type="checkbox" checked={ticked.includes(c.key)} disabled={pending} onChange={(e) => setTicked((t) => (e.target.checked ? [...t, c.key] : t.filter((k) => k !== c.key)))} />
            <span>{c.label}</span>
          </label>
        ))}
        <button type="button" className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} disabled={pending} onClick={() => setTicked(all ? [] : REVIEW_CHECKLIST.map((c) => c.key))}>
          {all ? "Untick all" : "Tick all"}
        </button>
      </div>
      <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes — required for “Needs changes” (what’s wrong and the correct position)" aria-label="Review notes" />
      {msg && <div className={`alert ${msg.ok ? "alert-info" : "alert-error"}`}>{msg.text}</div>}
      <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
        <button className="btn btn-primary" disabled={pending || !all} onClick={() => decide("reviewed")} title={all ? undefined : "Tick every checklist item first"}>
          {current === "reviewed" ? "Re-sign off" : "Sign off"}
        </button>
        <button className="btn" disabled={pending || !notes.trim()} onClick={() => decide("needs_changes")} title={notes.trim() ? undefined : "Add a note saying what needs changing"}>
          Needs changes
        </button>
        {current !== "draft" && (
          <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => decide("draft")}>
            Reset to draft
          </button>
        )}
      </div>
      {nextHref && <p className="small faint" style={{ margin: 0 }}>After your decision you&apos;ll move straight to the next lesson waiting for review.</p>}
    </div>
  );
}
