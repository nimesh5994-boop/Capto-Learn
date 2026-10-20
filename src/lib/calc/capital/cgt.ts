/**
 * Capital gains tax for a tax year with a schedule of disposals: individuals,
 * trustees and personal representatives; current-year and brought-forward
 * losses; BADR and Investors' Relief with their lifetime limits; residential
 * property 60-day returns; payment dates.
 *
 * Pure TypeScript. Every rate and threshold is read from src/content/rates.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { addDays, cmpISO, isValidISODate, longDate, taxYearOf, taxYearStart } from "./dates";

export type CgtTaxpayer = "individual" | "trustee" | "trustee-disabled" | "pr";
export type DisposalRelief = "none" | "badr" | "ir";

export interface CgtDisposal {
  /** Short description, e.g. "Buy-to-let flat". */
  label?: string;
  /** Completion date (ISO). Needed for the 60-day return on UK residential property. */
  completionDate?: string;
  proceeds: number;
  /** Acquisition cost (or market value / probate value where that is the base cost). */
  cost: number;
  /** Enhancement expenditure still reflected in the asset. */
  enhancement: number;
  /** Incidental costs of acquisition and disposal (legal fees, SDLT, agents' fees). */
  incidentalCosts: number;
  /** "residential" = UK residential property (60-day return). */
  assetType: "residential" | "other";
  relief: DisposalRelief;
  /** Private residence relief and lettings relief given on this disposal (residential only). */
  prrAndLettingsRelief?: number;
}

export interface CgtFullInput {
  taxYear: string;
  taxpayer: CgtTaxpayer;
  disposals: CgtDisposal[];
  lossesBroughtForward: number;
  /** Individuals: taxable income after the personal allowance. */
  taxableIncome?: number;
  /** Individuals: gross Gift Aid and relief-at-source pension contributions (extend the basic rate band). */
  basicRateBandExtension?: number;
  badrLifetimeUsed?: number;
  irLifetimeUsed?: number;
  /** Trustees: number of qualifying settlements in the settlor's group (default 1). */
  settlementsInGroup?: number;
  /** Personal representatives: is this the tax year of death or one of the next two? */
  prWithinThreeYears?: boolean;
  /** Non-UK resident: every UK property disposal needs a 60-day return, even with no tax. */
  nonResident?: boolean;
}

export interface DisposalResult {
  index: number;
  label: string;
  gain: number; // negative = loss
  sixtyDay?: { dueDate: string; returnNeeded: boolean; estimatedTax: number };
}

export interface CgtFullResult extends CalcResult {
  disposals: DisposalResult[];
  totalGains: number;
  currentYearLosses: number;
  lossesBroughtForwardUsed: number;
  lossesCarriedForward: number;
  annualExemptAmount: number;
  annualExemptAmountUsed: number;
  taxableGains: number;
  badrTaxable: number;
  irTaxable: number;
  ordinaryTaxable: number;
  badrOverLimit: number;
  irOverLimit: number;
  unusedBasicRateBand: number;
  /** Self Assessment due date for the balance (31 January after the tax year). */
  paymentDueDate: string;
  effectiveRate: number | null;
}

/**
 * Trust annual exempt amount for one of a group of settlements made by the same
 * settlor: the trust AEA divided by the number of qualifying settlements in the
 * group, but never less than one-tenth of the individual AEA.
 * TCGA 1992 Sch 1C paras 5–6; HMRC Capital Gains Manual CG18090:
 * https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg18090
 */
export const TRUST_AEA_MINIMUM_FRACTION = 1 / 10;

/**
 * Balancing payment for Self Assessment is due on 31 January after the end of
 * the tax year (TMA 1970 s59B). Lesson: business-asset-disposal-relief (Owen
 * Marsh, 2026/27 → 31 January 2028).
 */
function selfAssessmentDueDate(taxYear: string): string {
  return `${taxYearStart(taxYear) + 2}-01-31`;
}

/**
 * UK residential property: report and pay within 60 days of completion.
 * https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-sold-a-property-in-the-uk-on-or-after-6-april-2020
 */
