import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "assessing-workers-and-postponement",
  title: "Assessing workers: categories, thresholds and postponement",
  level: "foundation",
  minutes: 35,
  summary:
    "How to put each worker in the right automatic enrolment category using age and earnings, the 2026/27 earnings trigger (£10,000) and qualifying earnings band (£6,240–£50,270), pay reference periods, and how and when to postpone enrolment.",
  objectives: [
    "Place a worker in the correct category (eligible jobholder, non-eligible jobholder or entitled worker)",
    "Apply the 2026/27 earnings trigger and qualifying earnings band to annual, monthly and weekly pay",
    "Calculate qualifying earnings for a pay period",
    "Explain postponement, including the notice requirement and its limits",
    "Explain how irregular pay is assessed",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Everyone who works for the employer must be assessed, **every pay reference period**, because age, earnings and workers' wishes change. The assessment decides whether the employer must enrol the worker automatically, only has to let them opt in, or has no duty to contribute at all. Getting this wrong is the single most common AE error in practice.`,
    },
    {
      kind: "table",
      caption: "Key 2026/27 AE thresholds (unchanged from 2025/26)",
      head: ["Measure", "Annual", "Monthly", "Weekly"],
      rows: [
        ["Earnings trigger (auto-enrolment)", "£10,000", "£833", "£192"],
        ["Lower limit of qualifying earnings band", "£6,240", "£520", "£120"],
        ["Upper limit of qualifying earnings band", "£50,270", "£4,189", "£967"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The three categories",
      md: `| Category | Age | Earnings in the pay period | Employer duty |
|---|---|---|---|
| **Eligible jobholder** | 22 to State Pension age | Above the earnings trigger (£10,000 a year) | **Automatically enrol** and contribute |
| **Non-eligible jobholder** | 16–21, or State Pension age to 74 | Above the trigger; **or** 16–74 earning between £6,240 and £10,000 | Must enrol and contribute if the worker **opts in** |
| **Entitled worker** | 16–74 | At or below £6,240 | Must **let them join** a scheme but **need not contribute** |

A worker must also **work in the UK** and not already be an active member of a qualifying scheme with the employer. Under-16s and over-74s are outside the duties.`,
    },
    {
      kind: "md",
      md: `### Pay reference periods and irregular pay

The assessment looks at earnings **in the pay reference period** (the period for which the worker is paid, e.g. a month), using the matching **pro-rated thresholds** from the table. Earnings for this purpose include salary, wages, commission, bonuses, overtime, statutory sick, maternity, paternity and adoption pay, and similar amounts, **before tax**, but not benefits in kind or most expense reimbursements.

Where pay varies, a worker may be below the monthly trigger in March and above it in April. If so, they become an eligible jobholder from the **pay day on which they first exceed** the trigger; you must then enrol them. The enrolment date is the date that duty arises. The employer then has **six weeks** from that date to complete the process (joining the worker to the scheme and giving the written information), but the worker is treated as an active member from the enrolment date.

### Qualifying earnings

Contributions in most schemes are calculated on **qualifying earnings**: earnings between the lower and upper limits of the band. For monthly pay of £2,400, qualifying earnings are £2,400 − £520 = **£1,880**. Some schemes use **pensionable pay** or total earnings instead, as long as the scheme meets the AE quality tests (TPR certification).`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Postponement",
      md: `An employer may **postpone** assessment for up to **three months** from the duties start date (or from the date a new worker starts, or when a worker first meets the criteria). During postponement:

- The employer must give the worker a **written postponement notice within six weeks** of the postponement start date.
- The worker can still **opt in** and the employer must then enrol them.
- At the **end** of the postponement the worker must be **reassessed** and, if an eligible jobholder, enrolled.
- Postponement is not available for a worker who has already been enrolled; once postponement has ended, assess again and enrol if the worker is an eligible jobholder.

Postponement is helpful for **short-term and seasonal** staff, and for new starters generally: if the worker leaves within three months, no pension contributions ever arise. Don't use it to avoid enrolling someone who is already past the postponement period.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't forget",
      md: `- **Directors with contracts** are assessed like any worker once the director exemptions no longer apply, but the company can choose not to automatically enrol a director (who can still opt in or join).
- A worker with **two jobs** is assessed separately by each employer on earnings from that employer only.
- Workers **over State Pension age** and aged under 75 are **non-eligible jobholders**: no automatic enrolment, but you must enrol them if they ask and then contribute.
- **Under-22s** (including younger apprentices) earning above the trigger can opt in, but they aren't automatically enrolled until 22. Apprentices aged 22 or over are assessed like any other worker.`,
    },
  ],
  scenario: {
    title: "A monthly assessment at Kestrel Catering Ltd",
    narrative: `Kestrel Catering Ltd pays four staff monthly. In October 2026 their details are:

| Worker | Age | October gross pay |
|---|---:|---:|
| Priya | 34 | £1,950 |
| Joe | 19 | £1,100 |
| Maria | 41 | £700 |
| Walt | 68 (State Pension age 66) | £2,400 |`,
    walkthrough: [
      {
        kind: "table",
        caption: "Assessment (monthly trigger £833; band £520 to £4,189)",
        head: ["Worker", "Category", "Reason", "Qualifying earnings", "Duty"],
        rows: [
          ["Priya", "Eligible jobholder", "Age 22 to SPA and £1,950 > £833", "£1,950 − £520 = £1,430", "Auto-enrol; 3% employer £42.90, 5% employee £71.50"],
          ["Joe", "Non-eligible jobholder", "Under 22, earns above trigger", "£1,100 − £520 = £580", "Enrol and contribute only if he opts in"],
          ["Maria", "Non-eligible jobholder", "Age 22+, earns £700: between £520 and £833", "n/a unless opts in (£180)", "Enrol and contribute if she opts in"],
          ["Walt", "Non-eligible jobholder", "Above SPA, earns above trigger", "£2,400 − £520 = £1,880", "Enrol and contribute if he opts in"],
        ],
      },
      {
        kind: "md",
        md: `**Priya's contributions.** Minimum total 8% of qualifying earnings £1,430 = **£114.40**: employer 3% = **£42.90**, employee 5% = **£71.50** (the £71.50 includes basic-rate tax relief; see the later lesson on net pay and relief at source).

**What to write down.** Keep the assessment output on the file. Re-run it every pay period. Maria's pay is above the lower limit but below the trigger, so a one-off bonus next month could make her an eligible jobholder.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-categories",
      prompt: "Classify each worker for 2026/27 (assume a UK worker with annual earnings as stated).",
      categories: ["Eligible jobholder", "Non-eligible jobholder", "Entitled worker"],
      items: [
        { text: "Age 30, earns £24,000 a year", answer: 0 },
        { text: "Age 20, earns £18,000 a year", answer: 1, why: "Under 22." },
        { text: "Age 35, earns £5,000 a year", answer: 2, why: "At or below £6,240." },
        { text: "Age 45, earns £8,000 a year", answer: 1, why: "Between £6,240 and £10,000." },
        { text: "Age 68 (SPA 67), earns £20,000 a year", answer: 1, why: "Above State Pension age." },
      ],
      explain: "Age sets the first split; earnings against £10,000 and £6,240 sets the second.",
    },
    {
      kind: "numeric",
      id: "qualifying-earnings",
      prompt: "An employee is paid £3,100 a month. What are the monthly qualifying earnings (£)? Use the monthly lower limit of £520.",
      answer: 2580,
      unit: "£",
      explain: "Qualifying earnings are the earnings between the lower and upper limits of the band for the period.",
      working: "£3,100 − £520 = **£2,580** (below the monthly upper limit of £4,189).",
    },
    {
      kind: "numeric",
      id: "capped-qe",
      prompt: "An employee is paid £6,000 in a month. What are the monthly qualifying earnings (£)? Monthly band £520 to £4,189.",
      answer: 3669,
      unit: "£",
      explain: "Earnings above the upper limit are not counted.",
      working: "£4,189 − £520 = **£3,669**.",
    },
    {
      kind: "mcq",
      id: "mcq-postponement",
      prompt: "What is the maximum period of postponement?",
      options: ["1 month", "3 months", "6 months", "12 months"],
      answer: 1,
      explain: "Up to three months, with a written notice within six weeks.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-trigger",
      prompt: "What is the annual earnings trigger for automatic enrolment in 2026/27?",
      options: ["£6,240", "£10,000", "£12,570", "£50,270"],
      answer: 1,
      explain: "£10,000, unchanged from 2025/26.",
    },
    {
      kind: "mcq",
      id: "q-lower",
      prompt: "What is the lower limit of the qualifying earnings band in 2026/27?",
      options: ["£5,000", "£6,240", "£10,000", "£12,570"],
      answer: 1,
      explain: "£6,240 a year (£520 a month).",
    },
    {
      kind: "mcq",
      id: "q-age",
      prompt: "From what age is a worker an eligible jobholder?",
      options: ["16", "18", "21", "22"],
      answer: 3,
      explain: "22 up to State Pension age.",
    },
    {
      kind: "mcq",
      id: "q-entitled",
      prompt: "A worker earning £5,000 a year asks to join the scheme. Must the employer contribute?",
      options: ["Yes, 3%", "Yes, 8%", "No: they are an entitled worker and must be allowed to join but the employer need not contribute", "No: they cannot join"],
      answer: 2,
      explain: "Entitled workers can join; employer contributions are not required.",
    },
    {
      kind: "mcq",
      id: "q-notice",
      prompt: "Postponement notice must be given within…",
      options: ["1 week", "6 weeks", "3 months", "6 months"],
      answer: 1,
      explain: "Six weeks of the postponement start date.",
    },
  ],
  sources: [
    { label: "Review of the AE earnings trigger and qualifying earnings band for 2026/27", url: "https://www.gov.uk/government/publications/review-of-the-automatic-enrolment-earnings-trigger-and-qualifying-earnings-band-for-202627/review-of-the-automatic-enrolment-earnings-trigger-and-qualifying-earnings-band-for-202627" },
    { label: "Earnings thresholds (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/ongoing-duties-for-employers/earnings-thresholds" },
    { label: "Director exemptions from automatic enrolment (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/director-exemptions-from-automatic-enrolment" },
    { label: "Assessing the workforce (TPR detailed guidance)", url: "https://www.thepensionsregulator.gov.uk/en/document-library/automatic-enrolment-detailed-guidance/3-assessing-the-workforce" },
    { label: "Workplace pensions – GOV.UK", url: "https://www.gov.uk/workplace-pensions" },
  ],
};
