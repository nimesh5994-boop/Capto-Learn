import "server-only";
import { createHash } from "node:crypto";
import { getDb } from "@/lib/db/client";
import { contentReviews, type ContentReview } from "@/lib/db/schema";
import type { Lesson } from "@/content/types";

/** "changed" = it was reviewed, but the lesson content has been edited since, so the sign-off no longer applies. */
export type EffectiveReview = "draft" | "reviewed" | "changed" | "needs_changes";

export function lessonHash(lesson: Lesson): string {
  return createHash("sha256").update(JSON.stringify(lesson)).digest("hex").slice(0, 32);
}

export function effectiveReview(lesson: Lesson, row: ContentReview | undefined): EffectiveReview {
  if (!row) return "draft";
  if (row.status === "reviewed") return row.contentHash === lessonHash(lesson) ? "reviewed" : "changed";
  return row.status;
}

export async function reviewRows(): Promise<Map<string, ContentReview>> {
  const db = await getDb();
  const rows = await db.select().from(contentReviews);
  return new Map(rows.map((r) => [r.lessonId, r]));
}

export const REVIEW_LABELS: Record<EffectiveReview, string> = {
  draft: "AI draft — not yet reviewed",
  reviewed: "Technically reviewed",
  changed: "Edited since review",
  needs_changes: "Under correction",
};

/**
 * Latest date on which a page cited by each lesson changed (from the knowledge-base sync log). Used to flag lessons
 * whose official sources moved on — especially ones already signed off.
 */
export async function lessonSourceChanges(): Promise<Map<string, Date>> {
  const { kbSyncRuns } = await import("@/lib/db/schema");
  const { desc } = await import("drizzle-orm");
  const db = await getDb();
  const runs = await db.select({ at: kbSyncRuns.startedAt, lessons: kbSyncRuns.lessonsAffected }).from(kbSyncRuns).orderBy(desc(kbSyncRuns.startedAt)).limit(200);
  const out = new Map<string, Date>();
  for (const r of runs) for (const id of r.lessons) if (!out.has(id)) out.set(id, r.at);
  return out;
}

/** A signed-off lesson whose cited guidance changed after the sign-off. */
export function sourceChangedSinceReview(row: ContentReview | undefined, changedAt: Date | undefined): boolean {
  return !!row && row.status === "reviewed" && !!row.reviewedAt && !!changedAt && changedAt > row.reviewedAt;
}
