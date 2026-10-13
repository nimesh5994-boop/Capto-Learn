"use client";

import { useState, useTransition } from "react";
import { Flag } from "lucide-react";
import { reportLessonProblem } from "@/app/actions/learning";

const KINDS = [
  { value: "error", label: "Something is wrong" },
  { value: "out_of_date", label: "Out of date (rates, rules, dates)" },
  { value: "unclear", label: "Unclear or confusing" },
  { value: "suggestion", label: "Suggestion" },
];

/** Lets any learner flag a problem — goes straight to the platform's content reviewers. */
export function ReportProblem({ lessonId }: { lessonId: string }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("error");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (done) return <p className="small muted">Thanks — our reviewers will check it.</p>;
  if (!open)
    return (
      <button className="btn btn-sm" onClick={() => setOpen(true)}>
        <Flag size={14} /> Report a problem
      </button>
    );
  return (
    <form
      className="stack"
      style={{ gap: 8 }}
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await reportLessonProblem(lessonId, { kind, message });
          if (r.ok) setDone(true);
          else setError(r.error);
        });
      }}
    >
      <select value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Problem type">
        {KINDS.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </select>
      <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What's wrong, and where? A link to the correct source helps." />
      {error && <div className="alert alert-error small">{error}</div>}
      <div className="row" style={{ gap: 8 }}>
        <button className="btn btn-primary btn-sm" disabled={pending}>
          Send
        </button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
