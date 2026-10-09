"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { startKbSync } from "@/app/actions/knowledge";

export function SyncButton({ running }: { running: boolean }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="stack" style={{ gap: 6, alignItems: "flex-end" }}>
      <button className="btn btn-primary" disabled={pending || running} onClick={() => start(async () => setMsg((await startKbSync()).message))}>
        <RefreshCw size={15} /> {running ? "Sync running…" : "Sync now"}
      </button>
      {msg && <span className="small muted">{msg}</span>}
    </div>
  );
}
