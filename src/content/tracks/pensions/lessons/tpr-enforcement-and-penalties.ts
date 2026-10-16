import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "tpr-enforcement-and-penalties",
  title: "TPR enforcement: notices, penalties and putting things right",
  level: "practitioner",
  minutes: 30,
  summary:
    "How The Pensions Regulator enforces automatic enrolment: compliance and unpaid contributions notices, the £400 fixed penalty, escalating daily penalties by employer size, reviews and appeals, and what a practice should do when a client is late or non-compliant.",
  objectives: [
    "Describe the sequence of TPR enforcement steps from reminder to escalating penalty",
    "Calculate a fixed and an escalating penalty for a given employer size",
    "Explain how to correct late enrolment and unpaid contributions",
    "Explain the review and appeal routes",
    "Advise a client on an effective response to a TPR notice",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `TPR's approach is **to educate and enable first, then enforce**. Most employers who hit a problem are given the chance to fix it. But the penalties for ignoring notices are real and daily fines can grow quickly, so a practice that helps with payroll needs a clear process for responding.`,
    },
    {
      kind: "table",
      caption: "The enforcement ladder",
      head: ["Step", "What it is", "Typical trigger"],
      rows: [
        ["Reminder / information request", "TPR writes to ask about a duty or declaration", "Missed duties start date, no declaration of compliance"],
        ["Compliance notice", "A statutory notice setting out what to do and by when", "A breach is confirmed"],
        ["Unpaid contributions notice", "Requires the employer to pay unpaid contributions to the scheme and tell workers", "Contributions deducted but not paid, or not paid by the due date"],
        ["Fixed penalty notice (FPN)", "A **£400** fine", "Failure to comply with a compliance or unpaid contributions notice, or other breach"],
        ["Escalating penalty notice (EPN)", "A **daily** fine until compliance", "Failure to comply after an FPN"],
        ["Prosecution / further action", "Criminal proceedings in serious cases", "Wilfully failing to enrol eligible staff, or knowingly giving false information in a declaration of compliance"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Escalating penalty: daily rate by number of workers",
      md: `The EPN accrues per day after the compliance deadline in the notice:

| Number of persons employed | Daily rate |
|---|---:|
| 1–4 | £50 |
| 5–49 | £500 |
| 50–249 | £2,500 |
| 250–499 | £5,000 |
| 500 or more | £10,000 |

The fine grows until the employer complies with the notice or TPR withdraws it. A **fixed penalty** of **£400** is separate.`,
    },
    {
      kind: "md",
      md: `### Putting it right

1. **Stop and assess.** Find out the **date** the duty arose, which workers should have been enrolled and from when.
2. **Enrol** the workers immediately and pay **backdated contributions** where TPR's guidance requires them. The employer must pay its own share of anything owed. How far the **employee** share missed through late enrolment can be recovered from the worker is limited, so follow TPR's detailed guidance on late enrolment (and take advice) before making any deduction.
3. **Pay** unpaid contributions to the scheme and agree the catch-up with the provider. The duty to report **material payment failures** to TPR sits with the scheme's trustees or managers (the provider), not the employer, so a late payment may already have been reported; check for any unpaid contributions notice.
4. **Declare compliance** (or re-declare) as soon as possible.
5. **Respond to every TPR notice by its deadline**, even if only to ask for an extension or provide evidence.
6. **Review** the payroll set-up so the error cannot recur, and record the fix on the client file.

### Reviews and appeals

An employer can **apply for a review** of a notice by TPR within the time limit stated in the notice, and then **appeal to the First-tier Tribunal (General Regulatory Chamber)** if the review doesn't resolve it. A notice stays in force while the review or appeal is under way, unless TPR suspends it. Evidence of **genuine mistakes**, prompt action and cooperation is what matters; ignorance of the rules is generally not a defence.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't ignore the post",
      md: `A frequent cause of large fines is a TPR letter sent to the **registered office** or a former address that nobody opens. Check that your client's **registered address**, **TPR contact details** and **payroll contact** are current, and agree who monitors the mail. If you act as a payroll bureau, confirm in the engagement letter that you will tell the client when you receive anything from TPR on its behalf.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Practice risk",
      md: `If your firm runs payroll and pensions for a client and a duty is missed because of **your** error (a late assessment, a wrong category), you may be exposed to a **negligence** claim for the penalty and the backdated cost. Keep the assessment output, the date and an email trail, and review the position at each pay run.`,
    },
  ],
  scenario: {
    title: "A late declaration at Ironbridge Bakers Ltd",
    narrative: `Ironbridge Bakers Ltd employs 12 staff. It missed its duties start date and did not enrol anyone for four months. TPR issues a compliance notice requiring enrolment and a declaration within 28 days. The company doesn't respond, and TPR issues a fixed penalty notice. When that is also ignored, an escalating penalty notice is issued with a compliance date of 1 March. The company finally complies on 11 March.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the fixed penalty.** £400 for failing to comply with the compliance notice.

**Step 2: the escalating penalty.** The company has 12 workers, so the daily rate is **£500**. It complied 10 days after the compliance date: 1 March to 10 March inclusive is **10 days** of accrual, so the EPN is **£5,000**.

**Step 3: total penalties.** £400 + £5,000 = **£5,400**. In addition the company must pay backdated employer contributions for the four months of missed enrolment, and the workers can ask for the employee side to be put right.

**Step 4: what a good response would have looked like.** Responding to the compliance notice within 28 days with a plan, enrolling workers and declaring compliance would very likely have avoided both penalties. If the company had a genuine reason (for example the notice went to the wrong address), a review application with evidence would have been the next step.

**Step 5: advise.** Recommend a calendar of AE dates (declaration, re-enrolment window) and confirm who monitors TPR correspondence.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "epn-total",
      prompt: "An employer with 30 workers ignores a fixed penalty and receives an escalating penalty notice. It complies 6 days after the compliance date. What is the escalating penalty (£)?",
      answer: 3000,
      unit: "£",
      explain: "30 workers fall in the 5–49 band at £500 a day.",
      working: "6 days × £500 = **£3,000**.",
    },
    {
      kind: "numeric",
      id: "fixed-penalty",
      prompt: "What is the amount of a TPR fixed penalty notice (£)?",
      answer: 400,
      unit: "£",
      explain: "£400.",
      working: "Fixed penalty: **£400**.",
    },
    {
      kind: "mcq",
      id: "mcq-appeal",
      prompt: "After a review, where can an employer appeal a TPR penalty?",
      options: ["The High Court directly", "The First-tier Tribunal (General Regulatory Chamber)", "HMRC", "Companies House"],
      answer: 1,
      explain: "The First-tier Tribunal's General Regulatory Chamber hears appeals against TPR notices.",
    },
    {
      kind: "classify",
      id: "classify-tpr-steps",
      prompt: "Is this likely to attract a penalty?",
      categories: ["Likely penalty", "Unlikely penalty"],
      items: [
        { text: "Ignoring a compliance notice and then a fixed penalty notice", answer: 0 },
        { text: "Responding to a compliance notice in time and enrolling the workers", answer: 1 },
        { text: "Deducting employee contributions but never paying them to the scheme", answer: 0, why: "Unpaid contributions notice, possible prosecution." },
        { text: "Declaring compliance a few weeks late with no TPR letter yet", answer: 1, why: "TPR typically reminds first." },
      ],
      explain: "Penalties follow ignored notices and serious breaches; prompt fixes usually avoid them.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-fpn",
      prompt: "What is the fixed penalty notice amount?",
      options: ["£50", "£400", "£500", "£5,000"],
      answer: 1,
      explain: "£400.",
    },
    {
      kind: "mcq",
      id: "q-epn-small",
      prompt: "Daily EPN rate for an employer with 3 workers?",
      options: ["£50", "£500", "£2,500", "£10,000"],
      answer: 0,
      explain: "1–4 workers: £50.",
    },
    {
      kind: "mcq",
      id: "q-epn-large",
      prompt: "Daily EPN rate for an employer with 600 workers?",
      options: ["£500", "£2,500", "£5,000", "£10,000"],
      answer: 3,
      explain: "500 or more: £10,000.",
    },
    {
      kind: "mcq",
      id: "q-first",
      prompt: "TPR's approach in most cases is to…",
      options: ["Prosecute immediately", "Educate and enable first, then enforce", "Ignore small employers", "Refer to HMRC"],
      answer: 1,
      explain: "Support compliance first; penalties follow ignored notices.",
    },
    {
      kind: "mcq",
      id: "q-induce",
      prompt: "Inducing a worker to opt out is…",
      options: ["Allowed with consent", "A breach of the law that TPR can enforce with compliance notices and penalties", "Only a tax matter", "A private matter between employer and worker"],
      answer: 1,
      explain: "It is prohibited under the Pensions Act 2008 and TPR can take enforcement action. The automatic enrolment criminal offences are wilfully failing to enrol eligible staff and knowingly giving false information in a declaration.",
    },
  ],
  sources: [
    { label: "How TPR enforces – automatic enrolment", url: "https://www.thepensionsregulator.gov.uk/en/employers/warnings-notices-and-payment-of-fines/how-we-enforce" },
    { label: "What happens if my client doesn't comply? (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/what-happens-if-my-client-doesnt-comply-or-is-late-complying" },
    { label: "Reporting payment failures (TPR General Code)", url: "https://www.thepensionsregulator.gov.uk/document-library/code-of-practice/reporting-to-tpr/whistleblowing-reporting-breaches-of-the-law/reporting-payment-failures" },
    { label: "Apply for a review (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/employers/warnings-notices-and-payment-of-fines/apply-for-a-review" },
    { label: "Appeal to the tribunal (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/employers/warnings-notices-and-payment-of-fines/appeal-to-the-tribunal" },
  ],
};
