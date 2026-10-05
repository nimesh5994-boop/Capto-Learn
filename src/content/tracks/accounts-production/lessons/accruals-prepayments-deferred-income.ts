import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "accruals-prepayments-deferred-income",
  title: "Accruals, prepayments and deferred income in practice",
  level: "foundation",
  minutes: 35,
  summary:
    "The adjustments that put income and costs into the right year: how to find them, how to calculate them, how to post them, and the mistakes that come up in review again and again.",
  objectives: [
    "Explain the accruals concept and why year-end adjustments are needed",
    "Identify accruals, prepayments, deferred income and accrued income from client records",
    "Calculate time-apportioned adjustments accurately",
    "Post and reverse year-end adjustment journals",
  ],
  body: [
    {
      kind: "md",
      md: `Bookkeeping records transactions when invoices are posted or money moves. Accounts must show income when it's **earned** and costs when they're **incurred**, whenever the cash moves. FRS 102 and FRS 105 both require the **accrual basis** (outside cash flow information). Most year-end adjustments exist to fix timing.`,
    },
    {
      kind: "table",
      caption: "The four timing adjustments",
      head: ["Adjustment", "What it means", "Balance sheet", "Effect on profit"],
      rows: [
        ["Accrual", "Cost incurred in the year but not yet invoiced or posted", "Liability (accruals)", "Reduces profit"],
        ["Prepayment", "Cost paid or invoiced in the year that relates to next year", "Asset (prepayments)", "Increases profit"],
        ["Deferred income", "Income invoiced or received in the year but not yet earned", "Liability (deferred income)", "Reduces profit"],
        ["Accrued income", "Income earned in the year but not yet invoiced", "Asset (accrued income)", "Increases profit"],
      ],
    },
    {
      kind: "md",
      md: `### Where to find them

Don't rely on the client to tell you. Work through these every year:

- **Purchase invoices dated after the year end:** anything that relates to goods or services received before the year end needs accruing. Check at least the first two months after the year end.
- **Utility, phone and rent bills that straddle the year end:** apportion them.
- **Annual payments** (insurance, software subscriptions, professional memberships, rates) paid during the year: work out how much is unexpired.
- **Last year's schedule:** the same items usually recur. If last year had an accountancy fee accrual, this year almost certainly needs one.
- **Payroll:** unpaid wages, overtime, holiday pay, and the PAYE and pension contributions due for the last month.
- **Sales:** customer deposits and advance billings (deferred income) and work done but not invoiced (accrued income).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How to calculate a time apportionment",
      md: `**Amount × months (or days) falling in the relevant period ÷ total months (or days) covered.** Use months for monthly or quarterly items unless the figures are large enough that days make a material difference, and use the same method throughout the file.`,
    },
    {
      kind: "journal",
      title: "Accrual: electricity used but not billed",
      narrative: "The quarterly bill to 31 July arrives in August. Two of its three months fall before the 30 June year end, so accrue two-thirds of the £1,860 net cost.",
      lines: [
        { account: "Light and heat", dr: 1240 },
        { account: "Accruals", cr: 1240 },
      ],
    },
    {
      kind: "journal",
      title: "Prepayment: insurance paid in advance",
      narrative: "£3,600 annual premium paid on 1 October for the year to 30 September. At a 30 June year end, 3 months are unexpired.",
      lines: [
        { account: "Prepayments", dr: 900 },
        { account: "Insurance", cr: 900 },
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "VAT on accruals",
      md: `For a VAT-registered client, accrue the **net** cost. The VAT is claimed when the invoice arrives, in the VAT return period the invoice falls in. If you accrue the gross amount, you'll overstate the expense and the creditor. For a client that isn't VAT registered, the VAT is a cost, so accrue the gross amount.`,
    },
    {
      kind: "md",
      md: `### Reversing in the next year

Most practices post year-end accruals and prepayments as **reversing journals** dated the first day of the next year. When the real invoice arrives and is posted to the expense, the reversal cancels the accrual out, so the cost lands in the correct year automatically. If the client's bookkeeper doesn't post your adjustments at all, next year's opening balances won't agree to your signed accounts. Always send the client your final journals and check the opening balances next year.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Materiality and judgement",
      md: `You don't need to apportion a £40 annual domain renewal. Agree a sensible threshold with your reviewer and document it. Be consistent, though: if you prepay insurance this year, prepay it next year too, or the cost for one year will be distorted.`,
    },
  ],
  scenario: {
    title: "Year-end adjustments for Kestrel Joinery Ltd",
    narrative: `Kestrel Joinery Ltd makes bespoke kitchens and has a **30 June 2026** year end. It's VAT registered (standard accounting). From the purchase day book, the bank and your conversation with the director, Tom Ashby, you find:

1. **Insurance:** £3,600 paid on 1 October 2025 covering 1 October 2025 to 30 September 2026. Posted in full to insurance.
2. **Electricity:** bill for 1 May to 31 July 2026, **£1,860 + VAT**, received on 8 August. Nothing posted for it.
3. **Maintenance contract income:** a hotel customer paid **£12,000** (net of VAT) on 1 May 2026 for six months of on-call maintenance from 1 May to 31 October 2026. Posted in full to sales.
4. **Accountancy fee:** last year's fee for this work was £2,750 and the engagement letter quotes the same for 2026. Nothing posted.
5. **Work done not invoiced:** a kitchen fitted on 26 to 29 June 2026 was invoiced on 3 July for **£5,400** net. Kestrel's terms entitle it to bill on completion.`,
    walkthrough: [
      {
        kind: "md",
        md: `Take each item in turn and ask: **which year does this belong to?**

1. **Insurance:** 3 of 12 months (July to September 2026) are next year's. Prepayment = £3,600 × 3/12 = **£900**.
2. **Electricity:** 2 of 3 months (May and June) fall in this year. Accrual = £1,860 × 2/3 = **£1,240** (net; Kestrel recovers the VAT).
3. **Maintenance contract:** only May and June have been earned. Earned = £12,000 × 2/6 = £4,000. Deferred income = **£8,000**.
4. **Accountancy:** the work relates to this year's accounts, so accrue **£2,750**.
5. **Fitted kitchen:** the work was complete and Kestrel had the right to bill by 30 June. Accrued income = **£5,400**.`,
      },
      {
        kind: "table",
        caption: "Effect on profit",
        head: ["Item", "Adjustment", "Effect on profit"],
        rows: [
          ["Insurance", "Prepayment £900", "+£900"],
          ["Electricity", "Accrual £1,240", "−£1,240"],
          ["Maintenance contract", "Deferred income £8,000", "−£8,000"],
          ["Accountancy", "Accrual £2,750", "−£2,750"],
          ["Fitted kitchen", "Accrued income £5,400", "+£5,400"],
          ["**Net effect**", "", "**−£5,690**"],
        ],
      },
      {
        kind: "journal",
        title: "Journal 4: defer the maintenance income",
        narrative: "The full £12,000 is in sales. Move the unearned £8,000 to a liability.",
        lines: [
          { account: "Sales", dr: 8000 },
          { account: "Deferred income", cr: 8000 },
        ],
      },
      {
        kind: "journal",
        title: "Journal 5: accrued income for the completed kitchen",
        narrative: "The invoice was raised on 3 July, so it isn't in this year's sales. Recognise it in the year the work was done.",
        lines: [
          { account: "Accrued income", dr: 5400 },
          { account: "Sales", cr: 5400 },
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Don't double count",
        md: `Before you accrue income, check the July invoice hasn't been back-dated into June in the bookkeeping. Before you accrue a cost, check the invoice hasn't already been posted to June. Agree each accrual to the post year-end invoice and note the reference.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "rent-prepayment",
      prompt:
        "A client pays rent of £18,000 a year quarterly in advance on 1 February, 1 May, 1 August and 1 November. Its year end is 31 March. The 1 February payment covered February, March and April. What is the **rent prepayment** at 31 March?",
      answer: 1500,
      unit: "£",
      explain: "Only April of the February payment relates to next year. Each quarter is £4,500, so one month is £1,500.",
      working: "Quarterly payment = £18,000 ÷ 4 = £4,500. April = £4,500 × 1/3 = **£1,500**",
    },
    {
      kind: "journal",
      id: "telephone-accrual",
      prompt:
        "A VAT-registered client's phone bill for December arrives in January: £640 + £128 VAT. The year end is 31 December and nothing has been posted. Post the year-end adjustment.",
      accounts: ["Telephone", "Accruals", "Prepayments", "VAT control (input tax)", "Trade creditors", "Bank"],
      answer: [
        { account: "Telephone", dr: 640 },
        { account: "Accruals", cr: 640 },
      ],
      explain:
        "Accrue the net cost. The input tax is claimed when the invoice is received, in the January VAT period, so it doesn't belong in the year-end accrual. Trade creditors is for invoices already posted to the purchase ledger.",
    },
    {
      kind: "numeric",
      id: "subscription-deferred",
      prompt:
        "A software company invoiced and received £2,400 (net) on 1 November 2025 for a 12-month subscription running from 1 November 2025. Its year end is 31 December 2025. How much is **deferred income** at the year end?",
      answer: 2000,
      unit: "£",
      explain: "Two months (November and December) are earned in the year. The remaining ten months are owed to the customer as a service, so they're a liability.",
      working: "£2,400 × 10/12 = **£2,000** deferred; £400 recognised as revenue",
    },
    {
      kind: "classify",
      id: "classify-adjustments",
      prompt: "A client with a 31 March 2026 year end gives you these items. Classify each one.",
      categories: ["Accrual", "Prepayment", "Deferred income", "Accrued income"],
      items: [
        { text: "Annual software licence paid on 1 January 2026 for the calendar year", answer: 1 },
        { text: "Plumber's invoice dated 10 April 2026 for work done in March", answer: 0 },
        { text: "Customer deposit received in March for a job starting in May", answer: 2 },
        { text: "Consultancy work completed in March, invoiced on 5 April", answer: 3 },
        { text: "March employer pension contributions paid on 19 April", answer: 0, why: "A cost of March, paid after the year end." },
        { text: "Business rates instalment paid in March covering April to June", answer: 1 },
      ],
      explain: "Ask two questions: is it income or a cost, and has the cash or invoice moved before or after the period it belongs to?",
    },
    {
      kind: "journal",
      id: "reverse-prepayment",
      prompt:
        "Last year you posted a £900 insurance prepayment. On the first day of the new year, post the reversing journal so the cost falls into the year it relates to.",
      accounts: ["Insurance", "Prepayments", "Accruals", "Bank", "Retained earnings", "Deferred income"],
      answer: [
        { account: "Insurance", dr: 900 },
        { account: "Prepayments", cr: 900 },
      ],
      explain: "The reversal is the mirror image of the year-end entry. It moves the £900 out of the balance sheet and into this year's insurance cost, which is the period the cover relates to.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-accrual-effect",
      prompt: "What is the effect of posting an accrual on profit and the balance sheet?",
      options: ["Increases profit, increases assets", "Reduces profit, increases liabilities", "Reduces profit, reduces assets", "No effect on profit"],
      answer: 1,
      explain: "Dr expense, Cr accruals: the expense reduces profit and the accrual is a liability.",
    },
    {
      kind: "mcq",
      id: "q-deferred-nature",
      prompt: "Deferred income is presented in the balance sheet as:",
      options: ["A current asset", "Part of reserves", "A liability", "A reduction in fixed assets"],
      answer: 2,
      explain: "The business owes the customer goods or services, or a refund, so it's a liability (described as a contract liability under the revised FRS 102 Section 23).",
    },
    {
      kind: "mcq",
      id: "q-vat-accrual",
      prompt: "A VAT-registered client receives a £1,000 + £200 VAT invoice after the year end for work done before it. What do you accrue?",
      options: ["£1,200", "£1,000", "£200", "Nothing: post it when the invoice arrives"],
      answer: 1,
      explain: "Accrue the net cost. Input tax is recovered in the period the invoice is received.",
    },
    {
      kind: "mcq",
      id: "q-where-find",
      prompt: "Which is the most reliable way to find unrecorded liabilities?",
      options: [
        "Ask the client if there are any",
        "Review purchase invoices and payments in the months after the year end",
        "Copy last year's accruals figure",
        "Check the sales ledger",
      ],
      answer: 1,
      explain: "Post year-end invoices and payments are hard evidence of costs that belonged to the year. Last year's schedule is a useful prompt but not evidence.",
    },
    {
      kind: "mcq",
      id: "q-not-reversed",
      prompt: "The client's bookkeeper never posted last year's year-end journals. What's the most likely symptom?",
      options: [
        "The bank won't reconcile",
        "Opening balances in this year's TB won't agree to last year's signed accounts",
        "VAT returns will be wrong",
        "Nothing: it doesn't matter",
      ],
      answer: 1,
      explain: "Always agree opening TB balances to the prior year's final accounts. If adjustments weren't posted, reserves and the adjusted balances won't match.",
    },
  ],
  sources: [
    { label: "FRS 102 The Financial Reporting Standard applicable in the UK and Republic of Ireland", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC BIM31020 – meaning of UK generally accepted accounting practice", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31020" },
    { label: "HMRC BIM42215 – timing of deductions: deferred revenue expenditure", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42215" },
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
  ],
};
