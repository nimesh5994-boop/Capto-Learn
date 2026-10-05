import Link from "next/link";
import { saveBranding } from "@/app/actions/settings";
import { orgHasFeature } from "@/lib/plans";
import { requirePermission } from "@/lib/auth/dal";
import { AdminHeader } from "@/components/admin/Field";
import { SettingsForm } from "@/components/SettingsForm";

export const metadata = { title: "Branding" };

export default async function BrandingPage() {
  const ctx = await requirePermission("settings.firm");
  const { org } = ctx;
  const branding = orgHasFeature(org, "customBranding");
  return (
    <div style={{ maxWidth: 900 }}>
      <AdminHeader title="Branding" description="How Capto Learn looks to your team." />
      <SettingsForm action={saveBranding} title="Branding" description="Your logo and colour on certificates and in the app header.">
        {!branding && (
          <div className="alert alert-info">
            Custom branding isn&apos;t included in your plan. <Link href="/admin/billing">See plans</Link>
          </div>
        )}
        <div className="grid-2">
          <div>
            <label htmlFor="brandColor">Brand colour</label>
            <div className="row" style={{ gap: 8 }}>
              <input id="brandColor" name="brandColor" type="color" defaultValue={org.brandColor} disabled={!branding} style={{ width: 52, padding: 2, height: 36 }} />
              <span className="small muted">Used on certificates and highlights.</span>
            </div>
          </div>
          <div>
            <label htmlFor="logo">Logo (PNG or JPEG, under 300 KB)</label>
            <input id="logo" name="logo" type="file" accept="image/png,image/jpeg" disabled={!branding} />
            {org.logoDataUrl && (
              <div className="row" style={{ marginTop: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={org.logoDataUrl} alt="Current logo" style={{ maxHeight: 36, maxWidth: 160 }} />
                <label className="row small" style={{ margin: 0, gap: 6 }}>
                  <input type="checkbox" name="removeLogo" /> Remove
                </label>
              </div>
            )}
          </div>
        </div>
      </SettingsForm>
    </div>
  );
}
