/**
 * Corporation tax for a dated period of account: split into accounting periods (an AP can't exceed
 * 12 months), apportion each AP across financial years by days, marginal relief with associated
 * companies and augmented profits, and the payment position (normal due date or quarterly
 * instalments for large and very large companies).
 *
 * Statutory mechanics used (not rates, so held here with their authority):
 * - An AP ends 12 months after it begins (CTA 2009 s10(1)(a)); a longer period of account is split
 *   into a 12-month AP and the remainder (lesson "who pays and accounting periods").
 * - Profits of a period of account are time-apportioned between APs (CTA 2010 s1172); "days" is the
 *   statutory basis, "months" is offered because HMRC's own examples and many lessons use it.
 * - Marginal relief: F × (U − A) × N / A (CTM03925). Limits divided by 1 + associated companies
 *   (CTM03935) and reduced proportionately for an AP under 12 months (CTM03930: strictly by days).
 * - An AP straddling 1 April where the limits or fraction differ: treat the parts as separate APs,
 *   profits apportioned by AP days, limits by days in each financial year (CTM03955). Where only the
 *   rates differ, profits are apportioned and MR is computed once for the whole AP (CTM03957).
 * - Payment: 9 months and 1 day after the AP end; large companies by quarterly instalments
 *   (CTM92560 to CTM92610), very large (CTM92805, CTM92815).
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2 } from "../common";
import {
  addDays,
  addMonths,
  addMonthsMonthEnd,
  daysInFinancialYear,
  daysInclusive,
  financialYearOf,
  isIsoDate,
  isLastDayOfMonth,
  lastDayOfMonth,
  longDate,
  maxDate,
  minDate,
  monthsForInstalments,
  wholeMonths,
} from "./dates";
import { type BusinessReader, type FyRates, SUPPORTED_FINANCIAL_YEARS, businessReader, fyRates } from "./rates";

export interface ApInputs {
  /** Capital allowances for the AP (enter net of balancing charges). */
  capitalAllowances: number;
  /** Chargeable gains arising in the AP (not apportioned: they belong to the AP in which they arise). */
  chargeableGains: number;
  /** Losses relieved, group relief and qualifying charitable donations deducted in the AP. */
  deductions: number;
  /** Exempt distributions received from non-group companies (augmented profits only). */
  exemptDistributions: number;
  /** Associated companies (not counting this one) for the AP. */
  associatedCompanies: number;
}

export interface CtPeriodInput {
  /** Tax year of the dataset used for labels and the "Rates used" list (the calculator's year picker). */
  taxYear: string;
  /** First day of the period of account (yyyy-mm-dd). */
  start: string;
  /** Last day of the period of account. */
  end: string;
  /** Adjusted trading profit before capital allowances for the whole period of account. */
  tradingProfit: number;
  /** Property income and net non-trading loan relationship credits for the whole period (time-apportioned). */
  otherIncome: number;
  /** How a period of account over 12 months, and short-period limits, are pro-rated. */
  apportionBy: "days" | "months";
  /** One entry per accounting period (1 for a period of 12 months or less, 2 for 13–24 months, …). */
  aps: ApInputs[];
  /** Was the company large (for instalments) in the 12 months before the first AP? */
  largeInPrevious12Months: boolean;
}

export type InstalmentStatus = "normal" | "first-year-exception" | "below-de-minimis" | "large" | "very-large";

export interface Payment {
  date: string;
  amount: number;
  label: string;
}

export interface ApResult {
  index: number;
  start: string;
  end: string;
  days: number;
  months: number | null;
  /** Taxable total profits. */
  profits: number;
  augmentedProfits: number;
  tax: number;
  marginalRelief: number;
  status: InstalmentStatus;
  payments: Payment[];
  /** Normal due date (9 months and 1 day after the AP end). */
  normalDueDate: string;
  working: WorkingLine[];
}

export interface CtPeriodResult extends CalcResult {
  aps: ApResult[];
  /** Filing date: 12 months after the end of the period of account. */
  filingDate: string;
  effectiveRate: number | null;
}

