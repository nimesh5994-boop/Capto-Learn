"use client";

import { useState } from "react";
import { rate } from "@/content/rates";
import { type CalcResult } from "@/lib/calc/common";
import { cgtFull, type CgtFullResult } from "@/lib/calc/capital/cgt";
import { privateResidenceRelief, validatePrr, type PrrPeriodType, type PrrResult } from "@/lib/calc/capital/prr";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import { AddButton, CheckField, DateField, Grid, MoreInputs, RowCard, updateRow } from "./ui";
import styles from "../calc.module.css";

const HS283 = "https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2026";

interface Period {
  start: string;
  end: string;
  type: PrrPeriodType;
  letPercent: string;
}
const blankPeriod = (): Period => ({ start: "", end: "", type: "occupied", letPercent: "" });

// Lesson capital-taxes/property-gains-prr-lettings-and-60-day-reporting (Callum Whitlock).
const EXAMPLE_PERIODS: Period[] = [{ start: "2010-01-01", end: "2017-12-31", type: "occupied", letPercent: "" }];
const EXAMPLE = { proceeds: "450,000", cost: "200,000", costs: "15,000", enhancement: "0", bought: "2010-01-01", sold: "2026-06-30", income: "60,000", otherGains: "0", losses: "0", disabled: "" };
const BLANK = { proceeds: "", cost: "", costs: "", enhancement: "", bought: "", sold: "", income: "", otherGains: "", losses: "", disabled: "" };

const PERIOD_TYPES: { value: PrrPeriodType; label: string }[] = [
  { value: "occupied", label: "Lived in as main home" },
  { value: "shared-letting", label: "Lived in, part let to a tenant (shared)" },
  { value: "absence-any", label: "Away — any reason (up to 3 years)" },
  { value: "absence-uk-work", label: "Away — working elsewhere in the UK (up to 4 years)" },
  { value: "absence-abroad", label: "Away — employed abroad" },
];

