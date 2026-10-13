"use server";

import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { botAliases, botEvents } from "@/lib/db/schema";
import { AccessError, authorize, authorizePlatform } from "@/lib/auth/dal";
import { GLOSSARY } from "@/lib/search/glossary";
import { forgetTaughtCache, rateBotEvent } from "@/lib/search/botLog";

type Result = { ok: true; message: string } | { ok: false; error: string };

async function guard(fn: () => Promise<string>): Promise<Result> {
  try {
    return { ok: true, message: await fn() };
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, error: err.message };
    throw err;
  }
}

/** A learner's 👍/👎 on what the question bot made of their search. */
export async function rateBotAnswer(eventId: string, helpful: boolean, note: string | null): Promise<Result> {
  return guard(async () => {
    const ctx = await authorize("learning.view");
    const parsed = z.object({ eventId: z.uuid(), helpful: z.boolean(), note: z.string().trim().max(500).nullable() }).safeParse({ eventId, helpful, note });
    if (!parsed.success) throw new AccessError("Couldn't read that.");
    await rateBotEvent(parsed.data.eventId, ctx.user.id, parsed.data.helpful, parsed.data.note || null);
    return "Thanks.";
  });
}

const TeachSchema = z.object({
  alias: z
    .string()
    .trim()
    .toLowerCase()
    .min(2, { error: "Enter the wording people use." })
    .max(80)
    .regex(/^[a-z0-9&'’ .-]+$/, { error: "Letters, numbers, spaces and simple punctuation only." }),
  concept: z.string().refine((c) => GLOSSARY.some((g) => g.name === c), { error: "Choose a topic from the list." }),
  eventIds: z.array(z.uuid()).max(200).default([]),
});

/** A reviewer teaches the bot: "when people say X, they mean concept Y". Live within a few minutes. */
export async function teachBot(input: z.input<typeof TeachSchema>): Promise<Result> {
  return guard(async () => {
    const ctx = await authorizePlatform("platform.content.review");
    const parsed = TeachSchema.safeParse(input);
    if (!parsed.success) throw new AccessError(parsed.error.issues[0]?.message ?? "Check the wording and topic.");
    const db = await getDb();
    await db
      .insert(botAliases)
      .values({ alias: parsed.data.alias, concept: parsed.data.concept, createdByName: ctx.user.name })
      .onConflictDoUpdate({ target: botAliases.alias, set: { concept: parsed.data.concept, createdByName: ctx.user.name, createdAt: new Date() } });
    if (parsed.data.eventIds.length) await db.update(botEvents).set({ resolvedAt: new Date() }).where(inArray(botEvents.id, parsed.data.eventIds));
    forgetTaughtCache();
    revalidatePath("/reviewer/bot");
    return `Taught: “${parsed.data.alias}” now means ${parsed.data.concept}.`;
  });
}

export async function forgetBotAlias(id: string): Promise<Result> {
  return guard(async () => {
    await authorizePlatform("platform.content.review");
    const db = await getDb();
    await db.delete(botAliases).where(eq(botAliases.id, id));
    forgetTaughtCache();
    revalidatePath("/reviewer/bot");
    return "Removed.";
  });
}

/** Marks logged searches as dealt with (e.g. not a real question, or now covered). */
export async function resolveBotEvents(eventIds: string[]): Promise<Result> {
  return guard(async () => {
    await authorizePlatform("platform.content.review");
    const ids = z.array(z.uuid()).max(200).parse(eventIds);
    const db = await getDb();
    if (ids.length) await db.update(botEvents).set({ resolvedAt: new Date() }).where(inArray(botEvents.id, ids));
    revalidatePath("/reviewer/bot");
    return "Marked as dealt with.";
  });
}
