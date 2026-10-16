import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "directors-loans-dividends-and-related-parties",
  title: "Director's loan accounts, dividends and related party disclosures",
  level: "practitioner",
  minutes: 45,
  summary:
    "The year-end work on the director's loan account: reconciling it, spotting an overdrawn balance, s455 tax (35.75% for loans made on or after 6 April 2026) and the repayment and 'bed and breakfasting' rules, checking dividends against distributable reserves, and the s413 and related party disclosures small and micro companies must make.",
  objectives: [
    "Reconcile and analyse a director's loan account and identify an overdrawn balance",
    "Calculate s455 tax, applying the 9-month repayment rule and the anti-avoidance rules",
    "Check dividends against distributable reserves and correct an excessive dividend",
    "Prepare the advances to directors and related party disclosures for small and micro accounts",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **director's loan account (DLA)** records everything between the company and a director that isn't salary or expenses claims processed properly: money the director has lent the company, personal bills the company has paid, cash withdrawals, dividends credited but not drawn. In owner-managed companies it's often the single most error-prone account, and it has significant tax consequences.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "s455 tax on loans to participators (CTA 2010 s455)",
      md: `If a close company has lent money to a participator (typically a director-shareholder) and the loan is **still outstanding 9 months after the end of the accounting period**, the company pays **s455 tax** on the outstanding amount:
- **33.75%** for loans made before 6 April 2026;
- **35.75%** for loans made on or after **6 April 2026**.

s455 tax is due at the same time as the corporation tax (9 months and 1 day after the period end). It's **repayable** to the company 9 months after the end of the accounting period in which the loan is repaid, released or written off.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "'Bed and breakfasting' (CTA 2010 s464C)",
      md: `Repaying the loan just before the deadline and re-borrowing straight afterwards doesn't work:
- **30-day rule**: if repayments of **£5,000 or more** are followed within **30 days** by new loans of £5,000 or more, the repayment is matched with the new borrowing, not the old loan.
- **Arrangements rule**: where the balance is **£15,000 or more** and there were arrangements to re-borrow at the time of repayment, the repayment is ignored.

Repayments made by **dividends or bonus** (which are taxed on the director) aren't caught by these rules.`,
    },
    {
      kind: "md",
      md: `### Other consequences of an overdrawn DLA

- **Benefit in kind**: if the loan exceeds **£10,000** at any time in the tax year and interest below the official rate is charged, the director has a taxable beneficial loan benefit, and the company pays Class 1A NIC.
- **Writing it off**: if the company releases the loan, the director is taxed on it as a **distribution** (and NIC may be due if they're an employee), and the company can reclaim s455 already paid, but gets no CT deduction.
- **Unlawful distribution risk**: an overdrawn DLA cleared by a dividend the company couldn't lawfully pay just moves the problem.`,
    },
    {
      kind: "md",
      md: `### Dividends and distributable reserves at the year end

As part of the year end, check every dividend declared or paid in the year against **distributable reserves** (retained earnings after the current year's profit and tax, ignoring share premium, revaluation reserves and other capital reserves). See the company secretarial track for the paperwork and the law.

If dividends exceeded distributable reserves, a shareholder who knew or had reasonable grounds to believe the dividend was unlawful must repay the excess under CA 2006 s847. A director-shareholder of an owner-managed company will almost always be treated as knowing. The usual correction is to **reverse the excess dividend to the director's loan account**, which may then be overdrawn, with s455 consequences.`,
    },
    {
      kind: "journal",
      title: "Reversing an excess dividend of £12,000 to the DLA",
      narrative: "Dividends of £40,000 were paid but distributable reserves were only £28,000.",
      lines: [
        { account: "Director's loan account", dr: 12000 },
        { account: "Retained earnings – dividends", cr: 12000 },
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Disclosures",
      md: `**Advances, credits and guarantees to directors (CA 2006 s413)**: every company, including small and micro companies, must disclose in the notes, for each advance or credit to a director: the **amount**, the **interest rate**, the **main conditions**, and any amounts **repaid, written off or waived**. A DLA that was overdrawn at any point in the year usually triggers this, even if it's back in credit at the year end.

**Related party transactions**:
- **Full FRS 102** (Section 33): full related party disclosures, including key management personnel compensation.
- **FRS 102 Section 1A** (small): for periods beginning on or after 1 January 2026, small companies must give related party disclosures by applying paragraphs 33.9 and 33.14 (the nature of the relationship, the transactions, outstanding balances and terms), but not key management personnel compensation (33.7). Transactions between wholly owned group members are exempt.
- **FRS 105** (micro): only the s413 advances and guarantees disclosure, plus financial commitments, guarantees and contingencies.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Analyse the DLA line by line",
      md: `Don't just take the closing balance. List every entry: personal card spend, school fees, Amazon orders, cash withdrawals, salary and dividend credits. Ask the client about anything that could be business or personal. A £300 'subscription' each month may be the director's gym, not software.`,
    },
  ],
  scenario: {
    title: "Overdrawn DLA at Ellwood Interiors Ltd",
    narrative: `Ellwood Interiors Ltd (close company, year end **31 December 2026**) has one director-shareholder, Grace Ellwood. You're doing year-end planning in October 2026. The DLA shows:

| | £ |
|---|---:|
| Balance owed **to** Grace at 1 January 2026 | 6,000 Cr |
| Personal expenses paid by the company (all after 6 April 2026) | (31,000) |
| Cash withdrawals (all after 6 April 2026) | (19,000) |
| Projected balance at 31 December 2026 | **44,000 Dr** (overdrawn) |

Grace plans to repay £20,000 from her savings in June 2027, then "take it back out in July". The company has distributable reserves of about £60,000.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **The exposure.** If £44,000 is still outstanding on 30 September 2027 (9 months after the year end), s455 at **35.75%** (loans made after 6 April 2026) is £44,000 × 35.75% = **£15,730**, due 1 October 2027.
2. **Grace's plan.** Repaying £20,000 in June and re-borrowing it in July is caught by the **30-day rule** if within 30 days, and by the **arrangements rule** anyway (balance over £15,000 and she intends to re-borrow). The repayment would be ignored.
3. **Better options.**
   - **Declare a dividend** before 30 September 2027 (there are reserves of about £60,000) credited to the DLA. Dividends aren't caught by the bed and breakfasting rules. Grace pays dividend tax, so compare the cost.
   - **Bonus** through payroll (PAYE and NIC, but CT deductible).
   - Genuine **repayment** from her own funds without re-borrowing.
4. **Benefit in kind.** The loan exceeds £10,000 and no interest is charged: a beneficial loan benefit for 2026/27 and Class 1A NIC.
5. **Disclosure.** The s413 note must show the advances, the interest rate (nil), conditions and repayments.`,
      },
      {
        kind: "table",
        caption: "s455 if nothing changes vs a partial clearance",
        head: ["Scenario", "Outstanding at 30 Sept 2027", "s455 at 35.75%"],
        rows: [
          ["No action", "£44,000", "£15,730"],
          ["£30,000 dividend credited to DLA by 30 Sept 2027", "£14,000", "£5,005"],
          ["Fully cleared by dividend and genuine repayment", "£0", "£0"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "s455-calc",
      prompt:
        "A close company's year ends on 31 December 2026. Its director's loan account is overdrawn by £40,000 at the year end, all advanced after 6 April 2026. The director genuinely repays £15,000 on 31 August 2027 and doesn't re-borrow. How much s455 tax is payable?",
      answer: 8937.5,
      tolerance: 0.5,
      unit: "£",
      explain: "Only the amount outstanding 9 months after the period end (30 September 2027) is charged, at 35.75% for loans made on or after 6 April 2026.",
      working: "Outstanding: £40,000 − £15,000 = £25,000. £25,000 × 35.75% = **£8,937.50**.",
    },
    {
      kind: "mcq",
      id: "bed-breakfast",
      prompt:
        "A director with an overdrawn DLA of £22,000 repays it in full on 25 September (just before the s455 deadline) and draws £22,000 again on 10 October. What is the effect?",
      options: [
        "The repayment counts and no s455 is due",
        "The 30-day rule matches the repayment with the new loan, so the original loan is treated as still outstanding",
        "Only half is treated as repaid",
        "s455 is doubled",
      ],
      answer: 1,
      explain: "Repayments of £5,000 or more followed within 30 days by new borrowing of £5,000 or more are matched with the new loan.",
    },
    {
      kind: "journal",
      id: "excess-dividend",
      prompt:
        "During the year a company paid dividends of £50,000 to its sole director-shareholder. At the year end distributable reserves are only £35,000. The director agrees the excess must be treated as owed back to the company. Post the correction.",
      accounts: ["Director's loan account", "Retained earnings – dividends", "Share premium", "Bank", "Dividends payable", "Directors' remuneration"],
      answer: [
        { account: "Director's loan account", dr: 15000 },
        { account: "Retained earnings – dividends", cr: 15000 },
      ],
      explain: "The £15,000 excess over distributable reserves is reversed from dividends and charged to the director's loan account, which now shows the director owes the company £15,000 (with s455 and disclosure consequences).",
    },
    {
      kind: "classify",
      id: "disclosure-needed",
      prompt: "A small company prepares FRS 102 Section 1A accounts for a period beginning on 1 January 2026. Which items need disclosing in the notes?",
      categories: ["Disclose", "No disclosure required"],
      items: [
        { text: "An interest-free advance of £18,000 to a director during the year, repaid by the year end", answer: 0, why: "s413 applies to advances during the year, even if repaid." },
        { text: "Rent of £24,000 paid to the director for a property she owns personally", answer: 0, why: "A related party transaction (Section 1A applies 33.9)." },
        { text: "Total remuneration of key management personnel", answer: 1, why: "Section 1A doesn't require para 33.7." },
        { text: "Sales to a wholly owned subsidiary within the group", answer: 1, why: "Exempt for transactions between wholly owned group members." },
        { text: "A guarantee given by the company for a director's personal bank loan", answer: 0, why: "Guarantees for directors are disclosed under s413." },
      ],
      explain: "s413 covers advances, credits and guarantees for directors. For periods from 1 January 2026, Section 1A requires related party disclosures under paras 33.9 and 33.14, but not KMP compensation.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-s455-rate",
      prompt: "What is the s455 rate for a loan to a participator made on or after 6 April 2026?",
      options: ["25%", "32.5%", "33.75%", "35.75%"],
      answer: 3,
      explain: "35.75% for loans made on or after 6 April 2026 (33.75% before).",
    },
    {
      kind: "mcq",
      id: "q-s455-deadline",
      prompt: "By when must an overdrawn DLA be repaid to avoid s455 for a period ending 31 March 2027?",
      options: ["31 March 2027", "31 December 2027", "1 January 2028", "31 March 2028"],
      answer: 1,
      explain: "s455 applies to amounts outstanding 9 months after the period end: 31 December 2027.",
    },
    {
      kind: "mcq",
      id: "q-s413",
      prompt: "Does a micro-entity using FRS 105 have to disclose advances to directors?",
      options: ["No, micros disclose nothing", "Yes, s413 disclosures apply to all companies", "Only if over £10,000", "Only if audited"],
      answer: 1,
      explain: "Advances, credits and guarantees to directors must be disclosed by all companies, including micro-entities.",
    },
    {
      kind: "mcq",
      id: "q-bik-threshold",
      prompt: "Above what balance does an interest-free loan to a director become a taxable benefit in kind?",
      options: ["£5,000", "£10,000", "£15,000", "£25,000"],
      answer: 1,
      explain: "If the loan exceeds £10,000 at any time in the tax year, a beneficial loan benefit arises (unless interest at the official rate is paid).",
    },
    {
      kind: "mcq",
      id: "q-dividend-repay",
      prompt: "Is a repayment of an overdrawn DLA by crediting a lawful dividend caught by the bed and breakfasting rules?",
      options: ["Yes, always", "No: repayments by dividend or bonus taxed on the director aren't caught", "Only if over £15,000", "Only within 30 days of the year end"],
      answer: 1,
      explain: "s464C excludes repayments that give rise to an income tax charge on the participator, such as dividends or bonuses.",
    },
  ],
  sources: [
    { label: "HMRC Company Taxation manual: loans to participators (CTM61505)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505" },
    { label: "Director's loans: overview", url: "https://www.gov.uk/directors-loans" },
    { label: "Corporation Tax Act 2010 s464C – repayments and new loans (bed and breakfasting)", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/464C" },
    { label: "Companies Act 2006 s413 – advances and credits granted to directors", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/413" },
    { label: "FRC: FRS 102 (September 2024 edition, paras 1AC.35–1AC.36 small entity related party and director advance disclosures)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "HMRC Company Taxation manual: dividends, distributions and company law (CTM15205)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm15205" },
  ],
};
