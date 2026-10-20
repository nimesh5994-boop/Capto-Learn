"use client";

import { useState } from "react";
import { rate } from "@/content/rates";
import { inheritanceTaxFull, validateIhtFull, type GiftExemption, type IhtFullResult, type LifetimeGift } from "@/lib/calc/capital/iht";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import { AddButton, CheckField, DateField, Grid, GroupTitle, MoreInputs, RowCard, TextField, updateRow } from "./ui";
import styles from "../calc.module.css";

interface GiftRow {
  date: string;
  value: string;
  type: "pet" | "clt";
  recipient: string;
  exemption: GiftExemption;
  paidBy: "donor" | "trustees";
}
const blankGift = (): GiftRow => ({ date: "", value: "", type: "pet", recipient: "", exemption: "none", paidBy: "trustees" });

// Lesson capital-taxes/lifetime-gifts-pets-taper-relief-and-exemptions (Rosalind Ashby).
const EXAMPLE_GIFTS: GiftRow[] = [{ date: "2024-01-01", value: "400,000", type: "pet", recipient: "son", exemption: "none", paidBy: "trustees" }];
const EXAMPLE = {
  death: "2027-03-15",
  gross: "0",
  liabilities: "0",
  spouse: "0",
  charity: "0",
  home: "0",
  tnrb: "0",
  trnrb: "0",
  apr100: "0",
  apr50: "0",
  tallow: "0",
  allowUsed: "0",
  priorAe: "3,000",
  noAe: "",
  qsrDate: "",
  qsrTax: "",
  qsrValue: "",
  qsrIncrease: "",
};
const BLANK = { ...EXAMPLE, death: "", gross: "", liabilities: "", spouse: "", charity: "", home: "", tnrb: "", trnrb: "", apr100: "", apr50: "", tallow: "", allowUsed: "", priorAe: "3,000" };

const EXEMPTIONS: { value: GiftExemption; label: string }[] = [
  { value: "none", label: "None (annual exemption only)" },
  { value: "small", label: "Small gift (£250 per person)" },
  { value: "marriage-child", label: "Wedding gift to a child" },
  { value: "marriage-grandchild", label: "Wedding gift to a grandchild" },
  { value: "marriage-other", label: "Wedding gift to anyone else" },
  { value: "normal-expenditure", label: "Normal expenditure out of income" },
  { value: "spouse", label: "To spouse or civil partner" },
  { value: "charity", label: "To charity" },
];

