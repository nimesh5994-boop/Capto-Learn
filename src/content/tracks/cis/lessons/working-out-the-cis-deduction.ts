import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "working-out-the-cis-deduction",
  title: "Working out the CIS deduction: labour, materials, VAT and expenses",
  level: "foundation",
  minutes: 35,
  summary:
    "How to calculate the CIS deduction on a subcontractor's invoice: what is included (labour, mark-up on materials, travel and subsistence), what is excluded (VAT and the genuine cost of materials), how the 20%, 30% and 0% rates apply, and how to account for it in the contractor's books.",
  objectives: [
    "Calculate the CIS deduction from an invoice showing labour, materials and VAT",
    "Explain why the cost of materials and VAT are excluded and what evidence is needed for the materials deduction",
    "Treat travel, subsistence and accommodation payments correctly",
    "Calculate the amount payable to the subcontractor and the amount payable to HMRC",
    "Post the transaction in the contractor's books",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The CIS deduction is a **percentage of the payment for labour**, not of the whole invoice. The contractor takes the **gross amount of the invoice**, removes **VAT** and the **direct cost of materials**, and applies the rate to what is left. The tricky part is knowing what counts as "materials" and what must stay in the figure.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The calculation (FA 2004 s61; CIS340)",
      md: `1. Start with the **gross amount** of the contract payment **excluding VAT**.
2. **Deduct the direct cost of materials**: the amount the subcontractor **actually paid** (evidenced by invoices) for materials, consumable stores, fuel (except fuel for travelling), **plant hire** and the cost of manufacturing or prefabricating materials (CIS340). It does **not** include any **profit margin** or **overheads**, and there is no notional deduction for plant the subcontractor **owns**.
3. The balance is the **amount liable to deduction** (labour, profit and other costs).
4. Apply the **rate**: **20%** (registered), **30%** (unregistered / unmatched) or **0%** (gross payment status).
5. **Payment to the subcontractor** = invoice including VAT − deduction.
6. The contractor pays the **deduction** to HMRC with its **monthly return**.

**Travel, subsistence and accommodation** costs paid to a subcontractor **are included** in the amount liable to deduction, whether the contractor reimburses the subcontractor or pays a nominated third party. The only exception is where the contractor lets the subcontractor use its **own facilities** (or pays a third party such as a hotel) and **does not pass the cost on** to the subcontractor (CISR15080).

**VAT** is never part of the base. If the invoice includes VAT, take it out first. (The **domestic reverse charge** often means no VAT is charged: see a later lesson.)`,
    },
    {
      kind: "table",
      caption: "What goes in and out of the deduction base",
      head: ["Item on the invoice", "In the base?", "Notes"],
      rows: [
        ["Labour charges", "Yes", "Main element"],
        ["Mark-up (profit) on materials", "Yes", "Only the **cost** of materials is excluded"],
        ["Genuine cost of materials", "No", "Ask for invoices or receipts; if there is no evidence, make a realistic estimate"],
        ["Travel and subsistence charged to the contractor", "Yes", "Included in the gross payment"],
        ["VAT (standard or reduced rate)", "No", "Excluded"],
        ["Plant hire, consumables and fuel (not travel fuel), at cost", "No", "Treated as materials if the subcontractor actually paid for them; no deduction for plant the subcontractor owns"],
      ],
    },
    {
      kind: "md",
      md: `### The contractor's accounting

For each payment, the contractor's books record:

- The **cost** (labour, materials) in the **subcontractor costs** nominal.
- **Input VAT** if charged (or the reverse charge entries).
- The **CIS deduction** as a **liability to HMRC**.
- The **net cash** paid to the subcontractor.

The contractor must also give the subcontractor a **payment and deduction statement** within **14 days of the end of the tax month** (by the 19th) showing the **gross amount**, **materials cost**, **amount liable to deduction**, **the deduction made** and the subcontractor's details. Keep **copies** for three years.

### Estimating and approximations

If the **materials cost** is not shown, the contractor should **ask for evidence** (for example, receipts showing the subcontractor paid for the materials directly). If the subcontractor has no evidence, GOV.UK says the contractor should **estimate the cost of the materials**. Make the estimate realistic and record how it was reached, not a flat percentage: if the materials figure looks excessive, HMRC can recover the under-deduction from the **contractor** (CIS340 3.13).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common errors",
      md: `- **Deducting from the VAT-inclusive figure.**
- **Excluding materials without proof** (or including a mark-up in the materials line).
- **Forgetting travel and subsistence.** They are part of the gross payment.
- **Using last month's rate** after HMRC changed the subcontractor's status.
- **Not issuing the payment statement** by the 19th.`,
    },
  ],
  scenario: {
    title: "A payment to Joel Parks (20% rate)",
    narrative: `Redfern Interiors Ltd receives an invoice from Joel Parks for work in the tax month 6 April to 5 May 2026. The invoice shows: **labour £2,000**, **materials at cost £800** (supporting invoices attached), and **VAT £560** (£2,800 × 20%). The job is a refit of Redfern's own office, which it doesn't supply on, and Redfern has confirmed in writing that it is an **end user**, so the domestic reverse charge does not apply and Joel charges VAT normally. Joel is verified at the **standard 20%** rate.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: gross excluding VAT.** £2,000 + £800 = **£2,800**.

**Step 2: remove the materials cost.** £2,800 − £800 = **£2,000** liable to deduction.

**Step 3: the deduction.** £2,000 × 20% = **£400**.

**Step 4: payment to Joel.** Invoice total £2,800 + £560 VAT = £3,360. Less deduction £400 = **£2,960**.

**Step 5: HMRC.** The £400 is reported on the monthly return (due by **19 May 2026**) and paid by **22 May 2026** if paid electronically.

**Step 6: statement.** Give Joel a statement by 19 May showing gross £2,800, materials £800, liable £2,000, deduction £400.

**Step 7: books.** See the journal below.`,
      },
      {
        kind: "journal",
        title: "Posting Joel's invoice and payment",
        narrative: "Cost £2,800 and VAT £560 on the debit side; the net payment to Joel and the CIS liability on the credit side.",
        lines: [
          { account: "Subcontractor costs", dr: 2800 },
          { account: "VAT control (input tax)", dr: 560 },
          { account: "Bank", cr: 2960 },
          { account: "CIS liability (HMRC)", cr: 400 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "deduction-20",
      prompt: "A registered subcontractor (20% rate) invoices labour £4,500, materials at cost £1,500 and VAT £1,200. What is the CIS deduction (£)?",
      answer: 900,
      unit: "£",
      explain: "Deduct 20% from labour (the gross excluding VAT less materials).",
      working: "£4,500 + £1,500 = £6,000; − £1,500 materials = £4,500; × 20% = **£900**.",
    },
    {
      kind: "numeric",
      id: "deduction-30",
      prompt: "An unregistered subcontractor invoices £3,000 for labour only (no materials, no VAT). What is the CIS deduction at the higher rate (£)?",
      answer: 900,
      unit: "£",
      explain: "30% of £3,000.",
      working: "£3,000 × 30% = **£900**.",
    },
    {
      kind: "numeric",
      id: "net-payment",
      prompt: "A subcontractor at 20% invoices labour £2,000, materials £800 and VAT £560. What cash is paid to the subcontractor (£)?",
      answer: 2960,
      unit: "£",
      explain: "Invoice total less the deduction.",
      working: "£2,000 + £800 + £560 = £3,360; − 20% × £2,000 (£400) = **£2,960**.",
    },
    {
      kind: "journal",
      id: "journal-cis-payment",
      prompt: "Post an invoice: labour £1,500, materials at cost £500 and VAT £400, from a subcontractor at 20% CIS. The net amount is paid by bank on the same day.",
      accounts: ["Subcontractor costs", "VAT control (input tax)", "Bank", "CIS liability (HMRC)", "Wages and salaries", "Trade creditors"],
      answer: [
        { account: "Subcontractor costs", dr: 2000 },
        { account: "VAT control (input tax)", dr: 400 },
        { account: "Bank", cr: 2100 },
        { account: "CIS liability (HMRC)", cr: 300 },
      ],
      explain: "Deduction = 20% × £1,500 labour = £300. The invoice total is £2,400 (£2,000 + £400 VAT); the cash paid is £2,400 − £300 = £2,100.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-vat",
      prompt: "Is VAT included in the amount liable to CIS deduction?",
      options: ["Yes", "No", "Only 5%", "Only for companies"],
      answer: 1,
      explain: "VAT is excluded.",
    },
    {
      kind: "mcq",
      id: "q-materials",
      prompt: "What counts as 'materials' for the deduction base?",
      options: ["Materials including the mark-up", "The actual cost to the subcontractor of materials (and items such as consumables and plant hire), without profit margin", "Any goods on the invoice", "A share of the subcontractor's overheads"],
      answer: 1,
      explain: "Only the actual cost, evidenced. CIS340 treats consumables, fuel (not for travel) and plant hire as materials too.",
    },
    {
      kind: "mcq",
      id: "q-travel",
      prompt: "Are travel and subsistence payments to a subcontractor included in the base?",
      options: ["Yes", "No", "Only if over £100", "Only if the subcontractor is a company"],
      answer: 0,
      explain: "They are part of the gross payment.",
    },
    {
      kind: "mcq",
      id: "q-statement",
      prompt: "By when must a payment and deduction statement be given to the subcontractor?",
      options: ["Within 14 days of the end of the tax month (by the 19th)", "By 31 January", "By 5 April", "Within 6 months"],
      answer: 0,
      explain: "By the 19th following the tax month.",
    },
    {
      kind: "mcq",
      id: "q-noevidence",
      prompt: "No evidence of materials cost is provided. What should the contractor do?",
      options: ["Apply a flat 40% materials allowance", "Make a realistic, documented estimate of the materials cost", "Ignore the CIS deduction", "Pay gross"],
      answer: 1,
      explain: "GOV.UK says to estimate the cost of materials where there is no evidence. Keep the estimate realistic and documented: if it is excessive, HMRC can recover the under-deduction from the contractor.",
    },
  ],
  sources: [
    { label: "Make deductions and pay subcontractors – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors" },
    { label: "CISR71020 – deductions: the rate of deduction under CIS", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr71020" },
    { label: "CISR15080 – contract payments: travel, subsistence and accommodation", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr15080" },
    { label: "CIS 340 guide – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
  ],
};
