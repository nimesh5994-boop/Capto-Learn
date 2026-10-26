/*
 * Verified rates for a planning scenario. Capto keeps a dataset of UK rates and allowances, each figure checked against
 * an official page on a recorded date. The report writer is given the sections relevant to the scenario, so a figure such
 * as the BADR limit or a dividend rate comes from checked data rather than from an unreviewed lesson or memory.
 * Pure (the dataset is imported as data), so it's unit-tested.
 */
import { ratesFor } from "@/content/rates";
import type { PlanningReport } from "./types";

type Pack = NonNullable<PlanningReport["ratesPack"]>;

/** Which dataset sections help with which topics. */
const TOPICS: { sections: string[]; re: RegExp }[] = [
  { sections: ["income-tax", "pensions"], re: /income tax|dividend|salary|remuneration|pension|annual allowance|personal allowance|higher.rate|basic.rate|additional.rate|spouse|rental|property income/i },
  { sections: ["scotland"], re: /scotland|scottish/i },
  { sections: ["nic"], re: /national insurance|\bNICs?\b|employer.?s? NI|salary|remuneration|director/i },
  { sections: ["cgt", "cgt-extra"], re: /capital gains|\bCGT\b|business asset disposal|\bBADR\b|incorporation relief|disposal|sale of|earn-?out|private residence/i },
  { sections: ["iht", "iht-extra"], re: /inheritance tax|\bIHT\b|nil.rate|agricultural|business property|potentially exempt|lifetime gift|trust|estate/i },
  { sections: ["corporation-tax", "business-ct-extra"], re: /corporation tax|company|director.?s loan|participator|\bs ?455\b|marginal relief|retained profits/i },
  { sections: ["sdlt"], re: /\bSDLT\b|stamp duty|property transfer|incorporat/i },
];

/** The verified figures for the sections a scenario touches, or null when the tax year has no verified data. */
export function buildRatesPack(taxYear: string, texts: string[], maxItems = 70): Pack | null {
  const year = ratesFor(taxYear);
  if (!year) return null;
  const hay = texts.join("\n");
  const wanted = new Set<string>();
  for (const t of TOPICS) if (t.re.test(hay)) for (const s of t.sections) wanted.add(s);
  if (!wanted.size) return null;
  const items: Pack["items"] = [];
  for (const s of year.sections) {
    if (!wanted.has(s.id)) continue;
    for (const i of s.items) items.push({ section: s.title, label: i.label, value: i.value, note: i.note, source: i.source.title, url: i.source.url });
  }
  if (!items.length) return null;
  return { taxYear: year.taxYear, checkedOn: year.checkedOn, items: items.slice(0, maxItems) };
}

/** The pack as text for the writer: one line per figure. */
export function ratesPackText(p: Pack): string {
  return p.items.map((i) => `- ${i.section} — ${i.label}: ${i.value}${i.note ? ` (${i.note})` : ""} [${i.source}]`).join("\n");
}
