import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "provisions-contingencies-and-post-balance-sheet-events",
  title: "Provisions, contingencies and events after the balance sheet date",
  level: "practitioner",
  minutes: 40,
  summary:
    "When to recognise a provision, when to disclose a contingent liability or asset, how to measure a provision, and how to tell adjusting from non-adjusting events after the year end, under FRS 102 Sections 21 and 32 (with the FRS 105 equivalents).",
  objectives: [
    "Apply the three recognition criteria for a provision",
    "Measure a provision using a best estimate or expected value",
    "Decide whether a contingent liability or asset should be disclosed, recognised or ignored",
    "Classify events after the reporting date as adjusting or non-adjusting and deal with each",
  ],
  body: [
    {
      kind: "callout",
      tone: "rule",
      title: "Recognising a provision (FRS 102 Section 21)",
      md: `A provision is a liability of uncertain timing or amount. Recognise one only when **all three** are met:

1. the company has a **present obligation** (legal or constructive) as a result of a **past event**;
2. it is **probable** (more likely than not) that a **transfer of economic benefits** will be needed to settle it; and
3. the amount can be **estimated reliably**.

If any one fails, there's no provision, though there may be a disclosure.`,
    },
    {
      kind: "table",
      caption: "Provision, disclosure or nothing?",
      head: ["Situation", "Treatment"],
      rows: [
        ["Obligation probable, reliable estimate", "**Recognise a provision**"],
        ["Possible obligation (outflow possible but not probable)", "**Disclose** a contingent liability"],
        ["Outflow is remote", "Nothing"],
        ["Possible inflow (e.g. a claim against a supplier) that is probable", "**Disclose** a contingent asset"],
        ["Inflow virtually certain", "It's no longer contingent: **recognise** the asset"],
      ],
    },
    {
      kind: "md",
      md: `### Measuring a provision

- **Single obligation** (e.g. one legal claim): the **most likely outcome**, adjusted if other outcomes are mostly higher or lower.
- **Large population** (e.g. warranties on thousands of sales): **expected value**, weighting each outcome by its probability.
- Discount to present value where the effect of the time value of money is material.

### Things that aren't provisions

- **Future operating losses**: no obligation from a past event.
- **Repairs and maintenance** the company intends to do: no obligation; it could choose not to.
- **General 'contingency' or 'rainy day' provisions**: not allowed.
- **Restructuring** without a detailed formal plan and a valid expectation in those affected: no constructive obligation yet.

An **onerous contract** (where unavoidable costs exceed the benefits) does give rise to a provision for the unavoidable net loss.`,
    },
    {
      kind: "journal",
      title: "Provision for a legal claim",
      narrative: "A former employee's tribunal claim. The solicitors say the company will probably lose, with a likely award of £25,000.",
      lines: [
        { account: "Legal and professional – claims", dr: 25000 },
        { account: "Provisions for liabilities", cr: 25000 },
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Events after the end of the reporting period (FRS 102 Section 32)",
      md: `Events between the balance sheet date and the date the accounts are **authorised for issue**:

- **Adjusting events** give evidence of **conditions that existed at the balance sheet date**. Adjust the figures. Examples: a customer that owed money at the year end goes into liquidation; a court case is settled; stock is sold below cost after the year end; the discovery of fraud or errors.
- **Non-adjusting events** reflect conditions that **arose after** the year end. Don't adjust; disclose if material. Examples: a fire after the year end; a major acquisition; a fall in the value of investments after the year end; a new loan.

**Dividends** declared after the year end are **not** a liability at the year end (disclose them). And if events after the year end show the company **isn't a going concern**, the accounts must not be prepared on a going concern basis.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Review after-date events right up to signing",
      md: `The window runs to the date the directors approve the accounts, not the date you finished the draft. If there's a gap of several weeks, ask the client again just before signing: any big bad debts, claims, losses of customers, or loan problems? It's one of the questions in the management representation letter for a reason.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Tax treatment",
      md: `For corporation tax, specific provisions calculated in line with GAAP and with sufficient accuracy are generally deductible if the expense itself would be deductible. General provisions aren't. Keep the calculation and the solicitor's or engineer's assessment on file: HMRC may ask for it.`,
    },
  ],
  scenario: {
    title: "Year-end judgements at Pilgrim Electrical Contractors Ltd",
    narrative: `Pilgrim Electrical Contractors Ltd has a 30 June 2026 year end. The accounts will be approved on 20 October 2026. You've identified:

1. A customer is suing Pilgrim for £60,000 over a fire it says was caused by faulty wiring (installed in March 2026). The solicitor thinks Pilgrim's chance of losing is about 30%.
2. Pilgrim gives a 2-year warranty. From experience, of the £900,000 of work done in the year, defects cost about 1.5% of turnover to fix.
3. On 15 August 2026 a major customer, owing £38,000 at 30 June, went into administration. The administrator expects to pay nothing to unsecured creditors.
4. On 5 September 2026 Pilgrim's warehouse flooded, destroying £22,000 of stock bought in July and August.
5. The directors declared a £30,000 dividend on 1 October 2026.
6. The directors want a £20,000 "general provision for bad times ahead".`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Lawsuit**: 30% chance of losing means an outflow is possible, not probable. **No provision**; disclose a **contingent liability** (nature and an estimate of the financial effect).
2. **Warranty**: an obligation from past work, probable across a large population, reliably estimated. **Provision £13,500** (£900,000 × 1.5%).
3. **Customer administration**: gives evidence that the debt was irrecoverable at 30 June. **Adjusting**: write off £38,000.
4. **Flood**: the condition arose after the year end, and the stock was bought after it anyway. **Non-adjusting**: disclose if material. Consider whether it affects going concern.
5. **Dividend**: declared after the year end, so **not a liability** at 30 June. Disclose.
6. **General provision**: no present obligation. **Not allowed.**`,
      },
      {
        kind: "journal",
        title: "Adjustments for items 2 and 3",
        lines: [
          { account: "Warranty costs", dr: 13500 },
          { account: "Bad debts written off", dr: 38000 },
          { account: "Provisions for liabilities", cr: 13500 },
          { account: "Trade debtors", cr: 38000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "expected-value",
      prompt:
        "A company sold 2,000 appliances with a 1-year warranty. Experience shows 90% need no repair, 8% need a minor repair costing £50, and 2% need a major repair costing £400. What warranty provision should be recognised (no discounting)?",
      answer: 24000,
      unit: "£",
      explain: "For a large population, use expected value: weight each outcome by its probability.",
      working: "2,000 × [(8% × £50) + (2% × £400)] = 2,000 × (£4 + £8) = 2,000 × £12 = **£24,000**.",
    },
    {
      kind: "classify",
      id: "adjusting-events",
      prompt: "A company's year end is 31 March 2026; accounts approved 30 September 2026. Classify each event.",
      categories: ["Adjusting", "Non-adjusting"],
      items: [
        { text: "May 2026: stock held at 31 March is sold for less than its cost", answer: 0 },
        { text: "June 2026: the company buys a competitor", answer: 1 },
        { text: "April 2026: a court settles a claim that existed at 31 March for more than expected", answer: 0 },
        { text: "July 2026: a fire destroys the factory", answer: 1 },
        { text: "August 2026: a fraud by the bookkeeper during 2025/26 is discovered", answer: 0 },
        { text: "April 2026: the directors declare a final dividend", answer: 1 },
      ],
      explain: "Adjusting events give evidence of conditions at the year end; non-adjusting events reflect conditions arising after it.",
    },
    {
      kind: "mcq",
      id: "contingent-asset",
      prompt: "A company is suing a supplier and its solicitors say it will probably win about £40,000, but the case hasn't concluded. How is it treated?",
      options: ["Recognise an asset of £40,000", "Disclose a contingent asset", "Ignore it", "Recognise £20,000 (50%)"],
      answer: 1,
      explain: "A probable inflow is disclosed as a contingent asset; it's only recognised when virtually certain.",
    },
    {
      kind: "journal",
      id: "onerous-contract",
      prompt:
        "A company has a non-cancellable contract to buy materials it no longer needs. The unavoidable cost of meeting the contract exceeds the value it will get from the materials by £9,000. Post the provision.",
      accounts: ["Onerous contract costs", "Provisions for liabilities", "Accruals", "Trade creditors", "Stock (balance sheet)", "Retained earnings"],
      answer: [
        { account: "Onerous contract costs", dr: 9000 },
        { account: "Provisions for liabilities", cr: 9000 },
      ],
      explain: "An onerous contract creates a present obligation; provide for the unavoidable net loss.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-provision-criteria",
      prompt: "Which is NOT one of the criteria for recognising a provision?",
      options: ["A present obligation from a past event", "A probable outflow of economic benefits", "A reliable estimate", "Approval by the shareholders"],
      answer: 3,
      explain: "Shareholder approval isn't a criterion.",
    },
    {
      kind: "mcq",
      id: "q-future-losses",
      prompt: "Can a company provide for expected operating losses next year?",
      options: ["Yes, if probable", "No: there's no present obligation from a past event", "Only small companies", "Only under FRS 105"],
      answer: 1,
      explain: "Future operating losses don't meet the definition of a liability.",
    },
    {
      kind: "mcq",
      id: "q-remote",
      prompt: "A claim against the company is assessed as remote. What's required?",
      options: ["A provision", "Disclosure as a contingent liability", "Nothing", "A note in the directors' report"],
      answer: 2,
      explain: "Remote contingent liabilities needn't be disclosed.",
    },
    {
      kind: "mcq",
      id: "q-dividend-after",
      prompt: "A dividend is declared after the year end but before the accounts are approved. How is it treated?",
      options: ["Accrued as a liability at the year end", "Not a liability at the year end; disclosed", "Deducted from turnover", "Ignored completely"],
      answer: 1,
      explain: "Dividends declared after the reporting date aren't a liability at that date.",
    },
    {
      kind: "mcq",
      id: "q-period-end",
      prompt: "Up to what date must events after the reporting period be considered?",
      options: ["The year end", "The date the draft is finished", "The date the accounts are authorised for issue (approved)", "The filing deadline"],
      answer: 2,
      explain: "Events up to the date of authorisation are considered.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (Section 21 Provisions and contingencies; Section 32 Events after the end of the reporting period)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Business Income manual: provisions (BIM46500)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46500" },
    { label: "FRC: FRS 105", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-105/" },
    { label: "ICAEW: introduction to the law on dividends", url: "https://www.icaew.com/technical/trust-and-ethics/company-law/introduction-to-the-law-on-dividends" },
  ],
};
