import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "bpr-and-apr-reforms-from-april-2026",
  title: "Business and agricultural property relief: the reforms from 6 April 2026",
  level: "advanced",
  minutes: 40,
  summary:
    "How business property relief (BPR) and agricultural property relief (APR) work after Finance Act 2026: the £2.5 million allowance at 100% relief, 50% relief above it, transferability between spouses, the 50% rate for AIM-type shares, the trust rules and interest-free instalments, with worked examples and planning points.",
  objectives: [
    "Explain how BPR and APR worked before 6 April 2026 and what changed",
    "Calculate the relief and tax on an estate with qualifying property above the £2.5 million allowance",
    "Explain the transferability of the allowance between spouses and the effect on a second death",
    "Explain the treatment of AIM and other 'not listed' shares and of property in trusts",
    "Identify the planning, evidence and payment-by-instalment points to raise with owner-managed and farming clients",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `For decades **business property relief (BPR)** and **agricultural property relief (APR)** gave **100%** (or 50%) relief from IHT on qualifying business and farming assets, with **no financial limit**. That is why many owner-managed businesses and family farms passed down free of IHT. From **6 April 2026**, Finance Act 2026 (Schedule 12) introduced a **cap** on the 100% rate. This lesson explains the current rules; figures should be checked against HMRC's manual (IHTM25500 onwards) before you advise on a live case.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The new regime (from 6 April 2026)",
      md: `- A new **allowance of £2.5 million** applies to the **combined** value of property qualifying for **100% BPR and/or 100% APR**.
- **Above £2.5 million**, relief is **50%** (an effective IHT rate of 20% on the excess).
- **Unused allowance is transferable** to a surviving spouse or civil partner, so a couple can pass on up to **£5 million** of qualifying business or farming assets, on top of their nil-rate bands (government announcements, as legislated in FA 2026).
- **Shares "not listed" on recognised stock exchanges, such as AIM:** the rate of relief is **50%**, and these shares are **not** covered by the new allowance.
- **Trusts:** a **£2.5 million** allowance applies to relevant property trusts' qualifying property at ten-year and exit charges, with specific rules for trusts created before 30 October 2024.
- **Payment:** the option to pay IHT by **equal annual instalments over 10 years, interest-free** is extended to all property that qualifies for APR or BPR.
- **Transitional rules** apply to lifetime transfers made on or after 30 October 2024 where the donor dies on or after 6 April 2026, so check the manual for **gifts and deaths close to the change**.

The **qualifying conditions** for BPR and APR (for example the **two-year ownership** test, the exclusion of **investment businesses**, and the **active farming** requirements) were not changed by the cap.`,
    },
    {
      kind: "table",
      caption: "What qualifies and at what rate (before the allowance is applied)",
      head: ["Asset", "Relief rate", "Does the £2.5m allowance apply?"],
      rows: [
        ["Sole trader business or partnership interest (trading)", "100%", "Yes"],
        ["Shares in an unquoted trading company (any holding)", "100%", "Yes"],
        ["Controlling holding of quoted shares in a trading company", "50%", "Not part of the 100% allowance"],
        ["Land, buildings or machinery owned personally and used in the business (partnership or controlled company)", "50%", "Not part of the 100% allowance"],
        ["AIM and other 'not listed' market shares", "50%", "No: the allowance doesn't apply"],
        ["Qualifying agricultural property (farmland and farmhouse used by a working farmer)", "100%", "Yes (combined with BPR)"],
        ["Investment businesses (property letting, shares portfolios)", "Nil", "Not relevant"],
      ],
    },
    {
      kind: "md",
      md: `### Applying the allowance

1. **Identify** qualifying business and agricultural property and the **relief rate** on each item.
2. **Add up** the value of property that would qualify for **100%** relief. The first **£2.5 million** gets 100%; the **excess** gets **50%**.
3. **Reduce** the value of the estate by the relief, then apply the **nil-rate bands** and the 40% rate (or 36% with the charity rate) to the rest.
4. **Check for spouses:** if the first spouse died with unused allowance, the survivor's allowance is increased, up to **£5 million** in total.
5. **Instalments:** consider the 10-year interest-free instalment option where the liability is on qualifying property.

### Planning points to raise

- **Wills:** a will that leaves everything to the spouse at first death wastes nothing under the transfer rules, but a will that leaves business assets to someone else on first death uses the first spouse's allowance, and the survivor's own £2.5 million still applies.
- **Lifetime gifts and the 7-year rule:** PETs of business assets may be set against the allowance, and the transitional rules matter if the donor dies soon after April 2026.
- **Share structure:** the AIM rule at 50% changes the planning for AIM-based portfolios.
- **Valuation and evidence:** a professional valuation and evidence of the trading status help support the claim.
- **Insurance** to fund the liability and **cash-flow planning** for the instalment option.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Check the facts, not the headline",
      md: `Headlines said the reform "taxes farms and family businesses". In practice **many estates remain exempt** because of the £2.5m allowance and its transferability. The reform affects **larger estates** (and AIM portfolios). Always compute the liability with the client's **actual numbers**, and re-run it as the facts or the legislation change.`,
    },
  ],
  scenario: {
    title: "Estate of Grace Whitfield (never married, unquoted manufacturing company)",
    narrative: `Grace Whitfield, who never married, dies in **January 2027**. Her estate comprises **unquoted trading company shares** worth **£3,200,000** (she owned them for 20 years) and **cash and investments** of **£300,000**. She leaves everything to her children. For this example **assume** no residence nil-rate band is available (she rented her home), ignore pensions, and assume there were no earlier gifts. NRB £325,000.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: gross estate.** £3,200,000 + £300,000 = **£3,500,000**.

**Step 2: relief on the shares.** The shares qualify for 100% relief within the £2.5 million allowance and 50% above:
- £2,500,000 × 100% = £2,500,000
- £700,000 × 50% = £350,000
- Total relief = **£2,850,000**.

**Step 3: chargeable estate.** £3,500,000 − £2,850,000 = **£650,000**.

**Step 4: nil-rate band.** £650,000 − £325,000 = **£325,000** taxable.

**Step 5: IHT.** £325,000 × 40% = **£130,000**.

**Step 6: compare with the old rules.** Under the old unlimited 100% relief the shares would have been fully relieved: chargeable estate £300,000 (all within the NRB), so **IHT nil**. The reform cost this estate **£130,000**.

**Step 7: payment.** The liability attributable to the business shares can be paid in **10 equal annual instalments interest-free**. Executors should consider that and the funds available.

**Step 8: planning for the next client.** If Grace had instead been a widow whose late spouse's allowance was entirely unused, her total allowance could reach **£5 million**, which would have covered all £3.2 million at 100%, leaving only the £300,000 within the NRB: **nil IHT**.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "relief-amount",
      prompt: "A single person's estate includes £3,000,000 of unquoted trading company shares qualifying for 100% relief within the £2.5 million allowance (and 50% above it). What total relief is available (£)?",
      answer: 2750000,
      unit: "£",
      explain: "100% on £2.5 million and 50% on the £500,000 excess.",
      working: "£2,500,000 + (£500,000 × 50%) = **£2,750,000**.",
    },
    {
      kind: "numeric",
      id: "chargeable-after-relief",
      prompt: "Using the same facts, how much of the shares' value remains in the chargeable estate after relief (£)?",
      answer: 250000,
      unit: "£",
      explain: "Value less relief.",
      working: "£3,000,000 − £2,750,000 = **£250,000**.",
    },
    {
      kind: "numeric",
      id: "aim-chargeable",
      prompt: "An estate includes £400,000 of AIM shares that qualify for 50% relief. How much of their value is chargeable (before bands) (£)?",
      answer: 200000,
      unit: "£",
      explain: "AIM shares get 50% relief and aren't covered by the £2.5 million allowance.",
      working: "£400,000 × 50% = **£200,000**.",
    },
    {
      kind: "classify",
      id: "classify-bpr-rate",
      prompt: "What relief applies to the asset (before the allowance cap)?",
      categories: ["100% (within the allowance)", "50%", "Nil"],
      items: [
        { text: "A sole trader's trading business", answer: 0 },
        { text: "AIM-listed shares", answer: 1 },
        { text: "A portfolio of buy-to-let flats held by a company (investment business)", answer: 2 },
        { text: "Shares in an unquoted trading company", answer: 0 },
        { text: "A building owned personally and used by the family's controlled trading company", answer: 1 },
      ],
      explain: "Qualification and the rate depend on the asset and the business: investment businesses never qualify.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-allowance",
      prompt: "What is the combined BPR/APR 100% relief allowance from 6 April 2026?",
      options: ["£500,000", "£1 million", "£2.5 million", "Unlimited"],
      answer: 2,
      explain: "£2.5 million, after the late-2025 increase from the £1 million announced at the Autumn Budget 2024.",
    },
    {
      kind: "mcq",
      id: "q-above",
      prompt: "What relief applies to qualifying property above the allowance?",
      options: ["0%", "25%", "50%", "100%"],
      answer: 2,
      explain: "50%.",
    },
    {
      kind: "mcq",
      id: "q-spouse",
      prompt: "Can unused allowance be transferred to a surviving spouse or civil partner?",
      options: ["No", "Yes", "Only for farms", "Only for trusts"],
      answer: 1,
      explain: "Yes, so a couple can pass on up to £5 million of qualifying assets.",
    },
    {
      kind: "mcq",
      id: "q-aim",
      prompt: "What is the rate of BPR on AIM shares from 6 April 2026?",
      options: ["0%", "50%", "75%", "100%"],
      answer: 1,
      explain: "50%, and the shares are outside the allowance.",
    },
    {
      kind: "mcq",
      id: "q-inst",
      prompt: "Over how many years can IHT on qualifying property be paid by interest-free instalments?",
      options: ["2", "5", "10", "20"],
      answer: 2,
      explain: "Equal annual instalments over 10 years.",
    },
  ],
  sources: [
    { label: "Inheritance tax reliefs threshold to rise to £2.5m for farmers and businesses – GOV.UK", url: "https://www.gov.uk/government/news/inheritance-tax-reliefs-threshold-to-rise-to-25m-for-farmers-and-businesses" },
    { label: "IHTM25500 – AR/BR 100% relief allowance: overview", url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm25500" },
    { label: "Agricultural relief for Inheritance Tax – GOV.UK", url: "https://www.gov.uk/guidance/agricultural-relief-on-inheritance-tax" },
    { label: "Business relief for Inheritance Tax – GOV.UK", url: "https://www.gov.uk/business-relief-inheritance-tax" },
    { label: "Finance Act 2026 – legislation.gov.uk", url: "https://www.legislation.gov.uk/ukpga/2026/11/contents" },
  ],
};
