/*
  The values more than one page shows: where "Book a call" goes, the email address, the X accounts, the prices, how
  many Launch projects the studio takes and whether it's taking new ones. Pages, link previews and llms.txt all read
  them from here, so a change here reaches every one of them.
*/

/** Where every "Book a call" goes. */
export const CAL_URL = "https://cal.com/team/arc-studio/intro-call";

/** Where every "Send message" goes. */
export const CONTACT_EMAIL = "omeroztok@witharc.co";

/** The studio's account on X. There is no @arcstudio. */
export const X_HANDLE = "@witharc_co";

/** Emir's own account on X, named as the author of the site's link previews there. */
export const X_FOUNDER = "@emirayaz";

/** In US dollars. The accelerator prices are for YC and a16z speedrun companies. */
export const PRICES = {
  launch: 30000, // one month
  launchAccelerator: 27000,
  launchInstallments: 2, // 2 × $15,000, or 2 × $13,500 at the accelerator price
  partnership: 12000, // per month
  partnershipAccelerator: 10000,
};

/** How many Launch projects the studio starts in a month. */
export const LAUNCH_CAPACITY_PER_MONTH = 2;

/** Whether new projects can start. Edit it by hand when the studio is full, in words: never a calendar date. */
export const AVAILABILITY = "Taking new projects now";

export const PARTNERSHIP_TURNAROUND = "24–36 hours after feedback";
export const PARTNERSHIP_VIDEOS = "up to 3 videos a month, depending on complexity";

/** The studio's accounts, linked in the sidebar. The main page's structured data names them too, which tells search engines they belong to this Arc Studio. */
export const socials = [
  { label: "X (formerly Twitter)", url: `https://x.com/${X_HANDLE.slice(1)}` },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/design-studio-arc/" },
];
