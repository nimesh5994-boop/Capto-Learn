import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "closing-a-company-mvl-badr-and-the-taar",
  title: "Closing a solvent company: MVL, strike-off, BADR and the TAAR",
  level: "advanced",
  minutes: 40,
  summary:
    "How a solvent owner-managed company is wound up and the shareholder taxed: the members' voluntary liquidation, the £25,000 s1030A strike-off route, Business Asset Disposal Relief at 18% from April 2026, the winding-up TAAR, and what to do about an overdrawn loan account.",
  objectives: [
    "Compare a members' voluntary liquidation with a Companies House strike-off for a solvent company",
    "Explain why liquidation distributions are normally capital distributions taxed under CGT",
    "Apply s1030A (the £25,000 limit) and the four conditions of the winding-up TAAR",
    "Calculate CGT on a liquidation distribution with and without Business Asset Disposal Relief at 2026/27 rates",
    "Deal with an overdrawn director's loan account, VAT, PAYE and final accounts when closing",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `When an owner-director retires, sells the business assets or simply stops trading, the question is how to get the remaining cash out. If the company is **solvent** there are two routes: a formal **members' voluntary liquidation (MVL)** run by a licensed insolvency practitioner, or an **informal strike-off** applied for at Companies House. Which route is right turns on the **amount** left in the company and the **tax** on the shareholder.`,
    },
    {
      kind: "table",
      caption: "Choosing the route",
      head: ["", "Members' voluntary liquidation", "Strike-off (dissolution)"],
      rows: [
        ["Who runs it", "A licensed insolvency practitioner (liquidator)", "The directors, via an application to Companies House"],
        ["Declaration of solvency", "Required: directors swear the company can pay all debts within 12 months", "Not required, but all debts must be settled; creditors can object"],
        ["Distributions", "Capital distributions in a winding up (taxed as capital gains)", "Capital treatment only up to **£25,000** in total (CTA 2010 s1030A); anything above is taxed as a dividend"],
        ["Cost", "Typically a few thousand pounds in liquidator's fees", "Small fee; no insolvency practitioner"],
        ["Use when", "Distributable amount over £25,000", "Amounts up to £25,000 and no complications"],
        ["Anti-avoidance", "Winding-up TAAR applies", "Winding-up TAAR applies; s1030A also has its own conditions"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax on a liquidation distribution",
      md: `- A **capital distribution** in the winding up of a company is treated as a **disposal of shares** by the shareholder (TCGA 1992 s122). It is **not** a dividend. The gain is the amount received less the base cost of the shares.
- CGT rates for 2026/27: **18% / 24%** on ordinary gains; the annual exempt amount is **£3,000**.
- **Business Asset Disposal Relief (BADR)** taxes qualifying gains at **18%** from 6 April 2026 (14% in 2025/26), up to a **£1 million lifetime limit**.
- For BADR on shares: the individual must be an **officer or employee** and hold **at least 5% of the ordinary share capital with 5% of the voting rights**, and be entitled to **at least 5% of either the distributable profits and assets on a winding up, or the sale proceeds** if the company is sold, in a **trading company** (or holding company of a trading group), throughout the **2 years** before the **cessation of the business**. The distribution must be made **within 3 years** after the cessation. (CG64115 deals with liquidations.)
- **Informal strike-offs:** under **CTA 2010 s1030A**, distributions of up to **£25,000** in total are treated as capital if conditions are met; above £25,000 the whole distribution is taxed as income.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The winding-up TAAR (ITTOIA 2005 ss396B, 404A)",
      md: `The **targeted anti-avoidance rule** applies to distributions in a winding up made on or after 6 April 2016. If **all four conditions** are met, the distribution is **taxed as a dividend**, not capital:

- **A:** the individual held **at least 5%** of the company immediately before the winding-up.
- **B:** the company was a **close company** at some point in the two years before.
- **C:** within **2 years** after the distribution the individual is involved in carrying on a **same or similar trade or activity** to that of the wound-up company.
- **D:** it is reasonable to conclude that **avoiding or reducing income tax** was the main purpose, or one of the main purposes, of the winding-up.

HMRC's target is "phoenixism", closing and reopening to turn income into capital. A genuine retirement, sale of the business or change of career is not caught. But a contractor who liquidates and starts the same contracting business in a new company within two years has a problem.`,
    },
    {
      kind: "md",
      md: `### The closing checklist

1. **Trading finished?** Stop trading, collect debts, pay creditors, sell or distribute assets. Pre-closure **VAT deregistration**, **PAYE** final submission (FPS) and **CIS** matters if any.
2. **Overdrawn director's loan account?** Don't leave it. In an MVL the liquidator will treat it as an asset and normally **sets it off against the distribution**. Check how s455 and s458 relief apply (CTM61559). A loan the shareholder can't repay can't just be ignored.
3. **Final accounts and corporation tax return.** The final accounting period and a liquidation period have separate returns. Tax on gains in the company (for example on assets distributed in specie) must be paid.
4. **Capital allowances and balancing charges** on assets disposed of; **stock** and **work in progress** valued correctly.
5. **Claim BADR** on the shareholder's Self Assessment return for the year of the distribution, or using Section A of the BADR helpsheet. The deadline is the first anniversary of the 31 January after the end of that tax year (for 2026/27, 31 January 2029).
6. **Retain records** (6 years for companies, plus liquidation papers).
7. **Check the date** of the first distribution: BADR needs it **within three years** of cessation.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Several distributions",
      md: `A liquidator may make **interim** distributions then a final one. Each is a part-disposal of the shares. For BADR, claim the relief on the **whole** gain across the tax year(s). Keep a running schedule. If the distributions fall in two tax years, both annual exempt amounts are available.`,
    },
  ],
  scenario: {
    title: "Winding up Rowan Plant Hire Ltd",
    narrative: `Rowan Plant Hire Ltd has been trading for 12 years. Its sole director and shareholder, Ellis Rowan (an officer, 100% of the shares, base cost £100), stopped trading on 31 March 2026 and is retiring. After paying all creditors and corporation tax, the company holds £210,000 of cash, and the liquidator's fees have been paid. Ellis will take up no other work. The company is placed in MVL in October 2026 and the whole £210,000 is distributed in November 2026 (tax year 2026/27). Ellis has not used BADR before.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: route.** £210,000 is far over the £25,000 s1030A limit, so use an **MVL**.

**Step 2: capital or income?** The distribution is a capital distribution, so Ellis has a **disposal of shares**. Gain = £210,000 − £100 = **£209,900**.

**Step 3: BADR conditions.** Officer, 100% shareholder (so 100% of the votes and of the profits and assets), trading company, held for the 2 years before cessation, distribution made within 3 years of cessation (cessation 31 March 2026, distribution November 2026). BADR available.

**Step 4: CGT.** The £209,900 is well within the £1 million lifetime limit. The annual exempt amount is £3,000. Tax: (£209,900 − £3,000) × 18% = **£37,242**.

**Step 5: compare with dividends.** If the same £210,000 were paid as a dividend, assuming additional-rate: (£210,000 − £500) × 39.35% ≈ **£82,438**. The MVL saves about £45,000.

**Step 6: TAAR.** Ellis meets conditions A and B. Condition C is **not** met if he truly stops: no same-or-similar activity within two years. Record in the file that he is retiring, has no plans to carry on the trade and that the winding-up is for commercial reasons. Warn him not to restart a similar business in the next two years.

**Step 7: housekeeping.** Confirm the DLA is at nil, deregister VAT and PAYE, file the final CT600, and put the capital gains calculation on the 2026/27 Self Assessment return with the BADR claim.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "badr-tax",
      prompt: "A shareholder qualifies for BADR and receives a £250,000 liquidation distribution on shares with a base cost of £1,000 in 2026/27. The gain is within the lifetime limit and the £3,000 annual exempt amount is available. What is the CGT (£)?",
      answer: 44280,
      tolerance: 1,
      unit: "£",
      explain: "Gain less the annual exempt amount, taxed at the BADR rate of 18% from 6 April 2026.",
      working: "Gain £249,000 − £3,000 = £246,000 × 18% = **£44,280**.",
    },
    {
      kind: "classify",
      id: "classify-taar",
      prompt: "Does the winding-up TAAR threaten capital treatment?",
      categories: ["TAAR risk", "No TAAR risk"],
      items: [
        { text: "A contractor liquidates their company and starts the same IT contracting through a new company 6 months later", answer: 0 },
        { text: "A director retires and does no further work in any similar field", answer: 1 },
        { text: "A 3% shareholder with no other involvement receives a distribution", answer: 1, why: "Condition A requires at least 5%." },
        { text: "A shareholder liquidates the company and resumes a similar trade after 3 years", answer: 1, why: "Condition C is limited to two years after the distribution." },
      ],
      explain: "All four conditions must be met, so a gap of over two years or genuine cessation takes the case outside the TAAR.",
    },
    {
      kind: "mcq",
      id: "mcq-s1030a",
      prompt: "Up to what total amount are distributions on a strike-off treated as capital under CTA 2010 s1030A?",
      options: ["£10,000", "£25,000", "£50,000", "£100,000"],
      answer: 1,
      explain: "£25,000. Above that, the whole distribution is taxed as a dividend.",
    },
    {
      kind: "mcq",
      id: "mcq-badr-window",
      prompt: "For BADR on a liquidation distribution, by when must the distribution be made after the business ceases?",
      options: ["1 year", "2 years", "3 years", "No limit"],
      answer: 2,
      explain: "The distribution must be made within 3 years of cessation.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-brda-rate",
      prompt: "What is the BADR rate from 6 April 2026?",
      options: ["10%", "14%", "18%", "24%"],
      answer: 2,
      explain: "10% to 2024/25, 14% in 2025/26 and 18% from 6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-lifetime",
      prompt: "What is the BADR lifetime limit?",
      options: ["£1 million", "£10 million", "£500,000", "£5 million"],
      answer: 0,
      explain: "£1 million since 11 March 2020.",
    },
    {
      kind: "mcq",
      id: "q-solvency",
      prompt: "What do directors need to swear before an MVL can proceed?",
      options: ["A declaration of solvency", "A tax clearance", "A confirmation statement", "A VAT clearance"],
      answer: 0,
      explain: "A declaration that the company can pay its debts within 12 months.",
    },
    {
      kind: "mcq",
      id: "q-trading",
      prompt: "BADR on shares requires the company to be…",
      options: ["Any limited company", "A trading company (or holding company of a trading group)", "A property investment company", "Listed on AIM"],
      answer: 1,
      explain: "A trading company or holding company of a trading group.",
    },
    {
      kind: "mcq",
      id: "q-taar-time",
      prompt: "How long after the distribution can similar activity trigger the TAAR?",
      options: ["6 months", "1 year", "2 years", "5 years"],
      answer: 2,
      explain: "Condition C looks at the two years following the distribution.",
    },
  ],
  sources: [
    { label: "CTM36305 – TAAR on winding up", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm36305" },
    { label: "CG64115 – BADR on liquidation", url: "https://www.gov.uk/hmrc-internal-manuals/capital-gains-manual/cg64115" },
    { label: "CTM61559 – loans to participators and MVL", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61559" },
    { label: "Business Asset Disposal Relief – GOV.UK", url: "https://www.gov.uk/business-asset-disposal-relief" },
    { label: "Business Asset Disposal Relief: eligibility", url: "https://www.gov.uk/business-asset-disposal-relief/eligibility" },
    { label: "Business Asset Disposal Relief: how to claim", url: "https://www.gov.uk/business-asset-disposal-relief/how-to-claim" },
    { label: "Capital Gains Tax rates", url: "https://www.gov.uk/capital-gains-tax/rates" },
    { label: "Closing a limited company – GOV.UK", url: "https://www.gov.uk/closing-a-limited-company" },
  ],
};
