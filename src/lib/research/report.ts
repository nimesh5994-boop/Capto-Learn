/*
 * Ask Capto report: turns a saved or shared answer into a neutral list of blocks (headings, paragraphs, lists,
 * tables, quotes). The Word and PDF renderers both draw from this one layout, so the two files always match.
 * Pure (no database, no rendering), so it's unit-tested.
 */
import { Lexer, type Token, type Tokens } from "marked";
import type { ResearchAnswer } from "./types";

export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
  link?: string;
}

export type Block =
  | { kind: "title"; text: string }
  | { kind: "meta"; label: string; value: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string; tag?: string }
  | { kind: "p"; runs: Run[]; tone?: "muted" | "warning" }
  | { kind: "list"; ordered: boolean; items: Run[][] }
  | { kind: "table"; header: Run[][]; rows: Run[][][] }
  | { kind: "quote"; text: string; source: string; verified: boolean };

export interface ReportMeta {
  firm: string;
  preparedBy: string;
  /** Client, job or file reference typed when saving. */
  reference?: string;
  note?: string;
  /** Absolute app URL of the answer, for "view online". */
  url: string;
  exportedAt: Date;
}

const LONG_DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
const fmtDate = (d: Date | string) => LONG_DATE.format(new Date(d));

/** Inline markdown tokens → runs, keeping bold, italic and links. */
function inlineRuns(tokens: Token[] | undefined, style: Omit<Run, "text"> = {}): Run[] {
  const out: Run[] = [];
  for (const t of tokens ?? []) {
    switch (t.type) {
      case "strong":
        out.push(...inlineRuns((t as Tokens.Strong).tokens, { ...style, bold: true }));
        break;
      case "em":
        out.push(...inlineRuns((t as Tokens.Em).tokens, { ...style, italic: true }));
        break;
      case "link": {
        const l = t as Tokens.Link;
        out.push(...inlineRuns(l.tokens, { ...style, link: l.href }));
        break;
      }
      case "codespan":
        out.push({ ...style, text: decode((t as Tokens.Codespan).text) });
        break;
      case "br":
        out.push({ ...style, text: "\n" });
        break;
      default: {
        const anyT = t as Token & { tokens?: Token[]; text?: string };
        if (anyT.tokens?.length) out.push(...inlineRuns(anyT.tokens, style));
        else if (typeof anyT.text === "string") out.push({ ...style, text: decode(anyT.text) });
        else if ("raw" in t) out.push({ ...style, text: decode(String(t.raw)) });
      }
    }
  }
  return merge(out);
}

