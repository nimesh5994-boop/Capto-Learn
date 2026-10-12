import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "property-income",
  title: "Property income: rental profits, finance costs and joint owners",
  level: "practitioner",
  minutes: 45,
  taxYear: "2026/27",
  summary:
    "Preparing the UK property pages for an individual landlord: allowable expenses versus capital, replacement of domestic items relief, the £1,000 property allowance and rent-a-room, the section 24 restriction on finance costs, the end of the furnished holiday lettings regime from April 2025, joint ownership and losses.",
  objectives: [
    "Calculate a rental profit, separating allowable revenue expenses from capital and private costs",
    "Apply the property allowance and rent-a-room relief where they help",
    "Calculate the basic rate tax reduction for residential finance costs, including its limits",
    "Explain the effect of the FHL abolition and how jointly owned property income is split",
  ],
  body: [
    {
      kind: "md",
      md: `An individual's UK lettings, whether one flat or twenty houses, form a single **UK property business**, reported on the **SA105** pages. Overseas lettings are a separate overseas property business. The profit is worked out broadly like trading profit, with some important differences:
- the **cash basis** is the default for individuals whose property receipts are **£150,000 or less**, unless they elect for accruals,
- **residential finance costs** aren't deducted at all. They get a 20% tax reduction instead (section 24),
- property income isn't "earnings": there's no Class 4 NIC, and it doesn't count as relevant earnings for pension relief.`,
    },
    {
      kind: "table",
      caption: "Common landlord costs",
      head: ["Cost", "Treatment"],
      rows: [
        ["Letting agent and management fees, advertising, tenant referencing", "Deductible"],
        ["Repairs and maintenance, including like-for-like replacement (new boiler, new roof coverings, replacement windows of a modern equivalent)", "Deductible"],
        ["Insurance, ground rent, service charges, council tax and utilities paid by the landlord in void periods", "Deductible"],
        ["Accountancy fees for the rental accounts, legal fees on renewing a short lease", "Deductible"],
        ["Replacing furniture, appliances and kitchenware in a let dwelling", "Deductible under **replacement of domestic items relief** (not the first purchase, and only the cost of a like-for-like item)"],
        ["Improvements: extensions, loft conversions, upgrades beyond like-for-like", "Capital: not deductible, but may reduce a future capital gain"],
        ["Buying the property, legal fees and SDLT on purchase", "Capital"],
        ["Mortgage **capital** repayments", "Not deductible at all"],
        ["Mortgage **interest** and finance arrangement fees on a residential let", "Not deducted. Gives a 20% tax reduction instead (s24)"],
      ],
    },
    {
      kind: "md",
      md: `### Small amounts of property income

- **Property allowance:** an individual with gross property income of **£1,000 or less** in the tax year doesn't need to report it. Above £1,000, they can deduct a flat **£1,000** instead of actual expenses if that's better. It can't be used together with actual expenses, or against rent from their own company or partnership.
- **Rent-a-room relief:** letting furnished accommodation in the individual's **own home** is tax-free up to **£7,500** a year (£3,750 each if the income is shared). Above that, they choose between paying tax on gross rents less £7,500, or on actual profit.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Section 24: the finance cost restriction",
      md: `For individuals letting **residential** property, interest and other finance costs are **not deducted** in working out the profit (ITTOIA 2005 s272A). Instead, the landlord gets a **basic rate (20%) tax reduction** on the **lowest** of (ITTOIA 2005 ss274A–274C; PIM2058):
1. the finance costs for the year, plus any unrelieved amount brought forward,
2. the property profits for the year, after losses brought forward,
3. **adjusted total income** above the personal allowance (net income, excluding savings and dividend income, less allowances).

Any finance costs not relieved because of limits 2 or 3 are **carried forward**. Commercial property lettings aren't restricted: their interest is deducted in full.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Why higher rate landlords feel section 24",
      md: `Because the interest isn't deducted, the full rental profit counts towards **net income**. That can push a landlord into higher rate tax, take their adjusted net income over **£60,000 (High Income Child Benefit Charge)** or **£100,000 (personal allowance taper)**, and the relief they get back is only 20%. Always run the full computation, not just the property pages.`,
    },
    {
      kind: "md",
      md: `### Furnished holiday lettings: abolished from April 2025

The special **furnished holiday lettings (FHL)** regime was abolished from **6 April 2025** for income tax and CGT (1 April 2025 for corporation tax). From 2025/26, former FHLs are simply part of the landlord's UK or overseas property business:
- finance costs are now **restricted** under s24,
- **capital allowances** can't be claimed on new expenditure. Existing pools can continue to be written down, and replacement of domestic items relief is now available,
- FHL profits are no longer **relevant earnings** for pension contributions,
- FHL losses carried forward can be set against future profits of the wider property business,
- CGT trading reliefs (business asset disposal relief, rollover relief) are generally no longer available.

### Joint ownership

- **Spouses and civil partners living together** are taxed **50:50** on jointly held property income, whatever their actual shares. If they own the property in **unequal beneficial shares**, they can elect to be taxed on those actual shares by both signing **Form 17** and sending it to HMRC within 60 days, with evidence of the unequal ownership.
- **Other joint owners** (siblings, unmarried partners, friends) are normally taxed according to their ownership shares, or on a different agreed split of profits.

### Losses

A property loss is carried forward and set against **future profits of the same property business**. It can't normally be set against other income. Losses are lost if the business ceases, unless lettings restart within 3 years.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Look ahead: MTD and higher property rates",
      md: `Gross rents count towards **qualifying income for Making Tax Digital for Income Tax** (more than £50,000 from April 2026, more than £30,000 from April 2027). Budget 2025 also announced separate property income tax rates of **22% / 42% / 47%** from **6 April 2027**. Flag both for landlord clients when planning their 2027/28 position.`,
    },
  ],
  scenario: {
    title: "Gareth's buy-to-let: what does section 24 cost him?",
    narrative: `Gareth lives in Cardiff (not a Scottish taxpayer) and earns a salary of **£42,000**. He owns a buy-to-let flat in his sole name. For 2026/27 (cash basis):
- rent received: **£18,000**
- letting agent fees, insurance, repairs and a gas safety certificate: **£3,600**
- mortgage interest: **£7,200**; mortgage capital repaid: **£4,000**
- a new sofa to replace the old one: **£800**, of which £150 relates to an upgrade to a larger model

He has no other income and no losses brought forward.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Step 1: property profit (finance costs not deducted)",
        head: ["", "£"],
        rows: [
          ["Rent received", "18,000"],
          ["Less: agent fees, insurance, repairs, gas certificate", "(3,600)"],
          ["Less: replacement of domestic items relief (£800 − £150 upgrade)", "(650)"],
          ["Mortgage interest (dealt with as a tax reduction)", "—"],
          ["Mortgage capital (never deductible)", "—"],
          ["**Property profit**", "**13,750**"],
        ],
      },
      {
        kind: "table",
        caption: "Step 2: income tax liability for 2026/27",
        head: ["", "£"],
        rows: [
          ["Employment income", "42,000"],
          ["Property profit", "13,750"],
          ["Net income", "55,750"],
          ["Less: personal allowance", "(12,570)"],
          ["Taxable income", "43,180"],
          ["£37,700 × 20%", "7,540"],
          ["£5,480 × 40%", "2,192"],
          ["Tax before the finance cost reduction", "9,732"],
          ["Less: 20% × lowest of £7,200 interest, £13,750 profit and £43,180 adjusted total income above the personal allowance = 20% × £7,200", "(1,440)"],
          ["**Income tax liability**", "**8,292**"],
        ],
      },
      {
        kind: "md",
        md: `If the interest were fully deductible, his property profit would be £6,550, taxable income £35,980, and all of it within the basic rate band: tax of **£7,196**. So section 24 costs Gareth **£1,096** this year, because £5,480 of his income is now taxed at 40% and the interest only gets 20% relief.

**Planning points to discuss:** a personal pension contribution (relief at source extends his basic rate band), or, if he's married to a lower earner, transferring a beneficial share of the flat (with a Form 17 election if they want an unequal split). That has CGT and SDLT implications, so take advice before acting.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "s24-limit",
      prompt:
        "Maureen is retired with a state and private pension of £6,000 a year. Her residential property profit (before finance costs) for 2026/27 is £9,000, and her mortgage interest is £5,000. She has no other income and nothing brought forward. What is her finance cost tax reduction for 2026/27?",
      answer: 486,
      unit: "£",
      explain:
        "The reduction is 20% of the lowest of the finance costs, the property profits and adjusted total income above the personal allowance. Here the third limit applies, and the unrelieved interest is carried forward.",
      working:
        "Net income £15,000. Adjusted total income above the personal allowance: £15,000 − £12,570 = £2,430. Lowest of £5,000, £9,000 and £2,430 = £2,430. Reduction: 20% × £2,430 = **£486**. Carried forward: £5,000 − £2,430 = £2,570.",
    },
    {
      kind: "numeric",
      id: "property-allowance",
      prompt:
        "Leon lets his driveway to a commuter for £200 a month (£2,400 in 2026/27). His only costs are £300 for resurfacing repairs. He has no other property income. What is his taxable property income if he uses the most beneficial method?",
      answer: 1400,
      unit: "£",
      explain: "Gross property income is over £1,000, so it must be reported. The £1,000 property allowance gives a lower figure than deducting actual expenses of £300.",
      working: "Actual expenses: £2,400 − £300 = £2,100. Property allowance: £2,400 − £1,000 = **£1,400** (better).",
    },
    {
      kind: "classify",
      id: "landlord-costs",
      prompt: "Classify each cost for a residential landlord's 2026/27 property computation.",
      categories: ["Deduct in the profit", "Basic rate tax reduction only", "Not allowable (capital or private)"],
      items: [
        { text: "Replacing a broken boiler with a similar modern model", answer: 0, why: "A repair: like-for-like replacement." },
        { text: "Building a rear extension to add a bedroom", answer: 2, why: "An improvement: capital." },
        { text: "Interest on the buy-to-let mortgage", answer: 1, why: "Section 24 residential finance costs." },
        { text: "Monthly mortgage capital repayments", answer: 2, why: "Repaying a loan is never deductible." },
        { text: "Replacing a worn-out fridge-freezer in the let flat", answer: 0, why: "Replacement of domestic items relief." },
        { text: "Buying furniture to furnish the flat for the first time", answer: 2, why: "Relief covers replacements, not the initial furnishing." },
        { text: "Letting agent's 12% management fee", answer: 0 },
      ],
      explain: "Revenue costs of the letting are deducted. Residential finance costs get a 20% tax reduction. Capital improvements, initial furnishings and loan repayments get no income tax relief.",
    },
    {
      kind: "mcq",
      id: "joint-owners",
      prompt:
        "Mr and Mrs Okafor, a married couple living together, own a rental property as tenants in common, 80% Mrs Okafor and 20% Mr Okafor. They've never contacted HMRC about it. How is the 2026/27 rental profit taxed?",
      options: ["80:20, because that's the legal ownership", "50:50, unless they make a Form 17 declaration", "100% to Mrs Okafor", "Whatever split they choose each year"],
      answer: 1,
      explain:
        "Spouses and civil partners living together are taxed 50:50 on jointly held property unless they both sign a Form 17 declaration of their actual (unequal) beneficial interests. It takes effect from the date of the declaration, not retrospectively.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-s24-rate",
      prompt: "At what rate is tax relief given for residential mortgage interest paid by an individual landlord?",
      options: ["At the landlord's marginal rate", "20%", "40%", "No relief at all"],
      answer: 1,
      explain: "Residential finance costs give a basic rate (20%) tax reduction, subject to the three limits.",
    },
    {
      kind: "mcq",
      id: "q-fhl",
      prompt: "From when was the furnished holiday lettings regime abolished for income tax?",
      options: ["6 April 2024", "6 April 2025", "6 April 2026", "It hasn't been abolished"],
      answer: 1,
      explain: "The FHL regime ended from 6 April 2025 for income tax and CGT, and 1 April 2025 for corporation tax.",
    },
    {
      kind: "mcq",
      id: "q-allowance",
      prompt: "A landlord has gross rents of £12,000 and actual expenses of £2,500. Can she use the £1,000 property allowance and also deduct the expenses?",
      options: ["Yes, both", "No: it's the allowance or actual expenses, not both", "Only if the expenses are under £1,000", "Only for furnished lettings"],
      answer: 1,
      explain: "The property allowance replaces actual expenses. Here actual expenses (£2,500) are better.",
    },
    {
      kind: "mcq",
      id: "q-loss",
      prompt: "How can an individual normally use a UK property business loss?",
      options: [
        "Against any income of the same year",
        "Carried forward against future profits of the same property business",
        "Carried back three years",
        "Against capital gains",
      ],
      answer: 1,
      explain: "Property losses are carried forward against future profits of the same property business. They generally can't be set against other income.",
    },
    {
      kind: "mcq",
      id: "q-rent-a-room",
      prompt: "A homeowner lets a furnished room to a lodger for £6,800 a year. What's the tax position?",
      options: ["Taxable in full", "Tax-free under rent-a-room relief, and no need to report", "Only £1,000 is tax-free", "Taxable as trading income"],
      answer: 1,
      explain: "Rent-a-room relief exempts up to £7,500 a year from letting furnished accommodation in the person's own home. Below the limit, no return entry is needed.",
    },
    {
      kind: "mcq",
      id: "q-cash-basis",
      prompt: "What is the default basis for an individual landlord with property receipts of £80,000?",
      options: ["Accruals", "Cash basis, unless they elect for accruals", "Whichever gives the lower profit", "The basis used by their letting agent"],
      answer: 1,
      explain: "The cash basis is the default for individuals with property receipts of £150,000 or less. They can elect to use accruals.",
    },
  ],
  sources: [
    { label: "Income Tax when you rent out a property: working out your rental income", url: "https://www.gov.uk/guidance/income-tax-when-you-rent-out-a-property-working-out-your-rental-income" },
    { label: "PIM2058 – residential finance costs: basic rate tax reduction", url: "https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim2058" },
    { label: "PIM1092 – cash basis for landlords", url: "https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1092" },
    { label: "Abolition of the furnished holiday lettings tax regime", url: "https://www.gov.uk/government/publications/furnished-holiday-lettings-tax-regime-abolition/abolition-of-the-furnished-holiday-lettings-tax-regime" },
    { label: "Tax-free allowances on property and trading income", url: "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income" },
    { label: "Rent a room in your home: the Rent a Room Scheme", url: "https://www.gov.uk/rent-room-in-your-home/the-rent-a-room-scheme" },
  ],
};
