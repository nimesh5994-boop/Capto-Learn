import { randomUUID } from "node:crypto";
import Link from "next/link";
import { after } from "next/server";
import { logBotEvent } from "@/lib/search/botLog";
import { BotFeedback } from "@/components/ask/BotFeedback";
import { BookOpen, ExternalLink, GraduationCap, Layers, MessageSquareQuote, Search, Sparkles, Wand2 } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { orgHasFeature } from "@/lib/plans";
import { searchKb, kbStats, type KbHit } from "@/lib/kb/search";
import { allLessons, getTrack } from "@/content";
import { lessonPlainText } from "@/lib/learning/flashcards";
import { rankPassages, splitPassages } from "@/lib/research/passages";
import { localAnswer } from "@/lib/search/localBot";
import { INTENT_LABEL, type Understanding } from "@/lib/search/understand";
import { date } from "@/lib/format";
import { getDb } from "@/lib/db/client";
import { researchQueries, topicBriefs } from "@/lib/db/schema";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { termOverlap } from "@/lib/research/libraryRules";
import styles from "@/components/ask/ask.module.css";

export const metadata = { title: "Guidance search" };

/** Lessons for the question: ranked on the bot's lesson query, with the question's courses first. */
function lessonsFor(u: Understanding) {
  const lessons = allLessons();
  const ranked = rankPassages(
    lessons.flatMap((r) => splitPassages(`${r.lesson.title}. ${r.lesson.summary}\n\n${lessonPlainText(r.lesson)}`, 1200).map((text) => ({ sourceId: r.id, text }))),
    u.lessonQuery
  );
  const score = new Map<string, number>();
  for (const p of ranked) score.set(p.sourceId, Math.max(score.get(p.sourceId) ?? 0, p.score));
  const boost = (id: string) => {
    const at = u.topics.indexOf(id.split("/")[0]);
    return at < 0 ? 1 : at === 0 ? 1.6 : 1.3;
  };
  return [...score.entries()]
    .map(([id, s]) => ({ id, s: s * boost(id) }))
    .filter((x) => x.s > 2)
    .sort((a, b) => b.s - a.s)
    .slice(0, 5)
    .map((x) => lessons.find((l) => l.id === x.id)!);
}

/** Keeps official results that are actually about the recognised concept (not ones that just share a common word). */
function onTopic(u: Understanding, d: KbHit[]): boolean {
  if (!u.concepts.length) return true;
  const c = u.concepts[0];
  const terms = [...c.aliases, ...(c.official ?? []), c.name].map((t) => t.toLowerCase());
  const text = d.map((h) => `${h.title} ${h.heading ?? ""} ${h.snippetHtml.replace(/<[^>]+>|««|»»/g, "")}`).join(" ").toLowerCase();
  return terms.some((t) => text.includes(t));
}

