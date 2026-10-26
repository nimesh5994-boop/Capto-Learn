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
import type { ScenarioInput } from "./types";

config({ path: ".env.local", quiet: true });
if (/^postgres(ql)?:\/\//.test(process.env.DATABASE_URL ?? "")) throw new Error("Refusing to run live QA against a real Postgres database.");

const SCENARIOS: ScenarioInput[] = [
  {
    title: "QA1 Director-shareholder extraction of surplus cash",
    reference: "QA-0001",
    taxYear: "2026/27",
    facts:
      "Sole director and 100% shareholder of a UK trading company, aged 58, UK resident and domiciled. The company has retained profits of £420,000, held mostly as cash that the business does not need. It pays the director a salary of £12,570 and the director takes dividends of £40,000 a year. The director's spouse is a basic-rate taxpayer with no other income and owns no shares. The company has no employees other than the director. The director has no other income. The company has been trading for 14 years.",
    objectives: "Extract the surplus cash over the next three years as tax-efficiently as possible, while keeping open the option of selling the company in about five years.",
    constraints: "Does not want the whole amount taxed at the additional rate in one year. Will not use aggressive or artificial arrangements. Wants to understand pension contributions as an option.",
  },
  {
    title: "QA2 Sale of a family trading company: trade sale, MBO or employee ownership trust",
    reference: "QA-0002",
    taxYear: "2026/27",
    facts:
      "A married couple each own 50% of a UK trading company that makes bespoke furniture, founded 18 years ago. Both are directors and work full time in the business. It has 42 employees, annual profit of about £1.1m and net assets of £2.4m including £900,000 of cash. A trade buyer has offered £7m for the shares, half payable on completion and half over two years as an earn-out dependent on profit. The management team has separately suggested a management buyout, and the couple have heard about employee ownership trusts. Both are aged 61 and plan to retire and to move to Spain within three years.",
    objectives: "Choose between the three exit routes on after-tax proceeds and risk, understand Business Asset Disposal Relief and how the earn-out is taxed, and plan for the move abroad.",
    constraints: "They want certainty on the tax on the cash element before accepting an offer. They do not want the employees to lose their jobs. They are open to staying involved for up to a year.",
  },
  {
    title: "QA3 Landlord: stay personal or incorporate a property portfolio",
    reference: "QA-0003",
    taxYear: "2026/27",
    facts:
      "An individual owns 12 residential buy-to-let properties in their own name, bought over the last 15 years. Total market value is £3.1m and mortgages total £1.2m, with interest of about £68,000 a year. Rental profit before finance costs is about £150,000 a year. The individual also has employment income of £55,000. They manage the properties themselves and spend about 10 hours a week on it, with no employees. They are married and their spouse has no income. They are considering transferring the portfolio into a new limited company, and they would like to leave the properties to their children eventually.",
    objectives: "Reduce the tax cost of holding the portfolio, understand the cost of incorporating, and decide whether to incorporate, restructure the ownership with the spouse, or keep things as they are.",
    constraints: "They cannot afford a large upfront tax bill. They want to keep the option of selling individual properties. Their lender has not yet been asked about the transfer.",
  },
  {
    title: "QA4 Start-up founder: share options for staff, R&D relief and founder remuneration",
    reference: "QA-0004",
    taxYear: "2026/27",
    facts:
      "A UK software start-up incorporated 3 years ago with two founders each holding 45% of the ordinary shares and an angel investor holding 10%. Gross assets are £1.6m, there are 14 employees and annual turnover is £1.9m with a loss of £310,000 after about £650,000 of staff costs working on a new platform. The company has not yet claimed any R&D relief. The founders each take a salary of £12,570 and no dividends. The company wants to grant share options to six key employees and is raising a further funding round in about nine months.",
    objectives: "Set up a tax-efficient share option scheme for the six employees, claim any R&D relief available, and decide how the founders should be paid.",
    constraints: "Cash is tight, so any repayable tax liability for the company is a problem. The investor will want the arrangements to be conventional. The founders want to avoid employment-related securities problems.",
  },
  {
    title: "QA5 Family farming estate: inheritance tax planning after the agricultural and business property relief changes",
    reference: "QA-0005",
    taxYear: "2026/27",
    facts:
      "A widowed farmer aged 74 owns 400 acres of owner-occupied farmland worth £5.2m, a farmhouse worth £900,000 and farm buildings, plus farm machinery and livestock worth £450,000. The farming business is run as a sole trade. Other assets are investments of £600,000 and cash of £250,000. There are three adult children, one of whom works on the farm and wants to take over. The farmer has made no lifetime gifts apart from small annual gifts. The late spouse's nil-rate band was not used on the first death and the farmhouse is the farmer's only home.",
    objectives: "Understand the inheritance tax exposure on death and what could be done now to reduce it while keeping the farm in the family and in operation.",
    constraints: "The farmer must keep enough income and capital to live on and does not want to lose control of the farm during their lifetime. The child who farms should be able to continue without selling land to pay tax.",
  },
];

const only = (process.env.PLANNING_QA_ONLY ?? "").split(",").map((s) => Number(s.trim())).filter(Boolean);
const OUT = process.env.PLANNING_QA_OUT ?? "";

describe.skipIf(!process.env.PLANNING_LIVE_QA)("tax planning live QA", () => {
  SCENARIOS.forEach((input, i) => {
    const n = i + 1;
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
          scenarioId: row.id,
        };
        writeFileSync(`${OUT}/qa${n}.json`, JSON.stringify({ metrics, input, report: res.report, issues: res.issues, answers: Object.fromEntries(answers) }, null, 2));
        writeFileSync(`${OUT}/qa${n}-metrics.json`, JSON.stringify(metrics, null, 2));
        if (res.report) {
          const blocks = buildPlanningMemo(input.title, input, res.report, res.issues, answers, { firm: "QA Test Practice", docRef: planningRef(row.id), preparedBy: qa.name, reference: input.reference, url: `http://localhost:3700/planning/${row.id}`, createdAt: new Date(), exportedAt: new Date() });
          writeFileSync(`${OUT}/qa${n}-memo.pdf`, await renderPdf(blocks, { firm: "QA Test Practice", color: "#a01f62", docRef: planningRef(row.id), kicker: "TAX PLANNING MEMORANDUM" }));
        }
        log(`done: ${res.status}, ${metrics.costPence}p, ${metrics.seconds}s, ungrounded figures: ${ungrounded.length}`);
        // The harness records quality; it only fails on a broken run.
        expect(res.status, res.error ?? "").not.toBe("failed");
      },
      900_000
    );
  });
});
