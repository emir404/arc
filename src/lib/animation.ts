import type { MotionProps } from "motion/react";

type Ease = [number, number, number, number];

/** Shared easing: decisive start, silky settle (easeOutExpo family). */
export const EASE: Ease = [0.16, 1, 0.3, 1];

const HIDDEN = { opacity: 0, y: 20, filter: "blur(10px)" };
const VISIBLE = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Blur-rise on mount, for above-the-fold content.
 * Pair with `will-change-[filter] backface-hidden` on the element.
 */
export const riseIn = (delay = 0): MotionProps => ({
  initial: HIDDEN,
  animate: VISIBLE,
  transition: { duration: 0.7, ease: EASE, delay },
});

/** Blur-rise when scrolled into view; runs once. */
export const riseInView = (delay = 0): MotionProps => ({
  initial: HIDDEN,
  whileInView: VISIBLE,
  viewport: { once: true, margin: "-64px" },
  transition: { duration: 0.7, ease: EASE, delay },
});
