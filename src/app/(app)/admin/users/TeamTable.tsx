"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Copy, UserPlus } from "lucide-react";
import { changeMemberRole, copyInvitationLink, createResetLink, inviteMember, resendInvitation, revokeInvitation, setMemberActive, type TeamResult } from "@/app/actions/team";

type RoleOption = { value: string; label: string; description: string };
type LastEmail = { kind: string; status: string; pill: string; when: string } | null;
type Member = { id: string; name: string; email: string; roleValue: string; roleLabel: string; isOwner: boolean; active: boolean; lastLogin: string; lastEmail: LastEmail };
type Invite = { id: string; email: string; roleLabel: string; status: string; pill: string; when: string; canResend: boolean; canRevoke: boolean };

export function TeamTable({
  meId,
  meIsOwner,
  roleOptions,
  members,
  invites,
  emailReady,
}: {
  meId: string;
  meIsOwner: boolean;
  roleOptions: RoleOption[];
  members: Member[];
  invites: Invite[];
  emailReady: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<TeamResult | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [confirm, setConfirm] = useState<string | null>(null);

  const act = (fn: () => Promise<TeamResult>, after?: () => void) =>
    startTransition(async () => {
      const r = await fn();
      setResult(r);
      if (r.ok) after?.();
      setConfirm(null);
      router.refresh();
    });

  // Only owners can hand out the Owner role.
  const assignable = roleOptions.filter((o) => o.value !== "owner" || meIsOwner);

  return (
    <div className="stack">
      {result && (
        <div className={`alert ${result.ok ? "alert-success" : "alert-error"}`}>
          {result.ok ? result.message ?? "Done." : result.error}
          {result.ok && result.link && <CopyLink link={result.link} />}
        </div>
      )}

      <div className="card">
        <div className="card-pad row between" style={{ paddingBottom: 10 }}>
          <h2>People</h2>
          <button className="btn btn-primary btn-sm" onClick={() => setInviteOpen((v) => !v)}>
            <UserPlus size={15} /> Invite someone
          </button>
        </div>
        {inviteOpen && (
          <div className="card-pad stack" style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <div className="grid-2">
              <div>
                <label htmlFor="inv-email">Email</label>
                <input id="inv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@yourfirm.co.uk" />
              </div>
              <div>
                <label htmlFor="inv-role">Role</label>
                <select id="inv-role" value={role} onChange={(e) => setRole(e.target.value)}>
                  {assignable.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <p className="small faint" style={{ marginTop: 4 }}>
                  {assignable.find((o) => o.value === role)?.description}
                </p>
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-primary"
                disabled={pending || !email}
                onClick={() =>
                  act(
                    () => inviteMember({ email, role }),
                    () => {
                      setEmail("");
                      setInviteOpen(false);
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
              <th>Last email</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => {
              const editable = m.id !== meId && (!m.isOwner || meIsOwner);
              return (
                <tr key={m.id} style={m.active ? undefined : { opacity: 0.6 }}>
                  <td>
                    <div style={{ fontWeight: 560 }}>
                      {m.name}
                      {m.id === meId && <span className="faint"> (you)</span>}
                      {!m.active && <span className="pill pill-declined" style={{ marginLeft: 8 }}>Deactivated</span>}
                    </div>
                    <div className="small muted">{m.email}</div>
                  </td>
                  <td>
                    {editable && m.active ? (
                      <select value={m.roleValue} disabled={pending} onChange={(e) => act(() => changeMemberRole(m.id, e.target.value))} aria-label={`Role for ${m.name}`} style={{ maxWidth: 200 }}>
                        {!assignable.some((o) => o.value === m.roleValue) && <option value={m.roleValue}>{m.roleLabel}</option>}
                        {assignable.map((o) => (
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
                  <td className="small">
                    {m.lastEmail ? (
                      <>
                        <span className={`pill ${m.lastEmail.pill}`}>{m.lastEmail.status}</span>
                        <div className="faint" style={{ marginTop: 3 }}>
                          {m.lastEmail.kind} · {m.lastEmail.when}
                        </div>
                      </>
                    ) : (
                      <span className="faint">—</span>
                    )}
                  </td>
                  <td className="right">
                    {editable && (
                      <div className="row" style={{ justifyContent: "flex-end", gap: 6 }}>
                        {m.active && (
                          <button
                            className="btn btn-sm"
                            disabled={pending}
                            title={emailReady ? "Emails them a link to choose a new password (you can copy it too)" : "Creates a link for you to send them"}
                            onClick={() => act(() => createResetLink(m.id))}
                          >
                            {emailReady ? "Send password reset link" : "Reset link"}
                          </button>
                        )}
                        {confirm === m.id ? (
                          <>
                            <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => act(() => setMemberActive(m.id, false))}>
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
                          <button className="btn btn-sm" disabled={pending} onClick={() => act(() => setMemberActive(m.id, true))}>
                            Reactivate
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {invites.length > 0 && (
        <div className="card">
          <div className="card-pad" style={{ paddingBottom: 10 }}>
            <h2>Invitations</h2>
            <p className="small muted" style={{ margin: "4px 0 0" }}>
              Open invitations, plus any accepted or revoked in the last 30 days. Resend emails a new link; Copy link makes a new one without emailing, to send yourself. Either way the old
              link stops working and the invitation gets another 7 days. Links aren&apos;t stored, so Copy link always makes a fresh one.
            </p>
          </div>
          <table className="table">
            <tbody>
              {invites.map((i) => (
                <tr key={i.id}>
                  <td style={{ overflowWrap: "anywhere" }}>{i.email}</td>
                  <td>{i.roleLabel}</td>
                  <td>
                    <span className={`pill ${i.pill}`}>{i.status}</span>
                  </td>
                  <td className="small muted">{i.when}</td>
                  <td className="right">
                    <div className="row" style={{ justifyContent: "flex-end", gap: 6 }}>
                      {i.canResend && (
                        <button className="btn btn-sm" disabled={pending} onClick={() => act(() => resendInvitation(i.id))}>
                          Resend
                        </button>
                      )}
                      {i.canResend && (
                        <button className="btn btn-sm" disabled={pending} title="Makes a new link without emailing it, so you can send it yourself. The earlier link stops working." onClick={() => act(() => copyInvitationLink(i.id))}>
                          Copy link
                        </button>
                      )}
                      {i.canRevoke &&
                        (confirm === `inv:${i.id}` ? (
                          <>
                            <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => act(() => revokeInvitation(i.id))}>
                              Confirm
                            </button>
                            <button className="btn btn-sm" onClick={() => setConfirm(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-sm btn-danger" disabled={pending} onClick={() => setConfirm(`inv:${i.id}`)}>
                            Revoke
                          </button>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="row" style={{ marginTop: 8 }}>
      <input readOnly value={link} onFocus={(e) => e.target.select()} aria-label="Link" />
      <button
        className="btn btn-sm"
        onClick={async () => {
          await navigator.clipboard.writeText(link);
          setCopied(true);
        }}
      >
        <Copy size={13} /> {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
