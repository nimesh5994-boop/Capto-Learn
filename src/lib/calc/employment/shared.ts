/**
 * Shared helpers for the employment calculators: pay periods, payroll rounding
 * rules and a reader for rule items that carry a count.
 */
import { rate } from "@/content/rates";
import { MissingRateError, rateReader } from "../common";

export type Frequency = "weekly" | "monthly" | "annual";

export const PERIODS: Record<Frequency, number> = { weekly: 52, monthly: 12, annual: 1 };
export const PERIOD_LABEL: Record<Frequency, string> = { weekly: "week", monthly: "month", annual: "year" };

export type Reader = ReturnType<typeof rateReader>;

/**
 * A threshold for the pay period. Weekly and monthly figures are the ones HMRC
 * publishes (they're rounded, so they aren't simply annual ÷ 52 or ÷ 12).
 */
export function periodGbp(R: Reader, f: Frequency, ids: { annual: string; weekly: string; monthly: string }): { amount: number; id: string } {
  const id = ids[f];
  return { amount: R.gbp(id), id };
}

/** A rule held as text with a count in `amount` (e.g. waiting days). Records the id as used. */
export function ruleCount(R: Reader, taxYear: string, id: string): number {
  const item = rate(taxYear, id);
  if (!item || typeof item.amount !== "number") throw new MissingRateError(taxYear, id, "rule count not found in the dataset");
  if (!R.used.includes(id)) R.used.push(id);
  return item.amount;
}

/** True if the id exists for the year (used for rules that only exist in some years). */
export function hasRate(taxYear: string, id: string): boolean {
  return rate(taxYear, id) !== undefined;
}

/** Pence figure (unit "pence") → pounds. Records the id as used. */
export function pencePerMile(R: Reader, taxYear: string, id: string): number {
  const item = rate(taxYear, id);
  if (!item || item.unit !== "pence" || typeof item.amount !== "number") throw new MissingRateError(taxYear, id, "expected a pence amount");
  if (!R.used.includes(id)) R.used.push(id);
  return item.amount / 100;
}

const EPS = 1e-9;

/** Truncate to 4 decimal places "without applying any correction to the final place" (PAYE spec para 3.3.4). */
export function trunc4(x: number): number {
  return Math.trunc((x + Math.sign(x) * EPS) * 10000) / 10000;
}

/** Round down to the penny below. */
export function floorPenny(x: number): number {
  return Math.floor((x + EPS) * 100) / 100;
}

/** Round up to the penny above (if not already a whole number of pence). */
export function ceilPenny(x: number): number {
  return Math.ceil((x - EPS) * 100) / 100 + 0; // + 0 turns -0 into 0
}

/** Round down to the whole pound. */
export function floorPound(x: number): number {
  return Math.floor(x + EPS);
}

/**
 * NIC exact percentage method rounding: to the nearest penny, with exactly half
 * a penny rounding down (HMRC CWG2 / lesson "Calculating PAYE and NIC": "0.5p rounds down").
 */
export function nicRound(x: number): number {
  const p = x * 100;
  const fl = Math.floor(p + EPS);
  const frac = p - fl;
  return (frac > 0.5 + 1e-7 ? fl + 1 : fl) / 100;
}

/**
 * Smallest x in [lo, hi] (to `step`) with pred(x) true, assuming pred is
 * (broadly) monotone false→true. Returns null if pred(hi) is false.
 */
export function solveMin(pred: (x: number) => boolean, lo: number, hi: number, step = 0.01): number | null {
  if (!pred(hi)) return null;
  if (pred(lo)) return lo;
  let a = lo;
  let b = hi;
  while (b - a > step) {
    const m = Math.round(((a + b) / 2) / step) * step;
    if (m <= a || m >= b) break;
    if (pred(m)) b = m;
    else a = m;
  }
  return Math.round(b / step) * step;
}

/** Largest x in [lo, hi] (to `step`) with pred(x) true, assuming pred is true→false. */
export function solveMax(pred: (x: number) => boolean, lo: number, hi: number, step = 0.01): number | null {
  if (!pred(lo)) return null;
  if (pred(hi)) return hi;
  let a = lo;
  let b = hi;
  while (b - a > step) {
    const m = Math.round(((a + b) / 2) / step) * step;
    if (m <= a || m >= b) break;
    if (pred(m)) a = m;
    else b = m;
  }
  return Math.round(a / step) * step;
}
