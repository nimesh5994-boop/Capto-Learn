/**
 * s455 tax on loans to participators by a close company, and s458 relief on repayment.
 *
 * - Charge: loans or advances made in the AP and still outstanding 9 months after its end, at the
 *   rate for the date each loan was made (CTM61505: 25% to 5 April 2016, 32.5% to 5 April 2022,
 *   33.75% to 5 April 2026, 35.75% from 6 April 2026). Due with the CT for the AP: 9 months and 1 day
 *   after the end (CTM61610).
 * - Relief (CTM61610): a repayment, release or write-off within 9 months of the AP end removes the
 *   charge. A later one gives s458 relief, due 9 months and 1 day after the end of the AP in which it
 *   happens (CTA 2010 s458(5)).
 * - Repayments are matched to the earliest loans first (a simplifying assumption; it only matters
 *   when loans were made at different rates).
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2 } from "../common";
import { addDays, addMonths, addMonthsMonthEnd, isIsoDate, longDate } from "./dates";
import { type BusinessReader, businessReader } from "./rates";
import { normalDueDate } from "./corporationTaxPeriod";

export interface S455Loan {
  date: string;
  amount: number;
}

export interface S455Repayment {
  date: string;
  amount: number;
  /** repayment (cash, dividend or bonus credited) or release/write-off (also triggers income tax on the participator). */
  kind: "repayment" | "release";
}

export interface S455Input {
  taxYear: string;
  /** Start and end of the accounting period in which the loans were made. */
  apStart: string;
  apEnd: string;
  /** Loans/advances made in the AP still outstanding at its end (one row per loan or drawing date). */
  loans: S455Loan[];
  /** Repayments, releases or write-offs after the AP end, in date order. */
  repayments: S455Repayment[];
}

export interface S455Result extends CalcResult {
  /** s455 tax payable for the AP (after repayments within 9 months). */
  chargeDueDate: string;
  outstandingAtNineMonths: number;
  relief: { date: string; amount: number; reliefDue: string }[];
  /** Tax still not relieved after all the repayments entered. */
  unrelieved: number;
}

/** Rate id for the date a loan was made (CTM61505). */
export function s455RateId(R: BusinessReader, loanDate: string): string {
  const change = R.date("ct.s455-rate-change-date"); // 2026-04-06
  if (loanDate >= change) return "ct.s455-rate";
  if (loanDate >= "2022-04-06") return "ct.s455-rate-2022-to-2026";
  if (loanDate >= "2016-04-06") return "ct.s455-rate-2016-to-2022";
  return "ct.s455-rate-before-2016";
}

/** ct.s455-rate (35.75%) is read from the 2026/27 dataset, where it applies to loans from 6 April 2026. */
function s455Rate(R: BusinessReader, id: string): number {
  return id === "ct.s455-rate" ? R.percent(id, "2026/27") : R.percent(id);
}

export function validateS455(i: S455Input): string[] {
  const e: string[] = [];
  if (!isIsoDate(i.apStart) || !isIsoDate(i.apEnd)) return ["Enter the accounting period start and end dates."];
  if (i.apEnd < i.apStart) e.push("The accounting period must end after it starts.");
  else if (i.apEnd > addDays(addMonths(i.apStart, 12), -1)) e.push("An accounting period can't be longer than 12 months.");
  if (!i.loans.length) e.push("Enter at least one loan.");
  i.loans.forEach((l, k) => {
    if (!isIsoDate(l.date)) e.push(`Loan ${k + 1}: enter the date it was made.`);
    else if (l.date < i.apStart || l.date > i.apEnd) e.push(`Loan ${k + 1}: the date must be inside the accounting period.`);
    if (!Number.isFinite(l.amount) || l.amount <= 0) e.push(`Loan ${k + 1}: enter an amount over £0.`);
  });
  i.repayments.forEach((r, k) => {
    if (!isIsoDate(r.date)) e.push(`Repayment ${k + 1}: enter the date.`);
    else if (r.date <= i.apEnd) e.push(`Repayment ${k + 1}: only enter repayments after the AP end (loans repaid by the year end aren't outstanding at the end).`);
    if (!Number.isFinite(r.amount) || r.amount <= 0) e.push(`Repayment ${k + 1}: enter an amount over £0.`);
  });
  const lent = i.loans.reduce((s, l) => s + (Number.isFinite(l.amount) ? l.amount : 0), 0);
  const repaid = i.repayments.reduce((s, r) => s + (Number.isFinite(r.amount) ? r.amount : 0), 0);
  if (repaid > lent + 0.005) e.push(`Repayments (${gbp(repaid)}) exceed the loans (${gbp(lent)}): enter only repayments of these loans.`);
  return e;
}

