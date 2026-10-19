"use client";

import { rate } from "@/content/rates";
import { capitalGainsTax, validateCapitalGainsTax, type CapitalGainsTaxResult } from "@/lib/calc/capitalGainsTax";
import { parseMoney } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField } from "./Fields";
import { ResultPanel } from "./ResultPanel";
import { useFields } from "./useFields";
import styles from "./calc.module.css";

const EXAMPLE = { gains: "50,000", badr: "0", income: "17,430", losses: "0", badrUsed: "0" };
const BLANK = { gains: "", badr: "", income: "", losses: "", badrUsed: "" };

export function CapitalGainsCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = {
    gains: parseMoney(v.gains),
    badr: parseMoney(v.badr),
    income: parseMoney(v.income),
    losses: parseMoney(v.losses),
    badrUsed: parseMoney(v.badrUsed),
  };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/capital-gains-tax";
  const badrLimit = rate(taxYear, "cgt.badr-lifetime-limit")?.value;

  const { result, errors } = ((): { result: CapitalGainsTaxResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      gains: p.gains.value ?? 0,
      badrGains: p.badr.value ?? 0,
      otherTaxableIncome: p.income.value ?? 0,
      lossesBroughtForward: p.losses.value ?? 0,
      badrLifetimeUsed: p.badrUsed.value ?? 0,
    };
    const errs = validateCapitalGainsTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: capitalGainsTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const badrOverGains = (p.badr.value ?? 0) > (p.gains.value ?? 0);

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Capital gains tax inputs">
        <FormHead
          title="Capital gains tax"
          intro="An individual's CGT for the year: losses brought forward, the annual exempt amount, Business Asset Disposal Relief gains using the basic rate band first, then other gains at the basic and higher CGT rates."
          example="Nadia Rahman (CGT lesson): gain £50,000, taxable income £17,430 → £10,063.80."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <MoneyField
          label="Total chargeable gains for the year"
          value={v.gains}
          onChange={f.set("gains")}
          error={p.gains.error}
          help={
            <>
              All gains less this year&apos;s losses, including any BADR gains. Work out each gain first (proceeds less costs).{" "}
              <GovLink href={src("cgt.annual-exempt-amount")}>GOV.UK: CGT rates and allowances</GovLink>
            </>
          }
        />
        <MoneyField
          label="Of which: gains qualifying for Business Asset Disposal Relief"
          value={v.badr}
          onChange={f.set("badr")}
          error={p.badr.error ?? (badrOverGains ? "Can't be more than total gains." : undefined)}
          help={
            <>
              Only gains where BADR is claimed and the conditions are met (shareholding, officer or employee, and holding period tests).{" "}
              <GovLink href={src("cgt.badr-rate")}>GOV.UK: BADR</GovLink>
            </>
          }
        />
        <MoneyField
          label="BADR lifetime limit already used"
          value={v.badrUsed}
          onChange={f.set("badrUsed")}
          error={p.badrUsed.error}
          help={`Earlier BADR (or Entrepreneurs' Relief) claims count towards the ${badrLimit ?? ""} lifetime limit. Gains above it are taxed at normal rates.`}
        />
        <MoneyField
          label="Taxable income (after the personal allowance)"
          value={v.income}
          onChange={f.set("income")}
          error={p.income.error}
          help="Total taxable income for the year after deducting the personal allowance. It decides how much of the basic rate band is left for gains. Use the income tax calculator if needed."
        />
        <MoneyField
          label="Capital losses brought forward"
          value={v.losses}
          onChange={f.set("losses")}
          error={p.losses.error}
          help="Losses from earlier years. They're only used to bring gains down to the annual exempt amount; the rest carries forward."
        />
      </form>
      <ResultPanel
        title="Capital gains tax"
        headlineLabel="Capital gains tax payable"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on total gains"
        inputsSummary={[
          `Total gains: ${v.gains || "0"}`,
          `BADR gains: ${v.badr || "0"}`,
          `BADR limit already used: ${v.badrUsed || "0"}`,
          `Taxable income: ${v.income || "0"}`,
          `Losses brought forward: ${v.losses || "0"}`,
        ]}
      />
    </div>
  );
}
