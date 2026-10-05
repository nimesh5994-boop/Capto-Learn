import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "who-pays-and-accounting-periods",
  title: "Who pays corporation tax, and accounting periods",
  level: "foundation",
  minutes: 30,
  summary:
    "Which bodies pay corporation tax, the difference between a period of account and an accounting period, how a long set of accounts is split into two CT periods, and the duty to tell HMRC a company has become active.",
  objectives: [
    "Identify which entities are within the charge to corporation tax",
    "Distinguish a period of account (the accounts) from an accounting period (the tax period)",
    "Split a long period of account into accounting periods and allocate each type of profit correctly",
    "Explain when a new company must notify HMRC that it is chargeable",
  ],
  body: [
    {
      kind: "md",
      md: `Corporation tax (CT) is charged on the **taxable total profits** of companies. Before you can compute anything, you need to answer two questions: *is this body within the charge?* and *which period are we taxing?* Getting the period wrong is one of the most common causes of wrong payment dates, wrong rate calculations and missed filing deadlines.`,
    },
    {
      kind: "table",
      caption: "Who is within the charge to corporation tax",
      head: ["Body", "Pays CT?", "Notes"],
      rows: [
        ["UK-resident company (private or public limited)", "Yes, on worldwide profits", "Resident if incorporated in the UK, or centrally managed and controlled here"],
        ["Non-resident company trading through a UK permanent establishment", "Yes, on profits of the PE", "Branch profits only"],
        ["Non-resident company with UK property income", "Yes", "Moved from income tax to CT from 6 April 2020"],
        ["Unincorporated associations (sports and social clubs, societies)", "Yes", "e.g. on bank interest or trading with non-members"],
        ["Sole traders and partnerships", "No", "Income tax via Self Assessment; a corporate partner pays CT on its share"],
        ["LLPs carrying on a business", "No", "Tax-transparent: members are taxed"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Period of account vs accounting period",
      md: `- A **period of account** is the period for which the company draws up its **accounts**. It can be any length (commonly 12 months, but often longer or shorter in the first year or on a change of year end).
- An **accounting period** (AP) is the period for which **corporation tax is charged**. It can **never exceed 12 months** (CTA 2009 s10).

An AP **starts** when the company comes within the charge (usually when it starts to trade or first acquires a source of income) or immediately after the previous AP ends. It **ends** on the earliest of: 12 months after it began; the end of the period of account; the company starting or ceasing to trade; the start of winding up; or the company ceasing to be UK resident.`,
    },
    {
      kind: "md",
      md: `### Long periods of account

If a company draws up accounts for **more than 12 months** (say 15 months), there are **two accounting periods**: the **first 12 months**, and **the remainder** (here, 3 months). Each AP has its own CT computation, its own CT600, and its own payment date. The profits shown in the single set of accounts must be allocated between them:

| Type of profit | How it is allocated |
|---|---|
| Trading profit (adjusted, **before** capital allowances) | Time-apportioned |
| Capital allowances | Computed **separately for each AP** (with the AIA and WDAs pro-rated for a short AP) based on when the expenditure was incurred |
| Property income | Time-apportioned |
| Interest (loan relationships) | Accruals basis: allocated to the AP in which it accrues |
| Chargeable gains | Allocated to the AP in which the **disposal** happens |
| Qualifying charitable donations | Allocated to the AP in which they are **paid** |`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't time-apportion capital allowances",
      md: `A common mistake is to compute capital allowances for the whole 15 months and time-apportion them. That's wrong: compute allowances **for each accounting period separately**. An asset bought in month 14 attracts allowances only in the second (short) AP, and the AIA limit and any WDA for that short AP are scaled down (e.g. 3/12 for a 3-month AP).`,
    },
    {
      kind: "md",
      md: `### Deadlines for a long period of account

- **Payment:** each AP has its own due date, **9 months and 1 day** after the end of **that AP** (for companies that are not "large").
- **Filing:** both CT600s are due by the filing date for the **period of account**: normally **12 months after the end of the period of account** (for periods of account up to 18 months).

So a 15-month period means two payments on different dates but, usually, two returns filed together.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Notifying chargeability",
      md: `A new company must tell HMRC it has become **active** for corporation tax (for example, it has started trading) **within 3 months** of the start of its first accounting period. This is done by registering for CT online using the company's UTR, which HMRC posts to the registered office shortly after incorporation. A company that hasn't received a notice to file a return but has taxable profits must tell HMRC within **12 months** of the end of the AP, or face a failure-to-notify penalty.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Dormant companies",
      md: `A company that has been incorporated but isn't trading or receiving income is dormant for CT. Keep a note on file of when it became active (first sale, first invoice, first bank interest). That date drives the start of the first accounting period and the 3-month notification deadline.`,
    },
  ],
  scenario: {
    title: "Hartley Joinery Ltd changes its year end",
    narrative: `Hartley Joinery Ltd has always made accounts up to 30 September. The directors decide to move the year end to 31 December to fit their busy season, so the next accounts run for **15 months, 1 October 2024 to 31 December 2025**.

The draft accounts show:

| Item | Amount |
|---|---:|
| Adjusted trading profit before capital allowances (15 months) | £300,000 |
| New van bought 12 March 2025 | £30,000 |
| Machinery bought 20 November 2025 | £20,000 |
| Gain on sale of a storage unit, 4 August 2025 | £15,000 |
| Gift Aid payment to a local charity, 10 December 2025 | £2,000 |

The office manager asks: *"Do we file one return or two, and when do we pay?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Identify the APs.** An AP can't exceed 12 months, so: **AP1 = 1 Oct 2024 to 30 Sep 2025** (12 months) and **AP2 = 1 Oct 2025 to 31 Dec 2025** (3 months).
2. **Time-apportion the trading profit before capital allowances:** AP1 £300,000 × 12/15 = **£240,000**; AP2 £300,000 × 3/15 = **£60,000**.
3. **Capital allowances by date of expenditure:** the van (March 2025) falls in AP1; the machinery (November 2025) in AP2. Both are within the AIA, and AP2's AIA limit is £1,000,000 × 3/12 = £250,000, so £20,000 is fully covered.
4. **Gain:** disposal in August 2025, so it's in **AP1**.
5. **Charitable donation:** paid in December 2025, so it's deducted in **AP2**.`,
      },
      {
        kind: "table",
        caption: "Taxable total profits for each accounting period",
        head: ["", "AP1 (12 m to 30.9.25)", "AP2 (3 m to 31.12.25)"],
        rows: [
          ["Trading profit before CAs", "£240,000", "£60,000"],
          ["Less capital allowances", "(£30,000)", "(£20,000)"],
          ["Trading profit", "£210,000", "£40,000"],
          ["Chargeable gain", "£15,000", "–"],
          ["Less qualifying charitable donation", "–", "(£2,000)"],
          ["**Taxable total profits**", "**£225,000**", "**£38,000**"],
          ["CT payment due", "1 July 2026", "1 October 2026"],
          ["CT600 filing deadline", "31 December 2026", "31 December 2026"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Short APs scale the rate limits too",
        md: `In AP2 the small profits and marginal relief limits are scaled by 3/12 (to £12,500 and £62,500), so £38,000 falls in the marginal relief band even though it would be well within the small profits rate for a 12-month period. The next lesson covers this.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "eighteen-month-split",
      prompt:
        "Ridgeway Signs Ltd prepares accounts for the 18 months to 31 March 2027. Its adjusted trading profit before capital allowances for the 18 months is £540,000. How much is allocated to the **first** accounting period?",
      answer: 360000,
      unit: "£",
      explain:
        "The first AP is the first 12 months; the second is the remaining 6 months. Trading profit before capital allowances is time-apportioned.",
      working: "£540,000 × 12/18 = **£360,000** (AP2 gets £540,000 × 6/18 = £180,000).",
    },
    {
      kind: "classify",
      id: "allocation-methods",
      prompt: "A company has a 16-month period of account. How is each item allocated between the two accounting periods?",
      categories: ["Time-apportioned", "AP in which it happens / is paid", "Computed separately for each AP"],
      items: [
        { text: "Adjusted trading profit before capital allowances", answer: 0 },
        { text: "Gain on the sale of an investment property", answer: 1, why: "Gains belong to the AP in which the disposal takes place." },
        { text: "Capital allowances on a new lorry", answer: 2, why: "Allowances are computed per AP based on when the expenditure was incurred." },
        { text: "Rental income from a let unit", answer: 0 },
        { text: "Gift Aid payment to a registered charity", answer: 1, why: "Qualifying charitable donations are deducted in the AP in which they are paid." },
      ],
      explain:
        "Income that accrues evenly (trading profit before allowances, rents) is time-apportioned. One-off events (gains, donations paid) go to the AP in which they happen. Capital allowances are always calculated period by period.",
    },
    {
      kind: "numeric",
      id: "second-ap-length",
      prompt: "A company's period of account runs from 1 June 2025 to 31 October 2026. How many **months** long is the second accounting period?",
      answer: 5,
      unit: "months",
      tolerance: 0,
      explain: "The period of account is 17 months. AP1 is the first 12 months (1 June 2025 to 31 May 2026). AP2 is the remaining 5 months (1 June 2026 to 31 October 2026).",
      working: "17 months − 12 months = **5 months**.",
    },
    {
      kind: "mcq",
      id: "ap2-payment-date",
      prompt:
        "A company (not large) has a 15-month period of account ending 31 March 2027. When is the corporation tax for the **first** accounting period due?",
      options: ["1 October 2027", "1 January 2028", "1 April 2028", "31 March 2028"],
      answer: 0,
      explain:
        "The period of account starts 1 January 2026, so AP1 is 1 January 2026 to 31 December 2026. CT for AP1 is due 9 months and 1 day after the end of **that AP**: **1 October 2027**. 1 January 2028 is the due date for AP2 (ending 31 March 2027). 31 March 2028 is the filing deadline for both returns, not a payment date.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-max-ap",
      prompt: "What is the maximum length of an accounting period for corporation tax?",
      options: ["12 months", "15 months", "18 months", "There's no limit"],
      answer: 0,
      explain: "An accounting period can never exceed 12 months. A longer period of account is split.",
    },
    {
      kind: "mcq",
      id: "q-partnership",
      prompt: "Which of these pays corporation tax on its own profits?",
      options: ["A two-partner general partnership", "A golf club run as an unincorporated association", "A sole trader plumber", "An LLP of architects"],
      answer: 1,
      explain: "Unincorporated associations such as clubs are within the charge to CT. Partnerships, LLPs and sole traders are taxed through their individual partners, members or owners.",
    },
    {
      kind: "mcq",
      id: "q-notify",
      prompt: "Within what period must a new company tell HMRC it has become active for corporation tax?",
      options: ["30 days", "3 months", "9 months", "12 months"],
      answer: 1,
      explain: "A company must tell HMRC within 3 months of the start of its first accounting period (usually when it starts trading).",
    },
    {
      kind: "mcq",
      id: "q-gain-allocation",
      prompt: "In a 14-month period of account, a company sells a building in month 13. Which accounting period does the gain fall into?",
      options: ["The first 12-month AP", "The second 2-month AP", "It's time-apportioned 12/14 and 2/14", "Neither: gains are taxed separately"],
      answer: 1,
      explain: "Gains are allocated to the AP in which the disposal is made, so month 13 is in the second AP.",
    },
    {
      kind: "mcq",
      id: "q-filing-long",
      prompt: "A company has a 15-month period of account ending 30 June 2026. When are the CT600s due?",
      options: ["Both by 30 June 2027", "The first by 31 March 2026, the second by 30 June 2027", "Both by 1 April 2027", "The first by 1 April 2026, the second by 1 April 2027"],
      answer: 0,
      explain: "For a period of account of up to 18 months, both returns are due 12 months after the end of the period of account.",
    },
  ],
  sources: [
    { label: "Corporation Tax: accounting periods", url: "https://www.gov.uk/corporation-tax-accounting-period" },
    { label: "HMRC Company Taxation Manual CTM01405 – accounting periods: apportionment", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm01405" },
    { label: "HMRC Company Taxation Manual CTM01410 – accounting periods: commencement", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm01410" },
    { label: "Set up your company for Corporation Tax", url: "https://www.gov.uk/limited-company-formation/set-up-your-company-for-corporation-tax" },
    { label: "Company Tax Returns: overview", url: "https://www.gov.uk/company-tax-returns" },
  ],
};
