import { AVAILABILITY, LAUNCH_CAPACITY_PER_MONTH, PARTNERSHIP_TURNAROUND, PARTNERSHIP_VIDEOS, PRICES } from "./site";

/** Who a page is for. YC and a16z speedrun companies pay the accelerator prices. */
export type Audience = "default" | "yc" | "speedrun";

/** What the accelerator prices are called on each audience's page. */
export const dealName: Record<Audience, string | null> = { default: null, yc: "YC price", speedrun: "speedrun price" };

export interface Plan {
  name: string;
  /** For analytics: what its button books a call about. */
  offer: "launch" | "partnership";
  /** In dollars, the list price and the accelerator price. */
  price: number;
  acceleratorPrice: number;
  /** Under the price. */
  unit: string;
  tagline: string;
  /** Under the tagline: how it's paid, at the price shown. */
  payment?: (price: number) => string;
  features: string[];
  /** Beside its button. */
  note: string;
  /** Its button's words. */
  book: string;
}

export function dollars(amount: number) {
  return "$" + amount.toLocaleString("en-US");
}

/** How many Launch projects start a month: beside the Launch plan's button. */
const perMonth = `We take ${LAUNCH_CAPACITY_PER_MONTH} Launch projects a month.`;

/** That, and whether new ones can: under the hero's buttons on the main, YC, speedrun and launch pages, the one place a page says so. */
export const capacity = `${perMonth} ${AVAILABILITY}.`;

/** Launch is paid in equal installments. */
export const installments = (price: number) => `Paid in ${PRICES.launchInstallments} installments of ${dollars(price / PRICES.launchInstallments)}.`;

// Launch first: most teams start with it and roll into a Partnership.
export const plans: Plan[] = [
  {
    name: "Launch",
    offer: "launch",
    price: PRICES.launch,
    acceleratorPrice: PRICES.launchAccelerator,
    unit: "for one month",
    tagline: "Brand, site, product, and video. Ready in a month.",
    payment: installments,
    features: [
      "Brand identity: logo, type, color, and rules for using them",
      "Marketing site, designed and built",
      "Up to 12 product screens, designed and built",
      "Launch video, up to 90 seconds",
      "Two weeks of fixes after handoff",
    ],
    note: perMonth,
    book: "Book a Launch call",
  },
  {
    name: "Partnership",
    offer: "partnership",
    price: PRICES.partnership,
    acceleratorPrice: PRICES.partnershipAccelerator,
    unit: "per month",
    tagline: "We keep designing, building, and making videos after launch.",
    features: [
      "Unlimited requests, worked through in order",
      `Turnaround: ${PARTNERSHIP_TURNAROUND}`,
      `Design and development, plus video: ${PARTNERSHIP_VIDEOS}`,
      "Async by default, in your Slack",
      "Pause or cancel anytime",
    ],
    note: "Most teams start with Launch and roll into Partnership.",
    book: "Book a call",
  },
];

// Under the plans, without a price: anything else is scoped on a call.
export const custom = {
  name: "Custom projects",
  description: "Need something else? Custom projects are scoped on a call.",
};
