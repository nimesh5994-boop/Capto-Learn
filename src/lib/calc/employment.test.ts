/**
 * Worked-example tests for the employment calculators.
 *
 * Expected figures are checked answers from Capto Learn payroll lessons (file and
 * exercise id cited), GOV.UK / HMRC worked figures (URL cited), and edge cases.
 */
import { describe, expect, it } from "vitest";
import { rate } from "@/content/rates";
import { CalcInputError, rateReader } from "./common";
import {
  type TakeHomeInput,
  class1,
  codeForAllowance,
  employerCost,
  mileage,
  parseTaxCode,
  payeTax,
  periodAdjustment,
  solveTakeHome,
  statutoryPay,
  takeHome,
  validateTakeHome,
} from "./employment";

const Y = "2026/27";
const R = () => rateReader(Y);

const base = (over: Partial<TakeHomeInput> = {}): TakeHomeInput => ({
  taxYear: Y,
  frequency: "monthly",
  annualGross: 36000,
  taxCode: "1257L",
  nicCategory: "A",
  studentLoan: "none",
  postgraduateLoan: false,
  pension: { scheme: "none", basis: "all", employee: { mode: "percent", value: 0 }, employer: { mode: "percent", value: 0 } },
  benefits: { annualValue: 0, method: "none" },
  ...over,
});

describe("dataset: extra employment figures", () => {
  it("holds HMRC's published weekly/monthly NIC thresholds (GOV.UK rates and thresholds for employers 2026 to 2027)", () => {
    expect(rate(Y, "emp.nic-pt-monthly")?.amount).toBe(1048);
    expect(rate(Y, "emp.nic-st-weekly")?.amount).toBe(96);
    expect(rate(Y, "emp.nic-lel-monthly")?.amount).toBe(559);
    expect(rate("2025/26", "emp.nic-lel-weekly")?.amount).toBe(125);
    expect(rate(Y, "emp.sl-plan2-monthly")?.amount).toBe(2448.75);
    expect(rate("2025/26", "emp.sl-plan5-monthly")).toBeUndefined();
  });
});

describe("PAYE: tax codes and free pay (HMRC Specification for PAYE tax table routines v24.0)", () => {
  it("parses common codes", () => {
    expect(parseTaxCode("1257L").code).toMatchObject({ kind: "allowance", number: 1257, region: "rUK" });
    expect(parseTaxCode("s1257l").code).toMatchObject({ region: "scotland" });
    expect(parseTaxCode("C1257L M1").code).toMatchObject({ region: "wales", nonCumulative: true });
    expect(parseTaxCode("1257L W1").code?.nonCumulative).toBe(true);
    expect(parseTaxCode("K468").code).toMatchObject({ kind: "k", number: 468 });
    expect(parseTaxCode("SD2").code).toMatchObject({ kind: "flat", flatBand: 2, region: "scotland" });
    expect(parseTaxCode("0T").code).toMatchObject({ kind: "allowance", number: 0 });
    expect(parseTaxCode("SNT").error).toBeTruthy();
    expect(parseTaxCode("K0").error).toBeTruthy();
    expect(parseTaxCode("1257Q").error).toBeTruthy();
  });

  it("free pay per spec 4.3.1 (500-blocks of £96.16 / £416.67 plus the remainder, rounded up to 1p)", () => {
    // 1257 → 2 blocks + code 257: 2579/12 = 214.9167 → 214.92 + 833.34
    expect(periodAdjustment(1257, 12)).toBe(1048.26);
    expect(periodAdjustment(1257, 52)).toBe(241.92);
    expect(periodAdjustment(500, 52)).toBe(96.33); // 5009/52 = 96.326 → 96.33
    expect(periodAdjustment(1, 12)).toBe(1.59); // £19 a year
    expect(periodAdjustment(0, 12)).toBe(0);
  });

  it("starters-and-tax-codes › build-a-code: £12,570 − £5,400 − £300 → 687L", () => {
    expect(codeForAllowance(12570 - 5400 - 300)).toBe("687L");
  });

  it("starters-and-tax-codes › k-code: benefits £17,250 against £12,570 → K468, adding £4,689 a year", () => {
    expect(codeForAllowance(12570 - 17250)).toBe("K468");
    // K468 month 1 additional pay = 4689/12 = 390.75 (rounded up to 1p, exact here)
    expect(periodAdjustment(468, 12)).toBe(390.75);
    expect(codeForAllowance(-15)).toBe("0T");
    expect(codeForAllowance(5)).toBe("1L");
  });

  it("starters-and-tax-codes › cumulative-refund: month 6, pay to date £15,000, tax paid £1,800 → refund £58", () => {
    const r = payeTax(R(), {
      code: parseTaxCode("1257L").code!,
      frequency: "monthly",
      pay: 2500,
      cumulative: { payToDate: 15000, periodNumber: 6, taxPaidToDate: 1800 },
    });
    expect(r.taxablePay).toBe(8710);
    expect(r.tax).toBe(-58);
  });

  it("applies the 50% overriding limit to a K code", () => {
    const r = payeTax(R(), { code: parseTaxCode("K1000").code!, frequency: "monthly", pay: 500 });
    expect(r.limited).toBe(true);
    expect(r.tax).toBe(250);
  });

  it("BR, D0, D1 and Scottish SD codes tax all pay at one rate", () => {
    const t = (c: string, pay = 1000.99) => payeTax(R(), { code: parseTaxCode(c).code!, frequency: "monthly", pay }).tax;
    expect(t("BR")).toBe(200);
    expect(t("D0")).toBe(400);
    expect(t("D1")).toBe(450);
    expect(t("SBR")).toBe(200);
    expect(t("SD0")).toBe(210);
    expect(t("SD1")).toBe(420);
    expect(t("SD3")).toBe(480);
    expect(t("NT")).toBe(0);
    expect(() => t("D2")).toThrow(CalcInputError);
  });
});

