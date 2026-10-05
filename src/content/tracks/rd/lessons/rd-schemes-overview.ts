import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "rd-schemes-overview",
  title: "The relief schemes: merged RDEC, ERIS and the old regimes",
  level: "foundation",
  minutes: 30,
  summary:
    "Which scheme applies depends on when the accounting period began. For periods beginning on or after 1 April 2024 it's the merged R&D expenditure credit or, for loss-making R&D-intensive SMEs, ERIS. Older periods use the old SME scheme and old RDEC.",
  objectives: [
    "Pick the right scheme from the accounting period start date",
    "State the headline rates: merged RDEC 20%, ERIS 86% additional deduction and 14.5% payable credit",
    "Explain the difference between an above-the-line taxable credit and an enhanced deduction",
    "Estimate the net cash benefit of each scheme for a profit-making and a loss-making company",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `UK R&D relief was reformed for **accounting periods beginning on or after 1 April 2024**. The old **SME scheme** and the old **RDEC** (for large companies) were replaced by:

- the **merged R&D expenditure credit scheme** ("merged RDEC"), open to any trading company chargeable to corporation tax, whatever its size
- **enhanced R&D intensive support (ERIS)**, an SME-style enhanced deduction and payable credit for **loss-making SMEs that are R&D intensive**

A company eligible for ERIS can choose the merged scheme instead, but it can't claim both for the same expenditure.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The test is the start date of the accounting period",
      md: `- **Accounting period beginning on or after 1 April 2024:** merged RDEC or ERIS.
- **Accounting period beginning before 1 April 2024:** old SME scheme (if an SME) or old RDEC.

It's the **start** of the accounting period that matters, not when the money was spent or when the claim is made. A period from 1 January 2024 to 31 December 2024 is under the old rules, even though most of it falls after 1 April 2024.`,
    },
    {
      kind: "table",
      caption: "Headline rates",
      head: ["Scheme", "Who", "Mechanism", "Rate"],
      rows: [
        ["Merged RDEC (APs from 1 April 2024)", "Any trading company in the CT charge", "Taxable credit, recognised above the line", "20% of qualifying expenditure"],
        ["ERIS (APs from 1 April 2024)", "Loss-making SME with R&D intensity of at least 30%", "Additional deduction, then optional payable credit on the surrenderable loss", "86% additional deduction (186% total); credit 14.5%"],
        ["Old SME scheme, expenditure from 1 April 2023 (APs before 1 April 2024)", "SMEs", "Additional deduction and optional payable credit", "86% additional; credit 10%, or 14.5% if R&D intensive at 40%"],
        ["Old SME scheme, expenditure before 1 April 2023", "SMEs", "Additional deduction and optional payable credit", "130% additional (230% total); credit 14.5%"],
        ["Old RDEC (APs before 1 April 2024)", "Large companies, and SMEs for some expenditure", "Taxable credit", "20% from 1 April 2023; 13% immediately before"],
      ],
    },
    {
      kind: "md",
      md: `### Credit versus deduction

The two mechanisms work very differently, and it matters for the accounts and the tax computation.

**An expenditure credit (merged RDEC)** is a cash-like amount equal to 20% of qualifying spend. It's **taxable income**: it's included in the company's profit and loss account (usually as other operating income, or as a reduction of R&D costs) and in taxable trading profits. It's then used to pay the company's CT liability, and any excess can be paid out in cash after the statutory steps.

**An enhanced deduction (ERIS and the old SME scheme)** gives no income in the accounts. Instead, the tax computation deducts an extra 86% (or 130% for older spend) of the qualifying costs. A loss-making company can then surrender the loss for a payable credit, which is **not taxable**.`,
    },
    {
      kind: "table",
      caption: "Approximate net benefit per £100 of qualifying expenditure",
      head: ["Situation", "Working", "Net benefit"],
      rows: [
        ["Merged RDEC, company paying CT at the 25% main rate", "£20 credit − £5 tax on it", "£15.00"],
        ["Merged RDEC, loss-maker or small profits rate (19%)", "£20 − 19% notional tax £3.80", "£16.20"],
        ["ERIS, loss-making R&D-intensive SME, full surrender", "£186 × 14.5%", "£26.97"],
        ["Old SME scheme (expenditure from 1 April 2023), company paying 25% CT", "£86 extra deduction × 25%", "£21.50"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Check the dates before quoting a rate",
      md: `Many clients and some R&D advisers still quote the old 230% / 14.5% figures. For an accounting period that **began** on or after 1 April 2024, those rates don't apply. Always confirm the accounting period dates first, then the scheme, then the rate.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "SME status still matters",
      md: `ERIS (like the old SME scheme) is only for **SMEs**: broadly fewer than 500 staff, and either turnover of no more than €100m or a balance sheet total of no more than €86m, with linked and partner enterprises included. A large company can only use the merged RDEC.`,
    },
  ],
  scenario: {
    title: "Two periods, two schemes: Orbital Sensors Ltd",
    narrative: `Orbital Sensors Ltd is a profitable SME in Bristol paying corporation tax at the 25% main rate. It has a 31 December year end. The director, Claire Dunn, asks: *"Last year we claimed R&D at the 186% rate. Our R&D spend this year is about the same, £200,000. Why does your estimate say we'll get less?"*

The two periods are:
- Year ended **31 December 2024**: began 1 January 2024
- Year ended **31 December 2025**: began 1 January 2025`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Year to 31 December 2024** began **before** 1 April 2024, so the **old SME scheme** applies. The spend was incurred after 1 April 2023, so the additional deduction is **86%**: £200,000 × 86% = £172,000. At 25%, that saves **£43,000** of CT.
2. **Year to 31 December 2025** began **after** 1 April 2024, so the **merged RDEC** applies. Orbital is profitable, so it can't use ERIS, which is only for loss-makers. The credit is £200,000 × 20% = **£40,000**. It's taxable, so tax at 25% costs £10,000, giving a net benefit of **£30,000**.
3. The difference of £13,000 is the result of the reform, not an error.`,
      },
      {
        kind: "table",
        caption: "Comparison",
        head: ["", "YE 31 Dec 2024 (old SME)", "YE 31 Dec 2025 (merged RDEC)"],
        rows: [
          ["Qualifying expenditure", "£200,000", "£200,000"],
          ["Relief", "Extra deduction £172,000", "Credit £40,000 (taxable)"],
          ["CT effect at 25%", "Saves £43,000", "£40,000 − £10,000 tax"],
          ["**Net benefit**", "**£43,000**", "**£30,000**"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Manage expectations early",
        md: `Tell clients about scheme changes before they've budgeted for the old benefit. A short email with a comparison like this table avoids a difficult conversation when the CT bill comes in.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-periods",
      prompt: "For each SME accounting period, which regime applies? (Assume the company is profitable, so ERIS isn't relevant.)",
      categories: ["Old SME scheme", "Merged RDEC"],
      items: [
        { text: "1 April 2024 to 31 March 2025", answer: 1, why: "Begins on 1 April 2024, so it's within the new rules." },
        { text: "1 January 2024 to 31 December 2024", answer: 0, why: "Begins before 1 April 2024." },
        { text: "1 July 2023 to 30 June 2024", answer: 0 },
        { text: "1 May 2024 to 30 April 2025", answer: 1 },
        { text: "1 March 2024 to 28 February 2025", answer: 0, why: "Begins on 1 March 2024, one month before the cut-off." },
      ],
      explain: "The scheme depends on when the accounting period begins: before 1 April 2024 means the old schemes; on or after means merged RDEC or ERIS.",
    },
    {
      kind: "numeric",
      id: "net-benefit-main-rate",
      prompt:
        "A large company paying CT at 25% has £600,000 of qualifying R&D expenditure in its year to 31 March 2026. What is the net after-tax benefit of the merged RDEC?",
      answer: 90000,
      unit: "£",
      explain: "The credit is 20% of qualifying expenditure, but it's taxable income, so the company pays CT at 25% on it.",
      working: "Credit: £600,000 × 20% = £120,000. Tax on the credit: £120,000 × 25% = £30,000. Net benefit: **£90,000** (15% of spend).",
    },
    {
      kind: "numeric",
      id: "eris-max",
      prompt:
        "A loss-making R&D-intensive SME has £100,000 of qualifying expenditure and a large enough trading loss to surrender the full enhanced amount under ERIS. What is the maximum payable credit?",
      answer: 26970,
      unit: "£",
      explain: "Under ERIS, the surrenderable loss is capped at 186% of qualifying expenditure, and the credit is 14.5% of the loss surrendered.",
      working: "£100,000 × 186% = £186,000. £186,000 × 14.5% = **£26,970**.",
    },
    {
      kind: "mcq",
      id: "taxable",
      prompt: "Which of these is taxable income of the company?",
      options: [
        "The merged RDEC credit",
        "The ERIS payable tax credit",
        "The old SME scheme payable tax credit",
        "None of them",
      ],
      answer: 0,
      explain: "Expenditure credits (old and merged RDEC) are taxable, recognised above the line. SME-style payable credits (old SME and ERIS) aren't taxable.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "What is the rate of the merged R&D expenditure credit?",
      options: ["13%", "14.5%", "20%", "86%"],
      answer: 2,
      explain: "The merged RDEC is 20% of qualifying expenditure, for accounting periods beginning on or after 1 April 2024.",
    },
    {
      kind: "mcq",
      id: "q-eris-who",
      prompt: "Which company can claim ERIS?",
      options: [
        "Any SME doing R&D",
        "A loss-making SME whose R&D intensity is at least 30%",
        "A large company with high R&D spend",
        "A profitable SME with intensity over 40%",
      ],
      answer: 1,
      explain: "ERIS is for SMEs that are loss-making (before the additional deduction) and meet the 30% intensity condition.",
    },
    {
      kind: "mcq",
      id: "q-date",
      prompt: "A company's accounting period runs from 1 February 2024 to 31 January 2025. Which rules apply?",
      options: ["Merged RDEC, because most of the period is after 1 April 2024", "The old schemes, because the period began before 1 April 2024", "A time apportionment of both", "The company chooses"],
      answer: 1,
      explain: "The start date of the accounting period decides the regime. There's no apportionment.",
    },
    {
      kind: "mcq",
      id: "q-both",
      prompt: "A company is eligible for ERIS. Can it claim the merged RDEC instead?",
      options: ["No: ERIS is compulsory", "Yes, but not both for the same expenditure", "Yes, and it can claim both", "Only with HMRC's agreement"],
      answer: 1,
      explain: "An ERIS-eligible company may choose the merged scheme, but it can't claim under both for the same expenditure.",
    },
    {
      kind: "mcq",
      id: "q-old-sme",
      prompt: "Under the old SME scheme, what additional deduction applied to qualifying expenditure incurred on or after 1 April 2023?",
      options: ["130%", "100%", "86%", "20%"],
      answer: 2,
      explain: "The SME additional deduction fell from 130% to 86% for expenditure on or after 1 April 2023 (enhanced expenditure 186%).",
    },
  ],
  sources: [
    { label: "R&D tax relief: the merged scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
    { label: "CIRD111000: new RDEC overview", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird111000" },
    { label: "CIRD127000: ERIS and old SME rates", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird127000" },
    { label: "R&D tax relief for SMEs (accounting periods before 1 April 2024)", url: "https://www.gov.uk/guidance/corporation-tax-research-and-development-tax-relief-for-small-and-medium-sized-enterprises" },
  ],
};
