import { after } from "next/server";
import {
  AVAILABILITY_OPTIONS,
  ENGAGEMENT_OPTIONS,
  EXPERIENCE_OPTIONS,
  FOCUS_OPTIONS,
} from "@/lib/careers-application";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.CAREERS_NOTIFY_EMAIL ?? "emir@witharc.co";
const FROM_EMAIL =
  process.env.CAREERS_FROM_EMAIL ?? "Arc Careers <careers@witharc.co>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = `Something went wrong and your application wasn’t sent. Please try again, or email us at ${NOTIFY_EMAIL}.`;

type FieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "portfolio"
    | "engagement"
    | "focus"
    | "experience"
    | "availability"
    | "location"
    | "message",
    string
  >
>;

/** Accepts bare domains ("dribbble.com/jane") and normalizes to https. */
const normalizeUrl = (raw: string): string | null => {
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const notifyByEmail = async (application: {
  jobTitle: string;
  name: string;
  email: string;
  portfolioUrl: string;
  details: [label: string, value: string][];
  message: string;
}) => {
  if (!RESEND_API_KEY) {
    console.error(
      "Careers apply: RESEND_API_KEY missing, notification not sent.",
    );
    return;
  }
  const { jobTitle, name, email, portfolioUrl, details, message } = application;
  const projectRef = SUPABASE_URL
    ? new URL(SUPABASE_URL).hostname.split(".")[0]
    : null;
  const dashboardUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}/editor`
    : null;

  const html = [
    '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#111">',
    `<h2 style="font-size:18px;margin:0 0 16px">New application — ${escapeHtml(jobTitle)}</h2>`,
    `<p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> · <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    `<p style="margin:0 0 16px"><a href="${escapeHtml(portfolioUrl)}">${escapeHtml(portfolioUrl)}</a></p>`,
    `<p style="margin:0 0 16px">${details
      .map(
        ([label, value]) =>
          `<span style="color:#777">${escapeHtml(label)}:</span> ${escapeHtml(value)}`,
      )
      .join("<br>")}</p>`,
    message
      ? `<p style="white-space:pre-wrap;margin:0 0 16px">${escapeHtml(message)}</p>`
      : "",
    dashboardUrl
      ? `<p style="margin:0"><a href="${dashboardUrl}">All applications in Supabase</a></p>`
      : "",
    "</div>",
  ].join("");

  const text = [
    `New application — ${jobTitle}`,
    "",
    name,
    email,
    portfolioUrl,
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
    message ? `\n${message}` : "",
    dashboardUrl ? `\nAll applications: ${dashboardUrl}` : "",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [NOTIFY_EMAIL],
        reply_to: [email],
        subject: `${name} applied for ${jobTitle}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error(
        `Careers apply: Resend send failed (${res.status}):`,
        await res.text(),
      );
    }
  } catch (error) {
    console.error("Careers apply: Resend send failed:", error);
  }
};

export const POST = async (request: Request) => {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    console.error("Careers apply: Supabase server env vars missing.");
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }
  const supabaseHeaders = {
    apikey: SUPABASE_SECRET_KEY,
    Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
  };

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const read = (key: string) => {
    const value = payload[key];
    return typeof value === "string" ? value.trim() : "";
  };
  const jobSlug = read("jobSlug");
  const name = read("name");
  const email = read("email");
  const portfolio = read("portfolio");
  const engagement = read("engagement");
  const focus = read("focus");
  const experience = read("experience");
  const availability = read("availability");
  const location = read("location");
  const message = read("message");
  const honeypot = read("company");

  // Bots fill the hidden field; pretend success and store nothing.
  if (honeypot !== "") return Response.json({ ok: true });

  if (!jobSlug) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const errors: FieldErrors = {};
  if (!name) errors.name = "Please add your name.";
  else if (name.length > 200)
    errors.name = "Please keep your name under 200 characters.";
  if (!email || !EMAIL_RE.test(email) || email.length > 320)
    errors.email = "That email doesn’t look right — double-check it.";
  const portfolioUrl = portfolio ? normalizeUrl(portfolio) : null;
  if (!portfolio) errors.portfolio = "Please add a link to your work.";
  else if (portfolio.length > 500 || !portfolioUrl)
    errors.portfolio = "That link doesn’t look right — double-check it.";
  if (!(ENGAGEMENT_OPTIONS as readonly string[]).includes(engagement))
    errors.engagement = "Please choose an engagement type.";
  if (!(FOCUS_OPTIONS as readonly string[]).includes(focus))
    errors.focus = "Please choose your main focus.";
  if (!(EXPERIENCE_OPTIONS as readonly string[]).includes(experience))
    errors.experience = "Please choose your experience level.";
  if (!(AVAILABILITY_OPTIONS as readonly string[]).includes(availability))
    errors.availability = "Please choose when you could start.";
  if (!location) errors.location = "Please add your city and timezone.";
  else if (location.length > 200)
    errors.location = "Please keep this under 200 characters.";
  if (message.length > 5000)
    errors.message = "Please keep your message under 5,000 characters.";
  if (Object.keys(errors).length > 0 || !portfolioUrl) {
    return Response.json({ errors }, { status: 400 });
  }

  const jobRes = await fetch(
    `${SUPABASE_URL}/rest/v1/jobs?select=id,title&slug=eq.${encodeURIComponent(jobSlug)}&status=eq.open&limit=1`,
    { headers: supabaseHeaders, cache: "no-store" },
  );
  if (!jobRes.ok) {
    console.error(
      `Careers apply: job lookup failed (${jobRes.status}):`,
      await jobRes.text(),
    );
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }
  const [job] = (await jobRes.json()) as { id: string; title: string }[];
  if (!job) {
    return Response.json(
      {
        error:
          "This role is no longer open — take a look at our other openings.",
      },
      { status: 404 },
    );
  }

  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
    method: "POST",
    headers: {
      ...supabaseHeaders,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      job_id: job.id,
      job_title: job.title,
      name,
      email,
      portfolio_url: portfolioUrl,
      engagement,
      focus,
      experience,
      availability,
      location,
      message: message || null,
    }),
  });
  if (!insertRes.ok) {
    console.error(
      `Careers apply: insert failed (${insertRes.status}):`,
      await insertRes.text(),
    );
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  // Notify after the response is sent — a mail hiccup must not fail an
  // application that is already stored.
  after(() =>
    notifyByEmail({
      jobTitle: job.title,
      name,
      email,
      portfolioUrl,
      details: [
        ["Engagement", engagement],
        ["Focus", focus],
        ["Experience", experience],
        ["Available", availability],
        ["Based in", location],
      ],
      message,
    }),
  );

  return Response.json({ ok: true });
};
