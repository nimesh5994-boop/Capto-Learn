import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "close-companies-and-ct61",
  title: "Close companies and the CT61 return",
  level: "advanced",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "What makes a company 'close', the consequences (loans to participators, benefits treated as distributions, close investment-holding companies), and the CT61 return for income tax a company must deduct when it pays interest to individuals, such as a director lending to the company.",
  objectives: [
    "Apply the close company tests: five or fewer participators, or participator-directors",
    "List the main tax consequences of close company status and where they're covered",
    "Identify payments requiring deduction of income tax and complete the CT61 cycle",
    "Post the journal for interest paid to a director with tax deducted",
  ],
  body: [
    {
      kind: "md",
      md: `Nearly every owner-managed company your practice looks after is a **close company**. The status itself doesn't change the CT rate, but it triggers anti-avoidance rules designed to stop owners extracting value without tax. You need to recognise it, and the CT61 obligation that often goes with director loans, because both are frequently missed.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The definition (CTA 2010 s439)",
      md: `A UK-resident company is **close** if it is under the **control** of:
- **five or fewer participators**, or
- **any number of participators who are directors**.

A **participator** is broadly anyone with a share or interest in the capital or income of the company (shareholders, loan creditors and people with rights to acquire shares). **Associates** of a participator (spouse or civil partner, parents and remoter ancestors, children and remoter issue, siblings, business partners, and trustees of settlements they made) have their holdings **attributed** to the participator. "Control" means more than 50% of the shares, votes, income or assets on a winding up.

Main exclusions: companies controlled by non-close companies (e.g. a subsidiary of a listed group), and listed companies with at least 35% of voting shares held by the public.`,
    },
    {
      kind: "table",
      caption: "Consequences of close company status",
      head: ["Rule", "Effect", "Where covered"],
      rows: [
        ["Loans to participators (CTA 2010 s455)", "Tax charge on loans outstanding 9 months and 1 day after the AP end: **35.75%** for loans made on or after 6 April 2026 (33.75% for loans made from 6 April 2022 to 5 April 2026); repaid when the loan is repaid (s458)", "*Directors, DLA & profit extraction* track"],
        ["Benefits to participators or their associates that aren't taxable as employment income (s1064; s1065 excludes employment benefits)", "Cost of the benefit treated as a **distribution** (not deductible for the company; taxed as dividend income)", "Below"],
        ["Close investment-holding companies (s18N)", "Main rate 25% on all profits, no small profits rate or marginal relief", "Property income lesson"],
        ["Transfers of value by the company (IHTA 1984 s94)", "For inheritance tax, the transfer is apportioned to the participators as if each had made their share of it", "Advanced tax"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Benefits to non-working shareholders",
      md: `If a close company pays for a car or holiday for a participator (or an associate of one) and the benefit isn't taxable as employment income on anyone, it's a **distribution** (s1064): not deductible for CT and taxed on the participator as dividend income.

Check the employment link first. s1065 takes benefits taxable as employment income out of s1064. A director is an office holder taxed under the benefits code, and a benefit the company provides for a member of a director's or employee's **family or household** (spouse or civil partner, children and their spouses, parents, dependants) is treated as provided by reason of the employment and taxed on the director or employee (ITEPA 2003 s201; EIM20504). So in a typical family company, a holiday for the director's adult son is a **benefit in kind on the director** (P11D or payrolled, Class 1A NIC for the company), not a distribution. The distribution rule bites where nobody connected to the benefit is an employee or director: for example a benefit for a non-working shareholder whose family has no-one employed by the company, or for an associate (such as a sibling) who isn't in an employee's family or household.`,
    },
    {
      kind: "md",
      md: `### The CT61 return

When a UK company pays **yearly interest** (interest on a loan capable of lasting more than a year) to an **individual**, it must **deduct income tax at 20%** and pay it to HMRC. The commonest example in practice: **interest on a director's credit loan account** or on a loan from a shareholder or family member. Other payments needing deduction include certain annual payments and patent royalties.

No deduction is needed on interest paid to a UK bank, to another UK company (which pays CT on it), or to a lender abroad with a treaty clearance.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The CT61 cycle",
      md: `- **Return periods:** quarters ending **31 March, 30 June, 30 September and 31 December**, plus the company's accounting period end if it falls between them (which splits a quarter into two return periods).
- **Deadline:** the return, and the tax, are due **within 14 days** of the end of the return period in which the interest was paid. A return is only needed for periods in which tax was deducted.
- **Paid on payment, not accrual:** income tax is due when the interest is **paid** (or credited to the director's loan account so it's available to draw), not when it's accrued in the accounts.
- Give the recipient a **certificate of tax deducted** (form R185 or equivalent). They report the gross interest on their tax return and get credit for the 20%.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Why pay interest to a director at all?",
      md: `Interest on a director's loan to the company is deductible for the company (a loan relationship debit) and, for the director, can be covered by the personal savings allowance and starting rate for savings. It can be a tax-efficient way to extract funds, but only with a proper loan agreement, a commercial rate, the 20% deduction and the CT61. Without the CT61 compliance, HMRC can charge the tax, interest and penalties.`,
    },
  ],
  scenario: {
    title: "Interest on Mr Bashir's loan to Bashir Opticians Ltd",
    narrative: `**Bashir Opticians Ltd** (Bradford) is owned 60% by Imran Bashir (a director) and 40% by his wife Nadia (not a director, not employed). Imran lent the company **£100,000** in 2024 under a written loan agreement at **5%** interest a year, paid annually on 30 June. The company's year end is **30 September**.

In September 2026 the company also paid **£3,600** for a holiday for the couple's son, Zayn (age 24), who holds no shares and doesn't work for the company. The bookkeeper asks: *"Imran says he gets his £5,000 interest every June. Do we need to do anything?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Close company?** Imran and Nadia are associates, so Imran's interest includes Nadia's: 100% control by one participator. **Close.**

**2. The interest.** £100,000 × 5% = **£5,000** yearly interest paid to an individual on 30 June 2026. The company must deduct **20%**: pay Imran **£4,000** and HMRC **£1,000**.

**3. CT61.** 30 June 2026 falls in the return period **1 April to 30 June 2026**. Return and payment due by **14 July 2026**. Give Imran a certificate of tax deducted showing £5,000 gross and £1,000 tax.

If, as the bookkeeper's question suggests, the company has been paying the full £5,000 gross each June, the past CT61s are missing: file them, pay the tax, and expect interest. The CT deduction for the interest isn't affected.`,
      },
      {
        kind: "journal",
        title: "Paying the June 2026 interest",
        narrative: "Gross interest is the company's expense; the 20% is a liability to HMRC.",
        lines: [
          { account: "Loan interest payable", dr: 5000 },
          { account: "Bank", cr: 4000 },
          { account: "Income tax deducted payable (CT61)", cr: 1000 },
        ],
      },
      {
        kind: "md",
        md: `**4. Zayn's holiday.** Zayn isn't a participator himself, but he's an **associate** (child) of Imran and Nadia, so at first sight s1064 could make the £3,600 a distribution. But Zayn is also a member of **Imran's family**, and Imran is a director. A benefit the company provides for a director's family is treated as provided by reason of the employment and is taxed on Imran under the benefits code (ITEPA 2003 s201; EIM20504). Because it is taxable as employment income, s1065 takes it **out of** the distribution rules.

So: report the £3,600 as a benefit in kind for Imran (P11D, or payroll it), and the company pays **Class 1A NIC** on it. As an employment cost it is normally deductible for CT. If Imran would rather not pay income tax on a benefit at his marginal rate, the alternative is for him to pay for the holiday himself out of a lawful dividend or salary.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "is-it-close",
      prompt: "Is each UK company a close company?",
      categories: ["Close", "Not close"],
      items: [
        { text: "Six unrelated shareholders hold 16⅔% each; none are directors", answer: 0, why: "Any five of them together hold 83%, so five or fewer participators control it." },
        { text: "Owned 50/50 by two unrelated directors", answer: 0 },
        { text: "100% subsidiary of a FTSE 100 company", answer: 1, why: "Controlled by a non-close company." },
        { text: "Ten family members each hold 10%; the father holds 10% and is the only director", answer: 0, why: "Associates' holdings are attributed: the father controls 100%." },
        { text: "Twenty unrelated employee shareholders hold 5% each; four of them are directors", answer: 1, why: "Directors hold 20%; any five hold only 25%." },
      ],
      explain: "Control by five or fewer participators (counting associates) or by participator-directors makes a company close.",
    },
    {
      kind: "numeric",
      id: "ct61-tax",
      prompt:
        "A company pays a shareholder £7,250 of yearly interest (gross) on a loan in August 2026. How much income tax must it pay HMRC with its CT61?",
      answer: 1450,
      unit: "£",
      explain: "Deduct income tax at the basic rate of 20% from yearly interest paid to an individual.",
      working: "£7,250 × 20% = **£1,450** (due by 14 October 2026, for the return period ending 30 September 2026)",
    },
    {
      kind: "mcq",
      id: "ct61-deadline",
      prompt: "A company with a 31 December year end pays interest to a director, with tax deducted, on 10 May 2026. When is the CT61 due?",
      options: ["14 May 2026", "14 July 2026", "19 June 2026", "With the CT600"],
      answer: 1,
      explain: "10 May falls in the return period 1 April to 30 June 2026. The return and tax are due within 14 days of the end of that period.",
    },
    {
      kind: "journal",
      id: "ct61-journal",
      prompt:
        "A company credits a director's loan account with interest of £2,400 gross, deducting income tax at 20%. Post the entry.",
      accounts: ["Loan interest payable", "Director's loan account", "Income tax deducted payable (CT61)", "Bank", "Dividends paid", "Corporation tax payable"],
      answer: [
        { account: "Loan interest payable", dr: 2400 },
        { account: "Director's loan account", cr: 1920 },
        { account: "Income tax deducted payable (CT61)", cr: 480 },
      ],
      explain:
        "The company's expense is the gross interest. The director is credited with the net amount (80%) and the 20% is owed to HMRC through the CT61. Crediting the loan account counts as payment for CT61 purposes.",
    },
    {
      kind: "numeric",
      id: "s455-quick",
      prompt:
        "A close company's year ends 31 March 2027. In June 2026 it lent a participator £20,000, which is still outstanding on 2 January 2028. What s455 tax is due?",
      answer: 7150,
      unit: "£",
      explain: "s455 applies to loans to participators still outstanding 9 months and 1 day after the year end (here, after 1 January 2028). The rate follows the dividend upper rate: 35.75% for loans made on or after 6 April 2026.",
      working: "£20,000 × 35.75% = **£7,150**",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-close-def",
      prompt: "A close company is one controlled by:",
      options: [
        "Ten or fewer shareholders",
        "Five or fewer participators, or any number of participator-directors",
        "Its directors only",
        "A single family",
      ],
      answer: 1,
      explain: "CTA 2010 s439.",
    },
    {
      kind: "mcq",
      id: "q-associate",
      prompt: "Which of these is NOT an associate of a participator for close company purposes?",
      options: ["Their spouse", "Their brother", "Their grandchild", "Their cousin"],
      answer: 3,
      explain: "Associates include spouses, ancestors, issue, siblings and partners, but not cousins, nephews or nieces.",
    },
    {
      kind: "mcq",
      id: "q-ct61-rate",
      prompt: "At what rate is income tax deducted from yearly interest a company pays to an individual?",
      options: ["0%", "19%", "20%", "40%"],
      answer: 2,
      explain: "The basic rate, 20%.",
    },
    {
      kind: "mcq",
      id: "q-ct61-bank",
      prompt: "Does a company deduct income tax from interest it pays to its UK bank?",
      options: ["Yes, at 20%", "No", "Only on overdrafts", "Only if the loan is over £1m"],
      answer: 1,
      explain: "No deduction is required on interest paid to UK banks or UK companies.",
    },
    {
      kind: "mcq",
      id: "q-distribution",
      prompt: "A close company pays the private school fees of a non-working shareholder's child. Neither parent is a director or employee of the company. How is it treated?",
      options: [
        "Benefit in kind on a P11D",
        "Distribution: not deductible for the company, taxed on the shareholder as a dividend",
        "Allowable staff cost",
        "Exempt",
      ],
      answer: 1,
      explain: "A benefit for a participator or associate that isn't taxable as employment income is a distribution in a close company (s1064). If a parent were a director or employee, the fees would be a benefit in kind on that parent instead (ITEPA s201; s1065).",
    },
  ],
  sources: [
    { label: "CTM60060: Close companies – broad definition", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm60060" },
    { label: "CTM60210: Close companies – control", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm60210" },
    { label: "CTM61505: Loans to participators – general", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505" },
    { label: "Corporation Tax: return of Income Tax on company payments (CT61)", url: "https://www.gov.uk/government/publications/corporation-tax-return-of-income-tax-on-company-payments-ct61" },
    { label: "COM23135: Companies deducting income tax from certain payments (CT61)", url: "https://www.gov.uk/hmrc-internal-manuals/cotax-manual/com23135" },
    { label: "EIM20504: benefits provided for an employee's family or household", url: "https://www.gov.uk/hmrc-internal-manuals/employment-income-manual/eim20504" },
    { label: "CTM60600: extended meaning of distribution – directors' and employees' benefits", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm60600" },
    { label: "IHTM04068: transfer of value by a close company", url: "https://www.gov.uk/hmrc-internal-manuals/inheritance-tax-manual/ihtm04068" },
    { label: "CTA 2010 s439: close company", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/439" },
  ],
};
