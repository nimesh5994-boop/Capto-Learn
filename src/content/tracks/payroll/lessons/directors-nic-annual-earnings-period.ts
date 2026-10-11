import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "directors-nic-annual-earnings-period",
  title: "Directors' NIC: the annual earnings period",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Why company directors pay NIC on an annual basis, how the standard and alternative methods work, what happens when someone becomes or stops being a director mid-year, and how to calculate a director's NIC on a salary-and-bonus pattern.",
  objectives: [
    "Explain why directors have an annual earnings period and what it prevents",
    "Calculate a director's employee and employer NIC under the standard annual method",
    "Describe the alternative arrangements and the year-end recalculation",
    "Apply the pro-rata earnings period for a director appointed during the year",
  ],
  body: [
    {
      kind: "md",
      md: `Ordinary employees pay NIC **pay period by pay period** with no catch-up. That would let a director, who can usually decide when they're paid, take most of their pay as one big bonus in a single month. Above the upper earnings limit employee NIC drops to 2%, so a single large payment would save a lot of NIC compared with the same pay spread through the year.

To stop that, **company directors have an annual earnings period**: their NIC is worked out on their **total earnings for the tax year**, against **annual** thresholds, however the pay is timed.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The standard (annual) method",
      md: `- Earnings are added up **cumulatively** from 6 April (or from the date the person became a director).
- Each payday, compare earnings to date with the **annual** thresholds for 2026/27: **PT £12,570**, **UEL £50,270**, **ST £5,000**.
- Employee NIC is due once earnings to date exceed £12,570: 8% up to £50,270, then 2%. Employer NIC is due once earnings to date exceed £5,000, at 15%.
- NIC for the payday = NIC due on earnings to date − NIC already paid this year.

Result: no employee NIC at all until cumulative pay passes £12,570, then a lot at once.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The alternative arrangements",
      md: `If the director is paid regular amounts, the employer can choose to:
- work out NIC on each payday **as if they were an ordinary employee** (using the period thresholds), so the deductions are even through the year; and then
- **recalculate on the annual basis** at the **last payday of the tax year** (or when they stop being a director), paying any extra NIC due.

This gives the director smoother net pay. The annual liability is the same either way. If a large bonus is paid, it's common to switch to the standard method for the rest of the year.`,
    },
    {
      kind: "md",
      md: `### Becoming or stopping being a director in the year

- **Appointed during the year:** the earnings period is **pro rata**: the number of tax weeks from the week of appointment to the end of the year (including the week of appointment). The thresholds are scaled to match. Earnings before appointment are dealt with as an ordinary employee.
- **Ceasing to be a director:** the annual earnings period continues to the end of the tax year for earnings paid in that year for the period as a director. Any earnings for the period after they stop being a director (still employed) are dealt with on the normal pay-period basis.
- **Payments after leaving** that relate to the period as a director are added to the director's annual earnings period.

Payroll software handles all of this **only if the director indicator and appointment date are set**. That's the most common error in director payrolls.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The unticked director box",
      md: `If a director is set up as an ordinary employee and is paid a regular salary with a big bonus in March, the payroll will under-deduct employee NIC. HMRC can then collect the shortfall from the **employer** (with interest), and the company can only recover it from the director's pay within limits. Check the director flag on every new client payroll.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Typical owner-manager salaries for 2026/27",
      md: `- **£5,000** (the ST): no employee or employer NIC, but below the LEL (£6,708), so **no qualifying year** for State Pension.
- **£6,708 to £12,570**: a qualifying year with no employee NIC; employer NIC on the excess over £5,000 (covered by the Employment Allowance if the company can claim it).
- **£12,570**: uses the personal allowance fully; with no EA (sole-director company) employer NIC is (£12,570 − £5,000) × 15% = £1,135.50, which still gets corporation tax relief.

The right figure depends on EA eligibility, the company's CT rate and the director's other income. See the *Directors, DLA & profit extraction* track.`,
    },
  ],
  scenario: {
    title: "A March bonus at Pennine Survey Ltd",
    narrative: `**Pennine Survey Ltd** has one director-shareholder, **Owen**, plus two employees, so it claims Employment Allowance. Owen takes a salary of **£1,000 a month**. In March 2027 (month 12) the board votes him a **£20,000 bonus**, paid with March's salary. His payroll was set up by a previous bookkeeper as an ordinary employee.

Owen asks: *"Why is the NIC on my March payslip so much higher than the bookkeeper's software showed last year?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Owen's total 2026/27 earnings**: £1,000 × 12 + £20,000 = **£32,000**.

**If (wrongly) treated as an ordinary employee**, months 1–11 at £1,000 are below the £1,048 monthly PT, so no employee NIC. Month 12 (£21,000): (£4,189 − £1,048) × 8% = £251.28 + (£21,000 − £4,189) × 2% = £336.22. Total employee NIC for the year = **£587.50**.

**Correctly, as a director (annual earnings period)**: (£32,000 − £12,570) × 8% = **£1,554.40**. All of it falls in March under the standard method, because cumulative earnings first pass £12,570 in March.`,
      },
      {
        kind: "table",
        caption: "Owen's 2026/27 NIC",
        head: ["", "Wrongly as employee", "Correctly as director"],
        rows: [
          ["Employee NIC", "£587.50", "£1,554.40"],
          ["Employer NIC (before EA)", "£961.95 + £3,087.45 = £4,049.40", "(£32,000 − £5,000) × 15% = £4,050.00"],
          ["Under-deduction of employee NIC", "", "£966.90"],
        ],
      },
      {
        kind: "md",
        md: `**Action**: tick the director indicator, enter his appointment date, and let the software recalculate on the annual basis in March. Then check last year: if he had a similar bonus pattern in 2025/26 and wasn't flagged, there's an underpayment to correct with an additional FPS for that year (see the correcting errors lesson) and a conversation with the client about who bears the cost.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "first-nic-month",
      prompt:
        "A director is paid £4,000 a month from April 2026 under the **standard annual method** (category A). How much **employee** NIC is deducted in **month 4** (July)?",
      answer: 274.4,
      tolerance: 0.01,
      unit: "£",
      explain: "Cumulative earnings are £12,000 after month 3, below the £12,570 annual PT, so nothing is due until month 4.",
      working: "Earnings to date after month 4: £16,000\n\nNIC to date: (£16,000 − £12,570) × 8% = £3,430 × 8% = **£274.40**\n\nAlready paid: £0, so £274.40 in month 4.",
    },
    {
      kind: "numeric",
      id: "annual-director-nic",
      prompt: "A director's total earnings for 2026/27 are £60,000 (category A). What is their total **employee** NIC for the year?",
      answer: 3210.6,
      tolerance: 0.01,
      unit: "£",
      explain: "Apply annual thresholds: 8% between £12,570 and £50,270, 2% above.",
      working: "(£50,270 − £12,570) × 8% = £37,700 × 8% = £3,016.00\n\n(£60,000 − £50,270) × 2% = £9,730 × 2% = £194.60\n\nTotal **£3,210.60**",
    },
    {
      kind: "numeric",
      id: "director-employer-nic",
      prompt:
        "A sole-director company (the director is the only employee, so no Employment Allowance) pays the director £12,570 for 2026/27. What is the employer NIC for the year?",
      answer: 1135.5,
      tolerance: 0.01,
      unit: "£",
      explain: "Employer NIC is 15% of annual earnings above the £5,000 secondary threshold.",
      working: "(£12,570 − £5,000) × 15% = £7,570 × 15% = **£1,135.50**",
    },
    {
      kind: "mcq",
      id: "alternative-method",
      prompt:
        "A director is paid £3,000 a month under the alternative arrangements. When is the annual recalculation done?",
      options: [
        "Every quarter",
        "At the last payday of the tax year, or when they cease to be a director if sooner",
        "Only if HMRC asks",
        "At the end of the company's accounting period",
      ],
      answer: 1,
      explain: "Under the alternative arrangements, NIC is worked out per period and then reconciled to the annual basis at the last payday (or on ceasing to be a director).",
    },
    {
      kind: "multi",
      id: "director-setup",
      prompt: "Which of these do you need in the payroll software to calculate a director's NIC correctly? Select all that apply.",
      options: [
        "The director indicator ticked",
        "The date of appointment as director (if appointed in the year)",
        "The company's year end",
        "The chosen method (standard annual or alternative)",
        "The director's shareholding percentage",
      ],
      answers: [0, 1, 3],
      explain:
        "The software needs to know the person is a director, when they were appointed (for a pro-rata period) and which method to use. The company's year end and shareholding don't affect NIC.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-why-annual",
      prompt: "Why do directors have an annual earnings period for NIC?",
      options: [
        "Because they are paid annually",
        "To stop NIC being reduced by timing pay as irregular large payments",
        "Because directors don't pay employer NIC",
        "So they can claim Employment Allowance",
      ],
      answer: 1,
      explain: "Without it, directors could cut NIC by taking pay as a single large payment above the UEL.",
    },
    {
      kind: "mcq",
      id: "q-annual-pt",
      prompt: "Which primary threshold applies to a director who has been a director all year (2026/27)?",
      options: ["£1,048 a month", "£12,570 a year", "£5,000 a year", "£50,270 a year"],
      answer: 1,
      explain: "Directors use the annual PT of £12,570.",
    },
    {
      kind: "mcq",
      id: "q-appointed",
      prompt: "Someone becomes a director in October. How is their earnings period worked out?",
      options: [
        "Full annual period from 6 April",
        "Pro rata: the tax weeks from the week of appointment to the end of the tax year",
        "Monthly, as an ordinary employee, for the rest of the year",
        "From their date of birth",
      ],
      answer: 1,
      explain: "A director appointed mid-year has a pro-rata earnings period with thresholds scaled to match.",
    },
    {
      kind: "mcq",
      id: "q-lel-director",
      prompt: "A director takes a salary of £5,000 for 2026/27. Which is true?",
      options: [
        "They get a qualifying year for State Pension",
        "No NIC is due, but it doesn't give a qualifying year, because it's below the £6,708 LEL",
        "Employer NIC is due at 15%",
        "Employee NIC is due at 8%",
      ],
      answer: 1,
      explain: "£5,000 is at the ST (no employer NIC) but below the LEL, so no qualifying year.",
    },
    {
      kind: "mcq",
      id: "q-same-total",
      prompt: "Compared with the standard method, the alternative arrangements for a director:",
      options: [
        "Reduce the annual NIC liability",
        "Give the same annual liability but smoother deductions through the year",
        "Remove employer NIC",
        "Are only for directors over State Pension age",
      ],
      answer: 1,
      explain: "The annual recalculation means the total is the same; only the timing differs.",
    },
  ],
  sources: [
    { label: "CA44: National Insurance for company directors", url: "https://www.gov.uk/government/publications/ca44-national-insurance-for-company-directors" },
    { label: "NIM12000: Calculating Class 1 NICs for directors", url: "https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim12000" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Paying yourself as a company director (GOV.UK)", url: "https://www.gov.uk/running-a-limited-company/taking-money-out-of-a-limited-company" },
  ],
};
