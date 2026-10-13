/*
 * Multiple-choice flashcards: the right answer plus three believable wrong ones, taken from OTHER checked cards
 * of the same kind (amounts with amounts, rates with rates, dates with dates), preferring the same course and a
 * similar length so the right answer doesn't stand out. No AI. Pure and unit-tested.
 */
import { createHash } from "node:crypto";

export interface QuizCard {
  id: string;
  lessonId: string;
  front: string;
  back: string;
}

export type AnswerKind = "money" | "percent" | "date" | "period" | "number" | "text";

const MONTHS = /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i;

export function answerKind(back: string): AnswerKind {
  if (/£\s?\d/.test(back)) return "money";
  if (/\d\s?%/.test(back)) return "percent";
  if (MONTHS.test(back)) return "date";
  if (/\b\d+\s*(days?|weeks?|months?|years?)\b/i.test(back)) return "period";
  if (/\d/.test(back)) return "number";
  return "text";
}

const rank = (seed: string, key: string) => createHash("sha256").update(`${seed}|${key}`).digest("hex");
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9£%.]+/g, " ").trim();

/** Three wrong options for `card`, or null if there aren't enough believable ones (then show it as a flip card). */
export function distractors(card: QuizCard, pool: QuizCard[], seed = "capto"): string[] | null {
  const kind = answerKind(card.back);
  const course = card.lessonId.split("/")[0];
  const seen = new Set([norm(card.back)]);
  const candidates = pool
    .filter((c) => c.id !== card.id && answerKind(c.back) === kind)
    .filter((c) => {
      const n = norm(c.back);
      // Never offer a duplicate, or an answer that contains / is contained in the right one.
      if (seen.has(n) || n.includes(norm(card.back)) || norm(card.back).includes(n)) return false;
      seen.add(n);
      return true;
    })
    // Worded answers only make believable wrong options from the same course; figures can come from anywhere.
    .filter((c) => kind !== "text" || c.lessonId.split("/")[0] === course)
    .map((c) => ({
      back: c.back,
      // Same lesson first (related facts make the best wrong options), then same course, then similar length.
      score:
        (c.lessonId === card.lessonId ? 0 : c.lessonId.split("/")[0] === course ? 1 : 2) * 1000 +
        Math.abs(c.back.length - card.back.length) * 3 +
        parseInt(rank(seed, `${card.id}|${c.id}`).slice(0, 4), 16) / 655,
    }))
    .sort((a, b) => a.score - b.score);
  if (candidates.length < 3) return null;
  return candidates.slice(0, 3).map((c) => c.back);
}

/** The four options in a stable shuffled order, and which one is right. */
export function quizOptions(card: QuizCard, pool: QuizCard[], seed = "capto"): { options: string[]; answer: number } | null {
  const wrong = distractors(card, pool, seed);
  if (!wrong) return null;
  const options = [card.back, ...wrong].sort((a, b) => rank(seed, `${card.id}|o|${a}`).localeCompare(rank(seed, `${card.id}|o|${b}`)));
  return { options, answer: options.indexOf(card.back) };
}
