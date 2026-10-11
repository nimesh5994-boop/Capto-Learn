import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "capital-allowances-pools-cars-and-disposals",
  title: "Capital allowances II: pools, WDAs, cars and disposals",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Running the main and special rate pools: the cut in the main rate WDA from 18% to 14% from April 2026 (and the hybrid rate for straddling periods), cars by CO₂, the small pools allowance, short-life assets, disposals, balancing charges and balancing allowances.",
  objectives: [
    "Prepare a capital allowances computation with main and special rate pools",
    "Apply the 14% main rate (and a hybrid rate for a straddling period) and the 6% special rate",
    "Allocate cars to the right pool using CO₂ emissions and purchase date",
    "Deal with disposals, balancing charges, balancing allowances and the small pools allowance",
  ],
  body: [
    {
      kind: "md",
      md: `Anything not relieved up front (by AIA, full expensing or an FYA) goes into a **pool** and is relieved by **writing down allowances (WDAs)**: a percentage of the pool balance each year, on a reducing-balance basis. You'll prepare a pool computation for nearly every company client, so learn the layout.`,
    },
    {
      kind: "table",
      caption: "The pools and their rates",
      head: ["Pool", "What goes in", "WDA rate"],
      rows: [
        ["Main pool", "Main rate P&M not fully relieved up front; cars with CO₂ of 50g/km or less (bought from April 2021); balances of 40% FYA assets", "**14%** for chargeable periods from 1 April 2026 (CT); 18% before"],
        ["Special rate pool", "Integral features, long-life assets, thermal insulation, solar panels, cars over 50g/km; balances of 50% FYA assets", "**6%**"],
        ["Single asset pools", "Short-life asset elections; assets with private use by an owner (unincorporated businesses only)", "Rate of the underlying pool"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 2026 main rate cut and hybrid rates",
      md: `The main rate WDA fell from **18% to 14%** from **1 April 2026** for corporation tax (6 April 2026 for income tax). Where an accounting period **straddles** 1 April 2026, use a **hybrid rate**: time-apportion 18% and 14% by the days before and after the change.

Example: year ended 31 December 2026. 90 days at 18% (1 January to 31 March) and 275 days at 14%:
18% × 90/365 + 14% × 275/365 = 4.44% + 10.55% ≈ **14.99%**.

For periods starting on or after 1 April 2026 (e.g. a year to 31 March 2027), it's simply 14%. Check your software has the hybrid rate right for December, September and June year ends in 2026.`,
    },
    {
      kind: "md",
      md: `### Cars

Cars never get the AIA or full expensing. For a car bought from April 2021:

| Car | Treatment |
|---|---|
| New and unused, 0g/km (electric) | **100% FYA** (expenditure to 31 March 2027 for CT) |
| Second-hand electric, or 1–50g/km | **Main pool** (14%) |
| Over 50g/km | **Special rate pool** (6%) |

For a **company**, there's **no restriction for private use** of a car by a director or employee: the company gets full allowances and the individual pays tax on the benefit in kind. (Private-use restrictions apply only to sole traders and partners.)`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Disposals",
      md: `When a pooled asset is sold, scrapped or given away, deduct the **disposal value** from the pool: normally the **lower of the sale proceeds and the original cost**.
- If the pool goes **negative**, the negative amount is a **balancing charge**, added to trading profit.
- A **balancing allowance** arises on a main or special rate pool only when the trade **ceases**. On a single asset pool (e.g. a short-life asset), a balancing allowance arises when the asset is sold.
- Assets that got **full expensing** or the **50% FYA** have special disposal rules (all, or half, of the proceeds is an immediate balancing charge); see the previous lesson.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Small pools allowance",
      md: `If the balance on the main pool or the special rate pool (after additions and disposals, before WDA) is **£1,000 or less**, the company can claim the whole balance as a WDA and write the pool off. The £1,000 is pro rata for short periods.`,
    },
    {
      kind: "md",
      md: `### Short-life asset elections

A company can elect to put a main rate asset it expects to dispose of within **8 years** into its own pool. If it's sold for less than its written-down value, a **balancing allowance** arises immediately instead of the loss of value being written off slowly in the main pool. If it's still held after 8 years, its balance transfers to the main pool. The election is made on the return within **2 years** of the end of the AP in which the asset was bought. Cars and special rate assets can't be short-life assets. With full expensing and the AIA available, this matters most for second-hand assets and for companies whose AIA is used up.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Short accounting periods",
      md: `WDAs are **pro-rated** for an accounting period of less than 12 months (e.g. 14% × 6/12 for a 6-month AP). Remember that an AP can never exceed 12 months, so a long period of account is split and each AP gets its own computation.`,
    },
  ],
  scenario: {
    title: "Year-end pools for Thornbury Plumbing Supplies Ltd",
    narrative: `**Thornbury Plumbing Supplies Ltd** (Bristol) has a year ended **31 March 2027**. Brought forward balances are: main pool **£86,000**; special rate pool **£40,000**. During the year:

- Bought a **second-hand hybrid car** (45g/km) for the sales director: **£28,000**.
- Sold a forklift for **£7,500**. It cost £20,000 in 2019, when AIA was claimed on it.
- Sold the managing director's old diesel car (special rate pool) for **£9,000**; it cost £25,000.

The company's AIA covers all its other purchases this year.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Forklift.** Even though AIA was claimed when it was bought, the asset sat in the main pool at nil cost after the AIA, so its disposal value still comes off the main pool: the lower of £7,500 proceeds and £20,000 cost = **£7,500**.

**Hybrid car.** Not zero-emission and second-hand: no FYA. 45g/km is not over 50g/km, so it goes into the **main pool**. The sales director's private use doesn't restrict the company's allowances.

**Old diesel car.** Lower of £9,000 and £25,000 cost = **£9,000** off the special rate pool.

The AP starts on 1 April 2026, so the main rate is a straight **14%**.`,
      },
      {
        kind: "table",
        caption: "Capital allowances: year ended 31 March 2027",
        head: ["", "Main pool", "Special rate pool", "Allowances"],
        rows: [
          ["Balance b/f", "£86,000", "£40,000", ""],
          ["Addition: hybrid car (45g/km)", "£28,000", "", ""],
          ["Disposal: forklift", "(£7,500)", "", ""],
          ["Disposal: diesel car", "", "(£9,000)", ""],
          ["Balance before WDA", "£106,500", "£31,000", ""],
          ["WDA 14%", "(£14,910)", "", "£14,910"],
          ["WDA 6%", "", "(£1,860)", "£1,860"],
          ["**Balance c/f**", "**£91,590**", "**£29,140**", ""],
          ["**Total WDAs** (plus AIA on other purchases)", "", "", "**£16,770**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "disposal-capped",
      prompt:
        "A company's main pool is £50,000 brought forward at the start of its year to 31 March 2027. It sells a machine for £65,000 that originally cost £40,000. There are no additions. What is the WDA for the year?",
      answer: 1400,
      unit: "£",
      explain: "The disposal value is capped at original cost (£40,000). Any excess of proceeds over cost is a capital gain, not a capital allowances matter.",
      working: "£50,000 − £40,000 = £10,000 × 14% = **£1,400**",
    },
    {
      kind: "numeric",
      id: "balancing-charge",
      prompt:
        "A company's special rate pool is £12,000 brought forward. In the year it sells a car from the pool for £15,000 (cost £30,000). There are no additions. What balancing charge arises?",
      answer: 3000,
      unit: "£",
      explain: "Deducting the £15,000 disposal value leaves the pool £3,000 negative, which is a balancing charge.",
      working: "£12,000 − £15,000 = −£3,000 → balancing charge **£3,000**; pool balance nil.",
    },
    {
      kind: "numeric",
      id: "short-period-wda",
      prompt:
        "A company prepares accounts for 6 months to 30 September 2026 (after a change of year end). Its main pool before WDA is £60,000. What is the WDA?",
      answer: 4200,
      unit: "£",
      explain: "The period starts after 1 April 2026, so 14% applies, pro-rated for a 6-month AP.",
      working: "£60,000 × 14% × 6/12 = **£4,200**",
    },
    {
      kind: "numeric",
      id: "small-pool",
      prompt:
        "At its year end of 31 March 2027 a company's special rate pool balance, after a disposal, is £940. What is the maximum allowance it can claim on the pool?",
      answer: 940,
      unit: "£",
      explain: "Balances of £1,000 or less can be written off using the small pools allowance.",
      working: "£940 ≤ £1,000 → claim **£940** and close the pool (instead of 6% × £940 = £56.40).",
    },
    {
      kind: "classify",
      id: "car-pools",
      prompt: "A company buys these cars in its year to 31 March 2027. Where does each go?",
      categories: ["100% FYA", "Main pool (14%)", "Special rate pool (6%)"],
      items: [
        { text: "New electric car, 0g/km", answer: 0 },
        { text: "Second-hand electric car, 0g/km", answer: 1, why: "Second-hand cars can't get the FYA." },
        { text: "New plug-in hybrid, 32g/km", answer: 1 },
        { text: "New petrol car, 118g/km", answer: 2 },
        { text: "New diesel car, 51g/km", answer: 2, why: "Over 50g/km." },
      ],
      explain: "Only new zero-emission cars get 100%. Up to 50g/km goes in the main pool; over 50g/km goes in the special rate pool.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-main-rate",
      prompt: "What is the main pool WDA rate for a company's accounting period starting on 1 April 2026?",
      options: ["18%", "14%", "6%", "8%"],
      answer: 1,
      explain: "14% from 1 April 2026 for CT.",
    },
    {
      kind: "mcq",
      id: "q-hybrid",
      prompt: "A company's accounting period runs from 1 October 2025 to 30 September 2026. What main pool WDA rate applies?",
      options: ["18%", "14%", "A hybrid rate between 14% and 18%, time-apportioned", "16% fixed"],
      answer: 2,
      explain: "The period straddles 1 April 2026, so 18% and 14% are time-apportioned by days.",
    },
    {
      kind: "mcq",
      id: "q-special-rate",
      prompt: "What is the special rate pool WDA?",
      options: ["14%", "10%", "8%", "6%"],
      answer: 3,
      explain: "6%, unchanged.",
    },
    {
      kind: "mcq",
      id: "q-private-use",
      prompt: "A company car is used 40% privately by a director. How are the company's capital allowances affected?",
      options: ["Restricted to 60%", "Not restricted; the director is taxed on a benefit in kind", "Not available at all", "Restricted to 50%"],
      answer: 1,
      explain: "Private-use restrictions don't apply to companies.",
    },
    {
      kind: "mcq",
      id: "q-balancing-allowance",
      prompt: "When does a balancing allowance arise on the main pool?",
      options: ["Whenever an asset is sold for less than cost", "Only when the trade ceases", "Every year", "When the pool is under £1,000"],
      answer: 1,
      explain: "On the main and special rate pools, balancing allowances arise only on cessation.",
    },
    {
      kind: "mcq",
      id: "q-disposal-value",
      prompt: "What disposal value is deducted from the pool when an asset is sold?",
      options: ["The sale proceeds", "The original cost", "The lower of the sale proceeds and the original cost", "The written-down value"],
      answer: 2,
      explain: "Disposal value is capped at original cost.",
    },
  ],
  sources: [
    { label: "Work out your writing down allowances: rates and pools (GOV.UK)", url: "https://www.gov.uk/work-out-capital-allowances/rates-and-pools" },
    { label: "Claim capital allowances: business cars (GOV.UK)", url: "https://www.gov.uk/capital-allowances/business-cars" },
    { label: "Capital allowances: new first-year allowance and reducing main rate WDA (policy paper)", url: "https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances" },
    { label: "CA23250: Disposal values (Capital Allowances Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23250" },
    { label: "Capital Allowances Act 2001 s56A: small pools allowance", url: "https://www.legislation.gov.uk/ukpga/2001/2/section/56A" },
  ],
};
