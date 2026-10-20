"use client";

import { useId, type ReactNode } from "react";
import base from "../calc.module.css";
import styles from "./capital.module.css";

/** Date input (yyyy-mm-dd), styled like the shared fields. */
export function DateField({ label, value, onChange, help, error }: { label: string; value: string; onChange: (v: string) => void; help?: ReactNode; error?: string }) {
  const id = useId();
  const describedBy = [error ? `${id}-err` : "", help ? `${id}-help` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`${base.field} ${error ? base.invalid : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="date" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={describedBy} />
      {error && (
        <div id={`${id}-err`} className={base.fieldError}>
          {error}
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

/** Free text input (e.g. a description). */
export function TextField({ label, value, onChange, help, placeholder }: { label: string; value: string; onChange: (v: string) => void; help?: ReactNode; placeholder?: string }) {
  const id = useId();
  return (
    <div className={base.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} placeholder={placeholder} autoComplete="off" onChange={(e) => onChange(e.target.value)} aria-describedby={help ? `${id}-help` : undefined} />
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
    <div className={base.field}>
      <div className={styles.check}>
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-describedby={help ? `${id}-help` : undefined} />
        <label htmlFor={id}>{label}</label>
      </div>
      {help && (
        <div id={`${id}-help`} className={base.help}>
          {help}
        </div>
      )}
    </div>
  );
}

/** Collapsible "More inputs" section. */
export function MoreInputs({ children, title = "More inputs", open }: { children: ReactNode; title?: string; open?: boolean }) {
  return (
    <details className={styles.more} open={open}>
      <summary>{title}</summary>
      <div className={styles.moreBody}>{children}</div>
    </details>
  );
}

/** One repeating row (a disposal, gift or period) with a remove button. */
export function RowCard({ title, onRemove, children, removeLabel }: { title: string; onRemove?: () => void; children: ReactNode; removeLabel: string }) {
  return (
    <fieldset className={styles.rowCard} style={{ margin: 0 }}>
      <div className={styles.rowHead}>
        <legend className={styles.rowTitle} style={{ float: "left", padding: 0 }}>
          {title}
        </legend>
        {onRemove && (
          <button type="button" className="btn btn-sm btn-ghost" onClick={onRemove} aria-label={removeLabel}>
            Remove
          </button>
        )}
      </div>
      {children}
    </fieldset>
  );
}

export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div>
      <button type="button" className="btn btn-sm" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

export function GroupTitle({ children }: { children: ReactNode }) {
  return <h3 className={styles.groupTitle}>{children}</h3>;
}

/** Update one row of a list immutably. */
export function updateRow<T>(rows: T[], index: number, patch: Partial<T>): T[] {
  return rows.map((r, i) => (i === index ? { ...r, ...patch } : r));
}
