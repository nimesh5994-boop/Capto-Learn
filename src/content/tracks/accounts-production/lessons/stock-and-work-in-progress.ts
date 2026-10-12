import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "stock-and-work-in-progress",
  title: "Stock and work in progress",
  level: "foundation",
  minutes: 35,
  summary:
    "Valuing stock at the lower of cost and estimated selling price less costs to complete and sell, what goes into cost (including production overheads), FIFO and weighted average, cut-off, posting the closing stock adjustment, and how unbilled work for service businesses is treated.",
  objectives: [
    "Value stock item by item at the lower of cost and estimated selling price less costs to complete and sell",
    "Include the right costs (and exclude the wrong ones) in the cost of stock and WIP",
    "Post opening and closing stock adjustments and write-downs",
    "Check stock cut-off and challenge a client's stock figure",
  ],
  body: [
    {
      kind: "md",
      md: `For any business that sells goods, the closing stock figure moves profit pound for pound: overstate stock by £10,000 and profit is overstated by £10,000. It's also one of the easiest figures for a client to get wrong, or to adjust. Treat the stock figure as a key area, not a number you just type in.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The measurement rule (FRS 102 Section 13; FRS 105 equivalent)",
      md: `Stock (inventories) is measured at the **lower of cost and estimated selling price less costs to complete and sell**, assessed **item by item** (or by groups of similar items), not in total.

- **Cost** = costs of purchase + costs of conversion + other costs of bringing the stock to its present location and condition.
- **Cost formulas**: **FIFO** or **weighted average**. **LIFO is not permitted**. Specific identification for items that aren't interchangeable (e.g. cars, bespoke jobs).`,
    },
    {
      kind: "table",
      caption: "What's in cost and what isn't",
      head: ["Include", "Exclude"],
      rows: [
        ["Purchase price net of trade discounts and recoverable VAT", "Recoverable VAT"],
        ["Import duties, carriage inwards", "Carriage outwards (a selling cost)"],
        ["Direct labour and direct materials (manufacturers)", "Abnormal waste"],
        ["Production overheads, allocated on **normal** production capacity", "Selling, distribution and general admin overheads"],
        ["", "Storage costs (unless needed in the production process)"],
      ],
    },
    {
      kind: "md",
      md: `### Writing stock down

Stock is written down when the expected selling price less costs to complete and sell falls below cost: damaged, obsolete, slow-moving or out-of-season goods, or goods selling at a loss. Look for:
- stock lines with **no sales** in the last 6–12 months;
- **post year-end sales** at prices below cost;
- items damaged or past expiry at the count.`,
    },
    {
      kind: "journal",
      title: "Closing stock adjustment (periodic system)",
      narrative: "Opening stock of £42,000 is released to cost of sales and closing stock of £48,500 is carried forward. Many practices post this as two journals; the net effect is shown here as one.",
      lines: [
        { account: "Stock (balance sheet)", dr: 6500 },
        { account: "Cost of sales – stock movement", cr: 6500 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Cut-off",
      md: `Goods counted in stock must match the purchase invoices posted. Goods received before the year end with no invoice posted need an **accrual**; goods invoiced but not yet received (and not counted) shouldn't be in creditors without being in stock, or vice versa. On the sales side, goods despatched before the year end must be invoiced and excluded from stock. Check the last few delivery notes and despatch notes on each side of the year end.`,
    },
    {
      kind: "md",
      md: `### Work in progress and service businesses

- **Manufacturers**: WIP is part-finished goods, valued at cost of materials, labour and production overheads to date (subject to the same lower-of test).
- **Service businesses** (consultants, architects, accountants): unbilled work at the year end is usually **revenue** to be recognised as the service is performed, shown as **accrued income** (a contract asset), not as stock at cost. From periods beginning on or after 1 January 2026, FRS 102's new Section 23 five-step model governs this (see the revenue recognition lesson).
- **Construction contracts**: revenue and profit are recognised over time as the work progresses, where the conditions are met.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Questions to ask every stock client",
      md: `Who counted, when, and how? Is there a signed count sheet? Was anything held for customers or on sale or return? How is cost worked out? Which lines are slow-moving? What's the gross margin, and does the stock figure make it look unusual compared to last year? A margin that jumps by 5% often turns out to be a stock error.`,
    },
  ],
  scenario: {
    title: "Valuing stock at Oakfield Garden Supplies Ltd",
    narrative: `Oakfield Garden Supplies Ltd (year end 30 September 2026) sends its stock sheet. Items are valued at cost:

| Line | Qty | Cost each | Expected selling price each | Selling costs each |
|---|---:|---:|---:|---:|
| Ceramic planters | 200 | £18 | £35 | £2 |
| Garden furniture sets (last season's design) | 12 | £240 | £220 | £20 |
| Barbecues, some with damaged boxes | 30 | £90 | £110 | £30 |
| Compost bags | 500 | £4 | £7 | £0.50 |

The client's total at cost is £10,580.`,
    walkthrough: [
      {
        kind: "md",
        md: `Compare cost with selling price less costs to sell **line by line**:

- **Planters**: cost £18; net £33. Keep at cost: 200 × £18 = £3,600.
- **Furniture**: cost £240; net £200. Write down to £200: 12 × £200 = £2,400 (write-down £480).
- **Barbecues**: cost £90; net £80. Write down to £80: 30 × £80 = £2,400 (write-down £300).
- **Compost**: cost £4; net £6.50. Keep at cost: 500 × £4 = £2,000.`,
      },
      {
        kind: "table",
        caption: "Stock valuation at 30 September 2026",
        head: ["Line", "At cost", "Lower of cost and net selling price"],
        rows: [
          ["Planters", "£3,600", "£3,600"],
          ["Furniture", "£2,880", "£2,400"],
          ["Barbecues", "£2,700", "£2,400"],
          ["Compost", "£2,000", "£2,000"],
          ["**Total**", "**£11,180**", "**£10,400**"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "The client's own total didn't add up",
        md: `The client's sheet said £10,580, but the lines at cost add up to **£11,180**. Always re-cast the stock sheet. The correct closing stock is **£10,400** after write-downs of £780.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "nrv-lines",
      prompt:
        "A retailer has three stock lines: A: 100 units, cost £12, expected selling price £20, selling costs £1. B: 40 units, cost £50, selling price £48, selling costs £4. C: 60 units, cost £8, selling price £9, selling costs £2. What is the stock value?",
      answer: 3380,
      unit: "£",
      explain: "Apply the lower of cost and selling price less costs to sell to each line separately.",
      working: "A: cost £12 vs £19 → £1,200. B: cost £50 vs £44 → 40 × £44 = £1,760. C: cost £8 vs £7 → 60 × £7 = £420. Total £1,200 + £1,760 + £420 = **£3,380**.",
    },
    {
      kind: "numeric",
      id: "cost-with-overheads",
      prompt:
        "A furniture maker has 50 finished tables in stock. Each used £60 of timber and 4 hours of direct labour at £15 an hour. Production overheads are £120,000 a year at normal capacity of 20,000 labour hours. Selling and admin overheads are £80,000 a year. What is the cost of the 50 tables?",
      answer: 7200,
      unit: "£",
      explain: "Include materials, direct labour and production overheads absorbed on normal capacity. Exclude selling and admin overheads.",
      working: "Overhead rate £120,000 ÷ 20,000 = £6 per hour. Per table: £60 + (4 × £15) + (4 × £6) = £60 + £60 + £24 = £144. 50 × £144 = **£7,200**.",
    },
    {
      kind: "journal",
      id: "stock-writedown",
      prompt: "At the year end, stock costing £4,800 is found to be obsolete and can only be sold for scrap for £600. Post the write-down.",
      accounts: ["Cost of sales – stock write-down", "Stock (balance sheet)", "Trade debtors", "Sales", "Accruals", "Purchases"],
      answer: [
        { account: "Cost of sales – stock write-down", dr: 4200 },
        { account: "Stock (balance sheet)", cr: 4200 },
      ],
      explain: "Write the stock down from cost (£4,800) to its net realisable amount (£600): a write-down of £4,200, charged to cost of sales.",
    },
    {
      kind: "mcq",
      id: "lifo",
      prompt: "A client asks to value its stock using LIFO because prices are rising. What do you tell them?",
      options: ["That's fine under FRS 102", "LIFO isn't permitted; use FIFO, weighted average or specific identification", "Only under FRS 105", "Only for tax purposes"],
      answer: 1,
      explain: "FRS 102 Section 13 doesn't permit LIFO.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-stock-rule",
      prompt: "How is stock measured under FRS 102?",
      options: ["At selling price", "At the lower of cost and estimated selling price less costs to complete and sell", "At replacement cost", "At cost, always"],
      answer: 1,
      explain: "Section 13: lower of cost and estimated selling price less costs to complete and sell.",
    },
    {
      kind: "mcq",
      id: "q-carriage-out",
      prompt: "Is carriage outwards included in the cost of stock?",
      options: ["Yes", "No, it's a selling cost", "Only for manufacturers", "Only if material"],
      answer: 1,
      explain: "Carriage inwards is part of cost; carriage outwards is a distribution cost.",
    },
    {
      kind: "mcq",
      id: "q-item-by-item",
      prompt: "Should the lower-of-cost-and-net-selling-price test be applied to total stock or item by item?",
      options: ["Total stock", "Item by item (or groups of similar items)", "Either", "Only to the largest items"],
      answer: 1,
      explain: "Applying it in total would let gains on some lines hide losses on others.",
    },
    {
      kind: "mcq",
      id: "q-overstate",
      prompt: "Closing stock is overstated by £8,000. What's the effect on profit for the year?",
      options: ["Understated by £8,000", "Overstated by £8,000", "No effect", "Overstated by £16,000"],
      answer: 1,
      explain: "Higher closing stock means lower cost of sales and higher profit, pound for pound.",
    },
    {
      kind: "mcq",
      id: "q-service-wip",
      prompt: "An architect has £15,000 of unbilled work completed at the year end under contracts where revenue is recognised as the service is performed. How is it usually shown?",
      options: ["As stock at cost", "As accrued income (revenue recognised), subject to recoverability", "Not recognised until invoiced", "As a provision"],
      answer: 1,
      explain: "Unbilled services performed are revenue, recognised as accrued income (a contract asset).",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (Section 13 Inventories)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income manual: stock and work in progress (BIM33000)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33000" },
    { label: "FRC: FRS 105 The Financial Reporting Standard applicable to the Micro-entities Regime", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-105/" },
    { label: "Companies Act 2006 s386 – duty to keep accounting records (including stock statements)", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
  ],
};
