import { describe, expect, it } from "vitest";
import { coverageNote, extractCaseMentions, fclJudgmentUrl, findCaseRefs, mergeCaseMentions, nameBefore, normaliseName, type Citation } from "./caseRefs";

const one = (t: string) => {
  const refs = findCaseRefs(t);
  expect(refs).toHaveLength(1);
  return refs[0];
};

// Real sentences from HMRC manuals and GOV.UK guidance in the Capto knowledge base.
describe("findCaseRefs: real HMRC manual text", () => {
  it.each([
    ["The decision in The Commissioners for HM Revenue and Customs v Benham (Specialist Cars) Limited [2017] UKUT 0389 (TCC) confirmed that", "The Commissioners for HM Revenue and Customs v Benham (Specialist Cars) Limited", ["[2017] UKUT 389 (TCC)"]],
    ["The case of R v Farquhar [2008] EWCA Crim 806 indicates that a confiscation order", "R v Farquhar", ["[2008] EWCA Crim 806"]],
    ["under the principle established in McKnight v Sheppard [1999] 71TC419, where Lord Hoffman commented", "McKnight v Sheppard", ["(1999) 71 TC 419"]],
    ["discussion of the scope of Section 48 in the Court of Appeal decision in Goodbrand v Loffland Brothers North Sea Inc. ([1998]STC930)", "Goodbrand v Loffland Brothers North Sea Inc", ["[1998] STC 930"]],
    ["the allowance may not be forgone in favour of an alternative deduction (see Wilcock v Frigate Investments Ltd [1981] 55TC530)", "Wilcock v Frigate Investments Ltd", ["(1981) 55 TC 530"]],
    ["on the expiry of the borrower's right (Jay's the Jewellers Ltd v CIR [1947] 29 TC 274)", "Jay's the Jewellers Ltd v CIR", ["(1947) 29 TC 274"]],
    ["In Pearce v Woodall-Duckham Ltd [1978] 51 TC 271, the company changed its method", "Pearce v Woodall-Duckham Ltd", ["(1978) 51 TC 271"]],
    ["the Supreme Court in Balhousie Holdings Limited [2021] UKSC 11, the disposal", "Balhousie Holdings Limited", ["[2021] UKSC 11"]],
    ["UK Case law BAA Plc [2013] EWCA Civ 112 In 2006 a Spanish consortium", "BAA Plc", ["[2013] EWCA Civ 112"]],
    ["Norseman Gold PLC v HMRC [2016] UKUT 69 (TCC) In the Norseman case", "Norseman Gold PLC v HMRC", ["[2016] UKUT 69 (TCC)"]],
    ["African Consolidated Resources v HMRC [2014] UKFTT 580 This case involved", "African Consolidated Resources v HMRC", ["[2014] UKFTT 580"]],
    ["N Brown Group PLC and JD Williams & Company Ltd- [2019] TC07022 This case concerned input VAT", "N Brown Group PLC and JD Williams & Company Ltd", ["TC07022"]],
    ["More recent cases are Best Images Ltd [2010] UKFTT TC00480 and", "Best Images Ltd", ["TC00480"]],
    ["perty arose in the case of Kempe and another (personal representative of Lyon, deceased) v Inland Revenue Commissioners [2004] STC (SCD) 467", "Kempe and another (personal representative of Lyon, deceased) v Inland Revenue Commissioners", ["[2004] STC (SCD) 467"]],
    ["The Special Commissioners in Land Management Ltd v Fox [2002] SpC306 found on the facts", "Land Management Ltd v Fox", ["SpC 306"]],
    ["the issue was also discussed in Silk v Fletcher [2000] SpC 201, see BIM45725.", "Silk v Fletcher", ["SpC 201"]],
    ["This was confirmed in the decision of Greenbank Holidays Ltd v HMRC Commissioners [2010] UK FTT 109 (TC) (“Greenbank”)", "Greenbank Holidays Ltd v HMRC Commissioners", ["[2010] UKFTT 109 (TC)"]],
    ["This is explained at ERSM110010 and in Abbott v Philbin [1961] AC 352. No actual liability arises", "Abbott v Philbin", ["[1961] AC 352"]],
    ["(Marreco v Richardson [1908] 2KB 584). The issuing of a cheque", "Marreco v Richardson", ["[1908] 2 KB 584"]],
    ["Following the decision in Gleneagles Hotel plc (VTD 13196)", "Gleneagles Hotel plc", ["VTD 13196"]],
    ["In Strong & Co [of Romsey] v Woodifield [[1906] 5 TC 215, see BIM38510]", "Strong & Co of Romsey v Woodifield", ["(1906) 5 TC 215"]],
    ["the GMAC case (VTD 17990 and [2004] EWHC 192 Ch) provided guidance", null, ["[2004] EWHC 192 (Ch)"]],
  ])("%s", (text, name, citations) => {
    const r = one(text);
    expect(r.name).toBe(name);
    expect(r.citations).toEqual(citations);
  });

  it("keeps parallel citations of one decision together", () => {
    const r = one("Customs and Excise Commissioners v Glassborow [1974] STC 142; [1975] QB 465; [1974] 1 All ER 1041.");
    expect(r.name).toBe("Customs and Excise Commissioners v Glassborow");
    expect(r.citations).toEqual(["[1974] STC 142", "[1975] QB 465", "[1974] 1 All ER 1041"]);
  });

  it("treats a list of tribunal numbers as separate decisions, and drops numbers no source names", () => {
    expect(findCaseRefs("The Special Commissioners in the building society conversion cases (SpC 239, SpC 240, SpC 241, and SpC 242 - see BIM35645)")).toEqual([]);
  });

  it("never lets an earlier citation's text into the next name", () => {
    const refs = findCaseRefs("Levene v CIR [1928] 13 TC 486\n\nLysaght v CIR [1928] 13 TC 511 and Denham & Co 1883 25 Ch D 752 and Moxham v Grant [1900] 1 QB 88");
    expect(refs.map((r) => r.name)).toEqual(["Levene v CIR", "Lysaght v CIR", "Moxham v Grant"]);
  });

  it("reads markdown emphasis and lesson-style citations", () => {
    expect(findCaseRefs("**Jones v Garnett** [2007] UKHL 35 ('Arctic Systems')").map((r) => r.name)).toEqual(["Jones v Garnett"]);
    expect(one("In Autoclenz Ltd v Belcher [2011] UKSC 41 the Supreme Court said").url).toBe("https://caselaw.nationalarchives.gov.uk/uksc/2011/41");
  });

  it("is conservative about names: no name from ordinary prose", () => {
    expect(nameBefore("as explained in the guidance ")).toBeNull();
    expect(nameBefore("Dr Beynon (")).toBeNull(); // not "X v Y", not a company: citation only
    expect(nameBefore("4.4 Coll v Mooney ")).toBe("Coll v Mooney");
    expect(findCaseRefs("Dr Beynon ([2004] UKHL 53) at para 33")).toEqual([
      expect.objectContaining({ name: null, citations: ["[2004] UKHL 53"], court: "UKHL", linkKind: "search" }),
    ]);
  });

  it("ignores law-report citations with no case name, and text with no citations", () => {
    expect(findCaseRefs("as an example see the report of this case in [1983] 1 WLR 256")).toEqual([]);
    expect(findCaseRefs("Regulation 58(2) of the Social Security Contributions Regulations (2001) (SI 2001 No 1004)")).toEqual([]);
    expect(findCaseRefs("Section 3 VATA 1994 and the 2026 Budget")).toEqual([]);
  });
});

