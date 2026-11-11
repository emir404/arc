import type { TestimonialKey } from "./testimonials";

/*
  Every project in the works strips and in the client list on the main page. Each one also gets its own page: /work/<key>/
  The exception is a client with no work to show yet (page: false), which the client list names without a link.

  A project's page tells the work as a story, the way a studio would walk a founder through it:
    headline  the idea the work is built on, in a few words. The page's title puts it after the name, as in
              “AgentMail: a secret agent with an inbox” (null shows the name alone)
    story     the paragraphs under the title (null leaves them out): what the company does and what it has to show for it,
              then the one idea we built the work around and why, then how that idea shows up, ending on the company's own line
    services  what we did, in a few words (“Brand identity, website and product”), for the list of facts under the story
    raised    the round it has announced, such as “$6M seed”, where there is one
    quote     a founder's words from testimonials.ts, after the last chapter
    chapters  the rest of the page, top to bottom: each a title and two or three sentences on one part of the work (what it
              is, and why it's that way), then its pictures. A chapter with no title is pictures alone, such as the one that
              opens the page. Without chapters the page shows every picture in order
    live      { label, url } for the live site (null leaves it out of the facts)
    tagline   the company's own line, which llms.txt gives beside its name (or null)
    cover     { src, alt } for its picture in the works strips (null shows a dashed placeholder)
    shots     its pictures, each { src, width, height } (null entries show dashed placeholders)

  A chapter names its pictures by their number in shots, counting from 1, the way the launch page's case images do
  ({ work: "orchid", picture: 1 }), so they can be shown in whatever order tells the story without renumbering those.
  Pictures in a list of their own, [1, 2, 3], show side by side on wider screens: for posters and squares, which would be
  too tall at the full width. Every picture appears once; the build stops if a chapter leaves one out, repeats one or names
  one that isn't there.

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

/** One part of a project's story: a title and a few sentences, then its pictures. */
export interface Chapter {
  /** A few words, in sentence case. null for pictures with nothing before them, such as the ones that open the page. */
  title: string | null;
  /** Two or three sentences on this part of the work: what it is, and why it's that way. null with no title. */
  text: string | null;
  /** Its pictures by their number in shots, top to bottom. A list of its own, [1, 2], is a row side by side. */
  pictures: (number | number[])[];
}

export interface Work {
  name: string;
  /** Who it was for, if that's a company with another name. The client list names them instead of the project. */
  client?: string;
  /** False for a client with no work to show yet: it gets no page, and the client list names it without a link. */
  page?: false;
  /** Its accelerator batch, such as "YC W25", where it has one: the works strip names it beside the project. */
  batch?: string;
  tagline: string | null;
  headline: string | null;
  story: string[] | null;
  services?: string;
  raised?: string;
  quote?: TestimonialKey;
  live: { label: string; url: string } | null;
  cover: { src: string; alt: string } | null;
  shots: (Picture | null)[];
  chapters?: Chapter[];
}

