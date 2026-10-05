import type { Lesson } from "../../../types";

export const lesson: Lesson = {
  slug: "sars-mlro-tipping-off-and-daml",
  title: "Suspicious activity reports: the MLRO, tipping off and defence against money laundering",
  level: "foundation",
  minutes: 35,
  summary:
    "When a member of staff must report suspicion, how the internal report to the MLRO and external report to the NCA work, the offences of failing to disclose and tipping off, how to ask for a defence against money laundering (DAML) and what the seven-working-day and 31-day periods mean in practice.",
  objectives: [
    "Explain the test for suspicion and the offences in POCA ss327–330 and s333A",
    "Describe the internal reporting chain from staff member to MLRO to the NCA",
    "Explain tipping off and how to handle client questions without committing the offence",
    "Explain what a DAML is, when it is needed and the notice and moratorium periods",
    "Handle record keeping and a client who asks why work has stopped",
  ],
  taxYear: "2026/27",
  body: [
    {
      kind: "md",
      md: `The regulated sector has a **duty to report** suspicion of money laundering. It is one of the few areas of professional life where you may have to **act against a client's interests** and **say nothing to them**. The duty falls on **individual staff** as well as the firm. Understanding it protects both the firm and you personally, because failure to report is a **criminal offence**.`,
    },
    {
      kind: "table",
      caption: "The main offences (POCA 2002 Part 7)",
      head: ["Section", "Offence", "In plain English"],
      rows: [
        ["s327", "Concealing", "Concealing, disguising, converting, transferring or removing criminal property"],
        ["s328", "Arrangements", "Entering into or becoming concerned in an arrangement you know or suspect facilitates the acquisition, retention, use or control of criminal property"],
        ["s329", "Acquisition, use and possession", "Acquiring, using or possessing criminal property"],
        ["s330", "Failure to disclose (regulated sector)", "Failing to report knowledge or suspicion, or reasonable grounds for suspicion, as soon as practicable, where the information came in the course of regulated sector business"],
        ["s333A", "Tipping off", "Disclosing that a report has been made (or an investigation is under way) where that is likely to prejudice an investigation"],
        ["s342", "Prejudicing an investigation", "Falsifying, concealing or destroying documents relevant to an investigation, or tipping off an investigation"],
      ],
    },
    {
      kind: "callout",
      tone: "rule",
      title: "The reporting chain",
      md: `1. **Any member of staff** who knows or suspects (or has **reasonable grounds** to suspect) money laundering must make an **internal report** to the firm's **nominated officer (MLRO)** **as soon as practicable**. Making the internal report discharges the individual's **s330** duty.
2. The **MLRO** considers the information and decides whether there are **knowledge, suspicion or reasonable grounds**. The MLRO must **record the decision and reasoning**.
3. If so, the MLRO makes an **external report (a SAR)** to the **UK Financial Intelligence Unit** in the **National Crime Agency (NCA)**, usually through the **SAR Online** system, **as soon as practicable**.
4. If the firm wants to **proceed with a transaction or activity** which it suspects may involve criminal property and which would otherwise be an offence, it needs a **defence against money laundering (DAML)** from the NCA.
5. The firm keeps **records** of internal reports, the MLRO's decision and any SAR for **five years**.

The test for suspicion is subjective but low (a possibility more than fanciful), while the "reasonable grounds" element means staff cannot ignore **obvious red flags**. A SAR is **not** an accusation: it passes information to law enforcement.`,
    },
    {
      kind: "md",
      md: `### DAML: defence against money laundering

If you suspect that **proceeding** (for example paying funds, completing a transaction or continuing to handle money) would involve you in a **principal money laundering offence**, you can ask the NCA for a **DAML** (sometimes called "consent"). The rules are:

- **7 working days** from the day after the request is received (the day received is **day 0**): the NCA either **grants** a DAML, **refuses** it, or says nothing. If the NCA **does not respond within 7 working days**, you have **deemed consent** to proceed.
- **If refused**, a **moratorium period of 31 calendar days** starts on the day you receive the refusal. During this time you **must not proceed**. Law enforcement may take action, such as seeking a restraint order. The moratorium can be **extended by the Crown Court** in periods of up to 31 days, to a maximum of 186 days beyond the initial 31 days (Criminal Finances Act 2017).
- A DAML request should be **timely**: don't ask after the event.
- A DAML only gives a **defence** to the money laundering **principal offences**. It doesn't authorise a breach of other laws, or give protection from the **tipping off** offence.

### Tipping off

It is an offence to **disclose** that a SAR has been made, or that a money laundering investigation is being or may be conducted, if the disclosure is **likely to prejudice** that investigation. You **may** continue to speak to the client in the normal way **about the work** as long as you do not reveal the report. If you must **stop work**, have a **neutral explanation** ready (for example *"We are unable to continue acting for reasons we can't discuss"*) and ask the **MLRO** to approve the wording first.

### Practical points

- **Staff** shouldn't investigate: pass the information to the MLRO, don't confront the client.
- **Privilege:** limited exceptions exist for information received in **privileged circumstances**, but they are narrow for accountants. Take advice.
- **Appointment:** have a **deputy MLRO** for absence.
- **Record**: keep a **register** of internal reports and decisions, locked away from client files.
- **Voluntary tax errors:** a **tax error** or **evasion** can be the **proceeds of crime**. Consider the AML duty whenever you find unpaid tax that is not simply a mistake.`,
    },
    {
      kind: "callout",
      tone: "warning",
      title: "Never",
      md: `- **Tell the client** you've reported or that a SAR exists.
- **Delay** reporting while you "investigate".
- **Alter or destroy** documents.
- **Process** a payment you suspect is criminal property without a DAML.
- **Discuss** the matter with colleagues who don't need to know.`,
    },
  ],
  scenario: {
    title: "An unusual request at Halden & Co",
    narrative: `A bookkeeper at Halden & Co, Priya, notices that client **Vesper Trading Ltd** (a small clothing importer) has just received **£240,000** from an overseas company with which it has never traded. The director asks the firm to **pay £230,000 immediately** to a third party in another country and to code it as "consultancy fees", with no invoice. The director says the money is "urgent" and tells Priya not to mention it to the partners.`,
    walkthrough: [
      {
        kind: "md",
        md: `**Step 1: red flags.** Large unexplained receipt, no commercial rationale, immediate onward transfer to a third party abroad, no invoice, secrecy. These give reasonable grounds to suspect.

**Step 2: internal report.** Priya reports to the **MLRO** immediately, in writing, with facts only. She doesn't process the payment (it would be a potential s328 arrangement) and doesn't tell the director she has reported.

**Step 3: MLRO decision.** The MLRO reviews, records the reasoning and decides to submit a **SAR** to the NCA and a **DAML request** because the firm would otherwise be involved in moving the funds. The firm **holds** the payment.

**Step 4: timeline.** The NCA has **7 working days**. If it grants a DAML, the firm can proceed; if there is no response within 7 working days, **deemed consent** applies; if refused, the **31-day moratorium** starts and the firm must not proceed.

**Step 5: dealing with the client.** If the director chases, a neutral message is used: *"We need a little more time to complete our procedures"*, approved by the MLRO. The firm doesn't mention the SAR or the DAML.

**Step 6: records.** The MLRO keeps the internal report, the decision, the SAR reference, and records of all communications for **five years**. The firm reviews whether to continue acting.`,
      },
    ],
  },
  exercises: [
    {
      kind: "numeric",
      id: "daml-days",
      prompt: "How many working days does the NCA have to respond to a DAML request before deemed consent applies?",
      answer: 7,
      unit: "days",
      explain: "7 working days (the day of receipt is day 0).",
      working: "**7 working days**.",
    },
    {
      kind: "numeric",
      id: "moratorium-days",
      prompt: "If a DAML request is refused, how many calendar days does the initial moratorium period last?",
      answer: 31,
      unit: "days",
      explain: "31 calendar days from the date the refusal is received.",
      working: "**31 calendar days**.",
    },
    {
      kind: "classify",
      id: "classify-tipping-off",
      prompt: "Would this risk the offence of tipping off?",
      categories: ["Risk of tipping off", "Safe"],
      items: [
        { text: "Telling the client: 'We've sent a report about you to the NCA'", answer: 0 },
        { text: "Telling the client: 'We need a little more time to complete our procedures' (neutral, approved by the MLRO)", answer: 1 },
        { text: "Telling a colleague with no need to know that a SAR has been made", answer: 0 },
        { text: "Continuing normal communication about the accounts without mentioning any report", answer: 1 },
      ],
      explain: "Don't reveal the report or investigation; neutral, approved wording is acceptable.",
    },
    {
      kind: "mcq",
      id: "mcq-staff-duty",
      prompt: "An employee suspects money laundering. What discharges their personal duty to report?",
      options: ["Telling a colleague", "An internal report to the MLRO", "Telling the client", "Ignoring it"],
      answer: 1,
      explain: "An internal report to the nominated officer.",
    },
  ],
  quiz: [
    {
      kind: "mcq",
      id: "q-s330",
      prompt: "Section 330 POCA relates to…",
      options: ["Concealing criminal property", "Failure to disclose in the regulated sector", "Tipping off", "Arrangements"],
      answer: 1,
      explain: "Failure to disclose.",
    },
    {
      kind: "mcq",
      id: "q-tipping",
      prompt: "Which section creates the tipping off offence in the regulated sector?",
      options: ["s327", "s329", "s333A", "s342"],
      answer: 2,
      explain: "s333A.",
    },
    {
      kind: "mcq",
      id: "q-who",
      prompt: "Who makes the external SAR to the NCA?",
      options: ["Any staff member", "The MLRO", "The client", "HMRC"],
      answer: 1,
      explain: "The nominated officer.",
    },
    {
      kind: "mcq",
      id: "q-records-5",
      prompt: "How long are SAR-related internal records kept?",
      options: ["1 year", "3 years", "5 years", "10 years"],
      answer: 2,
      explain: "At least five years.",
    },
    {
      kind: "mcq",
      id: "q-deemed",
      prompt: "No response is received from the NCA within 7 working days of a DAML request. What applies?",
      options: ["Refusal", "Deemed consent", "A court hearing", "A 12-month delay"],
      answer: 1,
      explain: "Deemed consent.",
    },
  ],
  sources: [
    { label: "POCA 2002 Part 7 – money laundering", url: "https://www.legislation.gov.uk/ukpga/2002/29/part/7" },
    { label: "POCA 2002 s333A – tipping off: regulated sector", url: "https://www.legislation.gov.uk/ukpga/2002/29/section/333A" },
    { label: "UKFIU Chapter 3: understanding DAMLs and DATFs (NCA)", url: "https://www.nationalcrimeagency.gov.uk/who-we-are/publications/776-ukfiu-chapter-3-understanding-damls-and-datfs/file" },
    { label: "Circular 008/2018: extending the moratorium period for SARs – GOV.UK", url: "https://www.gov.uk/government/publications/circular-0082018-criminal-finances-act-extending-the-moratorium-period-for-suspicious-activity-reports/circular-0082018-criminal-finances-act-extending-the-moratorium-period-for-suspicious-activity-reports" },
    { label: "UK law and guidance on anti-money laundering – ICAEW", url: "https://www.icaew.com/technical/trust-and-ethics/anti-money-laundering/uk-law-and-guidance" },
  ],
};
