import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "bank-feeds-and-bank-rules",
  title: "Bank feeds and bank rules",
  level: "foundation",
  minutes: 30,
  summary:
    "Working efficiently and safely with bank feeds: matching vs creating transactions, transfers between accounts, card-processor payouts through a clearing account, and writing bank rules that save time without silently miscoding things.",
  objectives: [
    "Decide whether a feed line should be matched to an existing invoice or bill, or coded as a new transaction",
    "Record transfers, card-processor payouts and fees correctly using clearing accounts",
    "Write bank rules with tight conditions and recognise rules that are dangerous",
    "Spot the symptoms of a broken or duplicated feed",
  ],
  body: [
    {
      kind: "md",
      md: `A **bank feed** brings each bank statement line into the accounting software automatically. You then "reconcile" (Xero) or "categorise/match" (QuickBooks) each line. It's the biggest time-saver in modern bookkeeping and, used carelessly, the biggest source of errors. Every line you approve is a double entry: the bank side is fixed, and **you** choose the other side.

For each line, ask one question first: **does the other side already exist in the books?**`,
    },
    {
      kind: "table",
      caption: "Match or create?",
      head: ["Feed line", "Other side already exists?", "What to do"],
      rows: [
        ["Customer pays an invoice", "Yes: the sales invoice", "**Match** to the invoice (clears the debtor)"],
        ["Payment to a supplier whose bill is entered", "Yes: the bill", "**Match** to the bill (clears the creditor)"],
        ["Card payment for fuel, no bill entered", "No", "**Create** a spend transaction: fuel expense and VAT"],
        ["Bank charges or interest", "No", "**Create**: bank charges or interest received"],
        ["Transfer to the business savings account", "It will exist on the other bank account's feed", "Code as a **transfer** between the two bank accounts"],
        ["Payout from a card processor (SumUp, Stripe, Square, PayPal)", "The sales are recorded elsewhere", "Clear the processor's **clearing account** and record fees"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Creating when you should match",
      md: `If you create a new "receive money → Sales" transaction for a customer receipt that already has an invoice, the sale is counted twice and the invoice stays unpaid on the aged debtors. If you create a new "spend money → Purchases" for a supplier payment that has a bill, the cost is doubled and the supplier still shows as owed. These are the two most common errors in feed-based bookkeeping. Look for the software's suggested match before creating anything.`,
    },
    {
      kind: "md",
      md: `### Clearing accounts for card processors

A café's card takings don't arrive in the bank as the actual sales. The processor batches them, deducts its fee and pays out the net amount a day or two later. If you code each payout straight to Sales, turnover is understated by the fees, the fees never appear as a cost, and the VAT on sales may be wrong.

Use a **clearing account** (a balance sheet account, e.g. "SumUp clearing"):

1. Record the gross card sales from the till (EPOS) report: Dr Clearing, Cr Sales (and VAT control).
2. When the payout arrives: Dr Bank (net), Dr Merchant fees, Cr Clearing (gross).
3. At the month end the clearing account should only hold payouts still in transit. Reconcile it to the processor's statement.`,
    },
    {
      kind: "journal",
      title: "A week's card payout",
      narrative: "Card sales of £2,000 were posted from the till report to the clearing account. The processor pays £1,966 after deducting £34 of fees (its statement shows no VAT on the fees).",
      lines: [
        { account: "Bank – current account", dr: 1966 },
        { account: "Merchant fees", dr: 34 },
        { account: "Card sales clearing", cr: 2000 },
      ],
    },
    {
      kind: "md",
      md: `### Bank rules

A bank rule tells the software: "when a line looks like *this*, code it like *that*." Good rules make monthly bookkeeping fast. Bad rules miscode hundreds of transactions without anyone looking.

**A safe rule** has a tight condition (exact payee reference, not a fragment) for a supplier that only ever supplies one thing, with the right VAT code: e.g. *"BRITISH GAS" → Light and heat, 20%* for the shop's energy supplier, or *"HSBC CHARGES" → Bank charges, no VAT*.

**Risky rules** include anything matching a general retailer or marketplace (Amazon, Tesco, eBay, PayPal) where the business buys a mix of stock, office supplies and personal items; rules that auto-approve without review; and rules with a VAT code applied to suppliers whose VAT position varies.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Rule hygiene",
      md: `- Prefer rules that **suggest** a coding over rules that auto-reconcile.
- Review the rules list at least quarterly and when you take over a file. Delete rules nobody can explain.
- If you fix a miscoded transaction, fix the **rule** that caused it too.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Signs the feed is wrong",
      md: `- The software's bank balance doesn't agree with the real statement at the month end.
- Duplicate lines with the same date and amount, often after someone also imported a CSV or the feed reconnected.
- Gaps: a month with no lines, after the bank's authorisation expired and wasn't renewed.
- Feed start date earlier than the conversion date, pulling in transactions already in the opening balances.`,
    },
  ],
  scenario: {
    title: "Untangling Tidewater Coffee's bank feed",
    narrative: `**Tidewater Coffee Ltd** runs a café and is VAT registered. A junior has been reconciling the feed and the director, Lucy, says *"turnover looks too low and the bank doesn't agree"*. You find:

1. Every **SumUp payout** has been coded to Sales at 20%, even though the daily till Z-readings were also posted to Sales.
2. A rule **"AMAZON" → Office costs, 20% VAT** has caught £1,140 of coffee cups and stock, and £230 of Lucy's personal orders.
3. A **£5,000 transfer** to the business savings account was coded to General expenses.
4. Two weeks of lines appear **twice** after someone imported a CSV statement while the feed was also running. The software balance is £3,860 higher than the statement.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. SumUp payouts.** The sales were double-counted: once from the Z-reading and once from the payout. Re-code each payout against the SumUp clearing account and split out the fees. Turnover was actually overstated, not understated; the bank disagreed for another reason.

**2. Amazon rule.** Re-code the stock to Purchases (cost of sales) and Lucy's orders to her **director's loan account** with no VAT. Then **delete the rule**, or change it to suggest-only with no default VAT code.

**3. Transfer.** Re-code as a transfer from the current account to the savings account. It's not an expense; profit was understated by £5,000.

**4. Duplicates.** Delete the imported CSV lines (keep the feed), then re-check that the software balance equals the statement at the month end. The £3,860 difference should disappear.`,
      },
      {
        kind: "journal",
        title: "Correcting the savings transfer",
        lines: [
          { account: "Bank – savings account", dr: 5000 },
          { account: "General expenses", cr: 5000 },
        ],
        narrative: "In the software you'd normally edit the original transaction to a transfer; this is the equivalent journal.",
      },
      {
        kind: "callout",
        tone: "example",
        title: "What to tell Lucy",
        md: `The feed had double-counted card takings, put stock and personal spending through office costs, and treated a savings transfer as a cost. After the corrections, turnover is lower, gross margin is more realistic, and profit is higher because the £5,000 transfer is no longer an expense.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "stripe-payout",
      prompt:
        "An online shop records its Stripe sales (£5,000 gross) in a Stripe clearing account. Stripe pays out **£4,853** after deducting **£147** of fees (no VAT shown on the fees). Post the payout.",
      accounts: ["Bank – current account", "Merchant fees", "Stripe clearing", "Sales", "VAT control", "Trade receivables"],
      answer: [
        { account: "Bank – current account", dr: 4853 },
        { account: "Merchant fees", dr: 147 },
        { account: "Stripe clearing", cr: 5000 },
      ],
      explain:
        "The sales were already recorded when they were posted to the clearing account. The payout clears the gross amount, splitting it between the cash received and the fee. Coding the payout to Sales would double-count income and hide the fees.",
    },
    {
      kind: "numeric",
      id: "clearing-balance",
      prompt:
        "During March, card sales of **£18,600** were posted to the card clearing account. Payouts of **£17,950** were received in March, and fees of **£410** were deducted from them. What should the clearing account balance be at 31 March?",
      answer: 240,
      unit: "£",
      explain: "Each payout clears its gross sales (net cash + fees). What's left is sales not yet paid out, typically the last day or two of the month.",
      working: "£18,600 − £17,950 − £410 = **£240** debit. Check it against the processor's statement as the payout in transit on 1 April.",
    },
    {
      kind: "classify",
      id: "classify-rules",
      prompt: "Is each proposed bank rule safe to set up, or does it need care?",
      categories: ["Safe rule", "Risky: needs care or shouldn't exist"],
      items: [
        { text: "\"OCTOPUS ENERGY\" (the office energy supplier) → Light and heat, 20%", answer: 0 },
        { text: "\"AMAZON\" → Office costs, 20%, auto-reconcile", answer: 1, why: "Amazon purchases are a mix of stock, office items and often personal items; VAT varies by seller." },
        { text: "\"BANK CHARGES\" from the bank itself → Bank charges, no VAT", answer: 0 },
        { text: "\"TESCO\" → Staff welfare, 20%", answer: 1, why: "Could be fuel, stock, personal shopping or zero-rated food." },
        { text: "\"HMRC VAT\" → Office costs", answer: 1, why: "A VAT payment clears the VAT liability; it isn't an expense." },
        { text: "\"ACME INSURANCE DD\" → Insurance, no VAT", answer: 0, why: "Insurance is exempt, so no VAT is right." },
      ],
      explain: "Safe rules match a specific payee that always supplies the same thing with the same VAT treatment. Anything that matches a general retailer or an HMRC payment needs human judgement.",
    },
    {
      kind: "mcq",
      id: "transfer-coding",
      prompt: "A feed line shows £3,000 paid from the current account to the client's business credit card. How should it be coded?",
      options: [
        "General expenses",
        "A transfer from the current account to the credit card account",
        "Bank charges",
        "Director's loan account",
      ],
      answer: 1,
      explain: "It moves money between two of the business's own accounts. The individual card purchases are coded on the credit card's own feed. Coding the repayment to an expense double-counts every purchase.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-match-create",
      prompt: "A customer pays an invoice that's already in the software. On the feed you should:",
      options: ["Create a receive-money transaction coded to Sales", "Match the line to the invoice", "Code it to Suspense", "Ignore it"],
      answer: 1,
      explain: "Matching clears the debtor. Creating a new Sales entry counts the income twice.",
    },
    {
      kind: "mcq",
      id: "q-clearing-purpose",
      prompt: "Why use a clearing account for card-processor payouts?",
      options: [
        "To delay paying VAT",
        "To record gross sales and fees properly and prove all takings were received",
        "Because processors aren't VAT registered",
        "To avoid reconciling the bank",
      ],
      answer: 1,
      explain: "Gross sales go in, net payouts and fees come out. Anything left should be in transit, which proves the takings arrived.",
    },
    {
      kind: "mcq",
      id: "q-duplicates",
      prompt: "The software's bank balance is exactly the total of two weeks' transactions higher than the statement. Most likely:",
      options: ["Bank charges missing", "Duplicated lines from a CSV import alongside the feed", "Timing differences", "A VAT error"],
      answer: 1,
      explain: "A difference that equals a block of transactions points to duplicate imports.",
    },
    {
      kind: "mcq",
      id: "q-fix-rule",
      prompt: "You find a rule has been coding the director's personal subscriptions to Software expenses. What should you do?",
      options: [
        "Re-code the transactions only",
        "Re-code the transactions to the director's loan account and fix or delete the rule",
        "Leave it; the amounts are small",
        "Change the VAT code only",
      ],
      answer: 1,
      explain: "Fix both the history and the cause, otherwise the error repeats next month.",
    },
    {
      kind: "mcq",
      id: "q-feed-gap",
      prompt: "A bank feed shows no transactions for six weeks, though the business was trading. The likely cause is:",
      options: ["No sales", "The bank connection's authorisation lapsed and wasn't renewed", "A VAT lock date", "A bank rule"],
      answer: 1,
      explain: "Feeds need periodic re-authorisation. Reconnect and import the missing period from a statement, checking for duplicates.",
    },
  ],
  sources: [
    { label: "HMRC VAT Notice 700/21 – keeping VAT records", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "GOV.UK – Making Tax Digital for VAT", url: "https://www.gov.uk/guidance/making-tax-digital-for-vat" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "GOV.UK – Director's loans", url: "https://www.gov.uk/directors-loans" },
  ],
};
