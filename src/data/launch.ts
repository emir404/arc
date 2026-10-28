import type { TestimonialKey } from "./testimonials";
import type { WorkKey } from "./works";

/*
  The copy for the launch page (/launch/), and the case images its card opens into.

  A {{…}} in a line is a placeholder for something not decided yet. The page shows each one highlighted, under a banner
  that says not to publish, and asks search engines to leave it out. While one is left the build stops, so none can
  reach the live site: only Vercel's previews of other branches, which need a Vercel login, still build.
  To settle one, write the real words in its place.
*/

/** A picture from a project's page, by its number there: { work: "orchid", picture: 1 } is "Orchid, picture 1". */
export interface CasePicture {
  work: WorkKey;
  picture: number;
}

/**
 * A video in public/launch/: an H.264 copy of the user's export, at most 1920 × 1080, with sound. Its poster is the frame
 * shown before it plays, a WebP beside it. Its width and height hold its space before anything loads.
 */
export interface CaseVideo {
  video: string;
  poster: string;
  width: number;
  height: number;
  /** In seconds, shown on its play button before it has loaded. */
  duration: number;
  /** What it is, for screen readers. */
  label: string;
}

export type CaseImage = CasePicture | CaseVideo;

export interface Launch {
  /** The headline, at the top. */
  title: string;
  tagline: string;
  /** The line under the tagline: what the package is, and who it's for. */
  sub: string;
  /** The clients named in the intro, in order, before "& more". Each name links to its project page, if it has one. */
  clients: WorkKey[];
  /** What's included: the four parts, each with a line long enough to run to two lines on any screen. */
  included: { name: string; text: string }[];
  /** Under the "Book a Launch call" button: what the call is, and what you get from it. */
  call: string;
  /** What the "Case images" card opens into, top to bottom: pictures from the project pages and videos. With none, it opens into empty covers. */
  caseImages: CaseImage[];
  /** The quotes, from the main page, top to bottom. [] leaves them out. */
  quotes: TestimonialKey[];
  /** The headline over the buttons at the end. */
  closing: string;
}

export const launch: Launch = {
  // A non-breaking space keeps "a month." together, so the headline never ends on a word of its own.
  title: "Everything you need to launch, in a\u00a0month.",
  tagline: "Brand, website, product, and video, all done by us.",
  sub: "Fixed scope, fixed price, for startups about to launch.",
  clients: ["spacefast", "axiom", "flashnet", "agentmail", "agentphone", "orchid", "conviction"],
  included: [
    { name: "Branding", text: "Identity, logo, and a brand guide. We use it on the site, product, and video." },
    { name: "Website", text: "A landing page for launch day, designed and built." },
    { name: "Product", text: "Up to 12 screens you need for launch, designed and built. Front end only." },
    { name: "Video", text: "A launch video, up to 90 seconds, made from your brand and product." },
  ],
  call: "30 minutes with Emir and Omer. You’ll know price, scope, and start date by the end of it.",
  // Motion first: the launch videos, then the pictures. (Before 2026-10-28 the order was Orchid 1–3, Keiki,
  // Spacefast 1, 2, 3, 5, 8, then the two Flip videos.)
  caseImages: [
    { video: "/launch/1.mp4", poster: "/launch/1.webp", width: 1920, height: 1080, duration: 42, label: "Keiki launch video" },
    { video: "/launch/2.mp4", poster: "/launch/2.webp", width: 1920, height: 1080, duration: 42, label: "Flip launch video" },
    { video: "/launch/3.mp4", poster: "/launch/3.webp", width: 1920, height: 1080, duration: 37, label: "Flip product video" },
    { work: "orchid", picture: 1 },
    { work: "orchid", picture: 2 },
    { work: "orchid", picture: 3 },
    { work: "spacefast", picture: 1 },
    { work: "spacefast", picture: 2 },
    { work: "spacefast", picture: 3 },
    { work: "spacefast", picture: 5 },
    { work: "spacefast", picture: 8 },
  ],
  quotes: ["agentphone", "orchid", "agentmail", "feyn", "vercel"],
  closing: "Book a call. We’ll set your launch date.",
};

const placeholder = /\{\{\s*(.+?)\s*\}\}/g;

/**
 * Every placeholder left in the copy, in order: the words inside each {{…}}.
 * A line with a stray "{{", "}}" or "TBD" outside a placeholder counts too, so a half-deleted one isn't missed.
 */
export function placeholders(copy: unknown): string[] {
  if (typeof copy === "string") {
    const found = Array.from(copy.matchAll(placeholder), (match) => match[1]);
    if (/\{\{|\}\}|TBD/.test(copy.replace(placeholder, ""))) found.push(`unfinished placeholder in “${copy}”`);
    return found;
  }
  if (copy && typeof copy === "object") return Object.values(copy).flatMap(placeholders);
  return [];
}

/** A line of copy split into its words and its placeholders, for the page to show the placeholders highlighted. */
export function parts(line: string) {
  return line
    .split(placeholder)
    .map((text, i) => ({ text, placeholder: i % 2 === 1 }))
    .filter((part) => part.text !== "");
}
