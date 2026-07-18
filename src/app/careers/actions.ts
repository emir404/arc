"use server";

import { headers } from "next/headers";

import {
  type ApplicationState,
  applicationSchema,
  HONEYPOT_FIELD,
  readApplicationFormData,
  toFieldErrors,
} from "@/lib/careers-schema";
import { createApplication } from "@/lib/notion";

/**
 * Best-effort, in-memory, per-IP rate limit. NOTE: on serverless platforms each
 * instance keeps its own Map, and instances are recycled, so this only slows a
 * single warm instance — it is not a durable limiter. It exists to blunt casual
 * abuse without pulling in a captcha or external store, per the brief.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;
  return h.get("x-real-ip") ?? "unknown";
}

async function notifyByEmail(fields: {
  fullName: string;
  email: string;
  location: string;
  portfolio: string;
  openTo: string;
  startDate: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // Silently skip when not configured.

  const to = process.env.CAREERS_NOTIFY_TO ?? "emir@witharc.co";
  const from = process.env.CAREERS_NOTIFY_FROM ?? "careers@witharc.co";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New design application — ${fields.fullName}`,
      text: [
        `Name: ${fields.fullName}`,
        `Email: ${fields.email}`,
        `Location: ${fields.location}`,
        `Portfolio: ${fields.portfolio}`,
        `Open to: ${fields.openTo}`,
        `Earliest start: ${fields.startDate}`,
        "",
        "Full details are in the Notion database.",
      ].join("\n"),
    });
  } catch (error) {
    // A failed notification must not fail the application submission.
    console.error("Careers notification email failed:", error);
  }
}

export async function submitApplication(
  _prevState: ApplicationState,
  formData: FormData,
): Promise<ApplicationState> {
  const raw = readApplicationFormData(formData);

  // Honeypot: bots fill hidden fields. Return a fake success and write nothing.
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const ip = await getClientIp();
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Too many submissions. Please try again in a few minutes.",
      values: raw,
    };
  }

  const parsed = applicationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      errors: toFieldErrors(parsed.error),
      values: raw,
    };
  }

  try {
    await createApplication(parsed.data);
  } catch (error) {
    console.error("Notion application create failed:", error);
    return {
      status: "error",
      message: "Something went wrong on our end. Please try again in a moment.",
      values: raw,
    };
  }

  await notifyByEmail({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    location: parsed.data.location,
    portfolio: parsed.data.portfolio,
    openTo: parsed.data.openTo,
    startDate: parsed.data.startDate,
  });

  return { status: "success" };
}
