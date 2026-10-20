"use client";

import {
  ctLateFiling,
  interestCalc,
  lateSubmissionPoints,
  pointsLatePayment,
  saLateFiling,
  saLatePayment,
  validateInterest,
  validateLpp,
  type LppRegime,
  type PenaltyResult,
} from "@/lib/calc/business/penalties";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import { CheckField, DateField, RowsEditor, parseRows, run, useRows } from "./ui";

type Mode = "sa-filing" | "sa-payment" | "lpp" | "points" | "ct-filing" | "interest";

const LINKS: Record<Mode, string> = {
  "sa-filing": "https://www.gov.uk/self-assessment-tax-returns/penalties",
  "sa-payment": "https://www.gov.uk/self-assessment-tax-returns/penalties",
  lpp: "https://www.gov.uk/guidance/how-late-payment-penalties-work-if-you-pay-vat-late",
  points: "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late",
  "ct-filing": "https://www.gov.uk/government/publications/corporation-tax-penalty-determinations-ct211-notes/corporation-tax-penalty-determinations-ct211-notes",
  interest: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates",
};

const MODES: { value: Mode; label: string }[] = [
  { value: "sa-filing", label: "Self Assessment: late filing" },
  { value: "sa-payment", label: "Self Assessment: late payment" },
  { value: "lpp", label: "VAT or MTD for Income Tax: late payment" },
  { value: "points", label: "VAT or MTD for Income Tax: late submission points" },
  { value: "ct-filing", label: "Corporation tax: late filing" },
  { value: "interest", label: "Late payment interest only" },
];

const EXAMPLES: Record<Mode, { text: string; fields: Partial<Record<string, string>>; payments: { date: string; amount: string }[] }> = {
  "sa-filing": { text: "Hana Ito (penalties lesson): 2025/26 return due 31 January 2027, filed 15 August 2027, £4,000 tax → £1,300.", fields: { deadline: "2027-01-31", filed: "2027-08-15", amount: "4,000" }, payments: [] },
  "sa-payment": { text: "Hana Ito: £4,000 due 31 January 2027, paid 15 August 2027 → penalties £400 plus interest.", fields: { due: "2027-01-31", asAt: "2027-08-15", amount: "4,000", interest: "yes" }, payments: [{ date: "2027-08-15", amount: "4,000" }] },
  lpp: { text: "GOV.UK VAT example: £15,000 paid on day 51 → £900 first penalty + £86.30 second penalty.", fields: { regime: "vat", periodStart: "2026-04-01", due: "2026-08-07", asAt: "2026-09-27", amount: "15,000", interest: "no" }, payments: [{ date: "2026-09-27", amount: "15,000" }] },
  points: { text: "Quarterly VAT filer with 5 late returns while at the threshold of 4 → 2 × £200.", fields: { pointsRegime: "vat-quarterly", late: "5" }, payments: [] },
  "ct-filing": { text: "CT600 lesson: year to 30 June 2025, filing date 30 June 2026, filed 15 February 2027 with £30,000 unpaid → £3,400.", fields: { apEnd: "2025-06-30", deadline: "2026-06-30", filed: "2027-02-15", amount: "30,000", third: "no" }, payments: [] },
  interest: { text: "£10,000 due 31 January 2026, £5,000 paid 2 March 2026, the rest unpaid to 1 April 2026.", fields: { due: "2026-01-31", asAt: "2026-04-01", amount: "10,000" }, payments: [{ date: "2026-03-02", amount: "5,000" }] },
};

const BLANK_FIELDS = { deadline: "", filed: "", amount: "", due: "", asAt: "", interest: "yes", regime: "vat", periodStart: "", first: "no", pointsRegime: "vat-quarterly", late: "0", apEnd: "", third: "no" };

