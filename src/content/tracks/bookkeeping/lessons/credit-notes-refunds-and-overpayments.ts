import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "credit-notes-refunds-and-overpayments",
  title: "Credit notes, refunds and overpayments",
  level: "foundation",
  minutes: 30,
  taxYear: "2026/27",
  summary:
    "Handling money and invoices that go backwards: issuing and receiving credit notes, refunding customers, recording supplier refunds, dealing with overpayments and credit balances, and keeping the VAT right.",
  objectives: [
    "Post credit notes issued and received, including the VAT adjustment",
    "Record refunds paid and received against the right ledger account",
    "Deal with customer overpayments and supplier credit balances",
    "Explain why a sent invoice should be credited rather than deleted",
  ],
  body: [
    {
      kind: "md",
      md: `Sales and purchases don't always go to plan. Goods are returned, a price is disputed, an invoice is raised twice, a customer pays an invoice twice. Each of these needs to go **backwards** through the same ledger it came in on, so the customer or supplier account, the VAT return and the income or cost all stay right.

The tool for reducing an invoice is a **credit note**. The tool for returning money is a **refund**, recorded against the customer's or supplier's account, not against income or expenses directly.`,
    },
    {
      kind: "table",
      caption: "The four movements",
      head: ["Event", "Entry", "Effect"],
      rows: [
        ["Credit note issued to a customer", "Dr Sales (or Sales returns), Dr VAT control, Cr Trade receivables", "Reduces income, output VAT and what the customer owes"],
        ["Refund paid to a customer", "Dr Trade receivables, Cr Bank", "Clears a credit balance on the customer's account"],
        ["Credit note received from a supplier", "Dr Trade payables, Cr Purchases (or the expense), Cr VAT control", "Reduces cost, input VAT and what's owed"],
        ["Refund received from a supplier", "Dr Bank, Cr Trade payables", "Clears a debit balance on the supplier's account"],
      ],
    },
    {
      kind: "journal",
      title: "Credit note issued for returned goods",
      narrative: "A customer returns goods invoiced at £500 + £100 VAT. The credit note reverses the original invoice for those goods.",
      lines: [
        { account: "Sales returns", dr: 500 },
        { account: "VAT control", dr: 100 },
        { account: "Trade receivables", cr: 600 },
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "VAT on credit notes",
      md: `If the value of a supply is reduced after the invoice has been issued (returns, price reductions, cancelled orders), the supplier can reduce its output tax, and the customer must reduce its input tax. The adjustment is usually supported by a **credit note** showing the same kind of detail as a VAT invoice (identifying the original invoice, the reason, the VAT being credited) and is made in the VAT period in which the credit is given. See VAT Notice 700 for the detailed rules on credit and debit notes.`,
    },
    {
      kind: "md",
      md: `### Overpayments and credit balances

A customer sometimes pays more than they owe: paying an invoice twice, or paying in full after a credit note. The customer's account then shows a **credit balance** (the business owes the customer). Options:

1. **Refund it:** Dr Trade receivables, Cr Bank, allocated against the overpayment or credit note.
2. **Leave it on account** to be allocated against the customer's next invoice, if the customer agrees.

The same happens in reverse with suppliers: a supplier credit note or a double payment leaves a **debit balance** on the supplier's account (the supplier owes the client). Chase the refund, or agree to offset it against the next bill.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't delete sent invoices",
      md: `If an invoice has been sent to a customer, **don't delete or void it** to make it disappear. Issue a credit note. Deleting breaks the sequential numbering, removes the audit trail, and if the VAT return including that invoice has already been filed, the books and the return no longer agree. Voiding is only appropriate for a draft or an invoice raised in error that was never issued, according to your firm's policy.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Refunds coded to income or expenses",
      md: `A common feed error: a refund **received from a supplier** is coded to Sales, or a refund **paid to a customer** is coded to an expense. Both distort turnover and costs and leave balances hanging on the ledgers. Match refunds to the credit note or overpayment on the right customer or supplier account.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Review credit balances monthly",
      md: `Credit balances on the aged debtors report and debit balances on the aged creditors report are always worth a look. They're often unallocated payments, duplicated invoices or refunds owed. Left for a year they make both reports, and the balance sheet, unreliable.`,
    },
  ],
  scenario: {
    title: "Sorting out Ashby Dental's account at Elmfield Dental Supplies",
    narrative: `**Elmfield Dental Supplies Ltd** is VAT registered. Customer **Ashby Dental Practice** was invoiced **£1,800** (£1,500 + £300 VAT) on 3 May. On 10 May it returned faulty goods and Elmfield issued a credit note for **£600** (£500 + £100 VAT). On 2 June Ashby paid the **full £1,800**, ignoring the credit note.

Separately, Elmfield received a **£240** credit note (£200 + £40 VAT) from a supplier, Brightwhite Ltd, for a short delivery, and Brightwhite refunded the £240 by bank transfer because the original bill had already been paid.`,
    walkthrough: [
      {
        kind: "table",
        caption: "Ashby Dental's account in the sales ledger",
        head: ["Date", "Detail", "Debit", "Credit", "Balance"],
        rows: [
          ["3 May", "Invoice", "£1,800", "", "£1,800 Dr"],
          ["10 May", "Credit note", "", "£600", "£1,200 Dr"],
          ["2 June", "Receipt", "", "£1,800", "£600 Cr"],
        ],
      },
      {
        kind: "md",
        md: `Ashby has overpaid by **£600**. Contact the practice: refund it, or hold it on account against its next order. If they want a refund:`,
      },
      {
        kind: "journal",
        title: "Refunding Ashby's overpayment",
        lines: [
          { account: "Trade receivables", dr: 600 },
          { account: "Bank – current account", cr: 600 },
        ],
        narrative: "In the software, record the refund against the credit note or overpayment on Ashby's account, not as a spend-money transaction to an expense.",
      },
      {
        kind: "md",
        md: `**The supplier credit note and refund.** Enter the credit note against Brightwhite: Dr Trade payables £240, Cr Purchases £200, Cr VAT control £40. Brightwhite's account now has a £240 **debit** balance (it owes Elmfield). When the refund lands in the bank, match it to that credit note: Dr Bank £240, Cr Trade payables £240. Brightwhite's balance returns to nil.

If the junior had coded the £240 refund straight to Sales, turnover would be overstated, the input VAT reduction would be missed, and Brightwhite would still show a debit balance.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "credit-note-issued",
      prompt: "A VAT-registered client issues a credit note for **£360** including VAT at 20% for a pricing error on an invoice already posted. Post the credit note.",
      accounts: ["Sales returns", "VAT control", "Trade receivables", "Bank – current account", "Purchases", "Trade payables"],
      answer: [
        { account: "Sales returns", dr: 300 },
        { account: "VAT control", dr: 60 },
        { account: "Trade receivables", cr: 360 },
      ],
      explain: "VAT is 1/6 of the gross: £360 ÷ 6 = £60. The credit note reduces income by £300, output VAT by £60, and the customer's debt by £360. No money moves yet.",
    },
    {
      kind: "journal",
      id: "refund-overpayment",
      prompt: "A customer paid a **£150** invoice twice. The client refunds the duplicate payment by bank transfer. Post the refund.",
      accounts: ["Trade receivables", "Bank – current account", "Sales", "Sales returns", "VAT control", "Suspense"],
      answer: [
        { account: "Trade receivables", dr: 150 },
        { account: "Bank – current account", cr: 150 },
      ],
      explain: "The double payment created a £150 credit balance on the customer's account. The refund clears it. Sales and VAT aren't affected: the sale only happened once.",
    },
    {
      kind: "numeric",
      id: "refund-due",
      prompt: "A customer was invoiced **£2,400**, then issued a credit note for **£480**. The customer later paid **£2,400**. How much should the client refund (assuming no other transactions)?",
      answer: 480,
      unit: "£",
      explain: "After the credit note the customer owed £1,920. Paying £2,400 leaves a credit balance of £480.",
      working: "£2,400 − £480 − £2,400 = −£480, a **£480** credit balance to refund.",
    },
    {
      kind: "classify",
      id: "classify-backwards",
      prompt: "What's the right action for each situation?",
      categories: ["Issue a credit note", "Record a refund against the customer/supplier account", "Allocate an existing credit to a new invoice"],
      items: [
        { text: "A customer returns a faulty item from an invoice already sent", answer: 0 },
        { text: "Money arrives from a supplier who has already issued a credit note", answer: 1 },
        { text: "A customer with a £200 credit balance places a new £500 order and asks to use the credit", answer: 2 },
        { text: "An invoice was sent to the customer for the wrong amount", answer: 0 },
        { text: "The client pays back a customer's duplicate payment", answer: 1 },
      ],
      explain: "Credit notes reduce an invoice. Refunds move money to clear a credit (or debit) balance. Existing credits can be allocated to new invoices if the customer agrees.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-delete-invoice",
      prompt: "An invoice included in a filed VAT return was raised for the wrong customer. What should you do?",
      options: ["Delete it", "Issue a credit note and raise a new invoice to the right customer", "Edit the customer name on the original", "Ignore it"],
      answer: 1,
      explain: "Crediting keeps the audit trail and the filed return consistent; the corrections fall into the current VAT period.",
    },
    {
      kind: "mcq",
      id: "q-credit-balance",
      prompt: "A credit balance on a customer's account in the aged debtors report means:",
      options: ["The customer owes more", "The business owes the customer (overpayment or unallocated credit)", "An irrecoverable debt", "A VAT error"],
      answer: 1,
      explain: "Receivables are normally debits. A credit balance means money or credit is due back to the customer.",
    },
    {
      kind: "mcq",
      id: "q-supplier-refund-code",
      prompt: "A supplier refund of £120 is coded to Sales on the bank feed. The effect is:",
      options: ["No effect", "Turnover overstated and the supplier's balance left wrong", "Purchases overstated only", "VAT overpaid only"],
      answer: 1,
      explain: "The refund should clear the supplier's debit balance created by their credit note. Coding it to Sales inflates income.",
    },
    {
      kind: "mcq",
      id: "q-credit-note-vat",
      prompt: "A customer receives a credit note from its supplier showing £50 of VAT. The customer must:",
      options: ["Do nothing", "Reduce its input tax by £50", "Increase its output tax by £50 in box 6", "Claim an extra £50 input tax"],
      answer: 1,
      explain: "The customer originally claimed input tax on the full invoice; the credit reduces it.",
    },
    {
      kind: "mcq",
      id: "q-hold-on-account",
      prompt: "A customer overpaid by £300 and asks you to hold it against future orders. In the books:",
      options: ["Code £300 to Sales now", "Leave it as a credit on their account and allocate to the next invoice", "Transfer it to Suspense", "Refund it anyway"],
      answer: 1,
      explain: "It remains a liability to the customer until used against an invoice.",
    },
  ],
  sources: [
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "GOV.UK – VAT record keeping: VAT invoices", url: "https://www.gov.uk/vat-record-keeping/vat-invoices" },
    { label: "HMRC VAT Notice 700/21 – keeping VAT records", url: "https://www.gov.uk/guidance/record-keeping-for-vat-notice-70021" },
  ],
};
