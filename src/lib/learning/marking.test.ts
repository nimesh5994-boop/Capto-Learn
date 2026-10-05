import { describe, expect, it } from "vitest";
import type { Exercise } from "@/content/types";
import { mark, markJournal, publicExercise, quizScore } from "./marking";

const journal: Exercise = {
  kind: "journal",
  id: "j",
  prompt: "p",
  explain: "e",
  accounts: ["Bank", "Sales", "VAT control", "Debtors", "Suspense"],
  answer: [
    { account: "Debtors", dr: 1200 },
    { account: "Sales", cr: 1000 },
    { account: "VAT control", cr: 200 },
  ],
};

describe("journal marking", () => {
  it("accepts the same entry in any order", () => {
    expect(
      markJournal(journal.kind === "journal" ? journal.answer : [], [
        { account: "VAT control", cr: 200 },
        { account: "Debtors", dr: 1200 },
        { account: "Sales", cr: 1000 },
      ]).correct
    ).toBe(true);
  });
  it("accepts an account split over two lines when the net is right", () => {
    const r = mark(journal, {
      kind: "journal",
      lines: [
        { account: "Debtors", dr: 1200 },
        { account: "Sales", cr: 600 },
        { account: "Sales", cr: 400 },
        { account: "VAT control", cr: 200 },
      ],
    });
    expect(r.correct).toBe(true);
  });
  it("explains a reversed side and an unbalanced entry", () => {
    const r = markJournal(journal.kind === "journal" ? journal.answer : [], [
      { account: "Debtors", dr: 1200 },
      { account: "Sales", dr: 1000 },
      { account: "VAT control", cr: 200 },
    ]);
    expect(r.correct).toBe(false);
    expect(r.feedback.join(" ")).toMatch(/doesn't balance/);
    expect(r.feedback.join(" ")).toMatch(/Sales should be a credit/);
  });
  it("flags extra accounts", () => {
    const r = mark(journal, {
      kind: "journal",
      lines: [
        { account: "Debtors", dr: 1200 },
        { account: "Sales", cr: 1000 },
        { account: "VAT control", cr: 200 },
        { account: "Suspense", dr: 5 },
        { account: "Bank", cr: 5 },
      ],
    });
    expect(r.correct).toBe(false);
    expect(r.detail?.journalFeedback).toContain("Suspense shouldn't be in this entry.");
  });
});

describe("other kinds", () => {
  it("numeric uses tolerance", () => {
    const ex: Exercise = { kind: "numeric", id: "n", prompt: "p", explain: "e", answer: 48, unit: "£" };
    expect(mark(ex, { kind: "numeric", value: 48.4 }).correct).toBe(true);
    expect(mark(ex, { kind: "numeric", value: 49 }).correct).toBe(false);
  });
  it("multi needs exactly the right set", () => {
    const ex: Exercise = { kind: "multi", id: "m", prompt: "p", explain: "e", options: ["a", "b", "c", "d"], answers: [0, 2] };
    expect(mark(ex, { kind: "multi", choices: [2, 0] }).correct).toBe(true);
    expect(mark(ex, { kind: "multi", choices: [0, 2, 3] }).correct).toBe(false);
  });
  it("classify reports per item", () => {
    const ex: Exercise = { kind: "classify", id: "c", prompt: "p", explain: "e", categories: ["x", "y"], items: [{ text: "1", answer: 0 }, { text: "2", answer: 1 }, { text: "3", answer: 1 }] };
    const r = mark(ex, { kind: "classify", choices: [0, 0, 1] });
    expect(r.correct).toBe(false);
    expect(r.detail?.itemsCorrect).toEqual([true, false, true]);
  });
  it("a response of the wrong kind is simply wrong", () => {
    const ex: Exercise = { kind: "mcq", id: "q", prompt: "p", explain: "e", options: ["a", "b", "c"], answer: 1 };
    expect(mark(ex, { kind: "numeric", value: 1 }).correct).toBe(false);
  });
  it("public exercises never carry answers", () => {
    const pub = JSON.stringify(publicExercise(journal));
    expect(pub).not.toMatch(/1200|"dr"|"cr"|explain/);
  });
  it("quiz score rounds to a percentage", () => {
    expect(quizScore([1, 2, 0], [1, 2, 3])).toBe(67);
  });
});