/** Longest period of account handled (split into APs of 12 months). */
export const MAX_PERIOD_MONTHS = 36;

/** The APs a period of account divides into: 12-month APs from the start, then the remainder. */
export function splitIntoAccountingPeriods(start: string, end: string): { start: string; end: string }[] {
  const out: { start: string; end: string }[] = [];
  let s = start;
  while (s <= end && out.length < 10) {
    const twelve = addDays(addMonths(s, 12), -1);
    const e = minDate(twelve, end);
    out.push({ start: s, end: e });
    s = addDays(e, 1);
  }
  return out;
}

/** 9 months and 1 day after the end of the AP (month-end maps to month-end, e.g. 30 June → 1 April). */
export function normalDueDate(apEnd: string): string {
  return addDays(addMonthsMonthEnd(apEnd, 9), 1);
}

/** 12 months after the end of the period of account. */
export function filingDate(periodEnd: string): string {
  return addMonthsMonthEnd(periodEnd, 12);
}

/**
 * Instalment due dates and amounts.
 * Large (CTM92560/92580): first 6 months 13 days after the start, then every 3 months while before
 * the final instalment, which is 3 months 14 days after the end.
 * Very large (CTM92805/92815): first 2 months 13 days after the start, then every 3 months while
 * before the final, which is 14 days after the date in the preceding month corresponding to the AP end.
 * Amounts: 3 × liability ÷ n (n = months in the AP with spare days ÷ 30, CTM92600/92610), capped at
 * the liability still to pay; the final instalment is the balance.
 */
export function instalmentSchedule(kind: "large" | "very-large", start: string, end: string, liability: number): Payment[] {
  let final: string;
  const dates: string[] = [];
  if (kind === "large") {
    final = addDays(addMonthsMonthEnd(end, 3), 14);
    let d = addDays(addMonths(start, 6), 13);
    while (d < final && dates.length < 3) {
      dates.push(d);
      d = addMonthsMonthEnd(d, 3);
    }
  } else {
    const prevMonth = addMonths(end, -1); // clamps to the month-end when there's no corresponding day
    const base = isLastDayOfMonth(end) ? lastDayOfMonth(prevMonth) : prevMonth;
    final = addDays(base, 14);
    if (final < start) return [{ date: end, amount: r2(liability), label: "Single payment (last day of the AP)" }];
    let d = addDays(addMonths(start, 2), 13);
    while (d < final && dates.length < 3) {
      dates.push(d);
      d = addMonthsMonthEnd(d, 3);
    }
  }
  const n = monthsForInstalments(start, end);
  const each = (3 * liability) / n;
  const out: Payment[] = [];
  let paid = 0;
  dates.forEach((d, i) => {
    const amt = r2(Math.min(each, liability - paid));
    paid += amt;
    out.push({ date: d, amount: amt, label: `Instalment ${i + 1}` });
  });
  out.push({ date: final, amount: r2(liability - paid), label: dates.length ? `Instalment ${dates.length + 1} (final)` : "Single payment" });
  return out;
}

