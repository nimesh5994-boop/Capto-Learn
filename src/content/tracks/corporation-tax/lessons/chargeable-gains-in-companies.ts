import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "chargeable-gains-in-companies",
  title: "Chargeable gains in companies",
  level: "practitioner",
  minutes: 40,
  summary:
    "How a company is taxed when it sells a capital asset: the gain computation with frozen indexation allowance, part disposals, capital losses, rollover relief on replacing business premises, and the substantial shareholding exemption on selling a trading subsidiary.",
  objectives: [
    "Compute a company's chargeable gain, including indexation allowance frozen at December 2017",
    "Apply the part disposal formula and the restriction on indexation creating a loss",
    "Use capital losses correctly and claim rollover relief on a replacement business asset",
    "Decide whether the substantial shareholding exemption applies to a share sale",
  ],
  body: [
    {
      kind: "md",
      md: `Companies don't pay capital gains tax. Their chargeable gains are included in **taxable total profits** and taxed at the company's normal CT rate. There's **no annual exempt amount** and no separate CGT rates, but there are two company-only features: **indexation allowance** (frozen) and the **substantial shareholding exemption**.

Goodwill and other intangible assets acquired or created by a company since 1 April 2002 are dealt with under the **intangible fixed assets** regime instead (see the intangibles lesson), not as chargeable gains.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The gain computation",
      md: `| | |
|---|---|
| Disposal proceeds (or market value if not at arm's length) | X |
| Less incidental costs of disposal (agent's and legal fees) | (X) |
| Less allowable cost, including incidental costs of acquisition | (X) |
| Less enhancement expenditure (reflected in the asset at disposal) | (X) |
| **Unindexed gain** | X |
| Less **indexation allowance** | (X) |
| **Chargeable gain** | X |

**Indexation allowance** = cost × indexation factor, calculated separately for the original cost and each enhancement, from the month of the expenditure to **December 2017** at the latest. It was frozen from 1 January 2018: assets bought after December 2017 get none. Factors are rounded to 3 decimal places.

Indexation can **reduce** a gain to nil but can't **create or increase a loss**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Part disposals",
      md: `When part of an asset is sold, the cost allocated to the part sold is:

**Cost × A ÷ (A + B)**

where **A** is the proceeds of the part sold and **B** is the market value of the part retained at the time of the disposal.`,
    },
    {
      kind: "md",
      md: `### Capital losses

Capital losses are set against chargeable gains of the **same** accounting period, then **carried forward** against future **gains** only. They can't be carried back or set against income, and (unlike trading losses) they're not relieved against total profits. Within a group, gains and losses can be matched by an election to transfer them between members (see the groups lesson). Carried-forward capital losses are also within the £5m deductions allowance restriction.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Rollover relief (TCGA 1992 ss152–158)",
      md: `If a trading company sells a qualifying business asset and reinvests in another within **1 year before to 3 years after** the disposal, it can claim to defer the gain by deducting it from the cost of the new asset.

- **Qualifying assets** for a company: land and buildings used in the trade, fixed plant and machinery, ships, aircraft and some others. **Not goodwill**, which falls under the intangibles regime with its own reinvestment relief.
- **Partial reinvestment**: the gain is chargeable now up to the amount of proceeds **not reinvested**; the rest can be rolled over.
- If the new asset is a **depreciating asset** (life of 60 years or less, e.g. fixed plant or a lease of 60 years or less), the gain is only **held over** for up to 10 years, not deducted from its cost.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Substantial shareholding exemption (SSE)",
      md: `A gain (or loss) on a company's disposal of shares is **exempt** if:
- the investing company has held at least **10%** of the ordinary shares for a continuous **12-month period** in the **6 years** before the sale; and
- the company being sold is a **trading company** or the holding company of a trading group throughout the qualifying period. Since 1 April 2017 it only has to qualify **immediately after** the sale as well in limited cases, mainly where the buyer is **connected** with the seller.

Since April 2017 the investing company itself doesn't need to be trading. SSE is automatic: no claim. It means a trading group can usually sell a trading subsidiary free of tax, and losses on such sales are not allowable either.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't apply individual reliefs to companies",
      md: `Business Asset Disposal Relief, the annual exempt amount, private residence relief and gift holdover relief are **individual** reliefs. They don't apply when a company sells an asset. If a client asks "what CGT will the company pay?", the answer is corporation tax on the gain at the company's rate.`,
    },
  ],
  scenario: {
    title: "Brookfield Print Ltd sells its factory",
    narrative: `**Brookfield Print Ltd** (Leeds) has a 31 March year end. In **November 2026** it sells its factory for **£850,000**, paying agent's and legal fees of **£12,000**. The factory was bought in **March 2006** for **£320,000** and extended in **June 2012** at a cost of **£80,000**.

Indexation factors (to December 2017): March 2006 **0.426**; June 2012 **0.150**.

In **August 2027** the company plans to buy a larger factory for **£780,000**.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Chargeable gain on the factory",
        head: ["", "£"],
        rows: [
          ["Proceeds", "850,000"],
          ["Less costs of disposal", "(12,000)"],
          ["Less cost (March 2006)", "(320,000)"],
          ["Less enhancement (June 2012 extension)", "(80,000)"],
          ["Unindexed gain", "438,000"],
          ["Less indexation: £320,000 × 0.426", "(136,320)"],
          ["Less indexation: £80,000 × 0.150", "(12,000)"],
          ["**Chargeable gain**", "**289,680**"],
        ],
      },
      {
        kind: "md",
        md: `**Rollover relief.** The new factory (August 2027) is bought within 3 years of the sale and both are qualifying assets used in the trade.

- Proceeds not reinvested: £850,000 − £780,000 = **£70,000**, chargeable in the year to 31 March 2027.
- Gain rolled over: £289,680 − £70,000 = **£219,680**.
- Base cost of the new factory: £780,000 − £219,680 = **£560,320**.

The purchase (August 2027) should complete before the tax for the year to 31 March 2027 is due (1 January 2028), so the claim can go on that year's return. If the purchase were still pending when the return was filed, the company could make a **provisional claim** declaring its intention to reinvest; if it then failed to reinvest in time, the claim would be withdrawn and interest would run on the extra tax.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "basic-gain",
      prompt:
        "A company sells a warehouse in January 2027 for £600,000 (selling costs £9,000). It bought the warehouse in May 2010 for £280,000 (legal fees on purchase £5,000). The indexation factor from May 2010 to December 2017 is 0.244. What is the chargeable gain?",
      answer: 236460,
      unit: "£",
      explain: "Incidental costs of acquisition form part of the cost and are indexed with it.",
      working: "£600,000 − £9,000 − £285,000 = £306,000\n\nIndexation: £285,000 × 0.244 = £69,540\n\nGain: £306,000 − £69,540 = **£236,460**",
    },
    {
      kind: "numeric",
      id: "indexation-no-loss",
      prompt:
        "A company sells an investment property for £115,000 that cost £100,000. The indexation factor is 0.300. What is the chargeable gain or allowable loss? (Enter 0 if neither.)",
      answer: 0,
      tolerance: 0,
      unit: "£",
      explain: "Indexation (£30,000) can reduce the £15,000 unindexed gain to nil, but can't create a loss.",
      working: "Unindexed gain £15,000; indexation restricted to £15,000 → gain **£0** (no loss).",
    },
    {
      kind: "numeric",
      id: "part-disposal",
      prompt:
        "In 2026 a company sells part of a plot of land it bought in 2019 for £200,000. It receives £90,000; the remaining land is then worth £210,000. Ignoring costs, what is the chargeable gain? (No indexation: bought after 2017.)",
      answer: 30000,
      unit: "£",
      explain: "Allocate cost using A/(A+B).",
      working: "Cost of part sold: £200,000 × £90,000 / (£90,000 + £210,000) = £60,000\n\nGain: £90,000 − £60,000 = **£30,000**",
    },
    {
      kind: "numeric",
      id: "rollover-partial",
      prompt:
        "A trading company sells a building for £500,000, realising a gain of £180,000. Eighteen months later it buys a replacement building for £420,000. How much of the gain is chargeable now?",
      answer: 80000,
      unit: "£",
      explain: "With partial reinvestment, the gain chargeable now is the proceeds not reinvested (capped at the gain).",
      working: "£500,000 − £420,000 = **£80,000** chargeable; £100,000 rolled over into the new building.",
    },
    {
      kind: "mcq",
      id: "sse",
      prompt:
        "Hartwell Holdings Ltd has owned 30% of Pike Engineering Ltd (a trading company) since 2019. It sells the shares in 2026 at a gain of £1.2m. What is the CT position?",
      options: [
        "The gain is taxed at 25%",
        "The gain is exempt under the substantial shareholding exemption",
        "Business Asset Disposal Relief reduces the rate to 18%",
        "The gain can only be rolled over",
      ],
      answer: 1,
      explain: "At least 10% held for 12 months in the last 6 years, in a trading company: SSE applies automatically.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-indexation-frozen",
      prompt: "Up to which month is indexation allowance calculated for companies?",
      options: ["March 1982", "April 1998", "December 2017", "The month of disposal"],
      answer: 2,
      explain: "Indexation was frozen at December 2017.",
    },
    {
      kind: "mcq",
      id: "q-capital-loss",
      prompt: "A company's capital loss that exceeds its gains for the period is:",
      options: [
        "Set against trading profits",
        "Carried back 12 months",
        "Carried forward against future chargeable gains",
        "Lost",
      ],
      answer: 2,
      explain: "Capital losses carry forward against gains only.",
    },
    {
      kind: "mcq",
      id: "q-rollover-window",
      prompt: "For rollover relief, the replacement asset must be acquired within:",
      options: [
        "12 months after the disposal",
        "1 year before to 3 years after the disposal",
        "3 years before to 1 year after",
        "The same accounting period",
      ],
      answer: 1,
      explain: "From 1 year before to 3 years after.",
    },
    {
      kind: "mcq",
      id: "q-goodwill-rollover",
      prompt: "Can a company roll over a gain into newly purchased goodwill under TCGA 1992 s152?",
      options: ["Yes", "No: goodwill is dealt with under the intangible fixed assets regime", "Only for groups", "Only if held for 10 years"],
      answer: 1,
      explain: "For companies, goodwill isn't a chargeable gains asset (post-2002); the intangibles regime has its own reinvestment relief.",
    },
    {
      kind: "mcq",
      id: "q-sse-holding",
      prompt: "What minimum shareholding is needed for the substantial shareholding exemption?",
      options: ["5%", "10%", "25%", "51%"],
      answer: 1,
      explain: "At least 10% for a continuous 12 months in the 6 years before the disposal.",
    },
    {
      kind: "mcq",
      id: "q-aea",
      prompt: "Does a company get an annual exempt amount for chargeable gains?",
      options: ["Yes, £3,000", "Yes, £1,500", "No", "Only small companies"],
      answer: 2,
      explain: "Companies have no annual exempt amount.",
    },
  ],
  sources: [
    { label: "CG14200: Computation of gains (Capital Gains Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg14200" },
    { label: "CG17200: Indexation allowance – introduction", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg17200" },
    { label: "CG60250: Rollover relief – introduction", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg60250" },
    { label: "CG53000: Substantial shareholdings exemption – introduction", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg53000" },
    { label: "CG53104: SSE – the investee company requirements", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg53104" },
    { label: "Indexation allowance – December 2017 factors (GOV.UK)", url: "https://www.gov.uk/government/publications/corporation-tax-on-chargeable-gains-indexation-allowance-2017/indexation-allowance-december-2017" },
    { label: "TCGA 1992 s152: rollover relief", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/152" },
  ],
};
