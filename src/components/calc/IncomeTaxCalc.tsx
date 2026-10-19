"use client";

import { rate } from "@/content/rates";
import { incomeTax, validateIncomeTax, SCOTLAND_NOT_SUPPORTED, type IncomeTaxResult } from "@/lib/calc/incomeTax";
import { parseMoney } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, SelectField } from "./Fields";
import { ResultPanel } from "./ResultPanel";
import { useFields } from "./useFields";
import styles from "./calc.module.css";

const EXAMPLE = { nonSavings: "12,570", savings: "1,800", dividends: "45,000", region: "rUK" };
const BLANK = { nonSavings: "", savings: "", dividends: "", region: "rUK" };

export function IncomeTaxCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = { nonSavings: parseMoney(v.nonSavings), savings: parseMoney(v.savings), dividends: parseMoney(v.dividends) };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/income-tax-rates";

  const { result, errors } = ((): { result: IncomeTaxResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    if (v.region !== "rUK") return { result: null, errors: [SCOTLAND_NOT_SUPPORTED] };
    const input = {
      taxYear,
      nonSavingsIncome: p.nonSavings.value ?? 0,
      savingsIncome: p.savings.value ?? 0,
      dividends: p.dividends.value ?? 0,
      region: "rUK" as const,
    };
    const errs = validateIncomeTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: incomeTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Income tax inputs">
        <FormHead
          title="Income tax"
          intro="Personal allowance (with the taper over the income limit), then non-savings, savings and dividend income through the bands, including the starting rate for savings, personal savings allowance and dividend allowance."
          example="Ravi Shah (savings and dividends lesson): salary £12,570, interest £1,800, dividends £45,000 → £7,058.75 in 2026/27."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="Where the taxpayer lives"
          value={v.region}
          onChange={f.set("region")}
          options={[
            { value: "rUK", label: "England, Wales or Northern Ireland" },
            { value: "scotland", label: "Scotland (not supported yet)" },
          ]}
          help="Scottish taxpayers pay different rates on non-savings income; this version covers the rest of the UK only."
        />
        <MoneyField
          label="Non-savings income"
          value={v.nonSavings}
          onChange={f.set("nonSavings")}
          error={p.nonSavings.error}
          help={
            <>
              Salary, benefits, self-employed and partnership profits, pensions and property profits, after reliefs such as losses.{" "}
              <GovLink href={src("it.personal-allowance")}>GOV.UK: rates and allowances</GovLink>
            </>
          }
        />
        <MoneyField
          label="Savings income"
          value={v.savings}
          onChange={f.set("savings")}
          error={p.savings.error}
          help={
            <>
              Bank and building society interest not in an ISA. Up to the starting rate band and the personal savings allowance is taxed at 0%.{" "}
              <GovLink href={src("it.psa-basic")}>GOV.UK: tax on savings interest</GovLink>
            </>
          }
        />
        <MoneyField
          label="Dividends"
          value={v.dividends}
          onChange={f.set("dividends")}
          error={p.dividends.error}
          help={
            <>
              Dividends received outside an ISA. The dividend allowance is taxed at 0% but still uses up the basic rate band.{" "}
              <GovLink href={src("it.dividend-allowance")}>GOV.UK: dividend rates</GovLink>
            </>
          }
        />
        <p className="small faint">Enter gross annual amounts for the tax year. Gift Aid and personal pension contributions aren&apos;t deducted, so for those clients adjust adjusted net income and the basic rate band yourself.</p>
      </form>
      <ResultPanel
        title="Income tax"
        headlineLabel="Income tax liability"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on total income"
        inputsSummary={[
          "Region: England, Wales or Northern Ireland",
          `Non-savings income: ${v.nonSavings || "0"}`,
          `Savings income: ${v.savings || "0"}`,
          `Dividends: ${v.dividends || "0"}`,
        ]}
      />
    </div>
  );
}
