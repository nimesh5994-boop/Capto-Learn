import "server-only";
import { desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { skillChecks, type SkillCheck } from "@/lib/db/schema";
import { getLesson, tracks, trackLessons } from "@/content";
import { pickPlacement, type PlacementPoolTrack, type PlacementQuestion } from "./placement";

export const placementPool = (): PlacementPoolTrack[] =>
  tracks().map((t) => ({ slug: t.slug, lessons: trackLessons(t.slug).map((r) => ({ id: r.id, level: r.lesson.level, questionIds: r.lesson.quiz.map((q) => q.id) })) }));

/** A retake gets different questions: the seed includes how many checks the person has already done. */
async function seedFor(userId: string): Promise<string> {
  const db = await getDb();
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(skillChecks).where(eq(skillChecks.userId, userId));
  return `${userId}|${r?.n ?? 0}`;
}

export const validSlugs = (slugs: string[]) => slugs.filter((s) => tracks().some((t) => t.slug === s));

export async function checkQuestions(userId: string, slugs: string[]): Promise<(PlacementQuestion & { prompt: string; options: string[]; answer: number })[]> {
  return pickPlacement(placementPool(), validSlugs(slugs), await seedFor(userId)).map((q) => {
    const quiz = getLesson(q.lessonId)!.lesson.quiz.find((x) => x.id === q.questionId)!;
    return { ...q, prompt: quiz.prompt, options: quiz.options, answer: quiz.answer };
  });
}

export async function latestSkillChecks(userIds: string[]): Promise<Map<string, SkillCheck>> {
  if (!userIds.length) return new Map();
  const db = await getDb();
  const rows = await db.select().from(skillChecks).where(inArray(skillChecks.userId, userIds)).orderBy(desc(skillChecks.completedAt));
  const out = new Map<string, SkillCheck>();
  for (const r of rows) if (!out.has(r.userId)) out.set(r.userId, r);
  return out;
}
