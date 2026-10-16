import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "directors-loan-account-coding",
  title: "Director's loan account: coding it right",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "How director's personal spending, expense claims, dividends and money paid in or out should hit the director's loan account, and how to recognise an overdrawn account that needs flagging to your manager for s455, benefit-in-kind and bed-and-breakfasting issues.",
  objectives: [
    "Post a director's personal spending, expense claims and cash introduced to the director's loan account instead of the profit and loss account",
    "Work out a closing director's loan account balance from a year's movements and say whether it's overdrawn",
    "Calculate the s455 charge on an overdrawn balance left unpaid 9 months after the year end",
    "Recognise when an overdrawn account raises benefit-in-kind or bed-and-breakfasting issues that need to go to your manager",
  ],
  body: [
    {
      kind: "md",
      md: `In a small owner-managed company the director's money and the company's money get mixed up all the time. The director pays for the family's shopping on the company debit card, puts a supplier invoice on their own credit card, or takes a round-sum transfer "for wages". The **director's loan account** (DLA) is the balance sheet account that tracks what the director and the company owe each other.

Think of it as a running account between two separate people, because legally that's what it is. The company is a separate legal person, so money that goes to the director has to be *something*: salary through payroll, a dividend, a repayment of money they lent the company, or a loan to them. If it's none of the first three, it's a loan, and it goes to the DLA.

**Sign convention:**
- A **credit balance** means the company owes the director. This is normal and harmless, e.g. the director lent the company money to get started.
- A **debit balance** means the director owes the company. The account is **overdrawn**. This is where the tax consequences start.`,
    },
    {
      kind: "table",
      caption: "Where the common director transactions go",
      head: ["What happened", "Debit", "Credit"],
      rows: [
        ["Director's personal spending paid from the company bank or card", "Director's loan account", "Bank – current account"],
        ["Round-sum transfer to the director that isn't salary or a declared dividend", "Director's loan account", "Bank – current account"],
        ["Director pays a company bill personally (valid invoice in the company's name)", "Expense account (and VAT control for the VAT)", "Director's loan account"],
        ["Director's approved expense claim, not yet reimbursed", "Expense account (and VAT control where there's a valid VAT invoice)", "Director's loan account"],
        ["Director pays money into the company account", "Bank – current account", "Director's loan account"],
        ["Dividend properly declared and credited to the director instead of paid in cash", "Dividends", "Director's loan account"],
        ["Director's salary run through payroll and paid", "Net wages payable (when paid)", "Bank – current account"],
      ],
    },
    {
      kind: "journal",
      title: "The director's family holiday paid on the company debit card",
      narrative:
        "£2,640 to a travel agent, nothing to do with the business. It is not an expense of the company and the VAT (if any is shown) is not the company's input tax.",
      lines: [
        { account: "Director's loan account", dr: 2640 },
        { account: "Bank – current account", cr: 2640 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't code personal spending to expenses, and don't claim the VAT",
      md: `Two mistakes come up again and again:

1. **Coding a personal item to an expense account** "because the director said so" or because a bank rule matched the supplier. The profit is understated, corporation tax is underpaid, and if it was a benefit to the director it should have been dealt with through payroll or a P11D. Put it to the DLA and raise it as a query if you're unsure.
2. **Claiming VAT on personal purchases.** Input tax is only recoverable on supplies made to the business and used for the business. A director's personal purchase fails both tests, so post the **gross** amount to the DLA with no VAT. (If you've already set up a bank rule with a standard-rated tax code for that supplier, fix the rule as well as the transaction.)`,
    },
    {
      kind: "md",
      md: `### Money coming the other way: the director paying company costs

When a director pays a **genuine company cost** personally, the company owes them that money, so the DLA is **credited**. The other side is the normal expense code, exactly as if the company had paid it.

- If the invoice is a **valid VAT invoice addressed to the company**, the VAT goes to VAT control as usual.
- If it's a till receipt in the director's name for a small item, VAT can still usually be claimed on a simplified invoice, provided it's a genuine business purchase.
- Monthly **expense claims** (mileage, subsistence, small purchases) work the same way: Dr the expense codes, Cr DLA, and the DLA is debited when the company reimburses the director. Mileage paid at HMRC's approved rates carries no VAT except the fuel element, so most firms post mileage gross.

### Dividends and salary

A **dividend** is a distribution of profit to shareholders, not a business expense. Where the company declares a dividend and, rather than paying cash, credits it to the director's account, post **Dr Dividends, Cr Director's loan account**. Check there's a board minute and dividend voucher on file, and that the company has distributable reserves. If not, the "dividend" may be unlawful and the money simply remains a loan, so raise it with your manager.

A **salary** goes through payroll and the payroll journal (covered later in this module). The net pay is credited to *Net wages payable* and cleared when paid. Only if the net pay is left in the company and not paid out does it get credited to the DLA instead.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Review the DLA every month, not just at year end",
      md: `Run a transaction report on the DLA each month and send the director a short list: "these items were posted to your loan account, please confirm they're personal". It's much easier to get answers about a £85 Amazon purchase in the same month than eleven months later. Watch the **running balance**: if it goes overdrawn during the year, your manager needs to know (see below), even if dividends at the year end will clear it.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When the account is overdrawn: the three issues to flag",
      md: `You aren't expected to give tax advice on an overdrawn DLA, but you are expected to spot it and tell your manager. The main issues are:

- **s455 tax (CTA 2010 s455).** If a close company has lent money to a participator (e.g. a director-shareholder) and the loan is still outstanding **9 months after the end of the accounting period**, the company pays an extra charge on the amount outstanding at a rate that depends on when the loan was made: **35.75%** for loans made on or after **6 April 2026**, **33.75%** for loans made from 6 April 2022 to 5 April 2026, and 32.5% for loans made before 6 April 2022. It's due with the corporation tax, 9 months and 1 day after the year end. It's repayable by HMRC once the loan is repaid, released or written off, but not until 9 months after the end of the period in which that happens, so it costs the company cash for a long time.
- **Beneficial loan benefit-in-kind.** If the director's combined loans from the company exceed **£10,000 at any time in the tax year** and interest is charged at less than HMRC's official rate, there's a taxable benefit to report on the P11D, with Class 1A NIC for the company.
- **"Bed and breakfasting".** Paying the loan off just before the deadline and taking it straight back out doesn't work. Where repayments of **£5,000 or more** are followed within **30 days** by new borrowing of £5,000 or more, the repayment is matched against the new loan, not the old one. There are wider anti-avoidance rules for arrangements too.

Your job: make sure the DLA is correct, prepare a schedule of the movements and the peak balance, and flag it.`,
    },
    {
      kind: "table",
      caption: "Overdrawn DLA: what to put on your note to the manager",
      head: ["Point", "Why it matters"],
      rows: [
        ["Closing balance at year end, and whether it's overdrawn", "Starting point for any s455 calculation"],
        ["Highest balance owed during the tax year", "Above £10,000 at any time means a possible benefit-in-kind"],
        ["Repayments made after the year end, with dates and how they were made", "Repayments within 9 months reduce s455; dividends credited and bank transfers both count if genuine"],
        ["New drawings within 30 days of any repayment of £5,000 or more", "Possible bed-and-breakfasting"],
        ["Whether dividends credited to the DLA were properly declared", "An unlawful dividend leaves the loan outstanding"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Overdrawn DLA hidden in the wrong place",
      md: `Look out for director's drawings coded to *Wages*, *Sundry expenses* or *Suspense*, and for one DLA that has become two or three accounts ("Director's loan – Mark", "Drawings", "Mark personal"). Add them all together before you decide whether the director owes the company money. A DLA that looks in credit can be overdrawn once you include the "drawings" code.`,
    },
  ],
  scenario: {
    title: "Year-end review of Mark Hollins's loan account at Hollins Joinery Ltd",
    narrative: `Hollins Joinery Ltd is a close company with one director and shareholder, Mark Hollins. Its year end is **31 March 2026**. You're preparing the year-end file and Mark asks: *"I took a bit out during the year but I've had dividends, so I'm sure the company still owes me money?"*

The DLA (after you've fixed the coding) shows:

| Date | Item | Amount |
|------|------|-------:|
| 1 Apr 2025 | Opening balance, company owes Mark | £2,400 |
| Monthly | Transfers to Mark "for living costs", 12 × £1,500 | £18,000 |
| Jul 2025 | Family holiday paid on the company card (was coded to Travel) | £3,850 |
| Aug 2025 | Mark paid the van insurance personally | £1,120 |
| Sept 2025 | Interim dividend declared (board minute on file) and credited to the DLA | £12,000 |
| Monthly | Expense claims for small materials bought on his own card (VAT £60 included) | £360 |

Mark's salary was paid through payroll from the company bank account, so it isn't in the DLA.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: fix the coding.** The holiday was posted to *Travel* with 20% VAT claimed. Reverse that and post the gross £3,850 to the DLA. That increases profit by the net amount previously expensed and reduces input tax, so the VAT return for that quarter needs an adjustment too (flag that to whoever does the VAT).

**Step 2: run the balance.** Credits are amounts the company owes Mark; debits are amounts Mark owes the company.`,
      },
      {
        kind: "table",
        caption: "Hollins Joinery Ltd: director's loan account to 31 March 2026",
        head: ["Item", "Debit (Mark owes)", "Credit (company owes)"],
        rows: [
          ["Opening balance", "", "£2,400.00"],
          ["Transfers to Mark", "£18,000.00", ""],
          ["Family holiday", "£3,850.00", ""],
          ["Van insurance paid by Mark", "", "£1,120.00"],
          ["Interim dividend credited", "", "£12,000.00"],
          ["Expense claims", "", "£360.00"],
          ["**Totals**", "**£21,850.00**", "**£15,880.00**"],
          ["**Closing balance: overdrawn**", "**£5,970.00**", ""],
        ],
      },
      {
        kind: "journal",
        title: "Correcting the holiday that was coded to Travel",
        narrative:
          "Originally posted as Travel £3,208.33 and VAT £641.67. The correcting journal moves the whole gross amount to the DLA.",
        lines: [
          { account: "Director's loan account", dr: 3850 },
          { account: "Travel", cr: 3208.33 },
          { account: "VAT control", cr: 641.67 },
        ],
      },
      {
        kind: "md",
        md: `**Step 3: flag it.** Mark is wrong: he owes the company **£5,970**. If he doesn't repay it (or the company doesn't vote further lawful dividends credited to his account) by **31 December 2026**, s455 tax of 33.75% × £5,970 = **£2,014.88** would be payable on 1 January 2027 with the corporation tax. (The drawings were all made before 6 April 2026, so the 33.75% rate applies. Anything Mark draws from 6 April 2026 onwards falls under the 35.75% rate.)

Your note to the manager also covers the **peak balance during the tax year**. Taking the transfers and expense claims month by month, the account peaked at about **£9,150** owed at the end of September, just before the dividend was credited. That's under £10,000, so the beneficial-loan exemption looks likely to apply for 2025/26, but only just. Show the month-by-month balances in your schedule so the manager can confirm this. And if the £1,500 transfers carry on after 31 March 2026, the balance will pass £10,000 within about three months of 2026/27, so flag that too. Leave the advice to the manager; your job is the accurate schedule.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "post-personal-gym",
      prompt:
        "A VAT-registered company pays its director's personal gym membership of **£600** (the receipt shows £100 VAT) from the company bank account. The gym is used only by the director, for leisure. Post the transaction.",
      accounts: ["Director's loan account", "Bank – current account", "Office costs", "VAT control", "Dividends", "Gross wages"],
      answer: [
        { account: "Director's loan account", dr: 600 },
        { account: "Bank – current account", cr: 600 },
      ],
      explain:
        "It's the director's personal cost, so it isn't a company expense and the VAT isn't the company's input tax. The full gross £600 goes to the DLA. Coding it to an expense would understate profit; claiming the £100 VAT would be an over-claim on the VAT return.",
    },
    {
      kind: "journal",
      id: "director-pays-company-cost",
      prompt:
        "A director pays the company's annual design software subscription of **£240** on her personal credit card. The invoice is a valid VAT invoice addressed to the company: £200 net plus £40 VAT. She hasn't been reimbursed yet. Post it (use *Office costs* for the software).",
      accounts: ["Office costs", "VAT control", "Director's loan account", "Bank – current account", "Trade creditors", "Dividends"],
      answer: [
        { account: "Office costs", dr: 200 },
        { account: "VAT control", dr: 40 },
        { account: "Director's loan account", cr: 240 },
      ],
      explain:
        "It's a genuine company cost with a valid VAT invoice in the company's name, so the expense and input tax are posted as normal. The company now owes the director £240, so the DLA is **credited**. Crediting the bank would be wrong: no money has left the company's account.",
    },
    {
      kind: "numeric",
      id: "dla-closing-balance",
      prompt: `Work out the closing balance on a director's loan account from these movements for the year:

- Opening balance: company owes the director £1,800
- Director's personal shopping paid on the company card: £2,650
- Director paid company stationery personally (claimed through expenses, not yet reimbursed): £420
- Dividend declared and credited to the DLA: £8,000
- Transfers from the company to the director (not salary): £9,600
- Director paid £500 into the company bank account

How much does the **director owe the company** at the year end? (Enter 0 if the company owes the director.)`,
      answer: 1530,
      unit: "£",
      explain:
        "Credits (company owes director) are the opening balance, the stationery, the dividend and the £500 paid in. Debits (director owes company) are the personal shopping and the transfers. Debits exceed credits, so the account is overdrawn.",
      working: `Credits: £1,800 + £420 + £8,000 + £500 = **£10,720**
Debits: £2,650 + £9,600 = **£12,250**
Overdrawn: £12,250 − £10,720 = **£1,530** owed by the director.`,
    },
    {
      kind: "numeric",
      id: "s455-amount",
      prompt:
        "A close company's year ends on **31 December 2025**. Its director-shareholder's loan account is overdrawn by **£24,000** at that date (all of it borrowed after 6 April 2022). On 15 July 2026 the director repays **£6,000** by bank transfer and draws nothing further. No other repayments are made. What s455 charge is payable with the corporation tax for the year to 31 December 2025?",
      answer: 6075,
      unit: "£",
      explain:
        "Repayments made within 9 months of the year end (here, by 30 September 2026) reduce the amount on which s455 is charged. The £6,000 was repaid in July and wasn't followed by new borrowing, so the bed-and-breakfasting rule doesn't bite. The loans were made before 6 April 2026, so s455 is charged at 33.75% on the £18,000 still outstanding.",
      working: `Outstanding 9 months after year end: £24,000 − £6,000 = £18,000
s455: £18,000 × 33.75% = **£6,075**`,
    },
    {
      kind: "classify",
      id: "dla-or-not",
      prompt: "For each transaction, decide the effect on the director's loan account.",
      categories: ["Debit the DLA", "Credit the DLA", "Not a DLA entry"],
      items: [
        { text: "The company pays the director's council tax bill", answer: 0, why: "A personal liability of the director paid by the company." },
        { text: "The director pays a timber merchant's invoice for the company on his own card", answer: 1, why: "The company now owes him that money." },
        { text: "An interim dividend is declared and credited to the director's account instead of being paid out", answer: 1, why: "Dr Dividends, Cr DLA." },
        { text: "The director's monthly salary is paid in full through payroll to his bank account", answer: 2, why: "This goes through the payroll journal and Net wages payable." },
        { text: "The director transfers £2,000 into the company account to cover a cash shortfall", answer: 1, why: "Money introduced by the director." },
        { text: "The company pays HMRC the director's personal self assessment bill", answer: 0, why: "His personal tax, not the company's." },
        { text: "Diesel for the company's van, paid on the company card", answer: 2, why: "A normal business expense." },
      ],
      explain:
        "Ask whose cost or whose money it is. Personal costs paid by the company are debits (the director owes more). Company costs paid by the director, and money he puts in or is credited with, are credits. Salary and normal business costs don't touch the DLA.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sign",
      prompt: "A director's loan account shows a **debit** balance of £3,200 on the trial balance. What does that mean?",
      options: [
        "The company owes the director £3,200",
        "The director owes the company £3,200",
        "The director has been paid £3,200 too little salary",
        "The company has overpaid dividends by £3,200",
      ],
      answer: 1,
      explain: "A debit balance is an asset of the company: the director owes it money, so the account is overdrawn.",
    },
    {
      kind: "mcq",
      id: "q-vat-personal",
      prompt: "The company card is used for a director's personal TV costing £1,200 including £200 VAT. How should it be posted?",
      options: [
        "Dr Office costs £1,000, Dr VAT control £200, Cr Bank £1,200",
        "Dr Director's loan account £1,000, Dr VAT control £200, Cr Bank £1,200",
        "Dr Director's loan account £1,200, Cr Bank £1,200",
        "Dr Dividends £1,200, Cr Bank £1,200",
      ],
      answer: 2,
      explain:
        "It's a personal purchase, so there's no input tax to claim and no expense. The gross amount is charged to the director's loan account. Calling it a dividend after the event isn't valid without a proper declaration.",
    },
    {
      kind: "mcq",
      id: "q-s455-rate",
      prompt: "At what rate is s455 tax charged on a loan to a participator made in **May 2026** that is still outstanding 9 months after the year end?",
      options: ["25%", "32.5%", "33.75%", "35.75%"],
      answer: 3,
      explain: "35.75% for loans made on or after 6 April 2026. Loans made from 6 April 2022 to 5 April 2026 are charged at 33.75%, and loans made before 6 April 2022 at 32.5%.",
    },
    {
      kind: "mcq",
      id: "q-bik-threshold",
      prompt: "A director's interest-free loan from the company peaks at £14,000 in November and is repaid to nil by March. What should you do?",
      options: [
        "Nothing, as it was nil at the end of the tax year",
        "Flag it: it exceeded £10,000 during the tax year, so a beneficial loan benefit-in-kind may arise",
        "Reclassify the loan as salary",
        "Charge s455 automatically",
      ],
      answer: 1,
      explain:
        "The exemption only applies if the combined loans stay below £10,000 throughout the whole tax year. A peak of £14,000 means a possible P11D benefit and Class 1A NIC, so your manager needs to know.",
    },
    {
      kind: "mcq",
      id: "q-bed-breakfast",
      prompt:
        "A director repays £20,000 to clear his overdrawn loan two days before the 9-month deadline, then draws £18,000 out again ten days later. Why is this a problem?",
      options: [
        "It isn't: the loan was nil on the deadline",
        "Repayments followed within 30 days by new borrowing (both £5,000 or more) are matched to the new loan, so s455 relief on the old loan is restricted",
        "Repayments must always be made by dividend",
        "The company must charge VAT on the loan",
      ],
      answer: 1,
      explain:
        "This is classic bed-and-breakfasting. The 30-day rule matches the repayment against the new £18,000 loan rather than the old balance, so most of the old loan is still treated as outstanding for s455.",
    },
    {
      kind: "mcq",
      id: "q-salary",
      prompt: "A director is paid £1,047.50 a month net through payroll, transferred to her bank on the last day of the month. What's the entry for the transfer?",
      options: [
        "Dr Director's loan account, Cr Bank – current account",
        "Dr Gross wages, Cr Bank – current account",
        "Dr Net wages payable, Cr Bank – current account",
        "Dr Dividends, Cr Bank – current account",
      ],
      answer: 2,
      explain:
        "The payroll journal has already put the cost through Gross wages and credited Net wages payable. Paying the salary clears that liability. It doesn't go near the DLA unless the net pay is left unpaid in the company.",
    },
  ],
  sources: [
    { label: "GOV.UK: Director's loans – if you owe your company money", url: "https://www.gov.uk/directors-loans/you-owe-your-company-money" },
    { label: "Corporation Tax Act 2010 s455 – charge to tax on loans to participators", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/455" },
    { label: "HMRC Company Taxation Manual CTM61505 – loans to participators: general", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505" },
    { label: "HMRC Company Taxation Manual CTM61600 – loan repayment relief", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61600" },
    { label: "HMRC Company Taxation Manual CTM61630 – the 30-day rule (bed and breakfasting)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61630" },
    { label: "GOV.UK: Expenses and benefits – loans provided to employees (what's exempt)", url: "https://www.gov.uk/expenses-and-benefits-loans-provided-to-employees/whats-exempt" },
  ],
};
