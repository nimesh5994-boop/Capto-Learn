import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "income-tax-computation",
  title: "The income tax computation, step by step",
  level: "foundation",
  minutes: 40,
  summary:
    "The standard layout every personal tax computation follows: total income, net income, personal allowance (including the taper above £100,000), taxable income, the rate bands for 2026/27, then reducers, charges and tax already paid.",
  objectives: [
    "Lay out an income tax computation in the standard order",
    "Apply the 2026/27 personal allowance, bands and rates for England, Wales and Northern Ireland",
    "Calculate the personal allowance taper for income over £100,000",
    "Explain the effective 60% marginal rate between £100,000 and £125,140",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Every income tax computation follows the same skeleton. Learn it once and you'll be able to deal with any mix of income. This lesson covers **non-savings income** (employment, self-employment, pensions, property). Savings and dividends sit on top and are covered next.`,
    },
    {
      kind: "table",
      caption: "The standard computation layout",
      head: ["Step", "What you do"],
      rows: [
        ["1. Total income", "Add up all taxable income, split into non-savings, savings and dividends"],
        ["2. Less reliefs", "Deduct reliefs such as trading losses and qualifying interest → **net income**"],
        ["3. Less personal allowance", "Normally £12,570, reduced if adjusted net income exceeds £100,000 → **taxable income**"],
        ["4. Apply rates", "Non-savings first, then savings, then dividends, through the bands"],
        ["5. Less tax reducers", "E.g. marriage allowance, property finance cost credit, EIS/VCT relief"],
        ["6. Add extra charges", "E.g. High Income Child Benefit Charge, pension annual allowance charge"],
        ["7. Less tax deducted at source", "PAYE, tax on property income of non-residents, etc. → **tax payable / repayable**"],
      ],
    },
    {
      kind: "table",
      caption: "2026/27 rates and bands (England, Wales and Northern Ireland, non-savings income)",
      head: ["Band", "Taxable income", "Rate"],
      rows: [
        ["Personal allowance", "First £12,570 of income", "0%"],
        ["Basic rate", "£0 – £37,700 of taxable income", "20%"],
        ["Higher rate", "£37,701 – £125,140", "40%"],
        ["Additional rate", "Over £125,140", "45%"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Bands apply to taxable income, not gross income",
      md: `The basic rate band is £37,700 of **taxable income** (after the personal allowance). With a full allowance, the higher rate starts at gross income of £12,570 + £37,700 = **£50,270**. A very common slip is to apply £50,270 to taxable income.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The personal allowance taper (ITA 2007 s35)",
      md: `If **adjusted net income** exceeds **£100,000**, the personal allowance is reduced by **£1 for every £2** of the excess. It's fully lost at **£125,140**.

Adjusted net income = net income, less the gross amount of personal pension contributions paid net (relief at source) and gross Gift Aid donations.`,
    },
    {
      kind: "md",
      md: `### Why £100,000–£125,140 costs 60%

In that range, each extra £1 of income is taxed at 40%, **and** removes 50p of allowance, which then costs 40% too (20p). That's an effective 60% marginal rate (plus NIC for employees and the self-employed). It's why a pension contribution or Gift Aid that brings adjusted net income back down to £100,000 is one of the most valuable bits of planning you can give a client.`,
    },
    {
      kind: "callout",
      tone: "example",
      title: "Taper example",
      md: `Net income £110,000, no pension or Gift Aid. Excess over £100,000 = £10,000, so the allowance is reduced by £5,000 to **£7,570**.

Taxable income £102,430: £37,700 × 20% = £7,540, then £64,730 × 40% = £25,892. **Tax £33,432.**`,
    },
    {
      kind: "md",
      md: `### Which allowance goes where?

The personal allowance is set against **non-savings income first**, then savings, then dividends (it can be allocated in the way that saves most tax, but non-savings first is almost always right). Non-savings income always occupies the bottom of the bands, with savings and dividends stacked above. That ordering matters a great deal in the next lesson.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Scottish taxpayers",
      md: `If the client is a Scottish taxpayer, non-savings income uses the Scottish rates and bands (six bands from 19% to 48% in 2026/27). The personal allowance and taper are the same. There's a dedicated lesson on this.`,
    },
  ],
  scenario: {
    title: "Harriet Osei: employee with a bonus that tips her over £100,000",
    narrative: `Harriet is an IT project manager in Leeds (not a Scottish taxpayer). For 2026/27 her P60 shows salary of £96,000 and a bonus of £18,000, so £114,000 in total. PAYE deducted was £33,900. She has no other income and makes no pension contributions outside her employer's net pay scheme (already deducted before the P60 figure). She asks why she seems to owe more tax.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Total/net income:** £114,000 non-savings.
2. **Adjusted net income:** £114,000 (no relief-at-source pension or Gift Aid).
3. **Personal allowance:** excess over £100,000 = £14,000; reduction £14,000 ÷ 2 = £7,000; PA = £12,570 − £7,000 = **£5,570**.
4. **Taxable income:** £114,000 − £5,570 = **£108,430**.
5. **Tax:** £37,700 × 20% = £7,540; (£108,430 − £37,700) = £70,730 × 40% = £28,292. Total **£35,832**.
6. **Less PAYE:** £35,832 − £33,900 = **£1,932 payable**. Her tax code assumed a full personal allowance; the bonus took her over £100,000 and PAYE never clawed back the lost allowance. That's the shortfall she's noticed.`,
      },
      {
        kind: "table",
        caption: "Harriet's 2026/27 computation",
        head: ["", "£"],
        rows: [
          ["Employment income", "114,000"],
          ["Less personal allowance (tapered)", "(5,570)"],
          ["Taxable income", "108,430"],
          ["37,700 × 20%", "7,540"],
          ["70,730 × 40%", "28,292"],
          ["Income tax liability", "35,832"],
          ["Less PAYE", "(33,900)"],
          ["Payable", "1,932"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Planning point for next year",
        md: `A personal pension contribution of £11,200 net (£14,000 gross) would bring adjusted net income back to £100,000, restore the full allowance and save 60% of the gross contribution. Point her to a financial adviser for the pension itself.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "basic-rate-tax",
      prompt: "Owen has a salary of £45,000 in 2026/27 and no other income. What is his income tax liability?",
      answer: 6486,
      unit: "£",
      explain: "Deduct the full personal allowance, then tax the remainder at 20% because it's within the £37,700 basic rate band.",
      working: "£45,000 − £12,570 = £32,430 taxable.\n£32,430 × 20% = **£6,486**.",
    },
    {
      kind: "numeric",
      id: "tapered-pa",
      prompt: "Lena's adjusted net income for 2026/27 is £116,000. What is her personal allowance?",
      answer: 4570,
      unit: "£",
      explain: "The allowance reduces by £1 for every £2 above £100,000.",
      working: "Excess £16,000 ÷ 2 = £8,000 reduction.\n£12,570 − £8,000 = **£4,570**.",
    },
    {
      kind: "numeric",
      id: "additional-rate",
      prompt: "Marcus is self-employed with trading profits of £130,000 in 2026/27 and no other income or reliefs. What is his income tax liability (ignore NIC)?",
      answer: 44703,
      unit: "£",
      explain: "Income is above £125,140, so there's no personal allowance at all. Tax the whole £130,000 through the bands.",
      working: "Taxable income £130,000 (PA nil).\n£37,700 × 20% = £7,540\n(£125,140 − £37,700) = £87,440 × 40% = £34,976\n(£130,000 − £125,140) = £4,860 × 45% = £2,187\nTotal **£44,703**.",
    },
    {
      kind: "mcq",
      id: "marginal-rate",
      prompt: "A client with no other income earns an extra £1,000 of salary, taking total income from £104,000 to £105,000. How much extra income tax is due?",
      options: ["£400", "£450", "£600", "£200"],
      answer: 2,
      explain: "£1,000 × 40% = £400, plus the allowance falls by £500 which is then taxed at 40% = £200. Total £600 — the 60% effective rate.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-pa",
      prompt: "What is the standard personal allowance for 2026/27?",
      options: ["£12,500", "£12,570", "£13,000", "£12,750"],
      answer: 1,
      explain: "£12,570, frozen at that level.",
    },
    {
      kind: "mcq",
      id: "q-brb",
      prompt: "The basic rate band in 2026/27 is £37,700. At what gross income does someone with a full personal allowance start paying 40%?",
      options: ["£37,700", "£50,000", "£50,270", "£100,000"],
      answer: 2,
      explain: "£12,570 + £37,700 = £50,270.",
    },
    {
      kind: "mcq",
      id: "q-pa-nil",
      prompt: "At what level of adjusted net income is the personal allowance reduced to nil?",
      options: ["£100,000", "£112,570", "£125,140", "£150,000"],
      answer: 2,
      explain: "£100,000 + (£12,570 × 2) = £125,140.",
    },
    {
      kind: "mcq",
      id: "q-ani",
      prompt: "Which of these reduces adjusted net income?",
      options: ["Gross Gift Aid donations", "The personal allowance", "PAYE deducted", "The marriage allowance"],
      answer: 0,
      explain: "ANI = net income less gross Gift Aid and gross relief-at-source pension contributions.",
    },
    {
      kind: "mcq",
      id: "q-order",
      prompt: "In what order is income taxed through the bands?",
      options: ["Dividends, savings, non-savings", "Savings, non-savings, dividends", "Non-savings, savings, dividends", "Whichever order the client chooses"],
      answer: 2,
      explain: "Non-savings income first, then savings, then dividends at the top.",
    },
    {
      kind: "mcq",
      id: "q-additional-threshold",
      prompt: "The 45% additional rate applies to taxable income above:",
      options: ["£100,000", "£125,140", "£150,000", "£112,570"],
      answer: 1,
      explain: "The additional rate threshold is £125,140 of taxable income, aligned with the point where the allowance disappears.",
    },
  ],
  sources: [
    { label: "Income Tax rates and allowances: current and past", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past" },
    { label: "Income Tax rates and Personal Allowances (GOV.UK)", url: "https://www.gov.uk/income-tax-rates" },
    { label: "ITA 2007 s35 – personal allowance and income limit", url: "https://www.legislation.gov.uk/ukpga/2007/3/section/35" },
    { label: "ITA 2007 s23 – the calculation of income tax liability", url: "https://www.legislation.gov.uk/ukpga/2007/3/section/23" },
  ],
};
