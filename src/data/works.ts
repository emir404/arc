/*
  Every project in the works strips and in the client list on the main page. Each one also gets its own page: /work/<key>/

  To finish a project, edit its entry below:
    tagline  one line under the name (or null)
    intro    the paragraph about what Arc did (null leaves it out)
    live     { label, url } for the live site (null hides the line)
    cover    { src, alt } for its picture in the works strips (null shows a dashed placeholder)
    shots    its page's pictures, top to bottom, each { src, width, height } (null entries show dashed placeholders)

  Pictures live in public/works/<key>/ and are served from the site itself, so Vercel's CDN carries them. Each is a WebP copy
  of a PNG export in works/<key>/ (which git leaves out), at most 2000px wide: twice the size it shows at. Its width and
  height let the page hold its space before it loads. A cover is one of the project's pictures: the strip crops it to its
  960 × 680 frame around the middle.
*/

/** A picture in public/works/, with its size in pixels. */
export interface Picture {
  src: string;
  width: number;
  height: number;
}

export interface Work {
  name: string;
  /** Who it was for, if that's a company with another name. The client list names them instead of the project. */
  client?: string;
  tagline: string | null;
  intro: string | null;
  live: { label: string; url: string } | null;
  cover: { src: string; alt: string } | null;
  shots: (Picture | null)[];
}

