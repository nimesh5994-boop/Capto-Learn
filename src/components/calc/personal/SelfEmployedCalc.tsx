"use client";

import { gbp } from "@/lib/calc/common";
import { parseWhole } from "@/lib/calc/parse";
import { selfEmployedTax, validateSelfEmployed, type AllowanceChoice, type Region, type SelfEmployedInput, type SelfEmployedResult } from "@/lib/calc/personal";
import { FormHead, GovLink, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import styles from "../calc.module.css";
import { ALLOWANCE_OPTIONS, FiguresCard, Money, MoreInputs, PaymentsCard, RegionField, SubHead, parseAll, srcFor } from "./shared";

const MONEY = [
  "profit", "turnover", "expenses", "ca", "lossesBf", "employment", "paye", "otherNS", "savings", "dividends", "reliefs", "ras", "giftAid", "childBenefit", "otherTax", "poasPaid",
] as const;
type MoneyKey = (typeof MONEY)[number];

const LABELS: Record<MoneyKey, string> = {
  profit: "Taxable trading profit", turnover: "Turnover", expenses: "Allowable expenses", ca: "Capital allowances", lossesBf: "Trading losses brought forward",
  employment: "Employment income", paye: "PAYE deducted", otherNS: "Other non-savings income", savings: "Savings interest", dividends: "Dividends",
  reliefs: "Reliefs (loss claims)", ras: "Relief-at-source pension (net)", giftAid: "Gift Aid paid (net)", childBenefit: "Child Benefit received",
  otherTax: "CIS and other tax deducted", poasPaid: "Payments on account made",
};

const BLANK: Record<MoneyKey, string> & { region: string; mode: string; allowance: string; spa: string; class2Weeks: string } = {
  region: "rUK", mode: "accounts", allowance: "best", spa: "no", class2Weeks: "",
  profit: "", turnover: "", expenses: "", ca: "", lossesBf: "", employment: "", paye: "", otherNS: "", savings: "", dividends: "", reliefs: "", ras: "", giftAid: "", childBenefit: "", otherTax: "", poasPaid: "",
};
// Arjun (Class 2 and Class 4 NIC lesson): electrician aged 45, profits £58,300 → Class 4 £2,422.60.
const EXAMPLE = { ...BLANK, mode: "profit", profit: "58,300" };

export function SelfEmployedCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const set = f.set as (k: string) => (x: string) => void;
  const { p, anyError, num } = parseAll(v, MONEY);
  const weeks = parseWhole(v.class2Weeks);
  const src = (id: string) => srcFor(taxYear, id, "https://www.gov.uk/self-employed-national-insurance-rates");

  const input: SelfEmployedInput = {
    taxYear,
    region: v.region as Region,
    trading:
      v.mode === "profit"
        ? { mode: "profit", turnover: num("profit"), expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: num("lossesBf") }
        : { mode: "accounts", turnover: num("turnover"), expenses: num("expenses"), capitalAllowances: num("ca"), allowance: v.allowance as AllowanceChoice, lossesBroughtForward: num("lossesBf") },
    employment: num("employment"),
    paye: num("paye"),
    otherNonSavings: num("otherNS"),
    savings: num("savings"),
    dividends: num("dividends"),
    reliefs: num("reliefs"),
    rasPensionNet: num("ras"),
    giftAidNet: num("giftAid"),
    childBenefit: num("childBenefit"),
    otherTaxDeducted: num("otherTax"),
    poasPaid: num("poasPaid"),
    overStatePensionAge: v.spa === "yes",
    voluntaryClass2Weeks: weeks.value ?? 0,
  };

  const { result, errors } = ((): { result: SelfEmployedResult | null; errors: string[] } => {
    if (anyError || weeks.error) return { result: null, errors: ["Fix the highlighted fields."] };
    const errs = validateSelfEmployed(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: selfEmployedTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Self-employed tax inputs">
        <FormHead
          title="Self-employed tax and NIC"
          intro="Trading profit (from accounts, an adjusted profit or the trading allowance), income tax with any other income, Class 4 NIC, the Class 2 position, and the Self Assessment balancing payment and payments on account."
          example="Arjun (Class 2 and Class 4 NIC lesson): profits £58,300 in 2026/27 → Class 4 £2,422.60, Class 2 treated as paid."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <RegionField value={v.region} onChange={set("region")} taxYear={taxYear} />
        <SelectField
          label="How to enter the profit"
          value={v.mode}
          onChange={set("mode")}
          options={[
            { value: "accounts", label: "Turnover less expenses (or trading allowance)" },
            { value: "profit", label: "Adjusted taxable profit already worked out" },
          ]}
          help="Profits are for the tax year (6 April to 5 April). Apportion other year ends first."
        />
        {v.mode === "profit" ? (
          <Money k="profit" label="Taxable trading profit" values={v} set={set} errors={p} help="After adding back disallowable items and deducting capital allowances." />
        ) : (
          <>
            <Money k="turnover" label="Turnover (trading income)" values={v} set={set} errors={p} />
            <Money k="expenses" label="Allowable expenses" values={v} set={set} errors={p} help="Wholly and exclusively for the trade; exclude depreciation, entertaining and private use." />
            <Money k="ca" label="Capital allowances" values={v} set={set} errors={p} help="AIA and writing down allowances (business-use share)." />
            <SelectField
              label="Expenses or trading allowance"
              value={v.allowance}
              onChange={set("allowance")}
              options={ALLOWANCE_OPTIONS}
              help={<>The £1,000 trading allowance replaces expenses and capital allowances; not for partnership income. <GovLink href={srcFor(taxYear, "it.trading-allowance")}>GOV.UK: trading allowance</GovLink></>}
            />
          </>
        )}
        <Money k="lossesBf" label="Trading losses brought forward" values={v} set={set} errors={p} help="Losses of this trade from earlier years (ITA 2007 s83)." />
        <Money k="employment" label="Employment income" values={v} set={set} errors={p} help="Any job alongside the business." />
        <Money k="paye" label="PAYE tax deducted" values={v} set={set} errors={p} />

        <MoreInputs title="More inputs: other income, reliefs, NIC and payments">
          <Money k="otherNS" label="Other non-savings income" values={v} set={set} errors={p} help="Pensions, property profit, other taxable income." />
          <Money k="savings" label="Savings interest" values={v} set={set} errors={p} />
          <Money k="dividends" label="Dividends" values={v} set={set} errors={p} />
          <Money k="reliefs" label="Reliefs deducted from total income" values={v} set={set} errors={p} help="E.g. a trade loss claimed against general income (s64)." />
          <Money k="ras" label="Personal pension contributions paid (net)" values={v} set={set} errors={p} help="Relief at source: extends the bands. Doesn't reduce Class 4." />
          <Money k="giftAid" label="Gift Aid donations paid (net)" values={v} set={set} errors={p} />
          <Money k="childBenefit" label="Child Benefit received in the household" values={v} set={set} errors={p} help="Only if this person has the higher adjusted net income." />
          <SubHead>National Insurance</SubHead>
          <SelectField
            label="Over State Pension age at the start of the tax year?"
            value={v.spa}
            onChange={set("spa")}
            options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes: no Class 4" }]}
            help={<>Reaching State Pension age during the year doesn&apos;t stop Class 4 until the next year. <GovLink href="https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim24510">HMRC NIM24510</GovLink></>}
          />
          <NumberField
            label="Weeks of voluntary Class 2 to pay"
            value={v.class2Weeks}
            onChange={set("class2Weeks")}
            error={weeks.error}
            suffix="weeks"
            help={<>Only relevant if profits are below the small profits threshold and there are no NI credits. <GovLink href={src("nic.class2-weekly")}>GOV.UK: self-employed NI rates</GovLink></>}
          />
          <SubHead>Tax paid</SubHead>
          <Money k="otherTax" label="CIS deductions and other tax deducted" values={v} set={set} errors={p} />
          <Money k="poasPaid" label="Payments on account already made for this year" values={v} set={set} errors={p} />
        </MoreInputs>
      </form>

      <div className="stack" style={{ gap: 16, minWidth: 0 }}>
        <ResultPanel
          title="Self-employed tax and NIC"
          headlineLabel="Income tax and NIC"
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Effective rate on total income"
          inputsSummary={[
            `Region: ${v.region === "scotland" ? "Scotland" : "England, Wales or Northern Ireland"}`,
            ...MONEY.filter((k) => v[k]).map((k) => `${LABELS[k]}: ${v[k]}`),
            `Over State Pension age: ${v.spa}`,
            ...(v.class2Weeks ? [`Voluntary Class 2 weeks: ${v.class2Weeks}`] : []),
          ]}
        />
        {result && (
          <FiguresCard
            title="Key figures"
            rows={[
              ["Taxable trading profit", gbp(result.tradingProfit)],
              ["Income tax", gbp(result.incomeTax.liability)],
              ["Class 4 NIC", gbp(result.class4.total)],
              ["Class 2", result.class2TreatedAsPaid ? "Treated as paid" : result.class2Voluntary ? gbp(result.class2Voluntary) : "None due"],
              ...(result.incomeTax.tradingLossCarriedForward ? ([["Trading losses carried forward (if not otherwise claimed)", gbp(result.incomeTax.tradingLossCarriedForward)]] as [string, string][]) : []),
            ]}
          />
        )}
        {result && <PaymentsCard payments={result.payments} taxYear={taxYear} />}
      </div>
    </div>
  );
}
