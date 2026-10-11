import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "payroll-journals",
  title: "Payroll journals",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Turning the payroll summary into a balanced journal: gross pay, employer's NIC and pension as costs; net pay, PAYE/NIC and pension as liabilities; clearing them when paid; the Employment Allowance; and reconciling the payroll control accounts.",
  objectives: [
    "Post a monthly payroll journal from a payroll summary report",
    "Clear net wages, PAYE/NIC and pension liabilities when they're paid",
    "Apply the Employment Allowance in the books and know who can't claim it",
    "Reconcile the payroll liability accounts to the payroll reports and HMRC",
  ],
  body: [
    {
      kind: "md",
      md: `Payroll is usually run in separate software (or by a payroll bureau) that calculates tax, NIC, pensions and net pay and reports to HMRC through Real Time Information. The bookkeeping job is to bring the results into the accounts with a **payroll journal** each pay period, then clear the liabilities as the payments go out.

The journal has two sides:

- **Costs to the employer (debits):** gross pay, **employer's** NIC, **employer's** pension contributions.
- **Amounts the employer now owes (credits):** net pay to employees; PAYE tax, employee and employer NIC and student loan deductions to HMRC; employee and employer pension contributions to the pension provider.

Employee deductions (tax, employee NIC, employee pension, student loan) are **not** costs to the business: they come out of the gross pay the business has already charged.`,
    },
    {
      kind: "table",
      caption: "Payroll summary for April 2026 (tax month 1): Orchard Lane Nursery Ltd",
      head: ["Item", "£"],
      rows: [
        ["Gross pay", "18,400"],
        ["PAYE income tax deducted", "2,210"],
        ["Employee NIC deducted", "1,060"],
        ["Employee pension deducted", "736"],
        ["Student loan deducted", "85"],
        ["**Net pay**", "**14,309**"],
        ["Employer's NIC", "1,940"],
        ["Employer's pension", "552"],
      ],
    },
    {
      kind: "journal",
      title: "The payroll journal",
      narrative: "PAYE/NIC liability = tax £2,210 + employee NIC £1,060 + employer NIC £1,940 + student loan £85 = £5,295. Pension liability = £736 + £552 = £1,288.",
      lines: [
        { account: "Gross wages", dr: 18400 },
        { account: "Employer's NIC", dr: 1940 },
        { account: "Employer's pension contributions", dr: 552 },
        { account: "Net wages payable", cr: 14309 },
        { account: "PAYE/NIC liability", cr: 5295 },
        { account: "Pension liability", cr: 1288 },
      ],
    },
    {
      kind: "md",
      md: `### Clearing the liabilities

When the bank payments go out, they're coded to the **liability** accounts, never to Wages:

- Net pay to employees: Dr Net wages payable, Cr Bank
- PAYE/NIC to HMRC: Dr PAYE/NIC liability, Cr Bank. Monthly payers must pay by the **22nd of the next tax month** (cheques by post must arrive by the 19th). A tax month runs from the 6th to the 5th.
- Pension contributions to the provider: Dr Pension liability, Cr Bank

After each payment, the liability should fall back to nil (or to the latest period's amount not yet due).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Employer figures for 2026/27",
      md: `Employer's Class 1 NIC is **15%** on earnings above the secondary threshold of **£5,000** a year (£417 a month). The **Employment Allowance** reduces an eligible employer's Class 1 NIC bill by up to **£10,500** for the year, offset in the payroll until it's used up. A company whose **only** employee paid above the secondary threshold is a sole director can't claim it.`,
    },
    {
      kind: "md",
      md: `### Recording the Employment Allowance

The payroll software reduces the amount payable to HMRC. In the books, the journal still shows the full employer's NIC cost, so you need a further entry to reduce the liability: **Dr PAYE/NIC liability, Cr Employer's NIC** (some firms credit an "Employment Allowance" line within staff costs instead; follow the firm's policy). If you skip this, the PAYE/NIC liability will never agree to what HMRC says is due.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Posting net pay as the wage cost** (from the bank feed) and ignoring the payroll report. Wages are understated, and employer's NIC and pensions are missing entirely.
- **Coding HMRC PAYE payments to Wages** after posting the journal, doubling the cost.
- **Forgetting the Employment Allowance**, so the PAYE liability builds up a balance that's never paid.
- **Director's salary:** post it to a separate *Directors' remuneration* code. If a director's net pay is left in the company rather than paid out, credit it to the director's loan account instead of net wages payable.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Reconcile every month",
      md: `Each month, check: net wages payable is nil once wages are paid; PAYE/NIC liability equals the amount shown as due for the latest month on the payroll report (and HMRC's online account); pension liability equals the contribution schedule submitted to the provider. Unexplained balances usually mean a missed journal, a payment coded elsewhere, or the Employment Allowance not recorded.`,
    },
  ],
  scenario: {
    title: "Orchard Lane Nursery Ltd: the first payroll of 2026/27",
    narrative: `**Orchard Lane Nursery Ltd** runs a children's nursery with 14 staff. Payroll is processed by a bureau. You've posted the April journal above. The company is eligible for the Employment Allowance, and this is its first payroll of 2026/27, so the full £10,500 is available.

The director, Hannah, asks why the payment to HMRC is so much lower than the PAYE/NIC liability in the books.`,
    walkthrough: [
      {
        kind: "md",
        md: `The PAYE/NIC liability from the journal is £5,295, which includes **£1,940** of employer's NIC. The Employment Allowance (£10,500 available) wipes out this month's employer NIC entirely, so the amount due to HMRC is:

£2,210 tax + £1,060 employee NIC + £85 student loan = **£3,355**.

£10,500 − £1,940 = **£8,560** of allowance remains for the following months.`,
      },
      {
        kind: "journal",
        title: "Recording the Employment Allowance",
        lines: [
          { account: "PAYE/NIC liability", dr: 1940 },
          { account: "Employer's NIC", cr: 1940 },
        ],
      },
      {
        kind: "md",
        md: `**Paying HMRC:** Dr PAYE/NIC liability £3,355, Cr Bank £3,355. The liability is now nil.

**Answer for Hannah:** the payroll software has applied the Employment Allowance against employer's NIC. Once the £10,500 is used up later in the year, the full employer's NIC will become payable each month, so the HMRC payment will rise. Worth putting in her cash flow forecast.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "post-payroll",
      prompt: `Post the payroll journal from this monthly summary: gross pay **£6,200**; PAYE tax **£640**; employee NIC **£310**; employee pension **£248**; net pay **£5,002**; employer's NIC **£520**; employer's pension **£186**. (No Employment Allowance.)`,
      accounts: ["Gross wages", "Employer's NIC", "Employer's pension contributions", "Net wages payable", "PAYE/NIC liability", "Pension liability", "Bank – current account", "Director's loan account"],
      answer: [
        { account: "Gross wages", dr: 6200 },
        { account: "Employer's NIC", dr: 520 },
        { account: "Employer's pension contributions", dr: 186 },
        { account: "Net wages payable", cr: 5002 },
        { account: "PAYE/NIC liability", cr: 1470 },
        { account: "Pension liability", cr: 434 },
      ],
      explain:
        "Costs: gross pay plus the employer's own NIC and pension. Liabilities: net pay to staff; tax plus both employee and employer NIC to HMRC (£640 + £310 + £520 = £1,470); both pension contributions to the provider (£248 + £186 = £434). Bank isn't touched until payments are made.",
    },
    {
      kind: "numeric",
      id: "net-pay",
      prompt: "An employee's monthly gross pay is **£3,450**. Deductions: PAYE tax **£312**, employee NIC **£164**, employee pension **£138**, student loan **£41**. What is net pay?",
      answer: 2795,
      unit: "£",
      explain: "Net pay is gross pay less all employee deductions. Employer's NIC and pension don't come out of the employee's pay.",
      working: "£3,450 − £312 − £164 − £138 − £41 = **£2,795**",
    },
    {
      kind: "numeric",
      id: "paye-due-with-ea",
      prompt: "In the first month of the tax year, an eligible employer's payroll shows: PAYE tax **£4,100**, employee NIC **£1,850**, employer's NIC **£2,600**, student loans **£120**. The full Employment Allowance of £10,500 is available. How much must be paid to HMRC for the month?",
      answer: 6070,
      unit: "£",
      explain: "The Employment Allowance offsets employer's Class 1 NIC only. With £10,500 available, this month's £2,600 is fully covered.",
      working: "£4,100 + £1,850 + £120 = **£6,070**. (Allowance remaining: £10,500 − £2,600 = £7,900.)",
    },
    {
      kind: "classify",
      id: "classify-payroll",
      prompt: "In the payroll journal, is each item a cost to the business or only a liability (deducted from employees' pay)?",
      categories: ["Cost to the business (debit to P&L)", "Liability only (deducted from gross pay)"],
      items: [
        { text: "Gross salaries", answer: 0 },
        { text: "Employee NIC", answer: 1 },
        { text: "Employer's NIC", answer: 0 },
        { text: "PAYE income tax", answer: 1 },
        { text: "Employer's pension contribution", answer: 0 },
        { text: "Student loan deductions", answer: 1 },
        { text: "Employee pension contribution", answer: 1 },
      ],
      explain: "The business's cost is gross pay plus its own NIC and pension. Everything deducted from the employee was already part of gross pay; the business just holds it until paying it over.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-paye-deadline",
      prompt: "A monthly employer paying electronically must pay PAYE for the tax month ending 5 November by:",
      options: ["30 November", "19 November", "22 November", "5 December"],
      answer: 2,
      explain: "Payment is due by the 22nd of the next tax month (the 19th for cheques by post).",
    },
    {
      kind: "mcq",
      id: "q-er-nic-rate",
      prompt: "What is the main rate of employer's Class 1 NIC for 2026/27, and the annual secondary threshold?",
      options: ["13.8% above £9,100", "15% above £5,000", "15% above £9,100", "12% above £12,570"],
      answer: 1,
      explain: "From April 2025 the rate rose to 15% and the secondary threshold fell to £5,000, and they apply for 2026/27.",
    },
    {
      kind: "mcq",
      id: "q-ea-eligibility",
      prompt: "A company's only employee paid above the secondary threshold is its sole director. Can it claim the Employment Allowance?",
      options: ["Yes, up to £10,500", "No", "Yes, but only half", "Only if it has a pension scheme"],
      answer: 1,
      explain: "A company is ineligible if its only employee liable for secondary Class 1 NIC is a sole director.",
    },
    {
      kind: "mcq",
      id: "q-net-wages",
      prompt: "After all wages for the month have been paid, the Net wages payable account should show:",
      options: ["Total gross pay", "Nil", "The PAYE due", "The year-to-date wages"],
      answer: 1,
      explain: "It's credited with net pay by the journal and debited by the payments, so it clears to nil.",
    },
    {
      kind: "mcq",
      id: "q-feed-net-pay",
      prompt: "A client has coded the net pay bank payments to Wages and posted no payroll journal. What's wrong?",
      options: ["Nothing", "Wages understated (deductions missing) and employer's NIC and pension omitted", "Wages overstated", "Only VAT is wrong"],
      answer: 1,
      explain: "Net pay is only part of the cost. Gross pay, employer's NIC and pension all need recording from the payroll report.",
    },
  ],
  sources: [
    { label: "HMRC – Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "GOV.UK – Employment Allowance", url: "https://www.gov.uk/employment-allowance" },
    { label: "GOV.UK – Pay employers' PAYE", url: "https://www.gov.uk/pay-paye-tax" },
    { label: "GOV.UK – Running payroll: reporting to HMRC", url: "https://www.gov.uk/running-payroll/reporting-to-hmrc" },
    { label: "The Pensions Regulator – automatic enrolment for employers", url: "https://www.thepensionsregulator.gov.uk/en/employers" },
  ],
};