export function validateCtPeriod(i: CtPeriodInput): string[] {
  const e: string[] = [];
  if (!isIsoDate(i.start)) e.push("Enter the period start date.");
  if (!isIsoDate(i.end)) e.push("Enter the period end date.");
  if (e.length) return e;
  if (i.end < i.start) return ["The period end must be on or after the start."];
  const lastAllowed = addDays(addMonths(i.start, MAX_PERIOD_MONTHS), -1);
  if (i.end > lastAllowed) e.push(`A period of account over ${MAX_PERIOD_MONTHS} months isn't supported.`);
  const firstFy = SUPPORTED_FINANCIAL_YEARS[0];
  const lastFy = SUPPORTED_FINANCIAL_YEARS[SUPPORTED_FINANCIAL_YEARS.length - 1];
  if (financialYearOf(i.start) < firstFy || financialYearOf(i.end) > lastFy) {
    e.push(`The period must fall between 1 April ${firstFy} and 31 March ${lastFy + 1}: corporation tax rates for other financial years aren't in the verified dataset yet.`);
  }
  for (const [label, v] of [["Trading profit", i.tradingProfit], ["Other income", i.otherIncome]] as const) {
    if (!Number.isFinite(v)) e.push(`${label} must be a number.`);
  }
  if (i.tradingProfit < 0) e.push("A trading loss isn't covered here: enter nil trading profit and relieve the loss separately (see the trading losses lesson).");
  if (i.otherIncome < 0) e.push("Other income can't be negative here (a non-trading deficit needs separate relief).");
  const aps = e.length ? [] : splitIntoAccountingPeriods(i.start, i.end);
  if (aps.length && i.aps.length < aps.length) e.push(`This period splits into ${aps.length} accounting periods: enter the figures for each.`);
  i.aps.slice(0, aps.length).forEach((a, k) => {
    const n = aps.length > 1 ? ` (AP ${k + 1})` : "";
    for (const [label, v] of [
      ["Capital allowances", a.capitalAllowances],
      ["Chargeable gains", a.chargeableGains],
      ["Deductions", a.deductions],
      ["Exempt distributions", a.exemptDistributions],
    ] as const) {
      if (!Number.isFinite(v)) e.push(`${label}${n} must be a number.`);
      else if (v < 0) e.push(`${label}${n} can't be negative.`);
    }
    if (!Number.isInteger(a.associatedCompanies) || a.associatedCompanies < 0 || a.associatedCompanies > 99) {
      e.push(`Associated companies${n} must be a whole number from 0 to 99.`);
    }
  });
  return e;
}

/** Pro-rating factor for an AP's limits and thresholds: 1 for a full 12-month AP. */
function apFactor(start: string, end: string, by: "days" | "months"): { f: number; label: string } {
  if (addDays(addMonths(start, 12), -1) === end) return { f: 1, label: "" };
  const m = wholeMonths(start, end);
  if (by === "months" && m !== null) return { f: m / 12, label: ` × ${m}/12` };
  const d = daysInclusive(start, end);
  return { f: d / 365, label: ` × ${d}/365` };
}

interface Part {
  fy: number;
  start: string;
  end: string;
  days: number;
  rates: FyRates;
}

function fyParts(R: BusinessReader, start: string, end: string): Part[] {
  const parts: Part[] = [];
  for (let fy = financialYearOf(start); fy <= financialYearOf(end); fy++) {
    const s = maxDate(start, `${fy}-04-01`);
    const e = minDate(end, `${fy + 1}-03-31`);
    parts.push({ fy, start: s, end: e, days: daysInclusive(s, e), rates: fyRates(R, fy) });
  }
  return parts;
}

