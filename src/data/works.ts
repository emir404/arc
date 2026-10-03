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
  /** Who it was for, if that's a company with another name. The client list names them instead of the project. */
  client?: string;
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
  spacefast: {
    name: "Spacefast",
    client: "Automattic",
    tagline: "The Publishing Layer for Your Agents",
    intro: null,
    live: null, // TODO: add the live address
    cover: {
      src: "/works/spacefast.webp",
      alt: "Spacefast website for Automattic: The publishing layer for your agents.",
    },
    shots: ["/works/spacefast.webp", null, null, null],
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
  agentphone: { name: "AgentPhone", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  // In the client list, not the strips.
  sim: { name: "Sim", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
  flashnet: { name: "Flashnet", tagline: null, intro: null, live: null, cover: null, shots: [null, null, null, null] },
} satisfies Record<string, Work>;

export type WorkKey = keyof typeof works;

// The works strips on the main page and the YC page, left to right.
export const selectedWorks: WorkKey[] = ["spacefast", "axiom", "orchid", "anything", "conviction", "agentphone", "agentmail"];

// The clients named in the main page's intro, in order, before "& more". Each name links to the project's page.
// llms.txt names the same clients.
export const clients: WorkKey[] = ["spacefast", "axiom", "sim", "flashnet", "agentmail", "agentphone", "orchid", "conviction"];

/** The name a work goes by in the client list. */
export function clientName(work: Work) {
  return work.client ?? work.name;
}

/**
 * Whether a project's page is done: it has its intro and every picture, so no placeholder shows.
 * Until then the page asks search engines not to index it, and the sitemap and llms.txt leave it out.
 */
export function isFinished(work: Work) {
  return work.intro !== null && !work.shots.includes(null);
}
