"use client";

import { gbp } from "@/lib/calc/common";
import { propertyTax, validatePropertyTax, type AllowanceChoice, type PropertyTaxInput, type PropertyTaxResult, type Region } from "@/lib/calc/personal";
import { FormHead, GovLink, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import styles from "../calc.module.css";
import { ALLOWANCE_OPTIONS, FiguresCard, Money, MoreInputs, RegionField, SubHead, parseAll, srcFor } from "./shared";

const MONEY = [
  "rent", "expenses", "finance", "financeBf", "lossesBf", "employment", "paye", "tradeProfit", "otherNS", "savings", "dividends", "ras", "giftAid", "otherTax",
] as const;
type MoneyKey = (typeof MONEY)[number];

const LABELS: Record<MoneyKey, string> = {
  rent: "Rental income", expenses: "Allowable expenses", finance: "Residential finance costs", financeBf: "Finance costs brought forward",
  lossesBf: "Property losses brought forward", employment: "Employment income", paye: "PAYE deducted", tradeProfit: "Self-employment profit",
  otherNS: "Other non-savings income", savings: "Savings interest", dividends: "Dividends", ras: "Relief-at-source pension (net)",
  giftAid: "Gift Aid paid (net)", otherTax: "Other tax deducted",
};

const BLANK: Record<MoneyKey, string> & { region: string; allowance: string } = {
  region: "rUK", allowance: "best",
  rent: "", expenses: "", finance: "", financeBf: "", lossesBf: "", employment: "", paye: "", tradeProfit: "", otherNS: "", savings: "", dividends: "", ras: "", giftAid: "", otherTax: "",
};
// Gareth (property income lesson): salary £42,000; rent £18,000; expenses £3,600 + £650 replacement furniture; mortgage interest £7,200 → £8,292.
const EXAMPLE = { ...BLANK, rent: "18,000", expenses: "4,250", finance: "7,200", employment: "42,000" };

export function PropertyIncomeCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const set = f.set as (k: string) => (x: string) => void;
  const { p, anyError, num } = parseAll(v, MONEY);
  const govSource = "https://www.gov.uk/guidance/changes-to-tax-relief-for-residential-landlords-how-its-worked-out-including-case-studies";

  const input: PropertyTaxInput = {
    taxYear,
    region: v.region as Region,
    property: {
      rent: num("rent"),
      expenses: num("expenses"),
      financeCosts: num("finance"),
      financeCostsBroughtForward: num("financeBf"),
      lossesBroughtForward: num("lossesBf"),
      allowance: v.allowance as AllowanceChoice,
    },
    employment: num("employment"),
    paye: num("paye"),
    trading: num("tradeProfit") ? { mode: "profit", turnover: num("tradeProfit"), expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 } : undefined,
    otherNonSavings: num("otherNS"),
    savings: num("savings"),
    dividends: num("dividends"),
    rasPensionNet: num("ras"),
    giftAidNet: num("giftAid"),
    otherTaxDeducted: num("otherTax"),
  };

  const { result, errors } = ((): { result: PropertyTaxResult | null; errors: string[] } => {
    if (anyError) return { result: null, errors: ["Fix the highlighted fields."] };
    const errs = validatePropertyTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: propertyTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();
  const it = result?.incomeTax;

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Property income inputs">
        <FormHead
          title="Property income"
          intro="Rental profit (expenses or the property allowance), the residential finance cost restriction as a 20% tax reduction, losses and costs brought forward, and the tax with the client's other income."
          example="Gareth (property income lesson): salary £42,000, rent £18,000, expenses £4,250, mortgage interest £7,200 → £8,292 in 2026/27."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <RegionField value={v.region} onChange={set("region")} taxYear={taxYear} />
        <Money k="rent" label="Rental income" values={v} set={set} errors={p} help="Rents received for the year (cash basis is the default). Enter the client's share for joint property." />
        <Money k="expenses" label="Allowable expenses (excluding finance costs)" values={v} set={set} errors={p} help="Agent fees, insurance, repairs, replacement domestic items, ground rent. Not capital improvements or loan capital." />
        <Money
          k="finance"
          label="Residential finance costs"
          values={v}
          set={set}
          errors={p}
          help={<>Mortgage interest and loan fees. Not deducted: relief is a tax reduction at the basic rate. <GovLink href={govSource}>GOV.UK: how it&apos;s worked out</GovLink></>}
        />
        <SelectField
          label="Expenses or property allowance"
          value={v.allowance}
          onChange={set("allowance")}
          options={ALLOWANCE_OPTIONS}
          help={<>The £1,000 property allowance replaces all expenses and stops the finance cost reduction. <GovLink href={srcFor(taxYear, "it.property-allowance")}>GOV.UK: property allowance</GovLink></>}
        />
        <Money k="employment" label="Employment income" values={v} set={set} errors={p} />
        <Money k="paye" label="PAYE tax deducted" values={v} set={set} errors={p} />

        <MoreInputs title="More inputs: amounts brought forward, other income">
          <SubHead>Brought forward</SubHead>
          <Money k="financeBf" label="Finance costs brought forward" values={v} set={set} errors={p} help="Unrelieved finance costs from earlier years." />
          <Money k="lossesBf" label="Property losses brought forward" values={v} set={set} errors={p} />
          <SubHead>Other income</SubHead>
          <Money k="tradeProfit" label="Self-employment profit" values={v} set={set} errors={p} />
          <Money k="otherNS" label="Other non-savings income" values={v} set={set} errors={p} help="State and private pensions, other taxable income." />
          <Money k="savings" label="Savings interest" values={v} set={set} errors={p} />
          <Money k="dividends" label="Dividends" values={v} set={set} errors={p} />
          <Money k="ras" label="Personal pension contributions paid (net)" values={v} set={set} errors={p} help="Extends the basic rate band. Rental profit isn't relevant earnings for pension relief." />
          <Money k="giftAid" label="Gift Aid donations paid (net)" values={v} set={set} errors={p} />
          <Money k="otherTax" label="Other tax deducted at source" values={v} set={set} errors={p} />
        </MoreInputs>
      </form>

      <div className="stack" style={{ gap: 16, minWidth: 0 }}>
        <ResultPanel
          title="Property income tax"
          headlineLabel="Total income tax liability"
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Effective rate on total income"
          inputsSummary={[
            `Region: ${v.region === "scotland" ? "Scotland" : "England, Wales or Northern Ireland"}`,
            `Expenses or allowance: ${v.allowance}`,
            ...MONEY.filter((k) => v[k]).map((k) => `${LABELS[k]}: ${v[k]}`),
          ]}
        />
        {result && it && (
          <FiguresCard
            title="The letting in figures"
            rows={[
              ["Property profit (before finance costs)", gbp(it.propertyProfit)],
              ["Method", it.propertyAllowanceUsed ? "Property allowance" : "Actual expenses"],
              ["Finance cost tax reduction", gbp(it.financeCostReducer)],
              ["Finance costs carried forward", gbp(it.financeCostsCarriedForward)],
              ["Property losses carried forward", gbp(it.propertyLossCarriedForward)],
              ["Extra income tax because of the letting", gbp(result.taxOnProperty)],
              ...(result.taxIfFinanceCostsDeductible !== null
                ? ([
                    ["Tax if finance costs were fully deductible (comparison only)", gbp(result.taxIfFinanceCostsDeductible)],
                    ["Cost of the finance cost restriction", gbp(result.tax - result.taxIfFinanceCostsDeductible)],
                  ] as [string, string][])
                : []),
              ...(it.taxDeducted ? ([[it.taxPayable >= 0 ? "Still to pay after tax deducted" : "Repayable", gbp(Math.abs(it.taxPayable))]] as [string, string][]) : []),
            ]}
          />
        )}
      </div>
    </div>
  );
}
