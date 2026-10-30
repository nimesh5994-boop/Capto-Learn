import { describe, expect, it } from "vitest";
import { verifiedRateSources } from "./verifiedRates";

const NOW = new Date("2026-10-29T12:00:00Z");

describe("verifiedRateSources", () => {
  it("returns the s455 rate with its tax year for a question about it", () => {
    const v = verifiedRateSources("A director's loan is overdrawn by £20,000 at 31 March 2026. What s455 rate applies?", "2025/26", NOW);
    expect(v.length).toBeGreaterThan(0);
    expect(v.some((s) => /33\.75%/.test(s.text) && s.text.includes("2025/26"))).toBe(true);
  });

  it("states the tax year and checked date for each figure", () => {
    const v = verifiedRateSources("What is the VAT registration threshold?", "", NOW);
    expect(v[0].publisher).toMatch(/Capto verified rates · \d{4}\/\d{2} · checked against/);
    expect(v[0].url).toMatch(/^https:\/\//);
  });

  it("adds nothing for a question that isn't after a figure", () => {
    expect(verifiedRateSources("How do I post the year-end accrual journal for electricity?", "", NOW)).toEqual([]);
  });

  it("caps the entries", () => {
    expect(verifiedRateSources("What are the income tax rates, thresholds, allowances and limits?", "2025/26", NOW).length).toBeLessThanOrEqual(4);
  });
});
