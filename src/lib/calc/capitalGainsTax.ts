import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "./common";

export interface CapitalGainsTaxInput {
  taxYear: string;
  /** Total chargeable gains for the year after current-year losses, INCLUDING any BADR gains. */
  gains: number;
  /** The part of `gains` that qualifies for Business Asset Disposal Relief. */
  badrGains: number;
  /** Taxable income after the personal allowance (decides how much basic rate band is left). */
  otherTaxableIncome: number;
  /** Capital losses brought forward from earlier years. */
  lossesBroughtForward: number;
  /** BADR lifetime limit already used by earlier claims (default 0). */
  badrLifetimeUsed?: number;
}

export interface CapitalGainsTaxResult extends CalcResult {
  lossesUsed: number;
  lossesCarriedForward: number;
  annualExemptAmountUsed: number;
  badrTaxableGains: number;
  ordinaryTaxableGains: number;
  /** BADR-claimed gains above the remaining lifetime limit, taxed at the normal rates. */
  badrOverLimit: number;
  unusedBasicRateBand: number;
  /** Tax ÷ total gains, or null when gains are nil. */
  effectiveRate: number | null;
}

export function validateCapitalGainsTax(i: CapitalGainsTaxInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Total gains", i.gains);
  requireNonNegative(e, "BADR gains", i.badrGains);
  requireNonNegative(e, "Taxable income", i.otherTaxableIncome);
  requireNonNegative(e, "Losses brought forward", i.lossesBroughtForward);
  requireNonNegative(e, "BADR lifetime limit already used", i.badrLifetimeUsed);
  if (i.gains >= 0 && i.badrGains > i.gains) e.push("BADR gains can't be more than total gains (total gains include the BADR gains).");
  return e;
}

/**
 * CGT for an individual: brought-forward losses (only down to the annual
 * exempt amount), the annual exempt amount, BADR gains at the BADR rate using
 * the unused basic rate band first, then other gains at the basic CGT rate
 * within any band left and the higher rate above it.
 *
 * Losses and the annual exempt amount are set against non-BADR gains first,
 * because those gains are never taxed at less than the BADR rate — the
 * allocation that gives the lowest tax (TCGA 1992 s4B).
 */
export function capitalGainsTax(input: CapitalGainsTaxInput): CapitalGainsTaxResult {
  const errors = validateCapitalGainsTax(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const aea = R.gbp("cgt.annual-exempt-amount");
  const brb = R.gbp("it.basic-rate-band");
  const basicRate = R.percent("cgt.basic-rate");
  const higherRate = R.percent("cgt.higher-rate");

  const working: WorkingLine[] = [];
  const notes: string[] = [];

  let badr = input.badrGains;
  let badrOverLimit = 0;
  if (badr > 0) {
    const limit = R.gbp("cgt.badr-lifetime-limit");
    const remaining = Math.max(0, limit - (input.badrLifetimeUsed ?? 0));
    badrOverLimit = Math.max(0, badr - remaining);
    badr -= badrOverLimit;
  }
  let ordinary = input.gains - input.badrGains + badrOverLimit;

  working.push({ label: "Total chargeable gains", amount: input.gains });
  if (input.badrGains > 0) {
    working.push({ label: "of which qualifying for BADR", amount: input.badrGains, kind: "memo" });
    if (badrOverLimit > 0) {
      working.push({
        label: `BADR gains above the remaining ${gbp(R.gbp("cgt.badr-lifetime-limit"))} lifetime limit, taxed at normal rates`,
        amount: badrOverLimit,
        rateId: "cgt.badr-lifetime-limit",
        kind: "memo",
      });
    }
  }

  // Brought-forward losses reduce gains only as far as the annual exempt amount.
  const lossesUsed = Math.min(input.lossesBroughtForward, Math.max(0, input.gains - aea));
  if (input.lossesBroughtForward > 0) {
    working.push({ label: "Less losses brought forward (only down to the annual exempt amount)", amount: -lossesUsed });
  }
  let toAllocate = lossesUsed;
  const fromOrdinary = Math.min(ordinary, toAllocate);
  ordinary -= fromOrdinary; toAllocate -= fromOrdinary;
  badr -= toAllocate;

  const aeaUsed = Math.min(aea, ordinary + badr);
  working.push({ label: "Less annual exempt amount", amount: -aeaUsed, rateId: "cgt.annual-exempt-amount" });
  let aeaLeft = aeaUsed;
  const aeaOrd = Math.min(ordinary, aeaLeft);
  ordinary -= aeaOrd; aeaLeft -= aeaOrd;
  badr -= aeaLeft;
  working.push({ label: "Taxable gains", amount: r2(ordinary + badr), kind: "subtotal" });

  const unusedBand = Math.max(0, brb - input.otherTaxableIncome);
  working.push({
    label: `Unused basic rate band: ${gbp(brb)} − taxable income ${gbp(input.otherTaxableIncome)}`,
    amount: r2(unusedBand),
    rateId: "it.basic-rate-band",
    kind: "memo",
  });

  let tax = 0;
  let bandLeft = unusedBand;
  if (badr > 0) {
    const badrRate = R.percent("cgt.badr-rate");
    const t = (badr * badrRate) / 100;
    tax += t;
    working.push({ label: `BADR gains ${gbp(badr)} × ${pctLabel(badrRate)} (use the basic rate band first)`, amount: r2(t), rateId: "cgt.badr-rate" });
    bandLeft = Math.max(0, bandLeft - badr);
  }
  if (ordinary > 0) {
    const inBand = Math.min(ordinary, bandLeft);
    const above = ordinary - inBand;
    if (inBand > 0) {
      const t = (inBand * basicRate) / 100;
      tax += t;
      working.push({ label: `Other gains ${gbp(inBand)} within the basic rate band × ${pctLabel(basicRate)}`, amount: r2(t), rateId: "cgt.basic-rate" });
    }
    if (above > 0) {
      const t = (above * higherRate) / 100;
      tax += t;
      working.push({ label: `Other gains ${gbp(above)} above the basic rate band × ${pctLabel(higherRate)}`, amount: r2(t), rateId: "cgt.higher-rate" });
    }
  }
  const taxR = r2(tax);
  working.push({ label: "Capital gains tax payable", amount: taxR, kind: "total" });

  const cf = input.lossesBroughtForward - lossesUsed;
  if (cf > 0) working.push({ label: "Losses carried forward", amount: r2(cf), kind: "memo" });

  notes.push("Individuals only (not trustees or personal representatives). Residential property and other assets use the same rates; carried interest isn't covered.");
  notes.push("The basic rate band isn't extended for Gift Aid or relief-at-source pension contributions here; if the client has them, extend it before using this result.");
  if (input.badrGains > 0) notes.push("BADR must be claimed, and the qualifying conditions and disposal date (anti-forestalling rules) checked separately.");

  return {
    taxYear: input.taxYear,
    tax: taxR,
    working,
    rateIds: [...R.used],
    notes,
    lossesUsed: r2(lossesUsed),
    lossesCarriedForward: r2(cf),
    annualExemptAmountUsed: r2(aeaUsed),
    badrTaxableGains: r2(badr),
    ordinaryTaxableGains: r2(ordinary),
    badrOverLimit: r2(badrOverLimit),
    unusedBasicRateBand: r2(unusedBand),
    effectiveRate: input.gains > 0 ? taxR / input.gains : null,
  };
}
