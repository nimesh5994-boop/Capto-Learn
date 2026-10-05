import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "tapered-annual-allowance-and-mpaa",
  title: "The tapered annual allowance and the money purchase annual allowance",
  level: "advanced",
  minutes: 40,
  summary:
    "When the £60,000 annual allowance is reduced: the taper for high earners (threshold income £200,000, adjusted income £260,000, floor £10,000) and the £10,000 money purchase annual allowance triggered by flexible access, with worked calculations and planning points.",
  objectives: [
    "Calculate threshold income and adjusted income and decide whether the taper applies",
    "Calculate the tapered annual allowance, including the £10,000 minimum",
    "Explain what triggers the money purchase annual allowance and its consequences",
    "Explain why carry forward interacts differently with the taper and the MPAA",
    "Advise a client on planning around these restrictions",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The standard annual allowance of **£60,000** is reduced in two situations that catch owner-directors regularly: **high income** (the taper) and **flexible access to a defined contribution pension** (the money purchase annual allowance, MPAA). Both reduce the amount that can be paid in without a charge, and both are easy to miss if you only look at last year's contributions.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The tapered annual allowance (2026/27)",
      md: `The allowance is reduced if **both** of these apply:

1. **Threshold income** is **over £200,000**, and
2. **Adjusted income** is **over £260,000**.

For every **£2** by which adjusted income exceeds **£260,000**, the annual allowance falls by **£1**, down to a **minimum of £10,000** (reached at adjusted income of £360,000 or more).

- **Threshold income** is broadly **net income** (after allowable deductions) **less** the gross amount of **personal** pension contributions paid under relief at source or net pay, **without** adding back employer contributions (except those made under salary sacrifice arrangements entered into after 8 July 2015).
- **Adjusted income** is net income **plus** the member's own pension contributions given relief at source or by net pay **plus** **employer contributions** (pension input amounts).`,
    },
    {
      kind: "md",
      md: `### Why employer contributions matter

Because **employer contributions are not included in threshold income**, a director with, say, **£190,000** net income and an **£80,000** employer contribution has **threshold income of £190,000** (below £200,000) so the **taper does not apply**, even though adjusted income is £270,000. The same person with £210,000 of net income and the same contribution has threshold income of £210,000 and adjusted income of £290,000: the taper applies and the allowance is **£45,000**. A small difference in income can turn a fully deductible contribution into an annual allowance charge: always compute both tests *before* the contribution is paid.

### Carry forward and the taper

- Unused allowance from previous years is computed **using each year's own allowance** (including any taper that applied in that year), so you need the same two tests for all three years.
- Carry forward is applied on top of the current year's (tapered) allowance.

### The money purchase annual allowance (MPAA)

The MPAA is **£10,000** for 2026/27. It applies from the day a member first **flexibly accesses** a defined contribution pension, by:

- taking **income from flexi-access drawdown** (not just tax-free cash);
- taking an **uncrystallised funds pension lump sum (UFPLS)**;
- buying certain **flexible annuities**, or taking a **small pot** payment in some cases (not all small pots trigger it).

Taking **only the tax-free lump sum** (pension commencement lump sum) does **not** trigger the MPAA. Once triggered:

- DC inputs above **£10,000** in a year create an excess taxed at the member's marginal rate;
- **Unused MPAA cannot be carried forward**, and carry forward cannot be used to cover an MPAA excess;
- DB inputs have a separate **alternative annual allowance** (£50,000);
- The member must **tell every other scheme** they are contributing to **within 91 days** of receiving the flexible access statement from the provider.`,
    },
    {
      kind: "table",
      caption: "Summary: allowance applicable to each situation (2026/27)",
      head: ["Situation", "Allowance for money purchase inputs"],
      rows: [
        ["Standard", "£60,000"],
        ["Tapered (adjusted income £310,000)", "£60,000 − (£310,000 − £260,000) ÷ 2 = £35,000"],
        ["Tapered (adjusted income £360,000 or more)", "£10,000 (minimum)"],
        ["MPAA triggered, not tapered", "£10,000 for DC inputs"],
        ["Both taper and MPAA", "Allowance for DC inputs is the MPAA (£10,000); DB inputs have the alternative annual allowance, reduced by taper; see PTM057100"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The MPAA trap for owner-directors",
      md: `A director who takes taxable drawdown income from one pension (for example from an old scheme at 55 or 57) and then continues contributing **£30,000** a year to their SIPP will have an **MPAA excess** of £20,000. Ask every new client over 55 whether they have **ever** taken income from a pension, and look for the provider's **flexible access statement**. A client who plans to take pension income and keep contributing needs a plan *before* they take it.`,
    },
  ],
  scenario: {
    title: "A bonus year for Seren Archer",
    narrative: `Seren Archer is a director of Archer Biotech Ltd. In 2026/27 she receives salary and bonus of **£255,000** (her net income) and the company wants to pay **£50,000** into her SIPP as an employer contribution. She makes **no personal contribution** this year. She has unused allowance of £60,000 from each of the three previous years. She has never taken any flexible pension income.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: threshold income.** £255,000 (the employer contribution is not added). Over £200,000, so the first test is met.

**Step 2: adjusted income.** £255,000 + £50,000 employer contribution = **£305,000**. Over £260,000, so the taper applies.

**Step 3: tapered allowance.** (£305,000 − £260,000) ÷ 2 = £22,500 reduction. Allowance = £60,000 − £22,500 = **£37,500**.

**Step 4: excess.** £50,000 − £37,500 = **£12,500**.

**Step 5: carry forward.** Seren has £60,000 unused in each of the previous three years (each year's own allowance is the standard £60,000 provided no taper applied in those years: check). The excess of £12,500 is fully covered by the earliest year (2023/24). **No annual allowance charge.**

**Step 6: lessons.**
- Had Seren's net income been £205,000 with the same £50,000 employer contribution, threshold income £205,000 is still over £200,000, adjusted income £255,000 is **below** £260,000, so **no taper**.
- Had her net income been £195,000, threshold income below £200,000 means **no taper** whatever the contribution.
- Record all tests on the file, and re-run them if the bonus changes before the contribution date.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "tapered-aa",
      prompt: "A director's adjusted income is £310,000 and threshold income £280,000 in 2026/27. What is the tapered annual allowance (£)?",
      answer: 35000,
      unit: "£",
      explain: "Both tests are met. Allowance falls by £1 for every £2 above £260,000.",
      working: "(£310,000 − £260,000) ÷ 2 = £25,000; £60,000 − £25,000 = **£35,000**.",
    },
    {
      kind: "numeric",
      id: "taper-floor",
      prompt: "A director's adjusted income is £400,000 (threshold income £390,000). What is the annual allowance (£)?",
      answer: 10000,
      unit: "£",
      explain: "The reduction can't take the allowance below £10,000.",
      working: "(£400,000 − £260,000) ÷ 2 = £70,000 would give a negative figure, so the minimum applies: **£10,000**.",
    },
    {
      kind: "numeric",
      id: "mpaa-charge",
      prompt: "A member who has triggered the MPAA pays total DC inputs of £25,000. What is the excess over the MPAA (£)?",
      answer: 15000,
      unit: "£",
      explain: "The MPAA is £10,000 for money purchase inputs.",
      working: "£25,000 − £10,000 = **£15,000**.",
    },
    {
      kind: "classify",
      id: "classify-mpaa-trigger",
      prompt: "Does the event trigger the MPAA?",
      categories: ["Triggers MPAA", "Does not trigger MPAA"],
      items: [
        { text: "Taking taxable income from flexi-access drawdown", answer: 0 },
        { text: "Taking only the 25% tax-free lump sum and leaving the rest invested", answer: 1 },
        { text: "Taking an uncrystallised funds pension lump sum (UFPLS)", answer: 0 },
        { text: "Taking a defined benefit pension in the scheme's normal way", answer: 1 },
      ],
      explain: "Flexible taxable income from a DC pot is the trigger; tax-free cash on its own is not.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "The tapered annual allowance can only apply if threshold income exceeds…",
      options: ["£150,000", "£200,000", "£260,000", "£360,000"],
      answer: 1,
      explain: "£200,000, and adjusted income must also exceed £260,000.",
    },
    {
      kind: "mcq",
      id: "q-minimum",
      prompt: "What is the minimum tapered annual allowance?",
      options: ["£4,000", "£10,000", "£20,000", "£40,000"],
      answer: 1,
      explain: "£10,000.",
    },
    {
      kind: "mcq",
      id: "q-employer",
      prompt: "Are employer contributions included in threshold income?",
      options: ["Yes", "No (except in some salary sacrifice cases)", "Only above £10,000", "Always"],
      answer: 1,
      explain: "They are in adjusted income but not threshold income.",
    },
    {
      kind: "mcq",
      id: "q-cf-mpaa",
      prompt: "Can carry forward cover an excess over the MPAA?",
      options: ["Yes", "No", "Only for three years", "Only for directors"],
      answer: 1,
      explain: "MPAA excess can't be covered by carry forward and unused MPAA is not carried forward.",
    },
    {
      kind: "mcq",
      id: "q-days",
      prompt: "How long does a member have to tell other schemes after receiving a flexible access statement?",
      options: ["30 days", "91 days", "6 months", "12 months"],
      answer: 1,
      explain: "Within 91 days.",
    },
  ],
  sources: [
    { label: "PTM057100 – annual allowance: tapered annual allowance", url: "https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm057100" },
    { label: "PTM056510 – money purchase annual allowance: general", url: "https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm056510" },
    { label: "Pension schemes rates – GOV.UK", url: "https://www.gov.uk/government/publications/rates-and-allowances-pension-schemes/pension-schemes-rates" },
    { label: "Annual allowance – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
  ],
};
