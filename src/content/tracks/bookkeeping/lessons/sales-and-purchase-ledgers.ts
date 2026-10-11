import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "sales-and-purchase-ledgers",
  title: "Sales and purchase ledgers",
  level: "foundation",
  minutes: 30,
  summary:
    "Running the sales and purchase ledgers day to day: raising valid VAT invoices, entering supplier bills, allocating receipts and payments (including part payments and remittances), and reconciling supplier statements.",
  objectives: [
    "Check that a sales or purchase invoice contains what a valid VAT invoice needs",
    "Enter bills and invoices so the aged reports and VAT return are right",
    "Allocate full, part and combined payments using remittance advice",
    "Reconcile a supplier statement to the purchase ledger",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The **sales ledger** (accounts receivable) records what each customer owes; the **purchase ledger** (accounts payable) records what the business owes each supplier. In cloud software these are the *Sales/Invoices* and *Purchases/Bills* areas. When they're kept properly, the aged debtors and creditors reports are accurate, the VAT return picks up VAT on the right date, and the client knows exactly who to chase and who to pay.

The cycle is the same on both sides: **document → enter → allocate payment → reconcile**.`,
    },
    {
      kind: "table",
      caption: "What a full VAT invoice must show",
      head: ["Required", "Notes"],
      rows: [
        ["A unique, sequential invoice number", "Gaps or duplicates are a red flag"],
        ["The supplier's name, address and VAT registration number", "No VAT number means no VAT can be claimed"],
        ["The invoice date and the time of supply (tax point) if different", "Determines which VAT return it falls into"],
        ["The customer's name and address", "An invoice to the director personally is a warning sign"],
        ["A description of the goods or services, with quantity and price", ""],
        ["The rate of VAT and the amount of VAT, with totals excluding VAT", "Each rate shown separately where there's more than one"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Simplified and modified invoices",
      md: `A retailer can issue a **simplified invoice** for supplies of up to **£250 including VAT**, showing less detail (the customer's name isn't needed). For larger amounts the customer needs a full VAT invoice to support an input tax claim. See HMRC's guidance on VAT invoices for the full rules.`,
    },
    {
      kind: "md",
      md: `### Entering bills

- Enter the bill when it's **received**, dated with the **invoice date**, not when it's paid. That keeps creditors complete and puts the VAT in the right return.
- Use the supplier's invoice number as the reference: it's how duplicates are spotted.
- Code each line to the right nominal and VAT code. One invoice can have several lines (e.g. materials and a delivery charge).
- Attach the PDF to the bill in the software.

### Allocating payments

Every receipt and payment should be **allocated** to the specific invoices it pays:

- **Full payment:** match to the invoice.
- **Part payment:** allocate the amount received; the balance stays outstanding on that invoice.
- **One payment for several invoices:** use the customer's **remittance advice** to allocate across the invoices it covers. Without one, ask, or allocate to the oldest first and note the assumption.
- **Payment with no invoice yet:** a deposit or prepayment. Record it as a credit on the customer's account (a "prepayment" or "overpayment" in most software) and allocate it when the invoice is raised.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common mistakes",
      md: `- **Entering a bill twice**, once from the email and again from the post. Always search by supplier and invoice number first.
- **Recording supplier payments as "spend money" to the expense code** when the bill is already entered, so the cost doubles and the supplier still shows as owed.
- **Leaving receipts unallocated**, so the customer appears to owe old invoices and gets chased for money they've paid.
- **Dating bills on the payment date**, which shifts VAT into the wrong return and makes creditors look smaller than they are.`,
    },
    {
      kind: "md",
      md: `### Supplier statement reconciliations

Most suppliers send a monthly statement. Reconciling it to the purchase ledger catches missing invoices, unrecorded credit notes and duplicates. Differences fall into:

- **Timing:** payments sent but not yet received by the supplier; invoices in the post.
- **Missing in the client's books:** invoices or credit notes on the statement that were never entered. Request copies.
- **Errors in the client's books:** duplicates, wrong amounts, wrong supplier.
- **Errors by the supplier:** pricing disputes, payments misallocated on their side.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Payment terms",
      md: `If no payment date is agreed, a business payment is late **30 days** after the later of the customer receiving the invoice and the goods or service being delivered. Business-to-business terms are usually expected to be no more than 60 days unless longer terms are fair to both. Agreed terms should appear on every sales invoice.`,
    },
  ],
  scenario: {
    title: "Reconciling Kingsway Timber's statement for Fernhill Builders Ltd",
    narrative: `**Fernhill Builders Ltd** has received its **30 June** statement from Kingsway Timber showing **£7,040** owed. The purchase ledger shows only **£4,920**. The director, Rob, asks whether he's been overcharged. You compare the two:

1. Fernhill paid **£2,400** on 29 June. It's in the purchase ledger but not on Kingsway's statement.
2. Invoice **KT-4471** for **£1,140**, dated 24 June, is on the statement but not in the ledger. Rob finds it unopened in a van.
3. A credit note for **£660** for returned decking is on the statement but wasn't entered.
4. Invoice **KT-4402** for **£760** appears **twice** in the purchase ledger: once from the emailed PDF and once from the paper copy.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Supplier statement reconciliation at 30 June",
        head: ["", "£"],
        rows: [
          ["Balance per Fernhill's purchase ledger", "4,920"],
          ["Add invoice KT-4471 not entered", "1,140"],
          ["Less credit note not entered", "(660)"],
          ["Less duplicate KT-4402", "(760)"],
          ["**Corrected ledger balance**", "**4,640**"],
          ["Balance per supplier statement", "7,040"],
          ["Less payment in transit (29 June)", "(2,400)"],
          ["**Corrected statement balance**", "**4,640**"],
        ],
      },
      {
        kind: "md",
        md: `The true balance owed is **£4,640**. Rob hasn't been overcharged; the books were incomplete.

**Actions:** enter KT-4471 (dated 24 June, so its VAT goes in the June quarter); enter the credit note; delete the duplicate KT-4402 (and check it hasn't been paid twice). The payment in transit needs no entry: it'll appear on July's statement.`,
      },
      {
        kind: "journal",
        title: "Entering the credit note (standard-rated)",
        lines: [
          { account: "Trade payables", dr: 660 },
          { account: "Purchases – materials", cr: 550 },
          { account: "VAT control", cr: 110 },
        ],
        narrative: "£660 gross = £550 net + £110 VAT. The credit note reduces the cost and the input tax claimed.",
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "supplier-rec",
      prompt: `A supplier's statement shows **£5,830** owed. The client's purchase ledger shows **£3,250**. The differences are:

- A payment of **£1,900** made on the last day of the month, not yet on the statement.
- An invoice for **£980** on the statement, never entered by the client.
- A credit note for **£300** on the statement, never entered by the client.

What is the correct amount owed to the supplier?`,
      answer: 3930,
      unit: "£",
      explain: "Adjust the ledger for items the client hasn't recorded, and the statement for items the supplier hasn't recorded yet. Both should arrive at the same figure.",
      working: `Ledger: £3,250 + £980 − £300 = £3,930

Statement: £5,830 − £1,900 = £3,930

Correct balance: **£3,930**`,
    },
    {
      kind: "numeric",
      id: "customer-balance",
      prompt: "A customer was invoiced **£1,800** and **£2,400**, received a credit note for **£300**, and has paid **£1,500**. How much does the customer owe?",
      answer: 2400,
      unit: "£",
      explain: "Invoices increase the debt; credit notes and receipts reduce it.",
      working: "£1,800 + £2,400 − £300 − £1,500 = **£2,400**",
    },
    {
      kind: "journal",
      id: "part-payment",
      prompt: "A customer pays **£1,000** towards a £2,400 invoice that was raised and posted last month. Post the receipt.",
      accounts: ["Bank – current account", "Trade receivables", "Sales", "VAT control", "Suspense", "Trade payables"],
      answer: [
        { account: "Bank – current account", dr: 1000 },
        { account: "Trade receivables", cr: 1000 },
      ],
      explain: "The sale and its VAT were recorded when the invoice was raised. The receipt only reduces the debtor; £1,400 stays outstanding on that invoice. In the software, allocate the £1,000 to the specific invoice.",
    },
    {
      kind: "multi",
      id: "vat-invoice-requirements",
      prompt: "Which of these must appear on a **full** VAT invoice for a UK supply? Select all that apply.",
      options: [
        "The supplier's VAT registration number",
        "A unique invoice number",
        "The customer's VAT registration number",
        "The rate and amount of VAT",
        "The supplier's bank details",
        "The time of supply, if different from the invoice date",
      ],
      answers: [0, 1, 3, 5],
      explain: "The customer's VAT number and the supplier's bank details aren't required for a normal UK supply (though bank details are helpful). The supplier's VAT number, a unique number, the rate and VAT amount, and the time of supply where different are all required.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-bill-date",
      prompt: "A supplier invoice dated 28 March arrives on 3 April and is paid on 20 April. The client has quarterly VAT returns ending March. Which date should the bill be entered with?",
      options: ["3 April", "20 April", "28 March", "31 March"],
      answer: 2,
      explain: "Enter it at the invoice date (the tax point on a normal VAT invoice). The input tax belongs in the March quarter if the return hasn't been filed; otherwise it goes in the next return.",
    },
    {
      kind: "mcq",
      id: "q-remittance",
      prompt: "A customer pays £3,600 with a remittance covering invoices 205 (£1,200) and 208 (£2,400). Invoice 203 (£900) is older. How do you allocate it?",
      options: ["Oldest first: 203, then 205, then part of 208", "To 205 and 208, as the remittance says", "As an unallocated credit", "To Sales"],
      answer: 1,
      explain: "Follow the remittance. Invoice 203 may be disputed or paid separately; chase it, don't silently reallocate.",
    },
    {
      kind: "mcq",
      id: "q-simplified",
      prompt: "Up to what value (including VAT) can a retailer issue a simplified VAT invoice?",
      options: ["£100", "£250", "£500", "£1,000"],
      answer: 1,
      explain: "Simplified invoices are allowed for retail supplies up to £250 including VAT.",
    },
    {
      kind: "mcq",
      id: "q-duplicate",
      prompt: "The best defence against entering a supplier bill twice is:",
      options: ["Only entering bills when paid", "Searching by supplier and invoice number before entering, and using the invoice number as the reference", "Entering bills monthly in a batch", "Using a bank rule"],
      answer: 1,
      explain: "Consistent use of the supplier's invoice number as the reference lets the software (and you) spot duplicates.",
    },
    {
      kind: "mcq",
      id: "q-late",
      prompt: "No payment date has been agreed. When does a business-to-business invoice become late?",
      options: ["Immediately", "14 days after the invoice", "30 days after the later of receipt of the invoice and delivery", "60 days after the invoice"],
      answer: 2,
      explain: "Under the late payment rules, the default is 30 days after the later of the customer receiving the invoice and the goods or service being delivered.",
    },
  ],
  sources: [
    { label: "GOV.UK – VAT record keeping: VAT invoices", url: "https://www.gov.uk/vat-record-keeping/vat-invoices" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
    { label: "GOV.UK – Late commercial payments: charging interest and debt recovery", url: "https://www.gov.uk/late-commercial-payments-interest-debt-recovery" },
    { label: "GOV.UK – Invoicing and taking payment from customers", url: "https://www.gov.uk/invoicing-and-taking-payment-from-customers" },
  ],
};
