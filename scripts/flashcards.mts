/*
 * Drafts flashcards for every lesson with Anthropic's Message Batches API (half price), then keeps only the
 * cards whose evidence is found word-for-word in the lesson (see src/lib/learning/flashcards.ts).
 * Output: src/content/flashcards/cards.json — committed like the lessons, so the app needs no AI at runtime.
 *
 *   npx tsx scripts/flashcards.mts submit [--all]   lessons without cards (or whose text changed); --all redoes everything
 *   npx tsx scripts/flashcards.mts collect          writes cards once the batch has finished (safe to re-run)
 */
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import * as z from "zod";
import { allLessons, getLesson } from "../src/content/index.ts";
import { lessonPlainText, lessonTextHash, rejectCard, type Flashcard } from "../src/lib/learning/flashcards.ts";
import { costMicros, MODELS } from "../src/lib/research/pricing.ts";

config({ path: ".env.local" });
const OUT = path.join("src", "content", "flashcards", "cards.json");
const STATE = path.join(".data", "flashcards-batch.json");

interface CardFile {
  generatedAt: string;
  lessons: Record<string, { hash: string; cards: Flashcard[] }>;
}
const load = (): CardFile => (fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { generatedAt: "", lessons: {} });

const Schema = z.object({
  cards: z.array(z.object({ front: z.string(), back: z.string(), evidence: z.string() })),
});

const SYSTEM = `You write revision flashcards for UK accountancy trainees from a single lesson.

Write between 3 and 8 cards covering the facts in the lesson most worth memorising: rates, thresholds, limits, allowances, deadlines, time limits, penalties, and short definitions of key terms. Prefer facts a practitioner looks up or gets wrong in real work. Skip anything trivial or that is only an illustrative number in a worked example.

Rules for every card:
- front: a short question (under 100 characters) that makes sense on its own, naming the tax, scheme or context (e.g. "VAT: compulsory registration threshold?").
- back: the answer only, as short as possible (under 120 characters), e.g. "£90,000 of taxable turnover in a rolling 12 months".
- evidence: copy, character for character, the sentence or table row from the lesson text that states the fact. Do not paraphrase, shorten inside the quote, or add words. Every number in "back" must appear in "evidence".
- Use only what the lesson text says. Never add facts from your own knowledge, even if you think the lesson is out of date.
If the lesson has fewer than 3 facts worth a card, return fewer cards (even none).`;

const client = () => {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY missing from .env.local");
  return new Anthropic({ maxRetries: 3 });
};

async function submit(all: boolean) {
  const existing = load();
  const lessons = allLessons().filter((r) => all || existing.lessons[r.id]?.hash !== lessonTextHash(r.lesson));
  if (!lessons.length) return console.log("Every lesson already has up-to-date cards.");
  const requests = lessons.map((r, i) => ({
    custom_id: `l${i}`,
    params: {
      model: MODELS.sonnet,
      max_tokens: 4000,
      output_config: { effort: "low", format: zodOutputFormat(Schema) },
      system: SYSTEM,
      messages: [{ role: "user", content: `Course: ${r.track.title}\nLesson: ${r.lesson.title}${r.lesson.taxYear ? ` (tax year ${r.lesson.taxYear})` : ""}\n\n<lesson>\n${lessonPlainText(r.lesson)}\n</lesson>` }],
    },
  }));
  const batch = await client().messages.batches.create({ requests: requests as never });
  fs.mkdirSync(".data", { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify({ batchId: batch.id, ids: Object.fromEntries(lessons.map((r, i) => [`l${i}`, r.id])) }, null, 2));
  console.log(`Submitted ${lessons.length} lessons as batch ${batch.id}. Run "collect" in a while.`);
}

async function collect() {
  if (!fs.existsSync(STATE)) return console.log("No batch waiting.");
  const { batchId, ids } = JSON.parse(fs.readFileSync(STATE, "utf8")) as { batchId: string; ids: Record<string, string> };
  const batch = await client().messages.batches.retrieve(batchId);
  if (batch.processing_status !== "ended") {
    const c = batch.request_counts;
    return console.log(`Still running: ${c.succeeded + c.errored} of ${Object.keys(ids).length} done.`);
  }
  const file = load();
  let kept = 0;
  let micros = 0;
  const rejected: Record<string, number> = {};
  const failedLessons: string[] = [];
  for await (const res of await client().messages.batches.results(batchId)) {
    const lessonId = ids[res.custom_id];
    const ref = lessonId ? getLesson(lessonId) : undefined;
    if (!ref) continue;
    if (res.result.type !== "succeeded") {
      failedLessons.push(lessonId);
      continue;
    }
    const msg = res.result.message;
    micros += costMicros(msg.model, msg.usage) / 2;
    let parsed: z.infer<typeof Schema> | null = null;
    try {
      parsed = Schema.parse(JSON.parse(msg.content.map((b) => (b.type === "text" ? b.text : "")).join("")));
    } catch {
      failedLessons.push(lessonId);
      continue;
    }
    const plain = lessonPlainText(ref.lesson);
    const cards: Flashcard[] = [];
    for (const c of parsed.cards) {
      const why = rejectCard(c, plain);
      if (why) {
        rejected[why] = (rejected[why] ?? 0) + 1;
        continue;
      }
      cards.push({ id: `${lessonId}#f${cards.length + 1}`, lessonId, front: c.front.trim(), back: c.back.trim(), evidence: c.evidence.trim(), ...(ref.lesson.taxYear ? { taxYear: ref.lesson.taxYear } : {}) });
    }
    kept += cards.length;
    file.lessons[lessonId] = { hash: lessonTextHash(ref.lesson), cards };
  }
  file.generatedAt = new Date().toISOString();
  const sorted = Object.fromEntries(Object.entries(file.lessons).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ generatedAt: file.generatedAt, lessons: sorted }, null, 1) + "\n");
  fs.rmSync(STATE);
  console.log(`Kept ${kept} cards. Rejected: ${JSON.stringify(rejected)}. Failed lessons: ${failedLessons.length ? failedLessons.join(", ") : "none"}. Cost $${(micros / 1e6).toFixed(2)}.`);
}

const [cmd, flag] = process.argv.slice(2);
if (cmd === "submit") await submit(flag === "--all");
else if (cmd === "collect") await collect();
else console.log('Usage: flashcards.mts submit [--all] | collect');
