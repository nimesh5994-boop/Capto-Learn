import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "benefits-in-kind-p11d-and-class-1a",
  title: "Benefits in kind, P11D, Class 1A and payrolling benefits",
  level: "advanced",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "Valuing the common taxable benefits (company cars and fuel, vans, beneficial loans, medical insurance), the main exemptions, filing P11Ds and the P11D(b), paying Class 1A at 15%, and the move to mandatory payrolling of benefits from April 2027.",
  objectives: [
    "Calculate the cash equivalent of a company car, car fuel, van and beneficial loan for 2026/27",
    "Identify common exempt benefits, including trivial benefits and the annual staff function",
    "Prepare the P11D(b) Class 1A figure and know the 6 July and 22 July deadlines",
    "Explain voluntary payrolling and the phased mandatory payrolling timetable from April 2027",
  ],
  body: [
    {
      kind: "md",
      md: `When an employer provides something other than cash (a car, health insurance, an interest-free loan), the employee is taxed on its **cash equivalent** under the "benefits code" in ITEPA 2003, and the employer pays **Class 1A NIC** on it. For most benefits that's reported after the year end on a **P11D** per employee and a **P11D(b)** summary, unless the employer **payrolls** the benefit, taxing it through the payroll during the year.`,
    },
    {
      kind: "table",
      caption: "2026/27 figures for the common benefits",
      head: ["Benefit", "Cash equivalent", "2026/27 figure"],
      rows: [
        ["Company car", "List price (incl. accessories) × appropriate percentage, less capital contributions (max £5,000) and payments for private use", "Zero-emission: 4%; maximum 37%"],
        ["Car fuel for private use", "Car fuel benefit multiplier × the car's appropriate percentage", "Multiplier £29,200"],
        ["Company van (private use beyond commuting/insignificant)", "Flat rate", "£4,170 (nil for zero-emission vans)"],
        ["Van fuel", "Flat rate", "£798"],
        ["Beneficial (cheap or interest-free) loan", "Interest at the official rate less interest actually paid; exempt if all loans ≤ £10,000 throughout the year", "Official rate 3.75%"],
        ["Private medical insurance", "Cost to the employer", "—"],
        ["Living accommodation", "Annual value plus additional charge for expensive properties; less rent paid", "—"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The appropriate percentage",
      md: `It depends on CO₂ emissions (and, for 1–50g/km cars, electric range). For 2026/27: **zero-emission cars 4%**; plug-in hybrids from **4% to 16%** depending on electric range; cars over 50g/km from 17% upwards, reaching the **37% maximum** at the top of HMRC's table. **Diesel cars** that don't meet the RDE2 standard add a **4% supplement**, still capped at 37%. Always look the car up in HMRC's appropriate percentage table (480 Appendix 2) using its CO₂ figure from the V5C.

Time-apportion if the car is only available for part of the year, and deduct days when it's unavailable for 30 days or more.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Fuel benefit is all or nothing",
      md: `If the employer pays for **any** private fuel for a company car, the **full** fuel benefit applies, unless the employee **reimburses all** private fuel (by 6 July after the year end). Paying back "most" of it doesn't reduce the charge. For many employees the fuel benefit costs more in tax than the fuel is worth.`,
    },
    {
      kind: "md",
      md: `### Exempt benefits (no P11D, no Class 1A)

- **Trivial benefits**: costing **£50 or less** each, not cash or a cash voucher, not a reward for work and not contractual. Directors of close companies (and their family) are capped at **£300** a tax year.
- **Annual staff function** (Christmas party, summer event) open to all staff, costing **£150 per head or less** in total for the year.
- **One mobile phone** per employee, provided by the employer.
- **Workplace parking**, **workplace charging** of electric vehicles, and **pension advice** up to £500.
- **Employer contributions to registered pension schemes**.
- Business travel and other expenses covered by the expenses exemption (see the next lesson).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "P11D, P11D(b) and Class 1A deadlines",
      md: `- **P11D** for each employee with reportable benefits not payrolled, and **P11D(b)** declaring total Class 1A: online by **6 July** after the tax year. Give employees a copy of their P11D by the same date.
- **Class 1A NIC** at **15%** on the total cash equivalent of benefits: pay by **22 July** (19 July by cheque).
- A P11D(b) is still needed for **payrolled benefits** (for the Class 1A), even if no P11Ds are.
- Late P11D(b): penalty of **£100 per 50 employees** for each month or part month late.`,
    },
    {
      kind: "md",
      md: `### Payrolling benefits

**Payrolling** means adding the cash equivalent of a benefit to taxable pay through the year (dividing the annual value over the paydays), so the employee pays the tax in real time and no P11D is needed for that benefit.

- **Now (voluntary):** employers register online **before the start of the tax year** they want to payroll. Registration for benefits not yet mandated opens from **November 2026** for 2027/28.
- **From 6 April 2027 (mandatory, phase 1):** company **cars**, **car fuel**, **vans**, **van fuel** and **medical benefits** must be payrolled, with Income Tax and Class 1A NIC worked out in real time through payroll software.
- **From 6 April 2028:** most remaining benefits become mandatory too.
- **Employer-provided loans and living accommodation** stay on end-of-year reporting until HMRC confirms otherwise.

HMRC has said there will be a temporary **easement from penalties** for non-deliberate inaccuracies in the first year. Late filing and late payment penalties still apply.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Getting clients ready for April 2027",
      md: `Ask every client with company cars, vans or medical insurance now: which software do they use, does it support payrolling with real-time Class 1A, and who holds the car data (list price, CO₂, dates, contributions)? Explain to employees that from April 2027 the tax on these benefits comes off their pay in the year they get the benefit. HMRC asks employers not to describe this as "double taxation": any earlier-year code adjustments should fall away.`,
    },
  ],
  scenario: {
    title: "The 2026/27 P11D for the director of Ashby Logistics Ltd",
    narrative: `**Ashby Logistics Ltd** doesn't payroll benefits. Its managing director, **Karen Ashby**, had these benefits in 2026/27:

- From 6 April 2026 to 5 October 2026: a **petrol car** with list price **£38,000** and CO₂ of **172g/km** (appropriate percentage **37%**). The company paid for **all fuel, including private**.
- From 6 October 2026: a new **electric car** (0g/km), list price **£52,000**, towards which Karen paid a **£3,000** capital contribution. No fuel benefit (workplace charging only).
- **Private medical insurance** for her family, costing the company **£1,450**.
- An **interest-free loan** of **£24,000** outstanding all year (no interest paid).
- A £45 hamper at Christmas and a £40 bouquet on her birthday.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Petrol car (6 months).** £38,000 × 37% × 6/12 = **£7,030.00**.

**Fuel for the petrol car (6 months).** £29,200 × 37% × 6/12 = **£5,402.00**. The fuel benefit ends when the petrol car goes; there's no fuel benefit on the electric car (charging at work is exempt).

**Electric car (6 months).** (£52,000 − £3,000) × 4% × 6/12 = **£980.00**.

**Medical insurance.** Cost to the employer: **£1,450.00**.

**Loan.** Over £10,000, so taxable: £24,000 × 3.75% = **£900.00**.

**Hamper and bouquet.** Each is £50 or less, not cash, not a reward: trivial benefits. Karen is a director of a close company, so they count towards her £300 annual cap (£85 used). **Exempt.**`,
      },
      {
        kind: "table",
        caption: "Karen's P11D and the Class 1A",
        head: ["Benefit", "Cash equivalent"],
        rows: [
          ["Petrol car (6 months)", "£7,030.00"],
          ["Car fuel (6 months)", "£5,402.00"],
          ["Electric car (6 months)", "£980.00"],
          ["Medical insurance", "£1,450.00"],
          ["Beneficial loan", "£900.00"],
          ["**Total**", "**£15,762.00**"],
          ["Class 1A at 15%", "**£2,364.30**"],
        ],
      },
      {
        kind: "md",
        md: `File the P11D and P11D(b) by **6 July 2027**, give Karen her copy, and make sure the company pays **£2,364.30** Class 1A by **22 July 2027** (with any other employees' Class 1A). Then flag for 2027/28: the electric car and the medical insurance **must be payrolled from 6 April 2027**; the loan stays on a P11D.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "ev-benefit",
      prompt:
        "An employee has a zero-emission company car all year in 2026/27. List price £46,500; they made a capital contribution of £6,000. What is the car benefit?",
      answer: 1660,
      unit: "£",
      explain: "Capital contributions reduce the list price, but only up to £5,000. The appropriate percentage for a zero-emission car is 4%.",
      working: "(£46,500 − £5,000 cap) × 4% = £41,500 × 4% = **£1,660**",
    },
    {
      kind: "numeric",
      id: "car-and-fuel-part-year",
      prompt:
        "A company car with an appropriate percentage of 37% and list price £40,000 is first made available on 6 October 2026. The employer pays for all private fuel. What is the **total** car and fuel benefit for 2026/27? (Use months: 6 of 12.)",
      answer: 12802,
      unit: "£",
      explain: "Both the car and fuel benefits are time-apportioned for the period the car was available.",
      working: "Car: £40,000 × 37% × 6/12 = £7,400\n\nFuel: £29,200 × 37% × 6/12 = £5,402\n\nTotal **£12,802**",
    },
    {
      kind: "numeric",
      id: "loan-benefit",
      prompt:
        "An employee has a £30,000 loan from their employer outstanding throughout 2026/27, on which they pay interest of £300 for the year. Using the official rate of 3.75%, what is the taxable benefit?",
      answer: 825,
      unit: "£",
      explain: "The benefit is interest at the official rate less the interest actually paid.",
      working: "£30,000 × 3.75% = £1,125 − £300 paid = **£825**",
    },
    {
      kind: "journal",
      id: "accrue-class-1a",
      prompt:
        "At its 31 March 2027 year end a company estimates Class 1A NIC of £3,600 on its 2026/27 benefits, payable in July. Post the accrual.",
      accounts: [
        "Employer's NIC – Class 1A (expense)",
        "PAYE/NIC control (HMRC)",
        "Director's loan account",
        "Gross wages",
        "Bank",
        "Prepayments",
      ],
      answer: [
        { account: "Employer's NIC – Class 1A (expense)", dr: 3600 },
        { account: "PAYE/NIC control (HMRC)", cr: 3600 },
      ],
      explain:
        "Class 1A is an employer cost for the year the benefits were provided, so accrue it as an expense with a liability to HMRC. It's deductible for corporation tax as a staff cost.",
    },
    {
      kind: "classify",
      id: "payrolling-phase",
      prompt: "When does payrolling become mandatory for each benefit?",
      categories: ["From 6 April 2027", "From 6 April 2028", "Not yet fixed (stays on year-end reporting)"],
      items: [
        { text: "Company car", answer: 0 },
        { text: "Private medical insurance", answer: 0 },
        { text: "Interest-free loan", answer: 2 },
        { text: "Van fuel", answer: 0 },
        { text: "Employer-provided living accommodation", answer: 2 },
        { text: "Gym membership paid by the employer", answer: 1 },
      ],
      explain:
        "Phase 1 (April 2027) covers cars, car fuel, vans, van fuel and medical benefits. Most other benefits follow in April 2028. Loans and accommodation remain on existing year-end processes until confirmed.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-class1a-rate",
      prompt: "What is the Class 1A NIC rate for 2026/27?",
      options: ["13.8%", "15%", "8%", "20%"],
      answer: 1,
      explain: "Class 1A is 15% from April 2025 onwards.",
    },
    {
      kind: "mcq",
      id: "q-p11d-date",
      prompt: "By when must 2026/27 P11Ds and the P11D(b) be submitted?",
      options: ["31 May 2027", "6 July 2027", "22 July 2027", "31 January 2028"],
      answer: 1,
      explain: "6 July after the tax year. Class 1A is paid by 22 July.",
    },
    {
      kind: "mcq",
      id: "q-fuel-multiplier",
      prompt: "What is the car fuel benefit multiplier for 2026/27?",
      options: ["£27,800", "£28,200", "£29,200", "£4,170"],
      answer: 2,
      explain: "£29,200. £4,170 is the van benefit.",
    },
    {
      kind: "mcq",
      id: "q-trivial",
      prompt: "Which of these is a trivial benefit?",
      options: [
        "A £40 bottle of wine at Christmas",
        "A £50 cash bonus",
        "A £30 voucher for hitting a sales target",
        "A £75 hamper",
      ],
      answer: 0,
      explain: "Trivial benefits must cost £50 or less, not be cash or cash vouchers, and not be a reward for work.",
    },
    {
      kind: "mcq",
      id: "q-ev-percent",
      prompt: "What is the appropriate percentage for a zero-emission company car in 2026/27?",
      options: ["2%", "3%", "4%", "5%"],
      answer: 2,
      explain: "4% for 2026/27.",
    },
    {
      kind: "mcq",
      id: "q-mandatory-start",
      prompt: "From when must company cars and medical benefits be payrolled?",
      options: ["6 April 2026", "6 April 2027", "6 April 2028", "Payrolling is voluntary only"],
      answer: 1,
      explain: "Phase 1 of mandatory payrolling starts on 6 April 2027.",
    },
  ],
  sources: [
    { label: "Expenses and benefits: deadlines (GOV.UK)", url: "https://www.gov.uk/employer-reporting-expenses-benefits/deadlines" },
    { label: "Company car benefit: the appropriate percentage (480 Appendix 2)", url: "https://www.gov.uk/guidance/company-car-benefit-the-appropriate-percentage-480-appendix-2" },
    { label: "Van benefit charge and fuel benefit charges for 2026 to 2027", url: "https://www.gov.uk/government/publications/increase-to-van-benefit-charge-and-fuel-benefit-charges-for-cars-and-vans/van-benefit-charge-and-fuel-benefit-charges-for-cars-and-vans-for-tax-year-2026-to-2027" },
    { label: "Beneficial loan arrangements: HMRC official rates", url: "https://www.gov.uk/government/publications/rates-and-allowances-beneficial-loan-arrangements-hmrc-official-rates/beneficial-loan-arrangements-hmrc-official-rates" },
    { label: "Mandatory reporting of benefits in kind in RTI from April 2027", url: "https://www.gov.uk/government/publications/changes-to-reporting-of-benefits-in-kind-from-april-2027/mandatory-reporting-of-benefits-in-kind-in-real-time-information-rti-from-april-2027" },
    { label: "Expenses and benefits: trivial benefits (GOV.UK)", url: "https://www.gov.uk/expenses-and-benefits-trivial-benefits" },
  ],
};
