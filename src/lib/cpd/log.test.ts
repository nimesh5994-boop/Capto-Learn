import { describe, expect, it } from "vitest";
import { cleanManualEntry, cpdCsv, formatMinutes, summariseByYear, type CpdRow, type ManualInput } from "./log";

const NOW = new Date("2026-10-24T10:00:00Z");
const ok: ManualInput = { date: "2026-10-01", title: "ICAEW tax update webinar", provider: "ICAEW", kind: "webinar", hours: "1", minutes: "30", reflection: "Learned about the new rules." };
const row = (o: Partial<CpdRow>): CpdRow => ({ source: "manual", id: "1", date: new Date("2026-03-01T12:00:00Z"), title: "t", provider: "", kind: "course", minutes: 60, reflection: "", link: "", ...o });

describe("cleanManualEntry", () => {
  it("accepts a good entry and converts to minutes", () => {
    const r = cleanManualEntry(ok, NOW);
    expect(r.ok && r.value.minutes).toBe(90);
  });
  it("rejects missing title, bad or future dates, and silly durations", () => {
    expect(cleanManualEntry({ ...ok, title: " " }, NOW).ok).toBe(false);
    expect(cleanManualEntry({ ...ok, date: "01/10/2026" }, NOW).ok).toBe(false);
    expect(cleanManualEntry({ ...ok, date: "2026-12-25" }, NOW).ok).toBe(false);
    expect(cleanManualEntry({ ...ok, hours: "0", minutes: "2" }, NOW).ok).toBe(false);
    expect(cleanManualEntry({ ...ok, hours: "30", minutes: "" }, NOW).ok).toBe(false);
    expect(cleanManualEntry({ ...ok, hours: "-1", minutes: "" }, NOW).ok).toBe(false);
  });
  it("treats an unknown type as other", () => {
    const r = cleanManualEntry({ ...ok, kind: "nonsense" }, NOW);
    expect(r.ok && r.value.kind).toBe("other");
  });
});

describe("summariseByYear", () => {
  it("groups by calendar year, splitting lessons from logged activity", () => {
    const s = summariseByYear([row({ minutes: 60 }), row({ source: "lesson", kind: "structured", minutes: 30 }), row({ date: new Date("2025-06-01T12:00:00Z"), minutes: 120 })]);
    expect(s.map((y) => y.year)).toEqual([2026, 2025]);
    expect(s[0]).toMatchObject({ lessonMinutes: 30, manualMinutes: 60, totalMinutes: 90, entries: 2 });
  });
});

describe("formatMinutes", () => {
  it("reads naturally", () => {
    expect([formatMinutes(45), formatMinutes(180), formatMinutes(210)]).toEqual(["45 min", "3 h", "3 h 30 min"]);
  });
});

describe("cpdCsv", () => {
  it("quotes awkward text and defuses spreadsheet formulas", () => {
    const csv = cpdCsv([row({ title: '=HYPERLINK("x")', reflection: "line one\nline two, with comma" })], "https://x.test");
    expect(csv).toContain(`"'=HYPERLINK(""x"")"`);
    expect(csv).toContain('"line one\nline two, with comma"');
    expect(csv.endsWith("\r\n")).toBe(true);
  });
  it("lists newest first with hours to two places", () => {
    const csv = cpdCsv([row({ date: new Date("2025-01-01T12:00:00Z"), title: "old" }), row({ date: new Date("2026-01-01T12:00:00Z"), title: "new", minutes: 90 })], "");
    const lines = csv.trim().split("\r\n");
    expect(lines[1]).toContain("new");
    expect(lines[1]).toContain("1.50");
  });
});
