import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { AlertTriangle, Bookmark, FileDown, FileText, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries, savedResearch } from "@/lib/db/schema";
import { storedVersions } from "@/lib/kb/search";
import { changedSince, matchesSaved } from "@/lib/research/saved";
import { date } from "@/lib/format";

export const metadata = { title: "Saved research" };

export default async function SavedResearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const ctx = await requirePermission("research.use");
  const q = ((await searchParams).q ?? "").trim().slice(0, 200);
  const db = await getDb();
  const rows = await db
    .select({
      id: savedResearch.id,
      queryId: savedResearch.queryId,
      title: savedResearch.title,
      reference: savedResearch.reference,
      note: savedResearch.note,
      sourceVersions: savedResearch.sourceVersions,
      savedAt: savedResearch.createdAt,
      question: researchQueries.question,
      answer: researchQueries.answer,
    })
    .from(savedResearch)
    .innerJoin(researchQueries, eq(researchQueries.id, savedResearch.queryId))
    .where(and(eq(savedResearch.userId, ctx.user.id), eq(savedResearch.organizationId, ctx.org.id)))
    .orderBy(desc(savedResearch.createdAt));

  // One knowledge-base lookup for every source behind every saved answer: which have changed since?
  const current = await storedVersions([...new Set(rows.flatMap((r) => Object.keys(r.sourceVersions)))]);
  const list = rows.filter((r) => !q || matchesSaved(q, r)).map((r) => ({ ...r, changed: changedSince(r.sourceVersions, current) }));
  const changedCount = rows.filter((r) => changedSince(r.sourceVersions, current).length).length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Saved research</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Answers you&apos;ve saved from Ask Capto. Reopening or downloading them is free and doesn&apos;t count towards your firm&apos;s questions. We flag any answer whose official guidance has changed since it was written.
          </p>
        </div>
        <Link href="/ask" className="btn btn-primary">
          Ask a new question
        </Link>
      </div>

      {rows.length > 0 && (
        <form className="card card-pad row" style={{ gap: 8, marginBottom: 14 }} action="/ask/saved">
          <input name="q" defaultValue={q} placeholder="Filter by title, client, note or question" aria-label="Filter saved research" />
          <button className="btn">
            <Search size={14} /> Filter
          </button>
          {q && (
            <Link href="/ask/saved" className="btn">
              Clear
            </Link>
          )}
        </form>
      )}

      {changedCount > 0 && !q && (
        <div className="alert alert-warning small" style={{ marginBottom: 14 }}>
          <AlertTriangle size={14} /> {changedCount} saved answer{changedCount === 1 ? "" : "s"} rel{changedCount === 1 ? "ies" : "y"} on guidance that has changed since it was written. Open it and check the linked page, or research it fresh.
        </div>
      )}

      {rows.length === 0 ? (
        <div className="card card-pad stack" style={{ gap: 8 }}>
          <strong>
            <Bookmark size={15} /> Nothing saved yet
          </strong>
          <span className="small muted">Open any Ask Capto answer and press Save. You can add a client or job reference and a note, and download it as a Word or PDF report.</span>
        </div>
      ) : list.length === 0 ? (
        <div className="card card-pad small muted">No saved answers match “{q}”.</div>
      ) : (
        <div className="stack" style={{ gap: 10 }}>
          {list.map((r) => (
            <article key={r.id} className="card card-pad stack" style={{ gap: 6 }}>
              <div className="row between" style={{ gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link href={`/ask/${r.queryId}`}>
                    <strong>{r.title}</strong>
                  </Link>
                  <div className="small faint">
                    {r.reference && <>{r.reference} · </>}
                    Answered {r.answer ? date(r.answer.generatedAt) : "—"} · saved {date(r.savedAt)}
                    {r.answer?.taxYear ? ` · tax year ${r.answer.taxYear}` : ""}
                  </div>
                </div>
                <span className="row" style={{ gap: 6 }}>
                  <a className="btn btn-sm" href={`/api/research/${r.queryId}/report?format=docx`} download>
                    <FileText size={13} /> Word
                  </a>
                  <a className="btn btn-sm" href={`/api/research/${r.queryId}/report?format=pdf`} download>
                    <FileDown size={13} /> PDF
                  </a>
                </span>
              </div>
              {r.title !== r.question && <div className="small muted">{r.question}</div>}
              {r.answer?.shortAnswer && <div className="small">{r.answer.shortAnswer.replace(/[*_`#>]/g, "").slice(0, 240)}{r.answer.shortAnswer.length > 240 ? "…" : ""}</div>}
              {r.note && <div className="small faint" style={{ whiteSpace: "pre-wrap" }}>{r.note}</div>}
              {r.changed.length > 0 && (
                <div className="small" style={{ color: "var(--warning, #b45309)" }}>
                  <AlertTriangle size={13} /> Guidance changed since this answer: {r.changed.length} source{r.changed.length === 1 ? "" : "s"}.{" "}
                  <Link href={`/ask?fresh=1&q=${encodeURIComponent(r.question)}`}>Research it fresh</Link>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}
