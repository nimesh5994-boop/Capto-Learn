"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { TAX_YEARS, ratesFor } from "@/content/rates";
import { CorporationTaxCalc } from "./CorporationTaxCalc";
import { IncomeTaxCalc } from "./IncomeTaxCalc";
import { CapitalGainsCalc } from "./CapitalGainsCalc";
import { InheritanceTaxCalc } from "./InheritanceTaxCalc";
import styles from "./calc.module.css";

const TABS = [
  { id: "income-tax", label: "Income tax" },
  { id: "corporation-tax", label: "Corporation tax" },
  { id: "cgt", label: "Capital gains tax" },
  { id: "iht", label: "Inheritance tax" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
}

export function Calculators({ defaultYear, currentYear, initialTab }: { defaultYear: string; currentYear: string; initialTab?: string }) {
  const [taxYear, setTaxYear] = useState(defaultYear);
  const [tab, setTab] = useState<TabId>(TABS.some((t) => t.id === initialTab) ? (initialTab as TabId) : "income-tax");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const year = ratesFor(taxYear) ?? TAX_YEARS[0];

  const select = (id: TabId) => {
    setTab(id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", id);
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = TABS.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div>
          <label htmlFor="calc-tax-year">Tax year</label>
          <select id="calc-tax-year" className={styles.yearSelect} value={taxYear} onChange={(e) => setTaxYear(e.target.value)}>
            {TAX_YEARS.map((y) => (
              <option key={y.taxYear} value={y.taxYear}>
                {y.taxYear}
                {y.taxYear === currentYear ? " (current)" : ""}
              </option>
            ))}
          </select>
        </div>
        <p className="small faint" style={{ flex: "1 1 260px" }}>
          Figures for {year.taxYear} ({longDate(year.startDate)} to {longDate(year.endDate)}). Results update as you type.
        </p>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Calculators" onKeyDown={onKey}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => select(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels stay mounted so each calculator keeps its inputs when you switch tabs. */}
      <div role="tabpanel" id="panel-income-tax" aria-labelledby="tab-income-tax" hidden={tab !== "income-tax"}>
        <IncomeTaxCalc taxYear={year.taxYear} />
      </div>
      <div role="tabpanel" id="panel-corporation-tax" aria-labelledby="tab-corporation-tax" hidden={tab !== "corporation-tax"}>
        <CorporationTaxCalc taxYear={year.taxYear} />
      </div>
      <div role="tabpanel" id="panel-cgt" aria-labelledby="tab-cgt" hidden={tab !== "cgt"}>
        <CapitalGainsCalc taxYear={year.taxYear} />
      </div>
      <div role="tabpanel" id="panel-iht" aria-labelledby="tab-iht" hidden={tab !== "iht"}>
        <InheritanceTaxCalc taxYear={year.taxYear} />
      </div>

      <div className={`card card-pad small faint ${styles.footer}`}>
        A calculation aid for training and checking — not advice. Rates verified against GOV.UK on {longDate(year.checkedOn)}.
      </div>
    </>
  );
}
