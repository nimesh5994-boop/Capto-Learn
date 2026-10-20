"use client";

import { rate } from "@/content/rates";
import { gbp } from "@/lib/calc/common";
import { NIC_CATEGORIES, type NicCategory } from "@/lib/calc/employment/nic";
import { parseTaxCode } from "@/lib/calc/employment/paye";
import type { Frequency } from "@/lib/calc/employment/shared";
import {
  type BenefitMethod,
  type PensionScheme,
  type StudentLoanPlan,
  type TakeHomeInput,
  type TakeHomeResult,
  type TargetMode,
  type TargetResult,
  solveTakeHome,
  takeHome,
  validateTakeHome,
} from "@/lib/calc/employment/takeHome";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import { PeriodTable } from "./PeriodTable";
import calc from "../calc.module.css";
import styles from "./employment.module.css";

const EXAMPLE = {
  mode: "forward",
  target: "",
  gross: "6,000",
  grossPer: "month",
  frequency: "monthly",
  taxCode: "1257L",
  category: "A",
  studentLoan: "none",
  pgl: "no",
  scheme: "netPay",
  basis: "all",
  eeMode: "percent",
  ee: "5",
  erMode: "percent",
  er: "0",
  bik: "",
  bikMethod: "inCode",
  giving: "",
  otherNet: "",
};
const BLANK = { ...EXAMPLE, gross: "", grossPer: "year", scheme: "none", ee: "", er: "" };

const PER_MULT: Record<string, number> = { year: 1, month: 12, week: 52 };

const MODES: { value: TargetMode | "forward"; label: string }[] = [
  { value: "forward", label: "Take-home from gross pay" },
  { value: "grossForNet", label: "Gross pay needed for a target take-home a month" },
  { value: "maxSacrifice", label: "Most salary sacrifice keeping a target take-home a month" },
  { value: "sacrificeForTaxablePay", label: "Salary sacrifice to bring pay for tax down to a target (e.g. £100,000)" },
];

