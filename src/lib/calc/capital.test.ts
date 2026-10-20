/**
 * Tests for the capital taxes calculators (CGT with disposals, private
 * residence relief, IHT with lifetime gifts, SDLT).
 *
 * Every expected figure is a checked answer from a Capto Learn lesson (file and
 * exercise id cited) or a GOV.UK / HMRC manual worked example (URL cited).
 */
import { describe, expect, it } from "vitest";
import { TAX_YEARS } from "@/content/rates";
import { capitalGainsTax } from "./capitalGainsTax";
import { inheritanceTax } from "./inheritanceTax";
import { CalcInputError } from "./common";
import {
  type CgtDisposal,
  type CgtFullInput,
  type IhtFullInput,
  type LifetimeGift,
  addYears,
  cgtFull,
  disposalGain,
  endOfMonthAfter,
  inheritanceTaxFull,
  lettingsReliefAmount,
  privateResidenceRelief,
  stampDutyLandTax,
  validateCgtFull,
  validateIhtFull,
  validatePrr,
  validateSdlt,
  wholeYearsBetween,
  yearsBandNotMoreThan,
} from "./capital";

const Y = "2026/27";

// ---------------------------------------------------------------- CGT

const disp = (gain: number, extra: Partial<CgtDisposal> = {}): CgtDisposal => ({
  proceeds: Math.max(0, gain),
  cost: Math.max(0, -gain),
  enhancement: 0,
  incidentalCosts: 0,
  assetType: "other",
  relief: "none",
  ...extra,
});
const cgt = (disposals: CgtDisposal[], extra: Partial<CgtFullInput> = {}) =>
  cgtFull({ taxYear: Y, taxpayer: "individual", disposals, lossesBroughtForward: 0, taxableIncome: 0, ...extra });

describe("cgtFull — individuals", () => {
  it("capital-taxes/cgt-computation-rates-and-annual-exempt-amount › Nadia Rahman: gain £50,000, CGT £10,063.80", () => {
    const d: CgtDisposal = { proceeds: 92000, cost: 40000, enhancement: 0, incidentalCosts: 2000, assetType: "other", relief: "none" };
    expect(disposalGain(d)).toBe(50000);
    const r = cgt([d], { taxableIncome: 30000 - 12570 });
    expect(r.unusedBasicRateBand).toBe(20270);
    expect(r.tax).toBe(10063.8);
  });

  it("capital-taxes/cgt-computation-… › exercise gain with enhancement: £39,500", () => {
    expect(disposalGain({ proceeds: 120000, cost: 70000, enhancement: 5000, incidentalCosts: 2500 + 3000, assetType: "other", relief: "none" })).toBe(39500);
  });

  it("capital-taxes/cgt-computation-… › taxable gain after AEA: £11,200 → £8,200", () => {
    expect(cgt([disp(11200)]).taxableGains).toBe(8200);
  });

  it("capital-taxes/business-asset-disposal-relief › badr-tax £44,460, limit-exceeded £101,280, Owen Marsh £69,660 (due 31 January 2028)", () => {
    expect(cgt([disp(250000, { relief: "badr" })]).tax).toBe(44460);
    const over = cgt([disp(500000, { relief: "badr" })], { badrLifetimeUsed: 700000 });
    expect(over.badrOverLimit).toBe(200000);
    expect(over.tax).toBe(101280);
    const owen = cgt([{ proceeds: 400000, cost: 10000, enhancement: 0, incidentalCosts: 0, assetType: "other", relief: "badr" }], { taxableIncome: 150000 });
    expect(owen.tax).toBe(69660);
    expect(owen.paymentDueDate).toBe("2028-01-31");
  });

  it("capital-taxes/cgt-losses-spouses-and-separation › Gareth: current-year loss in full, £14,000 b/f used, £6,000 carried forward", () => {
    const r = cgt([disp(25000), disp(-8000)], { lossesBroughtForward: 20000, taxableIncome: 60000 });
    expect(r.currentYearLosses).toBe(8000);
    expect(r.lossesBroughtForwardUsed).toBe(14000);
    expect(r.lossesCarriedForward).toBe(6000);
    expect(r.tax).toBe(0);
  });

  it("capital-taxes/cgt-losses-spouses-and-separation › b-f-losses-used: £11,000 used, £19,000 c/f", () => {
    const r = cgt([disp(14000)], { lossesBroughtForward: 30000, taxableIncome: 60000 });
    expect(r.lossesBroughtForwardUsed).toBe(11000);
    expect(r.lossesCarriedForward).toBe(19000);
  });

  it("capital-taxes/cgt-losses-spouses-and-separation › John and Mary: £6,480 alone; £2,880 + £2,160 split", () => {
    expect(cgt([disp(30000)], { taxableIncome: 200000 }).tax).toBe(6480);
    expect(cgt([disp(15000)], { taxableIncome: 200000 }).tax).toBe(2880);
    expect(cgt([disp(15000)], { taxableIncome: 0 }).tax).toBe(2160);
  });

  it("current-year losses above gains carry forward; nothing wasted against the AEA", () => {
    const r = cgt([disp(5000), disp(-9000)]);
    expect(r.tax).toBe(0);
    expect(r.lossesCarriedForward).toBe(4000);
  });

  it("losses and the AEA go against ordinary gains before BADR gains", () => {
    // Ordinary £20,000, BADR £30,000, loss £10,000, no income: BADR £30,000 × 18% uses the band; ordinary £7,000 × 18%.
    const r = cgt([disp(20000), disp(30000, { relief: "badr" }), disp(-10000)]);
    expect(r.badrTaxable).toBe(30000);
    expect(r.ordinaryTaxable).toBe(7000);
    expect(r.tax).toBe(30000 * 0.18 + 7000 * 0.18);
  });

  it("Investors' Relief at its own rate and lifetime limit", () => {
    const r = cgt([disp(103000, { relief: "ir" })], { irLifetimeUsed: 950000, taxableIncome: 100000 });
    expect(r.irOverLimit).toBe(53000);
    expect(r.irTaxable).toBe(50000);
    expect(r.tax).toBe(50000 * 0.18 + 50000 * 0.24);
  });

  it("basic rate band extension for Gift Aid / RAS pension contributions", () => {
    const r = cgt([disp(13000)], { taxableIncome: 37700, basicRateBandExtension: 10000 });
    expect(r.tax).toBe(10000 * 0.18);
  });

  it("2025/26: BADR at 14%", () => {
    expect(cgtFull({ taxYear: "2025/26", taxpayer: "individual", disposals: [disp(103000, { relief: "badr" })], lossesBroughtForward: 0, taxableIncome: 0 }).tax).toBe(14000);
  });

  it("agrees with the original single-figure CGT calculator", () => {
    for (const [g, b, inc, l] of [
      [50000, 0, 17430, 0],
      [100000, 60000, 20000, 5000],
      [390000, 390000, 150000, 0],
      [14000, 0, 60000, 30000],
      [47700, 37700, 0, 0],
    ]) {
      const old = capitalGainsTax({ taxYear: Y, gains: g, badrGains: b, otherTaxableIncome: inc, lossesBroughtForward: l });
      const disposals = [disp(g - b), ...(b ? [disp(b, { relief: "badr" as const })] : [])];
      expect(cgt(disposals, { taxableIncome: inc, lossesBroughtForward: l }).tax).toBe(old.tax);
    }
  });

  it("edge: no disposals, gains within the AEA, exact AEA", () => {
    expect(cgt([]).tax).toBe(0);
    expect(cgt([disp(3000)]).tax).toBe(0);
    expect(cgt([disp(3001)]).tax).toBe(0.18);
  });
});

