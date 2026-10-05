import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "lump-sum-allowance-and-lsdba",
  title: "Tax-free cash: the lump sum allowance and the LSDBA",
  level: "advanced",
  minutes: 35,
  summary:
    "How pension tax-free cash works after the abolition of the lifetime allowance: the £268,275 lump sum allowance, the £1,073,100 lump sum and death benefit allowance, how each withdrawal uses them up, what is taxed when they are exceeded, and the position on death.",
  objectives: [
    "Explain what replaced the lifetime allowance from 6 April 2024",
    "Calculate tax-free cash and the taxable element of a withdrawal using the 25% rule and the lump sum allowance",
    "Track how much of the lump sum allowance remains after a series of withdrawals",
    "Explain how lump sum death benefits are taxed and the role of the LSDBA",
    "Recognise when protections change the allowances",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **lifetime allowance** charge was removed from 6 April 2023 and the allowance itself abolished from **6 April 2024**. It was replaced by lump sum limits. You still need to advise on how much can be taken **tax-free** and how much of the pension can be left to beneficiaries free of tax, because those limits are fixed in cash terms and clients with large pots will hit them.`,
    },
    {
      kind: "table",
      caption: "The two lump sum allowances (2026/27)",
      head: ["Allowance", "Amount", "What it limits"],
      rows: [
        ["Lump sum allowance (LSA)", "£268,275", "Total tax-free lump sums a person can take from all schemes in their lifetime (mainly the 25% pension commencement lump sum and the tax-free part of UFPLS)"],
        ["Lump sum and death benefit allowance (LSDBA)", "£1,073,100", "Total tax-free lump sums taken during life **plus** tax-free lump sum death benefits paid to beneficiaries"],
        ["Overseas transfer allowance (OTA)", "£1,073,100", "Transfers to qualifying recognised overseas pension schemes (QROPS) free of the overseas transfer charge"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How tax-free cash works",
      md: `- The standard **pension commencement lump sum (PCLS)** is **25%** of the value of the benefits crystallised, but it is capped by the **remaining LSA**.
- An **uncrystallised funds pension lump sum (UFPLS)** is paid with **25% tax-free** (subject to the LSA) and **75% taxable** as pension income at the person's marginal rate.
- Each tax-free lump sum **uses up** the LSA. Once the LSA is exhausted, any further 25% element is taxed as pension income.
- If tax-free amounts exceed the **LSDBA** (through lifetime lump sums and death benefits combined), the excess is taxed.
- For people with **protections** (for example fixed protection 2012, 2014, 2016, individual protection 2014 or 2016, enhanced protection), the LSA and LSDBA are increased by reference to the lifetime allowance that protection was based on. Ask whether a client has a protection **certificate**.`,
    },
    {
      kind: "md",
      md: `### Death benefits

- **Before age 75:** a lump sum death benefit paid within **two years** of the scheme administrator being told of the death is normally **tax-free**, up to the **LSDBA** (less lump sums already used). The excess is taxed at the recipient's marginal rate.
- **After age 75:** lump sums and drawdown paid to beneficiaries are taxed at the **recipient's marginal rate** (or 45% in some trust cases).
- **Inheritance tax:** from **6 April 2027**, most unused pension funds and death benefits will count in the person's estate for IHT (see the lesson on pensions and IHT). Death-in-service benefits from a registered scheme are excluded.

### Working through a withdrawal

1. Check the **remaining LSA** (from the provider's statements and **tax-free cash records**: the LSA is a lifetime total across all schemes).
2. Compute 25% of the amount crystallised, or the UFPLS tax-free portion.
3. Take the **lower** of that and the remaining LSA as tax-free.
4. Treat the balance as taxable pension income (PAYE through the scheme, **emergency tax code** on the first payment is common, so remind clients to reclaim overpaid tax).
5. Update the **remaining LSA and LSDBA**.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mind the MPAA and the emergency tax trap",
      md: `A UFPLS or flexi-access drawdown income triggers the **MPAA** (£10,000). A first taxable withdrawal is often taxed on a **month 1 basis**, so the client may be over-taxed and have to reclaim through the relevant HMRC repayment form (P55, P53Z or P50Z) or the online claim. Tell clients to take a small test payment first if timing matters.`,
    },
  ],
  scenario: {
    title: "Retirement planning for Gareth Moss",
    narrative: `Gareth Moss, aged 60, is the director of Moss Joinery Ltd and has a SIPP worth **£1,500,000**. He has never taken benefits and has no protection. He wants to know how much he can take tax-free and the cost of taking £400,000 now.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: 25% of the pot.** £1,500,000 × 25% = £375,000. This is more than the LSA (£268,275), so the tax-free cash is capped at **£268,275**.

**Step 2: how to take exactly the maximum.** 25% of £1,073,100 is £268,275, so crystallising **£1,073,100** of the pot gives the full £268,275 tax-free. The remaining £804,825 of the crystallised funds goes into drawdown (not taxed until income is drawn) and the other £426,900 stays uncrystallised. Taking only the tax-free cash does **not** trigger the MPAA.

**Step 3: the alternative of a £400,000 UFPLS.** 25% = £100,000 is tax-free (within the LSA) and **£300,000 is taxable** as pension income in one year, a large part of it likely at 45%. It would also trigger the **MPAA** (£10,000). It also leaves only £168,275 of LSA (£268,275 − £100,000). Taking the maximum tax-free cash by crystallisation, and drawing taxable income gradually, is normally far more efficient.

**Step 4: update the records.** After taking £268,275 tax-free, his remaining LSA is **nil**. Remaining LSDBA = £1,073,100 − £268,275 = **£804,825** (applies to death benefits).

**Step 5: advice.** Gareth should (a) take the PCLS only if he needs the cash or is happy with the new LSA position, (b) consider staged withdrawals across tax years to use lower tax bands, and (c) take advice on the inheritance tax treatment of the rest from April 2027.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "pcls-capped",
      prompt: "A member with no previous lump sums crystallises a £2,000,000 pot. What is the maximum tax-free lump sum (£)? LSA is £268,275.",
      answer: 268275,
      unit: "£",
      explain: "25% would be £500,000, but the lump sum allowance caps it.",
      working: "25% × £2,000,000 = £500,000; capped at **£268,275**.",
    },
    {
      kind: "numeric",
      id: "ufpls-tax-free",
      prompt: "A member takes a £60,000 UFPLS and has plenty of LSA left. How much is tax-free (£)?",
      answer: 15000,
      unit: "£",
      explain: "25% of a UFPLS is tax-free.",
      working: "£60,000 × 25% = **£15,000** (the other £45,000 is taxable pension income).",
    },
    {
      kind: "numeric",
      id: "lsa-remaining",
      prompt: "A member has taken tax-free lump sums of £120,000 in previous years. What LSA remains (£)? LSA is £268,275.",
      answer: 148275,
      unit: "£",
      explain: "Earlier tax-free lump sums use up the allowance.",
      working: "£268,275 − £120,000 = **£148,275**.",
    },
    {
      kind: "mcq",
      id: "mcq-triggers-mpaa",
      prompt: "Which of these does NOT trigger the money purchase annual allowance?",
      options: ["A UFPLS", "Taxable flexi-access drawdown income", "Taking only the tax-free pension commencement lump sum", "A flexible annuity"],
      answer: 2,
      explain: "Taking only tax-free cash doesn't trigger the MPAA.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-lsa",
      prompt: "What is the lump sum allowance for 2026/27?",
      options: ["£180,000", "£268,275", "£500,000", "£1,073,100"],
      answer: 1,
      explain: "£268,275 (25% of the former £1,073,100 lifetime allowance).",
    },
    {
      kind: "mcq",
      id: "q-lsdba",
      prompt: "What is the lump sum and death benefit allowance?",
      options: ["£268,275", "£1,073,100", "£2,000,000", "£500,000"],
      answer: 1,
      explain: "£1,073,100.",
    },
    {
      kind: "mcq",
      id: "q-lta",
      prompt: "When was the lifetime allowance abolished?",
      options: ["6 April 2023", "6 April 2024", "6 April 2025", "6 April 2027"],
      answer: 1,
      explain: "The charge went in 2023/24 and the allowance was abolished from 6 April 2024.",
    },
    {
      kind: "mcq",
      id: "q-death",
      prompt: "A person dies at 70 with an unused pension. Lump sum death benefits paid within two years are normally…",
      options: ["Taxed at 45%", "Tax-free up to the LSDBA", "Taxed as dividends", "Taxed at 20%"],
      answer: 1,
      explain: "Before 75, tax-free within the LSDBA.",
    },
    {
      kind: "mcq",
      id: "q-protection",
      prompt: "A client holds an enhanced protection certificate. What should you do?",
      options: ["Ignore it", "Check how it changes their LSA and LSDBA", "Assume allowances double", "Advise them to apply for another"],
      answer: 1,
      explain: "Protections can increase the allowances; check the certificate.",
    },
  ],
  sources: [
    { label: "Lump sum allowance – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/lump-sum-allowance" },
    { label: "Find out the rules about individual lump sum allowances – GOV.UK", url: "https://www.gov.uk/guidance/find-out-the-rules-around-individual-lump-sum-allowances" },
    { label: "Pension tax limits – GOV.UK", url: "https://www.gov.uk/government/publications/abolition-of-lifetime-allowance-and-increases-to-pension-tax-limits/pension-tax-limits" },
    { label: "PTM171000 – lump sum allowance", url: "https://www.gov.uk/hmrc-internal-manuals/pensions-tax-manual/ptm171000" },
  ],
};
