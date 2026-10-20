import type { RateItem, RateSection, RateSource } from "../types";

/**
 * Extra verified rate sections for the employment calculators, merged into the main dataset by tax year.
 * Same rule as the main dataset: every figure checked against a live official page, with its source.
 *
 * Checked on 20 October 2026 against:
 * - GOV.UK "Rates and thresholds for employers" 2026 to 2027 and 2025 to 2026 (weekly/monthly
 *   NIC thresholds, student and postgraduate loan period thresholds, NIC category rates, SSP rates);
 * - HMRC "Specification for PAYE tax table routines" v24.0, February 2026 (overriding regulatory limit);
 * - The Pensions Regulator "Earnings thresholds" (auto-enrolment period figures);
 * - GOV.UK "Expenses and benefits: passenger payments" (5p a mile);
 * - business.gov.uk "Statutory Sick Pay changes" (2026/27 reforms).
 */

const S = {
  employers2026: {
    title: "GOV.UK — Rates and thresholds for employers 2026 to 2027",
    url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027",
  },
  employers2025: {
    title: "GOV.UK — Rates and thresholds for employers 2025 to 2026",
    url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2025-to-2026",
  },
  payeSpec: {
    title: "HMRC — Payroll technical specifications: Specification for PAYE tax table routines (v24.0, para 4.5.2 and Appendix A 'Maxrate')",
    url: "https://www.gov.uk/government/publications/payroll-technical-specifications-income-tax",
  },
  tpr: {
    title: "The Pensions Regulator — Automatic enrolment earnings thresholds",
    url: "https://www.thepensionsregulator.gov.uk/en/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/ongoing-duties-for-employers/earnings-thresholds",
  },
  passenger: {
    title: "GOV.UK — Expenses and benefits: business travel mileage — passenger payments",
    url: "https://www.gov.uk/expenses-and-benefits-business-travel-mileage/passenger-payments",
  },
  sspChanges: {
    title: "business.gov.uk — Statutory Sick Pay changes (employers)",
    url: "https://www.business.gov.uk/campaign/employment-changes/employers/statutory-sick-pay/",
  },
} satisfies Record<string, RateSource>;

const gbp = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `£${amount.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2 })}`,
  amount,
  unit: "GBP",
  source,
  ...(note ? { note } : {}),
});

const pct = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `${amount}%`,
  amount,
  unit: "percent",
  source,
  ...(note ? { note } : {}),
});

const pence = (id: string, label: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value: `${amount}p`,
  amount,
  unit: "pence",
  source,
  ...(note ? { note } : {}),
});

/** A rule held as text, with a count in `amount` for the calculators (e.g. number of waiting days). */
const rule = (id: string, label: string, value: string, amount: number, source: RateSource, note?: string): RateItem => ({
  id,
  label,
  value,
  amount,
  unit: "text",
  source,
  ...(note ? { note } : {}),
});

interface YearFigures {
  src: RateSource;
  lel: [number, number];
  /** Student loan period thresholds [weekly, monthly]; plan5 absent before 2026/27. */
  sl: { plan1: [number, number]; plan2: [number, number]; plan4: [number, number]; plan5?: [number, number]; pgl: [number, number] };
}

