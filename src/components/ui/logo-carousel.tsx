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
  /** Drawn box height; for text slides, the font size. */
  height: number;
}

// ── Logo data ───────────────────────────────────────────────────────

/**
 * Order is display order: a row shows `slots` logos at a time and cycles
 * through the list in rounds, so the three-slot hero shows Automattic, Axiom,
 * AgentMail, then Sim, Orchid, "& more".
 *
 * width/height are the drawn box at a nominal scale where the marks read as
 * one size. Bounding boxes can't be equalized directly — each SVG's box spans
 * a different mix of icon, ascenders and descenders — so the letterforms are
 * matched instead and the box follows from the viewBox:
 *   box height = viewBox height × target letterform ÷ letterform in viewBox.
 * Mixed-case wordmarks (AgentMail, Orchid, "& more") share a 27 cap height.
 * The all-caps wordmarks (Automattic, Axiom) take 0.88 of that: a word set
 * entirely in caps reads larger than its cap height. Sim, lowercase-only,
 * matches on x-height at 0.78 of the cap (mixed-case x-heights here run
 * ~0.72). Widths follow each viewBox's aspect ratio; "& more" is its measured
 * advance at that font size.
 */
const LOGOS: LogoDef[] = [
  {
    name: "Automattic",
    src: "/brands/automattic.svg",
    url: "https://automattic.com",
    width: 331,
    height: 25.5,
  },
  {
    name: "Axiom",
    src: "/brands/axiom.svg",
    url: "https://axiom.trade",
    width: 148,
    height: 30.7,
  },
  {
    name: "AgentMail",
    src: "/brands/agentmail.svg",
    url: "https://agentmail.to",
    width: 219,
    height: 40,
  },
  {
    name: "Sim",
    src: "/brands/sim.svg",
    url: "https://sim.ai",
    width: 55,
    height: 27,
  },
  {
    name: "Orchid",
    src: "/brands/orchid.svg",
    url: "https://orchid.ai",
    width: 172,
    height: 41.3,
  },
  { name: "& more", url: "/works", width: 126, height: 40 },
];

// ── Constants ───────────────────────────────────────────────────────

/** Gap between neighbouring logos, in the same nominal units as the boxes. */
const GAP = 50;
const INITIAL_DELAY = 2500;
const CYCLE_INTERVAL = 3000;
/** Seconds between neighbours starting their transition. */
const STAGGER = 0.15;
const TRANSITION = { duration: 0.5, ease: "easeInOut" } as const;

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
 * Counts up every CYCLE_INTERVAL after an initial delay.
 * Pauses when the tab is hidden so the cadence resumes where it left off.
 */
function useCycle(enabled: boolean): number {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startedAt = 0;
    let remaining = step === 0 ? INITIAL_DELAY : CYCLE_INTERVAL;

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
  }, [enabled, step]);

  return step;
}

// ── Styles ──────────────────────────────────────────────────────────

type CarouselVariant = "muted" | "dark" | "light";

const variantStyles: Record<
  CarouselVariant,
  { base: string; interactive: string }
> = {
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
const textVariantStyles: Record<
  CarouselVariant,
  { base: string; interactive: string }
> = {
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

// ── Motion ──────────────────────────────────────────────────────────

/* Rows only orchestrate: neighbours start STAGGER apart, on the way in and out. */
const rowVariants = {
  enter: { transition: { staggerChildren: STAGGER } },
  exit: { transition: { staggerChildren: STAGGER } },
};

const slideVariants = {
  initial: { y: 20, opacity: 0, filter: "blur(8px)" },
  enter: { y: 0, opacity: 1, filter: "blur(0px)", transition: TRANSITION },
  exit: { y: -20, opacity: 0, filter: "blur(8px)", transition: TRANSITION },
};

const reducedSlideVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: TRANSITION },
  exit: { opacity: 0, transition: TRANSITION },
};

// ── Slide ───────────────────────────────────────────────────────────

