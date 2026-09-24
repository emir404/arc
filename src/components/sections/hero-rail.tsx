"use client";

import { motion } from "motion/react";
import Link from "next/link";
import RailNav from "@/components/layout/rail-nav";
import LogoWall from "@/components/sections/logo-wall";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { riseIn } from "@/lib/animation";

/**
 * The left rail: masthead, pitch and clients. From `lg` it holds the viewport
 * while the works column scrolls past it; below that it stacks above the works
 * and scrolls away with the page.
 */
const HeroRail = () => {
  return (
    // Above the bottom scrim: the works scroll out under a soft edge, but the
    // rail is standing content — a blurred client logo is just an unreadable one.
    <div className="relative z-30 flex flex-col justify-between gap-16 px-5 py-10 sm:px-10 lg:sticky lg:top-0 lg:h-screen lg:w-[460px] lg:shrink-0 lg:gap-0 lg:overflow-y-auto lg:p-10">
      <div className="flex flex-col gap-10 lg:gap-[60px]">
        <motion.div
          {...riseIn()}
          className="flex h-10 w-full items-center justify-between backface-hidden will-change-[filter]"
        >
          <Link
            href="/"
            aria-label="Arc home"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <Logo className="h-10 w-auto" />
          </Link>
          <RailNav />
        </motion.div>

        <div className="flex flex-col items-start gap-9">
          <div className="flex flex-col items-start gap-4">
            <motion.h1
              {...riseIn(0.08)}
              className="max-w-[343px] font-serif text-[40px] leading-none tracking-[-0.04em] text-balance text-black backface-hidden will-change-[filter] sm:text-[48px] lg:text-[56px]"
            >
              All in one design studio.
            </motion.h1>
            <motion.p
              {...riseIn(0.16)}
              className="max-w-[319px] text-base leading-[1.3] tracking-[-0.01em] text-pretty text-black/70 backface-hidden will-change-[filter]"
            >
              Brand, product and web design in one partnership. Trusted by 10+
              Y&nbsp;Combinator companies.
            </motion.p>
          </div>

          <motion.div
            {...riseIn(0.24)}
            className="flex flex-wrap items-center gap-2 backface-hidden will-change-[filter]"
          >
            <Button asChild size="md">
              <Link
                href="https://cal.com/team/arc-studio/intro-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </Link>
            </Button>
            <Button asChild size="md" variant="secondary">
              <Link href="mailto:omeroztok@witharc.co">Send message</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        {...riseIn(0.32)}
        className="backface-hidden will-change-[filter]"
      >
        <LogoWall />
      </motion.div>
    </div>
  );
};

export default HeroRail;
