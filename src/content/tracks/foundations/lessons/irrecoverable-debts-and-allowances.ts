import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "irrecoverable-debts-and-allowances",
  title: "Irrecoverable debts and allowances for doubtful debts",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "When customers don't pay: writing off irrecoverable debts, setting up and adjusting a specific allowance for doubtful debts, recovering debts previously written off, and claiming VAT bad debt relief.",
  objectives: [
    "Write off an irrecoverable debt, with and without VAT bad debt relief",
    "Calculate and post the movement in an allowance for doubtful debts",
    "Apply the VAT bad debt relief conditions, including the 6-month rule",
    "Explain why HMRC only allows specific provisions for tax",
  ],
  body: [
    {
      kind: "md",
      md: `Trade receivables are an asset only to the extent they'll actually be paid. At every year end (and ideally every month) you review the aged debtors report and ask: **is each balance still collectable?**

There are two levels of problem:

- **Irrecoverable (bad) debt:** you're confident the money won't be received: the customer is in liquidation, bankrupt, has disappeared, or it isn't worth pursuing. It's **written off**: removed from receivables and charged to profit.
- **Doubtful debt:** there's real doubt, but it isn't certain yet: a dispute, a customer in administration, a long overdue account with broken promises. An **allowance** (provision) is set up against it, so the balance sheet shows receivables net of the expected loss, while the debt stays on the ledger and collection continues.`,
    },
    {
      kind: "journal",
      title: "Writing off a debt (no VAT relief yet)",
      narrative: "A non-VAT-registered client writes off a £960 debt from a customer who has emigrated.",
      lines: [
        { account: "Irrecoverable debts expense", dr: 960 },
        { account: "Trade receivables", cr: 960 },
      ],
    },
    {
      kind: "md",
      md: `### The allowance for doubtful debts

The allowance is a **credit balance** that sits against trade receivables. Only the **movement** in the allowance each year goes through profit:

- **Increase** in the allowance: Dr Irrecoverable debts expense, Cr Allowance for doubtful debts
- **Decrease**: Dr Allowance for doubtful debts, Cr Irrecoverable debts expense

On the balance sheet: Trade receivables less allowance = net receivables.

Base the allowance on a **review of individual debts**: which customers, how much, and why. Under FRS 102, trade receivables are assessed for impairment where there's objective evidence of it; a blanket percentage of all debtors isn't evidence-based.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax: specific, not general",
      md: `For income tax, a deduction for a debt is limited to a debt that is **bad**, a **doubtful debt to the extent estimated to be bad**, or a debt released under a statutory insolvency arrangement (ITTOIA 2005 s35). HMRC does **not** allow a general provision (such as 2% of all debtors) that ignores the circumstances of particular debtors (BIM42701). For companies, trade debts are dealt with under the loan relationship rules, and relief follows the impairment losses recognised under GAAP.`,
    },
    {
      kind: "md",
      md: `### VAT bad debt relief

If the client is VAT registered and accounted for the output VAT when the invoice was raised (the normal invoice basis), it has paid VAT to HMRC on money it never received. It can claim that VAT back as **bad debt relief** if **all** these conditions are met (VAT Notice 700/18):

1. The output VAT has been accounted for and paid.
2. The debt has been **written off in the VAT account** and transferred to a separate refunds-for-bad-debts account.
3. The value of the supply isn't more than the customary selling price.
4. At least **6 months** have passed since the **later** of the date payment was due and the date of the supply.
5. The claim is made within **4 years and 6 months** of that later date.
6. The debt hasn't been paid, sold or factored under a legal assignment.

The relief is claimed by including the VAT in **box 4** of the return for the period in which the conditions are first met.

Clients on the **cash accounting scheme** never paid the output VAT on an unpaid invoice, so there is no bad debt relief to claim.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Claiming VAT relief too early.** The 6 months run from the due date (if later than the supply), not the invoice date and not the date the customer went bust.
- **Claiming relief under cash accounting**, where no output VAT was ever paid.
- **Writing off the gross debt to expenses and also claiming the VAT**, so the VAT is relieved twice. If VAT relief is claimed, only the **net** goes to the expense.
- **Using a general percentage allowance** without checking individual debts, then deducting it for tax.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Debts recovered later",
      md: `If a customer pays a debt that was written off, credit the receipt back to the irrecoverable debts account (or a "bad debts recovered" income account): Dr Bank, Cr Irrecoverable debts expense. If VAT bad debt relief was claimed, the corresponding VAT must be repaid to HMRC as output tax.`,
    },
  ],
  scenario: {
    title: "Year-end debtor review for Pennine Print Ltd",
    narrative: `**Pennine Print Ltd** (VAT registered, invoice-basis accounting, quarterly VAT returns ending 31 December, 31 March, 30 June and 30 September) has a **30 September 2026** year end. You're reviewing the aged debtors with the finance manager, Ruth.

1. **Grove Events Ltd** owes **£3,000** (including **£500** VAT) for an invoice dated 10 January 2026, payment due 9 February 2026. Grove went into creditors' voluntary liquidation in June; the liquidator says unsecured creditors will receive nothing. The debt was written off in September 2026.
2. **Lune Café** disputes the quality of a **£1,200** print run and is refusing to pay. Ruth thinks it's unlikely to be recovered but wants to keep chasing.
3. Last year's allowance for doubtful debts was **£800**, against a customer who has since paid in full.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Grove Events: write off, with VAT bad debt relief.** The later of supply (10 January) and due date (9 February) is 9 February 2026. Six months later is 9 August 2026. The debt has been written off and the output VAT was paid, so the £500 can be claimed in box 4 of the return for the quarter to 30 September 2026. Only the net £2,500 is a cost.`,
      },
      {
        kind: "journal",
        title: "Grove Events write-off with VAT relief",
        lines: [
          { account: "Irrecoverable debts expense", dr: 2500 },
          { account: "VAT control", dr: 500 },
          { account: "Trade receivables", cr: 3000 },
        ],
      },
      {
        kind: "md",
        md: `**Lune Café: specific allowance.** The debt is doubtful, not yet irrecoverable, so it stays on the ledger with a specific allowance of £1,200 against it.

**The allowance movement.** The old £800 allowance is no longer needed (that customer paid). The required closing allowance is £1,200. Movement = £1,200 − £800 = **£400 increase**.`,
      },
      {
        kind: "journal",
        title: "Increase in the allowance",
        lines: [
          { account: "Irrecoverable debts expense", dr: 400 },
          { account: "Allowance for doubtful debts", cr: 400 },
        ],
      },
      {
        kind: "md",
        md: `**Total charge to profit:** £2,500 + £400 = **£2,900**. For corporation tax this is all impairment of specific debts, so it follows the accounts. Note on file that no VAT relief has been claimed on Lune Café: it isn't written off yet and the 6 months may not have passed.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "write-off-no-vat",
      prompt: "A sole trader who isn't VAT registered decides a **£1,450** debt from a customer who has disappeared is irrecoverable. Post the write-off.",
      accounts: ["Irrecoverable debts expense", "Trade receivables", "Allowance for doubtful debts", "VAT control", "Sales", "Bank"],
      answer: [
        { account: "Irrecoverable debts expense", dr: 1450 },
        { account: "Trade receivables", cr: 1450 },
      ],
      explain: "The debt is removed from receivables and charged to profit. The client isn't VAT registered so there's no VAT element. Don't debit Sales: the sale happened; it's the collection that failed.",
    },
    {
      kind: "numeric",
      id: "allowance-movement",
      prompt:
        "At last year end the allowance for doubtful debts was **£2,400**. After reviewing each overdue debt this year, the allowance needed is **£1,750**. By how much is profit **increased** by the allowance adjustment?",
      answer: 650,
      unit: "£",
      explain: "Only the movement goes through profit. A decrease in the allowance is a credit to the irrecoverable debts expense, increasing profit.",
      working: "£2,400 − £1,750 = **£650** decrease: Dr Allowance £650, Cr Irrecoverable debts expense £650.",
    },
    {
      kind: "numeric",
      id: "bad-debt-relief",
      prompt: `A VAT-registered client is preparing its return for the quarter ending **30 June 2026**. These debts have all been written off in its accounts and VAT account. How much VAT bad debt relief can it claim on this return?

| Customer | Gross | Supply date | Payment due | Note |
|---|---:|---|---|---|
| A | £1,200 | 15 Nov 2025 | 15 Dec 2025 | Invoice basis |
| B | £2,400 | 1 Jan 2026 | 31 Jan 2026 | Invoice basis |
| C | £600 | 2 Oct 2025 | 1 Nov 2025 | Invoice basis |
| D | £3,600 | 1 Sep 2025 | 1 Oct 2025 | Period when the client used cash accounting |

All supplies were standard-rated at 20%.`,
      answer: 300,
      unit: "£",
      explain:
        "Relief needs 6 months from the later of the supply date and due date, and output VAT to have been accounted for. B's 6 months end on 31 July 2026, after the quarter. D was never subject to output VAT under cash accounting, so there's nothing to relieve.",
      working: `A: 6 months from 15 Dec 2025 = 15 Jun 2026 ✓ → £1,200 ÷ 6 = £200

B: 6 months from 31 Jan 2026 = 31 Jul 2026 ✗ (claim next quarter)

C: 6 months from 1 Nov 2025 = 1 May 2026 ✓ → £600 ÷ 6 = £100

D: cash accounting, no output VAT paid ✗

Total = **£300**`,
    },
    {
      kind: "journal",
      id: "debt-recovered",
      prompt:
        "A customer whose **£500** debt was written off last year (no VAT involved) unexpectedly pays in full by bank transfer. Post the receipt.",
      accounts: ["Bank", "Irrecoverable debts expense", "Trade receivables", "Sales", "Allowance for doubtful debts", "Suspense"],
      answer: [
        { account: "Bank", dr: 500 },
        { account: "Irrecoverable debts expense", cr: 500 },
      ],
      explain:
        "The debt is no longer on the ledger, so there's nothing in Trade receivables to clear. The recovery reverses part of the expense previously charged. (Some firms reinstate the debt and then record the receipt against it, which nets to the same result.) It isn't a new sale.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-allowance-side",
      prompt: "The allowance for doubtful debts is shown in the balance sheet as:",
      options: ["A current liability", "A deduction from trade receivables", "An expense", "Part of capital"],
      answer: 1,
      explain: "It's a credit balance netted against trade receivables to show the amount expected to be collected.",
    },
    {
      kind: "mcq",
      id: "q-six-months",
      prompt: "Invoice dated 1 March, payment due 31 March. When is the earliest point VAT bad debt relief conditions can be met?",
      options: ["1 September", "30 September", "31 March", "1 March the following year"],
      answer: 1,
      explain: "Six months from the later of the supply date and the due date: 31 March + 6 months = 30 September.",
    },
    {
      kind: "mcq",
      id: "q-general-provision",
      prompt: "A client provides 3% of all trade receivables as a general bad debt provision. For tax:",
      options: ["It's fully deductible", "It's not deductible because it ignores the circumstances of particular debtors", "Half is deductible", "It's deductible only for companies"],
      answer: 1,
      explain: "HMRC only allows provisions based on specific debts (BIM42701). A blanket percentage is added back.",
    },
    {
      kind: "mcq",
      id: "q-cash-accounting",
      prompt: "A client on the VAT cash accounting scheme writes off an unpaid £1,200 invoice. How much bad debt relief can it claim?",
      options: ["£200", "£240", "£0", "£100"],
      answer: 2,
      explain: "Under cash accounting, output VAT is only paid when the customer pays. The VAT on this invoice was never paid, so there's nothing to reclaim.",
    },
    {
      kind: "mcq",
      id: "q-write-off-vs-allowance",
      prompt: "A customer is disputing an invoice, but you're still pursuing it. The right treatment at the year end is usually:",
      options: ["Write it off", "A specific allowance for doubtful debts", "Credit Sales", "Ignore it until the dispute is resolved"],
      answer: 1,
      explain: "It's doubtful, not certainly irrecoverable. The allowance reflects the likely loss while the debt stays on the ledger for collection.",
    },
  ],
  sources: [
    { label: "HMRC VAT Notice 700/18 – relief from VAT on bad debts", url: "https://www.gov.uk/guidance/relief-from-vat-on-bad-debts-notice-70018" },
    { label: "HMRC Business Income Manual BIM42701 – bad and doubtful debts: overview", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42701" },
    { label: "HMRC Business Income Manual BIM42705 – bad and doubtful debts: accountancy practice", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim42705" },
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
  ],
};
