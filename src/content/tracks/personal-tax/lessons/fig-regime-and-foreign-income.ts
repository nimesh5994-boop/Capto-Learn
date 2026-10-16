import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "fig-regime-and-foreign-income",
  title: "Foreign income, the FIG regime and foreign tax credit relief",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "How UK residents are taxed on foreign income, how double tax is relieved, and the residence-based regime that replaced the remittance basis from 6 April 2025: the 4-year foreign income and gains (FIG) regime for new arrivals, what a claim costs, and the temporary repatriation facility for former remittance basis users.",
  objectives: [
    "Explain how UK residents and non-residents are taxed on foreign and UK income",
    "Calculate foreign tax credit relief, including where foreign tax exceeds UK tax",
    "Decide whether a new arrival qualifies for the 4-year FIG regime and whether a claim is worthwhile",
    "Recognise the transitional rules for former remittance basis users",
  ],
  body: [
    {
      kind: "md",
      md: `Once residence is decided (previous lesson), the basic rules are:
- A **UK resident** is taxed on **worldwide** income and gains as they arise: foreign interest, dividends, rents, pensions and employment income, as well as UK income. The main exception is a new arrival who claims the **4-year FIG regime**.
- A **non-resident** is generally taxed only on **UK-source** income (UK rents, UK trading income, UK employment duties) and on gains on UK land and property.

Foreign income goes on the **foreign pages (SA106)**, converted to sterling at the exchange rate on the date it arose or an average rate for the year, applied consistently. Foreign rental income is an **overseas property business**, separate from any UK lettings, with its own losses (and the same section 24 finance cost restriction for residential property).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The remittance basis has gone",
      md: `From **6 April 2025** the remittance basis for non-UK domiciled individuals was **abolished**, and domicile no longer matters for income tax and CGT. It was replaced by a **residence-based** system (Finance Act 2025):
- **New arrivals** who were non-resident for at least **10 consecutive tax years** can claim the **4-year FIG regime**.
- Everyone else who's UK resident is taxed on the arising basis on worldwide income and gains.
- Foreign income and gains that arose **before 6 April 2025** while someone was on the remittance basis are still taxable if they're brought to the UK, unless they're designated under the **temporary repatriation facility (TRF)**.`,
    },
    {
      kind: "md",
      md: `### The 4-year FIG regime

**Who qualifies:** an individual who is UK resident under the SRT for a tax year that falls within their **first 4 tax years of UK residence** after at least **10 consecutive tax years of non-UK residence**. Nationality and former domicile are irrelevant.

**What it does:** qualifying **foreign income and gains** arising in a claim year (from 6 April 2025) are **not taxed in the UK**, and can be brought into the UK with no further charge. Claims are made **year by year** and **source by source**: the claim is made on the **SA109** pages, and the amount relieved for each source goes on the relevant supplementary pages (the **SA106** foreign pages for most foreign income). Years not claimed are lost. They can't be carried forward beyond the 4-year window.

**What it doesn't cover:** **foreign employment income**. That has a separate **overseas workday relief** election with its own limits. UK income is taxed as normal.

**The cost of claiming** (HS266):
- the person **loses their personal allowance** and the **CGT annual exempt amount** for that year, along with blind person's allowance and marriage allowance,
- **foreign losses** arising in the claim year can't be used,
- relieved foreign income still counts towards **adjusted net income** (for example for the HICBC),
- **foreign tax credit relief** isn't available on relieved income, since there's no UK tax to credit against.

**Time limit:** the claim must be made within 12 months of the 31 January filing date. For 2026/27 that's by **31 January 2029**.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "A FIG claim isn't automatically a good idea",
      md: `For someone with modest foreign income and mostly UK income, losing the personal allowance (worth £2,514 to a basic rate taxpayer and up to £5,028 to a higher rate taxpayer) can cost more than the tax saved on the foreign income. Model the figures with and without a claim for each year, and for each source.`,
    },
    {
      kind: "md",
      md: `### Foreign tax credit relief (FTCR)

Foreign income has often been taxed in the country where it arose. To avoid double taxation, a UK resident can usually claim **foreign tax credit relief** against UK tax on the same income, under a double taxation agreement or, if there isn't one, under unilateral relief.

> FTCR = the **lower** of the foreign tax paid and the UK tax on that income

The UK tax on the foreign income is worked out by treating that income as the **top slice** of the person's income. If the treaty limits the foreign country's rate (common for dividends and interest), credit is only given at the **treaty rate**. The excess has to be reclaimed from the foreign tax authority, not from HMRC.

### Temporary repatriation facility (TRF)

Former remittance basis users can **designate** foreign income and gains that arose before 6 April 2025, and pay a flat **TRF charge** instead of income tax or CGT at normal rates when they're brought to the UK. The charge is **12%** for designations in **2025/26 and 2026/27**, and **15%** in **2027/28**, the final year. No foreign tax credit is allowed against it. This is specialist planning. Involve a manager for any former remittance basis user.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Ask new clients two questions",
      md: `At onboarding, ask: *"In which tax year did you become UK resident, and where were you resident for the 10 years before that?"* and *"Did you ever claim the remittance basis?"* The answers tell you straight away whether the FIG regime or the TRF might be relevant, and both have strict claim deadlines.`,
    },
  ],
  scenario: {
    title: "Should Isabella claim the FIG regime for 2026/27?",
    narrative: `Isabella moved to London on 6 April 2026 to take up a job, after living in Italy for the previous 15 years. She's UK resident for 2026/27 under the SRT (her first year of UK residence). For 2026/27:
- UK salary: **£80,000** (PAYE)
- Profit from letting her flat in Milan: **£30,000** (no finance costs), with Italian tax of **£6,000** paid on it

She asks whether she should claim the FIG regime.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Eligibility:** 2026/27 is within her first 4 years of UK residence, after more than 10 consecutive years of non-residence. ✔ The Milan rent is qualifying foreign income arising after 6 April 2025. ✔`,
      },
      {
        kind: "table",
        caption: "Income tax for 2026/27, with and without a FIG claim",
        head: ["", "No claim (£)", "FIG claim (£)"],
        rows: [
          ["Salary", "80,000", "80,000"],
          ["Italian rental profit", "30,000", "Relieved"],
          ["Net income", "110,000", "80,000"],
          ["Personal allowance", "12,570 − (10,000 ÷ 2) = 7,570", "Nil: lost on a claim"],
          ["Taxable income", "102,430", "80,000"],
          ["£37,700 × 20%", "7,540", "7,540"],
          ["Higher rate (40%)", "64,730 × 40% = 25,892", "42,300 × 40% = 16,920"],
          ["Tax before FTCR", "33,432", "24,460"],
          ["FTCR: lower of Italian tax £6,000 and the UK tax on the rent as the top slice (well over £12,000)", "(6,000)", "Not available"],
          ["**UK income tax**", "**27,432**", "**24,460**"],
        ],
      },
      {
        kind: "md",
        md: `A FIG claim saves her **£2,972** for 2026/27, even after losing the personal allowance and the foreign tax credit. She still pays the £6,000 Italian tax under either option, because Italy taxes the Milan property in any case.

**Points to note on file:**
- Claim on the SA109, with the relieved Milan rental income shown on the SA106 foreign pages. The deadline for 2026/27 is 31 January 2029.
- With a claim, her ANI still includes the relieved foreign income for the HICBC.
- Recalculate every year. If her salary rises or the rent falls, the answer may change. She has 3 more years available (2027/28 to 2029/30).`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "ftcr-basic",
      prompt:
        "A UK resident higher rate taxpayer receives foreign rental profit of £10,000, all taxed at 40% in the UK, on which £1,500 of foreign tax was paid. No FIG claim is made. How much **UK** tax remains payable on this income after foreign tax credit relief?",
      answer: 2500,
      unit: "£",
      explain: "FTCR is the lower of the foreign tax and the UK tax on the same income. The UK then collects the difference.",
      working: "UK tax: £10,000 × 40% = £4,000. FTCR: lower of £1,500 and £4,000 = £1,500. UK tax remaining: £4,000 − £1,500 = **£2,500**.",
    },
    {
      kind: "numeric",
      id: "ftcr-excess",
      prompt:
        "A basic rate taxpayer receives £2,000 of foreign rental profit (non-savings income), on which the foreign country charged tax at 30% (£600). What foreign tax credit relief can be claimed in the UK?",
      answer: 400,
      unit: "£",
      explain: "Relief is capped at the UK tax on the income. The excess foreign tax isn't refunded by HMRC.",
      working: "UK tax: £2,000 × 20% = £400. FTCR: lower of £600 and £400 = **£400**. The other £200 is unrelieved.",
    },
    {
      kind: "classify",
      id: "fig-eligible",
      prompt: "Can each person claim the 4-year FIG regime for 2026/27? Assume each is UK resident for 2026/27.",
      categories: ["Can claim", "Can't claim"],
      items: [
        { text: "Arrived in the UK in 2026/27 after 12 years living in Dubai", answer: 0 },
        { text: "Arrived in 2023/24 after 15 years in Australia, and has been UK resident since", answer: 0, why: "2026/27 is her 4th year of UK residence (2023/24, 24/25, 25/26, 26/27)." },
        { text: "Arrived in 2021/22 after 20 years abroad", answer: 1, why: "2026/27 is outside his first 4 years of UK residence." },
        { text: "Returned to the UK in 2026/27 after 6 years working in Singapore", answer: 1, why: "Needs at least 10 consecutive years of non-residence." },
        { text: "Non-UK domiciled, has lived in the UK for 30 years, used the remittance basis until 2024/25", answer: 1, why: "Domicile no longer matters, and he isn't a new arrival." },
      ],
      explain: "The test is residence-based: at least 10 consecutive years of non-UK residence, then a claim year within the first 4 years of UK residence.",
    },
    {
      kind: "mcq",
      id: "fig-cost",
      prompt: "Which of these is a consequence of making a FIG claim for a tax year?",
      options: [
        "The person's UK employment income becomes exempt",
        "The person loses their personal allowance and CGT annual exempt amount for that year",
        "The person becomes non-resident",
        "Foreign tax is refunded by HMRC",
      ],
      answer: 1,
      explain: "A claim costs the personal allowance, the CGT annual exempt amount and some other allowances, and foreign losses for that year can't be used. UK income stays taxable.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-abolished",
      prompt: "From when was the remittance basis abolished for UK resident non-domiciled individuals?",
      options: ["6 April 2024", "6 April 2025", "6 April 2026", "It still applies"],
      answer: 1,
      explain: "From 6 April 2025 the remittance basis was replaced by the residence-based 4-year FIG regime.",
    },
    {
      kind: "mcq",
      id: "q-10-years",
      prompt: "How many consecutive years of non-UK residence are needed before a person can use the FIG regime?",
      options: ["4", "7", "10", "15"],
      answer: 2,
      explain: "At least 10 consecutive tax years of non-UK residence, followed by up to 4 years of FIG relief.",
    },
    {
      kind: "mcq",
      id: "q-employment",
      prompt: "Does the FIG regime relieve foreign employment income?",
      options: ["Yes, in full", "No: overseas workday relief is a separate election", "Only up to £100,000", "Only for the first year"],
      answer: 1,
      explain: "Foreign employment income isn't qualifying foreign income. Overseas workday relief may help instead.",
    },
    {
      kind: "mcq",
      id: "q-trf",
      prompt: "What TRF charge applies to pre-April 2025 foreign income designated in 2026/27?",
      options: ["10%", "12%", "15%", "20%"],
      answer: 1,
      explain: "The TRF charge is 12% for 2025/26 and 2026/27, and 15% for 2027/28.",
    },
    {
      kind: "mcq",
      id: "q-ftcr-limit",
      prompt: "Foreign tax of £900 was paid on income on which UK tax is £700. What FTCR is available?",
      options: ["£900", "£700", "£200", "Nil"],
      answer: 1,
      explain: "Relief is limited to the lower of the foreign tax and the UK tax on the same income.",
    },
    {
      kind: "mcq",
      id: "q-nonres",
      prompt: "A non-resident individual lets a flat in Manchester. Is the rent taxable in the UK?",
      options: ["No: non-residents pay no UK tax", "Yes: UK property income is UK-source income", "Only if they visit the UK", "Only under the FIG regime"],
      answer: 1,
      explain: "Non-residents are taxed on UK-source income, including UK rents.",
    },
  ],
  sources: [
    { label: "HS266 Foreign income and gains (FIG) regime (2026)", url: "https://www.gov.uk/government/publications/foreign-income-and-gains-fig-regime-self-assessment-helpsheet-hs266/hs266-foreign-income-and-gains-fig-regime-2026" },
    { label: "Check if you can claim the 4-year foreign income and gains regime", url: "https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime" },
    { label: "RDRM73400 – temporary repatriation facility: the TRF charge", url: "https://www.gov.uk/hmrc-internal-manuals/residence-domicile-and-remittance-basis/rdrm73400" },
    { label: "Tax on foreign income: if you're taxed twice", url: "https://www.gov.uk/tax-foreign-income/taxed-twice" },
    { label: "RFIG41000 – FIG regime: introduction", url: "https://www.gov.uk/hmrc-internal-manuals/residence-and-fig-regime-manual/rfig41000" },
  ],
};
