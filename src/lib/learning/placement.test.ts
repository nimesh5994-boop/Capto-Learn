import { describe, expect, it } from "vitest";
import { adaptiveNext, nextLevel, pickPlacement, placeAdaptive, placeSubject, suggestedOrder, type PlacementPoolTrack } from "./placement";

const pool: PlacementPoolTrack[] = [
  {
    slug: "vat",
    lessons: [
      { id: "vat/a", level: "foundation", questionIds: ["q1", "q2"] },
      { id: "vat/b", level: "foundation", questionIds: ["q1"] },
      { id: "vat/c", level: "practitioner", questionIds: ["q1", "q2"] },
      { id: "vat/d", level: "advanced", questionIds: ["q1"] },
    ],
  },
  { slug: "cis", lessons: [{ id: "cis/a", level: "foundation", questionIds: ["q1"] }] },
];

describe("pickPlacement", () => {
  it("takes one question per level from each chosen subject", () => {
    const qs = pickPlacement(pool, ["vat"], "user-1");
    expect(qs.map((q) => q.level)).toEqual(["foundation", "practitioner", "advanced"]);
    expect(qs.every((q) => q.track === "vat")).toBe(true);
  });
  it("is repeatable for the same seed and skips levels a subject doesn't have", () => {
    expect(pickPlacement(pool, ["vat", "cis"], "s")).toEqual(pickPlacement(pool, ["vat", "cis"], "s"));
    expect(pickPlacement(pool, ["cis"], "s")).toHaveLength(1);
  });
  it("varies with the seed", () => {
    const seen = new Set(Array.from({ length: 20 }, (_, i) => pickPlacement(pool, ["vat"], `seed${i}`)[0].lessonId + pickPlacement(pool, ["vat"], `seed${i}`)[0].questionId));
    expect(seen.size).toBeGreaterThan(1);
  });
});

describe("placeSubject", () => {
  const r = (f: boolean, p: boolean, a: boolean) =>
    placeSubject([
      { level: "foundation", correct: f },
      { level: "practitioner", correct: p },
      { level: "advanced", correct: a },
    ]);
  it("starts at the first level answered wrongly", () => {
    expect(r(false, true, true).start).toBe("foundation");
    expect(r(true, false, true).start).toBe("practitioner");
    expect(r(true, true, false).start).toBe("advanced");
  });
  it("marks all-correct as strong", () => {
    expect(r(true, true, true)).toMatchObject({ start: "advanced", strong: true, right: 3 });
    expect(r(true, true, false).strong).toBe(false);
  });
});

describe("suggestedOrder", () => {
  it("puts the weakest subject first", () => {
    const res = { vat: { right: 3, total: 3, start: "advanced" as const, strong: true }, cis: { right: 0, total: 3, start: "foundation" as const, strong: false } };
    expect(suggestedOrder(res)).toEqual(["cis", "vat"]);
  });
});


describe("adaptive skills check", () => {
  const all = new Set(["foundation", "practitioner", "advanced"] as const);
  it("starts at Practitioner and moves up or down", () => {
    expect(nextLevel([], all)).toBe("practitioner");
    expect(nextLevel([{ level: "practitioner", correct: true }], all)).toBe("advanced");
    expect(nextLevel([{ level: "practitioner", correct: false }], all)).toBe("foundation");
  });
  it("confirms only the borderline case, then stops", () => {
    expect(nextLevel([{ level: "practitioner", correct: true }, { level: "advanced", correct: false }], all)).toBe("practitioner");
    expect(nextLevel([{ level: "practitioner", correct: true }, { level: "advanced", correct: true }], all)).toBeNull();
    expect(nextLevel([{ level: "practitioner", correct: false }, { level: "foundation", correct: true }], all)).toBeNull();
  });
  it("places from the adaptive answers", () => {
    const P = (c: boolean) => ({ level: "practitioner" as const, correct: c });
    const A = (c: boolean) => ({ level: "advanced" as const, correct: c });
    const F = (c: boolean) => ({ level: "foundation" as const, correct: c });
    expect(placeAdaptive([P(true), A(true)])).toMatchObject({ start: "advanced", strong: true });
    expect(placeAdaptive([P(true), A(false), P(true)])).toMatchObject({ start: "advanced", strong: false });
    expect(placeAdaptive([P(true), A(false), P(false)])).toMatchObject({ start: "practitioner" });
    expect(placeAdaptive([P(false), F(true)])).toMatchObject({ start: "practitioner" });
    expect(placeAdaptive([P(false), F(false)])).toMatchObject({ start: "foundation" });
  });
  it("walks subjects in order and rotates away from questions seen before", () => {
    const first = adaptiveNext(pool, ["vat"], "s", [], new Set());
    expect(first).toMatchObject({ track: "vat", level: "practitioner" });
    // Seen last time → a different practitioner question this time.
    const second = adaptiveNext(pool, ["vat"], "s", [], new Set([first!.key]));
    expect(second!.key).not.toBe(first!.key);
    expect(second!.level).toBe("practitioner");
    // After P right + A right the subject is settled; the next subject begins.
    const done = adaptiveNext(pool, ["vat", "cis"], "s", [
      { key: "vat/c#q1", track: "vat", level: "practitioner", correct: true },
      { key: "vat/d#q1", track: "vat", level: "advanced", correct: true },
    ], new Set());
    expect(done).toMatchObject({ track: "cis", level: "foundation" });
  });
});
