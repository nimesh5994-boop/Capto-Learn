import "server-only";

/*
 * GOV.UK Search + Content APIs (open, no key, Open Government Licence). Covers HMRC internal manuals,
 * HMRC/Companies House/DBT guidance, VAT notices and rates pages — the bulk of what UK practices rely on.
 */

const BASE = "https://www.gov.uk";
const UA = "CaptoLearn/1.0 (+https://learn.chitta.cloud)";

export interface SearchHit {
  path: string;
  title: string;
  description: string;
  format: string;
  updatedAt: string | null;
}

type SearchFilter = "manuals" | "guidance" | "any";

const FILTERS: Record<SearchFilter, string> = {
  manuals: "&filter_format=hmrc_manual_section",
  guidance: "&filter_content_purpose_supergroup=guidance_and_regulation",
  any: "",
};

export async function searchGovUk(query: string, filter: SearchFilter, count = 6): Promise<SearchHit[]> {
  const url = `${BASE}/api/search.json?q=${encodeURIComponent(query)}&count=${count}${FILTERS[filter]}&fields=title,link,description,format,public_timestamp`;
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" }, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`GOV.UK search failed (${res.status})`);
  const json = (await res.json()) as { results?: { link: string; title: string; description?: string; format?: string; public_timestamp?: string }[] };
  return (json.results ?? [])
    .filter((r) => r.link?.startsWith("/"))
    .map((r) => ({ path: r.link, title: r.title, description: r.description ?? "", format: r.format ?? "", updatedAt: r.public_timestamp ?? null }));
}

export interface FetchedPage {
  url: string;
  title: string;
  publisher: string;
  text: string;
  updatedAt: string | null;
}

interface ContentItem {
  title?: string;
  base_path?: string;
  document_type?: string;
  public_updated_at?: string;
  details?: {
    body?: string;
    parts?: { title?: string; body?: string; slug?: string }[];
    introductory_paragraph?: string;
    more_information?: string;
  };
}

function publisherFor(item: ContentItem): string {
  const type = item.document_type ?? "";
  if (type === "hmrc_manual_section" || type === "hmrc_manual") return "HMRC internal manual";
  if (item.base_path?.includes("companies-house")) return "Companies House (GOV.UK)";
  return "GOV.UK guidance";
}

export async function fetchGovUkPage(path: string): Promise<FetchedPage | null> {
  const res = await fetch(`${BASE}/api/content${path}`, { headers: { "user-agent": UA, accept: "application/json" }, signal: AbortSignal.timeout(12_000) });
  if (!res.ok) return null;
  const item = (await res.json()) as ContentItem;
  const d = item.details ?? {};
  const html = [d.introductory_paragraph, d.body, ...(d.parts ?? []).map((p) => `<h2>${p.title ?? ""}</h2>${p.body ?? ""}`), d.more_information].filter(Boolean).join("\n");
  const text = htmlToText(html);
  if (text.length < 80) return null;
  return { url: `${BASE}${path}`, title: item.title ?? path, publisher: publisherFor(item), text, updatedAt: item.public_updated_at ?? null };
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", pound: "£", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", hellip: "…", euro: "€" };

/** HTML → plain text with one paragraph / list item / table row per line (blank-line separated). */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<h[1-6][^>]*>/gi, "\n\n## ")
    .replace(/<li[^>]*>/gi, "\n\n• ")
    .replace(/<\/(td|th)>/gi, " | ")
    .replace(/<(br|\/p|\/div|\/tr|\/h[1-6]|\/li|\/ul|\/ol|\/table|\/blockquote)[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") {
        const code = e[1]?.toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/[ \t ]+/g, " ")
    .split(/\n{2,}/)
    .map((s) => s.replace(/\n/g, " ").trim())
    .filter((s) => s && s !== "•" && s !== "##")
    .join("\n\n");
}

/**
 * Just the publisher's last-updated date for a GOV.UK page (Content API), used to decide whether a saved
 * answer is still current. Returns undefined when the check itself fails (network, page removed).
 */
export async function govUkUpdatedAt(url: string): Promise<string | null | undefined> {
  const path = url.replace(/^https:\/\/www\.gov\.uk/, "");
  if (!path.startsWith("/")) return undefined;
  try {
    const res = await fetch(`${BASE}/api/content${path}`, { headers: { "user-agent": UA, accept: "application/json" }, signal: AbortSignal.timeout(8_000) });
    if (!res.ok) return undefined;
    const item = (await res.json()) as ContentItem;
    return item.public_updated_at ?? null;
  } catch {
    return undefined;
  }
}
