# Arc Studio

The website for [Arc Studio](https://www.witharc.co), built with [Astro](https://astro.build) as static pages.

## Develop

```sh
bun install
bun run dev      # http://localhost:4321
bun run build    # writes dist/
```

Node 22.12 or newer.

## Where things are

- `src/pages/`: the main page, the YC page, a page per project (`work/[slug].astro`), the privacy policy and terms (Markdown) and `llms.txt`.
- `src/data/`: works, testimonials, pricing plans and links. Editing these updates every page that shows them.
- `src/styles/global.css`: all styles. `src/scripts/main.js`: the works carousel and the sidebar.
- `public/works/`, `public/testimonials/`: pictures, served from the site itself.

Fonts come from Google Fonts at build time and are served from the site too (see `fonts` in `astro.config.mjs`).

## Deploy

Pushing to `main` deploys to production on Vercel. `vercel.json` sets the framework, redirects the retired `/works`, `/pricing` and `/landing` pages, and caches hashed build files for a year.
