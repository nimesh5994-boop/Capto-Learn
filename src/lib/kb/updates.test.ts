import { describe, expect, it } from "vitest";
import { collectionLabel, groupUpdates, normaliseSourceUrl, parsePeriod } from "./updates";

const doc = (url: string, collection: string, day: number) => ({ url, title: url, collection, publisher: "HMRC", sourceUpdatedAt: new Date(Date.UTC(2026, 9, day)) });

describe("normaliseSourceUrl", () => {
  it("treats link spellings of the same page as one", () => {
    const want = "https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505";
    for (const u of [want, `${want}/`, `${want}#para`, `${want}?x=1`, "http://gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505", " https://gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505 "]) {
      expect(normaliseSourceUrl(u)).toBe(want);
    }
    expect(normaliseSourceUrl("http://legislation.gov.uk/ukpga/1994/23/section/3")).toBe("https://www.legislation.gov.uk/ukpga/1994/23/section/3");
  });
});

describe("groupUpdates", () => {
  const lessons = [
    { id: "directors/loans", title: "Director's loans", trackTitle: "Directors", sourceUrls: ["https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505#x", "https://www.gov.uk/x"] },
    { id: "ct/basics", title: "CT basics", trackTitle: "Corporation tax", sourceUrls: ["https://gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505/"] },
  ];
  const docs = [
    doc("https://www.gov.uk/guidance/a", "hm-revenue-customs", 3),
    doc("https://www.gov.uk/guidance/b", "hm-revenue-customs", 5),
    doc("https://www.gov.uk/hmrc-internal-manuals/company-taxation-manual/ctm61505", "company-taxation-manual", 1),
  ];
  const r = groupUpdates(docs, lessons);

  it("links each changed page to every lesson citing it, however the link is spelt", () => {
    expect(r.cited).toHaveLength(1);
    expect(r.cited[0].lessons.map((l) => l.id)).toEqual(["directors/loans", "ct/basics"]);
  });
  it("puts groups with cited pages first, newest change first within a group", () => {
    expect(r.groups.map((g) => g.collection)).toEqual(["company-taxation-manual", "hm-revenue-customs"]);
    expect(r.groups[1].docs.map((d) => d.url)).toEqual(["https://www.gov.uk/guidance/b", "https://www.gov.uk/guidance/a"]);
    expect(r.groups[0].label).toBe("Company Taxation (CTM)");
  });
  it("doesn't count a lesson twice when it cites the same page twice", () => {
    const twice = groupUpdates(docs, [{ ...lessons[1], sourceUrls: [...lessons[1].sourceUrls, lessons[1].sourceUrls[0] + "#again"] }]);
    expect(twice.cited[0].lessons).toHaveLength(1);
  });
});

describe("helpers", () => {
  it("falls back to the raw slug for an unknown collection", () => expect(collectionLabel("mystery")).toBe("mystery"));
  it("accepts only the offered periods", () => {
    expect(parsePeriod("30")).toBe(30);
    expect(parsePeriod("90")).toBe(90);
    expect(parsePeriod("365")).toBe(7);
    expect(parsePeriod(undefined)).toBe(7);
  });
});
