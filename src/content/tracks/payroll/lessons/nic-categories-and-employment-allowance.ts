import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "nic-categories-and-employment-allowance",
  title: "NIC category letters and the Employment Allowance",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "Choosing the right NIC category letter — under-21s, apprentices, veterans, people over State Pension age, deferment, freeports and investment zones — and checking whether a client can claim the £10,500 Employment Allowance.",
  objectives: [
    "Assign the correct NIC category letter from an employee's age and circumstances",
    "Calculate employer NIC for categories M, H and V using the upper secondary thresholds",
    "Apply the Employment Allowance eligibility rules, including connected companies and the sole-director rule",
    "Work out a client's net employer NIC after the Employment Allowance",
  ],
  body: [
    {
      kind: "md",
      md: `Every employee on the payroll has a **NIC category letter**. It tells the software which rates of employee and employer NIC to use. Most employees are **A**, but getting the others right saves clients real money (under-21s and apprentices can cost no employer NIC at all up to £50,270 a year) and avoids underpaying NIC for someone wrongly put on a reduced rate.`,
    },
    {
      kind: "table",
      caption: "The category letters you'll use most (2026/27)",
      head: ["Letter", "Who", "Employee NIC", "Employer NIC"],
      rows: [
        ["A", "Most employees", "8% PT–UEL, 2% above", "15% above ST (£5,000)"],
        ["M", "Under 21", "Same as A", "0% up to the UST (£50,270), 15% above"],
        ["H", "Apprentice under 25 on an approved apprenticeship", "Same as A", "0% up to the AUST (£50,270), 15% above"],
        ["V", "Veteran in their first 12 months of civilian employment since leaving the armed forces", "Same as A", "0% up to the VUST (£50,270), 15% above"],
        ["C", "Over State Pension age", "None", "15% above ST, as for A"],
        ["B", "Married woman or widow with a valid reduced-rate election (pre-1977)", "1.85% PT–UEL, 2% above", "As for A"],
        ["J", "Deferment: already paying maximum NIC in another job (HMRC authorises)", "2% above PT", "As for A"],
        ["Z", "Under 21 with deferment", "2% above PT", "As for M"],
        ["F, I, L, S", "Freeport employees (eligible employer, special tax site)", "Varies by letter", "0% up to the FUST (£25,000), 15% above"],
        ["N, E, D, K", "Investment zone employees", "Varies by letter", "0% up to the IZ UST (£25,000), 15% above"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How the upper secondary thresholds work",
      md: `For categories **M, H and V** the employer pays **0%** on earnings up to the relevant upper secondary threshold, **£50,270 a year (£4,189 a month, £967 a week)** for 2026/27, and **15%** above it. The employee's own NIC is unchanged.

So an 18-year-old on £24,000 costs the employer **no NIC** at all; on category A the same person would cost (£24,000 − £5,000) × 15% = £2,850.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Change the letter when circumstances change",
      md: `Software can change some letters automatically from date of birth (M to A on the 21st birthday, A to C at State Pension age), but **only if the date of birth is right**. Others need action: H stops when the apprenticeship ends or at 25, V stops after the first 12 months of civilian employment, and J needs HMRC's deferment authority. Using M or H when it no longer applies underpays employer NIC, which HMRC will recover with interest.`,
    },
    {
      kind: "md",
      md: `### Employment Allowance

The **Employment Allowance (EA)** reduces an employer's **secondary Class 1 NIC** bill by up to **£10,500** for 2026/27. Since April 2025 there's no upper limit on the size of the employer: employers with Class 1 NIC liabilities over £100,000 can now claim too.

**Who can claim:** businesses and charities (including community amateur sports clubs), and individuals employing a care or support worker.

**Who can't:**
- A company whose **only** employee paid above the secondary threshold is a **director** (the "sole director" rule).
- Employers doing **more than half their work in the public sector** (unless a charity).
- Pay for household staff such as nannies or gardeners (unless care or support workers).
- Earnings of workers caught by the **off-payroll working rules** (IR35) don't count towards it.

**Connected companies** (e.g. companies under common control) get **one** allowance between them, and only one company in the group claims. The allowance can only be claimed against **one PAYE scheme**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Claiming",
      md: `Claim on the **EPS** by setting the Employment Allowance indicator to "Yes". The allowance is used against employer Class 1 NIC as each month's liability arises until the £10,500 is used up. It doesn't cover **Class 1A or 1B** NIC. If the employer stops being eligible during the year, send an EPS with "No".

Claims for previous years (up to 4 years back) involve a state aid declaration, because for earlier years EA counted as de minimis state aid for some sectors.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The sole-director trap",
      md: `For a one-director company where the director is the only person paid above £5,000, EA isn't available, which is one reason director salaries are often set at or near the secondary threshold. **But** if a second person (even the director's spouse working genuinely in the business) is paid above the secondary threshold, the rule no longer bites. See the *Directors, DLA & profit extraction* track for salary planning.`,
    },
  ],
  scenario: {
    title: "Staff costs at Riverside Bistro Ltd",
    narrative: `**Riverside Bistro Ltd** in Shrewsbury has just taken over a second site and asks you to re-run its employer NIC budget for 2026/27. All staff are paid monthly. The two directors (Ali and Grace) each take £12,570 a year.

| Employee | Age / status | Annual pay |
|---|---|---|
| Kai | 19, kitchen porter | £22,000 |
| Bethan | 23, chef on an approved level 3 apprenticeship | £21,000 |
| Rob | 68, part-time host (over State Pension age) | £14,000 |
| Simone | 30, restaurant manager | £34,000 |
| Ali and Grace | Directors | £12,570 each |

Ali also owns 100% of **Riverside Catering Supplies Ltd**, which has its own payroll and already claims Employment Allowance.`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Category letters.** Kai: **M** (under 21). Bethan: **H** (apprentice under 25). Rob: **C** (over State Pension age: no employee NIC, but the employer still pays). Simone: **A**. Directors: **A** (with the director flag set).

**2. Employer NIC for each.**`,
      },
      {
        kind: "table",
        caption: "Annual employer NIC before Employment Allowance",
        head: ["Employee", "Letter", "Working", "Employer NIC"],
        rows: [
          ["Kai", "M", "Below £50,270 UST", "£0.00"],
          ["Bethan", "H", "Below £50,270 AUST", "£0.00"],
          ["Rob", "C", "(£14,000 − £5,000) × 15%", "£1,350.00"],
          ["Simone", "A", "(£34,000 − £5,000) × 15%", "£4,350.00"],
          ["Ali", "A", "(£12,570 − £5,000) × 15%", "£1,135.50"],
          ["Grace", "A", "(£12,570 − £5,000) × 15%", "£1,135.50"],
          ["**Total**", "", "", "**£7,971.00**"],
        ],
      },
      {
        kind: "md",
        md: `**3. Employment Allowance.** The bistro and the catering company are both controlled by Ali, so they're **connected**: only **one** £10,500 allowance between them. The catering company already claims it, so the bistro **can't** also claim unless the group switches the claim to the bistro (for example, if the bistro has the bigger employer NIC bill).

**4. Advice.** The bistro's employer NIC is £7,971. The group should claim EA in whichever company uses it best. If the catering company's employer NIC is less than £10,500, part of the allowance is wasted there, so compare the two before next April. The M and H letters are worth £2,550 (Kai) + £2,400 (Bethan) = £4,950 a year compared with category A, so make sure the dates of birth and the apprenticeship agreement are on file.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "under-21-high-earner",
      prompt:
        "A 20-year-old software developer (category M) is paid £4,500 in a month in 2026/27. What is the **employer** NIC for that month?",
      answer: 46.65,
      tolerance: 0.01,
      unit: "£",
      explain: "For category M the employer pays 0% up to the monthly UST of £4,189 and 15% above it.",
      working: "(£4,500 − £4,189) × 15% = £311 × 15% = **£46.65**",
    },
    {
      kind: "numeric",
      id: "over-spa-employer",
      prompt:
        "An employee over State Pension age (category C) earns £1,600 in a month. What is the **total** Class 1 NIC (employee plus employer) for the month?",
      answer: 177.45,
      tolerance: 0.01,
      unit: "£",
      explain: "No employee NIC is due over State Pension age, but employer NIC is due as normal at 15% above the £417 monthly secondary threshold.",
      working: "Employee: £0\n\nEmployer: (£1,600 − £417) × 15% = £1,183 × 15% = **£177.45**",
    },
    {
      kind: "numeric",
      id: "net-after-ea",
      prompt:
        "A design agency (not connected to any other company, no public-sector work) has five employees, all category A, each paid £22,000 a year in 2026/27. What is its employer NIC for the year **after** Employment Allowance?",
      answer: 2250,
      unit: "£",
      explain: "Work out employer NIC per employee, total it, then deduct the £10,500 allowance.",
      working: "Each: (£22,000 − £5,000) × 15% = £2,550\n\n× 5 = £12,750\n\nLess EA £10,500 = **£2,250**",
    },
    {
      kind: "classify",
      id: "ea-eligible",
      prompt: "Can each employer claim Employment Allowance for 2026/27?",
      categories: ["Can claim", "Can't claim"],
      items: [
        { text: "One-director company; the director is the only employee and earns £30,000", answer: 1, why: "Sole director is the only employee paid above the secondary threshold." },
        { text: "Plumbing company with a director and one apprentice earning £18,000", answer: 0 },
        { text: "Private contractor doing 70% of its work for the NHS", answer: 1, why: "More than half its work is in the public sector." },
        { text: "Large retailer with employer NIC of £400,000 a year", answer: 0, why: "The £100,000 limit was removed from April 2025." },
        { text: "Individual employing a nanny for their children", answer: 1, why: "Household staff don't qualify unless they're care or support workers." },
        { text: "Local charity employing two staff", answer: 0 },
      ],
      explain:
        "EA is now available to employers of any size, but not to sole-director-only companies, mainly public-sector employers, or for domestic staff.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ea-amount",
      prompt: "What is the maximum Employment Allowance for 2026/27?",
      options: ["£5,000", "£9,100", "£10,500", "£12,570"],
      answer: 2,
      explain: "£10,500 per employer (or per connected group).",
    },
    {
      kind: "mcq",
      id: "q-letter-c",
      prompt: "Which is true of category C (over State Pension age)?",
      options: [
        "Neither employee nor employer NIC is due",
        "Employee NIC stops; employer NIC continues",
        "Employer NIC stops; employee NIC continues",
        "Both pay at reduced rates",
      ],
      answer: 1,
      explain: "Employees over State Pension age stop paying primary NIC, but secondary (employer) NIC continues.",
    },
    {
      kind: "mcq",
      id: "q-ust",
      prompt: "Up to what annual level of earnings does an employer pay 0% NIC for an under-21 in 2026/27?",
      options: ["£5,000", "£12,570", "£25,000", "£50,270"],
      answer: 3,
      explain: "The upper secondary threshold for under-21s is £50,270 a year.",
    },
    {
      kind: "mcq",
      id: "q-ea-class1a",
      prompt: "Can Employment Allowance be used against Class 1A NIC on benefits in kind?",
      options: ["Yes, always", "No, only against secondary Class 1 NIC", "Only for small employers", "Only if claimed on the P11D(b)"],
      answer: 1,
      explain: "EA reduces secondary Class 1 NIC only.",
    },
    {
      kind: "mcq",
      id: "q-connected",
      prompt: "Two companies are controlled by the same person. How many Employment Allowances can they claim?",
      options: ["One each", "One between them", "None", "Two, if both have employees"],
      answer: 1,
      explain: "Connected companies share one allowance, claimed by one of them.",
    },
    {
      kind: "mcq",
      id: "q-letter-h",
      prompt: "A 26-year-old starts an approved apprenticeship. Which category letter applies?",
      options: ["H", "M", "A", "V"],
      answer: 2,
      explain: "Category H is for apprentices under 25. A 26-year-old apprentice is category A (unless another letter applies).",
    },
  ],
  sources: [
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "National Insurance category letters (GOV.UK)", url: "https://www.gov.uk/national-insurance-rates-letters" },
    { label: "Employment Allowance: eligibility (GOV.UK)", url: "https://www.gov.uk/claim-employment-allowance/eligibility" },
    { label: "Employment Allowance: how to claim (GOV.UK)", url: "https://www.gov.uk/claim-employment-allowance/how-to-claim" },
    { label: "PAYE70223: NIC relief for employers who hire veterans", url: "https://www.gov.uk/hmrc-internal-manuals/paye-manual/paye70223" },
  ],
};
