/*
 * Finds the rates-table figures a free-text question is asking about ("what's the VAT registration threshold?",
 * "dividend allowance 2026/27", "SSP rate"), for the instant figure shown in Guidance search. Pure.
 */
import type { RateItem, TaxYearRates } from "./types";

const STOP = new Set(["the", "a", "an", "of", "for", "is", "what", "whats", "how", "much", "are", "in", "on", "to", "and", "uk", "current", "this", "year", "tax", "rate", "per", "do", "i", "we", "my", "our", "from", "with", "at", "it", "be", "can", "does", "maximum", "annual", "weekly", "hourly", "limit", "amount"]);

/** Abbreviations and everyday names practitioners type, expanded to the words the rates table uses. */
const SYNONYMS: [RegExp, string][] = [
  [/\bssp\b/g, "statutory sick pay"],
  [/\bsmp\b/g, "statutory maternity pay"],
  [/\bspp\b/g, "statutory paternity pay"],
  [/\bnlw\b|\bliving wage\b/g, "national living wage"],
  [/\bnmw\b|\bminimum wage\b/g, "national minimum wage"],
  [/\baea\b|\bcgt allowance\b/g, "annual exempt"],
  [/\bnrb\b/g, "nil band"],
  [/\brnrb\b/g, "residence nil band"],
  [/\baia\b/g, "annual investment allowance"],
  [/\bwda\b/g, "writing down allowance"],
  [/\bbadr\b|\bentrepreneurs'? relief\b/g, "business asset disposal relief"],
  [/\bmpaa\b/g, "money purchase annual allowance"],
  [/\blsa\b/g, "lump sum allowance"],
  [/\bpsa\b/g, "personal savings allowance"],
  [/\bpa\b/g, "personal allowance"],
  [/\bemployer'?s? (nic|ni|national insurance)\b/g, "employer secondary national insurance"],
  [/\bemployee'?s? (nic|ni|national insurance)\b/g, "employee primary national insurance"],
  [/\bs\.? ?455\b/g, "loans participators s455"],
  [/\bhigher rate threshold\b/g, "higher rate starts"],
  [/\bmileage\b|\bamap\b/g, "approved mileage allowance payments"],
  [/\bnic\b|\bni\b/g, "national insurance class"],
  [/\bcgt\b/g, "capital gains"],
  [/\biht\b/g, "inheritance"],
  [/\bct\b/g, "corporation"],
  [/\bfrs\b(?! ?10)/g, "flat scheme"],
  [/\bvat registration\b|\bregister for vat\b/g, "vat registration"],
];

const stem = (w: string) => w.replace(/ies$/, "y").replace(/(?<!s)s$/, "");
const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/\d{4}\/\d{2}/g, " ")
    .replace(/[^a-z0-9&]+/g, " ")
    .split(" ")
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);

/** Questions that are after a figure rather than an explanation. */
export const asksForFigure = (q: string) => /\b(rates?|threshold|allowance|limit|band|amount|how much|what is|what's|whats|figure|percentage|cap|minimum|maximum|pay|wage|exempt)\b|%|£/i.test(q);

/** The part of a label that names the figure ("Registration threshold" from "Registration threshold (taxable turnover…)"). */
const core = (label: string) => label.split(/\s+[—–]\s+|\s*\(/)[0];

/**
 * Items whose core label words are all (or nearly all) in the question, using the section title as context:
 * "VAT registration threshold" matches VAT's "Registration threshold". A single shared word never matches alone.
 */
export function matchRates(question: string, year: TaxYearRates, max = 3): { item: RateItem; section: string }[] {
  if (!asksForFigure(question)) return [];
  let q = question.toLowerCase();
  for (const [re, to] of SYNONYMS) q = q.replace(re, ` ${to} `);
  const qw = new Set(words(q));
  const scored = year.sections.flatMap((s) => {
    const sectionWords = new Set(words(`${s.title} ${s.id.replace(/-/g, " ")}`));
    return s.items.map((item) => {
      const label = [...new Set(words(core(item.label)))];
      const hit = label.filter((w) => qw.has(w)).length;
      const context = [...sectionWords].filter((w) => qw.has(w) && !label.includes(w)).length;
      // Tie-break on the rest of the label ("Flat Rate Scheme — limited cost trader rate").
      const detail = words(item.label).filter((w) => qw.has(w)).length;
      return { item, section: s.title, hit, detail, total: hit + Math.min(context, 1), coverage: label.length ? hit / label.length : 0 };
    });
  });
  return scored
    .filter((x) => x.hit >= 1 && x.total >= 2 && x.coverage >= 0.66)
    .sort((a, b) => b.coverage - a.coverage || b.detail - a.detail || b.total - a.total)
    .slice(0, max)
    .map(({ item, section }) => ({ item, section }));
}
