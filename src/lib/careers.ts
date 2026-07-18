const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export type Job = {
  id: string;
  slug: string;
  title: string;
  team: string;
  location: string;
  employment_type: string;
  summary: string;
  description: string;
};

const JOB_COLUMNS =
  "id,slug,title,team,location,employment_type,summary,description";

/**
 * Reads use the publishable key: RLS only exposes rows with status = 'open'.
 * Any failure (missing env, table not created yet, network) degrades to an
 * empty list so the page can render its "no open roles" state.
 */
const fetchJobs = async (query: string): Promise<Job[]> => {
  if (!SUPABASE_URL || !PUBLISHABLE_KEY) {
    console.error("Supabase env vars missing; careers will render empty.");
    return [];
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/jobs?select=${JOB_COLUMNS}&status=eq.open&${query}`,
      {
        headers: {
          apikey: PUBLISHABLE_KEY,
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
        },
        next: { revalidate: 300, tags: ["jobs"] },
      },
    );
    if (!res.ok) {
      const body = await res.text();
      // PGRST205 = table not found: schema.sql hasn't been run yet.
      if (body.includes("PGRST205")) {
        console.warn(
          "Supabase jobs table missing — run supabase/schema.sql in the Supabase SQL editor to set up careers.",
        );
      } else {
        console.error(`Supabase jobs fetch failed (${res.status}):`, body);
      }
      return [];
    }
    return (await res.json()) as Job[];
  } catch (error) {
    console.error("Supabase jobs fetch failed:", error);
    return [];
  }
};

export const getOpenJobs = () =>
  fetchJobs("order=sort_order.asc,created_at.asc");

export const getJob = async (slug: string): Promise<Job | null> => {
  const jobs = await fetchJobs(`slug=eq.${encodeURIComponent(slug)}&limit=1`);
  return jobs[0] ?? null;
};
