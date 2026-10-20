/**
 * Statutory payments: SSP, SMP, SAP, SPP and ShPP, with the qualifying checks,
 * the amount payable and what the employer can recover from HMRC.
 */
import { type CalcResult, type WorkingLine, CalcInputError, gbp, pctLabel, r2, rateReader, requireNonNegative } from "../common";
import { ceilPenny, hasRate, ruleCount, trunc4 } from "./shared";

export type StatutoryPayment = "ssp" | "smp" | "sap" | "spp" | "shpp";

export const PAYMENT_LABEL: Record<StatutoryPayment, string> = {
  ssp: "Statutory Sick Pay",
  smp: "Statutory Maternity Pay",
  sap: "Statutory Adoption Pay",
  spp: "Statutory Paternity Pay",
  shpp: "Statutory Shared Parental Pay",
};

/**
 * Statutory durations (mechanics, not rates):
 * - SSP: up to 28 weeks in a period of incapacity for work (GOV.UK https://www.gov.uk/employers-sick-pay;
 *   SSCBA 1992 s155(4)).
 * - SMP and SAP: up to 39 weeks, the first 6 at 90% of AWE (https://www.gov.uk/employers-maternity-pay-leave/pay).
 * - SPP: 1 or 2 weeks (https://www.gov.uk/employers-paternity-pay-leave).
 * - ShPP: what's left of the 39 weeks of SMP/SAP after the mother or adopter ends it
 *   (https://www.gov.uk/shared-parental-leave-and-pay-employer-guide).
 * - Continuous employment of 26 weeks into the qualifying week (15th week before the expected week of
 *   childbirth) for SMP and the matching week for adoption
 *   (https://www.gov.uk/employers-maternity-pay-leave/eligibility-and-proof-of-pregnancy).
 */
export const DURATIONS = {
  sspMaxWeeks: 28,
  smpWeeks: 39,
  smpHigherRateWeeks: 6,
  sppMaxWeeks: 2,
  continuousEmploymentWeeks: 26,
} as const;

export interface StatutoryPayInput {
  taxYear: string;
  payment: StatutoryPayment;
  /** Average weekly earnings in the relevant period (normally 8 weeks), unrounded. */
  awe: number;
  /** SMP/SAP/SPP/ShPP: employed continuously for at least 26 weeks into the qualifying (or matching) week. */
  continuousEmployment?: boolean;
  /** Weeks to pay (SMP/SAP up to 39, SPP 1 or 2, ShPP up to what's left). */
  weeks?: number;
  /** ShPP: weeks of SMP/SAP already paid to the mother or adopter. */
  smpWeeksTaken?: number;
  /** SSP: number of qualifying days in a week (days normally worked), 1–7. */
  qualifyingDaysPerWeek?: number;
  /** SSP: qualifying days of sickness in this period of incapacity for work. */
  sickDays?: number;
  /** SSP: qualifying days already paid in linked periods (for the 28-week maximum). */
  daysAlreadyPaid?: number;
  /** SSP before 6 April 2026: waiting days already served in a linked period. */
  waitingDaysServed?: number;
  /** Total employee + employer Class 1 NIC for the previous tax year (small employers' relief). Blank = not known. */
  previousYearClass1Nic?: number;
}

export interface StatutoryPayResult extends CalcResult {
  qualifies: boolean;
  weeklyRate: number;
  /** First 6 weeks rate (SMP/SAP). */
  higherRate?: number;
  dailyRate?: number;
  daysPaid?: number;
  weeksPaid?: number;
  total: number;
  recoverable: number;
  recoveryRate: number;
  smallEmployer: boolean | null;
}

