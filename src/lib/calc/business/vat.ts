/**
 * VAT tools: Flat Rate Scheme versus standard accounting, the VAT fraction, and the registration
 * threshold monitor (historic rolling 12-month test and the 30-day forward-look test).
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2 } from "../common";
import { addDays, addMonths, isIsoDate, lastDayOfMonth, longDate } from "./dates";
import { businessReader } from "./rates";
import { rate, ratesFor } from "@/content/rates";

/* ------------------------------------------------------------------ */
/* Flat Rate Scheme vs standard                                         */
/* ------------------------------------------------------------------ */

export type ReturnPeriod = "month" | "quarter" | "year";
const PERIOD_FRACTION: Record<ReturnPeriod, number> = { month: 1 / 12, quarter: 1 / 4, year: 1 };
const PERIOD_LABEL: Record<ReturnPeriod, string> = { month: "monthly", quarter: "quarterly", year: "annual" };

export interface FrsInput {
  taxYear: string;
  period: ReturnPeriod;
  /** Sales before VAT. */
  standardSalesNet: number;
  reducedSalesNet: number;
  zeroRatedSales: number;
  /** Exempt income counts in flat rate turnover. */
  exemptSales: number;
  /** Input VAT reclaimable under standard accounting (excluding capital assets below). */
  inputVat: number;
  /** Relevant goods bought for the limited cost business test, including VAT. */
  relevantGoodsGross: number;
  /** VAT on capital asset purchases over £2,000 (incl. VAT) — reclaimable under both schemes. */
  capitalAssetVat: number;
  /** Dataset id of the sector rate (vat.frs-sector-…) or "custom". */
  sectorId: string;
  customRate?: number;
  firstYear: boolean;
}

export interface FrsResult extends CalcResult {
  frsTurnover: number;
  frsRate: number;
  limitedCost: boolean;
  frsVat: number;
  standardVat: number;
  /** Positive when the FRS saves VAT. */
  saving: number;
}

/** Sector rates in the dataset for the year, for a picker. */
export function frsSectors(taxYear: string): { id: string; label: string; rate: number }[] {
  const y = ratesFor(taxYear);
  if (!y) return [];
  return y.sections
    .flatMap((s) => s.items)
    .filter((i) => i.id.startsWith("vat.frs-sector-") && i.amount !== undefined)
    .map((i) => ({ id: i.id, label: i.label.replace(/^Flat rate — /, ""), rate: i.amount as number }));
}

export function validateFrs(i: FrsInput): string[] {
  const e: string[] = [];
  const money: [string, number | undefined][] = [
    ["Standard-rated sales", i.standardSalesNet],
    ["Reduced-rated sales", i.reducedSalesNet],
    ["Zero-rated sales", i.zeroRatedSales],
    ["Exempt income", i.exemptSales],
    ["Input VAT", i.inputVat],
    ["Relevant goods", i.relevantGoodsGross],
    ["VAT on capital assets", i.capitalAssetVat],
  ];
  for (const [label, v] of money) {
    if (!Number.isFinite(v)) e.push(`${label} must be a number.`);
    else if ((v as number) < 0) e.push(`${label} can't be negative.`);
  }
  if (i.sectorId === "custom") {
    if (i.customRate === undefined || !Number.isFinite(i.customRate) || i.customRate <= 0 || i.customRate > 20) e.push("Enter the flat rate percentage (between 0 and 20).");
  } else if (!rate(i.taxYear, i.sectorId)) e.push("Choose the business sector.");
  return e;
}

