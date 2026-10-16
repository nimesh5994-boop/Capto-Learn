"use server";

import { retireLearned, retireLearnedFrom } from "@/lib/search/knowledge";

import { and, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { researchQueries, savedResearch } from "@/lib/db/schema";
import { authorize } from "@/lib/auth/dal";
import { retireForBadRating } from "@/lib/research/library";
import { cleanSavedFields, pinnedVersions } from "@/lib/research/saved";

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
    .select({ question: researchQueries.question, answer: researchQueries.answer })
    .from(researchQueries)
    .where(and(eq(researchQueries.id, queryId), eq(researchQueries.organizationId, ctx.org.id), or(eq(researchQueries.userId, ctx.user.id), eq(researchQueries.shared, true))));
  if (!q?.answer) return { ok: false, error: "Only answered questions can be saved." };
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
