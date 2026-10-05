import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "tax-points-and-vat-invoices",
  title: "Tax points, VAT invoices and credit notes",
  level: "foundation",
  minutes: 35,
  taxYear: "2026/27",
  summary:
    "When VAT becomes due (the tax point) and so which return a sale belongs on, what a valid VAT invoice must show, and how to deal with deposits, continuous supplies, pro formas, discounts and credit notes.",
  objectives: [
    "Identify the basic and actual tax point for goods and services",
    "Apply the 14-day invoice rule and the deposit rule to put sales on the right VAT return",
    "List the details a full VAT invoice must contain and when a simplified invoice is acceptable",
    "Handle pro forma invoices, prompt payment discounts and credit notes correctly",
  ],
  body: [
    {
      kind: "md",
      md: `The **tax point** (or time of supply) is the date a supply is treated as taking place for VAT. It decides:

- **which VAT return** the output tax goes on;
- **which rate** applies if the rate changes; and
- for the customer, the earliest return on which they can claim input tax (they also need the invoice).

Getting tax points wrong is one of the most common reasons a return is misstated, especially at quarter ends.`,
    },
    {
      kind: "table",
      caption: "Finding the tax point",
      head: ["Step", "Rule"],
      rows: [
        ["1. Basic tax point (goods)", "The date the goods are **removed** (sent or collected) or **made available** to the customer"],
        ["1. Basic tax point (services)", "The date the service is **performed** (usually completed)"],
        ["2. Earlier invoice or payment", "If a VAT invoice is issued or payment is received **before** the basic tax point, the earlier date is the tax point (to the extent of the amount invoiced or paid)"],
        ["3. The 14-day rule", "If a VAT invoice is issued **within 14 days after** the basic tax point (and step 2 hasn't applied), the **invoice date** becomes the tax point. HMRC can agree a longer period, for example month-end invoicing"],
      ],
    },
    {
      kind: "callout",
      tone: "example",
      title: "The rules in action",
      md: `- Goods delivered **28 September**, invoice dated **5 October** (within 14 days): tax point **5 October**.
- Goods delivered **28 September**, invoice dated **20 October** (more than 14 days): tax point **28 September**, the basic tax point.
- Customer pays a **£500 deposit on 15 September**, work completed and invoiced for the balance on **12 October**: tax point for the deposit is **15 September**; the balance is **12 October**.`,
    },
    {
      kind: "md",
      md: `### Special cases

- **Deposits**: a deposit that's part payment for the supply creates a tax point when it's received. A genuinely refundable *security* deposit (for example on hired equipment) isn't payment for a supply, so it doesn't.
- **Continuous supplies of services** (retainers, leases, monthly maintenance, subscriptions): there's no basic tax point. The tax point is the **earlier of each payment received or VAT invoice issued**. Landlords and others can issue an annual invoice listing future payment dates, and each date becomes a tax point.
- **Pro forma invoices**: a request for payment, not a VAT invoice. It must be clearly marked "**This is not a VAT invoice**". It doesn't create a tax point and the customer can't reclaim VAT on it. When payment arrives, the tax point is the payment date and a proper VAT invoice should follow.
- **Cash Accounting Scheme** users ignore these rules for their returns: they account for VAT when cash is received or paid (covered later in the track).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "What a full VAT invoice must show",
      md: `A VAT-registered business must issue a VAT invoice **within 30 days** of the tax point for standard or reduced-rated supplies to another VAT-registered business. It must show:

1. a **unique sequential invoice number**;
2. the **time of supply** (tax point) and the **date of issue** if different;
3. the supplier's **name, address and VAT registration number**;
4. the **customer's name and address**;
5. a **description** of the goods or services, with quantity and unit price;
6. the **rate of VAT** for each item and the amount **excluding VAT**;
7. any **discount** offered;
8. the **total amount of VAT** in sterling.

Reverse-charge and zero-rated supplies have their own extra wording (for example "Reverse charge: customer to pay the VAT to HMRC").`,
    },
    {
      kind: "table",
      caption: "Types of VAT invoice",
      head: ["Type", "When allowed", "What's different"],
      rows: [
        ["Full VAT invoice", "Always", "All the details above"],
        ["Simplified invoice", "Retail supplies of **£250 or less** including VAT", "No customer details; can show the VAT-inclusive total and the rate instead of the VAT amount"],
        ["Modified invoice", "Retail supplies over £250, if the customer agrees", "Shows VAT-inclusive values per line, plus totals net, VAT and gross"],
        ["Self-billed invoice", "Customer prepares the invoice under an agreement with the supplier", "Must say \"the VAT shown is your output tax due to HMRC\""],
      ],
    },
    {
      kind: "md",
      md: `### Discounts and credit notes

- **Prompt payment discounts**: VAT is due on the amount the customer **actually pays**. If the invoice shows VAT on the full price and the customer takes the discount, the supplier must issue a credit note (or the invoice must state the discount terms and that the customer can only recover the VAT actually paid).
- **Credit notes**: to reduce the value of a supply (returns, pricing errors), issue a credit note showing the same details as an invoice plus the reference to the original invoice and the reason. The supplier reduces its output tax and the customer reduces its input tax in the period the credit note is issued.
- **Errors on invoices**: don't just alter or delete an issued invoice. Issue a credit note and a new invoice so there's an audit trail.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Quarter-end cut-off",
      md: `Bookkeeping software usually codes VAT by **invoice date**. If a client invoices late (more than 14 days after delivery or completion), the software date is wrong: the tax point is the earlier delivery or completion date and the VAT belongs on the earlier return. Ask clients near a quarter end when goods actually went out and jobs were actually finished.`,
    },
  ],
  scenario: {
    title: "Quarter-end cut-off for Northgate Signs Ltd",
    narrative: `**Northgate Signs Ltd** makes and installs shop signs. Its VAT quarter ends on **30 September 2026**. All prices below are net of VAT at 20%. You're preparing the September return and need to decide which of these belong on it:

| Job | What happened |
|---|---|
| A | Sign delivered to a café on **22 September**; invoice issued **2 October** for £2,400 |
| B | Sign installed for a gym on **10 September**; invoice issued **6 October** for £3,600 |
| C | Hotel paid a **£1,500 deposit on 25 September**; sign to be installed in November, total price £6,000 |
| D | Pro forma sent to a dentist on **28 September** for £1,200; dentist paid on **3 October** |
| E | Monthly maintenance contract with a supermarket, £300 a month, billed on the **1st of each month in advance**; the September bill was issued on 1 September |`,
    walkthrough: [
      {
        kind: "md",
        md: `- **Job A**: basic tax point 22 September. Invoice on 2 October is within 14 days, so the tax point **moves to 2 October**. Next quarter.
- **Job B**: basic tax point 10 September. The invoice on 6 October is 26 days later, outside the 14-day window, so the tax point **stays at 10 September**. This quarter: VAT £720. The software will show it in October, so it needs a manual adjustment or the invoice date correcting to reflect the tax point.
- **Job C**: the deposit creates a tax point on **25 September** for the £1,500 paid. VAT-inclusive or not? Treat the deposit as VAT-inclusive unless agreed otherwise: £1,500 × 1/6 = **£250**. This quarter. The balance falls in November.
- **Job D**: a pro forma isn't a VAT invoice, so no tax point on 28 September. Payment on **3 October** is the tax point. Next quarter.
- **Job E**: a continuous supply. The tax point is the earlier of invoice and payment, so the September bill issued 1 September is in this quarter: **£60**. (July and August bills are already in the quarter too.)`,
      },
      {
        kind: "table",
        caption: "Output tax from these jobs on the September 2026 return",
        head: ["Job", "Tax point", "On September return?", "Output VAT"],
        rows: [
          ["A", "2 October", "No", "£0"],
          ["B", "10 September", "Yes", "£720"],
          ["C", "25 September (deposit)", "Yes", "£250"],
          ["D", "3 October", "No", "£0"],
          ["E (September)", "1 September", "Yes", "£60"],
          ["**Total**", "", "", "**£1,030**"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-tax-points",
      prompt: "A client's VAT quarter ends on **31 March**. Decide which return each sale belongs on.",
      categories: ["Quarter to 31 March", "Next quarter"],
      items: [
        { text: "Goods delivered 25 March, invoiced 4 April", answer: 1, why: "Invoice within 14 days moves the tax point to 4 April." },
        { text: "Goods delivered 10 March, invoiced 20 March", answer: 0, why: "Invoice within 14 days: tax point 20 March, still in this quarter." },
        { text: "Service completed 5 March, invoiced 15 April", answer: 0, why: "More than 14 days, so the basic tax point of 5 March stands." },
        { text: "Deposit received 29 March for goods to be delivered in May", answer: 0, why: "Payment before the basic tax point creates a tax point." },
        { text: "Pro forma issued 28 March, paid 2 April", answer: 1, why: "A pro forma isn't a VAT invoice; payment on 2 April is the tax point." },
        { text: "Quarterly rent invoice issued 25 March for April–June, paid 1 April", answer: 0, why: "Continuous supply: the invoice on 25 March came first." },
      ],
      explain:
        "Start with the basic tax point (delivery or completion), then check for an earlier invoice or payment, then apply the 14-day rule. Continuous supplies use the earlier of invoice and payment.",
    },
    {
      kind: "multi",
      id: "invoice-defects",
      prompt:
        "A client wants to claim input tax on a £3,000 + VAT invoice from a supplier. Which of these missing details mean it's **not a valid full VAT invoice**? Select all that apply.",
      options: [
        "The supplier's VAT registration number",
        "A unique invoice number",
        "The supplier's bank details",
        "The total VAT charged",
        "The supplier's company registration number",
        "A description of the services",
      ],
      answers: [0, 1, 3, 5],
      explain:
        "A VAT invoice must show the supplier's VAT number, a unique sequential number, a description and the VAT total (among other things). Bank details and company number are good practice or company-law requirements but aren't VAT invoice requirements.",
    },
    {
      kind: "numeric",
      id: "deposit-vat",
      prompt:
        "A kitchen fitter receives a deposit of **£2,880** on 20 June for a kitchen to be fitted in August (total price £12,000 + VAT). His VAT quarter ends 30 June. How much output tax goes on the June quarter's return?",
      answer: 480,
      unit: "£",
      explain: "The deposit is a payment before the basic tax point, so it creates a tax point on 20 June for the amount received. Treat it as VAT-inclusive.",
      working: "£2,880 × 1/6 = **£480**. The remaining VAT (£2,400 − £480 = £1,920) is accounted for when the work is done or invoiced.",
    },
    {
      kind: "journal",
      id: "credit-note",
      prompt:
        "A wholesaler issues a credit note to a VAT-registered customer for faulty goods returned: **£500 + £100 VAT**. The original sale was on credit and hasn't been paid. Post the credit note in the wholesaler's books.",
      accounts: ["Sales", "VAT control account", "Trade debtors", "Trade creditors", "Purchases", "Bank", "Bad debts"],
      answer: [
        { account: "Sales", dr: 500 },
        { account: "VAT control account", dr: 100 },
        { account: "Trade debtors", cr: 600 },
      ],
      explain:
        "The credit note reverses part of the sale: sales and output tax are reduced (debited) and the customer owes £600 less. The customer will reduce its input tax by £100 in the same period.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-basic-services",
      prompt: "What is the basic tax point for a one-off supply of services?",
      options: ["The date of the contract", "The date the service is performed", "The date of payment", "The end of the VAT quarter"],
      answer: 1,
      explain: "For services the basic tax point is when the service is performed, normally when it's completed.",
    },
    {
      kind: "mcq",
      id: "q-14-day",
      prompt: "Goods are delivered on 1 June. A VAT invoice is issued on 12 June; payment is received on 30 June. What is the tax point?",
      options: ["1 June", "12 June", "30 June", "The quarter end"],
      answer: 1,
      explain: "The invoice was issued within 14 days of the basic tax point, so the invoice date becomes the tax point.",
    },
    {
      kind: "mcq",
      id: "q-pro-forma",
      prompt: "Can a customer reclaim input tax on a pro forma invoice?",
      options: ["Yes, always", "Yes, if it shows the VAT number", "No: a pro forma is not a VAT invoice", "Only for amounts under £250"],
      answer: 2,
      explain: "A pro forma is a request for payment and must be marked 'This is not a VAT invoice'. The customer needs the proper VAT invoice.",
    },
    {
      kind: "mcq",
      id: "q-30-days",
      prompt: "Within what period must a VAT invoice normally be issued to a VAT-registered customer?",
      options: ["7 days of the tax point", "14 days of the tax point", "30 days of the tax point", "By the end of the VAT quarter"],
      answer: 2,
      explain: "VAT invoices must be issued within 30 days of the tax point. The 14-day rule is about when an invoice moves the tax point, not the deadline for issuing one.",
    },
    {
      kind: "mcq",
      id: "q-simplified-limit",
      prompt: "A builders' merchant sells £300 of goods (including VAT) to a trade customer who wants to reclaim the VAT. What should be issued?",
      options: ["A simplified invoice", "A full or modified VAT invoice", "A till receipt is enough", "No invoice is needed"],
      answer: 1,
      explain: "Simplified invoices are only allowed up to £250 including VAT. Above that, a full VAT invoice (or a modified invoice if the customer agrees) is needed.",
    },
    {
      kind: "mcq",
      id: "q-continuous",
      prompt: "A landlord who has opted to tax issues invoices quarterly in advance. What is the tax point for each quarter's rent?",
      options: ["The end of each quarter", "The earlier of the invoice date and the payment date", "The date the lease was signed", "The date the tenant moves in"],
      answer: 1,
      explain: "Rent is a continuous supply of services. Each tax point is the earlier of issuing a VAT invoice or receiving payment.",
    },
  ],
  sources: [
    { label: "VAT guide (VAT Notice 700) – time of supply and invoices", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "HMRC VAT Time of Supply manual", url: "https://www.gov.uk/hmrc-internal-manuals/vat-time-of-supply" },
    { label: "Record keeping for VAT (VAT Notice 700/21)", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "VAT Act 1994 s6 – time of supply", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/6" },
  ],
};