export function TakeHomeCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = {
    gross: parseMoney(v.gross),
    target: parseMoney(v.target, true),
    ee: v.eeMode === "percent" ? parsePercent(v.ee) : parseMoney(v.ee),
    er: v.erMode === "percent" ? parsePercent(v.er) : parseMoney(v.er),
    bik: parseMoney(v.bik),
    giving: parseMoney(v.giving),
    otherNet: parseMoney(v.otherNet),
  };
  const codeCheck = parseTaxCode(v.taxCode);
  const fieldErrors = Object.values(p).some((x) => x.error) || !!codeCheck.error;
  const src = (id: string, fallback = "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027") => rate(taxYear, id)?.source.url ?? fallback;
  const mode = v.mode as TargetMode | "forward";
  const isTarget = mode !== "forward";

  const input: TakeHomeInput = {
    taxYear,
    frequency: v.frequency as Frequency,
    annualGross: (p.gross.value ?? 0) * (PER_MULT[v.grossPer] ?? 1),
    taxCode: v.taxCode,
    nicCategory: v.category as NicCategory,
    studentLoan: v.studentLoan as StudentLoanPlan,
    postgraduateLoan: v.pgl === "yes",
    pension: {
      scheme: v.scheme as PensionScheme,
      basis: v.basis as "all" | "qualifying",
      employee: { mode: v.eeMode as "percent" | "amount", value: p.ee.value ?? 0 },
      employer: { mode: v.erMode as "percent" | "amount", value: p.er.value ?? 0 },
    },
    benefits: { annualValue: p.bik.value ?? 0, method: v.bikMethod as BenefitMethod },
    payrollGiving: p.giving.value ?? 0,
    otherNetDeductions: p.otherNet.value ?? 0,
  };

  const { result, target, errors } = ((): { result: TakeHomeResult | null; target: TargetResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, target: null, errors: [codeCheck.error ?? "Fix the highlighted fields."] };
    const errs = validateTakeHome(input);
    if (isTarget && p.target.value === undefined) errs.push("Enter the target figure.");
    if (errs.length) return { result: null, target: null, errors: errs };
    try {
      if (isTarget) {
        const t = solveTakeHome(input, mode as TargetMode, p.target.value!);
        return { result: t.result, target: t, errors: t.result ? [] : [t.message] };
      }
      return { result: takeHome(input), target: null, errors: [] };
    } catch (e) {
      return { result: null, target: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const per = v.frequency === "weekly" ? "week" : v.frequency === "annual" ? "year" : "month";

  return (
    <div className={calc.layout}>
      <form className={`card card-pad ${calc.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Take-home pay inputs">
        <FormHead
          title="Take-home pay"
          intro="A regular payslip worked the way payroll software does it (HMRC's exact percentage method): tax from the code, Class 1 NIC, student loans and pension, then the year, month and week, with employer NIC and pension for the total cost of employment."
          example="Marcus (Calculating PAYE and NIC lesson): £6,000 a month, 1257L, 5% net pay pension → tax £1,232.06, NIC £287.50, take-home £4,180.44."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField label="What do you want to work out?" value={v.mode} onChange={f.set("mode")} options={MODES} />
        {isTarget && (
          <MoneyField
            label={mode === "sacrificeForTaxablePay" ? "Target pay for tax (a year)" : "Target take-home pay (a month)"}
            value={v.target}
            onChange={f.set("target")}
            error={p.target.error}
            help={
              mode === "sacrificeForTaxablePay"
                ? "E.g. £100,000 to keep the full personal allowance or £60,000 to avoid the Child Benefit charge, where salary is the only income."
                : "Net pay after tax, NIC, student loans and pension, as a monthly figure (annual ÷ 12)."
            }
          />
        )}
        {(mode === "maxSacrifice" || mode === "sacrificeForTaxablePay") && (
          <p className="small faint">The salary sacrifice is solved for and replaces the employee pension contribution below; the employer contribution still applies.</p>
        )}
        {mode !== "grossForNet" && (
          <div className="grid-2">
            <MoneyField label="Gross pay" value={v.gross} onChange={f.set("gross")} error={p.gross.error} help="Contractual pay before any salary sacrifice, including regular overtime and allowances." />
            <SelectField
              label="Per"
              value={v.grossPer}
              onChange={f.set("grossPer")}
              options={[
                { value: "year", label: "Year" },
                { value: "month", label: "Month" },
                { value: "week", label: "Week" },
              ]}
            />
          </div>
        )}
        <div className="grid-2">
          <SelectField
            label="Paid"
            value={v.frequency}
            onChange={f.set("frequency")}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "weekly", label: "Weekly" },
              { value: "annual", label: "Once a year (annual)" },
            ]}
            help="Decides which period thresholds and tax tables apply."
          />
          <div className={calc.field}>
            <label htmlFor="th-code">Tax code</label>
            <input id="th-code" value={v.taxCode} onChange={(e) => f.set("taxCode")(e.target.value)} autoComplete="off" aria-invalid={!!codeCheck.error} aria-describedby="th-code-help" className={codeCheck.error ? calc.invalid : undefined} />
            {codeCheck.error && <div className={calc.fieldError}>{codeCheck.error}</div>}
            <div id="th-code-help" className={calc.help}>
              1257L, S1257L (Scotland), C1257L (Wales), K codes, BR, D0/D1, SD0–SD3, NT, 0T. Add W1, M1 or X for emergency/non-cumulative.{" "}
              <GovLink href="https://www.gov.uk/tax-codes">GOV.UK: tax codes</GovLink>
            </div>
          </div>
        </div>
        <SelectField
          label="NIC category letter"
          value={v.category}
          onChange={f.set("category")}
          options={NIC_CATEGORIES}
          help={
            <>
              Under 21s (M), apprentices under 25 (H) and veterans (V) pay employee NIC as normal, but the employer pays 0% up to the upper secondary threshold.{" "}
              <GovLink href="https://www.gov.uk/national-insurance-rates-letters/category-letters">GOV.UK: category letters</GovLink>
            </>
          }
        />
        <div className="grid-2">
          <SelectField
            label="Student loan"
            value={v.studentLoan}
            onChange={f.set("studentLoan")}
            options={[
              { value: "none", label: "None" },
              { value: "plan1", label: "Plan 1" },
              { value: "plan2", label: "Plan 2" },
              { value: "plan4", label: "Plan 4 (Scotland)" },
              { value: "plan5", label: "Plan 5" },
            ]}
            help={<GovLink href={src("emp.sl-plan2-threshold")}>Thresholds on GOV.UK</GovLink>}
          />
          <SelectField
            label="Postgraduate loan"
            value={v.pgl}
            onChange={f.set("pgl")}
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
          />
        </div>

        <fieldset className={styles.group}>
          <legend>Pension</legend>
          <SelectField
            label="Scheme type"
            value={v.scheme}
            onChange={f.set("scheme")}
            options={[
              { value: "none", label: "No employee contribution" },
              { value: "netPay", label: "Net pay arrangement (before tax)" },
              { value: "reliefAtSource", label: "Relief at source (from net pay)" },
              { value: "sacrifice", label: "Salary sacrifice" },
            ]}
            help={
              <>
                Net pay saves tax only; relief at source gets basic rate relief from the provider; salary sacrifice saves tax and NIC for both sides.{" "}
                <GovLink href="https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye">GOV.UK: salary sacrifice</GovLink>
              </>
            }
          />
          <SelectField
            label="Percentages apply to"
            value={v.basis}
            onChange={f.set("basis")}
            options={[
              { value: "all", label: "All pay" },
              { value: "qualifying", label: "Qualifying earnings (auto-enrolment band)" },
            ]}
            help={<GovLink href={src("emp.ae-qualifying-earnings-lower")}>The Pensions Regulator: earnings thresholds</GovLink>}
          />
          {v.scheme !== "none" && (
          <div className="grid-2">
            <NumberField
              label={v.scheme === "sacrifice" ? "Amount sacrificed" : "Employee contribution (gross)"}
              value={v.ee}
              onChange={f.set("ee")}
              error={p.ee.error}
              suffix={v.eeMode === "percent" ? "%" : "£/yr"}
            />
            <SelectField label="Entered as" value={v.eeMode} onChange={f.set("eeMode")} options={[{ value: "percent", label: "% of pay" }, { value: "amount", label: "£ a year" }]} />
          </div>
          )}
          <div className="grid-2">
            <NumberField label="Employer contribution" value={v.er} onChange={f.set("er")} error={p.er.error} suffix={v.erMode === "percent" ? "%" : "£/yr"} />
            <SelectField label="Entered as" value={v.erMode} onChange={f.set("erMode")} options={[{ value: "percent", label: "% of pay" }, { value: "amount", label: "£ a year" }]} />
          </div>
        </fieldset>

        <details className={styles.more}>
          <summary>More inputs: benefits, payroll giving, other deductions</summary>
          <div className={styles.moreBody}>
            <MoneyField
              label="Benefits in kind (cash equivalent a year)"
              value={v.bik}
              onChange={f.set("bik")}
              error={p.bik.error}
              help={
                <>
                  Company car, medical insurance and so on. The employer pays Class 1A NIC on this.{" "}
                  <GovLink href="https://www.gov.uk/employer-reporting-expenses-benefits">GOV.UK: expenses and benefits</GovLink>
                </>
              }
            />
            <SelectField
              label="How the benefit is taxed"
              value={v.bikMethod}
              onChange={f.set("bikMethod")}
              options={[
                { value: "inCode", label: "Already reflected in the tax code above" },
                { value: "adjustCode", label: "Reduce the tax code above for it" },
                { value: "payrolled", label: "Payrolled (added to pay for tax)" },
              ]}
            />
            <MoneyField label="Payroll giving (a year)" value={v.giving} onChange={f.set("giving")} error={p.giving.error} help="Deducted before tax but not before NIC." />
            <MoneyField label="Other deductions from net pay (a year)" value={v.otherNet} onChange={f.set("otherNet")} error={p.otherNet.error} help="E.g. season ticket loan repayments, union subscriptions." />
          </div>
        </details>
      </form>

      <div className={styles.side}>
        {target && target.solved !== null && (
          <section className="card card-pad" aria-live="polite">
            <div className={styles.target}>
              <div className={calc.headlineLabel}>{mode === "grossForNet" ? "Gross pay needed (a year)" : "Salary sacrifice (a year)"}</div>
              <div className={styles.targetFigure}>{gbp(target.solved)}</div>
              <p className="small muted">{target.message}</p>
              {mode === "grossForNet" && <p className="small faint">The pension and other inputs apply at the solved salary.</p>}
            </div>
          </section>
        )}
        {result && <PeriodTable rows={result.summary} caption={`Year, month and week (${taxYear})`} />}
        <ResultPanel
          title="Take-home pay"
          headlineLabel={`Take-home pay a ${per}`}
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Deductions as a share of gross pay"
          inputsSummary={[
            `Gross pay: ${isTarget && mode === "grossForNet" ? "solved" : `${v.gross || "0"} a ${v.grossPer}`}`,
            `Paid: ${v.frequency}`,
            `Tax code: ${result?.codeUsed ?? v.taxCode}`,
            `NIC category: ${v.category}`,
            `Student loan: ${v.studentLoan}${v.pgl === "yes" ? " + postgraduate loan" : ""}`,
            `Pension: ${v.scheme}, employee ${v.ee || "0"}${v.eeMode === "percent" ? "%" : " £/yr"}, employer ${v.er || "0"}${v.erMode === "percent" ? "%" : " £/yr"} (${v.basis === "all" ? "all pay" : "qualifying earnings"})`,
            ...(v.bik ? [`Benefits in kind: ${v.bik} (${v.bikMethod})`] : []),
            ...(target ? [`Target: ${v.target} (${mode}) → ${target.solved !== null ? gbp(target.solved) : "no solution"}`] : []),
          ]}
        />
      </div>
    </div>
  );
}
