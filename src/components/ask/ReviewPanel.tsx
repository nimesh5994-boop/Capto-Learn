"use client";

import { useState, useTransition } from "react";
import { ShieldCheck } from "lucide-react";
import { reviewAnswer } from "@/app/actions/research";
import { reviewScenario } from "@/app/actions/planning";

type Status = "approved" | "changes" | null;

/**
 * Reviewer's decision for the research register. Approved answers are visible to the whole firm and reused
 * first; "needs changes" stops reuse until it's approved again.
 */
export function ReviewPanel({ id, initial, kind = "answer" }: { id: string; kind?: "answer" | "scenario"; initial: { status: Status; by: string | null; at: string | null; note: string | null } }) {
  const [state, setState] = useState(initial);
  const [note, setNote] = useState(initial.note ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const decide = (status: Status) =>
    start(async () => {
      setError(null);
      const r = kind === "scenario" ? await reviewScenario(id, status, note) : await reviewAnswer(id, status, note);
      if (!r.ok) return setError(r.error);
      setState({ status, by: status ? "you" : null, at: status ? new Date().toISOString() : null, note: status ? note.trim() || null : null });
      if (!status) setNote("");
    });

  return (
    <div className="card card-pad stack" style={{ gap: 8 }}>
      <span className="small row" style={{ gap: 6 }}>
        <ShieldCheck size={14} /> <strong>Firm review</strong>
        <span className={`pill ${state.status === "approved" ? "pill-accepted" : state.status === "changes" ? "pill-declined" : ""}`}>
          {state.status === "approved" ? "Approved" : state.status === "changes" ? "Needs changes" : "Not reviewed"}
        </span>
      </span>
      {state.status && state.by && (
        <span className="small muted">
          By {state.by}
          {state.at ? ` on ${new Date(state.at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : ""}
        </span>
      )}
      <textarea rows={2} value={note} maxLength={2000} placeholder="Review note (required for “needs changes”)" onChange={(e) => setNote(e.target.value)} aria-label="Review note" style={{ minHeight: 60 }} />
      {error && <div className="alert alert-warning small">{error}</div>}
      <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
        <button className="btn btn-sm btn-primary" disabled={pending} onClick={() => decide("approved")}>
          Approve
        </button>
        <button className="btn btn-sm" disabled={pending} onClick={() => decide("changes")}>
          Needs changes
        </button>
        {state.status && (
          <button className="btn btn-sm" disabled={pending} onClick={() => decide(null)}>
            Clear
          </button>
        )}
      </div>
      <span className="small faint">
        {kind === "scenario" ? "Approved scenarios are visible to everyone in the firm. Review each researched issue separately too." : "Approved answers are visible to everyone in the firm and reused first when a colleague asks the same question."}
      </span>
    </div>
  );
}
