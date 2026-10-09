import { tokenize } from "./passages";
import type { ResearchAnswer } from "./types";

/*
 * Answer-library rules. Pure, so they're unit-tested.
 *
 * Only well-evidenced answers enter the library, and a library answer is only offered for reuse after
 * (1) a keyword shortlist, (2) a cheap model confirming it's genuinely the same question, and (3) a live
 * check that none of its official sources has changed since it was written.
 */

/** Library entries older than this are never reused, even if their sources look unchanged. */
export const LIBRARY_MAX_AGE_DAYS = 180;

/** An answer is reusable only when it is confident and essentially every point is quote-verified. */
export function isLibraryWorthy(a: ResearchAnswer): boolean {
  if (a.confidence === "low" || a.reuse) return false;
  if (!a.points.length || !a.sources.length) return false;
  const verified = a.points.filter((p) => p.verified).length;
  return verified / a.points.length >= 0.85;
}

export interface Candidate {
  id: string;
  question: string;
  restatedQuestion: string;
}

/** Crude stemmer so "parties"/"party", "claims"/"claim", "employees"/"employee" compare equal. */
function stem(t: string): string {
  return t.replace(/ies$/, "y").replace(/(ss)$/, "$1").replace(/(?<=[a-z]{3})s$/, "");
}

function terms(s: string): Set<string> {
  return new Set(tokenize(s).filter((t) => !/^\d+$/.test(t)).map(stem));
}

/** Share of the smaller question's key terms that the other question also uses (0–1). */
export function termOverlap(a: string, b: string): number {
  const A = terms(a);
  const B = terms(b);
  if (!A.size || !B.size) return 0;
  let shared = 0;
  for (const t of A) if (B.has(t)) shared++;
  return shared / Math.min(A.size, B.size);
}

/**
 * Free shortlist before the (paid) same-question check. Compares the new question's planner restatement —
 * which puts every question into HMRC's vocabulary — with each saved question and its restatement.
 * Works the same with 3 saved answers or 3,000 (no corpus statistics).
 */
export function shortlist<T extends Candidate>(question: string, restated: string, entries: T[], max = 4, minOverlap = 0.3): T[] {
  return entries
    .map((e) => ({ e, score: Math.max(termOverlap(restated, e.restatedQuestion), termOverlap(question, e.question), termOverlap(restated, e.question)) }))
    .filter((x) => x.score >= minOverlap)
    .sort((x, y) => y.score - x.score)
    .slice(0, max)
    .map((x) => x.e);
}

/** The page's last-updated date has moved on since the answer pinned it → the answer may be out of date. */
export function sourceChanged(pinned: string | null, current: string | null): boolean {
  if (!current) return false; // can't tell (page gone or no date) — handled by the caller as "couldn't check"
  if (!pinned) return true; // we didn't know the version when answering; be safe
  return new Date(current).getTime() > new Date(pinned).getTime();
}
