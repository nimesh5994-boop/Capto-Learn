/*
 * Skills check — a short starting assessment for new staff. One quiz question per level (Foundation,
 * Practitioner, Advanced) from each chosen subject, drawn from the lessons' own quizzes, so it costs nothing to run.
 * The result suggests where to start in each subject. Pure and unit-tested.
 */
import { createHash } from "node:crypto";

export type Level = "foundation" | "practitioner" | "advanced";
export const PLACEMENT_LEVELS: Level[] = ["foundation", "practitioner", "advanced"];

export interface PlacementPoolTrack {
  slug: string;
  lessons: { id: string; level: Level; questionIds: string[] }[];
}

export interface PlacementQuestion {
  track: string;
  level: Level;
  lessonId: string;
  questionId: string;
}

const rank = (seed: string, key: string) => createHash("sha256").update(`${seed}|${key}`).digest("hex");

/** The questions for a check: per subject, one per level, chosen pseudo-randomly but repeatably from `seed`. */
export function pickPlacement(pool: PlacementPoolTrack[], slugs: string[], seed: string): PlacementQuestion[] {
  const out: PlacementQuestion[] = [];
  for (const t of pool.filter((p) => slugs.includes(p.slug))) {
    for (const level of PLACEMENT_LEVELS) {
      const candidates = t.lessons.filter((l) => l.level === level).flatMap((l) => l.questionIds.map((q) => ({ lessonId: l.id, questionId: q })));
      if (!candidates.length) continue;
      const best = candidates.reduce((a, b) => (rank(seed, `${b.lessonId}#${b.questionId}`) < rank(seed, `${a.lessonId}#${a.questionId}`) ? b : a));
      out.push({ track: t.slug, level, ...best });
    }
  }
  return out;
}

export interface SubjectResult {
  right: number;
  total: number;
  /** Where to start: the first level answered wrongly, working up from Foundation. */
  start: Level;
  /** Every level answered correctly — could go straight to the advanced lessons. */
  strong: boolean;
}

export function placeSubject(answers: { level: Level; correct: boolean }[]): SubjectResult {
  const byLevel = new Map(answers.map((a) => [a.level, a.correct]));
  let start: Level = "foundation";
  let strong = true;
  for (const lv of PLACEMENT_LEVELS) {
    if (!byLevel.has(lv)) continue;
    start = lv;
    if (!byLevel.get(lv)) {
      strong = false;
      break;
    }
  }
  return { right: answers.filter((a) => a.correct).length, total: answers.length, start, strong };
}

/** Subjects in the order to tackle them: weakest first, then alphabetical. */
export function suggestedOrder(results: Record<string, SubjectResult>): string[] {
  return Object.keys(results).sort((a, b) => results[a].right / results[a].total - results[b].right / results[b].total || a.localeCompare(b));
}
