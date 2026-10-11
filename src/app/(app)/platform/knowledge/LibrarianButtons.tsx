"use client";

import { useState, useTransition } from "react";
import { BookMarked, RefreshCw } from "lucide-react";
import { checkBriefs, startLibrarian } from "@/app/actions/knowledge";

export function LibrarianButtons({ missing, pending }: { missing: number; pending: number }) {
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, start] = useTransition();
  return (
    <div className="stack" style={{ gap: 6, alignItems: "flex-end" }}>
      <div className="row" style={{ gap: 8 }}>
        <button className="btn btn-sm" disabled={busy || !pending} onClick={() => start(async () => setMsg((await checkBriefs()).message))}>
          <RefreshCw size={14} /> Check for finished briefs
        </button>
        <button className="btn btn-primary btn-sm" disabled={busy || !missing} onClick={() => start(async () => setMsg((await startLibrarian()).message))}>
          <BookMarked size={14} /> Write {missing} missing brief{missing === 1 ? "" : "s"}
        </button>
      </div>
      {msg && <span className="small muted">{msg}</span>}
    </div>
  );
}
