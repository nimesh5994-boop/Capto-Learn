import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "bank-reconciliations",
  title: "Bank reconciliations",
  level: "practitioner",
  minutes: 35,
  summary:
    "Proving the bank balance in the books agrees with the bank statement: updating the cash book for items only the bank knows about, identifying timing differences, finding errors, and why a cloud 'reconciled' tick isn't the same as a reconciled bank.",
  objectives: [
    "Separate items that need posting in the books from timing differences",
    "Update the cash book and prepare a bank reconciliation statement",
    "Work out a missing statement or cash book balance",
    "Spot the warning signs in a reconciliation: old unpresented items and balancing figures",
  ],
  body: [
    {
      kind: "md",
      md: `The bank balance in the client's books (the **cash book** or the Bank account in the nominal ledger) and the balance on the bank statement are rarely the same on any given day. A **bank reconciliation** explains the difference and proves that the books are right.

It's the single most important control in bookkeeping: cash is the one figure that can be independently confirmed, and if the bank doesn't reconcile, nothing else in the accounts can be relied on.`,
    },
    {
      kind: "table",
      caption: "Why the two balances differ",
      head: ["Item", "Example", "Action"],
      rows: [
        ["In the bank, not yet in the books", "Bank charges, interest, direct debits, standing orders, BACS receipts from customers, dishonoured cheques", "Post to the cash book"],
        ["Errors in the books", "Payment of £429 recorded as £492", "Correct the cash book"],
        ["In the books, not yet on the statement: payments", "Cheques written and payments recorded but not yet cleared (unpresented)", "Reconciling item: no posting"],
        ["In the books, not yet on the statement: receipts", "Takings recorded and paid in but not yet credited (outstanding lodgements)", "Reconciling item: no posting"],
        ["Errors by the bank", "Another customer's payment on the client's statement", "Reconciling item: ask the bank to correct it"],
      ],
    },
    {
      kind: "md",
      md: `### The two-step method

**Step 1: update the cash book.** Post everything the bank knows about that the books don't, and correct any errors in the books. This gives the **adjusted cash book balance**, which is the figure that goes in the trial balance and the accounts.

**Step 2: reconcile to the statement.**

> Balance per bank statement
> − unpresented payments
> + outstanding lodgements
> ± bank errors
> = adjusted cash book balance

If the two agree, the bank is reconciled.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Watch the signs",
      md: `- **Statement wording is reversed.** A "credit" on the bank statement is money **in** (a debit in the client's books). An overdrawn statement shows a **debit** balance; in the books an overdraft is a **credit** balance on Bank.
- **Old unpresented items.** A cheque unpresented for six months or more probably won't clear. Find out why; it may need writing back. Old outstanding lodgements are a bigger worry: money recorded as banked that never arrived.
- **Balancing figures.** A reconciliation that only works because of an unexplained "difference" line isn't a reconciliation.`,
    },
    {
      kind: "md",
      md: `### Bank reconciliation in cloud software

Xero, QuickBooks and similar software import statement lines through a **bank feed** and ask you to "reconcile" each line by matching it to an invoice, bill or transaction. That's step 1 above, done line by line. It doesn't prove the balance. Always check the **balance per the software** against the **closing balance on the actual bank statement** (or the bank's own app) at the period end. Common reasons they differ:

- Duplicated feed lines, or a feed that dropped transactions when it disconnected
- Transactions "spent" or "received" manually in the software that were also imported by the feed
- An incorrect opening balance when the file was set up
- Deleted or unreconciled statement lines`,
    },
    {
      kind: "journal",
      title: "Posting a dishonoured cheque",
      narrative: "A customer's £740 cheque was paid in and recorded, but the bank returned it unpaid. The receipt has to be reversed and the customer owes the money again.",
      lines: [
        { account: "Trade receivables", dr: 740 },
        { account: "Bank", cr: 740 },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Make it a monthly habit",
      md: `Reconcile every bank account, credit card, loan and savings account every month, and keep a copy of the statement and the reconciliation report on file. A month-old difference takes minutes to find; a year-old one can take days.`,
    },
  ],
  scenario: {
    title: "Larch Joinery's August bank reconciliation",
    narrative: `**Larch Joinery Ltd** keeps a manual cash book. At **31 August 2026** it shows a balance of **£4,620** in funds. The bank statement shows **£6,210** in credit. Comparing the two, you find:

1. Bank charges of **£38** on the statement, not in the cash book.
2. A direct debit of **£215** for insurance, not in the cash book.
3. A BACS receipt of **£1,250** from a customer, not in the cash book.
4. Two cheques to suppliers recorded in August but not yet on the statement: **£1,400** and **£780**.
5. Takings of **£1,650** paid in on 31 August, recorded in the cash book but not on the statement until 1 September.
6. A supplier payment recorded in the cash book as **£492**; the bank statement shows the correct amount of **£429**.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Step 1: adjusted cash book",
        head: ["", "£"],
        rows: [
          ["Balance per cash book", "4,620"],
          ["Less bank charges", "(38)"],
          ["Less insurance direct debit", "(215)"],
          ["Add BACS receipt from customer", "1,250"],
          ["Add back overstatement of supplier payment (£492 − £429)", "63"],
          ["**Adjusted cash book balance**", "**5,680**"],
        ],
      },
      {
        kind: "table",
        caption: "Step 2: bank reconciliation statement at 31 August 2026",
        head: ["", "£"],
        rows: [
          ["Balance per bank statement", "6,210"],
          ["Less unpresented cheques (£1,400 + £780)", "(2,180)"],
          ["Add outstanding lodgement", "1,650"],
          ["**Balance per adjusted cash book**", "**5,680**"],
        ],
      },
      {
        kind: "md",
        md: `The two agree, so the bank is reconciled. The figure for the trial balance is **£5,680**.

Items 1, 2, 3 and 6 are posted in the books. Items 4 and 5 are timing differences: they'll clear in September with no further entries. Next month, tick them off against the September statement. If the £1,650 lodgement doesn't appear in the first few days, investigate straight away.`,
      },
      {
        kind: "journal",
        title: "The transposition correction",
        narrative: "The payment was over-recorded by £63, so Bank is debited (increased) and the supplier's account credited (the amount owed goes back up by £63, because only £429 was actually paid against it).",
        lines: [
          { account: "Bank", dr: 63 },
          { account: "Trade payables", cr: 63 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "adjusted-cash-book",
      prompt: `A client's cash book shows **£2,340** in funds. The bank statement includes these items not yet in the cash book: bank charges **£25**; interest received **£12**; a direct debit for business rates **£180**; a BACS receipt from a customer **£600**. What is the adjusted cash book balance?`,
      answer: 2747,
      unit: "£",
      explain: "Money in (interest, customer receipt) increases the balance; money out (charges, direct debit) reduces it.",
      working: "£2,340 − £25 + £12 − £180 + £600 = **£2,747**",
    },
    {
      kind: "numeric",
      id: "statement-balance",
      prompt: "Continuing the previous exercise: there are unpresented cheques of **£950** and an outstanding lodgement of **£1,200**. What balance should the bank statement show (in funds)?",
      answer: 2497,
      unit: "£",
      explain: "Work backwards from the adjusted cash book. Unpresented cheques haven't left the bank yet, so the statement is higher by that amount; the lodgement hasn't arrived yet, so the statement is lower.",
      working: "£2,747 + £950 − £1,200 = **£2,497**. Check: £2,497 − £950 + £1,200 = £2,747 ✓",
    },
    {
      kind: "classify",
      id: "classify-rec-items",
      prompt: "For each item found while reconciling, what do you do?",
      categories: ["Post in the client's books", "Reconciling item only (no posting)"],
      items: [
        { text: "Monthly account fee on the statement", answer: 0 },
        { text: "A cheque to a supplier written on 29 June, not yet cleared at 30 June", answer: 1 },
        { text: "A standing order for the van loan not in the cash book", answer: 0 },
        { text: "Cash takings banked on the last day, credited by the bank two days later", answer: 1 },
        { text: "A customer's cheque returned unpaid by the bank", answer: 0 },
        { text: "A payment to a different business debited in error by the bank", answer: 1, why: "It's the bank's mistake: ask them to reverse it." },
      ],
      explain: "If the bank knows about it and the books don't (or the books are wrong), post it. If the books are right and the bank simply hasn't caught up, or the bank made the error, it's a reconciling item.",
    },
    {
      kind: "journal",
      id: "post-direct-debit",
      prompt: "During the reconciliation you find a **£96** direct debit for the business's mobile phone contract (no VAT invoice held) that hasn't been entered. Post it.",
      accounts: ["Telephone", "Bank", "VAT control", "Trade payables", "Suspense", "Sundry expenses"],
      answer: [
        { account: "Telephone", dr: 96 },
        { account: "Bank", cr: 96 },
      ],
      explain:
        "Money has left the bank (credit Bank) for a telephone cost (debit Telephone). With no valid VAT invoice there's no input tax to claim yet; get the invoice from the provider and adjust if needed. Don't park it in Suspense or Sundry when you know what it is.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-unpresented",
      prompt: "An unpresented cheque is:",
      options: [
        "A cheque received but not banked",
        "A payment recorded in the cash book that hasn't yet cleared the bank",
        "A cheque returned unpaid",
        "A cheque written but not recorded",
      ],
      answer: 1,
      explain: "It's in the books but not yet on the statement, so it's deducted from the statement balance in the reconciliation.",
    },
    {
      kind: "mcq",
      id: "q-which-balance",
      prompt: "Which balance goes in the trial balance?",
      options: ["The bank statement balance", "The adjusted cash book balance", "The unadjusted cash book balance", "The average of the two"],
      answer: 1,
      explain: "The adjusted cash book balance reflects all transactions the business has made, including those the bank hasn't processed yet.",
    },
    {
      kind: "mcq",
      id: "q-overdraft",
      prompt: "A bank statement shows a balance of £1,500 DR. In the client's books this is:",
      options: ["£1,500 in funds (debit)", "An overdraft of £1,500 (credit balance on Bank)", "A debtor", "An error"],
      answer: 1,
      explain: "From the bank's viewpoint a debit balance means the customer owes the bank: an overdraft, which is a credit balance in the client's books.",
    },
    {
      kind: "mcq",
      id: "q-feed",
      prompt: "Every statement line in a client's Xero bank feed is reconciled, but the Xero bank balance is £2,300 higher than the actual statement. The most likely cause is:",
      options: [
        "Timing differences",
        "A duplicated receipt or a manually entered receipt also imported by the feed",
        "Bank charges",
        "The VAT return",
      ],
      answer: 1,
      explain: "If all feed lines are reconciled, something extra has been recorded in the software, such as a duplicated or manually entered transaction, or the opening balance is wrong.",
    },
    {
      kind: "mcq",
      id: "q-old-lodgement",
      prompt: "An outstanding lodgement of £3,000 is still not on the statement six weeks after the year end. What should you do?",
      options: ["Nothing, it's a timing difference", "Investigate: the money may never have been banked", "Write it off to sundry expenses", "Add it to the next month's reconciliation"],
      answer: 1,
      explain: "Lodgements normally clear in a day or two. One that hasn't cleared after weeks may indicate an error or misappropriation.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "GOV.UK – Business records if you're self-employed", url: "https://www.gov.uk/self-employed-records" },
  ],
};
