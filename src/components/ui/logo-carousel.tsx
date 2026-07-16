"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

const LOGO_SCALE = 0.8;
const SLOT_WIDTH = 240;
const MAX_LOGO_HEIGHT = Math.max(...LOGOS.map((l) => l.height));
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

const LOGO_SRCS = LOGOS.map((l) => l.src);

// ── Hooks ───────────────────────────────────────────────────────────

/** Returns responsive slot count: 1 on mobile, 2 on tablet, 3 on desktop. */
function useSlotCount(): number {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqLg.matches) setCount(3);
      else if (mqMd.matches) setCount(2);
      else setCount(1);
    };

    update();
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);

    return () => {
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return count;
}

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
 * Cycles through a list of logos.
 * Pauses when the tab is hidden so staggered delays stay in sync on return.
 */
function useLogoCycle(
  logos: LogoDef[],
  initialDelay: number,
  enabled: boolean,
) {
  const [step, setStep] = useState(0);
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

type CarouselVariant = "muted" | "dark" | "light";

const variantStyles: Record<CarouselVariant, { base: string; interactive: string }> = {
  muted: {
    base: "brightness-0 opacity-40 dark:invert",
    interactive: "transition-opacity duration-200 hover:opacity-60",
  },
  dark: {
    base: "brightness-0 dark:invert",
    interactive: "transition-opacity duration-200 opacity-80 hover:opacity-100",
  },
  /* White logos for blue/dark banners */
  light: {
    base: "brightness-0 invert opacity-55",
    interactive: "transition-opacity duration-200 hover:opacity-90",
  },
};

function LogoSlot({
  logos,
  slotIndex,
  enabled,
  disableLinks,
  variant = "muted",
  slotWidth = SLOT_WIDTH,
  slotShare,
  logoScale = LOGO_SCALE,
}: {
  logos: LogoDef[];
  slotIndex: number;
  enabled: boolean;
  disableLinks?: boolean;
  variant?: CarouselVariant;
  slotWidth?: number | "fit";
  /** Fluid mode: this slot's fixed share of the container width (0–1). */
  slotShare?: number;
  logoScale?: number;
}) {
  const reducedMotion = useReducedMotion();
  // "fit" sizes the slot to its own widest logo, so idle air stays minimal
  // while the width still never changes as logos cycle.
  const resolvedSlotWidth =
    slotWidth === "fit"
      ? Math.round(Math.max(...logos.map((l) => l.width)) * logoScale)
      : slotWidth;
  const { current: logo, hasCycled } = useLogoCycle(
    logos,
    INITIAL_DELAY + slotIndex * SLOT_STAGGER,
    enabled,
  );

  const styles = variantStyles[variant];
  const imgEl = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={disableLinks ? logo.name : ""}
      width={Math.round(logo.width * logoScale)}
      height={Math.round(logo.height * logoScale)}
      className={cn("h-auto max-w-full", styles.base, !disableLinks && styles.interactive)}
    />
  );

  // A share-sized slot is a fixed percentage of the container, so its width
  // depends only on the viewport — never on which logo is currently shown.
  // 88% is distributable; the remaining 12% becomes gaps via justify-between.
  const sizing =
    slotShare != null
      ? { width: `${(slotShare * 88).toFixed(2)}%`, flex: "0 0 auto" }
      : { flex: `0 1 ${resolvedSlotWidth}px` };

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={logo.name}
      className="overflow-hidden flex items-center justify-center"
      style={{
        ...sizing,
        minWidth: 0,
        height: MAX_LOGO_HEIGHT * logoScale + 40,
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
          className="flex max-w-full items-center justify-center will-change-[filter] backface-hidden"
        >
          {disableLinks ? (
            imgEl
          ) : (
            <Link
              href={`${logo.url}?ref=arc`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} (opens in new tab)`}
              className="flex max-w-full"
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
  variant = "muted",
  slotWidth,
  maxSlots,
  slots,
  logoScale,
}: {
  className?: string;
  disableLinks?: boolean;
  variant?: CarouselVariant;
  /**
   * Slot sizing: a fixed pixel width, "fit" (each slot hugs its widest logo),
   * or "fluid" (each slot is a fixed percentage of the container, sized
   * proportionally to its widest logo — widths never move during transitions).
   */
  slotWidth?: number | "fit" | "fluid";
  maxSlots?: number;
  /** Fixed slot count on every breakpoint (overrides responsive counting). */
  slots?: number;
  logoScale?: number;
}) {
  const allLoaded = useImagesPreloaded(LOGO_SRCS);
  const responsiveSlots = useSlotCount();
  const slotCount =
    slots ??
    (maxSlots ? Math.min(responsiveSlots, maxSlots) : responsiveSlots);

  const slotLogos = useMemo(
    () =>
      Array.from({ length: slotCount }, (_, slot) =>
        LOGOS.filter((_, i) => i % slotCount === slot),
      ),
    [slotCount],
  );

  // Fluid mode: each slot's share of the row is proportional to the widest
  // logo it will ever show, so no rotation can outgrow its box.
  const fluid = slotWidth === "fluid";
  const slotShares = useMemo(() => {
    if (!fluid) return null;
    const widest = slotLogos.map((logos) =>
      Math.max(...logos.map((l) => l.width)),
    );
    const total = widest.reduce((sum, w) => sum + w, 0);
    return widest.map((w) => w / total);
  }, [fluid, slotLogos]);

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label="Companies we've partnered with"
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex items-center",
        fluid ? "w-full justify-between" : "gap-4",
        className,
      )}
    >
      {slotLogos.map((logos, i) => (
        <LogoSlot
          key={i}
          logos={logos}
          slotIndex={i}
          enabled={allLoaded}
          disableLinks={disableLinks}
          variant={variant}
          slotWidth={fluid ? "fit" : slotWidth}
          slotShare={slotShares?.[i]}
          logoScale={logoScale}
        />
      ))}
    </motion.div>
  );
}
