"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { extendTrial, setFirmPlan, setFirmSuspended, type PlatformResult } from "@/app/actions/platform";
import { PLANS, PLAN_KEYS } from "@/lib/plans";

export function FirmControls({ orgId, plan, suspended, canPlan, canSuspend }: { orgId: string; plan: string; suspended: boolean; canPlan: boolean; canSuspend: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<PlatformResult | null>(null);
  const [confirmSuspend, setConfirmSuspend] = useState(false);
  const [reason, setReason] = useState("");

  const act = (fn: () => Promise<PlatformResult>) =>
    startTransition(async () => {
      setMsg(await fn());
      setConfirmSuspend(false);
      router.refresh();
    });

  return (
    <div className="stack" style={{ gap: 6, minWidth: 260 }}>
      {canPlan && <div className="row" style={{ gap: 6 }}>
        <select value={plan} disabled={pending} onChange={(e) => act(() => setFirmPlan(orgId, e.target.value))} aria-label="Plan" style={{ padding: "4px 8px" }}>
          {PLAN_KEYS.map((k) => (
            <option key={k} value={k}>
              {PLANS[k].label}
            </option>
          ))}
        </select>
        <button className="btn btn-sm" disabled={pending} onClick={() => act(() => extendTrial(orgId, 14))} title="Put the firm on trial and extend it by 14 days">
          +14d trial
        </button>
      </div>}
      {canSuspend &&
        (suspended ? (
          <button className="btn btn-sm" disabled={pending} onClick={() => act(() => setFirmSuspended(orgId, false, ""))}>
            Reactivate firm
          </button>
        ) : confirmSuspend ? (
          <div className="row" style={{ gap: 6 }}>
            <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (shown to the firm)" style={{ padding: "4px 8px" }} />
            <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => act(() => setFirmSuspended(orgId, true, reason))}>
              Suspend
            </button>
            <button className="btn btn-sm" onClick={() => setConfirmSuspend(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn btn-sm btn-danger" onClick={() => setConfirmSuspend(true)}>
            Suspend…
          </button>
        ))}
      {msg && <span className={`small ${msg.ok ? "" : "muted"}`} style={{ color: msg.ok ? "var(--success)" : "var(--danger)" }}>{msg.ok ? msg.message : msg.error}</span>}
    </div>
  );
}