export const SIXTY_DAY_RETURN_DAYS = 60;

export function disposalGain(d: CgtDisposal): number {
  const raw = d.proceeds - d.cost - d.enhancement - d.incidentalCosts;
  if (raw <= 0) return r2(raw);
  return r2(Math.max(0, raw - (d.prrAndLettingsRelief ?? 0)));
}

export function validateCgtFull(i: CgtFullInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Losses brought forward", i.lossesBroughtForward);
  requireNonNegative(e, "Taxable income", i.taxableIncome);
  requireNonNegative(e, "Basic rate band extension", i.basicRateBandExtension);
  requireNonNegative(e, "BADR lifetime limit already used", i.badrLifetimeUsed);
  requireNonNegative(e, "Investors' Relief lifetime limit already used", i.irLifetimeUsed);
  if (i.settlementsInGroup !== undefined && (!Number.isInteger(i.settlementsInGroup) || i.settlementsInGroup < 1)) {
    e.push("Number of settlements in the group must be a whole number, at least 1.");
  }
  i.disposals.forEach((d, n) => {
    const name = `Disposal ${n + 1}`;
    requireNonNegative(e, `${name}: proceeds`, d.proceeds);
    requireNonNegative(e, `${name}: cost`, d.cost);
    requireNonNegative(e, `${name}: enhancement`, d.enhancement);
    requireNonNegative(e, `${name}: incidental costs`, d.incidentalCosts);
    requireNonNegative(e, `${name}: PRR and lettings relief`, d.prrAndLettingsRelief);
    if ((d.prrAndLettingsRelief ?? 0) > 0 && d.assetType !== "residential") e.push(`${name}: private residence relief only applies to a dwelling.`);
    if (d.completionDate && !isValidISODate(d.completionDate)) e.push(`${name}: enter the completion date as a real date.`);
    if (d.completionDate && isValidISODate(d.completionDate) && taxYearOf(d.completionDate) !== i.taxYear) {
      e.push(`${name}: completion date ${longDate(d.completionDate)} is not in ${i.taxYear}.`);
    }
    if (d.relief !== "none" && i.taxpayer === "pr") e.push(`${name}: personal representatives can't claim BADR or Investors' Relief.`);
  });
  return e;
}

interface Pots {
  ordinary: number;
  badr: number;
  ir: number;
}

interface Engine {
  aea: number;
  band: number;
  ordinaryRateFor: (inBand: boolean) => { pct: number; id: string };
  badrRate: () => number;
  irRate: () => number;
  badrRemaining: number;
  irRemaining: number;
  /** Trustees and PRs: one flat rate for ordinary gains. */
  trustRate: boolean;
}

interface CoreResult {
  pots: Pots; // taxable after losses and AEA
  badrOverLimit: number;
  irOverLimit: number;
  totalGains: number;
  currentLosses: number;
  bfUsed: number;
  aeaUsed: number;
  cyUsed: number;
  tax: number;
  lines: WorkingLine[];
}

/** Set an amount against the pots in the order that gives the lowest tax: ordinary gains, then IR/BADR. */
function deduct(p: Pots, amount: number): number {
  let left = amount;
  for (const k of ["ordinary", "ir", "badr"] as const) {
    const t = Math.min(p[k], left);
    p[k] -= t;
    left -= t;
  }
  return amount - left;
}

/**
 * Core computation for a set of gains. Losses, brought-forward losses and the
 * annual exempt amount are set against gains taxed at the highest rate first
 * (the AEA and losses may be deducted in the way most beneficial to the
 * taxpayer, TCGA 1992 s1F). Current-year losses are set off in full, even
 * below the annual exempt amount; brought-forward losses only reduce gains
 * down to the annual exempt amount. HMRC Capital Gains Manual CG21500:
 * https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg21500
 * BADR and Investors' Relief gains use the unused basic rate band before
 * other gains (CG21204: only gains that don't qualify for BADR/IR depend on
 * the income tax position; lesson business-asset-disposal-relief).
 */
