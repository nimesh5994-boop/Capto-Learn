import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "hmrc-enquiries-and-time-limits",
  title: "HMRC enquiries, discovery, penalties and time limits",
  level: "advanced",
  minutes: 40,
  summary:
    "The compliance framework around a company tax return: the enquiry window, how an enquiry runs and closes, discovery assessments and their 4/6/20-year limits, amendments and overpayment relief, inaccuracy penalties and how disclosure reduces them, and record keeping.",
  objectives: [
    "Work out the enquiry window for single companies, group companies and late returns",
    "Apply the time limits for amendments, overpayment relief and discovery assessments",
    "Calculate the range of inaccuracy penalties for careless and deliberate errors, prompted and unprompted",
    "Advise a client on handling an enquiry and on disclosing an error",
  ],
  body: [
    {
      kind: "md",
      md: `Filing the CT600 isn't the end. HMRC can check the return within set time limits, and can go back further if it discovers an under-assessment caused by carelessness or deliberate behaviour. As the agent, you need to know when a year is "closed", what to do when an enquiry letter arrives, and how to limit penalties if the client (or you) finds an error.`,
    },
    {
      kind: "table",
      caption: "The enquiry window (FA 1998 Sch 18 para 24)",
      head: ["Company", "Return filed on time", "Return filed late"],
      rows: [
        ["Single company, or member of a small group", "12 months from the date the return was **delivered**", "Up to the quarter day (31 January, 30 April, 31 July, 31 October) after the first anniversary of delivery"],
        ["Member of a group that isn't small", "12 months from the **filing date**", "As above"],
        ["Amended return", "Extended to the quarter day after the first anniversary of the amendment, but only for matters in the amendment", ""],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "File early to close the year early",
      md: `For a standalone company, filing early **starts the enquiry clock early**. A return filed 5 months after the year end is safe from a routine enquiry 17 months after the year end, instead of 24 months if it's filed on the last day.`,
    },
    {
      kind: "md",
      md: `### How an enquiry runs

- HMRC issues a **notice of enquiry**, which may be a full enquiry or an "aspect" enquiry into one item (e.g. directors' loan accounts, R&D claims, capital allowances).
- It usually asks for information and documents informally first. If needed, it can issue a formal **information notice** (FA 2008 Sch 36), which can be appealed in some respects.
- The company can still amend its return during an enquiry, but the amendment doesn't take effect until the enquiry closes.
- HMRC ends the enquiry with a **closure notice** stating its conclusions and any amendment. The company has **30 days** to appeal. If the enquiry drags on, the company can apply to the tribunal for a direction requiring HMRC to close it. **Partial closure notices** can settle one issue while others continue.`,
    },
    {
      kind: "table",
      caption: "Time limits after the enquiry window",
      head: ["Action", "Time limit (from the end of the accounting period, unless stated)"],
      rows: [
        ["Company amends its own return", "12 months from the **filing date**"],
        ["Overpayment relief claim (error in a return causing tax overpaid)", "**4 years**"],
        ["HMRC discovery assessment: no carelessness", "**4 years**"],
        ["Discovery: careless inaccuracy", "**6 years**"],
        ["Discovery: deliberate inaccuracy, failure to notify, or tax avoidance arrangements not notified", "**20 years**"],
        ["Keep records", "**6 years** from the end of the AP (or longer if an enquiry is open)"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Discovery",
      md: `Once the enquiry window has closed, HMRC can only raise a **discovery assessment** if it discovers that tax has been under-assessed **and** either the under-assessment was caused **carelessly or deliberately** by the company (or its agent), or the officer couldn't reasonably have been expected to be aware of it from the information provided with the return. This is why full disclosure in the return (a clear note of a judgement call, a "white space" disclosure) matters: it can protect the company from a later discovery.`,
    },
    {
      kind: "table",
      caption: "Inaccuracy penalties (FA 2007 Sch 24): % of the potential lost revenue",
      head: ["Behaviour", "Maximum", "Minimum: unprompted disclosure", "Minimum: prompted disclosure"],
      rows: [
        ["Careless", "30%", "0%", "15%"],
        ["Deliberate but not concealed", "70%", "20%", "35%"],
        ["Deliberate and concealed", "100%", "30%", "50%"],
      ],
    },
    {
      kind: "md",
      md: `- No penalty if the company took **reasonable care** (an innocent error).
- A disclosure is **unprompted** if made before the company has reason to believe HMRC has discovered or is about to discover the error; otherwise it's **prompted**.
- The penalty is reduced within the range for the **quality of disclosure**: **telling** HMRC, **helping** it quantify the error, and giving **access** to records.
- A careless penalty can be **suspended** for up to 2 years if the company agrees conditions to improve its systems.
- Penalties for **failure to keep records** can be up to £3,000 per return.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Relying on an agent",
      md: `A company is careless if its **agent** is careless on its behalf, unless the company took reasonable care to avoid the inaccuracy (e.g. gave the agent full information and checked the return). Document what the client gave you and get them to approve the return in writing.`,
    },
  ],
  scenario: {
    title: "An error found at Westbrook Joinery Ltd",
    narrative: `**Westbrook Joinery Ltd** has a **31 December** year end and isn't in a group. It filed its return for the year ended **31 December 2024** on **10 September 2025**.

In **October 2026**, while preparing the 2025 accounts, you discover that a **£40,000** sale invoiced in December 2024 was missed from the 2024 accounts because of a cut-off error the bookkeeper should have spotted. The extra CT for 2024 would be **£10,000**. HMRC hasn't been in touch.

The director asks: *"Can't we just put it in the 2025 accounts and say nothing?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**1. Is 2024 still open?** The return was filed on time, so the enquiry window closed on **10 September 2026** (12 months after delivery). The company's own amendment window (12 months from the filing date of 31 December 2025) closed on **31 December 2026**: so the company can still **amend** its 2024 return now, which is the cleanest fix.

**2. Can it go in 2025 instead?** No. Income belongs in the period it was earned. Shifting it moves tax to a later date and is an inaccuracy in both returns.

**3. Discovery exposure if left uncorrected.** The error was **careless** (a cut-off check would have found it), so HMRC could raise a discovery assessment for up to **6 years** from 31 December 2024, i.e. until 31 December 2030.

**4. Penalty if disclosed now.** HMRC hasn't been in touch, so this is an **unprompted** disclosure of a careless error: the range is **0% to 30%** of £10,000. With full telling, helping and access, the penalty could be **nil**. If HMRC found it first, the minimum would be 15% (£1,500).`,
      },
      {
        kind: "table",
        caption: "The options",
        head: ["Option", "Tax", "Likely penalty", "Interest"],
        rows: [
          ["Amend the 2024 return now (unprompted)", "£10,000", "Potentially £0 (range 0–30%)", "From 1 October 2025"],
          ["Leave it and HMRC discovers it later (prompted)", "£10,000", "£1,500 to £3,000", "From 1 October 2025, for longer"],
          ["Move it into 2025 (deliberate if done knowingly)", "£10,000 (later)", "Could be treated as deliberate: 20–70%", "Plus the risk of professional consequences"],
        ],
      },
      {
        kind: "md",
        md: `**Advice.** Amend the 2024 return before 31 December 2026, pay the £10,000 plus interest, and record the cut-off review in your file. As the agent, you can't knowingly file a 2025 return built on the director's suggestion: professional conduct rules require you to cease acting if a client won't correct a known error.`,
      },
    ],
  },
  exercises: [
    {
      kind: "mcq",
      id: "window-singleton",
      prompt:
        "A standalone company with a year end of 31 March 2026 files its return on 20 November 2026. Until when can HMRC open a routine enquiry?",
      options: ["31 March 2027", "20 November 2027", "31 March 2028", "31 January 2028"],
      answer: 1,
      explain: "For a single company filing on time, the window is 12 months from the date the return was delivered.",
    },
    {
      kind: "mcq",
      id: "window-late",
      prompt:
        "A company's filing date was 31 December 2026 but it filed on 20 February 2027. Until when can HMRC open an enquiry?",
      options: ["20 February 2028", "31 December 2027", "30 April 2028", "31 January 2028"],
      answer: 2,
      explain: "For a late return, the window runs to the quarter day after the first anniversary of delivery: 20 February 2028 → next quarter day 30 April 2028.",
    },
    {
      kind: "numeric",
      id: "prompted-careless",
      prompt:
        "During an enquiry HMRC finds a careless error that understated a company's CT by £12,000. The company then gives full disclosure (maximum reduction for telling, helping and access). What is the minimum penalty?",
      answer: 1800,
      unit: "£",
      explain: "The error was found by HMRC, so disclosure is prompted. Careless prompted range is 15%–30%; full disclosure takes it to the 15% minimum.",
      working: "£12,000 × 15% = **£1,800**",
    },
    {
      kind: "classify",
      id: "discovery-limits",
      prompt: "What is HMRC's time limit (from the end of the AP) for a discovery assessment in each case?",
      categories: ["4 years", "6 years", "20 years"],
      items: [
        { text: "Tax under-assessed because of an HMRC processing error; company took reasonable care", answer: 0 },
        { text: "Bookkeeper carelessly double-counted an expense", answer: 1 },
        { text: "Director knowingly hid cash sales", answer: 2 },
        { text: "Company didn't notify chargeability at all", answer: 2 },
      ],
      explain: "4 years normally, 6 years for carelessness, 20 years for deliberate behaviour or failure to notify.",
    },
    {
      kind: "mcq",
      id: "overpayment-relief",
      prompt: "A company realises it missed capital allowances in its return for the year ended 31 March 2023 and its amendment window has closed. What is the last date for an overpayment relief claim?",
      options: ["31 March 2025", "31 March 2026", "31 March 2027", "31 March 2029"],
      answer: 2,
      explain: "Overpayment relief claims must be made within 4 years of the end of the accounting period. (Note that capital allowance claims themselves have their own rules and may need to be made by amending the return in time.)",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-amend",
      prompt: "How long does a company have to amend its own CT return?",
      options: ["12 months from the end of the AP", "12 months from the filing date", "4 years", "Until HMRC opens an enquiry"],
      answer: 1,
      explain: "12 months from the filing date.",
    },
    {
      kind: "mcq",
      id: "q-careless-discovery",
      prompt: "What is the discovery time limit for a careless inaccuracy?",
      options: ["4 years", "6 years", "10 years", "20 years"],
      answer: 1,
      explain: "6 years from the end of the AP.",
    },
    {
      kind: "mcq",
      id: "q-deliberate-max",
      prompt: "What is the maximum penalty for a deliberate and concealed inaccuracy?",
      options: ["30%", "70%", "100%", "200%"],
      answer: 2,
      explain: "100% of the potential lost revenue (domestic matters).",
    },
    {
      kind: "mcq",
      id: "q-closure-appeal",
      prompt: "How long does a company have to appeal against a closure notice?",
      options: ["14 days", "30 days", "60 days", "12 months"],
      answer: 1,
      explain: "30 days from the date of the closure notice.",
    },
    {
      kind: "mcq",
      id: "q-records",
      prompt: "How long must a company normally keep the records supporting its CT return?",
      options: ["3 years", "4 years", "6 years from the end of the AP", "10 years"],
      answer: 2,
      explain: "6 years from the end of the accounting period, or longer if an enquiry is still open.",
    },
    {
      kind: "mcq",
      id: "q-unprompted",
      prompt: "When is a disclosure 'unprompted'?",
      options: [
        "When the company discloses before the return is due",
        "When made before the company has reason to believe HMRC has discovered or is about to discover the error",
        "When the agent writes to HMRC rather than the director",
        "When the error is under £1,000",
      ],
      answer: 1,
      explain: "Timing relative to HMRC's discovery decides whether a disclosure is prompted or unprompted.",
    },
  ],
  sources: [
    { label: "EM1510: CTSA time limits for opening an enquiry", url: "https://www.gov.uk/hmrc-internal-manuals/enquiry-manual/em1510" },
    { label: "COM71005: Time limit for opening a CTSA enquiry", url: "https://www.gov.uk/hmrc-internal-manuals/cotax-manual/com71005" },
    { label: "CH82420: Penalties for inaccuracies – unprompted and prompted disclosure", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch82420" },
    { label: "Finance Act 2007 Schedule 24: penalties for errors", url: "https://www.legislation.gov.uk/ukpga/2007/11/schedule/24" },
    { label: "CH53000: Assessing time limits – extended time limits", url: "https://www.gov.uk/hmrc-internal-manuals/compliance-handbook/ch53000" },
    { label: "Company Tax Returns (GOV.UK)", url: "https://www.gov.uk/company-tax-returns" },
  ],
};
