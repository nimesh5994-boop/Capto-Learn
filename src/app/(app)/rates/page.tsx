import Link from "next/link";
import { ExternalLink, Search } from "lucide-react";
import { requirePermission } from "@/lib/auth/dal";
import { currentTaxYear, ratesFor, TAX_YEARS, type RateItem } from "@/content/rates";
import { date } from "@/lib/format";

export const metadata = { title: "Rates and allowances" };

/** The same figure in the previous year, for the "changed" marker. */
function previous(taxYear: string, id: string): RateItem | undefined {
  const i = TAX_YEARS.findIndex((y) => y.taxYear === taxYear);
  const prev = i >= 0 ? TAX_YEARS[i + 1] : undefined;
  return prev?.sections.flatMap((s) => s.items).find((x) => x.id === id);
}

export default async function RatesPage({ searchParams }: { searchParams: Promise<{ year?: string; q?: string }> }) {
  await requirePermission("learning.view");
  const sp = await searchParams;
  const current = currentTaxYear();
  const year = ratesFor(sp.year ?? "") ?? ratesFor(current) ?? TAX_YEARS[0];
  const q = (sp.q ?? "").trim().toLowerCase().slice(0, 100);
  const words = q.split(/\s+/).filter(Boolean);
  const matches = (i: RateItem, section: string) => words.every((w) => `${section} ${i.label} ${i.value} ${i.note ?? ""}`.toLowerCase().includes(w));
  const sections = year.sections.map((s) => ({ ...s, items: s.items.filter((i) => !words.length || matches(i, s.title)) })).filter((s) => s.items.length);
  const prevLabel = TAX_YEARS[TAX_YEARS.findIndex((y) => y.taxYear === year.taxYear) + 1]?.taxYear;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Rates and allowances {year.taxYear}</h1>
          <p className="muted" style={{ maxWidth: 780 }}>
            The figures practitioners look up most, for {date(year.startDate)} to {date(year.endDate)}. Every figure links to the GOV.UK page it was checked against on {date(year.checkedOn)}
            {prevLabel ? `, and figures that changed from ${prevLabel} are marked` : ""}. Contains public sector information licensed under the Open Government Licence v3.0.
          </p>
        </div>
        <Link href="/calculators" className="btn">
          Calculators
        </Link>
      </div>

      <form className="card card-pad row" style={{ gap: 8, flexWrap: "wrap", marginBottom: 14 }} action="/rates">
        <select name="year" defaultValue={year.taxYear} aria-label="Tax year" style={{ width: "auto" }}>
          {TAX_YEARS.map((y) => (
            <option key={y.taxYear} value={y.taxYear}>
              {y.taxYear}
              {y.taxYear === current ? " (current)" : ""}
            </option>
          ))}
        </select>
        <input name="q" defaultValue={sp.q ?? ""} placeholder="Find a rate, e.g. dividend, SSP, AIA, mileage" aria-label="Find a rate" style={{ flex: "1 1 220px" }} />
        <button className="btn btn-primary">
          <Search size={14} /> Show
        </button>
      </form>

      {!words.length && (
        <nav className="row small" style={{ gap: 6, flexWrap: "wrap", marginBottom: 14 }} aria-label="Sections">
          {year.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="pill">
              {s.title}
            </a>
          ))}
        </nav>
      )}

      {sections.length === 0 ? (
        <div className="card card-pad small muted">No figure matches “{sp.q}”.</div>
      ) : (
        <div className="stack" style={{ gap: 14 }}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="card" style={{ overflowX: "auto", scrollMarginTop: 80 }}>
              <h2 style={{ margin: 0, padding: "14px 16px 4px", fontSize: 17 }}>{s.title}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>{year.taxYear}</th>
                    {prevLabel && <th>{prevLabel}</th>}
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {s.items.map((i) => {
                    const prev = prevLabel ? previous(year.taxYear, i.id) : undefined;
                    const changed = !!prev && prev.value !== i.value;
                    return (
                      <tr key={i.id}>
                        <td style={{ minWidth: 200 }}>
                          {i.label}
                          {i.note && <div className="small faint">{i.note}</div>}
                        </td>
                        <td style={{ minWidth: 120 }}>
                          <strong>{i.value}</strong>
                          {changed && (
                            <span className="pill pill-viewed" style={{ marginLeft: 6 }}>
                              Changed
                            </span>
                          )}
                        </td>
                        {prevLabel && <td className="small muted">{prev?.value ?? "—"}</td>}
                        <td className="small">
                          <a href={i.source.url} target="_blank" rel="noopener noreferrer" title={i.source.title}>
                            GOV.UK <ExternalLink size={11} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          ))}
        </div>
      )}
      <div className="card card-pad small faint" style={{ marginTop: 14 }}>
        Rates change at Budgets and occasionally mid-year (for example HMRC&apos;s official rate of interest). Check the linked GOV.UK page before relying on a figure for client work.
      </div>
    </>
  );
}
