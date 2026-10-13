import { describe, expect, it } from "vitest";
import type { Exercise } from "@/content/types";
import { coachReport, journalMistake, numericMistake, type QuestionInfo } from "./coach";

describe("numericMistake", () => {
  it("spots VAT-inclusive/exclusive slips", () => {
    expect(numericMistake(1200, 1000)).toBe("vat_inclusive");
    expect(numericMistake(1000, 1200)).toBe("vat_inclusive");
  });
  it("spots decimal slips and near-miss rounding", () => {
    expect(numericMistake(45000, 4500)).toBe("decimal_slip");
    expect(numericMistake(4501, 4500)).toBe("rounding");
    expect(numericMistake(3000, 4500)).toBeNull();
  });
});

describe("journalMistake", () => {
  const want = [
    { account: "Rent", dr: 1000 },
    { account: "Bank", cr: 1000 },
  ];
  it("spots reversed sides, missing accounts and imbalance", () => {
    expect(journalMistake([{ account: "Bank", dr: 1000 }, { account: "rent", cr: 1000 }], want)).toBe("sides_reversed");
    expect(journalMistake([{ account: "Rent", dr: 1000 }, { account: "Cash", cr: 1000 }], want)).toBe("missing_account");
    expect(journalMistake([{ account: "Rent", dr: 1000 }, { account: "Bank", cr: 900 }], want)).toBe("unbalanced");
  });
});

describe("coachReport", () => {
  const mcq: Exercise = { kind: "mcq", id: "q1", prompt: "Which?", options: ["a", "b", "c"], answer: 0, explain: "Because a." };
  const num: Exercise = { kind: "numeric", id: "n1", prompt: "How much VAT?", answer: 200, explain: "1/6 of 1,200." };
  const info = (ex: Exercise, track = "vat"): QuestionInfo => ({ ex, lessonTitle: `Lesson ${ex.id}`, track, trackTitle: track.toUpperCase(), level: "foundation" });
  const lookup = (_l: string, e: string) => (e === "q1" ? info(mcq) : e === "n1" ? info(num) : undefined);
  const at = (exerciseId: string, correct: boolean, response: unknown, daysAgo = 1) => ({ lessonId: "vat/x", exerciseId, correct, response, createdAt: new Date(Date.now() - daysAgo * 86_400_000) });

  it("finds stuck questions, recurring wrong options and calculation slips", () => {
    const r = coachReport(
      [at("q1", false, { kind: "mcq", choice: 2 }, 3), at("q1", false, { kind: "mcq", choice: 2 }, 2), at("n1", false, { kind: "numeric", value: 240 }), at("n1", true, { kind: "numeric", value: 200 }, 0)],
      lookup
    );
    expect(r.attempts).toBe(4);
    expect(r.accuracy).toBe(25);
    expect(r.stuck.map((s) => s.exerciseId)).toEqual(["q1"]);
    expect(r.mistakes.map((m) => m.kind).sort()).toEqual(["same_wrong_option", "vat_inclusive"]);
    expect(r.suggestions.some((s) => s.href === "/learn/vat/x")).toBe(true);
  });
  it("ignores attempts on questions that no longer exist and copes with none", () => {
    expect(coachReport([at("gone", false, null)], lookup).attempts).toBe(0);
    expect(coachReport([], lookup).suggestions).toEqual([]);
  });
});
