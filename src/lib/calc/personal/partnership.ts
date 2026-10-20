/**
 * Partnership profit allocation and each partner's tax.
 *
 * 1. Allocation for each period of account: partners' salaries, interest on
 *    capital, then the balance in the profit-sharing ratio, with the
 *    arrangements time-apportioned where they change during the period
 *    (ratio changes, partners joining or leaving).
 * 2. Notional profits and losses (ITTOIA 2005 s850A/s850B; HMRC Partnership
 *    Manual PM163050, examples PM163060): where the allocation gives a mix of
 *    profits and losses, the actual result is reallocated among the
 *    profit-making (or loss-making) partners alone, in proportion to their
 *    notional amounts.
 * 3. Tax-year basis (from 2024/25; BIM81201): each partner's share of one or
 *    two periods of account is apportioned to the tax year by days (or months
 *    used consistently). Accounting dates from 31 March to 4 April are treated
 *    as 5 April (late accounting date rule, BIM81210).
 * 4. Transition profit spreading from 2023/24 (BIM81310): 20% a year for
 *    2023/24 to 2026/27 and the balance in 2027/28; elections to accelerate
 *    reduce the base by A × 5/T; on cessation the balance is taxed.
 * 5. Each partner's income tax, Class 4 and Class 2 through the self-employed
 *    engine with their own other income.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, requireNonNegative } from "../common";
import { ratesFor } from "@/content/rates";
import type { PersonalTaxInput } from "./incomeTax";
import { selfEmployedTax, validateSelfEmployed, type SelfEmployedInput, type SelfEmployedResult } from "./selfEmployed";

// ── Dates (UTC, whole days) ────────────────────────────────────────────────
const DAY = 86_400_000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-04-06" → UTC ms, or null if not a real date. */
export function parseIsoDate(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const dt = new Date(t);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return t;
}
export function longDate(t: number): string {
  const d = new Date(t);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
/** Days from a to b inclusive. */
export function daysInclusive(a: number, b: number): number {
  return Math.round((b - a) / DAY) + 1;
}
/** Months from a to b inclusive, with part months as a fraction of the end month (1 Apr–30 Sep = 6). */
export function monthsInclusive(a: number, b: number): number {
  const A = new Date(a);
  const B = new Date(b);
  const dim = new Date(Date.UTC(B.getUTCFullYear(), B.getUTCMonth() + 1, 0)).getUTCDate();
  return (B.getUTCFullYear() - A.getUTCFullYear()) * 12 + (B.getUTCMonth() - A.getUTCMonth()) + (B.getUTCDate() + 1 - A.getUTCDate()) / dim;
}

export type ApportionMethod = "days" | "months";
const len = (method: ApportionMethod, a: number, b: number) => (method === "days" ? daysInclusive(a, b) : monthsInclusive(a, b));
const unit = (method: ApportionMethod) => (method === "days" ? "days" : "months");
const n2 = (x: number) => Number(x.toFixed(2));

// ── Inputs ─────────────────────────────────────────────────────────────────
export interface PartnerTerms {
  /** Annual salary (a first slice of profit, not an expense). */
  salary: number;
  /** Capital on which interest is allocated. */
  capital: number;
  /** Share of the balance, %. */
  share: number;
}

export interface Arrangement {
  /** First day the arrangement applies (ISO date). The first arrangement applies from the start. */
  from: string;
  /** Interest on capital, % a year. */
  interestRate: number;
  /** One entry per partner, in partner order. Give a partner who isn't yet (or no longer) a partner nil terms. */
  terms: PartnerTerms[];
}

export interface AccountsPeriod {
  start: string;
  end: string;
  /** Tax-adjusted trading profit (negative for a loss), after capital allowances and adding back salaries and interest. */
  profit: number;
}

export interface PartnerTaxDetails extends Omit<PersonalTaxInput, "taxYear" | "trading" | "transitionProfit"> {
  name: string;
  /** Total 2023/24 transition profit (after overlap relief) being spread. */
  transitionProfitTotal?: number;
  /** Extra transition profit elected to be taxed early, by tax year (e.g. { "2025/26": 3000 }). */
  transitionAccelerated?: Record<string, number>;
  /** Partner left the partnership permanently in this tax year (their trade ceases: transition balance taxed now). */
  ceasedThisYear?: boolean;
  overStatePensionAge?: boolean;
  voluntaryClass2Weeks?: number;
  poasPaid?: number;
  class4OnTransition?: boolean;
}

export interface PartnershipInput {
  taxYear: string;
  method: ApportionMethod;
  /** One period of account, or two consecutive periods covering the tax year. */
  periods: AccountsPeriod[];
  arrangements: Arrangement[];
  partners: PartnerTaxDetails[];
}

// ── Transition profit (BIM81310) ───────────────────────────────────────────
export const TRANSITION_YEARS = ["2023/24", "2024/25", "2025/26", "2026/27", "2027/28"] as const;

export interface TransitionYear {
  year: string;
  standard: number;
  accelerated: number;
  amount: number;
}

/**
 * Spread a transition profit (BIM81310): each of the first four years takes 20% of the base, the fifth the
 * balance. An election to tax an extra amount A in a year reduces the base by A × 5/T, where T is the number
 * of spreading years after the election year. On cessation the untaxed balance is taxed in that year.
 * The 20% (one-fifth) and 5/T are statutory mechanics of FA 2022 Sch 1 para 75–76, per BIM81310.
 */
export function transitionSchedule(total: number, accelerated: Record<string, number> = {}, ceasedIn?: string): TransitionYear[] {
  const out: TransitionYear[] = [];
  let base = total;
  let taxed = 0;
  for (let k = 0; k < TRANSITION_YEARS.length; k++) {
    const year = TRANSITION_YEARS[k];
    const remaining = total - taxed;
    if (remaining <= 0.005) {
      out.push({ year, standard: 0, accelerated: 0, amount: 0 });
      continue;
    }
    if (ceasedIn === year) {
      out.push({ year, standard: r2(remaining), accelerated: 0, amount: r2(remaining) });
      taxed = total;
      continue;
    }
    const standard = k < TRANSITION_YEARS.length - 1 ? Math.min(remaining, base / 5) : remaining;
    const extra = Math.min(Math.max(0, accelerated[year] ?? 0), remaining - standard);
    const T = TRANSITION_YEARS.length - 1 - k;
    if (extra > 0 && T > 0) base -= (extra * 5) / T;
    const amount = standard + extra;
    taxed += amount;
    out.push({ year, standard: r2(standard), accelerated: r2(extra), amount: r2(amount) });
  }
  return out;
}

// ── Allocation ─────────────────────────────────────────────────────────────
export interface SegmentAllocation {
  from: number;
  to: number;
  length: number;
  profit: number;
  salaries: number[];
  interest: number[];
  balance: number;
  balanceShares: number[];
  totals: number[];
}

export interface PeriodAllocation {
  start: number;
  end: number;
  profit: number;
  segments: SegmentAllocation[];
  /** Commercial (notional) allocation per partner. */
  notional: number[];
  /** Allocation for tax after the s850A/s850B reallocation. */
  allocated: number[];
  reallocated: boolean;
  working: WorkingLine[];
}

function allocatePeriod(period: AccountsPeriod, idx: number, arrangements: Arrangement[], names: string[], method: ApportionMethod): PeriodAllocation {
  const ps = parseIsoDate(period.start)!;
  const pe = parseIsoDate(period.end)!;
  const n = names.length;
  const periodLen = len(method, ps, pe);
  // Annual salaries and interest are scaled to the period's length in years (12 months = 1).
  const periodYears = monthsInclusive(ps, pe) / 12;
  const working: WorkingLine[] = [];
  const label = `Period ${idx + 1} (${longDate(ps)} to ${longDate(pe)})`;
  working.push({ label: `${label}: tax-adjusted trading ${period.profit < 0 ? "loss" : "profit"}`, amount: period.profit, kind: "subtotal" });

  const starts = arrangements.map((a, k) => (k === 0 ? -Infinity : parseIsoDate(a.from)!));
  const segments: SegmentAllocation[] = [];
  arrangements.forEach((a, k) => {
    const from = Math.max(ps, starts[k]);
    const to = Math.min(pe, k + 1 < arrangements.length ? starts[k + 1] - DAY : Infinity);
    if (to < from) return;
    const segLen = len(method, from, to);
    const frac = segLen / periodLen;
    const yearFrac = periodYears * frac;
    const profit = period.profit * frac;
    const salaries = a.terms.map((t) => t.salary * yearFrac);
    const interest = a.terms.map((t) => (t.capital * a.interestRate * yearFrac) / 100);
    const balance = profit - salaries.reduce((s, x) => s + x, 0) - interest.reduce((s, x) => s + x, 0);
    const balanceShares = a.terms.map((t) => (balance * t.share) / 100);
    const totals = a.terms.map((_, j) => salaries[j] + interest[j] + balanceShares[j]);
    segments.push({ from, to, length: segLen, profit, salaries, interest, balance, balanceShares, totals });

    const multi = arrangements.length > 1;
    const segLabel = multi ? `${longDate(from)} to ${longDate(to)}: ${n2(segLen)} of ${n2(periodLen)} ${unit(method)}` : "Whole period";
    if (multi) working.push({ label: `${segLabel}: profit ${gbp(period.profit)} × ${n2(segLen)}/${n2(periodLen)}`, amount: r2(profit) });
    const salTot = salaries.reduce((s, x) => s + x, 0);
    const intTot = interest.reduce((s, x) => s + x, 0);
    if (salTot) working.push({ label: `Less partners' salaries${multi || Math.abs(periodYears - 1) > 0.001 ? ` (annual × ${n2(yearFrac)} years)` : ""}`, amount: -r2(salTot) });
    if (intTot) working.push({ label: `Less interest on capital at ${pctLabel(a.interestRate)}`, amount: -r2(intTot) });
    working.push({
      label: `Balance shared ${a.terms.map((t, j) => `${names[j]} ${pctLabel(t.share)}`).join(", ")}`,
      amount: r2(balance),
    });
  });

  const notional = Array.from({ length: n }, (_, j) => segments.reduce((s, g) => s + g.totals[j], 0));
  let allocated = [...notional];
  let reallocated = false;
  // ITTOIA 2005 s850A/s850B; PM163050: a mixture of notional profits and losses is replaced by a straight
  // apportionment of the actual result among the partners on the same side as the result, pro rata to
  // their notional amounts.
  const total = period.profit;
  const hasPos = notional.some((x) => x > 0.005);
  const hasNeg = notional.some((x) => x < -0.005);
  if (hasPos && hasNeg) {
    reallocated = true;
    if (Math.abs(total) < 0.005) {
      allocated = notional.map(() => 0);
    } else {
      const sameSide = notional.map((x) => (total > 0 ? Math.max(0, x) : Math.min(0, x)));
      const sum = sameSide.reduce((s, x) => s + x, 0);
      allocated = sameSide.map((x) => (total * x) / sum);
    }
  }
  allocated = allocated.map(r2);
  // Pennies: keep the allocated total equal to the actual result.
  const diff = r2(total - allocated.reduce((s, x) => s + x, 0));
  if (diff !== 0) {
    const j = allocated.reduce((best, x, k) => (Math.abs(x) > Math.abs(allocated[best]) ? k : best), 0);
    allocated[j] = r2(allocated[j] + diff);
  }

  for (let j = 0; j < n; j++) working.push({ label: `${names[j]}: share per the agreement`, amount: r2(notional[j]), kind: "memo" });
  if (reallocated) {
    const side = total > 0 ? "profit" : "loss";
    working.push({
      label:
        Math.abs(total) < 0.005
          ? "Notional profits and losses with a nil overall result: every partner's share for tax is nil (ITTOIA 2005 s850A/s850B, PM163050)"
          : `Notional profits and losses: the actual ${side} of ${gbp(total)} is reallocated among the ${side}-making partners in proportion to their notional ${side}s (ITTOIA 2005 s850A/s850B, PM163050)`,
      amount: 0,
      kind: "note",
    });
    for (let j = 0; j < n; j++) working.push({ label: `${names[j]}: share for tax`, amount: allocated[j] });
  }
  return { start: ps, end: pe, profit: period.profit, segments, notional, allocated, reallocated, working };
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validatePartnership(i: PartnershipInput): string[] {
  const e: string[] = [];
  const n = i.partners.length;
  if (n < 2 || n > 10) e.push("A partnership here needs 2 to 10 partners.");
  if (!ratesFor(i.taxYear)) e.push(`No verified rates for ${i.taxYear}.`);
  if (i.periods.length < 1 || i.periods.length > 2) e.push("Enter one or two periods of account.");
  i.periods.forEach((p, k) => {
    const s = parseIsoDate(p.start);
    const t = parseIsoDate(p.end);
    if (s === null || t === null) e.push(`Period ${k + 1}: enter valid start and end dates.`);
    else if (t < s) e.push(`Period ${k + 1}: the end date is before the start date.`);
    else if (monthsInclusive(s, t) > 18.01) e.push(`Period ${k + 1}: a period of account over 18 months isn't supported.`);
    if (!Number.isFinite(p.profit)) e.push(`Period ${k + 1}: profit must be a number.`);
  });
  if (i.periods.length === 2) {
    const e1 = parseIsoDate(i.periods[0].end);
    const s2 = parseIsoDate(i.periods[1].start);
    if (e1 !== null && s2 !== null && s2 !== e1 + DAY) e.push("Period 2 must start the day after period 1 ends.");
  }
  if (!i.arrangements.length) e.push("Enter the profit-sharing arrangements.");
  let prev = -Infinity;
  i.arrangements.forEach((a, k) => {
    const lbl = i.arrangements.length > 1 ? `Arrangement ${k + 1}` : "Profit-sharing";
    if (k > 0) {
      const f = parseIsoDate(a.from);
      if (f === null) e.push(`${lbl}: enter the date it starts.`);
      else if (f <= prev) e.push(`${lbl}: dates must be in order.`);
      else prev = f;
    }
    if (a.terms.length !== n) e.push(`${lbl}: terms are needed for every partner.`);
    requireNonNegative(e, `${lbl}: interest rate`, a.interestRate);
    a.terms.forEach((t, j) => {
      const who = i.partners[j]?.name || `Partner ${j + 1}`;
      requireNonNegative(e, `${lbl}, ${who}: salary`, t.salary);
      requireNonNegative(e, `${lbl}, ${who}: capital`, t.capital);
      if (!(t.share >= 0 && t.share <= 100)) e.push(`${lbl}, ${who}: share must be between 0% and 100%.`);
    });
    const sum = a.terms.reduce((s, t) => s + t.share, 0);
    if (Math.abs(sum - 100) > 0.01) e.push(`${lbl}: profit shares add up to ${n2(sum)}%, not 100%.`);
  });
  i.partners.forEach((p, j) => {
    const errs = validateSelfEmployed({ ...p, taxYear: i.taxYear, trading: { mode: "profit", turnover: 0, expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 } });
    for (const x of errs) e.push(`${p.name || `Partner ${j + 1}`}: ${x}`);
    requireNonNegative(e, `${p.name || `Partner ${j + 1}`}: transition profit`, p.transitionProfitTotal);
    for (const [y, a] of Object.entries(p.transitionAccelerated ?? {})) requireNonNegative(e, `${p.name || `Partner ${j + 1}`}: transition profit accelerated in ${y}`, a);
  });
  return e;
}

// ── Main ───────────────────────────────────────────────────────────────────
export interface PartnerOutcome {
  name: string;
  /** Share of each period's result for tax. */
  periodShares: number[];
  /** Part of each period's share falling in the tax year. */
  taxYearParts: number[];
  /** Share of profit (or loss, negative) arising in the tax year. */
  taxYearShare: number;
  transitionSlice: number;
  transitionSchedule: TransitionYear[] | null;
  loss: number;
  /** Inputs passed to the self-employed engine (for target modes). */
  taxInput: SelfEmployedInput;
  result: SelfEmployedResult;
  /** Allocation and apportionment lines for this partner, followed by their computation. */
  working: WorkingLine[];
}

export interface PartnershipResult extends CalcResult {
  periods: PeriodAllocation[];
  /** Fraction (days or months) of each period falling in the tax year. */
  taxYearFractions: { inYear: number; length: number }[];
  taxYearStart: number;
  taxYearEnd: number;
  /** Partnership profit arising in the tax year. */
  firmTaxYearProfit: number;
  partners: PartnerOutcome[];
}

const LATE_DATE_NOTE = "BIM81210";

/** Treat an accounting date from 31 March to 4 April as 5 April (BIM81210), so the next period starts on 6 April. */
function effectiveBounds(start: number, end: number, method: ApportionMethod): [number, number] {
  if (method === "months") return [start, end];
  const adj = (t: number, isEnd: boolean) => {
    const d = new Date(t);
    const m = d.getUTCMonth();
    const day = d.getUTCDate();
    if (isEnd && ((m === 2 && day === 31) || (m === 3 && day <= 4))) return Date.UTC(d.getUTCFullYear(), 3, 5);
    if (!isEnd && m === 3 && day >= 1 && day <= 5) return Date.UTC(d.getUTCFullYear(), 3, 6);
    return t;
  };
  return [adj(start, false), adj(end, true)];
}

export function partnershipTax(input: PartnershipInput): PartnershipResult {
  const errors = validatePartnership(input);
  if (errors.length) throw new CalcInputError(errors);
  const { method, taxYear } = input;
  const names = input.partners.map((p, j) => p.name.trim() || `Partner ${j + 1}`);
  const year = ratesFor(taxYear)!;
  const y0 = Number(year.startDate.slice(0, 4));
  // Days: the tax year 6 April to 5 April. Months: treated as April to March (31 March year ends are aligned).
  const tyStart = method === "days" ? Date.UTC(y0, 3, 6) : Date.UTC(y0, 3, 1);
  const tyEnd = method === "days" ? Date.UTC(y0 + 1, 3, 5) : Date.UTC(y0 + 1, 2, 31);

  const periods = input.periods.map((p, k) => allocatePeriod(p, k, input.arrangements, names, method));
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  periods.forEach((p) => working.push(...p.working));

  // Tax-year basis (BIM81201): apportion each period's shares to the tax year.
  working.push({ label: `Profit arising in ${taxYear} (tax-year basis, by ${unit(method)})`, amount: 0, kind: "note" });
  let lateRule = false;
  const fractions = periods.map((p) => {
    const [s, e] = effectiveBounds(p.start, p.end, method);
    if (s !== p.start || e !== p.end) lateRule = true;
    const from = Math.max(s, tyStart);
    const to = Math.min(e, tyEnd);
    const inYear = to >= from ? len(method, from, to) : 0;
    return { inYear, length: len(method, s, e), from, to };
  });
  let firm = 0;
  periods.forEach((p, k) => {
    const f = fractions[k];
    const part = f.length ? (p.profit * f.inYear) / f.length : 0;
    firm += part;
    working.push({
      label: f.inYear
        ? `Period ${k + 1}: ${gbp(p.profit)} × ${n2(f.inYear)}/${n2(f.length)} ${unit(method)} (${longDate(f.from)} to ${longDate(f.to)})`
        : `Period ${k + 1}: no part falls in ${taxYear}`,
      amount: r2(part),
    });
  });
  working.push({ label: `Partnership profit arising in ${taxYear}`, amount: r2(firm), kind: "subtotal" });
  if (lateRule) notes.push(`An accounting date from 31 March to 4 April is treated as 5 April, so the year's accounts line up with the tax year (late accounting date rule, ${LATE_DATE_NOTE}).`);

  // Coverage of the tax year.
  const bounds = periods.map((p) => effectiveBounds(p.start, p.end, method));
  const covStart = Math.max(tyStart, Math.min(...bounds.map((b) => b[0])));
  const covEnd = Math.min(tyEnd, Math.max(...bounds.map((b) => b[1])));
  if (covStart > tyStart || covEnd < tyEnd) {
    notes.push(
      `The accounts entered cover ${covEnd >= covStart ? `${longDate(covStart)} to ${longDate(covEnd)}` : "none"} of the tax year. Profit for other days is taken as nil (right for a commencement or cessation; otherwise add the other period).`
    );
  }

  const partners: PartnerOutcome[] = input.partners.map((pd, j) => {
    const periodShares = periods.map((p) => p.allocated[j]);
    const taxYearParts = periods.map((p, k) => (fractions[k].length ? (p.allocated[j] * fractions[k].inYear) / fractions[k].length : 0));
    const taxYearShare = r2(taxYearParts.reduce((s, x) => s + x, 0));
    const pw: WorkingLine[] = [];
    periods.forEach((p, k) => {
      pw.push({ label: `Share of period ${k + 1} result (${longDate(p.start)} to ${longDate(p.end)})${p.reallocated ? " after reallocation" : ""}`, amount: p.allocated[j] });
      if (fractions[k].inYear !== fractions[k].length || periods.length > 1) {
        pw.push({ label: `  × ${n2(fractions[k].inYear)}/${n2(fractions[k].length)} ${unit(method)} in ${taxYear}`, amount: r2(taxYearParts[k]) });
      }
    });
    pw.push({ label: `Share of partnership ${taxYearShare < 0 ? "loss" : "profit"} arising in ${taxYear}`, amount: taxYearShare, kind: "subtotal" });

    // Transition profit spreading (only within 2023/24 to 2027/28).
    let schedule: TransitionYear[] | null = null;
    let slice = 0;
    if ((pd.transitionProfitTotal ?? 0) > 0) {
      schedule = transitionSchedule(pd.transitionProfitTotal!, pd.transitionAccelerated, pd.ceasedThisYear ? taxYear : undefined);
      slice = schedule.find((s) => s.year === taxYear)?.amount ?? 0;
      const row = schedule.find((s) => s.year === taxYear);
      if (row) {
        pw.push({
          label: pd.ceasedThisYear
            ? `Transition profit: untaxed balance on leaving (BIM81310)`
            : `Transition profit: ${gbp(row.standard)} standard (20% of the base)${row.accelerated ? ` + ${gbp(row.accelerated)} accelerated by election` : ""} (BIM81310)`,
          amount: slice,
          kind: "memo",
        });
      }
    }

    const loss = taxYearShare < 0 ? -taxYearShare : 0;
    const taxInput: SelfEmployedInput = {
      ...pd,
      taxYear,
      trading: { mode: "profit", turnover: Math.max(0, taxYearShare), expenses: 0, capitalAllowances: 0, allowance: "expenses", lossesBroughtForward: 0 },
      transitionProfit: slice,
    };
    const result = selfEmployedTax(taxInput);
    // The sole-trader notes on basis periods and partnerships are replaced by the partnership notes.
    result.notes = result.notes.filter((x) => !x.startsWith("Basis periods") && !x.startsWith("Not covered: partnerships"));
    if (loss) {
      result.notes.unshift(
        `${names[j]} has a trading loss of ${gbp(loss)} for ${taxYear}. It can be set against total income of this or the previous year (ITA 2007 s64, subject to the s24A cap), carried back in the first four years (s72), or carried forward (s83). Enter a claim under "Reliefs" to use it this year.`
      );
    }
    return {
      name: names[j],
      periodShares,
      taxYearParts: taxYearParts.map(r2),
      taxYearShare,
      transitionSlice: slice,
      transitionSchedule: schedule,
      loss: r2(loss),
      taxInput,
      result,
      working: [...pw, ...result.working],
    };
  });

  notes.push(
    "Apportionment to the tax year is by days unless you chose months; HMRC accepts another reasonable basis used consistently (BIM81201). Ratio changes within a period are time-apportioned on the same basis.",
    "Not covered: corporate partners and mixed-membership partnerships (including the excess profit allocation rules), LLP salaried member rules, overlap relief and basis periods before 2024/25 (enter the transition profit after overlap relief), the cap on sideways loss relief (ITA 2007 s24A) and the restrictions on limited and non-active partners, and partnership investment income. Scottish partnerships have legal personality, but that has no effect on how the partners are taxed."
  );

  const headline = r2(partners.reduce((s, p) => s + p.result.tax, 0));
  return {
    taxYear,
    tax: headline,
    working,
    rateIds: [...new Set(partners.flatMap((p) => p.result.rateIds))],
    notes,
    periods,
    taxYearFractions: fractions.map((f) => ({ inYear: f.inYear, length: f.length })),
    taxYearStart: tyStart,
    taxYearEnd: tyEnd,
    firmTaxYearProfit: r2(firm),
    partners,
  };
}
