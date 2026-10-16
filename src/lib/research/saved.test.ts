import { describe, expect, it } from "vitest";
import { changedSince, cleanSavedFields, matchesSaved, pinnedVersions, SAVED_LIMITS } from "./saved";
import type { ResearchAnswer } from "./types";

describe("cleanSavedFields", () => {
  it("falls back to the question for a blank title, and tidies spacing", () => {
    expect(cleanSavedFields("  What is  the VAT threshold? ", { title: "  " })).toEqual({ title: "What is the VAT threshold?", reference: "", note: "" });
    expect(cleanSavedFields("q", { title: " My  title ", reference: " Smith Ltd ", note: " line 1\nline 2 " })).toEqual({ title: "My title", reference: "Smith Ltd", note: "line 1\nline 2" });
  });
  it("caps every field", () => {
    const r = cleanSavedFields("x".repeat(500), { reference: "r".repeat(500), note: "n".repeat(5000) });
    expect(r.title.length).toBe(SAVED_LIMITS.title);
    expect(r.title.endsWith("…")).toBe(true);
    expect(r.reference.length).toBe(SAVED_LIMITS.reference);
    expect(r.note.length).toBe(SAVED_LIMITS.note);
  });
});

describe("source change detection", () => {
  const answer = {
    sources: [
      { id: "S1", kind: "official", url: "https://www.gov.uk/a", title: "A", publisher: "HMRC", updatedAt: "2026-09-01T00:00:00.000Z" },
      { id: "S2", kind: "official", url: "https://www.gov.uk/b", title: "B", publisher: "HMRC", updatedAt: null },
      { id: "L1", kind: "lesson", url: "/learn/vat/x", title: "Lesson", publisher: "Capto" },
    ],
  } as unknown as ResearchAnswer;

  it("pins official sources only", () => {
    expect(pinnedVersions(answer)).toEqual({ "https://www.gov.uk/a": "2026-09-01T00:00:00.000Z", "https://www.gov.uk/b": null });
  });
  it("flags a page only when the knowledge base holds a newer date", () => {
    const pinned = pinnedVersions(answer);
    expect(changedSince(pinned, new Map([["https://www.gov.uk/a", "2026-09-01T00:00:00.000Z"]]))).toEqual([]);
    expect(changedSince(pinned, new Map([["https://www.gov.uk/a", "2026-10-02T00:00:00.000Z"]]))).toEqual(["https://www.gov.uk/a"]);
    expect(changedSince(pinned, new Map([["https://www.gov.uk/b", "2026-10-02T00:00:00.000Z"]]))).toEqual([]); // no pinned date: can't judge
    expect(changedSince(pinned, new Map())).toEqual([]); // not mirrored
  });
});

describe("matchesSaved", () => {
  const s = { title: "Director loan write-off", reference: "Smith Ltd", note: "client asked in Oct", question: "Can the company write off a director's loan?" };
  it("needs every word, anywhere, any case", () => {
    expect(matchesSaved("smith loan", s)).toBe(true);
    expect(matchesSaved("SMITH vat", s)).toBe(false);
    expect(matchesSaved("", s)).toBe(true);
  });
});
