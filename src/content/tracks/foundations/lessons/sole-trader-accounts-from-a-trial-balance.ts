import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "sole-trader-accounts-from-a-trial-balance",
  title: "Sole trader accounts from a trial balance",
  level: "advanced",
  minutes: 45,
  summary:
    "Turning a sole trader's trial balance and year-end adjustments into an income statement and balance sheet: closing stock, depreciation, accruals, prepayments, private use, and the capital account reconciliation that proves it all ties up.",
  objectives: [
    "Lay out a sole trader's income statement and statement of financial position",
    "Process the standard year-end adjustments from a list of notes",
    "Deal with private use and drawings correctly",
    "Reconcile opening capital to closing capital as a check on the whole set",
  ],
  body: [
    {
      kind: "md",
      md: `Everything in this track so far comes together here. You start with a trial balance and a list of year-end notes; you finish with a set of accounts the client signs and the figures for their self-assessment return.

A sole trader's accounts have two main statements:

- **Income statement** (profit and loss account): income less expenses for the year = **net profit**.
- **Statement of financial position** (balance sheet): assets less liabilities at the year end = **net assets**, which equals the owner's **capital**.

There's no statutory format for a sole trader, but practices use a consistent layout, and many sole traders also need the figures analysed into the categories on the self-employment pages of the tax return.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Accruals basis or cash basis?",
      md: `Since 2024/25 the **cash basis** is the standard method for sole traders and partnerships without corporate partners, unless they opt out and use the accruals basis. Under the cash basis there's no closing stock, debtors, creditors, accruals or prepayments for tax. This lesson covers the **accruals basis**, which larger or more complex sole traders use and which is the basis for all company accounts. Check which basis the client uses before you start.`,
    },
    {
      kind: "table",
      caption: "Standard layout: income statement",
      head: ["Line", "How it's made up"],
      rows: [
        ["Sales (turnover)", "Net of VAT if registered, less returns"],
        ["Cost of sales", "Opening inventory + purchases + carriage inwards − closing inventory"],
        ["**Gross profit**", "Sales − cost of sales"],
        ["Expenses", "Wages, rent, light and heat, insurance, motor, depreciation, irrecoverable debts, etc., after accruals and prepayments"],
        ["**Net profit**", "Gross profit − expenses"],
      ],
    },
    {
      kind: "table",
      caption: "Standard layout: statement of financial position",
      head: ["Section", "Includes"],
      rows: [
        ["Non-current (fixed) assets", "Cost less accumulated depreciation = NBV"],
        ["Current assets", "Inventory, trade receivables (net of allowance), prepayments, bank and cash"],
        ["Current liabilities", "Trade payables, accruals, overdraft, loan repayable within a year"],
        ["Non-current liabilities", "Loans repayable after more than a year"],
        ["**Net assets**", "Total assets − total liabilities"],
        ["Capital", "Opening capital + capital introduced + net profit − drawings = closing capital (equals net assets)"],
      ],
    },
    {
      kind: "md",
      md: `### Process each adjustment twice

Every year-end note affects **two** places, because each is a double entry. Tick each note off as you put both sides in:

| Adjustment | Income statement | Balance sheet |
|---|---|---|
| Closing inventory | Reduces cost of sales | Current asset |
| Depreciation | Expense | Increases accumulated depreciation |
| Accrual | Increases expense | Current liability |
| Prepayment | Reduces expense | Current asset |
| Private use of a business cost | Reduces expense | Increases drawings |`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Drawings and private use",
      md: `- **Drawings are never an expense.** They reduce capital in the balance sheet. Taking £26,000 out of the business doesn't reduce profit by a penny.
- **Private use** of the car, phone or home must be taken out of expenses (to drawings) for the accounts the client will rely on, or added back in the tax computation. Agree a reasonable percentage with the client and record how it was arrived at.
- **Goods taken for own use** are drawings at cost: Dr Drawings, Cr Purchases.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The capital account check",
      md: `Once both statements are drafted, prove them: opening capital + capital introduced + net profit − drawings should equal net assets. If it doesn't, an adjustment has gone in once instead of twice. This one check catches most errors in a set of accounts.`,
    },
  ],
  scenario: {
    title: "Year-end accounts for Harper's Plant Nursery",
    narrative: `**Jess Harper** runs **Harper's Plant Nursery** as a sole trader (not VAT registered) and uses the accruals basis. Her trial balance at **31 March 2026**:

| Account | Dr £ | Cr £ |
|---|---:|---:|
| Sales | | 182,000 |
| Purchases | 96,500 | |
| Opening inventory | 14,200 | |
| Wages | 31,400 | |
| Rent | 12,000 | |
| Light and heat | 4,300 | |
| Insurance | 1,800 | |
| Motor expenses | 5,600 | |
| Sundry expenses | 2,150 | |
| Equipment – cost | 24,000 | |
| Equipment – accumulated depreciation | | 9,600 |
| Trade receivables | 3,850 | |
| Bank | 6,420 | |
| Trade payables | | 7,900 |
| Loan (repayable 2030) | | 10,000 |
| Capital at 1 April 2025 | | 18,720 |
| Drawings | 26,000 | |
| **Total** | **228,220** | **228,220** |

Year-end notes:
1. Closing inventory was **£16,800**.
2. Equipment is depreciated at **20% straight line** on cost.
3. Electricity of **£600** is to be accrued.
4. Insurance of **£450** is prepaid.
5. Jess uses the van privately; she agrees **25%** of motor expenses is private.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Workings:** depreciation £24,000 × 20% = £4,800. Light and heat £4,300 + £600 = £4,900. Insurance £1,800 − £450 = £1,350. Private motor £5,600 × 25% = £1,400, so motor expenses £4,200 and drawings £27,400.`,
      },
      {
        kind: "table",
        caption: "Income statement for the year ended 31 March 2026",
        head: ["", "£", "£"],
        rows: [
          ["Sales", "", "182,000"],
          ["Opening inventory", "14,200", ""],
          ["Purchases", "96,500", ""],
          ["Less closing inventory", "(16,800)", ""],
          ["Cost of sales", "", "(93,900)"],
          ["**Gross profit**", "", "**88,100**"],
          ["Wages", "31,400", ""],
          ["Rent", "12,000", ""],
          ["Light and heat", "4,900", ""],
          ["Insurance", "1,350", ""],
          ["Motor expenses", "4,200", ""],
          ["Sundry expenses", "2,150", ""],
          ["Depreciation", "4,800", ""],
          ["Total expenses", "", "(60,800)"],
          ["**Net profit**", "", "**27,300**"],
        ],
      },
      {
        kind: "table",
        caption: "Statement of financial position at 31 March 2026",
        head: ["", "£", "£"],
        rows: [
          ["Equipment: cost £24,000 less depreciation £14,400", "", "9,600"],
          ["Inventory", "16,800", ""],
          ["Trade receivables", "3,850", ""],
          ["Prepayments", "450", ""],
          ["Bank", "6,420", ""],
          ["Current assets", "27,520", ""],
          ["Trade payables", "(7,900)", ""],
          ["Accruals", "(600)", ""],
          ["Net current assets", "", "19,020"],
          ["Loan (non-current)", "", "(10,000)"],
          ["**Net assets**", "", "**18,620**"],
          ["Capital at 1 April 2025", "", "18,720"],
          ["Add net profit", "", "27,300"],
          ["Less drawings (£26,000 + £1,400)", "", "(27,400)"],
          ["**Capital at 31 March 2026**", "", "**18,620**"],
        ],
      },
      {
        kind: "md",
        md: `Net assets equal closing capital, so the set ties up. Worth pointing out to Jess: she drew £27,400 against profit of £27,300, so her capital in the business fell slightly. Her taxable profit will start from £27,300, with depreciation added back and capital allowances deducted.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "cost-of-sales",
      prompt: "Opening inventory **£8,500**; purchases **£61,200**; carriage inwards **£800**; carriage outwards **£1,100**; closing inventory **£9,700**. What is cost of sales?",
      answer: 60800,
      unit: "£",
      explain: "Carriage inwards is part of the cost of goods; carriage outwards is a distribution expense below gross profit.",
      working: "£8,500 + £61,200 + £800 − £9,700 = **£60,800**",
    },
    {
      kind: "numeric",
      id: "net-profit",
      prompt: `From these figures, calculate net profit.

- Sales £95,000; cost of sales £52,000
- Wages £18,000
- Rent paid £6,000, of which £1,000 is prepaid
- Electricity paid £2,400, with £300 to accrue
- Equipment cost £10,000, depreciated at 20% straight line
- Drawings £15,000`,
      answer: 15300,
      unit: "£",
      explain: "Adjust rent and electricity, charge depreciation, and leave drawings out of the income statement.",
      working: `Gross profit: £95,000 − £52,000 = £43,000

Expenses: wages £18,000 + rent £5,000 + electricity £2,700 + depreciation £2,000 = £27,700

Net profit: £43,000 − £27,700 = **£15,300**`,
    },
    {
      kind: "numeric",
      id: "closing-capital",
      prompt: "Continuing: opening capital was **£20,000** and the owner introduced **£5,000** during the year. Using the net profit and drawings above, what is closing capital?",
      answer: 25300,
      unit: "£",
      explain: "Capital increases with money introduced and profit, and decreases with drawings.",
      working: "£20,000 + £5,000 + £15,300 − £15,000 = **£25,300**",
    },
    {
      kind: "journal",
      id: "private-motor",
      prompt: "A sole trader's motor expenses are **£4,800** for the year. She agrees **30%** is private use. Post the year-end adjustment.",
      accounts: ["Drawings", "Motor expenses", "Capital", "Motor vehicles – cost", "Sundry expenses", "Bank"],
      answer: [
        { account: "Drawings", dr: 1440 },
        { account: "Motor expenses", cr: 1440 },
      ],
      explain: "£4,800 × 30% = £1,440 is a personal cost of the owner. It comes out of business expenses and is treated as drawings. Debiting Capital directly would give the same closing capital but loses the drawings analysis.",
    },
    {
      kind: "classify",
      id: "classify-sofp",
      prompt: "Where does each item appear in a sole trader's statement of financial position?",
      categories: ["Non-current asset", "Current asset", "Current liability", "Non-current liability", "Capital section"],
      items: [
        { text: "Delivery van at NBV", answer: 0 },
        { text: "Prepaid insurance", answer: 1 },
        { text: "Accrued electricity", answer: 2 },
        { text: "Bank loan repayable in 2031", answer: 3 },
        { text: "Drawings", answer: 4 },
        { text: "Bank overdraft", answer: 2 },
        { text: "Closing inventory", answer: 1 },
      ],
      explain: "Current means within 12 months of the balance sheet date. Drawings reduce capital; they're not a liability or an expense.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-drawings-is",
      prompt: "Where do drawings appear in a sole trader's accounts?",
      options: ["As an expense in the income statement", "As a deduction from capital in the balance sheet", "As a current liability", "As a reduction in sales"],
      answer: 1,
      explain: "Drawings are the owner taking value out of the business: they reduce capital, not profit.",
    },
    {
      kind: "mcq",
      id: "q-carriage-out",
      prompt: "Carriage outwards appears:",
      options: ["In cost of sales", "As an expense below gross profit", "In the balance sheet", "As a deduction from purchases"],
      answer: 1,
      explain: "It's a distribution cost of selling goods, so it's an expense after gross profit.",
    },
    {
      kind: "mcq",
      id: "q-capital-check",
      prompt: "Net assets are £31,500 but the capital account comes to £31,900. What's the most likely cause?",
      options: [
        "A £400 adjustment has been put in only one statement",
        "The TB didn't balance",
        "Drawings should have been an expense",
        "It's a rounding difference; ignore it",
      ],
      answer: 0,
      explain: "Each adjustment affects both statements. If one side is missing, net assets and capital won't agree.",
    },
    {
      kind: "mcq",
      id: "q-goods-own-use",
      prompt: "A shopkeeper takes stock costing £200 for personal use. The entry is:",
      options: ["Dr Drawings, Cr Purchases", "Dr Purchases, Cr Drawings", "Dr Drawings, Cr Sales", "No entry needed"],
      answer: 0,
      explain: "The goods were bought as purchases but won't be sold; removing them from purchases and charging drawings keeps profit right.",
    },
    {
      kind: "mcq",
      id: "q-cash-basis",
      prompt: "A sole trader uses the cash basis for 2026/27. Which adjustment is NOT made in the tax figures?",
      options: ["Removing private use", "Closing stock and accruals", "Excluding drawings", "Recording income received"],
      answer: 1,
      explain: "The cash basis records money in and out, so there's no closing stock, accruals or prepayments. Private use and drawings are still excluded.",
    },
  ],
  sources: [
    { label: "GOV.UK – Cash basis", url: "https://www.gov.uk/simpler-income-tax-cash-basis" },
    { label: "GOV.UK – Business records if you're self-employed", url: "https://www.gov.uk/self-employed-records" },
    { label: "HMRC Business Income Manual BIM31020 – meaning of UK GAAP", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31020" },
    { label: "HMRC Business Income Manual BIM33000 – stock", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim33000" },
  ],
};
