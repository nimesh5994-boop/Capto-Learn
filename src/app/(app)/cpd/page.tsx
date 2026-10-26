import Link from "next/link";
import { Download } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { loadCpdRows } from "@/lib/cpd/load";
import { CPD_KINDS, formatMinutes, summariseByYear } from "@/lib/cpd/log";
import { date } from "@/lib/format";
import { CpdForm, DeleteCpd } from "@/components/cpd/CpdForm";

export const metadata = { title: "CPD record" };

export default async function CpdPage() {
  const ctx = await requirePermission("learning.view");
  const rows = await loadCpdRows(ctx.org.id, ctx.user.id);
  const years = summariseByYear(rows);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>CPD record</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Your continuing professional development in one place: every Capto lesson you complete is added automatically, and you can log training done elsewhere. Download it for your professional body or
            your appraisal. Check your own body&apos;s hours and recording requirements: they differ and change.
          </p>
        </div>
        <a href="/api/cpd" className="btn">
          <Download size={15} /> Download (CSV)
        </a>
      </div>

      {years.length > 0 && (
        <div className="grid-3" style={{ marginBottom: 18 }}>
          {years.slice(0, 3).map((y) => (
            <div key={y.year} className="card card-pad">
              <div className="small muted">{y.year}</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{formatMinutes(y.totalMinutes)}</div>
              <div className="small faint">
                {formatMinutes(y.lessonMinutes)} Capto lessons · {formatMinutes(y.manualMinutes)} logged by you · {y.entries} {y.entries === 1 ? "entry" : "entries"}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="stack" style={{ gap: 18 }}>
        <CpdForm />

        <div className="card" style={{ overflowX: "auto" }}>
          {rows.length === 0 ? (
            <div className="card-pad small muted">Nothing recorded yet. Complete a lesson or log an activity above.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.source}-${r.id}`}>
                    <td style={{ whiteSpace: "nowrap" }}>{date(r.date)}</td>
                    <td style={{ minWidth: 240 }}>
                      {r.link ? <Link href={r.link}>{r.title}</Link> : r.title}
                      <div className="small faint">{r.provider}</div>
                      {r.reflection && (
                        <div className="small muted" style={{ marginTop: 2 }}>
                          {r.reflection}
                        </div>
                      )}
                    </td>
                    <td className="small">{r.kind === "structured" ? "Structured e-learning" : CPD_KINDS[r.kind]}</td>
                    <td className="small" style={{ whiteSpace: "nowrap" }}>
                      {formatMinutes(r.minutes)}
                    </td>
                    <td className="right">{r.source === "manual" ? <DeleteCpd id={r.id} /> : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
