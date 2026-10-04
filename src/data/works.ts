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
  height let the page hold its space before it loads. A cover is one of the project's pictures or a cover.webp beside them,
  which the strip crops to its 960 × 680 frame around the middle. A cover.webp is made for the strip, from a PNG export in
  covers/ (which git leaves out too), or is a copy of one of the pictures with more background where that crop would cut it.
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
    intro:
      "Spacefast is the newest product from Automattic, the company behind WordPress.com and Tumblr. It’s the publishing layer for your agents: whatever you make with Claude, ChatGPT or Cursor (a page, a prototype, a small app) becomes a link, private by default. Show it to your people, not the whole internet. We came in for the brand identity, the website and the product, from the hand-drawn stickers on grid paper to the dashboard where every space, file and version lives. It soft-launched in September 2026, and we’re still on retainer.",
    live: null, // TODO: add the live address
    cover: {
      src: "/works/spacefast/cover.webp",
      alt: "Spacefast logo, by Automattic, on crumpled grid paper among hand-drawn stickers.",
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
    intro:
      "Axiom (YC W25) is where Solana goes to trade: memecoins, perpetuals, predictions and yield, in one app. It passed $100M in revenue four months after launch. We came in for the website and ended up exploring the brand with them too, rebuilding their pyramid from hundreds of small triangles. The site tells the whole product as a single tab, with discovery, execution, perps, rewards and trackers side by side. The only tab you’ll ever need.",
    live: { label: "axiom.trade", url: "https://axiom.trade" },
    cover: {
      src: "/works/axiom/6.webp",
      alt: "Axiom’s pyramid logo, glitching in streaks of light, on black.",
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
    intro:
      "Orchid is an AI assistant that lives in iMessage. YC X25, $2M seed led by 1984 Ventures. Every morning it texts you your day, then works through your email and calendar the way a real assistant would: drafting replies, booking meetings, surfacing what matters. For the new brand we chose the fonts and colors, a classic serif over soft, blurred photography, and we designed the website around a single line. Wake up to a day, not a list.",
    live: null, // TODO: add the live address
    cover: {
      src: "/works/orchid/cover.webp",
      alt: "Orchid logo in white, over a blurred valley at dusk with wildflowers and a river.",
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
    intro:
      "Panta is an AI-native commercial insurance brokerage for the businesses that build the country: construction, transportation, manufacturing and hospitality. YC W26, $5.2M seed. They came to us for a rebrand and already had the name in mind: Anything. We built the identity around it, from a mark of four arrows pointing in to stippled engravings of the people who build things, all in olive and sage, held together by one line. For the good of good people. Down to the tote bags and caps.",
    live: null,
    cover: {
      // Picture 2 with more of its olive above and below, so the frame doesn't cut into the logo or the column.
      src: "/works/anything/cover.webp",
      alt: "Anything logo beside a stippled Ionic column: For the good of good people.",
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
    intro:
      "Conviction is a trading desk in your pocket. Describe an idea in plain English (sell if it drops 5% in a day), backtest it, then hand it to an AI agent that watches the market and trades through your broker. YC S25. We took it from 0 to 1 with them: brand, website and product, from the feed to the strategy builder. The brand runs on one moment, an order placed at 3:12am while you sleep. Done before the open.",
    live: null,
    cover: {
      src: "/works/conviction/cover.webp",
      alt: "Conviction logo on navy, over faint lines of trades filled overnight.",
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
    intro:
      "AgentPhone gives AI agents their own phone numbers, to call and text people and businesses through one API. Built by brothers Manav and Meet Modi. YC P26, with more than 100 companies on it within months of launch. We did the brand, website and product from 0 to 1: a robot mascot holding a phone, drawn in every mood, green on black, and a dashboard for every number and call. Then everything around it on short notice, from posters and t-shirts to flyers for their Call My Agent hackathon in San Francisco.",
    live: null,
    cover: {
      src: "/works/agentphone/cover.webp",
      alt: "AgentPhone logo, its robot holding a phone, on black glowing green.",
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
    intro:
      "AgentMail gives AI agents their own email inboxes, the way Gmail does for humans. YC S25, $6M seed led by General Catalyst, with Paul Graham among the angels. More than 500 companies build on it. We did the brand and website from 0 to 1: a secret agent in a fedora for the mark, monospace type and ASCII skylines, and agent.email, a page written for the agents themselves. Not agents for email. Email for agents.",
    live: { label: "agentmail.to", url: "https://agentmail.to" },
    cover: {
      src: "/works/agentmail/cover.webp",
      alt: "AgentMail logo in white, over a city skyline drawn in ASCII characters.",
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

// The works strip on the main page, left to right.
export const selectedWorks: WorkKey[] = ["spacefast", "axiom", "orchid", "anything", "conviction", "agentphone", "agentmail"];

// The YC page's strip: the same works without Spacefast, which was for Automattic.
export const ycWorks: WorkKey[] = selectedWorks.filter((key) => key !== "spacefast");

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
