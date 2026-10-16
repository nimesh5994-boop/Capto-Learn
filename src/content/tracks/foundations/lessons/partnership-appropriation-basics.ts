import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "partnership-appropriation-basics",
  title: "Partnership appropriation basics",
  level: "advanced",
  minutes: 35,
  summary:
    "How partnership profit is shared: the partnership agreement and the Partnership Act 1890 defaults, the appropriation account (salaries, interest on capital and drawings, profit-sharing ratio), and capital vs current accounts.",
  objectives: [
    "Apply the Partnership Act 1890 s24 default rules when there's no agreement",
    "Prepare an appropriation account with salaries, interest and a profit-sharing ratio",
    "Write up partners' current accounts and spot an overdrawn current account",
    "Explain why partners' 'salaries' aren't an expense of the partnership",
  ],
  body: [
    {
      kind: "md",
      md: `A partnership's income statement is prepared exactly like a sole trader's, down to net profit. What's different is what happens next: the profit has to be **shared** between the partners. That sharing is shown in an **appropriation account**, and each partner's share is credited to their own accounts in the balance sheet.

In England, Wales and Northern Ireland a partnership (other than an LLP) isn't a separate legal person; a Scottish partnership is, but it still doesn't pay income tax itself. Each partner pays income tax and NIC on their own share of the taxable profit, reported on their personal return, and the partnership files a partnership return showing how the profit was split.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Partnership Act 1890 s24: the defaults",
      md: `If there's no agreement to the contrary (written, oral or implied by conduct):

- Partners share **capital and profits equally**, and contribute equally to losses.
- **No interest on capital.**
- **No salary** for taking part in the business.
- A partner who **advances money beyond their agreed capital** is entitled to **interest at 5% a year** on it.

Most partnerships have a written agreement that overrides these. Always read it, and check it matches what the partners actually do.`,
    },
    {
      kind: "md",
      md: `### The appropriation account

Starting from net profit, the agreement may provide for:

1. **Interest on drawings** charged to partners (added back: it increases the profit available to share)
2. **Partners' salaries** (deducted)
3. **Interest on capital** (deducted)
4. The **residual profit** shared in the **profit-sharing ratio** (PSR)

Every pound of net profit ends up allocated to a partner. A partner's total share = salary + interest on capital + share of residual − interest on drawings.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "A partner's 'salary' isn't wages",
      md: `A salary paid to a **partner** is an allocation of profit, not an expense. It goes in the appropriation account, never the income statement, and never through payroll. If a partner is paid monthly, the payments are **drawings**. Only wages paid to **employees** (including a partner's spouse who is a genuine employee) are expenses.

Interest on a partner's **loan** to the firm (as opposed to their capital) is normally treated as an expense in arriving at profit.`,
    },
    {
      kind: "table",
      caption: "Capital vs current accounts",
      head: ["", "Capital account", "Current account"],
      rows: [
        ["What it holds", "Long-term fixed capital each partner has agreed to put in", "Day-to-day dealings: profit shares, salaries, interest, drawings"],
        ["How often it moves", "Rarely (new capital, admission or retirement)", "Every year"],
        ["Normal balance", "Credit", "Credit; a debit balance means the partner has drawn more than their share"],
      ],
    },
    {
      kind: "md",
      md: `### Writing up the current accounts

Each partner's current account:

- **Credit:** balance b/f, salary, interest on capital, share of residual profit
- **Debit:** drawings, interest on drawings
- Balance c/d

At the year end each partner's drawings account is transferred: Dr Current account, Cr Drawings.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Overdrawn current accounts",
      md: `A partner with a debit balance on their current account has taken out more than they've earned. It's not a tax problem in itself (partners are taxed on their profit share, not their drawings), but it is a commercial one: they owe the other partners, in effect. Flag it in your covering note to the partners.`,
    },
  ],
  scenario: {
    title: "Sharing the profit for Hill & Kaur Architects",
    narrative: `**Tom Hill** and **Amrit Kaur** are partners in **Hill & Kaur Architects**. Net profit for the year ended **31 March 2026** is **£96,000**. Their partnership agreement provides:

- Amrit receives a salary of **£15,000** for managing the practice.
- Interest on capital at **5%**. Capital accounts: Tom **£60,000**, Amrit **£40,000**.
- Interest on drawings has been calculated as Tom **£600**, Amrit **£400**.
- Residual profit is shared **3:2** (Tom:Amrit).

Current accounts at 1 April 2025: Tom **£2,500** credit, Amrit **£1,200** credit. Drawings for the year: Tom **£44,000**, Amrit **£49,000**.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Appropriation account for the year ended 31 March 2026",
        head: ["", "£", "£"],
        rows: [
          ["Net profit", "", "96,000"],
          ["Add interest on drawings: Tom £600, Amrit £400", "", "1,000"],
          ["Less salary: Amrit", "(15,000)", ""],
          ["Less interest on capital: Tom £3,000, Amrit £2,000", "(5,000)", ""],
          ["", "", "(20,000)"],
          ["**Residual profit**", "", "**77,000**"],
          ["Tom (3/5)", "46,200", ""],
          ["Amrit (2/5)", "30,800", ""],
          ["", "", "77,000"],
        ],
      },
      {
        kind: "table",
        caption: "Total profit share",
        head: ["", "Tom £", "Amrit £", "Total £"],
        rows: [
          ["Salary", "–", "15,000", "15,000"],
          ["Interest on capital", "3,000", "2,000", "5,000"],
          ["Residual share", "46,200", "30,800", "77,000"],
          ["Less interest on drawings", "(600)", "(400)", "(1,000)"],
          ["**Total**", "**48,600**", "**47,400**", "**96,000**"],
        ],
      },
      {
        kind: "table",
        caption: "Current accounts",
        head: ["", "Tom £", "Amrit £"],
        rows: [
          ["Balance b/f", "2,500", "1,200"],
          ["Profit share (above)", "48,600", "47,400"],
          ["Less drawings", "(44,000)", "(49,000)"],
          ["**Balance c/f**", "**7,100 Cr**", "**400 Dr**"],
        ],
      },
      {
        kind: "md",
        md: `The total profit share equals net profit (£96,000), so nothing has been lost or double-counted. Amrit's current account is **£400 overdrawn**: she drew more than her share. Mention it to the partners.

For tax, each partner's starting point is their share of the **taxable** profit, allocated using the same agreement for that period.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "residual-share",
      prompt: `Net profit **£80,000**. Partner A gets a salary of **£10,000**. Interest on capital at **4%**: A's capital **£50,000**, B's **£25,000**. No interest on drawings. Residual profit is shared **equally**. What is **B's total** profit share?`,
      answer: 34500,
      unit: "£",
      explain: "Deduct the salary and all interest on capital to find the residual, split it, then add B's own interest.",
      working: `Interest on capital: A £2,000, B £1,000

Residual: £80,000 − £10,000 − £3,000 = £67,000 → £33,500 each

B's total: £1,000 + £33,500 = **£34,500** (A: £10,000 + £2,000 + £33,500 = £45,500; total £80,000 ✓)`,
    },
    {
      kind: "numeric",
      id: "no-agreement",
      prompt: `Two partners, C and D, have no partnership agreement. Each contributed **£20,000** of capital. C also lent the firm a further **£10,000** on 1 April, the start of the year, as an advance beyond agreed capital. Profit **before** any interest on that loan is **£60,500**. Under the Partnership Act 1890 defaults, what is **C's total** income from the firm for the year, including loan interest?`,
      answer: 30500,
      unit: "£",
      explain: "Under s24, there's no interest on capital and no salaries, profits are shared equally, and an advance beyond capital earns 5% interest.",
      working: `Loan interest: £10,000 × 5% = £500 (an expense of the firm)

Profit to share: £60,500 − £500 = £60,000 → £30,000 each

C's total: £30,000 + £500 = **£30,500**`,
    },
    {
      kind: "journal",
      id: "appropriate-profit",
      prompt: "Partners E and F share profits **equally** with no salaries or interest. Net profit of **£40,000** has been transferred to the appropriation account. Post the journal sharing it to their current accounts.",
      accounts: ["Appropriation account", "Current account – E", "Current account – F", "Capital account – E", "Capital account – F", "Wages", "Drawings – E"],
      answer: [
        { account: "Appropriation account", dr: 40000 },
        { account: "Current account – E", cr: 20000 },
        { account: "Current account – F", cr: 20000 },
      ],
      explain: "Profit shares are credited to the partners' current accounts (not their fixed capital accounts), increasing what the firm owes them. Wages isn't used: partners aren't employees.",
    },
    {
      kind: "classify",
      id: "classify-s24",
      prompt: "Under the Partnership Act 1890 s24 default rules (no agreement), is each statement true or false?",
      categories: ["True", "False"],
      items: [
        { text: "Profits are shared equally", answer: 0 },
        { text: "Partners receive interest on their capital at 5%", answer: 1, why: "No interest on capital by default." },
        { text: "A partner who does most of the work is entitled to a salary", answer: 1 },
        { text: "Advances beyond agreed capital earn interest at 5% a year", answer: 0 },
        { text: "Profits are shared in proportion to capital contributed", answer: 1, why: "Equally, regardless of capital." },
      ],
      explain: "The defaults are deliberately simple: equal shares, no salaries, no interest on capital, 5% on advances. A written agreement normally changes them.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-partner-salary",
      prompt: "A partner's agreed salary of £20,000 is shown:",
      options: ["As wages in the income statement", "In the appropriation account", "Through payroll with PAYE", "As a liability"],
      answer: 1,
      explain: "It's an allocation of profit between partners, not an expense of the firm.",
    },
    {
      kind: "mcq",
      id: "q-interest-drawings",
      prompt: "In the appropriation account, interest on drawings:",
      options: ["Is deducted from net profit", "Is added to net profit available for sharing", "Is an expense", "Is ignored"],
      answer: 1,
      explain: "It's charged to the partners who drew, increasing the profit available to share among everyone.",
    },
    {
      kind: "mcq",
      id: "q-current-debit",
      prompt: "A partner's current account has a debit balance. This means:",
      options: ["The firm owes the partner", "The partner has drawn more than their accumulated share of profit", "An error has occurred", "The partner has made a loan to the firm"],
      answer: 1,
      explain: "Drawings and interest on drawings exceeded the partner's profit allocations and opening balance.",
    },
    {
      kind: "mcq",
      id: "q-tax-partnership",
      prompt: "Who pays income tax on an ordinary partnership's profits?",
      options: ["The partnership", "Each partner, on their own share", "The senior partner", "No one until profits are withdrawn"],
      answer: 1,
      explain: "Partners are taxed individually on their profit shares, whether or not they draw them.",
    },
    {
      kind: "mcq",
      id: "q-psr",
      prompt: "Residual profit of £45,000 is shared 2:1. The partner with the smaller share receives:",
      options: ["£22,500", "£15,000", "£30,000", "£11,250"],
      answer: 1,
      explain: "1/3 of £45,000 = £15,000; the other partner receives £30,000.",
    },
  ],
  sources: [
    { label: "Partnership Act 1890 s24 – rules as to interests and duties of partners", url: "https://www.legislation.gov.uk/ukpga/Vict/53-54/39/section/24" },
    { label: "HMRC Partnership Manual PM120100 – what is a partnership?", url: "https://www.gov.uk/hmrc-internal-manuals/partnership-manual/pm120100" },
    { label: "HMRC Partnership Manual PM137000 – profit sharing arrangements", url: "https://www.gov.uk/hmrc-internal-manuals/partnership-manual/pm137000" },
    { label: "GOV.UK – Set up a business partnership", url: "https://www.gov.uk/set-up-business-partnership" },
  ],
};
