import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "fixed-assets-and-depreciation",
  title: "Fixed asset registers, depreciation and disposals",
  level: "foundation",
  minutes: 35,
  summary:
    "Keeping a fixed asset register that agrees to the trial balance, deciding what to capitalise, choosing and applying depreciation policies, posting disposals, and why depreciation is replaced by capital allowances in the tax computation.",
  objectives: [
    "Decide whether a cost should be capitalised or expensed, using a sensible capitalisation policy",
    "Calculate straight-line and reducing-balance depreciation, including part-year charges",
    "Post the disposal of a fixed asset and calculate the profit or loss on disposal",
    "Reconcile the fixed asset register to the trial balance and spot common errors",
  ],
  body: [
    {
      kind: "md",
      md: `Tangible fixed assets (property, plant and equipment in FRS 102 Section 17; FRS 105 has the equivalent) are items held for use in the business for more than one accounting period: vans, computers, machinery, fixtures, buildings. They go on the balance sheet at cost and are **depreciated** over their useful lives, so the cost is matched against the periods that benefit from them.

The **fixed asset register (FAR)** is the working paper behind the balance sheet figure. For each asset it records the description, date acquired, cost, depreciation policy, depreciation to date, net book value and, eventually, the disposal.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What goes into cost",
      md: `Cost includes the **purchase price** (net of recoverable VAT and trade discounts) plus costs **directly attributable** to bringing the asset into working condition: delivery, installation, professional fees, and site preparation.

It doesn't include **repairs and maintenance**, training staff to use the asset, or general overheads. Recoverable VAT is never part of cost; irrecoverable VAT (e.g. on a car with private use, or for a non-registered client) is.`,
    },
    {
      kind: "md",
      md: `### Capitalisation policy

Most practices agree a **capitalisation threshold** with each client, e.g. "items under £500 are expensed". It keeps the FAR manageable and is acceptable because small items are immaterial. Apply it consistently, and don't use it to split a single asset (a £3,000 server bought as three invoices is still one asset).

### Depreciation methods

| Method | Charge | Suits |
|---|---|---|
| **Straight line** | (Cost − residual value) ÷ useful life, the same every year | Buildings, fixtures, most equipment |
| **Reducing balance** | A fixed % of net book value each year | Vehicles and assets that lose value fastest early on |

Depreciation starts when the asset is **available for use**. Many practices charge a full year in the year of purchase and none in the year of disposal, or pro rata by months: either is fine if it's the **stated policy** and applied consistently.`,
    },
    {
      kind: "table",
      caption: "Typical small-company depreciation policies (judgement for each client)",
      head: ["Asset class", "Typical policy"],
      rows: [
        ["Freehold land", "Not depreciated"],
        ["Freehold buildings", "2% straight line"],
        ["Leasehold improvements", "Over the lease term, straight line"],
        ["Plant and machinery", "15%–25% reducing balance or straight line"],
        ["Fixtures and fittings", "15%–25% reducing balance"],
        ["Motor vehicles", "25% reducing balance"],
        ["Computer equipment", "33⅓% straight line"],
      ],
    },
    {
      kind: "journal",
      title: "Annual depreciation charge",
      narrative: "Computer equipment costing £9,000, 33⅓% straight line, full year: charge £3,000.",
      lines: [
        { account: "Depreciation – computer equipment (P&L)", dr: 3000 },
        { account: "Computer equipment – accumulated depreciation", cr: 3000 },
      ],
    },
    {
      kind: "md",
      md: `### Disposals

When an asset is sold or scrapped, remove **both** its cost and its accumulated depreciation, record the proceeds, and the difference is a **profit or loss on disposal** in the profit and loss account:

> Profit/(loss) = proceeds − net book value at disposal

A "loss" on disposal is really extra depreciation: the asset was depreciated too slowly. A large profit suggests it was depreciated too quickly. Either can prompt a review of the policy.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common fixed asset errors at review",
      md: `- **Repairs capitalised** (or new assets expensed in repairs). Scan repairs and sundry codes for big invoices.
- **Disposals not recorded**: the van was traded in, but the old one is still on the FAR, often hidden because the trade-in value was netted off the new van's cost.
- **Finance agreements**: the asset is bought on hire purchase but only the monthly payments are posted to expenses.
- **VAT included in cost** for a VAT-registered client.
- **FAR doesn't agree to the TB.** Reconcile cost and accumulated depreciation for each class every year.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Tax: depreciation is added back",
      md: `Depreciation and accounting profits or losses on disposal are **not** tax deductible. In the tax computation they're added back (or deducted, for a profit) and replaced by **capital allowances**: the Annual Investment Allowance, first-year allowances and writing-down allowances (main pool WDA 14% from April 2026). Keep the FAR and the capital allowances computation as separate, reconciled schedules.`,
    },
  ],
  scenario: {
    title: "Year-end fixed assets for Ridgeway Landscapes Ltd",
    narrative: `Ridgeway Landscapes Ltd has a 31 March year end and a policy of **25% straight line** for plant and **25% reducing balance** for vehicles, charged **pro rata by month** from the date of purchase. Capitalisation threshold £500.

Bookkeeping for the year to 31 March 2026 shows:
1. A new mini-digger bought on 1 October 2025 for £30,000 + VAT, posted to plant cost (correct).
2. A ride-on mower bought on 1 April 2023 for £12,000 (plant), sold on 30 March 2026 for £4,500. The proceeds were posted to sales.
3. The company van (cost £20,000 in April 2024; NBV at 1 April 2025 £15,000).
4. A £1,800 invoice for a new engine for the existing tipper truck, coded to repairs.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Mini-digger**: 6 months' depreciation: £30,000 × 25% × 6/12 = **£3,750**.
2. **Mower disposal**: depreciation is £12,000 × 25% = £3,000 a year. It was held for the full years to 31 March 2024 and 2025, and (charging up to the month of disposal) for 12 months of the year to 31 March 2026. Accumulated depreciation at disposal: £9,000. NBV £3,000. Proceeds £4,500, so a **profit of £1,500**. The £4,500 posted to sales must be reversed out.
3. **Van**: 25% × £15,000 = **£3,750**. NBV carried forward £11,250.
4. **Engine**: a replacement engine that substantially extends the truck's life is arguably an improvement. If the firm's judgement is that it restores rather than enhances the truck, leave it in repairs. Document the decision either way: at £1,800 it's a judgement call, not an obvious error.`,
      },
      {
        kind: "journal",
        title: "Recording the mower disposal",
        narrative: "Remove cost and accumulated depreciation; move the proceeds out of sales; recognise the profit.",
        lines: [
          { account: "Plant – accumulated depreciation", dr: 9000 },
          { account: "Sales", dr: 4500 },
          { account: "Plant – cost", cr: 12000 },
          { account: "Profit on disposal of fixed assets", cr: 1500 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "part-year-depreciation",
      prompt:
        "A company with a 31 December year end buys a machine on 1 May 2026 for £18,000. Its policy is 20% straight line, charged pro rata by month from the date of purchase, nil residual value. What is the depreciation charge for the year ended 31 December 2026?",
      answer: 2400,
      unit: "£",
      explain: "Straight line on cost, pro rata for the 8 months the machine was held (May–December).",
      working: "£18,000 × 20% × 8/12 = **£2,400**.",
    },
    {
      kind: "numeric",
      id: "reducing-balance",
      prompt:
        "A car costing £28,000 is depreciated at 25% reducing balance with a full year's charge in the year of purchase. What is its net book value at the end of its third year?",
      answer: 11812.5,
      tolerance: 0.5,
      unit: "£",
      explain: "Apply 25% to the opening NBV each year.",
      working: "Year 1: £28,000 − £7,000 = £21,000. Year 2: £21,000 − £5,250 = £15,750. Year 3: £15,750 − £3,937.50 = **£11,812.50**.",
    },
    {
      kind: "journal",
      id: "disposal-journal",
      prompt:
        "A machine cost £18,000 and has accumulated depreciation of £12,600. It's sold for £4,000, received into the bank. Post the disposal in one journal.",
      accounts: [
        "Plant – cost",
        "Plant – accumulated depreciation",
        "Bank",
        "Loss on disposal of fixed assets",
        "Profit on disposal of fixed assets",
        "Sales",
        "Depreciation – plant (P&L)",
      ],
      answer: [
        { account: "Plant – accumulated depreciation", dr: 12600 },
        { account: "Bank", dr: 4000 },
        { account: "Loss on disposal of fixed assets", dr: 1400 },
        { account: "Plant – cost", cr: 18000 },
      ],
      explain: "NBV = £18,000 − £12,600 = £5,400. Proceeds £4,000, so a loss of £1,400. Cost and accumulated depreciation are both removed.",
    },
    {
      kind: "classify",
      id: "capitalise-or-expense",
      prompt: "A VAT-registered client with a £500 capitalisation threshold has these costs. Capitalise or expense?",
      categories: ["Capitalise", "Expense"],
      items: [
        { text: "New laptop, £1,100 + VAT", answer: 0 },
        { text: "Annual service of the company van, £380", answer: 1 },
        { text: "Delivery and installation of a new CNC machine, £2,400", answer: 0, why: "Directly attributable costs form part of cost." },
        { text: "Office chair, £180", answer: 1, why: "Below the capitalisation threshold." },
        { text: "Repainting the office walls, £1,600", answer: 1, why: "Maintenance, not an improvement." },
        { text: "Staff training on the new CNC machine, £900", answer: 1, why: "Training is never part of an asset's cost." },
      ],
      explain: "Capitalise items with a life beyond the period that exceed the threshold, including directly attributable costs. Repairs, maintenance and training are expensed.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-vat-cost",
      prompt: "A VAT-registered company buys equipment for £5,000 + £1,000 VAT. What cost goes on the fixed asset register?",
      options: ["£6,000", "£5,000", "£4,000", "£1,000"],
      answer: 1,
      explain: "Recoverable VAT isn't part of cost.",
    },
    {
      kind: "mcq",
      id: "q-land",
      prompt: "Is freehold land depreciated?",
      options: ["Yes, at 2%", "No, land normally has an unlimited useful life", "Only if revalued", "Only under FRS 105"],
      answer: 1,
      explain: "Land isn't depreciated; buildings on it are.",
    },
    {
      kind: "mcq",
      id: "q-disposal-profit",
      prompt: "An asset with an NBV of £2,000 is sold for £3,500. What is recorded?",
      options: ["A loss of £1,500", "A profit of £1,500", "A profit of £3,500", "No entry"],
      answer: 1,
      explain: "Proceeds £3,500 − NBV £2,000 = £1,500 profit.",
    },
    {
      kind: "mcq",
      id: "q-tax-dep",
      prompt: "How is depreciation treated in the corporation tax computation?",
      options: ["Deducted as charged", "Added back and replaced by capital allowances", "Deducted at double the rate", "Ignored, along with capital allowances"],
      answer: 1,
      explain: "Depreciation isn't an allowable deduction; capital allowances are claimed instead.",
    },
    {
      kind: "mcq",
      id: "q-trade-in",
      prompt: "A client trades in an old van against a new one and only the net cash paid is posted to vans cost. What's wrong?",
      options: [
        "Nothing",
        "The old van's cost and depreciation haven't been removed, and the new van's cost is understated",
        "The VAT is wrong",
        "Depreciation should be charged on the trade-in value",
      ],
      answer: 1,
      explain: "Record the new van at full cost, the trade-in as disposal proceeds of the old van, and remove the old van's cost and depreciation.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (Section 17 Property, plant and equipment)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income manual: capital v revenue expenditure (BIM35000)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim35000" },
    { label: "Capital allowances when you buy assets", url: "https://www.gov.uk/capital-allowances" },
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
  ],
};
