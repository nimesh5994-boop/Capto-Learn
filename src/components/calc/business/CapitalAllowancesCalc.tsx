"use client";

import type { ReactNode } from "react";

import { capitalAllowances, validateCapitalAllowances, type CapitalAllowancesResult } from "@/lib/calc/business/capitalAllowances";
import { gbp } from "@/lib/calc/common";
import { parseMoney } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import base from "../calc.module.css";
import styles from "./business.module.css";
import { CheckField, DateField, More, run } from "./ui";

const CA = "https://www.gov.uk/capital-allowances";
const CARS = "https://www.gov.uk/capital-allowances/business-cars";
const POOLS = "https://www.gov.uk/work-out-capital-allowances/rates-and-pools";
const HYBRID = "https://www.gov.uk/guidance/calculate-your-hybrid-rate-of-writing-down-allowance";

const MONEY = [
  "mainBf",
  "specialBf",
  "mainNew",
  "mainUsed",
  "specialNew",
  "specialUsed",
  "carsZero",
  "carsMain",
  "carsSpecial",
  "mainDisp",
  "specialDisp",
  "feDisp",
  "aia",
] as const;

const EXAMPLE: Record<string, string> = {
  entity: "company",
  start: "2026-04-01",
  end: "2027-03-31",
  by: "days",
  fe: "yes",
  fya40: "no",
  ceased: "no",
  mainBf: "50,000",
  specialBf: "",
  mainNew: "",
  mainUsed: "",
  specialNew: "1,300,000",
  specialUsed: "",
  carsZero: "",
  carsMain: "",
  carsSpecial: "",
  mainDisp: "40,000",
  specialDisp: "",
  feDisp: "",
  aia: "",
};
const BLANK: Record<string, string> = { ...EXAMPLE, ...Object.fromEntries(MONEY.map((k) => [k, ""])) };

