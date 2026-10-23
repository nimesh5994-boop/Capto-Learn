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
