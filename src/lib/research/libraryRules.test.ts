import { describe, expect, it } from "vitest";
import { isLibraryWorthy, shortlist, sourceChanged } from "./libraryRules";
import type { ResearchAnswer } from "./types";

const answer = (over: Partial<ResearchAnswer> = {}): ResearchAnswer => ({
  shortAnswer: "x",
  points: Array.from({ length: 6 }, (_, i) => ({ heading: `p${i}`, text: "t", citations: [], verified: true })),
  caveats: [],
  followUps: [],
  confidence: "high",
  taxYear: null,
  sources: [{ id: "S1", kind: "official", url: "https://www.gov.uk/x", title: "x", publisher: "GOV.UK guidance" }],
  relatedLessons: [],
  model: "m",
  generatedAt: "2026-10-09T00:00:00Z",
  ...over,
});

describe("isLibraryWorthy", () => {
  it("accepts a confident, fully verified answer", () => expect(isLibraryWorthy(answer())).toBe(true));
  it("rejects low confidence", () => expect(isLibraryWorthy(answer({ confidence: "low" }))).toBe(false));
  it("rejects when more than ~15% of points are unverified", () => {
    const a = answer();
    a.points[0].verified = false;
    expect(isLibraryWorthy(a)).toBe(false); // 5/6 = 83%
  });
  it("never re-saves an answer that was itself reused", () => {
    expect(isLibraryWorthy(answer({ reuse: { libraryId: "l", originalDate: "d", sourcesChecked: 1 } }))).toBe(false);
  });
});

describe("shortlist", () => {
  const lib = [
    {
      id: "a",
      question: "A VAT-registered company holds a staff Christmas party and two clients also attend. Can it reclaim the VAT, and how much?",
      restatedQuestion: "To what extent can a VAT-registered company recover input tax on a staff Christmas party also attended by clients, and how is it apportioned between staff entertainment and business entertainment?",
    },
    { id: "b", question: "Overdrawn director loan account s455 at year end", restatedQuestion: "s455 tax on loans to participators by a close company outstanding at the year end" },
    { id: "c", question: "When does MTD for income tax start?", restatedQuestion: "Making Tax Digital for Income Tax start dates and qualifying income thresholds" },
  ];
  it("finds a reworded repeat (real case: 'Christmas do' / 'customers')", () => {
    const q = "Our client's Christmas do had 40 employees and 2 customers there. How much of the input VAT can they claim?";
    const restated = "How much input tax can a VAT-registered business recover on a staff Christmas party attended by 40 employees and 2 customers (business entertainment apportionment)?";
    expect(shortlist(q, restated, lib).map((e) => e.id)[0]).toBe("a");
  });
  it("returns nothing for an unrelated question", () => {
    expect(shortlist("How do I register a PSC for an LLP?", "Notifying Companies House of a person with significant control of an LLP", lib)).toEqual([]);
  });
});

describe("sourceChanged", () => {
  it("detects a newer page version", () => expect(sourceChanged("2026-01-01T00:00:00Z", "2026-06-03T00:00:00Z")).toBe(true));
  it("accepts the same or older version", () => expect(sourceChanged("2026-06-03T00:00:00Z", "2026-06-03T00:00:00Z")).toBe(false));
  it("is cautious when the original version wasn't recorded", () => expect(sourceChanged(null, "2026-06-03T00:00:00Z")).toBe(true));
});
