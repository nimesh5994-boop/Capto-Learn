"use client";

import { gbp } from "@/lib/calc/common";
import {
  personalIncomeTax,
  validatePersonalTax,
  pensionToRemoveHicbc,
  pensionToRestoreAllowance,
  saPayments,
  type AllowanceChoice,
  type MarriageAllowanceRole,
  type PersonalTaxInput,
  type PersonalTaxResult,
  type Region,
} from "@/lib/calc/personal";
import { formatMoneyInput } from "@/lib/calc/parse";
import { FormHead, GovLink, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import styles from "../calc.module.css";
import { ALLOWANCE_OPTIONS, FiguresCard, Money, MoreInputs, PaymentsCard, RegionField, SubHead, parseAll, srcFor } from "./shared";

const MONEY = [
  "employment", "netPay", "paye", "tradeProfit", "tradeTurnover", "tradeExpenses", "tradeCA", "rent", "propExpenses", "finance",
  "otherNS", "savings", "dividends", "reliefs", "giftAid", "ras", "childBenefit", "otherTax", "poasPaid",
] as const;
type MoneyKey = (typeof MONEY)[number];

const LABELS: Record<MoneyKey, string> = {
  employment: "Employment income", netPay: "Net pay pension contributions", paye: "PAYE deducted", tradeProfit: "Self-employment profit",
  tradeTurnover: "Trading turnover", tradeExpenses: "Trading expenses", tradeCA: "Capital allowances", rent: "Rental income",
  propExpenses: "Property expenses", finance: "Residential finance costs", otherNS: "Other non-savings income", savings: "Savings interest",
  dividends: "Dividends", reliefs: "Reliefs", giftAid: "Gift Aid paid (net)", ras: "Relief-at-source pension (net)",
  childBenefit: "Child Benefit received", otherTax: "Other tax deducted", poasPaid: "Payments on account made",
};

const BLANK: Record<MoneyKey, string> & { region: string; tradeMode: string; tradeAllowance: string; propAllowance: string; blind: string; marriage: string } = {
  region: "rUK", tradeMode: "profit", tradeAllowance: "best", propAllowance: "best", blind: "no", marriage: "none",
  employment: "", netPay: "", paye: "", tradeProfit: "", tradeTurnover: "", tradeExpenses: "", tradeCA: "", rent: "", propExpenses: "", finance: "",
  otherNS: "", savings: "", dividends: "", reliefs: "", giftAid: "", ras: "", childBenefit: "", otherTax: "", poasPaid: "",
};
// Hannah (marriage allowance, Gift Aid and pension relief lesson): salary £64,000, Gift Aid £1,600, RAS pension £8,000 → £10,632.
const EXAMPLE = { ...BLANK, employment: "64,000", giftAid: "1,600", ras: "8,000" };

export function PersonalIncomeTaxCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const set = f.set as (k: string) => (x: string) => void;
  const { p, anyError, num } = parseAll(v, MONEY);
  const src = (id: string) => srcFor(taxYear, id);

  const hasTrade = v.tradeMode === "profit" ? num("tradeProfit") > 0 : num("tradeTurnover") > 0 || num("tradeExpenses") > 0;
  const hasProperty = num("rent") > 0 || num("propExpenses") > 0 || num("finance") > 0;
  const input: PersonalTaxInput = {
    taxYear,
    region: v.region as Region,
    employment: num("employment"),
    netPayPension: num("netPay"),
    trading: hasTrade
      ? v.tradeMode === "profit"
        ? { mode: "profit", turnover: num("tradeProfit"), expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 }
        : { mode: "accounts", turnover: num("tradeTurnover"), expenses: num("tradeExpenses"), capitalAllowances: num("tradeCA"), allowance: v.tradeAllowance as AllowanceChoice, lossesBroughtForward: 0 }
      : undefined,
    property: hasProperty
      ? { rent: num("rent"), expenses: num("propExpenses"), financeCosts: num("finance"), financeCostsBroughtForward: 0, lossesBroughtForward: 0, allowance: v.propAllowance as AllowanceChoice }
      : undefined,
    otherNonSavings: num("otherNS"),
    savings: num("savings"),
    dividends: num("dividends"),
    reliefs: num("reliefs"),
    giftAidNet: num("giftAid"),
    rasPensionNet: num("ras"),
    blind: v.blind === "yes",
    marriage: v.marriage as MarriageAllowanceRole,
    childBenefit: num("childBenefit"),
    paye: num("paye"),
    otherTaxDeducted: num("otherTax"),
  };

  const { result, errors } = ((): { result: PersonalTaxResult | null; errors: string[] } => {
    if (anyError) return { result: null, errors: ["Fix the highlighted fields."] };
    const errs = validatePersonalTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: personalIncomeTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const pa = result ? pensionToRestoreAllowance(input) : null;
  const hb = result && num("childBenefit") > 0 ? pensionToRemoveHicbc(input) : null;
  const payments = result ? saPayments({ taxYear, incomeTax: result.liability, taxDeductedAtSource: result.taxDeducted, poasPaid: num("poasPaid") }) : null;
  const addPension = (net: number) => set("ras")(formatMoneyInput(String(Math.round((num("ras") + net) * 100) / 100)));

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Income tax inputs">
        <FormHead
          title="Income tax"
          intro="The full personal tax computation: income by type, reliefs, adjusted net income, the allowance taper, Scottish or UK bands, Gift Aid and pension band extension, marriage and blind person's allowances, tax reducers, the High Income Child Benefit Charge, tax deducted and the Self Assessment payments."
          example="Hannah (marriage allowance, Gift Aid and pension relief lesson): salary £64,000, Gift Aid £1,600, pension £8,000 net → £10,632 in 2026/27."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <RegionField value={v.region} onChange={set("region")} taxYear={taxYear} />
        <Money k="employment" label="Employment income" values={v} set={set} errors={p} help={<>Salary, bonus and taxable benefits for the year (P60 / P11D), before any net pay pension deduction.</>} />
        <Money k="paye" label="PAYE tax deducted" values={v} set={set} errors={p} help="From the P60 (and P45s for earlier jobs in the year)." />
        {v.tradeMode === "profit" && (
          <Money
            k="tradeProfit"
            label="Self-employment profit"
            values={v}
            set={set}
            errors={p}
            help="Taxable trading profit after adjustments and capital allowances. For Class 4 NIC use the self-employed calculator; for turnover and the trading allowance see More inputs."
          />
        )}
        <Money k="savings" label="Savings interest" values={v} set={set} errors={p} help={<>Interest outside ISAs. <GovLink href={src("it.psa-basic")}>GOV.UK: tax on savings interest</GovLink></>} />
        <Money k="dividends" label="Dividends" values={v} set={set} errors={p} help={<>Dividends outside ISAs. <GovLink href={src("it.dividend-allowance")}>GOV.UK: tax on dividends</GovLink></>} />
        <Money k="ras" label="Personal pension contributions paid (net, relief at source)" values={v} set={set} errors={p} help={<>What the client actually paid; the provider adds basic rate relief. Extends the bands and reduces adjusted net income. <GovLink href="https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief">GOV.UK: pension tax relief</GovLink></>} />
        <Money k="giftAid" label="Gift Aid donations paid (net)" values={v} set={set} errors={p} help={<>The amount given; it&apos;s grossed up at the basic rate. <GovLink href="https://www.gov.uk/donating-to-charity/gift-aid">GOV.UK: Gift Aid</GovLink></>} />
        <Money k="childBenefit" label="Child Benefit received in the household" values={v} set={set} errors={p} help={<>Enter only if this person has the higher adjusted net income of the couple. <GovLink href={src("it.hicbc-threshold")}>GOV.UK: Child Benefit tax charge</GovLink></>} />

        <MoreInputs title="More inputs: pensions, property, other income, allowances">
          <Money k="netPay" label="Pension contributions under net pay" values={v} set={set} errors={p} help="Deducted from pay before tax (most workplace schemes). Leave blank if the employment figure is already after them." />
          <Money k="otherNS" label="Other non-savings income" values={v} set={set} errors={p} help="State and private pensions, taxable benefits, other taxable income." />
          <SubHead>Trading income</SubHead>
          <SelectField
            label="How to enter trading income"
            value={v.tradeMode}
            onChange={set("tradeMode")}
            options={[
              { value: "profit", label: "Taxable profit (entered above)" },
              { value: "accounts", label: "Turnover and expenses (with the trading allowance option)" },
            ]}
          />
          {v.tradeMode === "accounts" && (
            <>
              <Money k="tradeTurnover" label="Trading income (turnover)" values={v} set={set} errors={p} />
              <Money k="tradeExpenses" label="Allowable trading expenses" values={v} set={set} errors={p} />
              <Money k="tradeCA" label="Capital allowances" values={v} set={set} errors={p} />
              <SelectField label="Expenses or trading allowance" value={v.tradeAllowance} onChange={set("tradeAllowance")} options={ALLOWANCE_OPTIONS} help={<>The £1,000 trading allowance replaces expenses and capital allowances; not for partnership income. <GovLink href={src("it.trading-allowance")}>GOV.UK: trading and property allowances</GovLink></>} />
            </>
          )}
          <SubHead>Property income</SubHead>
          <Money k="rent" label="Rental income" values={v} set={set} errors={p} help="The client's share of rents received. Use the property calculator for losses and amounts brought forward." />
          <Money k="propExpenses" label="Allowable property expenses (excluding finance costs)" values={v} set={set} errors={p} />
          <Money k="finance" label="Residential finance costs (mortgage interest)" values={v} set={set} errors={p} help="Not deducted: given as a 20% tax reduction." />
          <SelectField label="Expenses or property allowance" value={v.propAllowance} onChange={set("propAllowance")} options={ALLOWANCE_OPTIONS} help="Using the allowance means no finance cost reduction." />
          <SubHead>Reliefs and allowances</SubHead>
          <Money k="reliefs" label="Reliefs deducted from total income" values={v} set={set} errors={p} help="E.g. trade loss relief against general income, qualifying loan interest." />
          <SelectField
            label="Marriage allowance"
            value={v.marriage}
            onChange={set("marriage")}
            options={[
              { value: "none", label: "Not claimed" },
              { value: "transferor", label: "This person transfers £1,260 to their spouse" },
              { value: "recipient", label: "This person receives £1,260 from their spouse" },
            ]}
            help={<>The recipient mustn&apos;t pay tax above the basic rate (intermediate rate in Scotland). <GovLink href={src("it.marriage-allowance")}>GOV.UK: Marriage Allowance</GovLink></>}
          />
          <SelectField label="Blind person's allowance" value={v.blind} onChange={set("blind")} options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes: registered blind or severely sight impaired" }]} help={<GovLink href={src("it.blind-persons-allowance")}>GOV.UK: Blind Person&apos;s Allowance</GovLink>} />
          <SubHead>Tax paid</SubHead>
          <Money k="otherTax" label="Other tax deducted at source" values={v} set={set} errors={p} help="E.g. tax taken off interest or a purchased life annuity." />
          <Money k="poasPaid" label="Payments on account already made for this year" values={v} set={set} errors={p} help="Paid on 31 January in the year and 31 July after it." />
        </MoreInputs>
      </form>

      <div className="stack" style={{ gap: 16, minWidth: 0 }}>
        <ResultPanel
          title="Income tax"
          headlineLabel="Income tax liability"
          result={result}
          errors={errors}
          effectiveRate={result?.effectiveRate}
          effectiveRateLabel="Effective rate on total income"
          inputsSummary={[
            `Region: ${v.region === "scotland" ? "Scotland" : "England, Wales or Northern Ireland"}`,
            ...MONEY.filter((k) => v[k]).map((k) => `${LABELS[k]}: ${v[k]}`),
            `Marriage allowance: ${v.marriage}`,
            `Blind person's allowance: ${v.blind}`,
          ]}
        />
        {result && (
          <FiguresCard
            title="Key figures"
            rows={[
              ["Net income", gbp(result.netIncome)],
              ["Adjusted net income", gbp(result.adjustedNetIncome)],
              ["Personal allowance", gbp(result.personalAllowance)],
              ["Taxable income", gbp(result.taxableIncome)],
              ["Tax deducted at source", gbp(result.taxDeducted)],
              [result.taxPayable >= 0 ? "Still to pay" : "Repayable", gbp(Math.abs(result.taxPayable))],
            ]}
          />
        )}
        {result && pa && (
          <FiguresCard
            title="Targets: pension contribution needed"
            rows={[
              ["Extra net contribution to restore the full personal allowance", pa.alreadyMet ? "Not needed" : pa.net === null ? "Not reachable" : `${gbp(pa.net)} (gross ${gbp(pa.gross ?? 0)})`],
              ...(pa.net && pa.taxSaved !== null ? ([["Tax saved through the return", gbp(pa.taxSaved)]] as [string, string][]) : []),
              ...(hb
                ? ([
                    ["Extra net contribution to remove the Child Benefit charge", hb.alreadyMet ? "Not needed" : hb.net === null ? "Not reachable" : `${gbp(hb.net)} (gross ${gbp(hb.gross ?? 0)})`],
                    ...(hb.netToThreshold ? ([["…to bring adjusted net income to the threshold exactly", `${gbp(hb.netToThreshold)} (gross ${gbp(hb.grossToThreshold ?? 0)})`]] as [string, string][]) : []),
                    ...(hb.net && hb.taxSaved !== null ? ([["Tax and charge saved", gbp(hb.taxSaved)]] as [string, string][]) : []),
                  ] as [string, string][])
                : []),
            ]}
          >
            <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
              {!!pa.net && (
                <button type="button" className="btn btn-sm" onClick={() => addPension(pa.net!)}>
                  Add {gbp(pa.net)} to the pension input
                </button>
              )}
              {hb && !!hb.net && (
                <button type="button" className="btn btn-sm" onClick={() => addPension(hb.net!)}>
                  Add {gbp(hb.net)} to the pension input
                </button>
              )}
            </div>
            {[...pa.warnings, ...(hb?.warnings ?? [])].map((w) => (
              <p key={w} className="small" style={{ margin: 0, color: "var(--danger)" }}>
                {w}
              </p>
            ))}
            <p className="small faint" style={{ margin: 0 }}>
              Solved exactly against this computation, as an extra relief-at-source contribution on top of any already entered.
            </p>
            {hb && <p className="small faint" style={{ margin: 0 }}>
              The Child Benefit charge is already nil a little above the threshold, because the percentage only counts complete steps and is rounded down (ITEPA 2003 s681C(3)).
            </p>}
          </FiguresCard>
        )}
        {payments && <PaymentsCard payments={payments} taxYear={taxYear} />}
      </div>
    </div>
  );
}
