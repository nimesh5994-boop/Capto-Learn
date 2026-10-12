import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "eris-for-rd-intensive-smes",
  title: "ERIS: enhanced support for loss-making, R&D-intensive SMEs",
  level: "advanced",
  minutes: 45,
  summary:
    "Enhanced R&D intensive support for accounting periods beginning on or after 1 April 2024: the SME, loss-making and 30% R&D intensity conditions (with connected companies and the one-year grace rule), the 86% additional deduction, the surrenderable loss, the 14.5% payable credit, the PAYE cap, and when ERIS beats the merged RDEC.",
  objectives: [
    "Test whether a company qualifies for ERIS, including the R&D intensity calculation with connected companies",
    "Compute the additional deduction, surrenderable loss and payable credit",
    "Apply the restriction where the company has other income, and the PAYE cap",
    "Compare ERIS with the merged RDEC and advise which to claim",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `ERIS keeps an SME-style enhanced deduction and payable credit for a narrow group: **loss-making SMEs that are R&D intensive**. An eligible company can choose the merged RDEC instead, but can't claim both on the same expenditure. The qualifying expenditure rules are the same as for the merged scheme.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The ERIS conditions",
      md: `For an accounting period beginning on or after 1 April 2024, the company must:

1. be an **SME** (broadly, fewer than 500 staff and turnover of no more than €100m or balance sheet total of no more than €86m, aggregating linked and partner enterprises);
2. be **loss-making**: it has a trading loss for tax purposes **before** the additional deduction; and
3. be **R&D intensive**: its relevant R&D expenditure is **at least 30%** of its total relevant expenditure, **including that of companies connected to it** on at least one day in the period (CTA 2009 s1045ZA).

**Grace rule:** a company that falls below 30% can still qualify if it met the intensity condition in its **last 12-month accounting period** and made a valid ERIS (or old SME scheme) claim for it.`,
    },
    {
      kind: "md",
      md: `### R&D intensity

R&D intensity = (relevant R&D expenditure of the company and connected companies) ÷ (total relevant expenditure of the company and connected companies).

- **Total relevant expenditure** is broadly the expenditure brought into account in computing trading profits under GAAP (above the profit before tax line), plus pre-trading R&D expenditure and certain software/IP amounts, **excluding payments to connected companies** (so intra-group charges aren't double counted).
- **Relevant R&D expenditure** is expenditure that would be qualifying ERIS expenditure.
- Connected companies count wherever they are (UK or overseas). Where periods don't align, use a reasonable, consistent attribution.

The 30% threshold applies to periods beginning on or after 1 April 2024. The old SME scheme used **40%** for the R&D-intensive credit rate.`,
    },
    {
      kind: "table",
      caption: "ERIS rates",
      head: ["Element", "Rate"],
      rows: [
        ["Additional deduction", "86% of qualifying expenditure (186% total deduction)"],
        ["Surrenderable loss", "Lower of the unrelieved trading loss and 186% of the qualifying expenditure"],
        ["Payable credit", "14.5% of the loss surrendered (not taxable)"],
        ["PAYE cap", "£20,000 + 300% of relevant PAYE and NIC (unless exempt); a claim above the cap is invalid, so claim only up to it"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The 'unrelieved loss' and other income",
      md: `The **unrelieved loss** excludes any part of the loss that **could** have been set against other profits of the same period (sideways relief), whether or not that relief is claimed, and any amount group relieved or carried back. A company with property income or interest has a smaller surrenderable loss. Example from HMRC's manual: a £136,000 enhanced loss with £100,000 of property profits leaves only £36,000 surrenderable, giving a credit of £5,220.`,
    },
    {
      kind: "md",
      md: `### ERIS or merged RDEC?

For a loss-maker, compare:

- **ERIS**: credit = 14.5% × surrendered loss. If the whole enhanced loss (up to 186% of spend) is surrendered, that's up to **26.97%** of qualifying expenditure in cash. But the surrendered losses are **gone**: they can't be carried forward against future profits.
- **Merged RDEC**: 20% credit, net of 19% notional tax = **16.2%** in cash now (subject to the PAYE cap), with the 3.8% withheld carried forward against future CT, and the remaining trading loss (reduced by the taxable credit) carried forward.

ERIS usually gives more cash now. The merged RDEC preserves more losses. A company that expects to become profitable soon, where future losses would be relieved at 25%, should model both.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Check connected companies first",
      md: `The intensity test aggregates **connected companies**. A tech start-up that is 60% owned by a larger trading company (connected through control) may have a 50% intensity on its own but well under 30% on the group basis. Get the group structure and connected companies' figures before you promise ERIS.`,
    },
  ],
  scenario: {
    title: "ERIS or merged scheme for Larchmont Therapeutics Ltd",
    narrative: `Larchmont Therapeutics Ltd is a standalone SME (no connected companies) developing a diagnostic test. Year ended 31 March 2026:

- Total relevant expenditure (all costs in the P&L): **£900,000**
- Qualifying R&D expenditure: **£300,000**
- Tax-adjusted trading loss before any R&D relief: **£150,000**
- No other income. PAYE and NIC liabilities: **£80,000** (cap not an issue)

The CEO wants the maximum cash this year: the company has 9 months of runway.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Eligibility.** SME: yes. Loss-making before the additional deduction: yes. Intensity: £300,000 ÷ £900,000 = **33.3%**, which is at least 30%. **ERIS available.**

**2. ERIS computation**
- Additional deduction: £300,000 × 86% = £258,000.
- Enhanced trading loss: £150,000 + £258,000 = **£408,000**.
- Cap: 186% × £300,000 = £558,000. Surrenderable loss = lower of £408,000 and £558,000 = **£408,000**.
- Payable credit: £408,000 × 14.5% = **£59,160**. PAYE cap = £20,000 + £240,000 = £260,000, not exceeded.
- Loss carried forward: nil (all surrendered).

**3. Merged RDEC computation**
- Credit: £300,000 × 20% = £60,000 (taxable). Trading loss: £150,000 − £60,000 = **£90,000** carried forward.
- Step 2 at 19%: cash £48,600; £11,400 carried forward against future CT.

**4. Advice.** ERIS gives **£59,160** cash now versus **£48,600**, a £10,560 difference, but gives up £90,000 of losses and the £11,400 step 2 amount. With 9 months of runway, cash now matters most: **claim ERIS**, and record the comparison and the CEO's decision on file.`,
      },
      {
        kind: "table",
        caption: "Comparison",
        head: ["", "ERIS", "Merged RDEC"],
        rows: [
          ["Cash this year", "£59,160", "£48,600"],
          ["Loss carried forward", "£0", "£90,000"],
          ["Amount carried forward against future CT", "£0", "£11,400"],
          ["Credit taxable?", "No", "Yes"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "intensity-connected",
      prompt:
        "A loss-making SME has relevant R&D expenditure of £420,000 and total relevant expenditure of £1,000,000. It's connected to a trading company with relevant R&D expenditure of £30,000 and total relevant expenditure of £800,000 (none of which are payments between the two). What is the R&D intensity, to one decimal place?",
      answer: 25,
      tolerance: 0.05,
      unit: "%",
      explain: "Aggregate both companies' relevant R&D expenditure and total relevant expenditure.",
      working: "(£420,000 + £30,000) ÷ (£1,000,000 + £800,000) = £450,000 ÷ £1,800,000 = **25.0%**: below 30%, so ERIS isn't available unless the grace rule applies.",
    },
    {
      kind: "numeric",
      id: "eris-credit",
      prompt:
        "A loss-making, R&D-intensive SME with no other income has a trading loss of £80,000 before R&D relief and qualifying expenditure of £200,000. Assuming the PAYE cap doesn't restrict it and it surrenders the maximum, what payable credit can it claim?",
      answer: 36540,
      unit: "£",
      explain: "Enhanced loss = loss + 86% of qualifying spend. The surrenderable loss is the lower of that and 186% of spend. Credit at 14.5%.",
      working: "Additional deduction £172,000. Enhanced loss £252,000. 186% × £200,000 = £372,000. Surrenderable: £252,000. Credit £252,000 × 14.5% = **£36,540**.",
    },
    {
      kind: "numeric",
      id: "eris-other-income",
      prompt:
        "An ERIS-eligible company has an enhanced trading loss (after the 86% deduction) of £210,000 and bank interest and property profits of £60,000 in the same period, against which the loss could be set. Qualifying expenditure was £150,000. What is the maximum payable credit?",
      answer: 21750,
      unit: "£",
      explain: "The unrelieved loss excludes the part that could be set sideways against other profits of the period, whether or not that's claimed.",
      working: "Unrelieved loss £210,000 − £60,000 = £150,000. 186% cap £279,000. Surrenderable £150,000 × 14.5% = **£21,750**.",
    },
    {
      kind: "classify",
      id: "eris-eligible",
      prompt: "For accounting periods beginning on or after 1 April 2024, is each company eligible for ERIS?",
      categories: ["Eligible", "Not eligible"],
      items: [
        { text: "SME, loss-making, R&D intensity 34% on a connected-companies basis", answer: 0 },
        { text: "SME, profitable, R&D intensity 60%", answer: 1, why: "Must be loss-making before the additional deduction." },
        { text: "Large company, loss-making, intensity 45%", answer: 1, why: "ERIS is only for SMEs." },
        { text: "SME, loss-making, intensity 27% this year but 35% last year with a valid ERIS claim for that 12-month period", answer: 0, why: "The grace rule applies." },
        { text: "SME, loss-making, intensity 38% alone but 18% including its connected parent", answer: 1, why: "Connected companies are aggregated." },
      ],
      explain: "ERIS needs an SME, a pre-relief trading loss, and intensity of at least 30% including connected companies (or the grace rule).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-eris-threshold",
      prompt: "What R&D intensity is needed for ERIS in accounting periods beginning on or after 1 April 2024?",
      options: ["20%", "30%", "40%", "50%"],
      answer: 1,
      explain: "30% or more, including connected companies.",
    },
    {
      kind: "mcq",
      id: "q-eris-deduction",
      prompt: "What is the ERIS additional deduction?",
      options: ["86% of qualifying expenditure", "130%", "186%", "20%"],
      answer: 0,
      explain: "86% additional deduction, giving a total deduction of 186%.",
    },
    {
      kind: "mcq",
      id: "q-eris-credit-tax",
      prompt: "Is the ERIS payable credit taxable?",
      options: ["Yes, as trading income", "No", "Only for large companies", "Only if over £50,000"],
      answer: 1,
      explain: "The ERIS payable credit is not liable to tax, unlike the merged RDEC.",
    },
    {
      kind: "mcq",
      id: "q-eris-both",
      prompt: "Can a company claim ERIS and the merged RDEC on the same expenditure?",
      options: ["Yes", "No", "Only for subcontractor costs", "Only in the first year"],
      answer: 1,
      explain: "An eligible company can choose either scheme for the expenditure, but not both.",
    },
    {
      kind: "mcq",
      id: "q-eris-surrenderable",
      prompt: "What is the surrenderable loss under ERIS?",
      options: [
        "The whole trading loss, whatever its size",
        "The lower of the unrelieved trading loss and 186% of qualifying expenditure",
        "86% of qualifying expenditure",
        "The higher of the trading loss and 186% of qualifying expenditure",
      ],
      answer: 1,
      explain: "CTA 2009 s1055: the lower of the unrelieved loss and 186% of the enhanced expenditure.",
    },
  ],
  sources: [
    { label: "HMRC CIRD manual: ERIS calculation (CIRD122000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird122000" },
    { label: "HMRC CIRD manual: R&D intensity condition (CIRD123000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird123000" },
    { label: "HMRC CIRD manual: PAYE cap (CIRD140000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird140000" },
    { label: "HMRC: merged R&D expenditure credit scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
    { label: "Corporation Tax Act 2009 s1045ZA – R&D intensity condition", url: "https://www.legislation.gov.uk/ukpga/2009/4/section/1045ZA" },
  ],
};
