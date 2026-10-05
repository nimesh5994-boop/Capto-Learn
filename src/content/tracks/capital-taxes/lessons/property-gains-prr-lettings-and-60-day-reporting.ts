import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "property-gains-prr-lettings-and-60-day-reporting",
  title: "Property gains: private residence relief, lettings relief and the 60-day return",
  level: "foundation",
  minutes: 40,
  summary:
    "How private residence relief (PRR) works including the 9-month final period and permitted absences, the narrow lettings relief that survives after April 2020, how to work out the chargeable gain on a former home or buy-to-let, and the 60-day reporting and payment deadline for UK residential property.",
  objectives: [
    "Apply private residence relief to a property with periods of occupation, absence and letting",
    "State the final period exemption and the permitted periods of absence",
    "Explain when lettings relief is and is not available and compute the limit",
    "Calculate the chargeable gain and tax on a part-exempt residential property",
    "Apply the 60-day reporting and payment rule and identify who must report",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Your clients' homes are usually exempt from CGT. But as soon as a home has been **let out**, **left empty** for a long time, or **bought as an investment**, the question becomes *how much* is exempt. And for most residential property gains the **tax must be reported and paid within 60 days of completion**, long before the Self Assessment return is due.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Private residence relief (TCGA 1992 ss222–226)",
      md: `A gain on a dwelling house that has been the owner's **only or main residence** is exempt for the periods of:

- **Actual occupation** as the main residence;
- **The final 9 months** of ownership, whatever the use (36 months for disabled owners or those in a care home);
- **Permitted absences**, but only if the owner **lived in the property before and after** (with limited exceptions): **any reason** up to **3 years** in total; **employment abroad**, any length; **work elsewhere in the UK** up to **4 years**.

The exempt fraction is: **(months of exempt occupation, absence and final period) ÷ total months of ownership**, applied to the whole gain. The garden or grounds must not exceed **half a hectare** (or the area needed for reasonable enjoyment). Any part used **exclusively for business** loses relief for that part.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Lettings relief (after 5 April 2020)",
      md: `Lettings relief is only available where the owner **shared the home with a tenant** (that is, part of the dwelling was let as residential accommodation while the owner also lived there). It **does not** apply where the **whole** property was let. The relief is the **lowest** of:

1. The PRR already given;
2. **£40,000**; and
3. The part of the gain attributable to the letting.

(Lodgers and a spare room let to a lodger don't normally lose PRR anyway, and the "rent-a-room" income rules are separate.)`,
    },
    {
      kind: "md",
      md: `### Two homes and elections

If a client has **two homes** (a residence and a second property), they can **nominate** which is their **main residence** for PRR by written notice to HMRC **within two years** of the date the combination of residences begins. Without a nomination, HMRC decides on the facts. If the individual's circumstances change, a fresh nomination can be made within two years.

### UK residential property: the 60-day return

If a UK resident sells UK residential property and there is **CGT to pay**, they must **report and pay within 60 days of completion** (for completions on or after 27 October 2021) using the **CGT on UK property** service, even though the gain is also later reported on the Self Assessment return. **Non-UK residents** must report **every** disposal of UK property or land, even if no tax is due. You may have to pay **interest and penalties** if the return is late. For the 60-day return the taxpayer pays on an **estimate**, using the rate they expect to pay for the year (taking account of any other gains and income) and the unused allowance.

### Practical points

- **Completion date** starts the clock, not exchange.
- **Spouses** who co-own report their own shares.
- **No tax due** (for UK residents) means no 60-day return is needed, but the gain may still need to appear on the SA return.
- Use the same **rate expectations** as the full-year position to avoid under-estimating.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mistakes to avoid",
      md: `- Applying **lettings relief** where the whole property was let.
- Treating **absences** as covered when the owner **never returned** to live there: only the **final 9 months** is covered in that case.
- Using **months** inconsistently. Count the whole months of ownership and of exempt periods carefully.
- Missing the **60-day** deadline because the SA return isn't due for months.
- Forgetting **SDLT and legal costs** as allowable acquisition and disposal costs.`,
    },
  ],
  scenario: {
    title: "A former home: the Whitlock flat",
    narrative: `Callum Whitlock bought a flat on **1 January 2010** for **£200,000** (plus **£6,000** acquisition costs). He lived in it as his main home until **31 December 2017**, then let the **whole flat** from **1 January 2018** and never moved back. He sold it, with **completion on 30 June 2026**, for **£450,000**, paying **£9,000** selling costs. Callum is a higher-rate taxpayer with no other gains in 2026/27. He has used no annual exempt amount.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the gain.** £450,000 − £9,000 = £441,000 net proceeds. Cost £200,000 + £6,000 = £206,000. Gain = **£235,000**.

**Step 2: months of ownership.** 1 January 2010 to 30 June 2026 = 16 years 6 months = **198 months**.

**Step 3: exempt months.**
- Occupation as main home: 1 January 2010 to 31 December 2017 = **96 months**.
- Absence after 2017: Callum **never returned**, so permitted absence cannot apply.
- Final period: the last **9 months** (October 2025 to June 2026) = **9 months**.
- Total exempt = 96 + 9 = **105 months**.

**Step 4: PRR.** Exempt fraction 105/198 = 0.5303. PRR = £235,000 × 105/198 = **£124,621.21**.

**Step 5: lettings relief.** The **whole flat** was let, so lettings relief is **not available**.

**Step 6: chargeable gain.** £235,000 − £124,621.21 = **£110,378.79**. Less annual exempt amount £3,000 = **£107,378.79**.

**Step 7: tax.** As a higher-rate taxpayer: £107,378.79 × 24% = **£25,770.91**.

**Step 8: reporting.** Completion on 30 June 2026 means the 60-day return and payment is due by **29 August 2026**. Callum should have reported an estimate by then and the figures later reconcile on the 2026/27 SA return.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "exempt-months",
      prompt: "A client owned a house for 120 months. They lived in it for 60 months, were away for 12 months and then lived in it again for 36 months, and the last 12 months of ownership were while it was empty. The 12-month absence is permitted. How many months qualify for private residence relief (including the final period of 9 months, which overlaps the last 12 months)?",
      answer: 117,
      unit: "months",
      explain: "Months of actual occupation plus permitted absence plus the final 9 months.",
      working: "Occupation 60 + 36 = 96; permitted absence 12 = 108; final 9 months = 9 → **117** months (the last 12 months of ownership: the final 9 months are covered, the first 3 are not).",
    },
    {
      kind: "numeric",
      id: "prr-gain",
      prompt: "A property has a gain of £180,000. The owner owned it for 150 months and 90 months qualify for PRR. What is the chargeable gain before the annual exempt amount (£)?",
      answer: 72000,
      unit: "£",
      explain: "Chargeable gain = gain × (months not exempt ÷ total months).",
      working: "Exempt = £180,000 × 90/150 = £108,000; chargeable = £180,000 − £108,000 = **£72,000**.",
    },
    {
      kind: "numeric",
      id: "lettings-relief-limit",
      prompt: "An owner shared their home with a tenant. PRR is £60,000, the gain attributable to the letting is £25,000 and the maximum is £40,000. What is the lettings relief (£)?",
      answer: 25000,
      unit: "£",
      explain: "The lowest of PRR, £40,000 and the letting gain.",
      working: "Lowest of £60,000, £40,000 and £25,000 = **£25,000**.",
    },
    {
      kind: "numeric",
      id: "days-to-report",
      prompt: "Within how many days of completion must CGT on a UK residential property sale be reported and paid?",
      answer: 60,
      unit: "days",
      explain: "60 days for completions on or after 27 October 2021.",
      working: "**60 days**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-final",
      prompt: "How long is the final period exemption for most owners?",
      options: ["3 months", "9 months", "18 months", "36 months"],
      answer: 1,
      explain: "9 months (36 months for disabled owners and care-home residents).",
    },
    {
      kind: "mcq",
      id: "q-absence",
      prompt: "What is the permitted absence for any reason?",
      options: ["1 year", "3 years", "6 years", "Unlimited"],
      answer: 1,
      explain: "Up to 3 years in total (with conditions).",
    },
    {
      kind: "mcq",
      id: "q-lettings",
      prompt: "Lettings relief after April 2020 applies where…",
      options: ["The whole property is let", "The owner shared the home with a tenant", "The owner lives abroad", "The property is let to a company"],
      answer: 1,
      explain: "Only shared occupation qualifies.",
    },
    {
      kind: "mcq",
      id: "q-lettings-max",
      prompt: "What is the maximum lettings relief?",
      options: ["£10,000", "£20,000", "£40,000", "£100,000"],
      answer: 2,
      explain: "The lowest of PRR, £40,000 and the letting gain.",
    },
    {
      kind: "mcq",
      id: "q-nominate",
      prompt: "How long does an individual have to nominate their main residence between two homes?",
      options: ["30 days", "6 months", "2 years", "4 years"],
      answer: 2,
      explain: "Two years from the date the combination of residences begins.",
    },
    {
      kind: "mcq",
      id: "q-nonres",
      prompt: "A non-UK resident sells UK property at a loss. Must they report it?",
      options: ["No", "Yes: non-residents must report all disposals of UK property or land even if no tax is due", "Only if over £100,000", "Only if within 30 days"],
      answer: 1,
      explain: "Non-residents must report all disposals.",
    },
  ],
  sources: [
    { label: "HS283 Private Residence Relief (2026) – GOV.UK", url: "https://www.gov.uk/government/publications/private-residence-relief-hs283-self-assessment-helpsheet/hs283-private-residence-relief-2026" },
    { label: "Report and pay Capital Gains Tax on UK property – GOV.UK", url: "https://www.gov.uk/report-and-pay-your-capital-gains-tax/if-you-sold-a-property-in-the-uk-on-or-after-6-april-2020" },
    { label: "Tax when you sell your home – GOV.UK", url: "https://www.gov.uk/tax-sell-home" },
    { label: "TCGA 1992 s223 – private residence relief", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/223" },
    { label: "Capital Gains Tax: tax on UK property for non-residents – GOV.UK", url: "https://www.gov.uk/guidance/capital-gains-tax-for-non-residents-uk-residential-property" },
  ],
};
