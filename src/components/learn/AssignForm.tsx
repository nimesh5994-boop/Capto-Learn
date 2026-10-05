"use client";

import { useState, useTransition } from "react";
import { assignTraining, cancelAssignment } from "@/app/actions/training";

export interface AssignOption {
  type: "track" | "module" | "lesson";
  id: string;
  label: string;
}

export function AssignForm({ people, options }: { people: { id: string; name: string }[]; options: AssignOption[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [target, setTarget] = useState(options[0] ? `${options[0].type}|${options[0].id}` : "");
  const [dueDate, setDueDate] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      className="stack"
      style={{ gap: 12 }}
      onSubmit={(e) => {
        e.preventDefault();
        const [targetType, targetId] = target.split("|") as [AssignOption["type"], string];
        start(async () => {
          const r = await assignTraining({ userIds: selected, targetType, targetId, dueDate, note });
          setMsg(r.ok ? { ok: true, text: r.message } : { ok: false, text: r.error });
          if (r.ok) setSelected([]);
        });
      }}
    >
      <div>
        <label htmlFor="assign-target">Training</label>
        <select id="assign-target" value={target} onChange={(e) => setTarget(e.target.value)}>
          {options.map((o) => (
            <option key={`${o.type}|${o.id}`} value={`${o.type}|${o.id}`}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="small" style={{ fontWeight: 600, marginBottom: 6 }}>
          People
        </legend>
        <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
          {people.map((p) => (
            <label key={p.id} className={`pill ${selected.includes(p.id) ? "pill-sent" : ""}`} style={{ cursor: "pointer", padding: "5px 10px", fontSize: 13 }}>
              <input type="checkbox" aria-label={p.name} checked={selected.includes(p.id)} onChange={() => setSelected((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))} style={{ marginRight: 4 }} />
              {p.name}
            </label>
          ))}
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSelected(selected.length === people.length ? [] : people.map((p) => p.id))}>
            {selected.length === people.length ? "Clear" : "Everyone"}
          </button>
        </div>
      </fieldset>
      <div className="grid-2">
        <div>
          <label htmlFor="assign-due">Due date (optional)</label>
          <input id="assign-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="assign-note">Note (optional)</label>
          <input id="assign-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} placeholder="e.g. Before VAT quarter-end" />
        </div>
      </div>
      {msg && <div className={`alert ${msg.ok ? "alert-success" : "alert-error"}`}>{msg.text}</div>}
      <div>
        <button className="btn btn-primary" disabled={pending || !selected.length || !target}>
          Assign
        </button>
      </div>
    </form>
  );
}

export function CancelAssignment({ id }: { id: string }) {
  const [pending, start] = useTransition();
  return (
    <button className="btn btn-ghost btn-sm" disabled={pending} onClick={() => start(async () => void (await cancelAssignment(id)))}>
      Remove
    </button>
  );
}
