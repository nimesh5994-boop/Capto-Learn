import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "leavers-p45-and-year-end",
  title: "Leavers, the P45 and payroll year end",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Processing a leaver correctly — final pay, accrued holiday, the leaving date on the FPS, the P45, payments after leaving — and the payroll year-end routine: the final FPS and EPS, P60s, and getting ready for the new tax year.",
  objectives: [
    "Process a leaver's final pay including accrued but untaken statutory holiday",
    "Explain what the P45 is, who gets each part, and how payments after leaving are taxed",
    "List the payroll year-end deadlines: final FPS/EPS, P60, P11D",
    "Describe the start-of-year tasks, including applying new codes and spotting a week 53",
  ],
  body: [
    {
      kind: "md",
      md: `Leavers and year end are where small payroll errors become visible to employees: a missing P45 delays their new job's payroll, a wrong P60 stops a mortgage application, and an unreported leaver stays "live" on HMRC's records and distorts the employee's tax code. Both processes are routine once you follow a checklist.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Processing a leaver",
      md: `1. **Final pay**: salary to the leaving date, overtime and commission due, and **payment in lieu of accrued but untaken holiday**, less any agreed deduction for holiday taken in excess (only if the contract allows it).
2. **Report the leaving date** on the FPS that includes the final payment. If the leaver isn't being paid again, report the leaving date on the next FPS.
3. **Issue the P45** to the employee: Part 1A is the employee's copy; Parts 2 and 3 go to their new employer. The employer doesn't send any part to HMRC: the FPS leaving date does that job.
4. **Stop deductions** that end with employment (e.g. pension, unless a payment after leaving is pensionable), and tell the pension provider.`,
    },
    {
      kind: "md",
      md: `### Accrued holiday on leaving

The Working Time Regulations require payment in lieu of statutory holiday accrued but not taken in the current leave year. A common approach for employees with regular hours:

**(Annual entitlement × proportion of leave year worked) − days already taken = days to pay**

Contracts can give more, and the irregular hours rules (12.07%) apply to irregular-hours and part-year workers, covered in a later lesson. Holiday pay is normal earnings, taxed and NIC'd in the final pay run.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Payments after the P45 has been issued",
      md: `If you have to pay a leaver again after issuing the P45 (a late bonus or overtime, say):
- Deduct tax using code **0T on a week 1/month 1 basis**, whatever code they had before.
- Work out NIC on the payment as earnings of the week (or month) in which it's paid, using the normal thresholds.
- Report it on an FPS with the **original leaving date**, and **don't** issue a second P45.

Payments in connection with termination (redundancy, compensation) follow different rules; see the termination payments lesson.`,
    },
    {
      kind: "table",
      caption: "Payroll year-end deadlines for 2026/27",
      head: ["What", "Deadline", "Notes"],
      rows: [
        ["Final FPS for 2026/27", "On or before the last payday of the year", "Mark it as the final submission; otherwise send a final EPS"],
        ["Final EPS (if needed)", "By 19 April 2027", "Use if the final FPS wasn't flagged final or no one was paid in the last period"],
        ["P60 to every employee employed on 5 April 2027", "By 31 May 2027", "Paper or electronic"],
        ["Statement of payrolled benefits (if payrolling)", "By 31 May 2027", "Tells employees what was taxed through payroll"],
        ["P11D, P11D(b) and Class 1A NIC return", "By 6 July 2027", "Employees get their P11D copy by the same date"],
        ["Class 1A NIC payment", "By 22 July 2027 (19 July by cheque)", "On benefits not payrolled for Class 1A"],
      ],
    },
    {
      kind: "md",
      md: `### Starting the new tax year

- **Apply the new codes.** HMRC sends coding notices (P9) for individual employees and a **P9X** listing any general uplift of codes. If the personal allowance is unchanged (it's £12,570 for 2026/27), L codes carry forward unchanged unless HMRC issues a new code.
- **Clear week 1/month 1 markers** and emergency bases so everyone starts the new year cumulatively, unless HMRC says otherwise.
- **Update rates and thresholds** in the software (most commercial packages do this, but check the NIC thresholds and student loan thresholds match HMRC's table).
- **Check for a week 53** (or 2-week 27, 4-week 14). If a weekly payday falls on 5 April (or 4 April in a leap year), there's a 53rd pay period. Tax for it is worked out on a week 1/month 1 basis using that period's free pay.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Leavers who weren't reported",
      md: `If a leaver isn't reported, HMRC treats them as still employed. Their new employer's code may be set as BR or 0T to stop a second personal allowance, and the client's payroll records won't match HMRC's. If you discover a leaver who left months ago, update the payroll record with the **actual** leaving date: don't report it as leaving in the current period, which can create a duplicate record.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Retain the records",
      md: `Keep payroll records (pay, deductions, P45s, starter checklists, statutory pay evidence) for the **current tax year plus 3 years**. HMRC can ask to see them in a PAYE compliance check.`,
    },
  ],
  scenario: {
    title: "A leaver at Brightwater Dental Lab Ltd",
    narrative: `**Brightwater Dental Lab Ltd** (Plymouth) pays monthly on the 28th. Its holiday year runs from **1 April**. Lena, a technician on £30,000 a year (code 1257L, category A), resigns and her last day is **30 September 2026**.

- Her contract gives **28 days' holiday a year** (including bank holidays) and she's taken **10 days** so far this holiday year.
- The contract defines a day's pay as annual salary ÷ 260.
- In November, after her P45 has been issued, the company finds an unpaid overtime claim of **£250** for September.

The practice manager asks: *"What do we pay her in September, and how do we deal with the overtime?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Accrued holiday.** She worked half the holiday year (April to September, 6 of 12 months). Entitlement accrued = 28 × 6/12 = **14 days**. Taken 10 days, so **4 days** are due.

**2. Day rate.** £30,000 ÷ 260 = **£115.38**. Holiday pay = 4 × £115.38 = **£461.52**.

**3. September pay.** Normal monthly salary £2,500 plus holiday pay £461.52 = **£2,961.52**, taxed with her normal code cumulatively and NIC'd as September's earnings.

**4. Reporting.** The September FPS, sent on or before her final payday of 28 September, includes her leaving date of **30 September 2026**. Issue the **P45** showing her total pay and tax to date in this employment and her code 1257L.`,
      },
      {
        kind: "md",
        md: `**5. The November overtime.** The P45 has been issued, so tax the £250 using **0T month 1**: no free pay, all at 20% = **£50.00** tax. NIC is worked out on the £250 as November's earnings: it's below the monthly primary threshold (£1,048), so no employee NIC, and below the £417 secondary threshold, so **no employer NIC** either. Report it on November's FPS with her original leaving date. No second P45.`,
      },
      {
        kind: "table",
        caption: "Lena's final payments",
        head: ["Payment", "Gross", "Tax basis", "Reported"],
        rows: [
          ["September salary + 4 days' holiday", "£2,961.52", "1257L cumulative", "September FPS with leaving date"],
          ["November overtime", "£250.00", "0T month 1: £50 tax", "November FPS, original leaving date"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "accrued-holiday",
      prompt:
        "An employee's holiday year runs from 1 January. Entitlement is 33 days a year including bank holidays. They leave on 31 August after taking 17 days. Using months worked (8 of 12) as the proportion, how many days' holiday must be paid in lieu?",
      answer: 5,
      tolerance: 0,
      unit: "days",
      explain: "Accrued entitlement is annual entitlement × proportion of the year worked, less days taken.",
      working: "33 × 8/12 = **22** days accrued. 22 − 17 taken = **5 days** to pay.",
    },
    {
      kind: "numeric",
      id: "post-p45-tax",
      prompt:
        "A leaver is paid a £1,200 commission in January 2027, after their P45 was issued in October. How much income tax is deducted (England, monthly payroll)? Use 0T month 1 with the monthly basic rate band of £3,141.67.",
      answer: 240,
      tolerance: 0.01,
      unit: "£",
      explain: "Payments after the P45 is issued use 0T week 1/month 1, so there's no free pay; £1,200 is within the monthly basic rate band.",
      working: "£1,200 × 20% = **£240.00**",
    },
    {
      kind: "classify",
      id: "year-end-deadlines",
      prompt: "Match each year-end task for 2026/27 to its deadline.",
      categories: ["By 19 April 2027", "By 31 May 2027", "By 6 July 2027", "By 22 July 2027"],
      items: [
        { text: "Final EPS for 2026/27 (if the final FPS wasn't marked final)", answer: 0 },
        { text: "Give P60s to employees", answer: 1 },
        { text: "Submit P11Ds and the P11D(b)", answer: 2 },
        { text: "Pay Class 1A NIC electronically", answer: 3 },
        { text: "Give employees their payrolled benefits statement", answer: 1 },
      ],
      explain: "19 April (final EPS), 31 May (P60 and payrolled benefits statement), 6 July (P11D/P11D(b)), 22 July (Class 1A payment, or 19 July by cheque).",
    },
    {
      kind: "mcq",
      id: "p45-parts",
      prompt: "Which part of the P45 does the employer send to HMRC under RTI?",
      options: ["Part 1", "Part 1A", "Parts 2 and 3", "None: the leaving date on the FPS tells HMRC"],
      answer: 3,
      explain: "Under RTI the FPS leaving date tells HMRC. Part 1A is the employee's; Parts 2 and 3 go to the new employer.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-p60",
      prompt: "Who must receive a P60 for 2026/27?",
      options: [
        "Everyone who worked for the employer at any time in the year",
        "Every employee employed on 5 April 2027",
        "Only employees who paid tax",
        "Only employees who ask for one",
      ],
      answer: 1,
      explain: "P60s go to all employees on the payroll at the end of the tax year. Leavers had a P45 instead.",
    },
    {
      kind: "mcq",
      id: "q-post-leaving-code",
      prompt: "A payment is made to a former employee after their P45 was issued. Which code is used?",
      options: ["Their last code, cumulative", "BR", "0T week 1/month 1", "NT"],
      answer: 2,
      explain: "0T on a non-cumulative basis, and the FPS shows the original leaving date.",
    },
    {
      kind: "mcq",
      id: "q-week53",
      prompt: "When does a week 53 arise for a weekly payroll?",
      options: [
        "Every year",
        "When a weekly payday falls on 5 April (or 4 April in a leap year)",
        "Only for monthly payrolls",
        "When the employer has 53 employees",
      ],
      answer: 1,
      explain: "The tax year is 52 weeks and one or two days, so some years have a 53rd weekly payday.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "How long must payroll records be kept?",
      options: ["1 year", "Current tax year plus 3 years", "6 years from the end of employment", "Indefinitely"],
      answer: 1,
      explain: "HMRC requires payroll records to be kept for 3 years from the end of the tax year they relate to.",
    },
    {
      kind: "mcq",
      id: "q-late-leaver",
      prompt: "You discover an employee left 4 months ago but wasn't reported. What should you do?",
      options: [
        "Report them as leaving today",
        "Update the payroll record with the actual leaving date, so it's reported correctly without duplicating the record",
        "Do nothing until year end",
        "Issue a P60",
      ],
      answer: 1,
      explain: "HMRC's guidance is to correct the leaving date in the payroll record; reporting a new leaving date can create a duplicate employment.",
    },
  ],
  sources: [
    { label: "Employee leaving (GOV.UK)", url: "https://www.gov.uk/employee-leaving" },
    { label: "Payroll annual reporting and accounting (GOV.UK)", url: "https://www.gov.uk/payroll-annual-reporting" },
    { label: "Holiday entitlement: calculate leave entitlement (GOV.UK)", url: "https://www.gov.uk/holiday-entitlement-rights/calculate-leave-entitlement" },
    { label: "Correcting your FPS or EPS (GOV.UK)", url: "https://www.gov.uk/payroll-errors/correcting-your-fps-or-eps" },
    { label: "Expenses and benefits deadlines (GOV.UK)", url: "https://www.gov.uk/employer-reporting-expenses-benefits/deadlines" },
    { label: "CWG2: Employer further guide to PAYE and NICs 2026 to 2027", url: "https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions" },
  ],
};
