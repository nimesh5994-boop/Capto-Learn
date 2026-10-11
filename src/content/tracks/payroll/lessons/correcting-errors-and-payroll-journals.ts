import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "correcting-errors-and-payroll-journals",
  title: "Correcting payroll errors and posting payroll journals",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "How to put payroll mistakes right in the current and earlier tax years (FPS year-to-date corrections, wrong payment dates, earlier year updates, under-deducted NIC), and how to post the monthly payroll journal and reconcile the PAYE and pension control accounts.",
  objectives: [
    "Correct an FPS or EPS error in the current tax year and in a previous tax year",
    "Explain who bears under-deducted tax and NIC and how far it can be recovered from the employee",
    "Post the monthly payroll journal from a payroll summary, including employer pension and student loans",
    "Post Employment Allowance and statutory pay recovery, and reconcile the PAYE control account to HMRC",
  ],
  body: [
    {
      kind: "md",
      md: `Two skills separate a payroll clerk from a payroll-literate accountant: knowing **how to correct** a payroll mistake without making it worse, and being able to turn a payroll summary into a **journal** that reconciles. Most messy balance sheets on small company files have a PAYE control account that nobody has reconciled for months.`,
    },
    {
      kind: "table",
      caption: "Correcting RTI submissions",
      head: ["Mistake", "How to correct it"],
      rows: [
        ["Wrong pay or deductions in the **current** tax year", "Correct the **year-to-date** figures in the next regular FPS (don't duplicate pay in the 'this period' fields)"],
        ["FPS sent with the **wrong payment date**", "Send an additional FPS with the correct date, pay in period of 0.00, unchanged year-to-date figures and late reporting reason **H** (correction to earlier submission), by the 19th of the tax month after the original"],
        ["Wrong NIC category letter in the current year", "Report the correct letter on the next FPS"],
        ["Mistake in a **previous** tax year from 2020/21 onwards", "Send an **additional FPS** for that year with the correct year-to-date figures"],
        ["Mistake in a year before 2020/21", "Send an **Earlier Year Update (EYU)**"],
        ["EPS mistake (e.g. wrong recovery or EA claim)", "Send an EPS with the correct year-to-date figures for the year concerned"],
        ["Wrong start or leaving date", "Update the payroll record; don't report it as a new start/leave on the next FPS (it can create a duplicate record)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who pays when the employer gets it wrong?",
      md: `- **Tax** under-deducted because of the employer's error (e.g. ignoring a new code) is the employer's liability. HMRC can, in limited circumstances, direct that the employee pays instead, where the employer took reasonable care and the error was in good faith, or the employee knew the employer was failing to deduct.
- **Employee NIC** under-deducted by mistake can only be recovered from the employee's pay in the **same and the following tax year**, and in each pay period the extra deduction can't exceed the normal NIC for that period. Anything not recovered is a cost to the employer, and HMRC collects the full amount from the employer regardless.
- Penalties for inaccuracies apply only if the employer **didn't take reasonable care** or acted deliberately.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Overpaid salary",
      md: `If an employee was overpaid net pay (e.g. a pay rise keyed twice), don't simply reverse it in the next run without telling them. Recovering an overpayment from wages is lawful under the Employment Rights Act, but agree the repayment plan in writing and correct the gross and deductions through the year-to-date figures, so tax and NIC follow the corrected pay.`,
    },
    {
      kind: "md",
      md: `### The payroll journal

Each pay run produces one journal from the payroll summary:

| Debit (costs) | Credit (liabilities) |
|---|---|
| **Gross wages** (salary, overtime, SSP, SMP) | **PAYE/NIC control**: income tax + employee NIC + **employer NIC** + student and postgraduate loans |
| **Employer's NIC** | **Pension creditor**: employee + employer contributions |
| **Employer pension** | **Net wages control**: the net pay due to staff |

Then:
- Paying the staff: **Dr Net wages control, Cr Bank**.
- Paying HMRC: **Dr PAYE/NIC control, Cr Bank**.
- Employment Allowance used: **Dr PAYE/NIC control, Cr Employer's NIC** (it reduces the employer NIC cost).
- Statutory pay recovered (e.g. SMP at 92%): **Dr PAYE/NIC control, Cr Gross wages** (or a separate "SMP recovered" account), reducing the cost.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Reconcile the control accounts every month",
      md: `At any month end the PAYE/NIC control balance should equal **the amount owed to HMRC for the latest tax month** (normally paid by the 22nd of the following month), and agree to the HMRC online account. The pension creditor should equal the contributions due to the provider (by the 22nd under auto-enrolment rules). The net wages control should be **nil** once staff are paid. An unexplained balance means a missed journal, a payment to the wrong reference, or a penalty nobody has posted.`,
    },
  ],
  scenario: {
    title: "Rebuilding the payroll postings at Lindale Joinery Ltd",
    narrative: `You've taken on **Lindale Joinery Ltd**. The previous bookkeeper posted only the **net pay** (as "Wages") and each **HMRC payment** (also to "Wages"). The PAYE liability on the balance sheet is nil, but HMRC's online account shows **£6,220** owing for tax month 6 (due 22 October 2026).

The September 2026 payroll summary:

| Item | Amount |
|---|---:|
| Gross pay | £20,000 |
| Income tax | £2,600 |
| Employee NIC | £1,100 |
| Student loan deductions | £120 |
| Employee pension (net pay arrangement) | £1,000 |
| Net pay | £15,180 |
| Employer NIC | £2,400 |
| Employer pension | £600 |

The company's Employment Allowance was used up in July.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Check the summary adds up.** Net pay = £20,000 − £2,600 − £1,100 − £120 − £1,000 = **£15,180** ✓.

**2. Liabilities.**
- PAYE/NIC control = £2,600 + £1,100 + £2,400 + £120 = **£6,220**, matching HMRC ✓.
- Pension creditor = £1,000 + £600 = **£1,600**.`,
      },
      {
        kind: "journal",
        title: "September 2026 payroll journal",
        narrative: "Costs to the P&L; deductions and employer costs to the control accounts.",
        lines: [
          { account: "Gross wages", dr: 20000 },
          { account: "Employer's NIC", dr: 2400 },
          { account: "Employer pension", dr: 600 },
          { account: "PAYE/NIC control (HMRC)", cr: 6220 },
          { account: "Pension creditor", cr: 1600 },
          { account: "Net wages control", cr: 15180 },
        ],
      },
      {
        kind: "md",
        md: `**3. The payments.** Net pay paid on 30 September: Dr Net wages control £15,180, Cr Bank. The HMRC payment on 22 October: Dr PAYE/NIC control £6,220, Cr Bank.

**4. Fixing the history.** The earlier months need the same treatment: the "Wages" account currently contains net pay **plus** HMRC payments, but no pension or accrued PAYE. Re-analyse each month into gross wages, employer NIC and employer pension, and set up the control accounts. The total P&L cost should end up equal to gross pay + employer NIC + employer pension for the year, less any Employment Allowance and statutory pay recovered.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "monthly-payroll-journal",
      prompt:
        "Post this month's payroll: gross pay £12,500; income tax £1,450; employee NIC £620; employer NIC £1,330; employee pension (net pay) £625; employer pension £375; no student loans. Net pay is £9,805.",
      accounts: [
        "Gross wages",
        "Employer's NIC",
        "Employer pension",
        "PAYE/NIC control (HMRC)",
        "Pension creditor",
        "Net wages control",
        "Bank",
        "Director's loan account",
      ],
      answer: [
        { account: "Gross wages", dr: 12500 },
        { account: "Employer's NIC", dr: 1330 },
        { account: "Employer pension", dr: 375 },
        { account: "PAYE/NIC control (HMRC)", cr: 3400 },
        { account: "Pension creditor", cr: 1000 },
        { account: "Net wages control", cr: 9805 },
      ],
      explain:
        "PAYE/NIC control = tax £1,450 + employee NIC £620 + employer NIC £1,330 = £3,400. Pension creditor = £625 + £375 = £1,000. Net pay £12,500 − £1,450 − £620 − £625 = £9,805. Debits £14,205 = credits £14,205.",
    },
    {
      kind: "journal",
      id: "ea-journal",
      prompt:
        "In April the company claims Employment Allowance against its £1,330 employer NIC for the month, so it pays HMRC £1,330 less. Post the Employment Allowance.",
      accounts: ["PAYE/NIC control (HMRC)", "Employer's NIC", "Gross wages", "Other income – grants", "Bank", "Net wages control"],
      answer: [
        { account: "PAYE/NIC control (HMRC)", dr: 1330 },
        { account: "Employer's NIC", cr: 1330 },
      ],
      explain:
        "EA reduces the amount owed to HMRC and the employer NIC cost. Crediting it to the employer NIC account shows the true net cost. (Some practices use a separate income code; either way the control account is debited.)",
    },
    {
      kind: "mcq",
      id: "previous-year-error",
      prompt:
        "In October 2026 you find that an employee's pay was under-reported by £800 in March 2026 (tax year 2025/26). How do you correct the RTI record?",
      options: [
        "Add £800 to this month's pay",
        "Send an additional FPS for 2025/26 with corrected year-to-date figures",
        "Send an EYU",
        "Write to HMRC with a corrected P60 only",
      ],
      answer: 1,
      explain: "For mistakes in tax years from 2020/21 onwards, send an additional FPS for that year with the correct year-to-date figures. EYUs are for earlier years.",
    },
    {
      kind: "numeric",
      id: "nic-recovery",
      prompt:
        "Through an error, an employee's NIC was under-deducted by £300 earlier in 2026/27. Their normal employee NIC is £120 a month. The employer starts recovering in January 2027 (month 10). What is the **maximum** total the employer can recover from the employee by the end of 2026/27 (months 10, 11 and 12)?",
      answer: 300,
      unit: "£",
      explain:
        "In each period the extra recovery can't exceed the normal NIC for that period (£120). Three months × £120 = £360 of capacity, which is more than the £300 owed, so the whole £300 can be recovered this year.",
      working: "Capacity: 3 × £120 = £360 ≥ £300 owed → recover **£300** (e.g. £120 + £120 + £60).",
    },
    {
      kind: "mcq",
      id: "wrong-date",
      prompt: "An FPS was sent with a payment date of 30 September instead of 29 September (same tax month). What's the fix?",
      options: [
        "Nothing: it's the same tax month",
        "An additional FPS with the correct date, pay in period 0.00, unchanged year-to-date figures and late reporting reason H",
        "Delete the original FPS online",
        "Send an EYU",
      ],
      answer: 1,
      explain: "HMRC's guidance is to send an additional FPS with the correct payment date and reason H, by the 19th of the following tax month.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ytd",
      prompt: "How do you correct an under-reported bonus from two months ago in the current tax year?",
      options: [
        "Send an EYU",
        "Correct the year-to-date figures in the next regular FPS",
        "Include it again as pay in this period",
        "It can only be corrected at the year end",
      ],
      answer: 1,
      explain: "Update the year-to-date figures on the next FPS.",
    },
    {
      kind: "mcq",
      id: "q-paye-control",
      prompt: "Which of these is credited to the PAYE/NIC control account in a payroll journal?",
      options: [
        "Employer pension contributions",
        "Employer NIC",
        "Net pay",
        "Gross wages",
      ],
      answer: 1,
      explain: "PAYE/NIC control includes tax, employee NIC, employer NIC and student loans. Pension goes to the pension creditor.",
    },
    {
      kind: "mcq",
      id: "q-net-wages",
      prompt: "After staff have been paid, what should the net wages control account show?",
      options: ["The month's gross pay", "Nil", "The PAYE owed", "Employer NIC"],
      answer: 1,
      explain: "It's cleared when the net pay is paid out of the bank.",
    },
    {
      kind: "mcq",
      id: "q-smp-recovery-journal",
      prompt: "How is SMP recovered from HMRC posted?",
      options: [
        "Dr Bank, Cr Other income",
        "Dr PAYE/NIC control, Cr Gross wages (or SMP recovered)",
        "Dr Gross wages, Cr PAYE/NIC control",
        "It isn't posted",
      ],
      answer: 1,
      explain: "Recovery reduces the amount owed to HMRC and the cost of the SMP.",
    },
    {
      kind: "mcq",
      id: "q-penalty-errors",
      prompt: "When can HMRC charge a penalty for a payroll mistake?",
      options: [
        "For every mistake, however small",
        "Only if the employer didn't take reasonable care or acted deliberately",
        "Only if the mistake is over £1,000",
        "Never, if corrected within the year",
      ],
      answer: 1,
      explain: "Inaccuracy penalties apply to careless or deliberate errors.",
    },
  ],
  sources: [
    { label: "Correcting your FPS or EPS (GOV.UK)", url: "https://www.gov.uk/payroll-errors/correcting-your-fps-or-eps" },
    { label: "Fix problems with running payroll (GOV.UK)", url: "https://www.gov.uk/payroll-errors" },
    { label: "DMBM522830: Regulation 72(5) directions – background", url: "https://www.gov.uk/hmrc-internal-manuals/debt-management-and-banking/dmbm522830" },
    { label: "SAM142040: Regulation 72(5) condition A direction", url: "https://www.gov.uk/hmrc-internal-manuals/self-assessment-manual/sam142040" },
    { label: "CWG2: Employer further guide to PAYE and NICs 2026 to 2027", url: "https://www.gov.uk/government/publications/cwg2-further-guide-to-paye-and-national-insurance-contributions/2026-to-2027-employer-further-guide-to-paye-and-national-insurance-contributions" },
  ],
};
