"use client";

import { useId, useState, type ReactNode } from "react";
import { formatMoneyInput, parseMoney } from "@/lib/calc/parse";
import { isIsoDate } from "@/lib/calc/business/dates";
import { CalcInputError, MissingRateError, type CalcResult } from "@/lib/calc/common";
import base from "../calc.module.css";
import styles from "./business.module.css";

/** Run a calculation, turning thrown input/rate errors into messages for ResultPanel. */
export function run<T extends CalcResult>(fieldErrors: boolean, validate: () => string[], calc: () => T): { result: T | null; errors: string[] } {
  if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
  try {
    const errs = validate();
    if (errs.length) return { result: null, errors: errs };
    return { result: calc(), errors: [] };
  } catch (e) {
    if (e instanceof CalcInputError) return { result: null, errors: e.errors };
    if (e instanceof MissingRateError) return { result: null, errors: [e.message] };
    return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
  }
}

/** A date input (native picker, keyboard accessible). */
export function DateField({ label, value, onChange, help, error }: { label: string; value: string; onChange: (v: string) => void; help?: ReactNode; error?: string }) {
  const id = useId();
  const err = error ?? (value && !isIsoDate(value) ? "Enter a valid date." : undefined);
  return (
    <div className={`${base.field} ${err ? base.invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!err}
        aria-describedby={[err ? `${id}-err` : "", help ? `${id}-help` : ""].filter(Boolean).join(" ") || undefined}
      />
      {err && (
        <div id={`${id}-err`} className={base.fieldError}>
          {err}
        </div>
      )}
      {help && (
        <div id={`${id}-help`} className={base.help}>
          {help}
        </div>
      )}
    </div>
  );
}

export function CheckField({ label, checked, onChange, help }: { label: string; checked: boolean; onChange: (v: boolean) => void; help?: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label className={styles.check} htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-describedby={help ? `${id}-help` : undefined} />
        <span>{label}</span>
      </label>
      {help && (
        <div id={`${id}-help`} className={styles.checkHelp}>
          {help}
        </div>
      )}
    </div>
  );
}

/** Pill buttons for a small set of modes. */
export function Segmented<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div role="group" aria-label={label}>
      <div className={base.field}>
        <span style={{ display: "block", fontWeight: 600, fontSize: 13.5, marginBottom: 6 }}>{label}</span>
        <div className={styles.segmented}>
          {options.map((o) => (
            <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function More({ summary, children, open }: { summary: string; children: ReactNode; open?: boolean }) {
  return (
    <details className={styles.more} open={open}>
      <summary>{summary}</summary>
      <div className={styles.moreBody}>{children}</div>
    </details>
  );
}

/** A list of (date, amount) rows. */
export interface DatedRow {
  date: string;
  amount: string;
}

export function useRows(example: DatedRow[], blank: DatedRow[]) {
  const [rows, setRows] = useState<DatedRow[]>(example);
  return {
    rows,
    set: (k: number, key: keyof DatedRow, v: string) => setRows((r) => r.map((x, i) => (i === k ? { ...x, [key]: v } : x))),
    add: () => setRows((r) => (r.length >= 20 ? r : [...r, { date: "", amount: "" }])),
    remove: (k: number) => setRows((r) => r.filter((_, i) => i !== k)),
    replace: (next: DatedRow[]) => setRows(next),
    loadExample: () => setRows(example),
    clear: () => setRows(blank),
  };
}

export type Rows = ReturnType<typeof useRows>;

/** Parse rows; blank rows are ignored. */
export function parseRows(rows: DatedRow[]): { rows: { date: string; amount: number }[]; error: boolean } {
  let error = false;
  const out: { date: string; amount: number }[] = [];
  for (const r of rows) {
    if (!r.date && !r.amount.trim()) continue;
    const p = parseMoney(r.amount);
    if (p.error || !isIsoDate(r.date)) error = true;
    out.push({ date: r.date, amount: p.value ?? NaN });
  }
  return { rows: out, error };
}

export function RowsEditor({ legend, rows, itemLabel, help }: { legend: string; rows: Rows; itemLabel: string; help?: ReactNode }) {
  const gid = useId();
  return (
    <fieldset className={styles.rows} style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={help ? `${gid}-help` : undefined}>
      <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{legend}</legend>
      {rows.rows.map((r, k) => {
        const amt = parseMoney(r.amount);
        return (
          <div key={k} className={styles.rowLine}>
            <div className={`${base.field} ${r.date && !isIsoDate(r.date) ? base.invalid : ""}`}>
              <label htmlFor={`${gid}-d${k}`}>
                {itemLabel} {k + 1}: date
              </label>
              <input id={`${gid}-d${k}`} type="date" value={r.date} onChange={(e) => rows.set(k, "date", e.target.value)} />
            </div>
            <div className={`${base.field} ${amt.error ? base.invalid : ""}`}>
              <label htmlFor={`${gid}-a${k}`}>
                {itemLabel} {k + 1}: amount
              </label>
              <div className={base.money}>
                <input
                  id={`${gid}-a${k}`}
                  inputMode="decimal"
                  autoComplete="off"
                  value={r.amount}
                  placeholder="0"
                  onChange={(e) => rows.set(k, "amount", e.target.value)}
                  onBlur={(e) => rows.set(k, "amount", formatMoneyInput(e.target.value))}
                  aria-invalid={!!amt.error}
                />
              </div>
            </div>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => rows.remove(k)} aria-label={`Remove ${itemLabel.toLowerCase()} ${k + 1}`}>
              Remove
            </button>
          </div>
        );
      })}
      <div>
        <button type="button" className="btn btn-sm" onClick={rows.add}>
          Add {itemLabel.toLowerCase()}
        </button>
      </div>
      {help && (
        <div id={`${gid}-help`} className={base.help}>
          {help}
        </div>
      )}
    </fieldset>
  );
}

/** Default dates for a tax year: the company financial year and the income tax year. */
export function yearDates(taxYear: string) {
  const y = Number(taxYear.slice(0, 4));
  return { fyStart: `${y}-04-01`, fyEnd: `${y + 1}-03-31`, tyStart: `${y}-04-06`, tyEnd: `${y + 1}-04-05`, y };
}
