/*
 * Finds references to court and tribunal decisions in text ("Norseman Gold PLC v HMRC [2016] UKUT 69 (TCC)",
 * "McKnight v Sheppard [1999] 71 TC 419", "Best Images Ltd [2010] UKFTT TC00480") and gives each a link to
 * The National Archives' Find Case Law. Pure (no database, no network), so it's unit-tested.
 *
 * Licensing: Find Case Law content is under the Open Justice Licence, which does not permit computational
 * analysis without a separate licence. So this module never fetches anything: a judgment link is built from
 * the neutral citation alone (Find Case Law's documented court/year/number scheme), and anything we can't
 * build with confidence becomes a link to Find Case Law's own search page for the reader to click.
 *
 * Court codes and coverage years come from Find Case Law's published court registry (ds-caselaw-utils
 * court_names.yaml): e.g. UKUT (TCC) is `ukut/tcc` from 2016, UKFTT (TC) is `ukftt/tc` from 2019.
 */

export type LinkKind = "judgment" | "search";

export const FCL_BASE = "https://caselaw.nationalarchives.gov.uk";

interface CourtDef {
  /** Display label, e.g. "Upper Tribunal (Tax and Chancery)". */
  label: string;
  /** Find Case Law URL path, when Find Case Law publishes this court under it. */
  fcl?: string;
  /** First year Find Case Law holds this court's judgments (also set, without `fcl`, where the division is unknown). */
  from?: number;
  /** A court Find Case Law doesn't cover at all (Scotland, Northern Ireland). */
  outside?: string;
}

/** Keyed by the court code we store (as written in a neutral citation, division in brackets). */
export const COURTS: Record<string, CourtDef> = {
  UKSC: { label: "Supreme Court", fcl: "uksc", from: 2009 },
  UKPC: { label: "Privy Council", fcl: "ukpc", from: 2009 },
  UKHL: { label: "House of Lords" },
  "EWCA Civ": { label: "Court of Appeal (Civil Division)", fcl: "ewca/civ", from: 2001 },
  "EWCA Crim": { label: "Court of Appeal (Criminal Division)", fcl: "ewca/crim", from: 2003 },
  EWCA: { label: "Court of Appeal", from: 2001 },
  "EWHC (Ch)": { label: "High Court (Chancery Division)", fcl: "ewhc/ch", from: 2003 },
  "EWHC (Admin)": { label: "High Court (Administrative Court)", fcl: "ewhc/admin", from: 2003 },
  "EWHC (Comm)": { label: "High Court (Commercial Court)", fcl: "ewhc/comm", from: 2003 },
  "EWHC (KB)": { label: "High Court (King's Bench Division)", fcl: "ewhc/kb", from: 2003 },
  "EWHC (QB)": { label: "High Court (Queen's Bench Division)", fcl: "ewhc/qb", from: 2003 },
  "EWHC (TCC)": { label: "High Court (Technology and Construction Court)", fcl: "ewhc/tcc", from: 2003 },
  "EWHC (Fam)": { label: "High Court (Family Division)", fcl: "ewhc/fam", from: 2003 },
  "EWHC (Pat)": { label: "High Court (Patents Court)", fcl: "ewhc/pat", from: 2003 },
  "EWHC (IPEC)": { label: "Intellectual Property Enterprise Court", fcl: "ewhc/ipec", from: 2013 },
  "EWHC (SCCO)": { label: "Senior Courts Costs Office", fcl: "ewhc/scco", from: 2003 },
  "EWHC (Admlty)": { label: "High Court (Admiralty Court)", fcl: "ewhc/admlty", from: 2003 },
  "EWHC (BP)": { label: "High Court (Business and Property Division)", fcl: "ewhc/bp", from: 2026 },
  EWHC: { label: "High Court", from: 2003 },
  "UKUT (TCC)": { label: "Upper Tribunal (Tax and Chancery)", fcl: "ukut/tcc", from: 2016 },
  "UKUT (LC)": { label: "Upper Tribunal (Lands Chamber)", fcl: "ukut/lc", from: 2014 },
  "UKUT (AAC)": { label: "Upper Tribunal (Administrative Appeals)", fcl: "ukut/aac", from: 2011 },
  "UKUT (IAC)": { label: "Upper Tribunal (Immigration and Asylum)", fcl: "ukut/iac", from: 2007 },
  UKUT: { label: "Upper Tribunal", from: 2016 },
  "UKFTT (TC)": { label: "First-tier Tribunal (Tax)", fcl: "ukftt/tc", from: 2019 },
  "UKFTT (GRC)": { label: "First-tier Tribunal (General Regulatory)", fcl: "ukftt/grc", from: 2019 },
  UKFTT: { label: "First-tier Tribunal", from: 2019 },
  EAT: { label: "Employment Appeal Tribunal", fcl: "eat", from: 2021 },
  UKSPC: { label: "Special Commissioners" },
  UKVAT: { label: "VAT and Duties Tribunal" },
  CSIH: { label: "Court of Session (Inner House)", outside: "Scottish courts" },
  CSOH: { label: "Court of Session (Outer House)", outside: "Scottish courts" },
  NICA: { label: "Court of Appeal in Northern Ireland", outside: "Northern Ireland courts" },
  NIQB: { label: "High Court in Northern Ireland", outside: "Northern Ireland courts" },
};

