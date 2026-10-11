import { describe, expect, it } from "vitest";
import { canonicalLegislationUrl, clmlToText, matchesOnly, parseContents } from "./clml";

const CONTENTS = `<?xml version="1.0"?>
<Legislation xmlns="http://www.legislation.gov.uk/namespaces/legislation" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:ukm="http://www.legislation.gov.uk/namespaces/metadata">
<ukm:Metadata><dc:title>Value Added Tax Act 1994</dc:title><dc:modified>2026-07-01</dc:modified></ukm:Metadata>
<Contents>
 <ContentsTitle>Value Added Tax Act 1994</ContentsTitle>
 <ContentsPart DocumentURI="http://www.legislation.gov.uk/ukpga/1994/23/part/I">
  <ContentsNumber>PART I</ContentsNumber><ContentsTitle>The charge to tax</ContentsTitle>
  <ContentsItem ContentRef="section-24" DocumentURI="http://www.legislation.gov.uk/ukpga/1994/23/section/24"><ContentsNumber>24</ContentsNumber><ContentsTitle>Input tax and output tax.</ContentsTitle></ContentsItem>
  <ContentsItem ContentRef="section-26A" DocumentURI="http://www.legislation.gov.uk/ukpga/1994/23/section/26A"><ContentsNumber>26A</ContentsNumber><ContentsTitle>Disallowance of input tax where consideration not paid.</ContentsTitle></ContentsItem>
 </ContentsPart>
 <ContentsSchedules>
  <ContentsSchedule DocumentURI="http://www.legislation.gov.uk/ukpga/1994/23/schedule/8"><ContentsNumber>SCHEDULE 8</ContentsNumber><ContentsTitle>Zero-rating</ContentsTitle>
   <ContentsPart DocumentURI="http://www.legislation.gov.uk/ukpga/1994/23/schedule/8/part/II"><ContentsNumber>Part II</ContentsNumber><ContentsTitle>The groups</ContentsTitle></ContentsPart>
  </ContentsSchedule>
 </ContentsSchedules>
</Contents></Legislation>`;

const SECTION = `<Legislation><ukm:Metadata><dc:modified>2026-07-01</dc:modified></ukm:Metadata>
<Primary><Body><P1group><Title>Input tax and output tax.</Title>
<P1><Pnumber>24</Pnumber><P1para>
 <P2><Pnumber>1</Pnumber><P2para><Text>Subject to the following provisions of this section, &#x201C;input tax&#x201D;, in relation to a taxable person, means the following tax<CommentaryRef Ref="c1"/>, that is to say&#x2014;</Text>
  <P3><Pnumber>a</Pnumber><P3para><Text>VAT on the supply to him of any goods or services;</Text></P3para></P3>
 </P2para></P2>
</P1para></P1></P1group></Body></Primary>
<Commentaries><Commentary id="c1"><Para><Text>Words substituted by Finance Act 2003</Text></Para></Commentary></Commentaries></Legislation>`;

describe("parseContents", () => {
  const c = parseContents(CONTENTS);
  it("reads the Act title and last-modified date", () => {
    expect(c.title).toBe("Value Added Tax Act 1994");
    expect(c.modified).toBe("2026-07-01");
  });
  it("lists sections and whole schedules, not parts", () => {
    expect(c.provisions.map((p) => p.url)).toEqual([
      "https://www.legislation.gov.uk/ukpga/1994/23/section/24",
      "https://www.legislation.gov.uk/ukpga/1994/23/section/26A",
      "https://www.legislation.gov.uk/ukpga/1994/23/schedule/8",
    ]);
  });
  it("labels provisions the way practitioners cite them", () => {
    expect(c.provisions.map((p) => `${p.label} ${p.title}`)).toEqual(["s 24 Input tax and output tax", "s 26A Disallowance of input tax where consideration not paid", "Sch 8 Zero-rating"]);
  });
  it("can be limited to particular schedules of a Finance Act", () => {
    expect(parseContents(CONTENTS, ["schedule/8"]).provisions.map((p) => p.label)).toEqual(["Sch 8"]);
  });
});

describe("clmlToText", () => {
  const t = clmlToText(SECTION);
  it("keeps numbering and wording, drops commentary and metadata", () => {
    expect(t.title).toBe("Input tax and output tax.");
    expect(t.text).toContain("(1) Subject to the following provisions of this section, “input tax”");
    expect(t.text).toContain("(a) VAT on the supply to him of any goods or services;");
    expect(t.text).not.toContain("Finance Act 2003");
    expect(t.modified).toBe("2026-07-01");
  });
});

describe("canonicalLegislationUrl", () => {
  it("normalises scheme, host and suffixes", () => {
    expect(canonicalLegislationUrl("http://legislation.gov.uk/ukpga/1994/23/section/24/data.xml")).toBe("https://www.legislation.gov.uk/ukpga/1994/23/section/24");
  });
});

describe("matchesOnly", () => {
  const base = "https://www.legislation.gov.uk/ukpga/2004/12";
  it("matches section ranges (inserted sections included)", () => {
    expect(matchesOnly(`${base}/section/150`, "section/149-284")).toBe(true);
    expect(matchesOnly(`${base}/section/150A`, "section/149-284")).toBe(true);
    expect(matchesOnly(`${base}/section/12`, "section/149-284")).toBe(false);
  });
  it("matches a whole schedule but not a lookalike number", () => {
    expect(matchesOnly(`${base}/schedule/28`, "schedule/28")).toBe(true);
    expect(matchesOnly(`${base}/schedule/280`, "schedule/28")).toBe(false);
  });
});