describe("Take-home pay — lesson calculating-paye-and-nic (2026/27)", () => {
  it("scenario: Jade £3,000 a month, 1257L → tax £390.20, NIC £156.16, net £2,453.64, employer NIC £387.45", () => {
    const r = takeHome(base({ annualGross: 36000 }));
    expect(r.period.tax).toBe(390.2);
    expect(r.period.employeeNic).toBe(156.16);
    expect(r.period.netPay).toBe(2453.64);
    expect(r.period.employerNic).toBe(387.45);
    expect(r.annual.netPay).toBe(29443.68);
  });

  it("scenario: Marcus £6,000 a month, 5% net pay pension → tax £1,232.06, NIC £287.50, net £4,180.44, employer £837.45", () => {
    const r = takeHome(base({ annualGross: 72000, pension: { scheme: "netPay", basis: "all", employee: { mode: "percent", value: 5 }, employer: { mode: "percent", value: 0 } } }));
    expect(r.period.netPayPension).toBe(300);
    expect(r.period.tax).toBe(1232.06);
    expect(r.period.employeeNic).toBe(287.5);
    expect(r.period.netPay).toBe(4180.44);
    expect(r.period.employerNic).toBe(837.45);
  });

  it("scenario callout: Marcus by salary sacrifice saves £6.00 employee and £45.00 employer NIC a month", () => {
    const pen = (scheme: "netPay" | "sacrifice") => ({ scheme, basis: "all" as const, employee: { mode: "percent" as const, value: 5 }, employer: { mode: "percent" as const, value: 0 } });
    const np = takeHome(base({ annualGross: 72000, pension: pen("netPay") }));
    const ss = takeHome(base({ annualGross: 72000, pension: pen("sacrifice") }));
    expect(np.period.employeeNic - ss.period.employeeNic).toBeCloseTo(6, 2);
    expect(np.period.employerNic - ss.period.employerNic).toBeCloseTo(45, 2);
    expect(ss.period.tax).toBe(np.period.tax);
  });

  it("weekly-tax / weekly-employee-nic / weekly-employer-nic: £400 a week → £31.60, £12.64, £45.60", () => {
    const r = takeHome(base({ frequency: "weekly", annualGross: 400 * 52 }));
    expect(r.period.gross).toBe(400);
    expect(r.period.tax).toBe(31.6);
    expect(r.period.employeeNic).toBe(12.64);
    expect(r.period.employerNic).toBe(45.6);
  });

  it("bonus-month-nic: £5,500 in a month → employee NIC £277.50", () => {
    const r = takeHome(base({ annualGross: 5500 * 12 }));
    expect(r.period.employeeNic).toBe(277.5);
  });
});

