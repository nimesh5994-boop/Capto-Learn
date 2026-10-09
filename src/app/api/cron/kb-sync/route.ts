import { runSync, syncDue } from "@/lib/kb/sync";

// Called daily by Vercel Cron; does real work only when the weekly sync is due or a previous run paused.
export const maxDuration = 300;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  if (!(await syncDue())) return Response.json({ ok: true, skipped: "Not due yet" });
  const message = await runSync({ trigger: "cron", budgetMs: 270_000 });
  return Response.json({ ok: true, message });
}
