"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { exerciseAttempts, lessonFeedback, lessonProgress } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { getLesson } from "@/content";
import { mark, quizScore, QUIZ_PASS_MARK, type ExerciseResponse, type MarkResult } from "@/lib/learning/marking";
import { seedReviewItems } from "@/lib/learning/daily";
import { dueDate, nextBox } from "@/lib/learning/schedule";
import { reviewItems, skillChecks } from "@/lib/db/schema";
import { replay, subjectsFor, type QuestionView } from "@/lib/learning/skillCheck";
import { placeAdaptive, type AskedAnswer } from "@/lib/learning/placement";
import { renderMarkdown } from "@/lib/markdown";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

async function guard<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

const JournalLineSchema = z.object({ account: z.string().max(200), dr: z.number().finite().nonnegative().optional(), cr: z.number().finite().nonnegative().optional() });
const ResponseSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("mcq"), choice: z.number().int() }),
  z.object({ kind: z.literal("multi"), choices: z.array(z.number().int()).max(20) }),
  z.object({ kind: z.literal("numeric"), value: z.number().finite() }),
  z.object({ kind: z.literal("journal"), lines: z.array(JournalLineSchema).max(20) }),
  z.object({ kind: z.literal("classify"), choices: z.array(z.number().int()).max(50) }),
]);

async function ensureProgress(orgId: string, userId: string, lessonId: string, trackSlug: string) {
  const db = await getDb();
  await db.insert(lessonProgress).values({ organizationId: orgId, userId, lessonId, trackSlug }).onConflictDoNothing();
}

/** Records that a learner opened a lesson (first visit only). Called from the lesson page. */
export async function markLessonStarted(lessonId: string): Promise<void> {
  const ref = getLesson(lessonId);
  if (!ref) return;
  try {
    const ctx = await authorize("learning.view", { write: true });
    await ensureProgress(ctx.org.id, ctx.user.id, lessonId, ref.track.slug);
  } catch (err) {
    if (!(err instanceof AccessError)) throw err;
  }
}

export interface ExerciseFeedback {
  correct: boolean;
  detail: MarkResult["detail"];
  reveal: MarkResult["reveal"];
  explainHtml: string;
  workingHtml: string | null;
}

export async function submitExercise(lessonId: string, exerciseId: string, response: ExerciseResponse): Promise<Result<ExerciseFeedback>> {
  return guard(async () => {
    const ctx = await authorize("learning.view", { write: true });
    const ref = getLesson(lessonId);
    const ex = ref?.lesson.exercises.find((e) => e.id === exerciseId);
    if (!ref || !ex) throw new AccessError("That exercise no longer exists — reload the page.");
    const parsed = ResponseSchema.safeParse(response);
    if (!parsed.success) throw new AccessError("Couldn't read your answer — please try again.");
    const result = mark(ex, parsed.data);
    const db = await getDb();
    await ensureProgress(ctx.org.id, ctx.user.id, lessonId, ref.track.slug);
    await db.insert(exerciseAttempts).values({ organizationId: ctx.org.id, userId: ctx.user.id, lessonId, exerciseId, correct: result.correct, response: parsed.data });
    if (result.correct)
      await db
        .update(lessonProgress)
        .set({
          exercisesCorrect: sql`(select coalesce(jsonb_agg(distinct v), '[]'::jsonb) from jsonb_array_elements_text(${lessonProgress.exercisesCorrect} || ${JSON.stringify([exerciseId])}::jsonb) as v)`,
          updatedAt: new Date(),
        })
        .where(and(eq(lessonProgress.userId, ctx.user.id), eq(lessonProgress.lessonId, lessonId)));
    return {
      correct: result.correct,
      detail: result.detail,
      reveal: result.reveal,
      explainHtml: renderMarkdown(result.explain),
      workingHtml: result.working ? renderMarkdown(result.working) : null,
    };
  });
}

