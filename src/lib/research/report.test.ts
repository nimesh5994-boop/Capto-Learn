import { describe, expect, it } from "vitest";
import { buildReport, documentRef, markdownBlocks, reportFilename } from "./report";
import type { ResearchAnswer } from "./types";

describe("markdownBlocks", () => {
  it("keeps bold, italic and links as styled runs", () => {
    const [b] = markdownBlocks("Pay **35.75%** under *s455* — see [CTM61505](https://www.gov.uk/x) & more");
    expect(b).toEqual({
      kind: "p",
      runs: [{ text: "Pay " }, { text: "35.75%", bold: true }, { text: " under " }, { text: "s455", italic: true }, { text: " — see " }, { text: "CTM61505", link: "https://www.gov.uk/x" }, { text: " & more" }],
    });
  });
  it("turns lists and tables into structured blocks", () => {
    const blocks = markdownBlocks("1. First\n2. **Second**\n\n| Account | Dr | Cr |\n|---|---|---|\n| Bank | 100 | |\n| Sales | | 100 |");
    expect(blocks[0]).toEqual({ kind: "list", ordered: true, items: [[{ text: "First" }], [{ text: "Second", bold: true }]] });
    expect(blocks[1].kind).toBe("table");
    if (blocks[1].kind === "table") {
      expect(blocks[1].header.map((c) => c.map((r) => r.text).join(""))).toEqual(["Account", "Dr", "Cr"]);
      expect(blocks[1].rows[1].map((c) => c.map((r) => r.text).join(""))).toEqual(["Sales", "", "100"]);
    }
  });
});

describe("buildReport", () => {
  const answer: ResearchAnswer = {
    shortAnswer: "Yes, **s455** applies.",
    steps: [{ text: "Check the loan balance.", citations: [{ sourceId: "S1", quote: "the loan", verified: true }], verified: true }],
    example: { title: "Loan of £10,000", body: "Tax is £3,575." },
    points: [{ level: "expert", heading: "Repayment", text: "Relief under s458.", citations: [{ sourceId: "S1", quote: "repaid", verified: false }], verified: false }],
    caveats: ["Check **bed and breakfasting** rules."],
    followUps: [],
    confidence: "medium",
    taxYear: "2026/27",
    sources: [
      { id: "S1", kind: "official", url: "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505", title: "CTM61505", publisher: "HMRC internal manual", updatedAt: "2026-04-06T00:00:00.000Z" },
      { id: "L1", kind: "lesson", url: "/learn/directors/s455", title: "s455 lesson", publisher: "Capto Learn lesson" },
    ],
    relatedLessons: [],
    model: "x",
    generatedAt: "2026-10-10T10:00:00.000Z",
  };
  const meta = { docRef: "CL-ABC12345", firm: "QA Practice", preparedBy: "Jo Bloggs", reference: "Smith Ltd", note: "Asked by the partner.", url: "https://learn.chitta.cloud/ask/abc", exportedAt: new Date("2026-10-16T09:00:00Z") };
  const blocks = buildReport("Does s455 apply?", answer, meta, "Smith Ltd loan");
  const text = JSON.stringify(blocks);

  it("opens with the memorandum details: reference, client, subject, preparer, dates and classification", () => {
    expect(blocks[0]).toEqual({ kind: "title", text: "Smith Ltd loan" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Document reference", value: "CL-ABC12345" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Client / matter", value: "Smith Ltd" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Subject", value: "Does s455 apply?" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Prepared by", value: "Jo Bloggs, QA Practice" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Date of research", value: "10 October 2026" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Classification", value: "Confidential: internal working paper" });
  });
  it("numbers the sections in order, conclusion first, and points the status line at the review section", () => {
    const heads = blocks.filter((b) => b.kind === "h2").map((b) => (b.kind === "h2" ? b.text : ""));
    expect(heads).toEqual([
      "1. Summary of conclusion",
      "2. Question and background",
      "3. Scope and basis of preparation",
      "4. Analysis",
      "5. Recommended approach",
      "6. Illustrative example: Loan of £10,000",
      "7. Matters to confirm before advising",
      "8. Review and approval",
      "Appendix A: Sources and evidence",
      "Appendix B: Important notice",
    ]);
    expect(text).toContain("approved (section 8)");
    expect(blocks).toContainEqual({ kind: "h3", text: "4.1  Repayment", tag: "Expert" });
  });
  it("references sources in the text, flags unverified points, and puts the quotations in Appendix A", () => {
    expect(text).toContain("1 of 2 points are supported");
    expect(text).toContain("Sources: [S1] · quotation NOT verified");
    expect(text).toContain("Sources: [S1] · quotations verified word for word");
    const appendix = blocks.slice(blocks.findIndex((b) => b.kind === "h2" && b.text.startsWith("Appendix A")));
    expect(appendix).toContainEqual({ kind: "quote", text: "repaid", source: "[S1]", verified: false });
    expect(appendix).toContainEqual({ kind: "quote", text: "the loan", source: "[S1]", verified: true });
  });
  it("includes a sign-off box with the preparer filled in and reviewer and approver left blank", () => {
    const so = blocks.find((b) => b.kind === "signoff");
    expect(so && so.kind === "signoff" && so.rows.map((r) => [r.role, r.name])).toEqual([
      ["Prepared by", "Jo Bloggs"],
      ["Reviewed by", ""],
      ["Approved for client use", ""],
    ]);
  });
  it("makes a stable document reference", () => expect(documentRef("a6509153-a4d6-44f4-9d88-178a39bacf97")).toBe("CL-A6509153"));
  it("links lesson sources to the app, and always ends with the disclaimer and OGL notice", () => {
    expect(text).toContain("https://learn.chitta.cloud/learn/directors/s455");
    expect(text).toContain("is a research aid and is not advice");
    expect(text).toContain("Open Government Licence v3.0");
  });
  it("uses the question as the title and leaves out an empty client line", () => {
    const b = buildReport("Does s455 apply?", answer, { ...meta, reference: "", note: "" });
    expect(b[0]).toEqual({ kind: "title", text: "Does s455 apply?" });
    expect(b.some((x) => x.kind === "meta" && x.label === "Client / matter")).toBe(false);
  });
});

describe("reportFilename", () => {
  it("makes a safe, short filename", () => {
    expect(reportFilename("Smith Ltd: s455 / loan write-off?", "docx")).toBe("Smith-Ltd-s455-loan-write-off.docx");
    expect(reportFilename("???", "pdf")).toBe("capto-answer.pdf");
    expect(reportFilename("x".repeat(200), "pdf").length).toBe(84);
  });
});
