import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "alphabet-shares-waivers-and-settlements",
  title: "Alphabet shares, dividend waivers and the settlements legislation",
  level: "advanced",
  minutes: 40,
  summary:
    "How different classes of share and dividend waivers are used to share company profit between family members, the settlements legislation (ITTOIA 2005 s624, s626) that can undo the planning, and the lessons of Jones v Garnett (Arctic Systems).",
  objectives: [
    "Explain how alphabet shares and dividend waivers work and the company law requirements for each",
    "State the settlements legislation test in ITTOIA 2005 s624 and the outright-gift exception in s626",
    "Distinguish an outright gift of ordinary shares from a gift of shares that are wholly or substantially a right to income",
    "Explain the outcome and significance of Jones v Garnett [2007] UKHL 35",
    "Advise on practical safeguards and when to refuse the planning",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A common request from owner-managed companies: *"Can we pay my spouse a dividend so we use their lower tax band?"* Dividends are taxed in the shareholder's hands, so spreading shares among family members can reduce the total tax bill. That is lawful, but only where the shares are **genuine**, the dividends are **properly paid**, and the **settlements legislation** doesn't re-attribute the income back to the person who gave the shares.`,
    },
    {
      kind: "md",
      md: `### The mechanisms

**Alphabet shares.** The company has more than one class of ordinary share (A, B, C…). Each class can be paid a **different** dividend, in a different amount, at different times, provided the **articles** allow it and the rights attached to each class are consistent with it. Typical use: the director holds A shares, the spouse holds B shares, and dividends are voted on each class separately.

**Dividend waivers.** A shareholder formally **waives** the right to a dividend, so that the others can receive more of a given dividend. Only a **single class** of share is involved, and the dividend is then not paid pro rata. For a waiver to be effective it must be a **deed**, executed **before** the right to the dividend arises (before it is declared), and normally for a **limited period** (often 12 months). A waiver after the dividend is declared is just a gift of a debt.

Both techniques need the company to have **distributable profits** (CA 2006 Part 23) and must be consistent with the **articles** and the **minute** recording the decision.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The settlements legislation (ITTOIA 2005 Part 5 Chapter 5)",
      md: `- **s624:** income arising under a **settlement** where the **settlor retains an interest** is treated as the settlor's income for all tax purposes. "Settlement" includes any "arrangement", and the courts look at the whole arrangement (*Jones v Garnett* [2007] UKHL 35).
- **s626 (exception):** s624 doesn't apply to an **outright gift between spouses or civil partners**, unless the gift **doesn't carry a right to the whole of the income** from the property given, **or** the property is **wholly or substantially a right to income**.
- **Waivers:** HMRC's view (TSEM4225) is that the settlements legislation may apply where a dividend waiver enhances the dividend paid to a family member, because the waiver is a "bounteous arrangement", and part of the income can be attributed back to the waiving spouse.
- **Minor children:** for **unmarried minor children**, income from shares given by a parent is always treated as the parent's (s629), whether or not the gift is outright, unless the income is £100 or less a year.`,
    },
    {
      kind: "table",
      caption: "Where the line falls (HMRC's published approach)",
      head: ["Arrangement", "Settlements legislation?", "Why"],
      rows: [
        ["Spouse is given a genuine, outright holding of **ordinary shares** with voting, dividend and capital rights", "Not caught (s626 exception)", "Not wholly or substantially a right to income; outright gift"],
        ["Spouse is given **B shares** with no votes and no right to capital on a winding up, paid separate dividends", "Likely caught", "Wholly or substantially a right to income; s626 is lost"],
        ["Director **waives** their dividend on a share so the spouse receives a bigger dividend on the same class", "Risk: HMRC may attribute part back to the director", "Waiver is an arrangement conferring a bounty"],
        ["Spouse's shares come with a **bargain** that the spouse will hand the dividend back to the director", "Caught", "Not an outright gift; the settlor retains an interest"],
        ["Spouse actually **works** in the business and the dividend is a reasonable return for the capital and work", "Safer", "Genuine commercial reality, fits the Arctic Systems outcome"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Jones v Garnett [2007] UKHL 35 ('Arctic Systems')",
      md: `Mr Jones, an IT contractor, ran **Arctic Systems Ltd**. His wife held **one of two £1 ordinary shares** (the other was his) and received dividends on it. HMRC argued the dividends were Mr Jones's under the (then) settlements legislation. The **House of Lords** agreed there was a "settlement" (the arrangement) but held the **outright-gift exception** applied: she had been given an ordinary share with the full rights attached, not a right to income only. So the dividends were **hers**.

Important lessons: (1) the outcome turned on the shares being **ordinary shares with full rights**; (2) it didn't give a licence to all alphabet-share planning; (3) HMRC's published approach (TSEM4205, TSEM4225) still applies the rules to arrangements that look different, such as income-only B shares and waivers; (4) the **minor children** rule is unaffected.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Safeguards to put on file",
      md: `1. Check the **articles** (and amend them if necessary) so the share classes and dividend rights are valid.
2. Ensure **genuine** share issue or transfer: Form SH01 or stock transfer form, updated share register and the **confirmation statement** at Companies House.
3. The recipient must **actually receive and keep** the dividend: no agreement or understanding to pass it back.
4. Keep **board minutes** for every dividend and a **voucher** for each shareholder; ensure **distributable reserves** exist.
5. Record the advice in the engagement file: **who** benefits, what **evidence** supports genuine ownership, and the **risk** that the settlements legislation could apply.
6. Keep an eye on the **dividend rates** (10.75% basic, 35.75% higher from 6 April 2026) and the **£500 allowance**: shifting dividends into a second shareholder's lower band is still worth about 25 percentage points on income above the higher-rate threshold, but the saving on basic-rate income is now smaller.`,
    },
  ],
  scenario: {
    title: "Sharing profit at Brennan Digital Ltd",
    narrative: `Brennan Digital Ltd (year end 31 March) is owned and run by Declan Brennan, an additional-rate taxpayer after salary and other income, who holds 100 £1 **ordinary** shares. His wife, Orla, is a basic-rate taxpayer with £0 other income who does the company's admin 15 hours a week but takes no salary. Distributable reserves are £150,000. Declan asks: *"Can we give Orla some shares so more dividends go to her? Or can I just waive my dividend and let her have it?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: the options.**
(a) Transfer **50 ordinary shares** to Orla (outright, same class, full rights).
(b) Create **B shares** with income-only rights and issue them to Orla.
(c) Declan **waives** his dividend on his single class so Orla (a shareholder) can receive more.

**Step 2: settlements legislation.**
(a) An outright gift of ordinary shares between spouses is within the s626 exception *Jones v Garnett*, **provided** it is genuine and Orla keeps the dividends.
(b) Income-only B shares are "wholly or substantially a right to income", so s626 does not protect the arrangement. Treat as **high risk**: dividends could be taxed on Declan.
(c) A waiver to benefit the spouse is the classic arrangement HMRC targets (TSEM4225). Treat as **high risk** unless there is a genuine commercial reason.

**Step 3: the tax result of option (a).** Say the company pays a £60,000 dividend, split 50/50: Orla's £30,000 is taxed at 10.75% after the £500 allowance and personal allowance (she has no other income so her **£12,570 personal allowance** shelters the first part too): £30,000 − £12,570 − £500 = £16,930 taxable × 10.75% = £1,819.98. Declan's £30,000 at the additional rate of 39.35% (after his allowance, if any) = £11,805 (before any allowance). Compare with Declan taking all £60,000 at 39.35% = £23,610. The family saving is about **£9,985**. Check Orla's income carefully: HMRC may also ask what work she does to justify the return.

**Step 4: record and advise.** Document the transfer, update the register, check the articles, and send a letter explaining the risk (including **minor children** if shares were proposed for them) and that Orla must retain the dividends.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-settlements",
      prompt: "Is the settlements legislation (s624) likely to re-attribute the dividend to the donor?",
      categories: ["Likely caught", "Likely not caught"],
      items: [
        { text: "Husband gives wife 50% of his ordinary shares (full rights) outright; she keeps the dividends", answer: 1, why: "Outright gift of ordinary shares between spouses: s626 exception (Jones v Garnett)." },
        { text: "Husband issues non-voting B shares carrying no right to capital to his wife; dividends voted only on B shares", answer: 0, why: "Wholly or substantially a right to income." },
        { text: "Parent gives shares to an unmarried 10-year-old child and dividends of £4,000 a year are paid", answer: 0, why: "The minor-children rule treats income over £100 as the parent's." },
        { text: "Husband waives his dividend by deed so that wife's shares (same class) receive more", answer: 0, why: "A waiver conferring a bounty is the arrangement HMRC says may be a settlement." },
      ],
      explain: "Focus on whether the gift is outright and of a share carrying full rights, and whether anyone else benefits from the arrangement.",
    },
    {
      kind: "numeric",
      id: "family-saving",
      prompt: "A company pays a £40,000 dividend all to a director taxed at 39.35% (assume no allowance). Instead, the dividend is split 50/50 with a spouse with no other income (personal allowance £12,570, £500 dividend allowance, 10.75% basic rate; assume the director has no allowance). What is the total tax saving for the family (to the nearest £1)?",
      answer: 7125,
      tolerance: 1,
      unit: "£",
      explain: "Compare the director's tax on £40,000 with the director's tax on £20,000 plus the spouse's tax on £20,000.",
      working: "All to director: £40,000 × 39.35% = £15,740. Split: director £20,000 × 39.35% = £7,870; spouse (£20,000 − £12,570 − £500) = £6,930 × 10.75% = £744.98. Total £8,614.98. Saving = £15,740 − £8,614.98 = **£7,125.02**.",
    },
    {
      kind: "mcq",
      id: "mcq-waiver-timing",
      prompt: "For a dividend waiver to be effective it should be…",
      options: [
        "Signed after the dividend is declared",
        "A deed executed before the right to the dividend arises",
        "Verbal agreement",
        "Filed at Companies House",
      ],
      answer: 1,
      explain: "A waiver must precede the entitlement; a later waiver is a release of a debt, which may be a gift.",
    },
    {
      kind: "mcq",
      id: "mcq-garnett-result",
      prompt: "What was the outcome in Jones v Garnett (Arctic Systems)?",
      options: [
        "The dividends were taxable on Mr Jones",
        "The dividends were Mrs Jones's: the outright-gift exception applied to her ordinary share",
        "The company was dissolved",
        "The case was struck out",
      ],
      answer: 1,
      explain: "The House of Lords held there was a settlement but the s626 exception for outright gifts between spouses applied.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-section",
      prompt: "Which section contains the main settlor-interested settlements charge?",
      options: ["ITTOIA 2005 s624", "CTA 2010 s455", "ITEPA s188", "ITA 2007 s35"],
      answer: 0,
      explain: "s624 treats income as the settlor's where the settlor retains an interest.",
    },
    {
      kind: "mcq",
      id: "q-626",
      prompt: "s626 provides an exception for…",
      options: ["Gifts to charity", "Outright gifts between spouses or civil partners", "Gifts to children", "Gifts to employees"],
      answer: 1,
      explain: "With conditions on income-only property.",
    },
    {
      kind: "mcq",
      id: "q-children",
      prompt: "Dividends on shares given by a parent to an unmarried minor child are treated as the parent's income if they exceed…",
      options: ["£100 a year", "£1,000 a year", "£500 a year", "Never"],
      answer: 0,
      explain: "The £100 limit applies per parent-gift (s629).",
    },
    {
      kind: "mcq",
      id: "q-alpha-articles",
      prompt: "Before paying different dividends on different share classes you should check…",
      options: ["The articles allow it", "The bank account is open", "The auditor's fee", "The VAT return"],
      answer: 0,
      explain: "The articles and rights attached to each class determine what may be paid.",
    },
    {
      kind: "mcq",
      id: "q-reserves",
      prompt: "Do alphabet-share dividends need distributable reserves?",
      options: ["No, they are exempt", "Yes, like any dividend", "Only for A shares", "Only for waived dividends"],
      answer: 1,
      explain: "CA 2006 Part 23 applies to all distributions.",
    },
  ],
  sources: [
    { label: "TSEM4205 – outright gifts between spouses", url: "https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4205" },
    { label: "TSEM4225 – dividend waiver and the settlements legislation", url: "https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4225" },
    { label: "TSEM4210 – look at the whole arrangement", url: "https://www.gov.uk/hmrc-internal-manuals/trusts-settlements-and-estates-manual/tsem4210" },
    { label: "Jones v Garnett [2007] UKHL 35", url: "https://www.bailii.org/uk/cases/UKHL/2007/35.html" },
    { label: "ITTOIA 2005 s624", url: "https://www.legislation.gov.uk/ukpga/2005/5/section/624" },
    { label: "ITTOIA 2005 s626", url: "https://www.legislation.gov.uk/ukpga/2005/5/section/626" },
  ],
};
