import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cut-off-and-period-end-adjustments",
  title: "Cut-off and period-end adjustments",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Getting each month's income and costs into the right month on cloud software: finding cut-off errors from transactions dated after the period end, goods received not invoiced, work done not billed, deposits, prepayment and accrual schedules, and auto-reversing journals.",
  objectives: [
    "Use post-period transactions to identify sales and purchase cut-off errors",
    "Post accruals for goods received not invoiced and accrued income for work not billed",
    "Run prepayment and accrual schedules that release monthly",
    "Use auto-reversing journals correctly and avoid double counting",
  ],
  body: [
    {
      kind: "md",
      md: `In the foundations track you saw accruals and prepayments as year-end adjustments. In practice, clients who receive monthly or quarterly management accounts need the same adjustments **every period**, or the monthly profit swings wildly: a quarter's electricity lands in one month, an annual insurance premium wipes out April's profit, a big delivery is costed in July but sold in June.

**Cut-off** means making sure each transaction falls in the period in which the goods or services were actually supplied or received, regardless of invoice or payment date.`,
    },
    {
      kind: "table",
      caption: "Where cut-off goes wrong",
      head: ["Situation", "Risk", "Adjustment at period end"],
      rows: [
        ["Goods or services received, supplier invoice not yet received (GRNI)", "Cost missing from this period", "Accrue: Dr Cost, Cr Accruals"],
        ["Work done or goods delivered, sales invoice not yet raised", "Income missing", "Raise the invoice in the period, or Dr Accrued income, Cr Sales"],
        ["Annual cost paid up front and posted to expense", "One month carries a year's cost", "Post to Prepayments and release monthly"],
        ["Customer deposit for future work posted to Sales", "Income recognised too early", "Dr Sales, Cr Deferred income"],
        ["Bill received for a period straddling the month end (e.g. quarterly utilities)", "Cost in the wrong months", "Accrue or apportion"],
      ],
    },
    {
      kind: "md",
      md: `### Finding cut-off errors

The quickest test is to look **forwards**:

1. Review **supplier bills dated in the first few weeks after the period end**. Any for goods or services received before the period end need accruing.
2. Review **sales invoices raised just after the period end**. Any for work done or goods delivered before the period end belong in the earlier period.
3. Compare **delivery notes / goods received notes** around the period end with invoices.
4. Look for regular costs that are **missing** this month (rent, utilities, phone, software) compared with prior months.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Schedules beat one-off journals",
      md: `Set up a **prepayments schedule** (and, for regular accruals, an accruals schedule) in a spreadsheet or the software's prepayments feature. When an annual invoice arrives, post it to Prepayments and release one-twelfth to the expense each month. The schedule's closing balance should equal the Prepayments account every month: that's your reconciliation.`,
    },
    {
      kind: "md",
      md: `### Auto-reversing journals

For one-off month-end accruals (e.g. June's electricity, not yet billed), post a journal at the last day of the month and set it to **reverse on the first day of the next month**. When the real bill arrives and is posted in July, the reversal cancels the accrual so July isn't charged twice.

Don't use reversing journals for **prepayment releases** or **deferred income** that runs over several months: use a schedule, or the balance will keep bouncing back.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Accruing and then posting the bill into the same month** without a reversal: the cost is doubled.
- **Accruing VAT.** Accruals are net; the VAT is claimed when the VAT invoice arrives and is posted.
- **Deposits and VAT.** For VAT, a deposit usually creates a tax point when it's received, so output VAT is due then, even if the income is deferred in the accounts. Defer the **net** amount only.
- **Ignoring stock.** If a delivery is in the stock count, the purchase must be in the books too (accrued if necessary), otherwise profit is overstated.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Why it matters beyond the management accounts",
      md: `The same cut-off principles apply at the year end for the statutory accounts and tax (profits computed under GAAP on the accruals basis, BIM31020; timing of deductions, BIM42201). Getting cut-off right every month makes the year-end straightforward.`,
    },
  ],
  scenario: {
    title: "June month-end for Quarry Hill Brewing Co Ltd",
    narrative: `**Quarry Hill Brewing Co Ltd** (VAT registered) gets monthly management accounts. Draft year-to-date profit for the **three months to 30 June 2026** (the company's year started on 1 April) is **£11,800**. Reviewing the period around 30 June you find:

1. Malt worth **£4,200** net was delivered on 28 June and included in the June stock count; the supplier's invoice is dated 3 July.
2. The annual insurance premium of **£3,600** for 1 April 2026 to 31 March 2027 was paid in April and posted in full to Insurance.
3. Beer worth **£1,800** net was delivered to a pub on 30 June; the invoice was raised on 2 July.
4. A festival organiser paid a **£2,400** deposit (including £400 VAT) on 20 June for beer to be supplied in September. The bookkeeper posted £2,000 to Sales and £400 to VAT.
5. Electricity is billed quarterly in arrears. June's usage is estimated at **£650** net and isn't in the books.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Adjustments at 30 June 2026",
        head: ["#", "Journal", "£", "Effect on year-to-date profit"],
        rows: [
          ["1", "Dr Purchases, Cr Accruals (reverse 1 July)", "4,200", "(4,200)"],
          ["2", "Dr Prepayments, Cr Insurance (then release £300 a month)", "2,700", "+2,700"],
          ["3", "Raise the invoice dated 30 June, or Dr Accrued income, Cr Sales", "1,800", "+1,800"],
          ["4", "Dr Sales, Cr Deferred income", "2,000", "(2,000)"],
          ["5", "Dr Light and heat, Cr Accruals (reverse 1 July)", "650", "(650)"],
        ],
      },
      {
        kind: "md",
        md: `**Item 2:** by 30 June, three months of cover (April to June, £900) have been used, so £2,700 is prepaid. April's management accounts were overcharged by £3,300 and May and June each missed their £300 charge. Posting the £2,700 in June puts the year to date right, but June's own monthly column will show a £2,700 credit, so note it as a catch-up in the commentary. Going forward the schedule releases £300 a month.

**Item 4:** the VAT on the deposit was correctly accounted for when it was received. Only the net £2,000 is deferred until the beer is supplied in September.

**Corrected year-to-date profit at 30 June:** £11,800 − £4,200 + £2,700 + £1,800 − £2,000 − £650 = **£9,450**.`,
      },
      {
        kind: "journal",
        title: "The two accruals, set to reverse on 1 July",
        lines: [
          { account: "Purchases", dr: 4200 },
          { account: "Light and heat", dr: 650 },
          { account: "Accruals", cr: 4850 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "prepayment-balance",
      prompt: "An annual software licence of **£4,800** (net) covering 1 February to 31 January was posted to Prepayments when paid, and is released monthly. What should the Prepayments balance for this licence be at **30 April**?",
      answer: 3600,
      unit: "£",
      explain: "Three months (February, March, April) have been released at £400 a month.",
      working: "£4,800 ÷ 12 = £400 a month × 3 = £1,200 released. £4,800 − £1,200 = **£3,600** still prepaid.",
    },
    {
      kind: "journal",
      id: "grni-accrual",
      prompt: "Stock costing **£3,150** net was received on 29 September and included in the 30 September stock count. The supplier's invoice won't arrive until October. Post the month-end adjustment (the client is VAT registered).",
      accounts: ["Purchases", "Accruals", "VAT control", "Trade payables", "Prepayments", "Inventory"],
      answer: [
        { account: "Purchases", dr: 3150 },
        { account: "Accruals", cr: 3150 },
      ],
      explain: "The goods are in the September stock, so the cost must be too. No invoice means no VAT to claim yet and no trade payable on the ledger: it's an accrual, set to reverse on 1 October.",
    },
    {
      kind: "classify",
      id: "classify-period",
      prompt: "A client's month end is 31 August. Which month does each item belong in?",
      categories: ["August", "September"],
      items: [
        { text: "Consultancy work completed 28 August, invoiced 4 September", answer: 0 },
        { text: "Supplier invoice dated 2 September for goods delivered 2 September", answer: 1 },
        { text: "Phone bill dated 5 September for August usage", answer: 0 },
        { text: "Deposit received 25 August for a job starting 10 September (net income)", answer: 1 },
        { text: "Goods dispatched to a customer 31 August, invoice dated 1 September", answer: 0 },
      ],
      explain: "Income and costs belong to the month the goods or services were supplied or received, not the invoice or payment date.",
    },
    {
      kind: "numeric",
      id: "corrected-month-profit",
      prompt: `Draft profit for October is **£18,500**. You find: an unbilled supplier delivery of **£2,600** net (goods used in October); the annual rent of **£12,000** for November to October was paid in October and expensed in full; and October's sales include a **£1,500** net deposit for December work. What is the corrected October profit?`,
      answer: 26400,
      unit: "£",
      explain: "Accrue the delivery (profit down), move the rent to prepayments (profit up), and defer the deposit (profit down). None of October's rent should be charged, as the year starts 1 November.",
      working: `Rent: the whole £12,000 relates to November onwards, so all of it is prepaid: +£12,000.

£18,500 − £2,600 + £12,000 − £1,500 = **£26,400**`,
    },
    {
      kind: "mcq",
      id: "reversing-misuse",
      prompt: "A junior sets the monthly insurance prepayment release journal to auto-reverse on the first of the next month. What happens?",
      options: [
        "Nothing; it's correct",
        "Each month's release is cancelled the next month, so the prepayment never reduces properly",
        "The VAT is reclaimed twice",
        "The bank balance changes",
      ],
      answer: 1,
      explain: "Releases are permanent: each month's cost has genuinely been used. Reversing them undoes the expense. Use a schedule, not reversing journals, for prepayments.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-best-test",
      prompt: "The quickest way to find purchase cut-off errors at a month end is to:",
      options: ["Review bills dated in the weeks after the month end", "Review the VAT return", "Review last year's accounts", "Count the cash"],
      answer: 0,
      explain: "Post-period bills often relate to goods or services received before the period end.",
    },
    {
      kind: "mcq",
      id: "q-accrual-vat",
      prompt: "When accruing an unbilled cost for a VAT-registered client, the accrual should be:",
      options: ["Gross including VAT", "Net of VAT", "VAT only", "Half the gross"],
      answer: 1,
      explain: "There's no VAT invoice yet, so no input tax can be claimed; the accrual is the net cost.",
    },
    {
      kind: "mcq",
      id: "q-deposit-vat",
      prompt: "A customer pays a deposit for goods to be delivered in three months. For VAT the client usually:",
      options: ["Accounts for VAT on the deposit when received", "Waits until delivery", "Never charges VAT on deposits", "Accounts for VAT at the year end"],
      answer: 0,
      explain: "Receiving a payment normally creates a tax point for the amount received, so output VAT is due on the deposit even though the income is deferred in the accounts.",
    },
    {
      kind: "mcq",
      id: "q-schedule-check",
      prompt: "The prepayments schedule shows £5,400 at month end, but the Prepayments account shows £6,000. What should you do?",
      options: ["Adjust the schedule to £6,000", "Investigate: a release may be missing or an item posted to prepayments isn't on the schedule", "Ignore it", "Write off £600 to sundry"],
      answer: 1,
      explain: "The schedule and the account should agree. Find the difference before reporting.",
    },
    {
      kind: "mcq",
      id: "q-stock-link",
      prompt: "Goods received on the last day are in the stock count, but no purchase is recorded. Profit is:",
      options: ["Understated", "Overstated", "Correct", "Unaffected because of VAT"],
      answer: 1,
      explain: "Closing stock includes the goods but purchases don't, so cost of sales is too low.",
    },
  ],
  sources: [
    { label: "HMRC Business Income Manual BIM31020 – meaning of UK GAAP", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31020" },
    { label: "HMRC Business Income Manual BIM42201 – deductions: timing", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42201" },
    { label: "GOV.UK – VAT: instalments, deposits and credit sales", url: "https://www.gov.uk/guidance/vat-instalments-deposits-credit-sales" },
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
  ],
};
