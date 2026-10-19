import { type CalcResult, type WorkingLine, CalcInputError, STATUTORY, gbp, pctLabel, r2, rateReader, requireNonNegative } from "./common";

export interface InheritanceTaxInput {
  taxYear: string;
  /** Net value of the estate on death: assets less debts and funeral costs, before exemptions and reliefs. */
  estate: number;
  /** Value of the home (or share of it) inherited by direct descendants. */
  rnrbEligibleHomeToDescendants: number;
  /** Unused nil rate band transferred from a late spouse/civil partner, as a percentage (0–100). */
  transferredNrbPercent: number;
  /** Unused residence nil rate band transferred from a late spouse/civil partner, as a percentage (0–100). */
  transferredRnrbPercent: number;
  /** Gifts to UK charities in the will (exempt). */
  charityGifts: number;
  /** Left to a spouse or civil partner (exempt). Default 0. */
  spouseExempt?: number;
}

export interface InheritanceTaxResult extends CalcResult {
  nilRateBand: number;
  residenceNilRateBand: number;
  rnrbTaperReduction: number;
  chargeableEstate: number;
  taxableAboveBands: number;
  baselineAmount: number;
  charityRateApplies: boolean;
  /** Tax ÷ net estate, or null when the estate is nil. */
  effectiveRate: number | null;
}

export function validateInheritanceTax(i: InheritanceTaxInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Estate", i.estate);
  requireNonNegative(e, "Home left to direct descendants", i.rnrbEligibleHomeToDescendants);
  requireNonNegative(e, "Charity gifts", i.charityGifts);
  requireNonNegative(e, "Left to spouse or civil partner", i.spouseExempt);
  for (const [label, v] of [
    ["Transferred nil rate band", i.transferredNrbPercent],
    ["Transferred residence nil rate band", i.transferredRnrbPercent],
  ] as const) {
    if (!Number.isFinite(v) || v < 0 || v > 100) e.push(`${label} must be a percentage from 0 to 100.`);
  }
  if (i.rnrbEligibleHomeToDescendants > i.estate) e.push("The home left to descendants can't be worth more than the whole estate.");
  if (i.charityGifts + (i.spouseExempt ?? 0) > i.estate) e.push("Charity and spouse gifts together can't be more than the estate.");
  return e;
}

/**
 * IHT on a death estate (single "general component", no lifetime gifts).
 *
 * - NRB = nil rate band × (1 + transferred %).
 * - RNRB = residence nil rate band × (1 + transferred %), tapered by £1 for every
 *   £2 the net estate exceeds the taper threshold, then capped at the value of
 *   the home passing to direct descendants.
 * - Reduced charity rate where the charity gifts are at least 10% of the
 *   baseline amount: (chargeable estate − NRB available) + charity gifts. The
 *   RNRB is not deducted (IHTM45009, IHTM45010:
 *   https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm45009).
 */