export function CapitalAllowancesCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = Object.fromEntries(MONEY.map((k) => [k, parseMoney(v[k], k === "aia")])) as Record<(typeof MONEY)[number], ReturnType<typeof parseMoney>>;
  const fieldErrors = Object.values(p).some((x) => x.error);
  const isCo = v.entity === "company";
  const input = {
    taxYear,
    entity: v.entity as "company" | "unincorporated",
    start: v.start,
    end: v.end,
    prorateBy: v.by as "days" | "months",
    mainPoolBf: p.mainBf.value ?? 0,
    specialPoolBf: p.specialBf.value ?? 0,
    mainNew: p.mainNew.value ?? 0,
    mainUsed: p.mainUsed.value ?? 0,
    specialNew: p.specialNew.value ?? 0,
    specialUsed: p.specialUsed.value ?? 0,
    carsZeroEmission: p.carsZero.value ?? 0,
    carsMainRate: p.carsMain.value ?? 0,
    carsSpecialRate: p.carsSpecial.value ?? 0,
    mainDisposals: p.mainDisp.value ?? 0,
    specialDisposals: p.specialDisp.value ?? 0,
    fullExpensedDisposals: isCo ? p.feDisp.value ?? 0 : 0,
    aiaAvailable: p.aia.value,
    claimFullExpensing: isCo && v.fe === "yes",
    claim40Fya: v.fya40 === "yes",
    ceased: v.ceased === "yes",
  };
  const { result, errors } = run<CapitalAllowancesResult>(fieldErrors, () => validateCapitalAllowances(input), () => capitalAllowances(input));
  const m = (k: (typeof MONEY)[number], label: string, help: ReactNode) => (
    <MoneyField label={label} value={v[k]} onChange={f.set(k)} error={p[k].error} help={help} placeholder={k === "aia" ? "Full amount" : "0"} />
  );
  const cell = (x: number | null) => (x === null ? "" : gbp(x));

  return (
    <div className={base.layout}>
      <form className={`card card-pad ${base.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Capital allowances inputs">
        <FormHead
          title="Capital allowances"
          intro="Plant and machinery pools for one period: AIA, full expensing and FYAs, main and special rate WDAs (with the hybrid rate across the April 2026 change), small pools, cars by CO2, disposals and balancing adjustments."
          example="Corporation tax lessons: main pool £50,000 with a £40,000 disposal (WDA £1,400) and £1.3m of new integral features (AIA £1m + 50% FYA £150,000), year to 31 March 2027."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="Business"
          value={v.entity}
          onChange={f.set("entity")}
          options={[
            { value: "company", label: "Company (Corporation Tax)" },
            { value: "unincorporated", label: "Sole trader or partnership (Income Tax)" },
          ]}
          help="Full expensing and the 50% FYA are for companies only. The main rate changed on 1 April 2026 for companies and 6 April 2026 for Income Tax."
        />
        <div className="grid-2">
          <DateField label="Period starts" value={v.start} onChange={f.set("start")} />
          <DateField label="Period ends" value={v.end} onChange={f.set("end")} help={<>Short or long periods pro-rate AIA and WDAs. <GovLink href={HYBRID}>Hybrid rate</GovLink></>} />
        </div>
        <div className="grid-2">
          {m("mainBf", "Main pool brought forward", "Tax written down value at the start.")}
          {m("specialBf", "Special rate pool brought forward", "")}
        </div>
        <div className="grid-2">
          {m("mainNew", "New main-rate plant (not cars)", <>New and unused machinery, equipment, vans. <GovLink href={CA}>GOV.UK</GovLink></>)}
          {m("specialNew", "New special rate items", <>Integral features, long-life assets, thermal insulation, solar panels. <GovLink href={POOLS}>GOV.UK</GovLink></>)}
        </div>
        <div className="grid-2">
          {m("mainDisp", "Main pool disposals", "Lower of sale proceeds and original cost.")}
          {m("specialDisp", "Special rate pool disposals", "Lower of sale proceeds and original cost.")}
        </div>
        <More summary="More inputs: second-hand items, cars, claims">
          <div className="grid-2">
            {m("mainUsed", "Second-hand main-rate plant", "AIA but no full expensing or FYA.")}
            {m("specialUsed", "Second-hand special rate items", "AIA but no 50% FYA.")}
          </div>
          {m("carsZero", "New zero-emission cars", <>100% FYA for new electric cars bought before April 2027. <GovLink href={CARS}>GOV.UK</GovLink></>)}
          <div className="grid-2">
            {m("carsMain", "Cars up to 50g/km CO2", "Main pool (also second-hand electric cars). No AIA.")}
            {m("carsSpecial", "Cars over 50g/km CO2", "Special rate pool. No AIA.")}
          </div>
          {isCo && m("feDisp", "Disposals of full-expensed assets", "Lower of proceeds and cost; taxed in full as a balancing charge.")}
          {m("aia", "AIA available", "Leave blank for £1m (pro-rated). Enter the share if the AIA is split with related companies or businesses.")}
          {isCo && <CheckField label="Claim full expensing and the 50% FYA on new items" checked={v.fe === "yes"} onChange={(c) => f.set("fe")(c ? "yes" : "no")} help="Untick to put new items through AIA and the pools instead." />}
          <CheckField label="Claim the 40% FYA on new main-rate plant" checked={v.fya40 === "yes"} onChange={(c) => f.set("fya40")(c ? "yes" : "no")} help="Bought on or after 1 January 2026, new and unused, not a car. Applies to what isn't covered by AIA (or full expensing)." />
          <CheckField label="Trade ceased in this period" checked={v.ceased === "yes"} onChange={(c) => f.set("ceased")(c ? "yes" : "no")} help="No AIA, FYA or WDA in the final period; each pool ends with a balancing allowance or charge." />
          <SelectField
            label="Pro-rate a short or long period by"
            value={v.by}
            onChange={f.set("by")}
            options={[
              { value: "days", label: "Days ÷ 365 (HMRC basis)" },
              { value: "months", label: "Months ÷ 12 (textbook examples)" },
            ]}
          />
        </More>
      </form>
      <div className={styles.panel}>
        {result && (
          <section className="card card-pad" aria-label="Pool computation">
            <div className={styles.panel}>
              <h3>Pool computation</h3>
              <div className={styles.tableWrap}>
                <table className={`${styles.table} ${styles.stack}`}>
                  <thead>
                    <tr>
                      <th scope="col"> </th>
                      <th scope="col">AIA/FYA</th>
                      <th scope="col">Main</th>
                      <th scope="col">Special</th>
                      <th scope="col">Allowances</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((r, i) => (
                      <tr key={i} className={r.kind === "subtotal" ? styles.sub : r.kind === "total" ? styles.tot : undefined}>
                        <td>{r.label}</td>
                        <td data-label="AIA/FYA">{cell(r.fya)}</td>
                        <td data-label="Main pool">{cell(r.main)}</td>
                        <td data-label="Special pool">{cell(r.special)}</td>
                        <td data-label="Allowances">{cell(r.allowances)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
        <ResultPanel
          title="Capital allowances"
          headlineLabel="Allowances less balancing charges"
          result={result}
          errors={errors}
          inputsSummary={[
            `Business: ${v.entity}`,
            `Period: ${v.start} to ${v.end}`,
            ...MONEY.filter((k) => v[k]).map((k) => `${k}: ${v[k]}`),
            `Full expensing: ${v.fe}; 40% FYA: ${v.fya40}; ceased: ${v.ceased}`,
          ]}
        />
      </div>
    </div>
  );
}
