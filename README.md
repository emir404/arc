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
- `src/data/booking.ts`: the link behind every “Book a call”. It tags the link with the page it's on (`utm_source=site&utm_medium=cta&utm_campaign=<page>`, plus `metadata[page]`, which Cal.com keeps with the booking). A visitor who arrived with UTM tags or `ref` keeps theirs instead, for the rest of the visit, with `utm_content=<page>` (`src/scripts/arrival.ts`).
- `src/styles/global.css`: all styles. `src/scripts/main.js`: the works carousel and the sidebar.
- `public/works/`, `public/testimonials/`: pictures, served from the site itself. The works' pictures are WebP copies of the PNG exports in `works/` and `covers/`, which git leaves out.
- `public/launch/`: the launch page's videos, 1080p H.264 copies of the exports dropped at the root as `1.mp4` and so on (which git leaves out), each with a WebP poster.

Fonts come from Google Fonts at build time and are served from the site too (see `fonts` in `astro.config.mjs`).

## Analytics

PostHog, on production builds that have `PUBLIC_POSTHOG_PROJECT_TOKEN` (`src/data/analytics.ts`). It records nothing until a visitor answers the cookie banner. Beside PostHog's own pageviews and clicks, the site sends:

- `book_call_clicked` `{ page, location, offer? }` from every “Book a call”: links with `data-book="<location>"` (`hero`, `pricing`, `faq`, `footer`…) and, for one offer, `data-offer` (`launch`, `partnership`, `custom`).
- `contact_clicked` `{ page, location }` from every email link.
- `see_launch_clicked` `{ page, location }` from the main page's “See Launch →”: any link can name its own event in `data-event`, with `data-location`.
- `call_booked` `{ page, location, offer?, utm_source, utm_campaign }` when a booking goes through in Cal.com's popup, which “Book a call” opens on the pages in `CAL_POPUP_PAGES` (`src/data/site.ts`). Elsewhere it opens Cal.com in a new tab, where bookings can't be seen.

`page` is `home`, `yc`, `speedrun`, `launch`, or a path such as `work-axiom`. Every event of a visit also carries the UTM tags and `ref` the visitor arrived with.

### Internal traffic

Open any page of the site once with `?internal=1` (such as `https://www.witharc.co/?internal=1`) on every browser and phone the team uses. The browser remembers it (`arc_internal` in localStorage), and from then on every event it sends carries `is_internal: true`; `?internal=0` undoes it. Nothing is dropped, so the team's own clicks can still be looked at.

In PostHog, leave them out of the numbers: Settings → Project → Product analytics → “Filter out internal and test users”, add the filter `is_internal` is not `true`. Insights then have a toggle for it, and Web analytics a “Filter out internal and test users” switch.

## Deploy

Pushing to `main` deploys to production on Vercel. `vercel.json` sets the framework, redirects the retired `/works`, `/pricing` and `/landing` pages, sends `/a16z`, `/a16z-speedrun` and `/sr` to the speedrun page, and caches hashed build files for a year. Redirects keep the address's query, so `/a16z?utm_source=x` lands on `/speedrun/?utm_source=x`. A source ending in `{/}?` matches the address with or without a trailing slash; without it, `/a16z/` would be a 404.
