/* Accuracy benchmark scoring. Pure, so it's unit-tested. */
import type { BenchmarkVerdict } from "@/lib/db/schema";

export interface BenchmarkScore {
  /** Active questions with at least one graded answer (latest graded answer counts). */
  graded: number;
  correct: number;
  partial: number;
  wrong: number;
  lastGraded: Date;
}

/**
 * Score = each active question's most recent graded result. Ungraded runs and retired questions don't count, so
 * re-running a question after a fix replaces its old grade once the new answer is graded.
 */
export function scoreBenchmark(results: { questionId: string; verdict: BenchmarkVerdict | null; gradedAt: Date | null }[], activeIds: Set<string>): BenchmarkScore | null {
  const latest = new Map<string, { verdict: BenchmarkVerdict; gradedAt: Date }>();
  for (const r of results) {
    if (!r.verdict || !r.gradedAt || !activeIds.has(r.questionId)) continue;
    const cur = latest.get(r.questionId);
    if (!cur || r.gradedAt > cur.gradedAt) latest.set(r.questionId, { verdict: r.verdict, gradedAt: r.gradedAt });
  }
  if (!latest.size) return null;
  const v = [...latest.values()];
  return {
    graded: v.length,
    correct: v.filter((x) => x.verdict === "correct").length,
    partial: v.filter((x) => x.verdict === "partial").length,
    wrong: v.filter((x) => x.verdict === "wrong").length,
    lastGraded: new Date(Math.max(...v.map((x) => x.gradedAt.getTime()))),
  };
}
