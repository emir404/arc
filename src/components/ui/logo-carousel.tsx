"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────

interface LogoDef {
  name: string;
  src: string;
  url: string;
  width: number;
  height: number;
}

// ── Logo data ───────────────────────────────────────────────────────

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

// ── Constants ───────────────────────────────────────────────────────

const SLOT_COUNT = 3;
const SLOT_HEIGHT = Math.max(...LOGOS.map((l) => l.height));
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

/** Logos assigned to each slot (round-robin). */
const SLOT_LOGOS = Array.from({ length: SLOT_COUNT }, (_, slot) =>
  LOGOS.filter((_, i) => i % SLOT_COUNT === slot),
);

const SLOT_WIDTH = 240;

const LOGO_SRCS = LOGOS.map((l) => l.src);

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
 * Cycles through logos assigned to a slot.
 * Pauses when the tab is hidden so staggered delays stay in sync on return.
 */
function useLogoCarousel(
  slotIndex: number,
  initialDelay: number,
  enabled: boolean,
) {
  const [step, setStep] = useState(0);

  const logos = SLOT_LOGOS[slotIndex];
  const current = logos[step % logos.length];

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
      if (document.hidden) pause();
      else schedule(remaining);
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) schedule(remaining);

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [enabled, step, initialDelay]);

  return { current, hasCycled: step > 0 };
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
  const { current: logo, hasCycled } = useLogoCarousel(
    slotIndex,
    INITIAL_DELAY + slotIndex * SLOT_STAGGER,
    enabled,
  );

  const imgEl = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={disableLinks ? logo.name : ""}
      width={logo.width}
      height={logo.height}
      className={cn(
        "brightness-0 opacity-40 dark:invert",
        !disableLinks && "transition-opacity duration-200 hover:opacity-60",
      )}
    />
  );

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={logo.name}
      className="overflow-hidden flex items-center justify-center"
      style={{
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT + 40,
        marginBlock: -20,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={logo.name}
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
            imgEl
          ) : (
            <Link
              href={`${logo.url}?ref=arc`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} (opens in new tab)`}
            >
              {imgEl}
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
      role="region"
      aria-roledescription="carousel"
      aria-label="Companies we've partnered with"
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("flex items-center gap-4", className)}
    >
      {Array.from({ length: SLOT_COUNT }, (_, i) => (
        <LogoSlot
          key={i}
          slotIndex={i}
          enabled={allLoaded}
          disableLinks={disableLinks}
        />
      ))}
    </motion.div>
  );
}
