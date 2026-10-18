import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cis-scope-contractors-subcontractors-and-construction-operations",
  title: "CIS scope: who is a contractor, who is a subcontractor and what counts as construction",
  level: "foundation",
  minutes: 30,
  summary:
    "The basic architecture of the Construction Industry Scheme: what counts as construction work, who must act as a contractor (including 'deemed' contractors spending over £3 million), who is a subcontractor, and the main exclusions, so you can decide quickly whether a payment falls within CIS.",
  objectives: [
    "Explain how CIS works: contractors deduct tax from payments to subcontractors and pay it to HMRC",
    "Identify construction operations and the main work that is excluded",
    "Distinguish mainstream contractors, deemed contractors and subcontractors",
    "Apply the scope rules to a mixed set of payments",
    "Explain the effect of the April 2026 change for payments to local authorities and public bodies",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **Construction Industry Scheme (CIS)** requires **contractors** to deduct money from payments to **subcontractors** for construction work and pay it over to HMRC. The deductions count as **advance payments** towards the subcontractor's income tax and National Insurance (or corporation tax for a company). It is **not** a separate tax: it is a **withholding** system aimed at the construction sector's history of non-compliance. CIS rules apply regardless of whether the subcontractor is an individual, partnership or company.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Contractors and subcontractors (FA 2004 Part 3 Chapter 3)",
      md: `- A **contractor** is a business (or other body) that **pays subcontractors** for **construction work**. These **mainstream contractors** include builders, property developers and speculative builders.
- A **deemed contractor** is a business that isn't mainly in construction but whose **expenditure on construction operations exceeds £3 million in any rolling 12-month period** (HMRC's CIS340 guidance). Examples are large retailers, banks and other organisations with big property programmes. A deemed contractor (but not a public body or a mainstream contractor) need not apply CIS to work on **property used for its own business**, such as its offices, shops or warehouses; work on property **held as an investment, let to third parties or for sale** stays within CIS.
- A **subcontractor** is a business that carries out construction work for a contractor. Subcontractors don't have to register, but the **deduction is higher** (30%) if they don't.
- **Employees** are dealt with by PAYE, not CIS. Genuine employment status is decided separately (see the IR35 and employment status track).

Contractors must **register** with HMRC, **verify** subcontractors, **deduct** tax and file **monthly returns**. Subcontractors can get paid **gross** (no deductions) if they have **gross payment status**.`,
    },
    {
      kind: "table",
      caption: "What is and isn't construction work for CIS (broadly, from CIS340)",
      head: ["Within CIS (construction operations)", "Outside CIS (excluded)"],
      rows: [
        ["Site preparation: clearance, earth moving, laying foundations, drainage", "Architecture and surveying"],
        ["Demolition and dismantling; construction, alteration, repair, extension of buildings and structures", "Scaffolding hire with no labour"],
        ["Civil engineering works: roads, bridges, pipelines, power lines", "Carpet and lino fitting (not part of the fabric)"],
        ["Installing systems of heating, lighting, power, water, ventilation, drainage, communications and fire protection (fire protection means systems that protect the fabric of the building, such as sprinklers)", "Manufacture of materials and delivery to site; installing security systems such as burglar alarms, CCTV and public address systems, and fire alarm systems that only give a warning"],
        ["Internal cleaning carried out in the course of, or on completion of, construction", "External cleaning (other than painting or decorating), and routine cleaning of premises not undergoing construction"],
        ["Painting and decorating external or internal surfaces", "Manufacture, delivery and installation of seating, blinds and louvred shutters"],
      ],
    },
    {
      kind: "md",
      md: `### Things to check

- **Mixed contracts:** if a single contract includes both construction and excluded work, **all payments under that contract** are within CIS, even if the excluded work is invoiced separately (CIS340 Appendix A).
- **Who is paying whom:** CIS applies to **payments by contractors to subcontractors**. Payments to **suppliers of materials** or the sale of goods are outside, though **labour-only** or **labour-and-materials** contracts are within.
- **Payments to employees** (even on construction sites) are within PAYE, not CIS.
- **Public bodies:** from **6 April 2026**, payments to **local authorities and other public bodies** as subcontractors are **outside** the scope of CIS. Check the legislation and HMRC guidance for the precise list.
- **Mainstream contractors** (those whose main business is construction) and **deemed contractors** both have to register, verify subcontractors, deduct and report. Check CIS340 for any differences in the detail.
- **Land and property owners:** a property investment business (one that lets buildings or holds them for capital gain) is a contractor only as a **deemed contractor** once its construction spend exceeds **£3 million**. If it starts **developing** property (multiple or substantial construction contracts), it becomes a **mainstream contractor** straight away. Ordinary **householders** having work done on their own homes are not contractors.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common scope mistakes",
      md: `- Treating **plasterers, joiners and decorators** as outside CIS because they are "trades" (they're construction operations).
- Treating **materials supply** and **labour** together as one item without splitting them: the deduction applies to the labour part.
- Forgetting that a landlord or property investor that starts **developing** property becomes a **mainstream contractor**, with no £3 million threshold.
- **Self-employed** drivers and others who are not construction operators (for example haulage-only suppliers) being included incorrectly.
- Applying CIS to **VAT** (the deduction excludes VAT).`,
    },
  ],
  scenario: {
    title: "Which payments are in CIS? Redfern Interiors Ltd",
    narrative: `Redfern Interiors Ltd, a VAT-registered fit-out company, made these payments in its latest tax month:

| # | Payee | Work | Gross |
|---|---|---|---:|
| 1 | Joel Parks (self-employed) | Plastering a client's office | £2,400 |
| 2 | Aldgate Architects Ltd | Design drawings | £3,000 |
| 3 | Sparkline Electrical Ltd | Installing lighting and power systems | £5,000 |
| 4 | Heritage Scaffold Ltd | Hire of scaffolding (no labour) | £1,200 |
| 5 | CarpetCare Ltd | Fitting carpet tiles | £900 |
| 6 | Nina Okoye (employee) | Site foreman wages | £2,800 |`,
    walkthrough: [
      {
        kind: "table",
        caption: "CIS treatment of each payment",
        head: ["#", "Payee", "In CIS?", "Reason"],
        rows: [
          ["1", "Joel Parks", "Yes", "Plastering is a construction operation; self-employed subcontractor"],
          ["2", "Aldgate Architects", "No", "Architecture and design are excluded"],
          ["3", "Sparkline Electrical", "Yes", "Installing lighting and power systems is within CIS"],
          ["4", "Heritage Scaffold", "No", "Scaffolding hire with no labour is excluded"],
          ["5", "CarpetCare", "No", "Carpet fitting is excluded"],
          ["6", "Nina Okoye", "No", "An employee: PAYE applies"],
        ],
      },
      {
        kind: "md",
        md: `**Step 1:** Items 1 and 3 are payments to subcontractors for construction operations. Redfern must **verify** both, **deduct** the correct rate from the **labour** element (excluding VAT and materials), pay the deductions to HMRC, and report them on the **monthly return**.

**Step 2:** Items 2, 4 and 5 are outside CIS and are paid in full (with VAT as normal).

**Step 3:** Item 6 is an employee. PAYE and NIC apply through payroll.

**Step 4:** Record the reasons in a short working paper. HMRC may check whether items such as the scaffolding really are labour-free.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-cis-scope",
      prompt: "Is the payment within CIS?",
      categories: ["Within CIS", "Outside CIS"],
      items: [
        { text: "Payment to a self-employed bricklayer for laying a wall", answer: 0 },
        { text: "Payment to a surveyor for a structural survey", answer: 1 },
        { text: "Payment to a plumber for installing a new heating system", answer: 0 },
        { text: "Payment to a supplier for bricks delivered to site", answer: 1 },
        { text: "Wages to a labourer on the contractor's payroll", answer: 1 },
        { text: "Payment to a company for site clearance and groundworks", answer: 0 },
      ],
      explain: "Construction operations are within CIS; professional design, supply of materials and employees' wages are not.",
    },
    {
      kind: "numeric",
      id: "deemed-threshold",
      prompt: "A non-construction business spends more than how many pounds (in millions) on construction operations in 12 months to become a deemed contractor?",
      answer: 3,
      unit: "",
      explain: "£3 million.",
      working: "**£3 million**.",
    },
    {
      kind: "mcq",
      id: "mcq-unregistered",
      prompt: "A subcontractor chooses not to register for CIS. What happens?",
      options: ["No deductions are made", "The contractor deducts at the higher rate of 30%", "The contractor refuses to pay", "HMRC registers them automatically"],
      answer: 1,
      explain: "Unregistered subcontractors suffer deductions at the higher rate.",
    },
    {
      kind: "mcq",
      id: "mcq-public",
      prompt: "From 6 April 2026, payments to local authorities and public bodies as subcontractors are…",
      options: ["Subject to 30% deduction", "Outside the scope of CIS", "Reportable on the monthly return", "Subject to gross payment status only"],
      answer: 1,
      explain: "They are exempted from the scope of CIS from 6 April 2026.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-what",
      prompt: "CIS is best described as…",
      options: ["A new tax", "A withholding system for payments to construction subcontractors", "A VAT scheme", "A pension scheme"],
      answer: 1,
      explain: "Deductions are advance payments of the subcontractor's tax.",
    },
    {
      kind: "mcq",
      id: "q-reg",
      prompt: "Must subcontractors register with CIS?",
      options: ["Yes, by law", "No, but the deduction rate is higher if they don't", "Only companies", "Only sole traders"],
      answer: 1,
      explain: "It's not compulsory but the higher rate applies if they don't.",
    },
    {
      kind: "mcq",
      id: "q-employees",
      prompt: "How are employees on a construction site taxed?",
      options: ["Under CIS", "Under PAYE", "Under VAT", "By Self Assessment"],
      answer: 1,
      explain: "PAYE.",
    },
    {
      kind: "mcq",
      id: "q-excl",
      prompt: "Which is excluded from CIS?",
      options: ["Installing heating systems", "Architectural design", "Demolition", "Painting and decorating"],
      answer: 1,
      explain: "Architecture and surveying are excluded.",
    },
    {
      kind: "mcq",
      id: "q-vat-base",
      prompt: "Is VAT part of the amount from which a CIS deduction is made?",
      options: ["Yes", "No", "Only 5%", "Only on materials"],
      answer: 1,
      explain: "Deductions exclude VAT and the cost of materials.",
    },
  ],
  sources: [
    { label: "What is the Construction Industry Scheme – GOV.UK", url: "https://www.gov.uk/what-is-the-construction-industry-scheme" },
    { label: "Construction Industry Scheme: a guide for contractors and subcontractors (CIS 340)", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
    { label: "CISR11100 – the Scheme: definitions and explanations of CIS terms", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr11100" },
    { label: "CISR14160 – construction operations: fire protection systems", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr14160" },
    { label: "CISR14290 – construction operations: security systems", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr14290" },
    { label: "Simplification and administrative improvements to the CIS – GOV.UK", url: "https://www.gov.uk/government/publications/simplifying-and-improving-construction-industry-scheme-administration/simplification-and-administrative-improvements-to-the-construction-industry-scheme" },
    { label: "Finance Act 2004 Part 3 Chapter 3 – Construction Industry Scheme", url: "https://www.legislation.gov.uk/ukpga/2004/12/part/3/chapter/3" },
  ],
};
