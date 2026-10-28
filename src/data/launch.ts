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
  /** The headline, at the top and again over the buttons at the end. */
  title: string;
  tagline: string;
  /** The line under the tagline: what the package is, and who it's for. */
  sub: string;
  /** The clients named in the intro, in order, before "& more". Each name links to its project page, if it has one. */
  clients: WorkKey[];
  /** What's included: the four parts, each with a line long enough to run to two lines on any screen. */
  included: { name: string; text: string }[];
  price: string;
  /** Under the price: how it's paid. */
  payment: string;
  /** Under that: what the price covers, and what's quoted separately. */
  covers: string;
  timeline: string;
  /** What happens once the site is live: the fixes that come with the package, and how to keep going. */
  afterLaunch: string;
  /** Under the "Book a Launch call" buttons: what the call is, and what you get from it. */
  call: string;
  /** What the "Case images" card opens into, top to bottom: pictures from the project pages and videos. With none, it opens into empty covers. */
  caseImages: CaseImage[];
  /** The quotes, from the main page, top to bottom. [] leaves them out. */
  quotes: TestimonialKey[];
}

export const launch: Launch = {
  title: "Ready for launch.",
  tagline: "Branding, website, product and video. One studio.",
  sub: "A fixed-scope launch package for startups about to go live.",
  clients: ["spacefast", "axiom", "flashnet", "agentmail", "agentphone", "orchid", "conviction"],
  included: [
    { name: "Branding", text: "Identity, logo and a brand guide, carried through everything else." },
    { name: "Website", text: "A landing page for launch day, designed and built." },
    { name: "Product", text: "Up to 12 launch-critical screens, designed and built. Front end only." },
    { name: "Video", text: "A launch video, up to 90 seconds, made from your brand and product." },
  ],
  price: "$30,000",
  payment: "Paid in installments.",
  covers: "Covers everything above. More pages and filmed video are quoted separately.",
  timeline: "One month.",
  afterLaunch: "Two weeks of fixes after launch. Then keep going with a Partnership, or take it from here.",
  call: "30 minutes with Emir and Omer. You’ll know price, scope, and start date by the end of it.",
  caseImages: [
    { work: "orchid", picture: 1 },
    { work: "orchid", picture: 2 },
    { work: "orchid", picture: 3 },
    { video: "/launch/1.mp4", poster: "/launch/1.webp", width: 1920, height: 1080, duration: 42, label: "Keiki launch video" },
    { work: "spacefast", picture: 1 },
    { work: "spacefast", picture: 2 },
    { work: "spacefast", picture: 3 },
    { work: "spacefast", picture: 5 },
    { work: "spacefast", picture: 8 },
    { video: "/launch/2.mp4", poster: "/launch/2.webp", width: 1920, height: 1080, duration: 42, label: "Flip launch video" },
    { video: "/launch/3.mp4", poster: "/launch/3.webp", width: 1920, height: 1080, duration: 37, label: "Flip product video" },
  ],
  quotes: ["agentphone", "orchid", "agentmail", "feyn", "vercel"],
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
