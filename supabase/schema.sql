-- Arc careers schema. Run once in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/kwwvjncfobredcjlyxga/sql/new
-- Safe to re-run: tables use IF NOT EXISTS, seeds skip existing slugs.

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  team text not null default 'Design',
  location text not null default 'Remote',
  employment_type text not null default 'Full-time',
  summary text not null default '',
  -- Plain text with a light structure the site renders:
  -- "## " starts a section heading, "- " starts a bullet, blank lines split paragraphs.
  description text not null default '',
  status text not null default 'open' check (status in ('draft', 'open', 'closed')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs (id) on delete set null,
  -- Denormalized so an application stays readable if the job row is deleted.
  job_title text not null,
  name text not null,
  email text not null,
  portfolio_url text not null,
  x_url text,
  linkedin_url text,
  -- Structured answers from the form's select questions
  -- (option lists live in src/lib/careers-application.ts).
  engagement text,
  focus text,
  experience text,
  availability text,
  location text,
  compensation text,
  message text,
  created_at timestamptz not null default now()
);

-- Idempotent upgrade for databases created before the extra questions.
alter table public.applications
  add column if not exists engagement text,
  add column if not exists focus text,
  add column if not exists experience text,
  add column if not exists availability text,
  add column if not exists location text,
  add column if not exists x_url text,
  add column if not exists linkedin_url text,
  add column if not exists compensation text;

alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- The site lists roles with the publishable key, so only rows with
-- status = 'open' are visible to the public. Drafts and closed roles,
-- and everything in applications, are reachable only with the secret
-- key (service role bypasses RLS) — i.e. only from the server.
drop policy if exists "Public can read open jobs" on public.jobs;
create policy "Public can read open jobs"
  on public.jobs for select
  to anon, authenticated
  using (status = 'open');

-- Intentionally no policies on public.applications: the API route inserts
-- with the secret key; browsers can neither read nor write applications.

-- ---------------------------------------------------------------------------
-- Seed roles — the live listings. Manage rows later in /admin or in the
-- Supabase Table Editor → jobs.
-- ---------------------------------------------------------------------------

insert into public.jobs (slug, title, team, location, employment_type, summary, description, sort_order)
values
  (
    'designer',
    'Designer',
    'Design',
    'Remote',
    'Full-time, Contract, or Project-based',
    'Design brand, product, and web for early-stage startups — engagement shaped around how you work best.',
    $description$
## About the role
Arc is the all-in-one design studio for early-stage startups, trusted by 10+ Y Combinator companies. We’re hiring designers to work directly with founders — shaping product direction, designing interfaces, and shipping work that moves their companies forward.

## What you’ll do
- Design across brand, product, and web for a small number of startups at a time
- Turn loose founder ideas into clear flows, interfaces, and prototypes
- Build design systems that scale with each product
- Present work directly to founders and iterate fast on honest feedback

## What we look for
- A portfolio of shipped work, not just visuals
- Strong systems thinking and typography fundamentals
- Comfort with ambiguity and async, momentum-driven work
- Experience with early-stage startups is a plus

## How we work
Small team, direct communication, tight feedback loops. Remote-first and async-friendly. We’re open to full-time, contract, or project-based engagements, tell us what suits you when you apply.
$description$,
    0
  )
on conflict (slug) do nothing;
