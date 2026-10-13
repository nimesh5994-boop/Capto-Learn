/*
 * Rules for the bot learning from Ask Capto: which answers are safe to keep and serve again for free, and when a
 * new question is the same question. Deliberately strict — a wrong reuse is worse than paying for a fresh answer.
 * Pure and unit-tested.
 */
import { tokenize } from "@/lib/research/passages";
import { stemWord } from "@/lib/kb/rules";
import type { ResearchAnswer } from "@/lib/research/types";

/** Questions carrying a client's own facts need the rule applied afresh, so they're never learned or reused. */
export const hasClientFacts = (q: string) => /£\s?\d|\b\d+(\.\d+)?k\b|\b\d{1,3}(,\d{3})+\b|\b\d{4,}\b|\b(my|our|a|the|this) client\b|\b(he|she|they)\b/i.test(q) || q.length > 160;

/** Worth keeping: high confidence, every point and step quote-verified, and a general question. */
export function canLearn(question: string, a: ResearchAnswer): boolean {
  const checked = [...a.points, ...(a.steps ?? [])];
  return a.confidence === "high" && checked.length >= 2 && checked.every((p) => p.verified) && !hasClientFacts(question) && !a.reuse && !a.brief;
}

const stems = (s: string) => new Set(tokenize(s).map((t) => stemWord(t.replace(/[^a-z0-9£%]/g, ""))).filter((t) => t.length > 1));

/** How alike two questions are: shared meaningful words over the larger set (so a short question can't match a long one). */
export function similarity(a: string, b: string): number {
  const A = stems(a);
  const B = stems(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const t of A) if (B.has(t)) shared++;
  return shared / Math.max(A.size, B.size);
}

export const SAME_QUESTION = 0.6;

/**
 * A question in the bot's own terms: each recognised phrase ("AIA", "annual investment allowance") becomes one
 * token for its concept, so rewordings and abbreviations compare as the same thing.
 */
export function inConceptTerms(text: string, matched: { alias: string; concept: string }[]): string {
  let out = ` ${text.toLowerCase().replace(/[’']/g, "")} `;
  for (const m of [...matched].sort((a, b) => b.alias.length - a.alias.length)) {
    const token = ` concept${m.concept.toLowerCase().replace(/[^a-z0-9]+/g, "")} `;
    out = out.split(new RegExp(`(?<![a-z0-9])${m.alias.toLowerCase().replace(/[’']/g, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/[\s-]+/g, "[\\s-]+")}s?(?![a-z0-9])`)).join(token);
  }
  return out.replace(/\s+/g, " ").trim();
}
