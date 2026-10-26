/*
 * Which Capto calculators help work out the numbers for a planning scenario. The report deliberately does not
 * calculate tax (an AI's arithmetic is not good enough to advise on), so it points the adviser at the deterministic
 * calculators instead — chosen from what the scenario and its researched issues are actually about. Pure, so it's tested.
 */

export interface CalcSuggestion {
  id: string;
  label: string;
  why: string;
  href: string;
}

const RULES: { id: string; label: string; why: string; re: RegExp }[] = [
  { id: "salary-dividend", label: "Salary vs dividend", why: "Compare pay, dividend and pension routes for a director's remuneration.", re: /dividend|salary|remuneration|extract/i },
  { id: "s455", label: "Loans to participators (s455)", why: "Work out the s455 charge on an overdrawn director's loan.", re: /\bs ?455\b|section 455|loans? to participators|director.?s loan/i },
  { id: "cgt", label: "Capital gains tax", why: "Gain on a sale, with Business Asset Disposal Relief, losses and rates.", re: /capital gains|\bCGT\b|business asset disposal|\bBADR\b|incorporation relief|disposal|earn-?out/i },
  { id: "iht", label: "Inheritance tax", why: "Estate, lifetime gifts, taper, agricultural and business property relief.", re: /inheritance tax|\bIHT\b|nil.rate band|agricultural property|business property|potentially exempt|lifetime gift/i },
  { id: "sdlt", label: "Stamp Duty Land Tax", why: "SDLT on a property transfer, including the company surcharge and reliefs.", re: /\bSDLT\b|stamp duty land/i },
  { id: "corporation-tax", label: "Corporation tax", why: "Company profits, marginal relief and associated companies.", re: /corporation tax|marginal relief|associated compan/i },
  { id: "employer-cost", label: "Employer cost and NIC", why: "Employer NIC, Employment Allowance and the cost of paying staff or directors.", re: /employer.?s? (?:NIC|national insurance)|employment allowance|class 1a/i },
  { id: "capital-allowances", label: "Capital allowances", why: "AIA, full expensing and pools.", re: /capital allowance|full expensing|annual investment allowance/i },
  { id: "income-tax", label: "Personal income tax", why: "Income tax, NIC and the effect of income splitting between spouses.", re: /income tax|higher.rate|basic.rate|additional.rate|spouse|personal allowance/i },
  { id: "property-income", label: "Property income", why: "Rental profit and the restriction on finance cost relief (section 24).", re: /rental|property income|buy.to.let|finance cost|section 24|\bs24\b|mortgage interest/i },
];

/** Calculators relevant to the given text (the situation and the researched issues), most relevant first, at most `max`. */
export function suggestCalculators(texts: string[], taxYear = "", max = 6): CalcSuggestion[] {
  const hay = texts.join("\n");
  return RULES.map((r) => ({ r, hits: (hay.match(new RegExp(r.re.source, "gi")) ?? []).length }))
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, max)
    .map(({ r }) => ({ id: r.id, label: r.label, why: r.why, href: `/calculators?calc=${r.id}${/^\d{4}\/\d{2}$/.test(taxYear) ? `&year=${encodeURIComponent(taxYear)}` : ""}` }));
}
