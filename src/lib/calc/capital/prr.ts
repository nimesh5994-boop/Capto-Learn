/**
 * Private residence relief and lettings relief on a dwelling that has been the
 * owner's only or main residence for part of the period of ownership.
 *
 * Periods are counted in months (HS283 works in months; a period from the 1st
 * of a month to the last day of a month is a whole number of months, and part
 * months are counted as a fraction of the month).
 *
 * Statutory mechanics (TCGA 1992 ss222–223), all as described in HMRC
 * helpsheet HS283 (2026) and lesson property-gains-prr-lettings-and-60-day-reporting:
 * https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2026
 */
import { type WorkingLine, CalcInputError, gbp, r2, rateReader, requireNonNegative } from "../common";
import { addDays, cmpISO, isValidISODate, longDate, monthPos } from "./dates";

/** Final period of ownership that always qualifies (HS283). */
export const FINAL_PERIOD_MONTHS = 9;
/** Final period for disabled owners or those moving into care, with no other relevant residence (HS283). */
export const FINAL_PERIOD_MONTHS_DISABLED = 36;
/** Deemed occupation: absences for any reason, up to 3 years in total (HS283). */
export const ABSENCE_ANY_REASON_MAX_MONTHS = 36;
/** Deemed occupation: working elsewhere in the UK, up to 4 years in total (HS283). */
export const ABSENCE_UK_WORK_MAX_MONTHS = 48;

export type PrrPeriodType = "occupied" | "shared-letting" | "absence-any" | "absence-abroad" | "absence-uk-work";

export interface PrrPeriod {
  start: string;
  /** Inclusive end date. */
  end: string;
  type: PrrPeriodType;
  /** For "shared-letting": percentage of the dwelling let to a tenant while the owner also lived there. */
  letPercent?: number;
}

export interface PrrInput {
  taxYear: string;
  /** Gain before private residence relief. */
  gain: number;
  acquisitionDate: string;
  /** Completion date of the sale. */
  disposalDate: string;
  periods: PrrPeriod[];
  /** Disabled owner, or moved into care: 36-month final period (no other relevant residence). */
  disabledOrCare?: boolean;
}

export interface PrrResult {
  totalMonths: number;
  occupiedMonths: number;
  deemedMonths: number;
  finalPeriodMonths: number;
  /** Months of the final period not already counted as occupation or deemed occupation. */
  finalPeriodExtraMonths: number;
  /** Let share × months of shared occupancy outside the final period (months that don't qualify). */
  letMonthsEquivalent: number;
  qualifyingMonths: number;
  prr: number;
  lettingGain: number;
  lettingsRelief: number;
  chargeableGain: number;
  working: WorkingLine[];
  notes: string[];
  rateIds: string[];
}

const TYPE_LABEL: Record<PrrPeriodType, string> = {
  occupied: "Lived in as main residence",
  "shared-letting": "Lived in, with part let to a tenant",
  "absence-any": "Absent — any reason (up to 3 years)",
  "absence-abroad": "Absent — employed abroad (all duties outside the UK)",
  "absence-uk-work": "Absent — working elsewhere in the UK (up to 4 years)",
};

type Iv = [number, number];

function union(ivs: Iv[]): Iv[] {
  const s = ivs.filter(([a, b]) => b > a).sort((x, y) => x[0] - y[0]);
  const out: Iv[] = [];
  for (const [a, b] of s) {
    const last = out[out.length - 1];
    if (last && a <= last[1]) last[1] = Math.max(last[1], b);
    else out.push([a, b]);
  }
  return out;
}
function length(ivs: Iv[]): number {
  return ivs.reduce((t, [a, b]) => t + (b - a), 0);
}
/** Parts of `a` not covered by `b` (both unions). */
function minus(a: Iv[], b: Iv[]): Iv[] {
  let out: Iv[] = a.map((x) => [...x] as Iv);
  for (const [c, d] of b) {
    const next: Iv[] = [];
    for (const [x, y] of out) {
      if (d <= x || c >= y) next.push([x, y]);
      else {
        if (c > x) next.push([x, c]);
        if (d < y) next.push([d, y]);
      }
    }
    out = next;
  }
  return out;
}
const round2m = (x: number) => Math.round(x * 100) / 100;

/** Lettings relief: the lowest of the PRR, £40,000 and the gain attributable to the letting (HS283). */
export function lettingsReliefAmount(prr: number, lettingGain: number, maxRelief: number): number {
  return Math.max(0, Math.min(prr, maxRelief, lettingGain));
}

