import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "sole-trader-and-partnership-year-end",
  title: "Sole trader and partnership year ends and tax adjustments",
  level: "practitioner",
  minutes: 45,
  summary:
    "Preparing year-end accounts for unincorporated businesses: capital and drawings, the tax adjustments from accounts profit to taxable profit (private use, depreciation, disallowables, capital allowances), the tax year basis since 2024/25, the cash basis default, partnership profit allocation, and MTD for Income Tax.",
  objectives: [
    "Prepare a capital account and keep drawings and personal items out of the profit and loss account",
    "Adjust an accounts profit to taxable trading profit, including private use restrictions and capital allowances",
    "Apportion profits to the tax year for a business whose year end isn't 31 March or 5 April",
    "Allocate partnership profits using salaries, interest on capital and the profit-sharing ratio",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Sole traders and partnerships have no Companies Act accounts to file, but their accounts still need to be right: they're the basis of the self-assessment return, and banks, mortgage lenders and landlords rely on them. The key differences from a company:

- **No separate legal person**: the owner's money and the business's money are kept apart in the books, but the owner isn't an employee. There's no salary, no dividends and no director's loan account.
- **Capital account** instead of share capital and reserves: opening capital + profit + capital introduced − drawings = closing capital.
- **Drawings** (cash, goods, personal bills paid by the business, the owner's own tax and NIC) are never expenses.`,
    },
    {
      kind: "table",
      caption: "Common adjustments from accounts profit to taxable profit",
      head: ["Item", "Adjustment", "Why"],
      rows: [
        ["Depreciation; loss on disposal", "Add back", "Replaced by capital allowances"],
        ["Owner's 'wages', drawings, own NIC and income tax", "Add back", "Not expenses of the trade"],
        ["Private use of car, van, phone, home", "Add back the private proportion", "Only the business proportion is wholly and exclusively for the trade"],
        ["Business entertainment", "Add back", "Specifically disallowed"],
        ["Fines and penalties (e.g. parking fines of the owner)", "Add back", "Not incurred for the trade"],
        ["Capital expenditure in repairs", "Add back", "Capital, not revenue"],
        ["General provisions (e.g. a general bad debt provision)", "Add back", "Only specific, estimated amounts are allowable"],
        ["Capital allowances", "Deduct", "AIA, first-year and writing-down allowances; restricted for private use of the owner's assets"],
        ["Goods taken for own use", "Add back at selling price", "Treated as a sale at market value"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax year basis (from 2024/25)",
      md: `Since **2024/25**, sole traders and partners are taxed on the profits **arising in the tax year** (6 April to 5 April), whatever their accounting date. A business with a 31 March year end is treated as aligned. For any other year end, profits of two accounting periods are **apportioned** to the tax year, normally by days. 2023/24 was the transition year, with transition profits spread over up to five years.

If the accounts for the later period aren't ready by the filing date, use a reasonable **estimate** and amend once the figures are known.`,
    },
    {
      kind: "md",
      md: `### Cash basis or accruals?

From **2024/25** the **cash basis** is the default for sole traders and partnerships of individuals: income and expenses are recognised when received and paid. The old turnover limit was removed. A business can **opt out** and use traditional accruals accounting (and must say so on the return). Accruals usually suits businesses with stock, significant debtors or a need for accounts a lender will accept. Capital purchases under the cash basis are generally deductible as expenses (except cars and land and buildings).

### Partnerships

The partnership agreement sets how profit is shared, commonly in this order: **partners' salaries** (an allocation of profit, not an expense), **interest on capital**, then the **balance in the profit-sharing ratio**. The partnership files a partnership return showing each partner's share; each partner then reports their share on their own return and pays their own tax and Class 4 NIC.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "'Salary' to a partner is not an expense",
      md: `Bookkeepers often post a partner's monthly drawings or 'salary' to wages. In the accounts it must be reclassified as drawings, and in the profit allocation it's a first slice of profit. If a partner's salary is processed through payroll, stop and investigate: partners can't be employees of their own partnership.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Making Tax Digital for Income Tax",
      md: `From **6 April 2026**, sole traders and landlords with qualifying income over **£50,000** (based on 2024/25) must keep digital records and send quarterly updates through MTD-compatible software. The threshold falls to **£30,000** from April 2027 and **£20,000** from April 2028. Partnerships aren't in yet. For affected clients, the year-end job becomes the 'final declaration' after four quarterly updates, so agree your workflow with them now.`,
    },
  ],
  scenario: {
    title: "Dan Keller, plumber: from accounts profit to taxable profit",
    narrative: `Dan Keller is a sole trader plumber with a **31 March** year end, using accruals accounting. His draft profit and loss account for the year ended 31 March 2026 shows a profit of **£48,600**, after charging:

- depreciation £3,200;
- "wages – Dan" £24,000 (his monthly drawings);
- van running costs £6,000 (Dan's own records show 20% private use);
- entertaining customers £450;
- a parking fine £120.

In July 2025 he bought a new van for **£28,000** (not a car), also used 20% privately. No other capital additions; no pools brought forward.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Add back depreciation**: £3,200.
2. **Add back drawings**: £24,000. Reclassify them as drawings in the accounts too.
3. **Private use of van costs**: 20% × £6,000 = £1,200.
4. **Entertaining** £450 and the **parking fine** £120 are disallowed.
5. **Capital allowances**: the van qualifies for the Annual Investment Allowance at 100%, restricted for Dan's 20% private use: £28,000 × 80% = **£22,400**.
6. **Basis period**: 31 March year end, so the year to 31 March 2026 is taxed in **2025/26**.`,
      },
      {
        kind: "table",
        caption: "Taxable profit for 2025/26",
        head: ["", "£"],
        rows: [
          ["Profit per accounts", "48,600"],
          ["Add: depreciation", "3,200"],
          ["Add: drawings posted as wages", "24,000"],
          ["Add: private use of van costs (20%)", "1,200"],
          ["Add: entertaining", "450"],
          ["Add: parking fine", "120"],
          ["Less: capital allowances (AIA £28,000 × 80%)", "(22,400)"],
          ["**Taxable trading profit**", "**55,170**"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Fix the accounts, not just the tax computation",
        md: `The drawings shouldn't be in the profit and loss account at all. Reclassify the £24,000 to drawings in the accounts, so the accounts profit becomes £72,600 and the tax computation adds back only the genuine tax differences. Lenders reading the accounts will thank you.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "taxable-profit",
      prompt:
        "A sole trader's accounts profit is £36,500 after charging depreciation £2,000, the owner's own Class 4 NIC paid from the business account £1,400, mobile phone costs £900 (25% private), and a general bad debt provision increase of £600. Capital allowances are £3,500. What is the taxable trading profit?",
      answer: 37225,
      unit: "£",
      explain: "Add back depreciation, the owner's NIC (personal tax), the private phone share and the general provision; deduct capital allowances.",
      working: "£36,500 + £2,000 + £1,400 + (25% × £900 = £225) + £600 − £3,500 = **£37,225**.",
    },
    {
      kind: "numeric",
      id: "partnership-allocation",
      prompt:
        "Ann and Bob are partners. Profit for the year is £90,000. The agreement gives Ann a salary of £10,000, interest on capital at 5% (capital: Ann £40,000, Bob £20,000), and the balance shared Ann 60%, Bob 40%. What is Ann's total profit share?",
      answer: 58200,
      unit: "£",
      explain: "Allocate salaries and interest first, then split the balance in the profit-sharing ratio.",
      working: "Interest: Ann £2,000, Bob £1,000. Balance: £90,000 − £10,000 − £3,000 = £77,000. Ann 60% = £46,200. Ann total: £10,000 + £2,000 + £46,200 = **£58,200** (Bob £31,800).",
    },
    {
      kind: "numeric",
      id: "tax-year-apportion",
      prompt:
        "A sole trader has a 31 December year end. Profits: year to 31 December 2025 £60,000; year to 31 December 2026 £72,000. Apportioning by months (treat the 2025/26 tax year as April 2025 to March 2026), what profit is taxed in 2025/26?",
      answer: 63000,
      unit: "£",
      explain: "Under the tax year basis, take the part of each accounting period that falls in the tax year. HMRC's default is by days; months are used here to keep the arithmetic simple.",
      working: "9/12 × £60,000 = £45,000 (April–December 2025) + 3/12 × £72,000 = £18,000 (January–March 2026). Total **£63,000**.",
    },
    {
      kind: "journal",
      id: "drawings-reclass",
      prompt: "A sole trader's bookkeeper has posted £18,000 of the owner's monthly withdrawals to 'Wages'. Correct it at the year end.",
      accounts: ["Drawings", "Wages", "Capital account", "Director's loan account", "Bank", "PAYE control"],
      answer: [
        { account: "Drawings", dr: 18000 },
        { account: "Wages", cr: 18000 },
      ],
      explain: "Owner's withdrawals are drawings, not wages. Drawings are later closed off against the capital account. A sole trader has no director's loan account.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-tax-year-basis",
      prompt: "Since 2024/25, what profits is a sole trader taxed on?",
      options: ["The accounts ending in the tax year", "The profits arising in the tax year itself", "The previous year's profits", "Cash received in the tax year only"],
      answer: 1,
      explain: "The tax year basis taxes profits arising in the tax year, apportioning where the accounting date isn't aligned.",
    },
    {
      kind: "mcq",
      id: "q-cash-default",
      prompt: "From 2024/25, what is the default accounting basis for a sole trader's tax return?",
      options: ["Accruals", "The cash basis, unless they opt out", "Whichever gives lower profit", "Cash basis only if turnover is under £150,000"],
      answer: 1,
      explain: "The cash basis became the default and the turnover limit was removed; businesses can opt out to accruals.",
    },
    {
      kind: "mcq",
      id: "q-partner-salary",
      prompt: "How is a partner's 'salary' treated?",
      options: ["As an expense in the profit and loss account", "As an allocation of profit to that partner", "Through PAYE", "As a loan"],
      answer: 1,
      explain: "A partner's salary is a first slice of the profit allocation, not an expense.",
    },
    {
      kind: "mcq",
      id: "q-mtd",
      prompt: "From 6 April 2026, which sole traders must use MTD for Income Tax?",
      options: ["All of them", "Those with qualifying income over £50,000", "Those with turnover over the VAT threshold", "None until 2028"],
      answer: 1,
      explain: "Qualifying income over £50,000 from April 2026; £30,000 from April 2027; £20,000 from April 2028.",
    },
    {
      kind: "mcq",
      id: "q-private-ca",
      prompt: "A sole trader's van (not a car) costing £20,000 is used 30% privately. What capital allowance is available if the AIA is claimed?",
      options: ["£20,000", "£14,000", "£6,000", "Nil"],
      answer: 1,
      explain: "Capital allowances on an owner's asset with private use are restricted to the business proportion: £20,000 × 70% = £14,000.",
    },
  ],
  sources: [
    { label: "Basis period reform (HMRC policy paper)", url: "https://www.gov.uk/government/publications/basis-period-reform/basis-period-reform" },
    { label: "HMRC Business Income manual: tax year basis from 2024-25 (BIM81201)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim81201" },
    { label: "Cash basis", url: "https://www.gov.uk/simpler-income-tax-cash-basis" },
    { label: "Check if you're eligible for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax" },
    { label: "Expenses if you're self-employed", url: "https://www.gov.uk/expenses-if-youre-self-employed" },
  ],
};
