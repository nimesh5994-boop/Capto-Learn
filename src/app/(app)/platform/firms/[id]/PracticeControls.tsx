"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, UserPlus } from "lucide-react";
import {
  createPracticeResetLink,
  invitePracticeUser,
  renamePractice,
  revokePracticeInvite,
  setPracticeFeature,
  setPracticeUserActive,
  setPracticeUserRole,
  updatePracticeBilling,
  updatePracticeLimits,
  type PracticeResult,
} from "@/app/actions/practice";
import { money } from "@/lib/format";
import styles from "./practice.module.css";

function useAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<PracticeResult | null>(null);
  const run = (fn: () => Promise<PracticeResult>, after?: (r: PracticeResult) => void) =>
    startTransition(async () => {
      const r = await fn();
      setResult(r);
      after?.(r);
      router.refresh();
    });
  return { pending, result, run, clear: () => setResult(null) };
}

function Result({ result }: { result: PracticeResult | null }) {
  const [copied, setCopied] = useState(false);
  if (!result) return null;
  return (
    <div className={`alert ${result.ok ? "alert-success" : "alert-error"}`}>
      {result.ok ? result.message : result.error}
      {result.ok && result.link && (
        <div className="row" style={{ marginTop: 8 }}>
          <input readOnly value={result.link} onFocus={(e) => e.target.select()} aria-label="Link" />
          <button
            className="btn btn-sm"
            onClick={async () => {
              await navigator.clipboard.writeText(result.link!);
              setCopied(true);
            }}
          >
            <Copy size={13} /> {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
}

export function BillingForm({ orgId, initial, listPrice, disabled }: { orgId: string; initial: { customMonthlyPrice: string; billingEmail: string; platformNotes: string }; listPrice: number | null; disabled: boolean }) {
  const [form, setForm] = useState(initial);
  const { pending, result, run } = useAction();
  return (
    <div className="stack">
      <div className="grid-2">
        <div>
          <label htmlFor="bf-price">Agreed monthly price (£, ex VAT)</label>
          <input id="bf-price" type="number" min={0} step="1" value={form.customMonthlyPrice} disabled={disabled} placeholder={listPrice === null ? "—" : `List price ${money(listPrice)}`} onChange={(e) => setForm({ ...form, customMonthlyPrice: e.target.value })} />
          <p className="small faint" style={{ marginTop: 4 }}>
            Blank = the plan&apos;s list price. Use for negotiated or discounted deals.
          </p>
        </div>
        <div>
          <label htmlFor="bf-email">Billing email</label>
          <input id="bf-email" type="email" value={form.billingEmail} disabled={disabled} onChange={(e) => setForm({ ...form, billingEmail: e.target.value })} placeholder="accounts@firm.co.uk" />
        </div>
      </div>
      <div>
        <label htmlFor="bf-notes">Internal notes (Capto only — the practice never sees these)</label>
        <textarea id="bf-notes" rows={4} value={form.platformNotes} disabled={disabled} onChange={(e) => setForm({ ...form, platformNotes: e.target.value })} />
      </div>
      <Result result={result} />
      {!disabled && (
        <div>
          <button className="btn btn-primary" disabled={pending} onClick={() => run(() => updatePracticeBilling(orgId, form))}>
            {pending ? "Saving…" : "Save billing details"}
          </button>
        </div>
      )}
    </div>
  );
}

export function LimitsForm({
  orgId,
  initial,
  planLimits,
  disabled,
}: {
  orgId: string;
  initial: { maxUsers: string; maxResearchPerMonth: string };
  planLimits: { maxUsers: number | null; maxResearchPerMonth: number | null };
  disabled: boolean;
}) {
  const [form, setForm] = useState(initial);
  const { pending, result, run } = useAction();
  const plan = (n: number | null) => (n === null ? "unlimited" : String(n));
  return (
    <div className="stack">
      <p className="small muted">Leave blank to follow the plan, type a number for a custom limit, or “unlimited”.</p>
      <div className="grid-2">
        <div>
          <label htmlFor="lf-users">Users (plan: {plan(planLimits.maxUsers)})</label>
          <input id="lf-users" value={form.maxUsers} disabled={disabled} onChange={(e) => setForm({ ...form, maxUsers: e.target.value })} placeholder={`Plan default — ${plan(planLimits.maxUsers)}`} />
        </div>
        <div>
          <label htmlFor="lf-props">Ask Capto questions per month (plan: {plan(planLimits.maxResearchPerMonth)})</label>
          <input id="lf-props" value={form.maxResearchPerMonth} disabled={disabled} onChange={(e) => setForm({ ...form, maxResearchPerMonth: e.target.value })} placeholder={`Plan default — ${plan(planLimits.maxResearchPerMonth)}`} />
        </div>
      </div>
      <Result result={result} />
      {!disabled && (
        <div>
          <button className="btn btn-primary" disabled={pending} onClick={() => run(() => updatePracticeLimits(orgId, form))}>
            {pending ? "Saving…" : "Save limits"}
          </button>
        </div>
      )}
    </div>
  );
}

export function FeatureToggle({ orgId, feature, mode, disabled, effective }: { orgId: string; feature: string; mode: "plan" | "on" | "off"; disabled: boolean; effective: boolean }) {
  const { pending, result, run } = useAction();
  const options: { value: "plan" | "on" | "off"; label: string }[] = [
    { value: "plan", label: "Follow plan" },
    { value: "on", label: "On" },
    { value: "off", label: "Off" },
  ];
  return (
    <div className="row" style={{ gap: 10 }}>
      <div className={styles.segmented} role="group" aria-label="Feature setting">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={mode === o.value} disabled={disabled || pending} onClick={() => mode !== o.value && run(() => setPracticeFeature(orgId, feature, o.value))}>
            {o.label}
          </button>
        ))}
      </div>
      <span className={`small ${effective ? "" : "faint"}`} style={effective ? { color: "var(--success)" } : undefined}>
        {effective ? "Enabled" : "Disabled"}
      </span>
      {result && !result.ok && <span className="small" style={{ color: "var(--danger)" }}>{result.error}</span>}
    </div>
  );
}

type Member = { id: string; name: string; email: string; role: string; roleLabel: string; active: boolean; lastLogin: string; platformRole: string | null };

export function PracticeUsers({
  orgId,
  canManage,
  meId,
  roleOptions,
  seats,
  members,
  invites,
}: {
  orgId: string;
  canManage: boolean;
  meId: string;
  roleOptions: { value: string; label: string }[];
  seats: string;
  members: Member[];
  invites: { id: string; email: string; roleLabel: string; expires: string }[];
}) {
  const { pending, result, run } = useAction();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [confirm, setConfirm] = useState<string | null>(null);

  return (
    <div className="stack">
      <Result result={result} />
      <div className="card">
        <div className="card-pad row between" style={{ paddingBottom: 10 }}>
          <div>
            <h2>Users</h2>
            <p className="small muted">{seats}</p>
          </div>
          {canManage && (
            <button className="btn btn-primary btn-sm" onClick={() => setInviteOpen((v) => !v)}>
              <UserPlus size={15} /> Add user
            </button>
          )}
        </div>
        {inviteOpen && (
          <div className="card-pad stack" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <div className="grid-2">
              <div>
                <label htmlFor="pu-email">Email</label>
                <input id="pu-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="pu-role">Role</label>
                <select id="pu-role" value={role} onChange={(e) => setRole(e.target.value)}>
                  {roleOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-primary"
                disabled={pending || !email}
                onClick={() =>
                  run(
                    () => invitePracticeUser(orgId, { email, role }),
                    (r) => {
                      if (r.ok) {
                        setEmail("");
                        setInviteOpen(false);
                      }
                    }
                  )
                }
              >
                {pending ? "Inviting…" : "Send invitation"}
              </button>
              <button className="btn" onClick={() => setInviteOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Last sign-in</th>
              {canManage && <th className="right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={m.active ? undefined : { opacity: 0.6 }}>
                <td>
                  <div style={{ fontWeight: 560 }}>
                    {m.name}
                    {m.id === meId && <span className="faint"> (you)</span>}
                    {!m.active && <span className="pill pill-declined" style={{ marginLeft: 8 }}>Deactivated</span>}
                    {m.platformRole && <span className="pill pill-sent" style={{ marginLeft: 8 }}>Platform</span>}
                  </div>
                  <div className="small muted">{m.email}</div>
                </td>
                <td>
                  {canManage && m.active && m.id !== meId ? (
                    <select value={roleOptions.some((o) => o.value === m.role) ? m.role : ""} disabled={pending} onChange={(e) => run(() => setPracticeUserRole(orgId, m.id, e.target.value))} aria-label={`Role for ${m.name}`} style={{ maxWidth: 170 }}>
                      {!roleOptions.some((o) => o.value === m.role) && <option value="">{m.roleLabel}</option>}
                      {roleOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    m.roleLabel
                  )}
                </td>
                <td className="small muted">{m.lastLogin}</td>
                {canManage && (
                  <td className="right">
                    {m.id !== meId && (
                      <div className="row" style={{ justifyContent: "flex-end", gap: 6 }}>
                        {m.active && (
                          <button className="btn btn-sm" disabled={pending} onClick={() => run(() => createPracticeResetLink(orgId, m.id))}>
                            Reset link
                          </button>
                        )}
                        {confirm === m.id ? (
                          <>
                            <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => run(() => setPracticeUserActive(orgId, m.id, false), () => setConfirm(null))}>
                              Confirm
                            </button>
                            <button className="btn btn-sm" onClick={() => setConfirm(null)}>
                              Cancel
                            </button>
                          </>
                        ) : m.active ? (
                          <button className="btn btn-sm btn-danger" onClick={() => setConfirm(m.id)}>
                            Deactivate
                          </button>
                        ) : (
                          <button className="btn btn-sm" disabled={pending} onClick={() => run(() => setPracticeUserActive(orgId, m.id, true))}>
                            Reactivate
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {invites.length > 0 && (
        <div className="card">
          <div className="card-pad" style={{ paddingBottom: 10 }}>
            <h2>Pending invitations</h2>
          </div>
          <table className="table">
            <tbody>
              {invites.map((i) => (
                <tr key={i.id}>
                  <td>{i.email}</td>
                  <td>{i.roleLabel}</td>
                  <td className="small muted">Expires {i.expires}</td>
                  {canManage && (
                    <td className="right">
                      <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => run(() => revokePracticeInvite(orgId, i.id))}>
                        Revoke
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function RenameForm({ orgId, name, disabled }: { orgId: string; name: string; disabled: boolean }) {
  const [value, setValue] = useState(name);
  const { pending, result, run } = useAction();
  return (
    <div className="stack">
      <div className="row">
        <input value={value} disabled={disabled} onChange={(e) => setValue(e.target.value)} aria-label="Practice name" />
        {!disabled && (
          <button className="btn" disabled={pending || value.trim() === name} onClick={() => run(() => renamePractice(orgId, value))}>
            Rename
          </button>
        )}
      </div>
      <Result result={result} />
    </div>
  );
}
