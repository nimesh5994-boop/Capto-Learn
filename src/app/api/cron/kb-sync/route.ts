import { runSync, syncDue } from "@/lib/kb/sync";
import { collectBriefBatches, startBriefBatch } from "@/lib/research/briefs";
import { sendTrainingReminders } from "@/lib/alerts/reminders";

// Called daily by Vercel Cron; does real work only when the weekly sync is due or a previous run paused.
export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  // Training reminders (due soon / just overdue) — daily, cheap, and idempotent. Runs first so a long sync can't starve it.
  const reminders = await sendTrainingReminders().catch((err) => `reminders failed: ${err instanceof Error ? err.message : err}`);
  // The Librarian: publish any finished brief batches (cheap; runs daily).
  const briefs = await collectBriefBatches().catch((err) => `brief collection failed: ${err instanceof Error ? err.message : err}`);
  if (!(await syncDue())) return Response.json({ ok: true, skipped: "Sync not due yet", briefs, reminders });
  const message = await runSync({ trigger: "cron", budgetMs: 200_000 });
  // After a sync, rewrite briefs that were retired (a source changed) or never written — capped per run.
  const written = process.env.LIBRARIAN !== "off" ? await startBriefBatch(25).catch((err) => `librarian failed: ${err instanceof Error ? err.message : err}`) : "librarian off";
  return Response.json({ ok: true, message, briefs, written, reminders });
}
