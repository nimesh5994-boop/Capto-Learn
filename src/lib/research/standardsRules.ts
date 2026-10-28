/*
 * Pure helpers for accounting-standards sources: which sites count as standard-setters or professional bodies, and how the
 * citations a live search returns are grouped into one source per page. The search API returns each citation with the exact
 * text it was drawn from, so these extracts are verbatim page text and can be quote-checked like any other source.
 */

/** Standard-setters, regulators and professional bodies whose own pages count as authoritative for professional (non-HMRC) questions. */
export const STANDARDS_DOMAINS = [
  "frc.org.uk", // accounting, auditing and ethics standards (FRS 102, ISAs (UK), Ethical Standard)
  "ifrs.org", // IAS and IFRS
  "ukeb.org.uk", // UK endorsement of international standards
  "icaew.com",
  "accaglobal.com",
  "aat.org.uk",
  "cimaglobal.com",
  "cipfa.org",
  "r3.org.uk", // insolvency practice
  "ethicsboard.org", // IESBA Code of Ethics
  "tax.org.uk",
  "att.org.uk",
] as const;

export interface StandardsPage {
  url: string;
  title: string;
  /** The extracts the search cited from this page, joined. */
  text: string;
}

type Block = { type: string; citations?: { type: string; url?: string; title?: string | null; cited_text?: string }[] | null };

/** Most extracts and characters kept per page: short, so several pages fit in the answer's source budget. */
const MAX_EXTRACTS_PER_PAGE = 8;
const MAX_CHARS_PER_PAGE = 2400;
const MAX_PAGES = 5;

export const isStandardsUrl = (url: string): boolean => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return STANDARDS_DOMAINS.some((d) => host === d || host.endsWith(`.${d}`));
  } catch {
    return false;
  }
};

/** One page per URL, its cited extracts de-duplicated and capped. Pages from other sites are dropped. */
export function groupStandardsCitations(content: Block[]): StandardsPage[] {
  const pages = new Map<string, { title: string; extracts: string[] }>();
  for (const block of content) {
    if (block.type !== "text") continue;
    for (const c of block.citations ?? []) {
      if (c.type !== "web_search_result_location" || !c.url || !c.cited_text || !isStandardsUrl(c.url)) continue;
      const page = pages.get(c.url) ?? { title: c.title?.trim() || c.url, extracts: [] };
      const text = c.cited_text.replace(/\s+/g, " ").trim();
      if (text.length >= 20 && !page.extracts.includes(text) && page.extracts.length < MAX_EXTRACTS_PER_PAGE) page.extracts.push(text);
      pages.set(c.url, page);
    }
  }
  return [...pages.entries()]
    .filter(([, p]) => p.extracts.length > 0)
    .slice(0, MAX_PAGES)
    .map(([url, p]) => ({ url, title: p.title, text: p.extracts.join("\n\n").slice(0, MAX_CHARS_PER_PAGE) }));
}
