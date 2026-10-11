import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "catch-up-bookkeeping",
  title: "Catch-up bookkeeping: rescuing messy books",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Taking on a client whose books are months or years behind or badly kept: triaging deadlines, establishing reliable opening balances, bulk-processing the bank, managing a query list, correcting earlier VAT returns within HMRC's error-correction limits, and knowing when to escalate.",
  objectives: [
    "Triage a catch-up job by deadline and risk before touching the books",
    "Rebuild the records from bank data and agree opening balances to the last filed accounts",
    "Run a query list and clear suspense with the client's answers",
    "Decide whether errors on earlier VAT returns can be corrected on the next return",
  ],
  body: [
    {
      kind: "md",
      md: `Every practice gets them: the client who "hasn't had time" for a year, the books a previous bookkeeper left half-done, the director who's been coding everything to General expenses. Catch-up work is high-value but easy to get wrong, because there's pressure to file things quickly and the records are poor.

The temptation is to open the software and start coding. Resist it. Work through four stages: **triage → foundations → bulk processing → resolution**.`,
    },
    {
      kind: "table",
      caption: "Stage 1: triage",
      head: ["Question", "Why"],
      rows: [
        ["Which returns are overdue or due soon (VAT, CT600, accounts, self-assessment, payroll)?", "Late filing penalties and interest accrue; deadlines decide the order of work"],
        ["Have any returns been filed on estimates or as nil?", "They'll need correcting once the real figures are known"],
        ["Is the business still VAT registered, and should it be?", "Unregistered businesses over the threshold have a serious liability"],
        ["What records exist? Bank statements, sales invoices, receipts, payroll reports", "Bank statements are the backbone; everything else hangs off them"],
        ["Any signs of bigger problems: missing cash, personal spending, HMRC letters?", "Some issues need your manager, not just more bookkeeping"],
      ],
    },
    {
      kind: "md",
      md: `### Stage 2: foundations

- **Opening balances:** agree them to the **last filed accounts** (and last filed VAT return). If the previous bookkeeper's file doesn't agree to what was filed, the filed figures are your starting point, and the difference needs explaining.
- **Bank statements for the whole period**, for every account, with no gaps. Get the client to download them from online banking as CSV and PDF.
- **Check the software settings** (VAT scheme, year end, lock dates). Old files are often set up wrongly.

### Stage 3: bulk processing

- Import or feed the bank for the whole period. Reconcile **month by month** so differences can be found.
- Set up **suggest-only rules** for obvious recurring items (rent, utilities, loan repayments, payroll).
- Enter sales invoices from the client's records so debtors and VAT are right; if invoices weren't kept, rebuild them from receipts and the client's customer list.
- Anything you can't identify goes to a **query account** with date, amount and payee: never to Sundry.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Run the query list like a project",
      md: `Send the client a short, specific list (date, amount, payee, your best guess) rather than a 400-line spreadsheet. Ask the high-value items first. Set a deadline, and agree that anything still unanswered will be treated as the director's personal spending (to the director's loan account) rather than a business expense. Record that agreement on file.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Correcting earlier VAT returns (Notice 700/45)",
      md: `Errors on previous VAT returns can be corrected on the **next return** if the **net** value of the errors is **£10,000 or less**, or between £10,000 and **£50,000** and no more than **1% of box 6** on the return for the period in which they're discovered. Otherwise, or if the errors were deliberate, they must be notified to HMRC separately. Corrections are possible for **4 years**. If an error was careless, telling HMRC separately can reduce any penalty, even where the next-return method is allowed.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When to stop and escalate",
      md: `- Sales that look far lower than the bank receipts, or cash takings that never reach the bank.
- Large or regular unexplained transfers to the director or family members.
- Signs that the client should have registered for VAT long ago.
- HMRC compliance letters, or returns filed with figures that can't be supported.

These raise penalty, disclosure and possibly money-laundering reporting issues. Raise them with your manager before going further.`,
    },
    {
      kind: "md",
      md: `### Stage 4: resolution

Once the bank is reconciled for every month and the query account is clear:

1. Reconcile VAT control to the returns filed and calculate any corrections.
2. Agree payroll liabilities to HMRC records.
3. Review the director's loan account: catch-up files often reveal a large overdrawn balance.
4. Produce draft accounts, then file overdue returns in deadline order.
5. Lock each period as it's completed, and set the client up on a monthly routine so it doesn't happen again.`,
    },
  ],
  scenario: {
    title: "Rescuing Marsh Lane Cleaning Ltd",
    narrative: `**Marsh Lane Cleaning Ltd** has a 31 March year end and is VAT registered (standard scheme, quarterly). The director, Gary, hasn't done any bookkeeping since **April 2025**. He filed the last three VAT returns using estimates. The 31 March 2025 accounts were filed by the previous accountant. It's now October 2026, so the accounts and CT600 for the year to **31 March 2026** are due on **31 December 2026** and **31 March 2027** respectively, and corporation tax for that year is due on **1 January 2027**.

After importing 18 months of bank statements and coding what you can, the query account holds **£3,460** of payments Gary needs to explain.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Triage.** Priorities in order: (1) the year to 31 March 2026, because the accounts (31 December 2026) and the tax payment (1 January 2027) fall due first; (2) getting the VAT position right, since three returns were estimates; (3) bringing April to September 2026 up to date and setting up a monthly routine.

**Foundations.** Opening balances agreed to the filed 31 March 2025 accounts. All bank and credit card statements obtained.

**Query list.** Gary's answers on the £3,460:
- £1,800 to a holiday company: personal
- £1,200 to a garage: van repair (he finds the VAT invoice: £1,000 + £200 VAT)
- £460 for a scheduling app subscription with no VAT charged`,
      },
      {
        kind: "journal",
        title: "Clearing the query account",
        lines: [
          { account: "Director's loan account", dr: 1800 },
          { account: "Motor expenses", dr: 1000 },
          { account: "VAT control", dr: 200 },
          { account: "Software subscriptions", dr: 460 },
          { account: "Query account (suspense)", cr: 3460 },
        ],
      },
      {
        kind: "md",
        md: `**VAT.** Recalculating the three estimated returns from the books shows they **underdeclared** a net **£7,400** in total. That's under £10,000, so it can be corrected on the next return. But the estimates weren't based on records, so discuss with your manager whether a separate disclosure to HMRC is advisable to reduce any careless-error penalty.

**Director's loan account.** With personal items identified, the DLA is overdrawn. That needs flagging for s455 and benefit-in-kind consideration before the accounts are finalised.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "error-correction-limit",
      prompt: "A client discovers errors on earlier VAT returns while preparing a return whose **box 6** figure is **£2,200,000**. The errors weren't deliberate. What is the **maximum** net value of errors it can correct on that return rather than notifying HMRC separately?",
      answer: 22000,
      unit: "£",
      explain: "The limit is £10,000, or 1% of box 6 if higher, up to a ceiling of £50,000.",
      working: "1% × £2,200,000 = £22,000. That's above £10,000 and below £50,000, so the limit is **£22,000**.",
    },
    {
      kind: "mcq",
      id: "error-small-business",
      prompt: "A small business with box 6 of **£300,000** on its current return finds net errors of **£12,000** on earlier returns (not deliberate). What should it do?",
      options: [
        "Correct them on the current return",
        "Notify HMRC separately: £12,000 exceeds both £10,000 and 1% of box 6 (£3,000)",
        "Ignore them, as they're under £50,000",
        "Wait until the year end",
      ],
      answer: 1,
      explain: "The next-return method is only allowed up to £10,000, or up to 1% of box 6 (max £50,000) if that's higher. Here 1% is only £3,000, so the limit is £10,000 and £12,000 exceeds it.",
    },
    {
      kind: "journal",
      id: "clear-query",
      prompt: `A query account has a **£2,150** debit balance. The client explains: **£950** was the director's personal shopping; **£840** was office furniture from a VAT-registered supplier (£700 + £140 VAT, invoice now provided); **£360** was a company secretarial filing service from a freelancer who isn't VAT registered. Post the journal to clear the query account. (Treat the furniture as a fixed asset and the filing service as legal and professional fees.)`,
      accounts: ["Director's loan account", "Office furniture – cost", "VAT control", "Legal and professional fees", "Query account (suspense)", "Sundry expenses", "Bank – current account"],
      answer: [
        { account: "Director's loan account", dr: 950 },
        { account: "Office furniture – cost", dr: 700 },
        { account: "VAT control", dr: 140 },
        { account: "Legal and professional fees", dr: 360 },
        { account: "Query account (suspense)", cr: 2150 },
      ],
      explain: "Each item moves to its proper home: personal spending to the DLA (no VAT), the furniture to fixed assets with its VAT reclaimed now that there's a valid invoice, and the service to professional fees (no VAT, as the freelancer isn't registered). The query account is cleared to nil. Never clear it to Sundry.",
    },
    {
      kind: "classify",
      id: "classify-triage",
      prompt: "During triage of a catch-up client, which items should go to your manager straight away, and which are routine catch-up work?",
      categories: ["Escalate to manager now", "Routine catch-up work"],
      items: [
        { text: "Bank receipts are £60,000 higher than the sales figures in the last filed VAT returns", answer: 0 },
        { text: "Six months of bank statements need importing", answer: 1 },
        { text: "An HMRC letter opening a compliance check into the VAT returns", answer: 0 },
        { text: "Bank rules need setting up for rent and utilities", answer: 1 },
        { text: "Turnover appears to have exceeded the VAT threshold two years ago, but the business only registered last month", answer: 0 },
        { text: "Supplier invoices need matching to bank payments", answer: 1 },
      ],
      explain: "Possible under-declared income, HMRC enquiries and late registration all carry penalty, disclosure and possibly money-laundering implications. They need senior judgement, not just more processing.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-starting-point",
      prompt: "The previous bookkeeper's file doesn't agree to the last accounts filed at Companies House. What should your opening balances be based on?",
      options: ["The previous bookkeeper's file", "The last filed accounts, with the difference investigated", "The bank balance only", "Last year's VAT return"],
      answer: 1,
      explain: "The filed accounts are the reported position; start there and explain any difference.",
    },
    {
      kind: "mcq",
      id: "q-order",
      prompt: "In a catch-up job, what decides the order in which periods are processed?",
      options: ["Alphabetical order of bank accounts", "Filing and payment deadlines, and risk", "Whatever the client prefers", "The most recent month first, always"],
      answer: 1,
      explain: "Deadlines (and the penalties attached) and risk drive the order.",
    },
    {
      kind: "mcq",
      id: "q-unanswered",
      prompt: "After repeated requests, the client hasn't explained £1,400 of card payments. A sensible, documented approach is to:",
      options: ["Code them to Sundry expenses", "Treat them as the director's personal spending (DLA), as agreed with the client in advance", "Delete them", "Leave them in suspense in the final accounts"],
      answer: 1,
      explain: "Unexplained payments can't be claimed as business expenses. Treating them as personal, with the client's prior agreement recorded, is prudent.",
    },
    {
      kind: "mcq",
      id: "q-time-limit",
      prompt: "How far back can errors on VAT returns generally be corrected?",
      options: ["12 months", "2 years", "4 years", "6 years"],
      answer: 2,
      explain: "The normal time limit is 4 years (it doesn't apply to deliberate errors).",
    },
    {
      kind: "mcq",
      id: "q-reconcile-monthly",
      prompt: "Why reconcile a year's catch-up bank data month by month rather than just at the year end?",
      options: [
        "The software requires it",
        "Differences are much easier to find in a single month, and VAT quarters need correct figures",
        "It's faster to skip months",
        "To reduce the number of transactions",
      ],
      answer: 1,
      explain: "A year-end-only reconciliation leaves you hunting for a difference among thousands of lines.",
    },
  ],
  sources: [
    { label: "HMRC VAT Notice 700/45 – how to correct VAT errors and make adjustments or claims", url: "https://www.gov.uk/guidance/how-to-correct-vat-errors-and-make-adjustments-or-claims-vat-notice-70045" },
    { label: "GOV.UK – VAT registration: when to register", url: "https://www.gov.uk/vat-registration/when-to-register" },
    { label: "GOV.UK – Penalty points and penalties if you submit your VAT return late", url: "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late" },
    { label: "GOV.UK – Pay your Corporation Tax bill", url: "https://www.gov.uk/pay-corporation-tax" },
    { label: "GOV.UK – Director's loans", url: "https://www.gov.uk/directors-loans" },
  ],
};
