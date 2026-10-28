/*
  The tags a visitor arrived with (the UTM tags and ref), kept for the rest of their visit, so a "Book a call" passes
  them on to Cal.com even pages later (see buildCalUrl() in src/data/booking.ts).

  The first tagged address of a visit wins, and a visit ends after 30 minutes without a page view, as PostHog's do.
  The tags are kept in localStorage rather than sessionStorage: on a computer the site opens its own pages in new
  tabs, and a new tab starts with an empty sessionStorage.
*/
import { ARRIVAL_TAGS, buildCalUrl, pageName, type ArrivalTags } from "../data/booking";

const KEY = "arc:arrival";
const VISIT_MS = 30 * 60 * 1000;

function fromAddress() {
  const params = new URLSearchParams(location.search);
  const tags: ArrivalTags = {};
  for (const tag of ARRIVAL_TAGS) {
    const value = params.get(tag)?.trim().slice(0, 200);
    if (value) tags[tag] = value;
  }
  return tags;
}

function kept(): ArrivalTags | null {
  try {
    const visit = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return visit && Date.now() - visit.at < VISIT_MS ? visit.tags : null;
  } catch {
    return null;
  }
}

/** This visit's arrival tags, or none ({}) for a visit that came untagged. */
export const arrival: ArrivalTags = kept() ?? fromAddress();

// Each page view keeps the visit going; an untagged visit leaves nothing behind.
try {
  if (Object.keys(arrival).length > 0) localStorage.setItem(KEY, JSON.stringify({ tags: arrival, at: Date.now() }));
  else localStorage.removeItem(KEY);
} catch {
  // Storage can be blocked; the links then carry this page's tags only.
}

// The booking links carry the visitor's tags in place of the site's own.
if (Object.keys(arrival).length > 0) {
  const page = pageName(location.pathname);
  document.querySelectorAll<HTMLAnchorElement>("a[data-book]").forEach((link) => {
    link.href = buildCalUrl(page, arrival);
  });
}
