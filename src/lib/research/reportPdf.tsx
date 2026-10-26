import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Document, Image, Link, Page, StyleSheet, Text, View, renderToBuffer } from "@react-pdf/renderer";
import type { Block, Run } from "./report";
import { decodeLogo, fitBox, type ReportBrand } from "./reportDocx";

const MUTED = "#6b6470";
const LINE = "#d9d3dc";
const WASH = "#f6f1f4";
const WARN = "#b45309";

const s = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 56, paddingHorizontal: 50, fontFamily: "Helvetica", fontSize: 10.5, lineHeight: 1.45, color: "#221a22" },
  firm: { fontFamily: "Helvetica-Bold", fontSize: 13 },
  kicker: { fontSize: 8, color: MUTED, marginTop: 4, marginBottom: 14, fontFamily: "Helvetica-Bold", letterSpacing: 0.8 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 18, lineHeight: 1.25, marginBottom: 12 },
  metaTable: { borderWidth: 0.6, borderColor: LINE, marginBottom: 12 },
  metaRow: { flexDirection: "row", borderBottomWidth: 0.6, borderColor: LINE },
  metaLabel: { width: "26%", backgroundColor: WASH, padding: 5, fontFamily: "Helvetica-Bold", fontSize: 9 },
  metaValue: { width: "74%", padding: 5, fontSize: 9 },
  h2: { fontFamily: "Helvetica-Bold", fontSize: 13.5, marginTop: 14, marginBottom: 6, paddingBottom: 3, borderBottomWidth: 1 },
  h3: { fontFamily: "Helvetica-Bold", fontSize: 11, marginTop: 9, marginBottom: 3 },
  tag: { fontFamily: "Helvetica", fontSize: 8, color: MUTED },
  p: { marginBottom: 6 },
  muted: { fontSize: 8.5, color: MUTED, marginBottom: 5 },
  li: { flexDirection: "row", marginBottom: 3 },
  bullet: { width: 16 },
  liBody: { flex: 1 },
  table: { borderWidth: 0.6, borderColor: LINE, marginBottom: 8 },
  tr: { flexDirection: "row", borderBottomWidth: 0.6, borderColor: LINE },
  td: { flex: 1, padding: 4, fontSize: 9 },
  th: { flex: 1, padding: 4, fontSize: 9, fontFamily: "Helvetica-Bold", backgroundColor: WASH },
  quote: { marginLeft: 12, paddingLeft: 8, borderLeftWidth: 2, marginBottom: 6 },
  quoteText: { fontFamily: "Helvetica-Oblique", fontSize: 9 },
  quoteSrc: { fontSize: 8, marginTop: 2 },
});

/** The built-in PDF fonts only cover Latin-1, so swap the few symbols answers use for safe equivalents. */
export function pdfSafe(t: string): string {
  return t
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/✓/g, "")
    .replace(/⚠/g, "!")
    .replace(/→/g, "->")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/[^\x00-\xff€]/g, "");
}

function Runs({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) => {
        const style = { fontFamily: r.bold && r.italic ? "Helvetica-BoldOblique" : r.bold ? "Helvetica-Bold" : r.italic ? "Helvetica-Oblique" : undefined };
        return r.link && /^https?:\/\//.test(r.link) ? (
          <Link key={i} src={r.link} style={{ ...style, color: "#1f5fa8" }}>
            {pdfSafe(r.text)}
          </Link>
        ) : (
          <Text key={i} style={style}>
            {pdfSafe(r.text)}
          </Text>
        );
      })}
    </>
  );
}

