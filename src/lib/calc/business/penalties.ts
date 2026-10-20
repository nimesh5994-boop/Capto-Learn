/**
 * Late filing and late payment penalties, and HMRC late payment interest.
 *
 * Statutory mechanics (the amounts and percentages are read from the dataset):
 * - Interest: simple, on the balance outstanding each day from the due date to the payment date; a
 *   payment on day d still bears that day's interest (CH140220: due 31 Jan, paid 1 Feb = 1 day). Rate
 *   changes apply from their effective date. Daily rate = annual rate ÷ 365.
 * - SA late filing (FA 2009 Sch 55): £100; £10 a day for up to 90 days from 3 months; at 6 and 12
 *   months the greater of 5% of the tax due and £300.
 * - SA late payment (FA 2009 Sch 56): 5% of the tax unpaid at 30 days, 6 months and 12 months.
 * - Points-based late payment (VAT, MTD for Income Tax: FA 2021 Sch 26): first penalty = % of tax
 *   unpaid at day 15 + % of tax unpaid at day 30; second penalty accrues daily from day 31 at an annual
 *   rate on the outstanding balance (CH193140). GOV.UK's worked example (£15,000, paid day 51,
 *   second penalty £86.30) uses ÷ 365.
 * - CT late filing (FA 1998 Sch 18 paras 17, 18): flat penalties by filing date; tax-geared 10% (20%
 *   after 2 years) of tax unpaid where the return is delivered more than 18 months after the end of
 *   the period (or after the filing date, if later) (CT211 notes).
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2 } from "../common";
import { addDays, addMonthsMonthEnd, daysBetween, isIsoDate, longDate, maxDate } from "./dates";
import { type BusinessReader, businessReader, latePaymentInterestTable } from "./rates";

export interface PaymentMade {
  date: string;
  amount: number;
}

export interface PenaltyResult extends CalcResult {
  penalties: number;
  interest: number;
}

function checkPayments(e: string[], amount: number, due: string, payments: PaymentMade[], asAt: string) {
  if (!Number.isFinite(amount) || amount <= 0) e.push("Enter the amount of tax due (over £0).");
  if (!isIsoDate(due)) e.push("Enter the due date.");
  if (!isIsoDate(asAt)) e.push("Enter the date to work out to.");
  payments.forEach((p, k) => {
    if (!isIsoDate(p.date)) e.push(`Payment ${k + 1}: enter the date.`);
    if (!Number.isFinite(p.amount) || p.amount <= 0) e.push(`Payment ${k + 1}: enter an amount over £0.`);
  });
  if (e.length) return;
  const paid = payments.reduce((s, p) => s + p.amount, 0);
  if (paid > amount + 0.005) e.push("Payments add up to more than the tax due.");
  if (payments.some((p) => p.date > asAt)) e.push("A payment is after the 'work out to' date: move that date later.");
  if (asAt < due) e.push("The 'work out to' date is before the due date.");
}

/** Amount still unpaid at the end of `date`. */
function unpaidAt(amount: number, payments: PaymentMade[], date: string): number {
  return Math.max(0, amount - payments.filter((p) => p.date <= date).reduce((s, p) => s + p.amount, 0));
}

/* ------------------------------------------------------------------ */
/* Late payment interest                                                */
/* ------------------------------------------------------------------ */

export interface InterestSegment {
  from: string; // first day charged
  to: string; // last day charged
  days: number;
  balance: number;
  rate: number;
  rateId: string;
  interest: number;
}

/**
 * Interest on `amount` due on `due`, reduced by `payments`, up to `asAt` (the payment date if all is
 * paid by then). Returns the day segments for the working.
 */
