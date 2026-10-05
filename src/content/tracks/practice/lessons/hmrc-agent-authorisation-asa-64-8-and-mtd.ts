import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "hmrc-agent-authorisation-asa-64-8-and-mtd",
  title: "HMRC agent authorisation: the Agent Services Account, form 64-8 and Making Tax Digital",
  level: "practitioner",
  minutes: 30,
  summary:
    "How a practice gets authority to deal with HMRC for clients: registering as a tax agent and creating an Agent Services Account (ASA), the authorisation routes (form 64-8, digital handshake and online agent authorisation), what each authorises, how MTD for Income Tax changes the process, and how to manage and end authorisations.",
  objectives: [
    "Explain what an Agent Services Account is and why it is needed, including for MTD for Income Tax",
    "Choose the right authorisation route for a given tax service and client",
    "Complete the authorisation steps for a new Self Assessment or MTD for Income Tax client",
    "Manage the authorisation register and keep evidence of client consent",
    "Remove authority correctly when ceasing to act",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `A practice may deal with HMRC about a client's tax affairs only if the client has **authorised** it for **each specific tax or service**. Authorisation methods have been changing, with more services moving to **digital** routes, and **Making Tax Digital for Income Tax (MTD for IT)** from **April 2026** makes the **Agent Services Account** (ASA) essential for firms with sole trader and landlord clients.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Getting set up as an agent",
      md: `- **Register with HMRC as a tax agent** and have a **Government Gateway** user ID. A practice that offers accountancy or tax services must be **supervised for AML** (by a professional body or HMRC) and be able to show that when registering.
- Create an **Agent Services Account (ASA)**: the secure HMRC account used to manage client authorisations and access digital tax services. An **ASA is required to use MTD for Income Tax** on behalf of clients.
- Add **existing Self Assessment authorisations** to the ASA (using the option in the account), so they appear in one place.
- Keep **sign-in security** tight: multi-factor authentication, named users, and a record of who has access.`,
    },
    {
      kind: "table",
      caption: "Authorisation routes (check HMRC's current guidance for each service)",
      head: ["Route", "How it works", "Typical use"],
      rows: [
        ["**Form 64-8** ('Authorising your agent')", "Client signs a paper or digital 64-8 and the agent submits it to HMRC; covers individual taxes (Self Assessment, partnerships, trusts, PAYE for individuals) and business taxes (VAT, employers' PAYE, Corporation Tax)", "Clients and services that still use the 64-8 process"],
        ["**Digital handshake** (agent invitation via the ASA)", "The agent sends an invitation link; the client signs in to HMRC and accepts; this replaces the 64-8 for the services that support it", "MTD for VAT and MTD for Income Tax, and other services as they move over"],
        ["**Online agent authorisation / business tax account**", "The client authorises the agent from their own HMRC online account", "Services where HMRC has made this available"],
      ],
    },
    {
      kind: "md",
      md: `### MTD for Income Tax: what the practice does

For clients within MTD for IT (sole traders and landlords with qualifying income over **£50,000** from **6 April 2026**, then over **£30,000** from April 2027 and over **£20,000** from April 2028), the practice must:

1. Have an **Agent Services Account** and be **authorised** by the client for **MTD for Income Tax** (using the **digital handshake** or the route HMRC specifies).
2. **Sign the client up** to MTD for IT (or confirm HMRC has done so) and confirm **accounting method and period**.
3. Choose **compatible software** and keep **digital records**.
4. Submit **quarterly updates**, an **end of period statement**/final declaration as the rules require, and keep evidence of **client approval** before each submission.
5. Keep the **engagement letter** aligned: who is responsible for digital records, deadlines for information, penalties.

Check HMRC's **agent step-by-step guidance** for the exact sequence and the current routes for Self Assessment, VAT, PAYE and Corporation Tax.

### Managing authorisations

- **Keep an authorisation register**: client, tax or service, route, date, who authorised.
- **Evidence of consent**: a signed 64-8 or the digital handshake record, plus the engagement letter.
- **Review periodically** (for example annually) to remove dormant clients.
- **Don't act without authority.** An unauthorised approach to HMRC is a data protection issue, and could be a breach of confidentiality.

### Ending an authorisation

When you **cease to act**: agree the **date** with the client, **remove or cancel** the authorisation in your ASA (or, for 64-8 services, confirm in writing to HMRC and ask the client to appoint the new agent), **tell the client** what services are covered until then, and **hand over** information. If HMRC is dealing with an **enquiry**, make sure the **transition** is clear to avoid missed deadlines.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Common issues",
      md: `- **Authorisation covers the wrong tax:** a 64-8 for Self Assessment doesn't cover VAT unless the VAT boxes are completed.
- **No ASA** when MTD for IT starts.
- **Staff logins shared** between people.
- **Authorisation not removed** after the engagement ends, so the former client's data remains accessible.
- **Two agents** for the same tax: HMRC may only be able to deal with one.
- **Failure to confirm** that the **client** has approved a submission.`,
    },
  ],
  scenario: {
    title: "Onboarding MTD for Income Tax for Tess Hollis",
    narrative: `Tess Hollis, a sole-trader photographer and landlord, has gross income of **£58,000** (self-employment £42,000 and property £16,000) in 2024/25. She has used a different accountant for SA returns. She asks Halden & Co to act for her from April 2026 and to handle her MTD for IT.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: is she in MTD?** Qualifying income (self-employment plus property, gross) is £58,000, above £50,000, so she is **mandated from 6 April 2026**.

**Step 2: acceptance.** AML CDD, professional clearance from her previous accountant, engagement letter that includes **MTD responsibilities** (digital records, quarterly information deadlines, penalties).

**Step 3: authorisation.** The firm uses its **ASA** to send a **digital handshake invitation** for **MTD for Income Tax**. Tess accepts through her HMRC login. If the firm also needs to deal with her **existing SA** affairs, it confirms the authorisation route for those (64-8 or the ASA route).

**Step 4: software and records.** Choose compatible software, set up **digital records** with property and self-employment kept separate, and agree **quarterly** deadlines.

**Step 5: confirm the old agent's authority is removed** so that only one agent is dealing on the service. Keep the register updated.

**Step 6: submissions.** Before each quarterly update, send Tess a summary and obtain **approval**; keep the evidence.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-routes",
      prompt: "Which authorisation approach is most likely for the service?",
      categories: ["Digital handshake via the ASA", "Form 64-8"],
      items: [
        { text: "MTD for Income Tax", answer: 0 },
        { text: "A trust or partnership return where the 64-8 route is still used", answer: 1 },
        { text: "MTD for VAT", answer: 0 },
        { text: "Corporation Tax where the 64-8 route is used", answer: 1 },
      ],
      explain: "MTD services use the ASA digital handshake; some other services still use the 64-8 process. Always check HMRC's current guidance.",
    },
    {
      kind: "mcq",
      id: "mcq-asa",
      prompt: "What is required to use MTD for Income Tax on behalf of clients?",
      options: ["An Agent Services Account", "A professional indemnity policy only", "A UTR for the practice", "A VAT number for the practice"],
      answer: 0,
      explain: "An ASA is required.",
    },
    {
      kind: "numeric",
      id: "mtd-threshold",
      prompt: "What is the qualifying income threshold (£) for mandatory MTD for Income Tax from 6 April 2026?",
      answer: 50000,
      unit: "£",
      explain: "£50,000 from April 2026, £30,000 from April 2027 and £20,000 from April 2028.",
      working: "**£50,000**.",
    },
    {
      kind: "mcq",
      id: "mcq-ending",
      prompt: "You cease to act for a client. What should you do about HMRC authority?",
      options: ["Nothing", "Remove or cancel the authorisation and confirm the handover", "Keep it for future use", "Ask the client to delete their account"],
      answer: 1,
      explain: "Cancel the authority and make the transition clear.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-asa-what",
      prompt: "An Agent Services Account is…",
      options: ["A client bank account", "An HMRC account for agents to manage authorisations and digital services", "A pension scheme", "A VAT scheme"],
      answer: 1,
      explain: "A secure HMRC account for agents.",
    },
    {
      kind: "mcq",
      id: "q-aml-reg",
      prompt: "To register as a tax agent with HMRC you must be…",
      options: ["Supervised for AML", "A charity", "VAT registered", "A limited company"],
      answer: 0,
      explain: "AML supervision is required.",
    },
    {
      kind: "mcq",
      id: "q-handshake",
      prompt: "The digital handshake involves…",
      options: ["The agent sending an invitation which the client accepts via their HMRC account", "A signed paper form only", "A phone call to HMRC", "An email to HMRC"],
      answer: 0,
      explain: "Invitation and client acceptance.",
    },
    {
      kind: "mcq",
      id: "q-register",
      prompt: "Why keep an authorisation register?",
      options: ["To impress HMRC", "To evidence consent and manage who is authorised for which service", "To increase fees", "No reason"],
      answer: 1,
      explain: "Evidence and control.",
    },
    {
      kind: "mcq",
      id: "q-two-agents",
      prompt: "Why is it a problem if two agents are authorised for the same tax?",
      options: ["It isn't", "HMRC may only be able to deal with one and communications can be confused", "It doubles the tax", "It is illegal"],
      answer: 1,
      explain: "It creates confusion and risk.",
    },
  ],
  sources: [
    { label: "How to get authorised to act as a tax agent on behalf of your clients – GOV.UK", url: "https://www.gov.uk/guidance/how-to-get-authorised-to-act-as-a-tax-agent-on-behalf-of-your-clients" },
    { label: "Authorise a tax agent (64-8) – GOV.UK", url: "https://www.gov.uk/government/publications/tax-agents-and-advisers-authorising-your-agent-64-8" },
    { label: "Add your client authorisations for Making Tax Digital for Income Tax – GOV.UK", url: "https://www.gov.uk/guidance/add-your-client-authorisations-for-making-tax-digital-for-income-tax" },
    { label: "Making Tax Digital for Income Tax as an agent: step by step – GOV.UK", url: "https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-as-an-agent-step-by-step" },
    { label: "The Tax Agent's Handbook – GOV.UK", url: "https://www.gov.uk/guidance/tax-agents-handbook/online-services-for-agents" },
  ],
};