describe("cgtFull — trustees and personal representatives", () => {
  // GOV.UK CGT rates and allowances: trustees £1,500, 24%; PRs £3,000 for the year of death and next 2 years, 24%.
  // https://www.gov.uk/guidance/capital-gains-tax-rates-and-allowances
  it("trustees: £1,500 AEA and 24%", () => {
    const r = cgt([disp(20000)], { taxpayer: "trustee" });
    expect(r.annualExemptAmount).toBe(1500);
    expect(r.tax).toBe(18500 * 0.24);
  });

  // CG18090: trust AEA ÷ settlements in the group, minimum one-tenth of the individual AEA.
  // https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg18090
  it("trustees: AEA split across a group of settlements with the one-tenth minimum", () => {
    expect(cgt([disp(20000)], { taxpayer: "trustee", settlementsInGroup: 4 }).annualExemptAmount).toBe(375);
    expect(cgt([disp(20000)], { taxpayer: "trustee", settlementsInGroup: 6 }).annualExemptAmount).toBe(300);
    expect(cgt([disp(20000)], { taxpayer: "trustee", settlementsInGroup: 12 }).annualExemptAmount).toBe(300);
    expect(cgt([disp(20000)], { taxpayer: "trustee-disabled" }).annualExemptAmount).toBe(3000);
    expect(cgt([disp(20000)], { taxpayer: "trustee-disabled", settlementsInGroup: 2 }).annualExemptAmount).toBe(1500);
  });

  it("personal representatives: AEA for 3 tax years, then none; 24%", () => {
    expect(cgt([disp(20000)], { taxpayer: "pr" }).tax).toBe(17000 * 0.24);
    expect(cgt([disp(20000)], { taxpayer: "pr", prWithinThreeYears: false }).tax).toBe(20000 * 0.24);
  });

  it("validation: PRs can't claim BADR; bad dates; negatives", () => {
    const base = { taxYear: Y, taxpayer: "pr" as const, lossesBroughtForward: 0 };
    expect(validateCgtFull({ ...base, disposals: [disp(1000, { relief: "badr" })] })).toHaveLength(1);
    expect(validateCgtFull({ ...base, taxpayer: "individual", disposals: [disp(1000, { completionDate: "2026-02-30" })] })).toHaveLength(1);
    expect(validateCgtFull({ ...base, taxpayer: "individual", disposals: [disp(1000, { completionDate: "2025-05-01" })] })).toHaveLength(1);
    expect(validateCgtFull({ ...base, taxpayer: "individual", disposals: [{ ...disp(1000), proceeds: -1 }] })).toHaveLength(1);
    expect(() => cgtFull({ ...base, disposals: [disp(1000, { relief: "badr" })] })).toThrow(CalcInputError);
  });
});

