import Link from "next/link";
import { requirePermission } from "@/lib/auth/dal";
import { currentTaxYear, ratesFor, TAX_YEARS } from "@/content/rates";
import { Calculators } from "@/components/calc/Calculators";

export const metadata = { title: "Tax calculators" };

export default async function CalculatorsPage({ searchParams }: { searchParams: Promise<{ tab?: string; year?: string }> }) {
  await requirePermission("learning.view");
  const sp = await searchParams;
  const currentYear = currentTaxYear();
  const defaultYear = (ratesFor(sp.year ?? "") ?? ratesFor(currentYear) ?? TAX_YEARS[0]).taxYear;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Tax calculators</h1>
          <p className="muted">
            Income tax, corporation tax, capital gains tax and inheritance tax, worked line by line like a computation. Every rate comes from the checked rates table and links to its GOV.UK source. Use them
            to learn the mechanics and to check your own working.
          </p>
        </div>
        <Link href="/rates" className="btn">
          Rates and allowances
        </Link>
      </div>
      <Calculators defaultYear={defaultYear} currentYear={currentYear} initialTab={sp.tab} />
    </>
  );
}
