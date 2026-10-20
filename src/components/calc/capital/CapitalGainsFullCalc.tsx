"use client";

import { useState } from "react";
import { rate } from "@/content/rates";
import { cgtFull, validateCgtFull, type CgtDisposal, type CgtFullResult, type CgtTaxpayer, type DisposalRelief } from "@/lib/calc/capital/cgt";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import { AddButton, CheckField, DateField, Grid, MoreInputs, RowCard, TextField, updateRow } from "./ui";
import styles from "../calc.module.css";

interface Row {
  label: string;
  date: string;
  proceeds: string;
  cost: string;
  enhancement: string;
  costs: string;
  assetType: "residential" | "other";
  relief: DisposalRelief;
  prr: string;
}

const blankRow = (): Row => ({ label: "", date: "", proceeds: "", cost: "", enhancement: "", costs: "", assetType: "other", relief: "none", prr: "" });

// Lesson capital-taxes/cgt-computation-rates-and-annual-exempt-amount (Nadia Rahman).
const EXAMPLE_ROWS: Row[] = [
  { label: "Unlisted company shares", date: "2026-08-15", proceeds: "92,000", cost: "40,000", enhancement: "0", costs: "2,000", assetType: "other", relief: "none", prr: "" },
];
const EXAMPLE = { taxpayer: "individual", income: "17,430", ext: "0", losses: "0", badrUsed: "0", irUsed: "0", settlements: "1", prYears: "yes", nonRes: "" };
const BLANK = { taxpayer: "individual", income: "", ext: "", losses: "", badrUsed: "", irUsed: "", settlements: "1", prYears: "yes", nonRes: "" };

