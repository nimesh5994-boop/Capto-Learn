import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "subcontractor-statements-and-reclaiming-cis-deductions",
  title: "The subcontractor's side: statements, reclaiming deductions and the accounts",
  level: "practitioner",
  minutes: 35,
  summary:
    "How a subcontractor records income net of CIS deductions, how sole traders, partnerships and limited companies reclaim the tax suffered (Self Assessment, the partnership return and the Employer Payment Summary), and the checks on payment statements.",
  objectives: [
    "Explain how CIS deductions suffered are credited against the subcontractor's own tax",
    "Record sales and CIS deductions suffered correctly in the subcontractor's books",
    "Describe how a sole trader, partnership and limited company reclaim the deductions",
    "Calculate the offset of CIS deductions against PAYE/NIC through the EPS and the balance repayable",
    "Check payment statements and chase missing ones",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `For a subcontractor, **CIS deductions are not a cost** but **tax already paid on account**. The sales invoice is for the **full amount**, the bank receives the **net**, and the **deduction** sits in the balance sheet as a **recoverable tax debtor** until it is set against the subcontractor's own tax. A practice that gets this wrong either **understates income** or **loses the credit**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Where the deductions suffered are claimed",
      md: `| Subcontractor | How the deductions are claimed |
|---|---|
| **Sole trader** | On the **Self Assessment** return (the self-employment pages: the CIS deductions suffered box). The deductions are **credited against** the income tax and NIC liability (including Class 4, and any voluntary Class 2); any excess is **repaid**. |
| **Partnership** | On the **partnership return**, with each partner's share of the deductions credited on their own Self Assessment return. |
| **Limited company** | Through its **payroll scheme**: the **Employer Payment Summary (EPS)** each month, set against the company's **PAYE, NIC, student loan and CIS** liabilities. Any balance not used is **refunded after the end of the tax year** on a repayment claim, or can be set against corporation tax due. It is **not** claimed on the CT600. |

Always claim the deductions **actually suffered** and **supported by a payment and deduction statement** (or bank evidence).`,
    },
    {
      kind: "md",
      md: `### Recording the income

When a contractor pays a subcontractor under deduction, record:

- **Sales** at the **gross amount** of the invoice (excluding VAT).
- **VAT** on the invoice (output tax) if applicable.
- **CIS deduction suffered** (tax recoverable).
- The **cash received** (net).

### The payment and deduction statements

The contractor must give the subcontractor a **statement** by the **19th** of the month following the tax month, showing the **gross payment**, **materials cost**, **amount liable to deduction** and the **deduction**. Reconcile the statements to your **ledger** and **bank** each month and chase any missing ones. **Don't** claim a deduction without evidence: HMRC can disallow it.

### Companies: the EPS offset

A limited company uses its **payroll scheme** to reclaim CIS. It sends its FPS as usual and reports the year-to-date **CIS deductions suffered** on its **EPS**, which reduces what it pays HMRC for **PAYE, NIC, student loan deductions and its own CIS deductions** as a contractor. If the **CIS credit exceeds those liabilities**, the **excess** carries forward to later months **within the same tax year** (no in-year repayment, except in liquidation or administration). Any balance left at the end of the tax year is **refunded** on a repayment claim, or can be set against corporation tax due. **Don't** claim CIS deductions on the **corporation tax return** itself: GOV.UK warns that a penalty may follow.

### Why it matters at 30%

An **unregistered** subcontractor suffers **30%** deductions, which may exceed their eventual tax liability, creating a large **repayment** and a long wait. **Registering** (so the deduction falls to 20%, or 0% with gross payment status) improves cash flow.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common errors",
      md: `- Recording **sales at the net amount received**, understating turnover and VAT.
- Claiming **deductions that aren't on a statement**, or claiming them on the **CT600** instead of (or as well as) the EPS.
- Setting CIS against the **wrong tax year**.
- **Not chasing** missing statements: HMRC may refuse the credit.
- **Forgetting** that a **limited company** doesn't claim CIS on a Self Assessment return.`,
    },
  ],
  scenario: {
    title: "Two clients: Joel Parks (sole trader) and Cole Plumbing Ltd",
    narrative: `**1. Joel Parks**, a self-employed plasterer on the 20% rate, invoiced Redfern Interiors Ltd **£2,800 plus VAT £560 = £3,360** (labour £2,000, materials £800). He received **£2,960** after a **£400** deduction. For 2026/27 his total income tax and Class 4 NIC liability before CIS is **£6,000**; his CIS deductions suffered for the year total **£7,500**.

**2. Cole Plumbing Ltd** suffers CIS deductions of **£2,000 a month** for the year (£24,000 in total) and has PAYE and NIC liabilities of **£1,500 a month** (£18,000 in total).`,
    walkthrough: [
      {
        kind: "md",
        md: `**Joel's books.** Sales £2,800, output VAT £560, CIS tax recoverable £400, cash £2,960 (see the journal).

**Joel's return.** Total tax and NIC £6,000; CIS credit £7,500; **repayment due £1,500**.

**Cole's EPS.** Each month the company reduces its PAYE/NIC payment by the CIS credit up to the liability: the monthly liability of £1,500 is fully covered, leaving **£500** of unused CIS each month. Over the year the PAYE/NIC liability of £18,000 is fully offset, and the unused credit of £6,000 is **repayable after the tax year-end** (or can be set against corporation tax).

**Evidence.** Keep the monthly payment and deduction statements for both clients and a schedule matching them to the sales ledger.`,
      },
      {
        kind: "journal",
        title: "Joel's entry when he is paid (net of CIS)",
        narrative: "Sales and output VAT recognised at the gross invoice; cash received is net; the deduction is a tax debtor.",
        lines: [
          { account: "Bank", dr: 2960 },
          { account: "CIS tax recoverable (HMRC)", dr: 400 },
          { account: "Sales", cr: 2800 },
          { account: "VAT control (output tax)", cr: 560 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "refund-sole-trader",
      prompt: "A sole trader's tax and NIC liability for the year is £5,200 and CIS deductions suffered are £8,900. How much is repaid (£)?",
      answer: 3700,
      unit: "£",
      explain: "The CIS credit is set against the liability; the excess is repaid.",
      working: "£8,900 − £5,200 = **£3,700**.",
    },
    {
      kind: "numeric",
      id: "company-offset",
      prompt: "A company's PAYE and NIC for the year total £18,000 and CIS deductions suffered total £24,000. How much CIS credit remains to be repaid after the year end (£)?",
      answer: 6000,
      unit: "£",
      explain: "Offset against PAYE/NIC first; the excess is repaid.",
      working: "£24,000 − £18,000 = **£6,000**.",
    },
    {
      kind: "journal",
      id: "journal-cis-suffered",
      prompt: "A subcontractor invoices £5,000 plus VAT £1,000 (no reverse charge). The contractor deducts £800 CIS and pays the balance by bank. Post the receipt.",
      accounts: ["Bank", "CIS tax recoverable (HMRC)", "Sales", "VAT control (output tax)", "Trade debtors", "Subcontractor costs"],
      answer: [
        { account: "Bank", dr: 5200 },
        { account: "CIS tax recoverable (HMRC)", dr: 800 },
        { account: "Sales", cr: 5000 },
        { account: "VAT control (output tax)", cr: 1000 },
      ],
      explain: "Sales £5,000 and VAT £1,000 are recorded gross. Cash = £6,000 − £800 = £5,200, and the £800 deduction is a tax debtor.",
    },
    {
      kind: "mcq",
      id: "mcq-company-claim",
      prompt: "How does a limited company primarily claim CIS deductions suffered during the year?",
      options: ["On a Self Assessment return", "Through the EPS against PAYE/NIC liabilities", "By phoning HMRC", "It can't claim them"],
      answer: 1,
      explain: "Through the Employer Payment Summary, with any balance refunded after the year end (or set against corporation tax due). It is not claimed on the CT600.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-tax-or-cost",
      prompt: "For the subcontractor, CIS deductions suffered are…",
      options: ["A business expense", "Tax paid on account", "A VAT credit", "A loan"],
      answer: 1,
      explain: "Tax already paid, creditable against their liability.",
    },
    {
      kind: "mcq",
      id: "q-sales",
      prompt: "At what amount should the subcontractor record sales?",
      options: ["The net cash received", "The gross invoice excluding VAT", "The VAT-inclusive total", "The materials cost"],
      answer: 1,
      explain: "Gross, excluding VAT.",
    },
    {
      kind: "mcq",
      id: "q-sole-claim",
      prompt: "Where does a sole trader claim CIS deductions suffered?",
      options: ["On the CT600", "On the Self Assessment return", "On the VAT return", "On the P11D"],
      answer: 1,
      explain: "On the Self Assessment self-employment pages.",
    },
    {
      kind: "mcq",
      id: "q-partner",
      prompt: "How do partners in a partnership claim CIS deductions?",
      options: ["Through the partnership return, credited to each partner", "On the CT600", "They can't", "Through the VAT return"],
      answer: 0,
      explain: "The partnership return shows them and each partner's share is credited.",
    },
    {
      kind: "mcq",
      id: "q-evidence",
      prompt: "What should a subcontractor hold to support the deductions claimed?",
      options: ["Nothing", "Payment and deduction statements (and bank records)", "Only the invoice", "Only the VAT return"],
      answer: 1,
      explain: "The contractor's statements, reconciled to the bank.",
    },
  ],
  sources: [
    { label: "What you must do as a CIS subcontractor – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor" },
    { label: "Get paid as a CIS subcontractor – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/get-paid" },
    { label: "Claim back CIS deductions as a subcontractor – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/pay-tax-and-claim-back-deductions" },
    { label: "Self-employed National Insurance rates – GOV.UK", url: "https://www.gov.uk/self-employed-national-insurance-rates" },
    { label: "CIS 340 guide – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
  ],
};
