import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, or } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { AnswerView } from "@/components/ask/AnswerView";
import { RateAnswer } from "@/components/ask/RateAnswer";
import { ShareToggle } from "@/components/ask/ShareToggle";
import styles from "@/components/ask/ask.module.css";

export default async function AnswerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requirePermission("research.use");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const db = await getDb();
  const [row] = await db
    .select()
    .from(researchQueries)
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id), or(eq(researchQueries.userId, ctx.user.id), eq(researchQueries.shared, true))));
  if (!row) notFound();
  const isMine = row.userId === ctx.user.id;

  return (
    <>
      <p className="small" style={{ margin: "0 0 10px" }}>
        <Link href="/ask">← Ask another question</Link>
      </p>
      <div className={styles.layout}>
        <div>
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
          {row.answer && isMine && <RateAnswer id={row.id} initial={row.helpful} />}
          {row.answer && isMine && <ShareToggle id={row.id} initial={row.shared} />}
          {row.answer?.followUps.length ? (
            <div className="card card-pad stack" style={{ gap: 6 }}>
              <div className="small muted">Follow-up questions</div>
              {row.answer.followUps.map((f) => (
                <Link key={f} href={`/ask?q=${encodeURIComponent(f)}`} className="small">
                  {f}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="card card-pad small faint">
            Ask Capto is a research aid, not advice. It answers from official guidance only; apply professional judgement and your firm&apos;s review process before advising a client.
          </div>
        </aside>
      </div>
    </>
  );
}
