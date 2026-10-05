import { getDb } from "@/lib/db/client";
import { researchQueries } from "@/lib/db/schema";
import { AccessError, authorize } from "@/lib/auth/dal";
import { assertResearchQuota } from "@/lib/entitlements";
import { orgHasFeature } from "@/lib/plans";
import { runResearch, type ResearchEvent } from "@/lib/research/engine";

// Planning + searching + fetching + a cited answer comfortably fits, but give the model headroom.
export const maxDuration = 300;

/** Streams newline-delimited JSON events: stages as they happen, then the stored answer's id. */
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
  const body = (await req.json().catch(() => ({}))) as { question?: unknown; professional?: unknown };
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (question.length < 8) return Response.json({ error: "Ask a full question (at least a few words)." }, { status: 400 });
  if (question.length > 2000) return Response.json({ error: "Keep the question under 2,000 characters — put the key facts first." }, { status: 400 });
  const professional = body.professional === true && orgHasFeature(ctx.org, "professionalSources");
  const { org, user } = ctx;

  const encoder = new TextEncoder();
  const started = Date.now();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (e: object) => controller.enqueue(encoder.encode(`${JSON.stringify(e)}\n`));
      let final: ResearchEvent | null = null;
      for await (const e of runResearch(question, { professional })) {
        if (e.type === "stage") send(e);
        else final = e;
      }
      const db = await getDb();
      const usage = final && "usage" in final ? final.usage : { input: 0, output: 0 };
      const [row] = await db
        .insert(researchQueries)
        .values({
          organizationId: org.id,
          userId: user.id,
          question,
          status: final?.type === "done" ? "answered" : final?.type === "no_sources" ? "no_sources" : "failed",
          answer: final?.type === "done" ? final.answer : null,
          error: final?.type === "no_sources" || final?.type === "error" ? final.message : null,
          inputTokens: usage.input,
          outputTokens: usage.output,
          durationMs: Date.now() - started,
        })
        .returning({ id: researchQueries.id });
      send({ type: "complete", id: row.id });
      controller.close();
    },
  });
  return new Response(stream, { headers: { "content-type": "application/x-ndjson; charset=utf-8", "cache-control": "no-store" } });
}
