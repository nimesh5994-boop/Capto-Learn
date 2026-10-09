import "server-only";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { and, desc, eq, gt, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { answerLibrary, type LibraryEntry } from "@/lib/db/schema";
import { anthropic, type Meter } from "./ai";
import { govUkUpdatedAt } from "./govuk";
import { storedVersions } from "@/lib/kb/search";
import { isLibraryWorthy, LIBRARY_MAX_AGE_DAYS, shortlist, sourceChanged } from "./libraryRules";
import { MODELS } from "./pricing";
import type { ResearchAnswer } from "./types";

/*
 * The Answer Library bot. Before any paid research, it looks for an earlier verified answer in the same firm
 * that genuinely answers the new question, and only reuses it if every official source behind it is unchanged.
 */

const JudgeSchema = z.object({
  match: z.number().int().describe("Index of the earlier question that the earlier answer FULLY answers for the new question, or -1 if none does."),
  reason: z.string().describe("One short sentence."),
});

const JUDGE_SYSTEM = `You decide whether a saved answer to an earlier UK accounting/tax question can be reused for a new question.
Reuse only if the earlier answer would be complete and correct for the new question as asked. Say -1 (no match) if ANY of these differ in a way that could change the answer:
the type of entity (company, sole trader, partnership, individual, charity), the tax or the regime involved, the tax year or date,
amounts that cross a threshold, who is involved (employees vs clients vs directors, UK vs overseas), or if the new question asks for something extra.
Different wording of the same question IS a match. When unsure, answer -1.`;

export interface LibraryHit {
  entry: LibraryEntry;
  sourcesChecked: number;
}

export async function findLibraryAnswer(orgId: string, question: string, restated: string, meter: Meter): Promise<LibraryHit | null> {
  const db = await getDb();
  const since = new Date(Date.now() - LIBRARY_MAX_AGE_DAYS * 86_400_000);
  const entries = await db
    .select()
    .from(answerLibrary)
    .where(and(eq(answerLibrary.organizationId, orgId), isNull(answerLibrary.retiredAt), gt(answerLibrary.createdAt, since)))
    .orderBy(desc(answerLibrary.createdAt))
    .limit(400);
  const candidates = shortlist(question, restated, entries);
  if (!candidates.length) return null;

  const res = await anthropic().beta.messages.parse({
    model: MODELS.haiku,
    max_tokens: 400,
    output_config: { format: betaZodOutputFormat(JudgeSchema) },
    system: JUDGE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Today is ${new Date().toISOString().slice(0, 10)}.\n\nNEW QUESTION:\n${question}\n\nEARLIER QUESTIONS (each has a saved answer):\n${candidates
          .map((c, i) => `[${i}] (answered ${c.createdAt.toISOString().slice(0, 10)}${c.answer.taxYear ? `, tax year ${c.answer.taxYear}` : ""}) ${c.question}\n    Short answer given: ${c.answer.shortAnswer.slice(0, 400)}`)
          .join("\n\n")}`,
      },
    ],
  });
  meter.add(MODELS.haiku, res);
  const pick = res.parsed_output?.match ?? -1;
  const entry = candidates[pick];
  if (!entry) return null;

  // Every cited official page must be unchanged since the answer was written. Pages in the knowledge base are
  // checked against its synced copy (no network); anything not mirrored is checked live on GOV.UK.
  const urls = Object.keys(entry.sourceVersions);
  const stored = await storedVersions(urls);
  const current = await Promise.all(urls.map((u) => (stored.has(u) ? stored.get(u) : govUkUpdatedAt(u))));
  if (current.some((c) => c === undefined)) return null; // couldn't confirm — research fresh rather than risk it
  const changed = urls.filter((u, i) => sourceChanged(entry.sourceVersions[u], current[i] ?? null));
  if (changed.length) {
    await db.update(answerLibrary).set({ retiredAt: new Date(), retiredReason: `Source updated: ${changed[0]}` }).where(eq(answerLibrary.id, entry.id));
    return null;
  }
  await db.update(answerLibrary).set({ hits: sql`${answerLibrary.hits} + 1`, lastHitAt: new Date() }).where(eq(answerLibrary.id, entry.id));
  return { entry, sourcesChecked: urls.length };
}

/** Saves a fresh answer for future reuse, if it meets the quality bar. */
export async function saveToLibrary(orgId: string, queryId: string, question: string, restated: string, answer: ResearchAnswer): Promise<void> {
  if (!isLibraryWorthy(answer)) return;
  const sourceVersions = Object.fromEntries(answer.sources.filter((s) => s.kind === "official").map((s) => [s.url, s.updatedAt ?? null]));
  if (!Object.keys(sourceVersions).length) return;
  const db = await getDb();
  await db.insert(answerLibrary).values({ organizationId: orgId, question, restatedQuestion: restated, answer, sourceVersions, originQueryId: queryId });
}

/** A learner rated an answer unhelpful: stop reusing it (whether it was the original or a reuse of it). */
export async function retireForBadRating(orgId: string, queryId: string, reusedLibraryId: string | null | undefined): Promise<void> {
  const db = await getDb();
  const reason = "Rated unhelpful by a learner";
  await db
    .update(answerLibrary)
    .set({ retiredAt: new Date(), retiredReason: reason })
    .where(and(eq(answerLibrary.organizationId, orgId), isNull(answerLibrary.retiredAt), eq(answerLibrary.originQueryId, queryId)));
  if (reusedLibraryId)
    await db
      .update(answerLibrary)
      .set({ retiredAt: new Date(), retiredReason: reason })
      .where(and(eq(answerLibrary.organizationId, orgId), eq(answerLibrary.id, reusedLibraryId)));
}