export const works = {
  spacefast: {
    name: "Spacefast",
    client: "Automattic",
    tagline: "The Publishing Layer for Your Agents",
    intro: null,
    live: null, // TODO: add the live address
    cover: {
      src: "/works/spacefast/1.webp",
      alt: "Spacefast website for Automattic: Show it to your people, not the whole internet.",
    },
    shots: [
      { src: "/works/spacefast/1.webp", width: 2000, height: 1422 },
      { src: "/works/spacefast/2.webp", width: 2000, height: 1308 },
      { src: "/works/spacefast/3.webp", width: 2000, height: 1426 },
      { src: "/works/spacefast/4.webp", width: 2000, height: 667 },
      { src: "/works/spacefast/5.webp", width: 2000, height: 1422 },
      { src: "/works/spacefast/6.webp", width: 2000, height: 1422 },
      { src: "/works/spacefast/7.webp", width: 2000, height: 1422 },
      { src: "/works/spacefast/8.webp", width: 2000, height: 1422 },
      { src: "/works/spacefast/9.webp", width: 2000, height: 1422 },
    ],
  },
  axiom: {
    name: "Axiom",
    tagline: "The Only Trading Platform You’ll Ever Need",
    intro: null,
    live: { label: "axiom.trade", url: "https://axiom.trade" },
    cover: {
      src: "/works/axiom/13.webp",
      alt: "Axiom website: Where most trades are happening.",
    },
    shots: [
      { src: "/works/axiom/1.webp", width: 1244, height: 1283 },
      { src: "/works/axiom/2.webp", width: 1244, height: 1283 },
      { src: "/works/axiom/3.webp", width: 1244, height: 1283 },
      { src: "/works/axiom/4.webp", width: 2000, height: 1349 },
      { src: "/works/axiom/5.webp", width: 2000, height: 1333 },
      { src: "/works/axiom/6.webp", width: 2000, height: 1224 },
      { src: "/works/axiom/7.webp", width: 2000, height: 1125 },
      { src: "/works/axiom/8.webp", width: 2000, height: 1125 },
      { src: "/works/axiom/9.webp", width: 2000, height: 1125 },
      { src: "/works/axiom/10.webp", width: 2000, height: 1422 },
      { src: "/works/axiom/11.webp", width: 2000, height: 1422 },
      { src: "/works/axiom/12.webp", width: 2000, height: 1422 },
      { src: "/works/axiom/13.webp", width: 2000, height: 1422 },
      { src: "/works/axiom/14.webp", width: 2000, height: 1422 },
      { src: "/works/axiom/15.webp", width: 2000, height: 1738 },
      { src: "/works/axiom/16.webp", width: 2000, height: 1165 },
      { src: "/works/axiom/17.webp", width: 2000, height: 2017 },
      { src: "/works/axiom/18.webp", width: 2000, height: 2017 },
    ],
  },
  orchid: {
    name: "Orchid",
    tagline: "AI Personal Assistant",
    intro: null,
    live: null, // TODO: add the live address
    cover: {
      src: "/works/orchid/1.webp",
      alt: "Orchid website: Meet Orchid, your personal exec.",
    },
    shots: [
      { src: "/works/orchid/1.webp", width: 2000, height: 1422 },
      { src: "/works/orchid/2.webp", width: 2000, height: 1422 },
      { src: "/works/orchid/3.webp", width: 2000, height: 1360 },
      { src: "/works/orchid/4.webp", width: 2000, height: 1686 },
      { src: "/works/orchid/5.webp", width: 2000, height: 1111 },
      { src: "/works/orchid/6.webp", width: 2000, height: 1422 },
      { src: "/works/orchid/7.webp", width: 2000, height: 1333 },
      { src: "/works/orchid/8.webp", width: 2000, height: 1422 },
      { src: "/works/orchid/9.webp", width: 2000, height: 1528 },
      { src: "/works/orchid/10.webp", width: 2000, height: 1528 },
      { src: "/works/orchid/11.webp", width: 2000, height: 1528 },
      { src: "/works/orchid/12.webp", width: 2000, height: 1528 },
    ],
  },
  anything: {
    name: "Anything",
    tagline: null,
    intro: null,
    live: null,
    cover: {
      src: "/works/anything/8.webp",
      alt: "Anything merchandise: a tote bag, T-shirt and cap with its logo.",
    },
    shots: [
      { src: "/works/anything/1.webp", width: 2000, height: 1125 },
      { src: "/works/anything/2.webp", width: 2000, height: 1125 },
      { src: "/works/anything/3.webp", width: 2000, height: 1125 },
      { src: "/works/anything/4.webp", width: 2000, height: 1125 },
      { src: "/works/anything/5.webp", width: 2000, height: 1125 },
      { src: "/works/anything/6.webp", width: 2000, height: 1125 },
      { src: "/works/anything/7.webp", width: 2000, height: 1125 },
      { src: "/works/anything/8.webp", width: 2000, height: 1125 },
      { src: "/works/anything/9.webp", width: 2000, height: 1125 },
    ],
  },
  conviction: {
    name: "Conviction",
    tagline: null,
    intro: null,
    live: null,
    cover: {
      src: "/works/conviction/4.webp",
      alt: "Conviction app: Feed, everything the accounts and tickers you follow said today.",
    },
    shots: [
      { src: "/works/conviction/1.webp", width: 2000, height: 886 },
      { src: "/works/conviction/2.webp", width: 2000, height: 886 },
      { src: "/works/conviction/3.webp", width: 2000, height: 886 },
      { src: "/works/conviction/4.webp", width: 2000, height: 1364 },
      { src: "/works/conviction/5.webp", width: 2000, height: 1364 },
      { src: "/works/conviction/6.webp", width: 2000, height: 1364 },
      { src: "/works/conviction/7.webp", width: 2000, height: 1364 },
      { src: "/works/conviction/8.webp", width: 2000, height: 1364 },
      { src: "/works/conviction/9.webp", width: 2000, height: 1364 },
    ],
  },
  agentphone: {
    name: "AgentPhone",
    tagline: null,
    intro: null,
    live: null,
    cover: {
      src: "/works/agentphone/2.webp",
      alt: "AgentPhone posters: Phone numbers for AI agents. Built for agents, not humans.",
    },
    shots: [
      { src: "/works/agentphone/1.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/2.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/3.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/4.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/5.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/6.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/7.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/8.webp", width: 2000, height: 1038 },
      { src: "/works/agentphone/9.webp", width: 2000, height: 1867 },
      { src: "/works/agentphone/10.webp", width: 2000, height: 1314 },
      { src: "/works/agentphone/11.webp", width: 2000, height: 1175 },
      { src: "/works/agentphone/12.webp", width: 2000, height: 1435 },
    ],
  },
  agentmail: {
    name: "AgentMail",
    tagline: "Email for AI Agents",
    intro: null,
    live: { label: "agentmail.to", url: "https://agentmail.to" },
    cover: {
      src: "/works/agentmail/6.webp",
      alt: "AgentMail website: Email inboxes for AI agents.",
    },
    shots: [
      { src: "/works/agentmail/1.webp", width: 2000, height: 1389 },
      { src: "/works/agentmail/2.webp", width: 2000, height: 1588 },
      { src: "/works/agentmail/4.webp", width: 2000, height: 1422 },
      { src: "/works/agentmail/5.webp", width: 2000, height: 1422 },
      { src: "/works/agentmail/6.webp", width: 2000, height: 1437 },
      { src: "/works/agentmail/7.webp", width: 2000, height: 1399 },
      { src: "/works/agentmail/8.webp", width: 2000, height: 1635 },
      { src: "/works/agentmail/9.webp", width: 2000, height: 1783 },
      { src: "/works/agentmail/10.webp", width: 2000, height: 1635 },
      { src: "/works/agentmail/11.webp", width: 2000, height: 1635 },
      { src: "/works/agentmail/12.webp", width: 2000, height: 1422 },
      { src: "/works/agentmail/13.webp", width: 2000, height: 667 },
    ],
  },
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
 * Whether a project's page is done: it has its intro and every picture.
 * Until then the page asks search engines not to index it, and the sitemap and llms.txt leave it out.
 */
export function isFinished(work: Work) {
  return work.intro !== null && !work.shots.includes(null);
}