/** marked keeps HTML entities in text tokens; reports need the characters. */
function decode(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/** Joins neighbouring runs with the same style, so renderers get fewer, longer pieces. */
function merge(runs: Run[]): Run[] {
  const out: Run[] = [];
  for (const r of runs) {
    const last = out[out.length - 1];
    if (last && last.bold === r.bold && last.italic === r.italic && last.link === r.link) last.text += r.text;
    else if (r.text) out.push({ ...r });
  }
  return out;
}

const plain = (runs: Run[]) => runs.map((r) => r.text).join("");

/** Block-level markdown → report blocks. Anything unusual degrades to a plain paragraph rather than vanishing. */
export function markdownBlocks(md: string): Block[] {
  const out: Block[] = [];
  for (const t of new Lexer().lex(md ?? "")) {
    switch (t.type) {
      case "space":
      case "hr":
        break;
      case "heading":
        out.push({ kind: "h3", text: plain(inlineRuns((t as Tokens.Heading).tokens)) });
        break;
      case "paragraph":
        out.push({ kind: "p", runs: inlineRuns((t as Tokens.Paragraph).tokens) });
        break;
      case "list": {
        const l = t as Tokens.List;
        out.push({
          kind: "list",
          ordered: l.ordered,
          items: l.items.map((it) => inlineRuns(it.tokens.flatMap((x) => (x.type === "text" || x.type === "paragraph" ? ((x as Tokens.Text).tokens ?? [x]) : [x])))),
        });
        break;
      }
      case "table": {
        const tb = t as Tokens.Table;
        out.push({ kind: "table", header: tb.header.map((c) => inlineRuns(c.tokens)), rows: tb.rows.map((r) => r.map((c) => inlineRuns(c.tokens))) });
        break;
      }
      case "blockquote":
        out.push(...markdownBlocks((t as Tokens.Blockquote).text).map((b) => (b.kind === "p" ? { ...b, tone: "muted" as const } : b)));
        break;
      case "code":
        out.push({ kind: "p", runs: [{ text: (t as Tokens.Code).text }] });
        break;
      default:
        if ("text" in t && typeof t.text === "string" && t.text.trim()) out.push({ kind: "p", runs: [{ text: decode(t.text) }] });
    }
  }
  return out;
}

const LEVEL: Record<string, string> = { essentials: "Essentials", practitioner: "Practitioner", expert: "Expert" };
const CONFIDENCE: Record<ResearchAnswer["confidence"], string> = { high: "High", medium: "Medium", low: "Low — check with a senior" };

/** The whole report, in reading order. */
export function buildReport(question: string, answer: ResearchAnswer, meta: ReportMeta, title?: string): Block[] {
  const steps = answer.steps ?? [];
  const checked = [...answer.points, ...steps];
  const verified = checked.filter((p) => p.verified).length;
  const byId = new Map(answer.sources.map((s) => [s.id, s]));
  const srcName = (id: string) => (byId.get(id) ? `[${id}] ${byId.get(id)!.title}` : id);
  const quotes = (cs: { sourceId: string; quote: string; verified: boolean }[]): Block[] => cs.map((c) => ({ kind: "quote", text: c.quote, source: srcName(c.sourceId), verified: c.verified }));

  const out: Block[] = [{ kind: "title", text: title?.trim() || question }];
  if (title && title.trim() !== question.trim()) out.push({ kind: "meta", label: "Question", value: question });
  if (meta.reference) out.push({ kind: "meta", label: "Client / reference", value: meta.reference });
  out.push(
    { kind: "meta", label: "Prepared by", value: `${meta.preparedBy}, ${meta.firm}` },
    { kind: "meta", label: "Answered", value: fmtDate(answer.generatedAt) },
    { kind: "meta", label: "Exported", value: fmtDate(meta.exportedAt) },
    { kind: "meta", label: "Confidence", value: `${CONFIDENCE[answer.confidence]} · ${verified} of ${checked.length} points verified word for word against their source` }
  );
  if (answer.taxYear) out.push({ kind: "meta", label: "Tax year", value: answer.taxYear });
  if (meta.note) out.push({ kind: "h2", text: "Notes" }, ...meta.note.split(/\n{2,}/).map((p): Block => ({ kind: "p", runs: [{ text: p.trim() }] })));

  out.push({ kind: "h2", text: "Short answer" }, ...markdownBlocks(answer.shortAnswer));

  if (steps.length) {
    out.push({ kind: "h2", text: "How to do it" });
    steps.forEach((s, i) => {
      out.push({ kind: "h3", text: `Step ${i + 1}`, tag: s.verified ? "Verified" : "Unverified" }, ...markdownBlocks(s.text), ...quotes(s.citations));
    });
  }

  if (answer.example) {
    out.push(
      { kind: "h2", text: `Worked example: ${answer.example.title}` },
      ...markdownBlocks(answer.example.body),
      { kind: "p", tone: "muted", runs: [{ text: "An illustration applying the points below. The figures are examples, not taken from the sources." }] }
    );
  }

  if (answer.points.length) {
    out.push({ kind: "h2", text: "The detail" });
    for (const p of answer.points) {
      const tag = [p.level ? LEVEL[p.level] : null, p.verified ? "Verified" : "Unverified"].filter(Boolean).join(" · ");
      out.push({ kind: "h3", text: p.heading, tag }, ...markdownBlocks(p.text), ...quotes(p.citations));
    }
  }

  if (answer.caveats.length) {
    out.push({ kind: "h2", text: "Check before you advise" }, { kind: "list", ordered: false, items: answer.caveats.map((c) => markdownBlocks(c).flatMap((b) => (b.kind === "p" ? b.runs : []))) });
  }

  if (answer.professional) {
    out.push(
      { kind: "h2", text: "What the professional bodies say" },
      { kind: "p", tone: "muted", runs: [{ text: "From ICAEW, ACCA, ATT, CIOT or FRC websites. Not quote-verified by Capto." }] },
      ...markdownBlocks(answer.professional.summary),
      { kind: "list", ordered: false, items: answer.professional.links.map((l) => [{ text: l.title, link: l.url }]) }
    );
  }

  const appUrl = meta.url.replace(/\/ask\/.*$/, "");
  out.push({
    kind: "h2",
    text: "Sources",
  });
  out.push({
    kind: "list",
    ordered: false,
    items: answer.sources.map((s) => [
      { text: `[${s.id}] `, bold: true },
      { text: s.title, link: s.kind === "lesson" ? `${appUrl}${s.url}` : s.url },
      { text: ` · ${s.publisher}${s.updatedAt ? ` · updated ${fmtDate(s.updatedAt)}` : ""}` },
    ]),
  });

  out.push(
    { kind: "h2", text: "Important" },
    {
      kind: "p",
      tone: "muted",
      runs: [
        {
          text: "Ask Capto is a research aid, not advice. It answers from official HMRC and GOV.UK guidance and Capto Learn's lessons, and checks every quote word for word against its source. Apply professional judgement and your firm's review process before advising a client, and check the linked guidance has not changed since the date above.",
        },
      ],
    },
    { kind: "p", tone: "muted", runs: [{ text: "Contains public sector information licensed under the Open Government Licence v3.0." }] },
    { kind: "p", tone: "muted", runs: [{ text: "View online: " }, { text: meta.url, link: meta.url }] }
  );
  return out;
}

/** A safe download filename from the title: letters, digits and dashes, at most 80 characters. */
export function reportFilename(title: string, ext: "docx" | "pdf"): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");
  return `${slug || "capto-answer"}.${ext}`;
}
