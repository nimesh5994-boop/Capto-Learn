"use server";

import { retireLearned, retireLearnedFrom } from "@/lib/search/knowledge";

import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { answerLibrary, researchQueries, savedResearch, type ResearchReviewStatus } from "@/lib/db/schema";
import { audit, actorOf } from "@/lib/audit";
import { authorize } from "@/lib/auth/dal";
import { retireForBadRating } from "@/lib/research/library";
import { cleanSavedFields, pinnedVersions } from "@/lib/research/saved";
import { canViewAnswer } from "@/lib/research/register";

/** A learner's thumbs up / down on an answer — feeds the platform's quality review. */
export async function rateAnswer(id: string, helpful: boolean, note?: string): Promise<void> {
  const ctx = await authorize("research.use");
  const db = await getDb();
  const [row] = await db
    .update(researchQueries)
    .set({ helpful, feedbackNote: note?.trim().slice(0, 2000) || null })
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.userId, ctx.user.id)))
    .returning({ answer: researchQueries.answer });
  // An unhelpful answer must never be served again from the answer library.
  if (row && !helpful) await retireForBadRating(ctx.org.id, id, row.answer?.reuse?.libraryId);
  // …and the question bot forgets anything it learned from (or served as) this answer.
  if (row && !helpful) {
    if (row.answer?.learned?.id) await retireLearned(row.answer.learned.id, "Rated unhelpful");
    await retireLearnedFrom(id);
  }
}

/** Shares an answer with everyone in the firm (it then appears in the firm's library). */
export async function setAnswerShared(id: string, shared: boolean): Promise<void> {
  const ctx = await authorize("research.use");
  const db = await getDb();
  await db
    .update(researchQueries)
    .set({ shared })
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.userId, ctx.user.id)));
}

export type SavedFields = { title?: string; reference?: string; note?: string };

/**
 * Saves an answer to the learner's Saved research (or updates the title, reference and note if it's already
 * saved). Any answer the learner can open can be saved: their own, or one shared in their firm.
 */
export async function saveAnswer(queryId: string, fields: SavedFields): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const ctx = await authorize("research.use");
  const db = await getDb();
  const [q] = await db
    .select()
    .from(researchQueries)
    .where(and(eq(researchQueries.id, queryId), eq(researchQueries.organizationId, ctx.org.id)));
  if (!q?.answer || !canViewAnswer(q, { orgId: ctx.org.id, userId: ctx.user.id, canRegister: ctx.can("research.register") })) return { ok: false, error: "Only answered questions can be saved." };
  const f = cleanSavedFields(q.question, fields);
  const [row] = await db
    .insert(savedResearch)
    .values({ organizationId: ctx.org.id, userId: ctx.user.id, queryId, ...f, sourceVersions: pinnedVersions(q.answer) })
    .onConflictDoUpdate({ target: [savedResearch.userId, savedResearch.queryId], set: { ...f, updatedAt: new Date() } })
    .returning({ id: savedResearch.id });
  revalidatePath("/ask/saved");
  return { ok: true, id: row.id };
}

/** Removes an answer from the learner's Saved research (the answer itself stays in their history). */
export async function unsaveAnswer(queryId: string): Promise<void> {
  const ctx = await authorize("research.use");
  const db = await getDb();
  await db.delete(savedResearch).where(and(eq(savedResearch.queryId, queryId), eq(savedResearch.userId, ctx.user.id)));
  revalidatePath("/ask/saved");
}

const CHANGES_REASON = "Reviewer asked for changes";

/**
 * Records a reviewer's decision in the research register. Approved answers become visible to everyone in the
 * firm and are preferred by the reuse bot; "needs changes" takes the answer out of reuse straight away.
 */
export async function reviewAnswer(queryId: string, status: ResearchReviewStatus | null, note?: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const ctx = await authorize("research.register", { write: true });
  const db = await getDb();
  const clean = (note ?? "").trim().slice(0, 2000) || null;
  if (status === "changes" && !clean) return { ok: false, error: "Say what needs changing, so the person who asked can follow it up." };
  const [row] = await db
    .update(researchQueries)
    .set(status ? { reviewStatus: status, reviewedById: ctx.user.id, reviewedByName: ctx.user.name, reviewedAt: new Date(), reviewNote: clean } : { reviewStatus: null, reviewedById: null, reviewedByName: null, reviewedAt: null, reviewNote: null })
    .where(and(eq(researchQueries.id, queryId), eq(researchQueries.organizationId, ctx.org.id)))
    .returning({ question: researchQueries.question, answer: researchQueries.answer });
  if (!row?.answer) return { ok: false, error: "Only answered questions can be reviewed." };

  if (status === "changes") {
    await db
      .update(answerLibrary)
      .set({ retiredAt: new Date(), retiredReason: CHANGES_REASON })
      .where(and(eq(answerLibrary.organizationId, ctx.org.id), eq(answerLibrary.originQueryId, queryId), isNull(answerLibrary.retiredAt)));
  } else {
    // Approving (or clearing) undoes only a retirement the review itself caused — never a source change.
    await db
      .update(answerLibrary)
      .set({ retiredAt: null, retiredReason: null })
      .where(and(eq(answerLibrary.organizationId, ctx.org.id), eq(answerLibrary.originQueryId, queryId), eq(answerLibrary.retiredReason, CHANGES_REASON)));
  }
  const what = status === "approved" ? "Approved" : status === "changes" ? "Asked for changes to" : "Cleared the review of";
  await audit(actorOf(ctx), "research.reviewed", `${what} the Ask Capto answer "${row.question.slice(0, 120)}"${clean ? `: ${clean.slice(0, 200)}` : ""}`, { type: "research_query", id: queryId });
  revalidatePath(`/ask/${queryId}`);
  revalidatePath("/ask/register");
  return { ok: true };
}
