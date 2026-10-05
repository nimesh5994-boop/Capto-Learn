import { requireUser } from "@/lib/auth/dal";
import { changeMyPassword, updateMyProfile } from "@/app/actions/team";
import { SettingsForm } from "@/components/SettingsForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PLATFORM_PERMISSIONS, PLATFORM_ROLES, permissionGroups } from "@/lib/rbac";
import { dateTime } from "@/lib/format";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const ctx = await requireUser();
  const { user, org } = ctx;
  const groups = permissionGroups()
    .map((g) => ({ ...g, items: g.items.filter((i) => ctx.can(i.key)) }))
    .filter((g) => g.items.length);

  return (
    <div style={{ maxWidth: 760 }} className="stack">
      <div className="page-head" style={{ marginBottom: 4 }}>
        <div>
          <div className="section-title" style={{ marginBottom: 4 }}>
            My account
          </div>
          <h1>{user.name}</h1>
          <p className="muted">
            {user.email} · {ctx.roleLabel} at {org.name} · last sign-in {dateTime(user.lastLoginAt)}
          </p>
        </div>
      </div>

      <SettingsForm action={updateMyProfile} title="Profile" description="How you appear to colleagues and in the activity log." submitLabel="Save profile">
        <div className="grid-2">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" defaultValue={user.name} required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" value={user.email} readOnly disabled />
          </div>
          <div>
            <label htmlFor="jobTitle">Job title</label>
            <input id="jobTitle" name="jobTitle" defaultValue={user.jobTitle ?? ""} autoComplete="organization-title" placeholder="e.g. Client Manager" />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" defaultValue={user.phone ?? ""} autoComplete="tel" />
          </div>
        </div>
      </SettingsForm>

      <SettingsForm action={changeMyPassword} title="Password" description="At least 10 characters." submitLabel="Change password">
        <div className="grid-3">
          <div>
            <label htmlFor="currentPassword">Current password</label>
            <input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />
          </div>
          <div>
            <label htmlFor="newPassword">New password</label>
            <input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
          </div>
        </div>
      </SettingsForm>

      <section className="card card-pad stack">
        <div className="row between">
          <div>
            <h2>Appearance</h2>
            <p className="small muted">Light, dark, or follow your device. Shared with the other Capto apps on this browser.</p>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="card card-pad stack">
        <div>
          <h2>My access</h2>
          <p className="small muted">
            Your <strong>{ctx.roleLabel}</strong> role at {org.name}. Ask an owner or admin if you need more.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.group}>
            <div className="section-title" style={{ marginBottom: 4 }}>
              {g.group}
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {g.items.map((i) => (
                <li key={i.key} className="small">
                  {i.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {ctx.platformRole && (
          <div>
            <div className="section-title" style={{ marginBottom: 4 }}>
              Platform · {PLATFORM_ROLES[ctx.platformRole].label}
            </div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {PLATFORM_ROLES[ctx.platformRole].permissions.map((p) => (
                <li key={p} className="small">
                  {PLATFORM_PERMISSIONS[p].label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
