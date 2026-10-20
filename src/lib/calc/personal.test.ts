/**
 * Worked-example tests for the personal tax calculators (income tax, self-employed, property).
 *
 * Every expected figure is a checked answer from a Capto Learn lesson (file and
 * exercise id cited) or a GOV.UK / HMRC worked example (URL cited), or an edge
 * case worked by hand from the dataset figures (shown in the comment).
 */
import { describe, expect, it } from "vitest";
import { CalcInputError } from "./common";
import {
  class4Nic,
  nextTaxYear,
  pensionToRemoveHicbc,
  pensionToRestoreAllowance,
  personalIncomeTax,
  propertyTax,
  saPayments,
  selfEmployedTax,
  solveMinPennies,
  validatePersonalTax,
  type PersonalTaxInput,
  type PropertyInput,
  type TradingInput,
} from "./personal";

const Y = "2026/27";
const tax = (i: Omit<PersonalTaxInput, "taxYear">, taxYear = Y) => personalIncomeTax({ taxYear, ...i });
const profit = (p: number): TradingInput => ({ mode: "profit", turnover: p, expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 });
const letting = (p: Partial<PropertyInput>): PropertyInput => ({
  rent: 0,
  expenses: 0,
  financeCosts: 0,
  financeCostsBroughtForward: 0,
  lossesBroughtForward: 0,
  allowance: "expenses",
  ...p,
});

describe("personalIncomeTax: the original income tax cases still hold", () => {
  it("personal-tax/income-tax-computation › basic-rate-tax: £6,486", () => {
    expect(tax({ employment: 45000 }).tax).toBe(6486);
  });
  it("personal-tax/income-tax-computation › tapered-pa: allowance £4,570 at £116,000", () => {
    expect(tax({ employment: 116000 }).personalAllowance).toBe(4570);
  });
  it("personal-tax/income-tax-computation › additional-rate: £44,703", () => {
    const r = tax({ employment: 130000 });
    expect(r.personalAllowance).toBe(0);
    expect(r.tax).toBe(44703);
  });
  it("personal-tax/income-tax-computation › taper example (£110,000): £33,432", () => {
    expect(tax({ otherNonSavings: 110000 }).tax).toBe(33432);
  });
  it("personal-tax/savings-and-dividend-income › dividend-tax-basic: £591.25", () => {
    expect(tax({ employment: 30000, dividends: 6000 }).dividendTax).toBe(591.25);
  });
  it("personal-tax/savings-and-dividend-income › psa-higher: £600", () => {
    const r = tax({ employment: 60000, savings: 2000 });
    expect(r.personalSavingsAllowance).toBe(500);
    expect(r.savingsTax).toBe(600);
  });
  it("personal-tax/savings-and-dividend-income › srs-available: £2,370 at the starting rate, £526 tax", () => {
    const r = tax({ employment: 15200, savings: 6000 });
    expect(r.startingRateForSavings).toBe(2370);
    expect(r.savingsTax).toBe(526);
  });
  it("personal-tax/savings-and-dividend-income › starting rate example: £286", () => {
    expect(tax({ employment: 14000, savings: 4500 }).tax).toBe(286);
  });
  it("personal-tax/savings-and-dividend-income › Ravi Shah: £7,058.75 (2026/27) and £6,168.75 (2025/26)", () => {
    expect(tax({ employment: 12570, savings: 1800, dividends: 45000 }).tax).toBe(7058.75);
    expect(tax({ employment: 12570, savings: 1800, dividends: 45000 }, "2025/26").tax).toBe(6168.75);
  });
  it("edge: nil income, and exact taper points", () => {
    const nil = tax({});
    expect(nil.tax).toBe(0);
    expect(nil.effectiveRate).toBeNull();
    expect(tax({ employment: 100000 }).personalAllowance).toBe(12570);
    const r = tax({ employment: 125140 });
    expect(r.personalAllowance).toBe(0);
    expect(r.tax).toBe(7540 + 34976);
  });
});

