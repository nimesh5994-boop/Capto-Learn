/*
 * Spending ceiling for one planning scenario. Each researched issue is an ordinary Ask Capto expert question (so it
 * already stops at 5p); the scenario adds a cap on the whole run so the pieces plus the final write-up can never
 * exceed SCENARIO_CEILING_PENCE. Pure, so it's unit-tested.
 */
import { CEILING_MICROS, USD_PER_GBP, worstCaseMicros } from "@/lib/research/costBudget";
import { MODELS } from "@/lib/research/pricing";

export const SCENARIO_CEILING_PENCE = 40;
export const SCENARIO_CEILING_MICROS = Math.round((SCENARIO_CEILING_PENCE / 100) * USD_PER_GBP * 1_000_000);
export const MAX_ISSUES = 5;
/** Most one researched issue can cost: the Ask Capto per-question ceiling. */
export const ISSUE_CEILING_MICROS = CEILING_MICROS;

/** Cost of the issue-breakdown step (cheap model, short output) reserved before anything runs. */
export const DECOMPOSE_RESERVE_MICROS = 15_000;

const OUTPUT_STEPS = [6_000, 5_000, 4_000];
const INPUT_STEPS = [40_000, 32_000, 24_000, 16_000];

export interface SynthesisLimits {
  /** Characters of issue findings we may send. */
  inputChars: number;
  maxTokens: number;
  worstMicros: number;
}

/** The write-up call's size, trimmed to fit what is left of the scenario budget; null when nothing fits. */
export function synthesisLimits(spentMicros: number, ceilingMicros = SCENARIO_CEILING_MICROS): SynthesisLimits | null {
  const left = ceilingMicros - spentMicros;
  for (const inputChars of INPUT_STEPS)
    for (const maxTokens of OUTPUT_STEPS) {
      const worstMicros = worstCaseMicros(MODELS.sonnet, inputChars, maxTokens);
      if (worstMicros <= left) return { inputChars, maxTokens, worstMicros };
    }
  return null;
}

/** How many issues can be researched: every issue may cost up to its own ceiling, and the write-up needs its reserve. */
export function affordableIssues(wanted: number, spentMicros: number, ceilingMicros = SCENARIO_CEILING_MICROS): number {
  const smallestWriteUp = worstCaseMicros(MODELS.sonnet, INPUT_STEPS[INPUT_STEPS.length - 1], OUTPUT_STEPS[OUTPUT_STEPS.length - 1]);
  const room = ceilingMicros - spentMicros - smallestWriteUp;
  return Math.max(0, Math.min(wanted, MAX_ISSUES, Math.floor(room / ISSUE_CEILING_MICROS)));
}
