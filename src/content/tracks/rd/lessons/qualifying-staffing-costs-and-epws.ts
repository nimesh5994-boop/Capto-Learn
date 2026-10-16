import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "qualifying-staffing-costs-and-epws",
  title: "Qualifying costs (1): staffing costs and externally provided workers",
  level: "practitioner",
  minutes: 40,
  summary:
    "The biggest number in most R&D claims: which staff costs qualify, how to apportion time between R&D and other work, why benefits in kind and dividends never qualify, the 9-month rule for bonuses, and the 65% rule and UK PAYE condition for agency and other externally provided workers.",
  objectives: [
    "List the elements of staffing costs that qualify and those that don't",
    "Apportion an employee's costs on a reasonable, evidenced basis, including qualifying indirect activities",
    "Apply the 9-month payment rule to accrued bonuses",
    "Calculate qualifying EPW costs for connected and unconnected staff providers, applying the UK PAYE condition",
  ],
  body: [
    {
      kind: "md",
      md: `Once you know the project qualifies (see the earlier lessons on the definition and boundaries of R&D), the next job is to cost it. The qualifying expenditure rules are the **same for the merged RDEC and ERIS**. Staffing costs are usually 60–90% of an SME's claim, so they're also where HMRC looks first.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What counts as staffing costs (CTA 2009 Part 13)",
      md: `Staffing costs are amounts paid to, or in respect of, **directors or employees directly and actively engaged in relevant R&D**:

- **earnings**: gross salaries, wages, overtime, bonuses and fees;
- **employer's (secondary) Class 1 NIC**;
- **employer contributions to pension schemes**;
- **reimbursed business expenses** paid to the employee.

They **don't** include **benefits in kind** (company cars, private medical insurance), **dividends**, Class 1A NIC, or recruitment fees.`,
    },
    {
      kind: "table",
      caption: "Common items in a staffing cost schedule",
      head: ["Item", "Qualifies?", "Why"],
      rows: [
        ["Software engineer's salary", "Yes, R&D proportion", "Earnings of an employee engaged in R&D"],
        ["Employer Class 1 NIC on that salary", "Yes, same proportion", "Secondary Class 1 NIC is a staffing cost"],
        ["Employer pension contribution", "Yes, same proportion", "Pension contributions are included"],
        ["Director's dividend", "No", "A distribution, not earnings"],
        ["Director's salary (director works 40% on R&D)", "Yes, 40%", "Directors are included if directly and actively engaged"],
        ["Company car for the CTO", "No", "Benefits in kind are excluded"],
        ["Bonus accrued at year end, paid 11 months later", "No (for this period)", "Must be paid within 9 months of the period end"],
        ["Payroll clerk's time processing R&D staff pay", "Possibly, small proportion", "Can be a qualifying indirect activity if directly supporting the R&D"],
      ],
    },
    {
      kind: "md",
      md: `### Apportioning time

Few employees spend 100% of their time on qualifying R&D. Use a **reasonable, evidenced** basis:

- **timesheets or project-tracking data** (Jira, time-recording) are best;
- **structured estimates** from team leads, made at the time and reviewed, are acceptable if they're credible;
- a percentage made up after the year end, with no evidence, is the classic weakness HMRC challenges.

Count both **direct R&D** (resolving the uncertainty: designing, building and testing the prototype, analysing results) and **qualifying indirect activities** (QIAs) such as R&D-specific technical information services, maintenance and administration directly supporting the R&D, and training required for the R&D. Exclude commercial, production and routine work (see the boundaries lesson).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The 9-month rule for unpaid amounts",
      md: `Staffing costs that are accrued at the period end (most often bonuses) only count for that period if they're **paid within 9 months** after the end of the period. Otherwise they count in the period in which they're paid. Under the merged scheme and ERIS, every category of qualifying expenditure must also have been **paid before the claim is made** (CTA 2009 s1139A; CIRD132000). Check the payroll after the year end before finalising the claim.`,
    },
    {
      kind: "md",
      md: `### Externally provided workers (EPWs)

An EPW is an individual who:
- is **not an employee or director** of the claimant;
- is **supplied** to the claimant by a staff provider (an agency, umbrella company, or connected company);
- works **under the supervision, direction or control** of the claimant; and
- isn't supplying their services through a contract for the provision of a service that the staff provider is itself delivering (that's a subcontract, covered in another lesson).

The qualifying amount depends on whether the claimant and staff provider are connected:`,
    },
    {
      kind: "table",
      caption: "Qualifying EPW expenditure",
      head: ["Relationship", "Qualifying amount"],
      rows: [
        ["**Unconnected** staff provider (normal agency)", "**65%** of the staff provision payment (for the R&D share of the worker's time)"],
        ["**Connected** staff provider (e.g. a group payroll company)", "The **lower of** the payment and the staff provider's own relevant staffing costs for the worker(s), provided it's accounted for under GAAP"],
        ["Unconnected, but both parties **elect** to be treated as connected", "As for connected"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The UK PAYE condition (accounting periods beginning on or after 1 April 2024)",
      md: `Under the merged RDEC and ERIS, **EPW costs only qualify if the worker's earnings are subject (wholly or partly) to UK PAYE**. A developer supplied by an overseas agency and paid outside UK payroll doesn't qualify, unless the narrow exception for R&D that **must** take place overseas applies (conditions not present in the UK, such as geography or a legal requirement; cost and availability of workers are ignored). Freelancers through their own personal service company are usually **subcontractors**, not EPWs.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Build the cost schedule from payroll, not the nominal ledger",
      md: `Start from the payroll reports (P32, payroll journals) for each employee, so salary, employer NIC and pension come through together and reconcile to the RTI submissions. Then apply each person's R&D percentage. Keep the reconciliation in the file: HMRC compliance officers routinely ask for it, and it also feeds the PAYE cap calculation.`,
    },
  ],
  scenario: {
    title: "Costing staff for Northwick Medtech Ltd",
    narrative: `Northwick Medtech Ltd (year ended 31 March 2026; merged RDEC applies) is developing a new sensor for wound monitoring. You have the payroll data and the CTO's project time records:

| Person | Gross pay | Employer NIC | Employer pension | Benefits in kind | R&D time |
|---|---:|---:|---:|---:|---:|
| Dr Ana Ruiz, CTO (director) | £80,000 | £11,250 | £4,000 | Car £6,200 | 70% |
| Tom Hale, electronics engineer | £52,000 | £7,050 | £2,600 | – | 90% |
| Lisa Gray, sales manager | £48,000 | £6,450 | £2,400 | – | 0% |

Ana also received £30,000 of dividends. Tom's £5,000 bonus for the year (included in his £52,000) was accrued at 31 March 2026 and paid on 31 May 2026.

In addition, an **unconnected UK agency** supplied a contract test engineer, paid through the agency's UK payroll. The agency charged £36,000, and he worked 100% on the project under Ana's direction.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Ana.** Salary, NIC and pension qualify at 70%: (£80,000 + £11,250 + £4,000) × 70% = £95,250 × 70% = **£66,675**. Her car and dividends are excluded.
2. **Tom.** The accrued bonus was paid 2 months after the year end, within 9 months, so it counts. (£52,000 + £7,050 + £2,600) × 90% = £61,650 × 90% = **£55,485**.
3. **Lisa.** Sales is commercial activity: **nil**.
4. **EPW.** Unconnected agency and the worker is on UK PAYE, so 65% × £36,000 = **£23,400**.`,
      },
      {
        kind: "table",
        caption: "Qualifying staffing and EPW costs",
        head: ["Item", "Workings", "Qualifying"],
        rows: [
          ["Dr Ana Ruiz", "£95,250 × 70%", "£66,675"],
          ["Tom Hale", "£61,650 × 90%", "£55,485"],
          ["Lisa Gray", "Commercial role", "£0"],
          ["Agency test engineer (EPW)", "£36,000 × 65%", "£23,400"],
          ["**Total**", "", "**£145,560**"],
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Evidence the 70%",
        md: `A director's own estimate of her R&D time is exactly what HMRC tests. Ana's diary, design reviews and test logs should support the 70%. If they don't, a lower, defensible figure is better than a high one that collapses on enquiry.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "staff-apportion",
      prompt:
        "An employee is paid a salary of £45,000. Employer Class 1 NIC is £5,925 and the employer pension contribution is £2,250. She also has private medical insurance worth £1,100. Timesheets show 60% of her time on qualifying R&D. What are her qualifying staffing costs?",
      answer: 31905,
      unit: "£",
      explain: "Salary, employer NIC and employer pension qualify; the medical insurance is a benefit in kind and is excluded.",
      working: "(£45,000 + £5,925 + £2,250) × 60% = £53,175 × 60% = **£31,905**.",
    },
    {
      kind: "numeric",
      id: "epw-unconnected",
      prompt:
        "An unconnected UK agency invoices £48,000 (excluding VAT) for two contract developers paid through its UK payroll. They work under the claimant's direction, 75% of their time on qualifying R&D. What is the qualifying EPW expenditure?",
      answer: 23400,
      unit: "£",
      explain: "Unconnected EPW costs qualify at 65% of the staff provision payment, for the R&D share of the time.",
      working: "£48,000 × 75% = £36,000 relating to R&D. £36,000 × 65% = **£23,400**.",
    },
    {
      kind: "classify",
      id: "staff-cost-items",
      prompt: "Which items can be included in qualifying staffing costs (for the R&D share of time)?",
      categories: ["Include", "Exclude"],
      items: [
        { text: "Employer's secondary Class 1 NIC", answer: 0 },
        { text: "A director's dividend", answer: 1, why: "A distribution, not earnings." },
        { text: "Employer pension contributions", answer: 0 },
        { text: "Company van benefit for an engineer", answer: 1, why: "Benefits in kind are excluded." },
        { text: "A bonus accrued at the year end and paid 4 months later", answer: 0, why: "Paid within 9 months of the period end." },
        { text: "Class 1A NIC on benefits", answer: 1 },
      ],
      explain: "Staffing costs are earnings, employer Class 1 NIC, pension contributions and reimbursed expenses. Benefits in kind, Class 1A and dividends never qualify.",
    },
    {
      kind: "mcq",
      id: "epw-overseas",
      prompt:
        "For an accounting period beginning on 1 July 2025, a company uses developers supplied by an agency in Poland. They are paid through the agency's Polish payroll and work remotely under the claimant's direction. Do their costs qualify as EPW expenditure?",
      options: [
        "Yes, at 65%",
        "Yes, in full because they're under the claimant's direction",
        "No, because their earnings are not subject to UK PAYE and nothing requires the work to be done overseas",
        "Only under ERIS",
      ],
      answer: 2,
      explain:
        "Under the merged scheme and ERIS, EPW costs only qualify where the workers' earnings are subject to UK PAYE, unless conditions require the R&D to be done overseas. Lower cost or availability of workers doesn't count.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-staff-bik",
      prompt: "Do benefits in kind provided to R&D staff count as qualifying staffing costs?",
      options: ["Yes, at the cash equivalent", "No, they are excluded", "Only company cars", "Only if payrolled"],
      answer: 1,
      explain: "Benefits in kind are not staffing costs for R&D purposes.",
    },
    {
      kind: "mcq",
      id: "q-9-month",
      prompt: "A bonus is accrued at the year end. Within what period must it be paid to count as a staffing cost of that year?",
      options: ["3 months", "6 months", "9 months", "12 months"],
      answer: 2,
      explain: "Accrued staffing costs must be paid within 9 months of the end of the period.",
    },
    {
      kind: "mcq",
      id: "q-epw-rate",
      prompt: "At what percentage do payments to an unconnected staff provider for EPWs qualify?",
      options: ["50%", "65%", "80%", "100%"],
      answer: 1,
      explain: "65% of the staff provision payment, for unconnected providers.",
    },
    {
      kind: "mcq",
      id: "q-director",
      prompt: "A director spends 30% of her time directly resolving technical uncertainties. Which part of her remuneration can qualify?",
      options: ["Nothing: directors are excluded", "30% of her salary, employer NIC and pension contributions", "30% of her salary and dividends", "100% of her salary"],
      answer: 1,
      explain: "Directors' earnings qualify in proportion to their R&D time; dividends never do.",
    },
    {
      kind: "mcq",
      id: "q-same-rules",
      prompt: "Are the qualifying expenditure rules different for the merged RDEC and ERIS?",
      options: ["Yes, ERIS is more generous", "No, the qualifying expenditure rules are the same", "Yes, only ERIS allows EPWs", "Yes, only merged RDEC allows staffing costs"],
      answer: 1,
      explain: "HMRC's guidance confirms the qualifying expenditure rules are identical for both schemes.",
    },
  ],
  sources: [
    { label: "HMRC: merged R&D expenditure credit scheme and ERIS", url: "https://www.gov.uk/guidance/research-and-development-rd-tax-relief-the-merged-scheme-and-enhanced-rd-intensive-support" },
    { label: "HMRC CIRD manual: overseas restrictions overview (CIRD150500)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird150500" },
    { label: "HMRC CIRD manual: staffing costs (CIRD83000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird83000" },
    { label: "HMRC CIRD manual: reformed reliefs – externally provided workers (CIRD137000)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-intangibles-research-and-development-manual/cird137000" },
    { label: "DSIT guidelines on the meaning of R&D for tax purposes", url: "https://www.gov.uk/government/publications/guidelines-on-the-meaning-of-research-and-development-for-tax-purposes/meaning-of-research-and-development-for-tax-purposes-guidelines" },
  ],
};