describe("personalIncomeTax: PAYE and tax deducted", () => {
  it("personal-tax/income-tax-computation › Harriet Osei: £35,832 liability, £1,932 payable after PAYE £33,900", () => {
    const r = tax({ employment: 114000, paye: 33900 });
    expect(r.tax).toBe(35832);
    expect(r.taxPayable).toBe(1932);
  });
  it("repayment when tax deducted exceeds the liability", () => {
    const r = tax({ employment: 20000, paye: 1500, otherTaxDeducted: 100 });
    expect(r.tax).toBe(1486); // (£20,000 − £12,570) × 20%
    expect(r.taxPayable).toBe(-114);
  });
});

describe("personalIncomeTax: Gift Aid and pension contributions", () => {
  it("personal-tax/marriage-allowance-gift-aid-and-pension-relief › Hannah: £13,032 → £10,632, ANI £52,000", () => {
    expect(tax({ employment: 64000 }).tax).toBe(13032);
    const r = tax({ employment: 64000, giftAidNet: 1600, rasPensionNet: 8000 });
    expect(r.basicRateBandExtension).toBe(12000);
    expect(r.tax).toBe(10632);
    expect(r.adjustedNetIncome).toBe(52000);
  });
  it("… Hannah is still a higher rate taxpayer, so marriage allowance isn't given", () => {
    const r = tax({ employment: 64000, giftAidNet: 1600, rasPensionNet: 8000, marriage: "recipient" });
    expect(r.tax).toBe(10632);
    expect(r.marriageAllowanceApplied).toBe(false);
    expect(r.notes[0]).toMatch(/Marriage allowance not given/);
  });
  it("… gift-aid-limited (Owen): extra relief £346", () => {
    expect(r2(tax({ employment: 52000 }).tax - tax({ employment: 52000, giftAidNet: 4000 }).tax)).toBe(346);
  });
  it("… pension-extra (Fatima): extra relief £2,000", () => {
    expect(tax({ employment: 70000 }).tax - tax({ employment: 70000, rasPensionNet: 8000 }).tax).toBe(2000);
  });
  it("pensions/pension-tax-relief-net-pay-vs-relief-at-source › net-cost-higher: £2,000 net pay costs £1,200 (relief £800)", () => {
    const r = tax({ employment: 60000, netPayPension: 2000 });
    expect(r.tax).toBe(10632);
    expect(tax({ employment: 60000 }).tax - r.tax).toBe(800);
  });
  it("pensions/… › extra-relief: £5,000 gross RAS for a 40% taxpayer gives £1,000 through the return", () => {
    expect(tax({ employment: 80000 }).tax - tax({ employment: 80000, rasPensionNet: 4000 }).tax).toBe(1000);
  });
  it("Gift Aid reduces adjusted net income for the personal allowance taper", () => {
    // ANI £110,000 − £8,000 = £102,000 → PA £12,570 − £1,000.
    expect(tax({ employment: 110000, giftAidNet: 6400 }).personalAllowance).toBe(11570);
  });
});

