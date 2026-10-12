import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "high-income-child-benefit-charge",
  title: "The High Income Child Benefit Charge",
  level: "practitioner",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "When a household gets Child Benefit and either partner's adjusted net income is over £60,000, the higher earner repays some or all of it through the High Income Child Benefit Charge. Who pays, how the charge is worked out, paying it through PAYE or Self Assessment, opting out, and how pension contributions and Gift Aid can reduce or remove it.",
  objectives: [
    "Identify who is liable to the HICBC in a household",
    "Calculate the charge from adjusted net income and the Child Benefit received",
    "Explain the options for paying it, and for opting out of Child Benefit payments without losing NI credits",
    "Use pension contributions and Gift Aid to reduce or remove the charge",
  ],
  body: [
    {
      kind: "md",
      md: `**Child Benefit** is paid to the person responsible for a child, whatever their income. The **High Income Child Benefit Charge (HICBC)** (ITEPA 2003 Part 10 Chapter 8) claws it back through the tax system if anyone in the household has high income. For 2026/27 the weekly rates are **£27.05** for the eldest or only child and **£17.90** for each additional child.

The charge depends on **adjusted net income (ANI)**: net income less **gross** Gift Aid donations and **gross** relief-at-source pension contributions, the same measure used for the personal allowance taper.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How the charge works (from 2024/25)",
      md: `- **ANI of £60,000 or less:** no charge.
- **ANI between £60,000 and £80,000:** charge = **1% of the Child Benefit for each complete £200** of ANI above £60,000.
- **ANI of £80,000 or more:** charge = **100%** of the Child Benefit.

The person liable is whichever of the two partners has the **higher ANI**, even if it's the other partner who receives the Child Benefit. A "partner" is a spouse or civil partner, or someone the claimant lives with as if they were married. The charge applies to Child Benefit received for the weeks in the tax year when the couple were partners.

(Before 2024/25 the threshold was £50,000 and the rate was 1% for each £100. Use the old rules for earlier years' returns.)`,
    },
    {
      kind: "table",
      caption: "Examples with Child Benefit of £2,300 for the year",
      head: ["Higher earner's ANI", "Excess over £60,000", "Percentage", "Charge"],
      rows: [
        ["£58,000", "—", "0%", "£0"],
        ["£64,000", "£4,000", "20%", "£460"],
        ["£70,000", "£10,000", "50%", "£1,150"],
        ["£79,000", "£19,000", "95%", "£2,185"],
        ["£85,000", "over £20,000", "100%", "£2,300"],
      ],
    },
    {
      kind: "md",
      md: `### Paying the charge

- **Self Assessment:** the charge goes on the higher earner's return. A person liable to the charge who isn't otherwise in Self Assessment must register (by **5 October** after the tax year), unless they pay through PAYE.
- **Through PAYE:** employees whose only reason for filing would be the HICBC can now ask HMRC to collect it through their **tax code**, using HMRC's online service. Anyone who files a return for another reason still reports it there.

### Opting out

The claimant can tell HMRC to **stop the payments** while keeping the Child Benefit **claim** open. This avoids the charge altogether, but it still:
- protects the claimant's **National Insurance credits** (important for a non-working or low-earning parent's state pension, if the child is under 12),
- makes sure the child gets an **NI number** automatically at 16.

Never advise a family not to **claim** at all. A parent who stays at home loses NI credits if no claim is made. If income falls later, payments can be restarted.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pension contributions are the main planning tool",
      md: `Between £60,000 and £80,000, every £200 of ANI costs 1% of the Child Benefit on top of 40% income tax. For a family with two children, the effective marginal rate in this band is **over 50%**. A relief-at-source pension contribution (or salary sacrifice) that brings ANI down to £60,000 removes the charge **and** gets higher rate relief. Gift Aid works the same way.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Check who earns more, every year",
      md: `HMRC sends nudge letters when it spots high-income partners in households where Child Benefit is claimed. It's the **higher earner** who's liable, not necessarily your client. At each tax return, ask whether any Child Benefit is received in the household and what the partner's income is. Unreported HICBC is a failure to notify and can bring penalties.`,
    },
  ],
  scenario: {
    title: "Should Lewis make a pension contribution?",
    narrative: `Lewis is a self-employed electrician in Nottingham with taxable trading profit of **£68,400** for 2026/27. He has no other income. His partner, Amira, works part-time on £24,000 and claims Child Benefit for their two children. She received **£2,300** for the year.

Lewis asks: *"Someone told me I have to pay some of the Child Benefit back. How much, and can I do anything about it?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: who is liable?** Lewis's ANI (£68,400) is higher than Amira's (£24,000), so **Lewis** pays the charge, even though Amira receives the benefit.

**Step 2: the charge.** Excess: £68,400 − £60,000 = £8,400. £8,400 ÷ £200 = **42** complete £200s, so 42%. Charge: 42% × £2,300 = **£966**.

**Step 3: the pension option.** If Lewis pays **£6,720 net** (£8,400 gross) into a relief-at-source personal pension before 5 April 2027:
- his ANI falls to £60,000, so the **HICBC is nil** (saving £966),
- his basic rate band is extended by £8,400, which moves £8,400 of profit from 40% to 20% (saving £1,680 on his return),
- the pension provider adds £1,680 of basic rate relief to his pot.`,
      },
      {
        kind: "table",
        caption: "Effect of an £8,400 gross pension contribution",
        head: ["", "£"],
        rows: [
          ["Net cost to Lewis", "6,720"],
          ["Higher rate relief through his return (20% × £8,400)", "(1,680)"],
          ["HICBC saved", "(966)"],
          ["**Real cost of £8,400 going into his pension**", "**4,074**"],
        ],
      },
      {
        kind: "md",
        md: `That's an effective relief rate of about **51.5%** (£4,326 of the £8,400). The contribution is within his relevant earnings and the annual allowance. His Class 4 NIC isn't affected, because pension contributions don't reduce trading profit.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "hicbc-basic",
      prompt:
        "Sana's adjusted net income for 2026/27 is £71,200. Her husband earns £35,000. They received Child Benefit of £1,400 for the year. What HICBC is due, and from whom? Enter the amount.",
      answer: 784,
      unit: "£",
      explain: "Sana has the higher ANI, so she's liable. The percentage is 1% for each complete £200 above £60,000.",
      working: "Excess: £71,200 − £60,000 = £11,200. £11,200 ÷ £200 = 56, so 56%. Charge: 56% × £1,400 = **£784**, payable by Sana.",
    },
    {
      kind: "numeric",
      id: "hicbc-with-gift-aid",
      prompt:
        "Ben has employment income of £66,000. He pays £2,400 to charity under Gift Aid and has no pension contributions. His household received Child Benefit of £2,300, and he's the higher earner. What is his HICBC?",
      answer: 345,
      unit: "£",
      explain: "ANI is reduced by the gross Gift Aid donation before the charge is worked out. Using the net donation, or ignoring it, overstates the charge.",
      working: "Gross Gift Aid: £2,400 × 100/80 = £3,000. ANI: £66,000 − £3,000 = £63,000. Excess: £3,000 ÷ £200 = 15, so 15%. Charge: 15% × £2,300 = **£345** (compared with £690 if the Gift Aid were ignored).",
    },
    {
      kind: "numeric",
      id: "contribution-needed",
      prompt:
        "Chloe's adjusted net income is £74,000, and she's the higher earner in a household receiving Child Benefit. What **net** relief-at-source pension contribution would remove her HICBC completely?",
      answer: 11200,
      unit: "£",
      explain: "ANI must fall to £60,000. ANI is reduced by the gross contribution, and the member pays 80% of the gross.",
      working: "Gross needed: £74,000 − £60,000 = £14,000. Net: £14,000 × 80% = **£11,200**.",
    },
    {
      kind: "mcq",
      id: "who-pays",
      prompt: "Rob and Tess live together unmarried. Tess claims Child Benefit and has ANI of £62,000. Rob's ANI is £81,000. Who is liable to the HICBC, and how much?",
      options: ["Tess, 10% of the benefit", "Rob, 100% of the benefit", "Neither: they aren't married", "Both, split equally"],
      answer: 1,
      explain: "Partners include couples living together as if married. The partner with the higher ANI (Rob) is liable, and at £80,000 or more the charge is 100%.",
    },
    {
      kind: "mcq",
      id: "opt-out",
      prompt: "A family's higher earner has ANI of £95,000. The other parent stays at home with their 2-year-old. What's the best advice?",
      options: [
        "Don't claim Child Benefit at all",
        "Claim Child Benefit but opt out of receiving the payments",
        "Claim and keep the payments: there's no charge",
        "Claim in the higher earner's name",
      ],
      answer: 1,
      explain: "The charge would be 100%, so opting out of payments avoids it. But the claim should still be made, so the stay-at-home parent gets NI credits and the child gets an NI number at 16.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "Above what level of adjusted net income does the HICBC start for 2026/27?",
      options: ["£50,000", "£60,000", "£80,000", "£100,000"],
      answer: 1,
      explain: "The threshold has been £60,000 since 2024/25. The charge reaches 100% at £80,000.",
    },
    {
      kind: "mcq",
      id: "q-rate",
      prompt: "How fast does the charge build up between £60,000 and £80,000?",
      options: ["1% for every £100", "1% for every £200", "2% for every £1,000", "50% at £60,000"],
      answer: 1,
      explain: "From 2024/25 the charge is 1% of the Child Benefit for every £200 of ANI over £60,000.",
    },
    {
      kind: "mcq",
      id: "q-measure",
      prompt: "Which income measure is used for the HICBC?",
      options: ["Taxable income", "Gross salary", "Adjusted net income", "Household income"],
      answer: 2,
      explain: "It's each partner's own adjusted net income, not household income.",
    },
    {
      kind: "mcq",
      id: "q-paye",
      prompt: "An employee with no other reason to file a return becomes liable to the HICBC. How can they pay it?",
      options: ["Only through Self Assessment", "Through their PAYE tax code, by asking HMRC", "By reducing their partner's Child Benefit", "It's deducted from the Child Benefit automatically"],
      answer: 1,
      explain: "HMRC now lets employees pay the HICBC through their tax code instead of registering for Self Assessment.",
    },
    {
      kind: "mcq",
      id: "q-weekly",
      prompt: "What is the 2026/27 weekly rate of Child Benefit for an eldest or only child?",
      options: ["£25.60", "£26.05", "£27.05", "£17.90"],
      answer: 2,
      explain: "£27.05 for the eldest or only child, and £17.90 for each additional child.",
    },
  ],
  sources: [
    { label: "High Income Child Benefit Charge (GOV.UK)", url: "https://www.gov.uk/child-benefit-tax-charge" },
    { label: "Child Benefit rates", url: "https://www.gov.uk/child-benefit-rates" },
    { label: "PAYE14015 – coding adjustments to collect the HICBC", url: "https://www.gov.uk/hmrc-internal-manuals/paye-manual/paye14015" },
    { label: "The High Income Child Benefit Charge threshold (policy paper)", url: "https://www.gov.uk/government/publications/income-tax-increasing-the-high-income-child-benefit-charge-threshold/the-high-income-child-benefit-charge-threshold" },
    { label: "ITEPA 2003 s681C – amount of the charge", url: "https://www.legislation.gov.uk/ukpga/2003/1/section/681C" },
  ],
};
