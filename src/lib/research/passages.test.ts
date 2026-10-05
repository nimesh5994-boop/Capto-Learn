import { describe, expect, it } from "vitest";
import { rankPassages, selectPassages, splitPassages, verifyQuote } from "./passages";

const S455 = `## CTA10 Part 10

CTA10/S455 applies to loans/advances made on or after 1 April 2010. ICTA88/S419 applied to loans made before that date.

Broadly, where a close company makes any loan to an individual who is a participator, then the close company is due to pay tax under CTA10/S455.

## Repayment

Relief is given under S458 when the loan is repaid, released or written off.`;

const VAT = `## Business entertainment

Business entertainment is any form of free or subsidised entertainment or hospitality to non-employees, for example suppliers and customers.

You can't reclaim VAT on business entertainment.`;

describe("verifyQuote", () => {
  it("accepts an exact quote", () => {
    expect(verifyQuote("the close company is due to pay tax under CTA10/S455", S455)).toBe(true);
  });
  it("ignores curly quotes, dashes and spacing differences", () => {
    expect(verifyQuote("You can’t   reclaim VAT on business entertainment.", VAT)).toBe(true);
  });
  it("accepts elided quotes when fragments appear in order", () => {
    expect(verifyQuote("where a close company makes any loan … the close company is due to pay tax", S455)).toBe(true);
  });
  it("rejects elided fragments in the wrong order", () => {
    expect(verifyQuote("the close company is due to pay tax ... where a close company makes any loan", S455)).toBe(false);
  });
  it("rejects a paraphrase", () => {
    expect(verifyQuote("close companies must pay s455 tax on any loan to a participator", S455)).toBe(false);
  });
  it("rejects a quote too short to mean anything", () => {
    expect(verifyQuote("S455", S455)).toBe(false);
  });
});

describe("retrieval", () => {
  it("keeps headings with their text", () => {
    const parts = splitPassages(S455, 200);
    expect(parts.some((p) => p.startsWith("## Repayment") && p.includes("S458"))).toBe(true);
  });
  it("ranks the relevant source first", () => {
    const ranked = rankPassages(
      [
        { sourceId: "S1", text: S455 },
        { sourceId: "S2", text: VAT },
      ],
      "can I reclaim VAT on entertainment"
    );
    expect(ranked[0].sourceId).toBe("S2");
  });
  it("selects the best passage from every matching source within budget", () => {
    const ranked = rankPassages(
      [
        { sourceId: "S1", text: S455 },
        { sourceId: "S2", text: VAT },
      ],
      "loan participator tax entertainment"
    );
    const chosen = selectPassages(ranked, 10_000);
    expect(new Set(chosen.map((p) => p.sourceId))).toEqual(new Set(["S1", "S2"]));
  });
});