export function PenaltiesCalc({ taxYear, initialMode = "sa-filing" }: { taxYear: string; initialMode?: Mode }) {
  const startEx = EXAMPLES[initialMode];
  const f = useFields<Record<string, string>>({ ...BLANK_FIELDS, mode: initialMode, ...startEx.fields } as Record<string, string>, { ...BLANK_FIELDS, mode: initialMode });
  const pays = useRows(startEx.payments, []);
  const v = f.values;
  const mode = v.mode as Mode;
  const amount = parseMoney(v.amount);
  const late = parseWhole(v.late);
  const P = parseRows(pays.rows);

  const load = () => {
    const ex = EXAMPLES[mode];
    for (const [k, val] of Object.entries({ ...BLANK_FIELDS, ...ex.fields })) f.set(k)(val as string);
    pays.replace(ex.payments);
  };
  const clear = () => {
    for (const [k, val] of Object.entries(BLANK_FIELDS)) f.set(k)(val);
    pays.clear();
  };

  const fieldErrors = !!amount.error || !!late.error || P.error;
  const { result, errors } = run<PenaltyResult>(
    fieldErrors,
    () => {
      if (mode === "lpp") return validateLpp({ taxYear, regime: v.regime as LppRegime, vatPeriodStart: v.periodStart, firstYear: v.first === "yes", amount: amount.value ?? 0, dueDate: v.due, payments: P.rows, asAt: v.asAt, includeInterest: v.interest === "yes" });
      if (mode === "interest" || mode === "sa-payment") return validateInterest({ taxYear, amount: amount.value ?? 0, dueDate: v.due, payments: P.rows, asAt: v.asAt });
      return [];
    },
    () => {
      switch (mode) {
        case "sa-filing":
          return saLateFiling({ taxYear, deadline: v.deadline, filed: v.filed, taxDue: amount.value ?? 0 });
        case "sa-payment":
          return saLatePayment({ taxYear, amount: amount.value ?? 0, dueDate: v.due, payments: P.rows, asAt: v.asAt, includeInterest: v.interest === "yes" });
        case "lpp":
          return pointsLatePayment({ taxYear, regime: v.regime as LppRegime, vatPeriodStart: v.periodStart, firstYear: v.first === "yes", amount: amount.value ?? 0, dueDate: v.due, payments: P.rows, asAt: v.asAt, includeInterest: v.interest === "yes" });
        case "points":
          return lateSubmissionPoints({ taxYear, regime: v.pointsRegime as "vat-annual" | "vat-quarterly" | "vat-monthly" | "mtd", lateSubmissions: late.value ?? 0 });
        case "ct-filing":
          return ctLateFiling({ taxYear, apEnd: v.apEnd, filingDate: v.deadline, filed: v.filed, thirdSuccessive: v.third === "yes", unpaidTax: amount.value ?? 0 });
        default:
          return interestCalc({ taxYear, amount: amount.value ?? 0, dueDate: v.due, payments: P.rows, asAt: v.asAt });
      }
    },
  );

  const paymentFields = (
    <>
      <MoneyField label="Tax due" value={v.amount} onChange={f.set("amount")} error={amount.error} />
      <div className="grid-2">
        <DateField label="Due date" value={v.due} onChange={f.set("due")} />
        <DateField label="Work out to" value={v.asAt} onChange={f.set("asAt")} help="Usually the date of the final payment, or today if still unpaid." />
      </div>
      <RowsEditor legend="Payments made" rows={pays} itemLabel="Payment" help="Leave empty if nothing has been paid." />
    </>
  );

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Penalty inputs">
        <FormHead
          title={mode === "interest" ? "Late payment interest" : "Penalties and interest"}
          intro={
            <>
              Late filing and late payment penalties for Self Assessment, corporation tax and the points-based regime (VAT and MTD for Income Tax), with HMRC late payment interest at the rates in force each day. <GovLink href={LINKS[mode]}>GOV.UK rules</GovLink>
            </>
          }
          example={EXAMPLES[mode].text}
          onExample={load}
          onClear={clear}
        />
        <SelectField label="Penalty" value={mode} onChange={f.set("mode")} options={MODES} />
        {mode === "sa-filing" && (
          <>
            <div className="grid-2">
              <DateField label="Filing deadline" value={v.deadline} onChange={f.set("deadline")} help="31 January for online returns." />
              <DateField label="Date filed (or today)" value={v.filed} onChange={f.set("filed")} />
            </div>
            <MoneyField label="Tax due on the return" value={v.amount} onChange={f.set("amount")} error={amount.error} help="For the 6 and 12 month penalties (5% or £300, whichever is more)." />
          </>
        )}
        {mode === "sa-payment" && (
          <>
            {paymentFields}
            <CheckField label="Add late payment interest" checked={v.interest === "yes"} onChange={(c) => f.set("interest")(c ? "yes" : "no")} />
          </>
        )}
        {mode === "lpp" && (
          <>
            <SelectField
              label="Regime"
              value={v.regime}
              onChange={f.set("regime")}
              options={[
                { value: "vat", label: "VAT" },
                { value: "mtd-2026", label: "MTD for Income Tax, 2026/27" },
                { value: "mtd-2027", label: "MTD for Income Tax, 2027/28" },
              ]}
            />
            {v.regime === "vat" ? (
              <DateField label="VAT period starts" value={v.periodStart} onChange={f.set("periodStart")} help="Periods starting on or after 1 April 2025 use 3%, 3% and 10%; earlier ones 2%, 2% and 4%." />
            ) : (
              <CheckField label="First year in the new penalties" checked={v.first === "yes"} onChange={(c) => f.set("first")(c ? "yes" : "no")} help="No penalty if paid within 30 days (15 days after the first year)." />
            )}
            {paymentFields}
            <CheckField label="Add late payment interest" checked={v.interest === "yes"} onChange={(c) => f.set("interest")(c ? "yes" : "no")} />
          </>
        )}
        {mode === "points" && (
          <>
            <SelectField
              label="Returns"
              value={v.pointsRegime}
              onChange={f.set("pointsRegime")}
              options={[
                { value: "vat-quarterly", label: "VAT — quarterly (threshold 4)" },
                { value: "vat-monthly", label: "VAT — monthly (threshold 5)" },
                { value: "vat-annual", label: "VAT — annual (threshold 2)" },
                { value: "mtd", label: "MTD for Income Tax (threshold 4)" },
              ]}
            />
            <NumberField label="Late submissions with live points" value={v.late} onChange={f.set("late")} error={late.error} help="Count late returns whose points haven't expired or been reset." />
          </>
        )}
        {mode === "ct-filing" && (
          <>
            <DateField label="Accounting period ends" value={v.apEnd} onChange={f.set("apEnd")} />
            <div className="grid-2">
              <DateField label="Filing date" value={v.deadline} onChange={f.set("deadline")} help="Normally 12 months after the end of the period of account. From 1 April 2026 the flat penalties doubled." />
              <DateField label="Date filed (or today)" value={v.filed} onChange={f.set("filed")} />
            </div>
            <MoneyField label="Tax unpaid 18 months after the AP end" value={v.amount} onChange={f.set("amount")} error={amount.error} help="For the 10% / 20% tax-geared penalty (or the amount unpaid at the filing date if later)." />
            <CheckField label="Third successive late return" checked={v.third === "yes"} onChange={(c) => f.set("third")(c ? "yes" : "no")} help="The returns for the two previous periods were also late and penalised." />
          </>
        )}
        {mode === "interest" && paymentFields}
      </form>
      <ResultPanel
        title={MODES.find((m) => m.value === mode)?.label ?? "Penalties"}
        headlineLabel={mode === "interest" ? "Late payment interest" : "Penalties" + (v.interest === "yes" && (mode === "sa-payment" || mode === "lpp") ? " and interest" : "")}
        result={result}
        errors={errors}
        inputsSummary={[
          `Mode: ${mode}`,
          ...Object.entries(v)
            .filter(([k, x]) => k !== "mode" && x)
            .map(([k, x]) => `${k}: ${x}`),
          ...P.rows.map((p, k) => `Payment ${k + 1}: ${p.date} ${p.amount}`),
        ]}
      />
    </div>
  );
}

export function InterestCalc({ taxYear }: { taxYear: string }) {
  return <PenaltiesCalc taxYear={taxYear} initialMode="interest" />;
}
