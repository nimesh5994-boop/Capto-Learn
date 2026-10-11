import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "termination-payments",
  title: "Termination payments: PENP, the £30,000 exemption and Class 1A",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Splitting a leaving package into contractual earnings, post-employment notice pay and the termination award that benefits from the £30,000 threshold — and running it through payroll correctly, including Class 1A NIC on the excess.",
  objectives: [
    "Classify each element of a termination package as earnings, PENP, a section 401 award or exempt",
    "Calculate PENP using the formula in ITEPA 2003 s402D",
    "Apply the £30,000 threshold and calculate Class 1A NIC on the excess",
    "Process the package through payroll, before or after the P45 is issued",
  ],
  body: [
    {
      kind: "md",
      md: `When a client lets someone go with a settlement, the payroll team is usually handed a single figure ("pay him £45,000 and the rest of the month"). Your job is to split that figure correctly, because each part is taxed differently. Get it wrong and either the employee is overtaxed or the employer underdeducts and HMRC collects the shortfall from the employer.`,
    },
    {
      kind: "table",
      caption: "The building blocks of a termination package",
      head: ["Element", "Treatment", "NIC"],
      rows: [
        ["Salary, overtime and commission to the leaving date; holiday pay in lieu", "Earnings: taxed in full", "Class 1"],
        ["Contractual payment in lieu of notice (PILON), or a payment the employee was contractually entitled to", "Earnings: taxed in full", "Class 1"],
        ["Post-employment notice pay (PENP): basic pay for any unworked notice, even if the PILON isn't contractual", "Earnings: taxed in full", "Class 1"],
        ["Statutory redundancy pay, and genuine non-contractual compensation for loss of office (the rest of the 'relevant termination award')", "Section 401: first **£30,000** exempt, excess taxable", "Class 1A at 15% on the excess over £30,000"],
        ["Payments on death, injury or disability; employer contributions to a registered pension scheme; legal fees paid direct to the employee's solicitor under a settlement agreement", "Exempt", "None"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The PENP formula (ITEPA 2003 s402D)",
      md: `**PENP = (BP × D ÷ P) − T**

- **BP**: basic pay for the last pay period ending before the trigger date (the date notice is given or, if none, the leaving date). Excludes overtime, bonus, commission, allowances and benefits.
- **D**: calendar days in the post-employment notice period (the minimum notice the employer was required to give, less any notice worked).
- **P**: calendar days in the last pay period.
- **T**: amounts already taxed as earnings in connection with the notice period, such as a contractual PILON.

Where the pay period is a **month** and the unworked notice is a whole number of months, D is the number of months and P is 1, so PENP is simply **monthly basic pay × months of unworked notice**. If the formula gives a negative result, PENP is nil, and it can't exceed the total relevant termination award.`,
    },
    {
      kind: "md",
      md: `### Order of working

1. Pay all **contractual** amounts as normal earnings.
2. Take the **relevant termination award**: the non-contractual payments (compensation, ex gratia, statutory redundancy).
3. Work out **PENP** and treat it as earnings (it comes out of the relevant termination award).
4. The rest of the award is a **section 401** payment: the first **£30,000** is exempt; tax the excess through payroll. The £30,000 is a lifetime figure per employment (aggregated with payments from associated employers for the same termination).
5. Class 1A NIC at **15%** on the s401 excess over £30,000, reported through RTI and paid with the PAYE for the month in which the termination payment was made, not on the P11D(b) in July.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Payroll timing",
      md: `- Paid **before** the P45 is issued: include in the final pay run, taxed with the employee's normal code, cumulatively.
- Paid **after** the P45 is issued: tax with **0T on a week 1/month 1** basis, report on an FPS with the original leaving date, and don't issue another P45.

Either way, show the taxable termination payment in the FPS and the amount over £30,000 in the termination award field so HMRC can calculate Class 1A.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mislabelled settlements",
      md: `A settlement agreement that calls everything "compensation for loss of office" doesn't make it tax-free. If part of it is really **unpaid salary, holiday pay, a contractual bonus or notice pay**, that part is earnings. Ask for the agreement and the contract (particularly the notice and PILON clauses) before you run the payroll.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Employer's position",
      md: `Termination payments made wholly and exclusively for the trade are normally deductible for corporation tax, including the Class 1A. If the business is closing, the deduction for payments over statutory redundancy is restricted, so talk to the tax team before the client agrees a big package on a cessation.`,
    },
  ],
  scenario: {
    title: "A redundancy settlement at Kestrel Marketing Ltd",
    narrative: `**Kestrel Marketing Ltd** makes its account director, **Simon (48)**, redundant after 12 years. He's paid monthly; basic salary **£4,500 a month**. His contract requires **3 months' notice** and has **no PILON clause**. The company tells him on 15 October 2026 that his employment ends that day, with no notice worked.

The settlement agreement provides:
- Salary to 15 October and **£1,200** for untaken holiday
- **Statutory redundancy pay** of **£8,000**
- **£38,000** "compensation for loss of office" (ex gratia)
- **£750** paid directly to Simon's solicitor for advice on the agreement

Everything is paid in the October payroll before the P45 is issued.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Contractual earnings.** Salary to 15 October and the £1,200 holiday pay: normal earnings, tax and Class 1 NIC.

**2. Relevant termination award.** Non-contractual payments: statutory redundancy £8,000 + compensation £38,000 = **£46,000**.

**3. PENP.** Monthly pay, whole months of unworked notice: £4,500 × 3 − T (£0, no contractual PILON) = **£13,500**. Treated as earnings: tax and Class 1 NIC.

**4. Section 401 payment.** £46,000 − £13,500 = **£32,500**. First £30,000 exempt; **£2,500** taxable through payroll.

**5. Class 1A.** £2,500 × 15% = **£375**, paid with the October PAYE (by 22 November 2026).

**6. Legal fees.** £750 paid direct to the solicitor under the settlement agreement: **exempt**.`,
      },
      {
        kind: "table",
        caption: "Simon's October payroll",
        head: ["Element", "Amount", "Tax", "NIC"],
        rows: [
          ["Salary to 15 October + holiday pay", "per payroll + £1,200", "Yes", "Class 1"],
          ["PENP", "£13,500", "Yes", "Class 1"],
          ["s401 award within £30,000", "£30,000", "No", "No"],
          ["s401 award above £30,000", "£2,500", "Yes", "Class 1A £375"],
          ["Legal fees paid to solicitor", "£750", "No", "No"],
        ],
      },
      {
        kind: "md",
        md: `**Why it matters.** If the bookkeeper had treated the whole £46,000 as a termination award, only £16,000 would have been taxed and no Class 1 NIC would have been deducted on the £13,500 PENP: an underpayment HMRC would collect from the company.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "penp-weekly",
      prompt:
        "A weekly-paid employee earns basic pay of £700 a week. Her contract requires 8 weeks' notice (no PILON clause). She is dismissed with no notice worked and receives a £20,000 ex gratia payment. What is the PENP?",
      answer: 5600,
      unit: "£",
      explain: "Use (BP × D ÷ P) − T with the last pay period of 7 days and 56 days of unworked notice.",
      working: "(£700 × 56 ÷ 7) − £0 = **£5,600**",
    },
    {
      kind: "numeric",
      id: "s401-taxable",
      prompt:
        "An employee receives a non-contractual termination package of £52,000 (including statutory redundancy). PENP has been calculated as £10,000. How much of the package is taxable as a section 401 payment?",
      answer: 12000,
      unit: "£",
      explain: "Deduct PENP (taxed as earnings) from the relevant termination award; the first £30,000 of the remainder is exempt.",
      working: "£52,000 − £10,000 PENP = £42,000 s401 award\n\n£42,000 − £30,000 = **£12,000** taxable",
    },
    {
      kind: "numeric",
      id: "class-1a-termination",
      prompt: "Using the previous question, how much Class 1A NIC does the employer pay on the termination award?",
      answer: 1800,
      unit: "£",
      explain: "Class 1A at 15% applies to the s401 amount over £30,000. (PENP gets Class 1 instead.)",
      working: "£12,000 × 15% = **£1,800**",
    },
    {
      kind: "classify",
      id: "classify-package",
      prompt: "Classify each element of a leaving package.",
      categories: ["Earnings (tax + Class 1)", "Section 401 (£30,000 threshold)", "Exempt"],
      items: [
        { text: "Contractual payment in lieu of notice", answer: 0 },
        { text: "Statutory redundancy pay", answer: 1 },
        { text: "Accrued holiday pay", answer: 0 },
        { text: "Lump sum paid because the employee's injury means they can't work", answer: 2 },
        { text: "Ex gratia compensation (after PENP has been taken out)", answer: 1 },
        { text: "Contractual bonus for the year, paid on leaving", answer: 0 },
        { text: "Employer contribution into the employee's registered pension as part of the deal", answer: 2 },
      ],
      explain: "Anything contractual is earnings. Non-contractual compensation (less PENP) uses the £30,000 threshold. Injury/disability payments and pension contributions are exempt.",
    },
    {
      kind: "mcq",
      id: "after-p45",
      prompt: "A termination award is paid two weeks after the P45 was issued. How is the taxable part taxed?",
      options: [
        "Using the employee's last code, cumulatively",
        "Using 0T on a week 1/month 1 basis",
        "At a flat 20% through Self Assessment",
        "It isn't taxed because the employment has ended",
      ],
      answer: 1,
      explain: "Payments after the P45 is issued are taxed on 0T week 1/month 1 and reported with the original leaving date.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "How much of a section 401 termination award is exempt from income tax?",
      options: ["£10,000", "£25,000", "£30,000", "£50,000"],
      answer: 2,
      explain: "The first £30,000.",
    },
    {
      kind: "mcq",
      id: "q-penp-purpose",
      prompt: "What is PENP?",
      options: [
        "The tax-free part of a termination payment",
        "The basic pay the employee would have earned in unworked notice, taxed as earnings even if there's no PILON clause",
        "Pension paid after employment ends",
        "A payment for unused holiday",
      ],
      answer: 1,
      explain: "PENP ensures unworked notice pay is taxed as earnings, whatever the contract says.",
    },
    {
      kind: "mcq",
      id: "q-class1a-when",
      prompt: "When is Class 1A NIC on a termination award over £30,000 paid?",
      options: [
        "By 22 July after the tax year, with the P11D(b)",
        "In real time, with the PAYE for the month the award is paid",
        "It isn't: termination awards have no NIC",
        "Through the employee's Self Assessment",
      ],
      answer: 1,
      explain: "Since April 2020, Class 1A on termination awards is reported through RTI and paid in year.",
    },
    {
      kind: "mcq",
      id: "q-t-element",
      prompt: "In the PENP formula, what does T represent?",
      options: [
        "Total termination package",
        "Amounts already taxed as earnings for the notice period, such as a contractual PILON",
        "Tax deducted",
        "The trigger date",
      ],
      answer: 1,
      explain: "T deducts payments already taxed as earnings in connection with the termination, so they aren't counted twice.",
    },
    {
      kind: "mcq",
      id: "q-legal-fees",
      prompt: "A settlement agreement requires the employer to pay £600 directly to the employee's solicitor for advice on the agreement. How is it treated?",
      options: ["Taxable as earnings", "Part of the £30,000 threshold", "Exempt", "Reported on the P11D"],
      answer: 2,
      explain: "Legal costs paid directly to the employee's lawyer under a settlement agreement are exempt.",
    },
  ],
  sources: [
    { label: "EIM13505: Termination payments and the £30,000 threshold", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim13505" },
    { label: "EIM13880: PENP formula", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim13880" },
    { label: "EIM13874: Post-employment notice pay", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim13874" },
    { label: "Rates and thresholds for employers 2026 to 2027 (Class 1A on termination awards)", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  ],
};