describe("personalIncomeTax: High Income Child Benefit Charge", () => {
  it("personal-tax/high-income-child-benefit-charge › hicbc-basic (Sana): £784", () => {
    const r = tax({ employment: 71200, childBenefit: 1400 });
    expect(r.hicbcPercent).toBe(56);
    expect(r.hicbc).toBe(784);
  });
  it("… hicbc-with-gift-aid (Ben): £345", () => {
    expect(tax({ employment: 66000, giftAidNet: 2400, childBenefit: 2300 }).hicbc).toBe(345);
  });
  it("… lesson table with Child Benefit £2,300", () => {
    expect(tax({ employment: 58000, childBenefit: 2300 }).hicbc).toBe(0);
    expect(tax({ employment: 64000, childBenefit: 2300 }).hicbc).toBe(460);
    expect(tax({ employment: 70000, childBenefit: 2300 }).hicbc).toBe(1150);
    expect(tax({ employment: 79000, childBenefit: 2300 }).hicbc).toBe(2185);
    expect(tax({ employment: 85000, childBenefit: 2300 }).hicbc).toBe(2300);
  });
  it("edge: percentage is per complete £200 and the charge is rounded down (ITEPA 2003 s681C(3))", () => {
    expect(tax({ employment: 60199, childBenefit: 2300 }).hicbc).toBe(0);
    expect(tax({ employment: 60200, childBenefit: 2300 }).hicbc).toBe(23);
    expect(tax({ employment: 60200, childBenefit: 1407 }).hicbc).toBe(14); // 1% × £1,407 = £14.07 → £14
    expect(tax({ employment: 80000, childBenefit: 2300 }).hicbcPercent).toBe(100);
  });
  it("the charge is added to the liability after the tax on income", () => {
    const r = tax({ employment: 71200, childBenefit: 1400 });
    expect(r.tax).toBe(r2(r.taxOnIncome + 784));
  });
});

describe("personalIncomeTax: marriage allowance and blind person's allowance", () => {
  // GOV.UK Marriage Allowance example: incomes £11,500 and £20,000; the couple save £214.
  // https://www.gov.uk/marriage-allowance
  it("GOV.UK example: transferor pays tax on £190, recipient's tax falls by £252, saving £214", () => {
    const transferor = tax({ employment: 11500, marriage: "transferor" });
    expect(transferor.personalAllowance).toBe(11310);
    expect(transferor.tax).toBe(38);
    const recipient = tax({ employment: 20000, marriage: "recipient" });
    expect(recipient.marriageAllowanceReducer).toBe(252);
    expect(recipient.tax).toBe(1234);
    expect(tax({ employment: 20000 }).tax - recipient.tax - transferor.tax).toBe(214);
  });
  it("personal-tax/marriage-allowance… › ma-eligible: recipient on £72,000 isn't eligible", () => {
    const r = tax({ employment: 72000, marriage: "recipient" });
    expect(r.marriageAllowanceReducer).toBe(0);
    expect(r.tax).toBe(tax({ employment: 72000 }).tax);
  });
  it("Scottish intermediate rate recipient is eligible (GOV.UK: starter, basic or intermediate rate)", () => {
    // Taxable £27,430: £3,967 × 19% + £12,989 × 20% + £10,474 × 21% = £5,551.07, less £252.
    expect(tax({ region: "scotland", employment: 40000, marriage: "recipient" }).tax).toBe(5299.07);
  });
  it("blind person's allowance is added to the personal allowance and isn't tapered", () => {
    expect(tax({ employment: 30000, blind: true }).tax).toBe(2836); // (£30,000 − £12,570 − £3,250) × 20%
    // £110,000: PA £7,570 + BPA £3,250; taxable £99,180 → £7,540 + £61,480 × 40%.
    expect(tax({ employment: 110000, blind: true }).tax).toBe(32132);
    expect(tax({ employment: 30000, blind: true }, "2025/26").blindPersonsAllowance).toBe(3130);
  });
});

