/**
 * Worked-example tests for the tax calculators.
 *
 * Every expected figure is a checked answer from a Capto Learn lesson (file and
 * exercise id cited) or a GOV.UK / HMRC manual worked example (URL cited), for
 * a tax year whose rates match the dataset in src/content/rates.
 */
import { describe, expect, it } from "vitest";
import { TAX_YEARS } from "@/content/rates";
import {
  CalcInputError,
  capitalGainsTax,
  corporationTax,
  formatMoneyInput,
  incomeTax,
  parseMoney,
  parsePercent,
  parseWhole,
  inheritanceTax,
  validateCapitalGainsTax,
  validateCorporationTax,
  validateIncomeTax,
  validateInheritanceTax,
  workingAsText,
} from "./index";

const Y = "2026/27";

describe("corporationTax", () => {
  const ct = (profits: number, extra: Partial<Parameters<typeof corporationTax>[0]> = {}) =>
    corporationTax({ taxYear: Y, profits, associatedCompanies: 0, periodMonths: 12, ...extra });

  it("ir35/advising-contractors-practical-options › marginal-relief-ct: £14,083.04", () => {
    const r = ct(67294.5);
    expect(r.tax).toBe(14083.04);
    expect(r.band).toBe("marginal");
    expect(r.marginalRelief).toBe(2740.58);
  });

  it("corporation-tax/rates-and-marginal-relief › mr-basic: £43,950", () => {
    const r = ct(180000);
    expect(r.tax).toBe(43950);
    expect(r.marginalRelief).toBe(1050);
  });

  it("corporation-tax/rates-and-marginal-relief › mr-associates (two associates): £17,300", () => {
    const r = ct(70000, { associatedCompanies: 2 });
    expect(r.upperLimit).toBe(83333.33);
    expect(r.tax).toBe(17300);
  });

  it("corporation-tax/rates-and-marginal-relief › short-period (9 months): £5,700", () => {
    const r = ct(30000, { periodMonths: 9 });
    expect(r.lowerLimit).toBe(37500);
    expect(r.band).toBe("small");
    expect(r.tax).toBe(5700);
  });

  it("corporation-tax/rates-and-marginal-relief › quick example: £28,050", () => {
    expect(ct(120000).tax).toBe(28050);
  });

  it("corporation-tax/rates-and-marginal-relief › Okafor Dental scenario (1 associate, £5,000 dividends): £16,800", () => {
    const r = ct(70000, { augmentedProfits: 75000, associatedCompanies: 1 });
    expect(r.upperLimit).toBe(125000);
    expect(r.marginalRelief).toBe(700);
    expect(r.tax).toBe(16800);
  });

  // HMRC Company Taxation Manual CTM03925 worked example: TTP £90,000, exempt
  // distributions £8,000, no associates; MR £2,094, CT £20,406.
  // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925
  it("GOV.UK CTM03925 example: augmented profits £98,000 → £20,406", () => {
    const r = ct(90000, { augmentedProfits: 98000 });
    expect(Math.round(r.marginalRelief)).toBe(2094);
    expect(Math.round(r.tax)).toBe(20406);
  });

  // GOV.UK "Marginal Relief for Corporation Tax": with 3 associated companies the
  // limits are divided by 4, giving £12,500 and £62,500.
  // https://www.gov.uk/guidance/corporation-tax-marginal-relief
  it("GOV.UK marginal relief guidance: 3 associates → limits £12,500 / £62,500", () => {
    const r = ct(10000, { associatedCompanies: 3 });
    expect(r.lowerLimit).toBe(12500);
    expect(r.upperLimit).toBe(62500);
  });

  it("edge: nil profits → nil tax", () => {
    const r = ct(0);
    expect(r.tax).toBe(0);
    expect(r.effectiveRate).toBeNull();
  });

  it("edge: profits exactly at the lower limit → small profits rate, no MR", () => {
    const r = ct(50000);
    expect(r.band).toBe("small");
    expect(r.tax).toBe(9500);
  });

  it("edge: profits exactly at the upper limit → main rate, no MR", () => {
    const r = ct(250000);
    expect(r.band).toBe("main");
    expect(r.marginalRelief).toBe(0);
    expect(r.tax).toBe(62500);
  });

  it("validation", () => {
    expect(validateCorporationTax({ taxYear: Y, profits: -1, associatedCompanies: 0, periodMonths: 12 })).toHaveLength(1);
    expect(validateCorporationTax({ taxYear: Y, profits: 100, augmentedProfits: 50, associatedCompanies: 0, periodMonths: 12 })).toHaveLength(1);
    expect(validateCorporationTax({ taxYear: Y, profits: 100, associatedCompanies: 100, periodMonths: 12 })).toHaveLength(1);
    expect(validateCorporationTax({ taxYear: Y, profits: 100, associatedCompanies: 0, periodMonths: 13 })).toHaveLength(1);
    expect(() => ct(-5)).toThrow(CalcInputError);
  });
});

