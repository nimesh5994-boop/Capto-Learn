import Link from "next/link";
import { Download } from "lucide-react";
import { registerRows } from "@/lib/learning/register";
import { dateTime } from "@/lib/format";

export const metadata = { title: "Approvals register" };

export default async function ApprovalsRegisterPage({ searchParams }: { searchParams: Promise<{ decision?: string }> }) {
  const { decision } = await searchParams;
  const all = await registerRows();
  const rows = decision ? all.filter((r) => r.decision === decision) : all;
  const filters = ["Signed off", "Needs changes", "Reset to draft"];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Approvals register</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Every review decision — who, when, which version of the lesson, and what they confirmed. Entries are never edited or deleted; a later decision is added as a new line.
          </p>
        </div>
        <a href="/api/reviewer/register" className="btn">
          <Download size={15} /> Export CSV
        </a>
      </div>

      <div className="row small" style={{ gap: 10, marginBottom: 12 }}>
        <Link href="?" style={{ fontWeight: decision ? 400 : 700 }}>
          All ({all.length})
        </Link>
        {filters.map((f) => (
          <Link key={f} href={`?decision=${encodeURIComponent(f)}`} style={{ fontWeight: decision === f ? 700 : 400 }}>
            {f} ({all.filter((r) => r.decision === f).length})
          </Link>
        ))}
      </div>

      <section className="card" style={{ overflowX: "auto" }}>
        {rows.length === 0 ? (
          <p className="card-pad muted small" style={{ margin: 0 }}>
            No decisions recorded yet.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>When</th>
                <th>Lesson</th>
                <th>Decision</th>
                <th>Reviewer</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="small" style={{ whiteSpace: "nowrap" }}>
                    {dateTime(r.at)}
                  </td>
                  <td>
                    <Link href={`/reviewer/lesson/${r.lessonId}`}>{r.lesson}</Link>
                    <div className="small faint">
                      {r.course} · {r.level}
                      {r.taxYear ? ` · ${r.taxYear}` : ""}
                    </div>
                    {r.notes && (
                      <div className="small" style={{ whiteSpace: "pre-wrap" }}>
                        {r.notes}
                      </div>
                    )}
                  </td>
                  <td className="small">
                    <span className={`pill ${r.decision === "Signed off" ? "pill-accepted" : r.decision === "Needs changes" ? "pill-declined" : "pill-viewed"}`}>{r.decision}</span>
                    {r.decision === "Signed off" && <div className="faint">{r.checklist.length}/6 checks confirmed</div>}
                  </td>
                  <td className="small">{r.reviewer}</td>
                  <td className="small num">
                    {r.version}
                    <div className={r.current ? "faint" : undefined} style={r.current ? undefined : { color: "var(--warning)" }}>
                      {r.current ? "current" : "lesson edited since"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
