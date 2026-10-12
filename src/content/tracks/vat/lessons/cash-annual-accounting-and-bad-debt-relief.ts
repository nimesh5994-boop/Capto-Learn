import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cash-annual-accounting-and-bad-debt-relief",
  title: "Cash accounting, annual accounting and bad debt relief",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "The two cash-flow schemes most small clients ask about. Cash accounting taxes sales when the customer pays, and annual accounting gives one return a year with interim payments. Then bad debt relief, which recovers output tax a standard-accounting client has already paid on a sale the customer never paid for.",
  objectives: [
    "Apply the entry and exit thresholds for the cash accounting and annual accounting schemes",
    "Calculate output and input tax under cash accounting from receipts and payments",
    "Work out annual accounting interim payments and the balancing payment",
    "Apply the bad debt relief conditions, calculate the claim and post it",
  ],
  body: [
    {
      kind: "md",
      md: `Under **standard accounting**, VAT follows the tax point. Output tax is due on an invoice once it has been issued, whether or not the customer has paid. For a small business with slow payers, that means paying HMRC money it hasn't yet collected. HMRC offers two schemes that help with cash flow and admin, and a relief for debts that are never paid:

- **Cash accounting** (Notice 731): VAT on sales is due when the customer pays, and VAT on purchases is reclaimed when the client pays the supplier.
- **Annual accounting** (VAT annual accounting guidance): one VAT return a year, with interim payments on account during the year.
- **Bad debt relief** (Notice 700/18): for standard-accounting clients, reclaims output tax already paid on sales that are never paid for.

A client can use cash accounting and annual accounting **together**.`,
    },
    {
      kind: "table",
      caption: "Scheme thresholds (VAT-exclusive taxable turnover)",
      head: ["Scheme", "Join if expected turnover in the next 12 months is", "Must leave if turnover exceeds"],
      rows: [
        ["Cash accounting", "£1.35 million or less", "£1.6 million (measured over the 12 months to the end of a VAT period)"],
        ["Annual accounting", "£1.35 million or less", "£1.6 million at the end of the annual accounting year (or likely to)"],
      ],
    },
    {
      kind: "md",
      md: `### Cash accounting

A business can start using cash accounting at the beginning of any VAT period. It doesn't need to apply to HMRC, but it must be up to date with returns and payments and must not have been convicted of, or penalised for, VAT offences in the past year.

**How payments are dated** (Notice 731 section 4):
- Cash: the date the money is received or paid.
- Card: the date of the sales voucher, not the date the card provider settles.
- Cheques: the later of the date received and the date on the cheque.
- BACS, standing orders and direct debits: the date the bank account is credited or debited.

**What cash accounting can't be used for:** lease purchase, hire purchase, conditional sale and credit sale agreements; imports; invoices issued before the goods or services are supplied; invoices not payable in full within 6 months; and certain domestic reverse charge supplies. A business on the **Flat Rate Scheme** has its own cash-based turnover option, so it can't use cash accounting at the same time.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Cash accounting cuts both ways",
      md: `Input tax is also delayed until the client pays its suppliers. It's a poor fit for a business that:
- is paid immediately anyway (a shop or café),
- normally reclaims more VAT than it pays (for example, it makes zero-rated sales), or
- takes long credit from its suppliers but is paid promptly by its customers.

Before recommending it, compare the debtor days with the creditor days.`,
    },
    {
      kind: "md",
      md: `**Leaving the scheme.** When turnover goes over £1.6 million, the client leaves at the end of the current VAT period. It must then account for VAT on all outstanding debtors and creditors, either on the return for the period it leaves or spread over the following 6 months. The 6-month option isn't available if HMRC withdrew the scheme, or if turnover went over £1.6 million and supplies in the previous 3 months exceeded £1.35 million.

### Annual accounting

The client submits **one return a year** and makes advance payments during the year. These are based on the previous year's liability, or an estimate for a new registration:

| Option | Payments | When due |
|---|---|---|
| Monthly | 9 payments, each 10% of the estimated liability | End of months 4 to 12 of the accounting year |
| Quarterly | 3 payments, each 25% of the estimated liability | End of months 4, 7 and 10 |
| Balancing payment and return | Actual liability less the interim payments | Within **2 months** of the year end |

Annual accounting suits a client with a steady, predictable VAT bill who wants to budget for regular payments and do fewer returns. It's a poor fit for a repayment client, who would get their money back only once a year.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "MTD records are still needed",
      md: `Annual accounting reduces the number of returns, not the bookkeeping. The client still has to keep digital records under Making Tax Digital throughout the year. Agree a quarterly bookkeeping routine with them anyway, so the annual return isn't a year-end scramble.`,
    },
    {
      kind: "md",
      md: `### Bad debt relief (standard accounting)

If a standard-accounting client has paid output tax on an invoice the customer never pays, it can reclaim that VAT through bad debt relief. **All** of these conditions must be met (Notice 700/18):

1. The output tax has been **accounted for and paid** to HMRC.
2. At least **6 months** have passed since the **later** of the date payment was due and the date of supply.
3. The debt has been **written off** in the VAT records and transferred to a separate "refunds for bad debts" account.
4. The debt hasn't been sold or factored under a valid legal assignment.
5. The claim is made within **4 years and 6 months** of that later date.

The VAT is claimed in **box 4** (as extra input tax), not by reducing box 1. If the customer later pays something, repay the VAT element of that receipt in box 1.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The customer has to repay too",
      md: `A VAT-registered **customer** that hasn't paid a supplier within 6 months of the later of the supply date and the payment due date must **repay the input tax** it claimed on that invoice, as a negative entry in box 4. This doesn't depend on whether the supplier claims bad debt relief.`,
    },
    {
      kind: "md",
      md: `**Part payments.** Unless the customer specifically paid a particular invoice in full, payments are allocated to the **oldest** debts first. Relief covers only the VAT in the part of the debt that is still unpaid, so for a standard-rated debt the claim is **1/6 of the unpaid VAT-inclusive balance**.

Cash accounting clients don't need bad debt relief: they never paid the output tax on an unpaid invoice in the first place.`,
    },
  ],
  scenario: {
    title: "Choosing schemes for Tidewell Joinery Ltd and clearing an old debt",
    narrative: `Tidewell Joinery Ltd makes bespoke kitchens for homeowners and small developers. Its turnover is about £420,000 a year, all standard-rated, and it uses standard accounting with quarterly returns. Customers usually pay 60 to 90 days after invoice, but Tidewell pays most suppliers at the trade counter. The director, Owen, asks two things:

1. *"We seem to pay VAT before we've been paid. Is there a better way?"*
2. *"A developer went quiet on an invoice of £9,600 including VAT, dated 15 January 2026 and due on 14 February 2026. They paid £2,400 in March and nothing since. Can we get the VAT back?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Question 1: cash accounting.**

- Turnover of £420,000 is well under the £1.35 million entry limit.
- Debtors pay slowly and suppliers are paid quickly, so cash accounting should help: output tax is deferred until each customer pays, and the delay in reclaiming input tax costs very little because Tidewell pays its suppliers straight away anyway.
- Tidewell can join from the start of its next VAT period. It must not then account again for invoices it has already declared under standard accounting.
- Annual accounting is optional. Owen likes quarterly visibility, so we leave it.`,
      },
      {
        kind: "md",
        md: `**Question 2: bad debt relief** (claimed under the existing standard accounting, because the output tax on the invoice has already been paid).

1. Output tax on the £9,600 invoice (£1,600) was declared on the March 2026 quarter's return and paid. ✔
2. The later of the supply date (15 January) and the due date (14 February) is **14 February 2026**. Six months later is **14 August 2026**, so the claim can go on the first return for a period ending after that date: the **quarter to 30 September 2026**. ✔
3. Write off the unpaid balance to a bad debt account. ✔
4. Unpaid balance: £9,600 − £2,400 = £7,200. VAT element: £7,200 × 1/6 = **£1,200**.`,
      },
      {
        kind: "journal",
        title: "Writing off the debt and claiming the relief",
        narrative: "The VAT element goes back to the VAT control account and the net amount is the bad debt expense.",
        lines: [
          { account: "Bad debts expense", dr: 6000 },
          { account: "VAT control (input tax)", dr: 1200 },
          { account: "Trade debtors", cr: 7200 },
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Keep the claim trail",
        md: `Keep a bad debt file: the invoice, the amount written off, the VAT claimed, the return it was claimed on and the original return the output tax went on. HMRC asks for this first on a compliance check, and the records must be kept for 4 years from the claim.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "cash-output-tax",
      prompt:
        "A client using cash accounting issues standard-rated invoices totalling £60,000 + £12,000 VAT in the quarter. During the same quarter it **receives** £48,000 (VAT-inclusive) from customers, including £6,000 for invoices issued in the previous quarter. What output tax goes in box 1 for the quarter?",
      answer: 8000,
      unit: "£",
      explain:
        "Under cash accounting, output tax follows the cash received in the period, whichever period the invoice was issued in. Invoices issued but unpaid at the quarter end are not taxed until they're paid.",
      working: "£48,000 × 1/6 = **£8,000**. The £72,000 of invoices issued is irrelevant to box 1 under the scheme.",
    },
    {
      kind: "numeric",
      id: "annual-balancing",
      prompt:
        "A client joins annual accounting with monthly interim payments. Its VAT liability for the previous year was £36,000. The actual liability for its first annual accounting year turns out to be £39,000. What balancing payment is due with the annual return?",
      answer: 6600,
      unit: "£",
      explain:
        "Monthly interim payments are 9 payments of 10% of the estimated liability, which is based on last year's figure. The balancing payment is the actual liability less the total of the interim payments, and it's due within 2 months of the year end.",
      working: "Interim payments: 9 × (10% × £36,000) = 9 × £3,600 = £32,400. Balancing payment: £39,000 − £32,400 = **£6,600**.",
    },
    {
      kind: "numeric",
      id: "bdr-amount",
      prompt:
        "A standard-accounting client invoiced a customer £4,800 including VAT. The customer paid £1,200 (not against any specific invoice; this is the only one outstanding) and then went into liquidation. More than 6 months have passed since the due date and the debt has been written off. How much bad debt relief can be claimed?",
      answer: 600,
      unit: "£",
      explain:
        "Relief is limited to the VAT in the unpaid part of the debt. The part payment reduces the debt, and the VAT fraction for standard-rated supplies is 1/6.",
      working: "Unpaid £4,800 − £1,200 = £3,600. VAT £3,600 × 1/6 = **£600**, claimed in box 4.",
    },
    {
      kind: "journal",
      id: "post-bdr",
      prompt: "Post the write-off and bad debt relief claim from the previous question (unpaid balance £3,600 including VAT).",
      accounts: ["Bad debts expense", "VAT control (input tax)", "VAT control (output tax)", "Trade debtors", "Sales", "Provision for doubtful debts"],
      answer: [
        { account: "Bad debts expense", dr: 3000 },
        { account: "VAT control (input tax)", dr: 600 },
        { account: "Trade debtors", cr: 3600 },
      ],
      explain:
        "HMRC's guidance is that bad debt relief is claimed in box 4, so the £600 is debited to the input side of the VAT control account rather than reversing sales or output tax. The net £3,000 is the real cost to the business. A general provision for doubtful debts does not count as a write-off for VAT.",
    },
    {
      kind: "classify",
      id: "scheme-fit",
      prompt: "For each client, which scheme suggestion fits best?",
      categories: ["Cash accounting would help", "Annual accounting would help", "Neither scheme helps"],
      items: [
        { text: "Graphic designer, turnover £180,000, invoices on 60-day terms, few purchases", answer: 0, why: "Slow debtors and little input tax: deferring output tax helps cash flow." },
        { text: "Children's clothing retailer, mostly zero-rated sales, in a repayment position every quarter", answer: 2, why: "Cash accounting delays reclaims and annual accounting means one repayment a year." },
        { text: "Steady maintenance contractor, paid by direct debit on day 1, wants to budget for fixed monthly VAT", answer: 1, why: "Customers pay immediately, so cash accounting adds nothing; regular interim payments suit budgeting." },
        { text: "Wholesaler with turnover of £2.1 million and slow-paying customers", answer: 2, why: "Over the £1.35 million entry limit for both schemes." },
      ],
      explain:
        "Cash accounting helps when customers pay later than the business pays its suppliers. Annual accounting helps with predictability and admin, but not with repayments. Both are closed to businesses with turnover over £1.35 million.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-cash-entry",
      prompt: "What is the maximum expected taxable turnover for a business to **join** the cash accounting scheme?",
      options: ["£90,000", "£150,000", "£1.35 million", "£1.6 million"],
      answer: 2,
      explain: "The joining limit is £1.35 million. £1.6 million is the level at which the business must leave.",
    },
    {
      kind: "mcq",
      id: "q-cash-card",
      prompt: "Under cash accounting, when is a customer's card payment treated as received?",
      options: ["When the card provider pays the money into the bank", "On the date of the sales voucher", "At the end of the month", "When the invoice was issued"],
      answer: 1,
      explain: "Notice 731 dates card payments by the sales voucher, not the settlement by the card provider.",
    },
    {
      kind: "mcq",
      id: "q-aas-quarterly",
      prompt: "A client on annual accounting chooses quarterly interim payments. How much is each payment?",
      options: ["10% of the estimated liability", "25% of the estimated liability", "33% of the estimated liability", "Whatever the client chooses"],
      answer: 1,
      explain: "Quarterly interim payments are three payments of 25%, due at the end of months 4, 7 and 10. The balance follows with the return.",
    },
    {
      kind: "mcq",
      id: "q-bdr-six-months",
      prompt: "An invoice was issued on 10 March 2026 with payment due on 9 April 2026. From what date is the debt old enough for bad debt relief?",
      options: ["10 September 2026", "9 October 2026", "9 April 2026", "31 December 2026"],
      answer: 1,
      explain: "The 6 months run from the later of the supply date and the payment due date, here 9 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-bdr-box",
      prompt: "Where does a bad debt relief claim go on the VAT return?",
      options: ["As a reduction in box 1", "In box 4", "In box 6", "It's claimed on a separate form VAT652"],
      answer: 1,
      explain: "Bad debt relief is claimed as input tax in box 4. If the customer later pays, the VAT on that receipt goes back in box 1.",
    },
    {
      kind: "mcq",
      id: "q-customer-repay",
      prompt: "A VAT-registered customer hasn't paid a supplier's invoice 7 months after the payment due date. What must the customer do?",
      options: ["Nothing until the supplier claims bad debt relief", "Repay the input tax it claimed on the invoice", "Charge output tax to the supplier", "Deregister"],
      answer: 1,
      explain: "A customer must repay input tax on supplies it hasn't paid for within 6 months of the relevant date, whether or not the supplier claims relief.",
    },
  ],
  sources: [
    { label: "Cash Accounting Scheme (VAT Notice 731)", url: "https://www.gov.uk/guidance/vat-cash-accounting-scheme-notice-731" },
    { label: "VAT Cash Accounting Scheme (GOV.UK overview)", url: "https://www.gov.uk/vat-cash-accounting-scheme" },
    { label: "VAT Annual Accounting Scheme", url: "https://www.gov.uk/vat-annual-accounting-scheme" },
    { label: "Annual accounting: return and payment deadlines", url: "https://www.gov.uk/vat-annual-accounting-scheme/return-and-payment-deadlines" },
    { label: "Relief from VAT on bad debts (VAT Notice 700/18)", url: "https://www.gov.uk/guidance/relief-from-vat-on-bad-debts-notice-70018" },
  ],
};
