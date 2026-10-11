import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "family-statutory-payments-and-recovery",
  title: "SMP, SPP, ShPP, SAP, neonatal and bereavement pay — and recovering them",
  level: "practitioner",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "The family statutory payments an employer runs through payroll: who qualifies, how much and for how long, and how the employer gets 92% or 109% back from HMRC through the EPS.",
  objectives: [
    "Apply the continuous employment and earnings tests for SMP, SPP, SAP, ShPP, SPBP and SNCP",
    "Calculate SMP for the full 39 weeks using average weekly earnings",
    "Decide whether an employer recovers 92% or 109% and calculate the amount reclaimed",
    "Report recovery on the EPS and know when to ask HMRC for advance funding",
  ],
  body: [
    {
      kind: "md",
      md: `Unlike SSP, the family statutory payments are **largely funded by the government**. The employer pays the employee through payroll, then deducts most or all of it (plus, for small employers, a little extra) from what it pays HMRC. Getting the recovery right is real cash for the client, so it's worth checking every month a statutory payment runs.`,
    },
    {
      kind: "table",
      caption: "The family statutory payments for 2026/27",
      head: ["Payment", "Length", "Rate"],
      rows: [
        ["Statutory Maternity Pay (SMP)", "Up to 39 weeks", "First 6 weeks: 90% of AWE. Remaining 33 weeks: £194.32 or 90% of AWE if lower"],
        ["Statutory Adoption Pay (SAP)", "Up to 39 weeks", "As SMP"],
        ["Statutory Paternity Pay (SPP)", "1 or 2 weeks, within 52 weeks of birth or placement", "£194.32 or 90% of AWE if lower"],
        ["Statutory Shared Parental Pay (ShPP)", "Up to 37 weeks shared between parents (the 39 weeks less any SMP/SAP already taken)", "£194.32 or 90% of AWE if lower"],
        ["Statutory Parental Bereavement Pay (SPBP)", "Up to 2 weeks", "£194.32 or 90% of AWE if lower"],
        ["Statutory Neonatal Care Pay (SNCP)", "Up to 12 weeks (introduced 6 April 2025)", "£194.32 or 90% of AWE if lower"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The two qualifying tests (SMP, SPP, SAP, ShPP, SPBP, SNCP)",
      md: `1. **Continuous employment**: at least **26 weeks** with the employer, up to any day in the **qualifying week**. For SMP and SPP the qualifying week is the **15th week before the expected week of childbirth** (EWC). Adoption uses the week the adopter is matched with the child.
2. **Earnings**: average weekly earnings in the **relevant period** (normally the 8 weeks up to the last payday before the end of the qualifying week) of at least the **lower earnings limit**, **£129** a week for 2026/27.

Plus notice and evidence: for SMP, a **MATB1** or similar medical evidence (normally issued from 20 weeks before the due date) and 28 days' notice of the start date. If an employee doesn't qualify, give them form **SMP1** (or the equivalent) so they can claim Maternity Allowance.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Leave rights are not pay rights",
      md: `Statutory **leave** is now a day-one right for many of these (for example paternity leave and neonatal care leave), but the **pay** still has the 26-week and earnings tests. An employee who joined 3 months ago can take paternity leave but won't get SPP.`,
    },
    {
      kind: "md",
      md: `### AWE matters most for SMP

The first 6 weeks of SMP are **90% of AWE with no cap**, so a pay rise or bonus in the relevant period increases SMP. If a pay rise is backdated into the relevant period (or would have been, had the employee not been on leave), the AWE must be recalculated and SMP topped up.

SMP can start at the earliest **11 weeks before the EWC**. It starts automatically the day after birth if the baby comes early, or from the 4th week before the EWC if the employee is off with a pregnancy-related illness then.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Recovery: 92% or 109%",
      md: `Look at the employer's **total Class 1 NIC (employee + employer, before Employment Allowance) for the previous tax year**:

- **£45,000 or less** ("small employer"): recover **109%**: 100% of the payment plus 9% compensation for the employer NIC on it.
- **More than £45,000**: recover **92%**.

Recovery applies to SMP, SPP, SAP, ShPP, SPBP and SNCP, but **not SSP**. Claim it on the **EPS** for the tax month in which the payment was made; it's deducted from the PAYE, NIC and student loan amounts due. If the amount to recover is more than the PAYE due for the month, the employer can ask HMRC for **advance funding**.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Enhanced maternity schemes",
      md: `If a client pays more than SMP under a contractual scheme, run the **SMP element** separately in the payroll so it can be recovered, and the enhancement as normal pay. Recovery is only on the statutory amount.`,
    },
  ],
  scenario: {
    title: "Maternity leave at Marlow Accountancy Services Ltd",
    narrative: `**Marlow Accountancy Services Ltd** has 9 employees. Its total Class 1 NIC for 2025/26 was **£38,600**. Zara, a payroll bureau supervisor who has worked there for 3 years, tells her manager she's pregnant. Her **expected week of childbirth** begins **Sunday 7 March 2027** and she wants SMP to start on **Sunday 14 February 2027**.

Zara is paid £2,600 a month. In the 8-week relevant period she was paid two monthly salaries of £2,600, giving AWE of **£600** (£5,200 × 12 ÷ 52 ÷ 2).

The client asks: *"What will we pay her, and what do we get back?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Does she qualify?** She has well over 26 weeks' service at the qualifying week (the 15th week before the EWC, which begins in late November 2026), and her AWE of £600 is above the £129 LEL. She's given notice and will provide a MATB1. **Yes.**

**2. SMP.**
- Weeks 1–6: 90% × £600 = £540 a week × 6 = **£3,240.00**
- Weeks 7–39: 90% × £600 = £540, which is more than £194.32, so **£194.32** a week × 33 = **£6,412.56**
- **Total SMP: £9,652.56** over 39 weeks

**3. Recovery rate.** Total Class 1 NIC for the previous tax year (£38,600) is not more than £45,000, so the company is a small employer: **109%**.

**4. Recovered.** £9,652.56 × 109% = **£10,521.29** over the period, claimed month by month on the EPS. The extra 9% isn't a profit: it compensates the company for the employer NIC it pays on the SMP.`,
      },
      {
        kind: "table",
        caption: "Zara's SMP and recovery",
        head: ["Period", "Weekly SMP", "Weeks", "SMP", "Recovered at 109%"],
        rows: [
          ["Weeks 1–6", "£540.00", "6", "£3,240.00", "£3,531.60"],
          ["Weeks 7–39", "£194.32", "33", "£6,412.56", "£6,989.69"],
          ["**Total**", "", "39", "**£9,652.56**", "**£10,521.29**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "smp-low-earner",
      prompt:
        "An employee qualifies for SMP with AWE of £200. What is her **total** SMP for the full 39 weeks in 2026/27?",
      answer: 7020,
      unit: "£",
      explain:
        "90% of AWE is £180. In the first 6 weeks it's 90% of AWE. For the remaining 33 weeks it's the lower of £194.32 and 90% of AWE, which is again £180.",
      working: "£180 × 6 = £1,080\n\n£180 × 33 = £5,940\n\nTotal **£7,020**",
    },
    {
      kind: "numeric",
      id: "smp-high-earner",
      prompt: "An employee qualifies for SMP with AWE of £900. What is her total SMP for the full 39 weeks?",
      answer: 11272.56,
      tolerance: 0.01,
      unit: "£",
      explain: "First 6 weeks at 90% of AWE (uncapped), then 33 weeks at £194.32 (lower than 90% of AWE).",
      working: "90% × £900 = £810 × 6 = £4,860.00\n\n£194.32 × 33 = £6,412.56\n\nTotal **£11,272.56**",
    },
    {
      kind: "numeric",
      id: "recovery-92",
      prompt:
        "A manufacturer's total Class 1 NIC for 2025/26 was £182,000. In tax month 4 of 2026/27 it pays £1,554.56 of SPP. How much can it recover on the EPS?",
      answer: 1430.2,
      tolerance: 0.01,
      unit: "£",
      explain: "Total Class 1 NIC above £45,000 means 92% recovery, with no compensation.",
      working: "£1,554.56 × 92% = **£1,430.20**",
    },
    {
      kind: "classify",
      id: "recoverable",
      prompt: "Can the employer recover each payment from HMRC?",
      categories: ["Recoverable (92% or 109%)", "Not recoverable"],
      items: [
        { text: "Statutory Sick Pay", answer: 1 },
        { text: "Statutory Neonatal Care Pay", answer: 0 },
        { text: "Contractual enhancement on top of SMP", answer: 1, why: "Only the statutory element is recoverable." },
        { text: "Statutory Parental Bereavement Pay", answer: 0 },
        { text: "Statutory Shared Parental Pay", answer: 0 },
        { text: "Full pay during paternity leave paid by choice, above SPP", answer: 1, why: "Only the SPP element is recoverable." },
      ],
      explain: "All the family statutory payments are recoverable; SSP and any enhancements aren't.",
    },
    {
      kind: "mcq",
      id: "qualifying-week",
      prompt: "For SMP, the 26 weeks' continuous employment is measured up to:",
      options: [
        "The date the baby is born",
        "Any day in the 15th week before the expected week of childbirth",
        "The start of maternity leave",
        "The 11th week before the expected week of childbirth",
      ],
      answer: 1,
      explain: "The qualifying week is the 15th week before the EWC.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-smp-standard-rate",
      prompt: "What is the standard weekly rate of SMP (weeks 7–39) and SPP for 2026/27?",
      options: ["£184.03", "£187.18", "£194.32", "£123.25"],
      answer: 2,
      explain: "£194.32 or 90% of AWE if lower.",
    },
    {
      kind: "mcq",
      id: "q-small-employer",
      prompt: "Which employers recover 109% of statutory payments?",
      options: [
        "Those with fewer than 50 employees",
        "Those whose total Class 1 NIC for the previous tax year was £45,000 or less",
        "Those who claim Employment Allowance",
        "All employers",
      ],
      answer: 1,
      explain: "The test is total Class 1 NIC (employee and employer) for the previous tax year.",
    },
    {
      kind: "mcq",
      id: "q-lel-test",
      prompt: "An employee with 2 years' service has AWE of £110 in the relevant period. Do they qualify for SMP in 2026/27?",
      options: ["Yes", "No, AWE is below the £129 LEL", "Yes, but at 80% of AWE", "Only if the employer agrees"],
      answer: 1,
      explain: "SMP still has an LEL test (unlike SSP from April 2026). She may be able to claim Maternity Allowance instead, so give her form SMP1.",
    },
    {
      kind: "mcq",
      id: "q-sncp-length",
      prompt: "How long can Statutory Neonatal Care Pay be paid for?",
      options: ["2 weeks", "Up to 12 weeks", "Up to 39 weeks", "Up to 52 weeks"],
      answer: 1,
      explain: "SNCP, introduced from 6 April 2025, is payable for up to 12 weeks.",
    },
    {
      kind: "mcq",
      id: "q-where-claim",
      prompt: "Where does an employer claim back SMP?",
      options: ["On the FPS", "On the EPS", "On the P11D(b)", "By writing to HMRC at the year end"],
      answer: 1,
      explain: "Recovery is claimed on the EPS for the tax month in which the payment was made.",
    },
    {
      kind: "mcq",
      id: "q-smp-first-weeks",
      prompt: "An employee's AWE is £1,000. What is her SMP for each of the first 6 weeks?",
      options: ["£194.32", "£900", "£1,000", "£540"],
      answer: 1,
      explain: "The first 6 weeks are 90% of AWE with no cap: £900.",
    },
  ],
  sources: [
    { label: "Rates and thresholds for employers 2026 to 2027 (statutory pay and recovery)", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Statutory Maternity Pay: employer guide (GOV.UK)", url: "https://www.gov.uk/employers-maternity-pay-leave" },
    { label: "Statutory Paternity Pay: eligibility (GOV.UK)", url: "https://www.gov.uk/employers-paternity-pay-leave/eligibility" },
    { label: "Statutory Neonatal Care Pay and Leave: employer guide (GOV.UK)", url: "https://www.gov.uk/employers-neonatal-care-pay-leave" },
    { label: "Recover statutory payments (GOV.UK)", url: "https://www.gov.uk/recover-statutory-payments" },
  ],
};
