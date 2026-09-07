"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Showreel from "@/components/sections/showreel";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { riseIn } from "@/lib/animation";

const Hero = () => {
  return (
    <section className="relative bg-white">
      {/* Header */}
      <header className="flex w-full items-center justify-between px-5 py-12 md:px-12 lg:px-24">
        <Link
          href="/"
          aria-label="Arc home"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" className="hidden md:inline-flex">
            <Link href="mailto:omeroztok@witharc.co">Send message</Link>
          </Button>
          <Button asChild>
            <Link
              href="https://cal.com/team/arc-studio/intro-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
            </Link>
          </Button>
        </div>
      </header>

      {/* Heading + client logos. Side by side from xl, where the 641px heading
          still leaves the carousel 400px+; below that the carousel drops under
          the heading, left-aligned like it. */}
      <div className="mt-6 flex flex-col gap-y-10 px-5 pb-20 md:px-12 lg:px-24 xl:flex-row xl:items-end xl:justify-between xl:gap-x-10">
        <div className="flex flex-col items-start gap-7 xl:shrink-0">
          <motion.p
            {...riseIn()}
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#ff6601]/10 px-2 py-1 text-sm leading-none text-[#e7a478] will-change-[filter] backface-hidden"
          >
            Worked with 10+
            <span className="inline-flex items-center gap-1 text-[#ff6601]">
              <Image
                src="/brands/y-combinator.png"
                alt="Y"
                width={16}
                height={16}
                className="size-4 rounded-[2px]"
              />
              Combinator
            </span>
            companies
          </motion.p>
          {/* `items-end` aligns boxes, not ink, so the heading floats a descender
              above the logos. Trim that space (TWK Lausanne: 0.2002em descent less
              0.0557em half-leading at leading-none) and add back the height the
              logos' own baselines sit above the carousel row's bottom — 5px in the
              520px box, where the wordmarks are centered in a row as tall as the
              tallest mark. Re-measure this whenever a logo's box changes. */}
          <motion.h1
            {...riseIn(0.08)}
            className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-black sm:text-[44px] lg:text-6xl xl:mb-[calc(5px_-_0.1445em)] will-change-[filter] backface-hidden"
          >
            All-in-one design studio.
          </motion.h1>
        </div>

        {/* Definite width so the carousel's cqw sizing resolves: 100% under the
            heading, and beside it whatever the heading leaves, capped at 520px —
            the most that still clears the heading by ~80px at 1440. Rows sit
            flush with the heading's edge below xl and with the page's right
            edge beside it. */}
        <motion.div
          {...riseIn(0.16)}
          className="w-full max-w-[520px] xl:min-w-0 xl:flex-1 will-change-[filter] backface-hidden"
        >
          <LogoCarousel
            variant="muted"
            slots={3}
            className="justify-start xl:justify-end"
          />
        </motion.div>
      </div>

      {/* Works showreel panel */}
      <motion.div
        {...riseIn(0.24)}
        className="w-full px-5 pb-6 md:px-12 lg:px-24 will-change-[filter] backface-hidden"
      >
        <div className="h-96 w-full overflow-hidden rounded-[8px] bg-[#f8fbfe] bg-[url('/showreel-bg.png')] bg-cover bg-center p-2 sm:h-auto sm:aspect-[1408/1024] sm:max-h-[64rem] md:p-6 lg:p-10 xl:p-20">
          <Showreel compact background="bg-transparent" revealDelay={0.4} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
