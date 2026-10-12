import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "mtd-for-income-tax",
  title: "Making Tax Digital for Income Tax",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "MTD for Income Tax started on 6 April 2026 for sole traders and landlords with qualifying income over £50,000, with thresholds of £30,000 from April 2027 and £20,000 from April 2028. Working out qualifying income, who is exempt, digital records, quarterly updates and their deadlines, the tax return, and the new penalty points.",
  objectives: [
    "Work out a client's qualifying income and their MTD start date",
    "Identify clients who are exempt, automatically or on application",
    "Explain digital records, quarterly updates, their deadlines and the end-of-year tax return",
    "Apply the late submission points regime and the 2026/27 easement for quarterly updates",
  ],
  body: [
    {
      kind: "md",
      md: `**Making Tax Digital (MTD) for Income Tax** changes how self-employed people and landlords keep records and report to HMRC. It doesn't change how their tax is calculated or when it's paid. Clients within MTD must:
1. keep **digital records** of their self-employment and property income and expenses in compatible software,
2. send **quarterly updates** of income and expenses to HMRC from that software,
3. submit their **tax return** for the year through MTD-compatible software by **31 January** after the tax year, including any other income (employment, dividends, interest) and making their year-end adjustments.

Payment dates don't change: 31 January and 31 July payments on account, and the balancing payment on 31 January.`,
    },
    {
      kind: "table",
      caption: "Who must join, and when",
      head: ["Qualifying income in tax year…", "is more than…", "MTD starts from"],
      rows: [
        ["2024/25", "£50,000", "**6 April 2026**"],
        ["2025/26", "£30,000", "6 April 2027"],
        ["2026/27", "£20,000", "6 April 2028"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Qualifying income",
      md: `**Qualifying income** is the total **gross** income from **self-employment** and **property**, before expenses, taken from the client's tax return for the relevant year. It includes:
- turnover from all sole trades combined,
- gross rents from UK and overseas property, including the client's **share** of jointly owned property income.

It **doesn't** include employment income, **a share of partnership profits**, dividends, interest, pensions, or transition profits from basis period reform.

Example: rents of £25,000 plus self-employed turnover of £27,000 gives qualifying income of **£52,000**, even if the combined profit is only £15,000.`,
    },
    {
      kind: "md",
      md: `### Exemptions

**Automatic** (no application needed), including:
- qualifying income of £20,000 or less,
- no National Insurance number before the start of the tax year,
- trustees (SA900) and personal representatives,
- people unable to deal with HMRC who have a power of attorney or deputy in place (declared on the 2024/25 return),
- for a limited period, people who claim certain reliefs or use certain pages, such as foster carers claiming qualifying care relief, those using averaging relief, or those filing the residence pages (SA109). These are deferred until at least April 2027, if declared on the 2024/25 return. Check HMRC's exemption guidance for the current list.

**On application:** the **digitally excluded**, where it isn't reasonable to use software because of age, health, disability, religious beliefs or location (no internet access). HMRC won't accept unfamiliarity with software, or extra cost, as reasons on their own.

Partnerships don't currently need to use MTD for Income Tax, and HMRC hasn't set a start date for them.`,
    },
    {
      kind: "table",
      caption: "Quarterly update periods and deadlines (standard tax-year periods)",
      head: ["Update period", "Deadline"],
      rows: [
        ["6 April to 5 July", "7 August"],
        ["6 April to 5 October", "7 November"],
        ["6 April to 5 January", "7 February"],
        ["6 April to 5 April", "7 May"],
      ],
    },
    {
      kind: "md",
      md: `**Updates are cumulative.** Each one covers everything from the start of the tax year to the end of the update period, so correcting an earlier quarter just means fixing the digital records and sending the next update. Updates show totals by income and expense category, not individual transactions.

**Calendar quarters.** A client can choose update periods ending 30 June, 30 September, 31 December and 31 March instead, with the same deadlines. That suits a business with a 31 March year end. The choice must be made before the first update of the year.

Every business and property income source needs its own updates. A sole trader with a UK rental property sends **two** sets of quarterly updates.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Penalties under MTD",
      md: `MTD clients move onto the **points-based** late submission regime: **one point** for each missed deadline (quarterly updates and the tax return), and a **£200 penalty** once they reach **4 points**, with another £200 for each further missed deadline. HMRC has said it **won't** charge penalties for late **quarterly updates** in 2026/27. Updates must still be sent before the tax return can be filed, and the return itself is penalised normally.

Late payment penalties follow the VAT-style regime: 3% of tax unpaid at day 15, another 3% at day 30, and 10% a year from day 31. HMRC's guidance says these percentages rise to 4% and 4% for 2027/28.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Run an MTD readiness review",
      md: `For each affected client, record: qualifying income and the source year; their start date; their software (or the practice's bookkeeping software); who sends the updates (client or practice); how often the bookkeeping will be done; and a fee review. The practice must also be authorised as agent for the client's MTD income sources.`,
    },
  ],
  scenario: {
    title: "Who's in MTD from April 2026 and April 2027?",
    narrative: `A manager asks you to review three clients before the 7 November 2026 deadline:

1. **Priyanka** is a self-employed physiotherapist. 2024/25 turnover £46,000, plus her **half share** of a flat she owns with her sister, with gross rent of £14,400 a year.
2. **Callum** is a partner in a design partnership (his share of profit is £70,000) and also runs a small sole-trader photography business with 2024/25 turnover of £9,000.
3. **Josie** is employed on £55,000 and owns two buy-to-let houses with 2024/25 gross rents of £28,000 and 2025/26 gross rents of £31,500.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Priyanka:** qualifying income 2024/25 = £46,000 + 50% × £14,400 = **£53,200**. That's over £50,000, so she should have started MTD on **6 April 2026**. Two income sources: self-employment and UK property. Her first update (to 5 July 2026) was due on 7 August 2026, and the second is due on **7 November 2026**. No penalties for late updates in 2026/27, but sign her up and catch up now.
2. **Callum:** partnership profit doesn't count. Qualifying income = £9,000 photography turnover. He's below every threshold, and partnerships themselves aren't yet in MTD. **Not in MTD** for now, but review each year.
3. **Josie:** employment income doesn't count. 2024/25 qualifying income of £28,000 is under £50,000, so she isn't in for 2026/27. 2025/26 gross rents of £31,500 are over £30,000, so she'll be **in from 6 April 2027**. Diarise the sign-up and set up digital records for her property income before then.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Gross, not profit",
        md: `The most common mistake is testing the threshold on **profit**. Josie's rental profit may be only £12,000 after interest and costs, but MTD looks at **gross** rents.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "qualifying-income",
      prompt:
        "For 2025/26, a client has: self-employed turnover £18,500 (profit £9,000), gross rents from a property she owns jointly 50:50 with her husband of £26,000, a salary of £40,000 and dividends of £3,000. What is her qualifying income for MTD for Income Tax?",
      answer: 31500,
      unit: "£",
      explain: "Qualifying income is gross self-employment and property income only, including her share of jointly owned property. Salary and dividends are excluded.",
      working: "£18,500 + 50% × £26,000 = £18,500 + £13,000 = **£31,500**. That's over £30,000, so she must start MTD from 6 April 2027.",
    },
    {
      kind: "mcq",
      id: "start-date",
      prompt: "A landlord's gross rents were £42,000 in 2024/25 and £44,000 in 2025/26. He has no other self-employment or property income. When must he start MTD for Income Tax?",
      options: ["6 April 2026", "6 April 2027", "6 April 2028", "Never: rents are below £50,000"],
      answer: 1,
      explain: "2024/25 income was under £50,000, so not from April 2026. 2025/26 income is over £30,000, so he starts from 6 April 2027.",
    },
    {
      kind: "mcq",
      id: "q3-deadline",
      prompt: "Using standard update periods, what is the deadline for the quarterly update covering 6 April 2026 to 5 January 2027?",
      options: ["5 February 2027", "7 February 2027", "31 January 2027", "7 May 2027"],
      answer: 1,
      explain: "The deadlines are 7 August, 7 November, 7 February and 7 May.",
    },
    {
      kind: "classify",
      id: "counts-or-not",
      prompt: "Does each item count towards qualifying income for MTD for Income Tax?",
      categories: ["Counts", "Doesn't count"],
      items: [
        { text: "Gross takings of a sole trader's café", answer: 0 },
        { text: "Rent received from a flat in Spain", answer: 0, why: "Overseas property income counts." },
        { text: "Share of profit from an LLP", answer: 1, why: "Partnership income is excluded." },
        { text: "Salary from employment", answer: 1 },
        { text: "Dividends from the client's own company", answer: 1 },
        { text: "Half of the gross rent from a property owned jointly with a sibling", answer: 0, why: "The client's share of joint property income counts." },
      ],
      explain: "Only gross self-employment and property income count, including overseas property and the client's share of joint property.",
    },
    {
      kind: "mcq",
      id: "points",
      prompt: "An MTD client in 2027/28 misses three quarterly update deadlines and then files the tax return late. What penalties arise for late submission?",
      options: ["None: quarterly updates are never penalised", "4 points, and a £200 penalty on reaching the threshold", "£100 for each missed deadline", "A £200 penalty for each missed quarterly update"],
      answer: 1,
      explain: "Each missed deadline adds a point. The fourth point reaches the threshold of 4 and triggers a £200 penalty. The 2026/27 easement for quarterly updates doesn't apply in 2027/28.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-start",
      prompt: "From what date did MTD for Income Tax start for those with qualifying income over £50,000?",
      options: ["6 April 2024", "6 April 2025", "6 April 2026", "6 April 2027"],
      answer: 2,
      explain: "It started on 6 April 2026, based on 2024/25 qualifying income over £50,000.",
    },
    {
      kind: "mcq",
      id: "q-threshold-2028",
      prompt: "What qualifying income threshold brings people into MTD from April 2028?",
      options: ["Over £10,000", "Over £20,000", "Over £30,000", "Over £50,000"],
      answer: 1,
      explain: "From 6 April 2028, those with 2026/27 qualifying income over £20,000 must join.",
    },
    {
      kind: "mcq",
      id: "q-cumulative",
      prompt: "A client finds an error in the figures for their first quarterly update. How is it normally corrected?",
      options: [
        "Amend the first update separately and pay a penalty",
        "Correct the digital records. The next cumulative update includes the corrected figures",
        "Write to HMRC",
        "Wait until the following year's return",
      ],
      answer: 1,
      explain: "Quarterly updates are cumulative from the start of the tax year, so the next update automatically includes the correction.",
    },
    {
      kind: "mcq",
      id: "q-payments",
      prompt: "How does MTD for Income Tax change when tax is paid?",
      options: ["Tax is paid quarterly", "It doesn't: payments on account and the balancing payment are unchanged", "All tax is due on 31 January", "Tax is collected through PAYE"],
      answer: 1,
      explain: "MTD changes record keeping and reporting, not payment dates.",
    },
    {
      kind: "mcq",
      id: "q-digitally-excluded",
      prompt: "Which of these is likely to support an application for exemption as digitally excluded?",
      options: [
        "The client has always filed on paper",
        "The client lives somewhere with no internet access and no practical alternative",
        "The software subscription costs too much",
        "The client has only a few transactions",
      ],
      answer: 1,
      explain: "HMRC considers age, health, disability, religious belief and location (no internet access). Habit, cost or a small number of records aren't enough on their own.",
    },
  ],
  sources: [
    { label: "Check if you're eligible for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/check-if-youre-eligible-for-making-tax-digital-for-income-tax" },
    { label: "Work out your qualifying income for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax" },
    { label: "Find out if you can get an exemption from Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/find-out-if-you-can-get-an-exemption-from-making-tax-digital-for-income-tax" },
    { label: "Use Making Tax Digital for Income Tax: send quarterly updates", url: "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/send-quarterly-updates" },
    { label: "Penalties for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/penalties-for-making-tax-digital-for-income-tax" },
  ],
};
