import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq, or } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { orgHasFeature, orgLimits } from "@/lib/plans";
import { usage } from "@/lib/entitlements";
import { dateTime } from "@/lib/format";
import { AskBox } from "@/components/ask/AskBox";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Ask Capto" };

export default async function AskPage({ searchParams }: { searchParams: Promise<{ q?: string; fresh?: string; tier?: string }> }) {
  const { q, fresh, tier } = await searchParams;
  const ctx = await requirePermission("research.use");
  if (!orgHasFeature(ctx.org, "research")) redirect("/?denied=1");
  const db = await getDb();
  const [mine, shared, use] = await Promise.all([
    db
      .select({ id: researchQueries.id, question: researchQueries.question, createdAt: researchQueries.createdAt, status: researchQueries.status })
      .from(researchQueries)
      .where(and(eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.userId, ctx.user.id)))
      .orderBy(desc(researchQueries.createdAt))
      .limit(25),
    db
      .select({ id: researchQueries.id, question: researchQueries.question, createdAt: researchQueries.createdAt })
      .from(researchQueries)
      .where(and(eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.shared, true), or(eq(researchQueries.status, "answered"))))
      .orderBy(desc(researchQueries.createdAt))
      .limit(15),
    usage(db, ctx.org),
  ]);
  const { maxResearchPerMonth } = orgLimits(ctx.org);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Ask Capto</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Practice questions answered only from HMRC internal manuals and GOV.UK guidance, fetched live for your question. Every point quotes its source, and each quote is checked word for word before you see it.
          </p>
        </div>
      </div>
      <div className={styles.layout}>
        <AskBox initial={q} canProfessional={orgHasFeature(ctx.org, "professionalSources")} fresh={fresh === "1"} autoStart={fresh === "1"} tier={tier === "standard" || tier === "expert" ? tier : "auto"} />
        <aside className="stack" style={{ gap: 14 }}>
          {maxResearchPerMonth !== null && (
            <div className="card card-pad small">
              <strong>{use.researchThisMonth}</strong> of {maxResearchPerMonth.toLocaleString("en-GB")} firm questions used this month.
            </div>
          )}
          <div className="card card-pad">
            <div className="small muted" style={{ marginBottom: 6 }}>
              Your recent questions
            </div>
            {mine.length ? (
              <nav className={styles.history}>
                {mine.map((m) => (
                  <Link key={m.id} href={`/ask/${m.id}`}>
                    <span>{m.question.length > 90 ? `${m.question.slice(0, 90)}…` : m.question}</span>
                    <span className="when">
                      {dateTime(m.createdAt)}
                      {m.status !== "answered" ? " · no answer" : ""}
                    </span>
                  </Link>
                ))}
              </nav>
            ) : (
              <p className="small faint" style={{ margin: 0 }}>
                Nothing yet.
              </p>
            )}
          </div>
          {shared.length > 0 && (
            <div className="card card-pad">
              <div className="small muted" style={{ marginBottom: 6 }}>
                Shared in your firm
              </div>
              <nav className={styles.history}>
                {shared.map((m) => (
                  <Link key={m.id} href={`/ask/${m.id}`}>
                    <span>{m.question.length > 90 ? `${m.question.slice(0, 90)}…` : m.question}</span>
                    <span className="when">{dateTime(m.createdAt)}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
