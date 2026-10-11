import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "loans-and-hire-purchase",
  title: "Loans and hire purchase",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Recording bank loans and hire purchase agreements properly: the drawdown, splitting each repayment between capital and interest, capitalising an HP asset and reclaiming its VAT, and showing the liability split between current and non-current at the period end.",
  objectives: [
    "Record a loan drawdown and split repayments between capital and interest using the lender's statement",
    "Set up a hire purchase agreement: asset, VAT, deposit and HP creditor",
    "Spread HP interest over the agreement and post monthly instalments",
    "Split loan and HP liabilities between amounts due within and after one year",
  ],
  body: [
    {
      kind: "md",
      md: `Loans and finance agreements are where juniors most often turn a balance sheet movement into an expense. A loan **repayment** is mostly the business giving back money it borrowed; only the **interest** is a cost. A hire purchase instalment is mostly paying for an asset; only the **finance charge** is a cost.

The rule for both: **keep a separate liability account for each loan or agreement**, reconcile it to the lender's statement, and only the interest goes to profit and loss.`,
    },
    {
      kind: "table",
      caption: "Bank loan entries",
      head: ["Event", "Debit", "Credit"],
      rows: [
        ["Loan drawn down into the bank", "Bank", "Bank loan (liability)"],
        ["Monthly repayment: capital element", "Bank loan", "Bank"],
        ["Monthly repayment: interest element", "Loan interest (expense)", "Bank"],
        ["Arrangement fee deducted by the lender", "Loan arrangement fees (or spread over the loan term)", "Bank loan / Bank"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Use the lender's statement",
      md: `Each repayment's split between capital and interest changes every month (interest falls as the balance falls). Don't guess: get the lender's statement or amortisation schedule, post the split from it, and at the period end check that the loan balance in the books **equals the statement**. If it doesn't, a repayment has been miscoded.`,
    },
    {
      kind: "md",
      md: `### Hire purchase

Under a **hire purchase** (HP) agreement the business uses the asset immediately, pays in instalments, and becomes the legal owner when the final payment (and any option fee) is made. Because the business has the risks and rewards of ownership from day one, the asset is treated as **owned**:

- **Capitalise the asset** at its **cash price** (excluding recoverable VAT) on the date of the agreement, and depreciate it as normal.
- **VAT:** with HP, the VAT on the goods is charged up front on the full cash price, so a VAT-registered business reclaims it on the return covering the agreement date (subject to the usual blocks, e.g. on cars). The finance company's charges for the credit are **exempt** from VAT.
- **Record an HP creditor** for the amount financed.
- Each instalment reduces the HP creditor (capital) and charges **HP interest** to profit and loss.`,
    },
    {
      kind: "journal",
      title: "Setting up an HP agreement",
      narrative: "A lorry: cash price £60,000 + £12,000 VAT. The business pays a £12,000 deposit and finances £60,000 over 48 months, with total interest of £9,600.",
      lines: [
        { account: "Motor vehicles – cost", dr: 60000 },
        { account: "VAT control", dr: 12000 },
        { account: "Bank – current account", cr: 12000 },
        { account: "Hire purchase creditor", cr: 60000 },
      ],
    },
    {
      kind: "md",
      md: `### Spreading the interest

The £9,600 of interest is charged over the 48 months. The most accurate method is the finance company's own schedule or an effective interest calculation, which charges more interest early on when more is owed. For small agreements, where the difference isn't material, many practices charge it **straight line**: £9,600 ÷ 48 = **£200** a month. Each £1,450 instalment (£69,600 ÷ 48) is then:

> Dr Hire purchase creditor £1,250, Dr HP interest £200, Cr Bank £1,450

### Current vs non-current

At each balance sheet date, split each loan and HP balance into the capital due **within one year** (current liability) and the rest (**non-current**). Lenders' schedules make this easy. It matters to readers of the accounts, and to the client's bank covenants.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Coding the whole repayment or instalment to interest or to "Loan repayments" in the P&L.** Only interest is an expense.
- **Capitalising the asset at the total amount payable** (including interest) or including the VAT.
- **Missing the VAT reclaim** on an HP purchase because nothing appears on the bank feed for the full price.
- **Treating contract hire like HP.** Under contract hire (a lease), the business never owns the vehicle, and the bookkeeping records the monthly rentals as an expense. See the note on leases below.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Leases under FRS 102 from 2026",
      md: `Following the FRC's Periodic Review 2024, FRS 102 requires lessees to recognise most leases on the balance sheet (a right-of-use asset and a lease liability) for accounting periods beginning on or after **1 January 2026**, with exemptions for short-term and low-value leases. In day-to-day bookkeeping, lease rentals are still usually coded to an expense code; the lease adjustments are made at the year end. Flag every lease agreement to the person preparing the accounts.`,
    },
  ],
  scenario: {
    title: "Ridgeway Haulage Ltd's lorry and bank loan",
    narrative: `**Ridgeway Haulage Ltd** (VAT registered, 31 March year end) took delivery of a new lorry on **1 October 2025** on HP, on the terms in the journal above: cash price **£60,000 + £12,000 VAT**, deposit **£12,000**, **£60,000** financed over **48 months**, total interest **£9,600**, monthly instalments **£1,450** starting 1 November 2025. Interest is immaterial to the accounts, so the firm uses straight-line allocation.

The bookkeeper had coded each £1,450 instalment to "Motor expenses" and hadn't recorded the lorry at all.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: set up the agreement** at 1 October 2025 (journal above). The £12,000 VAT goes on the VAT return for the quarter including 1 October 2025.

**Step 2: correct the instalments.** Five instalments (November to March) were coded to Motor expenses: 5 × £1,450 = £7,250. Re-code them:`,
      },
      {
        kind: "journal",
        title: "Re-coding five HP instalments",
        lines: [
          { account: "Hire purchase creditor", dr: 6250 },
          { account: "HP interest", dr: 1000 },
          { account: "Motor expenses", cr: 7250 },
        ],
        narrative: "Capital 5 × £1,250 = £6,250; interest 5 × £200 = £1,000.",
      },
      {
        kind: "md",
        md: `**Step 3: year-end balances at 31 March 2026.** HP creditor: £60,000 − £6,250 = **£53,750**. Capital due in the next 12 months: 12 × £1,250 = **£15,000** (current); the remaining **£38,750** is non-current.

**Step 4: depreciation** on the lorry for six months, under the company's policy.

**Effect on profit:** Motor expenses fall by £7,250, HP interest of £1,000 is charged, and depreciation is charged on the lorry. The company also gains a £12,000 VAT reclaim it would otherwise have missed.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "loan-repayment",
      prompt: "A client's monthly loan repayment of **£600** comprises **£104** interest and **£496** capital, per the bank's statement. Post the repayment.",
      accounts: ["Bank loan", "Loan interest", "Bank – current account", "Bank charges", "Hire purchase creditor", "General expenses"],
      answer: [
        { account: "Bank loan", dr: 496 },
        { account: "Loan interest", dr: 104 },
        { account: "Bank – current account", cr: 600 },
      ],
      explain: "The capital reduces the liability; only the interest is an expense. Bank charges are a different thing (account fees), and this loan isn't an HP agreement.",
    },
    {
      kind: "numeric",
      id: "non-current-portion",
      prompt: "At the year end a bank loan stands at **£18,400**. The lender's schedule shows capital repayments of **£5,900** in the next 12 months. What amount is shown as a **non-current** liability?",
      answer: 12500,
      unit: "£",
      explain: "Capital due within a year is current; the rest is non-current.",
      working: "£18,400 − £5,900 = **£12,500** non-current (and £5,900 current).",
    },
    {
      kind: "journal",
      id: "hp-inception",
      prompt:
        "A VAT-registered client buys a van on HP. Cash price **£24,000 + £4,800 VAT**. It pays a deposit of **£4,800** from the bank and finances **£24,000**. Post the set-up of the agreement.",
      accounts: ["Motor vehicles – cost", "VAT control", "Bank – current account", "Hire purchase creditor", "HP interest", "Motor expenses", "Bank loan"],
      answer: [
        { account: "Motor vehicles – cost", dr: 24000 },
        { account: "VAT control", dr: 4800 },
        { account: "Bank – current account", cr: 4800 },
        { account: "Hire purchase creditor", cr: 24000 },
      ],
      explain: "The van is capitalised at its cash price, the VAT on the goods is reclaimed up front, the deposit leaves the bank, and the amount financed is a liability. Interest isn't recorded until it's charged over the agreement.",
    },
    {
      kind: "numeric",
      id: "hp-monthly-interest",
      prompt: "An HP agreement finances **£24,000** over **36 months** with total repayments of **£28,320**. Using straight-line allocation, what is the monthly interest charge?",
      answer: 120,
      unit: "£",
      explain: "Total interest is the total repayable less the amount financed, spread evenly over the term.",
      working: "£28,320 − £24,000 = £4,320 ÷ 36 = **£120** a month (and £666.67 capital in each £786.67 instalment).",
    },
    {
      kind: "classify",
      id: "classify-finance",
      prompt: "How should the bookkeeping record each arrangement when it starts?",
      categories: ["Capitalise the asset and record a liability", "Code the monthly payments to an expense (flag for year-end lease review)", "Record the loan only (no asset bought)"],
      items: [
        { text: "Van bought on hire purchase", answer: 0 },
        { text: "Car on a 3-year contract hire agreement, returned at the end", answer: 1 },
        { text: "Machine bought outright, paid for with a new bank loan", answer: 0, why: "The machine is capitalised; the loan is a separate liability." },
        { text: "Bank loan taken out to fund working capital", answer: 2 },
        { text: "Photocopier rented monthly with the supplier retaining ownership", answer: 1 },
      ],
      explain: "HP and asset purchases put the asset on the balance sheet at once. Rentals and contract hire are coded to expenses day to day, with lease accounting dealt with at the year end.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-hp-vat",
      prompt: "When is the VAT on goods bought on hire purchase normally reclaimed?",
      options: ["Spread across each instalment", "Up front, on the return covering the agreement date", "At the end when ownership passes", "Never"],
      answer: 1,
      explain: "HP is a supply of goods; VAT is charged on the full cash price at the start. The credit charges are exempt.",
    },
    {
      kind: "mcq",
      id: "q-hp-cost",
      prompt: "An asset on HP has a cash price of £30,000 + VAT and total interest of £4,500. At what cost is it capitalised (VAT recoverable)?",
      options: ["£30,000", "£34,500", "£36,000", "£40,500"],
      answer: 0,
      explain: "Cash price excluding recoverable VAT. Interest is charged to profit and loss over the agreement.",
    },
    {
      kind: "mcq",
      id: "q-loan-rec",
      prompt: "At the year end, the loan balance in the books is £2,300 higher than the lender's statement. The most likely cause is:",
      options: ["Interest charged twice", "Some repayments coded entirely to interest or expenses", "A VAT error", "Depreciation"],
      answer: 1,
      explain: "If capital repayments were expensed, the loan wasn't reduced, so it's overstated.",
    },
    {
      kind: "mcq",
      id: "q-interest-vat",
      prompt: "The interest charged under an HP agreement is:",
      options: ["Standard-rated", "Zero-rated", "Exempt from VAT", "Outside the scope only for companies"],
      answer: 2,
      explain: "Charges for credit disclosed separately to the customer are exempt.",
    },
    {
      kind: "mcq",
      id: "q-current",
      prompt: "The part of an HP creditor shown as a current liability is:",
      options: ["The total amount still payable", "Capital due within 12 months of the balance sheet date", "The next instalment only", "Interest only"],
      answer: 1,
      explain: "Current liabilities are amounts due within one year; the rest of the capital is non-current.",
    },
  ],
  sources: [
    { label: "GOV.UK – VAT: instalments, deposits and credit sales", url: "https://www.gov.uk/guidance/vat-instalments-deposits-credit-sales" },
    { label: "HMRC VAT Finance Manual VATFIN3120 – credit supplied with goods or services", url: "https://www.gov.uk/hmrc-internal-manuals/vat-finance-manual/vatfin3120" },
    { label: "HMRC Business Income Manual BIM45650 – interest", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim45650" },
    { label: "FRC – FRS 102 (including the Periodic Review 2024 amendments)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "VAT on motoring expenses (Notice 700/64)", url: "https://www.gov.uk/guidance/vat-on-motoring-expenses-notice-70064" },
  ],
};
