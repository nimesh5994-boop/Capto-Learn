import { splitPassages, tokenize } from "@/lib/research/passages";

/* Pure rules for the knowledge-base sync and search (unit-tested). */

export interface Listed {
  url: string;
  updatedAt: string | null;
}

export interface Stored {
  url: string;
  sourceUpdatedAt: Date | null;
  removedAt: Date | null;
}

/**
 * What the sync must do for one collection: download new pages and pages GOV.UK says changed, and retire
 * pages that are no longer listed. Removal only happens when the listing was complete, so a partial or failed
 * listing can never wipe content.
 */
export function planSync(listed: Listed[], stored: Stored[], listingComplete: boolean): { fetch: string[]; remove: string[] } {
  const have = new Map(stored.map((s) => [s.url, s]));
  const fetch: string[] = [];
  for (const l of listed) {
    const s = have.get(l.url);
    if (!s || s.removedAt) fetch.push(l.url);
    else if (l.updatedAt && (!s.sourceUpdatedAt || new Date(l.updatedAt).getTime() > s.sourceUpdatedAt.getTime())) fetch.push(l.url);
  }
  const listedUrls = new Set(listed.map((l) => l.url));
  const remove = listingComplete ? stored.filter((s) => !s.removedAt && !listedUrls.has(s.url)).map((s) => s.url) : [];
  return { fetch, remove };
}

/** Splits a page's text into searchable passages, each carrying the nearest heading above it. */
export function toPassages(title: string, text: string, maxChars = 1400): { heading: string; body: string }[] {
  let current = title;
  return splitPassages(text, maxChars).map((chunk) => {
    const lines = chunk.split(/\n{2,}/);
    const firstHeading = lines.find((l) => l.startsWith("## "));
    const heading = lines[0].startsWith("## ") ? lines[0].slice(3).trim() : current;
    if (firstHeading) current = lines.filter((l) => l.startsWith("## ")).pop()!.slice(3).trim();
    return { heading: heading || title, body: chunk.replace(/^## /gm, "").trim() };
  });
}

/** OR-query for Postgres full-text search from free text: distinctive terms only, safe characters only. */
export function toTsQuery(text: string, maxTerms = 24): string | null {
  const terms = [...new Set(tokenize(text).map((t) => t.replace(/[^a-z0-9]/g, "")).filter((t) => t.length > 1))].slice(0, maxTerms);
  return terms.length ? terms.join(" | ") : null;
}

/** Escapes a ts_headline result produced with «« »» markers, then turns the markers into <mark>. */
export function safeHeadline(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/««/g, "<mark>")
    .replace(/»»/g, "</mark>");
}

/**
 * Re-ranks full-text candidates so passages covering more of the question's *distinctive* terms win
 * (Postgres OR-ranking alone lets very common terms like "input tax" dominate). Each term is weighted by
 * how rare it is among the candidates; the database rank breaks ties.
 */
/** Light English stemmer for whole-word matching: parties→party, claims→claim, attended→attend. */
export function stemWord(w: string): string {
  let t = w.toLowerCase();
  if (t.length > 4 && t.endsWith("ies")) return t.slice(0, -3) + "y";
  if (t.length > 5 && t.endsWith("ing")) t = t.slice(0, -3);
  else if (t.length > 4 && t.endsWith("ed")) t = t.slice(0, -2);
  else if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) t = t.slice(0, -1);
  return t;
}

const wordStems = (s: string) => new Set((s.toLowerCase().match(/[a-z0-9]+/g) ?? []).map(stemWord));

export function rerank<T extends { heading: string | null; body: string; rank: number }>(query: string, candidates: T[]): T[] {
  const stems = [...new Set(tokenize(query).map((t) => stemWord(t.replace(/[^a-z0-9]/g, ""))).filter((t) => t.length > 2))];
  if (!stems.length || !candidates.length) return candidates;
  const bodies = candidates.map((c) => wordStems(`${c.heading ?? ""} ${c.body}`));
  const headings = candidates.map((c) => wordStems(c.heading ?? ""));
  const n = candidates.length;
  // Rarer terms among the candidates carry more weight (a local IDF).
  const weight = stems.map((st) => Math.log(1 + n / (1 + bodies.filter((b) => b.has(st)).length)));
  const scored = candidates.map((c, i) => {
    const cover = stems.reduce((sum, st, k) => sum + (bodies[i].has(st) ? weight[k] : 0), 0);
    const headingHit = stems.reduce((sum, st, k) => sum + (headings[i].has(st) ? weight[k] * 0.5 : 0), 0);
    return { c, score: cover + headingHit + c.rank };
  });
  return scored.sort((a, b) => b.score - a.score).map((x) => x.c);
}

/**
 * Which stemmed terms to search on: drop any appearing in more than `maxShare` of passages (they match too much
 * to be useful for finding candidates), but always keep at least the `minKeep` rarest terms.
 */
export function pickSearchLexemes(lexemes: string[], freq: Map<string, number>, totalPassages: number, maxShare = 0.04, minKeep = 2): string[] {
  if (!totalPassages || !freq.size) return lexemes;
  const byRarity = [...lexemes].sort((a, b) => (freq.get(a) ?? 0) - (freq.get(b) ?? 0));
  const kept = byRarity.filter((l) => (freq.get(l) ?? 0) <= totalPassages * maxShare);
  return kept.length >= minKeep ? kept : byRarity.slice(0, minKeep);
}
