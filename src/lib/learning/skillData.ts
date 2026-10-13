import "server-only";
import { inArray, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { reviewItems, type LessonProgress } from "@/lib/db/schema";
import { tracks, trackLessons } from "@/content";
import { progressFor } from "./progress";
import { skillScore, type SkillScore } from "./skills";

export interface TrackSkill extends SkillScore {
  slug: string;
  title: string;
  icon: string;
  minutes: number;
  completedAt: Date | null;
}

/** Skill scores per subject for each user (Daily 5 recall blended in per subject). */
export async function skillsFor(userIds: string[]): Promise<{ progress: Map<string, Map<string, LessonProgress>>; skills: Map<string, TrackSkill[]> }> {
  const progress = await progressFor(userIds);
  const db = await getDb();
  const recallRows = userIds.length
    ? await db
        .select({
          userId: reviewItems.userId,
          track: sql<string>`split_part(${reviewItems.lessonId}, '/', 1)`,
          reviews: sql<number>`sum(${reviewItems.reviews})::int`,
          lapses: sql<number>`sum(${reviewItems.lapses})::int`,
        })
        .from(reviewItems)
        .where(inArray(reviewItems.userId, userIds))
        .groupBy(reviewItems.userId, sql`split_part(${reviewItems.lessonId}, '/', 1)`)
    : [];
  const recall = new Map(recallRows.map((r) => [`${r.userId}|${r.track}`, { right: Math.max(0, r.reviews - r.lapses), total: r.reviews }]));

  const skills = new Map<string, TrackSkill[]>();
  for (const uid of userIds) {
    const p = progress.get(uid) ?? new Map();
    skills.set(
      uid,
      tracks().map((t) => {
        const refs = trackLessons(t.slug);
        const s = skillScore(
          refs.map((r) => ({ level: r.lesson.level, completed: p.get(r.id)?.status === "completed", bestQuiz: p.get(r.id)?.bestQuizScore ?? null })),
          recall.get(`${uid}|${t.slug}`) ?? null
        );
        const completedDates = refs.map((r) => p.get(r.id)?.completedAt).filter((d): d is Date => !!d);
        return {
          ...s,
          slug: t.slug,
          title: t.title,
          icon: t.icon,
          minutes: refs.reduce((n, r) => n + r.lesson.minutes, 0),
          completedAt: s.done === s.total && completedDates.length ? new Date(Math.max(...completedDates.map((d) => d.getTime()))) : null,
        };
      })
    );
  }
  return { progress, skills };
}
