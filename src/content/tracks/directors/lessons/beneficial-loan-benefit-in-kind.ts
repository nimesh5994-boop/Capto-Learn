import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "beneficial-loan-benefit-in-kind",
  title: "Beneficial loans: the £10,000 threshold and the official rate",
  level: "practitioner",
  minutes: 30,
  summary:
    "How a cheap or interest-free loan from the company to a director creates a taxable benefit in kind and Class 1A NIC, the £10,000 exemption, the average and precise methods, and how it sits alongside the s455 charge.",
  objectives: [
    "Explain when an employment-related loan produces a taxable benefit and when it is exempt",
    "Calculate the benefit using the average method and the official rate of interest",
    "Calculate the income tax, employer Class 1A NIC and net effect of interest paid by the director",
    "Report the benefit on a P11D and know the deadlines",
    "Explain how the beneficial loan charge and the s455 charge interact",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A director who borrows from their own company on cheap terms has received a benefit: they would otherwise have paid a bank commercial interest. Employment income legislation taxes that saving as a **benefit in kind**, separate from s455. A director with an overdrawn DLA of more than £10,000 for any part of the year can therefore face **two** charges: the corporation tax s455 charge for the company and a P11D benefit for the director.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The beneficial loan rules (ITEPA 2003 Part 3 Chapter 7, ss173–191)",
      md: `- An **employment-related loan** to a director or employee (or a relative) that carries interest **below the official rate** produces a taxable benefit equal to the **difference** between interest at the **official rate** and any interest actually paid.
- **Official rate of interest for 2026/27: 3.75%.** HMRC now reviews it **quarterly** (6 April, 6 July, 6 October 2026 and 6 January 2027), so check the current rate if you are preparing figures mid-year.
- **£10,000 exemption:** if the **total** of all such loans does not exceed **£10,000 at any time in the tax year**, the benefit is exempt and need not be reported. Once the total goes over £10,000 at any point, the **whole** loan is within the charge, not just the excess.
- The benefit is reported on **P11D** (section H) and is subject to **Class 1A NIC** for the company at 15%, with income tax paid by the director through Self Assessment or a PAYE coding adjustment.
- Loans made on commercial terms at or above the official rate create no benefit.`,
    },
    {
      kind: "md",
      md: `### Two ways of calculating

**Average method** (the default): add the balance at the start and end of the tax year (or at the dates the loan began or ended if shorter), divide by two, apply the official rate, and prorate for part-years.

**Precise (daily) method:** the actual balance on each day multiplied by the official rate. Either the **employee/director or HMRC** can elect for it, and it is the better method when the balance moves sharply during the year.

The result is reduced by any interest actually **paid** by the director in respect of the year.`,
    },
    {
      kind: "table",
      caption: "Beneficial loan versus s455: the full picture for an overdrawn DLA",
      head: ["", "s455 charge", "Beneficial loan benefit"],
      rows: [
        ["Who is taxed", "The company (corporation tax)", "The director (income tax); the company pays Class 1A NIC"],
        ["Threshold", "None for owner-directors (small exceptions)", "Over £10,000 at any time in the year"],
        ["Rate", "35.75% for loans made from 6 April 2026", "3.75% official rate × the loan, then taxed at the director's marginal rate"],
        ["Refundable", "Yes, on repayment, release or write-off", "No"],
        ["Reported on", "CT600A", "P11D (and P11D(b) for Class 1A)"],
        ["Deadline", "9 months and 1 day after the year end", "P11D by 6 July; Class 1A paid by 22 July (electronic)"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The year-end timing trap",
      md: `The £10,000 test applies to the **tax year (6 April to 5 April)**, not the company's year. A DLA that is £9,000 at the company year end of 31 March but reached £14,000 in September is still over the threshold for the tax year. Work from the **ledger**, not just the closing balance.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Charging interest on the loan",
      md: `A director can eliminate the benefit by paying interest at the official rate (3.75%). The interest is **income of the company** (taxable) but the director gets no deduction, so it moves tax from the benefit-in-kind route to company profit. It is a minor planning point; the larger cost is usually s455.`,
    },
  ],
  scenario: {
    title: "A P11D for Bertram Wynne of Wynne & Daughter Ltd",
    narrative: `Bertram Wynne is a higher-rate taxpayer and sole director of Wynne & Daughter Ltd. His loan account was overdrawn by £24,000 on 6 April 2026 and £36,000 on 5 April 2027. He paid the company £300 of interest during the year. Class 1A NIC is 15%.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: is the £10,000 exemption available?** The balance exceeded £10,000 throughout, so no.

**Step 2: average method.** (£24,000 + £36,000) ÷ 2 = **£30,000** average balance.

**Step 3: taxable benefit.** £30,000 × 3.75% = **£1,125** at the official rate, less interest paid £300 = **£825**.

**Step 4: tax and NIC.**
- Class 1A NIC for the company: £825 × 15% = **£123.75**, payable by **22 July 2027**.
- Income tax for Bertram at 40%: £825 × 40% = **£330**.

**Step 5: report.** Include £825 in section H of Bertram's P11D (submit by 6 July 2027) and in the P11D(b).

**Step 6: s455 is separate.** If the loan was made after 6 April 2026 and is outstanding 9 months and 1 day after the company's year end, the company pays **35.75%** of it (up to £12,870 on £36,000), reclaimable when the loan is repaid. The two charges are cumulative.`,
      },
      {
        kind: "journal",
        title: "Class 1A NIC on the benefit",
        narrative: "The employer's NIC on the benefit is a payroll cost, deductible for corporation tax.",
        lines: [
          { account: "Employer's NIC expense", dr: 123.75 },
          { account: "PAYE/NIC liability (HMRC)", cr: 123.75 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "average-benefit",
      prompt: "A director's interest-free loan was £10,000 at 6 April 2026 and £50,000 at 5 April 2027. Using the average method and the official rate of 3.75%, what is the taxable benefit (£)?",
      answer: 1125,
      unit: "£",
      explain: "Average balance × official rate, less interest paid (nil here).",
      working: "(£10,000 + £50,000) ÷ 2 = £30,000 × 3.75% = **£1,125**.",
    },
    {
      kind: "numeric",
      id: "class-1a",
      prompt: "The taxable benefit on a beneficial loan is £1,125. What is the company's Class 1A NIC at 15% (£)?",
      answer: 168.75,
      tolerance: 0.5,
      unit: "£",
      explain: "Class 1A is charged at the secondary rate on the cash-equivalent of the benefit.",
      working: "£1,125 × 15% = **£168.75**.",
    },
    {
      kind: "mcq",
      id: "mcq-threshold",
      prompt: "A director's overdrawn loan reaches £10,500 for one week in the tax year and is otherwise below £10,000. What is the position?",
      options: ["Exempt: the average is below £10,000", "The whole loan is within the charge for the year", "Only the £500 excess is taxable", "Only if it exceeds £10,000 at 5 April"],
      answer: 1,
      explain: "The £10,000 exemption is lost if the total exceeds £10,000 at any time; the benefit then arises on the whole loan.",
    },
    {
      kind: "classify",
      id: "classify-bik-loans",
      prompt: "Does a taxable beneficial loan benefit arise (assuming the official rate 3.75% and no interest paid unless stated)?",
      categories: ["Benefit arises", "No benefit"],
      items: [
        { text: "Interest-free loan to a director, £8,000 throughout the year", answer: 1, why: "Within the £10,000 exemption." },
        { text: "Interest-free loan to a director, £30,000 throughout the year", answer: 0 },
        { text: "£30,000 loan on which the director pays 4.5% interest", answer: 1, why: "Interest at or above the official rate leaves no benefit." },
        { text: "£15,000 loan to a director, interest at 2%", answer: 0, why: "Interest below the official rate; benefit on the difference." },
      ],
      explain: "Check the £10,000 total and the interest paid against the official rate.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "What is the official rate of interest for beneficial loans in 2026/27 as at April 2026?",
      options: ["2.25%", "3.75%", "5%", "7.5%"],
      answer: 1,
      explain: "HMRC's official rate remained at 3.75% from 6 April 2026, subject to quarterly review.",
    },
    {
      kind: "mcq",
      id: "q-exempt",
      prompt: "The beneficial loan exemption applies where total loans don't exceed…",
      options: ["£5,000", "£10,000", "£15,000", "£25,000"],
      answer: 1,
      explain: "£10,000 at any time in the tax year.",
    },
    {
      kind: "mcq",
      id: "q-who-pays",
      prompt: "Who pays Class 1A NIC on a beneficial loan benefit?",
      options: ["The director", "The company", "HMRC", "Both equally"],
      answer: 1,
      explain: "Class 1A is an employer-only charge.",
    },
    {
      kind: "mcq",
      id: "q-form",
      prompt: "On which form is the benefit reported?",
      options: ["P60", "P11D", "CT600A only", "P45"],
      answer: 1,
      explain: "P11D section H, with the Class 1A on P11D(b).",
    },
    {
      kind: "mcq",
      id: "q-both",
      prompt: "Can the s455 charge and the beneficial loan benefit apply to the same overdrawn account?",
      options: ["No: one cancels the other", "Yes: they are separate charges on different taxpayers", "Only for non-director employees", "Only if the loan is over £50,000"],
      answer: 1,
      explain: "The company pays s455; the director is taxed on the benefit and the company pays Class 1A.",
    },
  ],
  sources: [
    { label: "Beneficial loan arrangements – HMRC official rates", url: "https://www.gov.uk/government/publications/rates-and-allowances-beneficial-loan-arrangements-hmrc-official-rates/beneficial-loan-arrangements-hmrc-official-rates" },
    { label: "Beneficial loan arrangements (480 Chapter 17)", url: "https://www.gov.uk/guidance/beneficial-loan-arrangements-480-chapter-17" },
    { label: "EIM26130 – beneficial loans: examples", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim26130" },
    { label: "ITEPA 2003 Part 3 Chapter 7", url: "https://www.legislation.gov.uk/ukpga/2003/1/part/3/chapter/7" },
  ],
};
