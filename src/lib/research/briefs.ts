import "server-only";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { and, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { topicBriefs } from "@/lib/db/schema";
import { anthropic, Meter } from "./ai";
import { BRIEF_TOPICS } from "./briefTopics";
import { AnswerSchema, ANSWER_SYSTEM, buildAnswer, gatherSources, planQuestion, verifyDraft, type Plan } from "./engine";
import { judgeSameQuestion, sourcesUnchanged } from "./library";
import { isLibraryWorthy, shortlist } from "./libraryRules";
import { costMicros, MODELS } from "./pricing";
import type { ResearchAnswer, ResearchSource } from "./types";

/*
 * The Librarian bot. Keeps a verified "topic brief" for each common, fact-free practice question in BRIEF_TOPICS.
 *  - Writing: plan + gather sources now (cheap), then send every brief to Anthropic's Message Batches API, which
 *    runs within ~24h at HALF the normal price. Briefs use the top model (Opus) because they're reused widely.
 *  - Collecting: when the batch ends, every quote is verified against its source exactly like a live answer;
 *    only briefs meeting the library quality bar are published.
 *  - Serving: Ask Capto checks briefs before doing any research; a matching brief whose sources are unchanged is
 *    served to any firm for ~0.1p (the Haiku same-question check).
 *  - Upkeep: when the knowledge-base sync sees a cited page change, the brief is retired and rewritten next run.
 */

export interface BriefHit {
  answer: ResearchAnswer;
  sourcesChecked: number;
}

export async function findTopicBrief(question: string, restated: string, meter: Meter): Promise<BriefHit | null> {
  const db = await getDb();
  const briefs = await db.select().from(topicBriefs).where(and(eq(topicBriefs.status, "published"), isNotNull(topicBriefs.answer)));
  const candidates = shortlist(
    question,
    restated,
    briefs.map((b) => ({ ...b, question: b.question, restatedQuestion: b.restatedQuestion }))
  );
  if (!candidates.length) return null;
  const pick = await judgeSameQuestion(
    question,
    candidates.map((c) => ({ question: c.question, answeredOn: c.publishedAt ?? c.createdAt, taxYear: c.answer!.taxYear, shortAnswer: c.answer!.shortAnswer })),
    meter
  );
  const brief = candidates[pick];
  if (!brief?.answer) return null;
  const check = await sourcesUnchanged(brief.sourceVersions);
  if (check === "unknown") return null;
  if (check !== "unchanged") {
    await db.update(topicBriefs).set({ status: "retired", retiredReason: `Source updated: ${check}` }).where(eq(topicBriefs.id, brief.id));
    return null;
  }
  await db.update(topicBriefs).set({ hits: sql`${topicBriefs.hits} + 1` }).where(eq(topicBriefs.id, brief.id));
  const sourcesChecked = Object.keys(brief.sourceVersions).length;
  return { answer: { ...brief.answer, brief: { id: brief.id, area: brief.area, writtenAt: (brief.publishedAt ?? brief.createdAt).toISOString(), sourcesChecked } }, sourcesChecked };
}

/** Topics with no live brief (never written, failed, or retired because a source changed) and no batch in flight. */
async function topicsNeedingBriefs(): Promise<typeof BRIEF_TOPICS> {
  const db = await getDb();
  const rows = await db.select({ key: topicBriefs.topicKey, status: topicBriefs.status }).from(topicBriefs).where(inArray(topicBriefs.status, ["published", "pending"]));
  const covered = new Set(rows.map((r) => r.key));
  return BRIEF_TOPICS.filter((t) => !covered.has(t.key));
}

/**
 * Plans and gathers sources for every topic needing a brief, then submits one Message Batch. Returns a summary.
 * `limit` caps how many briefs one run writes (cost control).
 */
export async function startBriefBatch(limit = 60): Promise<string> {
  const todo = (await topicsNeedingBriefs()).slice(0, limit);
  if (!todo.length) return "Every topic already has a current brief.";
  const db = await getDb();
  const meter = new Meter();
  const requests: { custom_id: string; params: Record<string, unknown> }[] = [];
  const rows: { id: string }[] = [];
  for (const t of todo) {
    const plan = await planQuestion(t.question, meter).catch(() => null);
    if (!plan?.in_scope) continue;
    const gathered = await gatherSources(t.question, plan).catch(() => "no_pages" as const);
    if (typeof gathered === "string") continue;
    const [row] = await db
      .insert(topicBriefs)
      .values({
        topicKey: t.key,
        area: t.area,
        question: t.question,
        restatedQuestion: plan.restated_question,
        status: "pending",
        prepared: { plan, sources: gathered.sources, texts: Object.fromEntries(gathered.textById) },
      })
      .returning({ id: topicBriefs.id });
    rows.push(row);
    requests.push({
      custom_id: row.id,
      params: {
        model: MODELS.opus,
        max_tokens: 16000,
        output_config: { effort: "medium", format: zodOutputFormat(AnswerSchema) },
        system: ANSWER_SYSTEM,
        messages: [{ role: "user", content: gathered.userContent }],
      },
    });
  }
  if (!requests.length) return "No briefs could be prepared (no official sources found).";
  // The SDK's batch request params type is the full MessageCreateParams; our objects match it at runtime.
  const batch = await anthropic().messages.batches.create({ requests: requests as unknown as Parameters<ReturnType<typeof anthropic>["messages"]["batches"]["create"]>[0]["requests"] });
  await db.update(topicBriefs).set({ batchId: batch.id, costMicros: 0 }).where(inArray(topicBriefs.id, rows.map((r) => r.id)));
  return `Submitted ${requests.length} briefs to Anthropic's batch service (half price; usually done within an hour, at most 24h). Planning cost $${(meter.micros / 1e6).toFixed(3)}.`;
}

/** Collects any finished batches: verifies every brief's quotes and publishes the ones that pass. */
export async function collectBriefBatches(): Promise<string> {
  const db = await getDb();
  const pending = await db.select({ batchId: topicBriefs.batchId }).from(topicBriefs).where(and(eq(topicBriefs.status, "pending"), isNotNull(topicBriefs.batchId)));
  const batchIds = [...new Set(pending.map((p) => p.batchId!))];
  let published = 0;
  let failed = 0;
  let stillRunning = 0;
  for (const id of batchIds) {
    const batch = await anthropic().messages.batches.retrieve(id);
    if (batch.processing_status !== "ended") {
      stillRunning++;
      continue;
    }
    for await (const result of await anthropic().messages.batches.results(id)) {
      const [row] = await db.select().from(topicBriefs).where(eq(topicBriefs.id, result.custom_id));
      if (!row || row.status !== "pending") continue;
      const fail = async (reason: string) => {
        failed++;
        await db.update(topicBriefs).set({ status: "failed", failureReason: reason, prepared: null }).where(eq(topicBriefs.id, row.id));
      };
      if (result.result.type !== "succeeded") {
        await fail(`Batch request ${result.result.type}`);
        continue;
      }
      const msg = result.result.message;
      const micros = Math.round(costMicros(msg.model, msg.usage) / 2); // batch pricing is half price
      if (msg.stop_reason === "refusal") {
        await fail("Model declined");
        continue;
      }
      const text = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
      const parsed = (() => {
        try {
          return AnswerSchema.safeParse(JSON.parse(text));
        } catch {
          return null;
        }
      })();
      if (!parsed?.success || !row.prepared) {
        await fail("Couldn't read the brief");
        continue;
      }
      const sources = row.prepared.sources as ResearchSource[];
      const textById = new Map(Object.entries(row.prepared.texts));
      const draft = verifyDraft(parsed.data, textById, msg.model);
      const answer = buildAnswer(row.question, row.prepared.plan as Plan, sources, draft);
      if (!isLibraryWorthy(answer)) {
        await db.update(topicBriefs).set({ costMicros: micros }).where(eq(topicBriefs.id, row.id));
        await fail(`Didn't meet the quality bar (${draft.points.filter((p) => p.verified).length}/${draft.points.length} points verified, confidence ${answer.confidence})`);
        continue;
      }
      const sourceVersions = Object.fromEntries(answer.sources.map((s) => [s.url, s.updatedAt ?? null]));
      await db.update(topicBriefs).set({ status: "published", answer, sourceVersions, prepared: null, costMicros: micros, publishedAt: new Date() }).where(eq(topicBriefs.id, row.id));
      published++;
    }
  }
  if (!batchIds.length) return "No brief batches waiting.";
  return `${published} briefs published, ${failed} not published${stillRunning ? `, ${stillRunning} batch(es) still running` : ""}.`;
}