export const works = {
  spacefast: {
    name: "Spacefast",
    client: "Automattic",
    tagline: "The Publishing Layer for Your Agents",
    headline: "show-and-tell for everything your agents make",
    story: [
      "Spacefast is the newest product from Automattic, the company behind WordPress.com and Tumblr. It’s the publishing layer for your agents: whatever you make with Claude, ChatGPT or Cursor (a page, a prototype, a small app) becomes a link, private by default. It soft-launched in September 2026.",
      "Most of what people make with agents was never meant for the whole internet. It’s a deck for the team, a page for a friend, a prototype for one client. So instead of the dark screens and gradients hosting tools tend to wear, Spacefast looks like show-and-tell: grid paper, hand-drawn stickers and a highlighter pen.",
      "We came in for the brand identity, the website and the product, and we’re still on retainer. The stickers carry the brand: a person at a laptop, a globe, a pin, a few joined nodes, each drawn in black line. A lime highlighter marks the one line on a page you shouldn’t miss. Show it to your people, not the whole internet.",
    ],
    services: "Brand identity, website and product",
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
    chapters: [
      { title: null, text: null, pictures: [4] },
      {
        title: "A line in highlighter",
        text: "The site opens on its line, marked in lime, with the product as a conversation under it. Wait, you made this? Yeah, told ChatGPT to publish it. One message to your agent and it’s live, with no account and nothing to install.",
        pictures: [1],
      },
      {
        title: "Every route, one link",
        text: "However you work, it ships: from a chat with Claude or ChatGPT, from the terminal with npx spacefast publish, from a push to GitHub or a folder you drag. Before launch, the site sold a place in line: each feature got a card with a working piece of the product in it.",
        pictures: [3, 2],
      },
      {
        title: "Where every space lives",
        text: "In the dashboard the stickers step aside and the lime stays, to mark where you are. A new space starts by asking how you want to publish, and the first answer is to let your agent deal with it. Each space keeps its source, its versions and who can see it, with every file open to read in place.",
        pictures: [8, 9, 5, 6, 7],
      },
    ],
  },
  axiom: {
    name: "Axiom",
    batch: "YC W25",
    tagline: "The Only Trading Platform You’ll Ever Need",
    headline: "the one tab Solana traders keep open",
    story: [
      "Axiom is where Solana goes to trade: memecoins, perpetuals, prediction markets and yield, in one app. It passed $100M in revenue four months after launch.",
      "Traders keep a lot of tabs open: a terminal, a wallet tracker, X, the group chat, an exchange for perps. Axiom’s pitch is that you can close all of them. So the site tells the whole product as a single tab, and each section closes one of the others.",
      "We came in for the website and ended up exploring the brand with them too. We rebuilt their pyramid from hundreds of small triangles and carried it onto the site in navy and bright blue, around a terminal that does most of the talking. The only tab you’ll ever need.",
    ],
    services: "Website and brand exploration",
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
    chapters: [
      { title: null, text: null, pictures: [7] },
      {
        title: "A pyramid of triangles",
        text: "Up close, the pyramid is a field of tiny triangles, as busy as a chart full of trades. From across the room it’s one mark. The same triangles scatter behind the lines the brand runs on: where Solana goes to trade, and the only platform you’ll ever need.",
        pictures: [[1, 2, 3], 4],
      },
      {
        title: "Signal through noise",
        text: "Run through scanlines and glitches, the pyramid breaks up like a screen caught mid-refresh.",
        pictures: [5, 6],
      },
      {
        title: "Finding the first screen",
        text: "The hero went through rounds: ribbons of fine blue line, a fan of memecoin cards, the terminal under the line where most trades are happening. The ribbons carry onto Axiom’s X profile too.",
        pictures: [10, 11, 13, 8, 9],
      },
      {
        title: "The only tab you need",
        text: "The terminal is the hero, so the site frames it as what it is: a browser tab. Under it, the product in one sentence: discovery, execution, perps, predictions, yield, rewards and trackers. All of the primitives traders need.",
        pictures: [14, 12],
      },
      {
        title: "Closing the other tabs",
        text: "From there, each section closes a tab. Wallet tracking, X posts and group lobbies live inside Axiom. Perps run on Hyperliquid from the account you already trade with. Prediction markets share one balance with spot and perps. And a cut of every fee comes back in SOL.",
        pictures: [16, 17, 18, 15],
      },
    ],
  },
  orchid: {
    name: "Orchid",
    batch: "YC X25",
    tagline: "AI Personal Assistant",
    headline: "only what matters, in focus",
    story: [
      "Orchid is an AI assistant that lives in iMessage. Every morning it texts you your day, then works through your email and calendar the way a real assistant would: drafting replies, booking meetings, surfacing what matters. It raised a $2M seed led by 1984 Ventures.",
      "A good assistant decides what reaches you and lets the rest wait. For the new brand we chose the fonts and colors, and gave them the same job: a classic serif over soft, blurred photography, so the words on top are the only sharp thing on the page.",
      "There’s no app to show, so the website leads with a conversation: a morning text on an iPhone that has already sorted the day. Around it, white space, one serif and an orchid growing out of an old rotary phone. We designed it around a single line. Wake up to a day, not a list.",
    ],
    services: "Fonts, colors and website",
    raised: "$2M seed",
    quote: "orchid",
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
    chapters: [
      { title: null, text: null, pictures: [1] },
      {
        title: "One text, every morning",
        text: "Orchid works while you sleep. It reads every email and invite as they arrive, decides what actually matters and leaves you three priorities, where there used to be a wall of unread notifications. The page tells it in the same order, one step at a time.",
        pictures: [7, 9, 6, 3],
      },
      {
        title: "Out of focus, on purpose",
        text: "Every photograph is blurred: a sky, a field of flowers, the orchid itself. The real work sits sharp on top, a refund to send through Stripe, a todo to add to Linear. The background is your day; the cards are what Orchid thinks you need to see.",
        pictures: [8, 12, 4],
      },
      {
        title: "A world-class EA",
        text: "Work like you have a world-class EA, because now you do. Orchid answers in iMessage, plans in your calendar and drafts in your email, so the site shows all three, written the way an assistant who knows you would write.",
        pictures: [10, 2],
      },
      {
        title: "A personal exec",
        text: "For the moments that need a picture, an orchid grows out of a rotary phone, the kind a personal assistant used to answer for you. Meet Orchid, your personal exec.",
        pictures: [5, 11],
      },
    ],
  },
  anything: {
    name: "Anything",
    batch: "YC W26",
    tagline: null,
    headline: "an old-world insurer, established 2026",
    story: [
      "Panta is an AI-native commercial insurance brokerage for the businesses that build the country: construction, transportation, manufacturing and hospitality. It raised a $5.2M seed. They came to us for a rebrand and already had the name in mind: Anything.",
      "Insurance is a promise to show up when something goes wrong, and the names people trust with it have been around for a century. A brokerage founded in 2026 needed that weight from its first day. So the identity borrows from old institutions (an Ionic column, engraved pictures, a motto in small capitals) and points them at the people Anything covers: builders, drivers, makers.",
      "The mark is four arrows pointing in. The engravings are stippled from photographs of building sites and trucks, set in olive and sage. One line holds it all together, down to the tote bags and caps. For the good of good people.",
    ],
    services: "Brand identity, website and merch",
    raised: "$5.2M seed",
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
    chapters: [
      { title: null, text: null, pictures: [2] },
      {
        title: "Four arrows, pointing in",
        text: "The mark holds at every size: beside the wordmark or above it, inside a badge, alone as a favicon. Repeated, the arrows become a pattern.",
        pictures: [1, 5, 9],
      },
      {
        title: "Olive and sage",
        text: "The palette is olive and sage, the colors of workwear, with near-black, pale greys and one brighter green kept for the button that matters. Each line of coverage gets a thin-line icon: a house, a car, a hard hat, a crane, a boat.",
        pictures: [3, 4],
      },
      {
        title: "The people who build",
        text: "Engravings put the customers on the page: a crew framing a house, a truck on a mountain road. They lead the policy guides, the X profile and the website: welcome to your new policy.",
        pictures: [6, 7],
      },
      {
        title: "For the good of good people",
        text: "The arrows repeat into a print for the tote bag, the badge and the line go on the t-shirt, and the mark sits alone on the cap.",
        pictures: [8],
      },
    ],
  },
  conviction: {
    name: "Conviction",
    batch: "YC S25",
    tagline: null,
    headline: "a trading desk that works the night shift",
    story: [
      "Conviction is a trading desk in your pocket. Describe an idea in plain English (sell if it drops 5% in a day), backtest it, then hand it to an AI agent that watches the market and trades through your broker.",
      "The point of an agent is that it works while you don’t. So the brand runs on one moment: an order placed at 3:12am while you sleep, filled at 9:31 when the market opens. The timeline itself became the brand’s main graphic, dark through the night and light from the open.",
      "We took Conviction from 0 to 1 with them: brand, website and product, from the feed to the strategy builder. Navy and cream carry it, with trade logs running faint behind everything, like a ticker you no longer need to watch. Done before the open.",
    ],
    services: "Brand identity, website and product",
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
    chapters: [
      { title: null, text: null, pictures: [1] },
      {
        title: "Ideas in plain English",
        text: "Sell if it drops 5% in a day. Ideas are set the way you’d say them, large and plain, beside the order they turned into. The rest of the story fits in two lines: you were early. It noticed, without you.",
        pictures: [2, 3],
      },
      {
        title: "From a post to a strategy",
        text: "The product starts where ideas do: a feed of everything the accounts and tickers you follow said today. Any post, from a chart breaking out to three officers buying their own stock, can be built into a strategy, and every profile shows the strategies its owner runs.",
        pictures: [4, 7, 6],
      },
      {
        title: "Backtest, then deploy",
        text: "The builder asks only what it needs, how much per trade and where the stop sits, then writes the rules and backtests them. The result comes with an honest comparison: here, simply holding AMD would have done better. Deploy it, and it runs with real money through your broker. There’s a dark mode too, for the night shift.",
        pictures: [5, 8, 9],
      },
    ],
  },
  agentphone: {
    name: "AgentPhone",
    batch: "YC P26",
    tagline: null,
    headline: "a robot that picks up the phone",
    story: [
      "AgentPhone gives AI agents their own phone numbers, to call and text people and businesses through one API. It’s built by brothers Manav and Meet Modi, and more than 100 companies were on it within months of launch.",
      "A phone call is the most personal channel there is, and the one people trust least from a machine. So instead of waveforms and gradients, we gave AgentPhone a character: a small robot holding a phone, friendly enough to pick up for.",
      "We did the brand, website and product from 0 to 1: the robot in every mood, green on black, and a dashboard for every number and call. Then everything around it, on short notice, from posters and t-shirts to flyers for their Call My Agent hackathon in San Francisco.",
    ],
    services: "Brand identity, website, product and merch",
    quote: "agentphone",
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
    chapters: [
      { title: null, text: null, pictures: [1] },
      {
        title: "A robot with a phone",
        text: "The robot is the logo, and it sits inside the wordmark too. Drawn in one heavy outline, it holds up at favicon size and in every mood the brand needs: asleep, on a call, reading, coffee in hand, cheering, thinking it over.",
        pictures: [3, 4],
      },
      {
        title: "Green on black",
        text: "Green, the color of the button that answers a call, is the only one the brand uses. On the site it lights up what’s live: a number in one API call, a transcript as it happens, one webhook for calls and messages.",
        pictures: [2, 9, 11, 12],
      },
      {
        title: "What a number is for",
        text: "The product shows what agents do with a number: follow up with a lead, catch a 2FA code, text you back with a number of their own. The dashboard keeps count of every number, conversation and call.",
        pictures: [10, 5, 7],
      },
      {
        title: "Everything around it",
        text: "For the Call My Agent hackathon, the robots crowd the flyer around a list of sponsors. For the shirts and posters, two lines: AgentSchool Class of ’26, and Make Something Agents Want.",
        pictures: [6, 8],
      },
    ],
  },
  agentmail: {
    name: "AgentMail",
    batch: "YC S25",
    tagline: "Email for AI Agents",
    headline: "a secret agent with an inbox",
    story: [
      "AgentMail gives AI agents their own email inboxes, the way Gmail does for humans. It raised a $6M seed led by General Catalyst, with Paul Graham among the angels, and more than 500 companies build on it.",
      "The word agent was already doing half the work, so we took it literally: the mark is a secret agent in a fedora, cut from a few flat shapes that read at any size. Around it, the brand speaks the language of the people who build with it: monospace type, ASCII skylines and code you can run from the first screen.",
      "We did the brand and website from 0 to 1. And since the users are agents, we wrote a page for them too: agent.email, a terminal an agent can read and sign itself up from. Not agents for email. Email for agents.",
    ],
    services: "Brand identity and website",
    raised: "$6M seed",
    quote: "agentmail",
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
    // The numbers count the pictures above, so they run one behind the files from 4.webp on: there's no 3.webp.
    chapters: [
      { title: null, text: null, pictures: [1] },
      {
        title: "Skylines in ASCII",
        text: "The site’s scenery is drawn in characters: a skyline of orange type behind the first line, a landscape of plus signs and dashes behind the next. A terminal’s texture, arranged into a place.",
        pictures: [2, 5, 12],
      },
      {
        title: "A page for the agents",
        text: "agent.email opens like a terminal, with commands for agents and for humans. An agent reads one skill file and signs itself up; a human sends their agent one instruction, then passes back the code it emails them.",
        pictures: [3, 4],
      },
      {
        title: "Email for agents",
        text: "The features open one at a time, each with a picture of what it does: fields pulled out of an invoice, attachments read as documents, any domain as an address. The use cases follow, from processing inbound mail to running outbound.",
        pictures: [7, 9, 10, 8],
      },
      {
        title: "Running in minutes",
        text: "The code sits right on the page: create an inbox from Node.js, Python, cURL, LangChain or the OpenAI SDK, and start on the free plan.",
        pictures: [6, 11],
      },
    ],
  },
  // In the client list, not the strips.
  sim: { name: "Sim", batch: "YC X25", tagline: null, headline: null, story: null, live: null, cover: null, shots: [null, null, null, null] },
  flashnet: { name: "Flashnet", page: false, tagline: null, headline: null, story: null, live: null, cover: null, shots: [null, null, null, null] },
} satisfies Record<string, Work>;

