/*
  On the pages in CAL_POPUP_PAGES, "Book a call" opens Cal.com's booking popup over the page, instead of Cal.com in a
  new tab, so a finished booking can be counted: call_booked { page, location, offer?, utm_source, utm_campaign }.
  The popup books from the same tagged link the button carries (src/data/booking.ts). Nothing of the booking itself,
  such as the visitor's name, goes to PostHog.

  Cal's script loads only once a visitor heads for a booking link: a pointer over one, focus on one, or a touch.
  A click with Cmd, Ctrl, Shift or Alt, or a middle click, still opens Cal.com in a new tab, as a link does. If the
  script can't load (an ad blocker, a dropped connection), the link opens Cal.com in this tab instead.
*/
import { CAL_POPUP_PAGES } from "../data/site";
import { page, track } from "./analytics";

type Cal = ((...args: unknown[]) => void) & { q: unknown[][]; ns: Record<string, unknown>; loaded: boolean };

const EMBED = "https://app.cal.com/embed/embed.js";
const LOAD_MS = 6000;

let embed: Promise<Cal> | null = null;
// The booking link that opened the popup, for call_booked.
let opener: HTMLAnchorElement | null = null;

/** Cal's embed. Calls queue at once, as with Cal's own snippet; the promise settles when its script arrives, or doesn't. */
function cal() {
  embed ??= new Promise<Cal>((resolve, reject) => {
    // Calls wait in Cal.q until embed.js arrives and works through them.
    const queue = ((...args: unknown[]) => queue.q.push(args)) as Cal;
    Object.assign(queue, { q: [], ns: {}, loaded: true });
    (window as typeof window & { Cal?: Cal }).Cal = queue;
    queue("init", { origin: "https://app.cal.com" });
    queue("ui", { theme: "light" });
    queue("on", { action: "bookingSuccessfulV2", callback: booked });
    const script = document.createElement("script");
    script.src = EMBED;
    script.async = true;
    script.onload = () => resolve(queue);
    script.onerror = () => reject(new Error("Cal.com's embed didn't load"));
    document.head.append(script);
    setTimeout(() => reject(new Error("Cal.com's embed took too long to load")), LOAD_MS);
  });
  return embed;
}

function booked() {
  if (!opener) return;
  const tags = new URL(opener.href).searchParams;
  track("call_booked", {
    location: opener.dataset.book,
    offer: opener.dataset.offer,
    utm_source: tags.get("utm_source") ?? undefined,
    utm_campaign: tags.get("utm_campaign") ?? undefined,
  });
}

const bookingLink = (event: Event) => (event.target as Element).closest?.<HTMLAnchorElement>("a[data-book]") ?? null;

if (CAL_POPUP_PAGES.includes(page)) {
  // Heading for a booking link is the cue to fetch Cal's script, so the popup is ready by the click.
  const warm = (event: Event) => {
    if (bookingLink(event)) cal().catch(() => {});
  };
  document.addEventListener("pointerover", warm, { passive: true });
  document.addEventListener("focusin", warm);
  document.addEventListener("touchstart", warm, { passive: true });

  document.addEventListener("click", (event) => {
    const link = bookingLink(event);
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    link.setAttribute("aria-busy", "true");
    cal()
      .then((open) => {
        const url = new URL(link.href);
        open("modal", { calLink: url.pathname.slice(1) + url.search });
      })
      .catch(() => location.assign(link.href))
      .finally(() => link.removeAttribute("aria-busy"));
  });

  // Closing the popup puts the focus back on the link that opened it. Cal's popup says it closed with a "close" event,
  // which doesn't bubble, so it's caught on its way down; the works dialog's "close" is left alone.
  document.addEventListener(
    "close",
    (event) => {
      if ((event.target as Element).localName === "cal-modal-box") opener?.focus({ preventScroll: true });
    },
    true,
  );
}
