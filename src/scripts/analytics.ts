/*
  The site's own events in PostHog, beside what it records by itself (see src/components/PostHog.astro):

  - book_call_clicked { page, location, offer? }: a "Book a call" clicked. Booking links carry data-book="<location>"
    (hero, pricing, faq, footer…) and, for one offer in particular, data-offer (launch, partnership or custom).
  - contact_clicked { page, location }: an email link clicked, with its data-contact, or "text" for one in running text.
  - call_booked: a booking made in Cal.com's popup (src/scripts/cal.ts).
  - Any other link's own event, named in its data-event, with data-location: see_launch_clicked { page, location }
    from the main page's "See Launch →".

  The tags a visitor arrived with (src/scripts/arrival.ts) go on every event of their visit, as session properties.
  PostHog drops events until the visitor answers the cookie banner, so these count only visitors who have.
*/
import { pageName } from "../data/booking";
import { arrival } from "./arrival";

interface PostHog {
  capture(event: string, properties?: Record<string, unknown>): void;
  register_for_session(properties: Record<string, unknown>): void;
}

const site = window as typeof window & { posthog?: PostHog; posthogLoaded?: PostHog };

/** This page's name in events: "home", "yc", "launch", "work-axiom"… */
export const page = pageName(location.pathname);

/** Sends an event with the page it happened on. Until PostHog's library arrives, its snippet queues the call. */
export function track(event: string, properties: Record<string, string | undefined> = {}) {
  (site.posthogLoaded ?? site.posthog)?.capture(event, { page, ...properties });
}

/** Runs once PostHog has loaded: not every call, register_for_session among them, waits in the snippet's queue. */
function whenLoaded(callback: (posthog: PostHog) => void) {
  if (site.posthogLoaded) callback(site.posthogLoaded);
  else window.addEventListener("posthog:loaded", () => site.posthogLoaded && callback(site.posthogLoaded), { once: true });
}

if (Object.keys(arrival).length > 0) whenLoaded((posthog) => posthog.register_for_session({ ...arrival }));

// A middle click opens a link in a new tab without a click event, so it's counted from auxclick.
function onClick(event: MouseEvent) {
  if (event.type === "auxclick" && event.button !== 1) return;
  const link = (event.target as Element).closest?.<HTMLAnchorElement>("a[data-book], a[href^='mailto:'], a[data-event]");
  if (!link) return;
  if (link.dataset.book !== undefined) track("book_call_clicked", { location: link.dataset.book, offer: link.dataset.offer });
  else if (link.dataset.event) track(link.dataset.event, { location: link.dataset.location });
  else track("contact_clicked", { location: link.dataset.contact ?? "text" });
}

document.addEventListener("click", onClick);
document.addEventListener("auxclick", onClick);