describe("Find Case Law links", () => {
  const url = (t: string) => one(t).url;
  it("builds judgment links from neutral citations, per court", () => {
    expect(url("X v Y [2021] UKSC 1")).toBe("https://caselaw.nationalarchives.gov.uk/uksc/2021/1");
    expect(url("X v Y [2020] UKPC 3")).toBe("https://caselaw.nationalarchives.gov.uk/ukpc/2020/3");
    expect(url("X v Y [2020] EWCA Civ 12")).toBe("https://caselaw.nationalarchives.gov.uk/ewca/civ/2020/12");
    expect(url("X v Y [2019] EWCA Crim 7")).toBe("https://caselaw.nationalarchives.gov.uk/ewca/crim/2019/7");
    expect(url("X v Y [2018] EWHC 10 (Ch)")).toBe("https://caselaw.nationalarchives.gov.uk/ewhc/ch/2018/10");
    expect(url("X v Y [2016] EWHC 485 (Admin)")).toBe("https://caselaw.nationalarchives.gov.uk/ewhc/admin/2016/485");
    expect(url("X v Y [2023] EWHC 2 (KB)")).toBe("https://caselaw.nationalarchives.gov.uk/ewhc/kb/2023/2");
    expect(url("X v Y [2016] UKUT 123 (TCC)")).toBe("https://caselaw.nationalarchives.gov.uk/ukut/tcc/2016/123");
    expect(url("X v Y [2023] UKUT 17 (LC)")).toBe("https://caselaw.nationalarchives.gov.uk/ukut/lc/2023/17");
    expect(url("X v Y [2019] UKFTT 45 (TC)")).toBe("https://caselaw.nationalarchives.gov.uk/ukftt/tc/2019/45");
    expect(url("X v Y [2022] EAT 9")).toBe("https://caselaw.nationalarchives.gov.uk/eat/2022/9");
  });
  it("falls back to a search before a court's Find Case Law coverage, without a chamber, or from 2025", () => {
    expect(url("Pertemps Recruitment Partnership Ltd v HMRC [2011] UKUT 272")).toBe("https://caselaw.nationalarchives.gov.uk/search?query=Pertemps%20Recruitment%20Partnership%20Ltd%20v%20HMRC");
    expect(url("Greenbank Holidays Ltd v HMRC [2011] UKUT 155 (TCC)")).toBe("https://caselaw.nationalarchives.gov.uk/search?query=Greenbank%20Holidays%20Ltd%20v%20HMRC");
    expect(url("X v Y [2025] UKSC 4")).toBe("https://caselaw.nationalarchives.gov.uk/search?query=%5B2025%5D%20UKSC%204");
    expect(url("Ransom v Higgs (1974) 50 TC 1")).toBe("https://caselaw.nationalarchives.gov.uk/search?query=Ransom%20v%20Higgs");
    expect(url("IRC v Laird [2003] UKHL 54")).toBe("https://caselaw.nationalarchives.gov.uk/search?query=IRC%20v%20Laird");
    // No chamber given: the address can't be built, but Find Case Law covers the year, so search the citation.
    const perrin = one("Perrin v HMRC [2018] UKUT 156");
    expect(perrin.url).toBe("https://caselaw.nationalarchives.gov.uk/search?query=%5B2018%5D%20UKUT%20156");
    expect(coverageNote(perrin.court, perrin.year, perrin.linkKind)).toBeNull();
  });
  it("labels links that may not find anything", () => {
    expect(coverageNote("UKSC", 2021, "judgment")).toBeNull();
    expect(coverageNote("UKSC", 2025, "search")).toBeNull();
    expect(coverageNote("UKHL", 2003, "search")).toBe("May not be on Find Case Law");
    expect(coverageNote(null, 1974, "search")).toBe("May not be on Find Case Law");
    expect(coverageNote("CSIH", 2010, "search")).toBe("Scottish courts aren't on Find Case Law");
    expect(one("Smith v HMRC [2010] CSIH 12").linkKind).toBe("search");
  });
  it("only builds a judgment link for neutral citations", () => {
    const report: Citation = { kind: "report", text: "[2005] STC 65", key: "[2005] stc 65", year: 2005 };
    expect(fclJudgmentUrl(report)).toBeNull();
  });
});