describe("Student and postgraduate loans — lesson student-and-postgraduate-loans", () => {
  it("plan2-monthly: £3,200 → £67", () => {
    expect(takeHome(base({ annualGross: 3200 * 12, studentLoan: "plan2" })).period.studentLoan).toBe(67);
  });
  it("plan1-weekly: £600 → £7", () => {
    expect(takeHome(base({ frequency: "weekly", annualGross: 600 * 52, studentLoan: "plan1" })).period.studentLoan).toBe(7);
  });
  it("pgl-and-plan2: £3,500 a month → £94 + £105 = £199", () => {
    const r = takeHome(base({ annualGross: 3500 * 12, studentLoan: "plan2", postgraduateLoan: true }));
    expect(r.period.studentLoan).toBe(94);
    expect(r.period.postgraduateLoan).toBe(105);
  });
  it("no deduction at or below the threshold; Plan 5 rejected for 2025/26", () => {
    expect(takeHome(base({ annualGross: 2448.75 * 12, studentLoan: "plan2" })).period.studentLoan).toBe(0);
    expect(validateTakeHome(base({ taxYear: "2025/26", studentLoan: "plan5" })).length).toBe(1);
  });
});

describe("Take-home: pensions, benefits, codes", () => {
  // The lesson's components (£3,450 NIC, £652.80 pension) are reproduced; its stated total of £31,892.80 is an
  // addition slip: £28,000 + £3,450 + £652.80 = £32,102.80 (reported for correction).
  it("setting-up-as-an-employer › annual-cost-of-hire: £28,000, 3% employer on qualifying earnings → NIC £3,450, pension £652.80 (annual basis)", () => {
    const r = takeHome(base({ frequency: "annual", annualGross: 28000, pension: { scheme: "none", basis: "qualifying", employee: { mode: "percent", value: 0 }, employer: { mode: "percent", value: 3 } } }));
    expect(r.annual.employerNic).toBe(3450);
    expect(r.annual.employerPension).toBe(652.8);
    expect(r.totalEmploymentCost).toBe(32102.8);
  });

  it("relief at source: 5% of £3,000 = £150 gross, £120 deducted from net pay; tax unchanged", () => {
    const r = takeHome(base({ pension: { scheme: "reliefAtSource", basis: "all", employee: { mode: "percent", value: 5 }, employer: { mode: "percent", value: 0 } } }));
    expect(r.period.reliefAtSourceNet).toBe(120);
    expect(r.period.tax).toBe(390.2);
    expect(r.period.netPay).toBe(2453.64 - 120);
  });

  it("benefit coded out: £5,400 + 1257L → 717L; Class 1A £810", () => {
    const r = takeHome(base({ benefits: { annualValue: 5400, method: "adjustCode" } }));
    expect(r.codeUsed).toBe("717L");
    expect(r.class1A).toBe(810);
    // 717 → 7179/12 = 598.25 free pay; (3000 − 598.25) → 2401 × 20%
    expect(r.period.tax).toBe(480.2);
  });

  it("payrolled benefit adds to pay for tax but not NIC", () => {
    const r = takeHome(base({ benefits: { annualValue: 1200, method: "payrolled" } }));
    expect(r.period.payForTax).toBe(3100);
    expect(r.period.employeeNic).toBe(156.16);
    expect(r.period.tax).toBe(410.2);
  });

  it("Scottish code: S1257L at £3,000 a month uses the Scottish bands", () => {
    // Taxable 1951: starter 3967/12 = 330.5833 × 19% = 62.8108; basic (16956−3967)/12 = 1082.4166 × 20% = 216.4833;
    // intermediate (1951 − 1413) = 537.9999.. × 21% → total 62.8108 + 216.4833 + 112.98 = 392.27
    const r = takeHome(base({ taxCode: "S1257L" }));
    expect(r.period.tax).toBe(392.27);
  });

  it("category C: no employee NIC, employer NIC as normal (nic-categories › over-spa-employer: £1,600 → £177.45)", () => {
    const r = takeHome(base({ annualGross: 1600 * 12, nicCategory: "C" }));
    expect(r.period.employeeNic).toBe(0);
    expect(r.period.employerNic).toBe(177.45);
  });

  it("nil pay gives nil deductions", () => {
    const r = takeHome(base({ annualGross: 0 }));
    expect(r.period.tax).toBe(0);
    expect(r.period.employeeNic).toBe(0);
    expect(r.period.netPay).toBe(0);
    expect(r.effectiveRate).toBeNull();
  });

  it("rejects bad inputs", () => {
    expect(() => takeHome(base({ annualGross: -1 }))).toThrow(CalcInputError);
    expect(() => takeHome(base({ taxCode: "XYZ" }))).toThrow(CalcInputError);
    expect(() => takeHome(base({ taxCode: "BR", benefits: { annualValue: 100, method: "adjustCode" } }))).toThrow(CalcInputError);
  });
});