export function CapitalGainsFullCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const [rows, setRows] = useState<Row[]>(EXAMPLE_ROWS);
  const v = f.values;
  const tp = v.taxpayer as CgtTaxpayer;
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/capital-gains-tax";

  const p = {
    income: parseMoney(v.income),
    ext: parseMoney(v.ext),
    losses: parseMoney(v.losses),
    badrUsed: parseMoney(v.badrUsed),
    irUsed: parseMoney(v.irUsed),
    settlements: parseWhole(v.settlements, 1),
  };
  const rp = rows.map((r) => ({ proceeds: parseMoney(r.proceeds), cost: parseMoney(r.cost), enhancement: parseMoney(r.enhancement), costs: parseMoney(r.costs), prr: parseMoney(r.prr) }));
  const fieldErrors = Object.values(p).some((x) => x.error) || rp.some((r) => Object.values(r).some((x) => x.error));

  const disposals: CgtDisposal[] = rows.map((r, i) => ({
    label: r.label,
    completionDate: r.date || undefined,
    proceeds: rp[i].proceeds.value ?? 0,
    cost: rp[i].cost.value ?? 0,
    enhancement: rp[i].enhancement.value ?? 0,
    incidentalCosts: rp[i].costs.value ?? 0,
    assetType: r.assetType,
    relief: r.relief,
    prrAndLettingsRelief: r.assetType === "residential" ? rp[i].prr.value ?? 0 : 0,
  }));

  const { result, errors } = ((): { result: CgtFullResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      taxpayer: tp,
      disposals,
      lossesBroughtForward: p.losses.value ?? 0,
      taxableIncome: p.income.value ?? 0,
      basicRateBandExtension: p.ext.value ?? 0,
      badrLifetimeUsed: p.badrUsed.value ?? 0,
      irLifetimeUsed: p.irUsed.value ?? 0,
      settlementsInGroup: p.settlements.value ?? 1,
      prWithinThreeYears: v.prYears === "yes",
      nonResident: v.nonRes === "yes",
    };
    const errs = validateCgtFull(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: cgtFull(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const loadExample = () => {
    f.loadExample();
    setRows(EXAMPLE_ROWS);
  };
  const clear = () => {
    f.clear();
    setRows([blankRow()]);
  };
  const setRow = (i: number, patch: Partial<Row>) => setRows((rs) => updateRow(rs, i, patch));

  const reliefOptions = [
    { value: "none", label: "No relief" },
    { value: "badr", label: "Business Asset Disposal Relief", disabled: tp === "pr" },
    { value: "ir", label: "Investors' Relief", disabled: tp === "pr" },
  ];

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Capital gains tax inputs">
        <FormHead
          title="Capital gains tax"
          intro="CGT for a tax year from a list of disposals: individuals, trustees or personal representatives; current-year and brought-forward losses; the annual exempt amount; BADR and Investors' Relief with their lifetime limits; and the 60-day return for UK residential property."
          example="Nadia Rahman (CGT lesson): shares sold for £92,000 less £2,000 costs, cost £40,000, taxable income £17,430 → £10,063.80."
          onExample={loadExample}
          onClear={clear}
        />
        <SelectField
          label="Who is the taxpayer?"
          value={v.taxpayer}
          onChange={f.set("taxpayer")}
          options={[
            { value: "individual", label: "Individual" },
            { value: "trustee", label: "Trustees" },
            { value: "trustee-disabled", label: "Trustees of a trust for a disabled person" },
            { value: "pr", label: "Personal representatives of someone who has died" },
          ]}
          help={
            <>
              Trustees and personal representatives pay one flat rate and have their own annual exempt amounts.{" "}
              <GovLink href={src("cgt.annual-exempt-amount")}>GOV.UK: CGT rates and allowances</GovLink>
            </>
          }
        />
        {tp === "individual" && (
          <MoneyField
            label="Taxable income (after the personal allowance)"
            value={v.income}
            onChange={f.set("income")}
            error={p.income.error}
            help="Total taxable income for the year after the personal allowance. It decides how much of the basic rate band is left for gains (the UK band is used even for Scottish taxpayers)."
          />
        )}
        {(tp === "trustee" || tp === "trustee-disabled") && (
          <NumberField
            label="Number of settlements in the settlor's group"
            value={v.settlements}
            onChange={f.set("settlements")}
            error={p.settlements.error}
            help="Trusts made by the same settlor share the trust annual exempt amount equally, but each gets at least one-tenth of the individual amount. Enter 1 for a single trust."
          />
        )}
        {tp === "pr" && (
          <SelectField
            label="Is this the tax year of death or one of the next two?"
            value={v.prYears}
            onChange={f.set("prYears")}
            options={[
              { value: "yes", label: "Yes: the annual exempt amount is available" },
              { value: "no", label: "No: a later year, no annual exempt amount" },
            ]}
          />
        )}

        <div className="stack" style={{ gap: 12 }}>
          {rows.map((r, i) => (
            <RowCard key={i} title={r.label.trim() || `Disposal ${i + 1}`} onRemove={rows.length > 1 ? () => setRows((rs) => rs.filter((_, j) => j !== i)) : undefined} removeLabel={`Remove disposal ${i + 1}`}>
              <TextField label="Description" value={r.label} onChange={(x) => setRow(i, { label: x })} placeholder="e.g. Buy-to-let flat" />
              <Grid>
                <MoneyField label="Proceeds" value={r.proceeds} onChange={(x) => setRow(i, { proceeds: x })} error={rp[i].proceeds.error} help="Sale price, or market value for a gift." />
                <MoneyField label="Cost" value={r.cost} onChange={(x) => setRow(i, { cost: x })} error={rp[i].cost.error} help="Purchase price, or probate value if inherited." />
                <MoneyField label="Enhancement" value={r.enhancement} onChange={(x) => setRow(i, { enhancement: x })} error={rp[i].enhancement.error} help="Improvements still reflected in the asset." />
                <MoneyField label="Incidental costs" value={r.costs} onChange={(x) => setRow(i, { costs: x })} error={rp[i].costs.error} help="Buying and selling costs: legal fees, SDLT, agents." />
              </Grid>
              <Grid>
                <SelectField
                  label="Asset"
                  value={r.assetType}
                  onChange={(x) => setRow(i, { assetType: x as Row["assetType"] })}
                  options={[
                    { value: "other", label: "Shares or other asset" },
                    { value: "residential", label: "UK residential property" },
                  ]}
                />
                <SelectField label="Relief claimed" value={r.relief} onChange={(x) => setRow(i, { relief: x as DisposalRelief })} options={reliefOptions} />
                <DateField label="Completion date" value={r.date} onChange={(x) => setRow(i, { date: x })} help={r.assetType === "residential" ? "Starts the 60-day clock." : "Optional."} />
              </Grid>
              {r.assetType === "residential" && (
                <MoneyField
                  label="Private residence and lettings relief"
                  value={r.prr}
                  onChange={(x) => setRow(i, { prr: x })}
                  error={rp[i].prr.error}
                  help="If it was ever the owner's home, work this out with the private residence relief calculator and enter it here."
                />
              )}
            </RowCard>
          ))}
          <AddButton onClick={() => setRows((rs) => [...rs, blankRow()])}>Add a disposal</AddButton>
        </div>

        <MoneyField
          label="Capital losses brought forward"
          value={v.losses}
          onChange={f.set("losses")}
          error={p.losses.error}
          help="Claimed losses from earlier years. They're only used to bring gains down to the annual exempt amount; current-year losses (enter as disposals at a loss) are set off in full first."
        />

        <MoreInputs>
          {tp === "individual" && (
            <MoneyField
              label="Basic rate band extension"
              value={v.ext}
              onChange={f.set("ext")}
              error={p.ext.error}
              help="Gross Gift Aid payments and gross relief-at-source pension contributions for the year."
            />
          )}
          <MoneyField
            label="BADR lifetime limit already used"
            value={v.badrUsed}
            onChange={f.set("badrUsed")}
            error={p.badrUsed.error}
            help={
              <>
                Earlier BADR (or Entrepreneurs&apos; Relief) gains count towards the {rate(taxYear, "cgt.badr-lifetime-limit")?.value} limit.{" "}
                <GovLink href={src("cgt.badr-rate")}>GOV.UK: BADR</GovLink>
              </>
            }
          />
          <MoneyField
            label="Investors' Relief lifetime limit already used"
            value={v.irUsed}
            onChange={f.set("irUsed")}
            error={p.irUsed.error}
            help={`Earlier Investors' Relief gains count towards the ${rate(taxYear, "cgt.investors-relief-lifetime-limit")?.value ?? ""} limit.`}
          />
          <CheckField
            label="Not UK resident"
            checked={v.nonRes === "yes"}
            onChange={(c) => f.set("nonRes")(c ? "yes" : "")}
            help="Non-residents must make a 60-day return for every disposal of UK property or land, even with no tax to pay. Rebasing to April 2015/2019 values isn't calculated."
          />
        </MoreInputs>
      </form>
      <ResultPanel
        title="Capital gains tax"
        headlineLabel="Capital gains tax payable"
        result={result}
        errors={errors}
        effectiveRate={result?.effectiveRate}
        effectiveRateLabel="Effective rate on total gains"
        inputsSummary={[
          `Taxpayer: ${v.taxpayer}`,
          ...(tp === "individual" ? [`Taxable income: ${v.income || "0"}`, `Basic rate band extension: ${v.ext || "0"}`] : []),
          ...rows.map((r, i) => `${r.label || `Disposal ${i + 1}`}: proceeds ${r.proceeds || "0"}, cost ${r.cost || "0"}, enhancement ${r.enhancement || "0"}, costs ${r.costs || "0"}, ${r.assetType}, relief ${r.relief}${r.date ? `, completed ${r.date}` : ""}${r.prr ? `, PRR ${r.prr}` : ""}`),
          `Losses brought forward: ${v.losses || "0"}`,
        ]}
      />
    </div>
  );
}
