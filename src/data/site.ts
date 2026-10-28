/*
  The values more than one page shows: where "Book a call" goes, the email address, the X accounts, the prices, how
  many Launch projects the studio takes and whether it's taking new ones. Pages, link previews and llms.txt all read
  them from here, so a change here reaches every one of them.
*/

/**
 * The site's address, for canonical links, link previews, the sitemap and llms.txt. It's www because the hosting has
 * it so: Vercel's domain settings send witharc.co to www.witharc.co with one permanent redirect (308) that keeps the
 * path and query, so no page is ever served from both. [NEEDS EMIR: confirm apex vs www]
 */
export const SITE_URL = "https://www.witharc.co";

/** Where every "Book a call" goes, tagged with the page it's on: see buildCalUrl() in booking.ts. */
export const CAL_URL = "https://cal.com/team/arc-studio/intro-call";

/** The pages where "Book a call" opens Cal.com's booking popup over the page (src/scripts/cal.ts), rather than Cal.com in a new tab. */
export const CAL_POPUP_PAGES = ["launch", "yc", "speedrun"];

/** Where every "Send message" goes. */
export const CONTACT_EMAIL = "omeroztok@witharc.co";

/** The studio's account on X, linked in the sidebar and named in link previews (twitter:site). */
export const X_HANDLE = "@witharc_co";

/** Emir's own account on X, named as the author of the site's link previews there. */
export const X_FOUNDER = "@emirayaz";

/** In US dollars. The accelerator prices are for YC and a16z speedrun companies. */
export const PRICES = {
  launch: 30000, // one month
  launchAccelerator: 27000,
  // 2 × $15,000, or 2 × $13,500 at the accelerator price. [NEEDS EMIR, optional: if you want to state timing, e.g.
  // "one to start, one at handoff", confirm it and add it to the FAQ's installments answer in faq.ts; otherwise ship as is]
  launchInstallments: 2,
  partnership: 12000, // per month
  partnershipAccelerator: 10000,
};

/** How many Launch projects the studio starts in a month. */
export const LAUNCH_CAPACITY_PER_MONTH = 2;

/**
 * Whether new projects can start. Edit it by hand when the studio is full, in words: never a calendar date. The FAQ's
 * "When can we start?" answers "This week." (faq.ts), so change that with it.
 */
export const AVAILABILITY = "Taking new projects now";

/**
 * Under the YC page's button: the current batch's Demo Day, until the date when starting a Launch would no longer
 * finish before it (the end of 10 November in San Francisco). After that the line is gone, without a new build.
 * For the next batch, write its line and date here.
 */
export const YC_BATCH_LINE = {
  text: "F26 Demo Day is December 2. Start by early November and you launch before it.",
  until: "2026-11-11T00:00:00-08:00",
};

/** The FAQ's answer to how the YC and speedrun prices are checked. [NEEDS EMIR: confirm method] */
export const ACCELERATOR_CHECK = "Tell us your batch on the call. We check it against the public batch list or your accelerator profile. That’s it.";

/** The FAQ's answer to who a client works with. [NEEDS EMIR: confirm this is true] */
export const WHO_YOU_WORK_WITH = "Emir and Omer, on every project. No hand-offs to juniors.";

/**
 * The launch page's month, week by week, and the line under it. [NEEDS EMIR: confirm the real week-by-week]
 */
export const LAUNCH_MONTH = {
  weeks: [
    { week: "Week 1", name: "Brand", text: "Positioning, name check, identity system." },
    { week: "Week 2", name: "Site and product", text: "Site designed, product screens designed." },
    { week: "Week 3", name: "Build and video", text: "Site and screens built, launch video cut." },
    { week: "Week 4", name: "Launch", text: "Final fixes, launch day, then two weeks of fixes." },
  ],
  after: "At handoff we’ll propose a Partnership so the same team keeps shipping.",
};

export const PARTNERSHIP_TURNAROUND = "24–36 hours after feedback";
export const PARTNERSHIP_VIDEOS = "up to 3 videos a month, depending on complexity";

/** The studio's accounts, linked in the sidebar. The main page's structured data names them too, which tells search engines they belong to this Arc Studio. */
export const socials = [
  { label: "X (formerly Twitter)", url: `https://x.com/${X_HANDLE.slice(1)}` },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/design-studio-arc/" },
];
