import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cgt-losses-spouses-and-separation",
  title: "CGT losses, planning between spouses and the rules on separation",
  level: "practitioner",
  minutes: 35,
  summary:
    "How capital losses are used and reported, the four-year claim limit, negligible value claims, how spouses and civil partners can use both annual exempt amounts and basic-rate bands through no-gain/no-loss transfers, and the changed rules for separation from 6 April 2023.",
  objectives: [
    "Apply the order in which current-year and brought-forward losses are used against gains",
    "Explain the time limit for reporting losses and how losses carry forward",
    "Explain the connected-persons restriction and negligible value claims",
    "Use no-gain/no-loss transfers between spouses to reduce a family's CGT bill",
    "Apply the separation and divorce rules, including the three-year window and formal agreements",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Capital **losses** are valuable but easy to waste. Their use is governed by strict ordering rules and a reporting deadline. And because **spouses and civil partners** are taxed separately for CGT, a family can often reduce its tax bill simply by choosing **who owns what** before a sale, as long as the transfer is genuine.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Using losses (TCGA 1992 s2 and s16)",
      md: `1. **Current-year losses** are set against **current-year gains** in full, **before** the annual exempt amount, even if this wastes the exemption.
2. **Brought-forward losses** are then used only to the extent needed to reduce the remaining gains to the **annual exempt amount (£3,000)**. Any unused balance is carried forward.
3. Brought-forward losses are used **oldest first** (for 1996/97 and later).
4. **Reporting:** a loss must be **reported to HMRC within 4 years of the end of the tax year** in which it arose. If so, it can be carried forward **indefinitely**. A late-reported loss is lost.
5. **Connected persons:** a loss on a disposal to a **connected person** (family, trustees, some companies) can only be set against **gains on disposals to the same person**, not against general gains.
6. **Negligible value:** if an asset has become of negligible value (for example shares in an insolvent company) the owner can **claim** to be treated as having sold and reacquired it at its negligible value, crystallising the loss, with the claim allowed to take effect at an earlier date within limits.`,
    },
    {
      kind: "md",
      md: `### Spouses and civil partners

- Disposals between **spouses or civil partners living together** are at **no gain, no loss** (TCGA 1992 s58): the receiving spouse takes the original cost and acquisition date.
- Each spouse has their **own £3,000 annual exempt amount** and their **own basic-rate band**, so transferring part of an asset before a sale can use both and may bring gains into the **18%** band instead of **24%**.
- The transfer must be an **outright, unconditional gift**. If the proceeds are in practice passed back, HMRC may deny the planning (and the settlements rules in the directors track warn about income-producing property).
- **Joint assets** are split according to the beneficial ownership (equal shares unless a declaration of trust says otherwise, with the Form 17 rules for jointly-owned rental property).
- Transfers to a spouse should be made **before** the contract for sale is unconditional, and ideally well before the sale.

### Separation and divorce (from 6 April 2023)

- Transfers between separating spouses are at **no gain, no loss** for up to the **end of the third tax year after** the year in which they stopped living together (or earlier if a divorce or dissolution is granted).
- Transfers made **under a formal divorce or separation agreement or a court order** can be made at **no gain/no loss with no time limit**.
- Special **private residence relief** rules can extend relief on the former family home to the spouse who has left, where they keep an interest in the home and it is later sold. Check HMRC's guidance (CG65300 onwards) because the position depends on the facts and the agreement.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Using brought-forward losses first** (or to wipe out the whole gain) instead of stopping at the annual exempt amount.
- **Not reporting a loss** in time (4 years from the end of the tax year of disposal).
- Treating a loss on a **sale to a family member** as available against any gain.
- Making a transfer to a spouse that is **conditional** on the sale proceeds being returned.
- Forgetting that **both spouses' tax positions** change if one has an income and the other doesn't. Check the basic-rate band available to each.`,
    },
  ],
  scenario: {
    title: "Two stories: the Penhallow family",
    narrative: `**1. Losses.** In 2026/27 Gareth Penhallow makes gains of **£25,000** on a share sale and a current-year loss of **£8,000** on another disposal. He has **£20,000** of capital losses brought forward (properly reported).

**2. Spouses.** John Whittle (additional-rate taxpayer) is about to sell shares with a gain of **£30,000** in 2026/27. His wife, Mary, has income of **£10,000** (below the personal allowance) and no gains.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Gareth's losses.**
- Gains £25,000 − current-year loss £8,000 = **£17,000**.
- Brought-forward losses are used only to reduce this to the annual exempt amount: £17,000 − £3,000 = **£14,000** of losses used.
- Taxable gain = **nil** (the £3,000 is covered by the annual exempt amount).
- Losses carried forward: £20,000 − £14,000 = **£6,000**.

**2. John and Mary.**
- **John alone:** (£30,000 − £3,000) × 24% = **£6,480**.
- **Transfer half to Mary first (no gain/no loss):** gain £15,000 each.
 - John: (£15,000 − £3,000) × 24% = **£2,880**.
 - Mary: her taxable income is nil after the personal allowance, so her whole basic-rate band is unused. (£15,000 − £3,000) × 18% = **£2,160**.
 - Total **£5,040**.
- **Saving = £1,440.** The transfer must be a genuine gift, completed before the sale contract.

**Notes for the file.** Record the transfer, the date, and the declaration of ownership. Check that Mary's other income and gains for the year don't change the position.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "b-f-losses-used",
      prompt: "A taxpayer has net gains of £14,000 for the year after current-year losses, and £30,000 of brought-forward losses. How much of the brought-forward losses are used this year (£)? The annual exempt amount is £3,000.",
      answer: 11000,
      unit: "£",
      explain: "Use brought-forward losses only to reduce the gain to the annual exempt amount.",
      working: "£14,000 − £3,000 = **£11,000** used; £19,000 carried forward.",
    },
    {
      kind: "numeric",
      id: "spouse-saving",
      prompt: "A higher-rate taxpayer has a gain of £21,000. If half is transferred to a spouse with no income (so all their basic-rate band is available), what is the total CGT saving compared with the higher-rate taxpayer selling alone? Rates 18%/24%, annual exempt amount £3,000 each.",
      answer: 1170,
      unit: "£",
      explain: "Compare tax on the whole gain at 24% with tax on two halves at 24% and 18%.",
      working: "Alone: (£21,000 − £3,000) × 24% = £4,320. Split £10,500 each: higher-rate (£10,500 − £3,000) × 24% = £1,800; spouse (£10,500 − £3,000) × 18% = £1,350; total £3,150. Saving = **£1,170**.",
    },
    {
      kind: "mcq",
      id: "mcq-report-loss",
      prompt: "By when must a capital loss be reported to HMRC to be carried forward?",
      options: ["Within 1 year", "Within 4 years of the end of the tax year of the loss", "Within 6 years", "It carries forward automatically"],
      answer: 1,
      explain: "4 years from the end of the tax year in which the loss arose.",
    },
    {
      kind: "classify",
      id: "classify-separation",
      prompt: "Is the transfer between spouses likely to be at no gain, no loss?",
      categories: ["No gain / no loss", "Not no gain / no loss"],
      items: [
        { text: "A transfer between spouses living together", answer: 0 },
        { text: "A transfer in the year the couple stopped living together", answer: 0 },
        { text: "An informal transfer 5 tax years after the year of separation, with no formal agreement and the couple not yet divorced", answer: 1, why: "Outside the 3-year window, and not under a formal agreement." },
        { text: "A transfer made under a court order after a divorce, 6 years after separation", answer: 0, why: "Transfers under a formal agreement or court order have no time limit." },
      ],
      explain: "Informal transfers are limited to the three-year window; transfers under a formal agreement or court order are unlimited.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-current",
      prompt: "How must current-year losses be used?",
      options: ["Only if the taxpayer chooses", "Set against current-year gains in full, even if the annual exempt amount is wasted", "Carried forward only", "Set against income"],
      answer: 1,
      explain: "Current-year losses must be used in full against current-year gains.",
    },
    {
      kind: "mcq",
      id: "q-bf",
      prompt: "Brought-forward losses can reduce gains to…",
      options: ["Nil", "The annual exempt amount", "Half the gain", "£12,570"],
      answer: 1,
      explain: "Not below the annual exempt amount.",
    },
    {
      kind: "mcq",
      id: "q-connected",
      prompt: "A loss on a sale to a connected person can be set against…",
      options: ["Any gain", "Gains on disposals to the same person only", "Income", "Gains of the spouse"],
      answer: 1,
      explain: "The connected persons restriction.",
    },
    {
      kind: "mcq",
      id: "q-window",
      prompt: "After separation, informal no gain/no loss transfers are allowed up to the end of which year?",
      options: ["The year of separation only", "The third tax year after the year of separation", "The tenth year", "No limit"],
      answer: 1,
      explain: "Up to the end of the third tax year after that in which they ceased living together.",
    },
    {
      kind: "mcq",
      id: "q-negligible",
      prompt: "A negligible value claim lets the owner…",
      options: ["Avoid reporting", "Be treated as selling and reacquiring the asset at its negligible value", "Claim BADR", "Claim a refund of income tax"],
      answer: 1,
      explain: "It crystallises the capital loss.",
    },
  ],
  sources: [
    { label: "Capital Gains Tax: if you make a loss – GOV.UK", url: "https://www.gov.uk/capital-gains-tax/losses" },
    { label: "Capital Gains Tax: separation and divorce – GOV.UK", url: "https://www.gov.uk/government/publications/capital-gains-tax-transfers-of-assets-between-spouses-and-civil-partners-in-the-process-of-separating/capital-gains-tax-separation-and-divorce" },
    { label: "CG22420 – transfers between spouses: separation, divorce or dissolution", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg22420" },
    { label: "HS227 Losses (2025) – GOV.UK", url: "https://www.gov.uk/government/publications/losses-hs227-self-assessment-helpsheet/hs227-losses-2025" },
    { label: "TCGA 1992 s58 – spouses and civil partners", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/58" },
  ],
};
