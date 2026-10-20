import { describe, expect, it } from "vitest";
import { rate } from "@/content/rates";
import { addMonths, monthsForInstalments, wholeMonths } from "./business/dates";
import {
  corporationTaxForPeriod,
  filingDate,
  instalmentSchedule,
  normalDueDate,
  splitIntoAccountingPeriods,
  validateCtPeriod,
  type ApInputs,
  type CtPeriodInput,
} from "./business/corporationTaxPeriod";
import { s455Charge, validateS455 } from "./business/s455";
import { salaryDividend, validateSalaryDividend, type SalaryDividendInput } from "./business/salaryDividend";
import { capitalAllowances, hybridRate, validateCapitalAllowances, type CapitalAllowancesInput } from "./business/capitalAllowances";
import { frsComparison, frsSectors, vatFraction, vatRegistrationMonitor, type FrsInput } from "./business/vat";
import { ctLateFiling, interestCalc, lateSubmissionPoints, latePaymentInterest, pointsLatePayment, saLateFiling, saLatePayment } from "./business/penalties";
import { CalcInputError, workingAsText } from "./common";

const Y = "2026/27";

/* ------------------------------------------------------------------ */
/* Dates                                                                */
/* ------------------------------------------------------------------ */

describe("date helpers", () => {
  it("adds months, clamping to the month end", () => {
    expect(addMonths("2026-08-31", 6)).toBe("2027-02-28");
    expect(addMonths("2027-08-31", 6)).toBe("2028-02-29");
  });
  it("CTM92610 'n' for instalments: whole months plus spare days ÷ 30", () => {
    // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92610
    expect(monthsForInstalments("2012-01-01", "2012-12-31")).toBe(12);
    expect(monthsForInstalments("2012-01-01", "2012-07-31")).toBe(7);
    expect(monthsForInstalments("2012-01-01", "2012-07-28")).toBe(6.93);
    expect(monthsForInstalments("2012-01-16", "2012-07-28")).toBe(6.43);
  });
  it("whole months", () => {
    expect(wholeMonths("2026-04-01", "2026-09-30")).toBe(6);
    expect(wholeMonths("2026-04-01", "2026-09-29")).toBeNull();
  });
  it("normal CT due date is 9 months and 1 day after the AP end", () => {
    // ct600-filing-payment-and-penalties lesson: 30 Sep 2026 → 1 July 2027; 31 Mar 2027 → 1 Jan 2028; 31 Dec 2025 → 1 Oct 2026.
    expect(normalDueDate("2026-09-30")).toBe("2027-07-01");
    expect(normalDueDate("2027-03-31")).toBe("2028-01-01");
    expect(normalDueDate("2025-12-31")).toBe("2026-10-01");
    expect(normalDueDate("2025-06-30")).toBe("2026-04-01");
    expect(filingDate("2027-03-31")).toBe("2028-03-31");
  });
});

/* ------------------------------------------------------------------ */
/* Corporation tax for dated periods                                    */
/* ------------------------------------------------------------------ */

const ap = (x: Partial<ApInputs> = {}): ApInputs => ({ capitalAllowances: 0, chargeableGains: 0, deductions: 0, exemptDistributions: 0, associatedCompanies: 0, ...x });
const ctIn = (x: Partial<CtPeriodInput>): CtPeriodInput => ({
  taxYear: Y,
  start: "2026-04-01",
  end: "2027-03-31",
  tradingProfit: 0,
  otherIncome: 0,
  apportionBy: "days",
  aps: [ap(), ap(), ap()],
  largeInPrevious12Months: false,
  ...x,
});

