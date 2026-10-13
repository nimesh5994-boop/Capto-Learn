import { describe, expect, it } from "vitest";
import { skillBand, skillScore, type LessonState } from "./skills";

const L = (level: LessonState["level"], completed: boolean, bestQuiz: number | null = completed ? 100 : null): LessonState => ({ level, completed, bestQuiz });

describe("skillScore", () => {
  it("is zero with nothing done", () => {
    expect(skillScore([L("foundation", false), L("advanced", false)]).score).toBe(0);
  });
  it("is 100 when everything is complete with perfect quizzes", () => {
    const s = skillScore([L("foundation", true), L("practitioner", true), L("advanced", true)]);
    expect(s.score).toBe(100);
    expect(s.levelReached).toBe("advanced");
  });
  it("weights coverage 60% and accuracy 40%", () => {
    // half the lessons done, both quizzes taken at 80% average
    const s = skillScore([L("foundation", true, 90), L("foundation", false, 70), L("practitioner", false), L("practitioner", false)]);
    expect(s.score).toBe(Math.round(100 * (0.6 * 0.25 + 0.4 * 0.8)));
  });
  it("reports the highest fully completed level, in order", () => {
    expect(skillScore([L("foundation", true), L("practitioner", false), L("advanced", true)]).levelReached).toBe("foundation");
    expect(skillScore([L("foundation", false), L("practitioner", true)]).levelReached).toBeNull();
  });
  it("blends in Daily 5 recall once there are at least five reviews", () => {
    const lessons = [L("foundation", true, 100)];
    expect(skillScore(lessons, { right: 0, total: 4 }).accuracy).toBe(1);
    expect(skillScore(lessons, { right: 5, total: 10 }).accuracy).toBeCloseTo(0.85);
  });
});

describe("skillBand", () => {
  it("maps scores to plain words", () => {
    expect([0, 10, 45, 70, 90].map(skillBand)).toEqual(["Not started", "Getting started", "Developing", "Competent", "Strong"]);
  });
});
