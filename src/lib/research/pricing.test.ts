import { describe, expect, it } from "vitest";
import { costMicros, MODELS } from "./pricing";

describe("costMicros", () => {
  it("matches the measured Opus question (15,381 in / 2,110 out ≈ $0.104)", () => {
    expect(costMicros(MODELS.opus, { input_tokens: 15_381, output_tokens: 2_110 })).toBe(103_724);
  });
  it("prices Sonnet at half of Opus and Haiku at a quarter", () => {
    const u = { input_tokens: 10_000, output_tokens: 1_000 };
    expect(costMicros(MODELS.sonnet, u)).toBe(costMicros(MODELS.opus, u) / 2);
    expect(costMicros(MODELS.haiku, u)).toBe(costMicros(MODELS.opus, u) / 4);
  });
  it("bills cache reads at a tenth and cache writes at 1.25×", () => {
    expect(costMicros(MODELS.opus, { cache_read_input_tokens: 1_000 })).toBe(400);
    expect(costMicros(MODELS.opus, { cache_creation_input_tokens: 1_000 })).toBe(5_000);
  });
  it("adds web searches and treats unknown models as Opus", () => {
    expect(costMicros("claude-future-9", { input_tokens: 0, server_tool_use: { web_search_requests: 2 } })).toBe(20_000);
    expect(costMicros("claude-future-9", { input_tokens: 1_000 })).toBe(4_000);
  });
});
