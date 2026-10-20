/**
 * PAYE income tax for a pay period by the exact percentage method, following
 * HMRC's "Specification for PAYE tax table routines" v24.0 (February 2026),
 * https://www.gov.uk/government/publications/payroll-technical-specifications-income-tax
 *
 * Paragraph references (e.g. "spec 4.3.1") are to that document. Rates and
 * bands come from the dataset; only the routine's mechanics live here.
 */
import { CalcInputError, type WorkingLine, gbp, pctLabel } from "../common";
import { type Frequency, type Reader, PERIODS, PERIOD_LABEL, floorPenny, floorPound, trunc4 } from "./shared";

export type TaxRegion = "rUK" | "scotland" | "wales";

export interface TaxCode {
  /** As typed, normalised to upper case without spaces. */
  normalised: string;
  region: TaxRegion;
  kind: "allowance" | "k" | "flat" | "nt";
  /** Numeric part for allowance (suffix) and K codes. */
  number: number;
  /** For flat codes (BR, D0, D1…): index into the region's bands. */
  flatBand?: number;
  /** W1, M1 or X: operated on a week 1 / month 1 (non-cumulative) basis. */
  nonCumulative: boolean;
  suffix?: string;
}

const CODE_RE = /^(S|C)?(?:(\d+)([LMNT])|K(\d+)|(BR)|D(\d)|(NT))(W1|M1|X)?$/;

/** Parse a tax code such as 1257L, S1257L, C1257L M1, K468, BR, SD0, NT, 0T. Returns an error message if invalid. */
export function parseTaxCode(raw: string): { code?: TaxCode; error?: string } {
  const s = raw.toUpperCase().replace(/[\s/]/g, "");
  if (!s) return { error: "Enter a tax code, e.g. 1257L." };
  const m = CODE_RE.exec(s);
  if (!m) return { error: `"${raw.trim()}" isn't a tax code this calculator recognises. Use forms like 1257L, S1257L, C1257L, K468, BR, D0, SD1, NT or 0T, optionally followed by W1, M1 or X.` };
  const [, prefix, num, suffix, kNum, br, dNum, nt, basis] = m;
  if (nt && prefix) return { error: "There is no SNT or CNT code: NT applies UK-wide (spec 7.1)." };
  const region: TaxRegion = prefix === "S" ? "scotland" : prefix === "C" ? "wales" : "rUK";
  const nonCumulative = !!basis;
  const base = { normalised: s, region, nonCumulative };
  if (num !== undefined) return { code: { ...base, kind: "allowance", number: Number(num), suffix } };
  if (kNum !== undefined) {
    if (Number(kNum) === 0) return { error: "There is no K0 code (spec 4.3.1)." };
    return { code: { ...base, kind: "k", number: Number(kNum) } };
  }
  if (br) return { code: { ...base, kind: "flat", number: 0, flatBand: -1 } }; // resolved against bands later
  if (dNum !== undefined) return { code: { ...base, kind: "flat", number: 0, flatBand: Number(dNum) } };
  return { code: { ...base, kind: "nt", number: 0 } };
}

export interface TaxBand {
  /** Rate as a plain percentage. */
  rate: number;
  rateId: string;
  /** Upper limit of cumulative taxable pay for the year (Infinity for the top band). */
  upper: number;
  upperId?: string;
  label: string;
  /** True for the basic rate band (spec "G pointer"). */
  basic?: boolean;
}

/** The region's annual bands (spec Appendix A / B / C), from the dataset. */
export function taxBands(R: Reader, region: TaxRegion): TaxBand[] {
  if (region === "scotland") {
    return [
      { rate: R.percent("scot.starter-rate"), rateId: "scot.starter-rate", upper: R.gbp("scot.starter-band-upper"), upperId: "scot.starter-band-upper", label: "starter rate" },
      { rate: R.percent("scot.basic-rate"), rateId: "scot.basic-rate", upper: R.gbp("scot.basic-band-upper"), upperId: "scot.basic-band-upper", label: "basic rate", basic: true },
      { rate: R.percent("scot.intermediate-rate"), rateId: "scot.intermediate-rate", upper: R.gbp("scot.intermediate-band-upper"), upperId: "scot.intermediate-band-upper", label: "intermediate rate" },
      { rate: R.percent("scot.higher-rate"), rateId: "scot.higher-rate", upper: R.gbp("scot.higher-band-upper"), upperId: "scot.higher-band-upper", label: "higher rate" },
      { rate: R.percent("scot.advanced-rate"), rateId: "scot.advanced-rate", upper: R.gbp("scot.advanced-band-upper"), upperId: "scot.advanced-band-upper", label: "advanced rate" },
      { rate: R.percent("scot.top-rate"), rateId: "scot.top-rate", upper: Infinity, label: "top rate" },
    ];
  }
  // England, Northern Ireland and Wales: the Welsh rates currently equal the rest-of-UK rates
  // (spec Appendix C: WR1–WR4 = R1–R4), so C codes use the same bands.
  return [
    { rate: R.percent("it.basic-rate"), rateId: "it.basic-rate", upper: R.gbp("it.basic-rate-band"), upperId: "it.basic-rate-band", label: "basic rate", basic: true },
    { rate: R.percent("it.higher-rate"), rateId: "it.higher-rate", upper: R.gbp("it.additional-rate-threshold"), upperId: "it.additional-rate-threshold", label: "higher rate" },
    { rate: R.percent("it.additional-rate"), rateId: "it.additional-rate", upper: Infinity, label: "additional rate" },
  ];
}