export function validateStatutoryPay(i: StatutoryPayInput): string[] {
  const e: string[] = [];
  requireNonNegative(e, "Average weekly earnings", i.awe);
  requireNonNegative(e, "Previous year's Class 1 NIC", i.previousYearClass1Nic);
  if (i.payment === "ssp") {
    const qd = i.qualifyingDaysPerWeek ?? 0;
    if (!Number.isInteger(qd) || qd < 1 || qd > 7) e.push("Qualifying days per week must be a whole number from 1 to 7.");
    for (const [label, v] of [["Days of sickness", i.sickDays], ["Days already paid", i.daysAlreadyPaid], ["Waiting days served", i.waitingDaysServed]] as const) {
      requireNonNegative(e, label, v);
      if (v !== undefined && !Number.isInteger(v)) e.push(`${label} must be a whole number.`);
    }
  } else {
    const w = i.weeks ?? 0;
    requireNonNegative(e, "Weeks", w);
    if (!Number.isInteger(w)) e.push("Weeks must be a whole number.");
    if ((i.payment === "smp" || i.payment === "sap") && w > DURATIONS.smpWeeks) e.push(`${PAYMENT_LABEL[i.payment]} is paid for up to ${DURATIONS.smpWeeks} weeks.`);
    if (i.payment === "spp" && w > DURATIONS.sppMaxWeeks) e.push(`Statutory Paternity Pay is paid for 1 or 2 weeks.`);
    if (i.payment === "shpp") {
      const taken = i.smpWeeksTaken ?? 0;
      requireNonNegative(e, "Weeks of SMP/SAP taken", taken);
      if (!Number.isInteger(taken) || taken > DURATIONS.smpWeeks) e.push(`Weeks of SMP/SAP taken must be a whole number up to ${DURATIONS.smpWeeks}.`);
      else if (w > DURATIONS.smpWeeks - taken) e.push(`Only ${DURATIONS.smpWeeks - taken} weeks of ShPP are left after ${taken} weeks of SMP/SAP.`);
    }
  }
  return e;
}

const FLAT_ID: Record<Exclude<StatutoryPayment, "ssp">, string> = {
  smp: "emp.smp-weekly",
  sap: "emp.sap-weekly",
  spp: "emp.spp-weekly",
  shpp: "emp.shpp-weekly",
};

