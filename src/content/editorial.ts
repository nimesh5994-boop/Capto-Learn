/*
 * The published record of how Capto Learn's content is checked, shown on the public /editorial page and on
 * every lesson. Update this when an accuracy pass is completed (details per course live in docs/proofread/).
 */

export interface AccuracyPass {
  /** Shown as "our October 2026 accuracy pass". */
  label: string;
  completed: string; // yyyy-mm-dd
  method: string;
  /** Corrections made per course slug (fact, calculation, misleading wording and source fixes). */
  corrections: Record<string, number>;
  /** Corrections to the instant-answer question bot. */
  botCorrections: number;
}

export const ACCURACY_PASSES: AccuracyPass[] = [
  {
    label: "October 2026",
    completed: "2026-10-18",
    method:
      "Every lesson, exercise, worked example and quiz was re-read and every calculation re-done. Each fact was checked against GOV.UK, HMRC's internal manuals, Companies House, The Pensions Regulator or the FRC as published at the time, and only changed where an official source proved it wrong. Items that couldn't be proved either way were settled in a second pass or left for a qualified reviewer.",
    corrections: {
      "accounts-production": 16,
      bookkeeping: 12,
      "capital-taxes": 15,
      cis: 29,
      "corporation-tax": 10,
      cosec: 12,
      directors: 23,
      foundations: 14,
      ir35: 20,
      payroll: 10,
      pensions: 24,
      "personal-tax": 8,
      practice: 13,
      rd: 10,
      vat: 9,
    },
    botCorrections: 5,
  },
];

export const LATEST_PASS = ACCURACY_PASSES[0];
/** e.g. "October 2026" — used in "last checked in our October 2026 accuracy pass". */
export const FACT_CHECKED = LATEST_PASS.label;
export const totalCorrections = (p: AccuracyPass) => Object.values(p.corrections).reduce((a, b) => a + b, 0) + p.botCorrections;
