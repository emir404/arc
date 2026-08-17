"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// ── Types ───────────────────────────────────────────────────────────

interface LogoDef {
  name: string;
  /** Image logo; absent for text-only slides (e.g. "& more"). */
  src?: string;
  url: string;
  width: number;
  height: number;
}

// ── Logo data ───────────────────────────────────────────────────────

/**
 * width/height are the drawn box at scale 1. Every logo's visible ink is
 * exactly 40 tall: boxes taller than 40 compensate for empty padding baked
 * into that SVG's viewBox (StarSling 15%, The Hog 8%), so on-screen heights
 * stay uniform as slots cycle. Widths follow each viewBox aspect ratio.
 *
 * Automattic is the one entry sized off that rule. Every other box also spans
 * an icon, ascenders and descenders, so only ~0.61 of it carries letterforms;
 * Automattic is a bare all-caps wordmark whose box is 0.94 letterform. Giving
 * it a 40 box would draw its caps half again too large — and at 12.9:1 that is
 * 518 wide, starving every other slot. A 26 box (0.61 × 40 ÷ 0.94) lands its
 * caps on the row's cap line at a third of that width.
 *
 * Order is load-bearing, not just reading order. Slots take every third entry
 * and each slot is as wide as its widest member, so the row's scale is set by
 * the sum of those three widths. Holding the three widest logos in one slot
 * (indices 1, 4, 7) keeps only one of them in that sum. "& more" is pinned
 * last, which puts it in slot 0 — the one logo that can only clip rather than
 * scale down, so that slot needs a widest member (Orchid) it clears easily.
 */
const LOGOS: LogoDef[] = [
  { name: "Sim", src: "/brands/sim.svg", url: "https://sim.ai", width: 82, height: 40 },
  { name: "Automattic", src: "/brands/automattic.svg", url: "https://automattic.com", width: 337, height: 26 },
  { name: "Bloom", src: "/brands/bloom.svg", url: "https://trybloom.ai", width: 147, height: 40 },
  { name: "Orchid", src: "/brands/orchid.svg", url: "https://orchid.ai", width: 166, height: 40 },
  { name: "AgentMail", src: "/brands/agentmail.svg", url: "https://agentmail.to", width: 219, height: 40 },
  { name: "StarSling", src: "/brands/starsling.svg", url: "https://starsling.dev", width: 191, height: 47 },
  { name: "Feyn", src: "/brands/feyn.svg", url: "https://usefeyn.com", width: 95, height: 40 },
  { name: "AgentPhone", src: "/brands/agentphone.svg", url: "https://agentphone.ai", width: 212, height: 40 },
  { name: "The Hog", src: "/brands/thehog.svg", url: "https://thehog.ai", width: 199, height: 43 },
  { name: "& more", url: "/works", width: 139, height: 40 },
];

// ── Constants ───────────────────────────────────────────────────────

const LOGO_SCALE = 0.8;
/**
 * Font size for text slides ("& more") at scale 1. Sized by cap height rather
 * than by the 40-tall ink rule above: that box also spans icons, ascenders and
 * descenders, so matching it would leave text — which is all cap and x-height —
 * overpowering its neighbors. TWK Lausanne's cap is 0.714em, so 44 lands a ~31
 * cap, level with the wordmark logos.
 */
const TEXT_SIZE = 44;
/**
 * Fixed-width slots clamp with `max-w-full`, which would shrink only the
 * widest logo and break the uniform ink height — so this floors at Automattic
 * drawn at LOGO_SCALE (337 × 0.8 = 270), the widest anything ever gets.
 */
const SLOT_WIDTH = 280;
const MAX_LOGO_HEIGHT = Math.max(...LOGOS.map((l) => l.height));
const INITIAL_DELAY = 2500;
const SLOT_STAGGER = 150;
const CYCLE_INTERVAL = 3000;

const LOGO_SRCS = LOGOS.flatMap((l) => (l.src ? [l.src] : []));

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

/* Text slides ("& more") mirror each variant's filtered-image color. */
const textVariantStyles: Record<CarouselVariant, { base: string; interactive: string }> = {
  muted: {
    base: "text-black opacity-40 dark:text-white",
    interactive: "transition-opacity duration-200 hover:opacity-60",
  },
  dark: {
    base: "text-black dark:text-white",
    interactive: "transition-opacity duration-200 opacity-80 hover:opacity-100",
  },
  light: {
    base: "text-white opacity-55",
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
  const textStyles = textVariantStyles[variant];
  // Fluid slots size every logo as a fraction of the slot width (cqw), so
  // when the container squeezes the slot, all logos shrink by one shared
  // factor — a per-logo max-w clamp would shrink only the widest and break
  // the uniform ink height.
  const fluid = slotShare != null;
  const widestWidth = Math.max(...logos.map((l) => l.width));
  const imgEl = logo.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={disableLinks ? logo.name : ""}
      width={Math.round(logo.width * logoScale)}
      height={Math.round(logo.height * logoScale)}
      className={cn("h-auto max-w-full", styles.base, !disableLinks && styles.interactive)}
      style={fluid ? { width: `${((logo.width / widestWidth) * 100).toFixed(2)}cqw` } : undefined}
    />
  ) : (
    <span
      className={cn(
        "whitespace-nowrap font-normal leading-none tracking-[-0.01em]",
        textStyles.base,
        !disableLinks && textStyles.interactive,
      )}
      style={{
        fontSize: fluid
          ? `${((TEXT_SIZE / widestWidth) * 100).toFixed(2)}cqw`
          : Math.round(TEXT_SIZE * logoScale),
      }}
    >
      {logo.name}
    </span>
  );

  // A share-sized slot is a fixed percentage of the container, so its width
  // depends only on the viewport, never on which logo is currently shown.
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
      className={cn(
        "overflow-hidden flex items-center justify-center",
        // Containment stops contents from contributing intrinsic width, so it
        // is only safe where an ancestor fixes the width — true of fluid mode,
        // which requires a definite width anyway, but not of the shrink-to-fit
        // parents non-fluid carousels sit in.
        fluid && "[container-type:inline-size]",
      )}
      style={{
        ...sizing,
        // Non-fluid slots equalize to the mean width of whatever is on screen.
        // An image absorbs that via `max-w-full`, but nowrap text can only
        // clip, so floor a text slot at the width its own label needs — the
        // automatic minimum that would do this is zeroed by `overflow-hidden`.
        minWidth: fluid || logo.src ? 0 : Math.round(logo.width * logoScale),
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
          ) : logo.src ? (
            <Link
              href={`${logo.url}?ref=arc`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${logo.name} (opens in new tab)`}
              className="flex max-w-full"
            >
              {imgEl}
            </Link>
          ) : (
            <Link
              href={logo.url}
              aria-label={`${logo.name} — view all works`}
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
   * proportionally to its widest logo; widths never move during transitions).
   */
  slotWidth?: number | "fit" | "fluid";
  maxSlots?: number;
  /** Fixed slot count on every breakpoint (overrides responsive counting). */
  slots?: number;
  logoScale?: number;
}) {
  const allLoaded = useImagesPreloaded(LOGO_SRCS);
  const responsiveSlots = useSlotCount();
  // Never more slots than logos; an empty slot has nothing to render.
  const slotCount = Math.min(
    LOGOS.length,
    slots ?? (maxSlots ? Math.min(responsiveSlots, maxSlots) : responsiveSlots),
  );

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
