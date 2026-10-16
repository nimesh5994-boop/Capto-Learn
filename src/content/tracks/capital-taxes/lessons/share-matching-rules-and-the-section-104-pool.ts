import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "share-matching-rules-and-the-section-104-pool",
  title: "Share matching rules and the section 104 pool",
  level: "practitioner",
  minutes: 40,
  summary:
    "How to match shares sold with shares bought for CGT: the same-day rule, the 30-day 'bed and breakfasting' rule and the section 104 pool, with worked calculations, the effect of buying back within 30 days, and the records clients need to keep.",
  objectives: [
    "Apply the three matching rules in the correct order to a series of share transactions",
    "Maintain a section 104 pool of shares and calculate the average cost",
    "Explain the 30-day rule and its effect on a repurchase after a sale",
    "Calculate gains where only part of a holding is sold",
    "Explain the record-keeping and reporting that supports share disposals",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `When a client has bought shares of the **same class in the same company** at different times and sells some of them, you can't just pick which ones were sold. The CGT rules **match** each disposal with acquisitions in a fixed order (TCGA 1992 ss104–106A). Getting the matching wrong is one of the commonest causes of incorrect share computations.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The matching order for individuals",
      md: `Shares sold are matched, in this order, with:

1. **Shares acquired on the same day** as the disposal (same-day rule).
2. **Shares acquired in the following 30 days** (the "30-day" or "bed and breakfasting" rule), matching the earliest first.
3. **The section 104 holding** (the "pool"): all other shares of that class, treated as a single asset with a **pooled cost** that is averaged.

(For companies there are different rules. This lesson deals with individuals, trustees and personal representatives.)`,
    },
    {
      kind: "md",
      md: `### The section 104 pool

Every acquisition that isn't matched under rules 1 or 2 is added to the **pool**:

- The pool holds **the number of shares** and **the total allowable cost** (including incidental costs).
- On a **disposal from the pool**, the cost of the shares sold is a **proportion of the pooled cost**: **pool cost × (shares sold ÷ pool shares)**. This equals the **average cost per share** × shares sold.
- Both the number of shares and the pool cost are reduced by the amounts used.
- **Bonus issues and rights issues** and **corporate reorganisations** adjust the pool in set ways.

### Why the 30-day rule exists

Before the rule, a client could sell shares to realise a loss or use the annual exempt amount and **buy them back** straight away ("bed and breakfasting"). The 30-day rule matches the sale with the **repurchase** (not the pool) so the gain or loss reflects the true economic position. A repurchase made **inside an ISA or pension** isn't an acquisition for CGT matching purposes, because those holdings sit in a separate tax environment. So a "**bed and ISA**" (sell outside, buy the same shares inside the ISA) is a legitimate way to realise gains within the annual exempt amount while keeping the investment.

### Records

Keep **contract notes** showing date, quantity, price and costs for every purchase and sale, and a **running pool schedule**. For a long-held pool the schedule is the **key evidence**. Brokers' annual statements are useful but may not follow the CGT matching rules.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Frequent errors",
      md: `- **Using FIFO** (first in, first out) instead of the matching rules.
- **Ignoring the 30-day rule** when a client sells and later buys the same shares back.
- **Adding costs in the wrong place**: costs of buying go into the pool; costs of selling reduce the proceeds.
- **Forgetting corporate actions** (bonus issues, takeovers) that alter the pool.
- **Wrongly treating different classes** (A and B ordinary shares) as one holding.`,
    },
  ],
  scenario: {
    title: "Bertie Fox's share portfolio",
    narrative: `Bertie Fox bought shares in Orchard Foods plc as follows:

| Date | Shares | Price | Costs |
|---|---:|---:|---:|
| May 2019 | 1,000 | £5.00 | £100 |
| Sep 2021 | 500 | £6.00 | £50 |

In **February 2027** (tax year 2026/27) he sells **800 shares at £8.40**, paying **£60** costs. Calculate his gain. Then consider what happens if he **buys back 200 shares at £7.50 (costs £20)** within 30 days of the sale.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Part A: no repurchase.**

**Step 1: the pool.** 1,500 shares; cost £5,000 + £100 + £3,000 + £50 = **£8,150**. Average cost = £8,150 ÷ 1,500 = **£5.4333** per share.

**Step 2: cost of the 800 shares sold.** £8,150 × 800/1,500 = **£4,346.67**.

**Step 3: proceeds.** 800 × £8.40 = £6,720 less £60 costs = **£6,660**.

**Step 4: gain.** £6,660 − £4,346.67 = **£2,313.33**. This is within the £3,000 annual exempt amount if there are no other gains, so no tax.

**Step 5: pool afterwards.** 700 shares; cost £8,150 − £4,346.67 = **£3,803.33**.

**Part B: buying back 200 shares within 30 days.**

**Step 6: matching.** The 200 shares bought back (at £7.50 plus £20 costs = **£1,520**) are matched first with 200 of the shares sold (30-day rule). The other 600 shares sold are matched with the pool.

**Step 7: proceeds per share sold.** £6,660 ÷ 800 = **£8.325**.

**Step 8: gains.**
- 200 shares matched with the repurchase: proceeds £1,665 − cost £1,520 = **£145**.
- 600 shares matched with the pool: proceeds £4,995 − pool cost (600 × £5.4333 = £3,260.00) = **£1,735**.
- Total gain = **£1,880**.

**Step 9: observation.** The repurchase changed the gain because the shares bought at £7.50 replaced the lower-cost pool shares in the matching. The pool afterwards holds 900 shares at a cost of £8,150 − £3,260 = **£4,890**.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "pool-average",
      prompt: "A pool holds 2,000 shares with a total cost of £11,000. What is the allowable cost of selling 500 shares from the pool (£)?",
      answer: 2750,
      unit: "£",
      explain: "Cost of shares sold = pool cost × shares sold ÷ pool shares.",
      working: "£11,000 × 500/2,000 = **£2,750**.",
    },
    {
      kind: "numeric",
      id: "share-gain",
      prompt: "800 shares are sold for £6,660 (net of costs) from a pool of 1,500 shares costing £8,150. What is the gain (to the nearest £1)?",
      answer: 2313,
      tolerance: 1,
      unit: "£",
      explain: "Net proceeds less the pooled cost of the shares sold.",
      working: "Cost = £8,150 × 800/1,500 = £4,346.67; gain = £6,660 − £4,346.67 = **£2,313.33**.",
    },
    {
      kind: "classify",
      id: "classify-matching",
      prompt: "Which matching rule applies first to the shares sold?",
      categories: ["Same-day rule", "30-day rule", "Section 104 pool"],
      items: [
        { text: "Shares bought the same day as the sale", answer: 0 },
        { text: "Shares bought 12 days after the sale", answer: 1 },
        { text: "Shares bought 6 years before the sale", answer: 2 },
        { text: "Shares bought 40 days after the sale", answer: 2, why: "Outside the 30-day window." },
      ],
      explain: "Same-day first, then acquisitions in the following 30 days (earliest first), then the pool.",
    },
    {
      kind: "mcq",
      id: "mcq-bed-and-isa",
      prompt: "A client sells shares and immediately buys the same shares inside their ISA. How does the 30-day rule apply?",
      options: ["It matches the sale with the ISA purchase", "It doesn't match, because the ISA purchase is not an acquisition by the individual of shares for CGT purposes", "Only if bought in the same hour", "Only for gains over £3,000"],
      answer: 1,
      explain: "Shares in an ISA aren't within the CGT matching rules, so a 'bed and ISA' works to realise the gain and re-establish the holding tax-free.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-first",
      prompt: "Which rule applies first in matching share disposals?",
      options: ["The 30-day rule", "The same-day rule", "The section 104 pool", "FIFO"],
      answer: 1,
      explain: "Same-day acquisitions are matched first.",
    },
    {
      kind: "mcq",
      id: "q-30",
      prompt: "How long is the bed-and-breakfasting window?",
      options: ["7 days", "14 days", "30 days", "90 days"],
      answer: 2,
      explain: "30 days after the disposal.",
    },
    {
      kind: "mcq",
      id: "q-cost",
      prompt: "How are costs of acquisition treated in the pool?",
      options: ["Ignored", "Added to the pooled cost", "Deducted from proceeds", "Written off"],
      answer: 1,
      explain: "They are part of the allowable cost in the pool.",
    },
    {
      kind: "mcq",
      id: "q-fifo",
      prompt: "Is first-in, first-out the CGT matching method for individuals?",
      options: ["Yes", "No: the rules are same-day, 30-day and the pool", "Only for AIM shares", "Only for trustees"],
      answer: 1,
      explain: "FIFO was replaced by the pooling system.",
    },
    {
      kind: "mcq",
      id: "q-class",
      prompt: "Shares of different classes in the same company are…",
      options: ["Pooled together", "Pooled separately by class", "Not pooled", "Always matched FIFO"],
      answer: 1,
      explain: "Each class is a separate pool.",
    },
  ],
  sources: [
    { label: "TCGA 1992 s104 – share pooling", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/104" },
    { label: "TCGA 1992 s106A – shares acquired within 30 days", url: "https://www.legislation.gov.uk/ukpga/1992/12/section/106A" },
    { label: "HMRC Capital Gains Manual: shares and securities", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg51500" },
    { label: "Tax when you sell shares: selling shares in the same company – GOV.UK", url: "https://www.gov.uk/tax-sell-shares/same-company" },
  ],
};
