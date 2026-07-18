import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { type AdminApplication, getApplications, isAuthed } from "@/lib/admin";
import AdminNav from "../admin-nav";

export const metadata: Metadata = { title: "Applications — Admin" };

const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const ApplicationRow = ({ application }: { application: AdminApplication }) => (
  <li className="flex flex-col gap-2.5 border-b border-black/10 py-6">
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <p className="text-lg font-[450] leading-[1.2] text-black">
        {application.name}{" "}
        <span className="font-light text-black/50">
          — {application.job_title}
        </span>
      </p>
      <p className="text-sm font-light leading-none text-black/40 tabular-nums">
        {dateTimeFormat.format(new Date(application.created_at))}
      </p>
    </div>
    <div className="flex min-w-0 flex-wrap items-baseline gap-x-6 gap-y-1 text-base font-light leading-[1.4]">
      <a
        href={`mailto:${application.email}`}
        className="rounded-sm text-primary transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {application.email}
      </a>
      <a
        href={application.portfolio_url}
        target="_blank"
        rel="noopener noreferrer"
        className="max-w-full truncate rounded-sm text-primary transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {displayUrl(application.portfolio_url)}&nbsp;↗
      </a>
    </div>
    {(application.engagement ||
      application.focus ||
      application.experience ||
      application.availability ||
      application.location) && (
      <p className="text-sm font-light leading-[1.5] text-black/50">
        {[
          application.engagement,
          application.focus,
          application.experience,
          application.availability,
          application.location,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>
    )}
    {application.message && (
      <p className="max-w-[720px] whitespace-pre-wrap text-base font-light leading-[1.5] text-black/75 break-words">
        {application.message}
      </p>
    )}
  </li>
);

const ApplicationsPage = async () => {
  if (!(await isAuthed())) redirect("/admin");

  const applications = await getApplications();

  return (
    <div className="flex flex-col gap-10 px-5 py-10 md:px-12 lg:px-24">
      <AdminNav active="applications" />
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-black">
          Applications
          {applications !== null && (
            <span className="font-light text-black/40 tabular-nums">
              {" "}
              ({applications.length})
            </span>
          )}
        </h1>
        {applications === null ? (
          <p className="max-w-[560px] pt-4 text-lg font-light leading-[1.4] text-black/75 text-pretty">
            Couldn’t load data from Supabase. Make sure{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-base">
              supabase/schema.sql
            </code>{" "}
            has been run in the Supabase SQL editor, then refresh.
          </p>
        ) : applications.length === 0 ? (
          <p className="pt-4 text-lg font-light leading-[1.4] text-black/50">
            No applications yet. They’ll show up here the moment someone
            applies.
          </p>
        ) : (
          <ul className="flex flex-col">
            {applications.map((application) => (
              <ApplicationRow key={application.id} application={application} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ApplicationsPage;