describe("cgtFull — 60-day UK property returns", () => {
  it("capital-taxes/property-gains-prr-lettings-and-60-day-reporting › Whitlock: completion 30 June 2026 → due 29 August 2026; tax £25,770.91", () => {
    const prr = privateResidenceRelief({
      taxYear: Y,
      gain: 235000,
      acquisitionDate: "2010-01-01",
      disposalDate: "2026-06-30",
      periods: [{ start: "2010-01-01", end: "2017-12-31", type: "occupied" }],
    });
    expect(prr.totalMonths).toBe(198);
    expect(prr.qualifyingMonths).toBe(105);
    expect(prr.prr).toBe(124621.21);
    expect(prr.chargeableGain).toBe(110378.79);
    const r = cgt(
      [{ proceeds: 450000, cost: 200000, enhancement: 0, incidentalCosts: 15000, assetType: "residential", relief: "none", completionDate: "2026-06-30", prrAndLettingsRelief: prr.prr }],
      { taxableIncome: 60000 }
    );
    expect(r.tax).toBe(25770.91);
    expect(r.disposals[0].sixtyDay).toEqual({ dueDate: "2026-08-29", returnNeeded: true, estimatedTax: 25770.91 });
  });

  it("the second residential sale's estimate has no AEA left; no return when no tax; non-residents always report", () => {
    const a = disp(2000, { assetType: "residential", completionDate: "2026-05-01" });
    const b = disp(10000, { assetType: "residential", completionDate: "2026-09-01" });
    const r = cgt([b, a]);
    expect(r.disposals[1].sixtyDay?.returnNeeded).toBe(false);
    expect(r.disposals[0].sixtyDay?.estimatedTax).toBe(9000 * 0.18);
    expect(r.disposals[0].sixtyDay?.dueDate).toBe("2026-10-31");
    expect(cgt([a], { nonResident: true }).disposals[0].sixtyDay?.returnNeeded).toBe(true);
  });
});

// ---------------------------------------------------------------- PRR

