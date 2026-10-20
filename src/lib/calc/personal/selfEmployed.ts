/**
 * Self-employed (sole trader) income tax and National Insurance:
 * trading profit (accounts, adjusted profit or trading allowance), income tax
 * through the full income tax engine with any other income, Class 4 NIC, the
 * Class 2 position, and the Self Assessment payment timetable.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { personalIncomeTax, validatePersonalTax, type PersonalTaxInput, type PersonalTaxResult, type TradingInput } from "./incomeTax";
import { saPayments, type SaPaymentsResult } from "./saPayments";

export interface Class4Result {
  profits: number;
  main: number;
  additional: number;
  total: number;
  exempt: boolean;
  lines: WorkingLine[];
}

/**
 * Class 4 NIC (SSCBA 1992 s15). No Class 4 for someone over State Pension age at
 * the start of the tax year (NIM24510).
 */
export function class4Nic(taxYear: string, profits: number, overStatePensionAge = false): Class4Result & { rateIds: string[] } {
  const R = rateReader(taxYear);
  const lines: WorkingLine[] = [];
  if (overStatePensionAge) {
    lines.push({ label: "Class 4 NIC: exempt (over State Pension age at the start of the tax year)", amount: 0 });
    return { profits, main: 0, additional: 0, total: 0, exempt: true, lines, rateIds: [...R.used] };
  }
  const lpl = R.gbp("nic.class4-lower-profits-limit");
  const upl = R.gbp("nic.class4-upper-profits-limit");
  const mainRate = R.percent("nic.class4-main-rate");
  const addRate = R.percent("nic.class4-additional-rate");
  const mainBand = Math.max(0, Math.min(profits, upl) - lpl);
  const addBand = Math.max(0, profits - upl);
  const main = r2((mainBand * mainRate) / 100);
  const additional = r2((addBand * addRate) / 100);
  if (profits <= lpl) {
    lines.push({ label: `Class 4 NIC: profits ${gbp(profits)} not over the lower profits limit ${gbp(lpl)}`, amount: 0, rateId: "nic.class4-lower-profits-limit" });
  } else {
    lines.push({ label: `Class 4: ${gbp(mainBand)} (${gbp(Math.min(profits, upl))} − ${gbp(lpl)}) × ${pctLabel(mainRate)}`, amount: main, rateId: "nic.class4-main-rate" });
    if (addBand > 0) lines.push({ label: `Class 4: ${gbp(addBand)} above ${gbp(upl)} × ${pctLabel(addRate)}`, amount: additional, rateId: "nic.class4-additional-rate" });
  }
  return { profits, main, additional, total: r2(main + additional), exempt: false, lines, rateIds: [...R.used] };
}

export interface SelfEmployedInput extends Omit<PersonalTaxInput, "trading"> {
  trading: TradingInput;
  overStatePensionAge?: boolean;
  /** Weeks of voluntary Class 2 the client chooses to pay (only relevant below the small profits threshold). */
  voluntaryClass2Weeks?: number;
  /** Payments on account already made for this year. */
  poasPaid?: number;
  /**
   * Charge Class 4 on the transition profit (default true). Practitioner reading of SSCBA 1992 s15 with
   * FA 2022 Sch 1; not confirmed on GOV.UK.
   */
  class4OnTransition?: boolean;
}

export interface SelfEmployedResult extends CalcResult {
  incomeTax: PersonalTaxResult;
  tradingProfit: number;
  class4: Class4Result;
  class2TreatedAsPaid: boolean;
  class2Voluntary: number;
  /** Income tax + Class 4 + any voluntary Class 2 (= `tax`). */
  totalTaxAndNic: number;
  payments: SaPaymentsResult;
  effectiveRate: number | null;
}

export function validateSelfEmployed(i: SelfEmployedInput): string[] {
  const e = validatePersonalTax(i);
  requireNonNegative(e, "Payments on account already made", i.poasPaid);
  const w = i.voluntaryClass2Weeks ?? 0;
  if (!Number.isInteger(w) || w < 0 || w > 53) e.push("Voluntary Class 2 weeks must be a whole number from 0 to 53.");
  return e;
}

