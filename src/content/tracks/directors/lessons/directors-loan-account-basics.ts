import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "directors-loan-account-basics",
  title: "The director's loan account: credit, overdrawn and coding",
  level: "foundation",
  minutes: 30,
  summary:
    "How the director's loan account (DLA) works, how to code personal spending and company-paid expenses correctly, what a credit balance means, and how to reconcile an overdrawn account before the year end.",
  objectives: [
    "Explain what the DLA records and the difference between a credit and a debit (overdrawn) balance",
    "Code director-related transactions to the DLA, wages, dividends or expenses correctly",
    "Handle a director lending money to the company, including interest and repayment",
    "Spot an overdrawn DLA at the year end and know what must happen next",
  ],
  body: [
    {
      kind: "md",
      md: `The **director's loan account** is not a special statutory account. It is a ledger account in the company's books that records every transaction between the company and the director that is not salary, a dividend, or a properly documented expense claim. A well-kept DLA is one of the most useful pieces of evidence in a client file; a messy one is the commonest source of tax problems for owner-managed companies.`,
    },
    {
      kind: "table",
      caption: "Which way round is the balance?",
      head: ["Balance", "Meaning", "Who owes whom", "Tax consequence"],
      rows: [
        ["Credit (liability)", "The company owes the director", "Company → director", "None on the balance itself. Interest paid by the company is deductible and taxable on the director."],
        ["Debit (asset, 'overdrawn')", "The director owes the company", "Director → company", "s455 charge if unpaid 9 months and 1 day after the year end; beneficial loan BIK if over £10,000."],
      ],
    },
    {
      kind: "md",
      md: `### What goes through the account

- **Credits** (the company now owes the director more): the director pays a company bill from their own pocket, lends cash to the company, or is voted salary or a dividend that is left unpaid.
- **Debits** (the director now owes the company more): the company pays a personal bill, the director withdraws cash, or a salary/dividend is paid before it has been properly declared or processed.

Always code **by what the money was for**, not by which bank card was used. A personal supermarket shop on the company debit card is a debit to the DLA, not "subsistence". A business train ticket bought on the director's own card is a credit to the DLA and an expense.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't use the DLA as a plug",
      md: `It is tempting to park every unexplained bank movement in the DLA. Doing that hides missing invoices, unpaid salary and undeclared dividends. Each unexplained withdrawal should be queried and resolved to one of: **expense** (with evidence), **salary** (through PAYE), **dividend** (properly declared) or **loan** (documented and, if overdrawn, dealt with).`,
    },
    {
      kind: "md",
      md: `### A director lending to the company

If the director lends money to the company, the balance sits as a credit on the DLA. Points to remember:

- **Interest** is optional. If it is paid, the company deducts **income tax at 20%** (basic rate) at source if it is yearly interest paid to an individual, accounts for it on form CT61 each quarter, and the director declares it as savings income. The company gets a trading deduction if the loan was for the purposes of the trade.
- **Repayment** is not a taxable event for the director. It is simply a return of the director's own money. Repay out of cash only if the company can afford to.
- A director should never repay themselves from a credit DLA **while the company is insolvent or near to it**: it may be challenged as a preference (Insolvency Act 1986 s239).
- Keep a short loan note (amount, date, whether interest is payable) so the credit balance can't later be argued to be a gift, a share subscription or something else.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The year-end checklist for an overdrawn DLA",
      md: `1. Is the DLA debit at the **year-end date**? If so, note the amount.
2. Is it **over £10,000 at any time** in the tax year? If so, consider the beneficial loan reporting (P11D / s455 interest) in the next lesson.
3. Can it be cleared before **9 months and 1 day after the year end**? Options: declare a dividend (if reserves exist), vote a bonus (with PAYE and NIC), or the director repays cash. Each has a different cost.
4. Watch for **bed and breakfasting**: repaying just before the deadline and borrowing again straight afterwards will not remove the s455 charge. This is covered in a later lesson.
5. Show the DLA balance in the accounts (Companies Act 2006 ss412–413 disclosure of advances and credits to directors).`,
    },
    {
      kind: "journal",
      title: "Director pays £360 for a company laptop from his own card",
      narrative: "The company owes the director the money until it reimburses him. The VAT would be reclaimed if the company is VAT registered.",
      lines: [
        { account: "Computer equipment", dr: 300 },
        { account: "VAT control (input tax)", dr: 60 },
        { account: "Director's loan account", cr: 360 },
      ],
    },
  ],
  scenario: {
    title: "Cleaning up Fenwick Design Ltd's loan account",
    narrative: `Fenwick Design Ltd (year end 30 June 2026) is owned by Tom Fenwick. Opening DLA: Tom is owed £2,400 (credit). Transactions in the year, as extracted from the bank:

- Company card used for a family holiday: £3,100 (no business purpose)
- Tom lent the company £6,000 in January
- Tom paid £1,250 of business expenses from his personal account (receipts held)
- Cash withdrawals with no explanation: £7,500
- Tom repaid £2,000 in June after the accountant's reminder`,
    walkthrough: [
      {
        kind: "md",
        md: `Build the account in order. Credits are in Tom's favour (the company owes him); debits are against him.

| Item | Dr | Cr | Balance (Cr = company owes Tom) |
|---|---:|---:|---:|
| Opening | | 2,400 | **Cr 2,400** |
| Family holiday on company card | 3,100 | | Dr 700 |
| Lent to company | | 6,000 | Cr 5,300 |
| Business expenses paid personally | | 1,250 | Cr 6,550 |
| Unexplained cash withdrawals | 7,500 | | Dr 950 |
| Repaid to company in June | | 2,000 | **Cr 1,050** |

Tom's £2,000 payment into the company reduces what he owes, so it **credits** his account. The closing position is **Cr £1,050**: the company owes Tom, so there is no s455 exposure at 30 June.

**But resolve the £7,500 cash.** If it is in fact salary or a dividend, the DLA is understated as a debit, and the company has unreported PAYE. If it is a loan, the credit figure is right but the cash must be evidenced. Always ask before finalising.`,
      },
      {
        kind: "journal",
        title: "Reclassifying £3,100 of personal spending",
        narrative: "The holiday was paid by the company but is personal, so it moves out of expenses into Tom's loan account.",
        lines: [
          { account: "Director's loan account", dr: 3100 },
          { account: "Travel and subsistence", cr: 3100 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-dla-items",
      prompt: "How should each transaction affect the director's loan account?",
      categories: ["Credit DLA (company owes director more)", "Debit DLA (director owes company more)", "Not a DLA item"],
      items: [
        { text: "Director buys a company printer on his own card", answer: 0 },
        { text: "Company pays the director's personal car insurance", answer: 1 },
        { text: "Director's monthly PAYE salary paid through payroll", answer: 2, why: "Salary is dealt with through payroll, not the loan account." },
        { text: "Director pays £10,000 cash into the company bank as a loan", answer: 0 },
        { text: "Company card used for a family weekend away", answer: 1 },
        { text: "Dividend declared, paid by bank transfer", answer: 2, why: "A paid dividend reduces reserves and is not a loan account movement unless left unpaid." },
      ],
      explain: "Money or value flowing out of the company for personal use debits the account. Money the director puts in or business costs they fund credit it. Salary and paid dividends have their own treatment.",
    },
    {
      kind: "journal",
      id: "journal-personal-spend",
      prompt: "Post £950 of personal shopping bought on the company debit card that was originally coded to 'Office expenses'.",
      accounts: ["Director's loan account", "Office expenses", "Directors' remuneration", "Bank", "Dividends", "VAT control (input tax)"],
      answer: [
        { account: "Director's loan account", dr: 950 },
        { account: "Office expenses", cr: 950 },
      ],
      explain: "The cost isn't a business expense, so it is removed from expenses and charged to the director. Don't touch the bank: the cash has already left.",
    },
    {
      kind: "numeric",
      id: "closing-balance",
      prompt: "A DLA starts the year at £1,800 debit (director owes the company). During the year the company pays £4,200 of personal bills, the director repays £3,000 in cash and lends £2,500. What is the closing DLA balance as a **debit** (positive) or credit (negative)?",
      answer: 500,
      unit: "£",
      explain: "Personal bills paid by the company increase what the director owes; cash repaid and money lent by the director reduce it. A positive answer is a debit balance.",
      working: "£1,800 + £4,200 = £6,000 owed; − £3,000 repaid = £3,000; − £2,500 lent = **£500 debit** (the director still owes the company £500).",
    },
    {
      kind: "mcq",
      id: "mcq-interest-on-loan",
      prompt: "A company pays £400 interest on a £10,000 credit loan from its director. What must the company do?",
      options: [
        "Nothing. Interest to directors isn't taxable",
        "Deduct 20% income tax at source and report it on a CT61",
        "Deduct National Insurance",
        "Add it to the director's salary",
      ],
      answer: 1,
      explain: "Yearly interest paid by a company to an individual is paid under deduction of 20% income tax, accounted for to HMRC on form CT61.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-overdrawn-meaning",
      prompt: "An 'overdrawn' director's loan account means…",
      options: ["The company owes the director money", "The director owes the company money", "The company has an overdraft", "The director has overdrawn their salary"],
      answer: 1,
      explain: "A debit balance on the DLA is an asset of the company: money the director owes.",
    },
    {
      kind: "mcq",
      id: "q-code-by-purpose",
      prompt: "A director buys fuel for a business trip on the company card and fuel for a family holiday on the same card. How should they be coded?",
      options: ["Both to motor expenses", "Business fuel to motor expenses; holiday fuel to the DLA", "Both to the DLA", "Both to directors' salary"],
      answer: 1,
      explain: "Code by purpose, not by payment method.",
    },
    {
      kind: "mcq",
      id: "q-credit-repay",
      prompt: "The company repays a director's credit loan of £5,000. What is the tax effect for the director?",
      options: ["Dividend income", "Employment income", "None: it is a repayment of money the director lent", "Capital gain"],
      answer: 2,
      explain: "Repaying a loan is returning the director's own capital. Any interest is separately taxable.",
    },
    {
      kind: "mcq",
      id: "q-sheet-disclosure",
      prompt: "Where must balances on directors' loan accounts normally be disclosed?",
      options: ["Only on the CT600", "In the notes to the accounts under the Companies Act advances and credits rules", "Not at all for small companies", "Only on the P11D"],
      answer: 1,
      explain: "CA 2006 ss412–413 require disclosure of advances, credits and guarantees with directors, including for small companies.",
    },
    {
      kind: "mcq",
      id: "q-plug",
      prompt: "Why is it a mistake to code every unexplained bank withdrawal to the DLA?",
      options: [
        "It is never allowed",
        "It can hide unpaid PAYE, undeclared dividends or missing invoices",
        "The DLA can't be overdrawn",
        "HMRC ignores the DLA",
      ],
      answer: 1,
      explain: "Unexplained withdrawals may in fact be salary or dividends, which have separate tax and legal consequences.",
    },
  ],
  sources: [
    { label: "Director's loans – GOV.UK", url: "https://www.gov.uk/directors-loans" },
    { label: "Close companies: loans to participators – CTM61505", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505" },
    { label: "Companies Act 2006 s413 – advances and credits to directors", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/413" },
    { label: "Company Tax Return guide (CT600) – includes CT61 for income tax on interest", url: "https://www.gov.uk/government/publications/corporation-tax-company-tax-return-ct600-2015-version-3" },
  ],
};
