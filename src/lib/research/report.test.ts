import { describe, expect, it } from "vitest";
import { buildReport, markdownBlocks, reportFilename } from "./report";
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
  const meta = { firm: "QA Practice", preparedBy: "Jo Bloggs", reference: "Smith Ltd", note: "Asked by the partner.", url: "https://learn.chitta.cloud/ask/abc", exportedAt: new Date("2026-10-16T09:00:00Z") };
  const blocks = buildReport("Does s455 apply?", answer, meta, "Smith Ltd loan");
  const text = JSON.stringify(blocks);

  it("puts the title, question, reference and who prepared it first", () => {
    expect(blocks[0]).toEqual({ kind: "title", text: "Smith Ltd loan" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Question", value: "Does s455 apply?" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Client / reference", value: "Smith Ltd" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Prepared by", value: "Jo Bloggs, QA Practice" });
    expect(blocks).toContainEqual({ kind: "meta", label: "Answered", value: "10 October 2026" });
  });
  it("shows how much was verified, and marks unverified points and quotes", () => {
    expect(text).toContain("1 of 2 points verified");
    expect(blocks).toContainEqual({ kind: "h3", text: "Repayment", tag: "Expert · Unverified" });
    expect(blocks).toContainEqual({ kind: "quote", text: "repaid", source: "[S1] CTM61505", verified: false });
  });
  it("links lesson sources to the app, and always ends with the disclaimer and OGL notice", () => {
    expect(text).toContain("https://learn.chitta.cloud/learn/directors/s455");
    expect(text).toContain("research aid, not advice");
    expect(text).toContain("Open Government Licence v3.0");
  });
  it("leaves out the question line when the title is the question", () => {
    const b = buildReport("Does s455 apply?", answer, { ...meta, reference: "", note: "" });
    expect(b.some((x) => x.kind === "meta" && x.label === "Question")).toBe(false);
    expect(b.some((x) => x.kind === "meta" && x.label === "Client / reference")).toBe(false);
  });
});

describe("reportFilename", () => {
  it("makes a safe, short filename", () => {
    expect(reportFilename("Smith Ltd: s455 / loan write-off?", "docx")).toBe("Smith-Ltd-s455-loan-write-off.docx");
    expect(reportFilename("???", "pdf")).toBe("capto-answer.pdf");
    expect(reportFilename("x".repeat(200), "pdf").length).toBe(84);
  });
});
