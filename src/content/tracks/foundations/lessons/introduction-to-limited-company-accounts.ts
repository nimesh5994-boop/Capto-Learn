import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "introduction-to-limited-company-accounts",
  title: "Introduction to limited company accounts",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "What changes when the client is a limited company: share capital and retained earnings instead of a capital account, directors' pay vs dividends, the corporation tax charge, distributable reserves, size thresholds and the statutory filing framework.",
  objectives: [
    "Explain how a company's equity section differs from a sole trader's capital account",
    "Post the corporation tax charge and dividends, and roll forward retained earnings",
    "Distinguish expenses (directors' salaries) from distributions (dividends)",
    "Identify the accounting framework and filing deadline for a small or micro company",
  ],
  body: [
    {
      kind: "md",
      md: `The bookkeeping for a limited company is the same double entry you've used for sole traders. What changes is the **legal framework** around it. A company is a separate legal person, owned by its **shareholders** and run by its **directors** (often the same people in a small company, but legally two different roles). That leads to five big differences:

1. **No capital account or drawings.** Owners' funds are split into **share capital** (what shareholders paid for their shares) and **reserves**, mainly **retained earnings** (accumulated profits not yet distributed).
2. **Directors' salaries are an expense.** A director is an **office holder** of the company (and may also be an employee if they have a contract of employment). Either way, their salary is taxed like an employee's: the salary and the employer's NIC go through payroll and are expenses in the income statement.
3. **Dividends are not an expense.** They're a distribution of profit to shareholders, deducted from retained earnings, and can only be paid out of **distributable profits**.
4. **The company pays corporation tax**, so there's a tax charge in the income statement and a tax liability in the balance sheet.
5. **Statutory accounts are required** under the Companies Act 2006, in a prescribed format, filed at Companies House.`,
    },
    {
      kind: "table",
      caption: "Sole trader vs company: where things go",
      head: ["Item", "Sole trader", "Limited company"],
      rows: [
        ["Owner's investment", "Capital account", "Share capital (and share premium)"],
        ["Accumulated profit", "Added to capital", "Retained earnings (profit and loss reserve)"],
        ["Owner taking money out", "Drawings (reduces capital)", "Salary (expense), dividend (reduces retained earnings) or director's loan (asset)"],
        ["Tax on profits", "The owner's personal income tax; not in the accounts", "Corporation tax: expense and liability in the accounts"],
        ["Accounts required by law?", "No statutory format", "Yes: Companies Act 2006, FRS 102 or FRS 105"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Distributions only out of distributable profits",
      md: `A company may only make a distribution (such as a dividend) out of profits available for the purpose (Companies Act 2006 s830): broadly, accumulated realised profits less accumulated realised losses. Check this before **every** dividend, not just at the year end, using up-to-date management accounts. A dividend paid without sufficient reserves is unlawful and the shareholder may have to repay it; in practice it's often reclassified as a loan to the director through the director's loan account.`,
    },
    {
      kind: "md",
      md: `### Corporation tax

For the financial year 2026 (starting 1 April 2026) the **main rate is 25%** for profits over £250,000 and the **small profits rate is 19%** for profits up to £50,000, with marginal relief in between. The limits are reduced for short accounting periods and shared between associated companies. These rates were the same for financial year 2025.

At the year end, the bookkeeper or accountant estimates the tax on the year's taxable profit (accounting profit adjusted for disallowable items, depreciation and capital allowances) and posts it:`,
    },
    {
      kind: "journal",
      title: "The year-end corporation tax charge",
      narrative: "Taxable profit of £42,000 at the small profits rate of 19% = £7,980.",
      lines: [
        { account: "Corporation tax expense", dr: 7980 },
        { account: "Corporation tax liability", cr: 7980 },
      ],
    },
    {
      kind: "table",
      caption: "Company size and accounts framework (periods beginning on or after 6 April 2025)",
      head: ["Size", "Must meet at least 2 of", "Usual framework"],
      rows: [
        ["Micro-entity", "Turnover ≤ £1m; balance sheet total ≤ £500,000; ≤ 10 employees", "FRS 105 (very limited disclosures)"],
        ["Small", "Turnover ≤ £15m; balance sheet total ≤ £7.5m; ≤ 50 employees", "FRS 102 section 1A"],
      ],
    },
    {
      kind: "md",
      md: `A company generally qualifies in its first financial year if it meets the conditions in that year. After that, it must meet them in **both the current year and the previous year**, so one good or bad year doesn't change its size on its own.

### Deadlines

- **Accounts to Companies House:** 9 months after the year end for a private company (first accounts: 21 months from incorporation, or 3 months from the accounting reference date if later).
- **Corporation tax payment:** for most small companies, 9 months and 1 day after the end of the accounting period.
- **Company tax return (CT600):** 12 months after the end of the accounting period.

Companies House filing requirements are changing under the Economic Crime and Corporate Transparency Act 2023 (identity verification and changes to what small companies must file). Companies House guidance says that from **1 April 2028** accounts can only be filed using commercial software, abridged accounts end, and small companies and micro-entities must deliver a profit and loss account (with an option not to publish it on the register). Check current Companies House guidance before filing rather than relying on how it was done last year.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Posting dividends as an expense** (or as "Director's drawings"). Dividends go to a dividends account that's closed off to retained earnings, below profit after tax.
- **Paying dividends without checking reserves**, especially after a loss-making year.
- **Forgetting the corporation tax accrual** in draft accounts, which overstates the reserves available for dividends.
- **Mixing the director's personal spending into company costs** instead of the director's loan account.`,
    },
  ],
  scenario: {
    title: "Finishing the accounts for Calder Valley Joinery Ltd",
    narrative: `**Calder Valley Joinery Ltd** has one director-shareholder, **Sam Okoro**, who owns all 100 £1 shares. For the year ended **31 March 2026**:

- Profit before tax, after Sam's salary of £12,570 and the employer's NIC on it: **£42,000**
- After adding back depreciation and deducting capital allowances, **taxable profit is also £42,000**. The company has no associated companies.
- Dividends paid to Sam during the year: **£24,000**, each supported by a board minute and voucher.
- Retained earnings brought forward at 1 April 2025: **£15,600**

Sam asks: *"How much more can I take as a dividend?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: corporation tax.** Taxable profit £42,000 is below £50,000, so the small profits rate of 19% applies: £42,000 × 19% = **£7,980**.

**Step 2: profit after tax.** £42,000 − £7,980 = **£34,020**.

**Step 3: roll forward retained earnings.**`,
      },
      {
        kind: "table",
        caption: "Movement on retained earnings",
        head: ["", "£"],
        rows: [
          ["Retained earnings at 1 April 2025", "15,600"],
          ["Profit for the year after tax", "34,020"],
          ["Dividends paid", "(24,000)"],
          ["**Retained earnings at 31 March 2026**", "**25,620**"],
        ],
      },
      {
        kind: "journal",
        title: "Closing the dividends account to retained earnings at the year end",
        narrative: "During the year each dividend was posted Dr Dividends, Cr Bank. At the year end the dividends account is transferred to retained earnings (cloud software does this automatically).",
        lines: [
          { account: "Retained earnings", dr: 24000 },
          { account: "Dividends", cr: 24000 },
        ],
      },
      {
        kind: "md",
        md: `**Answering Sam:** at 31 March 2026 the company had distributable reserves of **£25,620**, assuming all the profits are realised. But distributable reserves aren't the same as cash: the company still has to pay the £7,980 corporation tax by 1 January 2027 and needs working capital. Any further dividend should be based on up-to-date management accounts at the time it's declared, with a board minute. And the personal tax on the dividend is Sam's, so a conversation about his self-assessment is also due.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "retained-earnings",
      prompt: "Retained earnings brought forward **£38,200**; profit after tax for the year **£52,600**; dividends paid **£30,000**. What are retained earnings carried forward?",
      answer: 60800,
      unit: "£",
      explain: "Profit after tax adds to retained earnings; dividends reduce them.",
      working: "£38,200 + £52,600 − £30,000 = **£60,800**",
    },
    {
      kind: "numeric",
      id: "ct-small-profits",
      prompt: "A company with no associated companies has a 12-month accounting period ending 31 March 2027 and taxable profits of **£38,500**. How much corporation tax is due?",
      answer: 7315,
      unit: "£",
      explain: "Profits are below the £50,000 lower limit, so the 19% small profits rate applies to all of them.",
      working: "£38,500 × 19% = **£7,315**",
    },
    {
      kind: "journal",
      id: "post-ct",
      prompt: "A company estimates its corporation tax for the year at **£11,400**. Post the year-end entry.",
      accounts: ["Corporation tax expense", "Corporation tax liability", "Retained earnings", "Bank", "Dividends", "Director's loan account"],
      answer: [
        { account: "Corporation tax expense", dr: 11400 },
        { account: "Corporation tax liability", cr: 11400 },
      ],
      explain: "The tax charge is an expense in the income statement (below profit before tax) and a current liability until paid. It isn't posted directly to retained earnings.",
    },
    {
      kind: "classify",
      id: "classify-company-items",
      prompt: "Where does each item belong in a small company's accounts?",
      categories: ["Expense in the income statement", "Movement in equity (not an expense)", "Balance sheet asset"],
      items: [
        { text: "Director's salary", answer: 0 },
        { text: "Dividend paid to the shareholder-director", answer: 1 },
        { text: "Employer's NIC on the director's salary", answer: 0 },
        { text: "Corporation tax charge for the year", answer: 0, why: "Shown as the tax charge, below profit before tax." },
        { text: "Overdrawn director's loan account", answer: 2, why: "The director owes the company money." },
        { text: "New shares issued for cash", answer: 1 },
      ],
      explain: "Salaries and taxes are costs of the company. Dividends and share issues are transactions with the owners in their capacity as owners, so they go through equity.",
    },
    {
      kind: "mcq",
      id: "unlawful-dividend",
      prompt: "A company had retained earnings of £4,000 at the last year end and has made losses since. The director wants to pay a £20,000 dividend now. What should you advise?",
      options: [
        "Fine, as long as there's cash in the bank",
        "It isn't lawful without sufficient distributable profits; consider salary or a documented loan instead and take advice",
        "Pay it and reclassify at the year end",
        "Dividends are always allowed up to the personal allowance",
      ],
      answer: 1,
      explain: "s830 restricts distributions to available profits, regardless of cash. A dividend without reserves is unlawful and may have to be repaid; in practice it ends up in the director's loan account, with potential s455 and benefit-in-kind consequences.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-dividend-expense",
      prompt: "Dividends paid by a company are:",
      options: ["An allowable expense for corporation tax", "A distribution deducted from retained earnings", "A liability once paid", "Part of cost of sales"],
      answer: 1,
      explain: "Dividends are paid out of post-tax profits and aren't deductible.",
    },
    {
      kind: "mcq",
      id: "q-filing-deadline",
      prompt: "A private company has a 30 June 2026 year end (not its first). When must its accounts reach Companies House?",
      options: ["31 December 2026", "31 March 2027", "30 June 2027", "31 January 2027"],
      answer: 1,
      explain: "Private companies have 9 months from the accounting reference date: 31 March 2027.",
    },
    {
      kind: "mcq",
      id: "q-small-rate",
      prompt: "A company with no associated companies has taxable profits of £30,000 for the year to 31 March 2027. What rate of corporation tax applies?",
      options: ["19%", "20%", "25%", "26.5%"],
      answer: 0,
      explain: "Profits up to £50,000 are taxed at the 19% small profits rate.",
    },
    {
      kind: "mcq",
      id: "q-micro",
      prompt: "A company has turnover of £800,000, a balance sheet total of £600,000 and 6 employees. Is it a micro-entity (periods from 6 April 2025)?",
      options: ["No, its balance sheet total is over £500,000", "Yes, it meets two of the three tests", "No, it must meet all three", "Only if it's dormant"],
      answer: 1,
      explain: "It meets the turnover (≤ £1m) and employees (≤ 10) tests, which is two of the three. After its first financial year, it must also have met the conditions in the previous year.",
    },
    {
      kind: "mcq",
      id: "q-equity-names",
      prompt: "In a company balance sheet, the equivalent of a sole trader's accumulated profits is:",
      options: ["Share capital", "Retained earnings", "Director's loan account", "Corporation tax liability"],
      answer: 1,
      explain: "Retained earnings (the profit and loss reserve) hold accumulated profits less losses and dividends.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s386 – duty to keep accounting records", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/386" },
    { label: "Companies Act 2006 s830 – distributions to be made only out of profits available", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/830" },
    { label: "Companies House – Preparing and filing Companies House accounts", url: "https://www.gov.uk/government/publications/filing-your-companies-house-accounts/life-of-a-company-part-1-accounts" },
    { label: "HMRC – Rates and allowances for Corporation Tax", url: "https://www.gov.uk/government/publications/rates-and-allowances-corporation-tax/rates-and-allowances-corporation-tax" },
    { label: "GOV.UK – Pay your Corporation Tax bill", url: "https://www.gov.uk/pay-corporation-tax" },
    { label: "GOV.UK – Employment status: office holder (company directors)", url: "https://www.gov.uk/employment-status/office-holder" },
    { label: "FRC – FRS 102", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
  ],
};