describe("Take-home target modes (bisection)", () => {
  it("grossForNet: Jade's £2,453.64 net a month needs £36,000 gross", () => {
    const t = solveTakeHome(base(), "grossForNet", 2453.64);
    expect(t.solved).not.toBeNull();
    expect(t.result!.annual.netPay / 12).toBeGreaterThanOrEqual(2453.64);
    expect(Math.abs(t.solved! - 36000)).toBeLessThan(1);
  });

  it("grossForNet: the solution is the smallest such gross (1p less falls short)", () => {
    const t = solveTakeHome(base(), "grossForNet", 2000);
    const less = takeHome(base({ annualGross: t.solved! - 0.12 }));
    expect(less.annual.netPay / 12).toBeLessThan(2000);
  });

  it("maxSacrifice: keep £2,300 net a month on £36,000", () => {
    const t = solveTakeHome(base(), "maxSacrifice", 2300);
    expect(t.result!.annual.netPay / 12).toBeGreaterThanOrEqual(2300);
    const more = takeHome({ ...base(), pension: { scheme: "sacrifice", basis: "all", employee: { mode: "amount", value: t.solved! + 24 }, employer: { mode: "percent", value: 0 } } });
    expect(more.annual.netPay / 12).toBeLessThan(2300);
  });

  it("sacrificeForTaxablePay: £110,000 down to £100,000 needs £10,000 (to the penny, monthly)", () => {
    const t = solveTakeHome(base({ annualGross: 110000 }), "sacrificeForTaxablePay", 100000);
    expect(t.solved).toBeCloseTo(10000, 0);
    expect(t.result!.annual.payForTax).toBeLessThanOrEqual(100000);
  });

  it("returns no solution when out of range", () => {
    expect(solveTakeHome(base({ annualGross: 12000 }), "maxSacrifice", 5000).solved).toBeNull();
  });
});

describe("Employer cost — lesson nic-categories-and-employment-allowance", () => {
  it("under-21-high-earner: category M £4,500 a month → employer NIC £46.65", () => {
    expect(class1(R(), "monthly", "M", 4500).employer).toBe(46.65);
  });

  it("net-after-ea: 5 × £22,000 (annual) → £12,750 less EA £10,500 = £2,250", () => {
    const r = employerCost({ taxYear: Y, frequency: "annual", groups: [{ count: 5, annualPay: 22000, category: "A" }], class1ABenefits: 0, employmentAllowance: true });
    expect(r.employerNic).toBe(12750);
    expect(r.employmentAllowance).toBe(10500);
    expect(r.totalCost - r.totalPay).toBe(2250);
  });

  it("EA can't exceed the employer NIC, and isn't set against Class 1A", () => {
    const r = employerCost({ taxYear: Y, frequency: "annual", groups: [{ count: 1, annualPay: 20000, category: "A" }], class1ABenefits: 5000, employmentAllowance: true });
    expect(r.employerNic).toBe(2250);
    expect(r.employmentAllowance).toBe(2250);
    expect(r.class1A).toBe(750);
  });

  it("apprenticeship levy, GOV.UK pay-apprenticeship-levy: £3.6m pay bill → £18,000 − £15,000 = £3,000; nil at £3m", () => {
    const g = (pay: number) => employerCost({ taxYear: Y, frequency: "annual", groups: [{ count: 100, annualPay: pay, category: "A" }], class1ABenefits: 0, employmentAllowance: false });
    expect(g(36000).levy).toBe(3000);
    expect(g(30000).levy).toBe(0);
  });

  it("apprentice and veteran categories pay 0% to the upper secondary threshold (annual)", () => {
    const r = employerCost({ taxYear: Y, frequency: "annual", groups: [{ count: 1, annualPay: 50270, category: "H" }, { count: 1, annualPay: 60270, category: "V" }], class1ABenefits: 0, employmentAllowance: false });
    expect(r.employerNic).toBe(1500);
  });

  it("setting-up-as-an-employer › annual-cost-of-hire: components £3,450 + £652.80 (total £32,102.80; the lesson's £31,892.80 is an addition slip)", () => {
    const r = employerCost({ taxYear: Y, frequency: "annual", groups: [{ count: 1, annualPay: 28000, category: "A" }], employerPension: { percent: 3, basis: "qualifying" }, class1ABenefits: 0, employmentAllowance: false });
    expect(r.employerNic).toBe(3450);
    expect(r.pension).toBe(652.8);
    expect(r.totalCost).toBe(32102.8);
  });
});

