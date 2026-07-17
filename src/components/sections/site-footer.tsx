"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { riseInView } from "@/lib/animation";

type FooterLink = { label: string; href: string; external?: boolean };

const linkColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Socials",
    links: [
      {
        label: "X (formerly Twitter)",
        href: "https://x.com/emirayaaz",
        external: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/witharcstudio",
        external: true,
      },
    ],
  },
  {
    title: "Website",
    links: [
      { label: "Works", href: "/works" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
];

const FooterNavLink = ({ link }: { link: FooterLink }) => (
  <Link
    href={link.href}
    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="rounded-sm text-lg font-light leading-[1.4] text-black/75 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    {link.label}
  </Link>
);

const SiteFooter = () => {
  return (
    <footer className="flex flex-col gap-12 bg-white px-5 py-12 md:px-12 md:py-16 lg:gap-16 lg:px-24 lg:py-20">
      {/* Top: logo · heading + CTAs · link columns (single row at xl, per the 1440 Figma) */}
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-12 xl:flex-row xl:gap-0">
          <motion.div
            {...riseInView()}
            className="shrink-0 will-change-[filter] backface-hidden xl:w-[262px]"
          >
            <Link
              href="/"
              aria-label="Arc home"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Logo className="h-16 w-auto" />
            </Link>
          </motion.div>

          <motion.div
            {...riseInView(0.08)}
            className="flex max-w-[461px] flex-col items-start gap-10 will-change-[filter] backface-hidden lg:gap-16"
          >
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-black lg:text-[40px] lg:leading-none">
              You got in. Now let’s take <br className="hidden sm:block" />
              product quality to moon.
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild>
                <Link
                  href="https://cal.com/team/arc-studio/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a call
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="mailto:omeroztok@witharc.co">Send message</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.nav
          {...riseInView(0.16)}
          aria-label="Footer"
          className="flex shrink-0 flex-wrap gap-10 will-change-[filter] backface-hidden sm:gap-16"
        >
          {linkColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-lg font-[450] leading-[1.4] text-black">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.nav>
      </div>

      {/* Bottom: legal */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-base font-light leading-[1.4] text-black/75">
        <p>© Arc Studio</p>
        <nav aria-label="Legal" className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="rounded-sm transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="rounded-sm transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
