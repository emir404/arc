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

- `src/pages/`: the main page, the YC and a16z speedrun pages, the launch package's page, a page per project (`work/[slug].astro`), the privacy policy and terms (Markdown) and `llms.txt`.
- `src/data/`: works, testimonials and pricing plans. Editing these updates every page that shows them.
- `src/data/site.ts`: the values more than one page shows, in one place: the booking link, the email address, the X accounts, the prices, how many Launch projects the studio takes a month and whether it's taking new ones.
- `src/data/launch.ts`: the launch page's copy and case images. A `{{…}}` in its copy is a placeholder: the page shows each one highlighted under a "do not publish" banner, and the build fails while one is left. Only Vercel's previews of other branches still build.
- `src/styles/global.css`: all styles. `src/scripts/main.js`: the works carousel and the sidebar.
- `public/works/`, `public/testimonials/`: pictures, served from the site itself. The works' pictures are WebP copies of the PNG exports in `works/` and `covers/`, which git leaves out.
- `public/launch/`: the launch page's videos, 1080p H.264 copies of the exports dropped at the root as `1.mp4` and so on (which git leaves out), each with a WebP poster.

Fonts come from Google Fonts at build time and are served from the site too (see `fonts` in `astro.config.mjs`).

## Deploy

Pushing to `main` deploys to production on Vercel. `vercel.json` sets the framework, redirects the retired `/works`, `/pricing` and `/landing` pages, and caches hashed build files for a year.
