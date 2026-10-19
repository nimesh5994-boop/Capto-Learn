import type { RateItem, TaxYearRates } from "./types";
import { rates as rates2026 } from "./2026-27";
import { rates as rates2025 } from "./2025-26";

export type { RateItem, RateSection, RateSource, TaxYearRates } from "./types";

/** All tax years with verified data, newest first. */
export const TAX_YEARS: TaxYearRates[] = [rates2026, rates2025];

export function ratesFor(taxYear: string): TaxYearRates | undefined {
  return TAX_YEARS.find((y) => y.taxYear === taxYear);
}

/**
 * The UK tax year (e.g. "2026/27") containing `now`. A tax year runs from
 * 6 April to 5 April. Uses the date as seen in Europe/London so a UTC server
 * agrees with UK staff around midnight on 5/6 April.
 */
export function currentTaxYear(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const startYear = month > 4 || (month === 4 && day >= 6) ? year : year - 1;
  return `${startYear}/${String((startYear + 1) % 100).padStart(2, "0")}`;
}

/** Look up one figure by id (e.g. rate("2026/27", "it.personal-allowance")). */
export function rate(taxYear: string, id: string): RateItem | undefined {
  const year = ratesFor(taxYear);
  if (!year) return undefined;
  for (const section of year.sections) {
    const item = section.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}
