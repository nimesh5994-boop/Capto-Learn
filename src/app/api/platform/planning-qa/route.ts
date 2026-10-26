import { getDb } from "@/lib/db/client";
import { planningScenarios } from "@/lib/db/schema";
import { AccessError, authorizePlatform } from "@/lib/auth/dal";
import { runPlanning } from "@/lib/planning/engine";
import { scoreScenario } from "@/lib/planning/score";
import { STARTERS } from "@/lib/planning/starters";
import { costPence } from "@/lib/research/register";

// One scenario takes 1–2 minutes: give it the full five.
export const maxDuration = 300;

/**
 * Runs one of the starter scenarios as a regression test on THIS deployment, with the real knowledge base, and scores
 * it automatically. Platform staff with the content-review permission only, from the internal Capto workspace. Costs a
 * scenario's worth of AI spend (about 25–30p).
 */
export async function POST(req: Request) {
  let ctx;
  try {
    ctx = await authorizePlatform("platform.content.review");
    if (!ctx.isInternal) throw new AccessError("Run planning QA from the internal Capto workspace.");
  } catch (err) {
    if (err instanceof AccessError) return Response.json({ error: err.message }, { status: 403 });
    throw err;
  }
  const body = (await req.json().catch(() => ({}))) as { id?: unknown };
  const starter = STARTERS.find((s) => s.id === body.id);
  if (!starter) return Response.json({ error: "Unknown starter scenario." }, { status: 400 });

  const input = { ...starter.input, title: `QA · ${starter.label}`, reference: "QA-LIVE" };
  const started = Date.now();
  const res = await runPlanning(input, { organizationId: ctx.org.id, userId: ctx.user.id, onStage: () => {} });
  const score = scoreScenario({ report: res.report, issues: res.issues, ungrounded: res.ungrounded ?? [], mustCover: starter.mustCover, evidenceTexts: res.evidence });
  const failed = score.checks.filter((c) => !c.pass).map((c) => `${c.name}${c.detail ? ` (${c.detail})` : ""}`);

  const db = await getDb();
  const [row] = await db
    .insert(planningScenarios)
    .values({
      organizationId: ctx.org.id,
      userId: ctx.user.id,
      title: input.title,
      input: { ...input, qa: { starterId: starter.id, pct: score.pct, passed: score.passed, total: score.total, failed, at: new Date().toISOString() } },
      status: res.status,
      issues: res.issues,
      report: res.report,
      error: res.error,
      inputTokens: res.usage.input,
      outputTokens: res.usage.output,
      costMicros: res.usage.micros,
      durationMs: Date.now() - started,
    })
    .returning({ id: planningScenarios.id });
  return Response.json({ id: row.id, status: res.status, pct: score.pct, passed: score.passed, total: score.total, failed, costPence: costPence(res.usage.micros), seconds: Math.round((Date.now() - started) / 1000) });
}
