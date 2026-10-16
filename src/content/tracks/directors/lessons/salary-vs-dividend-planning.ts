import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "salary-vs-dividend-planning",
  title: "Salary versus dividend: planning a director's remuneration",
  level: "practitioner",
  minutes: 40,
  summary:
    "Choosing the right mix of salary and dividends for an owner-director in 2026/27: the employer NIC secondary threshold, the Employment Allowance restriction for sole-director companies, corporation tax at 19%/25%, and the new dividend rates, with a full worked comparison.",
  objectives: [
    "State the 2026/27 thresholds that drive the salary decision: secondary threshold, primary threshold, personal allowance",
    "Explain the Employment Allowance and why a sole-director company can't claim it",
    "Compute the total tax and NIC of two remuneration packages for the same profit",
    "Explain why the optimum changes when the director is a higher-rate taxpayer or the company has other employees",
    "Write a clear remuneration recommendation to a client",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Owner-directors can usually choose how much to take as **salary** (deductible, subject to PAYE and NIC) and how much as **dividends** (not deductible, but no NIC). Since dividend tax rose to **10.75% basic / 35.75% higher** from 6 April 2026 and employer NIC rose to **15%** with a **£5,000** secondary threshold from April 2025, the old rule of thumb ("take the minimum salary and the rest in dividends") needs re-checking for every client. The answer depends on the profit level, who else is employed, and the director's other income.`,
    },
    {
      kind: "table",
      caption: "Key 2026/27 figures (verified on GOV.UK)",
      head: ["Item", "Figure"],
      rows: [
        ["Personal allowance", "£12,570"],
        ["Class 1 primary threshold (employee NIC starts)", "£12,570 a year (£1,048 a month)"],
        ["Class 1 secondary threshold (employer NIC starts)", "£5,000 a year (£417 a month)"],
        ["Upper earnings limit", "£50,270 a year"],
        ["Employer NIC rate", "15%"],
        ["Employee NIC rate (primary threshold to UEL / above UEL)", "8% / 2%"],
        ["Employment Allowance", "£10,500 a year"],
        ["Corporation tax", "19% on profits to £50,000; 25% above £250,000; marginal relief between"],
        ["Dividend allowance", "£500"],
        ["Dividend tax: basic / higher / additional", "10.75% / 35.75% / 39.35%"],
        ["Basic-rate band", "£37,700"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The Employment Allowance restriction",
      md: `The **£10,500** Employment Allowance reduces an employer's Class 1 secondary NIC bill. A company **cannot claim it** if the **only** employee paid above the secondary threshold is also a **director** of the company. A sole-director company with no other employees therefore pays full employer NIC on any salary above £5,000. If there's a second paid employee earning above £5,000 (for instance a spouse who genuinely works in the business at a justifiable rate), the allowance is available and can wipe out the NIC on the director's salary too.`,
    },
    {
      kind: "md",
      md: `### The logic of the choices

1. **Salary up to £5,000** costs the company no NIC, is deductible, and uses part of the director's personal allowance. But if it is **below the lower earnings limit** (£6,708 a year, £129 a week), it **does not give a qualifying year** for State Pension. Pay at least the LEL, or the client may need a voluntary contribution.
2. **Salary between £5,000 and £12,570** carries **employer NIC at 15%** (no employee NIC). With corporation tax relief at 19% the real net cost is about 12.2p per £1 of salary above £5,000 (15p less 19% relief). In many sole-director cases a salary at £12,570 is still beneficial **if** the employer NIC is smaller than the saving from using the whole personal allowance as deductible salary rather than as part of the dividend band. The worked example below tests this; run it for every client.
3. **Salary above £12,570** adds **employee NIC (8%)** plus employer NIC (15%) and income tax. This is rarely optimal for a basic-rate director compared with dividends, but may help when profits are low and the director needs earnings for **pension relief** or **mortgage** purposes.
4. **Dividends** are taxed at **10.75%** inside the basic-rate band, so the extraction rate is no longer as cheap relative to employment income as it used to be. For a higher-rate taxpayer the dividend rate is **35.75%**, so profit extracted as dividends faces corporation tax plus dividend tax.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Not just the tax: other consequences",
      md: `- **State Pension / benefits:** a salary below the LEL gives no qualifying year; between LEL and primary threshold it gives a qualifying year with no NIC.
- **Mortgages and credit:** lenders may focus on salary plus dividends over 2 years.
- **Pensions:** relief on personal contributions is limited by **relevant UK earnings** (salary), not dividends. A zero salary limits personal pension relief to £3,600 gross.
- **Student loans:** repayments apply to salary, and dividends via Self Assessment.
- **The Scottish taxpayer:** Scottish rates apply to salary but dividends are taxed at UK rates.`,
    },
  ],
  scenario: {
    title: "Two packages for Hartley Consulting Ltd",
    narrative: `Hartley Consulting Ltd is owned and run by Imran Hartley, who is its only employee. The company expects profits of **£45,000 before any director's pay or employer NIC** for the year to 31 March 2027. Imran has no other income and is a basic-rate taxpayer. He wants to know the better of two packages:

- **A:** salary £12,570, balance as dividend.
- **B:** salary £5,000, balance as dividend.

The company can't claim the Employment Allowance (only employee is a director). Ignore State Pension and any pension contribution.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Package comparison (rounded to pence)",
        head: ["", "A: salary £12,570", "B: salary £5,000"],
        rows: [
          ["Profit before director's pay", "£45,000.00", "£45,000.00"],
          ["Salary", "£12,570.00", "£5,000.00"],
          ["Employer NIC at 15% above £5,000", "£1,135.50", "£0.00"],
          ["Taxable profit", "£31,294.50", "£40,000.00"],
          ["Corporation tax at 19%", "£5,945.96", "£7,600.00"],
          ["Profit after tax = dividend", "£25,348.54", "£32,400.00"],
          ["Personal allowance left for dividends", "£0", "£7,570"],
          ["Dividends taxable after allowance and £500", "£24,848.54", "£24,330.00"],
          ["Dividend tax at 10.75%", "£2,671.22", "£2,615.48"],
          ["**Imran's net income**", "**£35,247.32**", "**£34,784.52**"],
        ],
      },
      {
        kind: "md",
        md: `**Reading the result.** Package A leaves Imran about **£463 better off**, even though it costs £1,135.50 of employer NIC, because the extra £7,570 of salary is corporation-tax deductible (19% relief) and sits inside his personal allowance. Package B uses the £7,570 allowance against the dividend, which has already suffered corporation tax.

**Total tax and NIC.** A: £1,135.50 + £5,945.96 + £2,671.22 = £9,752.68. B: £0 + £7,600 + £2,615.48 = £10,215.48. A is cheaper by **£462.80**.

**But test it for each client.** At profits above £50,000 the marginal corporation tax rate climbs towards 26.5% on the band between £50,000 and £250,000 (marginal relief), making the salary deduction even more valuable. If the **director's other income** takes them into the higher-rate band, the dividend rate is 35.75%, and more salary or a pension contribution may become more attractive.

**What to write in your recommendation.** "Based on expected profit of £45,000 we recommend a salary of £12,570, paid monthly (£1,047.50) through PAYE, with dividends of up to £25,300 for the year, minuted and paid on or after quarterly management accounts. This is about £460 a year better than a £5,000 salary. Please confirm any other income you expect."`,
      },
      {
        kind: "journal",
        title: "Employer NIC on the £12,570 salary",
        narrative: "Accrual of the employer's NIC for the year: (£12,570 − £5,000) × 15%.",
        lines: [
          { account: "Employer's NIC expense", dr: 1135.5 },
          { account: "PAYE/NIC liability (HMRC)", cr: 1135.5 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "employer-nic-salary",
      prompt: "A sole-director company pays the director a salary of £9,000 in 2026/27 (no Employment Allowance). What is the employer NIC for the year (£)?",
      answer: 600,
      unit: "£",
      explain: "Employer NIC at 15% applies to earnings above the £5,000 secondary threshold.",
      working: "(£9,000 − £5,000) × 15% = **£600**.",
    },
    {
      kind: "numeric",
      id: "dividend-tax-calc",
      prompt: "A director has salary of £12,570 and receives £30,000 of dividends in 2026/27. No other income. How much dividend tax is payable (to the nearest £1)?",
      answer: 3171,
      tolerance: 1,
      unit: "£",
      explain: "Personal allowance is used by salary; the £500 dividend allowance covers the first £500; the rest is at 10.75%.",
      working: "(£30,000 − £500) × 10.75% = £29,500 × 0.1075 = **£3,171.25**.",
    },
    {
      kind: "mcq",
      id: "mcq-ea",
      prompt: "A company's only employee on a salary above the secondary threshold is its sole director. Can it claim the £10,500 Employment Allowance?",
      options: ["Yes, always", "No: the restriction applies where the only employee paid above the threshold is a director", "Yes if the director is also the shareholder", "Only for the first year"],
      answer: 1,
      explain: "A sole-director company with no other qualifying employee is not eligible.",
    },
    {
      kind: "multi",
      id: "multi-salary-points",
      prompt: "Which are good reasons to pay a director at least the lower earnings limit (£6,708 in 2026/27) rather than nothing? Select all that apply.",
      options: [
        "It gives a qualifying year for State Pension without paying employee NIC",
        "It is deductible for corporation tax",
        "It generates relevant UK earnings for pension tax relief",
        "It is subject to a mandatory 15% employer NIC from the first pound",
      ],
      answers: [0, 1, 2],
      explain: "Between the LEL and primary threshold the director gets NI credit without employee NIC. Employer NIC begins only above the £5,000 secondary threshold.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-st",
      prompt: "What is the annual secondary threshold for employer NIC in 2026/27?",
      options: ["£5,000", "£9,100", "£12,570", "£6,708"],
      answer: 0,
      explain: "£5,000 a year (£417 a month) since April 2025.",
    },
    {
      kind: "mcq",
      id: "q-ni-rate",
      prompt: "What is the employer NIC rate in 2026/27?",
      options: ["13.8%", "14%", "15%", "16%"],
      answer: 2,
      explain: "15% from 6 April 2025.",
    },
    {
      kind: "mcq",
      id: "q-div-rate",
      prompt: "What is the basic-rate dividend tax in 2026/27?",
      options: ["8.75%", "10.75%", "20%", "35.75%"],
      answer: 1,
      explain: "Increased by 2 percentage points from 6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-ea-amount",
      prompt: "How much is the Employment Allowance for 2026/27?",
      options: ["£5,000", "£9,000", "£10,500", "£15,000"],
      answer: 2,
      explain: "£10,500 a year.",
    },
    {
      kind: "mcq",
      id: "q-div-deduct",
      prompt: "Why is salary often better than dividends for the first £12,570 despite employer NIC?",
      options: [
        "Dividends are illegal below that amount",
        "Salary is deductible for corporation tax and falls within the personal allowance",
        "Employer NIC is refundable",
        "Dividends carry employee NIC",
      ],
      answer: 1,
      explain: "A deductible cost that falls in the personal allowance is more efficient than a post-tax dividend.",
    },
    {
      kind: "mcq",
      id: "q-sole",
      prompt: "A sole-director company with no other employees pays the director £12,570. Employer NIC (no EA) for the year is…",
      options: ["£0", "£1,135.50", "£1,885.50", "£1,258.50"],
      answer: 1,
      explain: "(£12,570 − £5,000) × 15% = £1,135.50.",
    },
  ],
  sources: [
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "National Insurance rates and categories", url: "https://www.gov.uk/national-insurance-rates-letters" },
    { label: "Employment Allowance", url: "https://www.gov.uk/claim-employment-allowance" },
    { label: "Income Tax rates and allowances (current and past)", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past" },
    { label: "Corporation Tax rates and allowances", url: "https://www.gov.uk/corporation-tax-rates" },
  ],
};
