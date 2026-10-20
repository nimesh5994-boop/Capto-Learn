/**
 * Salary versus dividend for an owner-managed company: for each salary level, the company's employer
 * NIC (less any Employment Allowance), corporation tax on what's left, the dividend paid out, and the
 * director's employee NIC and income tax, giving total tax and net cash.
 *
 * Uses the income tax engine (../incomeTax) and corporation tax engine (../corporationTax) as they are.
 * Directors' NIC is worked on the annual earnings period (directors are assessed annually), Category A.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader } from "../common";
import { corporationTax } from "../corporationTax";
import { incomeTax } from "../incomeTax";

export interface SalaryDividendInput {
  taxYear: string;
  /** Company profit for the year before any director's pay and the employer NIC on it. */
  profitBeforePay: number;
  /** Number of director-shareholders taking the same salary and an equal share of dividends. */
  directors: number;
  /** Each director's other non-savings income (another job, pension, rental profit). */
  otherIncome: number;
  /** Can the company claim the Employment Allowance? (Not if the only employee paid above the secondary threshold is a director.) */
  employmentAllowance: boolean;
  /** Employer NIC on other staff for the year, which uses the Employment Allowance first. */
  otherStaffEmployerNic: number;
  associatedCompanies: number;
  /** An extra salary (per director) to compare. */
  customSalary?: number;
  /** distribute: pay out all post-tax profit as dividends; target: pay only the dividend needed for the target net cash. */
  mode: "distribute" | "target";
  /** Target net cash per director from salary and dividends after their tax and NIC (target mode). */
  targetNetCash?: number;
}

export interface Scenario {
  key: string;
  label: string;
  /** Per director. */
  salary: number;
  employerNic: number; // company total, after Employment Allowance
  employmentAllowanceUsed: number;
  companyProfitAfterPay: number;
  corporationTax: number;
  /** Per director. */
  dividend: number;
  /** Company profit left after dividends (target mode). */
  retained: number;
  /** Per director. */
  employeeNic: number;
  /** Per director: extra income tax on salary and dividends (over tax on their other income). */
  incomeTax: number;
  /** Per director: salary + dividend − employee NIC − income tax. */
  netCash: number;
  /** All directors and the company together. */
  totalTax: number;
  feasible: boolean;
  reason?: string;
}

export interface SalaryDividendResult extends CalcResult {
  scenarios: Scenario[];
  bestKey: string | null;
  /** Total tax of the best scenario as a share of the profit before pay. */
  effectiveRate: number | null;
}

export function validateSalaryDividend(i: SalaryDividendInput): string[] {
  const e: string[] = [];
  const money: [string, number | undefined][] = [
    ["Company profit before director's pay", i.profitBeforePay],
    ["Other income", i.otherIncome],
    ["Employer NIC on other staff", i.otherStaffEmployerNic],
    ["Custom salary", i.customSalary],
    ["Target net cash", i.targetNetCash],
  ];
  for (const [label, v] of money) {
    if (v === undefined) continue;
    if (!Number.isFinite(v)) e.push(`${label} must be a number.`);
    else if (v < 0) e.push(`${label} can't be negative.`);
  }
  if (!Number.isInteger(i.directors) || i.directors < 1 || i.directors > 10) e.push("Directors must be a whole number from 1 to 10.");
  if (!Number.isInteger(i.associatedCompanies) || i.associatedCompanies < 0 || i.associatedCompanies > 99) e.push("Associated companies must be a whole number from 0 to 99.");
  if (i.mode === "target" && !(i.targetNetCash && i.targetNetCash > 0)) e.push("Enter the target net cash per director.");
  return e;
}

type Ctx = ReturnType<typeof context>;

function context(i: SalaryDividendInput) {
  const R = rateReader(i.taxYear);
  const st = R.gbp("nic.secondary-threshold");
  const pt = R.gbp("nic.primary-threshold");
  const uel = R.gbp("nic.upper-earnings-limit");
  const lel = R.gbp("nic.lower-earnings-limit");
  const erRate = R.percent("nic.employer-rate");
  const eeMain = R.percent("nic.employee-main-rate");
  const eeAdd = R.percent("nic.employee-additional-rate");
  const ea = R.gbp("nic.employment-allowance");
  const eaAvailable = i.employmentAllowance ? Math.max(0, ea - i.otherStaffEmployerNic) : 0;
  const baseIt = incomeTax({ taxYear: i.taxYear, nonSavingsIncome: i.otherIncome, savingsIncome: 0, dividends: 0, region: "rUK" }).tax;
  return { R, st, pt, uel, lel, erRate, eeMain, eeAdd, ea, eaAvailable, baseIt, i };
}

function employeeNic(c: Ctx, s: number): number {
  return (Math.max(0, Math.min(s, c.uel) - c.pt) * c.eeMain) / 100 + (Math.max(0, s - c.uel) * c.eeAdd) / 100;
}