export type WorkKey = keyof typeof works;

// The works strip on the main page, left to right.
export const selectedWorks: WorkKey[] = ["spacefast", "axiom", "orchid", "anything", "conviction", "agentphone", "agentmail"];

// The YC page's strip: the same works without Spacefast, which was for Automattic.
export const ycWorks: WorkKey[] = selectedWorks.filter((key) => key !== "spacefast");

// The clients named in the main page's intro, in order, before "& more". Each name links to the project's page, if it has one.
// llms.txt names the same clients.
export const clients: WorkKey[] = ["spacefast", "axiom", "agentmail", "agentphone", "orchid", "conviction"];

/** The name a work goes by in the client list. */
export function clientName(work: Work) {
  return work.client ?? work.name;
}

/** Whether a project has a page of its own, /work/<key>/. */
export function hasPage(work: Work) {
  return work.page !== false;
}

/**
 * Whether a project's page is done: it has its story and every picture.
 * Until then the page asks search engines not to index it, and the sitemap and llms.txt leave it out.
 */
export function isFinished(work: Work) {
  return work.story !== null && !work.shots.includes(null);
}

/** A picture as a chapter shows it: its number in shots, and the picture, or null for a placeholder. */
export interface ChapterPicture {
  number: number;
  shot: Picture | null;
}

