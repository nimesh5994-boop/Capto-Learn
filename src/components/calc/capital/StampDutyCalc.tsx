"use client";

import { rate } from "@/content/rates";
import { stampDutyLandTax, validateSdlt, type SdltResult } from "@/lib/calc/capital/sdlt";
import { parseMoney } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import { CheckField, MoreInputs } from "./ui";
import styles from "../calc.module.css";

const CALCULATOR = "https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax/";

// GOV.UK residential rates page worked example: £295,000 → £4,750.
const EXAMPLE = { type: "residential", price: "295,000", purchaser: "individual", ftb: "", additional: "", nonRes: "", corpRelief: "", npv: "" };
const BLANK = { type: "residential", price: "", purchaser: "individual", ftb: "", additional: "", nonRes: "", corpRelief: "", npv: "" };

export function StampDutyCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = { price: parseMoney(v.price), npv: parseMoney(v.npv) };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/stamp-duty-land-tax";
  const res = v.type === "residential";
  const company = v.purchaser === "company";
  const tick = (key: keyof typeof v) => (c: boolean) => f.set(key)(c ? "yes" : "");

  const { result, errors } = ((): { result: SdltResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      propertyType: v.type as "residential" | "non-residential",
      price: p.price.value ?? 0,
      purchaser: v.purchaser as "individual" | "company",
      firstTimeBuyer: res && !company && v.ftb === "yes",
      additionalDwelling: res && !company && v.additional === "yes",
      nonResident: res && v.nonRes === "yes",
      corporateReliefClaimed: res && company && v.corpRelief === "yes",
      leaseRentNpv: p.npv.value ?? 0,
    };
    const errs = validateSdlt(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: stampDutyLandTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Stamp Duty Land Tax inputs">
        <FormHead
          title="Stamp Duty Land Tax"
          intro="SDLT on a purchase in England or Northern Ireland: residential (standard rates, first-time buyers' relief, higher rates for additional dwellings, the non-UK resident surcharge, the 17% company rate) and non-residential or mixed use, plus the rent on a new lease."
          example="GOV.UK: a home bought for £295,000 by someone who'll own only that property → £4,750."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="Type of property"
          value={v.type}
          onChange={f.set("type")}
          options={[
            { value: "residential", label: "Residential" },
            { value: "non-residential", label: "Non-residential or mixed use" },
          ]}
          help={
            <>
              Mixed use (e.g. a shop with a flat) uses the non-residential rates.{" "}
              <GovLink href={src(res ? "sdlt.res-band2-rate" : "sdlt.nonres-band2-rate")}>GOV.UK: SDLT rates</GovLink>
            </>
          }
        />
        <MoneyField label="Price (or lease premium)" value={v.price} onChange={f.set("price")} error={p.price.error} help="The chargeable consideration paid for the property." />
        {res && (
          <>
            <SelectField
              label="Buyer"
              value={v.purchaser}
              onChange={f.set("purchaser")}
              options={[
                { value: "individual", label: "Individual(s)" },
                { value: "company", label: "Company or other non-natural person" },
              ]}
            />
            {!company && (
              <>
                <CheckField
                  label="First-time buyer, buying to live in"
                  checked={v.ftb === "yes"}
                  onChange={tick("ftb")}
                  help={`Check the first-time buyer conditions on GOV.UK. No relief at all above ${rate(taxYear, "sdlt.ftb-max-price")?.value}.`}
                />
                <CheckField
                  label="Will own more than one home after buying (higher rates)"
                  checked={v.additional === "yes"}
                  onChange={tick("additional")}
                  help={
                    <>
                      Adds {rate(taxYear, "sdlt.higher-rates-surcharge")?.value} to each band (from {rate(taxYear, "sdlt.higher-rates-minimum")?.value}). Spouses are treated as one. A refund may be due if the previous main home is sold within 3 years.{" "}
                      <GovLink href={src("sdlt.higher-rates-surcharge")}>GOV.UK: higher rates</GovLink>
                    </>
                  }
                />
              </>
            )}
            {company && (
              <CheckField
                label="A relief from the 17% rate applies"
                checked={v.corpRelief === "yes"}
                onChange={tick("corpRelief")}
                help={
                  <>
                    For example a property rental business, developer or trader. The higher rates then apply instead.{" "}
                    <GovLink href={src("sdlt.corporate-rate")}>GOV.UK: corporate bodies</GovLink>
                  </>
                }
              />
            )}
            <CheckField
              label="Buyer is not UK resident"
              checked={v.nonRes === "yes"}
              onChange={tick("nonRes")}
              help={`Adds ${rate(taxYear, "sdlt.non-resident-surcharge")?.value} where the buyer wasn't in the UK for at least 183 days in the 12 months before buying.`}
            />
          </>
        )}
        <MoreInputs title="New lease: rent">
          <MoneyField
            label="Net present value of the rent"
            value={v.npv}
            onChange={f.set("npv")}
            error={p.npv.error}
            help={
              <>
                For the grant of a new lease only. Work out the NPV with <GovLink href={CALCULATOR}>HMRC&apos;s SDLT calculator</GovLink>; tax on the rent is added to tax on the premium.
              </>
            }
          />
        </MoreInputs>
      </form>
      <ResultPanel
        title="Stamp Duty Land Tax"
        headlineLabel="Stamp Duty Land Tax payable"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on the price"
        inputsSummary={[
          `Property: ${v.type}`,
          `Price: ${v.price || "0"}`,
          ...(res ? [`Buyer: ${v.purchaser}`, `First-time buyer: ${v.ftb ? "yes" : "no"}`, `Additional dwelling: ${v.additional ? "yes" : "no"}`, `Non-UK resident: ${v.nonRes ? "yes" : "no"}`] : []),
          ...(company ? [`Relief from 17% rate: ${v.corpRelief ? "yes" : "no"}`] : []),
          `Lease rent NPV: ${v.npv || "0"}`,
        ]}
      />
    </div>
  );
}
