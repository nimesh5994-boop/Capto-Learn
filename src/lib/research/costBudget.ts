/*
 * Ask Capto's per-question spending ceiling. Every question — standard or expert — must cost at most CEILING_PENCE,
 * however large the sources. Before the answer is written we work out the worst case (all the source text we
 * send, plus the longest answer we allow) and trim both until it fits under what's left of the budget.
 * Pure, so it's unit-tested.
 */
import { priceOf } from "./pricing";

/** The firm's hard limit per question, in pence. */
export const CEILING_PENCE = 5;
/** Conservative GBP→USD for budgeting (a stronger dollar only makes us more cautious). */
export const USD_PER_GBP = 1.25;
export const CEILING_MICROS = Math.round((CEILING_PENCE / 100) * USD_PER_GBP * 1_000_000);

/** Tokens are ~4 characters of English; 3.2 errs high so the estimate never under-reads. */
const CHARS_PER_TOKEN = 3.2;
/** Fixed text sent with every answer request besides the sources (system prompt, wrapper, question). */
export const OVERHEAD_CHARS = 5_000;

/**
 * Source text and answer length we try, most generous first. The answer allowance includes the model's own
 * thinking (answers so far: up to ~2,700 tokens all-in at medium effort), so it is never squeezed below 3,200.
 */
const SOURCE_STEPS = [28_000, 24_000, 20_000, 16_000, 12_000];
const OUTPUT_STEPS = [4_000, 3_600, 3_200];

export interface DraftLimits {
  sourceChars: number;
  maxTokens: number;
  /** Worst-case cost of the answer call, millionths of a dollar. */
  worstMicros: number;
}

export function worstCaseMicros(model: string, sourceChars: number, maxTokens: number): number {
  const p = priceOf(model);
  const inputTokens = (sourceChars + OVERHEAD_CHARS) / CHARS_PER_TOKEN;
  return Math.ceil(inputTokens * p.input + maxTokens * p.output);
}

/**
 * The most source text and answer length that keep the whole question under the ceiling, given what's already
 * been spent (planner) and reserved (e.g. the professional-bodies search running alongside). Null when even the
 * smallest setting won't fit — the caller then declines rather than overspend.
 */
export function draftLimits(model: string, spentMicros: number, reservedMicros = 0, ceilingMicros = CEILING_MICROS): DraftLimits | null {
  const left = ceilingMicros - spentMicros - reservedMicros;
  for (const sourceChars of SOURCE_STEPS)
    for (const maxTokens of OUTPUT_STEPS) {
      const worst = worstCaseMicros(model, sourceChars, maxTokens);
      if (worst <= left) return { sourceChars, maxTokens, worstMicros: worst };
    }
  return null;
}

/** Most the professional-bodies search may cost: one web search ($0.01) plus Haiku 5.5 tokens (well under 0.2¢). */
export const PROFESSIONAL_RESERVE_MICROS = 12_000;
