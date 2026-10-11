import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "suspense-accounts-and-correcting-errors",
  title: "Suspense accounts and correcting errors",
  level: "practitioner",
  minutes: 40,
  summary:
    "Opening a suspense account for a trial balance difference, writing correcting journals for every type of error, clearing suspense to nil, and recalculating profit after the corrections.",
  objectives: [
    "Open a suspense account for a TB difference and on the correct side",
    "Write a correcting journal for each type of error, deciding whether it involves suspense",
    "Clear a suspense account to nil",
    "Calculate the effect of corrections on draft profit",
  ],
  body: [
    {
      kind: "md",
      md: `When a trial balance doesn't balance and you can't find the problem immediately, the difference is posted to a **suspense account** so that draft accounts can be prepared. It's a holding account, not a home. Before the accounts are finalised, every pound in suspense must be explained and the account cleared to **nil**.

In cloud software you'll see the same idea under other names: *Suspense*, *Uncategorised income/expense*, *Ask my accountant*, or an opening balance adjustment account. Clients and bank rules park things there. Treat any balance in these accounts as a list of questions to answer.`,
    },
    {
      kind: "md",
      md: `### Which side?

The suspense account takes whatever balance makes the TB agree. If **debits exceed credits** by £1,190, suspense is a **credit** of £1,190. If credits exceed debits, suspense is a debit.

### The correcting journal method

For each error:

1. Write down the entry that **was** made.
2. Write down the entry that **should have been** made.
3. The correction is whatever turns (1) into (2).
4. If the original error caused the TB to be out of balance, the correction will need **suspense** to balance. If it didn't, the correction won't touch suspense.`,
    },
    {
      kind: "table",
      caption: "Does the correction go through suspense?",
      head: ["Original error", "TB affected?", "Suspense in correction?"],
      rows: [
        ["Omission, commission, principle, original entry, complete reversal, compensating", "No", "No"],
        ["Single-sided entry", "Yes", "Yes"],
        ["Different amounts on debit and credit", "Yes", "Yes"],
        ["Both entries on the same side", "Yes", "Yes"],
        ["Casting error in one account or a day-book total posted to one side only", "Yes", "Yes"],
        ["Balance missed off or listed in the wrong column of the TB", "Yes", "Usually just correct the TB itself; no journal needed"],
      ],
    },
    {
      kind: "callout",
      tone: "example",
      title: "Worked example: unequal amounts",
      md: `Rent paid of £1,200 was posted Dr Rent **£1,020**, Cr Bank £1,200.

- Was: Dr Rent 1,020 / Cr Bank 1,200
- Should be: Dr Rent 1,200 / Cr Bank 1,200
- Correction: **Dr Rent £180, Cr Suspense £180**`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Worked example: complete reversal (no suspense)",
      md: `Insurance of £600 paid by bank was posted Dr Bank £600, Cr Insurance £600.

- Was: Dr Bank 600 / Cr Insurance 600
- Should be: Dr Insurance 600 / Cr Bank 600
- Correction: **Dr Insurance £1,200, Cr Bank £1,200** (double the amount: once to cancel, once to post correctly).`,
    },
    {
      kind: "md",
      md: `### Effect on profit

After the corrections, re-work the profit. Only corrections that touch an **income or expense** account change profit:

- More expense or less income → profit down
- Less expense or more income → profit up
- Corrections between balance sheet accounts (e.g. suspense and receivables, or bank and payables) → no effect on profit

Present it as a short statement: draft profit, each adjustment with a reason, corrected profit.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Never write off suspense",
      md: `Clearing a residual suspense balance to sundry expenses "because it's small" hides errors that might be much bigger and offsetting. If you genuinely can't explain a small residual after thorough work, agree the treatment with your manager and record why.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Correcting errors from earlier years",
      md: `If an error belongs to a previous year whose accounts are already finalised, it isn't simply posted to this year's profit. Under FRS 102 section 10, material prior period errors are corrected retrospectively by restating comparatives. Smaller ones go through the current year. Raise it with your manager; it may also mean an amended tax return.`,
    },
  ],
  scenario: {
    title: "Clearing the suspense account for Wren Electrical",
    narrative: `**Cara Wren** is a sole-trader electrician who keeps manual books. Her trial balance at 31 March 2026 totalled **£85,450** debits and **£84,260** credits, so a suspense account was opened. Draft net profit is **£28,400**. You find four errors:

1. Rent paid of **£1,200** was debited to Rent as **£1,020**; Bank was correctly credited £1,200.
2. A receipt of **£750** from a customer was debited to Bank but not credited to Trade receivables.
3. A **£420** repair to the van was debited to Motor vehicles – cost.
4. A **£310** phone bill paid by bank was debited to both Telephone and Bank.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Opening suspense:** debits exceed credits by £85,450 − £84,260 = £1,190, so suspense is a **credit of £1,190**.`,
      },
      {
        kind: "table",
        caption: "Correcting journals",
        head: ["#", "Debit", "Credit", "£", "Suspense?"],
        rows: [
          ["1", "Rent", "Suspense", "180", "Yes: unequal amounts"],
          ["2", "Suspense", "Trade receivables", "750", "Yes: single-sided"],
          ["3", "Motor expenses", "Motor vehicles – cost", "420", "No: error of principle"],
          ["4", "Suspense", "Bank", "620", "Yes: both on the same side. Bank was debited £310 and should have been credited £310, so credit £620"],
        ],
      },
      {
        kind: "table",
        caption: "Suspense account",
        head: ["Debit", "£", "Credit", "£"],
        rows: [
          ["Trade receivables (2)", "750", "Balance b/d (TB difference)", "1,190"],
          ["Bank (4)", "620", "Rent (1)", "180"],
          ["**Total**", "**1,370**", "**Total**", "**1,370**"],
        ],
      },
      {
        kind: "md",
        md: `Suspense is cleared to **nil**.

**Corrected profit:**

| | £ |
|---|---:|
| Draft profit | 28,400 |
| (1) Rent understated | (180) |
| (3) Van repair is an expense, not an asset | (420) |
| **Corrected profit** | **27,800** |

Errors 2 and 4 only affect balance sheet accounts, so they don't change profit. If any depreciation had been charged on the £420 in motor vehicles, that would be reversed too, slightly increasing profit.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "unequal-purchase",
      prompt:
        "A £600 purchase invoice was correctly credited to Trade payables, but debited to Purchases as **£60**. A suspense account was opened for the TB difference. Post the correction.",
      accounts: ["Purchases", "Suspense", "Trade payables", "Bank", "Sales", "VAT control"],
      answer: [
        { account: "Purchases", dr: 540 },
        { account: "Suspense", cr: 540 },
      ],
      explain: "Purchases needs another £540 of debit to reach £600. The original error made credits exceed debits, so suspense was a £540 debit; crediting it clears it.",
    },
    {
      kind: "journal",
      id: "commission-correction",
      prompt: "Stationery of **£85** paid by bank was debited to Advertising. Post the correction.",
      accounts: ["Stationery", "Advertising", "Suspense", "Bank", "Sundry expenses", "Trade payables"],
      answer: [
        { account: "Stationery", dr: 85 },
        { account: "Advertising", cr: 85 },
      ],
      explain: "Equal debits and credits were posted, just to the wrong expense account, so the TB balanced and suspense isn't involved. Profit is unchanged; only the analysis of expenses changes.",
    },
    {
      kind: "numeric",
      id: "find-suspense",
      prompt: `A trial balance didn't balance, and the difference was put to suspense. These were the only errors:

1. The sales day book total of **£12,400** was posted to Sales as **£12,040** (receivables control was posted correctly).
2. Discounts allowed of **£150** were credited to receivables control but not debited anywhere.
3. A cash purchase of **£230** was credited to both Bank and Purchases.

What was the suspense balance? Enter a **positive** number for a debit balance and a **negative** number for a credit balance.`,
      answer: 250,
      tolerance: 0.5,
      unit: "£",
      explain: "Work out how each error distorted the debit and credit totals, then suspense is whatever balanced them.",
      working: `(1) Credits £360 too low

(2) Debits £150 too low

(3) Debits £230 too low (Purchases debit missing) and credits £230 too high (Purchases wrongly credited)

Debits are £150 + £230 = £380 too low. Credits are £360 too low but £230 too high, so £130 too low overall.

Recorded debits are therefore £380 − £130 = £250 lower than recorded credits, so suspense was a **£250 debit**.

Check with the corrections: (1) Dr Suspense £360, Cr Sales £360; (2) Dr Discounts allowed £150, Cr Suspense £150; (3) Dr Purchases £460, Cr Suspense £460. Net credit to suspense = £150 + £460 − £360 = £250, which clears the £250 debit.`,
    },
    {
      kind: "numeric",
      id: "corrected-profit",
      prompt: "Using the three errors in the previous exercise, a draft profit of **£41,600** was calculated before any corrections. What is the corrected profit?",
      answer: 41350,
      unit: "£",
      explain: "Sales were understated (profit up); discounts allowed were missing (an expense, profit down); purchases were credited instead of debited, so they're £460 too low (profit down).",
      working: "£41,600 + £360 − £150 − £460 = **£41,350**",
    },
    {
      kind: "classify",
      id: "classify-suspense-needed",
      prompt: "Does the correction of each error involve the suspense account?",
      categories: ["Involves suspense", "Doesn't involve suspense"],
      items: [
        { text: "A sale to K Patel posted to K Patil's account", answer: 1, why: "Error of commission." },
        { text: "Wages of £2,000 debited to Wages, nothing credited", answer: 0 },
        { text: "Purchase of a printer debited to Office expenses", answer: 1, why: "Error of principle." },
        { text: "Insurance of £540 posted Dr Insurance £450, Cr Bank £540", answer: 0 },
        { text: "A supplier invoice entered as £1,000 instead of £100 on both sides", answer: 1, why: "Error of original entry." },
      ],
      explain: "Only errors that made the TB out of balance need suspense to correct them.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-suspense-side",
      prompt: "A TB shows debits of £50,300 and credits of £49,900. The suspense account is opened with:",
      options: ["A debit of £400", "A credit of £400", "A debit of £800", "A credit of £800"],
      answer: 1,
      explain: "Credits are short by £400, so a £400 credit balance in suspense makes the TB agree.",
    },
    {
      kind: "mcq",
      id: "q-reversal-correction",
      prompt: "A £250 cash sale was posted Dr Sales, Cr Bank. The correcting journal is:",
      options: ["Dr Bank £250, Cr Sales £250", "Dr Bank £500, Cr Sales £500", "Dr Suspense £500, Cr Sales £500", "Dr Bank £250, Cr Suspense £250"],
      answer: 1,
      explain: "A complete reversal needs twice the amount: £250 to cancel the wrong entry and £250 to post the right one. The TB balanced, so no suspense.",
    },
    {
      kind: "mcq",
      id: "q-profit-effect",
      prompt: "Which correction does NOT change profit?",
      options: [
        "Dr Repairs, Cr Equipment – cost",
        "Dr Suspense, Cr Trade receivables",
        "Dr Rent, Cr Suspense",
        "Dr Sales, Cr Suspense",
      ],
      answer: 1,
      explain: "Suspense and trade receivables are both balance sheet accounts. Each of the others moves an income or expense account.",
    },
    {
      kind: "mcq",
      id: "q-write-off",
      prompt: "After all known corrections, £37 remains in suspense. What should you do?",
      options: [
        "Write it off to sundry expenses without comment",
        "Keep investigating, and if it truly can't be found, agree the treatment with your manager and document it",
        "Leave it in the balance sheet",
        "Add it to drawings",
      ],
      answer: 1,
      explain: "A small residual can hide larger offsetting errors. Investigate first; any write-off is a reviewed, documented decision.",
    },
    {
      kind: "mcq",
      id: "q-same-side",
      prompt: "A £90 payment was posted Dr Postage, Dr Bank. What is the correction?",
      options: ["Dr Suspense £180, Cr Bank £180", "Dr Bank £90, Cr Suspense £90", "Dr Suspense £90, Cr Postage £90", "Dr Postage £90, Cr Bank £90"],
      answer: 0,
      explain: "Bank was debited £90 instead of credited £90, so it needs a £180 credit. The TB had £180 too many debits, so suspense (a £180 credit) is debited to clear it.",
    },
  ],
  sources: [
    { label: "FRC – FRS 102 (section 10: accounting policies, estimates and errors)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income Manual BIM31045 – materiality", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31045" },
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
  ],
};
