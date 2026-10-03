// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { works, isFinished } from "./src/data/works.ts";

// Project pages that still show placeholders. They ask search engines not to index them, so the sitemap leaves them out too.
const unfinished = Object.entries(works)
  .filter(([, work]) => !isFinished(work))
  .map(([key]) => `/work/${key}/`);

// https://astro.build/config
export default defineConfig({
  // The production address, for the absolute URLs in link previews, canonical links, the sitemap and llms.txt.
  site: "https://www.witharc.co",
  // Whitespace between tags renders as in plain HTML. Astro's default ("jsx") strips it the way JSX does,
  // which would run neighbouring words together, such as the "Y" and "Combinator companies" spans.
  compressHTML: true,
  // Writes /sitemap-index.xml, which robots.txt points crawlers to.
  integrations: [sitemap({ filter: (page) => !unfinished.includes(new URL(page).pathname) })],
  /*
    The typefaces, downloaded from Google Fonts at build time and served from the site itself; Layout.astro
    preloads them. "block" holds text back for the moment the files take to arrive, instead of drawing it in a
    stand-in typeface and swapping, which visibly redrew the page on a first visit. A font that fails to arrive
    within 3s gives way to a fallback sized to match it.
  */
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Funnel Sans",
      cssVariable: "--font-funnel-sans",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["sans-serif"],
      display: "block",
    },
    {
      provider: fontProviders.google(),
      name: "Funnel Display",
      cssVariable: "--font-funnel-display",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["sans-serif"],
      display: "block",
    },
    {
      provider: fontProviders.google(),
      name: "Caveat",
      cssVariable: "--font-caveat",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["cursive"],
      display: "block",
    },
  ],
});
