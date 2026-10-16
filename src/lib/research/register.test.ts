import { describe, expect, it } from "vitest";
import { canViewAnswer, costPence, matchesRegister, parseDay, parseReviewFilter, routeLabel } from "./register";

describe("canViewAnswer", () => {
  const row = { organizationId: "f1", userId: "u1", shared: false, reviewStatus: null };
  const viewer = { orgId: "f1", userId: "u2", canRegister: false };
  it("lets the asker see their own answer, and colleagues only once shared or approved", () => {
    expect(canViewAnswer(row, { ...viewer, userId: "u1" })).toBe(true);
    expect(canViewAnswer(row, viewer)).toBe(false);
    expect(canViewAnswer({ ...row, shared: true }, viewer)).toBe(true);
    expect(canViewAnswer({ ...row, reviewStatus: "approved" }, viewer)).toBe(true);
    expect(canViewAnswer({ ...row, reviewStatus: "changes" }, viewer)).toBe(false);
  });
  it("lets reviewers see everything in their firm, but never another firm's answers", () => {
    expect(canViewAnswer(row, { ...viewer, canRegister: true })).toBe(true);
    expect(canViewAnswer({ ...row, reviewStatus: "approved", shared: true }, { orgId: "f2", userId: "u1", canRegister: true })).toBe(false);
  });
});

describe("register helpers", () => {
  it("labels how an answer was produced", () => {
    expect(routeLabel("sonnet>opus")).toBe("Standard, escalated to Expert");
    expect(routeLabel("instant")).toBe("Instant (no AI)");
    expect(routeLabel(null)).toBe("—");
  });
  it("filters by question, person or document reference", () => {
    const r = { question: "Overdrawn DLA at year end", askedBy: "Jo Bloggs", docRefs: ["CL-A6509153"] };
    expect(matchesRegister("dla jo", r)).toBe(true);
    expect(matchesRegister("cl-a650", r)).toBe(true);
    expect(matchesRegister("vat", r)).toBe(false);
  });
  it("parses filters safely", () => {
    expect(parseReviewFilter("approved")).toBe("approved");
    expect(parseReviewFilter("drop table")).toBe("all");
    expect(parseDay("2026-10-01")?.toISOString()).toBe("2026-10-01T00:00:00.000Z");
    expect(parseDay("01/10/2026")).toBeNull();
    expect(costPence(100_000)).toBe(7.9);
  });
});
