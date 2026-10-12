import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "strike-off-liquidation-and-restoration",
  title: "Closing a company: strike-off, liquidation and restoration",
  level: "advanced",
  minutes: 45,
  summary:
    "Choosing between voluntary strike-off (DS01) and a members' or creditors' voluntary liquidation, running a DS01 properly (eligibility, notifying interested parties, the £25,000 capital distribution limit), compulsory strike-off, and restoring a dissolved company administratively or by court order.",
  objectives: [
    "Decide whether a client can use voluntary strike-off or needs a liquidation",
    "Run a DS01 strike-off, including the 7-day notification duty and the pre-closure checklist",
    "Apply the CTA 2010 s1030A £25,000 rule to distributions made before strike-off",
    "Choose between administrative restoration and court restoration for a dissolved company",
  ],
  body: [
    {
      kind: "md",
      md: `When a client stops trading, someone will ask "can we just close the company?". There are three main routes, and the right one depends on whether the company is **solvent**, how much money is **left to distribute**, and whether anyone might **object**.`,
    },
    {
      kind: "table",
      caption: "Ways to close a company",
      head: ["Route", "When it fits", "Key features"],
      rows: [
        ["**Voluntary strike-off (DS01)**", "Solvent, no longer trading, simple affairs, and modest reserves left to distribute", "Cheap (£13 online). Directors run it. No liquidator. Distributions over £25,000 are taxed as income."],
        ["**Members' voluntary liquidation (MVL)**", "Solvent, with larger reserves to extract, or complex affairs", "Directors swear a statutory **declaration of solvency**; a licensed insolvency practitioner is appointed. Distributions are capital, so Business Asset Disposal Relief may apply."],
        ["**Creditors' voluntary liquidation (CVL)**", "Insolvent: can't pay its debts", "Creditors drive the process; the liquidator investigates directors' conduct. Directors must not use DS01 to dodge creditors."],
        ["**Compulsory strike-off** (by the registrar)", "Company appears not to be carrying on business, e.g. accounts and confirmation statements not filed", "Started by Companies House (CA 2006 s1000). Not a planned exit: assets pass to the Crown."],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "When a company can't apply for voluntary strike-off (CA 2006 ss1004–1005)",
      md: `A company can't apply if, in the **last 3 months**, it has:
- traded or otherwise carried on business;
- changed its name;
- disposed of property or rights for value, other than in the normal course of its business or to wind up;
- or if it's the subject of insolvency proceedings, a CVA, administration, or a scheme of arrangement.`,
    },
    {
      kind: "md",
      md: `### The DS01 process

1. **Before applying**: collect debts, pay all creditors (including HMRC), file the final CT return, close the PAYE scheme and deregister for VAT, close the bank account once the final distribution is made, and file any outstanding accounts and confirmation statements.
2. **File DS01**, signed by the director(s) (a majority if more than two). Fee **£13 online, £18 on paper**.
3. **Within 7 days**, send a copy to every **member, creditor, employee, pension scheme manager or trustee** and any **director who didn't sign** (s1006). Anyone who becomes one of these later must also get a copy within 7 days (s1007). Failing to do this is a criminal offence.
4. Companies House publishes a **first notice in The Gazette**. Anyone can object, typically a creditor or HMRC.
5. If no objection, the company is struck off **no earlier than 2 months** after the notice, and a second Gazette notice confirms **dissolution**.
6. If the company starts trading again or becomes ineligible, withdraw the application with **DS02**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The £25,000 rule (CTA 2010 s1030A)",
      md: `A distribution to shareholders **in anticipation of a strike-off** is treated as a **capital** distribution, rather than an income distribution, only if the total of such distributions is **not more than £25,000**, and the company intends to secure its debts are paid and to be struck off within two years.

If the total exceeds £25,000, **the whole amount** is an income distribution, taxed like a dividend, not just the excess. For larger amounts, an MVL achieves capital treatment.

Note also the **targeted anti-avoidance rule** for winding-up distributions (ITTOIA 2005 s396B): capital treatment can be denied if, broadly, the shareholder carries on a similar trade or activity within two years and the main purpose was a tax advantage. "Phoenixing" a business to extract profits as capital is exactly what it targets.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Leaving something behind",
      md: `When a company is dissolved, any property it still owns, including **cash in a bank account** you forgot to close, a VAT repayment, or a debt someone owes it, passes to the Crown as **bona vacantia** (CA 2006 s1012). Getting it back means restoring the company. Close everything down *before* the DS01 is filed.`,
    },
    {
      kind: "md",
      md: `### Restoration

A dissolved company can be brought back to the register. Restoration has retrospective effect: the company is treated as having **continued in existence** as if it had never been dissolved (s1028 / s1032).

| | Administrative restoration (RT01) | Restoration by court order |
|---|---|---|
| When available | Company was struck off **by the registrar** (s1000 / s1001) | Any dissolved company, including one struck off on a **DS01** or dissolved after liquidation |
| Who applies | A former director or member | Wide range of interested persons (e.g. former directors, members, creditors) |
| Time limit | Within **6 years** of dissolution | Generally within **6 years**; no limit for bringing personal injury claims |
| Conditions | The company was carrying on business at dissolution; Crown consent where property is bona vacantia; all outstanding documents delivered and late filing penalties paid | Court decides; Treasury Solicitor / registrar normally notified |
| Fee | **£341** to Companies House (plus the Bona Vacantia waiver fee where needed) | Court fees and legal costs, plus Companies House costs |`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Pre-strike-off checklist for your file",
      md: `Final accounts to the cessation date; final CT600 with "final return" ticked; PAYE scheme closed and P45s issued; VAT deregistration and final return; all creditors paid (including your own fee!); director's loan account cleared; final distribution calculated against s1030A; bank account closed; copies of DS01 sent within 7 days with proof of posting; records retained (the company's records must normally be kept for 6 years for HMRC, and Companies House recommends keeping them after dissolution).`,
    },
  ],
  scenario: {
    title: "Closing Willowbrook Consulting Ltd",
    narrative: `Sanjay Mistry has run Willowbrook Consulting Ltd as a one-man IT consultancy. He has 100 £1 shares, which he subscribed for at par in 2016. He took a permanent employed role on 31 May 2026 and the company stopped trading that day.

After the final accounts and CT, the company's only asset is **£23,600** in the bank, and it owes your firm a final fee of **£1,200** (including VAT). There are no other creditors and no employees other than Sanjay. Sanjay asks whether he can "just DS01 it" and take the cash.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Eligibility.** No trading since 31 May 2026. As long as no name change or disposal for value in the last 3 months, a DS01 can be filed from **1 September 2026** onwards (3 months after trading ceased).
2. **Pay creditors first.** Pay your firm's £1,200. Cash left: £23,600 − £1,200 = **£22,400**.
3. **The £25,000 limit.** The distribution to Sanjay will be £22,400 (the £100 share capital is within that figure). It's below £25,000, so it can be treated as a **capital** distribution under s1030A, provided the company intends to collect its debts, pay its creditors and be struck off.
4. **Sanjay's CGT.** Proceeds £22,400 less base cost £100 = gain of **£22,300**. His annual exempt amount is set against it and BADR may be available as a trading company he's been an officer and employee of for at least 2 years. (He's moving to employment, so the TAAR on similar trades is unlikely to bite, but note it.)
5. **Closing down.** Close the PAYE scheme, deregister for VAT, file the final CT600, close the bank account after the distribution.
6. **File DS01** and send a copy within 7 days to Sanjay as member (he's also the signing director) and to any creditor: by now there shouldn't be any.
7. **Dissolution** follows no earlier than 2 months after the Gazette notice.`,
      },
      {
        kind: "callout",
        tone: "warning",
        title: "If the cash had been £30,000",
        md: `A distribution of, say, £28,800 would breach the £25,000 limit and the **whole** £28,800 would be taxed as a dividend. The options would be an MVL (where the IP's fee must be weighed against the tax saving) or paying a dividend before the strike-off to bring the final capital distribution under £25,000, which should be looked at with the TAAR and the dividend tax cost in mind.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "closure-route",
      prompt: "Which route best fits each client?",
      categories: ["Voluntary strike-off (DS01)", "Members' voluntary liquidation", "Creditors' voluntary liquidation"],
      items: [
        { text: "Solvent dormant company with £400 in the bank and no creditors", answer: 0 },
        { text: "Solvent company with £380,000 of retained profits the shareholders want to extract", answer: 1, why: "Over £25,000, so DS01 would give income treatment on the whole amount." },
        { text: "Company owing HMRC £60,000 of VAT and PAYE that it can't pay", answer: 2, why: "Insolvent: a DS01 would be objected to and could be an offence." },
        { text: "Solvent company with £14,000 left after paying all debts", answer: 0 },
      ],
      explain: "DS01 suits solvent companies with simple affairs and up to £25,000 to distribute. Larger solvent extractions usually go through an MVL; insolvent companies need a CVL.",
    },
    {
      kind: "numeric",
      id: "s1030a-gain",
      prompt:
        "A sole shareholder subscribed for 1,000 £1 shares at par. Before strike-off the company distributes its remaining £19,750 to her, and s1030A capital treatment applies. What is her chargeable gain before the annual exempt amount and any relief?",
      answer: 18750,
      unit: "£",
      explain: "Under s1030A the distribution is treated as capital: proceeds less base cost.",
      working: "£19,750 − £1,000 base cost = **£18,750**.",
    },
    {
      kind: "mcq",
      id: "s1030a-over",
      prompt: "Before strike-off, a company distributes £27,000 to its two equal shareholders (£13,500 each). How are the distributions treated?",
      options: [
        "Capital, because each shareholder received less than £25,000",
        "£25,000 capital and £2,000 income",
        "All £27,000 as income distributions, because the total exceeds £25,000",
        "Exempt",
      ],
      answer: 2,
      explain: "The £25,000 limit applies to the total distributions by the company, not per shareholder, and if exceeded the whole amount is income.",
    },
    {
      kind: "multi",
      id: "ds01-notify",
      prompt: "Who must be sent a copy of a DS01 within 7 days of it being filed? Select all that apply.",
      options: ["Members (shareholders)", "Creditors", "Employees", "Directors who didn't sign the application", "The company's bank", "HMRC as a creditor, if tax is owed"],
      answers: [0, 1, 2, 3, 5],
      explain:
        "s1006 requires copies to members, creditors (HMRC included, if owed money), employees, pension scheme managers/trustees and non-signing directors. The bank is only entitled if it's a creditor.",
    },
    {
      kind: "mcq",
      id: "restoration-route",
      prompt: "A company was dissolved after a DS01 two years ago and the former director has discovered £8,000 in a forgotten bank account. How can it be restored?",
      options: ["Administrative restoration on RT01", "By court order", "By filing a new DS02", "It can't be restored"],
      answer: 1,
      explain:
        "Administrative restoration is only for companies struck off by the registrar. A company that was dissolved on its own DS01 application must be restored by court order.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-ds01-3months",
      prompt: "A company stopped trading on 15 July 2026. What is the earliest date it can apply for voluntary strike-off?",
      options: ["15 July 2026", "15 August 2026", "15 October 2026", "15 January 2027"],
      answer: 2,
      explain: "It can't apply if it has traded in the previous 3 months.",
    },
    {
      kind: "mcq",
      id: "q-ds01-fee",
      prompt: "What is the Companies House fee for an online voluntary strike-off application?",
      options: ["£8", "£13", "£33", "£50"],
      answer: 1,
      explain: "£13 online, £18 on paper, per the current fees schedule.",
    },
    {
      kind: "mcq",
      id: "q-bona-vacantia",
      prompt: "What happens to money left in a company's bank account when it is dissolved?",
      options: ["It's paid to the shareholders automatically", "It passes to the Crown as bona vacantia", "The bank keeps it", "It's paid to HMRC as tax"],
      answer: 1,
      explain: "CA 2006 s1012: property of a dissolved company vests in the Crown.",
    },
    {
      kind: "mcq",
      id: "q-admin-restore-time",
      prompt: "What is the time limit for administrative restoration?",
      options: ["2 years", "3 years", "6 years", "No limit"],
      answer: 2,
      explain: "An application for administrative restoration must be made within 6 years of dissolution.",
    },
    {
      kind: "mcq",
      id: "q-mvl",
      prompt: "What must the directors make at the start of a members' voluntary liquidation?",
      options: ["A solvency statement under s643", "A statutory declaration of solvency", "A dormant company statement", "A lawful purpose statement"],
      answer: 1,
      explain: "An MVL requires a statutory declaration of solvency by the directors, stating the company can pay its debts in full within 12 months.",
    },
    {
      kind: "mcq",
      id: "q-restore-effect",
      prompt: "What is the effect of restoring a company to the register?",
      options: [
        "A new company is formed with the same name",
        "The company is treated as having continued in existence as if it had never been dissolved",
        "Only its assets are restored, not its liabilities",
        "The directors are personally liable for its debts",
      ],
      answer: 1,
      explain: "Restoration is retrospective: the company is deemed to have continued in existence.",
    },
  ],
  sources: [
    { label: "Strike off your limited company from the Companies Register", url: "https://www.gov.uk/strike-off-your-company-from-companies-register" },
    { label: "Companies Act 2006 s1006 – copy of application to be given to members, employees etc.", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/1006" },
    { label: "Corporation Tax Act 2010 s1030A – distributions in anticipation of striking off", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/1030A" },
    { label: "Restoring a company to the Companies House register", url: "https://www.gov.uk/government/publications/restoring-a-company-to-the-companies-house-register/restoring-a-company-to-the-companies-house-register" },
    { label: "Apply for administrative restoration to the register (RT01)", url: "https://www.gov.uk/government/publications/apply-for-administrative-restoration-to-the-register-rt01" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
  ],
};
