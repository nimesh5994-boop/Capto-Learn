import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "calculating-paye-and-nic",
  title: "Calculating PAYE and NIC for a pay period",
  level: "foundation",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Checking a payslip by hand: what counts as pay for tax and NIC, applying the tax code and rate bands, working out employee and employer Class 1 NIC with the 2026/27 thresholds, and how pension deductions change each figure.",
  objectives: [
    "Calculate income tax on a monthly or weekly payslip using the exact percentage method",
    "Calculate employee and employer Class 1 NIC for category A using the 2026/27 period thresholds",
    "Explain why NIC is calculated per pay period while tax is cumulative",
    "Show how net pay arrangement, relief at source and salary sacrifice pensions affect tax and NIC",
  ],
  body: [
    {
      kind: "md",
      md: `Payroll software does the arithmetic, but you still need to be able to **check a payslip by hand**. Clients and employees ask "is this right?", software gets set up wrongly (wrong category letter, wrong pension type, a director not flagged), and reviewers expect you to spot a figure that looks off. This lesson walks through the calculation step by step for 2026/27.`,
    },
    {
      kind: "table",
      caption: "2026/27 figures used in this lesson (England, Wales and NI rates; category A)",
      head: ["Item", "Annual", "Monthly", "Weekly"],
      rows: [
        ["Free pay for 1257L (HMRC table method)", "£12,579", "£1,048.26", "£241.92"],
        ["Basic rate band (20%)", "£37,700", "£3,141.67", "£725"],
        ["Higher rate (40%) up to", "£125,140 of taxable pay", "", ""],
        ["Lower earnings limit (LEL)", "£6,708", "£559", "£129"],
        ["Primary threshold (PT): employee NIC 8% above this", "£12,570", "£1,048", "£242"],
        ["Secondary threshold (ST): employer NIC 15% above this", "£5,000", "£417", "£96"],
        ["Upper earnings limit (UEL): employee NIC 2% above this", "£50,270", "£4,189", "£967"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax: the exact percentage method in four steps",
      md: `1. **Gross pay for tax** = pay + taxable allowances − pension contributions under a **net pay arrangement** − payroll giving.
2. **Free pay** for the period (cumulative: free pay *to date*) from the tax code.
3. **Taxable pay** = gross pay for tax − free pay, **rounded down to the whole pound**.
4. Apply **20%** up to the basic rate band for the period (or to date), then **40%**, then **45%**. Deduct tax already paid this year (cumulative codes only).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "NIC: per pay period, not cumulative",
      md: `Class 1 NIC is worked out on the **earnings for that pay period alone**. There's no year-to-date catch-up for ordinary employees, so a bonus month can mean more NIC than spreading the same pay evenly would. (Directors are the exception: they use an annual earnings period, covered in a later lesson.)

For a **category A** employee in 2026/27:
- **Employee (primary)**: 0% up to the PT, **8%** between PT and UEL, **2%** above the UEL.
- **Employer (secondary)**: **15%** on everything above the ST, with no upper limit.
- Earnings between the **LEL and PT** pay no employee NIC but still earn a qualifying year for state pension.`,
    },
    {
      kind: "md",
      md: `### What counts as "earnings"

Tax and NIC don't always agree on what counts:

| Item | Income tax | Class 1 NIC |
|---|---|---|
| Salary, overtime, bonus, commission, holiday pay, SSP, SMP | Yes | Yes |
| Employee pension contribution: **net pay arrangement** (deducted before tax) | Deducted before tax | **Not** deducted: NIC on the full gross |
| Employee pension contribution: **relief at source** (provider claims 20% from HMRC) | **Not** deducted: comes out of net pay | Not deducted |
| **Salary sacrifice** pension (contractual pay reduction) | Pay is lower | Pay is lower: saves employee **and** employer NIC |
| Most benefits in kind (company car, medical insurance) | Taxed via the code or payrolling | Class 1A for the employer, not Class 1 |
| Approved mileage allowance up to the approved rate | No | No |`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Classic errors when checking payslips",
      md: `- **Using the annual personal allowance against one month's pay.** Always convert to the pay period first.
- **Cumulating NIC.** Don't: each period stands alone (except directors).
- **Deducting a relief-at-source pension before tax.** The provider claims the basic rate relief; the payroll deducts the contribution from **net** pay.
- **Forgetting employer NIC is due below the employee threshold.** Employer NIC starts at £417 a month, well below the £1,048 employee threshold.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Rounding",
      md: `Taxable pay is rounded **down** to the whole pound before applying rates. NIC calculated by the exact percentage method is rounded to the nearest penny (0.5p rounds down). The free pay figure (£1,048.26 a month) comes from HMRC's tax table method, which splits the code into blocks of 500 and rounds up to the penny (roughly 12,579 ÷ 12). If your manual answer is a few pence away from the software, check these first.`,
    },
  ],
  scenario: {
    title: "Checking April payslips at Calder Valley Physio Ltd",
    narrative: `**Calder Valley Physio Ltd** in Hebden Bridge pays monthly. The practice manager, Sunita, queries two April 2026 (month 1) payslips:

- **Jade**, a physiotherapist on £36,000 a year (£3,000 a month), code **1257L**, category A, no pension deduction this month (she opted out).
- **Marcus**, clinical lead on £72,000 a year (£6,000 a month), code **1257L**, category A, pays **5%** into the workplace pension under a **net pay arrangement**.

Sunita asks: *"Can you check the tax and NI on these? Marcus's tax looks very high compared with Jade's."*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Jade: tax.** Free pay for month 1 is £1,048.26. Taxable pay = £3,000 − £1,048.26 = £1,951.74, rounded down to **£1,951**. All within the month 1 basic rate band of £3,141.67, so tax = £1,951 × 20% = **£390.20**.

**Jade: NIC.** Employee: (£3,000 − £1,048) × 8% = **£156.16**. Employer: (£3,000 − £417) × 15% = **£387.45**.

**Jade: net pay** = £3,000 − £390.20 − £156.16 = **£2,453.64**.`,
      },
      {
        kind: "md",
        md: `**Marcus: pension.** 5% × £6,000 = £300, deducted **before tax** (net pay arrangement) but **not** before NIC.

**Marcus: tax.** Pay for tax = £6,000 − £300 = £5,700. Taxable pay = £5,700 − £1,048.26 = £4,651.74 → **£4,651**.
- £3,141.67 × 20% = £628.33
- (£4,651 − £3,141.67) = £1,509.33 × 40% = £603.73
- Tax = **£1,232.06**

**Marcus: NIC** (on the full £6,000):
- Employee: (£4,189 − £1,048) × 8% = £251.28, plus (£6,000 − £4,189) × 2% = £36.22 → **£287.50**
- Employer: (£6,000 − £417) × 15% = **£837.45**

**Marcus: net pay** = £6,000 − £300 − £1,232.06 − £287.50 = **£4,180.44**.

So Marcus's tax is high because part of his pay is in the **40% band**. That's correct.`,
      },
      {
        kind: "table",
        caption: "Month 1 summary",
        head: ["", "Jade", "Marcus"],
        rows: [
          ["Gross pay", "£3,000.00", "£6,000.00"],
          ["Pension (net pay arrangement)", "—", "£300.00"],
          ["Income tax", "£390.20", "£1,232.06"],
          ["Employee NIC", "£156.16", "£287.50"],
          ["Net pay", "£2,453.64", "£4,180.44"],
          ["Employer NIC", "£387.45", "£837.45"],
        ],
      },
      {
        kind: "callout",
        tone: "example",
        title: "If Marcus switched to salary sacrifice",
        md: `If the £300 were a salary sacrifice, his contractual pay would be £5,700 for **NIC as well as tax**. Employee NIC would fall by £300 × 2% = £6.00 (he's above the UEL) and employer NIC by £300 × 15% = **£45.00 a month**. Many employers share that saving with staff. Always check the sacrifice doesn't take pay below the National Minimum Wage.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "weekly-tax",
      prompt:
        "A weekly-paid shop assistant earns £400 in week 1 of 2026/27 on code 1257L (category A, no pension). Using weekly free pay of £241.92, how much **income tax** is deducted?",
      answer: 31.6,
      tolerance: 0.01,
      unit: "£",
      explain: "Deduct one week's free pay, round taxable pay down to the whole pound, then apply 20%.",
      working: "£400 − £241.92 = £158.08 → £158 × 20% = **£31.60**",
    },
    {
      kind: "numeric",
      id: "weekly-employee-nic",
      prompt: "Same employee: £400 for the week, category A. How much **employee** Class 1 NIC is due?",
      answer: 12.64,
      tolerance: 0.01,
      unit: "£",
      explain: "Employee NIC is 8% of weekly earnings above the £242 primary threshold.",
      working: "(£400 − £242) × 8% = £158 × 8% = **£12.64**",
    },
    {
      kind: "numeric",
      id: "weekly-employer-nic",
      prompt: "Same employee: £400 for the week, category A. How much **employer** Class 1 NIC is due?",
      answer: 45.6,
      tolerance: 0.01,
      unit: "£",
      explain: "Employer NIC is 15% of weekly earnings above the £96 secondary threshold.",
      working: "(£400 − £96) × 15% = £304 × 15% = **£45.60**",
    },
    {
      kind: "numeric",
      id: "bonus-month-nic",
      prompt:
        "A monthly-paid category A employee (not a director) normally earns £2,500. In June 2026 they receive a £3,000 bonus on top, so June pay is £5,500. What is the **employee** NIC for June?",
      answer: 277.5,
      tolerance: 0.01,
      unit: "£",
      explain:
        "NIC is per pay period: 8% between the monthly PT (£1,048) and UEL (£4,189), and 2% above the UEL. There's no averaging with other months.",
      working: "(£4,189 − £1,048) × 8% = £3,141 × 8% = £251.28\n\n(£5,500 − £4,189) × 2% = £1,311 × 2% = £26.22\n\nTotal **£277.50**",
    },
    {
      kind: "classify",
      id: "pension-effect",
      prompt: "For each type of employee pension contribution, what does it reduce in the payroll?",
      categories: ["Reduces pay for tax only", "Reduces pay for tax and NIC", "Reduces neither (deducted from net pay)"],
      items: [
        { text: "5% contribution to a scheme using a net pay arrangement", answer: 0 },
        { text: "5% contribution to a relief-at-source scheme (e.g. many master trusts)", answer: 2, why: "The provider claims basic rate relief from HMRC; payroll takes it from net pay." },
        { text: "Contractual salary sacrifice of £200 a month into the pension", answer: 1, why: "A genuine sacrifice reduces contractual pay, so both tax and NIC fall." },
      ],
      explain:
        "Net pay arrangements give tax relief through the payroll but not NIC relief. Relief at source gives tax relief through the pension provider. Only salary sacrifice reduces NIC.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-employee-rate",
      prompt: "What is the main rate of employee Class 1 NIC (category A) for 2026/27, between the PT and UEL?",
      options: ["12%", "8%", "2%", "15%"],
      answer: 1,
      explain: "8% between the primary threshold and the upper earnings limit; 2% above.",
    },
    {
      kind: "mcq",
      id: "q-nic-basis",
      prompt: "An ordinary (non-director) employee is paid monthly. How is their NIC worked out?",
      options: [
        "Cumulatively, like tax",
        "Separately for each pay period",
        "Annually at the year end",
        "Quarterly",
      ],
      answer: 1,
      explain: "Class 1 NIC uses the earnings period, normally the pay interval, with no catch-up.",
    },
    {
      kind: "mcq",
      id: "q-monthly-pt",
      prompt: "What is the 2026/27 monthly primary threshold?",
      options: ["£417", "£559", "£1,048", "£4,189"],
      answer: 2,
      explain: "£1,048 a month (£242 a week, £12,570 a year). £417 is the secondary threshold and £559 the LEL.",
    },
    {
      kind: "mcq",
      id: "q-rounding",
      prompt: "Under the exact percentage method, what happens to taxable pay before tax rates are applied?",
      options: ["Rounded to the nearest pound", "Rounded down to the whole pound", "Rounded up to the next pound", "Not rounded"],
      answer: 1,
      explain: "Taxable pay is rounded down to the whole pound.",
    },
    {
      kind: "mcq",
      id: "q-lel-pt",
      prompt: "An employee earns £800 a month (2026/27, category A). Which is true?",
      options: [
        "No NIC at all and no state pension credit",
        "No employee NIC, but they get a qualifying year and the employer pays NIC above £417",
        "Employee NIC at 8% on £800",
        "Employer NIC only above £1,048",
      ],
      answer: 1,
      explain: "£800 is above the LEL (£559) but below the PT (£1,048): no employee NIC, NI credit protected, employer NIC on £383.",
    },
  ],
  sources: [
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "CWG2: Employer further guide to PAYE and NICs 2026 to 2027", url: "https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions" },
    { label: "NIM01001: Class 1 structural overview", url: "https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim01001" },
    { label: "Tax on your private pension contributions: tax relief (GOV.UK)", url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
    { label: "Salary sacrifice for employers (GOV.UK)", url: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  ],
};
