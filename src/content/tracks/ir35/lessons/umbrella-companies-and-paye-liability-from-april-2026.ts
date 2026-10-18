import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "umbrella-companies-and-paye-liability-from-april-2026",
  title: "Umbrella companies and the PAYE liability rules from 6 April 2026",
  level: "advanced",
  minutes: 35,
  summary:
    "How umbrella companies work, how a worker's pay is built from the assignment rate, the changes from 6 April 2026 that make the agency (or end client) liable for an umbrella company's unpaid PAYE, and the due diligence and practical advice that follows.",
  objectives: [
    "Explain what an umbrella company is and how it differs from a PSC",
    "Work backwards from an assignment rate to a worker's gross pay and take-home pay",
    "State who is liable for unpaid PAYE under the rules effective from 6 April 2026",
    "Describe sensible due diligence for agencies and end clients, and warning signs for workers",
    "Advise contractors who are moving between PSC and umbrella arrangements",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `An **umbrella company** is an employer. It employs workers who are supplied to **recruitment agencies** and end clients, pays them through **PAYE**, and invoices the agency for the assignment. Workers on an umbrella are **employees** with full employment rights (holiday pay, National Minimum Wage, workplace pension, statutory pay). Contractors often move to an umbrella when a client decides their PSC engagement is **inside IR35** and they would otherwise suffer deductions. The market has a record of **non-compliance and fraud**, which led to the changes from **6 April 2026**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 6 April 2026 change",
      md: `From **6 April 2026** (new Chapter 11 of Part 2, ITEPA 2003, as described in HMRC's guidance on PAYE changes for the umbrella company market):

- **Recruitment agencies or end clients** become **accountable for PAYE** (income tax and Class 1 NIC) on payments made to workers supplied through umbrella companies if the umbrella fails to pay it. HMRC can pursue them on a **joint and several** basis.
- **Order of liability:** where there is a chain with **more than one agency**, liability falls first on **the agency that has the direct contract to supply the worker to the end client**. If **no agency** is involved, the **end client** is liable.
- **Who is an umbrella company:** an entity that employs workers on behalf of agencies and the businesses the workers do the work for.
- The change targets PAYE that an umbrella company in the chain fails to account for, so agencies and end clients have a direct interest in the umbrella's compliance.

Check HMRC's detailed guidance (ESM2410 and ESM2420, and the "PAYE changes for the umbrella company market" publication) for the definitions, notices and the due diligence the parties are expected to carry out.`,
    },
    {
      kind: "md",
      md: `### How an umbrella calculates pay

The agency pays the umbrella the **assignment rate** (plus VAT). From that, the umbrella takes its **margin** and the **employer costs** it must pay out of the rate (employer NIC at 15% above the secondary threshold, employer pension contributions, the Apprenticeship Levy where applicable and holiday pay). What is left is the **gross pay** subject to PAYE and employee NIC. Workers must receive a **payslip**, and the agency must give them a **Key Information Document** setting out the rates, deductions and fees and how they affect pay. HMRC's good practice guidance also expects the umbrella to provide a **reconciliation** statement showing how gross and net pay are arrived at from the assignment rate.

### Due diligence by agencies and end clients

- Check the umbrella's **VAT registration, Companies House record and PAYE reference**.
- Review sample **payslips and reconciliations**; confirm RTI submissions are being made.
- Prefer **accredited** umbrellas and keep the supply chain **as short as possible**.
- **Report** suspected non-compliance to HMRC or an accreditation body.
- Record the **checks and dates** (evidence of care).

### Warning signs for workers

- Pay that doesn't reconcile to the assignment rate, with **unexplained deductions**.
- **No payslips** or payslips that don't show tax and NIC.
- Strange **loans, "expense" schemes** or schemes promising high take-home pay (these are typically **disguised remuneration** or **mini umbrella** fraud).
- Frequent changes of employer name.
- A margin that is not clearly **disclosed**.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Mini-umbrella and 'too good to be true' schemes",
      md: `If a scheme claims to pay **more** than the lawful maximum (for example, by treating a large part of the pay as tax-free "expenses" or loans), the worker may be liable for **PAYE arrears, interest and penalties**, and the scheme operator may disappear. A genuine umbrella pays **within the PAYE rules** and shows it on the payslip. Tell clients: if the take-home is higher than the maths allows, ask why.`,
    },
    {
      kind: "table",
      caption: "PSC outside IR35 versus PSC inside IR35 versus umbrella",
      head: ["", "PSC, outside IR35", "PSC, inside IR35 (client Chapter 10)", "Umbrella"],
      rows: [
        ["Who is the worker's employer?", "The worker's own company (as director)", "The worker's own company, but the fee-payer deducts tax and NIC", "The umbrella company"],
        ["Tax and NIC", "Salary via PAYE; dividends on profit; corporation tax", "PAYE and NIC on the deemed direct payment, deducted by the fee-payer", "PAYE and NIC on pay by the umbrella; employer NIC and margin come out of the rate"],
        ["Employment rights", "Few", "Few", "Full employee rights"],
        ["Admin", "Company accounts, CT, payroll", "Company accounts; engagement statements", "None for the worker beyond timesheets"],
        ["Liability risk", "Own", "Fee-payer's duty", "Agency or end client liable for unpaid PAYE from 6 April 2026"],
      ],
    },
  ],
  scenario: {
    title: "An assignment rate becomes a payslip: Femi Adeyemi",
    narrative: `Femi Adeyemi, a data analyst, is supplied through an agency to an end client under an umbrella. The agency pays the umbrella **£4,000 excluding VAT** for his month's work. The umbrella's margin is **£120**. Femi has code 1257L, is in the umbrella's pension scheme with **3% employer and 5% employee** contributions on qualifying earnings (employee contributions net pay), and the umbrella pays employer NIC at 15% above £417 a month. (Monthly figures; ignore holiday pay and the Apprenticeship Levy.)`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: amount available for pay and employer costs.** £4,000 − £120 margin = **£3,880**.

**Step 2: work backwards to gross pay (G).** The £3,880 must cover G, employer NIC of 15% × (G − £417), and employer pension of 3% × (G − £520):

G + 0.15 × (G − 417) + 0.03 × (G − 520) = 3,880
1.18 × G = 3,880 + 62.55 + 15.60 = 3,958.15
**G = £3,354.36**.

Check: employer NIC = 15% × £2,937.36 = £440.60; employer pension = 3% × £2,834.36 = £85.03. £3,354.36 + £440.60 + £85.03 = **£3,880.00** ✓.

**Step 3: Femi's deductions.**
- Employee pension (5% of £2,834.36, net pay): **£141.72**.
- Income tax (1257L): taxable pay £3,354.36 − £141.72 − £1,047.50 = £2,165.14 × 20% = **£433.03**.
- Employee NIC: 8% × (£3,354.36 − £1,048) = **£184.51**.
- **Take-home: £3,354.36 − £141.72 − £433.03 − £184.51 = £2,595.10** (rounding).

**Step 4: what the agency must check from April 2026.** If the umbrella doesn't pay HMRC the PAYE and NIC for Femi (£433.03 + £184.51 + £440.60 = £1,058.14 this month), the agency with the direct contract to the end client can be liable. It should have **evidence** of its due diligence and review the **payslip reconciliation** for Femi and others.

**Step 5: advising Femi.** Keep his payslips, check them against his personal tax account, and ask the umbrella for a reconciliation if the figures don't match.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "umbrella-gross-pay",
      prompt: "Using the formula G + 15% × (G − £417) + 3% × (G − £520) = £3,880, what is the gross pay G to the nearest £1?",
      answer: 3354,
      tolerance: 1,
      unit: "£",
      explain: "Solve for G: the invoice less margin must cover gross pay and the employer's NIC and pension costs.",
      working: "1.18 G = 3,880 + 62.55 + 15.60 = 3,958.15; G = **£3,354.36**.",
    },
    {
      kind: "numeric",
      id: "umbrella-er-nic",
      prompt: "With G = £3,354.36 and a monthly secondary threshold of £417, what is the umbrella's employer NIC at 15% (£)? Round to the nearest £1.",
      answer: 441,
      tolerance: 1,
      unit: "£",
      explain: "15% of earnings above the secondary threshold.",
      working: "15% × (£3,354.36 − £417) = 15% × £2,937.36 = **£440.60**.",
    },
    {
      kind: "classify",
      id: "classify-umbrella-signs",
      prompt: "Is this a warning sign of a non-compliant umbrella scheme?",
      categories: ["Warning sign", "Normal"],
      items: [
        { text: "Take-home pay noticeably higher than the maths allows, with part paid as 'loans' or 'expenses'", answer: 0 },
        { text: "A payslip showing gross pay, PAYE, NIC, pension and a reconciliation to the assignment rate", answer: 1 },
        { text: "No payslips for three months", answer: 0 },
        { text: "A disclosed margin on the reconciliation statement", answer: 1 },
      ],
      explain: "Compliance shows in clear payslips and reconciliations. Schemes that promise too much are a classic risk.",
    },
    {
      kind: "mcq",
      id: "mcq-umbrella-liability",
      prompt: "From 6 April 2026, if an umbrella in a chain with two agencies fails to pay PAYE, which party is liable first?",
      options: ["The worker", "The agency with the direct contract to the end client", "The first agency to receive the invoice", "HMRC"],
      answer: 1,
      explain: "Liability falls first on the agency contracting directly with the end client (or on the end client if no agency is involved).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-employer",
      prompt: "An umbrella company is…",
      options: ["The worker's own PSC", "An employer that employs workers supplied through agencies", "A type of insurance", "An HMRC scheme"],
      answer: 1,
      explain: "It employs the workers and runs payroll.",
    },
    {
      kind: "mcq",
      id: "q-date",
      prompt: "When do the new PAYE liability rules for umbrella chains take effect?",
      options: ["6 April 2024", "6 April 2025", "6 April 2026", "6 April 2027"],
      answer: 2,
      explain: "6 April 2026.",
    },
    {
      kind: "mcq",
      id: "q-no-agency",
      prompt: "If there is no agency in the chain, who is liable?",
      options: ["The end client", "The worker", "The umbrella's accountant", "No one"],
      answer: 0,
      explain: "The end client becomes liable.",
    },
    {
      kind: "mcq",
      id: "q-rights",
      prompt: "Are umbrella workers employees?",
      options: ["Yes, with employment rights", "No, self-employed", "Only for tax", "Only if over 6 months"],
      answer: 0,
      explain: "Umbrella company workers are employees.",
    },
    {
      kind: "mcq",
      id: "q-chain",
      prompt: "Which action best reduces risk for an agency using umbrellas?",
      options: ["Choose the cheapest umbrella", "Carry out and record due diligence and keep the chain short", "Ignore payslips", "Use one umbrella for everyone"],
      answer: 1,
      explain: "Due diligence, accreditation and short chains.",
    },
  ],
  sources: [
    { label: "PAYE changes for the umbrella company market – GOV.UK", url: "https://www.gov.uk/government/publications/paye-changes-for-the-umbrella-company-market" },
    { label: "Umbrella company market – changes to Income Tax rules to tackle non-compliance", url: "https://www.gov.uk/government/publications/paye-changes-for-the-umbrella-company-market/umbrella-company-market-changes-to-income-tax-rules-to-tackle-non-compliance" },
    { label: "Working through an umbrella company – GOV.UK", url: "https://www.gov.uk/guidance/working-through-an-umbrella-company" },
    { label: "Responsibilities for employment businesses working with umbrella companies", url: "https://www.gov.uk/guidance/responsibilities-for-employment-businesses-working-with-umbrella-companies" },
    { label: "Examples of good practice for umbrella companies – GOV.UK (HMRC)", url: "https://www.gov.uk/guidance/examples-of-good-practice-for-umbrella-companies-in-the-temporary-labour-market" },
    { label: "ESM2420 – umbrella companies legislation: joint and several liability", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm2420" },
  ],
};
