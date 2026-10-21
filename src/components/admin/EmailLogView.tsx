import Link from "next/link";
import { EMAIL_PAGE_SIZE, emailSummary, listEmailLog } from "@/lib/emailLog";
import { DELIVERY_LABELS, DELIVERY_PILL, DELIVERY_STATUSES, EMAIL_KINDS, EMAIL_KIND_LABELS, deliveryStatus, isDeliveryStatus, isEmailKind } from "@/lib/emailTracking";
import { dateTime } from "@/lib/format";
import { emailConfigured } from "@/lib/email";

export type EmailLogSearch = { kind?: string; status?: string; firm?: string; q?: string; page?: string };

/**
 * The email log table, shared by the platform view (every firm, plus platform-level email) and a firm's own view.
 * Filters are a plain GET form, so the URL is shareable and works without JavaScript.
 */
export async function EmailLogView({ search, orgId, basePath, firms }: { search: EmailLogSearch; orgId: string | null; basePath: string; firms?: { id: string; name: string }[] }) {
  const kind = isEmailKind(search.kind) ? search.kind : null;
  const status = isDeliveryStatus(search.status) ? search.status : null;
  const q = (search.q ?? "").trim().slice(0, 120) || null;
  // Platform view: "platform" = platform-level email (no firm); otherwise a firm id from the list.
  const firm = firms && search.firm && (search.firm === "platform" || firms.some((f) => f.id === search.firm)) ? search.firm : null;
  const page = Math.max(1, Math.min(10_000, Number.parseInt(search.page ?? "1", 10) || 1));
  const scopeOrg = orgId ?? (firm && firm !== "platform" ? firm : null);

  const [{ rows, total }, summary] = await Promise.all([
    listEmailLog({ orgId: scopeOrg, platformOnly: !orgId && firm === "platform", kind, status, q, page }),
    emailSummary(orgId),
  ]);
  const pages = Math.max(1, Math.ceil(total / EMAIL_PAGE_SIZE));
  const pct = (n: number, d: number) => (d ? `${Math.round((n / d) * 100)}%` : "—");
  const href = (p: number) => {
    const params = new URLSearchParams();
    if (kind) params.set("kind", kind);
    if (status) params.set("status", status);
    if (firm) params.set("firm", firm);
    if (q) params.set("q", q);
    if (p > 1) params.set("page", String(p));
    const s = params.toString();
    return s ? `${basePath}?${s}` : basePath;
  };
  const filtered = Boolean(kind || status || firm || q);

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="row wrap" style={{ gap: 14 }}>
        <Stat label="Sent (30 days)" value={summary.sent} />
        <Stat label="Delivered" value={pct(summary.delivered, summary.sent)} hint={`${summary.delivered} of ${summary.sent}`} />
        <Stat label="Opened" value={pct(summary.opened, summary.delivered)} hint="of delivered" />
        <Stat label="Bounced" value={summary.bounced} hint={summary.complained ? `${summary.complained} spam complaint${summary.complained === 1 ? "" : "s"}` : undefined} />
        {summary.failed + summary.skipped > 0 && <Stat label="Not sent" value={summary.failed + summary.skipped} hint={`${summary.failed} failed · ${summary.skipped} skipped`} />}
      </div>

      {!emailConfigured() && <div className="alert alert-warning">Email isn&apos;t set up (RESEND_API_KEY / EMAIL_FROM), so emails are logged as Skipped and people are given links to share instead.</div>}
      {summary.sent > 0 && summary.withEvents === 0 && (
        <div className="alert alert-info">No delivery updates have come back from the email provider yet, so everything shows as Sent. Delivered / opened / bounced appear once the Resend webhook is connected.</div>
      )}

      <form method="get" action={basePath} className="card card-pad row wrap" style={{ gap: 10, alignItems: "flex-end" }}>
        <div>
          <label htmlFor="el-q">Email address</label>
          <input id="el-q" name="q" type="search" defaultValue={q ?? ""} placeholder="Search by email" style={{ minWidth: 220 }} />
        </div>
        <div>
          <label htmlFor="el-kind">Type</label>
          <select id="el-kind" name="kind" defaultValue={kind ?? ""}>
            <option value="">All types</option>
            {EMAIL_KINDS.map((k) => (
              <option key={k} value={k}>
                {EMAIL_KIND_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="el-status">Status</label>
          <select id="el-status" name="status" defaultValue={status ?? ""}>
            <option value="">Any status</option>
            {DELIVERY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {DELIVERY_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        {firms && (
          <div>
            <label htmlFor="el-firm">Firm</label>
            <select id="el-firm" name="firm" defaultValue={firm ?? ""}>
              <option value="">All firms</option>
              <option value="platform">Platform (no firm)</option>
              {firms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button className="btn btn-primary">Filter</button>
        {filtered && (
          <Link href={basePath} className="btn btn-ghost">
            Clear
          </Link>
        )}
      </form>

      <section className="card" style={{ overflowX: "auto" }}>
        {rows.length === 0 ? (
          <div className="empty">{filtered ? "No emails match these filters." : "No emails sent yet."}</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Sent</th>
                <th>To</th>
                {firms && <th>Firm</th>}
                <th>Type</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Last event</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ e, firm: firmName }) => {
                const s = deliveryStatus(e);
                return (
                  <tr key={e.id}>
                    <td className="small num" style={{ whiteSpace: "nowrap" }}>
                      {dateTime(e.sentAt)}
                    </td>
                    <td className="small" style={{ overflowWrap: "anywhere" }}>
                      {e.toEmail}
                    </td>
                    {firms && <td className="small muted">{firmName ?? "Platform"}</td>}
                    <td className="small">{EMAIL_KIND_LABELS[e.kind] ?? e.kind}</td>
                    <td className="small" style={{ maxWidth: 300 }}>
                      {e.subject}
                      {e.error && <div className="small" style={{ color: "var(--danger)" }}>{e.error}</div>}
                    </td>
                    <td>
                      <span className={`pill ${DELIVERY_PILL[s]}`}>{DELIVERY_LABELS[s]}</span>
                      {(e.openCount > 1 || e.clickCount > 0) && (
                        <div className="small faint" style={{ marginTop: 3 }}>
                          {e.openCount > 0 && `${e.openCount} open${e.openCount === 1 ? "" : "s"}`}
                          {e.openCount > 0 && e.clickCount > 0 && " · "}
                          {e.clickCount > 0 && `${e.clickCount} click${e.clickCount === 1 ? "" : "s"}`}
                        </div>
                      )}
                    </td>
                    <td className="small muted num" style={{ whiteSpace: "nowrap" }}>
                      {e.lastEventAt ? dateTime(e.lastEventAt) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {pages > 1 && (
        <div className="row between small">
          <span className="muted">
            Page {page} of {pages} · {total} emails
          </span>
          <span className="row" style={{ gap: 6 }}>
            {page > 1 && (
              <Link className="btn btn-sm" href={href(page - 1)}>
                Newer
              </Link>
            )}
            {page < pages && (
              <Link className="btn btn-sm" href={href(page + 1)}>
                Older
              </Link>
            )}
          </span>
        </div>
      )}

      <p className="small muted" style={{ margin: 0 }}>
        Delivered, bounced and spam complaints are reported by the receiving mail server and are reliable. <strong>Opened</strong>{" "}
        relies on a tiny tracking image, so it only appears when open tracking is switched on for the sending domain in Resend — and some mail apps block or pre-load images (Apple Mail Privacy Protection, many corporate
        filters), so an email can be read without showing as opened, or show as opened when it wasn&apos;t. Treat opens as a hint, not proof. Clicks need click tracking on the domain.
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="card card-pad" style={{ minWidth: 150 }}>
      <div className="small muted">{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
      {hint && <div className="small faint">{hint}</div>}
    </div>
  );
}
