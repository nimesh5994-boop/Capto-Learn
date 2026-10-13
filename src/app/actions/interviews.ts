"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { interviewTests } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { actorOf, audit } from "@/lib/audit";
import { interviewLimit } from "@/lib/plans";
import { tracks } from "@/content";
import { DECLARATION, hashSecret, newCredentials, type IntegrityEvent } from "@/lib/interviews/rules";
import { answer, findByKey, finish, interviewsThisMonth, logEvents, ownsSession, start } from "@/lib/interviews/store";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };
async function guard<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

/* ───────────── Firm side ───────────── */

const CreateSchema = z.object({
  candidateName: z.string().trim().min(2, { error: "Enter the candidate's name." }).max(120),
  candidateEmail: z.union([z.email({ error: "That email doesn't look right." }), z.literal("")]).optional(),
  role: z.string().trim().max(120).optional(),
  tracks: z.array(z.string()).min(1, { error: "Choose at least one subject." }).max(15),
  difficulty: z.enum(["trainee", "experienced", "senior"]),
  questionCount: z.coerce.number().int().min(5, { error: "At least 5 questions." }).max(60, { error: "At most 60 questions." }),
  minutes: z.coerce.number().int().min(5, { error: "At least 5 minutes." }).max(180, { error: "At most 3 hours." }),
  validDays: z.coerce.number().int().min(1).max(30),
});

export async function createInterview(input: z.input<typeof CreateSchema>): Promise<Result<{ id: string; token: string; code: string }>> {
  return guard(async () => {
    const ctx = await authorize("interviews.manage", { write: true });
    const parsed = CreateSchema.safeParse(input);
    if (!parsed.success) throw new AccessError(parsed.error.issues[0]?.message ?? "Check the details.");
    const known = new Set(tracks().map((t) => t.slug));
    const chosen = parsed.data.tracks.filter((t) => known.has(t));
    if (!chosen.length) throw new AccessError("Choose at least one subject.");
    const limit = interviewLimit(ctx.org);
    if (limit === 0) throw new AccessError("Interview tests aren't included in your plan — see Plan & billing.");
    if (limit !== null && (await interviewsThisMonth(ctx.org.id)) >= limit) throw new AccessError(`Your plan includes ${limit} interview tests a month, and they've all been used. See Plan & billing to add more.`);
    const { token, code } = newCredentials();
    const db = await getDb();
    const [row] = await db
      .insert(interviewTests)
      .values({
        organizationId: ctx.org.id,
        createdById: ctx.user.id,
        createdByName: ctx.user.name,
        candidateName: parsed.data.candidateName,
        candidateEmail: parsed.data.candidateEmail || null,
        role: parsed.data.role || null,
        tracks: chosen,
        difficulty: parsed.data.difficulty,
        questionCount: parsed.data.questionCount,
        minutes: parsed.data.minutes,
        tokenHash: hashSecret(token),
        code,
        expiresAt: new Date(Date.now() + parsed.data.validDays * 86_400_000),
      })
      .returning({ id: interviewTests.id });
    await audit(actorOf(ctx), "interview.created", `Created an interview test for ${parsed.data.candidateName}`, { type: "interview", id: row.id });
    revalidatePath("/team/interviews");
    return { id: row.id, token, code };
  });
}

/** A fresh link for a test that hasn't started (the old link stops working; the code stays the same). */
export async function newInterviewLink(id: string): Promise<Result<{ token: string }>> {
  return guard(async () => {
    const ctx = await authorize("interviews.manage", { write: true });
    const { token } = newCredentials();
    const db = await getDb();
    const [row] = await db
      .update(interviewTests)
      .set({ tokenHash: hashSecret(token) })
      .where(and(eq(interviewTests.id, id), eq(interviewTests.organizationId, ctx.org.id), eq(interviewTests.status, "ready")))
      .returning({ id: interviewTests.id });
    if (!row) throw new AccessError("Only a test that hasn't started can get a new link.");
    return { token };
  });
}

export async function revokeInterview(id: string): Promise<Result<null>> {
  return guard(async () => {
    const ctx = await authorize("interviews.manage", { write: true });
    const db = await getDb();
    const [row] = await db
      .update(interviewTests)
      .set({ status: "revoked" })
      .where(and(eq(interviewTests.id, id), eq(interviewTests.organizationId, ctx.org.id), eq(interviewTests.status, "ready")))
      .returning({ name: interviewTests.candidateName });
    if (!row) throw new AccessError("Only a test that hasn't started can be withdrawn.");
    await audit(actorOf(ctx), "interview.revoked", `Withdrew the interview test for ${row.name}`, { type: "interview", id });
    revalidatePath("/team/interviews");
    return null;
  });
}

/* ───────────── Candidate side (no account: the link or code is the key) ───────────── */

const Events = z.array(z.object({ type: z.string().max(30), ms: z.number().optional(), t: z.string().optional() })).max(50);

export async function startInterview(key: string, name: string, agreed: boolean[]): Promise<Result<null>> {
  return guard(async () => {
    const row = await findByKey(key);
    if (!row || row.status !== "ready" || row.expiresAt.getTime() < Date.now()) throw new AccessError("This test link isn't available any more. Contact the firm that sent it.");
    const n = name.trim();
    if (n.length < 3 || n.length > 120) throw new AccessError("Type your full name to sign the declaration.");
    if (agreed.length !== DECLARATION.length || !agreed.every(Boolean)) throw new AccessError("Please confirm every statement to start.");
    try {
      await start(row, n);
    } catch {
      throw new AccessError("This test has already been started.");
    }
    return null;
  });
}

export async function answerInterview(key: string, questionKey: string, choice: number, events: IntegrityEvent[]): Promise<Result<"ok" | "time-up">> {
  return guard(async () => {
    const row = await findByKey(key);
    const ev = Events.safeParse(events);
    if (!row || !Number.isInteger(choice) || choice < -1 || choice > 10 || !ev.success) throw new AccessError("Couldn't save that answer.");
    const r = await answer(row, questionKey, choice, ev.data as IntegrityEvent[]);
    if (r === "denied") throw new AccessError("This test can't be continued here.");
    return r;
  });
}

export async function logInterviewEvents(key: string, events: IntegrityEvent[]): Promise<void> {
  const row = await findByKey(key);
  const ev = Events.safeParse(events);
  if (row && ev.success) await logEvents(row, ev.data as IntegrityEvent[]);
}

export async function finishInterview(key: string, events: IntegrityEvent[]): Promise<Result<null>> {
  return guard(async () => {
    const row = await findByKey(key);
    const ev = Events.safeParse(events);
    if (!row || row.status !== "started" || !ev.success || !(await ownsSession(row))) throw new AccessError("This test can't be finished here.");
    await logEvents(row, ev.data as IntegrityEvent[]);
    const fresh = await findByKey(key);
    if (fresh?.status === "started") await finish(fresh, []);
    return null;
  });
}
