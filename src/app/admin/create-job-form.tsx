"use client";

import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { type CreateJobState, createJob } from "./actions";

const initialState: CreateJobState = { errors: {}, nonce: 0 };

const inputClass =
  "h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base font-light text-black transition-colors placeholder:text-black/35 hover:border-black/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-invalid:border-destructive/60";
const labelClass = "text-base font-[450] leading-none text-black";
const hintClass = "text-sm font-light leading-[1.4] text-black/40";
const errorClass = "text-sm font-light leading-[1.4] text-destructive";

const CreateJobForm = () => {
  const [state, formAction, pending] = useActionState(createJob, initialState);

  return (
    <section className="flex flex-col gap-6 border-t border-black/10 pt-10">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold leading-none tracking-[-0.02em] text-black">
          New role
        </h2>
        <p className="text-base font-light leading-[1.4] text-black/50">
          Published at /careers/&lt;slug&gt; — the slug comes from the title.
        </p>
      </div>

      <output aria-live="polite" className="contents">
        {state.nonce > 0 && (
          <p className="max-w-[640px] rounded-xl bg-primary/5 px-4 py-3 text-base font-light leading-[1.4] text-primary">
            Role created. If its status is Open, it’s already live on the
            careers page.
          </p>
        )}
      </output>

      <form
        key={state.nonce}
        action={formAction}
        className="flex w-full max-w-[640px] flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="job-title" className={labelClass}>
            Title
          </label>
          <input
            id="job-title"
            name="title"
            type="text"
            required
            placeholder="Product Designer…"
            aria-invalid={state.errors.title ? true : undefined}
            aria-describedby={
              state.errors.title ? "job-title-error" : undefined
            }
            className={inputClass}
          />
          {state.errors.title && (
            <p id="job-title-error" className={errorClass}>
              {state.errors.title}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="job-team" className={labelClass}>
              Team
            </label>
            <input
              id="job-team"
              name="team"
              type="text"
              defaultValue="Design"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="job-location" className={labelClass}>
              Location
            </label>
            <input
              id="job-location"
              name="location"
              type="text"
              defaultValue="Remote"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="job-type" className={labelClass}>
              Type
            </label>
            <input
              id="job-type"
              name="employment_type"
              type="text"
              defaultValue="Full-time"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="job-status" className={labelClass}>
              Status
            </label>
            <select
              id="job-status"
              name="status"
              defaultValue="open"
              className="h-12 w-full rounded-xl border border-black/15 bg-white px-3 text-base font-light text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <option value="open">Open — live on the site</option>
              <option value="draft">Draft — hidden</option>
              <option value="closed">Closed — hidden</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="job-sort" className={labelClass}>
              Sort order
            </label>
            <input
              id="job-sort"
              name="sort_order"
              type="number"
              defaultValue={0}
              step={1}
              className={`${inputClass} tabular-nums`}
            />
            <p className={hintClass}>Lower numbers appear first.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="job-summary" className={labelClass}>
            Summary
          </label>
          <input
            id="job-summary"
            name="summary"
            type="text"
            placeholder="One sentence shown in search results and link previews…"
            aria-invalid={state.errors.summary ? true : undefined}
            aria-describedby={
              state.errors.summary ? "job-summary-error" : undefined
            }
            className={inputClass}
          />
          {state.errors.summary && (
            <p id="job-summary-error" className={errorClass}>
              {state.errors.summary}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="job-description" className={labelClass}>
            Description
          </label>
          <textarea
            id="job-description"
            name="description"
            rows={12}
            placeholder={
              "## About the role\nWhat this person will own…\n\n## What you’ll do\n- First responsibility\n- Second responsibility"
            }
            aria-invalid={state.errors.description ? true : undefined}
            aria-describedby="job-description-hint"
            className={`${inputClass} h-auto min-h-[240px] resize-y py-3 font-mono text-sm leading-[1.6]`}
          />
          <p id="job-description-hint" className={hintClass}>
            Formatting: “##&nbsp;” starts a section heading, “-&nbsp;” starts a
            bullet, blank lines split paragraphs.
          </p>
          {state.errors.description && (
            <p className={errorClass}>{state.errors.description}</p>
          )}
        </div>

        {state.errors.form && (
          <p className={`${errorClass} text-base`}>{state.errors.form}</p>
        )}

        <div>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 aria-hidden className="animate-spin" />}
            Create role
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreateJobForm;
