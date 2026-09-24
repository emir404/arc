"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * One flat pane of backdrop blur always shows its own top edge: the blur radius
 * is constant, so masking only fades how much of an already-blurred image gets
 * composited. Stacking bands instead — each twice as blurred as the one above
 * it, each fading in and out across a quarter of the height — ramps the radius
 * itself, and the seam disappears.
 *
 * Radii double up to the 18.4px the design specifies for the bottom edge.
 */
const LAYERS = [
  { blur: 0.575, from: 0, to: 37.5 },
  { blur: 1.15, from: 12.5, to: 50 },
  { blur: 2.3, from: 25, to: 62.5 },
  { blur: 4.6, from: 37.5, to: 75 },
  { blur: 9.2, from: 50, to: 87.5 },
  { blur: 18.4, from: 62.5, to: 100 },
];

/** Transparent → opaque over the first quarter, back out over the last. */
const band = (from: number, to: number) => {
  const step = (to - from) / 4;
  return `linear-gradient(to bottom, transparent ${from}%, #000 ${from + step}%, #000 ${to - step}%, ${to >= 100 ? "#000 100%" : `transparent ${to}%`})`;
};

/** Below this much left to scroll, there is nothing to soften. */
const THRESHOLD = 24;

/**
 * Softens the column's bottom edge while there is more to scroll, and clears
 * out at the end of the page — a permanent haze over the last thing you read
 * (a footer link, a call-to-action) is just an unreadable one.
 */
const BottomScrim = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const remaining =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      setActive(remaining > THRESHOLD);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Switching views changes the page height without any scrolling.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        // Inset to the column: blurring across the rail's edge would drag white
        // over the corner of a dark design.
        "pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden h-[140px] transition-opacity duration-300 lg:left-[460px] lg:block",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      {LAYERS.map((layer) => {
        const mask = band(layer.from, layer.to);
        return (
          <div
            key={layer.blur}
            className="absolute inset-0"
            style={
              {
                backdropFilter: `blur(${layer.blur}px)`,
                WebkitBackdropFilter: `blur(${layer.blur}px)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
};

export default BottomScrim;
