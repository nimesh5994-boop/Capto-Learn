import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "amending-returns-and-hmrc-enquiries",
  title: "Amending returns, reducing payments on account and HMRC enquiries",
  level: "advanced",
  minutes: 40,
  taxYear: "2026/27",
  summary:
    "Putting things right after a return has been filed: amending a return and the deadline for doing so, overpayment relief claims, reducing payments on account (and the interest risk if they're cut too far), HMRC's enquiry window and discovery time limits, how an enquiry runs, and penalties for inaccuracies.",
  objectives: [
    "Apply the deadline for amending a return, and use overpayment relief after it",
    "Advise on reducing payments on account and calculate the shortfall if they're reduced too far",
    "Work out the enquiry window and the discovery assessment time limits",
    "Manage an HMRC enquiry from opening letter to closure notice",
  ],
  body: [
    {
      kind: "md",
      md: `Self Assessment puts the burden on the taxpayer to get the return right. HMRC can check it later, and the taxpayer can correct it. Knowing the **time limits** on both sides is essential: they decide whether a client can still claim a repayment, and whether HMRC can still open an enquiry or raise an assessment.`,
    },
    {
      kind: "table",
      caption: "Key time limits for a 2025/26 return (filing deadline 31 January 2027)",
      head: ["Action", "Time limit", "For 2025/26"],
      rows: [
        ["Taxpayer amends the return", "12 months after the 31 January filing deadline", "31 January 2028"],
        ["HMRC opens an enquiry into an on-time return", "12 months after the date the return was filed", "e.g. filed 10 December 2026, so 10 December 2027"],
        ["HMRC opens an enquiry into a late or amended return", "The quarter day (31 Jan, 30 Apr, 31 Jul, 31 Oct) following the first anniversary of filing", "e.g. filed 20 March 2027, so 30 April 2028"],
        ["Overpayment relief claim", "4 years after the end of the tax year", "5 April 2030"],
        ["Discovery assessment: no careless or deliberate behaviour", "4 years after the end of the tax year", "5 April 2030"],
        ["Discovery assessment: careless", "6 years", "5 April 2032"],
        ["Discovery assessment: deliberate, or failure to notify", "20 years", "5 April 2046"],
      ],
    },
    {
      kind: "md",
      md: `### Amending a return

A taxpayer can amend an online return through their HMRC account or software from **72 hours** after filing, up to **12 months after the 31 January deadline** (TMA 1970 s9ZA). An amendment can increase or reduce the tax. Interest runs on any extra tax from the original due date. An amendment re-opens a short enquiry window, but only into the amendment.

**After the amendment deadline**, extra tax should still be disclosed to HMRC (in writing, or through a disclosure service). Tax overpaid can only be reclaimed through an **overpayment relief** claim (TMA 1970 Sch 1AB) within **4 years** of the end of the tax year. The claim must be in writing, state that it's a claim, give the year and the amount and why it was overpaid, and be **signed by the taxpayer**, not the agent. Overpayment relief isn't available where the error was in accordance with generally accepted practice at the time, or where the taxpayer could have claimed in time and simply didn't.`,
    },
    {
      kind: "md",
      md: `### Reducing payments on account

Payments on account (POAs) for 2026/27 are each **50% of the 2025/26 SA liability** (income tax and Class 4, less tax deducted at source). If income is expected to fall, the client can claim to **reduce** them, online or on form **SA303**, to 50% of the expected 2026/27 liability.

If the reduction turns out to be **too big**, **interest** is charged on each POA on the difference between what was paid and what should have been paid. "What should have been paid" is the **lower** of:
- the original POA (50% of last year's liability), and
- 50% of the actual liability for the year.

A **penalty** can also be charged if the claim to reduce was made fraudulently or negligently. Base reductions on a reasonable estimate and keep a note of the workings.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't reduce payments on account to zero to help cash flow",
      md: `Some clients ask to reduce POAs to nil just because they're short of cash. If the actual liability is higher, interest runs at **base rate plus 4%** from 31 January and 31 July, and HMRC may treat an unrealistic claim as negligent. If cash is the problem, talk to HMRC about a **Time to Pay** arrangement instead.`,
    },
    {
      kind: "md",
      md: `### HMRC enquiries

HMRC opens an enquiry (TMA 1970 s9A) by sending a written notice within the enquiry window. It can be:
- an **aspect enquiry**, into one or two specific items (for example, a large expense claim or a CGT computation), or
- a **full enquiry**, into the whole return and the underlying records.

HMRC can ask for documents and information under **Schedule 36 FA 2008** information notices. The taxpayer has a right of appeal against most of these. When HMRC has finished, it issues a **closure notice** setting out its conclusions and any amendments to the return. The taxpayer has **30 days** to appeal, and can then ask for a **statutory review** or go to the **First-tier Tribunal**. If an enquiry drags on without good reason, the taxpayer can apply to the tribunal for a direction that HMRC close it.

Once the enquiry window has closed and no enquiry was opened, HMRC can only reassess using a **discovery assessment** (TMA 1970 s29). This requires either careless or deliberate behaviour, or that the officer couldn't reasonably have been aware of the problem from the information made available.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Penalties for inaccuracies (FA 2007 Sch 24)",
      md: `An inaccurate return that understates tax can lead to a penalty, as a percentage of the potential lost revenue:

| Behaviour | Unprompted | Prompted |
|---|---|---|
| Careless | 0% to 30% | 15% to 30% |
| Deliberate | 20% to 70% | 35% to 70% |
| Deliberate and concealed | 30% to 100% | 50% to 100% |

There's no penalty where the taxpayer took **reasonable care**. Within each range, the penalty is reduced for the quality of the disclosure: telling, helping and giving access. HMRC can **suspend** a careless penalty for up to 2 years if the taxpayer agrees to conditions that will improve their record keeping. Separate, higher penalties apply to offshore matters.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Responding to an opening letter",
      md: `1. Check the letter was received within the enquiry window. If it's out of time, the enquiry is invalid.
2. Identify the scope: aspect or full.
3. Review the return and records **before** replying. If you find an error, disclose it now. It's prompted, but it still earns reductions.
4. Agree a realistic timetable with the officer and keep to it.
5. Send only what's asked for, accurately, and keep a log of all correspondence.
6. Check any proposed penalty: the behaviour, the prompted or unprompted status, and the reductions.`,
    },
  ],
  scenario: {
    title: "Two queries from Nadia Kowalski, freelance translator",
    narrative: `Nadia is a self-employed translator.

1. Her 2025/26 return, filed on **18 November 2026**, showed an SA liability of **£12,000**. That makes her 2026/27 POAs £6,000 each, due 31 January 2027 and 31 July 2027. A major client has gone, and she expects her 2026/27 liability to be about **£6,000**. She wants to reduce each POA to **£3,000**.
2. Going through her paperwork, she's found that she missed **£2,200** of allowable professional subscriptions and software costs from her 2024/25 return, which was filed on time in January 2026.

In the end, her actual 2026/27 liability turns out to be **£10,000**.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Query 1: reducing POAs.** She can claim to reduce each POA to £3,000 (50% of her £6,000 estimate) online or on form SA303, if the estimate is reasonable. Make a file note of the lost client and the projected figures.

**What happens when the actual liability is £10,000:**
- What each POA should have been: the **lower** of the original £6,000 and 50% × £10,000 = £5,000. So **£5,000**.
- She paid £3,000 each time, a **shortfall of £2,000 on each POA**.
- Interest runs on £2,000 from 31 January 2027 and on £2,000 from 31 July 2027, until paid.
- Her balancing payment on 31 January 2028 is £10,000 − £6,000 = £4,000. The interest is added to it.
- Her estimate was reasonable when she made it, so no penalty should arise.`,
      },
      {
        kind: "md",
        md: `**Query 2: the missed 2024/25 expenses.** The 2024/25 return can be amended until **31 January 2027** (12 months after the 31 January 2026 deadline). Amend it now through her account or our software. The extra £2,200 of expenses reduces her profit, income tax and Class 4 NIC, and the amendment will also reduce her 2025/26 POAs, which were based on 2024/25.

If she'd found the expenses after 31 January 2027, she'd need an **overpayment relief** claim, signed by her, by **5 April 2029**.

**HMRC's side:** her 2025/26 return was filed on time on 18 November 2026, so HMRC can open an enquiry until **18 November 2027**. The amendment to 2024/25 gives HMRC a new window into the amendment only, until the quarter day after the first anniversary of the amendment.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "poa-shortfall",
      prompt:
        "A client's 2025/26 SA liability was £14,000. She reduced each 2026/27 POA to £4,000. Her actual 2026/27 liability is £11,000. On how much of **each** POA will HMRC charge interest?",
      answer: 1500,
      unit: "£",
      explain: "Each POA should have been the lower of the original POA (£7,000) and 50% of the actual liability (£5,500). Interest runs on the shortfall from each POA's due date.",
      working: "Should have paid: lower of £7,000 and £5,500 = £5,500. Paid: £4,000. Shortfall: **£1,500** on each POA.",
    },
    {
      kind: "mcq",
      id: "amend-deadline",
      prompt: "A client filed her 2025/26 return on time. What is the last date she can amend it herself?",
      options: ["31 January 2027", "5 April 2027", "31 January 2028", "5 April 2030"],
      answer: 2,
      explain: "Amendments can be made until 12 months after the 31 January filing deadline: 31 January 2027 + 12 months = 31 January 2028.",
    },
    {
      kind: "mcq",
      id: "late-window",
      prompt: "A client files their 2025/26 return late, on 20 March 2027. Until when can HMRC open an enquiry?",
      options: ["20 March 2028", "31 January 2028", "30 April 2028", "31 July 2028"],
      answer: 2,
      explain: "For a late return the window runs to the quarter day following the first anniversary of filing. The anniversary is 20 March 2028, and the next quarter day is 30 April 2028.",
    },
    {
      kind: "mcq",
      id: "discovery-careless",
      prompt:
        "On 1 November 2026 HMRC discovers that a taxpayer carelessly left rental income off several old returns. No enquiries were opened. What is the **earliest** tax year HMRC can still assess?",
      options: ["2016/17", "2019/20", "2020/21", "2022/23"],
      answer: 2,
      explain:
        "For careless behaviour the limit is 6 years after the end of the tax year. 2020/21 ended on 5 April 2021, so it can be assessed until 5 April 2027. 2019/20's limit expired on 5 April 2026.",
    },
    {
      kind: "classify",
      id: "fix-route",
      prompt: "It's October 2026. What's the right route for each correction?",
      categories: ["Amend the return", "Overpayment relief claim", "Out of time"],
      items: [
        { text: "Missed expenses on the 2024/25 return (filed on time)", answer: 0, why: "It can be amended until 31 January 2027." },
        { text: "Tax overpaid on the 2022/23 return because pension contributions were left off", answer: 1, why: "Past the amendment deadline, but within 4 years of 5 April 2023." },
        { text: "Tax overpaid on the 2021/22 return", answer: 2, why: "The 4-year limit for overpayment relief expired on 5 April 2026." },
        { text: "Gift Aid omitted from the 2025/26 return filed last month", answer: 0 },
      ],
      explain: "Amend within 12 months of the filing deadline. After that, claim overpayment relief within 4 years of the end of the tax year. After that, it's normally too late.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-enquiry-ontime",
      prompt: "How long does HMRC have to open an enquiry into a return filed on time?",
      options: ["12 months from the filing deadline", "12 months from the date the return was filed", "4 years", "Until the next return is filed"],
      answer: 1,
      explain: "For on-time returns, the window runs for 12 months from the date the return was received (TMA 1970 s9A).",
    },
    {
      kind: "mcq",
      id: "q-opr-sign",
      prompt: "Who must sign an overpayment relief claim?",
      options: ["The agent", "The taxpayer", "Either", "HMRC"],
      answer: 1,
      explain: "GOV.UK guidance says the claim must be signed by the taxpayer, not a tax agent.",
    },
    {
      kind: "mcq",
      id: "q-sa303",
      prompt: "Which form is used to claim to reduce payments on account on paper?",
      options: ["SA100", "SA302", "SA303", "SA1"],
      answer: 2,
      explain: "SA303 is the paper claim to reduce payments on account. It can also be done online.",
    },
    {
      kind: "mcq",
      id: "q-deliberate-limit",
      prompt: "What is the time limit for a discovery assessment where tax was lost deliberately?",
      options: ["4 years", "6 years", "12 years", "20 years"],
      answer: 3,
      explain: "20 years after the end of the tax year for deliberate behaviour or a failure to notify chargeability. Offshore matters have their own extended limits.",
    },
    {
      kind: "mcq",
      id: "q-closure-appeal",
      prompt: "How long does a taxpayer have to appeal against a closure notice?",
      options: ["14 days", "30 days", "60 days", "12 months"],
      answer: 1,
      explain: "Appeals against closure notices and assessments must normally be made within 30 days.",
    },
    {
      kind: "mcq",
      id: "q-prompted",
      prompt: "A client tells HMRC about a careless error after receiving an enquiry letter about that return. What penalty range applies?",
      options: ["0% to 30%", "15% to 30%", "20% to 70%", "No penalty"],
      answer: 1,
      explain: "Once HMRC has opened an enquiry, the disclosure is normally prompted. Careless and prompted is 15% to 30%.",
    },
  ],
  sources: [
    { label: "Self Assessment tax returns: corrections", url: "https://www.gov.uk/self-assessment-tax-returns/corrections" },
    { label: "Payments on account (GOV.UK)", url: "https://www.gov.uk/understand-self-assessment-bill/payments-on-account" },
    { label: "SAM31100 – compliance: enquiry work: enquiry window", url: "https://www.gov.uk/hmrc-internal-manuals/self-assessment-manual/sam31100" },
    { label: "EM3214 – discovery: time limits for individuals (TMA 1970 ss34 and 36)", url: "https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em3214" },
    { label: "Compliance checks: penalties for inaccuracies (CC/FS7a)", url: "https://www.gov.uk/government/publications/compliance-checks-penalties-for-inaccuracies-in-returns-or-documents-ccfs7a/compliance-checks-for-penalties-of-inaccuracies-in-returns-or-documents-ccfs7a-factsheet" },
    { label: "Taxes Management Act 1970 s9A – notice of enquiry", url: "https://www.legislation.gov.uk/ukpga/1970/9/section/9A" },
  ],
};
