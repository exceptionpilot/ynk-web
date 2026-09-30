import "server-only";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type Mail = { subject: string; fields: Record<string, string | number>; replyTo?: string };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Versendet eine Formular-Anfrage an FORM_RECIPIENT ([E-MAIL]).
 * Ohne SMTP-Konfiguration wird die Nachricht nur geloggt (Entwicklung).
 */
export async function sendFormMail({ subject, fields, replyTo }: Mail) {
  const to = process.env.FORM_RECIPIENT || site.email;
  const from = process.env.FORM_SENDER || `YNK Website <${site.email}>`;
  const rows = Object.entries(fields);
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:monospace;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  if (!process.env.SMTP_HOST) {
    console.info(`[forms] SMTP_HOST nicht gesetzt – Mail an ${to} wird nur geloggt:\n${subject}\n${text}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  await transporter.sendMail({ from, to, replyTo, subject, text, html });
}
