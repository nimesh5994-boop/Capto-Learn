"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { cpdEntries } from "@/lib/db/schema";
import { authorize } from "@/lib/auth/dal";
import { cleanManualEntry, type ManualInput } from "@/lib/cpd/log";

export type CpdResult = { ok: true } | { ok: false; error: string };

/** Logs CPD the person did outside Capto Learn. Always for themselves, in their own firm. */
export async function addCpdEntry(input: ManualInput): Promise<CpdResult> {
  const ctx = await authorize("learning.view", { write: true });
  const r = cleanManualEntry(input);
  if (!r.ok) return r;
  const db = await getDb();
  await db.insert(cpdEntries).values({ organizationId: ctx.org.id, userId: ctx.user.id, activityDate: r.value.date, title: r.value.title, provider: r.value.provider, kind: r.value.kind, minutes: r.value.minutes, reflection: r.value.reflection });
  revalidatePath("/cpd");
  return { ok: true };
}

export async function deleteCpdEntry(id: string): Promise<CpdResult> {
  const ctx = await authorize("learning.view", { write: true });
  if (!/^[0-9a-f-]{36}$/i.test(id)) return { ok: false, error: "Entry not found." };
  const db = await getDb();
  const gone = await db.delete(cpdEntries).where(and(eq(cpdEntries.id, id), eq(cpdEntries.userId, ctx.user.id), eq(cpdEntries.organizationId, ctx.org.id))).returning({ id: cpdEntries.id });
  if (!gone.length) return { ok: false, error: "Entry not found." };
  revalidatePath("/cpd");
  return { ok: true };
}
