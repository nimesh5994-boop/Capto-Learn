import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "pensions-for-owner-managed-companies",
  title: "Pensions for owner-directors and family members: employer v personal contributions",
  level: "practitioner",
  minutes: 35,
  summary:
    "Choosing between employer and personal pension contributions for a director-shareholder, how relevant UK earnings limit personal relief, the 'wholly and exclusively' test for the company's deduction (including family members on the payroll), and the auto-enrolment position.",
  objectives: [
    "Compare employer and personal contributions for a director-shareholder in terms of tax relief and limits",
    "Calculate the maximum personal contribution attracting tax relief",
    "Apply the wholly and exclusively test, including for a spouse or family member paid through the business",
    "Explain how SIPPs and other pension vehicles suit owner-managed businesses",
    "Set out the auto-enrolment position for a director's own pension",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Owner-directors usually pay themselves a modest salary and take the rest of their reward as dividends. That creates a quirk: **personal pension relief is limited by earnings**, and dividends aren't earnings. A pension funded by the **company** isn't limited that way. This lesson explains how to choose, and how to record the decision so the company's deduction is safe.`,
    },
    {
      kind: "table",
      caption: "Employer versus personal contributions for a director-shareholder",
      head: ["", "Employer contribution", "Personal contribution"],
      rows: [
        ["Who pays", "The company", "The director from their own funds"],
        ["Limit for tax relief", "Annual allowance (£60,000 in 2026/27, plus carry forward); deduction subject to wholly and exclusively", "Higher of **100% of relevant UK earnings** and **£3,600 gross**, and within the annual allowance"],
        ["Corporation tax relief", "Yes, on the company", "No"],
        ["Income tax relief", "None needed: not income of the director", "20% at source (RAS) or net pay; higher-rate via Self Assessment"],
        ["NIC", "None, either side", "None saved"],
        ["Relevant UK earnings", "Not needed", "Salary, benefits taxed as employment income and trading profits; **dividends do not count**"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Relevant UK earnings",
      md: `For personal contribution relief, the limit is the **higher of £3,600 and 100% of the individual's relevant UK earnings** in the tax year: broadly employment income (salary, bonuses, taxable benefits) and self-employed profits. **Dividends, interest and rental income are not relevant earnings.** Furnished holiday-let profits stopped counting when the FHL regime was abolished from 6 April 2025. A director paid a £12,570 salary can personally contribute up to **£12,570 gross** (£10,056 net under relief at source) and get tax relief, however large their dividends.`,
    },
    {
      kind: "md",
      md: `### Wholly and exclusively, and family members

An **employer contribution** is deductible if it is paid wholly and exclusively for the purposes of the trade (see the directors track). HMRC's guidance (BIM46035 onwards) says that the **total remuneration package** must be commercially justifiable. For a family member (a spouse or adult child on the payroll):

- They must actually **do the work** that justifies the pay and the pension.
- The package should be **comparable** to what an unconnected employee would receive for the same duties.
- A pension paid for a family member who does little or no work is likely to be **disallowed** (and the salary too).
- Keep **evidence**: a contract or job description, timesheets or emails, and the pay and pension decisions minuted.

If the family member is an employee, the **auto-enrolment** position is the same as for any worker. Note the director exemptions.

### Vehicles

- **Workplace schemes** (NEST, People's Pension and others): straightforward, low cost, limited investment choice.
- **SIPP (self-invested personal pension):** the director chooses the investments; the company can pay employer contributions into it; usually the best choice for an owner-director.
- **SSAS (small self-administered scheme):** for a small number of related members; allows company loans back, subject to strict rules; higher cost and complexity.
- **Commercial property** held in a SIPP/SSAS and rented to the company is a common planning structure but needs specialist advice (VAT, SDLT, rent levels, connected-party rules).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't mix up the limits",
      md: `- The **personal** contribution limit is **earnings-based**; the **employer** contribution limit is the **annual allowance**.
- If total inputs (personal + employer) exceed the annual allowance and no carry forward is available, an **annual allowance charge** arises on the member.
- A personal contribution above relevant earnings gets **no** tax relief and the provider may refuse the tax claim, so check the earnings figure before the client pays.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Auto-enrolment for the director",
      md: `A sole director never has AE duties. If two directors both have employment contracts, they are workers and the company has duties, but it **can choose** whether to automatically enrol a director (a director left out can still opt in or join, and the company must still declare compliance). Whether or not AE applies, the company can still pay **employer contributions** to a director's pension voluntarily.`,
    },
  ],
  scenario: {
    title: "Pension planning for Lowther Interiors Ltd",
    narrative: `Lowther Interiors Ltd is owned by Marcus Lowther, who takes a £12,570 salary and dividends of £30,000 a year (so he is a basic-rate taxpayer). His wife, Elena, genuinely works in the business as bookkeeper (about 15 hours a week) for a salary of £10,000. The company has £30,000 of surplus profit this year. Marcus wants to know whether to contribute personally or have the company pay.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: personal route.** Marcus's relevant UK earnings are his £12,570 salary (the dividends don't count). Maximum personal contribution with relief = **£12,570 gross**. That would cost £10,056 net in a relief at source scheme (the provider adds £2,514). Being a basic-rate taxpayer after salary and dividends, he gets nothing further. The company gets **no** corporation tax relief.

**Step 2: employer route.** The company pays £30,000 into a SIPP. If taxable profits are below £50,000 at 19%, corporation tax is reduced by **£5,700** (£30,000 × 19%), so the net cost to the company is **£24,300**. There is no NIC and no income tax charge on Marcus. Marcus's annual allowance is £60,000, so £30,000 is within it.

**Step 3: Elena.** A pension for Elena is deductible if the whole package (salary £10,000 plus pension) is commercially justifiable for a part-time bookkeeper. If she works 15 hours a week and her package is comparable with an unrelated employee's, a small employer contribution is acceptable. A £30,000 contribution for her would not be.

**Step 4: the decision.** The employer route is more efficient: a larger relievable amount, corporation tax relief, no NIC. Record the commercial rationale (long-term remuneration, retention, reduced extraction of taxable dividends) in a **board minute**.

**Step 5: AE.** Elena is an employee, so the company has AE duties. Her £10,000 salary is **not above** the £10,000 earnings trigger, so she is a **non-eligible jobholder**: no automatic enrolment, but if she opts in the company must enrol her and contribute. If Marcus has an employment contract he is also a worker (Elena has one too); he earns above the trigger, but as a director the company can choose whether to enrol him. Either way, declare compliance and check that the scheme meets AE minimums.`,
      },
      {
        kind: "journal",
        title: "Employer contribution of £30,000 to Marcus's SIPP",
        narrative: "Deductible when paid. No benefit in kind.",
        lines: [
          { account: "Pension costs – employer contributions", dr: 30000 },
          { account: "Bank", cr: 30000 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "personal-limit",
      prompt: "A director takes a £9,000 salary and £60,000 of dividends in 2026/27. What is the maximum gross personal pension contribution that attracts tax relief (£)? Assume no other earnings.",
      answer: 9000,
      unit: "£",
      explain: "100% of relevant UK earnings; dividends don't count. £9,000 exceeds the £3,600 minimum.",
      working: "Higher of £3,600 and £9,000 = **£9,000**.",
    },
    {
      kind: "numeric",
      id: "net-relief-source",
      prompt: "The director pays the maximum £9,000 gross into a relief at source SIPP. How much does the director actually pay from their bank account (£)?",
      answer: 7200,
      unit: "£",
      explain: "Under relief at source the member pays 80%; the provider claims 20% from HMRC.",
      working: "£9,000 × 80% = **£7,200**.",
    },
    {
      kind: "numeric",
      id: "ct-relief-employer",
      prompt: "A company with profits under £50,000 pays a £20,000 employer contribution. How much corporation tax does it save at 19% (£)?",
      answer: 3800,
      unit: "£",
      explain: "The contribution is a deductible expense.",
      working: "£20,000 × 19% = **£3,800**.",
    },
    {
      kind: "classify",
      id: "classify-relevant-earnings",
      prompt: "Does the item count as relevant UK earnings for personal pension contributions?",
      categories: ["Counts", "Does not count"],
      items: [
        { text: "Director's salary", answer: 0 },
        { text: "Dividends from the director's company", answer: 1 },
        { text: "Sole trader's trading profits", answer: 0 },
        { text: "Interest from savings", answer: 1 },
        { text: "Taxable benefits in kind from employment", answer: 0 },
      ],
      explain: "Employment income and trading profits count; investment-type income does not.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-div",
      prompt: "Do dividends count as relevant UK earnings for personal pension relief?",
      options: ["Yes", "No", "Only above £10,000", "Only for directors"],
      answer: 1,
      explain: "Dividends are not earnings for this purpose.",
    },
    {
      kind: "mcq",
      id: "q-min",
      prompt: "If someone has no earnings, how much can they contribute with tax relief?",
      options: ["£2,880 gross", "£3,600 gross", "£10,000", "Nothing"],
      answer: 1,
      explain: "£3,600 gross (£2,880 net).",
    },
    {
      kind: "mcq",
      id: "q-family",
      prompt: "A pension for a spouse who does little work for the business is likely to be…",
      options: ["Fully deductible", "At risk of disallowance under the wholly and exclusively test", "Treated as a dividend", "Exempt from all tax"],
      answer: 1,
      explain: "It must be commercially justified for the work done.",
    },
    {
      kind: "mcq",
      id: "q-sipp",
      prompt: "Which vehicle lets a director choose their own investments and receive employer contributions?",
      options: ["NEST", "A SIPP", "A Lifetime ISA", "Premium Bonds"],
      answer: 1,
      explain: "A SIPP, among others.",
    },
    {
      kind: "mcq",
      id: "q-limit-employer",
      prompt: "The tax relief limit on employer contributions is set by…",
      options: ["Relevant UK earnings", "The annual allowance (with carry forward)", "The personal allowance", "£3,600"],
      answer: 1,
      explain: "The annual allowance (£60,000 in 2026/27) is the cap for tax-privileged inputs.",
    },
  ],
  sources: [
    { label: "Tax relief on pension contributions – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
    { label: "BIM46035 – employer pension contributions", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim46035" },
    { label: "Annual allowance – GOV.UK", url: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
    { label: "Directors and automatic enrolment (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/employers/what-if-i-dont-have-any-staff/directors-and-automatic-enrolment-do-you-have-duties" },
    { label: "Director exemptions from automatic enrolment (TPR)", url: "https://www.thepensionsregulator.gov.uk/en/business-advisers/automatic-enrolment-guide-for-business-advisers/director-exemptions-from-automatic-enrolment" },
    { label: "PIM4165 – repeal of the furnished holiday lettings rules", url: "https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim4165" },
  ],
};
