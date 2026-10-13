import { describe, expect, it } from "vitest";
import { correctTypos, understand } from "./understand";

describe("correctTypos", () => {
  it("fixes a near-miss on a known practice word", () => {
    expect(correctTypos("how to post joournal entry?")).toEqual({ text: "how to post journal entry?", corrections: [{ from: "joournal", to: "journal" }] });
  });
  it("leaves ordinary words alone", () => {
    expect(correctTypos("what should happen here").corrections).toEqual([]);
  });
});

describe("understand", () => {
  it("reads a bookkeeping how-to question", () => {
    const u = understand("how to post joournal entry?");
    expect(u.intent).toBe("how_to");
    expect(u.concepts[0].name).toBe("journal entry");
    expect(u.topics[0]).toBe("bookkeeping");
    expect(u.keywords).toEqual(["post", "journal", "entry"]);
  });
  it("maps everyday wording to HMRC's", () => {
    const u = understand("Can I claim VAT back on a staff party?");
    expect(u.concepts.map((c) => c.name)).toEqual(expect.arrayContaining(["input tax", "business entertainment"]));
    expect(u.officialQuery).toContain("input tax deduction");
    expect(u.topics[0]).toBe("vat");
  });
  it("prefers the longer concept and spots rates and deadlines", () => {
    const u = understand("What is the s455 rate on an overdrawn director's loan?");
    expect(u.concepts[0].name).toBe("director's loan account");
    expect(u.intent).toBe("rate");
    expect(understand("When is the confirmation statement due?").intent).toBe("deadline");
  });
  it("still works with no concept", () => {
    const u = understand("something unusual about widgets");
    expect(u.concepts).toEqual([]);
    expect(u.keywords).toEqual(["something", "unusual", "widgets"]);
  });
});
