import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "tribunal-route-pi-insurance-and-file-review",
  title: "Disputes with HMRC, professional indemnity insurance and file review",
  level: "advanced",
  minutes: 35,
  summary:
    "How a tax dispute moves from an HMRC decision through statutory review and appeal to the First-tier Tribunal and beyond, the time limits, the categories of case, how professional indemnity insurance works and what it requires of the practice, and how file reviews (hot and cold) catch problems before they become claims.",
  objectives: [
    "Describe the dispute route: decision, statutory review, First-tier Tribunal, Upper Tribunal and above",
    "State the 30-day time limits and the effect of late appeals",
    "Explain the tribunal case categories and the practical steps for an appeal",
    "Explain how professional indemnity insurance works, including claims-made cover and notification duties",
    "Design and run a file review process, hot and cold, and use the findings to improve quality",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Most disputes with HMRC end in agreement. When they don't, the client has a **right of appeal** to an independent tribunal. For the practice, two further questions arise: **what if the client says we got it wrong?** (professional indemnity insurance) and **how do we make sure our work stands up?** (file review). This lesson covers all three.`,
    },
    {
      kind: "table",
      caption: "The route from decision to tribunal",
      head: ["Stage", "What happens", "Time limit"],
      rows: [
        ["HMRC decision", "Assessment, amendment, penalty or closure notice issued", "-"],
        ["Appeal to HMRC", "Written notice of appeal to HMRC, giving grounds", "Normally **30 days** from the decision notice"],
        ["Review options", "Taxpayer can accept an **internal statutory review** by an independent HMRC officer, or go straight to the tribunal", "Review request within 30 days; HMRC aims to conclude within 45 days (or as agreed)"],
        ["First-tier Tribunal (Tax Chamber)", "Independent hearing of the appeal on facts and law", "Notice of appeal normally within **30 days** of the decision or the review conclusion"],
        ["Upper Tribunal (Tax and Chancery Chamber)", "Appeal on a **point of law** from the FTT, with permission", "Application for permission within 56 days of the FTT's decision"],
        ["Court of Appeal and Supreme Court", "Further appeals on points of law, with permission", "Per the court rules"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "First-tier Tribunal basics",
      md: `- Cases are allocated to a **category**: **Default Paper** (decided without a hearing), **Basic** (a short hearing, simple cases), **Standard** (most cases) and **Complex** (significant or technically difficult, with greater costs risk).
- **Costs:** in Default Paper, Basic and Standard cases each side generally bears its own costs (the tribunal can still award costs in any category if a party has acted **unreasonably**); in Complex cases the **loser may be ordered to pay the other side's costs**, unless the taxpayer opts out of the cost regime in writing within 28 days of the category notification.
- **Late appeals:** the tribunal can allow a late appeal, applying the test in *Martland v HMRC* (the length of the delay, the reason for it and all the circumstances), but it should not be relied upon.
- **Hardship:** in some disputes a taxpayer can apply to postpone payment of disputed tax.
- **Alternative dispute resolution (ADR):** HMRC offers ADR for suitable cases; use it where appropriate, as it is faster and cheaper.
- **Preparing the appeal:** the grounds, a bundle of documents, witness statements, a clear statement of the **facts** and **law**, and compliance with directions.`,
    },
    {
      kind: "md",
      md: `### Professional indemnity insurance (PII)

- **Required** by the professional bodies and by many regulators for firms providing services. The **minimum cover** and the policy terms differ by body and by firm.
- Most policies are **claims-made**: they respond to **claims first made** against the firm **during the policy period**, regardless of when the work was done, subject to the **retroactive date**.
- **Notify early:** you must tell the insurer of **claims and circumstances** that may give rise to a claim **as soon as you become aware**, and within the policy period, or you may lose cover.
- **Don't admit liability** or settle without the insurer's consent.
- **Exclusions** typically include **dishonesty**, **fines and penalties** (as such), **contractual liabilities beyond what the law would impose**, and **uninsured services**. Check that **all the firm's services** (for example payroll, company secretarial and MTD software) are declared.
- **Run-off cover:** when the firm closes, merges or retires, arrange **run-off (extended reporting) cover**, normally for six years or longer, because claims can arise years after the work.
- **Policy conditions:** accurate **proposal forms**, engagement letters with proper limitation of liability, and keeping to the firm's **quality procedures** can all affect cover.

### File review (quality control)

A **file review** tests whether the firm's work meets its own and professional standards. Use two types:

- **Hot review:** by an experienced reviewer **before** sign-off, checking technical accuracy, completeness and key judgements.
- **Cold review:** by someone independent **after** completion, on a sample of files, checking that the firm's procedures were followed and that issues are learnt from.

A **file review checklist** for a typical compliance file:

1. **Engagement letter** current and signed; scope matches the work.
2. **AML:** CDD complete, risk rating and review date recorded.
3. **Authority:** HMRC authorisation in place for each tax.
4. **Information:** evidence for key figures; queries resolved and recorded.
5. **Technical:** reliefs, elections, disclosures and deadlines checked.
6. **Review and sign-off:** by someone competent; client approval of returns recorded.
7. **Filing and payments:** evidence of submission and client reminders.
8. **Conclusion and lessons**: issues noted for training.

**Record and act on the findings:** categorise **major, moderate, minor**, assign actions and re-review. Share themes in training. Persistent issues should be raised with the partners.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Early warning signs of a claim",
      md: `- A client **complaint** or a letter that blames the firm for a penalty or tax cost.
- An **HMRC decision** that the firm believes arose from its own error.
- A **missed deadline** that the client has had to pay for.
- A **former client's** new accountant asking for your files.

Treat these as **circumstances** to notify to your insurer, follow your **complaints procedure**, preserve documents and **avoid admissions**.`,
    },
  ],
  scenario: {
    title: "A cold file review at Halden & Co",
    narrative: `Halden & Co's quarterly cold review selects five files. On the file for **Yarrow Dental Ltd** the reviewer finds: an **engagement letter** dated four years ago that doesn't mention payroll (the firm runs it); **CDD** from 2019 with no review; a **VAT return** submitted with no record of client approval; and a **late filing penalty** of £200 for the corporation tax return. The firm had written to the client twice for information but the second reminder was not on file.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Findings and actions",
        head: ["Finding", "Rating", "Action"],
        rows: [
          ["Engagement letter doesn't cover payroll", "Moderate", "Issue an updated letter now; add payroll; check fee basis"],
          ["CDD not reviewed since 2019", "Major (AML)", "Refresh CDD, update risk rating, record the review"],
          ["No record of client approval of the VAT return", "Moderate", "Obtain written confirmation; update the process to record approvals"],
          ["£200 penalty and missing reminder", "Minor/Moderate", "Check if the penalty arose from a late client; find the second reminder; consider whether the firm bears any responsibility; notify the partner"],
        ],
      },
      {
        kind: "md",
        md: `**Insurance.** If the client claims the firm is responsible for the £200 penalty, treat it as a **circumstance**: record it, tell the partner and, if a claim is intimated, notify the **insurer** promptly. Don't make admissions.

**Learning.** Share the findings in the next team meeting: remind staff about **approvals**, **reminders** and **periodic CDD reviews**. Re-check the file in three months to confirm the fixes.

**Appeal option.** If the penalty arose from a reasonable excuse (for example an HMRC system failure), appeal within **30 days**.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "appeal-days",
      prompt: "Within how many days of an HMRC decision must a taxpayer normally appeal?",
      answer: 30,
      unit: "days",
      explain: "30 days.",
      working: "**30 days**.",
    },
    {
      kind: "numeric",
      id: "categories-count",
      prompt: "How many case categories does the First-tier Tribunal (Tax Chamber) use (Default Paper, Basic, Standard and Complex)?",
      answer: 4,
      unit: "",
      explain: "Four categories.",
      working: "**4**.",
    },
    {
      kind: "classify",
      id: "classify-review",
      prompt: "Is the review a hot review or a cold review?",
      categories: ["Hot review", "Cold review"],
      items: [
        { text: "A senior checks the tax computation before the return is filed", answer: 0 },
        { text: "A partner not involved samples completed files each quarter to test procedures", answer: 1 },
        { text: "A reviewer checks the key judgements on a file before the client signs the accounts", answer: 0 },
        { text: "An independent reviewer examines five closed files and reports on compliance with AML policies", answer: 1 },
      ],
      explain: "Hot reviews happen before sign-off; cold reviews happen after completion.",
    },
    {
      kind: "mcq",
      id: "mcq-claims-made",
      prompt: "A claims-made PII policy responds to…",
      options: ["Work done in the policy year only", "Claims first made against the firm during the policy period (subject to the retroactive date)", "Claims made before the policy started", "Only fraud"],
      answer: 1,
      explain: "Claims first made during the policy period.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ftt",
      prompt: "Which tribunal hears most first-instance tax appeals?",
      options: ["The Upper Tribunal", "The First-tier Tribunal (Tax Chamber)", "The High Court", "The County Court"],
      answer: 1,
      explain: "The First-tier Tribunal (Tax Chamber).",
    },
    {
      kind: "mcq",
      id: "q-ut",
      prompt: "An appeal from the FTT to the Upper Tribunal is on…",
      options: ["Any ground", "A point of law, with permission", "Costs only", "The facts only"],
      answer: 1,
      explain: "A point of law.",
    },
    {
      kind: "mcq",
      id: "q-notify",
      prompt: "When should a firm notify its PII insurer of circumstances that may give rise to a claim?",
      options: ["At renewal only", "As soon as it becomes aware", "After settling", "Never"],
      answer: 1,
      explain: "As soon as it becomes aware, within the policy period.",
    },
    {
      kind: "mcq",
      id: "q-runoff",
      prompt: "Why arrange run-off cover on closing a practice?",
      options: ["It's cheaper", "Claims can arise years after the work", "HMRC requires it", "To avoid tax"],
      answer: 1,
      explain: "Claims-made policies need continued cover after closure.",
    },
    {
      kind: "mcq",
      id: "q-admit",
      prompt: "Should a firm admit liability to a client without telling its insurer?",
      options: ["Yes", "No", "Only if small", "Only verbally"],
      answer: 1,
      explain: "No admissions or settlements without the insurer's consent.",
    },
  ],
  sources: [
    { label: "Appeal against a tax decision – GOV.UK", url: "https://www.gov.uk/tax-tribunal" },
    { label: "Tax Tribunal: what to expect – GOV.UK", url: "https://www.gov.uk/tax-tribunal/appeal-to-the-tribunal" },
    { label: "Self Assessment: how to appeal against penalties for late filing and late payment – GOV.UK", url: "https://www.gov.uk/government/publications/self-assessment-appeal-against-penalties-for-late-filing-and-late-payment-sa370/self-assessment-how-to-appeal-against-penalties-for-late-filing-and-late-payment" },
    { label: "ARTG8660 – First-tier Tribunal: right to award costs (HMRC)", url: "https://www.gov.uk/hmrc-internal-manuals/appeals-reviews-and-tribunals-guidance/artg8660" },
    { label: "Responsibilities and obligations of an ICAEW member firm – AML", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/responsibilities-and-obligations-of-an-icaew-member-firm" },
    { label: "HMRC Compliance Handbook", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook" },
  ],
};
