"use client";

import { useState, useTransition } from "react";
import { forgetBotAlias, resolveBotEvents, teachBot } from "@/app/actions/bot";

/** "When people say ___ they mean ___" — teaches the question bot new wording. */
export function TeachForm({ concepts, compact = false, eventIds = [], suggest = "" }: { concepts: string[]; compact?: boolean; eventIds?: string[]; suggest?: string }) {
  const [alias, setAlias] = useState(compact ? "" : suggest);
  const [concept, setConcept] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const submit = () =>
    start(async () => {
      const r = await teachBot({ alias: alias || suggest, concept, eventIds });
      setMsg(r.ok ? { ok: true, text: r.message } : { ok: false, text: r.error });
      if (r.ok) setAlias("");
    });
  return (
    <form
      className={compact ? "stack" : "row"}
      style={{ gap: 8, flexWrap: "wrap", alignItems: compact ? "stretch" : "flex-end" }}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label className="small" style={{ flex: compact ? undefined : 1, minWidth: 180 }}>
        {!compact && <span className="muted">When people say</span>}
        <input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder={compact ? "the key words, e.g. “sundry debtor”" : "e.g. sundry debtor"} aria-label="Wording people use" />
      </label>
      <label className="small" style={{ flex: compact ? undefined : 1, minWidth: 180 }}>
        {!compact && <span className="muted">they mean</span>}
        <select value={concept} onChange={(e) => setConcept(e.target.value)} aria-label="Topic they mean">
          <option value="">Choose a topic…</option>
          {concepts.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button className="btn btn-primary btn-sm" disabled={pending || !concept || !(alias || suggest)}>
        Teach
      </button>
      {msg && (
        <span className="small" style={{ color: msg.ok ? "var(--success)" : "var(--danger)" }}>
          {msg.text}
        </span>
      )}
    </form>
  );
}

export function ResolveButton({ eventIds }: { eventIds: string[] }) {
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  if (done) return <span className="small faint">Dealt with</span>;
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const r = await resolveBotEvents(eventIds);
          if (r.ok) setDone(true);
        })
      }
    >
      Mark dealt with
    </button>
  );
}

export function ForgetAlias({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button type="button" className="btn btn-ghost btn-sm" disabled={pending} onClick={() => start(async () => void (await forgetBotAlias(id)))}>
      Remove
    </button>
  );
}
