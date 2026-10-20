import type { RateItem, RateSection, RateSource } from "../types";

/**
 * Extra verified rate sections for the personal calculators, merged into the main dataset by tax year.
 * Same rule as the main dataset: every figure checked against a live official page, with its source.
 *
 * Checked 2026-10-20 against GOV.UK "Understanding your Self Assessment tax bill: payments on account".
 * The page states the rules without a year limit; they applied unchanged in 2025/26 and 2026/27.
 */

const POA: RateSource = {
  title: "GOV.UK — Understanding your Self Assessment tax bill: payments on account",
  url: "https://www.gov.uk/understand-self-assessment-bill/payments-on-account",
};

const items: RateItem[] = [
  {
    id: "it.poa-threshold",
    label: "Payments on account not required if last year's Self Assessment bill was less than",
    value: "£1,000",
    amount: 1000,
    unit: "GBP",
    note: "The bill after tax deducted at source (PAYE etc.).",
    source: POA,
  },
  {
    id: "it.poa-at-source-percent",
    label: "Payments on account not required if more than this share of last year's tax was paid outside Self Assessment",
    value: "80%",
    amount: 80,
    unit: "percent",
    note: "For example through PAYE or deducted from interest.",
    source: POA,
  },
  {
    id: "it.poa-instalment-percent",
    label: "Each payment on account (share of last year's Self Assessment bill)",
    value: "50%",
    amount: 50,
    unit: "percent",
    note: "Due 31 January in the tax year and 31 July after it; includes Class 4 NIC but not CGT or student loan.",
    source: POA,
  },
];

const section = (): RateSection => ({ id: "it-self-assessment-payments", title: "Self Assessment payments on account", items });

export const extra: Record<string, RateSection[]> = {
  "2026/27": [section()],
  "2025/26": [section()],
};
