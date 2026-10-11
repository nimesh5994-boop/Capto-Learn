import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "minimum-wage-and-holiday-pay",
  title: "Minimum wage compliance and holiday pay",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Checking pay against the National Minimum and Living Wage rates from April 2026 — what counts as pay, the deductions and salary sacrifices that catch employers out, the penalties — and statutory holiday pay, including the 12.07% accrual method for irregular-hours and part-year workers.",
  objectives: [
    "Apply the April 2026 NMW/NLW rates to each age band and apprentices",
    "Calculate minimum wage pay for a pay reference period, allowing for deductions and salary sacrifice",
    "Explain HMRC's enforcement: arrears at current rates, penalties and their reduction",
    "Calculate holiday accrual and rolled-up holiday pay for irregular-hours workers at 12.07%",
  ],
  body: [
    {
      kind: "table",
      caption: "National Minimum Wage and National Living Wage from 1 April 2026",
      head: ["Category", "Hourly rate"],
      rows: [
        ["Aged 21 and over (National Living Wage)", "£12.71"],
        ["Aged 18 to 20", "£10.85"],
        ["Under 18 (above school leaving age)", "£8.00"],
        ["Apprentice under 19, or 19+ in the first year of the apprenticeship", "£8.00"],
        ["Accommodation offset", "£11.10 a day / £77.70 a week"],
      ],
    },
    {
      kind: "md",
      md: `Minimum wage compliance isn't just "is the hourly rate above £12.71?" HMRC tests the **pay that counts** for minimum wage purposes, over each **pay reference period** (the period the worker is paid for, up to one calendar month), against the **hours that count**. Plenty of salaried employees who look well paid on paper fail the test because of unpaid extra hours, deductions or salary sacrifice.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What reduces minimum wage pay",
      md: `**Doesn't count as pay:** tips, gratuities and service charges; overtime and shift **premiums** (the extra above the basic rate); most allowances (unless consolidated into basic pay); expense reimbursements; benefits in kind (except accommodation, up to the offset).

**Deductions that reduce pay:** deductions or payments for anything **connected with the job** (uniform the employer requires but doesn't supply, tools, training costs), and deductions for the **employer's own use and benefit** (e.g. meals, parking at the employer's car park).

**Deductions that don't reduce pay:** tax, NIC, student loans, pension contributions, union subs, repayment of advances or accidental overpayments.

**Salary sacrifice** reduces minimum wage pay: the worker has given up their right to that pay. A sacrifice into a cycle scheme, car scheme or even a pension can take a low-paid worker below the minimum.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common traps",
      md: `- **Salaried staff working unpaid extra hours** (opening up, cashing up, mandatory training) in a busy month.
- **Uniform deductions** for staff on or near the minimum.
- **Birthdays**: a worker turning 21 moves to the NLW from the start of their next pay reference period.
- **Apprentice rate** applied after the first year to someone aged 19 or over.
- **Salary sacrifice** set up for everyone, including the lowest paid.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Enforcement",
      md: `HMRC enforces the minimum wage. If it finds underpayment it issues a **notice of underpayment**:
- **Arrears** are calculated at **current** rates: underpayment ÷ the rate in force at the time × the current rate (so arrears can grow).
- A **penalty** of up to **200% of the arrears**, capped at **£20,000 per worker**, which is **halved** if the arrears and penalty are paid within **14 days**.
- Employers can be publicly **named**. Employers who find and correct underpayments themselves can use the voluntary declaration process to avoid penalties in most cases.`,
    },
    {
      kind: "md",
      md: `### Holiday pay

Workers are entitled to **5.6 weeks' statutory holiday** a year (capped at **28 days** for someone working 5 days or more). Holiday pay for the first 4 weeks must reflect **normal pay**, including regular overtime, commission and some allowances; where pay varies, use average pay over the previous **52 paid weeks**.

**Irregular-hours and part-year workers** (for leave years starting on or after **1 April 2024**):
- Holiday **accrues at 12.07% of hours worked** in each pay period. 12.07% is 5.6 weeks ÷ 46.4 working weeks.
- Employers may instead pay **rolled-up holiday pay**: an uplift of **12.07%** on pay for work done, paid with each wage and shown **separately on the payslip**.
- An irregular-hours worker has hours that are wholly or mostly variable; a part-year worker is required to work only part of the year with unpaid periods of at least a week.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Payroll set-up for rolled-up holiday pay",
      md: `Use a separate pay element called "Holiday pay" at 12.07% of basic pay, so it appears as its own line on the payslip. Rolled-up holiday pay that is buried in the hourly rate doesn't count, and the worker could claim the holiday pay again.`,
    },
  ],
  scenario: {
    title: "A minimum wage review at The Copper Kettle Café Ltd",
    narrative: `**The Copper Kettle Café Ltd** in Harrogate asks you to check its October 2026 payroll after reading about HMRC naming employers. Staff are paid monthly (pay reference period = calendar month).

- **Liam (22)**: salaried at £24,000 a year (£2,000 a month). Rota shows **160 hours** in October, but he also did **10 unpaid hours** of opening up and cashing up. The café deducts **£40** a month for the branded polo shirts and aprons staff must wear.
- **Maisie (19)**: £11.20 an hour for 120 hours, plus £85 of tips from the tronc.
- **Tom (24, casual, irregular hours)**: £13 an hour; worked **72 hours** in October. He's paid rolled-up holiday pay.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Liam.** Hours that count: 160 + 10 = **170**. Pay that counts: £2,000 − £40 uniform deduction (job-related, so it reduces minimum wage pay) = **£1,960**. Hourly: £1,960 ÷ 170 = **£11.53**, below the £12.71 NLW.

Required: 170 × £12.71 = £2,160.70. Shortfall for October: £2,160.70 − £1,960 = **£200.70**. The café must pay arrears and fix both causes: pay for the extra hours and stop the uniform deduction (or supply the uniform free).

**Maisie.** Aged 19: rate £10.85. Basic £11.20 × 120 = £1,344, or £11.20 an hour, which is above £10.85. Tips **don't count**, but she's compliant without them. **OK.**

**Tom.** Basic £13 × 72 = £936, above £12.71 an hour. Rolled-up holiday pay: £936 × 12.07% = **£112.98**, shown as a separate line. Holiday pay is on top of minimum wage pay; it doesn't count towards the minimum wage test for working hours.`,
      },
      {
        kind: "table",
        caption: "October review",
        head: ["Worker", "Rate needed", "Effective rate", "Result"],
        rows: [
          ["Liam", "£12.71", "£11.53", "Underpaid £200.70"],
          ["Maisie", "£10.85", "£11.20", "Compliant"],
          ["Tom", "£12.71", "£13.00 + 12.07% holiday", "Compliant"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Look back",
        md: `If Liam has worked unpaid hours in other months, the underpayment goes back to his start date, and HMRC's enforcement can reach back several years. Advise the client to use HMRC's voluntary declaration route, which normally avoids penalties and naming.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "nmw-shortfall",
      prompt:
        "A 25-year-old is paid £2,100 for a month in which he worked 168 hours. The employer deducts £60 for a uniform he's required to wear. What is the minimum wage **shortfall** for the month (April 2026 rates)?",
      answer: 95.28,
      tolerance: 0.01,
      unit: "£",
      explain: "Job-related uniform deductions reduce minimum wage pay. Compare pay that counts with hours × £12.71.",
      working: "Pay that counts: £2,100 − £60 = £2,040\n\nRequired: 168 × £12.71 = £2,135.28\n\nShortfall: £2,135.28 − £2,040 = **£95.28**",
    },
    {
      kind: "mcq",
      id: "salary-sacrifice-nmw",
      prompt:
        "A 30-year-old works 160 hours a month at £12.90 an hour (£2,064). She joins a cycle-to-work salary sacrifice of £100 a month. Is the employer compliant?",
      options: [
        "Yes: her contractual rate is £12.90",
        "No: after the sacrifice her pay is £1,964, or £12.28 an hour, below £12.71",
        "Yes: salary sacrifice is ignored for minimum wage",
        "Only if the bike is used for work",
      ],
      answer: 1,
      explain: "Salary sacrifice reduces pay for minimum wage purposes. £1,964 ÷ 160 = £12.275.",
    },
    {
      kind: "numeric",
      id: "accrual-hours",
      prompt:
        "An irregular-hours worker works 86 hours in a pay period. How many hours of holiday do they accrue at 12.07%? Give your answer to 2 decimal places, before any rounding.",
      answer: 10.38,
      tolerance: 0.01,
      unit: "",
      explain: "Holiday accrues at 12.07% of hours worked in the pay period.",
      working: "86 × 12.07% = **10.38 hours**",
    },
    {
      kind: "numeric",
      id: "rolled-up",
      prompt: "A casual worker earns £640 for work done in a week and is paid rolled-up holiday pay. How much holiday pay is added?",
      answer: 77.25,
      tolerance: 0.01,
      unit: "£",
      explain: "Rolled-up holiday pay is 12.07% of pay for work done, shown separately on the payslip.",
      working: "£640 × 12.07% = **£77.25** (£77.248)",
    },
    {
      kind: "classify",
      id: "counts-as-pay",
      prompt: "Does each item reduce (or not count towards) minimum wage pay?",
      categories: ["Reduces / doesn't count", "Fine: no effect"],
      items: [
        { text: "Deduction for tools the worker needs for the job", answer: 0 },
        { text: "Deduction for income tax and NIC", answer: 1 },
        { text: "Tips paid out through a tronc", answer: 0, why: "Tips never count towards minimum wage pay." },
        { text: "Employee pension contribution under a net pay arrangement (not a sacrifice)", answer: 1 },
        { text: "Repayment of a salary advance", answer: 1 },
        { text: "Night-shift premium above the basic rate", answer: 0, why: "Premiums don't count; only the basic rate does." },
      ],
      explain: "Job-related deductions, tips and premiums all fail; statutory deductions, pension contributions and repayments of advances are fine.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-nlw-rate",
      prompt: "What is the National Living Wage (21 and over) from 1 April 2026?",
      options: ["£12.21", "£12.71", "£10.85", "£13.00"],
      answer: 1,
      explain: "£12.71 an hour from 1 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-18-20",
      prompt: "What is the minimum rate for an 18- to 20-year-old from April 2026?",
      options: ["£8.00", "£10.00", "£10.85", "£12.71"],
      answer: 2,
      explain: "£10.85 for 18–20.",
    },
    {
      kind: "mcq",
      id: "q-penalty",
      prompt: "What is the maximum NMW penalty per worker?",
      options: ["£5,000", "£10,000", "£20,000", "Unlimited"],
      answer: 2,
      explain: "200% of arrears, capped at £20,000 per worker, halved if paid within 14 days.",
    },
    {
      kind: "mcq",
      id: "q-1207",
      prompt: "Where does the 12.07% holiday accrual figure come from?",
      options: [
        "28 days ÷ 232 working days",
        "5.6 weeks ÷ 46.4 working weeks",
        "4 weeks ÷ 33 weeks",
        "It's set by HMRC each year",
      ],
      answer: 1,
      explain: "52 − 5.6 = 46.4 working weeks; 5.6 ÷ 46.4 = 12.07%.",
    },
    {
      kind: "mcq",
      id: "q-prp",
      prompt: "What is the maximum length of a pay reference period for minimum wage purposes?",
      options: ["One week", "One calendar month", "One quarter", "One year"],
      answer: 1,
      explain: "A pay reference period can't be longer than a calendar month.",
    },
    {
      kind: "mcq",
      id: "q-rolled-up-who",
      prompt: "Rolled-up holiday pay is lawful for which workers?",
      options: [
        "All workers",
        "Irregular-hours and part-year workers (leave years from 1 April 2024)",
        "Only agency workers",
        "Only workers on zero-hours contracts who ask for it",
      ],
      answer: 1,
      explain: "Rolled-up holiday pay at 12.07% is permitted for irregular-hours and part-year workers.",
    },
  ],
  sources: [
    { label: "National Minimum Wage and National Living Wage rates (GOV.UK)", url: "https://www.gov.uk/national-minimum-wage-rates" },
    { label: "Calculating the minimum wage: what counts as pay (GOV.UK)", url: "https://www.gov.uk/guidance/calculating-the-minimum-wage/calculating-the-minimum-wage" },
    { label: "Calculating the minimum wage: enforcement (GOV.UK)", url: "https://www.gov.uk/guidance/calculating-the-minimum-wage/enforcing-the-minimum-wage" },
    { label: "National Minimum Wage: accommodation offset (GOV.UK)", url: "https://www.gov.uk/national-minimum-wage-accommodation" },
    { label: "Holiday pay and entitlement reforms from 1 January 2024 (GOV.UK)", url: "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024" },
    { label: "Holiday entitlement: calculate leave entitlement (GOV.UK)", url: "https://www.gov.uk/holiday-entitlement-rights/calculate-leave-entitlement" },
  ],
};
