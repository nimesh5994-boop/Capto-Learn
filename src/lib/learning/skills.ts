/*
 * Skill score per subject (0–100), shown to learners and managers. Pure and unit-tested. Deliberately simple
 * so it's easy to explain:
 *   coverage 60% — share of the subject's lessons completed (quiz passed)
 *   accuracy 40% — average best quiz score on lessons taken, nudged by Daily 5 recall where there is any
 * Level reached = the highest level whose lessons are all complete.
 */

export type Level = "foundation" | "practitioner" | "advanced";
const ORDER: Level[] = ["foundation", "practitioner", "advanced"];

export interface LessonState {
  level: Level;
  completed: boolean;
  bestQuiz: number | null;
}

export interface SkillScore {
  score: number;
  coverage: number;
  accuracy: number | null;
  done: number;
  total: number;
  levelReached: Level | null;
}

export function skillScore(lessons: LessonState[], recall: { right: number; total: number } | null = null): SkillScore {
  const total = lessons.length;
  const done = lessons.filter((l) => l.completed).length;
  const coverage = total ? done / total : 0;
  const quizzes = lessons.map((l) => l.bestQuiz).filter((q): q is number => q !== null);
  let accuracy: number | null = quizzes.length ? quizzes.reduce((a, b) => a + b, 0) / quizzes.length / 100 : null;
  if (accuracy !== null && recall && recall.total >= 5) accuracy = accuracy * 0.7 + (recall.right / recall.total) * 0.3;
  const score = Math.round(100 * (0.6 * coverage + 0.4 * (accuracy ?? 0)));
  let levelReached: Level | null = null;
  for (const lv of ORDER) {
    const inLevel = lessons.filter((l) => l.level === lv);
    if (inLevel.length && inLevel.every((l) => l.completed)) levelReached = lv;
    else break;
  }
  return { score, coverage, accuracy, done, total, levelReached };
}

/** Words a manager or learner can read at a glance. */
export function skillBand(score: number): "Not started" | "Getting started" | "Developing" | "Competent" | "Strong" {
  if (score === 0) return "Not started";
  if (score < 30) return "Getting started";
  if (score < 60) return "Developing";
  if (score < 85) return "Competent";
  return "Strong";
}
