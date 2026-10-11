import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "ct600-filing-payment-and-penalties",
  title: "The CT600, iXBRL, payment dates and penalties",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "What goes into a company tax return, how it must be filed (online, iXBRL, commercial software since HMRC's free service closed), when tax is due for companies that aren't large, and the late filing penalties that doubled for returns due from 1 April 2026.",
  objectives: [
    "List the components of a complete company tax return and the iXBRL tagging requirement",
    "State the normal payment date and filing date for an accounting period",
    "Calculate flat-rate and tax-geared late filing penalties under the rates applying from 1 April 2026",
    "Explain how late payment interest and repayment interest work for corporation tax",
  ],
  body: [
    {
      kind: "md",
      md: `Corporation tax works on **self-assessment**: the company calculates its own liability, files a return and pays by the due date, without waiting for HMRC to send a bill. HMRC issues a **notice to deliver a return** (CT603) for each accounting period, but the payment date doesn't depend on it.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "A complete company tax return",
      md: `- The **CT600** form (plus supplementary pages where needed, e.g. CT600A for loans to participators, CT600C for group relief).
- The company's **statutory accounts** for the period of account.
- The **tax computation** showing how the figures on the CT600 were worked out.

All of it must be filed **online**. The accounts and computations must be in **iXBRL** (inline XBRL), which tags each figure so HMRC's systems can read it. HMRC's free online filing service closed on **31 March 2026**, so from 1 April 2026 returns must be filed through **commercial software** (or by an agent using it). Paper returns are accepted only with a reasonable excuse or when filing in Welsh.`,
    },
    {
      kind: "table",
      caption: "Key dates for a company that is not 'large' (12-month accounting period)",
      head: ["What", "When", "Example: year ended 31 March 2027"],
      rows: [
        ["Pay corporation tax", "9 months and 1 day after the end of the accounting period", "1 January 2028"],
        ["File the CT600", "12 months after the end of the period of account", "31 March 2028"],
        ["Companies House accounts (private company)", "9 months after the accounting reference date (separate regime)", "31 December 2027"],
        ["Amend the return (company)", "12 months after the filing date", "31 March 2029"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Payment comes before filing",
      md: `Tax is due **3 months before** the return. Clients who leave their accounts until the filing deadline will usually pay late and owe interest. Work back from the payment date when you schedule year-end work, and send the client the payment figure and reference (the 17-character CT payment reference based on the UTR) as soon as the computation is agreed.

Large companies pay by quarterly instalments instead; see the instalments lesson.`,
    },
    {
      kind: "table",
      caption: "Late filing penalties for returns with a filing date on or after 1 April 2026",
      head: ["Return filed…", "Penalty", "Previously"],
      rows: [
        ["Up to 3 months late", "£200", "£100"],
        ["More than 3 months late", "£400 in total", "£200"],
        ["Late for the third time in a row: up to 3 months late", "£1,000", "£500"],
        ["Late for the third time in a row: more than 3 months late", "£2,000 in total", "£1,000"],
        ["18 months or more after the end of the AP (6 months after the filing date)", "Plus 10% of the tax unpaid at that date", "Unchanged"],
        ["24 months or more after the end of the AP", "Plus 20% of the tax unpaid", "Unchanged"],
      ],
    },
    {
      kind: "md",
      md: `If the return is more than 6 months late, HMRC can issue a **determination** of the tax it thinks is due. A determination can't be appealed: the only way to displace it is to file the return.

**Interest.** Late payment interest runs from the due date to the date of payment, at the Bank of England base rate plus 4%. HMRC pays repayment interest on overpaid tax (from the later of the due date and the date paid) at base rate minus 1%, with a 0.5% minimum. Both change whenever the base rate changes, so look up the current rate on HMRC's interest rates page. For a company, interest paid to HMRC is **deductible** and repayment interest is **taxable**, both as non-trading loan relationship items.

**Inaccuracy penalties** for careless or deliberate errors in a return (up to 30%, 70% or 100% of the extra tax), and **record-keeping** failures (records must normally be kept for 6 years) are covered in the enquiries lesson.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Reasonable excuse",
      md: `Penalties can be cancelled on appeal if the company had a **reasonable excuse** (e.g. serious illness of the sole director, a failure of HMRC's systems) and filed without unreasonable delay once it ended. Pressure of work, relying on someone else, or not knowing the deadline are not reasonable excuses.`,
    },
  ],
  scenario: {
    title: "Catching up on Quayside Studios Ltd",
    narrative: `**Quayside Studios Ltd**, a photography company, has a **31 December** year end. A new client, it comes to you on **12 June 2027** having not filed its return for the year ended **31 December 2025**. It also filed late for the two previous years (both under 3 months late). Its CT for 2025 is **£14,800**, none of it paid yet.

The director, Ellie, asks: *"How bad is it?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Deadlines for the year ended 31 December 2025.** Payment was due **1 October 2026**. The filing date was **31 December 2026**, on or after 1 April 2026, so the **new penalty rates** apply.

**2. How late?** On 12 June 2027 the return is over **5 months** late. If you can file before **30 June 2027** (18 months after the end of the AP) the 10% tax-geared penalty is avoided.

**3. Third late return in a row.** Both previous returns were late, so this is the third successive failure: the flat penalties are **£1,000**, rising to **£2,000** in total because the return is more than 3 months late.

**4. Interest** has been running on the £14,800 since 1 October 2026 and continues until it's paid.`,
      },
      {
        kind: "table",
        caption: "Exposure if filed and paid on 25 June 2027",
        head: ["Item", "Amount"],
        rows: [
          ["Flat-rate penalties (third successive late return, > 3 months late)", "£2,000"],
          ["Tax-geared penalty (filed before 30 June 2027)", "£0"],
          ["Corporation tax", "£14,800"],
          ["Late payment interest from 1 October 2026", "At HMRC's late payment rate for the period"],
        ],
      },
      {
        kind: "md",
        md: `**Advice.** Prioritise this return so it's filed before 30 June 2027, pay the tax at the same time to stop interest, and get the 2026 accounts moving immediately: their payment date is 1 October 2027. Ellie's busy season isn't a reasonable excuse, so an appeal against the £2,000 is unlikely to succeed.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "flat-penalty",
      prompt:
        "A company's return for the year ended 31 December 2025 (filing date 31 December 2026) is filed on 15 May 2027. It hasn't filed late before. What is the flat-rate late filing penalty?",
      answer: 400,
      unit: "£",
      explain: "The filing date is on or after 1 April 2026, so the new rates apply. The return is more than 3 months late.",
      working: "£200 for being late + a further £200 for being more than 3 months late = **£400**",
    },
    {
      kind: "numeric",
      id: "tax-geared",
      prompt:
        "A company's year ended 30 June 2025 (filing date 30 June 2026). It files on 15 February 2027, more than 18 months after the end of the period but less than 24 months, with £30,000 of tax still unpaid at 31 December 2026. It hasn't filed late before. What are the total late filing penalties?",
      answer: 3400,
      unit: "£",
      explain:
        "Flat penalties at the new rates (filing date after 1 April 2026) total £400 for more than 3 months late. The return is also more than 18 months after the end of the AP, so 10% of the tax unpaid at that point is added.",
      working: "Flat: £400\n\nTax-geared: 10% × £30,000 = £3,000\n\nTotal **£3,400**",
    },
    {
      kind: "mcq",
      id: "payment-date",
      prompt: "A small company's accounting period ends on 30 September 2026. When is its corporation tax due?",
      options: ["30 June 2027", "1 July 2027", "30 September 2027", "31 January 2028"],
      answer: 1,
      explain: "9 months and 1 day after the end of the AP: 1 July 2027.",
    },
    {
      kind: "multi",
      id: "return-parts",
      prompt: "Which of these must be filed with HMRC as part of a company tax return? Select all that apply.",
      options: [
        "The CT600",
        "The statutory accounts in iXBRL",
        "The tax computation in iXBRL",
        "The confirmation statement",
        "The directors' Self Assessment returns",
      ],
      answers: [0, 1, 2],
      explain: "A complete return is the CT600, accounts and computation. The confirmation statement goes to Companies House; directors' returns are separate.",
    },
    {
      kind: "mcq",
      id: "free-service",
      prompt: "A small client used HMRC's free online service to file its CT600 in 2025. How can it file its 2026 return?",
      options: [
        "Using the same HMRC service",
        "On paper, as a matter of course",
        "Using commercial software, directly or through an agent",
        "By emailing a PDF to HMRC",
      ],
      answer: 2,
      explain: "HMRC's service closed on 31 March 2026. Commercial software is now needed; paper is allowed only with a reasonable excuse or for Welsh returns.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-filing-date",
      prompt: "When is the CT600 normally due for a 12-month accounting period?",
      options: ["9 months after the end of the period", "12 months after the end of the period", "31 January after the period", "3 months after the end of the period"],
      answer: 1,
      explain: "12 months after the end of the period of account.",
    },
    {
      kind: "mcq",
      id: "q-new-penalty",
      prompt: "For a return with a filing date on or after 1 April 2026, what is the initial flat penalty for filing up to 3 months late (not a repeat offender)?",
      options: ["£100", "£200", "£500", "£1,000"],
      answer: 1,
      explain: "It doubled from £100 to £200.",
    },
    {
      kind: "mcq",
      id: "q-ixbrl",
      prompt: "In what format must accounts and computations be filed with the CT600?",
      options: ["PDF", "iXBRL", "Excel", "Paper"],
      answer: 1,
      explain: "Inline XBRL, so HMRC can read the tagged data.",
    },
    {
      kind: "mcq",
      id: "q-determination",
      prompt: "How can a company displace an HMRC determination issued because its return is overdue?",
      options: ["Appeal to the tribunal", "Write to HMRC disputing the figure", "File the return", "Pay the determined amount"],
      answer: 2,
      explain: "A determination can't be appealed; it's replaced when the company files its return.",
    },
    {
      kind: "mcq",
      id: "q-interest-ct",
      prompt: "How is late payment interest paid by a company to HMRC treated for corporation tax?",
      options: ["Disallowable", "Deductible as a non-trading loan relationship debit", "Deductible as a trading expense", "Added to the tax liability"],
      answer: 1,
      explain: "Interest on late-paid tax is a non-trading loan relationship debit for a company (penalties are not deductible).",
    },
  ],
  sources: [
    { label: "Company Tax Returns (GOV.UK)", url: "https://www.gov.uk/company-tax-returns" },
    { label: "Company Tax Returns: penalties for late filing (GOV.UK)", url: "https://www.gov.uk/company-tax-returns/penalties-for-late-filing" },
    { label: "Increases to Corporation Tax late filing penalties (policy paper)", url: "https://www.gov.uk/government/publications/corporation-tax-increases-to-late-filing-penalties/increases-to-corporation-tax-late-filing-penalties" },
    { label: "Filing company accounts and tax returns if you previously used the HMRC online service", url: "https://www.gov.uk/guidance/closure-of-the-service-to-file-your-company-accounts-and-tax-return" },
    { label: "Pay your Corporation Tax bill (GOV.UK)", url: "https://www.gov.uk/pay-corporation-tax" },
    { label: "HMRC interest rates for late and early payments", url: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates" },
  ],
};