export function InheritanceTaxFullCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const [gifts, setGifts] = useState<GiftRow[]>(EXAMPLE_GIFTS);
  const v = f.values;
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/inheritance-tax";
  const p = {
    gross: parseMoney(v.gross),
    liabilities: parseMoney(v.liabilities),
    spouse: parseMoney(v.spouse),
    charity: parseMoney(v.charity),
    home: parseMoney(v.home),
    tnrb: parsePercent(v.tnrb),
    trnrb: parsePercent(v.trnrb),
    apr100: parseMoney(v.apr100),
    apr50: parseMoney(v.apr50),
    tallow: parsePercent(v.tallow),
    allowUsed: parseMoney(v.allowUsed),
    priorAe: parseMoney(v.priorAe),
    qsrTax: parseMoney(v.qsrTax),
    qsrValue: parseMoney(v.qsrValue),
    qsrIncrease: parseMoney(v.qsrIncrease),
  };
  const gp = gifts.map((g) => parseMoney(g.value));
  const fieldErrors = Object.values(p).some((x) => x.error) || gp.some((x) => x.error);
  const allowance = rate(taxYear, "iht.apr-bpr-100-allowance");

  const { result, errors } = ((): { result: IhtFullResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const giftsIn: LifetimeGift[] = gifts.map((g, i) => ({
      date: g.date,
      value: gp[i].value ?? 0,
      type: g.type,
      recipient: g.recipient,
      exemption: g.exemption,
      taxPaidBy: g.paidBy,
    }));
    const useQsr = !!(v.qsrDate || v.qsrTax);
    const input = {
      taxYear,
      dateOfDeath: v.death || undefined,
      gifts: giftsIn,
      applyAnnualExemption: v.noAe !== "yes",
      priorYearAnnualExemptionUnused: p.priorAe.value ?? 0,
      grossEstate: p.gross.value ?? 0,
      liabilities: p.liabilities.value ?? 0,
      spouseExempt: p.spouse.value ?? 0,
      charityGifts: p.charity.value ?? 0,
      rnrbEligibleHomeToDescendants: p.home.value ?? 0,
      transferredNrbPercent: p.tnrb.value ?? 0,
      transferredRnrbPercent: p.trnrb.value ?? 0,
      apr100Property: p.apr100.value ?? 0,
      apr50Property: p.apr50.value ?? 0,
      transferredAllowancePercent: p.tallow.value ?? 0,
      allowanceUsedByGifts: p.allowUsed.value ?? 0,
      qsr: useQsr
        ? { earlierDate: v.qsrDate, earlierTax: p.qsrTax.value ?? 0, earlierTransferValue: p.qsrValue.value ?? 0, increaseInEstate: p.qsrIncrease.value ?? 0 }
        : undefined,
    };
    const errs = validateIhtFull(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: inheritanceTaxFull(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const setGift = (i: number, patch: Partial<GiftRow>) => setGifts((gs) => updateRow(gs, i, patch));

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Inheritance tax inputs">
        <FormHead
          title="Inheritance tax"
          intro="Lifetime gifts and the death estate: exemptions on gifts, lifetime tax on gifts into trust, tax on death on gifts in the last 7 years with taper relief, then the estate with the bands left, the residence nil rate band, business and agricultural relief, the charity rate and quick succession relief. Shows who pays and when."
          example="Rosalind Ashby (lifetime gifts lesson): £400,000 to her son on 1 January 2024, death 15 March 2027 → £22,080 payable by the son after 20% taper relief."
          onExample={() => {
            f.loadExample();
            setGifts(EXAMPLE_GIFTS);
          }}
          onClear={() => {
            f.clear();
            setGifts([]);
          }}
        />
        <DateField
          label="Date of death"
          value={v.death}
          onChange={f.set("death")}
          help="Leave blank to work out only the lifetime tax on gifts into trust. Choose the tax year of death above."
        />

        <GroupTitle>Lifetime gifts</GroupTitle>
        <div className="stack" style={{ gap: 12 }}>
          {gifts.map((g, i) => (
            <RowCard key={i} title={`Gift ${i + 1}${g.recipient ? ` to ${g.recipient}` : ""}`} onRemove={() => setGifts((gs) => gs.filter((_, j) => j !== i))} removeLabel={`Remove gift ${i + 1}`}>
              <Grid>
                <DateField label="Date" value={g.date} onChange={(x) => setGift(i, { date: x })} />
                <MoneyField label="Value given" value={g.value} onChange={(x) => setGift(i, { value: x })} error={gp[i].error} help="Loss to the estate, after any APR/BPR on the gift." />
                <TextField label="To" value={g.recipient} onChange={(x) => setGift(i, { recipient: x })} placeholder="e.g. daughter" />
              </Grid>
              <Grid>
                <SelectField
                  label="Type"
                  value={g.type}
                  onChange={(x) => setGift(i, { type: x as GiftRow["type"] })}
                  options={[
                    { value: "pet", label: "To a person (PET)" },
                    { value: "clt", label: "Into a trust or to a company (CLT)" },
                  ]}
                />
                <SelectField label="Exemption" value={g.exemption} onChange={(x) => setGift(i, { exemption: x as GiftExemption })} options={g.type === "clt" ? EXEMPTIONS.filter((e) => e.value === "none" || e.value === "normal-expenditure" || e.value === "charity") : EXEMPTIONS} />
                {g.type === "clt" && (
                  <SelectField
                    label="Lifetime tax paid by"
                    value={g.paidBy}
                    onChange={(x) => setGift(i, { paidBy: x as GiftRow["paidBy"] })}
                    options={[
                      { value: "trustees", label: "Trustees (20%)" },
                      { value: "donor", label: "Donor (grossed up, 25% of the excess)" },
                    ]}
                  />
                )}
              </Grid>
            </RowCard>
          ))}
          <AddButton onClick={() => setGifts((gs) => [...gs, blankGift()])}>Add a gift</AddButton>
          <p className="small faint">
            Include every gift in the 7 years before death, and CLTs in the 7 years before those (they reduce the band for later gifts).{" "}
            <GovLink href={src("iht.annual-exemption")}>GOV.UK: gifts and the 7 year rule</GovLink>
          </p>
        </div>

        <GroupTitle>Estate on death</GroupTitle>
        <Grid>
          <MoneyField label="Assets" value={v.gross} onChange={f.set("gross")} error={p.gross.error} help="Everything owned at death, including the share of joint property." />
          <MoneyField label="Debts and funeral costs" value={v.liabilities} onChange={f.set("liabilities")} error={p.liabilities.error} />
          <MoneyField label="Left to spouse or civil partner" value={v.spouse} onChange={f.set("spouse")} error={p.spouse.error} />
          <MoneyField label="Left to charity" value={v.charity} onChange={f.set("charity")} error={p.charity.error} help="At least 10% of the baseline amount brings the 36% rate." />
        </Grid>
        <MoneyField
          label="Home left to direct descendants"
          value={v.home}
          onChange={f.set("home")}
          error={p.home.error}
          help={
            <>
              The residence nil rate band ({rate(taxYear, "iht.residence-nil-rate-band")?.value}) is capped at this and tapered above {rate(taxYear, "iht.rnrb-taper-threshold")?.value}.{" "}
              <GovLink href={src("iht.residence-nil-rate-band")}>GOV.UK: residence nil rate band</GovLink>
            </>
          }
        />
        <div className="grid-2">
          <NumberField label="Unused nil rate band transferred" value={v.tnrb} onChange={f.set("tnrb")} error={p.tnrb.error} suffix="%" help="From a late spouse or civil partner." />
          <NumberField label="Unused residence band transferred" value={v.trnrb} onChange={f.set("trnrb")} error={p.trnrb.error} suffix="%" />
        </div>

        <MoreInputs title="Business and agricultural relief">
          <Grid>
            <MoneyField
              label="Property qualifying for 100% relief"
              value={v.apr100}
              onChange={f.set("apr100")}
              error={p.apr100.error}
              help={allowance?.unit === "GBP" ? `The first ${allowance.value} (combined) gets 100%; the rest 50%. Only property in the chargeable estate.` : "No cap on 100% relief for deaths before 6 April 2026."}
            />
            <MoneyField label="Property qualifying for 50% relief" value={v.apr50} onChange={f.set("apr50")} error={p.apr50.error} help="AIM shares, quoted controlling holdings, assets used by the business." />
            <NumberField label="Unused 100% allowance transferred" value={v.tallow} onChange={f.set("tallow")} error={p.tallow.error} suffix="%" help="From a late spouse or civil partner (up to 100%)." />
            <MoneyField label="Allowance used by gifts in the last 7 years" value={v.allowUsed} onChange={f.set("allowUsed")} error={p.allowUsed.error} help="100% relief given on lifetime transfers from 30 October 2024." />
          </Grid>
          <p className="small faint">
            <GovLink href={src("iht.apr-bpr-100-allowance")}>GOV.UK: Agricultural Relief</GovLink> · <GovLink href={src("iht.apr-bpr-rate-above-allowance")}>GOV.UK: Business Relief</GovLink>
          </p>
        </MoreInputs>

        <MoreInputs title="Quick succession relief and annual exemptions">
          <Grid>
            <DateField label="Earlier death (or transfer)" value={v.qsrDate} onChange={f.set("qsrDate")} help="Within 5 years before this death." />
            <MoneyField label="Tax paid on the earlier transfer" value={v.qsrTax} onChange={f.set("qsrTax")} error={p.qsrTax.error} />
            <MoneyField label="Value of the earlier transfer" value={v.qsrValue} onChange={f.set("qsrValue")} error={p.qsrValue.error} help="Gross chargeable value." />
            <MoneyField label="Increase in this estate from it" value={v.qsrIncrease} onChange={f.set("qsrIncrease")} error={p.qsrIncrease.error} help="Net amount the deceased received." />
          </Grid>
          <MoneyField
            label="Annual exemption unused in the year before the first gift"
            value={v.priorAe}
            onChange={f.set("priorAe")}
            error={p.priorAe.error}
            help="Can be carried forward one year only, after that year's own exemption."
          />
          <CheckField label="Gift values are already after annual exemptions" checked={v.noAe === "yes"} onChange={(c) => f.set("noAe")(c ? "yes" : "")} />
        </MoreInputs>
      </form>
      <ResultPanel
        title="Inheritance tax"
        headlineLabel={v.death ? "Inheritance tax payable because of the death" : "Lifetime tax on chargeable lifetime transfers"}
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on the net estate"
        inputsSummary={[
          `Date of death: ${v.death || "none"}`,
          ...gifts.map((g, i) => `Gift ${i + 1}: ${g.date} ${g.value} ${g.type.toUpperCase()} to ${g.recipient || "?"}, exemption ${g.exemption}${g.type === "clt" ? `, tax paid by ${g.paidBy}` : ""}`),
          `Assets ${v.gross || "0"}; debts and funeral ${v.liabilities || "0"}; spouse ${v.spouse || "0"}; charity ${v.charity || "0"}; home to descendants ${v.home || "0"}`,
          `Transferred NRB ${v.tnrb || "0"}%, RNRB ${v.trnrb || "0"}%`,
          `APR/BPR: 100% property ${v.apr100 || "0"}, 50% property ${v.apr50 || "0"}, allowance transferred ${v.tallow || "0"}%, used by gifts ${v.allowUsed || "0"}`,
        ]}
      />
    </div>
  );
}
