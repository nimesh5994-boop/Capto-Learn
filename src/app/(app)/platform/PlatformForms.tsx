"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
import { inviteFirm, invitePlatformMember, newFirmInvitationLink, newPlatformInvitationLink, resendFirmInvite, resendPlatformInvitation, revokeFirmInvite, revokePlatformInvitation, setPlatformRole, type PlatformResult } from "@/app/actions/platform";

function Feedback({ result }: { result: PlatformResult | null }) {
  const [copied, setCopied] = useState(false);
  if (!result) return null;
  return (
    <div className={`alert ${result.ok ? "alert-success" : "alert-error"}`}>
      {result.ok ? result.message : result.error}
      {result.ok && result.link && (
        <div className="row" style={{ marginTop: 8 }}>
          <input readOnly value={result.link} onFocus={(e) => e.target.select()} aria-label="Signup link" />
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

export function InviteFirmForm({ plans }: { plans: { value: string; label: string }[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<PlatformResult | null>(null);
  const [form, setForm] = useState({ email: "", firmName: "", plan: "trial" });

  return (
    <div className="stack" style={{ gap: 10 }}>
      <div className="grid-3">
        <div>
          <label htmlFor="fi-firm">Firm name</label>
          <input id="fi-firm" value={form.firmName} onChange={(e) => setForm({ ...form, firmName: e.target.value })} placeholder="e.g. Smith & Co Accountants" />
        </div>
        <div>
          <label htmlFor="fi-email">Owner&apos;s email</label>
          <input id="fi-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="owner@firm.co.uk" />
        </div>
        <div>
          <label htmlFor="fi-plan">Plan</label>
          <select id="fi-plan" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
            {plans.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary"
          disabled={pending || !form.email || !form.firmName}
          onClick={() =>
            startTransition(async () => {
              const r = await inviteFirm(form);
              setResult(r);
              if (r.ok) setForm({ email: "", firmName: "", plan: "trial" });
              router.refresh();
            })
          }
        >
          {pending ? "Inviting…" : "Create invitation"}
        </button>
      </div>
      <Feedback result={result} />
    </div>
  );
}

export function RevokeFirmInvite({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);
  return confirm ? (
    <span className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
      <button
        className="btn btn-sm btn-danger"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await revokeFirmInvite(id);
            router.refresh();
          })
        }
      >
        Confirm
      </button>
      <button className="btn btn-sm" onClick={() => setConfirm(false)}>
        Cancel
      </button>
    </span>
  ) : (
    <button className="btn btn-sm btn-danger" onClick={() => setConfirm(true)}>
      Revoke
    </button>
  );
}

export function PlatformRoleSelect({ userId, value, options }: { userId: string; value: string; options: { value: string; label: string }[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<PlatformResult | null>(null);
  return (
    <div className="stack" style={{ gap: 6 }}>
      <select
        value={value}
        disabled={pending}
        aria-label="Platform role"
        onChange={(e) => {
          const next = e.target.value;
          startTransition(async () => {
            setResult(await setPlatformRole(userId, next));
            router.refresh();
          });
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {result && !result.ok && <span className="small" style={{ color: "var(--danger)" }}>{result.error}</span>}
    </div>
  );
}

/** Invite someone straight into the Capto team with a platform role — Content reviewer by default. */
export function InvitePlatformMemberForm({ roles }: { roles: { value: string; label: string; description: string }[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<PlatformResult | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles.find((r) => r.value === "content_reviewer")?.value ?? roles[0]?.value ?? "");
  const chosen = roles.find((r) => r.value === role);
  return (
    <form
      className="stack"
      style={{ gap: 10 }}
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const r = await invitePlatformMember({ email, platformRole: role });
          setResult(r);
          if (r.ok) {
            setEmail("");
            router.refresh();
          }
        });
      }}
    >
      <div className="grid-2">
        <div>
          <label htmlFor="pm-email">Email</label>
          <input id="pm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="reviewer@example.co.uk" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="pm-role">Role</label>
          <select id="pm-role" value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {chosen && <p className="small muted" style={{ margin: 0 }}>{chosen.description}</p>}
      <button className="btn btn-primary" disabled={pending} style={{ alignSelf: "flex-start" }}>
        {pending ? "Inviting…" : "Send invitation"}
      </button>
      <Feedback result={result} />
    </form>
  );
}

export function RevokePlatformInvite({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      className="btn btn-sm btn-ghost"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await revokePlatformInvitation(id);
          router.refresh();
        })
      }
    >
      Revoke
    </button>
  );
}

/**
 * Resend / Revoke for a platform-team or firm invitation. Resend issues a fresh link (the old one stops working), so
 * the new link is shown here to copy — links aren't stored and can't be shown later.
 */
export function InvitationActions({ id, type, canResend, canRevoke }: { id: string; type: "platform" | "firm"; canResend: boolean; canRevoke: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState(false);
  const [result, setResult] = useState<PlatformResult | null>(null);
  const run = (fn: () => Promise<PlatformResult>) =>
    startTransition(async () => {
      setResult(await fn());
      setConfirm(false);
      router.refresh();
    });
  return (
    <div className="stack" style={{ gap: 6, alignItems: "flex-end" }}>
      <span className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
        {canResend && (
          <button className="btn btn-sm" disabled={pending} onClick={() => run(() => (type === "firm" ? resendFirmInvite(id) : resendPlatformInvitation(id)))}>
            {pending ? "Working…" : "Resend"}
          </button>
        )}
        {canResend && (
          <button
            className="btn btn-sm"
            disabled={pending}
            title="Makes a new link without emailing it, so you can send it yourself. The earlier link stops working."
            onClick={() => run(() => (type === "firm" ? newFirmInvitationLink(id) : newPlatformInvitationLink(id)))}
          >
            Copy link
          </button>
        )}
        {canRevoke &&
          (confirm ? (
            <>
              <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => run(() => (type === "firm" ? revokeFirmInvite(id) : revokePlatformInvitation(id)))}>
                Confirm
              </button>
              <button className="btn btn-sm" onClick={() => setConfirm(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => setConfirm(true)}>
              Revoke
            </button>
          ))}
      </span>
      {result && (
        <div style={{ textAlign: "left", width: 340, maxWidth: "75vw" }}>
          <Feedback result={result} />
        </div>
      )}
    </div>
  );
}
