import "server-only";
import { desc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { contentReviewEvents } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { LEVELS } from "@/content/types";
import { lessonHash } from "./review";

export interface RegisterRow {
  id: string;
  at: Date;
  lessonId: string;
  lesson: string;
  course: string;
  level: string;
  taxYear: string;
  decision: string;
  reviewer: string;
  notes: string;
  checklist: string[];
  version: string;
  /** False when the lesson has been edited since this decision. */
  current: boolean;
}

const DECISION = { reviewed: "Signed off", needs_changes: "Needs changes", draft: "Reset to draft" } as const;

/** Every review decision, newest first — the approvals register. */
export async function registerRows(limit = 5000): Promise<RegisterRow[]> {
  const db = await getDb();
  const events = await db.select().from(contentReviewEvents).orderBy(desc(contentReviewEvents.createdAt)).limit(limit);
  return events.map((e) => {
    const ref = getLesson(e.lessonId);
    return {
      id: e.id,
      at: e.createdAt,
      lessonId: e.lessonId,
      lesson: ref?.lesson.title ?? `${e.lessonId} (removed)`,
      course: ref?.track.title ?? "",
      level: ref ? LEVELS[ref.lesson.level].label : "",
      taxYear: ref?.lesson.taxYear ?? "",
      decision: DECISION[e.status],
      reviewer: e.reviewerName ?? "",
      notes: e.notes ?? "",
      checklist: e.checklist,
      version: e.contentHash.slice(0, 8),
      current: !!ref && lessonHash(ref.lesson) === e.contentHash,
    };
  });
}
