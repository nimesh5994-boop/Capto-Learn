import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "double-entry-debits-and-credits",
  title: "Double entry: debits and credits",
  level: "foundation",
  minutes: 35,
  summary:
    "The debit and credit rules that every bookkeeping system runs on, why debits always equal credits, and how to post the everyday transactions you'll see on every client, with and without VAT.",
  objectives: [
    "State which side increases each type of account using DEAD CLIC",
    "Post common transactions (sales, purchases, receipts, payments, capital, drawings, loans) as balanced journals",
    "Split a VAT-inclusive invoice between net, VAT control and gross",
    "Avoid the classic traps: bank statement wording, drawings and VAT as income",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `In the last lesson you saw that every transaction has a **dual effect**: two things change and the accounting equation still balances. Double-entry bookkeeping is simply a disciplined way of recording both effects.

Each account has two sides. The **left side is the debit (Dr)** side and the **right side is the credit (Cr)** side. Every transaction is recorded as at least one debit and at least one credit **of equal value**. That's why, if every posting is done correctly, total debits in the ledger always equal total credits, which is what the trial balance checks.

"Debit" and "credit" don't mean good or bad, or money in or out. They're just left and right.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "DEAD CLIC",
      md: `| **D**ebit increases | **C**redit increases |
|---|---|
| **E**xpenses | **L**iabilities |
| **A**ssets | **I**ncome |
| **D**rawings | **C**apital |

To **decrease** an account, post to the opposite side. So you reduce an asset with a credit and reduce a liability with a debit.`,
    },
    {
      kind: "table",
      caption: "How each type of account moves",
      head: ["Account type", "Increase", "Decrease", "Normal balance"],
      rows: [
        ["Asset (Bank, Trade receivables (debtors), equipment)", "Debit", "Credit", "Debit"],
        ["Expense (Rent, Wages, Purchases)", "Debit", "Credit", "Debit"],
        ["Drawings", "Debit", "Credit", "Debit"],
        ["Liability (Loan, Trade payables (creditors), VAT owed)", "Credit", "Debit", "Credit"],
        ["Income (Sales, fees, interest received)", "Credit", "Debit", "Credit"],
        ["Capital", "Credit", "Debit", "Credit"],
      ],
    },
    {
      kind: "md",
      md: `### A reliable method for any transaction

1. **Which accounts are affected?** There are always at least two.
2. **What type is each one?** Asset, liability, capital, income, expense or drawings.
3. **Is each one going up or down?**
4. **Apply DEAD CLIC** to get the side, then check debits equal credits.

Most transactions involve the bank, so it's often easiest to start there: money **into** the bank is a **debit** to Bank (an asset increasing); money **out** is a **credit**. Then the other side is the opposite.`,
    },
    {
      kind: "table",
      caption: "Everyday transactions (no VAT)",
      head: ["Transaction", "Debit", "Credit"],
      rows: [
        ["Owner pays money into the business", "Bank", "Capital"],
        ["Cash sale banked", "Bank", "Sales"],
        ["Sale on credit (invoice, paid later)", "Trade receivables (debtors)", "Sales"],
        ["Customer pays the invoice", "Bank", "Trade receivables (debtors)"],
        ["Goods for resale bought on credit", "Purchases", "Trade payables (creditors)"],
        ["Pay the supplier", "Trade payables (creditors)", "Bank"],
        ["Pay rent from the bank", "Rent", "Bank"],
        ["Bank loan received", "Bank", "Loan"],
        ["Owner takes money for personal use", "Drawings", "Bank"],
      ],
    },
    {
      kind: "md",
      md: `### Adding VAT

A VAT-registered business collects VAT for HMRC on its sales (**output tax**) and reclaims VAT on its purchases (**input tax**). Neither is income or an expense of the business. Both go to a single **VAT control** account, which shows what's owed to (credit balance) or from (debit balance) HMRC.

The standard rate is **20%**. If you're given a VAT-inclusive (gross) figure at the standard rate, the VAT is **1/6 of the gross** (because 20/120 = 1/6), and the net is 5/6.`,
    },
    {
      kind: "journal",
      title: "Credit sale with VAT",
      narrative: "Invoice to a customer: £1,000 net + £200 VAT = £1,200. The customer owes the gross; only the net is income.",
      lines: [
        { account: "Trade receivables (debtors)", dr: 1200 },
        { account: "Sales", cr: 1000 },
        { account: "VAT control", cr: 200 },
      ],
    },
    {
      kind: "journal",
      title: "Credit purchase with VAT",
      narrative: "Supplier invoice for goods for resale: £500 net + £100 VAT = £600. The input tax is a debit to VAT control because it reduces what's owed to HMRC.",
      lines: [
        { account: "Purchases", dr: 500 },
        { account: "VAT control", dr: 100 },
        { account: "Trade payables (creditors)", cr: 600 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Classic traps",
      md: `- **The bank statement is written from the bank's point of view.** When a client's statement says "credit", money has come **in**, which in the client's books is a **debit** to Bank. Your client's money is a liability of the bank, so the wording is reversed.
- **Drawings are not an expense.** Post them to Drawings, never to Wages or Sundry expenses.
- **VAT isn't income.** Posting the gross sale to Sales overstates turnover and profit and understates the VAT liability.
- **A credit sale is income when invoiced, not when paid.** The later receipt just clears the debtor; it isn't a second sale.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Check your journal before you post it",
      md: `Add up the debits and the credits. If they don't agree, stop. Cloud accounting software such as Xero or QuickBooks won't let you post an unbalanced manual journal, but it will happily let you post a balanced one to the **wrong side**. Read it back as a sentence: "Debit Rent, credit Bank: rent expense up, bank down." If the sentence sounds wrong, it is.`,
    },
  ],
  scenario: {
    title: "Callum's first month at Reid Cycle Repairs",
    narrative: `Callum Reid has opened **Reid Cycle Repairs**, a sole-trader bike workshop. He isn't VAT registered. He's sent you his first month's paperwork and wants to know *"how much is left in the bank and what do I owe?"*

1. Paid **£6,000** of his own money into the business bank account.
2. Bought spare parts for resale on credit from Velo Wholesale: **£1,450**.
3. Cash and card repair takings banked: **£2,320**.
4. Invoiced a local delivery firm **£880** for servicing its bikes, on 30-day terms.
5. Paid the workshop rent: **£750**.
6. Paid Velo Wholesale **£1,000** on account.
7. Transferred **£500** to his personal account.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Journals for the month",
        head: ["#", "Debit", "Credit", "£", "Reasoning"],
        rows: [
          ["1", "Bank", "Capital", "6,000", "Asset up (Dr); capital up (Cr)"],
          ["2", "Purchases", "Trade payables (creditors)", "1,450", "Expense up (Dr); liability up (Cr)"],
          ["3", "Bank", "Sales", "2,320", "Asset up (Dr); income up (Cr)"],
          ["4", "Trade receivables (debtors)", "Sales", "880", "Asset up (Dr); income up (Cr). Income is recognised when invoiced"],
          ["5", "Rent", "Bank", "750", "Expense up (Dr); asset down (Cr)"],
          ["6", "Trade payables (creditors)", "Bank", "1,000", "Liability down (Dr); asset down (Cr)"],
          ["7", "Drawings", "Bank", "500", "Drawings up (Dr); asset down (Cr)"],
        ],
      },
      {
        kind: "md",
        md: `**Bank balance:** £6,000 + £2,320 − £750 − £1,000 − £500 = **£4,070** (debit balance, money in the bank).

**Owed to Velo Wholesale:** £1,450 − £1,000 = **£450** (credit balance on Trade payables).

**Owed to Callum by the delivery firm:** **£880** (debit balance on Trade receivables).

**Profit so far:** Sales £2,320 + £880 = £3,200, less Purchases £1,450 and Rent £750 = **£1,000**. The £500 drawings don't reduce profit.

Total debits posted = total credits posted = **£12,900**, so the double entry is complete.`,
      },
      {
        kind: "journal",
        title: "Transaction 6 in journal form",
        narrative: "Paying a supplier clears the liability; it is not a new expense. The expense was recognised when the invoice was posted in transaction 2.",
        lines: [
          { account: "Trade payables (creditors)", dr: 1000 },
          { account: "Bank", cr: 1000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-increase-side",
      prompt: "For each account, which side records an **increase**?",
      categories: ["Debit", "Credit"],
      items: [
        { text: "Rent", answer: 0, why: "Expense." },
        { text: "Loan", answer: 1, why: "Liability." },
        { text: "Sales", answer: 1, why: "Income." },
        { text: "Bank (money in the bank)", answer: 0, why: "Asset." },
        { text: "Drawings", answer: 0 },
        { text: "Capital", answer: 1 },
        { text: "Trade payables (creditors)", answer: 1, why: "Liability." },
        { text: "Trade receivables (debtors)", answer: 0, why: "Asset." },
      ],
      explain: "DEAD CLIC: debits increase Expenses, Assets and Drawings; credits increase Liabilities, Income and Capital.",
    },
    {
      kind: "journal",
      id: "van-introduced",
      prompt:
        "A sole trader transfers her own van, worth **£7,000**, into the business to use for deliveries. No money changes hands. Post the journal.",
      accounts: ["Motor vehicles – cost", "Capital", "Bank", "Loan", "Drawings", "Sales"],
      answer: [
        { account: "Motor vehicles – cost", dr: 7000 },
        { account: "Capital", cr: 7000 },
      ],
      explain:
        "The business gains an asset (debit) and the owner has put more into the business, so capital increases (credit). Bank isn't involved because no money moved. It isn't a loan unless the owner has agreed it will be repaid as a loan, and it's the opposite of drawings.",
    },
    {
      kind: "journal",
      id: "vat-credit-sale",
      prompt:
        "A VAT-registered joinery firm invoices a customer **£2,000 plus VAT at 20%** for fitted shelving, payable in 30 days. Post the invoice.",
      accounts: ["Trade receivables (debtors)", "Sales", "VAT control", "Bank", "Purchases", "Trade payables (creditors)"],
      answer: [
        { account: "Trade receivables (debtors)", dr: 2400 },
        { account: "Sales", cr: 2000 },
        { account: "VAT control", cr: 400 },
      ],
      explain:
        "The customer owes the gross £2,400. Only the net £2,000 is the firm's income; the £400 output tax is owed to HMRC, so it's credited to VAT control. Nothing goes to Bank until the customer pays.",
    },
    {
      kind: "journal",
      id: "vat-credit-purchase",
      prompt:
        "A VAT-registered shop receives a supplier invoice for stock costing **£1,560 including VAT at 20%**, on credit. Post the invoice.",
      accounts: ["Purchases", "VAT control", "Trade payables (creditors)", "Trade receivables (debtors)", "Bank", "Sales"],
      answer: [
        { account: "Purchases", dr: 1300 },
        { account: "VAT control", dr: 260 },
        { account: "Trade payables (creditors)", cr: 1560 },
      ],
      explain:
        "VAT at the standard rate is 1/6 of the gross: £1,560 ÷ 6 = £260. The net £1,300 is the cost of stock. Input tax is a debit to VAT control (it reduces the amount owed to HMRC), and the supplier is owed the full £1,560.",
    },
    {
      kind: "numeric",
      id: "bank-balance",
      prompt: `A new business has these bank transactions in its first month. What's the bank balance at the end of the month? (Give a positive number if the business has money in the bank.)

- Owner introduces capital: £10,000
- Cash purchases of stock: £3,200
- Cash sales banked: £4,750
- Rent paid: £900
- Owner's drawings: £600
- Bank loan received: £5,000`,
      answer: 15050,
      unit: "£",
      explain: "Debits to Bank are money in; credits are money out. The loan is money in even though it isn't income.",
      working: `Money in (Dr): £10,000 + £4,750 + £5,000 = £19,750

Money out (Cr): £3,200 + £900 + £600 = £4,700

Balance = £19,750 − £4,700 = **£15,050** debit (in the bank)`,
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-drawings-side",
      prompt: "The owner takes £300 from the business bank account for personal use. What's the entry?",
      options: ["Dr Bank, Cr Drawings", "Dr Drawings, Cr Bank", "Dr Wages, Cr Bank", "Dr Capital, Cr Drawings"],
      answer: 1,
      explain: "Drawings increase with a debit; the bank (an asset) decreases with a credit.",
    },
    {
      kind: "mcq",
      id: "q-statement-credit",
      prompt: "A client's bank statement shows a £500 **credit**. In the client's own books, the entry to Bank is:",
      options: ["A credit, because the statement says credit", "A debit, because money has come in", "Nothing until reconciled", "A credit to Capital"],
      answer: 1,
      explain: "The statement is from the bank's viewpoint. Money coming in increases the client's asset, which is a debit to Bank.",
    },
    {
      kind: "mcq",
      id: "q-loan-received",
      prompt: "A business receives a £5,000 bank loan. Which accounts are debited and credited?",
      options: ["Dr Loan, Cr Bank", "Dr Bank, Cr Sales", "Dr Bank, Cr Capital", "Dr Bank, Cr Loan"],
      answer: 3,
      explain: "Bank (asset) goes up with a debit; the loan (liability) goes up with a credit. A loan isn't income or capital.",
    },
    {
      kind: "mcq",
      id: "q-vat-fraction",
      prompt: "A standard-rated sale has a gross value of £720. How much is VAT?",
      options: ["£144", "£120", "£600", "£72"],
      answer: 1,
      explain: "At 20%, VAT is 1/6 of the gross: £720 ÷ 6 = £120 (net £600). £144 is 20% of the gross, a common mistake.",
    },
    {
      kind: "mcq",
      id: "q-customer-pays",
      prompt: "A customer pays a £1,200 invoice that was posted last month. What's the entry?",
      options: ["Dr Bank, Cr Sales", "Dr Trade receivables (debtors), Cr Bank", "Dr Bank, Cr Trade receivables (debtors)", "Dr Sales, Cr Trade receivables (debtors)"],
      answer: 2,
      explain: "The sale was recognised when invoiced. The receipt increases Bank and clears the debtor. Crediting Sales again would double-count the income.",
    },
    {
      kind: "mcq",
      id: "q-normal-balance",
      prompt: "Which of these accounts would normally have a **credit** balance?",
      options: ["Trade payables (creditors)", "Wages", "Drawings", "Trade receivables (debtors)"],
      answer: 0,
      explain: "Trade payables are a liability, which has a credit balance. Wages (expense), Drawings and Trade receivables (asset) normally have debit balances.",
    },
  ],
  sources: [
    { label: "GOV.UK – VAT rates", url: "https://www.gov.uk/vat-rates" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records (including the VAT account)", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "GOV.UK – What records to keep (self-employed)", url: "https://www.gov.uk/self-employed-records/what-records-to-keep" },
    { label: "ACCA – FA1 Recording Financial Transactions: study resources (double entry and the trial balance)", url: "https://www.accaglobal.com/gb/en/student/exam-support-resources/foundation-level-study-resources/fa1.html" },
  ],
};
