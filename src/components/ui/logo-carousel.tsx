"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// ── Logo definitions ────────────────────────────────────────────────

interface LogoDef {
  name: string;
  src: string;
  url: string;
  width: number;
  height: number;
}

const LOGOS: LogoDef[] = [
  { name: "Lantern", src: "/brands/lantern.svg", url: "https://withlantern.com", width: 186, height: 40 },
  { name: "Sim", src: "/brands/sim.svg", url: "https://sim.ai", width: 84, height: 41 },
  { name: "Langbase", src: "/brands/langbase.svg", url: "https://langbase.com", width: 202, height: 40 },
  { name: "AgentMail", src: "/brands/agentmail.svg", url: "https://agentmail.to", width: 219, height: 40 },
  { name: "Dot", src: "/brands/dot.svg", url: "https://bydot.studio", width: 114, height: 40 },
  { name: "Fontface", src: "/brands/fontface.svg", url: "https://fontface.ai", width: 169, height: 40 },
  { name: "Tesseract", src: "/brands/tesseract.svg", url: "https://x.com/usetesseract", width: 180, height: 50 },
  { name: "Someone", src: "/brands/someone.svg", url: "https://someo.ne", width: 176, height: 30 },
  { name: "Parrychain", src: "/brands/parrychain.svg", url: "https://parrychain.ai", width: 211, height: 25 },
];

const LOGO_SRCS = LOGOS.map((l) => l.src);

// ── Carousel constants ──────────────────────────────────────────────

const SLOT_WIDTH = Math.max(...LOGOS.map((l) => l.width));
const SLOT_HEIGHT = Math.max(...LOGOS.map((l) => l.height));
const SLOT_COUNT = 3;
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

// ── Hooks ───────────────────────────────────────────────────────────

/** Resolves `true` once every image in `srcs` has loaded (or errored). */
function useImagesPreloaded(srcs: readonly string[]): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      srcs.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [srcs]);

  return loaded;
}

/**
 * Cycles through logos assigned to `slotIndex` (round-robin across slots).
 * Pauses when the tab is hidden so staggered delays stay in sync on return.
 */
function useLogoCarousel(
  slotIndex: number,
  initialDelay: number,
  enabled: boolean,
) {
  const [step, setStep] = useState(0);

  const slotLogos = LOGOS.filter((_, i) => i % SLOT_COUNT === slotIndex);
  const logoIndex = LOGOS.indexOf(slotLogos[step % slotLogos.length]);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;
    let remaining = step === 0 ? initialDelay : CYCLE_INTERVAL;

    const schedule = (delay: number) => {
      remaining = delay;
      startedAt = Date.now();
      timeoutId = setTimeout(() => setStep((s) => s + 1), delay);
    };

    const pause = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
        timeoutId = null;
        remaining = Math.max(0, remaining - (Date.now() - startedAt));
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else {
        schedule(remaining);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!document.hidden) {
      schedule(remaining);
    }

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, step, initialDelay]);

  return { logoIndex, hasCycled: step > 0 };
}

// ── LogoSlot ────────────────────────────────────────────────────────

function LogoSlot({
  slotIndex,
  enabled,
  disableLinks,
}: {
  slotIndex: number;
  enabled: boolean;
  disableLinks?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const { logoIndex, hasCycled } = useLogoCarousel(
    slotIndex,
    INITIAL_DELAY + slotIndex * SLOT_STAGGER,
    enabled,
  );
  const logo = LOGOS[logoIndex];

  return (
    <div
      className="overflow-hidden flex items-center justify-center"
      style={{ width: SLOT_WIDTH, height: SLOT_HEIGHT + 40, marginBlock: -20 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={logoIndex}
          initial={
            !hasCycled
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
          {disableLinks ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="brightness-0 opacity-40 dark:invert"
            />
          ) : (
            <Link
              href={`${logo.url}?ref=arc`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="brightness-0 opacity-40 dark:invert transition-opacity duration-200 hover:opacity-60"
              />
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── LogoCarousel ────────────────────────────────────────────────────

export function LogoCarousel({
  className,
  disableLinks,
}: {
  className?: string;
  disableLinks?: boolean;
}) {
  const allLoaded = useImagesPreloaded(LOGO_SRCS);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("flex items-center gap-2", className)}
    >
      {Array.from({ length: SLOT_COUNT }, (_, i) => (
        <LogoSlot key={i} slotIndex={i} enabled={allLoaded} disableLinks={disableLinks} />
      ))}
    </motion.div>
  );
}