export function selfEmployedTax(input: SelfEmployedInput): SelfEmployedResult {
  const errors = validateSelfEmployed(input);
  if (errors.length) throw new CalcInputError(errors);
  const it = personalIncomeTax(input);
  const R = rateReader(input.taxYear);
  const profit = it.tradingProfit;
  const transition = it.transitionProfit;
  const c4Profits = r2(profit + (input.class4OnTransition === false ? 0 : transition));
  const c4 = class4Nic(input.taxYear, c4Profits, input.overStatePensionAge);
  for (const id of c4.rateIds) if (!R.used.includes(id)) R.used.push(id);

  // Class 2: treated as paid at or above the small profits threshold (no Class 2 to pay); voluntary below it.
  const spt = R.gbp("nic.class2-small-profits-threshold");
  const weekly = R.gbp("nic.class2-weekly");
  const treatedAsPaid = c4Profits >= spt && !input.overStatePensionAge;
  const weeks = input.voluntaryClass2Weeks ?? 0;
  const voluntary = !treatedAsPaid && !input.overStatePensionAge ? r2(weeks * weekly) : 0;

  const working: WorkingLine[] = [...it.computationLines];
  working.push({ label: "National Insurance", amount: 0, kind: "note" });
  if (transition) {
    working.push({
      label:
        input.class4OnTransition === false
          ? `Class 4 profits exclude the transition profit of ${gbp(transition)} (as chosen)`
          : `Class 4 profits: trading profit ${gbp(profit)} + transition profit ${gbp(transition)} = ${gbp(c4Profits)}`,
      amount: 0,
      kind: "note",
    });
  }
  working.push(...c4.lines);
  working.push({ label: "Class 4 NIC", amount: c4.total, kind: "subtotal" });
  if (input.overStatePensionAge) {
    working.push({ label: "Class 2: not relevant over State Pension age", amount: 0, kind: "note" });
  } else if (treatedAsPaid) {
    working.push({ label: `Class 2: profits ${gbp(c4Profits)} at or above the small profits threshold ${gbp(spt)}, so treated as paid (nothing to pay)`, amount: 0, rateId: "nic.class2-small-profits-threshold" });
  } else if (voluntary) {
    working.push({ label: `Voluntary Class 2: ${weeks} weeks × ${gbp(weekly)}`, amount: voluntary, rateId: "nic.class2-weekly" });
  } else {
    working.push({
      label: `Class 2: profits below the small profits threshold ${gbp(spt)}; nothing is due, but voluntary Class 2 at ${gbp(weekly)} a week protects the NI record if there are no credits`,
      amount: 0,
      rateId: "nic.class2-weekly",
    });
  }
  const total = r2(it.liability + c4.total + voluntary);
  working.push({ label: "Total income tax and NIC", amount: total, kind: "total" });
  if (it.taxDeducted) {
    working.push(...it.deductionLines.filter((l) => l.kind !== "total"));
    working.push({ label: "Payable after tax deducted at source", amount: r2(total - it.taxDeducted), kind: "total" });
  }

  const payments = saPayments({
    taxYear: input.taxYear,
    incomeTax: it.liability,
    class4: c4.total,
    taxDeductedAtSource: it.taxDeducted,
    poasPaid: input.poasPaid ?? 0,
    balancingOnly: voluntary ? [{ label: "Voluntary Class 2", amount: voluntary }] : [],
  });
  for (const id of ["it.poa-threshold", "it.poa-at-source-percent", "it.poa-instalment-percent"]) if (!R.used.includes(id)) R.used.push(id);

  const notes = [
    ...it.notes.filter((n) => !n.startsWith("Not covered")),
    "Losses: a trading loss can be set against total income of this year and/or the previous year (ITA 2007 s64), against capital gains (s71), carried back in the early years (s72) or on cessation (s89), or carried forward against profits of the same trade (s83). Enter a loss claim under \"Reliefs\" and brought-forward losses under \"Losses brought forward\". The cap on sideways relief (ITA 2007 s24A) isn't checked.",
    "Class 4 profits are taken as the taxable trading profit after losses brought forward. Losses relieved against other income (s64) can also reduce Class 4 profits; that isn't modelled.",
    "Basis periods: profits are for the tax year (tax year basis from 2024/25). Apportion a non-31 March / 5 April year end yourself before entering the profit.",
    "Not covered: partnerships (use each partner's share as the profit, but the trading allowance doesn't apply), CIS repayment claims, other tax reducers, student loans and Capital Gains Tax.",
  ];
  return {
    taxYear: input.taxYear,
    tax: total,
    working,
    rateIds: [...new Set([...it.rateIds, ...R.used])],
    notes,
    incomeTax: it,
    tradingProfit: profit,
    class4: c4,
    class2TreatedAsPaid: treatedAsPaid,
    class2Voluntary: voluntary,
    totalTaxAndNic: total,
    payments,
    effectiveRate: it.totalIncome > 0 ? total / it.totalIncome : null,
  };
}
