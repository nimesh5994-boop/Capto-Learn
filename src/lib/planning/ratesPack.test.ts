import { describe, expect, it } from "vitest";
import { buildRatesPack, ratesPackText } from "./ratesPack";

describe("buildRatesPack", () => {
  it("returns checked figures for the sections a scenario touches, with sources and the check date", () => {
    const p = buildRatesPack("2026/27", ["The director sells shares and claims Business Asset Disposal Relief on the capital gains"])!;
    expect(p.taxYear).toBe("2026/27");
    expect(p.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(p.items.length).toBeGreaterThan(3);
    expect(p.items.every((i) => i.url.startsWith("https://"))).toBe(true);
    expect(p.items.some((i) => /business asset disposal/i.test(i.label))).toBe(true);
  });
  it("includes inheritance tax figures for an estate scenario but not unrelated sections", () => {
    const p = buildRatesPack("2026/27", ["agricultural property relief and the nil-rate band on death"])!;
    expect(p.items.some((i) => /nil.rate/i.test(i.label))).toBe(true);
    expect(p.items.some((i) => i.section.includes("VAT"))).toBe(false);
  });
  it("returns null for a tax year with no verified data, or a scenario that touches nothing", () => {
    expect(buildRatesPack("2031/32", ["capital gains"])).toBeNull();
    expect(buildRatesPack("2026/27", ["hello world"])).toBeNull();
  });
  it("caps the number of figures and renders one line each", () => {
    const p = buildRatesPack("2026/27", ["income tax dividend capital gains inheritance tax corporation tax sdlt national insurance"], 12)!;
    expect(p.items).toHaveLength(12);
    expect(ratesPackText(p).split("\n")).toHaveLength(12);
  });
});
