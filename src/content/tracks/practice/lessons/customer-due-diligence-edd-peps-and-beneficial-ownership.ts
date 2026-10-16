import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "customer-due-diligence-edd-peps-and-beneficial-ownership",
  title: "Customer due diligence: standard, enhanced, PEPs and beneficial owners",
  level: "foundation",
  minutes: 40,
  summary:
    "How to carry out customer due diligence (CDD) on a new client: identifying and verifying the client and its beneficial owners, assessing risk, when enhanced due diligence is required (including politically exposed persons and high-risk third countries), ongoing monitoring, and what to do if CDD can't be completed.",
  objectives: [
    "Describe the elements of CDD under MLR 2017 and when it must be applied",
    "Identify beneficial owners of a company, partnership and trust",
    "Decide when enhanced due diligence is required and what it involves",
    "Handle a politically exposed person (PEP) client",
    "Explain ongoing monitoring, discrepancy reporting and what to do if CDD cannot be completed",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `**Customer due diligence (CDD)** means knowing who the client is, who really owns and controls it, and why the client wants your services, and checking that information against reliable sources. It must be done **before** the business relationship starts (or very soon after, in low-risk cases where it is necessary not to interrupt normal business), and **kept up to date**. The depth is **risk-based**.`,
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The elements of CDD (MLR 2017 reg 28)",
      md: `1. **Identify** the client and **verify** its identity on the basis of **documents or information from a reliable and independent source**.
2. For a **body corporate**, **identify and verify the beneficial owners** and take **reasonable measures** to understand the **ownership and control structure**.
3. **Assess and, where appropriate, obtain information about the purpose and intended nature** of the business relationship.
4. **Ongoing monitoring** of the relationship, scrutinising transactions and keeping CDD information up to date.

CDD is required when you **establish a business relationship**, carry out an **occasional transaction** over the regulation threshold, **suspect** money laundering or terrorist financing, or **doubt** the adequacy of documents obtained earlier. If you can't complete CDD, you must **not** carry out a transaction or establish or continue the relationship, and should consider whether to make a **suspicious activity report**.`,
    },
    {
      kind: "table",
      caption: "Who is a beneficial owner?",
      head: ["Client type", "Beneficial owner is normally…"],
      rows: [
        ["Company (not listed)", "Any individual who ultimately owns or controls **more than 25%** of the shares or voting rights, or who otherwise exercises **control** (for example by appointing a majority of directors)"],
        ["Partnership / LLP", "Individuals with **more than 25%** of capital, profits or voting rights, or who otherwise **control** the business"],
        ["Trust", "The **settlor**, the **trustees**, the **protector** (if any), the **beneficiaries** (or class of beneficiaries) and any other individual exercising **ultimate control**"],
        ["Individual", "The individual (check whether they act for someone else)"],
        ["If no individual is identified", "The **senior managing official**: record why no beneficial owner could be identified"],
      ],
    },
    {
      kind: "md",
      md: `### Simplified and enhanced due diligence

- **Simplified due diligence (SDD)** is allowed where the **risk is assessed as low** (for example certain regulated or listed entities), after assessing the relationship and the risk, and with continued monitoring. You still need to **identify** the client.
- **Enhanced due diligence (EDD)** is **required** where:
  - The client, or a party to a relevant transaction, is **established in a high-risk third country** (a country listed by the FATF, as set out in HM Treasury's advisory notice);
  - The client is a **politically exposed person (PEP)**, or a **family member or known close associate** of a PEP;
  - The structure or transaction is **complex, unusually large** or with **no apparent economic or legal purpose**;
  - The firm's own risk assessment indicates **high risk** (for example opaque offshore ownership, or a **non-face-to-face** relationship combined with other risk factors).
- EDD means **more information** (source of funds and **source of wealth**), **senior management approval**, and **enhanced ongoing monitoring**.

### PEPs

A **PEP** is an individual entrusted with a **prominent public function** (other than as a middle-ranking or junior official), **in the UK or abroad**. The rules extend to **family members** and **known close associates**. EDD always applies to a PEP: you must have **senior management approval** to establish or continue the relationship, establish the **source of wealth and funds**, and conduct **enhanced ongoing monitoring**. Since **10 January 2024** a **domestic (UK) PEP** has a **lower starting point for risk** than a non-domestic PEP, so a lighter level of EDD applies unless other risk factors are present. EDD continues for **at least 12 months** after the PEP leaves office (longer if the risk warrants it). PEP status doesn't mean refusal; it means more scrutiny.

### Verifying identity in practice

- **Individuals:** passport or photocard driving licence plus proof of address; or **electronic verification** from a reputable provider; remote clients may need extra steps.
- **Companies:** check **Companies House**, obtain the **certificate of incorporation**, identify directors and **persons with significant control (PSCs)**, and verify the beneficial owners. **Don't rely solely** on the PSC register.
- **Trusts:** obtain the **trust deed** (or an extract), identify the parties and verify the principal controllers; check the **Trust Registration Service** entry if relevant.
- **Discrepancies:** if you find a **material discrepancy** between the information you hold and the Companies House register, you must report it to Companies House (in the manner required by the regulations).
- **Companies House identity verification** for directors and PSCs (from 18 November 2025) **does not replace** your own CDD.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Pitfalls",
      md: `- Relying on a client's **word** or a single unreliable document.
- **Stopping at the first layer** of a corporate structure: look through holding companies and nominee arrangements to the natural persons.
- Not recording the **risk assessment** for each client.
- Skipping **ongoing monitoring** (changes in ownership, new jurisdictions, unusual transactions).
- Letting **EDD paperwork** pile up without senior sign-off.
- Failing to **record** why a PEP was accepted.`,
    },
  ],
  scenario: {
    title: "Taking on Brightwater Holdings Ltd",
    narrative: `A prospective client, **Brightwater Holdings Ltd**, a UK property company, asks for accounts and tax services. Its shareholders are **Mr Kovacs 40%**, **Mara Trust (a Cayman trust) 35%**, **Ms Lin 15%** and **Mr Dray 10%**. Mr Kovacs was a deputy minister in another country's government three years ago. The company was introduced by a contact met only online, and Mr Kovacs has not been seen face to face.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: beneficial owners.** More than 25%: **Mr Kovacs (40%)** and **Mara Trust (35%)**. For the trust, identify the **settlor, trustees, protector and beneficiaries**; and look through to the **individuals** who ultimately benefit or control. Ms Lin (15%) and Mr Dray (10%) are below the threshold, but check for **control** by other means.

**Step 2: PEP.** Mr Kovacs held a prominent public function abroad (a deputy minister) but left office three years ago. The mandatory PEP measures run for **at least 12 months** after leaving office, and longer where the risk warrants it, so the firm must decide on a risk basis whether to keep treating him as a PEP. Given his former role and the other risk factors below, it applies PEP-level EDD: **senior management approval**, **source of wealth and funds**, and **enhanced monitoring**.

**Step 3: other risk factors.** Cayman trust (opaque structure), overseas owner, remote introduction, property sector. The firm-wide risk assessment rates this **high risk**.

**Step 4: actions.**
- Obtain **identity documents** and independent verification for Mr Kovacs; arrange a **video call** and electronic verification.
- Obtain the **trust deed** and identify the trust's controllers.
- Obtain evidence of the **source of wealth** (employment history, disposal of assets, etc.) and **source of funds** for the company's property purchases.
- **MLRO review and partner approval** before acceptance, documented.
- Set a **review frequency** (for example every 6–12 months).

**Step 5: if the client refuses.** If the information can't be obtained, **decline** the engagement. If you have **suspicion**, consider an internal report to the MLRO (see the next lesson), and do **not** tell the client.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "bo-count",
      prompt: "A company has shareholders A 45%, B 30%, C 20% and D 5%. How many individuals hold more than 25% and are therefore beneficial owners on the shareholding test?",
      answer: 2,
      unit: "",
      explain: "Beneficial owners hold more than 25%: A and B.",
      working: "A 45% and B 30%: **2**.",
    },
    {
      kind: "classify",
      id: "classify-edd",
      prompt: "Is enhanced due diligence required?",
      categories: ["EDD required", "Standard CDD may suffice"],
      items: [
        { text: "A client who is a foreign PEP", answer: 0 },
        { text: "A UK sole trader plumber known to the firm for 10 years, simple affairs", answer: 1 },
        { text: "A company with a complex offshore ownership chain and no clear commercial reason", answer: 0 },
        { text: "A client based in a country on HM Treasury's high-risk third country list", answer: 0 },
        { text: "A small UK limited company with two local shareholders each holding 50%", answer: 1 },
      ],
      explain: "EDD is triggered by PEPs, high-risk third countries, complex structures and high risk ratings.",
    },
    {
      kind: "mcq",
      id: "mcq-pep-approval",
      prompt: "What approval is needed to establish a business relationship with a PEP?",
      options: ["None", "Senior management approval", "Client approval", "NCA approval"],
      answer: 1,
      explain: "Senior management approval, with source of wealth and funds established.",
    },
    {
      kind: "mcq",
      id: "mcq-cdd-fail",
      prompt: "You cannot complete CDD on a new client. What must you do?",
      options: ["Proceed anyway", "Not establish the relationship or carry out the transaction, and consider whether to make a SAR", "Ask HMRC", "Charge a higher fee"],
      answer: 1,
      explain: "You can't proceed, and you should consider a SAR.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-threshold",
      prompt: "A person holding more than what percentage of a company's shares or votes is normally a beneficial owner?",
      options: ["5%", "10%", "25%", "50%"],
      answer: 2,
      explain: "More than 25%.",
    },
    {
      kind: "mcq",
      id: "q-trust",
      prompt: "Which are beneficial owners of a trust?",
      options: ["The settlor, trustees, protector, beneficiaries and anyone with ultimate control", "Only the settlor", "Only the beneficiaries", "Only the trustees"],
      answer: 0,
      explain: "All of the main parties.",
    },
    {
      kind: "mcq",
      id: "q-psc",
      prompt: "Can you rely solely on the Companies House PSC register for beneficial ownership?",
      options: ["Yes", "No: it must be corroborated and discrepancies reported", "Only for private companies", "Only for LLPs"],
      answer: 1,
      explain: "It is one source; you must also take reasonable measures and report material discrepancies.",
    },
    {
      kind: "mcq",
      id: "q-sow",
      prompt: "EDD for a PEP includes establishing…",
      options: ["Their favourite colour", "Source of wealth and source of funds", "Their tax code", "Their marital status only"],
      answer: 1,
      explain: "Source of wealth and funds.",
    },
    {
      kind: "mcq",
      id: "q-ch-iv",
      prompt: "Does Companies House identity verification replace the firm's own CDD?",
      options: ["Yes", "No", "Only for directors", "Only for PSCs"],
      answer: 1,
      explain: "It is a separate regime; the firm still has its own CDD duties.",
    },
  ],
  sources: [
    { label: "Money Laundering Regulations 2017 – ICAEW", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/uk-law-and-guidance/money-laundering-regulations-2017" },
    { label: "Money Laundering Regulations 2017 – legislation.gov.uk (reg 28 CDD)", url: "https://www.legislation.gov.uk/uksi/2017/692/regulation/28" },
    { label: "Money Laundering Regulations 2017 – legislation.gov.uk (reg 33 EDD)", url: "https://www.legislation.gov.uk/uksi/2017/692/regulation/33" },
    { label: "ECSH33337 – testing procedures for politically exposed persons (HMRC)", url: "https://www.gov.uk/hmrc-internal-manuals/economic-crime-supervision-handbook/ecsh33337" },
    { label: "AMLG11650 – politically exposed persons (HMRC AML guidance)", url: "https://www.gov.uk/hmrc-internal-manuals/anti-money-laundering-guidance-for-supervised-businesses/amlg11650" },
    { label: "Money laundering advisory notice: high-risk third countries – GOV.UK", url: "https://www.gov.uk/government/publications/money-laundering-advisory-notice-high-risk-third-countries--2" },
    { label: "Verify your identity for Companies House – GOV.UK", url: "https://www.gov.uk/guidance/verify-your-identity-for-companies-house" },
    { label: "ECSH21500 – MLR 2017 (HMRC Economic Crime Supervision Handbook)", url: "https://www.gov.uk/hmrc-internal-manuals/economic-crime-supervision-handbook/ecsh21500" },
  ],
};
