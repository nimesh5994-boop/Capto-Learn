import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "annual-allowance-and-carry-forward",
  title: "The annual allowance and carry forward",
  level: "practitioner",
  minutes: 35,
  summary:
    "How the £60,000 annual allowance works for 2026/27, what counts as a pension input, how unused allowance from the previous three tax years is carried forward in the right order, and how an annual allowance charge is calculated and reported.",
  objectives: [
    "Calculate pension inputs for a money purchase arrangement across employer and personal contributions",
    "Apply carry forward in the correct order across the three previous tax years",
    "Calculate an annual allowance charge for an uncovered excess",
    "Explain the conditions for carry forward and the personal contribution earnings limit",
    "Describe how the charge is reported and paid, including 'scheme pays'",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **annual allowance (AA)** is the amount of pension saving each tax year that benefits from tax relief without an extra charge. For **2026/27 it is £60,000**. It is a limit on total **pension inputs** across **all** the individual's registered schemes, not just one. Exceed it, and (after carry forward) the excess is added to the individual's taxable income as an **annual allowance charge**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What counts as an input",
      md: `- **Money purchase (DC) schemes:** all contributions paid in the tax year, **gross**, by the member **and** the employer (and by anyone else on the member's behalf). Salary sacrifice contributions count as employer contributions.
- **Defined benefit (DB) schemes:** the **increase** in the value of the member's benefits over the year (using a factor of 16, with adjustments).
- The test period is the **tax year** (6 April to 5 April).
- Relief at source: count the **gross** figure (the net paid plus basic-rate tax relief).`,
    },
    {
      kind: "md",
      md: `### Carry forward

An individual can use **unused annual allowance from the previous three tax years**, provided they were a **member of a registered pension scheme** in each year they carry forward from. The rules:

1. First use up the **current year's** allowance.
2. Then carry forward from the **earliest** of the three years first, then the next, then the latest.
3. The allowance carried forward is the **allowance for that earlier year** less the pension inputs of that year. (The standard allowance was **£60,000 for 2023/24, 2024/25 and 2025/26**, and £40,000 for earlier years.)
4. Carry forward only matters where **inputs exceed** the current year's allowance; it does not affect personal-contribution earnings limits.

**Relevant earnings still limit personal contributions**: the director can only get tax relief on personal contributions up to the higher of £3,600 and 100% of relevant earnings, but **employer contributions** (which aren't limited by earnings) can use carry forward in full.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The annual allowance charge",
      md: `If total inputs exceed the available allowance (current year plus carry forward), the **excess** is treated as **income** of the individual and taxed at their **marginal rates** (20%, 40% or 45%, using the rate bands after adding the excess). It is declared on **Self Assessment** (pension savings tax charges). The member can ask the scheme to pay it (**scheme pays**), in return for a reduction in benefits, if the charge exceeds £2,000 and the inputs to that scheme exceed the AA.

Schemes must send a **pension savings statement** by **6 October** following the end of the tax year to anyone whose inputs exceed the annual allowance. (So the statements for 2025/26 are due by **6 October 2026**.)`,
    },
    {
      kind: "table",
      caption: "Allowances by tax year (standard annual allowance)",
      head: ["Tax year", "Annual allowance"],
      rows: [
        ["2023/24", "£60,000"],
        ["2024/25", "£60,000"],
        ["2025/26", "£60,000"],
        ["2026/27", "£60,000"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Gather the evidence before you advise",
      md: `Ask the client for **pension statements** for each of the last four tax years (current plus three). Add up inputs across **all** schemes including old workplace pensions, and **salary sacrifice** amounts. Keep a one-page **carry forward schedule** on the file. If the client is also subject to the **tapered allowance** or the **MPAA** (next lesson), start from the reduced figure for that year.`,
    },
  ],
  scenario: {
    title: "A large contribution for Octavia Reeve of Reeve Surveying Ltd",
    narrative: `Octavia Reeve is the director-shareholder of Reeve Surveying Ltd. In 2026/27 her company pays **£110,000** into her SIPP. She has no other contributions this year. Her past inputs were:

| Year | Inputs | Unused AA |
|---|---:|---:|
| 2023/24 | £20,000 | £40,000 |
| 2024/25 | £15,000 | £45,000 |
| 2025/26 | £30,000 | £30,000 |

She was a member of a registered scheme throughout. She is a higher-rate taxpayer.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the excess for the year.** Inputs £110,000 − current AA £60,000 = **£50,000**.

**Step 2: carry forward, earliest year first.**
- 2023/24: £40,000 used → remaining excess **£10,000**.
- 2024/25: £10,000 of the £45,000 used → excess **nil**. £35,000 of 2024/25 and all £30,000 of 2025/26 remain.

**Step 3: charge.** Nil, because all of the excess is covered by carried-forward allowance.

**Step 4: the company's side.** The contribution is deductible if wholly and exclusively for the trade (see the directors track). A £110,000 contribution is unusually large relative to Octavia's duties, so the "reasonable package" test and the HMRC spreading rules for very large contributions should be checked before it is paid.

**Step 5: record.** File a schedule showing inputs, unused allowances, the order used and the closing unused balance, and a note that Octavia has used £40,000 + £10,000 of carry forward, leaving **£35,000 (2024/25) and £30,000 (2025/26)** available for 2027/28 (which will drop out in later years as the three-year window moves).`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "excess-input",
      prompt: "In 2026/27 a member's total pension inputs are £85,000 (employer £70,000, personal gross £15,000). The standard annual allowance applies. What is the excess over the current-year allowance before carry forward (£)?",
      answer: 25000,
      unit: "£",
      explain: "All inputs count, gross.",
      working: "£85,000 − £60,000 = **£25,000**.",
    },
    {
      kind: "numeric",
      id: "charge-calc",
      prompt: "After carry forward, £20,000 of inputs remain uncovered for a 40% taxpayer (and the excess falls entirely in the higher-rate band). What is the annual allowance charge (£)?",
      answer: 8000,
      unit: "£",
      explain: "The uncovered excess is taxed at the marginal rate.",
      working: "£20,000 × 40% = **£8,000**.",
    },
    {
      kind: "numeric",
      id: "carry-forward-remaining",
      prompt: "A member has unused AA of £25,000 (2023/24), £50,000 (2024/25) and £10,000 (2025/26). Their 2026/27 inputs exceed the current allowance by £60,000. How much carried-forward allowance is still unused afterwards (£)?",
      answer: 25000,
      unit: "£",
      explain: "Earliest year first: £25,000 then £35,000 of £50,000 leaves £15,000 of 2024/25 and £10,000 of 2025/26.",
      working: "Total available £85,000 − £60,000 used = **£25,000** (£15,000 of 2024/25 + £10,000 of 2025/26).",
    },
    {
      kind: "mcq",
      id: "mcq-order",
      prompt: "When carrying forward, which year's unused allowance is used first?",
      options: ["The most recent year", "The earliest of the three years", "The year with the most unused", "Any, at the taxpayer's choice"],
      answer: 1,
      explain: "Earliest first so it doesn't drop out of the three-year window.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-aa",
      prompt: "What is the standard annual allowance for 2026/27?",
      options: ["£40,000", "£50,000", "£60,000", "£80,000"],
      answer: 2,
      explain: "£60,000.",
    },
    {
      kind: "mcq",
      id: "q-years",
      prompt: "How many previous tax years can unused allowance be carried forward from?",
      options: ["1", "2", "3", "5"],
      answer: 2,
      explain: "Three.",
    },
    {
      kind: "mcq",
      id: "q-count",
      prompt: "Do employer contributions count towards the annual allowance?",
      options: ["Yes", "No", "Only above £10,000", "Only for directors"],
      answer: 0,
      explain: "Both employer and member contributions count.",
    },
    {
      kind: "mcq",
      id: "q-statement",
      prompt: "By when must a scheme send a pension savings statement for a tax year?",
      options: ["5 April", "31 July", "6 October", "31 January"],
      answer: 2,
      explain: "6 October following the end of the tax year.",
    },
    {
      kind: "mcq",
      id: "q-member",
      prompt: "To carry forward unused allowance from a year, the member must have…",
      options: ["Earned over £50,000", "Been a member of a registered pension scheme in that year", "Retired", "Opted out of AE"],
      answer: 1,
      explain: "Membership of a registered scheme in that year is required.",
    },
  ],
  sources: [
    { label: "Annual allowance – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
    { label: "Pension schemes rates – GOV.UK", url: "https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates" },
    { label: "PTM051100 – annual allowance: essential principles", url: "https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm051100" },
    { label: "PTM056410 – annual allowance tax charge: scheme pays", url: "https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056410" },
  ],
};
