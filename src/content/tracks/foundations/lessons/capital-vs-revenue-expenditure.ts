import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "capital-vs-revenue-expenditure",
  title: "Capital vs revenue expenditure",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Deciding whether a cost goes on the balance sheet as a fixed asset or straight to the profit and loss account: what to include in the cost of an asset, repairs vs improvements, capitalisation policies, and why the answer matters for tax.",
  objectives: [
    "Distinguish capital from revenue expenditure using the enduring-benefit test",
    "Calculate the cost of a fixed asset, including directly attributable costs and excluding the rest",
    "Tell a repair from an improvement",
    "Correct a cost posted to the wrong side of the line and explain the effect on profit and tax",
  ],
  body: [
    {
      kind: "md",
      md: `Every purchase a client makes is either:

- **Capital expenditure:** buying, building or improving a long-term asset that the business will use over more than one accounting period (property, plant and machinery, vehicles, computers). It goes on the balance sheet as a **fixed asset** (tangible fixed asset or property, plant and equipment) and is charged to profit gradually through **depreciation**.
- **Revenue expenditure:** the day-to-day cost of running the business, including repairs and maintenance that keep an asset in its existing condition. It's charged to the profit and loss account in full in the period.

Getting this wrong misstates profit in both years, misstates the balance sheet and, very often, the tax computation.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What goes into the cost of an asset",
      md: `Under FRS 102 section 17 an item of property, plant and equipment is measured initially at **cost**: the purchase price (after trade discounts and rebates, including import duties and non-recoverable taxes) plus costs **directly attributable** to bringing it to the location and condition needed to operate, such as site preparation, delivery and handling, installation and assembly, and testing. Recoverable VAT is not part of cost. Running costs, training and general overheads are not included.`,
    },
    {
      kind: "table",
      caption: "Include or exclude?",
      head: ["Cost", "Treatment", "Why"],
      rows: [
        ["Purchase price less trade discount", "Capital", "Core cost of the asset"],
        ["Delivery, installation, testing", "Capital", "Directly attributable to getting it working"],
        ["Site preparation (e.g. reinforcing a floor for a machine)", "Capital", "Directly attributable"],
        ["Legal fees and stamp duty land tax on a property", "Capital", "Part of acquiring the asset"],
        ["Recoverable VAT", "Neither: VAT control", "Reclaimed from HMRC, so not a cost"],
        ["Staff training on the new machine", "Revenue", "Relates to staff, not to the asset's condition"],
        ["Maintenance contract or extended warranty", "Revenue (prepay any part for future years)", "Running cost"],
        ["Insurance and road tax on a new van", "Revenue", "Running cost"],
      ],
    },
    {
      kind: "md",
      md: `### Repairs vs improvements

A **repair** restores an asset to its previous condition: replacing broken roof tiles, fixing a van's gearbox, repainting. That's revenue, even if it's expensive.

An **improvement** gives the business something better or different: an extension, converting a storeroom into an office, adding a mezzanine floor. That's capital. Replacing a worn part with its modern equivalent (for example, old single-glazed windows with standard double glazing) is generally still treated as a repair, because the asset is simply restored using current materials.

Replacing an **entire separate asset** (a whole machine, a whole van) is capital; replacing a **part** of a larger asset (the roof of a building, a van's engine) is normally a repair. HMRC's guidance in BIM46900 onwards and the case law it summarises turns on "what is the asset?"`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Capitalisation policy",
      md: `Most firms set a **capitalisation threshold** (commonly a few hundred pounds) below which small items such as a £60 kettle are expensed even though they last more than a year. It's an application of materiality. Record the policy on the permanent file and apply it consistently. A £2,000 laptop is capital; a £25 mouse isn't, even though both last years.`,
    },
    {
      kind: "md",
      md: `### Why tax cares

Capital expenditure is **not deductible** as an expense in the tax computation, and accounting depreciation is added back. Instead, the business claims **capital allowances**. For most plant and machinery the **Annual Investment Allowance (AIA)** gives 100% relief up to **£1 million** a year, but it **doesn't** cover cars, which get writing down allowances instead. So for a typical small client, mis-coding a van as repairs might make no difference to the tax bill, but mis-coding a car, a building improvement or anything structural certainly can. Structures and buildings, for example, don't qualify for AIA at all.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Capitalising the gross invoice.** If the client is VAT registered and can recover the VAT, the asset cost is the **net** figure.
- **Expensing a big repair "because it's a repair" when it's really an improvement**, or capitalising a repair to protect profit. Read the invoice and ask what was done.
- **Lumping a maintenance contract or warranty into the asset cost.** Split the invoice.
- **Cars and AIA.** Don't assume a vehicle gets 100% relief: check whether it's a car or a commercial vehicle.`,
    },
  ],
  scenario: {
    title: "Ashdown Bakery's new oven",
    narrative: `**Ashdown Bakery Ltd** (VAT registered) bought a new deck oven. The supplier's invoice shows:

| Item | Net |
|---|---:|
| Deck oven | £18,000 |
| Delivery | £450 |
| Installation and commissioning | £1,200 |
| 3-year service contract | £900 |
| Training for two bakers | £300 |
| **Net total** | **£20,850** |
| VAT at 20% | £4,170 |
| **Gross** | **£25,020** |

In the same month the bakery paid **£2,800** to repair storm damage to the shop roof and **£24,000** (net) for a rear extension to add a packing room.`,
    walkthrough: [
      {
        kind: "md",
        md: `**The oven:** capital cost is the price plus the costs of getting it to the bakery and working: £18,000 + £450 + £1,200 = **£19,650**.

**Service contract (£900):** a running cost. It covers three years, so at the year end the unexpired part will be a prepayment.

**Training (£300):** revenue. It improves the staff, not the oven.

**VAT (£4,170):** recoverable, so it goes to VAT control.

**Roof repair (£2,800):** restores the roof to how it was. Revenue: repairs and maintenance.

**Extension (£24,000):** creates something new. Capital, and it's a building, so no AIA (it may qualify for structures and buildings allowance; flag it for the tax computation).`,
      },
      {
        kind: "journal",
        title: "Posting the oven invoice",
        lines: [
          { account: "Plant and machinery – cost", dr: 19650 },
          { account: "Repairs and maintenance", dr: 900 },
          { account: "Staff training", dr: 300 },
          { account: "VAT control", dr: 4170 },
          { account: "Trade payables", cr: 25020 },
        ],
      },
      {
        kind: "callout",
        tone: "example",
        title: "Effect if the whole oven invoice had been expensed",
        md: `Profit this year would be understated by £19,650 less the year's depreciation, and fixed assets understated by the same amount. Next year, profit would be overstated because there would be no depreciation charge. The tax position may be similar thanks to AIA, but the accounts would be wrong.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-capital-revenue",
      prompt: "Classify each cost for a VAT-registered client.",
      categories: ["Capital", "Revenue", "Neither (VAT control)"],
      items: [
        { text: "New delivery van, net price", answer: 0 },
        { text: "Road tax and first year's insurance on the new van", answer: 1 },
        { text: "Replacing the worn tyres on an existing van", answer: 1, why: "Restores it to its previous condition." },
        { text: "Legal fees on the purchase of a warehouse", answer: 0 },
        { text: "VAT on a new laptop, on a valid VAT invoice", answer: 2 },
        { text: "Building a mezzanine floor to double storage space", answer: 0, why: "An improvement that creates something new." },
        { text: "Repainting the shop front in the same colour", answer: 1 },
        { text: "Installation of a new CNC machine", answer: 0, why: "Directly attributable to bringing it into use." },
      ],
      explain:
        "Capital buys or improves something with an enduring benefit; revenue keeps the business and its assets running in their existing condition. Recoverable VAT is never part of the cost.",
    },
    {
      kind: "numeric",
      id: "machine-cost",
      prompt: `A VAT-registered manufacturer buys a machine. List price **£30,000** less a **5% trade discount**; delivery **£600**; installation **£1,400**; strengthening the factory floor to take the machine's weight **£2,000**; first-year maintenance contract **£1,200**; VAT on the whole invoice **£6,740**. What is the capital cost of the machine?`,
      answer: 32500,
      unit: "£",
      explain:
        "Include the discounted price and costs directly attributable to getting the machine to site and working (delivery, installation, site preparation). Exclude the maintenance contract (a running cost) and the recoverable VAT.",
      working: `List price £30,000 − 5% (£1,500) = £28,500

£28,500 + £600 + £1,400 + £2,000 = **£32,500**`,
    },
    {
      kind: "journal",
      id: "correct-capitalised-repair",
      prompt:
        "During the year a junior posted a **£3,200** invoice for repairing the office air-conditioning unit to *Office equipment – cost*. Post the correcting journal.",
      accounts: ["Repairs and maintenance", "Office equipment – cost", "Office equipment – accumulated depreciation", "Suspense", "Trade payables", "Bank"],
      answer: [
        { account: "Repairs and maintenance", dr: 3200 },
        { account: "Office equipment – cost", cr: 3200 },
      ],
      explain:
        "A repair is revenue. Move it from the asset to the expense. The original posting was an error of principle, so the TB balanced and no suspense account is involved. Check whether any depreciation was charged on the £3,200 and reverse that too.",
    },
    {
      kind: "mcq",
      id: "effect-of-expensing",
      prompt: "A £12,000 machine is wrongly posted to Repairs. What's the effect on this year's accounts, before depreciation?",
      options: [
        "Profit overstated £12,000, assets understated £12,000",
        "Profit understated £12,000, assets understated £12,000",
        "Profit understated £12,000, assets overstated £12,000",
        "No effect, because tax relief is the same",
      ],
      answer: 1,
      explain:
        "An extra £12,000 of expense reduces profit, and the machine is missing from fixed assets. AIA may mean the tax is similar, but the accounts are still wrong.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-definition",
      prompt: "Which best describes capital expenditure?",
      options: [
        "Any purchase over £1,000",
        "Spending that gives an enduring benefit by acquiring or improving a long-term asset",
        "Any cost paid from the business savings account",
        "Spending that HMRC allows as a deduction",
      ],
      answer: 1,
      explain: "It's about the nature of the spend, not the amount or how it was paid.",
    },
    {
      kind: "mcq",
      id: "q-training",
      prompt: "Training staff to use a newly purchased machine is:",
      options: ["Part of the machine's cost", "Revenue expenditure", "Deferred income", "A prepayment"],
      answer: 1,
      explain: "Training costs aren't directly attributable to bringing the asset into working condition, so they're expensed.",
    },
    {
      kind: "mcq",
      id: "q-aia-car",
      prompt: "A company buys a car for its sales manager. Can it claim the Annual Investment Allowance?",
      options: ["Yes, up to £1 million", "Yes, at 50%", "No, cars don't qualify for AIA", "Only if it's electric"],
      answer: 2,
      explain: "AIA can't be claimed on cars; writing down allowances (or first-year allowances for qualifying zero-emission cars) apply instead.",
    },
    {
      kind: "mcq",
      id: "q-repair-or-improvement",
      prompt: "A shop replaces broken single-glazed windows with identical single-glazed windows. This is:",
      options: ["Capital: it's a large spend", "Revenue: a repair restoring the original condition", "Capital: windows last years", "Neither"],
      answer: 1,
      explain: "Like-for-like replacement of part of a building restores it to its previous condition, so it's a repair.",
    },
    {
      kind: "mcq",
      id: "q-vat-cost",
      prompt: "A VAT-registered client buys equipment for £5,000 + £1,000 VAT. The cost to capitalise is:",
      options: ["£6,000", "£5,000", "£4,000", "£5,000 plus a 20% uplift"],
      answer: 1,
      explain: "Recoverable VAT goes to VAT control. Only non-recoverable VAT would be added to cost.",
    },
  ],
  sources: [
    { label: "HMRC Business Income Manual BIM35000 – capital/revenue divide", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim35000" },
    { label: "HMRC Business Income Manual BIM46900 – repairs and renewals", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46900" },
    { label: "HMRC Business Income Manual BIM46925 – repairs: improvements and modern equivalents", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46925" },
    { label: "HMRC Business Income Manual BIM31060 – property, plant and equipment", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim31060" },
    { label: "GOV.UK – Annual Investment Allowance", url: "https://www.gov.uk/capital-allowances/annual-investment-allowance" },
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
  ],
};
