"use client";

import { useId, type ReactNode } from "react";
import { formatMoneyInput } from "@/lib/calc/parse";
import styles from "./calc.module.css";

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: ReactNode;
  error?: string;
  placeholder?: string;
}

function FieldShell({ id, label, help, error, children }: { id: string; label: string; help?: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <div id={`${id}-err`} className={styles.fieldError}>
          {error}
        </div>
      )}
      {help && (
        <div id={`${id}-help`} className={styles.help}>
          {help}
        </div>
      )}
    </div>
  );
}

function describedBy(id: string, help: unknown, error: unknown) {
  return [error ? `${id}-err` : "", help ? `${id}-help` : ""].filter(Boolean).join(" ") || undefined;
}

/** £ amount: accepts commas, re-formats on blur. */
export function MoneyField({ label, value, onChange, help, error, placeholder = "0" }: FieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} help={help} error={error}>
      <div className={styles.money}>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onChange(formatMoneyInput(e.target.value))}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, help, error)}
        />
      </div>
    </FieldShell>
  );
}

/** Plain number with an optional unit suffix (e.g. "%", "months"). */
export function NumberField({ label, value, onChange, help, error, placeholder = "0", suffix }: FieldProps & { suffix?: string }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} help={help} error={error}>
      <div className={suffix ? styles.suffix : undefined}>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, help, error)}
        />
        {suffix && <span aria-hidden="true">{suffix}</span>}
      </div>
    </FieldShell>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  help,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  help?: ReactNode;
  options: { value: string; label: string; disabled?: boolean }[];
}) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} help={help}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={help ? `${id}-help` : undefined}>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Calculator heading with "load example" and "clear" actions. */
export function FormHead({ title, intro, example, onExample, onClear }: { title: string; intro: ReactNode; example: string; onExample: () => void; onClear: () => void }) {
  return (
    <div className="stack" style={{ gap: 6 }}>
      <div className={styles.formHead}>
        <h2>{title}</h2>
        <div className="row" style={{ gap: 6 }}>
          <button type="button" className="btn btn-sm btn-ghost" onClick={onExample} title={example}>
            Load example
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
      <p className="small muted">{intro}</p>
      <p className="small faint">Example: {example}</p>
    </div>
  );
}

/** External GOV.UK link for help text. */
export function GovLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  );
}
