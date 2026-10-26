import { describe, expect, it } from "vitest";
import { capConfidence, cleanRefs, finaliseReport, findingsText } from "./report";
import type { PlanningIssue } from "./types";

const issue = (id: string, o: Partial<PlanningIssue> = {}): PlanningIssue => ({ id, title: `Issue ${id}`, question: "Q?", queryId: "q", status: "answered", shortAnswer: "A", confidence: "high", error: null, ...o });

describe("planning report checks", () => {
  it("caps confidence at the weakest answered issue", () => {
    expect(capConfidence("high", [issue("I1"), issue("I2", { confidence: "low" })])).toBe("low");
    expect(capConfidence("medium", [issue("I1")])).toBe("medium");
  });
  it("lowers high to medium when an issue got no answer", () => {
    expect(capConfidence("high", [issue("I1"), issue("I2", { status: "no_sources", confidence: null })])).toBe("medium");
  });
  it("drops references to issues that don't exist, and repeats", () => {
    expect(cleanRefs(["i1", "I1", "I9", " I2 "], [issue("I1"), issue("I2")])).toEqual(["I1", "I2"]);
  });
  it("lists unanswered issues under 'not covered' and cleans refs", () => {
    const issues = [issue("I1"), issue("I2", { status: "failed", confidence: null, error: "boom" })];
    const r = finaliseReport(
      {
        executiveSummary: "s",
        recommendation: { headline: "h", reasoning: "r", conditions: [], issueRefs: ["I1", "I7"] },
        options: [{ name: "o", summary: "", suitableWhen: "", advantages: [], disadvantages: [], taxEffect: "", risks: [], issueRefs: ["I2", "I8"] }],
        antiAvoidance: [{ point: "p", issueRefs: ["I3"] }],
        assumptions: [],
        informationNeeded: [],
        nextSteps: [],
        notCovered: ["x"],
        confidence: "high",
      },
      issues,
      "m",
      new Date("2026-10-23T00:00:00Z")
    );
    expect(r.recommendation.issueRefs).toEqual(["I1"]);
    expect(r.options[0].issueRefs).toEqual(["I2"]);
    expect(r.antiAvoidance[0].issueRefs).toEqual([]);
    expect(r.notCovered).toHaveLength(2);
    expect(r.notCovered[1]).toContain("I2");
    expect(r.confidence).toBe("medium");
    expect(r.generatedAt).toBe("2026-10-23T00:00:00.000Z");
  });
  it("marks unverified points and no-answer issues in the findings text", () => {
    const t = findingsText(
      [
        { issue: issue("I1"), points: [{ heading: "h", text: "t", verified: false }], caveats: ["c"] },
        { issue: issue("I2", { status: "failed", confidence: null }), points: [], caveats: [] },
      ],
      10_000
    );
    expect(t).toContain("[UNVERIFIED");
    expect(t).toContain('status="no answer"');
  });
});

import { extractFigures, ungroundedFigures } from "./report";
import type { PlanningReport } from "./types";

const rep = (text: string): PlanningReport => ({
  executiveSummary: text,
  recommendation: { headline: "h", reasoning: "r", conditions: [], issueRefs: [] },
  options: [],
  antiAvoidance: [],
  assumptions: [],
  informationNeeded: [],
  nextSteps: [],
  notCovered: [],
  confidence: "high",
  model: "m",
  generatedAt: "2026-10-23T00:00:00.000Z",
});

describe("figure grounding", () => {
  it("finds pounds and percentages", () => {
    expect(extractFigures("Pay £12,570 and 8.75% on £40k, or 20 per cent")).toEqual(["£12,570", "8.75%", "£40k", "20 per cent"]);
  });
  it("accepts figures that appear in the situation or findings", () => {
    expect(ungroundedFigures(rep("Dividends of £40,000 taxed at 8.75%."), ["Takes dividends of £40,000", "the rate is 8.75 per cent"])).toEqual([]);
  });
  it("flags figures from nowhere", () => {
    expect(ungroundedFigures(rep("Allowance is £500 and tax is 39.35%."), ["dividends of £40,000"])).toEqual(["£500", "39.35%"]);
  });
  it("does not find £5,000 inside £15,000", () => {
    expect(ungroundedFigures(rep("A £5,000 allowance"), ["a £15,000 allowance"])).toEqual(["£5,000"]);
  });
});

import { coverageLine } from "./types";

describe("coverage line", () => {
  it("counts answered issues and verified points", () => {
    const issues = [issue("I1", { verified: 5, checked: 6 }), issue("I2", { verified: 4, checked: 4 }), issue("I3", { status: "failed", confidence: null })];
    expect(coverageLine(issues)).toBe("2 of 3 issues answered (2 high confidence); 9 of 10 points supported by quotations verified word for word.");
  });
  it("leaves out the points clause for older scenarios without counts", () => {
    expect(coverageLine([issue("I1")])).toBe("1 of 1 issues answered (1 high confidence).");
  });
});
