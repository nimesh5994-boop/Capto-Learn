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