function periodSection(y: YearFigures): RateItem[] {
  const s = y.src;
  const items: RateItem[] = [
    gbp("emp.nic-lel-weekly", "Class 1 Lower Earnings Limit (weekly)", y.lel[0], s),
    gbp("emp.nic-lel-monthly", "Class 1 Lower Earnings Limit (monthly)", y.lel[1], s),
    gbp("emp.nic-pt-weekly", "Class 1 Primary Threshold (weekly)", 242, s),
    gbp("emp.nic-pt-monthly", "Class 1 Primary Threshold (monthly)", 1048, s),
    gbp("emp.nic-st-weekly", "Class 1 Secondary Threshold (weekly)", 96, s),
    gbp("emp.nic-st-monthly", "Class 1 Secondary Threshold (monthly)", 417, s),
    gbp("emp.nic-uel-weekly", "Class 1 Upper Earnings Limit (weekly)", 967, s),
    gbp("emp.nic-uel-monthly", "Class 1 Upper Earnings Limit (monthly)", 4189, s),
    gbp("emp.nic-ust-weekly", "Upper Secondary Threshold, under 21 (weekly)", 967, s),
    gbp("emp.nic-ust-monthly", "Upper Secondary Threshold, under 21 (monthly)", 4189, s),
    gbp("emp.nic-aust-weekly", "Apprentice Upper Secondary Threshold, under 25 (weekly)", 967, s),
    gbp("emp.nic-aust-monthly", "Apprentice Upper Secondary Threshold, under 25 (monthly)", 4189, s),
    gbp("emp.nic-vust-weekly", "Veterans Upper Secondary Threshold (weekly)", 967, s),
    gbp("emp.nic-vust-monthly", "Veterans Upper Secondary Threshold (monthly)", 4189, s),
    pct("emp.nic-deferment-rate", "Employee rate PT to UEL — deferment categories J and Z", 2, s,
      "Categories J and Z (deferment) pay 2% between the PT and UEL and 2% above the UEL."),
    gbp("emp.sl-plan1-weekly", "Student loan Plan 1 threshold (weekly)", y.sl.plan1[0], s),
    gbp("emp.sl-plan1-monthly", "Student loan Plan 1 threshold (monthly)", y.sl.plan1[1], s),
    gbp("emp.sl-plan2-weekly", "Student loan Plan 2 threshold (weekly)", y.sl.plan2[0], s),
    gbp("emp.sl-plan2-monthly", "Student loan Plan 2 threshold (monthly)", y.sl.plan2[1], s),
    gbp("emp.sl-plan4-weekly", "Student loan Plan 4 threshold (weekly)", y.sl.plan4[0], s),
    gbp("emp.sl-plan4-monthly", "Student loan Plan 4 threshold (monthly)", y.sl.plan4[1], s),
    ...(y.sl.plan5
      ? [
          gbp("emp.sl-plan5-weekly", "Student loan Plan 5 threshold (weekly)", y.sl.plan5[0], s),
          gbp("emp.sl-plan5-monthly", "Student loan Plan 5 threshold (monthly)", y.sl.plan5[1], s),
        ]
      : []),
    gbp("emp.pgl-weekly", "Postgraduate loan threshold (weekly)", y.sl.pgl[0], s),
    gbp("emp.pgl-monthly", "Postgraduate loan threshold (monthly)", y.sl.pgl[1], s),
    gbp("emp.ae-qe-lower-weekly", "Auto-enrolment qualifying earnings — lower level (weekly)", 120, S.tpr),
    gbp("emp.ae-qe-lower-monthly", "Auto-enrolment qualifying earnings — lower level (monthly)", 520, S.tpr),
    gbp("emp.ae-qe-upper-weekly", "Auto-enrolment qualifying earnings — upper level (weekly)", 967, S.tpr),
    gbp("emp.ae-qe-upper-monthly", "Auto-enrolment qualifying earnings — upper level (monthly)", 4189, S.tpr),
    pct("emp.paye-regulatory-limit", "PAYE overriding regulatory limit (maximum tax as % of the period's pay)", 50, S.payeSpec,
      "Tax deducted in a pay period can't exceed 50% of that period's pay (excluding payrolled benefits)."),
    pence("emp.amap-passenger", "Approved passenger payments (per passenger, per business mile)", 5, S.passenger,
      "Tax-free up to 5p a mile for carrying fellow employees on business journeys. No relief if the employer pays less."),
  ];
  return items;
}

export const extra: Record<string, RateSection[]> = {
  "2026/27": [
    {
      id: "emp-calc",
      title: "Employment calculators — period thresholds and payroll rules",
      items: [
        ...periodSection({
          src: S.employers2026,
          lel: [129, 559],
          sl: { plan1: [517.3, 2241.66], plan2: [565.09, 2448.75], plan4: [649.9, 2816.25], plan5: [480.76, 2083.33], pgl: [403.84, 1750] },
        }),
        pct("emp.ssp-awe-percent", "Statutory Sick Pay — percentage of average weekly earnings (if lower than the weekly rate)", 80, S.employers2026,
          "From 6 April 2026 SSP is £123.25 or 80% of AWE, whichever is lower."),
        rule("emp.ssp-waiting-days", "Statutory Sick Pay — waiting days", "None: payable from the first qualifying day", 0, S.sspChanges,
          "The 3 waiting days were removed from 6 April 2026."),
        rule("emp.ssp-lel-test", "Statutory Sick Pay — earnings test", "No Lower Earnings Limit test", 0, S.sspChanges,
          "The Lower Earnings Limit test was removed from 6 April 2026."),
      ],
    },
  ],
  "2025/26": [
    {
      id: "emp-calc",
      title: "Employment calculators — period thresholds and payroll rules",
      items: [
        ...periodSection({
          src: S.employers2025,
          lel: [125, 542],
          sl: { plan1: [501.25, 2172.08], plan2: [547.5, 2372.5], plan4: [629.71, 2728.75], pgl: [403.84, 1750] },
        }),
        rule("emp.ssp-waiting-days", "Statutory Sick Pay — waiting days", "3 waiting days", 3, S.sspChanges,
          "Until 5 April 2026 SSP was not paid for the first 3 qualifying days in a period of incapacity for work."),
        rule("emp.ssp-lel-test", "Statutory Sick Pay — earnings test", "AWE must be at least the Lower Earnings Limit (£125 a week)", 1, S.sspChanges,
          "Applied until 5 April 2026."),
      ],
    },
  ],
};
