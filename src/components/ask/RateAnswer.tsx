"use client";

import { useState, useTransition } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { rateAnswer } from "@/app/actions/research";

export function RateAnswer({ id, initial }: { id: string; initial: boolean | null }) {
  const [value, setValue] = useState<boolean | null>(initial);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();
  const rate = (v: boolean) => {
    setValue(v);
    start(() => rateAnswer(id, v));
  };
  return (
    <div className="card card-pad stack" style={{ gap: 8 }}>
      <div className="row between">
        <span className="small">Was this answer useful?</span>
        <span className="row" style={{ gap: 6 }}>
          <button className={`btn btn-sm ${value === true ? "btn-primary" : ""}`} onClick={() => rate(true)} disabled={pending} aria-label="Helpful">
            <ThumbsUp size={14} />
          </button>
          <button className={`btn btn-sm ${value === false ? "btn-primary" : ""}`} onClick={() => rate(false)} disabled={pending} aria-label="Not helpful">
            <ThumbsDown size={14} />
          </button>
        </span>
      </div>
      {value === false && !sent && (
        <form
          className="stack"
          style={{ gap: 6 }}
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              await rateAnswer(id, false, note);
              setSent(true);
            });
          }}
        >
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="What was wrong or missing?" />
          <button className="btn btn-sm" disabled={pending || !note.trim()}>
            Send feedback
          </button>
        </form>
      )}
      {sent && <span className="small muted">Thanks, that helps us improve Ask Capto.</span>}
    </div>
  );
}
