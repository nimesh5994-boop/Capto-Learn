import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq, or } from "drizzle-orm";
import { requirePermission } from "@/lib/auth/dal";
import { getDb } from "@/lib/db/client";
import { researchQueries, savedResearch } from "@/lib/db/schema";
import { termOverlap } from "@/lib/research/libraryRules";
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
  const [mine, shared, use, saved] = await Promise.all([
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
    db
      .select({ queryId: savedResearch.queryId, title: savedResearch.title, reference: savedResearch.reference, question: researchQueries.question, createdAt: savedResearch.createdAt })
      .from(savedResearch)
      .innerJoin(researchQueries, eq(researchQueries.id, savedResearch.queryId))
      .where(and(eq(savedResearch.userId, ctx.user.id), eq(savedResearch.organizationId, ctx.org.id)))
      .orderBy(desc(savedResearch.createdAt)),
  ]);
  // Asking again something you've already saved? Point at the saved answer first: reopening it is free.
  const alreadySaved = q && fresh !== "1" ? saved.filter((s) => Math.max(termOverlap(q, s.question), termOverlap(q, s.title)) >= 0.7).slice(0, 3) : [];
  const { maxResearchPerMonth } = orgLimits(ctx.org);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Ask Capto</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Ask in your own words. Simple questions are answered instantly from Capto&apos;s checked material; anything that needs the rule applied gets a cited answer from HMRC and GOV.UK guidance and
            Capto&apos;s lessons, with every quote checked word for word. Choose Expert research for judgement-heavy questions.
          </p>
        </div>
      </div>
      <div className={styles.layout}>
        <div className="stack" style={{ gap: 12 }}>
          {alreadySaved.length > 0 && (
            <div className="alert alert-info small stack" style={{ gap: 4 }}>
              <strong>You&apos;ve already saved an answer to this. Opening it is free:</strong>
              {alreadySaved.map((s) => (
                <Link key={s.queryId} href={`/ask/${s.queryId}`}>
                  {s.title}
                  {s.reference ? ` · ${s.reference}` : ""}
                </Link>
              ))}
            </div>
          )}
        <AskBox initial={q} canProfessional={orgHasFeature(ctx.org, "professionalSources")} fresh={fresh === "1"} autoStart={fresh === "1"} tier={tier === "standard" || tier === "expert" ? tier : "auto"} />
        </div>
        <aside className="stack" style={{ gap: 14 }}>
          {maxResearchPerMonth !== null && (
            <div className="card card-pad small">
              <strong>{use.researchThisMonth}</strong> of {maxResearchPerMonth.toLocaleString("en-GB")} firm questions used this month.
            </div>
          )}
          {saved.length > 0 && (
            <div className="card card-pad">
              <div className="row between small" style={{ marginBottom: 6 }}>
                <span className="muted">Saved research</span>
                <Link href="/ask/saved">See all {saved.length}</Link>
              </div>
              <nav className={styles.history}>
                {saved.slice(0, 5).map((s) => (
                  <Link key={s.queryId} href={`/ask/${s.queryId}`}>
                    <span>{s.title.length > 90 ? `${s.title.slice(0, 90)}…` : s.title}</span>
                    <span className="when">{s.reference || dateTime(s.createdAt)}</span>
                  </Link>
                ))}
              </nav>
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
