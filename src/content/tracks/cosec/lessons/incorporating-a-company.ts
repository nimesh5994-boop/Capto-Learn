import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "incorporating-a-company",
  title: "Incorporating a company",
  level: "foundation",
  minutes: 35,
  summary:
    "What goes into an incorporation application — name, registered office, registered email address, SIC codes, share capital, officers, PSCs, articles and the lawful purpose statement — and the post-2024 rules that most often trip people up.",
  objectives: [
    "List the information and documents needed to incorporate a private company limited by shares",
    "Apply the 'appropriate address' rule for registered offices and the registered email address requirement",
    "Choose between model articles and bespoke articles, and pick suitable SIC codes",
    "Record the opening share capital correctly in the books",
  ],
  body: [
    {
      kind: "md",
      md: `Most practices incorporate companies through Companies House software filing or the online service rather than the paper form IN01. Whichever route you use, the information required is the same. Get it right first time: a company's details are on the public register from day one, and mistakes need follow-up filings to put right.`,
    },
    {
      kind: "table",
      caption: "What an incorporation application must contain",
      head: ["Item", "What you need", "Common pitfall"],
      rows: [
        ["Company name", "Must end in Limited/Ltd (or plc). Can't be the same as an existing name, and some words are sensitive and need approval.", "A 'too like' name can be challenged later and force a change"],
        ["Registered office", "An **appropriate address** in the right jurisdiction (England and Wales, Wales, Scotland or Northern Ireland)", "PO Boxes are no longer allowed"],
        ["Registered email address", "An email Companies House can use to contact the company. It isn't published.", "Using the accountant's general inbox without agreeing who monitors it"],
        ["SIC codes", "Up to four Standard Industrial Classification (2007) codes describing the business", "Choosing 99999 (dormant) for a company that will trade"],
        ["Statement of capital and initial shareholdings", "Number, class and nominal value of shares, amount paid, and each subscriber's holding", "Forgetting class rights when there's more than one class"],
        ["Officers", "At least one director (a natural person), each **identity verified** with a Companies House personal code. Secretary optional.", "Director hasn't verified yet, so the application can't proceed"],
        ["People with significant control", "Details of each PSC, or a statement that there is none", "Missing an indirect controller through a holding company"],
        ["Articles of association", "Model articles, or bespoke articles attached", "Bespoke articles that conflict with the share structure"],
        ["Memorandum of association", "A short statement by the subscribers that they wish to form the company and agree to become members", "Not signed or authenticated by every subscriber"],
        ["Statements", "Statement of compliance, and the **lawful purpose statement** that the company is being formed for a lawful purpose", "Treating these as boilerplate: they are statements of fact"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The appropriate address rule (in force from 4 March 2024)",
      md: `A company's registered office must at all times be an **appropriate address**. In Companies House's words, it's an address where documents sent to the registered office "should be expected to come to the attention of a person acting on behalf of the company" and where delivery can be recorded by an acknowledgement. A **PO Box can't be used**. Companies House can change a company's registered office to its default address if it isn't appropriate.`,
    },
    {
      kind: "md",
      md: `### Articles: model or bespoke?

The **articles of association** are the company's internal rulebook: how directors are appointed, how decisions are made, how shares are transferred and how dividends are declared. If a company doesn't register its own articles, the **model articles** in the Companies (Model Articles) Regulations 2008 apply automatically.

Model articles suit a straightforward company with one class of ordinary shares. Consider bespoke articles (or amended model articles) when:
- there will be **more than one share class** (for example voting and non-voting shares, or alphabet shares for flexible dividends);
- shareholders want **pre-emption rights on transfer** (a right of first refusal when another shareholder sells);
- there are investors who need special rights, drag-along or tag-along provisions;
- there's a sole director and you want to make clear that one director can make decisions alone.

Bespoke articles are legal drafting. In most practices they come from a precedent bank or a solicitor, not written from scratch.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "SIC codes",
      md: `Pick the code(s) describing what the company will **actually do**, using the 5-digit SIC 2007 list. A contractor providing IT consultancy might use 62020; a buy-to-let company 68209 (other letting and operating of own or leased real estate). Banks, insurers and HMRC all look at SIC codes, so a wrong code causes friction. You can update them later on the confirmation statement.`,
    },
    {
      kind: "md",
      md: `### Fees and timing

From the current Companies House fees schedule: incorporation costs **£100** online or by software, **£124** on paper, and **£156** for a same-day incorporation through software. Fees change periodically (several rose on 1 February 2026), so always check the schedule before quoting a client.

Once the company is incorporated you receive the **certificate of incorporation**, the company number and an **authentication code**, which is needed for future online filings. Keep the code secure: anyone with it can file for the company.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Things that follow incorporation",
      md: `Incorporation is only the start. Within the first few weeks you'll usually need to: register the company for corporation tax (within 3 months of starting to trade), consider VAT and PAYE registration, open a business bank account, issue share certificates, record the opening entries, diarise the first confirmation statement and accounts deadlines, and update your engagement letter and client due diligence for the new entity.`,
    },
    {
      kind: "md",
      md: `### Accounting reference date

A new company's **accounting reference date (ARD)** is set automatically as the **last day of the month in which the anniversary of incorporation falls**. A company incorporated on 12 May 2026 has an ARD of 31 May, and its first accounting period runs from 12 May 2026 to 31 May 2027. You can change the ARD later with form AA01, covered in a later lesson.`,
    },
  ],
  scenario: {
    title: "Setting up Coastline Coffee Ltd",
    narrative: `Mei Lin and Daniel Price are opening a coffee shop in Brighton. They want a company with 100 ordinary £1 shares, 60 to Mei and 40 to Daniel, both as directors. They will pay for their shares later. Daniel suggests using a PO Box as the registered office "for privacy", and Mei asks whether they can just use your firm's address.

They also want Daniel to receive a bigger share of profits in some years because he's putting in more hours.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Check the name** on the Companies House name availability search and the trade marks register before anything else.
2. **Registered office.** A PO Box isn't an appropriate address. Your firm's address is fine **if** your engagement covers a registered office service and you have a process to acknowledge and forward post. If not, use the café address. Point out that directors can give a **service address** to keep their home addresses off the public register.
3. **Identity verification.** Mei and Daniel must each verify their identity (through GOV.UK One Login or through an ACSP, such as your firm if it's registered) and give you their personal codes before the application is submitted.
4. **PSCs.** Mei holds 60% and Daniel 40%: both hold more than 25%, so both are PSCs.
5. **Articles.** The profit-sharing request is the key point. With one class of ordinary shares, dividends must be paid pro rata 60:40. If they genuinely want flexibility, they need separate share classes (for example A and B shares) and suitable articles. Explain the tax risk of using alphabet shares between spouses or to shift income, and get the articles from your precedent bank.
6. **SIC code.** 56102 (unlicensed restaurants and cafés) fits a coffee shop.
7. **Opening entries.** The shares are unpaid, so record a debtor for the unpaid capital.`,
      },
      {
        kind: "journal",
        title: "Opening entry: 100 £1 shares issued, unpaid",
        narrative: "The share capital is allotted on incorporation but the subscribers haven't paid yet.",
        lines: [
          { account: "Called-up share capital not paid", dr: 100 },
          { account: "Share capital", cr: 100 },
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "registered-office-addresses",
      prompt: "Which of these can be used as a company's registered office from 4 March 2024?",
      categories: ["Appropriate address", "Not appropriate"],
      items: [
        { text: "A PO Box number at the local sorting office", answer: 1, why: "PO Boxes can no longer be used." },
        { text: "The director's home address, where she lives and receives post", answer: 0 },
        { text: "The firm of accountants' office under a registered office agreement with a post-handling procedure", answer: 0 },
        { text: "An empty unit the company has given up, where nobody collects the post", answer: 1, why: "Documents wouldn't come to the attention of anyone acting for the company." },
        { text: "A registered office service provider that signs for and scans post to the company", answer: 0 },
      ],
      explain:
        "The test is whether documents sent there would be expected to come to the attention of someone acting for the company, and whether delivery can be acknowledged. A PO Box is excluded outright.",
    },
    {
      kind: "journal",
      id: "director-paid-fee",
      prompt:
        "The director of a new company paid the £100 Companies House incorporation fee from her personal card. The company will repay her later. Post the company's entry.",
      accounts: ["Formation costs", "Director's loan account", "Bank", "Share capital", "VAT control (input tax)", "Trade creditors"],
      answer: [
        { account: "Formation costs", dr: 100 },
        { account: "Director's loan account", cr: 100 },
      ],
      explain:
        "The company owes the director £100, so her loan account is credited. Companies House fees are outside the scope of VAT, so there's no input tax to claim.",
    },
    {
      kind: "numeric",
      id: "incorporation-fees",
      prompt:
        "Using the current fees schedule, a practice incorporates three companies by software in a week: two standard incorporations and one same-day incorporation. What is the total Companies House fee?",
      answer: 356,
      unit: "£",
      explain: "Standard software incorporation is £100 and same-day software incorporation is £156.",
      working: "(2 × £100) + £156 = **£356**.",
    },
    {
      kind: "mcq",
      id: "ard-new-company",
      prompt: "A company is incorporated on 19 October 2026. What is its accounting reference date?",
      options: ["19 October", "31 October", "30 September", "31 March"],
      answer: 1,
      explain: "The ARD is the last day of the month in which the anniversary of incorporation falls, so 31 October. The first period runs from 19 October 2026 to 31 October 2027.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-model-articles",
      prompt: "A company is incorporated without registering its own articles. What applies?",
      options: ["Nothing: it must file articles within 14 days", "The model articles for its type of company", "Table A from the Companies Act 1985", "Whatever the directors decide"],
      answer: 1,
      explain: "If no articles are registered, the relevant model articles under the Companies (Model Articles) Regulations 2008 apply by default.",
    },
    {
      kind: "mcq",
      id: "q-email",
      prompt: "Is a company's registered email address shown on the public register?",
      options: ["Yes, next to the registered office", "No, it isn't published", "Only for plcs", "Only if the company opts in"],
      answer: 1,
      explain: "Companies House uses the registered email address to contact the company but doesn't publish it.",
    },
    {
      kind: "mcq",
      id: "q-lawful",
      prompt: "What do subscribers confirm in the lawful purpose statement on incorporation?",
      options: [
        "That the company will make a profit",
        "That the company is being formed for a lawful purpose",
        "That the directors have no criminal record",
        "That the company is registered with HMRC",
      ],
      answer: 1,
      explain: "Since 4 March 2024, subscribers must confirm the company is being formed for a lawful purpose. A false statement is an offence.",
    },
    {
      kind: "mcq",
      id: "q-sic-max",
      prompt: "How many SIC codes can a company register?",
      options: ["One", "Up to two", "Up to four", "Unlimited"],
      answer: 2,
      explain: "A company can give up to four SIC codes describing its principal activities.",
    },
    {
      kind: "mcq",
      id: "q-auth-code",
      prompt: "Why must the company authentication code be kept secure?",
      options: [
        "It's needed to open a bank account",
        "It authorises online filings for the company, so anyone with it can file",
        "It's the company's UTR",
        "It's needed to verify the directors' identities",
      ],
      answer: 1,
      explain: "The authentication code is the company's equivalent of a signature for online filings.",
    },
  ],
  sources: [
    { label: "Set up a private limited company (GOV.UK)", url: "https://www.gov.uk/limited-company-formation" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
    { label: "Companies House begins phased roll out of new powers (4 March 2024 changes)", url: "https://www.gov.uk/government/news/companies-house-begins-phased-roll-out-of-new-powers-to-tackle-fraud" },
    { label: "The Companies (Model Articles) Regulations 2008", url: "https://www.legislation.gov.uk/uksi/2008/3229/contents" },
    { label: "Companies Act 2006 s86 – a company's registered office", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/86" },
  ],
};