/**
 * Find Case Law gives documents received from April 2025 onwards new-style addresses ("d-…") instead of
 * court/year/number, so from 2025 we link to a search for the citation rather than guess the address.
 */
const LAST_PREDICTABLE_YEAR = 2024;

export type CitationKind = "neutral" | "tcnum" | "spc" | "vtd" | "report";

export interface Citation {
  kind: CitationKind;
  /** As we display it, e.g. "[2016] UKUT 69 (TCC)", "(1999) 71 TC 419", "TC07022". */
  text: string;
  /** Normalised for matching; division left out of neutral citations (UKUT/EWHC/UKFTT numbers run across chambers). */
  key: string;
  year: number | null;
  /** Court code (a COURTS key) for neutral citations and the tribunal-numbered forms. */
  court?: string;
  /** Neutral citation number. */
  number?: number;
}

export interface CaseRef {
  /** Unique, normalised: the primary citation's key. */
  key: string;
  /** "X v Y" as written, or null when the source gives only a citation. */
  name: string | null;
  citations: string[];
  year: number | null;
  court: string | null;
  url: string;
  linkKind: LinkKind;
}

/* ─────────────────────────────── Citations ─────────────────────────────── */

const Y = String.raw`[\[(]\s*((?:19|20)\d\d)\s*[\])]\s*`;
const EWHC_DIV = "Ch|Admin|Comm|KB|QB|TCC|Fam|Pat|IPEC|SCCO|Admlty|BP";
const SERIES = String.raw`STC\s*\(\s*SCD\s*\)|STC|SFTD|ATC|TC|AC|WLR|All\s?ER|AER|QB|KB|Ch|BTC|BVC|VATTR|ICR|IRLR|WTLR`;

type Builder = (m: RegExpMatchArray) => Citation | null;

const neutral = (year: number, court: string, n: number, written: string): Citation => ({
  kind: "neutral",
  text: `[${year}] ${written}`,
  key: `[${year}] ${court.replace(/\s*\(.*$/, "").toLowerCase()} ${n}`,
  year,
  court,
  number: n,
});