function personal(c: Ctx, salary: number, dividend: number) {
  const it = incomeTax({ taxYear: c.i.taxYear, nonSavingsIncome: c.i.otherIncome + salary, savingsIncome: 0, dividends: dividend, region: "rUK" }).tax;
  const extraIt = r2(it - c.baseIt);
  const ee = r2(employeeNic(c, salary));
  return { extraIt, ee, net: r2(salary + dividend - ee - extraIt) };
}

function company(c: Ctx, salary: number) {
  const n = c.i.directors;
  const grossEr = (n * Math.max(0, salary - c.st) * c.erRate) / 100;
  const eaUsed = Math.min(c.eaAvailable, grossEr);
  const er = r2(grossEr - eaUsed);
  const taxable = r2(c.i.profitBeforePay - n * salary - er);
  if (taxable < 0) return null;
  const ct = corporationTax({ taxYear: c.i.taxYear, profits: taxable, associatedCompanies: c.i.associatedCompanies, periodMonths: 12 }).tax;
  return { er, eaUsed: r2(eaUsed), taxable, ct, distributable: r2(taxable - ct) };
}

/** Smallest dividend (to the penny) giving at least `target` net cash with this salary. */
function dividendForTarget(c: Ctx, salary: number, target: number, cap: number): number | null {
  if (personal(c, salary, 0).net >= target) return 0;
  if (personal(c, salary, cap).net < target) return null;
  let lo = 0;
  let hi = cap;
  for (let k = 0; k < 60 && hi - lo > 0.005; k++) {
    const mid = (lo + hi) / 2;
    if (personal(c, salary, mid).net >= target) hi = mid;
    else lo = mid;
  }
  // Settle on whole pence.
  let d = Math.ceil(hi * 100) / 100;
  while (d > 0.01 && personal(c, salary, r2(d - 0.01)).net >= target) d = r2(d - 0.01);
  return Math.min(d, cap);
}

function scenario(c: Ctx, key: string, label: string, salary: number): Scenario {
  const n = c.i.directors;
  const empty = { employerNic: 0, employmentAllowanceUsed: 0, companyProfitAfterPay: 0, corporationTax: 0, dividend: 0, retained: 0, employeeNic: 0, incomeTax: 0, netCash: 0, totalTax: 0 };
  const co = company(c, salary);
  if (!co) return { key, label, salary, ...empty, feasible: false, reason: "Salary and employer NIC exceed the company's profit." };
  let dividend: number;
  let retained = 0;
  if (c.i.mode === "target") {
    const d = dividendForTarget(c, salary, c.i.targetNetCash ?? 0, co.distributable / n);
    if (d === null) {
      return { key, label, salary, ...empty, employerNic: co.er, employmentAllowanceUsed: co.eaUsed, companyProfitAfterPay: co.taxable, corporationTax: co.ct, feasible: false, reason: "The company can't fund the target net cash at this salary." };
    }
    dividend = d;
    retained = r2(co.distributable - n * d);
  } else {
    dividend = r2(co.distributable / n);
  }
  const p = personal(c, salary, dividend);
  return {
    key,
    label,
    salary,
    employerNic: co.er,
    employmentAllowanceUsed: co.eaUsed,
    companyProfitAfterPay: co.taxable,
    corporationTax: co.ct,
    dividend,
    retained,
    employeeNic: p.ee,
    incomeTax: p.extraIt,
    netCash: p.net,
    totalTax: r2(co.ct + co.er + n * (p.ee + p.extraIt)),
    feasible: true,
  };
}

/** Better of two scenarios: more net cash (distribute) or more profit retained (target). */
function better(c: Ctx, a: Scenario, b: Scenario): boolean {
  if (!b.feasible) return true;
  if (!a.feasible) return false;
  return c.i.mode === "target" ? a.retained > b.retained + 0.004 : a.netCash > b.netCash + 0.004;
}

/** Salary (per director) that gives the best result: grid search with breakpoints, then refined to £1. */
function findOptimumSalary(c: Ctx): number {
  const maxSalary = Math.min(c.i.profitBeforePay / c.i.directors, 200000);
  const step = c.i.mode === "target" ? 250 : 50;
  const cands = new Set<number>([0, c.st, c.lel, c.pt, c.uel]);
  for (let s = 0; s <= maxSalary; s += step) cands.add(s);
  let best: Scenario | null = null;
  for (const s of [...cands].filter((x) => x <= maxSalary).sort((a, b) => a - b)) {
    const sc = scenario(c, "opt", "", s);
    if (!best || better(c, sc, best)) best = sc;
  }
  if (!best || !best.feasible) return 0;
  // Refine around the best grid point.
  let bestS = best.salary;
  for (const width of [step, 10]) {
    const from = Math.max(0, bestS - width);
    const to = Math.min(maxSalary, bestS + width);
    const inc = width === step ? 10 : 1;
    for (let s = from; s <= to; s += inc) {
      const sc = scenario(c, "opt", "", s);
      if (better(c, sc, best!)) {
        best = sc;
        bestS = s;
      }
    }
  }
  return bestS;
}

