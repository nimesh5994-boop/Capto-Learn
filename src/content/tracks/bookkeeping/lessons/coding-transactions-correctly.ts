import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "coding-transactions-correctly",
  title: "Coding transactions correctly",
  level: "foundation",
  minutes: 30,
  summary:
    "Choosing the right nominal code every time: profit and loss vs balance sheet, the payments that are never expenses (VAT, PAYE, corporation tax, loan capital, transfers), capital items, and why disallowable costs need their own codes.",
  objectives: [
    "Decide whether a transaction belongs in the profit and loss account or the balance sheet",
    "Code payments to HMRC, loan repayments and transfers to the right liability or asset",
    "Use separate codes for costs that are treated differently for tax",
    "Correct miscoded transactions and work out the effect on profit",
  ],
  body: [
    {
      kind: "md",
      md: `Coding is choosing the **other side** of each transaction. The software handles the bank side; you decide where the debit or credit lands. It sounds routine, but a single wrong code can overstate expenses by thousands, double-count wages, or make an overdrawn director's loan account disappear.

Ask two questions, in this order:

1. **Is it a cost or income of running the business this period (profit and loss), or is it settling, creating or moving an asset or liability (balance sheet)?**
2. **If it's profit and loss, which code does the client's chart (and the tax computation) need?**`,
    },
    {
      kind: "table",
      caption: "Payments that are never expenses",
      head: ["Payment", "Why it's not an expense", "Code to"],
      rows: [
        ["VAT paid to HMRC", "Settles the VAT liability built up from sales and purchases", "VAT control"],
        ["PAYE/NIC paid to HMRC", "Settles the liability from the payroll journal, which already charged wages and employer NIC", "PAYE/NIC liability"],
        ["Corporation tax paid", "Settles last year's tax liability", "Corporation tax liability"],
        ["Loan repayment", "Capital reduces the loan; only the **interest** is an expense", "Loan (capital) and Loan interest (interest)"],
        ["Transfer to savings or credit card", "Money moving between the business's own accounts", "The other bank/card account"],
        ["Director's personal spending", "Not a business cost", "Director's loan account"],
        ["Dividend paid", "A distribution, not a cost", "Dividends"],
        ["New equipment, van, computer", "Capital expenditure with an enduring benefit", "Fixed asset cost account"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The double-count trap",
      md: `When payroll is posted by journal (Dr Wages, Cr PAYE liability and Cr Net wages payable), the later bank payments to HMRC and to employees must clear those **liabilities**. Coding them to Wages again doubles the wage cost. The same logic applies to VAT: the VAT was already accounted for through the VAT codes on each sale and purchase; the payment just settles the balance.`,
    },
    {
      kind: "md",
      md: `### Codes the tax computation needs

Some costs are fine for the accounts but are treated differently for tax. Giving them their own codes means the tax adjustments can be read straight off the trial balance:

- **Client/business entertainment:** disallowable for tax, and the VAT is blocked.
- **Staff entertainment** (Christmas party, team meals for employees only): allowable, VAT recoverable.
- **Fines and penalties** (parking, speeding, HMRC late-filing penalties): disallowable.
- **Donations** to charity: treated separately (charitable donations relief for companies, not a trading expense).
- **Depreciation**, **profit/loss on disposal**: added back.
- **Director's remuneration** separate from staff wages (it's disclosed in the accounts and matters for benefit and NIC reviews).

Keep the codes **specific**. A big "Sundry expenses" or "General expenses" balance is a review point waiting to happen.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Why HMRC cares",
      md: `For tax, expenses must be wholly and exclusively for the trade and revenue (not capital) in nature, and business entertainment is specifically disallowed (BIM45000). Coding personal or capital items to expenses understates taxable profit, which can lead to penalties for the client if HMRC finds it.`,
    },
    {
      kind: "journal",
      title: "Splitting a loan repayment",
      narrative: "A monthly bank loan repayment of £850 is made up of £780 capital and £70 interest, per the lender's statement.",
      lines: [
        { account: "Bank loan", dr: 780 },
        { account: "Loan interest", dr: 70 },
        { account: "Bank – current account", cr: 850 },
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "When you don't know",
      md: `Don't guess and don't use "Sundry". Put it in a **query** (or a suspense code your firm uses for open questions), list it for the client with the date, amount and payee, and clear it when they answer. A short, specific query list each month is far better than a year-end mystery pile.`,
    },
  ],
  scenario: {
    title: "Reviewing a client's own coding: Greenway Landscapes Ltd",
    narrative: `**Greenway Landscapes Ltd** (VAT registered, payroll posted by journal) does its own coding, and you review it monthly. The director, Nadia, is pleased that June shows a loss: *"at least we won't pay much tax."* Her coding for June includes:

| # | Bank line | Nadia's code |
|---|---|---|
| 1 | HMRC VAT £4,280 | General expenses |
| 2 | HMRC PAYE £1,960 | Wages |
| 3 | Bank loan £850 (£780 capital, £70 interest) | Loan interest |
| 4 | Mini digger £14,400 incl. £2,400 VAT | Repairs, no VAT |
| 5 | HMRC corporation tax £6,300 | Taxes and licences |
| 6 | Speeding fine £100 | Motor expenses |
| 7 | Nadia's gym membership £45 | Staff welfare |
| 8 | Lunch with a client £96 (no VAT claimed) | Subsistence |`,
    walkthrough: [
      {
        kind: "table",
        caption: "Corrections",
        head: ["#", "Correct code", "Effect on June profit"],
        rows: [
          ["1", "VAT control", "+£4,280"],
          ["2", "PAYE/NIC liability (wages already charged by the payroll journal)", "+£1,960"],
          ["3", "Bank loan £780; Loan interest £70", "+£780"],
          ["4", "Plant and machinery – cost £12,000; VAT control £2,400", "+£14,400 (less a month's depreciation)"],
          ["5", "Corporation tax liability", "+£6,300"],
          ["6", "Fines and penalties (disallowable)", "Nil: still an expense, but now visible for the tax add-back"],
          ["7", "Director's loan account", "+£45"],
          ["8", "Client entertainment (disallowable; VAT blocked)", "Nil"],
        ],
      },
      {
        kind: "md",
        md: `Before depreciation, June's expenses were overstated by £4,280 + £1,960 + £780 + £14,400 + £6,300 + £45 = **£27,765**. The "loss" was an illusion created by balance sheet payments sitting in the profit and loss account.

The digger also gives the company a **£2,400 input VAT claim** it would otherwise have missed, and qualifies for capital allowances rather than being a repair.

Explain the corrections to Nadia in plain language, and suggest she leaves HMRC payments and loan repayments uncoded for you to deal with.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-pl-bs",
      prompt: "Where does each transaction belong?",
      categories: ["Profit and loss", "Balance sheet"],
      items: [
        { text: "Monthly office rent", answer: 0 },
        { text: "Quarterly VAT payment to HMRC", answer: 1 },
        { text: "Purchase of a £1,800 laptop", answer: 1, why: "Capital expenditure: fixed asset." },
        { text: "Interest element of a loan repayment", answer: 0 },
        { text: "Capital element of a loan repayment", answer: 1 },
        { text: "Transfer to the business deposit account", answer: 1 },
        { text: "Accountancy fees", answer: 0 },
        { text: "Payment of last year's corporation tax", answer: 1 },
      ],
      explain: "Costs of running the business this period go to profit and loss. Settling liabilities, buying long-term assets and moving money between the business's own accounts are balance sheet movements.",
    },
    {
      kind: "journal",
      id: "reclassify-vat-payment",
      prompt: "A **£3,150** quarterly VAT payment to HMRC was coded to General expenses. Post the correcting journal.",
      accounts: ["VAT control", "General expenses", "Bank – current account", "Corporation tax liability", "PAYE/NIC liability", "Suspense"],
      answer: [
        { account: "VAT control", dr: 3150 },
        { account: "General expenses", cr: 3150 },
      ],
      explain: "The payment settles the VAT liability, so VAT control is debited. Removing it from General expenses increases profit by £3,150. The bank side was already right.",
    },
    {
      kind: "numeric",
      id: "corrected-profit",
      prompt: `A client's draft profit is **£22,400**. You find these coding errors:

- Loan repayments of **£6,000** coded to Loan interest; the lender's statement shows interest of **£900**.
- A **£2,300** PAYE payment to HMRC coded to Wages (the payroll journal had already been posted).
- A laptop costing **£1,500** net coded to Office costs. (Ignore depreciation.)
- **£300** of client entertaining coded to Advertising.

What is the corrected profit?`,
      answer: 31300,
      unit: "£",
      explain: "Moving balance sheet items out of the P&L increases profit. Moving a cost from one expense code to another doesn't change profit.",
      working: `Loan capital wrongly expensed: £6,000 − £900 = £5,100

£22,400 + £5,100 + £2,300 + £1,500 + £0 = **£31,300**`,
    },
    {
      kind: "mcq",
      id: "why-separate-codes",
      prompt: "Why give client entertainment its own nominal code rather than using Subsistence or Marketing?",
      options: [
        "It's required by Companies House",
        "It's disallowable for tax and the VAT is blocked, so it must be identifiable for the tax computation and VAT return",
        "It's a balance sheet item",
        "So it can be claimed as a staff benefit",
      ],
      answer: 1,
      explain: "Business entertainment is added back for tax (BIM45000) and its input VAT is blocked. A dedicated code makes both adjustments accurate and easy to evidence.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-paye-payment",
      prompt: "Payroll is posted by journal each month. The PAYE payment to HMRC should be coded to:",
      options: ["Wages", "PAYE/NIC liability", "Employer's NIC", "General expenses"],
      answer: 1,
      explain: "The journal already charged wages and employer NIC; the payment clears the liability.",
    },
    {
      kind: "mcq",
      id: "q-ct-payment",
      prompt: "A company pays its corporation tax. The debit goes to:",
      options: ["Taxes and licences expense", "Corporation tax liability", "Director's loan account", "Retained earnings"],
      answer: 1,
      explain: "The tax charge was recognised as a liability when the accounts were prepared; the payment clears it.",
    },
    {
      kind: "mcq",
      id: "q-fine",
      prompt: "A parking fine paid by the company for a company van should be coded to:",
      options: ["Motor expenses", "Fines and penalties (disallowable)", "Director's loan account in every case", "Travel"],
      answer: 1,
      explain: "Fines are disallowable for tax, so keep them in their own code. (If the fine is the director's personal liability and the company pays it, a benefit or DLA question also arises.)",
    },
    {
      kind: "mcq",
      id: "q-sundry",
      prompt: "A client's 'Sundry expenses' code holds £14,000 at the year end. What does it suggest?",
      options: ["Nothing; sundry is a normal code", "Items that should have been coded more specifically, or queries never answered", "Under-claimed VAT only", "A bank rule working correctly"],
      answer: 1,
      explain: "A large sundry balance usually hides miscoded items: personal spending, capital items or disallowable costs. Analyse it before the accounts go out.",
    },
    {
      kind: "mcq",
      id: "q-loan-interest",
      prompt: "Coding a full loan repayment (capital and interest) to Loan interest has what effect?",
      options: ["Profit overstated and loan understated", "Profit understated and loan overstated", "No effect", "VAT overclaimed"],
      answer: 1,
      explain: "The capital part is wrongly expensed (profit too low) and the loan balance isn't reduced (liability too high).",
    },
  ],
  sources: [
    { label: "HMRC Business Income Manual BIM45000 – entertainment", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim45000" },
    { label: "HMRC Business Income Manual BIM35000 – capital/revenue divide", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim35000" },
    { label: "HMRC Business Income Manual BIM45650 – interest", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim45650" },
    { label: "Business entertainment and VAT (Notice 700/65)", url: "https://www.gov.uk/guidance/business-entertainment-and-vat-notice-70065" },
    { label: "GOV.UK – Director's loans", url: "https://www.gov.uk/directors-loans" },
  ],
};
