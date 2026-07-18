import { z } from "zod";

/**
 * Shared between the client form (labels + option order) and the server action
 * (zod validation). Keeping the single source of truth here prevents the
 * rendered choices from drifting away from what the server will accept.
 */

export const STRENGTH_OPTIONS = [
  "Brand identity",
  "Web and marketing sites",
  "Product UI and UX",
  "Motion and interaction",
] as const;

export const TOOL_OPTIONS = [
  "Figma",
  "Framer",
  "Webflow",
  "Next.js and Tailwind (I ship code)",
  "After Effects or other motion",
  "Other",
] as const;

export const OPEN_TO_OPTIONS = ["Full-time", "Contract", "Either"] as const;

export const STATUS_OPTIONS = [
  "New",
  "Review",
  "Interview",
  "Offer",
  "Pass",
] as const;

export const HONEYPOT_FIELD = "company_website";

const optionalText = z
  .string()
  .trim()
  .max(2000, "Please keep this under 2000 characters.")
  .optional()
  .transform((value) => (value ? value : undefined));

const optionalUrl = z
  .union([z.literal(""), z.url("Enter a valid URL (including https://).")])
  .optional()
  .transform((value) => (value ? value : undefined));

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(120, "That name is a little long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .pipe(z.email("Enter a valid email address.")),
  location: z
    .string()
    .trim()
    .min(1, "Let us know where you are and your timezone.")
    .max(200),
  portfolio: z
    .string()
    .trim()
    .min(1, "A portfolio link is required.")
    .pipe(z.url("Enter a valid URL (including https://).")),
  xProfile: optionalUrl,
  otherLinks: optionalText,
  strengths: z
    .array(z.enum(STRENGTH_OPTIONS))
    .min(1, "Pick at least one.")
    .max(2, "Choose up to two."),
  proudestProject: z
    .string()
    .trim()
    .min(1, "Tell us about one project.")
    .max(4000, "Please keep this under 4000 characters."),
  tools: z.array(z.enum(TOOL_OPTIONS)).min(1, "Select the tools you use."),
  openTo: z.enum(OPEN_TO_OPTIONS, { error: "Pick one." }),
  startDate: z
    .string()
    .trim()
    .min(1, "Add your earliest start date.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker."),
  compensation: optionalText,
  notes: optionalText,
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export type FieldErrors = Partial<Record<keyof ApplicationInput, string>> & {
  form?: string;
};

export type ApplicationState = {
  status: "idle" | "success" | "error";
  errors?: FieldErrors;
  message?: string;
  /** Echoed back so the client can repopulate inputs after a failed submit. */
  values?: Record<string, string | string[]>;
};

/** Build a plain object from FormData, collecting the multi-value fields. */
export function readApplicationFormData(formData: FormData) {
  const single = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };
  const multi = (key: string) =>
    formData
      .getAll(key)
      .filter((value): value is string => typeof value === "string");

  return {
    fullName: single("fullName"),
    email: single("email"),
    location: single("location"),
    portfolio: single("portfolio"),
    xProfile: single("xProfile"),
    otherLinks: single("otherLinks"),
    strengths: multi("strengths"),
    proudestProject: single("proudestProject"),
    tools: multi("tools"),
    openTo: single("openTo"),
    startDate: single("startDate"),
    compensation: single("compensation"),
    notes: single("notes"),
  };
}

/** Collapse zod issues into one message per field for inline display. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      (errors as Record<string, string>)[key] = issue.message;
    }
  }
  return errors;
}
