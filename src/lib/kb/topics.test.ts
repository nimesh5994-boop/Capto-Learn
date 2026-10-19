import { describe, expect, it } from "vitest";
import { MANUALS } from "./collections";
import { tracks } from "@/content";
import { topicsForDoc } from "./topics";

describe("topicsForDoc", () => {
  it("maps HMRC manuals by manual", () => {
    expect(topicsForDoc("vat-input-tax", "anything")).toEqual(["vat"]);
    expect(topicsForDoc("employment-status-manual", "ESM0500")).toEqual(["ir35"]);
    expect(topicsForDoc("inheritance-tax-manual", "IHTM14000")).toEqual(["capital-taxes"]);
  });
  it("maps cross-topic guidance and policy papers by title", () => {
    expect(topicsForDoc("hmrc-policy-papers", "Inheritance Tax on pensions: technical note")).toEqual(["pensions", "capital-taxes"]);
    expect(topicsForDoc("hm-revenue-customs", "Charge, reclaim and record VAT")).toEqual(["vat"]);
    expect(topicsForDoc("hmt-tax-policy", "The Defence Investment Plan")).toEqual([]);
  });
  it("covers every mirrored manual and only names real courses", () => {
    const real = new Set(tracks().map((t) => t.slug));
    for (const m of MANUALS) {
      const t = topicsForDoc(m.slug, "");
      expect(t.length, m.slug).toBeGreaterThan(0);
      for (const slug of t) expect(real.has(slug), `${m.slug} → ${slug}`).toBe(true);
    }
    for (const slug of topicsForDoc("x", "VAT PAYE pension self assessment capital gains corporation tax director R&D IR35 CIS Companies House FRS 102 money laundering")) expect(real.has(slug), slug).toBe(true);
  });
});