function core(gains: { gain: number; relief: DisposalRelief }[], lossesBf: number, E: Engine, withLines: boolean): CoreResult {
  const lines: WorkingLine[] = [];
  const pots: Pots = { ordinary: 0, badr: 0, ir: 0 };
  let currentLosses = 0;
  for (const g of gains) {
    if (g.gain < 0) currentLosses += -g.gain;
    else if (g.relief === "badr") pots.badr += g.gain;
    else if (g.relief === "ir") pots.ir += g.gain;
    else pots.ordinary += g.gain;
  }
  const totalGains = pots.ordinary + pots.badr + pots.ir;

  // Lifetime limits: anything above them is taxed at normal rates.
  const badrOver = Math.max(0, pots.badr - E.badrRemaining);
  pots.badr -= badrOver;
  pots.ordinary += badrOver;
  const irOver = Math.max(0, pots.ir - E.irRemaining);
  pots.ir -= irOver;
  pots.ordinary += irOver;

  if (withLines) {
    lines.push({ label: "Total gains for the year", amount: r2(totalGains), kind: "subtotal" });
    if (badrOver > 0) lines.push({ label: "BADR gains above the remaining lifetime limit, taxed at normal rates", amount: r2(badrOver), rateId: "cgt.badr-lifetime-limit", kind: "memo" });
    if (irOver > 0) lines.push({ label: "Investors' Relief gains above the remaining lifetime limit, taxed at normal rates", amount: r2(irOver), rateId: "cgt.investors-relief-lifetime-limit", kind: "memo" });
  }

  // Current-year losses must be set off in full, even below the annual exempt amount.
  const cyUsed = deduct(pots, currentLosses);
  if (withLines && currentLosses > 0) {
    lines.push({ label: "Less current-year losses (set off in full)", amount: -r2(cyUsed) });
    if (currentLosses > cyUsed) lines.push({ label: "Current-year losses not used this year (carried forward)", amount: r2(currentLosses - cyUsed), kind: "memo" });
  }
  const net = pots.ordinary + pots.badr + pots.ir;
  const bfUsed = deduct(pots, Math.min(lossesBf, Math.max(0, net - E.aea)));
  if (withLines) {
    lines.push({ label: "Net gains after current-year losses", amount: r2(net), kind: "subtotal" });
    if (lossesBf > 0) lines.push({ label: "Less losses brought forward (only down to the annual exempt amount)", amount: -r2(bfUsed) });
  }
  const aeaUsed = deduct(pots, E.aea);
  if (withLines) {
    lines.push({ label: "Less annual exempt amount", amount: -r2(aeaUsed), rateId: E.aea > 0 ? "cgt.annual-exempt-amount" : undefined });
    lines.push({ label: "Taxable gains", amount: r2(pots.ordinary + pots.badr + pots.ir), kind: "subtotal" });
  }

  let tax = 0;
  let band = E.band;
  for (const [k, rateFn, id, name] of [
    ["badr", E.badrRate, "cgt.badr-rate", "BADR gains"],
    ["ir", E.irRate, "cgt.investors-relief-rate", "Investors' Relief gains"],
  ] as const) {
    if (pots[k] > 0) {
      const rt = rateFn();
      const t = (pots[k] * rt) / 100;
      tax += t;
      band = Math.max(0, band - pots[k]);
      if (withLines) lines.push({ label: `${name} ${gbp(pots[k])} × ${pctLabel(rt)} (use the basic rate band first)`, amount: r2(t), rateId: id });
    }
  }
  if (pots.ordinary > 0) {
    const inBand = Math.min(pots.ordinary, band);
    const above = pots.ordinary - inBand;
    if (inBand > 0) {
      const r = E.ordinaryRateFor(true);
      const t = (inBand * r.pct) / 100;
      tax += t;
      if (withLines) lines.push({ label: `Other gains ${gbp(inBand)} within the basic rate band × ${pctLabel(r.pct)}`, amount: r2(t), rateId: r.id });
    }
    if (above > 0) {
      const r = E.ordinaryRateFor(false);
      const t = (above * r.pct) / 100;
      tax += t;
      if (withLines) {
        const where = r.id === "cgt.higher-rate" ? " above the basic rate band" : "";
        lines.push({ label: `${E.trustRate ? "Gains" : "Other gains"} ${gbp(above)}${where} × ${pctLabel(r.pct)}`, amount: r2(t), rateId: r.id });
      }
    }
  }
  return {
    pots,
    badrOverLimit: badrOver,
    irOverLimit: irOver,
    totalGains,
    currentLosses,
    bfUsed,
    aeaUsed,
    cyUsed,
    tax: r2(tax),
    lines,
  };
}

