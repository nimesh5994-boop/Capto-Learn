/**
 * Rate access for the business calculators. Wraps `rate(taxYear, id)` from the verified dataset and
 * records every id read (for the "Rates used" list), like `rateReader` in ../common but also reading
 * the date and count items held as text, and the historic tables (financial years, interest rates).
 */
import { rate, ratesFor } from "@/content/rates";
import { MissingRateError } from "../common";
import { isIsoDate } from "./dates";

export function businessReader(taxYear: string) {
  if (!ratesFor(taxYear)) throw new MissingRateError(taxYear, "*", "no verified dataset for this tax year");
  const used: string[] = [];
  const item = (id: string, year = taxYear) => {
    const it = rate(year, id);
    if (!it) throw new MissingRateError(year, id, "id not found in the dataset");
    // Ids are recorded against the reader's own year; cross-year reads use ids present in both years
    // or are noted separately by the caller.
    if (!used.includes(id)) used.push(id);
    return it;
  };
  const num = (id: string, unit: "GBP" | "percent" | "fraction", year?: string) => {
    const it = item(id, year);
    if (it.amount === undefined || it.unit !== unit) throw new MissingRateError(year ?? taxYear, id, `expected a ${unit} amount, found ${it.unit ?? "none"}`);
    return it.amount;
  };
  return {
    gbp: (id: string, year?: string) => num(id, "GBP", year),
    percent: (id: string, year?: string) => num(id, "percent", year),
    fraction: (id: string, year?: string) => num(id, "fraction", year),
    /** A count held as text with an amount (penalty points, g/km). */
    count: (id: string, year?: string) => {
      const it = item(id, year);
      if (it.amount === undefined) throw new MissingRateError(year ?? taxYear, id, "expected a numeric amount");
      return it.amount;
    },
    /** An ISO date held as the item's value. */
    date: (id: string, year?: string) => {
      const it = item(id, year);
      if (!isIsoDate(it.value)) throw new MissingRateError(year ?? taxYear, id, "expected an ISO date value");
      return it.value;
    },
    /** Record a rule held as text (e.g. "30 days") so it's listed under "Rates used"; returns its value. */
    text: (id: string, year?: string) => item(id, year).value,
    display: (id: string, year?: string) => rate(year ?? taxYear, id)?.value ?? id,
    used,
  };
}

export type BusinessReader = ReturnType<typeof businessReader>;

/** Corporation tax rates and limits for one financial year. */
export interface FyRates {
  fy: number;
  smallRate: number;
  mainRate: number;
  lower: number;
  upper: number;
  fraction: number;
  fractionDisplay: string;
  ids: { small: string; main: string; lower: string; upper: string; fraction: string };
  /** Dataset year the figures were read from. */
  datasetYear: string;
}

/**
 * FY2025 and FY2026 are the ct.* items of the 2025/26 and 2026/27 datasets; FY2023 and FY2024 come
 * from the business extra file (HMRC CT rates table). Other years are not in the dataset.
 */
export const SUPPORTED_FINANCIAL_YEARS = [2023, 2024, 2025, 2026];

export function fyRates(R: BusinessReader, fy: number): FyRates {
  if (fy === 2025 || fy === 2026) {
    const y = `${fy}/${String((fy + 1) % 100).padStart(2, "0")}`;
    const ids = { small: "ct.small-profits-rate", main: "ct.main-rate", lower: "ct.lower-limit", upper: "ct.upper-limit", fraction: "ct.marginal-relief-fraction" };
    return {
      fy,
      smallRate: R.percent(ids.small, y),
      mainRate: R.percent(ids.main, y),
      lower: R.gbp(ids.lower, y),
      upper: R.gbp(ids.upper, y),
      fraction: R.fraction(ids.fraction, y),
      fractionDisplay: R.display(ids.fraction, y),
      ids,
      datasetYear: y,
    };
  }
  if (fy === 2023 || fy === 2024) {
    const p = `ct.fy${fy}-`;
    const ids = { small: `${p}small-profits-rate`, main: `${p}main-rate`, lower: `${p}lower-limit`, upper: `${p}upper-limit`, fraction: `${p}marginal-relief-fraction` };
    return {
      fy,
      smallRate: R.percent(ids.small),
      mainRate: R.percent(ids.main),
      lower: R.gbp(ids.lower),
      upper: R.gbp(ids.upper),
      fraction: R.fraction(ids.fraction),
      fractionDisplay: R.display(ids.fraction),
      ids,
      datasetYear: "",
    };
  }
  throw new MissingRateError(`FY${fy}`, "ct.main-rate", `corporation tax rates for financial year ${fy} are not in the verified dataset (supported: FY${SUPPORTED_FINANCIAL_YEARS[0]} to FY${SUPPORTED_FINANCIAL_YEARS[SUPPORTED_FINANCIAL_YEARS.length - 1]})`);
}

/** HMRC late payment interest rate periods, oldest first: { from, rate, id }. */
export function latePaymentInterestTable(taxYear: string): { from: string; rate: number; id: string }[] {
  const year = ratesFor(taxYear);
  if (!year) return [];
  const out: { from: string; rate: number; id: string }[] = [];
  for (const s of year.sections) {
    for (const it of s.items) {
      const m = /^int\.lpi-from-(\d{4}-\d{2}-\d{2})$/.exec(it.id);
      if (m && it.amount !== undefined) out.push({ from: m[1], rate: it.amount, id: it.id });
    }
  }
  return out.sort((a, b) => (a.from < b.from ? -1 : 1));
}