describe("personalIncomeTax: Scottish taxpayers", () => {
  // Bands per GOV.UK Scottish Income Tax 2026/27 (https://www.gov.uk/scottish-income-tax): starter to £16,537,
  // basic to £29,526, intermediate to £43,662, higher to £75,000, advanced to £125,140, top above.
  it("£50,000 employment: starter, basic, intermediate and higher bands → £8,982.05", () => {
    // £3,967 × 19% = £753.73; £12,989 × 20% = £2,597.80; £14,136 × 21% = £2,968.56; £6,338 × 42% = £2,661.96.
    const r = tax({ region: "scotland", employment: 50000 });
    expect(r.tax).toBe(8982.05);
    expect(r.chargedAboveBasicRate).toBe(true);
  });
  it("£150,000: all six bands → £59,634.35", () => {
    // + £31,338 × 42% + £62,710 × 45% + £24,860 × 48%.
    expect(tax({ region: "scotland", employment: 150000 }).tax).toBe(59634.35);
  });
  it("savings at UK rates in the UK bands, with the PSA set by the UK bands", () => {
    const r = tax({ region: "scotland", employment: 45000, savings: 2000 });
    expect(r.personalSavingsAllowance).toBe(1000); // taxable £34,430 is inside the UK basic rate band
    expect(r.savingsTax).toBe(200);
    expect(r.nonSavingsTax).toBe(6882.05);
  });
  // mygov.scot worked example: a 42% Scottish taxpayer giving £100 (£125 with Gift Aid) can claim an extra £27.50.
  // https://mygov.scot/scottish-income-tax/allowances-and-reliefs ; band extension per PTM056120.
  it("mygov.scot Gift Aid example: £100 net gives £27.50 extra relief to a 42% taxpayer", () => {
    expect(r2(tax({ region: "scotland", employment: 50000 }).tax - tax({ region: "scotland", employment: 50000, giftAidNet: 100 }).tax)).toBe(27.5);
  });
  it("2025/26 Scottish bands", () => {
    // Taxable £17,430 in 2025/26: £2,827 × 19% + £12,094 × 20% + £2,509 × 21% = £537.13 + £2,418.80 + £526.89.
    expect(tax({ region: "scotland", employment: 30000 }, "2025/26").tax).toBe(3482.82);
  });
});

describe("personalIncomeTax: trading and property allowances", () => {
  it("personal-tax/self-employment-trading-income › trading-allowance (Bea): £2,200", () => {
    const r = tax({ trading: { mode: "accounts", turnover: 3200, expenses: 600, capitalAllowances: 0, allowance: "best", lossesBroughtForward: 0 } });
    expect(r.tradingProfit).toBe(2200);
    expect(r.tradingAllowanceUsed).toBe(true);
  });
  it("full relief when trading income is £1,000 or less", () => {
    expect(tax({ employment: 30000, trading: { mode: "accounts", turnover: 900, expenses: 0, capitalAllowances: 0, allowance: "allowance", lossesBroughtForward: 0 } }).tradingProfit).toBe(0);
  });
  it("personal-tax/property-income › property-allowance (Leon): £1,400", () => {
    const r = tax({ property: letting({ rent: 2400, expenses: 300, allowance: "best" }) });
    expect(r.propertyProfit).toBe(1400);
    expect(r.propertyAllowanceUsed).toBe(true);
  });
  it("trading loss: profit nil, loss carried forward; losses brought forward used", () => {
    const loss = tax({ trading: { mode: "accounts", turnover: 10000, expenses: 15000, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 } });
    expect(loss.tradingProfit).toBe(0);
    expect(loss.tradingLossCarriedForward).toBe(5000);
    const bf = tax({ trading: { ...profit(20000), lossesBroughtForward: 3000 } });
    expect(bf.tradingProfit).toBe(17000);
  });
  it("reliefs are capped at total income", () => {
    const r = tax({ employment: 5000, reliefs: 8000 });
    expect(r.reliefsUsed).toBe(5000);
    expect(r.netIncome).toBe(0);
  });
});

