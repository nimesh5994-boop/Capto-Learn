import "server-only";
import { desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { skillChecks, type SkillCheck } from "@/lib/db/schema";
import { getLesson, tracks, trackLessons } from "@/content";
import { renderInline, renderMarkdown } from "@/lib/markdown";
import { adaptiveNext, AREAS, type AskedAnswer, type NextQuestion, type PlacementPoolTrack } from "./placement";

export const placementPool = (): PlacementPoolTrack[] =>
  tracks().map((t) => ({ slug: t.slug, lessons: trackLessons(t.slug).map((r) => ({ id: r.id, level: r.lesson.level, questionIds: r.lesson.quiz.map((q) => q.id) })) }));

export const validSlugs = (slugs: string[]) => tracks().filter((t) => slugs.includes(t.slug)).map((t) => t.slug);

/** The subjects for an area preset (in course order), or a custom list. */
export function subjectsFor(area: string | null, custom: string[] = []): string[] {
  const a = AREAS.find((x) => x.key === area);
  if (a) return a.tracks.length ? validSlugs(a.tracks) : tracks().map((t) => t.slug);
  return validSlugs(custom);
}

/** Seed and rotation history: a new attempt gets a new seed, and questions from earlier checks are skipped. */
async function history(userId: string): Promise<{ seed: string; seen: Set<string> }> {
  const db = await getDb();
  const rows = await db.select({ asked: skillChecks.asked }).from(skillChecks).where(eq(skillChecks.userId, userId));
  return { seed: `${userId}|${rows.length}`, seen: new Set(rows.flatMap((r) => r.asked)) };
}

export interface QuestionView {
  key: string;
  track: string;
  level: NextQuestion["level"];
  promptHtml: string;
  optionsHtml: string[];
}

const view = (q: NextQuestion): QuestionView => {
  const quiz = getLesson(q.lessonId)!.lesson.quiz.find((x) => x.id === q.questionId)!;
  return { key: q.key, track: q.track, level: q.level, promptHtml: renderMarkdown(quiz.prompt), optionsHtml: quiz.options.map((o) => renderInline(o)) };
};

/**
 * Replays the answers given so far (each must be the question the check actually asked at that point), marks
 * them on the server, and works out the next question. Stateless: the browser only ever holds question keys
 * and its own choices, never the answers.
 */
export async function replay(userId: string, slugs: string[], given: { key: string; choice: number }[]): Promise<{ answered: AskedAnswer[]; next: QuestionView | null; outOfStep: boolean }> {
  const pool = placementPool();
  const { seed, seen } = await history(userId);
  const answered: AskedAnswer[] = [];
  for (const g of given) {
    const expected = adaptiveNext(pool, slugs, seed, answered, seen);
    if (!expected || expected.key !== g.key) return { answered, next: expected ? view(expected) : null, outOfStep: true };
    const quiz = getLesson(expected.lessonId)!.lesson.quiz.find((x) => x.id === expected.questionId)!;
    answered.push({ key: expected.key, track: expected.track, level: expected.level, correct: g.choice === quiz.answer });
  }
  const next = adaptiveNext(pool, slugs, seed, answered, seen);
  return { answered, next: next ? view(next) : null, outOfStep: false };
}

export async function latestSkillChecks(userIds: string[]): Promise<Map<string, SkillCheck>> {
  if (!userIds.length) return new Map();
  const db = await getDb();
  const rows = await db.select().from(skillChecks).where(inArray(skillChecks.userId, userIds)).orderBy(desc(skillChecks.completedAt));
  const out = new Map<string, SkillCheck>();
  for (const r of rows) if (!out.has(r.userId)) out.set(r.userId, r);
  return out;
}

export async function skillCheckCount(userId: string): Promise<number> {
  const db = await getDb();
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(skillChecks).where(eq(skillChecks.userId, userId));
  return r?.n ?? 0;
}

/** True when the person's last check is older than the firm's retake interval (or they've never taken one). */
export function retakeDue(last: SkillCheck | undefined, months: number, now = new Date()): boolean {
  if (!last) return true;
  const due = new Date(last.completedAt);
  due.setMonth(due.getMonth() + months);
  return now >= due;
}
