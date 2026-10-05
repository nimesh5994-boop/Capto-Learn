"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Plus, RotateCcw, Trash2, XCircle } from "lucide-react";
import { submitExercise, type ExerciseFeedback } from "@/app/actions/learning";
import type { ExerciseResponse, PublicExercise } from "@/lib/learning/marking";
import type { JournalLine } from "@/content/types";
import styles from "./learn.module.css";

/** A public exercise plus server-rendered HTML for its prompt and option text. */
export type RenderedExercise = PublicExercise & { promptHtml: string; optionsHtml?: string[]; itemsHtml?: string[] };

const KIND_LABEL: Record<PublicExercise["kind"], string> = {
  mcq: "Multiple choice",
  multi: "Select all that apply",
  numeric: "Calculation",
  journal: "Post the journal",
  classify: "Classify each item",
};

const gbp = (n: number) => n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function Exercise({ lessonId, ex, number, solvedBefore }: { lessonId: string; ex: RenderedExercise; number: number; solvedBefore: boolean }) {
  const [feedback, setFeedback] = useState<ExerciseFeedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [attempt, setAttempt] = useState(0);

  const submit = (response: ExerciseResponse) =>
    start(async () => {
      setError(null);
      const r = await submitExercise(lessonId, ex.id, response);
      if (r.ok) setFeedback(r.data);
      else setError(r.error);
    });

  const retry = () => {
    setFeedback(null);
    setAttempt((a) => a + 1);
  };

  return (
    <div className={styles.exercise}>
      <div className={styles.exerciseHead}>
        <span className={styles.exKind}>
          {number}. {KIND_LABEL[ex.kind]}
        </span>
        {solvedBefore && !feedback && (
          <span className="pill pill-accepted">
            <CheckCircle2 size={12} /> Solved before
          </span>
        )}
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: ex.promptHtml }} />
      <Body key={attempt} ex={ex} feedback={feedback} pending={pending} onSubmit={submit} />
      {error && <div className="alert alert-error">{error}</div>}
      {feedback && (
        <div className={`${styles.feedback} ${feedback.correct ? styles.feedbackRight : styles.feedbackWrong}`}>
          <div className={styles.feedbackTitle}>
            {feedback.correct ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {feedback.correct ? "Correct" : "Not quite"}
          </div>
          {feedback.detail?.journalFeedback && feedback.detail.journalFeedback.length > 0 && (
            <ul style={{ margin: "4px 0 8px", paddingLeft: 18 }}>
              {feedback.detail.journalFeedback.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
          <Reveal ex={ex} feedback={feedback} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: feedback.explainHtml }} />
          {feedback.workingHtml && (
            <details style={{ marginTop: 8 }} open={!feedback.correct}>
              <summary className="small" style={{ cursor: "pointer", fontWeight: 600 }}>
                Full working
              </summary>
              <div className="prose" style={{ marginTop: 6 }} dangerouslySetInnerHTML={{ __html: feedback.workingHtml }} />
            </details>
          )}
          {!feedback.correct && (
            <button className="btn btn-sm" style={{ marginTop: 10 }} onClick={retry}>
              <RotateCcw size={14} /> Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Reveal({ ex, feedback }: { ex: RenderedExercise; feedback: ExerciseFeedback }) {
  if (feedback.correct) return null;
  const r = feedback.reveal;
  if (r.kind === "numeric") return <p style={{ margin: "0 0 8px" }}>The answer is <strong>{r.unit === "£" ? `£${gbp(r.answer)}` : `${r.answer.toLocaleString("en-GB")}${r.unit && r.unit !== "£" ? ` ${r.unit}` : ""}`}</strong>.</p>;
  if (r.kind === "journal")
    return (
      <table className={styles.dataTable} style={{ margin: "4px 0 10px", background: "var(--surface)" }}>
        <thead>
          <tr>
            <th>Account</th>
            <th style={{ textAlign: "right" }}>Dr £</th>
            <th style={{ textAlign: "right" }}>Cr £</th>
          </tr>
        </thead>
        <tbody>
          {r.lines.map((l, i) => (
            <tr key={i}>
              <td>{l.account}</td>
              <td className="num" style={{ textAlign: "right" }}>
                {l.dr ? gbp(l.dr) : ""}
              </td>
              <td className="num" style={{ textAlign: "right" }}>
                {l.cr ? gbp(l.cr) : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (r.kind === "mcq" && ex.kind === "mcq") return null; // shown inline on the options
  return null;
}

function Body({ ex, feedback, pending, onSubmit }: { ex: RenderedExercise; feedback: ExerciseFeedback | null; pending: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const locked = pending || !!feedback;
  switch (ex.kind) {
    case "mcq":
      return <Mcq ex={ex} feedback={feedback} locked={locked} onSubmit={onSubmit} />;
    case "multi":
      return <Multi ex={ex} feedback={feedback} locked={locked} onSubmit={onSubmit} />;
    case "numeric":
      return <Numeric ex={ex} locked={locked} onSubmit={onSubmit} />;
    case "journal":
      return <Journal ex={ex} locked={locked} onSubmit={onSubmit} />;
    case "classify":
      return <Classify ex={ex} feedback={feedback} locked={locked} onSubmit={onSubmit} />;
  }
}

function optionClass(i: number, chosen: boolean, feedback: ExerciseFeedback | null) {
  if (!feedback) return `${styles.option} ${chosen ? styles.optionChosen : ""}`;
  const r = feedback.reveal;
  const right = r.kind === "mcq" ? r.answer === i : r.kind === "multi" ? r.answers.includes(i) : false;
  if (right) return `${styles.option} ${styles.optionRight}`;
  if (chosen) return `${styles.option} ${styles.optionWrong}`;
  return styles.option;
}

function Mcq({ ex, feedback, locked, onSubmit }: { ex: Extract<RenderedExercise, { kind: "mcq" }>; feedback: ExerciseFeedback | null; locked: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const [choice, setChoice] = useState<number | null>(null);
  return (
    <>
      <div className={styles.options}>
        {ex.options.map((o, i) => (
          <label key={i} className={optionClass(i, choice === i, feedback)}>
            <input type="radio" name={ex.id} checked={choice === i} disabled={locked} onChange={() => setChoice(i)} />
            <span dangerouslySetInnerHTML={{ __html: ex.optionsHtml?.[i] ?? o }} />
          </label>
        ))}
      </div>
      {!feedback && (
        <div>
          <button className="btn btn-primary btn-sm" disabled={locked || choice === null} onClick={() => choice !== null && onSubmit({ kind: "mcq", choice })}>
            Check answer
          </button>
        </div>
      )}
    </>
  );
}

function Multi({ ex, feedback, locked, onSubmit }: { ex: Extract<RenderedExercise, { kind: "multi" }>; feedback: ExerciseFeedback | null; locked: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const [choices, setChoices] = useState<number[]>([]);
  const toggle = (i: number) => setChoices((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  return (
    <>
      <div className={styles.options}>
        {ex.options.map((o, i) => (
          <label key={i} className={optionClass(i, choices.includes(i), feedback)}>
            <input type="checkbox" checked={choices.includes(i)} disabled={locked} onChange={() => toggle(i)} />
            <span dangerouslySetInnerHTML={{ __html: ex.optionsHtml?.[i] ?? o }} />
          </label>
        ))}
      </div>
      {!feedback && (
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-primary btn-sm" disabled={locked || !choices.length} onClick={() => onSubmit({ kind: "multi", choices })}>
            Check answer
          </button>
          <span className="small muted">Select every correct option.</span>
        </div>
      )}
    </>
  );
}

function Numeric({ ex, locked, onSubmit }: { ex: Extract<RenderedExercise, { kind: "numeric" }>; locked: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const [raw, setRaw] = useState("");
  const value = Number(raw.replace(/[£,%\s]/g, ""));
  const valid = raw.trim() !== "" && Number.isFinite(value);
  return (
    <form
      className={styles.numericRow}
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit({ kind: "numeric", value });
      }}
    >
      {ex.unit === "£" && <strong>£</strong>}
      <input inputMode="decimal" value={raw} onChange={(e) => setRaw(e.target.value)} disabled={locked} placeholder="Your answer" aria-label="Your answer" />
      {ex.unit && ex.unit !== "£" && <span className="muted">{ex.unit}</span>}
      <button className="btn btn-primary btn-sm" disabled={locked || !valid}>
        Check answer
      </button>
    </form>
  );
}

function Journal({ ex, locked, onSubmit }: { ex: Extract<RenderedExercise, { kind: "journal" }>; locked: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const [rows, setRows] = useState<{ account: string; dr: string; cr: string }[]>(() => Array.from({ length: ex.rows }, () => ({ account: "", dr: "", cr: "" })));
  const num = (s: string) => {
    const v = Number(s.replace(/[£,\s]/g, ""));
    return Number.isFinite(v) && v > 0 ? v : 0;
  };
  const dr = rows.reduce((s, r) => s + num(r.dr), 0);
  const cr = rows.reduce((s, r) => s + num(r.cr), 0);
  const set = (i: number, patch: Partial<(typeof rows)[number]>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const lines: JournalLine[] = rows
    .filter((r) => r.account && (num(r.dr) || num(r.cr)))
    .flatMap((r) => [...(num(r.dr) ? [{ account: r.account, dr: num(r.dr) }] : []), ...(num(r.cr) ? [{ account: r.account, cr: num(r.cr) }] : [])]);
  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className={styles.jGrid}>
        <span className={styles.jGridHead}>Account</span>
        <span className={styles.jGridHead} style={{ textAlign: "right" }}>
          Dr £
        </span>
        <span className={styles.jGridHead} style={{ textAlign: "right" }}>
          Cr £
        </span>
        <span />
        {rows.map((r, i) => (
          <JournalRow key={i} r={r} accounts={ex.accounts} locked={locked} onChange={(p) => set(i, p)} onRemove={rows.length > 2 ? () => setRows((rs) => rs.filter((_, j) => j !== i)) : undefined} />
        ))}
        <span>
          {!locked && rows.length < 10 && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRows((rs) => [...rs, { account: "", dr: "", cr: "" }])}>
              <Plus size={14} /> Add line
            </button>
          )}
        </span>
        <span className={styles.jTotals}>{gbp(dr)}</span>
        <span className={styles.jTotals}>{gbp(cr)}</span>
        <span />
      </div>
      {Math.abs(dr - cr) > 0.005 && dr + cr > 0 && <span className="small" style={{ color: "var(--warning)" }}>Debits and credits differ by £{gbp(Math.abs(dr - cr))}.</span>}
      <div>
        <button className="btn btn-primary btn-sm" disabled={locked || lines.length < 2} onClick={() => onSubmit({ kind: "journal", lines })}>
          Check entry
        </button>
      </div>
    </div>
  );
}

function JournalRow({ r, accounts, locked, onChange, onRemove }: { r: { account: string; dr: string; cr: string }; accounts: string[]; locked: boolean; onChange: (p: Partial<{ account: string; dr: string; cr: string }>) => void; onRemove?: () => void }) {
  return (
    <>
      <select value={r.account} disabled={locked} onChange={(e) => onChange({ account: e.target.value })} aria-label="Account">
        <option value="">Choose account…</option>
        {accounts.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <input className={styles.amtIn} inputMode="decimal" value={r.dr} disabled={locked} onChange={(e) => onChange({ dr: e.target.value, ...(e.target.value ? { cr: "" } : {}) })} aria-label="Debit" />
      <input className={styles.amtIn} inputMode="decimal" value={r.cr} disabled={locked} onChange={(e) => onChange({ cr: e.target.value, ...(e.target.value ? { dr: "" } : {}) })} aria-label="Credit" />
      {onRemove && !locked ? (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onRemove} aria-label="Remove line">
          <Trash2 size={14} />
        </button>
      ) : (
        <span />
      )}
    </>
  );
}

function Classify({ ex, feedback, locked, onSubmit }: { ex: Extract<RenderedExercise, { kind: "classify" }>; feedback: ExerciseFeedback | null; locked: boolean; onSubmit: (r: ExerciseResponse) => void }) {
  const [choices, setChoices] = useState<number[]>(() => ex.items.map(() => -1));
  const reveal = feedback?.reveal.kind === "classify" ? feedback.reveal : null;
  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.classifyTable}>
          <tbody>
            {ex.items.map((it, i) => {
              const ok = feedback?.detail?.itemsCorrect?.[i];
              return (
                <tr key={i} className={feedback ? (ok ? styles.itemRight : styles.itemWrong) : undefined}>
                  <td>
                    <span dangerouslySetInnerHTML={{ __html: ex.itemsHtml?.[i] ?? it }} />
                    {reveal && !ok && (
                      <div className={styles.why}>
                        Answer: <strong>{ex.categories[reveal.answers[i]]}</strong>
                        {reveal.why[i] ? ` — ${reveal.why[i]}` : ""}
                      </div>
                    )}
                    {reveal && ok && reveal.why[i] && <div className={styles.why}>{reveal.why[i]}</div>}
                  </td>
                  <td style={{ width: "38%" }}>
                    <select value={choices[i]} disabled={locked} onChange={(e) => setChoices((c) => c.map((v, j) => (j === i ? Number(e.target.value) : v)))} aria-label={`Category for ${it}`}>
                      <option value={-1}>Choose…</option>
                      {ex.categories.map((c, j) => (
                        <option key={j} value={j}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!feedback && (
        <div>
          <button className="btn btn-primary btn-sm" disabled={locked || choices.some((c) => c < 0)} onClick={() => onSubmit({ kind: "classify", choices })}>
            Check answers
          </button>
        </div>
      )}
    </>
  );
}
