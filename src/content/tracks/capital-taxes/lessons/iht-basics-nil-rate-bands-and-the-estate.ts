import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "iht-basics-nil-rate-bands-and-the-estate",
  title: "Inheritance tax: the estate, nil-rate bands and the residence nil-rate band",
  level: "foundation",
  minutes: 40,
  summary:
    "How IHT is charged on death: what is in the estate, the £325,000 nil-rate band and £175,000 residence nil-rate band with its £2 million taper, transferring unused bands between spouses, the 36% charity rate, the move to long-term UK residence as the test for foreign assets, and how to compute a basic IHT liability.",
  objectives: [
    "Identify what is included in an individual's estate on death and what can be deducted",
    "Apply the nil-rate band and residence nil-rate band, including the taper for estates over £2 million",
    "Transfer unused bands from a deceased spouse and calculate the total available",
    "Compute IHT at 40% and recognise when the 36% charity rate is relevant",
    "Explain the long-term UK residence test for the scope of IHT",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `**Inheritance tax (IHT)** is charged at **40%** on the value of a person's **estate** above the available **nil-rate bands**, and in some cases on lifetime gifts. Most estates pay no IHT because of the bands and the spouse exemption, but rising property values, the freezing of the bands until **5 April 2031** and the extension of IHT to pensions (from 6 April 2027) are bringing more estates in. Planning conversations start early.`,
    },
    {
      kind: "table",
      caption: "Key IHT thresholds (2026/27, frozen until 5 April 2031)",
      head: ["Item", "Amount", "Notes"],
      rows: [
        ["Nil-rate band (NRB)", "£325,000", "Per person; unused proportion transferable to a surviving spouse or civil partner"],
        ["Residence nil-rate band (RNRB)", "£175,000", "Only where the home (or its proceeds) passes to direct descendants; tapered for estates over £2 million"],
        ["RNRB taper threshold", "£2 million", "RNRB reduced by £1 for every £2 over £2 million"],
        ["Standard rate on the excess", "40%", ""],
        ["Reduced rate", "36%", "If at least 10% of the net estate (as defined) is left to charity"],
        ["Maximum for a couple using everything", "£1,000,000", "2 × (£325,000 + £175,000) if all bands are available"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What is in the estate? (IHTA 1984 s5)",
      md: `The **estate** is everything the deceased **owned immediately before death** (and had the right to dispose of), less **debts** (including the mortgage and unpaid taxes) and **funeral expenses**. It includes:

- Property, investments, cash, vehicles, business assets and personal possessions (at **open market value**).
- A **share of jointly-owned assets**: property held as **joint tenants** passes by survivorship but is still counted in the estate of the first to die (usually half).
- The value of **gifts with reservation of benefit** (given away but still enjoyed by the donor).
- **Life policies** not written in trust and in some cases **trust assets** in which the deceased had an interest in possession.
- **Death-in-service benefits** from an employer scheme are normally outside the estate if they are paid under discretion.
- **Pension funds**: unused pension funds and most death benefits will be included for deaths on or after **6 April 2027**.
- **Gifts made in the seven years before death** also affect the tax (next lesson).

**Domicile** was replaced on **6 April 2025** by **long-term UK residence** (resident in the UK for at least 10 of the preceding 20 tax years) as the test for whether **foreign assets** are within the charge. A person who leaves the UK stays in scope for a "tail" of between 3 and 10 years depending on how long they were resident.`,
    },
    {
      kind: "md",
      md: `### The residence nil-rate band (RNRB)

The RNRB (up to **£175,000**) is available where the estate includes a **qualifying residential interest** (a home the deceased lived in) that is **inherited by direct descendants** (children, step-children, adopted or foster children, and their lineal descendants and spouses). It is the **lower** of £175,000 and the value of the property passing to descendants. It is **tapered** where the net estate exceeds **£2 million**: reduced by **£1 for every £2** over the threshold (so it disappears at £2.35 million for a single person). **Downsizing** relief protects the RNRB if a home is sold or replaced by a lower-value property after 7 July 2015 and assets of equivalent value pass to descendants.

### Transferring bands between spouses

Any **unused percentage** of the NRB and RNRB on the first death can be **transferred** to the survivor, who can then claim up to **£650,000** NRB and **£350,000** RNRB (maximum, with the current amounts). The claim is made on the surviving spouse's estate (form **IHT402** for NRB; the RNRB on **IHT435**, with **IHT436** to transfer the unused RNRB). **Keep the first spouse's papers**, because the claim may come decades later.

### Exemptions that reduce the estate

- **Transfers to a UK-domiciled or long-term resident spouse or civil partner**: fully exempt. (Special rules limit the exemption where the recipient spouse is not a long-term resident but the transferor is.)
- **Gifts to UK charities** and some political parties.
- **Business property relief** and **agricultural property relief** (see the lesson on the 2026 reforms).
- **Woodlands**, heritage property and some other reliefs.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Questions to ask at the first meeting",
      md: `1. **What does the client own and owe** (including pensions and policies)?
2. **Marital status and any previous marriage**: unused bands from a deceased spouse?
3. **Who inherits the home?** Direct descendants are needed for the RNRB.
4. **Gifts in the last 7 years** (and regular gifts out of income).
5. **Wills and trusts**: are they up to date and do they use the bands effectively?
6. **Business or farm assets** that may qualify for relief.
7. **Any foreign assets** and the client's residence history.`,
    },
  ],
  scenario: {
    title: "Estate of Harold Dunmore",
    narrative: `Harold Dunmore, a widower, dies on **1 September 2026**. His wife Edith died in 2012, leaving her entire estate to Harold, so **100%** of her NRB is unused. Harold's estate comprises: house **£620,000** (left to his daughter), investments **£180,000**, bank **£40,000**. Liabilities: funeral **£6,000**, other debts **£4,000**. There are no lifetime gifts and no charity legacies. Pensions are excluded for this exercise (death before 6 April 2027).`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the estate.** Assets £620,000 + £180,000 + £40,000 = £840,000. Less liabilities £10,000 = **£830,000**.

**Step 2: nil-rate bands.**
- Harold's NRB: **£325,000**.
- Edith's unused NRB: **100% × £325,000 = £325,000** (transferred).
- RNRB: the home (£620,000) passes to a direct descendant, so Harold's RNRB is **£175,000**. Edith's RNRB: she died in 2012, before the RNRB existed, but where an estate passes entirely to a spouse the unused RNRB percentage is treated as **100%**, so a further **£175,000** is available. (Check the RNRB transfer rules in detail for pre-2017 deaths.)
- Total bands: £325,000 + £325,000 + £175,000 + £175,000 = **£1,000,000**.

**Step 3: tax.** Estate £830,000 is below £1,000,000 bands, so **IHT = nil**.

**Step 4: the claims.** The executors claim the **transferred NRB (IHT402)** and the **RNRB** with the transferred RNRB (IHT435 and IHT436), providing Edith's papers: marriage certificate, death certificate and evidence of her estate.

**Step 5: the same facts without Edith's unused bands.** Bands £325,000 + £175,000 = £500,000. Taxable = £330,000 × 40% = **£132,000**. That's the cost of not having the transfer, which is why the file from the first death matters.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "iht-simple",
      prompt: "A single person dies with an estate of £900,000, including a £450,000 home left to their children. No exemptions or other reliefs. NRB £325,000 and RNRB £175,000 available. What is the IHT (£)?",
      answer: 160000,
      unit: "£",
      explain: "Estate less the NRB and RNRB, charged at 40%.",
      working: "£900,000 − £325,000 − £175,000 = £400,000 × 40% = **£160,000**.",
    },
    {
      kind: "numeric",
      id: "rnrb-taper",
      prompt: "A single person's net estate is £2,200,000 and the home passes to descendants. By how much is the RNRB reduced by the taper (£)?",
      answer: 100000,
      unit: "£",
      explain: "£1 reduction for every £2 above £2 million.",
      working: "(£2,200,000 − £2,000,000) ÷ 2 = **£100,000** (RNRB becomes £75,000).",
    },
    {
      kind: "numeric",
      id: "transferred-bands",
      prompt: "A widow's estate is £1,200,000 including the home (£600,000 to her son). Her late husband left everything to her, so all his bands are unused. Using NRB £325,000 and RNRB £175,000 for both, what IHT is due (£)?",
      answer: 80000,
      unit: "£",
      explain: "Total bands £1,000,000; taxable £200,000 at 40%.",
      working: "£1,200,000 − £1,000,000 = £200,000 × 40% = **£80,000**.",
    },
    {
      kind: "classify",
      id: "classify-estate",
      prompt: "Is the item included in the estate on death (for a death in 2026, before 6 April 2027)?",
      categories: ["Included", "Not included"],
      items: [
        { text: "The deceased's half share of a jointly-owned home", answer: 0 },
        { text: "The funeral expenses", answer: 1, why: "They are a deduction from the estate." },
        { text: "A bank account in the deceased's sole name", answer: 0 },
        { text: "A discretionary death-in-service payment from the employer's scheme", answer: 1 },
        { text: "A gift made 3 years before death", answer: 1, why: "Not in the estate itself, but it may be taxed on its own account (next lesson)." },
      ],
      explain: "The estate is what the deceased owned at death less debts and funeral costs. Lifetime gifts are dealt with separately.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-nrb",
      prompt: "What is the nil-rate band in 2026/27?",
      options: ["£250,000", "£325,000", "£500,000", "£1,000,000"],
      answer: 1,
      explain: "£325,000, frozen until 5 April 2031.",
    },
    {
      kind: "mcq",
      id: "q-rnrb",
      prompt: "What is the residence nil-rate band?",
      options: ["£100,000", "£175,000", "£325,000", "£350,000"],
      answer: 1,
      explain: "£175,000.",
    },
    {
      kind: "mcq",
      id: "q-taper",
      prompt: "At what estate value does the RNRB taper start?",
      options: ["£1 million", "£1.5 million", "£2 million", "£2.35 million"],
      answer: 2,
      explain: "£2 million; reduced by £1 for every £2 over.",
    },
    {
      kind: "mcq",
      id: "q-charity",
      prompt: "What IHT rate applies where at least 10% of the net estate (as defined) is left to charity?",
      options: ["20%", "28%", "36%", "40%"],
      answer: 2,
      explain: "36% instead of 40%.",
    },
    {
      kind: "mcq",
      id: "q-ltr",
      prompt: "From 6 April 2025, what decides whether foreign assets are within the IHT charge?",
      options: ["Domicile", "Long-term UK residence (10 of the last 20 tax years)", "Nationality", "Place of death"],
      answer: 1,
      explain: "The long-term UK residence test replaced domicile.",
    },
    {
      kind: "mcq",
      id: "q-direct",
      prompt: "For the RNRB, the home must pass to…",
      options: ["Any beneficiary", "Direct descendants (children, grandchildren and their spouses)", "Siblings", "Charities"],
      answer: 1,
      explain: "Direct descendants.",
    },
  ],
  sources: [
    { label: "Inheritance Tax – GOV.UK", url: "https://www.gov.uk/inheritance-tax" },
    { label: "Inheritance Tax thresholds and interest rates – GOV.UK", url: "https://www.gov.uk/government/publications/rates-and-allowances-inheritance-tax-thresholds-and-interest-rates/inheritance-tax-thresholds-and-interest-rates" },
    { label: "IHTM47020 – long-term UK residence test", url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm47020" },
    { label: "Inheritance Tax Act 1984 s5 – estate", url: "https://www.legislation.gov.uk/ukpga/1984/51/section/5" },
    { label: "Inheritance Tax: main residence nil-rate band", url: "https://www.gov.uk/government/publications/inheritance-tax-main-residence-nil-rate-band-and-the-existing-nil-rate-band/inheritance-tax-main-residence-nil-rate-band-and-the-existing-nil-rate-band" },
  ],
};
