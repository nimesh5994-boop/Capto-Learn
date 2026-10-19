import { describe, expect, it } from "vitest";
import { findStatuteRefs } from "./statuteRefs";

const labels = (t: string) => findStatuteRefs(t).map((r) => r.label);

describe("findStatuteRefs", () => {
  it("reads the common ways practitioners write a provision", () => {
    expect(labels("Under CTA 2010 s455 the charge is 35.75%.")).toEqual(["CTA 2010 s455"]);
    expect(labels("relief under s458 CTA 2010")).toEqual(["CTA 2010 s458"]);
    expect(labels("HMRC cites CTA10/S464ZA(6)")).toEqual(["CTA 2010 s464ZA"]);
    expect(labels("section 3 of VATA 1994 and Sch 36 FA 2008")).toEqual(["VATA 1994 s3", "FA 2008 Sch 36"]);
    expect(labels("Companies Act 2006, section 197")).toEqual(["CA 2006 s197"]);
    expect(labels("TMA 1970 s9A")).toEqual(["TMA 1970 s9A"]);
  });
  it("builds legislation.gov.uk links for sections and schedules", () => {
    expect(findStatuteRefs("CTA 2010 s455")[0].url).toBe("https://www.legislation.gov.uk/ukpga/2010/4/section/455");
    expect(findStatuteRefs("Sch 24 FA 2007")[0].url).toBe("https://www.legislation.gov.uk/ukpga/2007/11/schedule/24");
  });
  it("lists each provision once, in order, and ignores text with no Act named", () => {
    expect(labels("CTA 2010 s455 … again CTA 2010 s455 then ITEPA 2003 s62")).toEqual(["CTA 2010 s455", "ITEPA 2003 s62"]);
    expect(labels("see s455 and paragraph 4")).toEqual([]);
    expect(labels("CA 2006 para 3")).toEqual([]);
  });
});
