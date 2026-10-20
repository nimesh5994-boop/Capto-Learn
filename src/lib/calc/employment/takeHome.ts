/**
 * Take-home pay for a PAYE employee: one regular pay period worked as payroll
 * software would (exact percentage method), then scaled to a year, month and week.
 * Includes employer NIC, employer pension and Class 1A to give the total cost of
 * employment, and target modes solved by bisection over the forward calculation.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { type NicCategory, class1 } from "./nic";
import { type TaxCode, codeForAllowance, parseTaxCode, payeTax } from "./paye";
import { type Frequency, type Reader, PERIODS, PERIOD_LABEL, floorPound, hasRate, solveMax, solveMin } from "./shared";

export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5";
export type PensionScheme = "none" | "netPay" | "reliefAtSource" | "sacrifice";
export type BenefitMethod = "none" | "inCode" | "adjustCode" | "payrolled";

export interface Contribution {
  mode: "percent" | "amount";
  /** Percent of pensionable pay, or £ a year. */
  value: number;
}

export interface TakeHomeInput {
  taxYear: string;
  /** How often the employee is paid (annual = one payment a year, Month 12 tables). */
  frequency: Frequency;
  /** Contractual gross pay for the year before any salary sacrifice. */
  annualGross: number;
  taxCode: string;
  nicCategory: NicCategory;
  studentLoan: StudentLoanPlan;
  postgraduateLoan: boolean;
  pension: {
    scheme: PensionScheme;
    /** Pensionable pay: all pay, or qualifying earnings (the auto-enrolment band). */
    basis: "all" | "qualifying";
    /** Employee contribution (gross, before any tax relief). For salary sacrifice, the amount sacrificed. */
    employee: Contribution;
    employer: Contribution;
  };
  benefits: { annualValue: number; method: BenefitMethod };
  /** Payroll giving, £ a year (deducted before tax, not before NIC). */
  payrollGiving?: number;
  /** Other deductions from net pay, £ a year (e.g. season-ticket loan repayments). */
  otherNetDeductions?: number;
}

export interface PeriodFigures {
  gross: number;
  sacrifice: number;
  netPayPension: number;
  payrollGiving: number;
  payrolledBenefits: number;
  payForTax: number;
  nicEarnings: number;
  tax: number;
  employeeNic: number;
  studentLoan: number;
  postgraduateLoan: number;
  reliefAtSourceNet: number;
  otherNetDeductions: number;
  netPay: number;
  employerNic: number;
  employerPension: number;
}

export interface SummaryRow {
  label: string;
  annual: number;
  kind?: "total" | "subtotal" | "employer";
}

export interface TakeHomeResult extends CalcResult {
  frequency: Frequency;
  code: TaxCode;
  /** The code actually operated (after any benefit adjustment). */
  codeUsed: string;
  period: PeriodFigures;
  annual: PeriodFigures;
  class1A: number;
  totalEmploymentCost: number;
  /** Rows for the year / month / week table (annual figures; ÷12 and ÷52 for the others). */
  summary: SummaryRow[];
  /** Total deductions ÷ gross. */
  effectiveRate: number | null;
  taxLimited: boolean;
}

export function validateTakeHome(i: TakeHomeInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Gross pay", i.annualGross);
  requireNonNegative(e, "Employee pension contribution", i.pension.employee.value);
  requireNonNegative(e, "Employer pension contribution", i.pension.employer.value);
  requireNonNegative(e, "Benefits in kind", i.benefits.annualValue);
  requireNonNegative(e, "Payroll giving", i.payrollGiving);
  requireNonNegative(e, "Other deductions from net pay", i.otherNetDeductions);
  if (i.pension.employee.mode === "percent" && i.pension.employee.value > 100) e.push("Employee pension can't be more than 100% of pay.");
  if (i.pension.employer.mode === "percent" && i.pension.employer.value > 100) e.push("Employer pension can't be more than 100% of pay.");
  const pc = parseTaxCode(i.taxCode);
  if (pc.error) e.push(pc.error);
  if (pc.code && i.benefits.method === "adjustCode" && (pc.code.kind === "flat" || pc.code.kind === "nt"))
    e.push(`A benefit can't be coded out through ${pc.code.normalised}: choose "payrolled" or "already in the code".`);
  if (i.studentLoan === "plan5" && !hasRate(i.taxYear, "emp.sl-plan5-threshold"))
    e.push(`Plan 5 student loan repayments don't apply in ${i.taxYear} (they start from April 2026).`);
  return e;
}

