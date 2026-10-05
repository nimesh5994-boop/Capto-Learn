import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "cest-and-working-practices-evidence",
  title: "CEST, contracts and working practices: building the status evidence",
  level: "practitioner",
  minutes: 35,
  summary:
    "What HMRC's Check Employment Status for Tax (CEST) tool does and does not do, when HMRC will stand by its result, how to review a contract and the real working practices together, and how to document a status determination that will stand up to an enquiry.",
  objectives: [
    "Explain what CEST is, what HMRC commits to if it is used correctly, and its limitations",
    "Decide when CEST alone is adequate and when a full written analysis is needed",
    "Review a contract for status-relevant clauses (substitution, control, obligation, risk, equipment)",
    "Compare contractual terms with the actual working practices and spot conflicts",
    "Prepare a file note that records the facts, the reasons and the date of the determination",
  ],
  body: [
    {
      kind: "md",
      md: `The legal tests are not easy to apply, and HMRC publishes a free online tool, **CEST (Check Employment Status for Tax)**, to give a view on the status of a worker for tax purposes and whether the off-payroll working rules apply. Many clients use it as a first line, and many agencies and clients rely on it for their status determination statements. Used well, it provides a useful, defensible position. Used badly, it gives false comfort.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What HMRC says about CEST",
      md: `- CEST "gives HMRC's view of a worker's employment status, based on the information you provide".
- You can **save your answers and the result**, which can be used as a **status determination statement** (SDS).
- HMRC will **stand by the result** as long as the **information you give remains accurate** and the tool is used **in accordance with HMRC's guidance**.
- The result applies to **the specific engagement** and the facts at the time. If the contract or working practices change, **re-run** it.`,
    },
    {
      kind: "md",
      md: `### Limitations to understand

- **It is only as good as the answers.** If the answers don't reflect the real working practices, HMRC's commitment to stand by the result falls away.
- **It may be unable to reach a determination** for borderline engagements. In that case a full analysis is needed.
- **It simplifies the case law.** It is widely criticised for not treating every factor (such as mutuality of obligation) in the way a tribunal would, so a borderline engagement may need a more detailed review than the tool provides.
- **It doesn't replace a contract review.** The tool relies on the contract and practices you describe; it doesn't tell you whether the *contract* is well drafted or enforceable.
- **It applies to the whole engagement.** Don't use it for a worker with several distinct roles for the same client without running it for each.

### When CEST is enough, and when it isn't

| Use CEST alone when… | Do a full written analysis when… |
|---|---|
| The engagement is clearly one thing or the other and the answers are straightforward | The tool can't reach a determination, or the engagement is borderline |
| The client has many similar roles and needs a consistent, auditable process | The value of the engagement is high or the risk is significant |
| The tool's questions match the real arrangement | The real practices differ from the contract or are complex (e.g. substitution in practice, mixed roles) |
| You keep the saved outputs and evidence | HMRC has already opened an enquiry or the worker disagrees |`,
    },
    {
      kind: "table",
      caption: "Contract clauses and what to test against the working practices",
      head: ["Clause or issue", "What a good review checks", "Practical test"],
      rows: [
        ["Substitution", "Is the right genuine and unfettered, or subject to approval? Has anyone ever used it?", "Ask for examples of substitutes. A right never used and subject to client veto carries little weight"],
        ["Control", "Who decides what, how, when and where? Is there a framework of rules, code of conduct, reviews?", "Ask for emails, project plans and examples of instructions"],
        ["Mutuality of obligation", "Is there an obligation to offer and accept work? Is a notice period given?", "Look at cancellation, notice and extension practice"],
        ["Financial risk", "Does the contractor correct poor work at own cost? Is there any fixed-price element?", "Ask what happens when work is rejected"],
        ["Equipment and expenses", "Own equipment or the client's? Expenses reimbursed or included in the rate?", "Look at invoices and the laptop/kit actually used"],
        ["Integration", "Line management, team meetings, appraisals, company email address, staff benefits", "Ask who the contractor reports to and how performance is reviewed"],
        ["Right to terminate", "Short notice, 'for convenience' termination suggests employment-like control", "Compare with the client's own staff terms"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "When paper and practice differ",
      md: `A contract that says the contractor can work remotely, set their own hours and send substitutes will not help if, in practice, they attend the office 9 to 5, take instructions from a manager and no one else is ever allowed to do the work. Tribunals (and *Autoclenz*) look at the **reality**. If you see a conflict, fix the **practice** (and, if needed, the paper), then reassess. **Never** just rewrite the contract to reach the answer the client wants.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The file note (what to record)",
      md: `1. **Who** (worker, PSC, client, agency) and **what** (engagement dates, role, rate).
2. **Documents reviewed**: contract(s), statement of work, any emails.
3. **Facts relied on**, with the source and the date.
4. **Analysis**: personal service, control, mutuality, financial risk, integration.
5. **Conclusion and reasons**, plus any CEST result saved.
6. **Review date** and the trigger events (change of role, extension, new contract).`,
    },
  ],
  scenario: {
    title: "A borderline engagement: Quillon Marketing Ltd",
    narrative: `Quillon Marketing Ltd (a large client) engages Tess Okoro, a freelance brand consultant, through her company **Okoro Brand Ltd**, for 12 months at a day rate. The contract allows substitution with Quillon's consent, says Tess decides how she works and describes her as "an independent contractor". In practice Tess works 3 days a week on Quillon's premises, attends the weekly marketing team meeting, reports to the Head of Marketing who sets her priorities, uses a Quillon laptop and email address, and no one has ever been proposed as a substitute. She has two other small clients.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: run CEST** with answers that reflect the **actual working practices** (not the contract's wording). It may return **employed**, **self-employed**, or be unable to reach a determination.

**Step 2: test the facts.**
- *Substitution:* subject to consent and never used → weak.
- *Control:* priorities set by the Head of Marketing, attendance at team meetings → framework of control.
- *Financial risk:* paid a day rate, no risk of loss, Quillon's equipment → limited risk.
- *Integration:* Quillon laptop and email, team meetings → part of the team.
- *Other clients:* two other small clients → points the other way, but a minor factor.

**Step 3: conclusion.** The practices lean towards **employment**. If Quillon's SDS says "outside IR35" it needs reasons that deal with these facts.

**Step 4: options.** (a) Change the **real** arrangement (genuine deliverables, no day-to-day direction, Tess's own equipment) so that the engagement is genuinely outside; (b) accept it is **inside** IR35 and process it through the fee-payer; (c) if Tess disagrees, use the client's **45-day disagreement process**.

**Step 5: record.** File the CEST output, the notes above and the date, and diarise a review when the engagement is extended or the role changes.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-cest-use",
      prompt: "For each situation, is CEST alone usually adequate or is a full analysis advisable?",
      categories: ["CEST alone usually adequate", "Full analysis advisable"],
      items: [
        { text: "Routine project, clear deliverables, contractor uses own kit and sets own hours", answer: 0 },
        { text: "CEST can't reach a determination", answer: 1 },
        { text: "High-value 18-month role where the contractor reports to a line manager and attends team meetings", answer: 1 },
        { text: "HMRC has opened an enquiry into earlier engagements with the same facts", answer: 1 },
      ],
      explain: "CEST is a helpful tool, but borderline, high-value or disputed cases need a detailed written analysis.",
    },
    {
      kind: "mcq",
      id: "mcq-hmrc-stand-by",
      prompt: "HMRC will stand by a CEST result provided…",
      options: ["The tool is used on the client's website", "The information given is accurate and the tool is used in line with HMRC's guidance", "The result was 'self-employed'", "A tax adviser signs it"],
      answer: 1,
      explain: "HMRC's commitment depends on accurate information and correct use.",
    },
    {
      kind: "mcq",
      id: "mcq-contract-vs-practice",
      prompt: "The contract gives an unfettered right of substitution, but no substitute has ever been used and the client would not accept one. What carries more weight?",
      options: ["The contract wording", "The reality of the working practice", "Whatever HMRC prefers", "Neither"],
      answer: 1,
      explain: "A right that is not genuine or never used carries little weight. Autoclenz looks at the true agreement.",
    },
    {
      kind: "numeric",
      id: "disagreement-days",
      prompt: "How many days does a medium or large client have to respond to a request to review its status determination?",
      answer: 45,
      unit: "days",
      explain: "45 days from the request.",
      working: "**45 days**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-what",
      prompt: "What does CEST stand for?",
      options: ["Check Employment Status for Tax", "Contractor Employment Status Test", "Certified Employment Status Tool", "Check Engagement Status for Tax"],
      answer: 0,
      explain: "Check Employment Status for Tax.",
    },
    {
      kind: "mcq",
      id: "q-save",
      prompt: "Can a saved CEST result be used as an SDS?",
      options: ["Yes, it can serve as a valid status determination statement", "No, never", "Only for public sector clients", "Only if signed by HMRC"],
      answer: 0,
      explain: "HMRC says saved answers and result can be used as an SDS.",
    },
    {
      kind: "mcq",
      id: "q-change",
      prompt: "The role changes materially during the engagement. What should you do?",
      options: ["Nothing", "Re-run the assessment", "Wait for HMRC", "Cancel the contract"],
      answer: 1,
      explain: "Status determinations must be reviewed when the facts change.",
    },
    {
      kind: "mcq",
      id: "q-rewrite",
      prompt: "A client wants the contract rewritten to say the contractor controls their own hours although nothing has changed in practice. What should you advise?",
      options: ["Do it", "It won't change the reality: tribunals look at the actual working practices", "Do it and backdate it", "Do it if HMRC agrees"],
      answer: 1,
      explain: "Paper changes without real change won't alter the outcome.",
    },
    {
      kind: "mcq",
      id: "q-unable",
      prompt: "If CEST can't reach a determination, what is the right next step?",
      options: ["Treat as self-employed", "Do a full written analysis of the facts", "Treat as employed regardless", "Ignore"],
      answer: 1,
      explain: "A detailed analysis, not an assumption.",
    },
  ],
  sources: [
    { label: "Check employment status for tax (CEST) – GOV.UK", url: "https://www.gov.uk/guidance/check-employment-status-for-tax" },
    { label: "Off-payroll working for clients – GOV.UK", url: "https://www.gov.uk/guidance/off-payroll-working-for-clients" },
    { label: "ESM0518 – right of control", url: "https://www.gov.uk/hmrc-internal-manuals/employment-status-manual/esm0518" },
    { label: "Autoclenz Ltd v Belcher [2011] UKSC 41", url: "https://www.bailii.org/uk/cases/UKSC/2011/41.html" },
  ],
};
