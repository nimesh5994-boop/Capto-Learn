import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "errors-penalties-and-compliance-checks",
  title: "Correcting errors, penalties and HMRC compliance checks",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "What to do when a past VAT return turns out to be wrong: the error correction thresholds and the 4-year limit, the points-based late submission penalties, the late payment penalties and interest, penalties for inaccuracies, and how to handle an HMRC VAT compliance check for a client.",
  objectives: [
    "Decide whether an error can be corrected on the next return or must be disclosed separately",
    "Apply the late submission points system and work out late payment penalties",
    "Classify inaccuracy behaviour and the penalty ranges for prompted and unprompted disclosures",
    "Prepare a client for an HMRC VAT compliance check",
  ],
  body: [
    {
      kind: "md",
      md: `Every practice finds errors in past VAT returns: a missed reverse charge, a blocked car claimed, a sale posted to the wrong quarter. What matters is correcting them the right way and quickly. The **method** affects interest and penalties, and a well-handled **unprompted disclosure** can reduce a careless penalty to nil.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Error correction thresholds (Notice 700/45)",
      md: `Work out the **net** value of all errors found: errors in HMRC's favour minus errors in the client's favour. Then:

- **Method 1: correct on the next return** if the net error is **£10,000 or less**, **or** is between £10,000 and **£50,000** and no more than **1% of box 6** on the return for the period in which the error is **discovered**.
- **Method 2: notify HMRC separately** (online error correction notification, or in writing) if the net error is above those limits, if it's **deliberate**, or if the client simply chooses to.

Net errors over **£50,000** always require Method 2.`,
    },
    {
      kind: "table",
      caption: "Method 1 limit at different turnover levels",
      head: ["Box 6 on the current return", "1% of box 6", "Method 1 limit"],
      rows: [
        ["£400,000", "£4,000", "£10,000 (the £10,000 floor applies)"],
        ["£2,500,000", "£25,000", "£25,000"],
        ["£7,000,000", "£70,000", "£50,000 (the ceiling applies)"],
      ],
    },
    {
      kind: "md",
      md: `**Time limit.** Errors can be corrected for **4 years**. For output tax and over-claimed input tax, the 4 years run from the end of the period in which the error occurred. For under-claimed input tax, they run from the due date of that period's return. The 4-year limit doesn't protect deliberate errors: HMRC can assess those for up to 20 years (VATA 1994 s77).

Correcting under Method 1 is **not** a disclosure for penalty purposes. If the error was careless and you want the penalty protection of a full unprompted disclosure, notify HMRC separately even when Method 1 would be allowed.`,
    },
    {
      kind: "md",
      md: `### Late submission penalties: points

Since 1 January 2023 a late VAT return earns **one penalty point**, including nil and repayment returns. When the points reach the **threshold** for the client's return frequency, a **£200** penalty is charged, and another £200 for each further late return while at the threshold.

| Return frequency | Points threshold | Period of compliance to reset to zero |
|---|---|---|
| Annual | 2 | 24 months (2 returns on time) |
| Quarterly | 4 | 12 months (4 returns on time) |
| Monthly | 5 | 6 months (6 returns on time) |

At the threshold, the points only reset after the period of compliance **and** once every return due in the previous 24 months has been filed. Below the threshold, each point expires automatically about **24 months** after the month of the missed deadline.`,
    },
    {
      kind: "md",
      md: `### Late payment penalties and interest

For VAT periods starting on or after 1 April 2025:

| Days overdue | Penalty |
|---|---|
| 1 to 15 | No penalty if paid in full, or a Time to Pay arrangement is agreed, by day 15 |
| 16 to 30 | **First penalty: 3%** of the VAT still unpaid at day 15 |
| 31 or more | First penalty: 3% of the VAT unpaid at day 15 **plus 3%** of the VAT unpaid at day 30. **Second penalty:** a daily charge at **10% a year** on the balance outstanding from day 31 |

**Late payment interest** also runs from the day after the due date until payment, at **Bank of England base rate plus 4%** (from 6 April 2025). Check the current rate on GOV.UK when calculating it. A **Time to Pay** arrangement agreed early stops the penalties from building up, but interest still runs.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Inaccuracy penalties are a percentage of the VAT",
      md: `Where an error in a return is **careless** or **deliberate**, HMRC can charge a penalty as a percentage of the **potential lost revenue** (FA 2007 Sch 24, factsheet CC/FS7a):

| Behaviour | Unprompted disclosure | Prompted disclosure |
|---|---|---|
| Careless | 0% to 30% | 15% to 30% |
| Deliberate | 20% to 70% | 35% to 70% |
| Deliberate and concealed | 30% to 100% | 50% to 100% |

There's **no penalty** if the client took reasonable care. Within each range, the penalty is reduced for the quality of disclosure: **telling** HMRC, **helping** it to quantify the error, and **giving** access to records. A disclosure is unprompted only if it's made before the client has reason to believe HMRC has discovered or is about to discover the error.`,
    },
    {
      kind: "md",
      md: `### HMRC compliance checks

HMRC opens a VAT compliance check by letter or phone. It may want to visit the business or ask for records to be sent in. With the opening letter, HMRC sends **factsheet CC/FS1a**, which sets out the client's rights and obligations.

**How to handle one:**
1. **Find out the scope.** Ask which periods and issues HMRC wants to look at, and what records it wants to see.
2. **Do your own review first.** Re-check the periods in question, especially reverse charge, cars, entertaining, partial exemption and the box 6 and 7 figures. If you find errors, a disclosure made now is prompted, but it still earns a reduction for the quality of disclosure.
3. **Prepare the records**: the VAT account, VAT invoices, MTD digital records and bridging, and the client's working papers. Only give HMRC what it has asked for, but give it promptly and accurately.
4. **Brief the client before any visit.** Explain what HMRC will ask, and that the client should answer factually and not guess.
5. **Agree the outcome in writing.** If HMRC raises an assessment or penalty, check the behaviour category and the disclosure reductions before accepting it. The client can request a review or appeal to the tribunal.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Keep an errors log",
      md: `Keep a running log on each VAT client's file of errors found, the method used to correct them and the return they were corrected on. HMRC often asks "has the business made any errors?" at the start of a check, and a clear log shows reasonable care.`,
    },
  ],
  scenario: {
    title: "An error review for Marlow Print & Packaging Ltd",
    narrative: `Marlow Print & Packaging Ltd has turnover of about £1.8 million a year and files quarterly VAT returns. While preparing the September 2026 return (box 6: **£460,000**), the new senior finds three errors in earlier periods:

1. Output VAT of **£14,200** was missed on a large sale invoiced in March 2026 and posted to the wrong period code.
2. Input tax of **£2,600** on a director's car purchase was claimed in December 2025. The car is available for private use.
3. Input tax of **£3,900** on a new printing machine in June 2025 was never claimed.

The finance director asks: *"Can we just put this right on the September return?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: net the errors.** In HMRC's favour: £14,200 + £2,600 = £16,800. In the company's favour: £3,900. **Net error = £12,900** owed to HMRC.

**Step 2: the Method 1 limit.** The net error is over £10,000, so check the 1% test against box 6 of the **current** return: 1% × £460,000 = **£4,600**. £12,900 is more than £4,600, so Method 1 is **not** available.

**Step 3: Method 2.** Notify HMRC using the online error correction notification, giving the periods, amounts and how the errors happened. HMRC will issue an assessment, with late payment interest on the underpaid VAT.`,
      },
      {
        kind: "md",
        md: `**Step 4: penalty exposure.** All three errors appear to be careless mistakes, with no evidence of anything deliberate. Because Marlow is disclosing before HMRC has any reason to look, the disclosure is **unprompted**, and a careless penalty can be reduced to **0%** with full telling, helping and giving.

**Step 5: fix the cause.** The missed output VAT came from a period-coding error, and the car claim came from a junior posting a car invoice as a van. Add a quarter-end check of large invoices against the VAT period, and a fixed-asset check that car invoices are always coded as blocked.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Don't net to get under the limit artificially",
        md: `The netting rule covers genuine errors found at the same time. Don't hold back known errors to correct them over several returns so that each one stays under the limit. HMRC treats that as a failure to disclose.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "method1-limit",
      prompt:
        "A client finds errors totalling £31,000 in HMRC's favour and £4,000 in its own favour. Box 6 on the current return (the period of discovery) is £2,900,000. What is the maximum net error it can correct on the return under Method 1?",
      answer: 29000,
      unit: "£",
      explain:
        "The Method 1 limit is the greater of £10,000 and 1% of the current box 6, capped at £50,000. Here that's £29,000. The net error is £27,000, so it can be corrected on the return.",
      working: "1% × £2,900,000 = **£29,000** (between £10,000 and £50,000). Net error £31,000 − £4,000 = £27,000, which is within the limit.",
    },
    {
      kind: "numeric",
      id: "lpp-first",
      prompt:
        "A client's VAT of £20,000 for the quarter to 30 June 2026 was due on 7 August 2026. It paid £8,000 on day 10 and the remaining £12,000 on day 24. No Time to Pay arrangement was made. What is the **first late payment penalty**?",
      answer: 360,
      unit: "£",
      explain:
        "Nothing was outstanding after day 30, so only the first penalty at day 15 applies: 3% of the VAT still unpaid at day 15. There's no second element and no second penalty.",
      working: "Unpaid at day 15: £12,000. Penalty: 3% × £12,000 = **£360**. Late payment interest is also due from the due date on the amounts paid late.",
    },
    {
      kind: "numeric",
      id: "lpp-31",
      prompt:
        "Another client's VAT of £15,000 for a quarter starting 1 April 2026 is paid in full on day 45 after the due date, with no Time to Pay arrangement. What is the **first late payment penalty** (ignore the second penalty and interest)?",
      answer: 900,
      unit: "£",
      explain: "Once more than 30 days have passed, the first penalty is 3% of the amount outstanding at day 15 plus 3% of the amount outstanding at day 30. The second penalty then runs daily at 10% a year from day 31.",
      working: "3% × £15,000 + 3% × £15,000 = £450 + £450 = **£900**.",
    },
    {
      kind: "classify",
      id: "behaviour",
      prompt: "Classify the likely behaviour behind each inaccuracy.",
      categories: ["Reasonable care (no penalty)", "Careless", "Deliberate", "Deliberate and concealed"],
      items: [
        { text: "Client followed written advice from HMRC's helpline that later turned out to be wrong", answer: 0, why: "Relying on specific guidance from HMRC is evidence of reasonable care." },
        { text: "Bookkeeper coded a car purchase as a van without checking the invoice", answer: 1, why: "A failure to take reasonable care, but not intentional." },
        { text: "Director knowingly left cash sales out of the records to reduce VAT", answer: 2, why: "Knowingly understating the return." },
        { text: "Director created false purchase invoices to support inflated input tax claims", answer: 3, why: "A deliberate inaccuracy with active steps to hide it." },
      ],
      explain:
        "Behaviour drives the penalty range. Reasonable care means no penalty. Careless means a failure to take reasonable care. Deliberate means a knowing inaccuracy. Concealed means the person also took steps to hide it, such as fabricating documents.",
    },
    {
      kind: "mcq",
      id: "points-threshold",
      prompt: "A quarterly VAT filer already has 3 penalty points and submits its next return late. What happens?",
      options: ["A fourth point and a £200 penalty", "A fourth point only", "A £400 penalty", "Nothing, because it's a repayment return"],
      answer: 0,
      explain: "The threshold for quarterly filers is 4 points. Reaching it triggers a £200 penalty, and each further late return while at the threshold costs another £200. Nil and repayment returns count too.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ceiling",
      prompt: "Above what net error value must an error always be notified separately (Method 2)?",
      options: ["£10,000", "£25,000", "£50,000", "£100,000"],
      answer: 2,
      explain: "Net errors over £50,000 always need Method 2, whatever the turnover.",
    },
    {
      kind: "mcq",
      id: "q-box6-period",
      prompt: "Which return's box 6 figure is used for the 1% test?",
      options: ["The return on which the error was made", "The return for the period in which the error is discovered", "The average of the last four returns", "The annual turnover"],
      answer: 1,
      explain: "Notice 700/45 measures the 1% against box 6 of the return for the period of discovery.",
    },
    {
      kind: "mcq",
      id: "q-deliberate",
      prompt: "A client discovers a deliberate error of £3,000. How should it be corrected?",
      options: ["On the next return, because it's under £10,000", "By separate notification to HMRC (Method 2)", "It doesn't need correcting if under £10,000", "Spread over four returns"],
      answer: 1,
      explain: "Deliberate errors must always be disclosed separately, whatever their size.",
    },
    {
      kind: "mcq",
      id: "q-monthly-threshold",
      prompt: "What is the late submission points threshold for a business filing monthly VAT returns?",
      options: ["2", "4", "5", "12"],
      answer: 2,
      explain: "The thresholds are 2 for annual, 4 for quarterly and 5 for monthly filers.",
    },
    {
      kind: "mcq",
      id: "q-careless-unprompted",
      prompt: "What is the penalty range for a careless inaccuracy disclosed **unprompted**?",
      options: ["0% to 30%", "15% to 30%", "20% to 70%", "30% to 100%"],
      answer: 0,
      explain: "Careless and unprompted is 0% to 30%, so a full disclosure can bring the penalty down to nil. Prompted careless disclosures have a 15% minimum.",
    },
    {
      kind: "mcq",
      id: "q-interest",
      prompt: "At what rate does late payment interest on VAT run from 6 April 2025?",
      options: ["Base rate plus 2.5%", "Base rate plus 4%", "A flat 10% a year", "Base rate minus 1%"],
      answer: 1,
      explain: "Late payment interest is base rate plus 4% from 6 April 2025. Base rate minus 1% (minimum 0.5%) is the repayment interest rate.",
    },
  ],
  sources: [
    { label: "How to correct VAT errors and make adjustments or claims (VAT Notice 700/45)", url: "https://www.gov.uk/guidance/how-to-correct-vat-errors-and-make-adjustments-or-claims-vat-notice-70045" },
    { label: "Penalty points and penalties if you submit your VAT Return late", url: "https://www.gov.uk/guidance/penalty-points-and-penalties-if-you-submit-your-vat-return-late" },
    { label: "Remove penalty points you've received after submitting your VAT Return late", url: "https://www.gov.uk/guidance/remove-penalty-points-youve-received-after-submitting-your-vat-return-late" },
    { label: "How late payment penalties work if you pay VAT late", url: "https://www.gov.uk/guidance/how-late-payment-penalties-work-if-you-pay-vat-late" },
    { label: "HMRC interest rates for late and early payments", url: "https://www.gov.uk/government/publications/rates-and-allowances-hmrc-interest-rates-for-late-and-early-payments/rates-and-allowances-hmrc-interest-rates" },
    { label: "Compliance checks: penalties for inaccuracies (CC/FS7a)", url: "https://www.gov.uk/government/publications/compliance-checks-penalties-for-inaccuracies-in-returns-or-documents-ccfs7a/compliance-checks-for-penalties-of-inaccuracies-in-returns-or-documents-ccfs7a-factsheet" },
    { label: "About compliance checks (CC/FS1a)", url: "https://www.gov.uk/government/publications/general-information-about-compliance-checks-ccfs1a/about-compliance-checks-ccfs1a" },
  ],
};
