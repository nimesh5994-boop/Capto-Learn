/**
 * Inheritance tax with lifetime gifts: exemptions on gifts (annual exemption
 * with one year's carry forward, small gifts, wedding gifts, normal
 * expenditure, spouse and charity), lifetime tax on chargeable lifetime
 * transfers (CLTs), tax on death on failed PETs and CLTs with 7-year
 * cumulation and taper relief, then the death estate with the nil rate band
 * left after gifts, the residence nil rate band (with taper), the 100%
 * APR/BPR allowance, the charity rate and quick succession relief; who pays
 * and when.
 *
 * Pure TypeScript. Every rate and threshold is read from src/content/rates.
 */
import { rate } from "@/content/rates";
import { type CalcResult, type WorkingLine, CalcInputError, STATUTORY, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { addYears, cmpISO, endOfMonthAfter, isValidISODate, longDate, parseISODate, taxYearOf, yearsBandNotMoreThan } from "./dates";

export type GiftExemption = "none" | "spouse" | "charity" | "small" | "normal-expenditure" | "marriage-child" | "marriage-grandchild" | "marriage-other";

export interface LifetimeGift {
  date: string;
  /** Value transferred (loss to the donor's estate), after any APR/BPR on the gift. */
  value: number;
  /** "pet" = gift to an individual (or bare trust); "clt" = gift into a relevant property trust or to a company. */
  type: "pet" | "clt";
  recipient?: string;
  exemption: GiftExemption;
  /** CLTs: who pays the lifetime tax. */
  taxPaidBy?: "donor" | "trustees";
}

export interface QuickSuccessionInput {
  /** Date of the earlier transfer (usually the earlier death). */
  earlierDate: string;
  /** B: tax paid on the earlier transfer. */
  earlierTax: number;
  /** D: value of the earlier chargeable transfer (gross). */
  earlierTransferValue: number;
  /** A: net increase in the deceased's estate from that transfer. */
  increaseInEstate: number;
}

export interface IhtFullInput {
  taxYear: string;
  /** Date of death. Leave blank to work out lifetime tax on CLTs only. */
  dateOfDeath?: string;
  gifts: LifetimeGift[];
  /** Set false when the gift values are already after annual exemptions (default true). */
  applyAnnualExemption?: boolean;
  /** Annual exemption for the tax year before the earliest gift that was still unused (default: the full exemption). */
  priorYearAnnualExemptionUnused?: number;
  /** Death estate. */
  grossEstate: number;
  /** Debts and reasonable funeral costs. */
  liabilities: number;
  spouseExempt: number;
  charityGifts: number;
  rnrbEligibleHomeToDescendants: number;
  transferredNrbPercent: number;
  transferredRnrbPercent: number;
  /** Value in the chargeable estate qualifying for 100% APR/BPR (before the allowance). */
  apr100Property: number;
  /** Value qualifying for 50% relief (e.g. AIM shares, quoted control holdings, assets used by a company). */
  apr50Property: number;
  /** Unused APR/BPR 100% allowance transferred from a late spouse or civil partner (0–100%). */
  transferredAllowancePercent: number;
  /** 100% allowance already used by lifetime transfers in the 7 years before death. */
  allowanceUsedByGifts: number;
  qsr?: QuickSuccessionInput;
}

export interface GiftResult {
  index: number;
  date: string;
  type: "pet" | "clt";
  value: number;
  exemptions: number;
  annualExemption: number;
  net: number;
  lifetimeTax: number;
  grossChargeable: number;
  lifetimeDueDate?: string;
  /** Death computation (when the donor died within 7 years). */
  withinSevenYears: boolean;
  deathTaxBeforeTaper: number;
  taperPercent: number;
  deathTax: number;
  payer: string;
}

export interface IhtFullResult extends CalcResult {
  gifts: GiftResult[];
  lifetimeTaxTotal: number;
  giftsDeathTax: number;
  netEstate: number;
  aprBprRelief: number;
  chargeableEstate: number;
  nilRateBandTotal: number;
  nilRateBandUsedByGifts: number;
  nilRateBandForEstate: number;
  residenceNilRateBand: number;
  rnrbTaperReduction: number;
  taxableEstate: number;
  charityRateApplies: boolean;
  estateTaxBeforeQsr: number;
  quickSuccessionRelief: number;
  estateTax: number;
  /** Total tax payable because of the death (gifts + estate). */
  totalDeathTax: number;
  estatePaymentDueDate?: string;
  effectiveRate: number | null;
}

/**
 * Lifetime tax on a CLT where the donor pays: the transfer is grossed up, so
 * tax = excess × rate ÷ (100 − rate) (IHTA 1984 s5(4); lesson
 * chargeable-lifetime-transfers-and-trusts-basics: 20/80 = 25%).
 */
function grossUpFactor(ratePct: number): number {
  return ratePct / (100 - ratePct);
}

/**
 * Tax on a lifetime CLT is due on 30 April after the end of the tax year for
 * transfers 6 April–30 September, otherwise six months after the end of the
 * month of transfer. Extra tax because of death: six months after the end of
 * the month of death. IHTM30153:
 * https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm30153
 */
function cltDueDate(date: string): string {
  const d = parseISODate(date)!;
  const inSummer = (d.m > 4 || (d.m === 4 && d.d >= 6)) && d.m < 10;
  return inSummer ? `${d.y + 1}-04-30` : endOfMonthAfter(date, 6);
}

/**
 * Estate tax is due by the end of the sixth month after the death
 * (GOV.UK "Pay your Inheritance Tax bill": died in January → 31 July).
 */
function deathDueDate(dateOfDeath: string): string {
  return endOfMonthAfter(dateOfDeath, 6);
}

/** True when `later` is within the 7 years beginning with `earlier` (IHTA 1984 s3A(4), s7(1)). */
function withinSeven(earlier: string, later: string): boolean {
  return cmpISO(later, addYears(earlier, 7)) < 0 && cmpISO(later, earlier) >= 0;
}

const TAPER_IDS = ["", "", "", "iht.taper-3-4-years", "iht.taper-4-5-years", "iht.taper-5-6-years", "iht.taper-6-7-years"];
const QSR_IDS = ["iht.qsr-1-year", "iht.qsr-2-years", "iht.qsr-3-years", "iht.qsr-4-years", "iht.qsr-5-years"];

export function validateIhtFull(i: IhtFullInput): string[] {
  const e: string[] = [];
  if (i.dateOfDeath && !isValidISODate(i.dateOfDeath)) e.push("Enter the date of death as a real date.");
  for (const [l, v] of [
    ["Gross estate", i.grossEstate],
    ["Debts and funeral costs", i.liabilities],
    ["Left to spouse or civil partner", i.spouseExempt],
    ["Gifts to charity", i.charityGifts],
    ["Home left to direct descendants", i.rnrbEligibleHomeToDescendants],
    ["Property qualifying for 100% relief", i.apr100Property],
    ["Property qualifying for 50% relief", i.apr50Property],
    ["Allowance used by lifetime gifts", i.allowanceUsedByGifts],
    ["Annual exemption unused in the earlier year", i.priorYearAnnualExemptionUnused],
  ] as const) requireNonNegative(e, l, v);
  for (const [l, v] of [
    ["Transferred nil rate band", i.transferredNrbPercent],
    ["Transferred residence nil rate band", i.transferredRnrbPercent],
    ["Transferred 100% relief allowance", i.transferredAllowancePercent],
  ] as const) {
    if (!Number.isFinite(v) || v < 0 || v > 100) e.push(`${l} must be a percentage from 0 to 100.`);
  }
  const net = i.grossEstate - i.liabilities;
  if (i.liabilities > i.grossEstate) e.push("Debts and funeral costs are more than the estate; enter the estate as nil and leave out the excess.");
  if (i.spouseExempt + i.charityGifts + i.apr100Property + i.apr50Property > Math.max(0, net) + 0.005) {
    e.push("Spouse and charity gifts and business/agricultural property together can't be more than the net estate.");
  }
  if (i.rnrbEligibleHomeToDescendants > Math.max(0, net)) e.push("The home left to descendants can't be worth more than the net estate.");
  i.gifts.forEach((g, n) => {
    const name = `Gift ${n + 1}`;
    if (!isValidISODate(g.date)) e.push(`${name}: enter the date of the gift.`);
    requireNonNegative(e, `${name}: value`, g.value);
    if (i.dateOfDeath && isValidISODate(i.dateOfDeath) && isValidISODate(g.date) && cmpISO(g.date, i.dateOfDeath) > 0) e.push(`${name}: is after the date of death.`);
    if (g.type === "clt" && (g.exemption === "small" || g.exemption.startsWith("marriage"))) e.push(`${name}: small gifts and wedding gift exemptions are for gifts to individuals.`);
  });
  if (i.qsr) {
    if (!isValidISODate(i.qsr.earlierDate)) e.push("Quick succession relief: enter the date of the earlier transfer.");
    requireNonNegative(e, "Quick succession relief: earlier tax", i.qsr.earlierTax);
    requireNonNegative(e, "Quick succession relief: earlier transfer value", i.qsr.earlierTransferValue);
    requireNonNegative(e, "Quick succession relief: increase in estate", i.qsr.increaseInEstate);
    if (i.qsr.increaseInEstate > i.qsr.earlierTransferValue) e.push("Quick succession relief: the increase in the estate can't be more than the earlier transfer.");
    if (!i.dateOfDeath) e.push("Quick succession relief needs a date of death.");
  }
  return e;
}

export function inheritanceTaxFull(input: IhtFullInput): IhtFullResult {
  const errors = validateIhtFull(input);
  if (errors.length) throw new CalcInputError(errors);

  const R = rateReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const death = input.dateOfDeath && isValidISODate(input.dateOfDeath) ? input.dateOfDeath : undefined;

  const nrb0 = R.gbp("iht.nil-rate-band");
  const deathRate = R.percent("iht.rate");
  const ae = input.gifts.length && input.applyAnnualExemption !== false ? R.gbp("iht.annual-exemption") : 0;

  // ---------- 1. Exemptions on lifetime gifts ----------
  const order = input.gifts.map((g, index) => ({ g, index })).sort((a, b) => cmpISO(a.g.date, b.g.date) || a.index - b.index);
  const results: GiftResult[] = [];
  // Annual exemption left, by tax year. The current year's exemption is used first, then the
  // previous year's unused exemption (carried forward one year only), in date order of gifts
  // (IHTA 1984 s19; GOV.UK "Inheritance Tax: gifts"; lesson lifetime-gifts-pets-taper-relief-and-exemptions).
  const aeLeft = new Map<string, number>();
  const firstYear = order.length ? taxYearOf(order[0].g.date) : "";
  const prevYear = (ty: string) => {
    const start = Number(ty.slice(0, 4)) - 1;
    return `${start}/${String((start + 1) % 100).padStart(2, "0")}`;
  };
  const aeFor = (ty: string, isYearBeforeFirst: boolean) => {
    if (!aeLeft.has(ty)) aeLeft.set(ty, isYearBeforeFirst ? Math.min(ae, input.priorYearAnnualExemptionUnused ?? ae) : ae);
    return aeLeft.get(ty)!;
  };

  for (const { g, index } of order) {
    let specific = 0;
    let marriageId: string | undefined;
    switch (g.exemption) {
      case "spouse":
      case "charity":
      case "normal-expenditure":
        specific = g.value;
        break;
      case "small":
        // Small gifts: only where total gifts to that person in the year are £250 or less.
        specific = g.value <= R.gbp("iht.small-gifts-exemption") ? g.value : 0;
        break;
      case "marriage-child":
        marriageId = "iht.marriage-gift-child";
        break;
      case "marriage-grandchild":
        marriageId = "iht.marriage-gift-grandchild";
        break;
      case "marriage-other":
        marriageId = "iht.marriage-gift-other";
        break;
    }
    if (marriageId) specific = Math.min(g.value, R.gbp(marriageId));
    let net = g.value - specific;
    let aeUsed = 0;
    // The annual exemption can't be combined with the small gifts exemption for the same gift.
    if (net > 0 && g.exemption !== "small" && input.applyAnnualExemption !== false) {
      const ty = taxYearOf(g.date);
      const cur = Math.min(net, aeFor(ty, false));
      aeLeft.set(ty, aeLeft.get(ty)! - cur);
      net -= cur;
      aeUsed += cur;
      if (net > 0) {
        const prev = prevYear(ty);
        const cf = Math.min(net, aeFor(prev, ty === firstYear));
        aeLeft.set(prev, aeLeft.get(prev)! - cf);
        net -= cf;
        aeUsed += cf;
      }
    }
    results.push({
      index,
      date: g.date,
      type: g.type,
      value: g.value,
      exemptions: r2(specific),
      annualExemption: r2(aeUsed),
      net: r2(net),
      lifetimeTax: 0,
      grossChargeable: r2(net),
      withinSevenYears: false,
      deathTaxBeforeTaper: 0,
      taperPercent: 100,
      deathTax: 0,
      payer: "",
    });
  }

  // ---------- 2. Lifetime tax on CLTs ----------
  const lifetimeRate = order.some(({ g }) => g.type === "clt") ? R.percent("iht.lifetime-rate") : 0;
  for (const res of results) {
    if (res.type !== "clt") continue;
    const g = input.gifts[res.index];
    const prior = results.filter((o) => o.type === "clt" && results.indexOf(o) < results.indexOf(res) && withinSeven(o.date, res.date));
    const cum = prior.reduce((t, o) => t + o.grossChargeable, 0);
    const avail = Math.max(0, nrb0 - cum);
    const excess = Math.max(0, res.net - avail);
    const donorPays = (g.taxPaidBy ?? "trustees") === "donor";
    const tax = r2(donorPays ? excess * grossUpFactor(lifetimeRate) : (excess * lifetimeRate) / 100);
    res.lifetimeTax = tax;
    res.grossChargeable = r2(res.net + (donorPays ? tax : 0));
    res.lifetimeDueDate = cltDueDate(res.date);
  }

  // ---------- 3. Gifts on death ----------
  const tnrb = (nrb0 * input.transferredNrbPercent) / 100;
  const nrbAtDeath = nrb0 + tnrb;
  let giftsDeathTax = 0;
  if (death) {
    for (const res of results) {
      if (!withinSeven(res.date, death)) continue;
      if (res.type === "pet" && res.net <= 0) continue;
      res.withinSevenYears = true;
      // Chargeable transfers in the 7 years before this one: CLTs and PETs that also failed.
      const prior = results.filter(
        (o) =>
          o !== res &&
          results.indexOf(o) < results.indexOf(res) &&
          withinSeven(o.date, res.date) &&
          (o.type === "clt" || withinSeven(o.date, death))
      );
      const cum = prior.reduce((t, o) => t + o.grossChargeable, 0);
      const avail = Math.max(0, nrbAtDeath - cum);
      const full = r2((Math.max(0, res.grossChargeable - avail) * deathRate) / 100);
      const band = yearsBandNotMoreThan(res.date, death);
      const taperPct = band >= 3 ? R.percent(TAPER_IDS[band]) : 100;
      const tapered = r2((full * taperPct) / 100);
      res.deathTaxBeforeTaper = full;
      res.taperPercent = taperPct;
      res.deathTax = r2(Math.max(0, tapered - res.lifetimeTax));
      res.payer = res.type === "pet" ? "the recipient (donee)" : "the trustees";
      giftsDeathTax += res.deathTax;
    }
  }
  giftsDeathTax = r2(giftsDeathTax);
  const lifetimeTaxTotal = r2(results.reduce((t, r) => t + r.lifetimeTax, 0));

  // Working: gifts.
  if (results.length) {
    working.push({ label: "Lifetime gifts (in date order)", amount: 0, kind: "note" });
    for (const res of results) {
      const g = input.gifts[res.index];
      const who = g.recipient?.trim() ? ` to ${g.recipient.trim()}` : "";
      working.push({ label: `${longDate(res.date)}: ${res.type === "pet" ? "PET" : "CLT"}${who}`, amount: res.value });
      if (res.exemptions > 0) {
        const marriageId = g.exemption.startsWith("marriage") ? `iht.marriage-gift-${g.exemption.slice(9)}` : g.exemption === "small" ? "iht.small-gifts-exemption" : undefined;
        working.push({ label: `  Less ${exemptionLabel(g.exemption)}`, amount: -res.exemptions, rateId: marriageId });
      } else if (g.exemption === "small") {
        working.push({ label: "  Small gifts exemption not available: the gift is over the limit (the whole gift is then not covered)", amount: 0, kind: "note", rateId: "iht.small-gifts-exemption" });
      }
      if (res.annualExemption > 0) working.push({ label: "  Less annual exemption (current year first, then one year carried forward)", amount: -res.annualExemption, rateId: "iht.annual-exemption" });
      working.push({ label: res.type === "pet" ? "  Potentially exempt transfer" : "  Chargeable lifetime transfer", amount: res.net, kind: "subtotal" });
      if (res.type === "clt") {
        const donorPays = (g.taxPaidBy ?? "trustees") === "donor";
        if (res.lifetimeTax > 0) {
          working.push({
            label: `  Lifetime tax at ${pctLabel(lifetimeRate)}${donorPays ? ` grossed up (${lifetimeRate}/${100 - lifetimeRate}) — donor pays` : " — trustees pay"}, due ${longDate(res.lifetimeDueDate!)}`,
            amount: res.lifetimeTax,
            rateId: "iht.lifetime-rate",
          });
          if (donorPays) working.push({ label: "  Gross chargeable transfer", amount: res.grossChargeable, kind: "memo" });
        } else {
          working.push({ label: "  Within the nil rate band: no lifetime tax", amount: 0, kind: "note", rateId: "iht.nil-rate-band" });
        }
      }
      if (death) {
        if (res.withinSevenYears) {
          working.push({ label: `  Tax on death at ${pctLabel(deathRate)} on the excess over the nil rate band left`, amount: res.deathTaxBeforeTaper, rateId: "iht.rate" });
          if (res.taperPercent < 100) {
            const band = yearsBandNotMoreThan(res.date, death);
            working.push({ label: `  Taper relief: ${band} to ${band + 1} years before death, ${pctLabel(res.taperPercent)} of the tax payable`, amount: -r2(res.deathTaxBeforeTaper - (res.deathTaxBeforeTaper * res.taperPercent) / 100), rateId: TAPER_IDS[band] });
          }
          if (res.lifetimeTax > 0) working.push({ label: "  Less lifetime tax already paid (no repayment if higher)", amount: -r2(Math.min(res.lifetimeTax, (res.deathTaxBeforeTaper * res.taperPercent) / 100)) });
          working.push({ label: `  Payable on death by ${res.payer}`, amount: res.deathTax, kind: "subtotal" });
        } else if (res.net > 0 || res.type === "clt") {
          working.push({ label: res.type === "pet" ? "  Donor survived 7 years: exempt" : "  More than 7 years before death: no further tax", amount: 0, kind: "note" });
        }
      }
    }
  }

  const rateIds = () => [...R.used];
  if (!death) {
    working.push({ label: "Lifetime tax on chargeable lifetime transfers", amount: lifetimeTaxTotal, kind: "total" });
    notes.push("No date of death entered, so only lifetime tax on chargeable lifetime transfers is shown. PETs are exempt unless the donor dies within 7 years.");
    commonNotes(notes);
    return {
      taxYear: input.taxYear,
      tax: lifetimeTaxTotal,
      working,
      rateIds: rateIds(),
      notes,
      gifts: results,
      lifetimeTaxTotal,
      giftsDeathTax: 0,
      netEstate: 0,
      aprBprRelief: 0,
      chargeableEstate: 0,
      nilRateBandTotal: nrb0,
      nilRateBandUsedByGifts: 0,
      nilRateBandForEstate: 0,
      residenceNilRateBand: 0,
      rnrbTaperReduction: 0,
      taxableEstate: 0,
      charityRateApplies: false,
      estateTaxBeforeQsr: 0,
      quickSuccessionRelief: 0,
      estateTax: 0,
      totalDeathTax: 0,
      effectiveRate: null,
    };
  }

  // ---------- 4. The death estate ----------
  const netEstate = r2(input.grossEstate - input.liabilities);
  working.push({ label: `Estate on death (${longDate(death)})`, amount: 0, kind: "note" });
  working.push({ label: "Assets (including the deceased's share of joint property)", amount: input.grossEstate });
  if (input.liabilities) working.push({ label: "Less debts and funeral costs", amount: -input.liabilities });
  working.push({ label: "Net estate", amount: netEstate, kind: "subtotal" });
  if (input.spouseExempt > 0) working.push({ label: "Less left to spouse or civil partner (exempt)", amount: -input.spouseExempt });
  if (input.charityGifts > 0) working.push({ label: "Less gifts to charity (exempt)", amount: -input.charityGifts });

  // APR/BPR with the 100% allowance (deaths on or after 6 April 2026).
  let relief = 0;
  if (input.apr100Property > 0 || input.apr50Property > 0) {
    const allowItem = rate(input.taxYear, "iht.apr-bpr-100-allowance");
    let allowance = Infinity;
    if (allowItem && allowItem.unit === "GBP" && cmpISO(death, "2026-04-06") >= 0) {
      const base = R.gbp("iht.apr-bpr-100-allowance");
      allowance = Math.max(0, base * (1 + input.transferredAllowancePercent / 100) - input.allowanceUsedByGifts);
      working.push({
        label: `100% relief allowance: ${gbp(base)}${input.transferredAllowancePercent ? ` + ${pctLabel(input.transferredAllowancePercent)} transferred` : ""}${input.allowanceUsedByGifts ? ` − ${gbp(input.allowanceUsedByGifts)} used by gifts` : ""}`,
        amount: r2(allowance),
        rateId: "iht.apr-bpr-100-allowance",
        kind: "memo",
      });
    } else {
      working.push({ label: "No cap on 100% relief for deaths before 6 April 2026", amount: 0, kind: "note" });
    }
    const at100 = Math.min(input.apr100Property, allowance);
    const above = input.apr100Property - at100;
    const halfPct = allowItem?.unit === "GBP" ? R.percent("iht.apr-bpr-rate-above-allowance") : 50;
    if (at100 > 0) working.push({ label: `Less 100% APR/BPR on ${gbp(at100)}`, amount: -r2(at100) });
    if (above > 0) working.push({ label: `Less ${pctLabel(halfPct)} relief on ${gbp(above)} above the allowance`, amount: -r2((above * halfPct) / 100), rateId: "iht.apr-bpr-rate-above-allowance" });
    if (input.apr50Property > 0) working.push({ label: `Less ${pctLabel(halfPct)} relief on ${gbp(input.apr50Property)} (AIM shares, quoted control holdings, assets used by the business)`, amount: -r2((input.apr50Property * halfPct) / 100), rateId: allowItem?.unit === "GBP" ? "iht.apr-bpr-rate-above-allowance" : undefined });
    relief = r2(at100 + ((above + input.apr50Property) * halfPct) / 100);
  }
  const chargeable = r2(Math.max(0, netEstate - input.spouseExempt - input.charityGifts - relief));
  working.push({ label: "Chargeable estate", amount: chargeable, kind: "subtotal" });

  // Nil rate band left after chargeable transfers in the 7 years before death.
  const usedByGifts = results.filter((r) => r.withinSevenYears).reduce((t, r) => t + r.grossChargeable, 0);
  const nrbForEstate = Math.max(0, nrbAtDeath - usedByGifts);
  working.push({ label: "Nil rate band", amount: nrb0, rateId: "iht.nil-rate-band", kind: "memo" });
  if (tnrb > 0) working.push({ label: `Transferred nil rate band: ${pctLabel(input.transferredNrbPercent)} × ${gbp(nrb0)}`, amount: r2(tnrb), rateId: "iht.nil-rate-band", kind: "memo" });
  if (usedByGifts > 0) working.push({ label: "Less chargeable gifts in the 7 years before death", amount: -r2(Math.min(usedByGifts, nrbAtDeath)), kind: "memo" });

  // Residence nil rate band (estate only).
  const rnrb0 = R.gbp("iht.residence-nil-rate-band");
  const taperFrom = R.gbp("iht.rnrb-taper-threshold");
  let rnrb = 0;
  let taperReduction = 0;
  if (input.rnrbEligibleHomeToDescendants > 0) {
    const tr = (rnrb0 * input.transferredRnrbPercent) / 100;
    const max = rnrb0 + tr;
    working.push({ label: "Residence nil rate band", amount: rnrb0, rateId: "iht.residence-nil-rate-band", kind: "memo" });
    if (tr > 0) working.push({ label: `Transferred residence nil rate band: ${pctLabel(input.transferredRnrbPercent)} × ${gbp(rnrb0)}`, amount: r2(tr), rateId: "iht.residence-nil-rate-band", kind: "memo" });
    // The taper uses the net estate before exemptions and reliefs (GOV.UK RNRB guidance; lesson iht-basics-nil-rate-bands-and-the-estate).
    if (netEstate > taperFrom) {
      taperReduction = Math.min(max, (netEstate - taperFrom) * STATUTORY.rnrbTaperFraction);
      working.push({ label: `Taper: (${gbp(netEstate)} − ${gbp(taperFrom)}) × 1/${1 / STATUTORY.rnrbTaperFraction}`, amount: -r2(taperReduction), rateId: "iht.rnrb-taper-threshold", kind: "memo" });
    }
    rnrb = Math.min(max - taperReduction, input.rnrbEligibleHomeToDescendants);
    if (input.rnrbEligibleHomeToDescendants < max - taperReduction) {
      working.push({ label: `Capped at the value of the home left to descendants (${gbp(input.rnrbEligibleHomeToDescendants)})`, amount: 0, kind: "note" });
    }
  }
  const rnrbUsed = Math.min(rnrb, chargeable);
  const nrbUsed = Math.min(nrbForEstate, chargeable - rnrbUsed);
  if (rnrb > 0) working.push({ label: "Less residence nil rate band", amount: -r2(rnrbUsed), rateId: "iht.residence-nil-rate-band" });
  working.push({ label: "Less nil rate band left for the estate", amount: -r2(nrbUsed), rateId: "iht.nil-rate-band" });
  const taxable = r2(Math.max(0, chargeable - rnrbUsed - nrbUsed));
  working.push({ label: "Taxable estate", amount: taxable, kind: "subtotal" });

  // Charity rate: baseline excludes the RNRB and uses the NRB available to the estate (IHTM45009).
  let ratePct = deathRate;
  let rateId = "iht.rate";
  let charityApplies = false;
  if (input.charityGifts > 0) {
    const baseline = Math.max(0, chargeable - nrbForEstate) + input.charityGifts;
    const needed = (baseline * STATUTORY.charityConditionPercent) / 100;
    charityApplies = input.charityGifts >= needed && taxable > 0;
    working.push({ label: `Baseline amount: (${gbp(chargeable)} − ${gbp(nrbForEstate)} nil rate band) + ${gbp(input.charityGifts)} charity`, amount: r2(baseline), kind: "memo" });
    working.push({ label: `Charity gifts ${input.charityGifts >= needed ? "are" : "are not"} at least ${STATUTORY.charityConditionPercent}% of the baseline (${gbp(needed)})`, amount: 0, kind: "note" });
    if (charityApplies) {
      ratePct = R.percent("iht.charity-rate");
      rateId = "iht.charity-rate";
    }
  }
  const estateTaxBefore = r2((taxable * ratePct) / 100);
  working.push({ label: `${gbp(taxable)} × ${pctLabel(ratePct)}`, amount: estateTaxBefore, rateId });

  // Quick succession relief: (A ÷ D) × B × percentage (IHTA 1984 s141; IHTM22051).
  let qsr = 0;
  if (input.qsr && input.qsr.earlierTax > 0 && input.qsr.earlierTransferValue > 0) {
    const q = input.qsr;
    if (cmpISO(death, addYears(q.earlierDate, 5)) <= 0 && cmpISO(q.earlierDate, death) <= 0) {
      const band = yearsBandNotMoreThan(q.earlierDate, death);
      const pct = R.percent(QSR_IDS[Math.min(band, 4)]);
      qsr = r2(Math.min(estateTaxBefore, (q.increaseInEstate / q.earlierTransferValue) * q.earlierTax * (pct / 100)));
      working.push({
        label: `Less quick succession relief: (${gbp(q.increaseInEstate)} ÷ ${gbp(q.earlierTransferValue)}) × ${gbp(q.earlierTax)} × ${pctLabel(pct)}`,
        amount: -qsr,
        rateId: QSR_IDS[Math.min(band, 4)],
      });
    } else {
      working.push({ label: "No quick succession relief: the earlier transfer was more than 5 years before death", amount: 0, kind: "note" });
    }
  }
  const estateTax = r2(estateTaxBefore - qsr);
  const due = deathDueDate(death);
  working.push({ label: `Tax on the estate, paid by the personal representatives by ${longDate(due)}`, amount: estateTax, kind: "subtotal" });

  // Who pays.
  const petTax = r2(results.filter((r) => r.type === "pet").reduce((t, r) => t + r.deathTax, 0));
  const cltTax = r2(results.filter((r) => r.type === "clt").reduce((t, r) => t + r.deathTax, 0));
  if (petTax > 0) working.push({ label: `Tax on failed PETs, paid by the recipients by ${longDate(due)}`, amount: petTax, kind: "memo" });
  if (cltTax > 0) working.push({ label: `Extra tax on CLTs, paid by the trustees by ${longDate(due)}`, amount: cltTax, kind: "memo" });
  const totalDeath = r2(estateTax + giftsDeathTax);
  working.push({ label: "Total inheritance tax payable because of the death", amount: totalDeath, kind: "total" });
  if (lifetimeTaxTotal > 0) working.push({ label: "Lifetime tax already paid on CLTs (not included above)", amount: lifetimeTaxTotal, kind: "memo" });

  // Notes.
  if (cmpISO(death, "2027-04-06") >= 0) notes.push("For deaths on or after 6 April 2027 most unused pension funds and death benefits are in the estate; include them in the assets.");
  else notes.push("Unused pension funds are outside the estate for deaths before 6 April 2027 (from then most are included and the personal representatives report and pay).");
  if (taxYearOf(death) !== input.taxYear) notes.push(`The date of death is in ${taxYearOf(death)} but the ${input.taxYear} figures are used. Choose the tax year of death if it is in the dataset.`);
  notes.push("Who bears the estate tax: normally the residue under the will (specific UK gifts are usually free of tax unless the will says otherwise); joint property passing by survivorship and gifts with reservation bear their own share. Tax on land, unquoted shares and APR/BPR property can be paid in 10 annual instalments.");
  notes.push("APR/BPR values are entered as relief-qualifying amounts in the chargeable estate; the qualifying conditions (ownership periods, trading status, clawback on gifts) aren't checked, and property left to a spouse or charity doesn't use the allowance.");
  commonNotes(notes);

  return {
    taxYear: input.taxYear,
    tax: totalDeath,
    working,
    rateIds: rateIds(),
    notes,
    gifts: results,
    lifetimeTaxTotal,
    giftsDeathTax,
    netEstate,
    aprBprRelief: relief,
    chargeableEstate: chargeable,
    nilRateBandTotal: r2(nrbAtDeath),
    nilRateBandUsedByGifts: r2(Math.min(usedByGifts, nrbAtDeath)),
    nilRateBandForEstate: r2(nrbForEstate),
    residenceNilRateBand: r2(rnrb),
    rnrbTaperReduction: r2(taperReduction),
    taxableEstate: taxable,
    charityRateApplies: charityApplies,
    estateTaxBeforeQsr: estateTaxBefore,
    quickSuccessionRelief: qsr,
    estateTax,
    totalDeathTax: totalDeath,
    estatePaymentDueDate: due,
    effectiveRate: netEstate > 0 ? totalDeath / netEstate : null,
  };
}

function exemptionLabel(x: GiftExemption): string {
  switch (x) {
    case "spouse":
      return "spouse or civil partner exemption";
    case "charity":
      return "charity exemption";
    case "normal-expenditure":
      return "normal expenditure out of income";
    case "small":
      return "small gifts exemption";
    case "marriage-child":
      return "wedding gift to a child";
    case "marriage-grandchild":
      return "wedding gift to a grandchild or great-grandchild";
    case "marriage-other":
      return "wedding gift";
    default:
      return "exemption";
  }
}

function commonNotes(notes: string[]) {
  notes.push("The selected year's nil rate band and annual exemption are used for every gift (both unchanged for many years: check older gifts against the historical figures). Gifts with reservation of benefit, pre-owned assets, related settlements, ten-year and exit charges on trusts, the residence nil rate band downsizing addition, loss on sale relief, and gifts of business property after the donor's death (clawback) aren't calculated.");
}
