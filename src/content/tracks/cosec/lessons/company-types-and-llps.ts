import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "company-types-and-llps",
  title: "Types of company and the LLP",
  level: "foundation",
  minutes: 25,
  summary:
    "The legal vehicles a practice's clients trade through — private and public companies, companies limited by guarantee, CICs and LLPs — what makes each one different, and how to explain the choice to a client.",
  objectives: [
    "Distinguish a private company limited by shares from a plc, a guarantee company, an unlimited company and a CIC",
    "Explain separate legal personality and limited liability, and where they stop protecting the owners",
    "Describe what an LLP is and how it differs from both a general partnership and a company",
    "Match a client's circumstances to a sensible trading vehicle and know which filings each one brings",
  ],
  body: [
    {
      kind: "md",
      md: `Almost every company-secretarial task you do depends on what kind of entity you are dealing with. The forms, the deadlines and even who signs things change with the vehicle. So the first question on any new file is always: **what is this entity, legally?** Check it on the Companies House register rather than relying on the client's description. Clients often say "my company" when they mean a sole trade, or "partnership" when they mean an LLP.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Separate legal personality",
      md: `A company registered under the Companies Act 2006 is a **legal person in its own right**, separate from its shareholders and directors (the principle confirmed in *Salomon v Salomon & Co* [1897]). It owns its assets, signs its contracts, owes its debts and pays its own tax. In a company limited by shares, a shareholder's liability is limited to any amount **unpaid on their shares** (CA 2006 s3(2)).`,
    },
    {
      kind: "table",
      caption: "The main vehicles you'll see in practice",
      head: ["Vehicle", "Key features", "Typical client"],
      rows: [
        ["Private company limited by shares (Ltd)", "Owned by shareholders, run by directors. At least one director, who must be a natural person. Company secretary optional. Cannot offer shares to the public.", "Most owner-managed businesses, contractors, property investment companies"],
        ["Public limited company (plc)", "Minimum allotted share capital of £50,000, at least a quarter paid up. At least two directors and a qualified company secretary. Needs a trading certificate before it can trade.", "Larger businesses wanting to raise capital from the public"],
        ["Private company limited by guarantee", "No shares. Members guarantee a fixed sum (often £1) if the company is wound up. Usually no profit distribution to members.", "Charities, clubs, residents' management companies, trade bodies"],
        ["Unlimited company", "Members' liability is unlimited. Usually exempt from filing accounts. Rare.", "Some family holding and wealth structures wanting accounts privacy"],
        ["Community interest company (CIC)", "A limited company with an asset lock and a community interest test. Files an extra CIC34 report with its accounts. Regulated by the CIC Regulator.", "Social enterprises"],
        ["Limited liability partnership (LLP)", "Body corporate under the LLP Act 2000. At least two designated members. Taxed as a partnership (transparent), but members have limited liability and it files at Companies House.", "Professional firms, some property and investment businesses"],
      ],
    },
    {
      kind: "md",
      md: `### Where limited liability stops

Limited liability protects the shareholders' personal assets from the **company's** debts. It does not stop directors being personally liable for their own conduct. Watch out for:

- **Personal guarantees** given to banks and landlords, which are very common for small companies.
- **Wrongful trading** (Insolvency Act 1986 s214), where directors carry on trading when they knew, or ought to have concluded, that there was no reasonable prospect of avoiding insolvent liquidation; and **fraudulent trading** (s213), where business is carried on with intent to defraud creditors (also a criminal offence).
- **Overdrawn director's loan accounts**, which a liquidator will collect.
- **Disqualification** for unfit conduct, and personal liability for acting while disqualified.
- **Unlawful dividends**, which shareholders who knew (or should have known) must repay.`,
    },
    {
      kind: "table",
      caption: "Unincorporated vs incorporated: what changes for the client",
      head: ["", "Sole trader / general partnership", "Ltd company", "LLP"],
      rows: [
        ["Legal personality", "None: the owner is the business", "Separate person", "Separate person"],
        ["Liability", "Unlimited, personal", "Limited (shareholders)", "Limited (members)"],
        ["Companies House filings", "None", "Accounts, confirmation statement, officer and PSC changes", "Accounts, confirmation statement, member and PSC changes"],
        ["Tax on profits", "Income tax and Class 4 NIC on the owner", "Corporation tax on the company; owners taxed on salary and dividends", "Income tax and Class 4 NIC on each member (transparent)"],
        ["Public information", "Nothing on a public register", "Accounts, officers, shareholders, PSCs", "Accounts, members, PSCs"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Don't give the 'which structure?' answer on tax alone",
      md: `Clients often ask "should I go limited?" purely to save tax. The decision also involves liability, privacy, admin cost, how profits will be extracted, IR35 for contractors, and the longer-term plan (selling, bringing in investors, passing to family). The tax rates also change regularly. Treat it as advice that needs a properly scoped engagement and a written recommendation, not a quick answer on the phone.`,
    },
    {
      kind: "md",
      md: `### Recognising entities from their names and numbers

- Company names must end with **Limited / Ltd** (or the Welsh equivalent), **plc**, or for an LLP **Limited Liability Partnership / LLP**. A CIC ends with **community interest company / CIC**. Some guarantee companies are exempt from using "Limited".
- Company numbers show where the entity is registered: 8 digits for England and Wales, **SC** for Scotland, **NI** for Northern Ireland, **OC** for an England and Wales LLP, **SO** for a Scottish LLP.
- Scottish companies are registered in Edinburgh and some rules (for example on property and insolvency) differ. The Companies Act 2006 itself applies UK-wide.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "First thing on any new client",
      md: `Pull the Companies House record and save a dated PDF of the overview, officers, PSC and filing history pages to the permanent file. It confirms the entity type, number, registered office, accounting reference date and whether anything is overdue, and it is part of your anti-money laundering evidence.`,
    },
  ],
  scenario: {
    title: "Ltd or LLP for two architects?",
    narrative: `Hannah Okafor and Tom Reyes are architects who have been working together as an informal general partnership for two years. Profits are about £180,000 a year, shared equally. They are about to sign a five-year office lease and take on two staff. A competitor was recently sued over a design defect, and they are worried about personal liability.

They ask you: *"Should we become a limited company or an LLP, and what's the actual difference?"*`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Identify what they are now.** An informal general partnership has no legal personality and unlimited liability. Each partner is personally liable for all the firm's debts, including any professional negligence claim. That is the risk they've spotted.
2. **Both options give limited liability.** A company and an LLP are both separate legal persons. The business's contracts and debts belong to the entity. Note that a professional who is personally negligent can still face a claim in some circumstances, which is why professional indemnity insurance stays essential.
3. **Compare tax.** An LLP is tax transparent: Hannah and Tom would still pay income tax and Class 4 NIC on their profit shares, much as they do now. A company pays corporation tax and they would extract profits as salary and dividends. The best answer depends on how much they leave in the business, so this needs a calculation, not an instinct.
4. **Compare administration.** Both file accounts and a confirmation statement at Companies House, and both need identity-verified officers. An LLP needs a members' agreement (otherwise default rules apply), and a company needs articles and shareholder documents.
5. **Flag the practical points.** The landlord will very likely ask for personal guarantees whichever vehicle they use, which brings back personal liability for the lease. Any transfer of the existing business has tax consequences (capital gains, goodwill, VAT transfer of a going concern) that need separate advice.`,
      },
      {
        kind: "table",
        caption: "Summary for the client",
        head: ["Point", "Ltd company", "LLP"],
        rows: [
          ["Liability for business debts", "Limited", "Limited"],
          ["Tax on profits", "Corporation tax, then tax on extraction", "Income tax and NIC on profit shares (as now)"],
          ["Flexibility to retain profits at a lower tax rate", "Yes", "No: taxed on profits whether drawn or not"],
          ["Key internal document", "Articles and a shareholders' agreement", "LLP members' agreement"],
          ["Public filings", "Accounts, officers, shareholders, PSCs", "Accounts, members, PSCs"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-entities",
      prompt: "Classify each client entity.",
      categories: ["Private company limited by shares", "Company limited by guarantee", "LLP", "Not a separate legal person"],
      items: [
        { text: "Greenway Residents Management Company Limited, with no share capital and members who each guarantee £1", answer: 1 },
        { text: "Patel & Ward, two plumbers sharing profits with no registration at Companies House", answer: 3, why: "A general partnership in England and Wales has no separate legal personality." },
        { text: "Northfield Dental LLP, company number OC412345", answer: 2, why: "The OC prefix is an England and Wales LLP." },
        { text: "Brightline IT Services Ltd, with 100 ordinary £1 shares held by its director", answer: 0 },
        { text: "Sam Hughes trading as 'Hughes Joinery'", answer: 3, why: "A sole trader's business name doesn't create a legal person." },
      ],
      explain:
        "Look at the register, not the trading name. Share capital points to a company limited by shares; a guarantee and no shares points to a guarantee company; an OC/SO number points to an LLP. Sole traders and general partnerships aren't on the Companies House register at all.",
    },
    {
      kind: "numeric",
      id: "plc-paid-up",
      prompt: "A client wants to re-register as a plc with the minimum allotted share capital. What is the **minimum amount that must be paid up** on the shares?",
      answer: 12500,
      unit: "£",
      explain: "A plc must have allotted share capital of at least the authorised minimum of £50,000, and each share must be paid up to at least a quarter of its nominal value plus the whole of any premium.",
      working: "£50,000 × 25% = **£12,500**.",
    },
    {
      kind: "multi",
      id: "liability-limits",
      prompt: "A director-shareholder of an insolvent Ltd company asks whether limited liability protects them personally. Which of these could still leave them personally liable? Select all that apply.",
      options: [
        "A personal guarantee they signed for the company's overdraft",
        "Trade creditors' invoices addressed to the company",
        "An overdrawn director's loan account owed to the company",
        "Wrongful trading after they should have concluded insolvent liquidation couldn't be avoided",
        "The company's corporation tax liability, with no fault on the director's part",
      ],
      answers: [0, 2, 3],
      explain:
        "Limited liability covers the company's own debts (trade creditors, its tax). It does not cover the director's own obligations — a guarantee they signed, money they owe the company, or liability imposed for their own misconduct such as wrongful trading.",
    },
    {
      kind: "mcq",
      id: "llp-tax",
      prompt: "How are the profits of a trading LLP taxed?",
      options: [
        "Corporation tax on the LLP, then income tax when members draw money",
        "Income tax and Class 4 NIC on each member's share of profit, whether or not it is drawn",
        "Income tax only on the amounts members actually draw",
        "Corporation tax only, as the LLP is a body corporate",
      ],
      answer: 1,
      explain: "A trading LLP is tax transparent: the members are treated as partners and taxed on their profit shares as they arise, regardless of drawings. Being a body corporate for legal purposes doesn't make it a company for tax.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-min-directors",
      prompt: "What is the minimum number of directors for a private company limited by shares?",
      options: ["None", "One, who must be a natural person", "Two", "Two, one of whom is the secretary"],
      answer: 1,
      explain: "A private company needs at least one director (CA 2006 s154), and at least one director must be a natural person (s155).",
    },
    {
      kind: "mcq",
      id: "q-secretary",
      prompt: "Must a private limited company appoint a company secretary?",
      options: ["Yes, always", "No, it's optional unless the articles require one", "Only if it has more than one shareholder", "Only if it is VAT registered"],
      answer: 1,
      explain: "Since 2008 a private company doesn't need a secretary (CA 2006 s270) unless its articles say so. A plc must have a qualified secretary.",
    },
    {
      kind: "mcq",
      id: "q-guarantee",
      prompt: "A residents' management company has members who each promise to pay £1 if it's wound up. What type of company is it?",
      options: ["Limited by shares", "Limited by guarantee", "Unlimited", "A CIC"],
      answer: 1,
      explain: "Members of a guarantee company have no shares; their liability is limited to the amount they've guaranteed.",
    },
    {
      kind: "mcq",
      id: "q-oc-prefix",
      prompt: "A Companies House number begins 'OC'. What is it?",
      options: ["An overseas company", "An England and Wales LLP", "A Scottish company", "A CIC"],
      answer: 1,
      explain: "OC numbers are England and Wales LLPs; Scottish LLPs are SO and Scottish companies are SC.",
    },
    {
      kind: "mcq",
      id: "q-cic",
      prompt: "What is distinctive about a community interest company?",
      options: ["It pays no corporation tax", "It has an asset lock and must meet a community interest test", "It can't have directors", "It's a type of charity registered with the Charity Commission"],
      answer: 1,
      explain: "A CIC is a limited company with an asset lock and a community interest test, overseen by the CIC Regulator. It isn't a charity and is taxed like other companies.",
    },
  ],
  sources: [
    { label: "Set up a limited company: overview (GOV.UK)", url: "https://www.gov.uk/limited-company-formation" },
    { label: "Companies Act 2006 s3 – limited and unlimited companies", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/3" },
    { label: "Companies Act 2006 s154 – companies required to have directors", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/154" },
    { label: "Limited Liability Partnerships Act 2000", url: "https://www.legislation.gov.uk/ukpga/2000/12/contents" },
    { label: "Set up a business partnership (GOV.UK)", url: "https://www.gov.uk/set-up-business-partnership" },
    { label: "Insolvency Service: director duties upon insolvency", url: "https://www.gov.uk/guidance/director-information-hub-director-duties-upon-insolvency" },
  ],
};
