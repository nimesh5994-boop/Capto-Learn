import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "llp-compliance",
  title: "LLP compliance: members, designated members and filings",
  level: "advanced",
  minutes: 35,
  summary:
    "How company secretarial work differs for a limited liability partnership: members and designated members, the LL forms and their deadlines, the members' agreement and the default rules, LLP PSCs, LLP accounts and the members' interests presentation, and how LLP members are taxed.",
  objectives: [
    "Explain the roles of members and designated members and the minimum numbers required",
    "Use the correct LL forms and deadlines for member changes and annual filings",
    "Apply the LLP default rules where there's no members' agreement, and identify PSCs in an LLP",
    "Prepare the members' interests entries in LLP accounts and explain how members are taxed",
  ],
  body: [
    {
      kind: "md",
      md: `An LLP is a body corporate with its own legal personality and limited liability, created under the **Limited Liability Partnerships Act 2000**, but internally it's run like a partnership and for tax it's (usually) **transparent**. Most of the Companies Act is applied to LLPs by regulation, with modifications, so the compliance calendar looks familiar. The differences are where the mistakes happen.`,
    },
    {
      kind: "table",
      caption: "Company vs LLP: the cosec differences",
      head: ["", "Company", "LLP"],
      rows: [
        ["Owners", "Shareholders", "Members (no shares)"],
        ["Managers / officers", "Directors (and optional secretary)", "Members; **designated members** carry the statutory duties"],
        ["Minimum", "One director who's a natural person", "**Two members** and at least **two designated members**"],
        ["Constitution", "Articles of association (public, filed)", "**Members' agreement** (private, not filed) plus the default rules in the LLP Regulations 2001"],
        ["Profit extraction", "Salary, dividends", "Profit shares and drawings; no dividends"],
        ["Tax", "Corporation tax on the company", "Members taxed individually on their profit shares (income tax and Class 4 NIC); LLP files a partnership return"],
        ["Forms", "AP01, TM01, CS01, AA01…", "LL AP01, LL TM01, LL CS01, LL AA01…"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Designated members",
      md: `Designated members are responsible for the LLP's statutory compliance: signing and delivering the accounts, the confirmation statement, notifying changes, and appointing auditors. An LLP must have **at least two**. It can either name specific designated members or state that **every member** is a designated member. If the number of designated members falls below two, every member is treated as designated (LLPA 2000 s8).

If an LLP carries on business with **only one member** for more than **6 months**, that member can become personally liable for debts incurred after the 6 months (LLPA 2000 s4A).`,
    },
    {
      kind: "md",
      md: `### Filings and deadlines

- **Member changes** (appointment, cessation, change of details, or change in designated status): file **LL AP01 / LL TM01 / LL CH01** within **14 days**. New members must have verified their identity, as for directors.
- **Confirmation statement (LL CS01)**: same rules and fee as a company (£50 online), including the lawful purpose statement and registered email address.
- **Registered office (LL AD01)**, **change of name**, **year end (LL AA01)** and **strike-off (LL DS01)** work as for companies.
- **Accounts**: due **9 months** after the year end (21 months from incorporation for a first period over 12 months), with the same late filing penalties as a private company: £150 / £375 / £750 / £1,500.`,
    },
    {
      kind: "md",
      md: `### The members' agreement and the default rules

There's no requirement for a written members' agreement, but without one the **default rules** in the LLP Regulations 2001 (regs 7 and 8) apply. Among them:

- members share **capital and profits equally**;
- every member may take part in management;
- no member is entitled to **remuneration** for acting in the business;
- no majority can **expel** a member unless the members have expressly agreed a power to do so (reg 8);
- ordinary matters are decided by a majority, but a change in the nature of the business needs unanimity.

These defaults rarely reflect what the members intended, especially "share profits equally" and "no expulsion". Always ask to see the agreement, and recommend one if there isn't.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "PSCs in an LLP",
      md: `The PSC regime applies to LLPs with adapted conditions. A person is a PSC if they (directly or indirectly):
- hold rights to more than **25% of the surplus assets** on a winding up;
- hold more than **25% of the voting rights** on matters decided by the members;
- have the right to appoint or remove a **majority of those entitled to take part in management**; or
- otherwise have the right to exercise, or actually exercise, significant influence or control.

Where the members' agreement is silent on surplus assets, the default rule (equal shares) applies, so in an LLP with three equal members, each holds 33⅓% and is a PSC.`,
    },
    {
      kind: "md",
      md: `### LLP accounts in brief

LLP accounts follow the Companies Act as applied by the LLP (Accounts and Audit) Regulations 2008, and the **LLP SORP** published by the CCAB. Small and micro LLPs use the same size thresholds as companies (for periods beginning on or after 6 April 2025: small up to £15m turnover / £7.5m balance sheet / 50 employees; micro up to £1m / £500k / 10, meeting two of the three).

The distinctive feature is **members' interests**. Amounts owed to members that they could demand (e.g. profit allocated automatically under the agreement) are **"loans and other debts due to members"** (a liability). Profits not yet divided, where division is at the members' discretion, are **"members' other interests"** (equity). Whether profit is an expense ("members' remuneration charged as an expense") or an appropriation depends on what the agreement says.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Salaried members",
      md: `Members who look more like employees (a fixed "salary", little real influence, small capital contribution) may be taxed as **employees** under the **salaried members rules** (ITTOIA 2005 s863A onwards), with PAYE and employer NIC. Flag any LLP paying members fixed amounts regardless of profit.`,
    },
  ],
  scenario: {
    title: "Year end for Castlegate Surveyors LLP",
    narrative: `Castlegate Surveyors LLP has three members: Alan Pike, Bryony Lowe and Chris Nwosu. All three are designated members. Their signed members' agreement says profits are divided **50% / 30% / 20%** only once the members decide (so profits are not automatically allocated), and surplus assets on a winding up are shared in the same ratios.

For the year ended 30 April 2026 the profit available for discretionary division is **£180,000**. At a members' meeting on 15 July 2026 they agree to divide it. Bryony wants to retire on 31 October 2026 and Chris wants to stop being a designated member.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Accounts presentation.** At 30 April 2026 the profit hadn't been divided and division was discretionary, so the £180,000 sits in **members' other interests** (equity) in the balance sheet. It becomes a debt due to members when they divide it in July.
2. **Division in July.** Alan £90,000, Bryony £54,000, Chris £36,000, credited to their current accounts (loans and other debts due to members). See the journal.
3. **Accounts deadline.** 9 months after 30 April 2026: **31 January 2027**. The members approve the accounts and a member signs the balance sheet; the designated members are responsible for delivering them on time.
4. **Bryony's retirement.** File **LL TM01** within 14 days of 31 October 2026. Afterwards there are two members, Alan and Chris, so the two-member minimum is met.
5. **Chris stops being designated.** If Chris ceases to be a designated member after Bryony leaves, only Alan would be designated, below the minimum of two. Under s8 every member is then treated as designated, so Chris would be designated anyway. Advise him that it can't be done unless another designated member is appointed.
6. **PSCs.** Alan (50% of surplus assets) and Bryony (30%) are PSCs. Chris at 20% isn't, unless his voting rights exceed 25% (check the agreement). When Bryony leaves, the shares of surplus assets will be re-set under the agreement: review the PSC register then.
7. **Tax.** Each member pays income tax and Class 4 NIC on their share of the profits through self-assessment, and the LLP files the partnership return. Since basis period reform, profits are taxed on a tax-year basis, so the year to 30 April 2026 is apportioned between 2025/26 and 2026/27.`,
      },
      {
        kind: "journal",
        title: "Division of the 2026 profit on 15 July 2026",
        lines: [
          { account: "Members' other interests – profit available for division", dr: 180000 },
          { account: "Members' current account – A Pike", cr: 90000 },
          { account: "Members' current account – B Lowe", cr: 54000 },
          { account: "Members' current account – C Nwosu", cr: 36000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "llp-profit-division",
      prompt:
        "Hartley Design LLP has £96,000 of profit available for discretionary division. The members decide to divide it equally among its three members, Dee, Ed and Fran. Post the division.",
      accounts: [
        "Members' other interests – profit available for division",
        "Members' current account – Dee",
        "Members' current account – Ed",
        "Members' current account – Fran",
        "Dividends paid",
        "Share capital – ordinary",
      ],
      answer: [
        { account: "Members' other interests – profit available for division", dr: 96000 },
        { account: "Members' current account – Dee", cr: 32000 },
        { account: "Members' current account – Ed", cr: 32000 },
        { account: "Members' current account – Fran", cr: 32000 },
      ],
      explain:
        "On division, the undivided profit (equity) becomes a debt due to each member: £96,000 ÷ 3 = £32,000 each. LLPs have no share capital and pay no dividends.",
    },
    {
      kind: "mcq",
      id: "llp-default-profit",
      prompt: "Two members set up an LLP with no members' agreement. One contributed £90,000 of capital, the other £10,000. How are profits shared?",
      options: ["90:10, in proportion to capital", "Equally, under the default rules", "As decided by the designated members", "Profits must be retained until an agreement is signed"],
      answer: 1,
      explain: "Without an agreement, the LLP Regulations 2001 reg 7 default rules apply: capital and profits are shared equally.",
    },
    {
      kind: "classify",
      id: "llp-or-company-form",
      prompt: "Which form is used for each event in an LLP?",
      categories: ["LL AP01", "LL TM01", "LL CS01", "LL AA01"],
      items: [
        { text: "A new member joins", answer: 0 },
        { text: "A member retires", answer: 1 },
        { text: "Annual confirmation of the LLP's details", answer: 2 },
        { text: "The LLP shortens its accounting reference period", answer: 3 },
      ],
      explain: "LLP forms mirror the company forms with an 'LL' prefix.",
    },
    {
      kind: "numeric",
      id: "llp-psc-count",
      prompt:
        "An LLP's agreement gives its five members these shares of surplus assets on a winding up: 30%, 26%, 20%, 14% and 10%. Voting is one member, one vote, and no one has special appointment rights. How many members are PSCs?",
      answer: 2,
      unit: "",
      explain: "Only members holding more than 25% of surplus assets meet that condition; with five members voting equally, each has 20% of votes, below the threshold.",
      working: "30% and 26% exceed 25%: **2 PSCs**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-llp-min-designated",
      prompt: "What is the minimum number of designated members an LLP must have?",
      options: ["One", "Two", "Three", "None"],
      answer: 1,
      explain: "At least two. If fewer, every member is treated as designated.",
    },
    {
      kind: "mcq",
      id: "q-llp-agreement-filed",
      prompt: "Is an LLP members' agreement filed at Companies House?",
      options: ["Yes, on incorporation", "No, it's a private document", "Only if it changes profit shares", "Only for LLPs with more than 10 members"],
      answer: 1,
      explain: "The members' agreement is private, unlike a company's articles.",
    },
    {
      kind: "mcq",
      id: "q-llp-member-change",
      prompt: "Within what period must an LLP notify Companies House that a member has left?",
      options: ["7 days", "14 days", "28 days", "With the next LL CS01"],
      answer: 1,
      explain: "Member changes are notified within 14 days.",
    },
    {
      kind: "mcq",
      id: "q-llp-penalty",
      prompt: "An LLP files its accounts 2 months late for the first time. What is the penalty?",
      options: ["£150", "£375", "£750", "Nil — LLPs aren't penalised"],
      answer: 1,
      explain: "LLPs have the same penalties as private companies: more than 1 but not more than 3 months late is £375.",
    },
    {
      kind: "mcq",
      id: "q-llp-tax",
      prompt: "How are the profits of a typical trading LLP taxed?",
      options: [
        "Corporation tax on the LLP",
        "Each member pays income tax and Class 4 NIC on their profit share",
        "Dividend tax on members' drawings",
        "PAYE on all members' drawings",
      ],
      answer: 1,
      explain: "A trading LLP is transparent for tax; members are taxed as self-employed partners (subject to the salaried members rules).",
    },
  ],
  sources: [
    { label: "Limited Liability Partnerships Act 2000 s8 – designated members", url: "https://www.legislation.gov.uk/ukpga/2000/12/section/8" },
    { label: "Limited Liability Partnerships Regulations 2001 reg 7 – default provisions", url: "https://www.legislation.gov.uk/uksi/2001/1090/regulation/7" },
    { label: "Limited Liability Partnerships Regulations 2001 reg 8 – expulsion", url: "https://www.legislation.gov.uk/uksi/2001/1090/regulation/8" },
    { label: "Companies House: preparing and filing LLP accounts", url: "https://www.gov.uk/government/publications/limited-liability-partnership-accounts-guidance/llp-accounts" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
    { label: "HMRC Partnership manual: the salaried member guidance (PM251000)", url: "https://www.gov.uk/hmrc-internal-manuals/partnership-manual/pm251000" },
  ],
};
