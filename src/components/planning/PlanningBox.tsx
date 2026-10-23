"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Route } from "lucide-react";
import styles from "@/components/ask/ask.module.css";

const YEARS = ["2026/27", "2025/26", "2027/28"];

const EXAMPLE = {
  title: "Director-shareholder exit and extraction",
  taxYear: "2026/27",
  facts:
    "Sole director and 100% shareholder of a trading company (not a close investment-holding company), age 58. Company has £420,000 of retained profits in the bank, mostly not needed in the business. Director takes a salary of £12,570 and dividends of £40,000 a year. Spouse is a non-working basic-rate taxpayer with no other income.",
  objectives: "Extract the surplus cash in the most tax-efficient way over the next three years, and keep open the option of selling the company in about five years.",
  constraints: "Does not want to pay higher-rate tax on the whole amount in one year. No appetite for aggressive or artificial arrangements.",
};

export function PlanningBox({ remaining }: { remaining: number | null }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [reference, setReference] = useState("");
  const [taxYear, setTaxYear] = useState(YEARS[0]);
  const [facts, setFacts] = useState("");
  const [objectives, setObjectives] = useState("");
  const [constraints, setConstraints] = useState("");
  const [stages, setStages] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ready = title.trim().length >= 3 && facts.trim().length >= 40 && objectives.trim().length >= 10 && !busy;

  async function run() {
    setBusy(true);
    setError(null);
    setStages([]);
    try {
      const res = await fetch("/api/planning", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title, reference, taxYear, facts, objectives, constraints }) });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Tax planning is unavailable right now.");
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
          if (e.type === "stage" && e.message) setStages((s) => [...s.slice(-7), e.message!]);
          if (e.type === "complete" && e.id) {
            router.push(`/planning/${e.id}`);
            router.refresh();
            return;
          }
        }
      }
      throw new Error("The scenario was interrupted — please try again. Anything already researched is in your research register.");
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
          if (ready) void run();
        }}
      >
        <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
          <label className="stack" style={{ gap: 4, flex: "1 1 260px" }}>
            <span className="small strong">Scenario title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} maxLength={120} placeholder="e.g. Director-shareholder exit and extraction" />
          </label>
          <label className="stack" style={{ gap: 4, flex: "1 1 200px" }}>
            <span className="small strong">
              Client / matter ref <span className="faint">(optional)</span>
            </span>
            <input value={reference} onChange={(e) => setReference(e.target.value)} disabled={busy} maxLength={120} placeholder="e.g. ABC-0042" />
          </label>
          <label className="stack" style={{ gap: 4 }}>
            <span className="small strong">Tax year</span>
            <select value={taxYear} onChange={(e) => setTaxYear(e.target.value)} disabled={busy}>
              {YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="stack" style={{ gap: 4 }}>
          <span className="small strong">The client&apos;s situation</span>
          <textarea value={facts} onChange={(e) => setFacts(e.target.value)} disabled={busy} maxLength={4000} placeholder="Entity types, ownership, ages, income, assets, family and residence. Include the figures that matter. Don't use client names." />
        </label>
        <label className="stack" style={{ gap: 4 }}>
          <span className="small strong">What they want to achieve</span>
          <textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} disabled={busy} maxLength={1500} style={{ minHeight: 64 }} placeholder="The outcomes and the timescale." />
        </label>
        <label className="stack" style={{ gap: 4 }}>
          <span className="small strong">
            Constraints <span className="faint">(optional)</span>
          </span>
          <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} disabled={busy} maxLength={1500} style={{ minHeight: 64 }} placeholder="Risk appetite, things they won't do, deadlines, other advisers involved." />
        </label>
        <div className={styles.askFoot}>
          <span className="small faint">
            Researches up to 5 tax issues, each counted as an Ask Capto question
            {remaining !== null ? ` (${remaining} left this month)` : ""}. Takes 2–4 minutes.
          </span>
          <button className="btn btn-primary" disabled={!ready}>
            {busy ? <Loader2 size={16} className={styles.spin} /> : <Route size={16} />} {busy ? "Working through it…" : "Research this scenario"}
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
            Please keep this page open. Every quote in the research is checked against its source before the report is written.
          </div>
        </div>
      )}
      {!busy && !facts && (
        <div className={styles.examples}>
          <button
            type="button"
            className={styles.example}
            onClick={() => {
              setTitle(EXAMPLE.title);
              setTaxYear(EXAMPLE.taxYear);
              setFacts(EXAMPLE.facts);
              setObjectives(EXAMPLE.objectives);
              setConstraints(EXAMPLE.constraints);
            }}
          >
            Try an example: {EXAMPLE.title}
          </button>
        </div>
      )}
    </div>
  );
}
