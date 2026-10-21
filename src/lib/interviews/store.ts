import "server-only";
import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { and, eq, gte, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { interviewTests, organizations, type InterviewTest } from "@/lib/db/schema";
import { sendBuiltEmail } from "@/lib/email";
import { interviewReceiptEmail } from "@/lib/emailContent";
import { firmBrandOf } from "@/lib/notify";
import { getLesson, tracks, trackLessons } from "@/content";
import { DECLARATION, hashSecret, markInterview, pickInterviewQuestions, type IntegrityEvent, type PoolTrack } from "./rules";

/* Interview tests: storage and the candidate's session. The candidate has no account — the link (or code)
 * identifies the test, and a cookie set on start ties it to that one device. */

const COOKIE = "capto_iv";
const GRACE_MS = 15_000; // network slack after the deadline
const MAX_EVENTS = 400;

export const pool = (): PoolTrack[] =>
  tracks().map((t) => ({ slug: t.slug, lessons: trackLessons(t.slug).map((r) => ({ id: r.id, level: r.lesson.level, questionIds: r.lesson.quiz.map((q) => q.id) })) }));

const quizOf = (lessonId: string, questionId: string) => getLesson(lessonId)?.lesson.quiz.find((q) => q.id === questionId);

/** A test by its link token or its short code (XXXX-XXXX). */
export async function findByKey(key: string): Promise<InterviewTest | null> {
  const db = await getDb();
  const code = key.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const where = /^[A-Z0-9]{8}$/.test(code) && key.length <= 9 ? eq(interviewTests.code, `${code.slice(0, 4)}-${code.slice(4)}`) : eq(interviewTests.tokenHash, hashSecret(key));
  const [row] = await db.select().from(interviewTests).where(where);
  return row ? settle(row) : null;
}

/** Closes a started test whose time is up (marking what was answered), so every reader sees the final state. */
export async function settle(row: InterviewTest): Promise<InterviewTest> {
  if (row.status === "started" && row.deadlineAt && Date.now() > row.deadlineAt.getTime() + GRACE_MS) return finish(row, [{ t: new Date().toISOString(), type: "time-up" }]);
  return row;
}

export type CandidateView = "invalid" | "expired" | "revoked" | "other-device" | "intro" | "test" | "done";

/** What the candidate should see for this test on this device. */
export async function candidateView(row: InterviewTest | null): Promise<CandidateView> {
  if (!row) return "invalid";
  if (row.status === "revoked") return "revoked";
  if (row.status === "completed") return (await ownsSession(row)) ? "done" : "invalid";
  if (row.status === "started") return (await ownsSession(row)) ? "test" : "other-device";
  return row.expiresAt.getTime() < Date.now() ? "expired" : "intro";
}

export async function ownsSession(row: InterviewTest): Promise<boolean> {
  const c = (await cookies()).get(COOKIE)?.value ?? "";
  const [id, secret] = c.split(".");
  return id === row.id && !!secret && !!row.sessionHash && hashSecret(secret) === row.sessionHash;
}

export async function start(row: InterviewTest, name: string): Promise<void> {
  const secret = randomBytes(24).toString("base64url");
  const h = await headers();
  const now = new Date();
  const questions = pickInterviewQuestions(pool(), row.tracks, row.questionCount, row.difficulty, row.id);
  const db = await getDb();
  const [updated] = await db
    .update(interviewTests)
    .set({
      status: "started",
      sessionHash: hashSecret(secret),
      startedAt: now,
      deadlineAt: new Date(now.getTime() + row.minutes * 60_000),
      questions,
      declaration: { name, at: now.toISOString(), ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() || null, userAgent: h.get("user-agent"), statements: DECLARATION },
      events: [{ t: now.toISOString(), type: "started" }],
    })
    .where(and(eq(interviewTests.id, row.id), eq(interviewTests.status, "ready")))
    .returning({ id: interviewTests.id });
  if (!updated) throw new Error("already started");
  (await cookies()).set(COOKIE, `${row.id}.${secret}`, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/interview", maxAge: (row.minutes + 60) * 60 });
}

/** The question the candidate is on (first unanswered), without the answer key. */
export function nextQuestion(row: InterviewTest): { index: number; key: string; prompt: string; options: string[]; track: string } | null {
  const index = row.questions.findIndex((q) => !row.answers[`${q.lessonId}#${q.questionId}`]);
  if (index < 0) return null;
  const q = row.questions[index];
  const quiz = quizOf(q.lessonId, q.questionId);
  return quiz ? { index, key: `${q.lessonId}#${q.questionId}`, prompt: quiz.prompt, options: quiz.options, track: q.track } : null;
}

const clean = (events: IntegrityEvent[]) =>
  events
    .filter((e) => typeof e?.type === "string" && /^[a-z-]{2,30}$/.test(e.type))
    .slice(0, 50)
    .map((e) => ({ t: new Date().toISOString(), type: e.type, ...(typeof e.ms === "number" && e.ms >= 0 && e.ms < 86_400_000 ? { ms: Math.round(e.ms) } : {}) }));

/** Saves one answer (and any events since the last save). Only the device that started, and only in time. */
export async function answer(row: InterviewTest, key: string, choice: number, events: IntegrityEvent[]): Promise<"ok" | "time-up" | "denied"> {
  if (row.status !== "started" || !(await ownsSession(row))) return "denied";
  if (row.deadlineAt && Date.now() > row.deadlineAt.getTime() + GRACE_MS) {
    await finish(row, [...clean(events), { t: new Date().toISOString(), type: "time-up" }]);
    return "time-up";
  }
  if (!row.questions.some((q) => `${q.lessonId}#${q.questionId}` === key) || row.answers[key]) return "denied";
  const db = await getDb();
  // Append in the database (not read-modify-write), so quick successive saves can't overwrite each other.
  await db
    .update(interviewTests)
    .set({
      answers: sql`${interviewTests.answers} || ${JSON.stringify({ [key]: { choice, at: new Date().toISOString() } })}::jsonb`,
      events: sql`${interviewTests.events} || ${JSON.stringify(clean(events))}::jsonb`,
    })
    .where(and(eq(interviewTests.id, row.id), eq(interviewTests.status, "started"), sql`not (${interviewTests.answers} ? ${key})`));
  return "ok";
}

export async function logEvents(row: InterviewTest, events: IntegrityEvent[]): Promise<void> {
  if (row.status !== "started" || !(await ownsSession(row)) || row.events.length >= MAX_EVENTS) return;
  const db = await getDb();
  await db
    .update(interviewTests)
    .set({ events: sql`${interviewTests.events} || ${JSON.stringify(clean(events))}::jsonb` })
    .where(and(eq(interviewTests.id, row.id), eq(interviewTests.status, "started")));
}

/** Marks and closes the test. */
export async function finish(row: InterviewTest, events: IntegrityEvent[]): Promise<InterviewTest> {
  const marked = markInterview(row.questions, row.answers, (q) => quizOf(q.lessonId, q.questionId)?.answer);
  const db = await getDb();
  const [done] = await db
    .update(interviewTests)
    .set({ status: "completed", completedAt: new Date(), score: marked.score, events: [...row.events, ...events, { t: new Date().toISOString(), type: "finished" }].slice(-MAX_EVENTS) })
    .where(and(eq(interviewTests.id, row.id), eq(interviewTests.status, "started")))
    .returning();
  // Only the call that actually closed the test sends the receipt, so it goes once (no score — that's the firm's).
  if (done?.candidateEmail) await sendReceipt(done);
  return done ?? row;
}

async function sendReceipt(t: InterviewTest) {
  try {
    const db = await getDb();
    const [org] = await db.select({ name: organizations.name, brandColor: organizations.brandColor }).from(organizations).where(eq(organizations.id, t.organizationId));
    if (!org || !t.candidateEmail) return;
    await sendBuiltEmail({
      to: t.candidateEmail,
      email: interviewReceiptEmail({ firm: firmBrandOf(org), candidateName: t.declaration?.name ?? t.candidateName }),
      fromName: org.name,
      log: { kind: "interview", organizationId: t.organizationId, relatedId: t.id },
    });
  } catch (err) {
    console.error("[interview receipt]", err instanceof Error ? err.message : err);
  }
}

/** Tests a firm has created this calendar month (for the plan allowance). */
export async function interviewsThisMonth(organizationId: string): Promise<number> {
  const db = await getDb();
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(interviewTests).where(and(eq(interviewTests.organizationId, organizationId), gte(interviewTests.createdAt, monthStart)));
  return r?.n ?? 0;
}

export { quizOf };
