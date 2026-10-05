import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "self-employment-trading-income",
  title: "Self-employment: taxable profits, the cash basis and the tax year basis",
  level: "practitioner",
  minutes: 40,
  summary:
    "Turning a sole trader's accounts into taxable trading profit: allowable and disallowable expenses, capital allowances, the £1,000 trading allowance, the cash basis as the default since 2024/25, and how the tax year basis apportions profits for non-March year ends.",
  objectives: [
    "Adjust accounting profit for disallowable expenses and capital allowances",
    "Decide between the trading allowance and actual expenses",
    "Explain the cash basis default and when to elect for accruals",
    "Apportion accounting profits to the tax year under the tax year basis",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "callout",
      tone: "rule",
      title: "The deduction test (ITTOIA 2005 s34)",
      md: `An expense is deductible only if incurred **wholly and exclusively for the purposes of the trade**. Where an expense has an identifiable business part (e.g. a car used 70% for business), the business part can be deducted. Capital expenditure isn't deductible as an expense (except under the cash basis for most equipment) — relief comes through **capital allowances**.`,
    },
    {
      kind: "table",
      caption: "Common adjustments to accounting profit",
      head: ["Item in the accounts", "Treatment"],
      rows: [
        ["Depreciation", "Add back — replaced by capital allowances"],
        ["Client or supplier entertaining", "Add back (staff entertaining is allowable)"],
        ["Private use of car, phone, home", "Add back the private proportion"],
        ["Owner's drawings, own NIC or income tax", "Add back — not an expense of the trade"],
        ["Fines and penalties", "Add back (except, by concession, minor employee parking fines incurred on business)"],
        ["Goods taken for own use", "Add back the selling price (under accruals)"],
        ["Capital allowances (e.g. AIA on a van)", "Deduct"],
      ],
    },
    {
      kind: "md",
      md: `### The trading allowance

Individuals with trading income can deduct a flat **£1,000 trading allowance** instead of actual expenses. If gross trading income is £1,000 or less, it's fully covered and doesn't need to be reported. Use it when actual expenses are lower than £1,000. It can't be used against income from a partnership or from the individual's own close company or employer.`,
    },
    {
      kind: "md",
      md: `### The cash basis is now the default

From **2024/25** the cash basis became the **default** for sole traders and partnerships of individuals, and the old turnover limits were removed. Income is taxed when received and expenses deducted when paid. Under the cash basis most equipment is simply deducted when paid for (cars are the main exception — they still get capital allowances).

A business can **elect out** and use accruals (GAAP) instead. Consider electing out where the business has significant stock or debtors at year end, wants to claim loss relief sideways against other income (more restricted under cash basis), or already prepares accruals accounts for lenders.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The tax year basis (basis period reform)",
      md: `From **2024/25** a sole trader is taxed on the profits **arising in the tax year** (6 April to 5 April). A 31 March year end is treated as equivalent to 5 April. For any other year end, profits of two accounting periods are **apportioned** into the tax year (by days, months or another reasonable basis applied consistently).

2023/24 was the transition year. Transition profits are spread over five years (2023/24 to 2027/28) unless the client elected to accelerate them, so you may still see a fifth of a transition profit on 2026/27 returns.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Late year ends mean estimates",
      md: `A client with a 30 April year end will need the profit for the year to 30 April 2027 to complete the 2026/27 return due 31 January 2028 — often before those accounts are finished. You'll need a **provisional figure** on the return and an amendment later. Many practices are encouraging clients to change to a 31 March year end.`,
    },
    {
      kind: "md",
      md: `### Simplified expenses

Sole traders can use flat rates for some costs: vehicle mileage at 45p/25p per business mile instead of actual motor costs (you can't claim capital allowances on that vehicle then), a flat monthly amount for working from home based on hours, and a flat private-use adjustment for living in business premises. Simple, but compare against actual costs.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Badges of trade",
      md: `Not every activity is a trade. If a client sells one inherited painting, that's a capital disposal; if they buy and sell vintage furniture every weekend, it's trading. HMRC uses the "badges of trade" (profit motive, frequency, how the item was acquired, supplementary work, etc.) — keep notes on file when the call is borderline.`,
    },
  ],
  scenario: {
    title: "Kerry Bennett, mobile dog groomer",
    narrative: `Kerry runs a mobile dog grooming business and prepares accounts to **31 March 2027** (so her accounting year matches the tax year). She has elected out of the cash basis because she sells grooming products and holds stock. Her accounts show net profit of **£38,400** after charging:

- Depreciation: £2,100
- Christmas drinks with her regular product supplier: £450
- Motor expenses for the van: £4,000 (she estimates 30% private use, supported by a mileage log)
- A parking fine: £120

During the year she bought a new grooming van (a commercial vehicle) for £18,000. She claims the annual investment allowance. Because the van has private use, capital allowances are restricted for the private proportion.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Kerry's adjusted trading profit for 2026/27",
        head: ["", "£"],
        rows: [
          ["Net profit per accounts", "38,400"],
          ["Add: depreciation", "2,100"],
          ["Add: supplier entertaining", "450"],
          ["Add: private motor 30% × £4,000", "1,200"],
          ["Add: parking fine", "120"],
          ["Less: AIA on van £18,000 × 70% business use", "(12,600)"],
          ["**Taxable trading profit**", "**29,670**"],
        ],
      },
      {
        kind: "md",
        md: `1. Depreciation and entertaining are always added back.
2. The private proportion of motor costs is disallowed.
3. A sole trader's van with private use is a "private use asset": the AIA is claimed on the full cost but **only the business proportion** is deducted. So £18,000 × 70% = £12,600.
4. Because her year end is 31 March, there's no apportionment: the whole year's profit is 2026/27 profit.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Record the mileage basis",
        md: `Keep Kerry's mileage log summary on the file. The 30% private figure drives both the motor add-back and the capital allowance restriction, and it's the first thing HMRC would question.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "tax-year-basis",
      prompt:
        "Marco, a photographer, has a 30 September year end. Profits are £48,000 for the year to 30 September 2026 and £60,000 for the year to 30 September 2027. Apportioning on a months basis, what is his taxable trading profit for 2026/27?",
      answer: 54000,
      unit: "£",
      explain: "2026/27 runs 6 April 2026 to 5 April 2027. About 6 months fall in each accounting year.",
      working: "6/12 × £48,000 = £24,000 (April–September 2026)\n6/12 × £60,000 = £30,000 (October 2026–March 2027)\nTotal **£54,000**.",
    },
    {
      kind: "numeric",
      id: "trading-allowance",
      prompt:
        "Bea tutors maths in the evenings. In 2026/27 her gross income is £3,200 and her actual expenses are £600. She has a salaried job too. What is the lowest taxable trading profit she can report?",
      answer: 2200,
      unit: "£",
      explain: "Compare actual expenses (£600) with the £1,000 trading allowance and use whichever is higher.",
      working: "Actual: £3,200 − £600 = £2,600.\nTrading allowance: £3,200 − £1,000 = **£2,200** — lower, so use the allowance.",
    },
    {
      kind: "classify",
      id: "allowable-expenses",
      prompt: "A self-employed plumber's accounts include these costs. Classify each for tax.",
      categories: ["Allowable", "Add back (disallowable)", "Partly allowable"],
      items: [
        { text: "Copper pipe and fittings used on jobs", answer: 0 },
        { text: "Depreciation on the van", answer: 1, why: "Replaced by capital allowances." },
        { text: "Mobile phone used 60% for business", answer: 2, why: "Deduct the business proportion." },
        { text: "Lunch with a builder who passes him work", answer: 1, why: "Business entertainment." },
        { text: "His own Class 4 NIC paid during the year", answer: 1, why: "A personal tax, not a trading expense." },
        { text: "Public liability insurance", answer: 0 },
      ],
      explain: "Apply 'wholly and exclusively' to each item, and split mixed-use costs where there's an identifiable business part.",
    },
    {
      kind: "mcq",
      id: "cash-basis-default",
      prompt: "A new sole trader starts in June 2026 and says nothing about accounting basis. Which basis applies?",
      options: ["Accruals, because the cash basis needs an election", "Cash basis, because it's the default from 2024/25", "Cash basis only if turnover is under £150,000", "Whichever HMRC chooses"],
      answer: 1,
      explain: "Since 2024/25 the cash basis is the default for eligible unincorporated businesses with no turnover limit. They elect out to use accruals.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-trading-test",
      prompt: "What is the test for deducting a sole trader's expense?",
      options: ["Wholly, exclusively and necessarily", "Wholly and exclusively for the purposes of the trade", "Reasonable in amount", "Supported by a VAT invoice"],
      answer: 1,
      explain: "ITTOIA 2005 s34: wholly and exclusively. 'Necessarily' is the employment test.",
    },
    {
      kind: "mcq",
      id: "q-31-march",
      prompt: "A sole trader has a 31 March year end. How are profits taxed for 2026/27?",
      options: ["Apportioned between two accounting periods", "The year to 31 March 2027 is treated as the tax year", "The year to 31 March 2026 is taxed", "Only 360 days of profit are taxed"],
      answer: 1,
      explain: "31 March is treated as equivalent to 5 April, so no apportionment is needed.",
    },
    {
      kind: "mcq",
      id: "q-transition",
      prompt: "Over how many years are transition profits from basis period reform spread by default?",
      options: ["2", "4", "5", "7"],
      answer: 2,
      explain: "Five years, 2023/24 to 2027/28, unless the taxpayer elected to accelerate.",
    },
    {
      kind: "mcq",
      id: "q-trading-allowance",
      prompt: "What is the trading allowance?",
      options: ["£500", "£1,000", "£2,000", "£12,570"],
      answer: 1,
      explain: "£1,000 of gross trading income, used instead of actual expenses.",
    },
    {
      kind: "mcq",
      id: "q-elect-out",
      prompt: "Which is a good reason to elect out of the cash basis?",
      options: ["The business has no stock", "The client wants to claim sideways relief for a large trading loss", "The client wants simpler records", "Turnover is under £20,000"],
      answer: 1,
      explain: "Sideways loss relief is restricted under the cash basis. Stock and debtors are other common reasons for accruals.",
    },
  ],
  sources: [
    { label: "ITTOIA 2005 s34 – expenses not wholly and exclusively for trade", url: "https://www.legislation.gov.uk/ukpga/2005/5/section/34" },
    { label: "Changes to reporting income from self-employment and partnerships (basis period reform)", url: "https://www.gov.uk/guidance/changes-to-reporting-income-from-self-employment-and-partnerships" },
    { label: "Cash basis (GOV.UK)", url: "https://www.gov.uk/simpler-income-tax-cash-basis" },
    { label: "Tax-free allowances on property and trading income", url: "https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income" },
    { label: "Simplified expenses if you're self-employed", url: "https://www.gov.uk/simpler-income-tax-simplified-expenses" },
  ],
};
