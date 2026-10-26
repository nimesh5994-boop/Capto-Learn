import { describe, expect, it } from "vitest";
import { suggestCalculators } from "./calculators";

describe("suggestCalculators", () => {
  it("points a company-extraction scenario at salary vs dividend and s455", () => {
    const ids = suggestCalculators(["Extract surplus cash by dividend, salary or a director's loan (s455)"]).map((c) => c.id);
    expect(ids).toContain("salary-dividend");
    expect(ids).toContain("s455");
  });
  it("points a farm estate at inheritance tax", () => {
    expect(suggestCalculators(["agricultural property relief and business property relief on death"])[0].id).toBe("iht");
  });
  it("orders by how often a topic comes up and caps the list", () => {
    const text = "capital gains capital gains CGT BADR dividend";
    const out = suggestCalculators([text], "", 2);
    expect(out).toHaveLength(2);
    expect(out[0].id).toBe("cgt");
  });
  it("carries the tax year into the link only when it is well formed", () => {
    expect(suggestCalculators(["IHT"], "2026/27")[0].href).toBe("/calculators?calc=iht&year=2026%2F27");
    expect(suggestCalculators(["IHT"], "next year")[0].href).toBe("/calculators?calc=iht");
  });
  it("suggests nothing when nothing matches", () => {
    expect(suggestCalculators(["hello"])).toEqual([]);
  });
});
