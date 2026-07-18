import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type AdminJob, getAllJobs, isAuthed } from "@/lib/admin";
import { login, updateJobStatus } from "./actions";
import AdminNav from "./admin-nav";
import CreateJobForm from "./create-job-form";

const inputClass =
  "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base font-light text-black transition-colors placeholder:text-black/35 hover:border-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-destructive/60";

const LoginView = ({ error }: { error: boolean }) => (
  <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 py-20">
    <form action={login} className="flex w-full max-w-[360px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-black">
          Admin
        </h1>
        <p className="text-base font-light leading-[1.4] text-black/50">
          Enter the admin password to continue.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="admin-password"
          className="text-base font-[450] leading-none text-black"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          // biome-ignore lint/a11y/noAutofocus: sole input on a dedicated sign-in page
          autoFocus
          autoComplete="current-password"
          aria-invalid={error || undefined}
          aria-describedby={error ? "admin-password-error" : undefined}
          className={inputClass}
        />
        {error && (
          <p
            id="admin-password-error"
            aria-live="polite"
            className="text-sm font-light leading-[1.4] text-destructive"
          >
            Wrong password — try again.
          </p>
        )}
      </div>
      <Button type="submit">Sign in</Button>
    </form>
  </section>
);

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

const JobRow = ({ job }: { job: AdminJob }) => (
  <li className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-black/10 py-5">
    <div className="flex min-w-0 flex-col gap-1">
      <p className="text-lg font-[450] leading-[1.2] text-black">{job.title}</p>
      <p className="truncate text-sm font-light leading-[1.4] text-black/50">
        /careers/{job.slug} · {job.team} · {job.location} ·{" "}
        {job.employment_type} · added{" "}
        <span className="tabular-nums">
          {dateFormat.format(new Date(job.created_at))}
        </span>
      </p>
    </div>
    <div className="flex items-center gap-4">
      <form action={updateJobStatus} className="flex items-center gap-2">
        <input type="hidden" name="id" value={job.id} />
        <label htmlFor={`status-${job.id}`} className="sr-only">
          Status for {job.title}
        </label>
        <select
          id={`status-${job.id}`}
          name="status"
          defaultValue={job.status}
          className="h-9 rounded-lg border border-black/15 bg-white px-2 text-base font-light text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <option value="open">Open</option>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>
        <Button type="submit" variant="secondary" size="sm">
          Save
        </Button>
      </form>
      <Link
        href={`/careers/${job.slug}`}
        className="rounded-sm text-base font-light leading-none text-primary transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        View
      </Link>
    </div>
  </li>
);

const SetupHint = () => (
  <p className="max-w-[560px] text-lg font-light leading-[1.4] text-black/75 text-pretty">
    Couldn’t load data from Supabase. Make sure{" "}
    <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-base">
      supabase/schema.sql
    </code>{" "}
    has been run in the Supabase SQL editor, then refresh.
  </p>
);

type Props = { searchParams: Promise<{ error?: string }> };

const AdminPage = async ({ searchParams }: Props) => {
  if (!(await isAuthed())) {
    const { error } = await searchParams;
    return <LoginView error={error === "1"} />;
  }

  const jobs = await getAllJobs();

  return (
    <div className="flex flex-col gap-10 px-5 py-10 md:px-12 lg:px-24">
      <AdminNav active="roles" />
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-black">
          Roles
        </h1>
        {jobs === null ? (
          <div className="pt-4">
            <SetupHint />
          </div>
        ) : jobs.length === 0 ? (
          <p className="pt-4 text-lg font-light leading-[1.4] text-black/50">
            No roles yet — create the first one below.
          </p>
        ) : (
          <ul className="flex flex-col">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </ul>
        )}
      </section>
      <CreateJobForm />
    </div>
  );
};

export default AdminPage;
