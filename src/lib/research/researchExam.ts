/*
 * The research exam: real client-style questions for Levels 2 and 3 (Ask Capto), each with the facts a correct
 * answer must contain. Run with scripts/research-exam.mts (it calls the AI — roughly $1–3 a run). When a real
 * question gets a poor answer, add it here with what the right answer must say, then fix until it passes.
 *
 * must     — every pattern must appear somewhere in the answer (short answer, steps, example or points)
 * mustNot  — none may appear (known wrong answers)
 */
export interface ResearchCase {
  id: string;
  q: string;
  area: string;
  must: RegExp[];
  mustNot?: RegExp[];
  /** "auto" lets routing choose the level; "expert" forces Level 3. */
  tier?: "auto" | "standard" | "expert";
}

export const RESEARCH_EXAM: ResearchCase[] = [
  {
    id: "s455-overdrawn",
    area: "Directors",
    q: "A director's loan account is overdrawn by £20,000 at the company's year end of 31 March 2026 and won't be repaid within 9 months. What tax applies, at what rate, and when is it due?",
    must: [/s\.?\s?455|section 455/i, /33\.75%/, /9 months and 1 day|nine months and one day|1 January 2027/i],
    mustNot: [/32\.5%/],
  },
  {
    id: "vat-staff-party-clients",
    area: "VAT",
    q: "Can a VAT-registered company reclaim VAT on a staff Christmas party that two clients also attend?",
    must: [/apportion/i, /business entertainment|entertaining clients|client entertainment/i, /staff|employee/i],
  },
  {
    id: "vat-registration",
    area: "VAT",
    q: "What is the VAT registration threshold, and how quickly must a business register once it goes over it?",
    must: [/£90,000/, /30 days/i],
  },
  {
    id: "ae-9000",
    area: "Pensions",
    q: "An employee aged 30 earns £9,000 a year. Does the employer have to automatically enrol them into a pension?",
    must: [/£10,000/, /not (an )?eligible|non-eligible|doesn't have to|does not have to|no[,.] /i, /opt in|join/i],
  },
  {
    id: "cgt-main-home",
    area: "Capital taxes",
    q: "A client sold the house that was their only main residence for the whole time they owned it, with a big gain. Is any capital gains tax due?",
    must: [/private residence relief|PRR/i, /no (CGT|capital gains tax)|exempt|fully relieved|full relief|not chargeable/i],
  },
  {
    id: "ct-payment-date",
    area: "Corporation tax",
    q: "When is corporation tax due for a small company (not large) with a year end of 31 December 2026?",
    must: [/1 October 2027/, /9 months and (1|one) day/i],
  },
  {
    id: "sa-late-filing",
    area: "Personal tax",
    q: "A client files their Self Assessment return 2 months late but owes no tax. What late filing penalty applies?",
    must: [/£100/],
    mustNot: [/£10 a day.*(applies|due|charged) (now|already)/i],
  },
  {
    id: "employer-nic",
    area: "Payroll",
    q: "What is the employer's Class 1 National Insurance rate and secondary threshold for 2026/27?",
    must: [/15%/, /£5,000/],
  },
  {
    id: "mtd-itsa-60k",
    area: "Personal tax",
    q: "A sole trader has qualifying income of £60,000. When do they have to start Making Tax Digital for Income Tax?",
    must: [/6 April 2026|April 2026/i, /£50,000/],
  },
  {
    id: "accrual-journal",
    area: "Bookkeeping",
    q: "How do I post the year-end journal for £800 of electricity used but not yet billed?",
    must: [/\b(Dr|debit)\b[^.]{0,40}(electricity|light and heat|expense)/i, /\b(Cr|credit)\b[^.]{0,40}accrual/i],
  },
  {
    id: "confirmation-statement",
    area: "Company secretarial",
    q: "How long does a company have to file its confirmation statement, and what is the Companies House fee?",
    must: [/14 days/i, /£50\b/],
  },
  {
    id: "ir35-small-client",
    area: "IR35",
    q: "A contractor works through their own limited company for a small private-sector client. Who decides IR35 status — Chapter 8 or Chapter 10?",
    must: [/Chapter 8/i, /small/i, /(contractor|worker)'?s? (own )?company|intermediary/i],
    tier: "auto",
  },
  {
    id: "aia-car",
    area: "Corporation tax",
    q: "Can a company claim the Annual Investment Allowance on a car?",
    must: [/not|no|excluded|can't|cannot/i, /writing down allowance|WDA|main pool|special rate pool/i],
  },
  {
    id: "cis-unregistered",
    area: "CIS",
    q: "What CIS deduction rate applies to payments to a subcontractor who isn't registered with HMRC, and what rate if they are registered?",
    must: [/30%/, /20%/],
  },
  {
    id: "rd-merged-scheme",
    area: "R&D",
    q: "A loss-making software SME spends £400,000 on qualifying R&D. Which R&D scheme applies for periods from April 2024, and what is the main benefit?",
    must: [/merged scheme|ERIS|enhanced R&D intensive support/i, /20%|86%|186%|credit/i],
    tier: "auto",
  },
];
