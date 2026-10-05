import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "vat-domestic-reverse-charge-and-cis",
  title: "The VAT domestic reverse charge and how it works with CIS",
  level: "practitioner",
  minutes: 35,
  summary:
    "When VAT is not charged on CIS construction supplies because of the domestic reverse charge (s55A VATA 1994): who it applies to, the end-user exception, the invoice wording, how both sides account on the VAT return, and how CIS deductions are calculated and posted when the reverse charge applies.",
  objectives: [
    "Identify the supplies and parties within the domestic reverse charge",
    "Explain the end-user and intermediary-supplier exceptions and the written notification",
    "Write or check a compliant reverse charge invoice",
    "Account for the supply on both VAT returns and in the books",
    "Calculate the CIS deduction and net payment where the reverse charge applies",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Since **1 March 2021**, many VAT-registered construction subcontractors **don't charge VAT** to their VAT-registered contractor customers. Instead the **customer accounts for the VAT** on its own return (the **domestic reverse charge**, VATA 1994 s55A). The aim was to stop VAT fraud in the sector. The reverse charge applies to supplies that are **reported within CIS**, so every CIS review should include the VAT treatment. The two systems run side by side: **CIS** is about tax deduction at source; the **reverse charge** is about who accounts for **VAT**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When the reverse charge applies",
      md: `The reverse charge applies to **most supplies of building and construction services** that are **within the Construction Industry Scheme**, where:

- The supply is **at the standard (20%) or reduced (5%) rate** (zero-rated supplies, such as new-build dwellings, are outside).
- The **supplier and the customer are both VAT-registered** in the UK, and the customer is a **CIS contractor** (including a deemed contractor).
- The customer is **not an "end user"** or an "**intermediary supplier**" (see below).

It doesn't apply to professional services (architects, surveyors), manufacturing of building components, or other excluded activities. The service list matches the CIS "construction operations".`,
    },
    {
      kind: "md",
      md: `### End users and intermediary suppliers

An **end user** is a business that doesn't make onward supplies of construction services (for example a property owner, landlord or retailer who commissions work for its own premises). An **intermediary supplier** is a business connected with an end user in a specified way. These customers **don't** apply the reverse charge. They can give the supplier **written notification** (for example: *"We are an end user for the purposes of section 55A VATA 1994 reverse charge for building and construction services. Issue us with a normal VAT invoice, with VAT charged at the appropriate rate. We will not account for the reverse charge."*). The supplier relies on that notification and **charges VAT normally**.

### The invoice

An invoice for a reverse charge supply must show the **normal VAT invoice details** and the **VAT rate** and the **amount of VAT** that the customer must account for, and must include a statement such as:

- *"Reverse charge: Customer to pay the VAT to HMRC"*, or
- *"Reverse charge: VAT Act 1994 Section 55A applies"*.

No VAT is **charged** or included in the amount payable.

### On the VAT returns

| | Supplier | Customer (contractor) |
|---|---|---|
| **Box 1** (output tax) | **Nothing** | VAT due under the reverse charge |
| **Box 4** (input tax) | Normal | The same VAT, as input tax (subject to normal rules) |
| **Box 6** (sales) | VAT-exclusive value of the supply | Normal |
| **Box 7** (purchases) | Normal | VAT-exclusive value of the purchase |

The customer's net VAT effect is **nil** if the input tax is fully recoverable. The **supplier** no longer collects VAT from the customer, which affects **cash flow**: it may have **input VAT** to reclaim but no output VAT to offset, so it may be in a **repayment** position.

### CIS and the reverse charge

- The **CIS deduction base** is unaffected: take the **amount excluding VAT**, deduct **materials**, apply the rate.
- With the reverse charge **no VAT is paid** to the subcontractor, so the **cash payment** is the net amount **less the CIS deduction**.
- **Domestic reverse charge** is a VAT matter only: the **monthly CIS return** is unchanged.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Charging VAT** to a VAT-registered CIS contractor customer who is not an end user.
- **Not charging VAT** to an end user who has given written notification.
- **Wrong invoice wording** or no wording.
- **Accounting for the VAT incorrectly** (customer missing the box 1 entry, or supplier including output tax in box 1).
- **Treating zero-rated** supplies as reverse charge.
- Forgetting to ask customers for **end user notifications** and keeping them on file.`,
    },
  ],
  scenario: {
    title: "A reverse charge job: Joel Parks and Redfern Interiors",
    narrative: `Joel Parks (now VAT-registered, 20% CIS rate) invoices **Redfern Interiors Ltd** for plastering a client's office: **labour £2,000** and **materials at cost £800**. Redfern is a VAT-registered CIS contractor that is not an end user (it supplies fit-outs to its own clients). VAT at 20% on £2,800 would be **£560**. Redfern has not given an end user notification.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: does the reverse charge apply?** The supply is within CIS, at 20%, between VAT-registered businesses, and Redfern is not an end user. Yes.

**Step 2: Joel's invoice.** Total **£2,800** with no VAT charged. It states the VAT rate and the amount (£560) that Redfern must account for and carries the wording *"Reverse charge: Customer to pay the VAT to HMRC"*.

**Step 3: CIS deduction.** £2,800 − £800 materials = £2,000 liable × 20% = **£400**.

**Step 4: payment.** £2,800 − £400 = **£2,400**.

**Step 5: Redfern's VAT return.** Box 1: **+£560** (reverse charge output); Box 4: **+£560** (input); Box 7: £2,800. Net VAT effect nil.

**Step 6: Joel's VAT return.** Box 1: **nil** for this supply; Box 6: **£2,800**.

**Step 7: books.** See the journal for Redfern.`,
      },
      {
        kind: "journal",
        title: "Redfern's entry for Joel's reverse charge invoice and payment",
        narrative: "VAT is both output (reverse charge) and input; the cash paid is net of the CIS deduction.",
        lines: [
          { account: "Subcontractor costs", dr: 2800 },
          { account: "VAT control (input tax)", dr: 560 },
          { account: "VAT control (reverse charge output)", cr: 560 },
          { account: "Bank", cr: 2400 },
          { account: "CIS liability (HMRC)", cr: 400 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "rc-payment",
      prompt: "A subcontractor at the 20% CIS rate issues a reverse charge invoice: labour £3,000, materials at cost £1,000, no VAT charged. What cash does the contractor pay (£)?",
      answer: 3400,
      unit: "£",
      explain: "Invoice total £4,000 less the CIS deduction on labour (20% × £3,000 = £600).",
      working: "£4,000 − £600 = **£3,400**.",
    },
    {
      kind: "numeric",
      id: "rc-vat-amount",
      prompt: "A reverse charge supply of £5,000 at 20% VAT. How much VAT must the customer account for (£)?",
      answer: 1000,
      unit: "£",
      explain: "20% of £5,000.",
      working: "£5,000 × 20% = **£1,000**.",
    },
    {
      kind: "journal",
      id: "journal-rc",
      prompt: "A contractor receives a reverse charge invoice: labour £1,000, materials £500, VAT £300 (not charged). The CIS deduction is £200 (20% on labour). Post the invoice and the payment.",
      accounts: ["Subcontractor costs", "VAT control (input tax)", "VAT control (reverse charge output)", "Bank", "CIS liability (HMRC)", "Trade debtors", "Sales"],
      answer: [
        { account: "Subcontractor costs", dr: 1500 },
        { account: "VAT control (input tax)", dr: 300 },
        { account: "VAT control (reverse charge output)", cr: 300 },
        { account: "Bank", cr: 1300 },
        { account: "CIS liability (HMRC)", cr: 200 },
      ],
      explain: "Cost £1,500; reverse charge VAT £300 is both output and input; cash = £1,500 − £200 = £1,300.",
    },
    {
      kind: "classify",
      id: "classify-rc",
      prompt: "Does the domestic reverse charge apply to the supply?",
      categories: ["Reverse charge", "Normal VAT charged"],
      items: [
        { text: "VAT-registered plasterer to a VAT-registered CIS contractor (not an end user)", answer: 0 },
        { text: "The same supply to a landlord end user who has given written notification", answer: 1 },
        { text: "A VAT-registered electrician to a homeowner", answer: 1, why: "The customer isn't a VAT-registered CIS contractor." },
        { text: "Architect's design fees to a contractor", answer: 1, why: "Not a CIS construction operation." },
      ],
      explain: "Check: CIS service, VAT-registered both sides, customer not an end user.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-start",
      prompt: "When did the construction domestic reverse charge start?",
      options: ["1 October 2019", "1 October 2020", "1 March 2021", "1 April 2022"],
      answer: 2,
      explain: "1 March 2021.",
    },
    {
      kind: "mcq",
      id: "q-box1",
      prompt: "In which box does the supplier show the VAT-exclusive value of a reverse charge supply?",
      options: ["Box 1", "Box 4", "Box 6", "Box 7"],
      answer: 2,
      explain: "Box 6; no output tax in Box 1.",
    },
    {
      kind: "mcq",
      id: "q-wording",
      prompt: "Which wording is accepted on a reverse charge invoice?",
      options: ["Paid in full", "Reverse charge: Customer to pay the VAT to HMRC", "Zero rated", "Exempt"],
      answer: 1,
      explain: "One of the forms of words in the guidance.",
    },
    {
      kind: "mcq",
      id: "q-enduser",
      prompt: "An end user wants VAT charged normally. What should it do?",
      options: ["Nothing", "Give the supplier written notification that it is an end user", "Register for CIS", "Pay in cash"],
      answer: 1,
      explain: "A written end user notification.",
    },
    {
      kind: "mcq",
      id: "q-cis-base",
      prompt: "Does the reverse charge change the CIS deduction base?",
      options: ["Yes, VAT is added", "No", "Only at 30%", "Only for companies"],
      answer: 1,
      explain: "The base always excludes VAT.",
    },
  ],
  sources: [
    { label: "VAT domestic reverse charge for building and construction services – GOV.UK", url: "https://www.gov.uk/guidance/vat-domestic-reverse-charge-for-building-and-construction-services" },
    { label: "Domestic reverse charge procedure (VAT Notice 735) – GOV.UK", url: "https://www.gov.uk/guidance/the-vat-domestic-reverse-charge-procedure-notice-735" },
    { label: "VATREVCON37100 – invoices under the construction reverse charge", url: "https://www.gov.uk/hmrc-internal-manuals/vat-reverse-charge-for-building-and-construction-services-manual/vatrevcon37100" },
    { label: "VATA 1994 s55A – reverse charge", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/55A" },
  ],
};