/**
 * A project's chapters as its page shows them: each with an id for the sidebar's links to it, and its pictures in rows,
 * one picture to a row unless the chapter set some side by side. A project without chapters shows every picture, in order.
 * Stops the build if the chapters leave out a picture, show one twice or name one that isn't there.
 */
export function chaptersOf(work: Work) {
  const chapters: Chapter[] = work.chapters ?? [{ title: null, text: null, pictures: work.shots.map((_, i) => i + 1) }];
  const shown = new Set<number>();

  const result = chapters.map((chapter) => ({
    title: chapter.title,
    text: chapter.text,
    // "Every route, one link" → "every-route-one-link"
    id: chapter.title
      ?.toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-|-$/g, ""),
    rows: chapter.pictures.map((row) =>
      (Array.isArray(row) ? row : [row]).map((number): ChapterPicture => {
        if (!Number.isInteger(number) || number < 1 || number > work.shots.length) {
          throw new Error(`${work.name}: a chapter names picture ${number}, but there are pictures 1 to ${work.shots.length}.`);
        }
        if (shown.has(number)) throw new Error(`${work.name}: picture ${number} is in the chapters twice.`);
        shown.add(number);
        return { number, shot: work.shots[number - 1] };
      }),
    ),
  }));

  const missing = work.shots.map((_, i) => i + 1).filter((number) => !shown.has(number));
  if (missing.length > 0) throw new Error(`${work.name}: no chapter shows picture ${missing.join(", ")}.`);
  return result;
}
