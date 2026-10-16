import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "pension-tax-relief-net-pay-vs-relief-at-source",
  title: "Tax relief on pension contributions: net pay versus relief at source",
  level: "foundation",
  minutes: 30,
  summary:
    "How the two methods of giving income tax relief on employee pension contributions work, why the low-earner 'net pay anomaly' arises and how HMRC's top-up payments address it, and how higher- and additional-rate taxpayers claim the extra relief.",
  objectives: [
    "Explain the mechanics of the net pay arrangement and relief at source",
    "Calculate the cost of a gross contribution to a basic-rate and higher-rate taxpayer under each method",
    "Identify who loses out under net pay and the HMRC top-up for low earners",
    "State the limit on contributions that attract tax relief",
    "Explain how higher-rate relief is claimed",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Employee contributions to a registered pension scheme get **income tax relief**, but the method depends on how the scheme is set up. The payroll treatment, the figure on the payslip and the final tax position differ, so you need to know which method a client's scheme uses before you process contributions or answer a worker's question.`,
    },
    {
      kind: "table",
      caption: "The two methods compared",
      head: ["", "Net pay arrangement", "Relief at source (RAS)"],
      rows: [
        ["How it works", "Employer deducts the contribution from gross pay **before** calculating PAYE", "Employee pays 80% of the gross contribution from net pay; the provider claims **20%** from HMRC"],
        ["Typical schemes", "Many occupational and some workplace schemes", "Many personal pensions, SIPPs and workplace schemes such as NEST"],
        ["Relief given", "At the worker's **marginal rate** through PAYE", "20% automatically; higher-rate and additional-rate workers claim the extra"],
        ["Payslip", "Taxable pay is lower than gross pay", "Taxable pay equals gross pay; the pension deduction is **net** (80%)"],
        ["Low earner under the personal allowance", "No income tax so **no relief** (the 'net pay anomaly'); HMRC makes top-up payments for 2024/25 and later years", "Still receives the 20% top-up"],
        ["NIC", "No NIC saving", "No NIC saving"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Limits on tax-relievable contributions",
      md: `Personal (employee) contributions get tax relief up to the **higher of 100% of relevant UK earnings** for the year and **£3,600 gross (£2,880 net)** if the individual has little or no earnings. Employer contributions aren't limited by earnings but by the **annual allowance** (£60,000 for 2026/27, see later lessons). A member can contribute more than their earnings, but the excess gets no tax relief.`,
    },
    {
      kind: "md",
      md: `### Relief at higher rates

- **Net pay:** the relief is automatic at the marginal rate because it comes off the gross pay before PAYE. A 40% taxpayer paying £1,000 gross reduces their cost to £600 with no further action.
- **Relief at source:** the provider claims 20%. A higher-rate taxpayer must claim the **additional relief** (20% more at 40%, 25% more at 45%) by **Self Assessment** (box on the return) or by asking HMRC to adjust the **tax code**. A **basic-rate extension** applies to the band: the basic-rate band is extended by the gross contribution.
- **Scottish taxpayers:** under net pay the relief is at the worker's marginal Scottish rate through PAYE. Under RAS the provider still claims 20%, and any relief above that for taxpayers paying Scottish rates higher than 20% is claimed from HMRC, so check HMRC's guidance on Scottish rates before advising.

### The net pay anomaly

A worker earning **below the personal allowance** (£12,570) pays no income tax, so a net pay scheme gives **no relief** at all, while the same worker under RAS receives a 20% top-up. HMRC now makes an **annual top-up payment** to eligible low earners in net pay schemes for **2024/25 onwards**. HMRC identifies eligible people from its own records and, in the tax year after the contribution was paid, contacts them to confirm bank details so the top-up can be paid directly.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Check the scheme basis before you run payroll",
      md: `Ask the provider which method is used. Get it wrong and you will either over-deduct tax or deduct the pension net when it should have been taken gross. For RAS schemes the **employer** deducts the **net (80%) amount** and pays it to the provider; for net pay you deduct the **gross** amount.`,
    },
  ],
  scenario: {
    title: "A 5% contribution for two Harbour Logistics employees",
    narrative: `Harbour Logistics Ltd has two employees in a scheme with a 5% employee contribution on qualifying earnings (band £6,240 to £50,270). Ben earns **£30,000** and is a basic-rate taxpayer. Layla earns **£11,000** (below the £12,570 personal allowance). The company's scheme will use either net pay or relief at source.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: contribution amounts.**
- Ben: qualifying earnings £30,000 − £6,240 = £23,760; 5% = **£1,188** gross per year.
- Layla: £11,000 − £6,240 = £4,760; 5% = **£238** gross per year.

**Step 2: Ben, a basic-rate taxpayer.**
- **Net pay:** £1,188 is deducted before PAYE. Tax saving = £1,188 × 20% = **£237.60**; he pays **£950.40** net.
- **RAS:** he pays 80% × £1,188 = **£950.40**, and the provider claims £237.60 from HMRC. The cost to Ben is the same.

**Step 3: Layla, below the personal allowance.**
- **Net pay:** no tax is saved, so her gross contribution costs **£238** (HMRC may pay a top-up later).
- **RAS:** she pays 80% × £238 = **£190.40**; the provider claims £47.60. She is **£47.60 better off** than under net pay.

**Step 4: tell the client.** If Layla and others like her are in a net pay scheme, point them to HMRC's low-earner top-up letters, and suggest the client considers whether a RAS scheme would be better for low-paid staff.`,
      },
      {
        kind: "journal",
        title: "Net pay: monthly deduction for Ben (£1,188 ÷ 12 = £99)",
        narrative: "The pension is deducted from gross pay before tax. Shown as a liability due to the scheme with the employer's 3% in a separate entry. Simplified: PAYE and NIC deductions are left out, so 'net wages payable' here is before those deductions.",
        lines: [
          { account: "Gross wages", dr: 2500 },
          { account: "Pension creditor (scheme)", cr: 99 },
          { account: "Net wages payable", cr: 2401 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "net-cost-higher",
      prompt: "A 40% taxpayer in a net pay scheme has £2,000 gross deducted from salary. What is the net cost to the employee after income tax relief (£)? Ignore NIC.",
      answer: 1200,
      unit: "£",
      explain: "Net pay gives relief at the marginal rate.",
      working: "£2,000 × (1 − 40%) = **£1,200**.",
    },
    {
      kind: "numeric",
      id: "ras-net",
      prompt: "In a relief at source scheme the gross contribution is £1,500. How much does the employee actually pay from net pay (£)?",
      answer: 1200,
      unit: "£",
      explain: "The employee pays 80%; the provider claims 20% from HMRC.",
      working: "£1,500 × 80% = **£1,200**.",
    },
    {
      kind: "numeric",
      id: "extra-relief",
      prompt: "A 40% taxpayer in a relief at source scheme makes a gross contribution of £5,000. How much additional higher-rate relief can they claim via Self Assessment (£)?",
      answer: 1000,
      unit: "£",
      explain: "The provider already claimed 20%; the extra is 20% more.",
      working: "£5,000 × (40% − 20%) = **£1,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-anomaly",
      prompt: "Who is hurt by the 'net pay anomaly'?",
      options: ["Higher-rate taxpayers", "Low earners below the personal allowance in net pay schemes", "Employers", "Non-UK residents"],
      answer: 1,
      explain: "They pay no income tax so get no relief through net pay, unlike RAS.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-limit",
      prompt: "Personal contributions get tax relief up to the higher of 100% of earnings and…",
      options: ["£2,880 gross", "£3,600 gross", "£10,000", "£60,000"],
      answer: 1,
      explain: "£3,600 gross (£2,880 net) for those with little or no earnings.",
    },
    {
      kind: "mcq",
      id: "q-ras-claim",
      prompt: "In relief at source, who claims the 20% from HMRC?",
      options: ["The employer", "The pension provider", "The employee", "TPR"],
      answer: 1,
      explain: "The provider claims it and adds it to the pot.",
    },
    {
      kind: "mcq",
      id: "q-nic",
      prompt: "Do employee pension contributions made under net pay reduce National Insurance?",
      options: ["Yes", "No: NIC is calculated on gross pay", "Only for higher earners", "Only for directors"],
      answer: 1,
      explain: "Only salary sacrifice saves NIC. Ordinary net pay does not.",
    },
    {
      kind: "mcq",
      id: "q-higher",
      prompt: "A higher-rate taxpayer in a RAS scheme gets the extra relief by…",
      options: ["Automatically through PAYE", "Self Assessment or a tax code adjustment", "Asking the employer", "Not possible"],
      answer: 1,
      explain: "They must claim it.",
    },
    {
      kind: "mcq",
      id: "q-topup",
      prompt: "HMRC top-up payments for low earners in net pay schemes apply from which tax year?",
      options: ["2019/20", "2022/23", "2024/25", "2027/28"],
      answer: 2,
      explain: "2024/25 onwards, paid in the following years.",
    },
  ],
  sources: [
    { label: "Tax relief on pension contributions – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
    { label: "Pensions relief relating to net pay arrangements – GOV.UK", url: "https://www.gov.uk/government/publications/low-earners-anomaly-pensions-relief-relating-to-net-pay-arrangements/pensions-relief-relating-to-net-pay-arrangements" },
    { label: "Workplace pensions – GOV.UK", url: "https://www.gov.uk/workplace-pensions" },
    { label: "Finance Act 2004 Part 4 – pension schemes", url: "https://www.legislation.gov.uk/ukpga/2004/12/part/4" },
  ],
};
