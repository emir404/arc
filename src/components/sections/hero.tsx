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

      {/* Heading + client logos */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-10 px-5 pb-20 md:px-12 lg:px-24">
        <div className="flex flex-col items-start gap-7">
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
              0.0557em half-leading at leading-none) and add back the carousel's own
              3.9px of slack — its row is sized to the tallest padded viewBox at
              logoScale while fluid sizing draws the ink smaller — landing the
              baseline on the logo bottoms. */}
          <motion.h1
            {...riseIn(0.08)}
            className="mb-[calc(3.9px_-_0.1445em)] text-[34px] font-semibold leading-none tracking-[-0.03em] text-black sm:text-[44px] lg:text-6xl will-change-[filter] backface-hidden"
          >
            All-in-one design studio.
          </motion.h1>
        </div>

        {/* Definite width (100% capped at 442px) so the fluid slots resolve
            to fixed percentages; 442px keeps the row intact at 1440. */}
        <motion.div
          {...riseIn(0.16)}
          className="w-full min-w-0 max-w-[442px] will-change-[filter] backface-hidden"
        >
          <LogoCarousel
            variant="muted"
            slots={3}
            slotWidth="fluid"
            logoScale={0.72}
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