describe("incomeTax", () => {
  const it_ = (nonSavingsIncome: number, savingsIncome = 0, dividends = 0, taxYear = Y) =>
    incomeTax({ taxYear, nonSavingsIncome, savingsIncome, dividends, region: "rUK" });

  it("personal-tax/income-tax-computation › basic-rate-tax: £6,486", () => {
    expect(it_(45000).tax).toBe(6486);
  });

  it("personal-tax/income-tax-computation › tapered-pa: allowance £4,570 at £116,000", () => {
    expect(it_(116000).personalAllowance).toBe(4570);
  });

  it("personal-tax/income-tax-computation › additional-rate: £44,703", () => {
    const r = it_(130000);
    expect(r.personalAllowance).toBe(0);
    expect(r.tax).toBe(44703);
  });

  it("personal-tax/income-tax-computation › taper example (£110,000): £33,432", () => {
    const r = it_(110000);
    expect(r.personalAllowance).toBe(7570);
    expect(r.tax).toBe(33432);
  });

  it("personal-tax/income-tax-computation › Harriet Osei scenario (£114,000): £35,832", () => {
    expect(it_(114000).tax).toBe(35832);
  });

  it("personal-tax/savings-and-dividend-income › dividend-tax-basic: £591.25 on the dividends", () => {
    const r = it_(30000, 0, 6000);
    expect(r.dividendTax).toBe(591.25);
    expect(r.tax).toBe(3486 + 591.25);
  });

  it("personal-tax/savings-and-dividend-income › psa-higher: £600 on the interest", () => {
    const r = it_(60000, 2000);
    expect(r.personalSavingsAllowance).toBe(500);
    expect(r.savingsTax).toBe(600);
  });

  it("personal-tax/savings-and-dividend-income › srs-available: £2,370 at the starting rate", () => {
    const r = it_(15200, 6000);
    expect(r.startingRateForSavings).toBe(2370);
    expect(r.savingsTax).toBe(526); // remaining £2,630 × 20% (per the exercise working)
  });

  it("personal-tax/savings-and-dividend-income › starting rate example (salary £14,000, interest £4,500): £286", () => {
    expect(it_(14000, 4500).tax).toBe(286);
  });

  it("personal-tax/savings-and-dividend-income › Ravi Shah scenario: £7,058.75 (2026/27) and £6,168.75 (2025/26)", () => {
    expect(it_(12570, 1800, 45000).tax).toBe(7058.75);
    expect(it_(12570, 1800, 45000, "2025/26").tax).toBe(6168.75);
  });

  it("edge: nil income → nil tax", () => {
    const r = it_(0);
    expect(r.tax).toBe(0);
    expect(r.effectiveRate).toBeNull();
  });

  it("edge: allowance fully tapered at exactly £125,140", () => {
    const r = it_(125140);
    expect(r.personalAllowance).toBe(0);
    // £37,700 × 20% + (£125,140 − £37,700) × 40%
    expect(r.tax).toBe(7540 + 34976);
  });

  it("edge: no taper at exactly £100,000", () => {
    expect(it_(100000).personalAllowance).toBe(12570);
  });

  it("Scotland is rejected with a clear message", () => {
    expect(validateIncomeTax({ taxYear: Y, nonSavingsIncome: 1, savingsIncome: 0, dividends: 0, region: "scotland" as "rUK" })[0]).toMatch(/Scottish/);
  });
});

