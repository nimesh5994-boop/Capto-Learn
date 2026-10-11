import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "structures-and-buildings-allowance",
  title: "Structures and buildings allowance (SBA)",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Relief at 3% a year for the cost of constructing or renovating non-residential buildings: what qualifies and what doesn't, when the claim starts, the allowance statement, and what happens when the building is sold.",
  objectives: [
    "Identify expenditure that qualifies for SBA and separate out land, integral features and other excluded costs",
    "Calculate SBA for a full year and for the period in which a building is first brought into use",
    "Explain the role of the allowance statement and how a purchaser claims",
    "Calculate the effect of SBA on a company's chargeable gain when it sells the building",
  ],
  body: [
    {
      kind: "md",
      md: `For decades there was no tax relief for the cost of most commercial buildings. The **structures and buildings allowance (SBA)** changed that for construction contracts entered into on or after **29 October 2018**. It's a slow, flat-rate relief, but on a £2m building it's £60,000 of deductions every year for more than 33 years, so missing it is expensive.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The basics",
      md: `- **Rate:** **3%** a year of the qualifying cost, straight line (2% before 1 April 2020 for CT).
- **Period:** 33⅓ years from the later of the date the building is first brought into **non-residential qualifying use** and the date the expenditure is incurred.
- **Qualifying use:** a trade, profession, a property business letting non-residential property, or managing investments.
- **No balancing adjustments:** the allowance isn't clawed back or accelerated on sale; the buyer simply continues claiming.
- **Part periods:** time-apportion by days in the AP in which the building comes into use (and in a short AP).`,
    },
    {
      kind: "table",
      caption: "What qualifies",
      head: ["Cost", "SBA?", "Instead"],
      rows: [
        ["Construction of offices, shops, factories, warehouses, surgeries, hotels", "Yes", ""],
        ["Renovation, conversion and fitting-out works on such buildings", "Yes", ""],
        ["Architects', engineers' and surveyors' fees for the construction; site preparation", "Yes", ""],
        ["Land, and legal costs of acquiring it", "No", "Base cost for chargeable gains"],
        ["Dwellings (houses, flats, student accommodation) and structures in their grounds", "No", "No relief"],
        ["Integral features (electrical, heating, lifts, air-conditioning, cold water)", "No", "Special rate P&M: AIA or 50% FYA"],
        ["Other plant and machinery in the building", "No", "P&M allowances"],
        ["Planning permission, financing costs, landscaping", "No", ""],
        ["Purchase of a newly built building from a developer", "Yes, on the price attributable to construction (excluding land)", ""],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The allowance statement",
      md: `Before anyone can claim, the **first user** must create an **allowance statement** recording: the address and description of the building; the date of the **earliest written construction contract**; the **total qualifying cost**; and the date **non-residential use began**. A buyer of a used building needs a copy from the seller, and can only claim with it. Ask for it at the purchase stage: it's much harder to get years later.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The sting on sale",
      md: `When a company sells a building it has claimed SBA on, the **total SBA claimed is added to its disposal proceeds** for chargeable gains. The SBA effectively becomes taxable at the end, as a capital gain rather than income. The **buyer** continues to claim 3% of the **original** qualifying cost (not what it paid) for the rest of the 33⅓ years, using the seller's allowance statement.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Split the build cost",
      md: `On a new build or major refurbishment, get the contractor's final account analysed (ideally with a capital allowances specialist) into land, SBA structure, integral features and other plant. Integral features and plant at 100% (AIA) or 50% FYA are worth far more than 3% a year, so don't let them get lumped into the SBA figure.`,
    },
  ],
  scenario: {
    title: "A new surgery for Moorside Veterinary Ltd",
    narrative: `**Moorside Veterinary Ltd** (Skipton) has built a new surgery under a contract signed in March 2025. It opened to clients on **1 October 2026**. The company's year end is **31 March**. Costs:

| Item | Cost |
|---|---:|
| Land | £300,000 |
| Legal fees on buying the land | £6,000 |
| Construction | £900,000 |
| Architect's fees | £60,000 |
| Planning permission | £8,000 |
| Electrical, lighting and heating systems | £140,000 |`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Split the costs.**
- SBA: construction £900,000 + architect £60,000 = **£960,000**
- Integral features (special rate P&M): **£140,000**: claim AIA (100%) this year
- Land and legal fees: no allowance (base cost for gains)
- Planning permission: no SBA

**2. SBA for the year ended 31 March 2027.** Brought into use on 1 October 2026, so the claim runs for 182 days of the 365-day AP:
£960,000 × 3% × 182/365 = **£14,360.55**

**3. Future years.** £960,000 × 3% = **£28,800** a year until 33⅓ years after 1 October 2026.

**4. Allowance statement.** Prepare it now with the contract date (March 2025), qualifying cost (£960,000) and first use (1 October 2026), and keep it with the deeds.`,
      },
      {
        kind: "table",
        caption: "Allowances on the surgery: year ended 31 March 2027",
        head: ["Cost", "Allowance", "Amount"],
        rows: [
          ["Integral features £140,000", "AIA", "£140,000.00"],
          ["Structure £960,000", "SBA 3% × 182/365", "£14,360.55"],
          ["Land, legal fees, planning £314,000", "None", "—"],
          ["**Total**", "", "**£154,360.55**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "sba-full-year",
      prompt: "A company has a warehouse with qualifying SBA expenditure of £2,000,000, in use for its trade throughout the year to 31 March 2027. What is the SBA?",
      answer: 60000,
      unit: "£",
      explain: "SBA is 3% a year of the qualifying cost.",
      working: "£2,000,000 × 3% = **£60,000**",
    },
    {
      kind: "numeric",
      id: "sba-part-year",
      prompt:
        "A new factory with qualifying SBA cost of £750,000 is first used on 1 January 2027. The company's year ends on 31 March 2027. Using months (3/12) for the apportionment, what is the SBA for the year?",
      answer: 5625,
      unit: "£",
      explain: "SBA starts when the building is brought into qualifying use and is time-apportioned in that year.",
      working: "£750,000 × 3% × 3/12 = **£5,625**",
    },
    {
      kind: "numeric",
      id: "sba-gain",
      prompt:
        "A company sells an office block (excluding land) for £1,400,000. It cost £1,000,000 to build (all qualifying for SBA) and the company has claimed £90,000 of SBA. Ignoring indexation (which is frozen and doesn't apply to this post-2017 cost), what is the chargeable gain on the building?",
      answer: 490000,
      unit: "£",
      explain: "SBA claimed is added to the disposal proceeds for chargeable gains.",
      working: "Proceeds £1,400,000 + SBA £90,000 = £1,490,000 − cost £1,000,000 = **£490,000**",
    },
    {
      kind: "classify",
      id: "sba-qualify",
      prompt: "A company refurbishes and extends its premises. How is each cost relieved?",
      categories: ["SBA", "Plant and machinery allowances", "No allowance"],
      items: [
        { text: "Building the extension's walls and roof", answer: 0 },
        { text: "New air-conditioning system", answer: 1, why: "Integral feature." },
        { text: "Buying the strip of adjoining land", answer: 2 },
        { text: "Structural engineer's fees for the extension", answer: 0 },
        { text: "Planning application fees", answer: 2 },
        { text: "New lighting system", answer: 1, why: "Integral feature." },
      ],
      explain: "The structure and professional fees for its construction get SBA; integral features get P&M allowances; land and planning costs get nothing.",
    },
    {
      kind: "mcq",
      id: "buyer-claim",
      prompt:
        "A company buys a used office building that the seller built for £800,000 and has claimed SBA on for 5 years. It pays £1.2m (excluding land). What SBA can the buyer claim each year?",
      options: ["3% of £1,200,000", "3% of £800,000, for the remainder of the 33⅓ years", "Nothing: SBA is only for the first owner", "3% of £400,000"],
      answer: 1,
      explain: "The buyer steps into the seller's shoes and claims 3% of the original qualifying cost for the rest of the period, using the allowance statement.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sba-rate",
      prompt: "What is the SBA rate for a company from 1 April 2020?",
      options: ["2%", "3%", "4%", "6%"],
      answer: 1,
      explain: "3% straight line.",
    },
    {
      kind: "mcq",
      id: "q-sba-contract-date",
      prompt: "SBA is available only where all construction contracts were entered into on or after:",
      options: ["1 April 2018", "29 October 2018", "1 April 2020", "1 January 2026"],
      answer: 1,
      explain: "29 October 2018.",
    },
    {
      kind: "mcq",
      id: "q-sba-dwellings",
      prompt: "A property company builds a block of flats to let. Can it claim SBA?",
      options: ["Yes, at 3%", "No: residential property is excluded", "Yes, at 2%", "Only for the communal areas"],
      answer: 1,
      explain: "Dwellings are excluded from SBA.",
    },
    {
      kind: "mcq",
      id: "q-sba-balancing",
      prompt: "What happens to SBA when the building is sold?",
      options: [
        "A balancing charge claws it back from the seller",
        "No balancing adjustment; the buyer continues claiming and the seller adds SBA claimed to its proceeds for gains",
        "The seller gets a balancing allowance",
        "The allowance restarts for 33⅓ years for the buyer",
      ],
      answer: 1,
      explain: "SBA has no balancing adjustments.",
    },
    {
      kind: "mcq",
      id: "q-allowance-statement",
      prompt: "Who must create the SBA allowance statement?",
      options: ["HMRC", "The first user of the building", "The local authority", "The building's architect"],
      answer: 1,
      explain: "The first user creates it; later owners need a copy to claim.",
    },
  ],
  sources: [
    { label: "Claiming capital allowances for structures and buildings (GOV.UK)", url: "https://www.gov.uk/guidance/claiming-capital-allowances-for-structures-and-buildings" },
    { label: "CA90000: Structures and buildings allowance (Capital Allowances Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-allowances-manual/ca90000" },
    { label: "Capital Allowances Act 2001 Part 2A", url: "https://www.legislation.gov.uk/ukpga/2001/2/part/2A" },
    { label: "Work out your writing down allowances: rates and pools (GOV.UK)", url: "https://www.gov.uk/work-out-capital-allowances/rates-and-pools" },
  ],
};
