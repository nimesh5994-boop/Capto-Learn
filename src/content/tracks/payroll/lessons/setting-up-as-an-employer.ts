import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "setting-up-as-an-employer",
  title: "Setting up as an employer: PAYE registration and the true cost of a hire",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "What a client has to do before the first payday — registering a PAYE scheme, the references HMRC issues, choosing payroll software — and how to show them what an employee really costs once employer NIC and pension are added.",
  objectives: [
    "Explain when a business must register as an employer and how early it can do so",
    "Identify the employer PAYE reference and Accounts Office reference and what each is used for",
    "List the set-up steps that must be done before the first payday",
    "Calculate the annual cost of an employee including employer NIC and minimum pension contributions",
  ],
  body: [
    {
      kind: "md",
      md: `Most clients come to payroll in one of two ways: a sole trader or new company taking on its **first member of staff**, or a newly incorporated company whose director wants to pay themselves a **salary**. Either way, the first job is the same: register a PAYE scheme with HMRC **before the first payday**.

PAYE (Pay As You Earn) is the system employers use to collect income tax, National Insurance contributions (NICs), student loan repayments and some other deductions from employees' pay, and to pay them over to HMRC. Since 2013 it has operated through **Real Time Information (RTI)**: every time staff are paid, the employer's payroll software tells HMRC what was paid and deducted.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When to register",
      md: `A business must register as an employer when it starts employing staff (or starts using subcontractors in the Construction Industry Scheme). It must register **even if the only employee is the director** of a limited company.

- Register **before the first payday**, so you have the employer PAYE reference in time for the first Full Payment Submission.
- You **cannot register more than 2 months before** you start paying people.
- HMRC posts the reference out, so allow time — the letter can take several working days.`,
    },
    {
      kind: "table",
      caption: "The references HMRC issues on registration — don't mix them up",
      head: ["Reference", "Looks like", "Used for"],
      rows: [
        ["Employer PAYE reference (ERN)", "A 3-digit tax office number, a slash, then letters/numbers, e.g. 123/AB45678", "Identifies the PAYE scheme. Goes on every FPS/EPS, on P45s, P60s and P11Ds, and is needed by pension providers and for Employment Allowance."],
        ["Accounts Office reference", "13 characters, e.g. 123PA00045678", "Used as the payment reference when paying HMRC (with the year and month added for a specific period)."],
        ["Government Gateway / HMRC online services", "User ID and password", "Lets the employer (or agent) see the PAYE account, liabilities, penalties and notices."],
      ],
    },
    {
      kind: "md",
      md: `### Set-up checklist before the first payday

1. **Register the PAYE scheme** (most limited companies with 1–9 directors can do this online).
2. **Choose payroll software** that is HMRC-recognised. HMRC's free Basic PAYE Tools are designed for employers with 9 or fewer employees, but most practices use commercial software so they can run many clients in one place.
3. **Get employer's liability insurance** — compulsory for most employers with staff (a company where the only employee is a director who owns 50% or more of the shares is usually exempt).
4. **Check the right to work** of each new employee before they start.
5. **Collect starter information** — P45 or starter checklist, NI number, date of birth, address, student loan details (covered in the next lesson).
6. **Workplace pension** — the duty to assess staff for automatic enrolment starts on the first day an employee works for you. See the *Pensions & auto-enrolment* track.
7. **Agent authorisation** — if your practice will run the payroll, get authorised as agent for the PAYE scheme so you can see notices and penalties.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Paying before the reference arrives",
      md: `If staff have to be paid before the PAYE reference comes through, run the payroll as normal, **store the FPS**, and send it as soon as the reference arrives, using late-reporting reason **G**. Don't skip the deductions — the employee still has to have tax and NIC taken from their pay.`,
    },
    {
      kind: "md",
      md: `### What an employee really costs

Clients often think an employee costs their salary. In fact the employer pays on top:

- **Employer (secondary) Class 1 NIC** at **15%** on earnings above the **secondary threshold of £5,000 a year** (£417 a month) for 2026/27. Lower rates apply for under-21s, apprentices under 25 and veterans, covered later.
- **Employer pension contribution** — at least **3% of qualifying earnings** (earnings between £6,240 and £50,270 a year) for an auto-enrolled worker.
- Holiday cover, sick pay, training, equipment and employer's liability insurance.

The **Employment Allowance** (up to £10,500 a year for 2026/27) can wipe out employer NIC for many small employers — but not for a company whose only employee is a sole director. We'll cover eligibility in detail later in the track.`,
    },
    {
      kind: "table",
      caption: "Key 2026/27 annual thresholds you'll use throughout this track",
      head: ["Item", "Annual", "Monthly", "Weekly"],
      rows: [
        ["Personal allowance (code 1257L)", "£12,570", "£1,048", "£242"],
        ["NIC lower earnings limit (LEL)", "£6,708", "£559", "£129"],
        ["NIC primary threshold (PT) — employee NIC starts", "£12,570", "£1,048", "£242"],
        ["NIC secondary threshold (ST) — employer NIC starts", "£5,000", "£417", "£96"],
        ["NIC upper earnings limit (UEL)", "£50,270", "£4,189", "£967"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Tell the client the full cost up front",
      md: `When a client says "I'm thinking of taking someone on at £24,000", give them a one-line cost: salary + employer NIC + minimum pension. It stops the "why is my PAYE bill so high?" call three months later, and it's often the moment to talk about Employment Allowance.`,
    },
  ],
  scenario: {
    title: "Willow & Thyme Florists Ltd takes on its first employee",
    narrative: `Hannah Okafor is the sole director and shareholder of **Willow & Thyme Florists Ltd**, which has traded for a year without any staff. She emails on 3 October 2026:

*"I'm hiring a full-time shop assistant, Callum, starting Monday 2 November on £24,000 a year, paid monthly on the last working day. I'd also like to start paying myself a salary. What do I need to do, and what will Callum actually cost me?"*

Callum is 26. The company isn't connected to any other company, does no public-sector work, and has never claimed Employment Allowance.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Timing.** The first payday is Monday 30 November 2026. Registration can't be more than 2 months before the first payday, so registering now (early October) is fine — and sensible, as the letter takes time. Register the company as an employer online and ask for the PAYE reference to be sent to the registered office.

**2. Set-up.** Add the client to your payroll software, get agent authorisation, ask Hannah to confirm employer's liability insurance is in place now that she has a non-director employee, and send Callum a starter checklist in case he doesn't have a P45.

**3. Pension.** Callum is 26 and earns over £10,000 a year, so he'll be an eligible jobholder who must be automatically enrolled (unless the employer uses postponement). The company needs a qualifying scheme set up before November's payroll.

**4. Callum's annual cost.**`,
      },
      {
        kind: "table",
        caption: "Callum — full-year cost at £24,000",
        head: ["Element", "Working", "Annual cost"],
        rows: [
          ["Salary", "", "£24,000.00"],
          ["Employer NIC", "(£24,000 − £5,000) × 15%", "£2,850.00"],
          ["Employer pension (minimum)", "(£24,000 − £6,240) × 3%", "£532.80"],
          ["**Total before Employment Allowance**", "", "**£27,382.80**"],
        ],
      },
      {
        kind: "md",
        md: `**5. Employment Allowance.** Once Callum is on the payroll, the company is no longer a single-director company whose director is the only employee paying secondary NIC, so it can claim Employment Allowance. Callum's £2,850 of employer NIC (plus any on Hannah's salary) will be covered by the £10,500 allowance, bringing his real cost to about **£24,532.80**.

**6. Hannah's salary.** We'll come back to director salaries in the *Directors' NIC* lesson; for now, note that she should be on the same payroll and needs the director tick-box set so the annual earnings period applies.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "annual-cost-of-hire",
      prompt:
        "Ignore Employment Allowance for this question. A client plans to hire a 30-year-old administrator on £28,000 a year. Calculate the annual cost of salary + employer NIC + minimum employer pension (3% of qualifying earnings) for 2026/27.",
      answer: 32102.8,
      unit: "£",
      explain:
        "Employer NIC is 15% of earnings above the £5,000 secondary threshold. The minimum employer pension is 3% of qualifying earnings — the slice between £6,240 and £50,270.",
      working:
        "Employer NIC: (£28,000 − £5,000) × 15% = **£3,450.00**\n\nPension: (£28,000 − £6,240) × 3% = £21,760 × 3% = **£652.80**\n\nTotal: £28,000 + £3,450 + £652.80 = **£32,102.80**",
    },
    {
      kind: "classify",
      id: "which-reference",
      prompt: "Which HMRC reference would you use for each task?",
      categories: ["Employer PAYE reference", "Accounts Office reference"],
      items: [
        { text: "Paying the monthly PAYE bill by bank transfer", answer: 1, why: "The Accounts Office reference is the payment reference." },
        { text: "Completing the employer section of a P45", answer: 0 },
        { text: "Setting up the client with a pension provider", answer: 0, why: "Pension providers ask for the employer PAYE reference to identify the employer." },
        { text: "Sending the first Full Payment Submission", answer: 0 },
        { text: "Paying Class 1A NIC in July", answer: 1, why: "Still a payment, so the Accounts Office reference (with the Class 1A suffix)." },
      ],
      explain:
        "The employer PAYE reference identifies the scheme on returns and forms. The Accounts Office reference makes sure payments are allocated to the right PAYE account.",
    },
    {
      kind: "mcq",
      id: "director-only",
      prompt:
        "Tom has just incorporated Tom Reed Consulting Ltd. He'll be the only director and only employee, and wants to pay himself a monthly salary of £1,000. Does the company need to register as an employer?",
      options: [
        "No — a director isn't an employee",
        "No — the salary is below the personal allowance",
        "Yes — a company paying its director must register, even if the director is the only employee",
        "Only if the salary exceeds the lower earnings limit",
      ],
      answer: 2,
      explain:
        "HMRC's guidance is explicit: you must register even if you're only employing yourself, for example as the only director of a limited company. The level of pay affects the deductions, not the duty to register.",
    },
    {
      kind: "mcq",
      id: "too-early",
      prompt: "A client's first payday will be 31 March 2027. What's the earliest point HMRC will let them register as an employer?",
      options: ["Any time — there's no limit", "About 2 months before the first payday (late January 2027)", "6 months before the first payday", "Only after the first payday"],
      answer: 1,
      explain: "You cannot register more than 2 months before you start paying people, and you must register before the first payday.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-secondary-threshold",
      prompt: "For 2026/27, above what annual level of earnings does employer Class 1 NIC start (category A)?",
      options: ["£5,000", "£6,708", "£9,100", "£12,570"],
      answer: 0,
      explain: "The secondary threshold is £5,000 a year (£417 a month, £96 a week) for 2026/27. £12,570 is the primary threshold for employee NIC.",
    },
    {
      kind: "mcq",
      id: "q-employer-rate",
      prompt: "What is the main rate of employer Class 1 NIC for 2026/27?",
      options: ["13.8%", "15%", "8%", "2%"],
      answer: 1,
      explain: "Employer NIC is 15% above the secondary threshold. 8% and 2% are the employee main and upper rates.",
    },
    {
      kind: "mcq",
      id: "q-paid-early",
      prompt: "A new employer must pay staff before its PAYE reference letter arrives. What should it do?",
      options: [
        "Pay staff gross and sort it out later",
        "Delay paying staff until the reference arrives",
        "Run payroll and make deductions, store the FPS, and send it late with late-reporting reason G once the reference arrives",
        "Use another company's PAYE reference",
      ],
      answer: 2,
      explain: "HMRC's guidance is to run payroll normally, keep the FPS and submit it late using reason G. Deductions must still be made.",
    },
    {
      kind: "mcq",
      id: "q-bpt",
      prompt: "HMRC's free Basic PAYE Tools are designed for employers with how many employees?",
      options: ["9 or fewer", "49 or fewer", "250 or fewer", "Any number"],
      answer: 0,
      explain: "Basic PAYE Tools is designed for employers with 9 or fewer employees. Larger employers need commercial software.",
    },
    {
      kind: "mcq",
      id: "q-pension-duty",
      prompt: "When does a new employer's automatic enrolment duty start?",
      options: [
        "After 3 months of trading",
        "On the day its first member of staff starts work",
        "When it has 5 or more employees",
        "At the start of the next tax year",
      ],
      answer: 1,
      explain: "A new employer's duties start on the day the first member of staff starts work. Postponement of up to 3 months is possible but must be notified.",
    },
  ],
  sources: [
    { label: "Register as an employer (GOV.UK)", url: "https://www.gov.uk/register-employer" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Running payroll (GOV.UK)", url: "https://www.gov.uk/running-payroll" },
    { label: "Sending an FPS after payday (late reporting reasons)", url: "https://www.gov.uk/running-payroll/fps-after-payday" },
    { label: "CWG2: Employer further guide to PAYE and NICs 2026 to 2027", url: "https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions" },
  ],
};
