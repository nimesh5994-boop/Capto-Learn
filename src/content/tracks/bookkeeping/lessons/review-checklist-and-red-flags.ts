import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "review-checklist-and-red-flags",
  title: "Reviewing a bookkeeping file: checklist and red flags",
  level: "advanced",
  minutes: 35,
  summary:
    "How a senior reviews a bookkeeping file before it goes to the client or the accounts team: a trial balance scan, the reconciliations that must be on file, analytical review and proofs in total, and the red flags that point to errors, personal spending, fraud or money-laundering concerns.",
  objectives: [
    "Scan a trial balance for balances on the wrong side, unexpected movements and accounts that should be nil",
    "Check that every key balance is supported by a reconciliation",
    "Use analytical review and proofs in total to find missing or misstated items",
    "Recognise red flags that need escalating rather than correcting",
  ],
  body: [
    {
      kind: "md",
      md: `Review is where a practice's quality is won or lost. A reviewer isn't re-doing the bookkeeping. They're asking, efficiently: **is there anything here that's wrong, missing or worrying?** The best reviewers work from the top down: trial balance first, then reconciliations, then analytical review, and only then individual transactions where something looks odd.

Review points should be written down, answered by the preparer, and cleared before sign-off.`,
    },
    {
      kind: "table",
      caption: "Trial balance scan",
      head: ["Look for", "Usually means"],
      rows: [
        ["Debit balance on Trade payables, credit balance on Trade receivables", "Unallocated or duplicate payments, unrecorded credit notes"],
        ["Credit balance on an expense, or debit balance on sales", "Refunds or credit notes miscoded, or reversed journals"],
        ["Any balance on Suspense, Query or Uncategorised accounts", "Unfinished work"],
        ["Bank showing an overdraft the client doesn't have", "Unreconciled bank or missing receipts"],
        ["VAT control not consistent with the latest return", "Payments, refunds or journals posted wrongly, or backdated transactions"],
        ["PAYE/NIC liability much larger than one month's payroll", "HMRC payments coded elsewhere, unpaid PAYE, or missing Employment Allowance entry"],
        ["Director's loan account overdrawn (debit)", "s455, benefit-in-kind and dividend questions for the manager"],
        ["Large Sundry, General or Repairs balances", "Miscoding: personal items, capital items, disallowables"],
      ],
    },
    {
      kind: "md",
      md: `### Reconciliations that must be on file

Every bank, credit card, loan, HP and clearing account agreed to a third-party statement; receivables and payables agreed to aged reports; VAT control explained; payroll liabilities agreed to payroll reports; prepayments, accruals and fixed assets agreed to schedules; director's loan account analysed. If a reconciliation isn't on file, the balance isn't reviewed.

### Analytical review and proofs in total

Compare each line with last year, last month and the budget, and ask *why* for any material movement. Then, for costs that follow a predictable pattern, do a **proof in total**: work out what the figure *should* be and compare.

- **Rent:** monthly rent per the lease × 12.
- **Loan interest:** average loan balance × interest rate.
- **Depreciation:** asset cost or NBV × rate, by category.
- **Wages:** headcount × average pay, or the payroll year-to-date report.
- **Output VAT:** standard-rated sales × 20%, compared with box 1.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Red flags that need escalating",
      md: `Some findings aren't bookkeeping errors to fix quietly. Raise them with your manager:

- **Sales recorded are well below bank receipts**, or cash takings never reach the bank.
- **Round-sum or regular payments to individuals** not on the payroll, or to the director's family.
- **Supplier bank details that match an employee's**, or invoices from suppliers nobody's heard of.
- **Invoices just below an approval limit**, or many manual journals posted by one person late at night.
- **Large unexplained cash deposits** or funds from third parties with no clear business reason.
- **Personal spending at scale** coded to business expenses year after year.

Accountancy firms have obligations under the Money Laundering Regulations and the Proceeds of Crime Act. If you suspect money laundering, report it internally to your firm's MLRO and **don't tip off the client**.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Write review points that get answered",
      md: `Be specific: account, amount, what looks wrong, what you want done. "Repairs £14,500 vs £3,200 last year: please analyse items over £1,000 and check for capital items" gets a useful answer. "Please check repairs" doesn't.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Why it matters",
      md: `Accounts and tax returns built on miscoded books expose the client to penalties for inaccuracies and the firm to reputational and regulatory risk. HMRC's own enquiry guidance highlights the record-keeping areas it looks at when assessing risk (Enquiry Manual EM3000 onwards). A disciplined review catches these before HMRC does.`,
    },
  ],
  scenario: {
    title: "Reviewing Crestwood Dental Lab Ltd's year-end file",
    narrative: `A semi-senior has finished the bookkeeping for **Crestwood Dental Lab Ltd** (VAT registered, monthly payroll of about **£15,500** gross, PAYE, employee NIC and employer NIC payable to HMRC together usually around **£5,800** a month) for the year ended **30 June 2026**. Extracts from the trial balance, with last year:

| Account | 2026 | 2025 |
|---|---:|---:|
| Trade payables | £1,240 **Dr** | £8,900 Cr |
| Suspense | £780 Cr | – |
| Sundry expenses | £9,600 | £1,100 |
| Repairs and maintenance | £14,500 | £3,200 |
| Rent (lease: £2,750 a month) | £30,250 | £33,000 |
| PAYE/NIC liability | £17,400 Cr | £5,700 Cr |
| Director's loan account | £12,800 **Dr** | £2,100 Cr |`,
    walkthrough: [
      {
        kind: "md",
        md: `**Trade payables in debit:** the suppliers appear to owe the company. Likely a duplicate payment or payments not matched to bills. Review the aged creditors for debit balances.

**Suspense £780:** must be cleared.

**Sundry £9,600 (up from £1,100):** analyse it. It's probably miscoded items, possibly personal.

**Repairs £14,500 (up from £3,200):** check for capital items. The preparer finds a **£9,800** new sintering furnace posted to repairs.

**Rent proof in total:** £2,750 × 12 = £33,000 expected; £30,250 recorded. **£2,750 (one month) is missing**: an unrecorded invoice, or a payment coded elsewhere (check Sundry).

**PAYE/NIC £17,400:** about three months' worth. Either HMRC payments have been coded elsewhere, PAYE hasn't been paid (a cash-flow and penalty issue), or the Employment Allowance wasn't recorded. Agree it to the HMRC online account.

**DLA swung from £2,100 credit to £12,800 debit:** overdrawn by £12,800 at the year end. Flag for s455 and benefit-in-kind before the accounts are prepared, and check whether any of the Sundry items are personal.`,
      },
      {
        kind: "journal",
        title: "Reclassifying the furnace",
        lines: [
          { account: "Equipment – cost", dr: 9800 },
          { account: "Repairs and maintenance", cr: 9800 },
        ],
        narrative: "Add it to the fixed asset register so depreciation and capital allowances are dealt with.",
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "interest-proof",
      prompt: "A client's bank loan was **£40,000** throughout the year at a fixed **7%** interest rate. The trial balance shows loan interest of **£1,200**. By how much does the recorded interest appear to be **understated**?",
      answer: 1600,
      unit: "£",
      explain: "A proof in total estimates what the figure should be. A big gap usually means interest has been posted to the loan account or another code, or some months are missing.",
      working: "Expected: £40,000 × 7% = £2,800. Recorded £1,200. Understated by **£1,600**.",
    },
    {
      kind: "numeric",
      id: "output-vat-proof",
      prompt: "A client makes only standard-rated sales. Net sales per the trial balance for the year are **£412,000**. The four VAT returns for the year show box 1 totalling **£80,400**. What is the difference between expected and declared output VAT?",
      answer: 2000,
      unit: "£",
      explain: "Output VAT should be 20% of standard-rated net sales. A shortfall means sales that missed the VAT returns, wrong tax codes, or sales posted after returns were filed.",
      working: "Expected: £412,000 × 20% = £82,400. Declared £80,400. Difference **£2,000** (under-declared, on the face of it).",
    },
    {
      kind: "classify",
      id: "classify-red-flags",
      prompt: "Is each finding a routine correction, or a red flag to escalate to your manager?",
      categories: ["Routine correction", "Escalate"],
      items: [
        { text: "A van repair coded to Motor vehicles – cost", answer: 0 },
        { text: "Monthly £1,500 payments to the director's brother, described as 'consultancy', with no invoices", answer: 1 },
        { text: "A supplier's bank details are the same as a member of staff's", answer: 1 },
        { text: "Insurance coded with 20% VAT", answer: 0 },
        { text: "Card takings per the till system are £40,000 higher than sales in the books", answer: 1 },
        { text: "Depreciation charged for 11 months instead of 12", answer: 0 },
      ],
      explain: "Miscodes and calculation slips get fixed. Possible fraud, undeclared income or payments to connected people with no evidence need senior judgement and possibly reporting.",
    },
    {
      kind: "journal",
      id: "reclassify-capital",
      prompt: "During review you find a **£4,600** (net) laser printer for the design studio coded to Repairs and maintenance. The client's capitalisation threshold is £500. Post the correction.",
      accounts: ["Office equipment – cost", "Repairs and maintenance", "Depreciation expense", "VAT control", "Suspense", "Sundry expenses"],
      answer: [
        { account: "Office equipment – cost", dr: 4600 },
        { account: "Repairs and maintenance", cr: 4600 },
      ],
      explain: "It's capital expenditure above the threshold. Move it to fixed assets and add it to the register; depreciation follows the client's policy as a separate entry. The VAT was already right.",
    },
    {
      kind: "multi",
      id: "tb-scan",
      prompt: "Which of these trial balance balances should prompt a review point? Select all that apply.",
      options: [
        "Trade receivables £18,400 debit",
        "Suspense £45 debit",
        "Rent £1,200 credit",
        "VAT control £3,100 credit, agreeing to the unpaid last return plus this month",
        "Director's loan account £6,300 debit",
        "Trade payables £2,200 debit",
      ],
      answers: [1, 2, 4, 5],
      explain: "Suspense should be nil however small. A credit on an expense, an overdrawn DLA and payables in debit all need explaining. Receivables in debit and a VAT control that agrees to the returns are normal.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-review-order",
      prompt: "The most efficient order for reviewing a bookkeeping file is usually:",
      options: [
        "Every transaction line by line, then the TB",
        "TB scan, then reconciliations, then analytical review, then drill into anything odd",
        "VAT return first, then nothing else",
        "Only the bank reconciliation",
      ],
      answer: 1,
      explain: "Top-down review finds the material problems fastest and targets detailed work where it's needed.",
    },
    {
      kind: "mcq",
      id: "q-proof-rent",
      prompt: "Rent is £1,800 a month under the lease. The TB shows £19,800 for the year. What does a proof in total suggest?",
      options: ["Rent is correct", "One month's rent is missing", "Rent is overstated by £1,800", "VAT is wrong"],
      answer: 1,
      explain: "£1,800 × 12 = £21,600 expected; £19,800 is exactly one month short.",
    },
    {
      kind: "mcq",
      id: "q-paye-large",
      prompt: "The PAYE/NIC liability is about three months' worth of payroll deductions. The first thing to check is:",
      options: [
        "Whether HMRC payments were coded to another account, using HMRC's online account to confirm what's actually outstanding",
        "Whether VAT is correct",
        "The depreciation policy",
        "The sales ledger",
      ],
      answer: 0,
      explain: "Either payments are miscoded or PAYE really is unpaid. HMRC's records tell you which.",
    },
    {
      kind: "mcq",
      id: "q-suspicion",
      prompt: "During a review you suspect a client may be laundering money through the business. What should you do?",
      options: [
        "Ask the client to explain in writing",
        "Report internally to your firm's MLRO and avoid tipping off the client",
        "Correct the books and say nothing",
        "Resign from the job immediately and tell the client why",
      ],
      answer: 1,
      explain: "Suspicions go to the firm's money laundering reporting officer. Alerting the client could be a tipping-off offence.",
    },
    {
      kind: "mcq",
      id: "q-review-point",
      prompt: "Which is the best-written review point?",
      options: [
        "\"Check sundries.\"",
        "\"Sundry expenses £9,600 vs £1,100 last year: please analyse items over £250 and recode; flag any personal items to the DLA.\"",
        "\"Sundries look high?\"",
        "\"Fix the TB.\"",
      ],
      answer: 1,
      explain: "Specific account, amount, comparison and action: the preparer knows exactly what to do.",
    },
  ],
  sources: [
    { label: "HMRC Enquiry Manual EM3000 – examining accounts: records which may identify risks", url: "https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em3000" },
    { label: "GOV.UK – Money Laundering Regulations: your responsibilities", url: "https://www.gov.uk/guidance/money-laundering-regulations-your-responsibilities" },
    { label: "HMRC – Anti-money laundering guidance for the accountancy sector", url: "https://www.gov.uk/government/publications/anti-money-laundering-guidance-for-the-accountancy-sector" },
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "GOV.UK – Director's loans", url: "https://www.gov.uk/directors-loans" },
  ],
};
