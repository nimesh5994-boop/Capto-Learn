import { describe, expect, it } from "vitest";
import { TAX_YEARS, currentTaxYear, rate, ratesFor } from "./index";

const REQUIRED_IDS = [
  "it.personal-allowance",
  "it.pa-taper-threshold",
  "it.basic-rate-band",
  "it.basic-rate",
  "it.higher-rate",
  "it.additional-rate-threshold",
  "it.additional-rate",
  "it.dividend-allowance",
  "it.dividend-ordinary-rate",
  "it.dividend-upper-rate",
  "it.dividend-additional-rate",
  "it.psa-basic",
  "it.psa-higher",
  "nic.primary-threshold",
  "nic.upper-earnings-limit",
  "nic.employee-main-rate",
  "nic.employee-additional-rate",
  "nic.secondary-threshold",
  "nic.employer-rate",
  "nic.employment-allowance",
  "cgt.annual-exempt-amount",
  "cgt.basic-rate",
  "cgt.higher-rate",
  "cgt.badr-rate",
  "iht.nil-rate-band",
  "iht.residence-nil-rate-band",
  "iht.rnrb-taper-threshold",
  "iht.rate",
  "iht.charity-rate",
  "ct.main-rate",
  "ct.small-profits-rate",
  "ct.lower-limit",
  "ct.upper-limit",
  "ct.marginal-relief-fraction",
  "vat.registration-threshold",
  "vat.deregistration-threshold",
  "vat.standard-rate",
];

const ALLOWED_SOURCE_HOSTS = [
  /(^|\.)gov\.uk$/, // www.gov.uk, business.gov.uk, legislation.gov.uk, thepensionsregulator.gov.uk ...
  /(^|\.)companieshouse\.gov\.uk$/,
];

/** Amount of an item that must exist and carry a number. */
function amt(taxYear: string, id: string): number {
  const item = rate(taxYear, id);
  if (!item) throw new Error(`${taxYear}: missing ${id}`);
  if (typeof item.amount !== "number") throw new Error(`${taxYear}: ${id} has no amount`);
  return item.amount;
}

