/**
 * Class 1 National Insurance for one earnings period by the exact percentage
 * method. Thresholds and rates by category letter are from GOV.UK "Rates and
 * thresholds for employers" (held in the dataset); the weekly and monthly
 * thresholds are HMRC's published figures, not annual ÷ 52 or ÷ 12.
 */
import { type WorkingLine, gbp, pctLabel } from "../common";
import { type Frequency, type Reader, nicRound } from "./shared";

/**
 * Category letters supported. Freeport and Investment Zone letters (D, E, F, I, K, L, N, S)
 * need the workplace conditions checked and aren't modelled.
 */
export type NicCategory = "A" | "B" | "C" | "H" | "J" | "M" | "V" | "Z";

export const NIC_CATEGORIES: { value: NicCategory; label: string }[] = [
  { value: "A", label: "A — standard" },
  { value: "M", label: "M — under 21" },
  { value: "H", label: "H — apprentice under 25" },
  { value: "V", label: "V — veteran (first 12 months of civilian work)" },
  { value: "C", label: "C — over State Pension age" },
  { value: "B", label: "B — married woman/widow with reduced-rate election" },
  { value: "J", label: "J — deferment (has another job paying main-rate NIC)" },
  { value: "Z", label: "Z — under 21 with deferment" },
];

const ID = {
  lel: { annual: "nic.lower-earnings-limit", weekly: "emp.nic-lel-weekly", monthly: "emp.nic-lel-monthly" },
  pt: { annual: "nic.primary-threshold", weekly: "emp.nic-pt-weekly", monthly: "emp.nic-pt-monthly" },
  st: { annual: "nic.secondary-threshold", weekly: "emp.nic-st-weekly", monthly: "emp.nic-st-monthly" },
  uel: { annual: "nic.upper-earnings-limit", weekly: "emp.nic-uel-weekly", monthly: "emp.nic-uel-monthly" },
  ust: { annual: "nic.upper-secondary-threshold", weekly: "emp.nic-ust-weekly", monthly: "emp.nic-ust-monthly" },
  aust: { annual: "nic.upper-secondary-threshold", weekly: "emp.nic-aust-weekly", monthly: "emp.nic-aust-monthly" },
  vust: { annual: "nic.upper-secondary-threshold", weekly: "emp.nic-vust-weekly", monthly: "emp.nic-vust-monthly" },
} as const;

export function nicThreshold(R: Reader, f: Frequency, which: keyof typeof ID): { amount: number; id: string } {
  const id = ID[which][f];
  return { amount: R.gbp(id), id };
}

export interface Class1Result {
  employee: number;
  employer: number;
  working: WorkingLine[];
  /** Earnings at or above the LEL (qualifying for State Pension purposes). */
  atLeastLel: boolean;
}

const PRETTY: Record<keyof typeof ID, string> = {
  lel: "LEL",
  pt: "primary threshold",
  st: "secondary threshold",
  uel: "UEL",
  ust: "upper secondary threshold (under 21)",
  aust: "apprentice upper secondary threshold",
  vust: "veterans upper secondary threshold",
};

/**
 * Employee (primary) and employer (secondary) Class 1 NIC on `earnings` for one
 * earnings period. Each contribution is rounded to the penny with 0.5p rounding down.
 */
export function class1(R: Reader, f: Frequency, category: NicCategory, earnings: number, opts: { showEmployee?: boolean; showEmployer?: boolean } = {}): Class1Result {
  const showEE = opts.showEmployee ?? true;
  const showER = opts.showEmployer ?? true;
  const working: WorkingLine[] = [];
  const E = Math.max(0, earnings);
  const lel = nicThreshold(R, f, "lel");
  const pt = nicThreshold(R, f, "pt");
  const uel = nicThreshold(R, f, "uel");
  const st = nicThreshold(R, f, "st");

  // Employee
  let employee = 0;
  if (category === "C") {
    if (showEE) working.push({ label: `Employee NIC: category C (over State Pension age) pays none`, amount: 0, kind: "note" });
  } else {
    const mainId = category === "B" ? "nic.married-women-reduced-rate" : category === "J" || category === "Z" ? "emp.nic-deferment-rate" : "nic.employee-main-rate";
    const main = R.percent(mainId);
    const upper = R.percent("nic.employee-additional-rate");
    const b1 = Math.max(0, Math.min(E, uel.amount) - pt.amount);
    const b2 = Math.max(0, E - uel.amount);
    const x1 = (b1 * main) / 100;
    const x2 = (b2 * upper) / 100;
    employee = nicRound(x1 + x2);
    if (showEE) {
      if (b1 <= 0 && b2 === 0)
        working.push({ label: `Employee NIC: ${gbp(E)} is not above the ${PRETTY.pt} of ${gbp(pt.amount)}${E >= lel.amount ? " (at or above the LEL, so the year still counts for State Pension)" : ""}`, amount: 0, rateId: pt.id });
      else if (b1 > 0)
        working.push({ label: `Employee NIC: (${gbp(Math.min(E, uel.amount))} − ${gbp(pt.amount)} ${PRETTY.pt}) × ${pctLabel(main)}`, amount: nicRound(x1), rateId: b1 > 0 ? mainId : pt.id });
      if (b2 > 0) working.push({ label: `Employee NIC: (${gbp(E)} − ${gbp(uel.amount)} UEL) × ${pctLabel(upper)}`, amount: nicRound(x2), rateId: "nic.employee-additional-rate" });
    }
  }

  // Employer
  const erRate = R.percent("nic.employer-rate");
  const relief: Partial<Record<NicCategory, keyof typeof ID>> = { H: "aust", M: "ust", Z: "ust", V: "vust" };
  const zeroTo = relief[category];
  const from = zeroTo ? nicThreshold(R, f, zeroTo) : st;
  const base = Math.max(0, E - from.amount);
  const employer = nicRound((base * erRate) / 100);
  if (showER) {
    working.push({
      label:
        base <= 0
          ? `Employer NIC: ${gbp(E)} is not above the ${zeroTo ? PRETTY[zeroTo] : PRETTY.st} of ${gbp(from.amount)}`
          : zeroTo
            ? `Employer NIC: 0% up to the ${PRETTY[zeroTo]} ${gbp(from.amount)}, then (${gbp(E)} − ${gbp(from.amount)}) × ${pctLabel(erRate)}`
            : `Employer NIC: (${gbp(E)} − ${gbp(from.amount)} ${PRETTY.st}) × ${pctLabel(erRate)}`,
      amount: employer,
      rateId: base > 0 ? "nic.employer-rate" : from.id,
    });
  }
  return { employee, employer, working, atLeastLel: E >= lel.amount };
}
