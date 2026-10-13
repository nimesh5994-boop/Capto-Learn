import { describe, expect, it } from "vitest";
import type { ResearchAnswer } from "@/lib/research/types";
import { canLearn, hasClientFacts, inConceptTerms, SAME_QUESTION, similarity } from "./learnRules";

const answer = (over: Partial<ResearchAnswer> = {}): ResearchAnswer => ({
  shortAnswer: "x",
  points: [
    { heading: "a", text: "a", citations: [], verified: true },
    { heading: "b", text: "b", citations: [], verified: true },
  ],
  caveats: [],
  followUps: [],
  confidence: "high",
  taxYear: null,
  sources: [],
  relatedLessons: [],
  model: "m",
  generatedAt: "",
  ...over,
});

describe("canLearn", () => {
  it("keeps verified, high-confidence answers to general questions", () => {
    expect(canLearn("What is the VAT registration threshold?", answer())).toBe(true);
  });
  it("refuses anything less", () => {
    expect(canLearn("What is the VAT registration threshold?", answer({ confidence: "medium" }))).toBe(false);
    expect(canLearn("What is the VAT registration threshold?", answer({ points: [{ heading: "a", text: "a", citations: [], verified: true }, { heading: "b", text: "b", citations: [], verified: false }] }))).toBe(false);
    expect(canLearn("My client has turnover of £95,000 — must they register?", answer())).toBe(false);
  });
});

describe("inConceptTerms", () => {
  it("makes an abbreviation and the full name compare as the same question", () => {
    const m = [
      { alias: "annual investment allowance", concept: "capital allowances" },
      { alias: "aia", concept: "capital allowances" },
    ];
    const a = inConceptTerms("Can a company claim the Annual Investment Allowance on a car?", m);
    const b = inConceptTerms("can a company claim AIA on a car?", m);
    expect(similarity(a, b)).toBeGreaterThanOrEqual(SAME_QUESTION);
  });
});

describe("similarity", () => {
  it("matches rewordings of the same question", () => {
    expect(similarity("What is the VAT registration threshold?", "what's the threshold for VAT registration")).toBeGreaterThanOrEqual(SAME_QUESTION);
  });
  it("doesn't match a different question on the same topic", () => {
    expect(similarity("What is the VAT registration threshold?", "How do I deregister from VAT and when can I?")).toBeLessThan(SAME_QUESTION);
    expect(similarity("VAT threshold", "What is the VAT registration threshold and how quickly must a business register after going over it?")).toBeLessThan(SAME_QUESTION);
  });
  it("flags client facts", () => {
    expect(hasClientFacts("Director borrowed £40k")).toBe(true);
    expect(hasClientFacts("What is the s455 rate?")).toBe(false);
    expect(hasClientFacts("Can you help with the head office rent?")).toBe(false);
    expect(hasClientFacts("Can she claim the marriage allowance?")).toBe(true);
  });
});
