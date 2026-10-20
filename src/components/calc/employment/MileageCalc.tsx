"use client";

import { rate } from "@/content/rates";
import { type MileageResult, type Vehicle, mileage, validateMileage } from "@/lib/calc/employment/mileage";
import { parseMoney, parsePercent } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import calc from "../calc.module.css";
import styles from "./employment.module.css";

const EXAMPLE = { vehicle: "car", miles: "11,000", mode: "perMile", ppm: "35", total: "", pMiles: "", pRate: "", taxRate: "basic" };
const BLANK = { ...EXAMPLE, miles: "", ppm: "", taxRate: "none" };

export function MileageCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const p = {
    miles: parseMoney(v.miles),
    ppm: parsePercent(v.ppm),
    total: parseMoney(v.total),
    pMiles: parseMoney(v.pMiles),
    pRate: parsePercent(v.pRate),
  };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const src = (id: string) => rate(taxYear, id)?.source.url ?? "https://www.gov.uk/expenses-and-benefits-business-travel-mileage/rules-for-tax";
  const isCar = v.vehicle === "car";

  const { result, errors } = ((): { result: MileageResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      vehicle: v.vehicle as Vehicle,
      businessMiles: p.miles.value ?? 0,
      paid: v.mode === "perMile" ? { mode: "perMile" as const, value: p.ppm.value ?? 0 } : { mode: "total" as const, value: p.total.value ?? 0 },
      passengerMiles: isCar ? p.pMiles.value ?? 0 : 0,
      passengerRatePence: isCar ? p.pRate.value ?? 0 : 0,
      taxRate: v.taxRate as "none" | "basic" | "higher" | "additional",
    };
    const errs = validateMileage(input);
    if (!Number.isInteger(input.businessMiles)) errs.push("Enter whole business miles.");
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: mileage(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const headline = result && result.taxableExcess > 0 ? "Taxable excess (employer paid more than approved)" : "Mileage Allowance Relief the employee can claim";

  return (
    <div className={calc.layout}>
      <form className={`card card-pad ${calc.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Mileage inputs">
        <FormHead
          title="Mileage and expenses"
          intro="Approved mileage allowance payments for an employee's own car, van, motorcycle or cycle: the taxable and NIC-able excess when the employer pays more, or the Mileage Allowance Relief claim when it pays less. Passenger payments too."
          example="Expenses and mileage lesson: 11,000 business miles in 2026/27 reimbursed at 35p → approved £5,750, paid £3,850, MAR £1,900."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <div className="grid-2">
          <SelectField
            label="Vehicle"
            value={v.vehicle}
            onChange={f.set("vehicle")}
            options={[
              { value: "car", label: "Car or van" },
              { value: "motorcycle", label: "Motorcycle" },
              { value: "cycle", label: "Cycle" },
            ]}
            help={<GovLink href={src("emp.amap-car-first-10000")}>HMRC: approved rates</GovLink>}
          />
          <NumberField label="Business miles in the tax year" value={v.miles} onChange={f.set("miles")} error={p.miles.error} help="Not commuting or private miles." />
        </div>
        <div className="grid-2">
          <SelectField
            label="Employer pays"
            value={v.mode}
            onChange={f.set("mode")}
            options={[
              { value: "perMile", label: "A rate per mile" },
              { value: "total", label: "A total for the year" },
            ]}
          />
          {v.mode === "perMile" ? (
            <NumberField label="Rate paid" value={v.ppm} onChange={f.set("ppm")} error={p.ppm.error} suffix="p" help="Pence per business mile. 0 if nothing is paid." />
          ) : (
            <MoneyField label="Total paid" value={v.total} onChange={f.set("total")} error={p.total.error} />
          )}
        </div>
        <SelectField
          label="Employee's top rate of tax (for the MAR saving)"
          value={v.taxRate}
          onChange={f.set("taxRate")}
          options={[
            { value: "none", label: "Don't show" },
            { value: "basic", label: "Basic rate" },
            { value: "higher", label: "Higher rate" },
            { value: "additional", label: "Additional rate" },
          ]}
          help="England, Wales and Northern Ireland rates."
        />
        {isCar && (
          <details className={styles.more}>
            <summary>More inputs: passenger payments</summary>
            <div className={styles.moreBody}>
              <NumberField label="Passenger-miles" value={v.pMiles} onChange={f.set("pMiles")} error={p.pMiles.error} help="Business miles × fellow employees carried on business journeys (e.g. 100 miles with 2 passengers = 200)." />
              <NumberField
                label="Passenger rate paid"
                value={v.pRate}
                onChange={f.set("pRate")}
                error={p.pRate.error}
                suffix="p"
                help={<>Pence per passenger-mile. <GovLink href={src("emp.amap-passenger")}>GOV.UK: passenger payments</GovLink></>}
              />
            </div>
          </details>
        )}
      </form>
      <ResultPanel
        title="Mileage allowance"
        headlineLabel={headline}
        result={result}
        errors={errors}
        inputsSummary={[
          `Vehicle: ${v.vehicle}`,
          `Business miles: ${v.miles || "0"}`,
          v.mode === "perMile" ? `Paid: ${v.ppm || "0"}p a mile` : `Paid: ${v.total || "0"} in total`,
          ...(isCar && v.pMiles ? [`Passenger-miles: ${v.pMiles} at ${v.pRate || "0"}p`] : []),
        ]}
      />
    </div>
  );
}
