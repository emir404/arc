"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Emir is a talented designer with massive potential. He\u2019s both a developer and designer, making his skillset highly valuable for fast-moving teams.",
    name: "Emir Karabeg",
    role: "CEO, Sim (YC\u00a0X25)",
    image:
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wAWpSXJiXFHyYdLri97MVlCEIpf80RoNbWOnm",
  },
  {
    quote:
      "Emir is a fantastic person and an excellent professional. He is one of the best designers I have ever worked with. His work with Tesseract is incredible, those sharp edges impress me every single day. + rep",
    name: "Vicente Sanchez",
    role: "Founder of Tesseract, SWE",
    image: "/vicente.jpg",
  },
  {
    quote:
      "Emir is a rare designer who can think, design, and build. He took Chonkie from early concept to a real, shipped product, including Chonkie News and our website. Fast, sharp, and deeply thoughtful about product.",
    name: "Shreyash Nigam",
    role: "CEO, Chonkie (YC\u00a0X25)",
    image: "/shreyash.jpg",
  },
];

const ROTATION_INTERVAL = 5000;

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgressKey((k) => k + 1);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(advance, ROTATION_INTERVAL);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [advance, progressKey]);

  return (
    <div className="flex flex-col gap-10 pb-16 px-5 md:px-12 lg:px-24 xl:px-32">
      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl font-medium tracking-tight max-w-4xl will-change-[filter] backface-hidden"
      >
        From ideas to brands, products, websites, and experiences.
      </motion.p>
      <div className="flex flex-col gap-6 text-xl text-muted-foreground max-w-2xl">
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="will-change-[filter] backface-hidden"
        >
          We work with{" "}
          <span className="font-medium text-foreground">small</span>,{" "}
          <span className="font-medium text-foreground">ambitious teams</span>{" "}
          building products with intent. Teams that care about what they're
          building and why it matters.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="will-change-[filter] backface-hidden"
        >
          From early direction and first sketches to real, shipped outcomes. We
          help shape ideas, define the product, and turn vision into something
          people can actually use.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="will-change-[filter] backface-hidden"
        >
          We focus on{" "}
          <span className="font-medium text-foreground">clarity</span>,{" "}
          <span className="font-medium text-foreground">craft</span>, and{" "}
          <span className="font-medium text-foreground">momentum</span> at every
          step. Clear thinking, thoughtful design, and steady execution working
          together to move products forward.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="will-change-[filter] backface-hidden"
        >
          Our clients have raised more than{" "}
          <span>
            <Tooltip>
              <TooltipTrigger className="font-medium text-foreground">
                $25M+
              </TooltipTrigger>
              <TooltipContent className="text-lg">
                Roughly 50 brand-new Porsche 911 GT3 RS
              </TooltipContent>
            </Tooltip>
          </span>
          . A reflection of strong products, clear stories, and teams that ship.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="will-change-[filter] backface-hidden"
        >
          Designed for teams building long-term value. Not just for today's
          launch, but for{" "}
          <span className="font-medium text-foreground">what comes next</span>.
        </motion.p>
      </div>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        className="rounded-3xl p-6 border-border border max-w-2xl shadow-xs flex flex-col gap-6 will-change-[filter] backface-hidden h-[200px] overflow-hidden relative"
      >
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={activeIndex}
              initial={{ filter: "blur(8px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              exit={{ filter: "blur(8px)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-xl text-foreground font-medium will-change-[filter] backface-hidden"
            >
              {testimonials[activeIndex].quote}
            </motion.p>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ filter: "blur(8px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ filter: "blur(8px)", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex gap-4 items-center will-change-[filter] backface-hidden"
          >
            <Image
              src={testimonials[activeIndex].image}
              alt={testimonials[activeIndex].name}
              width={48}
              height={48}
              className="rounded-full size-10"
            />
            <div className="flex flex-col gap-0">
              <p className="leading-[1] font-medium">
                {testimonials[activeIndex].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bars */}
        <div className="absolute bottom-6 right-6 flex gap-1 w-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="relative h-[2px] flex-1 rounded-full overflow-hidden bg-foreground/10 touch-manipulation"
            >
              <AnimatePresence>
                {i === activeIndex && (
                  <motion.div
                    key={progressKey}
                    className="absolute inset-0 rounded-full bg-foreground/50 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: 1,
                      transition: {
                        duration: ROTATION_INTERVAL / 1000,
                        ease: "linear",
                      },
                    }}
                    exit={{
                      scaleX: 0,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
