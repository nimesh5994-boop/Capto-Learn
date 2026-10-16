import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "penalties-late-filing-late-payment-and-inaccuracies",
  title: "HMRC penalties: late filing, late payment and inaccuracies in 2026/27",
  level: "practitioner",
  minutes: 40,
  summary:
    "The main penalty regimes a practice deals with: Self Assessment and the new points-based regime for MTD for Income Tax, VAT, Corporation Tax late filing, late payment penalties and interest, penalties for inaccuracies (30%, 70%, 100%) and how to appeal or reduce them.",
  objectives: [
    "Calculate late filing and late payment penalties for Self Assessment and Corporation Tax",
    "Explain the points-based late submission regime for VAT and MTD for Income Tax",
    "Calculate VAT late payment penalties for periods due on or after 31 May 2025",
    "Calculate the range of an inaccuracy penalty and how disclosure reduces it",
    "Advise on reasonable excuse, appeals and time to pay arrangements",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Penalties are a daily reality for a practice. They are rarely large for a single failure, but they accumulate, they damage the client relationship, and they are often avoidable with a diary and a conversation. Penalty regimes also differ by tax and have been reformed several times recently, so check the **current** rules for the **relevant period**.`,
    },
    {
      kind: "table",
      caption: "Self Assessment (traditional regime) late filing and late payment",
      head: ["Time after the deadline", "Late filing", "Late payment (of unpaid tax)"],
      rows: [
        ["1 day", "£100", "None"],
        ["30 days", "", "5% of tax unpaid"],
        ["3 months", "£10 a day for up to 90 days (max £900)", ""],
        ["6 months", "5% of the tax due or £300, whichever is greater", "A further 5% of unpaid tax"],
        ["12 months", "A further 5% of the tax due or £300, whichever is greater (in serious cases the penalty can be higher)", "A further 5% of unpaid tax"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "MTD for Income Tax: the new points-based regime",
      md: `Taxpayers within **MTD for Income Tax** (from **April 2026**) are subject to a **points-based** late submission regime:

- **1 penalty point** for each missed **quarterly update** or **tax return** deadline (one point per deadline). **For 2026/27 there are no penalties for missing a quarterly update deadline**; points for quarterly updates start from 2027/28. The 2026/27 tax return deadline still counts.
- At **4 points** (the threshold for quarterly submitters) a **£200 penalty** is charged, and **£200** for each further missed deadline.
- Points **expire after 24 months** if the taxpayer stays below the threshold. Once at the threshold, they must submit on time for **12 months** and catch up any outstanding submissions for the previous 24 months to clear the points.
- **Late payment** (2026/27 tax year): no penalty if paid within **15 days**; **3%** of the tax owed at day 15 if paid between day 16 and 30; from day 31, **3% at day 15 plus 3% at day 30**, plus a second penalty at **10% a year** charged daily on the outstanding balance. In the taxpayer's **first year** in MTD, no penalty is charged if the tax is paid within **30 days**. For 2027/28 the first two percentages increase to **4%**. The penalties don't apply to payments on account.
- The new penalties don't apply to returns for partnerships, trusts, estates or non-resident companies. From **April 2027** they apply to everyone who submits a personal Self Assessment return, whether or not they are in MTD.`,
    },
    {
      kind: "md",
      md: `### VAT

- **Late submission:** a **points** system. A point is added for each late return; at the **threshold** (**2** for annual, **4** for quarterly, **5** for monthly returns) a **£200** penalty is charged, and £200 for each further late return while at the threshold. Points reset after a compliant period.
- **Late payment (periods where the tax is due on or after 31 May 2025):** **3%** of the tax outstanding at **day 15**, plus a further **3%** of the tax outstanding at **day 30**, then a **second penalty** at an annual rate of **10%** on the outstanding balance, charged daily from day 31. (The earlier regime used 2%/2% and 4% a year.)
- **Interest** is also charged on late payment.

### Corporation Tax late filing

For a **Company Tax Return** filed late: **£200** at one day, a further **£200** at three months, and **10% of the unpaid tax** at six months and again at 12 months. If the return is late **three times in a row**, the £200 penalties rise to **£1,000**. (Before HMRC's 2026 increase the fixed penalties were **£100**: check which applies by filing date.) After six months HMRC may issue a **tax determination** estimating the tax.

### Penalties for inaccuracies

A penalty is chargeable where a return contains an **inaccuracy** leading to understated tax. The penalty is a percentage of the **potential lost revenue** and depends on behaviour:

| Behaviour | Maximum | Minimum (unprompted disclosure) |
|---|---|---|
| Careless | 30% | 0% |
| Deliberate, not concealed | 70% | 20% |
| Deliberate and concealed | 100% | 30% |

The percentage actually charged depends on the **quality of disclosure**: whether **prompted or unprompted**, and how much the taxpayer **tells, helps and gives access**.

### Reasonable excuse, appeals and time to pay

- A **reasonable excuse** (something that prevented compliance despite the taxpayer's reasonable care, for example serious illness or a system failure) can cancel a penalty, but only for as long as the excuse lasts and once remedied without unreasonable delay.
- **Appeal** in writing within **30 days** of the penalty notice; HMRC can review, and the First-tier Tribunal hears appeals.
- A **time to pay arrangement** agreed **before** the payment date can avoid late payment penalties for the arrangement period, so **contact HMRC early**.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Avoiding penalties",
      md: `1. A **diary** of every filing and payment date for each client and each tax.
2. **Information deadlines** in the engagement letter that give you time before HMRC's.
3. **Chase** clients early and in writing; keep the evidence.
4. **File on time even if tax can't be paid**; late filing penalties accumulate regardless.
5. **Talk to HMRC** about time to pay before the due date.
6. **Check notices**: errors in HMRC penalty notices are common enough to be worth challenging.`,
    },
  ],
  scenario: {
    title: "A late return and late payment: Hana Ito",
    narrative: `Hana Ito, a landlord outside MTD, has a 2025/26 Self Assessment return due **31 January 2027** with **£4,000** tax to pay. She files on **15 August 2027** and pays the £4,000 on the same day. Separately, her limited company, **Ito Lettings Ltd**, files its corporation tax return **5 months** late (the unpaid tax at six months is not yet due). It paid its tax on time.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Hana: late filing.**
- Day 1 (1 February 2027): **£100**.
- Three months late (from 1 May 2027): **£10 a day**, capped at 90 days. Hana files on 15 August 2027, more than 90 days after 1 May, so the maximum **£900** applies.
- Six months late (31 July 2027): **5% of £4,000 = £200** or **£300**, whichever is greater: **£300**.
- Total late filing = £100 + £900 + £300 = **£1,300**.

**Hana: late payment.**
- 30 days late (2 March 2027): 5% × £4,000 = **£200**.
- Six months late (31 July 2027): a further 5% = **£200**.
- Total late payment penalties = **£400**, plus **interest** from 31 January 2027 to 15 August 2027.

**Ito Lettings Ltd: late filing.** Five months late: **£200** (one day) plus **£200** (three months) = **£400**. The 10% penalties apply at six months to any unpaid tax; none here because it was paid.

**Advice.** Pay the penalties (or appeal if there is a reasonable excuse), put diary dates in place, and consider changing the engagement terms about information deadlines.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "sa-late-filing",
      prompt: "A Self Assessment return is 7 months late (tax due £5,000). Using the traditional regime, what is the total late filing penalty (£)? (£100 + £900 + the greater of 5% of tax due or £300.)",
      answer: 1300,
      unit: "£",
      explain: "£100, plus £900 daily penalties, plus the six-month penalty (5% of £5,000 = £250, so £300 applies).",
      working: "£100 + £900 + £300 = **£1,300**.",
    },
    {
      kind: "numeric",
      id: "sa-late-payment",
      prompt: "£10,000 of Self Assessment tax is paid more than six months late. What late payment penalties arise at 30 days and 6 months (5% each) (£)?",
      answer: 1000,
      unit: "£",
      explain: "5% at 30 days and 5% at 6 months.",
      working: "£10,000 × 5% × 2 = **£1,000**.",
    },
    {
      kind: "numeric",
      id: "vat-late-payment",
      prompt: "£10,000 of VAT (due after 31 May 2025) is still unpaid after day 30. What is the first-tier late payment penalty (3% at day 15 plus 3% at day 30) (£)?",
      answer: 600,
      unit: "£",
      explain: "3% + 3% of the outstanding amount.",
      working: "£10,000 × 3% = £300 at day 15; £300 at day 30; total **£600** (then 10% a year, daily, as a second penalty).",
    },
    {
      kind: "numeric",
      id: "careless-max",
      prompt: "Potential lost revenue is £15,000 and the inaccuracy is careless. What is the maximum penalty (£)?",
      answer: 4500,
      unit: "£",
      explain: "30% of the potential lost revenue.",
      working: "£15,000 × 30% = **£4,500**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sa-first",
      prompt: "What is the initial Self Assessment late filing penalty?",
      options: ["£50", "£100", "£200", "£500"],
      answer: 1,
      explain: "£100.",
    },
    {
      kind: "mcq",
      id: "q-vat-points",
      prompt: "How many penalty points trigger a £200 VAT late submission penalty for quarterly returns?",
      options: ["2", "4", "5", "6"],
      answer: 1,
      explain: "4 points for quarterly submitters.",
    },
    {
      kind: "mcq",
      id: "q-mtd-points",
      prompt: "At what point total is the £200 penalty charged for quarterly MTD for Income Tax submitters?",
      options: ["2", "4", "5", "8"],
      answer: 1,
      explain: "4 points.",
    },
    {
      kind: "mcq",
      id: "q-appeal",
      prompt: "How long do you normally have to appeal a penalty to HMRC?",
      options: ["14 days", "30 days", "6 months", "1 year"],
      answer: 1,
      explain: "30 days.",
    },
    {
      kind: "mcq",
      id: "q-ttp",
      prompt: "What may avoid late payment penalties?",
      options: ["Ignoring HMRC", "A time to pay arrangement agreed before the due date", "Filing late", "Closing the company"],
      answer: 1,
      explain: "Agree time to pay early.",
    },
  ],
  sources: [
    { label: "Self Assessment tax returns: penalties – GOV.UK", url: "https://www.gov.uk/self-assessment-tax-returns/penalties" },
    { label: "Penalties for Making Tax Digital for Income Tax – GOV.UK", url: "https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax" },
    { label: "Penalty points and penalties if you submit your VAT Return late – GOV.UK", url: "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late" },
    { label: "Company Tax Returns: penalties for late filing – GOV.UK", url: "https://www.gov.uk/company-tax-returns/penalties-for-late-filing" },
    { label: "CH82470 – maximum and minimum penalties for each behaviour", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch82470" },
  ],
};
