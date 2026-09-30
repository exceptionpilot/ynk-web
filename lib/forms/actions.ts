"use server";

import { headers } from "next/headers";
import { collectErrors, formDataToObject, schemas, type FormKind, type FormState } from "./schemas";
import { sendFormMail } from "./mail";
import { rateLimit } from "./rate-limit";

const subjects: Record<FormKind, (d: Record<string, unknown>) => string> = {
  organizer: (d) => `[YNK] Event-Anfrage: ${d.location} (${d.city}) am ${d.date}`,
  studio: (d) => `[YNK] Partner-Bewerbung: ${d.studio} (${d.city})`,
  waitlist: (d) => `[YNK] Grillz-Waitlist: ${d.email}`,
};

async function handle(kind: FormKind, formData: FormData): Promise<FormState> {
  const raw = formDataToObject(formData);

  // Honeypot: echte Nutzer:innen sehen dieses Feld nicht.
  if (raw.website) return { status: "success" };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`${kind}:${ip}`)) return { status: "error", reason: "rate" };

  const parsed = schemas[kind].safeParse(raw);
  if (!parsed.success) {
    return { status: "error", reason: "fields", errors: collectErrors(parsed.error) };
  }

  const data = parsed.data as Record<string, string | number>;
  const locale = raw.locale === "en" ? "en" : "de";
  try {
    await sendFormMail({
      subject: subjects[kind](data),
      replyTo: String(data.email),
      fields: {
        ...data,
        consent: `erteilt am ${new Date().toISOString()}`,
        sprache: locale,
      },
    });
    return { status: "success" };
  } catch (err) {
    console.error("[forms] Versand fehlgeschlagen", err);
    return { status: "error", reason: "generic" };
  }
}

export async function submitOrganizer(_prev: FormState, fd: FormData) {
  return handle("organizer", fd);
}
export async function submitStudio(_prev: FormState, fd: FormData) {
  return handle("studio", fd);
}
export async function submitWaitlist(_prev: FormState, fd: FormData) {
  return handle("waitlist", fd);
}
