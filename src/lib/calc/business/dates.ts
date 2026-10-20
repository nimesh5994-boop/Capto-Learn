/**
 * Calendar helpers for the business calculators. Dates are ISO strings (yyyy-mm-dd) and all
 * arithmetic is done on whole UTC days, so there are no time-zone or daylight-saving surprises.
 */

const DAY = 86400000;

export function isIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** Days since 1970-01-01 for an ISO date. */
export function dayNum(iso: string): number {
  return Math.round(new Date(`${iso}T00:00:00Z`).getTime() / DAY);
}

export function fromDayNum(n: number): string {
  return new Date(n * DAY).toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return fromDayNum(dayNum(iso) + days);
}

/** b − a in days (0 when equal). HMRC interest counts days this way (CH140220). */
export function daysBetween(a: string, b: string): number {
  return dayNum(b) - dayNum(a);
}

/** Number of days from start to end, counting both. */
export function daysInclusive(start: string, end: string): number {
  return dayNum(end) - dayNum(start) + 1;
}

function parts(iso: string): [number, number, number] {
  return [Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), Number(iso.slice(8, 10))];
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function iso(y: number, m: number, d: number): string {
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function isLastDayOfMonth(s: string): boolean {
  const [y, m, d] = parts(s);
  return d === daysInMonth(y, m);
}

/**
 * The correspondingly numbered day `n` months later; the last day of that month if there is no
 * such day (e.g. 31 August + 6 months = 28/29 February).
 */
export function addMonths(s: string, n: number): string {
  const [y, m, d] = parts(s);
  const total = y * 12 + (m - 1) + n;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return iso(ny, nm, Math.min(d, daysInMonth(ny, nm)));
}

/** "n months later" where a month-end date maps to the month-end (CTM92560 rule for instalments). */
export function addMonthsMonthEnd(s: string, n: number): string {
  const out = addMonths(s, n);
  if (!isLastDayOfMonth(s)) return out;
  const [y, m] = parts(out);
  return iso(y, m, daysInMonth(y, m));
}

export function lastDayOfMonth(s: string): string {
  const [y, m] = parts(s);
  return iso(y, m, daysInMonth(y, m));
}

export function firstOfMonth(s: string): string {
  return `${s.slice(0, 7)}-01`;
}

/** Corporation tax financial year containing the date (FY2026 = 1 April 2026 to 31 March 2027). */
export function financialYearOf(s: string): number {
  const [y, m] = parts(s);
  return m >= 4 ? y : y - 1;
}

/** Income tax year label containing the date, e.g. "2026/27" (6 April to 5 April). */
export function taxYearOf(s: string): string {
  const [y, m, d] = parts(s);
  const start = m > 4 || (m === 4 && d >= 6) ? y : y - 1;
  return `${start}/${String((start + 1) % 100).padStart(2, "0")}`;
}

export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** Days in a financial year (366 when it contains 29 February). */
export function daysInFinancialYear(fy: number): number {
  return isLeapYear(fy + 1) ? 366 : 365;
}

/** "14 July 2026". */
export function longDate(s: string): string {
  return new Date(`${s}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** "1 Jan 2026". */
export function shortDate(s: string): string {
  return new Date(`${s}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function minDate(a: string, b: string): string {
  return a <= b ? a : b;
}

export function maxDate(a: string, b: string): string {
  return a >= b ? a : b;
}

/**
 * Whole months plus spare days ÷ 30 from `start` to `end` inclusive, to 2 decimal places
 * (the CTM92600 rule for "n" in the instalment formula; e.g. 1 Jan–28 Jul = 6.93).
 */
export function monthsForInstalments(start: string, end: string): number {
  const after = addDays(end, 1);
  let whole = 0;
  while (addMonths(start, whole + 1) <= after && whole < 1200) whole++;
  const spare = daysBetween(addMonths(start, whole), after);
  return Math.round((whole + spare / 30) * 100) / 100;
}

/**
 * Length in whole calendar months when the period runs from a day to the day before the same day
 * n months later (1 Apr–30 Sep = 6), else null. Used for "months" pro-rating options.
 */
export function wholeMonths(start: string, end: string): number | null {
  const after = addDays(end, 1);
  for (let n = 1; n <= 600; n++) {
    const t = addMonths(start, n);
    if (t === after) return n;
    if (t > after) return null;
  }
  return null;
}
