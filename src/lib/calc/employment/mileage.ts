/**
 * Mileage allowance payments (MAPs) for an employee's own vehicle: the approved
 * amount, the taxable and NIC-able excess when the employer pays more, and
 * Mileage Allowance Relief (MAR) when it pays less. Plus passenger payments.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { pencePerMile } from "./shared";

export type Vehicle = "car" | "motorcycle" | "cycle";

/**
 * Business miles in the tax year paid at the higher car/van rate before the lower
 * rate applies: ITEPA 2003 s230(2), table in EIM31240
 * (https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim31240).
 */
export const CAR_HIGHER_RATE_MILES = 10_000;

export interface MileageInput {
  taxYear: string;
  vehicle: Vehicle;
  /** Business miles in the tax year in the employee's own vehicle. */
  businessMiles: number;
  /** What the employer pays: pence per mile, or a total £ for the year. */
  paid: { mode: "perMile" | "total"; value: number };
  /** Passenger payments (cars and vans only): total passenger-miles (passengers × business miles carried). */
  passengerMiles?: number;
  /** Passenger payment rate paid, pence per passenger-mile. */
  passengerRatePence?: number;
  /** Employee's top rate of tax, to show the tax saved by a MAR claim. */
  taxRate?: "none" | "basic" | "higher" | "additional";
}

export interface MileageResult extends CalcResult {
  approved: number;
  paid: number;
  taxableExcess: number;
  mar: number;
  nicFree: number;
  nicableExcess: number;
  passengerApproved: number;
  passengerPaid: number;
  passengerTaxable: number;
  marTaxSaving: number | null;
}

export function validateMileage(i: MileageInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Business miles", i.businessMiles);
  requireNonNegative(e, "Amount paid", i.paid.value);
  requireNonNegative(e, "Passenger miles", i.passengerMiles);
  requireNonNegative(e, "Passenger rate", i.passengerRatePence);
  if ((i.passengerMiles ?? 0) > 0 && i.vehicle !== "car") e.push("Passenger payments only apply to cars and vans.");
  return e;
}

const LABEL: Record<Vehicle, string> = { car: "car or van", motorcycle: "motorcycle", cycle: "cycle" };

