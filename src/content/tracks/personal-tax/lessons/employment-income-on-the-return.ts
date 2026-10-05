import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "employment-income-on-the-return",
  title: "Employment income on the return: P60, P11D and expenses",
  level: "foundation",
  minutes: 30,
  summary:
    "Getting the employment pages right: where the figures come from (P60, P11D, payslips), how benefits in kind are taxed, which expenses an employee can claim, mileage allowance relief, and the changes to homeworking relief from April 2026.",
  objectives: [
    "Complete the employment pages from a P60 and P11D",
    "Identify which employee expenses are deductible under the 'wholly, exclusively and necessarily' test",
    "Calculate mileage allowance relief when an employer pays less than the approved rates",
    "Reconcile PAYE deducted to the final liability",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "table",
      caption: "Where each figure on the employment page comes from",
      head: ["Document", "What it gives you", "When the employee should have it"],
      rows: [
        ["P60", "Pay and tax deducted for the tax year from that employer", "By 31 May after the tax year"],
        ["P45", "Pay and tax to the leaving date, if they changed job", "On leaving"],
        ["P11D (or payrolled benefits on payslips)", "Cash equivalents of benefits in kind and expenses not payrolled", "By 6 July after the tax year"],
        ["Payslips / pension statements", "Net pay arrangement contributions (already deducted), tips, etc.", "Throughout the year"],
      ],
    },
    {
      kind: "md",
      md: `### Benefits in kind

Benefits are taxed on their **cash equivalent** (the P11D figure): a company car (list price × CO₂ percentage), private medical insurance (cost to the employer), beneficial loans over £10,000, living accommodation, and so on. Most benefits are added to employment income and taxed at the employee's marginal rate. Usually the tax code has already been adjusted to collect the tax, so check the code before concluding there's an underpayment.

If the employer **payrolls** benefits, they're already in the P60 pay figure. Don't add them again from the P11D.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The test for employee expenses (ITEPA 2003 s336)",
      md: `An employee can deduct an expense only if they're **obliged to incur and pay it as holder of the employment** and the amount is incurred **wholly, exclusively and necessarily in the performance of the duties**. It's far stricter than the test for the self-employed. Costs of *putting yourself in a position* to do the job (e.g. ordinary commuting, childcare, a suit for work) fail.`,
    },
    {
      kind: "table",
      caption: "Common employee claims",
      head: ["Expense", "Deductible?", "Notes"],
      rows: [
        ["Business mileage in own car", "Yes, via mileage allowance relief", "Up to 45p/mile for the first 10,000 business miles, 25p after, less what the employer paid"],
        ["Professional subscriptions on HMRC's approved list (e.g. ICAEW, ACCA, NMC)", "Yes", "Listed bodies only (s343–344)"],
        ["Flat rate expenses for uniforms and tools", "Yes", "Fixed amounts by industry"],
        ["Ordinary commuting", "No", "Home to permanent workplace is private travel"],
        ["Additional costs of working from home", "No, from 6 April 2026", "The deduction for unreimbursed homeworking costs was removed. Employers can still reimburse tax-free where conditions are met"],
        ["Training to get a new qualification", "Usually no", "Not in the performance of current duties"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Watch for refund 'agencies'",
      md: `Clients sometimes arrive having signed up with a claims company that made inflated expense claims on their behalf. Check the HMRC record for past P87 claims before filing — a return that repeats an incorrect claim compounds the problem.`,
    },
    {
      kind: "md",
      md: `### Mileage allowance relief (MAR)

The approved mileage allowance payment (AMAP) rates for cars and vans are **45p per mile for the first 10,000 business miles** in the tax year and **25p thereafter**. If the employer pays less, the employee can claim relief on the shortfall. If the employer pays more, the excess is taxable.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Directors are employees too",
      md: `A director's salary, benefits and expenses go on the employment page like anyone else's. Tick the director box and the close company box where relevant. Dividends do **not** go here — they go on the main return.`,
    },
  ],
  scenario: {
    title: "Callum Reid: P60, P11D and a new medical benefit",
    narrative: `Callum is a sales manager in Nottingham. For 2026/27 his documents show:

- P60: pay £58,000, tax deducted £13,352
- P11D: company car benefit £6,800; private medical insurance £1,200 (started in January 2027, not reflected in his tax code)
- He pays his CIMA subscription personally: £350 (CIMA is on HMRC's approved list)
- His company car benefit was already in his tax code for the whole year.

He has no other income.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Employment income:** pay £58,000 + car £6,800 + medical £1,200 = £66,000.
2. **Less allowable expenses:** CIMA subscription £350 → **£65,650**.
3. **Taxable income:** £65,650 − £12,570 = **£53,080**.
4. **Tax:** £37,700 × 20% = £7,540; £15,380 × 40% = £6,152. Total **£13,692**.
5. **Less PAYE:** £13,692 − £13,352 = **£340 payable** through SA.`,
      },
      {
        kind: "md",
        md: `Sense-check the underpayment. The medical cover of £1,200 wasn't coded, so it costs £1,200 × 40% = £480. The CIMA claim saves £350 × 40% = £140. £480 − £140 = **£340** — exactly the balance. If the difference hadn't reconciled, you'd go back to the code history in the client's HMRC record. Never just accept a balancing figure; you should be able to explain it.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Future years",
        md: `Ask HMRC (or let the P11D feed through) to update Callum's code for the medical benefit so 2027/28 is collected through PAYE, and claim the CIMA subscription through his code too.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "mar-claim",
      prompt:
        "Priya drove 12,000 business miles in her own car in 2026/27. Her employer reimbursed her at 30p per mile. How much mileage allowance relief can she claim?",
      answer: 1400,
      unit: "£",
      explain: "Compare the AMAP amount with what the employer paid. The shortfall is deductible.",
      working: "AMAP: 10,000 × 45p = £4,500 + 2,000 × 25p = £500 → £5,000.\nPaid: 12,000 × 30p = £3,600.\nMAR = £5,000 − £3,600 = **£1,400**.",
    },
    {
      kind: "classify",
      id: "employee-expenses",
      prompt: "An employee asks which of these they can claim against their 2026/27 employment income.",
      categories: ["Deductible", "Not deductible"],
      items: [
        { text: "ACCA annual subscription paid personally", answer: 0, why: "ACCA is on HMRC's approved list." },
        { text: "Daily train fare from home to their only office", answer: 1, why: "Ordinary commuting." },
        { text: "Extra heating while required to work from home, not reimbursed", answer: 1, why: "Relief for unreimbursed homeworking costs ended from 6 April 2026." },
        { text: "Business miles visiting clients in own car, no reimbursement", answer: 0, why: "Mileage allowance relief at AMAP rates." },
        { text: "Smart suits worn to client meetings", answer: 1, why: "Ordinary clothing has a dual purpose." },
      ],
      explain: "Employee expenses need to be incurred wholly, exclusively and necessarily in performing the duties — a much tighter test than for the self-employed.",
    },
    {
      kind: "numeric",
      id: "underpayment",
      prompt:
        "Hannah's P60 shows pay of £42,000 and tax deducted of £5,500. Her P11D shows private medical insurance of £900 that wasn't in her tax code. She has no other income or expenses. How much tax does she owe through SA for 2026/27?",
      answer: 466,
      unit: "£",
      explain: "Add the benefit to pay, deduct the personal allowance and compare the liability with PAYE.",
      working: "Employment income £42,900 − £12,570 = £30,330 taxable.\n£30,330 × 20% = £6,066.\n£6,066 − £5,500 = **£466**.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-p11d-date",
      prompt: "By when should an employee receive their P11D for 2026/27?",
      options: ["31 May 2027", "6 July 2027", "31 October 2027", "31 January 2028"],
      answer: 1,
      explain: "P11Ds are due by 6 July after the end of the tax year. P60s are due by 31 May.",
    },
    {
      kind: "mcq",
      id: "q-amap",
      prompt: "What is the AMAP rate for business miles in a car above 10,000 miles in the tax year?",
      options: ["45p", "25p", "20p", "5p"],
      answer: 1,
      explain: "45p for the first 10,000 business miles, 25p thereafter.",
    },
    {
      kind: "mcq",
      id: "q-payrolled",
      prompt: "An employer payrolls the company car benefit. Where does it go on the return?",
      options: ["Add the P11D figure to the P60 pay", "It's already in the P60 pay figure, so don't add it again", "On the self-employment pages", "It isn't taxable"],
      answer: 1,
      explain: "Payrolled benefits are included in pay. Adding them again double-counts.",
    },
    {
      kind: "mcq",
      id: "q-s336",
      prompt: "Which phrase describes the test for an employee's expense deduction?",
      options: ["Wholly and exclusively for the trade", "Wholly, exclusively and necessarily in the performance of the duties", "Reasonable and proportionate", "Incurred for the purposes of the business"],
      answer: 1,
      explain: "ITEPA 2003 s336 adds 'necessarily' and 'in the performance of the duties', which makes it much stricter than the trading test.",
    },
    {
      kind: "mcq",
      id: "q-wfh",
      prompt: "An employee required to work from home asks to claim £6 a week for 2026/27. What do you tell them?",
      options: ["Claim it through SA", "Claim it with a P87", "The relief for unreimbursed homeworking costs was removed from 6 April 2026; their employer could reimburse it instead", "Claim double for higher rate"],
      answer: 2,
      explain: "From 2026/27 employees can't claim this deduction from HMRC. Earlier years can still be claimed within the 4-year time limit.",
    },
  ],
  sources: [
    { label: "ITEPA 2003 s336 – deductions for expenses: the general rule", url: "https://www.legislation.gov.uk/ukpga/2003/1/section/336" },
    { label: "Claim tax relief for your job expenses (GOV.UK)", url: "https://www.gov.uk/tax-relief-for-employees" },
    { label: "Removal of tax relief on non-reimbursed homeworking expenses", url: "https://www.gov.uk/government/publications/income-tax-removal-of-the-tax-relief-for-additional-homeworking-expenses/removal-of-tax-relief-on-non-reimbursed-homeworking-expenses" },
    { label: "Expenses and benefits: business travel mileage for employees' own vehicles", url: "https://www.gov.uk/expenses-and-benefits-business-travel-mileage/rules-for-tax" },
    { label: "Approved professional organisations and learned societies (List 3)", url: "https://www.gov.uk/government/publications/professional-bodies-approved-for-tax-relief-list-3" },
  ],
};