export function latePaymentInterest(taxYear: string, amount: number, due: string, payments: PaymentMade[], asAt: string): { total: number; segments: InterestSegment[]; ids: string[] } {
  const table = latePaymentInterestTable(taxYear);
  if (!table.length) throw new CalcInputError(["No HMRC interest rates in the dataset."]);
  if (due < table[0].from) throw new CalcInputError([`Interest rates before ${longDate(table[0].from)} aren't in the dataset.`]);
  const sorted = [...payments].sort((a, b) => (a.date < b.date ? -1 : 1));
  const fullyPaid = sorted.length && unpaidAt(amount, sorted, sorted[sorted.length - 1].date) <= 0.005;
  const end = fullyPaid ? sorted[sorted.length - 1].date : asAt;
  // Boundaries: each segment covers days (a, b]. Split at payment dates and the day before rate changes.
  const cuts = new Set<string>([due, end]);
  for (const p of sorted) if (p.date > due && p.date < end) cuts.add(p.date);
  for (const t of table) {
    const prev = addDays(t.from, -1);
    if (prev > due && prev < end) cuts.add(prev);
  }
  const points = [...cuts].sort();
  const segments: InterestSegment[] = [];
  const ids: string[] = [];
  let total = 0;
  for (let k = 0; k < points.length - 1; k++) {
    const a = points[k];
    const b = points[k + 1];
    const firstDay = addDays(a, 1);
    const balance = Math.max(0, amount - sorted.filter((p) => p.date <= a).reduce((s, p) => s + p.amount, 0));
    if (balance <= 0.005) continue;
    const t = [...table].reverse().find((x) => x.from <= firstDay)!;
    const days = daysBetween(a, b);
    const interest = (balance * t.rate * days) / 100 / 365;
    total += interest;
    if (!ids.includes(t.id)) ids.push(t.id);
    segments.push({ from: firstDay, to: b, days, balance: r2(balance), rate: t.rate, rateId: t.id, interest: r2(interest) });
  }
  return { total: r2(total), segments, ids };
}

function interestLines(working: WorkingLine[], segs: InterestSegment[]) {
  for (const s of segs) {
    working.push({ label: `Interest ${longDate(s.from)} to ${longDate(s.to)}: ${gbp(s.balance)} × ${pctLabel(s.rate)} × ${s.days}/365`, amount: s.interest, rateId: s.rateId });
  }
}

export interface InterestInput {
  taxYear: string;
  amount: number;
  dueDate: string;
  payments: PaymentMade[];
  asAt: string;
}

export function validateInterest(i: InterestInput): string[] {
  const e: string[] = [];
  checkPayments(e, i.amount, i.dueDate, i.payments, i.asAt);
  return e;
}

export function interestCalc(input: InterestInput): PenaltyResult {
  const errors = validateInterest(input);
  if (errors.length) throw new CalcInputError(errors);
  const working: WorkingLine[] = [{ label: `Tax due ${longDate(input.dueDate)}`, amount: input.amount, kind: "memo" }];
  for (const p of [...input.payments].sort((a, b) => (a.date < b.date ? -1 : 1))) working.push({ label: `Paid ${longDate(p.date)}`, amount: -p.amount, kind: "memo" });
  const li = latePaymentInterest(input.taxYear, input.amount, input.dueDate, input.payments, input.asAt);
  interestLines(working, li.segments);
  working.push({ label: "Late payment interest", amount: li.total, kind: "total" });
  return {
    taxYear: input.taxYear,
    tax: li.total,
    working,
    rateIds: li.ids,
    notes: [
      "Uses HMRC's main late payment rate table (Income Tax, NIC, CGT, VAT for periods from 2023, and the same rates for Corporation Tax pay and file). Quarterly instalment interest uses different rates and isn't covered.",
      "Simple interest, days counted from the due date to the payment date, ÷ 365 (including leap years). HMRC's statement may differ by pennies.",
      "Interest on penalties, and repayment interest, aren't calculated. The latest rate in the dataset is assumed to continue to the 'work out to' date: check HMRC's page for later changes.",
    ],
    penalties: 0,
    interest: li.total,
  };
}