describe("privateResidenceRelief", () => {
  const base = { taxYear: Y, gain: 120000 };

  it("capital-taxes/property-gains-… › exempt-months: 117 of 120", () => {
    const r = privateResidenceRelief({
      ...base,
      acquisitionDate: "2010-01-01",
      disposalDate: "2019-12-31",
      periods: [
        { start: "2010-01-01", end: "2014-12-31", type: "occupied" },
        { start: "2015-01-01", end: "2015-12-31", type: "absence-any" },
        { start: "2016-01-01", end: "2018-12-31", type: "occupied" },
      ],
    });
    expect(r.totalMonths).toBe(120);
    expect(r.qualifyingMonths).toBe(117);
  });

  it("capital-taxes/property-gains-… › prr-gain: £180,000 × 60/150 chargeable = £72,000", () => {
    const r = privateResidenceRelief({
      taxYear: Y,
      gain: 180000,
      acquisitionDate: "2010-01-01",
      disposalDate: "2022-06-30",
      periods: [{ start: "2010-01-01", end: "2016-09-30", type: "occupied" }],
    });
    expect(r.totalMonths).toBe(150);
    expect(r.qualifyingMonths).toBe(90);
    expect(r.chargeableGain).toBe(72000);
  });

  it("capital-taxes/property-gains-… › lettings-relief-limit: lowest of £60,000, £40,000, £25,000 = £25,000", () => {
    expect(lettingsReliefAmount(60000, 25000, 40000)).toBe(25000);
  });

  // HS283 example 8: PRR £24,000, letting gain £36,000 → lettings relief £24,000, chargeable £12,000.
  // https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2026
  it("GOV.UK HS283 example 8: lettings relief = lowest of £24,000, £40,000 and £36,000", () => {
    expect(lettingsReliefAmount(24000, 36000, 40000)).toBe(24000);
  });

  it("shared occupancy: let share loses PRR outside the final period; lettings relief capped at £40,000", () => {
    // 120 months, 50% let for the first 60 months: let-equivalent 30 months.
    const r = privateResidenceRelief({
      taxYear: Y,
      gain: 400000,
      acquisitionDate: "2010-01-01",
      disposalDate: "2019-12-31",
      periods: [
        { start: "2010-01-01", end: "2014-12-31", type: "shared-letting", letPercent: 50 },
        { start: "2015-01-01", end: "2019-12-31", type: "occupied" },
      ],
    });
    expect(r.qualifyingMonths).toBe(90);
    expect(r.prr).toBe(300000);
    expect(r.lettingGain).toBe(100000);
    expect(r.lettingsRelief).toBe(40000);
    expect(r.chargeableGain).toBe(60000);
  });

  it("whole property let after moving out (never returned): only occupation + final 9 months; no lettings relief", () => {
    const r = privateResidenceRelief({
      ...base,
      acquisitionDate: "2010-01-01",
      disposalDate: "2019-12-31",
      periods: [
        { start: "2010-01-01", end: "2014-12-31", type: "occupied" },
        { start: "2015-01-01", end: "2019-12-31", type: "absence-any" },
      ],
    });
    expect(r.qualifyingMonths).toBe(69);
    expect(r.lettingsRelief).toBe(0);
  });

  it("UK work absence: 4 years plus up to 3 years for any reason; abroad unlimited; 36-month final period", () => {
    const r = privateResidenceRelief({
      ...base,
      acquisitionDate: "2000-01-01",
      disposalDate: "2019-12-31",
      periods: [
        { start: "2000-01-01", end: "2004-12-31", type: "occupied" },
        { start: "2005-01-01", end: "2012-12-31", type: "absence-uk-work" }, // 96 months: 48 + 36 qualify
        { start: "2013-01-01", end: "2019-12-31", type: "occupied" },
      ],
    });
    expect(r.deemedMonths).toBe(84);
    expect(r.qualifyingMonths).toBe(60 + 84 + 84);
    const abroad = privateResidenceRelief({
      ...base,
      acquisitionDate: "2000-01-01",
      disposalDate: "2019-12-31",
      periods: [
        { start: "2000-01-01", end: "2004-12-31", type: "occupied" },
        { start: "2005-01-01", end: "2012-12-31", type: "absence-abroad" },
        { start: "2013-01-01", end: "2013-12-31", type: "occupied" },
      ],
    });
    expect(abroad.qualifyingMonths).toBe(60 + 96 + 12 + 9);
    const care = privateResidenceRelief({
      ...base,
      acquisitionDate: "2010-01-01",
      disposalDate: "2019-12-31",
      disabledOrCare: true,
      periods: [{ start: "2010-01-01", end: "2014-12-31", type: "occupied" }],
    });
    expect(care.qualifyingMonths).toBe(96);
  });

  it("validation", () => {
    expect(validatePrr({ ...base, acquisitionDate: "2020-01-01", disposalDate: "2019-01-01", periods: [] })).toHaveLength(1);
    expect(validatePrr({ ...base, acquisitionDate: "2010-01-01", disposalDate: "2019-01-01", periods: [{ start: "2009-01-01", end: "2011-01-01", type: "occupied" }] })).toHaveLength(1);
    expect(validatePrr({ ...base, acquisitionDate: "2010-01-01", disposalDate: "2019-01-01", periods: [{ start: "2010-01-01", end: "2011-01-01", type: "shared-letting", letPercent: 100 }] })).toHaveLength(1);
  });
});

// ---------------------------------------------------------------- IHT

const estate0 = {
  grossEstate: 0,
  liabilities: 0,
  spouseExempt: 0,
  charityGifts: 0,
  rnrbEligibleHomeToDescendants: 0,
  transferredNrbPercent: 0,
  transferredRnrbPercent: 0,
  apr100Property: 0,
  apr50Property: 0,
  transferredAllowancePercent: 0,
  allowanceUsedByGifts: 0,
};
const iht = (gifts: LifetimeGift[], extra: Partial<IhtFullInput> = {}) => inheritanceTaxFull({ taxYear: Y, gifts, ...estate0, ...extra });
const pet = (date: string, value: number, extra: Partial<LifetimeGift> = {}): LifetimeGift => ({ date, value, type: "pet", exemption: "none", ...extra });
const clt = (date: string, value: number, paidBy: "donor" | "trustees", extra: Partial<LifetimeGift> = {}): LifetimeGift => ({ date, value, type: "clt", exemption: "none", taxPaidBy: paidBy, ...extra });

