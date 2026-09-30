import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import type { Role } from "./session";

/**
 * DEMO-Accounts. Vor dem Launch durch echte Benutzerverwaltung ersetzen
 * (z. B. Buchungssystem-API für Gäste, Auth-Provider für Partner).
 */
type Account = { id: string; role: Role; email: string; secret: string; name: string };

const accounts: Account[] = [
  { id: "c-001", role: "customer", email: "gast@ynk.demo", secret: "YNK-4821", name: "Alex" },
  { id: "s-linework", role: "studio", email: "studio@ynk.demo", secret: "demo1234", name: "Linework Berlin" },
  { id: "o-001", role: "organizer", email: "club@ynk.demo", secret: "demo1234", name: "[CLUB NAME] Berlin" },
];

export const demoAccounts = accounts.map(({ role, email, secret }) => ({ role, email, secret }));

const hash = (s: string) => createHash("sha256").update(s).digest();

export function verifyAccount(email: string, secret: string, roles: Role[]) {
  const acc = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase() && roles.includes(a.role));
  // Vergleich immer ausführen, um Timing-Unterschiede zu vermeiden
  const ok = timingSafeEqual(hash(acc ? acc.secret.toUpperCase() : "\0"), hash(secret.trim().toUpperCase()));
  return acc && ok ? acc : null;
}

export function accountById(id: string) {
  return accounts.find((a) => a.id === id) ?? null;
}
