import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "advising-contractors-practical-options",
  title: "Advising contractor clients: comparing the options in 2026/27",
  level: "advanced",
  minutes: 40,
  summary:
    "A practical framework for advising a contractor client when an engagement is, or may be, inside IR35: comparing outside-IR35, inside-IR35 and umbrella outcomes with real figures, what to put in the engagement file, how to talk to the client, and the traps to avoid.",
  objectives: [
    "Compare take-home pay for a contractor under three structures using 2026/27 rates",
    "Explain how the 2025 and 2026 rate changes have narrowed the gap between inside and outside IR35",
    "Advise on contract and practice changes that are genuine, and on those that are not",
    "Structure an advice letter and file note for a contractor client",
    "Identify the compliance diary for a contractor with mixed engagements",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Contractors usually ask the same question: *"What does it cost me if the engagement is inside IR35, and what can I do about it?"* A sound answer has four parts: (1) the **status** analysis, (2) the **numbers** under each structure, (3) **practical options** that are genuine, and (4) a **written record** of the advice. The rate changes since April 2025 (employer NIC at 15% from a £5,000 threshold, and dividend rates up by 2 percentage points from April 2026) have reduced, but not removed, the advantage of working outside IR35 through a company.`,
    },
    {
      kind: "table",
      caption: "Illustrative take-home at £84,000 annual fees excluding VAT (2026/27, England; annual basis; assumptions below)",
      head: ["", "Outside IR35 (PSC)", "Inside IR35: rate unchanged (client pays employer NIC on top)", "Inside IR35: rate cut so the client's total cost is unchanged"],
      rows: [
        ["Amount treated as earnings / paid to the PSC", "£84,000 fees; £3,000 costs; salary £12,570", "£84,000 deemed direct payment", "£73,695.65 deemed direct payment"],
        ["Employer NIC", "£1,135.50 on the salary (paid by the PSC)", "£11,850.00 (paid by the fee-payer on top)", "£10,304.35 (paid by the fee-payer; included in the client's £84,000 cost)"],
        ["Corporation tax", "£14,083.04 (marginal relief applies between £50,000 and £250,000)", "None for the worker's company on this income", "None"],
        ["Income tax on pay or dividends", "£9,544.35 dividend tax", "£21,032.00", "£16,910.26"],
        ["Employee NIC", "Nil on £12,570 salary", "£3,690.60", "£3,484.51"],
        ["**Worker's net income**", "**£56,237.11**", "**£59,277.40**", "**£53,300.88**"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Read the table carefully",
      md: `The "rate unchanged" column looks attractive only because the **fee-payer bears a further £11,850** of employer NIC. In practice clients and agencies usually reduce the rate to cover it (the third column), which leaves the worker about **£2,900 a year worse off** than outside IR35 on these assumptions. These figures assume: England rates; £3,000 of allowable PSC costs; salary at £12,570 with employer NIC of £1,135.50 and no Employment Allowance; no other income; full distribution of post-tax profit as dividends; and annual earnings periods. **Change any of those and the answer moves**, so always run the client's real numbers.`,
    },
    {
      kind: "md",
      md: `### What the client can genuinely change

If the client wants to be **outside** IR35, the way forward is to change the **real engagement**, not just the paper:

- **Deliverables, not hours:** a defined project with milestones, rather than open-ended day-for-day work.
- **Control:** the contractor decides how and when the work is done and isn't managed day to day or in the client's team structure.
- **Substitution:** a genuine right to send a suitably skilled substitute, **used or at least realistic**, with the contractor paying them.
- **Financial risk:** fixed price, own insurance, correcting defects at own cost.
- **Own equipment and workplace** where appropriate.
- **Other clients:** a real business that serves several customers.

If these aren't genuinely possible, the engagement may well be inside IR35, and the options are: **accept it** (fee-payer deducts tax and NIC), **renegotiate** the rate, **move to an umbrella** (for some, simplicity and employment rights), or **end** the engagement.

### Compliance diary for a contractor with several engagements

- **At each new engagement:** check client size and status, obtain the SDS (Chapter 10) or carry out your own assessment (Chapter 8) and save the evidence.
- **At each material change:** re-run the assessment.
- **Quarterly:** reconcile fee-payer statements with receipts so the PSC doesn't tax Chapter 10 income again.
- **Year-end:** compute any Chapter 8 deemed payment and plan the PAYE/NIC payment; review dividends in the light of the deemed payment.
- **Annually:** review pension, expenses, insurance (including any contractor liability or "IR35 protection" cover) and the company's size and VAT position.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "The advice letter",
      md: `1. **Summary** of the conclusion and the key numbers.
2. **Facts relied on** and what you haven't verified.
3. **Analysis** against the tests.
4. **Options**, with costs and risks, including doing nothing.
5. **Actions and dates**: what the client must do and by when.
6. **Limits** of the advice (it depends on the facts staying the same) and a **review date**.`,
    },
  ],
  scenario: {
    title: "Advising Aiden Cole before his contract renewal",
    narrative: `Aiden Cole is a developer who bills **£84,000 a year** (excluding VAT) through his PSC, Cole Digital Ltd, to Tallis Bank plc, a large client. Tallis's determination for the renewal is **inside IR35**. Aiden has no other income, has £3,000 of annual company costs, and pays himself £12,570 salary plus dividends. Tallis offers either (a) continue at £84,000 with fee-payer deductions and Tallis bearing the employer NIC, or (b) a rate cut so that Tallis's total cost stays at £84,000. Aiden asks what to do.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the status.** Ask for Tallis's SDS reasons. Does the analysis reflect Aiden's real working practices? Aiden works in Tallis's team and is managed day to day, uses Tallis's equipment and has no realistic substitution: the determination looks sound. If he disagrees, he can use the **45-day** process, but the facts favour Tallis.

**Step 2: the numbers** (from the comparison table):
- Outside IR35 (if it were possible): net **£56,237**.
- (a) Inside, rate unchanged: net **£59,277**. Tallis bears £11,850 of employer NIC.
- (b) Inside, rate cut to cover employer NIC: deemed direct payment £73,695.65, net **£53,301**.

**Step 3: negotiate.** Option (a) is the better outcome for Aiden, and (b) the worse: he would lose about **£2,936** a year compared with outside IR35 (£56,237 − £53,301). Tallis may offer a middle position. The commercial negotiation should start from the **net income** comparison.

**Step 4: other considerations.** Employment rights: none under (a) or (b) unless the umbrella route is chosen. Pension: personal contributions can still be made (limited by his earnings, which for this income are now taxed as employment income). Aiden's company can keep serving other clients; keep the PSC for any outside-IR35 work. VAT stays on the invoice but isn't part of the deemed payment.

**Step 5: the letter.** Summarise the above, state the assumptions, set a decision date, and add that you will re-run the numbers if Aiden's costs, other income or the rate change.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "marginal-relief-ct",
      prompt: "A PSC has taxable profits of £67,294.50 in 2026/27 (no associated companies). Corporation tax is 25% less marginal relief of 3/200 × (£250,000 − profits). What is the corporation tax (to the nearest £1)?",
      answer: 14083,
      tolerance: 1,
      unit: "£",
      explain: "Profits are between £50,000 and £250,000, so marginal relief applies.",
      working: "25% × £67,294.50 = £16,823.63; marginal relief = 0.015 × (£250,000 − £67,294.50) = £2,740.58; tax = **£14,083.04**.",
    },
    {
      kind: "numeric",
      id: "net-difference",
      prompt: "Using the table, how much worse off is the worker (to the nearest £1) in the 'rate cut' inside-IR35 column (£53,300.88) than outside IR35 (£56,237.11)?",
      answer: 2936,
      tolerance: 1,
      unit: "£",
      explain: "Subtract the inside-IR35 net income from the outside-IR35 net income.",
      working: "£56,237.11 − £53,300.88 = **£2,936.23**.",
    },
    {
      kind: "numeric",
      id: "fee-payer-nic-annual",
      prompt: "A fee-payer pays a deemed direct payment of £84,000 over the year to one worker (annual basis, secondary threshold £5,000, rate 15%). What is the employer NIC (£)?",
      answer: 11850,
      unit: "£",
      explain: "15% of earnings above the secondary threshold.",
      working: "(£84,000 − £5,000) × 15% = **£11,850**.",
    },
    {
      kind: "classify",
      id: "classify-genuine-change",
      prompt: "Is the change likely to be a genuine change to the engagement?",
      categories: ["Genuine", "Cosmetic"],
      items: [
        { text: "Moving from day-rate hours to a fixed-price project with milestones, with the contractor bearing the cost of defects", answer: 0 },
        { text: "Adding a substitution clause that the client has said it will never accept in practice", answer: 1 },
        { text: "Removing the contractor from the line manager's team and the weekly team meeting, with outputs reviewed at milestones", answer: 0 },
        { text: "Changing the contract title to 'consultancy agreement' with no change in how the work is done", answer: 1 },
      ],
      explain: "Tribunals look at the reality. Changes only count if the actual working relationship changes.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-first",
      prompt: "Before comparing structures, what should you establish first?",
      options: ["The client's accountant", "The status of the engagement", "The contractor's holiday plans", "The VAT scheme"],
      answer: 1,
      explain: "Everything depends on whether the engagement is inside IR35.",
    },
    {
      kind: "mcq",
      id: "q-rate-cut",
      prompt: "Why do agencies and clients often cut the rate for an inside-IR35 engagement?",
      options: ["To cover the employer NIC and levy they must pay on top", "To fund the contractor's holiday", "Because the law requires it", "To pay the contractor's pension"],
      answer: 0,
      explain: "Employer NIC isn't deductible from the payment to the PSC so many clients reduce the rate.",
    },
    {
      kind: "mcq",
      id: "q-paper",
      prompt: "A client asks to 'tweak the contract' to be outside IR35 without changing how the work is done. What do you advise?",
      options: ["Do it", "It won't help because tribunals look at the working practices", "Do it and backdate", "Do it if the amount is small"],
      answer: 1,
      explain: "Only genuine changes alter the analysis.",
    },
    {
      kind: "mcq",
      id: "q-save",
      prompt: "Which should you do at each material change to an engagement?",
      options: ["Nothing", "Re-run the status assessment", "Change the PSC", "Resign as adviser"],
      answer: 1,
      explain: "Status determinations depend on the facts at the time.",
    },
    {
      kind: "mcq",
      id: "q-letter",
      prompt: "What should an advice letter always state about its limits?",
      options: ["That the advice depends on the facts given and may change if they do", "That HMRC has approved it", "That it is binding on the tribunal", "Nothing"],
      answer: 0,
      explain: "Make the assumptions and limits explicit.",
    },
  ],
  sources: [
    { label: "Off-payroll working for clients – GOV.UK", url: "https://www.gov.uk/guidance/off-payroll-working-for-clients" },
    { label: "Check employment status for tax (CEST) – GOV.UK", url: "https://www.gov.uk/guidance/check-employment-status-for-tax" },
    { label: "Corporation Tax rates – GOV.UK", url: "https://www.gov.uk/corporation-tax-rates" },
    { label: "Corporation Tax marginal relief – GOV.UK", url: "https://www.gov.uk/guidance/corporation-tax-marginal-relief" },
    { label: "Rates and thresholds for employers 2026 to 2027", url: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
    { label: "Tax on dividends – GOV.UK", url: "https://www.gov.uk/tax-on-dividends" },
  ],
};