describe("inheritanceTaxFull — lifetime gifts", () => {
  it("capital-taxes/lifetime-gifts-… › Rosalind Ashby: PET £394,000, £27,600 before taper, £22,080 payable by the son", () => {
    const r = iht([pet("2024-01-01", 400000)], { dateOfDeath: "2027-03-15" });
    expect(r.gifts[0].net).toBe(394000);
    expect(r.gifts[0].deathTaxBeforeTaper).toBe(27600);
    expect(r.gifts[0].taperPercent).toBe(80);
    expect(r.gifts[0].deathTax).toBe(22080);
    expect(r.nilRateBandForEstate).toBe(0);
  });

  it("capital-taxes/lifetime-gifts-… › pet-net: £250,000 − £6,000 = £244,000", () => {
    expect(iht([pet("2025-07-01", 250000)]).gifts[0].net).toBe(244000);
  });

  it("capital-taxes/lifetime-gifts-… › taper-tax (5y3m: 40% of £40,000 = £16,000) and failed-pet-tax (£70,000)", () => {
    const t = iht([pet("2021-01-01", 425000)], { dateOfDeath: "2026-04-01", applyAnnualExemption: false });
    expect(t.gifts[0].deathTaxBeforeTaper).toBe(40000);
    expect(t.gifts[0].deathTax).toBe(16000);
    expect(iht([pet("2024-10-01", 500000)], { dateOfDeath: "2026-10-01", applyAnnualExemption: false }).gifts[0].deathTax).toBe(70000);
  });

  // HMRC IHTM14612 (Julia): £375,000 on 1 February 2009, death 20 June 2012 → £20,000 × 80% = £16,000.
  // https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm14612
  it("HMRC IHTM14612 Julia: taper relief 3–4 years → £16,000", () => {
    const r = iht([pet("2009-02-01", 375000)], { dateOfDeath: "2012-06-20", applyAnnualExemption: false });
    expect(r.gifts[0].deathTaxBeforeTaper).toBe(20000);
    expect(r.gifts[0].deathTax).toBe(16000);
  });

  it("capital-taxes/chargeable-lifetime-transfers-… › Ferrier: £419,000; donor pays £23,500, trustees £18,800; due 30 April 2027", () => {
    const d = iht([clt("2026-06-01", 425000, "donor")]);
    expect(d.gifts[0].net).toBe(419000);
    expect(d.gifts[0].lifetimeTax).toBe(23500);
    expect(d.gifts[0].grossChargeable).toBe(442500);
    expect(d.gifts[0].lifetimeDueDate).toBe("2027-04-30");
    expect(d.tax).toBe(23500);
    expect(iht([clt("2026-06-01", 425000, "trustees")]).gifts[0].lifetimeTax).toBe(18800);
  });

  it("capital-taxes/chargeable-lifetime-transfers-… › Ferrier dies after 2 years: £23,500 more; after 4½ years: £4,700", () => {
    expect(iht([clt("2026-06-01", 425000, "donor")], { dateOfDeath: "2028-06-01" }).giftsDeathTax).toBe(23500);
    const later = iht([clt("2026-06-01", 425000, "donor")], { dateOfDeath: "2030-12-01" });
    expect(later.gifts[0].taperPercent).toBe(60);
    expect(later.giftsDeathTax).toBe(4700);
  });

  it("capital-taxes/chargeable-lifetime-transfers-… › clt-donor-pays £18,750, clt-trustees-pay £15,000, top-up £35,000", () => {
    const off = { applyAnnualExemption: false };
    expect(iht([clt("2026-06-01", 400000, "donor")], off).gifts[0].lifetimeTax).toBe(18750);
    expect(iht([clt("2026-06-01", 400000, "trustees")], off).gifts[0].lifetimeTax).toBe(15000);
    const top = iht([clt("2024-10-01", 465000, "donor")], { ...off, dateOfDeath: "2026-10-01" });
    expect(top.gifts[0].grossChargeable).toBe(500000);
    expect(top.gifts[0].lifetimeTax).toBe(35000);
    expect(top.giftsDeathTax).toBe(35000);
  });

  it("CLT payment dates: October–April transfers six months after the month end (IHTM30153)", () => {
    expect(iht([clt("2026-10-15", 500000, "trustees")]).gifts[0].lifetimeDueDate).toBe("2027-04-30");
    expect(iht([clt("2027-01-10", 500000, "trustees")]).gifts[0].lifetimeDueDate).toBe("2027-07-31");
  });

  it("annual exemption: current year first, then one year carried forward; small and wedding gifts", () => {
    const r = iht([pet("2025-05-01", 2000), pet("2026-05-01", 5000)], { priorYearAnnualExemptionUnused: 0 });
    expect(r.gifts[0].net).toBe(0);
    expect(r.gifts[1].annualExemption).toBe(4000);
    expect(r.gifts[1].net).toBe(1000);
    const s = iht([pet("2026-05-01", 250, { exemption: "small" }), pet("2026-05-02", 300, { exemption: "small" })], { priorYearAnnualExemptionUnused: 0 });
    expect(s.gifts[0].net).toBe(0);
    expect(s.gifts[0].annualExemption).toBe(0);
    expect(s.gifts[1].exemptions).toBe(0);
    expect(s.gifts[1].annualExemption).toBe(0); // can't combine the small gifts exemption with another
    const w = iht([pet("2026-05-01", 20000, { exemption: "marriage-child" })]);
    expect(w.gifts[0].exemptions).toBe(5000);
    expect(w.gifts[0].net).toBe(20000 - 5000 - 6000);
  });

  it("7-year cumulation: an old CLT reduces the band for a later gift but drops out at death", () => {
    // CLT 2018 £200,000 (no tax); PET 2022 £300,000; death 2026-10-01.
    const r = iht([clt("2018-06-01", 200000, "trustees"), pet("2022-06-01", 300000)], { dateOfDeath: "2026-10-01", applyAnnualExemption: false });
    expect(r.gifts[0].withinSevenYears).toBe(false);
    // PET: band left = £325,000 − £200,000 = £125,000; (£300,000 − £125,000) × 40% × 60% (4–5 years).
    expect(r.gifts[1].deathTaxBeforeTaper).toBe(70000);
    expect(r.gifts[1].deathTax).toBe(42000);
    expect(r.nilRateBandForEstate).toBe(25000);
  });

  it("dates: 7-year boundary, taper bands on anniversaries", () => {
    expect(iht([pet("2019-10-01", 400000)], { dateOfDeath: "2026-10-01", applyAnnualExemption: false }).gifts[0].withinSevenYears).toBe(false);
    expect(iht([pet("2019-10-02", 400000)], { dateOfDeath: "2026-10-01", applyAnnualExemption: false }).gifts[0].taperPercent).toBe(20);
    expect(yearsBandNotMoreThan("2023-10-01", "2026-10-01")).toBe(2);
    expect(yearsBandNotMoreThan("2023-10-01", "2026-10-02")).toBe(3);
    expect(wholeYearsBetween("2024-02-29", "2025-02-28")).toBe(1);
    expect(addYears("2024-02-29", 1)).toBe("2025-02-28");
    expect(endOfMonthAfter("2026-08-20", 6)).toBe("2027-02-28");
  });
});