/** In priority order: where two patterns match at the same place, the earlier one wins. */
const PATTERNS: { re: RegExp; build: Builder }[] = [
  {
    re: new RegExp(String.raw`${Y}(UKSC|UKPC|UKHL|CSIH|CSOH|NICA|NIQB|EAT)\s*(\d{1,4})\b`, "g"),
    build: (m) => neutral(+m[1], m[2], +m[3], `${m[2]} ${+m[3]}`),
  },
  {
    re: new RegExp(String.raw`${Y}EWCA\s*(Civ|Crim)?\.?\s*(\d{1,4})\b`, "g"),
    build: (m) => (m[2] ? neutral(+m[1], `EWCA ${m[2]}`, +m[3], `EWCA ${m[2]} ${+m[3]}`) : neutral(+m[1], "EWCA", +m[3], `EWCA ${+m[3]}`)),
  },
  {
    re: new RegExp(String.raw`${Y}EWHC\s*(\d{1,4})\s*(?:\(\s*(${EWHC_DIV})\s*\)|(${EWHC_DIV})\b)?`, "g"),
    build: (m) => {
      const div = m[3] ?? m[4];
      return div ? neutral(+m[1], `EWHC (${div})`, +m[2], `EWHC ${+m[2]} (${div})`) : neutral(+m[1], "EWHC", +m[2], `EWHC ${+m[2]}`);
    },
  },
  {
    re: new RegExp(String.raw`${Y}UK\s?UT\s*(\d{1,4})\s*(?:\(\s*(TCC|LC|AAC|IAC)\s*\)|(TCC|LC|AAC|IAC)\b)?`, "g"),
    build: (m) => {
      const ch = m[3] ?? m[4];
      return ch ? neutral(+m[1], `UKUT (${ch})`, +m[2], `UKUT ${+m[2]} (${ch})`) : neutral(+m[1], "UKUT", +m[2], `UKUT ${+m[2]}`);
    },
  },
  {
    // First-tier Tribunal decision numbers: "[2019] TC07022", "[2010] UKFTT TC00480", "(TC 01234)".
    re: new RegExp(String.raw`(?:${Y}(?:UK\s?FTT\s*)?\(?\s*)?\bTC\s?(\d{5})\b\)?`, "g"),
    build: (m) => ({ kind: "tcnum", text: `TC${m[2]}`, key: `tc${m[2]}`, year: m[1] ? +m[1] : null, court: "UKFTT (TC)" }),
  },
  {
    re: new RegExp(String.raw`${Y}UK\s?FTT\s*(\d{1,4})\s*(?:\(\s*(TC|GRC)\s*\)|(TC|GRC)\b)?`, "g"),
    build: (m) => {
      const ch = m[3] ?? m[4];
      return ch ? neutral(+m[1], `UKFTT (${ch})`, +m[2], `UKFTT ${+m[2]} (${ch})`) : neutral(+m[1], "UKFTT", +m[2], `UKFTT ${+m[2]}`);
    },
  },
  {
    // Special Commissioners: "[2002] SpC306", "(2005) Sp C 495", "[2006] UKSPC SPC00574", "[2006] UKSPC 521".
    re: new RegExp(String.raw`(?:${Y}(?:UKSPC\s*)?\(?\s*)?\bS[Pp]\s?C\s?(\d{2,5})\b\)?|${Y}UKSPC\s*(\d{2,5})\b`, "g"),
    build: (m) => {
      const n = +(m[2] ?? m[4]);
      const year = m[1] ?? m[3];
      return { kind: "spc", text: `SpC ${n}`, key: `spc${n}`, year: year ? +year : null, court: "UKSPC" };
    },
  },
  {
    re: /\bVTD\s?(\d{3,5})\b/g,
    build: (m) => ({ kind: "vtd", text: `VTD ${+m[1]}`, key: `vtd${+m[1]}`, year: null, court: "UKVAT" }),
  },
  {
    // Law reports: "[2005] STC 65", "[1983] 1 WLR 256", "(1928) 13 TC 486", "[1999] 71TC419", "[2004] STC (SCD) 467".
    re: new RegExp(String.raw`${Y}(?:(\d{1,3})\s*)?(${SERIES})\s*(\d{1,5})\b`, "g"),
    build: (m) => {
      const year = +m[1];
      const vol = m[2] ? +m[2] : null;
      const series = m[3].replace(/\s+/g, " ").replace(/^AER$|^All ?ER$/, "All ER").replace(/STC \( ?SCD ?\)|STC\(SCD\)/, "STC (SCD)");
      const page = +m[4];
      // Tax Cases (TC/ATC) are cited by volume; the bracketed year is just the decision year.
      if (/^A?TC$/.test(series)) {
        if (!vol) return null;
        return { kind: "report", text: `(${year}) ${vol} ${series} ${page}`, key: `${vol} ${series.toLowerCase()} ${page}`, year };
      }
      const body = `${vol ? `${vol} ` : ""}${series} ${page}`;
      return { kind: "report", text: `[${year}] ${body}`, key: `[${year}] ${body.toLowerCase()}`, year, court: /SCD/.test(series) ? "UKSPC" : series === "VATTR" ? "UKVAT" : undefined };
    },
  },
];

