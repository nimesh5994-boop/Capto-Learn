"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Link2, RefreshCw, Users } from "lucide-react";
import { decideJoinRequest, inviteMany, resetJoinCode, saveJoinSettings, type BulkInviteResult } from "@/app/actions/team";
import styles from "./users.module.css";

type RoleOption = { value: string; label: string };
type Request = { id: string; name: string; email: string; when: string };

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-sm"
      onClick={() =>
        void navigator.clipboard.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        })
      }
    >
      {done ? <Check size={14} /> : <Copy size={14} />} {done ? "Copied" : label}
    </button>
  );
}

/** Quicker ways to add staff than one invitation at a time: a pasted list, or a firm join link. */
export function StaffAccess({
  roleOptions,
  emailReady,
  baseUrl,
  join,
  requests,
}: {
  roleOptions: RoleOption[];
  emailReady: boolean;
  baseUrl: string;
  join: { enabled: boolean; code: string | null; role: string; domains: string[] };
  requests: Request[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"bulk" | "join">("bulk");
  const [pending, start] = useTransition();

  // Invite several
  const [text, setText] = useState("");
  const [role, setRole] = useState("staff");
  const [results, setResults] = useState<BulkInviteResult[] | null>(null);
  const [problems, setProblems] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Join link
  const [enabled, setEnabled] = useState(join.enabled);
  const [joinRole, setJoinRole] = useState(join.role);
  const [domains, setDomains] = useState(join.domains.join(", "));
  const [joinMsg, setJoinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const link = join.code ? `${baseUrl}/join/${join.code}` : null;
  const decide = (id: string, approve: boolean) =>
    start(async () => {
      const r = await decideJoinRequest(id, approve);
      if (!r.ok) window.alert(r.error);
      router.refresh();
    });

  const sendBulk = () =>
    start(async () => {
      setError(null);
      const r = await inviteMany({ text, role });
      if (!r.ok) return setError(r.error);
      setResults(r.results);
      setProblems(r.problems);
      if (r.results.every((x) => x.ok)) setText("");
      router.refresh();
    });
  const saveJoin = (on = enabled) =>
    start(async () => {
      const r = await saveJoinSettings({ enabled: on, role: joinRole as "staff" | "viewer" | "manager", domains });
      setJoinMsg(r.ok ? { ok: true, text: r.message ?? "Saved." } : { ok: false, text: r.error });
      router.refresh();
    });

  const okCount = results?.filter((r) => r.ok).length ?? 0;
  const allLinks = results
    ?.filter((r) => r.ok && r.link)
    .map((r) => `${r.name ?? r.email}: ${r.link}`)
    .join("\n");

  return (
    <div className="stack" style={{ gap: 16, marginBottom: 18 }}>
      {requests.length > 0 && (
        <section className="card">
          <div className="card-pad" style={{ paddingBottom: 4 }}>
            <h2 style={{ margin: 0 }}>Join requests ({requests.length})</h2>
            <p className="small muted" style={{ margin: "4px 0 0" }}>
              People who used your join link with an email outside your approved domains.
            </p>
          </div>
          <table className="table">
            <tbody>
              {requests.map((q) => (
                <tr key={q.id}>
                  <td>
                    <strong>{q.name}</strong>
                    <div className="small faint">
                      {q.email} · asked {q.when}
                    </div>
                  </td>
                  <td className="right">
                    <span className="row" style={{ gap: 6, justifyContent: "flex-end" }}>
                      <button type="button" className="btn btn-primary btn-sm" disabled={pending} onClick={() => decide(q.id, true)}>
                        Approve
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" disabled={pending} onClick={() => decide(q.id, false)}>
                        Decline
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="card">
        <div className={styles.tabs} role="tablist" aria-label="Ways to add staff">
          <button type="button" role="tab" aria-selected={tab === "bulk"} className={tab === "bulk" ? styles.tabOn : undefined} onClick={() => setTab("bulk")}>
            <Users size={15} /> Invite several people
          </button>
          <button type="button" role="tab" aria-selected={tab === "join"} className={tab === "join" ? styles.tabOn : undefined} onClick={() => setTab("join")}>
            <Link2 size={15} /> Join link {join.enabled ? <span className={styles.on}>On</span> : null}
          </button>
        </div>

        {tab === "bulk" ? (
          <div className="card-pad stack" style={{ gap: 12 }}>
            <p className="small muted" style={{ margin: 0 }}>
              One person per line — paste straight from a spreadsheet or email: <code>Jo Bloggs, jo@yourfirm.co.uk</code>. {emailReady ? "Each person gets an invitation email." : "Email isn't set up yet, so you'll get a link for each person to send yourself."}
            </p>
            <textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder={"Jo Bloggs, jo@yourfirm.co.uk\nSam Patel <sam@yourfirm.co.uk>\nann@yourfirm.co.uk"} aria-label="People to invite" />
            <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
              <label className="row small" style={{ gap: 8, margin: 0 }}>
                Role
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "auto" }}>
                  {roleOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="btn btn-primary" disabled={pending || !text.trim()} onClick={sendBulk}>
                {pending ? "Inviting…" : "Invite everyone"}
              </button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            {results && (
              <div className="stack" style={{ gap: 8 }}>
                <div className={`alert ${okCount === results.length ? "alert-success" : "alert-warning"}`}>
                  {okCount} of {results.length} invited{problems.length ? ` · ${problems.length} line${problems.length === 1 ? "" : "s"} had no email address` : ""}.
                </div>
                <table className="table">
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.email}>
                        <td>
                          {r.name ? <strong>{r.name}</strong> : null}
                          <div className={r.name ? "small faint" : undefined}>{r.email}</div>
                        </td>
                        <td className="small" style={{ color: r.ok ? undefined : "var(--danger)" }}>
                          {r.message}
                        </td>
                        <td className="right">{r.link && <CopyButton text={r.link} label="Copy link" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allLinks && (
                  <div>
                    <CopyButton text={allLinks} label="Copy all links" />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="card-pad stack" style={{ gap: 14 }}>
            <p className="small muted" style={{ margin: 0 }}>
              One link for the whole firm — share it in an email or on your intranet and staff create their own accounts. People with an email on your approved domains get in straight away;
              anyone else waits for an admin to approve them above.
            </p>
            <label className="row" style={{ gap: 10, margin: 0, fontSize: 14, color: "var(--text)" }}>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => {
                  setEnabled(e.target.checked);
                  saveJoin(e.target.checked);
                }}
              />
              Join link is {enabled ? "on" : "off"}
            </label>
            {enabled && link && (
              <div className={styles.linkBox}>
                <code>{link}</code>
                <CopyButton text={link} label="Copy link" />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  disabled={pending}
                  onClick={() =>
                    start(async () => {
                      if (!window.confirm("Make a new link? The current one will stop working.")) return;
                      const r = await resetJoinCode();
                      setJoinMsg(r.ok ? { ok: true, text: r.message ?? "Done." } : { ok: false, text: r.error });
                      router.refresh();
                    })
                  }
                >
                  <RefreshCw size={14} /> New link
                </button>
              </div>
            )}
            <div className="grid-2">
              <label style={{ margin: 0 }}>
                New joiners get the role
                <select value={joinRole} onChange={(e) => setJoinRole(e.target.value)}>
                  <option value="staff">Staff</option>
                  <option value="viewer">Trainee (courses only)</option>
                  <option value="manager">Training manager</option>
                </select>
              </label>
              <label style={{ margin: 0 }}>
                Approved email domains (straight in)
                <input value={domains} onChange={(e) => setDomains(e.target.value)} placeholder="e.g. yourfirm.co.uk" />
              </label>
            </div>
            <div className="row" style={{ gap: 10 }}>
              <button type="button" className="btn btn-sm" disabled={pending} onClick={() => saveJoin()}>
                Save settings
              </button>
              {joinMsg && (
                <span className="small" style={{ color: joinMsg.ok ? "var(--success)" : "var(--danger)" }}>
                  {joinMsg.text}
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
