import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "aged-debtors-and-creditors",
  title: "Aged debtors and creditors",
  level: "foundation",
  minutes: 30,
  summary:
    "Reading and using the aged receivables and payables reports: what the ageing columns tell you, debtor and creditor days, the warning signs (credit balances, old items, unallocated cash), credit control steps and statutory late-payment interest.",
  objectives: [
    "Read an aged debtors or creditors report and identify the balances that need action",
    "Calculate debtor days and creditor days",
    "Recognise the report errors that indicate bookkeeping problems",
    "Calculate statutory interest on a late business payment",
  ],
  body: [
    {
      kind: "md",
      md: `The **aged debtors** (aged receivables) report lists every customer balance, split into columns by how long each invoice has been outstanding: typically *current*, *1–30 days overdue* (or 31–60 days old), *31–60*, *61–90* and *over 90*. The **aged creditors** (aged payables) report does the same for suppliers.

They're two of the most useful reports in the software: the client uses them to chase money and plan payments; you use them to check that the ledgers are clean and to decide whether any debts are doubtful at the period end.`,
    },
    {
      kind: "table",
      caption: "What to look for",
      head: ["Signal", "What it usually means", "Action"],
      rows: [
        ["Large balances in the 90+ column", "Slow payer, dispute, or customer in difficulty", "Chase; consider an allowance or write-off at the period end"],
        ["Credit balances on customers", "Unallocated receipts, overpayments, duplicate payments", "Allocate or refund"],
        ["Debit balances on suppliers", "Unallocated payments, unrecorded credit notes, duplicate payments", "Allocate, or chase a refund"],
        ["Old invoices on a customer who pays regularly", "Receipts allocated to the wrong invoices, or a disputed invoice", "Reallocate; resolve the dispute"],
        ["Supplier bills overdue but the client says everything is paid", "Payments coded as expenses instead of matched to the bills", "Find and match the payments"],
        ["Balances far older than the client's payment terms across the board", "Weak credit control or an incomplete ledger", "Discuss with the client"],
      ],
    },
    {
      kind: "md",
      md: `### Debtor and creditor days

These ratios convert balances into time, which makes them comparable month to month and between clients.

> **Debtor days** = trade receivables ÷ credit sales × 365
>
> **Creditor days** = trade payables ÷ credit purchases × 365

Use **gross** (VAT-inclusive) sales and purchases if the receivables and payables include VAT, so you're comparing like with like. For a part year, annualise the sales figure or scale the days.

Debtor days of 58 on 30-day terms means customers are paying, on average, almost a month late.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Late payment interest",
      md: `Under the late payment legislation, if a business customer pays late and the contract doesn't set a different rate, the supplier can claim **statutory interest at 8% plus the Bank of England base rate** for business-to-business transactions, and can also claim fixed debt recovery costs. Use the base rate in force at the relevant reference date. Many clients don't claim it, but it's a useful lever in credit control.`,
    },
    {
      kind: "md",
      md: `### A simple credit control routine

1. **Invoice promptly** with clear terms and payment details.
2. **Statement and reminder** shortly after the due date.
3. **Phone call** when 14 days overdue: find out whether there's a dispute.
4. **Final letter** citing the right to statutory interest and recovery costs.
5. **Stop supply** and consider formal recovery for persistent non-payers.

Cloud software can automate reminders. Make sure the aged report is clean first, or customers who've already paid get chased.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Report on the right date",
      md: `Aged reports can be run at any date. For period-end work, run them **at the period end date** and age by **due date** or **invoice date** consistently with last time. A report run today for a 30 June year end will show invoices paid in July as still outstanding, which is what you want for the balance sheet, but remember to look at **after-date receipts** when judging whether old debts are collectable.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "After-date cash is the best evidence",
      md: `When reviewing debtors at a year end, tick each significant balance to receipts after the year end. A balance paid in the following month is clearly collectable. Unpaid old balances are candidates for an allowance or write-off, which you covered in the foundations track.`,
    },
  ],
  scenario: {
    title: "Pike & Sons Engineering's aged debtors at 30 September",
    narrative: `**Pike & Sons Engineering Ltd** sells on **30-day terms**. Its aged debtors report at **30 September 2026** (aged by invoice date):

| Customer | Current (0–30) | 31–60 | 61–90 | 90+ | Total |
|---|---:|---:|---:|---:|---:|
| Harlow Fabrications | 18,000 | 6,000 | – | – | 24,000 |
| Keel Marine | 9,600 | 9,600 | 9,600 | 4,800 | 33,600 |
| Delta Pumps (in administration) | – | – | – | 7,200 | 7,200 |
| Ridge Motors | 12,000 | – | – | (1,400) | 10,600 |
| Others | 8,400 | 2,600 | – | – | 11,000 |
| **Total** | **48,000** | **18,200** | **9,600** | **10,600** | **86,400** |

Gross credit sales for the year to 30 September 2026 were **£540,000**. The finance manager, Owen, asks for your view.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Overall:** debtor days = £86,400 ÷ £540,000 × 365 = **58.4 days**, against 30-day terms. Cash is coming in roughly a month late on average.

**Keel Marine (£33,600):** invoices every month and has paid nothing for over 90 days. That's the biggest risk: £24,000 is overdue. Recommend a call today and a hold on further supplies until a payment plan is agreed.

**Delta Pumps (£7,200):** in administration. Likely irrecoverable: ask the administrator for an estimated dividend; at the year end, write off or provide specifically. VAT bad debt relief will be available once the 6-month conditions are met.

**Ridge Motors (£1,400 credit in 90+):** an old credit balance. Probably an unallocated payment or a credit note that should have been set against an old invoice. Investigate and allocate, or refund.

**Harlow Fabrications:** £6,000 just over 30 days old. Normal chasing.`,
      },
      {
        kind: "callout",
        tone: "example",
        title: "What to put in your note to Owen",
        md: `Debtor days 58 vs 30-day terms. Priority: Keel Marine, £24,000 overdue, stop supply pending a plan. Delta Pumps £7,200 likely irrecoverable. Ridge Motors credit of £1,400 needs allocating. Suggest automated reminders once the ledger is clean.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "debtor-days",
      prompt: "A client has trade receivables of **£45,000** at the year end. Gross credit sales for the year were **£365,000**. What are its debtor days?",
      answer: 45,
      unit: "days",
      explain: "Debtor days = receivables ÷ credit sales × 365.",
      working: "£45,000 ÷ £365,000 × 365 = **45 days**",
    },
    {
      kind: "numeric",
      id: "creditor-days",
      prompt: "Trade payables are **£31,200**. Gross credit purchases for the year were **£284,700**. What are creditor days?",
      answer: 40,
      unit: "days",
      explain: "Creditor days = payables ÷ credit purchases × 365.",
      working: "£284,700 ÷ 365 = £780 a day. £31,200 ÷ £780 = **40 days**",
    },
    {
      kind: "numeric",
      id: "statutory-interest",
      prompt:
        "A business customer pays a **£10,000** invoice **73 days** late. The contract doesn't set an interest rate. Assume the relevant Bank of England base rate is **4%**. How much statutory interest can the client claim (simple interest, 365-day year)?",
      answer: 240,
      unit: "£",
      explain: "Statutory interest for business-to-business debts is 8% plus base rate, so 12% a year on the assumed base rate, applied for the days late.",
      working: "£10,000 × 12% × 73/365 = **£240**",
    },
    {
      kind: "classify",
      id: "classify-aged-actions",
      prompt: "What does each item on the aged reports most likely need?",
      categories: ["Chase the customer", "Bookkeeping correction", "Consider allowance or write-off"],
      items: [
        { text: "A regular customer's £2,000 invoice at 45 days, no dispute", answer: 0 },
        { text: "£850 credit balance on a customer who pays every invoice on time", answer: 1, why: "Probably an unallocated or duplicate payment." },
        { text: "£4,300 owed by a customer that has been dissolved", answer: 2 },
        { text: "Supplier showing three bills overdue that the director insists were paid", answer: 1, why: "The payments were probably coded to expenses rather than matched." },
        { text: "Customer disputing quality and refusing to pay a £3,000 invoice at the year end", answer: 2 },
      ],
      explain: "Old items are either a credit control job, a ledger-cleaning job, or a recoverability judgement. Decide which before acting.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-debit-supplier",
      prompt: "A supplier shows a debit balance on the aged creditors report. This usually means:",
      options: ["The client owes the supplier more", "The supplier owes the client, often from a duplicate payment or unrecorded credit note", "The bill is overdue", "Nothing; it's normal"],
      answer: 1,
      explain: "Payables are normally credits. A debit means an overpayment, unallocated payment or credit note.",
    },
    {
      kind: "mcq",
      id: "q-gross",
      prompt: "When calculating debtor days for a VAT-registered client whose receivables include VAT, use:",
      options: ["Net sales", "Gross (VAT-inclusive) credit sales", "Cash sales", "Gross profit"],
      answer: 1,
      explain: "Compare like with like: receivables include VAT, so use VAT-inclusive credit sales.",
    },
    {
      kind: "mcq",
      id: "q-interest-rate",
      prompt: "The statutory interest rate on late business-to-business payments (with no contractual rate) is:",
      options: ["Base rate", "4% plus base rate", "8% plus base rate", "A flat 8%"],
      answer: 2,
      explain: "8% plus the Bank of England base rate.",
    },
    {
      kind: "mcq",
      id: "q-best-evidence",
      prompt: "At a year end, the best evidence that a debtor balance is collectable is:",
      options: ["The customer's credit rating", "Receipt of the money after the year end", "The customer's promise to pay", "The invoice date"],
      answer: 1,
      explain: "After-date cash receipts give direct evidence that the debt existed and was recoverable.",
    },
    {
      kind: "mcq",
      id: "q-automate",
      prompt: "Before switching on automated payment reminders, you should:",
      options: ["Increase the payment terms", "Clean the aged debtors report: allocate receipts and clear credit balances", "Write off all invoices over 90 days", "File the VAT return"],
      answer: 1,
      explain: "Otherwise customers who've paid will be chased, which damages the client's relationships.",
    },
  ],
  sources: [
    { label: "GOV.UK – Late commercial payments: charging interest", url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery/charging-interest-commercial-debt" },
    { label: "GOV.UK – Late commercial payments: interest and debt recovery", url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery" },
    { label: "HMRC VAT Notice 700/18 – relief from VAT on bad debts", url: "https://www.gov.uk/guidance/relief-from-vat-on-bad-debts-notice-70018" },
    { label: "HMRC Business Income Manual BIM42701 – bad and doubtful debts", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42701" },
  ],
};