describe("Statutory Sick Pay — lesson statutory-sick-pay (2026/27 rules)", () => {
  const ssp = (awe: number, qd: number, sick: number, extra = {}) =>
    statutoryPay({ taxYear: Y, payment: "ssp", awe, qualifyingDaysPerWeek: qd, sickDays: sick, ...extra });

  it("ssp-full-time: AWE £480, 5 QDs, 4 days → £98.60", () => expect(ssp(480, 5, 4).total).toBe(98.6));
  it("ssp-low-earner-weekly: AWE £95 → £76 a week (no LEL test)", () => {
    const r = ssp(95, 5, 5);
    expect(r.weeklyRate).toBe(76);
    expect(r.qualifies).toBe(true);
    expect(r.total).toBe(76);
  });
  it("ssp-three-day-week: AWE £150, 3 QDs, 3 days → £120", () => expect(ssp(150, 3, 3).total).toBe(120));
  it("scenario: Darren £73.95 and Megan £224", () => {
    expect(ssp(560, 5, 3).total).toBe(73.95);
    expect(ssp(140, 2, 4).total).toBe(224);
  });
  it("GOV.UK daily-rate table (rates and thresholds for employers 2026 to 2027): 7 QDs × 2 days = £35.22; 6 QDs × 4 days = £82.17; 4 QDs × 3 days = £92.44", () => {
    expect(ssp(1000, 7, 2).total).toBe(35.22);
    expect(ssp(1000, 6, 4).total).toBe(82.17);
    expect(ssp(1000, 4, 3).total).toBe(92.44);
    expect(ssp(1000, 7, 7).total).toBe(123.25);
  });
  it("28-week maximum across linked periods", () => {
    const r = ssp(1000, 5, 10, { daysAlreadyPaid: 135 });
    expect(r.daysPaid).toBe(5);
    expect(r.total).toBe(123.25);
  });
  it("2025/26: 3 waiting days and the LEL test (£118.75 flat)", () => {
    const old = statutoryPay({ taxYear: "2025/26", payment: "ssp", awe: 560, qualifyingDaysPerWeek: 5, sickDays: 3 });
    expect(old.total).toBe(0);
    const old2 = statutoryPay({ taxYear: "2025/26", payment: "ssp", awe: 560, qualifyingDaysPerWeek: 5, sickDays: 5 });
    expect(old2.total).toBe(47.5);
    const low = statutoryPay({ taxYear: "2025/26", payment: "ssp", awe: 100, qualifyingDaysPerWeek: 5, sickDays: 10 });
    expect(low.qualifies).toBe(false);
    expect(low.total).toBe(0);
  });
  it("SSP is never recoverable", () => expect(ssp(480, 5, 5).recoverable).toBe(0));
});

