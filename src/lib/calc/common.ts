/**
 * Shared plumbing for the tax calculators.
 *
 * Every rate, band and threshold is read from the verified dataset in
 * src/content/rates via `rate(taxYear, id)`. A calculator never hard-codes a
 * figure that the dataset holds; if an id is missing (or has no machine
 * amount) the calculator throws `MissingRateError` rather than guessing.
 *
 * Pure TypeScript: no React, no DB. Safe to import from client components.
 */
import { rate, ratesFor } from "@/content/rates";

export interface WorkingLine {
  label: string;
  amount: number;
  /** Rate id the line applies (for linking to its GOV.UK source in the UI). */
  rateId?: string;
  /**
   * Presentation hint. "line" (default) is part of the computation; "memo" is a
   * figure shown for reference only (e.g. a limit or band); "subtotal" and
   * "total" are sums; "note" is an explanatory line whose amount is not shown.
   */
  kind?: "line" | "memo" | "subtotal" | "total" | "note";
}

export interface CalcResult {
  taxYear: string;
  /** The headline liability, rounded to the penny. */
  tax: number;
  working: WorkingLine[];
  /** Every rate id the calculation read, in first-use order. */
  rateIds: string[];
  /** Plain-English caveats specific to this calculation. */
  notes: string[];
}

export class MissingRateError extends Error {
  constructor(
    public readonly taxYear: string,
    public readonly id: string,
    reason: string
  ) {
    super(`Rate "${id}" for ${taxYear}: ${reason}`);
    this.name = "MissingRateError";
  }
}

export class CalcInputError extends Error {
  constructor(public readonly errors: string[]) {
    super(errors.join(" "));
    this.name = "CalcInputError";
  }
}

/** Round to the penny (half away from zero for positive values). */
export function r2(x: number): number {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

/** "£1,234" or "£1,234.56". */
export function gbp(n: number): string {
  const v = r2(n);
  const abs = Math.abs(v).toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${v < 0 ? "−" : ""}£${abs}`;
}

/** "20%" / "10.75%". */
export function pctLabel(p: number): string {
  return `${Number(p.toFixed(4))}%`;
}

/**
 * A rate reader bound to one tax year that records every id it reads.
 */
export function rateReader(taxYear: string) {
  if (!ratesFor(taxYear)) throw new MissingRateError(taxYear, "*", "no verified dataset for this tax year");
  const used: string[] = [];
  const read = (id: string, unit: "GBP" | "percent" | "fraction"): number => {
    const item = rate(taxYear, id);
    if (!item) throw new MissingRateError(taxYear, id, "id not found in the dataset");
    if (item.amount === undefined || item.unit !== unit) {
      throw new MissingRateError(taxYear, id, `expected a ${unit} amount, found ${item.unit ?? "none"}`);
    }
    if (!used.includes(id)) used.push(id);
    return item.amount;
  };
  return {
    /** A £ figure. */
    gbp: (id: string) => read(id, "GBP"),
    /** A percentage as a plain number (20 for 20%). */
    percent: (id: string) => read(id, "percent"),
    /** A fraction as a decimal (0.015 for 3/200). */
    fraction: (id: string) => read(id, "fraction"),
    /** The figure as staff quote it (e.g. "3/200"); only call after reading the id. */
    display: (id: string) => rate(taxYear, id)?.value ?? id,
    used,
  };
}

export function requireNonNegative(errors: string[], label: string, v: number | undefined) {
  if (v === undefined) return;
  if (!Number.isFinite(v)) errors.push(`${label} must be a number.`);
  else if (v < 0) errors.push(`${label} can't be negative.`);
}

/** The working as plain text, for pasting into a file note. */
export function workingAsText(title: string, result: CalcResult, extra: string[] = []): string {
  const width = Math.max(...result.working.map((w) => w.label.length), 20);
  const lines = result.working.map((w) => {
    if (w.kind === "note") return `  (${w.label})`;
    const amt = w.kind === "memo" ? `[${gbp(w.amount)}]` : gbp(w.amount);
    const line = `${w.label.padEnd(width)}  ${amt.padStart(14)}`;
    return w.kind === "total" ? `${"".padEnd(width + 16, "-")}\n${line}` : line;
  });
  const year = ratesFor(result.taxYear);
  return [
    `${title} — ${result.taxYear}`,
    "",
    ...lines,
    ...(result.notes.length ? ["", "Notes:", ...result.notes.map((n) => `- ${n}`)] : []),
    ...extra,
    "",
    `Rates verified against GOV.UK on ${year?.checkedOn ?? "?"}. Calculation aid only, not advice.`,
  ].join("\n");
}

/**
 * Statutory rules that are fixed in legislation but are NOT (yet) held as
 * machine-readable ids in src/content/rates. They live here, in one place,
 * so they can be moved into the dataset when ids are added. Each one is
 * reported as a missing id.
 */
export const STATUTORY = {
  /**
   * RNRB taper: £1 for every £2 of net estate above the taper threshold
   * (IHTA 1984 s8D(5)). Missing id: "iht.rnrb-taper-rate".
   * Source: https://www.gov.uk/guidance/inheritance-tax-residence-nil-rate-band
   */
  rnrbTaperFraction: 1 / 2,
  /**
   * Charity reduced rate condition: donated amount ≥ 10% of the baseline
   * amount (IHTA 1984 Sch 1A para 2). Missing id: "iht.charity-rate-condition".
   * Source: https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm45002
   */
  charityConditionPercent: 10,
} as const;
