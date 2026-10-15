// The site's analytics, by PostHog: see src/components/PostHog.astro.

/** The PostHog project's token, from PUBLIC_POSTHOG_PROJECT_TOKEN: in .env locally, and in the Vercel project's settings. */
export const posthogToken: string | undefined = import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN || undefined;

/** PostHog's app, where links such as its toolbar's lead. It matches the cloud the /relay rewrites in vercel.json point to. */
export const posthogUiHost = "https://us.posthog.com";

/**
 * Whether pages carry PostHog, its cookie banner and the footer's "Cookies": on production builds that have the token.
 * `astro dev` leaves them out, so working on the site doesn't count as visits.
 */
export const analytics = import.meta.env.PROD && Boolean(posthogToken);

// A build without the token still works, but says so: its pages would count no one.
if (import.meta.env.PROD && !posthogToken) {
  console.error(
    "PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
  );
}
