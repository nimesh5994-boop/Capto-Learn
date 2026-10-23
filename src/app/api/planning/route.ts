import { z } from "zod";
import { getDb } from "@/lib/db/client";
import { planningScenarios } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { assertResearchQuota } from "@/lib/entitlements";
import { runPlanning } from "@/lib/planning/engine";

// Several issues are researched in parallel, then the report is written: give it the full five minutes.
export const maxDuration = 300;

const InputSchema = z.object({
  title: z.string().trim().min(3, "Give the scenario a short title.").max(120),
  reference: z.string().trim().max(120).default(""),
  taxYear: z.string().trim().max(12).default(""),
  facts: z.string().trim().min(40, "Describe the client's situation in a little more detail (at least a couple of sentences).").max(4000),
  objectives: z.string().trim().min(10, "Say what the client wants to achieve.").max(1500),
  constraints: z.string().trim().max(1500).default(""),
});

/** Streams newline-delimited JSON events: stages as they happen, then the stored scenario's id. */
export async function POST(req: Request) {
  let ctx;
  try {
    ctx = await authorize("research.use", { write: true, feature: "research" });
    const db = await getDb();
    await assertResearchQuota(db, ctx.org);
  } catch (err) {
    if (err instanceof AccessError) return Response.json({ error: err.message }, { status: 403 });
    throw err;
  }
  const parsed = InputSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Check the details." }, { status: 400 });
  const input = parsed.data;
  const { org, user } = ctx;

  const encoder = new TextEncoder();
  const started = Date.now();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (e: object) => controller.enqueue(encoder.encode(`${JSON.stringify(e)}\n`));
      const result = await runPlanning(input, { organizationId: org.id, userId: user.id, onStage: (message) => send({ type: "stage", message }) });
      const db = await getDb();
      const [row] = await db
        .insert(planningScenarios)
        .values({
          organizationId: org.id,
          userId: user.id,
          title: input.title,
          input,
          status: result.status,
          issues: result.issues,
          report: result.report,
          error: result.error,
          inputTokens: result.usage.input,
          outputTokens: result.usage.output,
          costMicros: result.usage.micros,
          durationMs: Date.now() - started,
        })
        .returning({ id: planningScenarios.id });
      send({ type: "complete", id: row.id });
      controller.close();
    },
  });
  return new Response(stream, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" } });
}
