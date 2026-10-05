import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "class-2-and-class-4-nic",
  title: "Class 2 and Class 4 National Insurance for the self-employed",
  level: "practitioner",
  minutes: 25,
  summary:
    "How self-employed NIC works now that Class 2 is no longer compulsory: the small profits threshold and automatic credits, voluntary Class 2, and calculating Class 4 at 6% and 2% for 2026/27.",
  objectives: [
    "Explain the post-April 2024 Class 2 position and who should pay voluntarily",
    "Calculate Class 4 NIC for 2026/27",
    "Identify who is exempt from Class 4",
    "Explain how Class 4 is collected through Self Assessment",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "callout",
      tone: "rule",
      title: "Class 2 since 6 April 2024",
      md: `Self-employed people no longer **have** to pay Class 2 NIC.

- Profits **at or above the small profits threshold** (£7,105 for 2026/27): Class 2 is **treated as paid**, so the year counts towards state pension and contributory benefits without any payment.
- Profits **below** £7,105: no liability, but the person can pay **voluntary Class 2** at **£3.65 a week** for 2026/27 (£189.80 for a full 52-week year) to protect their NI record.`,
    },
    {
      kind: "md",
      md: `### Who should pay voluntary Class 2?

Voluntary Class 2 is one of the cheapest ways to buy a qualifying year for state pension purposes — much cheaper than voluntary Class 3. It's worth discussing with any client who has low profits and no other source of a qualifying year (e.g. they're not also employed earning above the lower earnings limit, and they're not getting NI credits through Child Benefit for a child under 12 or Carer's Allowance). Check their NI record on their personal tax account first.`,
    },
    {
      kind: "table",
      caption: "Class 4 NIC for 2026/27",
      head: ["Profits", "Rate"],
      rows: [
        ["Up to £12,570 (lower profits limit)", "0%"],
        ["£12,570 – £50,270 (upper profits limit)", "6%"],
        ["Over £50,270", "2%"],
      ],
    },
    {
      kind: "md",
      md: `Class 4 is calculated on the **taxable trading profit** (after capital allowances and trading losses relieved against trading profits). It isn't affected by the personal allowance taper, Gift Aid or pension contributions. It's collected through Self Assessment alongside income tax and **is included in payments on account**.

For partners, each partner pays Class 4 on their own share of the profit.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Exemptions",
      md: `No Class 4 is due if the person has reached **state pension age before the start of the tax year** (6 April). Someone who reaches state pension age during 2026/27 still pays Class 4 for the whole of 2026/27. Profits from a property business aren't trading profits, so landlords don't pay Class 4 (unless the activity is a genuine trade).`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Class 4 example",
      md: `Profits £62,000: (£50,270 − £12,570) = £37,700 × 6% = £2,262. (£62,000 − £50,270) = £11,730 × 2% = £234.60. **Total £2,496.60.**`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Employed and self-employed",
      md: `A client with a job and a business pays Class 1 through payroll and Class 4 on their profits. There's an annual maximum that can limit the combined total for high earners with multiple sources; HMRC can defer Class 4 if it's clear the maximum will be exceeded. Flag it on returns where both are large.`,
    },
  ],
  scenario: {
    title: "Two self-employed clients, two different NIC answers",
    narrative: `**Gemma** runs a small craft business alongside caring for her two children (aged 8 and 10, Child Benefit claimed in her name). Her 2026/27 profit is £4,200.

**Arjun** is a self-employed electrician aged 45 with 2026/27 profits of £58,300.

Both ask: *"What National Insurance do I pay?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Gemma**
1. Profit £4,200 is below the £7,105 small profits threshold, so Class 2 isn't treated as paid.
2. No Class 4 (below £12,570).
3. Does she need voluntary Class 2? Probably not: as the Child Benefit claimant for a child under 12, she should already get NI credits for the year. Check her NI record before recommending she pays £189.80.

**Arjun**
1. Profit is above £7,105, so Class 2 is treated as paid — nothing to pay.
2. Class 4: £37,700 × 6% = £2,262; (£58,300 − £50,270) = £8,030 × 2% = £160.60. **Total £2,422.60**.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Show NIC separately",
        md: `Clients often think of "tax" as one figure. Showing Class 4 separately on the computation helps them see why the self-employed pay less NIC than employees on the same income.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "class4-basic",
      prompt: "Leah's taxable trading profit for 2026/27 is £28,000. What Class 4 NIC is due?",
      answer: 925.8,
      tolerance: 0.5,
      unit: "£",
      explain: "Only the main 6% rate applies because profits are below £50,270.",
      working: "(£28,000 − £12,570) = £15,430 × 6% = **£925.80**.",
    },
    {
      kind: "numeric",
      id: "class4-higher",
      prompt: "Simon's taxable trading profit for 2026/27 is £75,000. What Class 4 NIC is due?",
      answer: 2756.6,
      tolerance: 0.5,
      unit: "£",
      explain: "6% on the band between the limits, and 2% above £50,270.",
      working: "£37,700 × 6% = £2,262.00\n(£75,000 − £50,270) = £24,730 × 2% = £494.60\nTotal **£2,756.60**.",
    },
    {
      kind: "numeric",
      id: "voluntary-class2",
      prompt: "A client with profits of £3,000 wants to pay voluntary Class 2 for all 52 weeks of 2026/27. How much will it cost?",
      answer: 189.8,
      tolerance: 0.05,
      unit: "£",
      explain: "The 2026/27 Class 2 rate is £3.65 per week.",
      working: "52 × £3.65 = **£189.80**.",
    },
    {
      kind: "mcq",
      id: "spa-exemption",
      prompt: "Frank reaches state pension age on 1 September 2026. His 2026/27 profits are £30,000. What Class 4 is due for 2026/27?",
      options: ["Nil — he's over state pension age", "Class 4 on 5/12 of profits", "Full Class 4 for 2026/27", "Class 2 only"],
      answer: 2,
      explain: "The exemption only applies if state pension age was reached **before** the start of the tax year. He'll be exempt from 2027/28.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-spt",
      prompt: "What is the small profits threshold for 2026/27?",
      options: ["£6,725", "£6,845", "£7,105", "£12,570"],
      answer: 2,
      explain: "£7,105 for 2026/27.",
    },
    {
      kind: "mcq",
      id: "q-class2-above",
      prompt: "A sole trader has profits of £20,000. What Class 2 is payable?",
      options: ["£3.65 a week", "Nothing — Class 2 is treated as paid", "6% of profits", "£189.80 a year compulsory"],
      answer: 1,
      explain: "Profits above the small profits threshold mean Class 2 is treated as paid at no cost.",
    },
    {
      kind: "mcq",
      id: "q-class4-main",
      prompt: "What is the Class 4 main rate for 2026/27?",
      options: ["9%", "8%", "6%", "2%"],
      answer: 2,
      explain: "6% between £12,570 and £50,270, then 2%.",
    },
    {
      kind: "mcq",
      id: "q-class4-poa",
      prompt: "Is Class 4 NIC included in payments on account?",
      options: ["Yes", "No", "Only above £50,270", "Only for partners"],
      answer: 0,
      explain: "POAs cover income tax and Class 4. CGT and student loans are excluded.",
    },
    {
      kind: "mcq",
      id: "q-landlord",
      prompt: "A landlord has rental profits of £40,000. What Class 4 is due?",
      options: ["6% above £12,570", "Nil — property income isn't trading income", "Class 2 only", "2% on all profits"],
      answer: 1,
      explain: "Class 4 is charged on trading profits. An ordinary letting business isn't a trade.",
    },
  ],
  sources: [
    { label: "Self-employed National Insurance rates (GOV.UK)", url: "https://www.gov.uk/self-employed-national-insurance-rates" },
    { label: "National Insurance rates and categories", url: "https://www.gov.uk/national-insurance-rates-letters" },
    { label: "Check your National Insurance record", url: "https://www.gov.uk/check-national-insurance-record" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  ],
};
