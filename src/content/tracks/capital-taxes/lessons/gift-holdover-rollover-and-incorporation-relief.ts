import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "gift-holdover-rollover-and-incorporation-relief",
  title: "Deferral reliefs: gift holdover, rollover and incorporation relief",
  level: "practitioner",
  minutes: 40,
  summary:
    "How gains can be deferred rather than taxed: gift holdover relief for business assets and chargeable lifetime transfers, rollover relief on replacing business assets, and incorporation relief, which from 6 April 2026 must be claimed. Includes the base-cost mechanics, claim deadlines and the interaction with BADR.",
  objectives: [
    "Explain how deferral reliefs work: the gain is not removed but reduces the new base cost",
    "Identify which gifts qualify for holdover relief and who must claim",
    "Compute the deferred and immediately chargeable gain on a rollover claim where not all proceeds are reinvested",
    "Apply incorporation relief where part of the consideration is not shares, and state the new claim requirement from 6 April 2026",
    "Compare deferral with taking BADR now",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Some reliefs **cancel** a gain (such as the main home exemption). **Deferral reliefs** do not. They postpone the tax by **reducing the base cost** of the new asset (or of the asset received by the donee), so the gain re-emerges when that asset is later sold. They are valuable when the client has no cash from the transaction (a gift) or wants to keep investing in the business, and they need to be **claimed** in time.`,
    },
    {
      kind: "table",
      caption: "The main deferral reliefs",
      head: ["Relief", "Applies to", "Mechanics", "Claim"],
      rows: [
        ["Gift holdover (TCGA s165)", "Gifts (or sales at undervalue) of business assets: trading business assets, shares in an unlisted trading company or the donor's personal company, certain farm property", "Gain is held over: the donee's base cost is the market value less the held-over gain", "Joint claim by donor and donee (by the donor alone where the donee is the trustees of a settlement) within 4 years of the end of the tax year of the gift"],
        ["Holdover for chargeable lifetime transfers (s260)", "Any asset given into a trust that is a chargeable lifetime transfer for IHT (for example into a discretionary trust)", "As above", "Claim by the transferor alone where the gift is to trustees, within 4 years"],
        ["Rollover relief (s152)", "Replacing qualifying business assets (land and buildings, fixed plant and machinery and some other classes) with other qualifying assets", "Gain reduces the base cost of the new asset; if proceeds are not fully reinvested, the shortfall is chargeable", "Within 4 years of the end of the later of the disposal or acquisition tax year; replacement must be 1 year before to 3 years after the disposal"],
        ["Incorporation relief (s162)", "Transfer of a business as a going concern, with all its assets (other than cash), to a company wholly or partly in exchange for shares", "Gain reduces the base cost of the shares in proportion to the shares received", "**From 6 April 2026 a claim is required**: by the first anniversary of 31 January following the tax year of the transfer"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Incorporation relief: the change for transfers from 6 April 2026",
      md: `Before 6 April 2026 incorporation relief applied **automatically** and the taxpayer had to **elect** (by the second anniversary of the 31 January after the tax year) to disapply it, for example to use BADR. For transfers on or after **6 April 2026** the position is reversed: **relief under s162 requires a claim** (HMRC guidance, CG65735). For a transfer in 2026/27 the claim must be made by **31 January 2029**, on the Self Assessment return (or with the CGT on UK property return for property). No prescribed format, but the claim should show the business and company details, the shares, and the calculation. **Do not assume** relief applies by default.`,
    },
    {
      kind: "md",
      md: `### The mechanics

**Gift holdover.** Gain on the gift is calculated using **market value** as proceeds. The gain is held over so that **no tax is payable by the donor**. The donee takes the asset at **market value less the held-over gain** (effectively the donor's cost). When the donee later sells, the larger gain is taxed. For assets that are **not** business assets, holdover is only available if the gift is a chargeable lifetime transfer for IHT (typically a gift into a discretionary trust).

**Rollover.** Compute the gain on the old asset. If **all** the proceeds are reinvested in a qualifying replacement, the gain is deferred in full. If only part is reinvested, the gain equal to the **un-reinvested proceeds** (up to the whole gain) is chargeable now; the rest is deferred. The new asset's base cost is its price **less the deferred gain**.

**Incorporation.** The gain on transferring the business assets is multiplied by **(value of shares received ÷ total consideration)** to find the deferred amount. Consideration that is **not shares** (for example a credit on the director's loan account, or cash) produces an **immediately chargeable** part. The base cost of the shares is their market value less the deferred gain.

### Interplay with BADR

A gain that is deferred can't also be taxed with BADR now. **Compare the two**: (1) deferring means no tax now and a low base cost in the shares, with a possible BADR claim on a later share sale if conditions are met; (2) taking BADR now means tax at 18% on the gain but a **higher base cost** in the shares. For incorporation from 2026/27, **not making the claim** means the gain is chargeable (potentially with BADR) at the time of transfer.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Watch-outs",
      md: `- **Missed claims** can't usually be made late. Diary the 4-year and 1-year deadlines.
- **The deferred gain isn't forgotten.** Tell clients their **base cost is low**, so a later sale triggers it.
- **Replacement assets** must be in the right **class** and used in the **trade**.
- **Loan account credit on incorporation** reduces the relief.
- **Holdover** isn't available for gifts to a settlor-interested trust in most cases, and the donee must be UK resident.`,
    },
  ],
  scenario: {
    title: "Three claims for the Halloran family business",
    narrative: `**1. Incorporation.** Jennie Halloran, a sole trader, transfers her business to **Halloran Interiors Ltd** on **1 October 2026** at a total value of **£200,000**: shares worth **£150,000** and **£50,000** credited to her director's loan account. The chargeable gains on goodwill and premises total **£180,000**. She is a higher-rate taxpayer and qualifies for BADR.

**2. Rollover.** The company sells a workshop for **£400,000** that cost **£150,000** (gain £250,000) and buys new premises for **£380,000** within 12 months.

**3. Gift.** Jennie's father gives her **unlisted trading company** shares worth **£300,000** that cost him **£50,000**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Incorporation relief (claim needed by 31 January 2029).**
- Fraction of consideration in shares: £150,000 ÷ £200,000 = **75%**.
- Gain deferred = £180,000 × 75% = **£135,000**.
- Gain chargeable now = £180,000 − £135,000 = **£45,000**.
- With BADR: (£45,000 − £3,000) × 18% = **£7,560**.
- Base cost of the shares = £150,000 − £135,000 = **£15,000**.
- Without crediting £50,000 to the loan account (all shares), the relief would be 100% and nothing would be chargeable now.

**2. Rollover relief (company: corporation tax, shown for the mechanics).**
- Gain £250,000. Proceeds £400,000; reinvested £380,000; not reinvested = **£20,000**, chargeable now.
- Deferred = £250,000 − £20,000 = **£230,000**.
- Base cost of new premises = £380,000 − £230,000 = **£150,000**.

**3. Gift holdover.**
- Gain on the gift using market value: £300,000 − £50,000 = **£250,000**, held over on a joint claim.
- Jennie's base cost = £300,000 − £250,000 = **£50,000**. A later sale for £320,000 would give a gain of £270,000.
- The gift is also a potentially exempt transfer for IHT (see the IHT lessons).`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "deferred-gain",
      prompt: "A business with a total chargeable gain of £120,000 is transferred to a company for consideration of £160,000 of shares and £40,000 of loan account credit. How much gain is deferred by incorporation relief (£)?",
      answer: 96000,
      unit: "£",
      explain: "Deferred gain = gain × (shares ÷ total consideration).",
      working: "Shares £160,000 ÷ total £200,000 = 80%; £120,000 × 80% = **£96,000**.",
    },
    {
      kind: "numeric",
      id: "rollover-chargeable",
      prompt: "A business asset is sold for £500,000 (gain £300,000). £470,000 is reinvested in a qualifying replacement. How much of the gain is chargeable now (£)?",
      answer: 30000,
      unit: "£",
      explain: "The proceeds not reinvested are chargeable, up to the amount of the gain.",
      working: "£500,000 − £470,000 = **£30,000**.",
    },
    {
      kind: "numeric",
      id: "new-base-cost",
      prompt: "Using the same facts, what is the base cost of the replacement asset (£)?",
      answer: 200000,
      unit: "£",
      explain: "Cost of the new asset less the deferred gain (£300,000 − £30,000 = £270,000).",
      working: "£470,000 − £270,000 = **£200,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-incorp-2026",
      prompt: "For a business transferred to a company in 2026/27, what is the position on incorporation relief?",
      options: ["It applies automatically", "A claim is required by 31 January 2029", "It was abolished", "It applies only to partnerships"],
      answer: 1,
      explain: "From 6 April 2026 relief under s162 requires a claim.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-deferral",
      prompt: "A deferral relief…",
      options: ["Cancels the gain permanently", "Postpones the gain by reducing the new base cost", "Reduces the rate to 10%", "Applies only to residential property"],
      answer: 1,
      explain: "The gain reappears when the new asset is sold.",
    },
    {
      kind: "mcq",
      id: "q-holdover-who",
      prompt: "Who claims gift holdover relief?",
      options: ["The donee only", "The donor only", "Both donor and donee jointly", "HMRC"],
      answer: 2,
      explain: "A joint claim is required for a gift to an individual. For a gift to the trustees of a settlement, the donor claims alone.",
    },
    {
      kind: "mcq",
      id: "q-replace",
      prompt: "When must replacement assets be acquired for rollover relief?",
      options: ["Within 6 months", "Within 1 year before to 3 years after the disposal", "Within 10 years", "Any time"],
      answer: 1,
      explain: "From 1 year before to 3 years after.",
    },
    {
      kind: "mcq",
      id: "q-loan",
      prompt: "A director's loan account credit on incorporation…",
      options: ["Increases the relief", "Reduces the relief because it isn't share consideration", "Has no effect", "Cancels the relief"],
      answer: 1,
      explain: "Only the share part of the consideration is deferred.",
    },
    {
      kind: "mcq",
      id: "q-claim-years",
      prompt: "The time limit for a gift holdover or rollover claim is generally…",
      options: ["1 year", "2 years", "4 years from the end of the relevant tax year", "6 years"],
      answer: 2,
      explain: "4 years from the end of the tax year.",
    },
  ],
  sources: [
    { label: "CG65735 – claim for incorporation relief (transfers from 6 April 2026)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65735" },
    { label: "CG65730 – election for s162 not to apply (earlier transfers)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg65730" },
    { label: "HS276 Incorporation Relief (2025 to 2026) – GOV.UK", url: "https://www.gov.uk/government/publications/incorporation-relief-hs276-self-assessment-helpsheet/hs276-incorporation-relief-2025-to-2026-roll-over-relief-on-transfer-of-a-business" },
    { label: "HS295 Relief for gifts and similar transactions (2026) – GOV.UK", url: "https://www.gov.uk/government/publications/relief-for-gifts-and-similar-transactions-hs295-self-assessment-helpsheet/hs295-relief-for-gifts-and-similar-transactions-2026" },
    { label: "TCGA 1992 s162 – roll-over relief on transfer of business", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/162" },
  ],
};
