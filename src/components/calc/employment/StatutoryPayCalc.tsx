"use client";

import { rate } from "@/content/rates";
import { gbp } from "@/lib/calc/common";
import { DURATIONS, PAYMENT_LABEL, type StatutoryPayResult, type StatutoryPayment, statutoryPay, validateStatutoryPay } from "@/lib/calc/employment/statutoryPay";
import { parseMoney, parseWhole } from "@/lib/calc/parse";
import { FormHead, GovLink, MoneyField, NumberField, SelectField } from "../Fields";
import { ResultPanel } from "../ResultPanel";
import { useFields } from "../useFields";
import calc from "../calc.module.css";
import styles from "./employment.module.css";

const EXAMPLE = {
  payment: "ssp",
  awe: "140",
  qd: "2",
  sick: "4",
  paid: "",
  waiting: "",
  service: "yes",
  weeks: "39",
  smpTaken: "",
  prevNic: "",
};
const BLANK = { ...EXAMPLE, awe: "", qd: "5", sick: "", weeks: "39" };

const GUIDE: Record<StatutoryPayment, string> = {
  ssp: "https://www.gov.uk/employers-sick-pay",
  smp: "https://www.gov.uk/employers-maternity-pay-leave",
  sap: "https://www.gov.uk/employers-adoption-pay-leave",
  spp: "https://www.gov.uk/employers-paternity-pay-leave",
  shpp: "https://www.gov.uk/shared-parental-leave-and-pay-employer-guide",
};

