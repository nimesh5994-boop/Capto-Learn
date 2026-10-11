import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "accruals-and-prepayments",
  title: "Accruals and prepayments",
  level: "practitioner",
  minutes: 35,
  summary:
    "Matching income and costs to the period they belong to: accrued and prepaid expenses, accrued and deferred income, the year-end journals, and how they reverse in the next period.",
  objectives: [
    "Explain the accruals basis and why the bank statement isn't the profit and loss account",
    "Calculate accruals, prepayments, accrued income and deferred income by time apportionment",
    "Post the year-end journals and their reversals",
    "Work out the expense for the year from opening and closing adjustments",
  ],
  body: [
    {
      kind: "md",
      md: `Companies, and any sole trader or partnership that doesn't use the cash basis, prepare accounts on the **accruals basis**: income and costs are recognised in the period they relate to, not when the money moves. A rent payment made in December that covers January to March belongs mostly to next year. An electricity bill that arrives in April for March's usage belongs to this year.

At the year end you adjust the trial balance for four kinds of timing difference.`,
    },
    {
      kind: "table",
      caption: "The four year-end timing adjustments",
      head: ["Adjustment", "What it means", "Journal", "Balance sheet"],
      rows: [
        ["Accrued expense (accrual)", "Cost incurred this year, not yet invoiced or recorded", "Dr Expense, Cr Accruals", "Current liability"],
        ["Prepaid expense (prepayment)", "Cost paid/recorded this year that relates to next year", "Dr Prepayments, Cr Expense", "Current asset"],
        ["Accrued income", "Income earned this year, not yet invoiced", "Dr Accrued income, Cr Sales", "Current asset"],
        ["Deferred income", "Income invoiced/received this year for work next year", "Dr Sales, Cr Deferred income", "Current liability"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The accrual basis",
      md: `FRS 102 requires an entity to prepare its financial statements, except for cash flow information, using the accrual basis of accounting: items are recognised as assets, liabilities, income or expenses when they meet the definitions and recognition criteria, not when cash is received or paid. For tax, trading profits of companies and accruals-basis businesses follow GAAP unless a specific tax rule says otherwise (BIM31020).`,
    },
    {
      kind: "md",
      md: `### Time apportionment

Most adjustments are worked out in months:

> **Prepayment** = amount paid × months *after* the year end ÷ months covered
>
> **Accrual** = cost per month × months *up to* the year end not yet billed

Always write down the **period covered** by the invoice and the **year end** before you calculate. Drawing a quick timeline avoids nearly every error.`,
    },
    {
      kind: "journal",
      title: "Prepaid rent",
      narrative:
        "Year end 31 March 2026. Rent of £18,000 was paid on 1 January 2026 for the calendar year 2026. Only January to March (3 months) belongs to this year, so 9/12 is prepaid: £13,500.",
      lines: [
        { account: "Prepayments", dr: 13500 },
        { account: "Rent", cr: 13500 },
      ],
    },
    {
      kind: "journal",
      title: "Accrued electricity",
      narrative: "The last bill covered up to 28 February. March's usage is estimated at £420 from the meter reading. No invoice has been posted yet.",
      lines: [
        { account: "Light and heat", dr: 420 },
        { account: "Accruals", cr: 420 },
      ],
    },
    {
      kind: "md",
      md: `### Reversing in the next period

Year-end adjustments are **reversed on the first day of the next period**. When March's electricity bill arrives in April and is posted (Dr Light and heat, Cr Trade payables), the reversal (Dr Accruals, Cr Light and heat) cancels it out, so April isn't charged with March's cost. Cloud software lets you set a journal to auto-reverse on a date.

The same logic gives you the expense for the year from the ledger:

> **Expense for the year** = opening prepayment − opening accrual + amount paid/invoiced in year − closing prepayment + closing accrual`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Getting the fraction upside down.** A prepayment is the part that relates to **next** year. If you've worked out the part used this year, you've calculated the expense, not the prepayment.
- **Forgetting the reversal.** If last year's accrual isn't reversed, this year is charged twice for the same cost.
- **Accruing VAT.** An accrual is the **net** cost if the client is VAT registered and can recover the VAT: no invoice exists yet, so there's no input tax to claim.
- **Chasing pennies.** Accruals and prepayments are subject to materiality. Most firms set a de minimis (often a few hundred pounds) below which they don't adjust; follow your firm's policy.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Where to look for accruals",
      md: `Look at invoices posted **after** the year end, utility bills, the accountancy fee for the year, interest on loans charged in arrears, and the payroll for any overtime or bonus earned but not yet paid. For prepayments, look at insurance, annual software subscriptions, rent paid in advance, and business rates.`,
    },
  ],
  scenario: {
    title: "Year-end adjustments for Fenwick Physio Ltd",
    narrative: `**Fenwick Physio Ltd** has a 31 March 2026 year end and is VAT registered. The director, Owen, has sent the bookkeeping file and a list of items he thinks might matter:

1. Rent of **£18,000** paid on 1 January 2026 for January to December 2026.
2. Insurance of **£2,400** paid on 1 October 2025 for 12 months.
3. Electricity: last bill to 28 February; March estimated at **£420** net.
4. Accountancy fee for the year, to be invoiced in summer: **£1,800** net.
5. A corporate wellness contract with a local employer, invoiced **£6,000** net on 1 February 2026 for six months' sessions (February to July 2026), all posted to Sales.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Working out each adjustment",
        head: ["Item", "Period covered", "This year", "Adjustment", "Type"],
        rows: [
          ["Rent", "Jan–Dec 2026", "3 months", "£18,000 × 9/12 = £13,500", "Prepayment"],
          ["Insurance", "Oct 2025–Sep 2026", "6 months", "£2,400 × 6/12 = £1,200", "Prepayment"],
          ["Electricity", "March 2026", "1 month", "£420", "Accrual"],
          ["Accountancy", "Year to 31 Mar 2026", "All", "£1,800", "Accrual"],
          ["Wellness contract", "Feb–Jul 2026", "2 months", "£6,000 × 4/6 = £4,000", "Deferred income"],
        ],
      },
      {
        kind: "journal",
        title: "Year-end journal (all five items)",
        narrative: "Posted at 31 March 2026, set to reverse on 1 April 2026.",
        lines: [
          { account: "Prepayments", dr: 14700 },
          { account: "Rent", cr: 13500 },
          { account: "Insurance", cr: 1200 },
          { account: "Light and heat", dr: 420 },
          { account: "Accountancy fees", dr: 1800 },
          { account: "Accruals", cr: 2220 },
          { account: "Sales", dr: 4000 },
          { account: "Deferred income", cr: 4000 },
        ],
      },
      {
        kind: "md",
        md: `**Effect on profit:** the prepayments increase profit by £14,700; the accruals reduce it by £2,220; deferring income reduces it by £4,000. Net effect **+£8,480**.

Explain the deferred income to Owen: the £4,000 isn't lost, it's recognised next year when the sessions are delivered. If the employer cancelled, the company might have to refund it, which is exactly why it's a liability today.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "insurance-prepayment",
      prompt: "A client with a 31 December year end paid **£3,600** on 1 August for 12 months' insurance. What is the prepayment at 31 December?",
      answer: 2100,
      unit: "£",
      explain: "The policy runs August to July. August to December (5 months) is this year; January to July (7 months) is next year and is prepaid.",
      working: "£3,600 × 7/12 = **£2,100** prepaid. The expense this year is £1,500.",
    },
    {
      kind: "journal",
      id: "accrue-electricity",
      prompt: "At the year end a client has used electricity estimated at **£650** (net) that hasn't been billed. The client is VAT registered. Post the year-end adjustment.",
      accounts: ["Light and heat", "Accruals", "Prepayments", "VAT control", "Trade payables", "Bank"],
      answer: [
        { account: "Light and heat", dr: 650 },
        { account: "Accruals", cr: 650 },
      ],
      explain:
        "The cost belongs to this year, so the expense is increased and a liability recognised. There's no invoice yet, so there's no input tax to claim and nothing goes to VAT control. Trade payables is for invoices actually received.",
    },
    {
      kind: "numeric",
      id: "rent-expense-for-year",
      prompt: `For the year ended 31 March 2026, a client's rent ledger shows: opening prepayment brought forward (reversed on 1 April 2025) **£1,000**; rent paid in the year **£15,000**; closing prepayment at 31 March 2026 **£1,500**. What is the rent expense for the year?`,
      answer: 14500,
      unit: "£",
      explain: "Last year's prepayment is a cost of this year. This year's closing prepayment is a cost of next year.",
      working: "£1,000 + £15,000 − £1,500 = **£14,500**",
    },
    {
      kind: "journal",
      id: "deferred-income",
      prompt:
        "A software consultancy invoiced and posted to Sales a **£6,000** (net) annual support contract on 1 October. The year end is 31 December and support is delivered evenly. Post the year-end adjustment.",
      accounts: ["Sales", "Deferred income", "Accrued income", "Trade receivables", "Prepayments", "Accruals"],
      answer: [
        { account: "Sales", dr: 4500 },
        { account: "Deferred income", cr: 4500 },
      ],
      explain:
        "Only October to December (3 of 12 months) has been earned. The other 9 months (£6,000 × 9/12 = £4,500) is taken out of Sales and held as deferred income, a liability. Accrued income is the opposite situation: earned but not yet invoiced.",
    },
    {
      kind: "classify",
      id: "classify-adjustments",
      prompt: "Year end 30 June. Classify each item.",
      categories: ["Accrual", "Prepayment", "Accrued income", "Deferred income"],
      items: [
        { text: "Annual software licence paid in May for June to May", answer: 1 },
        { text: "Loan interest for April to June, charged by the bank in July", answer: 0 },
        { text: "Work completed for a customer in June, invoiced in July", answer: 2 },
        { text: "Customer deposit received in June for a job starting in August, posted to Sales", answer: 3 },
        { text: "Accountancy fee for the year, billed in October", answer: 0 },
        { text: "Business rates paid in April for April to March", answer: 1 },
      ],
      explain:
        "Ask two questions: is it a cost or income, and has the cash/invoice come before or after the period it relates to? Cost after → accrual; cost before → prepayment; income after → accrued income; income before → deferred income.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-prepayment-type",
      prompt: "In the balance sheet, a prepayment is shown as:",
      options: ["A current liability", "A current asset", "A non-current asset", "A reduction in capital"],
      answer: 1,
      explain: "The business has paid for a benefit it will receive next year, which is an asset.",
    },
    {
      kind: "mcq",
      id: "q-accrual-effect",
      prompt: "Forgetting to post a £2,000 accrual has what effect on this year's accounts?",
      options: ["Profit overstated, liabilities understated", "Profit understated, liabilities overstated", "Profit overstated, assets understated", "No effect on profit"],
      answer: 0,
      explain: "The expense is missing, so profit is too high, and the liability (accruals) is missing from the balance sheet.",
    },
    {
      kind: "mcq",
      id: "q-reversal",
      prompt: "Why are year-end accruals reversed on the first day of the next period?",
      options: [
        "HMRC requires it",
        "So the invoice, when posted, isn't charged to the next period as well",
        "To reduce the VAT liability",
        "Because accruals are always estimates",
      ],
      answer: 1,
      explain: "The invoice posted later charges the expense again. The reversal cancels it so the cost is only in the year it relates to.",
    },
    {
      kind: "mcq",
      id: "q-deferred",
      prompt: "A gym receives annual memberships in advance. Unearned membership fees at the year end are:",
      options: ["Accrued income", "Sales", "Deferred income (a liability)", "A prepayment"],
      answer: 2,
      explain: "Cash received for services not yet provided is deferred income: the gym owes the members the service.",
    },
    {
      kind: "mcq",
      id: "q-calc",
      prompt: "Year end 31 December. A £1,200 annual subscription was paid on 1 April for 12 months. What's the expense for the year?",
      options: ["£300", "£900", "£1,200", "£400"],
      answer: 1,
      explain: "April to December is 9 months: £1,200 × 9/12 = £900. The other £300 is prepaid.",
    },
  ],
  sources: [
    { label: "FRC – FRS 102 The Financial Reporting Standard applicable in the UK and Republic of Ireland", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income Manual BIM31020 – meaning of UK GAAP", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31020" },
    { label: "HMRC Business Income Manual BIM42201 – deductions: timing", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42201" },
    { label: "HMRC Business Income Manual BIM31045 – materiality", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31045" },
  ],
};
