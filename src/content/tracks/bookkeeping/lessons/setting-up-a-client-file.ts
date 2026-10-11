import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "setting-up-a-client-file",
  title: "Setting up a client file",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Everything that has to be right before the first transaction is coded: onboarding and anti-money-laundering checks, the information to collect, a tailored chart of accounts, VAT and Making Tax Digital settings, opening balances from the last accounts, and lock dates.",
  objectives: [
    "List the onboarding steps that must be complete before bookkeeping starts",
    "Collect the key client data that drives the software settings (VAT scheme, year end, MTD status)",
    "Tailor a chart of accounts to the client's business and tax needs",
    "Post opening balances from the last approved balance sheet and prove they agree",
  ],
  body: [
    {
      kind: "md",
      md: `Most bookkeeping problems you'll be asked to fix later started on day one: the wrong VAT scheme in the settings, opening balances that don't match the last accounts, a generic chart of accounts where everything lands in "General expenses". An hour spent setting a file up properly saves days at the year end.

The set-up runs in a fixed order: **onboarding → information → software settings → chart of accounts → opening balances → lock**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Onboarding comes first",
      md: `Accountancy service providers are supervised for anti-money laundering. Before you act, the firm must carry out **customer due diligence**: identify the client (and any beneficial owners of a company), verify identity, understand the nature of the business and the source of funds, and assess the risk. You also need a signed **engagement letter** that sets out the scope of the bookkeeping work. Don't start coding until your firm's onboarding is signed off, however keen the client is.`,
    },
    {
      kind: "table",
      caption: "Information to collect",
      head: ["Item", "Why it matters"],
      rows: [
        ["Legal entity: sole trader, partnership, LLP or company (company number)", "Drives the equity accounts and the year-end accounts format"],
        ["Accounting year end", "Sets the financial year in the software"],
        ["VAT: registered? VAT number, return periods (stagger), scheme (standard, cash accounting, flat rate)", "Wrong settings mean every VAT return is wrong"],
        ["Making Tax Digital status", "All VAT-registered businesses must keep digital records and file VAT returns through compatible software; sole traders and landlords may be within MTD for Income Tax"],
        ["Every bank, savings, credit card, loan and payment-processor account", "Each needs a feed and a reconciliation"],
        ["Payroll: who runs it, pension scheme, CIS status", "Determines which journals and control accounts are needed"],
        ["Last approved accounts and trial balance", "The source of opening balances"],
        ["Key contacts and how the client sends paperwork", "Keeps the monthly routine running"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Making Tax Digital for Income Tax",
      md: `Sole traders and landlords registered for Self Assessment are brought into MTD for Income Tax in stages, based on **qualifying income** (self-employment plus property income): over **£50,000** in 2024/25 from **April 2026**, over **£30,000** in 2025/26 from **April 2027**, and over **£20,000** in 2026/27 from **April 2028**. Clients in scope need compatible software and quarterly updates, so check this at set-up.`,
    },
    {
      kind: "md",
      md: `### Tailoring the chart of accounts

Start from the software's default chart, then adapt it:

- **Delete or archive** codes the client will never use, so juniors can't pick them.
- **Add codes the tax computation needs**: client entertainment (disallowable), staff entertainment, fines and penalties, donations, subcontractors (CIS), director's remuneration separate from staff wages.
- **Add the balance sheet accounts** for each loan, hire purchase agreement, director's loan account (one per director), and payroll liabilities.
- **Use tracking categories / classes** for analysis (sites, departments, jobs) rather than creating dozens of near-identical nominal codes.

Match the client's last year-end accounts where you can, so this year's figures compare easily.`,
    },
    {
      kind: "md",
      md: `### Opening balances

The opening balances are the **closing balance sheet** in the last approved accounts, as at the day before your **conversion date**. Enter them as a journal (or through the software's conversion balances screen), then:

- Enter **outstanding sales invoices and supplier bills individually**, so the aged reports work. Most software posts these to the control accounts for you, so don't put the same totals in the journal too.
- Check the opening **bank** balance equals the bank statement at the conversion date.
- Run a balance sheet at the conversion date and **tick every line** to the last accounts.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common set-up mistakes",
      md: `- **Opening balances from draft accounts.** Use the final, approved figures, including the last-minute year-end journals.
- **Debtors and creditors entered twice:** once in the opening journal and again as individual invoices.
- **VAT scheme set to standard for a flat-rate client** (or vice versa), so every return calculates the wrong figure.
- **Bank feed start date earlier than the conversion date**, pulling in transactions already in the opening balances.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Lock it",
      md: `Once the opening balances agree to the last accounts, set a **lock date** at the day before the conversion date so nobody can post into the prior period. Lock each VAT period once the return is filed, and each year once the accounts are approved.`,
    },
  ],
  scenario: {
    title: "Moving Bloom & Branch Florists Ltd onto cloud software",
    narrative: `**Bloom & Branch Florists Ltd** has kept its books in spreadsheets. It's VAT registered (standard scheme, quarters ending March, June, September, December) and has a 31 March year end. The directors want to move to cloud software from **1 April 2026**. The approved balance sheet at **31 March 2026** shows:

| | £ |
|---|---:|
| Shop fittings – cost | 12,000 |
| Shop fittings – accumulated depreciation | (4,800) |
| Inventory | 3,200 |
| Trade receivables (two corporate customers) | 1,450 |
| Bank | 8,630 |
| Trade payables (four suppliers) | (2,180) |
| VAT liability (March quarter) | (1,940) |
| Corporation tax | (3,100) |
| Director's loan account (owed to director) | (2,500) |
| **Net assets** | **10,760** |
| Share capital | 100 |
| Retained earnings | 10,660 |
| **Equity** | **10,760** |`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: settings.** Financial year end 31 March; VAT standard scheme, quarterly, stagger ending March; MTD VAT connected; conversion date 1 April 2026.

**Step 2: outstanding invoices and bills.** Enter the two customer invoices (£1,450 in total) and four supplier bills (£2,180) individually, dated as originally issued. The software posts them to the control accounts.

**Step 3: the opening balance journal** for everything else, at 31 March 2026:`,
      },
      {
        kind: "journal",
        title: "Opening balances (excluding debtors and creditors, entered individually)",
        lines: [
          { account: "Shop fittings – cost", dr: 12000 },
          { account: "Inventory", dr: 3200 },
          { account: "Bank – current account", dr: 8630 },
          { account: "Shop fittings – accumulated depreciation", cr: 4800 },
          { account: "VAT control", cr: 1940 },
          { account: "Corporation tax", cr: 3100 },
          { account: "Director's loan account", cr: 2500 },
          { account: "Share capital", cr: 100 },
          { account: "Retained earnings", cr: 10660 },
          { account: "Opening balance adjustments", cr: 730 },
        ],
        narrative:
          "Because debtors (£1,450) and creditors (£2,180) are entered separately, the other balances have £730 more debits than credits. The difference is credited to a temporary opening balance adjustments account. When the invoices are entered the software posts Dr Trade receivables £1,450, Cr adjustments £1,450; the bills post Dr adjustments £2,180, Cr Trade payables £2,180. Net debit to the adjustments account £730, which clears it to nil.",
      },
      {
        kind: "md",
        md: `**Step 4: prove it.** Run the balance sheet at 31 March 2026. Every line should agree to the approved accounts and the opening balance adjustment account should be **nil**. Check the bank balance against the statement.

**Step 5: lock.** Set the lock date at 31 March 2026, set the bank feed to start on 1 April 2026, and archive default codes the shop won't use.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "sole-trader-opening",
      prompt: `A sole trader's last approved balance sheet shows: Bank **£4,200**; Van – cost **£9,000**; Van – accumulated depreciation **£3,000**; Accruals **£800**. There are no debtors or creditors. Post the opening balance journal, including the capital figure that makes it balance.`,
      accounts: ["Bank – current account", "Van – cost", "Van – accumulated depreciation", "Accruals", "Capital", "Drawings", "Sales", "Retained earnings"],
      answer: [
        { account: "Bank – current account", dr: 4200 },
        { account: "Van – cost", dr: 9000 },
        { account: "Van – accumulated depreciation", cr: 3000 },
        { account: "Accruals", cr: 800 },
        { account: "Capital", cr: 9400 },
      ],
      explain:
        "Assets are debits, liabilities and accumulated depreciation are credits, and capital (net assets) balances it: £4,200 + £9,000 − £3,000 − £800 = £9,400. A sole trader has a capital account, not retained earnings. Drawings start at nil in the new year.",
    },
    {
      kind: "numeric",
      id: "retained-earnings-balancing",
      prompt: `A company's approved balance sheet at its last year end shows: fixed assets NBV **£18,500**; trade receivables **£6,200**; bank **£3,900**; trade payables **£4,750**; VAT liability **£2,300**; corporation tax **£1,600**; share capital **£1,000**. What is the retained earnings balance?`,
      answer: 18950,
      unit: "£",
      explain: "Net assets = equity. Retained earnings is equity less share capital.",
      working: `Net assets: £18,500 + £6,200 + £3,900 − £4,750 − £2,300 − £1,600 = £19,950

Retained earnings: £19,950 − £1,000 = **£18,950**`,
    },
    {
      kind: "classify",
      id: "classify-setup-tasks",
      prompt: "Classify each item for a new VAT-registered limited company client.",
      categories: ["Must be done before any coding", "Part of software set-up", "Not needed"],
      items: [
        { text: "Customer due diligence and identity checks", answer: 0 },
        { text: "Signed engagement letter", answer: 0 },
        { text: "Set the VAT scheme and return periods", answer: 1 },
        { text: "Add a disallowable client entertainment code", answer: 1 },
        { text: "Set up a capital account and drawings for the director", answer: 2, why: "A company has share capital and retained earnings; the director uses a director's loan account." },
        { text: "Set a lock date at the day before conversion", answer: 1 },
      ],
      explain: "Onboarding (AML and engagement) is a precondition, not a software task. Companies don't have capital or drawings accounts.",
    },
    {
      kind: "mcq",
      id: "double-debtors",
      prompt:
        "After set-up, the balance sheet shows trade receivables of £2,900 but the last accounts show £1,450, and the opening balance adjustment account isn't nil. What's the most likely cause?",
      options: [
        "A bank feed duplicate",
        "Debtors entered both in the opening journal and as individual invoices",
        "The VAT scheme setting",
        "Depreciation not yet charged",
      ],
      answer: 1,
      explain: "Exactly double the right figure points to the same debtors entered twice. Remove them from the opening journal and keep the individual invoices so the aged report works. A duplicate bank feed line would affect the bank, not receivables; VAT settings and depreciation don't touch the debtors figure at all.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-opening-source",
      prompt: "Opening balances for a new client file should come from:",
      options: ["The client's bank statement only", "The last approved year-end balance sheet", "The last VAT return", "The draft accounts"],
      answer: 1,
      explain: "Use the final, approved closing balance sheet, including all year-end adjustments.",
    },
    {
      kind: "mcq",
      id: "q-mtd-vat",
      prompt: "Which clients must keep digital records and file VAT returns through MTD-compatible software?",
      options: ["Only those with turnover over £90,000", "All VAT-registered businesses", "Only companies", "Only voluntary registrations"],
      answer: 1,
      explain: "MTD for VAT applies to all VAT-registered businesses, including voluntary registrations, unless HMRC has granted an exemption.",
    },
    {
      kind: "mcq",
      id: "q-mtd-itsa",
      prompt: "A sole trader had qualifying income of £38,000 in 2025/26. From when are they required to use MTD for Income Tax?",
      options: ["April 2026", "April 2027", "April 2028", "Never"],
      answer: 1,
      explain: "Qualifying income over £30,000 in 2025/26 brings them in from April 2027.",
    },
    {
      kind: "mcq",
      id: "q-lock-date",
      prompt: "Why set a lock date once opening balances are agreed?",
      options: ["To stop the bank feed", "To stop anyone posting into the period covered by the approved accounts", "To file the VAT return", "To hide old transactions"],
      answer: 1,
      explain: "A lock date protects figures that have already been reported from accidental changes.",
    },
    {
      kind: "mcq",
      id: "q-tracking",
      prompt: "A client wants profit by shop for three shops. The best approach is usually:",
      options: ["Three copies of every expense code", "Tracking categories (or classes) for each shop", "Three separate VAT registrations", "A spreadsheet at the year end"],
      answer: 1,
      explain: "Tracking categories give analysis without bloating the chart of accounts, and keep the tax figures in one set of codes.",
    },
  ],
  sources: [
    { label: "GOV.UK – Money Laundering Regulations: your responsibilities", url: "https://www.gov.uk/guidance/money-laundering-regulations-your-responsibilities" },
    { label: "GOV.UK – Check if you're eligible for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax" },
    { label: "GOV.UK – Making Tax Digital for VAT", url: "https://www.gov.uk/guidance/making-tax-digital-for-vat" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
  ],
};
