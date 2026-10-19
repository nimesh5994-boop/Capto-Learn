import { describe, expect, it } from "vitest";
import { scoreBenchmark } from "./benchmarkRules";

const d = (s: string) => new Date(s);

describe("scoreBenchmark", () => {
  it("counts each active question once, by its latest graded answer", () => {
    const s = scoreBenchmark(
      [
        { questionId: "a", verdict: "wrong", gradedAt: d("2026-10-01") },
        { questionId: "a", verdict: "correct", gradedAt: d("2026-10-10") }, // re-run after a fix
        { questionId: "b", verdict: "partial", gradedAt: d("2026-10-05") },
        { questionId: "c", verdict: null, gradedAt: null }, // run but not graded yet
        { questionId: "old", verdict: "wrong", gradedAt: d("2026-10-09") }, // retired question
      ],
      new Set(["a", "b", "c"])
    );
    expect(s).toEqual({ graded: 2, correct: 1, partial: 1, wrong: 0, lastGraded: d("2026-10-10") });
  });
  it("has no score until something is graded", () => {
    expect(scoreBenchmark([{ questionId: "a", verdict: null, gradedAt: null }], new Set(["a"]))).toBeNull();
  });
});