export function frsComparison(input: FrsInput): FrsResult {
  const errors = validateFrs(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const std = R.percent("vat.standard-rate");
  const red = R.percent("vat.reduced-rate");
  const working: WorkingLine[] = [];
  const notes: string[] = [];

  const stdVat = (input.standardSalesNet * std) / 100;
  const redVat = (input.reducedSalesNet * red) / 100;
  const turnover = input.standardSalesNet + stdVat + input.reducedSalesNet + redVat + input.zeroRatedSales + input.exemptSales;

  // Standard accounting.
  working.push({ label: "Standard accounting", amount: 0, kind: "note" });
  if (input.standardSalesNet) working.push({ label: `Output VAT: ${gbp(input.standardSalesNet)} × ${pctLabel(std)}`, amount: r2(stdVat), rateId: "vat.standard-rate" });
  if (input.reducedSalesNet) working.push({ label: `Output VAT: ${gbp(input.reducedSalesNet)} × ${pctLabel(red)}`, amount: r2(redVat), rateId: "vat.reduced-rate" });
  if (input.inputVat) working.push({ label: "Less input VAT", amount: -input.inputVat });
  if (input.capitalAssetVat) working.push({ label: "Less VAT on capital assets", amount: -input.capitalAssetVat });
  const standardVat = r2(stdVat + redVat - input.inputVat - input.capitalAssetVat);
  working.push({ label: "VAT payable — standard accounting", amount: standardVat, kind: "subtotal" });

  // Flat Rate Scheme.
  working.push({ label: "Flat Rate Scheme", amount: 0, kind: "note" });
  working.push({ label: "Flat rate turnover (VAT-inclusive, including zero-rated and exempt income)", amount: r2(turnover) });
  const lctPct = R.percent("vat.frs-lct-goods-percent");
  const lctMin = R.gbp("vat.frs-lct-annual-minimum") * PERIOD_FRACTION[input.period];
  const twoPct = (turnover * lctPct) / 100;
  const limitedCost = input.relevantGoodsGross < twoPct || input.relevantGoodsGross < lctMin;
  working.push({
    label: `Limited cost test: goods ${gbp(input.relevantGoodsGross)} vs ${pctLabel(lctPct)} of turnover ${gbp(twoPct)} and ${gbp(lctMin)} (${PERIOD_LABEL[input.period]} share of ${gbp(R.gbp("vat.frs-lct-annual-minimum"))})`,
    amount: 0,
    kind: "note",
  });
  let baseRate: number;
  let rateId: string | undefined;
  if (limitedCost) {
    baseRate = R.percent("vat.frs-limited-cost-rate");
    rateId = "vat.frs-limited-cost-rate";
    working.push({ label: `Goods are below ${input.relevantGoodsGross < twoPct ? `${pctLabel(lctPct)} of turnover` : gbp(lctMin)}: limited cost business rate applies`, amount: 0, kind: "note" });
  } else if (input.sectorId === "custom") {
    baseRate = input.customRate as number;
  } else {
    baseRate = R.percent(input.sectorId);
    rateId = input.sectorId;
  }
  let frsRate = baseRate;
  if (input.firstYear) {
    const disc = R.percent("vat.frs-first-year-discount");
    frsRate = baseRate - disc;
    working.push({ label: `First year of VAT registration: ${pctLabel(baseRate)} − ${pctLabel(disc)}`, amount: 0, kind: "note" });
  }
  const frsGross = (turnover * frsRate) / 100;
  working.push({ label: `${gbp(turnover)} × ${pctLabel(frsRate)}`, amount: r2(frsGross), rateId: input.firstYear ? "vat.frs-first-year-discount" : rateId });
  if (input.capitalAssetVat) working.push({ label: "Less VAT on capital assets over £2,000 (reclaimable under the scheme)", amount: -input.capitalAssetVat, rateId: "vat.frs-capital-goods-claim" });
  const frsVat = r2(frsGross - input.capitalAssetVat);
  working.push({ label: "VAT payable — Flat Rate Scheme", amount: frsVat, kind: "subtotal" });
  const saving = r2(standardVat - frsVat);
  working.push({ label: saving >= 0 ? "Flat Rate Scheme saves" : "Flat Rate Scheme costs more by", amount: Math.abs(saving), kind: "total" });

  notes.push("Joining needs expected taxable turnover (excluding VAT) of £150,000 or less, and you must leave if total income including VAT goes over £230,000. Check both before relying on the comparison.");
  notes.push("Relevant goods exclude capital items, food or drink for you or staff, vehicles, vehicle parts and fuel (unless you're in transport), and anything not used exclusively for the business. Services never count.");
  notes.push("The rate is based on the business's main activity at the start of the period; mid-period rate changes and the first-year discount ending part-way through a period aren't split here.");
  if (input.sectorId === "custom") notes.push("Custom flat rate entered: check it against GOV.UK's table.");

  return {
    taxYear: input.taxYear,
    tax: frsVat,
    working,
    rateIds: [...R.used],
    notes,
    frsTurnover: r2(turnover),
    frsRate,
    limitedCost,
    frsVat,
    standardVat,
    saving,
  };
}

/* ------------------------------------------------------------------ */
/* VAT fraction                                                         */
/* ------------------------------------------------------------------ */

export interface VatFractionInput {
  taxYear: string;
  amount: number;
  /** extract: amount includes VAT; add: amount is net. */
  mode: "extract" | "add";
  rateId: "vat.standard-rate" | "vat.reduced-rate";
}

export interface VatFractionResult extends CalcResult {
  net: number;
  vat: number;
  gross: number;
}

export function vatFraction(input: VatFractionInput): VatFractionResult {
  if (!Number.isFinite(input.amount) || input.amount < 0) throw new CalcInputError(["Enter an amount of £0 or more."]);
  const R = businessReader(input.taxYear);
  const p = R.percent(input.rateId);
  const working: WorkingLine[] = [];
  let net: number;
  let vat: number;
  if (input.mode === "extract") {
    // VAT fraction = rate / (100 + rate): 1/6 at 20%, 1/21 at 5%.
    vat = r2((input.amount * p) / (100 + p));
    net = r2(input.amount - vat);
    const frac = p === 20 ? "1/6" : p === 5 ? "1/21" : `${p}/${100 + p}`;
    working.push({ label: "VAT-inclusive amount", amount: input.amount });
    working.push({ label: `VAT: ${gbp(input.amount)} × ${frac} (VAT fraction at ${pctLabel(p)})`, amount: vat, rateId: input.rateId });
    working.push({ label: "Net amount", amount: net, kind: "total" });
  } else {
    net = input.amount;
    vat = r2((net * p) / 100);
    working.push({ label: "Net amount", amount: net });
    working.push({ label: `VAT: ${gbp(net)} × ${pctLabel(p)}`, amount: vat, rateId: input.rateId });
    working.push({ label: "VAT-inclusive amount", amount: r2(net + vat), kind: "total" });
  }
  return {
    taxYear: input.taxYear,
    tax: vat,
    working,
    rateIds: [...R.used],
    notes: ["VAT is rounded to the nearest penny here; invoice-level rounding rules (round down or nearest penny per line) can differ by a penny."],
    net,
    vat,
    gross: r2(net + vat),
  };
}

/* ------------------------------------------------------------------ */
/* Registration threshold monitor                                       */
/* ------------------------------------------------------------------ */

export interface RegistrationInput {
  taxYear: string;
  /** Month the first turnover figure relates to, yyyy-mm. */
  firstMonth: string;
  /** Taxable turnover for each month in order (12 to 24 months). */
  monthly: number[];
  /** Taxable turnover expected in the next 30 days alone (forward look). */
  next30Days: number;
  /** Date the next-30-days period starts (the date you realised). */
  next30Start?: string;
}

export interface MonthRow {
  month: string; // yyyy-mm
  turnover: number;
  rolling: number | null;
  over: boolean;
}

export interface RegistrationResult extends CalcResult {
  rows: MonthRow[];
  threshold: number;
  breachMonth: string | null;
  registerBy: string | null;
  effectiveDate: string | null;
  forwardLook: { registerBy: string; effectiveDate: string } | null;
  /** Headroom under the threshold for the latest 12 months (negative when over). */
  headroom: number | null;
}

export function validateRegistration(i: RegistrationInput): string[] {
  const e: string[] = [];
  if (!/^\d{4}-\d{2}$/.test(i.firstMonth) || !isIsoDate(`${i.firstMonth}-01`)) e.push("Enter the first month (e.g. 2025-10).");
  if (i.monthly.length < 1) e.push("Enter at least one month's turnover.");
  if (i.monthly.length > 24) e.push("Enter at most 24 months.");
  i.monthly.forEach((m, k) => {
    if (!Number.isFinite(m)) e.push(`Month ${k + 1}: enter a number.`);
    else if (m < 0) e.push(`Month ${k + 1}: turnover can't be negative.`);
  });
  if (!Number.isFinite(i.next30Days) || i.next30Days < 0) e.push("Expected turnover in the next 30 days can't be negative.");
  if (i.next30Days > 0 && (!i.next30Start || !isIsoDate(i.next30Start))) e.push("Enter the date the 30-day period starts.");
  return e;
}

export function vatRegistrationMonitor(input: RegistrationInput): RegistrationResult {
  const errors = validateRegistration(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const threshold = R.gbp("vat.registration-threshold");
  R.text("vat.registration-notify-rule");
  return build(input, R, threshold);
}

function build(input: RegistrationInput, R: ReturnType<typeof businessReader>, threshold: number): RegistrationResult {
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const rows: MonthRow[] = [];
  let breach: string | null = null;
  input.monthly.forEach((t, k) => {
    const month = addMonths(`${input.firstMonth}-01`, k).slice(0, 7);
    const rolling = k >= 11 ? r2(input.monthly.slice(k - 11, k + 1).reduce((s, x) => s + x, 0)) : null;
    const over = rolling !== null && rolling > threshold;
    if (over && !breach) breach = month;
    rows.push({ month, turnover: t, rolling, over });
  });
  const last = rows[rows.length - 1];
  const headroom = last?.rolling != null ? r2(threshold - last.rolling) : null;

  working.push({ label: "Registration threshold (taxable turnover, rolling 12 months)", amount: threshold, rateId: "vat.registration-threshold", kind: "memo" });
  for (const r of rows) {
    if (r.rolling === null) continue;
    working.push({ label: `12 months to the end of ${monthName(r.month)}${r.over ? " — over the threshold" : ""}`, amount: r.rolling });
  }
  if (rows.length < 12) working.push({ label: "Fewer than 12 months entered: the rolling test needs 12 months (enter nil for months before trading started).", amount: 0, kind: "note" });

  let registerBy: string | null = null;
  let effectiveDate: string | null = null;
  if (breach) {
    const monthEnd = lastDayOfMonth(`${breach}-01`);
    registerBy = addDays(monthEnd, 30);
    effectiveDate = addMonths(`${breach}-01`, 2);
    working.push({ label: `First went over at the end of ${monthName(breach)}: register by ${longDate(registerBy)} (30 days after the month end); registered from ${longDate(effectiveDate)}`, amount: 0, kind: "note" });
  } else if (headroom !== null) {
    working.push({ label: "Headroom before the threshold is exceeded", amount: headroom, kind: "subtotal" });
  }

  let forwardLook: RegistrationResult["forwardLook"] = null;
  if (input.next30Days > 0 && input.next30Start) {
    if (input.next30Days > threshold) {
      forwardLook = { registerBy: addDays(input.next30Start, 29), effectiveDate: input.next30Start };
      working.push({
        label: `Forward look: ${gbp(input.next30Days)} expected in the 30 days from ${longDate(input.next30Start)} alone exceeds ${gbp(threshold)} — register by ${longDate(forwardLook.registerBy)}, registered from ${longDate(input.next30Start)}`,
        amount: 0,
        kind: "note",
      });
    } else {
      working.push({ label: `Forward look: ${gbp(input.next30Days)} expected in the next 30 days alone doesn't exceed the threshold`, amount: 0, kind: "note" });
    }
  }
  working.push({ label: "Latest rolling 12-month taxable turnover", amount: last?.rolling ?? r2(input.monthly.reduce((s, x) => s + x, 0)), kind: "total" });

  notes.push("Taxable turnover includes zero-rated and reduced-rated sales, reverse-charge services received and certain other items; it excludes exempt and out-of-scope income and sales of capital assets. Enter it net of VAT.");
  notes.push("The historic test is checked at each month end. Exception from registration (a temporary breach) and exemption for zero-rated traders need an application to HMRC and aren't modelled.");
  notes.push("Late registration: VAT is due on sales from the date you should have been registered, and a penalty may apply.");

  return {
    taxYear: input.taxYear,
    tax: last?.rolling ?? 0,
    working,
    rateIds: [...R.used],
    notes,
    rows,
    threshold,
    breachMonth: breach,
    registerBy,
    effectiveDate,
    forwardLook,
    headroom,
  };
}

function monthName(ym: string): string {
  return new Date(`${ym}-15T12:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}
