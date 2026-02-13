"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// ── Logo definitions ────────────────────────────────────────────────
// height: optical display height tuned per logo
// width: computed from native aspect ratio at that height

interface LogoDef {
  name: string;
  src: string;
  width: number;
  height: number;
}

const LOGOS: LogoDef[] = [
  { name: "Lantern", src: "/brands/lantern.svg", width: 186, height: 40 },
  { name: "Sim", src: "/brands/sim.svg", width: 84, height: 41 },
  { name: "Langbase", src: "/brands/langbase.svg", width: 202, height: 40 },
  { name: "AgentMail", src: "/brands/agentmail.svg", width: 219, height: 40 },
  { name: "Dot", src: "/brands/dot.svg", width: 114, height: 40 },
  { name: "Fontface", src: "/brands/fontface.svg", width: 169, height: 40 },
  { name: "Parrychain", src: "/brands/parrychain.svg", width: 211, height: 25 },
  { name: "Someone", src: "/brands/someone.svg", width: 176, height: 30 },
  { name: "Tesseract", src: "/brands/tesseract.svg", width: 162, height: 45 },
];

// ── Carousel constants ──────────────────────────────────────────────

const SLOT_WIDTH = Math.max(...LOGOS.map((l) => l.width));
const SLOT_HEIGHT = Math.max(...LOGOS.map((l) => l.height));
const SLOT_COUNT = 3;
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

// ── Hook ────────────────────────────────────────────────────────────

function useLogoCarousel(slotIndex: number, initialDelay: number) {
  // Each slot cycles through its own subset: slot 0 → [0,3,6], slot 1 → [1,4,7], etc.
  const [step, setStep] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isFirstRef = useRef(true);

  const advance = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const slotLogos = LOGOS.filter((_, i) => i % SLOT_COUNT === slotIndex);
  const index = LOGOS.indexOf(slotLogos[step % slotLogos.length]);

  useEffect(() => {
    const delay = isFirstRef.current ? initialDelay : CYCLE_INTERVAL;
    isFirstRef.current = false;
    timeoutRef.current = setTimeout(advance, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [advance, step, initialDelay]);

  return index;
}

// ── LogoSlot ────────────────────────────────────────────────────────

function LogoSlot({ slotIndex }: { slotIndex: number }) {
  const reducedMotion = useReducedMotion();
  const logoIndex = useLogoCarousel(
    slotIndex,
    INITIAL_DELAY + slotIndex * SLOT_STAGGER,
  );
  const logo = LOGOS[logoIndex];
  const hasCycled = useRef(false);

  if (logoIndex !== slotIndex) {
    hasCycled.current = true;
  }

  return (
    <div
      className="overflow-hidden flex items-center justify-center"
      style={{
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT + 40,
        marginTop: -20,
        marginBottom: -20,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={logoIndex}
          initial={
            !hasCycled.current
              ? false
              : reducedMotion
                ? { opacity: 0 }
                : { y: 20, opacity: 0, filter: "blur(8px)" }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { y: 0, opacity: 1, filter: "blur(0px)" }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { y: -20, opacity: 0, filter: "blur(8px)" }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center justify-center will-change-[filter] backface-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="brightness-0 opacity-40 dark:invert"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 pb-16 xl:flex-row xl:justify-between xl:items-end px-5 md:px-12 lg:px-24 xl:px-32">
      <motion.h1
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl lg:text-7xl xl:text-8xl max-w-3xl font-medium tracking-[-0.03em] leading-[1] will-change-[filter] backface-hidden"
      >
        Design partner for busy founders
      </motion.h1>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="flex items-center gap-6 will-change-[filter] backface-hidden"
      >
        {Array.from({ length: SLOT_COUNT }, (_, i) => (
          <LogoSlot key={i} slotIndex={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
