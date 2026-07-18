/**
 * Option lists for the application form's select questions.
 * Shared by the client form and the API route so validation and the
 * stored values always agree. Values are stored verbatim in Supabase.
 */
export const ENGAGEMENT_OPTIONS = [
  "Full-time",
  "Contract",
  "Project-based",
  "Open to any",
] as const;

export const FOCUS_OPTIONS = [
  "Product design",
  "Brand design",
  "Web design",
  "Generalist",
] as const;

export const EXPERIENCE_OPTIONS = [
  "0–2 years",
  "2–4 years",
  "4–7 years",
  "7+ years",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Immediately",
  "Within a month",
  "In 1–3 months",
] as const;
