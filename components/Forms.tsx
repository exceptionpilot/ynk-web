"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { submitOrganizer, submitStudio, submitWaitlist } from "@/lib/forms/actions";
import { collectErrors, formDataToObject, schemas, type FieldErrors, type FormKind, type FormState } from "@/lib/forms/schemas";

type T = Dictionary["forms"];

const actions = { organizer: submitOrganizer, studio: submitStudio, waitlist: submitWaitlist } satisfies Record<
  FormKind,
  (s: FormState, fd: FormData) => Promise<FormState>
>;

function useYnkForm(kind: FormKind) {
  const [state, formAction, pending] = useActionState(actions[kind], { status: "idle" } as FormState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const ref = useRef<HTMLFormElement>(null);

  // Mit JS: selbst validieren und die Action manuell auslösen – so bleiben die
  // Eingaben bei Server-Fehlern erhalten (kein automatischer Form-Reset).
  // Ohne JS greift das native `action`-Attribut.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schemas[kind].safeParse(formDataToObject(fd));
    if (!parsed.success) {
      const errs = collectErrors(parsed.error);
      setClientErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setClientErrors(null);
    startTransition(() => formAction(fd));
  };

  const serverErrors = state.status === "error" && state.reason === "fields" ? state.errors ?? {} : {};
  const errors: FieldErrors = clientErrors ?? serverErrors;
  // Fehler eines Feldes beim Tippen zurücksetzen
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (clientErrors?.[name]) setClientErrors({ ...clientErrors, [name]: undefined });
  };

  return { state, formAction, pending, errors, onSubmit, onChange, ref };
}

type FieldProps = {
  name: string;
  label: string;
  t: T;
  errors: FieldErrors;
  required?: boolean;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "numeric" | "email" | "url" | "text" | "tel";
  min?: string | number;
};

function Field({ name, label, t, errors, required, type = "text", textarea, autoComplete, placeholder, inputMode, min }: FieldProps) {
  const err = errors[name];
  const id = `f-${name}`;
  const common = {
    id,
    name,
    className: "input",
    required,
    "aria-invalid": err ? true : undefined,
    "aria-describedby": err ? `${id}-err` : undefined,
    autoComplete,
    placeholder,
  } as const;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden> *</span>}
      </label>
      {textarea ? <textarea {...common} rows={4} /> : <input {...common} type={type} inputMode={inputMode} min={min} />}
      {err && <span id={`${id}-err`} className="field-error" role="alert">{t.errors[err]}</span>}
    </div>
  );
}

function Check({ name, t, errors, children }: { name: string; t: T; errors: FieldErrors; children: ReactNode }) {
  const err = errors[name];
  return (
    <div className="field">
      <label className="check" style={{ textTransform: "none", letterSpacing: 0, fontFamily: "inherit", fontSize: 14 }}>
        <input type="checkbox" name={name} required aria-invalid={err ? true : undefined} aria-describedby={err ? `f-${name}-err` : undefined} />
        <span>{children}</span>
      </label>
      {err && <span id={`f-${name}-err`} className="field-error" role="alert">{t.errors[err]}</span>}
    </div>
  );
}

function Consent({ t, errors, locale }: { t: T; errors: FieldErrors; locale: Locale }) {
  return (
    <Check name="consent" t={t} errors={errors}>
      {t.consent}{" "}
      <Link href={`/${locale}/datenschutz`} target="_blank">{t.privacyLink}</Link>
      {t.consentSuffix}
    </Check>
  );
}

function Shell({
  t,
  locale,
  f,
  successText,
  submitLabel,
  children,
  chrome,
}: {
  t: T;
  locale: Locale;
  f: ReturnType<typeof useYnkForm>;
  successText: string;
  submitLabel: string;
  children: ReactNode;
  chrome?: boolean;
}) {
  if (f.state.status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <p className="display h2">{t.successTitle}</p>
        <p className="muted" style={{ margin: 0 }}>{successText}</p>
      </div>
    );
  }
  const hasErrors = Object.values(f.errors).some(Boolean);
  const failure = f.state.status === "error" && f.state.reason !== "fields" ? f.state.reason : null;
  return (
    <form ref={f.ref} className="form" action={f.formAction} onSubmit={f.onSubmit} onChange={f.onChange} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="hp" aria-hidden="true">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {children}
      {hasErrors && <p className="form-alert" role="alert">{t.checkFields}</p>}
      {failure && <p className="form-alert" role="alert">{failure === "rate" ? t.errorRate : t.errorGeneric}</p>}
      <div>
        <button type="submit" className={`btn ${chrome ? "btn-chrome" : "btn-primary"}`} disabled={f.pending}>
          <span className="glitch">{f.pending ? t.sending : submitLabel}</span>
          {!f.pending && <span className="arrow" aria-hidden>→</span>}
        </button>
      </div>
      <p className="mono muted" style={{ margin: 0, fontSize: 10 }}>* {t.required}</p>
    </form>
  );
}