export function StatutoryPayCalc({ taxYear }: { taxYear: string }) {
  const f = useFields(EXAMPLE, BLANK);
  const v = f.values;
  const pay = v.payment as StatutoryPayment;
  const isSsp = pay === "ssp";
  const p = {
    awe: parseMoney(v.awe),
    qd: parseWhole(v.qd, 0),
    sick: parseWhole(v.sick, 0),
    paid: parseWhole(v.paid, 0),
    waiting: parseWhole(v.waiting, 0),
    weeks: parseWhole(v.weeks, 0),
    smpTaken: parseWhole(v.smpTaken, 0),
    prevNic: parseMoney(v.prevNic, true),
  };
  const fieldErrors = Object.values(p).some((x) => x.error);
  const oldSsp = rate(taxYear, "emp.ssp-waiting-days")?.amount !== 0;

  const { result, errors } = ((): { result: StatutoryPayResult | null; errors: string[] } => {
    if (fieldErrors) return { result: null, errors: ["Fix the highlighted fields."] };
    const input = {
      taxYear,
      payment: pay,
      awe: p.awe.value ?? 0,
      continuousEmployment: v.service === "yes",
      weeks: p.weeks.value,
      smpWeeksTaken: p.smpTaken.value,
      qualifyingDaysPerWeek: p.qd.value,
      sickDays: p.sick.value,
      daysAlreadyPaid: p.paid.value,
      waitingDaysServed: p.waiting.value,
      previousYearClass1Nic: p.prevNic.value,
    };
    const errs = validateStatutoryPay(input);
    if (errs.length) return { result: null, errors: errs };
    try {
      return { result: statutoryPay(input), errors: [] };
    } catch (e) {
      return { result: null, errors: [e instanceof Error ? e.message : String(e)] };
    }
  })();

  const flatId = isSsp ? "emp.ssp-weekly" : `emp.${pay}-weekly`;
  const flat = rate(taxYear, flatId)?.amount;

  return (
    <div className={calc.layout}>
      <form className={`card card-pad ${calc.form}`} onSubmit={(e) => e.preventDefault()} aria-label="Statutory payments inputs">
        <FormHead
          title="Statutory payments"
          intro="SSP, SMP, SAP, SPP and ShPP: the qualifying checks, weekly and daily rates, total payable and how much the employer can recover from HMRC."
          example="Megan (Statutory Sick Pay lesson): AWE £140, works 2 days a week, 4 qualifying days sick → 80% × £140 = £112 a week, £56 a day, £224."
          onExample={f.loadExample}
          onClear={f.clear}
        />
        <SelectField
          label="Payment"
          value={v.payment}
          onChange={(val) => {
            f.set("payment")(val);
            if (val === "spp") f.set("weeks")("2");
            else if (val !== "ssp" && v.weeks === "2") f.set("weeks")("39");
          }}
          options={(Object.keys(PAYMENT_LABEL) as StatutoryPayment[]).map((k) => ({ value: k, label: PAYMENT_LABEL[k] }))}
          help={<GovLink href={GUIDE[pay]}>GOV.UK employer guide</GovLink>}
        />
        <MoneyField
          label="Average weekly earnings (AWE)"
          value={v.awe}
          onChange={f.set("awe")}
          error={p.awe.error}
          help={
            <>
              Gross earnings in the relevant period (normally 8 weeks) as a weekly figure, unrounded. Monthly paid: total for the period ÷ months × 12 ÷ 52.
              {flat !== undefined && <> Weekly rate this year: {gbp(flat)}{isSsp && !oldSsp ? " or 80% of AWE if lower" : isSsp ? "" : " or 90% of AWE if lower"}.</>}
            </>
          }
        />
        {isSsp ? (
          <>
            <div className="grid-2">
              <NumberField label="Qualifying days a week" value={v.qd} onChange={f.set("qd")} error={p.qd.error} help="Days the employee normally works (1 to 7)." />
              <NumberField label="Qualifying days sick" value={v.sick} onChange={f.set("sick")} error={p.sick.error} help="Working days missed in this period of sickness." />
            </div>
            <details className={styles.more}>
              <summary>More inputs: linked periods</summary>
              <div className={styles.moreBody}>
                <NumberField label="Days of SSP already paid in linked periods" value={v.paid} onChange={f.set("paid")} error={p.paid.error} help="Periods of sickness 8 weeks or less apart link; SSP stops after 28 weeks in total." />
                {oldSsp && <NumberField label="Waiting days already served in a linked period" value={v.waiting} onChange={f.set("waiting")} error={p.waiting.error} help="Before 6 April 2026 the first 3 qualifying days weren't paid, once per linked period." />}
              </div>
            </details>
          </>
        ) : (
          <>
            <SelectField
              label={`Employed continuously for ${DURATIONS.continuousEmploymentWeeks} weeks into the qualifying week?`}
              value={v.service}
              onChange={f.set("service")}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              help="The qualifying week is the 15th week before the expected week of childbirth (or the week the adopter is matched)."
            />
            <div className="grid-2">
              <NumberField
                label="Weeks to pay"
                value={v.weeks}
                onChange={f.set("weeks")}
                error={p.weeks.error}
                help={pay === "spp" ? "1 or 2 weeks." : pay === "shpp" ? "Up to what's left of 39 weeks." : `Up to ${DURATIONS.smpWeeks} weeks.`}
              />
              {pay === "shpp" && <NumberField label="Weeks of SMP/SAP already paid" value={v.smpTaken} onChange={f.set("smpTaken")} error={p.smpTaken.error} />}
            </div>
            <MoneyField
              label="Previous tax year's total Class 1 NIC (optional)"
              value={v.prevNic}
              onChange={f.set("prevNic")}
              error={p.prevNic.error}
              placeholder="Not known"
              help={
                <>
                  Employee plus employer. At or below {gbp(rate(taxYear, "emp.small-employer-nic-limit")?.amount ?? 0)} the employer gets small employers&apos; relief.{" "}
                  <GovLink href={rate(taxYear, "emp.statutory-pay-recovery-standard")?.source.url ?? GUIDE.smp}>GOV.UK</GovLink>
                </>
              }
            />
          </>
        )}
      </form>
      <ResultPanel
        title={PAYMENT_LABEL[pay]}
        headlineLabel={`${PAYMENT_LABEL[pay]} payable`}
        result={result}
        errors={errors}
        inputsSummary={[
          `Payment: ${PAYMENT_LABEL[pay]}`,
          `AWE: ${v.awe || "0"}`,
          ...(isSsp
            ? [`Qualifying days a week: ${v.qd}`, `Qualifying days sick: ${v.sick || "0"}`, ...(v.paid ? [`Already paid in linked periods: ${v.paid} days`] : [])]
            : [`26 weeks' continuous employment: ${v.service}`, `Weeks: ${v.weeks || "0"}`, ...(v.prevNic ? [`Previous year Class 1 NIC: ${v.prevNic}`] : [])]),
        ]}
      />
    </div>
  );
}
