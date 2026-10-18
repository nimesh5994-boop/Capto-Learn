import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "business-asset-disposal-relief",
  title: "Business Asset Disposal Relief: conditions, rates and claims",
  level: "practitioner",
  minutes: 40,
  summary:
    "Who qualifies for Business Asset Disposal Relief (BADR), the qualifying conditions for sole traders, partners and personal-company shareholders, the 18% rate from 6 April 2026 and £1 million lifetime limit, how to compute the tax, and the claim deadline and common pitfalls.",
  objectives: [
    "State the BADR rates for 2024/25, 2025/26 and from 6 April 2026, and the lifetime limit",
    "Apply the conditions for disposals of a business and of shares in a personal company",
    "Calculate the tax saving from BADR, including where the lifetime limit is exceeded",
    "Identify the claim deadline and how the claim is made",
    "Spot situations where BADR fails (investment companies, diluted holdings, late cessation)",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `**Business Asset Disposal Relief** (formerly Entrepreneurs' Relief) reduces the rate of CGT on gains from selling all or part of a **trading business** or shares in a **personal trading company**. It was a **10%** relief; it rose to **14%** for disposals on or after **6 April 2025** and to **18%** for disposals on or after **6 April 2026**. At 18% the saving compared with the 24% higher rate is now **six percentage points**, still worth having on a large gain but less dramatic than before.`,
    },
    {
      kind: "table",
      caption: "BADR rate and limit",
      head: ["Disposal date", "BADR rate", "Lifetime limit"],
      rows: [
        ["Before 6 April 2025", "10%", "£1 million (since 11 March 2020)"],
        ["6 April 2025 to 5 April 2026", "14%", "£1 million"],
        ["On or after 6 April 2026", "18%", "£1 million"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Qualifying conditions (TCGA 1992 ss169H–169S)",
      md: `**Disposal of all or part of a business (sole trader or partner):** the business must have been owned for **2 years** ending on the date of disposal (or the cessation date, if the business has ceased and the disposal is of assets used in the business **within 3 years of cessation**).

**Disposal of shares or securities in a company:** throughout a **2-year period** ending on the disposal date (or the cessation of the company's trade, with the disposal within 3 years of that):

- the company is a **trading company** (or the holding company of a trading group);
- the individual is an **officer or employee** of the company (or a group company);
- the individual holds **at least 5%** of the **ordinary share capital**, and that holding gives them **at least 5% of the voting rights**; and
- the holding gives **at least 5% of the distributable profits and 5% of the assets on a winding up** (or 5% of the proceeds on a sale of the whole company).

**Associated disposals:** a disposal of an asset (for example a property) used in the business that is made as part of the individual's withdrawal from the business or shareholding may also qualify, with limits.

**Anti-forestalling:** special rules apply where an **unconditional contract** is made before a rate rise but the disposal completes after it, so that the higher rate can still apply in some circumstances. CG64174 sets out exactly when. Check it for any sale agreed around 6 April 2025 or 6 April 2026.`,
    },
    {
      kind: "md",
      md: `### The claim

BADR is **not automatic**. The individual must claim it **in writing** (usually on the Self Assessment return, SA108 and the BADR box) by the **first anniversary of the 31 January following the end of the tax year of the disposal**. For a 2026/27 disposal the deadline is **31 January 2029**. A late claim is not accepted without a statutory extension.

### How it fits into the computation

BADR gains are taxed at the BADR rate (18% in 2026/27) and are not subject to the 18/24% split for ordinary gains. But they still **use up any unused basic rate band first**, before other gains, so a BADR gain can push the taxpayer's ordinary gains into the 24% rate. The annual exempt amount (£3,000) can be set against the gains the taxpayer chooses, so set it against the gain taxed at the highest rate. **Gains above the £1 million lifetime limit** are taxed at the normal 18%/24% rates.

### Typical problems

- **Investment company:** a company that is mainly investing (such as property letting) isn't a trading company.
- **Diluted shareholding:** a shareholder below 5% (including after a share issue) may lose relief unless an **election** treats the holding as sold and reacquired at the time of dilution (s169R).
- **Not an officer or employee** at the disposal date.
- **Holding period** of less than 2 years (including shares acquired recently under a scheme).
- **Late claim** after the deadline.
- **A non-trading element** in the company that is more than **20%** of its activities (a broad test; see the guidance).`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Planning notes",
      md: `- **Check the date**: with rate changes, the date of disposal (unconditional contract date, with the anti-forestalling rules in mind) fixes the BADR rate.
- **Check the lifetime limit**: earlier claims (even at the old 10% rate) use up the £1 million.
- **Consider spouses**: a spouse who also qualifies (a 5% holding and employment) may have their own £1 million limit and annual exempt amount.
- **Winding up:** liquidation distributions can qualify for BADR (see the directors track for the TAAR and the 3-year window).`,
    },
  ],
  scenario: {
    title: "Owen Marsh sells his shares",
    narrative: `Owen Marsh holds **40%** of the ordinary shares (and 40% of the votes) in **Marsh Engineering Ltd**, a trading company. He has been a director and an employee for 14 years. The shares cost him **£10,000**. In **October 2026** he sells them for **£400,000**. He has made no previous BADR claims and is an additional-rate taxpayer. There are no other gains.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: does BADR apply?** Trading company, officer and employee, 40% shareholding and votes, held for more than 2 years. Yes.

**Step 2: the gain.** £400,000 − £10,000 = **£390,000**.

**Step 3: tax with BADR.** Annual exempt amount £3,000 → taxable gain £387,000, all within the £1 million limit, at **18%** = **£69,660**.

**Step 4: tax without BADR (for comparison).** £387,000 × 24% = **£92,880**. The saving is **£23,220**.

**Step 5: claim.** The claim must be made by **31 January 2029** (the first anniversary of the 31 January following the end of 2026/27). Include it on the 2026/27 SA return. Tax is due on **31 January 2028**.

**Step 6: record.** Keep the share register, evidence of directorship and employment, and the company's activities to evidence the trading status, and update Owen's lifetime-limit tracker: £390,000 used, **£610,000 remaining**.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "badr-tax",
      prompt: "A shareholder with no previous BADR claims has a qualifying gain of £250,000 on a disposal in 2026/27. The annual exempt amount (£3,000) is available. What is the CGT (£)?",
      answer: 44460,
      unit: "£",
      explain: "BADR rate of 18% on the gain after the annual exempt amount.",
      working: "(£250,000 − £3,000) × 18% = £247,000 × 0.18 = **£44,460**.",
    },
    {
      kind: "numeric",
      id: "limit-exceeded",
      prompt: "A taxpayer has already used £700,000 of the £1 million BADR limit. They now make a qualifying gain of £500,000 in 2026/27 (no other gains). Set the £3,000 annual exempt amount against the gain taxed at 24%. What is the total CGT (£)? (Assume the part above the limit is taxed at 24%.)",
      answer: 101280,
      unit: "£",
      explain: "£300,000 remains within the limit at 18%; the other £200,000 is taxed at 24% after the annual exempt amount.",
      working: "£300,000 × 18% = £54,000; (£200,000 − £3,000) × 24% = £47,280; total **£101,280**.",
    },
    {
      kind: "numeric",
      id: "badr-saving",
      prompt: "A gain of £200,000 (after the annual exempt amount) would be taxed at 24% without BADR and at 18% with BADR. What is the saving (£)?",
      answer: 12000,
      unit: "£",
      explain: "The difference is six percentage points of the gain.",
      working: "£200,000 × (24% − 18%) = **£12,000**.",
    },
    {
      kind: "classify",
      id: "classify-badr",
      prompt: "Does the disposal qualify for BADR (assume 2 years and a disposal in 2026/27)?",
      categories: ["Qualifies", "Does not qualify"],
      items: [
        { text: "A director-employee with 30% of a trading company sells all the shares", answer: 0 },
        { text: "A 3% shareholder who is also a director sells all the shares", answer: 1, why: "Below the 5% threshold." },
        { text: "A 50% shareholder of a property rental company sells the shares", answer: 1, why: "An investment company is not a trading company." },
        { text: "A sole trader sells the whole business after 6 years", answer: 0 },
        { text: "A 20% shareholder who is not an officer or employee sells the shares", answer: 1, why: "Must be an officer or employee." },
      ],
      explain: "Check trading status, 5% shareholding and votes, officer or employee and the 2-year period.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "What is the BADR rate from 6 April 2026?",
      options: ["10%", "14%", "18%", "24%"],
      answer: 2,
      explain: "18%.",
    },
    {
      kind: "mcq",
      id: "q-limit",
      prompt: "What is the lifetime limit for BADR?",
      options: ["£1 million", "£10 million", "£500,000", "£5 million"],
      answer: 0,
      explain: "£1 million.",
    },
    {
      kind: "mcq",
      id: "q-hold",
      prompt: "What minimum shareholding is needed for BADR on shares in a personal company?",
      options: ["1%", "5%", "10%", "25%"],
      answer: 1,
      explain: "At least 5% of ordinary shares and 5% of the voting rights.",
    },
    {
      kind: "mcq",
      id: "q-claim",
      prompt: "By when must a BADR claim be made for a 2026/27 disposal?",
      options: ["31 January 2028", "5 April 2028", "31 January 2029", "31 January 2030"],
      answer: 2,
      explain: "31 January 2029, 12 months after the normal SA filing date.",
    },
    {
      kind: "mcq",
      id: "q-years",
      prompt: "What is the minimum qualifying period for BADR?",
      options: ["1 year", "2 years", "3 years", "5 years"],
      answer: 1,
      explain: "2 years.",
    },
    {
      kind: "mcq",
      id: "q-auto",
      prompt: "Is BADR automatic?",
      options: ["Yes", "No: it must be claimed", "Only for sole traders", "Only for gains below £100,000"],
      answer: 1,
      explain: "It must be claimed in writing by the deadline.",
    },
  ],
  sources: [
    { label: "Business Asset Disposal Relief – GOV.UK", url: "https://www.gov.uk/business-asset-disposal-relief" },
    { label: "Business Asset Disposal Relief: work out your tax (basic rate band order) – GOV.UK", url: "https://www.gov.uk/business-asset-disposal-relief/work-out-your-tax" },
    { label: "HS275 Business Asset Disposal Relief (2026) – GOV.UK", url: "https://www.gov.uk/government/publications/entrepreneurs-relief-hs275-self-assessment-helpsheet/hs275-business-asset-disposal-relief-2026" },
    { label: "CG63955 – BADR: broad outline", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg63955" },
    { label: "CG64174 – BADR rates from April 2025 and 2026: anti-forestalling", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64174" },
    { label: "Capital Gains Tax rates – GOV.UK", url: "https://www.gov.uk/capital-gains-tax/rates" },
  ],
};
