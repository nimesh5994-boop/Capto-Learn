import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "directors-duties-and-responsibilities",
  title: "Directors' duties and why they matter to the accountant",
  level: "foundation",
  minutes: 25,
  summary:
    "The seven general duties in the Companies Act 2006 (ss171–177), who counts as a director, and how those duties shape the advice you give on loans, dividends and extracting profit.",
  objectives: [
    "List the seven statutory general duties of a director and explain each in a sentence",
    "Distinguish a de jure, de facto and shadow director",
    "Explain why a company's money is not the director's money, and what that means for the loan account",
    "Recognise when a client's request puts the director in breach of duty and when to raise it",
  ],
  body: [
    {
      kind: "md",
      md: `A limited company is a separate legal person. The director's own money and the company's money are different pots, even in a one-person company. Almost every query in this track (loans, dividends, salary, closing the company) is really a question about moving value across that boundary lawfully. The general duties in the **Companies Act 2006, ss171–177** are the rules that govern *how* a director may act when they do it.`,
    },
    {
      kind: "table",
      caption: "The seven general duties (CA 2006 ss171–177)",
      head: ["Section", "Duty", "In plain English"],
      rows: [
        ["s171", "Act within powers", "Follow the articles and use powers only for the purpose they were given."],
        ["s172", "Promote the success of the company", "Act in good faith for the benefit of the members as a whole, having regard to employees, suppliers, community, reputation and long-term consequences."],
        ["s173", "Exercise independent judgement", "Don't simply follow someone else's instructions (though acting on the articles or an agreement is allowed)."],
        ["s174", "Exercise reasonable care, skill and diligence", "The standard of a reasonably diligent person with the director's actual knowledge and experience, and at least the general knowledge expected of the role."],
        ["s175", "Avoid conflicts of interest", "Don't put yourself in a position where your interests conflict, or may conflict, with the company's, unless authorised."],
        ["s176", "Not accept benefits from third parties", "Don't take a benefit because of being a director or doing (or not doing) something as director."],
        ["s177", "Declare interest in a proposed transaction", "Tell the other directors about any interest in a transaction with the company before it is entered into."],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "Who is a director?",
      md: `Under CA 2006 s250 a director is "any person occupying the position of director, by whatever name called". That covers:

- **De jure** directors: validly appointed and registered at Companies House.
- **De facto** directors: act as a director and are held out as one, without formal appointment.
- **Shadow** directors: the board is accustomed to act on their directions or instructions (but not professional advisers acting in that capacity).

Duties and liabilities attach to all three. The title "managing director", "finance director" or "owner" is not what matters.`,
    },
    {
      kind: "md",
      md: `### Where the duties bite in the work you do

- **Loans to and from the director.** A loan from the company to a director is a transaction in which the director has a personal interest (s175, s177). For a private company, the Act's general requirement for member approval of loans to directors (ss197–214) is largely a public-company rule, but the articles and the conflict duties still apply, and the tax code (s455, beneficial loans) punishes the loan irrespective of approval. Record the approval.
- **Dividends.** A dividend may only be paid out of **distributable profits** (CA 2006 Part 23). Paying one that the accounts don't support is a breach of duty (s171, s174) and the member who knew it was unlawful must repay it (s847).
- **Remuneration.** A director can't simply decide their own pay without regard to the company's position (s172) and must declare their interest (s177).
- **Insolvency.** Once insolvency is likely, the director must have regard to the interests of **creditors** (s172(3), *BTI v Sequana* [2022] UKSC 25). Paying a dividend or clearing a director's loan at that point is high-risk.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "The accountant's own position",
      md: `You are not the company's director, and you don't carry the s171–177 duties. But you do owe your own professional duties (competence, integrity, and under PCRT not assisting with tax avoidance that has no reasonable basis). If a client instructs you to draw up a dividend you know the company can't lawfully pay, or to disguise a personal expense as business cost, say so in writing and record the response.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Good minute-taking habits",
      md: `For a small company, a short **written board minute** for each significant decision (dividend, loan, director's pay) is enough. It should say who decided, on what information (e.g. management accounts to a date), and that the director has declared any interest. It turns "we think we did that" into evidence in an HMRC enquiry or a dispute.`,
    },
  ],
  scenario: {
    title: "'Just put it through as a dividend': Harlow Joinery Ltd",
    narrative: `Harlow Joinery Ltd has two directors and 50/50 shareholders, Dev and Mia. It is October and the year end is 31 March. Dev phones: *"I need £30,000 for a house deposit next month. Can the company just pay me a dividend? Mia doesn't need to know, it's my share."* Management accounts to 30 September show retained profits of £18,000 after corporation tax provision. Dev is the one who deals with the bank and the books.`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Is there a dividend to pay?** Distributable reserves are £18,000, so a £30,000 dividend is **unlawful** on the figures. The excess £12,000 would be an unlawful distribution.
2. **Can it be paid to Dev alone?** Only if the articles allow different classes of share or a waiver by Mia. Dividends must be paid to shareholders in proportion to their holdings of the same class. Paying Dev alone, without a separate class, is a breach of the articles (s171) and gives Mia a claim.
3. **What are the duties engaged?** s171 (acting within the articles), s172 (the company and all its members), s175 and s177 (Dev has a personal interest in the payment), s174 (care: paying out without checking reserves).
4. **What can you suggest?** If the cash is needed, options include a **proportionate** dividend of up to £18,000 in total (so £9,000 each, since the classes are identical), a **director's loan** that is properly minuted, with the s455 and beneficial loan consequences explained, or waiting until the year-end accounts support a larger dividend.
5. **Record it.** Put the advice in an email: *"A dividend must be paid out of distributable profits to all ordinary shareholders pro rata. Based on the 30 September management accounts the maximum is £18,000 in total."*`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "classify-duties",
      prompt: "Match each situation to the general duty most clearly engaged.",
      categories: ["s171 Act within powers", "s172 Promote success", "s174 Care, skill and diligence", "s175/s177 Conflict or interest"],
      items: [
        { text: "A director issues shares for a purpose forbidden by the articles", answer: 0, why: "Using powers for a purpose other than the one given, or outside the articles." },
        { text: "A director buys a property from the company at a price they set themselves without telling the board", answer: 3, why: "Personal interest in a transaction with the company." },
        { text: "A director signs off the VAT return without reading it and misses £40,000 of unpaid VAT", answer: 2, why: "Falls below the standard of reasonable care and diligence." },
        { text: "A director votes against a profitable contract because it would lose a friend their supply deal", answer: 1, why: "Failing to act in good faith for the benefit of members as a whole." },
      ],
      explain: "Most real situations engage more than one duty, but identify the one that fits best. s175 and s177 are the conflict and declaration duties.",
    },
    {
      kind: "mcq",
      id: "mcq-shadow-director",
      prompt: "A client's investor never sits on the board but the three directors always do what she instructs. How does the Companies Act treat her?",
      options: ["Not a director: she holds no office", "A shadow director, so the duties and liabilities can apply to her", "A de jure director once she has been paid", "Only a director if she is also an employee"],
      answer: 1,
      explain: "A person on whose directions the board is accustomed to act is a shadow director (s251). Substance, not title, matters.",
    },
    {
      kind: "numeric",
      id: "max-dividend",
      prompt: "A company has retained profits brought forward of £42,000, a current-year profit after tax of £31,500, and has already paid £25,000 of dividends this year. What is the maximum further dividend the accounts support (in £)?",
      answer: 48500,
      unit: "£",
      explain: "Distributable profits are accumulated realised profits less accumulated realised losses (CA 2006 s830). Dividends already paid reduce what is left.",
      working: "£42,000 + £31,500 − £25,000 = **£48,500**.",
    },
    {
      kind: "multi",
      id: "multi-director-types",
      prompt: "Which of these people can be treated as directors for the purposes of the general duties? Select all that apply.",
      options: [
        "A person formally appointed and registered at Companies House",
        "A person who acts as a director and is held out as one, though never appointed",
        "A solicitor who gives the board professional advice in that capacity",
        "A person whose instructions the board is accustomed to follow",
      ],
      answers: [0, 1, 3],
      explain: "De jure, de facto and shadow directors are all caught. Professional advisers acting only in a professional capacity are specifically excluded from the shadow-director definition.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-how-many",
      prompt: "How many general duties does the Companies Act 2006 set out for directors in ss171–177?",
      options: ["Five", "Six", "Seven", "Nine"],
      answer: 2,
      explain: "Seven: act within powers, promote success, independent judgement, care/skill/diligence, avoid conflicts, not accept third-party benefits, declare interest in proposed transactions.",
    },
    {
      kind: "mcq",
      id: "q-s172",
      prompt: "Under s172, a director must act in the way they consider, in good faith, would most likely promote the success of the company for the benefit of…",
      options: ["The director who appointed them", "The members as a whole", "The largest shareholder", "HMRC"],
      answer: 1,
      explain: "s172 is framed around the members as a whole, with regard to the listed factors such as employees, suppliers and long-term consequences.",
    },
    {
      kind: "mcq",
      id: "q-s174",
      prompt: "What is the test for the standard of care under s174?",
      options: [
        "The care a reasonably diligent person would take, with at least the knowledge and experience the director actually has",
        "Whatever the director personally considers reasonable",
        "The standard of a qualified accountant",
        "Only the general knowledge of an average person with no experience",
      ],
      answer: 0,
      explain: "It is a combined objective and subjective test: the higher of what is reasonably expected of someone in that role and the director's actual skills.",
    },
    {
      kind: "mcq",
      id: "q-conflict",
      prompt: "A director wants the company to lease premises the director owns personally. Which duties are most obviously engaged?",
      options: ["s173 only", "s175 and s177: conflict of interest and declaring an interest", "s176 only", "None, because it is at market rent"],
      answer: 1,
      explain: "A transaction with the director personally is a conflict situation and the interest must be declared, even if the terms are fair.",
    },
    {
      kind: "mcq",
      id: "q-sequana",
      prompt: "When a company is, or is likely to become, insolvent, whose interests must directors have regard to?",
      options: ["Shareholders only", "Employees only", "Creditors as well, under s172(3) as interpreted in BTI v Sequana", "HMRC only"],
      answer: 2,
      explain: "The Supreme Court in BTI 2014 LLC v Sequana SA [2022] UKSC 25 confirmed the creditor duty arises when insolvency is imminent or probable.",
    },
    {
      kind: "mcq",
      id: "q-accountant",
      prompt: "A client asks you to prepare a dividend voucher for a payment the accounts don't support. What is the right response?",
      options: [
        "Prepare it. The shareholder is responsible",
        "Prepare it backdated to the next year-end",
        "Explain it would be unlawful, say so in writing and don't prepare a voucher that misrepresents the position",
        "Pay it as salary without telling the client",
      ],
      answer: 2,
      explain: "Competence and integrity mean you advise on the correct treatment and don't create documents that misstate the facts.",
    },
  ],
  sources: [
    { label: "Companies Act 2006 Part 10 Chapter 2 – general duties of directors", url: "https://www.legislation.gov.uk/ukpga/2006/46/part/10/chapter/2" },
    { label: "Companies Act 2006 s250 – 'director'", url: "https://www.legislation.gov.uk/ukpga/2006/46/section/250" },
    { label: "Guidance for directors – Companies House", url: "https://www.gov.uk/guidance/being-a-company-director" },
    { label: "BTI 2014 LLC v Sequana SA [2022] UKSC 25", url: "https://www.bailii.org/uk/cases/UKSC/2022/25.html" },
  ],
};
