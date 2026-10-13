import "server-only";
import { and, eq, isNotNull, lte, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { lessonProgress, reviewItems } from "@/lib/db/schema";
import { getLesson } from "@/content";
import { dueDate, pickDaily } from "./schedule";

/*
 * Daily 5 — spaced review built from the quiz questions of lessons a learner has already taken.
 * No AI involved: the questions, answers and explanations come straight from the lessons.
 */

/** Adds a lesson's quiz questions to the learner's review deck (first review tomorrow). Idempotent. */
export async function seedReviewItems(organizationId: string, userId: string, lessonId: string, firstDue = dueDate(1)): Promise<void> {
  const ref = getLesson(lessonId);
  if (!ref?.lesson.quiz.length) return;
  const db = await getDb();
  await db
    .insert(reviewItems)
    .values(ref.lesson.quiz.map((q) => ({ organizationId, userId, lessonId, questionId: q.id, dueAt: firstDue })))
    .onConflictDoNothing();
}

/** Backfill for lessons quizzed before Daily 5 existed: due straight away so the learner has something today. */
async function backfill(organizationId: string, userId: string): Promise<void> {
  const db = await getDb();
  const quizzed = await db
    .select({ lessonId: lessonProgress.lessonId })
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), isNotNull(lessonProgress.lastQuizScore)));
  if (!quizzed.length) return;
  const have = await db.select({ lessonId: reviewItems.lessonId }).from(reviewItems).where(eq(reviewItems.userId, userId)).groupBy(reviewItems.lessonId);
  const seeded = new Set(have.map((h) => h.lessonId));
  for (const q of quizzed) if (!seeded.has(q.lessonId)) await seedReviewItems(organizationId, userId, q.lessonId, new Date());
}

export interface DailyCard {
  itemId: string;
  lessonId: string;
  lessonTitle: string;
  trackTitle: string;
  questionId: string;
  prompt: string;
  options: string[];
  box: number;
}

export async function dailyCards(organizationId: string, userId: string): Promise<{ cards: DailyCard[]; dueCount: number; deckSize: number }> {
  await backfill(organizationId, userId);
  const db = await getDb();
  const [due, [deck]] = await Promise.all([
    db.select().from(reviewItems).where(and(eq(reviewItems.userId, userId), lte(reviewItems.dueAt, new Date()))),
    db.select({ n: sql<number>`count(*)::int` }).from(reviewItems).where(eq(reviewItems.userId, userId)),
  ]);
  const usable = due.filter((d) => getLesson(d.lessonId)?.lesson.quiz.some((q) => q.id === d.questionId));
  const cards = pickDaily(usable).map((it) => {
    const ref = getLesson(it.lessonId)!;
    const q = ref.lesson.quiz.find((x) => x.id === it.questionId)!;
    return { itemId: it.id, lessonId: it.lessonId, lessonTitle: ref.lesson.title, trackTitle: ref.track.title, questionId: q.id, prompt: q.prompt, options: q.options, box: it.box };
  });
  return { cards, dueCount: usable.length, deckSize: deck?.n ?? 0 };
}

/** Number of review questions due now (for the dashboard / sidebar badge). Cheap: no backfill. */
export async function dueCount(userId: string): Promise<number> {
  const db = await getDb();
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(reviewItems).where(and(eq(reviewItems.userId, userId), lte(reviewItems.dueAt, new Date())));
  return r?.n ?? 0;
}
