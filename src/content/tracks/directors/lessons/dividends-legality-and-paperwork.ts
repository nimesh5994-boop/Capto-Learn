import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "dividends-legality-and-paperwork",
  title: "Dividends: distributable reserves, minutes and vouchers",
  level: "foundation",
  minutes: 30,
  summary:
    "When a company may lawfully pay a dividend, how to check distributable reserves, the paperwork that evidences it, what happens when a dividend is illegal, and how dividends are taxed in 2026/27.",
  objectives: [
    "Calculate distributable reserves and decide whether a proposed dividend is lawful",
    "Distinguish interim from final dividends and say who must approve each",
    "Prepare a compliant board minute and dividend voucher",
    "Explain the consequences of an unlawful dividend and the usual ways of putting it right",
    "Calculate the income tax on dividends for a basic-rate taxpayer in 2026/27",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A dividend is a distribution of profit to shareholders. Unlike salary it is **not** deductible for corporation tax, and unlike salary it can only be paid if the company has the **profits** to support it. Most problems arise not because the tax is complicated but because nobody checked the reserves or kept the paperwork.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The legal test (CA 2006 Part 23)",
      md: `- A company may only make a distribution out of **profits available for the purpose** (s830): accumulated, realised profits less accumulated, realised losses.
- Distributions are judged by reference to **"relevant accounts"** (ss836–839): the last annual accounts, or interim accounts for a dividend paid before accounts are filed, or initial accounts for a first period.
- A shareholder who receives a distribution knowing, or having reasonable grounds to believe, it was unlawful must **repay** it (s847).
- The articles may add restrictions, and a **public** company has an additional net-assets test.`,
    },
    {
      kind: "md",
      md: `### Interim and final dividends

| | Interim | Final |
|---|---|---|
| Who decides | The **directors** | The **members** approve the directors' recommendation (ordinary resolution), usually at the AGM or by written resolution |
| When it becomes a debt | When it is **paid** (it can be changed until then) | When the shareholders approve it, or the date specified in the resolution |
| Typical use in small companies | Most common: a board minute whenever cash is taken | Occasional, for year-end true-up |

For a one-person company the director is also the shareholder, so a single signed minute can cover both steps. For a multi-shareholder company check the articles carefully.`,
    },
    {
      kind: "md",
      md: `### Paperwork: what to keep

Every dividend should have:

1. A **board minute** recording the decision, the amount per share, the class of shares, the date of payment, and a statement that the directors have reviewed the accounts and are satisfied that distributable reserves are sufficient.
2. A **dividend voucher** (CA 2006 doesn't prescribe the form, but HMRC expect one) showing the company name and number, the date, the shareholder, the number and class of shares and the amount. Tax credits no longer exist, so the voucher is for evidence and the shareholder's Self Assessment.
3. A copy of the **accounts or management accounts** used to support the decision, with the reserves calculation.
4. The **bank record** showing payment to the shareholder.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "'Dividends in advance' and illegal dividends",
      md: `Taking money out in the hope that profits will arrive later does **not** create a lawful dividend. If the reserves weren't there when the dividend was declared:

- It is an **unlawful distribution**. The shareholder may have to repay it (s847) and the director can be personally liable to the company (breach of duty, s174).
- HMRC may treat the payment as a **loan to a participator** (s455, 35.75% for loans from 6 April 2026) or as **earnings** (PAYE and NIC), rather than a dividend.
- Common repair routes: (a) **repay** the amount, (b) **reclassify it as a director's loan** and deal with s455, (c) vote **salary or bonus** with PAYE and NIC (if that is the true nature and can be done properly), or (d) rely on **later accounts** only if the reserves genuinely existed at the time.

Never backdate a minute. It makes a problem into a dishonesty issue.`,
    },
    {
      kind: "table",
      caption: "Dividend tax rates 2026/27 (England, Wales and Northern Ireland; Scottish taxpayers use the same dividend rates)",
      head: ["Band", "Rate", "Notes"],
      rows: [
        ["Dividend allowance", "0%", "£500 a year, uses up band space"],
        ["Basic rate", "10.75%", "Increased from 8.75% for dividends from 6 April 2026"],
        ["Higher rate", "35.75%", "Increased from 33.75%"],
        ["Additional rate", "39.35%", "Unchanged"],
      ],
    },
  ],
  scenario: {
    title: "A dividend request at Pembroke Plumbing Ltd",
    narrative: `Pembroke Plumbing Ltd is owned 100% by Gary Pembroke, a basic-rate taxpayer with no other income beyond a £12,570 salary. Year end 31 March. Accounts to 31 March 2026 (filed) show retained profits of £21,400. The company has paid no dividends since. In the current year to 30 September 2026 management accounts show a profit after tax provision of £14,600. Gary wants a £30,000 dividend in October 2026.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: reserves.** Distributable reserves for a dividend in October 2026 can be judged on the last annual accounts *plus interim accounts*. £21,400 + £14,600 = **£36,000**, less dividends already paid (nil) = £36,000. A £30,000 dividend is within reserves.

**Step 2: paperwork.** Prepare a board minute for £30,000 on 1,000 ordinary £1 shares (£30 per share), referencing the 30 September management accounts. Prepare a voucher. File the management accounts.

**Step 3: the tax for Gary.** Salary £12,570 uses his personal allowance. Dividends £30,000 less the £500 allowance = £29,500 taxable at the basic rate of 10.75%: **£3,171.25** (£29,500 × 10.75%). Tax is due through Self Assessment by 31 January 2028 if the dividend falls in 2026/27 (reported on the 2026/27 return).

**Step 4: the final check.** Dividends use basic-rate band space. £30,000 is well inside the £37,700 basic rate band, so no higher-rate tax. Remind Gary that if the dividend were £60,000 he would pay 35.75% on the part above the band.`,
      },
      {
        kind: "journal",
        title: "Recording the £30,000 dividend",
        narrative: "Paid by bank transfer on the declaration date. Dividends are shown as a deduction from reserves, not an expense.",
        lines: [
          { account: "Dividends (reserves)", dr: 30000 },
          { account: "Bank", cr: 30000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "distributable",
      prompt: "A company's last accounts show retained profits of £18,000. Since then it has made a trading loss of £5,500 and paid a £4,000 dividend. What are the distributable reserves now (£)?",
      answer: 8500,
      unit: "£",
      explain: "Realised losses and distributions already made reduce reserves.",
      working: "£18,000 − £5,500 − £4,000 = **£8,500**.",
    },
    {
      kind: "numeric",
      id: "dividend-tax",
      prompt: "In 2026/27 a shareholder has salary of £12,570 and receives £20,000 of dividends. Assuming no other income, how much dividend tax is due (to the nearest £1)?",
      answer: 2096,
      tolerance: 1,
      unit: "£",
      explain: "The personal allowance is used by salary. The £500 dividend allowance is taxed at 0%. The balance falls in the basic-rate band.",
      working: "(£20,000 − £500) × 10.75% = £19,500 × 0.1075 = **£2,096.25**.",
    },
    {
      kind: "mcq",
      id: "mcq-s455-or-div",
      prompt: "A director takes £25,000 from the company 'as a dividend', but the company had only £4,000 of distributable reserves. What is the most likely treatment of the excess?",
      options: [
        "A valid dividend because the director is the only shareholder",
        "An unlawful distribution, which HMRC will commonly treat as a loan to a participator",
        "Salary, automatically",
        "A capital gain",
      ],
      answer: 1,
      explain: "Without reserves it isn't a dividend. It must be repaid or treated as a loan (s455 exposure) unless properly reclassified.",
    },
    {
      kind: "classify",
      id: "classify-dividend-docs",
      prompt: "Which of these are needed when a small company pays an interim dividend?",
      categories: ["Needed", "Not needed"],
      items: [
        { text: "Board minute approving the amount and recording the reserves check", answer: 0 },
        { text: "Dividend voucher for each shareholder", answer: 0 },
        { text: "Form to HMRC to notify them of the dividend", answer: 1, why: "No notification is needed; the shareholder reports it on Self Assessment if required." },
        { text: "Accounts or management accounts supporting the reserves", answer: 0 },
        { text: "Companies House filing of the dividend", answer: 1, why: "It appears in the accounts, but isn't separately filed." },
      ],
      explain: "The evidence is internal: minute, voucher, accounts and bank record. Nothing is filed at the time.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-test",
      prompt: "A company may only pay a dividend out of…",
      options: ["Cash in the bank", "Profits available for distribution", "Turnover", "Share capital"],
      answer: 1,
      explain: "CA 2006 s830: accumulated realised profits less accumulated realised losses.",
    },
    {
      kind: "mcq",
      id: "q-ct",
      prompt: "Is a dividend deductible in computing corporation tax?",
      options: ["Yes, always", "No, it is a distribution of post-tax profit", "Only for owner-managers", "Only for final dividends"],
      answer: 1,
      explain: "Dividends are paid out of profit already taxed; there is no corporation tax deduction.",
    },
    {
      kind: "mcq",
      id: "q-847",
      prompt: "Under CA 2006 s847 a shareholder must repay an unlawful dividend if they…",
      options: ["Are a director", "Knew or had reasonable grounds to believe it was unlawful", "Hold more than 25% of the shares", "Received it in cash"],
      answer: 1,
      explain: "The knowledge test is the trigger. In a one-person company the shareholder is usually the director and is taken to know.",
    },
    {
      kind: "mcq",
      id: "q-basic",
      prompt: "What is the basic-rate dividend tax rate for 2026/27?",
      options: ["8.75%", "10.75%", "20%", "33.75%"],
      answer: 1,
      explain: "The ordinary dividend rate rose to 10.75% from 6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-allow",
      prompt: "What is the dividend allowance for 2026/27?",
      options: ["£500", "£1,000", "£2,000", "£5,000"],
      answer: 0,
      explain: "The allowance has been £500 since 2024/25.",
    },
    {
      kind: "mcq",
      id: "q-backdate",
      prompt: "A director asks you to backdate a dividend minute to the previous year-end 'for convenience'. What should you do?",
      options: ["Do it. It is only paperwork", "Refuse: backdating records misstates the facts", "Do it if the amount is small", "Do it but mark it 'draft'"],
      answer: 1,
      explain: "Backdating creates a false record and turns an error into potential dishonesty.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 Part 23 – distributions", url: "https://www.legislation.gov.uk/ukpga/2006/46/part/23" },
    { label: "Tax on dividends – GOV.UK", url: "https://www.gov.uk/tax-on-dividends" },
    { label: "Income Tax rates and allowances (current and past)", url: "https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past" },
    { label: "Rate of tax for the loans to participators charge", url: "https://www.gov.uk/government/publications/corporation-tax-rate-of-tax-for-the-loans-to-participators-charge/corporation-tax-rate-of-tax-for-the-loans-to-participators-charge" },
  ],
};
