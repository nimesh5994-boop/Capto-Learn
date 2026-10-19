/**
 * UK tax rates & allowances dataset types.
 *
 * Every figure carries the official source it was verified against. Figures
 * are only added after checking them against a live official page (GOV.UK,
 * HMRC manuals, legislation.gov.uk, The Pensions Regulator, Companies House) —
 * never from memory. `checkedOn` on the tax year records when that was done.
 */

export interface RateSource {
  title: string;
  url: string;
}

export interface RateItem {
  /** Stable id, prefixed by section (e.g. "it.personal-allowance"). Calculators depend on these. */
  id: string;
  label: string;
  /** Human-readable value exactly as staff should quote it (e.g. "£12,570", "20%"). */
  value: string;
  /** Machine-readable value. Percentages are plain numbers (20, not 0.2); fractions are decimals. */
  amount?: number;
  unit?: "GBP" | "percent" | "pence" | "fraction" | "text";
  note?: string;
  source: RateSource;
}

export interface RateSection {
  id: string;
  title: string;
  items: RateItem[];
}

export interface TaxYearRates {
  /** e.g. "2026/27" */
  taxYear: string;
  /** ISO date, e.g. "2026-04-06" */
  startDate: string;
  /** ISO date, e.g. "2027-04-05" */
  endDate: string;
  /** yyyy-mm-dd — the date every figure in this year was last checked against its source. */
  checkedOn: string;
  sections: RateSection[];
}
