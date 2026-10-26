"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { addCpdEntry, deleteCpdEntry } from "@/app/actions/cpd";
import { CPD_KINDS } from "@/lib/cpd/log";

const today = () => new Date().toISOString().slice(0, 10);

/** Log CPD done outside Capto Learn. */
export function CpdForm() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({ date: today(), title: "", provider: "", kind: "webinar", hours: "1", minutes: "", reflection: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  return (
    <form
      className="card card-pad stack"
      style={{ gap: 10 }}
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        start(async () => {
          const r = await addCpdEntry(f);
          if (!r.ok) return setError(r.error);
          setF({ date: today(), title: "", provider: "", kind: "webinar", hours: "1", minutes: "", reflection: "" });
          router.refresh();
        });
      }}
    >
      <h3 style={{ margin: 0 }}>Log CPD done elsewhere</h3>
      <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
        <label className="stack" style={{ gap: 4, flex: "1 1 130px" }}>
          <span className="small strong">Date</span>
          <input type="date" value={f.date} max={today()} onChange={set("date")} required />
        </label>
        <label className="stack" style={{ gap: 4, flex: "3 1 240px" }}>
          <span className="small strong">Activity</span>
          <input value={f.title} onChange={set("title")} maxLength={200} placeholder="e.g. HMRC webinar: Making Tax Digital for Income Tax" required />
        </label>
        <label className="stack" style={{ gap: 4, flex: "2 1 180px" }}>
          <span className="small strong">Provider</span>
          <input value={f.provider} onChange={set("provider")} maxLength={200} placeholder="e.g. HMRC, ICAEW, AAT" />
        </label>
      </div>
      <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
        <label className="stack" style={{ gap: 4, flex: "2 1 220px" }}>
          <span className="small strong">Type</span>
          <select value={f.kind} onChange={set("kind")}>
            {Object.entries(CPD_KINDS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="stack" style={{ gap: 4, flex: "0 1 90px" }}>
          <span className="small strong">Hours</span>
          <input type="number" min="0" max="24" step="1" value={f.hours} onChange={set("hours")} />
        </label>
        <label className="stack" style={{ gap: 4, flex: "0 1 90px" }}>
          <span className="small strong">Minutes</span>
          <input type="number" min="0" max="59" step="5" value={f.minutes} onChange={set("minutes")} />
        </label>
      </div>
      <label className="stack" style={{ gap: 4 }}>
        <span className="small strong">
          What did you learn, and how will you use it? <span className="faint">(optional, but professional bodies like to see it)</span>
        </span>
        <textarea value={f.reflection} onChange={set("reflection")} maxLength={2000} style={{ minHeight: 70 }} />
      </label>
      {error && <div className="alert alert-warning small">{error}</div>}
      <div>
        <button className="btn btn-primary" disabled={pending}>
          <Plus size={15} /> {pending ? "Saving…" : "Add to my CPD record"}
        </button>
      </div>
    </form>
  );
}

export function DeleteCpd({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      className="btn btn-sm"
      disabled={pending}
      aria-label="Delete this entry"
      title="Delete this entry"
      onClick={() => {
        if (!window.confirm("Delete this CPD entry?")) return;
        start(async () => {
          await deleteCpdEntry(id);
          router.refresh();
        });
      }}
    >
      <Trash2 size={13} />
    </button>
  );
}
