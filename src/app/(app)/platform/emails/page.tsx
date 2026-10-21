import { asc } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { organizations } from "@/lib/db/schema";
import { requirePlatform } from "@/lib/auth/dal";
import { EmailLogView, type EmailLogSearch } from "@/components/admin/EmailLogView";

export const metadata = { title: "Email log" };

export default async function PlatformEmailsPage({ searchParams }: { searchParams: Promise<EmailLogSearch> }) {
  await requirePlatform("platform.firms.view");
  const search = await searchParams;
  const db = await getDb();
  const firms = await db.select({ id: organizations.id, name: organizations.name }).from(organizations).orderBy(asc(organizations.name));
  return (
    <div style={{ maxWidth: 1200 }}>
      <div className="page-head">
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>Platform admin</div>
          <h1>Email log</h1>
          <p className="muted">Every email Capto Learn has sent or tried to send — invitations, password resets, weekly updates — and what happened to it.</p>
        </div>
      </div>
      <EmailLogView search={search} orgId={null} basePath="/platform/emails" firms={firms} />
    </div>
  );
}
