import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "auto-enrolment-employer-duties",
  title: "Automatic enrolment: the employer's duties from start to finish",
  level: "foundation",
  minutes: 30,
  summary:
    "What an employer must do under automatic enrolment: the duties start date, choosing a scheme, assessing and enrolling workers, the declaration of compliance and re-enrolment cycle, who counts as an employer (including the director exemptions) and what records to keep.",
  objectives: [
    "Identify whether a client is an employer with automatic enrolment duties, including company-director cases",
    "Set out the employer duties in order, from duties start date to declaration of compliance",
    "Explain re-enrolment and re-declaration",
    "List the records an employer must keep and for how long",
    "Know where the Pensions Regulator's guidance and enforcement sit",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Under the **Pensions Act 2008** every employer must enrol eligible workers into a qualifying workplace pension and contribute to it. The system is policed by **The Pensions Regulator (TPR)**, not HMRC. A practice that runs payroll for a client will usually be asked to handle the mechanics, but the **legal duty stays with the employer**, so you need to be clear what is done, by whom, and when.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who is an employer for automatic enrolment?",
      md: `An employer with at least one **worker** has duties. Directors are special:

- A **sole director** with no other staff is **never** an employer for automatic enrolment, whether or not they have an employment contract. They have no duties and need not complete a declaration of compliance.
- A **director is a "worker"** only if they have a **contract of employment** with the company **and** at least one other person (who may be another director) also has a contract of employment with it.
- A company with **two directors who both have employment contracts** and no other staff: both are workers, so the company has duties.
- A company with two directors where **only one** has an employment contract and no other staff: neither is a worker, so no duties.
- A company with **any other employee** (for example a part-time administrator) has duties for that employee, and for any director with a contract.

TPR provides an online form to tell it you are **not an employer** (useful to document the position).`,
    },
    {
      kind: "table",
      caption: "The employer duties in order",
      head: ["Step", "What to do", "Timing"],
      rows: [
        ["1. Establish the duties start date", "The date the first worker is employed (for a new employer) or the staging date if already established", "TPR sends a letter; for new employers it is the first day of employment of the first worker"],
        ["2. Choose a qualifying scheme", "Pick a scheme that meets AE standards (NEST, People's Pension, etc.) and set up the employer account", "Before the duties start date"],
        ["3. Assess the workforce", "Identify each worker's category from age and earnings (next lesson)", "Every pay reference period, from the duties start date"],
        ["4. Enrol eligible jobholders", "Automatically enrol and start contributions", "From the duties start date, or at the end of any postponement"],
        ["5. Write to workers", "Tell each worker what has happened and their rights", "Within 6 weeks of the duties start date or enrolment date"],
        ["6. Pay contributions", "Deduct employee contributions from pay and pay both to the scheme", "By the 22nd of the month following deduction (19th if paying by cheque), unless the scheme sets an earlier date"],
        ["7. Declare compliance", "Submit the online declaration of compliance to TPR", "Within 5 months of the duties start date"],
        ["8. Re-enrol and re-declare", "Re-enrol eligible jobholders who have opted out or stopped, every 3 years", "Re-enrolment date every 3 years; re-declaration within 5 months of it"],
        ["9. Keep records", "Evidence of the above (see below)", "Most records for 6 years"],
      ],
    },
    {
      kind: "md",
      md: `### Declaration of compliance and re-declaration

The **declaration of compliance** is made online with TPR (employer or an authorised third party). It confirms the employer has chosen a scheme, assessed workers and enrolled those who qualify. Missing the 5-month deadline does **not** by itself cause a fine, but TPR sends reminders and may investigate. Every **three years** the employer must carry out **re-enrolment** (on a chosen date within a six-month window around the third anniversary of staging) and file a **re-declaration**.

### Records to keep

- Names, dates of birth and NI numbers of staff, and their categories
- Enrolment dates, opt-out notices and refunds
- Pension scheme details and the contributions paid and when
- Postponement notices
- The declaration of compliance and any TPR correspondence

Most records must be kept for **six years**, and some (such as opt-in and opt-out notices) for four. The employer is responsible even where a payroll bureau holds them, so check that your engagement terms say who keeps what.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common practice failures",
      md: `- **Wrong categorisation**: a worker has a late-paid bonus or a second job and is missed in the assessment. Assess every pay period.
- **Late contributions**: contributions must reach the scheme by the statutory deadline, not just be deducted.
- **Not recognising a new duties start date** when a sole-director company takes on its first employee.
- **Ignoring re-enrolment** until a TPR letter arrives.
- **Assuming "the payroll software does it"**: the software helps, but the employer must still declare compliance and check the outputs.`,
    },
  ],
  scenario: {
    title: "A first employee at Marlowe Design Ltd",
    narrative: `Marlowe Design Ltd is owned by a sole director, Anya Marlowe, who has no employment contract and no other staff. On 4 January 2027 the company takes on its first employee, Callum, aged 29, on an annual salary of £28,000. Anya asks: *"Do I have to do anything about pensions? Does the company have to enrol me?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: before Callum.** The company was a one-director company with no other staff, so it had no automatic enrolment duties and never needed a declaration.

**Step 2: with Callum.** Callum is a worker. The company is now an **employer** and the **duties start date is 4 January 2027**.

**Step 3: Anya.** She is a director with no contract of employment, so she is **not a worker** and she is not enrolled automatically (she can still join a scheme voluntarily, and the company can make employer contributions for her under the wholly-and-exclusively rules).

**Step 4: Callum's category.** Age 29 and earnings of £28,000 are above the £10,000 trigger, so he is an **eligible jobholder** and must be automatically enrolled (unless postponed). Contributions are calculated on **qualifying earnings** (£28,000 − £6,240 = £21,760).

**Step 5: do the setup.** Choose a scheme (before 4 January 2027), set up payroll, enrol Callum, write to him within six weeks, and submit the declaration of compliance within five months of the duties start date, that is **by 3 June 2027**.

**Step 6: diary the cycle.** Note the 3-year re-enrolment window and the payment deadline for each month's contributions.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-ae-employer",
      prompt: "Does the company have automatic enrolment duties?",
      categories: ["Has duties", "No duties"],
      items: [
        { text: "One-person company: sole director, no contract of employment, no staff", answer: 1 },
        { text: "Sole director with an employment contract and no other staff", answer: 1, why: "A sole director is never an employer for AE, contract or not." },
        { text: "Two directors, both with employment contracts, no other staff", answer: 0 },
        { text: "Two directors, only one with an employment contract, no other staff", answer: 1 },
        { text: "A sole-director company with one part-time employee", answer: 0 },
      ],
      explain: "A director is a worker only if they have a contract of employment and at least one other person also has one.",
    },
    {
      kind: "numeric",
      id: "declaration-months",
      prompt: "Within how many months of the duties start date must the declaration of compliance be made?",
      answer: 5,
      unit: "months",
      explain: "The declaration must be made within five months of the duties start date.",
      working: "Five months: **5**.",
    },
    {
      kind: "mcq",
      id: "mcq-reenrol",
      prompt: "How often must an employer carry out re-enrolment?",
      options: ["Every year", "Every 3 years", "Every 5 years", "Only when TPR asks"],
      answer: 1,
      explain: "Re-enrolment is repeated every three years, with a re-declaration.",
    },
    {
      kind: "mcq",
      id: "mcq-contribution-date",
      prompt: "Employee contributions deducted from March pay must reach the pension scheme by…",
      options: ["The 22nd of April (electronic payment)", "The end of March", "The end of the tax year", "The date of the next payroll"],
      answer: 0,
      explain: "By the 22nd of the month following deduction for electronic payments (19th by cheque), unless the scheme sets an earlier date.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-regulator",
      prompt: "Who regulates automatic enrolment duties?",
      options: ["HMRC", "The Pensions Regulator", "The FCA", "Companies House"],
      answer: 1,
      explain: "The Pensions Regulator (TPR).",
    },
    {
      kind: "mcq",
      id: "q-letter",
      prompt: "Within what time must workers be written to after enrolment?",
      options: ["6 weeks", "6 months", "1 week", "1 year"],
      answer: 0,
      explain: "Within six weeks of the enrolment date or duties start date.",
    },
    {
      kind: "mcq",
      id: "q-sole",
      prompt: "A sole director with no employees receives a TPR letter. What can they do?",
      options: ["Pay a fine", "Use TPR's form to tell it they are not an employer", "Ignore it", "Enrol themselves"],
      answer: 1,
      explain: "TPR provides an online form for organisations that aren't employers.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "How long should most automatic enrolment records be kept?",
      options: ["1 year", "3 years", "6 years", "10 years"],
      answer: 2,
      explain: "Six years, with four years for some records such as opt-in and opt-out notices.",
    },
    {
      kind: "mcq",
      id: "q-responsible",
      prompt: "A payroll bureau runs the client's pensions. Who remains legally responsible?",
      options: ["The bureau", "The employer", "TPR", "The pension scheme"],
      answer: 1,
      explain: "The employer, even where a third party carries out the work.",
    },
  ],
  sources: [
    { label: "Directors and automatic enrolment – do you have duties? (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/employers/what-if-i-dont-have-any-staff/directors-and-automatic-enrolment-do-you-have-duties" },
    { label: "Director exemptions from automatic enrolment (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/director-exemptions-from-automatic-enrolment" },
    { label: "Employer duties and defining the workforce (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/document-library/automatic-enrolment-detailed-guidance/1-employer-duties-and-defining-the-workforce" },
    { label: "Workplace pensions – GOV.UK", url: "https://www.gov.uk/workplace-pensions" },
    { label: "Pensions Act 2008 Part 1", url: "https://www.legislation.gov.uk/ukpga/2008/30/part/1" },
  ],
};
