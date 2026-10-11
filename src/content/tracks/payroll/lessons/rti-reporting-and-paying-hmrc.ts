import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "rti-reporting-and-paying-hmrc",
  title: "RTI: the FPS, the EPS and paying HMRC",
  level: "foundation",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "The monthly payroll compliance cycle: what goes on a Full Payment Submission and when, what the Employer Payment Summary is for, how to work out and pay the PAYE bill by the 22nd, and the penalties for filing or paying late.",
  objectives: [
    "State the FPS deadline and the main exceptions where it can be sent after payday",
    "Identify what must be reported on an EPS and its deadline",
    "Calculate the amount payable to HMRC for a tax month after statutory pay recovery and Employment Allowance",
    "Explain late filing and late payment penalties for PAYE",
  ],
  body: [
    {
      kind: "md",
      md: `Under **Real Time Information (RTI)** the employer reports payroll to HMRC every time staff are paid, and HMRC builds up the PAYE bill from those reports. There are two main returns:

- **Full Payment Submission (FPS):** details of every employee paid, their pay and deductions, and year-to-date totals.
- **Employer Payment Summary (EPS):** adjustments to what the employer owes that don't belong to any one employee, such as statutory pay recovered or Employment Allowance claimed, or telling HMRC nobody was paid.

Payment is then due for each **tax month**, which runs from the **6th of one month to the 5th of the next** (tax month 1 is 6 April to 5 May).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "FPS deadline",
      md: `Send the FPS **on or before** the date employees are paid, the contractual payday, not the date the software is run. Include everyone paid in that pay run, and new starters and leavers.

Main exceptions when it can go later:
- Payday is a **weekend or bank holiday**: send by the next banking day, with the normal payment date and late-reporting reason.
- **New employer** waiting for its PAYE reference: send as soon as possible after it arrives (reason G).
- Pay that genuinely **can't be calculated in advance** (e.g. piecework) and casual staff paid under £96 a week with no P45: within **7 days** of paying.
- **Ad hoc** one-off payments outside the normal run: on the next regular FPS or an additional FPS.

Every late FPS must include a **late reporting reason**.`,
    },
    {
      kind: "table",
      caption: "What goes on an EPS (send by the 19th of the following tax month to affect that month's bill)",
      head: ["Report on EPS", "Why"],
      rows: [
        ["Statutory pay recovered (SMP, SPP, SAP, ShPP, SPBP, SNCP) and NIC compensation", "Reduces the PAYE bill"],
        ["Employment Allowance claim (once per tax year, or when you stop being eligible)", "Offsets employer NIC"],
        ["CIS deductions suffered (limited companies that are also subcontractors)", "Offsets the PAYE bill"],
        ["Apprenticeship Levy (if pay bill over £3 million)", "Adds to the bill"],
        ["No employees paid in the tax month (or for a future period)", "Stops HMRC estimating a bill"],
        ["Final submission for the tax year, or scheme ceased", "Closes the year or the scheme"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Paying HMRC",
      md: `- **Monthly**: by the **22nd** after the end of the tax month if paying electronically (e.g. 22 June for tax month 2, 6 May to 5 June); by the **19th** if paying by cheque through the post.
- If the 22nd falls on a weekend or bank holiday, cleared funds must reach HMRC by the last working day before it (unless using Faster Payments, which arrive the same or next day).
- **Quarterly**: allowed if the employer reasonably expects its average monthly payments to be **under £1,500**. Due by the 22nd after each quarter (e.g. 22 July for 6 April to 5 July). Reporting stays on every payday.
- Use the **Accounts Office reference** plus the year and month digits so the payment goes to the right period.`,
    },
    {
      kind: "md",
      md: `### Working out the bill

The amount for a tax month is:

**Income tax + employee NIC + employer NIC + student and postgraduate loan deductions**, from every FPS with a payment date in that tax month,
**less** statutory pay recovery, NIC compensation and CIS deductions suffered, and Employment Allowance used (all from the EPS).

Your payroll software's P32 report (employer payment record) shows this calculation. Always reconcile it to the HMRC online account before paying. A difference usually means an FPS or EPS didn't reach HMRC, or was sent with the wrong date.`,
    },
    {
      kind: "table",
      caption: "Late filing penalties (FPS), per month in which a return was late",
      head: ["Number of employees", "Monthly penalty"],
      rows: [
        ["1 to 9", "£100"],
        ["10 to 49", "£200"],
        ["50 to 249", "£300"],
        ["250 or more", "£400"],
      ],
    },
    {
      kind: "md",
      md: `- **No penalty** for the **first** late filing in a tax year, if the FPS is late but every payment on it is **within 3 days** of payday (although HMRC may still act on persistent 3-day lateness), or for a new employer whose first FPS is sent within **30 days** of first paying someone.
- **Late payment penalties** are based on the number of late payments ("defaults") in the tax year. The **first** late payment doesn't count as a default. Then the penalty is **1%** of the late amounts for 1–3 defaults, **2%** for 4–6, **3%** for 7–9 and **4%** for 10 or more. A further **5%** applies if an amount is still unpaid after **6 months**, and another 5% after **12 months**.
- **Interest** runs on late payments from the due date, on top of any penalty.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Months with no pay run",
      md: `If a client (often a director-only company paying quarterly or annually) runs no payroll in a tax month, send an **EPS showing no employees paid**. Without it HMRC may **estimate a charge** and start chasing for it, and can charge a late filing penalty because no FPS was received.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A monthly payroll calendar",
      md: `Run the payroll a few days before payday → client approves → send the FPS **on or before payday** → send any EPS **by the 19th** → client pays **by the 22nd**. Put the P32 total and the payment reference in the client's email so they pay the right amount to the right reference.`,
    },
  ],
  scenario: {
    title: "The September PAYE bill for Harbourside Bakery Ltd",
    narrative: `**Harbourside Bakery Ltd** in Whitby has 14 employees paid monthly on the last Friday. Payday for tax month 6 (6 September to 5 October 2026) is Friday 25 September. The payroll summary for September shows:

| Item | Amount |
|---|---:|
| Income tax | £4,820.00 |
| Employee NIC | £1,610.00 |
| Employer NIC | £2,950.00 |
| Student loan deductions | £185.00 |
| SMP paid to one employee on maternity leave | £800.00 |

The company's total Class 1 NIC for 2025/26 was well under £45,000, so it recovers **109%** of SMP. It claimed **Employment Allowance** in April and £8,400 of the £10,500 has been used in months 1–5.

The director, Tom, asks: *"How much do I pay and by when?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Deadlines.** The FPS must go on or before **Friday 25 September**. Any EPS (here, to claim the SMP recovery) by **19 October**. Payment by **22 October 2026** (a Thursday) if paid electronically.

**2. Gross liabilities** from the FPS: £4,820 + £1,610 + £2,950 + £185 = **£9,565.00**.

**3. SMP recovery**: £800 × 109% = **£872.00**. For a small employer the 109% is the full 100% of the SMP plus 9% compensation for the employer NIC paid on it.

**4. Employment Allowance**: £10,500 − £8,400 = £2,100 left. Employer NIC this month is £2,950, so only **£2,100** can be offset, and the allowance is then used up for the year.`,
      },
      {
        kind: "table",
        caption: "Amount due for tax month 6",
        head: ["Item", "Amount"],
        rows: [
          ["Tax, NIC and student loans from the FPS", "£9,565.00"],
          ["Less SMP recovered (109%)", "(£872.00)"],
          ["Less Employment Allowance (balance remaining)", "(£2,100.00)"],
          ["**Payable to HMRC by 22 October**", "**£6,593.00**"],
        ],
      },
      {
        kind: "md",
        md: `**5. Penalty exposure.** With 14 employees, a late FPS would risk a **£200** penalty each month it happens (after the first default of the year). Paying late would count as a default; this is the company's first late payment of the year, so it wouldn't attract a percentage penalty yet, but interest would run.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "month-bill",
      prompt:
        "For tax month 3 a client's FPS shows tax £2,140, employee NIC £780, employer NIC £1,420 and postgraduate loan deductions £60. It recovers SPP of £400 at 92% and its Employment Allowance was fully used in month 1. How much is payable to HMRC?",
      answer: 4032,
      unit: "£",
      explain: "Add up all deductions and employer NIC, then take off statutory pay recovered. No Employment Allowance remains.",
      working: "£2,140 + £780 + £1,420 + £60 = £4,400\n\nSPP recovery £400 × 92% = £368\n\n£4,400 − £368 = **£4,032**",
    },
    {
      kind: "mcq",
      id: "payment-date",
      prompt: "Payday is 15 November 2026. By what date must the PAYE for that pay run be paid electronically?",
      options: ["5 December 2026", "19 December 2026", "22 December 2026", "22 November 2026"],
      answer: 2,
      explain:
        "15 November falls in tax month 8 (6 November to 5 December). Payment is due by the 22nd after the tax month ends: 22 December. The 19th is the cheque deadline.",
    },
    {
      kind: "numeric",
      id: "late-filing-penalty",
      prompt:
        "A client with 52 employees files its FPS late in July and again in September 2026 (no valid reason, more than 3 days late). July was its first late filing of the tax year. What is the total late filing penalty for those two months?",
      answer: 300,
      unit: "£",
      explain: "The first failure in a tax year is free. The second attracts the penalty for 50–249 employees.",
      working: "July: first failure → £0. September: 50–249 employees → **£300**.",
    },
    {
      kind: "classify",
      id: "fps-or-eps",
      prompt: "Which return do you use?",
      categories: ["FPS", "EPS"],
      items: [
        { text: "Reporting a new starter's first pay", answer: 0 },
        { text: "Claiming Employment Allowance for 2026/27", answer: 1 },
        { text: "Telling HMRC no employees were paid in tax month 9", answer: 1 },
        { text: "Reporting a leaver's leaving date and final pay", answer: 0 },
        { text: "Recovering SMP paid this month", answer: 1 },
        { text: "Reporting a bonus paid in the normal pay run", answer: 0 },
      ],
      explain: "Anything about an individual's pay goes on the FPS. Employer-level adjustments and 'no payment' notices go on the EPS.",
    },
    {
      kind: "mcq",
      id: "defaults",
      prompt:
        "By December 2026 an employer has paid its PAYE late in four separate months of the tax year. How many of those count as defaults for the late payment penalty, and at what rate?",
      options: ["4 defaults, 2%", "3 defaults, 1%", "4 defaults, 1%", "None: penalties only start after 6 months"],
      answer: 1,
      explain: "The first late payment in the tax year doesn't count as a default, so four late payments are three defaults: 1% band (1–3 defaults).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-fps-deadline",
      prompt: "When must an FPS normally be sent?",
      options: ["By the 19th of the next month", "On or before the payday", "Within 14 days of payday", "By the 22nd of the next tax month"],
      answer: 1,
      explain: "The FPS is due on or before the contractual payday.",
    },
    {
      kind: "mcq",
      id: "q-eps-deadline",
      prompt: "To reduce a tax month's bill, the EPS must reach HMRC by:",
      options: ["The 5th of the next month", "The 19th of the following tax month", "The 22nd of the following tax month", "The end of the tax year"],
      answer: 1,
      explain: "An EPS sent by the 19th is reflected in that month's payment due on the 22nd.",
    },
    {
      kind: "mcq",
      id: "q-tax-month",
      prompt: "Tax month 1 runs from:",
      options: ["1 April to 30 April", "6 April to 5 May", "6 April to 30 April", "1 May to 31 May"],
      answer: 1,
      explain: "Tax months run from the 6th to the 5th.",
    },
    {
      kind: "mcq",
      id: "q-quarterly",
      prompt: "Which employers can pay PAYE quarterly?",
      options: [
        "Any employer with under 10 staff",
        "Employers who expect average monthly payments under £1,500",
        "Only director-only companies",
        "Employers using Basic PAYE Tools",
      ],
      answer: 1,
      explain: "The test is an expected average monthly payment under £1,500. Reporting still happens every payday.",
    },
    {
      kind: "mcq",
      id: "q-penalty-small",
      prompt: "What is the monthly late filing penalty for an employer with 1–9 employees (after the first failure)?",
      options: ["£100", "£200", "£300", "£400"],
      answer: 0,
      explain: "£100 for 1–9 employees, rising to £400 for 250 or more.",
    },
    {
      kind: "mcq",
      id: "q-no-pay",
      prompt: "A director-only company pays salary quarterly. What should it send in the months with no pay run?",
      options: ["Nothing", "An FPS with nil pay", "An EPS showing no employees were paid", "A P32"],
      answer: 2,
      explain: "A 'no payment' EPS stops HMRC estimating a charge or issuing penalties for a missing FPS.",
    },
  ],
  sources: [
    { label: "Running payroll: reporting to HMRC (GOV.UK)", url: "https://www.gov.uk/running-payroll" },
    { label: "Sending an FPS after payday (GOV.UK)", url: "https://www.gov.uk/running-payroll/fps-after-payday" },
    { label: "Pay employers' PAYE (GOV.UK)", url: "https://www.gov.uk/pay-paye-tax" },
    { label: "What happens if you don't report payroll information on time", url: "https://www.gov.uk/what-happens-if-you-dont-report-payroll-information-on-time" },
    { label: "Late payment penalties for PAYE and National Insurance", url: "https://www.gov.uk/guidance/what-happens-if-you-dont-pay-paye-and-national-insurance-on-time" },
    { label: "DMBM519315: PAYE RTI payment frequency", url: "https://www.gov.uk/hmrc-internal-manuals/debt-management-and-banking/dmbm519315" },
  ],
};
