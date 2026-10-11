import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { topicBriefs } from "@/lib/db/schema";
import { AnswerView } from "@/components/ask/AnswerView";
import styles from "@/components/ask/ask.module.css";

/** A Capto topic brief — platform-wide, so any learner can read it (no AI cost to view). */
export default async function BriefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await requirePermission("learning.view");
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const db = await getDb();
  const [b] = await db.select().from(topicBriefs).where(and(eq(topicBriefs.id, id), eq(topicBriefs.status, "published")));
  if (!b?.answer) notFound();
  const answer = { ...b.answer, brief: { id: b.id, area: b.area, writtenAt: (b.publishedAt ?? b.createdAt).toISOString(), sourcesChecked: Object.keys(b.sourceVersions).length } };
  return (
    <>
      <p className="small" style={{ margin: "0 0 10px" }}>
        <Link href="/search">← Guidance search</Link>
      </p>
      <div className={styles.layout}>
        <AnswerView question={b.question} answer={answer} />
        <aside className="stack" style={{ gap: 14 }}>
          {ctx.can("research.use") && (
            <div className="card card-pad stack" style={{ gap: 8 }}>
              <div className="small">Need this applied to a particular client&apos;s facts?</div>
              <Link href="/ask" className="btn btn-primary btn-sm">
                Ask Capto
              </Link>
            </div>
          )}
          <div className="card card-pad small faint">
            Topic briefs are written from official guidance only and quote-checked automatically. They&apos;re retired and rewritten whenever a cited source changes. A research aid, not advice.
          </div>
        </aside>
      </div>
    </>
  );
}
