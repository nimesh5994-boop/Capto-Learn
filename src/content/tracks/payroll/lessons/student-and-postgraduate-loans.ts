import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "student-and-postgraduate-loans",
  title: "Student loan and postgraduate loan deductions",
  level: "practitioner",
  minutes: 25,
  taxYear: "2026/27",
  summary:
    "When to start and stop student and postgraduate loan deductions, which plan applies, the 2026/27 thresholds, and how to calculate the deduction each pay period — including employees with more than one plan.",
  objectives: [
    "Identify the correct plan type (1, 2, 4, 5) and whether a postgraduate loan also applies",
    "Start and stop deductions from the P45, starter checklist and SL1/SL2/PGL1/PGL2 notices",
    "Calculate student and postgraduate loan deductions for a pay period using 2026/27 thresholds",
    "Explain why deductions are non-cumulative and how over-deductions are refunded",
  ],
  body: [
    {
      kind: "md",
      md: `Employers collect student loan repayments through payroll on behalf of the **Student Loans Company (SLC)**, and pay them to HMRC with the PAYE. The employer doesn't need to know the loan balance: it just deducts a percentage of earnings above a threshold until HMRC says stop.`,
    },
    {
      kind: "table",
      caption: "2026/27 repayment thresholds",
      head: ["Plan", "Who typically has it", "Annual", "Monthly", "Weekly", "Rate"],
      rows: [
        ["Plan 1", "English/Welsh students who started before Sept 2012; Northern Ireland students", "£26,900", "£2,241.66", "£517.30", "9%"],
        ["Plan 2", "English/Welsh students who started from Sept 2012 to July 2023", "£29,385", "£2,448.75", "£565.09", "9%"],
        ["Plan 4", "Scottish students", "£33,795", "£2,816.25", "£649.90", "9%"],
        ["Plan 5", "English students starting from Aug 2023 (repayments from April 2026)", "£25,000", "£2,083.33", "£480.76", "9%"],
        ["Postgraduate loan (PGL)", "Master's or doctoral loans (England and Wales)", "£21,000", "£1,750.00", "£403.84", "6%"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Calculating the deduction",
      md: `1. Take the employee's **earnings for Class 1 NIC** for the pay period (gross pay, **before** pension deductions under a net pay arrangement, but after salary sacrifice).
2. Deduct the **period threshold** for their plan.
3. Multiply by **9%** (student loan) or **6%** (postgraduate loan).
4. **Round down** to the whole pound.

Deductions are **non-cumulative**: each pay period stands alone. A month with a bonus can trigger a deduction even if annual pay is below the annual threshold. The employee then claims any over-repayment back from the SLC, not from the employer.`,
    },
    {
      kind: "md",
      md: `### Starting and stopping

**Start** deductions when:
- a new starter's **P45** shows "Y" in the student loan or postgraduate loan box (ask which plan; if they don't know, use Plan 1 until HMRC tells you otherwise);
- the **starter checklist** says they have a loan and haven't finished repaying (it asks them which plan and about postgraduate loans); or
- HMRC sends a **start notice**: **SL1** (student loan) or **PGL1** (postgraduate loan), effective from the next payday on or after the date on the notice.

**Stop** deductions only when HMRC sends a **stop notice** (**SL2** or **PGL2**), or the employee leaves. Never stop because the employee says they've paid off the loan: tell them to contact the SLC, which will instruct HMRC.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "More than one loan",
      md: `- **Student loan + postgraduate loan**: deduct **both** (9% above the plan threshold **and** 6% above the PGL threshold).
- **Two student loan plans** (e.g. Plan 1 and Plan 2): the employer deducts one 9% deduction using the **lowest** threshold of the plans, and the SLC allocates it between the loans. HMRC will send the plan type to use.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Plan 5 is new for 2026/27",
      md: `Plan 5 repayments started in **April 2026**, so this is the first year many payrolls have Plan 5 employees. Check that new graduates' plan type is set correctly. Using Plan 2 instead of Plan 5 under-deducts (higher threshold), which the employee will eventually have to make up.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Payslip queries",
      md: `"Why did you take student loan this month but not last month?" is nearly always a bonus, overtime or a fifth Friday in the month. Explain the non-cumulative rule and point the employee to their SLC online account for refunds and balances.`,
    },
  ],
  scenario: {
    title: "Graduate intake at Fenwick Engineering Ltd",
    narrative: `**Fenwick Engineering Ltd** (Newcastle) pays monthly. Three graduates join in September 2026, all category A, salary **£2,900 a month**, with 5% pension under a **net pay arrangement**:

- **Ali**: graduated in 2026 from an English university, started his degree in **September 2023**. Starter checklist says he has a student loan; he isn't sure of the plan.
- **Hannah**: from Glasgow, studied at a Scottish university. P45 from a summer job shows "Y" for student loan.
- **Josh**: Plan 2 undergraduate loan **and** a postgraduate loan for his master's.

In December, all three receive a **£1,000 bonus**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Plan types.** Ali started in September 2023 in England, so he's **Plan 5** (courses starting from 1 August 2023). If he genuinely didn't know, the default would be Plan 1 until HMRC confirms, but here the start date tells you. Hannah is a Scottish student: **Plan 4**. Josh: **Plan 2 + PGL**.

**Earnings for the calculation.** NIC earnings: the pension under a net pay arrangement **doesn't** reduce them, so use **£2,900** (and £3,900 in December).`,
      },
      {
        kind: "table",
        caption: "Monthly deductions (normal month vs December with bonus)",
        head: ["Employee", "Plan", "Normal month (£2,900)", "December (£3,900)"],
        rows: [
          ["Ali", "Plan 5", "(£2,900 − £2,083.33) × 9% = £73.50 → **£73**", "(£3,900 − £2,083.33) × 9% = £163.50 → **£163**"],
          ["Hannah", "Plan 4", "(£2,900 − £2,816.25) × 9% = £7.54 → **£7**", "(£3,900 − £2,816.25) × 9% = £97.54 → **£97**"],
          ["Josh", "Plan 2", "(£2,900 − £2,448.75) × 9% = £40.61 → **£40**", "(£3,900 − £2,448.75) × 9% = £130.61 → **£130**"],
          ["Josh", "PGL", "(£2,900 − £1,750) × 6% = **£69**", "(£3,900 − £1,750) × 6% = **£129**"],
        ],
      },
      {
        kind: "md",
        md: `Josh pays **£109** a month normally (£40 + £69) and **£259** in December. All deductions go on the FPS in the student loan and postgraduate loan fields and are paid to HMRC with the PAYE by the 22nd.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "plan2-monthly",
      prompt: "An employee on Plan 2 earns £3,200 in a month (NIC earnings). What is the student loan deduction for 2026/27?",
      answer: 67,
      tolerance: 0,
      unit: "£",
      explain: "9% of earnings above the monthly Plan 2 threshold of £2,448.75, rounded down to the whole pound.",
      working: "(£3,200 − £2,448.75) × 9% = £751.25 × 9% = £67.61 → **£67**",
    },
    {
      kind: "numeric",
      id: "plan1-weekly",
      prompt: "A weekly-paid employee on Plan 1 earns £600 in a week. What is the student loan deduction?",
      answer: 7,
      tolerance: 0,
      unit: "£",
      explain: "9% above the weekly Plan 1 threshold of £517.30, rounded down.",
      working: "(£600 − £517.30) × 9% = £82.70 × 9% = £7.44 → **£7**",
    },
    {
      kind: "numeric",
      id: "pgl-and-plan2",
      prompt:
        "An employee has a Plan 2 loan and a postgraduate loan. Monthly NIC earnings are £3,500. What is the **total** deduction for both loans?",
      answer: 199,
      tolerance: 0,
      unit: "£",
      explain: "Both deductions are made: 9% above the Plan 2 threshold and 6% above the PGL threshold, each rounded down.",
      working: "Plan 2: (£3,500 − £2,448.75) × 9% = £94.61 → £94\n\nPGL: (£3,500 − £1,750) × 6% = £105.00 → £105\n\nTotal **£199**",
    },
    {
      kind: "mcq",
      id: "employee-says-stop",
      prompt: "An employee says they've just paid off their loan and asks you to stop deductions. What do you do?",
      options: [
        "Stop deductions from the next payday",
        "Keep deducting until HMRC sends a stop notice (SL2), and tell the employee to contact the SLC",
        "Refund this year's deductions",
        "Switch them to Plan 5",
      ],
      answer: 1,
      explain: "Only an HMRC stop notice (SL2/PGL2) authorises stopping. Over-repayments are refunded by the SLC.",
    },
    {
      kind: "mcq",
      id: "pension-effect-sl",
      prompt:
        "An employee earns £3,000 a month and pays 5% (£150) to a net pay arrangement pension. Which figure is used for the student loan calculation?",
      options: ["£2,850", "£3,000", "£3,150", "Taxable pay after the personal allowance"],
      answer: 1,
      explain: "Student loan deductions are based on earnings for Class 1 NIC, which aren't reduced by net pay pension contributions.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-plan2-threshold",
      prompt: "What is the annual Plan 2 repayment threshold for 2026/27?",
      options: ["£26,900", "£28,470", "£29,385", "£33,795"],
      answer: 2,
      explain: "£29,385 (£2,448.75 a month).",
    },
    {
      kind: "mcq",
      id: "q-pgl-rate",
      prompt: "At what rate are postgraduate loan repayments deducted?",
      options: ["9%", "6%", "8%", "3%"],
      answer: 1,
      explain: "6% above the £21,000 annual threshold.",
    },
    {
      kind: "mcq",
      id: "q-basis",
      prompt: "Student loan deductions are calculated:",
      options: ["Cumulatively from 6 April", "Separately for each pay period", "Annually at the year end", "On taxable pay"],
      answer: 1,
      explain: "They're non-cumulative, on NIC earnings for the period.",
    },
    {
      kind: "mcq",
      id: "q-scottish",
      prompt: "A student from Scotland who studied at a Scottish university has which plan?",
      options: ["Plan 1", "Plan 2", "Plan 4", "Plan 5"],
      answer: 2,
      explain: "Plan 4 is for Scottish student loans.",
    },
    {
      kind: "mcq",
      id: "q-start-notice",
      prompt: "Which HMRC notice tells an employer to start postgraduate loan deductions?",
      options: ["SL1", "SL2", "PGL1", "P6"],
      answer: 2,
      explain: "PGL1 starts postgraduate loan deductions; PGL2 stops them. SL1/SL2 are for student loans.",
    },
  ],
  sources: [
    { label: "Collecting student loan repayments: employer guide (GOV.UK)", url: "https://www.gov.uk/guidance/special-rules-for-student-loans" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Repaying your student loan: which repayment plan you're on (GOV.UK)", url: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
  ],
};