/* ------------------------------------------------------------------ */
/* Self Assessment late filing (traditional regime)                     */
/* ------------------------------------------------------------------ */

export interface SaFilingInput {
  taxYear: string;
  /** Filing deadline (31 January for online returns). */
  deadline: string;
  /** Date filed, or the date to work out to if not yet filed. */
  filed: string;
  /** Tax due on the return (for the 6 and 12 month penalties). */
  taxDue: number;
}

export function saLateFiling(input: SaFilingInput): PenaltyResult {
  const e: string[] = [];
  if (!isIsoDate(input.deadline) || !isIsoDate(input.filed)) e.push("Enter the filing deadline and the date filed.");
  if (!Number.isFinite(input.taxDue) || input.taxDue < 0) e.push("Tax due can't be negative.");
  if (e.length) throw new CalcInputError(e);
  const R = businessReader(input.taxYear);
  const working: WorkingLine[] = [];
  let total = 0;
  const late = daysBetween(input.deadline, input.filed);
  if (late <= 0) {
    working.push({ label: "Filed on time: no late filing penalty", amount: 0, kind: "total" });
    return { taxYear: input.taxYear, tax: 0, working, rateIds: [...R.used], notes: [], penalties: 0, interest: 0 };
  }
  working.push({ label: `Filed ${late} days after the deadline of ${longDate(input.deadline)}`, amount: 0, kind: "note" });
  const initial = R.gbp("pay.sa-late-filing-initial");
  total += initial;
  working.push({ label: "Initial penalty", amount: initial, rateId: "pay.sa-late-filing-initial" });
  const three = addMonthsMonthEnd(input.deadline, 3);
  if (input.filed > three) {
    const perDay = R.gbp("pay.sa-late-filing-daily");
    const max = R.gbp("pay.sa-late-filing-daily-max");
    const days = Math.min(daysBetween(three, input.filed), Math.round(max / perDay));
    const d = Math.min(days * perDay, max);
    total += d;
    working.push({ label: `Daily penalties from ${longDate(addDays(three, 1))}: ${days} days × ${gbp(perDay)} (max ${gbp(max)})`, amount: d, rateId: "pay.sa-late-filing-daily" });
  }
  const pct = R.percent("pay.sa-late-filing-tax-geared");
  const min = R.gbp("pay.sa-late-filing-minimum");
  for (const m of [6, 12]) {
    const point = addMonthsMonthEnd(input.deadline, m);
    if (input.filed > point) {
      const p = Math.max((input.taxDue * pct) / 100, min);
      total += p;
      working.push({ label: `${m} months late (${longDate(point)}): greater of ${pctLabel(pct)} × ${gbp(input.taxDue)} and ${gbp(min)}`, amount: r2(p), rateId: "pay.sa-late-filing-tax-geared" });
    }
  }
  const t = r2(total);
  working.push({ label: "Late filing penalties", amount: t, kind: "total" });
  return {
    taxYear: input.taxYear,
    tax: t,
    working,
    rateIds: [...R.used],
    notes: [
      "Traditional Self Assessment regime. Taxpayers in MTD for Income Tax (from April 2026), and everyone filing a personal return from April 2027, move to the points-based regime instead.",
      "At 12 months HMRC can charge up to 70% or 100% of the tax where information was deliberately withheld; only the standard 5%/£300 is shown. Daily penalties assume HMRC issued the notice.",
      "A reasonable excuse can cancel penalties. Partnership returns charge each partner separately; not covered.",
    ],
    penalties: t,
    interest: 0,
  };
}

/* ------------------------------------------------------------------ */
/* Self Assessment late payment (traditional regime)                    */
/* ------------------------------------------------------------------ */

export interface SaPaymentInput {
  taxYear: string;
  amount: number;
  dueDate: string;
  payments: PaymentMade[];
  asAt: string;
  includeInterest: boolean;
}

