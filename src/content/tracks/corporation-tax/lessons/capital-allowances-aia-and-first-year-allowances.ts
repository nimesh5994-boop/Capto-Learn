import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "capital-allowances-aia-and-first-year-allowances",
  title: "Capital allowances I: AIA, full expensing and first-year allowances",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "The up-front allowances a company can claim on plant and machinery — the £1m Annual Investment Allowance, full expensing, the 50% special rate FYA, the new 40% FYA from January 2026, and 100% FYAs for zero-emission cars and chargepoints — and how to choose between them.",
  objectives: [
    "Identify expenditure that qualifies as plant and machinery and which pool it belongs to",
    "Apply the AIA, including short periods and sharing between related companies",
    "Apply full expensing, the 50% special rate FYA, the 40% main rate FYA and the 100% zero-emission car FYA",
    "Allocate allowances to give the best result and explain the disposal consequences of full expensing",
  ],
  body: [
    {
      kind: "md",
      md: `Depreciation isn't deductible for corporation tax. Instead, a company gets **capital allowances** on qualifying capital expenditure. For **plant and machinery** (P&M) there are two stages: first, an **up-front allowance** in the period of purchase (this lesson); then **writing down allowances** on whatever is left in the pools (next lesson).

Plant and machinery covers equipment, machinery, vans, lorries, computers, office furniture, and cars, plus **integral features** of buildings (electrical and lighting systems, heating, air-conditioning, lifts, cold water systems). It doesn't cover the building structure itself, land, or most intangible assets.`,
    },
    {
      kind: "table",
      caption: "Up-front allowances available to companies for expenditure in FY2026",
      head: ["Allowance", "Rate", "What qualifies", "Key restrictions"],
      rows: [
        ["Annual Investment Allowance (AIA)", "100% up to **£1,000,000** a year", "Main and special rate P&M, new or second-hand", "Not cars. One AIA shared by a group / related companies. Pro rata for short APs"],
        ["Full expensing", "100%, no cap", "**New and unused** main rate P&M bought by a **company**", "Not cars, not second-hand, not for leasing"],
        ["50% special rate FYA", "50% in year 1; the rest to the special rate pool", "**New and unused** special rate P&M (e.g. integral features) bought by a company", "Not cars, not second-hand, not for leasing"],
        ["40% main rate FYA (from 1 January 2026)", "40% in year 1; the rest to the main pool", "**New and unused** main rate P&M, including **assets for leasing** (not overseas leasing); available to unincorporated businesses too", "Not cars, not second-hand"],
        ["100% FYA: zero-emission cars", "100%", "**New and unused** cars with 0g/km CO₂", "Expenditure to 31 March 2027 for CT. Not second-hand. Hybrids don't qualify"],
        ["100% FYA: electric vehicle chargepoints", "100%", "New chargepoint equipment", "Expenditure to 31 March 2027 for CT"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "AIA rules to remember",
      md: `- The **£1,000,000** limit is for a 12-month accounting period. For a short AP it's **pro rata** (e.g. 6 months: £500,000).
- A **group** of companies gets **one** AIA between them, allocated however they choose. So do companies under common control that are "related" (they share premises or carry on similar activities).
- AIA can be claimed on **second-hand** assets, which full expensing and the FYAs can't.
- It's a claim, not automatic: the company can claim less than the maximum.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Allocating allowances for the best result",
      md: `1. Put the AIA against **special rate** expenditure first (otherwise it only gets 50% FYA, or 6% WDA if second-hand), then against **second-hand main rate** assets (otherwise 14% WDA).
2. Use **full expensing** for new main rate assets once the AIA is used, or instead of the AIA where the company is happy with the disposal rules below.
3. The **40% FYA** matters where full expensing isn't available: leasing companies buying new assets to lease out, and new main rate assets bought by unincorporated businesses beyond their AIA.
4. Cars get none of these except the 100% FYA for new zero-emission cars.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Selling a fully expensed asset",
      md: `When an asset that got **full expensing** is sold, the **whole** disposal proceeds are a **balancing charge** (taxable) in the period of sale, rather than being deducted from the main pool. For a **50% FYA** asset, **half** the proceeds is an immediate balancing charge and the other half comes off the special rate pool. Assets that got the **AIA** go into the pools as normal, so their disposal proceeds reduce the pool. Keep an asset register that records which allowance was claimed on each asset.`,
    },
    {
      kind: "md",
      md: `### Timing of expenditure

Expenditure is generally incurred when the obligation to pay becomes unconditional (normally the invoice or delivery date), not when it's paid. But if the payment terms allow more than 4 months' credit, it's treated as incurred on the due date. Hire purchase assets qualify when brought into use, as if bought outright at the cash price. Assets bought just before the year end can therefore get allowances a whole year earlier: a useful planning point when a client is close to the marginal relief band or a higher rate.`,
    },
  ],
  scenario: {
    title: "A big year of investment at Ridgeway Bakeries Ltd",
    narrative: `**Ridgeway Bakeries Ltd** (Swindon) has a year ended **31 March 2027**. It's a standalone company with no related companies. During the year it bought:

| Asset | Cost | Notes |
|---|---:|---|
| New industrial ovens | £420,000 | New, main rate |
| New air-conditioning in the bakery | £150,000 | Integral feature: special rate |
| Second-hand delivery van | £18,000 | Main rate, second-hand |
| Second-hand dough mixer | £25,000 | Main rate, second-hand |
| New electric car (0g/km) for the sales manager | £42,000 | |
| Petrol car (100g/km) for the operations director | £30,000 | Special rate (over 50g/km) |

The finance director asks: *"How much can we claim this year?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Special rate first.** Use the AIA on the air-conditioning (£150,000), otherwise it would only get 50% FYA.

**2. Second-hand items.** Van £18,000 and mixer £25,000 can't get full expensing or the 40% FYA, so use the AIA (£43,000). AIA used so far: **£193,000** of the £1,000,000.

**3. New ovens (£420,000).** Either AIA (there's £807,000 left) or full expensing: both give **100%**. With plenty of AIA available, claiming **AIA** keeps the simpler pool treatment on a future sale. Either way, £420,000 relief.

**4. Electric car.** New, 0g/km, bought before 31 March 2027: **100% FYA** of £42,000.

**5. Petrol car.** 100g/km is over 50g/km, so special rate pool with a **6% WDA**: £1,800. No AIA for cars.`,
      },
      {
        kind: "table",
        caption: "Allowances for the year ended 31 March 2027",
        head: ["Asset", "Allowance", "Amount"],
        rows: [
          ["Air-conditioning", "AIA", "£150,000"],
          ["Van and mixer (second-hand)", "AIA", "£43,000"],
          ["Ovens", "AIA (or full expensing)", "£420,000"],
          ["Electric car", "100% FYA", "£42,000"],
          ["Petrol car", "6% WDA in special rate pool", "£1,800"],
          ["**Total**", "", "**£656,800**"],
        ],
      },
      {
        kind: "md",
        md: `The petrol car's written-down value of **£28,200** carries forward in the special rate pool. If the company had spent more than £1m, full expensing on the ovens would preserve AIA for the special rate and second-hand assets.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "aia-short-period",
      prompt: "A company prepares accounts for a 9-month accounting period ending 31 December 2026. What is its maximum AIA for the period?",
      answer: 750000,
      unit: "£",
      explain: "The AIA is pro rata for an accounting period shorter than 12 months.",
      working: "£1,000,000 × 9/12 = **£750,000**",
    },
    {
      kind: "numeric",
      id: "special-rate-over-aia",
      prompt:
        "A company with a 12-month AP to 31 March 2027 spends £1,300,000 on new special rate integral features and nothing else. It claims the maximum AIA and the 50% FYA on the rest. What are its total allowances in this period on this expenditure? (WDAs on the balance start next period.)",
      answer: 1150000,
      unit: "£",
      explain: "AIA covers the first £1,000,000. The excess £300,000 gets the 50% special rate FYA; the other £150,000 goes into the special rate pool.",
      working: "AIA £1,000,000 + 50% × £300,000 = £150,000 → **£1,150,000**",
    },
    {
      kind: "numeric",
      id: "fe-disposal",
      prompt:
        "In 2025 a company claimed full expensing on a new machine costing £200,000. In the year to 31 March 2027 it sells the machine for £60,000. What balancing charge arises?",
      answer: 60000,
      unit: "£",
      explain: "For a fully expensed asset, the whole disposal value is a balancing charge in the period of sale.",
      working: "Disposal proceeds (capped at cost) = **£60,000** balancing charge.",
    },
    {
      kind: "classify",
      id: "which-allowance",
      prompt:
        "For each purchase by a company in its year to 31 March 2027 (AIA already fully used by other spending), which up-front allowance is available?",
      categories: ["Full expensing (100%)", "50% FYA", "40% FYA", "100% FYA", "No up-front allowance (WDA only)"],
      items: [
        { text: "New CNC machine for the company's own factory", answer: 0 },
        { text: "New lift installed in the office building", answer: 1, why: "Integral feature, special rate, new." },
        { text: "Second-hand forklift truck", answer: 4, why: "Second-hand assets get only AIA or WDA." },
        { text: "New electric car (0g/km)", answer: 3 },
        { text: "New excavators bought by a plant hire company to lease to customers", answer: 2, why: "Full expensing excludes leased assets; the 40% FYA covers them." },
        { text: "New petrol car (95g/km)", answer: 4, why: "Cars get no AIA or FYA except new zero-emission cars." },
      ],
      explain:
        "Full expensing and the 50% FYA are for new assets bought by a company for its own use. The 40% FYA fills the leasing gap. Cars get only the zero-emission 100% FYA or WDAs.",
    },
    {
      kind: "mcq",
      id: "group-aia",
      prompt: "A parent company and its two 100% subsidiaries each spend £600,000 on second-hand machinery. How much AIA can the group claim in total for a 12-month period?",
      options: ["£600,000", "£1,000,000", "£1,800,000", "£3,000,000"],
      answer: 1,
      explain: "A group gets a single £1,000,000 AIA, allocated between the companies as they choose.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-aia-amount",
      prompt: "What is the annual AIA limit for a 12-month accounting period?",
      options: ["£200,000", "£500,000", "£1,000,000", "Unlimited"],
      answer: 2,
      explain: "£1,000,000, now permanent.",
    },
    {
      kind: "mcq",
      id: "q-fe-who",
      prompt: "Who can claim full expensing?",
      options: ["Any business", "Companies, on new and unused main rate plant and machinery", "Sole traders only", "Companies, on any plant including cars"],
      answer: 1,
      explain: "Full expensing is for companies within CT, on new and unused main rate P&M, excluding cars.",
    },
    {
      kind: "mcq",
      id: "q-40-fya",
      prompt: "From what date is the 40% first-year allowance available?",
      options: ["1 April 2025", "1 January 2026", "1 April 2026", "6 April 2027"],
      answer: 1,
      explain: "Expenditure incurred on or after 1 January 2026.",
    },
    {
      kind: "mcq",
      id: "q-zec-end",
      prompt: "Until when (for corporation tax) is the 100% FYA available for new zero-emission cars?",
      options: ["31 March 2025", "31 March 2026", "31 March 2027", "Permanently"],
      answer: 2,
      explain: "It was extended by one year to 31 March 2027 (5 April 2027 for income tax).",
    },
    {
      kind: "mcq",
      id: "q-aia-cars",
      prompt: "Can a company claim AIA on a new van?",
      options: ["No: vehicles never qualify", "Yes: vans are plant and machinery, not cars", "Only if electric", "Only 50%"],
      answer: 1,
      explain: "Only cars are excluded from the AIA. Vans and lorries qualify (and new vans also qualify for full expensing).",
    },
    {
      kind: "mcq",
      id: "q-allocation",
      prompt: "A company has spent more than its AIA on a mix of new main rate and new special rate assets. Where should the AIA go first?",
      options: ["Main rate assets", "Special rate assets", "Split evenly", "It makes no difference"],
      answer: 1,
      explain: "New main rate assets get 100% full expensing anyway; special rate assets would only get 50% FYA, so the AIA is worth more there.",
    },
  ],
  sources: [
    { label: "Claim capital allowances: overview (GOV.UK)", url: "https://www.gov.uk/capital-allowances" },
    { label: "Claim capital allowances: 40% first-year allowance (GOV.UK)", url: "https://www.gov.uk/capital-allowances/40-first-year-allowance" },
    { label: "Capital allowances: new first-year allowance and reducing main rate WDA (policy paper)", url: "https://www.gov.uk/government/publications/new-first-year-allowance-and-main-rate-of-writing-down-allowances/capital-allowances-new-first-year-allowance-and-reducing-main-rate-writing-down-allowances" },
    { label: "Extension of FYAs for zero-emission cars and chargepoints (policy paper)", url: "https://www.gov.uk/government/publications/first-year-allowances-for-zero-emission-cars-and-electric-vehicle-chargepoints/capital-allowances-extension-of-first-year-allowances-for-zero-emission-cars-and-chargepoints" },
    { label: "CA23153: FYA for zero-emission cars", url: "https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca23153" },
    { label: "Claim capital allowances: annual investment allowance (GOV.UK)", url: "https://www.gov.uk/capital-allowances/annual-investment-allowance" },
  ],
};
