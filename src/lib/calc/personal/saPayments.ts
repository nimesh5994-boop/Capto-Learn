/**
 * Self Assessment balancing payment and payments on account (TMA 1970 s59A, s59B).
 *
 * Thresholds and the instalment share are read from the dataset
 * (`it.poa-threshold`, `it.poa-at-source-percent`, `it.poa-instalment-percent`,
 * verified against GOV.UK "Understanding your Self Assessment tax bill").
 */
import { type WorkingLine, gbp, pctLabel, r2, rateReader } from "../common";
import { ratesFor } from "@/content/rates";

export interface SaPaymentsInput {
  taxYear: string;
  /** Income tax liability for the year (including the HICBC). */
  incomeTax: number;
  /** Class 4 NIC for the year (included in payments on account). */
  class4?: number;
  /** Tax deducted at source: PAYE, tax taken off interest, CIS deductions. */
  taxDeductedAtSource: number;
  /** Payments on account already made for this year (due 31 January in the year and 31 July after it). */
  poasPaid?: number;
  /** Amounts paid with the balancing payment but excluded from payments on account (e.g. voluntary Class 2). */
  balancingOnly?: { label: string; amount: number }[];
}

export interface SaPaymentDate {
  date: string;
  label: string;
  amount: number;
}

export interface SaPaymentsResult {
  /** Income tax + Class 4 less tax deducted at source: the basis for next year's payments on account. */
  relevantAmount: number;
  totalLiability: number;
  atSourcePercent: number | null;
  poaRequired: boolean;
  reason: string;
  poaEach: number;
  /** Balancing payment for the year (negative = overpaid, repayable or set against the next payment). */
  balancing: number;
  schedule: SaPaymentDate[];
  working: WorkingLine[];
  nextYear: string;
}

/** "2026/27" → "2027/28". */
export function nextTaxYear(taxYear: string): string {
  const y = Number(taxYear.slice(0, 4)) + 1;
  return `${y}/${String((y + 1) % 100).padStart(2, "0")}`;
}

export function saPayments(i: SaPaymentsInput): SaPaymentsResult {
  const R = rateReader(i.taxYear);
  const threshold = R.gbp("it.poa-threshold");
  const atSourceMax = R.percent("it.poa-at-source-percent");
  const share = R.percent("it.poa-instalment-percent");
  const year = ratesFor(i.taxYear)!;
  // Due dates (TMA 1970 s59A(2), s59B(4)): balancing payment and first payment on account on 31 January
  // after the tax year ends; second payment on account on 31 July after that.
  const endYear = Number(year.endDate.slice(0, 4));
  const jan = `31 January ${endYear + 1}`;
  const jul = `31 July ${endYear + 1}`;
  const next = nextTaxYear(i.taxYear);

  const class4 = i.class4 ?? 0;
  const total = r2(i.incomeTax + class4);
  const relevant = r2(total - i.taxDeductedAtSource);
  const atSourcePercent = total > 0 ? (i.taxDeductedAtSource / total) * 100 : null;
  let poaRequired = true;
  let reason: string;
  if (relevant < threshold) {
    poaRequired = false;
    reason = `No payments on account for ${next}: the ${i.taxYear} Self Assessment bill (${gbp(Math.max(0, relevant))}) is less than ${gbp(threshold)}.`;
  } else if (atSourcePercent !== null && atSourcePercent > atSourceMax) {
    poaRequired = false;
    reason = `No payments on account for ${next}: ${Number(atSourcePercent.toFixed(1))}% of the ${i.taxYear} tax was deducted at source, more than ${pctLabel(atSourceMax)}.`;
  } else {
    reason = `Payments on account due for ${next}: the bill is at least ${gbp(threshold)} and no more than ${pctLabel(atSourceMax)} was deducted at source.`;
  }
  const poaEach = poaRequired ? r2((relevant * share) / 100) : 0;
  const extras = (i.balancingOnly ?? []).filter((x) => x.amount);
  const extrasTotal = extras.reduce((s, x) => s + x.amount, 0);
  const poasPaid = i.poasPaid ?? 0;
  const balancing = r2(relevant + extrasTotal - poasPaid);

  const working: WorkingLine[] = [];
  working.push({ label: "Income tax liability", amount: i.incomeTax });
  if (class4) working.push({ label: "Class 4 NIC", amount: class4 });
  if (i.taxDeductedAtSource) working.push({ label: "Less tax deducted at source", amount: -i.taxDeductedAtSource });
  working.push({ label: "Self Assessment bill (basis for payments on account)", amount: relevant, kind: "subtotal" });
  for (const x of extras) working.push({ label: `${x.label} (not part of payments on account)`, amount: x.amount });
  if (poasPaid) working.push({ label: `Less payments on account already made for ${i.taxYear}`, amount: -poasPaid });
  working.push({ label: balancing >= 0 ? `Balancing payment due ${jan}` : `Overpaid for ${i.taxYear} (repayable or set against ${jan})`, amount: balancing, kind: "total" });
  working.push({ label: reason, amount: 0, kind: "note" });
  if (poaRequired) working.push({ label: `Each payment on account for ${next}: ${pctLabel(share)} × ${gbp(relevant)}`, amount: poaEach, rateId: "it.poa-instalment-percent" });

  const schedule: SaPaymentDate[] = [
    { date: jan, label: `${i.taxYear} balancing payment${poaRequired ? ` + first ${next} payment on account` : ""}`, amount: r2(balancing + poaEach) },
  ];
  if (poaRequired) schedule.push({ date: jul, label: `Second ${next} payment on account`, amount: poaEach });

  return { relevantAmount: relevant, totalLiability: total, atSourcePercent, poaRequired, reason, poaEach, balancing, schedule, working, nextYear: next };
}