describe("target modes", () => {
  it("personal-tax/marriage-allowance… › ani-taper (Rhys £110,000): £8,000 net restores the allowance", () => {
    const t = pensionToRestoreAllowance({ taxYear: Y, employment: 110000 });
    expect(t.net).toBe(8000);
    expect(t.gross).toBe(10000);
    expect(t.taxSaved).toBe(4000); // 60% of £10,000 less the 20% the provider claims
  });
  it("personal-tax/income-tax-computation › Harriet: £11,200 net (£14,000 gross)", () => {
    expect(pensionToRestoreAllowance({ taxYear: Y, employment: 114000 }).net).toBe(11200);
  });
  it("already met: no contribution needed", () => {
    const t = pensionToRestoreAllowance({ taxYear: Y, employment: 90000 });
    expect(t.alreadyMet).toBe(true);
    expect(t.net).toBe(0);
  });
  it("personal-tax/high-income-child-benefit-charge › contribution-needed (Chloe £74,000): £11,200 net to reach £60,000", () => {
    const t = pensionToRemoveHicbc({ taxYear: Y, employment: 74000, childBenefit: 2300 });
    expect(t.netToThreshold).toBe(11200);
    // Rounding down means ANI of £60,199.99 already gives a nil charge: gross £13,800.01.
    expect(t.net).toBe(11040.01);
    expect(t.taxAfter).not.toBeNull();
  });
  it("personal-tax/high-income-child-benefit-charge › Lewis: £6,720 net removes £966 HICBC and saves £1,680 on the return", () => {
    const base = { taxYear: Y, trading: profit(68400), childBenefit: 2300 };
    expect(personalIncomeTax(base).hicbc).toBe(966);
    const t = pensionToRemoveHicbc(base);
    expect(t.netToThreshold).toBe(6720);
    const after = personalIncomeTax({ ...base, rasPensionNet: 6720 });
    expect(after.hicbc).toBe(0);
    expect(personalIncomeTax(base).taxOnIncome - after.taxOnIncome).toBe(1680);
  });
  it("warns when the contribution exceeds relevant earnings", () => {
    // Investment income only: relief limited to £3,600 gross.
    const t = pensionToRestoreAllowance({ taxYear: Y, dividends: 120000 });
    expect(t.warnings.join(" ")).toMatch(/relief limit/);
  });
  it("solveMinPennies: finds the exact penny and reports impossible targets", () => {
    expect(solveMinPennies((x) => x >= 123.45, 1000)).toBe(123.45);
    expect(solveMinPennies(() => false, 1000)).toBeNull();
  });
});

describe("saPayments (payments on account)", () => {
  // GOV.UK "Payments on account" example: 2023 to 2024 bill £3,000, POAs of £900 each paid.
  // https://www.gov.uk/understand-self-assessment-bill/payments-on-account
  it("GOV.UK example: balancing £1,200 + POA £1,500 = £2,700 in January, £1,500 in July", () => {
    const r = saPayments({ taxYear: "2025/26", incomeTax: 3000, taxDeductedAtSource: 0, poasPaid: 1800 });
    expect(r.balancing).toBe(1200);
    expect(r.poaEach).toBe(1500);
    expect(r.schedule.map((s) => s.amount)).toEqual([2700, 1500]);
  });
  it("GOV.UK example with no POAs the year before: £4,500 in January", () => {
    expect(saPayments({ taxYear: "2025/26", incomeTax: 3000, taxDeductedAtSource: 0 }).schedule[0].amount).toBe(4500);
  });
  it("personal-tax/sa-timetable-payments-and-penalties › Dev Kapoor: £8,300 on 31 January 2027, £6,100 on 31 July 2027", () => {
    const r = saPayments({ taxYear: "2025/26", incomeTax: 14600, taxDeductedAtSource: 2400, poasPaid: 10000 });
    expect(r.relevantAmount).toBe(12200);
    expect(r.balancing).toBe(2200);
    expect(r.schedule).toEqual([
      { date: "31 January 2027", label: "2025/26 balancing payment + first 2026/27 payment on account", amount: 8300 },
      { date: "31 July 2027", label: "Second 2026/27 payment on account", amount: 6100 },
    ]);
  });
  it("… jan-payment (Sophie): £7,500", () => {
    expect(saPayments({ taxYear: "2025/26", incomeTax: 9800, taxDeductedAtSource: 0, poasPaid: 7200 }).schedule[0].amount).toBe(7500);
  });
  it("… poa-80-test: 85% at source → no POAs", () => {
    const r = saPayments({ taxYear: "2025/26", incomeTax: 8000, taxDeductedAtSource: 6800 });
    expect(r.poaRequired).toBe(false);
    expect(r.balancing).toBe(1200);
  });
  it("edges: bill under £1,000 → none; exactly £1,000 and exactly 80% at source → required", () => {
    expect(saPayments({ taxYear: Y, incomeTax: 999.99, taxDeductedAtSource: 0 }).poaRequired).toBe(false);
    expect(saPayments({ taxYear: Y, incomeTax: 1000, taxDeductedAtSource: 0 }).poaRequired).toBe(true);
    const r = saPayments({ taxYear: Y, incomeTax: 5000, taxDeductedAtSource: 4000 });
    expect(r.poaRequired).toBe(true);
    expect(r.schedule[0].date).toBe("31 January 2028");
  });
  it("Class 4 counts towards POAs; voluntary Class 2 is paid only with the balancing payment", () => {
    const r = saPayments({ taxYear: Y, incomeTax: 4000, class4: 1000, taxDeductedAtSource: 0, balancingOnly: [{ label: "Voluntary Class 2", amount: 189.8 }] });
    expect(r.poaEach).toBe(2500);
    expect(r.balancing).toBe(5189.8);
  });
  it("nextTaxYear", () => {
    expect(nextTaxYear("2026/27")).toBe("2027/28");
    expect(nextTaxYear("2099/00")).toBe("2100/01");
  });
});

