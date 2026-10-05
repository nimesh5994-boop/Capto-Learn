/*
 * Retrieval + verification for Ask Capto. Pure (no I/O) so it's unit-tested.
 *
 * Pages are split into passages, ranked with BM25 against the question and search queries, and the best
 * passages go to the model. Every quote the model cites is then checked word-for-word against the full
 * source text — that check, not the model's say-so, decides whether a point is shown as verified.
 */

export interface Passage {
  sourceId: string;
  text: string;
  score: number;
}

const STOP = new Set(
  "a an and are as at be by can do does for from has have how i if in into is it its me my no not of on or our so than that the their them then there these they this to under up was we what when where which who why will with would you your should could may must".split(" ")
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9£%.]+/)
    .map((t) => t.replace(/^\.+|\.+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Groups paragraphs into passages of up to ~maxChars, keeping a heading with the text under it. */
export function splitPassages(text: string, maxChars = 1400): string[] {
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  let cur = "";
  for (const p of paras) {
    const isHeading = p.startsWith("## ");
    if (cur && (cur.length + p.length > maxChars || (isHeading && cur.length > maxChars / 3))) {
      out.push(cur);
      cur = "";
    }
    cur = cur ? `${cur}\n\n${p}` : p;
  }
  if (cur) out.push(cur);
  // A single huge paragraph still gets split, on sentence boundaries.
  return out.flatMap((c) => (c.length <= maxChars * 1.6 ? [c] : c.match(new RegExp(`[\\s\\S]{1,${maxChars}}(?:[.;:](?=\\s)|$)`, "g")) ?? [c]));
}

/** BM25 over the passages of this request's pages. */
export function rankPassages(docs: { sourceId: string; text: string }[], query: string): Passage[] {
  const qTerms = [...new Set(tokenize(query))];
  const chunks = docs.flatMap((d) => splitPassages(d.text).map((text) => ({ sourceId: d.sourceId, text, toks: tokenize(text) })));
  if (!chunks.length) return [];
  const avgLen = chunks.reduce((s, c) => s + c.toks.length, 0) / chunks.length || 1;
  const df = new Map<string, number>();
  for (const c of chunks) for (const t of new Set(c.toks)) df.set(t, (df.get(t) ?? 0) + 1);
  const N = chunks.length;
  const k1 = 1.2;
  const b = 0.75;
  return chunks
    .map((c) => {
      const tf = new Map<string, number>();
      for (const t of c.toks) tf.set(t, (tf.get(t) ?? 0) + 1);
      let score = 0;
      for (const q of qTerms) {
        const f = tf.get(q);
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(q) ?? 0) + 0.5) / ((df.get(q) ?? 0) + 0.5));
        score += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * c.toks.length) / avgLen));
      }
      return { sourceId: c.sourceId, text: c.text, score };
    })
    .sort((a, b2) => b2.score - a.score);
}

/**
 * Picks passages within a character budget: the best passage from every source that matched at all
 * (so no fetched source is silently ignored), then the next best overall.
 */
export function selectPassages(ranked: Passage[], budgetChars = 40_000, perSourceMax = 6): Passage[] {
  const chosen: Passage[] = [];
  const perSource = new Map<string, number>();
  let used = 0;
  const take = (p: Passage) => {
    if (used + p.text.length > budgetChars) return;
    if ((perSource.get(p.sourceId) ?? 0) >= perSourceMax) return;
    chosen.push(p);
    used += p.text.length;
    perSource.set(p.sourceId, (perSource.get(p.sourceId) ?? 0) + 1);
  };
  const seen = new Set<string>();
  for (const p of ranked) if (p.score > 0 && !seen.has(p.sourceId)) (seen.add(p.sourceId), take(p));
  for (const p of ranked) if (p.score > 0 && !chosen.includes(p)) take(p);
  return chosen;
}

/** Normalises typography so a faithful quote matches regardless of curly quotes, dashes, bullets or spacing. */
export function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’‛′`]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐‑‒–—―]/g, "-")
    .replace(/(^|\s)(•|##)\s/g, " ")
    .replace(/\s*\|\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * True when the quote appears verbatim in the source (after typographic normalisation). A quote may elide
 * text with "..." / "…" — each fragment (min 12 chars) must then appear, in order.
 */
export function verifyQuote(quote: string, sourceText: string): boolean {
  const src = normalizeForMatch(sourceText);
  const fragments = normalizeForMatch(quote)
    .replace(/^["']|["']$/g, "")
    .split(/\s*(?:\.\.\.|…|\[\.\.\.\])\s*/)
    .map((f) => f.trim())
    .filter(Boolean);
  if (!fragments.length || fragments.join("").length < 12) return false;
  let from = 0;
  for (const f of fragments) {
    if (f.length < 12 && fragments.length > 1) continue;
    const at = src.indexOf(f, from);
    if (at < 0) return false;
    from = at + f.length;
  }
  return true;
}