export function salaryDividend(input: SalaryDividendInput): SalaryDividendResult {
  const errors = validateSalaryDividend(input);
  if (errors.length) throw new CalcInputError(errors);
  const c = context(input);
  const { R } = c;
  R.gbp("nic.employment-allowance");

  const scenarios: Scenario[] = [
    scenario(c, "nil", "No salary: all dividends", 0),
    scenario(c, "st", `Salary at the secondary threshold (${gbp(c.st)})`, c.st),
    scenario(c, "pt", `Salary at the primary threshold (${gbp(c.pt)})`, c.pt),
  ];
  if (input.customSalary !== undefined && input.customSalary > 0) scenarios.push(scenario(c, "custom", `Your salary (${gbp(input.customSalary)})`, input.customSalary));
  const opt = findOptimumSalary(c);
  scenarios.push(scenario(c, "opt", `Optimum salary found (${gbp(opt)})`, opt));

  let best: Scenario | null = null;
  for (const s of scenarios) if (s.feasible && (!best || better(c, s, best))) best = s;

  const n = input.directors;
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  if (best) {
    const each = n > 1 ? " per director" : "";
    working.push({ label: `Most efficient: ${best.label}`, amount: 0, kind: "note" });
    working.push({ label: "Company profit before director's pay", amount: input.profitBeforePay });
    working.push({ label: `Less salary${n > 1 ? ` (${n} × ${gbp(best.salary)})` : ""}`, amount: -r2(n * best.salary) });
    const grossEr = r2(best.employerNic + best.employmentAllowanceUsed);
    working.push({ label: `Less employer NIC: (${gbp(best.salary)} − ${gbp(c.st)}) × ${pctLabel(c.erRate)}${n > 1 ? ` × ${n}` : ""}`, amount: -grossEr, rateId: "nic.employer-rate" });
    if (best.employmentAllowanceUsed) working.push({ label: "Add back Employment Allowance used", amount: best.employmentAllowanceUsed, rateId: "nic.employment-allowance" });
    working.push({ label: "Taxable profit", amount: best.companyProfitAfterPay, kind: "subtotal" });
    working.push({ label: "Less corporation tax", amount: -best.corporationTax, rateId: best.companyProfitAfterPay > R.gbp("ct.lower-limit") / (input.associatedCompanies + 1) ? "ct.main-rate" : "ct.small-profits-rate" });
    working.push({ label: input.mode === "target" ? "Available for dividends" : "Dividends paid (all post-tax profit)", amount: r2(best.companyProfitAfterPay - best.corporationTax), kind: "subtotal" });
    if (input.mode === "target") {
      working.push({ label: `Dividend needed${each} for net cash of ${gbp(input.targetNetCash ?? 0)}`, amount: best.dividend });
      working.push({ label: "Profit retained in the company", amount: best.retained, kind: "subtotal" });
    }
    working.push({ label: `Director${each}: salary`, amount: best.salary });
    working.push({ label: `Director${each}: dividend`, amount: best.dividend });
    working.push({ label: `Less employee NIC (above ${gbp(c.pt)} at ${pctLabel(c.eeMain)})`, amount: -best.employeeNic, rateId: "nic.employee-main-rate" });
    working.push({ label: input.otherIncome ? "Less extra income tax on salary and dividends (over tax on other income)" : "Less income tax on salary and dividends", amount: -best.incomeTax, rateId: "it.dividend-ordinary-rate" });
    working.push({ label: `Net cash${each}`, amount: best.netCash, kind: "subtotal" });
    working.push({ label: "Total tax and NIC (company and director" + (n > 1 ? "s" : "") + ")", amount: best.totalTax, kind: "total" });
  } else {
    working.push({ label: "No scenario is possible with these figures.", amount: 0, kind: "note" });
  }

  notes.push(
    "The company's accounting period is taken as the 12 months matching this tax year at its financial-year rates; salary and dividends are assumed paid in the same tax year. Profit after pay must be at least nil.",
  );
  notes.push(
    `Salary below the lower earnings limit (${gbp(c.lel)}) doesn't give a qualifying year for State Pension; ${gbp(c.st)} is below it. Pension contributions, benefits in kind, student loans and Scottish rates on salary aren't modelled.`,
  );
  notes.push("Income tax on the director's other income is excluded: only the extra tax caused by the salary and dividends counts. Other dividends and savings income aren't modelled.");
  if (input.employmentAllowance) notes.push("Employment Allowance is only available if someone other than a director is paid above the secondary threshold; check eligibility.");
  notes.push("The optimum is searched to the nearest £1 of salary (up to £200,000).");

  return {
    taxYear: input.taxYear,
    tax: best ? best.totalTax : 0,
    working,
    rateIds: [...R.used, ...["it.dividend-allowance", "it.dividend-ordinary-rate", "it.dividend-upper-rate", "it.personal-allowance", "ct.small-profits-rate", "ct.main-rate"].filter((id) => !R.used.includes(id))],
    notes,
    scenarios,
    bestKey: best?.key ?? null,
    effectiveRate: best && input.profitBeforePay > 0 ? best.totalTax / input.profitBeforePay : null,
  };
}
