/*
 * Verified figures as answer sources. Capto keeps a dataset of UK rates and allowances, each checked against an official
 * page on a recorded date. When a question asks for a figure the dataset holds, the matching entries go into the answer's
 * sources (ids V1, V2…), so the rate comes from checked data rather than from whichever guidance pages happened to be
 * retrieved. The text is quote-checked like any other source. Pure (the dataset is imported as data), so it's unit-tested.
 */
import { currentTaxYear, ratesFor } from "@/content/rates";
import { matchRates } from "@/content/rates/match";

export interface VerifiedRateSource {
  title: string;
  url: string;
  publisher: string;
  text: string;
}

/** Most entries added to one answer. */
const MAX_ENTRIES = 4;

/**
 * Verified entries matching a question, for its tax year (when the planner found one with data) and the current tax year,
 * so a question about last year's loan or this year's allowance each sees the right figure with its tax year stated.
 */
export function verifiedRateSources(question: string, planTaxYear: string, now: Date = new Date()): VerifiedRateSource[] {
  const years = [...new Set([planTaxYear, currentTaxYear(now)].filter(Boolean))];
  const out: VerifiedRateSource[] = [];
  for (const ty of years) {
    const data = ratesFor(ty);
    if (!data) continue;
    for (const { item, section } of matchRates(question, data, 3)) {
      out.push({
        title: `${item.label} (${data.taxYear})`,
        url: item.source.url,
        publisher: `Capto verified rates · ${data.taxYear} · checked against ${item.source.title} on ${data.checkedOn}`,
        text: `${section} — ${item.label} for ${data.taxYear}: ${item.value}${item.note ? `. ${item.note}` : ""}`,
      });
      if (out.length >= MAX_ENTRIES) return out;
    }
  }
  return out;
}
