import { CAL_URL } from "./site";

/*
  Every "Book a call" on the site goes to CAL_URL through buildCalUrl(), which tags the link with the page it's on.
  Cal.com keeps a booking link's UTM tags with the booking, and its metadata[…] too, so each booking says where it
  came from.
*/

/** The tags a visitor can arrive with: the five UTM tags, and ref. */
export const ARRIVAL_TAGS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"] as const;
export type ArrivalTags = Partial<Record<(typeof ARRIVAL_TAGS)[number], string>>;

/** A page's name in the tags and in analytics: "home" for the main page, otherwise its path, such as "yc" or "work-axiom". */
export function pageName(pathname: string) {
  return pathname.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
}

/**
 * The booking link for a "Book a call" on a page. Untagged, it says the site sent the visitor: utm_source=site,
 * utm_medium=cta, utm_campaign=<page>. A visitor who arrived with UTM tags (src/scripts/arrival.ts) keeps theirs
 * instead, with utm_content=<page> for where they clicked. metadata[page] names the page either way, and
 * metadata[ref] passes on a ref they arrived with.
 */
export function buildCalUrl(page: string, arrival: ArrivalTags = {}) {
  const url = new URL(CAL_URL);
  const tagged = Boolean(arrival.utm_source || arrival.utm_medium || arrival.utm_campaign || arrival.utm_content || arrival.utm_term);
  const utm: ArrivalTags = tagged
    ? { utm_source: arrival.utm_source, utm_medium: arrival.utm_medium, utm_campaign: arrival.utm_campaign, utm_term: arrival.utm_term, utm_content: page }
    : { utm_source: "site", utm_medium: "cta", utm_campaign: page };
  for (const [tag, value] of Object.entries(utm)) if (value) url.searchParams.set(tag, value);
  url.searchParams.set("metadata[page]", page);
  if (arrival.ref) url.searchParams.set("metadata[ref]", arrival.ref);
  return url.href;
}