export function inheritanceTax(input: InheritanceTaxInput): InheritanceTaxResult {
  const errors = validateInheritanceTax(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const nrb0 = R.gbp("iht.nil-rate-band");
  const rnrb0 = R.gbp("iht.residence-nil-rate-band");
  const taperFrom = R.gbp("iht.rnrb-taper-threshold");
  const fullRate = R.percent("iht.rate");

  const spouse = input.spouseExempt ?? 0;
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  working.push({ label: "Net estate (after debts and funeral costs)", amount: input.estate });
  if (spouse > 0) working.push({ label: "Less left to spouse or civil partner (exempt)", amount: -spouse });
  if (input.charityGifts > 0) working.push({ label: "Less gifts to charity (exempt)", amount: -input.charityGifts });
  const chargeable = Math.max(0, input.estate - spouse - input.charityGifts);
  working.push({ label: "Chargeable estate", amount: chargeable, kind: "subtotal" });

  // Nil rate band, plus any transferred from a late spouse.
  const nrbTransferred = (nrb0 * input.transferredNrbPercent) / 100;
  const nrb = nrb0 + nrbTransferred;
  working.push({ label: "Nil rate band", amount: nrb0, rateId: "iht.nil-rate-band", kind: "memo" });
  if (nrbTransferred > 0) {
    working.push({ label: `Transferred nil rate band: ${pctLabel(input.transferredNrbPercent)} × ${gbp(nrb0)}`, amount: r2(nrbTransferred), rateId: "iht.nil-rate-band", kind: "memo" });
  }

  // Residence nil rate band: own + transferred, tapered, then capped at the home.
  let rnrb = 0;
  let taperReduction = 0;
  if (input.rnrbEligibleHomeToDescendants > 0) {
    const rnrbTransferred = (rnrb0 * input.transferredRnrbPercent) / 100;
    const rnrbMax = rnrb0 + rnrbTransferred;
    working.push({ label: "Residence nil rate band", amount: rnrb0, rateId: "iht.residence-nil-rate-band", kind: "memo" });
    if (rnrbTransferred > 0) {
      working.push({
        label: `Transferred residence nil rate band: ${pctLabel(input.transferredRnrbPercent)} × ${gbp(rnrb0)}`,
        amount: r2(rnrbTransferred),
        rateId: "iht.residence-nil-rate-band",
        kind: "memo",
      });
    }
    if (input.estate > taperFrom) {
      taperReduction = Math.min(rnrbMax, (input.estate - taperFrom) * STATUTORY.rnrbTaperFraction);
      working.push({
        label: `Taper: (${gbp(input.estate)} − ${gbp(taperFrom)}) × 1/${1 / STATUTORY.rnrbTaperFraction}`,
        amount: -r2(taperReduction),
        rateId: "iht.rnrb-taper-threshold",
        kind: "memo",
      });
    }
    const afterTaper = rnrbMax - taperReduction;
    rnrb = Math.min(afterTaper, input.rnrbEligibleHomeToDescendants);
    if (input.rnrbEligibleHomeToDescendants < afterTaper) {
      working.push({ label: `Capped at the value of the home left to descendants (${gbp(input.rnrbEligibleHomeToDescendants)})`, amount: 0, kind: "note" });
    }
  } else {
    working.push({ label: "No home left to direct descendants, so no residence nil rate band (any unused RNRB may transfer to a surviving spouse)", amount: 0, kind: "note" });
  }

  const rnrbUsed = Math.min(rnrb, chargeable);
  const nrbUsed = Math.min(nrb, chargeable - rnrbUsed);
  if (rnrb > 0) working.push({ label: "Less residence nil rate band", amount: -r2(rnrbUsed), rateId: "iht.residence-nil-rate-band" });
  working.push({ label: "Less nil rate band available", amount: -r2(nrbUsed), rateId: "iht.nil-rate-band" });
  const taxable = Math.max(0, chargeable - rnrbUsed - nrbUsed);
  working.push({ label: "Taxable above the nil rate bands", amount: r2(taxable), kind: "subtotal" });

  // Charity reduced rate: baseline excludes the RNRB (IHTM45009).
  const baseline = Math.max(0, chargeable - nrb) + input.charityGifts;
  let ratePct = fullRate;
  let rateId = "iht.rate";
  let charityApplies = false;
  if (input.charityGifts > 0) {
    const needed = (baseline * STATUTORY.charityConditionPercent) / 100;
    charityApplies = input.charityGifts >= needed && taxable > 0;
    working.push({
      label: `Baseline amount: (${gbp(chargeable)} − ${gbp(nrb)} nil rate band) + ${gbp(input.charityGifts)} charity`,
      amount: r2(baseline),
      kind: "memo",
    });
    working.push({
      label: `Charity gifts ${gbp(input.charityGifts)} ${input.charityGifts >= needed ? "are" : "are not"} at least ${STATUTORY.charityConditionPercent}% of the baseline (${gbp(needed)})`,
      amount: 0,
      kind: "note",
    });
    if (charityApplies) {
      ratePct = R.percent("iht.charity-rate");
      rateId = "iht.charity-rate";
    }
  }

  const tax = r2((taxable * ratePct) / 100);
  working.push({ label: `${gbp(taxable)} × ${pctLabel(ratePct)}`, amount: tax, rateId });
  working.push({ label: "Inheritance tax payable on the estate", amount: tax, kind: "total" });

  notes.push(
    "Assumes no gifts in the 7 years before death, no business or agricultural relief, and a single estate component: jointly owned assets passing by survivorship, trust property and gifts with reservation are separate components for the charity rate test and aren't modelled."
  );
  notes.push("The residence nil rate band needs a home (or share) the deceased lived in passing to direct descendants; downsizing relief isn't covered.");
  if (input.charityGifts > 0) {
    notes.push("Charity rate test uses the baseline amount in IHTM45009–45010 (single component, no lifetime cumulative total, no grossing up).");
  }

  return {
    taxYear: input.taxYear,
    tax,
    working,
    rateIds: [...R.used],
    notes,
    nilRateBand: r2(nrb),
    residenceNilRateBand: r2(rnrb),
    rnrbTaperReduction: r2(taperReduction),
    chargeableEstate: r2(chargeable),
    taxableAboveBands: r2(taxable),
    baselineAmount: r2(baseline),
    charityRateApplies: charityApplies,
    effectiveRate: input.estate > 0 ? tax / input.estate : null,
  };
}
