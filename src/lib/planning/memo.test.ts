import { describe, expect, it } from "vitest";
import { renderDocx } from "@/lib/research/reportDocx";
import { renderPdf } from "@/lib/research/reportPdf";
import type { ResearchAnswer } from "@/lib/research/types";
import { buildPlanningMemo, planningRef } from "./memo";
import type { PlanningIssue, PlanningReport } from "./types";

const input = { title: "T", taxYear: "2026/27", facts: "A company with surplus cash.", objectives: "Extract it tax-efficiently.", constraints: "" };
const issues: PlanningIssue[] = [
  { id: "I1", title: "Dividends", question: "Q1?", queryId: "q1", status: "answered", shortAnswer: "A1", confidence: "high", error: null },
  { id: "I2", title: "Anti-avoidance", question: "Q2?", queryId: null, status: "failed", shortAnswer: null, confidence: null, error: "boom" },
];
const answer = {
  shortAnswer: "Dividends are taxed at the dividend rates.",
  points: [{ heading: "h", text: "t", citations: [{ sourceId: "S1", quote: "taxed at dividend rates", verified: true }], verified: true }],
  caveats: [],
  followUps: [],
  confidence: "high",
  taxYear: "2026/27",
  sources: [{ id: "S1", kind: "official", url: "https://www.gov.uk/x", title: "Dividend tax", publisher: "GOV.UK", updatedAt: "2026-04-06" }],
  relatedLessons: [],
  model: "m",
  generatedAt: "2026-10-23T00:00:00.000Z",
} as unknown as ResearchAnswer;
const report: PlanningReport = {
  executiveSummary: "Summary.",
  recommendation: { headline: "Take dividends.", reasoning: "Because.", conditions: ["Company has reserves"], issueRefs: ["I1"] },
  options: [{ name: "Dividends", summary: "s", suitableWhen: "w", advantages: ["a"], disadvantages: ["d"], taxEffect: "e", risks: ["r"], issueRefs: ["I1"] }],
  antiAvoidance: [{ point: "TiS", issueRefs: ["I2"] }],
  assumptions: ["UK resident"],
  informationNeeded: ["Reserves"],
  nextSteps: ["Calculate"],
  notCovered: ["I2 — no answer"],
  confidence: "medium",
  model: "m",
  generatedAt: "2026-10-23T00:00:00.000Z",
};
const meta = { firm: "Firm", docRef: planningRef("a6509153-0000-0000-0000-000000000000"), preparedBy: "Pat", url: "https://x.test/planning/abc", createdAt: "2026-10-23", exportedAt: new Date("2026-10-24") };

describe("planning memo", () => {
  it("builds a reference from the scenario id", () => expect(meta.docRef).toBe("TP-A6509153"));
  it("puts the conclusion first and ends with the notice", () => {
    const blocks = buildPlanningMemo("Title", input, report, issues, new Map([["q1", answer]]), meta);
    expect(blocks[0]).toEqual({ kind: "title", text: "Title" });
    expect(blocks.find((b) => b.kind === "h2")).toMatchObject({ text: "1. Summary and recommendation" });
    expect(blocks.filter((b) => b.kind === "h2").map((b) => (b as { text: string }).text).at(-1)).toBe("Appendix B: Important notice");
  });
  it("includes verified quotations and flags issues with no answer", () => {
    const blocks = buildPlanningMemo("Title", input, report, issues, new Map([["q1", answer]]), meta);
    expect(blocks.some((b) => b.kind === "quote" && b.verified && b.source === "I1/S1")).toBe(true);
    expect(JSON.stringify(blocks)).toContain("boom");
  });
  it("still builds when no report could be written", () => {
    const blocks = buildPlanningMemo("Title", input, null, issues, new Map(), meta);
    expect(JSON.stringify(blocks)).toContain("could not be written");
    expect(blocks.some((b) => b.kind === "signoff")).toBe(true);
  });
  it("renders to a real Word file and a real PDF, branded as a tax planning memorandum", async () => {
    const blocks = buildPlanningMemo("Title", input, report, issues, new Map([["q1", answer]]), meta);
    const brand = { firm: "Firm", color: "#a01f62", docRef: meta.docRef, kicker: "TAX PLANNING MEMORANDUM" };
    const docx = await renderDocx(blocks, brand);
    expect(docx.subarray(0, 2).toString()).toBe("PK");
    const pdf = await renderPdf(blocks, brand);
    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pdf.length).toBeGreaterThan(2000);
  });
});

describe("memo status line", () => {
  it("reflects the firm's review", async () => {
    const { statusLine } = await import("./memo");
    expect(statusLine(null)).toContain("Draft for review");
    expect(statusLine({ status: "approved", by: "Sam", at: "2026-10-24", note: "Checked" })).toBe("Reviewed and approved by Sam on 24 October 2026: Checked Not advice to the client until issued by a qualified adviser.");
    expect(statusLine({ status: "changes", by: "Sam", at: null, note: "Redo I2" })).toContain("asked for changes");
  });
});

describe("sample output", () => {
  it.skipIf(!process.env.PLANNING_SAMPLE_DIR)("writes a sample Word and PDF for eyeballing", async () => {
    const { writeFileSync } = await import("node:fs");
    const blocks = buildPlanningMemo("Director-shareholder exit and extraction", input, report, issues, new Map([["q1", answer]]), { ...meta, reference: "ABC-0042", review: { status: "approved", by: "Sam Reviewer", at: "2026-10-24", note: "Checked against the sources" } });
    const brand = { firm: "Sample Practice LLP", color: "#a01f62", docRef: meta.docRef, kicker: "TAX PLANNING MEMORANDUM" };
    writeFileSync(`${process.env.PLANNING_SAMPLE_DIR}/sample-memo.pdf`, await renderPdf(blocks, brand));
    writeFileSync(`${process.env.PLANNING_SAMPLE_DIR}/sample-memo.docx`, await renderDocx(blocks, brand));
  });
});
