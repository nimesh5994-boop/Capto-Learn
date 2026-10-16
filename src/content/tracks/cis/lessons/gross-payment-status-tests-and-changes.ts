import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "gross-payment-status-tests-and-changes",
  title: "Gross payment status: the three tests, keeping it and the 2026 changes",
  level: "practitioner",
  minutes: 35,
  summary:
    "How a subcontractor qualifies for gross payment status (the business, turnover and compliance tests), how to calculate the turnover threshold for each business type, how HMRC can withdraw status, why VAT compliance counts in the compliance test, and the April 2026 supply-chain fraud rules that allow immediate cancellation.",
  objectives: [
    "State the business, turnover and compliance tests for gross payment status",
    "Calculate the minimum turnover required for a sole trader, partnership or company",
    "Explain how status is kept, reviewed and withdrawn",
    "Explain the VAT compliance test and the April 2026 supply-chain fraud rules, and why they matter for compliance monitoring",
    "Advise a subcontractor client on applying for and protecting gross payment status",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A subcontractor with **gross payment status (GPS)** is paid by contractors **without deductions**. That is a significant **cash-flow benefit**: no tax is held back for months, and no reclaim is needed. But HMRC tests whether the business is genuine and tax-compliant, and **status can be lost** if compliance slips. As the adviser you need to know the tests and to monitor your client's compliance record.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The three tests",
      md: `**1. Business test.** The business carries out **construction work (or provides labour for it) in the UK** and **operates through a bank account**.

**2. Turnover test.** The **net construction turnover** (income from construction work **excluding VAT and the cost of materials**) in the **12 months before the application** must be at least:

| Business type | Minimum net turnover |
|---|---|
| **Sole trader** | **£30,000** |
| **Partnership** | **£30,000 for each partner**, or **£100,000** for the whole partnership |
| **Company** | **£30,000 for each director** (or, where the company is a close company with five or fewer controllers, for each controller), or **£100,000** for the whole company |

**3. Compliance test.** The business has **paid its tax and National Insurance on time** in the past (filing returns and paying tax, NIC, VAT where relevant on time). HMRC looks at the **last 12 months**.`,
    },
    {
      kind: "md",
      md: `### Working out the turnover threshold

- A **sole trader** needs **£30,000**.
- A **partnership** can meet the test either way, so the threshold is the **lower** of £30,000 × the number of partners and £100,000.
- A **company** is the same: the **lower** of £30,000 × the number of directors (or controllers) and **£100,000**.

For a company with **four** or more directors the £100,000 total will be the lower figure.

### Applying and keeping the status

- **Apply** online (or by the paper forms) as a sole trader, partnership or limited company. Providing **false information** can lead to penalties.
- HMRC checks the three tests and **reviews status annually**. A business that has GPS keeps it only while it **continues to meet** the tests.
- **Withdrawal:** HMRC can withdraw GPS if the business **fails the compliance test** (late returns or late payment) or if the business no longer meets the **business** or **turnover** tests. The business is then paid at **20%** (or 30% if details are mismatched) until it requalifies. Contractors are told through verification.
- **Reapplying** is possible once the compliance problems are resolved.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Recent changes to know",
      md: `- **VAT compliance** has been part of the GPS **compliance test** since **6 April 2024** (CISR46040), so late VAT returns and payments now count alongside PAYE, Self Assessment and Corporation Tax.
- **Supply-chain fraud (from 6 April 2026):** where a business **knew or should have known** that its payments or CIS credits were connected with deliberate non-compliance, HMRC can raise a determination, charge a **30% penalty** (which can be transferred to an officer) and **cancel GPS immediately**, with a **five-year bar** on reapplying (CISR85010).
- **Payments to local authorities and public bodies** as subcontractors fall outside CIS from 6 April 2026.
- **Nil returns** for contractors are reinstated from 6 April 2026 (see the returns lesson).

Check the **CIS reform manual and legislation** to confirm the final detail and dates before advising on a specific case.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Protecting the status: a monitoring routine",
      md: `1. A **diary** for every filing and payment date: VAT, PAYE, corporation tax or SA, NIC.
2. A **quarterly** compliance check by the practice: are all returns in and paid?
3. Early **time-to-pay** conversations if cash is short, rather than paying late.
4. **Notify HMRC** of changes (new directors, change of business structure) promptly.
5. **Keep evidence** of turnover and the construction/material split to support the turnover test.`,
    },
  ],
  scenario: {
    title: "Applying for GPS: Alder Roofing Ltd",
    narrative: `Alder Roofing Ltd has **three directors**. Over the last 12 months its construction income was **£410,000 including £60,000 of VAT** and included **£130,000** of materials charged at cost. It has filed all returns and paid all tax on time for the last 12 months. It asks whether it can apply for gross payment status.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: business test.** Alder carries out roofing work in the UK and uses a business bank account. Pass.

**Step 2: net construction turnover.** £410,000 − £60,000 VAT = £350,000; − £130,000 materials = **£220,000**.

**Step 3: threshold.** Three directors × £30,000 = **£90,000**, which is lower than £100,000. Alder's £220,000 comfortably exceeds both. Pass.

**Step 4: compliance test.** All returns and payments on time for 12 months. Pass.

**Step 5: apply** online as a limited company. Contractors will verify Alder's status and pay gross once HMRC has confirmed it.

**Step 6: protect the status.** Diary the VAT, PAYE and corporation tax dates, because late VAT counts in the compliance test too. From April 2026, being caught up in supply-chain fraud can lead to immediate cancellation and a five-year bar.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "min-turnover-3-directors",
      prompt: "A company has 3 directors. What is the minimum net construction turnover (£) needed for GPS, taking the lower of £30,000 per director and £100,000 for the company?",
      answer: 90000,
      unit: "£",
      explain: "£30,000 × 3 = £90,000, which is less than £100,000.",
      working: "Lower of £90,000 and £100,000 = **£90,000**.",
    },
    {
      kind: "numeric",
      id: "min-turnover-4-directors",
      prompt: "A company has 4 directors. What is the minimum net construction turnover (£)?",
      answer: 100000,
      unit: "£",
      explain: "£30,000 × 4 = £120,000, which is more than £100,000, so £100,000 is the lower route.",
      working: "Lower of £120,000 and £100,000 = **£100,000**.",
    },
    {
      kind: "numeric",
      id: "net-construction-turnover",
      prompt: "A sole trader's income for the last 12 months was £72,000 including £12,000 VAT, and £18,000 of that was the cost of materials. What is the net construction turnover for the GPS test (£)?",
      answer: 42000,
      unit: "£",
      explain: "Exclude VAT and the cost of materials.",
      working: "£72,000 − £12,000 − £18,000 = **£42,000** (above £30,000).",
    },
    {
      kind: "classify",
      id: "classify-gps",
      prompt: "Which test is being applied?",
      categories: ["Business test", "Turnover test", "Compliance test"],
      items: [
        { text: "The business does construction work in the UK through a bank account", answer: 0 },
        { text: "£30,000 net construction income for a sole trader in the last 12 months", answer: 1 },
        { text: "Returns filed and tax paid on time over the last 12 months", answer: 2 },
        { text: "£100,000 turnover for the whole company", answer: 1 },
      ],
      explain: "Business: genuine construction activity and a bank account; turnover: the monetary thresholds; compliance: tax record.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-sole",
      prompt: "What turnover must a sole trader show for GPS?",
      options: ["£10,000", "£30,000", "£100,000", "£250,000"],
      answer: 1,
      explain: "£30,000.",
    },
    {
      kind: "mcq",
      id: "q-turnover-exclude",
      prompt: "Which are excluded from net construction turnover?",
      options: ["VAT and the cost of materials", "Only VAT", "Only materials", "Nothing"],
      answer: 0,
      explain: "VAT and the cost of materials.",
    },
    {
      kind: "mcq",
      id: "q-withdraw",
      prompt: "What happens to subcontractors who fail the compliance test after getting GPS?",
      options: ["Nothing", "Status can be withdrawn and deductions apply again", "They pay a flat fine", "They must close"],
      answer: 1,
      explain: "HMRC can withdraw GPS.",
    },
    {
      kind: "mcq",
      id: "q-vat-2026",
      prompt: "Since April 2024, which tax's compliance has also counted in the GPS compliance test?",
      options: ["VAT", "Inheritance tax", "Capital gains tax", "Stamp duty"],
      answer: 0,
      explain: "VAT compliance has counted since 6 April 2024 (HMRC manual CISR46040), alongside PAYE, Self Assessment and Corporation Tax.",
    },
    {
      kind: "mcq",
      id: "q-partners",
      prompt: "A partnership with two partners needs net turnover of at least…",
      options: ["£30,000", "£60,000 (or £100,000 for the whole partnership if lower)", "£200,000", "£500,000"],
      answer: 1,
      explain: "£30,000 per partner = £60,000, which is lower than £100,000.",
    },
  ],
  sources: [
    { label: "How to get gross payment status – GOV.UK", url: "https://www.gov.uk/what-you-must-do-as-a-cis-subcontractor/gross-payment-status" },
    { label: "CISR44100 – turnover test: the threshold explained", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr44100" },
    { label: "CISR43180 – gross payment or payment under deduction: turnover test failures", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/cisr43180" },
    { label: "Construction Industry Scheme reform – summary of responses", url: "https://www.gov.uk/government/consultations/construction-industry-scheme-reform/outcome/construction-industry-scheme-reform-summary-of-responses" },
    { label: "Construction Industry Scheme Reform Manual – updates", url: "https://www.gov.uk/hmrc-internal-manuals/construction-industry-scheme-reform/updates" },
  ],
};
