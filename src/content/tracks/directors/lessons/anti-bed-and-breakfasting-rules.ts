import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "anti-bed-and-breakfasting-rules",
  title: "Anti 'bed and breakfasting': the 30-day and arrangements rules",
  level: "practitioner",
  minutes: 30,
  summary:
    "Why repaying a director's loan just before the deadline and borrowing again straight afterwards doesn't work: the 30-day rule (s464C), the arrangements rule (s464D) and the practical planning that stays on the right side of them.",
  objectives: [
    "Explain what 'bed and breakfasting' of a director's loan is and why HMRC counters it",
    "Apply the 30-day rule and its £5,000 conditions to a series of repayments and new loans",
    "Apply the arrangements rule, including the £15,000 and £5,000 conditions",
    "Calculate the amount of s455 relief denied by matching",
    "Advise on genuine ways of clearing a loan that don't fall foul of the rules",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A familiar pattern: the DLA is overdrawn at the year end. Just before the nine-month deadline the director "repays" it (often with a bonus, dividend or a short-term personal loan), and then borrows the same amount again a few days later. On paper the s455 charge has been avoided; in substance the director has had the money throughout. Parliament closed this route in 2013 with two rules in **CTA 2010 Part 10 Chapter 3A**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The 30-day rule (CTA 2010 s464C)",
      md: `The rule applies where, within any period of **30 days**:

- the participator **repays £5,000 or more** of a loan on which s455 would otherwise be (or has been) charged, **and**
- the company **makes new loans or confers benefits** on the same person (or an associate) of **£5,000 or more** in total.

The repayment is then **matched** against the new loan. Relief under s458 is denied on the **lower** of the two amounts, so s455 tax is payable on that matched sum as if the original loan hadn't been repaid.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The arrangements rule (CTA 2010 s464D)",
      md: `If the loan outstanding at the time of the repayment is **£15,000 or more**, and at that time there are **arrangements** (any understanding or scheme, formal or not) under which the participator will receive **£5,000 or more** of new loans or benefits at any time **after** the repayment, the repayment is matched with the new loans. There is **no 30-day limit**: a re-borrowing 6 months later can still be caught if it was planned.

"Arrangements" isn't defined and has a wide meaning. Evidence of intention (emails, a pattern of repay-and-redraw each year end, a banking agreement) is what HMRC looks for.`,
    },
    {
      kind: "md",
      md: `### What counts as a "repayment"

Anything that discharges the debt: a cash payment, crediting a **dividend** or **bonus** to the DLA, a **set-off** against a credit loan, or a **release**. The rules apply whatever the method. Both rules also apply to **benefits** (s464A), not only loans.

### What the rules *don't* touch

- Repayments or new loans **below £5,000**. (Both rules need a £5,000 floor; the 30-day rule needs both legs at £5,000 or more.)
- **Genuine** repayments from the director's own resources with no arrangement to re-borrow and no new loan in the following 30 days.
- A new loan taken **after** the 30 days where there was **no** pre-arranged plan, and the loan outstanding was below £15,000 at repayment.
- Ordinary **expenses** and **salary/dividends** properly paid.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't claim relief you aren't entitled to",
      md: `Where matching applies, the repayment gives **no s458 relief** to the extent matched, so the s455 tax on the original loan stays payable. Don't put the full repayment on the CT600A relief claim and hope HMRC won't notice: the matched amount must be excluded. The detailed mechanics of how the matched repayment is then treated against the new loan are in CTM61615 onwards; read them before completing a CT600A where matching arises.`,
    },
    {
      kind: "table",
      caption: "Quick tests",
      head: ["Facts", "Matched?", "Why"],
      rows: [
        ["Repay £60,000 on 20 Dec; borrow £60,000 on 5 Jan (16 days later)", "Yes: £60,000", "Both £5,000+ within 30 days"],
        ["Repay £60,000; borrow £4,000 within 30 days", "No", "New loan is below £5,000"],
        ["Repay £12,000; borrow £8,000 within 30 days", "Yes: £8,000", "Both £5,000+; matched amount is the lower"],
        ["Repay £20,000 on 20 Dec; planned loan of £20,000 in March, recorded in an email", "Yes (arrangements)", "Loan outstanding £15,000+ at repayment and a pre-arranged £5,000+ loan"],
        ["Repay £10,000; no plan; borrow £10,000 five months later", "Probably not", "Outside 30 days, below £15,000 outstanding, no arrangements"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Genuine alternatives to advise",
      md: `1. **Real repayment** funded by something other than a new loan (savings, sale proceeds, a personal loan from a bank).
2. A properly **declared dividend** (if reserves allow) or **bonus through payroll**, with no planned re-borrowing, accepting the tax cost.
3. **Reduce the loan in stages** and stop drawing money against it.
4. Move to a **pay structure** that gives the director cash without borrowing, such as a regular salary and dividends, or director's pension contributions.
5. If the loan is long-term and needed, consider a **formal loan** with a **commercial interest rate**, and budget for the **s455 cost** and **benefit in kind** rather than trying to avoid them.`,
    },
  ],
  scenario: {
    title: "Ashdown Fabrication Ltd: the 'year-end shuffle'",
    narrative: `Ashdown Fabrication Ltd (year end 31 March 2027) lent its director Karim Ashdown £60,000 over the year. On 20 December 2027, just before the s455 deadline, Karim paid £60,000 into the company from a short-term personal bank overdraft. On 5 January 2028 the company paid him £60,000 again as "a loan for a house deposit". He asks: *"Has the 35.75% charge gone away?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the 30-day rule.** Repayment of £60,000 on 20 Dec 2027; new loan of £60,000 on 5 Jan 2028, 16 days later. Both are over £5,000 and within 30 days. The repayment is **matched in full**: £60,000.

**Step 2: tax.** s455 at 35.75% on the loan made in 2026/27: £60,000 × 35.75% = **£21,450**, still payable on **1 January 2028** as if no repayment had occurred. (The loan was made during the year to 31 March 2027 at the rate then in force: it was made after 6 April 2026, so 35.75%.)

**Step 3: what to tell the client.** The charge has not gone. It must be shown on the CT600A for the year to 31 March 2027. If Karim wishes to clear it properly he must repay **and not borrow again** within 30 days, and with no plan to do so. If he can't repay from his own resources, a **bonus or dividend** is the other route.

**Step 4: document it.** Record the facts and advice in a file note, and show the matching on the CT600A. If HMRC later ask, the file shows you identified the rule and advised on it.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "matched-amount",
      prompt: "A director repays £30,000 of an overdrawn loan on 10 December. On 22 December the company advances him a new £12,000. Using the 30-day rule, how much of the repayment is matched (£)?",
      answer: 12000,
      unit: "£",
      explain: "Both amounts exceed £5,000 and fall within 30 days; the matched amount is the lower of the repayment and the new loans.",
      working: "Lower of £30,000 and £12,000 = **£12,000**.",
    },
    {
      kind: "numeric",
      id: "s455-on-matched",
      prompt: "Using the facts above (35.75% rate), what is the s455 relief denied on the matched £12,000 (£)?",
      answer: 4290,
      unit: "£",
      explain: "The matched sum is treated as still outstanding, so s455 stays payable on it.",
      working: "£12,000 × 35.75% = **£4,290**.",
    },
    {
      kind: "classify",
      id: "classify-bnb",
      prompt: "Is the repayment likely to be matched (relief denied)?",
      categories: ["Matched", "Not matched"],
      items: [
        { text: "£25,000 repaid on 15 Dec; new £25,000 loan on 3 January", answer: 0 },
        { text: "£25,000 repaid; new loan of £3,000 ten days later", answer: 1, why: "Below the £5,000 new-loan floor." },
        { text: "£18,000 owed; repaid on 1 Dec; the director had emailed the accountant that he would 'redraw £6,000 in March'", answer: 0, why: "Loan outstanding £15,000+ and a pre-arranged £5,000+ loan: arrangements rule." },
        { text: "£4,000 repaid; new £20,000 loan the next week", answer: 1, why: "The repayment is below £5,000." },
      ],
      explain: "Check each leg against £5,000 and then the 30-day window or arrangements.",
    },
    {
      kind: "mcq",
      id: "mcq-arrangements-threshold",
      prompt: "The arrangements rule applies only if the amount owed at the time of repayment is at least…",
      options: ["£5,000", "£10,000", "£15,000", "£25,000"],
      answer: 2,
      explain: "s464D needs a balance of £15,000 or more outstanding and arrangements for £5,000 or more of new loans or benefits.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-meaning",
      prompt: "'Bed and breakfasting' of a director's loan means…",
      options: ["Reimbursing hotel costs", "Repaying a loan then borrowing again to avoid s455", "Putting the loan on the balance sheet overnight", "Charging interest"],
      answer: 1,
      explain: "It describes short-term repayment followed by re-borrowing to avoid the charge.",
    },
    {
      kind: "mcq",
      id: "q-days",
      prompt: "Within how many days must the new loan be made for the 30-day rule to apply?",
      options: ["14", "30", "60", "90"],
      answer: 1,
      explain: "It applies within any 30-day period.",
    },
    {
      kind: "mcq",
      id: "q-floor",
      prompt: "What minimum amounts must both the repayment and the new loan reach for the 30-day rule?",
      options: ["£1,000", "£5,000", "£10,000", "£15,000"],
      answer: 1,
      explain: "Both must be at least £5,000.",
    },
    {
      kind: "mcq",
      id: "q-time-limit-arr",
      prompt: "Is there a 30-day limit on the arrangements rule?",
      options: ["Yes", "No: it applies whenever the new loan was planned at the time of repayment", "Only 90 days", "Only if over £50,000"],
      answer: 1,
      explain: "The test is the arrangements, not the time gap.",
    },
    {
      kind: "mcq",
      id: "q-set-off",
      prompt: "A dividend credited to a director's overdrawn loan account is…",
      options: ["Not a repayment", "A repayment that can still be matched if the director borrows again", "A deduction for CT", "Always protected"],
      answer: 1,
      explain: "The method of repayment doesn't matter. The matching rules apply to any discharge of the debt.",
    },
    {
      kind: "mcq",
      id: "q-practice",
      prompt: "A client asks how to avoid the charge by repaying before the deadline and redrawing in January. Your response?",
      options: ["Agree: it works", "Explain the rules and the genuine alternatives", "Say nothing", "Redraw it yourself"],
      answer: 1,
      explain: "Your duty is to give accurate advice on the rules and genuine options.",
    },
  ],
  sources: [
    { label: "CTM61615 – repayment of loans: B&B general", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61615" },
    { label: "CTM61635 – B&B arrangements rule", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61635" },
    { label: "CTA 2010 s464C – 30 day rule", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/464C" },
    { label: "CTA 2010 s464D – arrangements rule", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/464D" },
  ],
};
