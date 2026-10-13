import { describe, expect, it } from "vitest";
import type { Lesson } from "@/content/types";
import { keyNumbers, lessonPlainText, rejectCard } from "./flashcards";

const lesson = {
  slug: "x",
  title: "VAT registration",
  level: "foundation",
  minutes: 20,
  summary: "When a business must register.",
  objectives: [],
  body: [
    { kind: "md", md: "A business must register when taxable turnover exceeds **£90,000** in any rolling 12-month period." },
    { kind: "table", head: ["Rate", "Percentage"], rows: [["Standard", "20%"], ["Reduced", "5%"]] },
  ],
  exercises: [],
  quiz: [],
  sources: [],
} as unknown as Lesson;
const plain = lessonPlainText(lesson);

describe("lessonPlainText", () => {
  it("drops markdown and writes table rows out", () => {
    expect(plain).toContain("exceeds £90,000 in any rolling");
    expect(plain).toContain("Rate: Standard; Percentage: 20%.");
  });
});

describe("keyNumbers", () => {
  it("normalises thousands separators", () => {
    expect(keyNumbers("£90,000 or 20% by 31 January")).toEqual(["90000", "20", "31"]);
  });
});

describe("rejectCard", () => {
  const good = { front: "What is the VAT registration threshold?", back: "£90,000 (rolling 12 months)", evidence: "must register when taxable turnover exceeds £90,000 in any rolling 12-month period" };
  it("keeps a card backed by the lesson", () => {
    expect(rejectCard(good, plain)).toBeNull();
    expect(rejectCard({ front: "Standard VAT rate?", back: "20%", evidence: "Rate: Standard; Percentage: 20%." }, plain)).toBeNull();
  });
  it("rejects evidence the lesson doesn't contain", () => {
    expect(rejectCard({ ...good, evidence: "must register when taxable turnover exceeds £85,000 in any rolling 12-month period" }, plain)).toBe("evidence not in lesson");
  });
  it("rejects an answer whose number isn't in the evidence", () => {
    expect(rejectCard({ ...good, back: "£85,000" }, plain)).toBe("number not in evidence");
  });
});
