import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "how-vat-works",
  title: "How VAT works: output tax, input tax and the supply chain",
  level: "foundation",
  minutes: 25,
  taxYear: "2026/27",
  summary:
    "What VAT is, who actually bears it, and how it is collected in stages through the supply chain. The vocabulary you need for everything else in this track: supplies, output tax, input tax, the VAT fraction and the VAT control account.",
  objectives: [
    "Explain how VAT is collected at each stage of a supply chain but borne by the final consumer",
    "Distinguish output tax from input tax and work out the net amount payable or repayable",
    "Use the VAT fraction to extract VAT from a VAT-inclusive price",
    "Sort supplies into taxable (standard, reduced, zero), exempt and outside the scope",
    "Post sales and purchases through a VAT control account",
  ],
  body: [
    {
      kind: "md",
      md: `VAT is a tax on consumer spending. It's charged at each stage where a VAT-registered business sells goods or services, but the businesses in the middle of the chain get credit for the VAT they've paid. The result is that **only the final consumer actually bears the cost**. Businesses act as unpaid tax collectors for HMRC.

Two terms you'll use every day:

- **Output tax**: the VAT a registered business charges on its sales (its *supplies*). It's owed to HMRC.
- **Input tax**: the VAT a registered business pays on its purchases. If the purchase is for its taxable business, it can deduct this from its output tax.

On each VAT return the business pays HMRC **output tax minus input tax**. If input tax is bigger (for example a business that mostly sells zero-rated goods, or one that has just bought expensive equipment), HMRC repays the difference.`,
    },
    {
      kind: "table",
      caption: "VAT through a supply chain (standard rate 20%)",
      head: ["Stage", "Sells for (net)", "Output VAT", "Input VAT paid", "Pays HMRC"],
      rows: [
        ["Timber merchant sells timber to a joiner", "£1,000", "£200", "£0", "£200"],
        ["Joiner sells a staircase to a builder", "£2,500", "£500", "£200", "£300"],
        ["Builder sells the installed staircase to a homeowner", "£4,000", "£800", "£500", "£300"],
        ["Homeowner (not registered)", "", "", "Pays £800 VAT, can't recover", ""],
        ["**Total VAT collected by HMRC**", "", "", "", "**£800**"],
      ],
    },
    {
      kind: "md",
      md: `Notice that HMRC collects £800 in total, which is exactly 20% of the final £4,000 price. Each business has only paid VAT on the value **it added**. That's where the name comes from: Value Added Tax.

### What counts as a supply

VAT is charged on a **supply of goods or services** made in the UK **for consideration** (payment, which can be money or something else of value) by a **taxable person** (someone who is, or should be, VAT registered) **in the course or furtherance of a business**. The legislation is the Value Added Tax Act 1994 (VATA 1994), with detail in regulations and HMRC Notices. Some Notices have the force of law in particular paragraphs; most are HMRC's interpretation.`,
    },
    {
      kind: "table",
      caption: "The categories of supply",
      head: ["Category", "Rate", "Does it count towards the registration threshold?", "Can the supplier recover related input tax?", "Examples"],
      rows: [
        ["Standard-rated", "20%", "Yes", "Yes", "Most goods and services: furniture, accountancy fees, restaurant meals, adult clothing"],
        ["Reduced-rated", "5%", "Yes", "Yes", "Domestic gas, children's car seats, residential conversions"],
        ["Zero-rated", "0%", "Yes", "Yes", "Most basic food, books, children's clothing, new houses"],
        ["Exempt", "No VAT", "No", "No (subject to partial exemption)", "Insurance, finance, residential rent, most education and health"],
        ["Outside the scope", "No VAT", "No", "Depends on the activity", "Wages, dividends, donations with nothing in return, statutory fees"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Zero-rated is not the same as exempt",
      md: `They both mean the customer pays no VAT, which is why they get confused. The difference is on the **cost side**. A zero-rated supply is a *taxable* supply at 0%, so the business can recover the VAT on its costs. An exempt supply is *not* taxable, so the VAT on related costs is generally stuck with the business. A bakery (zero-rated bread) gets VAT refunds on its ovens; an insurance broker (exempt) does not.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The VAT fraction",
      md: `When you have a **VAT-inclusive** figure, extract the VAT using the VAT fraction:

- Standard rate 20%: **VAT = gross × 20/120 = gross × 1/6**
- Reduced rate 5%: **VAT = gross × 5/105 = gross × 1/21**

Don't calculate 20% of the gross figure. A £120 receipt contains £20 of VAT, not £24.`,
    },
    {
      kind: "md",
      md: `### Recording VAT in the books

Every VAT-registered client has a **VAT control account** (sometimes called the VAT liability account) on the balance sheet:

- Output tax on sales is **credited** to it (it's a liability to HMRC).
- Input tax on purchases is **debited** to it (it reduces the liability).
- The balance at the end of a VAT quarter should equal box 5 of the VAT return. When the business pays HMRC, debit the control account and credit the bank.

Sales and purchases go to the profit and loss account **net of recoverable VAT**. Irrecoverable VAT (for example on client entertaining) stays in the cost.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Reconcile the control account every quarter",
      md: `Before filing a return, check that the VAT control account balance for the period agrees with box 5. If it doesn't, something has been posted to the wrong period, coded with the wrong VAT code, or a payment to HMRC has been missed. Reconciling the control account is the quickest way to catch errors before HMRC does.`,
    },
  ],
  scenario: {
    title: "Explaining VAT to a newly registered client",
    narrative: `Tom Hartley runs **Hartley Joinery Ltd**, which has just registered for VAT. In its first month it:

- Sold a fitted kitchen to a VAT-registered builder for **£6,000 plus VAT**.
- Sold bespoke shelving to a homeowner for **£1,440 including VAT**.
- Bought timber and hardware for **£2,100 plus VAT** from a VAT-registered merchant.
- Paid **£3,800** in wages to two employees.

Tom asks: *"How much VAT do I owe, and why does the builder not seem to mind paying VAT but the homeowner complained?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: output tax.**
- Kitchen: £6,000 × 20% = **£1,200**.
- Shelving: the price is VAT-inclusive, so use the VAT fraction. £1,440 × 1/6 = **£240** (net sale £1,200).
- Total output tax = **£1,440**.

**Step 2: input tax.**
- Timber and hardware: £2,100 × 20% = **£420**.
- Wages are outside the scope of VAT, so there's nothing to recover.

**Step 3: net payable.** £1,440 − £420 = **£1,020** payable to HMRC.

**Step 4: answer Tom's question.** The builder is VAT registered, so it will claim the £1,200 back as its own input tax; for the builder the VAT is just a cash-flow item. The homeowner isn't registered and can't recover anything, so the VAT is a real cost to them. That's the point of VAT: it falls on the final consumer.`,
      },
      {
        kind: "journal",
        title: "Posting the shelving sale",
        narrative: "The sale goes to turnover net of VAT; the VAT is a liability to HMRC.",
        lines: [
          { account: "Trade debtors", dr: 1440 },
          { account: "Sales", cr: 1200 },
          { account: "VAT control account", cr: 240 },
        ],
      },
      {
        kind: "journal",
        title: "Posting the timber purchase",
        lines: [
          { account: "Purchases", dr: 2100 },
          { account: "VAT control account", dr: 420 },
          { account: "Trade creditors", cr: 2520 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "vat-fraction",
      prompt: "A client's till receipt for standard-rated stationery shows a total of **£87.60 including VAT**. How much VAT does it contain?",
      answer: 14.6,
      tolerance: 0.01,
      unit: "£",
      explain: "Use the VAT fraction for a VAT-inclusive amount at 20%: 1/6. A common mistake is to take 20% of the gross figure, which gives £17.52 and overstates the VAT.",
      working: "£87.60 × 1/6 = **£14.60**. Net = £73.00. Check: £73.00 × 20% = £14.60.",
    },
    {
      kind: "classify",
      id: "classify-supplies",
      prompt: "Classify each supply made by a UK business into its VAT category.",
      categories: ["Standard-rated (20%)", "Reduced-rated (5%)", "Zero-rated (0%)", "Exempt", "Outside the scope"],
      items: [
        { text: "Accountancy fees charged by a practice to a client", answer: 0 },
        { text: "A loaf of bread sold by a bakery for home consumption", answer: 2 },
        { text: "Buildings insurance arranged and provided by an insurer", answer: 3 },
        { text: "Salary paid by a company to its employee", answer: 4, why: "Employment isn't a supply for VAT." },
        { text: "A child's car seat sold by a retailer", answer: 1 },
        { text: "Monthly rent on a flat let to a residential tenant", answer: 3 },
        { text: "Printed paperback novel sold by a bookshop", answer: 2 },
        { text: "Dividend paid to a shareholder", answer: 4, why: "A return on investment, not consideration for a supply." },
      ],
      explain:
        "Most supplies are standard-rated unless the law specifically reduces, zero-rates or exempts them. Wages and dividends aren't payment for a supply at all, so they're outside the scope rather than exempt.",
    },
    {
      kind: "numeric",
      id: "net-payable",
      prompt:
        "In a quarter, a VAT-registered printer makes standard-rated sales of **£48,000 net** and zero-rated sales (printed books) of **£12,000**. It buys paper and ink for **£21,000 net** (standard-rated) and pays **£9,000** in wages. What is the net VAT **payable** for the quarter?",
      answer: 5400,
      unit: "£",
      explain:
        "Output tax is 20% of the standard-rated sales only; zero-rated sales carry 0% output VAT but are still taxable, so the input tax on paper and ink is fully recoverable. Wages are outside the scope.",
      working: "Output tax: £48,000 × 20% = £9,600. Input tax: £21,000 × 20% = £4,200. Payable: £9,600 − £4,200 = **£5,400**.",
    },
    {
      kind: "journal",
      id: "post-sale-invoice",
      prompt: "Post a sales invoice for consultancy services of **£3,000 plus VAT at 20%** issued on credit to a business customer.",
      accounts: ["Trade debtors", "Sales", "VAT control account", "Trade creditors", "Bank", "Purchases"],
      answer: [
        { account: "Trade debtors", dr: 3600 },
        { account: "Sales", cr: 3000 },
        { account: "VAT control account", cr: 600 },
      ],
      explain:
        "The customer owes the gross amount, the sale is recognised net, and the £600 output VAT is a liability to HMRC credited to the VAT control account.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-who-bears",
      prompt: "Who ultimately bears the cost of VAT?",
      options: ["Each business in the supply chain", "The manufacturer", "The final consumer who can't recover it", "HMRC"],
      answer: 2,
      explain: "Registered businesses recover the VAT they pay, so the tax falls on the final consumer (or anyone else who can't recover it, such as an exempt business).",
    },
    {
      kind: "mcq",
      id: "q-zero-vs-exempt",
      prompt: "What is the key difference between zero-rated and exempt supplies?",
      options: [
        "Zero-rated supplies carry VAT at 5%",
        "Input tax related to zero-rated supplies is recoverable; input tax related to exempt supplies generally isn't",
        "Exempt supplies count towards the registration threshold; zero-rated don't",
        "There is no practical difference",
      ],
      answer: 1,
      explain: "Zero-rated supplies are taxable at 0%, so related input tax is recoverable and they count towards the threshold. Exempt supplies don't.",
    },
    {
      kind: "mcq",
      id: "q-fraction-5",
      prompt: "A bill for domestic gas is £210 including VAT at 5%. How much VAT is included?",
      options: ["£10.00", "£10.50", "£35.00", "£42.00"],
      answer: 0,
      explain: "At 5% the VAT fraction is 5/105 = 1/21. £210 × 1/21 = £10.",
    },
    {
      kind: "mcq",
      id: "q-control-dr",
      prompt: "Which side of the VAT control account is input tax on purchases posted to?",
      options: ["Debit", "Credit", "Neither — it goes to the P&L", "It depends on whether the supplier is registered"],
      answer: 0,
      explain: "Input tax reduces the amount owed to HMRC, so it's a debit to the VAT control account. Output tax is a credit.",
    },
    {
      kind: "mcq",
      id: "q-outside-scope",
      prompt: "Which of these is outside the scope of VAT rather than exempt?",
      options: ["Life insurance premiums", "Bank loan interest", "Wages paid to employees", "Residential rent"],
      answer: 2,
      explain: "Employment isn't a supply for VAT, so wages are outside the scope. Insurance, interest and residential rent are exempt supplies.",
    },
    {
      kind: "mcq",
      id: "q-repayment",
      prompt: "A business's input tax for a quarter exceeds its output tax. What happens?",
      options: ["The excess is lost", "It is carried forward to the next year only", "HMRC repays the difference", "The business must deregister"],
      answer: 2,
      explain: "A return showing more input tax than output tax is a repayment return. HMRC repays the difference, subject to its normal checks.",
    },
  ],
  sources: [
    { label: "How VAT works (GOV.UK)", url: "https://www.gov.uk/how-vat-works" },
    { label: "VAT guide (VAT Notice 700)", url: "https://www.gov.uk/guidance/vat-guide-notice-700" },
    { label: "VAT rates on different goods and services", url: "https://www.gov.uk/guidance/rates-of-vat-on-different-goods-and-services" },
    { label: "VAT Act 1994 s24 – input tax and output tax", url: "https://www.legislation.gov.uk/ukpga/1994/23/section/24" },
  ],
};
