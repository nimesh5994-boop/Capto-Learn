import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "control-account-reconciliations",
  title: "Control account reconciliations",
  level: "practitioner",
  minutes: 35,
  summary:
    "Building the receivables and payables control accounts from the books of prime entry, reconciling them to the sales and purchase ledger listings, finding the differences, and applying the same discipline to VAT, payroll and other control accounts.",
  objectives: [
    "Prepare receivables and payables control accounts from summarised transactions",
    "Reconcile a control account to the ledger listing (aged debtors or creditors)",
    "Decide whether a difference affects the control account, the listing, or both",
    "Reconcile the VAT and payroll control accounts at a period end",
  ],
  body: [
    {
      kind: "md",
      md: `A **control account** is a single nominal ledger account that holds the total of many individual accounts kept elsewhere. Trade receivables control holds the total owed by all customers; the sales ledger holds each customer's balance. If both have been posted correctly, they agree.

Reconciling the two is a powerful check because the figures reach them by **different routes**: the control account is posted with **totals** from the day books and cash book; the individual accounts are posted **line by line**. An error in one route shows up as a difference.`,
    },
    {
      kind: "table",
      caption: "What goes through the receivables control account",
      head: ["Debit (increases)", "Credit (decreases)"],
      rows: [
        ["Balance b/d", "Receipts from customers (cash book)"],
        ["Credit sales including VAT (sales day book)", "Credit notes / sales returns (sales returns day book)"],
        ["Dishonoured cheques (cash book)", "Discounts allowed"],
        ["Refunds paid to customers", "Irrecoverable debts written off (journal)"],
        ["", "Contras with the payables ledger (journal)"],
        ["", "Balance c/d"],
      ],
    },
    {
      kind: "md",
      md: `The **payables control account** is the mirror image: credit purchases increase it (credit), payments, returns, discounts received and contras reduce it (debit).

**Cash sales and cash purchases never go through the control accounts**, because no customer or supplier balance was created.

A **contra** happens when a business both buys from and sells to the same party and the two agree to set off balances: Dr Trade payables control, Cr Trade receivables control, and both individual accounts are updated.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Which side is wrong?",
      md: `Before adjusting anything, ask how the error arose:

- **An error in a day-book total or a posting from it to the nominal ledger** affects the **control account only**.
- **An error posting an individual line to a customer's account**, or extracting the listing, affects the **listing only**.
- **An entry missed out of the books entirely** affects **both** and won't show up as a difference at all.`,
    },
    {
      kind: "md",
      md: `### Other control accounts

The same idea applies to every balance sheet control account you'll meet:

- **VAT control:** after each return is filed, the balance should equal the liability (or repayment) on the latest return, plus any earlier unpaid returns. Anything else means a payment or refund is mis-posted, a manual journal hit the account, or a transaction was backdated into a filed period.
- **PAYE/NIC liability:** should equal what's due to HMRC for the latest month(s) per the payroll reports.
- **Net wages, pensions, director's loan, credit cards:** each should agree to an external document or report.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Cloud software and the 'it always agrees' trap",
      md: `In Xero or QuickBooks the aged debtors report and the receivables control account are generated from the same data, so they usually agree by design. They can still differ if someone posts a **manual journal directly to the control account**, or if a payment is **received** but not **allocated** to an invoice. Lock the control accounts against manual journals where the software allows, and review the aged reports for unallocated credits and very old items.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A reconciliation that convinces a reviewer",
      md: `Show the balance per the control account, the balance per the listing, each adjustment to either side with a one-line reason, and the agreed figure. Attach the aged report. Date it and initial it.`,
    },
  ],
  scenario: {
    title: "Reconciling Brindle Wholesale's debtors",
    narrative: `**Brindle Wholesale Ltd** keeps its sales ledger in an old desktop system and posts totals to the nominal ledger by hand. At **31 March 2026**:

- Trade receivables control account: **£48,320**
- Total of the aged debtors listing: **£47,105**

Your investigation finds:

1. A credit note for **£450** was posted to the customer's account but left out of the sales returns day book total posted to the control account.
2. A contra of **£300** with a customer who is also a supplier was posted to both individual accounts but not to either control account.
3. A customer with a balance of **£185** was missed off the listing.
4. An invoice for **£280** was posted twice to a customer's individual account.
5. A debt of **£560** was written off in the customer's account, but the journal to the control account was never posted.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Adjusting the control account",
        head: ["", "£"],
        rows: [
          ["Balance per control account", "48,320"],
          ["Credit note omitted from control (item 1)", "(450)"],
          ["Contra not posted to control (item 2)", "(300)"],
          ["Irrecoverable debt not posted to control (item 5)", "(560)"],
          ["**Adjusted control account**", "**47,010**"],
        ],
      },
      {
        kind: "table",
        caption: "Adjusting the listing",
        head: ["", "£"],
        rows: [
          ["Balance per aged debtors listing", "47,105"],
          ["Customer balance omitted (item 3)", "185"],
          ["Invoice duplicated in customer account (item 4)", "(280)"],
          ["**Adjusted listing**", "**47,010**"],
        ],
      },
      {
        kind: "md",
        md: `Both sides now show **£47,010**, so the receivables figure for the accounts is £47,010.

Items 1, 2 and 5 need journals in the nominal ledger. Item 4 needs the duplicate removing from the customer's account (otherwise the customer will be chased for money they don't owe). Item 3 is a reporting fix only. Item 2 also needs posting to the **payables** control account.`,
      },
      {
        kind: "journal",
        title: "Journal to correct the control accounts",
        lines: [
          { account: "Sales returns", dr: 375 },
          { account: "VAT control", dr: 75 },
          { account: "Trade payables control", dr: 300 },
          { account: "Irrecoverable debts expense", dr: 560 },
          { account: "Trade receivables control", cr: 1310 },
        ],
        narrative:
          "The £450 credit note was for £375 net plus £75 VAT (standard-rated). The irrecoverable debt is shown net of any VAT relief, which hasn't been claimed yet. Total credit to control: £450 + £300 + £560 = £1,310.",
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "receivables-control",
      prompt: `Prepare the receivables control account and find the closing balance.

