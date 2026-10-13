/*
 * Runs the research exam (src/lib/research/researchExam.ts) through the real Ask Capto pipeline, locally.
 *
 * Cheap by design: each answer is stored, and later runs re-grade the stored answer for free. A question is only
 * asked again (≈5¢, or ≈19¢ on the expert model) when it's new or reworded, when the answering engine has
 * changed, or when one of its official sources has changed in the synced guidance. So a routine run costs
 * nothing; after an engine change it re-asks everything once.
 *
 *   npx tsx --conditions=react-server scripts/research-exam.mts            routine (free unless something changed)
 *   npx tsx --conditions=react-server scripts/research-exam.mts --fresh    ask every question again
 *   npx tsx --conditions=react-server scripts/research-exam.mts <id> ...   only these cases
 * Uses the local database — stop the dev server first (PGlite is single-process).
 */
import fs from "node:fs";
import { createHash } from "node:crypto";
import { config } from "dotenv";
config({ path: ".env.local" });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) {
  console.error("Refusing: run the research exam against the local database only.");
  process.exit(1);
}
const { runResearch } = await import("../src/lib/research/engine.ts");
const { RESEARCH_EXAM } = await import("../src/lib/research/researchExam.ts");
const { storedVersions } = await import("../src/lib/kb/search.ts");
const { sourceChanged } = await import("../src/lib/research/libraryRules.ts");
type Answer = import("../src/lib/research/types.ts").ResearchAnswer;

const CACHE = ".data/research-exam-cache.json";
const args = process.argv.slice(2);
const fresh = args.includes("--fresh");
const only = args.filter((a) => !a.startsWith("--"));
const cases = only.length ? RESEARCH_EXAM.filter((c) => only.includes(c.id)) : RESEARCH_EXAM;

// The engine's fingerprint: any change to how answers are planned, sourced or written invalidates stored answers.
const engine = createHash("sha256")
  .update(["src/lib/research/engine.ts", "src/lib/research/passages.ts", "src/lib/kb/search.ts"].map((f) => fs.readFileSync(f, "utf8")).join("\n"))
  .digest("hex")
  .slice(0, 12);
const cache: Record<string, { key: string; answer: Answer; route: string; micros: number; at: string }> = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, "utf8")) : {};

async function stillCurrent(id: string, key: string): Promise<boolean> {
  const hit = cache[id];
  if (fresh || !hit || hit.key !== key) return false;
  const pinned = Object.fromEntries(hit.answer.sources.filter((s) => s.kind === "official").map((s) => [s.url, s.updatedAt ?? null]));
  const now = await storedVersions(Object.keys(pinned));
  return !Object.keys(pinned).some((u) => !now.has(u) || sourceChanged(pinned[u], now.get(u) ?? null));
}

let pass = 0;
let spent = 0;
let asked = 0;
for (const c of cases) {
  const key = createHash("sha256").update(`${engine}|${c.tier ?? "standard"}|${c.q}`).digest("hex").slice(0, 16);
  let answer: Answer | null = null;
  let route = "";
  let micros = 0;
  let note = "";
  if (await stillCurrent(c.id, key)) {
    ({ answer, route } = cache[c.id]);
    note = `stored ${cache[c.id].at.slice(0, 10)} · free re-grade`;
  } else {
    asked++;
    const t0 = Date.now();
    let final: { type: string; answer?: Answer; route?: string; usage?: { micros: number }; message?: string } | undefined;
    for await (const e of runResearch(c.q, { professional: false, organizationId: "00000000-0000-0000-0000-000000000000", fresh: true, tier: c.tier ?? "standard" })) if (e.type !== "stage") final = e;
    micros = final?.usage?.micros ?? 0;
    spent += micros;
    if (final?.type === "done" && final.answer) {
      answer = final.answer;
      route = final.route ?? "";
      cache[c.id] = { key, answer, route, micros, at: new Date().toISOString() };
    }
    note = `asked now · ${(micros / 1e4).toFixed(1)}¢ · ${Math.round((Date.now() - t0) / 1000)}s${final?.type !== "done" ? ` · ${final?.message ?? "no answer"}` : ""}`;
  }
  const miss: string[] = [];
  if (!answer) miss.push("no answer");
  else {
    const text = [answer.shortAnswer, ...(answer.steps ?? []).map((s) => s.text), answer.example ? `${answer.example.title} ${answer.example.body}` : "", ...answer.points.map((p) => `${p.heading} ${p.text}`)].join("\n");
    for (const re of c.must) if (!re.test(text)) miss.push(`missing ${re}`);
    for (const re of c.mustNot ?? []) if (re.test(text)) miss.push(`says ${re}`);
    const checked = [...answer.points, ...(answer.steps ?? [])];
    const verified = checked.filter((p) => p.verified).length;
    if (checked.length && verified / checked.length < 0.8) miss.push(`only ${verified}/${checked.length} verified`);
    if (answer.confidence === "low") miss.push("low confidence");
  }
  if (!miss.length) pass++;
  console.log(`${miss.length ? "✗" : "✓"} ${c.id} — ${answer ? `L${answer.tier?.level ?? "?"} ${route} · ${answer.confidence} · ` : ""}${note}`);
  if (miss.length) console.log(`   MISS: ${miss.join("; ")}${answer ? `\n   ${answer.shortAnswer.replace(/\s+/g, " ").slice(0, 240)}` : ""}`);
}
fs.mkdirSync(".data", { recursive: true });
fs.writeFileSync(CACHE, JSON.stringify(cache));
console.log(`\n${pass}/${cases.length} correct · ${asked} asked, ${cases.length - asked} re-graded free · spent $${(spent / 1e6).toFixed(2)}`);
process.exit(0);
