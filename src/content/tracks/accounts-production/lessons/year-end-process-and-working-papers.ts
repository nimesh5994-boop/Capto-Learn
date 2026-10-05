import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "year-end-process-and-working-papers",
  title: "The year-end process and working papers",
  level: "foundation",
  minutes: 30,
  summary:
    "How a year-end job runs from records-in to sign-off, and how to build a working paper file a reviewer can follow: lead schedules, tick-and-tie, cross-referencing and clearing review points.",
  objectives: [
    "Describe the stages of a year-end accounts job in the order they happen",
    "Build a lead schedule that agrees to the trial balance and is supported by working papers",
    "Use tick marks and cross-references so every number can be traced to evidence",
    "Raise, answer and clear review points properly, without plugging differences",
  ],
  body: [
    {
      kind: "md",
      md: `A year-end job turns a client's bookkeeping into a set of accounts that someone else can rely on: HMRC, Companies House, the bank, and the client. The accounts are only as good as the file behind them. A reviewer who wasn't there should be able to pick up your file and see **where every number came from and why you're satisfied it's right**.

Most practices run a year-end job in the same order:

1. **Planning:** check the engagement letter is in place, read last year's file and review points, and note anything new (a new loan, a property purchase, a change in the business).
2. **Records in:** bank statements to the year end, the bookkeeping file or trial balance, sales and purchase ledgers, payroll reports, loan statements, the fixed asset register, stock figures and a list of anything unusual.
3. **Reconcile the basics:** bank, VAT, PAYE, loans and the director's loan account. If these don't reconcile, nothing built on top of them will be right.
4. **Lead schedules and working papers** for every balance sheet area, plus analytical review of the profit and loss account.
5. **Year-end adjustments:** accruals, prepayments, depreciation, stock, bad debts, corporation tax. Every adjustment is a numbered journal.
6. **Draft accounts and tax computation**, then **review**.
7. **Client approval:** the client checks the draft, signs a representation letter and approves the accounts.
8. **Filing:** Companies House, HMRC (CT600 or the self assessment return) and any other filings.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What every working paper needs",
      md: `Whatever template your firm uses, each schedule should show:

- **Client name, period end and the working paper reference** (for example E/1)
- **What the schedule is for**: its objective, such as "To confirm the bank balance at 31 March 2026 is complete and exists"
- **Prepared by and date; reviewed by and date**
- **Source of each figure**: the document you agreed it to
- **Cross-references** to the lead schedule and to supporting papers
- **A conclusion**: one sentence saying whether the balance is fairly stated, and what adjustments you made

A company must keep accounting records that are sufficient to show and explain its transactions (Companies Act 2006 s386). Your file is evidence that the accounts were built from those records.`,
    },
    {
      kind: "table",
      caption: "A typical working paper index (letters vary by firm)",
      head: ["Section", "Area", "Typical contents"],
      rows: [
        ["A", "Admin and planning", "Engagement letter, planning notes, prior year review points, completion checklist"],
        ["B", "Fixed assets", "Fixed asset register, additions and disposals with invoices, depreciation calculation"],
        ["C", "Stock and WIP", "Stock count sheets, valuation, NRV review, cut-off checks"],
        ["D", "Debtors and prepayments", "Aged debtors, after-date receipts, bad debt review, prepayments schedule"],
        ["E", "Bank and cash", "Bank reconciliation, statements at year end, loan statements"],
        ["F", "Creditors and accruals", "Aged creditors, supplier statement reconciliations, accruals schedule, VAT and PAYE"],
        ["H", "Director's loan account", "Full DLA analysis, s455 review"],
        ["J", "Capital and reserves", "Share capital, dividends, distributable reserves check"],
        ["K", "Profit and loss", "Analytical review against prior year, explanations for movements"],
        ["T", "Tax", "Corporation tax or income tax computation, capital allowances"],
      ],
    },
    {
      kind: "md",
      md: `### Lead schedules

A **lead schedule** is the top sheet for each balance sheet area. It lists every nominal code in that area with:

| Column | What it shows |
|---|---|
| Prior year | Last year's final figure, agreed to last year's signed accounts |
| Per trial balance | This year's figure before your adjustments |
| Adjustments | Each journal you've posted, by journal number |
| Final | The figure that goes in the accounts |
| Ref | Where the supporting working paper is |

The **total per trial balance must agree to the TB**, and the **final total must agree to the draft accounts**. If you post a journal on one lead schedule, the other side of it must appear on another lead schedule (or the P&L). That's how a reviewer checks the file is complete.`,
    },
    {
      kind: "md",
      md: `### Tick-and-tie and cross-referencing

**Tick-and-tie** means agreeing each figure on a schedule to its source and marking it so the reviewer knows what you did. Use a legend at the foot of each schedule, for example:

- **✓** agreed to bank statement
- **✓I** agreed to supplier invoice
- **PY** agreed to prior year signed accounts
- **TB** agreed to trial balance
- **c** cast (column added and checked); **xc** cross-cast (rows add across)

**Cross-references** link papers both ways. If the bank reconciliation on E/2 supports the bank figure on lead schedule E/1, write "E/2" next to the figure on E/1 and "to E/1" next to the reconciled balance on E/2. Electronic files do this with hyperlinks, but the principle is the same.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Never plug a difference",
      md: `If a schedule doesn't agree to the TB, **find out why**. Don't post the difference to sundry expenses, suspense or "rounding". Small unexplained differences are often the visible part of a bigger problem, such as a missed invoice or a duplicated payment. If you genuinely can't resolve a trivial difference, record it as a review point with the work you've done and let the reviewer decide.`,
    },
    {
      kind: "md",
      md: `### Analytical review

Compare the profit and loss account and balance sheet with last year and with what you know about the business. Explain every significant movement. Many firms set a threshold, for example **more than 10% and more than £1,000**, but use judgement. Gross margin, wages as a percentage of sales, debtor days and creditor days are the usual first checks. A good explanation is specific and evidenced: *"Sales up 18% because of the new Tesco contract from September (contract on file A/6)"*, not *"increase in trade"*.`,
    },
    {
      kind: "md",
      md: `### Review points

The reviewer records questions and corrections as **review points**. To handle them well:

1. **Answer in writing on the review point schedule**, and say what you changed and where (for example "Accrual increased by £640, journal 14, see F/3").
2. **Don't delete or overwrite** a review point. The trail shows how the file was finalised.
3. **Only the reviewer clears a point.** You answer; they decide whether the answer is good enough.
4. **Carry forward** anything that matters for next year (a loan ending, a disputed debt, a planned property sale) to the next year's planning notes.`,
    },
    {
      kind: "journal",
      title: "Numbered year-end journal: correcting a misposting",
      narrative:
        "Journal 7: a £4,200 laptop was coded to repairs. It's a capital item under the client's £500 capitalisation policy, so move it to fixed assets. Every journal needs a number, a narrative and a reference to the working paper that supports it.",
      lines: [
        { account: "Computer equipment – cost", dr: 4200 },
        { account: "Repairs and maintenance", cr: 4200 },
      ],
    },
  ],
  scenario: {
    title: "Building the bank lead schedule for Harbour View Café Ltd",
    narrative: `Harbour View Café Ltd has a 31 March 2026 year end. The bookkeeper uses Xero and has sent the trial balance. You're preparing section E (bank and cash).

- Trial balance: **Bank current account £18,240** (debit), **Cash float £250**, **Bounce Back Loan £14,620** (credit).
- Bank statement at 31 March 2026: **£21,115** in credit.
- Payments in Xero not yet cleared by the bank: cheque 104 to the landlord **£2,950** and a card payment of **£460** to a supplier, both dated 30 or 31 March.
- Takings banked on 31 March that the bank processed on 1 April: **£535**.
- Last year's signed accounts show bank £12,480 and loan £20,160.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: reconcile the bank (working paper E/2).** Start from the bank statement and adjust for timing differences:

- Balance per bank statement: £21,115 (✓ to statement)
- Less unpresented payments: £2,950 + £460 = (£3,410). Tick each to its post-year-end clearance on the April statement. If an item hasn't cleared within a few weeks, ask why.
- Add outstanding lodgement: £535. Tick to the April statement.
- **Balance per books: £18,240**, which agrees to the TB.`,
      },
      {
        kind: "table",
        caption: "E/1 – Bank and cash lead schedule",
        head: ["Code", "Account", "Prior year", "Per TB", "Adj", "Final", "Ref"],
        rows: [
          ["1200", "Bank current account", "12,480 PY", "18,240 TB", "–", "18,240", "E/2"],
          ["1210", "Cash float", "250 PY", "250 TB", "–", "250", "E/3"],
          ["", "**Total cash at bank and in hand**", "**12,730**", "**18,490** c", "", "**18,490** c", ""],
          ["2300", "Bounce Back Loan", "(20,160) PY", "(14,620) TB", "–", "(14,620)", "E/4"],
        ],
      },
      {
        kind: "md",
        md: `**Step 2: the loan (E/4).** Agree £14,620 to the lender's statement at 31 March 2026. Then split it between **amounts due within one year** and **after more than one year** using the repayment schedule. The split is a disclosure the accounts need, and it's easy to forget.

**Step 3: the cash float (E/3).** £250 is immaterial, but confirm it to the client's till count sheet and note it.

**Step 4: conclusion.** "Bank and cash of £18,490 and the loan of £14,620 are fairly stated at 31 March 2026. No adjustments required." Sign and date the lead schedule and send it for review.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why the April statement matters",
        md: `Unpresented items that clear in early April confirm they were genuine timing differences. Items that **never** clear (an old cheque that was cancelled, a duplicate entry) are errors that need correcting. Always ask for the statement covering a few weeks after the year end.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "bank-rec-balance",
      prompt:
        "At 31 December 2025 the bank statement shows £12,480 in credit. Payments of £2,960 have been entered in the books but haven't cleared the bank, and takings of £1,150 were banked on 31 December but don't appear until January. What should the **bank balance in the books** be?",
      answer: 10670,
      unit: "£",
      explain:
        "Start from the statement and adjust for timing differences: deduct payments the bank hasn't processed yet and add receipts it hasn't credited yet. The answer should agree to the cash book; if it doesn't, there's an error to find.",
      working: "£12,480 − £2,960 + £1,150 = **£10,670**",
    },
    {
      kind: "classify",
      id: "lead-schedule-area",
      prompt: "Which lead schedule does each item belong on?",
      categories: ["Fixed assets", "Debtors and prepayments", "Creditors and accruals", "Capital and reserves"],
      items: [
        { text: "New van bought in the year", answer: 0 },
        { text: "Insurance paid in February covering the next 12 months", answer: 1, why: "The unexpired portion is a prepayment." },
        { text: "Electricity used in March, bill not yet received", answer: 2, why: "An accrual." },
        { text: "Interim dividend paid to shareholders", answer: 3, why: "Dividends are a movement in equity, not an expense." },
        { text: "VAT owed to HMRC for the March quarter", answer: 2, why: "A creditor due within one year." },
        { text: "Customer invoices unpaid at the year end", answer: 1 },
        { text: "New shares issued to an investor", answer: 3 },
      ],
      explain:
        "Lead schedules follow the balance sheet. Anything that's an asset goes to its asset section, liabilities to creditors, and owners' items (share capital, reserves, dividends) to capital and reserves.",
    },
    {
      kind: "journal",
      id: "capitalise-misposting",
      prompt:
        "A £3,600 commercial coffee machine bought by a café (not VAT registered, so no VAT to separate) was coded to Repairs and maintenance. The client's capitalisation policy is £500. Post the correcting journal.",
      accounts: ["Plant and machinery – cost", "Repairs and maintenance", "Plant and machinery – depreciation", "Suspense", "Trade creditors", "Sundry expenses"],
      answer: [
        { account: "Plant and machinery – cost", dr: 3600 },
        { account: "Repairs and maintenance", cr: 3600 },
      ],
      explain:
        "A machine with a multi-year life costing over the capitalisation threshold is a fixed asset. Move it from the P&L to the balance sheet; depreciation is then charged separately under the depreciation policy. Suspense is never the answer for a known misposting.",
    },
    {
      kind: "numeric",
      id: "gross-margin",
      prompt:
        "A client's sales are £420,000 and cost of sales is £277,200. Last year the gross margin was 40%. What is this year's **gross margin percentage**?",
      answer: 34,
      unit: "%",
      explain:
        "Gross margin = gross profit ÷ sales. A 6-point fall is a significant movement and needs an explanation backed by evidence: supplier price rises, discounting, stock cut-off errors, unrecorded sales or stock write-offs.",
      working: "Gross profit = £420,000 − £277,200 = £142,800. £142,800 ÷ £420,000 = **34%**",
    },
    {
      kind: "mcq",
      id: "unexplained-difference",
      prompt:
        "The aged debtors report totals £44,850 but the trade debtors control account in the TB is £45,600. What should you do?",
      options: [
        "Post the £750 difference to sundry expenses because it's small",
        "Post the £750 to suspense and move on",
        "Reconcile the two: look for unallocated receipts, journals posted to the control account and timing differences, then correct the cause",
        "Use the aged debtors figure in the accounts and ignore the TB",
      ],
      answer: 2,
      explain:
        "A difference between a ledger and its control account means something has been posted to one and not the other. Find it and fix the cause. Writing it off hides the error and could mean a real debt or receipt is missing.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-lead-schedule",
      prompt: "What must the 'per TB' total on a lead schedule agree to?",
      options: ["The bank statement", "The trial balance", "Last year's accounts", "The tax computation"],
      answer: 1,
      explain: "The lead schedule starts from the client's trial balance, then shows your adjustments to reach the final figure that goes in the accounts.",
    },
    {
      kind: "mcq",
      id: "q-who-clears",
      prompt: "You've answered a review point. Who clears it?",
      options: ["You, once you've answered it", "The client", "The reviewer who raised it", "Nobody: review points are deleted once answered"],
      answer: 2,
      explain: "The preparer answers; the reviewer decides whether the answer is sufficient and clears it. The trail should stay on file.",
    },
    {
      kind: "mcq",
      id: "q-casting",
      prompt: "On a working paper, what does 'cast' mean?",
      options: ["Agreed to an invoice", "The column has been added up and checked", "Agreed to the prior year", "The schedule has been reviewed"],
      answer: 1,
      explain: "Casting is checking the addition of a column; cross-casting checks the rows add across.",
    },
    {
      kind: "mcq",
      id: "q-records-duty",
      prompt: "Which Companies Act 2006 section requires a company to keep adequate accounting records?",
      options: ["s386", "s413", "s442", "s830"],
      answer: 0,
      explain: "s386 requires records sufficient to show and explain the company's transactions. s413 is directors' advances, s442 the filing deadline and s830 distributable profits.",
    },
    {
      kind: "mcq",
      id: "q-unpresented",
      prompt: "A cheque written in December 2025 still hasn't cleared the bank by the end of April 2026. What's the best next step?",
      options: [
        "Nothing: it's a timing difference",
        "Ask the client whether it was cancelled, lost or never sent, and correct the books if it wasn't a real payment",
        "Write it off to sundry expenses",
        "Add it to the outstanding lodgements",
      ],
      answer: 1,
      explain: "Genuine timing differences clear within days or weeks. A long-outstanding cheque may have been cancelled or never sent, so the liability may still be owed and the bank balance understated.",
    },
    {
      kind: "mcq",
      id: "q-good-explanation",
      prompt: "Which is the best analytical review explanation for a 25% rise in wages?",
      options: [
        "Increase in costs",
        "Wages up as expected",
        "Two new kitchen staff from July (payroll reports on K/4) and the April 2025 National Living Wage rise",
        "Agreed to TB",
      ],
      answer: 2,
      explain: "A good explanation is specific, quantifies the cause and points to evidence. 'Agreed to TB' only proves the figure was copied correctly.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "Prepare annual accounts for a private limited company", url: "https://www.gov.uk/annual-accounts" },
    { label: "HMRC Business Income Manual: tax and accountancy (BIM31000)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31000" },
  ],
};
