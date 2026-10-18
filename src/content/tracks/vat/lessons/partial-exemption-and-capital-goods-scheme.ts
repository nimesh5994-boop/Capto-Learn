import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "partial-exemption-and-capital-goods-scheme",
  title: "Partial exemption and the Capital Goods Scheme",
  level: "advanced",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "When a business makes both taxable and exempt supplies, not all of its input tax is recoverable. Attributing input tax, the standard method, the de minimis tests, the annual adjustment, and how the Capital Goods Scheme adjusts recovery on big-ticket assets over time, including the changes from 29 July 2026.",
  objectives: [
    "Attribute input tax to taxable, exempt and residual categories",
    "Calculate residual recovery under the standard method, including rounding",
    "Apply the de minimis limit and the two simplified tests",
    "Identify capital items under the CGS, including the 29 July 2026 changes, and calculate an interval adjustment",
  ],
  body: [
    {
      kind: "md",
      md: `Input tax is only recoverable to the extent that it relates to **taxable** supplies, meaning standard, reduced or zero-rated sales (plus certain supplies made outside the UK). A business that also makes **exempt** supplies, such as residential rent, insurance broking commission, financial services, or education and health services, is **partly exempt**. It has to work out how much of its input tax relates to the exempt side and restrict its claim, unless the exempt input tax is small enough to be **de minimis**.`,
    },
    {
      kind: "md",
      md: `### Step 1: attribute the input tax

Split all input tax for the period into three groups:

1. **Directly attributable to taxable supplies**: recover it in full (e.g. stock for resale, costs of a taxable job).
2. **Directly attributable to exempt supplies**: not recoverable, subject to de minimis (e.g. repairs to a residential flat that's let out).
3. **Residual**: overheads used for both (e.g. accountancy fees, the phone system, head office rent). Apportion it under the partial exemption method.

### Step 2: apportion the residual input tax (standard method)

> Recovery % = taxable supplies (excluding VAT) ÷ total supplies (excluding VAT) × 100

Round the percentage **up** to the next whole number. If residual input tax averages more than **£400,000 a month**, round to 2 decimal places instead (Notice 706 section 4.7).

**Leave out** of both figures: sales of capital assets, incidental financial and real estate transactions (such as bank interest), self-supplies and reverse charge services, and transactions that aren't supplies, such as a transfer of a going concern.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The de minimis limit (Notice 706 section 11)",
      md: `If **exempt input tax** (directly exempt plus the exempt share of residual):
- is **no more than £625 a month on average** (£1,875 a quarter, £7,500 a year), **and**
- is **no more than 50% of total input tax**,

the business is **de minimis** and can recover **all** its input tax, including the exempt part.

Two **simplified tests** let a business skip the full calculation:
- **Test One:** total input tax is no more than £625 a month on average **and** the value of exempt supplies is no more than 50% of all supplies.
- **Test Two:** total input tax **less** input tax directly attributable to taxable supplies is no more than £625 a month on average **and** exempt supplies are no more than 50% of all supplies.`,
    },
    {
      kind: "md",
      md: `### Step 3: the annual adjustment

The quarterly calculations are provisional. At the end of the **partial exemption year** (normally the year ending 31 March, 30 April or 31 May depending on the client's VAT quarters), redo the calculation for the whole year, including the de minimis test on annual figures. Then adjust for the difference on the **first return after the year end**, or, optionally, on the last return of the year.

A business that did an annual adjustment last year can use **last year's recovery percentage** provisionally during the current year, and correct it in the annual adjustment. This saves a calculation every quarter.

If the standard method gives an unfair result, for example a business with large exempt sales that use few overheads, it can apply to HMRC for a **special method**. Special methods must be approved in advance and need careful drafting.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Small exempt income can still matter",
      md: `A trading company that lets a flat above its shop has exempt rental income. It's often de minimis, but don't assume it. A refurbishment of the flat in the same year can push exempt input tax well over £625 a month. Run the de minimis test every year, using the annual figures.`,
    },
    {
      kind: "md",
      md: `### The Capital Goods Scheme (Notice 706/2)

Partial exemption fixes recovery on the return in which the cost is incurred. For big-ticket assets used over many years, the **Capital Goods Scheme (CGS)** adjusts the original recovery each year to reflect how the asset is **actually used** over its adjustment period.

| Capital item | Threshold (VAT-exclusive) | Adjustment period |
|---|---|---|
| Land, buildings and civil engineering works (acquired, built, refurbished, fitted out, altered or extended on or after **29 July 2026**) | **£600,000** or more | 10 intervals |
| The same items acquired or constructed **before** 29 July 2026 | £250,000 or more (existing items stay in the scheme until their period ends) | 10 intervals |
| Aircraft, ships, boats and other vessels | £50,000 or more | 5 intervals |
| Computers and computer equipment acquired **on or after** 29 July 2026 | **No longer CGS items** | — |

If the business holds an interest in land or a building with **less than 10 years** to run, the adjustment period is shortened to the complete years of the interest plus 1, with a minimum of 3 intervals (Notice 706/2 section 6.3).

Each interval is normally the partial exemption year. The first interval has no adjustment, because the original claim is made in the normal way.

**Annual adjustment for each later interval:**

> (Total input tax on the item ÷ number of intervals) × (taxable use % this interval − original recovery %)

A positive answer is extra input tax for the client. A negative answer is repayable to HMRC. Enter it in **box 4** on the return for the **second VAT period after the end of the interval**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 29 July 2026 changes (Revenue and Customs Brief 7 (2026))",
      md: `From **29 July 2026** the land and buildings threshold rose from £250,000 to **£600,000**, and computers and computer equipment were removed from the scheme. Items already in the CGS under the old rules **stay in it** until the end of their adjustment periods, so older buildings and computers still need their adjustments. HMRC's policy paper on the change (*Simplification of the Capital Goods Scheme*, July 2026) says the new threshold and the removal of computers apply only where the owner incurred no capital expenditure on the item before 29 July 2026. Check carefully for projects that started before that date.`,
    },
    {
      kind: "md",
      md: `**Selling a CGS item during its adjustment period.** Make the adjustment for the interval of sale, then a final adjustment for each complete interval left. These are treated as 100% taxable if the sale is taxable (for example an opted building) or 0% if the sale is exempt. This can claw back a lot of VAT, so model it before advising on a sale.`,
    },
  ],
  scenario: {
    title: "The year-end partial exemption calculation for Ashcombe Lettings & Sales Ltd",
    narrative: `Ashcombe Lettings & Sales Ltd is an estate agent that also owns six residential flats it lets out. Its partial exemption year ends on 31 March. For the year to 31 March 2026:

| Supplies (excluding VAT) | £ |
|---|---|
| Estate agency and letting fees (standard-rated) | 540,000 |
| Residential rents from its own flats (exempt) | 160,000 |
| Bank interest received | 3,000 |

| Input tax | £ |
|---|---|
| Directly attributable to agency work (signage, portal fees, marketing) | 18,000 |
| Directly attributable to the flats (repairs, refurbishment) | 4,000 |
| Residual (office rent, IT, accountancy, phones) | 8,000 |
| **Total** | **30,000** |

During the year it provisionally recovered input tax of £24,000.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Residual recovery percentage.** Leave out the bank interest, which is an incidental financial supply.

540,000 ÷ (540,000 + 160,000) = 77.14%, **rounded up to 78%**.

Residual recoverable: 78% × £8,000 = **£6,240**. Exempt share of residual: £1,760.

**De minimis test.** Exempt input tax = £4,000 + £1,760 = **£5,760**. That's less than £7,500 for the year (£625 × 12), and less than 50% of £30,000. **Ashcombe is de minimis for the year**, so it can recover **all £30,000**.`,
      },
      {
        kind: "table",
        caption: "Annual adjustment",
        head: ["", "£"],
        rows: [
          ["Input tax recoverable for the year (de minimis)", "30,000"],
          ["Less: provisionally recovered during the year", "(24,000)"],
          ["**Annual adjustment: extra input tax claimed in box 4**", "**6,000**"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Next year looks different",
        md: `Ashcombe plans to spend £60,000 + VAT refurbishing two flats next year. That's £12,000 of input tax directly attributable to exempt supplies, which will take it well over the de minimis limit. Warn the directors now. Unless the property is used for taxable supplies (for example as commercial premises it opts to tax), that VAT will be a real cost.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "residual-percent",
      prompt:
        "A business has taxable supplies of £850,000, exempt supplies of £230,000 and £12,000 of bank interest in the year (all excluding VAT). Residual input tax averages well under £400,000 a month. What is the standard method recovery percentage (as a whole number)?",
      answer: 79,
      unit: "%",
      tolerance: 0,
      explain:
        "Bank interest is an incidental financial supply, so leave it out of the calculation. Round the result up to the next whole number.",
      working: "850,000 ÷ (850,000 + 230,000) = 850,000 ÷ 1,080,000 = 78.70%, rounded up to **79%**.",
    },
    {
      kind: "numeric",
      id: "recoverable-total",
      prompt:
        "For a quarter, a partly exempt business has input tax directly attributable to taxable supplies of £9,400, directly attributable to exempt supplies of £2,100, and residual input tax of £5,000. Its recovery percentage is 70%. Assume it is **not** de minimis. How much input tax can it recover for the quarter?",
      answer: 12900,
      unit: "£",
      explain: "Recover all the directly taxable input tax plus the taxable share of the residual. Directly exempt input tax isn't recoverable if the business isn't de minimis.",
      working: "£9,400 + (70% × £5,000) = £9,400 + £3,500 = **£12,900**. (Exempt input tax: £2,100 + £1,500 = £3,600, which is over £1,875 for a quarter, so it isn't de minimis.)",
    },
    {
      kind: "mcq",
      id: "test-one",
      prompt:
        "In a quarter, a business's total input tax is £1,700 and its exempt supplies are 20% of all supplies. Can it use the simplified Test One to treat itself as de minimis?",
      options: ["Yes: total input tax is no more than £1,875 and exempt supplies are no more than 50%", "No: it must do the full calculation", "No: any exempt supplies prevent recovery", "Only if HMRC approves"],
      answer: 0,
      explain: "Test One: total input tax no more than £625 a month on average (£1,875 a quarter) and exempt supplies no more than 50% of all supplies. Both are met, so all its input tax is recoverable provisionally.",
    },
    {
      kind: "numeric",
      id: "cgs-adjustment",
      prompt:
        "In September 2026 a company buys an office building for £800,000 + £160,000 VAT. It recovers 60% of the VAT at the outset under its partial exemption method. In the second interval, its taxable use is 75%. What CGS adjustment is due for that interval? (Give a positive figure if it's extra input tax for the company.)",
      answer: 2400,
      unit: "£",
      explain:
        "The building was acquired after 29 July 2026 and costs £600,000 or more, so it's a CGS item with 10 intervals. Each interval carries 1/10 of the VAT, adjusted by the change in taxable use from the original recovery percentage.",
      working: "£160,000 ÷ 10 = £16,000 per interval. Change in use: 75% − 60% = +15%. Adjustment: £16,000 × 15% = **£2,400** extra input tax, claimed in box 4 on the return for the second period after the end of the interval.",
    },
    {
      kind: "classify",
      id: "cgs-items",
      prompt: "Is each item a CGS capital item?",
      categories: ["CGS item", "Not a CGS item"],
      items: [
        { text: "Freehold office bought for £800,000 + VAT in October 2026", answer: 0 },
        { text: "Freehold shop bought for £400,000 + VAT in October 2026", answer: 1, why: "Below the £600,000 threshold that applies to acquisitions from 29 July 2026." },
        { text: "Warehouse bought for £400,000 + VAT in 2023", answer: 0, why: "It was within the old £250,000 threshold and stays in the scheme until its adjustment period ends." },
        { text: "Server system costing £70,000 + VAT bought in September 2026", answer: 1, why: "Computers acquired on or after 29 July 2026 are no longer CGS items." },
        { text: "Boat costing £60,000 + VAT bought for a charter business", answer: 0, why: "Vessels of £50,000 or more remain in the scheme (5 intervals)." },
      ],
      explain: "Check the type of item, the VAT-exclusive cost and the acquisition date against the thresholds, remembering that the rules changed on 29 July 2026 and existing items stay in.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-deminimis",
      prompt: "What are the two conditions of the main de minimis test?",
      options: [
        "Exempt input tax no more than £625 a month on average, and no more than 50% of total input tax",
        "Exempt supplies under £625 a month, and under 50% of turnover",
        "Total input tax under £7,500 a year",
        "Exempt input tax under £1,000 a year",
      ],
      answer: 0,
      explain: "Both limbs must be met: an average of £625 a month or less, and no more than half of total input tax.",
    },
    {
      kind: "mcq",
      id: "q-rounding",
      prompt: "The standard method gives a recovery percentage of 63.2% for a small business. What percentage is used?",
      options: ["63%", "63.2%", "64%", "60%"],
      answer: 2,
      explain: "Round up to the next whole number, unless residual input tax averages more than £400,000 a month.",
    },
    {
      kind: "mcq",
      id: "q-excluded",
      prompt: "Which of these is left out of the standard method calculation?",
      options: ["Exempt residential rent", "Zero-rated sales", "The sale of a used delivery van (a capital asset)", "Standard-rated fees"],
      answer: 2,
      explain: "Sales of capital assets are excluded from both figures to avoid distorting the percentage.",
    },
    {
      kind: "mcq",
      id: "q-cgs-threshold",
      prompt: "For land and buildings acquired on or after 29 July 2026, what is the CGS threshold?",
      options: ["£50,000", "£250,000", "£600,000", "£1 million"],
      answer: 2,
      explain: "Revenue and Customs Brief 7 (2026) raised the threshold from £250,000 to £600,000, excluding VAT.",
    },
    {
      kind: "mcq",
      id: "q-cgs-timing",
      prompt: "On which return is a CGS interval adjustment entered?",
      options: ["The last return of the interval", "The return for the second VAT period after the end of the interval", "The annual accounts", "A separate claim to HMRC"],
      answer: 1,
      explain: "Notice 706/2 section 8.1: enter it in box 4 of the return for the second period after the end of the interval.",
    },
    {
      kind: "mcq",
      id: "q-annual",
      prompt: "Why must partly exempt businesses carry out an annual adjustment?",
      options: [
        "To replace the provisional quarterly calculations with one for the full year",
        "To pay a penalty for exempt supplies",
        "To reclaim VAT on exempt sales",
        "It's optional",
      ],
      answer: 0,
      explain: "Quarterly recovery is provisional. The annual adjustment recalculates recovery and the de minimis position on the full year's figures.",
    },
  ],
  sources: [
    { label: "Partial exemption (VAT Notice 706)", url: "https://www.gov.uk/guidance/partial-exemption-vat-notice-706" },
    { label: "Capital Goods Scheme (VAT Notice 706/2)", url: "https://www.gov.uk/guidance/capital-goods-scheme-notice-7062" },
    { label: "Revenue and Customs Brief 7 (2026): Changes to the VAT Capital Goods Scheme", url: "https://www.gov.uk/government/publications/revenue-and-customs-brief-7-2026-changes-to-the-vat-capital-goods-scheme/changes-to-the-vat-capital-goods-scheme" },
    { label: "HMRC policy paper: Simplification of the Capital Goods Scheme (July 2026)", url: "https://www.gov.uk/government/publications/capital-goods-scheme-simplification/simplification-of-the-capital-goods-scheme" },
    { label: "HMRC VAT Partial Exemption Guidance manual", url: "https://www.gov.uk/hmrc-internal-manuals/vat-partial-exemption-guidance" },
    { label: "VAT Act 1994 s26 – input tax allowable", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/26" },
  ],
};
