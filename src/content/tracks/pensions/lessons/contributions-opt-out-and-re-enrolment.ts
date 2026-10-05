import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "contributions-opt-out-and-re-enrolment",
  title: "Minimum contributions, opting out, refunds and re-enrolment",
  level: "foundation",
  minutes: 30,
  summary:
    "The 8% minimum total contribution (3% from the employer), how contributions are calculated, the one-month opt-out window and refunds, the ban on inducing opt-outs, and how re-enrolment brings opted-out workers back every three years.",
  objectives: [
    "Calculate minimum employer and employee contributions on qualifying earnings",
    "Explain the opt-out window, what must be refunded and what happens afterwards",
    "Describe the offences around inducing a worker to opt out",
    "Explain opt-in, joining and re-enrolment, and what the employer must do each time",
    "Spot common payroll errors in contributions",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Enrolling a worker triggers contributions. The legal minimum is set as a percentage of **qualifying earnings** (or a scheme's own certified earnings basis). The worker then has a **one-month window** to opt out and get their money back, and employers must repeat the enrolment exercise every three years for those who have left the scheme.`,
    },
    {
      kind: "table",
      caption: "Minimum total contribution (in force since April 2019; unchanged for 2026/27)",
      head: ["", "Employer", "Employee", "Total"],
      rows: [
        ["Minimum % of qualifying earnings", "3%", "5%", "8%"],
        ["Note", "The employer's 3% can't be reduced if the employee pays more", "Includes tax relief (basic rate 20%)", "Employers may agree higher rates; the legal minimum is only a floor"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Opting out (Pensions Act 2008 ss8, 9)",
      md: `- A worker who has been automatically enrolled (or re-enrolled) has a **one-month opt-out period**, starting on the **later** of the date they become an active member and the date they receive the enrolment information.
- To opt out the worker must give a **valid opt-out notice** obtained from the **pension provider**, not from the employer; an employer can't supply a form of its own for this purpose.
- If the worker opts out within the window, they are treated as if they had **never joined**: the **employee's contributions are refunded** (normally within one month) and the **employer's contributions** are returned to the employer. No tax relief is retained.
- If the worker opts out **after** the window, they simply **stop contributing**; no refund is due, and the contributions already paid stay in the pension.
- It is a **criminal offence** and a breach of the legislation to **induce or encourage** a worker to opt out (by words or acts, or by taking action that has that effect) or to treat a worker unfairly for staying in. Employers must not tell a worker that opting out is "better for them".`,
    },
    {
      kind: "md",
      md: `### Opting in and joining

- A **non-eligible jobholder** (16–21, or State Pension age to 74, or earning between £6,240 and £10,000) can give an **opt-in notice**; the employer must enrol them and pay the 3% minimum.
- An **entitled worker** (earnings £6,240 or less) can ask to **join**; the employer must put them in a scheme but doesn't have to contribute.
- The statutory opt-out and refund rules are designed for **automatic** (and re-)enrolment. A worker who chose to join can leave under the scheme's own rules.

### Re-enrolment

Every **three years** the employer must put back into the scheme any eligible jobholder who has **opted out** or **ceased active membership** since the last enrolment. The new enrolment date is chosen within a window of **six months before to six months after** the third anniversary of the duties start date (or the previous re-enrolment date). The worker again gets the opt-out window. **Re-declaration** to TPR follows within five months.

Payroll software normally flags the workers, but **check** that the system has:
- picked up those who opted out three years ago and are still eligible;
- ignored workers who have opted in or are members of a qualifying scheme;
- applied the right earnings band.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Payroll errors that become TPR problems",
      md: `- Deducting contributions but **not paying them** to the scheme (or paying late) is a serious breach and must be reported.
- Calculating on **total pay** when the scheme uses qualifying earnings (or the reverse) without checking the scheme basis.
- Continuing deductions after an effective opt-out notice or **refunding the wrong amount**.
- **Backdated enrolment** after a late assessment: contributions are owed from the date the duty arose, and the employer must make up the **employer** share; HMRC and TPR both expect the correction to be made.
- Treating a **salary increase** as irrelevant: a pay rise may take a non-eligible jobholder over the trigger and into automatic enrolment.`,
    },
  ],
  scenario: {
    title: "Contributions and an opt-out at Delmar Tools Ltd",
    narrative: `Delmar Tools Ltd enrols Ruth (aged 38, £2,000 monthly pay) on 1 September 2026 using a scheme based on qualifying earnings (monthly band £520–£4,189). She receives the enrolment information on 3 September. On 20 September she hands in a valid opt-out notice obtained from the scheme provider. A second employee, Tom (aged 52, £3,500 a month), stays in.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: contributions at enrolment.**
- Ruth: qualifying earnings £2,000 − £520 = **£1,480**. Employer 3% = **£44.40**; employee 5% = **£74.00** (total £118.40).
- Tom: £3,500 − £520 = **£2,980**. Employer 3% = **£89.40**; employee 5% = **£149.00**.

**Step 2: Ruth's opt-out.** She is within the one-month window (her window runs from 3 September, the later date, to 2 October). She is treated as never having joined. Ruth's **£74.00** is refunded to her and the employer's £44.40 is reclaimed from the scheme.
**Step 3: payroll.** Remove the deduction from the next payroll, record the refund, and keep the opt-out notice for four years.

**Step 4: diary.** Ruth will be re-enrolled at the next three-year re-enrolment date if she is still an eligible jobholder. She may opt out again.

**Step 5: don't encourage it.** If Ruth had asked the payroll clerk "should I opt out?", the correct answer is that she must make her own decision and that the employer cannot influence it.`,
      },
      {
        kind: "journal",
        title: "Recording the employer's pension cost for Tom (month 1)",
        narrative: "Employer 3% = £89.40; the employee share £149.00 is deducted from his pay and paid over with it.",
        lines: [
          { account: "Employer pension contributions", dr: 89.4 },
          { account: "Pension creditor (scheme)", cr: 89.4 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "employer-minimum",
      prompt: "An employee earns £2,500 a month. Using the monthly band £520 to £4,189, what is the employer's minimum monthly contribution at 3% (£)? Give the answer to the nearest penny.",
      answer: 59.4,
      tolerance: 0.01,
      unit: "£",
      explain: "3% of qualifying earnings.",
      working: "£2,500 − £520 = £1,980 × 3% = **£59.40**.",
    },
    {
      kind: "numeric",
      id: "total-contribution",
      prompt: "An employee earns £3,000 a month. What is the total minimum contribution (employer + employee, 8%) on qualifying earnings (£)? Monthly band £520 to £4,189.",
      answer: 198.4,
      tolerance: 0.01,
      unit: "£",
      explain: "8% of qualifying earnings.",
      working: "£3,000 − £520 = £2,480 × 8% = **£198.40**.",
    },
    {
      kind: "classify",
      id: "classify-optout",
      prompt: "Is the statement true?",
      categories: ["True", "False"],
      items: [
        { text: "A worker who opts out within one month gets their contributions refunded", answer: 0 },
        { text: "The employer can give the worker an opt-out form of its own design", answer: 1, why: "The opt-out notice must come from the pension provider." },
        { text: "Telling a worker 'you'd be better off opting out' is allowed if it's true", answer: 1, why: "Inducing opt-out is prohibited." },
        { text: "A worker who opts out in month three gets a refund", answer: 1, why: "Outside the one-month window: contributions stop but remain in the pension." },
      ],
      explain: "The window is one month; the notice comes from the provider; employers must not encourage opt-outs.",
    },
    {
      kind: "mcq",
      id: "mcq-reenrolment",
      prompt: "How often must opted-out eligible jobholders be re-enrolled?",
      options: ["Annually", "Every 2 years", "Every 3 years", "Never"],
      answer: 2,
      explain: "At least every three years.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-employer-min",
      prompt: "What is the minimum employer contribution rate?",
      options: ["1%", "3%", "5%", "8%"],
      answer: 1,
      explain: "3% of qualifying earnings.",
    },
    {
      kind: "mcq",
      id: "q-total",
      prompt: "What is the minimum total contribution?",
      options: ["5%", "6%", "8%", "10%"],
      answer: 2,
      explain: "8% in total.",
    },
    {
      kind: "mcq",
      id: "q-window",
      prompt: "How long is the opt-out window?",
      options: ["One week", "One month", "Three months", "Six months"],
      answer: 1,
      explain: "One month from the later of membership and receipt of information.",
    },
    {
      kind: "mcq",
      id: "q-refund",
      prompt: "A worker opts out in time. What happens to the employer's contribution?",
      options: ["Kept by the scheme", "Refunded to the employer", "Paid to the worker", "Paid to HMRC"],
      answer: 1,
      explain: "Employer contributions are returned to the employer.",
    },
    {
      kind: "mcq",
      id: "q-notice-source",
      prompt: "Who supplies the opt-out notice?",
      options: ["The employer", "The pension provider", "HMRC", "The worker's solicitor"],
      answer: 1,
      explain: "The worker obtains it from the provider.",
    },
  ],
  sources: [
    { label: "Workplace pension contribution rates – GOV.UK", url: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay" },
    { label: "Opting out of a workplace pension – GOV.UK", url: "https://www.gov.uk/workplace-pensions/opting-out" },
    { label: "Pensions Act 2008 Part 1", url: "https://www.legislation.gov.uk/ukpga/2008/30/part/1" },
    { label: "Automatic enrolment detailed guidance (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/document-library/automatic-enrolment-detailed-guidance" },
  ],
};
