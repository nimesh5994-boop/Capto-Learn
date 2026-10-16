/*
 * Saved research: rules shared by the save actions, the Saved research page and the reports. Pure (no database).
 */
import type { ResearchAnswer } from "./types";

export const SAVED_LIMITS = { title: 160, reference: 120, note: 2000 } as const;

/** Trims and caps the learner's fields; a blank title falls back to the question. */
export function cleanSavedFields(question: string, f: { title?: string; reference?: string; note?: string }): { title: string; reference: string; note: string } {
  const one = (s: string | undefined, max: number) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, max);
  const fallback = question.replace(/\s+/g, " ").trim();
  return {
    title: one(f.title, SAVED_LIMITS.title) || (fallback.length > SAVED_LIMITS.title ? `${fallback.slice(0, SAVED_LIMITS.title - 1)}…` : fallback),
    reference: one(f.reference, SAVED_LIMITS.reference),
    note: (f.note ?? "").trim().slice(0, SAVED_LIMITS.note),
  };
}

/** The official sources' last-updated dates the answer was written against (lessons aren't versioned this way). */
export function pinnedVersions(answer: ResearchAnswer): Record<string, string | null> {
  return Object.fromEntries(answer.sources.filter((s) => s.kind !== "lesson").map((s) => [s.url, s.updatedAt ?? null]));
}

/**
 * Official pages that have changed since the answer was written: the knowledge base holds a newer date than the
 * one pinned. Pages we don't mirror, or pinned without a date, can't be judged and are left out.
 */
export function changedSince(pinned: Record<string, string | null>, current: Map<string, string | null>): string[] {
  return Object.entries(pinned)
    .filter(([url, was]) => {
      const now = current.get(url);
      return !!was && !!now && new Date(now).getTime() > new Date(was).getTime();
    })
    .map(([url]) => url);
}

/** Case-insensitive match on title, reference, note and question — the Saved research page's filter box. */
export function matchesSaved(q: string, s: { title: string; reference: string; note: string; question: string }): boolean {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = `${s.title} ${s.reference} ${s.note} ${s.question}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}
