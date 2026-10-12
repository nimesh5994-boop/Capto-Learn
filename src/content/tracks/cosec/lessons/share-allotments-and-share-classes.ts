import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "share-allotments-and-share-classes",
  title: "Issuing shares: allotments, pre-emption and share classes",
  level: "practitioner",
  minutes: 40,
  summary:
    "How a private company issues new shares: directors' authority (s550 / s551), pre-emption rights and how to disapply them, the SH01 return of allotment and statement of capital, accounting for share premium, and the share classes clients ask about.",
  objectives: [
    "Decide whether the directors already have authority to allot, or need a shareholder resolution",
    "Apply statutory pre-emption rights and choose the right way to disapply them",
    "Complete an SH01 with a correct statement of capital within one month",
    "Post an allotment at a premium, and explain the common share classes and their tax traps",
  ],
  body: [
    {
      kind: "md",
      md: `New shares are **allotted** when a person acquires the unconditional right to be entered in the register of members for them. Clients ask for it when bringing in an investor, rewarding a key employee, giving a spouse shares for income splitting, or capitalising a director's loan. Before you draft anything, answer three questions in order:

1. **Do the directors have authority to allot?**
2. **Do existing shareholders have pre-emption rights, and are they being disapplied?**
3. **What will be filed, and by when?**`,
    },
    {
      kind: "table",
      caption: "Directors' authority to allot (Companies Act 2006)",
      head: ["Company", "Rule", "What you need"],
      rows: [
        ["Private company with **only one class** of shares, allotting more of that class", "s550: directors may allot unless the articles prohibit it", "A board resolution (check the articles don't restrict it)"],
        ["Private company with **more than one class**, or allotting a **new class**", "s551: directors need authority from the articles or an ordinary resolution", "Ordinary resolution giving authority (max 5 years, stating the maximum number of shares), then a board resolution"],
        ["Any company granting **options or convertibles**", "Authority is needed when the right is granted, not when it's exercised", "Check s550 / s551 at the date of grant"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Pre-emption rights (CA 2006 s561)",
      md: `If a company allots **equity securities for cash**, it must first offer them to existing ordinary shareholders **in proportion to their holdings**, on the same or better terms, with at least **14 days** to accept.

Pre-emption does **not** apply to allotments for a non-cash consideration (e.g. shares issued in exchange for a business), bonus issues, or shares held under an employees' share scheme.

How to switch it off for a particular allotment:
- **s569**: a private company with one class of shares can disapply it by **articles or special resolution**;
- **s570 / s571**: where directors have s551 authority, by the articles or a **special resolution**;
- or simply have every existing shareholder **waive** their rights in writing.

Many companies' articles also contain their own pre-emption provisions. Read the articles, not just the Act.`,
    },
    {
      kind: "md",
      md: `### Filing: SH01 within one month

After allotting, the company must deliver a **return of allotment (SH01)** to Companies House **within one month** (s555). There's no fee. The SH01 shows:

- the date(s) of allotment, the class, the number and nominal value of the shares;
- the amount paid or unpaid on each share, including any **premium**;
- whether the consideration was non-cash (with details);
- a **statement of capital** made up to the date of the return: total shares of each class, their aggregate nominal value, the amount unpaid, and the **prescribed particulars** (voting, dividend, capital and redemption rights) of each class.

Also: update the **register of members**, issue a **share certificate** within two months (s769), and file any **ordinary/special resolutions** (s551 authority, s570 disapplication) within **15 days** of passing them.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Getting the statement of capital wrong",
      md: `The statement of capital is the most rejected part of the SH01. Common errors:
- showing only the *new* shares rather than the **total** in issue after the allotment;
- adding the share premium into "aggregate nominal value";
- forgetting the prescribed particulars for each class, or copying generic text that doesn't match the articles;
- leaving the "amount unpaid" blank when shares were issued unpaid.`,
    },
    {
      kind: "md",
      md: `### Accounting for an allotment

Only the **nominal value** goes to share capital. Anything paid above nominal value is **share premium** (s610), which is not distributable and can only be used for limited purposes such as paying up bonus shares or writing off the expenses of the issue. Shares can't be allotted at a discount to nominal value (s580).`,
    },
    {
      kind: "journal",
      title: "500 £1 ordinary shares issued at £20 each, paid in cash",
      narrative: "Cash received is £10,000. Nominal value £500; the other £9,500 is premium.",
      lines: [
        { account: "Bank", dr: 10000 },
        { account: "Share capital – ordinary", cr: 500 },
        { account: "Share premium", cr: 9500 },
      ],
    },
    {
      kind: "table",
      caption: "Share classes clients ask about",
      head: ["Class", "Typical rights", "Watch out for"],
      rows: [
        ["Ordinary", "One vote per share, dividends as declared, share of surplus on winding up", "The default. Differences between 'A' and 'B' ordinary must be in the articles"],
        ["Alphabet shares (A, B, C ordinary)", "Same rights but dividends can be declared on each class separately", "Settlements legislation (ITTOIA 2005 s624) if used to divert income to a spouse or minor child; HMRC challenges arrangements that are 'wholly or substantially a right to income'"],
        ["Non-voting ordinary", "Dividends and capital, no votes", "The PSC ownership test counts shares held, so a large non-voting holding can still make someone a PSC. BADR also needs 5% of the voting rights, which a non-voting holder won't have"],
        ["Preference", "Fixed dividend paid before ordinary; priority on capital", "May not be 'ordinary share capital' for BADR and group tests"],
        ["Redeemable", "Company can buy them back on fixed terms", "Must be issued with redeemable terms; a company must have at least one non-redeemable share in issue (s684)"],
        ["Growth / freezer shares", "Participate only in value above a hurdle", "Valuation and employment-related securities issues; specialist advice"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Changing the rights later",
      md: `Varying the rights of an existing class needs the consent the articles require, or otherwise 75% of that class (s630). File an **SH10** (particulars of variation of rights) within one month, and the amended articles plus the special resolution within 15 days. Renaming or redesignating a class is an **SH08**.`,
    },
  ],
  scenario: {
    title: "Bringing an investor into Halden Robotics Ltd",
    narrative: `Halden Robotics Ltd has 1,000 £1 ordinary shares in issue, all fully paid: Mark Halden 700 and Joanne Halden 300. It has standard model articles and only one class of shares.

An angel investor, Priya Nair, has agreed to pay **£60,000** for **250 new £1 ordinary shares** (£240 per share), completing on 1 October 2026. Mark asks you to "sort the paperwork".`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Authority.** One class of shares, allotting more of that class, and model articles don't prohibit it: the directors can allot under **s550** with a board resolution. No s551 authority is needed.
2. **Pre-emption.** It's an allotment of ordinary shares for cash, so **s561** applies: Mark and Joanne would be entitled to be offered the 250 shares pro rata. Options: a **special resolution under s569** (Mark's 70% alone isn't enough; Joanne must vote in favour) or **written waivers** from both. Written waivers from the only two shareholders are simplest.
3. **Board minute.** Record the allotment of 250 shares to Priya at £240 each, fully paid, and authorise the issue of a share certificate and the SH01.
4. **SH01 by 1 November 2026** (one month after 1 October). Statement of capital: **1,250** ordinary shares, aggregate nominal value **£1,250**, nil unpaid, with the prescribed particulars of the ordinary shares.
5. **Filings within 15 days.** If you used a special resolution under s569, file it by 15 October. Waivers aren't filed.
6. **Post-completion.** Update the register of members; issue the certificate. Check PSCs: Mark now holds 700 / 1,250 = **56%** (still over 50%), Joanne 24% (**no longer a PSC**, as she was at 30%), Priya 20% (not a PSC). File **PSC07** to cease Joanne as a PSC and PSC04 isn't needed for Mark (still in the over-50% band).
7. **Accounts.** Post the journal below.`,
      },
      {
        kind: "journal",
        title: "Allotment to Priya Nair",
        lines: [
          { account: "Bank", dr: 60000 },
          { account: "Share capital – ordinary", cr: 250 },
          { account: "Share premium", cr: 59750 },
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Joanne's 30% → 24%",
        md: `Dilution is the classic way a PSC change goes unnoticed: nobody sold anything, so nobody thinks to check. Any allotment that isn't strictly pro rata can move existing shareholders across the 25%, 50% and 75% lines.`,
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "post-allotment-premium",
      prompt:
        "Kestrel Joinery Ltd allots 2,000 £1 ordinary shares to a new director at £12.50 per share, paid in full by bank transfer. Post the entry.",
      accounts: ["Bank", "Share capital – ordinary", "Share premium", "Retained earnings", "Director's loan account", "Revaluation reserve"],
      answer: [
        { account: "Bank", dr: 25000 },
        { account: "Share capital – ordinary", cr: 2000 },
        { account: "Share premium", cr: 23000 },
      ],
      explain:
        "Cash received is 2,000 × £12.50 = £25,000. Only the nominal value (2,000 × £1) goes to share capital; the £23,000 excess is share premium, which is not a distributable reserve and must not be credited to retained earnings.",
    },
    {
      kind: "numeric",
      id: "pre-emption-entitlement",
      prompt:
        "A company with one class of shares has 800 ordinary shares in issue: Amir holds 480, Beth 200 and Cal 120. It proposes to allot 200 new ordinary shares for cash and no one has disapplied pre-emption. How many of the new shares must be offered to Beth?",
      answer: 50,
      unit: "",
      explain: "Under s561, new equity securities for cash must first be offered to existing ordinary shareholders in proportion to their holdings.",
      working: "Beth holds 200 / 800 = 25%. 25% × 200 new shares = **50 shares**.",
    },
    {
      kind: "classify",
      id: "authority-needed",
      prompt: "For each private company (all with model articles unless stated), do the directors need a shareholder resolution giving authority to allot?",
      categories: ["No: s550 board resolution is enough", "Yes: s551 authority needed"],
      items: [
        { text: "One class of ordinary shares; issuing 100 more ordinary shares to an employee", answer: 0 },
        { text: "One class of ordinary shares; creating and issuing a new class of B ordinary shares", answer: 1, why: "Allotting a new class takes the company outside s550." },
        { text: "Ordinary and preference shares in issue; issuing more ordinary shares", answer: 1, why: "More than one class means s550 isn't available." },
        { text: "One class of ordinary shares, but the articles say the directors may not allot without shareholder approval", answer: 1, why: "s550 applies only where the articles don't prohibit it." },
      ],
      explain: "s550 is a narrow gateway: private company, one class only, allotting that class, and not prohibited by the articles. Anything else needs s551 authority.",
    },
    {
      kind: "mcq",
      id: "sh01-deadline",
      prompt: "Shares were allotted on 14 September 2026. By when must the SH01 be delivered?",
      options: ["28 September 2026", "14 October 2026", "14 November 2026", "With the next confirmation statement"],
      answer: 1,
      explain: "A return of allotment is due within one month of the allotment (CA 2006 s555).",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-share-premium",
      prompt: "A company issues 1,000 £1 shares at £3 each. How much is credited to share capital?",
      options: ["£3,000", "£2,000", "£1,000", "£0"],
      answer: 2,
      explain: "Share capital is credited with the nominal value only: 1,000 × £1. The £2,000 excess is share premium.",
    },
    {
      kind: "mcq",
      id: "q-pre-emption-noncash",
      prompt: "Do statutory pre-emption rights apply to shares issued in exchange for a sole trader's business?",
      options: ["Yes, always", "No: s561 applies only to allotments of equity securities for cash", "Only if the articles say so", "Only for public companies"],
      answer: 1,
      explain: "Pre-emption under s561 applies to allotments wholly for cash.",
    },
    {
      kind: "mcq",
      id: "q-resolution-filing",
      prompt: "Within what period must a special resolution disapplying pre-emption be filed at Companies House?",
      options: ["7 days", "14 days", "15 days", "1 month"],
      answer: 2,
      explain: "Special resolutions (and ordinary resolutions giving s551 authority) are filed within 15 days of being passed.",
    },
    {
      kind: "mcq",
      id: "q-discount",
      prompt: "Can a company allot £1 shares for 50p each?",
      options: ["Yes, if the shareholders agree", "No: shares can't be allotted at a discount to nominal value", "Yes, if the balance is shown as share premium", "Only for employee shares"],
      answer: 1,
      explain: "CA 2006 s580 prohibits allotment at a discount.",
    },
    {
      kind: "mcq",
      id: "q-statement-capital",
      prompt: "What does the statement of capital on an SH01 show?",
      options: [
        "Only the shares allotted on this occasion",
        "The company's total issued shares of each class after the allotment, their aggregate nominal value, amounts unpaid and class rights",
        "The company's net assets",
        "The share premium account balance",
      ],
      answer: 1,
      explain: "The statement of capital is a snapshot of the whole issued share capital at the date of the return.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s550 – power of directors to allot (private company, one class)", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/550" },
    { label: "Companies Act 2006 s561 – existing shareholders' right of pre-emption", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/561" },
    { label: "Companies Act 2006 s555 – return of allotment", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/555" },
    { label: "Companies Act 2006 s610 – share premium account", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/610" },
    { label: "Return of allotment of shares (SH01)", url: "https://www.gov.uk/government/publications/return-of-allotment-of-shares-sh01" },
  ],
};
