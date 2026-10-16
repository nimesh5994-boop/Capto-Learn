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
  | { kind: "quote"; text: string; source: string; verified: boolean }
  | { kind: "signoff"; rows: { role: string; name: string; date: string }[] };

export interface ReportMeta {
  firm: string;
  /** Shown on every page, e.g. "CL-A6509153" (see documentRef). */
  docRef: string;
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
const CONFIDENCE: Record<ResearchAnswer["confidence"], string> = {
  high: "High: the official sources address the question directly.",
  medium: "Medium: the conclusion draws on more than one source or needs some interpretation.",
  low: "Low: the sources only partly cover the question. Senior review is essential.",
};

/** A stable, human-readable document reference for an answer, e.g. "CL-A6509153". */
export const documentRef = (queryId: string): string => `CL-${queryId.replace(/-/g, "").slice(0, 8).toUpperCase()}`;

const para = (text: string, tone?: "muted"): Block => ({ kind: "p", runs: [{ text }], tone });

/**
 * The whole report, laid out as a technical research memorandum in the style UK professional firms use for
 * file notes: reference and classification, conclusion first, scope and basis of preparation, numbered analysis
 * with source references, matters to confirm, a review sign-off box, and the evidence in an appendix.
 */
export function buildReport(question: string, answer: ResearchAnswer, meta: ReportMeta, title?: string): Block[] {
  const steps = answer.steps ?? [];
  const checked = [...answer.points, ...steps];
  const verified = checked.filter((x) => x.verified).length;
  const official = answer.sources.filter((s) => s.kind !== "lesson");
  const lessons = answer.sources.filter((s) => s.kind === "lesson");
  const refLine = (cs: { sourceId: string }[], ok: boolean): Block => ({
    kind: "p",
    tone: "muted",
    runs: [
      {
        text: cs.length
          ? `Sources: ${[...new Set(cs.map((c) => c.sourceId))].map((r) => `[${r}]`).join(", ")} · ${ok ? "quotations verified word for word" : "quotation NOT verified: treat with caution"}`
          : "No supporting quotation: treat with caution",
      },
    ],
  });
  let n = 0;
  const section = (text: string): Block => ({ kind: "h2", text: `${++n}. ${text}` });
  // Sections 1–3 and "Matters to confirm" always appear; the review section follows the optional ones.
  const reviewSection = 5 + (answer.points.length ? 1 : 0) + (steps.length ? 1 : 0) + (answer.example ? 1 : 0) + (answer.professional ? 1 : 0);

  const out: Block[] = [{ kind: "title", text: title?.trim() || question }];
  out.push({ kind: "meta", label: "Document reference", value: meta.docRef });
  if (meta.reference) out.push({ kind: "meta", label: "Client / matter", value: meta.reference });
  out.push(
    { kind: "meta", label: "Subject", value: question },
    { kind: "meta", label: "Prepared by", value: `${meta.preparedBy}, ${meta.firm}` },
    { kind: "meta", label: "Date of research", value: fmtDate(answer.generatedAt) },
    { kind: "meta", label: "Date issued", value: fmtDate(meta.exportedAt) }
  );
  if (answer.taxYear) out.push({ kind: "meta", label: "Tax year", value: answer.taxYear });
  out.push(
    { kind: "meta", label: "Status", value: `Draft for review. Not to be relied on until reviewed and approved (section ${reviewSection}).` },
    { kind: "meta", label: "Classification", value: "Confidential: internal working paper" }
  );

  // Conclusion first.
  out.push(
    section("Summary of conclusion"),
    ...markdownBlocks(answer.shortAnswer),
    para(`Confidence: ${CONFIDENCE[answer.confidence]} ${verified} of ${checked.length} points are supported by quotations verified word for word against their source.`, "muted")
  );

  // The question and any background the preparer recorded.
  out.push(section("Question and background"), { kind: "p", runs: [{ text: "Question as put: ", bold: true }, { text: question }] });
  if (meta.note) out.push({ kind: "p", runs: [{ text: "Background noted by the preparer:", bold: true }] }, ...meta.note.split(/\n{2,}/).map((x) => para(x.trim())));
  out.push(para("No other facts have been assumed. If the client's circumstances differ from the question above, the conclusion may not apply.", "muted"));

  // Scope and basis of preparation.
  const dates = official.map((s) => s.updatedAt).filter((d): d is string => !!d).sort();
  out.push(section("Scope and basis of preparation"), {
    kind: "list",
    ordered: false,
    items: [
      [
        {
          text: `Research was carried out with Ask Capto on ${fmtDate(answer.generatedAt)} using ${official.length} official source${official.length === 1 ? "" : "s"} (HMRC internal manuals and GOV.UK guidance)${lessons.length ? ` and ${lessons.length} Capto Learn training lesson${lessons.length === 1 ? "" : "s"}` : ""}, listed in Appendix A.`,
        },
      ],
      ...(dates.length ? [[{ text: `The publishers last updated the official sources between ${fmtDate(dates[0])} and ${fmtDate(dates[dates.length - 1])}.` }]] : []),
      [{ text: "Each point is supported by a quotation checked word for word against the source text. Any point whose quotation could not be verified is marked." }],
      [{ text: "Primary legislation and case law were not consulted directly. HMRC guidance sets out HMRC's view of the law and does not bind the courts." }],
      [{ text: "Matters outside the question (for example other taxes, anti-avoidance rules or the client's wider position) are not considered unless mentioned below." }],
    ],
  });

  if (answer.points.length) {
    out.push(section("Analysis"));
    const sec = n;
    answer.points.forEach((pt, i) => out.push({ kind: "h3", text: `${sec}.${i + 1}  ${pt.heading}`, tag: pt.level ? LEVEL[pt.level] : undefined }, ...markdownBlocks(pt.text), refLine(pt.citations, pt.verified)));
  }

  if (steps.length) {
    out.push(section("Recommended approach"));
    const sec = n;
    steps.forEach((st, i) => out.push({ kind: "h3", text: `${sec}.${i + 1}` }, ...markdownBlocks(st.text), refLine(st.citations, st.verified)));
  }

  if (answer.example) {
    out.push(section(`Illustrative example: ${answer.example.title}`), ...markdownBlocks(answer.example.body), para("The figures are illustrative only and are not taken from the sources.", "muted"));
  }

  out.push(section("Matters to confirm before advising"), {
    kind: "list",
    ordered: true,
    items: [
      ...answer.caveats.map((c) => markdownBlocks(c).flatMap((b) => (b.kind === "p" ? b.runs : []))),
      [{ text: "Confirm that the client's facts match the question and background in section 2." }],
      [{ text: "Check that the sources in Appendix A have not been updated since the date of research." }],
    ],
  });

  if (answer.professional) {
    out.push(
      section("Guidance from professional bodies"),
      para("Summarised from ICAEW, ACCA, ATT, CIOT or FRC websites. These are not verified by Capto: read the linked material in full before relying on it.", "muted"),
      ...markdownBlocks(answer.professional.summary),
      { kind: "list", ordered: false, items: answer.professional.links.map((l) => [{ text: l.title, link: l.url }]) }
    );
  }

  // Evidence of the firm's review under its quality management procedures.
  out.push(section("Review and approval"), para("Complete before this memorandum is relied on or its conclusions are shared with a client.", "muted"), {
    kind: "signoff",
    rows: [
      { role: "Prepared by", name: meta.preparedBy, date: fmtDate(meta.exportedAt) },
      { role: "Reviewed by", name: "", date: "" },
      { role: "Approved for client use", name: "", date: "" },
    ],
  });

  // Appendix A: every source, with the quotations relied on from it.
  const appUrl = meta.url.replace(/\/ask\/.*$/, "");
  const cited = checked.flatMap((x) => x.citations);
  out.push({ kind: "h2", text: "Appendix A: Sources and evidence" });
  for (const s of answer.sources) {
    const link = s.kind === "lesson" ? `${appUrl}${s.url}` : s.url;
    out.push(
      { kind: "h3", text: `[${s.id}] ${s.title}` },
      { kind: "p", tone: "muted", runs: [{ text: `${s.publisher}${s.updatedAt ? ` · last updated ${fmtDate(s.updatedAt)}` : ""} · ` }, { text: link, link }] },
      ...cited.filter((c) => c.sourceId === s.id).map((c): Block => ({ kind: "quote", text: c.quote, source: `[${s.id}]`, verified: c.verified }))
    );
  }

  out.push(
    { kind: "h2", text: "Appendix B: Important notice" },
    para(
      `This memorandum was prepared by ${meta.firm} using Ask Capto, a research tool that answers from official HMRC and GOV.UK guidance and checks each quotation against its source. It is a research aid and is not advice. A suitably qualified person must review it, applying professional judgement and the firm's quality management procedures, before it is relied on or its conclusions are given to a client. Guidance and law change, so check the sources have not been updated since the date of research.`,
      "muted"
    ),
    para("Contains public sector information licensed under the Open Government Licence v3.0.", "muted"),
    { kind: "p", tone: "muted", runs: [{ text: `Reference ${meta.docRef}. Live answer: ` }, { text: meta.url, link: meta.url }] }
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
