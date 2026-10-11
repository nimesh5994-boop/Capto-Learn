import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "statutory-sick-pay",
  title: "Statutory Sick Pay after the April 2026 reforms",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "SSP from 6 April 2026: payable from the first day of sickness, no lower earnings limit, and paid at the lower of £123.25 a week or 80% of average weekly earnings. Qualifying days, linked periods, the 28-week limit, evidence and record keeping.",
  objectives: [
    "Explain the SSP changes made by the Employment Rights Act 2025 that apply from 6 April 2026",
    "Work out the weekly and daily SSP rate using the 80% of AWE comparison",
    "Calculate SSP for a sickness absence using qualifying days",
    "Apply the linking rule, the 28-week maximum and the SSP1 requirement",
  ],
  body: [
    {
      kind: "md",
      md: `Statutory Sick Pay (SSP) is the minimum an employer must pay an employee who is too ill to work. It's paid through the payroll and is taxable and subject to NIC like normal pay. Employers **can't recover SSP** from HMRC.

The **Employment Rights Act 2025** changed SSP from **6 April 2026**. If you learned SSP before then, unlearn two things: there are **no waiting days**, and there's **no lower earnings limit** test.`,
    },
    {
      kind: "table",
      caption: "SSP before and after 6 April 2026",
      head: ["Rule", "Before 6 April 2026", "From 6 April 2026"],
      rows: [
        ["When SSP starts", "After 3 unpaid waiting days", "From the first qualifying day of sickness"],
        ["Earnings test", "Average weekly earnings had to be at least the LEL", "No earnings threshold"],
        ["Weekly rate", "Flat rate (£118.75 in 2025/26)", "Lower of £123.25 or 80% of average weekly earnings"],
        ["Maximum", "28 weeks", "28 weeks"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who qualifies",
      md: `To get SSP an employee must:
- have an employment contract and have done some work for the employer;
- be sick for **at least one full working day** (a "period of incapacity for work"). A day doesn't count if they worked any part of it before going home sick;
- tell the employer within the deadline the employer sets (or 7 days if none) and provide evidence when asked;
- not have already had the maximum 28 weeks of SSP in the linked period.

If an employee doesn't qualify, or their SSP will end while they're still sick, the employer gives them **form SSP1**: within **7 days** of the first day off sick if they don't qualify, or by the beginning of the **23rd week** if SSP is going to run out.`,
    },
    {
      kind: "md",
      md: `### Working out the amount

1. **Average weekly earnings (AWE)**: gross earnings paid in the **relevant period**, normally the 8 weeks ending with the last normal payday before the sickness started, converted to a weekly figure.
2. **Weekly SSP rate** = the **lower** of **£123.25** and **80% of AWE**.
3. **Daily rate** = weekly rate ÷ the number of **qualifying days** in the week. Qualifying days are normally the days the employee is contracted to work.
4. **SSP due** = daily rate × qualifying days of sickness.

For anyone with AWE of £154.07 or more, 80% of AWE is at least £123.25, so they get the flat £123.25. The 80% cap only bites for **low earners**, typically part-timers.`,
    },
    {
      kind: "table",
      caption: "Daily rates at the standard £123.25 weekly rate (from HMRC's 2026/27 table)",
      head: ["Qualifying days per week", "Daily rate (unrounded)", "SSP for 3 days"],
      rows: [
        ["5", "£24.65", "£73.95"],
        ["4", "£30.8125", "£92.44"],
        ["3", "£41.0833", "£123.25"],
        ["2", "£61.625", "—"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Linking and the 28-week maximum",
      md: `Two periods of sickness **link** if they're **8 weeks or less apart**. Linked periods are treated as one, so the 28 weeks count across them. After 28 weeks of SSP in a linked period, SSP stops; the employee may be able to claim Universal Credit or ESA, which is why the SSP1 matters.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Payroll set-ups that need fixing",
      md: `- Software or company sick pay policies still building in **3 waiting days** are now **underpaying** SSP.
- Low-paid staff previously excluded by the **LEL** test now qualify, at 80% of their AWE.
- A contractual (company) sick pay scheme can pay more than SSP but never less. Check the scheme is at least as generous **for each day**, now that SSP starts on day one.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Evidence",
      md: `Employees self-certify for the first **7 days** (including non-working days). After that the employer can ask for a **fit note** from a GP, nurse, pharmacist or other healthcare professional. Keep records of SSP paid and the evidence for 3 years after the tax year.`,
    },
  ],
  scenario: {
    title: "Two sickness absences at Northgate Print Ltd",
    narrative: `**Northgate Print Ltd** in Chester has no company sick pay scheme: staff get SSP only. In November 2026:

- **Darren**, full-time, works **Monday to Friday**, AWE **£560**. He's off sick **Monday 9 to Wednesday 11 November** and back on Thursday.
- **Megan**, part-time, works **Tuesday and Thursday** only, AWE **£140**. She's off sick from **Tuesday 10 November to Friday 20 November** inclusive.

The office manager asks: *"We've always had 3 waiting days. What do we pay now?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Darren.** 80% × £560 = £448, which is more than £123.25, so his weekly rate is **£123.25**. He has 5 qualifying days a week, so the daily rate is **£24.65**. SSP starts on day one: 3 qualifying days × £24.65 = **£73.95**.

Under the old rules he'd have had three waiting days and **no SSP at all**: this is the change the client needs to understand.

**Megan.** 80% × £140 = **£112**, which is lower than £123.25, so her weekly rate is **£112**. She has 2 qualifying days a week, so her daily rate is **£56**. Her qualifying days of sickness are Tue 10, Thu 12, Tue 17 and Thu 19 November: **4 days × £56 = £224**.

Under the old rules her AWE (£140) was above the LEL, but she'd have lost her first 3 qualifying days as waiting days.`,
      },
      {
        kind: "table",
        caption: "November SSP",
        head: ["Employee", "Weekly rate", "Daily rate", "Qualifying days sick", "SSP"],
        rows: [
          ["Darren", "£123.25 (flat rate is lower)", "£24.65", "3", "£73.95"],
          ["Megan", "£112.00 (80% of £140)", "£56.00", "4", "£224.00"],
        ],
      },
      {
        kind: "md",
        md: `**Payroll.** SSP replaces normal pay for those days (no company scheme), is taxed and NIC'd as normal earnings, and appears on the FPS as pay. It can't be recovered on the EPS. If Megan is sick again within 8 weeks of 20 November, the periods link.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "ssp-full-time",
      prompt:
        "An employee works Monday to Friday and has AWE of £480. They're off sick Monday to Thursday in January 2027 (4 qualifying days). How much SSP is due?",
      answer: 98.6,
      tolerance: 0.01,
      unit: "£",
      explain: "80% of £480 is £384, more than £123.25, so the flat weekly rate applies. With 5 qualifying days the daily rate is £24.65. SSP is paid from day one.",
      working: "£123.25 ÷ 5 = £24.65 × 4 = **£98.60** (matching HMRC's table for 4 days in a 5-day week).",
    },
    {
      kind: "numeric",
      id: "ssp-low-earner-weekly",
      prompt: "A part-time cleaner has AWE of £95. What is their **weekly** SSP rate for 2026/27?",
      answer: 76,
      tolerance: 0.01,
      unit: "£",
      explain: "From April 2026 SSP is the lower of £123.25 and 80% of AWE. There's no LEL test, so the cleaner qualifies even though £95 is below the £129 LEL.",
      working: "80% × £95 = **£76.00**, which is lower than £123.25.",
    },
    {
      kind: "numeric",
      id: "ssp-three-day-week",
      prompt:
        "An employee works Monday, Wednesday and Friday, with AWE of £150. They're sick from Monday to Friday of one week. How much SSP is due for that week?",
      answer: 120,
      tolerance: 0.01,
      unit: "£",
      explain: "80% × £150 = £120, lower than £123.25. Three qualifying days a week gives a daily rate of £40; all three were sick days.",
      working: "Weekly rate £120 ÷ 3 = £40 × 3 qualifying days = **£120.00**",
    },
    {
      kind: "mcq",
      id: "linking",
      prompt:
        "An employee was off sick for 3 weeks ending 4 September 2026 and goes off sick again on 23 October 2026. Do the periods link?",
      options: [
        "No: they're more than 4 weeks apart",
        "Yes: they're 8 weeks or less apart",
        "Only if it's the same illness",
        "Linking was abolished in April 2026",
      ],
      answer: 1,
      explain: "4 September to 23 October is 7 weeks, within the 8-week linking rule, so the periods link for the 28-week maximum. The illness doesn't need to be the same.",
    },
    {
      kind: "classify",
      id: "ssp-true-false",
      prompt: "Is each statement true or false for SSP in 2026/27?",
      categories: ["True", "False"],
      items: [
        { text: "SSP is paid from the first qualifying day of sickness", answer: 0 },
        { text: "An employee earning £100 a week can't get SSP because they're below the LEL", answer: 1, why: "The LEL test was removed from 6 April 2026." },
        { text: "Small employers can recover SSP from HMRC on the EPS", answer: 1, why: "SSP isn't recoverable." },
        { text: "SSP is subject to tax and NIC", answer: 0 },
        { text: "An employee can self-certify for the first 7 days", answer: 0 },
      ],
      explain: "Day-one SSP and no earnings threshold are the two big changes. SSP remains taxable and non-recoverable.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ssp-rate",
      prompt: "What is the weekly SSP rate for 2026/27?",
      options: ["£118.75 flat", "£123.25, or 80% of AWE if lower", "80% of AWE with no cap", "£129"],
      answer: 1,
      explain: "The lower of £123.25 and 80% of the employee's average weekly earnings.",
    },
    {
      kind: "mcq",
      id: "q-waiting-days",
      prompt: "How many waiting days apply to SSP from 6 April 2026?",
      options: ["3", "1", "None", "7"],
      answer: 2,
      explain: "The Employment Rights Act 2025 removed waiting days: SSP is paid from the first day.",
    },
    {
      kind: "mcq",
      id: "q-max",
      prompt: "What is the maximum period of SSP in a linked period of sickness?",
      options: ["13 weeks", "26 weeks", "28 weeks", "39 weeks"],
      answer: 2,
      explain: "28 weeks.",
    },
    {
      kind: "mcq",
      id: "q-ssp1",
      prompt: "When must an employer give form SSP1 to an employee who doesn't qualify for SSP?",
      options: ["Within 7 days of their first day off sick", "At the end of the tax year", "Within 28 days", "Only if the employee asks"],
      answer: 0,
      explain: "SSP1 must be given within 7 days of the first day of sickness if the employee doesn't qualify.",
    },
    {
      kind: "mcq",
      id: "q-recover",
      prompt: "Can an employer recover SSP paid in 2026/27?",
      options: ["Yes, 92%", "Yes, 109% for small employers", "No", "Only for absences over 4 weeks"],
      answer: 2,
      explain: "SSP isn't recoverable. Recovery applies to SMP, SPP, SAP, ShPP, SPBP and SNCP.",
    },
  ],
  sources: [
    { label: "Statutory Sick Pay: employer guide (GOV.UK)", url: "https://www.gov.uk/employers-sick-pay" },
    { label: "SSP eligibility and form SSP1 (GOV.UK)", url: "https://www.gov.uk/employers-sick-pay/eligibility-and-form-ssp1" },
    { label: "SSP entitlement (GOV.UK)", url: "https://www.gov.uk/employers-sick-pay/entitlement" },
    { label: "Rates and thresholds for employers 2026 to 2027 (SSP daily rates)", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Employment Rights Act 2025 (legislation.gov.uk)", url: "https://www.legislation.gov.uk/ukpga/2025/36/contents" },
  ],
};
