import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "writing-off-a-directors-loan",
  title: "Writing off or releasing a director's loan",
  level: "practitioner",
  minutes: 30,
  summary:
    "The tax and legal consequences of releasing an overdrawn director's loan: s458 relief for the company, income tax on the director as dividend income, Class 1 NIC exposure, the reserves test, and how it compares with clearing the loan by dividend or bonus.",
  objectives: [
    "Explain why a write-off is a taxable event for the director and the company's relief position",
    "Compute the income tax and NIC cost of writing off a loan",
    "Explain why the legal power to release a loan depends on distributable reserves",
    "Compare write-off, dividend and bonus as ways of clearing an overdrawn account",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `When an overdrawn director's loan can't be repaid in cash, a client will often ask: *"Can't the company just write it off?"* It can. But a write-off is not a free way of making the loan disappear. It converts a loan into income for the director. The company's **s455 relief** is real, but the **director's own tax** takes its place.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What the legislation says",
      md: `- **Company (CTA 2010 s458):** where a loan on which s455 has been paid (or would have been due) is **released or written off**, the company gets relief, as it would on repayment. For a write-off, relief arises in the period in which the write-off takes place. It is **not** relieved just because the debt is uncollectable: there must be a release or write-off.
- **Individual (ITTOIA 2005 ss415–416):** the amount released or written off is treated as **dividend income**, taxed at the dividend rates (for 2026/27 10.75% basic, 35.75% higher, 39.35% additional). Since 2016/17 there is no grossing up and no tax credit. The dividend allowance (£500) can be used if available.
- **NIC:** where the participator is an **employee** (including a director), HMRC's view in CTM61660 is that the amount written off is "remuneration or profit derived from an employment", so **Class 1 NIC** (employee and secondary) is due. HMRC relies on *Stewart Fraser Ltd v HMRC* [2011] UKFTT 46 (TC). Where the individual is within the s415 charge, the ITEPA s188 employment-related loan charge is displaced, but the NIC position is separate.
- **Not deductible:** a write-off of a loan to a shareholder is not a trading expense of the company.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The company needs distributable reserves too",
      md: `Releasing a debt owed by a shareholder is in substance a **distribution** (it transfers value to a member for nothing). If the company doesn't have distributable reserves (CA 2006 Part 23), the release is **unlawful** and the amount may have to be repaid under s847. A write-off for a company with accumulated losses is therefore a poor idea even before tax.`,
    },
    {
      kind: "table",
      caption: "Three ways to clear a £20,000 overdrawn loan (2026/27, director already has £12,570 salary, no other income, company has the reserves)",
      head: ["Route", "Company cost", "Director's personal cost", "Comment"],
      rows: [
        ["Write off", "s455 relief given; employer NIC £3,000 (15% × £20,000) if NIC applies", "Dividend tax £2,096 (19,500 × 10.75%) + employee NIC £1,600 (8%)", "Total tax cost about £6,700 against a £20,000 write-off"],
        ["Declare a dividend and credit the loan", "None; no NIC", "Dividend tax £2,096", "Cheapest if reserves exist"],
        ["Pay a bonus through payroll", "Employer NIC £3,000; bonus deductible for CT (19% = £3,800 relief)", "Income tax at 20% + employee NIC 8% on £20,000", "Dearer for the director; deductible for the company"],
      ],
    },
    {
      kind: "md",
      md: `The comparison shows the key point: a write-off is rarely cheaper than a dividend. It is usually used when the company has **reserves**, the director has **no cash**, and the **tax bill** is accepted. If the company has no reserves, the real alternatives are repayment, a (minuted and taxed) bonus, or restructuring.

### Reporting a write-off

- **Company:** CT600A, with a claim for s458 relief in the period of the release.
- **Director:** report the amount on the Self Assessment return as dividend income. If PAYE/NIC is due, the company should report it through payroll (HMRC may chase it as unreported earnings).
- **Accounts:** the release is a **reduction of reserves**, not a profit and loss item.
- **Records:** a signed **board minute** and a **deed or letter of release**, referencing the amount and date.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Insolvency",
      md: `If the company goes into insolvent liquidation the s455 tax is reclaimed for the liquidator in certain cases (CTM61560), but the **liquidator can pursue the director** for the overdrawn balance. A write-off made on the eve of insolvency can be challenged as a **transaction at an undervalue** (Insolvency Act 1986 s238). Don't let the client treat a write-off as a way of avoiding repayment to creditors.`,
    },
  ],
  scenario: {
    title: "Tilbury Electrical Ltd: £20,000 that cannot be repaid",
    narrative: `Tilbury Electrical Ltd's director and sole shareholder, Neil Tilbury, has an overdrawn loan account of **£20,000** at 31 March 2027. The year-end s455 charge was paid on 1 January 2028 (£7,150 = 35.75% × £20,000). Neil takes a £12,570 salary from the company and has no other income. Distributable reserves are £55,000. Neil has no cash to repay the loan and asks you to write it off in the 2027/28 tax year. He hasn't used his £500 dividend allowance elsewhere.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: confirm the company can lawfully release it.** Reserves £55,000 vs £20,000 release. Yes.

**Step 2: company's relief.** On release, s458 relief of £7,150 is claimed on the CT600A for the period in which the loan is released. Refund due 9 months and 1 day after the end of that period.

**Step 3: Neil's income tax.** £20,000 treated as dividend income. Allowance £500: taxable £19,500 at 10.75% = **£2,096.25**, assuming his dividend income falls in the basic-rate band (salary £12,570 uses the personal allowance).

**Step 4: NIC.** On HMRC's view Neil is an employee-director, so Class 1 NIC is due: employee NIC 8% × £20,000 = **£1,600** (annual earnings period, Neil is above the primary threshold of £12,570 so the full £20,000 is charged, and total earnings £32,570 stay below the £50,270 upper earnings limit). Employer NIC 15% × £20,000 = **£3,000**; the company already pays above the £5,000 secondary threshold, so the full £20,000 counts (the Employment Allowance may offset it if the company is eligible).

**Step 5: advise.** Total cost of the write-off to Neil and the company: £2,096 + £1,600 + £3,000 ≈ **£6,696** against s455 relief of £7,150, which is a refund of tax already paid. A dividend of £20,000 credited to the loan would cost only the £2,096 dividend tax. Recommend the dividend if reserves allow.`,
      },
      {
        kind: "journal",
        title: "Declaring a £20,000 dividend and crediting it to the loan account (the cheaper alternative)",
        narrative: "No cash moves; the dividend is set against the debt.",
        lines: [
          { account: "Dividends (reserves)", dr: 20000 },
          { account: "Director's loan account", cr: 20000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "dividend-tax-on-writeoff",
      prompt: "A director with salary of £12,570 and no other income has £15,000 of a loan written off in 2026/27. Assuming the £500 dividend allowance is available, what is the income tax on the write-off (to the nearest £1)?",
      answer: 1559,
      tolerance: 1,
      unit: "£",
      explain: "The write-off is dividend income taxed at the dividend rates, within the basic-rate band here.",
      working: "(£15,000 − £500) × 10.75% = £14,500 × 0.1075 = **£1,558.75**.",
    },
    {
      kind: "numeric",
      id: "employer-nic-writeoff",
      prompt: "On HMRC's view, what is the employer Class 1 NIC on a £20,000 write-off where the company's earnings for the director are already above the secondary threshold (15%)?",
      answer: 3000,
      unit: "£",
      explain: "Employer NIC at 15% applies to the full write-off because the threshold is already used.",
      working: "£20,000 × 15% = **£3,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-writeoff-treatment",
      prompt: "How is a written-off loan to a participator taxed on the individual (from 2016/17)?",
      options: ["As employment income only", "As dividend income, with no gross-up and no tax credit", "As a capital gain", "It is not taxable"],
      answer: 1,
      explain: "ITTOIA 2005 s415 and ITA 2007 s19(2)(d) treat it as dividend income. NIC may be due separately.",
    },
    {
      kind: "classify",
      id: "classify-writeoff",
      prompt: "Which statements about writing off a director's loan are correct?",
      categories: ["True", "False"],
      items: [
        { text: "The company needs distributable reserves to release the loan lawfully", answer: 0 },
        { text: "The write-off is a deductible trading expense", answer: 1, why: "A release of a shareholder's debt isn't a business cost." },
        { text: "The company can claim s458 relief for the s455 tax paid", answer: 0 },
        { text: "The director has no tax to pay on the write-off", answer: 1, why: "It is dividend income, and Class 1 NIC may be due." },
      ],
      explain: "A write-off moves the tax cost from the company's s455 position to the director's personal tax, and needs reserves.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-section",
      prompt: "Which section gives the company relief when a loan is released?",
      options: ["CTA 2010 s455", "CTA 2010 s458", "ITEPA s188", "ITTOIA s416"],
      answer: 1,
      explain: "s458 gives relief on repayment, release or write-off.",
    },
    {
      kind: "mcq",
      id: "q-gross-up",
      prompt: "Is a written-off loan grossed up for a tax credit for 2026/27?",
      options: ["Yes, by 100/90", "Yes, by 100/80", "No: grossing-up and dividend tax credits ended in 2016/17", "Only for higher-rate taxpayers"],
      answer: 2,
      explain: "FA 2016 removed the grossing-up when dividend tax credits ended.",
    },
    {
      kind: "mcq",
      id: "q-nic",
      prompt: "HMRC's view of Class 1 NIC on a written-off loan to a director-employee is that it is…",
      options: ["Never due", "Due as remuneration or profit derived from an employment", "Due only if the loan is over £50,000", "Due as Class 4"],
      answer: 1,
      explain: "CTM61660 and *Stewart Fraser*: it can be earnings for NIC purposes.",
    },
    {
      kind: "mcq",
      id: "q-reserves",
      prompt: "A loss-making company with no distributable reserves releases a £10,000 director's loan. The release is…",
      options: ["Valid if minuted", "Potentially an unlawful distribution", "A deductible expense", "Exempt"],
      answer: 1,
      explain: "A gratuitous release to a shareholder is a distribution and needs reserves.",
    },
    {
      kind: "mcq",
      id: "q-cheaper",
      prompt: "If the company has distributable reserves, which is usually cheapest for clearing an overdrawn loan?",
      options: ["Writing it off", "Declaring a dividend and crediting the loan", "Paying a bonus", "Doing nothing"],
      answer: 1,
      explain: "A dividend attracts dividend tax but no NIC.",
    },
  ],
  sources: [
    { label: "CTM61660 – release or write-off: Class 1 NIC", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61660" },
    { label: "SAIM5200 – loans written off: income tax", url: "https://www.gov.uk/hmrc-internal-manuals/savings-and-investment-manual/saim5200" },
    { label: "CTM61655 – release or writing off of a loan", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61655" },
    { label: "ITTOIA 2005 s415", url: "https://www.legislation.gov.uk/ukpga/2005/5/section/415" },
    { label: "NIM12020 – directors' loan accounts and NICs", url: "https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim12020" },
  ],
};