describe("capitalGainsTax", () => {
  const cgt = (gains: number, otherTaxableIncome: number, extra: Partial<Parameters<typeof capitalGainsTax>[0]> = {}) =>
    capitalGainsTax({ taxYear: Y, gains, badrGains: 0, otherTaxableIncome, lossesBroughtForward: 0, ...extra });

  it("capital-taxes/cgt-computation-rates-and-annual-exempt-amount › Nadia Rahman / cgt-basic-band: £10,063.80", () => {
    const r = cgt(50000, 17430);
    expect(r.unusedBasicRateBand).toBe(20270);
    expect(r.tax).toBe(10063.8);
  });

  it("capital-taxes/business-asset-disposal-relief › badr-tax: £44,460", () => {
    expect(cgt(250000, 0, { badrGains: 250000 }).tax).toBe(44460);
  });

  it("capital-taxes/business-asset-disposal-relief › limit-exceeded (£700,000 used): £101,280", () => {
    const r = cgt(500000, 0, { badrGains: 500000, badrLifetimeUsed: 700000 });
    expect(r.badrOverLimit).toBe(200000);
    expect(r.tax).toBe(101280);
  });

  it("capital-taxes/business-asset-disposal-relief › Owen Marsh scenario: £69,660", () => {
    expect(cgt(390000, 150000, { badrGains: 390000 }).tax).toBe(69660);
  });

  it("capital-taxes/cgt-losses-spouses-and-separation › b-f-losses-used: £11,000 used, £19,000 carried forward", () => {
    const r = cgt(14000, 60000, { lossesBroughtForward: 30000 });
    expect(r.lossesUsed).toBe(11000);
    expect(r.lossesCarriedForward).toBe(19000);
    expect(r.tax).toBe(0);
  });

  it("capital-taxes/cgt-losses-spouses-and-separation › spouse-saving: £4,320 alone vs £1,800 + £1,350", () => {
    expect(cgt(21000, 60000).tax).toBe(4320);
    expect(cgt(10500, 60000).tax).toBe(1800);
    expect(cgt(10500, 0).tax).toBe(1350);
  });

  it("BADR gains use the basic rate band before other gains", () => {
    // £37,700 band all used by BADR gains, so the £10,000 ordinary gain (after AEA £7,000) is at 24%.
    const r = cgt(47700, 0, { badrGains: 37700 });
    expect(r.ordinaryTaxableGains).toBe(7000);
    expect(r.tax).toBe(37700 * 0.18 + 7000 * 0.24);
  });

  it("edge: nil gains and gains within the annual exempt amount", () => {
    expect(cgt(0, 0).tax).toBe(0);
    expect(cgt(3000, 0).tax).toBe(0);
  });

  it("validation: BADR gains above total gains, negatives", () => {
    expect(validateCapitalGainsTax({ taxYear: Y, gains: 100, badrGains: 200, otherTaxableIncome: 0, lossesBroughtForward: 0 })).toHaveLength(1);
    expect(validateCapitalGainsTax({ taxYear: Y, gains: -1, badrGains: 0, otherTaxableIncome: 0, lossesBroughtForward: 0 })).toHaveLength(1);
  });
});

describe("inheritanceTax", () => {
  const iht = (estate: number, extra: Partial<Parameters<typeof inheritanceTax>[0]> = {}) =>
    inheritanceTax({
      taxYear: Y,
      estate,
      rnrbEligibleHomeToDescendants: 0,
      transferredNrbPercent: 0,
      transferredRnrbPercent: 0,
      charityGifts: 0,
      ...extra,
    });

  it("capital-taxes/iht-basics-nil-rate-bands-and-the-estate › iht-simple: £160,000", () => {
    expect(iht(900000, { rnrbEligibleHomeToDescendants: 450000 }).tax).toBe(160000);
  });

  it("capital-taxes/iht-basics-nil-rate-bands-and-the-estate › rnrb-taper: reduction £100,000, RNRB £75,000", () => {
    const r = iht(2200000, { rnrbEligibleHomeToDescendants: 800000 });
    expect(r.rnrbTaperReduction).toBe(100000);
    expect(r.residenceNilRateBand).toBe(75000);
  });

  it("capital-taxes/iht-basics-nil-rate-bands-and-the-estate › transferred-bands: £80,000", () => {
    expect(iht(1200000, { rnrbEligibleHomeToDescendants: 600000, transferredNrbPercent: 100, transferredRnrbPercent: 100 }).tax).toBe(80000);
  });

  it("capital-taxes/iht-basics-nil-rate-bands-and-the-estate › Harold Dunmore: nil with Edith's bands, £132,000 without", () => {
    expect(iht(830000, { rnrbEligibleHomeToDescendants: 620000, transferredNrbPercent: 100, transferredRnrbPercent: 100 }).tax).toBe(0);
    expect(iht(830000, { rnrbEligibleHomeToDescendants: 620000 }).tax).toBe(132000);
  });

  // HMRC Inheritance Tax Manual IHTM45010 (Robert): estate £750,000, charity £50,000,
  // NRB £325,000 → baseline £425,000; £50,000 ≥ 10% so tax £135,000 (vs £150,000).
  // https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm45010
  it("GOV.UK IHTM45010 charity rate example: baseline £425,000, tax £135,000", () => {
    const r = iht(750000, { charityGifts: 50000 });
    expect(r.baselineAmount).toBe(425000);
    expect(r.charityRateApplies).toBe(true);
    expect(r.tax).toBe(135000);
  });

  it("charity rate not available below 10% of the baseline", () => {
    // Baseline = (£1,000,000 − £30,000 − £325,000) + £30,000 = £675,000; 10% = £67,500.
    const r = iht(1000000, { charityGifts: 30000 });
    expect(r.baselineAmount).toBe(675000);
    expect(r.charityRateApplies).toBe(false);
    expect(r.tax).toBe((970000 - 325000) * 0.4);
  });

  it("RNRB is not deducted in the baseline (IHTM45009)", () => {
    const r = iht(800000, { charityGifts: 50000, rnrbEligibleHomeToDescendants: 400000 });
    expect(r.baselineAmount).toBe(800000 - 50000 - 325000 + 50000);
    // £50,000 ≥ 10% × £475,000, so 36% on (£750,000 − £175,000 − £325,000)
    expect(r.tax).toBe(250000 * 0.36);
  });

  // GOV.UK RNRB guidance: flat £100,000 to son, £400,000 other assets to son,
  // £500,000 to husband (exempt) → RNRB capped at £100,000; IHT is due on £75,000.
  // https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band
  it("GOV.UK RNRB guidance: cap at the value of the home → tax due on £75,000", () => {
    const r = iht(1000000, { rnrbEligibleHomeToDescendants: 100000, spouseExempt: 500000 });
    expect(r.residenceNilRateBand).toBe(100000);
    expect(r.taxableAboveBands).toBe(75000);
  });

  // Same GOV.UK page: wife's estate £1,800,000 with a £500,000 home to her children
  // and 60% of her husband's RNRB transferred → £175,000 + £105,000 = £280,000.
  it("GOV.UK RNRB guidance: 60% transferred RNRB → £280,000 available", () => {
    expect(iht(1800000, { rnrbEligibleHomeToDescendants: 500000, transferredRnrbPercent: 60 }).residenceNilRateBand).toBe(280000);
  });

  it("edge: nil estate, RNRB untapered at exactly £2m, fully tapered at £2.35m", () => {
    expect(iht(0).tax).toBe(0);
    expect(iht(2000000, { rnrbEligibleHomeToDescendants: 500000 }).rnrbTaperReduction).toBe(0);
    expect(iht(2350000, { rnrbEligibleHomeToDescendants: 500000 }).residenceNilRateBand).toBe(0);
  });

  it("validation: percentages and impossible splits", () => {
    const base = { taxYear: Y, estate: 100, rnrbEligibleHomeToDescendants: 0, transferredNrbPercent: 0, transferredRnrbPercent: 0, charityGifts: 0 };
    expect(validateInheritanceTax({ ...base, transferredNrbPercent: 120 })).toHaveLength(1);
    expect(validateInheritanceTax({ ...base, rnrbEligibleHomeToDescendants: 200 })).toHaveLength(1);
    expect(validateInheritanceTax({ ...base, charityGifts: 150 })).toHaveLength(1);
  });
});

