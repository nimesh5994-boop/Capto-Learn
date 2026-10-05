"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCustomRole, saveCustomRole } from "@/app/actions/team";

type Group = { group: string; items: { key: string; label: string; help?: string }[] };
type RoleRow = { id: string; name: string; description: string; permissions: string[]; members: number };

export function RoleEditor({ groups, granted, roles }: { groups: Group[]; granted: string[]; roles: RoleRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<RoleRow | { id: null; name: string; description: string; permissions: string[] } | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const toggle = (key: string) =>
    editing && setEditing({ ...editing, permissions: editing.permissions.includes(key) ? editing.permissions.filter((p) => p !== key) : [...editing.permissions, key] });

  const save = () =>
    editing &&
    startTransition(async () => {
      const r = await saveCustomRole(editing.id, editing);
      setMsg(r.ok ? { ok: true, text: r.message ?? "Saved" } : { ok: false, text: r.error });
      if (r.ok) setEditing(null);
      router.refresh();
    });

  return (
    <div className="stack">
      {msg && <div className={`alert ${msg.ok ? "alert-success" : "alert-error"}`}>{msg.text}</div>}
      {roles.length > 0 && (
        <div className="card">
          <table className="table">
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div style={{ fontWeight: 560 }}>{r.name}</div>
                    <div className="small muted">{r.description || `${r.permissions.length} permissions`}</div>
                  </td>
                  <td className="small muted">
                    {r.members} {r.members === 1 ? "person" : "people"}
                  </td>
                  <td className="right">
                    <div className="row" style={{ justifyContent: "flex-end", gap: 6 }}>
                      <button className="btn btn-sm" onClick={() => setEditing(r)}>
                        Edit
                      </button>
                      {confirmDelete === r.id ? (
                        <>
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={pending}
                            onClick={() =>
                              startTransition(async () => {
                                const res = await deleteCustomRole(r.id);
                                setMsg(res.ok ? { ok: true, text: `Deleted “${r.name}”.` } : { ok: false, text: res.error });
                                setConfirmDelete(null);
                                router.refresh();
                              })
                            }
                          >
                            Confirm delete
                          </button>
                          <button className="btn btn-sm" onClick={() => setConfirmDelete(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-sm btn-danger" onClick={() => setConfirmDelete(r.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!editing ? (
        <div>
          <button className="btn btn-primary" onClick={() => setEditing({ id: null, name: "", description: "", permissions: ["learning.view", "research.use"] })}>
            New custom role
          </button>
        </div>
      ) : (
        <div className="card card-pad stack">
          <h3>{editing.id ? `Edit “${editing.name}”` : "New custom role"}</h3>
          <div className="grid-2">
            <div>
              <label htmlFor="role-name">Name</label>
              <input id="role-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="e.g. Senior bookkeeper" />
            </div>
            <div>
              <label htmlFor="role-desc">Description</label>
              <input id="role-desc" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>
          </div>
          <div className="grid-2">
            {groups.map((g) => (
              <fieldset key={g.group} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 14px" }}>
                <legend className="small" style={{ fontWeight: 600, padding: "0 4px" }}>
                  {g.group}
                </legend>
                {g.items.map((item) => {
                  const allowed = granted.includes(item.key);
                  return (
                    <label key={item.key} className="row" style={{ gap: 8, alignItems: "flex-start", fontWeight: 400, color: allowed ? "var(--text)" : "var(--text-faint)", margin: "6px 0" }} title={allowed ? item.help : "You can't grant a permission you don't have."}>
                      <input type="checkbox" checked={editing.permissions.includes(item.key)} disabled={!allowed} onChange={() => toggle(item.key)} style={{ marginTop: 3 }} />
                      <span>
                        {item.label}
                        {item.help && <span className="small faint" style={{ display: "block" }}>{item.help}</span>}
                      </span>
                    </label>
                  );
                })}
              </fieldset>
            ))}
          </div>
          <div className="row">
            <button className="btn btn-primary" disabled={pending} onClick={save}>
              {pending ? "Saving…" : "Save role"}
            </button>
            <button className="btn" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
