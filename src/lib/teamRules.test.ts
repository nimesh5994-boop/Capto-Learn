import { describe, expect, it } from "vitest";
import { domainAllowed, newJoinCode, parseDomains, parsePeople } from "./teamRules";

describe("parsePeople", () => {
  it("reads every common way of pasting people", () => {
    const { people, problems } = parsePeople(
      ["jo@firm.co.uk", "Sam Patel, sam@firm.co.uk", "Ann Lee <ann@firm.co.uk>", "ravi@firm.co.uk\tRavi Shah", "  ", "no email here", "JO@firm.co.uk"].join("\n")
    );
    expect(people).toEqual([
      { name: null, email: "jo@firm.co.uk" },
      { name: "Sam Patel", email: "sam@firm.co.uk" },
      { name: "Ann Lee", email: "ann@firm.co.uk" },
      { name: "Ravi Shah", email: "ravi@firm.co.uk" },
    ]);
    expect(problems).toEqual(["no email here"]);
  });
  it("handles several emails on one line", () => {
    expect(parsePeople("a@x.com; b@x.com, c@x.com").people.map((p) => p.email)).toEqual(["a@x.com", "b@x.com", "c@x.com"]);
  });
});

describe("domains", () => {
  it("normalises what's typed", () => {
    expect(parseDomains("@Firm.co.uk, other.com  bad domain, x")).toEqual(["firm.co.uk", "other.com", "domain"].filter((d) => d.includes(".")));
  });
  it("matches the exact domain only", () => {
    expect(domainAllowed("jo@firm.co.uk", ["firm.co.uk"])).toBe(true);
    expect(domainAllowed("jo@notfirm.co.uk", ["firm.co.uk"])).toBe(false);
    expect(domainAllowed("jo@mail.firm.co.uk", ["firm.co.uk"])).toBe(false);
  });
});

describe("newJoinCode", () => {
  it("is two groups of four easy characters", () => {
    expect(newJoinCode()).toMatch(/^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  });
});