export function validatePrr(i: PrrInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Gain", i.gain);
  if (!isValidISODate(i.acquisitionDate)) e.push("Enter the date the property was bought.");
  if (!isValidISODate(i.disposalDate)) e.push("Enter the completion date of the sale.");
  if (isValidISODate(i.acquisitionDate) && isValidISODate(i.disposalDate) && cmpISO(i.disposalDate, i.acquisitionDate) <= 0) {
    e.push("The sale must complete after the purchase.");
  }
  i.periods.forEach((p, n) => {
    const name = `Period ${n + 1}`;
    if (!isValidISODate(p.start) || !isValidISODate(p.end)) {
      e.push(`${name}: enter a start and end date.`);
      return;
    }
    if (cmpISO(p.end, p.start) < 0) e.push(`${name}: the end date is before the start date.`);
    if (isValidISODate(i.acquisitionDate) && cmpISO(p.start, i.acquisitionDate) < 0) e.push(`${name}: starts before the purchase.`);
    if (isValidISODate(i.disposalDate) && cmpISO(p.end, i.disposalDate) > 0) e.push(`${name}: ends after the sale.`);
    if (p.type === "shared-letting") {
      const lp = p.letPercent ?? 0;
      if (!Number.isFinite(lp) || lp <= 0 || lp >= 100) e.push(`${name}: the let share must be more than 0% and less than 100%.`);
    }
  });
  return e;
}