describe("class4Nic and selfEmployedTax", () => {
  it("personal-tax/class-2-and-class-4-nic › class4-basic (Leah £28,000): £925.80", () => {
    expect(class4Nic(Y, 28000).total).toBe(925.8);
  });
  it("… class4-higher (Simon £75,000): £2,756.60", () => {
    expect(class4Nic(Y, 75000).total).toBe(2756.6);
  });
  it("… Arjun £58,300: £2,422.60; Class 2 treated as paid", () => {
    const r = selfEmployedTax({ taxYear: Y, trading: profit(58300) });
    expect(r.class4.total).toBe(2422.6);
    expect(r.class2TreatedAsPaid).toBe(true);
    // Income tax: £37,700 × 20% + £8,030 × 40% = £10,752.
    expect(r.incomeTax.tax).toBe(10752);
    expect(r.tax).toBe(13174.6);
  });
  it("… Gemma £4,200: below the small profits threshold; voluntary-class2 52 weeks = £189.80", () => {
    const r = selfEmployedTax({ taxYear: Y, trading: profit(4200), voluntaryClass2Weeks: 52 });
    expect(r.class2TreatedAsPaid).toBe(false);
    expect(r.class2Voluntary).toBe(189.8);
    expect(r.class4.total).toBe(0);
  });
  it("edge: exactly at the small profits threshold Class 2 is treated as paid; Class 4 nil at the LPL", () => {
    expect(selfEmployedTax({ taxYear: Y, trading: profit(7105) }).class2TreatedAsPaid).toBe(true);
    expect(class4Nic(Y, 12570).total).toBe(0);
  });
  it("… spa-exemption: over State Pension age at the start of the year → no Class 4", () => {
    expect(selfEmployedTax({ taxYear: Y, trading: profit(30000), overStatePensionAge: true }).class4.total).toBe(0);
  });
  it("payments on account include Class 4", () => {
    const r = selfEmployedTax({ taxYear: Y, trading: profit(28000) });
    // Income tax £3,086 + Class 4 £925.80 = £4,011.80; POA £2,005.90 each.
    expect(r.payments.relevantAmount).toBe(4011.8);
    expect(r.payments.poaEach).toBe(2005.9);
    expect(r.payments.schedule[0]).toEqual({ date: "31 January 2028", label: "2026/27 balancing payment + first 2027/28 payment on account", amount: 6017.7 });
  });
  it("trading allowance and other income combine", () => {
    const r = selfEmployedTax({
      taxYear: Y,
      employment: 40000,
      paye: 5486,
      trading: { mode: "accounts", turnover: 3200, expenses: 600, capitalAllowances: 0, allowance: "best", lossesBroughtForward: 0 },
    });
    expect(r.tradingProfit).toBe(2200);
    expect(r.incomeTax.tax).toBe(5926); // (£42,200 − £12,570) × 20%
    expect(r.class4.total).toBe(0);
  });
  it("validation", () => {
    expect(() => selfEmployedTax({ taxYear: Y, trading: profit(-1) })).toThrow(CalcInputError);
    expect(() => selfEmployedTax({ taxYear: Y, trading: profit(1000), voluntaryClass2Weeks: 60 })).toThrow(CalcInputError);
  });
});