function computeAp(
  R: BusinessReader,
  index: number,
  ap: { start: string; end: string },
  N: number,
  A: number,
  assoc: number,
  by: "days" | "months",
  largeBefore: boolean,
  working: WorkingLine[],
): Omit<ApResult, "profits" | "augmentedProfits" | "working" | "index"> & { isLargeForNext: boolean } {
  const days = daysInclusive(ap.start, ap.end);
  const parts = fyParts(R, ap.start, ap.end);
  const divisor = assoc + 1;
  const sameLimits = parts.every(
    (p) => p.rates.lower === parts[0].rates.lower && p.rates.upper === parts[0].rates.upper && p.rates.fraction === parts[0].rates.fraction,
  );
  let tax = 0;
  let mr = 0;
  const divLabel = divisor > 1 ? ` ÷ ${divisor}` : "";

  if (sameLimits) {
    const { f, label } = apFactor(ap.start, ap.end, by);
    const r0 = parts[0].rates;
    const lower = (r0.lower * f) / divisor;
    const upper = (r0.upper * f) / divisor;
    working.push({ label: `Lower limit: ${gbp(r0.lower)}${label}${divLabel}`, amount: r2(lower), rateId: r0.ids.lower, kind: "memo" });
    working.push({ label: `Upper limit: ${gbp(r0.upper)}${label}${divLabel}`, amount: r2(upper), rateId: r0.ids.upper, kind: "memo" });
    const band = A <= lower ? "small" : A >= upper ? "main" : "marginal";
    if (band === "small") working.push({ label: `Augmented profits ${gbp(A)} do not exceed the lower limit: small profits rate`, amount: 0, kind: "note" });
    else if (band === "main") working.push({ label: `Augmented profits ${gbp(A)} are at or above the upper limit: main rate`, amount: 0, kind: "note" });
    for (const p of parts) {
      const share = parts.length > 1 ? (N * p.days) / days : N;
      const rateP = band === "small" ? p.rates.smallRate : p.rates.mainRate;
      const t = (share * rateP) / 100;
      tax += t;
      const shareLabel = parts.length > 1 ? `FY${p.fy} (${p.days}/${days} days): ${gbp(N)} × ${p.days}/${days} = ${gbp(share)} × ${pctLabel(rateP)}` : `${gbp(N)} × ${pctLabel(rateP)}`;
      working.push({ label: shareLabel, amount: r2(t), rateId: band === "small" ? p.rates.ids.small : p.rates.ids.main });
    }
    if (band === "marginal") {
      mr = r0.fraction * (upper - A) * (N / A);
      tax -= mr;
      const ratio = A === N ? "" : ` × ${gbp(N)} / ${gbp(A)}`;
      working.push({ label: `Less marginal relief: ${r0.fractionDisplay} × (${gbp(upper)} − ${gbp(A)})${ratio}`, amount: -r2(mr), rateId: r0.ids.fraction });
    }
  } else {
    // CTM03955: treat each financial-year part as a separate AP.
    working.push({ label: "The limits or fraction change at 1 April in this AP: each financial-year part is computed as a separate period (CTM03955)", amount: 0, kind: "note" });
    for (const p of parts) {
      const n = (N * p.days) / days;
      const a = (A * p.days) / days;
      const fyDays = daysInFinancialYear(p.fy);
      const lower = (p.rates.lower * p.days) / fyDays / divisor;
      const upper = (p.rates.upper * p.days) / fyDays / divisor;
      working.push({ label: `FY${p.fy}: profits ${gbp(N)} × ${p.days}/${days}`, amount: r2(n), kind: "memo" });
      working.push({ label: `FY${p.fy} limits: ${gbp(p.rates.lower)} / ${gbp(p.rates.upper)} × ${p.days}/${fyDays}${divLabel}`, amount: r2(upper), rateId: p.rates.ids.upper, kind: "memo" });
      if (a <= lower) {
        const t = (n * p.rates.smallRate) / 100;
        tax += t;
        working.push({ label: `FY${p.fy}: ${gbp(n)} × ${pctLabel(p.rates.smallRate)}`, amount: r2(t), rateId: p.rates.ids.small });
      } else {
        const t = (n * p.rates.mainRate) / 100;
        tax += t;
        working.push({ label: `FY${p.fy}: ${gbp(n)} × ${pctLabel(p.rates.mainRate)}`, amount: r2(t), rateId: p.rates.ids.main });
        if (a < upper) {
          const m = p.rates.fraction * (upper - a) * (n / a);
          mr += m;
          tax -= m;
          working.push({ label: `FY${p.fy} marginal relief: ${p.rates.fractionDisplay} × (${gbp(upper)} − ${gbp(a)}) × N/A`, amount: -r2(m), rateId: p.rates.ids.fraction });
        }
      }
    }
  }
  const taxR = r2(tax);
  working.push({ label: `Corporation tax for AP ${index + 1}`, amount: taxR, kind: "subtotal" });

  // Payment position.
  const factor = daysInclusive(ap.start, ap.end) / 365;
  const full = addDays(addMonths(ap.start, 12), -1) === ap.end;
  const f = full ? 1 : factor;
  const fLabel = full ? "" : ` × ${days}/365`;
  const large = (R.gbp("ct.qip-large-threshold") * f) / divisor;
  const veryLarge = (R.gbp("ct.qip-very-large-threshold") * f) / divisor;
  const firstYear = (R.gbp("ct.qip-first-year-limit") * f) / divisor;
  const deMinimis = R.gbp("ct.qip-de-minimis") * f;
  const due = normalDueDate(ap.end);
  let status: InstalmentStatus = "normal";
  let payments: Payment[] = [{ date: due, amount: taxR, label: "Normal due date (9 months and 1 day after the AP)" }];
  let isLargeForNext = false;
  if (A > large) {
    working.push({ label: `Instalments: large threshold ${gbp(R.gbp("ct.qip-large-threshold"))}${fLabel}${divLabel}`, amount: r2(large), rateId: "ct.qip-large-threshold", kind: "memo" });
    if (taxR <= deMinimis) {
      status = "below-de-minimis";
      working.push({ label: `Liability does not exceed ${gbp(deMinimis)}: not a large company, no instalments`, amount: 0, kind: "note" });
    } else if (A > veryLarge) {
      status = "very-large";
      isLargeForNext = true;
      working.push({ label: `Augmented profits exceed the very large threshold ${gbp(veryLarge)}: instalments in months 3, 6, 9 and 12 (no first-year exception)`, amount: 0, kind: "note" });
      payments = instalmentSchedule("very-large", ap.start, ap.end, taxR);
    } else if (!largeBefore && A <= firstYear) {
      status = "first-year-exception";
      isLargeForNext = true; // large, though exempt: counts as large for the next AP (CTM92530)
      working.push({ label: `Large, but not large in the previous 12 months and profits do not exceed ${gbp(firstYear)}: first-year exception, pay on the normal date`, amount: 0, kind: "note" });
    } else {
      status = "large";
      isLargeForNext = true;
      working.push({ label: "Large company: quarterly instalments", amount: 0, kind: "note" });
      payments = instalmentSchedule("large", ap.start, ap.end, taxR);
    }
  }
  return { start: ap.start, end: ap.end, days, months: wholeMonths(ap.start, ap.end), tax: taxR, marginalRelief: r2(mr), status, payments, normalDueDate: due, isLargeForNext };
}

