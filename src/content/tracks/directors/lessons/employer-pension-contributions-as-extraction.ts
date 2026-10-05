import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "employer-pension-contributions-as-extraction",
  title: "Employer pension contributions as a way of extracting profit",
  level: "practitioner",
  minutes: 30,
  summary:
    "Why an employer contribution to a director's pension is often the most tax-efficient way to take value out of a company, the 'wholly and exclusively' test, the annual allowance and carry forward, and the trade-offs against salary and dividends.",
  objectives: [
    "Explain the tax treatment of an employer contribution to a registered pension scheme for the company and the director",
    "Apply the 'wholly and exclusively' test for owner-managed companies",
    "Check the annual allowance and carry forward before recommending a contribution",
    "Compare a pension contribution with a dividend for the same company profit",
    "Explain the timing rules and the commercial downsides",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `An **employer contribution** to a director's registered pension (usually a SIPP or workplace scheme) is a cost of the company, not income of the director. It attracts **no employer NIC, no employee NIC and no income tax** at the point of contribution. The money grows in the fund and is taxed on the way out (mostly at the director's marginal rate on withdrawals above the tax-free element). For a profitable owner-managed company it is often more efficient than a dividend, as long as the director doesn't need the cash now.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Deductibility: wholly and exclusively",
      md: `A contribution is deductible as an expense of the trade (ITTOIA/CTA 2009 trading income rules) if it is paid **wholly and exclusively for the purposes of the trade**. HMRC's guidance (BIM46035 onwards) says:

- Contributions are **normally accepted** where the **overall remuneration package** is reasonable for the work the director does, comparable with what unconnected employees would get.
- Disallowance is the exception: it arises where there is a **non-trade purpose** (such as a contribution so large it's clearly a way of extracting profit with no relation to duties) or where the remuneration is excessive.
- If **only part** is non-trade, only that part is disallowed.
- The deduction is given in the period the contribution is **actually paid**, not when accrued or provided for.
- A **very large** contribution may have to be spread over later periods (special spreading rules apply to very large contributions, check BIM46035 and the Finance Act rules before recommending one).`,
    },
    {
      kind: "table",
      caption: "Compared with salary and dividend (2026/27)",
      head: ["", "Employer pension contribution", "Salary", "Dividend"],
      rows: [
        ["Corporation tax relief", "Yes (19% / 25% / marginal)", "Yes", "No"],
        ["Employer NIC (15%)", "None", "Yes above £5,000", "None"],
        ["Employee NIC / income tax", "None on payment", "Yes", "Dividend tax 10.75% / 35.75% / 39.35%"],
        ["Access", "From normal minimum pension age (57 from 6 April 2028); 25% tax-free subject to the lump sum allowance", "Immediate", "Immediate"],
        ["Limits", "Annual allowance £60,000 (carry forward 3 years)", "None", "Distributable reserves"],
      ],
    },
    {
      kind: "md",
      md: `### The annual allowance

The **annual allowance for 2026/27 is £60,000**. It applies to **all** pension inputs for the director in the tax year (employer and personal). Two adjustments matter:

- **Carry forward:** unused allowance from the previous **three tax years** can be used, if the director was a member of a registered scheme in those years and has used the current year's allowance first.
- **Reductions:** the **tapered annual allowance** (threshold income above £200,000 and adjusted income above £260,000) and the **money purchase annual allowance** (once flexible access has been taken) can restrict it. Both are covered in the pensions track.

An employer contribution above the allowance doesn't affect the **company's** deduction (the test is wholly and exclusively), but the **director** gets an annual allowance charge on the excess.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't recommend it blindly",
      md: `- The money is **locked** until the minimum pension age, so don't fund it with cash the director needs for the mortgage.
- **Employer contributions don't count** as relevant earnings for personal tax relief purposes, so they don't add to the amount the director can contribute personally.
- **Mortgage and credit assessments** often look at salary and dividends only.
- A contribution during a **loss-making** year gives no immediate relief, though losses can be carried forward.
- For **higher earners** the interplay with the personal allowance taper (£100,000 adjusted net income) can make employer contributions especially valuable, but only within the allowance.
- On **death before 75** funds can usually pass tax-free to beneficiaries. The position for pensions and IHT is changing from April 2027, see the pensions track.`,
    },
  ],
  scenario: {
    title: "£20,000 of spare profit at Calloway Design Ltd",
    narrative: `Calloway Design Ltd has £20,000 of profit (before corporation tax and director's remuneration for the year) that it could either pay out as a dividend or put into a pension for its director, Sana Calloway. Sana already takes a £12,570 salary and dividends in the basic-rate band, so any extra dividend would be taxed at 10.75%. Taxable profits are below £50,000, so corporation tax is 19%. Sana has plenty of unused annual allowance.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Option 1: dividend.**
- Corporation tax at 19% on £20,000 = £3,800, leaving **£16,200** to pay out.
- Dividend tax at 10.75% (basic-rate band, allowance already used) = £1,741.50.
- Net to Sana: **£14,458.50**.

**Option 2: employer pension contribution of £20,000.**
- The company deducts £20,000 and pays no corporation tax on it, so there is no CT cost; the whole £20,000 is paid into Sana's pension.
- No NIC, no income tax at the point of contribution.
- Value in the fund: **£20,000**. When Sana later withdraws, the first 25% is normally tax-free (within the lump sum allowance) and the rest is taxed as income, say at 20% if basic rate: net roughly £20,000 × (25% + 75% × 80%) = £17,000.

**Result:** the pension delivers about £17,000 net against £14,458.50 for the dividend if Sana is a basic-rate taxpayer in retirement (and more if the withdrawals use up allowances or are taxed at a lower marginal rate). If Sana is a higher-rate taxpayer today the gap is far bigger, since the dividend would bear 35.75%.

**Caveats to record in the recommendation:** the money is not accessible until the minimum pension age, and the 25% tax-free element is capped by the lump sum allowance. Confirm unused annual allowance for the last three years before paying.`,
      },
      {
        kind: "journal",
        title: "Employer pension contribution paid by the company",
        narrative: "The payment is a staff-cost expense of the period in which it is paid.",
        lines: [
          { account: "Pension costs – employer contributions", dr: 20000 },
          { account: "Bank", cr: 20000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "net-dividend",
      prompt: "A company has £30,000 of profit it wants to extract as a dividend. Corporation tax is 19%. The shareholder is a basic-rate taxpayer (10.75%) who has already used the £500 dividend allowance. What net amount does the shareholder receive (to the nearest £1)?",
      answer: 21688,
      tolerance: 1,
      unit: "£",
      explain: "Pay corporation tax first, then dividend tax on the distribution.",
      working: "£30,000 × 81% = £24,300 dividend; tax 10.75% = £2,612.25; net **£21,687.75**.",
    },
    {
      kind: "numeric",
      id: "ct-saving",
      prompt: "A company with taxable profits below £50,000 makes a £15,000 employer contribution to a director's pension. What corporation tax does it save (£)?",
      answer: 2850,
      unit: "£",
      explain: "The contribution is deductible; the saving is the small profits rate applied to it.",
      working: "£15,000 × 19% = **£2,850**.",
    },
    {
      kind: "mcq",
      id: "mcq-timing",
      prompt: "In which period is an employer pension contribution deductible?",
      options: ["The period it is accrued", "The period it is actually paid", "The period the director retires", "The period the scheme is registered"],
      answer: 1,
      explain: "Employer pension contributions are deductible on a paid basis.",
    },
    {
      kind: "classify",
      id: "classify-pension-tax",
      prompt: "Is there a charge at the point the employer pays a £20,000 contribution to the director's registered pension?",
      categories: ["Charge arises", "No charge"],
      items: [
        { text: "Employer NIC at 15%", answer: 1 },
        { text: "Employee NIC", answer: 1 },
        { text: "Income tax on the director through P11D", answer: 1 },
        { text: "Annual allowance charge where the director's total pension input is £75,000 and no carry forward is available", answer: 0, why: "Excess over the £60,000 annual allowance is charged on the director." },
      ],
      explain: "An employer contribution is outside NIC and income tax. The only charge is the annual allowance excess.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-aa",
      prompt: "What is the annual allowance for 2026/27?",
      options: ["£40,000", "£50,000", "£60,000", "£100,000"],
      answer: 2,
      explain: "£60,000, with taper and MPAA exceptions.",
    },
    {
      kind: "mcq",
      id: "q-cf",
      prompt: "Carry forward of unused annual allowance may go back how many tax years?",
      options: ["One", "Two", "Three", "Five"],
      answer: 2,
      explain: "The previous three tax years, once the current year's allowance is used.",
    },
    {
      kind: "mcq",
      id: "q-nic",
      prompt: "Is employer NIC payable on an employer contribution to a registered pension?",
      options: ["Yes at 15%", "No", "Only above £5,000", "Only for directors"],
      answer: 1,
      explain: "There is no NIC on employer pension contributions.",
    },
    {
      kind: "mcq",
      id: "q-we",
      prompt: "HMRC may restrict the deduction for an employer pension contribution where…",
      options: ["The company is a close company", "The overall package is excessive or the payment has a non-trade purpose", "The director is also the shareholder", "It is paid in March"],
      answer: 1,
      explain: "The wholly and exclusively test governs deductibility.",
    },
    {
      kind: "mcq",
      id: "q-loss",
      prompt: "A company makes a loss. Does an employer contribution give immediate corporation tax relief?",
      options: ["Yes: full relief", "No: it increases the loss, which can be carried forward or back as the rules allow", "Yes at 25%", "It is disallowed"],
      answer: 1,
      explain: "A deduction creating or increasing a loss only gives relief to the extent the loss is used.",
    },
  ],
  sources: [
    { label: "BIM46035 – employer pension contributions", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46035" },
    { label: "Annual allowance – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
    { label: "Tax relief on pension contributions", url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
    { label: "Corporation Tax rates", url: "https://www.gov.uk/corporation-tax-rates" },
  ],
};
