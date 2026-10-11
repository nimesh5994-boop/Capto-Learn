import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "computing-taxable-trading-profit",
  title: "From accounts profit to taxable total profits",
  level: "foundation",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "The core CT computation: start with profit before tax, add back disallowable expenses, take out non-trading income and capital items, deduct capital allowances, then build up taxable total profits with other income, gains and qualifying charitable donations.",
  objectives: [
    "Adjust accounts profit for the common disallowable items and non-trading income",
    "Distinguish capital from revenue expenditure and general from specific provisions",
    "Apply the rules for unpaid remuneration, pension contributions, gifts and entertaining",
    "Lay out a taxable total profits computation and calculate the corporation tax",
  ],
  body: [
    {
      kind: "md",
      md: `The corporation tax computation always starts with the **profit before tax in the accounts** and adjusts it to **trading profit**, the figure tax law recognises. Then the other types of profit are added to reach **taxable total profits (TTP)**, the figure the CT rates apply to. Follow the same layout every time: reviewers can then see at a glance what you've done.`,
    },
    {
      kind: "table",
      caption: "The layout of a CT computation",
      head: ["Step", "Line"],
      rows: [
        ["1", "Profit before tax per the accounts"],
        ["2", "**Add back** expenses that aren't deductible for trading purposes"],
        ["3", "**Deduct** income that isn't trading income (taxed elsewhere) and trading deductions not in the accounts"],
        ["4", "= Adjusted trading profit before capital allowances"],
        ["5", "**Less** capital allowances (and add any balancing charges)"],
        ["6", "= **Trading profit** (or loss)"],
        ["7", "**Add** property income, non-trading loan relationship credits, chargeable gains, other income"],
        ["8", "**Less** losses relieved against total profits, and **qualifying charitable donations**"],
        ["9", "= **Taxable total profits**"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The tests for a deduction",
      md: `An expense is deductible from trading profits only if it is:
1. **Revenue**, not capital (CTA 2009 s53). Capital costs get capital allowances or relief under the intangibles regime instead.
2. Incurred **wholly and exclusively** for the purposes of the trade (CTA 2009 s54).
3. Not specifically **disallowed** by statute (e.g. business entertainment, s1298).

Accounts prepared under UK GAAP are the starting point (s46): tax follows the accounting treatment unless a rule overrides it.`,
    },
    {
      kind: "table",
      caption: "Common adjustments",
      head: ["Item in the accounts", "Adjustment", "Why"],
      rows: [
        ["Depreciation and loss on disposal of fixed assets", "Add back", "Capital: replaced by capital allowances"],
        ["Profit on disposal of fixed assets", "Deduct", "Dealt with in capital allowances (or as a gain)"],
        ["Entertaining clients, suppliers or other non-employees", "Add back", "Statutory disallowance (s1298)"],
        ["Staff entertainment (party, team meals)", "No adjustment", "Allowable; possible benefit for employees"],
        ["Gifts to customers: food, drink, tobacco or vouchers, or over £50 a person a year", "Add back", "Treated as entertaining"],
        ["Gifts carrying a conspicuous business advert, ≤ £50 a person a year, not food/drink/tobacco/vouchers", "No adjustment", "Specific exception"],
        ["Fines and penalties (company's own, including HMRC penalties and late payment interest on tax)", "Add back", "Not incurred for the trade / specifically disallowed"],
        ["Political donations", "Add back", "Not for the trade"],
        ["Charitable donations", "Add back; deduct as a qualifying charitable donation from total profits", "Relieved separately"],
        ["Legal fees on buying a capital asset or a new lease", "Add back", "Capital"],
        ["Legal fees on debt recovery, renewing a short lease, employment disputes", "No adjustment", "Revenue, for the trade"],
        ["Increase in a **general** bad debt or warranty provision", "Add back", "Not an estimate of a specific liability"],
        ["Increase in a **specific** provision that meets FRS 102 section 21", "No adjustment", "Follows GAAP"],
        ["Bank interest, rental income or dividends received", "Deduct", "Taxed as loan relationships or property income; dividends usually exempt"],
        ["Interest paid on a loan used for the trade", "No adjustment", "Trading loan relationship debit"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Timing rules that catch people out",
      md: `- **Directors' bonuses and other remuneration** accrued in the accounts are deductible in that period only if **paid within 9 months** of the period end (CTA 2009 s1288). Otherwise they're deductible in the period they're paid.
- **Employer pension contributions** are deductible when **paid**, not when accrued. Add back an accrual and deduct it when paid. Very large increases can be spread over up to 4 years.
- **Pre-trading expenses** incurred in the **7 years** before trade starts are treated as incurred on the first day of trading, if they'd have been allowable then.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Private use is not added back for a company",
      md: `A sole trader's private use is disallowed. A company's isn't: if the company pays for a director's car, phone or private medical cover, the cost is **deductible for the company** and taxed on the director as a **benefit in kind** (with Class 1A NIC). Don't add it back. The exception is a payment that's really a distribution (e.g. a shareholder's private bill with no employment link), which may be added back and treated as a dividend.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Use the trial balance codes",
      md: `Set up separate nominal codes for client entertainment, staff entertainment, fines, donations and legal fees. At year end the add-backs then come straight from the trial balance instead of a trawl through the ledger.`,
    },
  ],
  scenario: {
    title: "The first CT computation for Hollins Engineering Ltd",
    narrative: `**Hollins Engineering Ltd** (Huddersfield) makes precision parts. It has no associated companies. Its accounts for the year to **31 March 2027** show profit before tax of **£186,400** after charging or crediting:

| Item | Amount |
|---|---:|
| Depreciation | £42,000 |
| Client entertaining (hospitality at a trade show) | £3,800 |
| Staff Christmas party (£120 a head) | £2,400 |
| VAT late payment penalty | £650 |
| Donation to a local hospice (a registered charity) | £1,000 |
| Legal fees on buying the freehold of the factory | £4,500 |
| Increase in general bad debt provision | £1,500 |
| Profit on sale of a van | (£2,200) |
| Bank interest received | (£1,300) |

Capital allowances for the year have been computed at **£58,000**.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Adjusted trading profit",
        head: ["", "£"],
        rows: [
          ["Profit before tax per accounts", "186,400"],
          ["Add: depreciation", "42,000"],
          ["Add: client entertaining", "3,800"],
          ["Add: VAT penalty", "650"],
          ["Add: charitable donation", "1,000"],
          ["Add: legal fees on freehold (capital)", "4,500"],
          ["Add: general provision increase", "1,500"],
          ["Less: profit on sale of van", "(2,200)"],
          ["Less: bank interest (non-trading)", "(1,300)"],
          ["Adjusted profit before capital allowances", "236,350"],
          ["Less: capital allowances", "(58,000)"],
          ["**Trading profit**", "**178,350**"],
        ],
      },
      {
        kind: "md",
        md: `The staff party isn't adjusted: staff entertainment is allowable (and at £120 a head it's within the £150 exemption for the employees).

**Taxable total profits**: trading profit £178,350 + non-trading loan relationship credit (bank interest) £1,300 − qualifying charitable donation £1,000 = **£178,650**.

**Corporation tax (FY2026):** TTP is between £50,000 and £250,000, so marginal relief applies.
- 25% × £178,650 = £44,662.50
- Marginal relief: 3/200 × (£250,000 − £178,650) = 1.5% × £71,350 = £1,070.25
- **CT payable: £43,592.25**, due 1 January 2028 (9 months and 1 day after the year end).`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "adjust-or-not",
      prompt: "For a trading company, how is each item in the profit and loss account treated in the CT computation?",
      categories: ["Add back", "Deduct", "No adjustment"],
      items: [
        { text: "Depreciation on office equipment", answer: 0 },
        { text: "Dividend received from an unconnected UK company", answer: 1, why: "Not trading income; usually exempt from CT." },
        { text: "Private medical insurance for the managing director", answer: 2, why: "Deductible for the company; taxed on the director as a benefit." },
        { text: "Hampers of wine sent to 30 customers at Christmas", answer: 0, why: "Gifts of food or drink are treated as entertaining." },
        { text: "Branded diaries costing £12 each given to customers", answer: 2, why: "Under £50, carries an advert, not food/drink/tobacco/vouchers." },
        { text: "Parking fine incurred by the company itself", answer: 0 },
        { text: "Interest on a bank loan used to buy machinery for the trade", answer: 2 },
        { text: "Profit on sale of a delivery van", answer: 1 },
      ],
      explain:
        "Capital items, entertaining, fines and non-trade payments are added back. Non-trading income and accounting profits on disposals are deducted. Expenses with a private element are allowable for a company because they're taxed on the employee instead.",
    },
    {
      kind: "numeric",
      id: "adjusted-profit",
      prompt:
        "A company's profit before tax is £94,000. It includes depreciation £18,500, a £3,000 director's bonus accrued at the year end and paid 11 months later, client lunches £1,200, a £2,500 increase in a specific warranty provision (FRS 102 compliant), and rental income of £9,000. Capital allowances are £21,000. What is the **trading profit**?",
      answer: 86700,
      unit: "£",
      explain:
        "Add back depreciation, the bonus (paid more than 9 months after the period end) and client entertaining. The specific provision follows GAAP. Remove the rental income (property income), then deduct capital allowances.",
      working:
        "£94,000 + £18,500 + £3,000 + £1,200 − £9,000 = £107,700\n\n£107,700 − £21,000 capital allowances = **£86,700**",
    },
    {
      kind: "numeric",
      id: "ttp",
      prompt:
        "A company has trading profit of £142,000, property income of £12,000, bank interest received of £800 and a chargeable gain of £15,000. It paid £2,500 to a registered charity. What are its taxable total profits?",
      answer: 167300,
      unit: "£",
      explain: "Add the other sources of profit to trading profit, then deduct qualifying charitable donations.",
      working: "£142,000 + £12,000 + £800 + £15,000 = £169,800 − £2,500 = **£167,300**",
    },
    {
      kind: "mcq",
      id: "bonus-timing",
      prompt:
        "A company with a 31 December 2026 year end accrues a £20,000 director's bonus. When is it deductible if it's paid on 15 September 2027?",
      options: [
        "In the year to 31 December 2026, because it was paid within 9 months",
        "In the year to 31 December 2027, when it's paid",
        "Never: directors' bonuses are disallowable",
        "Half in each year",
      ],
      answer: 0,
      explain: "15 September 2027 is within 9 months of 31 December 2026 (the deadline is 30 September 2027), so the accrual is deductible in 2026.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-starting-point",
      prompt: "What is the starting point of a CT computation?",
      options: ["Turnover", "Profit before tax per the accounts", "Taxable total profits", "Gross profit"],
      answer: 1,
      explain: "Start with profit before tax and adjust it.",
    },
    {
      kind: "mcq",
      id: "q-entertaining",
      prompt: "A company spends £2,000 on a summer party for its staff (no guests). For CT this is:",
      options: ["Disallowable entertaining", "Allowable", "Allowable only up to £150 a head", "Relieved as a charitable donation"],
      answer: 1,
      explain: "Staff entertainment is deductible. The £150 limit is the employees' benefit-in-kind exemption, not a CT restriction.",
    },
    {
      kind: "mcq",
      id: "q-pension",
      prompt: "When are employer pension contributions deductible?",
      options: ["When accrued in the accounts", "When paid", "Only on the employee's retirement", "Never for directors"],
      answer: 1,
      explain: "Pension contributions are deductible in the period in which they're paid.",
    },
    {
      kind: "mcq",
      id: "q-qcd",
      prompt: "How is a cash donation to a registered charity relieved?",
      options: [
        "As a trading expense",
        "Added back, then deducted from total profits as a qualifying charitable donation",
        "It gets no relief",
        "Through the director's Self Assessment",
      ],
      answer: 1,
      explain: "QCDs are deducted from total profits, not trading profit.",
    },
    {
      kind: "mcq",
      id: "q-general-provision",
      prompt: "An increase in a general bad debt provision (a percentage of all debtors) is:",
      options: ["Deductible", "Added back", "Taxed as income", "Relieved as a capital loss"],
      answer: 1,
      explain: "Only specific provisions that meet the accounting standard are deductible.",
    },
    {
      kind: "mcq",
      id: "q-pre-trading",
      prompt: "Pre-trading expenditure is deductible if incurred within how many years before trade starts?",
      options: ["3", "5", "7", "There is no limit"],
      answer: 2,
      explain: "Expenses in the 7 years before trading starts are treated as incurred on the first day of trading.",
    },
  ],
  sources: [
    { label: "CTA 2009 s54: expenses not wholly and exclusively for the trade", url: "https://www.legislation.gov.uk/ukpga/2009/4/section/54" },
    { label: "CTA 2009 s1288: unpaid remuneration", url: "https://www.legislation.gov.uk/ukpga/2009/4/section/1288" },
    { label: "BIM45000: Business entertainment and gifts", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim45000" },
    { label: "BIM35000: Capital/revenue divide (contents)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim35000" },
    
    { label: "Marginal Relief for Corporation Tax (GOV.UK)", url: "https://www.gov.uk/guidance/corporation-tax-marginal-relief" },
  ],
};
