import { describe, expect, it } from "vitest";
import { digestDue, digestIsEmpty, digestTopics, renderDigestEmail, type Digest } from "./digestRules";

const empty: Digest = { saved: [], approved: [], guidance: [], guidanceTotal: 0, lessons: [] };
const opts = { name: "Jo Bloggs", firm: "QA <Practice>", appUrl: "https://learn.chitta.cloud", color: "#a01f62" };

describe("digest rules", () => {
  it("sends at most weekly", () => {
    const now = new Date("2026-10-26T07:00:00Z");
    expect(digestDue(null, now)).toBe(true);
    expect(digestDue(new Date("2026-10-19T07:00:00Z"), now)).toBe(true);
    expect(digestDue(new Date("2026-10-22T07:00:00Z"), now)).toBe(false);
  });
  it("follows chosen topics, else the courses studied", () => {
    expect(digestTopics(["vat"], ["payroll"])).toEqual(["vat"]);
    expect(digestTopics([], ["payroll", "payroll", "vat"])).toEqual(["payroll", "vat"]);
  });
  it("knows when there's nothing to say", () => {
    expect(digestIsEmpty(empty)).toBe(true);
    expect(digestIsEmpty({ ...empty, guidanceTotal: 1 })).toBe(false);
  });
});

describe("renderDigestEmail", () => {
  it("leads with saved/approved answers that need a check, and escapes everything", () => {
    const d: Digest = {
      ...empty,
      saved: [{ queryId: "q1", title: "Smith Ltd <DLA>", changed: 2 }],
      guidance: [{ title: "VAT notice 700", url: "https://www.gov.uk/x", topics: ["vat"], updatedAt: "2026-10-20T00:00:00Z" }],
      guidanceTotal: 30,
    };
    const { subject, html } = renderDigestEmail(d, opts);
    expect(subject).toBe("Capto: 1 saved or approved answer needs a check");
    expect(html).toContain("https://learn.chitta.cloud/ask/q1");
    expect(html).toContain("Smith Ltd &lt;DLA&gt;");
    expect(html).toContain("QA &lt;Practice&gt;");
    expect(html).toContain("HMRC and Companies House updates in your topics (30)");
    expect(html).toContain("/updates?days=7");
    expect(html).toContain("Hi Jo,");
  });
  it("uses a topic subject when only guidance changed", () => {
    expect(renderDigestEmail({ ...empty, guidanceTotal: 3, guidance: [] }, opts).subject).toBe("Capto: 3 updates in your topics this week");
  });
});
