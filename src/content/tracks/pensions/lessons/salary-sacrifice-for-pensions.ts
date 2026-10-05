import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "salary-sacrifice-for-pensions",
  title: "Salary sacrifice for pension contributions",
  level: "practitioner",
  minutes: 35,
  summary:
    "How a salary sacrifice pension arrangement works, why it saves employee and employer NIC as well as income tax, the conditions for it to be effective, the knock-on effects on pay-linked benefits and auto-enrolment, and the £2,000 annual NIC cap that applies from 6 April 2029.",
  objectives: [
    "Explain how salary sacrifice differs from a net pay or relief at source contribution",
    "Calculate the income tax and NIC savings for employee and employer",
    "List the conditions for a valid arrangement and the common pitfalls",
    "Explain the effect on statutory pay, mortgages, minimum wage and auto-enrolment assessment",
    "Describe the NIC cap announced from 6 April 2029 and how it changes the economics",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `With **salary sacrifice** the employee gives up a slice of **contractual pay** in return for the employer paying the same amount into their pension as an **employer contribution**. Because the employee's **gross pay** is lower, both income tax and **National Insurance** (employee and employer) are reduced. It is the most efficient way for a basic or higher-rate employee to fund a pension today, and it is a common request from clients who want to share the employer NIC saving.`,
    },
    {
      kind: "table",
      caption: "How the three methods compare (employee pays £4,000 gross into pension; basic-rate taxpayer, salary £40,000, 2026/27)",
      head: ["", "Net pay", "Relief at source", "Salary sacrifice"],
      rows: [
        ["Contribution going into the pension", "£4,000", "£4,000", "£4,000 (employer contribution)"],
        ["Income tax saved", "£800", "£800", "£800"],
        ["Employee NIC saved (8%)", "None", "None", "£320"],
        ["Employee's net cost", "£3,200", "£3,200", "£2,880"],
        ["Employer NIC saved (15%)", "None", "None", "£600 (kept by the employer or passed on)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Conditions for an effective arrangement",
      md: `HMRC accepts salary sacrifice for pensions (they are outside the 'optional remuneration arrangement' benefit-in-kind rules) provided:

- The employee **agrees to a genuine change to the contract**, in writing, **before** the pay is earned. It can't be retrospective.
- The change is a **reduction in cash pay**, not just a redirection of already-earned pay.
- The reduced pay does not take the employee **below the National Minimum or Living Wage**.
- The employer **pays** the contribution to the scheme as an **employer contribution**.
- The employee cannot simply reverse the change each month; changes should only be allowed on a **life event** or at defined intervals.

If the arrangement is not valid, tax and NIC are due on the **full original pay** and the contribution is treated as an employee contribution.`,
    },
    {
      kind: "md",
      md: `### Effects to warn the client and employee about

- **Lower gross pay** reduces anything linked to it: **statutory sick, maternity, paternity and adoption pay**, **mortgage affordability**, **life cover** multiples, **overtime** and **redundancy** calculations, and **Statutory Sick Pay qualifying earnings**.
- **State benefits**: the reduced earnings may bring the employee below the **lower earnings limit** or the **primary threshold**, affecting State Pension qualifying years or Class 1 credits for a low earner.
- **Auto-enrolment:** pay after the sacrifice is what is assessed. A worker could drop below the **£10,000 trigger** or the qualifying band after sacrifice. The employer must meet the **minimum contribution** requirement (the total must be at least 8% with the employer paying at least 3%) based on the scheme's earnings definition, and records must show how.
- **Student loan** repayments and **Child Benefit High Income Charge**/**personal allowance taper** are based on income after the sacrifice, which can be a benefit: sacrificing salary can reduce adjusted net income (relevant at £60,000 and £100,000).
- **Employer contributions** are subject to the **annual allowance** (£60,000 for 2026/27) like any other pension input.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The cap from 6 April 2029",
      md: `From **6 April 2029** only the first **£2,000 a year** of employee pension contributions made through salary sacrifice will be **exempt from NIC** (employee and employer). Contributions **above** £2,000 will be treated for NIC like ordinary employee contributions (NIC still due), though they will still get income tax relief. The detailed operation (for example, how the cap applies across more than one arrangement) is set by the legislation, so check the final rules before advising. The change doesn't affect 2026/27.

For the same £4,000 sacrifice in 2029/30 the NIC saving is limited: employee 8% × £2,000 = £160 (instead of £320) and employer 15% × £2,000 = £300 (instead of £600). Advise clients to review salary sacrifice schemes and contracts before then.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Sharing the employer saving",
      md: `Some employers pay **all or part of their NIC saving** into the employee's pension. It is a commercial choice. If the employer does this, document it in the sacrifice agreement so there is no later dispute. Remember the **annual allowance** counts the sacrificed amount and any extra employer payment.`,
    },
  ],
  scenario: {
    title: "A salary sacrifice scheme at Corvid Software Ltd",
    narrative: `Corvid Software Ltd has an employee, Hana, on £40,000 who wants to put £4,000 a year into a pension. The company is offering salary sacrifice. Hana is a basic-rate taxpayer in England. The company already pays employer NIC at 15% above £5,000, so the saving is full. Hana's pay is well above the National Minimum Wage after the sacrifice. Assume no other pension arrangements.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the sacrifice.** Hana's cash pay falls from £40,000 to **£36,000**. The company pays £4,000 into the pension as an employer contribution.

**Step 2: Hana's savings.**
- Income tax: £4,000 × 20% = **£800**.
- Employee NIC: £4,000 × 8% = **£320** (her salary is above the £12,570 primary threshold and below the £50,270 upper earnings limit before and after).
- Her **net cost** of £4,000 into the pension = £4,000 − £800 − £320 = **£2,880**.

**Step 3: the company's saving.** Employer NIC saved = £4,000 × 15% = **£600**. If the company passes on, say, half (£300), it pays £4,300 into the pension in total and keeps £300.

**Step 4: the checks.**
- Pay after sacrifice (£36,000) is far above National Minimum Wage.
- The contract change was signed before the new pay period.
- Auto-enrolment: £36,000 is above the £10,000 trigger. The minimum contribution is at least met by an employer contribution of £4,000 (well above 8% of qualifying earnings £29,760 = £2,380.80).
- Warn Hana about statutory pay and mortgage affordability.

**Step 5: look ahead.** From 6 April 2029 only £2,000 of the sacrifice will be NIC-exempt, so the NIC savings will fall to £160 (Hana) and £300 (company). Schedule a review of the arrangement for 2028/29.`,
      },
      {
        kind: "journal",
        title: "Employer pension contribution paid under salary sacrifice (annual, simplified)",
        narrative: "The cost to the company is £4,000 as a pension cost; wages are lower by the same amount.",
        lines: [
          { account: "Employer pension contributions", dr: 4000 },
          { account: "Bank", cr: 4000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "employee-saving",
      prompt: "A basic-rate employee in 2026/27 with salary £35,000 sacrifices £3,000 into a pension. What is their total saving in income tax and employee NIC (£)? Basic rate 20% and employee NIC 8%.",
      answer: 840,
      unit: "£",
      explain: "Salary sacrifice reduces the pay on which both income tax and employee NIC are charged.",
      working: "£3,000 × 20% = £600; £3,000 × 8% = £240; total **£840**.",
    },
    {
      kind: "numeric",
      id: "employer-saving",
      prompt: "The employer's NIC saving on a £3,000 sacrifice (15% rate, employee already above the secondary threshold) in 2026/27 (£)?",
      answer: 450,
      unit: "£",
      explain: "Employer NIC at 15% on the sacrificed pay.",
      working: "£3,000 × 15% = **£450**.",
    },
    {
      kind: "numeric",
      id: "cap-2029",
      prompt: "From 6 April 2029, an employee sacrifices £5,000 in a year. How much of it is exempt from NIC (£)?",
      answer: 2000,
      unit: "£",
      explain: "Only the first £2,000 of employee pension contributions made through salary sacrifice is NIC-exempt.",
      working: "Cap: **£2,000**.",
    },
    {
      kind: "multi",
      id: "multi-ss-conditions",
      prompt: "Which of these are needed for a valid salary sacrifice arrangement? Select all that apply.",
      options: [
        "A written, prospective change to the employment contract",
        "Pay after sacrifice at or above the National Minimum Wage",
        "The employee can reverse it at will every month",
        "The employer pays the contribution into the pension as an employer contribution",
      ],
      answers: [0, 1, 3],
      explain: "Reversible-at-will arrangements risk being treated as ineffective; the other three are essential.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-nic-saved",
      prompt: "Which taxes does salary sacrifice reduce that net pay does not?",
      options: ["Income tax", "National Insurance", "Corporation tax", "VAT"],
      answer: 1,
      explain: "Both employee and employer NIC.",
    },
    {
      kind: "mcq",
      id: "q-cap-year",
      prompt: "When does the £2,000 NIC cap on salary sacrifice pensions start?",
      options: ["6 April 2026", "6 April 2027", "6 April 2028", "6 April 2029"],
      answer: 3,
      explain: "From 6 April 2029.",
    },
    {
      kind: "mcq",
      id: "q-retro",
      prompt: "Can a salary sacrifice apply to pay already earned?",
      options: ["Yes with consent", "No: it must be prospective", "Yes if the amount is small", "Only for directors"],
      answer: 1,
      explain: "The contract change must come before the pay is earned.",
    },
    {
      kind: "mcq",
      id: "q-nmw",
      prompt: "Pay after salary sacrifice must not fall below…",
      options: ["The personal allowance", "National Minimum Wage / National Living Wage", "£10,000", "The primary threshold"],
      answer: 1,
      explain: "The minimum wage applies to cash pay after the sacrifice.",
    },
    {
      kind: "mcq",
      id: "q-aa",
      prompt: "Do salary sacrifice contributions count towards the annual allowance?",
      options: ["No", "Yes, as employer contributions", "Only above £2,000", "Only for directors"],
      answer: 1,
      explain: "They are employer pension inputs counted in the annual allowance.",
    },
  ],
  sources: [
    { label: "Salary sacrifice reform for pension contributions (from 6 April 2029)", url: "https://www.gov.uk/government/publications/salary-sacrifice-reform-for-pension-contributions-effective-from-6-april-2029" },
    { label: "Changes to salary sacrifice for pensions from April 2029", url: "https://www.gov.uk/government/publications/changes-to-salary-sacrifice-for-pensions-from-april-2029/changes-to-salary-sacrifice-for-pensions-from-april-2029" },
    { label: "Salary sacrifice and the effects on PAYE – GOV.UK", url: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  ],
};
