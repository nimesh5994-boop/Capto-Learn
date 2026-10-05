import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "people-with-significant-control",
  title: "People with significant control (PSCs)",
  level: "practitioner",
  minutes: 40,
  summary:
    "Who counts as a PSC, how to trace control through holding companies and trusts, when a corporate shareholder is a registrable relevant legal entity, and how and when to tell Companies House.",
  objectives: [
    "Apply the five PSC conditions to a shareholding structure",
    "Trace indirect control through companies using the majority-stake test",
    "Decide when a corporate shareholder is a registrable relevant legal entity (RLE)",
    "File PSC information and changes on time, including the identity verification step",
  ],
  body: [
    {
      kind: "md",
      md: `The PSC regime makes the people who really own or control a company visible on the public register. You'll deal with it on every incorporation, every share transfer and every confirmation statement. It is also a key input to your own anti-money laundering checks, because a client's PSCs are usually its beneficial owners.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The five conditions (CA 2006 Sch 1A)",
      md: `An individual is a PSC if they meet **one or more** of these conditions, directly or indirectly:

1. They hold **more than 25% of the shares**.
2. They hold **more than 25% of the voting rights**.
3. They have the right to **appoint or remove a majority of the board** of directors.
4. They have the right to exercise, or actually exercise, **significant influence or control** over the company.
5. They have the right to exercise, or actually exercise, significant influence or control over the activities of a **trust or firm** that itself meets one of the conditions above.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "'More than' 25%",
      md: `Exactly **25% is not enough**. Four equal shareholders with 25% each are not PSCs under conditions 1 and 2. In that case check conditions 3 to 5 before concluding there's no PSC, and if there genuinely is none, the company files a statement that it has no registrable person.`,
    },
    {
      kind: "md",
      md: `### Indirect holdings and relevant legal entities

When a company is owned through another company, you don't just stop at the corporate shareholder.

- A corporate shareholder that meets a condition is a **relevant legal entity (RLE)**. It is **registrable** (it goes on the register instead of the people behind it) if it is subject to its own PSC disclosure requirements, for example another UK company, or one listed on certain regulated markets.
- An individual holds an interest **indirectly** through a company in which they have a **majority stake** (more than 50% of shares or votes, or the right to appoint or remove a majority of its board, or the right to exercise dominant influence).
- If a registrable RLE sits in the chain, the company records the **first** registrable RLE above it and stops. The individuals are recorded on that RLE's own PSC register at Companies House.`,
    },
    {
      kind: "table",
      caption: "Worked structures",
      head: ["Structure", "Who goes on OpCo Ltd's PSC record?"],
      rows: [
        ["Ali owns 100% of HoldCo Ltd (UK), which owns 100% of OpCo Ltd", "HoldCo Ltd, as a registrable RLE. Ali is HoldCo's PSC."],
        ["Ali owns 30% and Bea 70% of OpCo Ltd directly", "Ali and Bea"],
        ["Four friends each own 25% of OpCo Ltd, with no other control rights", "No registrable person: file a statement"],
        ["Cara owns 60% of an overseas company with no PSC regime, which owns 40% of OpCo Ltd", "Cara, holding indirectly (majority stake in a non-registrable entity)"],
        ["Trustees of the Dean Family Trust hold 50% of OpCo Ltd", "The trustees (condition 5 and the shares they hold), and anyone with significant influence over the trust"],
      ],
    },
    {
      kind: "md",
      md: `### Telling Companies House

PSC information is filed on the PSC forms or through the online service:

| Form | Use |
|---|---|
| PSC01 | Notify an individual PSC |
| PSC02 | Notify a relevant legal entity |
| PSC04 / PSC05 | Change details of an individual / RLE PSC |
| PSC07 | Notify that someone has ceased to be a PSC |
| PSC08 / PSC09 | Notify or withdraw statements (for example, no registrable person) |

You must tell Companies House about new PSCs and about any changes, such as a change of personal details or nature of control, **within 14 days of confirming the change**. Since 18 November 2025 companies don't keep their own PSC register. The information at Companies House is the register, so it must be right.`,
    },
    {
      kind: "callout",
      tone: "tip",
      title: "Identity verification for PSCs",
      md: `Every individual PSC must now be identity verified. A new PSC provides their personal code when first added, or within 14 days. Existing PSCs use their 14-day window (birth month, or the confirmation statement date if they're also a director). Remember that RLEs don't verify, but the officers of corporate PSCs are due to be brought in later.`,
    },
    {
      kind: "md",
      md: `### Investigating and the company's duties

A company has to take reasonable steps to find out who its PSCs are, and can serve notices on anyone it believes knows. Individuals also have a duty to tell the company if they are a PSC and the company hasn't identified them. Failing to comply is a criminal offence for the company and its officers. In practice, the most common errors you'll find are: a share transfer that took someone over or under 25% and wasn't reported, a spouse or relative who should have been added, and holding-company structures recorded with the wrong person.`,
    },
  ],
  scenario: {
    title: "Mapping control at Fenwick Engineering Ltd",
    narrative: `Fenwick Engineering Ltd's shares are held as follows after a reorganisation:

| Shareholder | Shares |
|---|---:|
| Fenwick Holdings Ltd (a UK company) | 55% |
| Jo Fenwick | 20% |
| Mark Ellis | 25% |

Fenwick Holdings Ltd is owned 50% by Jo Fenwick and 50% by her brother Sam Fenwick. A shareholders' agreement gives Mark Ellis the right to appoint or remove two of the three Fenwick Engineering directors.

The current PSC record at Companies House shows only "Jo Fenwick – 75% or more".`,
    walkthrough: [
      {
        kind: "md",
        md: `1. **Fenwick Holdings Ltd** holds 55% (more than 25%). It's a UK company subject to its own PSC regime, so it's a **registrable RLE**. Record it (PSC02), with nature of control: more than 50% but not more than 75% of shares and votes.
2. **Jo** holds 20% directly. Does she hold Holdings' 55% indirectly? Only if she has a **majority stake** in Holdings. She has exactly 50%, which isn't a majority. And because Holdings is a registrable RLE, we stop at Holdings anyway. Her 20% direct holding is below the threshold, so **Jo isn't a PSC of Fenwick Engineering** (she'll be a PSC of Holdings).
3. **Mark** holds exactly 25%, which **isn't** more than 25%. But he has the right to appoint or remove a **majority of the board** (two of three directors). So **Mark is a PSC** under condition 3.
4. **Sam** has no direct interest and no majority stake in Holdings, so he isn't a PSC of Fenwick Engineering.
5. **Correct the record.** File PSC07 to remove Jo, PSC02 for Fenwick Holdings and PSC01 for Mark (with his personal code, as a new PSC). Do it within 14 days of confirming the position, and minute the review.`,
      },
    ],
  },
  exercises: [
    {
      kind: "classify",
      id: "is-psc",
      prompt: "Pat Doyle Ltd has 1,000 ordinary shares with one vote each. Is each person a PSC?",
      categories: ["PSC", "Not a PSC"],
      items: [
        { text: "Pat holds 260 shares", answer: 0, why: "26% is more than 25%." },
        { text: "Rosa holds 250 shares and has no other rights", answer: 1, why: "Exactly 25% is not more than 25%." },
        { text: "Leon holds 100 shares but has a right under the articles to appoint 3 of the 5 directors", answer: 0, why: "Condition 3: majority of the board." },
        { text: "The bank, which holds a debenture and normal lender protections", answer: 1, why: "Ordinary lender protections don't amount to significant influence or control." },
        { text: "Tom holds 390 shares as nominee for his sister Ella", answer: 1, why: "A nominee isn't the PSC: Ella, who holds the interest beneficially, is." },
      ],
      explain:
        "Look through nominees to the beneficial owner, apply the 'more than 25%' threshold strictly, and remember that the board-appointment right is a separate condition.",
    },
    {
      kind: "numeric",
      id: "count-pscs",
      prompt:
        "A company has 800 shares: Asha 216, Ben 200, Cleo 184, Dev 200. There are no other rights or agreements. How many PSCs does the company have?",
      answer: 1,
      unit: "",
      explain: "Work out each percentage. Only a holding of more than 25% counts.",
      working: "Asha 216/800 = 27% ✓; Ben 25% ✗; Cleo 23% ✗; Dev 25% ✗. **1 PSC** (Asha).",
    },
    {
      kind: "mcq",
      id: "rle-stop",
      prompt: "Zed owns 100% of Alpha Holdings Ltd (UK), which owns 100% of Beta Ltd. What goes on Beta Ltd's PSC record?",
      options: ["Zed only", "Alpha Holdings Ltd only", "Both Zed and Alpha Holdings Ltd", "No registrable person"],
      answer: 1,
      explain: "Alpha Holdings is a registrable RLE (a UK company with its own PSC disclosure). Beta records Alpha and stops; Zed appears on Alpha's record.",
    },
    {
      kind: "numeric",
      id: "psc-days",
      prompt: "A company confirms on 6 October 2026 that a new investor has become a PSC. Within how many days must it tell Companies House?",
      answer: 14,
      unit: "days",
      explain: "PSC information and changes must be sent to Companies House within 14 days of confirming them.",
      working: "**14 days**, so by 20 October 2026. The new PSC also provides their personal code on being added, or within 14 days.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "What shareholding makes an individual a PSC under the shares condition?",
      options: ["25% or more", "More than 25%", "More than 50%", "Any holding with votes"],
      answer: 1,
      explain: "The test is more than 25% of the shares.",
    },
    {
      kind: "mcq",
      id: "q-majority-stake",
      prompt: "For indirect holdings, what is a 'majority stake' in an intermediate company?",
      options: ["More than 25% of shares", "Exactly 50%", "More than 50% of shares or votes, or other control such as the right to appoint a board majority", "Any directorship"],
      answer: 2,
      explain: "An individual holds indirectly only through an entity in which they have a majority stake (more than 50%, or equivalent control).",
    },
    {
      kind: "mcq",
      id: "q-no-psc",
      prompt: "A company has five equal shareholders and no other control arrangements. What must it do?",
      options: ["Nothing", "Register all five as PSCs", "File a statement that it has no registrable person", "Register the directors as PSCs"],
      answer: 2,
      explain: "Where there's no registrable person, the company must say so in a statement (PSC08).",
    },
    {
      kind: "mcq",
      id: "q-local-register",
      prompt: "Since 18 November 2025, where is a company's PSC information held?",
      options: ["In the company's own PSC register only", "At Companies House, with no local register required", "With HMRC", "Both locally and centrally, as before"],
      answer: 1,
      explain: "ECCTA abolished the requirement to keep a local PSC register. The Companies House record is the register.",
    },
    {
      kind: "mcq",
      id: "q-nominee",
      prompt: "Shares are held by a nominee for a beneficial owner. Who is assessed for PSC purposes?",
      options: ["The nominee", "The beneficial owner", "Both equally", "Neither"],
      answer: 1,
      explain: "Interests held by a nominee are treated as held by the person for whom they are held.",
    },
  ],
  sources: [
    { label: "People with significant control (PSCs) – Companies House guidance", url: "https://www.gov.uk/guidance/people-with-significant-control-pscs" },
    { label: "Companies Act 2006 Schedule 1A – references to people with significant control", url: "https://www.legislation.gov.uk/ukpga/2006/46/schedule/1A" },
    { label: "Provide identity verification details for a PSC", url: "https://www.gov.uk/guidance/provide-psc-verification" },
    { label: "When you need to verify your identity for Companies House", url: "https://www.gov.uk/guidance/when-you-need-to-verify-your-identity-for-companies-house" },
  ],
};