describe("propertyTax", () => {
  it("personal-tax/property-income › Gareth: £8,292 after a £1,440 finance cost reduction; £7,196 if interest were deductible", () => {
    const r = propertyTax({ taxYear: Y, employment: 42000, property: letting({ rent: 18000, expenses: 4250, financeCosts: 7200 }) });
    expect(r.incomeTax.propertyProfit).toBe(13750);
    expect(r.incomeTax.taxOnIncome).toBe(9732);
    expect(r.incomeTax.financeCostReducer).toBe(1440);
    expect(r.tax).toBe(8292);
    expect(r.taxIfFinanceCostsDeductible).toBe(7196);
    expect(r.taxOnProperty).toBe(8292 - 5886);
  });
  it("… s24-limit (Maureen): reduction £486 limited by adjusted total income; £2,570 carried forward", () => {
    const r = propertyTax({ taxYear: Y, otherNonSavings: 6000, property: letting({ rent: 9000, financeCosts: 5000 }) });
    expect(r.incomeTax.financeCostReducer).toBe(486);
    expect(r.incomeTax.financeCostsCarriedForward).toBe(2570);
    expect(r.tax).toBe(0);
  });
  // GOV.UK case study A (Sophia): rent £52,000, other expenses £9,000, finance costs £20,000; reducer
  // limited to the finance costs. https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies
  // The page uses 2016/17 bands; the mechanism is reproduced with 2026/27 figures.
  it("GOV.UK case study A mechanism: 20% × £20,000 finance costs (the lowest figure)", () => {
    const r = propertyTax({ taxYear: Y, property: letting({ rent: 52000, expenses: 9000, financeCosts: 20000 }) });
    expect(r.incomeTax.financeCostReducer).toBe(4000);
    expect(r.tax).toBe(6086 - 4000); // £30,430 × 20% − £4,000
  });
  it("finance costs brought forward add to the reducer; property losses carried forward", () => {
    const r = propertyTax({ taxYear: Y, employment: 50000, property: letting({ rent: 12000, expenses: 2000, financeCosts: 3000, financeCostsBroughtForward: 1000 }) });
    expect(r.incomeTax.financeCostReducer).toBe(800);
    const loss = propertyTax({ taxYear: Y, employment: 50000, property: letting({ rent: 5000, expenses: 7000, lossesBroughtForward: 500 }) });
    expect(loss.incomeTax.propertyProfit).toBe(0);
    expect(loss.incomeTax.propertyLossCarriedForward).toBe(2500);
  });
  it("the property allowance blocks the finance cost reduction", () => {
    const r = propertyTax({ taxYear: Y, employment: 50000, property: letting({ rent: 3000, expenses: 100, financeCosts: 1500, allowance: "allowance" }) });
    expect(r.incomeTax.financeCostReducer).toBe(0);
    expect(r.incomeTax.propertyProfit).toBe(2000);
  });
});

describe("validation", () => {
  it("rejects negatives and net pay above employment income", () => {
    expect(validatePersonalTax({ taxYear: Y, employment: -1 })).toHaveLength(1);
    expect(validatePersonalTax({ taxYear: Y, employment: 1000, netPayPension: 2000 })).toHaveLength(1);
    expect(() => personalIncomeTax({ taxYear: Y, savings: -5 })).toThrow(CalcInputError);
  });
});

function r2(x: number) {
  return Math.round(x * 100) / 100;
}
