import { inflateRawSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { buildReport } from "./report";
import { decodeLogo, fitBox, renderDocx } from "./reportDocx";
import { pdfSafe } from "./reportPdf";
import type { ResearchAnswer } from "./types";

/** Reads one file out of a .docx (zip) without extra dependencies. */
function unzipEntry(zip: Buffer, name: string): string {
  let i = 0;
  while ((i = zip.indexOf(Buffer.from([0x50, 0x4b, 0x03, 0x04]), i)) >= 0) {
    const method = zip.readUInt16LE(i + 8);
    const size = zip.readUInt32LE(i + 18);
    const nameLen = zip.readUInt16LE(i + 26);
    const extraLen = zip.readUInt16LE(i + 28);
    const entry = zip.subarray(i + 30, i + 30 + nameLen).toString();
    const start = i + 30 + nameLen + extraLen;
    if (entry === name) {
      const data = zip.subarray(start, start + size);
      return (method === 8 ? inflateRawSync(data) : data).toString("utf8");
    }
    i = start;
  }
  throw new Error(`${name} not in zip`);
}

const answer: ResearchAnswer = {
  shortAnswer: "Register when taxable turnover goes over **£90,000**.",
  example: { title: "Journal", body: "| Account | Dr | Cr |\n|---|---|---|\n| Bank | 100 | |" },
  points: [{ heading: "Threshold", text: "- Historic test\n- Future test", citations: [{ sourceId: "S1", quote: "More than £90,000", verified: true }], verified: true }],
  caveats: [],
  followUps: [],
  confidence: "high",
  taxYear: "2026/27",
  sources: [{ id: "S1", kind: "official", url: "https://www.gov.uk/register-for-vat", title: "Register for VAT", publisher: "GOV.UK guidance" }],
  relatedLessons: [],
  model: "x",
  generatedAt: "2026-10-11T10:00:00.000Z",
};

describe("renderDocx", () => {
  it("produces a Word file holding the report's text, table and links", async () => {
    const blocks = buildReport("What is the VAT threshold?", answer, { firm: "QA Practice", preparedBy: "Jo", reference: "Smith Ltd", url: "https://learn.chitta.cloud/ask/x", exportedAt: new Date() });
    const buf = await renderDocx(blocks, { firm: "QA Practice", color: "#a01f62" });
    expect(buf.subarray(0, 2).toString()).toBe("PK");
    const xml = unzipEntry(buf, "word/document.xml");
    for (const t of ["What is the VAT threshold?", "Smith Ltd", "£90,000", "Historic test", "Bank", "Register for VAT", "research aid, not advice"]) expect(xml).toContain(t);
    expect(xml).toContain("<w:tbl>");
    expect(unzipEntry(buf, "word/_rels/document.xml.rels")).toContain("https://www.gov.uk/register-for-vat");
  });
});

describe("logo handling", () => {
  it("reads a PNG's size and fits it in the header box", () => {
    // 1×1 PNG.
    const png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    expect(decodeLogo(png)).toMatchObject({ type: "png", width: 1, height: 1 });
    expect(decodeLogo("data:image/svg+xml;base64,PHN2Zy8+")).toBeNull();
    expect(decodeLogo(null)).toBeNull();
    expect(fitBox(400, 100, 180, 60)).toEqual({ width: 180, height: 45 });
    expect(fitBox(50, 50, 180, 60)).toEqual({ width: 50, height: 50 });
  });
});

describe("pdfSafe", () => {
  it("keeps £ and € but swaps symbols the built-in PDF fonts can't draw", () => {
    expect(pdfSafe("£90,000 – “future test” → 30 days… ≥ €5")).toBe('£90,000 - "future test" -> 30 days... >= €5');
  });
});
