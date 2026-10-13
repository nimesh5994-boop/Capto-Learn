/*
 * Runs the research exam (src/lib/research/researchExam.ts) through the real Ask Capto pipeline, locally.
 * Costs roughly $1–3. Uses the local database (stop the dev server first — PGlite is single-process).
 *
 *   npx tsx --conditions=react-server scripts/research-exam.mts [case-id ...]
 */
import fs from "node:fs";
import { config } from "dotenv";
config({ path: ".env.local" });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) {
  console.error("Refusing: run the research exam against the local database only.");
  process.exit(1);
}
const { runResearch } = await import("../src/lib/research/engine.ts");
const { RESEARCH_EXAM } = await import("../src/lib/research/researchExam.ts");

const only = process.argv.slice(2);
const cases = only.length ? RESEARCH_EXAM.filter((c) => only.includes(c.id)) : RESEARCH_EXAM;
const results: unknown[] = [];
let pass = 0;
let spent = 0;

for (const c of cases) {
  const t0 = Date.now();
  let final: Awaited<ReturnType<ReturnType<typeof runResearch>["next"]>>["value"] = undefined;
  for await (const e of runResearch(c.q, { professional: false, organizationId: "00000000-0000-0000-0000-000000000000", fresh: true, tier: c.tier ?? "standard" })) if (e.type !== "stage") final = e;
  const secs = Math.round((Date.now() - t0) / 1000);
  const miss: string[] = [];
  let text = "";
  let summary = "";
  if (!final || final.type !== "done") {
    miss.push(`no answer: ${final && "message" in final ? final.message : "nothing returned"}`);
  } else {
    const a = final.answer;
    spent += final.usage.micros;
    text = [a.shortAnswer, ...(a.steps ?? []).map((s) => s.text), a.example ? `${a.example.title} ${a.example.body}` : "", ...a.points.map((p) => `${p.heading} ${p.text}`)].join("\n");
    for (const re of c.must) if (!re.test(text)) miss.push(`missing ${re}`);
    for (const re of c.mustNot ?? []) if (re.test(text)) miss.push(`says ${re}`);
    const checked = [...a.points, ...(a.steps ?? [])];
    const verified = checked.filter((p) => p.verified).length;
    if (checked.length && verified / checked.length < 0.8) miss.push(`only ${verified}/${checked.length} verified`);
    if (a.confidence === "low") miss.push("low confidence");
    summary = `L${a.tier?.level ?? "?"} ${final.route} · ${a.confidence} · ${verified}/${checked.length} verified · ${(final.usage.micros / 1e4).toFixed(1)}¢ · ${secs}s`;
  }
  if (!miss.length) pass++;
  console.log(`\n${miss.length ? "✗" : "✓"} ${c.id} — ${summary}`);
  if (final?.type === "done") console.log(`   ${final.answer.shortAnswer.replace(/\s+/g, " ").slice(0, 260)}`);
  if (miss.length) console.log(`   MISS: ${miss.join("; ")}`);
  results.push({ id: c.id, ok: !miss.length, miss, summary, answer: final?.type === "done" ? final.answer : null });
}
fs.mkdirSync(".data", { recursive: true });
fs.writeFileSync(`.data/research-exam-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(results, null, 1));
console.log(`\n${pass}/${cases.length} correct · spent $${(spent / 1e6).toFixed(2)}`);
process.exit(0);
