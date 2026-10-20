"use client";

import { frsComparison, frsSectors, validateFrs, vatFraction, vatRegistrationMonitor, validateRegistration, type FrsResult, type RegistrationResult, type ReturnPeriod, type VatFractionResult } from "@/lib/calc/business/vat";
import { addMonths } from "@/lib/calc/business/dates";
import { gbp } from "@/lib/calc/common";
import { formatMoneyInput, parseMoney, parsePercent } from "@/lib/calc/parse";
import { useState } from "react";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import styles from "./business.module.css";
import { CheckField, DateField, More, Segmented, run } from "./ui";

const FRS = "https://www.gov.uk/vat-flat-rate-scheme/how-much-you-pay";
const N733 = "https://www.gov.uk/guidance/flat-rate-scheme-for-small-businesses-vat-notice-733--2";
const REG = "https://www.gov.uk/vat-registration/when-to-register";

/* ------------------------------------------------------------------ */

const FRS_EXAMPLE = { period: "quarter", sector: "vat.frs-sector-accountancy", custom: "", std: "35,000", red: "", zero: "", exempt: "", input: "350", goods: "700", capital: "", first: "no" };
const FRS_BLANK = { ...FRS_EXAMPLE, std: "", input: "", goods: "" };

export function VatFrsCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(FRS_EXAMPLE, FRS_BLANK);
  const v = f.values;
  const p = {
    std: parseMoney(v.std),
    red: parseMoney(v.red),
    zero: parseMoney(v.zero),
    exempt: parseMoney(v.exempt),
    input: parseMoney(v.input),
    goods: parseMoney(v.goods),
    capital: parseMoney(v.capital),
    custom: parsePercent(v.custom),
  };
  const sectors = frsSectors(taxYear);
  const input = {
    taxYear,
    period: v.period as ReturnPeriod,
    standardSalesNet: p.std.value ?? 0,
    reducedSalesNet: p.red.value ?? 0,
    zeroRatedSales: p.zero.value ?? 0,
    exemptSales: p.exempt.value ?? 0,
    inputVat: p.input.value ?? 0,
    relevantGoodsGross: p.goods.value ?? 0,
    capitalAssetVat: p.capital.value ?? 0,
    sectorId: v.sector,
    customRate: p.custom.value,
    firstYear: v.first === "yes",
  };
  const { result, errors } = run<FrsResult>(Object.values(p).some((x) => x.error), () => validateFrs(input), () => frsComparison(input));

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Flat Rate Scheme inputs">
        <FormHead
          title="VAT Flat Rate Scheme vs standard"
          intro="Compares VAT payable under the Flat Rate Scheme with standard accounting for one return period, applying the limited cost business test (2% or £1,000 a year) and the first-year 1% discount."
          example="Accountancy practice (Flat Rate Scheme lesson): £42,000 VAT-inclusive turnover in the quarter, £700 of goods → limited cost business, 16.5%, £6,930."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="Business sector"
          value={v.sector}
          onChange={f.set("sector")}
          options={[...sectors.map((s) => ({ value: s.id, label: `${s.label} — ${s.rate}%` })), { value: "custom", label: "Other rate (enter it)" }]}
          help={
            <>
              Your main business activity. <GovLink href={FRS}>GOV.UK flat rates</GovLink>
            </>
          }
        />
        {v.sector === "custom" && <NumberField label="Flat rate" value={v.custom} onChange={f.set("custom")} error={p.custom.error} suffix="%" />}
        <Segmented
          label="Return period"
          value={v.period as ReturnPeriod}
          onChange={f.set("period")}
          options={[
            { value: "quarter", label: "Quarter" },
            { value: "month", label: "Month" },
            { value: "year", label: "Year" },
          ]}
        />
        <MoneyField label="Standard-rated sales (before VAT)" value={v.std} onChange={f.set("std")} error={p.std.error} help="VAT at 20% is added to give the flat rate turnover." />
        <MoneyField label="Input VAT you could reclaim under standard accounting" value={v.input} onChange={f.set("input")} error={p.input.error} help="VAT on purchases and expenses for the period (excluding capital assets entered below)." />
        <MoneyField
          label="Relevant goods bought, including VAT"
          value={v.goods}
          onChange={f.set("goods")}
          error={p.goods.error}
          help={
            <>
              For the limited cost test: goods used only for the business. Exclude services, capital items, food or drink, vehicles and fuel. <GovLink href={N733}>Notice 733 4.4</GovLink>
            </>
          }
        />
        <CheckField label="First year of VAT registration" checked={v.first === "yes"} onChange={(c) => f.set("first")(c ? "yes" : "no")} help="1% off the flat rate until the day before the first anniversary of registration." />
        <More summary="More inputs: other sales, capital assets">
          <div className="grid-2">
            <MoneyField label="Reduced-rated sales (before VAT)" value={v.red} onChange={f.set("red")} error={p.red.error} help="5% VAT added." />
            <MoneyField label="Zero-rated sales" value={v.zero} onChange={f.set("zero")} error={p.zero.error} help="Included in flat rate turnover." />
          </div>
          <MoneyField label="Exempt income" value={v.exempt} onChange={f.set("exempt")} error={p.exempt.error} help="Also included in flat rate turnover (e.g. rent with no option to tax)." />
          <MoneyField label="VAT on capital assets over £2,000" value={v.capital} onChange={f.set("capital")} error={p.capital.error} help="Single purchases of capital goods costing over £2,000 including VAT: VAT reclaimable under both schemes." />
        </More>
      </form>
      <div className={styles.panel}>
        {result && (
          <section className="card card-pad" aria-label="Comparison">
            <div className={styles.cards}>
              <div className={`${styles.card} ${result.saving < 0 ? styles.cardBest : ""}`}>
                <div className={styles.cardTitle}>Standard accounting{result.saving < 0 && <span className={styles.badge}>Lower</span>}</div>
                <div className={`${styles.kv} ${styles.kvStrong}`}><span>VAT payable</span><span>{gbp(result.standardVat)}</span></div>
              </div>
              <div className={`${styles.card} ${result.saving > 0 ? styles.cardBest : ""}`}>
                <div className={styles.cardTitle}>Flat Rate Scheme{result.saving > 0 && <span className={styles.badge}>Lower</span>}</div>
                <div className={styles.kv}><span>Rate</span><span>{result.frsRate}%{result.limitedCost ? " (limited cost)" : ""}</span></div>
                <div className={`${styles.kv} ${styles.kvStrong}`}><span>VAT payable</span><span>{gbp(result.frsVat)}</span></div>
              </div>
            </div>
          </section>
        )}
        <ResultPanel
          title="Flat Rate Scheme"
          headlineLabel="VAT payable under the Flat Rate Scheme"
          result={result}
          errors={errors}
          inputsSummary={[`Sector: ${v.sector}`, `Period: ${v.period}`, `Standard-rated sales: ${v.std}`, `Input VAT: ${v.input}`, `Relevant goods: ${v.goods}`, `First year: ${v.first}`]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const FR_EXAMPLE = { amount: "87.60", mode: "extract", rate: "vat.standard-rate" };
const FR_BLANK = { amount: "", mode: "extract", rate: "vat.standard-rate" };

export function VatFractionCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(FR_EXAMPLE, FR_BLANK);
  const v = f.values;
  const a = parseMoney(v.amount);
  const input = { taxYear, amount: a.value ?? 0, mode: v.mode as "extract" | "add", rateId: v.rate as "vat.standard-rate" | "vat.reduced-rate" };
  const { result, errors } = run<VatFractionResult>(!!a.error, () => [], () => vatFraction(input));
  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="VAT fraction inputs">
        <FormHead
          title="VAT fraction"
          intro="Takes the VAT out of a VAT-inclusive amount using the VAT fraction (1/6 at 20%, 1/21 at 5%), or adds VAT to a net amount."
          example="Till receipt (how VAT works lesson): £87.60 including VAT contains £14.60 VAT; net £73.00."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <Segmented
          label="Direction"
          value={v.mode as "extract" | "add"}
          onChange={f.set("mode")}
          options={[
            { value: "extract", label: "Remove VAT from a gross amount" },
            { value: "add", label: "Add VAT to a net amount" },
          ]}
        />
        <MoneyField label={v.mode === "extract" ? "Amount including VAT" : "Amount before VAT"} value={v.amount} onChange={f.set("amount")} error={a.error} />
        <SelectField
          label="VAT rate"
          value={v.rate}
          onChange={f.set("rate")}
          options={[
            { value: "vat.standard-rate", label: "Standard rate" },
            { value: "vat.reduced-rate", label: "Reduced rate" },
          ]}
        />
      </form>
      <ResultPanel title="VAT fraction" headlineLabel="VAT" result={result} errors={errors} inputsSummary={[`Amount: ${v.amount}`, `Direction: ${v.mode}`, `Rate: ${v.rate}`]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function defaultFirstMonth(taxYear: string) {
  // Twelve months ending with the last complete month of the tax year's first half, e.g. Oct 2025–Sep 2026.
  const y = Number(taxYear.slice(0, 4));
  return `${y - 1}-10`;
}
const REG_EXAMPLE_MONTHS = ["7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "7,000", "20,000"];

export function VatRegistrationCalc({ taxYear }: { taxYear: string }) {
  const [first, setFirst] = useState("2025-06");
  const [months, setMonths] = useState<string[]>(REG_EXAMPLE_MONTHS);
  const f = useFields({ next30: "", next30Start: "" }, { next30: "", next30Start: "" });
  const v = f.values;
  const parsed = months.map((m) => parseMoney(m));
  const n30 = parseMoney(v.next30);
  const input = { taxYear, firstMonth: first, monthly: parsed.map((p) => p.value ?? 0), next30Days: n30.value ?? 0, next30Start: v.next30Start || undefined };
  const { result, errors } = run<RegistrationResult>(parsed.some((p) => p.error) || !!n30.error, () => validateRegistration(input), () => vatRegistrationMonitor(input));
  const label = (k: number) =>
    /^\d{4}-\d{2}$/.test(first) ? new Date(`${addMonths(`${first}-01`, k)}T12:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }) : `Month ${k + 1}`;

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="VAT registration inputs">
        <FormHead
          title="VAT registration threshold"
          intro="Checks rolling 12-month taxable turnover against the registration threshold at each month end, gives the notification deadline and effective date, and runs the 30-day forward-look test."
          example="GOV.UK example: turnover first goes over the threshold in July → register by 30 August, registered from 1 September."
          onExample={() => {
            setFirst("2025-06");
            setMonths(REG_EXAMPLE_MONTHS);
            f.loadExample();
          }}
          onClear={() => {
            setFirst(defaultFirstMonth(taxYear));
            setMonths(Array(12).fill(""));
            f.clear();
          }}
        />
        <div className={base.field}>
          <label htmlFor="vat-reg-first">First month entered</label>
          <input id="vat-reg-first" type="month" value={first} onChange={(e) => setFirst(e.target.value)} />
          <div className={base.help}>Enter 12 to 24 months of taxable turnover (net of VAT), oldest first; use 0 for months before trading.</div>
        </div>
        <div className={styles.monthGrid}>
          {months.map((m, k) => (
            <div key={k} className={`${base.field} ${parsed[k].error ? base.invalid : ""}`}>
              <label htmlFor={`vat-reg-m${k}`}>{label(k)}</label>
              <div className={base.money}>
                <input
                  id={`vat-reg-m${k}`}
                  inputMode="decimal"
                  autoComplete="off"
                  value={m}
                  placeholder="0"
                  onChange={(e) => setMonths((s) => s.map((x, i) => (i === k ? e.target.value : x)))}
                  onBlur={(e) => setMonths((s) => s.map((x, i) => (i === k ? formatMoneyInput(e.target.value) : x)))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ flexWrap: "wrap", gap: 6 }}>
          <button type="button" className="btn btn-sm" onClick={() => setMonths((s) => (s.length >= 24 ? s : [...s, ""]))}>
            Add a month
          </button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => setMonths((s) => (s.length <= 1 ? s : s.slice(0, -1)))}>
            Remove last month
          </button>
        </div>
        <More summary="Forward look: the next 30 days">
          <MoneyField label="Taxable turnover expected in the next 30 days alone" value={v.next30} onChange={f.set("next30")} error={n30.error} help="For example, a single large contract. Over the threshold on its own means registering now." />
          <DateField
            label="30-day period starts"
            value={v.next30Start}
            onChange={f.set("next30Start")}
            help={
              <>
                The date you realised. <GovLink href={REG}>GOV.UK</GovLink>
              </>
            }
          />
        </More>
      </form>
      <div className={styles.panel}>
        {result && (
          <section className="card card-pad" aria-label="Rolling turnover">
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Month</th>
                    <th scope="col">Turnover</th>
                    <th scope="col">12 months to date</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, k) => (
                    <tr key={r.month} className={r.over ? styles.over : undefined}>
                      <td>{label(k)}</td>
                      <td>{gbp(r.turnover)}</td>
                      <td>{r.rolling === null ? "—" : `${gbp(r.rolling)}${r.over ? " over" : ""}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        <ResultPanel
          title="VAT registration"
          headlineLabel="Latest rolling 12-month taxable turnover"
          result={result}
          errors={errors}
          inputsSummary={[`First month: ${first}`, ...months.map((m, k) => `${label(k)}: ${m || "0"}`), `Next 30 days: ${v.next30 || "0"} from ${v.next30Start || "-"}`]}
        />
      </div>
    </div>
  );
}