export function privateResidenceRelief(input: PrrInput): PrrResult {
  const errors = validatePrr(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  const t0 = monthPos(input.acquisitionDate);
  const t1 = monthPos(addDays(input.disposalDate, 1));
  const total = t1 - t0;
  const iv = (p: PrrPeriod): Iv => [Math.max(t0, monthPos(p.start)), Math.min(t1, monthPos(addDays(p.end, 1)))];

  const occ = union(input.periods.filter((p) => p.type === "occupied" || p.type === "shared-letting").map(iv));
  const finalLen = Math.min(total, input.disabledOrCare ? FINAL_PERIOD_MONTHS_DISABLED : FINAL_PERIOD_MONTHS);
  const finalIv: Iv[] = occ.length ? [[t1 - finalLen, t1]] : [];

  // Deemed occupation: needs actual occupation at some time before and after the absence.
  let anyLeft = ABSENCE_ANY_REASON_MAX_MONTHS;
  let ukLeft = ABSENCE_UK_WORK_MAX_MONTHS;
  const deemed: Iv[] = [];
  const absences = input.periods
    .filter((p) => p.type.startsWith("absence"))
    .map((p) => ({ p, iv: iv(p) }))
    .sort((a, b) => a.iv[0] - b.iv[0]);
  for (const { p, iv: a } of absences) {
    const before = occ.some(([, b]) => b <= a[0] + 1e-9);
    const after = occ.some(([s]) => s >= a[1] - 1e-9);
    let free = minus(minus([a], occ), union([...deemed, ...finalIv]));
    if (!before || !after) {
      working.push({
        label: `${TYPE_LABEL[p.type]} ${longDate(p.start)} to ${longDate(p.end)}: doesn't count — the owner must live in the home both before and after the absence`,
        amount: 0,
        kind: "note",
      });
      continue;
    }
    if (p.type === "absence-abroad") {
      deemed.push(...free);
      continue;
    }
    // UK work: up to 4 years; any excess (and other reasons) can use the 3-year any-reason allowance.
    let len = length(free);
    if (p.type === "absence-uk-work") {
      const use = Math.min(len, ukLeft);
      ukLeft -= use;
      deemed.push(...takeFirst(free, use));
      free = dropFirst(free, use);
      len -= use;
    }
    const use = Math.min(len, anyLeft);
    anyLeft -= use;
    deemed.push(...takeFirst(free, use));
    if (len - use > 1e-9) {
      working.push({ label: `${TYPE_LABEL[p.type]}: ${round2m(len - use)} months exceed the permitted absence and don't qualify`, amount: 0, kind: "note" });
    }
  }
  const deemedU = minus(union(deemed), occ);
  const finalExtra = minus(minus(union(finalIv), occ), deemedU);

  // Shared-occupancy letting: the let share of those months doesn't qualify (except in the final period).
  let letEq = 0;
  for (const p of input.periods.filter((x) => x.type === "shared-letting")) {
    const outsideFinal = minus([iv(p)], union(finalIv));
    letEq += (length(outsideFinal) * (p.letPercent ?? 0)) / 100;
  }

  const occM = length(occ);
  const deemedM = length(deemedU);
  const finalExtraM = length(finalExtra);
  const qualifying = Math.max(0, occM + deemedM + finalExtraM - letEq);

  const gain = input.gain;
  const prr = r2((gain * qualifying) / total);
  const lettingGain = r2((gain * letEq) / total);
  const maxLet = letEq > 0 ? R.gbp("cgt.lettings-relief-max") : 0;
  const lettingsRelief = r2(letEq > 0 ? lettingsReliefAmount(prr, lettingGain, maxLet) : 0);
  const chargeable = r2(Math.max(0, gain - prr - lettingsRelief));

  working.unshift(
    { label: `Owned ${longDate(input.acquisitionDate)} to ${longDate(input.disposalDate)}: ${round2m(total)} months`, amount: 0, kind: "note" },
    ...input.periods.map((p) => ({
      label: `${TYPE_LABEL[p.type]}${p.type === "shared-letting" ? ` (${p.letPercent}% let)` : ""}: ${longDate(p.start)} to ${longDate(p.end)}`,
      amount: 0,
      kind: "note" as const,
    }))
  );
  working.push({ label: "Gain before private residence relief", amount: gain, kind: "subtotal" });
  const line = (label: string, m: number) => working.push({ label: `${label}: ${round2m(m)} months`, amount: 0, kind: "note" });
  line("Actual occupation", occM);
  if (deemedM > 0) line("Deemed occupation (permitted absences)", deemedM);
  if (finalIv.length) line(`Final ${finalLen} months not otherwise covered`, finalExtraM);
  else working.push({ label: "Never lived in as a main residence, so no final period relief", amount: 0, kind: "note" });
  if (letEq > 0) line("Less let share of shared-occupancy months", -letEq);
  line(`Qualifying months ${round2m(qualifying)} of ${round2m(total)}`, qualifying);
  working.push({ label: `Less private residence relief: ${gbp(gain)} × ${round2m(qualifying)}/${round2m(total)}`, amount: -prr });
  if (letEq > 0) {
    working.push({ label: `Gain attributable to the letting: ${gbp(gain)} × ${round2m(letEq)}/${round2m(total)}`, amount: lettingGain, kind: "memo" });
    working.push({
      label: `Less lettings relief: lowest of PRR ${gbp(prr)}, ${gbp(maxLet)} and the letting gain ${gbp(lettingGain)}`,
      amount: -lettingsRelief,
      rateId: "cgt.lettings-relief-max",
    });
  }
  working.push({ label: "Chargeable gain after private residence relief", amount: chargeable, kind: "subtotal" });

  notes.push("Months are counted from the dates entered; HMRC also accepts a calculation in days, which can differ by a few pounds.");
  notes.push("Lettings relief is only for periods when the owner shared the home with a tenant. Letting the whole property gets no lettings relief (only the final period exemption).");
  notes.push("Not modelled: grounds over half a hectare, parts used exclusively for business, the 24-month delay before moving in, main-residence nominations between two homes, job-related accommodation, spouses' periods of ownership on a no gain/no loss transfer, and the relaxation of the 'after' condition when an employer requires the owner to work elsewhere.");

  return {
    totalMonths: round2m(total),
    occupiedMonths: round2m(occM),
    deemedMonths: round2m(deemedM),
    finalPeriodMonths: finalLen,
    finalPeriodExtraMonths: round2m(finalExtraM),
    letMonthsEquivalent: round2m(letEq),
    qualifyingMonths: round2m(qualifying),
    prr,
    lettingGain,
    lettingsRelief,
    chargeableGain: chargeable,
    working,
    notes,
    rateIds: [...R.used],
  };
}

function takeFirst(ivs: Iv[], len: number): Iv[] {
  const out: Iv[] = [];
  let left = len;
  for (const [a, b] of ivs) {
    if (left <= 1e-12) break;
    const l = Math.min(b - a, left);
    out.push([a, a + l]);
    left -= l;
  }
  return out;
}
function dropFirst(ivs: Iv[], len: number): Iv[] {
  const out: Iv[] = [];
  let left = len;
  for (const [a, b] of ivs) {
    const l = Math.min(b - a, Math.max(0, left));
    left -= l;
    if (a + l < b) out.push([a + l, b]);
  }
  return out;
}
