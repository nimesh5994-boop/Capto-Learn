import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "expenses-and-mileage-allowances",
  title: "Expenses, business travel and mileage allowances",
  level: "advanced",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Which expenses an employer can pay tax-free, the business travel rules (commuting, temporary workplaces, the 24-month rule), approved mileage allowance payments at the new 55p rate for 2026/27, mileage allowance relief, and advisory fuel rates for company cars.",
  objectives: [
    "Apply the exemption for paid or reimbursed expenses and recognise when a P11D or payroll entry is still needed",
    "Distinguish business travel from ordinary commuting, including the 24-month rule",
    "Calculate the approved mileage allowance, any taxable excess, NIC on the excess and mileage allowance relief at 2026/27 rates",
    "Use advisory fuel rates for company car business mileage",
  ],
  body: [
    {
      kind: "md",
      md: `Expenses generate more client questions than almost anything else in payroll: "can we pay this tax-free?", "do we put it through payroll?", "do we need a P11D?". The answer depends on whether the employee **could have claimed a tax deduction** for the cost if they'd paid it themselves, and for mileage, how the payment compares with HMRC's approved rate.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The expenses exemption",
      md: `Since 6 April 2016, an employer can pay or reimburse an expense **free of tax and NIC, with no reporting**, if the employee would have been entitled to a full tax deduction for it (ITEPA 2003 s289A). The employer must have a system to check claims are genuine business expenses.

This covers business travel and subsistence, professional subscriptions on HMRC's approved list, and business phone calls. It does **not** cover private costs (home broadband for general use, ordinary commuting, personal gym membership). Paying those is taxable pay or a benefit.`,
    },
    {
      kind: "md",
      md: `### Business travel vs commuting

- **Ordinary commuting** (home to a **permanent workplace**) is never deductible, so paying for it is taxable.
- Travel to a **temporary workplace** (somewhere the employee goes for a limited period or a temporary purpose) is business travel, and so is travel between workplaces in the course of the job.
- **The 24-month rule:** a workplace stops being temporary once the employee has spent, or is expected to spend, **40% or more of their working time** there over a period that lasts, or is expected to last, **more than 24 months**. From the moment that expectation arises, the travel becomes commuting.
- **Subsistence** (meals) while on qualifying business travel is deductible, either actual receipted costs or HMRC's **benchmark scale rates**.`,
    },
    {
      kind: "table",
      caption: "Approved mileage allowance payments (AMAPs) for 2026/27: employee's own vehicle",
      head: ["Vehicle", "Income tax", "Class 1 NIC"],
      rows: [
        ["Car or van", "55p a mile for the first 10,000 business miles in the tax year, then 25p", "55p for all business miles"],
        ["Motorcycle", "24p", "24p"],
        ["Bicycle", "20p", "20p"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 2026/27 increase",
      md: `The car and van rate for the first 10,000 miles rose from **45p to 55p**. It was announced on 21 May 2026 but applies **retrospectively from 6 April 2026**. The NIC disregard is now a flat **55p** for all business miles. The 25p rate above 10,000 miles, and the motorcycle and bicycle rates, didn't change.

Employers who paid more than 45p in April and May 2026 and taxed the excess may need to **correct those pay periods** so the employee isn't taxed on amounts that are now within the approved rate.`,
    },
    {
      kind: "md",
      md: `### How the mileage rules work

- **Paid at or below the approved amount**: tax-free and NIC-free, nothing to report.
- **Paid above the approved amount**: the **excess** over the approved amount (miles × rate) is **taxable**. Report it on the P11D, or put it through payroll. For **NIC**, compare the payment with **55p × all business miles**: any excess is Class 1 earnings and goes through **payroll** in the period paid.
- **Paid below the approved amount** (or nothing at all): the employee can claim **Mileage Allowance Relief (MAR)** from HMRC on the shortfall, through Self Assessment or a P87 claim.

Records: the employer needs a mileage log (date, journey, business purpose, miles).`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Company cars use advisory fuel rates, not AMAPs",
      md: `If the employee has a **company car**, the employer can reimburse business mileage at HMRC's **advisory fuel rates** tax-free (from 1 September 2026, for example, 17p a mile for a petrol car of 1,401–2,000cc, and 7p for an electric car charged at home or 15p at a public charger). Rates are reviewed quarterly, so check HMRC's table for the date of the journey. Paying AMAPs (55p) on a company car would make most of it taxable.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Round-sum allowances",
      md: `A flat "car allowance" or "expense allowance" paid regardless of actual costs is **taxable pay** subject to tax and Class 1 NIC through payroll. The employee may claim MAR on actual business miles, but the employer can't treat the allowance as AMAPs.`,
    },
  ],
  scenario: {
    title: "Mileage claims at Sorrell Care Services Ltd",
    narrative: `**Sorrell Care Services Ltd** in Leicester employs home-care workers who drive their own cars between clients' homes. Its policy pays **40p a mile**, unchanged for years. Two of its staff in 2026/27:

- **Amira** drives **12,000 business miles** in the year.
- **Joe**, a care manager, is paid **60p a mile** under an old contract and drives **8,000 business miles**.

The finance director asks: *"Does the new 55p rate change anything for us?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Amira.** Approved amount: 10,000 × 55p + 2,000 × 25p = £5,500 + £500 = **£6,000**. Paid: 12,000 × 40p = **£4,800**. No tax or NIC on the payment. She can claim **MAR of £1,200** (£6,000 − £4,800), worth £240 in tax at 20%.

**Joe.** Approved amount for tax: 8,000 × 55p = **£4,400**. Paid: 8,000 × 60p = **£4,800**. Taxable excess **£400**, reported on his P11D (or payrolled). For NIC: 8,000 × 55p = £4,400, so the **£400** excess is Class 1 earnings, put through payroll when paid.

Before the change (at 45p), Joe's taxable excess would have been £1,200, so the new rate reduces it by £800.`,
      },
      {
        kind: "table",
        caption: "2026/27 mileage position",
        head: ["", "Amira", "Joe"],
        rows: [
          ["Business miles", "12,000", "8,000"],
          ["Paid", "£4,800", "£4,800"],
          ["Approved amount (tax)", "£6,000", "£4,400"],
          ["Taxable excess", "—", "£400"],
          ["Class 1 NIC excess (vs 55p × all miles)", "—", "£400"],
          ["MAR the employee can claim", "£1,200", "—"],
        ],
      },
      {
        kind: "md",
        md: `**Advice.** Recruitment and retention matter in care. The company could raise its rate to 55p for all staff with no tax or NIC cost for the first 10,000 miles. If it does, Joe's contract rate should be reviewed too.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "mar-claim",
      prompt:
        "An employee drives 11,000 business miles in their own car in 2026/27 and is reimbursed 35p a mile. How much Mileage Allowance Relief can they claim (the amount of the shortfall, not the tax saved)?",
      answer: 1900,
      unit: "£",
      explain: "MAR is the approved amount less what the employer paid.",
      working: "Approved: 10,000 × 55p + 1,000 × 25p = £5,500 + £250 = £5,750\n\nPaid: 11,000 × 35p = £3,850\n\nMAR: £5,750 − £3,850 = **£1,900**",
    },
    {
      kind: "numeric",
      id: "tax-but-no-nic",
      prompt:
        "An employee drives 14,000 business miles in 2026/27 and is paid 50p a mile. How much of the payment is **taxable**?",
      answer: 500,
      unit: "£",
      explain:
        "For tax, the approved amount uses 55p for the first 10,000 miles and 25p after. For NIC, it's 55p on all miles, so in this case there's no NIC excess at all.",
      working: "Paid: 14,000 × 50p = £7,000\n\nApproved (tax): 10,000 × 55p + 4,000 × 25p = £5,500 + £1,000 = £6,500\n\nTaxable excess: **£500**\n\nNIC: 14,000 × 55p = £7,700, more than £7,000 paid, so no Class 1 NIC.",
    },
    {
      kind: "classify",
      id: "travel-type",
      prompt: "Is the cost of each journey deductible business travel or ordinary commuting?",
      categories: ["Business travel", "Ordinary commuting"],
      items: [
        { text: "An accountant drives from home to a client's office for a 3-day audit", answer: 0 },
        { text: "An office worker drives from home to the office they work at every day", answer: 1 },
        { text: "An engineer is seconded full-time to a site for an expected 30 months", answer: 1, why: "More than 40% of working time for an expected period over 24 months: not temporary." },
        { text: "A care worker drives between clients' homes during the working day", answer: 0 },
        { text: "An employee is seconded full-time to a site for an expected 18 months", answer: 0, why: "Expected to last less than 24 months, so it remains a temporary workplace." },
      ],
      explain: "Home to a permanent workplace is commuting. Temporary workplaces and travel in the course of the job are business travel, subject to the 24-month rule.",
    },
    {
      kind: "journal",
      id: "mileage-through-payroll",
      prompt:
        "An employee's approved mileage claim of £330 (600 miles at 55p) is paid with their monthly salary through the payroll. Post the expense side of the journal (the net wages control is cleared when the bank payment is made).",
      accounts: ["Travel and mileage expenses", "Net wages control", "Gross wages", "PAYE/NIC control (HMRC)", "Motor vehicles (fixed assets)", "Accruals"],
      answer: [
        { account: "Travel and mileage expenses", dr: 330 },
        { account: "Net wages control", cr: 330 },
      ],
      explain:
        "An approved mileage payment is a business expense, not wages: it isn't taxed or NIC'd, so it goes straight to net pay. Coding it to gross wages would overstate the payroll cost and confuse the P11D/payroll reconciliation.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-amap-rate",
      prompt: "What is the approved mileage rate for the first 10,000 business miles in a car in 2026/27?",
      options: ["45p", "50p", "55p", "25p"],
      answer: 2,
      explain: "55p, retrospective from 6 April 2026; 25p after 10,000 miles.",
    },
    {
      kind: "mcq",
      id: "q-nic-disregard",
      prompt: "For Class 1 NIC, how much per business mile can be paid to an employee driving their own car without NIC?",
      options: ["45p for the first 10,000 miles, then 25p", "55p for all business miles", "25p for all business miles", "Nothing: all mileage is NIC-able"],
      answer: 1,
      explain: "The NIC disregard is 55p for all business miles, with no 10,000-mile split.",
    },
    {
      kind: "mcq",
      id: "q-24-month",
      prompt: "A workplace stops being temporary when the employee is expected to spend 40% or more of their working time there for more than:",
      options: ["12 months", "24 months", "36 months", "6 months"],
      answer: 1,
      explain: "The 24-month rule.",
    },
    {
      kind: "mcq",
      id: "q-company-car-rate",
      prompt: "Which rates should be used to reimburse business mileage in a company car tax-free?",
      options: ["AMAPs", "Advisory fuel rates", "The fuel benefit multiplier", "Any rate the employer chooses"],
      answer: 1,
      explain: "Advisory fuel rates cover the fuel cost only; the employer already bears the other car costs.",
    },
    {
      kind: "mcq",
      id: "q-round-sum",
      prompt: "A £400 monthly car allowance paid regardless of mileage is:",
      options: ["Tax-free if under £5,000 a year", "Taxable pay subject to tax and Class 1 NIC", "Reported on the P11D only", "Covered by the expenses exemption"],
      answer: 1,
      explain: "A round-sum allowance is earnings, put through payroll.",
    },
  ],
  sources: [
    { label: "Rates and thresholds for employers 2026 to 2027 (mileage and advisory fuel rates)", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Increasing mileage rates (policy paper, May 2026)", url: "https://www.gov.uk/government/publications/increase-to-approved-mileage-allowance-payments-amaps-and-self-employed-simplified-mileage-rates/increasing-mileage-rates" },
    { label: "Expenses and benefits: business travel mileage for employees' own vehicles", url: "https://www.gov.uk/expenses-and-benefits-business-travel-mileage" },
    { label: "490: Tax and NICs for employee travel (GOV.UK collection)", url: "https://www.gov.uk/government/collections/tax-and-national-insurance-contributions-for-employee-travel-490" },
    { label: "EIM30220: Exemption for amounts which would otherwise be deductible – conditions", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim30220" },
  ],
};
