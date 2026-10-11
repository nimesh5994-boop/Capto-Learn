import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "incomplete-records",
  title: "Incomplete records",
  level: "advanced",
  minutes: 40,
  summary:
    "Rebuilding a set of accounts when the client hasn't kept proper books: the net assets approach, reconstructing sales and purchases from control accounts, finding missing figures with mark-up and margin, and estimating cash drawings or lost stock.",
  objectives: [
    "Calculate profit from opening and closing net assets",
    "Reconstruct sales and purchases using control-account logic",
    "Use mark-up and margin to find a missing sales, cost of sales or inventory figure",
    "Find missing cash drawings or stock losses, and know when to raise a concern",
  ],
  body: [
    {
      kind: "md",
      md: `Plenty of small clients arrive with a carrier bag of receipts, some bank statements and a vague memory. **Incomplete records** work is the craft of building reliable accounts from that. You use the same double entry, but instead of posting transactions forward, you **work backwards** from what you can prove to the figures you're missing.

Your toolkit:

1. **The accounting equation and net assets**
2. **Control accounts** (for receivables, payables, cash)
3. **Gross profit percentages** (mark-up and margin)
4. **A bank and cash summary**`,
    },
    {
      kind: "md",
      md: `### 1. The net assets approach

If all you can establish is what the business owned and owed at the start and end of the year, profit can still be found, because capital changes only through profit, capital introduced and drawings:

> **Profit** = closing net assets − opening net assets + drawings − capital introduced

It gives you one profit figure but no detail, so use it as a check or a last resort.`,
    },
    {
      kind: "md",
      md: `### 2. Control account logic

Any account balances. If you know three of opening balance, increases, decreases and closing balance, you can find the fourth.

> **Credit sales** = receipts from customers + closing receivables − opening receivables (+ irrecoverable debts and discounts allowed)
>
> **Credit purchases** = payments to suppliers + closing payables − opening payables (+ discounts received)

### 3. Mark-up and margin

- **Mark-up** is gross profit as a percentage of **cost**.
- **Margin** is gross profit as a percentage of **sales**.

| | Mark-up 25% | Margin 20% |
|---|---:|---:|
| Cost | 100 | 80 |
| Gross profit | 25 | 20 |
| Sales | 125 | 100 |

The same transaction: a 25% mark-up is a 20% margin. Getting these confused is the most common incomplete-records error.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Converting between them",
      md: `Margin = mark-up ÷ (1 + mark-up). Mark-up = margin ÷ (1 − margin). So 50% mark-up = 33⅓% margin; 25% margin = 33⅓% mark-up.`,
    },
    {
      kind: "md",
      md: `### 4. The cash summary

Small cash businesses often bank some takings and spend the rest: on stock, wages, or the owner's own living costs. Build a cash account: cash takings in, then everything paid out of the till (bankings, cash purchases, cash expenses, the closing float). The balancing figure on the payments side is usually **cash drawings** that were never recorded.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When the numbers don't make sense",
      md: `If reconstructed drawings are implausibly low (say £2,000 a year for a family of four with no other income), takings are probably being under-recorded. That's a tax risk HMRC actively looks for using business economics benchmarks. Don't just accept the figures: ask the client how they lived, document their answers, and raise any concern with your manager. Under the Money Laundering Regulations, a suspicion of undeclared income can trigger reporting duties.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The client must keep records",
      md: `Self-employed people must keep records of all sales and income and all business expenses, and keep them for at least 5 years after the 31 January submission deadline for the tax year. If records are lost, best estimates can be used, but HMRC must be told they're estimates. Note any reconstruction method on file and in the client's letter of representation.`,
    },
  ],
  scenario: {
    title: "Rebuilding the accounts for Okafor Kitchenware",
    narrative: `**Bea Okafor** runs a kitchenware stall at two weekly markets as a sole trader. All her sales are in cash. She banks most of the takings, pays some suppliers in cash from the till, and takes cash for herself when she needs it, but she hasn't recorded how much. You have her bank statements and the following for the year to **31 March 2026**:

| | 1 April 2025 | 31 March 2026 |
|---|---:|---:|
| Inventory | £6,200 | £7,100 |
| Owed to suppliers | £2,400 | £3,100 |
| Van at NBV | £8,000 | ? |
| Bank | £1,500 | ? |
| Cash float | £200 | £200 |

**From the bank statements:** takings banked £61,400; payments to suppliers £38,900; pitch rent £4,800; van expenses £2,700; transfers to Bea's personal account £9,000.

**Also:** suppliers paid in cash from the till £1,300. Bea marks up all goods by **60% on cost**. The van is depreciated at 25% reducing balance.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: purchases (control account logic).** Payments by bank £38,900 + closing payables £3,100 − opening payables £2,400 = £39,600 on credit. Add cash purchases £1,300: **total purchases £40,900**.

**Step 2: cost of sales.** £6,200 + £40,900 − £7,100 = **£40,000**.

**Step 3: sales from the mark-up.** £40,000 × 1.6 = **£64,000**. Gross profit £24,000.

**Step 4: cash account to find cash drawings.**`,
      },
      {
        kind: "table",
        caption: "Cash (till) account",
        head: ["Receipts", "£", "Payments", "£"],
        rows: [
          ["Float b/f", "200", "Takings banked", "61,400"],
          ["Cash takings", "64,000", "Cash purchases", "1,300"],
          ["", "", "Cash drawings (balancing figure)", "1,300"],
          ["", "", "Float c/f", "200"],
          ["**Total**", "**64,200**", "**Total**", "**64,200**"],
        ],
      },
      {
        kind: "md",
        md: `**Step 5: bank balance.** £1,500 + £61,400 − £38,900 − £4,800 − £2,700 − £9,000 = **£7,500**.

**Step 6: profit.** Gross profit £24,000 − pitch rent £4,800 − van expenses £2,700 − depreciation (£8,000 × 25% = £2,000) = **£14,500**.

**Step 7: prove it with net assets.**

| | Opening | Closing |
|---|---:|---:|
| Inventory | 6,200 | 7,100 |
| Van | 8,000 | 6,000 |
| Bank | 1,500 | 7,500 |
| Cash | 200 | 200 |
| Payables | (2,400) | (3,100) |
| **Net assets** | **13,500** | **17,700** |

Profit = £17,700 − £13,500 + drawings (£9,000 + £1,300 = £10,300) = **£14,500** ✓

Both methods agree. Total drawings of £10,300 for the year is low for someone with no other income: ask Bea how she met her living costs before finalising.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "net-assets-profit",
      prompt: "A sole trader's net assets were **£22,000** at the start of the year and **£27,500** at the end. Drawings were **£18,000** and she paid in **£5,000** of an inheritance during the year. What was the profit?",
      answer: 18500,
      unit: "£",
      explain: "Net assets went up £5,500. Drawings took value out (so profit was higher than the increase); capital introduced put value in that wasn't profit (so deduct it).",
      working: "£27,500 − £22,000 + £18,000 − £5,000 = **£18,500**",
    },
    {
      kind: "numeric",
      id: "sales-from-margin",
      prompt: "Cost of sales is **£45,000** and the business earns a **25% gross margin**. What are sales?",
      answer: 60000,
      unit: "£",
      explain: "Margin is a percentage of sales, so cost is 75% of sales.",
      working: "£45,000 ÷ 0.75 = **£60,000** (gross profit £15,000 = 25% of £60,000)",
    },
    {
      kind: "numeric",
      id: "stock-lost",
      prompt: "A shop's stock was stolen in a break-in at the year end. Opening inventory **£12,000**; purchases **£50,000**; sales **£72,000**; mark-up **50% on cost**. Stock remaining after the break-in was counted at **£9,500**. What was the cost of the stock stolen?",
      answer: 4500,
      unit: "£",
      explain: "Use the mark-up to find what cost of sales should have been, then the stock that should have been left.",
      working: `Cost of sales: £72,000 ÷ 1.5 = £48,000

Expected closing stock: £12,000 + £50,000 − £48,000 = £14,000

Stolen: £14,000 − £9,500 = **£4,500**`,
    },
    {
      kind: "numeric",
      id: "credit-sales",
      prompt: "Opening receivables **£4,300**; closing receivables **£5,100**; cash received from credit customers **£52,600**; a debt of **£400** was written off. What were credit sales for the year?",
      answer: 53800,
      unit: "£",
      explain: "Reconstruct the receivables control account: sales are the missing debit.",
      working: "Sales = £52,600 + £400 + £5,100 − £4,300 = **£53,800**",
    },
    {
      kind: "mcq",
      id: "margin-to-markup",
      prompt: "A business makes a 20% gross margin. What is its mark-up?",
      options: ["20%", "16.7%", "25%", "120%"],
      answer: 2,
      explain: "Mark-up = margin ÷ (1 − margin) = 0.20 ÷ 0.80 = 25%. On cost of £80, profit £20 is 25% of cost and 20% of the £100 sales.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-net-assets-formula",
      prompt: "Profit using the net assets approach is:",
      options: [
        "Closing net assets − opening net assets − drawings + capital introduced",
        "Closing net assets − opening net assets + drawings − capital introduced",
        "Opening net assets + drawings",
        "Closing capital − drawings",
      ],
      answer: 1,
      explain: "Drawings reduced net assets without being a loss, so add them back; capital introduced increased them without being profit, so deduct it.",
    },
    {
      kind: "mcq",
      id: "q-markup-sales",
      prompt: "Cost of sales £30,000; mark-up 40%. Sales are:",
      options: ["£42,000", "£50,000", "£12,000", "£21,429"],
      answer: 0,
      explain: "Mark-up is on cost: £30,000 × 1.4 = £42,000.",
    },
    {
      kind: "mcq",
      id: "q-cash-balancing",
      prompt: "In a reconstructed cash account for a cash business, the balancing figure on the payments side is usually:",
      options: ["Sales", "Unrecorded cash drawings", "Bank charges", "Closing inventory"],
      answer: 1,
      explain: "Once takings, bankings and known cash payments are entered, unexplained cash out is usually the owner's drawings.",
    },
    {
      kind: "mcq",
      id: "q-purchases",
      prompt: "Payments to suppliers £20,000; opening payables £3,000; closing payables £4,500. Credit purchases are:",
      options: ["£18,500", "£20,000", "£21,500", "£27,500"],
      answer: 2,
      explain: "£20,000 + £4,500 − £3,000 = £21,500.",
    },
    {
      kind: "mcq",
      id: "q-low-drawings",
      prompt: "Your reconstruction shows drawings of £3,000 for the year, and the client has no other income. What should you do?",
      options: [
        "Accept it; the numbers balance",
        "Ask how the client met their living costs, document the answers, and raise any concern with your manager",
        "Increase sales by an estimate without telling anyone",
        "Report to HMRC immediately",
      ],
      answer: 1,
      explain: "Implausibly low drawings suggest under-recorded takings. Investigate and document; escalate internally first.",
    },
  ],
  sources: [
    { label: "GOV.UK – Business records if you're self-employed", url: "https://www.gov.uk/self-employed-records" },
    { label: "GOV.UK – How long to keep your records (self-employed)", url: "https://www.gov.uk/self-employed-records/how-long-to-keep-your-records" },
    { label: "HMRC Enquiry Manual EM3000 – examining accounts: records which may identify risks", url: "https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em3000" },
    { label: "GOV.UK – Money Laundering Regulations: your responsibilities", url: "https://www.gov.uk/guidance/money-laundering-regulations-your-responsibilities" },
  ],
};
