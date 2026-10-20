"use client";

import type { ReactNode } from "react";
import { rate } from "@/content/rates";
import { gbp } from "@/lib/calc/common";
import { parseMoney } from "@/lib/calc/parse";
import type { SaPaymentsResult } from "@/lib/calc/personal/saPayments";
import { GovLink, MoneyField, SelectField } from "../Fields";
import styles from "../calc.module.css";

/** Parse every £ field in a form at once. */
export function parseAll<K extends string>(values: Record<K, string>, keys: readonly K[]) {
  const out = {} as Record<K, { value?: number; error?: string }>;
  for (const k of keys) out[k] = parseMoney(values[k]);
  const anyError = keys.some((k) => out[k].error);
  const num = (k: K) => out[k].value ?? 0;
  return { p: out, anyError, num };
}

/** Source URL for a rate id, with a fallback. */
export function srcFor(taxYear: string, id: string, fallback = "https://www.gov.uk/income-tax-rates") {
  return rate(taxYear, id)?.source.url ?? fallback;
}

/** Collapsible group of less common inputs. */
export function MoreInputs({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
      <summary style={{ cursor: "pointer", fontWeight: 650, fontSize: 14 }}>{title}</summary>
      <div className="stack" style={{ gap: 16, marginTop: 12 }}>
        {children}
      </div>
    </details>
  );
}

export function SubHead({ children }: { children: ReactNode }) {
  return <h3 style={{ margin: "4px 0 0", fontSize: 15 }}>{children}</h3>;
}

type Setter = (key: string) => (v: string) => void;

/** Money field bound to a key of a string form state. */
export function Money({
  k,
  label,
  help,
  values,
  set,
  errors,
}: {
  k: string;
  label: string;
  help?: ReactNode;
  values: Record<string, string>;
  set: Setter;
  errors: Record<string, { error?: string }>;
}) {
  return <MoneyField label={label} value={values[k]} onChange={set(k)} error={errors[k]?.error} help={help} />;
}

export const REGION_OPTIONS = [
  { value: "rUK", label: "England, Wales or Northern Ireland" },
  { value: "scotland", label: "Scotland (Scottish taxpayer)" },
];

export function RegionField({ value, onChange, taxYear }: { value: string; onChange: (v: string) => void; taxYear: string }) {
  return (
    <SelectField
      label="Where the taxpayer lives"
      value={value}
      onChange={onChange}
      options={REGION_OPTIONS}
      help={
        <>
          Scottish taxpayers pay Scottish rates on non-savings income; savings and dividends use UK rates.{" "}
          <GovLink href={srcFor(taxYear, "scot.starter-rate", "https://www.gov.uk/scottish-income-tax")}>GOV.UK: Scottish Income Tax</GovLink>
        </>
      }
    />
  );
}

export const ALLOWANCE_OPTIONS = [
  { value: "best", label: "Whichever gives less tax" },
  { value: "expenses", label: "Deduct actual expenses" },
  { value: "allowance", label: "Use the £1,000 allowance instead" },
];

/** Self Assessment payment timetable card. */
export function PaymentsCard({ payments, taxYear }: { payments: SaPaymentsResult; taxYear: string }) {
  return (
    <section className={`card card-pad ${styles.result}`} aria-label="Self Assessment payments">
      <h3 className="section-title" style={{ margin: 0 }}>
        Self Assessment payments
      </h3>
      <div className={styles.working} role="table" aria-label="Payment working">
        {payments.working.map((w, i) =>
          w.kind === "note" ? (
            <div key={i} className={styles.line} role="row">
              <span className={styles.note} role="cell" style={{ gridColumn: "1 / -1" }}>
                {w.label}
              </span>
            </div>
          ) : (
            <div key={i} className={`${styles.line} ${w.kind === "subtotal" ? styles.subtotal : w.kind === "total" ? styles.total : ""}`} role="row">
              <span className={styles.lineLabel} role="cell">
                {w.label}
              </span>
              <span className={styles.lineAmount} role="cell">
                {gbp(w.amount)}
              </span>
            </div>
          )
        )}
      </div>
      <div>
        <h4 style={{ margin: "4px 0 6px", fontSize: 14 }}>Timetable</h4>
        <div className={styles.working} role="table" aria-label="Payment dates">
          {payments.schedule.map((s) => (
            <div key={s.date} className={styles.line} role="row">
              <span className={styles.lineLabel} role="cell">
                <strong>{s.date}</strong>: {s.label}
              </span>
              <span className={styles.lineAmount} role="cell">
                {gbp(s.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="small faint" style={{ margin: 0 }}>
        Payments on account are based on this year&apos;s bill and can be reduced if next year&apos;s will be lower. They exclude Capital Gains Tax, student loan and voluntary Class 2.{" "}
        <GovLink href={srcFor(taxYear, "it.poa-threshold", "https://www.gov.uk/understand-self-assessment-bill/payments-on-account")}>GOV.UK: payments on account</GovLink>
      </p>
    </section>
  );
}

/** Small key-figure card (label / value rows). */
export function FiguresCard({ title, rows, children }: { title: string; rows: [string, string][]; children?: ReactNode }) {
  return (
    <section className={`card card-pad ${styles.result}`} aria-label={title}>
      <h3 className="section-title" style={{ margin: 0 }}>
        {title}
      </h3>
      <div className={styles.working} role="table" aria-label={title}>
        {rows.map(([l, v]) => (
          <div key={l} className={styles.line} role="row">
            <span className={styles.lineLabel} role="cell">
              {l}
            </span>
            <span className={styles.lineAmount} role="cell">
              {v}
            </span>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
}