function Slide({
  logo,
  unit,
  disableLinks,
  variant,
}: {
  logo: LogoDef;
  /** cqw per nominal unit. */
  unit: number;
  disableLinks?: boolean;
  variant: CarouselVariant;
}) {
  const reducedMotion = useReducedMotion();
  const styles = variantStyles[variant];
  const textStyles = textVariantStyles[variant];

  const content = logo.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={disableLinks ? logo.name : ""}
      width={Math.round(logo.width)}
      height={Math.round(logo.height)}
      className={cn("h-auto", styles.base, !disableLinks && styles.interactive)}
      style={{ width: `${(logo.width * unit).toFixed(3)}cqw` }}
    />
  ) : (
    <span
      className={cn(
        "whitespace-nowrap font-normal leading-none tracking-[-0.01em]",
        textStyles.base,
        !disableLinks && textStyles.interactive,
      )}
      style={{ fontSize: `${(logo.height * unit).toFixed(3)}cqw` }}
    >
      {logo.name}
    </span>
  );

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={logo.name}
      variants={reducedMotion ? reducedSlideVariants : slideVariants}
      className="flex shrink-0 items-center will-change-[filter] backface-hidden"
    >
      {disableLinks ? (
        content
      ) : logo.src ? (
        <Link
          href={`${logo.url}?ref=arc`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${logo.name} (opens in new tab)`}
          className="flex"
        >
          {content}
        </Link>
      ) : (
        <Link
          href={logo.url}
          aria-label={`${logo.name} — view all works`}
          className="flex"
        >
          {content}
        </Link>
      )}
    </motion.div>
  );
}

// ── LogoCarousel ────────────────────────────────────────────────────

/**
 * Fills its container and cycles through LOGOS a round at a time. Every logo
 * is sized as a share of the container width (cqw) with one scale for the
 * whole set — the one that lets the widest round fit — so ink heights stay
 * uniform across rounds and nothing ever reflows. Narrower rounds are shorter
 * than the container; align them with a `justify-*` class on `className`
 * (rows are centered by default). Cap the size with a `max-w-*`.
 */
export function LogoCarousel({
  className,
  disableLinks,
  variant = "muted",
  slots,
}: {
  className?: string;
  disableLinks?: boolean;
  variant?: CarouselVariant;
  /** Logos per round on every breakpoint (overrides responsive counting). */
  slots?: number;
}) {
  const allLoaded = useImagesPreloaded(LOGO_SRCS);
  const responsiveSlots = useSlotCount();
  const slotCount = Math.min(LOGOS.length, slots ?? responsiveSlots);

  const rounds = useMemo(
    () =>
      Array.from({ length: Math.ceil(LOGOS.length / slotCount) }, (_, i) =>
        LOGOS.slice(i * slotCount, (i + 1) * slotCount),
      ),
    [slotCount],
  );

  // One scale for every round: the widest row, gaps included, spans 100cqw.
  const unit = useMemo(() => {
    const widest = Math.max(
      ...rounds.map(
        (round) =>
          round.reduce((sum, l) => sum + l.width, 0) + GAP * (round.length - 1),
      ),
    );
    return 100 / widest;
  }, [rounds]);
  // Rows share one height — the tallest box in the set — so the row never
  // moves when a round with shorter marks takes over.
  const rowHeight = Math.max(...LOGOS.map((l) => l.height)) * unit;

  const step = useCycle(allLoaded && rounds.length > 1);
  const round = step % rounds.length;

  return (
    <motion.div
      role="region"
      aria-roledescription="carousel"
      aria-label="Companies we've partnered with"
      initial={{ opacity: 0 }}
      animate={{ opacity: allLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // The query container: cqw resolves against this box, so it needs a
      // definite width from its parent. Rows shrink-wrap their logos and this
      // flex box positions them, which is what makes `justify-*` work.
      className={cn(
        "relative flex w-full justify-center [container-type:inline-size]",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={round}
          variants={rowVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex items-center"
          style={{
            columnGap: `${(GAP * unit).toFixed(3)}cqw`,
            height: `${rowHeight.toFixed(3)}cqw`,
          }}
        >
          {rounds[round].map((logo) => (
            <Slide
              key={logo.name}
              logo={logo}
              unit={unit}
              disableLinks={disableLinks}
              variant={variant}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