describe("inheritanceTaxFull — estate", () => {
  it("agrees with the original estate calculator on the lesson and GOV.UK cases", () => {
    const cases: Parameters<typeof inheritanceTax>[0][] = [
      { taxYear: Y, estate: 900000, rnrbEligibleHomeToDescendants: 450000, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 0 },
      { taxYear: Y, estate: 1200000, rnrbEligibleHomeToDescendants: 600000, transferredNrbPercent: 100, transferredRnrbPercent: 100, charityGifts: 0 },
      { taxYear: Y, estate: 830000, rnrbEligibleHomeToDescendants: 620000, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 0 },
      { taxYear: Y, estate: 750000, rnrbEligibleHomeToDescendants: 0, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 50000 },
      { taxYear: Y, estate: 800000, rnrbEligibleHomeToDescendants: 400000, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 50000 },
      { taxYear: Y, estate: 1000000, rnrbEligibleHomeToDescendants: 100000, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 0, spouseExempt: 500000 },
      { taxYear: Y, estate: 2200000, rnrbEligibleHomeToDescendants: 800000, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 0 },
    ];
    for (const c of cases) {
      const old = inheritanceTax(c);
      const r = iht([], {
        dateOfDeath: "2026-09-01",
        grossEstate: c.estate,
        rnrbEligibleHomeToDescendants: c.rnrbEligibleHomeToDescendants,
        transferredNrbPercent: c.transferredNrbPercent,
        transferredRnrbPercent: c.transferredRnrbPercent,
        charityGifts: c.charityGifts,
        spouseExempt: c.spouseExempt ?? 0,
      });
      expect(r.estateTax).toBe(old.tax);
    }
  });

  it("capital-taxes/estate-administration-… › Mavis Greenway: £56,000, pay by 28 February 2027", () => {
    const r = iht([], {
      dateOfDeath: "2026-08-20",
      grossEstate: 1150000,
      liabilities: 10000,
      rnrbEligibleHomeToDescendants: 600000,
      transferredNrbPercent: 100,
      transferredRnrbPercent: 100,
    });
    expect(r.netEstate).toBe(1140000);
    expect(r.tax).toBe(56000);
    expect(r.estatePaymentDueDate).toBe("2027-02-28");
  });

  // GOV.UK Pay your Inheritance Tax bill: died in January → pay by 31 July.
  // https://www.gov.uk/paying-inheritance-tax
  it("GOV.UK: death in January → estate tax due 31 July", () => {
    expect(iht([], { dateOfDeath: "2027-01-15", grossEstate: 500000 }).estatePaymentDueDate).toBe("2027-07-31");
  });

  it("capital-taxes/bpr-and-apr-reforms-from-april-2026 › Grace Whitfield: relief £2,850,000, chargeable £650,000, IHT £130,000; nil with a late spouse's unused allowance", () => {
    const g = { dateOfDeath: "2027-01-15", grossEstate: 3500000, apr100Property: 3200000 };
    const r = iht([], g);
    expect(r.aprBprRelief).toBe(2850000);
    expect(r.chargeableEstate).toBe(650000);
    expect(r.tax).toBe(130000);
    expect(iht([], { ...g, transferredAllowancePercent: 100 }).tax).toBe(0);
  });

  it("capital-taxes/bpr-and-apr-reforms-… › relief-amount £2,750,000; aim-chargeable £200,000", () => {
    expect(iht([], { dateOfDeath: "2027-01-15", grossEstate: 3000000, apr100Property: 3000000 }).aprBprRelief).toBe(2750000);
    expect(iht([], { dateOfDeath: "2027-01-15", grossEstate: 400000, apr50Property: 400000 }).chargeableEstate).toBe(200000);
  });

  // HMRC IHTM25520 example 1: £1.5m of the allowance used by a gift; estate £2m of 100% property →
  // £1m at 100%, £1m at 50% → £500,000 chargeable. https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25520
  it("HMRC IHTM25520 Robert: allowance reduced by lifetime use → £500,000 chargeable", () => {
    expect(iht([], { dateOfDeath: "2027-01-15", grossEstate: 2000000, apr100Property: 2000000, allowanceUsedByGifts: 1500000 }).chargeableEstate).toBe(500000);
  });

  // HMRC IHTM25537: first spouse used £800,000 → 68% unused → survivor's allowance £4.2m.
  // https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25537
  it("HMRC IHTM25537: 68% transferred → £4,200,000 allowance", () => {
    const r = iht([], { dateOfDeath: "2027-01-15", grossEstate: 4200000, apr100Property: 4200000, transferredAllowancePercent: 68 });
    expect(r.aprBprRelief).toBe(4200000);
    expect(r.tax).toBe(0);
  });

  it("2025/26: no cap on 100% relief", () => {
    const r = inheritanceTaxFull({ taxYear: "2025/26", gifts: [], ...estate0, dateOfDeath: "2026-01-15", grossEstate: 5000000, apr100Property: 5000000 });
    expect(r.aprBprRelief).toBe(5000000);
  });

  it("capital-taxes/estate-administration-… › quick succession relief 2½ years → 60%; HMRC IHTM22073 (£3,509 ÷ £450,000) × £55,200 × 80% ≈ £344", () => {
    const r = iht([], {
      dateOfDeath: "2026-10-01",
      grossEstate: 1000000,
      qsr: { earlierDate: "2024-04-01", earlierTax: 20000, earlierTransferValue: 100000, increaseInEstate: 100000 },
    });
    expect(r.quickSuccessionRelief).toBe(12000);
    expect(r.tax).toBe((1000000 - 325000) * 0.4 - 12000);
    // https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm22073
    const h = iht([], {
      dateOfDeath: "2026-10-01",
      grossEstate: 1000000,
      qsr: { earlierDate: "2025-04-01", earlierTax: 55200, earlierTransferValue: 450000, increaseInEstate: 3509 },
    });
    expect(h.quickSuccessionRelief).toBeCloseTo(344, 0);
    expect(iht([], { dateOfDeath: "2026-10-01", grossEstate: 1000000, qsr: { earlierDate: "2021-09-30", earlierTax: 1, earlierTransferValue: 1, increaseInEstate: 1 } }).quickSuccessionRelief).toBe(0);
  });

  it("failed PETs use the nil rate band first; RNRB stays with the estate", () => {
    const r = iht([pet("2024-06-01", 206000)], { dateOfDeath: "2026-09-01", grossEstate: 600000, rnrbEligibleHomeToDescendants: 300000 });
    expect(r.gifts[0].net).toBe(200000);
    expect(r.gifts[0].deathTax).toBe(0);
    expect(r.nilRateBandForEstate).toBe(125000);
    expect(r.estateTax).toBe((600000 - 175000 - 125000) * 0.4);
  });

  it("validation", () => {
    const base = { taxYear: Y, gifts: [], ...estate0 };
    expect(validateIhtFull({ ...base, transferredAllowancePercent: 120 })).toHaveLength(1);
    expect(validateIhtFull({ ...base, grossEstate: 100, spouseExempt: 200 })).toHaveLength(1);
    expect(validateIhtFull({ ...base, dateOfDeath: "2026-01-01", gifts: [pet("2026-02-01", 10)] })).toHaveLength(1);
    expect(validateIhtFull({ ...base, gifts: [clt("2026-02-01", 10, "donor", { exemption: "small" })] })).toHaveLength(1);
  });
});

