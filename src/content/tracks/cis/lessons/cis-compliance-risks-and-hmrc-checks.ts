import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cis-compliance-risks-and-hmrc-checks",
  title: "CIS compliance risks, HMRC checks and putting errors right",
  level: "advanced",
  minutes: 35,
  summary:
    "The main CIS risk areas for contractors and subcontractors (wrong rates, missing returns, employment status, unsupported materials, false declarations), how HMRC compliance checks work, who bears the cost of under-deduction, penalties, and how to prepare a client file and respond to a check.",
  objectives: [
    "Identify the main CIS compliance risks for a contractor and for a subcontractor",
    "Explain the contractor's liability for under-deductions and incorrect declarations",
    "Explain why employment status errors are costly and how CIS interacts with PAYE",
    "Describe what an HMRC CIS compliance check involves and how to prepare for it",
    "Calculate the exposure on a simple under-deduction and decide on voluntary correction",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `HMRC treats the construction sector as **high risk**. CIS compliance checks can cover **contractors** (did they verify, deduct and report correctly?), **subcontractors** (did they claim deductions properly and declare all income?) and **supply chains** (labour providers and "umbrella" arrangements). The best protection is a **documented process** that is applied every month.`,
    },
    {
      kind: "table",
      caption: "Main risk areas",
      head: ["Risk", "Who bears it", "Typical cause", "Control"],
      rows: [
        ["Wrong rate of deduction", "**Contractor** (liable for the under-deduction)", "Not verifying; ignoring HMRC's response; using a stale rate", "Verify before first payment; keep evidence; check rate changes"],
        ["Late or missing monthly returns", "Contractor", "No diary; nil returns forgotten (reinstated from 6 April 2026)", "Compliance calendar; nil-return notification"],
        ["Late payment of deductions", "Contractor", "Cash-flow pressure; payment posted to wrong account", "Monthly liability reconciliation"],
        ["Employee treated as subcontractor", "Contractor", "'Labour-only' arrangements that are really employment", "Status review for each subcontractor before the return declaration"],
        ["Unsupported materials deduction", "Contractor / subcontractor", "No evidence of cost; mark-up in the materials figure", "Keep supporting invoices; split labour and materials"],
        ["Incorrect declarations", "Contractor", "Signing the return without checks", "Documented sign-off"],
        ["Claiming deductions without statements", "Subcontractor", "Missing statements", "Reconcile statements to the ledger"],
        ["GPS lost or at risk", "Subcontractor", "Late filing or payment of other taxes", "Compliance monitoring"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Consequences",
      md: `- **Under-deduction:** the contractor is generally **responsible for the tax that should have been deducted** and can be asked to pay it to HMRC, subject to HMRC's discretion where the contractor took reasonable care and the subcontractor's own tax was paid (check the CIS regulations and HMRC's guidance for the conditions).
- **Late returns:** £100, then £200 at 2 months, then the greater of £300 or 5% of the deductions at 6 months and again at 12 months (see the returns lesson).
- **Missing records or false declarations:** penalties of **up to £3,000** are possible, in addition to penalties for inaccuracies in returns and interest on unpaid tax.
- **Employment status:** if a worker treated as a CIS subcontractor is in fact an **employee**, PAYE and NIC (including **employer NIC**) are due, with credit for the CIS deductions already paid. Penalties may apply, and a contractor that has not taken reasonable care is more exposed.
- **Record keeping:** CIS records must be kept for at least **three years** after the end of the tax year.`,
    },
    {
      kind: "md",
      md: `### An HMRC compliance check

1. **Letter or call** from HMRC, asking for records for specified months or years.
2. **Records to produce:** verification evidence, statements, payment records, bank statements, subcontractor invoices, the working papers behind each return and the **employment status** analysis.
3. **Findings:** HMRC may agree the position, propose an **assessment** for under-deducted tax or employment taxes, and consider penalties depending on **behaviour** (careless, deliberate) and **disclosure**.
4. **Response:** respond within the time given, supply complete and accurate records, and consider **voluntary correction** of any errors you identify.
5. **Appeal rights** exist against assessments and penalties.

### Voluntary correction

If your review finds an error (for example a subcontractor treated at 20% when HMRC's response was 30%), **correct it quickly**: amend the return for the relevant tax month, pay the shortfall with interest, and document the **cause and the fix**. A prompt, unprompted correction usually gives the best penalty outcome.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Employment status: a recurring problem",
      md: `A "**labour-only**" arrangement where the worker uses the contractor's tools, is supervised daily, can't send a substitute and works for one contractor all year points towards **employment**. The contractor must take care before signing the **employment status declaration** on the return. (See the employment status tests in the IR35 track: the same cases and factors apply.)`,
    },
  ],
  scenario: {
    title: "A compliance check at Northgate Build Ltd",
    narrative: `HMRC opens a check into Northgate Build Ltd's CIS returns for 2025/26. It finds that **Dev Anand** was paid **£6,000** of labour in the year at the **20% rate** (deductions £1,200), but HMRC's verification result for him was **30%**; Northgate misapplied an old record. All deductions were paid to HMRC. Separately, HMRC queries whether Dev was really a subcontractor: he worked 5 days a week for Northgate only, using its tools, under a site manager.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: under-deduction.** Correct deduction £6,000 × 30% = £1,800. Deducted £1,200. **Shortfall £600.** Northgate is generally responsible for this unless HMRC accepts it need not pay (for example, if Dev's own tax was covered).

**Step 2: voluntary correction.** Before HMRC concludes, Northgate should check how many other subcontractors have the same problem, amend the returns for the affected months and pay the shortfall with interest.

**Step 3: status.** The facts suggest Dev may have been an **employee**. If HMRC agree, PAYE and NIC would be due on his pay as an employee, with credit for the CIS deductions already paid. **Employer NIC** and potentially penalties would be Northgate's exposure.

**Step 4: process fix.** Introduce a **monthly check** that each subcontractor's rate in the system equals the latest HMRC verification, plus a **status review** before the declaration on each return.

**Step 5: record.** File note: what was found, what was corrected, when and by whom.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "under-deduction",
      prompt: "A contractor deducts 20% from £8,000 of labour but the subcontractor should have been at 30%. What is the under-deduction (£)?",
      answer: 800,
      unit: "£",
      explain: "Correct deduction less the amount actually deducted.",
      working: "£8,000 × (30% − 20%) = **£800**.",
    },
    {
      kind: "numeric",
      id: "record-years",
      prompt: "For how many years after the end of the tax year must CIS records be kept at a minimum?",
      answer: 3,
      unit: "",
      explain: "At least three years.",
      working: "**3 years**.",
    },
    {
      kind: "classify",
      id: "classify-cis-risk",
      prompt: "Who bears the primary risk?",
      categories: ["Contractor", "Subcontractor"],
      items: [
        { text: "Deducting at the wrong rate", answer: 0 },
        { text: "Claiming deductions without payment statements", answer: 1 },
        { text: "Signing the monthly employment status declaration without checking status", answer: 0 },
        { text: "Losing gross payment status through late tax payments", answer: 1 },
      ],
      explain: "Contractors are responsible for deducting and reporting correctly; subcontractors for their own claims and compliance.",
    },
    {
      kind: "mcq",
      id: "mcq-voluntary",
      prompt: "You discover that a subcontractor has been paid at the wrong rate for six months. What is the best course of action?",
      options: ["Ignore it", "Amend the returns, pay the shortfall and keep a record before HMRC finds it", "Wait for HMRC", "Delete the records"],
      answer: 1,
      explain: "Prompt, unprompted correction is best.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-who",
      prompt: "Who is generally responsible for an under-deduction?",
      options: ["The subcontractor", "The contractor", "HMRC", "The bank"],
      answer: 1,
      explain: "The contractor must deduct the correct amount.",
    },
    {
      kind: "mcq",
      id: "q-3000",
      prompt: "False declarations or failing to keep records can attract penalties of up to…",
      options: ["£100", "£1,000", "£3,000", "£10,000"],
      answer: 2,
      explain: "Up to £3,000.",
    },
    {
      kind: "mcq",
      id: "q-employee",
      prompt: "A 'labour only' worker is in fact an employee. What taxes are due?",
      options: ["Only CIS", "PAYE and NIC (with credit for CIS paid)", "None", "VAT"],
      answer: 1,
      explain: "PAYE and NIC, with credit for CIS deductions already paid.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "Which should you hold for each subcontractor?",
      options: ["Verification evidence", "Only the invoice", "Nothing", "Only their CV"],
      answer: 0,
      explain: "Verification evidence plus statements and payment records.",
    },
    {
      kind: "mcq",
      id: "q-check",
      prompt: "When HMRC opens a CIS check, what is the best first step?",
      options: ["Ignore the letter", "Respond on time with complete records and review for errors", "Close the business", "Pay a flat sum"],
      answer: 1,
      explain: "Respond, gather records and review.",
    },
  ],
  sources: [
    { label: "Income Tax (Construction Industry Scheme) Regulations 2005", url: "https://www.legislation.gov.uk/uksi/2005/2045/contents" },
    { label: "CIS 340 guide – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
    { label: "Pay a Construction Industry Scheme late filing penalty – GOV.UK", url: "https://www.gov.uk/pay-construction-industry-scheme-cis-late-filing-penalty" },
    { label: "Tackling Construction Industry Scheme fraud – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-tackling-fraud/tackling-construction-industry-scheme-fraud" },
    { label: "Penalties: an overview for agents and advisers – GOV.UK", url: "https://www.gov.uk/guidance/penalties-an-overview-for-agents-and-advisers" },
  ],
};
