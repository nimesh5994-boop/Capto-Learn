import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "depreciation-and-disposals",
  title: "Depreciation and disposals",
  level: "practitioner",
  minutes: 40,
  summary:
    "Spreading the cost of a fixed asset over its useful life: straight-line and reducing-balance methods, residual values, part-year charges, the depreciation journal, and recording the sale or scrapping of an asset with a profit or loss on disposal.",
  objectives: [
    "Calculate straight-line and reducing-balance depreciation, including part-year charges",
    "Post the annual depreciation journal and keep a fixed asset register",
    "Record a disposal, including part-exchange, and calculate the profit or loss",
    "Explain why depreciation is added back for tax and replaced by capital allowances",
  ],
  body: [
    {
      kind: "md",
      md: `When a business buys a fixed asset, the cost goes on the balance sheet (as you saw in the last lesson). **Depreciation** is the way that cost is charged to profit over the years the asset is used. It's an application of the accruals concept: the van that earns income for four years should be charged against four years of profit, not one.

Depreciation is **not** a way of valuing the asset at market value, and it's **not** a cash movement. It's an allocation of cost.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The requirement",
      md: `Under FRS 102 section 17 the **depreciable amount** of an asset (cost less residual value) is allocated on a systematic basis over its **useful life**. The method should reflect the pattern in which the asset's benefits are consumed. Useful lives, residual values and methods should be reviewed if there's an indication they've changed. Land is not normally depreciated.`,
    },
    {
      kind: "table",
      caption: "The two methods you'll see most",
      head: ["Method", "Formula", "Typical use", "Pattern"],
      rows: [
        ["Straight line", "(Cost − residual value) ÷ useful life", "Buildings, fixtures, office equipment, computers", "Same charge every year"],
        ["Reducing balance", "Net book value (NBV) at start of year × %", "Vehicles, plant", "Higher charges early on, falling each year"],
      ],
    },
    {
      kind: "md",
      md: `### Worked examples

**Straight line:** a machine costs £45,000, has a residual value of £5,000 and a useful life of 8 years. Annual charge = (£45,000 − £5,000) ÷ 8 = **£5,000**.

**Reducing balance at 25%:** equipment costing £12,000.

| Year | NBV b/f | Charge (25%) | NBV c/f |
|---|---:|---:|---:|
| 1 | £12,000 | £3,000 | £9,000 |
| 2 | £9,000 | £2,250 | £6,750 |
| 3 | £6,750 | £1,687.50 | £5,062.50 |

**Part years:** firms either charge a **full year in the year of acquisition and none in the year of disposal**, or charge **monthly (pro rata)**. Both are acceptable. Check the client's policy in last year's accounts and apply it consistently.`,
    },
    {
      kind: "journal",
      title: "The annual depreciation journal",
      narrative: "Depreciation never touches the asset's cost account. It builds up in a separate accumulated depreciation account, so the balance sheet shows cost, accumulated depreciation and NBV.",
      lines: [
        { account: "Depreciation expense", dr: 5000 },
        { account: "Plant and machinery – accumulated depreciation", cr: 5000 },
      ],
    },
    {
      kind: "md",
      md: `### Disposals

When an asset is sold, scrapped or part-exchanged, remove both its **cost** and its **accumulated depreciation** from the books, record the proceeds, and the balancing figure is the **profit or loss on disposal**. A disposal account makes this easy:

1. Dr Disposals, Cr Asset – cost (transfer the original cost)
2. Dr Asset – accumulated depreciation, Cr Disposals (transfer depreciation to date)
3. Dr Bank (or Trade receivables), Cr Disposals (proceeds, net of any output VAT)
4. Balance on the disposal account: a debit balance is a **loss**, a credit balance is a **profit**

A profit or loss on disposal is really just a correction of past depreciation: it means the asset was depreciated too slowly or too quickly.

**Part-exchange:** the trade-in value is the disposal proceeds of the old asset and part of the payment for the new one: Dr New asset – cost (full price), Cr Disposals (trade-in allowance), Cr Bank/creditor (the balance paid).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Crediting the sale proceeds to Sales.** Selling a used van isn't trading income. It goes to the disposal account.
- **Leaving the cost and depreciation on the books** after the asset has gone. The fixed asset register and the TB then show assets that no longer exist.
- **Forgetting output VAT** on the sale of a van or equipment (cars on which input tax was blocked are usually exempt on sale). The disposal proceeds are the **net** amount.
- **Depreciating land**, or depreciating an asset below its residual value.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Depreciation and tax",
      md: `Depreciation and profits or losses on disposal are **not** allowable or taxable for income tax or corporation tax. They're added back (or deducted) in the tax computation, and **capital allowances** are given instead. So for tangible fixed assets, don't agonise over the tax effect of a depreciation policy: it has none. (Companies' intangible fixed assets are different: their amortisation is generally deductible following the accounts, which is outside this lesson.) Do keep the fixed asset register tidy, because it drives the capital allowance computation and balancing adjustments.`,
    },
  ],
  scenario: {
    title: "Kestrel Couriers sells a van",
    narrative: `**Kestrel Couriers Ltd** has a 30 June year end and depreciates vans **straight line over 4 years**, with a residual value estimate, **pro rata by month**.

One van was bought on **1 July 2023** for **£28,000** (net of VAT), with an estimated residual value of **£4,000**. It was sold on **30 June 2026** for **£9,500** plus VAT, paid into the bank.

The director, Martin, asks: *"We sold it for nine and a half grand. Is that a profit?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: annual depreciation.** (£28,000 − £4,000) ÷ 4 = **£6,000** a year.

**Step 2: depreciation to the date of sale.** The van was owned for exactly three full years (to 30 June 2024, 2025 and 2026): 3 × £6,000 = **£18,000**.

**Step 3: NBV at disposal.** £28,000 − £18,000 = **£10,000**.

**Step 4: compare with proceeds.** £9,500 − £10,000 = **loss of £500**.

So the answer to Martin is no: the van sold for £500 less than its book value. The business had depreciated it slightly too slowly.`,
      },
      {
        kind: "table",
        caption: "Disposal account",
        head: ["Debit", "£", "Credit", "£"],
        rows: [
          ["Motor vehicles – cost", "28,000", "Motor vehicles – accumulated depreciation", "18,000"],
          ["", "", "Bank (proceeds, net of VAT)", "9,500"],
          ["", "", "Loss on disposal (to P&L)", "500"],
          ["**Total**", "**28,000**", "**Total**", "**28,000**"],
        ],
      },
      {
        kind: "journal",
        title: "The same disposal as one compound journal",
        narrative: "Output VAT on the £9,500 would be posted separately (Dr Bank, Cr VAT control) as part of recording the sale invoice.",
        lines: [
          { account: "Bank", dr: 9500 },
          { account: "Motor vehicles – accumulated depreciation", dr: 18000 },
          { account: "Profit or loss on disposal", dr: 500 },
          { account: "Motor vehicles – cost", cr: 28000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "part-year-straight-line",
      prompt:
        "A client with a 31 December year end buys a machine on **1 October** for **£45,000**. Residual value **£5,000**, useful life **8 years**, straight line, charged **monthly**. What is the depreciation charge in the year of purchase?",
      answer: 1250,
      unit: "£",
      explain: "Work out the annual charge, then time-apportion for the 3 months owned (October to December).",
      working: "(£45,000 − £5,000) ÷ 8 = £5,000 a year × 3/12 = **£1,250**",
    },
    {
      kind: "numeric",
      id: "reducing-balance-year-3",
      prompt: "Equipment costing **£20,000** is depreciated at **30% reducing balance**, with a full year's charge in the year of purchase. What is the charge in **year 3**?",
      answer: 2940,
      unit: "£",
      explain: "Apply the percentage to the opening NBV each year, not to cost.",
      working: `Year 1: £20,000 × 30% = £6,000 → NBV £14,000

Year 2: £14,000 × 30% = £4,200 → NBV £9,800

Year 3: £9,800 × 30% = **£2,940**`,
    },
    {
      kind: "journal",
      id: "disposal-journal",
      prompt:
        "A car that cost **£16,000** with accumulated depreciation of **£11,000** is sold for **£4,200**, received into the bank. (Input VAT was blocked when it was bought, so the sale is exempt and there's no VAT.) Post the disposal as one journal.",
      accounts: ["Bank", "Motor vehicles – cost", "Motor vehicles – accumulated depreciation", "Profit or loss on disposal", "Sales", "VAT control", "Depreciation expense"],
      answer: [
        { account: "Bank", dr: 4200 },
        { account: "Motor vehicles – accumulated depreciation", dr: 11000 },
        { account: "Profit or loss on disposal", dr: 800 },
        { account: "Motor vehicles – cost", cr: 16000 },
      ],
      explain:
        "Remove the cost (credit) and the accumulated depreciation (debit), record the cash (debit). NBV was £5,000 and proceeds £4,200, so there's a £800 loss, a debit to the P&L. The proceeds are not Sales.",
    },
    {
      kind: "numeric",
      id: "profit-on-disposal",
      prompt:
        "Office equipment cost **£8,000**. The policy is 20% straight line (no residual value), a full year's charge in the year of purchase and none in the year of disposal. It was sold early in its **fourth** year of ownership for **£3,800**. What is the **profit** on disposal?",
      answer: 600,
      unit: "£",
      explain: "Three full years of depreciation were charged before the year of disposal.",
      working: `Annual charge: £8,000 × 20% = £1,600 × 3 years = £4,800

NBV: £8,000 − £4,800 = £3,200

Profit: £3,800 − £3,200 = **£600**`,
    },
    {
      kind: "mcq",
      id: "why-depreciate",
      prompt: "A director says: *\"Why charge depreciation? The van's worth more than you've got it at.\"* What's the best reply?",
      options: [
        "Depreciation is required so HMRC can give tax relief",
        "Depreciation allocates the van's cost over the years it earns income; it's not a valuation",
        "We'll revalue the van to market value each year instead",
        "Depreciation is only needed for audited companies",
      ],
      answer: 1,
      explain:
        "Depreciation is cost allocation under the accruals concept, not valuation. For tangible fixed assets it has no tax effect; capital allowances apply instead. It applies to all accounts prepared under FRS 102 or FRS 105, audited or not.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sl-formula",
      prompt: "Straight-line depreciation is calculated as:",
      options: ["NBV × rate", "(Cost − residual value) ÷ useful life", "Cost ÷ market value", "Proceeds − NBV"],
      answer: 1,
      explain: "Straight line spreads the depreciable amount evenly over the useful life.",
    },
    {
      kind: "mcq",
      id: "q-dep-journal",
      prompt: "What is the double entry for the annual depreciation charge?",
      options: [
        "Dr Asset – cost, Cr Depreciation expense",
        "Dr Depreciation expense, Cr Accumulated depreciation",
        "Dr Depreciation expense, Cr Bank",
        "Dr Accumulated depreciation, Cr Asset – cost",
      ],
      answer: 1,
      explain: "Depreciation is a non-cash expense; the credit builds up in accumulated depreciation, leaving the cost account untouched.",
    },
    {
      kind: "mcq",
      id: "q-disposal-balance",
      prompt: "After posting cost, accumulated depreciation and proceeds, the disposal account has a credit balance of £700. This is:",
      options: ["A loss of £700", "A profit of £700", "Proceeds still to be received", "An error"],
      answer: 1,
      explain: "Credits (depreciation and proceeds) exceeded the cost transferred in, so the asset was sold for more than its NBV: a profit.",
    },
    {
      kind: "mcq",
      id: "q-tax",
      prompt: "In a company's corporation tax computation, depreciation is:",
      options: ["Deductible in full", "Added back, with capital allowances claimed instead", "Deductible at 50%", "Ignored, with no capital allowances"],
      answer: 1,
      explain: "Depreciation isn't an allowable deduction; capital allowances replace it.",
    },
    {
      kind: "mcq",
      id: "q-part-exchange",
      prompt: "A new van costs £30,000; the old van is traded in for £6,000 and the balance paid in cash. What is credited to the disposal account?",
      options: ["£30,000", "£24,000", "£6,000", "Nothing"],
      answer: 2,
      explain: "The part-exchange allowance is the disposal proceeds of the old van. The new van is capitalised at its full £30,000 cost.",
    },
    {
      kind: "mcq",
      id: "q-land",
      prompt: "Which asset is not normally depreciated?",
      options: ["Freehold land", "Office furniture", "Delivery vans", "Computer equipment"],
      answer: 0,
      explain: "Land normally has an unlimited useful life, so it isn't depreciated. Buildings on it are.",
    },
  ],
  sources: [
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income Manual BIM31060 – property, plant and equipment", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31060" },
    { label: "HMRC Capital Allowances Manual CA20006 – plant and machinery allowances: outline", url: "https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca20006" },
    { label: "GOV.UK – Annual Investment Allowance", url: "https://www.gov.uk/capital-allowances/annual-investment-allowance" },
    { label: "HMRC CIRD12755 – intangible assets: accounts-based relief for amortisation", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird12755" },
  ],
};
