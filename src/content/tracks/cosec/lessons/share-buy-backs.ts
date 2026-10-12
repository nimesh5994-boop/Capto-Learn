import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "share-buy-backs",
  title: "Company purchase of own shares (buy-backs): an overview",
  level: "advanced",
  minutes: 45,
  summary:
    "How a private company buys back its own shares from a departing shareholder: how it can be funded, the approval and filing steps (SH03 with stamp duty, SH06), the capital redemption reserve, and the income-versus-capital tax treatment for the seller.",
  objectives: [
    "Identify the permitted ways of funding a buy-back and the conditions attached to each",
    "Run the approval and filing process, including the SH03 stamp duty and SH06",
    "Post the buy-back and the transfer to the capital redemption reserve",
    "Explain when the seller is taxed on a distribution and when capital treatment applies, and the role of advance clearance",
  ],
  body: [
    {
      kind: "md",
      md: `When a shareholder in an owner-managed company wants to leave and the others can't or won't buy their shares personally, the company itself can buy them. A buy-back is a powerful tool but **unforgiving**: if the statutory procedure isn't followed, the purchase can be **void**, with the shares still belonging to the seller and tax consequences that nobody planned for. This lesson gives you the overview you need to spot the issues and work alongside the solicitor. It isn't a substitute for legal advice on the documents.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The basic conditions (CA 2006 Part 18)",
      md: `- A company may purchase its own shares, subject to any restriction or prohibition in its articles (s690).
- The shares must be **fully paid**, and the company must **pay for them on purchase** (s691). Deferred payment or instalments are generally not allowed (an exception applies to some employee share scheme purchases).
- The company can't buy back all its shares: there must remain at least one non-redeemable share in issue (s690(2)).
- Bought-back shares are **cancelled** (or, if bought out of distributable profits, may be held in treasury).`,
    },
    {
      kind: "table",
      caption: "How a private company can fund a buy-back",
      head: ["Source", "Key conditions"],
      rows: [
        ["**Distributable profits**", "The most common route. The company needs enough distributable reserves, judged on relevant accounts. A transfer equal to the nominal value is made to a **capital redemption reserve** (s733)."],
        ["**Proceeds of a fresh issue** of shares made for the purpose", "No CRR transfer to the extent covered by the new issue."],
        ["**Small buy-back out of cash** (s692(1ZA))", "If the articles permit, a private company can buy back shares out of cash up to the **lower of £15,000 and 5% of its share capital** in a financial year, without identifying distributable profits."],
        ["**Out of capital** (s709 onwards)", "Only after using available profits. Needs a directors' **statement of solvency**, an **auditor's report**, a special resolution, Gazette and newspaper notices, and a waiting period during which creditors and members can object. Specialist territory."],
      ],
    },
    {
      kind: "md",
      md: `### Approval and filings (buy-back out of profits)

1. **Check the articles** for any restriction, and check distributable profits on relevant accounts.
2. **Draft the buy-back contract.** For an off-market purchase (which every private company buy-back is), the terms of the contract must be approved by the shareholders by **ordinary resolution** before it's entered into (s694), unless the articles require more. The selling shareholder's shares being bought **can't be counted** in favour (s695); on a written resolution the seller isn't an eligible member for those shares.
3. **Make the contract available** for inspection (or circulate it with a written resolution).
4. **Complete and pay** in full.
5. Within **28 days**: deliver the **return of purchase (SH03)** to Companies House (s707). The SH03 is a stampable document: **0.5% stamp duty** on the consideration (rounded up to £5) where the consideration is over £1,000, and the SH03 must be stamped by HMRC **before** it's sent to Companies House.
6. Within **28 days**: deliver the **notice of cancellation (SH06)** with a statement of capital (s708).
7. Update the register of members, check PSCs (the remaining shareholders' percentages go **up**) and keep the contract at the registered office for 10 years.`,
    },
    {
      kind: "journal",
      title: "Buying back 200 £1 shares at £50 each out of distributable profits",
      narrative: "The company pays £10,000. Share capital falls by £200 and an equal amount is transferred from retained earnings to the capital redemption reserve, so the company's capital is maintained.",
      lines: [
        { account: "Share capital – ordinary", dr: 200 },
        { account: "Retained earnings", dr: 10000 },
        { account: "Bank", cr: 10000 },
        { account: "Capital redemption reserve", cr: 200 },
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Tax for the seller: income or capital?",
      md: `By default, the amount paid **above the capital originally subscribed** for the shares is a **distribution** (CTA 2010 s1000), taxed on an individual like a dividend.

It's treated as a **capital disposal** instead (CTA 2010 s1033) if, broadly, all of these are met:
- the company is an **unquoted trading company** (or holding company of a trading group);
- the purchase is made **wholly or mainly to benefit the trade** (e.g. removing a dissenting or retiring shareholder) and not for tax avoidance;
- the seller is UK resident and has owned the shares for **5 years** (3 years if inherited, including the deceased's period of ownership);
- the seller's interest is **substantially reduced**: after the buy-back their percentage holding is no more than **75%** of what it was before; and
- after the buy-back the seller is **not connected** with the company (broadly, holds no more than 30%).

Capital treatment can bring **Business Asset Disposal Relief** into play. The company can apply to HMRC for **advance clearance** (CTA 2010 s1044) before the buy-back. Almost always do so.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The classic buy-back mistakes",
      md: `- **Paying in instalments.** If the seller agrees to be paid over three years, the company can't simply owe them the money. Alternatives include buying back in tranches, each paid in full on completion, with separate contracts.
- **Not enough distributable profits** at the date of payment, perhaps because a dividend was paid in the meantime.
- **Seller voting on the resolution.** This can invalidate the approval.
- **Forgetting stamp duty** on the SH03, or sending an unstamped SH03 to Companies House.
- **Assuming capital treatment** without checking the 5-year ownership and connection tests, or without clearance.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Reduction of capital: the other tool",
      md: `A private company can also **reduce its share capital** by special resolution supported by a directors' **solvency statement** (CA 2006 ss641–644), filing form **SH19** with the statement and resolution within 15 days. It's often used to create distributable reserves (e.g. by cancelling share premium) before a dividend or a buy-back. Same principle: get the sequence right, and take legal advice on the documents.`,
    },
  ],
  scenario: {
    title: "Paul retires from Brookfield Engineering Ltd",
    narrative: `Brookfield Engineering Ltd, an unquoted trading company, has 1,000 £1 ordinary shares: Helen Brook 400, Raj Mehta 400 and Paul Dunn 200. Paul subscribed for his shares at par when the company was set up in 2009. He's retiring and the company has agreed to buy back all 200 shares for **£90,000**, paid in full on completion. Distributable reserves are £310,000. Helen and Raj don't want to fund the purchase personally.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Funding.** £90,000 out of distributable profits of £310,000: fine, as long as nothing reduces reserves before completion. The small buy-back route (£15,000 / 5%) isn't relevant at this size.
2. **Approval.** Helen and Raj pass an **ordinary resolution** approving the contract's terms before it's signed. On a written resolution Paul isn't an eligible member for his 200 shares.
3. **Completion.** The company pays £90,000 and the shares are cancelled.
4. **SH03.** Stamp duty 0.5% × £90,000 = **£450**. Get the SH03 stamped, then deliver it to Companies House within 28 days.
5. **SH06.** Within 28 days, with a new statement of capital: **800 shares, £800**.
6. **PSCs.** Helen and Raj each go from 40% to **50%**. Both stay in the "more than 25% but not more than 50%" band, so no PSC04 is needed. Paul was never a PSC (20%).
7. **Tax for Paul.** Distribution treatment would give a distribution of £90,000 − £200 = **£89,800**. Capital treatment looks available: trading company, retirement benefits the trade, owned since 2009 (well over 5 years), and his interest falls to nil (so it's substantially reduced and he's not connected). Apply for **s1044 clearance** before completion. On capital treatment, Paul's gain is £89,800, potentially eligible for BADR.`,
      },
      {
        kind: "journal",
        title: "Brookfield's buy-back entry",
        lines: [
          { account: "Share capital – ordinary", dr: 200 },
          { account: "Retained earnings", dr: 90000 },
          { account: "Bank", cr: 90000 },
          { account: "Capital redemption reserve", cr: 200 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "journal",
      id: "buyback-journal",
      prompt:
        "A company buys back 500 £1 ordinary shares from a departing shareholder for £24,000, paid in full by bank transfer, wholly out of distributable profits. Post the entry, including the transfer to the capital redemption reserve.",
      accounts: ["Share capital – ordinary", "Retained earnings", "Bank", "Capital redemption reserve", "Share premium", "Director's loan account", "Revaluation reserve"],
      answer: [
        { account: "Share capital – ordinary", dr: 500 },
        { account: "Retained earnings", dr: 24000 },
        { account: "Bank", cr: 24000 },
        { account: "Capital redemption reserve", cr: 500 },
      ],
      explain:
        "Of the £24,000 paid, £500 cancels the nominal value of the shares (debit share capital) and £23,500 comes out of retained earnings. Because the purchase was funded from profits, s733 then requires a transfer equal to the nominal value (£500) from retained earnings to the capital redemption reserve. Total debit to retained earnings: £23,500 + £500 = £24,000.",
    },
    {
      kind: "numeric",
      id: "sh03-stamp-duty",
      prompt: "A company buys back shares for £37,350. How much stamp duty is payable on the SH03?",
      answer: 190,
      unit: "£",
      explain: "The SH03 is stampable at 0.5% of the consideration, rounded up to the next £5.",
      working: "0.5% × £37,350 = £186.75, rounded up to **£190**.",
    },
    {
      kind: "numeric",
      id: "buyback-distribution",
      prompt:
        "A shareholder subscribed for 1,000 £1 shares at £1.50 each. The company buys them back for £60,000 and capital treatment does NOT apply. What is the amount of the distribution?",
      answer: 58500,
      unit: "£",
      explain: "The distribution is the amount paid in excess of the capital originally subscribed for the shares (nominal value plus any premium paid on subscription).",
      working: "Capital subscribed: 1,000 × £1.50 = £1,500. Distribution: £60,000 − £1,500 = **£58,500**.",
    },
    {
      kind: "multi",
      id: "capital-treatment-conditions",
      prompt: "Which of these are conditions for capital treatment under CTA 2010 s1033? Select all that apply.",
      options: [
        "The company is an unquoted trading company or holding company of a trading group",
        "The seller has generally owned the shares for at least 5 years",
        "The seller's interest is substantially reduced",
        "The buy-back is funded out of capital",
        "The seller is under 55",
        "The purchase is wholly or mainly to benefit the trade",
      ],
      answers: [0, 1, 2, 5],
      explain: "The source of funding and the seller's age are irrelevant. The trading, purpose, ownership period, substantial reduction and connection tests are what matter.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-bb-payment",
      prompt: "Can a company buy back shares now and pay the seller in three annual instalments?",
      options: ["Yes, with a special resolution", "No: shares must be paid for on purchase", "Yes, if interest is charged", "Only out of capital"],
      answer: 1,
      explain: "CA 2006 s691 requires payment on purchase. Tranches under separate contracts are the usual workaround.",
    },
    {
      kind: "mcq",
      id: "q-bb-approval",
      prompt: "What approval does an off-market buy-back contract need from the shareholders (absent anything more in the articles)?",
      options: ["None", "An ordinary resolution, without counting the selling shareholder's shares being bought", "A special resolution passed unanimously", "Court approval"],
      answer: 1,
      explain: "s694 requires an ordinary resolution; s695 stops the seller's shares from counting.",
    },
    {
      kind: "mcq",
      id: "q-bb-forms",
      prompt: "Which two Companies House forms follow a buy-back out of profits?",
      options: ["SH01 and SH03", "SH03 (return of purchase) and SH06 (notice of cancellation)", "SH19 and SH06", "AA01 and SH03"],
      answer: 1,
      explain: "SH03 and SH06 are both due within 28 days.",
    },
    {
      kind: "mcq",
      id: "q-bb-crr",
      prompt: "Why is a transfer made to the capital redemption reserve on a buy-back out of profits?",
      options: [
        "To pay the stamp duty",
        "To maintain the company's capital: the nominal value cancelled is replaced by an undistributable reserve",
        "To create distributable profits",
        "It's an optional presentation choice",
      ],
      answer: 1,
      explain: "The CRR (s733) protects creditors by keeping the capital base intact. It is not distributable.",
    },
    {
      kind: "mcq",
      id: "q-bb-small",
      prompt: "What is the limit for a small buy-back out of cash by a private company whose articles permit it?",
      options: ["£5,000", "The lower of £15,000 and 5% of share capital in a financial year", "£15,000 in any period", "10% of distributable profits"],
      answer: 1,
      explain: "s692(1ZA) allows the lower of £15,000 or the nominal value of 5% of its fully paid share capital in a financial year.",
    },
    {
      kind: "mcq",
      id: "q-bb-clearance",
      prompt: "Under which provision can a company ask HMRC to confirm in advance that a buy-back qualifies for capital treatment?",
      options: ["TCGA 1992 s165", "CTA 2010 s1044", "ITA 2007 s684", "CA 2006 s709"],
      answer: 1,
      explain: "CTA 2010 s1044 provides the advance clearance procedure for purchase of own shares.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s690 – power of limited company to purchase own shares", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/690" },
    { label: "Companies Act 2006 s692 – financing of purchase of own shares", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/692" },
    { label: "Companies Act 2006 s694 – authority for off-market purchase", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/694" },
    { label: "HMRC Company Taxation manual: purchase of own shares (CTM17500)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm17500" },
    { label: "Corporation Tax Act 2010 s1033 – purchase of own shares: capital treatment", url: "https://www.legislation.gov.uk/ukpga/2010/4/section/1033" },
    { label: "HMRC Stamp Taxes on Shares manual: company purchasing its own shares (STSM021260)", url: "https://www.gov.uk/hmrc-internal-manuals/stamp-taxes-shares-manual/stsm021260" },
  ],
};
