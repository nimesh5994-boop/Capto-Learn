import { saveFirmDetails } from "@/app/actions/settings";
import { requirePermission } from "@/lib/auth/dal";
import { AdminHeader, Field } from "@/components/admin/Field";
import { SettingsForm } from "@/components/SettingsForm";

export const metadata = { title: "Practice details" };

export default async function PracticePage() {
  const ctx = await requirePermission("settings.firm");
  const { org } = ctx;

  return (
    <div style={{ maxWidth: 900 }}>
      <AdminHeader title="Practice details" description="Who you are, as shown to your clients." />
        <SettingsForm action={saveFirmDetails} title="Practice details" description="Your firm's contact details, shown on training certificates.">
          <div className="grid-2">
            <Field name="name" label="Firm name" value={org.name} required />
            <Field name="email" label="Contact email" value={org.email} type="email" />
            <Field name="phone" label="Phone" value={org.phone} />
            <Field name="website" label="Website" value={org.website} />
            <Field name="address" label="Address" value={org.address} />
          </div>
        </SettingsForm>
    </div>
  );
}
