import { z } from "zod";

/**
 * Gemeinsame Schemas für Client- und Server-Validierung.
 * Fehlermeldungen sind Schlüssel aus `dict.forms.errors`.
 */
export type ErrorKey = "required" | "email" | "url" | "date" | "number" | "consent" | "tooLong" | "tooShort" | "age";

const text = (max = 200) =>
  z.string({ error: "required" }).trim().min(1, { error: "required" }).max(max, { error: "tooLong" });
const optionalText = (max = 200) => z.string().trim().max(max, { error: "tooLong" }).optional().default("");
const email = z.string({ error: "required" }).trim().min(1, { error: "required" }).max(200, { error: "tooLong" }).pipe(z.email({ error: "email" }));
const checked = (key: ErrorKey) => z.literal("on", { error: key });

const futureDate = z
  .string({ error: "required" })
  .min(1, { error: "required" })
  .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), { error: "date" })
  .refine((v) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(`${v}T00:00:00`).getTime() >= today.getTime();
  }, { error: "date" });

const httpUrl = z
  .string({ error: "required" })
  .trim()
  .min(1, { error: "required" })
  .max(500, { error: "tooLong" })
  .refine((v) => {
    try {
      const u = new URL(v);
      return u.protocol === "https:" || u.protocol === "http:";
    } catch {
      return false;
    }
  }, { error: "url" });

export const organizerSchema = z.object({
  name: text(120),
  email,
  phone: optionalText(40),
  location: text(160),
  city: text(120),
  date: futureDate,
  guests: z.coerce.number({ error: "number" }).int({ error: "number" }).min(1, { error: "number" }).max(100000, { error: "number" }),
  message: optionalText(3000),
  consent: checked("consent"),
});

export const studioSchema = z.object({
  studio: text(160),
  name: text(120),
  email,
  city: text(120),
  instagram: optionalText(80),
  portfolio: httpUrl,
  styles: optionalText(300),
  experience: z.coerce.number({ error: "number" }).int({ error: "number" }).min(0, { error: "number" }).max(80, { error: "number" }),
  message: optionalText(3000),
  hygiene: checked("required"),
  insurance: checked("required"),
  consent: checked("consent"),
});

export const waitlistSchema = z.object({
  email,
  city: optionalText(120),
  age18: checked("age"),
  consent: checked("consent"),
});

export const schemas = {
  organizer: organizerSchema,
  studio: studioSchema,
  waitlist: waitlistSchema,
} as const;

export type FormKind = keyof typeof schemas;

export type FieldErrors = Partial<Record<string, ErrorKey>>;

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; reason: "fields" | "generic" | "rate"; errors?: FieldErrors };

export function formDataToObject(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export function collectErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) {
      const msg = issue.message as ErrorKey;
      errors[key] = isErrorKey(msg) ? msg : "required";
    }
  }
  return errors;
}

const errorKeys: ErrorKey[] = ["required", "email", "url", "date", "number", "consent", "tooLong", "tooShort", "age"];
function isErrorKey(v: string): v is ErrorKey {
  return (errorKeys as string[]).includes(v);
}