describe("merging and normalising", () => {
  it("treats HMRC, IRC and Revenue and Customs Commissioners as one party, and Ltd as Limited", () => {
    expect(normaliseName("Zipvit Ltd v Revenue and Customs Commissioners")).toBe(normaliseName("Zipvit Limited v HMRC"));
    expect(normaliseName("Smith (Inspector of Taxes) v Jones")).toBe(normaliseName("Smith v Jones"));
    expect(normaliseName("Edwards v Bairstow & Harrison")).toBe(normaliseName("Edwards v Bairstow and Harrison"));
  });
  it("merges mentions that share a citation or the same name and year", () => {
    const text = [
      "Norseman Gold PLC v HMRC [2016] UKUT 69 (TCC).",
      "Later, in Norseman Gold plc v Revenue and Customs Commissioners [2016] UKUT 69, the Tribunal said",
      "See Morgan v Tate & Lyle Ltd [1954] 35 TC 367.",
      "Morgan v Tate and Lyle Ltd [1954] 35 TC 366 at page 401.",
      "Different case: Morgan v Tate & Lyle Ltd [1960] 1 WLR 1.",
    ].join("\n");
    const groups = mergeCaseMentions(extractCaseMentions(text));
    expect(groups.map((g) => [g.ref.name, g.ref.citations, g.members.length])).toEqual([
      ["Norseman Gold PLC v HMRC", ["[2016] UKUT 69 (TCC)"], 2],
      ["Morgan v Tate & Lyle Ltd", ["(1954) 35 TC 367", "(1954) 35 TC 366"], 2],
      ["Morgan v Tate & Lyle Ltd", ["[1960] 1 WLR 1"], 1],
    ]);
    expect(groups[0].ref.key).toBe("[2016] ukut 69");
    expect(groups[0].ref.url).toBe("https://caselaw.nationalarchives.gov.uk/ukut/tcc/2016/69");
  });
  it("lists each case once, in order of first appearance", () => {
    const refs = findCaseRefs("Ransom v Higgs (1974) 50 TC 1 … Autoclenz Ltd v Belcher [2011] UKSC 41 … again Ransom v Higgs [1974] 50 TC 1");
    expect(refs.map((r) => r.name)).toEqual(["Ransom v Higgs", "Autoclenz Ltd v Belcher"]);
  });
});

describe("Ask Capto answers", () => {
  it("finds cases in the answer text and the quotations behind it (answerText)", async () => {
    const { answerText } = await import("@/lib/research/statuteRefs");
    const text = answerText({
      shortAnswer: "Probably employment, following HMRC v Atholl House Productions Ltd [2022] EWCA Civ 501.",
      points: [{ heading: "Control", text: "Mutuality matters.", citations: [{ quote: "In Ready Mixed Concrete (South East) Ltd v Minister of Pensions and National Insurance [1968] 2 QB 497 the court" }] }],
      caveats: [],
    });
    expect(findCaseRefs(text).map((r) => [r.name, r.linkKind])).toEqual([
      ["HMRC v Atholl House Productions Ltd", "judgment"],
      ["Ready Mixed Concrete (South East) Ltd v Minister of Pensions and National Insurance", "search"],
    ]);
  });
});
