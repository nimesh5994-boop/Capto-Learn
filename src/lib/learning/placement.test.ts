import { describe, expect, it } from "vitest";
import { pickPlacement, placeSubject, suggestedOrder, type PlacementPoolTrack } from "./placement";

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
