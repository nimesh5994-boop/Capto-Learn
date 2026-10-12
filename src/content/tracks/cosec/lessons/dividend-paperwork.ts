import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "dividend-paperwork",
  title: "Dividends: getting the paperwork and the law right",
  level: "practitioner",
  minutes: 35,
  summary:
    "Interim and final dividends, board minutes and dividend vouchers, the distributable profits test and 'relevant accounts', what happens when a dividend turns out to be unlawful, and dividend waivers.",
  objectives: [
    "Distinguish interim and final dividends and who declares each under the model articles",
    "Check that a proposed dividend is covered by distributable profits shown in relevant accounts",
    "Prepare the board minute, any shareholder resolution and the dividend vouchers",
    "Explain the consequences of an unlawful dividend and how to handle a dividend waiver",
  ],
  body: [
    {
      kind: "md",
      md: `Dividends are how most owner-managed companies pay their directors, so your practice will document hundreds of them a year. The company secretarial side matters because HMRC, liquidators and buyers all look at it: a dividend that wasn't properly declared, or that the company couldn't lawfully pay, may be re-characterised as salary or as a loan from the company, with very different tax results.`,
    },
    {
      kind: "table",
      caption: "Interim and final dividends under the model articles (art 30)",
      head: ["", "Interim dividend", "Final dividend"],
      rows: [
        ["Who decides", "The directors (board decision)", "Declared by the shareholders by ordinary resolution, on the directors' recommendation"],
        ["Limit", "Directors must be satisfied the company has sufficient distributable profits", "Can't exceed the amount the directors recommend"],
        ["When it becomes a debt", "Only when **paid**: the board can change its mind until then", "When **declared**, unless a later payment date is set"],
        ["Typical use", "Quarterly or monthly drawings for director-shareholders", "After the accounts are approved, often at a year-end meeting"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The distributable profits test (CA 2006 ss830 and 836)",
      md: `A company may only make a distribution out of profits available for the purpose: its **accumulated, realised profits** (so far as not previously distributed or capitalised) **less its accumulated, realised losses** (so far as not previously written off).

Whether a distribution can be made is judged by reference to **relevant accounts** (s836): normally the last annual accounts circulated to members. If those don't show enough profit, the company can prepare **interim accounts** (s838) that enable a reasonable judgement to be made. For a private company these needn't be filed, but they must be real accounts, not a guess.`,
    },
    {
      kind: "md",
      md: `### What counts towards distributable profits

- **Retained earnings** (the profit and loss reserve) is the starting point, after deducting dividends already paid or declared out of it.
- **Share premium, share capital and the capital redemption reserve are not distributable.**
- A **revaluation reserve** is unrealised, so it isn't distributable (though extra depreciation on the revalued amount can be treated as realised).
- **Current year losses to date** reduce what's available. If the company is losing money this year, last year's accounts may overstate what's available. The directors must take into account anything they know that has reduced profits since the relevant accounts.
- Don't forget the **corporation tax** on the current year's profits: profits are after tax.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Dividends from management accounts that haven't been adjusted",
      md: `Directors often declare interim dividends based on a bank balance or an unadjusted Xero profit figure. Before signing off a dividend minute, make sure the profit used allows for **depreciation, accruals, stock adjustments and the corporation tax liability**. A company with £60,000 in the bank can still have negative reserves.`,
    },
    {
      kind: "md",
      md: `### The paperwork

1. **Board minute** (interim) or **board minute recommending** plus **ordinary resolution** (final). Record the amount per share, the class, the record date and the payment date, and that the directors considered the relevant accounts and are satisfied there are sufficient distributable profits.
2. **Dividend voucher** for each shareholder. There's no Companies Act form, but each voucher should show the company name, the shareholder's name and address, the date of payment, the number and class of shares, the amount per share and the total paid. HMRC expects evidence that the payment was a dividend.
3. **Payment**: by bank transfer, or by crediting the shareholder's **director's loan account** if the money isn't drawn immediately. A dividend credited to the DLA is paid when credited.
4. **Pro rata.** Dividends on a class must be paid according to the number of shares held. You can't pay one ordinary shareholder more per share than another of the same class (that's what different classes, such as alphabet shares, are for).`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Unlawful dividends (CA 2006 s847)",
      md: `If a distribution is made in breach of the rules and, at the time, the shareholder **knows or has reasonable grounds for believing** it was unlawful, they are liable to **repay** it (or its value). Director-shareholders almost always "know", because they made the decision. Directors may also be personally liable for breach of duty.

In practice: an overdrawn reserve is often corrected by reclassifying the excess as a **debit to the director's loan account**, which then carries s455 and benefit-in-kind consequences if not cleared.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Dividend waivers",
      md: `A shareholder can **waive** their right to a dividend by deed, executed **before** they become entitled to it (before an interim is paid, or before a final is declared). HMRC may apply the **settlements legislation** if a waiver lets another shareholder (often a spouse) receive more than they otherwise would, especially if the company couldn't have paid the same rate on all shares without the waiver. Keep waivers rare, documented and commercially explained.`,
    },
  ],
  scenario: {
    title: "A year-end dividend for Ashcombe IT Services Ltd",
    narrative: `Ashcombe IT Services Ltd has 100 £1 ordinary shares: Lena Ashcombe 60, her husband Mike 40. Both are directors. The draft accounts for the year ended 30 June 2026 show:

| | £ |
|---|---:|
| Retained earnings at 1 July 2025 | 18,400 |
| Profit after tax for the year | 52,600 |
| Interim dividends paid during the year | (40,000) |
| Revaluation reserve (office revalued) | 25,000 |
| Share premium | 9,900 |

Lena asks: *"We've got £70k-odd in reserves, can we take a £60,000 final dividend?"* Trading since July has been at roughly break-even.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Identify distributable reserves.** Retained earnings: £18,400 + £52,600 − £40,000 = **£31,000**. The revaluation reserve is unrealised and share premium is capital, so neither counts.
2. **Answer Lena.** A £60,000 dividend would exceed distributable profits by £29,000. The maximum is **£31,000**, and the directors should consider whether anything since 30 June (break-even trading, any big bad debt) reduces it.
3. **Recommend and declare.** Suppose they agree £30,000, i.e. **£300 per share**. The directors minute a recommendation, and the shareholders pass an ordinary resolution declaring it once the accounts are approved. Lena receives £18,000 and Mike £12,000.
4. **Vouchers.** Prepare a voucher for each, with the payment date.
5. **Posting.** A final dividend is a liability when declared. If they leave it in their DLAs, credit those instead of bank.`,
      },
      {
        kind: "journal",
        title: "Declaring and crediting the final dividend to the directors' loan accounts",
        lines: [
          { account: "Retained earnings – dividends", dr: 30000 },
          { account: "Director's loan account – Lena Ashcombe", cr: 18000 },
          { account: "Director's loan account – Mike Ashcombe", cr: 12000 },
        ],
      },
      {
        kind: "callout",
        tone: "warning",
        title: "The interim dividends: check those too",
        md: `The £40,000 of interim dividends were paid during the year. Were they covered at the time? At 1 July 2025 reserves were only £18,400, so for the interims to be lawful when paid the directors needed evidence (management accounts or interim accounts) that profits had accrued during the year. If the file has nothing, fix the process now for next year.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "max-distributable",
      prompt:
        "A company's balance sheet shows: share capital £1,000, share premium £14,000, revaluation reserve £40,000, and retained earnings of £23,500 after the year's profit. Since the year end the directors have paid an interim dividend of £8,000 and they know of a £3,500 loss on a customer that went into administration after the accounts were drawn up (not yet provided for). What is the maximum further dividend they can reasonably pay?",
      answer: 12000,
      unit: "£",
      explain:
        "Only realised profits are distributable: share capital, share premium and the revaluation reserve are excluded. Deduct distributions already made and known losses since the relevant accounts.",
      working: "£23,500 − £8,000 interim − £3,500 bad debt = **£12,000**.",
    },
    {
      kind: "classify",
      id: "distributable-or-not",
      prompt: "Classify each reserve or item for a private company's distributable profits test.",
      categories: ["Counts as distributable", "Not distributable"],
      items: [
        { text: "Retained earnings brought forward", answer: 0 },
        { text: "Share premium account", answer: 1 },
        { text: "Revaluation reserve on a property", answer: 1, why: "Unrealised." },
        { text: "Profit after tax for the current year", answer: 0 },
        { text: "Capital redemption reserve", answer: 1 },
        { text: "Called-up share capital", answer: 1 },
      ],
      explain: "Distributable profits are accumulated realised profits less accumulated realised losses. Capital reserves and unrealised gains are excluded.",
    },
    {
      kind: "journal",
      id: "interim-dividend-bank",
      prompt:
        "The directors of a company with 1,000 ordinary shares pay an interim dividend of £15 per share by bank transfer. Post the entry.",
      accounts: ["Retained earnings – dividends", "Bank", "Dividends payable", "Share premium", "Director's remuneration", "Corporation tax"],
      answer: [
        { account: "Retained earnings – dividends", dr: 15000 },
        { account: "Bank", cr: 15000 },
      ],
      explain:
        "1,000 × £15 = £15,000. An interim dividend is only a liability when paid, so there's no 'dividends payable' step. Dividends are a distribution of reserves, never an expense in the profit and loss account and never director's remuneration.",
    },
    {
      kind: "mcq",
      id: "interim-cancel",
      prompt: "The board resolves on 1 March to pay an interim dividend on 31 March. On 20 March trading worsens. Can the board cancel it?",
      options: [
        "No: it became a debt when the board resolved",
        "Yes: an interim dividend is not a debt until it is paid",
        "Only with a special resolution of shareholders",
        "Only if Companies House is notified",
      ],
      answer: 1,
      explain: "A board resolution to pay an interim can be revoked before payment. A declared final dividend, by contrast, is a debt from declaration.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-final-who",
      prompt: "Under the model articles, who declares a final dividend?",
      options: ["The directors alone", "The shareholders by ordinary resolution, not exceeding the amount the directors recommend", "The shareholders by special resolution", "The company secretary"],
      answer: 1,
      explain: "Model articles art 30: final dividends are declared by ordinary resolution, capped at the directors' recommendation.",
    },
    {
      kind: "mcq",
      id: "q-relevant-accounts",
      prompt: "If the last annual accounts don't show enough distributable profit for an interim dividend, what can the company do?",
      options: [
        "Pay it anyway and fix it at the year end",
        "Prepare interim accounts that enable a reasonable judgement of distributable profits",
        "Use the bank balance as evidence",
        "Pay it out of share premium",
      ],
      answer: 1,
      explain: "CA 2006 s838 allows interim accounts to be used as relevant accounts.",
    },
    {
      kind: "mcq",
      id: "q-s847",
      prompt: "A director-shareholder receives a dividend that the company had insufficient profits to pay. Under s847, what is the position?",
      options: [
        "No consequence if the dividend voucher was signed",
        "She is liable to repay it if she knew or had reasonable grounds to believe it was unlawful",
        "HMRC must refund the tax",
        "The company must issue new shares to cover it",
      ],
      answer: 1,
      explain: "A member who knew or had reasonable grounds for believing the distribution was unlawful must repay it. Directors who approved it are rarely able to say they didn't know.",
    },
    {
      kind: "mcq",
      id: "q-waiver-timing",
      prompt: "When must a dividend waiver be executed to be effective?",
      options: ["Within 30 days after payment", "Before the shareholder becomes entitled to the dividend", "At the next AGM", "Any time before the tax return is filed"],
      answer: 1,
      explain: "A waiver must be made by deed before entitlement arises; afterwards, giving up a dividend is a gift of money.",
    },
    {
      kind: "mcq",
      id: "q-pro-rata",
      prompt: "Can a company pay £10 per share to one holder of its ordinary shares and £5 per share to another holder of the same class?",
      options: ["Yes, if the directors agree", "No: dividends on a class must be paid pro rata to the shares held", "Yes, if one holder is a director", "Only for interim dividends"],
      answer: 1,
      explain: "Shares of the same class carry the same rights. Different rates need different classes (or a valid waiver).",
    },
  ],
  sources: [
    { label: "Companies Act 2006 s830 – distributions to be made only out of profits available", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/830" },
    { label: "Companies Act 2006 s836 – justification of distribution by reference to relevant accounts", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/836" },
    { label: "Companies Act 2006 s847 – consequences of unlawful distribution", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/847" },
    { label: "Running a limited company: taking money out", url: "https://www.gov.uk/running-a-limited-company/taking-money-out-of-a-limited-company" },
    { label: "HMRC Company Taxation manual: distributions (CTM15000)", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm15000" },
    { label: "ICAEW: illegal dividends in a private company", url: "https://www.icaew.com/technical/tas-helpsheets/law-and-regulation/illegal-dividends-in-a-private-company" },
  ],
};