interface Found {
  at: number;
  end: number;
  cite: Citation;
}

function findCitations(text: string): Found[] {
  const all: (Found & { pri: number })[] = [];
  PATTERNS.forEach((p, pri) => {
    for (const m of text.matchAll(p.re)) {
      const cite = p.build(m);
      if (cite) all.push({ at: m.index ?? 0, end: (m.index ?? 0) + m[0].length, cite, pri });
    }
  });
  // Overlaps: the match starting first wins; then the longer; then the higher-priority pattern.
  all.sort((a, b) => a.at - b.at || b.end - a.end || a.pri - b.pri);
  const out: Found[] = [];
  for (const f of all) if (!out.length || f.at >= out[out.length - 1].end) out.push(f);
  return out;
}

/* ─────────────────────────────── Case names ─────────────────────────────── */

const CONNECTORS = new Set(["of", "and", "the", "for", "de", "du", "la", "le", "van", "von", "der", "den", "des", "da", "di", "&", "another", "others", "anor", "ors", "ex", "parte", "t/a", "y"]);
/** Sentence words that can sit just before a name: dropped from the front of party one. */
const LEADING = new Set(
  "in see also following applying applied per cf as and but case cases decision decisions judgment judgement under unlike like whilst while both then thus so after before since note compare similarly however here where when if this that these those it its although though eg e.g. e.g i.e. ie example for of from by to on at with held law uk".split(" ")
);
const SUFFIX = new Set(["ltd", "limited", "plc", "llp", "llc", "inc", "co", "company", "sa", "nv", "bv", "ag", "gmbh", "trust", "trustees", "council", "society", "partnership", "bank", "university", "college", "association", "foundation", "club", "holdings", "corporation", "corp", "hotels", "hotel"]);

