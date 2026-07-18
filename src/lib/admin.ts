import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const ADMIN_COOKIE = "arc_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // one week

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

const hmac = (value: string) =>
  ADMIN_PASSWORD
    ? createHmac("sha256", `arc-admin:${ADMIN_PASSWORD}`)
        .update(value)
        .digest("hex")
    : null;

const safeEqual = (a: string, b: string) => {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
};

export const verifyPassword = (password: string) => {
  if (!ADMIN_PASSWORD) {
    console.error("Admin: ADMIN_PASSWORD env var missing; sign-in disabled.");
    return false;
  }
  // Compare digests rather than raw strings so the comparison is
  // constant-time regardless of input length.
  const expected = hmac(`password:${ADMIN_PASSWORD}`);
  const provided = hmac(`password:${password}`);
  return Boolean(expected && provided && safeEqual(expected, provided));
};

/** Stateless session: "<expiry-ms>.<hmac>", keyed by the admin password. */
export const createSessionToken = () => {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  return `${expiresAt}.${hmac(`session:${expiresAt}`)}`;
};

export const isAuthed = async () => {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token || !ADMIN_PASSWORD) return false;
  const [expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now() || !signature) {
    return false;
  }
  const expected = hmac(`session:${expiresAt}`);
  return Boolean(expected && safeEqual(expected, signature));
};

export type AdminJob = {
  id: string;
  slug: string;
  title: string;
  team: string;
  location: string;
  employment_type: string;
  summary: string;
  status: "draft" | "open" | "closed";
  sort_order: number;
  created_at: string;
};

export type AdminApplication = {
  id: string;
  job_title: string;
  name: string;
  email: string;
  portfolio_url: string;
  x_url: string | null;
  linkedin_url: string | null;
  engagement: string | null;
  focus: string | null;
  experience: string | null;
  availability: string | null;
  location: string | null;
  compensation: string | null;
  message: string | null;
  created_at: string;
};

/** Service-role request: bypasses RLS, so it must never leave the server. */
export const adminSupabaseFetch = async (
  path: string,
  init: RequestInit = {},
): Promise<Response | null> => {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error("Admin: Supabase server env vars missing.");
    return null;
  }
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
      ...init.headers,
    },
    cache: "no-store",
  });
};

const logAdminFetchFailure = (
  context: string,
  res: Response | null,
  body: string,
) => {
  // PGRST205 = table not found: schema.sql hasn't been run yet.
  if (body.includes("PGRST205")) {
    console.warn(
      `Admin: ${context} table missing — run supabase/schema.sql in the Supabase SQL editor.`,
    );
    return;
  }
  console.error(`Admin: ${context} fetch failed (${res?.status}):`, body);
};

/** null means "couldn't load" (likely schema.sql not run yet), [] means empty. */
export const getAllJobs = async (): Promise<AdminJob[] | null> => {
  const res = await adminSupabaseFetch(
    "jobs?select=id,slug,title,team,location,employment_type,summary,status,sort_order,created_at&order=sort_order.asc,created_at.asc",
  );
  if (!res?.ok) {
    logAdminFetchFailure("jobs", res, (await res?.text()) ?? "");
    return null;
  }
  return (await res.json()) as AdminJob[];
};

export const getApplications = async (): Promise<AdminApplication[] | null> => {
  const res = await adminSupabaseFetch(
    "applications?select=id,job_title,name,email,portfolio_url,x_url,linkedin_url,engagement,focus,experience,availability,location,compensation,message,created_at&order=created_at.desc",
  );
  if (!res?.ok) {
    logAdminFetchFailure("applications", res, (await res?.text()) ?? "");
    return null;
  }
  return (await res.json()) as AdminApplication[];
};
