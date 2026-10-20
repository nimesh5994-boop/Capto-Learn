import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "starters-and-tax-codes",
  title: "New starters and how tax codes work",
  level: "foundation",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Getting a new employee onto the payroll with the right code — P45 versus starter checklist, the three starter statements, emergency codes — and reading any tax code: the number, the letters, K codes, Scottish and Welsh prefixes, and cumulative versus week 1/month 1.",
  objectives: [
    "Choose the correct starting tax code from a P45 or the starter checklist statement A, B or C",
    "Explain what the number and suffix letter in a tax code mean, including M, N, T, 0T, BR, D0, D1 and NT",
    "Work out a K code and apply the 50% overriding limit",
    "Recognise Scottish (S) and Welsh (C) codes and the Scottish D codes",
    "Distinguish cumulative operation from week 1/month 1 (non-cumulative) and calculate a cumulative refund",
  ],
  body: [
    {
      kind: "md",
      md: `Most "my tax is wrong" calls from employees trace back to one of two things: the **starting code** chosen when they joined, or a **code change** HMRC issued that nobody actioned. A payroll clerk who understands tax codes can answer most of these queries in two minutes. This lesson gives you that understanding.

A tax code tells the payroll software **how much pay is tax-free in the year** (or how much extra pay to tax) and **which rates to use**. HMRC sets the code. The employer's job is to apply the code HMRC sends, or, for a new starter with no code yet, to choose the right starting code using HMRC's rules.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Reading the code 1257L",
      md: `- **The number** is the tax-free amount with the last digit removed. 1257 means a tax-free allowance of about **£12,570** for the year, which is the standard personal allowance for 2026/27.
- **The letter** tells you why the employee has that allowance. **L** means the standard personal allowance.
- Software works with the number × 10 + 9, so 1257L gives **£12,579** of free pay across the year (£1,048.26 a month by HMRC's table method). That's why your calculator answer can be a few pence away from the software's.`,
    },
    {
      kind: "table",
      caption: "Suffix letters and special codes you'll meet (England and Northern Ireland; see prefixes below for Scotland and Wales)",
      head: ["Code", "Meaning", "How it's taxed"],
      rows: [
        ["L", "Standard tax-free personal allowance", "Allowance per the number; basic, higher, additional rates"],
        ["M", "Marriage Allowance: the employee has **received** 10% of their partner's allowance", "e.g. 1383M (£12,570 + £1,260)"],
        ["N", "Marriage Allowance: the employee has **transferred** 10% to their partner", "e.g. 1131N (£12,570 − £1,260)"],
        ["T", "The code includes other items HMRC needs to review", "Allowance per the number"],
        ["0T", "No personal allowance (used up, or HMRC lacks information)", "All pay taxed at normal rates"],
        ["BR", "All pay taxed at the basic rate (usually a second job or pension)", "20% on everything"],
        ["D0", "All pay taxed at the higher rate (second job)", "40% on everything"],
        ["D1", "All pay taxed at the additional rate", "45% on everything"],
        ["NT", "No tax to be deducted", "Nil (only on HMRC's instruction)"],
        ["K", "Deductions exceed allowances: pay is **added to**, not deducted", "Subject to the 50% overriding limit"],
      ],
    },
    {
      kind: "md",
      md: `### K codes

A **K code** appears when the employee's taxable benefits or other adjustments (a company car, untaxed income, tax owed from an earlier year) are **bigger than their allowances**. Instead of giving free pay, the code **adds** an amount to taxable pay.

Example: allowance £12,570, company car and fuel benefits £16,000. Net deduction = £16,000 − £12,570 = £3,430, so the code is **K343**, and the software adds about £3,439 a year (£286.58 a month) to taxable pay.

**Overriding limit:** tax deducted under a K code in any pay period **can't exceed 50% of the employee's pay** for that period. Any tax the limit stops you collecting is carried forward by the cumulative calculation and, if still outstanding at year end, is collected by HMRC.`,
    },
    {
      kind: "md",
      md: `### Scottish and Welsh codes

Where an employee lives decides which income tax rates apply, not where the employer is based.

- **S prefix (e.g. S1257L)**: a Scottish taxpayer. Scottish rates apply to non-savings income: 19% starter, 20% basic, 21% intermediate, 42% higher, 45% advanced and 48% top rate for 2026/27. Scottish flat-rate codes are **SBR** (20%), **SD0** (21%), **SD1** (42%), **SD2** (45%) and **SD3** (48%).
- **C prefix (e.g. C1257L)**: a Welsh taxpayer. Welsh rates for 2026/27 are the same as England's, but the C prefix still matters because the tax is reported as Welsh.

National Insurance is UK-wide: an S or C prefix never changes the NIC calculation.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Cumulative vs week 1/month 1",
      md: `- **Cumulative** (the normal basis): each payday the software looks at **total pay and tax since 6 April**, gives the employee all the free pay and rate bands they're entitled to **to date**, and deducts or refunds the difference. Over- and under-deductions correct themselves during the year.
- **Week 1/month 1** (shown as W1, M1 or X, e.g. 1257L M1): each period is taxed **on its own**, using just one period's free pay and bands. No refunds or catch-up. Used for emergency codes and where HMRC wants to stop an earlier error flowing through.

A refund in the middle of the year on a cumulative code is normal, not a mistake. It usually means the employee earned less earlier in the year, or a code went up.`,
    },
    {
      kind: "md",
      md: `### Starting codes for a new employee

**If they bring a P45** (leaving date in the current tax year): use the **code on the P45** and, unless it's marked week 1/month 1, enter the **previous pay and tax to date** so the cumulative calculation picks up where the old employer left off. If they have more than one P45, use the one with the latest date.

**If there's no P45**, or it shows that they left their last job before the start of the current tax year, ask them to complete HMRC's **starter checklist** and use the statement they tick:`,
    },
    {
      kind: "table",
      caption: "Starter checklist statements and the code each one gives (2026/27)",
      head: ["Statement", "The employee says…", "Starting code"],
      rows: [
        ["A", "This is my first job since 6 April. I've not had taxable Jobseeker's Allowance, ESA, Incapacity Benefit, or a state or occupational pension", "1257L, cumulative"],
        ["B", "This is now my only job, but since 6 April I've had another job or one of those benefits. I don't receive a state or occupational pension", "1257L week 1/month 1"],
        ["C", "I have another job, or I receive a state or occupational pension", "BR, cumulative"],
        ["No statement ticked / form not returned", "", "0T week 1/month 1"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common starter mistakes",
      md: `- **Ticking A for someone who left a job in May**: they've had pay since 6 April, so it's statement B. Using cumulative 1257L would give them two lots of free pay and leave them owing tax at year end.
- **Ignoring the student loan section** of the starter checklist. It decides whether deductions start straight away (covered in the student loans lesson).
- **Not actioning a P6/P9 coding notice.** When HMRC sends a new code, apply it from the **next payday** and update the previous pay and tax only if the notice says so.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Answering 'why has my code changed?'",
      md: `The employer only sees the code, not HMRC's working. Point the employee to their **HMRC personal tax account** or the HMRC app, which shows how the code was built (benefits, untaxed interest, underpayments). Don't change a code yourself because an employee asks; only HMRC can issue a code, apart from the emergency and starter codes above.`,
    },
  ],
  scenario: {
    title: "Three new starters at Dunmore Garden Centre Ltd",
    narrative: `**Dunmore Garden Centre Ltd** in Stirling pays staff monthly on the 28th. Three people start in October 2026 and the office manager, Fiona, sends you their paperwork:

- **Ewan (19):** just finished college, first ever job. Ticked **statement A**. Lives in Stirling.
- **Priya (34):** left a call centre on 15 September 2026 and brought her **P45**: code **S1257L**, pay to date £9,800, tax to date £1,050. Lives in Falkirk.
- **Gareth (61):** semi-retired, gets an occupational pension from his previous employer and lives just over the border in Carlisle. No P45 for this job; ticked **statement C**.

Fiona asks: *"Which codes do I put in, and why does Priya's first payslip look different?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Ewan.** Statement A means first job since 6 April with no taxable benefits or pension, so **1257L cumulative**. He lives in Scotland, so the starter code should carry the S prefix: **S1257L**. If the software asks for his address, it may set the prefix automatically; HMRC will confirm the code later.

**Priya.** Her P45 has a leaving date in the current tax year, so use the P45: **S1257L cumulative**, with previous pay £9,800 and previous tax £1,050 entered. Her first payslip covers month 7 (6 October to 5 November), so the software gives her seven months of free pay **across both jobs** and compares the tax due on £9,800 + October's pay with the £1,050 already paid. That's why her first deduction may be lower or higher than she expects.

**Gareth.** Statement C: he already has an occupational pension that uses his personal allowance, so this job gets **BR** (all pay at 20%). He lives in England, so it's plain **BR**, not SBR. If his pension is small and doesn't use all his allowance, HMRC will later split the allowance and send a new code.`,
      },
      {
        kind: "table",
        caption: "What goes into the payroll software",
        head: ["Employee", "Information used", "Code", "Basis"],
        rows: [
          ["Ewan", "Starter checklist A, Scottish address", "S1257L", "Cumulative"],
          ["Priya", "P45 (left 15/09/2026)", "S1257L", "Cumulative, previous pay and tax entered"],
          ["Gareth", "Starter checklist C, English address", "BR", "Cumulative"],
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "File the evidence",
        md: `Keep the starter checklist or P45 with the payroll records for the current year plus 3 more tax years. If HMRC queries a code, the signed statement is your evidence that the employer followed the rules.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "starting-code",
      prompt: "Choose the correct starting code for each new starter (all live in England, start in November 2026, and have no P45 unless stated).",
      categories: ["1257L cumulative", "1257L week 1/month 1", "BR", "0T week 1/month 1"],
      items: [
        { text: "Graduate starting their first job; ticks statement A", answer: 0 },
        { text: "Left a job in July 2026 and has lost the P45; ticks statement B", answer: 1, why: "They've had pay since 6 April, so they get 1257L on a non-cumulative basis." },
        { text: "Keeps a part-time job elsewhere; ticks statement C", answer: 2 },
        { text: "Doesn't return the starter checklist", answer: 3 },
        { text: "Retired teacher with a teachers' pension taking a part-time job; ticks statement C", answer: 2, why: "Receiving an occupational pension means statement C." },
      ],
      explain:
        "Statement A gives 1257L cumulative, B gives 1257L W1/M1, C gives BR. With no information at all, use 0T W1/M1 until a code arrives.",
    },
    {
      kind: "numeric",
      id: "build-a-code",
      prompt:
        "HMRC is working out a 2026/27 code for an employee with the standard personal allowance of £12,570, a company car benefit of £5,400 and untaxed savings interest of £300 that HMRC is collecting through PAYE. What is the **number** in the resulting L code? (Enter the number only, e.g. 1257.)",
      answer: 687,
      tolerance: 0,
      unit: "",
      explain: "Deduct the benefits and untaxed income from the allowance, then drop the last digit.",
      working: "£12,570 − £5,400 − £300 = £6,870 tax-free amount → code **687L**.",
    },
    {
      kind: "numeric",
      id: "k-code",
      prompt:
        "An employee has a personal allowance of £12,570 and taxable benefits of £17,250 coded out for 2026/27. What is the **number** in their K code? (Enter the number only.)",
      answer: 468,
      tolerance: 0,
      unit: "",
      explain:
        "When benefits exceed the allowance, the excess becomes a K code: drop the last digit of the excess.",
      working: "£17,250 − £12,570 = £4,680 excess → **K468**. The software adds about £4,689 a year to taxable pay, but the tax in any period can't exceed 50% of that period's pay.",
    },
    {
      kind: "numeric",
      id: "cumulative-refund",
      prompt:
        "Month 6 payroll (to 5 October 2026). An employee on code **1257L cumulative** has total pay to date of £15,000, including this month. Tax deducted in months 1–5 was £1,800. Using free pay of £12,579 a year and rounding taxable pay to date down to the whole pound, what is the **refund** due in month 6?",
      answer: 58,
      tolerance: 1,
      unit: "£",
      explain:
        "Cumulative operation compares tax due on pay to date with tax already paid. The basic rate band to date (£37,700 × 6/12 = £18,850) is far more than the taxable pay, so it's all at 20%.",
      working:
        "Free pay to date: £12,579 × 6/12 = £6,289.50\n\nTaxable pay to date: £15,000 − £6,289.50 = £8,710.50 → **£8,710**\n\nTax due to date: £8,710 × 20% = **£1,742.00**\n\nAlready paid: £1,800 → refund **£58.00** in month 6.",
    },
    {
      kind: "mcq",
      id: "p45-old-year",
      prompt:
        "A new starter in October 2026 hands you a P45 showing they left their previous job on 20 March 2026 and haven't worked since. What should you do?",
      options: [
        "Use the code and pay to date on the P45 cumulatively",
        "Ask them to complete a starter checklist, because the P45 relates to an earlier tax year",
        "Use 0T week 1/month 1 until HMRC writes",
        "Use BR because they had another job",
      ],
      answer: 1,
      explain:
        "The pay and tax on that P45 relate to 2025/26, so they can't be carried into the 2026/27 cumulative calculation. Use the starter checklist. Here they'd probably tick statement A (no job or taxable benefit since 6 April), giving 1257L cumulative.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-meaning-1257l",
      prompt: "What does the number in tax code 1257L represent?",
      options: [
        "Weekly free pay of £125.70",
        "A tax-free amount of about £12,570 for the year",
        "The employee's tax reference",
        "Tax of £1,257 to deduct in the year",
      ],
      answer: 1,
      explain: "The number is the annual tax-free amount with the last digit removed.",
    },
    {
      kind: "mcq",
      id: "q-statement-b",
      prompt: "A new starter ticks statement B on the starter checklist. Which code do you use for 2026/27?",
      options: ["1257L cumulative", "1257L week 1/month 1", "BR", "0T"],
      answer: 1,
      explain: "Statement B means they've had another job or taxable benefit since 6 April, so 1257L is applied non-cumulatively.",
    },
    {
      kind: "mcq",
      id: "q-k-limit",
      prompt: "What limits the tax that can be deducted under a K code?",
      options: [
        "Tax can't exceed 20% of pay",
        "Tax can't exceed 50% of pay in the period",
        "K codes can only be used for directors",
        "There is no limit",
      ],
      answer: 1,
      explain: "The overriding limit stops tax under a K code exceeding 50% of the pay in that period.",
    },
    {
      kind: "mcq",
      id: "q-prefix",
      prompt: "An employer based in Manchester employs someone who lives in Edinburgh. Which rates of income tax apply to their pay?",
      options: [
        "England rates, because the employer is in England",
        "Scottish rates, shown by an S prefix on the code",
        "Scottish rates for tax and Scottish NIC rates",
        "Whichever the employee chooses",
      ],
      answer: 1,
      explain: "Scottish taxpayer status depends on where the employee lives. NIC is UK-wide and isn't affected.",
    },
    {
      kind: "mcq",
      id: "q-m1",
      prompt: "What does 'M1' after a tax code mean?",
      options: [
        "The employee is paid monthly",
        "Each month is taxed on its own without reference to earlier pay and tax",
        "The employee receives Marriage Allowance",
        "The code applies from month 1 only",
      ],
      answer: 1,
      explain: "Month 1 (non-cumulative) basis: each period uses one period's free pay and bands, with no refunds or catch-up.",
    },
    {
      kind: "mcq",
      id: "q-n-code",
      prompt: "An employee has transferred 10% of their personal allowance to their spouse under Marriage Allowance. Which code would you expect for 2026/27?",
      options: ["1383M", "1257L", "1131N", "1257T"],
      answer: 2,
      explain: "The transferor's allowance falls by £1,260 to £11,310, giving 1131N. The recipient gets 1383M.",
    },
  ],
  sources: [
    { label: "Tell HMRC about a new employee: employee information (GOV.UK)", url: "https://www.gov.uk/new-employee/employee-information" },
    { label: "HMRC starter checklist", url: "https://www.gov.uk/government/publications/paye-starter-checklist" },
    { label: "Tax codes (GOV.UK)", url: "https://www.gov.uk/tax-codes" },
    { label: "Emergency tax codes (GOV.UK)", url: "https://www.gov.uk/tax-codes/emergency-tax-codes" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "HMRC PAYE Manual", url: "https://www.gov.uk/hmrc-internal-manuals/paye-manual" },
  ],
};