export function statutoryPay(input: StatutoryPayInput): StatutoryPayResult {
  const errors = validateStatutoryPay(input);
  if (errors.length) throw new CalcInputError(errors);
  const R = rateReader(input.taxYear);
  const y = input.taxYear;
  const working: WorkingLine[] = [];
  const notes: string[] = [];
  const awe = input.awe;
  const lel = R.gbp("emp.nic-lel-weekly");
  working.push({ label: "Average weekly earnings (AWE)", amount: awe });

  let qualifies = true;
  let weeklyRate = 0;
  let total = 0;
  let higherRate: number | undefined;
  let dailyRate: number | undefined;
  let daysPaid: number | undefined;

  if (input.payment === "ssp") {
    const flat = R.gbp("emp.ssp-weekly");
    const lelTest = ruleCount(R, y, "emp.ssp-lel-test") > 0;
    const waiting = ruleCount(R, y, "emp.ssp-waiting-days");
    if (lelTest && awe < lel) {
      qualifies = false;
      working.push({ label: `AWE is below the Lower Earnings Limit of ${gbp(lel)} a week: no SSP (give form SSP1)`, amount: 0, rateId: "emp.ssp-lel-test", kind: "note" });
    }
    if (hasRate(y, "emp.ssp-awe-percent")) {
      const p = R.percent("emp.ssp-awe-percent");
      const pctAwe = (awe * p) / 100;
      weeklyRate = Math.min(flat, pctAwe);
      working.push({ label: `${pctLabel(p)} of AWE`, amount: r2(pctAwe), rateId: "emp.ssp-awe-percent", kind: "memo" });
      working.push({ label: `Weekly rate: lower of ${gbp(flat)} and ${pctLabel(p)} of AWE`, amount: r2(weeklyRate), rateId: pctAwe < flat ? "emp.ssp-awe-percent" : "emp.ssp-weekly" });
    } else {
      weeklyRate = flat;
      working.push({ label: "Weekly rate (flat rate for this year)", amount: flat, rateId: "emp.ssp-weekly" });
    }
    const qd = input.qualifyingDaysPerWeek!;
    // HMRC's SSP daily rate table gives unrounded rates to 4 decimal places (e.g. £17.6071 for 7 days);
    // the amount for a number of days is that rate × days, rounded up to the penny (e.g. 2 days = £35.22).
    dailyRate = trunc4(weeklyRate / qd);
    working.push({ label: `Daily rate: ${gbp(r2(weeklyRate))} ÷ ${qd} qualifying day${qd === 1 ? "" : "s"} a week (unrounded ${dailyRate.toFixed(4)})`, amount: r2(dailyRate), kind: "memo" });
    const sick = input.sickDays ?? 0;
    const waitingLeft = Math.max(0, waiting - (input.waitingDaysServed ?? 0));
    const waitingNow = Math.min(sick, waitingLeft);
    if (waiting > 0) working.push({ label: `Waiting days (unpaid): ${waitingNow} of ${waiting}`, amount: 0, rateId: "emp.ssp-waiting-days", kind: "note" });
    else working.push({ label: "No waiting days: SSP is payable from the first qualifying day of sickness", amount: 0, rateId: "emp.ssp-waiting-days", kind: "note" });
    const maxDays = DURATIONS.sspMaxWeeks * qd;
    const left = Math.max(0, maxDays - (input.daysAlreadyPaid ?? 0));
    daysPaid = qualifies ? Math.min(sick - waitingNow, left) : 0;
    if (sick - waitingNow > left) working.push({ label: `Limited to ${DURATIONS.sspMaxWeeks} weeks (${maxDays} qualifying days) in linked periods: ${left} days left`, amount: 0, kind: "note" });
    total = qualifies ? ceilPenny(dailyRate * daysPaid) : 0;
    working.push({ label: `SSP: ${daysPaid} day${daysPaid === 1 ? "" : "s"} × daily rate (rounded up to the penny)`, amount: total });
    working.push({ label: "Total SSP payable", amount: total, kind: "total" });
    working.push({ label: "SSP can't be recovered from HMRC", amount: 0, kind: "note" });
    notes.push("Periods of sickness 8 weeks or less apart link and count as one period for the 28-week maximum. Enter qualifying days already paid in linked periods.");
    notes.push("AWE is normally gross earnings in the 8 weeks up to the last normal payday before the sickness, as a weekly figure. Working it out from payslips isn't covered.");
    notes.push("The rounding of 80% of AWE isn't stated by GOV.UK: this calculator keeps it unrounded and rounds the total up to the penny, matching HMRC's daily-rate table.");
    notes.push("Company (occupational) sick pay is not modelled: it must be at least as much as SSP for each day.");
    const recovery = { recoverable: 0, recoveryRate: 0, smallEmployer: null };
    return { taxYear: y, tax: total, working, rateIds: [...R.used], notes, qualifies, weeklyRate: r2(weeklyRate), dailyRate, daysPaid, total, ...recovery };
  }

  // Family statutory payments
  const pay = input.payment;
  const flatId = FLAT_ID[pay];
  const flat = R.gbp(flatId);
  const ninety = R.percent("emp.smp-first-6-weeks");
  if (input.continuousEmployment === false) {
    qualifies = false;
    working.push({ label: `Not continuously employed for ${DURATIONS.continuousEmploymentWeeks} weeks into the qualifying week: no ${PAYMENT_LABEL[pay]}`, amount: 0, kind: "note" });
  }
  if (awe < lel) {
    qualifies = false;
    working.push({ label: `AWE is below the Lower Earnings Limit of ${gbp(lel)} a week: no ${PAYMENT_LABEL[pay]}`, amount: 0, rateId: "emp.nic-lel-weekly", kind: "note" });
  }
  // 90% of AWE rounded up to the penny where it isn't exact (see notes: rounding assumed).
  const ninetyAwe = ceilPenny((awe * ninety) / 100);
  weeklyRate = Math.min(flat, ninetyAwe);
  const weeks = input.weeks ?? 0;
  const weeksPaid = qualifies ? weeks : 0;
  if (pay === "smp" || pay === "sap") {
    higherRate = ninetyAwe;
    const w1 = Math.min(weeksPaid, DURATIONS.smpHigherRateWeeks);
    const w2 = Math.max(0, weeksPaid - DURATIONS.smpHigherRateWeeks);
    const a1 = r2(w1 * ninetyAwe);
    const a2 = r2(w2 * weeklyRate);
    working.push({ label: `First ${DURATIONS.smpHigherRateWeeks} weeks: ${pctLabel(ninety)} of AWE = ${gbp(ninetyAwe)} × ${w1}`, amount: a1, rateId: "emp.smp-first-6-weeks" });
    working.push({ label: `Remaining weeks: lower of ${gbp(flat)} and ${gbp(ninetyAwe)} = ${gbp(weeklyRate)} × ${w2}`, amount: a2, rateId: flatId });
    total = r2(a1 + a2);
  } else {
    total = r2(weeksPaid * weeklyRate);
    working.push({ label: `Weekly rate: lower of ${gbp(flat)} and ${pctLabel(ninety)} of AWE (${gbp(ninetyAwe)})`, amount: weeklyRate, rateId: flatId, kind: "memo" });
    working.push({ label: `${PAYMENT_LABEL[pay]}: ${gbp(weeklyRate)} × ${weeksPaid} week${weeksPaid === 1 ? "" : "s"}`, amount: total, rateId: flatId });
    if (pay === "shpp") working.push({ label: `ShPP weeks available: ${DURATIONS.smpWeeks} − ${input.smpWeeksTaken ?? 0} weeks of SMP/SAP taken`, amount: 0, kind: "note" });
  }
  working.push({ label: `Total ${PAYMENT_LABEL[pay]} payable`, amount: total, kind: "total" });

  // Recovery
  let smallEmployer: boolean | null = null;
  let recoveryRate = R.percent("emp.statutory-pay-recovery-standard");
  let rateId = "emp.statutory-pay-recovery-standard";
  if (input.previousYearClass1Nic !== undefined) {
    const limit = R.gbp("emp.small-employer-nic-limit");
    smallEmployer = input.previousYearClass1Nic <= limit;
    working.push({
      label: `Previous year's Class 1 NIC ${gbp(input.previousYearClass1Nic)} ${smallEmployer ? "is within" : "is above"} the ${gbp(limit)} small employer limit`,
      amount: 0,
      rateId: "emp.small-employer-nic-limit",
      kind: "note",
    });
    if (smallEmployer) {
      recoveryRate = R.percent("emp.statutory-pay-recovery-small-employer");
      rateId = "emp.statutory-pay-recovery-small-employer";
    }
  }
  const recoverable = r2((total * recoveryRate) / 100);
  working.push({ label: `Recoverable from HMRC on the EPS: ${gbp(total)} × ${pctLabel(recoveryRate)}${smallEmployer ? " (small employers' relief)" : ""}`, amount: recoverable, rateId, kind: "memo" });
  working.push({ label: "Net cost to the employer", amount: r2(total - recoverable), kind: "memo" });
  if (input.previousYearClass1Nic === undefined) notes.push("Previous year's Class 1 NIC not entered, so the standard recovery rate is shown. Enter it to check small employers' relief.");

  notes.push(`The earnings test uses the Lower Earnings Limit in force at the end of the qualifying week (${gbp(lel)} a week for ${y}).`);
  notes.push("90% of AWE is rounded up to the penny where it isn't exact; GOV.UK doesn't state the rounding, so check part-penny cases against HMRC's calculator. Part weeks (daily rate = weekly rate ÷ 7) aren't modelled.");
  if (pay === "spp") notes.push("SPP also needs the employee to be the father, the mother's partner or the adopter's partner with responsibility for the child, and to give notice in time.");
  if (pay === "shpp") notes.push("ShPP also needs both parents to meet the shared parental leave conditions (including the partner's employment and earnings test) and the right notices.");
  if (pay === "smp" || pay === "sap") notes.push("Notice and evidence (MATB1 or matching certificate) are assumed to be in order. Keeping-in-touch days and contractual enhancements aren't modelled.");
  notes.push("Statutory payments are taxable pay and liable to NIC through the payroll.");

  return {
    taxYear: y,
    tax: total,
    working,
    rateIds: [...R.used],
    notes,
    qualifies,
    weeklyRate,
    higherRate,
    weeksPaid,
    total,
    recoverable,
    recoveryRate,
    smallEmployer,
  };
}
