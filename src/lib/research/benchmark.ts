import "server-only";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { benchmarkQuestions, benchmarkResults } from "@/lib/db/schema";
import { scoreBenchmark, type BenchmarkScore } from "./benchmarkRules";

/** The published benchmark score (editorial page), or null before anything has been graded. */
export async function latestBenchmark(): Promise<BenchmarkScore | null> {
  const db = await getDb();
  const [questions, results] = await Promise.all([
    db.select({ id: benchmarkQuestions.id }).from(benchmarkQuestions).where(eq(benchmarkQuestions.active, true)),
    db.select({ questionId: benchmarkResults.questionId, verdict: benchmarkResults.verdict, gradedAt: benchmarkResults.gradedAt }).from(benchmarkResults).orderBy(desc(benchmarkResults.createdAt)),
  ]);
  return scoreBenchmark(results, new Set(questions.map((q) => q.id)));
}
