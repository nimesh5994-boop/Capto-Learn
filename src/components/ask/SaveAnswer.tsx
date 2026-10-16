"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, FileDown, FileText } from "lucide-react";
import { saveAnswer, unsaveAnswer } from "@/app/actions/research";

type Saved = { title: string; reference: string; note: string } | null;

/**
 * Save an answer to "Saved research" (title, client/reference, note) and download it as a Word or PDF report.
 * Both are free: they reuse the stored answer, so nothing is charged against the firm's question allowance.
 */
export function SaveAnswer({ id, question, initial }: { id: string; question: string; initial: Saved }) {
  const [saved, setSaved] = useState<Saved>(initial);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [form, setForm] = useState({ title: initial?.title ?? question.slice(0, 160), reference: initial?.reference ?? "", note: initial?.note ?? "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    start(async () => {
      const r = await saveAnswer(id, form);
      if (!r.ok) return setError(r.error);
      setSaved({ title: form.title.trim() || question, reference: form.reference.trim(), note: form.note.trim() });
      setEditing(false);
    });
  };

  return (
    <div id="save" className="card card-pad stack" style={{ gap: 10, scrollMarginTop: 80 }}>
      {editing ? (
        <form onSubmit={submit} className="stack" style={{ gap: 8 }}>
          <label className="small">
            Title
            <input value={form.title} maxLength={160} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="small">
            Client or reference <span className="faint">(optional, shown on the report)</span>
            <input value={form.reference} maxLength={120} placeholder="e.g. Smith Ltd · year end 31/3/27" onChange={(e) => setForm({ ...form, reference: e.target.value })} />
          </label>
          <label className="small">
            Note <span className="faint">(optional)</span>
            <textarea rows={3} value={form.note} maxLength={2000} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </label>
          {error && <div className="alert alert-warning small">{error}</div>}
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn-sm btn-primary" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </button>
            <button type="button" className="btn btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : saved ? (
        <div className="stack" style={{ gap: 6 }}>
          <span className="small row" style={{ gap: 6 }}>
            <BookmarkCheck size={14} /> <strong>Saved</strong> · <Link href="/ask/saved">Saved research</Link>
          </span>
          {saved.reference && <span className="small muted">{saved.reference}</span>}
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn-sm" onClick={() => setEditing(true)}>
              Edit details
            </button>
            <button
              className="btn btn-sm"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  await unsaveAnswer(id);
                  setSaved(null);
                })
              }
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="row between" style={{ gap: 8 }}>
          <span className="small">Keep this answer to reopen free later.</span>
          <button className="btn btn-sm btn-primary" onClick={() => setEditing(true)}>
            <Bookmark size={13} /> Save
          </button>
        </div>
      )}
      <div className="row" style={{ gap: 6, flexWrap: "wrap", borderTop: "1px solid var(--border)", paddingTop: 10 }}>
        <span className="small muted" style={{ width: "100%" }}>
          Download a report to share{saved?.reference ? ` (includes ${saved.reference})` : ""}:
        </span>
        <a className="btn btn-sm" href={`/api/research/${id}/report?format=docx`} download>
          <FileText size={13} /> Word
        </a>
        <a className="btn btn-sm" href={`/api/research/${id}/report?format=pdf`} download>
          <FileDown size={13} /> PDF
        </a>
      </div>
    </div>
  );
}