describe("tax rates dataset", () => {
  it("lists tax years newest first with unique labels", () => {
    const labels = TAX_YEARS.map((y) => y.taxYear);
    expect(labels).toEqual(["2026/27", "2025/26"]);
    const starts = TAX_YEARS.map((y) => y.startDate);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  for (const year of TAX_YEARS) {
    describe(year.taxYear, () => {
      const items = year.sections.flatMap((s) => s.items);

      it("has consistent dates", () => {
        const startYear = Number(year.taxYear.slice(0, 4));
        expect(year.startDate).toBe(`${startYear}-04-06`);
        expect(year.endDate).toBe(`${startYear + 1}-04-05`);
        expect(year.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });

      it("has unique ids and unique section ids", () => {
        const ids = items.map((i) => i.id);
        expect(new Set(ids).size).toBe(ids.length);
        const sectionIds = year.sections.map((s) => s.id);
        expect(new Set(sectionIds).size).toBe(sectionIds.length);
      });

      it("prefixes every id with a known section prefix", () => {
        for (const item of items) expect(item.id).toMatch(/^(it|scot|nic|emp|cgt|iht|ct|vat|pen|ch)\.[a-z0-9-]+$/);
      });

      it("cites an https official source for every item", () => {
        for (const item of items) {
          const url = new URL(item.source.url);
          expect(url.protocol, item.id).toBe("https:");
          expect(
            ALLOWED_SOURCE_HOSTS.some((re) => re.test(url.hostname)),
            `${item.id} source host ${url.hostname}`,
          ).toBe(true);
          expect(item.source.title.length, item.id).toBeGreaterThan(0);
        }
      });

      it("has a numeric amount wherever the unit is numeric", () => {
        for (const item of items) {
          if (item.unit && item.unit !== "text") {
            expect(typeof item.amount, item.id).toBe("number");
            expect(Number.isFinite(item.amount), item.id).toBe(true);
          }
          // Small-employer statutory pay recovery (108.5% / 109%) is legitimately over 100%.
          if (item.unit === "percent" && item.id !== "emp.statutory-pay-recovery-small-employer") {
            expect(item.amount!, item.id).toBeLessThanOrEqual(100);
          }
          expect(item.value.trim().length, item.id).toBeGreaterThan(0);
        }
      });

      it("contains every required id with an amount", () => {
        for (const id of REQUIRED_IDS) expect(() => amt(year.taxYear, id), id).not.toThrow();
      });

      it("matches the relationships confirmed by the sources", () => {
        const y = year.taxYear;
        const pa = amt(y, "it.personal-allowance");
        const brb = amt(y, "it.basic-rate-band");
        // Higher rate starts at PA + basic rate band (£50,270).
        expect(pa + brb).toBe(amt(y, "it.higher-rate-threshold"));
        // Employee NIC UEL and Class 4 UPL are aligned with the higher rate threshold.
        expect(amt(y, "nic.upper-earnings-limit")).toBe(pa + brb);
        expect(amt(y, "nic.class4-upper-profits-limit")).toBe(pa + brb);
        // Primary threshold and Class 4 LPL equal the Personal Allowance.
        expect(amt(y, "nic.primary-threshold")).toBe(pa);
        expect(amt(y, "nic.class4-lower-profits-limit")).toBe(pa);
        // Personal Allowance is fully withdrawn at £100,000 + 2 × PA (£125,140).
        expect(amt(y, "it.pa-taper-threshold") + 2 * pa).toBe(amt(y, "it.pa-nil-threshold"));
        expect(amt(y, "it.additional-rate-threshold")).toBe(amt(y, "it.pa-nil-threshold"));
        // Auto-enrolment upper qualifying earnings equals the UEL.
        expect(amt(y, "emp.ae-qualifying-earnings-upper")).toBe(amt(y, "nic.upper-earnings-limit"));
        // Corporation Tax marginal relief standard fraction 3/200.
        expect(amt(y, "ct.marginal-relief-fraction")).toBeCloseTo(3 / 200, 10);
        expect(amt(y, "ct.lower-limit")).toBeLessThan(amt(y, "ct.upper-limit"));
        // Scottish band upper limits ascend and the top band starts where the UK additional rate does.
        const scot = ["scot.starter-band-upper", "scot.basic-band-upper", "scot.intermediate-band-upper", "scot.higher-band-upper", "scot.advanced-band-upper"].map((id) => amt(y, id));
        expect([...scot].sort((a, b) => a - b)).toEqual(scot);
        expect(amt(y, "scot.advanced-band-upper")).toBe(amt(y, "it.additional-rate-threshold"));
        // VAT deregistration threshold sits below registration threshold.
        expect(amt(y, "vat.deregistration-threshold")).toBeLessThan(amt(y, "vat.registration-threshold"));
        // PSA tiers.
        expect(amt(y, "it.psa-basic")).toBeGreaterThan(amt(y, "it.psa-higher"));
      });
    });
  }

  it("records the 2026/27 changes against 2025/26", () => {
    expect(amt("2026/27", "it.dividend-ordinary-rate")).toBe(10.75);
    expect(amt("2025/26", "it.dividend-ordinary-rate")).toBe(8.75);
    expect(amt("2026/27", "it.dividend-upper-rate")).toBe(35.75);
    expect(amt("2025/26", "it.dividend-upper-rate")).toBe(33.75);
    expect(amt("2026/27", "ct.s455-rate")).toBe(35.75);
    expect(amt("2025/26", "ct.s455-rate")).toBe(33.75);
    // s455 follows the dividend upper rate (CTM61505).
    for (const y of ["2026/27", "2025/26"]) expect(amt(y, "ct.s455-rate")).toBe(amt(y, "it.dividend-upper-rate"));
    expect(amt("2026/27", "ct.main-pool-wda")).toBe(14);
    expect(amt("2025/26", "ct.main-pool-wda")).toBe(18);
    expect(amt("2026/27", "cgt.badr-rate")).toBe(18);
    expect(amt("2025/26", "cgt.badr-rate")).toBe(14);
    expect(amt("2026/27", "iht.apr-bpr-100-allowance")).toBe(2_500_000);
  });

  it("ratesFor / rate lookups", () => {
    expect(ratesFor("2026/27")?.startDate).toBe("2026-04-06");
    expect(ratesFor("1999/00")).toBeUndefined();
    expect(rate("2026/27", "it.personal-allowance")?.amount).toBe(12570);
    expect(rate("2026/27", "no.such-id")).toBeUndefined();
    expect(rate("1999/00", "it.personal-allowance")).toBeUndefined();
  });

  it("currentTaxYear switches on 6 April (UK time)", () => {
    expect(currentTaxYear(new Date("2026-10-20T12:00:00Z"))).toBe("2026/27");
    expect(currentTaxYear(new Date("2026-04-05T12:00:00Z"))).toBe("2025/26");
    expect(currentTaxYear(new Date("2026-04-06T12:00:00Z"))).toBe("2026/27");
    // 23:30 UTC on 5 April 2026 is 00:30 BST on 6 April.
    expect(currentTaxYear(new Date("2026-04-05T23:30:00Z"))).toBe("2026/27");
    expect(currentTaxYear(new Date("2027-01-15T12:00:00Z"))).toBe("2026/27");
    expect(currentTaxYear(new Date("2099-04-06T12:00:00Z"))).toBe("2099/00");
  });
});
