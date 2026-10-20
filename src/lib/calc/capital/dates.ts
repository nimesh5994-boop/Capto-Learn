/**
 * Date helpers for the capital taxes calculators. Dates are ISO "yyyy-mm-dd"
 * strings handled as UTC calendar dates (no time zone drift).
 */

export interface YMD {
  y: number;
  m: number; // 1–12
  d: number;
}

/** Parse "yyyy-mm-dd"; undefined when blank or not a real calendar date. */
export function parseISODate(s: string | undefined): YMD | undefined {
  if (!s) return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return undefined;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || d > daysInMonth(y, mo)) return undefined;
  return { y, m: mo, d };
}

export function isValidISODate(s: string | undefined): boolean {
  return parseISODate(s) !== undefined;
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function toISO(d: YMD): string {
  return `${String(d.y).padStart(4, "0")}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
}

function toUTC(d: YMD): number {
  return Date.UTC(d.y, d.m - 1, d.d);
}

function fromUTC(ms: number): YMD {
  const dt = new Date(ms);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

export function addDays(iso: string, days: number): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Bad date ${iso}`);
  return toISO(fromUTC(toUTC(d) + days * 86400000));
}

/** Compare two ISO dates: negative if a < b. */
export function cmpISO(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Last day of the month that is `months` after the month of `iso`. */
export function endOfMonthAfter(iso: string, months: number): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Bad date ${iso}`);
  const idx = d.y * 12 + (d.m - 1) + months;
  const y = Math.floor(idx / 12);
  const m = (idx % 12) + 1;
  return toISO({ y, m, d: daysInMonth(y, m) });
}

/** The same calendar date `years` later (29 February → 28 February in a non-leap year). */
export function addYears(iso: string, years: number): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Bad date ${iso}`);
  const y = d.y + years;
  return toISO({ y, m: d.m, d: Math.min(d.d, daysInMonth(y, d.m)) });
}

/**
 * Whole years elapsed from `from` to `to` (anniversary based). A date on the
 * nth anniversary counts as n whole years.
 */
export function wholeYearsBetween(from: string, to: string): number {
  let n = 0;
  while (cmpISO(addYears(from, n + 1), to) <= 0) n++;
  return n;
}

/**
 * Bands of the kind "more than n but not more than n+1 years" used by IHT
 * taper relief (IHTA 1984 s7(4)) and quick succession relief (s141(3)):
 * returns n where `to` is more than n years and not more than n+1 years
 * after `from`. A death exactly on an anniversary falls in the lower band.
 */
export function yearsBandNotMoreThan(from: string, to: string): number {
  const whole = wholeYearsBetween(from, to);
  return cmpISO(addYears(from, whole), to) === 0 ? Math.max(0, whole - 1) : whole;
}

/** "2026/27" for any date from 6 April 2026 to 5 April 2027. */
export function taxYearOf(iso: string): string {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Bad date ${iso}`);
  const start = d.m > 4 || (d.m === 4 && d.d >= 6) ? d.y : d.y - 1;
  return `${start}/${String((start + 1) % 100).padStart(2, "0")}`;
}

/** Start year of a tax year label ("2026/27" → 2026). */
export function taxYearStart(taxYear: string): number {
  return Number(taxYear.slice(0, 4));
}

/** "30 June 2026". */
export function longDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return new Date(Date.UTC(d.y, d.m - 1, d.d, 12)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Position of a date on a continuous month scale: whole months since year 0
 * plus the fraction of the month elapsed before that day. The span of an
 * inclusive period [start, end] is monthPos(end + 1 day) − monthPos(start),
 * which gives whole months for periods running from the 1st to a month end.
 */
export function monthPos(iso: string): number {
  const d = parseISODate(iso);
  if (!d) throw new Error(`Bad date ${iso}`);
  return d.y * 12 + (d.m - 1) + (d.d - 1) / daysInMonth(d.y, d.m);
}
