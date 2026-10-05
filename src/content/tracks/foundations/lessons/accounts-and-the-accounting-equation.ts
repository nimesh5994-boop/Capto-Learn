import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "accounts-and-the-accounting-equation",
  title: "What accounts are for and the accounting equation",
  level: "foundation",
  minutes: 30,
  summary:
    "Why businesses keep accounts and who relies on them, the five elements every transaction touches, and the accounting equation that holds the whole system together.",
  objectives: [
    "Explain who uses a set of accounts and why, and how long the law says records must be kept",
    "Apply the business entity concept to separate the owner from the business",
    "Classify items as assets, liabilities, capital, income or expenses",
    "Use the accounting equation, including its expanded form, to find a missing figure",
  ],
  body: [
    {
      kind: "md",
      md: `Every client you'll ever work on has the same basic need: a reliable record of what the business owns, what it owes, and whether it's making money. Accounts turn hundreds of receipts, invoices and bank lines into that answer.

They matter because other people **make decisions** on them:

- the **owner or directors** decide whether to expand, cut costs or draw more money out;
- **HMRC** uses the profit figure as the starting point for income tax or corporation tax;
- **banks and lenders** look at profit and net assets before lending, and often set covenants based on them;
- **shareholders** of a company use them to judge how the directors have looked after their money (this is called *stewardship*);
- **suppliers, customers, employees and Companies House** all have an interest too. A supplier wants to know a customer can pay; anyone can look up a company's filed accounts.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The business entity concept",
      md: `For accounting purposes the business is treated as **separate from its owner**, even for a sole trader where the law doesn't separate them. Only the business's transactions go in the books.

So when a sole trader pays their own family holiday from the business bank account, it isn't a business expense. It's **drawings**: money taken out by the owner. For a limited company, the separation is legal as well as accounting: the company is its own legal person.`,
    },
    {
      kind: "md",
      md: `### The two main statements

- The **income statement** (profit and loss account) covers a **period**, usually a year. It shows income less expenses, giving profit or loss.
- The **balance sheet** (statement of financial position, in IFRS language) is a snapshot at **one date**, the last day of that period. It shows what the business owns and owes, and how much of it "belongs" to the owner.

A useful way to remember it: the income statement is a video of the year; the balance sheet is a photo taken at the end.`,
    },
    {
      kind: "table",
      caption: "The five elements",
      head: ["Element", "What it is", "Examples", "Which statement"],
      rows: [
        ["Asset", "Something the business controls that will bring in future benefit", "Bank balance, van, machinery, stock, money owed by customers (trade receivables / debtors)", "Balance sheet"],
        ["Liability", "Something the business owes to someone else", "Bank loan, VAT owed to HMRC, money owed to suppliers (trade payables / creditors)", "Balance sheet"],
        ["Capital", "What the business owes back to its owner: money put in plus profits kept, less drawings", "Owner's initial investment; for a company, share capital and retained earnings", "Balance sheet"],
        ["Income", "Money earned from the business's activities", "Sales, fees, rent received, interest received", "Income statement"],
        ["Expense", "Costs used up in earning that income", "Rent, wages, insurance, light and heat, repairs", "Income statement"],
      ],
    },
    {
      kind: "md",
      md: `### The accounting equation

Because the business is separate from its owner, **everything it has must have been funded by someone**: either the owner (capital) or outsiders (liabilities). So at any moment:

**Assets = Capital + Liabilities**

Profit belongs to the owner, so it increases capital. Drawings take capital out. That gives the **expanded equation**, which links the balance sheet to the income statement:

**Assets = Opening capital + Capital introduced + Profit − Drawings + Liabilities**

Rearranged, it's how you find a missing figure. For example **Capital = Assets − Liabilities**, which is why capital is also called **net assets**.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Dual effect: every transaction changes two things",
      md: `Every transaction affects **at least two** items, and the equation still balances afterwards:

| Transaction | Effect | Equation still balances because… |
|---|---|---|
| Owner pays £5,000 into the business bank | Assets +£5,000, Capital +£5,000 | both sides up £5,000 |
| Business buys a laptop for £900 from the bank | Assets +£900 (laptop), Assets −£900 (bank) | one asset swapped for another |
| Business borrows £3,000 from the bank | Assets +£3,000, Liabilities +£3,000 | both sides up £3,000 |
| Business pays £200 rent | Assets −£200, Capital −£200 (an expense reduces profit) | both sides down £200 |

This dual effect is the foundation of **double entry**, covered in the next lesson.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Treating drawings as an expense.** Drawings reduce capital directly. They never go through the income statement, so they don't reduce taxable profit.
- **Mixing up the owner and the business.** A sole trader's personal car loan is not a business liability, even if the business bank account pays it. The payments are drawings.
- **Thinking a profit means cash.** A business can be profitable and still overdrawn, for example because customers haven't paid yet or the profit has been spent on a new van.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How long records must be kept",
      md: `- **Sole traders and partners:** at least **5 years after the 31 January submission deadline** of the relevant tax year (gov.uk, *Business records if you're self-employed*).
- **Companies, under company law:** Companies Act 2006 s386 requires every company to keep adequate accounting records, and s388 says they must be preserved for **3 years** from when they're made for a **private** company and **6 years** for a **public** company.
- **Companies, for corporation tax:** HMRC requires records to be kept for **6 years from the end of the accounting period** (longer if an enquiry is still open or a return was late), so in practice keep company records for at least 6 years.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Use the equation as a sense check",
      md: `When you finish a set of accounts, check that **net assets** on the balance sheet equal the **capital** section. If they don't, something has been posted to only one side, or a balance has been missed. You'll see this again with the trial balance.`,
    },
  ],
  scenario: {
    title: "Hannah's first month: tracking the equation",
    narrative: `Hannah Okafor has just started **Pawfect Grooming**, a mobile dog-grooming business, as a sole trader. She's emailed you her first month's transactions and asks: *"I've only made £1,900 and spent loads. Am I even making a profit, and what's the business actually worth?"*

1. Paid **£8,000** of her savings into a new business bank account.
2. Bought a grooming table and dryers for **£2,400**, paid from the bank.
3. Took out a bank loan of **£5,000**, paid into the business account.
4. Bought shampoo and grooming supplies on credit from a wholesaler for **£600** (all used in the month).
5. Groomed dogs and received **£1,900** into the bank.
6. Transferred **£700** to her personal account to cover her rent at home.`,
    walkthrough: [
      {
        kind: "md",
        md: `Take each transaction, identify the two (or more) items it changes, and keep a running equation. Remember that income increases capital (through profit) and expenses reduce it.`,
      },
      {
        kind: "table",
        caption: "Running accounting equation for Pawfect Grooming",
        head: ["#", "Bank", "Equipment", "= Capital", "+ Liabilities"],
        rows: [
          ["1 Capital introduced", "+8,000", "", "+8,000", ""],
          ["2 Equipment bought", "−2,400", "+2,400", "", ""],
          ["3 Loan received", "+5,000", "", "", "+5,000 (loan)"],
          ["4 Supplies on credit (expense)", "", "", "−600", "+600 (creditor)"],
          ["5 Grooming income", "+1,900", "", "+1,900", ""],
          ["6 Drawings", "−700", "", "−700", ""],
          ["**Totals**", "**11,800**", "**2,400**", "**8,600**", "**5,600**"],
        ],
      },
      {
        kind: "md",
        md: `**Check:** Assets £11,800 + £2,400 = **£14,200**. Capital £8,600 + Liabilities £5,600 = **£14,200**. It balances.

**Answering Hannah:**
- **Profit** for the month = income £1,900 − supplies £600 = **£1,300**. The equipment isn't an expense in full this month; it's an asset that will be depreciated over its life (covered later).
- The £700 she took is **drawings**, not an expense, so it doesn't reduce profit.
- What the business is "worth" to her on the books is its **net assets**: £14,200 − £5,600 = **£8,600**, which equals opening capital £8,000 + profit £1,300 − drawings £700.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-elements",
      prompt: "Classify each item in the books of a sole trader electrician.",
      categories: ["Asset", "Liability", "Capital", "Income", "Expense"],
      items: [
        { text: "Van used to get to jobs", answer: 0 },
        { text: "Amount owed to the electrical wholesaler", answer: 1, why: "Money owed to a supplier is a trade payable (creditor)." },
        { text: "Fees charged for rewiring a house", answer: 3 },
        { text: "Money the owner paid in to start the business", answer: 2 },
        { text: "Public liability insurance for the year", answer: 4 },
        { text: "Invoice sent to a customer who hasn't paid yet", answer: 0, why: "The amount owed by the customer is a trade receivable (debtor), an asset." },
        { text: "VAT owed to HMRC for the last quarter", answer: 1 },
      ],
      explain:
        "Ask: does the business own it (asset), owe it to an outsider (liability), owe it to the owner (capital), earn it (income) or use it up (expense)? A customer's unpaid invoice is an asset because the business will receive cash for it; a supplier's unpaid invoice is a liability.",
    },
    {
      kind: "numeric",
      id: "find-capital",
      prompt:
        "At 31 March 2027 a business has total assets of **£85,000** and total liabilities of **£27,500**. What is the owner's capital?",
      answer: 57500,
      unit: "£",
      explain: "Capital is what's left for the owner after paying all outside liabilities: assets minus liabilities, also called net assets.",
      working: "Capital = Assets − Liabilities = £85,000 − £27,500 = **£57,500**.",
    },
    {
      kind: "numeric",
      id: "find-profit-expanded",
      prompt:
        "A sole trader's capital at the start of the year was **£40,000**. At the year end the business has assets of **£61,500** and liabilities of **£17,500**. During the year the owner took drawings of **£18,000** and introduced no new capital. What was the profit for the year?",
      answer: 22000,
      unit: "£",
      explain:
        "Use the expanded equation. Closing capital = opening capital + profit − drawings. Find closing capital from the balance sheet first, then solve for profit. A common mistake is to forget to add back drawings: the owner took £18,000 out, so the business must have earned more than the £4,000 increase in capital.",
      working: `Closing capital = £61,500 − £17,500 = £44,000

£44,000 = £40,000 + Profit − £18,000

Profit = £44,000 − £40,000 + £18,000 = **£22,000**`,
    },
    {
      kind: "mcq",
      id: "owner-phone-bill",
      prompt:
        "A sole trader pays her **personal** mobile phone bill of £45 from the business bank account. What's the effect on the accounting equation?",
      options: [
        "Assets fall £45 and liabilities fall £45",
        "Assets fall £45 and capital falls £45 through an expense",
        "Assets fall £45 and capital falls £45 through drawings",
        "No effect, because it's a personal cost",
      ],
      answer: 2,
      explain:
        "Business cash has gone (assets down), and because the cost is personal it's drawings, which reduce capital directly. It is not an expense of the business, so profit is unaffected. Ignoring it altogether would leave the bank account wrong.",
    },
    {
      kind: "multi",
      id: "assets-and-liabilities-up",
      prompt: "Which of these transactions **increase both assets and liabilities**? Select all that apply.",
      options: [
        "Buying stock on credit from a supplier",
        "Receiving a bank loan into the business account",
        "Paying a supplier from the bank",
        "Selling goods for cash",
        "Buying a machine on hire purchase (finance agreement)",
      ],
      answers: [0, 1, 4],
      explain:
        "Buying on credit, borrowing, and buying on finance all bring in an asset funded by an outsider. Paying a supplier reduces both assets and liabilities. A cash sale increases assets and capital (through profit), not liabilities.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-entity",
      prompt: "Which concept means a sole trader's private holiday paid from the business account is treated as drawings?",
      options: ["Going concern", "Business entity", "Prudence", "Materiality"],
      answer: 1,
      explain: "The business entity concept treats the business as separate from its owner, so private spending is a withdrawal of capital, not a business cost.",
    },
    {
      kind: "mcq",
      id: "q-equation",
      prompt: "Which of these is the accounting equation?",
      options: [
        "Assets + Liabilities = Capital",
        "Assets − Capital = Income",
        "Income − Expenses = Assets",
        "Assets = Capital + Liabilities",
      ],
      answer: 3,
      explain: "Everything the business has (assets) was funded either by the owner (capital) or by outsiders (liabilities).",
    },
    {
      kind: "mcq",
      id: "q-balance-sheet",
      prompt: "What does a balance sheet show?",
      options: [
        "Income and expenses for a period",
        "Assets, liabilities and capital at a single date",
        "Cash received and paid during the year",
        "The tax payable for the year",
      ],
      answer: 1,
      explain: "The balance sheet is a snapshot at the period end. The income statement covers the period.",
    },
    {
      kind: "mcq",
      id: "q-private-company-records",
      prompt: "Under the Companies Act 2006, how long must a **private** company preserve its accounting records?",
      options: ["3 years from when they are made", "6 years from the end of the financial year", "5 years after the filing deadline", "10 years"],
      answer: 0,
      explain:
        "Section 388 sets 3 years for a private company and 6 years for a public company. HMRC separately expects corporation tax records to be kept for 6 years from the end of the accounting period, so in practice keep them for 6.",
    },
    {
      kind: "mcq",
      id: "q-sole-trader-records",
      prompt: "A sole trader files a 2025/26 tax return. Until when must the records for that year be kept, at minimum?",
      options: ["31 January 2028", "5 April 2031", "31 January 2032", "31 January 2033"],
      answer: 2,
      explain: "The 2025/26 return is due by 31 January 2027. Records must be kept for at least 5 years after that deadline: 31 January 2032.",
    },
    {
      kind: "mcq",
      id: "q-profit-capital",
      prompt: "A business makes a profit. What happens to the owner's capital?",
      options: ["It falls", "It's unaffected until the owner takes drawings", "It rises by the amount of the profit", "It rises only when the profit is received in cash"],
      answer: 2,
      explain: "Profit belongs to the owner, so it increases capital whether or not it has been received in cash.",
    },
  ],
  sources: [
    { label: "GOV.UK – How long to keep your records (self-employed)", url: "https://www.gov.uk/self-employed-records/how-long-to-keep-your-records" },
    { label: "GOV.UK – What records to keep (self-employed)", url: "https://www.gov.uk/self-employed-records/what-records-to-keep" },
    { label: "Companies Act 2006 s388 – how long accounting records must be kept", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/388" },
    { label: "GOV.UK – Company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
    { label: "HMRC Compliance Handbook CH14600 – how long records must be kept: corporation tax", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch14600" },
    { label: "FRC – FRS 102 The Financial Reporting Standard applicable in the UK and Republic of Ireland", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
  ],
};
