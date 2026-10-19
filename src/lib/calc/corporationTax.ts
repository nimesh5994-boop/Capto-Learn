import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "./common";

export interface CorporationTaxInput {
  /** Tax year key from the dataset (e.g. "2026/27"); CT uses the financial year starting 1 April in its first calendar year. */
  taxYear: string;
  /** Taxable total profits (N). */
  profits: number;
  /** Augmented profits (A) = TTP + exempt distributions from non-group companies. Defaults to `profits`. */
  augmentedProfits?: number;
  /** Number of associated companies (not counting this one). */
  associatedCompanies: number;
  /** Length of the accounting period in months (1–12). */
  periodMonths: number;
}

export interface CorporationTaxResult extends CalcResult {
  lowerLimit: number;
  upperLimit: number;
  augmentedProfits: number;
  marginalRelief: number;
  band: "small" | "marginal" | "main";
  /** Tax ÷ taxable total profits, or null when profits are nil. */
  effectiveRate: number | null;
}

/** Sanity cap on associated companies; more than this is almost certainly a typing error. */
export const MAX_ASSOCIATED_COMPANIES = 99;

export function validateCorporationTax(i: CorporationTaxInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Taxable total profits", i.profits);
  requireNonNegative(e, "Augmented profits", i.augmentedProfits);
  if (i.augmentedProfits !== undefined && Number.isFinite(i.augmentedProfits) && i.augmentedProfits < i.profits) {
    e.push("Augmented profits can't be less than taxable total profits (they are TTP plus exempt dividends received).");
  }
  if (!Number.isInteger(i.associatedCompanies) || i.associatedCompanies < 0) e.push("Associated companies must be a whole number, 0 or more.");
  else if (i.associatedCompanies > MAX_ASSOCIATED_COMPANIES) {
    e.push(`More than ${MAX_ASSOCIATED_COMPANIES} associated companies looks like a typing error — check the number.`);
  }
  if (!Number.isInteger(i.periodMonths) || i.periodMonths < 1 || i.periodMonths > 12) {
    e.push("Accounting period must be 1 to 12 whole months (an accounting period can't exceed 12 months).");
  }
  return e;
}

/**
 * Corporation tax for one accounting period, with marginal relief.
 *
 * Limits are pro-rated for a short period (× months / 12) and divided by
 * (1 + associated companies). Augmented profits decide the band; tax is
 * charged on taxable total profits:
 *   MR = F × (U − A) × N / A
 * (CTM03925: https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925)
 */
export function corporationTax(input: CorporationTaxInput): CorporationTaxResult {
  const errors = validateCorporationTax(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const N = input.profits;
  const A = input.augmentedProfits ?? input.profits;
  const divisor = input.associatedCompanies + 1;
  const factor = input.periodMonths / 12;

  const smallRate = R.percent("ct.small-profits-rate");
  const mainRate = R.percent("ct.main-rate");
  const lowerBase = R.gbp("ct.lower-limit");
  const upperBase = R.gbp("ct.upper-limit");
  const F = R.fraction("ct.marginal-relief-fraction");

  const lower = (lowerBase * factor) / divisor;
  const upper = (upperBase * factor) / divisor;

  const working: WorkingLine[] = [{ label: "Taxable total profits (N)", amount: N }];
  if (A !== N) {
    working.push({ label: "Add exempt distributions received", amount: A - N });
    working.push({ label: "Augmented profits (A)", amount: A, kind: "subtotal" });
  }
  const limitNote =
    (input.periodMonths !== 12 ? ` × ${input.periodMonths}/12` : "") + (divisor > 1 ? ` ÷ ${divisor}` : "");
  working.push({ label: `Lower limit: ${gbp(lowerBase)}${limitNote}`, amount: r2(lower), rateId: "ct.lower-limit", kind: "memo" });
  working.push({ label: `Upper limit: ${gbp(upperBase)}${limitNote}`, amount: r2(upper), rateId: "ct.upper-limit", kind: "memo" });

  let tax: number;
  let mr = 0;
  let band: CorporationTaxResult["band"];
  const notes: string[] = [];

  if (A <= lower) {
    band = "small";
    tax = N * (smallRate / 100);
    working.push({ label: `Augmented profits ${gbp(A)} do not exceed the lower limit: small profits rate`, amount: 0, kind: "note" });
    working.push({ label: `${gbp(N)} × ${pctLabel(smallRate)}`, amount: r2(tax), rateId: "ct.small-profits-rate" });
  } else if (A >= upper) {
    band = "main";
    tax = N * (mainRate / 100);
    working.push({ label: `Augmented profits ${gbp(A)} are at or above the upper limit: main rate, no marginal relief`, amount: 0, kind: "note" });
    working.push({ label: `${gbp(N)} × ${pctLabel(mainRate)}`, amount: r2(tax), rateId: "ct.main-rate" });
  } else {
    band = "marginal";
    const atMain = N * (mainRate / 100);
    // A > lower ≥ 0 here, so the N / A division is safe.
    mr = F * (upper - A) * (N / A);
    tax = atMain - mr;
    working.push({ label: `${gbp(N)} × ${pctLabel(mainRate)}`, amount: r2(atMain), rateId: "ct.main-rate" });
    const ratio = A === N ? "" : ` × ${gbp(N)} / ${gbp(A)}`;
    working.push({
      label: `Less marginal relief: ${R.display("ct.marginal-relief-fraction")} × (${gbp(upper)} − ${gbp(A)})${ratio}`,
      amount: -r2(mr),
      rateId: "ct.marginal-relief-fraction",
    });
  }

  const taxR = r2(tax);
  working.push({ label: "Corporation tax payable", amount: taxR, kind: "total" });
  if (input.periodMonths !== 12) {
    notes.push("Short period: the limits are pro-rated by months here. HMRC's statutory apportionment is by days, so check a period with part months.");
  }
  notes.push(
    `Uses the financial year ${input.taxYear.slice(0, 4)} rates (1 April ${input.taxYear.slice(0, 4)} onwards). If the accounting period straddles 31 March and the rates differ between the two financial years, the profits must be time-apportioned; this calculator doesn't do that.`
  );

  return {
    taxYear: input.taxYear,
    tax: taxR,
    working,
    rateIds: [...R.used],
    notes,
    lowerLimit: r2(lower),
    upperLimit: r2(upper),
    augmentedProfits: A,
    marginalRelief: r2(mr),
    band,
    effectiveRate: N > 0 ? taxR / N : null,
  };
}
