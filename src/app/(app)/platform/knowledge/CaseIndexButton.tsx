"use client";

import { useState, useTransition } from "react";
import { Scale } from "lucide-react";
import { rebuildCases } from "@/app/actions/knowledge";

export function CaseIndexButton() {
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="stack" style={{ gap: 6, alignItems: "flex-start" }}>
      <button className="btn" disabled={pending} onClick={() => start(async () => setMsg((await rebuildCases()).message))}>
        <Scale size={15} /> {pending ? "Rebuilding…" : "Rebuild case index"}
      </button>
      {msg && <span className="small muted">{msg}</span>}
    </div>
  );
}
