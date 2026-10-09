import { describe, expect, it } from "vitest";
import { pickSearchLexemes, planSync, rerank, safeHeadline, stemWord, toPassages, toTsQuery } from "./rules";

const d = (s: string) => new Date(s);

describe("planSync", () => {
  const stored = [
    { url: "/a", sourceUpdatedAt: d("2026-01-01"), removedAt: null },
    { url: "/b", sourceUpdatedAt: d("2026-01-01"), removedAt: null },
    { url: "/c", sourceUpdatedAt: d("2026-01-01"), removedAt: null },
    { url: "/gone-before", sourceUpdatedAt: d("2025-01-01"), removedAt: d("2025-06-01") },
  ];
  it("fetches only new and changed pages", () => {
    const listed = [
      { url: "/a", updatedAt: "2026-01-01T00:00:00Z" }, // unchanged
      { url: "/b", updatedAt: "2026-09-01T00:00:00Z" }, // changed
      { url: "/new", updatedAt: "2026-09-01T00:00:00Z" }, // new
      { url: "/gone-before", updatedAt: "2026-09-01T00:00:00Z" }, // came back
    ];
    expect(planSync(listed, stored, true).fetch.sort()).toEqual(["/b", "/gone-before", "/new"]);
  });
  it("retires pages GOV.UK no longer lists — but only after a complete listing", () => {
    const listed = [{ url: "/a", updatedAt: null }, { url: "/b", updatedAt: null }];
    expect(planSync(listed, stored, true).remove).toEqual(["/c"]);
    expect(planSync(listed, stored, false).remove).toEqual([]);
  });
});

describe("toPassages", () => {
  it("carries the nearest heading onto each passage", () => {
    const text = "Intro paragraph about the rule.\n\n## Conditions\n\nThe first condition applies.\n\n## Exceptions\n\nAn exception.";
    const p = toPassages("CTM61505 - Loans", text, 60);
    expect(p[0].heading).toBe("CTM61505 - Loans");
    expect(p.some((x) => x.heading === "Conditions" && x.body.includes("first condition"))).toBe(true);
    expect(p.some((x) => x.heading === "Exceptions")).toBe(true);
    expect(p.every((x) => !x.body.includes("## "))).toBe(true);
  });
});

describe("toTsQuery", () => {
  it("builds a safe OR query of distinctive terms", () => {
    expect(toTsQuery("Can I reclaim VAT on a staff party? (s455!)")).toBe("reclaim | vat | staff | party | s455");
  });
  it("returns null for nothing searchable", () => expect(toTsQuery("can I do it?")).toBeNull());
  it("strips characters that would break to_tsquery", () => expect(toTsQuery("a&b | c:* d'e")).not.toMatch(/[&:*']/));
});

describe("safeHeadline", () => {
  it("escapes HTML in the official text and keeps highlights", () => {
    expect(safeHeadline("tax <b>x</b> ««input»» tax")).toBe("tax &lt;b&gt;x&lt;/b&gt; <mark>input</mark> tax");
  });
});

describe("rerank", () => {
  it("prefers the passage covering the distinctive terms over one repeating common ones", () => {
    const generic = { heading: "Input tax basics", body: "Input tax is input tax. Input tax claims, input tax evidence, input tax law.", rank: 0.9 };
    const specific = { heading: "Staff entertainment", body: "VAT on staff parties is input tax; where clients attend, apportion.", rank: 0.2 };
    const filler = Array.from({ length: 8 }, (_, i) => ({ heading: `Other ${i}`, body: "input tax rules for something else", rank: 0.5 }));
    expect(rerank("input tax staff party clients attend", [generic, ...filler, specific])[0]).toBe(specific);
  });
});

describe("stemWord", () => {
  it("matches inflections but not lookalikes", () => {
    expect(stemWord("parties")).toBe(stemWord("party"));
    expect(stemWord("claims")).toBe(stemWord("claim"));
    expect(stemWord("attended")).toBe(stemWord("attend"));
    expect(stemWord("partial")).not.toBe(stemWord("party"));
  });
});

describe("pickSearchLexemes", () => {
  const freq = new Map([["tax", 60_000], ["input", 9_000], ["staff", 2_000], ["parti", 900], ["attend", 300]]);
  it("drops ultra-common terms, keeps distinctive ones", () => {
    expect(pickSearchLexemes(["input", "tax", "staff", "parti", "attend"], freq, 115_000).sort()).toEqual(["attend", "parti", "staff"]);
  });
  it("keeps the rarest few when everything is common", () => {
    expect(pickSearchLexemes(["tax", "input"], freq, 115_000)).toEqual(["input", "tax"]);
  });
  it("uses all terms when statistics aren't built yet", () => {
    expect(pickSearchLexemes(["tax", "staff"], new Map(), 0)).toEqual(["tax", "staff"]);
  });
});
