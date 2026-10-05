import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "who-must-file-and-registration",
  title: "Who must file a Self Assessment return, and how to register",
  level: "foundation",
  minutes: 25,
  summary:
    "The first question on any new personal tax client: do they actually need a tax return? The main triggers, the 5 October registration deadline, UTRs, agent authorisation and the structure of the SA100 and its supplementary pages.",
  objectives: [
    "Identify the common triggers that bring an individual into Self Assessment",
    "Apply the 5 October notification deadline and explain the consequence of missing it",
    "Explain what a UTR is and how an agent gets authorised to act",
    "Choose the right supplementary pages for a client's income sources",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `Most UK taxpayers never file a return: PAYE collects tax on wages and pensions, and banks pay interest gross but most people's interest sits inside the personal savings allowance. Self Assessment (SA) is for people whose tax **can't be collected accurately at source**. Your job at onboarding is to decide whether the client is in SA, and if they are, make sure HMRC knows in time.`,
    },
    {
      kind: "table",
      caption: "Common reasons a client needs a return",
      head: ["Trigger", "Notes"],
      rows: [
        ["Self-employed sole trader with gross trading income over £1,000", "The £1,000 trading allowance covers very small side-income (see the self-employment lesson)."],
        ["Partner in a partnership (including an LLP member)", "Every partner files, whatever their share. The partnership also files its own return (SA800)."],
        ["Capital Gains Tax to pay", "Including where a UK property disposal has already been reported on a 60-day return."],
        ["High Income Child Benefit Charge, unless paid through PAYE", "HMRC now lets employees pay the charge through their tax code instead."],
        ["Untaxed income: rental profits, untaxed foreign income, larger amounts of savings or dividend income", "Small amounts can sometimes be collected through the tax code. Check HMRC's online checker if unsure."],
        ["Company directors", "Not automatically. A director with only PAYE salary and dividends inside the allowance may not need one, but most practices file for directors anyway because of dividends and benefits."],
        ["HMRC has issued a notice to file", "Once a notice is issued, a return is legally due, even if there's no tax. Ask HMRC to withdraw it rather than ignore it."],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Notifying chargeability",
      md: `A person who is chargeable to income tax or CGT for a tax year and hasn't received a notice to file must tell HMRC **by 5 October following the end of that tax year** (TMA 1970 s7). For 2026/27 (ending 5 April 2027) that's **5 October 2027**.

Failure to notify carries a penalty based on the "potential lost revenue" — the tax unpaid at 31 January — with the percentage depending on behaviour (non-deliberate, deliberate, deliberate and concealed) and reduced for disclosure.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "'Registered' is not the same as 'taxed'",
      md: `HMRC used to require a return from PAYE employees above an income level (£100,000, then £150,000 for 2023/24). That criterion was removed from 2024/25. Don't assume a high earner must file purely because of income level. Equally, don't assume an employee *doesn't* need to file: one buy-to-let flat or a £20,000 share sale changes everything.`,
    },
    {
      kind: "md",
      md: `### Registering and the UTR

- **Self-employed:** register for SA and Class 2/4 NIC together through the online service. HMRC issues a **Unique Taxpayer Reference (UTR)**, a 10-digit number, usually by post within a couple of weeks (longer at peak).
- **Not self-employed** (e.g. a landlord or someone with a gain): register using the SA1 route.
- **Partners:** register as a partner (SA401). The partnership itself is registered with SA400.

Allow time: if you register on 3 October, the UTR may not arrive before the client needs to file, so register as soon as the trigger happens.`,
    },
    {
      kind: "md",
      md: `### Acting as agent

Before you can see a client's SA record or file for them, you need agent authorisation through **HMRC's agent services account** (an authorisation request the client accepts online) or the older 64-8 route for some services. Without it, HMRC won't talk to you about the client. Build this into onboarding alongside AML checks and the engagement letter.`,
    },
    {
      kind: "table",
      caption: "The SA100 and its main supplementary pages",
      head: ["Page", "Use for"],
      rows: [
        ["SA100 (main return)", "UK interest and dividends, pension contributions, Gift Aid, HICBC, student loans, marriage allowance"],
        ["SA102", "Employment (one per employment or directorship)"],
        ["SA103S / SA103F", "Self-employment (short or full)"],
        ["SA104S / SA104F", "Partnership share"],
        ["SA105", "UK property"],
        ["SA106", "Foreign income"],
        ["SA108", "Capital gains"],
        ["SA109", "Residence, remittance basis and FIG regime claims"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Deregistering",
      md: `If a client stops trading or the trigger goes away (e.g. sells the only rental property), tell HMRC so they don't keep issuing notices to file. A return issued and not filed still attracts penalties. Also ask for an outstanding notice to be **withdrawn** if no return is genuinely needed.`,
    },
  ],
  scenario: {
    title: "New enquiry: does Amara need to file?",
    narrative: `Amara Mensah is employed as a nurse on PAYE (salary £41,000). In May 2026 she started selling handmade candles at weekend markets. She also inherited a flat from her aunt in August 2026 and began letting it from 1 October 2026 at £950 a month. She has never filed a return. She emails in September 2026: *"Do I need to do anything now, or can I wait until next year?"*

Her candle sales for 2026/27 are expected to be about £4,800 with materials costing about £1,700.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Candle sales:** gross trading income of around £4,800 is over the £1,000 trading allowance, so she's in SA for 2026/27 as a sole trader. (She can use actual expenses, which are higher than £1,000 here.)
2. **The flat:** rent of £950 × 6 months = £5,700 in 2026/27, well over the £1,000 property allowance. Untaxed rental profit is another trigger.
3. **Deadline:** she must notify HMRC by **5 October 2027** for 2026/27. There's no penalty for registering now, and it gets the UTR in hand early, so register now.
4. **Registration route:** because she is self-employed, register online as a sole trader (this covers SA and Class 2/4 NIC).
5. **MTD for Income Tax:** her qualifying income (trading turnover + gross rents) will be about £10,500 for 2026/27, below the £20,000 threshold that applies from April 2028, so she isn't caught yet, but watch it.
6. **Supplementary pages for 2026/27:** SA102 (employment), SA103S (self-employment) and SA105 (property).
7. **Agent authorisation:** send the authorisation request and engagement letter, and complete AML checks.`,
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Collect information now, not in January",
        md: `Set Amara up with a simple income and expenses record for both the candle business and the flat from day one. Inheritance also means a probate value for the flat, which will be her base cost if she ever sells it — get it on file now.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-triggers",
      prompt: "For 2026/27, which of these individuals need to be in Self Assessment? Assume no other income or reasons than stated.",
      categories: ["Needs a return", "Does not need a return"],
      items: [
        { text: "Employee earning £160,000, all taxed through PAYE, no other income", answer: 1, why: "The £150,000 trigger was removed; PAYE collects the tax." },
        { text: "Retired teacher who sold a holiday cottage at a £60,000 gain", answer: 0, why: "CGT to pay, and the gain also needs a 60-day return." },
        { text: "Student earning £700 from occasional dog walking", answer: 1, why: "Covered by the £1,000 trading allowance." },
        { text: "New partner in an architects' partnership, share of profit £18,000", answer: 0, why: "All partners must file." },
        { text: "Employee who receives a notice to file from HMRC", answer: 0, why: "Once a notice is issued a return is due unless HMRC withdraws it." },
        { text: "Employee with £300 of bank interest, basic rate taxpayer", answer: 1, why: "Inside the £1,000 personal savings allowance." },
      ],
      explain:
        "Look for income that can't be taxed at source (trading, partnership, rents, gains) or a specific charge (HICBC not in PAYE). High salary on its own is no longer a trigger.",
    },
    {
      kind: "mcq",
      id: "notify-deadline",
      prompt: "Joel started letting a room in a separate flat he owns in June 2026. By what date must he notify HMRC that he's chargeable for 2026/27?",
      options: ["31 January 2027", "5 April 2027", "5 October 2027", "31 January 2028"],
      answer: 2,
      explain: "Notification is due by 5 October following the end of the tax year in which the liability arises. 2026/27 ends on 5 April 2027, so the deadline is 5 October 2027. 31 January 2028 is the online filing deadline for that year.",
    },
    {
      kind: "multi",
      id: "supplementary-pages",
      prompt: "A client is a salaried company director who also lets out a flat in Spain and sold some shares at a gain of £14,000. Which supplementary pages are needed? Select all that apply.",
      options: ["SA102 Employment", "SA103 Self-employment", "SA105 UK property", "SA106 Foreign", "SA108 Capital gains"],
      answers: [0, 3, 4],
      explain: "Directorship goes on SA102. Overseas property income goes on the **foreign** pages (SA106), not SA105. The share gain exceeds the £3,000 annual exempt amount, so SA108 is needed. There's no trade.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-utr",
      prompt: "What is a UTR?",
      options: ["A VAT registration number", "A 10-digit Unique Taxpayer Reference for Self Assessment", "An agent's HMRC reference", "A National Insurance number"],
      answer: 1,
      explain: "HMRC issues a 10-digit UTR when someone registers for Self Assessment. It's needed to file.",
    },
    {
      kind: "mcq",
      id: "q-trading-allowance-trigger",
      prompt: "A client has gross self-employed income of £900 and no other reason to file. Do they need to register?",
      options: ["Yes, all self-employment must be registered", "No, it's covered by the £1,000 trading allowance", "Only if they want to pay Class 2", "Only if expenses exceed income"],
      answer: 1,
      explain: "Gross trading income up to £1,000 is covered by the trading allowance, so there's no need to register (though they may choose to, e.g. to pay voluntary Class 2).",
    },
    {
      kind: "mcq",
      id: "q-notice-issued",
      prompt: "HMRC issues a notice to file to a client who has no tax to pay. What should you do?",
      options: ["Ignore it", "File the return or ask HMRC to withdraw the notice", "Wait for a penalty and appeal", "Pay £100 voluntarily"],
      answer: 1,
      explain: "Once a notice is issued, the return is legally due and penalties apply if it's late, even with no tax due. Either file or get the notice withdrawn.",
    },
    {
      kind: "mcq",
      id: "q-partnership",
      prompt: "Which statement about partnerships is correct?",
      options: ["Only the senior partner files", "The partnership files an SA800 and each partner files their own return", "Partners don't file if the partnership files", "LLP members are taxed through PAYE"],
      answer: 1,
      explain: "The partnership return shows the profit and its allocation; each partner reports their share on their own return (SA104).",
    },
    {
      kind: "mcq",
      id: "q-agent",
      prompt: "Before HMRC will discuss a new client's SA record with you, you need:",
      options: ["The client's Government Gateway password", "Agent authorisation through your agent services account", "A signed letter from the client posted to HMRC", "Nothing — HMRC talks to any accountant"],
      answer: 1,
      explain: "Use your agent services account to request authorisation. Never ask a client for their own login details.",
    },
  ],
  sources: [
    { label: "Who must send a tax return (GOV.UK)", url: "https://www.gov.uk/self-assessment-tax-returns/who-must-send-a-tax-return" },
    { label: "Register for Self Assessment (GOV.UK)", url: "https://www.gov.uk/register-for-self-assessment" },
    { label: "TMA 1970 s7 – notice of liability to income tax and CGT", url: "https://www.legislation.gov.uk/ukpga/1970/9/section/7" },
    { label: "Check if you need to send a tax return", url: "https://www.gov.uk/check-if-you-need-tax-return" },
  ],
};
