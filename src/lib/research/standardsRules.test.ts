import { describe, expect, it } from "vitest";
import { groupStandardsCitations, isStandardsUrl } from "./standardsRules";

const cite = (url: string, text: string, title = "T") => ({ type: "web_search_result_location", url, title, cited_text: text });

describe("isStandardsUrl", () => {
  it("accepts standard-setters and professional bodies, including subdomains", () => {
    expect(isStandardsUrl("https://www.frc.org.uk/accountants/uk-accounting-standards/frs-102")).toBe(true);
    expect(isStandardsUrl("https://www.ifrs.org/issued-standards/list-of-standards/ias-16-property-plant-and-equipment/")).toBe(true);
    expect(isStandardsUrl("https://www.icaew.com/technical/corporate-reporting/ifrs")).toBe(true);
  });
  it("rejects other sites, look-alikes and bad URLs", () => {
    expect(isStandardsUrl("https://example.com/frc.org.uk")).toBe(false);
    expect(isStandardsUrl("https://evilfrc.org.uk/x")).toBe(false);
    expect(isStandardsUrl("not a url")).toBe(false);
  });
});

describe("groupStandardsCitations", () => {
  it("groups extracts by page, drops duplicates, short scraps and other sites", () => {
    const pages = groupStandardsCitations([
      { type: "text", citations: [cite("https://www.ifrs.org/a", "An entity shall choose either the cost model or the revaluation model as its accounting policy."), cite("https://www.ifrs.org/a", "An entity shall choose either the cost model or the revaluation model as its accounting policy."), cite("https://www.ifrs.org/a", "short"), cite("https://blog.example.com/x", "This should be dropped because it is not a standard-setter page.")] },
      { type: "text", citations: [cite("https://www.icaew.com/b", "Revaluations shall be made with sufficient regularity that the carrying amount does not differ materially from fair value.", "ICAEW tracker")] },
      { type: "web_search_tool_result", citations: null },
    ]);
    expect(pages.map((p) => p.url)).toEqual(["https://www.ifrs.org/a", "https://www.icaew.com/b"]);
    expect(pages[0].text.split("\n\n")).toHaveLength(1);
    expect(pages[1].title).toBe("ICAEW tracker");
  });
  it("returns nothing when there are no usable citations", () => {
    expect(groupStandardsCitations([{ type: "text", citations: [] }])).toEqual([]);
  });
  it("caps the extracts and size kept per page", () => {
    const many = Array.from({ length: 20 }, (_, i) => cite("https://www.frc.org.uk/p", `Extract number ${i} with enough text to count as a real extract of the standard.`));
    const [p] = groupStandardsCitations([{ type: "text", citations: many }]);
    expect(p.text.split("\n\n").length).toBeLessThanOrEqual(8);
    expect(p.text.length).toBeLessThanOrEqual(2400);
  });
});
