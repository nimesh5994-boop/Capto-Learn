import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "revenue-recognition-frs-102",
  title: "Revenue recognition: the FRS 102 five-step model from 2026",
  level: "advanced",
  minutes: 45,
  summary:
    "The new FRS 102 Section 23 revenue model, effective for periods beginning on or after 1 January 2026: identifying contracts and performance obligations, setting and allocating the transaction price, recognising revenue at a point in time or over time, contract assets and liabilities, and the simplified version in FRS 105.",
  objectives: [
    "Apply the five steps to a contract with a customer",
    "Identify distinct performance obligations in a bundled sale and allocate the price on relative standalone selling prices",
    "Decide whether revenue is recognised over time or at a point in time",
    "Post revenue, contract liabilities (deferred income) and contract assets (accrued income)",
  ],
  body: [
    {
      kind: "md",
      md: `The FRC's **Periodic Review 2024** replaced FRS 102's old revenue section with a new **Section 23 'Revenue from Contracts with Customers'**, based on the IFRS 15 **five-step model**, for accounting periods **beginning on or after 1 January 2026** (early adoption was allowed if all the amendments were adopted together). FRS 105 brings in a **simplified** version of the same model for micro-entities, applied prospectively to new contracts.

For many simple businesses (a shop, a plumber billing each job on completion) nothing much changes. The model matters most for **bundled sales**, **long contracts**, **subscriptions**, **variable pricing** and **service businesses with unbilled work**.`,
    },
    {
      kind: "table",
      caption: "The five steps",
      head: ["Step", "Question", "Key points"],
      rows: [
        ["1. Identify the contract", "Is there an enforceable agreement with a customer?", "Can be written, oral or implied by customary business practice"],
        ["2. Identify the performance obligations", "What distinct goods or services has the company promised?", "A good or service is distinct if the customer can benefit from it on its own and it's separately identifiable in the contract"],
        ["3. Determine the transaction price", "How much does the company expect to be entitled to?", "Include variable consideration (rebates, bonuses, penalties) only to the extent it's highly probable the company will be entitled to the cumulative revenue recognised once the uncertainty is resolved"],
        ["4. Allocate the price", "How much belongs to each performance obligation?", "In proportion to relative standalone selling prices"],
        ["5. Recognise revenue", "When is each obligation satisfied?", "When (or as) control passes to the customer: at a point in time or over time"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Over time or at a point in time?",
      md: `Revenue is recognised **over time** if any one of these applies:
1. the customer **simultaneously receives and consumes** the benefits as the company performs (e.g. cleaning, bookkeeping, support);
2. the company's work **creates or enhances an asset the customer controls** as it's created (e.g. building on the customer's land);
3. the work creates an asset with **no alternative use** to the company and the company has an **enforceable right to payment** for work done to date (e.g. bespoke manufacturing).

Otherwise revenue is recognised at the **point in time** control passes (typically delivery or acceptance).`,
    },
    {
      kind: "md",
      md: `### Contract assets and liabilities

- **Contract liability** (deferred income): the customer has paid or been invoiced before the company performs.
- **Contract asset** (accrued income): the company has performed but its right to payment depends on something other than time (e.g. reaching a milestone).
- **Trade debtor**: an unconditional right to payment (only the passage of time is needed).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Where small-practice clients are most affected",
      md: `- **Software and SaaS**: licence, set-up and support sold as one price must be split.
- **Annual subscriptions and memberships** invoiced up front: deferred and released over the period.
- **Construction and long contracts**: revenue over time, measured by progress (e.g. costs incurred to date as a proportion of total expected costs).
- **Professional services with unbilled time**: recognise revenue as the work is done if criterion 1 or 3 applies, subject to recoverability.
- **Volume rebates and early-settlement discounts**: estimate and reduce revenue.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Transition and tax",
      md: `The amendments include transitional provisions (see the FRC's staff factsheets on revenue and on initial application). Any change in timing of profits on transition may have **corporation tax** consequences: HMRC follows GAAP for trading profits, and under the change of basis rules a company's transition adjustment is generally taxed (or relieved) in full as arising on the first day of the first period on the new basis, not spread. Quantify the effect before the first set of accounts under the new rules is finalised.`,
    },
  ],
  scenario: {
    title: "A bundled software deal at Northgate Systems Ltd",
    narrative: `Northgate Systems Ltd (year end **31 December 2026**, FRS 102 Section 1A; the new Section 23 applies) signed a contract on **1 October 2026** for a single price of **£30,000** (excluding VAT), invoiced on signing:

- a perpetual **software licence**, delivered and usable on 1 October 2026;
- **installation**, completed on 15 October 2026;
- **12 months' support** from 1 October 2026.

Northgate's standalone prices are: licence £20,000; installation £4,000; support £8,000 (total £32,000). The old policy was to recognise the whole £30,000 on invoicing.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Contract**: a signed, enforceable contract.
2. **Performance obligations**: the licence, the installation and the support are each **distinct** (the customer can benefit from each, and the installation is standard, not a significant modification). Three obligations.
3. **Transaction price**: £30,000, no variable elements.
4. **Allocate** on relative standalone prices (total £32,000), so the £2,000 discount is spread across all three:
   - Licence: £30,000 × 20/32 = **£18,750**
   - Installation: £30,000 × 4/32 = **£3,750**
   - Support: £30,000 × 8/32 = **£7,500**
5. **Recognise**:
   - Licence: point in time, 1 October 2026: **£18,750**.
   - Installation: completed in October: **£3,750**.
   - Support: over time, 3 of 12 months by 31 December: £7,500 × 3/12 = **£1,875**.

Revenue for 2026: **£24,375**. The remaining **£5,625** of support is a **contract liability** (deferred income) at 31 December 2026.`,
      },
      {
        kind: "journal",
        title: "Northgate: revenue for the year and the contract liability",
        narrative: "The full £30,000 was invoiced on signing (VAT ignored for simplicity).",
        lines: [
          { account: "Trade debtors", dr: 30000 },
          { account: "Revenue", cr: 24375 },
          { account: "Contract liabilities (deferred income)", cr: 5625 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "allocate-price",
      prompt:
        "A gym sells a 12-month membership plus a personal-training induction for a combined £540. Standalone prices: membership £480, induction £120. How much of the £540 is allocated to the membership?",
      answer: 432,
      unit: "£",
      explain: "Allocate the transaction price in proportion to relative standalone selling prices.",
      working: "Total standalone £600. Membership: £540 × 480/600 = **£432** (induction £108).",
    },
    {
      kind: "numeric",
      id: "over-time-progress",
      prompt:
        "A builder has a fixed-price contract for £400,000 to extend a customer's premises (revenue recognised over time; progress measured by costs incurred). Total expected costs are £320,000; costs incurred to the year end are £208,000. What revenue should be recognised to date?",
      answer: 260000,
      unit: "£",
      explain: "Measure progress as costs incurred ÷ total expected costs, and apply it to the transaction price.",
      working: "Progress: £208,000 ÷ £320,000 = 65%. Revenue: 65% × £400,000 = **£260,000**.",
    },
    {
      kind: "numeric",
      id: "variable-rebate",
      prompt:
        "A wholesaler sells £250,000 of goods to a customer in the year. If the customer's purchases exceed £200,000 in the year, it earns a 4% rebate on all purchases. The threshold has been exceeded and the rebate will be paid after the year end. What revenue should be recognised?",
      answer: 240000,
      unit: "£",
      explain: "The rebate is variable consideration that reduces the transaction price; here it's certain.",
      working: "£250,000 − (4% × £250,000 = £10,000) = **£240,000**.",
    },
    {
      kind: "journal",
      id: "annual-subscription",
      prompt:
        "On 1 September 2026 a company invoices and receives £2,400 (ignore VAT) for a 12-month subscription service starting that day. Its year end is 31 December 2026. Post the entry at the year end, assuming the full £2,400 was originally credited to Revenue.",
      accounts: ["Revenue", "Contract liabilities (deferred income)", "Contract assets (accrued income)", "Trade debtors", "Bank", "Prepayments"],
      answer: [
        { account: "Revenue", dr: 1600 },
        { account: "Contract liabilities (deferred income)", cr: 1600 },
      ],
      explain: "4 months' service has been delivered (£800). The other 8 months (£1,600) is a contract liability and is removed from revenue.",
    },
    {
      kind: "classify",
      id: "over-time-or-point",
      prompt: "Is revenue recognised over time or at a point in time?",
      categories: ["Over time", "Point in time"],
      items: [
        { text: "Monthly payroll bureau service", answer: 0, why: "The customer receives and consumes the benefit as it's performed." },
        { text: "Sale of a standard boiler from stock", answer: 1 },
        { text: "Building an extension on the customer's own land", answer: 0, why: "The customer controls the asset as it's created." },
        { text: "Bespoke machine with no alternative use, with an enforceable right to payment for work to date", answer: 0 },
        { text: "Retail sale of clothing", answer: 1 },
      ],
      explain: "Use the three over-time criteria; if none applies, recognise revenue when control passes.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-effective",
      prompt: "From when does the new FRS 102 Section 23 revenue model apply (without early adoption)?",
      options: ["Periods beginning on or after 1 January 2025", "Periods beginning on or after 1 January 2026", "Periods ending on or after 1 January 2026", "1 April 2028"],
      answer: 1,
      explain: "Accounting periods beginning on or after 1 January 2026.",
    },
    {
      kind: "mcq",
      id: "q-step-four",
      prompt: "How is the transaction price allocated between performance obligations?",
      options: ["Equally", "On relative standalone selling prices", "All to the first obligation delivered", "As the customer chooses"],
      answer: 1,
      explain: "Step 4 allocates on relative standalone selling prices.",
    },
    {
      kind: "mcq",
      id: "q-contract-liability",
      prompt: "A customer pays in advance for services not yet performed. What is recognised?",
      options: ["Revenue", "A contract liability (deferred income)", "A contract asset", "A provision"],
      answer: 1,
      explain: "Consideration received before performance is a contract liability.",
    },
    {
      kind: "mcq",
      id: "q-variable",
      prompt: "When can variable consideration be included in the transaction price?",
      options: [
        "Always, at the maximum amount",
        "Only to the extent it's highly probable the company will be entitled to the cumulative revenue recognised when the uncertainty is resolved",
        "Never",
        "Only when received in cash",
      ],
      answer: 1,
      explain: "FRS 102 Section 23 words the constraint positively: include variable consideration only to the extent it's highly probable the company will be entitled to the cumulative revenue recognised. It has broadly the same effect as the IFRS 15 'significant reversal' test.",
    },
    {
      kind: "mcq",
      id: "q-frs105-revenue",
      prompt: "Does the five-step model affect micro-entities using FRS 105?",
      options: ["No", "Yes, a simplified version applies prospectively to new contracts from 2026", "Only for leases", "Only if audited"],
      answer: 1,
      explain: "FRS 105 introduces a simplified five-step model, applied to contracts that begin after the date of initial application.",
    },
  ],
  sources: [
    { label: "FRC: FRS 102 (September 2024 edition, Section 23)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-102/" },
    { label: "FRC: FRS factsheets and explainers (revenue; initial application)", url: "https://www.frc.org.uk/library/standards-codes-policy/accounting-and-reporting/uk-accounting-standards/frs-factsheets/" },
    { label: "FRC revises UK and Ireland accounting standards (March 2024)", url: "https://www.frc.org.uk/news-and-events/news/2024/03/frc-revises-uk-and-ireland-accounting-standards/" },
    { label: "ICAEW: new revenue recognition model for FRS 102 and FRS 105", url: "https://www.icaew.com/insights/viewpoints-on-the-news/2024/mar-2024/new-revenue-recognition-model-for-frs-102-and-105" },
    { label: "HMRC Business Income manual: change of basis – adjustment income and expenses, charge to tax (BIM34095)", url: "https://www.gov.uk/hmrc-internal-manuals/business-income-manual/bim34095" },
  ],
};
