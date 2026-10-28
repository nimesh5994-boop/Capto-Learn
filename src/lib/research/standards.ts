import "server-only";
import { anthropic, Meter } from "./ai";
import { MODELS } from "./pricing";
import { groupStandardsCitations, STANDARDS_DOMAINS, type StandardsPage } from "./standardsRules";

/*
 * Accounting-standards questions (FRS 102, FRS 105, FRS 101, UK-adopted IAS and IFRS, the SORPs) can't be answered from HMRC
 * and GOV.UK guidance, which is what Capto's knowledge base holds. For these, one live web search of the standard-setters'
 * and professional bodies' own pages supplies short extracts that go into the normal answer pipeline as sources, so the answer is
 * still quote-checked against the text the search returned. Capped at ONE search to stay inside the per-question cost ceiling.
 */

/** Most one standards search may cost: a web search ($0.01) plus Haiku 5.5 tokens, in millionths of a dollar. */
export const STANDARDS_RESERVE_MICROS = 12_000;

/** One live search of the standard-setters' pages; null when nothing usable came back. */
export async function standardsSources(question: string, meter: Meter): Promise<StandardsPage[]> {
  const res = await anthropic().messages.create({
    model: MODELS.haikuLatest,
    max_tokens: 2500,
    system:
      "You research professional questions for a UK accountancy practice: accounting standards (FRS 102, FRS 105, FRS 101, UK-adopted IAS and IFRS), audit and assurance, ethics, insolvency, management accounting and other professional practice. Search the standard-setters', regulators' and professional bodies' pages (FRC, IFRS Foundation, UKEB, ICAEW, ACCA, AAT, CIMA, CIPFA, R3, CIOT, ATT) for what the relevant standard or guidance says about the question. Then write 6–10 short sentences stating what the sources say, each tied to what you found. Only report what the search results say. If nothing relevant is found, reply exactly: NONE.",
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 1, allowed_domains: [...STANDARDS_DOMAINS] }],
    messages: [{ role: "user", content: question }],
  });
  meter.add(MODELS.haikuLatest, res);
  if (res.stop_reason === "refusal") return [];
  return groupStandardsCitations(res.content as Parameters<typeof groupStandardsCitations>[0]);
}
