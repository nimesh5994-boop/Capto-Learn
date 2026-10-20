/**
 * Employer's annual cost: secondary Class 1 NIC by category (with the 0% band
 * up to the upper secondary thresholds for under-21s, apprentices under 25 and
 * veterans), Employment Allowance, Class 1A on benefits, Apprenticeship Levy and
 * an optional employer pension contribution.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { type NicCategory, class1 } from "./nic";
import { type Frequency, PERIODS, PERIOD_LABEL } from "./shared";

export interface EmployeeGroup {
  label?: string;
  count: number;
  /** Annual pay per employee (NIC earnings: after any salary sacrifice). */
  annualPay: number;
  category: NicCategory;
}

export interface EmployerCostInput {
  taxYear: string;
  /** Earnings period used for NIC: annual (as in most textbook answers and for directors), monthly or weekly. */
  frequency: Frequency;
  groups: EmployeeGroup[];
  employerPension?: { percent: number; basis: "all" | "qualifying" };
  /** Total cash equivalent of benefits in kind for the year (P11D / payrolled), liable to Class 1A. */
  class1ABenefits: number;
  /** Claim Employment Allowance (the employer has confirmed it's eligible). */
  employmentAllowance: boolean;
  /** Apprenticeship Levy: annual pay bill if different from the employees entered (e.g. connected companies), and the share of the allowance this employer uses. */
  levy?: { payBill?: number; allowance?: number };
}

export interface EmployerCostResult extends CalcResult {
  totalPay: number;
  employerNic: number;
  employeeNic: number;
  employmentAllowance: number;
  class1A: number;
  levy: number;
  payBill: number;
  pension: number;
  totalCost: number;
  employees: number;
  costPerEmployee: number | null;
}

export function validateEmployerCost(i: EmployerCostInput): string[] {
  const e: string[] = [];
  i.groups.forEach((g, ix) => {
    const name = g.label || `Row ${ix + 1}`;
    requireNonNegative(e, `${name}: number of employees`, g.count);
    requireNonNegative(e, `${name}: annual pay`, g.annualPay);
    if (!Number.isInteger(g.count)) e.push(`${name}: number of employees must be a whole number.`);
  });
  requireNonNegative(e, "Benefits in kind", i.class1ABenefits);
  if (i.employerPension) {
    requireNonNegative(e, "Employer pension", i.employerPension.percent);
    if (i.employerPension.percent > 100) e.push("Employer pension can't be more than 100%.");
  }
  requireNonNegative(e, "Pay bill", i.levy?.payBill);
  requireNonNegative(e, "Levy allowance", i.levy?.allowance);
  return e;
}