- Balance b/d **£22,400**
- Credit sales (gross) **£96,500**
- Cash sales **£8,200**
- Receipts from credit customers **£88,200**
- Discounts allowed **£1,100**
- Sales returns **£2,300**
- Irrecoverable debts written off **£900**
- Customer cheque dishonoured **£600**`,
      answer: 27000,
      unit: "£",
      explain: "Cash sales never go through the control account. A dishonoured cheque reinstates the debt, so it's a debit.",
      working: `Debits: 22,400 + 96,500 + 600 = £119,500

Credits: 88,200 + 1,100 + 2,300 + 900 = £92,500

Balance c/d = **£27,000** debit`,
    },
    {
      kind: "numeric",
      id: "payables-control",
      prompt: `Find the closing balance on the payables control account.

- Balance b/d **£15,600** (credit)
- Credit purchases (gross) **£74,800**
- Payments to suppliers **£70,100**
- Purchase returns **£1,900**
- Contra with receivables ledger **£700**`,
      answer: 17700,
      unit: "£",
      explain: "Purchases increase the liability (credit); payments, returns and contras reduce it (debit).",
      working: "£15,600 + £74,800 − £70,100 − £1,900 − £700 = **£17,700** credit",
    },
    {
      kind: "journal",
      id: "contra-journal",
      prompt: "A client both buys from and sells to Ellis Metals. They agree to set off **£700** owed by Ellis against the client's balance owed to Ellis. Post the contra in the nominal ledger.",
      accounts: ["Trade payables control", "Trade receivables control", "Bank", "Sales", "Purchases", "Suspense"],
      answer: [
        { account: "Trade payables control", dr: 700 },
        { account: "Trade receivables control", cr: 700 },
      ],
      explain: "Both balances are reduced: the liability with a debit, the asset with a credit. No cash moves. Remember to update both of Ellis's individual accounts too.",
    },
    {
      kind: "classify",
      id: "classify-which-side",
      prompt: "Which side of the reconciliation does each error affect?",
      categories: ["Control account only", "Ledger listing only", "Neither (no difference arises)"],
      items: [
        { text: "The sales day book was undercast by £1,000", answer: 0, why: "The total posted to the control was wrong; individual invoices were posted correctly." },
        { text: "An invoice was posted to the wrong customer's account", answer: 2, why: "The total of the listing is unchanged." },
        { text: "A customer's balance was listed as £1,350 instead of £1,530", answer: 1 },
        { text: "A receipt was posted to the customer's account but omitted from the cash book total", answer: 0 },
        { text: "An invoice was never entered anywhere", answer: 2 },
        { text: "A credit note was posted to the customer's account as an invoice", answer: 1 },
      ],
      explain: "Totals from day books feed the control account; individual lines feed the customer accounts. Errors of omission and posting to the wrong customer don't create a difference, which is why aged debtors still need reviewing line by line.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-cash-sales",
      prompt: "Are cash sales posted to the receivables control account?",
      options: ["Yes, always", "No, no customer balance is created", "Only if VAT is charged", "Only at the year end"],
      answer: 1,
      explain: "Cash sales go Dr Bank, Cr Sales (and VAT). The control account only records amounts owed by credit customers.",
    },
    {
      kind: "mcq",
      id: "q-discount-received",
      prompt: "Discounts received from suppliers are recorded in the payables control account as:",
      options: ["A debit", "A credit", "Not recorded", "In the receivables control account"],
      answer: 0,
      explain: "A discount received reduces what's owed to suppliers: a debit to payables control.",
    },
    {
      kind: "mcq",
      id: "q-vat-control-check",
      prompt: "After the March VAT return (liability £4,820) is filed and before it's paid, the VAT control account should show:",
      options: ["Nil", "£4,820 credit, plus any later transactions since the period end", "£4,820 debit", "The total VAT on sales for the year"],
      answer: 1,
      explain: "The account should agree to the unpaid return liability, plus VAT on transactions posted after the return period. Anything else needs investigating.",
    },
    {
      kind: "mcq",
      id: "q-day-book-undercast",
      prompt: "The purchases day book is overcast by £200. The effect is:",
      options: ["Payables control £200 too high", "The listing £200 too high", "Both £200 too high", "No effect"],
      answer: 0,
      explain: "The day-book total goes to the control account; the individual supplier accounts are posted from the individual invoices, which were right.",
    },
    {
      kind: "mcq",
      id: "q-unallocated",
      prompt: "In cloud software, a customer's receipt has been recorded but not allocated to their invoice. On the aged debtors report you'd expect to see:",
      options: [
        "Nothing unusual",
        "The invoice still outstanding and an unallocated credit on the same customer",
        "The receipt shown as a sale",
        "A difference to the control account",
      ],
      answer: 1,
      explain: "The balance is right in total, but the ageing is wrong and the customer may be chased for a paid invoice. Allocate the receipt.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records (the VAT account)", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "GOV.UK – Running payroll: reporting to HMRC", url: "https://www.gov.uk/running-payroll/reporting-to-hmrc" },
  ],
};