const SL_IDS: Record<Exclude<StudentLoanPlan, "none">, { annual: string; weekly: string; monthly: string; label: string }> = {
  plan1: { annual: "emp.sl-plan1-threshold", weekly: "emp.sl-plan1-weekly", monthly: "emp.sl-plan1-monthly", label: "Plan 1" },
  plan2: { annual: "emp.sl-plan2-threshold", weekly: "emp.sl-plan2-weekly", monthly: "emp.sl-plan2-monthly", label: "Plan 2" },
  plan4: { annual: "emp.sl-plan4-threshold", weekly: "emp.sl-plan4-weekly", monthly: "emp.sl-plan4-monthly", label: "Plan 4" },
  plan5: { annual: "emp.sl-plan5-threshold", weekly: "emp.sl-plan5-weekly", monthly: "emp.sl-plan5-monthly", label: "Plan 5" },
};
const PGL_IDS = { annual: "emp.pgl-threshold", weekly: "emp.pgl-weekly", monthly: "emp.pgl-monthly" };
const QE_LOWER = { annual: "emp.ae-qualifying-earnings-lower", weekly: "emp.ae-qe-lower-weekly", monthly: "emp.ae-qe-lower-monthly" };
const QE_UPPER = { annual: "emp.ae-qualifying-earnings-upper", weekly: "emp.ae-qe-upper-weekly", monthly: "emp.ae-qe-upper-monthly" };

/** Pension contribution for the period (rounded to the penny). */
function contribution(R: Reader, f: Frequency, c: Contribution, basis: "all" | "qualifying", gross: number, working: WorkingLine[] | null, who: string): number {
  if (c.value <= 0) return 0;
  const n = PERIODS[f];
  if (c.mode === "amount") {
    const v = r2(c.value / n);
    working?.push({ label: `${who}: ${gbp(c.value)} a year ÷ ${n}`, amount: v, kind: "memo" });
    return v;
  }
  if (basis === "all") {
    const v = r2((gross * c.value) / 100);
    working?.push({ label: `${who}: ${gbp(gross)} × ${pctLabel(c.value)}`, amount: v, kind: "memo" });
    return v;
  }
  const lo = R.gbp(QE_LOWER[f]);
  const hi = R.gbp(QE_UPPER[f]);
  const qe = Math.max(0, Math.min(gross, hi) - lo);
  const v = r2((qe * c.value) / 100);
  working?.push({ label: `${who}: qualifying earnings (${gbp(Math.min(gross, hi))} − ${gbp(lo)}) × ${pctLabel(c.value)}`, amount: v, rateId: QE_LOWER[f], kind: "memo" });
  return v;
}

/** The code operated after coding out a benefit (lesson "Starters and tax codes": tax-free amount less benefit, drop the last digit). */
function adjustCodeForBenefit(code: TaxCode, benefit: number): string {
  const prefix = code.region === "scotland" ? "S" : code.region === "wales" ? "C" : "";
  const allowance = (code.kind === "k" ? -code.number : code.number) * 10 - benefit;
  const c = codeForAllowance(allowance, code.suffix ?? "L");
  return prefix + c + (code.nonCumulative ? "M1" : "");
}

