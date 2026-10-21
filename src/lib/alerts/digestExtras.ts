import "server-only";
import { and, eq, gte, inArray, isNotNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { kbSyncRuns, lessonFeedback, users } from "@/lib/db/schema";
import { allLessons, getLesson, lessonsForTarget, targetTitle } from "@/content";
import { openAssignments, progressFor } from "@/lib/learning/progress";
import { reviewRows } from "@/lib/learning/review";
import { DIGEST_OVERDUE_CAP, type Digest } from "./digestRules";

/** A firm's overdue, unfinished assignments for active people, most overdue first — the managers' section. */
export async function teamOverdue(orgId: string, now = new Date()): Promise<{ items: NonNullable<Digest["overdueTeam"]>; total: number }> {
  const open = (await openAssignments(orgId)).filter((a) => a.dueDate && a.dueDate.getTime() < now.getTime());
  if (!open.length) return { items: [], total: 0 };
  const db = await getDb();
  const people = await db
    .select({ id: users.id, name: users.name })
    .from(users)
    .where(and(eq(users.organizationId, orgId), eq(users.status, "active"), inArray(users.id, [...new Set(open.map((a) => a.userId))])));
  const names = new Map(people.map((p) => [p.id, p.name]));
  const progress = await progressFor([...names.keys()]);
  const overdue = open
    .filter((a) => names.has(a.userId))
    .filter((a) => {
      const lessons = lessonsForTarget(a.targetType, a.targetId);
      const p = progress.get(a.userId) ?? new Map();
      return !(lessons.length > 0 && lessons.every((l) => p.get(l.id)?.status === "completed"));
    })
    .sort((x, y) => x.dueDate!.getTime() - y.dueDate!.getTime());
  return {
    total: overdue.length,
    items: overdue.slice(0, DIGEST_OVERDUE_CAP).map((a) => ({ person: names.get(a.userId)!, title: targetTitle(a.targetType, a.targetId), dueDate: a.dueDate!.toISOString() })),
  };
}

/** The reviewer section: lessons whose cited sources changed since `since`, new learner reports, lessons never reviewed. */
export async function reviewerUpdate(since: Date): Promise<NonNullable<Digest["reviewer"]>> {
  const db = await getDb();
  const [runs, reports, reviews] = await Promise.all([
    db.select({ lessons: kbSyncRuns.lessonsAffected }).from(kbSyncRuns).where(and(isNotNull(kbSyncRuns.finishedAt), gte(kbSyncRuns.finishedAt, since))),
    db
      .select({ id: lessonFeedback.id })
      .from(lessonFeedback)
      .where(and(gte(lessonFeedback.createdAt, since), eq(lessonFeedback.status, "open"), inArray(lessonFeedback.kind, ["error", "out_of_date"]))),
    reviewRows(),
  ]);
  const sourceChanged = [...new Set(runs.flatMap((r) => r.lessons))]
    .map((id) => getLesson(id))
    .filter((l): l is NonNullable<typeof l> => !!l)
    .map((l) => ({ id: l.id, title: l.lesson.title, trackTitle: l.track.title }));
  const awaitingReview = allLessons().filter((l) => {
    const r = reviews.get(l.id);
    return !r || (r.status === "draft" && !r.reviewedAt);
  }).length;
  return { sourceChanged, newReports: reports.length, awaitingReview };
}