export function saLatePayment(input: SaPaymentInput): PenaltyResult {
  const e: string[] = [];
  checkPayments(e, input.amount, input.dueDate, input.payments, input.asAt);
  if (e.length) throw new CalcInputError(e);
  const R = businessReader(input.taxYear);
  const working: WorkingLine[] = [{ label: `Tax due ${longDate(input.dueDate)}`, amount: input.amount, kind: "memo" }];
  const pct = R.percent("pay.sa-late-payment-rate");
  let pen = 0;
  const points: [string, string][] = [
    ["30 days", addDays(input.dueDate, 30)],
    ["6 months", addMonthsMonthEnd(input.dueDate, 6)],
    ["12 months", addMonthsMonthEnd(input.dueDate, 12)],
  ];
  for (const [label, d] of points) {
    if (input.asAt <= d) continue;
    const unpaid = unpaidAt(input.amount, input.payments, d);
    if (unpaid <= 0.005) continue;
    const p = (unpaid * pct) / 100;
    pen += p;
    working.push({ label: `${label} late (unpaid at ${longDate(d)}): ${gbp(unpaid)} × ${pctLabel(pct)}`, amount: r2(p), rateId: "pay.sa-late-payment-rate" });
  }
  const penR = r2(pen);
  working.push({ label: "Late payment penalties", amount: penR, kind: "subtotal" });
  let interest = 0;
  const ids: string[] = [];
  if (input.includeInterest) {
    const li = latePaymentInterest(input.taxYear, input.amount, input.dueDate, input.payments, input.asAt);
    interestLines(working, li.segments);
    interest = li.total;
    ids.push(...li.ids);
    working.push({ label: "Late payment interest", amount: interest, kind: "subtotal" });
  }
  working.push({ label: "Penalties and interest", amount: r2(penR + interest), kind: "total" });
  return {
    taxYear: input.taxYear,
    tax: r2(penR + interest),
    working,
    rateIds: [...R.used, ...ids],
    notes: [
      "Traditional regime for balancing payments and other tax due on the return. Payments on account don't attract late payment penalties (interest only). MTD for Income Tax taxpayers use the points-based late payment calculation instead.",
      "A Time to Pay arrangement agreed before a penalty date stops later penalties; not modelled.",
    ],
    penalties: penR,
    interest,
  };
}

/* ------------------------------------------------------------------ */
/* Points-based late payment (VAT, MTD for Income Tax)                  */
/* ------------------------------------------------------------------ */

export type LppRegime = "vat" | "mtd-2026" | "mtd-2027";

export interface LppInput {
  taxYear: string;
  regime: LppRegime;
  /** VAT: first day of the VAT period (decides the 2%/4% or 3%/10% rates). */
  vatPeriodStart?: string;
  /** MTD: first year of the new penalties (no penalty if paid within 30 days). */
  firstYear?: boolean;
  amount: number;
  dueDate: string;
  payments: PaymentMade[];
  asAt: string;
  includeInterest: boolean;
}

function lppRates(R: BusinessReader, i: LppInput): { d15: string; d30: string; annual: string } {
  if (i.regime === "vat") {
    const change = R.date("pay.vat-lpp-change-period-start");
    const newRates = (i.vatPeriodStart ?? "") >= change && i.dueDate >= "2025-05-31";
    return newRates
      ? { d15: "pay.vat-lpp-day15", d30: "pay.vat-lpp-day30", annual: "pay.vat-lpp-annual" }
      : { d15: "pay.vat-lpp-day15-old", d30: "pay.vat-lpp-day30-old", annual: "pay.vat-lpp-annual-old" };
  }
  const y = i.regime === "mtd-2026" ? "2026" : "2027";
  return { d15: `pay.mtd-lpp-day15-${y}`, d30: `pay.mtd-lpp-day30-${y}`, annual: "pay.mtd-lpp-annual" };
}

