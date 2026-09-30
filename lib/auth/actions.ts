"use server";

import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { rateLimit } from "@/lib/forms/rate-limit";
import { headers } from "next/headers";
import { sendFormMail } from "@/lib/forms/mail";
import { clearSession, getSession, setSession } from "./session";
import { accountById, verifyAccount } from "./users";

export type LoginState = { error?: "invalid" | "rate"; email?: string };

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const kind = fd.get("kind") === "partner" ? "partner" : "customer";
  const localeRaw = String(fd.get("locale") ?? "de");
  const locale = isLocale(localeRaw) ? localeRaw : "de";
  const email = String(fd.get("email") ?? "");
  const secret = String(fd.get("secret") ?? "");

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`login:${ip}`, 10, 5 * 60 * 1000)) return { error: "rate", email };

  const acc = verifyAccount(email, secret, kind === "partner" ? ["studio", "organizer"] : ["customer"]);
  if (!acc) return { error: "invalid", email };

  await setSession(acc.id, acc.role);
  redirect(`/${locale}/portal/${acc.role === "customer" ? "kunde" : "partner"}`);
}

export async function logout(fd: FormData) {
  const localeRaw = String(fd.get("locale") ?? "de");
  await clearSession();
  redirect(`/${isLocale(localeRaw) ? localeRaw : "de"}/portal`);
}

/** DSGVO-Anfrage (Auskunft/Löschung) aus dem Kundenportal – geht per Mail an [E-MAIL]. */
export async function privacyRequest(_prev: { sent?: boolean }, fd: FormData): Promise<{ sent?: boolean }> {
  const session = await getSession();
  if (!session) return {};
  const acc = accountById(session.uid);
  const type = fd.get("type") === "delete" ? "Löschung (Art. 17 DSGVO)" : "Auskunft (Art. 15 DSGVO)";
  try {
    await sendFormMail({
      subject: `[YNK] Datenschutz-Anfrage: ${type}`,
      replyTo: acc?.email,
      fields: { typ: type, account: session.uid, email: acc?.email ?? "-", zeitpunkt: new Date().toISOString() },
    });
    return { sent: true };
  } catch (err) {
    console.error("[portal] Datenschutz-Anfrage fehlgeschlagen", err);
    return {};
  }
}
