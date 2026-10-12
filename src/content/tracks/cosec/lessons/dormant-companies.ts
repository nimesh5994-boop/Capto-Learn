import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "dormant-companies",
  title: "Dormant companies: Companies House and HMRC",
  level: "practitioner",
  minutes: 30,
  summary:
    "The two different meanings of 'dormant' — for Companies House (no significant accounting transactions) and for corporation tax (no trade or income) — what a dormant company must still file, dormant accounts and AA02, and what to do when a dormant company wakes up.",
  objectives: [
    "Apply the Companies House test of dormancy and the transactions it disregards",
    "Explain how HMRC's corporation tax meaning of dormant differs, and what to tell HMRC",
    "List what a dormant company must still file, and when AA02 can and can't be used",
    "Handle a dormant company that starts trading or receives income",
  ],
  body: [
    {
      kind: "md",
      md: `Clients keep dormant companies for all sorts of reasons: to protect a name, as a shell for a future venture, as a property-holding vehicle that hasn't bought anything yet, or simply because nobody got round to striking it off. "Dormant" sounds like "nothing to do", but there are **two separate tests**, and a company can be dormant for one and not the other.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Dormant for Companies House (CA 2006 s1169)",
      md: `A company is dormant during a period in which it has **no significant accounting transaction**: a transaction that must be entered in the company's accounting records.

These are **disregarded** (they don't stop a company being dormant):
- payment for shares taken by subscribers on incorporation;
- fees paid to the registrar (e.g. confirmation statement fee, change of name fee);
- late filing penalties paid to Companies House.

Almost anything else counts: bank interest received, bank charges, an accountancy fee, a loan from a director.`,
    },
    {
      kind: "md",
      md: `### Dormant for corporation tax

HMRC's test is different. A company is usually dormant for corporation tax if it is **not carrying on a business** and has **no income**: no trade, no rents, no investment income. A newly incorporated company that hasn't started trading is dormant for CT. Earning even a little bank interest means the company has income within the charge to CT, so it is not dormant for HMRC's purposes. The interest also has to be entered in the accounting records, so it stops the company being dormant for Companies House too.

If HMRC thinks the company is dormant it may write to say it will treat it as dormant and won't expect returns. If the company has received a **notice to deliver a Company Tax Return**, it must still file a return for that period showing it was dormant. After that, no returns are needed unless a further notice arrives.`,
    },
    {
      kind: "table",
      caption: "Dormant for Companies House vs dormant for HMRC",
      head: ["Event in the year", "Companies House", "HMRC (corporation tax)"],
      rows: [
        ["Nothing at all happened", "Dormant", "Dormant"],
        ["Director paid the £50 confirmation statement fee personally", "Dormant (registrar fees disregarded)", "Dormant"],
        ["Bank account earned £3 interest", "Not dormant", "Not dormant (income)"],
        ["Bank charged a £5 monthly fee", "Not dormant (a transaction to record)", "Usually still dormant: no business or income"],
        ["Company paid an accountant £300 for the dormant accounts", "Not dormant", "Usually still dormant"],
        ["Company owns a let flat", "Not dormant", "Not dormant (property business)"],
      ],
    },
    {
      kind: "md",
      md: `### What a dormant company must still file

- **Confirmation statement** every year, with the £50 fee, including directors' identity verification.
- **Annual accounts** at Companies House, by the **same deadline** and subject to the **same late filing penalties** as any other company.
- Corporation tax returns only if HMRC has issued a notice to deliver.

**Dormant accounts** are a cut-down set: a balance sheet with notes, no profit and loss account and no directors' report, with comparatives and a statement on the balance sheet that the company was dormant throughout the period. A dormant company that qualifies as small can claim **audit exemption** (CA 2006 s480).`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "AA02 is not for every dormant company",
      md: `The paper form **AA02** is only for a company that has been dormant **since incorporation** and has **never traded**. It isn't suitable for a company that traded and then went dormant, or for most dormant subsidiaries. Those file dormant accounts online or through software in the normal way. Remember Companies House's planned move to **software-only accounts filing from 1 April 2028**, which will end paper and web filing of accounts.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Keeping a company properly dormant",
      md: `If a client wants a company to stay dormant cheaply, advise them to **not open a bank account** (or to use one with no fees or interest), to pay the confirmation statement fee personally, and to keep it that way. The moment the company pays anything other than registrar fees, it needs full (micro-entity or small) accounts for that period.`,
    },
    {
      kind: "md",
      md: `### Waking up: when a dormant company starts to trade

- **HMRC:** tell HMRC **within 3 months** of the company starting business activity (trading, letting property, earning income). This starts an accounting period for corporation tax.
- **VAT and PAYE:** register if the thresholds or obligations are met. While dormant, a company that plans to restart can stay VAT-registered and file nil returns; one that won't trade again should deregister.
- **Companies House:** nothing to file at the time. The next accounts will simply be non-dormant.`,
    },
  ],
  scenario: {
    title: "Two 'dormant' companies belonging to Nadia Okafor",
    narrative: `Nadia Okafor has two companies:

- **Okafor Interiors Ltd**, incorporated in March 2025 to protect the name. It has a bank account that charged £60 in fees during the year to 31 March 2026. Nadia paid the £50 confirmation statement fee from her personal card. HMRC has never issued a notice to deliver a return.
- **Okafor Property Ltd**, which traded as a design studio until 2023 and since then has done nothing except earn **£42** of bank interest a year on £2,800 left in its account.

Nadia asks: *"Both are dormant, so I can just send the AA02, right?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Okafor Interiors, Companies House.** The £60 bank charges are transactions the company must record, so it is **not dormant** for Companies House for the year to 31 March 2026. It needs micro-entity accounts, not dormant accounts. The CS01 fee paid by Nadia is disregarded, but the bank charges aren't.
2. **Okafor Interiors, HMRC.** No business and no income, so it's dormant for corporation tax. No notice to deliver has been issued, so no CT600 is needed. Confirm by checking the HMRC online account.
3. **Okafor Property, Companies House.** Bank interest is a significant accounting transaction: **not dormant**. It also traded previously, so AA02 couldn't be used anyway.
4. **Okafor Property, HMRC.** £42 of interest is income within the charge to corporation tax. It's **not dormant** for CT: it must tell HMRC it's within the charge and file returns, paying tax on the interest (19% on £42 = £7.98, before any expenses).
5. **Advice.** Close Okafor Interiors' bank account or switch to a fee-free account so it can genuinely be dormant from next year. For Okafor Property, consider whether to extract the £2,800 and strike it off.`,
      },
      {
        kind: "journal",
        title: "Recording the confirmation statement fee Nadia paid for Okafor Interiors",
        narrative: "Even though it's disregarded for the dormancy test, the company still owes Nadia the £50. Registrar fees are outside the scope of VAT.",
        lines: [
          { account: "Companies House fees", dr: 50 },
          { account: "Director's loan account", cr: 50 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "dormant-or-not-ch",
      prompt: "For each company, was it dormant for Companies House purposes during the year?",
      categories: ["Dormant", "Not dormant"],
      items: [
        { text: "No bank account; the director paid the confirmation statement fee personally", answer: 0 },
        { text: "Received £1.20 of bank interest", answer: 1, why: "Interest must be recorded: a significant accounting transaction." },
        { text: "Paid a Companies House late filing penalty of £150", answer: 0, why: "Late filing penalties are disregarded." },
        { text: "Director lent the company £500 to pay an accountant", answer: 1 },
        { text: "Subscribers paid for their shares on incorporation and nothing else happened", answer: 0, why: "Payment for subscriber shares is disregarded." },
      ],
      explain: "CA 2006 s1169: a company is dormant if it has no significant accounting transactions, ignoring subscriber share payments, registrar fees and late filing penalties.",
    },
    {
      kind: "journal",
      id: "dormant-fee-journal",
      prompt:
        "A dormant company has no bank account. Its director pays the £50 online confirmation statement fee from her own account. Post the company's entry.",
      accounts: ["Companies House fees", "Director's loan account", "Bank", "VAT control (input tax)", "Share capital – ordinary", "Accruals"],
      answer: [
        { account: "Companies House fees", dr: 50 },
        { account: "Director's loan account", cr: 50 },
      ],
      explain:
        "The company owes the director £50. Companies House fees are outside the scope of VAT, so there's no input tax. The fee is disregarded when deciding whether the company is dormant.",
    },
    {
      kind: "mcq",
      id: "aa02-eligible",
      prompt: "Which company can use form AA02?",
      options: [
        "A company that traded until 2024 and has done nothing since",
        "A company dormant since incorporation that has never traded",
        "A dormant subsidiary guaranteed by its parent",
        "Any company that is dormant for corporation tax",
      ],
      answer: 1,
      explain: "AA02 is only for companies that have never traded since incorporation.",
    },
    {
      kind: "numeric",
      id: "restart-notify",
      prompt:
        "A dormant company begins trading on 1 September 2026. Within how many months must it tell HMRC that it has started business activity?",
      answer: 3,
      unit: "months",
      explain: "A company must tell HMRC within 3 months of starting to carry on business, which also starts its first accounting period for CT.",
      working: "Notify by **30 November 2026** — 3 months.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-dormant-deadline",
      prompt: "A dormant private company files its accounts 3 weeks late. What happens?",
      options: [
        "Nothing: dormant companies don't get penalties",
        "A £150 late filing penalty, as for any private company",
        "A warning letter only",
        "The company is struck off",
      ],
      answer: 1,
      explain: "Dormant companies have the same deadlines and penalties. 'The company is dormant' is not a ground of appeal.",
    },
    {
      kind: "mcq",
      id: "q-dormant-ct-interest",
      prompt: "A non-trading company earns £15 of bank interest. Is it dormant for corporation tax?",
      options: ["Yes, the amount is trivial", "No: it has income within the charge to CT", "Yes, interest is exempt", "Only if the director agrees"],
      answer: 1,
      explain: "Any income, including interest, means the company is not dormant for CT purposes.",
    },
    {
      kind: "mcq",
      id: "q-dormant-cs01",
      prompt: "Does a dormant company still have to file a confirmation statement?",
      options: ["No", "Yes, every year, with the usual fee", "Only every 3 years", "Only if it has a bank account"],
      answer: 1,
      explain: "All companies must file a confirmation statement at least once every 12 months.",
    },
    {
      kind: "mcq",
      id: "q-dormant-accounts",
      prompt: "What do dormant accounts include?",
      options: [
        "A full profit and loss account and directors' report",
        "A balance sheet and notes with a statement that the company was dormant, plus comparatives",
        "Nothing: dormant companies file a nil return",
        "Only a cash flow statement",
      ],
      answer: 1,
      explain: "Dormant accounts are a balance sheet and notes with the dormancy statement; no profit and loss account or directors' report.",
    },
    {
      kind: "mcq",
      id: "q-dormant-notice",
      prompt: "HMRC sends a dormant company a notice to deliver a Company Tax Return. What should the company do?",
      options: ["Ignore it", "File a return for the period showing it was dormant", "Write to Companies House", "Pay a £100 penalty in advance"],
      answer: 1,
      explain: "A notice to deliver must be complied with, even if the return shows the company was dormant.",
    },
  ],
  sources: [
    { label: "Dormant companies and associations (GOV.UK guide)", url: "https://www.gov.uk/dormant-company" },
    { label: "Companies Act 2006 s1169 – dormant companies", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/1169" },
    { label: "Companies House: preparing and filing Companies House accounts (dormant accounts)", url: "https://www.gov.uk/government/publications/life-of-a-company-annual-requirements/life-of-a-company-part-1-accounts" },
    { label: "Companies Act 2006 s480 – dormant companies: audit exemption", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/480" },
    { label: "HMRC COTAX manual: accounting periods and dormancy (COM1040)", url: "https://www.gov.uk/hmrc-internal-manuals/cotax-manual/com1040" },
  ],
};
