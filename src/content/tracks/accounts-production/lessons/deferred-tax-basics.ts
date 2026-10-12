import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "deferred-tax-basics",
  title: "Deferred tax basics for small company accounts",
  level: "advanced",
  minutes: 40,
  summary:
    "Why deferred tax exists, the FRS 102 Section 29 timing differences approach, calculating the provision for accelerated capital allowances, losses and revaluations, which rate to use, posting the movement, and why micro-entities using FRS 105 don't recognise it.",
  objectives: [
    "Distinguish timing differences from permanent differences",
    "Calculate a deferred tax liability or asset for capital allowances, losses and revaluations",
    "Choose the appropriate tax rate and post the year's deferred tax movement",
    "Explain the deferred tax charge to a client in plain English",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The tax charge in the accounts has two parts: **current tax** (the corporation tax payable for the year) and **deferred tax** (tax that will become payable, or recoverable, in future because of items that are recognised in the accounts and the tax computation in **different periods**).

The commonest example in small companies: a company buys a £100,000 machine and claims the **Annual Investment Allowance**, so it gets full tax relief in year 1, while the accounts depreciate the machine over five years. The company pays less tax now and more later. Deferred tax recognises that future tax in the accounts now.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "FRS 102 Section 29: timing differences plus",
      md: `Deferred tax is recognised on **timing differences**: differences between taxable profits and accounting profits that arise because items are included in tax assessments in periods different from the accounts. Common ones:
- **accelerated capital allowances** (tax relief ahead of depreciation) → usually a **liability**;
- **unrelieved tax losses** carried forward → an **asset**, but only to the extent it's probable they'll be recovered against future taxable profits;
- **revaluation gains** (e.g. investment property at fair value) → a **liability**;
- **pension or other accruals** deductible only when paid → usually an **asset**.

It's **not** recognised on **permanent differences** (items never taxable or deductible, e.g. client entertaining, fines).

Measure using tax rates and laws **enacted or substantively enacted** at the reporting date that are expected to apply when the difference reverses. Deferred tax is **not discounted**.`,
    },
    {
      kind: "table",
      caption: "Who recognises deferred tax?",
      head: ["Framework", "Deferred tax"],
      rows: [
        ["FRS 105 (micro-entities)", "**Not recognised**"],
        ["FRS 102 Section 1A (small)", "Recognised (same rules as full FRS 102)"],
        ["Full FRS 102", "Recognised, with full disclosure"],
      ],
    },
    {
      kind: "callout",
      tone: "example",
      title: "Worked example: accelerated capital allowances",
      md: `A company (main rate taxpayer) buys plant for £100,000 on the first day of the year and claims full AIA. It depreciates the plant at 20% straight line.

| | Accounts | Tax |
|---|---:|---:|
| Cost | 100,000 | 100,000 |
| Depreciation / AIA year 1 | (20,000) | (100,000) |
| Carrying amount / tax written-down value | **80,000** | **0** |

Timing difference: £80,000 − £0 = £80,000. Deferred tax liability at 25%: **£20,000**. This reverses over the next four years as depreciation is charged with no further allowances.`,
    },
    {
      kind: "journal",
      title: "Recognising the deferred tax liability in year 1",
      lines: [
        { account: "Tax on profit – deferred tax", dr: 20000 },
        { account: "Provision for deferred tax", cr: 20000 },
      ],
    },
    {
      kind: "md",
      md: `### Which rate?

Use the rate expected to apply when the difference reverses, based on enacted rates. With **19%** for profits up to £50,000, **25%** above £250,000 and marginal relief in between, a small company should consider its **expected future profit level**: a company that will stay well under £50,000 might use 19%; one with profits in the marginal band may need an effective rate (marginal relief makes the rate on profits in the band higher than 25%). Be consistent and document the choice.

### Each year

Calculate the **closing** deferred tax balance, compare it with the **opening** balance, and post the **movement** to the tax charge (or to other comprehensive income if the underlying item went there, e.g. a property revaluation in a revaluation reserve).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common deferred tax errors",
      md: `- Forgetting it entirely on a Section 1A set because last year's accounts were micro.
- Recognising a deferred tax **asset** for losses in a company with no realistic prospect of profits.
- Treating depreciation on assets that never qualify for allowances (e.g. most buildings) as a timing difference: it's permanent.
- Using the wrong rate, or not updating the rate when rates change.
- Posting the closing balance instead of the movement.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Explaining it to clients",
      md: `"Because you claimed tax relief on the new machinery straight away, you've paid less tax this year than your profit would suggest. That saving reverses over the next few years as the machinery is depreciated in the accounts but no more tax relief is due. The deferred tax figure is an estimate of that future tax, so your accounts show a more realistic tax charge."`,
    },
  ],
  scenario: {
    title: "Deferred tax for Coldharbour Engineering Ltd",
    narrative: `Coldharbour Engineering Ltd (FRS 102 Section 1A, year end 31 March 2026) expects profits well above £250,000 for the foreseeable future, so uses **25%**. At 31 March 2026:

- Plant and machinery: carrying amount **£214,000**; tax written-down value (pool) **£96,000**.
- A company car (cost £60,000): carrying amount £45,000; special rate pool value £41,000.
- Client entertaining disallowed in the year: £3,800.
- The opening deferred tax liability at 1 April 2025 was **£24,500**.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Plant timing difference**: £214,000 − £96,000 = £118,000.
2. **Car timing difference**: £45,000 − £41,000 = £4,000.
3. **Entertaining**: a **permanent** difference: ignore.
4. **Total timing differences**: £122,000. Closing liability at 25%: **£30,500**.
5. **Movement**: £30,500 − £24,500 = **£6,000** charge to the profit and loss account.`,
      },
      {
        kind: "journal",
        title: "Deferred tax movement for the year",
        lines: [
          { account: "Tax on profit – deferred tax", dr: 6000 },
          { account: "Provision for deferred tax", cr: 6000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "net-deferred-tax",
      prompt:
        "At the year end a company's fixed assets have a carrying amount of £64,000 and a tax written-down value of £22,000. It also has unrelieved trading losses of £10,000, which are expected to be used against next year's profits. Using a rate of 25%, what is the net deferred tax liability?",
      answer: 8000,
      unit: "£",
      explain: "Accelerated capital allowances give a liability; recoverable losses give an asset, which can be offset.",
      working: "(£64,000 − £22,000) = £42,000 liability timing difference; less £10,000 losses = £32,000 net. × 25% = **£8,000**.",
    },
    {
      kind: "journal",
      id: "dt-movement",
      prompt: "A company's deferred tax liability was £5,000 last year and is £8,000 this year. Post the movement.",
      accounts: ["Tax on profit – deferred tax", "Provision for deferred tax", "Corporation tax payable", "Tax on profit – current tax", "Retained earnings", "Revaluation reserve"],
      answer: [
        { account: "Tax on profit – deferred tax", dr: 3000 },
        { account: "Provision for deferred tax", cr: 3000 },
      ],
      explain: "Post only the movement (£8,000 − £5,000 = £3,000) to the deferred tax charge. It's not current tax payable.",
    },
    {
      kind: "classify",
      id: "timing-or-permanent",
      prompt: "Classify each item for deferred tax purposes.",
      categories: ["Timing difference", "Permanent difference"],
      items: [
        { text: "AIA claimed on machinery being depreciated over 5 years", answer: 0 },
        { text: "Client entertaining disallowed", answer: 1 },
        { text: "Investment property revaluation gain under FRS 102", answer: 0 },
        { text: "A parking fine paid by the company", answer: 1 },
        { text: "Trading losses carried forward and expected to be used", answer: 0 },
        { text: "Pension contributions accrued but deductible only when paid next year", answer: 0 },
      ],
      explain: "Timing differences reverse in later periods; permanent differences never do.",
    },
    {
      kind: "mcq",
      id: "frs105-dt",
      prompt: "A micro-entity using FRS 105 has claimed large capital allowances. Should it recognise deferred tax?",
      options: ["Yes, as under FRS 102", "No, FRS 105 doesn't permit deferred tax", "Only if material", "Only as a note"],
      answer: 1,
      explain: "FRS 105 prohibits recognition of deferred tax.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-dt-basis",
      prompt: "On what basis does FRS 102 recognise deferred tax?",
      options: ["Permanent differences", "Timing differences (plus certain other differences such as revaluations)", "Cash paid", "Only on losses"],
      answer: 1,
      explain: "Section 29 uses a timing differences approach.",
    },
    {
      kind: "mcq",
      id: "q-dt-discount",
      prompt: "Is deferred tax discounted under FRS 102?",
      options: ["Yes, always", "No", "Only if over 5 years", "Only for large companies"],
      answer: 1,
      explain: "Deferred tax isn't discounted.",
    },
    {
      kind: "mcq",
      id: "q-dt-asset",
      prompt: "When can a deferred tax asset for unused losses be recognised?",
      options: ["Always", "Only to the extent it's probable it will be recovered against future taxable profits", "Never", "Only if HMRC agrees"],
      answer: 1,
      explain: "Deferred tax assets need probable future recovery.",
    },
    {
      kind: "mcq",
      id: "q-dt-entertaining",
      prompt: "Does disallowed client entertaining create deferred tax?",
      options: ["Yes, a liability", "Yes, an asset", "No, it's a permanent difference", "Only for small companies"],
      answer: 2,
      explain: "It will never be deductible, so no timing difference arises.",
    },
    {
      kind: "mcq",
      id: "q-dt-rate",
      prompt: "Which rate should be used to measure deferred tax?",
      options: [
        "This year's current tax rate, always",
        "Rates enacted or substantively enacted at the reporting date that are expected to apply when the difference reverses",
        "Always 19%",
        "The rate the client prefers",
      ],
      answer: 1,
      explain: "Use enacted or substantively enacted rates expected to apply on reversal.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (Section 29 Income tax)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "FRC: FRS 105", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-105/" },
    { label: "Corporation Tax rates and allowances", url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" },
    { label: "Capital allowances when you buy assets", url: "https://www.gov.uk/capital-allowances" },
    { label: "ICAEW: small and micro-entity reporting compared", url: "https://www.icaew.com/technical/corporate-reporting/uk-gaap/small-and-micro-entity-reporting/small-and-micro-entity-reporting-compared" },
  ],
};
