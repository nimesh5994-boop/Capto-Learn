import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "identity-verification",
  title: "Identity verification for directors, PSCs and filers",
  level: "foundation",
  minutes: 35,
  summary:
    "The Economic Crime and Corporate Transparency Act's identity verification regime: who has to verify, the 18 November 2025 start and 12-month transition, the PSC 14-day windows, personal codes, and how ACSPs fit in.",
  objectives: [
    "Explain who must verify their identity with Companies House and how (GOV.UK One Login or an ACSP)",
    "Work out when an existing director or PSC must provide their personal code",
    "Explain what is still to come, including identity verification for people who file",
    "Plan a client-by-client verification exercise for a practice's portfolio",
  ],
  body: [
    {
      kind: "md",
      md: `Until recently anyone could become a director or file information at Companies House without proving who they were. The **Economic Crime and Corporate Transparency Act 2023 (ECCTA)** changes that. Identity verification became a **legal requirement from 18 November 2025** for directors and people with significant control, phased in over a **12-month transition**. As at October 2026, that transition is nearly over, so any client who hasn't completed it is now a priority.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "How a person verifies",
      md: `A person verifies once, either:
- **directly with Companies House** through the 'Verify your identity for Companies House' service using **GOV.UK One Login**, or
- **through an Authorised Corporate Service Provider (ACSP)**, such as an accountancy practice registered with Companies House.

On success they receive a **Companies House personal code** (11 characters). The same code is then used to link their verified identity to every role they hold, in any company.`,
    },
    {
      kind: "table",
      caption: "When each person must verify (from Companies House guidance)",
      head: ["Person", "When they must provide their personal code"],
      rows: [
        ["New director (appointed on or after 18 November 2025)", "Before they can be appointed: at incorporation, or on the appointment filing"],
        ["Existing director", "When the company files its **next confirmation statement** during the 12-month transition"],
        ["PSC who is also a director of the same company", "In the 14-day period starting the day after the company's **confirmation statement date**"],
        ["PSC who is not a director", "In the **first 14 days of their birth month** (born 22 January: 1 to 14 January)"],
        ["New PSC (added on or after 18 November 2025)", "When first added to the register, or within 14 days of being added"],
        ["LLP members", "Treated in the same way as directors (LLP members are the LLP's officers)"],
        ["People filing on behalf of companies, corporate directors and officers of corporate PSCs", "**Not yet**: to be introduced at a later date"],
      ],
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Verifying isn't the same as linking",
      md: `A common mistake is to assume that once a director has verified with GOV.UK One Login, the job is done. The **personal code must also be supplied** for each role: on the confirmation statement for an existing director, or through the 'Provide identity verification details for a PSC' service for a PSC. A verified individual whose code is never linked still shows as unverified for that role.`,
    },
    {
      kind: "md",
      md: `### What happens if someone doesn't verify

ECCTA makes it an offence for a person to act as a director without having their identity verified, and the company and its officers can also commit offences. Companies House can mark the register to show that a person's identity hasn't been verified, and since 2 May 2024 it has been able to impose **financial penalties** (statutory cap £10,000; published tariff £250 to £2,000) for Companies Act offences as an alternative to prosecution. A confirmation statement can't be filed for an existing director without the verification statement being made.`,
    },
    {
      kind: "md",
      md: `### ACSPs and third-party filing

Firms that want to carry out identity verification for clients must register with Companies House as an **Authorised Corporate Service Provider**. Registration opened on **18 March 2025**, and an ACSP must be supervised for anti-money laundering purposes.

The next phase is for **people who file** (presenters). The plan is that third-party agents will have to be registered ACSPs, and individual filers verified, before they can file for clients. Companies House first postponed that requirement from spring 2026 to no earlier than November 2026, and its outline transition plan (updated August 2026) now says **no earlier than November 2027**, with at least 6 months' notice. Check the latest Companies House guidance before advising a client on this.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Running a practice-wide verification project",
      md: `Build a tracker from your client list: one row per **person**, not per company. A director of five client companies verifies once and links the same code five times. Record each person's personal code status, their PSC window (birth month or confirmation statement date), and each company's next confirmation statement date. Chase the people with the earliest deadlines first.`,
    },
    {
      kind: "md",
      md: `### Personal data and the code

Treat a personal code like a password. Anyone who has it could try to link it to a role. Clients should give it to your firm through a secure channel, not by text or in an open email chain. Record that you hold it on the client file, but don't keep it in plain text where it doesn't need to be.`,
    },
  ],
  scenario: {
    title: "Verification for the Harrow family companies",
    narrative: `Your firm acts for three companies owned by the Harrow family:

- **Harrow Holdings Ltd**: directors Graham Harrow and Lucy Harrow; confirmation statement date 30 November. Graham and Lucy each own 50%.
- **Harrow Lettings Ltd**: director Lucy Harrow only; confirmation statement date 15 January. Owned 100% by Harrow Holdings Ltd.
- **Harrow Joinery Ltd**: directors Graham Harrow and their son Ben Harrow; confirmation statement date 10 October. Graham owns 70%; Ben's partner Aisha Khan (not a director, born 3 March 1992) owns 30%.

It is now early October 2026. None of them has verified. Graham says, "We've got till next year, haven't we?"`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Correct the misunderstanding.** The 12-month transition started on 18 November 2025. Existing directors must verify by the time each company files its next confirmation statement in the transition, and PSC windows run alongside.
2. **Count people, not companies.** Four people need to verify: Graham, Lucy, Ben and Aisha. Each verifies once and receives one personal code.
3. **Most urgent: Harrow Joinery.** Its confirmation statement date is 10 October. Graham and Ben must have verified before the confirmation statement is filed (it must be filed within 14 days of the confirmation date). Graham is also a PSC (70%), so his PSC code is due in the 14 days starting the day after the confirmation statement date.
4. **Aisha** is a PSC (30%) but not a director. Her window is the first 14 days of her birth month. Since she was born in March, that was **1 to 14 March 2026**, which has already passed. She's overdue and must provide her code straight away.
5. **Harrow Holdings and Harrow Lettings.** Graham and Lucy will have verified by then and simply link their codes when those confirmation statements are filed. Harrow Lettings' PSC is Harrow Holdings Ltd (a registrable relevant legal entity), not an individual, so there's no individual PSC verification for that company. Verification for officers of corporate PSCs is due to come later.
6. **Offer the service.** If your firm is a registered ACSP you can verify them yourself. Otherwise send them the GOV.UK One Login route with clear instructions, and ask them to send their personal codes to you securely.`,
      },
      {
        kind: "table",
        caption: "Action plan",
        head: ["Person", "Verify", "Link code to"],
        rows: [
          ["Graham Harrow", "Now", "Joinery CS01 (director) and PSC window; Holdings CS01 (director) and PSC window"],
          ["Ben Harrow", "Now", "Joinery CS01 (director)"],
          ["Aisha Khan", "Now: overdue", "Joinery PSC, immediately"],
          ["Lucy Harrow", "Before 30 November", "Holdings CS01 and PSC window; Lettings CS01 (director)"],
        ],
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "when-to-verify",
      prompt: "When must each person provide their personal code?",
      categories: ["Before appointment / on registration", "With the next confirmation statement", "In a 14-day PSC window", "Not yet required"],
      items: [
        { text: "A new director being appointed to an existing company in October 2026", answer: 0 },
        { text: "A director who has been in office since 2015", answer: 1 },
        { text: "A 40% shareholder who is not a director, appointed PSC in 2019", answer: 2, why: "Their window is the first 14 days of their birth month." },
        { text: "A bookkeeper at your firm who files forms for clients", answer: 3, why: "Identity verification for filers is still to come — no earlier than November 2027 per the latest transition plan." },
        { text: "The directors of a corporate director", answer: 3, why: "Corporate directors and officers of corporate PSCs are part of a later phase." },
      ],
      explain:
        "Directors link their code at appointment (new) or on the next confirmation statement (existing). PSCs have 14-day windows. Presenters, corporate directors and officers of corporate PSCs are later phases.",
    },
    {
      kind: "numeric",
      id: "psc-window-start",
      prompt:
        "A PSC who is not a director was born on 23 July 1980. Her 14-day window starts on 1 July. On what **day of July** does the window end? (Answer as a day number, e.g. 9.)",
      answer: 14,
      unit: "",
      explain: "A PSC who isn't a director must provide their code within the first 14 days of their birth month, regardless of their actual birthday.",
      working: "The window is 1 July to **14 July**.",
    },
    {
      kind: "mcq",
      id: "five-companies",
      prompt: "A client is a director of five companies. How many times must he verify his identity?",
      options: ["Five times, once per company", "Once, then link the same personal code to each role", "Once per year", "Not at all if he has a UK passport"],
      answer: 1,
      explain: "A person verifies once and gets one personal code, which is then supplied for each role they hold.",
    },
    {
      kind: "multi",
      id: "acsp-facts",
      prompt: "Which statements about Authorised Corporate Service Providers are correct? Select all that apply.",
      options: [
        "An ACSP must be supervised for anti-money laundering purposes",
        "Registration as an ACSP opened on 18 March 2025",
        "Every accountant filing for clients had to be an ACSP by spring 2026",
        "An ACSP can verify a client's identity for Companies House",
        "An ACSP verification gives the client a different code from One Login verification, which only works for that ACSP",
      ],
      answers: [0, 1, 3],
      explain:
        "ACSPs must be AML-supervised; registration opened 18 March 2025; and an ACSP can verify clients. The requirement for all third-party filers to be ACSPs has been postponed (the August 2026 transition plan says no earlier than November 2027). Either route produces the same kind of personal code, usable for any role.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-start-date",
      prompt: "From what date did identity verification become a legal requirement for directors and PSCs?",
      options: ["4 March 2024", "8 April 2025", "18 November 2025", "1 April 2026"],
      answer: 2,
      explain: "Mandatory identity verification started on 18 November 2025, with a 12-month transition for existing directors and PSCs.",
    },
    {
      kind: "mcq",
      id: "q-code-length",
      prompt: "What does a person receive when they've verified their identity?",
      options: ["A Unique Taxpayer Reference", "A Companies House personal code", "A company authentication code", "A director's service address"],
      answer: 1,
      explain: "Successful verification produces an 11-character Companies House personal code.",
    },
    {
      kind: "mcq",
      id: "q-dual-role",
      prompt: "A person is both a director and a PSC of the same company. When must they provide their code for the PSC role?",
      options: [
        "In the first 14 days of their birth month",
        "In the 14-day period starting the day after the company's confirmation statement date",
        "Within 12 months of incorporation",
        "There's no need, as the director verification covers it",
      ],
      answer: 1,
      explain: "For a director-PSC, the PSC window runs for 14 days from the day after the company's confirmation statement date.",
    },
    {
      kind: "mcq",
      id: "q-presenters",
      prompt: "As at October 2026, what's the position on third-party agents having to be ACSPs to file for clients?",
      options: [
        "In force since 18 November 2025",
        "In force since spring 2026",
        "Postponed: now planned for no earlier than November 2027",
        "Abandoned",
      ],
      answer: 2,
      explain: "Companies House postponed the presenter measures to finish the director and PSC transition first; its August 2026 transition plan puts them at no earlier than November 2027, with at least 6 months' notice.",
    },
    {
      kind: "mcq",
      id: "q-penalty-cap",
      prompt: "What's the maximum financial penalty Companies House can impose for a Companies Act offence under ECCTA?",
      options: ["£1,000", "£5,000", "£10,000", "Unlimited"],
      answer: 2,
      explain: "Since 2 May 2024 the registrar can impose financial penalties of up to £10,000 (the statutory cap) as an alternative to prosecution.",
    },
  ],
  sources: [
    { label: "When you need to verify your identity for Companies House", url: "https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" },
    { label: "Verify your identity for Companies House", url: "https://www.gov.uk/guidance/verify-your-identity-for-companies-house" },
    { label: "Companies House personal codes for identity verification", url: "https://www.gov.uk/guidance/companies-house-personal-codes-for-identity-verification" },
    { label: "Companies House confirms identity verification rollout from 18 November 2025", url: "https://www.gov.uk/government/news/companies-house-confirms-identity-verification-rollout-from-18-november-2025" },
    { label: "Being an Authorised Corporate Service Provider (ACSP)", url: "https://www.gov.uk/guidance/being-an-authorised-corporate-service-provider" },
  ],
};