/**
 * Week 1 / Month 1 free pay (suffix codes) or additional pay (K codes) for a
 * code number, per spec 4.3.1: annual value = number × £10 + £9, ÷ 52 or ÷ 12
 * rounded UP to the penny; numbers over 500 are split into 500-blocks
 * (£96.16 a week / £416.67 a month each, i.e. £5,000 ÷ 52 or ÷ 12 rounded up)
 * plus the remainder.
 */
export function periodAdjustment(codeNumber: number, divisor: 52 | 12): number {
  if (codeNumber <= 0) return 0;
  const ceilP = (x: number) => Math.ceil(trunc4(x) * 100 - 1e-7) / 100;
  // "Note for programmers" (spec 4.3.1): subtract 1, divide by 500, add 1 to the remainder.
  const q = Math.floor((codeNumber - 1) / 500);
  const rem = ((codeNumber - 1) % 500) + 1;
  const remValue = ceilP((rem * 10 + 9) / divisor);
  const block = ceilP((500 * 10) / divisor); // £96.16 weekly, £416.67 monthly (spec 4.3.1c iv)
  return Math.round((remValue + q * block) * 100) / 100;
}

export interface PayeResult {
  tax: number;
  /** Tax before the overriding regulatory limit. */
  taxBeforeLimit: number;
  /** Free pay (positive) or additional pay (negative) used for the period/to date. */
  freePay: number;
  taxablePay: number;
  limited: boolean;
  working: WorkingLine[];
}

export interface PayeInput {
  code: TaxCode;
  frequency: Frequency;
  /** Pay for tax in this period (after net pay pension and salary sacrifice, including payrolled benefits). */
  pay: number;
  /** Payrolled benefits included in `pay` (excluded from the regulatory limit, spec 4.5.2). */
  payrolledBenefits?: number;
  /**
   * Cumulative operation: pay to date (including this period) and the period number.
   * Omit for a single period (week 1 / month 1 basis, or the first period of the year).
   */
  cumulative?: { payToDate: number; periodNumber: number; taxPaidToDate: number };
}

/**
 * Tax for one pay period. For "annual" pay HMRC's Month 12 tables are used
 * (spec 13: payments at other than weekly/monthly intervals), which is the same
 * as month-1 values × 12.
 */
