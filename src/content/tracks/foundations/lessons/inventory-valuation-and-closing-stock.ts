import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "inventory-valuation-and-closing-stock",
  title: "Inventory valuation and closing stock",
  level: "practitioner",
  minutes: 35,
  summary:
    "Valuing stock at the lower of cost and net realisable value, what counts as cost, FIFO and weighted average, stocktake cut-off, the closing stock journal and how it flows into cost of sales and gross profit.",
  objectives: [
    "Value inventory item by item at the lower of cost and net realisable value",
    "Identify which costs are included in inventory cost",
    "Apply FIFO to find a closing stock value",
    "Post the closing inventory journal and calculate cost of sales and gross profit",
  ],
  body: [
    {
      kind: "md",
      md: `Most trading businesses buy goods during the year and still have some left at the year end. Those goods haven't been sold, so their cost belongs to **next** year: it's carried forward as an asset, **inventory** (stock), and taken out of this year's cost of sales.

> **Cost of sales** = opening inventory + purchases − closing inventory
>
> **Gross profit** = sales − cost of sales

Because closing inventory goes straight into profit, every £1 of overvalued stock is £1 of overstated profit. It's also one of the easiest figures for a client to manipulate, so it gets close attention from reviewers and HMRC.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Lower of cost and net realisable value",
      md: `Under FRS 102 section 13, inventories are measured at the **lower of cost and estimated selling price less costs to complete and sell** (net realisable value, NRV). The comparison is made **item by item** (or for groups of similar items), not for the stock as a whole. LIFO is not permitted; FIFO and weighted average are. HMRC follows the same principle for tax (BIM33115, BIM33120).`,
    },
    {
      kind: "table",
      caption: "What goes into the cost of inventory",
      head: ["Cost", "Include?", "Why"],
      rows: [
        ["Purchase price (after trade discounts)", "Yes", "Cost of acquiring the goods"],
        ["Import duty and non-recoverable taxes", "Yes", "Part of acquisition cost"],
        ["Carriage inwards (delivery to the business)", "Yes", "Bringing goods to their present location"],
        ["Direct labour and production overheads (manufacturers)", "Yes", "Costs of conversion"],
        ["Recoverable VAT", "No", "Reclaimed from HMRC"],
        ["Carriage outwards (delivery to customers)", "No", "A selling cost"],
        ["Storage of finished goods, selling and admin costs", "No", "Not needed to bring goods to present location and condition"],
        ["Abnormal waste", "No", "Expensed as incurred"],
      ],
    },
    {
      kind: "md",
      md: `### FIFO and weighted average

When identical items are bought at different prices, you need a cost-flow assumption:

- **FIFO (first in, first out):** the oldest stock is assumed to be sold first, so closing stock is valued at the **most recent** prices.
- **Weighted average:** each item is valued at the average cost of all units available.

Example: 100 units bought at £5 and later 200 at £6; 220 units sold. Under FIFO the 80 units left are all from the later batch: 80 × £6 = **£480**.`,
    },
    {
      kind: "journal",
      title: "Recording closing inventory",
      narrative: "In most systems, closing stock is posted as a journal at the year end and reversed on the first day of the next year, so it becomes the opening stock in next year's cost of sales.",
      lines: [
        { account: "Inventory (balance sheet)", dr: 48800 },
        { account: "Cost of sales – closing inventory", cr: 48800 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Stocktake cut-off",
      md: `The stock count must match the paperwork. Goods **received** before the year end should be in the count **and** the supplier invoice in purchases (or accrued). Goods **dispatched** to customers before the year end should be out of the count **and** the sale invoiced. If an invoice is in the books but the goods weren't counted (or vice versa), profit is wrong by the full amount. Ask about goods in transit, goods held for customers, and stock held at other sites or on consignment.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Questions to ask the client",
      md: `- When was the count done, and by whom? Get the count sheets.
- Are there slow-moving, damaged or obsolete lines? What are they selling for now?
- How was cost worked out: latest invoice price, average, or selling price less margin? (Selling price is not cost.)
- Were any goods received or dispatched on the count day?

Companies must keep statements of stock held at the year end and the stocktakes used to prepare them (Companies Act 2006 s386 and HMRC record-keeping guidance).`,
    },
  ],
  scenario: {
    title: "Oakfield Garden Supplies' year-end stock",
    narrative: `**Oakfield Garden Supplies Ltd** runs a garden centre with a **31 March 2026** year end. The manager, Dev, has sent the stocktake summary: **£48,600 at cost**. He also mentions:

1. **40 solar water features** included at cost of **£150** each. After a bad season they're now priced at **£130**, and the centre pays a **£10** per unit delivery charge on each one sold.
2. **100 bags of compost** at **£6** each cost were water-damaged in a leak and will be thrown away.
3. A delivery of bedding plants costing **£2,000** arrived on 30 March, after the count had been done on 29 March. The supplier invoice is posted in March purchases. Dev confirms none of them were sold before the year end.

Opening inventory at 1 April 2025 was **£41,200**; purchases for the year (including the bedding plants) were **£186,400**; sales were **£286,000**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Water features:** cost £150; NRV = £130 − £10 = £120. Value at the lower: £120 × 40 = £4,800 against cost £6,000, a write-down of **£1,200**.

**Compost:** NRV is nil. Write down **£600**.

**Bedding plants:** the invoice is in purchases, so the stock must be included too, otherwise cost of sales is overstated by £2,000. Add **£2,000**. (In a real roll-forward from the count date to the year end you would also deduct the cost of any goods sold between the two dates.)`,
      },
      {
        kind: "table",
        caption: "Adjusted closing inventory",
        head: ["", "£"],
        rows: [
          ["Stocktake at cost", "48,600"],
          ["Water features written down to NRV", "(1,200)"],
          ["Damaged compost written off", "(600)"],
          ["Goods received after the count, invoice already posted", "2,000"],
          ["**Closing inventory**", "**48,800**"],
        ],
      },
      {
        kind: "table",
        caption: "Gross profit",
        head: ["", "£"],
        rows: [
          ["Sales", "286,000"],
          ["Opening inventory", "41,200"],
          ["Purchases", "186,400"],
          ["Less closing inventory", "(48,800)"],
          ["Cost of sales", "178,800"],
          ["**Gross profit**", "**107,200**"],
        ],
      },
      {
        kind: "md",
        md: `Gross margin = £107,200 ÷ £286,000 = **37.5%**. Compare it with last year: a sudden jump in margin often means stock has been overvalued or purchases are missing.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "lower-of-cost-nrv",
      prompt: `Value this closing inventory under FRS 102.

| Line | Cost | NRV |
|---|---:|---:|
| A | £2,000 | £2,600 |
| B | £1,500 | £1,100 |
| C | £3,200 | £3,000 |`,
      answer: 6100,
      unit: "£",
      explain: "Compare item by item and take the lower of each. Comparing the totals (£6,700 cost vs £6,700 NRV) would hide the losses on B and C behind the gain on A, which isn't allowed.",
      working: "A £2,000 (cost) + B £1,100 (NRV) + C £3,000 (NRV) = **£6,100**",
    },
    {
      kind: "numeric",
      id: "fifo-closing",
      prompt: "A shop starts the month with **100 units at £5**. It buys **200 units at £6**, then sells **220 units**. Using FIFO, what is the value of closing inventory?",
      answer: 480,
      unit: "£",
      explain: "FIFO assumes the oldest units are sold first, so the remaining stock comes from the latest purchase.",
      working: "Units left: 100 + 200 − 220 = 80. All 80 come from the £6 batch: 80 × £6 = **£480**.",
    },
    {
      kind: "journal",
      id: "closing-stock-journal",
      prompt: "A client's closing inventory at the year end has been valued at **£23,750**. Post the year-end journal.",
      accounts: ["Inventory (balance sheet)", "Cost of sales – closing inventory", "Purchases", "Sales", "Trade payables", "Suspense"],
      answer: [
        { account: "Inventory (balance sheet)", dr: 23750 },
        { account: "Cost of sales – closing inventory", cr: 23750 },
      ],
      explain: "Closing stock is an asset (debit) and reduces cost of sales (credit), increasing gross profit. It isn't a reduction of Purchases directly; keeping a separate closing-inventory line makes the cost of sales calculation visible.",
    },
    {
      kind: "numeric",
      id: "gross-profit",
      prompt: "Sales **£250,000**; opening inventory **£30,000**; purchases **£160,000**; closing inventory **£35,000**. What is gross profit?",
      answer: 95000,
      unit: "£",
      explain: "Cost of sales = opening + purchases − closing.",
      working: "Cost of sales = £30,000 + £160,000 − £35,000 = £155,000. Gross profit = £250,000 − £155,000 = **£95,000**.",
    },
    {
      kind: "classify",
      id: "classify-inventory-cost",
      prompt: "A VAT-registered furniture maker is valuing its finished stock. Include each cost in inventory or not?",
      categories: ["Include in cost", "Exclude"],
      items: [
        { text: "Timber purchase price", answer: 0 },
        { text: "Carriage inwards on timber deliveries", answer: 0 },
        { text: "Wages of the joiners who made the furniture", answer: 0, why: "Direct labour is a cost of conversion." },
        { text: "Delivery van costs taking furniture to customers", answer: 1, why: "Carriage outwards is a selling cost." },
        { text: "VAT on timber invoices", answer: 1, why: "Recoverable, so not a cost." },
        { text: "Showroom staff salaries", answer: 1, why: "Selling cost." },
      ],
      explain: "Cost is everything needed to bring the goods to their present location and condition: purchase, conversion and inward delivery. Selling, distribution and recoverable VAT are excluded.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-overvalue",
      prompt: "Closing inventory is overstated by £5,000. The effect on this year's profit is:",
      options: ["Understated by £5,000", "Overstated by £5,000", "No effect", "Overstated by £10,000"],
      answer: 1,
      explain: "Higher closing stock means lower cost of sales and higher profit. Next year's profit will be understated by the same amount, because it becomes opening stock.",
    },
    {
      kind: "mcq",
      id: "q-nrv",
      prompt: "An item cost £80. It can be sold for £90 after repairs costing £15. At what value should it be included?",
      options: ["£80", "£90", "£75", "£65"],
      answer: 2,
      explain: "NRV = £90 − £15 = £75, which is lower than cost of £80.",
    },
    {
      kind: "mcq",
      id: "q-lifo",
      prompt: "Which cost-flow method is NOT permitted under FRS 102?",
      options: ["FIFO", "Weighted average", "LIFO", "Specific identification for unique items"],
      answer: 2,
      explain: "LIFO isn't permitted under FRS 102, and HMRC doesn't accept it for tax either (BIM33120).",
    },
    {
      kind: "mcq",
      id: "q-carriage",
      prompt: "Carriage outwards is:",
      options: ["Included in inventory cost", "A selling/distribution expense", "Deducted from sales", "Capitalised as a fixed asset"],
      answer: 1,
      explain: "Delivering goods to customers is a distribution cost, charged as an expense, not part of inventory.",
    },
    {
      kind: "mcq",
      id: "q-cut-off",
      prompt: "Goods costing £3,000 arrived and were counted before the year end, but the supplier invoice was posted after the year end and not accrued. Effect on profit?",
      options: ["Understated by £3,000", "Overstated by £3,000", "No effect", "Overstated by £6,000"],
      answer: 1,
      explain: "Closing stock includes the goods, but purchases don't, so cost of sales is £3,000 too low and profit £3,000 too high. Accrue the invoice.",
    },
  ],
  sources: [
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income Manual BIM33115 – stock: valuation bases", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33115" },
    { label: "HMRC Business Income Manual BIM33120 – stock: FIFO not LIFO", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33120" },
    { label: "GOV.UK – Running a limited company: company and accounting records (stock and stocktakes)", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
  ],
};