function BlockView({ b, color }: { b: Block; color: string }) {
  switch (b.kind) {
    case "title":
      return <Text style={[s.title, { color }]}>{pdfSafe(b.text)}</Text>;
    case "h2":
      return (
        <Text style={[s.h2, { color, borderColor: color }]} minPresenceAhead={40}>
          {pdfSafe(b.text)}
        </Text>
      );
    case "h3":
      return (
        <Text style={s.h3} minPresenceAhead={30}>
          {pdfSafe(b.text)}
          {b.tag ? <Text style={[s.tag, b.tag.includes("Unverified") ? { color: WARN } : {}]}>{`   ${b.tag}`}</Text> : null}
        </Text>
      );
    case "p":
      return (
        // A line holding a link is kept whole: the renderer miscomputes the link's position when one is split across a page
        // break (seen on long appendices, where it crashed the whole export).
        <Text style={b.tone === "muted" ? s.muted : s.p} wrap={!b.runs.some((r) => r.link)}>
          <Runs runs={b.runs} />
        </Text>
      );
    case "list":
      return (
        <View style={{ marginBottom: 6 }}>
          {b.items.map((item, i) => (
            <View key={i} style={s.li} wrap={false}>
              <Text style={s.bullet}>{b.ordered ? `${i + 1}.` : "•"}</Text>
              <Text style={s.liBody}>
                <Runs runs={item} />
              </Text>
            </View>
          ))}
        </View>
      );
    case "table":
      return (
        <View style={s.table}>
          <View style={s.tr} wrap={false}>
            {b.header.map((c, i) => (
              <Text key={i} style={s.th}>
                <Runs runs={c} />
              </Text>
            ))}
          </View>
          {b.rows.map((r, i) => (
            <View key={i} style={s.tr} wrap={false}>
              {r.map((c, j) => (
                <Text key={j} style={s.td}>
                  <Runs runs={c} />
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    case "quote":
      return (
        <View style={[s.quote, { borderColor: b.verified ? LINE : "#f59e0b" }]} wrap={false}>
          <Text style={s.quoteText}>&quot;{pdfSafe(b.text)}&quot;</Text>
          <Text style={[s.quoteSrc, { color: b.verified ? MUTED : WARN }]}>{pdfSafe(`${b.verified ? "Found word for word in" : "Not found word for word in"} ${b.source}`)}</Text>
        </View>
      );
    case "signoff":
      return (
        <View style={s.table} wrap={false}>
          <View style={s.tr}>
            {["Role", "Name", "Signature", "Date"].map((h) => (
              <Text key={h} style={s.th}>
                {h}
              </Text>
            ))}
          </View>
          {b.rows.map((r, i) => (
            <View key={i} style={[s.tr, { minHeight: 30 }]}>
              <Text style={s.td}>{pdfSafe(r.role)}</Text>
              <Text style={s.td}>{pdfSafe(r.name)}</Text>
              <Text style={s.td}> </Text>
              <Text style={s.td}>{pdfSafe(r.date)}</Text>
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
}

export async function renderPdf(blocks: Block[], brand: ReportBrand): Promise<Buffer> {
  const color = /^#[0-9a-f]{6}$/i.test(brand.color) ? brand.color : "#a01f62";
  const logo = decodeLogo(brand.logoDataUrl);
  const meta = blocks.filter((b): b is Extract<Block, { kind: "meta" }> => b.kind === "meta");
  const title = blocks.find((b) => b.kind === "title");
  const rest = blocks.filter((b) => b.kind !== "meta" && b.kind !== "title");
  const doc = (
    <Document title={title?.kind === "title" ? pdfSafe(title.text) : "Research note"} author={pdfSafe(brand.firm)} creator="Capto Learn">
      <Page size="A4" style={s.page}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt; the firm name is the document author */}
        {logo ? <Image src={brand.logoDataUrl!} style={fitBox(logo.width, logo.height, 150, 48)} /> : <Text style={[s.firm, { color }]}>{pdfSafe(brand.firm)}</Text>}
        <Text style={s.kicker}>{brand.kicker ?? "TECHNICAL RESEARCH MEMORANDUM"}</Text>
        {title && <BlockView b={title} color={color} />}
        <View style={s.metaTable}>
          {meta.map((m, i) => (
            <View key={i} style={[s.metaRow, i === meta.length - 1 ? { borderBottomWidth: 0 } : {}]} wrap={false}>
              <Text style={s.metaLabel}>{pdfSafe(m.label)}</Text>
              <Text style={s.metaValue}>{pdfSafe(m.value)}</Text>
            </View>
          ))}
        </View>
        {rest.map((b, i) => (
          <BlockView key={i} b={b} color={color} />
        ))}
      </Page>
    </Document>
  );
  // The footer is stamped onto the finished pages rather than drawn by the renderer: its live "Page X of Y" text crashed
  // the whole export on longer documents (the renderer computed an impossible position when a block moved to the next page).
  return stampFooter(await renderToBuffer(doc), `${pdfSafe(brand.firm)}${brand.docRef ? ` · ${brand.docRef}` : ""} · Confidential`);
}

/** Adds "<label> · Page X of N" centred at the foot of every page. */
export async function stampFooter(pdf: Buffer, label: string): Promise<Buffer> {
  const doc = await PDFDocument.load(pdf);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  pages.forEach((page, i) => {
    const text = `${label} · Page ${i + 1} of ${pages.length}`;
    const size = 8;
    page.drawText(text, { x: (page.getWidth() - font.widthOfTextAtSize(text, size)) / 2, y: 24, size, font, color: rgb(0.42, 0.39, 0.44) });
  });
  return Buffer.from(await doc.save());
}