// ---------------------------------------------------------------- SDLT

const sdlt = (price: number, extra: Partial<Parameters<typeof stampDutyLandTax>[0]> = {}) =>
  stampDutyLandTax({ taxYear: Y, propertyType: "residential", price, purchaser: "individual", ...extra });

describe("stampDutyLandTax", () => {
  // https://www.gov.uk/stamp-duty-land-tax/residential-property-rates
  it("GOV.UK: £295,000 → £4,750; first-time buyer £500,000 → £10,000", () => {
    expect(sdlt(295000).tax).toBe(4750);
    expect(sdlt(500000, { firstTimeBuyer: true }).tax).toBe(10000);
  });

  // https://www.gov.uk/guidance/stamp-duty-land-tax-buying-an-additional-residential-property
  it("GOV.UK: additional dwelling £300,000 → £20,000", () => {
    expect(sdlt(300000, { additionalDwelling: true }).tax).toBe(20000);
  });

  // https://www.gov.uk/guidance/rates-of-stamp-duty-land-tax-for-non-uk-residents
  it("GOV.UK: non-resident Fifi £700,000 → £39,000", () => {
    expect(sdlt(700000, { nonResident: true }).tax).toBe(39000);
  });

  // https://www.gov.uk/stamp-duty-land-tax/nonresidential-and-mixed-rates
  it("GOV.UK: non-residential £275,000 → £3,250", () => {
    expect(sdlt(275000, { propertyType: "non-residential" }).tax).toBe(3250);
  });

  it("first-time buyer over £500,000 pays standard rates", () => {
    const r = sdlt(550000, { firstTimeBuyer: true });
    expect(r.basis).toBe("standard");
    expect(r.tax).toBe(2500 + 15000);
  });

  it("higher rates not due under £40,000; bands at exact thresholds; top bands", () => {
    expect(sdlt(39999, { additionalDwelling: true }).tax).toBe(0);
    expect(sdlt(125000).tax).toBe(0);
    expect(sdlt(250000).tax).toBe(2500);
    expect(sdlt(2000000).tax).toBe(2500 + 33750 + 57500 + 60000);
  });

  it("companies: 17% on the whole price over £500,000 (+2% non-resident); higher rates where relief applies", () => {
    expect(sdlt(600000, { purchaser: "company" }).tax).toBe(102000);
    expect(sdlt(600000, { purchaser: "company", nonResident: true }).tax).toBe(114000);
    expect(sdlt(600000, { purchaser: "company", corporateReliefClaimed: true }).tax).toBe(6250 + 8750 + 35000);
    expect(sdlt(300000, { purchaser: "company" }).tax).toBe(20000);
  });

  it("new leases: rent NPV bands", () => {
    expect(sdlt(0, { propertyType: "non-residential", leaseRentNpv: 200000 }).tax).toBe(500);
    expect(sdlt(0, { propertyType: "non-residential", leaseRentNpv: 6000000 }).tax).toBe(48500 + 20000);
    expect(sdlt(0, { leaseRentNpv: 200000 }).tax).toBe(750);
  });

  it("validation", () => {
    expect(validateSdlt({ taxYear: Y, propertyType: "residential", price: 1, purchaser: "company", firstTimeBuyer: true })).toHaveLength(1);
    expect(validateSdlt({ taxYear: Y, propertyType: "residential", price: 1, purchaser: "individual", firstTimeBuyer: true, additionalDwelling: true })).toHaveLength(1);
    expect(validateSdlt({ taxYear: Y, propertyType: "residential", price: -1, purchaser: "individual" })).toHaveLength(1);
  });
});

