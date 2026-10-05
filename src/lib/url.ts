export function appUrl(): string {
  return (process.env.APP_URL ?? "http://localhost:3700").replace(/\/$/, "");
}
