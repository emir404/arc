"use client";

import { AnimatePresence, motion } from "motion/react";
import type { SVGProps } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  InfoIcon,
  SquaresIcon,
  TagIcon,
  UserGroupIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const NAV_ITEMS: {
  id: string;
  label: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
}[] = [
  { id: "works", label: "Works", Icon: SquaresIcon },
  { id: "testimonials", label: "Testimonials", Icon: UserGroupIcon },
  { id: "pricing", label: "Pricing", Icon: TagIcon },
  { id: "faq", label: "About", Icon: InfoIcon },
];

const IDS = NAV_ITEMS.map((item) => item.id);

/**
 * One spring drives the pill's geometry, its neighbours sliding over, and the
 * label — so the width and the word arrive together instead of racing.
 */
const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.9,
} as const;

/** How long a click's own answer outranks the observer, if nothing interrupts. */
const SETTLE_MS = 1200;

/**
 * The section under the reader, or the last one that was — between two sections
 * nothing crosses the line, and a pill that empties out on the way past would
 * read as a flicker.
 */
function useActiveSection() {
  const [active, setActive] = useState(IDS[0]);
  // A click names its section before the scroll has gone anywhere; the sections
  // sliding past on the way are not answers, so the observer waits its turn.
  const settleAt = useRef(0);

  useEffect(() => {
    // Keyed off `data-nav`, not ids: the works run is broken into several
    // elements by the sections between them, and they all answer to one pill.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav]"),
    );
    if (sections.length === 0) return;

    let frame = 0;

    /**
     * The last section whose top has crossed the reading line. The line sits
     * near the top of the viewport rather than the middle, so each section
     * stays current for about its own height of scrolling — at mid-viewport a
     * short one like pricing would hand over to the works behind it almost as
     * soon as you arrived.
     */
    const pick = () => {
      const line = window.innerHeight * 0.2;
      let current = IDS[0];
      for (const section of sections) {
        const nav = section.dataset.nav;
        if (nav && section.getBoundingClientRect().top <= line) current = nav;
      }
      return current;
    };

    const update = () => {
      frame = 0;
      if (Date.now() < settleAt.current) return;
      setActive(pick());
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Hand control back the moment the scroll actually lands, rather than
    // sitting out the full timeout. Not in every engine yet — hence the clock.
    const release = () => {
      settleAt.current = 0;
      schedule();
    };
    (window as EventTarget).addEventListener("scrollend", release);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      (window as EventTarget).removeEventListener("scrollend", release);
    };
  }, []);

  const claim = useCallback((id: string) => {
    setActive(id);
    settleAt.current = Date.now() + SETTLE_MS;
  }, []);

  return [active, claim] as const;
}

/**
 * Plain in-page anchors: the browser does the smooth scrolling (and honours
 * `prefers-reduced-motion` while doing it), keeps the hash, and still opens a
 * new tab on ⌘-click. The pill only jumps ahead of it.
 */
const RailNav = () => {
  const [active, claim] = useActiveSection();

  return (
    <nav aria-label="Sections">
      <ul className="flex h-9 items-center gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = id === active;

          return (
            <li key={id} className="h-full">
              <motion.a
                layout
                transition={SPRING}
                href={`#${id}`}
                onClick={() => claim(id)}
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                title={isActive ? undefined : label}
                // Inline radius so the layout animation can keep the corners
                // circular while the pill is mid-stretch.
                style={{ borderRadius: 12 }}
                className={cn(
                  // `after` widens the hit area to 44px tall without moving the
                  // 36px pill or letting neighbours' targets overlap.
                  "relative flex h-full touch-manipulation items-center justify-center overflow-hidden transition-colors duration-200",
                  "after:absolute after:-inset-x-0.5 after:-inset-y-1 after:content-['']",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isActive
                    ? "gap-1.5 bg-primary/10 pr-3 pl-2.5 text-primary hover:bg-primary/15"
                    : "w-9 bg-[#f8f8f8] text-black hover:bg-[#ececec]",
                )}
              >
                <motion.span
                  layout="position"
                  transition={SPRING}
                  className="flex shrink-0"
                >
                  <Icon className="size-[18px]" />
                </motion.span>
                {/* popLayout lifts the outgoing label out of flow, so the pill
                    can close over it instead of waiting for it to fade. */}
                <AnimatePresence initial={false} mode="popLayout">
                  {isActive && (
                    <motion.span
                      key="label"
                      layout="position"
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={SPRING}
                      className="text-base leading-none font-medium whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default RailNav;
