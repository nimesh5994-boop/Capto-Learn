import "server-only";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { botAliases, botEvents } from "@/lib/db/schema";
import type { InstantAnswer } from "./instant";
import type { TaughtAlias, Understanding } from "./understand";

/* The learning loop: what the question bot made of each free search, how people rated it, and wording
 * reviewers have taught it. Logging never blocks or breaks a search. */

let taughtCache: { at: number; rows: TaughtAlias[] } | null = null;
const TAUGHT_TTL_MS = 5 * 60_000;

/** Reviewer-taught wording, cached for a few minutes so searches don't wait on the database. */
export async function taughtAliases(): Promise<TaughtAlias[]> {
  if (taughtCache && Date.now() - taughtCache.at < TAUGHT_TTL_MS) return taughtCache.rows;
  try {
    const db = await getDb();
    const rows = await db.select({ alias: botAliases.alias, concept: botAliases.concept }).from(botAliases).orderBy(desc(botAliases.createdAt));
    taughtCache = { at: Date.now(), rows };
    return rows;
  } catch (err) {
    console.error("[bot] taught aliases", err);
    return taughtCache?.rows ?? [];
  }
}

export const forgetTaughtCache = () => {
  taughtCache = null;
};

export async function logBotEvent(e: { id: string; organizationId: string; userId: string; question: string; u: Understanding; instant: InstantAnswer | null }): Promise<void> {
  try {
    const db = await getDb();
    await db.insert(botEvents).values({
      id: e.id,
      organizationId: e.organizationId,
      userId: e.userId,
      question: e.question.slice(0, 500),
      concept: e.u.concepts[0]?.name ?? null,
      intent: e.u.intent,
      topic: e.u.topics[0] ?? null,
      answer: e.instant ? e.instant.answer.slice(0, 1000) : null,
      lessonId: e.instant?.lesson.id ?? null,
    });
  } catch (err) {
    console.error("[bot] log", err);
  }
}

/** Records a 👍/👎 on an instant answer. The event may still be being written, so retry briefly. */
export async function rateBotEvent(id: string, userId: string, helpful: boolean, note: string | null): Promise<boolean> {
  const db = await getDb();
  for (let attempt = 0; attempt < 3; attempt++) {
    const [row] = await db.select({ userId: botEvents.userId }).from(botEvents).where(eq(botEvents.id, id));
    if (row) {
      if (row.userId !== userId) return false;
      await db.update(botEvents).set({ helpful, note, resolvedAt: null }).where(eq(botEvents.id, id));
      return true;
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}
