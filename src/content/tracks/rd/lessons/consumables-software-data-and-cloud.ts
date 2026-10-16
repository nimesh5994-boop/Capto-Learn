import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "consumables-software-data-and-cloud",
  title: "Qualifying costs (2): consumables, software, data, cloud and clinical trials",
  level: "practitioner",
  minutes: 35,
  summary:
    "The non-staff categories of qualifying expenditure: consumable and transformable items (and the exclusion for items sold), software, data licences and cloud computing (from April 2023), payments to clinical trial volunteers, the 'paid' requirement, and why capital spend goes to R&D allowances instead.",
  objectives: [
    "Identify qualifying consumables and apply the exclusion for consumables in products sold",
    "Apportion software, data licence and cloud computing costs used partly for R&D",
    "Recognise costs that never qualify, such as rent, rates, overheads and capital items",
    "Explain how capital expenditure on R&D is relieved through R&D allowances",
  ],
  body: [
    {
      kind: "md",
      md: `After staffing costs, the remaining categories of qualifying expenditure are smaller but generate a disproportionate number of errors. The categories are a **closed list**: if a cost doesn't fit one of them, it doesn't qualify, however closely it's linked to the project.`,
    },
    {
      kind: "table",
      caption: "Categories of qualifying expenditure (merged RDEC and ERIS)",
      head: ["Category", "What qualifies", "Key restriction"],
      rows: [
        ["Staffing costs", "Earnings, employer Class 1 NIC, pensions (see previous lesson)", "Directly and actively engaged; paid within 9 months"],
        ["Externally provided workers", "65% (unconnected) of staff provider payments", "UK PAYE condition"],
        ["Contracted-out R&D", "Payments to subcontractors (see next lesson)", "Overseas restriction; who is the decision-maker"],
        ["**Consumable or transformable items**", "Materials used up or transformed in the R&D, including **water, fuel and power**", "Excluded if they end up in products sold in the ordinary course of business"],
        ["**Software**", "Licences and software used directly in the R&D", "Apportion if also used for non-R&D work"],
        ["**Data licences**", "Licences for datasets used directly in the R&D (APs beginning on or after 1 April 2023)", "Must directly contribute to resolving the uncertainty (qualifying indirect activities don't count)"],
        ["**Cloud computing services**", "Computing, storage and related services used directly in the R&D (APs beginning on or after 1 April 2023)", "Direct R&D only, not qualifying indirect activities; apportion; exclude general IT hosting"],
        ["**Payments to clinical trial volunteers**", "Payments to subjects taking part in clinical trials", "Only for the trial itself"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Consumables in products that are sold",
      md: `Since 1 April 2015, the cost of consumables is **excluded** where they become part of an item produced in the R&D that is then **sold or transferred in the ordinary course of business** (CTA 2009 s1126A; see CIRD136000 for the merged scheme and ERIS, CIRD82300 for the old schemes). The exclusion only bites in the period of the sale. Items that are kept for more trials, scrapped as substandard, or sold only as waste can still qualify.

Example: a food manufacturer developing a shelf-stable recipe can claim ingredients for test batches that are thrown away, but not ingredients in batches sold to a supermarket.`,
    },
    {
      kind: "md",
      md: `### Apportioning mixed-use costs

Software, cloud and utility costs are often shared with the rest of the business. Use a reasonable, documented basis:

- **Power and water**: metered usage in the lab or test area, or floor area of the R&D space (HMRC accepts pragmatic methods).
- **Software**: users who are R&D staff × their R&D time, or a project-specific licence.
- **Cloud**: separate development/test environments or tagged resources in the cloud provider's billing; the production environment that serves customers is **not** R&D.
- **Data**: licences bought for the project versus general market data subscriptions.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Costs that never qualify",
      md: `- **Rent, rates, insurance and general overheads**, even for a dedicated lab (only the power and water used in the R&D are consumables).
- **Capital expenditure** such as equipment, computers and test rigs (see R&D allowances below).
- **Patent and legal costs**, which are commercial, not R&D.
- **Travel and subsistence**, recruitment and training courses not required for the R&D.
- **Production costs** of the commercial version of a product once the uncertainty is resolved.`,
    },
    {
      kind: "md",
      md: `### The 'paid' requirement

For accounting periods beginning on or after **1 April 2023**, software, consumables, data licences and cloud costs (like staffing costs and EPWs) must actually have been **paid** to qualify. An accrued supplier invoice that's unpaid when the claim is made won't count until it's paid. Check the purchase ledger after the year end.

### Capital expenditure: R&D allowances

Capital expenditure on R&D (plant, machinery, laboratory buildings, but not land or dwellings) isn't qualifying expenditure for the credit. Instead it may qualify for **research and development allowances (RDAs)** at **100%** in the year of spend (CAA 2001 Part 6). RDAs are a capital allowance deduction in computing profits; they don't generate an R&D credit.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Ask for a cost-by-project breakdown early",
      md: `Ask the client's finance team to code R&D materials, software and cloud spend to separate nominal codes or tracking categories from the start of the year. It makes the claim faster, more accurate and much easier to defend than a year-end trawl through the ledger.`,
    },
  ],
  scenario: {
    title: "Non-staff costs for Greenleaf Packaging Ltd",
    narrative: `Greenleaf Packaging Ltd is developing a compostable food tray that keeps its strength when wet. Its year ended 30 June 2026 (merged RDEC applies). The R&D manager has listed these costs, all paid by September 2026:

| # | Cost | Amount |
|---|---|---:|
| 1 | Biopolymer resins used in test moulding runs; all test trays scrapped | £18,400 |
| 2 | Resins used in a pilot run sold to a customer at full price | £6,200 |
| 3 | Electricity for the test lab (metered separately) | £4,800 |
| 4 | Rent of the test lab unit | £21,000 |
| 5 | Simulation software licence; used by R&D staff 75% and by production 25% | £9,600 |
| 6 | Cloud computing for materials-modelling simulations | £3,500 |
| 7 | New injection moulding test rig | £64,000 |
| 8 | Patent attorney fees for filing a patent | £7,500 |`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Test resins (£18,400).** Consumed in the R&D, and the trays were scrapped: **qualifies in full**.
2. **Pilot-run resins (£6,200).** They became part of trays sold in the ordinary course of business: **excluded** for this period.
3. **Lab electricity (£4,800).** Power used directly in the R&D, separately metered: **qualifies**.
4. **Lab rent (£21,000).** Rent is not a category of qualifying expenditure: **excluded**.
5. **Simulation software (£9,600).** Apportion to R&D use: 75% × £9,600 = **£7,200**.
6. **Cloud modelling (£3,500).** Cloud computing used directly in the R&D, accounting period beginning after 1 April 2023: **qualifies**.
7. **Test rig (£64,000).** Capital: not qualifying expenditure, but claim a **100% R&D allowance** in the CT computation.
8. **Patent fees (£7,500).** Commercial/legal protection: **excluded** (though deductible as a normal trading expense).`,
      },
      {
        kind: "table",
        caption: "Qualifying non-staff costs",
        head: ["Item", "Qualifying"],
        rows: [
          ["Test resins", "£18,400"],
          ["Lab electricity", "£4,800"],
          ["Simulation software (75%)", "£7,200"],
          ["Cloud computing", "£3,500"],
          ["**Total**", "**£33,900**"],
          ["Merged RDEC on these costs (20%)", "£6,780"],
          ["Test rig: R&D allowance (deduction, not credit)", "£64,000"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-non-staff",
      prompt: "An engineering company with an R&D project (merged RDEC applies) has these costs. Classify each.",
      categories: ["Qualifying expenditure", "R&D allowance (capital)", "Not R&D relief at all"],
      items: [
        { text: "Steel and alloys used to build test pieces that are destroyed in stress testing", answer: 0 },
        { text: "A 3D metal printer bought for the R&D lab", answer: 1, why: "Capital equipment used for R&D: 100% RDA." },
        { text: "Business rates on the R&D building", answer: 2 },
        { text: "Gas used to fire the test furnace", answer: 0, why: "Fuel and power are consumables." },
        { text: "Licence for finite element analysis software used only by the R&D team", answer: 0 },
        { text: "Legal fees for an IP licence negotiation", answer: 2 },
      ],
      explain: "Consumables (including fuel and power) and software used directly in the R&D are qualifying expenditure. Capital items get RDAs instead. Overheads such as rates and legal fees don't fall in any category.",
    },
    {
      kind: "numeric",
      id: "apportion-cloud-software",
      prompt:
        "A software company pays £24,000 for cloud computing in the year. The development and test environments used for an R&D project cost £9,000; the rest is the live production environment serving customers. It also pays £12,000 for developer tooling licences, used by 10 developers of whom 6 work 50% of their time on the R&D project and the other 4 not at all. What is the qualifying cloud and software expenditure?",
      answer: 12600,
      unit: "£",
      explain: "Only the R&D environments qualify for cloud. Software is apportioned by R&D usage: the share of licences used by R&D staff, times their R&D time.",
      working: "Cloud: £9,000. Software: £12,000 × 6/10 × 50% = £3,600. Total **£12,600**.",
    },
    {
      kind: "numeric",
      id: "consumables-sold",
      prompt:
        "A drinks company spends £15,000 on ingredients in an R&D project to develop a low-sugar formulation. £11,000 of ingredients go into trial batches that are poured away; £4,000 go into a batch that meets spec and is sold to a retailer in the ordinary course of business. How much is qualifying consumables expenditure?",
      answer: 11000,
      unit: "£",
      explain: "Consumables that become part of items sold in the ordinary course of business are excluded; those in discarded trial batches qualify.",
      working: "£15,000 − £4,000 sold = **£11,000**.",
    },
    {
      kind: "mcq",
      id: "paid-requirement",
      prompt:
        "At its year end of 31 March 2026, a company has an unpaid £5,000 invoice for R&D materials. The claim is being prepared in October 2026 and the invoice still hasn't been paid. What's the position?",
      options: [
        "It qualifies because it's accrued under GAAP",
        "It doesn't qualify yet because the paid requirement isn't met",
        "It qualifies at 65%",
        "It qualifies only under ERIS",
      ],
      answer: 1,
      explain: "For accounting periods beginning on or after 1 April 2023, consumables (and software, data and cloud) must have been paid to qualify.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rent",
      prompt: "Can rent on a building used only for R&D be included in qualifying expenditure?",
      options: ["Yes, in full", "Yes, apportioned by floor area", "No, rent is not a category of qualifying expenditure", "Only under ERIS"],
      answer: 2,
      explain: "Rent, rates and general overheads are not qualifying expenditure.",
    },
    {
      kind: "mcq",
      id: "q-cloud-date",
      prompt: "From when do data licences and cloud computing costs qualify?",
      options: ["Accounting periods beginning on or after 1 April 2021", "Accounting periods beginning on or after 1 April 2023", "Expenditure from 1 April 2024", "They don't qualify"],
      answer: 1,
      explain: "Data licences and cloud computing were added for accounting periods beginning on or after 1 April 2023.",
    },
    {
      kind: "mcq",
      id: "q-capital",
      prompt: "How is a new test machine used solely for R&D relieved?",
      options: [
        "As qualifying expenditure for the 20% credit",
        "Through a 100% research and development allowance",
        "It isn't relieved at all",
        "As a consumable",
      ],
      answer: 1,
      explain: "Capital expenditure on R&D is relieved by R&D allowances under CAA 2001 Part 6, not through the credit.",
    },
    {
      kind: "mcq",
      id: "q-power",
      prompt: "Which of these is a qualifying consumable?",
      options: ["Office stationery", "Electricity used to run test equipment", "Staff canteen food", "The company's insurance"],
      answer: 1,
      explain: "Water, fuel and power used directly in the R&D are consumable items.",
    },
    {
      kind: "mcq",
      id: "q-clinical",
      prompt: "A biotech company pays volunteers to take part in a clinical trial of a new treatment. Are the payments qualifying expenditure?",
      options: ["No, they're not employees", "Yes, payments to clinical trial volunteers are a category of qualifying expenditure", "Only at 65%", "Only if the volunteers are UK residents"],
      answer: 1,
      explain: "Payments to subjects of clinical trials are a specific category of qualifying expenditure.",
    },
  ],
  sources: [
    { label: "HMRC CIRD manual: categories of qualifying expenditure overview (CIRD82100)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird82100" },
    { label: "HMRC CIRD manual: consumable items (CIRD82300)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird82300" },
    { label: "HMRC CIRD manual: reformed reliefs – consumable items (CIRD136000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird136000" },
    { label: "HMRC CIRD manual: software (CIRD82500)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird82500" },
    { label: "HMRC CIRD manual: clinical trial volunteers (CIRD84400)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird84400" },
    { label: "HMRC: merged R&D expenditure credit scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
    { label: "Capital Allowances Act 2001 s441 – research and development allowances", url: "https://www.legislation.gov.uk/ukpga/2001/2/section/441" },
  ],
};
