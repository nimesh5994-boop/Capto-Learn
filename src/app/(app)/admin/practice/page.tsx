import { saveFirmDetails, saveSkillCheckSettings } from "@/app/actions/settings";
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
        <div style={{ height: 18 }} />
        <SettingsForm action={saveSkillCheckSettings} title="Skills check" description="How long staff get for each subject in the skills check, and how often they're prompted to take a fresh one.">
          <div className="grid-2">
            <Field name="minutes" label="Minutes per subject" type="number" value={org.skillCheckMinutesPerSubject} hint="Each subject asks 2–3 questions. 2 minutes suits most teams." required />
            <Field name="retakeMonths" label="Prompt a fresh check every (months)" type="number" value={org.skillCheckRetakeMonths} hint="Staff see a reminder on their dashboard when it's due." required />
          </div>
        </SettingsForm>
    </div>
  );
}
