"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addBenchmarkQuestion, gradeBenchmarkResult, runBenchmarkQuestion, setBenchmarkActive } from "@/app/actions/benchmark";

function useAction() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const router = useRouter();
  const run = (fn: () => Promise<{ ok: true; message: string } | { ok: false; error: string }>, after?: () => void) =>
    start(async () => {
      const r = await fn();
      setMsg(r.ok ? { ok: true, text: r.message } : { ok: false, text: r.error });
      if (r.ok) {
        after?.();
        router.refresh();
      }
    });
  return { pending, msg, run };
}

export function AddBenchmarkQuestion({ areas }: { areas: { slug: string; title: string }[] }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ question: "", modelAnswer: "", area: areas[0]?.slug ?? "" });
  const { pending, msg, run } = useAction();
  if (!open)
    return (
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Add a question
      </button>
    );
  return (
    <form
      className="card card-pad stack"
      style={{ gap: 8 }}
      onSubmit={(e) => {
        e.preventDefault();
        run(() => addBenchmarkQuestion(f), () => setF({ ...f, question: "", modelAnswer: "" }));
      }}
    >
      <label>
        Question, as a practitioner would ask it
        <textarea rows={3} value={f.question} onChange={(e) => setF({ ...f, question: e.target.value })} />
      </label>
      <label>
        Model answer (what a correct answer must say, with the key figures and conditions)
        <textarea rows={5} value={f.modelAnswer} onChange={(e) => setF({ ...f, modelAnswer: e.target.value })} />
      </label>
      <label>
        Course area
        <select value={f.area} onChange={(e) => setF({ ...f, area: e.target.value })}>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.title}
            </option>
          ))}
        </select>
      </label>
      {msg && <div className={`alert small ${msg.ok ? "alert-info" : "alert-warning"}`}>{msg.text}</div>}
      <div className="row" style={{ gap: 6 }}>
        <button className="btn btn-primary btn-sm" disabled={pending}>
          {pending ? "Saving…" : "Save question"}
        </button>
        <button type="button" className="btn btn-sm" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </form>
  );
}

type Latest = { id: string; queryId: string | null; shortAnswer: string | null; failed: boolean; verdict: string | null; note: string | null; gradedBy: string | null; gradedAt: string | null; ranAt: string } | null;

const VERDICT = { correct: ["Correct", "pill-accepted"], partial: ["Partly correct", "pill-viewed"], wrong: ["Wrong", "pill-declined"] } as const;

export function BenchmarkRow({ q, latest }: { q: { id: string; question: string; modelAnswer: string; area: string; active: boolean; createdBy: string }; latest: Latest }) {
  const { pending, msg, run } = useAction();
  const [note, setNote] = useState("");
  const v = latest?.verdict as keyof typeof VERDICT | null;
  return (
    <article className="card card-pad stack" style={{ gap: 8, opacity: q.active ? 1 : 0.6 }}>
      <div className="row between" style={{ gap: 8, flexWrap: "wrap" }}>
        <span className="small muted">
          {q.area} · set by {q.createdBy}
          {!q.active && " · retired"}
        </span>
        <span className="row" style={{ gap: 6 }}>
          {v && <span className={`pill ${VERDICT[v][1]}`}>{VERDICT[v][0]}</span>}
          <button className="btn btn-sm" disabled={pending || !q.active} onClick={() => run(() => runBenchmarkQuestion(q.id))}>
            {pending ? "Working…" : latest ? "Run again" : "Run"}
          </button>
          <button className="btn btn-sm" disabled={pending} onClick={() => run(() => setBenchmarkActive(q.id, !q.active))}>
            {q.active ? "Retire" : "Restore"}
          </button>
        </span>
      </div>
      <strong>{q.question}</strong>
      <details>
        <summary className="small">Model answer</summary>
        <p className="small" style={{ whiteSpace: "pre-wrap" }}>
          {q.modelAnswer}
        </p>
      </details>
      {latest && (
        <div className="stack" style={{ gap: 6, borderTop: "1px solid var(--border)", paddingTop: 8 }}>
          <span className="small muted">
            Ask Capto&apos;s answer ({latest.ranAt}){latest.queryId && <> · <Link href={`/ask/${latest.queryId}`}>open in full</Link></>}
          </span>
          <p className="small" style={{ margin: 0 }}>
            {latest.failed ? "No answer was produced." : latest.shortAnswer}
          </p>
          {latest.verdict ? (
            <span className="small faint">
              Graded by {latest.gradedBy} on {latest.gradedAt}
              {latest.note ? `: ${latest.note}` : ""}
            </span>
          ) : (
            <div className="stack" style={{ gap: 6 }}>
              <textarea rows={2} placeholder="What was wrong or missing (required unless correct)" value={note} onChange={(e) => setNote(e.target.value)} style={{ minHeight: 56 }} aria-label="Grading note" />
              <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                {(["correct", "partial", "wrong"] as const).map((verdict) => (
                  <button key={verdict} className={`btn btn-sm${verdict === "correct" ? " btn-primary" : ""}`} disabled={pending} onClick={() => run(() => gradeBenchmarkResult(latest.id, { verdict, note }))}>
                    {VERDICT[verdict][0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {msg && <div className={`alert small ${msg.ok ? "alert-info" : "alert-warning"}`}>{msg.text}</div>}
    </article>
  );
}
