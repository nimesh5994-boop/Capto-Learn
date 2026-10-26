import { describe, expect, it } from "vitest";
import { affordableIssues, ISSUE_CEILING_MICROS, MAX_ISSUES, SCENARIO_CEILING_MICROS, synthesisLimits } from "./budget";

describe("planning budget", () => {
  it("allows as many issues as were wanted from a fresh budget", () => {
    expect(affordableIssues(5, 0)).toBe(5);
  });
  it("never offers more issues than were wanted or than the cap", () => {
    expect(affordableIssues(2, 0)).toBe(2);
    expect(affordableIssues(9, 0)).toBe(MAX_ISSUES);
  });
  it("offers fewer issues as budget is spent, and none when nothing is left", () => {
    expect(affordableIssues(5, SCENARIO_CEILING_MICROS - ISSUE_CEILING_MICROS * 2)).toBeLessThan(MAX_ISSUES);
    expect(affordableIssues(5, SCENARIO_CEILING_MICROS)).toBe(0);
  });
  it("keeps the worst case of every issue plus the write-up under the ceiling", () => {
    const issues = affordableIssues(5, 15_000);
    const writeUp = synthesisLimits(15_000 + issues * ISSUE_CEILING_MICROS);
    expect(writeUp).not.toBeNull();
    expect(15_000 + issues * ISSUE_CEILING_MICROS + writeUp!.worstMicros).toBeLessThanOrEqual(SCENARIO_CEILING_MICROS);
  });
  it("declines to write up when no budget remains", () => {
    expect(synthesisLimits(SCENARIO_CEILING_MICROS)).toBeNull();
  });
  it("shrinks the write-up to fit what is left", () => {
    const roomy = synthesisLimits(0)!;
    const tight = synthesisLimits(SCENARIO_CEILING_MICROS - roomy.worstMicros + 1)!;
    expect(tight.worstMicros).toBeLessThan(roomy.worstMicros);
  });
});

describe("six issues", () => {
  it("fits six issues plus the write-up under the scenario ceiling", () => {
    const issues = affordableIssues(6, 15_000);
    expect(issues).toBe(6);
    const writeUp = synthesisLimits(15_000 + issues * ISSUE_CEILING_MICROS);
    expect(writeUp).not.toBeNull();
    expect(15_000 + issues * ISSUE_CEILING_MICROS + writeUp!.worstMicros).toBeLessThanOrEqual(SCENARIO_CEILING_MICROS);
  });
  it("never offers a seventh", () => {
    expect(affordableIssues(9, 0)).toBe(6);
  });
});
