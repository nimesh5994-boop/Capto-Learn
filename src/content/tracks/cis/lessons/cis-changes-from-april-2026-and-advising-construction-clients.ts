import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cis-changes-from-april-2026-and-advising-construction-clients",
  title: "CIS changes from April 2026 and advising construction clients",
  level: "advanced",
  minutes: 35,
  summary:
    "A practical review of the 2026 changes affecting construction clients (nil returns, public bodies outside CIS, tighter gross payment status compliance, MTD for Income Tax for sole-trader subcontractors), with an onboarding checklist, a compliance calendar and the questions to ask at an annual review.",
  objectives: [
    "List the CIS changes taking effect from 6 April 2026 and the action each requires",
    "Explain the interaction between CIS income and Making Tax Digital for Income Tax for sole-trader subcontractors",
    "Build a monthly and annual compliance calendar for contractor and subcontractor clients",
    "Advise a subcontractor client on cash flow, gross payment status and structure",
    "Draft the key points of an annual CIS review letter",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The government's **CIS reform** programme and wider tax changes mean that **2026/27** is a year to **re-check every construction client's process**. Some changes are already in force; others are announced and need checking against the final legislation. Treat the list below as a **review agenda**, and confirm details in HMRC's CIS reform manual and legislation before advising on a specific case.`,
    },
    {
      kind: "table",
      caption: "Changes to know (2026/27)",
      head: ["Change", "Date / status", "Who is affected", "Action"],
      rows: [
        ["Nil returns reinstated: file a nil return for any month with no subcontractor payments unless HMRC was told in advance", "From **6 April 2026**", "Contractors", "Add to the compliance calendar; consider notifying HMRC of expected quiet periods"],
        ["Payments to local authorities and public bodies as subcontractors are outside CIS", "From **6 April 2026**", "Contractors; public bodies", "Stop verifying and deducting; amend processes; check the list of bodies"],
        ["VAT compliance added to the gross payment status compliance test (small non-VAT-registered businesses not penalised for this)", "Announced for **April 2026**; check final regulations", "Subcontractors with GPS", "Monitor VAT filing and payment alongside PAYE/SA/CT"],
        ["HMRC able to cancel GPS immediately on reasonable suspicion of fraudulent returns or information (VAT, SA, CT, PAYE)", "Announced for **April 2026**; check final regulations", "Subcontractors with GPS", "Ensure accurate returns and records; escalate any HMRC contact"],
        ["Tolerances for minor lateness and reasonable-excuse errors in the GPS compliance test", "Regulations to set out the detail", "Subcontractors with GPS", "Keep evidence of reasons for late filing or payment"],
        ["Making Tax Digital for Income Tax: sole traders and landlords with qualifying income over **£50,000** must join", "From **6 April 2026** (then over £30,000 from April 2027 and over £20,000 from April 2028)", "Sole-trader subcontractors", "Check eligibility; digital records and quarterly updates; reconcile CIS deductions"],
      ],
    },
    {
      kind: "md",
      md: `### CIS and Making Tax Digital for Income Tax

For a sole-trader subcontractor above the **£50,000** threshold (measured on **gross income** before expenses), MTD for Income Tax means **digital records** and **quarterly updates** using compatible software, plus a final declaration. CIS affects this in three ways:

1. **Income** should be recorded **gross** (as invoiced, excluding VAT), not net of deductions.
2. **CIS deductions suffered** must be tracked separately so they can be credited on the final declaration, so make sure the software and the **bookkeeping** capture them.
3. **Reconciliation** of the contractor's **payment and deduction statements** to the digital records becomes a **quarterly** discipline rather than a once-a-year task.

### Advising subcontractor clients

- **Cash flow:** compare the **cash cost** of each status: 30% unregistered, 20% registered, 0% GPS. A client at 20% with substantial expenses may wait months for a repayment.
- **GPS:** worth considering for any qualifying business. Build a **compliance monitoring** routine to protect it, especially with the 2026 changes.
- **Structure:** a **limited company** reclaims CIS through the EPS against PAYE/NIC (if it has PAYE) or through the CT return; a **sole trader** reclaims through Self Assessment. Compare the admin and tax outcomes before recommending a change, and remember that a change of structure means **re-verification** and possibly a new GPS application.
- **VAT and the reverse charge:** model the **cash-flow effect** of not collecting VAT from CIS contractor customers.

### Advising contractor clients

- **Process:** verification, rate checks, status review, statements and deadlines.
- **Systems:** can the software split labour and materials, apply the right VAT treatment and run the return on a **tax-month** basis?
- **Risk:** **employment status** and **under-deduction** are the biggest exposures.
- **Governance:** who signs the return, and what evidence supports the declarations?`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Annual CIS review: questions to ask",
      md: `1. List every **subcontractor paid** in the year and the **rate** applied. Does each match HMRC's latest verification?
2. Were all **monthly returns** (including **nil returns**) filed on time? Were all payments made by the **22nd**?
3. Are there **supporting invoices** for every materials deduction?
4. Has any **public body** payment been treated as CIS after 6 April 2026?
5. For subcontractors: are **statements** held for every deduction suffered, and is **gross payment status** still secure?
6. Is any client within **MTD for Income Tax**, and are CIS deductions captured digitally?
7. Has anything changed in the **structure or activity** that needs re-verification or re-registration?`,
    },
  ],
  scenario: {
    title: "An annual review: Beacon Groundworks and Evie Marsh",
    narrative: `**Beacon Groundworks Ltd** is a small contractor that paid subcontractors in 10 of 12 months last year and filed returns only for those months. In April 2026 it did no subcontracting for two months. It also pays a local council for hire of a plant operator under a subcontract.

**Evie Marsh** is a sole-trader landscaper with gross CIS income of **£62,000** in 2024/25 (before expenses), a 20% deduction rate, and no digital records.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Beacon.**
- **Nil returns:** from 6 April 2026 a nil return is needed for the two months with no payments, unless HMRC had been notified in advance. **Past practice** of filing only in active months now creates **penalty exposure**. Set up the calendar and, for planned gaps, notify HMRC.
- **Council:** from 6 April 2026 payments to the local authority as a subcontractor are **outside CIS**: no verification or deduction.
- **Action list:** update the system, check that earlier-year returns (before the change) were correct, and consider a quarterly review of rates against HMRC's verification responses.

**Evie.**
- **MTD:** her gross income of £62,000 exceeds £50,000, so she is likely to be **mandated from 6 April 2026** and needs **digital records and software**, with quarterly updates.
- **CIS:** make sure all contractors' **statements** are held and **deductions suffered** are recorded separately. Consider whether **gross payment status** is available.
- **Cash flow:** check her expected tax liability and whether the 20% deductions exceed it, producing a repayment.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-2026-changes",
      prompt: "Does the 2026 change affect the client directly?",
      categories: ["Affected", "Not affected"],
      items: [
        { text: "A contractor that paid no subcontractors in June 2026 and told HMRC nothing", answer: 0 },
        { text: "A contractor that pays a local authority as a subcontractor", answer: 0 },
        { text: "A sole trader with £22,000 of gross income in 2026/27 (MTD thresholds only from April 2028 at £20,000)", answer: 1 },
        { text: "A sole-trader subcontractor with £70,000 of gross income", answer: 0 },
      ],
      explain: "Check nil returns, public bodies and MTD thresholds for the relevant year.",
    },
    {
      kind: "numeric",
      id: "mtd-threshold",
      prompt: "What is the qualifying income threshold (£) for mandatory Making Tax Digital for Income Tax from 6 April 2026?",
      answer: 50000,
      unit: "£",
      explain: "£50,000, falling to £30,000 from April 2027 and £20,000 from April 2028.",
      working: "**£50,000**.",
    },
    {
      kind: "numeric",
      id: "cis-cash-flow",
      prompt: "A sole trader subcontractor invoices £70,000 a year of labour. How much CIS is deducted over the year at the 20% rate (£)?",
      answer: 14000,
      unit: "£",
      explain: "20% of the labour element.",
      working: "£70,000 × 20% = **£14,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-nil-advance",
      prompt: "How can a contractor avoid filing a nil return in a month with no payments (from 6 April 2026)?",
      options: ["It can't", "By notifying HMRC in advance that it will not be paying subcontractors", "By paying a fee", "By deregistering for VAT"],
      answer: 1,
      explain: "Notification in advance is the alternative.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-nil",
      prompt: "What did the 6 April 2026 change do for nil returns?",
      options: ["Abolished them", "Reinstated the requirement", "Made them quarterly", "Introduced a fee"],
      answer: 1,
      explain: "It reinstated the obligation removed in 2015.",
    },
    {
      kind: "mcq",
      id: "q-public",
      prompt: "From 6 April 2026, payments to local authorities and public bodies as subcontractors are…",
      options: ["Deducted at 30%", "Outside CIS", "Subject to nil returns", "Reported only annually"],
      answer: 1,
      explain: "Exempted from the scope of CIS.",
    },
    {
      kind: "mcq",
      id: "q-vat-gps",
      prompt: "What compliance area is being added to the GPS compliance test?",
      options: ["VAT", "Capital gains tax", "Stamp duty", "Inheritance tax"],
      answer: 0,
      explain: "VAT compliance (with protection for small non-VAT-registered businesses).",
    },
    {
      kind: "mcq",
      id: "q-mtd",
      prompt: "A sole-trader subcontractor with £60,000 of gross income should…",
      options: ["Ignore MTD", "Prepare for MTD for Income Tax from April 2026", "Wait until 2030", "Register for CIS again"],
      answer: 1,
      explain: "Above £50,000 from April 2026.",
    },
    {
      kind: "mcq",
      id: "q-confirm",
      prompt: "Before advising on an announced CIS change, you should…",
      options: ["Assume the announcement is law", "Check the final legislation and HMRC guidance", "Wait a year", "Ask the client's competitor"],
      answer: 1,
      explain: "Confirm details in the final legislation and HMRC's manual.",
    },
  ],
  sources: [
    { label: "Simplification and administrative improvements to the CIS – GOV.UK", url: "https://www.gov.uk/government/publications/simplifying-and-improving-construction-industry-scheme-administration/simplification-and-administrative-improvements-to-the-construction-industry-scheme" },
    { label: "Construction Industry Scheme Reform Manual – updates", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/updates" },
    { label: "Construction Industry Scheme reform – summary of responses", url: "https://www.gov.uk/government/consultations/construction-industry-scheme-reform/outcome/construction-industry-scheme-reform-summary-of-responses" },
    { label: "Making Tax Digital for Income Tax – GOV.UK", url: "https://www.gov.uk/government/collections/making-tax-digital-for-income-tax" },
    { label: "Use Making Tax Digital for Income Tax – GOV.UK", url: "https://www.gov.uk/guidance/use-making-tax-digital-for-income-tax/introduction" },
  ],
};
