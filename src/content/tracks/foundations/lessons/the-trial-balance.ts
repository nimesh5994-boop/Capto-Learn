import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "the-trial-balance",
  title: "The trial balance",
  level: "foundation",
  minutes: 30,
  summary:
    "Balancing off ledger accounts, extracting a trial balance, what it does and doesn't prove, and how to track down the difference when it doesn't balance.",
  objectives: [
    "Balance off a ledger account and carry the balance down",
    "Extract a trial balance and find a missing balance",
    "List the six types of error a balanced trial balance won't reveal",
    "Use quick tests (halving, dividing by 9) to locate a difference",
  ],
  body: [
    {
      kind: "md",
      md: `A **trial balance** (TB) is a list of every balance in the nominal ledger at a date, with debit balances in one column and credit balances in the other. Because every transaction was posted as equal debits and credits, the two columns should add up to the same total.

The TB is the bridge between the bookkeeping and the accounts. Every set of year-end accounts you'll ever prepare starts from one, and you'll spend a lot of your working life reviewing them. Cloud software produces a TB at the click of a button and it always balances, because the software won't post an unbalanced entry. That makes the next section, what a TB *doesn't* prove, even more important.`,
    },
    {
      kind: "md",
      md: `### Balancing off an account

1. Add up both sides of the account.
2. The difference is the **balance**. Write it on the smaller side as "balance carried down (c/d)" so both sides total the same.
3. Bring it down on the opposite side as "balance brought down (b/d)". That's the opening balance for the next period, and the figure that goes into the TB.

A debit balance b/d means more debits than credits (assets, expenses, drawings). A credit balance b/d means more credits (liabilities, income, capital).`,
    },
    {
      kind: "table",
      caption: "Bank account balanced off at 31 May",
      head: ["Debit", "£", "Credit", "£"],
      rows: [
        ["Balance b/d 1 May", "1,200", "Rent", "3,800"],
        ["Sales receipts", "4,350", "Supplier payment", "950"],
        ["Customer receipt", "2,100", "Wages", "1,640"],
        ["", "", "Balance c/d 31 May", "1,260"],
        ["**Total**", "**7,650**", "**Total**", "**7,650**"],
        ["Balance b/d 1 June", "1,260", "", ""],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What a balanced trial balance proves",
      md: `Only that **total debits equal total credits**. It does **not** prove the right accounts were used, the right amounts were posted, or that every transaction was recorded.`,
    },
    {
      kind: "table",
      caption: "Errors that do NOT stop the trial balance balancing",
      head: ["Error", "What happened", "Example"],
      rows: [
        ["Omission", "Transaction not recorded at all", "A supplier invoice left in a drawer"],
        ["Commission", "Right type of account, wrong account", "Sale to J Smyth posted to J Smith's account"],
        ["Principle", "Wrong type of account", "Van repair posted to Motor vehicles – cost (an asset)"],
        ["Original entry", "Wrong amount used on both sides", "£450 rent entered as £540 on both sides"],
        ["Complete reversal", "Debit and credit swapped", "Dr Bank, Cr Rent for a rent payment"],
        ["Compensating", "Two errors that cancel out", "Sales overcast by £100 and Wages overcast by £100"],
      ],
    },
    {
      kind: "md",
      md: `### Errors that DO cause a difference

- **Single-sided entry:** only the debit or only the credit was posted.
- **Unequal amounts:** e.g. Dr Insurance £1,520, Cr Bank £1,250.
- **Both entries on the same side:** e.g. Dr Telephone and Dr Bank.
- **Casting (adding) errors** in a ledger account or the TB itself.
- **A balance missed off the TB**, or listed in the wrong column.

When the TB doesn't balance, the difference is put to a **suspense account** temporarily while you investigate. You'll correct suspense balances properly in a later lesson.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Quick tests to find a difference",
      md: `1. **Is the difference equal to a balance?** Look for an account missed off.
2. **Halve it.** If a £310 item was put in the wrong column, the difference is £620.
3. **Divide by 9.** If the difference divides exactly by 9, look for a **transposition** (digits swapped: 780 written as 870 gives 90) or a misplaced decimal point (£250 typed as £25 gives £225).
4. **Compare with last month or last year** for any balance that looks out of line.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "A software TB that balances is not a reviewed TB",
      md: `In Xero or QuickBooks the TB *always* balances, so every error you find will be one of the six in the table above. Scan the TB for balances on the wrong side (a credit on an expense, a debit on Trade payables), negative bank balances that aren't an overdraft, and accounts that shouldn't have moved at all, such as *Suspense* or *Uncategorised expenses*.`,
    },
  ],
  scenario: {
    title: "Moorland Dog Grooming's trial balance won't balance",
    narrative: `Sasha Brennan runs **Moorland Dog Grooming** as a sole trader and keeps manual ledgers. She's extracted her year-end trial balance and can't get it to balance: debits total **£42,800** and credits **£42,710**. She asks you to find the problem before you start the accounts.

| Account | Dr £ | Cr £ |
|---|---:|---:|
| Capital | | 8,000 |
| Drawings | 6,500 | |
| Equipment | 4,200 | |
| Bank | 3,150 | |
| Trade receivables | 640 | |
| Trade payables | | 410 |
| Loan | | 2,500 |
| Sales | | 31,800 |
| Grooming supplies | 3,960 | |
| Rent | 7,200 | |
| Insurance | 870 | |
| Van expenses | 2,140 | |
| Wages | 9,600 | |
| Advertising | 1,540 | |
| Telephone | 720 | |
| Utilities | 2,280 | |
| **Total** | **42,800** | **42,710** |`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: measure the difference.** £42,800 − £42,710 = **£90**, debits too high.

**Step 2: is it a missing balance?** No account has a balance of £90.

**Step 3: halve it.** £45. No balance of £45 that might be in the wrong column.

**Step 4: divide by 9.** £90 ÷ 9 = 10, a whole number, so look for a transposition. A swap of two adjacent digits that differ by 1 in the tens and hundreds columns gives exactly £90. Insurance is listed as **£870**. The ledger account shows the balance is **£780**: Sasha swapped the digits copying it across.

**Step 5: correct the TB.** Insurance £780 brings debits down to **£42,710**, equal to credits.`,
      },
      {
        kind: "callout",
        tone: "example",
        title: "Now check what the TB can't tell you",
        md: `Before relying on it, scan for the six "invisible" errors. For example, ask Sasha whether any December supplier invoices haven't been entered yet (omission), and check that the £4,200 of equipment doesn't include repairs (principle). Balancing is the start of the review, not the end.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-tb-errors",
      prompt: "Would each error cause the trial balance to **not** balance?",
      categories: ["TB still balances", "TB won't balance"],
      items: [
        { text: "Rent of £450 entered as £540 as both the debit and the credit", answer: 0, why: "Error of original entry." },
        { text: "A supplier payment posted to Bank but not to Trade payables", answer: 1, why: "Single-sided entry." },
        { text: "Van repairs debited to Motor vehicles – cost", answer: 0, why: "Error of principle." },
        { text: "Insurance of £1,250 posted Dr Insurance £1,520, Cr Bank £1,250", answer: 1, why: "Unequal amounts." },
        { text: "A purchase invoice not entered at all", answer: 0, why: "Error of omission." },
        { text: "A rent payment posted Dr Bank, Cr Rent", answer: 0, why: "Complete reversal: still equal debits and credits." },
        { text: "Telephone of £310 posted Dr Telephone and Dr Bank", answer: 1, why: "Two debits, no credit: a difference of £620." },
      ],
      explain:
        "The TB only checks that debits equal credits. Any error that still posts equal debits and credits (omission, commission, principle, original entry, reversal, compensating) is invisible to it.",
    },
    {
      kind: "numeric",
      id: "missing-capital",
      prompt: `A sole trader's TB has these balances. Capital is the only one missing. What must the capital balance be?

| Account | £ |
|---|---:|
| Bank (in funds) | 2,400 |
| Equipment | 9,000 |
| Trade receivables | 1,850 |
| Trade payables | 1,320 |
| Sales | 46,700 |
| Purchases | 18,900 |
| Wages | 12,400 |
| Rent | 6,000 |
| Drawings | 14,000 |
| Loan | 5,000 |`,
      answer: 11530,
      unit: "£",
      explain: "Sort each balance into its column using DEAD CLIC, then capital is the figure that makes the credits equal the debits.",
      working: `Debits: 2,400 + 9,000 + 1,850 + 18,900 + 12,400 + 6,000 + 14,000 = £64,550

Credits (excluding capital): 1,320 + 46,700 + 5,000 = £53,020

Capital = £64,550 − £53,020 = **£11,530** credit`,
    },
    {
      kind: "numeric",
      id: "balance-off-bank",
      prompt: `Balance off this Bank account at 31 March. Opening balance b/d **£2,750** debit. Receipts: £3,900 and £1,480. Payments: £2,600, £410 and £1,975. What is the balance b/d on 1 April? (Enter a positive number for money in the bank.)`,
      answer: 3145,
      unit: "£",
      explain: "Total each side; the difference is the balance, carried down on the smaller side and brought down on the larger side.",
      working: `Debits: 2,750 + 3,900 + 1,480 = £8,130

Credits: 2,600 + 410 + 1,975 = £4,985

Balance b/d = £8,130 − £4,985 = **£3,145** debit`,
    },
    {
      kind: "mcq",
      id: "difference-270",
      prompt:
        "A TB has debits of £58,410 and credits of £58,140. Which error is the most likely cause?",
      options: [
        "A £270 sales invoice omitted completely",
        "Wages of £3,520 listed on the TB as £3,250",
        "A £135 credit balance listed in the debit column",
        "Rent of £270 posted to Rates",
      ],
      answer: 2,
      explain:
        "Debits exceed credits by £270. A £135 credit balance put in the debit column adds £135 to debits and takes £135 off credits: a £270 gap with debits too high. The halving test (£270 ÷ 2 = £135) points straight to it. Listing wages (a debit) at £3,250 instead of £3,520 is a transposition, but it would make debits £270 too **low**, the wrong direction. Omitting an invoice entirely, or posting rent to Rates, doesn't create a difference at all.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-tb-proves",
      prompt: "A trial balance balances. What does that prove?",
      options: ["The accounts are correct", "All transactions have been recorded", "Total debits equal total credits", "No errors of principle have been made"],
      answer: 2,
      explain: "That's all it proves. Omission, commission, principle, original entry, reversal and compensating errors all leave it balanced.",
    },
    {
      kind: "mcq",
      id: "q-principle",
      prompt: "Office redecoration costs debited to Buildings – cost are an example of which error?",
      options: ["Commission", "Principle", "Omission", "Original entry"],
      answer: 1,
      explain: "A revenue expense posted to an asset account is the wrong *type* of account: an error of principle.",
    },
    {
      kind: "mcq",
      id: "q-divide-9",
      prompt: "The TB difference is £540. Which quick test suggests a transposition error?",
      options: ["It is an even number", "It divides exactly by 9", "It is less than 1% of turnover", "It is a round number"],
      answer: 1,
      explain: "A transposition (digits swapped) always produces a difference divisible by 9. £540 ÷ 9 = 60, so look for swapped digits, e.g. 1,060 written as 1,600.",
    },
    {
      kind: "mcq",
      id: "q-balance-side",
      prompt: "An account has total debits of £8,400 and total credits of £9,100. What is the balance b/d?",
      options: ["£700 debit", "£700 credit", "£17,500 credit", "£9,100 credit"],
      answer: 1,
      explain: "Credits exceed debits by £700, so the balance c/d is written on the debit side and brought down as a £700 credit balance.",
    },
    {
      kind: "mcq",
      id: "q-compensating",
      prompt: "Sales are overcast by £200 and Rent is overcast by £200. Effect on the TB?",
      options: ["Debits £200 too high", "Credits £200 too high", "It still balances", "Difference of £400"],
      answer: 2,
      explain: "Sales (credit) and Rent (debit) are both overstated by £200, so the errors compensate and the TB balances, even though both accounts are wrong.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "GOV.UK – Business records if you're self-employed", url: "https://www.gov.uk/self-employed-records" },
    { label: "GOV.UK – Running a limited company: company and accounting records", url: "https://www.gov.uk/running-a-limited-company/company-and-accounting-records" },
  ],
};
