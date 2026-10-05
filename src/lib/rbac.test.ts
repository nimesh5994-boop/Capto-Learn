import { describe, expect, it } from "vitest";
import { ALL_PERMISSIONS, BUILT_IN_ROLES, BUILT_IN_ROLE_KEYS, permissionsFor } from "./rbac";
import { accountState, hasFeature, planOf } from "./plans";

describe("rbac", () => {
  it("owner has everything; admin everything but billing", () => {
    expect(permissionsFor("owner").size).toBe(ALL_PERMISSIONS.length);
    expect(permissionsFor("admin").has("billing.manage")).toBe(false);
    expect(permissionsFor("admin").has("team.manage")).toBe(true);
  });
  it("staff learn and research but can't see the team, assign training or manage people", () => {
    const staff = permissionsFor("staff");
    for (const p of ["progress.view_team", "assignments.manage", "team.manage", "settings.firm"] as const) expect(staff.has(p)).toBe(false);
    expect(staff.has("learning.view")).toBe(true);
    expect(staff.has("research.use")).toBe(true);
  });
  it("trainee (viewer) can only take courses", () => {
    expect([...permissionsFor("viewer")]).toEqual(["learning.view"]);
  });
  it("custom role permissions replace the base role and ignore unknown keys", () => {
    const p = permissionsFor("staff", ["learning.view", "not.a.permission"]);
    expect([...p]).toEqual(["learning.view"]);
  });
  it("unknown role gets nothing", () => expect(permissionsFor("hacker").size).toBe(0));
  it("each built-in role is a subset of the one above it", () => {
    const order = BUILT_IN_ROLE_KEYS;
    for (let i = 1; i < order.length - 1; i++) {
      const lower = BUILT_IN_ROLES[order[i + 1]].permissions;
      expect(lower.every((p) => (BUILT_IN_ROLES[order[i]].permissions as readonly string[]).includes(p))).toBe(true);
    }
  });
});

describe("plans", () => {
  const day = 86_400_000;
  it("derives account state", () => {
    expect(accountState({ plan: "trial", trialEndsAt: new Date(Date.now() + day), status: "active" })).toBe("trial");
    expect(accountState({ plan: "trial", trialEndsAt: new Date(Date.now() - day), status: "active" })).toBe("trial_expired");
    expect(accountState({ plan: "starter", trialEndsAt: null, status: "active" })).toBe("active");
    expect(accountState({ plan: "practice", trialEndsAt: null, status: "suspended" })).toBe("suspended");
  });
  it("gates features by plan and falls back to trial for unknown plans", () => {
    expect(hasFeature("starter", "assignments")).toBe(false);
    expect(hasFeature("professional", "assignments")).toBe(true);
    expect(hasFeature("starter", "research")).toBe(true);
    expect(hasFeature("professional", "auditLog")).toBe(false);
    expect(planOf("bogus").key).toBe("trial");
  });
});

import { PLATFORM_ROLES, PLATFORM_ROLE_KEYS, isPlatformRole, platformPermissionsFor } from "./rbac";

describe("platform rbac", () => {
  it("super admin has every platform permission, including managing the platform team", () => {
    expect(platformPermissionsFor("super_admin").has("platform.team.manage")).toBe(true);
    expect(platformPermissionsFor("super_admin").size).toBe(PLATFORM_ROLES.super_admin.permissions.length);
  });
  it("only super admin can manage the platform team", () => {
    for (const k of PLATFORM_ROLE_KEYS.filter((k) => k !== "super_admin")) expect(platformPermissionsFor(k).has("platform.team.manage")).toBe(false);
  });
  it("billing can re-plan but not suspend; read-only can only view", () => {
    expect(platformPermissionsFor("billing").has("platform.firms.plan")).toBe(true);
    expect(platformPermissionsFor("billing").has("platform.firms.suspend")).toBe(false);
    expect([...platformPermissionsFor("readonly")]).toEqual(["platform.firms.view"]);
  });
  it("no role means no platform access, and junk values aren't roles", () => {
    expect(platformPermissionsFor(null).size).toBe(0);
    expect(isPlatformRole("owner")).toBe(false);
    expect(isPlatformRole(null)).toBe(false);
  });
});
