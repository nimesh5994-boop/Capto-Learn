import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "management-accounts-pack",
  title: "Producing a management accounts pack",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Turning a closed month or quarter into a management accounts pack the client actually uses: what goes in it, KPIs, comparison with budget and prior year, analysing a gross profit variance into volume and margin, estimating tax, and writing commentary that explains rather than repeats the numbers.",
  objectives: [
    "Assemble a management accounts pack with the right reports for the client",
    "Calculate and interpret key KPIs: gross margin, overheads, debtor days, cash",
    "Split a gross profit variance into sales volume and margin effects",
    "Write concise, useful commentary and flag estimates such as a tax accrual",
  ],
  body: [
    {
      kind: "md",
      md: `Management accounts are prepared for the **owners and managers**, not for Companies House or HMRC. There's no required format, and that's the point: they should answer the questions the client actually has. *Are we making money? Why is it different from what we planned? Can we pay the bills? What should we do next?*

A pack is only as good as the close behind it. Produce it after the month-end routine is complete, with the bank reconciled and the adjustments posted, otherwise you're presenting the bookkeeping's errors in a nice format.`,
    },
    {
      kind: "table",
      caption: "A typical pack for an owner-managed business",
      head: ["Section", "What it shows"],
      rows: [
        ["Summary and commentary (1 page)", "Headline results, the three or four things that matter, actions"],
        ["KPI dashboard", "Turnover, gross margin %, overheads, net profit, cash, debtor and creditor days, any sector KPI (e.g. utilisation, covers, occupancy)"],
        ["Profit and loss", "Month and year to date, against budget and the same period last year, with variances"],
        ["Balance sheet", "Current position against last month and last year end"],
        ["Cash", "Bank position, cash movement for the period, and a short forecast of upcoming commitments (VAT, PAYE, corporation tax, loan repayments)"],
        ["Aged debtors and creditors", "Summaries, with problem balances highlighted"],
        ["Notes", "Estimates and adjustments made (accruals, stock, tax), and anything excluded"],
      ],
    },
    {
      kind: "md",
      md: `### Variance analysis: why did gross profit differ?

When gross profit is below budget, the client needs to know whether they **sold less** or **made less on what they sold**. Split the gross profit variance in two:

> **Volume effect** = (actual sales − budget sales) × budget margin %
>
> **Margin effect** = (actual margin % − budget margin %) × actual sales

The two add up to the total gross profit variance. "Sales were £14,000 below budget, costing £5,600 of gross profit, and margin was 3 points down, costing another £5,580" is far more useful than "gross profit is £11,180 below budget".`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax in management accounts",
      md: `For a company, include an estimate of the **corporation tax** on the year-to-date profit so the reported profit and the reserves available for dividends aren't overstated. For financial year 2026 the small profits rate is **19%** (profits up to £50,000) and the main rate **25%** (over £250,000), with marginal relief between, and limits reduced for associated companies and short periods. Label it as an estimate. Also show the VAT and PAYE due in the cash section so the client isn't caught out.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Write commentary that explains",
      md: `- **Lead with the answer:** "Profit for the quarter was £16.5k, £13.5k below budget."
- **Explain the why, in business terms:** "Two kitchen installations slipped to October, and supplier price rises weren't passed on."
- **Separate one-offs from trends.**
- **End with actions or questions** for the client.
- Don't narrate the table ("rent was £6,000"); the client can read.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Producing the pack before the close is complete**, then reissuing it a week later with different numbers.
- **No tax estimate**, so the client pays dividends from profits that are partly owed to HMRC.
- **Comparing a month with a budget that wasn't phased** (e.g. budget spread evenly when the business is seasonal).
- **Burying the bad news** on page 6. If cash is going to be tight, it goes on page 1.`,
    },
  ],
  scenario: {
    title: "Q2 pack for Saltmarsh Interiors Ltd",
    narrative: `**Saltmarsh Interiors Ltd** (a single company with no associated companies) fits out shops and offices. Its financial year started 1 April 2026. For the quarter **July to September 2026**:

| | Actual | Budget |
|---|---:|---:|
| Sales | £186,000 | £200,000 |
| Cost of sales | £117,180 | £120,000 |
| Gross profit | £68,820 | £80,000 |
| Overheads | £52,300 | £50,000 |
| Net profit before tax | £16,520 | £30,000 |

Year-to-date profit before tax (April to September) is **£36,000**, and the directors expect a full-year profit well under £50,000. Cash at 30 September is **£22,400**; the September quarter VAT of **£9,800** is due on 7 November and October's PAYE of **£6,100** on 22 November.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Margins.** Budget gross margin = £80,000 ÷ £200,000 = **40%**. Actual = £68,820 ÷ £186,000 = **37%**.

**Gross profit variance £11,180 adverse:**
- Volume: (£186,000 − £200,000) × 40% = **£5,600 adverse**
- Margin: (37% − 40%) × £186,000 = **£5,580 adverse**

**Overheads:** £2,300 adverse.

**Total:** £5,600 + £5,580 + £2,300 = **£13,480** adverse = £30,000 − £16,520 ✓

**Tax estimate:** year-to-date profit £36,000 × 19% = **£6,840**, accrued in the management accounts and labelled as an estimate.

**Cash:** £22,400 in the bank, with £9,800 VAT and £6,100 PAYE due in November, leaves £6,500 before any other payments. That needs to be on page 1.`,
      },
      {
        kind: "callout",
        tone: "example",
        title: "Draft summary commentary",
        md: `**Q2 profit £16.5k, £13.5k below budget.** About half the shortfall is lower sales (two fit-outs moved into October, worth around £14k of turnover); the other half is margin, down from 40% to 37%, mainly timber and fixings price rises not yet passed on to customers. Overheads were £2.3k over budget, mostly temporary labour.

**Cash is tight in November:** £15.9k of VAT and PAYE is due against £22.4k in the bank. We suggest chasing the three debtors over 60 days (£11.2k) this week.

**Questions for you:** Will the October fit-outs complete on time? Can the price list be updated from November? Year-to-date corporation tax is estimated at £6.8k; please speak to us before declaring any dividend.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "gross-margin",
      prompt: "Sales for the month were **£84,000** and cost of sales **£52,920**. What is the gross margin percentage?",
      answer: 37,
      tolerance: 0.05,
      unit: "%",
      explain: "Gross margin = gross profit ÷ sales.",
      working: "Gross profit £84,000 − £52,920 = £31,080. £31,080 ÷ £84,000 = **37%**",
    },
    {
      kind: "numeric",
      id: "margin-effect",
      prompt: "A client's budget gross margin was **45%**. Actual sales were **£150,000** at an actual margin of **42%**. How much gross profit was lost because of the lower margin (the margin effect)?",
      answer: 4500,
      unit: "£",
      explain: "The margin effect applies the change in margin percentage to the actual sales achieved.",
      working: "(45% − 42%) × £150,000 = **£4,500** adverse",
    },
    {
      kind: "numeric",
      id: "volume-effect",
      prompt: "Budget sales were **£220,000** at a **35%** budget margin. Actual sales were **£238,000**. What is the volume effect on gross profit (enter a positive number if favourable)?",
      answer: 6300,
      unit: "£",
      explain: "The volume effect applies the budget margin to the difference in sales.",
      working: "(£238,000 − £220,000) × 35% = **£6,300** favourable",
    },
    {
      kind: "numeric",
      id: "ct-estimate",
      prompt: "A company with no associated companies has year-to-date profit before tax of **£28,400** after six months, and expects full-year profits of about £45,000. Estimate the corporation tax to accrue in the management accounts on the year-to-date profit.",
      answer: 5396,
      unit: "£",
      explain: "Expected annual profits are below £50,000, so the 19% small profits rate is a reasonable basis for the estimate (assuming taxable profit is close to accounting profit).",
      working: "£28,400 × 19% = **£5,396**",
    },
    {
      kind: "multi",
      id: "pack-contents",
      prompt: "Which of these belong in a typical monthly management accounts pack for an owner-managed company? Select all that apply.",
      options: [
        "Profit and loss against budget and prior year",
        "A cash position with upcoming VAT, PAYE and tax payments",
        "The statutory directors' report",
        "Commentary explaining the main variances",
        "Aged debtors summary with problem balances",
        "A full copy of every bank statement",
      ],
      answers: [0, 1, 3, 4],
      explain: "The pack is for decision-making. Statutory reports and raw source documents don't belong in it; analysis, cash and commentary do.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-audience",
      prompt: "Management accounts are prepared mainly for:",
      options: ["HMRC", "Companies House", "The owners and managers of the business", "The auditors"],
      answer: 2,
      explain: "They're internal reports with no statutory format, designed to help run the business.",
    },
    {
      kind: "mcq",
      id: "q-tax-estimate",
      prompt: "Why include a corporation tax estimate in a company's management accounts?",
      options: [
        "HMRC requires it monthly",
        "So profit and reserves available for dividends aren't overstated",
        "To file the CT600 early",
        "It reduces the tax payable",
      ],
      answer: 1,
      explain: "Without it, the client may treat pre-tax profit as available for dividends.",
    },
    {
      kind: "mcq",
      id: "q-margin-down",
      prompt: "Sales are on budget but gross margin has fallen from 40% to 34%. Which is the most likely cause to investigate first?",
      options: ["Overheads increasing", "Cost price increases not passed on, or a cut-off/stock error", "The VAT rate", "Depreciation"],
      answer: 1,
      explain: "Margin is driven by selling prices, costs of sales and stock/cut-off. Overheads and depreciation sit below gross profit.",
    },
    {
      kind: "mcq",
      id: "q-commentary",
      prompt: "Which is the most useful piece of commentary?",
      options: [
        "\"Rent was £6,000.\"",
        "\"Gross profit is £11k below budget.\"",
        "\"Gross profit is £11k below budget: £5.6k from two delayed jobs and £5.6k from material price rises not yet passed on.\"",
        "\"See the attached P&L.\"",
      ],
      answer: 2,
      explain: "Good commentary explains causes in business terms and points towards actions.",
    },
    {
      kind: "mcq",
      id: "q-phasing",
      prompt: "A seasonal garden centre's annual budget has been divided evenly by 12 for monthly comparisons. The problem is:",
      options: ["None", "Monthly variances will be misleading because the budget isn't phased to the seasonal pattern", "VAT will be wrong", "The balance sheet won't balance"],
      answer: 1,
      explain: "Budgets should be phased to reflect expected seasonality, otherwise spring always looks brilliant and winter always looks terrible.",
    },
  ],
  sources: [
    { label: "HMRC – Rates and allowances for Corporation Tax", url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" },
    { label: "GOV.UK – Corporation Tax rates and reliefs", url: "https://www.gov.uk/corporation-tax-rates" },
    { label: "GOV.UK – Pay employers' PAYE", url: "https://www.gov.uk/pay-paye-tax" },
    { label: "Companies Act 2006 s830 – distributions only out of profits available", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/830" },
  ],
};
