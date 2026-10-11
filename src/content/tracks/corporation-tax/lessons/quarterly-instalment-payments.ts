import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "quarterly-instalment-payments",
  title: "Large companies: quarterly instalment payments",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "When a company becomes 'large' and has to pay corporation tax in quarterly instalments, the £1.5m and £20m thresholds and how associated companies reduce them, the exceptions, instalment dates and amounts (including short periods), and interest on under- and overpayments.",
  objectives: [
    "Decide whether a company is large or very large, allowing for associated companies and short periods",
    "Apply the first-year exception and the £10,000 de minimis",
    "Calculate the dates and amounts of quarterly instalments for 12-month and short accounting periods",
    "Explain how instalment interest works and why forecasts matter",
  ],
  body: [
    {
      kind: "md",
      md: `Most clients pay corporation tax in one sum, 9 months and 1 day after the year end. But once profits pass **£1.5 million**, a company becomes **large** and must pay by **quarterly instalments** based on its own estimate of the current year's liability, starting **during** the year. Clients growing fast often miss this, and the interest arrives with the return.`,
    },
    {
      kind: "table",
      caption: "Who pays by instalments",
      head: ["Category", "Profits test (12-month AP, no associates)", "Instalments due"],
      rows: [
        ["Not large", "£1.5m or less", "One payment 9 months and 1 day after the AP"],
        ["Large", "More than £1.5m (up to £20m)", "Months 7, 10, 13 and 16 from the start of the AP (on the 14th)"],
        ["Very large", "More than £20m", "Months 3, 6, 9 and 12 from the start of the AP (on the 14th)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Applying the thresholds",
      md: `- **Profits** means **augmented profits**: TTP plus exempt dividends from companies outside the group.
- The **£1.5m** (and the £10m and £20m) thresholds are **divided by 1 + the number of associated companies**, and **pro-rated** for a short AP.
- **First-year exception:** a company isn't required to pay instalments for an AP if it **wasn't large in the previous 12 months** and its profits are **no more than £10m** (both adjusted for associates). So the first year a company crosses £1.5m it usually pays on the normal date.
- **De minimis:** no instalments if the company's CT liability for the AP is **£10,000 or less**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Dates and amounts (large company, 12-month AP)",
      md: `- **First instalment:** 6 months and 13 days after the start of the AP.
- **Second and third:** at 3-monthly intervals after that.
- **Fourth:** 3 months and 14 days after the end of the AP.

For a calendar-year AP ending 31 December 2026: **14 July 2026, 14 October 2026, 14 January 2027 and 14 April 2027**.

Each instalment = **3 × estimated liability ÷ number of months in the AP**, so one quarter each for a 12-month AP.

**Short APs:** instalments run at 3-monthly intervals from 6 months 13 days after the start until the final instalment, which is always 3 months and 14 days after the end. Each earlier instalment is 3/n of the liability (n = months in the AP); the final one is the balance. An AP of 3 months or less has a single payment.`,
    },
    {
      kind: "md",
      md: `### Interest, not penalties

Instalments are based on the company's **best estimate** at each due date. When the return is filed, HMRC works out what each instalment should have been from the final liability and charges **debit interest** on any shortfall from each due date (or pays **credit interest** on overpayments). The instalment interest rates are lower than normal late payment interest and track base rate. Interest charged is deductible as a non-trading loan relationship debit.

Penalties apply only where a company **deliberately or recklessly** fails to pay instalments (up to twice the interest). Overpaid instalments can be reclaimed if the estimate falls.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Watch the growth curve",
      md: `Diary a profits check at month 5 of every AP for clients approaching £1.5m (or less if they have associated companies: with two associates the threshold is £500,000). The first instalment is due before the year end, so a forecast is needed. Groups can use a **group payment arrangement** to pay instalments for all members together, reducing interest exposure.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Associated companies shrink the threshold fast",
      md: `A company with **three** associated companies divides by 4: the large threshold becomes **£375,000**. Many owner-managed groups with several companies are paying instalments without realising it. Check associates using the control test from the rates lesson.`,
    },
  ],
  scenario: {
    title: "Castlegate Software Ltd grows up",
    narrative: `**Castlegate Software Ltd** (Manchester) has a **31 December** year end and no associated companies. Its augmented profits have been:

| Year ended | Augmented profits | CT liability |
|---|---:|---:|
| 31 December 2025 | £1,200,000 | £300,000 |
| 31 December 2026 (forecast) | £1,800,000 | £450,000 |
| 31 December 2027 (forecast) | £2,400,000 | £600,000 |

The FD asks in October 2026: *"Our profits have jumped. Should we have started paying tax quarterly?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**2026.** Profits of £1.8m make the company large. But it **wasn't large** in 2025 (£1.2m) and 2026 profits are under **£10m**, so the **first-year exception** applies: no instalments for 2026. The £450,000 is due on **1 October 2027**.

**2027.** Large again (£2.4m), and it **was** large in the previous 12 months, so instalments apply. Each instalment is £600,000 ÷ 4 = **£150,000**.

Notice the cash-flow squeeze: the 2026 tax (£450,000, due 1 October 2027) and the first three 2027 instalments (£150,000 each on 14 July 2027, 14 October 2027 and 14 January 2028) all fall within about 6 months.`,
      },
      {
        kind: "table",
        caption: "Castlegate's payments from 2027",
        head: ["Date", "Payment", "For"],
        rows: [
          ["14 July 2027", "£150,000", "2027 instalment 1"],
          ["1 October 2027", "£450,000", "2026 liability (first-year exception)"],
          ["14 October 2027", "£150,000", "2027 instalment 2"],
          ["14 January 2028", "£150,000", "2027 instalment 3"],
          ["14 April 2028", "£150,000", "2027 instalment 4"],
        ],
      },
      {
        kind: "md",
        md: `**Advice.** Warn the client now about £900,000 of payments between July 2027 and January 2028, and update the 2027 forecast before each instalment: if profits come in higher, top up the next instalment to limit debit interest.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "associated-threshold",
      prompt:
        "A company has two associated companies throughout. Above what level of augmented profits (12-month AP) is it a large company?",
      answer: 500000,
      unit: "£",
      explain: "The £1.5m threshold is divided by 1 + the number of associated companies.",
      working: "£1,500,000 ÷ (1 + 2) = **£500,000**",
    },
    {
      kind: "numeric",
      id: "instalment-amount",
      prompt:
        "A large company (large in the previous year too) estimates its CT liability for the year ended 31 March 2027 at £600,000. How much is each quarterly instalment?",
      answer: 150000,
      unit: "£",
      explain: "Each instalment is 3/12 of the estimated liability for a 12-month AP.",
      working: "£600,000 × 3/12 = **£150,000**",
    },
    {
      kind: "numeric",
      id: "short-ap-instalment",
      prompt:
        "A large company has an 8-month AP from 1 January to 31 August 2027 with an estimated liability of £400,000. How much is the **first** instalment?",
      answer: 150000,
      unit: "£",
      explain: "In a short AP each instalment before the last is 3/n of the liability, where n is the number of months in the AP.",
      working: "£400,000 × 3/8 = **£150,000** (due 14 July 2027; then £150,000 on 14 October and the balance of £100,000 on 14 December 2027)",
    },
    {
      kind: "mcq",
      id: "dates-march",
      prompt: "A large company has a year ended 31 March 2027. When is its first quarterly instalment due?",
      options: ["14 July 2026", "14 October 2026", "1 January 2027", "14 April 2027"],
      answer: 1,
      explain: "6 months and 13 days after the start of the AP (1 April 2026): 14 October 2026. The others are 14 January, 14 April and 14 July 2027.",
    },
    {
      kind: "classify",
      id: "instalments-or-not",
      prompt: "Does each company (12-month AP, no associates unless stated) have to pay by quarterly instalments?",
      categories: ["Yes", "No"],
      items: [
        { text: "Profits £2m this year; £1.9m last year", answer: 0 },
        { text: "Profits £2m this year; £900,000 last year (first time over £1.5m)", answer: 1, why: "First-year exception." },
        { text: "Profits £12m this year; £1m last year", answer: 0, why: "The first-year exception doesn't apply above £10m." },
        { text: "Profits £600,000; three associated companies; also large last year", answer: 0, why: "Threshold is £1.5m ÷ 4 = £375,000." },
        { text: "Profits £1.2m; no associates", answer: 1 },
      ],
      explain: "Large = augmented profits over £1.5m ÷ (1 + associates). The first-year exception applies if not large in the previous 12 months and profits ≤ £10m (also divided).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-large-threshold",
      prompt: "Above what level of profits (no associates, 12-month AP) is a company large for instalment purposes?",
      options: ["£250,000", "£1.5 million", "£10 million", "£20 million"],
      answer: 1,
      explain: "£1.5 million of augmented profits.",
    },
    {
      kind: "mcq",
      id: "q-very-large",
      prompt: "A very large company (profits over £20m) with a calendar-year AP pays its first instalment on:",
      options: ["14 March", "14 April", "14 July", "1 October of the next year"],
      answer: 0,
      explain: "Very large companies pay in months 3, 6, 9 and 12 of the AP: 14 March, June, September and December.",
    },
    {
      kind: "mcq",
      id: "q-last-instalment",
      prompt: "When is the final instalment due for a large company?",
      options: ["9 months and 1 day after the AP ends", "3 months and 14 days after the AP ends", "On the last day of the AP", "12 months after the AP ends"],
      answer: 1,
      explain: "3 months and 14 days after the end of the AP.",
    },
    {
      kind: "mcq",
      id: "q-de-minimis",
      prompt: "A company is large, but its CT liability for the AP is £9,000 (e.g. because of loss relief). Does it pay instalments?",
      options: ["Yes", "No: liabilities of £10,000 or less are excluded", "Only the final instalment", "Only if it has associates"],
      answer: 1,
      explain: "There's a £10,000 de minimis.",
    },
    {
      kind: "mcq",
      id: "q-underpaid",
      prompt: "What happens if a company's instalments turn out too low because profits beat the forecast?",
      options: ["A fixed £100 penalty per instalment", "Debit interest from each due date on the shortfall", "Nothing, if paid by the filing date", "The company loses the small profits rate"],
      answer: 1,
      explain: "Interest is charged on the shortfall; penalties only for deliberate or reckless failure.",
    },
  ],
  sources: [
    { label: "Corporation Tax: paying in instalments (GOV.UK)", url: "https://www.gov.uk/guidance/corporation-tax-paying-in-instalments" },
    { label: "CTM92000: CTSA – the payment obligation (Company Taxation Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm92000" },
    { label: "HMRC interest rates for late and early payments", url: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates" },
    { label: "The Corporation Tax (Instalment Payments) Regulations 1998", url: "https://www.legislation.gov.uk/uksi/1998/3175/contents/made" },
  ],
};
