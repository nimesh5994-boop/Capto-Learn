import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cgt-computation-rates-and-annual-exempt-amount",
  title: "Capital gains tax: computing the gain and the tax for 2026/27",
  level: "foundation",
  minutes: 35,
  summary:
    "The building blocks of a CGT computation: what is a disposal, how to calculate the gain, the allowable costs, market value rules, the exempt assets, and how the 2026/27 rates (18% and 24%) and £3,000 annual exempt amount produce the tax.",
  objectives: [
    "Identify a chargeable disposal of a chargeable asset and its date",
    "Calculate a gain or loss from proceeds, allowable costs and enhancement expenditure",
    "Apply market value where an asset is given away or sold to a connected person",
    "List the main exempt assets and the £6,000 chattels rule",
    "Calculate CGT for 2026/27 using the basic-rate band, 18% and 24% rates and the annual exempt amount",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Capital gains tax (CGT) is charged on the **gain** an individual (or trustee or personal representative) makes when they **dispose of a chargeable asset**. The basic computation is simple; the difficulties come from the **reliefs**, the **matching rules** and the **reporting deadlines**, which later lessons cover. Get the framework right first.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The computation (TCGA 1992)",
      md: `1. **Disposal proceeds** (or **market value** if the asset is given away, or sold at undervalue to a **connected person**).
2. Less **incidental costs of disposal** (agent, legal, advertising).
3. Less the **allowable cost**: the original **acquisition cost** and **incidental costs of acquisition** (including SDLT, fees), and **enhancement expenditure** reflected in the state of the asset at disposal.
4. = **Chargeable gain** (or **allowable loss**).
5. Deduct current-year **losses**, then brought-forward losses (to the extent needed), then the **annual exempt amount (£3,000)**.
6. The balance is **taxable** at 18% or 24% (see below).`,
    },
    {
      kind: "table",
      caption: "CGT rates and allowance for 2026/27 (verified on GOV.UK)",
      head: ["Item", "2026/27"],
      rows: [
        ["Annual exempt amount (individuals)", "£3,000"],
        ["Rate: gains within the unused basic-rate band", "18%"],
        ["Rate: gains above the basic-rate band (higher and additional-rate taxpayers)", "24%"],
        ["Residential property gains", "Same rates: 18% / 24%"],
        ["Business Asset Disposal Relief", "18% on qualifying gains (£1 million lifetime limit)"],
        ["Trustees and personal representatives", "24%"],
      ],
    },
    {
      kind: "md",
      md: `### What counts as a disposal

A **disposal** includes a sale, a **gift**, an exchange, and the loss or destruction of an asset (with insurance proceeds). It happens when the **contract becomes unconditional**, not at completion: for land, the date contracts are **exchanged** (unless conditional). Death isn't a disposal: the heirs acquire at **market value at death** (a "rebasing"), and there's no CGT on the death itself.

### Market value rules

If an asset is **given away**, or **sold for less than its market value** to a **connected person** (family, business partners, certain trusts and companies), the proceeds are **treated as market value**. Between **spouses or civil partners living together** disposals are made at **no gain, no loss**, so the receiving spouse takes over the original cost and date of acquisition.

### Main exempt assets

- Your **only or main home** (private residence relief).
- **Private cars**.
- **Chattels** (tangible movable property) **sold for £6,000 or less**. Above that, "marginal relief" limits the gain to 5/3 of the excess over £6,000. Chattels that are **wasting** (expected life of 50 years or less) are generally exempt.
- **ISA** investments, **Premium Bonds**, **UK government gilts** and most **qualifying corporate bonds**.
- Betting, lottery and prize winnings.
- Decorations for valour (if not purchased).

### Who pays, when, and how

UK residents are chargeable on **worldwide** gains. CGT is normally reported on the **Self Assessment return** (SA108) and paid by **31 January** following the end of the tax year, but **UK residential property** disposals must be reported and paid within **60 days** (see the next lessons).`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "How the rate is decided",
      md: `The **taxable gain** is added to the individual's **taxable income** (after allowances) to see how much of the **basic-rate band (£37,700)** is unused. The part of the gain that fits in the unused band is taxed at **18%**; the rest at **24%**. Gains eligible for BADR (or other lower rates) are dealt with separately. Always work out the client's **taxable income first**, including salary and dividends.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common errors",
      md: `- Forgetting **incidental costs** (SDLT, legal and agent fees, valuation fees).
- Treating **improvement** costs that no longer exist in the property (a bathroom replaced, a conservatory demolished) as allowable.
- Using the **wrong date**: unconditional contract date, not completion, for the tax year.
- Forgetting that **losses** against a gain in the same year must be used in full, even if that wastes the annual exempt amount.
- Ignoring **connected persons**: the sale at a "friends and family price" is taxed at market value.`,
    },
  ],
  scenario: {
    title: "Selling shares: Nadia Rahman",
    narrative: `Nadia Rahman, a basic-rate taxpayer, has a salary of £30,000 in 2026/27 and no other income. In August 2026 she sells her holding in an unlisted company for **£92,000**, with **£1,000** of sale costs. She bought the shares in 2018 for **£40,000** and paid **£1,000** in fees. No other gains or losses. The shares don't qualify for BADR.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the gain.** Proceeds £92,000 − sale costs £1,000 = £91,000. Cost £40,000 + fees £1,000 = £41,000. Gain = £91,000 − £41,000 = **£50,000**.

**Step 2: annual exempt amount.** £50,000 − £3,000 = **£47,000** taxable gain.

**Step 3: how much of the basic-rate band is unused?** Taxable income = £30,000 − £12,570 personal allowance = £17,430. Unused band = £37,700 − £17,430 = **£20,270**.

**Step 4: tax.**
- £20,270 × 18% = **£3,648.60**
- (£47,000 − £20,270) = £26,730 × 24% = **£6,415.20**
- Total CGT = **£10,063.80**.

**Step 5: reporting.** Report on the 2026/27 Self Assessment return. Tax is due by **31 January 2028**. (Nadia sold shares, not UK residential property, so there is no 60-day return.)

**Step 6: what to advise.** Nadia could have **used her spouse's** unused annual exempt amount and basic-rate band by transferring part of the shares at no gain/no loss before the sale, if she is married and her spouse's income is lower. This saves tax.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "gain-calc",
      prompt: "A client sells an asset for £120,000 with £2,500 of selling costs. It cost £70,000 to buy, with £3,000 of acquisition costs, and £5,000 of enhancement expenditure that is still reflected in the asset. What is the chargeable gain before the annual exempt amount (£)?",
      answer: 39500,
      unit: "£",
      explain: "Net proceeds less allowable cost (acquisition, incidental costs and enhancement).",
      working: "£120,000 − £2,500 = £117,500; cost £70,000 + £3,000 + £5,000 = £78,000; gain = **£39,500**.",
    },
    {
      kind: "numeric",
      id: "cgt-basic-band",
      prompt: "A client has taxable income (after the personal allowance) of £17,430 and a taxable gain after the annual exempt amount of £47,000 in 2026/27 (non-residential, no BADR). What is the CGT (to the nearest £1)?",
      answer: 10064,
      tolerance: 1,
      unit: "£",
      explain: "The unused basic-rate band is taxed at 18% and the rest at 24%.",
      working: "Unused band = £37,700 − £17,430 = £20,270 × 18% = £3,648.60; £26,730 × 24% = £6,415.20; total **£10,063.80**.",
    },
    {
      kind: "numeric",
      id: "after-aea",
      prompt: "A client's total gains for 2026/27 are £11,200 and they have no losses. What is the taxable gain after the annual exempt amount (£)?",
      answer: 8200,
      unit: "£",
      explain: "The annual exempt amount is £3,000.",
      working: "£11,200 − £3,000 = **£8,200**.",
    },
    {
      kind: "classify",
      id: "classify-exempt-assets",
      prompt: "Is a gain on disposal of the asset normally chargeable to CGT?",
      categories: ["Chargeable", "Exempt"],
      items: [
        { text: "A holding of listed company shares (not in an ISA)", answer: 0 },
        { text: "A private motor car", answer: 1 },
        { text: "A painting sold for £25,000", answer: 0, why: "A chattel sold for more than £6,000 is chargeable." },
        { text: "Shares held in a stocks and shares ISA", answer: 1 },
        { text: "A table sold for £4,500", answer: 1, why: "A chattel sold for £6,000 or less is exempt." },
        { text: "A buy-to-let flat", answer: 0 },
      ],
      explain: "Check the exempt list first: cars, ISAs, gilts, qualifying corporate bonds, main home, chattels of £6,000 or less.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-aea",
      prompt: "What is the CGT annual exempt amount for individuals in 2026/27?",
      options: ["£1,500", "£3,000", "£6,000", "£12,300"],
      answer: 1,
      explain: "£3,000.",
    },
    {
      kind: "mcq",
      id: "q-higher",
      prompt: "What is the CGT rate for higher-rate taxpayers on most gains from 6 April 2026?",
      options: ["18%", "20%", "24%", "28%"],
      answer: 2,
      explain: "24%.",
    },
    {
      kind: "mcq",
      id: "q-date",
      prompt: "A sale of land is agreed by exchange of unconditional contracts on 1 March and completes on 10 April. When does the disposal take place?",
      options: ["10 April (completion)", "1 March (exchange)", "5 April", "The date of the sale advert"],
      answer: 1,
      explain: "The date of the unconditional contract.",
    },
    {
      kind: "mcq",
      id: "q-spouse",
      prompt: "A transfer between spouses living together is treated as…",
      options: ["A disposal at market value", "No gain, no loss", "Exempt only if under £6,000", "A potentially exempt transfer"],
      answer: 1,
      explain: "TCGA s58: no gain, no loss.",
    },
    {
      kind: "mcq",
      id: "q-death",
      prompt: "What happens to CGT on death?",
      options: ["The gain is taxed in the final return", "No CGT on death; heirs acquire at market value at death", "The estate pays 24%", "The gain passes to the heirs unchanged"],
      answer: 1,
      explain: "Death isn't a disposal; the heirs' base cost is market value at death.",
    },
  ],
  sources: [
    { label: "Capital Gains Tax: what you pay it on, rates and allowances – GOV.UK", url: "https://www.gov.uk/capital-gains-tax" },
    { label: "Capital Gains Tax rates – GOV.UK", url: "https://www.gov.uk/capital-gains-tax/rates" },
    { label: "Work out your gain – GOV.UK", url: "https://www.gov.uk/capital-gains-tax/work-out-need-to-pay" },
    { label: "TCGA 1992 s38 – acquisition and disposal costs", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/38" },
    { label: "HMRC Capital Gains Manual", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual" },
  ],
};
