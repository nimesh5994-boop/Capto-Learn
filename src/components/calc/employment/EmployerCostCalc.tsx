"use client";

import { rate } from "@/content/rates";
import { gbp } from "@/lib/calc/common";
import { type EmployerCostResult, type EmployeeGroup, employerCost, validateEmployerCost } from "@/lib/calc/employment/employerCost";
import { NIC_CATEGORIES, type NicCategory } from "@/lib/calc/employment/nic";
import type { Frequency } from "@/lib/calc/employment/shared";
import { parseMoney, parsePercent, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import calc from "../calc.module.css";
import styles from "./employment.module.css";

const ROWS = [0, 1, 2, 3] as const;

const EXAMPLE = {
  frequency: "annual",
  c0: "5", p0: "22,000", k0: "A",
  c1: "", p1: "", k1: "A",
  c2: "", p2: "", k2: "A",
  c3: "", p3: "", k3: "A",
  pension: "",
  basis: "qualifying",
  benefits: "",
  ea: "yes",
  payBill: "",
  levyAllowance: "",
};
const BLANK = { ...EXAMPLE, c0: "", p0: "", ea: "no" };

type Key = keyof typeof EXAMPLE;

export function EmployerCostCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const rows = ROWS.map((i) => ({
    count: parseWhole(v[`c${i}` as Key], 0),
    pay: parseMoney(v[`p${i}` as Key]),
    cat: v[`k${i}` as Key] as NicCategory,
  }));
  const p = {
    pension: parsePercent(v.pension),
    benefits: parseMoney(v.benefits),
    payBill: parseMoney(v.payBill, true),
    levyAllowance: parseMoney(v.levyAllowance, true),
  };
  const fieldErrors = Object.values(p).some((x) => x.error) || rows.some((r) => r.count.error || r.pay.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027";

  const { result, errors } = ((): { result: EmployerCostResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const groups: EmployeeGroup[] = rows
      .map((r, i) => ({ label: `Group ${i + 1}`, count: r.count.value ?? 0, annualPay: r.pay.value ?? 0, category: r.cat }))
      .filter((g) => g.count > 0 || g.annualPay > 0);
    const errs: string[] = [];
    groups.forEach((g) => {
      if (g.count === 0) errs.push(`${g.label}: enter the number of employees.`);
    });
    if (!groups.length) errs.push("Enter at least one group of employees.");
    const input = {
      taxYear,
      frequency: v.frequency as Frequency,
      groups,
      employerPension: (p.pension.value ?? 0) > 0 ? { percent: p.pension.value!, basis: v.basis as "all" | "qualifying" } : undefined,
      class1ABenefits: p.benefits.value ?? 0,
      employmentAllowance: v.ea === "yes",
      levy: { payBill: p.payBill.value, allowance: p.levyAllowance.value },
    };
    errs.push(...validateEmployerCost(input));
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: employerCost(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  return (
    <div className={calc.layout}>
      <form className={`card card-pad ${calc.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Employer cost inputs">
        <FormHead
          title="Employer cost and NIC"
          intro="Employer Class 1 NIC by category letter (including the 0% band for under-21s, apprentices under 25 and veterans), Employment Allowance, Class 1A on benefits, Apprenticeship Levy and employer pension."
          example="Design agency (NIC categories lesson): five category A staff on £22,000 each → employer NIC £12,750, less Employment Allowance £10,500 = £2,250."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="NIC earnings period"
          value={v.frequency}
          onChange={f.set("frequency")}
          options={[
            { value: "annual", label: "Annual (textbook answers, directors)" },
            { value: "monthly", label: "Monthly payroll" },
            { value: "weekly", label: "Weekly payroll" },
          ]}
          help="Monthly and weekly use HMRC's rounded period thresholds, so the year can differ from the annual figure by a few pounds."
        />
        {ROWS.map((i) => (
          <fieldset key={i} className={styles.group}>
            <legend>Group {i + 1}{i > 0 ? " (optional)" : ""}</legend>
            <div className={styles.row3}>
              <NumberField label="Employees" value={v[`c${i}` as Key]} onChange={f.set(`c${i}` as Key)} error={rows[i].count.error} />
              <MoneyField label="Annual pay each" value={v[`p${i}` as Key]} onChange={f.set(`p${i}` as Key)} error={rows[i].pay.error} />
              <SelectField label="Category" value={v[`k${i}` as Key]} onChange={f.set(`k${i}` as Key)} options={NIC_CATEGORIES} />
            </div>
          </fieldset>
        ))}
        <SelectField
          label="Claim Employment Allowance?"
          value={v.ea}
          onChange={f.set("ea")}
          options={[
            { value: "yes", label: "Yes, the employer is eligible" },
            { value: "no", label: "No" },
          ]}
          help={
            <>
              Up to {gbp(rate(taxYear, "nic.employment-allowance")?.amount ?? 0)} off employer Class 1 NIC. Not for a company whose only employee above the secondary threshold is a sole director, or mainly public-sector work; one claim per connected group.{" "}
              <GovLink href="https://www.gov.uk/claim-employment-allowance/eligibility">GOV.UK: eligibility</GovLink>
            </>
          }
        />
        <details className={styles.more}>
          <summary>More inputs: pension, benefits, Apprenticeship Levy</summary>
          <div className={styles.moreBody}>
            <div className="grid-2">
              <NumberField label="Employer pension" value={v.pension} onChange={f.set("pension")} error={p.pension.error} suffix="%" />
              <SelectField
                label="Of"
                value={v.basis}
                onChange={f.set("basis")}
                options={[
                  { value: "qualifying", label: "Qualifying earnings" },
                  { value: "all", label: "All pay" },
                ]}
                help={<GovLink href={src("emp.ae-qualifying-earnings-lower")}>TPR: earnings thresholds</GovLink>}
              />
            </div>
            <MoneyField
              label="Benefits in kind for the year (all employees)"
              value={v.benefits}
              onChange={f.set("benefits")}
              error={p.benefits.error}
              help={<>Total cash equivalent on P11Ds or payrolled. Class 1A NIC is due on this. <GovLink href={src("emp.class1a-rate")}>GOV.UK</GovLink></>}
            />
            <MoneyField
              label="Annual pay bill for the levy (optional)"
              value={v.payBill}
              onChange={f.set("payBill")}
              error={p.payBill.error}
              placeholder="Total of the groups above"
              help={<>Use the whole pay bill if there are other employees or connected companies. <GovLink href="https://www.gov.uk/guidance/pay-apprenticeship-levy">GOV.UK: Apprenticeship Levy</GovLink></>}
            />
            <MoneyField
              label="Levy allowance this employer uses (optional)"
              value={v.levyAllowance}
              onChange={f.set("levyAllowance")}
              error={p.levyAllowance.error}
              placeholder={`Full ${gbp(rate(taxYear, "emp.apprenticeship-levy-allowance")?.amount ?? 0)}`}
              help="Connected companies share one allowance between them."
            />
          </div>
        </details>
      </form>
      <ResultPanel
        title="Employer cost and NIC"
        headlineLabel="Total cost of employment for the year"
        result={result}
        errors={errors}
        inputsSummary={[
          `NIC earnings period: ${v.frequency}`,
          ...ROWS.filter((i) => v[`c${i}` as Key]).map((i) => `Group ${i + 1}: ${v[`c${i}` as Key]} × ${v[`p${i}` as Key] || "0"}, category ${v[`k${i}` as Key]}`),
          `Employment Allowance: ${v.ea}`,
          ...(v.pension ? [`Employer pension: ${v.pension}% of ${v.basis === "all" ? "all pay" : "qualifying earnings"}`] : []),
          ...(v.benefits ? [`Benefits in kind: ${v.benefits}`] : []),
          ...(v.payBill ? [`Levy pay bill: ${v.payBill}`] : []),
        ]}
      />
    </div>
  );
}
