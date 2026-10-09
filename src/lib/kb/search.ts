import "server-only";
import { and, asc, eq, inArray, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { kbDocuments, kbPassages, kbTerms, type KbKind } from "@/lib/db/schema";
import { pickSearchLexemes, rerank, safeHeadline } from "./rules";

/*
 * Search over the mirrored official guidance — Postgres full-text search, no AI, no external calls.
 * Powers the free "Search the guidance" page and the retrieval step of Ask Capto.
 */

export interface KbHit {
  url: string;
  title: string;
  publisher: string;
  collection: string;
  updatedAt: Date | null;
  heading: string | null;
  snippetHtml: string;
  rank: number;
}

/**
 * The candidate query: the question's stemmed terms minus those so common they'd match a large share of the
 * guidance (they still count in re-ranking). Uses kb_terms; falls back to all terms if stats aren't built yet.
 */
async function candidateQuery(text: string): Promise<string | null> {
  const db = await getDb();
  const lexRows = await db.execute<{ lexeme: string }>(sql`select distinct lexeme from unnest(to_tsvector('english', ${text}))`);
  const lexemes = (lexRows.rows ?? (lexRows as unknown as { lexeme: string }[])).map((r) => r.lexeme).filter((l) => /^[a-z0-9]+$/.test(l));
  if (!lexemes.length) return null;
  const [stats, [total]] = await Promise.all([
    db.select().from(kbTerms).where(inArray(kbTerms.word, lexemes)),
    db.select({ n: sql<number>`count(*)::int` }).from(kbPassages),
  ]);
  const freq = new Map(stats.map((s) => [s.word, s.ndoc]));
  const chosen = pickSearchLexemes(lexemes, freq, total?.n ?? 0);
  return chosen.length ? chosen.map((l) => `'${l}'`).join(" | ") : null;
}

export async function searchKb(text: string, opts: { kind?: KbKind; limit?: number } = {}): Promise<KbHit[]> {
  const q = await candidateQuery(text);
  if (!q) return [];
  const db = await getDb();
  const limit = opts.limit ?? 40;
  // Lexemes are already stemmed, so the 'simple' config keeps them as-is.
  const tsq = sql`to_tsquery('simple', ${q})`;
  const rows = await db
    .select({
      id: kbPassages.id,
      url: kbDocuments.url,
      title: kbDocuments.title,
      publisher: kbDocuments.publisher,
      collection: kbDocuments.collection,
      updatedAt: kbDocuments.sourceUpdatedAt,
      heading: kbPassages.heading,
      body: kbPassages.body,
      // Normalisation 1|32: shorter passages aren't unfairly favoured; rank scaled to 0–1.
      rank: sql<number>`ts_rank_cd(${kbPassages.tsv}, ${tsq}, 33)`,
    })
    .from(kbPassages)
    .innerJoin(kbDocuments, eq(kbDocuments.url, kbPassages.documentUrl))
    .where(and(sql`${kbPassages.tsv} @@ ${tsq}`, isNull(kbDocuments.removedAt), opts.kind ? eq(kbDocuments.kind, opts.kind) : undefined))
    .orderBy(sql`ts_rank_cd(${kbPassages.tsv}, ${tsq}, 33) desc`)
    .limit(Math.min(250, limit * 5));
  // Re-rank the candidate pool by coverage of ALL the question's terms, then build highlights for the winners only.
  const top = rerank(
    text,
    rows.map((r) => ({ ...r, rank: Number(r.rank) }))
  ).slice(0, limit);
  if (!top.length) return [];
  const hlq = sql`plainto_tsquery('english', ${text})`;
  const heads = await db
    .select({ id: kbPassages.id, headline: sql<string>`ts_headline('english', ${kbPassages.body}, to_tsquery('english', replace(${hlq}::text, '&', '|')), 'StartSel=««, StopSel=»», MaxWords=45, MinWords=20, MaxFragments=2, FragmentDelimiter= … ')` })
    .from(kbPassages)
    .where(inArray(kbPassages.id, top.map((t) => t.id)));
  const headOf = new Map(heads.map((h) => [h.id, h.headline]));
  return top.map(({ body, id, ...r }) => ({ ...r, snippetHtml: safeHeadline(headOf.get(id) ?? body.slice(0, 280)) }));
}

/** Best documents for a set of queries: each document scored by its best passages across all queries. */
export async function rankDocuments(queries: { text: string; kind?: KbKind }[], maxDocs: number): Promise<string[]> {
  const score = new Map<string, number>();
  const results = await Promise.all(queries.map((q) => searchKb(q.text, { kind: q.kind, limit: 30 })));
  for (const hits of results)
    hits.forEach((h, i) => {
      // Reciprocal-rank fusion: robust when different queries return very different score scales.
      score.set(h.url, (score.get(h.url) ?? 0) + 1 / (10 + i));
    });
  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxDocs)
    .map(([url]) => url);
}

export interface KbDocText {
  url: string;
  title: string;
  publisher: string;
  updatedAt: string | null;
  text: string;
}

/** Full text of stored documents (passages re-joined in order), for answer drafting and quote verification. */
export async function loadDocuments(urls: string[]): Promise<KbDocText[]> {
  if (!urls.length) return [];
  const db = await getDb();
  const [docs, passages] = await Promise.all([
    db.select().from(kbDocuments).where(inArray(kbDocuments.url, urls)),
    db
      .select({ url: kbPassages.documentUrl, heading: kbPassages.heading, body: kbPassages.body, ord: kbPassages.ord })
      .from(kbPassages)
      .where(inArray(kbPassages.documentUrl, urls))
      .orderBy(asc(kbPassages.documentUrl), asc(kbPassages.ord)),
  ]);
  const textOf = new Map<string, string[]>();
  let lastHeading = new Map<string, string | null>();
  for (const p of passages) {
    const parts = textOf.get(p.url) ?? [];
    if (p.heading && p.heading !== lastHeading.get(p.url)) parts.push(`## ${p.heading}`);
    lastHeading = lastHeading.set(p.url, p.heading);
    parts.push(p.body);
    textOf.set(p.url, parts);
  }
  const byUrl = new Map(docs.map((d) => [d.url, d]));
  return urls
    .map((u) => byUrl.get(u))
    .filter((d): d is NonNullable<typeof d> => !!d && textOf.has(d.url))
    .map((d) => ({ url: d.url, title: d.title, publisher: d.publisher, updatedAt: d.sourceUpdatedAt?.toISOString() ?? null, text: textOf.get(d.url)!.join("\n\n") }));
}

/** GOV.UK last-updated dates as held in the knowledge base (no network). Missing = not mirrored. */
export async function storedVersions(urls: string[]): Promise<Map<string, string | null>> {
  if (!urls.length) return new Map();
  const db = await getDb();
  const rows = await db
    .select({ url: kbDocuments.url, updatedAt: kbDocuments.sourceUpdatedAt })
    .from(kbDocuments)
    .where(and(inArray(kbDocuments.url, urls), isNull(kbDocuments.removedAt)));
  return new Map(rows.map((r) => [r.url, r.updatedAt?.toISOString() ?? null]));
}

export async function kbStats() {
  const db = await getDb();
  const [row] = await db
    .select({
      documents: sql<number>`count(*) filter (where ${kbDocuments.removedAt} is null)::int`,
      collections: sql<number>`count(distinct ${kbDocuments.collection})::int`,
      newest: sql<Date | null>`max(${kbDocuments.fetchedAt})`,
    })
    .from(kbDocuments);
  const [p] = await db.select({ passages: sql<number>`count(*)::int` }).from(kbPassages);
  return { ...row, passages: p.passages };
}
