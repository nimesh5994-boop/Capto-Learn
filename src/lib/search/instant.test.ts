import { describe, expect, it } from "vitest";
import { instantAnswer, type InstantLesson } from "./instant";
import { understand } from "./understand";

const lessons: InstantLesson[] = [
  {
    id: "bookkeeping/journals",
    title: "Posting journals",
    track: "bookkeeping",
    trackTitle: "Bookkeeping in practice",
    plain:
      "Posting journals. A journal entry records a transaction that does not come from a day book or the bank. Every journal entry has at least one debit and one credit of equal value. Always add a narrative to the journal entry explaining why it was posted. Check that the journal entry balances before you post it. Other unrelated text about the weather in spring.",
  },
  { id: "vat/registration", title: "VAT registration", track: "vat", trackTitle: "VAT", plain: "VAT registration. The threshold is set by HMRC." },
];
const cards = [
  { id: "vat/registration#f1", lessonId: "vat/registration", front: "VAT: compulsory registration threshold?", back: "£90,000 of taxable turnover in a rolling 12 months", evidence: "The VAT registration threshold is £90,000." },
];

describe("instantAnswer", () => {
  it("answers a how-to from the best lesson section, verbatim", () => {
    const a = instantAnswer(understand("how to post a journal entry?"), lessons, cards);
    expect(a?.kind).toBe("lesson");
    expect(a?.lesson.id).toBe("bookkeeping/journals");
    expect([a!.answer, ...a!.excerpt].every((s) => lessons[0].plain.includes(s))).toBe(true);
    expect(a!.excerpt.join(" ")).not.toContain("weather");
  });
  it("answers a threshold question from a checked flashcard", () => {
    const a = instantAnswer(understand("What is the VAT registration threshold?"), lessons, cards);
    expect(a).toMatchObject({ kind: "flashcard", answer: "£90,000 of taxable turnover in a rolling 12 months" });
  });
  it("passes up anything it doesn't recognise or can't support", () => {
    expect(instantAnswer(understand("something unusual about widgets"), lessons, cards)).toBeNull();
    expect(instantAnswer(understand("Is a staff party with clients allowable for input tax?"), lessons, cards)).toBeNull();
  });
});
