import "server-only";
import { allLessons, type LessonRef } from "@/content";
import type { ContentReview } from "@/lib/db/schema";
import { effectiveReview, lessonSourceChanges, reviewRows, sourceChangedSinceReview, type EffectiveReview } from "./review";

export interface ReviewItem {
  ref: LessonRef;
  status: EffectiveReview;
  row: ContentReview | undefined;
  sourceChangedAt: Date | undefined;
  /** Signed off, but a cited source changed afterwards — needs a re-check. */
  stale: boolean;
  /** Anything a reviewer still has to act on. */
  todo: boolean;
}

/** Every lesson with its review state, in course reading order. */
export async function reviewState(): Promise<ReviewItem[]> {
  const [rows, changes] = await Promise.all([reviewRows(), lessonSourceChanges()]);
  return allLessons().map((ref) => {
    const row = rows.get(ref.id);
    const status = effectiveReview(ref.lesson, row);
    const stale = sourceChangedSinceReview(row, changes.get(ref.id));
    return { ref, status, row, sourceChangedAt: changes.get(ref.id), stale, todo: status !== "reviewed" || stale };
  });
}