export function OrganizerForm({ t, locale }: { t: T; locale: Locale }) {
  const f = useYnkForm("organizer");
  const e = f.errors;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <Shell t={t} locale={locale} f={f} successText={t.organizer.success} submitLabel={t.organizer.submit}>
      <div className="form-row">
        <Field name="name" label={t.fields.name} t={t} errors={e} required autoComplete="name" />
        <Field name="email" label={t.fields.email} t={t} errors={e} required type="email" autoComplete="email" inputMode="email" />
      </div>
      <div className="form-row">
        <Field name="location" label={t.fields.location} t={t} errors={e} required autoComplete="organization" />
        <Field name="city" label={t.fields.city} t={t} errors={e} required autoComplete="address-level2" />
      </div>
      <div className="form-row">
        <Field name="date" label={t.fields.date} t={t} errors={e} required type="date" min={today} />
        <Field name="guests" label={t.fields.guests} t={t} errors={e} required type="number" inputMode="numeric" min={1} />
      </div>
      <Field name="phone" label={t.fields.phone} t={t} errors={e} type="tel" autoComplete="tel" inputMode="tel" />
      <Field name="message" label={t.fields.message} t={t} errors={e} textarea />
      <Consent t={t} errors={e} locale={locale} />
    </Shell>
  );
}

export function StudioForm({ t, locale }: { t: T; locale: Locale }) {
  const f = useYnkForm("studio");
  const e = f.errors;
  return (
    <Shell t={t} locale={locale} f={f} successText={t.studio.success} submitLabel={t.studio.submit}>
      <div className="form-row">
        <Field name="studio" label={t.fields.studio} t={t} errors={e} required autoComplete="organization" />
        <Field name="name" label={t.fields.artistName} t={t} errors={e} required autoComplete="name" />
      </div>
      <div className="form-row">
        <Field name="email" label={t.fields.email} t={t} errors={e} required type="email" autoComplete="email" inputMode="email" />
        <Field name="city" label={t.fields.city} t={t} errors={e} required autoComplete="address-level2" />
      </div>
      <div className="form-row">
        <Field name="portfolio" label={t.fields.portfolio} t={t} errors={e} required type="url" inputMode="url" placeholder="https://" />
        <Field name="instagram" label={t.fields.instagram} t={t} errors={e} placeholder="@" />
      </div>
      <div className="form-row">
        <Field name="styles" label={t.fields.styles} t={t} errors={e} placeholder="Fine Line, Flash, …" />
        <Field name="experience" label={t.fields.experience} t={t} errors={e} required type="number" inputMode="numeric" min={0} />
      </div>
      <Field name="message" label={t.fields.message} t={t} errors={e} textarea />
      <Check name="hygiene" t={t} errors={e}>{t.fields.hygiene}</Check>
      <Check name="insurance" t={t} errors={e}>{t.fields.insurance}</Check>
      <Consent t={t} errors={e} locale={locale} />
    </Shell>
  );
}

export function WaitlistForm({ t, locale }: { t: T; locale: Locale }) {
  const f = useYnkForm("waitlist");
  const e = f.errors;
  return (
    <Shell t={t} locale={locale} f={f} successText={t.waitlist.success} submitLabel={t.waitlist.submit} chrome>
      <div className="form-row">
        <Field name="email" label={t.fields.email} t={t} errors={e} required type="email" autoComplete="email" inputMode="email" />
        <Field name="city" label={t.fields.city} t={t} errors={e} autoComplete="address-level2" />
      </div>
      <Check name="age18" t={t} errors={e}>{t.fields.age18}</Check>
      <Consent t={t} errors={e} locale={locale} />
    </Shell>
  );
}
