import { getCurrentUser } from "@/lib/auth/dal";
import { cpdCsv } from "@/lib/cpd/log";
import { loadCpdRows } from "@/lib/cpd/load";
import { appUrl } from "@/lib/url";
import { isoDate } from "@/lib/format";

/** CPD record for the signed-in user: completed Capto lessons plus activity they logged, newest first. */
export async function GET() {
  const ctx = await getCurrentUser();
  if (!ctx || !ctx.can("learning.view")) return new Response("Not signed in", { status: 401 });
  const csv = cpdCsv(await loadCpdRows(ctx.org.id, ctx.user.id), appUrl());
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cpd-record-${isoDate(new Date())}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
