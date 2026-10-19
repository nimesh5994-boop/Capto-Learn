import { describe, expect, it } from "vitest";
import { ratesFor } from "./index";
import { matchRates } from "./match";

const y = ratesFor("2026/27")!;
const top = (q: string) => matchRates(q, y)[0]?.item.id;
const label = (q: string) => matchRates(q, y)[0]?.item.label ?? "";

describe("matchRates", () => {
  it("finds the figure for the questions practitioners ask", () => {
    expect(top("What is the VAT registration threshold?")).toBe("vat.registration-threshold");
    expect(top("dividend allowance 2026/27")).toBe("it.dividend-allowance");
    expect(top("how much is the personal allowance")).toBe("it.personal-allowance");
    expect(top("employer NIC rate")).toBe("nic.employer-rate");
    expect(top("VAT standard rate")).toBe("vat.standard-rate");
    expect(top("IHT nil rate band")).toBe("iht.nil-rate-band");
    expect(top("CGT annual exempt amount")).toBe("cgt.annual-exempt-amount");
    expect(label("s455 rate")).toMatch(/s455/);
    expect(label("what's the SSP rate")).toMatch(/Statutory Sick Pay/);
    expect(label("flat rate scheme limited cost trader rate")).toMatch(/limited cost trader/);
    expect(label("mileage rate for cars")).toMatch(/AMAP|mileage/i);
  });
  it("stays quiet for questions that aren't after a figure", () => {
    for (const q of ["what is a balance sheet", "how do I post a VAT journal", "can I claim VAT on a car", "explain double entry"]) expect(matchRates(q, y), q).toEqual([]);
  });
});