describe("Family statutory payments — lesson family-statutory-payments-and-recovery", () => {
  const fam = (payment: "smp" | "sap" | "spp" | "shpp", awe: number, weeks: number, extra = {}) =>
    statutoryPay({ taxYear: Y, payment, awe, weeks, continuousEmployment: true, ...extra });

  it("smp-low-earner: AWE £200 → £7,020", () => expect(fam("smp", 200, 39).total).toBe(7020));
  it("smp-high-earner: AWE £900 → £11,272.56", () => expect(fam("smp", 900, 39).total).toBe(11272.56));
  it("recovery-92: £1,554.56 of ShPP, previous NIC £182,000 → £1,430.20", () => {
    const r = fam("shpp", 400, 8, { previousYearClass1Nic: 182000, smpWeeksTaken: 12 });
    expect(r.total).toBe(1554.56);
    expect(r.recoverable).toBe(1430.2);
    expect(r.smallEmployer).toBe(false);
  });
  it("small employers' relief: 109% in 2026/27 and 108.5% in 2025/26", () => {
    expect(fam("spp", 1000, 2, { previousYearClass1Nic: 45000 }).recoverable).toBe(r2x(194.32 * 2 * 1.09));
    const old = statutoryPay({ taxYear: "2025/26", payment: "spp", awe: 1000, weeks: 2, continuousEmployment: true, previousYearClass1Nic: 30000 });
    expect(old.total).toBe(374.36);
    expect(old.recoverable).toBe(r2x(374.36 * 1.085));
  });
  it("doesn't qualify below the LEL or without 26 weeks' service", () => {
    expect(fam("smp", 128.99, 39).qualifies).toBe(false);
    expect(fam("smp", 129, 39).qualifies).toBe(true);
    expect(fam("spp", 500, 2, { continuousEmployment: false }).total).toBe(0);
  });
  it("ShPP weeks are limited to what's left of 39", () => {
    expect(() => fam("shpp", 500, 30, { smpWeeksTaken: 12 })).toThrow(CalcInputError);
  });
});

function r2x(x: number) {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

describe("Mileage — lesson expenses-and-mileage-allowances (2026/27)", () => {
  it("mar-claim: 11,000 miles at 35p → MAR £1,900", () => {
    const r = mileage({ taxYear: Y, vehicle: "car", businessMiles: 11000, paid: { mode: "perMile", value: 35 } });
    expect(r.approved).toBe(5750);
    expect(r.mar).toBe(1900);
    expect(r.taxableExcess).toBe(0);
  });
  it("tax-but-no-nic: 14,000 miles at 50p → £500 taxable, no NIC", () => {
    const r = mileage({ taxYear: Y, vehicle: "car", businessMiles: 14000, paid: { mode: "perMile", value: 50 } });
    expect(r.taxableExcess).toBe(500);
    expect(r.nicFree).toBe(7700);
    expect(r.nicableExcess).toBe(0);
  });
  it("2025/26 uses 45p; motorcycle 24p and cycle 20p; passenger 5p", () => {
    expect(mileage({ taxYear: "2025/26", vehicle: "car", businessMiles: 1000, paid: { mode: "perMile", value: 45 } }).mar).toBe(0);
    expect(mileage({ taxYear: Y, vehicle: "motorcycle", businessMiles: 1000, paid: { mode: "total", value: 300 } }).taxableExcess).toBe(60);
    expect(mileage({ taxYear: Y, vehicle: "cycle", businessMiles: 500, paid: { mode: "total", value: 0 } }).mar).toBe(100);
    const p = mileage({ taxYear: Y, vehicle: "car", businessMiles: 1000, paid: { mode: "perMile", value: 55 }, passengerMiles: 1000, passengerRatePence: 8 });
    expect(p.passengerApproved).toBe(50);
    expect(p.passengerTaxable).toBe(30);
  });
  it("MAR tax saving at the higher rate", () => {
    const r = mileage({ taxYear: Y, vehicle: "car", businessMiles: 11000, paid: { mode: "perMile", value: 35 }, taxRate: "higher" });
    expect(r.marTaxSaving).toBe(760);
  });
  it("rejects passenger payments for a cycle", () => {
    expect(() => mileage({ taxYear: Y, vehicle: "cycle", businessMiles: 10, paid: { mode: "total", value: 0 }, passengerMiles: 5 })).toThrow(CalcInputError);
  });
});
