export interface Plan {
  name: string;
  /** HTML: the phrase that should stand out goes in <span class="hl">. */
  description: string;
  /** In dollars, before any discount. */
  price: number;
  /** The line under the price. */
  unit: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    name: "Partnership",
    description:
      '<span class="hl">A monthly retainer with unlimited design.</span> Direction, product thinking, design, and development in one focused partnership.',
    price: 12000,
    unit: "per month",
    features: ["Unlimited design requests", "Direct, async collaboration with founders", "Design & development included", "Pause or cancel anytime"],
  },
];

// Under the plans, without a price: anything else is scoped on a call.
export const custom = {
  name: "Custom projects",
  description: "Need something else? Custom projects are scoped on a call.",
};

// The YC deal, in percent: offered in the YC page's intro and taken off every plan there.
// The YC page's link preview image states it too, so a new deal needs a new export of og-yc.png.
export const ycDiscount = 15;

// The same for a16z speedrun companies, on the speedrun page. Its link preview image states it too, so a new deal
// needs a new og-speedrun.png.
export const speedrunDiscount = 15;

export function dollars(amount: number) {
  return "$" + amount.toLocaleString("en-US");
}

/** A price with a percent taken off, rounded to the dollar. */
export function discounted(price: number, percent: number) {
  return Math.round((price * (100 - percent)) / 100);
}
