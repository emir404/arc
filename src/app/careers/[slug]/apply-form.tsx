"use client";

import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";

type FieldName = "name" | "email" | "portfolio" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: FieldName[] = ["name", "email", "portfolio", "message"];

const validate = (values: Record<FieldName, string>): FieldErrors => {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Please add your name.";
  else if (values.name.length > 200)
    errors.name = "Please keep your name under 200 characters.";
  if (!values.email) errors.email = "Please add your email so we can reply.";
  else if (!EMAIL_RE.test(values.email) || values.email.length > 320)
    errors.email = "That email doesn’t look right — double-check it.";
  if (!values.portfolio) errors.portfolio = "Please add a link to your work.";
  else if (values.portfolio.length > 500)
    errors.portfolio = "Please keep the link under 500 characters.";
  if (values.message.length > 5000)
    errors.message = "Please keep your message under 5,000 characters.";
  return errors;
};

const inputClass =
  "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base font-light text-black transition-colors placeholder:text-black/35 hover:border-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-destructive/60";

const ApplyForm = ({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) => {
  const id = useId();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const focusFirstError = (form: HTMLFormElement, fieldErrors: FieldErrors) => {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (!first) return;
    const element = form.elements.namedItem(first);
    if (element instanceof HTMLElement) element.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (field: string) => String(data.get(field) ?? "").trim();
    const values = {
      name: read("name"),
      email: read("email"),
      portfolio: read("portfolio"),
      message: read("message"),
    };

    setRequestError(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setLiveMessage(
        "Some fields need attention before your application can be sent.",
      );
      focusFirstError(form, nextErrors);
      return;
    }

    setStatus("submitting");
    setLiveMessage("Sending your application…");
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobSlug,
          ...values,
          company: String(data.get("company") ?? ""),
        }),
      });
      const body = (await res.json().catch(() => null)) as {
        error?: string;
        errors?: FieldErrors;
      } | null;
      if (!res.ok) {
        if (body?.errors && Object.keys(body.errors).length > 0) {
          setErrors(body.errors);
          setStatus("idle");
          setLiveMessage(
            "Some fields need attention before your application can be sent.",
          );
          focusFirstError(form, body.errors);
          return;
        }
        setStatus("idle");
        setRequestError(
          body?.error ??
            "Something went wrong and your application wasn’t sent. Please try again, or email us at emir@witharc.co.",
        );
        setLiveMessage("Your application couldn’t be sent.");
        return;
      }
      setDirty(false);
      setStatus("success");
      setLiveMessage("Application sent.");
    } catch {
      setStatus("idle");
      setRequestError(
        "Something went wrong and your application wasn’t sent. Please try again, or email us at emir@witharc.co.",
      );
      setLiveMessage("Your application couldn’t be sent.");
    }
  };

  const submitOnHardEnter = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <>
      <output aria-live="polite" className="sr-only">
        {liveMessage}
      </output>

      {status === "success" ? (
        <div className="flex max-w-[560px] flex-col items-start gap-6 rounded-2xl border border-black/10 bg-[#fafafa] p-6 md:p-8">
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check aria-hidden className="size-5" />
          </span>
          <div className="flex flex-col gap-2">
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-xl font-[450] leading-[1.3] tracking-[-0.01em] text-black"
            >
              Application sent
            </h2>
            <p className="text-lg font-light leading-[1.4] text-black/75 text-pretty">
              Thanks for applying to {jobTitle}. We read every application and
              will get back to you within a few days.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/careers">Back to all roles</Link>
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          onInput={() => setDirty(true)}
          className="relative flex w-full max-w-[560px] flex-col items-start gap-6"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-[450] leading-[1.3] tracking-[-0.01em] text-black">
              Apply for this role
            </h2>
            <p className="text-base font-light leading-[1.4] text-black/50">
              We read every application and reply to everyone.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor={`${id}-name`}
              className="text-base font-[450] leading-none text-black"
            >
              Name
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your full name…"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className={inputClass}
            />
            {errors.name && (
              <p
                id={`${id}-name-error`}
                className="text-sm font-light leading-[1.4] text-destructive"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor={`${id}-email`}
              className="text-base font-[450] leading-none text-black"
            >
              Email
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="you@company.com…"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${id}-email-error` : undefined}
              className={inputClass}
            />
            {errors.email && (
              <p
                id={`${id}-email-error`}
                className="text-sm font-light leading-[1.4] text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor={`${id}-portfolio`}
              className="text-base font-[450] leading-none text-black"
            >
              Portfolio, LinkedIn, or GitHub
            </label>
            <input
              id={`${id}-portfolio`}
              name="portfolio"
              type="url"
              required
              autoComplete="url"
              inputMode="url"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="https://…"
              aria-invalid={errors.portfolio ? true : undefined}
              aria-describedby={
                errors.portfolio ? `${id}-portfolio-error` : undefined
              }
              className={inputClass}
            />
            {errors.portfolio && (
              <p
                id={`${id}-portfolio-error`}
                className="text-sm font-light leading-[1.4] text-destructive"
              >
                {errors.portfolio}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor={`${id}-message`}
              className="text-base font-[450] leading-none text-black"
            >
              Message{" "}
              <span className="font-light text-black/40">(optional)</span>
            </label>
            <textarea
              id={`${id}-message`}
              name="message"
              rows={5}
              onKeyDown={submitOnHardEnter}
              placeholder="What should we know? Work you’re proud of, how you like to work…"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? `${id}-message-error` : undefined
              }
              className={`${inputClass} h-auto min-h-[132px] resize-y py-3`}
            />
            {errors.message && (
              <p
                id={`${id}-message-error`}
                className="text-sm font-light leading-[1.4] text-destructive"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — humans never see it, bots fill it. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] size-px overflow-hidden"
          >
            <label htmlFor={`${id}-company`}>Company</label>
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {requestError && (
            <p className="text-base font-light leading-[1.4] text-destructive text-pretty">
              {requestError}
            </p>
          )}

          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" && (
              <Loader2 aria-hidden className="animate-spin" />
            )}
            Send application
          </Button>
        </form>
      )}
    </>
  );
};

export default ApplyForm;
