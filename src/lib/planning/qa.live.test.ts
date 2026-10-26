/*
 * LIVE QA harness for Tax planning — skipped unless PLANNING_LIVE_QA is set (CI never sets it). It runs real scenarios
 * through the real engine against the LOCAL test database (.data/pglite) and the real AI service, so it costs money
 * (up to 40p a scenario). Writes a JSON result and a memorandum PDF per scenario to PLANNING_QA_OUT.
 *
 *   PLANNING_LIVE_QA=1 PLANNING_QA_OUT=<dir> [PLANNING_QA_ONLY=1,3] npx vitest run src/lib/planning/qa.live.test.ts
 *
 * All facts below are invented. Nothing here is a real client.
 */
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { config } from "dotenv";
import { describe, expect, it } from "vitest";
import { STARTERS } from "./starters";

config({ path: ".env.local", quiet: true });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) throw new Error("Refusing to run live QA against a real Postgres database.");


const only = (process.env.PLANNING_QA_ONLY ?? "").split(",").map((s) => Number(s.trim())).filter(Boolean);
const OUT = process.env.PLANNING_QA_OUT ?? "";

describe.skipIf(!process.env.PLANNING_LIVE_QA)("tax planning live QA", () => {
  STARTERS.forEach((starter, i) => {
    const n = i + 1;
    const input = { ...starter.input, title: `QA${n} ${starter.input.title}`, reference: `QA-000${n}` };
    it.skipIf(only.length > 0 && !only.includes(n))(
      `scenario ${n}: ${input.title}`,
      async () => {
        mkdirSync(OUT, { recursive: true });
        const log = (m: string) => appendFileSync(`${OUT}/qa${n}.log`, `${new Date().toISOString().slice(11, 19)} ${m}\n`);
        const { runPlanning, situationText } = await import("./engine");
        const { getDb } = await import("@/lib/db/client");
        const { planningScenarios, researchQueries, users } = await import("@/lib/db/schema");
        const { eq, inArray } = await import("drizzle-orm");
        const { buildPlanningMemo, planningRef } = await import("./memo");
        const { ungroundedFigures } = await import("./report");
        const { scoreScenario } = await import("./score");
        const { renderPdf } = await import("@/lib/research/reportPdf");
        const { costPence } = await import("@/lib/research/register");

        const db = await getDb();
        const [qa] = await db.select({ id: users.id, org: users.organizationId, name: users.name }).from(users).where(eq(users.email, "qa@captolearn.test"));
        expect(qa, "run scripts/seed-qa.mts first").toBeTruthy();

        const t0 = Date.now();
        const res = await runPlanning(input, { organizationId: qa.org, userId: qa.id, onStage: log });
        const ms = Date.now() - t0;

        const queryIds = res.issues.map((x) => x.queryId).filter((q): q is string => !!q);
        const rows = queryIds.length ? await db.select({ id: researchQueries.id, answer: researchQueries.answer }).from(researchQueries).where(inArray(researchQueries.id, queryIds)) : [];
        const answers = new Map(rows.flatMap((r) => (r.answer ? [[r.id, r.answer] as const] : [])));
        const ground = [situationText(input)];
        for (const a of answers.values()) ground.push(a.shortAnswer, ...a.points.flatMap((p) => [p.text, ...p.citations.map((c) => c.quote)]), ...(a.steps ?? []).map((s) => s.text), ...a.caveats);
        const ungrounded = res.report ? ungroundedFigures(res.report, ground) : [];

        const score = scoreScenario({ report: res.report, issues: res.issues, ungrounded, mustCover: starter.mustCover, evidenceTexts: ground });
        const [row] = await db
          .insert(planningScenarios)
          .values({ organizationId: qa.org, userId: qa.id, title: input.title, input, status: res.status, issues: res.issues, report: res.report, error: res.error, inputTokens: res.usage.input, outputTokens: res.usage.output, costMicros: res.usage.micros, durationMs: ms })
          .returning({ id: planningScenarios.id });

        const metrics = {
          scenario: n,
          title: input.title,
          status: res.status,
          seconds: Math.round(ms / 1000),
          costPence: costPence(res.usage.micros),
          error: res.error,
          issues: res.issues.map((x) => {
            const a = x.queryId ? answers.get(x.queryId) : undefined;
            const pts = a ? [...a.points, ...(a.steps ?? [])] : [];
            return { id: x.id, title: x.title, status: x.status, confidence: x.confidence, verifiedPoints: pts.filter((p) => p.verified).length, totalPoints: pts.length, sources: a?.sources.length ?? 0, official: a?.sources.filter((s) => s.kind === "official").length ?? 0, professionalNote: !!a?.professional, question: x.question, error: x.error };
          }),
          report: res.report && { confidence: res.report.confidence, options: res.report.options.length, notCovered: res.report.notCovered.length, antiAvoidance: res.report.antiAvoidance.length, nextSteps: res.report.nextSteps.length, headline: res.report.recommendation.headline },
          ungroundedFigures: ungrounded,
          score: { pct: score.pct, passed: score.passed, total: score.total, failed: score.checks.filter((c) => !c.pass).map((c) => `${c.name}${c.detail ? ` (${c.detail})` : ""}`) },
          scenarioId: row.id,
        };
        writeFileSync(`${OUT}/qa${n}.json`, JSON.stringify({ metrics, input, report: res.report, issues: res.issues, answers: Object.fromEntries(answers) }, null, 2));
        writeFileSync(`${OUT}/qa${n}-metrics.json`, JSON.stringify(metrics, null, 2));
        if (res.report) {
          const blocks = buildPlanningMemo(input.title, input, res.report, res.issues, answers, { firm: "QA Test Practice", docRef: planningRef(row.id), preparedBy: qa.name, reference: input.reference, url: `http://localhost:3700/planning/${row.id}`, createdAt: new Date(), exportedAt: new Date() });
          writeFileSync(`${OUT}/qa${n}-memo.pdf`, await renderPdf(blocks, { firm: "QA Test Practice", color: "#a01f62", docRef: planningRef(row.id), kicker: "TAX PLANNING MEMORANDUM" }));
        }
        log(`done: ${res.status}, ${metrics.costPence}p, ${metrics.seconds}s, ungrounded figures: ${ungrounded.length}, score ${score.pct}% (${score.passed}/${score.total})`);
        // The harness records quality; it only fails on a broken run.
        expect(res.status, res.error ?? "").not.toBe("failed");
      },
      900_000
    );
  });
});