export function employerCost(input: EmployerCostInput): EmployerCostResult {
  const errors = validateEmployerCost(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const f = input.frequency;
  const n = PERIODS[f];
  const per = PERIOD_LABEL[f];
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  let totalPay = 0;
  let erNic = 0;
  let eeNic = 0;
  let pension = 0;
  let employees = 0;
  const groups = input.groups.filter((g) => g.count > 0);
  for (const [ix, g] of groups.entries()) {
    const name = g.label || `Row ${ix + 1}`;
    const pay = r2(g.annualPay / n);
    const c = class1(R, f, g.category, pay, { showEmployee: false });
    const groupEr = r2(c.employer * n * g.count);
    const groupEe = r2(c.employee * n * g.count);
    totalPay += g.annualPay * g.count;
    erNic += groupEr;
    eeNic += groupEe;
    employees += g.count;
    working.push({ label: `${name}: ${g.count} × ${gbp(g.annualPay)} a year, category ${g.category}`, amount: r2(g.annualPay * g.count), kind: "subtotal" });
    for (const w of c.working) working.push({ ...w, label: `${w.label}${n > 1 ? ` (per ${per})` : ""}` , kind: "memo" });
    working.push({ label: `Employer NIC: ${gbp(c.employer)}${n > 1 ? ` × ${n}` : ""} × ${g.count}`, amount: groupEr, rateId: "nic.employer-rate" });
    if (input.employerPension && input.employerPension.percent > 0) {
      let base = pay;
      if (input.employerPension.basis === "qualifying") {
        const lo = R.gbp(f === "annual" ? "emp.ae-qualifying-earnings-lower" : f === "monthly" ? "emp.ae-qe-lower-monthly" : "emp.ae-qe-lower-weekly");
        const hi = R.gbp(f === "annual" ? "emp.ae-qualifying-earnings-upper" : f === "monthly" ? "emp.ae-qe-upper-monthly" : "emp.ae-qe-upper-weekly");
        base = Math.max(0, Math.min(pay, hi) - lo);
      }
      const each = r2((base * input.employerPension.percent) / 100);
      const p = r2(each * n * g.count);
      pension += p;
      working.push({
        label: `Employer pension: ${input.employerPension.basis === "qualifying" ? "qualifying earnings" : "pay"} ${gbp(base)} × ${pctLabel(input.employerPension.percent)}${n > 1 ? ` × ${n}` : ""} × ${g.count}`,
        amount: p,
        rateId: input.employerPension.basis === "qualifying" ? "emp.ae-qualifying-earnings-lower" : undefined,
      });
    }
  }
  totalPay = r2(totalPay);
  erNic = r2(erNic);
  eeNic = r2(eeNic);
  pension = r2(pension);

  working.push({ label: "Total pay", amount: totalPay, kind: "subtotal" });
  working.push({ label: "Employer Class 1 NIC", amount: erNic, kind: "subtotal" });

  let ea = 0;
  if (input.employmentAllowance) {
    const max = R.gbp("nic.employment-allowance");
    ea = Math.min(max, erNic);
    working.push({ label: `Less: Employment Allowance (up to ${gbp(max)}, against employer Class 1 NIC only)`, amount: -ea, rateId: "nic.employment-allowance" });
    working.push({ label: "Employer Class 1 NIC payable", amount: r2(erNic - ea), kind: "subtotal" });
  }

  let class1A = 0;
  if (input.class1ABenefits > 0) {
    const r = R.percent("emp.class1a-rate");
    class1A = r2((input.class1ABenefits * r) / 100);
    working.push({ label: `Class 1A NIC: ${gbp(input.class1ABenefits)} benefits × ${pctLabel(r)} (not reduced by Employment Allowance)`, amount: class1A, rateId: "emp.class1a-rate" });
  }

  const levyRate = R.percent("emp.apprenticeship-levy-rate");
  const fullAllowance = R.gbp("emp.apprenticeship-levy-allowance");
  const allowance = Math.min(input.levy?.allowance ?? fullAllowance, fullAllowance);
  const payBill = r2(input.levy?.payBill ?? totalPay);
  const gross = r2((payBill * levyRate) / 100);
  const levy = r2(Math.max(0, gross - allowance));
  working.push({ label: `Apprenticeship Levy: pay bill ${gbp(payBill)} × ${pctLabel(levyRate)} = ${gbp(gross)}, less allowance ${gbp(allowance)}`, amount: levy, rateId: "emp.apprenticeship-levy-rate" });
  if (pension) working.push({ label: "Employer pension", amount: pension, kind: "subtotal" });

  const totalCost = r2(totalPay + erNic - ea + class1A + levy + pension);
  working.push({ label: "Total cost of employment for the year", amount: totalCost, kind: "total" });
  working.push({ label: "Employee Class 1 NIC (deducted from pay, memo)", amount: eeNic, kind: "memo" });
  working.push({ label: "Total Class 1 NIC, employee and employer (for small employers' relief next year)", amount: r2(eeNic + erNic), rateId: "emp.small-employer-nic-limit", kind: "memo" });

  if (input.employmentAllowance)
    notes.push(
      "Employment Allowance eligibility is assumed. It's not available where a company's only employee paid above the secondary threshold is a sole director, to organisations doing more than half their work in the public sector, for household staff (other than care and support workers), for off-payroll (IR35) workers, or to more than one company in a connected group. Claimed against one PAYE scheme only."
    );
  else notes.push("Employment Allowance not claimed. Most employers with more than one employee can claim it: tick the box if eligible.");
  if (groups.some((g) => g.category === "V")) notes.push("Category V (veterans) only applies for the first 12 months of the veteran's first civilian employment since leaving the forces.");
  if (groups.some((g) => g.category === "H")) notes.push("Category H needs an apprentice under 25 on an approved apprenticeship standard or framework.");
  notes.push(
    `Apprenticeship Levy: connected companies share one allowance; the pay bill counts all earnings liable to secondary Class 1 NIC (including employees under the thresholds, under 21s and apprentices) but not benefits liable to Class 1A. It's paid monthly through the EPS with ${gbp(fullAllowance / 12)} of allowance accruing each month.`
  );
  notes.push(
    `NIC is worked on a ${f === "annual" ? "single annual earnings period" : `${per}ly earnings period with HMRC's ${per}ly thresholds`}; ${f === "annual" ? "with monthly or weekly payroll the total can differ by a few pounds because the period thresholds are rounded" : "the same pay every period is assumed"}.`
  );
  notes.push("Not modelled: Freeport/Investment Zone categories, Class 1B (PAYE Settlement Agreements), statutory payments, holiday pay accruals and pension contributions above the employer percentage entered.");

  return {
    taxYear: input.taxYear,
    tax: totalCost,
    working,
    rateIds: [...R.used],
    notes,
    totalPay,
    employerNic: erNic,
    employeeNic: eeNic,
    employmentAllowance: ea,
    class1A,
    levy,
    payBill,
    pension,
    totalCost,
    employees,
    costPerEmployee: employees > 0 ? r2(totalCost / employees) : null,
  };
}
