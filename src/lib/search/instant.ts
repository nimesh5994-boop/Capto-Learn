/*
 * Level 1 — the instant answer. Uses only Capto's own checked material (flashcards and lesson text), no AI.
 * It answers only when it is confident; otherwise it returns null and the question goes up to Level 2.
 * Pure: the caller passes in the lessons and cards. Unit-tested.
 */
import type { Flashcard } from "@/lib/learning/flashcards";
import { rankPassages, splitPassages, tokenize } from "@/lib/research/passages";
import type { Understanding } from "./understand";

export interface InstantLesson {
  id: string;
  title: string;
  track: string;
  trackTitle: string;
  plain: string;
}

export interface InstantAnswer {
  kind: "flashcard" | "lesson";
  /** The direct answer, verbatim from Capto material. */
  answer: string;
  /** Supporting sentences, verbatim from the lesson. */
  excerpt: string[];
  lesson: { id: string; title: string; trackTitle: string };
  /** Why the bot was confident enough, shown to the user. */
  basis: string;
}

/** Sentences of a passage. Heading lines (short, no full stop) are dropped rather than glued to the next sentence. */
const sentences = (s: string) =>
  s
    .split(/\n+/)
    .filter((line) => /[.!?:]\s*$/.test(line.trim()) || line.trim().length > 80)
    .join(" ")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z£0-9"“(])/)
    .map((x) => x.trim())
    .filter((x) => x.length > 25 && x.length < 400);

const stem = (w: string) => (w.length > 4 && w.endsWith("ies") ? w.slice(0, -3) + "y" : w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);

/** Share of the card's meaningful words that the question also uses. */
function cardMatch(questionTerms: Set<string>, front: string): number {
  const t = [...new Set(tokenize(front))];
  return t.length ? t.filter((w) => questionTerms.has(w)).length / t.length : 0;
}

export function instantAnswer(u: Understanding, lessons: InstantLesson[], cards: Flashcard[]): InstantAnswer | null {
  if (!u.concepts.length) return null; // the bot only answers what it recognises
  const aliases = u.concepts[0].aliases.map((a) => a.toLowerCase());
  const mentions = (s: string) => aliases.some((a) => s.toLowerCase().includes(a));
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const inTopic = (id: string) => u.topics.slice(0, 2).includes(id.split("/")[0]);

  // 1. Facts (rates, deadlines, definitions): a checked flashcard whose question matches closely.
  if (u.intent !== "how_to" && u.intent !== "treatment") {
    const qTerms = new Set(tokenize(`${u.text} ${u.concepts.map((c) => c.name).join(" ")}`));
    const best = cards
      .filter((c) => inTopic(c.lessonId) && mentions(`${c.front} ${c.back} ${c.evidence}`))
      .map((c) => ({ c, score: cardMatch(qTerms, c.front) }))
      .sort((a, b) => b.score - a.score)[0];
    if (best && best.score >= 0.6) {
      const l = byId.get(best.c.lessonId);
      if (l)
        return {
          kind: "flashcard",
          answer: best.c.back,
          excerpt: [best.c.evidence],
          lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle },
          basis: `Matched a checked fact card: “${best.c.front}”`,
        };
    }
  }

  // 2. How-to and definitions: the lesson section that best covers the concept.
  if (u.intent === "how_to" || u.intent === "definition" || u.intent === "general") {
    const pool = lessons.filter((l) => inTopic(l.id));
    const passages = pool.flatMap((l) => splitPassages(l.plain, 900).map((text) => ({ sourceId: l.id, text })));
    const ranked = rankPassages(passages, u.lessonQuery).filter((p) => mentions(p.text));
    const top = ranked[0];
    // Gate on coverage of the question's own words (BM25 scores aren't comparable across corpus sizes).
    const kw = u.keywords.map(stem);
    const covered = top ? new Set(tokenize(top.text).map(stem)) : new Set<string>();
    if (!top || kw.filter((k) => covered.has(k)).length / Math.max(1, kw.length) < 0.6) return null;
    const qTerms = new Set(tokenize(u.lessonQuery));
    const scored = sentences(top.text).map((s, i) => ({ s, i, hits: tokenize(s).filter((w) => qTerms.has(w)).length + (mentions(s) ? 2 : 0) }));
    const good = scored.filter((x) => x.hits >= 3 || (x.hits >= 2 && mentions(x.s))).sort((a, b) => b.hits - a.hits || a.i - b.i);
    // Lead with the sentence that best states the concept itself; the rest follow in the lesson's own order.
    const lead = good.find((x) => mentions(x.s));
    if (!lead || good.length < 2) return null;
    const rest = good
      .filter((x) => x !== lead)
      .slice(0, 3)
      .sort((a, b) => a.i - b.i)
      .map((x) => x.s);
    const l = byId.get(top.sourceId)!;
    return {
      kind: "lesson",
      answer: lead.s,
      excerpt: rest,
      lesson: { id: l.id, title: l.title, trackTitle: l.trackTitle },
      basis: `Best-matching section of the lesson “${l.title}”`,
    };
  }
  return null;
}
