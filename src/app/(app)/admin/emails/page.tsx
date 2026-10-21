import { requirePermission } from "@/lib/auth/dal";
import { EmailLogView, type EmailLogSearch } from "@/components/admin/EmailLogView";

export const metadata = { title: "Email activity" };

export default async function FirmEmailsPage({ searchParams }: { searchParams: Promise<EmailLogSearch> }) {
  const ctx = await requirePermission("team.manage");
  const search = await searchParams;
  return (
    <div style={{ maxWidth: 1100 }}>
      <div className="page-head">
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>{ctx.isInternal ? "Workspace admin" : "Practice admin"}</div>
          <h1>Email activity</h1>
          <p className="muted">Emails Capto Learn has sent to people in {ctx.org.name} — invitations, password resets and weekly updates — and whether they arrived.</p>
        </div>
      </div>
      <EmailLogView search={{ ...search, firm: undefined }} orgId={ctx.org.id} basePath="/admin/emails" />
    </div>
  );
}
