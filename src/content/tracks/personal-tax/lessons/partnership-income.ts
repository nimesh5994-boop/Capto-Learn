import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "partnership-income",
  title: "Partnership income: allocating profits and the partnership return",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "How a trading partnership's profit is taxed: the partnership itself pays no income tax, but it files a return (SA800) and allocates its profit to the partners, who each pay tax and Class 4 NIC on their share. Profit-sharing arrangements, salaries and interest on capital, changes in partners, and the filing obligations and penalties.",
  objectives: [
    "Allocate a partnership's tax-adjusted profit between partners using salaries, interest on capital and the profit-sharing ratio",
    "Explain the tax-year basis for partnerships after basis period reform",
    "Describe the partnership return, the partnership statement and the partners' own returns",
    "Recognise the late filing penalties that apply to every partner",
  ],
  body: [
    {
      kind: "md",
      md: `A general partnership (and an LLP carrying on a trade) is **transparent** for income tax. The partnership doesn't pay income tax itself. Instead:

1. The partnership works out its **tax-adjusted trading profit** in the same way as a sole trader: accounts profit, add back disallowable items, deduct capital allowances.
2. It **allocates** that profit between the partners using the profit-sharing arrangements **for the period**.
3. Each partner is taxed on their **share** as their own trading income, paying income tax, **Class 4 NIC**, and Class 2 if relevant, through their own Self Assessment return.

The nominated partner files the **partnership return (SA800)**, including the **partnership statement**, which shows each partner's share. Each partner then copies their share onto the **partnership pages (SA104S or SA104F)** of their own return.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Salaries and interest on capital are not expenses",
      md: `A partner's "salary" and "interest on capital" are **not** deductible expenses of the partnership. They're just a way of **sharing profit**. Add them back if they've been charged in the accounts, then allocate them first, before splitting the rest of the profit in the profit-sharing ratio. The same goes for partners' drawings, their own NIC and their income tax.

Wages paid to **employees** (including a partner's spouse who is employed, not a partner) are deductible in the normal way.`,
    },
    {
      kind: "table",
      caption: "The allocation order",
      head: ["Step", "What to do"],
      rows: [
        ["1", "Start with the tax-adjusted trading profit for the partnership's accounting period, after capital allowances"],
        ["2", "Allocate any partners' salaries"],
        ["3", "Allocate interest on capital (rate × each partner's capital)"],
        ["4", "Split the balance (which can be negative) in the profit-sharing ratio"],
        ["5", "Each partner's total is their share of the taxable profit"],
      ],
    },
    {
      kind: "md",
      md: `### Basis period reform: the tax-year basis

From **2024/25**, partners (like sole traders) are taxed on the profit **arising in the tax year**, not the profit of the accounting period ending in it. A partnership with a **31 March or 5 April** year end simply uses its accounts. Any other year end means **apportioning** two sets of accounts into the tax year, with the later period's figures sometimes estimated when the return is filed and amended later.

Partners who joined before 2024/25 may also still be spreading **transition profit** from the 2023/24 transitional year over up to five years. Check last year's working papers so this isn't missed.

### Changes in the profit-sharing ratio and in partners

If the profit-sharing arrangements change during the accounting period (for example, a new partner joins or the ratio changes on 1 October), **time-apportion** the profit and allocate each part using the arrangements in force at the time. A new partner is treated as starting a trade on the day they join, and a leaving partner as ceasing on the day they leave, while the partnership itself carries on.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When salaries and interest exceed the profit",
      md: `If salaries and interest are more than the profit, the balance to share is a **loss**, split in the profit-sharing ratio. That can leave one partner with a notional profit and another with a notional loss. For tax, a partner can't be given a loss when the firm overall has a profit (or a profit when it has an overall loss). Set the notional figure to nil and reallocate it to the other partners in proportion to their shares, so the partners are taxed on the firm's actual total. Where the firm makes a real loss, each partner decides for themselves how to use their share.`,
    },
    {
      kind: "md",
      md: `### Deadlines and penalties

- **SA800 deadline:** 31 October after the tax year on paper, or **31 January** online, the same as for individuals.
- **Late filing:** each partner who was a partner during the period is charged a **£100** initial penalty, followed by daily penalties and further penalties if the return is still outstanding. A four-partner firm filing one day late pays £400.
- Each partner's own return is a separate obligation, with its own penalties.
- **MTD for Income Tax:** partnership income doesn't count towards a partner's MTD qualifying income, and HMRC hasn't set a date for partnerships to join.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Get the partnership statement signed off first",
      md: `Finalise and file the partnership return before the partners' own returns, and send each partner a copy of their share with their tax return pack. Mismatches between the SA800 and the partners' SA104 pages are a common trigger for HMRC enquiries.`,
    },
  ],
  scenario: {
    title: "Allocating profit for Fenwick & Shah, chartered surveyors",
    narrative: `Fenwick & Shah is a two-partner surveying practice with a **31 March** year end. For the year to 31 March 2027 (2026/27), the accounts show a net profit of **£108,000**. That's after charging:
- partner salaries: **£20,000** to Anna Fenwick, nil to Ravi Shah,
- interest on capital at 5%: Anna's capital is £40,000 and Ravi's is £20,000 (**£3,000** in total),
- £1,500 of client entertaining.

Capital allowances are **£4,500**. After salaries and interest, profits are shared **60:40** (Anna:Ravi).`,
    walkthrough: [
      {
        kind: "table",
        caption: "Step 1: tax-adjusted trading profit",
        head: ["", "£"],
        rows: [
          ["Net profit per accounts", "108,000"],
          ["Add back: partner salaries", "20,000"],
          ["Add back: interest on capital", "3,000"],
          ["Add back: client entertaining", "1,500"],
          ["Less: capital allowances", "(4,500)"],
          ["**Tax-adjusted trading profit**", "**128,000**"],
        ],
      },
      {
        kind: "table",
        caption: "Step 2: allocation between the partners",
        head: ["", "Anna (£)", "Ravi (£)", "Total (£)"],
        rows: [
          ["Salary", "20,000", "0", "20,000"],
          ["Interest on capital (5%)", "2,000", "1,000", "3,000"],
          ["Balance 60:40 (£128,000 − £23,000 = £105,000)", "63,000", "42,000", "105,000"],
          ["**Taxable share for 2026/27**", "**85,000**", "**43,000**", "**128,000**"],
        ],
      },
      {
        kind: "md",
        md: `**Step 3: the returns.** The SA800 partnership statement shows £85,000 for Anna and £43,000 for Ravi. Each partner enters their figure on the SA104 pages, and pays income tax and Class 4 NIC on it, with payments on account as usual. Because the year end is 31 March, no apportionment is needed for the tax-year basis.

The accounts' "salary" to Anna was never a deduction. It's simply part of her share of the profit.`,
      },
      {
        kind: "journal",
        title: "Appropriating the year's profit to the partners' current accounts",
        narrative: "In the partnership's books, the accounting profit (before salaries and interest, which are appropriations) is credited to the partners' current accounts. Here that's £108,000 + £20,000 + £3,000 = £131,000, split using the same steps as the tax allocation: salary £20,000 to Anna, interest £2,000 and £1,000, and the balance of £108,000 shared 60:40.",
        lines: [
          { account: "Appropriation account", dr: 131000 },
          { account: "Current account – A Fenwick", cr: 86800 },
          { account: "Current account – R Shah", cr: 44200 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "partner-share",
      prompt:
        "A partnership's tax-adjusted trading profit for 2026/27 (31 March year end) is £120,000. Partner A is entitled to a salary of £20,000. Interest on capital is 5%: A's capital is £40,000 and B's is £20,000. The balance is shared 60:40 (A:B). What is **B's** taxable share?",
      answer: 39800,
      unit: "£",
      explain: "Allocate salaries first, then interest on capital, then split the balance in the profit-sharing ratio.",
      working: "Interest: A £2,000, B £1,000. Balance: £120,000 − £20,000 − £3,000 = £97,000. B: 40% × £97,000 = £38,800. B's total: £1,000 + £38,800 = **£39,800**. (A: £20,000 + £2,000 + £58,200 = £80,200.)",
    },
    {
      kind: "numeric",
      id: "ratio-change",
      prompt:
        "Two partners, C and D, share profits equally until 30 September 2026. From 1 October 2026 a new partner, E, joins and profits are shared C 40%, D 40%, E 20%. The partnership's tax-adjusted profit for the year to 31 March 2027 is £180,000, accruing evenly, and there are no salaries or interest. What is **C's** share for 2026/27?",
      answer: 81000,
      unit: "£",
      explain: "Time-apportion the profit to the periods before and after the change, then apply the ratio in force in each period.",
      working: "6 months to 30 September: £90,000 × 50% = £45,000. 6 months from 1 October: £90,000 × 40% = £36,000. C's total: **£81,000**.",
    },
    {
      kind: "journal",
      id: "appropriation-journal",
      prompt:
        "A partnership's accounting profit available for appropriation is £60,000. Partner X is credited with a salary of £10,000 and the balance is shared equally between X and Y. Post the appropriation to the partners' current accounts.",
      accounts: ["Appropriation account", "Current account – X", "Current account – Y", "Wages and salaries", "Drawings – X", "Bank"],
      answer: [
        { account: "Appropriation account", dr: 60000 },
        { account: "Current account – X", cr: 35000 },
        { account: "Current account – Y", cr: 25000 },
      ],
      explain:
        "A partner's salary is an appropriation of profit, not an expense, so it isn't debited to wages. X gets £10,000 + half of £50,000 = £35,000, and Y gets £25,000. Drawings are a separate entry when cash is actually taken out.",
    },
    {
      kind: "mcq",
      id: "late-sa800",
      prompt: "A partnership with five partners files its 2025/26 SA800 online on 3 February 2027. What initial late filing penalties are charged?",
      options: ["£100 in total", "£100 for each partner: £500 in total", "Nothing, because the partners' own returns were on time", "£100 only for the nominated partner"],
      answer: 1,
      explain: "The initial £100 late filing penalty is charged on every person who was a partner during the period covered by the return.",
    },
    {
      kind: "classify",
      id: "addbacks",
      prompt: "When working out a partnership's tax-adjusted profit, how should each item charged in the accounts be treated?",
      categories: ["Add back (not deductible)", "Deductible"],
      items: [
        { text: "Salary credited to a partner", answer: 0, why: "An appropriation of profit." },
        { text: "Wages of the practice manager (an employee)", answer: 1 },
        { text: "Interest on partners' capital", answer: 0, why: "An appropriation of profit." },
        { text: "Partners' income tax paid from the partnership bank account", answer: 0, why: "A personal liability of each partner." },
        { text: "Interest on the partnership's bank loan for new equipment", answer: 1, why: "A business borrowing cost." },
      ],
      explain: "Anything that's really a share of profit, or a partner's personal cost, is added back. Genuine business costs, including employees' wages and business loan interest, remain deductible.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-transparent",
      prompt: "Who pays income tax on a general partnership's trading profit?",
      options: ["The partnership", "Each partner, on their share", "The nominated partner only", "HMRC deducts it at source"],
      answer: 1,
      explain: "The partnership is transparent. Each partner pays income tax and Class 4 NIC on their own share through Self Assessment.",
    },
    {
      kind: "mcq",
      id: "q-sa800",
      prompt: "What is the online filing deadline for the 2026/27 partnership return?",
      options: ["31 October 2027", "31 January 2028", "5 April 2028", "31 July 2027"],
      answer: 1,
      explain: "The online deadline is 31 January after the end of the tax year, the same as for individual returns.",
    },
    {
      kind: "mcq",
      id: "q-salary",
      prompt: "A partner receives a 'salary' of £25,000 under the partnership agreement. How is it taxed?",
      options: ["Through PAYE as employment income", "As part of that partner's share of trading profit", "It's tax-free", "It's deducted from the partnership's profit as an expense"],
      answer: 1,
      explain: "A partnership salary is a profit allocation. It's taxed as part of the partner's trading income, with Class 4 NIC, not through PAYE.",
    },
    {
      kind: "mcq",
      id: "q-basis",
      prompt: "A partnership has a 30 June year end. How is each partner's 2026/27 taxable profit worked out?",
      options: [
        "Using the accounts for the year ending 30 June 2026",
        "By apportioning the accounts for the years ending 30 June 2026 and 30 June 2027 to the tax year",
        "Using the accounts for the year ending 30 June 2027",
        "Using the average of the last three years",
      ],
      answer: 1,
      explain: "Since 2024/25, profits are taxed on the tax-year basis, so non-March year ends require apportionment across two accounting periods.",
    },
    {
      kind: "mcq",
      id: "q-mtd-partner",
      prompt: "Does a partner's share of partnership profit count towards their qualifying income for MTD for Income Tax?",
      options: ["Yes, in full", "Yes, but only half", "No: partnership income isn't qualifying income", "Only for LLP members"],
      answer: 2,
      explain: "HMRC's guidance excludes a partner's share of partnership profit from qualifying income. Partnerships themselves don't yet have an MTD start date.",
    },
  ],
  sources: [
    { label: "Partnership Tax Return (SA800) and guide", url: "https://www.gov.uk/government/publications/self-assessment-partnership-tax-return-sa800" },
    { label: "Changes to reporting income from self-employment and partnerships (basis period reform)", url: "https://www.gov.uk/guidance/changes-to-reporting-income-from-self-employment-and-partnerships" },
    { label: "SALF506A – penalties for failure to file a partnership return", url: "https://www.gov.uk/hmrc-internal-manuals/self-assessment-legal-framework/salf506a" },
    { label: "Work out your qualifying income for Making Tax Digital for Income Tax", url: "https://www.gov.uk/guidance/work-out-your-qualifying-income-for-making-tax-digital-for-income-tax" },
    { label: "HMRC Partnership Manual", url: "https://www.gov.uk/hmrc-internal-manuals/partnership-manual" },
  ],
};
