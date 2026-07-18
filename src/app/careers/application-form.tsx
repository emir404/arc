"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useId, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type ApplicationState,
  HONEYPOT_FIELD,
  OPEN_TO_OPTIONS,
  STRENGTH_OPTIONS,
  TOOL_OPTIONS,
} from "@/lib/careers-schema";
import { cn } from "@/lib/utils";
import { submitApplication } from "./actions";

const initialState: ApplicationState = { status: "idle" };

/** Order used to move focus to the first field with a validation error. */
const FIELD_ORDER = [
  "fullName",
  "email",
  "location",
  "portfolio",
  "xProfile",
  "otherLinks",
  "strengths",
  "proudestProject",
  "tools",
  "openTo",
  "startDate",
  "compensation",
  "notes",
] as const;

function str(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}
function arr(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : [];
}

export default function ApplicationForm() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const errors = state.errors ?? {};
  const values = state.values;

  // On a failed submit, move focus to the first field with an error.
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = FIELD_ORDER.find((name) => state.errors?.[name]);
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        className="rounded-2xl border bg-white p-8 md:p-10"
        aria-live="polite"
      >
        <h3 className="text-xl font-medium tracking-tight text-black">
          Application received
        </h3>
        <p className="mt-3 max-w-prose text-base font-light leading-[1.6] text-black/70 text-pretty">
          Got it. We review every application ourselves and reply to promising
          ones within a week.
        </p>
      </div>
    );
  }

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  // ⌘/Ctrl+Enter submits from within a textarea.
  const submitOnMetaEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  // Keep the "choose up to 2" strengths group at two selections max.
  const enforceMaxTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked =
      formRef.current?.querySelectorAll<HTMLInputElement>(
        'input[name="strengths"]:checked',
      ) ?? [];
    if (event.target.checked && checked.length > 2) {
      event.target.checked = false;
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="flex flex-col gap-7"
    >
      {/* Honeypot: hidden from users and assistive tech; bots that fill it are
          rejected server-side. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={fieldId(HONEYPOT_FIELD)}>Company website</label>
        <input
          id={fieldId(HONEYPOT_FIELD)}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <Field
        label="Full name"
        htmlFor={fieldId("fullName")}
        error={errors.fullName}
        required
      >
        <Input
          id={fieldId("fullName")}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          defaultValue={str(values?.fullName)}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? errorId("fullName") : undefined}
        />
      </Field>

      <Field
        label="Email"
        htmlFor={fieldId("email")}
        error={errors.email}
        required
      >
        <Input
          id={fieldId("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          defaultValue={str(values?.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? errorId("email") : undefined}
        />
      </Field>

      <Field
        label="Location and timezone"
        htmlFor={fieldId("location")}
        error={errors.location}
        required
      >
        <Input
          id={fieldId("location")}
          name="location"
          type="text"
          placeholder="Berlin, CET…"
          required
          defaultValue={str(values?.location)}
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? errorId("location") : undefined}
        />
      </Field>

      <Field
        label="Portfolio URL"
        htmlFor={fieldId("portfolio")}
        error={errors.portfolio}
        required
      >
        <Input
          id={fieldId("portfolio")}
          name="portfolio"
          type="url"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          placeholder="https://…"
          required
          defaultValue={str(values?.portfolio)}
          aria-invalid={!!errors.portfolio}
          aria-describedby={errors.portfolio ? errorId("portfolio") : undefined}
        />
      </Field>

      <Field
        label="X profile"
        htmlFor={fieldId("xProfile")}
        error={errors.xProfile}
        optional
      >
        <Input
          id={fieldId("xProfile")}
          name="xProfile"
          type="url"
          inputMode="url"
          spellCheck={false}
          placeholder="https://x.com/…"
          defaultValue={str(values?.xProfile)}
          aria-invalid={!!errors.xProfile}
          aria-describedby={errors.xProfile ? errorId("xProfile") : undefined}
        />
      </Field>

      <Field
        label="Other links"
        htmlFor={fieldId("otherLinks")}
        error={errors.otherLinks}
        optional
      >
        <Input
          id={fieldId("otherLinks")}
          name="otherLinks"
          type="text"
          placeholder="Dribbble, Read.cv, writing…"
          defaultValue={str(values?.otherLinks)}
          aria-invalid={!!errors.otherLinks}
          aria-describedby={
            errors.otherLinks ? errorId("otherLinks") : undefined
          }
        />
      </Field>

      <Fieldset
        legend="Strongest at"
        hint="Choose up to two."
        error={errors.strengths}
        errorId={errorId("strengths")}
        required
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {STRENGTH_OPTIONS.map((option) => (
            <CheckControl
              key={option}
              name="strengths"
              value={option}
              defaultChecked={arr(values?.strengths).includes(option)}
              onChange={enforceMaxTwo}
            />
          ))}
        </div>
      </Fieldset>

      <Field
        label="Proudest project"
        htmlFor={fieldId("proudestProject")}
        error={errors.proudestProject}
        hint="Drop the link and tell us in two or three sentences which decisions made it good."
        required
      >
        <Textarea
          id={fieldId("proudestProject")}
          name="proudestProject"
          rows={4}
          required
          onKeyDown={submitOnMetaEnter}
          defaultValue={str(values?.proudestProject)}
          aria-invalid={!!errors.proudestProject}
          aria-describedby={
            errors.proudestProject ? errorId("proudestProject") : undefined
          }
        />
      </Field>

      <Fieldset
        legend="Tools"
        error={errors.tools}
        errorId={errorId("tools")}
        required
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {TOOL_OPTIONS.map((option) => (
            <CheckControl
              key={option}
              name="tools"
              value={option}
              defaultChecked={arr(values?.tools).includes(option)}
            />
          ))}
        </div>
      </Fieldset>

      <Fieldset
        legend="Open to"
        error={errors.openTo}
        errorId={errorId("openTo")}
        required
      >
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
          {OPEN_TO_OPTIONS.map((option) => (
            <CheckControl
              key={option}
              type="radio"
              name="openTo"
              value={option}
              defaultChecked={str(values?.openTo) === option}
              className="sm:flex-1"
            />
          ))}
        </div>
      </Fieldset>

      <Field
        label="Earliest start date"
        htmlFor={fieldId("startDate")}
        error={errors.startDate}
        required
      >
        <Input
          id={fieldId("startDate")}
          name="startDate"
          type="date"
          required
          className="w-auto"
          defaultValue={str(values?.startDate)}
          aria-invalid={!!errors.startDate}
          aria-describedby={errors.startDate ? errorId("startDate") : undefined}
        />
      </Field>

      <Field
        label="Monthly compensation expectation (USD)"
        htmlFor={fieldId("compensation")}
        error={errors.compensation}
        optional
      >
        <Input
          id={fieldId("compensation")}
          name="compensation"
          type="text"
          inputMode="numeric"
          placeholder="e.g. 6,000"
          defaultValue={str(values?.compensation)}
          aria-invalid={!!errors.compensation}
          aria-describedby={
            errors.compensation ? errorId("compensation") : undefined
          }
        />
      </Field>

      <Field
        label="Anything we should know"
        htmlFor={fieldId("notes")}
        error={errors.notes}
        optional
      >
        <Textarea
          id={fieldId("notes")}
          name="notes"
          rows={3}
          onKeyDown={submitOnMetaEnter}
          defaultValue={str(values?.notes)}
          aria-invalid={!!errors.notes}
          aria-describedby={errors.notes ? errorId("notes") : undefined}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm font-light text-destructive"
          aria-live="polite"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          Send application
        </Button>
        <p className="text-sm font-light text-black/45">
          Reviewed directly by the founders.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className="text-black/40" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="font-normal text-black/40">Optional</span>
        ) : null}
      </Label>
      {hint ? <p className="text-sm font-light text-black/50">{hint}</p> : null}
      {children}
      <FieldError error={error} />
    </div>
  );
}

function Fieldset({
  legend,
  hint,
  error,
  errorId,
  required,
  children,
}: {
  legend: string;
  hint?: string;
  error?: string;
  errorId: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className="flex flex-col gap-2.5"
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="flex items-center gap-1 text-sm font-medium leading-none text-black">
        {legend}
        {required ? (
          <span className="text-black/40" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      {hint ? <p className="text-sm font-light text-black/50">{hint}</p> : null}
      {children}
      <FieldError error={error} id={errorId} />
    </fieldset>
  );
}

function CheckControl({
  type = "checkbox",
  name,
  value,
  defaultChecked,
  onChange,
  className,
}: {
  type?: "checkbox" | "radio";
  name: string;
  value: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border bg-white px-3.5 py-2.5 text-base font-light text-black/80 transition-colors touch-manipulation",
        "hover:border-black/25 has-[:checked]:border-primary has-[:checked]:text-black",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
        className,
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className={cn(
          "size-4 shrink-0 accent-primary outline-none",
          type === "radio" ? "rounded-full" : "rounded",
        )}
      />
      <span className="min-w-0">{value}</span>
    </label>
  );
}

function FieldError({ error, id }: { error?: string; id?: string }) {
  if (!error) return null;
  return (
    <p
      id={id}
      className="text-sm font-light text-destructive"
      aria-live="polite"
    >
      {error}
    </p>
  );
}
