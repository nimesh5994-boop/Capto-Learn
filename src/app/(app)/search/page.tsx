import Link from "next/link";
import { BookOpen, ExternalLink, MessageSquareQuote, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { orgHasFeature } from "@/lib/plans";
import { searchKb, kbStats, type KbHit } from "@/lib/kb/search";
import { allLessons, lessonText } from "@/content";
import { rankPassages } from "@/lib/research/passages";
import { date } from "@/lib/format";
import { getDb } from "@/lib/db/client";
import { topicBriefs } from "@/lib/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { termOverlap } from "@/lib/research/libraryRules";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Guidance search" };

function relatedLessons(q: string) {
  const lessons = allLessons();
  const ranked = rankPassages(
    lessons.map((r) => ({ sourceId: r.id, text: lessonText(r.lesson) })),
    q
  );
  const ids: string[] = [];
  for (const p of ranked) if (p.score > 2 && !ids.includes(p.sourceId) && ids.length < 4) ids.push(p.sourceId);
  return ids.map((id) => lessons.find((l) => l.id === id)!);
}

export default async function GuidanceSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const ctx = await requirePermission("learning.view");
  const query = q.trim().slice(0, 300);
  const [hits, stats] = await Promise.all([query ? searchKb(query, { limit: 60 }) : Promise.resolve([] as KbHit[]), kbStats()]);

  // Group passages by page: best page first, up to two snippets each.
  const byDoc = new Map<string, KbHit[]>();
  for (const h of hits) byDoc.set(h.url, [...(byDoc.get(h.url) ?? []), h]);
  const docs = [...byDoc.values()].slice(0, 15);
  const lessons = query ? relatedLessons(query) : [];
  // Capto topic briefs matching the search (keyword overlap only — free, no AI).
  const briefs = query
    ? (await (await getDb()).select().from(topicBriefs).where(and(eq(topicBriefs.status, "published"), isNotNull(topicBriefs.answer))))
        .map((b) => ({ b, score: Math.max(termOverlap(query, b.question), termOverlap(query, b.restatedQuestion)) }))
        .filter((x) => x.score >= 0.5)
        .sort((x, y) => y.score - x.score)
        .slice(0, 3)
        .map((x) => x.b)
    : [];
  const canAsk = ctx.can("research.use") && orgHasFeature(ctx.org, "research");

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Guidance search</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Instantly search Capto&apos;s synced copy of {stats.documents ? `${stats.documents.toLocaleString("en-GB")} pages of ` : ""}HMRC manuals and HMRC and Companies House guidance, plus our lessons. No AI is used, so it&apos;s instant and free. When you need a worked
            answer for a specific client, use Ask Capto.
          </p>
        </div>
      </div>

      <form className={`card ${styles.searchForm}`} action="/search">
        <input name="q" defaultValue={query} placeholder="e.g. input tax staff entertainment, s455 repayment, CIS gross payment status" aria-label="Search the guidance" autoFocus />
        <button className="btn btn-primary">
          <Search size={15} /> Search
        </button>
      </form>

      {!stats.documents && (
        <div className="alert alert-warning" style={{ marginTop: 14 }}>
          The knowledge base hasn&apos;t been downloaded yet. A platform admin can start it from Platform admin → Knowledge base.
        </div>
      )}

      {query && (
        <div className={styles.layout} style={{ marginTop: 16 }}>
          <div className="stack" style={{ gap: 12 }}>
            {briefs.map((b) => (
              <article key={b.id} className={`card ${styles.result}`} style={{ borderLeft: "4px solid var(--primary)" }}>
                <div className={styles.resultMeta}>Capto topic brief · {b.area} · quote-checked</div>
                <h3>
                  <Link href={`/briefs/${b.id}`}>{b.question}</Link>
                </h3>
                <p className={styles.snippet}>{b.answer?.shortAnswer}</p>
              </article>
            ))}
            {docs.length === 0 ? (
              <div className="card card-pad muted">No official guidance matched. Try HMRC&apos;s own terms (e.g. &ldquo;input tax&rdquo; rather than &ldquo;claim VAT back&rdquo;).</div>
            ) : (
              docs.map((passages) => {
                const d = passages[0];
                return (
                  <article key={d.url} className={`card ${styles.result}`}>
                    <h3>
                      <a href={d.url} target="_blank" rel="noopener noreferrer">
                        {d.title} <ExternalLink size={12} />
                      </a>
                    </h3>
                    <div className={styles.resultMeta}>
                      {d.publisher}
                      {d.updatedAt ? ` · updated ${date(d.updatedAt)}` : ""}
                    </div>
                    {passages.slice(0, 2).map((p, i) => (
                      <p key={i} className={styles.snippet}>
                        {p.heading && p.heading !== d.title && <strong>{p.heading}: </strong>}
                        <span dangerouslySetInnerHTML={{ __html: p.snippetHtml }} />
                      </p>
                    ))}
                  </article>
                );
              })
            )}
          </div>
          <aside className="stack" style={{ gap: 14 }}>
            {canAsk && (
              <div className="card card-pad stack" style={{ gap: 8 }}>
                <div className="small">Need an answer for a specific situation, with the rule applied to your facts?</div>
                <Link href={`/ask?q=${encodeURIComponent(query)}`} className="btn btn-primary btn-sm">
                  <MessageSquareQuote size={14} /> Ask Capto
                </Link>
              </div>
            )}
            {lessons.length > 0 && (
              <div className="card card-pad stack" style={{ gap: 6 }}>
                <div className="small muted">Related lessons</div>
                {lessons.map((l) => (
                  <Link key={l.id} href={`/learn/${l.id}`} className="small row" style={{ gap: 6 }}>
                    <BookOpen size={13} /> {l.lesson.title}
                  </Link>
                ))}
              </div>
            )}
            <div className="card card-pad small faint">Contains public sector information licensed under the Open Government Licence v3.0. Always check the linked GOV.UK page before relying on it.</div>
          </aside>
        </div>
      )}
    </>
  );
}
