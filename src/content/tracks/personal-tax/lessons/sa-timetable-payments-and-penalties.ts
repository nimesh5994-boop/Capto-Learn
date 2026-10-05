import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "sa-timetable-payments-and-penalties",
  title: "The SA timetable: deadlines, payments on account and penalties",
  level: "foundation",
  minutes: 35,
  summary:
    "When returns are due, how payments on account and balancing payments work, when a client can reduce their POAs (and the risk if they get it wrong), and the late filing and late payment penalties and interest that apply when deadlines are missed.",
  objectives: [
    "State the filing and payment deadlines for a tax year",
    "Decide whether payments on account are due and calculate them",
    "Calculate the 31 January and 31 July payments for a client",
    "Calculate late filing penalties and explain late payment penalties and interest",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "table",
      caption: "Key dates for the 2026/27 tax year (6 April 2026 – 5 April 2027)",
      head: ["Date", "What happens"],
      rows: [
        ["31 January 2027", "First payment on account for 2026/27 (plus the 2025/26 balancing payment)"],
        ["31 July 2027", "Second payment on account for 2026/27"],
        ["5 October 2027", "Deadline to notify chargeability if not already in SA"],
        ["31 October 2027", "Paper return deadline"],
        ["30 December 2027", "Online filing deadline if the client wants an underpayment (under £3,000) collected through their tax code"],
        ["31 January 2028", "Online return deadline, and balancing payment for 2026/27 plus first POA for 2027/28"],
      ],
    },
    {
      kind: "md",
      md: `### Payments on account (POAs)

POAs are two advance instalments towards the current year's tax, each normally **50% of the previous year's "relevant amount"** — the income tax and Class 4 NIC that was payable through SA (i.e. after tax deducted at source such as PAYE).

POAs are **not** required if either:
- the previous year's SA liability was **less than £1,000**, or
- **more than 80%** of the previous year's total income tax and Class 4 was collected at source (PAYE, tax deducted on interest, etc.).

CGT and student loan repayments are **never** included in POAs: they're paid in full with the balancing payment.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "How the cycle works",
      md: `Each 31 January the client normally pays **two things**: the balancing payment for the year just ended **plus** the first POA for the current year. On 31 July they pay the second POA. A client whose income has gone up faces a "double hit" in the January after the increase: a large balancing payment and higher POAs at the same time. Warn them early.`,
    },
    {
      kind: "md",
      md: `### Reducing payments on account

If income has dropped, the client can claim to reduce POAs (online or on form **SA303**) to their expected liability. If the reduction turns out too big, HMRC charges **interest** on the shortfall from the original due dates, measured against the lower of the original POA and half the actual liability. There's also a penalty if the claim was made fraudulently or negligently. Reduce on evidence, not hope.`,
    },
    {
      kind: "table",
      caption: "Late filing penalties for an SA return (outside the new MTD regime)",
      head: ["How late", "Penalty"],
      rows: [
        ["1 day", "£100 fixed penalty (even if no tax is due)"],
        ["3 months", "£10 per day for up to 90 days (maximum £900)"],
        ["6 months", "Further 5% of the tax due or £300, whichever is greater"],
        ["12 months", "Another 5% or £300, whichever is greater (higher percentages if information was deliberately withheld)"],
      ],
    },
    {
      kind: "md",
      md: `### Late payment

For clients filing under the existing SA rules, late payment penalties are **5% of the tax unpaid at 30 days, 6 months and 12 months** after the due date. These apply to balancing payments, not to POAs. **Interest** runs on all late payments (including POAs) from the due date; since 6 April 2025 the late payment rate is **Bank of England base rate + 4%**.

**Making Tax Digital for Income Tax** clients (mandated from April 2026 — see the MTD lesson) move onto the new regime: penalty **points** for late quarterly updates and returns (£200 penalty at 4 points), and late payment penalties of **3%** of tax unpaid at day 15, another 3% at day 30, then 10% a year from day 31 for 2026/27 liabilities.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Reasonable excuse is narrow",
      md: `Penalties can be cancelled on appeal if there's a **reasonable excuse** (e.g. serious illness, bereavement, an HMRC system failure) and the return was filed without unreasonable delay once the excuse ended. "I didn't know", "my accountant was busy" or "I couldn't afford to pay" are not usually accepted. Appeal within 30 days.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Time to pay",
      md: `A client who can't pay in full should contact HMRC **before** the deadline. Self Serve Time to Pay is available online for SA debts up to £30,000 (subject to conditions). An arrangement agreed in time stops late payment penalties, though interest still runs.`,
    },
  ],
  scenario: {
    title: "January payments for Dev Kapoor, freelance developer",
    narrative: `Dev Kapoor is a self-employed software developer who also has a small part-time PAYE job. His 2025/26 return shows:

| | |
|---|---:|
| Income tax and Class 4 NIC for 2025/26 | £14,600 |
| Tax deducted under PAYE | £2,400 |
| POAs paid for 2025/26 (31 Jan 2026 and 31 Jul 2026) | £5,000 each |

He asks: *"How much do I pay in January 2027 and July 2027?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **SA liability for 2025/26** (the "relevant amount"): £14,600 − £2,400 PAYE = **£12,200**.
2. **Are POAs due for 2026/27?** £12,200 is over £1,000, and tax at source was only £2,400 ÷ £14,600 = 16% — well under 80%. So yes.
3. **Balancing payment for 2025/26:** £12,200 − £10,000 already paid = **£2,200**.
4. **POAs for 2026/27:** 50% × £12,200 = **£6,100** each.
5. **31 January 2027:** £2,200 + £6,100 = **£8,300**.
6. **31 July 2027:** **£6,100**.`,
      },
      {
        kind: "table",
        caption: "Dev's payment schedule",
        head: ["Due date", "Made up of", "Amount"],
        rows: [
          ["31 January 2027", "2025/26 balancing £2,200 + 2026/27 POA1 £6,100", "£8,300"],
          ["31 July 2027", "2026/27 POA2", "£6,100"],
          ["31 January 2028", "2026/27 balancing payment + 2027/28 POA1", "Depends on 2026/27 profits"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Send a payment letter",
        md: `Give clients a clear schedule with the payment reference (UTR followed by K) as soon as the return is done. A surprising number of penalties come from clients who never knew about the July POA.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "jan-payment",
      prompt:
        "Sophie's 2025/26 SA liability (after PAYE) is £9,800. She paid POAs of £3,600 each for 2025/26. POAs are required for 2026/27. How much must she pay on **31 January 2027**?",
      answer: 7500,
      unit: "£",
      explain: "On 31 January she pays the 2025/26 balancing payment plus the first 2026/27 POA, which is half the 2025/26 SA liability.",
      working: "Balancing payment: £9,800 − (£3,600 × 2) = £2,600.\nPOA1 for 2026/27: £9,800 × 50% = £4,900.\nTotal: £2,600 + £4,900 = **£7,500**.",
    },
    {
      kind: "mcq",
      id: "poa-80-test",
      prompt:
        "A retired client's 2025/26 total income tax was £8,000, of which £6,800 was collected through PAYE on pensions. The SA balance was £1,200. Are POAs due for 2026/27?",
      options: ["Yes, because the SA balance is over £1,000", "No, because more than 80% was collected at source", "Yes, but only one POA", "No, because pensioners never pay POAs"],
      answer: 1,
      explain: "£6,800 ÷ £8,000 = 85% collected at source. Either exemption (under £1,000 **or** over 80% at source) is enough to remove POAs.",
    },
    {
      kind: "numeric",
      id: "late-filing-penalty",
      prompt:
        "A client files their 2025/26 return (due 31 January 2027) on 31 October 2027 — nine months late. The tax due on the return is £4,000. HMRC charged the daily penalties for the full 90 days. What is the total late **filing** penalty?",
      answer: 1300,
      unit: "£",
      explain: "Initial £100, daily penalties capped at £900, then at 6 months the greater of 5% of tax due or £300. The 12-month penalty hasn't been triggered yet.",
      working: "£100 + £900 + greater of (5% × £4,000 = £200) or £300 → £300.\nTotal: **£1,300**.",
    },
    {
      kind: "classify",
      id: "in-poas",
      prompt: "Which of these are included in payments on account?",
      categories: ["Included in POAs", "Paid only with the balancing payment"],
      items: [
        { text: "Income tax on self-employed profits", answer: 0 },
        { text: "Class 4 NIC", answer: 0 },
        { text: "Capital Gains Tax", answer: 1, why: "CGT is never part of POAs." },
        { text: "Student loan repayments collected through SA", answer: 1, why: "Student loan is excluded from POAs." },
        { text: "Income tax on rental profits", answer: 0 },
      ],
      explain: "POAs are based on income tax and Class 4 NIC only. CGT and student loan repayments are settled in full on 31 January after the year ends.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-online-deadline",
      prompt: "What is the online filing deadline for the 2026/27 return?",
      options: ["31 October 2027", "30 December 2027", "31 January 2028", "5 April 2028"],
      answer: 2,
      explain: "Online returns are due by 31 January following the end of the tax year: 31 January 2028 for 2026/27.",
    },
    {
      kind: "mcq",
      id: "q-paper",
      prompt: "When is a paper return for 2026/27 due?",
      options: ["5 October 2027", "31 October 2027", "31 December 2027", "31 January 2028"],
      answer: 1,
      explain: "Paper returns are due by 31 October after the end of the tax year.",
    },
    {
      kind: "mcq",
      id: "q-reduce-poa",
      prompt: "A client reduces POAs to nil but their actual liability turns out to be £6,000. What does HMRC charge?",
      options: ["Nothing, as long as the balance is paid by 31 January", "Interest on the shortfall from the original POA dates", "A 5% late payment penalty on each POA", "A £100 penalty"],
      answer: 1,
      explain: "Interest runs from the original due dates on the amount that should have been paid. Late payment penalties don't apply to POAs.",
    },
    {
      kind: "mcq",
      id: "q-interest-rate",
      prompt: "HMRC late payment interest has been set at what rate since 6 April 2025?",
      options: ["Base rate + 2.5%", "Base rate + 4%", "A flat 8%", "Base rate − 1%"],
      answer: 1,
      explain: "The late payment rate rose to base rate + 4% from 6 April 2025.",
    },
    {
      kind: "mcq",
      id: "q-first-penalty",
      prompt: "A client's return is filed one week late, but there's no tax to pay. What happens?",
      options: ["No penalty because no tax is due", "£100 late filing penalty", "£10 a day penalty", "5% of nil"],
      answer: 1,
      explain: "The £100 initial penalty applies whatever the tax position. An appeal only succeeds with a reasonable excuse.",
    },
    {
      kind: "mcq",
      id: "q-late-payment-30",
      prompt: "Under the existing SA rules, when is the first 5% late payment penalty charged on a balancing payment?",
      options: ["The day after the due date", "30 days after the due date", "3 months after the due date", "6 months after the due date"],
      answer: 1,
      explain: "5% of tax unpaid at 30 days, then again at 6 and 12 months.",
    },
  ],
  sources: [
    { label: "Self Assessment deadlines (GOV.UK)", url: "https://www.gov.uk/self-assessment-tax-returns/deadlines" },
    { label: "Payments on account (GOV.UK)", url: "https://www.gov.uk/understand-self-assessment-bill/payments-on-account" },
    { label: "Self Assessment penalties (GOV.UK)", url: "https://www.gov.uk/self-assessment-tax-returns/penalties" },
    { label: "HMRC interest rates for late and early payments", url: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates" },
    { label: "Penalties for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax" },
  ],
};
