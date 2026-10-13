import { describe, expect, it } from "vitest";
import { judgeIntegrity, levelQuota, markInterview, newCredentials, pickInterviewQuestions, type PoolTrack } from "./rules";

const pool: PoolTrack[] = ["vat", "payroll"].map((slug) => ({
  slug,
  lessons: (["foundation", "practitioner", "advanced"] as const).flatMap((level) =>
    [1, 2, 3].map((n) => ({ id: `${slug}/${level}-${n}`, level, questionIds: ["q1", "q2", "q3"] }))
  ),
}));

describe("levelQuota", () => {
  it("splits the count by the difficulty's mix and always adds up", () => {
    for (const n of [5, 10, 13, 20, 30]) for (const d of ["trainee", "experienced", "senior"] as const) {
      const q = levelQuota(n, d);
      expect(q.foundation + q.practitioner + q.advanced).toBe(n);
    }
    expect(levelQuota(20, "trainee").advanced).toBe(0);
    expect(levelQuota(20, "senior").foundation).toBe(0);
  });
});

describe("pickInterviewQuestions", () => {
  it("gives the requested number, spread across subjects, no repeats", () => {
    const qs = pickInterviewQuestions(pool, ["vat", "payroll"], 12, "experienced", "seed-1");
    expect(qs).toHaveLength(12);
    expect(new Set(qs.map((q) => `${q.lessonId}#${q.questionId}`)).size).toBe(12);
    expect(qs.filter((q) => q.track === "vat").length).toBe(6);
  });
  it("is different for a different candidate", () => {
    const a = pickInterviewQuestions(pool, ["vat"], 6, "experienced", "seed-1").map((q) => q.lessonId + q.questionId).join();
    const b = pickInterviewQuestions(pool, ["vat"], 6, "experienced", "seed-2").map((q) => q.lessonId + q.questionId).join();
    expect(a).not.toBe(b);
  });
});

describe("markInterview", () => {
  it("scores overall, by subject and by level", () => {
    const qs = pickInterviewQuestions(pool, ["vat", "payroll"], 4, "experienced", "s");
    const answers = Object.fromEntries(qs.map((q, i) => [`${q.lessonId}#${q.questionId}`, { choice: i < 3 ? 0 : 1 }]));
    const m = markInterview(qs, answers, () => 0);
    expect(m).toMatchObject({ right: 3, total: 4, score: 75 });
  });
});

describe("judgeIntegrity", () => {
  const t = "2026-10-14T10:00:00Z";
  it("is clear with nothing logged", () => {
    expect(judgeIntegrity([{ t, type: "started" }]).flag).toBe("clear");
  });
  it("flags a single short absence for review", () => {
    expect(judgeIntegrity([{ t, type: "left" }, { t, type: "returned", ms: 4000 }]).flag).toBe("review");
  });
  it("flags paste attempts, repeated or long absences as a concern", () => {
    expect(judgeIntegrity([{ t, type: "paste" }]).flag).toBe("concern");
    expect(judgeIntegrity([{ t, type: "left" }, { t, type: "returned", ms: 45000 }]).flag).toBe("concern");
    const three = Array.from({ length: 3 }, () => [{ t, type: "left" }, { t, type: "returned", ms: 1000 }]).flat();
    expect(judgeIntegrity(three).flag).toBe("concern");
  });
});

describe("newCredentials", () => {
  it("makes an unguessable token and an easy-to-type code", () => {
    const c = newCredentials();
    expect(c.token.length).toBeGreaterThanOrEqual(30);
    expect(c.code).toMatch(/^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  });
});
