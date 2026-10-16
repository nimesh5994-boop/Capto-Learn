import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "chapter-8-deemed-employment-payment",
  title: "Chapter 8: calculating the deemed employment payment",
  level: "practitioner",
  minutes: 40,
  summary:
    "The nine-step calculation of the Chapter 8 deemed employment payment for a personal service company, including the 5% allowance, expenses, salary and employer NIC deductions, with a full worked example and the tax and NIC that follow from it.",
  objectives: [
    "Perform the nine-step deemed employment payment calculation for a PSC",
    "Explain each deduction and why the employer NIC step is a 'gross-down' calculation",
    "Calculate the income tax and employee NIC on the deemed payment for a worker",
    "Explain how salary already paid and dividends interact with the deemed payment",
    "Identify record-keeping and the common errors",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Where a **small client** engages a worker through a PSC and the engagement is **inside IR35**, the PSC (not the client) must work out a **deemed employment payment** at the end of the tax year, and account for the PAYE and NIC on it as though it were an extra salary payment. The calculation looks complicated, but it is the same nine steps each time.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The nine steps (ITEPA 2003 s54, ESM8135)",
      md: `1. Take **all payments and benefits received by the PSC** in the tax year for relevant engagements (excluding VAT) and **deduct 5%** (a flat allowance for the PSC's running costs).
2. **Add** any payments or benefits received **directly** by the worker (or family) from anyone other than the PSC for those engagements, not otherwise taxed as employment income.
3. **Deduct** expenses the PSC paid that would have been deductible had the worker been an employee of the client (for example, qualifying travel).
4. **Deduct** capital allowances for equipment the worker would have been entitled to claim as an employee.
5. **Deduct** employer **pension contributions** to a registered scheme for the worker.
6. **Deduct** employer **Class 1 and Class 1A NIC** the PSC paid for the year on the worker's salary and benefits.
7. **Deduct** salary and benefits the PSC paid the worker that are **already taxed** as employment income (the amount actually put through PAYE).
8. **Deduct the employer NIC on the deemed payment itself.** The figure left after step 7 is treated as **including** that employer NIC. Work backwards: find the amount which, **plus employer NIC at 15% of it**, equals the step 7 figure. In other words **deemed payment = step 7 amount ÷ 1.15**.
9. The result is the **deemed employment payment**, on which the PSC must account for **income tax** and **employee and employer NIC** (the employer NIC computed in step 8).

The payment is treated as made on **5 April** (the end of the tax year). Report it on a **Full Payment Submission on or before 5 April**. If the exact figures aren't ready, put a provisional figure on that FPS, then report the final figures and pay any balancing tax and NIC **by 31 January** after the end of the tax year. Interest is charged on the late balance, but no penalty applies.`,
    },
    {
      kind: "md",
      md: `### Points to keep in mind

- **Dividends** are **not** a deduction. They are paid from post-tax profit and are outside the calculation. If the PSC has already paid dividends from income that is then taxed as a deemed payment, the worker has been taxed twice: HMRC guidance allows relief by claim in some cases, so ask for advice and keep clear records.
- **All relevant engagements** in the year are added together into **one** deemed payment, but engagements outside IR35 (or Chapter 10 engagements already taxed) are excluded.
- The **5% allowance** is a fixed percentage; there are no further "running cost" deductions.
- If the result is **nil or negative**, there is no deemed payment.
- The deemed payment is **employment income** for tax, with the usual rates; employee NIC applies on an **annual earnings period** if the worker is a director or the rules apply from the start of the year.
- A **director's** own salary and any **benefits** are included in step 7.

### Compare before and after

For a client considering whether to take a **salary** instead, compare the cost of paying a higher salary through PAYE from the start with the deemed payment route: the tax and NIC are broadly similar, but the **timing** and compliance differ. Take care with **interest and penalties** on late payment.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common errors",
      md: `- **Using fees including VAT.** Start from the amount excluding VAT.
- **Deducting dividends** as if they were salary.
- **Getting step 8 wrong.** The common slip is to subtract 15% of the step 7 figure. The correct employer NIC is 15% of the *deemed payment*, which means dividing the step 7 figure by 1.15.
- **Deducting the 5% from expenses** instead of from gross receipts.
- **Mixing engagements** that are inside and outside IR35.
- **No documentation** for the status assessment. If HMRC enquire, the PSC must show it considered the contract and working practices.`,
    },
  ],
  scenario: {
    title: "Hannah Pryce and Sutton Digital Ltd",
    narrative: `Hannah Pryce supplies web development services to a small client (12 staff, so Chapter 8 applies) through her wholly owned company, **Sutton Digital Ltd**. For 2026/27: fees received excluding VAT **£84,000**; salary paid through PAYE **£12,570** (employer NIC **£1,135.50**, no Employment Allowance); qualifying travel and subsistence expenses paid by the company **£3,200**; no capital allowances or pension contributions. The company also paid Hannah dividends of **£30,000**. The practice's assessment concludes the engagement is **inside IR35**.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Deemed employment payment 2026/27",
        head: ["Step", "Working", "Running figure"],
        rows: [
          ["1. Receipts less 5%", "£84,000 × 95%", "£79,800.00"],
          ["2. Payments direct to worker", "None", "£79,800.00"],
          ["3. Expenses", "− £3,200", "£76,600.00"],
          ["4. Capital allowances", "None", "£76,600.00"],
          ["5. Pension contributions", "None", "£76,600.00"],
          ["6. Employer NIC already paid", "− £1,135.50", "£75,464.50"],
          ["7. Salary already taxed", "− £12,570", "£62,894.50"],
          ["8. Employer NIC on the deemed payment", "£62,894.50 ÷ 1.15 = £54,690.87; NIC = £8,203.63", "£54,690.87"],
          ["9. **Deemed employment payment**", "", "**£54,690.87**"],
        ],
      },
      {
        kind: "md",
        md: `**Tax and NIC on the deemed payment (illustrative, no other income, 2026/27 rates).**
- **Employer NIC** (step 8): **£8,203.63**.
- **Income tax:** total employment income £12,570 + £54,690.87 = £67,260.87. After the £12,570 personal allowance, £54,690.87 is taxable: £37,700 × 20% = £7,540 plus £16,990.87 × 40% = £6,796.35. Total **£14,336.35** (the salary used the allowance, so all the tax arises on the deemed payment).
- **Employee NIC** (annual period): 8% × (£50,270 − £12,570) = £3,016.00, plus 2% × (£67,260.87 − £50,270) = £339.82. Total **£3,355.82**.

**Total cost of the deemed payment to the PSC/worker:** £8,203.63 + £14,336.35 + £3,355.82 = **£25,895.80**.

**Dividends.** The £30,000 dividends were paid from the same funds. The worker should take advice on whether relief is available for tax already paid on that income, and the dividends should be reviewed (the company may have insufficient reserves after paying the deemed payment).

**File.** Keep the CEST/assessment, the calculation, the filings and a note of the dividend position.`,
      },
      {
        kind: "journal",
        title: "Accruing the employer NIC on the deemed payment",
        narrative: "The deemed payment itself is treated as a deduction in the PSC's accounts, with the employer NIC as a separate cost. The employee tax and NIC are the worker's, deducted from the deemed payment.",
        lines: [
          { account: "Employer's NIC expense", dr: 8203.63 },
          { account: "PAYE/NIC liability – employer NIC", cr: 8203.63 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "step-1",
      prompt: "A PSC received £60,000 excluding VAT for an engagement inside IR35. What is the figure after the 5% allowance (step 1) (£)?",
      answer: 57000,
      unit: "£",
      explain: "Deduct 5% from the receipts.",
      working: "£60,000 × 95% = **£57,000**.",
    },
    {
      kind: "numeric",
      id: "deemed-payment-calc",
      prompt: "Receipts £60,000 (excluding VAT), expenses £1,500, employer NIC already paid £1,135.50, salary already paid £12,570. No other deductions. What is the deemed employment payment (to the nearest £1)?",
      answer: 36343,
      tolerance: 1,
      unit: "£",
      explain: "Work through steps 1 to 8: the remaining figure includes the employer NIC on the deemed payment, so divide by 1.15.",
      working: "£60,000 × 95% = £57,000; − £1,500 = £55,500; − £1,135.50 = £54,364.50; − £12,570 = £41,794.50; ÷ 1.15 = **£36,343.04**.",
    },
    {
      kind: "numeric",
      id: "er-nic-on-deemed",
      prompt: "Using the same facts, what is the employer NIC on the deemed payment (step 8) (to the nearest £1)?",
      answer: 5451,
      tolerance: 1,
      unit: "£",
      explain: "Employer NIC is the difference between the step 7 figure and the deemed payment.",
      working: "£41,794.50 − £36,343.04 = **£5,451.46** (also 15% × £36,343.04).",
    },
    {
      kind: "classify",
      id: "classify-chapter-8-steps",
      prompt: "Is the item deducted in the Chapter 8 calculation?",
      categories: ["Deducted", "Not deducted"],
      items: [
        { text: "5% of receipts (flat allowance)", answer: 0 },
        { text: "Dividends paid to the worker", answer: 1, why: "Dividends are paid from post-tax profits and are not a deduction." },
        { text: "Salary already put through PAYE", answer: 0 },
        { text: "Accountancy fees for the PSC", answer: 1, why: "Covered by the 5% allowance; no separate deduction." },
        { text: "Employer pension contributions to a registered scheme", answer: 0 },
      ],
      explain: "Only the listed items are deducted. Running costs are covered by the 5%.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-steps",
      prompt: "How many steps are in the Chapter 8 deemed payment calculation?",
      options: ["5", "7", "9", "12"],
      answer: 2,
      explain: "Nine steps.",
    },
    {
      kind: "mcq",
      id: "q-allowance",
      prompt: "What flat allowance is deducted from receipts at step 1?",
      options: ["3%", "5%", "10%", "15%"],
      answer: 1,
      explain: "5%.",
    },
    {
      kind: "mcq",
      id: "q-step-8",
      prompt: "At step 8, how is the employer NIC on the deemed payment taken into account?",
      options: ["15% of the step 7 figure is deducted", "The step 7 figure is treated as the payment plus employer NIC (÷ 1.15 at 15%)", "It is ignored", "It's deducted from salary"],
      answer: 1,
      explain: "The step 7 figure is the deemed payment plus its employer NIC.",
    },
    {
      kind: "mcq",
      id: "q-date",
      prompt: "When is the deemed employment payment treated as made?",
      options: ["1 April", "5 April", "31 January", "31 December"],
      answer: 1,
      explain: "Normally 5 April, the end of the tax year.",
    },
    {
      kind: "mcq",
      id: "q-vat",
      prompt: "Should VAT be included in the receipts used at step 1?",
      options: ["Yes", "No, VAT is excluded", "Only 5% of it", "Only if the client is VAT registered"],
      answer: 1,
      explain: "The calculation uses receipts excluding VAT.",
    },
  ],
  sources: [
    { label: "How to calculate the deemed employment payment – GOV.UK", url: "https://www.gov.uk/guidance/how-to-calculate-the-deemed-employment-payment" },
    { label: "ESM8135 – how to calculate the deemed payment", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm8135" },
    { label: "ESM8245 – how to account for the deemed employment payment", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm8245" },
    { label: "ITEPA 2003 s54 – calculation of the deemed payment", url: "https://www.legislation.gov.uk/ukpga/2003/1/section/54" },
  ],
};
