"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { AccessError, authorizePlatform } from "@/lib/auth/dal";
import { runSync } from "@/lib/kb/sync";
import { collectBriefBatches, startBriefBatch } from "@/lib/research/briefs";

/** Starts a knowledge-base sync in the background (the page shows its progress). */
export async function startKbSync(): Promise<{ ok: boolean; message: string }> {
  try {
    await authorizePlatform("platform.content.review");
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, message: err.message };
    throw err;
  }
  after(async () => {
    try {
      // On Vercel a function has a time limit; the run pauses cleanly and the daily job resumes it.
      await runSync({ trigger: "manual", budgetMs: process.env.VERCEL ? 280_000 : undefined });
    } catch (err) {
      console.error("[kb-sync]", err);
    }
  });
  revalidatePath("/platform/knowledge");
  return { ok: true, message: "Sync started — refresh in a minute to see progress. The first full download takes a while (roughly 30–60 minutes)." };
}

/** Writes briefs for every topic without a current one (runs in the background; results arrive within ~24h). */
export async function startLibrarian(): Promise<{ ok: boolean; message: string }> {
  try {
    await authorizePlatform("platform.content.review");
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, message: err.message };
    throw err;
  }
  after(async () => {
    try {
      console.info("[librarian]", await startBriefBatch(Number(process.env.LIBRARIAN_BATCH_LIMIT) || 60));
    } catch (err) {
      console.error("[librarian]", err);
    }
  });
  return { ok: true, message: "The Librarian is preparing briefs and will submit them to the half-price batch service. Check for finished briefs later (usually within an hour)." };
}

export async function checkBriefs(): Promise<{ ok: boolean; message: string }> {
  try {
    await authorizePlatform("platform.content.review");
  } catch (err) {
    if (err instanceof AccessError) return { ok: false, message: err.message };
    throw err;
  }
  const message = await collectBriefBatches();
  revalidatePath("/platform/knowledge");
  return { ok: true, message };
}
