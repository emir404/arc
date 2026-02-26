"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const previews = [
  { src: "/landing/preview-left.png", alt: "Landing page example", rotate: "-rotate-[24deg]" },
  { src: "/landing/preview-center.png", alt: "Landing page example", rotate: "" },
  { src: "/landing/preview-right.png", alt: "Landing page example", rotate: "rotate-[24deg]" },
] as const;

const LandingContent = () => {
  return (
    <div className="flex flex-col items-center pb-16">
      {/* Preview Cards */}
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative h-[200px] w-[380px] sm:h-[276px] sm:w-[516px] will-change-[filter] backface-hidden"
        aria-hidden="true"
      >
        {previews.map((preview, i) => (
          <Link
            key={preview.src}
            href="/works"
            className={`absolute ${i === 0 ? "bottom-0 left-0 z-30" : i === 1 ? "top-0 left-1/2 -translate-x-1/2 z-20" : "bottom-0 right-0 z-10"} ${i !== 1 ? "flex items-center justify-center w-[210px] h-[186px] sm:w-[290px] sm:h-[258px]" : ""}`}
          >
            <div className={`${preview.rotate} transition-transform duration-300 ease-out hover:scale-105`}>
              <div className="w-[170px] h-[125px] sm:w-[240px] sm:h-[175px] rounded-xl bg-[#fcfcfc] border border-[#f9f9f9] overflow-hidden shadow-[0px_22px_22px_0px_rgba(0,0,0,0.03),0px_6px_12px_0px_rgba(0,0,0,0.04),0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  width={240}
                  height={175}
                  draggable={false}
                  className="pointer-events-none size-full object-cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Hero */}
      <div className="mt-12 flex flex-col items-center text-center gap-6 px-5 md:px-12 lg:px-24 xl:px-32">
        <motion.h1
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl lg:text-7xl xl:text-8xl max-w-4xl font-medium tracking-[-0.03em] leading-[1] will-change-[filter] backface-hidden"
        >
          Landing pages for&nbsp;startups
        </motion.h1>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-xl will-change-[filter] backface-hidden"
        >
          Web &amp; mobile designs delivered in Figma within
          3&ndash;5&nbsp;days. No&nbsp;templates, no&nbsp;back-and-forth.
        </motion.p>
      </div>

      {/* Pricing */}
      <motion.div style={{ marginTop: 96 }}
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex items-center gap-3 will-change-[filter] backface-hidden"
      >
        <span className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-[-0.03em]">
          $850
        </span>
        <span className="text-2xl lg:text-3xl text-muted-foreground line-through decoration-2">
          $2,000
        </span>
      </motion.div>

      {/* CTAs */}
      <motion.div style={{ marginTop: 96 }}
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="flex flex-col items-center gap-4 will-change-[filter] backface-hidden"
      >
        <p className="text-sm font-medium text-red-500">
          Only 2&nbsp;slots left
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-5 md:px-12 lg:px-24 xl:px-32">
          <Button className="cursor-pointer" asChild>
            <Link href="https://whop.com/arc-8d3a/landing-page-56/" target="_blank">
              Get yours now
            </Link>
          </Button>
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link href="https://t.me/emirthedev" target="_blank">
              Send a message
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Social Proof */}
      <motion.div style={{ marginTop: 96 }}
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex flex-col items-center gap-6 w-full will-change-[filter] backface-hidden"
      >
        <p className="text-sm text-muted-foreground font-medium">
          Trusted by
        </p>
        <LogoCarousel />
      </motion.div>
    </div>
  );
};

export default LandingContent;
