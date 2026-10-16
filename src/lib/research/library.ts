import "server-only";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { and, desc, eq, gt, isNull, or, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { answerLibrary, researchQueries, type LibraryEntry } from "@/lib/db/schema";
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

/** Haiku decides which (if any) earlier question's answer fully answers the new one. Returns the index, or -1. */
export async function judgeSameQuestion(
  question: string,
  candidates: { question: string; answeredOn: Date; taxYear: string | null; shortAnswer: string }[],
  meter: Meter
): Promise<number> {
  if (!candidates.length) return -1;
  const res = await anthropic().beta.messages.parse({
    model: MODELS.haiku,
    max_tokens: 400,
    output_config: { format: betaZodOutputFormat(JudgeSchema) },
    system: JUDGE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Today is ${new Date().toISOString().slice(0, 10)}.\n\nNEW QUESTION:\n${question}\n\nEARLIER QUESTIONS (each has a saved answer):\n${candidates
          .map((c, i) => `[${i}] (answered ${c.answeredOn.toISOString().slice(0, 10)}${c.taxYear ? `, tax year ${c.taxYear}` : ""}) ${c.question}\n    Short answer given: ${c.shortAnswer.slice(0, 400)}`)
          .join("\n\n")}`,
      },
    ],
  });
  meter.add(MODELS.haiku, res);
  return res.parsed_output?.match ?? -1;
}

/**
 * Whether every pinned source page is still at the version an answer was written from. Pages in the knowledge base
 * are checked against its synced copy (no network); anything not mirrored is checked live on GOV.UK.
 * Returns "unchanged", "unknown" (couldn't check), or the URL of the first changed page.
 */
export async function sourcesUnchanged(sourceVersions: Record<string, string | null>): Promise<"unchanged" | "unknown" | string> {
  const urls = Object.keys(sourceVersions);
  const stored = await storedVersions(urls);
  const current = await Promise.all(urls.map((u) => (stored.has(u) ? stored.get(u) : govUkUpdatedAt(u))));
  if (current.some((c) => c === undefined)) return "unknown";
  const changed = urls.find((u, i) => sourceChanged(sourceVersions[u], current[i] ?? null));
  return changed ?? "unchanged";
}

export interface LibraryHit {
  entry: LibraryEntry;
  sourcesChecked: number;
  /** Set when a firm reviewer approved the original answer (research register). */
  approved: { by: string; at: string } | null;
}

export async function findLibraryAnswer(orgId: string, question: string, restated: string, meter: Meter): Promise<LibraryHit | null> {
  const db = await getDb();
  const since = new Date(Date.now() - LIBRARY_MAX_AGE_DAYS * 86_400_000);
  const rows = await db
    .select({ entry: answerLibrary, reviewStatus: researchQueries.reviewStatus, reviewedByName: researchQueries.reviewedByName, reviewedAt: researchQueries.reviewedAt })
    .from(answerLibrary)
    .leftJoin(researchQueries, eq(researchQueries.id, answerLibrary.originQueryId))
    // Never reuse an answer a reviewer asked to change.
    .where(and(eq(answerLibrary.organizationId, orgId), isNull(answerLibrary.retiredAt), gt(answerLibrary.createdAt, since), or(isNull(researchQueries.reviewStatus), eq(researchQueries.reviewStatus, "approved"))))
    .orderBy(desc(answerLibrary.createdAt))
    .limit(400);
  // Firm-approved answers go first, so the shortlist (and the same-question check) prefers them.
  const review = new Map(rows.map((r) => [r.entry.id, r]));
  const entries = [...rows].sort((a, b) => Number(b.reviewStatus === "approved") - Number(a.reviewStatus === "approved")).map((r) => r.entry);
  const candidates = shortlist(question, restated, entries);
  if (!candidates.length) return null;

  const pick = await judgeSameQuestion(
    question,
    candidates.map((c) => ({ question: c.question, answeredOn: c.createdAt, taxYear: c.answer.taxYear, shortAnswer: c.answer.shortAnswer })),
    meter
  );
  const entry = candidates[pick];
  if (!entry) return null;

  // Every cited official page must be unchanged since the answer was written.
  const check = await sourcesUnchanged(entry.sourceVersions);
  if (check === "unknown") return null; // couldn't confirm — research fresh rather than risk it
  if (check !== "unchanged") {
    await db.update(answerLibrary).set({ retiredAt: new Date(), retiredReason: `Source updated: ${check}` }).where(eq(answerLibrary.id, entry.id));
    return null;
  }
  const urls = Object.keys(entry.sourceVersions);
  await db.update(answerLibrary).set({ hits: sql`${answerLibrary.hits} + 1`, lastHitAt: new Date() }).where(eq(answerLibrary.id, entry.id));
  const r = review.get(entry.id);
  return { entry, sourcesChecked: urls.length, approved: r?.reviewStatus === "approved" && r.reviewedByName ? { by: r.reviewedByName, at: (r.reviewedAt ?? new Date()).toISOString() } : null };
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
