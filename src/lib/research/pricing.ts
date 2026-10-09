/*
 * Anthropic list prices (USD per million tokens) for the models Ask Capto uses, and a cache-aware cost
 * estimate per API response. Pure — used to record what each question actually cost.
 * Cache writes bill at 1.25× input, cache reads at 0.1× input.
 */
export const MODELS = {
  opus: "claude-opus-5-5",
  sonnet: "claude-sonnet-5-5",
  haiku: "claude-haiku-4-5",
} as const;

const PRICES: Record<string, { input: number; output: number }> = {
  [MODELS.opus]: { input: 4, output: 20 },
  [MODELS.sonnet]: { input: 2, output: 10 },
  [MODELS.haiku]: { input: 1, output: 5 },
};

/** Web search server-tool price: $10 per 1,000 searches. */
const WEB_SEARCH_MICROS = 10_000;

export interface UsageLike {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  server_tool_use?: { web_search_requests?: number | null } | null;
}

/** Cost in millionths of a dollar. Unknown models are priced as Opus (never under-reports). */
export function costMicros(model: string, u: UsageLike | null | undefined): number {
  if (!u) return 0;
  const key = Object.keys(PRICES).find((k) => model.startsWith(k)) ?? MODELS.opus;
  const p = PRICES[key];
  const input = (u.input_tokens ?? 0) * p.input + (u.cache_creation_input_tokens ?? 0) * p.input * 1.25 + (u.cache_read_input_tokens ?? 0) * p.input * 0.1;
  const output = (u.output_tokens ?? 0) * p.output;
  return Math.round(input + output + (u.server_tool_use?.web_search_requests ?? 0) * WEB_SEARCH_MICROS);
}

export const formatUsd = (micros: number) => `$${(micros / 1_000_000).toFixed(micros < 10_000 ? 4 : 3)}`;
