/*
 * Parsing legislation.gov.uk's Crown Legislation Markup Language (CLML) — pure, unit-tested.
 * Contents documents (…/contents/data.xml) list an Act's provisions; provision documents
 * (…/section/24/data.xml) hold the consolidated text.
 */

export interface Provision {
  /** Canonical https URL of the provision, e.g. https://www.legislation.gov.uk/ukpga/1994/23/section/24 */
  url: string;
  /** "s 24", "Sch 8", "reg 29", "art 5" */
  label: string;
  title: string;
}

export interface ParsedContents {
  title: string;
  modified: string | null;
  provisions: Provision[];
}

const ENT: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1]?.toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENT[e.toLowerCase()] ?? m;
  });
const textOf = (xml: string) => decode(xml.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const LABEL: Record<string, string> = { section: "s", schedule: "Sch", regulation: "reg", article: "art", rule: "r" };

/** Leaf provisions only: sections/regulations/articles/rules, and whole schedules (not their parts). */
const PROVISION_PATH = /\/(section|regulation|article|rule|schedule)\/([0-9]+[A-Z]*)$/i;

export function canonicalLegislationUrl(uri: string): string {
  return uri.replace(/^https?:\/\/(www\.)?legislation\.gov\.uk/i, "https://www.legislation.gov.uk").replace(/\/(data\.xml|contents)$/i, "").replace(/\/$/, "");
}

/** "schedule/24" matches that schedule; "section/149-284" matches a numeric range of sections. */
export function matchesOnly(url: string, only: string): boolean {
  const range = only.match(/^(section|regulation|article|schedule)\/(\d+)-(\d+)$/);
  if (!range) return url.endsWith(`/${only}`) || url.includes(`/${only}/`);
  const m = url.match(new RegExp(`/${range[1]}/(\\d+)[A-Z]*$`, "i"));
  if (!m) return false;
  const n = Number(m[1]);
  return n >= Number(range[2]) && n <= Number(range[3]);
}

export function parseContents(xml: string, only?: string[]): ParsedContents {
  const title = textOf(xml.match(/<dc:title>([\s\S]*?)<\/dc:title>/)?.[1] ?? "") || textOf(xml.match(/<ContentsTitle>([\s\S]*?)<\/ContentsTitle>/)?.[1] ?? "");
  const modified = xml.match(/<dc:modified>([^<]+)<\/dc:modified>/)?.[1]?.trim() ?? null;
  const provisions: Provision[] = [];
  const seen = new Set<string>();
  // Each Contents* element carries DocumentURI plus nested ContentsNumber / ContentsTitle.
  const re = /<(ContentsItem|ContentsSchedule)\b([^>]*)>([\s\S]*?)<\/\1>/g;
  for (const m of xml.matchAll(re)) {
    const uri = m[2].match(/DocumentURI="([^"]+)"/)?.[1];
    if (!uri) continue;
    const url = canonicalLegislationUrl(uri);
    const p = url.match(PROVISION_PATH);
    if (!p || seen.has(url)) continue;
    if (only && !only.some((o) => matchesOnly(url, o))) continue;
    seen.add(url);
    const inner = m[3].replace(/<(ContentsItem|ContentsSchedule|ContentsPart|ContentsPblock)\b[\s\S]*$/, ""); // own number/title only
    const num = textOf(inner.match(/<ContentsNumber>([\s\S]*?)<\/ContentsNumber>/)?.[1] ?? "") || p[2];
    const ttl = textOf(inner.match(/<ContentsTitle>([\s\S]*?)<\/ContentsTitle>/)?.[1] ?? "");
    const kind = p[1].toLowerCase();
    provisions.push({ url, label: `${LABEL[kind] ?? kind} ${num.replace(/^(Schedule|SCHEDULE)\s*/i, "")}`.trim(), title: ttl.replace(/\.$/, "") });
  }
  return { title, modified, provisions };
}

/**
 * Consolidated text of a provision as plain paragraphs. Drops metadata, footnote/commentary blocks and editorial
 * markers, keeps numbering ("(1)", "(a)") at the start of each paragraph.
 */
export function clmlToText(xml: string): { title: string; text: string; modified: string | null } {
  const modified = xml.match(/<dc:modified>([^<]+)<\/dc:modified>/)?.[1]?.trim() ?? null;
  const body = xml
    .replace(/<ukm:Metadata[\s\S]*?<\/ukm:Metadata>/g, "")
    .replace(/<Commentaries[\s\S]*?<\/Commentaries>/g, "")
    .replace(/<CommentaryRef[^>]*\/>/g, "")
    .replace(/<Contents\b[\s\S]*?<\/Contents>/g, "");
  const title = textOf(body.match(/<Title>([\s\S]*?)<\/Title>/)?.[1] ?? "");
  const text = decode(
    body
      .replace(/<(Pnumber)[^>]*>([\s\S]*?)<\/\1>/g, (_m, _t, n) => `\n\n(${textOf(n).replace(/^\(|\)$/g, "")}) `)
      .replace(/<\/(P1|P2|P3|P4|P|Text|Title|BlockAmendment|Tabular|Row)>/g, "\n\n")
      .replace(/<[^>]+>/g, " ")
  )
    .split(/\n{2,}/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
  return { title, text, modified };
}
