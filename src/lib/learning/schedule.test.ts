import { describe, expect, it } from "vitest";
import { dueDate, nextBox, pickDaily } from "./schedule";

describe("Leitner scheduling", () => {
  it("moves up a box when right, back to box 1 when wrong, capped at 5", () => {
    expect(nextBox(1, true)).toBe(2);
    expect(nextBox(4, false)).toBe(1);
    expect(nextBox(5, true)).toBe(5);
  });
  it("spaces reviews 1, 3, 7, 16, 35 days out", () => {
    const now = new Date("2026-10-13T15:30:00Z");
    expect(dueDate(1, now).toISOString()).toBe("2026-10-14T04:00:00.000Z");
    expect(dueDate(3, now).toISOString()).toBe("2026-10-20T04:00:00.000Z");
    expect(dueDate(5, now).toISOString()).toBe("2026-11-17T04:00:00.000Z");
  });
});

describe("pickDaily", () => {
  const d = (s: string) => new Date(s);
  it("takes the most overdue first and varies lessons", () => {
    const items = [
      { id: 1, lessonId: "vat/a", dueAt: d("2026-10-01") },
      { id: 2, lessonId: "vat/a", dueAt: d("2026-10-02") },
      { id: 3, lessonId: "payroll/b", dueAt: d("2026-10-05") },
      { id: 4, lessonId: "ct/c", dueAt: d("2026-10-03") },
    ];
    expect(pickDaily(items, 3).map((i) => i.id)).toEqual([1, 4, 3]);
  });
  it("tops up from the same lessons when fewer than five lessons are due", () => {
    const items = [
      { id: 1, lessonId: "vat/a", dueAt: d("2026-10-01") },
      { id: 2, lessonId: "vat/a", dueAt: d("2026-10-02") },
    ];
    expect(pickDaily(items).map((i) => i.id)).toEqual([1, 2]);
  });
});
