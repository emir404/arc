/*
  /llms.txt: the studio in plain Markdown for AI assistants and agents (see llmstxt.org), so they can describe Arc Studio,
  its prices and its clients without reading the designed pages. It's built from the same data as the pages, so it stays current.
*/
import type { APIRoute } from "astro";
import { bookCallUrl, email, socials } from "../data/links";
import { plans, dollars, discounted, ycDiscount } from "../data/plans";
import { testimonials } from "../data/testimonials";
import { works, clients, isFinished, type Work, type WorkKey } from "../data/works";
import { frontmatter as terms } from "./terms.md";
import { frontmatter as privacy } from "./privacy.md";

/** The data's HTML, such as the highlight spans, as plain text. */
function plain(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;

  // A client's name, linked to its project page once that's finished, with its line and live site when known.
  // A project with a name of its own follows its client's, as in "Automattic (Spacefast)".
  const client = (key: WorkKey) => {
    const work: Work = works[key];
    const title = work.client ? `${work.client} (${work.name})` : work.name;
    const name = isFinished(work) ? `[${title}](${url(`/work/${key}/`)})` : title;
    return `- ${name}${work.tagline ? `: ${work.tagline}` : ""}${work.live ? ` (${work.live.url})` : ""}`;
  };

  const body = `# Arc Studio

> Arc Studio is the all-in-one design studio for early-stage startups. Direction, product thinking, design, development and motion in one place.

Arc Studio (${url("/")}) works with founders on product direction, brand, UX/UI design, design systems, websites, development and motion. It has worked with 10+ Y Combinator companies. Founded by Emir Ayaz, it is based in Türkiye and works with founders worldwide.

## Pricing

Prices are in US dollars.

${plans
  .map((plan) => [`### ${plan.name}`, "", `Price: ${dollars(plan.price)} (${plan.unit})`, "", plain(plan.description), "", ...plan.features.map((feature) => `- ${feature}`)].join("\n"))
  .join("\n\n")}

Y Combinator companies get ${ycDiscount}% off every plan: ${plans.map((plan) => `${plan.name}, ${dollars(discounted(plan.price, ycDiscount))} (${plan.unit})`).join("; ")}.

## Clients

${clients.map(client).join("\n")}
- And more

## What founders say

${Object.values(testimonials)
  .map((quote) => `- ${quote.name}, ${quote.role}: “${plain(quote.text)}”`)
  .join("\n")}

## Contact

- [Book a call](${bookCallUrl})
- Email: ${email}
${socials.map((social) => `- [${social.label}](${social.url})`).join("\n")}

## Pages

- [Arc Studio](${url("/")}): the main page, with selected works, testimonials and pricing
- [Arc Studio for YC founders](${url("/yc/")}): work for Y Combinator companies, and the YC deal

## Optional

- [${terms.title}](${url("/terms/")}): ${terms.description}
- [${privacy.title}](${url("/privacy/")}): ${privacy.description}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