export interface QuizResult {
  score: number;
  passed: boolean;
  questions: { correct: boolean; answer: number; explainHtml: string }[];
}

export async function submitQuiz(lessonId: string, answers: number[]): Promise<Result<QuizResult>> {
  return guard(async () => {
    const ctx = await authorize("learning.view", { write: true });
    const ref = getLesson(lessonId);
    if (!ref) throw new AccessError("That lesson no longer exists.");
    const parsed = z.array(z.number().int()).max(20).safeParse(answers);
    if (!parsed.success) throw new AccessError("Couldn't read your answers.");
    const key = ref.lesson.quiz.map((q) => q.answer);
    const score = quizScore(parsed.data, key);
    const passed = score >= QUIZ_PASS_MARK;
    const db = await getDb();
    await ensureProgress(ctx.org.id, ctx.user.id, lessonId, ref.track.slug);
    await db
      .update(lessonProgress)
      .set({
        lastQuizScore: score,
        bestQuizScore: sql`greatest(coalesce(${lessonProgress.bestQuizScore}, 0), ${score})`,
        quizAttempts: sql`${lessonProgress.quizAttempts} + 1`,
        ...(passed ? { status: "completed" as const, completedAt: sql`coalesce(${lessonProgress.completedAt}, now())` } : {}),
        updatedAt: new Date(),
      })
      .where(and(eq(lessonProgress.userId, ctx.user.id), eq(lessonProgress.lessonId, lessonId)));
    await db.insert(exerciseAttempts).values(
      ref.lesson.quiz.map((q, i) => ({ organizationId: ctx.org.id, userId: ctx.user.id, lessonId, exerciseId: q.id, correct: parsed.data[i] === q.answer, response: { kind: "mcq", choice: parsed.data[i] ?? null } }))
    );
    // Add this lesson's questions to the learner's Daily 5 review deck.
    await seedReviewItems(ctx.org.id, ctx.user.id, lessonId).catch((err) => console.error("[daily5] seed", err));
    revalidatePath("/learn", "layout");
    revalidatePath("/");
    return { score, passed, questions: ref.lesson.quiz.map((q, i) => ({ correct: parsed.data[i] === q.answer, answer: q.answer, explainHtml: renderMarkdown(q.explain) })) };
  });
}

const FeedbackSchema = z.object({
  kind: z.enum(["error", "out_of_date", "unclear", "suggestion"]),
  message: z.string().trim().min(5, { error: "Tell us a bit more (at least a few words)." }).max(3000),
});

export interface ReviewResult {
  correct: boolean;
  answer: number;
  explainHtml: string;
  nextInDays: number;
}

/** Marks one Daily 5 card and reschedules it (right: up a box; wrong: back to tomorrow). */
export async function submitReview(itemId: string, choice: number): Promise<Result<ReviewResult>> {
  return guard(async () => {
    const ctx = await authorize("learning.view", { write: true });
    const parsed = z.object({ itemId: z.uuid(), choice: z.number().int() }).safeParse({ itemId, choice });
    if (!parsed.success) throw new AccessError("Couldn't read your answer.");
    const db = await getDb();
    const [item] = await db.select().from(reviewItems).where(and(eq(reviewItems.id, parsed.data.itemId), eq(reviewItems.userId, ctx.user.id)));
    if (!item) throw new AccessError("That review card no longer exists.");
    const q = getLesson(item.lessonId)?.lesson.quiz.find((x) => x.id === item.questionId);
    if (!q) throw new AccessError("That question no longer exists.");
    const correct = parsed.data.choice === q.answer;
    const box = nextBox(item.box, correct);
    const due = dueDate(box);
    await db
      .update(reviewItems)
      .set({ box, dueAt: due, reviews: sql`${reviewItems.reviews} + 1`, lapses: correct ? item.lapses : sql`${reviewItems.lapses} + 1`, lastReviewedAt: new Date() })
      .where(eq(reviewItems.id, item.id));
    await db.insert(exerciseAttempts).values({ organizationId: ctx.org.id, userId: ctx.user.id, lessonId: item.lessonId, exerciseId: q.id, correct, response: { kind: "mcq", choice: parsed.data.choice, via: "daily5" } });
    return { correct, answer: q.answer, explainHtml: renderMarkdown(q.explain), nextInDays: Math.round((due.getTime() - Date.now()) / 86_400_000) };
  });
}

