"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/lib/db/client";
import { benchmarkQuestions, benchmarkResults, researchQueries } from "@/lib/db/schema";
import { AccessError, authorizePlatform } from "@/lib/auth/dal";
import { runResearch, type ResearchEvent } from "@/lib/research/engine";
import { getTrack } from "@/content";

export type BenchmarkActionResult = { ok: true; message: string } | { ok: false; error: string };

async function guard(fn: () => Promise<string>): Promise<BenchmarkActionResult> {
  try {
    const message = await fn();
    revalidatePath("/platform/benchmark");
    revalidatePath("/editorial");
    return { ok: true, message };
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

const QuestionSchema = z.object({
  question: z.string().trim().min(15, { error: "Write the question as a practitioner would ask it, with the key facts." }).max(2000),
  modelAnswer: z.string().trim().min(20, { error: "Give the model answer the grader will mark against." }).max(6000),
  area: z.string().refine((s) => !!getTrack(s), { error: "Choose the course area." }),
});

/** A qualified reviewer adds a benchmark question and its model answer. */
export async function addBenchmarkQuestion(input: { question: string; modelAnswer: string; area: string }): Promise<BenchmarkActionResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.content.review");
    const p = QuestionSchema.safeParse(input);
    if (!p.success) throw new AccessError(p.error.issues[0]?.message ?? "Check the question.");
    const db = await getDb();
    await db.insert(benchmarkQuestions).values({ ...p.data, createdByName: ctx.user.name });
    return "Question added to the benchmark.";
  });
}

export async function setBenchmarkActive(id: string, active: boolean): Promise<BenchmarkActionResult> {
  return guard(async () => {
    await authorizePlatform("platform.content.review");
    const db = await getDb();
    await db.update(benchmarkQuestions).set({ active }).where(eq(benchmarkQuestions.id, id));
    return active ? "Question restored." : "Question retired from the benchmark.";
  });
}

/**
 * Puts one benchmark question to Ask Capto exactly as a firm would (fresh research, no answer reuse) and stores
 * the answer for grading. Costs one research question (a few pence).
 */
export async function runBenchmarkQuestion(id: string): Promise<BenchmarkActionResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.content.review");
    const db = await getDb();
    const [q] = await db.select().from(benchmarkQuestions).where(eq(benchmarkQuestions.id, id));
    if (!q) throw new AccessError("Unknown question.");
    const started = Date.now();
    let final: ResearchEvent | null = null;
    for await (const e of runResearch(q.question, { professional: false, organizationId: ctx.org.id, fresh: true, tier: "auto" })) if (e.type !== "stage") final = e;
    const usage = final && "usage" in final ? final.usage : { input: 0, output: 0, micros: 0 };
    const [row] = await db
      .insert(researchQueries)
      .values({
        organizationId: ctx.org.id,
        userId: ctx.user.id,
        question: q.question,
        status: final?.type === "done" ? "answered" : final?.type === "no_sources" ? "no_sources" : "failed",
        answer: final?.type === "done" ? final.answer : null,
        error: final?.type === "no_sources" || final?.type === "error" ? final.message : null,
        inputTokens: usage.input,
        outputTokens: usage.output,
        costMicros: usage.micros,
        route: final?.type === "done" ? final.route : null,
        durationMs: Date.now() - started,
      })
      .returning({ id: researchQueries.id });
    await db.insert(benchmarkResults).values({ questionId: q.id, queryId: row.id });
    if (final?.type !== "done") return "Ask Capto couldn't answer this one — grade it as wrong, or check the question.";
    return "Answered — now grade it against the model answer.";
  });
}

const GradeSchema = z.object({ verdict: z.enum(["correct", "partial", "wrong"]), note: z.string().trim().max(2000).optional() });

/** A qualified reviewer grades Ask Capto's answer against the model answer. */
export async function gradeBenchmarkResult(resultId: string, input: { verdict: string; note?: string }): Promise<BenchmarkActionResult> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.content.review");
    const p = GradeSchema.safeParse(input);
    if (!p.success) throw new AccessError("Choose correct, partly correct or wrong.");
    const credentials = ctx.user.qualifications?.trim();
    if (!credentials) throw new AccessError("Add your professional qualifications under My account → Profile before grading.");
    if (p.data.verdict !== "correct" && !p.data.note) throw new AccessError("Say what was wrong or missing.");
    const db = await getDb();
    await db
      .update(benchmarkResults)
      .set({ verdict: p.data.verdict, note: p.data.note || null, gradedByName: ctx.user.name, gradedByCredentials: credentials, gradedAt: new Date() })
      .where(eq(benchmarkResults.id, resultId));
    return "Grade saved.";
  });
}
