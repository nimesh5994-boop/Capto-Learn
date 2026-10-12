import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "marriage-allowance-gift-aid-and-pension-relief",
  title: "Marriage allowance, Gift Aid and pension relief",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Three reliefs that clients often under-claim. Marriage allowance transfers part of a personal allowance between spouses. Gift Aid donations and relief-at-source pension contributions extend the basic rate band, so higher and additional rate taxpayers claim extra relief through Self Assessment, and both reduce adjusted net income.",
  objectives: [
    "Check eligibility for marriage allowance and calculate its effect",
    "Gross up Gift Aid and relief-at-source pension contributions and extend the basic rate band",
    "Calculate the extra relief a higher rate taxpayer gets, including where it's limited",
    "Use gross contributions to reduce adjusted net income for the allowance taper and the HICBC",
  ],
  body: [
    {
      kind: "md",
      md: `These three reliefs share a theme: they're mostly given **automatically at the basic rate**, and the extra value only comes through if someone puts the right figures on the return. Ask about them every year. Clients rarely mention a charity direct debit or a personal pension unless asked.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Marriage allowance (ITA 2007 ss55A–55E)",
      md: `A spouse or civil partner whose income is **below the personal allowance** can transfer **£1,260** (10% of the £12,570 personal allowance) to their partner. The partner receiving it gets a **tax reduction of up to £252** (£1,260 × 20%). The transferor's own personal allowance falls to £11,310.

Conditions:
- married or in a civil partnership (living together isn't enough),
- the **recipient** is a **basic rate** taxpayer: not liable at the higher or additional rate (in Scotland, the starter, basic or intermediate rate),
- neither partner is claiming the married couple's allowance.

Claims can be **backdated up to 4 years** if the conditions were met in those years. The election carries on each year until it's cancelled or the conditions stop being met.`,
    },
    {
      kind: "md",
      md: `### Gift Aid

When a UK taxpayer gives to charity under a Gift Aid declaration, the payment is treated as made **net of basic rate tax**. The charity claims 25p for every £1 from HMRC, so a £100 donation is worth **£125 gross** to the charity.

On the donor's return:
- **Gross up** the donation: net × 100/80.
- **Extend the basic rate band** (and the higher rate threshold) by the gross amount. This gives higher rate and additional rate taxpayers their extra relief.
- **Reduce adjusted net income** by the gross amount.

The donor must have paid enough income tax and CGT in the year to cover the basic rate tax the charity reclaims. If they haven't, HMRC can charge them the shortfall. A non-taxpayer shouldn't sign Gift Aid declarations.

**Carry-back:** donations made in the current tax year can be treated as made in the **previous** tax year, if the election is made on that year's return when it's filed on or before 31 January. That helps a client whose income fell this year.`,
    },
    {
      kind: "md",
      md: `### Pension contributions

**Relief at source** (most personal pensions and SIPPs, and some workplace schemes): the member pays **80%** and the provider claims the 20% basic rate tax from HMRC. On the return, the **gross** contribution:
- **extends the basic rate band and the higher rate threshold**, so higher and additional rate taxpayers get their extra relief,
- **reduces adjusted net income**.

**Net pay arrangements** (most occupational schemes): contributions are deducted from pay **before tax**, so full relief is given through PAYE. Nothing goes on the return.

**Limits:** relief is available on gross contributions up to **100% of relevant UK earnings** (or £3,600 gross if earnings are lower), and contributions above the **annual allowance** (£60,000, or less if tapered or after flexible access) trigger an annual allowance charge. Property income and dividends aren't relevant earnings.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The extra relief is limited to income actually taxed at the higher rate",
      md: `Extending the basic rate band only helps to the extent that income would otherwise be taxed at 40%. A client with £3,000 of income in the higher rate band who makes a £10,000 gross contribution saves 20% × **£3,000**, not 20% × £10,000. Model the figures before advising a client to make a big contribution for the tax relief.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Adjusted net income planning",
      md: `Gross Gift Aid and relief-at-source contributions reduce **adjusted net income (ANI)**, which drives:
- the **personal allowance taper** above £100,000 (an effective 60% marginal rate between £100,000 and £125,140),
- the **High Income Child Benefit Charge** between £60,000 and £80,000.

A contribution that brings ANI down into these bands can earn far more than the headline 40% relief. Salary sacrifice reduces ANI too, by reducing employment income.`,
    },
  ],
  scenario: {
    title: "Hannah and Daniel: reliefs on the 2026/27 returns",
    narrative: `Hannah is employed in Bristol on a salary of **£64,000** (not a Scottish taxpayer). During 2026/27 she:
- paid **£1,600** to charities under Gift Aid,
- paid **£8,000** into a personal pension (relief at source).

Her husband Daniel works part-time and earns **£8,000**. They have no other income. Daniel asks whether he can transfer some of his unused personal allowance to Hannah.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: gross up.** Gift Aid: £1,600 × 100/80 = £2,000. Pension: £8,000 × 100/80 = £10,000. Total extension: **£12,000**. Hannah's basic rate band becomes £37,700 + £12,000 = **£49,700**.

**Step 2: her tax.**`,
      },
      {
        kind: "table",
        caption: "Hannah's income tax for 2026/27",
        head: ["", "Without the reliefs (£)", "With the reliefs (£)"],
        rows: [
          ["Taxable income (£64,000 − £12,570)", "51,430", "51,430"],
          ["Basic rate band", "37,700", "49,700"],
          ["At 20%", "7,540", "9,940"],
          ["At 40%", "13,730 × 40% = 5,492", "1,730 × 40% = 692"],
          ["**Income tax**", "**13,032**", "**10,632**"],
        ],
      },
      {
        kind: "md",
        md: `The return saves Hannah **£2,400** (20% × £12,000), on top of the basic rate relief already given to the charities and her pension provider. Her PAYE code may also be adjusted for future years.

**Adjusted net income:** £64,000 − £12,000 = **£52,000**. If the couple claim Child Benefit, this takes Hannah below £60,000, so no High Income Child Benefit Charge is due.

**Marriage allowance:** Daniel's income (£8,000) is below the personal allowance, but **Hannah is still a higher rate taxpayer** even with her extended band (£1,730 is taxed at 40%). So the marriage allowance **isn't available** this year. If Hannah's income fell into the basic rate band in a later year, Daniel could transfer £1,260, and the claim could be backdated up to 4 years for any earlier years that qualified.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "gift-aid-limited",
      prompt:
        "Owen's only income is a salary of £52,000. He pays £4,000 to charity under Gift Aid in 2026/27. How much **extra** tax relief does he get through his Self Assessment return?",
      answer: 346,
      unit: "£",
      explain: "Extending the band only saves 20% on income that would otherwise be taxed at 40%. Owen has only £1,730 of income in the higher rate band.",
      working:
        "Gross gift: £4,000 × 100/80 = £5,000. Taxable income £52,000 − £12,570 = £39,430. Income above £37,700 = £1,730. With the band extended to £42,700, none is taxed at 40%. Saving: £1,730 × 20% = **£346**.",
    },
    {
      kind: "numeric",
      id: "pension-extra",
      prompt:
        "Fatima earns a salary of £70,000 and pays £8,000 into a relief-at-source personal pension in 2026/27. How much extra relief does she get on her return?",
      answer: 2000,
      unit: "£",
      explain: "Gross up the contribution and extend the basic rate band. She has more than enough income taxed at 40% to use the full extension.",
      working: "Gross: £8,000 × 100/80 = £10,000. Income in the higher rate band: £70,000 − £12,570 − £37,700 = £19,730, which is more than £10,000. Extra relief: £10,000 × 20% = **£2,000**.",
    },
    {
      kind: "numeric",
      id: "ani-taper",
      prompt:
        "Rhys has employment income of £110,000 and no other income. How much would he need to pay **net** into a relief-at-source personal pension to restore his full personal allowance for 2026/27?",
      answer: 8000,
      unit: "£",
      explain: "The personal allowance is restored when adjusted net income falls to £100,000. ANI is reduced by the **gross** contribution.",
      working: "Reduction needed in ANI: £110,000 − £100,000 = £10,000 gross. Net payment: £10,000 × 80% = **£8,000**.",
    },
    {
      kind: "classify",
      id: "ma-eligible",
      prompt: "Can the couple claim marriage allowance for 2026/27? Assume they're married or in a civil partnership and not Scottish taxpayers, and the figures are total income.",
      categories: ["Yes", "No"],
      items: [
        { text: "Transferor £9,500, recipient £38,000", answer: 0 },
        { text: "Transferor £11,000, recipient £72,000 (no Gift Aid or pension contributions)", answer: 1, why: "The recipient is a higher rate taxpayer." },
        { text: "Unmarried couple living together: £6,000 and £30,000", answer: 1, why: "They must be married or in a civil partnership." },
        { text: "Transferor £14,000, recipient £30,000", answer: 1, why: "The transferor's income is above the personal allowance." },
        { text: "Transferor £0 (full-time carer), recipient £45,000", answer: 0 },
      ],
      explain: "The transferor must have income below the personal allowance, and the recipient must be no more than a basic rate taxpayer. The couple must be married or in a civil partnership.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ma-value",
      prompt: "What is the maximum tax saving from marriage allowance in 2026/27?",
      options: ["£126", "£252", "£1,260", "£2,514"],
      answer: 1,
      explain: "£1,260 is transferred, and the recipient gets a 20% tax reduction on it: £252.",
    },
    {
      kind: "mcq",
      id: "q-ga-gross",
      prompt: "A client pays £600 to charity under Gift Aid. By how much is their basic rate band extended?",
      options: ["£600", "£720", "£750", "£800"],
      answer: 2,
      explain: "Gross up by 100/80: £600 × 100/80 = £750.",
    },
    {
      kind: "mcq",
      id: "q-net-pay",
      prompt: "An employee pays into their employer's occupational scheme under a net pay arrangement. What goes on their tax return?",
      options: ["The gross contribution, to extend the basic rate band", "Nothing: full relief has been given through PAYE", "The net contribution", "A claim for 20% relief"],
      answer: 1,
      explain: "Under net pay, contributions are deducted before tax, so higher rate relief is already given. Only relief-at-source contributions extend the band.",
    },
    {
      kind: "mcq",
      id: "q-carry-back",
      prompt: "A client makes a Gift Aid donation in June 2026. Can they claim relief for it in 2025/26?",
      options: [
        "No, never",
        "Yes, if they elect on their 2025/26 return filed on or before 31 January 2027",
        "Yes, at any time within 4 years",
        "Only if the donation is over £1,000",
      ],
      answer: 1,
      explain: "The carry-back election must be made on the previous year's return, filed no later than 31 January.",
    },
    {
      kind: "mcq",
      id: "q-relevant-earnings",
      prompt: "A landlord with £40,000 of rental profit and no earnings wants to pay £20,000 gross into a personal pension. What is the maximum gross contribution that gets tax relief?",
      options: ["£20,000", "£40,000", "£3,600", "£60,000"],
      answer: 2,
      explain: "Rental profit isn't relevant UK earnings. Without earnings, relief is limited to £3,600 gross (£2,880 net) a year.",
    },
  ],
  sources: [
    { label: "Marriage Allowance (GOV.UK)", url: "https://www.gov.uk/marriage-allowance" },
    { label: "Tax relief when you donate to a charity: Gift Aid", url: "https://www.gov.uk/donating-to-charity/gift-aid" },
    { label: "Tax on your private pension: pension tax relief", url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
    { label: "Tax on your private pension: annual allowance", url: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
    { label: "Income Tax rates and allowances for current and past years", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past" },
    { label: "Income Tax Act 2007 s55B – transferable tax allowance", url: "https://www.legislation.gov.uk/ukpga/2007/3/section/55B" },
  ],
};