export async function reportLessonProblem(lessonId: string, input: { kind: string; message: string }): Promise<Result<null>> {
  return guard(async () => {
    const ctx = await authorize("learning.view");
    if (!getLesson(lessonId)) throw new AccessError("That lesson no longer exists.");
    const parsed = FeedbackSchema.safeParse(input);
    if (!parsed.success) throw new AccessError(parsed.error.issues[0]?.message ?? "Check your message.");
    const db = await getDb();
    await db.insert(lessonFeedback).values({ organizationId: ctx.org.id, userId: ctx.user.id, lessonId, ...parsed.data });
    return null;
  });
}

const CheckSchema = z.object({
  area: z.string().max(40).nullable(),
  subjects: z.array(z.string().max(60)).max(30),
  answers: z.array(z.object({ key: z.string().max(200), choice: z.number().int() })).max(120),
});

export interface SkillCheckStep {
  next: QuestionView | null;
  answered: number;
  subjects: number;
}

/** The next question in an adaptive skills check, given the answers so far (marked on the server, never sent back). */
export async function skillCheckStep(input: z.input<typeof CheckSchema>): Promise<Result<SkillCheckStep>> {
  return guard(async () => {
    const ctx = await authorize("learning.view", { write: true });
    const parsed = CheckSchema.safeParse(input);
    if (!parsed.success) throw new AccessError("Couldn't read your answers.");
    const slugs = subjectsFor(parsed.data.area, parsed.data.subjects);
    if (!slugs.length) throw new AccessError("Choose an area or at least one subject.");
    const r = await replay(ctx.user.id, slugs, parsed.data.answers);
    if (r.outOfStep) throw new AccessError("This skills check got out of step — please start it again.");
    return { next: r.next, answered: r.answered.length, subjects: slugs.length };
  });
}

/** Finishes a skills check (all subjects settled, or the time limit reached) and saves the starting points. */
export async function finishSkillCheck(input: z.input<typeof CheckSchema> & { seconds: number; timedOut: boolean }): Promise<Result<{ id: string }>> {
  return guard(async () => {
    const ctx = await authorize("learning.view", { write: true });
    const parsed = CheckSchema.safeParse(input);
    if (!parsed.success) throw new AccessError("Couldn't read your answers.");
    const slugs = subjectsFor(parsed.data.area, parsed.data.subjects);
    const r = await replay(ctx.user.id, slugs, parsed.data.answers);
    if (r.outOfStep) throw new AccessError("This skills check got out of step — please start it again.");
    if (!r.answered.length) throw new AccessError("Answer at least one question first.");
    const bySubject = new Map<string, AskedAnswer[]>();
    for (const a of r.answered) bySubject.set(a.track, [...(bySubject.get(a.track) ?? []), a]);
    const results = Object.fromEntries([...bySubject].map(([slug, a]) => [slug, placeAdaptive(a)]));
    const db = await getDb();
    const [row] = await db
      .insert(skillChecks)
      .values({
        organizationId: ctx.org.id,
        userId: ctx.user.id,
        results,
        area: parsed.data.area,
        asked: r.answered.map((a) => a.key),
        notReached: slugs.filter((s) => !bySubject.has(s)),
        timedOut: input.timedOut === true,
        durationSeconds: Math.max(0, Math.min(24 * 3600, Math.round(Number(input.seconds) || 0))),
      })
      .returning({ id: skillChecks.id });
    revalidatePath("/");
    return { id: row.id };
  });
}
