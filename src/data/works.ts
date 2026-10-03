/*
  Every project in the works strips and in the client list on the main page. Each one also gets its own page: /work/<key>/

  To finish a project, edit its entry below:
    tagline  one line under the name (or null)
    intro    the paragraph about what Arc did (null shows a dashed placeholder)
    live     { label, url } for the live site (null hides the line)
    cover    { src, alt } for its picture in the works strips (null shows a dashed placeholder)
    shots    picture addresses for its page, top to bottom (null entries show dashed placeholders)

  Pictures live in public/works/ and are served from the site itself, so Vercel's CDN carries them.
  Covers are 2000 × 1422 WebP files, twice the size they show at.
*/

export interface Work {
  name: string;
  tagline: string | null;
  intro: string | null;
  live: { label: string; url: string } | null;
  cover: { src: string; alt: string } | null;
  shots: (string | null)[];
}

export const works = {
  axiom: {
    name: "Axiom",
    tagline: "The Only Trading Platform You’ll Ever Need",
    intro: null,
    live: { label: "axiom.trade", url: "https://axiom.trade" },
    cover: {
      src: "/works/axiom.webp",
      alt: "Axiom website: Where most trades are happening.",
    },
    shots: ["/works/axiom.webp", null, null, null],
  },
  automattic: {
    name: "Automattic",
    tagline: "Spacefast, the Publishing Layer for Your Agents",
    intro: null,
    live: null, // TODO: add the Spacefast address
    cover: {
      src: "/works/automattic.webp",
      alt: "Spacefast website for Automattic: The publishing layer for your agents.",
    },
    shots: ["/works/automattic.webp", null, null, null],
  },
  agentmail: {
    name: "AgentMail",
    tagline: "Email for AI Agents",
    intro: null,
    live: { label: "agentmail.to", url: "https://agentmail.to" },
    cover: {
      src: "/works/agentmail.webp",
      alt: "AgentMail website: Email inboxes for AI agents.",
    },
    shots: ["/works/agentmail.webp", null, null, null],
  },
  orchid: {
    name: "Orchid",
    tagline: "AI Personal Assistant",
    intro: null,
    live: null, // TODO: add the live address
    cover: {
      src: "/works/orchid.webp",
      alt: "Orchid website: Meet Orchid, your personal exec.",
    },
    shots: ["/works/orchid.webp", null, null, null],
  },
  // Nothing is known about these yet beyond the name.
  anything: { name: "Anything", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  conviction: { name: "Conviction", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  sim: { name: "Sim", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  agentphone: { name: "AgentPhone", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  bloom: { name: "Bloom", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  starsling: { name: "Starsling", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  "the-hog": { name: "The Hog", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  chonkie: { name: "Chonkie", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  flashnet: { name: "Flashnet", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  panta: { name: "Panta", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  feyn: { name: "Feyn", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  lantern: { name: "Lantern", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
} satisfies Record<string, Work>;

export type WorkKey = keyof typeof works;

// The clients named in the main page's intro, in order, before "& more". Each name links to the project's page.
// llms.txt names the same clients.
export const clients: WorkKey[] = ["automattic", "axiom", "sim", "flashnet", "agentmail", "agentphone", "orchid", "conviction"];

/**
 * Whether a project's page is done: it has its intro and every picture, so no placeholder shows.
 * Until then the page asks search engines not to index it, and the sitemap and llms.txt leave it out.
 */
export function isFinished(work: Work) {
  return work.intro !== null && !work.shots.includes(null);
}
