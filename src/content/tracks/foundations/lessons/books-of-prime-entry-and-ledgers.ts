import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "books-of-prime-entry-and-ledgers",
  title: "Books of prime entry and the ledgers",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "How a transaction travels from a source document, through a book of prime entry (day books, cash book, petty cash book, journal), into the nominal ledger and the customer and supplier ledgers, and what cloud software is doing for you behind the scenes.",
  objectives: [
    "Match each common source document to the right book of prime entry",
    "Post day-book totals to the nominal ledger as a balanced journal",
    "Explain the difference between the nominal ledger, the sales (receivables) ledger and the purchase (payables) ledger",
    "Work out an individual customer's or supplier's balance from their ledger account",
  ],
  body: [
    {
      kind: "md",
      md: `In the last lesson you posted every transaction straight into the accounts as a debit and a credit. That works for seven transactions. It doesn't work for a business raising 400 invoices a month. Real bookkeeping systems split the job into three stages:

1. **Source documents.** The evidence that something happened: a sales invoice, a supplier invoice, a credit note, a bank statement line, a till receipt, a payroll report.
2. **Books of prime entry** (also called books of original entry). Lists where similar transactions are first recorded, one line each, with the totals added up.
3. **Ledgers.** The accounts themselves. The day-book **totals** are posted to the nominal ledger in one go, and each **individual line** is posted to the right customer or supplier account.

Cloud software such as Xero, QuickBooks Online, Sage and FreeAgent still works exactly this way. When you approve a sales invoice, the software writes the line into its "sales day book" (the invoices list), updates the customer's account and posts the double entry to the nominal ledger, all in one click. Knowing the underlying flow is what lets you find out *why* a report looks wrong.`,
    },
    {
      kind: "table",
      caption: "The books of prime entry",
      head: ["Book of prime entry", "Source document", "What it records"],
      rows: [
        ["Sales day book", "Sales invoices issued", "Credit sales: customer, invoice number, net, VAT, gross"],
        ["Sales returns day book", "Credit notes issued to customers", "Reductions in what customers owe"],
        ["Purchases day book", "Supplier invoices received", "Credit purchases and expenses, analysed by nominal code"],
        ["Purchase returns day book", "Credit notes received from suppliers", "Reductions in what the business owes"],
        ["Cash book", "Bank statements, remittances, paying-in slips", "Every receipt into and payment out of the bank"],
        ["Petty cash book", "Petty cash vouchers and till receipts", "Small cash payments from the office float"],
        ["The journal", "Journal vouchers, workings, payroll reports", "Anything that doesn't belong in another book: depreciation, accruals, corrections, payroll, opening balances"],
      ],
    },
    {
      kind: "md",
      md: `### The three ledgers

- **Nominal (general) ledger.** Every account in the trial balance: Sales, Purchases, Rent, Bank, VAT control, Trade receivables control and so on. This is where the double entry lives.
- **Sales ledger (receivables ledger).** One account per customer, showing what each owes. Its total should equal the **Trade receivables control** account in the nominal ledger.
- **Purchase ledger (payables ledger).** One account per supplier. Its total should equal the **Trade payables control** account.

In most systems (and in all cloud software) the customer and supplier ledgers are **memorandum** ledgers: they give the detail, but the double entry is made through the control account. That's why reconciling the aged debtors report to the control account is such an important check, which you'll practise later in this track.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Why the records must exist",
      md: `A company must keep accounting records that are "sufficient to show and explain the company's transactions" and that disclose its financial position with reasonable accuracy at any time (Companies Act 2006 s386). Sole traders and landlords must keep records of all sales and income and all business expenses to support their tax return. Books of prime entry plus the source documents behind them are how you meet that requirement.`,
    },
    {
      kind: "journal",
      title: "Posting a week's sales day book totals",
      narrative:
        "The sales day book totals for the week are net £4,450, VAT £890, gross £5,340. One journal posts the totals; each customer's account in the sales ledger is debited with its own invoice.",
      lines: [
        { account: "Trade receivables control", dr: 5340 },
        { account: "Sales", cr: 4450 },
        { account: "VAT control", cr: 890 },
      ],
    },
    {
      kind: "md",
      md: `### The cash book is a book of prime entry *and* a ledger account

In a manual system the cash book usually doubles as the Bank account in the nominal ledger, so only the **other side** of each entry needs posting. Cloud software does the same: each bank statement line you reconcile is the cash book entry, and the account code you choose is the other side of the double entry.

### The journal

The journal is for entries that don't come from a day book or the bank. Every journal should have a **narrative** explaining why it was posted and a reference to the working paper or document behind it. A journal without a narrative is the first thing a reviewer will query.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Posting a supplier invoice as a bank payment.** If the invoice is entered as a "spend money" transaction on the day it's received, the supplier ledger never shows it, so the creditors figure is wrong and the payment later gets coded twice.
- **Recording a customer receipt against Sales instead of the invoice.** The sale was already in the sales day book. Allocate the receipt to the invoice, otherwise income is double-counted and the debtor never clears.
- **Journals with no narrative.** Six months later nobody, including you, will know why it was posted.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Use the analysis columns",
      md: `A purchases day book line is rarely just "Purchases". Analyse each invoice to the right expense code (stock, motor, telephone, repairs) when you enter it. In cloud software that's the account code on each invoice line. Getting the analysis right at entry saves hours of reclassification at year end.`,
    },
  ],
  scenario: {
    title: "Posting a week's invoices for Hartley Interiors Ltd",
    narrative: `Hartley Interiors Ltd is a VAT-registered interior design company. The office manager, Gemma, keeps a manual sales day book in a spreadsheet and has asked you to post the week to the nominal ledger and update the customer accounts.

| Date | Customer | Invoice | Net | VAT | Gross |
|---|---|---|---:|---:|---:|
| 2 Mar | Linden Dental Practice | 1041 | £1,200 | £240 | £1,440 |
| 4 Mar | Marsh & Co Solicitors | 1042 | £850 | £170 | £1,020 |
| 6 Mar | Linden Dental Practice | 1043 | £2,400 | £480 | £2,880 |

Linden Dental Practice already owed **£600** at the start of the week, and paid **£600** on 5 March.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: check the day book.** Add the columns down and across. Net £4,450 + VAT £890 = gross £5,340, and each line's VAT is 20% of its net. Cross-casting (checking the column totals agree with each other) catches most arithmetic errors before they reach the ledger.

**Step 2: post the totals to the nominal ledger** in a single journal: Dr Trade receivables control £5,340, Cr Sales £4,450, Cr VAT control £890.

**Step 3: post each line to the customer accounts** in the sales ledger.`,
      },
      {
        kind: "table",
        caption: "Sales ledger: Linden Dental Practice",
        head: ["Date", "Detail", "Debit", "Credit", "Balance"],
        rows: [
          ["1 Mar", "Balance brought forward", "", "", "£600 Dr"],
          ["2 Mar", "Invoice 1041", "£1,440", "", "£2,040 Dr"],
          ["5 Mar", "Receipt (cash book)", "", "£600", "£1,440 Dr"],
          ["6 Mar", "Invoice 1043", "£2,880", "", "£4,320 Dr"],
        ],
      },
      {
        kind: "md",
        md: `**Step 4: check the ledger agrees with the control account.** The receipt of £600 came through the **cash book** (Dr Bank, Cr Trade receivables control), not the sales day book. After the week:

- Linden Dental Practice: **£4,320**
- Marsh & Co Solicitors: **£1,020**
- Sales ledger total: **£5,340**, which equals the control account (£600 opening + £5,340 invoiced − £600 received = £5,340).`,
      },
      {
        kind: "journal",
        title: "The receipt from Linden Dental Practice (from the cash book)",
        narrative: "The receipt clears part of the debtor. It is not income: the income was recognised when the invoice went through the sales day book.",
        lines: [
          { account: "Bank", dr: 600 },
          { account: "Trade receivables control", cr: 600 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-books",
      prompt: "Which book of prime entry would each document first be recorded in?",
      categories: ["Sales day book", "Purchases day book", "Sales returns day book", "Purchase returns day book", "Cash book", "Petty cash book", "The journal"],
      items: [
        { text: "An invoice sent to a customer for work done on 30-day terms", answer: 0 },
        { text: "A supplier's invoice for stationery, to be paid next month", answer: 1 },
        { text: "A credit note issued to a customer for faulty goods returned", answer: 2 },
        { text: "A credit note received from a supplier for an overcharge", answer: 3 },
        { text: "A BACS payment to a supplier shown on the bank statement", answer: 4 },
        { text: "A till receipt for £6.40 of milk bought from the office float", answer: 5 },
        { text: "The year-end depreciation charge on the company van", answer: 6, why: "No day book or bank movement is involved, so it goes through the journal." },
      ],
      explain:
        "Credit transactions go through the day books (invoices and credit notes, sales and purchases); money moving in or out of the bank goes through the cash book; small cash spends go through the petty cash book; everything else goes through the journal.",
    },
    {
      kind: "journal",
      id: "post-purchases-day-book",
      prompt: `A VAT-registered client's purchases day book for the month has these totals: **Purchases £2,600**, **Motor expenses £350**, **VAT £590**, **Gross £3,540**. Post the totals to the nominal ledger.`,
      accounts: ["Purchases", "Motor expenses", "VAT control", "Trade payables control", "Trade receivables control", "Bank", "Sales"],
      answer: [
        { account: "Purchases", dr: 2600 },
        { account: "Motor expenses", dr: 350 },
        { account: "VAT control", dr: 590 },
        { account: "Trade payables control", cr: 3540 },
      ],
      explain:
        "Each analysis column is debited to its expense account and the VAT column to VAT control (input tax reduces what's owed to HMRC). The gross total is credited to the payables control account because the suppliers haven't been paid yet. Bank isn't involved until the cash book records the payments.",
    },
    {
      kind: "numeric",
      id: "supplier-balance",
      prompt: `Your client's purchase ledger account for Stanton Timber shows: balance owed at 1 June **£1,800**; invoices received in June **£2,640**; a credit note received for damaged boards **£240**; a payment made on 20 June **£1,800**. How much does the client owe Stanton Timber at 30 June?`,
      answer: 2400,
      unit: "£",
      explain:
        "A supplier account is a liability: invoices increase it (credit), credit notes and payments reduce it (debit).",
      working: "£1,800 + £2,640 − £240 − £1,800 = **£2,400** owed (credit balance).",
    },
    {
      kind: "mcq",
      id: "memorandum-ledger",
      prompt:
        "In a system where the Trade receivables control account is part of the nominal ledger, what is the sales ledger?",
      options: [
        "A second set of double entry that must also balance against Sales",
        "A memorandum ledger giving the detail of what each customer owes",
        "The same thing as the sales day book",
        "A list of cash sales only",
      ],
      answer: 1,
      explain:
        "The double entry runs through the control account. The individual customer accounts give the analysis behind that one figure, and their total should agree to it. The day book is the list of invoices, not the accounts themselves.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-credit-note-issued",
      prompt: "A client issues a credit note to a customer. Which book of prime entry records it first?",
      options: ["Sales day book", "Sales returns day book", "Purchase returns day book", "Cash book"],
      answer: 1,
      explain: "Credit notes issued to customers go through the sales returns day book. They reduce the customer's balance and the sales figure.",
    },
    {
      kind: "mcq",
      id: "q-what-posted-nominal",
      prompt: "From the sales day book, what is posted to the nominal ledger?",
      options: ["Each invoice line individually to Sales", "The column totals, as one balanced entry", "Only the gross total", "Nothing; only the customer accounts are updated"],
      answer: 1,
      explain: "The totals are posted to the nominal ledger in one entry (Dr receivables control, Cr Sales, Cr VAT control). Individual lines go to the customer accounts.",
    },
    {
      kind: "mcq",
      id: "q-journal-use",
      prompt: "Which of these would normally be entered through the journal?",
      options: ["A supplier invoice for electricity", "A customer receipt by BACS", "A year-end accrual for accountancy fees", "Cash spent on postage stamps"],
      answer: 2,
      explain: "Accruals, depreciation, corrections and opening balances don't come through a day book or the bank, so they're journals.",
    },
    {
      kind: "mcq",
      id: "q-receipt-coding",
      prompt: "A customer pays an invoice already in the sales ledger. A junior codes the bank receipt to Sales. What's the effect?",
      options: ["None, it nets off", "Sales overstated and the debtor never clears", "VAT understated only", "Sales understated"],
      answer: 1,
      explain: "The income was already recognised when the invoice was posted. Coding the receipt to Sales counts it twice and leaves the invoice outstanding on the aged debtors report.",
    },
    {
      kind: "mcq",
      id: "q-s386",
      prompt: "Under Companies Act 2006 s386, a company's accounting records must:",
      options: [
        "Be audited every year",
        "Be sufficient to show and explain its transactions",
        "Be kept on paper at the registered office",
        "Be filed at Companies House with the accounts",
      ],
      answer: 1,
      explain: "s386 requires records sufficient to show and explain the company's transactions and disclose its financial position with reasonable accuracy at any time.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "GOV.UK – Business records if you're self-employed", url: "https://www.gov.uk/self-employed-records" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
  ],
};
