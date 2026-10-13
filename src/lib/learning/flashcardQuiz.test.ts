import { describe, expect, it } from "vitest";
import { allLessons } from "@/content";
import { lessonFlashcards } from "@/content/flashcards";
import { answerKind, distractors, quizOptions, type QuizCard } from "./flashcardQuiz";

const card = (id: string, lessonId: string, back: string): QuizCard => ({ id, lessonId, front: `Q ${id}?`, back });

describe("answerKind", () => {
  it("groups answers so wrong options look like right ones", () => {
    expect(answerKind("£90,000 of taxable turnover")).toBe("money");
    expect(answerKind("35.75% of the loan")).toBe("percent");
    expect(answerKind("31 January after the tax year")).toBe("date");
    expect(answerKind("Within 30 days")).toBe("period");
    expect(answerKind("Chapter 8")).toBe("number");
    expect(answerKind("The customer accounts for the VAT")).toBe("text");
  });
});

describe("distractors", () => {
  const pool = [
    card("a", "vat/x", "£90,000"),
    card("b", "vat/y", "£88,000"),
    card("c", "vat/z", "£150 a head"),
    card("d", "payroll/p", "£5,000"),
    card("e", "payroll/q", "15%"),
    card("f", "vat/w", "£90,000 of turnover"),
  ];
  it("uses same-kind answers, never the right one or a near-copy of it", () => {
    const w = distractors(pool[0], pool)!;
    expect(w).toHaveLength(3);
    expect(w).not.toContain("15%");
    expect(w).not.toContain("£90,000 of turnover");
    expect(w).not.toContain("£90,000");
  });
  it("prefers the same course (same lesson first)", () => {
    expect(distractors(pool[0], pool)!.slice(0, 2).sort()).toEqual(["£150 a head", "£88,000"]);
  });
  it("gives up rather than offer obvious wrong answers", () => {
    expect(distractors(pool[4], pool)).toBeNull();
  });
  it("shuffles the right answer in, stably", () => {
    const a = quizOptions(pool[0], pool)!;
    expect(a.options[a.answer]).toBe("£90,000");
    expect(quizOptions(pool[0], pool)).toEqual(a);
  });
});

describe("the real cards", () => {
  it("most cards can be asked as multiple choice", () => {
    const cards = allLessons().flatMap((r) => lessonFlashcards(r.id));
    const ok = cards.filter((c) => quizOptions(c, cards)).length;
    expect(ok / cards.length).toBeGreaterThan(0.9);
  });
});
