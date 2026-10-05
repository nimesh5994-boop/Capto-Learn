import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "monthly-returns-nil-returns-and-penalties",
  title: "CIS monthly returns, payments, nil returns and penalties",
  level: "practitioner",
  minutes: 35,
  summary:
    "The contractor's monthly cycle: the tax month from the 6th to the 5th, the return and payment deadlines (19th and 22nd), what the return contains, the reinstated obligation to file nil returns from 6 April 2026, and the late-filing penalties.",
  objectives: [
    "Identify the CIS tax month and the filing and payment deadlines",
    "Prepare the figures for a monthly return from subcontractor payments",
    "Explain what must be declared on the return",
    "Explain the nil return rule from 6 April 2026 and how to notify HMRC of no payments in advance",
    "State the late filing penalties and how to avoid them",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `CIS runs on a **monthly cycle**. Each month the contractor must tell HMRC what it paid each subcontractor and how much it deducted, and pay the deductions over. The cycle is simple but unforgiving: **late returns attract fixed penalties** even if the deductions were paid on time.`,
    },
    {
      kind: "table",
      caption: "The monthly cycle (tax month = 6th to 5th)",
      head: ["What", "Deadline", "Example for the tax month 6 May to 5 June"],
      rows: [
        ["Monthly return (CIS300) to HMRC", "By the **19th** following the end of the tax month", "19 June"],
        ["Payment of deductions to HMRC", "By the **19th** (by post/other) or the **22nd** if paid electronically", "19 June / 22 June"],
        ["Payment and deduction statements to subcontractors", "Within 14 days of the end of the tax month (by the **19th**)", "19 June"],
        ["Nil return (no payments to subcontractors)", "By the **19th** as for a normal return, unless you've told HMRC in advance", "19 June"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What the return contains",
      md: `For each subcontractor paid in the tax month, the **monthly return** shows the **name, UTR/verification number, the gross amount paid (excluding VAT), the cost of materials and the deduction made**. The contractor also makes **declarations**:

- That it has **examined the employment status** of each subcontractor listed and they are not employees (**employment status declaration**).
- That each subcontractor has been **verified**.
- That the **information is correct and complete**.

The return can be filed online through the **CIS online service**, through commercial software or via an agent (a practice needs authority and the correct access). Contractors with the **Employer Payment Summary** use it to claim any **CIS deductions suffered** on their own income.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Nil returns from 6 April 2026",
      md: `From **6 April 2026** contractors must **file a nil return** for any month in which they **don't pay subcontractors**, **unless they have told HMRC in advance** that they won't be making payments. (This reinstates a requirement that had been removed in 2015.) A contractor that expects a quiet period should **notify HMRC** to avoid the return and its penalty risk; check HMRC's guidance for how long a notification lasts and how it is made. If you act for contractors, **add this to your compliance calendar** and your engagement letter.`,
    },
    {
      kind: "table",
      caption: "Late filing penalties for CIS300 returns",
      head: ["Return filed…", "Penalty"],
      rows: [
        ["1 day late", "£100"],
        ["2 months late", "£200 (in addition)"],
        ["6 months late", "£300 or 5% of the CIS deductions on the return, whichever is higher"],
      ],
    },
    {
      kind: "md",
      md: `### Other points

- **Late payment** of deductions: interest and possible surcharge or penalties under the PAYE-style late payment regime.
- **Incorrect returns:** penalties for inaccuracies can apply if the return is wrong. Submitting a **false** declaration, or failing to keep records, can lead to penalties of **up to £3,000**.
- **Amending a return:** submit an **amended return** for the tax month; the later return replaces the earlier one.
- **Quarterly payments:** small contractors whose average monthly deductions are **£1,500 or less** may pay **quarterly** (check CIS340 for the rules).
- **Records:** keep payment records, verification evidence and copies of statements for **three years** after the end of the tax year to which they relate.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A practice workflow",
      md: `1. **By the 5th:** collect the month's payments and invoices.
2. **By the 10th:** check each subcontractor's verification and rate, prepare the return and statements.
3. **By the 14th:** client review and approval; file the return.
4. **By the 19th at the latest:** return filed; statements issued.
5. **By the 22nd:** payment made. Reconcile to the CIS liability account.`,
    },
  ],
  scenario: {
    title: "May 2026 return for Northgate Build Ltd",
    narrative: `For the tax month **6 May to 5 June 2026** Northgate Build Ltd paid three subcontractors:

| Subcontractor | Rate | Gross excl. VAT | Materials at cost |
|---|---:|---:|---:|
| Joel Parks | 20% | £2,800 | £800 |
| Sparkline Electrical Ltd | 0% (GPS) | £5,000 | £1,000 |
| Dev Anand | 30% | £1,500 | £0 |

All three were verified before the first payment.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Return figures",
        head: ["Subcontractor", "Gross excl. VAT", "Materials", "Liable to deduction", "Rate", "Deduction"],
        rows: [
          ["Joel Parks", "£2,800", "£800", "£2,000", "20%", "£400"],
          ["Sparkline Electrical Ltd", "£5,000", "£1,000", "£4,000", "0%", "£0"],
          ["Dev Anand", "£1,500", "£0", "£1,500", "30%", "£450"],
          ["**Total**", "**£9,300**", "**£1,800**", "**£7,500**", "", "**£850**"],
        ],
      },
      {
        kind: "md",
        md: `**Step 1: file.** The return (CIS300) is due by **19 June 2026**. Include the declarations on employment status and verification.

**Step 2: pay.** The total deductions of **£850** are due by **22 June 2026** (electronic) using the CIS reference.

**Step 3: statements.** Issue statements to Joel and Dev by 19 June. Sparkline needs a statement too (showing no deduction).

**Step 4: penalty exposure.** If the return were filed on 25 June, a **£100** penalty would arise automatically. If it were filed more than 2 months late, a further **£200**.

**Step 5: in July.** If Northgate paid no subcontractors in the following tax month, it must file a **nil return** (or have notified HMRC in advance).`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "return-total",
      prompt: "A contractor's monthly return shows deductions of £400, £0 and £450. What is the total deduction to be paid to HMRC (£)?",
      answer: 850,
      unit: "£",
      explain: "Add the deductions for all subcontractors.",
      working: "£400 + £0 + £450 = **£850**.",
    },
    {
      kind: "numeric",
      id: "late-return-penalty",
      prompt: "A CIS300 return is filed 3 months after the due date. What are the fixed penalties incurred in total (£) (the £100 and the £200)?",
      answer: 300,
      unit: "£",
      explain: "£100 for the first day late and a further £200 at two months.",
      working: "£100 + £200 = **£300**.",
    },
    {
      kind: "numeric",
      id: "tax-month",
      prompt: "On which day of the month does the CIS tax month end (the day number)?",
      answer: 5,
      unit: "",
      explain: "The CIS tax month runs from the 6th to the 5th.",
      working: "**5th**.",
    },
    {
      kind: "classify",
      id: "classify-cis-deadlines",
      prompt: "Which deadline is correct for the tax month ending 5 July?",
      categories: ["19 July", "22 July", "5 August"],
      items: [
        { text: "Filing the monthly return", answer: 0 },
        { text: "Paying the deductions electronically", answer: 1 },
        { text: "Giving subcontractors their payment statements", answer: 0 },
      ],
      explain: "The return and statements are due by the 19th; electronic payment by the 22nd.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-return-date",
      prompt: "By what day of the month following the tax month must the CIS300 return reach HMRC?",
      options: ["5th", "14th", "19th", "22nd"],
      answer: 2,
      explain: "The 19th.",
    },
    {
      kind: "mcq",
      id: "q-pay-date",
      prompt: "By what date must deductions be paid if paid electronically?",
      options: ["19th", "22nd", "28th", "31st"],
      answer: 1,
      explain: "22nd.",
    },
    {
      kind: "mcq",
      id: "q-nil",
      prompt: "From 6 April 2026, a contractor who pays no subcontractors in a month must…",
      options: ["Do nothing", "File a nil return unless HMRC was told in advance", "Pay a flat £100", "Close the scheme"],
      answer: 1,
      explain: "The nil return obligation was reinstated from 6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-fixed",
      prompt: "What is the first fixed penalty for a late CIS300 return?",
      options: ["£50", "£100", "£200", "£300"],
      answer: 1,
      explain: "£100.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "How long should CIS records be kept?",
      options: ["1 year", "3 years", "10 years", "Indefinitely"],
      answer: 1,
      explain: "At least three years after the end of the tax year.",
    },
  ],
  sources: [
    { label: "File your CIS monthly returns – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/file-your-monthly-returns" },
    { label: "Pay a CIS late filing penalty – GOV.UK", url: "https://www.gov.uk/pay-construction-industry-scheme-cis-late-filing-penalty" },
    { label: "CISR12170 – contractors: monthly returns", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr12170" },
    { label: "CISR65020 – late return automatic penalties", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr65020" },
    { label: "Simplification and administrative improvements to the CIS – GOV.UK", url: "https://www.gov.uk/government/publications/simplifying-and-improving-construction-industry-scheme-administration/simplification-and-administrative-improvements-to-the-construction-industry-scheme" },
  ],
};
