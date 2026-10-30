import { describe, expect, it } from "vitest";
import { EVENTS, eventBySlug, isFeatured, EVENT_AREAS, MEASURE_STATUS } from "./index";

const OFFICIAL = /^https:\/\/(www\.gov\.uk|assets\.publishing\.service\.gov\.uk)\//;

describe("events content", () => {
  it("has unique event slugs and is sorted newest first", () => {
    expect(new Set(EVENTS.map((e) => e.slug)).size).toBe(EVENTS.length);
    const dates = EVENTS.map((e) => e.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  for (const e of EVENTS) {
    describe(e.slug, () => {
      it("has valid dates and a checked date on or after the event", () => {
        expect(Number.isNaN(Date.parse(e.date))).toBe(false);
        expect(e.checkedOn >= e.date).toBe(true);
      });

      it("has unique measure ids", () => {
        const ids = e.measures.map((m) => m.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it("backs every measure with at least one official GOV.UK source", () => {
        for (const m of e.measures) {
          expect(m.sources.length, m.id).toBeGreaterThan(0);
          for (const s of m.sources) expect(s.url, `${m.id}: ${s.url}`).toMatch(OFFICIAL);
        }
        for (const s of e.officialDocuments) expect(s.url).toMatch(OFFICIAL);
      });

      it("fills in every measure and uses known areas and statuses", () => {
        for (const m of e.measures) {
          for (const f of [m.title, m.what, m.effective, m.forAccountants, m.forClients]) expect(f.trim().length, m.id).toBeGreaterThan(10);
          expect(EVENT_AREAS[m.area], m.id).toBeTruthy();
          expect(MEASURE_STATUS[m.status], m.id).toBeTruthy();
        }
      });

      it("has headlines, and a limits statement", () => {
        expect(e.headlines.length).toBeGreaterThan(0);
        expect(e.limits.length).toBeGreaterThan(40);
      });
    });
  }

  it("finds an event by slug", () => {
    expect(eventBySlug("autumn-budget-2026")?.title).toBe("Autumn Budget 2026");
    expect(eventBySlug("nope")).toBeUndefined();
  });

  it("features an event for 60 days", () => {
    const e = EVENTS[0];
    expect(isFeatured(e, new Date("2026-11-15T12:00:00Z"))).toBe(true);
    expect(isFeatured(e, new Date("2027-02-01T12:00:00Z"))).toBe(false);
  });
});
