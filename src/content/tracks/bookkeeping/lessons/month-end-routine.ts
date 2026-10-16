import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "month-end-routine",
  title: "Running a month-end close",
  level: "advanced",
  minutes: 35,
  summary:
    "A repeatable month-end close for a client on cloud software: getting the data in, reconciling every balance sheet account, posting the standard journals, reviewing the results, and locking the period, with a timetable and evidence a reviewer can rely on.",
  objectives: [
    "Plan a month-end close in the right order with a realistic timetable",
    "Reconcile each key balance sheet account to independent evidence",
    "Post the recurring month-end journals (depreciation, prepayments, accruals, payroll)",
    "Review the results analytically and lock the period",
  ],
  body: [
    {
      kind: "md",
      md: `Everything in the earlier lessons of this track (bank feeds, coding, ledgers, VAT codes, payroll journals, cut-off) comes together in the **month-end close**. A good close is boring: the same steps in the same order every month, each one evidenced, finishing with numbers the client can trust and a locked period nobody can change by accident.

The order matters. There's no point reviewing the profit and loss account before the bank is reconciled, and no point posting accruals before you know which bills have arrived.`,
    },
    {
      kind: "table",
      caption: "A typical five-day close",
      head: ["When", "Stage", "Tasks"],
      rows: [
        ["Working days 1–2", "Get the data in", "Chase missing paperwork; enter all sales invoices and supplier bills for the month; process expense claims; import and code all bank and card feeds"],
        ["Working days 2–3", "Reconcile", "Reconcile every bank, card, loan and clearing account to statements; allocate receipts and payments; clear suspense/query accounts"],
        ["Working days 3–4", "Adjust", "Payroll journal; depreciation; prepayment releases; accruals and accrued income (from post-month bills and invoices); stock movement if relevant; director's loan review"],
        ["Working day 4", "Check control accounts", "Aged debtors and creditors agree to control accounts; VAT control explained; PAYE/NIC and pension liabilities agree to payroll reports"],
        ["Working day 5", "Review, report, lock", "Analytical review against budget and prior months; investigate unusual movements; produce the management pack; set the lock date"],
      ],
    },
    {
      kind: "md",
      md: `### Reconcile the balance sheet, not just the bank

A profit and loss account is only right if the balance sheet is right, because every error has to sit somewhere. For each balance sheet account, ask: **what independent evidence proves this balance?**

| Account | Evidence |
|---|---|
| Bank, credit cards, loans, HP | Statements from the bank or lender |
| Card/payment processor clearing | Processor statement (payouts in transit) |
| Trade receivables and payables | Aged reports, supplier statements |
| VAT control | Latest VAT return (unpaid) plus current period's VAT |
| PAYE/NIC, pensions, net wages | Payroll reports and payment schedules |
| Prepayments, accruals, deferred income | Schedules |
| Fixed assets and depreciation | Fixed asset register |
| Director's loan account | Reconciliation of movements, confirmed with the director |
| Suspense / query accounts | Should be **nil** |`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Why the evidence matters",
      md: `A company's records must be sufficient to show and explain its transactions and disclose its financial position with reasonable accuracy **at any time** (Companies Act 2006 s386). A monthly close with reconciliations on file is how a practice can show the records meet that standard, and it's what makes year-end accounts quick.`,
    },
    {
      kind: "journal",
      title: "Recurring month-end journal",
      narrative: "Monthly depreciation from the fixed asset register (£850) and the insurance prepayment release from the schedule (£300).",
      lines: [
        { account: "Depreciation expense", dr: 850 },
        { account: "Accumulated depreciation", cr: 850 },
        { account: "Insurance", dr: 300 },
        { account: "Prepayments", cr: 300 },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Analytical review: questions to ask",
      md: `- Is turnover in line with last month, last year and the budget? If not, does the client know why?
- Has gross margin moved by more than a couple of points? Look at cut-off and stock first.
- Is every regular cost there (rent, utilities, software, insurance release, depreciation, payroll)? A missing cost is as wrong as an extra one.
- Any unusually large or round-sum items in expenses?
- Has the director's loan account moved in a way that needs flagging?`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't skip the lock",
      md: `Once the month is reported, set the **lock date** (or close the period) so later edits can't silently change figures the client has already relied on, or a VAT return already filed. Corrections after the lock should be posted in the current month, with a note, by someone with authority to do so.`,
    },
  ],
  scenario: {
    title: "October close for Halden Kitchens Ltd",
    narrative: `**Halden Kitchens Ltd** (VAT registered, quarterly returns ending December, March, June and September) designs and fits kitchens. You run its monthly close. At **31 October 2026**, before your review:

- All three bank accounts reconcile to statements.
- The **VAT control** account shows **£9,140 credit**. The September quarter return (filed, due for payment on 7 November) showed **£6,240** payable. October's transactions include output VAT of **£3,100** and input VAT of **£1,450**.
- The **PAYE/NIC liability** shows **£8,610**. October's payroll report shows **£4,320** due to HMRC by 22 November. The bank shows the September amount of **£4,290** was paid on 21 October.
- **Suspense** holds £1,250 received from an unknown payer.`,
    walkthrough: [
      {
        kind: "md",
        md: `**VAT control.** Expected balance = unpaid September return £6,240 + October's net VAT (£3,100 − £1,450 = £1,650) = **£7,890** credit. The account shows £9,140, so there's **£1,250** unexplained, exactly the amount in suspense. A difference of the full £1,250 (rather than a VAT fraction of it) suggests the receipt was posted twice, once to suspense and once straight to VAT control, or that a journal hit VAT control directly. Run the VAT control account transaction listing for October to find it.

**PAYE/NIC.** Expected balance = October's liability **£4,320**. The account shows £8,610: the difference is **£4,290**, the September payment. It went out of the bank on 21 October but was coded elsewhere (often to Wages). Find it and recode it to the liability.

**Suspense £1,250.** Check remittances, the aged debtors (an invoice of exactly £1,250?), and ask the client. Don't close the month with it unexplained.`,
      },
      {
        kind: "callout",
        tone: "example",
        title: "Close note for the file",
        md: `Banks reconciled to statements (3/3). VAT control £9,140 vs expected £7,890: £1,250 difference under investigation, linked to the suspense receipt. PAYE/NIC: September payment of £4,290 found coded to Wages and recoded; balance now £4,320, agreeing to the October payroll report. Prepayments and fixed asset schedules agree. Period to be locked once suspense cleared.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-close-stage",
      prompt: "Put each task into the right stage of the month-end close.",
      categories: ["Get the data in", "Reconcile", "Adjust", "Review, report and lock"],
      items: [
        { text: "Enter supplier bills received for the month", answer: 0 },
        { text: "Agree the credit card balance to the card statement", answer: 1 },
        { text: "Post the payroll journal", answer: 2 },
        { text: "Compare gross margin with last month and the budget", answer: 3 },
        { text: "Post the monthly prepayment releases", answer: 2 },
        { text: "Allocate customer receipts to invoices", answer: 1 },
        { text: "Set the lock date", answer: 3 },
      ],
      explain: "Data first, then reconciliations (which prove the data), then adjustments, then review and lock. Reviewing before reconciling just means reviewing errors.",
    },
    {
      kind: "numeric",
      id: "vat-control-expected",
      prompt: "A client's last VAT return (quarter to 30 June) showed **£5,480** payable and hasn't been paid yet. VAT on July's transactions: output **£2,960**, input **£1,180**. What credit balance should the VAT control account show at 31 July?",
      answer: 7260,
      unit: "£",
      explain: "The VAT control should equal what's owed for filed-but-unpaid returns plus the VAT on transactions since.",
      working: "£5,480 + (£2,960 − £1,180) = £5,480 + £1,780 = **£7,260** credit",
    },
    {
      kind: "numeric",
      id: "paye-difference",
      prompt: "At 30 November the PAYE/NIC liability account shows **£11,950** credit. November's payroll report shows **£6,120** due to HMRC by 22 December, and October's amount was paid on 20 November. Assuming the November journal was posted correctly, by how much is the liability overstated?",
      answer: 5830,
      unit: "£",
      explain: "After October's payment, only November's liability should remain. The excess is most likely the October payment coded somewhere else.",
      working: "£11,950 − £6,120 = **£5,830**, which should match the October payment found on the bank statement.",
    },
    {
      kind: "journal",
      id: "recurring-journal",
      prompt: "Post the month's recurring journal: depreciation per the fixed asset register **£1,240**, and a release of **£450** from prepayments for the annual software subscription.",
      accounts: ["Depreciation expense", "Accumulated depreciation", "Software subscriptions", "Prepayments", "Accruals", "Bank – current account", "Fixed assets – cost"],
      answer: [
        { account: "Depreciation expense", dr: 1240 },
        { account: "Accumulated depreciation", cr: 1240 },
        { account: "Software subscriptions", dr: 450 },
        { account: "Prepayments", cr: 450 },
      ],
      explain: "Depreciation charges the month's share of fixed asset cost; the release moves one month's software cost from the balance sheet to the P&L. Neither involves the bank, and neither should be set to auto-reverse.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-order",
      prompt: "Why reconcile the bank before reviewing the profit and loss account?",
      options: ["It's quicker", "Because unreconciled or miscoded bank lines distort income and expenses", "HMRC requires it", "So the VAT return can be filed first"],
      answer: 1,
      explain: "The P&L is built from the coded transactions. Until the bank is complete and right, the P&L can't be.",
    },
    {
      kind: "mcq",
      id: "q-suspense-close",
      prompt: "At the end of a close, the suspense account should be:",
      options: ["Any balance under £100", "Nil", "Equal to the VAT liability", "Transferred to sundry expenses"],
      answer: 1,
      explain: "Suspense is a holding account; every item should be resolved before the period is reported and locked.",
    },
    {
      kind: "mcq",
      id: "q-evidence",
      prompt: "What's the best evidence for the balance on a hire purchase creditor account?",
      options: ["Last year's accounts", "The finance company's statement", "The bank feed", "The director's estimate"],
      answer: 1,
      explain: "An independent third-party statement is the strongest evidence.",
    },
    {
      kind: "mcq",
      id: "q-after-lock",
      prompt: "After the September period is locked, you find a September bill that was missed. What's normally the right approach?",
      options: [
        "Unlock September, post it and say nothing",
        "Post it in the current month with a note, or follow the firm's procedure for reopening with approval",
        "Delete it",
        "Post it to suspense",
      ],
      answer: 1,
      explain: "Figures already reported (and VAT returns filed) shouldn't change silently. Post in the current period or follow a controlled reopening process.",
    },
    {
      kind: "mcq",
      id: "q-missing-cost",
      prompt: "During analytical review you notice there's no rent charge this month, though rent is usually £2,000. What should you do?",
      options: ["Nothing; the P&L looks better", "Find out why: a missed bill, a payment coded elsewhere, or a rent-free period", "Accrue £4,000", "Post it to suspense"],
      answer: 1,
      explain: "A missing regular cost is as much an error as an extra one. Investigate before accruing.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records (the VAT account)", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "GOV.UK – Pay employers' PAYE", url: "https://www.gov.uk/pay-paye-tax" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
  ],
};
