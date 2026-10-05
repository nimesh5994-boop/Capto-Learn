import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "officers-changes-and-registers",
  title: "Officers, company changes and statutory registers",
  level: "foundation",
  minutes: 35,
  summary:
    "Appointing and removing directors and secretaries (AP01, TM01, AP03, TM02), changing the registered office and the company name, and which statutory registers and records a company still has to keep after the November 2025 changes.",
  objectives: [
    "File director and secretary appointments and terminations correctly and on time",
    "Explain how a director is removed by shareholders, including special notice",
    "Process a change of registered office or company name",
    "Identify the registers and records a company must still keep itself",
  ],
  body: [
    {
      kind: "table",
      caption: "Everyday Companies House forms for officers and company details",
      head: ["Event", "Form", "Deadline", "Fee"],
      rows: [
        ["Appoint a director", "AP01 (AP02 for a corporate director)", "Within 14 days", "None"],
        ["Director leaves", "TM01", "Within 14 days", "None"],
        ["Change a director's details (name, service address, residential address)", "CH01", "Within 14 days", "None"],
        ["Appoint / remove a company secretary", "AP03 / TM02", "Within 14 days", "None"],
        ["Change registered office", "AD01", "Takes effect when registered", "None"],
        ["Change company name by special resolution", "NM01 plus the resolution", "Takes effect on the new certificate", "£20 online (same-day £85)"],
      ],
    },
    {
      kind: "md",
      md: `### Appointing a director

A director is appointed in the way the articles allow. Under the model articles, either the **shareholders by ordinary resolution** or the **directors by a board decision** can appoint. Before filing:

- the person must be at least **16** and not disqualified or an undischarged bankrupt (without court permission);
- since 18 November 2025 they must have **verified their identity** and give their **personal code**, which goes on the AP01;
- the company confirms the person has **consented to act**;
- record the decision in board minutes or a written resolution.

The AP01 shows a **service address** (public) and a **residential address** (protected). A director can use the registered office as their service address to keep their home off the public record.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Removing a director against their will (CA 2006 s168)",
      md: `Shareholders can remove a director by **ordinary resolution at a general meeting**, whatever the articles or a service contract say. **Special notice** (28 days) of the resolution must be given to the company, and the director has the right to make written representations and be heard at the meeting. This can't be done by written resolution. The director may still have a claim for breach of their service contract.`,
    },
    {
      kind: "md",
      md: `### Resignation and other terminations

Most terminations are resignations: get the resignation in writing, record the date, and file **TM01 within 14 days**. Under the model articles a director also stops being a director on death, bankruptcy, disqualification, or on certain medical grounds. If the only director resigns, make sure a new director is appointed at the same time. A private company must always have at least one director who is a natural person.

### Changing the registered office

File **AD01**. The change takes effect when Companies House registers it, but for **14 days** afterwards documents can still validly be served at the old address (CA 2006 s87). The new address must be an appropriate address. If you're moving a client's registered office to your firm's address, have a registered office agreement in place first.

### Changing the company name

The usual route is a **special resolution** (75% of votes) and form **NM01** with the fee. The articles can also provide another method (form NM04). The name must meet the same rules as on incorporation. The change takes effect when Companies House issues a **certificate of incorporation on change of name**, not when the resolution is passed. Remember to update letterheads, invoices, the website, the bank, HMRC and the VAT registration.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Company registers after 18 November 2025",
      md: `ECCTA abolished the requirement for companies to keep their own registers of **directors, directors' residential addresses, secretaries and PSCs** from 18 November 2025. The information must still be filed with Companies House and kept up to date there. The option to keep information on the central register instead of locally was also removed.

A company **must still keep a register of members** (shareholders) at its registered office or a single alternative inspection location (SAIL).`,
    },
    {
      kind: "table",
      caption: "Records a company keeps itself",
      head: ["Record", "Rule", "Where"],
      rows: [
        ["Register of members", "Names, addresses, shares held, dates on and off the register", "CA 2006 s113"],
        ["Minutes of directors' meetings", "Keep for at least 10 years", "CA 2006 s248"],
        ["Resolutions and minutes of general meetings", "Keep for at least 10 years", "CA 2006 s355"],
        ["Copies of instruments creating charges", "Available for inspection", "CA 2006 s859P"],
        ["Directors' service contracts", "Copies available for inspection", "CA 2006 s228"],
        ["Accounting records", "Keep for 3 years (private company); HMRC needs 6 years", "CA 2006 s388"],
      ],
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Use the minute book as your checklist",
      md: `For every change you file, there should be a matching decision in the minute book: a board minute appointing a director, a written resolution changing the name, a resignation letter. When a company is sold or seeks investment, the buyer's solicitors ask for the statutory books first. Gaps cost the client time and fees.`,
    },
  ],
  scenario: {
    title: "A director leaves Marlow Print Solutions Ltd",
    narrative: `Marlow Print Solutions Ltd has two directors, Keith Brennan and Sunita Rao, who own 50% each. On 2 October 2026 Keith emails his resignation as a director with immediate effect but intends to keep his shares. Sunita wants her husband, Vikram Rao, appointed as a director from the same day. The company also wants to change its name to **Marlow Print & Signs Ltd** and move its registered office from Keith's house to your firm's office.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Keith's resignation.** Keep the email on file as the written resignation. File **TM01** with a termination date of 2 October 2026, no later than 16 October. He stays a 50% shareholder and a PSC, so the PSC record doesn't change.
2. **Vikram's appointment.** Under the model articles the board (now Sunita alone) can appoint him. Before filing **AP01**, check he has verified his identity and get his personal code. Record the board decision and his consent to act. Deadline: 14 days from appointment.
3. **Order matters.** Appointing Vikram at the same time as Keith leaves avoids any gap in the board.
4. **Change of name.** This needs a **special resolution**: 75% of the votes. Sunita has only 50%, so **Keith's support is needed** as a shareholder even though he's no longer a director. Circulate a written resolution to both shareholders, then file NM01 with the £20 fee. The new name applies from the date on the new certificate.
5. **Registered office.** Put a registered office agreement in place with the company, then file AD01. Remind Sunita that for 14 days documents can still validly be served at Keith's house, and ask Keith to forward anything that arrives.
6. **Housekeeping.** Update the minute book. Since November 2025 there's no separate register of directors to update, but the register of members still needs to be correct.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "which-form",
      prompt: "Which form do you file for each event?",
      categories: ["AP01", "TM01", "CH01", "AD01", "NM01"],
      items: [
        { text: "A director marries and changes her surname", answer: 2 },
        { text: "The company moves its registered office to new premises", answer: 3 },
        { text: "A new finance director joins the board", answer: 0 },
        { text: "The shareholders pass a special resolution to change the company's name", answer: 4 },
        { text: "A director dies", answer: 1 },
      ],
      explain: "AP01 appoints a director, TM01 ends an appointment for any reason, CH01 changes a director's details, AD01 changes the registered office and NM01 notifies a change of name by resolution.",
    },
    {
      kind: "numeric",
      id: "tm01-deadline",
      prompt: "A director resigned on 3 November 2026. Counting the resignation date as day 1, how many days does the company have to file TM01?",
      answer: 14,
      unit: "days",
      explain: "Changes to directors must be notified to Companies House within 14 days.",
      working: "The deadline is **14 days**, so file by 16 November 2026.",
    },
    {
      kind: "mcq",
      id: "special-notice",
      prompt: "Shareholders want to remove a director who refuses to resign. Which is correct?",
      options: [
        "They can pass a written resolution signed by 75% of shareholders",
        "They need an ordinary resolution at a general meeting, with 28 days' special notice",
        "The other directors can vote him off the board",
        "They need a court order",
      ],
      answer: 1,
      explain: "CA 2006 s168 requires an ordinary resolution at a meeting with special notice, and the director can be heard. A written resolution can't be used for this.",
    },
    {
      kind: "multi",
      id: "registers-still-kept",
      prompt: "Which of these must a company still keep itself after 18 November 2025? Select all that apply.",
      options: ["Register of members", "Register of directors", "Minutes of directors' meetings", "Register of PSCs", "Register of directors' residential addresses"],
      answers: [0, 2],
      explain: "ECCTA removed the requirement to keep registers of directors, residential addresses, secretaries and PSCs. The register of members and minutes still have to be kept.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-name-effect",
      prompt: "When does a change of company name take effect?",
      options: ["When the special resolution is passed", "When NM01 is posted", "When Companies House issues the certificate of incorporation on change of name", "At the next confirmation statement"],
      answer: 2,
      explain: "The new name is effective from the date on the certificate Companies House issues.",
    },
    {
      kind: "mcq",
      id: "q-name-majority",
      prompt: "What majority is needed for a special resolution to change a company's name?",
      options: ["More than 50%", "At least 75%", "100%", "Two-thirds"],
      answer: 1,
      explain: "A special resolution needs at least 75% of the votes cast (or of eligible members for a written resolution).",
    },
    {
      kind: "mcq",
      id: "q-ro-14",
      prompt: "After a change of registered office is registered, for how long can documents still be validly served at the old address?",
      options: ["7 days", "14 days", "28 days", "3 months"],
      answer: 1,
      explain: "CA 2006 s87 gives a 14-day grace period for service at the old address.",
    },
    {
      kind: "mcq",
      id: "q-min-age",
      prompt: "What's the minimum age for a company director?",
      options: ["16", "18", "21", "There's no minimum"],
      answer: 0,
      explain: "CA 2006 s157 sets a minimum age of 16.",
    },
    {
      kind: "mcq",
      id: "q-minutes",
      prompt: "How long must a company keep minutes of directors' meetings?",
      options: ["3 years", "6 years", "At least 10 years", "Permanently"],
      answer: 2,
      explain: "CA 2006 s248 requires minutes of directors' meetings to be kept for at least 10 years from the date of the meeting.",
    },
  ],
  sources: [
    { label: "Changes to company registers (Companies House)", url: "https://changestoukcompanylaw.campaign.gov.uk/changes-to-company-registers/" },
    { label: "Companies Act 2006 s168 – resolution to remove director", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/168" },
    { label: "Companies Act 2006 s87 – change of address of registered office", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/87" },
    { label: "Companies Act 2006 s77 – change of name", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/77" },
    { label: "Running a limited company: directors' responsibilities (GOV.UK)", url: "https://www.gov.uk/running-a-limited-company" },
    { label: "Companies House fees", url: "https://www.gov.uk/government/publications/companies-house-fees/companies-house-fees" },
  ],
};
