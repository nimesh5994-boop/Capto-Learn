import Link from "next/link";
import { Bookmark, FileDown, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { canViewAnswer } from "@/lib/research/register";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries, savedResearch } from "@/lib/db/schema";
import { AnswerView } from "@/components/ask/AnswerView";
import { SaveAnswer } from "@/components/ask/SaveAnswer";
import { RateAnswer } from "@/components/ask/RateAnswer";
import { ShareToggle } from "@/components/ask/ShareToggle";
import { ReviewPanel } from "@/components/ask/ReviewPanel";
import { date } from "@/lib/format";
import styles from "@/components/ask/ask.module.css";

export default async function AnswerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requirePermission("research.use");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const db = await getDb();
  const [row] = await db
    .select()
    .from(researchQueries)
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id)));
  if (!row || !canViewAnswer(row, { orgId: ctx.org.id, userId: ctx.user.id, canRegister: ctx.can("research.register") })) notFound();
  const isMine = row.userId === ctx.user.id;
  const [saved] = row.answer
    ? await db
        .select({ title: savedResearch.title, reference: savedResearch.reference, note: savedResearch.note })
        .from(savedResearch)
        .where(and(eq(savedResearch.queryId, row.id), eq(savedResearch.userId, ctx.user.id)))
    : [];

  return (
    <>
      <div className="row between small" style={{ margin: "0 0 10px", gap: 8, flexWrap: "wrap" }}>
        <span>
          <Link href="/ask">← Ask another question</Link> · <Link href="/ask/saved">Saved research</Link>
        </span>
        {row.answer && (
          <span className="row" style={{ gap: 6 }}>
            <a href="#save" className="btn btn-sm">
              <Bookmark size={13} /> {saved ? "Saved" : "Save"}
            </a>
            <a href={`/api/research/${row.id}/report?format=docx`} className="btn btn-sm" download>
              <FileText size={13} /> Word
            </a>
            <a href={`/api/research/${row.id}/report?format=pdf`} className="btn btn-sm" download>
              <FileDown size={13} /> PDF
            </a>
          </span>
        )}
      </div>
      <div className={styles.layout}>
        <div className="stack" style={{ gap: 12 }}>
          {row.reviewStatus === "approved" && (
            <div className="alert alert-info small">
              <strong>Reviewed and approved</strong> by {row.reviewedByName ?? "a reviewer"}
              {row.reviewedAt ? ` on ${date(row.reviewedAt)}` : ""}
              {row.reviewNote ? `: ${row.reviewNote}` : "."}
            </div>
          )}
          {row.reviewStatus === "changes" && (
            <div className="alert alert-warning small">
              <strong>A reviewer asked for changes</strong> ({row.reviewedByName ?? "reviewer"}
              {row.reviewedAt ? `, ${date(row.reviewedAt)}` : ""}): {row.reviewNote}. Don&apos;t rely on this answer until it&apos;s re-researched or approved.
            </div>
          )}
          {row.answer ? (
            <AnswerView question={row.question} answer={row.answer} />
          ) : (
            <div className="stack" style={{ gap: 14 }}>
              <h1 className={styles.question}>{row.question}</h1>
              <div className="alert alert-warning">{row.error ?? "No answer was produced for this question."}</div>
              <Link href={`/ask?q=${encodeURIComponent(row.question)}`} className="btn" style={{ width: "fit-content" }}>
                Edit and ask again
              </Link>
            </div>
          )}
        </div>
        <aside className="stack" style={{ gap: 14 }}>
          {row.answer && ctx.can("research.register") && (
            <ReviewPanel id={row.id} initial={{ status: row.reviewStatus, by: row.reviewedByName, at: row.reviewedAt?.toISOString() ?? null, note: row.reviewNote }} />
          )}
          {row.answer && <SaveAnswer id={row.id} question={row.question} initial={saved ?? null} />}
          {row.answer && isMine && <RateAnswer id={row.id} initial={row.helpful} />}
          {row.answer && isMine && <ShareToggle id={row.id} initial={row.shared} />}
          <div className="card card-pad small faint">
            Ask Capto is a research aid, not advice. It answers from official HMRC and GOV.UK guidance and Capto&apos;s own lessons, with every quote checked; apply professional judgement and your firm&apos;s review process before advising a client.
          </div>
        </aside>
      </div>
    </>
  );
}