export function mileage(input: MileageInput): MileageResult {
  const errors = validateMileage(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const y = input.taxYear;
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const m = input.businessMiles;

  // Approved amount for tax
  let approved: number;
  let nicRate: number;
  let nicRateId: string;
  if (input.vehicle === "car") {
    const hi = pencePerMile(R, y, "emp.amap-car-first-10000");
    const lo = pencePerMile(R, y, "emp.amap-car-over-10000");
    const m1 = Math.min(m, CAR_HIGHER_RATE_MILES);
    const m2 = Math.max(0, m - CAR_HIGHER_RATE_MILES);
    working.push({ label: `Approved amount: ${m1.toLocaleString("en-GB")} miles × ${Math.round(hi * 100)}p`, amount: r2(m1 * hi), rateId: "emp.amap-car-first-10000" });
    if (m2 > 0) working.push({ label: `Approved amount: ${m2.toLocaleString("en-GB")} miles over ${CAR_HIGHER_RATE_MILES.toLocaleString("en-GB")} × ${Math.round(lo * 100)}p`, amount: r2(m2 * lo), rateId: "emp.amap-car-over-10000" });
    approved = r2(m1 * hi + m2 * lo);
    // For NIC the higher rate applies to every business mile (GOV.UK rates and thresholds for employers).
    nicRate = hi;
    nicRateId = "emp.amap-car-first-10000";
  } else {
    const id = input.vehicle === "motorcycle" ? "emp.amap-motorcycle" : "emp.amap-cycle";
    const r = pencePerMile(R, y, id);
    approved = r2(m * r);
    working.push({ label: `Approved amount: ${m.toLocaleString("en-GB")} miles × ${Math.round(r * 100)}p (${LABEL[input.vehicle]})`, amount: approved, rateId: id });
    nicRate = r;
    nicRateId = id;
  }
  working.push({ label: "Approved amount for tax", amount: approved, kind: "subtotal" });

  const paid = r2(input.paid.mode === "perMile" ? (m * input.paid.value) / 100 : input.paid.value);
  working.push({ label: input.paid.mode === "perMile" ? `Paid by employer: ${m.toLocaleString("en-GB")} miles × ${input.paid.value}p` : "Paid by employer", amount: paid });

  const taxableExcess = r2(Math.max(0, paid - approved));
  const mar = r2(Math.max(0, approved - paid));
  if (taxableExcess > 0) working.push({ label: "Taxable excess (payroll it, or report on the P11D)", amount: taxableExcess, kind: "total" });
  else working.push({ label: "Mileage Allowance Relief the employee can claim", amount: mar, kind: "total" });

  let marTaxSaving: number | null = null;
  if (mar > 0 && input.taxRate && input.taxRate !== "none") {
    const id = input.taxRate === "basic" ? "it.basic-rate" : input.taxRate === "higher" ? "it.higher-rate" : "it.additional-rate";
    const r = R.percent(id);
    marTaxSaving = r2((mar * r) / 100);
    working.push({ label: `Tax saved by the MAR claim: ${gbp(mar)} × ${pctLabel(r)}`, amount: marTaxSaving, rateId: id, kind: "memo" });
  }

  // NIC
  const nicFree = r2(m * nicRate);
  const nicableExcess = r2(Math.max(0, paid - nicFree));
  working.push({ label: `NIC-free amount: ${m.toLocaleString("en-GB")} miles × ${Math.round(nicRate * 100)}p (every business mile)`, amount: nicFree, rateId: nicRateId, kind: "memo" });
  working.push({ label: "Excess liable to Class 1 NIC (add to pay in the period paid)", amount: nicableExcess, kind: "memo" });

  // Passenger payments
  let passengerApproved = 0;
  let passengerPaid = 0;
  let passengerTaxable = 0;
  const pm = input.passengerMiles ?? 0;
  if (pm > 0) {
    const pr = pencePerMile(R, y, "emp.amap-passenger");
    passengerApproved = r2(pm * pr);
    passengerPaid = r2((pm * (input.passengerRatePence ?? 0)) / 100);
    passengerTaxable = r2(Math.max(0, passengerPaid - passengerApproved));
    working.push({ label: `Passenger payments approved: ${pm.toLocaleString("en-GB")} passenger-miles × ${Math.round(pr * 100)}p`, amount: passengerApproved, rateId: "emp.amap-passenger", kind: "memo" });
    working.push({ label: "Passenger payments paid", amount: passengerPaid, kind: "memo" });
    working.push({
      label: passengerTaxable > 0 ? "Passenger payments: taxable excess" : "Passenger payments: within the approved amount (no relief if paid less)",
      amount: passengerTaxable,
      kind: "memo",
    });
  }

  notes.push("Business miles only: ordinary commuting and private journeys don't qualify. The 10,000-mile split is per tax year across all the employee's cars and vans for the same employment.");
  notes.push("For NIC the test is applied in each earnings period, using the higher car rate for every mile; this shows the year as one figure. If the employer pays more in some months than others, work out each period.");
  if (pm > 0) notes.push("NIC on passenger payments above 5p a mile isn't modelled: check the treatment before payrolling the excess.");
  notes.push("Company cars (advisory fuel rates), electric vehicle charging and fixed-rate round-sum allowances aren't covered. MAR is claimed on form P87 or through Self Assessment.");

  const headline = taxableExcess > 0 ? taxableExcess : mar;
  return {
    taxYear: y,
    tax: headline,
    working,
    rateIds: [...R.used],
    notes,
    approved,
    paid,
    taxableExcess,
    mar,
    nicFree,
    nicableExcess,
    passengerApproved,
    passengerPaid,
    passengerTaxable,
    marTaxSaving,
  };
}
