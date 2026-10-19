"use client";

import { rate } from "@/content/rates";
import { inheritanceTax, validateInheritanceTax, type InheritanceTaxResult } from "@/lib/calc/inheritanceTax";
import { STATUTORY } from "@/lib/calc/common";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField } from "./Fields";
import { ResultPanel } from "./ResultPanel";
import { useFields } from "./useFields";
import styles from "./calc.module.css";

const BASELINE_GUIDANCE = "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm45009";

const EXAMPLE = { estate: "830,000", home: "620,000", tnrb: "0", trnrb: "0", charity: "0", spouse: "0" };
const BLANK = { estate: "", home: "", tnrb: "", trnrb: "", charity: "", spouse: "" };

export function InheritanceTaxCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = {
    estate: parseMoney(v.estate),
    home: parseMoney(v.home),
    tnrb: parsePercent(v.tnrb),
    trnrb: parsePercent(v.trnrb),
    charity: parseMoney(v.charity),
    spouse: parseMoney(v.spouse),
  };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/inheritance-tax";
  const nrb = rate(taxYear, "iht.nil-rate-band")?.value;
  const rnrb = rate(taxYear, "iht.residence-nil-rate-band")?.value;
  const taper = rate(taxYear, "iht.rnrb-taper-threshold")?.value;
  const charityRate = rate(taxYear, "iht.charity-rate")?.value;

  const { result, errors } = ((): { result: InheritanceTaxResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      estate: p.estate.value ?? 0,
      rnrbEligibleHomeToDescendants: p.home.value ?? 0,
      transferredNrbPercent: p.tnrb.value ?? 0,
      transferredRnrbPercent: p.trnrb.value ?? 0,
      charityGifts: p.charity.value ?? 0,
      spouseExempt: p.spouse.value ?? 0,
    };
    const errs = validateInheritanceTax(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: inheritanceTax(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Inheritance tax inputs">
        <FormHead
          title="Inheritance tax on an estate"
          intro="Death estate only: nil rate band and residence nil rate band (with amounts transferred from a late spouse and the taper for larger estates), spouse and charity exemptions, and the reduced charity rate."
          example="Harold Dunmore without his late wife's bands (IHT lesson): estate £830,000, home £620,000 to his daughter → £132,000. Enter 100% in both transfer boxes and the tax is nil."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <MoneyField
          label="Net estate"
          value={v.estate}
          onChange={f.set("estate")}
          error={p.estate.error}
          help={
            <>
              Everything owned at death (including the deceased&apos;s share of joint assets) less debts and funeral costs, before exemptions and reliefs. Also used for the residence nil rate band taper above {taper}.{" "}
              <GovLink href={src("iht.nil-rate-band")}>GOV.UK: IHT thresholds</GovLink>
            </>
          }
        />
        <MoneyField
          label="Home left to direct descendants"
          value={v.home}
          onChange={f.set("home")}
          error={p.home.error}
          help={
            <>
              Value of the home (or share of it) the deceased lived in that passes to children, grandchildren or their spouses. The residence nil rate band ({rnrb}) is capped at this value; enter 0 if none.{" "}
              <GovLink href={src("iht.residence-nil-rate-band")}>GOV.UK: residence nil rate band</GovLink>
            </>
          }
        />
        <MoneyField
          label="Left to spouse or civil partner"
          value={v.spouse}
          onChange={f.set("spouse")}
          error={p.spouse.error}
          help="Exempt where the spouse or civil partner is UK-domiciled or a long-term UK resident. Enter 0 if none."
        />
        <MoneyField
          label="Gifts to charity in the will"
          value={v.charity}
          onChange={f.set("charity")}
          error={p.charity.error}
          help={
            <>
              Exempt. If they are at least {STATUTORY.charityConditionPercent}% of the &ldquo;baseline amount&rdquo;, the rest of the estate is taxed at {charityRate}.{" "}
              <GovLink href={BASELINE_GUIDANCE}>HMRC manual: baseline amount</GovLink>
            </>
          }
        />
        <div className="grid-2">
          <NumberField
            label="Unused nil rate band transferred"
            value={v.tnrb}
            onChange={f.set("tnrb")}
            error={p.tnrb.error}
            suffix="%"
            help={`Percentage of a late spouse's or civil partner's nil rate band left unused (100% if everything went to the survivor). Applied to today's ${nrb}.`}
          />
          <NumberField
            label="Unused residence nil rate band transferred"
            value={v.trnrb}
            onChange={f.set("trnrb")}
            error={p.trnrb.error}
            suffix="%"
            help={`Percentage of the late spouse's residence nil rate band unused (often 100% if they died before 6 April 2017). Applied to today's ${rnrb}.`}
          />
        </div>
      </form>
      <ResultPanel
        title="Inheritance tax"
        headlineLabel="Inheritance tax on the estate"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on the net estate"
        inputsSummary={[
          `Net estate: ${v.estate || "0"}`,
          `Home to direct descendants: ${v.home || "0"}`,
          `Left to spouse/civil partner: ${v.spouse || "0"}`,
          `Charity gifts: ${v.charity || "0"}`,
          `Transferred NRB: ${v.tnrb || "0"}%`,
          `Transferred RNRB: ${v.trnrb || "0"}%`,
        ]}
      />
    </div>
  );
}
