"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Play } from "lucide-react";

type Result = { id?: string; pct?: number; failed?: string[]; costPence?: number; seconds?: number; error?: string };

/** Runs one starter scenario on this deployment and shows its automatic score when done (1–2 minutes). */
export function RunStarter({ id, label }: { id: string; label: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function run() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/platform/planning-qa", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) });
      const j = (await res.json().catch(() => ({}))) as Result;
      setResult(res.ok ? j : { error: j.error ?? "The run failed." });
      if (res.ok) router.refresh();
    } catch {
      setResult({ error: "The run was interrupted. Check Platform → Planning QA in a minute: a finished run is still saved." });
    }
    setBusy(false);
  }

  return (
    <div className="stack" style={{ gap: 6, alignItems: "flex-end" }}>
      <button className="btn btn-sm" disabled={busy} onClick={run} aria-label={`Run ${label}`}>
        {busy ? <Loader2 size={13} className="spin" /> : <Play size={13} />} {busy ? "Running…" : "Run (about 30p)"}
      </button>
      {result?.error && <div className="alert alert-warning small">{result.error}</div>}
      {result && !result.error && (
        <span className="small muted">
          Scored {result.pct}% · {result.costPence}p · {result.seconds}s
        </span>
      )}
    </div>
  );
}
