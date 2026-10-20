/**
 * Target modes for the income tax computation: the extra relief-at-source
 * pension contribution (net) that restores the full personal allowance, or
 * that removes the High Income Child Benefit Charge.
 *
 * Solved exactly by bisection over the forward calculation (to the penny),
 * so every interaction the forward calculation models (taper, Gift Aid,
 * reliefs, Scottish relief-at-source rate, rounding of the HICBC) is honoured.
 */
import { gbp, r2, rateReader } from "../common";
import { personalIncomeTax, type PersonalTaxInput, type PersonalTaxResult } from "./incomeTax";

/** Smallest x in [0, hi] (to the penny) for which ok(x) holds; ok must be monotone (false … true). Null if ok(hi) is false. */
export function solveMinPennies(ok: (x: number) => boolean, hi: number): number | null {
  if (ok(0)) return 0;
  let lo = 0;
  let top = Math.ceil(hi * 100);
  if (!ok(top / 100)) return null;
  // Integer bisection on pennies: lo fails, top passes.
  while (top - lo > 1) {
    const mid = Math.floor((lo + top) / 2);
    if (ok(mid / 100)) top = mid;
    else lo = mid;
  }
  return top / 100;
}

export interface PensionTarget {
  /** Extra net contribution needed (on top of any already entered); null if no contribution can reach the target. */
  net: number | null;
  gross: number | null;
  /** Total income tax (incl. HICBC) before and after the contribution. */
  taxBefore: number;
  taxAfter: number | null;
  /** Tax saved through the return (excluding the basic rate relief the provider claims). */
  taxSaved: number | null;
  /** Already met without any contribution. */
  alreadyMet: boolean;
  warnings: string[];
}

function withExtra(input: PersonalTaxInput, extraNet: number): PersonalTaxResult {
  return personalIncomeTax({ ...input, rasPensionNet: r2((input.rasPensionNet ?? 0) + extraNet) });
}

function target(input: PersonalTaxInput, ok: (r: PersonalTaxResult) => boolean): PensionTarget {
  const before = personalIncomeTax(input);
  const alreadyMet = ok(before);
  // The contribution can never need to be more than net income (as a net payment).
  const net = alreadyMet ? 0 : solveMinPennies((x) => ok(withExtra(input, x)), Math.max(1, before.netIncome));
  const after = net === null ? null : withExtra(input, net);
  const warnings: string[] = [];
  let gross: number | null = null;
  if (net !== null && after) {
    gross = r2(after.grossPension - before.grossPension);
    const R = rateReader(input.taxYear);
    // Relief is limited to the higher of relevant UK earnings and the basic amount (FA 2004 s190).
    const basicAmount = R.gbp("pen.relief-minimum-contribution");
    const totalPersonal = after.grossPension + (input.netPayPension ?? 0);
    const cap = Math.max(before.relevantEarnings, basicAmount);
    if (totalPersonal > cap + 0.005) {
      warnings.push(
        `Total personal contributions of ${gbp(totalPersonal)} would exceed the relief limit of ${gbp(cap)} (higher of relevant UK earnings ${gbp(before.relevantEarnings)} and ${gbp(basicAmount)}). Property and investment income aren't relevant earnings.`
      );
    }
    const aa = R.gbp("pen.annual-allowance");
    if (totalPersonal > aa) {
      warnings.push(`Total contributions of ${gbp(totalPersonal)} exceed the ${gbp(aa)} annual allowance before employer contributions, carry forward or any taper: check for an annual allowance charge.`);
    }
  }
  return {
    net,
    gross,
    taxBefore: before.tax,
    taxAfter: after ? after.tax : null,
    taxSaved: after ? r2(before.tax - after.tax) : null,
    alreadyMet,
    warnings,
  };
}

/** Extra relief-at-source contribution (net) that restores the full personal allowance. */
export function pensionToRestoreAllowance(input: PersonalTaxInput): PensionTarget {
  const R = rateReader(input.taxYear);
  // The full allowance is due when adjusted net income is no more than the income limit (ITA 2007 s35).
  const limit = R.gbp("it.pa-taper-threshold");
  return target(input, (r) => r.adjustedNetIncome <= limit + 0.005);
}

export interface HicbcTarget extends PensionTarget {
  /** Extra net contribution to bring adjusted net income down to the threshold itself (the figure usually quoted). */
  netToThreshold: number | null;
  grossToThreshold: number | null;
}

/**
 * Extra relief-at-source contribution (net) that removes the HICBC. Because the
 * percentage is rounded down (ITEPA 2003 s681C(3)), the charge is already nil a
 * little above the threshold; both figures are returned.
 */
export function pensionToRemoveHicbc(input: PersonalTaxInput): HicbcTarget {
  const R = rateReader(input.taxYear);
  const threshold = R.gbp("it.hicbc-threshold");
  const base = target(input, (r) => r.hicbc === 0);
  const toThreshold = target(input, (r) => r.adjustedNetIncome <= threshold + 0.005);
  return { ...base, netToThreshold: toThreshold.net, grossToThreshold: toThreshold.gross };
}
