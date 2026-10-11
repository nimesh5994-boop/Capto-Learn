import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "property-income-and-loan-relationships",
  title: "Property income, loan relationships and dividends received",
  level: "practitioner",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "How a company is taxed on rents, lease premiums and interest: the property business computation, property losses, trading and non-trading loan relationships, non-trading deficits, and why most dividends a company receives are exempt but still count for the rate limits.",
  objectives: [
    "Compute a company's property business profit and relieve a property loss",
    "Calculate the income element of a premium on a short lease",
    "Classify loan relationship debits and credits as trading or non-trading",
    "Relieve a non-trading loan relationship deficit and explain the treatment of dividends received",
  ],
  body: [
    {
      kind: "md",
      md: `Many owner-managed groups hold property or cash in a company, and property investment companies are common clients. Their computations look different from a trading company's: rents go into a **property business**, and interest paid or received goes through the **loan relationship** rules. A frequent error is to deduct mortgage interest as a property expense, which puts it in the wrong box and can get loss relief wrong.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The property business",
      md: `All of a company's UK lettings form **one UK property business**. Profit is computed on the **accruals basis** using normal trading principles: rent receivable less allowable expenses (repairs, insurance, agent's fees, service charges, legal fees on short lease renewals, capital allowances on plant used in commercial lettings, and replacement of domestic items in furnished residential lets).

Two differences from individuals:
- **Interest** on loans to buy or improve let property is **not** a property expense. It's a **non-trading loan relationship debit**, deductible in full. There's no 20% restriction (that applies to individual landlords only).
- Companies can't use the cash basis or the £1,000 property allowance.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Property losses",
      md: `A UK property business loss is set **first against total profits of the same AP** (automatically), and any excess is **carried forward** against total profits of later APs, as long as the company still carries on the property business (CTA 2010 ss62–63). It can also be **group relieved**. It can't be carried back.`,
    },
    {
      kind: "md",
      md: `### Premiums on short leases

When a company landlord grants a lease of **50 years or less** for a premium, part of the premium is taxed as **property income** in the year the lease is granted:

**Income element = premium − (premium × 2% × (years of lease − 1))**

The rest is a capital disposal (a part disposal for chargeable gains). A tenant company paying such a premium for business premises can deduct the income element spread over the lease term.`,
    },
    {
      kind: "md",
      md: `### Loan relationships

A company's interest, and other profits and losses on money debts, are taxed under the **loan relationship** rules (CTA 2009 Parts 5 and 6), broadly following the accounts.

| Item | Trading or non-trading? |
|---|---|
| Interest on a loan to buy machinery, a delivery fleet, trading premises or working capital | **Trading**: deducted in trading profit |
| Interest on a loan to buy let property or shares in another company | **Non-trading** |
| Bank interest received on surplus cash | **Non-trading** credit (unless the trade is money-lending) |
| Interest on late-paid CT; repayment interest received | **Non-trading** |
| Interest charged to a director on an overdrawn loan account | **Non-trading** credit |

Non-trading credits and debits are netted. A **net credit** is taxable as a separate line in TTP. A **net debit (non-trading deficit)** can be relieved:
1. against **total profits of the same AP** (in full or in part);
2. by **group relief**;
3. carried **back 12 months** against **non-trading loan relationship credits** only;
4. carried **forward** against total profits of later periods (any amount not otherwise relieved).`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Large interest bills",
      md: `The **corporate interest restriction** limits net interest deductions for a group with more than **£2 million** of net interest expense a year. It won't affect most owner-managed businesses, but check it for highly geared property groups.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Dividends received",
      md: `Most dividends received by a company are **exempt** from CT (CTA 2009 Part 9A): dividends from UK and most overseas companies fall into an exempt class, especially for small companies. They're not included in TTP. **But** dividends from companies **outside the group** are added to TTP to give **augmented profits**, which decide whether the company pays the small profits rate, main rate or marginal relief.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Close investment-holding companies",
      md: `A close company that exists mainly to hold investments (other than letting land to unconnected third parties) can be a **close investment-holding company (CIC)**, which pays the **main rate (25%)** on all its profits with no small profits rate or marginal relief. A company letting commercial or residential property to unconnected tenants is **not** a CIC. See the close companies lesson.`,
    },
  ],
  scenario: {
    title: "Ashworth Property Lettings Ltd",
    narrative: `**Ashworth Property Lettings Ltd** owns four industrial units in Wigan, let to unconnected tenants. It's owned by the Ashworth family, has no other activities and no associated companies. Its accounts for the year ended **31 March 2027** show:

| Item | Amount |
|---|---:|
| Rents receivable | £120,000 |
| Repairs, insurance, agent's fees | £18,000 |
| Mortgage interest on the units | £35,000 |
| Bank interest received | £1,500 |
| Dividend from a listed UK company | £4,000 |

The director asks: *"Is it right we're paying the small profits rate? A friend said property companies pay 25%."*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Property business profit.** £120,000 − £18,000 = **£102,000**. The mortgage interest is **not** deducted here.

**2. Loan relationships.** Non-trading credits £1,500 − non-trading debits £35,000 = **non-trading deficit of £33,500**. Claim relief against total profits of the same year.

**3. TTP.** £102,000 − £33,500 = **£68,500**. The dividend is exempt and excluded.

**4. Augmented profits.** TTP £68,500 + dividend £4,000 (from a non-group company) = **£72,500**, between £50,000 and £250,000, so marginal relief applies.

**5. CIC?** It lets land to unconnected third parties, so it's **not** a close investment-holding company: the normal rates and marginal relief are available. The friend's comment would be right for a company holding only shares or cash.`,
      },
      {
        kind: "table",
        caption: "CT computation: year ended 31 March 2027",
        head: ["", "£"],
        rows: [
          ["Property business profit", "102,000.00"],
          ["Less non-trading loan relationship deficit (current year claim)", "(33,500.00)"],
          ["**Taxable total profits (N)**", "**68,500.00**"],
          ["Augmented profits (A) = N + £4,000 dividend", "72,500.00"],
          ["CT at 25% × N", "17,125.00"],
          ["Marginal relief: 3/200 × (£250,000 − £72,500) × £68,500/£72,500", "(2,515.60)"],
          ["**CT payable**", "**14,609.40**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "lease-premium",
      prompt: "A company grants a 15-year lease of a shop for a premium of £60,000. How much is taxed as property income?",
      answer: 43200,
      unit: "£",
      explain: "Income element = premium − (premium × 2% × (years − 1)).",
      working: "£60,000 × 2% × 14 = £16,800\n\n£60,000 − £16,800 = **£43,200**",
    },
    {
      kind: "numeric",
      id: "property-loss",
      prompt:
        "A company has trading profits of £70,000 and a UK property business loss of £25,000 in its year to 31 March 2027, plus a £5,000 property loss brought forward from last year (it still lets the property). What are its taxable total profits, assuming all available property losses are used?",
      answer: 40000,
      unit: "£",
      explain: "Property losses are set against total profits of the same AP and carried-forward property losses against total profits of later APs.",
      working: "£70,000 − £25,000 − £5,000 = **£40,000**",
    },
    {
      kind: "numeric",
      id: "ntlr-net",
      prompt:
        "A trading company has trading profits of £200,000, after deducting £9,000 of interest on a loan for new machinery. It also received bank interest of £3,000 and paid interest of £12,000 on a loan used to buy shares in a subsidiary. What are its taxable total profits if any non-trading deficit is relieved in the current year?",
      answer: 191000,
      unit: "£",
      explain:
        "The machinery loan interest is a trading debit, already deducted in arriving at trading profits of £200,000. The share-purchase loan interest is non-trading: net non-trading deficit £9,000, set against total profits.",
      working: "Non-trading: £3,000 − £12,000 = (£9,000) deficit\n\nTTP: £200,000 − £9,000 = **£191,000**",
    },
    {
      kind: "classify",
      id: "lr-classify",
      prompt: "Classify each item for a manufacturing company.",
      categories: ["Trading loan relationship", "Non-trading loan relationship", "Not a loan relationship (property income or exempt)"],
      items: [
        { text: "Interest on an overdraft funding day-to-day trading", answer: 0 },
        { text: "Interest received on a deposit account holding surplus cash", answer: 1 },
        { text: "Rent received from subletting part of the factory", answer: 2 },
        { text: "Interest on a loan to buy a buy-to-let flat", answer: 1 },
        { text: "Dividend received from a UK subsidiary", answer: 2 },
        { text: "Interest charged on HMRC's late CT payment", answer: 1 },
      ],
      explain: "Interest connected with the trade is trading; investment and tax interest is non-trading. Rent is property income; dividends are usually exempt.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-mortgage-interest",
      prompt: "How is mortgage interest on let property relieved for a company?",
      options: [
        "As a property expense, restricted to 20%",
        "As a non-trading loan relationship debit, in full",
        "Not at all",
        "As a trading expense",
      ],
      answer: 1,
      explain: "Companies relieve property loan interest through the loan relationship rules, with no 20% restriction.",
    },
    {
      kind: "mcq",
      id: "q-property-loss",
      prompt: "A company's property business loss that can't be used in the current year is:",
      options: ["Carried back 12 months", "Carried forward against total profits while the property business continues", "Lost", "Only usable against future property profits"],
      answer: 1,
      explain: "Excess property losses are carried forward against total profits.",
    },
    {
      kind: "mcq",
      id: "q-dividends",
      prompt: "A small company receives a dividend from an unconnected UK company. What is the CT effect?",
      options: [
        "Taxed at 25%",
        "Exempt, but included in augmented profits for the rate limits",
        "Taxed at 19%",
        "Exempt and ignored completely",
      ],
      answer: 1,
      explain: "The dividend is exempt but increases augmented profits.",
    },
    {
      kind: "mcq",
      id: "q-ntlr-carry-back",
      prompt: "A non-trading loan relationship deficit carried back 12 months can be set against:",
      options: ["Total profits", "Trading profits only", "Non-trading loan relationship credits only", "Chargeable gains only"],
      answer: 2,
      explain: "Carry back of a non-trading deficit is only against non-trading loan relationship credits of the earlier period.",
    },
    {
      kind: "mcq",
      id: "q-cic",
      prompt: "Which company is most likely to be a close investment-holding company paying 25% on all profits?",
      options: [
        "A family company letting shops to unconnected retailers",
        "A family company whose only assets are cash and a share portfolio",
        "A trading company with surplus cash",
        "The holding company of a trading group",
      ],
      answer: 1,
      explain: "Letting land to unconnected persons and trading (or holding trading subsidiaries) are qualifying purposes; holding only investments isn't.",
    },
  ],
  sources: [
    { label: "PIM1030: Who receives property income? (Property Income Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/property-income-manual/pim1030" },
    { label: "CTA 2010 s62: relief for losses made in UK property business", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/62" },
    { label: "CFM30000: Loan relationships – introduction (Corporate Finance Manual)", url: "https://www.gov.uk/hmrc-internal-manuals/corporate-finance-manual/cfm30000" },
    { label: "CTA 2009 Part 5 Chapter 16: non-trading deficits", url: "https://www.legislation.gov.uk/ukpga/2009/4/part/5/chapter/16" },
    { label: "CTM03925: Marginal relief, FY2023 onwards", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm03925" },
  ],
};