export function corporationTaxForPeriod(input: CtPeriodInput): CtPeriodResult {
  const errors = validateCtPeriod(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const aps = splitIntoAccountingPeriods(input.start, input.end);
  const totalDays = daysInclusive(input.start, input.end);
  const totalMonths = wholeMonths(input.start, input.end);
  const useMonths = input.apportionBy === "months" && totalMonths !== null && aps.every((a) => wholeMonths(a.start, a.end) !== null);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const results: ApResult[] = [];

  working.push({ label: `Period of account ${longDate(input.start)} to ${longDate(input.end)} (${totalDays} days${totalMonths ? `, ${totalMonths} months` : ""})`, amount: 0, kind: "note" });
  if (aps.length > 1) {
    working.push({ label: `Over 12 months: split into ${aps.length} accounting periods; trading profit and other income apportioned by ${useMonths ? "months" : "days"}`, amount: 0, kind: "note" });
  }

  let largeBefore = input.largeInPrevious12Months;
  let totalTax = 0;
  let totalN = 0;
  aps.forEach((ap, k) => {
    const a = input.aps[k];
    const w: WorkingLine[] = [];
    const d = daysInclusive(ap.start, ap.end);
    const m = wholeMonths(ap.start, ap.end);
    const share = aps.length === 1 ? 1 : useMonths ? (m as number) / (totalMonths as number) : d / totalDays;
    const shareLabel = aps.length === 1 ? "" : useMonths ? ` × ${m}/${totalMonths}` : ` × ${d}/${totalDays}`;
    if (aps.length > 1) w.push({ label: `AP ${k + 1}: ${longDate(ap.start)} to ${longDate(ap.end)}`, amount: 0, kind: "note" });
    const trading = input.tradingProfit * share;
    const other = input.otherIncome * share;
    w.push({ label: `Trading profit before capital allowances${shareLabel ? ` ${gbp(input.tradingProfit)}${shareLabel}` : ""}`, amount: r2(trading) });
    if (a.capitalAllowances) w.push({ label: "Less capital allowances", amount: -a.capitalAllowances });
    const tradingAfter = Math.max(0, trading - a.capitalAllowances);
    if (trading - a.capitalAllowances < 0) {
      notes.push(`AP ${k + 1}: capital allowances exceed the trading profit, creating a trading loss of ${gbp(a.capitalAllowances - trading)}. The loss isn't relieved here; trading profit is taken as nil.`);
    }
    if (input.otherIncome) w.push({ label: `Property income and net loan relationship credits${shareLabel ? ` ${gbp(input.otherIncome)}${shareLabel}` : ""}`, amount: r2(other) });
    if (a.chargeableGains) w.push({ label: "Chargeable gains", amount: a.chargeableGains });
    if (a.deductions) w.push({ label: "Less losses, group relief and qualifying donations", amount: -a.deductions });
    const N = r2(Math.max(0, tradingAfter + other + a.chargeableGains - a.deductions));
    if (tradingAfter + other + a.chargeableGains - a.deductions < 0) notes.push(`AP ${k + 1}: deductions exceed total profits; taxable total profits taken as nil (excess relief not modelled).`);
    w.push({ label: "Taxable total profits (N)", amount: N, kind: "subtotal" });
    const A = r2(N + a.exemptDistributions);
    if (a.exemptDistributions) {
      w.push({ label: "Add exempt distributions from non-group companies", amount: a.exemptDistributions });
      w.push({ label: "Augmented profits (A)", amount: A, kind: "subtotal" });
    }
    const res = computeAp(R, k, ap, N, A, a.associatedCompanies, useMonths ? "months" : input.apportionBy, largeBefore, w);
    largeBefore = res.isLargeForNext;
    totalTax += res.tax;
    totalN += N;
    results.push({ index: k, start: res.start, end: res.end, days: res.days, months: res.months, profits: N, augmentedProfits: A, tax: res.tax, marginalRelief: res.marginalRelief, status: res.status, payments: res.payments, normalDueDate: res.normalDueDate, working: w });
    working.push(...w);
  });

  const tax = r2(totalTax);
  if (aps.length > 1) working.push({ label: "Total corporation tax for the period of account", amount: tax, kind: "total" });
  else working[working.length - 1] = { ...working[working.length - 1], label: "Corporation tax payable", kind: "total" };

  const fd = filingDate(input.end);
  notes.push(`Return filing date: ${longDate(fd)} (12 months after the end of the period of account; later if HMRC's notice to file was issued late).${aps.length > 1 ? " A separate CT600 is needed for each accounting period." : ""}`);
  notes.push("Chargeable gains, losses, group relief and donations are entered per accounting period. Trading profit is time-apportioned; property income and loan relationships are strictly allocated on an accruals basis, which this calculator approximates by time-apportioning them.");
  notes.push("Trading losses, non-trading deficits, ring fence profits, close investment-holding company rules and the bank surcharge aren't modelled. Instalment interest isn't calculated.");
  if (input.apportionBy === "months" && !useMonths) notes.push("The period isn't a whole number of months, so days were used.");
  if (results.some((r) => r.status === "large" || r.status === "very-large")) {
    notes.push("Instalments are based on the final liability shown. In practice each instalment uses the company's best estimate at the due date; HMRC charges interest on any shortfall.");
  }
  if (results.some((r) => r.status === "first-year-exception" || r.status === "large") && aps.length === 1) {
    notes.push("The first-year exception depends on whether the company was large in the previous 12 months: check the tick-box.");
  }

  return {
    taxYear: input.taxYear,
    tax,
    working,
    rateIds: [...R.used],
    notes,
    aps: results,
    filingDate: fd,
    effectiveRate: totalN > 0 ? tax / totalN : null,
  };
}
