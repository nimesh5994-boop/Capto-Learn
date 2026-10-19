import { describe, expect, it } from "vitest";
import { CEILING_MICROS, CEILING_PENCE, draftLimits, PROFESSIONAL_RESERVE_MICROS, worstCaseMicros } from "./costBudget";
import { MODELS } from "./pricing";

describe("Ask Capto cost ceiling", () => {
  it("is 5p a question", () => {
    expect(CEILING_PENCE).toBe(5);
    expect(CEILING_MICROS).toBe(62_500); // 5p at a cautious $1.25 to the pound
  });
  it("gives a standard question generous sources and room for a full answer", () => {
    const l = draftLimits(MODELS.sonnet, 3_000)!; // planner spent ~0.3¢
    expect(l.sourceChars).toBeGreaterThanOrEqual(26_000);
    expect(l.maxTokens).toBeGreaterThanOrEqual(2_800); // answers so far peak at ~2,600 tokens
    expect(3_000 + l.worstMicros).toBeLessThanOrEqual(CEILING_MICROS);
  });
  it("still fits an expert question with the professional-bodies search reserved", () => {
    const l = draftLimits(MODELS.sonnet, 3_000, PROFESSIONAL_RESERVE_MICROS)!;
    expect(l).not.toBeNull();
    expect(3_000 + PROFESSIONAL_RESERVE_MICROS + l.worstMicros).toBeLessThanOrEqual(CEILING_MICROS);
  });
  it("never lets the most expensive model through under a 5p ceiling", () => {
    expect(draftLimits(MODELS.opus, 3_000)).toBeNull();
  });
  it("trims when the budget is tight, and declines rather than overspend", () => {
    const roomy = draftLimits(MODELS.sonnet, 0)!;
    const tight = draftLimits(MODELS.sonnet, 10_000)!;
    expect(tight.sourceChars + tight.maxTokens).toBeLessThan(roomy.sourceChars + roomy.maxTokens);
    expect(draftLimits(MODELS.sonnet, 60_000)).toBeNull();
  });
  it("estimates cost from list prices", () => {
    expect(worstCaseMicros(MODELS.sonnet, 0, 1_000)).toBeGreaterThan(10_000); // 1,000 output tokens ≈ 1¢
  });
});
