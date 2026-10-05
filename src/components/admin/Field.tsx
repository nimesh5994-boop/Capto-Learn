export function Field({ name, label, value, type = "text", step, hint, required }: { name: string; label: string; value: string | number | null; type?: string; step?: string; hint?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} step={step} defaultValue={value ?? ""} required={required} autoComplete={type === "password" ? "off" : undefined} />
      {hint && (
        <p className="small faint" style={{ marginTop: 4 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="page-head">
      <div>
        <div className="section-title" style={{ marginBottom: 4 }}>
          Practice admin
        </div>
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </div>
    </div>
  );
}
