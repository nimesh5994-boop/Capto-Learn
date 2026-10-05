import "server-only";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { assignments, lessonProgress, type Assignment, type LessonProgress } from "@/lib/db/schema";
import { lessonsForTarget, targetTitle, tracks, trackLessons } from "@/content";

export async function progressFor(userIds: string[]): Promise<Map<string, Map<string, LessonProgress>>> {
  const out = new Map<string, Map<string, LessonProgress>>(userIds.map((u) => [u, new Map()]));
  if (!userIds.length) return out;
  const db = await getDb();
  const rows = await db.select().from(lessonProgress).where(inArray(lessonProgress.userId, userIds));
  for (const r of rows) out.get(r.userId)?.set(r.lessonId, r);
  return out;
}

export async function myProgress(userId: string): Promise<Map<string, LessonProgress>> {
  return (await progressFor([userId])).get(userId)!;
}

export function trackStats(slug: string, progress: Map<string, LessonProgress>) {
  const lessons = trackLessons(slug);
  const done = lessons.filter((l) => progress.get(l.id)?.status === "completed").length;
  const started = lessons.filter((l) => progress.has(l.id)).length;
  return { total: lessons.length, done, started, pct: lessons.length ? Math.round((done / lessons.length) * 100) : 0 };
}

export function overallStats(progress: Map<string, LessonProgress>) {
  const total = tracks().reduce((n, t) => n + trackLessons(t.slug).length, 0);
  const done = [...progress.values()].filter((p) => p.status === "completed").length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

export interface AssignmentView {
  a: Assignment;
  title: string;
  total: number;
  done: number;
  complete: boolean;
  overdue: boolean;
}

export function viewAssignment(a: Assignment, progress: Map<string, LessonProgress>): AssignmentView {
  const lessons = lessonsForTarget(a.targetType, a.targetId);
  const done = lessons.filter((l) => progress.get(l.id)?.status === "completed").length;
  const complete = lessons.length > 0 && done === lessons.length;
  return { a, title: targetTitle(a.targetType, a.targetId), total: lessons.length, done, complete, overdue: !complete && !!a.dueDate && a.dueDate.getTime() < Date.now() };
}

export async function openAssignments(organizationId: string, userIds?: string[]): Promise<Assignment[]> {
  const db = await getDb();
  const where = [eq(assignments.organizationId, organizationId), isNull(assignments.cancelledAt)];
  if (userIds) where.push(inArray(assignments.userId, userIds));
  return db.select().from(assignments).where(and(...where));
}
