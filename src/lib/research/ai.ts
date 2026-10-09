import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { costMicros, type UsageLike } from "./pricing";

/* Shared Anthropic client + a per-question usage/cost meter for Ask Capto. */

let client: Anthropic | null = null;
export function anthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("Ask Capto isn't configured yet — ANTHROPIC_API_KEY is missing.");
  return (client ??= new Anthropic({ maxRetries: 2, timeout: 110_000 }));
}

/** Refusals on Opus/Sonnet fall back server-side to Anthropic's recommended model for the refusal category. */
export const FALLBACK = { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" as const };

export class Meter {
  input = 0;
  output = 0;
  micros = 0;
  add(model: string, r: { usage?: UsageLike | null }) {
    const u = r.usage;
    if (!u) return;
    this.input += (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0);
    this.output += u.output_tokens ?? 0;
    this.micros += costMicros(model, u);
  }
  get usage() {
    return { input: this.input, output: this.output, micros: this.micros };
  }
}
