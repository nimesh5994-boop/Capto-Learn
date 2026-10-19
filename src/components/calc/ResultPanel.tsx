"use client";

import { useState } from "react";
import { Check, ClipboardCopy, ExternalLink } from "lucide-react";
import { rate } from "@/content/rates";
import { gbp, workingAsText, type CalcResult } from "@/lib/calc/common";
import styles from "./calc.module.css";

const pct = (x: number) => `${(x * 100).toLocaleString("en-GB", { maximumFractionDigits: 2 })}%`;

export function ResultPanel({
  title,
  headlineLabel,
  result,
  errors,
  effectiveRate,
  effectiveRateLabel,
  inputsSummary,
}: {
  title: string;
  headlineLabel: string;
  result: CalcResult | null;
  errors: string[];
  effectiveRate?: number | null;
  effectiveRateLabel?: string;
  /** Plain-text input lines included in the copied working. */
  inputsSummary: string[];
}) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  if (errors.length || !result) {
    return (
      <section className={`card card-pad ${styles.result}`} aria-live="polite" aria-label={`${title} result`}>
        <div className="alert alert-error" role="alert">
          <strong>Check the inputs</strong>
          <ul className={styles.errors}>
            {(errors.length ? errors : ["Enter the figures to see the calculation."]).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const copy = async () => {
    const text = workingAsText(title, result, ["", "Inputs:", ...inputsSummary.map((s) => `- ${s}`)]);
    try {
      await navigator.clipboard.writeText(text);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2500);
  };

  return (
    <section className={`card card-pad ${styles.result}`} aria-label={`${title} result`}>
      <div className={styles.headline}>
        <div>
          <div className={styles.headlineLabel}>{headlineLabel}</div>
          <div className={styles.headlineFigure}>{gbp(result.tax)}</div>
          {effectiveRate != null && (
            <div className={styles.effective}>
              {effectiveRateLabel ?? "Effective rate"}: {pct(effectiveRate)}
            </div>
          )}
        </div>
        <button type="button" className="btn btn-sm" onClick={copy}>
          {copied === "done" ? <Check size={14} /> : <ClipboardCopy size={14} />}
          {copied === "done" ? "Copied" : copied === "failed" ? "Copy failed" : "Copy working"}
        </button>
      </div>

      <div>
        <h3 className="section-title" style={{ marginBottom: 6 }}>
          Computation ({result.taxYear})
        </h3>
        <div className={styles.working} role="table" aria-label="Computation">
          {result.working.map((w, i) => {
            const src = w.rateId ? rate(result.taxYear, w.rateId) : undefined;
            if (w.kind === "note") {
              return (
                <div key={i} className={`${styles.line}`} role="row">
                  <span className={`${styles.note}`} role="cell" style={{ gridColumn: "1 / -1" }}>
                    {w.label}
                  </span>
                </div>
              );
            }
            const cls = w.kind === "memo" ? styles.memo : w.kind === "subtotal" ? styles.subtotal : w.kind === "total" ? styles.total : "";
            return (
              <div key={i} className={`${styles.line} ${cls}`} role="row">
                <span className={styles.lineLabel} role="cell">
                  {w.label}
                  {src && (
                    <a className={styles.rateLink} href={src.source.url} target="_blank" rel="noopener noreferrer" title={`${src.label}: ${src.value} — ${src.source.title}`}>
                      {src.value} <ExternalLink size={10} />
                      <span className={styles.srOnly}> source on GOV.UK, opens in a new tab</span>
                    </a>
                  )}
                </span>
                <span className={styles.lineAmount} role="cell">
                  {gbp(w.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="section-title" style={{ marginBottom: 6 }}>
          Rates used
        </h3>
        <ul className={styles.ratesUsed}>
          {result.rateIds.map((id) => {
            const r = rate(result.taxYear, id);
            if (!r) return null;
            return (
              <li key={id}>
                <span>{r.label}</span>
                <span>
                  <strong>{r.value}</strong>{" "}
                  <a href={r.source.url} target="_blank" rel="noopener noreferrer" title={r.source.title}>
                    GOV.UK <ExternalLink size={10} />
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {result.notes.length > 0 && (
        <div>
          <h3 className="section-title" style={{ marginBottom: 6 }}>
            What this doesn&apos;t cover
          </h3>
          <ul className={styles.notes}>
            {result.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      )}
      <span className={styles.srOnly} aria-live="polite">
        {copied === "done" ? "Working copied to the clipboard" : ""}
      </span>
    </section>
  );
}
