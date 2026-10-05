import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "registering-and-verifying-subcontractors",
  title: "Registering for CIS and verifying subcontractors: the 0%, 20% and 30% rates",
  level: "foundation",
  minutes: 30,
  summary:
    "How contractors register with HMRC, why every subcontractor must be verified before the first payment, how the verification result sets the deduction rate (0%, 20% or 30%), what details are needed, and the records to keep.",
  objectives: [
    "Describe how a contractor registers and what information is needed",
    "Explain verification and what each result means for the deduction rate",
    "Identify the details a subcontractor must provide (UTR, NI number, trading name, company details)",
    "Handle a subcontractor who is unregistered or can't be matched",
    "Keep an audit trail that supports the rate applied",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Before a contractor makes its first CIS payment to a subcontractor, it must **verify** the subcontractor with HMRC. The result tells the contractor **what rate to deduct** from the payment. Getting this wrong is the most direct way for a contractor to end up with a liability: an under-deduction is the contractor's problem, not the subcontractor's.`,
    },
    {
      kind: "table",
      caption: "Deduction rates",
      head: ["Subcontractor's status", "Rate of deduction from the labour element (excluding VAT and materials)"],
      rows: [
        ["Registered, verified (standard rate)", "20%"],
        ["Not registered, or HMRC cannot match the details given (higher rate)", "30%"],
        ["Registered with gross payment status", "0% (paid gross)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Registering as a contractor",
      md: `A business must **register as a contractor** with HMRC before it pays any subcontractors for construction work (or once it becomes a deemed contractor). Registration is online and gives the contractor its **CIS reference** and access to the **CIS online service**. Most contractors already have an **employer PAYE reference** and an **Accounts Office reference**. Those are needed, because CIS deductions are paid alongside PAYE/NIC (to the same payment reference) and employers claim any CIS deductions **suffered** on their own income through the **Employer Payment Summary** (EPS).`,
    },
    {
      kind: "md",
      md: `### Verification

1. **Collect** the subcontractor's details: for a **sole trader**, name, trading name (if any), **UTR** and **NI number**; for a **partnership**, the partnership name, UTR and the nominated partner's details; for a **company**, the **company name, company registration number** and **UTR**.
2. **Verify** using the HMRC online service (or the CIS software or by phone), **before** the first payment. HMRC replies with the **rate** to apply: 0%, 20% or 30%, and a **verification number**.
3. **Apply the rate** to every payment until HMRC tells you otherwise. HMRC writes if the rate changes.
4. **Re-verify** if the subcontractor's details change (for example, a sole trader incorporating) or HMRC advises it.
5. **Keep a record**: the verification date, the reference and the rate.

### Subcontractors

A subcontractor doesn't have to register, but if they don't, deductions are at **30%**. To register, the subcontractor needs a **UTR** (apply for one if self-employed and not already registered for Self Assessment). They can apply for **gross payment status** if they meet the tests (see the lesson on GPS).

### When verification fails

If HMRC **can't match** the details (a typo in the UTR or NI number, or a trading name mismatch), the contractor must apply the **30%** rate. Correct the details and **re-verify**, rather than leaving the subcontractor on the higher rate for months. Never deduct at **20%** on the strength of the subcontractor's own assurance.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Pitfalls",
      md: `- Paying a subcontractor **before** verifying (and applying the wrong rate).
- Treating a **company** as if it were a sole trader (using the wrong identifiers).
- Failing to **re-verify** after a change from sole trader to limited company: the new company needs its own verification.
- Not keeping the **verification evidence**, which HMRC can ask for in a compliance check.
- Letting a **bookkeeper** set the rate from the subcontractor's invoice rather than from HMRC's response.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "A simple subcontractor onboarding checklist",
      md: `1. **Contract and scope:** is the work in CIS?
2. **Employment status check:** is the individual genuinely self-employed? (Otherwise PAYE applies.)
3. **Identity:** name, address, UTR, NI number or company details, VAT status.
4. **Verify with HMRC** and record the rate.
5. **Set up** the payment terms (rate, labour/material split, VAT treatment).
6. **Diary** the monthly return and payment dates.`,
    },
  ],
  scenario: {
    title: "Onboarding three subcontractors at Northgate Build Ltd",
    narrative: `Northgate Build Ltd is taking on three subcontractors:

1. **Joel Parks**, a self-employed plasterer who has given his UTR and NI number. HMRC's verification reply says **standard rate**.
2. **Sparkline Electrical Ltd**, a company whose verification reply says it holds **gross payment status**.
3. **Dev Anand**, a joiner who has not registered for CIS and is on his first job. He says "just pay me without deductions as I'll sort the tax out".`,
    walkthrough: [
      {
        kind: "table",
        caption: "Rate for each subcontractor",
        head: ["Subcontractor", "Verification result", "Rate", "Reason"],
        rows: [
          ["Joel Parks", "Registered, standard", "20%", "HMRC's verification result"],
          ["Sparkline Electrical Ltd", "Gross payment status", "0%", "Paid gross; keep the verification evidence"],
          ["Dev Anand", "Not registered / can't be verified", "30%", "Higher rate applies; he can register and be re-verified"],
        ],
      },
      {
        kind: "md",
        md: `**Dev's request.** Northgate can't pay Dev without deductions: the rate is set by HMRC's verification, not by agreement. If it did, Northgate would be liable for the tax it should have deducted, plus penalties. Advise Dev to **register for CIS** and give Northgate his UTR and NI number so it can re-verify and apply 20%.

**Records.** For each, Northgate stores the verification date, reference and rate, a copy of the subcontractor's details, and evidence that employment status was considered.

**Next.** Northgate also calendar-diaries the monthly return (due by the 19th) and the payment (by the 22nd electronically), covered in later lessons.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-rates",
      prompt: "What rate of deduction applies?",
      categories: ["0%", "20%", "30%"],
      items: [
        { text: "A registered sole trader, verified at the standard rate", answer: 1 },
        { text: "A company with gross payment status", answer: 0 },
        { text: "A subcontractor who has not registered for CIS", answer: 2 },
        { text: "A subcontractor whose details HMRC cannot match", answer: 2 },
      ],
      explain: "The rate comes from HMRC's verification: 0% gross, 20% standard, 30% higher.",
    },
    {
      kind: "mcq",
      id: "mcq-when-verify",
      prompt: "When must a contractor verify a new subcontractor?",
      options: ["After the first payment", "Before the first payment", "At the year end", "Only if the payment exceeds £1,000"],
      answer: 1,
      explain: "Before the first payment, to know the correct rate.",
    },
    {
      kind: "mcq",
      id: "mcq-incorporation",
      prompt: "A sole trader subcontractor incorporates. What must the contractor do?",
      options: ["Nothing, the UTR is the same", "Verify the new company before paying it", "Deduct 30% automatically", "Pay gross"],
      answer: 1,
      explain: "The company is a new legal person with its own verification and rate.",
    },
    {
      kind: "mcq",
      id: "mcq-liability",
      prompt: "A contractor deducts 20% from a subcontractor who should have been at 30%. Who bears the shortfall in the first instance?",
      options: ["The subcontractor", "The contractor", "HMRC", "The bank"],
      answer: 1,
      explain: "The contractor is responsible for deducting at the correct rate.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-std",
      prompt: "What is the standard CIS deduction rate?",
      options: ["10%", "20%", "30%", "40%"],
      answer: 1,
      explain: "20%.",
    },
    {
      kind: "mcq",
      id: "q-high",
      prompt: "What is the higher rate for unregistered subcontractors?",
      options: ["20%", "25%", "30%", "35%"],
      answer: 2,
      explain: "30%.",
    },
    {
      kind: "mcq",
      id: "q-details",
      prompt: "Which identifiers are needed to verify a sole trader?",
      options: ["VAT number only", "UTR and NI number", "Company number", "Bank details"],
      answer: 1,
      explain: "UTR and National Insurance number (plus name and trading name).",
    },
    {
      kind: "mcq",
      id: "q-gps",
      prompt: "A subcontractor with gross payment status is paid…",
      options: ["With 20% deducted", "Without deduction", "With 30% deducted", "Net of VAT only"],
      answer: 1,
      explain: "0% deduction.",
    },
    {
      kind: "mcq",
      id: "q-agree",
      prompt: "Can the contractor and subcontractor agree to pay gross without verification?",
      options: ["Yes", "No: the rate is set by HMRC's verification", "Yes if the payment is small", "Yes if the subcontractor is a friend"],
      answer: 1,
      explain: "The rate cannot be agreed commercially.",
    },
  ],
  sources: [
    { label: "What you must do as a CIS contractor – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor" },
    { label: "Make deductions and pay subcontractors – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors" },
    { label: "CISR13080 – standard rate of deduction", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr13080" },
    { label: "CISR13090 – higher rate of deduction for un-matched subcontractors", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr13090" },
    { label: "CIS 340 guide – GOV.UK", url: "https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340" },
  ],
};
