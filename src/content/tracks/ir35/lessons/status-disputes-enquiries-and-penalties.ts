import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "status-disputes-enquiries-and-penalties",
  title: "Status disputes, HMRC enquiries and penalties",
  level: "advanced",
  minutes: 35,
  summary:
    "How disagreements about status are raised and resolved (the client's 45-day review), what happens if HMRC opens an enquiry into a PSC or a client, the time limits for assessment (4, 6 and 20 years), the penalty ranges for inaccuracies, and the practical response plan for a practice.",
  objectives: [
    "Describe the client-led status disagreement process and its consequences if the client doesn't respond",
    "Explain the stages of an HMRC enquiry into off-payroll compliance and the taxpayer's rights",
    "State the assessment time limits and the penalty percentages for the three types of inaccuracy",
    "Calculate a maximum penalty from potential lost revenue",
    "Prepare a sensible response plan and file note when a contractor or client is challenged",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Most status issues are resolved in the **contract and the SDS**. When they are not, there are two main routes: the **client-led disagreement process** (a commercial and compliance process) and, if HMRC disagrees with the outcome, an **enquiry** that can lead to an assessment, a penalty and an appeal to the tribunal. This lesson explains both, and gives you a plan for the first week after a letter arrives.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The client-led status disagreement process (Chapter 10)",
      md: `- If the **worker or the intermediary disagrees** with a client's status determination statement, they can ask the client to **review** it.
- The client must **respond within 45 days** of the request. The response must either **uphold** the determination with reasons or **issue a new SDS**.
- If the client **doesn't respond** within 45 days, the client becomes **liable for the tax and NIC** (as the deemed employer) from that point, even if the engagement is later found to be outside IR35.
- The process runs **within the supply chain**. It is not an appeal to HMRC or to a tribunal.
- The worker may keep a written record of the request and the date it was made.`,
    },
    {
      kind: "md",
      md: `### HMRC enquiries

- **Into a PSC (Chapter 8):** HMRC may open an enquiry into the company's **corporation tax return**, the **PAYE and NIC** position for the worker, or the worker's **Self Assessment**. They'll ask for the **contract, invoices, the status assessment, working practices evidence and the payroll records**.
- **Into a client (Chapter 10):** HMRC may check the client's **size test**, **reasonable care** and its **SDS process**, and the fee-payer's **PAYE records**.
- **Outcome:** HMRC may agree the treatment, issue a **determination or assessment** for unpaid tax and NIC, charge **interest** and impose **penalties**. The taxpayer can **appeal** to the **First-tier Tribunal (Tax Chamber)**, usually after an offer of an internal review.
- **Principle:** the tribunal asks the same questions as the legislation: what is the **hypothetical contract** and would it be one of employment, looking at the real facts and working practices.

### Time limits for assessing

| Behaviour | Time limit to make a discovery assessment (income tax and corporation tax) |
|---|---|
| Ordinary (no careless or deliberate behaviour) | **4 years** after the end of the relevant period |
| Careless | **6 years** |
| Deliberate | **20 years** |

Rules for **PAYE and NIC determinations** have their own time limits and mechanics, so check the specific provisions before telling a client a year is "closed".`,
    },
    {
      kind: "table",
      caption: "Penalties for inaccuracies (as a percentage of the potential lost revenue)",
      head: ["Behaviour", "Maximum penalty", "Minimum with unprompted disclosure"],
      rows: [
        ["Careless", "30%", "0%"],
        ["Deliberate but not concealed", "70%", "20%"],
        ["Deliberate and concealed", "100%", "30%"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Quality of disclosure",
      md: `The percentage actually charged falls between the **maximum and minimum**, depending on the **quality of disclosure**: whether it was **prompted or unprompted**, and how much the taxpayer **told, helped and gave access**. Voluntary correction before HMRC opens an enquiry gives the best outcome. Where you find an error in a client's previous status treatment, **advise disclosure** and keep a record of the advice.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Your own position",
      md: `If you gave the client a status opinion, **keep the working papers** and make sure the opinion rested on the **facts the client gave you**. Your professional indemnity insurer may need early notice of a claim. Be careful not to **destroy or alter** records and don't encourage a client to change the paperwork in a way that misrepresents what happened.`,
    },
  ],
  scenario: {
    title: "An enquiry into Brookfield Digital Ltd",
    narrative: `Brookfield Digital Ltd, a PSC owned by developer Jodie Stone, receives an HMRC letter opening an enquiry into whether its engagements with a small client, Marlowe Insurance (35 staff, so Chapter 8 applies), in 2023/24 and 2024/25 were inside IR35. HMRC thinks PAYE and NIC of **£38,000** (2023/24) and **£41,000** (2024/25) have been underpaid. The company's file contains a short CEST printout from 2023 but nothing for 2024/25 even though the contract was renewed and Jodie began managing Marlowe's junior team.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: stabilise.** Acknowledge the letter, note the deadline, keep all records and ask the client not to alter anything. Notify your PI insurer if you advised on status.

**Step 2: collect the facts.** Contracts, invoices, the CEST printout, email evidence of working practices, evidence of substitution, equipment and the change in 2024/25 when Jodie began managing staff.

**Step 3: analyse.** Re-run the hypothetical contract analysis for each year. The 2023/24 facts may be defensible, but the **management of Marlowe's staff in 2024/25** is a change that CEST should have been re-run for: the 2023 printout does not cover it.

**Step 4: the exposure.** If both years were inside IR35: tax and NIC of £38,000 + £41,000 = **£79,000** plus interest. Penalties depend on behaviour: if **careless**, the maximum is **30%** (£23,700); if the failure was **deliberate and not concealed**, **70%** (£55,300). Careless is the likelier characterisation if the 2024/25 failure was simply a failure to review, and unprompted disclosure of the 2024/25 point could reduce it.

**Step 5: strategy.** Decide whether to **defend** 2023/24 (strong facts) and **concede and negotiate** 2024/25, and provide a full, accurate response within the deadlines. Keep Jodie informed in writing, and consider an offer of a payment on account to limit interest.

**Step 6: time limits.** 2023/24 and 2024/25 are well within the 4-year period, so time limits do not help.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "careless-penalty",
      prompt: "HMRC's potential lost revenue is £40,000 and the inaccuracy is careless. What is the maximum penalty (£)?",
      answer: 12000,
      unit: "£",
      explain: "30% of potential lost revenue is the maximum for careless inaccuracies.",
      working: "£40,000 × 30% = **£12,000**.",
    },
    {
      kind: "numeric",
      id: "deliberate-penalty",
      prompt: "Potential lost revenue is £25,000 and the behaviour is deliberate and concealed. What is the maximum penalty (£)?",
      answer: 25000,
      unit: "£",
      explain: "100% of the potential lost revenue.",
      working: "£25,000 × 100% = **£25,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-time-limit",
      prompt: "What is the time limit for a discovery assessment where the loss of tax was brought about deliberately?",
      options: ["4 years", "6 years", "10 years", "20 years"],
      answer: 3,
      explain: "4 years normally, 6 years for carelessness and 20 years for deliberate behaviour.",
    },
    {
      kind: "mcq",
      id: "mcq-no-response",
      prompt: "A client doesn't respond to a status disagreement within 45 days. What is the consequence?",
      options: ["Nothing", "The client becomes liable for the tax and NIC on the engagement", "The worker is liable", "The engagement is automatically outside IR35"],
      answer: 1,
      explain: "Failure to respond transfers the liability to the client.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-days",
      prompt: "How long does the client have to respond to a request to review its determination?",
      options: ["14 days", "30 days", "45 days", "60 days"],
      answer: 2,
      explain: "45 days.",
    },
    {
      kind: "mcq",
      id: "q-careless",
      prompt: "What is the assessment time limit for careless behaviour?",
      options: ["2 years", "4 years", "6 years", "20 years"],
      answer: 2,
      explain: "6 years.",
    },
    {
      kind: "mcq",
      id: "q-deliberate",
      prompt: "The maximum penalty for deliberate but not concealed behaviour is…",
      options: ["30%", "50%", "70%", "100%"],
      answer: 2,
      explain: "70%.",
    },
    {
      kind: "mcq",
      id: "q-appeal",
      prompt: "Where are appeals against HMRC off-payroll assessments heard first?",
      options: ["The High Court", "The First-tier Tribunal (Tax Chamber)", "The Supreme Court", "The County Court"],
      answer: 1,
      explain: "The First-tier Tribunal (Tax Chamber).",
    },
    {
      kind: "mcq",
      id: "q-disclosure",
      prompt: "How does unprompted disclosure affect the penalty?",
      options: ["No effect", "It allows a lower percentage within the penalty range", "It doubles the penalty", "It removes interest"],
      answer: 1,
      explain: "Quality of disclosure reduces the penalty between the maximum and minimum.",
    },
  ],
  sources: [
    { label: "Off-payroll working for clients – GOV.UK", url: "https://www.gov.uk/guidance/off-payroll-working-for-clients" },
    { label: "Penalties: an overview for agents and advisers – GOV.UK", url: "https://www.gov.uk/guidance/penalties-an-overview-for-agents-and-advisers" },
    { label: "CH82470 – maximum and minimum penalties for each behaviour", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch82470" },
    { label: "CH56100 – assessing time limits: Income Tax and Capital Gains Tax", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch56100" },
  ],
};
