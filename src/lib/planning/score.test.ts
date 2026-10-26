import { describe, expect, it } from "vitest";
import { scoreScenario } from "./score";
import type { PlanningIssue, PlanningReport } from "./types";

const issue = (id: string, o: Partial<PlanningIssue> = {}): PlanningIssue => ({ id, title: `Issue ${id}`, question: "Q?", queryId: "q", status: "answered", shortAnswer: "A", confidence: "medium", error: null, verified: 5, checked: 5, ...o });
const report = (o: Partial<PlanningReport> = {}): PlanningReport => ({
  executiveSummary: "Dividends and a pension contribution look best.",
  recommendation: { headline: "h", reasoning: "Uses the annual allowance.", conditions: [], issueRefs: ["I1"] },
  options: [
    { name: "Dividends", summary: "s", suitableWhen: "w", advantages: [], disadvantages: [], taxEffect: "e", risks: [], issueRefs: ["I1"] },
    { name: "Pension", summary: "s", suitableWhen: "w", advantages: [], disadvantages: [], taxEffect: "e", risks: [], issueRefs: ["I2"] },
  ],
  antiAvoidance: [],
  assumptions: [],
  informationNeeded: [],
  nextSteps: ["a", "b", "c"],
  notCovered: [],
  confidence: "medium",
  model: "m",
  generatedAt: "2026-10-23T00:00:00.000Z",
  ...o,
});

describe("scoreScenario", () => {
  it("passes a complete, well-sourced report", () => {
    const s = scoreScenario({ report: report(), issues: [issue("I1"), issue("I2")], ungrounded: [], mustCover: ["dividend", "pension", "annual allowance"] });
    expect(s.pct).toBe(100);
    expect(s.passed).toBe(s.total);
  });
  it("fails missing topics, unanswered issues and ungrounded figures", () => {
    const s = scoreScenario({ report: report(), issues: [issue("I1"), issue("I2", { status: "failed", verified: 0, checked: 0 })], ungrounded: ["£5", "7%"], mustCover: ["business asset disposal|BADR"] });
    const failed = s.checks.filter((c) => !c.pass).map((c) => c.name);
    expect(failed).toContain("Every issue answered");
    expect(failed).toContain("Figures grounded (at most one unexplained)");
    expect(failed).toContain("Covers: business asset disposal");
  });
  it("finds topics in the researched evidence as well as the report", () => {
    const s = scoreScenario({ report: report(), issues: [issue("I1"), issue("I2")], ungrounded: [], mustCover: ["trust"], evidenceTexts: ["A discretionary trust is..."] });
    expect(s.checks.find((c) => c.name === "Covers: trust")?.pass).toBe(true);
  });
  it("scores a missing report as failing everything it needs a report for", () => {
    const s = scoreScenario({ report: null, issues: [issue("I1")], ungrounded: [], mustCover: ["x"] });
    expect(s.checks.find((c) => c.name === "Report written")?.pass).toBe(false);
    expect(s.checks.find((c) => c.name === "Covers: x")?.pass).toBe(false);
    expect(s.pct).toBeLessThan(50);
  });
});
