"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import * as z from "zod";
import { getDb } from "@/lib/db/client";
import { organizations } from "@/lib/db/schema";
import { AccessError, authorize, type AuthContext } from "@/lib/auth/dal";
import { actorOf, audit } from "@/lib/audit";
import { orgHasFeature } from "@/lib/plans";
import type { Permission } from "@/lib/rbac";
import type { FormState } from "./auth";

const opt = z
  .string()
  .trim()
  .transform((v) => v || null);
const MAX_LOGO_BYTES = 300_000;

/** Runs a settings form action under a permission, turning access failures into inline form errors. */
async function guarded(permission: Permission, fn: (ctx: AuthContext) => Promise<FormState>, opts: { feature?: "customBranding" } = {}): Promise<FormState> {
  try {
    const ctx = await authorize(permission, opts);
    return await fn(ctx);
  } catch (err) {
    if (err instanceof AccessError) return { error: err.message };
    throw err;
  }
}

const FirmSchema = z.object({
  name: z.string().trim().min(1, { error: "Practice name is required." }),
  email: opt,
  phone: opt,
  website: opt,
  address: opt,
});

export async function saveFirmDetails(_: FormState, formData: FormData): Promise<FormState> {
  return guarded("settings.firm", async (ctx) => {
    const parsed = FirmSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };
    const db = await getDb();
    await db.update(organizations).set(parsed.data).where(eq(organizations.id, ctx.org.id));
    await audit(actorOf(ctx), "settings.firm", "Updated practice details");
    revalidatePath("/", "layout");
    return { success: "Practice details saved." };
  });
}

const BrandSchema = z.object({ brandColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, { error: "Brand colour must be a hex value like #a01f62." }) });

export async function saveBranding(_: FormState, formData: FormData): Promise<FormState> {
  return guarded("settings.firm", async (ctx) => {
    const { org } = ctx;
    if (!orgHasFeature(org, "customBranding")) return { error: "Custom branding isn't included in your plan." };
    const parsed = BrandSchema.safeParse({ brandColor: formData.get("brandColor") });
    if (!parsed.success) return { error: parsed.error.issues[0]?.message };

    let logoDataUrl: string | null | undefined;
    const logo = formData.get("logo");
    if (logo instanceof File && logo.size > 0) {
      if (!["image/png", "image/jpeg"].includes(logo.type)) return { error: "Logo must be a PNG or JPEG." };
      if (logo.size > MAX_LOGO_BYTES) return { error: "Logo must be under 300 KB." };
      logoDataUrl = `data:${logo.type};base64,${Buffer.from(await logo.arrayBuffer()).toString("base64")}`;
    }
    if (formData.get("removeLogo") === "on") logoDataUrl = null;

    const db = await getDb();
    await db
      .update(organizations)
      .set({ brandColor: parsed.data.brandColor, ...(logoDataUrl !== undefined ? { logoDataUrl } : {}) })
      .where(eq(organizations.id, org.id));
    await audit(actorOf(ctx), "settings.branding", `Updated branding${logoDataUrl === null ? " (logo removed)" : logoDataUrl ? " (new logo)" : ""}`);
    revalidatePath("/", "layout");
    return { success: "Branding saved." };
  });
}
