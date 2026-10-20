"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TAX_YEARS, ratesFor } from "@/content/rates";
import { entries as personal } from "./registry/personal";
import { entries as employment } from "./registry/employment";
import { entries as business } from "./registry/business";
import { entries as capital } from "./registry/capital";
import { GROUP_LABELS, GROUP_SUMMARIES, type CalcEntry, type CalcGroup } from "./registry/types";
import styles from "./calc.module.css";

const GROUPS: { group: CalcGroup; entries: CalcEntry[] }[] = (
  [
    { group: "personal", entries: personal },
    { group: "employment", entries: employment },
    { group: "business", entries: business },
    { group: "capital", entries: capital },
  ] as const
).filter((g) => g.entries.length);
const ALL = GROUPS.flatMap((g) => g.entries);

/** Old ?tab= links (before the hub) still open the right calculator. */
const LEGACY: Record<string, string> = { "income-tax": "income-tax", "corporation-tax": "corporation-tax", cgt: "cgt", iht: "iht" };

function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/London" });
}

export function Calculators({ defaultYear, currentYear, initialCalc }: { defaultYear: string; currentYear: string; initialCalc?: string }) {
  const [taxYear, setTaxYear] = useState(defaultYear);
  const start = ALL.find((c) => c.id === (initialCalc && (LEGACY[initialCalc] ?? initialCalc)))?.id ?? ALL[0].id;
  const [active, setActive] = useState(start);
  // Calculators you've opened stay mounted, so switching back keeps your inputs.
  const [opened, setOpened] = useState<string[]>([start]);
  const year = ratesFor(taxYear) ?? TAX_YEARS[0];
  const groupOf = (id: string) => GROUPS.find((g) => g.entries.some((c) => c.id === id))?.group;
  // Areas open in the list: the one holding the current calculator starts open; others expand on click.
  const [openGroups, setOpenGroups] = useState<CalcGroup[]>(() => [groupOf(start)].filter((g): g is CalcGroup => !!g));
  const mainRef = useRef<HTMLDivElement>(null);
  const toggleGroup = (g: CalcGroup) => setOpenGroups((o) => (o.includes(g) ? o.filter((x) => x !== g) : [...o, g]));

  const select = (id: string) => {
    setActive(id);
    const g = groupOf(id);
    if (g) setOpenGroups((o) => (o.includes(g) ? o : [...o, g]));
    // Bring the chosen calculator into view from its top, wherever the list was scrolled to.
    requestAnimationFrame(() => {
      const top = mainRef.current?.getBoundingClientRect().top;
      if (top !== undefined && (top < 0 || top > window.innerHeight / 2)) window.scrollTo({ top: window.scrollY + top - 80, behavior: "smooth" });
    });
    setOpened((o) => (o.includes(id) ? o : [...o, id]));
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("calc", id);
      url.searchParams.delete("tab");
      window.history.replaceState(null, "", url);
    } catch {
      /* ignore */
    }
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
        <div className={styles.pickerMobile}>
          <label htmlFor="calc-pick">Calculator</label>
          <select id="calc-pick" value={active} onChange={(e) => select(e.target.value)}>
            {GROUPS.map((g) => (
              <optgroup key={g.group} label={GROUP_LABELS[g.group]}>
                {g.entries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <p className="small faint" style={{ flex: "1 1 260px" }}>
          Figures for {year.taxYear} ({longDate(year.startDate)} to {longDate(year.endDate)}). Results update as you type.
        </p>
      </div>

      <div className={styles.hub}>
        {/* The list scrolls on its own; the chosen calculator stays where it is. */}
        <nav className={styles.hubNav} aria-label="Calculators">
          {GROUPS.map((g) => {
            const open = openGroups.includes(g.group);
            const hasActive = g.entries.some((c) => c.id === active);
            return (
              <div key={g.group} className={`${styles.hubGroup} ${hasActive ? styles.hubGroupCurrent : ""}`}>
                <button type="button" className={styles.hubGroupHead} aria-expanded={open} aria-controls={`calc-group-${g.group}`} onClick={() => toggleGroup(g.group)}>
                  <span>
                    <span className={styles.hubGroupLabel}>
                      {GROUP_LABELS[g.group]} <span className={styles.hubCount}>{g.entries.length}</span>
                    </span>
                    {!open && <span className={styles.hubGroupSummary}>{GROUP_SUMMARIES[g.group]}</span>}
                  </span>
                  <ChevronDown size={15} className={`${styles.hubChevron} ${open ? styles.hubChevronOpen : ""}`} aria-hidden />
                </button>
                {open && (
                  <div id={`calc-group-${g.group}`} className={styles.hubItems}>
                    {g.entries.map((c) => (
                      <button key={c.id} type="button" className={`${styles.hubItem} ${active === c.id ? styles.hubItemActive : ""}`} aria-current={active === c.id ? "page" : undefined} onClick={() => select(c.id)}>
                        <span className={styles.hubItemLabel}>{c.label}</span>
                        <span className={styles.hubItemSummary}>{c.summary}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className={styles.hubMain} ref={mainRef}>
          {ALL.filter((c) => opened.includes(c.id)).map((c) => (
            <section key={c.id} aria-label={c.label} hidden={active !== c.id}>
              <c.component taxYear={year.taxYear} />
            </section>
          ))}
        </div>
      </div>

      <div className={`card card-pad small faint ${styles.footer}`}>
        A calculation aid for training and checking — not advice. Rates verified against GOV.UK on {longDate(year.checkedOn)}.
      </div>
    </>
  );
}
