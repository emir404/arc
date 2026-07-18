"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  adminSupabaseFetch,
  createSessionToken,
  isAuthed,
  SESSION_COOKIE_OPTIONS,
  verifyPassword,
} from "@/lib/admin";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (formData: FormData) => {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    await sleep(600); // slow down brute-force attempts
    redirect("/admin?error=1");
  }
  (await cookies()).set(
    ADMIN_COOKIE,
    createSessionToken(),
    SESSION_COOKIE_OPTIONS,
  );
  redirect("/admin");
};

export const logout = async () => {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
};

const STATUSES = ["draft", "open", "closed"] as const;
type Status = (typeof STATUSES)[number];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export type CreateJobState = {
  errors: Partial<Record<"title" | "summary" | "description" | "form", string>>;
  /** Bumps on success so the form can reset itself. */
  nonce: number;
};

export const createJob = async (
  prev: CreateJobState,
  formData: FormData,
): Promise<CreateJobState> => {
  if (!(await isAuthed())) redirect("/admin");

  const read = (key: string) => String(formData.get(key) ?? "").trim();
  const title = read("title");
  const team = read("team") || "Design";
  const location = read("location") || "Remote";
  const employmentType = read("employment_type") || "Full-time";
  const summary = read("summary");
  const description = read("description");
  const statusRaw = read("status");
  const status: Status = (STATUSES as readonly string[]).includes(statusRaw)
    ? (statusRaw as Status)
    : "draft";
  const sortParsed = Number.parseInt(read("sort_order"), 10);
  const sortOrder = Number.isFinite(sortParsed) ? sortParsed : 0;

  const errors: CreateJobState["errors"] = {};
  if (!title) errors.title = "Add a title.";
  else if (title.length > 200)
    errors.title = "Keep the title under 200 characters.";
  if (summary.length > 500)
    errors.summary = "Keep the summary under 500 characters.";
  if (description.length > 20000)
    errors.description = "Keep the description under 20,000 characters.";
  const slug = slugify(title);
  if (title && !slug)
    errors.title = "The title needs at least one letter or number.";
  if (Object.keys(errors).length > 0) return { errors, nonce: prev.nonce };

  const res = await adminSupabaseFetch("jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      slug,
      title,
      team,
      location,
      employment_type: employmentType,
      summary,
      description,
      status,
      sort_order: sortOrder,
    }),
  });
  if (res?.status === 409) {
    return {
      errors: {
        title: "A role with this URL slug already exists — tweak the title.",
      },
      nonce: prev.nonce,
    };
  }
  if (!res?.ok) {
    console.error(
      `Admin: create job failed (${res?.status}):`,
      await res?.text(),
    );
    return {
      errors: {
        form: "Couldn’t create the role. Check that supabase/schema.sql has been run, then try again.",
      },
      nonce: prev.nonce,
    };
  }

  revalidateTag("jobs", "max");
  return { errors: {}, nonce: prev.nonce + 1 };
};

export const updateJobStatus = async (formData: FormData) => {
  if (!(await isAuthed())) redirect("/admin");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id,
    ) ||
    !(STATUSES as readonly string[]).includes(status)
  ) {
    return;
  }

  const res = await adminSupabaseFetch(`jobs?id=eq.${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ status }),
  });
  if (!res?.ok) {
    console.error(
      `Admin: status update failed (${res?.status}):`,
      await res?.text(),
    );
    return;
  }
  revalidateTag("jobs", "max");
};