export function validateLpp(i: LppInput): string[] {
  const e: string[] = [];
  checkPayments(e, i.amount, i.dueDate, i.payments, i.asAt);
  if (i.regime === "vat" && (!i.vatPeriodStart || !isIsoDate(i.vatPeriodStart))) e.push("Enter the first day of the VAT period.");
  if (i.regime === "vat" && i.vatPeriodStart && i.vatPeriodStart < "2023-01-01") e.push("The points-based regime applies to VAT periods starting on or after 1 January 2023.");
  return e;
}

export function pointsLatePayment(input: LppInput): PenaltyResult {
  const errors = validateLpp(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const ids = lppRates(R, input);
  const p15 = R.percent(ids.d15);
  const p30 = R.percent(ids.d30);
  const annual = R.percent(ids.annual);
  const working: WorkingLine[] = [{ label: `Tax due ${longDate(input.dueDate)}`, amount: input.amount, kind: "memo" }];
  const pays = [...input.payments].sort((a, b) => (a.date < b.date ? -1 : 1));
  for (const p of pays) working.push({ label: `Paid ${longDate(p.date)} (day ${daysBetween(input.dueDate, p.date)})`, amount: -p.amount, kind: "memo" });
  const day15 = addDays(input.dueDate, 15);
  const day30 = addDays(input.dueDate, 30);
  const u15 = input.asAt > day15 ? unpaidAt(input.amount, pays, day15) : 0;
  const u30 = input.asAt > day30 ? unpaidAt(input.amount, pays, day30) : 0;
  let first = 0;
  const firstYearEasement = input.regime !== "vat" && input.firstYear && u30 <= 0.005;
  if (firstYearEasement) {
    working.push({ label: "First year of the new penalties and paid within 30 days: no penalty", amount: 0, kind: "note" });
  } else {
    if (u15 > 0.005) {
      const p = (u15 * p15) / 100;
      first += p;
      working.push({ label: `First penalty: unpaid after day 15 (${longDate(day15)}) ${gbp(u15)} × ${pctLabel(p15)}`, amount: r2(p), rateId: ids.d15 });
    }
    if (u30 > 0.005) {
      const p = (u30 * p30) / 100;
      first += p;
      working.push({ label: `First penalty: unpaid after day 30 (${longDate(day30)}) ${gbp(u30)} × ${pctLabel(p30)}`, amount: r2(p), rateId: ids.d30 });
    }
  }
  // Second penalty: daily from day 31 on the balance at the start of each day.
  let second = 0;
  const fullyPaidOn = pays.length && unpaidAt(input.amount, pays, pays[pays.length - 1].date) <= 0.005 ? pays[pays.length - 1].date : null;
  const lastDay = fullyPaidOn ?? input.asAt;
  const capDays = input.regime === "vat" ? Infinity : 730; // MTD: "or for up to 2 years"
  if (u30 > 0.005 && !firstYearEasement) {
    // Segments of equal balance: balance at the start of day d = amount − payments before day d.
    let d = 31;
    const endDay = Math.min(daysBetween(input.dueDate, lastDay), 30 + capDays);
    while (d <= endDay) {
      const dayDate = addDays(input.dueDate, d);
      const bal = Math.max(0, input.amount - pays.filter((p) => p.date < dayDate).reduce((s, p) => s + p.amount, 0));
      const nextPay = pays.find((p) => p.date >= dayDate);
      const segEnd = Math.min(endDay, nextPay ? daysBetween(input.dueDate, nextPay.date) : endDay);
      const days = segEnd - d + 1;
      if (bal > 0.005 && days > 0) {
        const p = (bal * annual * days) / 100 / 365;
        second += p;
        working.push({ label: `Second penalty: ${gbp(bal)} × ${pctLabel(annual)} × ${days}/365 (days ${d} to ${segEnd})`, amount: r2(p), rateId: ids.annual });
      }
      d = segEnd + 1;
    }
  }
  const pen = r2(r2(first) + r2(second));
  working.push({ label: "Late payment penalties", amount: pen, kind: "subtotal" });
  let interest = 0;
  const intIds: string[] = [];
  if (input.includeInterest) {
    const li = latePaymentInterest(input.taxYear, input.amount, input.dueDate, input.payments, input.asAt);
    interestLines(working, li.segments);
    interest = li.total;
    intIds.push(...li.ids);
    working.push({ label: "Late payment interest", amount: interest, kind: "subtotal" });
  }
  working.push({ label: "Penalties and interest", amount: r2(pen + interest), kind: "total" });
  const notes = [
    "No penalty if paid within 15 days. A Time to Pay arrangement proposed before a penalty date stops the clock from that date; not modelled.",
    input.regime === "vat"
      ? "VAT: 3%/3%/10% for periods beginning on or after 1 April 2025 (tax due on or after 31 May 2025); 2%/2%/4% before. The second penalty runs until paid (HMRC assesses it before the 2-year time limit)."
      : "MTD for Income Tax: penalties don't apply to payments on account. The second penalty is charged for up to 2 years.",
    "Day 15 and day 30 are counted from the due date (paid on day 15 = no penalty).",
  ];
  if (!fullyPaidOn) notes.push("Not fully paid: the second penalty and interest are worked out to the 'work out to' date and keep running.");
  return { taxYear: input.taxYear, tax: r2(pen + interest), working, rateIds: [...R.used, ...intIds], notes, penalties: pen, interest };
}

/* ------------------------------------------------------------------ */
/* Late submission points (VAT and MTD for Income Tax)                  */
/* ------------------------------------------------------------------ */

export interface PointsInput {
  taxYear: string;
  regime: "vat-annual" | "vat-quarterly" | "vat-monthly" | "mtd";
  /** Late submissions in the period being looked at (points not yet expired). */
  lateSubmissions: number;
}

export function lateSubmissionPoints(input: PointsInput): PenaltyResult {
  if (!Number.isInteger(input.lateSubmissions) || input.lateSubmissions < 0 || input.lateSubmissions > 100) {
    throw new CalcInputError(["Late submissions must be a whole number from 0 to 100."]);
  }
  const R = businessReader(input.taxYear);
  const thrId = input.regime === "mtd" ? "pay.mtd-points-threshold" : `pay.vat-points-threshold-${input.regime.slice(4)}`;
  const penId = input.regime === "mtd" ? "pay.mtd-late-submission-penalty" : "pay.vat-late-submission-penalty";
  const threshold = R.count(thrId);
  const each = R.gbp(penId);
  const points = Math.min(input.lateSubmissions, threshold);
  const penalties = Math.max(0, input.lateSubmissions - threshold + 1);
  const total = penalties * each;
  const working: WorkingLine[] = [
    { label: `${input.lateSubmissions} late submission${input.lateSubmissions === 1 ? "" : "s"}: ${points} point${points === 1 ? "" : "s"} (threshold ${threshold})`, amount: 0, kind: "note", rateId: thrId },
  ];
  if (penalties) working.push({ label: `${penalties} penalt${penalties === 1 ? "y" : "ies"} × ${gbp(each)} (at the threshold, then each further late submission)`, amount: total, rateId: penId });
  working.push({ label: "Late submission penalties", amount: total, kind: "total" });
  return {
    taxYear: input.taxYear,
    tax: total,
    working,
    rateIds: [...R.used],
    notes: [
      "Points expire after 24 months while below the threshold. At the threshold they reset only after a period of compliance (VAT: 24 months annual, 12 months quarterly, 6 months monthly; MTD: 12 months) with all returns from the previous 24 months submitted. Expiry isn't tracked here: enter only live points.",
      input.regime === "mtd" ? "MTD for Income Tax: missed quarterly updates for 2026/27 don't earn points; the 2026/27 tax return deadline does." : "VAT: a nil or repayment return still counts if late.",
    ],
    penalties: total,
    interest: 0,
  };
}

/* ------------------------------------------------------------------ */
/* Corporation tax late filing                                          */
/* ------------------------------------------------------------------ */

export interface CtFilingInput {
  taxYear: string;
  apEnd: string;
  /** Statutory filing date (normally 12 months after the end of the period of account). */
  filingDate: string;
  /** Date delivered, or the date to work out to. */
  filed: string;
  /** Third successive late return (late for the two previous periods and liable to penalties). */
  thirdSuccessive: boolean;
  /** Tax unpaid 18 months after the AP end (or at the filing date if later). */
  unpaidTax: number;
}

export function ctLateFiling(input: CtFilingInput): PenaltyResult {
  const e: string[] = [];
  if (!isIsoDate(input.apEnd) || !isIsoDate(input.filingDate) || !isIsoDate(input.filed)) e.push("Enter the AP end, filing date and date filed.");
  if (!Number.isFinite(input.unpaidTax) || input.unpaidTax < 0) e.push("Unpaid tax can't be negative.");
  if (!e.length && input.filingDate < input.apEnd) e.push("The filing date must be after the AP end.");
  if (e.length) throw new CalcInputError(e);
  const R = businessReader(input.taxYear);
  const working: WorkingLine[] = [];
  if (input.filed <= input.filingDate) {
    working.push({ label: "Filed on time: no late filing penalty", amount: 0, kind: "total" });
    return { taxYear: input.taxYear, tax: 0, working, rateIds: [], notes: [], penalties: 0, interest: 0 };
  }
  const change = R.date("pay.ct-late-filing-change-date");
  const newRegime = input.filingDate >= change;
  const sfx = (input.thirdSuccessive ? "-repeat" : "") + (newRegime ? "" : "-old");
  const id1 = `pay.ct-late-filing-flat-1${sfx}`;
  const id2 = `pay.ct-late-filing-flat-2${sfx}`;
  working.push({
    label: `Filing date ${longDate(input.filingDate)} is ${newRegime ? "on or after" : "before"} ${longDate(change)}: ${newRegime ? "increased" : "earlier"} flat penalties${input.thirdSuccessive ? " (third successive late return)" : ""}`,
    amount: 0,
    kind: "note",
  });
  let total = R.gbp(id1);
  working.push({ label: "Return late", amount: total, rateId: id1 });
  const three = addMonthsMonthEnd(input.filingDate, 3);
  if (input.filed > three) {
    const p = R.gbp(id2);
    total += p;
    working.push({ label: `More than 3 months late (after ${longDate(three)})`, amount: p, rateId: id2 });
  }
  const trigger = maxDate(addMonthsMonthEnd(input.apEnd, 18), input.filingDate);
  if (input.filed > trigger) {
    const twoYears = addMonthsMonthEnd(input.apEnd, 24);
    const id = input.filed > twoYears ? "pay.ct-late-filing-tax-geared-24m" : "pay.ct-late-filing-tax-geared-18m";
    const pct = R.percent(id);
    const p = (input.unpaidTax * pct) / 100;
    total += p;
    working.push({
      label: `Tax-geared: delivered after ${longDate(trigger)}${input.filed > twoYears ? ` and after ${longDate(twoYears)} (2 years)` : ""}: ${gbp(input.unpaidTax)} unpaid × ${pctLabel(pct)}`,
      amount: r2(p),
      rateId: id,
    });
  }
  const t = r2(total);
  working.push({ label: "Late filing penalties", amount: t, kind: "total" });
  return {
    taxYear: input.taxYear,
    tax: t,
    working,
    rateIds: [...R.used],
    notes: [
      "Third successive failure: returns for three consecutive accounting periods delivered late, and the company was liable to a penalty for the first two. Check the history before ticking.",
      "The filing date is normally 12 months after the end of the period of account (3 months after HMRC's notice if later); enter the actual statutory date.",
      "Late payment interest on the tax runs separately (use the interest calculator). HMRC may issue a determination if the return is over 6 months late.",
    ],
    penalties: t,
    interest: 0,
  };
}