describe("corporationTaxForPeriod", () => {
  it("rates-and-marginal-relief › mr-basic (Calder Valley, y/e 31 March 2027): £43,950", () => {
    const r = corporationTaxForPeriod(ctIn({ tradingProfit: 180000 }));
    expect(r.tax).toBe(43950);
    expect(r.aps[0].payments).toEqual([{ date: "2028-01-01", amount: 43950, label: expect.any(String) }]);
  });

  it("rates-and-marginal-relief › mr-associates (two associates, y/e 31 Dec 2026, straddles FY2025/FY2026): £17,300", () => {
    const r = corporationTaxForPeriod(ctIn({ start: "2026-01-01", end: "2026-12-31", tradingProfit: 70000, aps: [ap({ associatedCompanies: 2 })] }));
    expect(r.tax).toBe(17300);
    expect(r.aps[0].normalDueDate).toBe("2027-10-01");
  });

  it("rates-and-marginal-relief › short-period (9 months to 31 Dec 2026, £30,000): £5,700 by months and by days", () => {
    expect(corporationTaxForPeriod(ctIn({ start: "2026-04-01", end: "2026-12-31", tradingProfit: 30000, apportionBy: "months" })).tax).toBe(5700);
    expect(corporationTaxForPeriod(ctIn({ start: "2026-04-01", end: "2026-12-31", tradingProfit: 30000 })).tax).toBe(5700);
  });

  it("Okafor Dental (TTP £70,000, £5,000 dividends, 1 associate): £16,800 — matches the single-period engine", () => {
    const r = corporationTaxForPeriod(ctIn({ tradingProfit: 70000, aps: [ap({ exemptDistributions: 5000, associatedCompanies: 1 })] }));
    expect(r.tax).toBe(16800);
  });

  it("CTM03925 example (y/e 30 Sep 2026, £90,000 + £8,000 exempt distributions): £20,406", () => {
    // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925
    const r = corporationTaxForPeriod(ctIn({ start: "2025-10-01", end: "2026-09-30", tradingProfit: 90000, aps: [ap({ exemptDistributions: 8000 })] }));
    expect(Math.round(r.tax)).toBe(20406);
    expect(Math.round(r.aps[0].marginalRelief)).toBe(2094);
  });

  it("CTM03930 example (9 months 1 Jan–30 Sep 2024, £55,000): £11,762.50 by months; days give the strict figure", () => {
    // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03930
    expect(corporationTaxForPeriod(ctIn({ start: "2024-01-01", end: "2024-09-30", tradingProfit: 55000, apportionBy: "months" })).tax).toBe(11762.5);
    // Strictly by days: upper limit £250,000 × 274/365 = £187,671.23; MR = 3/200 × (187,671.23 − 55,000) = £1,990.07.
    expect(corporationTaxForPeriod(ctIn({ start: "2024-01-01", end: "2024-09-30", tradingProfit: 55000 })).tax).toBe(11759.93);
  });

  it("CTM03956 example (1 Oct 2023–30 Sep 2024, £55,000, 2 associates by the end): £13,325", () => {
    // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03956 (limits £16,667 / £83,333, rounded in the manual)
    const r = corporationTaxForPeriod(ctIn({ start: "2023-10-01", end: "2024-09-30", tradingProfit: 55000, aps: [ap({ associatedCompanies: 2 })] }));
    expect(Math.round(r.tax)).toBe(13325);
  });

  it("who-pays-and-accounting-periods › eighteen-month-split (Ridgeway Signs, 18 months to 31 March 2027): AP1 gets £360,000 by months", () => {
    const r = corporationTaxForPeriod(ctIn({ start: "2025-10-01", end: "2027-03-31", tradingProfit: 540000, apportionBy: "months" }));
    expect(r.aps).toHaveLength(2);
    expect(r.aps[0].profits).toBe(360000);
    expect(r.aps[1].profits).toBe(180000);
    expect(r.aps[0].end).toBe("2026-09-30");
    // AP1 £360,000 > £250,000: main rate. AP2 (6 months) £180,000 > £125,000 upper limit: main rate.
    expect(r.tax).toBe(135000);
    expect(r.filingDate).toBe("2028-03-31");
    // By days the split is 365/547.
    const d = corporationTaxForPeriod(ctIn({ start: "2025-10-01", end: "2027-03-31", tradingProfit: 540000 }));
    expect(d.aps[0].profits).toBe(360329.07);
  });

  it("who-pays-and-accounting-periods › second-ap-length (1 June 2025 to 31 Oct 2026): AP2 is 5 months", () => {
    const aps = splitIntoAccountingPeriods("2025-06-01", "2026-10-31");
    expect(aps).toEqual([
      { start: "2025-06-01", end: "2026-05-31" },
      { start: "2026-06-01", end: "2026-10-31" },
    ]);
    expect(wholeMonths(aps[1].start, aps[1].end)).toBe(5);
  });

  it("nil profits, exact lower limit and exact upper limit", () => {
    expect(corporationTaxForPeriod(ctIn({ tradingProfit: 0 })).tax).toBe(0);
    expect(corporationTaxForPeriod(ctIn({ tradingProfit: 50000 })).tax).toBe(9500);
    expect(corporationTaxForPeriod(ctIn({ tradingProfit: 250000 })).tax).toBe(62500);
  });

  it("deducts capital allowances and adds gains, less donations", () => {
    // computing-taxable-trading-profit › ttp: £142,000 + £12,000 + £800 + £15,000 − £2,500 = £167,300 TTP.
    const r = corporationTaxForPeriod(ctIn({ tradingProfit: 142000, otherIncome: 12800, aps: [ap({ chargeableGains: 15000, deductions: 2500 })] }));
    expect(r.aps[0].profits).toBe(167300);
  });

  describe("quarterly instalments", () => {
    it("Castlegate Software (quarterly-instalment-payments lesson): first-year exception in 2026, instalments in 2027", () => {
      // 2026: £1.8m profits, not large in 2025 → first-year exception, pay 1 October 2027.
      // 1.8m: CT is main rate 25% = £450,000 (the lesson's liability).
      const y26 = corporationTaxForPeriod(ctIn({ start: "2026-01-01", end: "2026-12-31", tradingProfit: 1800000 }));
      expect(y26.tax).toBe(450000);
      expect(y26.aps[0].status).toBe("first-year-exception");
      expect(y26.aps[0].payments).toEqual([{ date: "2027-10-01", amount: 450000, label: expect.any(String) }]);
      // 2027 forecast £2.4m, large previously → £150,000 on 14 July 2027, 14 Oct 2027, 14 Jan 2028, 14 Apr 2028.
      const sched = instalmentSchedule("large", "2027-01-01", "2027-12-31", 600000);
      expect(sched.map((p) => [p.date, p.amount])).toEqual([
        ["2027-07-14", 150000],
        ["2027-10-14", 150000],
        ["2028-01-14", 150000],
        ["2028-04-14", 150000],
      ]);
    });

    it("lesson › instalment-amount (y/e 31 March 2027, £600,000, large before): £150,000 each; first due 14 October 2026", () => {
      const r = corporationTaxForPeriod(ctIn({ tradingProfit: 2400000, largeInPrevious12Months: true }));
      expect(r.aps[0].status).toBe("large");
      expect(r.aps[0].payments.map((p) => [p.date, p.amount])).toEqual([
        ["2026-10-14", 150000],
        ["2027-01-14", 150000],
        ["2027-04-14", 150000],
        ["2027-07-14", 150000],
      ]);
    });

    it("lesson › associated-threshold: two associates make the threshold £500,000", () => {
      const r = corporationTaxForPeriod(ctIn({ tradingProfit: 500001, largeInPrevious12Months: true, aps: [ap({ associatedCompanies: 2 })] }));
      expect(r.aps[0].status).toBe("large");
      const r2 = corporationTaxForPeriod(ctIn({ tradingProfit: 500000, largeInPrevious12Months: true, aps: [ap({ associatedCompanies: 2 })] }));
      expect(r2.aps[0].status).toBe("normal");
    });

    it("lesson › short-ap-instalment (1 Jan–31 Aug 2027, £400,000): £150,000, £150,000, £100,000", () => {
      expect(instalmentSchedule("large", "2027-01-01", "2027-08-31", 400000).map((p) => [p.date, p.amount])).toEqual([
        ["2027-07-14", 150000],
        ["2027-10-14", 150000],
        ["2027-12-14", 100000],
      ]);
    });

    it("GOV.UK short-period example (1 Jan–31 Aug 2027, £900,000): £337,500, £337,500, £225,000", () => {
      // https://www.gov.uk/guidance/corporation-tax-paying-in-instalments
      expect(instalmentSchedule("large", "2027-01-01", "2027-08-31", 900000).map((p) => p.amount)).toEqual([337500, 337500, 225000]);
    });

    it("CTM92570 due-date examples (month-end and leap-year rules)", () => {
      // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92570
      expect(instalmentSchedule("large", "2009-05-01", "2010-04-30", 4).map((p) => p.date)).toEqual(["2009-11-14", "2010-02-14", "2010-05-14", "2010-08-14"]);
      expect(instalmentSchedule("large", "2009-07-18", "2010-07-17", 4).map((p) => p.date)).toEqual(["2010-01-31", "2010-04-30", "2010-07-31", "2010-10-31"]);
      expect(instalmentSchedule("large", "2010-11-17", "2011-11-16", 4).map((p) => p.date)).toEqual(["2011-05-30", "2011-08-30", "2011-11-30", "2012-03-01"]);
      expect(instalmentSchedule("large", "2011-05-16", "2012-05-15", 4).map((p) => p.date)).toEqual(["2011-11-29", "2012-02-29", "2012-05-31", "2012-08-29"]);
    });

    it("CTM92590 short-period examples", () => {
      // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92590
      expect(instalmentSchedule("large", "2012-01-01", "2012-07-31", 7).map((p) => p.date)).toEqual(["2012-07-14", "2012-10-14", "2012-11-14"]);
      expect(instalmentSchedule("large", "2011-10-16", "2012-07-20", 9).map((p) => p.date)).toEqual(["2012-04-29", "2012-07-29", "2012-10-29", "2012-11-03"]);
      expect(instalmentSchedule("large", "2012-06-01", "2012-08-31", 3).map((p) => p.date)).toEqual(["2012-12-14"]);
    });

    it("very large companies: CTM92810 / CTM92820 and GOV.UK examples", () => {
      // https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92820
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-12-31", 4).map((p) => p.date)).toEqual(["2020-03-14", "2020-06-14", "2020-09-14", "2020-12-14"]);
      expect(instalmentSchedule("very-large", "2021-01-01", "2021-02-28", 1).map((p) => p.date)).toEqual(["2021-02-14"]);
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-03-30", 1).map((p) => p.date)).toEqual(["2020-03-14"]);
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-02-14", 1).map((p) => p.date)).toEqual(["2020-01-28"]);
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-01-14", 1).map((p) => p.date)).toEqual(["2020-01-14"]);
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-05-30", 1).map((p) => p.date)).toEqual(["2020-03-14", "2020-05-14"]);
      expect(instalmentSchedule("very-large", "2020-01-01", "2020-10-31", 1).map((p) => p.date)).toEqual(["2020-03-14", "2020-06-14", "2020-09-14", "2020-10-14"]);
      // GOV.UK very large amounts: 1 Jan–31 Jul 2028, £3,100,000 → £1,328,571 × 2 and £442,858.
      const s = instalmentSchedule("very-large", "2028-01-01", "2028-07-31", 3100000);
      expect(s.map((p) => p.date)).toEqual(["2028-03-14", "2028-06-14", "2028-07-14"]);
      expect(s[0].amount).toBeCloseTo(1328571.43, 2);
      expect(s[2].amount).toBeCloseTo(442857.14, 2);
    });

    it("very large: no first-year exception; de minimis £10,000 liability", () => {
      const r = corporationTaxForPeriod(ctIn({ tradingProfit: 25000000 }));
      expect(r.aps[0].status).toBe("very-large");
      expect(r.aps[0].payments[0].date).toBe("2026-06-14");
      // Five associates: large threshold £250,000 but liability ≤ £10,000 → not large.
      const small = corporationTaxForPeriod(ctIn({ tradingProfit: 40000, largeInPrevious12Months: true, aps: [ap({ associatedCompanies: 5, exemptDistributions: 230000 })] }));
      expect(small.aps[0].status).toBe("below-de-minimis");
    });
  });

  it("validates impossible inputs", () => {
    expect(validateCtPeriod(ctIn({ end: "2026-03-01" }))).not.toHaveLength(0);
    expect(validateCtPeriod(ctIn({ start: "2022-01-01", end: "2022-12-31" }))[0]).toMatch(/financial years|between/);
    expect(validateCtPeriod(ctIn({ tradingProfit: -1 }))).not.toHaveLength(0);
    expect(validateCtPeriod(ctIn({ aps: [ap({ associatedCompanies: 1.5 })] }))).not.toHaveLength(0);
    expect(() => corporationTaxForPeriod(ctIn({ start: "bad" }))).toThrow(CalcInputError);
  });

  it("produces copyable working", () => {
    const r = corporationTaxForPeriod(ctIn({ tradingProfit: 180000 }));
    expect(workingAsText("Corporation tax", r)).toContain("Corporation tax payable");
  });
});

