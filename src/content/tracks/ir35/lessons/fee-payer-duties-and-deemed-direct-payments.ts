import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "fee-payer-duties-and-deemed-direct-payments",
  title: "Chapter 10 in practice: the fee-payer and the deemed direct payment",
  level: "practitioner",
  minutes: 40,
  summary:
    "Who the fee-payer is in a labour supply chain, how to work out the deemed direct payment (VAT, materials and expenses), what must be deducted and paid over (PAYE, employee and employer NIC, Apprenticeship Levy), how to report it, and how the contractor's company treats the net receipt.",
  objectives: [
    "Identify the fee-payer in a chain with and without an agency",
    "Calculate a deemed direct payment from an invoice",
    "Calculate employer National Insurance on a deemed direct payment and explain why it cannot be deducted from the payment",
    "Prepare the accounting entries in the fee-payer's books",
    "Explain the reporting and the treatment of the net payment in the contractor's company",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `When a medium or large client concludes that an engagement is **inside IR35**, someone has to operate PAYE. Under Chapter 10 that is the **fee-payer**: the party that pays the contractor's company. If the engagement is **outside** IR35 the intermediary is paid in full and gross as normal. This lesson shows how a practice acting for a **client or agency** (or for a contractor checking what has been deducted) works through the numbers.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who is the fee-payer?",
      md: `The **fee-payer** is the entity in the supply chain that is **closest to the worker's intermediary** and that pays it (or the client itself if there is no agency in between). In a chain such as **client → agency → PSC**, the agency is the fee-payer. If the **client pays the PSC directly**, the client is the fee-payer. The client's **status determination statement** and the **chain of notices** tell each party whether an engagement is inside or outside IR35. If a party in the chain fails to pass the SDS on, the **liability moves up the chain** to the party that failed, or to the client.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The deemed direct payment: three steps",
      md: `1. Take the amount paid to the worker's intermediary **excluding VAT**.
2. **Deduct** the **direct cost of materials** used or to be used in providing the services (a genuine, identifiable cost).
3. **Deduct** expenses met by the intermediary that would have been deductible from earnings **had the worker been an employee** (for example, qualifying travel).

The result is the **deemed direct payment**. If it is nil or negative there is no deemed direct payment. There is **no 5% allowance** (that is a Chapter 8 feature). The deemed direct payment is treated as **employment income** of the worker and PAYE and NIC apply to it as to any other payroll payment.`,
    },
    {
      kind: "md",
      md: `### What the fee-payer must do

- **Deduct income tax and employee NIC** from the payment to the intermediary (on the deemed direct payment only: **not** on the VAT or the part representing materials/expenses).
- Pay **employer Class 1 NIC (15% above the secondary threshold)** and any **Apprenticeship Levy** to HMRC **on top** of the payment. **Employer NIC cannot be deducted** from the amount paid to the intermediary, and the **Employment Allowance cannot be used** against it.
- **Report** through **RTI** (Full Payment Submission) and indicate the worker as an **"off-payroll worker subject to the rules"** using the RTI indicator. Add the worker to payroll like any other starter: give them a **starter checklist**, whose declaration decides the **tax code**. This will often be **BR**, because the worker usually has a main job with their own intermediary (0T week 1/month 1 if no checklist is returned).
- **Pay VAT** on the invoice as normal. VAT is **not** part of the deemed direct payment.
- **Show the worker the deductions made**, on a payslip or on the remittance notice.
- **Keep records**: the SDS, the invoice, the calculation and the evidence for the materials or expenses deducted.

### What happens in the contractor's company

The PSC receives the invoice **net of tax and employee NIC**. HMRC guidance for intermediaries explains that the net amount represents amounts **already taxed**, and that the PSC should **not** tax them again as salary or dividends. The PSC should **exclude** the engagement from its own **Chapter 8** calculation. Make sure the PSC keeps the fee-payer's statements to support the position and to avoid double taxation.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Practical traps",
      md: `- **VAT.** Don't deduct tax and NIC from the VAT-inclusive total.
- **Employer NIC deducted from the PSC's payment.** It's the fee-payer's own cost: contracts (and rates) must reflect this, which many agencies have addressed by lowering the rate offered.
- **Wrong period.** Calculate NIC on the right earnings period. The usual earnings-period rules apply, based on when the fee-payer actually pays (not the invoice date): if it pays monthly, the period is monthly even if two invoices are paid in one month (ESM10019).
- **No RTI indicator.** Failing to flag the off-payroll worker can cause HMRC queries.
- **Materials deduction unsupported.** Keep invoices that identify genuine materials separately.`,
    },
  ],
  scenario: {
    title: "A month's payment to Nova Analytics Ltd",
    narrative: `Taurus Retail plc (a large client) engages Ian Dunmore through his company, Nova Analytics Ltd. Taurus has determined the engagement is **inside IR35** and pays the PSC directly, so Taurus is the fee-payer. For March 2027 Nova invoices **£5,000 + £1,000 VAT = £6,000**. The invoice includes **£400** of separately identified software licences bought for the project (direct cost of materials). Ian takes no salary from Nova, so his starter checklist gives him tax code 1257L (most deemed employees are on BR), and he has no other income from Taurus. Use the monthly thresholds: primary threshold £1,048, upper earnings limit £4,189, secondary threshold £417.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: deemed direct payment.** £5,000 (excluding VAT) − £400 materials = **£4,600**.

**Step 2: employee Class 1 NIC (8% / 2%).** 8% × (£4,189 − £1,048) = 8% × £3,141 = £251.28. 2% × (£4,600 − £4,189) = 2% × £411 = £8.22. Total **£259.50**.

**Step 3: income tax** (illustrative, using 1257L on a monthly basis: allowance £1,047.50, basic rate band £3,141.67). Taxable £4,600 − £1,047.50 = £3,552.50. 20% × £3,141.67 = £628.33; 40% × £410.83 = £164.33. Total **about £792.67**. (Use the payroll software and the worker's real cumulative code.)

**Step 4: employer NIC (15% above £417).** 15% × (£4,600 − £417) = 15% × £4,183 = **£627.45**. Not deducted from Nova's payment.

**Step 5: payment to Nova.** Invoice £6,000 − tax £792.67 − employee NIC £259.50 = **£4,947.83**. Nova gets £4,947.83 (which includes the £1,000 VAT).

**Step 6: Taurus's cost.** £5,000 + employer NIC £627.45 = £5,627.45, with VAT £1,000 recoverable.

**Step 7: Nova's side.** Nova records receipts of £4,947.83 and a note of £1,052.17 tax and NIC already suffered, and keeps the statement. It excludes the engagement from any Chapter 8 deemed payment.`,
      },
      {
        kind: "journal",
        title: "Taurus's entry for the invoice (Dr 6,627.45 = Cr 6,627.45)",
        narrative: "Costs, VAT and employer NIC on the debit side; net payable to Nova and amounts due to HMRC on the credit side.",
        lines: [
          { account: "Contractor costs", dr: 5000 },
          { account: "VAT control (input tax)", dr: 1000 },
          { account: "Employer's NIC expense", dr: 627.45 },
          { account: "Trade creditor – Nova Analytics Ltd", cr: 4947.83 },
          { account: "PAYE/NIC liability – employee deductions", cr: 1052.17 },
          { account: "PAYE/NIC liability – employer NIC", cr: 627.45 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "deemed-direct",
      prompt: "A fee-payer pays a PSC £7,200 including £1,200 VAT. The invoice includes £500 of separately identified, genuine materials. What is the deemed direct payment (£)?",
      answer: 5500,
      unit: "£",
      explain: "Remove VAT, then the direct cost of materials. (No expenses are claimed here.)",
      working: "£7,200 − £1,200 = £6,000; − £500 = **£5,500**.",
    },
    {
      kind: "numeric",
      id: "employer-nic-ddp",
      prompt: "A deemed direct payment of £3,000 is made in a month. The worker has no other earnings from the fee-payer. Monthly secondary threshold £417, rate 15%. What is the employer NIC (£)? Round to the nearest penny.",
      answer: 387.45,
      tolerance: 0.01,
      unit: "£",
      explain: "Employer NIC is charged on earnings above the secondary threshold and is paid on top of the invoice.",
      working: "(£3,000 − £417) × 15% = £2,583 × 0.15 = **£387.45**.",
    },
    {
      kind: "journal",
      id: "journal-ddp-payment",
      prompt: "A fee-payer receives an invoice of £5,000 net plus £1,000 VAT. Employee tax and NIC deducted from the payment total £800, employer NIC £500. Post the invoice (employer NIC is the fee-payer's own cost).",
      accounts: ["Contractor costs", "VAT control (input tax)", "Employer's NIC expense", "Trade creditor – PSC", "PAYE/NIC liability – employee deductions", "PAYE/NIC liability – employer NIC", "Bank", "Wages and salaries"],
      answer: [
        { account: "Contractor costs", dr: 5000 },
        { account: "VAT control (input tax)", dr: 1000 },
        { account: "Employer's NIC expense", dr: 500 },
        { account: "Trade creditor – PSC", cr: 5200 },
        { account: "PAYE/NIC liability – employee deductions", cr: 800 },
        { account: "PAYE/NIC liability – employer NIC", cr: 500 },
      ],
      explain: "The payable to the PSC is the VAT-inclusive invoice (£6,000) less the £800 withheld = £5,200. The £800 and the employer NIC of £500 are liabilities to HMRC; the employer NIC is an extra cost.",
    },
    {
      kind: "mcq",
      id: "mcq-fee-payer-chain",
      prompt: "In a chain client → agency → PSC, who is normally the fee-payer?",
      options: ["The client", "The agency", "The PSC", "The worker"],
      answer: 1,
      explain: "The fee-payer is the party that pays the intermediary.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-allowance",
      prompt: "Is there a 5% allowance in the Chapter 10 deemed direct payment?",
      options: ["Yes", "No: that's a Chapter 8 feature", "Only for large clients", "Only for agencies"],
      answer: 1,
      explain: "Chapter 10 deducts VAT, materials and qualifying expenses, but not 5%.",
    },
    {
      kind: "mcq",
      id: "q-er-nic",
      prompt: "May the fee-payer deduct employer NIC from the payment to the PSC?",
      options: ["Yes", "No: it must be paid on top", "Only half", "Only if the contract allows"],
      answer: 1,
      explain: "Employer NIC and Apprenticeship Levy are paid on top.",
    },
    {
      kind: "mcq",
      id: "q-vat",
      prompt: "Is VAT included in the deemed direct payment?",
      options: ["Yes", "No", "Only at 20%", "Only if the PSC is not VAT registered"],
      answer: 1,
      explain: "VAT is excluded.",
    },
    {
      kind: "mcq",
      id: "q-report",
      prompt: "How is the deemed direct payment reported?",
      options: ["Self Assessment", "RTI Full Payment Submission with the off-payroll indicator", "P11D", "CT600"],
      answer: 1,
      explain: "Through payroll (RTI) with the off-payroll worker indicator.",
    },
    {
      kind: "mcq",
      id: "q-psc",
      prompt: "How should the PSC treat an engagement that has already suffered Chapter 10 deductions?",
      options: ["Tax it again as salary", "Exclude it from the Chapter 8 deemed payment", "Pay it as dividends", "Ignore it"],
      answer: 1,
      explain: "To avoid double taxation the PSC excludes it from its own Chapter 8 calculation.",
    },
  ],
  sources: [
    { label: "Deemed employer responsibilities under off-payroll working rules – GOV.UK", url: "https://www.gov.uk/guidance/fee-payer-responsibilities-under-the-off-payroll-working-rules" },
    { label: "ESM10019 – operating PAYE", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm10019" },
    { label: "ESM10028 – how to calculate the deemed direct payment", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm10028" },
    { label: "ESM9070 – how to calculate the deemed direct payment (public sector rules)", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm9070" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  ],
};