/** Core forward calculation. */
export function takeHome(input: TakeHomeInput): TakeHomeResult {
  const errors = validateTakeHome(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const f = input.frequency;
  const n = PERIODS[f];
  const per = PERIOD_LABEL[f];
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  const parsed = parseTaxCode(input.taxCode).code!;
  const bik = input.benefits.method === "none" ? 0 : input.benefits.annualValue;
  let code = parsed;
  let codeUsed = parsed.normalised;
  if (bik > 0 && input.benefits.method === "adjustCode") {
    codeUsed = adjustCodeForBenefit(parsed, bik);
    code = parseTaxCode(codeUsed).code!;
  }

  const gross = r2(input.annualGross / n);
  working.push({ label: n > 1 ? `Gross pay for the ${per} (${gbp(input.annualGross)} ÷ ${n})` : "Gross pay for the year", amount: gross });

  // Pensions
  const scheme = input.pension.scheme;
  const empWorking: WorkingLine[] = [];
  const employeeContribution = scheme === "none" ? 0 : contribution(R, f, input.pension.employee, input.pension.basis, gross, empWorking, scheme === "sacrifice" ? "Salary sacrificed" : "Employee pension (gross)");
  const employerPension = contribution(R, f, input.pension.employer, input.pension.basis, gross, empWorking, "Employer pension");
  working.push(...empWorking.filter((w) => !w.label.startsWith("Employer")));

  const sacrifice = scheme === "sacrifice" ? Math.min(employeeContribution, gross) : 0;
  const netPayPension = scheme === "netPay" ? employeeContribution : 0;
  const rasGross = scheme === "reliefAtSource" ? employeeContribution : 0;
  if (sacrifice > 0) working.push({ label: `Less: salary sacrifice (reduces pay for tax and NIC)`, amount: -sacrifice });
  if (netPayPension > 0) working.push({ label: `Less: pension under a net pay arrangement (reduces pay for tax, not NIC)`, amount: -netPayPension });
  const giving = r2((input.payrollGiving ?? 0) / n);
  if (giving > 0) working.push({ label: `Less: payroll giving (reduces pay for tax, not NIC)`, amount: -giving });
  const payrolled = input.benefits.method === "payrolled" ? r2(bik / n) : 0;
  if (payrolled > 0) working.push({ label: `Add: payrolled benefits in kind (${gbp(bik)} ÷ ${n})`, amount: payrolled });
  const payForTax = r2(gross - sacrifice - netPayPension - giving + payrolled);
  working.push({ label: `Pay for tax this ${per}`, amount: payForTax, kind: "subtotal" });

  // Tax
  if (codeUsed !== parsed.normalised)
    working.push({ label: `Benefit of ${gbp(bik)} coded out: ${parsed.normalised} becomes ${codeUsed}`, amount: 0, kind: "note" });
  const paye = payeTax(R, { code, frequency: f, pay: Math.max(0, payForTax), payrolledBenefits: payrolled });
  working.push(...paye.working);
  working.push({ label: `Income tax for the ${per}`, amount: paye.tax, kind: "subtotal" });

  // NIC (benefits in kind aren't Class 1 earnings: Class 1A instead)
  const nicEarnings = r2(gross - sacrifice);
  const ni = class1(R, f, input.nicCategory, nicEarnings, { showEmployer: false });
  working.push({ label: `NIC earnings this ${per} (category ${input.nicCategory})`, amount: nicEarnings, kind: "memo" });
  working.push(...ni.working);
  working.push({ label: `Employee NIC for the ${per}`, amount: ni.employee, kind: "subtotal" });

  // Student and postgraduate loans: on NIC earnings, rounded down to £1
  let sl = 0;
  let pgl = 0;
  if (input.studentLoan !== "none") {
    const ids = SL_IDS[input.studentLoan];
    const th = R.gbp(ids[f]);
    const r = R.percent("emp.sl-rate");
    sl = floorPound(Math.max(0, ((nicEarnings - th) * r) / 100));
    working.push({ label: `Student loan ${ids.label}: (${gbp(nicEarnings)} − ${gbp(th)}) × ${pctLabel(r)}, rounded down to £1`, amount: -sl, rateId: ids[f] });
  }
  if (input.postgraduateLoan) {
    const th = R.gbp(PGL_IDS[f]);
    const r = R.percent("emp.pgl-rate");
    pgl = floorPound(Math.max(0, ((nicEarnings - th) * r) / 100));
    working.push({ label: `Postgraduate loan: (${gbp(nicEarnings)} − ${gbp(th)}) × ${pctLabel(r)}, rounded down to £1`, amount: -pgl, rateId: PGL_IDS[f] });
  }

  // Relief at source: the employee pays the contribution net of basic rate relief.
  let rasNet = 0;
  if (rasGross > 0) {
    const br = R.percent("it.basic-rate");
    rasNet = r2(rasGross * (1 - br / 100));
    working.push({ label: `Pension under relief at source: ${gbp(rasGross)} gross less ${pctLabel(br)} relief claimed by the provider`, amount: -rasNet, rateId: "it.basic-rate" });
  }
  const other = r2((input.otherNetDeductions ?? 0) / n);
  if (other > 0) working.push({ label: `Other deductions from net pay`, amount: -other });

  const netPay = r2(gross - sacrifice - netPayPension - giving - paye.tax - ni.employee - sl - pgl - rasNet - other);
  working.push({ label: `Take-home pay for the ${per}`, amount: netPay, kind: "total" });

  // Employer side
  const er = class1(R, f, input.nicCategory, nicEarnings, { showEmployee: false });
  working.push(...er.working.map((w) => ({ ...w, kind: "memo" as const })));
  working.push(...empWorking.filter((w) => w.label.startsWith("Employer")));
  if (sacrifice > 0) working.push({ label: `Employer pays the sacrificed ${gbp(sacrifice)} into the pension`, amount: sacrifice, kind: "memo" });

  const period: PeriodFigures = {
    gross,
    sacrifice,
    netPayPension,
    payrollGiving: giving,
    payrolledBenefits: payrolled,
    payForTax,
    nicEarnings,
    tax: paye.tax,
    employeeNic: ni.employee,
    studentLoan: sl,
    postgraduateLoan: pgl,
    reliefAtSourceNet: rasNet,
    otherNetDeductions: other,
    netPay,
    employerNic: er.employer,
    employerPension,
  };
  const annual = Object.fromEntries(Object.entries(period).map(([k, v]) => [k, r2(v * n)])) as unknown as PeriodFigures;

  let class1A = 0;
  if (bik > 0) {
    const c1a = R.percent("emp.class1a-rate");
    class1A = r2((bik * c1a) / 100);
  }
  const totalEmploymentCost = r2(annual.gross - annual.sacrifice + annual.employerNic + annual.employerPension + annual.sacrifice + class1A);

  if (n > 1) working.push({ label: `Annual figures = ${per}ly figures × ${n}`, amount: 0, kind: "note" });
  working.push({ label: `Gross pay for the year`, amount: annual.gross, kind: "memo" });
  working.push({ label: `Employer NIC for the year`, amount: annual.employerNic, rateId: "nic.employer-rate", kind: "memo" });
  if (annual.employerPension + annual.sacrifice > 0) working.push({ label: `Employer pension for the year${annual.sacrifice > 0 ? " (including sacrificed pay)" : ""}`, amount: r2(annual.employerPension + annual.sacrifice), kind: "memo" });
  if (class1A > 0) working.push({ label: `Class 1A NIC on benefits: ${gbp(bik)} × ${pctLabel(R.percent("emp.class1a-rate"))}`, amount: class1A, rateId: "emp.class1a-rate", kind: "memo" });
  working.push({ label: `Total cost of employment for the year`, amount: totalEmploymentCost, kind: "memo" });

  const summary: SummaryRow[] = [
    { label: "Gross pay", annual: annual.gross },
    ...(annual.sacrifice ? [{ label: "Salary sacrifice", annual: -annual.sacrifice }] : []),
    ...(annual.netPayPension ? [{ label: "Pension (net pay arrangement)", annual: -annual.netPayPension }] : []),
    ...(annual.payrollGiving ? [{ label: "Payroll giving", annual: -annual.payrollGiving }] : []),
    { label: "Income tax", annual: -annual.tax },
    { label: "Employee NIC", annual: -annual.employeeNic },
    ...(annual.studentLoan ? [{ label: "Student loan", annual: -annual.studentLoan }] : []),
    ...(annual.postgraduateLoan ? [{ label: "Postgraduate loan", annual: -annual.postgraduateLoan }] : []),
    ...(annual.reliefAtSourceNet ? [{ label: "Pension (relief at source, net)", annual: -annual.reliefAtSourceNet }] : []),
    ...(annual.otherNetDeductions ? [{ label: "Other deductions", annual: -annual.otherNetDeductions }] : []),
    { label: "Take-home pay", annual: annual.netPay, kind: "total" },
    { label: "Employer NIC", annual: annual.employerNic, kind: "employer" },
    ...(annual.employerPension + annual.sacrifice ? [{ label: "Employer pension", annual: r2(annual.employerPension + annual.sacrifice), kind: "employer" as const }] : []),
    ...(class1A ? [{ label: "Class 1A NIC (annual)", annual: class1A, kind: "employer" as const }] : []),
    { label: "Total cost of employment", annual: totalEmploymentCost, kind: "subtotal" },
  ];

  // Notes: what this doesn't cover, specific to the inputs.
  notes.push(
    `Every ${per} is assumed to be paid the same, so each ${per} is worked like the first ${per} of the year (week 1/month 1). On a cumulative code with even pay the year's total is the same give or take a few pence; with irregular pay (bonuses, a mid-year start or a code change) cumulative tax will differ.`
  );
  if (code.nonCumulative) notes.push(`${code.normalised} is a week 1/month 1 (non-cumulative) code, often the emergency code 1257L W1/M1/X: no refund of tax overpaid earlier in the year comes through the payroll.`);
  if (paye.limited) notes.push("The 50% overriding limit restricted the tax this period. On a cumulative code the shortfall is collected in later periods; on a week 1/month 1 code it isn't (HMRC collects it after the year end).");
  if (code.kind === "allowance" && input.annualGross > R.gbp("it.pa-taper-threshold"))
    notes.push(`Pay is over ${gbp(R.gbp("it.pa-taper-threshold"))}: the personal allowance taper isn't applied through PAYE unless HMRC issues a reduced code, so the year-end liability may be higher than the tax deducted here.`);
  if (code.region === "wales") notes.push("C codes: the Welsh rates currently equal the rest-of-UK rates, so the same bands apply.");
  if (input.nicCategory === "V") notes.push("Category V only applies for the first 12 months of the veteran's first civilian employment.");
  if (input.studentLoan !== "none") notes.push("Only one student loan plan is deducted at a time unless HMRC says otherwise (SL1/SL2 notice). Deductions use NIC earnings and are rounded down to the whole pound.");
  if (scheme === "reliefAtSource") notes.push("Relief at source: higher and additional rate relief isn't given through payroll; the employee claims it through Self Assessment or a code change.");
  if (scheme === "sacrifice") notes.push("Salary sacrifice: check the reduced pay doesn't fall below the National Minimum Wage. Any share of the employer's NIC saving added to the pension isn't included unless you add it to the employer contribution.");
  if (bik > 0) notes.push("The cost of providing the benefit itself isn't included in the cost of employment, only Class 1A NIC on its cash equivalent.");
  notes.push("Not modelled: directors' annual earnings periods, fortnightly or four-weekly pay, Freeport/Investment Zone categories, the High Income Child Benefit Charge, cumulative catch-up after the 50% limit, and the employer's Employment Allowance (see the employer cost calculator).");

  const deductions = annual.gross - annual.netPay;
  return {
    taxYear: input.taxYear,
    tax: netPay,
    working,
    rateIds: [...R.used],
    notes,
    frequency: f,
    code,
    codeUsed,
    period,
    annual,
    class1A,
    totalEmploymentCost,
    summary,
    effectiveRate: annual.gross > 0 ? deductions / annual.gross : null,
    taxLimited: paye.limited,
  };
}

/** Take-home per month (annual ÷ 12), the figure staff usually quote. */
function netMonthly(r: TakeHomeResult): number {
  return r.annual.netPay / 12;
}

export type TargetMode = "grossForNet" | "maxSacrifice" | "sacrificeForTaxablePay";

export interface TargetResult {
  mode: TargetMode;
  /** The solved figure: annual gross, or annual sacrifice. Null if no solution in range. */
  solved: number | null;
  result: TakeHomeResult | null;
  message: string;
}

const MAX_GROSS = 10_000_000;

/**
 * Target modes, solved by bisection over `takeHome` to the penny:
 * - grossForNet: the lowest annual gross giving at least `target` take-home a month;
 * - maxSacrifice: the largest annual salary sacrifice that keeps take-home at least `target` a month;
 * - sacrificeForTaxablePay: the smallest annual salary sacrifice that brings annual pay for tax down to `target`
 *   (e.g. £100,000 to keep the personal allowance, or £60,000 for the Child Benefit charge, where
 *   employment income is the only income).
 */
export function solveTakeHome(input: TakeHomeInput, mode: TargetMode, target: number): TargetResult {
  const errs = validateTakeHome(input);
  if (!(target >= 0)) errs.push("Enter a target of zero or more.");
  if (errs.length) throw new CalcInputError(errs);

  if (mode === "grossForNet") {
    const f = (g: number) => netMonthly(takeHome({ ...input, annualGross: g })) >= target - 1e-9;
    const g = solveMin(f, 0, MAX_GROSS);
    if (g === null) return { mode, solved: null, result: null, message: `No gross pay up to ${gbp(MAX_GROSS)} gives ${gbp(target)} a month.` };
    const result = takeHome({ ...input, annualGross: g });
    return { mode, solved: r2(g), result, message: `Gross pay of ${gbp(g)} a year (${gbp(g / 12)} a month) gives take-home of ${gbp(result.annual.netPay / 12)} a month.` };
  }

  const withSacrifice = (s: number): TakeHomeInput => ({
    ...input,
    pension: { ...input.pension, scheme: "sacrifice", employee: { mode: "amount", value: s } },
  });
  if (mode === "maxSacrifice") {
    const f = (s: number) => netMonthly(takeHome(withSacrifice(s))) >= target - 1e-9;
    const s = solveMax(f, 0, input.annualGross);
    if (s === null) return { mode, solved: null, result: null, message: `Take-home is below ${gbp(target)} a month even with no salary sacrifice.` };
    const result = takeHome(withSacrifice(s));
    return {
      mode,
      solved: r2(s),
      result,
      message: `Up to ${gbp(s)} a year (${gbp(s / 12)} a month) can be sacrificed and keep take-home at ${gbp(result.annual.netPay / 12)} a month.`,
    };
  }
  const f = (s: number) => takeHome(withSacrifice(s)).annual.payForTax <= target + 1e-9;
  const s = solveMin(f, 0, input.annualGross);
  if (s === null) return { mode, solved: null, result: null, message: `Pay for tax can't be brought down to ${gbp(target)} by salary sacrifice.` };
  const result = takeHome(withSacrifice(s));
  return {
    mode,
    solved: r2(s),
    result,
    message: `A salary sacrifice of ${gbp(s)} a year brings pay for tax to ${gbp(result.annual.payForTax)}. Adjusted net income also includes other income and deductions such as Gift Aid, which aren't modelled.`,
  };
}
