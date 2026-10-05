"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Search } from "lucide-react";
import styles from "./ask.module.css";

const EXAMPLES = [
  "Can a VAT-registered company reclaim VAT on a staff Christmas party that two clients also attend?",
  "A director's loan account is overdrawn by £18,000 at the year end. What's the s455 position and how can it be cleared?",
  "When must a sole trader with £60,000 turnover start Making Tax Digital for Income Tax?",
  "Does a contractor working through their own company for a small client fall under Chapter 8 or Chapter 10 IR35?",
  "What qualifies as R&D for tax purposes for a software company?",
];

export function AskBox({ initial, canProfessional }: { initial?: string; canProfessional: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState(initial ?? "");
  const [professional, setProfessional] = useState(false);
  const [stages, setStages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ready = q.trim().length >= 8 && !busy;

  async function ask() {
    setBusy(true);
    setError(null);
    setStages([]);
    try {
      const res = await fetch("/api/research", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: q, professional }) });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Ask Capto is unavailable right now.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line) continue;
          const e = JSON.parse(line) as { type: string; message?: string; id?: string };
          if (e.type === "stage" && e.message) setStages((s) => [...s, e.message!]);
          if (e.type === "complete" && e.id) {
            router.push(`/ask/${e.id}`);
            router.refresh();
            return;
          }
        }
      }
      throw new Error("The answer was interrupted — please try again.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div className="stack" style={{ gap: 14 }}>
      <form
        className={`card ${styles.askBox}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) ask();
        }}
      >
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask a UK accounting, tax, payroll or company law question. Include the key facts (entity type, tax year, amounts)."
          disabled={busy}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && ready) ask();
          }}
          aria-label="Your question"
        />
        <div className={styles.askFoot}>
          {canProfessional ? (
            <label className="small row" style={{ gap: 6 }}>
              <input type="checkbox" checked={professional} onChange={(e) => setProfessional(e.target.checked)} disabled={busy} />
              Also search ICAEW, ACCA, ATT, CIOT &amp; FRC
            </label>
          ) : (
            <span className="small faint">Answers come only from HMRC manuals and GOV.UK guidance.</span>
          )}
          <button className="btn btn-primary" disabled={!ready}>
            {busy ? <Loader2 size={16} className={styles.spin} /> : <Search size={16} />} {busy ? "Researching…" : "Ask"}
          </button>
        </div>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      {busy && (
        <div className={`card ${styles.stages}`} aria-live="polite">
          {stages.map((s, i) => (
            <div key={i} className={`${styles.stage} ${i === stages.length - 1 ? styles.stageCurrent : ""}`}>
              {i === stages.length - 1 ? <Loader2 size={14} className={styles.spin} /> : <CheckCircle2 size={14} color="var(--success)" />}
              {s}
            </div>
          ))}
          {!stages.length && (
            <div className={`${styles.stage} ${styles.stageCurrent}`}>
              <Loader2 size={14} className={styles.spin} /> Starting…
            </div>
          )}
          <div className="small faint" style={{ marginTop: 4 }}>
            Usually 20–60 seconds. Every quote is checked against its source before you see it.
          </div>
        </div>
      )}
      {!busy && !initial && (
        <div className={styles.examples}>
          {EXAMPLES.map((e) => (
            <button key={e} type="button" className={styles.example} onClick={() => setQ(e)}>
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
