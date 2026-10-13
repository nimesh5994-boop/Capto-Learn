/*
 * Spaced-repetition scheduling for Daily 5 (Leitner boxes). Pure and unit-tested.
 * Box 1 → tomorrow, then 3, 7, 16 and 35 days. A wrong answer goes back to box 1.
 */

export const BOX_INTERVAL_DAYS = [1, 3, 7, 16, 35] as const;
export const MAX_BOX = BOX_INTERVAL_DAYS.length;
export const DAILY_COUNT = 5;

export function nextBox(box: number, correct: boolean): number {
  return correct ? Math.min(MAX_BOX, box + 1) : 1;
}

/** Due date for a card now in `box`, at 04:00 UTC so a "day" doesn't depend on the minute you answered. */
export function dueDate(box: number, now = new Date()): Date {
  const days = BOX_INTERVAL_DAYS[Math.max(1, Math.min(MAX_BOX, box)) - 1];
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + days, 4));
  return d;
}

/**
 * Today's set: overdue first (oldest due first), at most one question per lesson so the five feel varied,
 * topped up from the same lessons if there aren't five different ones.
 */
export function pickDaily<T extends { lessonId: string; dueAt: Date }>(due: T[], count = DAILY_COUNT): T[] {
  const sorted = [...due].sort((a, b) => a.dueAt.getTime() - b.dueAt.getTime());
  const picked: T[] = [];
  const lessons = new Set<string>();
  for (const it of sorted)
    if (picked.length < count && !lessons.has(it.lessonId)) {
      picked.push(it);
      lessons.add(it.lessonId);
    }
  for (const it of sorted) if (picked.length < count && !picked.includes(it)) picked.push(it);
  return picked;
}
