/*
 * Flashcards — quick recall of the hard facts in each lesson (rates, thresholds, limits, deadlines).
 * Cards are drafted once by AI (scripts/flashcards.mts, batch API at half price) from the lesson's own text and
 * kept only if they pass these checks, so a card can never say something its lesson doesn't. Pure and tested.
 */
import { createHash } from "node:crypto";
import type { Lesson } from "@/content/types";
import { verifyQuote } from "@/lib/research/passages";

export interface Flashcard {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  /** Verbatim sentence from the lesson that backs the card up. */
  evidence: string;
  taxYear?: string;
}

const stripMd = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/[ \t]+/g, " ");

/** The lesson as plain text, tables written out row by row — what the model reads and what cards are checked against. */
export function lessonPlainText(l: Lesson): string {
  const blocks = [...l.body, ...(l.scenario ? [{ kind: "md" as const, md: l.scenario.narrative }, ...l.scenario.walkthrough] : [])].map((b) => {
    if (b.kind === "md") return b.md;
    if (b.kind === "callout") return [b.title, b.md].filter(Boolean).join(": ");
    if (b.kind === "table") return [b.caption, ...b.rows.map((r) => r.map((c, i) => (b.head[i] ? `${b.head[i]}: ${c}` : c)).join("; ") + ".")].filter(Boolean).join("\n");
    return [b.title, b.narrative].filter(Boolean).join(": ");
  });
  return stripMd([l.title, l.summary, ...blocks].join("\n\n"));
}

/** Fingerprint of a lesson's text; cards made from an older version are hidden until regenerated. */
export const lessonTextHash = (l: Lesson): string => createHash("sha256").update(lessonPlainText(l)).digest("hex").slice(0, 16);

/** Numbers that matter on a card ("£90,000", "20%", "31 January", "6 April 2026" → 90000, 20, 31, 6, 2026). */
export function keyNumbers(s: string): string[] {
  return [...s.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0].replace(/,/g, "")).filter((n) => n.length > 0);
}

export interface DraftCard {
  front: string;
  back: string;
  evidence: string;
}

/** Why a drafted card was rejected, or null if it's good to keep. */
export function rejectCard(card: DraftCard, plain: string): string | null {
  if (card.front.trim().length < 8 || card.back.trim().length < 1) return "empty";
  if (card.back.length > 160) return "answer too long";
  if (!verifyQuote(stripMd(card.evidence), plain)) return "evidence not in lesson";
  const evidenceNums = new Set(keyNumbers(card.evidence));
  if (keyNumbers(card.back).some((n) => !evidenceNums.has(n))) return "number not in evidence";
  return null;
}
