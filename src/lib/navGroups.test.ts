import { describe, expect, it } from "vitest";
import { NAV_ITEMS, type NavKey } from "@/components/navItems";
import { NAV_CATEGORIES, RAIL_PERSONAL, RAIL_QUICK, categoriesFor, categoryOf } from "./navGroups";

const ALL = Object.keys(NAV_ITEMS) as NavKey[];

describe("nav categories", () => {
  it("places every NavKey in exactly one category", () => {
    const placed = NAV_CATEGORIES.flatMap((c) => c.keys);
    expect(new Set(placed).size).toBe(placed.length);
    expect([...placed].sort()).toEqual([...ALL].sort());
  });

  it("gives every item a description", () => {
    for (const k of ALL) expect(NAV_ITEMS[k].description.trim().length, k).toBeGreaterThan(8);
  });

  it("drops empty categories and keeps only visible keys", () => {
    const cats = categoriesFor(["dashboard", "rates"]);
    expect(cats.map((c) => c.id)).toEqual(["learn", "tools"]);
    expect(cats[0].keys).toEqual(["dashboard"]);
    expect(categoriesFor([])).toEqual([]);
  });

  it("keeps a stable order regardless of input order", () => {
    const a = categoriesFor([...ALL].reverse());
    const b = categoriesFor(ALL);
    expect(a).toEqual(b);
    expect(b.map((c) => c.id)).toEqual(["learn", "research", "tools", "team", "admin", "platform"]);
  });

  it("finds a key's category", () => {
    expect(categoryOf("cases")).toBe("research");
    expect(categoryOf("platform.content")).toBe("platform");
  });

  it("rail blocks only reference real nav keys, without repeats", () => {
    for (const k of [...RAIL_PERSONAL, ...RAIL_QUICK]) expect(NAV_ITEMS[k], k).toBeDefined();
    const all = [...RAIL_PERSONAL, ...RAIL_QUICK];
    expect(new Set(all).size).toBe(all.length);
  });
});
