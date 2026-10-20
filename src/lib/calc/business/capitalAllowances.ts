/**
 * Plant and machinery capital allowances for one chargeable period: AIA, full expensing and the 50%
 * special rate FYA (companies), the 40% FYA, 100% FYA for new zero-emission cars, main and special
 * rate pool WDAs (with the hybrid main rate for a period spanning the 18% → 14% change), the small
 * pools allowance, disposals, balancing charges and allowances, and short or long periods.
 *
 * Statutory mechanics (not rates):
 * - AIA, WDA and small pools limit are pro-rated for a period other than 12 months; FYAs are not
 *   (GOV.UK "accounting periods which are more or less than a year": strictly days ÷ 365).
 * - Hybrid main rate: days before the change × old rate + days from it × new rate, ÷ total days,
 *   rounded UP to 2 decimal places (GOV.UK "Calculate your hybrid rate of writing down allowance").
 * - Expenditure on which an FYA is claimed joins the pool after the WDA, so WDAs on the balance
 *   start next period (CAA 2001 s58(4); GOV.UK 40% FYA guidance).
 * - Disposal value is the lower of proceeds and cost (CAA 2001 s62): enter that figure.
 * - Full-expensed assets: the disposal value is a balancing charge in full (CAA 2001 s45S).
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2 } from "../common";
import { addDays, addMonths, daysInclusive, isIsoDate, longDate, wholeMonths } from "./dates";
import { businessReader } from "./rates";

export interface CapitalAllowancesInput {
  taxYear: string;
  entity: "company" | "unincorporated";
  start: string;
  end: string;
  prorateBy: "days" | "months";
  mainPoolBf: number;
  specialPoolBf: number;
  /** New and unused main-rate plant (not cars). */
  mainNew: number;
  /** Second-hand main-rate plant (not cars). */
  mainUsed: number;
  /** New and unused special rate items: integral features, long-life assets, thermal insulation, solar panels. */
  specialNew: number;
  specialUsed: number;
  /** New and unused zero-emission (electric) cars: 100% FYA. */
  carsZeroEmission: number;
  /** Cars with CO2 up to the main-rate limit (or second-hand electric). */
  carsMainRate: number;
  /** Cars over the main-rate CO2 limit. */
  carsSpecialRate: number;
  /** Disposal values (lower of proceeds and cost). */
  mainDisposals: number;
  specialDisposals: number;
  /** Disposal values of assets on which full expensing was claimed. */
  fullExpensedDisposals: number;
  /** AIA available if shared with other companies or businesses; blank for the full (pro-rated) amount. */
  aiaAvailable?: number;
  claimFullExpensing: boolean;
  claim40Fya: boolean;
  /** Trade ceased in this period: no AIA, FYA or WDA; pools close with balancing adjustments. */
  ceased: boolean;
}

export interface PoolRow {
  label: string;
  fya: number | null;
  main: number | null;
  special: number | null;
  allowances: number | null;
  kind?: "subtotal" | "total";
}

export interface CapitalAllowancesResult extends CalcResult {
  rows: PoolRow[];
  mainRate: number;
  mainPoolCf: number;
  specialPoolCf: number;
  balancingCharges: number;
  /** Net allowances = allowances − balancing charges. */
  net: number;
}

export function validateCapitalAllowances(i: CapitalAllowancesInput): string[] {
  const e: string[] = [];
  if (!isIsoDate(i.start) || !isIsoDate(i.end)) return ["Enter the period start and end dates."];
  if (i.end < i.start) return ["The period end must be on or after the start."];
  const maxMonths = i.entity === "company" ? 12 : 18;
  if (i.end > addDays(addMonths(i.start, maxMonths), -1)) {
    e.push(i.entity === "company" ? "A company accounting period can't exceed 12 months: work out each AP separately." : "Periods over 18 months need splitting into 12-month periods (GOV.UK guidance): work out each separately.");
  }
  if (i.end < "2024-04-01") e.push("Periods ending before 1 April 2024 aren't supported.");
  if (i.end > "2027-04-05") e.push("Periods ending after 5 April 2027 aren't supported yet (rates not in the dataset).");
  const money: [string, number | undefined][] = [
    ["Main pool brought forward", i.mainPoolBf],
    ["Special rate pool brought forward", i.specialPoolBf],
    ["New main-rate plant", i.mainNew],
    ["Second-hand main-rate plant", i.mainUsed],
    ["New special rate items", i.specialNew],
    ["Second-hand special rate items", i.specialUsed],
    ["Zero-emission cars", i.carsZeroEmission],
    ["Main-rate cars", i.carsMainRate],
    ["Special rate cars", i.carsSpecialRate],
    ["Main pool disposals", i.mainDisposals],
    ["Special rate pool disposals", i.specialDisposals],
    ["Disposals of full-expensed assets", i.fullExpensedDisposals],
    ["AIA available", i.aiaAvailable],
  ];
  for (const [label, v] of money) {
    if (v === undefined) continue;
    if (!Number.isFinite(v)) e.push(`${label} must be a number.`);
    else if (v < 0) e.push(`${label} can't be negative.`);
  }
  if (i.entity === "unincorporated" && i.claimFullExpensing) e.push("Full expensing and the 50% FYA are for companies only.");
  if (i.entity === "unincorporated" && i.fullExpensedDisposals > 0) e.push("Only companies can have full-expensed assets.");
  if (i.claim40Fya && i.end < "2026-01-01") e.push("The 40% FYA is only for expenditure on or after 1 January 2026.");
  if (i.carsZeroEmission > 0 && i.start >= "2027-04-01") e.push("The 100% FYA for zero-emission cars applies to cars bought before April 2027.");
  return e;
}

