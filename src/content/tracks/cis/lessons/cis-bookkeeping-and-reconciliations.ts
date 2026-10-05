import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cis-bookkeeping-and-reconciliations",
  title: "CIS bookkeeping: ledgers, control accounts and month-end reconciliations",
  level: "practitioner",
  minutes: 40,
  summary:
    "How to set up and run the CIS accounts for contractors and subcontractors: nominal codes, subcontractor ledgers, the CIS liability and recoverable control accounts, month-end reconciliation to the CIS return and statements, and how to correct errors.",
  objectives: [
    "Set up the nominal accounts needed for CIS in a contractor's and a subcontractor's books",
    "Post a mixed month of subcontractor invoices with different rates and VAT treatments",
    "Reconcile the CIS liability account to the monthly return and the HMRC payment",
    "Reconcile the CIS recoverable account to payment statements for a subcontractor",
    "Identify and correct common CIS posting errors",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `CIS creates a **third party in every transaction**: HMRC. The cash to the subcontractor is not the whole story, because part of the invoice is paid to HMRC on the subcontractor's behalf. Good bookkeeping makes the **return**, the **payment** and the **statements** all agree. A clean set of control accounts makes the monthly cycle easy; messy coding makes it a monthly scramble.`,
    },
    {
      kind: "table",
      caption: "Suggested accounts",
      head: ["Account", "Contractor's books", "Subcontractor's books"],
      rows: [
        ["Subcontractor costs (labour / materials, perhaps separate)", "Expense: **Dr** on invoices", "n/a"],
        ["Sales (gross, excluding VAT)", "n/a", "Income: **Cr** on invoices"],
        ["CIS liability (HMRC)", "Liability: **Cr** deductions made; **Dr** payments to HMRC", "n/a"],
        ["CIS tax recoverable (suffered)", "n/a", "Asset: **Dr** deductions suffered; **Cr** when set against PAYE/NIC or claimed"],
        ["VAT control (input and output; reverse charge)", "Input and output where the reverse charge applies", "Output; reverse charge supplies show in sales only"],
        ["Trade creditors / debtors", "Supplier ledger by subcontractor", "Customer ledger by contractor"],
      ],
    },
    {
      kind: "md",
      md: `### The contractor's monthly routine

1. **Post** each subcontractor invoice with the **labour/materials split**, **VAT** (normal or reverse charge) and the **CIS deduction** (the deduction is a liability credited at the time of the invoice).
2. **Pay** subcontractors **net** of the deduction.
3. **Run the CIS report** from the accounts: gross, materials, liable amount and deduction for each subcontractor for the **tax month (6th to 5th)**. Remember that the tax month does **not** match the calendar month, so use **dates of payment** (not invoice dates) to place items. Many systems have a CIS **tax month filter**.
4. **File** the return, **pay HMRC** and post the payment against the **CIS liability** account.
5. **Reconcile**: the **CIS liability account** after the payment should be **nil** (or the next month's deductions only), and the **return total** should equal the **sum of deductions posted**.

### The subcontractor's monthly routine

1. **Post sales** at the gross amount excluding VAT.
2. **Post the deduction** as CIS tax recoverable, with cash received net.
3. **Reconcile** to the contractor's **payment and deduction statement**: gross, materials, deduction.
4. **Chase** any contractor statement not received by the 19th.
5. **Year end**: total the CIS recoverable account and agree it to the statements, then claim through the return or EPS.

### Corrections

- **Wrong rate applied:** HMRC's verification is the authority. Correct future payments; the contractor remains responsible for the **under-deduction** unless HMRC accepts otherwise. Consider an **amended return**.
- **Late or missed payment to HMRC:** pay immediately and review interest and penalties.
- **Posting error** (VAT in the base, materials omitted): post a **journal** and **amend the return** for that tax month if the return was wrong.
- **Missing statement:** use bank evidence and ask the contractor to reissue.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Tax month versus calendar month",
      md: `The **CIS tax month ends on the 5th**, but most bookkeeping periods end on the last day of the month. If you post by calendar month, the **month-end CIS liability balance** will not equal the **return** to be filed. Build a short **cut-off reconciliation**: payments made 1st to 5th of a month belong to the **previous** tax month; those from the 6th onwards belong to the current one.`,
    },
  ],
  scenario: {
    title: "A reconciliation at Northgate Build Ltd",
    narrative: `For the tax month 6 May to 5 June 2026 Northgate Build Ltd's records show these subcontractor payments (amounts excluding VAT):

| Subcontractor | Rate | Gross | Materials | Deduction |
|---|---:|---:|---:|---:|
| Joel Parks | 20% | £2,800 | £800 | £400 |
| Sparkline Electrical Ltd | 0% | £5,000 | £1,000 | £0 |
| Dev Anand | 30% | £1,500 | £0 | £450 |

All three payments were made between 6 and 31 May, so the deductions of **£850** all belong to this tax month. At 31 May the CIS liability account shows a credit balance of **£1,250**. HMRC was paid **£400** on 22 May for the previous tax month, but that payment was posted to a suspense account rather than to the CIS liability account.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the return.** Deductions for the tax month 6 May to 5 June = £400 + £0 + £450 = **£850**. This is what the return and the payment (due 22 June) must show.

**Step 2: the expected balance.** Deductions posted 6 to 31 May total £850, and nothing is owed for earlier months, so the CIS liability account should show a credit of **£850**.

**Step 3: the difference.** The book balance is £1,250, so there is a **£400** difference. That equals the previous month's deductions that were **paid to HMRC on 22 May** but not posted against the CIS liability account.

**Step 4: the correction.** Post a journal (Dr CIS liability £400, Cr Suspense £400) to clear the liability. The account now shows **£850**, agreeing to the return.

**Step 5: file and pay.** File by 19 June, pay by 22 June, post the payment (Dr CIS liability £850; Cr Bank £850) and confirm the liability account is nil for the tax month.`,
      },
      {
        kind: "journal",
        title: "Correcting the unposted 22 May payment",
        narrative: "The £400 paid to HMRC for the previous tax month clears the old liability and the suspense account.",
        lines: [
          { account: "CIS liability (HMRC)", dr: 400 },
          { account: "Suspense", cr: 400 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "deduction-total",
      prompt: "A contractor's payments in a tax month: subcontractor A £4,000 labour at 20%; subcontractor B £2,500 labour at 30%; subcontractor C £6,000 at 0%. What is the total CIS deduction (£)?",
      answer: 1550,
      unit: "£",
      explain: "Apply the rate to each subcontractor's labour element.",
      working: "£4,000 × 20% = £800; £2,500 × 30% = £750; £6,000 × 0% = £0; total **£1,550**.",
    },
    {
      kind: "numeric",
      id: "recoverable-balance",
      prompt: "A subcontractor's CIS recoverable account has debits of £6,400 for the year and £1,500 has been set against PAYE liabilities via the EPS. What balance remains recoverable (£)?",
      answer: 4900,
      unit: "£",
      explain: "Deductions suffered less amounts already offset.",
      working: "£6,400 − £1,500 = **£4,900**.",
    },
    {
      kind: "journal",
      id: "journal-eps-offset",
      prompt: "A company offsets £1,200 of CIS deductions suffered against its PAYE/NIC liability for the month (no cash changes hands for that £1,200). Post the offset.",
      accounts: ["PAYE/NIC liability (HMRC)", "CIS tax recoverable (HMRC)", "Bank", "Sales", "Wages and salaries", "VAT control (output tax)"],
      answer: [
        { account: "PAYE/NIC liability (HMRC)", dr: 1200 },
        { account: "CIS tax recoverable (HMRC)", cr: 1200 },
      ],
      explain: "The CIS debtor is used up against the PAYE/NIC liability, which reduces what is paid to HMRC.",
    },
    {
      kind: "classify",
      id: "classify-cis-posting-errors",
      prompt: "Is the posting correct?",
      categories: ["Correct", "Error"],
      items: [
        { text: "Contractor records the full invoice amount as a creditor and pays the net, posting the deduction to the CIS liability account", answer: 0 },
        { text: "Subcontractor records sales at the net cash received", answer: 1 },
        { text: "Contractor puts VAT inside the base on which CIS is calculated", answer: 1 },
        { text: "Subcontractor posts the deduction suffered to a CIS recoverable asset account", answer: 0 },
      ],
      explain: "Sales are gross; VAT is outside the base; the deduction is a liability for the contractor and an asset for the subcontractor.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-liability",
      prompt: "In the contractor's books, the CIS deduction is credited to…",
      options: ["Sales", "A CIS liability (HMRC) account", "Bank", "Wages"],
      answer: 1,
      explain: "It is owed to HMRC.",
    },
    {
      kind: "mcq",
      id: "q-recoverable",
      prompt: "In the subcontractor's books, the CIS deduction suffered is…",
      options: ["An expense", "A recoverable tax asset", "A liability", "Income"],
      answer: 1,
      explain: "It's tax paid on account.",
    },
    {
      kind: "mcq",
      id: "q-month",
      prompt: "The CIS tax month ends on the…",
      options: ["Last day of the month", "5th", "19th", "22nd"],
      answer: 1,
      explain: "5th.",
    },
    {
      kind: "mcq",
      id: "q-recon",
      prompt: "After paying HMRC, the CIS liability account for that tax month should be…",
      options: ["Nil", "Equal to the next return", "Debit £850", "Any balance"],
      answer: 0,
      explain: "Nil for that tax month.",
    },
    {
      kind: "mcq",
      id: "q-missing",
      prompt: "A contractor's statement is missing. What should the subcontractor do?",
      options: ["Ignore it", "Chase the contractor and use bank evidence", "Claim anyway without evidence", "Close the account"],
      answer: 1,
      explain: "Obtain a replacement; unsupported claims may be refused.",
    },
  ],
  sources: [
    { label: "Make deductions and pay subcontractors – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors" },
    { label: "File your CIS monthly returns – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/file-your-monthly-returns" },
    { label: "Get paid as a CIS subcontractor – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/get-paid" },
    { label: "CIS 340 guide – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
  ],
};
