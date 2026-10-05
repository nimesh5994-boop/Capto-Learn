"use client";

import { startTransition, useActionState } from "react";
import type { FormState } from "@/app/actions/auth";

/** A card-wrapped form with inline success/error feedback, for server-rendered settings fields. */
export function SettingsForm({ action, title, description, submitLabel = "Save", children }: { action: (s: FormState, f: FormData) => Promise<FormState>; title: string; description?: string; submitLabel?: string; children: React.ReactNode }) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form
      // Submitted via onSubmit rather than the `action` prop: React 19 resets a form after an `action`
      // submission, which snaps fields (e.g. a controlled select) back to their initial values even though
      // the save succeeded. Settings should keep showing exactly what was just saved.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="card card-pad stack"
    >
      <div>
        <h2>{title}</h2>
        {description && (
          <p className="small muted" style={{ marginTop: 4 }}>
            {description}
          </p>
        )}
      </div>
      {children}
      {state?.error && <div className="alert alert-error">{state.error}</div>}
      {state?.success && <div className="alert alert-success">{state.success}</div>}
      <div>
        <button className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