export default async function GuidanceSearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const ctx = await requirePermission("learning.view");
  const query = q.trim().slice(0, 300);
  const local = query ? await localAnswer(query) : null;
  const u = local?.u;
  // Learning loop: record what the bot made of this search (after the response, so it never slows the page).
  const eventId = local ? randomUUID() : null;
  if (local && eventId) after(() => logBotEvent({ id: eventId, organizationId: ctx.org.id, userId: ctx.user.id, question: query, u: local.u, instant: local.instant }));
  // General accounting ideas (what is a balance sheet, how to post a journal) aren't in tax guidance: lessons only.
  const generalOnly = !!u && u.concepts.length > 0 && u.concepts.every((c) => c.general);
  const [hits, stats] = await Promise.all([u && !generalOnly ? searchKb(u.officialQuery || u.text, { limit: 60 }) : Promise.resolve([] as KbHit[]), kbStats()]);

  const byDoc = new Map<string, KbHit[]>();
  for (const h of hits) byDoc.set(h.url, [...(byDoc.get(h.url) ?? []), h]);
  const allDocs = [...byDoc.values()];
  const docs = (u ? allDocs.filter((d) => onTopic(u, d)) : allDocs).slice(0, 12);
  const lessons = u ? lessonsFor(u) : [];
  const instant = local?.instant ?? null;
  const briefs =
    query && u && u.keywords.length >= 2 && !generalOnly
      ? (await (await getDb()).select().from(topicBriefs).where(and(eq(topicBriefs.status, "published"), isNotNull(topicBriefs.answer))))
          .map((b) => ({ b, score: Math.max(termOverlap(u.text, b.question), termOverlap(u.text, b.restatedQuestion)) }))
          .filter((x) => x.score >= 0.5)
          .sort((x, y) => y.score - x.score)
          .slice(0, 2)
          .map((x) => x.b)
      : [];
  const canAsk = ctx.can("research.use") && orgHasFeature(ctx.org, "research");
  // The firm's own reviewed research: approved answers to the same question, free to open and download.
  const firmAnswers =
    canAsk && query && u && u.keywords.length >= 2
      ? (
          await (await getDb())
            .select({ id: researchQueries.id, question: researchQueries.question, answer: researchQueries.answer, reviewedByName: researchQueries.reviewedByName, reviewedAt: researchQueries.reviewedAt })
            .from(researchQueries)
            .where(and(eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.reviewStatus, "approved"), isNotNull(researchQueries.answer)))
            .orderBy(desc(researchQueries.reviewedAt))
            .limit(500)
        )
          .map((r) => ({ r, score: Math.max(termOverlap(u.text, r.question), termOverlap(query, r.question)) }))
          .filter((x) => x.score >= 0.6)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((x) => x.r)
      : [];
  const fullAnswer = u ? `/ask?fresh=1&tier=standard&q=${encodeURIComponent(u.text)}` : "/ask";

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Guidance search</h1>
          <p className="muted" style={{ maxWidth: 760 }}>
            Ask in your own words. Capto&apos;s question bot works out what you mean, answers instantly from our checked lessons and fact cards where it can, and finds the right official guidance
            {stats.documents ? ` among ${stats.documents.toLocaleString("en-GB")} HMRC and Companies House pages` : ""}. No AI is used here, so it&apos;s instant and free.
          </p>
        </div>
      </div>

      <form className={`card ${styles.searchForm}`} action="/search">
        <input name="q" defaultValue={query} placeholder="e.g. how do I post a journal? · VAT registration threshold · overdrawn director's loan at year end" aria-label="Search" autoFocus />
        <button className="btn btn-primary">
          <Search size={15} /> Search
        </button>
      </form>

      {u && (
        <div className={styles.understood}>
          <Wand2 size={14} />
          <span>
            Understood as: <strong>{u.concepts[0]?.name ?? u.keywords.join(" ")}</strong>
            {u.concepts.length > 1 && <> + {u.concepts.slice(1, 3).map((c) => c.name).join(", ")}</>}
          </span>
          <span className="pill">{INTENT_LABEL[u.intent]}</span>
          {u.topics[0] && getTrack(u.topics[0]) && <span className="pill">{getTrack(u.topics[0])!.title}</span>}
          {u.corrections.length > 0 && <span className="small muted">Corrected: {u.corrections.map((c) => `${c.from} → ${c.to}`).join(", ")}</span>}
        </div>
      )}

      {query && (
        <div className={styles.layout} style={{ marginTop: 14 }}>
          <div className="stack" style={{ gap: 12 }}>
            {instant && (
              <article className={`card ${styles.instant}`}>
                <div className={styles.kicker}>
                  <Sparkles size={13} /> Level 1 · instant answer
                </div>
                <p className={styles.instantAnswer}>{instant.answer}</p>
                {instant.excerpt.length > 0 && (
                  <ul className={styles.instantList}>
                    {instant.excerpt.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
                <div className="row between" style={{ gap: 10, flexWrap: "wrap" }}>
                  <Link href={`/learn/${instant.lesson.id}`} className="small row" style={{ gap: 6 }}>
                    <GraduationCap size={14} /> From: {instant.lesson.title} · {instant.lesson.trackTitle}
                  </Link>
                  {canAsk && (
                    <span className="row" style={{ gap: 6 }}>
                      <Link href={fullAnswer} className="btn btn-sm btn-primary">
                        Full cited answer
                      </Link>
                      <Link href={`/ask?fresh=1&tier=expert&q=${encodeURIComponent(u!.text)}`} className="btn btn-sm">
                        Expert research
                      </Link>
                    </span>
                  )}
                </div>
                {eventId && <BotFeedback eventId={eventId} question="Did this answer your question?" />}
              </article>
            )}

            {!instant && eventId && (
              <div className="card card-pad">
                <BotFeedback eventId={eventId} question={u?.concepts.length ? "Did we understand what you were asking?" : "We didn't recognise this one — tell us what you were looking for?"} />
              </div>
            )}

            {!instant && canAsk && u && u.concepts.length > 0 && (
              <div className="card card-pad row between" style={{ gap: 10, flexWrap: "wrap" }}>
                <span className="small">
                  No instant answer for this one — it needs the rule applied properly. <span className="muted">Ask Capto writes a cited answer in about 30 seconds.</span>
                </span>
                <Link href={fullAnswer} className="btn btn-primary btn-sm">
                  <MessageSquareQuote size={14} /> Get the full answer
                </Link>
              </div>
            )}

            {firmAnswers.map((f) => (
              <article key={f.id} className={`card ${styles.result}`} style={{ borderLeft: "4px solid var(--accent)" }}>
                <div className={styles.resultMeta}>
                  Your firm&apos;s research register · approved by {f.reviewedByName ?? "a reviewer"}
                  {f.reviewedAt ? ` on ${date(f.reviewedAt)}` : ""}
                  {f.answer?.taxYear ? ` · tax year ${f.answer.taxYear}` : ""}
                </div>
                <h3>
                  <Link href={`/ask/${f.id}`}>{f.question}</Link>
                </h3>
                <p className={styles.snippet}>{f.answer?.shortAnswer.replace(/[*_`#>]/g, "").slice(0, 300)}</p>
                <div className="row small" style={{ gap: 10 }}>
                  <Link href={`/ask/${f.id}`}>Open the reviewed answer</Link>
                  <a href={`/api/research/${f.id}/report?format=pdf`} download>
                    PDF memo
                  </a>
                  <a href={`/api/research/${f.id}/report?format=docx`} download>
                    Word memo
                  </a>
                </div>
              </article>
            ))}

            {briefs.map((b) => (
              <article key={b.id} className={`card ${styles.result}`} style={{ borderLeft: "4px solid var(--primary)" }}>
                <div className={styles.resultMeta}>Capto topic brief · {b.area} · quote-checked</div>
                <h3>
                  <Link href={`/briefs/${b.id}`}>{b.question}</Link>
                </h3>
                <p className={styles.snippet}>{b.answer?.shortAnswer}</p>
              </article>
            ))}

            {generalOnly ? (
              <div className="card card-pad small muted">
                {u!.concepts[0].name.charAt(0).toUpperCase() + u!.concepts[0].name.slice(1)}{" "}is a general accounting topic rather than a tax rule, so HMRC and Companies House guidance doesn&apos;t cover it — Capto&apos;s lessons do (right-hand column).
              </div>
            ) : (
              <h2 className={styles.groupHead}>Official guidance{docs.length ? ` (${docs.length})` : ""}</h2>
            )}
            {generalOnly ? null : docs.length === 0 ? (
              <div className="card card-pad muted small">
                {u?.concepts.length ? `No HMRC or Companies House page is specifically about ${u.concepts[0].name}. ` : "No official guidance matched. "}
                {lessons.length ? "Capto's lessons cover it — see the right-hand column." : "Try HMRC's own terms (e.g. “input tax” rather than “claim VAT back”)."}
              </div>
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
            {lessons.length > 0 && (
              <div className="card card-pad stack" style={{ gap: 8 }}>
                <div className={styles.kicker}>
                  <BookOpen size={13} /> From your courses
                </div>
                {lessons.map((l) => (
                  <Link key={l.id} href={`/learn/${l.id}`} className="small" style={{ display: "block" }}>
                    <strong>{l.lesson.title}</strong>
                    <div className="faint">
                      {l.track.title} · {l.lesson.minutes} min
                    </div>
                  </Link>
                ))}
                {u?.topics[0] && (
                  <Link href={`/flashcards?course=${u.topics[0]}`} className="small row" style={{ gap: 6 }}>
                    <Layers size={13} /> Flashcards for this topic
                  </Link>
                )}
              </div>
            )}
            {canAsk && !instant && (
              <div className="card card-pad stack" style={{ gap: 8 }}>
                <div className="small">Need the rule applied to a specific client?</div>
                <Link href={`/ask?q=${encodeURIComponent(u?.text ?? query)}`} className="btn btn-sm">
                  <MessageSquareQuote size={14} /> Ask Capto
                </Link>
              </div>
            )}
            <div className="card card-pad small faint">Contains public sector information licensed under the Open Government Licence v3.0. Always check the linked GOV.UK page before relying on it.</div>
          </aside>
        </div>
      )}
    </>
  );
}
