"use server";

import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { authorize } from "@/lib/auth/dal";

/** A learner's thumbs up / down on an answer — feeds the platform's quality review. */
export async function rateAnswer(id: string, helpful: boolean, note?: string): Promise<void> {
  const ctx = await authorize("research.use");
  const db = await getDb();
  await db
    .update(researchQueries)
    .set({ helpful, feedbackNote: note?.trim().slice(0, 2000) || null })
    .where(and(eq(researchQueries.id, id), eq(researchQueries.organizationId, ctx.org.id), eq(researchQueries.userId, ctx.user.id)));
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