export function cgtFull(input: CgtFullInput): CgtFullResult {
  const errors = validateCgtFull(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const tp = input.taxpayer;

  // Annual exempt amount by taxpayer.
  const individualAea = R.gbp("cgt.annual-exempt-amount");
  let aea = individualAea;
  let aeaLabel = "Annual exempt amount";
  if (tp === "trustee" || tp === "trustee-disabled") {
    const base = tp === "trustee" ? R.gbp("cgt.trustee-annual-exempt-amount") : individualAea;
    const n = input.settlementsInGroup ?? 1;
    aea = n > 1 ? Math.max(base / n, individualAea * TRUST_AEA_MINIMUM_FRACTION) : base;
    aeaLabel = n > 1 ? `Trust annual exempt amount: ${gbp(base)} ÷ ${n} settlements (minimum one-tenth of ${gbp(individualAea)})` : "Trust annual exempt amount";
  } else if (tp === "pr") {
    aea = input.prWithinThreeYears === false ? 0 : individualAea;
    aeaLabel = input.prWithinThreeYears === false ? "No annual exempt amount (after the tax year of death and the next 2 tax years)" : "Annual exempt amount (tax year of death and the next 2 tax years)";
  }
  aea = r2(aea);

  const trusteeRateId = tp === "pr" ? "cgt.personal-representative-rate" : "cgt.trustee-rate";
  let band = Infinity;
  if (tp === "individual") {
    const brb = R.gbp("it.basic-rate-band");
    const ext = input.basicRateBandExtension ?? 0;
    band = Math.max(0, brb + ext - (input.taxableIncome ?? 0));
  }
  const engine: Engine = {
    aea,
    band: tp === "individual" ? band : 0,
    ordinaryRateFor: (inBand) =>
      tp === "individual"
        ? inBand
          ? { pct: R.percent("cgt.basic-rate"), id: "cgt.basic-rate" }
          : { pct: R.percent("cgt.higher-rate"), id: "cgt.higher-rate" }
        : { pct: R.percent(trusteeRateId), id: trusteeRateId },
    badrRate: () => R.percent("cgt.badr-rate"),
    irRate: () => R.percent("cgt.investors-relief-rate"),
    badrRemaining: Infinity,
    irRemaining: Infinity,
    trustRate: tp !== "individual",
  };
  const anyBadr = input.disposals.some((d) => d.relief === "badr" && disposalGain(d) > 0);
  const anyIr = input.disposals.some((d) => d.relief === "ir" && disposalGain(d) > 0);
  if (anyBadr) engine.badrRemaining = Math.max(0, R.gbp("cgt.badr-lifetime-limit") - (input.badrLifetimeUsed ?? 0));
  if (anyIr) engine.irRemaining = Math.max(0, R.gbp("cgt.investors-relief-lifetime-limit") - (input.irLifetimeUsed ?? 0));

  // Per-disposal gains.
  const disposals: DisposalResult[] = input.disposals.map((d, i) => ({ index: i, label: d.label?.trim() || `Disposal ${i + 1}`, gain: disposalGain(d) }));
  input.disposals.forEach((d, i) => {
    const res = disposals[i];
    const tag = [d.assetType === "residential" ? "residential property" : "", d.relief === "badr" ? "BADR" : d.relief === "ir" ? "Investors' Relief" : ""].filter(Boolean).join(", ");
    working.push({ label: `${res.label}${tag ? ` (${tag})` : ""}`, amount: 0, kind: "note" });
    working.push({ label: "  Proceeds", amount: d.proceeds });
    if (d.incidentalCosts) working.push({ label: "  Less incidental costs of acquisition and disposal", amount: -d.incidentalCosts });
    working.push({ label: "  Less cost", amount: -d.cost });
    if (d.enhancement) working.push({ label: "  Less enhancement expenditure", amount: -d.enhancement });
    const raw = r2(d.proceeds - d.cost - d.enhancement - d.incidentalCosts);
    if (raw > 0 && (d.prrAndLettingsRelief ?? 0) > 0) {
      working.push({ label: "  Gain before private residence relief", amount: raw, kind: "subtotal" });
      working.push({ label: "  Less private residence and lettings relief", amount: -r2(Math.min(raw, d.prrAndLettingsRelief ?? 0)), rateId: "cgt.lettings-relief-max" });
    }
    working.push({ label: res.gain < 0 ? "  Allowable loss" : "  Chargeable gain", amount: res.gain, kind: "subtotal" });
  });

  const gains = input.disposals.map((d, i) => ({ gain: disposals[i].gain, relief: d.relief }));
  if (input.disposals.length === 0) working.push({ label: "No disposals entered", amount: 0, kind: "note" });

  const c = core(gains, input.lossesBroughtForward, engine, true);
  working.push(...c.lines.slice(0, c.lines.findIndex((l) => l.label === "Taxable gains") + 1));
  if (tp === "individual") {
    const brb = R.gbp("it.basic-rate-band");
    const ext = input.basicRateBandExtension ?? 0;
    working.push({
      label: `Unused basic rate band: ${gbp(brb)}${ext ? ` + ${gbp(ext)} extension` : ""} − taxable income ${gbp(input.taxableIncome ?? 0)}`,
      amount: r2(band),
      rateId: "it.basic-rate-band",
      kind: "memo",
    });
  }
  working.push(...c.lines.slice(c.lines.findIndex((l) => l.label === "Taxable gains") + 1));
  // Replace the generic AEA label for trustees / PRs.
  const aeaLine = working.find((l) => l.label === "Less annual exempt amount");
  if (aeaLine && aeaLabel !== "Annual exempt amount") aeaLine.label = `Less ${aeaLabel.charAt(0).toLowerCase()}${aeaLabel.slice(1)}`;
  if (aeaLine && tp === "trustee") aeaLine.rateId = "cgt.trustee-annual-exempt-amount";
  if (aeaLine && tp === "pr" && aea === 0) aeaLine.rateId = undefined;

  working.push({ label: "Capital gains tax payable", amount: c.tax, kind: "total" });

  const unusedCurrent = c.currentLosses - c.cyUsed;
  const cf = r2(input.lossesBroughtForward - c.bfUsed + unusedCurrent);
  if (cf > 0) working.push({ label: "Losses carried forward", amount: cf, kind: "memo" });

  const due = selfAssessmentDueDate(input.taxYear);
  working.push({ label: `Pay the balance through Self Assessment by ${longDate(due)}${tp === "individual" ? "" : " (trust and estate returns)"}`, amount: 0, kind: "note" });

  // 60-day returns for UK residential property.
  input.disposals.forEach((d, i) => {
    if (d.assetType !== "residential" || !d.completionDate || !isValidISODate(d.completionDate)) return;
    const dueDate = addDays(d.completionDate, SIXTY_DAY_RETURN_DAYS);
    // Estimated tax for the return: this residential gain plus earlier residential gains and
    // any earlier losses in the year, using the AEA and band as at completion. A simplified
    // version of the notional amount in FA 2019 Sch 2 para 6 — an estimate only.
    const earlier = input.disposals
      .map((x, j) => ({ x, j }))
      .filter(({ x, j }) => j !== i && x.completionDate && isValidISODate(x.completionDate) && (cmpISO(x.completionDate, d.completionDate!) < 0 || (cmpISO(x.completionDate, d.completionDate!) === 0 && j < i)))
      .map(({ x, j }) => ({ gain: disposals[j].gain, relief: x.relief, residential: x.assetType === "residential" }))
      .filter((g) => g.gain < 0 || g.residential)
      .map(({ gain, relief }) => ({ gain, relief }));
    const before = core(earlier, input.lossesBroughtForward, engine, false).tax;
    const withThis = core([...earlier, { gain: disposals[i].gain, relief: d.relief }], input.lossesBroughtForward, engine, false).tax;
    const est = r2(Math.max(0, withThis - before));
    const needed = !!input.nonResident || est > 0;
    disposals[i].sixtyDay = { dueDate, returnNeeded: needed, estimatedTax: est };
    working.push({
      label: `${disposals[i].label}: 60-day UK property return ${needed ? `and payment of about ${gbp(est)} due by ${longDate(dueDate)}` : `not needed (no tax due on it at completion); the deadline would have been ${longDate(dueDate)}`}`,
      amount: 0,
      kind: "note",
    });
  });

  // Notes.
  if (tp === "individual") {
    notes.push("CGT uses the UK basic rate band even for Scottish and Welsh taxpayers. Taxable income must be after the personal allowance; Gift Aid and relief-at-source pension contributions extend the band (enter them under More inputs).");
  } else if (tp === "trustee" || tp === "trustee-disabled") {
    notes.push("Trustees pay a flat rate on gains. BADR is only available to trustees through a qualifying beneficiary's claim (using that beneficiary's lifetime limit), and Investors' Relief only with an eligible beneficiary — check the conditions. Settlor-interested trusts aren't covered here.");
  } else {
    notes.push("Personal representatives: allowable costs include a proportion of probate costs (HMRC's scale or actual), which you should add to incidental costs. Gains on assets passing to beneficiaries are not disposals by the PRs.");
  }
  notes.push("Gains are computed as proceeds less cost, enhancement and incidental costs. Share matching (same day, 30 days, section 104 pool), part disposals, chattels, wasting assets, rebasing for non-residents, holdover/rollover/incorporation relief, negligible value claims, EIS/SEIS reliefs and carried interest aren't calculated.");
  notes.push("Losses on disposals to connected persons can only be set against gains on disposals to the same person; enter them as brought forward only where that applies. Losses must be claimed within 4 years of the end of the tax year.");
  if (input.disposals.some((d) => d.assetType === "residential")) {
    notes.push("The 60-day estimate counts earlier residential gains and earlier losses in the year, brought-forward losses, the annual exempt amount and the band from your taxable income estimate. HMRC's notional amount rules are more detailed; the final figure is settled on the Self Assessment return.");
  }
  if (anyBadr || anyIr) notes.push("BADR and Investors' Relief must be claimed by the first anniversary of 31 January after the tax year, and the qualifying conditions checked separately.");

  return {
    taxYear: input.taxYear,
    tax: c.tax,
    working,
    rateIds: [...R.used],
    notes,
    disposals,
    totalGains: r2(c.totalGains),
    currentYearLosses: r2(c.currentLosses),
    lossesBroughtForwardUsed: r2(c.bfUsed),
    lossesCarriedForward: cf,
    annualExemptAmount: aea,
    annualExemptAmountUsed: r2(c.aeaUsed),
    taxableGains: r2(c.pots.ordinary + c.pots.badr + c.pots.ir),
    badrTaxable: r2(c.pots.badr),
    irTaxable: r2(c.pots.ir),
    ordinaryTaxable: r2(c.pots.ordinary),
    badrOverLimit: r2(c.badrOverLimit),
    irOverLimit: r2(c.irOverLimit),
    unusedBasicRateBand: tp === "individual" ? r2(band) : 0,
    paymentDueDate: due,
    effectiveRate: c.totalGains > 0 ? c.tax / c.totalGains : null,
  };
}