/* ------------------------------------------------------------------ */
/* s455                                                                 */
/* ------------------------------------------------------------------ */

describe("s455Charge", () => {
  it("close-companies-and-ct61 › s455-quick (£20,000 lent June 2026, y/e 31 March 2027): £7,150", () => {
    const r = s455Charge({ taxYear: Y, apStart: "2026-04-01", apEnd: "2027-03-31", loans: [{ date: "2026-06-15", amount: 20000 }], repayments: [] });
    expect(r.tax).toBe(7150);
    expect(r.chargeDueDate).toBe("2028-01-01");
  });

  it("s455-charge-and-s458-relief › s455-amount (£28,000 lent 20 August 2026): £10,010", () => {
    expect(s455Charge({ taxYear: Y, apStart: "2026-04-01", apEnd: "2027-03-31", loans: [{ date: "2026-08-20", amount: 28000 }], repayments: [] }).tax).toBe(10010);
  });

  it("s458-relief (£50,000 lent 1 Aug 2026, £20,000 repaid 1 Sep 2027 — after 9 months of a 31 Dec 2026 year end): relief £7,150 due 1 Oct 2028", () => {
    const r = s455Charge({
      taxYear: Y,
      apStart: "2026-01-01",
      apEnd: "2026-12-31",
      loans: [{ date: "2026-08-01", amount: 50000 }],
      repayments: [{ date: "2027-10-01", amount: 20000, kind: "repayment" }],
    });
    expect(r.tax).toBe(17875);
    expect(r.relief).toEqual([{ date: "2027-10-01", amount: 7150, reliefDue: "2028-10-01" }]);
    expect(r.unrelieved).toBe(10725);
  });

  it("repayment within 9 months removes the charge; rates follow the loan date (33.75% before 6 April 2026)", () => {
    const r = s455Charge({
      taxYear: Y,
      apStart: "2026-01-01",
      apEnd: "2026-12-31",
      loans: [
        { date: "2026-02-01", amount: 10000 },
        { date: "2026-05-01", amount: 10000 },
      ],
      repayments: [{ date: "2027-09-30", amount: 10000, kind: "repayment" }],
    });
    // Earliest loan (33.75%) repaid first; £10,000 at 35.75% remains.
    expect(r.outstandingAtNineMonths).toBe(10000);
    expect(r.tax).toBe(3575);
    const before = s455Charge({ taxYear: "2025/26", apStart: "2025-04-01", apEnd: "2026-03-31", loans: [{ date: "2025-06-01", amount: 10000 }], repayments: [] });
    expect(before.tax).toBe(3375);
  });

  it("validates", () => {
    expect(validateS455({ taxYear: Y, apStart: "2026-04-01", apEnd: "2027-03-31", loans: [], repayments: [] })).not.toHaveLength(0);
    expect(validateS455({ taxYear: Y, apStart: "2026-04-01", apEnd: "2027-03-31", loans: [{ date: "2027-05-01", amount: 1 }], repayments: [] })).not.toHaveLength(0);
    expect(
      validateS455({ taxYear: Y, apStart: "2026-04-01", apEnd: "2027-03-31", loans: [{ date: "2026-05-01", amount: 100 }], repayments: [{ date: "2027-05-01", amount: 200, kind: "repayment" }] }),
    ).not.toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/* Salary vs dividend                                                   */
/* ------------------------------------------------------------------ */

const sd = (x: Partial<SalaryDividendInput> = {}): SalaryDividendInput => ({
  taxYear: Y,
  profitBeforePay: 45000,
  directors: 1,
  otherIncome: 0,
  employmentAllowance: false,
  otherStaffEmployerNic: 0,
  associatedCompanies: 0,
  mode: "distribute",
  ...x,
});

describe("salaryDividend", () => {
  it("salary-vs-dividend-planning › Hartley Consulting: package A £35,247.32 net, B £34,784.52; A is most efficient", () => {
    const r = salaryDividend(sd());
    const a = r.scenarios.find((s) => s.key === "pt")!;
    const b = r.scenarios.find((s) => s.key === "st")!;
    expect(a.employerNic).toBe(1135.5);
    expect(a.corporationTax).toBe(5945.96);
    expect(a.dividend).toBe(25348.54);
    expect(a.incomeTax).toBe(2671.22);
    expect(a.netCash).toBe(35247.32);
    expect(a.totalTax).toBe(9752.68);
    expect(b.corporationTax).toBe(7600);
    expect(b.incomeTax).toBe(2615.48);
    expect(b.netCash).toBe(34784.52);
    expect(b.totalTax).toBe(10215.48);
    expect(r.scenarios.find((s) => s.key === "opt")!.netCash).toBeGreaterThanOrEqual(35247.32);
    expect(r.tax).toBeLessThanOrEqual(9752.68);
  });

  it("lesson › employer-nic-salary (£9,000, no Employment Allowance): £600", () => {
    const r = salaryDividend(sd({ customSalary: 9000 }));
    expect(r.scenarios.find((s) => s.key === "custom")!.employerNic).toBe(600);
  });

  it("lesson › dividend-tax-calc (salary £12,570, dividends £30,000): £3,171.25 dividend tax via target mode", () => {
    // Target net cash of £12,570 + £30,000 − £3,171.25 = £39,398.75 at a £12,570 salary needs a £30,000 dividend.
    const r = salaryDividend(sd({ profitBeforePay: 100000, mode: "target", targetNetCash: 39398.75 }));
    const pt = r.scenarios.find((s) => s.key === "pt")!;
    expect(pt.dividend).toBe(30000);
    expect(pt.incomeTax).toBe(3171.25);
  });

  it("Employment Allowance removes the employer NIC on the director's salary", () => {
    const r = salaryDividend(sd({ employmentAllowance: true }));
    const a = r.scenarios.find((s) => s.key === "pt")!;
    expect(a.employerNic).toBe(0);
    expect(a.employmentAllowanceUsed).toBe(1135.5);
    // Partly used on other staff: £10,500 − £10,000 = £500 left.
    const p = salaryDividend(sd({ employmentAllowance: true, otherStaffEmployerNic: 10000 }));
    expect(p.scenarios.find((s) => s.key === "pt")!.employerNic).toBe(635.5);
  });

  it("two directors share profits; target mode keeps the rest in the company", () => {
    const r = salaryDividend(sd({ profitBeforePay: 120000, directors: 2, mode: "target", targetNetCash: 40000 }));
    for (const s of r.scenarios.filter((x) => x.feasible)) expect(s.netCash).toBeGreaterThanOrEqual(40000);
    const best = r.scenarios.find((s) => s.key === r.bestKey)!;
    for (const s of r.scenarios.filter((x) => x.feasible)) expect(best.retained).toBeGreaterThanOrEqual(s.retained - 0.01);
  });

  it("flags an unaffordable target and a salary above profit", () => {
    const r = salaryDividend(sd({ profitBeforePay: 20000, mode: "target", targetNetCash: 50000 }));
    expect(r.scenarios.every((s) => !s.feasible)).toBe(true);
    expect(r.bestKey).toBeNull();
    const s = salaryDividend(sd({ profitBeforePay: 4000 }));
    expect(s.scenarios.find((x) => x.key === "pt")!.feasible).toBe(false);
  });

  it("validates", () => {
    expect(validateSalaryDividend(sd({ directors: 0 }))).not.toHaveLength(0);
    expect(validateSalaryDividend(sd({ profitBeforePay: -1 }))).not.toHaveLength(0);
    expect(validateSalaryDividend(sd({ mode: "target" }))).not.toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/* Capital allowances                                                   */
/* ------------------------------------------------------------------ */

const ca = (x: Partial<CapitalAllowancesInput> = {}): CapitalAllowancesInput => ({
  taxYear: Y,
  entity: "company",
  start: "2026-04-01",
  end: "2027-03-31",
  prorateBy: "days",
  mainPoolBf: 0,
  specialPoolBf: 0,
  mainNew: 0,
  mainUsed: 0,
  specialNew: 0,
  specialUsed: 0,
  carsZeroEmission: 0,
  carsMainRate: 0,
  carsSpecialRate: 0,
  mainDisposals: 0,
  specialDisposals: 0,
  fullExpensedDisposals: 0,
  claimFullExpensing: true,
  claim40Fya: false,
  ceased: false,
  ...x,
});

describe("capitalAllowances", () => {
  it("GOV.UK hybrid rate example (CT, 1 Jan–31 Dec 2026): 14.99%", () => {
    // https://www.gov.uk/guidance/calculate-your-hybrid-rate-of-writing-down-allowance
    expect(hybridRate(90, 275, 18, 14)).toBe(14.99);
    expect(capitalAllowances(ca({ start: "2026-01-01", end: "2026-12-31", mainPoolBf: 10000 })).mainRate).toBe(14.99);
    // Income Tax change date is 6 April: 6 Apr–5 Apr is wholly 14%; 1 Jan–31 Dec 2026 has 95 days at 18%.
    expect(capitalAllowances(ca({ entity: "unincorporated", claimFullExpensing: false, start: "2026-01-01", end: "2026-12-31", mainPoolBf: 10000 })).mainRate).toBe(hybridRate(95, 270, 18, 14));
  });

  it("aia-short-period (9 months to 31 Dec 2026): £750,000 by months", () => {
    const r = capitalAllowances(ca({ start: "2026-04-01", end: "2026-12-31", prorateBy: "months", specialUsed: 2000000 }));
    expect(r.rows.find((x) => x.label.startsWith("Annual investment"))!.allowances).toBe(750000);
  });

  it("special-rate-over-aia (£1.3m new integral features): AIA £1m + 50% FYA £150,000 = £1,150,000", () => {
    const r = capitalAllowances(ca({ specialNew: 1300000 }));
    expect(r.net).toBe(1150000);
    expect(r.specialPoolCf).toBe(150000);
  });

  it("fe-disposal: sale of a full-expensed machine for £60,000 → £60,000 balancing charge", () => {
    const r = capitalAllowances(ca({ fullExpensedDisposals: 60000 }));
    expect(r.balancingCharges).toBe(60000);
    expect(r.net).toBe(-60000);
  });

  it("disposal-capped (main pool £50,000, disposal capped at cost £40,000): WDA £1,400", () => {
    const r = capitalAllowances(ca({ mainPoolBf: 50000, mainDisposals: 40000 }));
    expect(r.net).toBe(1400);
    expect(r.mainPoolCf).toBe(8600);
  });

  it("balancing-charge (special pool £12,000, car sold £15,000): £3,000", () => {
    const r = capitalAllowances(ca({ specialPoolBf: 12000, specialDisposals: 15000 }));
    expect(r.balancingCharges).toBe(3000);
    expect(r.specialPoolCf).toBe(0);
  });

  it("short-period-wda (6 months to 30 Sep 2026, £60,000): £4,200 by months", () => {
    expect(capitalAllowances(ca({ start: "2026-04-01", end: "2026-09-30", prorateBy: "months", mainPoolBf: 60000 })).net).toBe(4200);
  });

  it("small-pool (special pool £940): claim £940", () => {
    expect(capitalAllowances(ca({ specialPoolBf: 940 })).net).toBe(940);
  });

  it("GOV.UK 187-day period, main pool £2,000: £280 × 187/365 = £143.45", () => {
    // https://www.gov.uk/guidance/capital-allowances-accounting-periods-which-are-more-or-less-than-a-year
    expect(capitalAllowances(ca({ start: "2026-04-01", end: "2026-10-04", mainPoolBf: 2000 })).net).toBe(143.45);
  });

  it("GOV.UK WDA example (pool £9,000 + £1,200 − £200 at 14%): £1,400, c/f £8,600", () => {
    // https://www.gov.uk/work-out-capital-allowances/work-out-what-you-can-claim
    const r = capitalAllowances(ca({ mainPoolBf: 9000, mainUsed: 1200, mainDisposals: 200, aiaAvailable: 0 }));
    expect(r.net).toBe(1400);
    expect(r.mainPoolCf).toBe(8600);
  });

  it("40% FYA, zero-emission cars and cars by CO2", () => {
    const r = capitalAllowances(ca({ entity: "unincorporated", start: "2026-04-06", end: "2027-04-05", claimFullExpensing: false, claim40Fya: true, aiaAvailable: 0, mainNew: 10000, carsZeroEmission: 30000, carsMainRate: 20000, carsSpecialRate: 40000 }));
    // 40% × 10,000 = 4,000; FYA cars 30,000; main WDA 14% × 20,000 = 2,800; special 6% × 40,000 = 2,400.
    expect(r.net).toBe(39200);
    expect(r.mainPoolCf).toBe(17200 + 6000);
    expect(r.specialPoolCf).toBe(37600);
  });

  it("cessation: no AIA/WDA, balancing allowance on the pool", () => {
    const r = capitalAllowances(ca({ mainPoolBf: 5000, mainUsed: 1000, mainDisposals: 2500, ceased: true }));
    expect(r.net).toBe(3500);
  });

  it("validates", () => {
    expect(validateCapitalAllowances(ca({ end: "2027-06-30" }))).not.toHaveLength(0);
    expect(validateCapitalAllowances(ca({ entity: "unincorporated", claimFullExpensing: true }))).not.toHaveLength(0);
    expect(validateCapitalAllowances(ca({ mainNew: -1 }))).not.toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/* VAT                                                                  */
/* ------------------------------------------------------------------ */

const frs = (x: Partial<FrsInput> = {}): FrsInput => ({
  taxYear: Y,
  period: "quarter",
  standardSalesNet: 0,
  reducedSalesNet: 0,
  zeroRatedSales: 0,
  exemptSales: 0,
  inputVat: 0,
  relevantGoodsGross: 100000,
  capitalAssetVat: 0,
  sectorId: "vat.frs-sector-general-building",
  firstYear: false,
  ...x,
});

describe("VAT", () => {
  it("lists the sector rates", () => {
    const s = frsSectors(Y);
    expect(s.find((x) => x.id === "vat.frs-sector-accountancy")!.rate).toBe(14.5);
    expect(s.length).toBeGreaterThan(50);
  });

  it("flat-rate-scheme › builder-frs (£30,000 + VAT at 9.5%): £3,420", () => {
    expect(frsComparison(frs({ standardSalesNet: 30000 })).frsVat).toBe(3420);
  });

  it("flat-rate-scheme › first-year-rate (management consultancy 14% − 1% on £18,000): £2,340", () => {
    expect(frsComparison(frs({ standardSalesNet: 15000, sectorId: "vat.frs-sector-management-consultancy", firstYear: true })).frsVat).toBe(2340);
  });

  it("flat-rate-scheme › lct-test (accountancy, £42,000 turnover, goods £700 < £840): 16.5% → £6,930", () => {
    const r = frsComparison(frs({ standardSalesNet: 35000, sectorId: "vat.frs-sector-accountancy", relevantGoodsGross: 700 }));
    expect(r.limitedCost).toBe(true);
    expect(r.frsVat).toBe(6930);
  });

  it("Notice 733 LCT examples: £260 on £10,000 is not limited cost; £225 on £10,000 is (below £250 a quarter)", () => {
    // https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2 (para 4.4)
    expect(frsComparison(frs({ zeroRatedSales: 10000, relevantGoodsGross: 260 })).limitedCost).toBe(false);
    expect(frsComparison(frs({ zeroRatedSales: 10000, relevantGoodsGross: 225 })).limitedCost).toBe(true);
    expect(frsComparison(frs({ zeroRatedSales: 20000, relevantGoodsGross: 325 })).limitedCost).toBe(true);
  });

  it("GOV.UK photographer example: £1,200 × 11% = £132; compares with standard accounting", () => {
    const r = frsComparison(frs({ standardSalesNet: 1000, sectorId: "vat.frs-sector-photography", relevantGoodsGross: 1000, inputVat: 20 }));
    expect(r.frsVat).toBe(132);
    expect(r.standardVat).toBe(180);
    expect(r.saving).toBe(48);
  });

  it("how-vat-works › vat-fraction (£87.60 gross): £14.60", () => {
    const r = vatFraction({ taxYear: Y, amount: 87.6, mode: "extract", rateId: "vat.standard-rate" });
    expect(r.vat).toBe(14.6);
    expect(r.net).toBe(73);
    expect(vatFraction({ taxYear: Y, amount: 73, mode: "add", rateId: "vat.standard-rate" }).gross).toBe(87.6);
    // registration-and-deregistration › late-registration: £31,200 × 1/6 = £5,200.
    expect(vatFraction({ taxYear: Y, amount: 31200, mode: "extract", rateId: "vat.standard-rate" }).vat).toBe(5200);
  });

  it("registration monitor: GOV.UK example — over at the end of July: register by 30 August, effective 1 September", () => {
    // https://www.gov.uk/vat-registration/when-to-register
    const monthly = [7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 20000];
    const r = vatRegistrationMonitor({ taxYear: Y, firstMonth: "2025-06", monthly, next30Days: 0 });
    expect(r.rows[12].rolling).toBe(84000);
    expect(r.breachMonth).toBe("2026-07");
    expect(r.registerBy).toBe("2026-08-30");
    expect(r.effectiveDate).toBe("2026-09-01");
  });

  it("registration monitor: exactly £90,000 is not over; forward look (1 May, £100,000) → register by 30 May, effective 1 May", () => {
    const r = vatRegistrationMonitor({ taxYear: Y, firstMonth: "2025-05", monthly: Array(12).fill(7500), next30Days: 100000, next30Start: "2026-05-01" });
    expect(r.rows[11].rolling).toBe(90000);
    expect(r.breachMonth).toBeNull();
    expect(r.headroom).toBe(0);
    expect(r.forwardLook).toEqual({ registerBy: "2026-05-30", effectiveDate: "2026-05-01" });
  });
});

/* ------------------------------------------------------------------ */
/* Penalties and interest                                               */
/* ------------------------------------------------------------------ */

describe("penalties", () => {
  it("SA late filing: Hana Ito (due 31 Jan 2027, filed 15 Aug 2027, £4,000): £1,300", () => {
    expect(saLateFiling({ taxYear: Y, deadline: "2027-01-31", filed: "2027-08-15", taxDue: 4000 }).tax).toBe(1300);
  });

  it("SA late filing: 7 months late, £5,000 due → £1,300; 1 day late → £100; on time → nil", () => {
    expect(saLateFiling({ taxYear: Y, deadline: "2027-01-31", filed: "2027-08-31", taxDue: 5000 }).tax).toBe(1300);
    expect(saLateFiling({ taxYear: Y, deadline: "2027-01-31", filed: "2027-02-01", taxDue: 5000 }).tax).toBe(100);
    expect(saLateFiling({ taxYear: Y, deadline: "2027-01-31", filed: "2027-01-31", taxDue: 5000 }).tax).toBe(0);
    // 12 months late on £20,000: £100 + £900 + £1,000 + £1,000.
    expect(saLateFiling({ taxYear: Y, deadline: "2027-01-31", filed: "2028-02-15", taxDue: 20000 }).tax).toBe(3000);
  });

  it("SA late payment: Hana Ito £4,000 paid 15 Aug 2027 → £200 + £200 = £400; practice lesson £10,000 over 6 months → £1,000", () => {
    const r = saLatePayment({ taxYear: Y, amount: 4000, dueDate: "2027-01-31", payments: [{ date: "2027-08-15", amount: 4000 }], asAt: "2027-08-15", includeInterest: false });
    expect(r.penalties).toBe(400);
    const r2 = saLatePayment({ taxYear: Y, amount: 10000, dueDate: "2026-01-31", payments: [{ date: "2026-09-01", amount: 10000 }], asAt: "2026-09-01", includeInterest: false });
    expect(r2.penalties).toBe(1000);
  });

  it("VAT lpp-first (£20,000 due 7 Aug 2026; £8,000 day 10, £12,000 day 24): £360", () => {
    const r = pointsLatePayment({
      taxYear: Y, regime: "vat", vatPeriodStart: "2026-04-01", amount: 20000, dueDate: "2026-08-07",
      payments: [{ date: "2026-08-17", amount: 8000 }, { date: "2026-08-31", amount: 12000 }], asAt: "2026-08-31", includeInterest: false,
    });
    expect(r.penalties).toBe(360);
  });

  it("GOV.UK VAT example (£15,000 paid on day 51): £900 first penalty + £86.30 second = £986.30", () => {
    // https://www.gov.uk/guidance/how-late-payment-penalties-work-if-you-pay-vat-late
    const r = pointsLatePayment({
      taxYear: Y, regime: "vat", vatPeriodStart: "2026-04-01", amount: 15000, dueDate: "2026-08-07",
      payments: [{ date: "2026-09-27", amount: 15000 }], asAt: "2026-09-27", includeInterest: false,
    });
    expect(r.penalties).toBe(986.3);
  });

  it("VAT lpp-31 (£15,000 paid on day 45): first penalty £900", () => {
    const r = pointsLatePayment({
      taxYear: Y, regime: "vat", vatPeriodStart: "2026-04-01", amount: 15000, dueDate: "2026-08-07",
      payments: [{ date: "2026-09-21", amount: 15000 }], asAt: "2026-09-21", includeInterest: false,
    });
    expect(r.working.filter((w) => w.label.startsWith("First penalty")).reduce((s, w) => s + w.amount, 0)).toBe(900);
  });

  it("VAT periods starting before 1 April 2025 use 2%/2%/4%; paid on day 15 = no penalty", () => {
    const old = pointsLatePayment({ taxYear: "2025/26", regime: "vat", vatPeriodStart: "2025-01-01", amount: 10000, dueDate: "2025-05-07", payments: [{ date: "2025-06-06", amount: 10000 }], asAt: "2025-06-06", includeInterest: false });
    expect(old.penalties).toBe(200);
    const ok = pointsLatePayment({ taxYear: Y, regime: "vat", vatPeriodStart: "2026-04-01", amount: 10000, dueDate: "2026-08-07", payments: [{ date: "2026-08-22", amount: 10000 }], asAt: "2026-08-22", includeInterest: false });
    expect(ok.penalties).toBe(0);
  });

  it("MTD for Income Tax: first-year easement up to 30 days; 2027/28 rates are 4%", () => {
    const fy = pointsLatePayment({ taxYear: Y, regime: "mtd-2026", firstYear: true, amount: 10000, dueDate: "2028-01-31", payments: [{ date: "2028-02-25", amount: 10000 }], asAt: "2028-02-25", includeInterest: false });
    expect(fy.penalties).toBe(0);
    const n = pointsLatePayment({ taxYear: Y, regime: "mtd-2026", firstYear: false, amount: 10000, dueDate: "2028-01-31", payments: [{ date: "2028-02-25", amount: 10000 }], asAt: "2028-02-25", includeInterest: false });
    expect(n.penalties).toBe(300);
    const y28 = pointsLatePayment({ taxYear: Y, regime: "mtd-2027", amount: 10000, dueDate: "2029-01-31", payments: [{ date: "2029-03-03", amount: 10000 }], asAt: "2029-03-03", includeInterest: false });
    // Paid on day 31: 4% + 4% + one day of the 10% second penalty (£2.74).
    expect(y28.penalties).toBe(802.74);
  });

  it("late submission points: quarterly VAT threshold 4 → 5 late returns = 2 × £200; annual threshold 2", () => {
    expect(lateSubmissionPoints({ taxYear: Y, regime: "vat-quarterly", lateSubmissions: 3 }).tax).toBe(0);
    expect(lateSubmissionPoints({ taxYear: Y, regime: "vat-quarterly", lateSubmissions: 5 }).tax).toBe(400);
    expect(lateSubmissionPoints({ taxYear: Y, regime: "vat-annual", lateSubmissions: 2 }).tax).toBe(200);
    expect(lateSubmissionPoints({ taxYear: Y, regime: "mtd", lateSubmissions: 4 }).tax).toBe(200);
  });

  it("CT flat-penalty (filing date 31 Dec 2026, filed 15 May 2027): £400", () => {
    expect(ctLateFiling({ taxYear: Y, apEnd: "2025-12-31", filingDate: "2026-12-31", filed: "2027-05-15", thirdSuccessive: false, unpaidTax: 0 }).tax).toBe(400);
  });

  it("CT tax-geared (y/e 30 June 2025, filed 15 Feb 2027, £30,000 unpaid): £3,400", () => {
    expect(ctLateFiling({ taxYear: Y, apEnd: "2025-06-30", filingDate: "2026-06-30", filed: "2027-02-15", thirdSuccessive: false, unpaidTax: 30000 }).tax).toBe(3400);
  });

  it("CT Quayside Studios (third successive, filed 25 June 2027): £2,000; old regime before 1 April 2026: £200", () => {
    expect(ctLateFiling({ taxYear: Y, apEnd: "2025-12-31", filingDate: "2026-12-31", filed: "2027-06-25", thirdSuccessive: true, unpaidTax: 14800 }).tax).toBe(2000);
    expect(ctLateFiling({ taxYear: "2025/26", apEnd: "2024-12-31", filingDate: "2025-12-31", filed: "2026-05-01", thirdSuccessive: false, unpaidTax: 0 }).tax).toBe(200);
    // Over 2 years after the AP end: 20%.
    expect(ctLateFiling({ taxYear: Y, apEnd: "2024-06-30", filingDate: "2025-06-30", filed: "2026-08-01", thirdSuccessive: false, unpaidTax: 10000 }).tax).toBe(2200);
  });

  it("late payment interest: CH140220 day counts and HMRC rates across a rate change", () => {
    // Due 31 Jan 2026, paid 1 Feb 2026: 1 day at 7.75% on £36,500 = £7.75.
    expect(latePaymentInterest(Y, 36500, "2026-01-31", [{ date: "2026-02-01", amount: 36500 }], "2026-02-01").total).toBe(7.75);
    // Due 1 January 2026, paid 9 January 2026: 7 days at 8% (to 8 Jan) + 1 day at 7.75% (9 Jan).
    const li = latePaymentInterest(Y, 36500, "2026-01-01", [{ date: "2026-01-09", amount: 36500 }], "2026-01-09");
    expect(li.segments.map((s) => [s.days, s.rate])).toEqual([[7, 8], [1, 7.75]]);
    expect(li.total).toBe(r(36500 * 0.08 * 7 / 365 + 36500 * 0.0775 / 365));
    // Part payment reduces the balance from the following day.
    const part = interestCalc({ taxYear: Y, amount: 10000, dueDate: "2026-01-31", payments: [{ date: "2026-03-02", amount: 5000 }], asAt: "2026-04-01" });
    expect(part.tax).toBe(r(10000 * 0.0775 * 30 / 365 + 5000 * 0.0775 * 30 / 365));
  });

  it("dataset holds the new figures with sources", () => {
    expect(rate(Y, "pay.ct-late-filing-flat-1")?.amount).toBe(200);
    expect(rate("2025/26", "int.lpi-from-2026-01-09")?.amount).toBe(7.75);
    expect(rate(Y, "ct.qip-large-threshold")?.amount).toBe(1500000);
  });
});

function r(x: number) {
  return Math.round(x * 100) / 100;
}