const TOKEN_RE = /\([^()]{0,90}\)|[^\s()]+/g;
const isParen = (t: string) => t.startsWith("(") && t.endsWith(")");
// Square brackets are editorial insertions ("Strong & Co [of Romsey]"); * and _ are markdown emphasis.
const bare = (t: string) => t.replace(/[[\]*_]/g, "").replace(/^[‘'"“]+|[’'"”.,]+$/g, "");
const isNamey = (t: string) => isParen(t) || /^[A-Z0-9]/.test(bare(t)) || CONNECTORS.has(bare(t).toLowerCase()) || /^(plc|ltd|llp|co)$/.test(bare(t));

/** The party name that ends at the end of `s`, read backwards word by word. */
function partyBefore(s: string, maxTokens = 10): string[] {
  const tokens = s.match(TOKEN_RE) ?? [];
  const out: string[] = [];
  for (let i = tokens.length - 1; i >= 0 && out.length < maxTokens; i--) {
    const t = tokens[i];
    if (i < tokens.length - 1 && /[,;:]$/.test(t) && !isParen(t)) break; // a list or clause boundary
    if (!isNamey(t) || /^\d{2,}$/.test(bare(t))) break; // a page or year number belongs to an earlier citation
    out.unshift(t);
  }
  while (out.length && (LEADING.has(bare(out[0]).toLowerCase()) || /^[\d.]+$/.test(bare(out[0])) ||(CONNECTORS.has(bare(out[0]).toLowerCase()) && bare(out[0]) !== "The"))) out.shift();
  if (out.length > 1 && bare(out[0]) === "The" && /^[a-z]/.test(bare(out[1]))) out.shift();
  return out.length && /^[A-Z0-9]/.test(bare(out[0])) ? out : [];
}

function tidy(s: string): string {
  let t = s.replace(/[[\]*_]/g, "").replace(/\s+/g, " ").trim().replace(/[\s,;:.–—-]+$/, "");
  // Drop an unbalanced trailing bracket left by a cut.
  while ((t.match(/\(/g)?.length ?? 0) > (t.match(/\)/g)?.length ?? 0)) t = t.replace(/\s*\([^()]*$/, "").trim();
  return t;
}

/** The case name directly in front of a citation, or null. Conservative: "X v Y", "Re X", or "X Ltd". */
export function nameBefore(textBefore: string): string | null {
  const line = textBefore.slice(textBefore.lastIndexOf("\n") + 1).slice(-260);
  const s = line.replace(/[\s(\[,;:–—-]+$/, "");
  if (!s) return null;
  const vs = [...s.matchAll(/\s(?:v|vs|v\.)\s/g)].pop();
  if (vs && vs.index !== undefined) {
    const second = s.slice(vs.index + vs[0].length);
    const secondTokens = second.match(TOKEN_RE) ?? [];
    if (secondTokens.length >= 1 && secondTokens.length <= 14 && secondTokens.every(isNamey) && /^[A-Z0-9]/.test(bare(secondTokens[0] ?? ""))) {
      const first = partyBefore(s.slice(0, vs.index));
      if (first.length) return tidy(`${first.join(" ")} v ${second}`);
    }
    return null;
  }
  const party = partyBefore(s, 12);
  if (!party.length) return null;
  if (bare(party[0]) === "Re" && party.length >= 2) return tidy(party.join(" "));
  if (SUFFIX.has(bare(party[party.length - 1]).toLowerCase()) && party.length >= 2) return tidy(party.join(" "));
  return null;
}

/** Normalised case name for matching the same case written different ways. */
export function normaliseName(name: string): string {
  return ` ${name.toLowerCase()} `
    .replace(/\((?:hm )?inspector of taxes\)|\(officer of the board\)|\(vo\)|\(valuation officer\)/g, " ")
    .replace(/[‘’]/g, "'")
    .replace(/&/g, " and ")
    .replace(
      /\b(?:the )?(?:commissioners (?:for|of) (?:her|his) majesty's revenue and customs|commissioners for hm revenue and customs|(?:her|his) majesty's revenue and customs|hm revenue and customs commissioners|hm revenue and customs|revenue and customs commissioners|revenue and customs commrs|r and c commrs|r and c commissioners|hmrc commissioners|hmrc|commissioners of inland revenue|inland revenue commissioners|inland revenue|cir|irc|commissioners of customs and excise|customs and excise commissioners|c and e commrs|c and e commissioners)\b/g,
      " revenue "
    )
    .replace(/\blimited\b/g, "ltd")
    .replace(/\bpublic ltd company\b/g, "plc")
    .replace(/\b(the|and another|and others)\b/g, " ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ─────────────────────────────── Extraction & merging ─────────────────────────────── */

export interface RawCaseRef {
  name: string | null;
  citations: Citation[];
  /** Position in the text, for ordering. */
  at: number;
}

/** Citations sitting together ("[1974] STC 142; [1975] QB 465") are one case. */
const JOINER = /^[\s,;:&()]*(?:and|or)?[\s,;:&()]*$/;

/**
 * Whether a citation adds to a run already describing one decision. Law reports are parallel citations of the
 * same decision; two court/tribunal numbers are two decisions ("SpC 239, SpC 240"; an appeal chain), except a
 * First-tier Tribunal neutral citation alongside its TC number.
 */
function sameDecision(run: Citation[], next: Citation): boolean {
  if (next.kind === "report") return true;
  const numbered = run.filter((c) => c.kind !== "report");
  if (!numbered.length) return true;
  const pair = [...numbered, next];
  return pair.length === 2 && pair.some((c) => c.kind === "tcnum") && pair.some((c) => c.kind === "neutral" && c.court?.startsWith("UKFTT"));
}

/** Every case mention in the text: a run of adjacent citations plus the name directly before it (if any). */
export function extractCaseMentions(text: string): RawCaseRef[] {
  const found = findCitations(text);
  const out: RawCaseRef[] = [];
  let i = 0;
  while (i < found.length) {
    const start = found[i];
    const cites = [start.cite];
    let j = i + 1;
    while (j < found.length) {
      const gap = text.slice(found[j - 1].end, found[j].at);
      if (gap.length > 8 || !JOINER.test(gap) || !sameDecision(cites, found[j].cite)) break;
      cites.push(found[j].cite);
      j++;
    }
    // Look back no further than the previous citation, so its text never leaks into this name.
    const from = Math.max(0, start.at - 300, i > 0 ? found[i - 1].end : 0);
    const name = nameBefore(text.slice(from, start.at));
    // Keep a mention only when it identifies a decision on its own: a name, or a tribunal/court number.
    if (name || cites.some((c) => c.kind !== "report")) out.push({ name, citations: cites, at: start.at });
    i = j;
  }
  return out;
}

const KIND_ORDER: Record<CitationKind, number> = { neutral: 0, tcnum: 1, spc: 2, vtd: 3, report: 4 };

/** Find Case Law link for a case: the judgment itself when its address is predictable, otherwise a search. */
export function fclSearchUrl(query: string): string {
  return `${FCL_BASE}/search?query=${encodeURIComponent(query)}`;
}

export function fclJudgmentUrl(c: Citation): string | null {
  if (c.kind !== "neutral" || !c.court || !c.year || !c.number) return null;
  const court = COURTS[c.court];
  if (!court?.fcl || !court.from || c.year < court.from || c.year > LAST_PREDICTABLE_YEAR) return null;
  return `${FCL_BASE}/${court.fcl}/${c.year}/${c.number}`;
}

/** A short note on whether Find Case Law is likely to hold the judgment (null when we link straight to it). */
export function coverageNote(court: string | null, year: number | null, linkKind: LinkKind): string | null {
  if (linkKind === "judgment") return null;
  const def = court ? COURTS[court] : undefined;
  if (def?.outside) return `${def.outside} aren't on Find Case Law`;
  if (def?.from && year && year >= def.from) return null; // covered, just not a predictable address
  return "May not be on Find Case Law";
}

/** Picks the link, court and year for a group of citations naming one case. */
export function linkFor(name: string | null, citations: Citation[]): { url: string; linkKind: LinkKind; court: string | null; year: number | null; primary: Citation } {
  const sorted = [...citations].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
  const primary = sorted[0];
  const judgment = sorted.map(fclJudgmentUrl).find(Boolean);
  const years = citations.map((c) => c.year).filter((y): y is number => y !== null);
  const year = primary.year ?? (years.length ? Math.min(...years) : null);
  const court = primary.court ?? citations.find((c) => c.court)?.court ?? null;
  if (judgment) return { url: judgment, linkKind: "judgment", court, year, primary };
  // Search by neutral citation where Find Case Law holds that court for that year; otherwise by name.
  const def = primary.court ? COURTS[primary.court] : undefined;
  const citable = primary.kind === "neutral" && !!def?.from && !!primary.year && primary.year >= def.from;
  const query = citable || !name ? primary.text : name;
  return { url: fclSearchUrl(query), linkKind: "search", court, year, primary };
}

/**
 * Merges mentions of the same case: mentions sharing a citation, or with the same normalised name and year.
 * Returns one CaseRef per case plus, for each, the indexes of the mentions that make it up.
 */
export function mergeCaseMentions(mentions: RawCaseRef[]): { ref: CaseRef; members: number[] }[] {
  const parent = mentions.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[Math.max(ra, rb)] = Math.min(ra, rb);
  };
  const byKey = new Map<string, number>();
  mentions.forEach((m, i) => {
    const keys = m.citations.map((c) => c.key);
    if (m.name) {
      const years = m.citations.map((c) => c.year).filter((y): y is number => y !== null);
      if (years.length) keys.push(`name:${normaliseName(m.name)}|${Math.min(...years)}`);
    }
    for (const k of keys) {
      const prev = byKey.get(k);
      if (prev === undefined) byKey.set(k, i);
      else union(prev, i);
    }
  });
  const groups = new Map<number, number[]>();
  mentions.forEach((_, i) => {
    const r = find(i);
    groups.set(r, [...(groups.get(r) ?? []), i]);
  });
  const merged = [...groups.values()].map((members) => {
    // Citations: one per key, preferring the fullest form (e.g. with the chamber in brackets).
    const cites = new Map<string, Citation>();
    const names = new Map<string, number>();
    for (const i of members) {
      for (const c of mentions[i].citations) {
        const prev = cites.get(c.key);
        if (!prev || c.text.length > prev.text.length) cites.set(c.key, c);
      }
      const n = mentions[i].name;
      if (n) names.set(n, (names.get(n) ?? 0) + 1);
    }
    // Most-used way of writing the name; "X v Y" beats a bare company name.
    const name = [...names.entries()].sort((a, b) => Number(/ v /.test(b[0])) - Number(/ v /.test(a[0])) || b[1] - a[1] || a[0].length - b[0].length)[0]?.[0] ?? null;
    // The primary citation is the first one given in the first mention (keeps "the decision cited" in front).
    const first = mentions[members[0]].citations;
    const ordered = [...first.map((c) => cites.get(c.key)!), ...[...cites.values()].filter((c) => !first.some((f) => f.key === c.key))];
    const uniq = ordered.filter((c, k) => ordered.findIndex((x) => x.key === c.key) === k);
    const link = linkFor(name, uniq);
    const sortedForList = [link.primary, ...uniq.filter((c) => c.key !== link.primary.key).sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind])];
    return {
      ref: { key: link.primary.key, name, citations: sortedForList.map((c) => c.text), year: link.year, court: link.court, url: link.url, linkKind: link.linkKind },
      members,
      identified: !!name || uniq.some((c) => c.kind === "neutral"),
    };
  });
  // A bare tribunal number ("VTD 12184") with no name anywhere doesn't tell a reader which case it is.
  return merged.filter((g) => g.identified).map(({ ref, members }) => ({ ref, members }));
}

/** Every distinct case referred to in the text, in order of first appearance. */
export function findCaseRefs(text: string): CaseRef[] {
  const mentions = extractCaseMentions(text);
  return mergeCaseMentions(mentions)
    .sort((a, b) => mentions[a.members[0]].at - mentions[b.members[0]].at)
    .map((g) => g.ref);
}

/** Display name for a case: its name, or its first citation when the source gave none. */
export const caseTitle = (r: Pick<CaseRef, "name" | "citations">) => r.name ?? r.citations[0] ?? "Unnamed case";

/** Court filter options shown on /cases, in a sensible order. */
export const COURT_LABEL = (code: string | null) => (code ? (COURTS[code]?.label ?? code) : "Unknown court");
