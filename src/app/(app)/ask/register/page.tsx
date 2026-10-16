import Link from "next/link";
import { FileSpreadsheet, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { loadRegister, registerPeople } from "@/lib/research/registerData";
import { costPence, parseDay, parseReviewFilter, REVIEW_LABEL, routeLabel, type ReviewFilter } from "@/lib/research/register";
import { date, dateTime } from "@/lib/format";

export const metadata = { title: "Research register" };

type SP = { review?: string; who?: string; from?: string; to?: string; q?: string; tab?: string };

const REVIEW_PILL = { approved: "pill-accepted", changes: "pill-declined" } as const;

export default async function ResearchRegisterPage({ searchParams }: { searchParams: Promise<SP> }) {
  const ctx = await requirePermission("research.register");
  const sp = await searchParams;
  const review = parseReviewFilter(sp.review);
  const filters = { review, userId: sp.who && /^[0-9a-f-]{36}$/i.test(sp.who) ? sp.who : null, from: parseDay(sp.from), to: parseDay(sp.to), q: (sp.q ?? "").trim().slice(0, 200) };
  const [{ rows, documents, capped }, people] = await Promise.all([loadRegister(ctx.org.id, filters), registerPeople(ctx.org.id)]);
  const tab = sp.tab === "documents" ? "documents" : "questions";

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ review: review === "all" ? "" : review, who: filters.userId ?? "", from: sp.from ?? "", to: sp.to ?? "", q: filters.q })) if (v) params.set(k, v);
  const link = (extra: Record<string, string>) => {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(extra)) if (v) p.set(k, v);
    else p.delete(k);
    const s = p.toString();
    return s ? `?${s}` : "?";
  };
  const counts = { total: rows.length, approved: rows.filter((r) => r.reviewStatus === "approved").length, changes: rows.filter((r) => r.reviewStatus === "changes").length };
  const unreviewed = rows.filter((r) => r.status === "answered" && !r.reviewStatus).length;
  const spend = rows.reduce((n, r) => n + r.costMicros, 0);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Research register</h1>
          <p className="muted" style={{ maxWidth: 800 }}>
            Your firm&apos;s record of every Ask Capto question, how it was answered, its review and every Word or PDF document issued from it. Approve an answer to make it available to everyone in the firm and to have it reused first when a colleague asks the same thing.
          </p>
        </div>
        <a className="btn" href={`/api/research/register${params.toString() ? `?${params}` : ""}`} download>
          <FileSpreadsheet size={15} /> Download Excel
        </a>
      </div>

      <div className="row" style={{ gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <span className="pill">{counts.total.toLocaleString("en-GB")} questions</span>
        <span className="pill pill-accepted">{counts.approved} approved</span>
        <span className="pill pill-declined">{counts.changes} need changes</span>
        <span className="pill">{unreviewed} awaiting review</span>
        <span className="pill">{documents.length} documents issued</span>
        <span className="pill">AI cost ≈ £{(costPence(spend) / 100).toFixed(2)}</span>
      </div>

      <form className="card card-pad row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 14, alignItems: "flex-end" }} action="/ask/register">
        <input type="hidden" name="tab" value={tab} />
        <label style={{ flex: "2 1 220px", margin: 0 }}>
          Search
          <input name="q" defaultValue={filters.q} placeholder="Question, person or document ref (CL-…)" />
        </label>
        <label style={{ flex: "1 1 150px", margin: 0 }}>
          Review
          <select name="review" defaultValue={review}>
            {(["all", "none", "approved", "changes"] as ReviewFilter[]).map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All" : REVIEW_LABEL[r]}
              </option>
            ))}
          </select>
        </label>
        <label style={{ flex: "1 1 160px", margin: 0 }}>
          Asked by
          <select name="who" defaultValue={filters.userId ?? ""}>
            <option value="">Everyone</option>
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label style={{ flex: "1 1 130px", margin: 0 }}>
          From
          <input type="date" name="from" defaultValue={sp.from ?? ""} />
        </label>
        <label style={{ flex: "1 1 130px", margin: 0 }}>
          To
          <input type="date" name="to" defaultValue={sp.to ?? ""} />
        </label>
        <button className="btn btn-primary">
          <Search size={14} /> Filter
        </button>
        {params.toString() && (
          <Link href={`/ask/register${tab === "documents" ? "?tab=documents" : ""}`} className="btn">
            Clear
          </Link>
        )}
      </form>

      <div className="row" style={{ gap: 6, marginBottom: 10 }}>
        <Link href={link({ tab: "" })} className={`btn btn-sm${tab === "questions" ? " btn-primary" : ""}`}>
          Questions ({rows.length})
        </Link>
        <Link href={link({ tab: "documents" })} className={`btn btn-sm${tab === "documents" ? " btn-primary" : ""}`}>
          Documents issued ({documents.length})
        </Link>
        {capped && <span className="small muted">Showing the latest 5,000. Narrow the dates to see older ones.</span>}
      </div>

      {tab === "questions" ? (
        rows.length === 0 ? (
          <div className="card card-pad small muted">No questions match these filters.</div>
        ) : (
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Question</th>
                  <th>Asked by</th>
                  <th>Answered by</th>
                  <th>Verified</th>
                  <th>Review</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{date(r.createdAt)}</td>
                    <td style={{ minWidth: 260 }}>
                      {r.status === "answered" ? <Link href={`/ask/${r.id}`}>{r.question.length > 140 ? `${r.question.slice(0, 140)}…` : r.question}</Link> : <span className="muted">{r.question.slice(0, 140)}</span>}
                      <div className="small faint">
                        {r.status !== "answered" ? "No answer produced" : [r.taxYear && `Tax year ${r.taxYear}`, r.confidence && `${r.confidence} confidence`, r.helpful === false && "rated unhelpful"].filter(Boolean).join(" · ")}
                      </div>
                    </td>
                    <td>{r.askedBy}</td>
                    <td className="small">{routeLabel(r.route)}</td>
                    <td className="small">{r.checked ? `${r.verified}/${r.checked}` : "—"}</td>
                    <td>
                      {r.reviewStatus ? <span className={`pill ${REVIEW_PILL[r.reviewStatus]}`}>{REVIEW_LABEL[r.reviewStatus]}</span> : <span className="small faint">{r.status === "answered" ? "Not reviewed" : "—"}</span>}
                      {r.reviewedByName && (
                        <div className="small faint">
                          {r.reviewedByName}
                          {r.reviewedAt ? `, ${date(r.reviewedAt)}` : ""}
                        </div>
                      )}
                    </td>
                    <td className="small">{r.docs.length ? r.docs.length : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : documents.length === 0 ? (
        <div className="card card-pad small muted">No documents issued for these filters.</div>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Issued</th>
                <th>Reference</th>
                <th>Format</th>
                <th>Subject</th>
                <th>Client / matter</th>
                <th>Issued by</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{dateTime(d.createdAt)}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{d.docRef}</td>
                  <td>{d.format === "docx" ? "Word" : "PDF"}</td>
                  <td style={{ minWidth: 240 }}>
                    <Link href={`/ask/${d.queryId}`}>{d.question.length > 120 ? `${d.question.slice(0, 120)}…` : d.question}</Link>
                  </td>
                  <td>{d.reference || "—"}</td>
                  <td>{d.userName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
