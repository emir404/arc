/*
  /llms.txt: the studio in plain Markdown for AI assistants and agents (see llmstxt.org), so they can describe Arc Studio,
  its prices and its clients without reading the designed pages. It's built from the same data as the pages, so it stays current.
*/
import type { APIRoute } from "astro";
import { CONTACT_EMAIL, socials } from "../data/site";
import { buildCalUrl } from "../data/booking";
import { plans, custom, dollars } from "../data/plans";
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

> Arc Studio is the design and build team for AI startups. Brand, product, site, and launch video. One team, one month.

Arc Studio (${url("/")}) works with founders on brand, product design, websites, development and launch video, through two offers: Launch, everything a startup needs to launch in one month, and Partnership, its design, development and video team after launch. It has worked with 10+ Y Combinator companies. Founded by Emir Ayaz, it is based in Türkiye and works with founders worldwide.

## Pricing

Prices are in US dollars, and public: the call is to check fit and pick a start date.

${plans
  .map((plan) =>
    [
      `### ${plan.name}`,
      "",
      `${dollars(plan.price)} ${plan.unit}.${plan.payment ? ` ${plan.payment(plan.price)}` : ""}`,
      "",
      plan.tagline,
      "",
      ...plan.features.map((feature) => `- ${feature}`),
      "",
      plan.note,
    ].join("\n"),
  )
  .join("\n\n")}

### ${custom.name}

${custom.description}

Y Combinator and a16z speedrun companies pay less: ${plans.map((plan) => `${plan.name}, ${dollars(plan.acceleratorPrice)} ${plan.unit}`).join("; ")}.

## Clients

${clients.map(client).join("\n")}
- And more

## What founders say

${Object.values(testimonials)
  .map((quote) => `- ${quote.name}, ${"batch" in quote ? `${quote.role} (${quote.batch})` : quote.role}: “${plain(quote.text)}”`)
  .join("\n")}

## Contact

- [Book a call](${buildCalUrl("llms.txt")})
- Email: ${CONTACT_EMAIL}
${socials.map((social) => `- [${social.label}](${social.url})`).join("\n")}

## Pages

- [Arc Studio](${url("/")}): the main page, with selected works, testimonials and pricing
- [Launch](${url("/launch/")}): the Launch package, brand, site, product screens and launch video in one month
- [Arc Studio for YC founders](${url("/yc/")}): work for Y Combinator companies, and the YC prices
- [Arc Studio for a16z speedrun founders](${url("/speedrun/")}): selected works, and the speedrun prices

## Optional

- [${terms.title}](${url("/terms/")}): ${terms.description}
- [${privacy.title}](${url("/privacy/")}): ${privacy.description}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
