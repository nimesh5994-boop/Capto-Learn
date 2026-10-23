import "server-only";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  ImageRun,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type ParagraphChild,
} from "docx";
import type { Block, Run } from "./report";

export interface ReportBrand {
  firm: string;
  /** Hex, e.g. "#a01f62". */
  color: string;
  /** PNG or JPEG data: URL; anything else is skipped. */
  logoDataUrl?: string | null;
  /** Document reference for the page footer. */
  docRef?: string;
  /** Small heading under the logo; defaults to the research memorandum. */
  kicker?: string;
}

const MUTED = "6B6470";
const hex = (c: string) => (/^#?[0-9a-f]{6}$/i.test(c) ? c.replace("#", "").toUpperCase() : "A01F62");

/** A PNG/JPEG logo as bytes plus its pixel size (read from the file header), or null. */
export function decodeLogo(dataUrl: string | null | undefined): { type: "png" | "jpg"; data: Buffer; width: number; height: number } | null {
  const m = /^data:image\/(png|jpe?g);base64,(.+)$/i.exec(dataUrl ?? "");
  if (!m) return null;
  const data = Buffer.from(m[2], "base64");
  if (m[1].toLowerCase() === "png") {
    if (data.length < 24) return null;
    return { type: "png", data, width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  }
  // JPEG: walk the segments to the first SOFn marker.
  let i = 2;
  while (i + 9 < data.length) {
    if (data[i] !== 0xff) return null;
    const marker = data[i + 1];
    const len = data.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { type: "jpg", data, width: data.readUInt16BE(i + 7), height: data.readUInt16BE(i + 5) };
    i += 2 + len;
  }
  return null;
}

/** Fits a logo inside a box, keeping its shape. */
export function fitBox(w: number, h: number, maxW: number, maxH: number): { width: number; height: number } {
  if (!w || !h) return { width: maxW, height: maxH };
  const s = Math.min(maxW / w, maxH / h, 1);
  return { width: Math.round(w * s), height: Math.round(h * s) };
}

function runs(rs: Run[], base: { size?: number; color?: string; italics?: boolean } = {}): ParagraphChild[] {
  return rs.flatMap((r): ParagraphChild[] => {
    const parts = r.text.split("\n");
    const pieces = parts.map((t, i) => new TextRun({ text: t, bold: r.bold, italics: r.italic || base.italics, size: base.size, color: r.link ? "1F5FA8" : base.color, underline: r.link ? {} : undefined, break: i > 0 ? 1 : undefined }));
    return r.link && /^https?:\/\//.test(r.link) ? [new ExternalHyperlink({ link: r.link, children: pieces })] : pieces;
  });
}

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "D9D3DC" };

export async function renderDocx(blocks: Block[], brand: ReportBrand): Promise<Buffer> {
  const color = hex(brand.color);
  const children: (Paragraph | Table)[] = [];
  const logo = decodeLogo(brand.logoDataUrl);
  if (logo) {
    const size = fitBox(logo.width, logo.height, 180, 60);
    children.push(new Paragraph({ children: [new ImageRun({ type: logo.type, data: logo.data, transformation: size })], spacing: { after: 120 } }));
  } else {
    children.push(new Paragraph({ children: [new TextRun({ text: brand.firm, bold: true, color, size: 26 })], spacing: { after: 120 } }));
  }
  children.push(new Paragraph({ children: [new TextRun({ text: brand.kicker ?? "TECHNICAL RESEARCH MEMORANDUM", color: MUTED, size: 17, bold: true })], spacing: { after: 200 } }));

  const metaRows: TableRow[] = [];
  const flushMeta = () => {
    if (!metaRows.length) return;
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder },
        rows: metaRows.splice(0),
      }),
      new Paragraph({ text: "" })
    );
  };

  for (const b of blocks) {
    if (b.kind !== "meta") flushMeta();
    switch (b.kind) {
      case "title":
        children.push(new Paragraph({ children: [new TextRun({ text: b.text, bold: true, size: 36, color })], spacing: { after: 200 } }));
        break;
      case "meta":
        metaRows.push(
          new TableRow({
            children: [
              new TableCell({ width: { size: 26, type: WidthType.PERCENTAGE }, shading: { type: ShadingType.CLEAR, fill: "F6F1F4", color: "auto" }, children: [new Paragraph({ children: [new TextRun({ text: b.label, bold: true, size: 18 })] })] }),
              new TableCell({ width: { size: 74, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: b.value, size: 18 })] })] }),
            ],
          })
        );
        break;
      case "h2":
        children.push(
          new Paragraph({
            children: [new TextRun({ text: b.text, bold: true, size: 28, color })],
            spacing: { before: 280, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color, space: 2 } },
            keepNext: true,
          })
        );
        break;
      case "h3":
        children.push(
          new Paragraph({
            children: [new TextRun({ text: b.text, bold: true, size: 23 }), ...(b.tag ? [new TextRun({ text: `   ${b.tag}`, size: 17, color: b.tag.includes("Unverified") ? "B45309" : MUTED })] : [])],
            spacing: { before: 200, after: 80 },
            keepNext: true,
          })
        );
        break;
      case "p":
        children.push(new Paragraph({ children: runs(b.runs, b.tone === "muted" ? { size: 18, color: MUTED } : { size: 21 }), spacing: { after: 120 } }));
        break;
      case "list":
        for (const item of b.items) children.push(new Paragraph({ children: runs(item, { size: 21 }), numbering: { reference: b.ordered ? "numbers" : "bullets", level: 0 }, spacing: { after: 60 } }));
        children.push(new Paragraph({ text: "", spacing: { after: 60 } }));
        break;
      case "table": {
        const row = (cells: Run[][], head: boolean) =>
          new TableRow({
            tableHeader: head,
            children: cells.map(
              (c) =>
                new TableCell({
                  shading: head ? { type: ShadingType.CLEAR, fill: "F6F1F4", color: "auto" } : undefined,
                  children: [new Paragraph({ children: runs(head ? c.map((r) => ({ ...r, bold: true })) : c, { size: 19 }) })],
                })
            ),
          });
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder },
            rows: [row(b.header, true), ...b.rows.map((r) => row(r, false))],
          }),
          new Paragraph({ text: "" })
        );
        break;
      }
      case "signoff": {
        const cell = (t: string, head = false, width = 25) =>
          new TableCell({
            width: { size: width, type: WidthType.PERCENTAGE },
            shading: head ? { type: ShadingType.CLEAR, fill: "F6F1F4", color: "auto" } : undefined,
            children: [new Paragraph({ children: [new TextRun({ text: t, bold: head, size: 19 })], spacing: { before: head ? 40 : 160, after: head ? 40 : 160 } })],
          });
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder, insideHorizontal: cellBorder, insideVertical: cellBorder },
            rows: [
              new TableRow({ tableHeader: true, children: [cell("Role", true, 26), cell("Name", true, 28), cell("Signature", true, 26), cell("Date", true, 20)] }),
              ...b.rows.map((r) => new TableRow({ children: [cell(r.role, false, 26), cell(r.name, false, 28), cell("", false, 26), cell(r.date, false, 20)] })),
            ],
          }),
          new Paragraph({ text: "" })
        );
        break;
      }
      case "quote":
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `“${b.text}”`, italics: true, size: 18 }),
              new TextRun({ text: `${b.verified ? "✓ Found word for word in " : "⚠ Not found word for word in "}${b.source}`, size: 16, color: b.verified ? MUTED : "B45309", break: 1 }),
            ],
            indent: { left: 360 },
            border: { left: { style: BorderStyle.SINGLE, size: 12, color: b.verified ? "D9D3DC" : "F59E0B", space: 8 } },
            spacing: { after: 100 },
          })
        );
        break;
    }
  }
  flushMeta();

  const doc = new Document({
    creator: brand.firm,
    title: blocks[0]?.kind === "title" ? blocks[0].text : "Research note",
    styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },
    numbering: {
      config: [
        { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } } }] },
        { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } } } }] },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `${brand.firm}${brand.docRef ? ` · ${brand.docRef}` : ""} · Confidential · Page `, size: 16, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], size: 16, color: MUTED })],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
  return Packer.toBuffer(doc);
}
