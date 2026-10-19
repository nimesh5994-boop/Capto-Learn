"use client";

import { rate } from "@/content/rates";
import { corporationTax, validateCorporationTax, type CorporationTaxResult } from "@/lib/calc/corporationTax";
import { gbp } from "@/lib/calc/common";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField } from "./Fields";
import { ResultPanel } from "./ResultPanel";
import { useFields } from "./useFields";
import styles from "./calc.module.css";

const MR_GUIDANCE = "https://www.gov.uk/guidance/corporation-tax-marginal-relief";

const EXAMPLE = { profits: "70,000", augmented: "75,000", associates: "1", months: "12" };
const BLANK = { profits: "", augmented: "", associates: "0", months: "12" };

export function CorporationTaxCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = {
    profits: parseMoney(v.profits),
    augmented: parseMoney(v.augmented, true),
    associates: parseWhole(v.associates),
    months: parseWhole(v.months, 12),
  };
  const fieldErrors = Object.values(p).some((x) => x.error);

  // Cheap pure calculation: recompute on every render (live, no submit).
  const { result, errors } = ((): { result: CorporationTaxResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      profits: p.profits.value ?? 0,
      augmentedProfits: p.augmented.value,
      associatedCompanies: p.associates.value ?? 0,
      periodMonths: p.months.value ?? 12,
    };
    const errs = validateCorporationTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: corporationTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const ctSource = rate(taxYear, "ct.main-rate")?.source.url;
  const fy = taxYear.slice(0, 4);

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Corporation tax inputs">
        <FormHead
          title="Corporation tax"
          intro={
            <>
              Small profits rate, main rate and marginal relief for one accounting period in financial year {fy} (from 1 April {fy}).
            </>
          }
          example="Okafor Dental Ltd (CT lesson): profits £70,000, £5,000 dividends received, one associated company → £16,800."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <MoneyField
          label="Taxable total profits"
          value={v.profits}
          onChange={f.set("profits")}
          error={p.profits.error}
          help={<>Trading profits, property income, interest and chargeable gains, less losses, group relief and qualifying donations. Tax is charged on this figure.</>}
        />
        <MoneyField
          label="Augmented profits (optional)"
          value={v.augmented}
          onChange={f.set("augmented")}
          error={p.augmented.error}
          placeholder="Same as taxable total profits"
          help={
            <>
              Taxable total profits plus exempt dividends received from companies outside the company&apos;s 51% group. Leave blank if it received none. Decides which rate band applies.{" "}
              <GovLink href={MR_GUIDANCE}>GOV.UK: Marginal Relief</GovLink>
            </>
          }
        />
        <div className="grid-2">
          <NumberField
            label="Associated companies"
            value={v.associates}
            onChange={f.set("associates")}
            error={p.associates.error}
            help={
              <>
                Other companies under common control at any time in the period, including overseas ones. Ignore dormant companies. The limits are divided by this number plus one.{" "}
                <GovLink href={MR_GUIDANCE}>GOV.UK</GovLink>
              </>
            }
          />
          <NumberField
            label="Accounting period length"
            value={v.months}
            onChange={f.set("months")}
            error={p.months.error}
            suffix="months"
            help="12 for a normal year. A shorter period reduces both limits proportionately."
          />
        </div>
        {ctSource && (
          <p className="small faint">
            Lower limit {gbp(rate(taxYear, "ct.lower-limit")?.amount ?? 0)}, upper limit {gbp(rate(taxYear, "ct.upper-limit")?.amount ?? 0)} for a 12-month period with no associates.{" "}
            <GovLink href={ctSource}>Rates source</GovLink>
          </p>
        )}
      </form>
      <ResultPanel
        title="Corporation tax"
        headlineLabel="Corporation tax payable"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on taxable total profits"
        inputsSummary={[
          `Taxable total profits: ${v.profits || "0"}`,
          `Augmented profits: ${v.augmented || "same as TTP"}`,
          `Associated companies: ${v.associates || "0"}`,
          `Accounting period: ${v.months || "12"} months`,
        ]}
      />
    </div>
  );
}