export function s455Charge(input: S455Input): S455Result {
  const errors = validateS455(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = businessReader(input.taxYear);
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const nineMonths = addMonthsMonthEnd(input.apEnd, 9);
  const chargeDue = normalDueDate(input.apEnd);

  const loans = [...input.loans].sort((a, b) => (a.date < b.date ? -1 : 1)).map((l) => {
    const id = s455RateId(R, l.date);
    return { ...l, id, rate: s455Rate(R, id), left: l.amount };
  });
  const repayments = [...input.repayments].sort((a, b) => (a.date < b.date ? -1 : 1));

  working.push({ label: `Loans made in the AP ${longDate(input.apStart)} to ${longDate(input.apEnd)}, outstanding at its end`, amount: 0, kind: "note" });
  for (const l of loans) working.push({ label: `Loan ${longDate(l.date)}`, amount: l.amount, rateId: l.id, kind: "memo" });

  // Match repayments to loans, earliest first.
  type Slice = { amount: number; rate: number; id: string; loanDate: string };
  const take = (amount: number): Slice[] => {
    const out: Slice[] = [];
    let rem = amount;
    for (const l of loans) {
      if (rem <= 0) break;
      const t = Math.min(rem, l.left);
      if (t > 0) {
        out.push({ amount: t, rate: l.rate, id: l.id, loanDate: l.date });
        l.left -= t;
        rem -= t;
      }
    }
    return out;
  };

  const within = repayments.filter((r) => r.date <= nineMonths);
  const later = repayments.filter((r) => r.date > nineMonths);
  for (const r of within) {
    take(r.amount);
    working.push({ label: `Less ${r.kind === "release" ? "released/written off" : "repaid"} ${longDate(r.date)} (within 9 months of the AP end)`, amount: -r.amount });
  }
  const outstanding = r2(loans.reduce((s, l) => s + l.left, 0));
  working.push({ label: `Outstanding on ${longDate(nineMonths)} (9 months after the AP end)`, amount: outstanding, kind: "subtotal" });

  let charge = 0;
  for (const l of loans) {
    if (l.left <= 0) continue;
    const t = (l.left * l.rate) / 100;
    charge += t;
    working.push({ label: `${gbp(l.left)} lent ${longDate(l.date)} × ${pctLabel(l.rate)}`, amount: r2(t), rateId: l.id });
  }
  const chargeR = r2(charge);
  working.push({ label: `s455 tax payable by ${longDate(chargeDue)}`, amount: chargeR, kind: "total" });

  const relief: S455Result["relief"] = [];
  if (later.length) {
    // The AP containing each later repayment: assume 12-month APs follow on from this one.
    R.text("ct.s455-relief-deferral");
    for (const r of later) {
      let apEnd = input.apEnd;
      while (apEnd < r.date) apEnd = addMonthsMonthEnd(apEnd, 12);
      const due = normalDueDate(apEnd);
      const slices = take(r.amount);
      const amt = r2(slices.reduce((s, x) => s + (x.amount * x.rate) / 100, 0));
      relief.push({ date: r.date, amount: amt, reliefDue: due });
      const rates = [...new Set(slices.map((x) => pctLabel(x.rate)))].join(" / ");
      working.push({
        label: `s458 relief: ${gbp(r.amount)} ${r.kind === "release" ? "released" : "repaid"} ${longDate(r.date)} × ${rates}; due ${longDate(due)} (9 months and 1 day after the AP ending ${longDate(apEnd)})`,
        amount: -amt,
        rateId: "ct.s455-relief-deferral",
      });
    }
    notes.push("Relief for later repayments assumes the company's following accounting periods are 12 months long and run on from this one.");
  }
  const unrelieved = r2(chargeR - relief.reduce((s, x) => s + x.amount, 0));
  if (later.length) working.push({ label: "s455 tax not yet relieved", amount: unrelieved, kind: "subtotal" });

  notes.push("Repayments are matched to the earliest loans first.");
  notes.push(
    "Bed and breakfasting isn't checked: repayments of £5,000 or more re-borrowed within 30 days, or made under arrangements to redraw, are matched to the new loan instead (CTA 2010 s464C). Check this before relying on relief.",
  );
  notes.push("A release or write-off is taxed on the participator as a distribution (and may attract Class 1 NIC if they're an employee); that isn't calculated here. Loans of £15,000 or less to full-time working directors with no material interest are excluded and not checked.");
  notes.push("Late payment interest on unpaid s455 tax runs from the due date; it isn't calculated here.");

  const rateIds = [...R.used];
  // 35.75% (ct.s455-rate) is the 2026/27 figure: show the result against that year so its link is right.
  const taxYear = rateIds.includes("ct.s455-rate") ? "2026/27" : input.taxYear;

  return {
    taxYear,
    tax: chargeR,
    working,
    rateIds,
    notes,
    chargeDueDate: chargeDue,
    outstandingAtNineMonths: outstanding,
    relief,
    unrelieved,
  };
}
