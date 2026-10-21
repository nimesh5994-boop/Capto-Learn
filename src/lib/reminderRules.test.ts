import { describe, expect, it } from "vitest";
import { assignmentPath, daysUntilDue, reminderStage } from "./reminderRules";

const due = (ymd: string) => new Date(`${ymd}T23:59:59Z`);
const base = { dueDate: due("2026-10-24"), createdAt: new Date("2026-10-01T09:00:00Z"), cancelledAt: null, dueSoonSentAt: null, overdueSentAt: null };
const at = (iso: string) => new Date(iso);

describe("daysUntilDue", () => {
  it("counts calendar days", () => {
    expect(daysUntilDue(due("2026-10-24"), at("2026-10-21T03:00:00Z"))).toBe(3);
    expect(daysUntilDue(due("2026-10-24"), at("2026-10-24T20:00:00Z"))).toBe(0);
  });
});

describe("reminderStage", () => {
  it("sends the due-soon reminder from 3 days before", () => {
    expect(reminderStage(base, false, at("2026-10-20T03:00:00Z"))).toBeNull(); // 4 days
    expect(reminderStage(base, false, at("2026-10-21T03:00:00Z"))).toBe("due_soon");
    expect(reminderStage(base, false, at("2026-10-24T03:00:00Z"))).toBe("due_soon"); // due today
  });
  it("sends each reminder once", () => {
    expect(reminderStage({ ...base, dueSoonSentAt: at("2026-10-21T03:00:00Z") }, false, at("2026-10-22T03:00:00Z"))).toBeNull();
    expect(reminderStage({ ...base, overdueSentAt: at("2026-10-25T03:00:00Z") }, false, at("2026-10-26T03:00:00Z"))).toBeNull();
  });
  it("sends the overdue reminder the day it becomes overdue, never as a backlog", () => {
    expect(reminderStage(base, false, at("2026-10-25T03:00:00Z"))).toBe("overdue");
    expect(reminderStage({ ...base, dueSoonSentAt: at("2026-10-21T03:00:00Z") }, false, at("2026-10-25T03:00:00Z"))).toBe("overdue");
    expect(reminderStage(base, false, at("2026-10-28T03:00:00Z"))).toBeNull(); // long overdue already
  });
  it("never reminds about finished, cancelled or undated training", () => {
    expect(reminderStage(base, true, at("2026-10-22T03:00:00Z"))).toBeNull();
    expect(reminderStage(base, true, at("2026-10-25T03:00:00Z"))).toBeNull();
    expect(reminderStage({ ...base, cancelledAt: at("2026-10-02T00:00:00Z") }, false, at("2026-10-22T03:00:00Z"))).toBeNull();
    expect(reminderStage({ ...base, dueDate: null }, false, at("2026-10-22T03:00:00Z"))).toBeNull();
  });
  it("skips the due-soon reminder for training assigned in the last day (the assignment email covered it)", () => {
    expect(reminderStage({ ...base, createdAt: at("2026-10-21T00:00:00Z") }, false, at("2026-10-21T03:00:00Z"))).toBeNull();
  });
});

describe("assignmentPath", () => {
  it("opens the course or lesson", () => {
    expect(assignmentPath("track", "vat")).toBe("/learn/vat");
    expect(assignmentPath("lesson", "vat/flat-rate")).toBe("/learn/vat/flat-rate");
    expect(assignmentPath("module", "vat/basics")).toBe("/learn/vat");
  });
});