describe("every tax year in the dataset runs every calculator", () => {
  for (const y of TAX_YEARS) {
    it(`${y.taxYear}: all rate ids resolve`, () => {
      expect(() => corporationTax({ taxYear: y.taxYear, profits: 100000, augmentedProfits: 110000, associatedCompanies: 1, periodMonths: 6 })).not.toThrow();
      expect(() => incomeTax({ taxYear: y.taxYear, nonSavingsIncome: 110000, savingsIncome: 3000, dividends: 20000, region: "rUK" })).not.toThrow();
      expect(() => incomeTax({ taxYear: y.taxYear, nonSavingsIncome: 13000, savingsIncome: 3000, dividends: 2000, region: "rUK" })).not.toThrow();
      expect(() => capitalGainsTax({ taxYear: y.taxYear, gains: 100000, badrGains: 60000, otherTaxableIncome: 20000, lossesBroughtForward: 5000 })).not.toThrow();
      expect(() =>
        inheritanceTax({ taxYear: y.taxYear, estate: 2100000, rnrbEligibleHomeToDescendants: 500000, transferredNrbPercent: 50, transferredRnrbPercent: 50, charityGifts: 200000 })
      ).not.toThrow();
    });
  }
});

describe("input parsing", () => {
  it("accepts commas, £ and spaces; rejects text", () => {
    expect(parseMoney("£1,234.56").value).toBe(1234.56);
    expect(parseMoney(" 12 570 ").value).toBe(12570);
    expect(parseMoney("").value).toBe(0);
    expect(parseMoney("", true).value).toBeUndefined();
    expect(parseMoney("-50").value).toBe(-50);
    expect(parseMoney("12a").error).toBeDefined();
    expect(parseMoney("1.2.3").error).toBeDefined();
    expect(parseWhole("2").value).toBe(2);
    expect(parseWhole("2.5").error).toBeDefined();
    expect(parsePercent("37.5%").value).toBe(37.5);
    expect(formatMoneyInput("1234567")).toBe("1,234,567");
  });
});

describe("workingAsText", () => {
  it("includes every line and the verification date", () => {
    const r = corporationTax({ taxYear: Y, profits: 180000, associatedCompanies: 0, periodMonths: 12 });
    const text = workingAsText("Corporation tax", r);
    expect(text).toContain("£43,950");
    expect(text).toContain("Rates verified against GOV.UK on");
  });
});
