"use client";

import { useState, useTransition } from "react";
import { resolveFeedback, setLessonReview } from "@/app/actions/training";

export function ReviewControls({ lessonId, current }: { lessonId: string; current: string }) {
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const act = (status: "reviewed" | "needs_changes" | "draft") =>
    start(async () => {
      const r = await setLessonReview(lessonId, { status, notes });
      setMsg(r.ok ? r.message : r.error);
    });
  return (
    <div className="stack" style={{ gap: 6, minWidth: 260 }}>
      <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Review notes (optional)" aria-label="Review notes" />
      <div className="row" style={{ gap: 6 }}>
        <button className="btn btn-primary btn-sm" disabled={pending} onClick={() => act("reviewed")}>
          {current === "reviewed" ? "Re-sign off" : "Sign off"}
        </button>
        <button className="btn btn-sm" disabled={pending} onClick={() => act("needs_changes")}>
          Needs changes
        </button>
        {current !== "draft" && (
          <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => act("draft")}>
            Reset
          </button>
        )}
      </div>
      {msg && <span className="small muted">{msg}</span>}
    </div>
  );
}

export function FeedbackControls({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const [done, setDone] = useState<string | null>(null);
  if (done) return <span className="small muted">{done}</span>;
  const act = (s: "fixed" | "dismissed") =>
    start(async () => {
      const r = await resolveFeedback(id, s);
      setDone(r.ok ? r.message : r.error);
    });
  return (
    <span className="row" style={{ gap: 6 }}>
      <button className="btn btn-sm" disabled={pending} onClick={() => act("fixed")}>
        Fixed
      </button>
      <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => act("dismissed")}>
        Dismiss
      </button>
    </span>
  );
}