export function PrivateResidenceReliefCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const [periods, setPeriods] = useState<Period[]>(EXAMPLE_PERIODS);
  const v = f.values;
  const p = {
    proceeds: parseMoney(v.proceeds),
    cost: parseMoney(v.cost),
    costs: parseMoney(v.costs),
    enhancement: parseMoney(v.enhancement),
    income: parseMoney(v.income),
    otherGains: parseMoney(v.otherGains),
    losses: parseMoney(v.losses),
  };
  const lp = periods.map((x) => parsePercent(x.letPercent));
  const fieldErrors = Object.values(p).some((x) => x.error) || lp.some((x) => x.error);
  const lettingsMax = rate(taxYear, "cgt.lettings-relief-max")?.value;

  const { result, errors } = ((): { result: (CalcResult & { prr: PrrResult; cgt: CgtFullResult }) | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const raw = (p.proceeds.value ?? 0) - (p.cost.value ?? 0) - (p.costs.value ?? 0) - (p.enhancement.value ?? 0);
    const prrInput = {
      taxYear,
      gain: Math.max(0, raw),
      acquisitionDate: v.bought,
      disposalDate: v.sold,
      periods: periods.map((x, i) => ({ start: x.start, end: x.end, type: x.type, letPercent: lp[i].value })),
      disabledOrCare: v.disabled === "yes",
    };
    const errs = validatePrr(prrInput);
    if (raw <= 0) errs.unshift("There's no gain: proceeds are not more than the costs, so no relief is needed.");
    if (errs.length) return { result: null, errors: errs };
    try {
      const prr = privateResidenceRelief(prrInput);
      const relief = prr.prr + prr.lettingsRelief;
      const other = p.otherGains.value ?? 0;
      const cgt = cgtFull({
        taxYear,
        taxpayer: "individual",
        disposals: [
          {
            label: "This property",
            completionDate: v.sold,
            proceeds: p.proceeds.value ?? 0,
            cost: p.cost.value ?? 0,
            enhancement: p.enhancement.value ?? 0,
            incidentalCosts: p.costs.value ?? 0,
            assetType: "residential",
            relief: "none",
            prrAndLettingsRelief: relief,
          },
          ...(other > 0 ? [{ label: "Other gains this year", proceeds: other, cost: 0, enhancement: 0, incidentalCosts: 0, assetType: "other" as const, relief: "none" as const }] : []),
        ],
        lossesBroughtForward: p.losses.value ?? 0,
        taxableIncome: p.income.value ?? 0,
      });
      return {
        result: {
          taxYear,
          tax: cgt.tax,
          working: [...prr.working, { label: "Capital gains tax", amount: 0, kind: "note" }, ...cgt.working],
          rateIds: [...new Set([...prr.rateIds, ...cgt.rateIds])],
          notes: [...prr.notes, ...cgt.notes],
          prr,
          cgt,
        },
        errors: [],
      };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const setPeriod = (i: number, patch: Partial<Period>) => setPeriods((ps) => updateRow(ps, i, patch));

  return (
    <div className={styles.layout}>
      <form className={`card card-pad ${styles.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Private residence relief inputs">
        <FormHead
          title="Private residence relief"
          intro="The exempt part of a gain on a home: periods lived in, permitted absences, the final 9 months, and lettings relief where the owner shared the home with a tenant. Then the CGT on what's left and the 60-day return date."
          example="Callum Whitlock (property gains lesson): flat bought 1 January 2010, lived in to 31 December 2017, then let; sold 30 June 2026 → 105 of 198 months exempt, CGT £25,770.91, return due 29 August 2026."
          onExample={() => {
            f.loadExample();
            setPeriods(EXAMPLE_PERIODS);
          }}
          onClear={() => {
            f.clear();
            setPeriods([blankPeriod()]);
          }}
        />
        <Grid>
          <MoneyField label="Sale proceeds" value={v.proceeds} onChange={f.set("proceeds")} error={p.proceeds.error} />
          <MoneyField label="Purchase cost" value={v.cost} onChange={f.set("cost")} error={p.cost.error} />
          <MoneyField label="Buying and selling costs" value={v.costs} onChange={f.set("costs")} error={p.costs.error} help="Legal fees, SDLT, estate agents." />
          <MoneyField label="Improvements" value={v.enhancement} onChange={f.set("enhancement")} error={p.enhancement.error} help="Enhancement still reflected in the property." />
        </Grid>
        <Grid>
          <DateField label="Bought on" value={v.bought} onChange={f.set("bought")} />
          <DateField label="Sale completed on" value={v.sold} onChange={f.set("sold")} help="Completion, not exchange, starts the 60-day clock." />
        </Grid>

        <div className="stack" style={{ gap: 12 }}>
          {periods.map((x, i) => (
            <RowCard key={i} title={`Period ${i + 1}`} onRemove={() => setPeriods((ps) => ps.filter((_, j) => j !== i))} removeLabel={`Remove period ${i + 1}`}>
              <SelectField label="What happened" value={x.type} onChange={(t) => setPeriod(i, { type: t as PrrPeriodType })} options={PERIOD_TYPES} />
              <Grid>
                <DateField label="From" value={x.start} onChange={(d) => setPeriod(i, { start: d })} />
                <DateField label="To (inclusive)" value={x.end} onChange={(d) => setPeriod(i, { end: d })} />
                {x.type === "shared-letting" && (
                  <NumberField label="Share let" value={x.letPercent} onChange={(t) => setPeriod(i, { letPercent: t })} error={lp[i].error} suffix="%" help="Part of the home let while you lived there." />
                )}
              </Grid>
            </RowCard>
          ))}
          <AddButton onClick={() => setPeriods((ps) => [...ps, blankPeriod()])}>Add a period</AddButton>
          <p className="small faint">
            Enter only the periods it was the main home or a permitted absence. Anything else (let in full, empty, a second home) needs no entry: it doesn&apos;t qualify, except the last 9 months. Absences only count if the owner lived there before and after.{" "}
            <a href={HS283} target="_blank" rel="noopener noreferrer">
              HS283
            </a>
          </p>
        </div>

        <MoneyField
          label="Taxable income (after the personal allowance)"
          value={v.income}
          onChange={f.set("income")}
          error={p.income.error}
          help="Decides how much of the gain falls in the basic rate band."
        />

        <MoreInputs>
          <CheckField
            label="Disabled owner, or moved into care (36-month final period)"
            checked={v.disabled === "yes"}
            onChange={(c) => f.set("disabled")(c ? "yes" : "")}
            help="Only where the owner has no other relevant right in a private residence."
          />
          <MoneyField label="Other net gains in the same tax year" value={v.otherGains} onChange={f.set("otherGains")} error={p.otherGains.error} help="Uses up the annual exempt amount and band before this property in the full-year figure." />
          <MoneyField label="Capital losses brought forward" value={v.losses} onChange={f.set("losses")} error={p.losses.error} />
          <p className="small faint">
            Lettings relief is the lowest of the PRR, {lettingsMax} and the gain from the letting.{" "}
            <GovLink href={HS283}>HS283: Private Residence Relief</GovLink>
          </p>
        </MoreInputs>
      </form>
      <ResultPanel
        title="Private residence relief and CGT"
        headlineLabel="Capital gains tax on the sale"
        result={result}
        errors={errors}
        effectiveRate={result ? (result.prr.chargeableGain > 0 ? result.tax / Math.max(1, result.cgt.totalGains) : null) : null}
        effectiveRateLabel="Effective rate on chargeable gains"
        inputsSummary={[
          `Proceeds: ${v.proceeds || "0"}; cost: ${v.cost || "0"}; costs: ${v.costs || "0"}; improvements: ${v.enhancement || "0"}`,
          `Bought ${v.bought || "?"}; sold ${v.sold || "?"}`,
          ...periods.map((x, i) => `Period ${i + 1}: ${x.type} ${x.start} to ${x.end}${x.type === "shared-letting" ? ` (${x.letPercent}% let)` : ""}`),
          `Taxable income: ${v.income || "0"}`,
        ]}
      />
    </div>
  );
}