/** Hybrid main rate, rounded up to 2 decimal places. */
export function hybridRate(daysBefore: number, daysAfter: number, before: number, after: number): number {
  const total = daysBefore + daysAfter;
  const raw = (daysBefore / total) * before + (daysAfter / total) * after;
  // Round the intermediate to 4 dp first so floating-point noise can't push an exact figure up.
  return Math.ceil(Math.round(raw * 1e6) / 1e4 - 1e-9) / 100;
}

export function capitalAllowances(input: CapitalAllowancesInput): CapitalAllowancesResult {
  const errors = validateCapitalAllowances(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const rows: PoolRow[] = [];
  const isCo = input.entity === "company";

  // Period factor.
  const days = daysInclusive(input.start, input.end);
  const full = addDays(addMonths(input.start, 12), -1) === input.end;
  const months = wholeMonths(input.start, input.end);
  let factor = 1;
  let factorLabel = "";
  if (!full) {
    if (input.prorateBy === "months" && months !== null) {
      factor = months / 12;
      factorLabel = ` × ${months}/12`;
    } else {
      factor = days / 365;
      factorLabel = ` × ${days}/365`;
    }
  }
  working.push({ label: `Period ${longDate(input.start)} to ${longDate(input.end)} (${days} days${months ? `, ${months} months` : ""})`, amount: 0, kind: "note" });

  // Main rate: hybrid if the period spans the change date.
  const change = R.date(isCo ? "ca.main-pool-wda-change-date-ct" : "ca.main-pool-wda-change-date-it");
  const oldRate = R.percent("ct.main-pool-wda", "2025/26");
  const newRate = R.percent("ct.main-pool-wda", "2026/27");
  let mainRate: number;
  let mainRateLabel: string;
  let mainRateId: string;
  if (input.end < change) {
    mainRate = oldRate;
    mainRateLabel = pctLabel(oldRate);
    mainRateId = "ct.main-pool-wda";
  } else if (input.start >= change) {
    mainRate = newRate;
    mainRateLabel = pctLabel(newRate);
    mainRateId = "ct.main-pool-wda";
  } else {
    const before = daysInclusive(input.start, addDays(change, -1));
    const after = daysInclusive(change, input.end);
    mainRate = hybridRate(before, after, oldRate, newRate);
    mainRateLabel = `hybrid ${pctLabel(mainRate)}`;
    mainRateId = isCo ? "ca.main-pool-wda-change-date-ct" : "ca.main-pool-wda-change-date-it";
    working.push({
      label: `Hybrid main rate: ${before}/${days} × ${pctLabel(oldRate)} + ${after}/${days} × ${pctLabel(newRate)}, rounded up = ${pctLabel(mainRate)}`,
      amount: 0,
      kind: "note",
    });
  }
  const specialRate = R.percent("ct.special-rate-wda");
  const spaLimit = R.gbp("ct.small-pools-allowance") * factor;


  let allowances = 0;
  let charges = 0;
  let mainFyaCarry = 0;
  let specialFyaCarry = 0;
  let aiaUsed = 0;

  // Additions qualifying for AIA / FYA.
  let mainNew = input.mainNew;
  let mainUsed = input.mainUsed;
  let specialNew = input.specialNew;
  let specialUsed = input.specialUsed;

  if (!input.ceased) {
    const aiaMax = input.aiaAvailable ?? R.gbp("ct.aia") * factor;
    const aiaLabel = input.aiaAvailable !== undefined ? "AIA available (as entered)" : `AIA ${gbp(R.gbp("ct.aia"))}${factorLabel}`;
    working.push({ label: aiaLabel, amount: r2(aiaMax), rateId: "ct.aia", kind: "memo" });
    let left = aiaMax;
    const takeAia = (amt: number) => {
      const t = Math.min(left, amt);
      left -= t;
      aiaUsed += t;
      return t;
    };
    // Order: special rate first (lowest WDA), then second-hand main, then new main.
    const aSU = takeAia(specialUsed);
    const aSN = takeAia(specialNew);
    const aMU = takeAia(mainUsed);
    const aMN = isCo && input.claimFullExpensing ? 0 : takeAia(mainNew);
    specialUsed -= aSU;
    specialNew -= aSN;
    mainUsed -= aMU;
    mainNew -= aMN;
    if (aiaUsed > 0) {
      rows.push({ label: "Annual investment allowance", fya: r2(aiaUsed), main: null, special: null, allowances: r2(aiaUsed) });
      working.push({ label: "AIA claimed", amount: r2(aiaUsed), rateId: "ct.aia" });
    }
    allowances += aiaUsed;

    if (isCo && input.claimFullExpensing && mainNew > 0) {

      allowances += mainNew;
      rows.push({ label: "Full expensing (new main-rate plant)", fya: r2(mainNew), main: null, special: null, allowances: r2(mainNew) });
      working.push({ label: `Full expensing: ${gbp(mainNew)} × 100%`, amount: r2(mainNew), rateId: "ct.full-expensing" });
      mainNew = 0;
    }
    if (isCo && input.claimFullExpensing && specialNew > 0) {
      const fyaRate = R.percent("ct.fya-50");
      const f = (specialNew * fyaRate) / 100;

      allowances += f;
      specialFyaCarry = specialNew - f;
      rows.push({ label: `50% FYA (new special rate items ${gbp(specialNew)})`, fya: r2(f), main: null, special: null, allowances: r2(f) });
      working.push({ label: `50% first-year allowance: ${gbp(specialNew)} × ${pctLabel(fyaRate)}`, amount: r2(f), rateId: "ct.fya-50" });
      specialNew = 0;
    }
    if (input.claim40Fya && mainNew > 0) {
      const fyaRate = R.percent("ct.fya-40");
      R.date("ca.fya-40-start");
      const f = (mainNew * fyaRate) / 100;

      allowances += f;
      mainFyaCarry = mainNew - f;
      rows.push({ label: `40% FYA (new main-rate plant ${gbp(mainNew)})`, fya: r2(f), main: null, special: null, allowances: r2(f) });
      working.push({ label: `40% first-year allowance: ${gbp(mainNew)} × ${pctLabel(fyaRate)}`, amount: r2(f), rateId: "ct.fya-40" });
      mainNew = 0;
    }
    if (input.carsZeroEmission > 0) {
      R.date("ca.zero-emission-car-fya-end");

      allowances += input.carsZeroEmission;
      rows.push({ label: "100% FYA: new zero-emission cars", fya: r2(input.carsZeroEmission), main: null, special: null, allowances: r2(input.carsZeroEmission) });
      working.push({ label: "100% first-year allowance: new zero-emission cars", amount: r2(input.carsZeroEmission), rateId: "ca.zero-emission-car-fya-end" });
    }
  }
  if (input.carsMainRate || input.carsSpecialRate) R.count("ca.car-co2-main-rate-limit");

  // Pools.
  let main = input.mainPoolBf;
  let special = input.specialPoolBf;
  rows.push({ label: "Brought forward", fya: null, main: r2(main), special: r2(special), allowances: null });
  const mainAdds = mainNew + mainUsed + input.carsMainRate + (input.ceased ? input.carsZeroEmission : 0);
  const specialAdds = specialNew + specialUsed + input.carsSpecialRate;
  if (mainAdds || specialAdds) {
    rows.push({ label: "Additions not relieved by AIA/FYA", fya: null, main: r2(mainAdds), special: r2(specialAdds), allowances: null });
    if (mainAdds) working.push({ label: "Main pool additions (no AIA/FYA)", amount: r2(mainAdds), kind: "memo" });
    if (specialAdds) working.push({ label: "Special rate pool additions (no AIA/FYA)", amount: r2(specialAdds), kind: "memo" });
  }
  main += mainAdds;
  special += specialAdds;
  if (input.mainDisposals || input.specialDisposals) {
    rows.push({ label: "Disposals (lower of proceeds and cost)", fya: null, main: -input.mainDisposals || null, special: -input.specialDisposals || null, allowances: null });
  }
  main -= input.mainDisposals;
  special -= input.specialDisposals;
  rows.push({ label: "Pool before allowances", fya: null, main: r2(main), special: r2(special), allowances: null, kind: "subtotal" });

  const pool = (name: "main" | "special", bal: number, rate: number, rateLabel: string, rateId: string): number => {
    const title = name === "main" ? "Main pool" : "Special rate pool";
    const row = (label: string, amt: number, allow: number) =>
      rows.push({ label, fya: null, main: name === "main" ? amt : null, special: name === "special" ? amt : null, allowances: allow });
    if (bal < 0) {
      const bc = -bal;
      charges += bc;
      row(`${title}: balancing charge`, r2(bc), -r2(bc));
      working.push({ label: `${title}: disposals exceed the pool — balancing charge`, amount: -r2(bc) });
      return 0;
    }
    if (bal === 0) return 0;
    if (input.ceased) {
      allowances += bal;
      row(`${title}: balancing allowance (trade ceased)`, -r2(bal), r2(bal));
      working.push({ label: `${title}: balancing allowance on cessation`, amount: r2(bal) });
      return 0;
    }
    if (bal <= spaLimit) {
      allowances += bal;
      row(`${title}: small pools allowance (${gbp(bal)} ≤ ${gbp(spaLimit)})`, -r2(bal), r2(bal));
      working.push({ label: `${title}: small pools allowance (balance ${gbp(bal)} ≤ ${gbp(R.gbp("ct.small-pools-allowance"))}${factorLabel})`, amount: r2(bal), rateId: "ct.small-pools-allowance" });
      return 0;
    }
    const wda = (bal * rate * factor) / 100;
    allowances += wda;
    row(`${title}: WDA ${rateLabel}${factorLabel}`, -r2(wda), r2(wda));
    working.push({ label: `${title} WDA: ${gbp(bal)} × ${rateLabel}${factorLabel}`, amount: r2(wda), rateId });
    return bal - wda;
  };
  main = pool("main", main, mainRate, mainRateLabel, mainRateId);
  special = pool("special", special, specialRate, pctLabel(specialRate), "ct.special-rate-wda");

  if (mainFyaCarry || specialFyaCarry) {
    rows.push({ label: "Add FYA balances (WDAs from next period)", fya: null, main: r2(mainFyaCarry) || null, special: r2(specialFyaCarry) || null, allowances: null });
    main += mainFyaCarry;
    special += specialFyaCarry;
  }
  if (input.fullExpensedDisposals > 0) {
    charges += input.fullExpensedDisposals;
    rows.push({ label: "Balancing charge: disposal of full-expensed assets", fya: null, main: null, special: null, allowances: -input.fullExpensedDisposals });
    working.push({ label: "Balancing charge: disposal value of full-expensed assets", amount: -input.fullExpensedDisposals, rateId: "ct.full-expensing" });
  }
  rows.push({ label: "Carried forward", fya: null, main: r2(main), special: r2(special), allowances: null, kind: "subtotal" });
  const net = r2(allowances - charges);
  rows.push({ label: "Total allowances less balancing charges", fya: null, main: null, special: null, allowances: net, kind: "total" });

  working.push({ label: `Capital allowances${charges ? " less balancing charges" : ""}`, amount: net, kind: "total" });
  working.push({ label: `Main pool carried forward`, amount: r2(main), kind: "memo" });
  working.push({ label: `Special rate pool carried forward`, amount: r2(special), kind: "memo" });

  if (input.ceased) notes.push("Trade ceased: AIA and FYAs aren't available in the final period; zero-emission cars bought in it are added to the main pool.");
  notes.push("Single asset pools (short-life assets, assets with private use by a sole trader or partner) and their balancing adjustments aren't modelled; private-use restrictions aren't applied.");
  notes.push("Disposals of assets on which the 50% or 40% FYA was claimed: enter them as pool disposals. The special rules for 50% FYA assets (half the disposal value as an immediate balancing charge) aren't modelled.");
  notes.push("Structures and buildings allowance, the long-life asset £100,000 test and the AIA when the AIA amount changed in the period aren't covered. AIA is shared between companies under common control: enter the share in AIA available.");
  if (!full && input.prorateBy === "days") notes.push("Short or long period: AIA, WDAs and the small pools limit are pro-rated by days ÷ 365. HMRC's own example rounds the WDA up to the next £1.");
  if (isCo && input.claimFullExpensing) notes.push("AIA is set against special rate and second-hand items first; new main-rate plant gets full expensing, so no AIA is used on it.");

  // Show the result against the dataset year whose main rate applies, so the rate links are right.
  const taxYear = input.end < change ? "2025/26" : input.start >= change ? "2026/27" : input.taxYear;

  return {
    taxYear,
    tax: net,
    working,
    rateIds: [...R.used],
    notes,
    rows,
    mainRate,
    mainPoolCf: r2(main),
    specialPoolCf: r2(special),
    balancingCharges: r2(charges),
    net,
  };
}
