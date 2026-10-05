import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "lifetime-gifts-pets-taper-relief-and-exemptions",
  title: "Lifetime gifts: exemptions, PETs, the seven-year rule and taper relief",
  level: "practitioner",
  minutes: 40,
  summary:
    "How gifts made during life are treated for IHT: the everyday exemptions (annual, small gifts, marriage, normal expenditure out of income), potentially exempt transfers and the seven-year rule, how taper relief reduces the tax on gifts above the nil-rate band, and gifts with reservation of benefit.",
  objectives: [
    "Apply the IHT exemptions for lifetime gifts, including the annual exemption carry-forward and normal expenditure out of income",
    "Explain how a potentially exempt transfer becomes chargeable if the donor dies within seven years",
    "Apply the nil-rate band to lifetime gifts in date order and calculate the tax on a failed PET",
    "Calculate taper relief and explain what it reduces",
    "Recognise a gift with reservation of benefit and explain its consequence",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Giving assets away during life is the main way to reduce an estate, but IHT has a long memory. A gift to an individual is a **potentially exempt transfer (PET)**: free of tax **if the donor survives seven years**, but taxable if the donor dies within that period. Understanding the exemptions, the order in which bands are used and **taper relief** is essential for any planning conversation.`,
    },
    {
      kind: "table",
      caption: "Main exemptions for lifetime gifts (IHTA 1984 ss19–22)",
      head: ["Exemption", "Amount", "Notes"],
      rows: [
        ["Annual exemption", "£3,000 per tax year", "Unused amount can be carried forward **one** tax year only (use the current year first)"],
        ["Small gifts", "£250 per recipient per tax year", "Cannot be combined with another exemption for the same recipient"],
        ["Gifts in consideration of marriage or civil partnership", "£5,000 from a parent; £2,500 from a grandparent or remoter ancestor (or a party to the marriage); £1,000 from anyone else", "Made on or just before the marriage"],
        ["Normal expenditure out of income", "No limit", "Gifts must be **habitual**, made out of **income** (not capital) and leave the donor with enough income to maintain their normal standard of living"],
        ["Gifts between spouses or civil partners", "Unlimited", "Subject to the special rules where the recipient is not a long-term UK resident"],
        ["Gifts to UK charities", "Unlimited", "Also exempt for CGT"],
        ["Maintenance of family", "Reasonable amounts", "For a spouse, ex-spouse, children in education"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Potentially exempt transfers (PETs)",
      md: `- A **gift to an individual** (or to a bare trust, or certain trusts for disabled people) is a **PET**. It has **no immediate IHT** and it is not reported unless it later becomes chargeable.
- If the **donor survives seven years**, the PET is **completely exempt**.
- If the donor **dies within seven years**, the PET **becomes chargeable** at the death rates (40%), using the **nil-rate band available at the date of death**, and the **value** is the value **at the date of the gift** (less any exemptions).
- PETs are set against the **nil-rate band in date order**, **before** the estate. If the PETs in the **seven years before death** use up the NRB, the estate gets little or no NRB.
- **Taper relief** reduces the **tax** (not the value of the gift) if the donor dies more than three years after the gift, and **only where the gift exceeds the NRB**.
- The **donee** pays the tax on a failed PET (the personal representatives only if the donee doesn't).`,
    },
    {
      kind: "table",
      caption: "Taper relief on tax due on lifetime gifts (years between the gift and death)",
      head: ["Years between gift and death", "Percentage of the tax payable", "Reduction"],
      rows: [
        ["Less than 3", "100%", "0%"],
        ["3 to 4", "80%", "20%"],
        ["4 to 5", "60%", "40%"],
        ["5 to 6", "40%", "60%"],
        ["6 to 7", "20%", "80%"],
      ],
    },
    {
      kind: "md",
      md: `### Order of working for a death within seven years

1. List all gifts in the **seven years before death**, in **date order**, with their values at the date of the gift.
2. Deduct the **annual exemption** (current year first, then the previous year's unused exemption) and other exemptions that apply (they are allocated to the **earliest** gift in the tax year).
3. Set the **net gifts** against the **nil-rate band** in date order. The NRB used by gifts is **no longer available to the estate**.
4. Charge the **excess** at 40%.
5. Apply **taper relief** to that tax according to the years between the gift and death.
6. Deduct any **lifetime IHT already paid** (for chargeable lifetime transfers, see the next lesson) and compute the estate with the **remaining NRB**.

### Gifts with reservation of benefit (GWR)

If a donor gives an asset away but **continues to benefit** from it (for example gifting a home and continuing to live there rent-free), the asset is treated as **still in the estate** at death (FA 1986 s102). The 7-year clock never starts (unless the reservation ends). The usual fix is to pay a **full market rent**, or to **stop** the reservation, and then wait seven years. For **pre-owned assets**, an **income tax charge (POAT)** may arise.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Evidence matters",
      md: `Executors must be able to show **what was given, when and to whom**, and that normal-expenditure gifts were **regular and from income**. Advise clients to keep a **gifts register** with dates, amounts, recipients and bank evidence, and a note explaining that regular gifts were made from income. HMRC will ask about gifts in the seven years before death on the **IHT400** (and form IHT403).`,
    },
  ],
  scenario: {
    title: "A failed PET: Rosalind Ashby",
    narrative: `Rosalind Ashby gave her son **£400,000 cash on 1 January 2024**. It was her only gift apart from small birthday presents. She had made no other gifts in 2022/23 or 2023/24, so she is entitled to the annual exemption for 2023/24 **and** the unused exemption for 2022/23. She dies on **15 March 2027**. Assume the nil-rate band is £325,000. Her estate is otherwise modest.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the gift becomes chargeable.** Rosalind died within seven years (3 years and about 2.5 months), so the PET is chargeable.

**Step 2: exemptions.** The gift is made in 2023/24. Annual exemption £3,000 for that year plus the unused £3,000 from 2022/23 = **£6,000**. Net PET = £400,000 − £6,000 = **£394,000**.

**Step 3: nil-rate band.** There are no earlier gifts, so the PET is set against the full NRB of £325,000. Taxable excess = £394,000 − £325,000 = **£69,000**.

**Step 4: tax before taper.** £69,000 × 40% = **£27,600**.

**Step 5: taper relief.** Death between 3 and 4 years after the gift: tax payable is **80%**. £27,600 × 80% = **£22,080**, payable by the son.

**Step 6: effect on the estate.** The PET used the whole NRB, so Rosalind's estate has **no nil-rate band** left for her death (apart from the RNRB if it applies). Executors should reflect that in the IHT400.

**Step 7: if she had survived to 1 January 2031** (7 years), the gift would have been completely exempt.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "pet-net",
      prompt: "A donor gives £250,000 to a child in 2025/26. They had made no other gifts in 2025/26 or 2024/25 (so the annual exemptions of £3,000 for each year are available). What is the net value of the PET after exemptions (£)?",
      answer: 244000,
      unit: "£",
      explain: "£3,000 for the current year plus £3,000 unused from the previous year.",
      working: "£250,000 − £6,000 = **£244,000**.",
    },
    {
      kind: "numeric",
      id: "taper-tax",
      prompt: "Tax of £40,000 is due on a failed PET. The donor died 5 years and 3 months after the gift. What is the tax payable after taper relief (£)?",
      answer: 16000,
      unit: "£",
      explain: "Death between 5 and 6 years after the gift: taper relief of 60%, so 40% of the tax is payable.",
      working: "£40,000 × 40% = **£16,000**.",
    },
    {
      kind: "numeric",
      id: "failed-pet-tax",
      prompt: "A single failed PET of £500,000 (net, no earlier gifts) is made 2 years before death. NRB £325,000. What is the IHT payable (£)?",
      answer: 70000,
      unit: "£",
      explain: "No taper relief within 3 years; excess over the NRB at 40%.",
      working: "(£500,000 − £325,000) × 40% = £175,000 × 40% = **£70,000**.",
    },
    {
      kind: "classify",
      id: "classify-gifts",
      prompt: "Is the gift covered by an IHT exemption?",
      categories: ["Exempt", "Not exempt (PET or other treatment)"],
      items: [
        { text: "A £200 gift to a grandchild (no other gifts to that grandchild in the year)", answer: 0, why: "Small gifts exemption up to £250." },
        { text: "£5,000 given to a daughter on her wedding day by her father", answer: 0, why: "Marriage gift exemption for a parent." },
        { text: "£50,000 given to a friend", answer: 1, why: "A PET (after any annual exemption)." },
        { text: "Regular monthly gifts of £800 out of surplus income that leave the donor's lifestyle unaffected", answer: 0, why: "Normal expenditure out of income." },
        { text: "A £30,000 gift to a spouse (UK domiciled/long-term resident)", answer: 0, why: "Spouse exemption." },
      ],
      explain: "Check the specific exemption conditions.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-years",
      prompt: "A PET becomes completely exempt if the donor survives…",
      options: ["3 years", "5 years", "7 years", "14 years"],
      answer: 2,
      explain: "Seven years.",
    },
    {
      kind: "mcq",
      id: "q-annual",
      prompt: "How much of an unused annual exemption can be carried forward?",
      options: ["None", "One year's only", "Three years' worth", "Unlimited"],
      answer: 1,
      explain: "Unused annual exemption can be carried forward for one tax year only.",
    },
    {
      kind: "mcq",
      id: "q-taper",
      prompt: "Taper relief reduces…",
      options: ["The value of the gift", "The tax payable on the gift (where it exceeds the NRB)", "The estate", "The donor's income tax"],
      answer: 1,
      explain: "It reduces the tax, not the value, and only on gifts above the NRB.",
    },
    {
      kind: "mcq",
      id: "q-gwr",
      prompt: "A parent gives away their home but continues to live in it rent-free. For IHT it is…",
      options: ["A completed PET", "A gift with reservation of benefit, so still in the estate", "Exempt as a family gift", "A chargeable lifetime transfer"],
      answer: 1,
      explain: "A GWR: the asset remains in the estate.",
    },
    {
      kind: "mcq",
      id: "q-small",
      prompt: "What is the small gifts exemption per recipient per tax year?",
      options: ["£100", "£250", "£500", "£1,000"],
      answer: 1,
      explain: "£250.",
    },
    {
      kind: "mcq",
      id: "q-who-pays",
      prompt: "Who normally pays the IHT on a failed PET?",
      options: ["The donor's estate", "The donee", "The pension scheme", "HMRC"],
      answer: 1,
      explain: "The donee, with the personal representatives liable only if the donee does not pay.",
    },
  ],
  sources: [
    { label: "Inheritance Tax: gifts – GOV.UK", url: "https://www.gov.uk/inheritance-tax/gifts" },
    { label: "IHTA 1984 s3A – potentially exempt transfers", url: "https://www.legislation.gov.uk/ukpga/1984/51/section/3A" },
    { label: "IHTA 1984 s7 – rates and taper relief", url: "https://www.legislation.gov.uk/ukpga/1984/51/section/7" },
    { label: "Finance Act 1986 s102 – gifts with reservation", url: "https://www.legislation.gov.uk/ukpga/1986/41/section/102" },
  ],
};
