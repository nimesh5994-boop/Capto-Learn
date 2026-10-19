/*
 * Finds references to UK tax and company statute in answer text ("CTA 2010 s455", "s455 CTA 2010",
 * "Sch 36 FA 2008", "CTA10/S464ZA", "section 3 VATA 1994") and turns each into a legislation.gov.uk link,
 * so readers can go straight to the provision. Pure, so it's unit-tested.
 */

interface Act {
  id: string; // legislation.gov.uk type/year/number
  name: string;
  /** Ways the Act is written, lower case, without spaces collapsed. */
  forms: string[];
}

const ACTS: Act[] = [
  { id: "ukpga/1994/23", name: "VATA 1994", forms: ["vata 1994", "vata94", "value added tax act 1994"] },
  { id: "ukpga/2003/1", name: "ITEPA 2003", forms: ["itepa 2003", "itepa03", "income tax (earnings and pensions) act 2003"] },
  { id: "ukpga/2005/5", name: "ITTOIA 2005", forms: ["ittoia 2005", "ittoia05", "income tax (trading and other income) act 2005"] },
  { id: "ukpga/2007/3", name: "ITA 2007", forms: ["ita 2007", "ita07", "income tax act 2007"] },
  { id: "ukpga/2009/4", name: "CTA 2009", forms: ["cta 2009", "cta09", "corporation tax act 2009"] },
  { id: "ukpga/2010/4", name: "CTA 2010", forms: ["cta 2010", "cta10", "corporation tax act 2010"] },
  { id: "ukpga/2001/2", name: "CAA 2001", forms: ["caa 2001", "caa01", "capital allowances act 2001"] },
  { id: "ukpga/1992/12", name: "TCGA 1992", forms: ["tcga 1992", "tcga92", "taxation of chargeable gains act 1992"] },
  { id: "ukpga/1984/51", name: "IHTA 1984", forms: ["ihta 1984", "ihta84", "inheritance tax act 1984"] },
  { id: "ukpga/1970/9", name: "TMA 1970", forms: ["tma 1970", "tma70", "taxes management act 1970"] },
  { id: "ukpga/1992/4", name: "SSCBA 1992", forms: ["sscba 1992", "sscba92", "social security contributions and benefits act 1992"] },
  { id: "ukpga/2006/46", name: "CA 2006", forms: ["ca 2006", "ca06", "companies act 2006"] },
  { id: "ukpga/2008/30", name: "PA 2008", forms: ["pensions act 2008"] },
  { id: "ukpga/2002/29", name: "POCA 2002", forms: ["poca 2002", "proceeds of crime act 2002"] },
  { id: "ukpga/2023/56", name: "ECCTA 2023", forms: ["eccta 2023", "economic crime and corporate transparency act 2023"] },
  { id: "ukpga/2004/12", name: "FA 2004", forms: ["fa 2004", "fa04", "finance act 2004"] },
  { id: "ukpga/2007/11", name: "FA 2007", forms: ["fa 2007", "fa07", "finance act 2007"] },
  { id: "ukpga/2008/9", name: "FA 2008", forms: ["fa 2008", "fa08", "finance act 2008"] },
  { id: "ukpga/2009/10", name: "FA 2009", forms: ["fa 2009", "fa09", "finance act 2009"] },
];

export interface StatuteRef {
  /** e.g. "CTA 2010 s455" or "FA 2008 Sch 36". */
  label: string;
  url: string;
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s*");
const ACT_RE = ACTS.flatMap((a) => a.forms).sort((x, y) => y.length - x.length).map(esc).join("|");
const PROV = String.raw`(s{1,2}\.?|sections?|sch\.?|schedule|para\.?)\s*(\d+[A-Z]{0,3})`;
// "CTA 2010 s455" / "CTA10/S464ZA" / "Companies Act 2006, section 197"
const ACT_FIRST = new RegExp(String.raw`\b(${ACT_RE})\s*(?:,|/)?\s*${PROV}`, "gi");
// "s455 CTA 2010" / "section 3 of VATA 1994" / "Sch 36 FA 2008"
const PROV_FIRST = new RegExp(String.raw`\b${PROV}\s*(?:of\s+(?:the\s+)?|,\s*)?(${ACT_RE})\b`, "gi");

function actFor(text: string): Act | undefined {
  const t = text.toLowerCase().replace(/\s+/g, " ").trim();
  const squashed = t.replace(/\s/g, "");
  return ACTS.find((a) => a.forms.some((f) => f === t || f.replace(/\s/g, "") === squashed));
}

function build(act: Act, kind: string, num: string): StatuteRef | null {
  const k = kind.toLowerCase();
  if (k.startsWith("para")) return null; // a paragraph needs its schedule to be linkable
  const schedule = k.startsWith("sch");
  const n = num.toUpperCase();
  return {
    label: `${act.name} ${schedule ? `Sch ${n}` : `s${n}`}`,
    url: `https://www.legislation.gov.uk/${act.id}/${schedule ? "schedule" : "section"}/${n}`,
  };
}

/** All the text of an answer that might cite statute: the answer itself and the quotations behind it. */
export function answerText(a: { shortAnswer: string; points: { heading: string; text: string; citations: { quote: string }[] }[]; steps?: { text: string; citations: { quote: string }[] }[]; caveats: string[]; example?: { body: string } | null }): string {
  return [a.shortAnswer, ...a.points.flatMap((p) => [p.heading, p.text, ...p.citations.map((c) => c.quote)]), ...(a.steps ?? []).flatMap((s) => [s.text, ...s.citations.map((c) => c.quote)]), ...a.caveats, a.example?.body ?? ""].join("\n");
}

/** Every distinct statute reference in the text, in order of first appearance. */
export function findStatuteRefs(text: string): StatuteRef[] {
  const found: { at: number; ref: StatuteRef }[] = [];
  for (const m of text.matchAll(ACT_FIRST)) {
    const act = actFor(m[1]);
    const ref = act && build(act, m[2], m[3]);
    if (ref) found.push({ at: m.index ?? 0, ref });
  }
  for (const m of text.matchAll(PROV_FIRST)) {
    const act = actFor(m[3]);
    const ref = act && build(act, m[1], m[2]);
    if (ref) found.push({ at: m.index ?? 0, ref });
  }
  const seen = new Set<string>();
  return found
    .sort((a, b) => a.at - b.at)
    .map((f) => f.ref)
    .filter((r) => (seen.has(r.url) ? false : (seen.add(r.url), true)));
}