describe("every tax year runs the capital calculators", () => {
  for (const y of TAX_YEARS) {
    it(`${y.taxYear}: all rate ids resolve`, () => {
      expect(() =>
        cgtFull({
          taxYear: y.taxYear,
          taxpayer: "individual",
          disposals: [disp(100000, { relief: "badr" }), disp(50000, { relief: "ir" }), disp(-2000), disp(30000, { assetType: "residential", completionDate: `${y.taxYear.slice(0, 4)}-06-01` })],
          lossesBroughtForward: 5000,
          taxableIncome: 20000,
        })
      ).not.toThrow();
      expect(() => cgtFull({ taxYear: y.taxYear, taxpayer: "trustee", disposals: [disp(10000)], lossesBroughtForward: 0, settlementsInGroup: 3 })).not.toThrow();
      expect(() =>
        privateResidenceRelief({ taxYear: y.taxYear, gain: 100000, acquisitionDate: "2010-01-01", disposalDate: "2020-01-01", periods: [{ start: "2010-01-01", end: "2015-01-01", type: "shared-letting", letPercent: 30 }] })
      ).not.toThrow();
      expect(() =>
        inheritanceTaxFull({
          taxYear: y.taxYear,
          gifts: [clt("2021-06-01", 400000, "donor"), pet("2022-06-01", 300000, { exemption: "marriage-grandchild" })],
          ...estate0,
          dateOfDeath: `${Number(y.taxYear.slice(0, 4)) + 1}-01-15`,
          grossEstate: 3000000,
          apr100Property: 2600000,
          charityGifts: 100000,
          rnrbEligibleHomeToDescendants: 300000,
          qsr: { earlierDate: "2024-01-01", earlierTax: 1000, earlierTransferValue: 10000, increaseInEstate: 5000 },
        })
      ).not.toThrow();
      for (const extra of [{}, { firstTimeBuyer: true }, { additionalDwelling: true, nonResident: true }, { purchaser: "company" as const }, { propertyType: "non-residential" as const, leaseRentNpv: 300000 }]) {
        expect(() => stampDutyLandTax({ taxYear: y.taxYear, propertyType: "residential", price: 800000, purchaser: "individual", ...extra })).not.toThrow();
      }
    });
  }
});