export function payeTax(R: Reader, input: PayeInput): PayeResult {
  const { code, frequency } = input;
  const divisor: 52 | 12 = frequency === "weekly" ? 52 : 12;
  const n = input.cumulative ? input.cumulative.periodNumber : frequency === "annual" ? 12 : 1;
  const P = input.cumulative ? input.cumulative.payToDate : input.pay;
  const per = PERIOD_LABEL[frequency];
  const toDate = input.cumulative ? " to date" : "";
  const working: WorkingLine[] = [];
  const bands = taxBands(R, code.region);

  if (n < 1 || n > divisor) throw new CalcInputError([`Period number must be between 1 and ${divisor}.`]);

  let L: number;
  let freePay = 0;
  let taxable = 0;
  if (code.kind === "nt") {
    L = 0;
    working.push({ label: `Code NT: no tax deducted`, amount: 0, kind: "note" });
  } else if (code.kind === "flat") {
    // BR / D codes: the whole pay rounded down to £1 at one rate (spec 5.4 and 6.4).
    const basicIndex = bands.findIndex((b) => b.basic);
    const idx = code.flatBand === -1 ? basicIndex : basicIndex + 1 + (code.flatBand ?? 0);
    const band = bands[idx];
    if (!band) throw new CalcInputError([`Code ${code.normalised} doesn't exist for ${code.region === "scotland" ? "Scottish" : "rest-of-UK"} taxpayers.`]);
    taxable = floorPound(P);
    L = floorPenny(trunc4((taxable * band.rate) / 100));
    working.push({ label: `Code ${code.normalised}: all pay${toDate} ${gbp(taxable)} (rounded down to £1) × ${pctLabel(band.rate)} (${band.label})`, amount: L, rateId: band.rateId });
  } else {
    const week1 = periodAdjustment(code.number, divisor);
    const adj = Math.round(week1 * n * 100) / 100;
    freePay = code.kind === "k" ? -adj : adj;
    const U = code.kind === "k" ? P + adj : P - adj;
    const unit = divisor === 52 ? "week" : "month";
    const nLabel = n === 1 ? `${unit} 1` : `${n} × ${unit} 1 value ${gbp(week1)}`;
    working.push({
      label:
        code.kind === "k"
          ? `Add: additional pay for K${code.number} (${code.number} × £10 + £9 a year; ${nLabel})`
          : `Less: free pay for code ${code.number}${code.suffix ?? ""} (${code.number} × £10 + £9 a year; ${nLabel})`,
      amount: code.kind === "k" ? adj : -adj,
    });
    if (U <= 0) {
      L = 0;
      working.push({ label: `Taxable pay${toDate}: nil`, amount: 0, kind: "subtotal" });
    } else {
      // Spec 4.4: identify the top band using thresholds rounded UP to £1 (Cvalues),
      // then tax with the exact thresholds (to 4 dp, uncorrected) and round down to 1p.
      const T = floorPound(U);
      taxable = T;
      working.push({ label: `Taxable pay${toDate} (rounded down to £1)`, amount: T, kind: "subtotal" });
      const c = bands.map((b) => (b.upper === Infinity ? Infinity : trunc4((b.upper * n) / divisor)));
      const v = c.map((x) => (x === Infinity ? Infinity : Math.ceil(x - 1e-9)));
      let j = v.findIndex((x) => T <= x);
      if (j < 0) j = bands.length - 1;
      let k = 0;
      let prevC = 0;
      for (let i = 0; i < j; i++) {
        const width = c[i] - prevC;
        const t = trunc4((width * bands[i].rate) / 100);
        k = trunc4(k + t);
        working.push({
          label: `${gbp(width)} in ${bands[i].label} band${frequency === "annual" ? "" : ` (${gbp(bands[i].upper)} × ${n}/${divisor})`} × ${pctLabel(bands[i].rate)}`,
          amount: Math.round(t * 100) / 100,
          rateId: bands[i].rateId,
        });
        prevC = c[i];
      }
      const top = trunc4(((T - prevC) * bands[j].rate) / 100);
      working.push({ label: `${gbp(T - prevC)} at ${bands[j].label} × ${pctLabel(bands[j].rate)}`, amount: Math.round(top * 100) / 100, rateId: bands[j].rateId });
      L = floorPenny(trunc4(k + top));
    }
  }

  // Stage 4: this period's tax (cumulative: less tax already paid).
  const paid = input.cumulative?.taxPaidToDate ?? 0;
  const due = Math.round((L - paid) * 100) / 100;
  if (input.cumulative) {
    working.push({ label: `Tax due to date`, amount: L, kind: "subtotal" });
    working.push({ label: `Less tax already deducted this year`, amount: -paid });
  }

  // Spec 4.5.2: the overriding regulatory limit, on this period's pay excluding payrolled benefits.
  const maxRate = R.percent("emp.paye-regulatory-limit");
  const limitBase = Math.max(0, input.pay - (input.payrolledBenefits ?? 0));
  const limit = floorPenny(trunc4((limitBase * maxRate) / 100));
  const limited = due > limit;
  const tax = limited ? limit : due;
  if (limited) {
    working.push({
      label: `Overriding limit: tax can't exceed ${pctLabel(maxRate)} of this ${per}'s pay (${gbp(limitBase)}), so ${gbp(due - limit)} is carried forward`,
      amount: -(Math.round((due - limit) * 100) / 100),
      rateId: "emp.paye-regulatory-limit",
    });
  }
  return { tax, taxBeforeLimit: due, freePay, taxablePay: taxable, limited, working };
}

/** Number of pay periods in a year for a frequency. */
export function periodsIn(f: Frequency): number {
  return PERIODS[f];
}

/**
 * The code HMRC would issue for a tax-free amount (allowances less deductions), as
 * described in the lesson "Starters and tax codes": drop the last digit; a negative
 * amount becomes a K code. Annual negative allowances of £1–£19 are code 0T (spec 4.3.1).
 */
export function codeForAllowance(allowance: number, suffix = "L"): string {
  if (allowance >= 1) return `${Math.max(1, Math.floor(allowance / 10))}${suffix}`;
  if (allowance > -20) return "0T";
  return `K${Math.floor(-allowance / 10)}`;
}
