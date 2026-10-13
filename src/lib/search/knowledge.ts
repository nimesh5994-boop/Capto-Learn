import "server-only";
import { and, eq, isNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { botKnowledge } from "@/lib/db/schema";
import { storedVersions } from "@/lib/kb/search";
import { sourceChanged } from "@/lib/research/libraryRules";
import type { ResearchAnswer } from "@/lib/research/types";
import { canLearn, inConceptTerms, SAME_QUESTION, similarity } from "./learnRules";
import type { Understanding } from "./understand";

/*
 * The bot's own knowledge: verified Ask Capto answers it has learned, served again at Level 1 with no AI.
 * Learning and recall both run only on general questions (no client figures) with the same topic and intent.
 */

/** Rate, deadline and penalty questions only match their own kind; the rest are compared on meaning alone. */
const FACT_KINDS = new Set(["rate", "deadline", "penalty"]);
const sameKind = (a: string, b: string) => (FACT_KINDS.has(a) || FACT_KINDS.has(b) ? a === b : true);

/** Compares two questions in the bot's own terms (every way of naming the recognised concepts → one token). */
function alike(u: Understanding, a: string, b: string): number {
  const names = u.concepts.flatMap((c) => [c.name, ...c.aliases].map((alias) => ({ alias, concept: c.name })));
  return similarity(inConceptTerms(a, names), inConceptTerms(b, names));
}

/** After Level 2/3 answers: keep it if it's safe to reuse. Never throws. */
export async function learnFromAnswer(question: string, u: Understanding, answer: ResearchAnswer, researchQueryId: string): Promise<void> {
  try {
    const concept = u.concepts[0]?.name;
    if (!concept || !canLearn(question, answer)) return;
    const db = await getDb();
    const existing = await db.select({ question: botKnowledge.question, intent: botKnowledge.intent }).from(botKnowledge).where(and(eq(botKnowledge.concept, concept), isNull(botKnowledge.retiredAt)));
    if (existing.some((e) => sameKind(e.intent, u.intent) && alike(u, e.question, question) >= 0.8)) return; // already knows this one
    const sourceVersions = Object.fromEntries(answer.sources.filter((s) => s.kind === "official").map((s) => [s.url, s.updatedAt ?? null]));
    await db.insert(botKnowledge).values({ concept, intent: u.intent, question: question.slice(0, 500), answer, sourceVersions, researchQueryId });
  } catch (err) {
    console.error("[bot] learn", err);
  }
}

/** Level 1: a learned answer to the same question, if its official sources haven't changed since. Free. */
export async function recallLearned(question: string, u: Understanding): Promise<{ id: string; answer: ResearchAnswer; learnedAt: Date } | null> {
  const concept = u.concepts[0]?.name;
  if (!concept) return null;
  try {
    const db = await getDb();
    const rows = (await db.select().from(botKnowledge).where(and(eq(botKnowledge.concept, concept), isNull(botKnowledge.retiredAt)))).filter((r) => sameKind(r.intent, u.intent));
    const best = rows.map((r) => ({ r, s: alike(u, question, r.question) })).sort((a, b) => b.s - a.s)[0];
    if (!best || best.s < SAME_QUESTION) return null;
    // The sources must be unchanged in Capto's synced copy of the guidance (a free database check).
    const urls = Object.keys(best.r.sourceVersions);
    const now = await storedVersions(urls);
    // A source no longer in the synced copy (removed, or only ever fetched live) can't be checked: don't reuse.
    const changed = urls.find((url) => !now.has(url) || sourceChanged(best.r.sourceVersions[url], now.get(url) ?? null));
    if (changed) {
      await db.update(botKnowledge).set({ retiredAt: new Date(), retiredReason: `Source changed: ${changed}` }).where(eq(botKnowledge.id, best.r.id));
      return null;
    }
    await db.update(botKnowledge).set({ uses: sql`${botKnowledge.uses} + 1` }).where(eq(botKnowledge.id, best.r.id));
    return { id: best.r.id, answer: best.r.answer, learnedAt: best.r.createdAt };
  } catch (err) {
    console.error("[bot] recall", err);
    return null;
  }
}

export async function retireLearned(id: string, reason: string): Promise<void> {
  const db = await getDb();
  await db.update(botKnowledge).set({ retiredAt: new Date(), retiredReason: reason }).where(eq(botKnowledge.id, id));
}

/** Forget anything learned from a particular Ask Capto answer (e.g. after it was rated unhelpful). */
export async function retireLearnedFrom(researchQueryId: string): Promise<void> {
  const db = await getDb();
  await db.update(botKnowledge).set({ retiredAt: new Date(), retiredReason: "Original answer rated unhelpful" }).where(and(eq(botKnowledge.researchQueryId, researchQueryId), isNull(botKnowledge.retiredAt)));
}
