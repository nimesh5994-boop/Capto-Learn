"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/actions/auth";

type Field = { name: string; label: string; type?: string; autoComplete?: string; defaultValue?: string; readOnly?: boolean };

export function AuthForm({ action, fields, submitLabel, hidden = {} }: { action: (s: FormState, f: FormData) => Promise<FormState>; fields: Field[]; submitLabel: string; hidden?: Record<string, string> }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className="stack">
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      {state?.success && (
        <div className="alert alert-success" role="status">
          {state.success}
        </div>
      )}
      {state?.error && (
        <div className="alert alert-error" role="alert">
          {state.error}
        </div>
      )}
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name}>{f.label}</label>
          <input id={f.name} name={f.name} type={f.type ?? "text"} autoComplete={f.autoComplete} defaultValue={f.defaultValue} readOnly={f.readOnly} required />
        </div>
      ))}
      <button className="btn btn-primary" disabled={pending}>
        {pending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
