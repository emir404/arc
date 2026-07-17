"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useId, useRef } from "react";
import { riseInView } from "@/lib/animation";
import { cn } from "@/lib/utils";

/**
 * Arc mark geometry, lifted from Figma (node 3:4222).
 *
 * Figma exports the curve as a filled outline of the stroke; ARC is its
 * reconstructed centerline so the curve can be drawn with `pathLength`. Both
 * marks sit exactly on its endpoints.
 *
 * Coordinates live in a 62.2629 x 60 viewBox whose 50.263 x 48 content box
 * starts at (6, 3); the surrounding margin is glow bleed.
 */
const ARC =
  "M10.1122 47.0853C7.71191 37.2269 6.51175 29.1571 6.72178 22.7665C6.93182 16.376 8.55202 11.6649 11.7925 8.52417C15.0329 5.38345 19.8935 3.81309 26.5844 3.70404C33.2753 3.59497 41.7963 4.94722 52.3577 7.65173";
const ARC_WEIGHT = 1.396;

const ORIGIN = "M11.066 51L14.0298 46.1319L9.15938 43.1695L6.19553 48.0376Z";
const ORIGIN_EDGE =
  "M13.5139 46.2574L10.9397 50.4839L6.71115 47.9117L9.2844 43.6841Z";
const TARGET =
  "M56.2629 8.65132L53.3585 3.74779L48.4524 6.65117L51.3572 11.5547Z";
const TARGET_EDGE =
  "M55.7493 8.51927L51.4885 11.0408L48.9661 6.78294L53.2259 4.26048Z";

/** Unlit: a path not yet travelled, a destination not yet reached. */
const DIM = "#E5E5E5";
const LIT = "#006CF5";
const LIT_EDGE = "#0A76FF";

type Trait = {
  title: string;
  body: string;
  /** The three marks are one arc mid-journey: the path lights up on the second
   *  card, the destination on the third. */
  litPath: boolean;
  litTarget: boolean;
  /** Figma steps each card down 117px, tracing the arc across the section. */
  stagger: string;
};

const TRAITS: Trait[] = [
  {
    title: "One team, not three",
    body: "Brand, website, and product design in a single engagement. No stitching together freelancers or briefing an agency for a month. You brief once and get the whole thing back.",
    litPath: false,
    litTarget: false,
    stagger: "lg:mt-0",
  },
  {
    title: "Shipped in weeks",
    body: "Focused 30-day sprints, scoped to what matters before your launch or your raise. Fast, never sloppy. You end the month with something live, not a deck of options.",
    litPath: true,
    litTarget: false,
    stagger: "lg:mt-[117px]",
  },
  {
    title: "Look like a company",
    body: "We work with early-stage teams that need to look as serious as they are. The kind of polish that earns trust from customers and investors before you have the traction…",
    litPath: true,
    litTarget: true,
    stagger: "lg:mt-[234px]",
  },
];

const ArcMark = ({
  progress,
  litPath,
  litTarget,
}: {
  progress: MotionValue<number>;
  litPath: boolean;
  litTarget: boolean;
}) => {
  const glow = `arc-glow-${useId().replace(/:/g, "")}`;

  // The origin pops first, the curve grows out of it, the target lands last.
  const originScale = useTransform(progress, [0, 0.12], [0, 1]);
  const arrival = useTransform(progress, [0.86, 1], [0, 1]);

  return (
    <span className="relative block h-12 w-[50.263px]">
      <svg
        aria-hidden="true"
        className="absolute -left-1.5 -top-[3px] block"
        width="62.2629"
        height="60"
        viewBox="0 0 62.2629 60"
        fill="none"
      >
        <defs>
          {/* Figma: 3px/10% ambient drop plus a #0A76FF inner glow. */}
          <filter
            id={glow}
            x="-250%"
            y="-250%"
            width="600%"
            height="600%"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="backdrop" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0111415 0 0 0 0 0.0875151 0 0 0 0 0.184396 0 0 0 0.1 0"
            />
            <feBlend mode="normal" in2="backdrop" result="drop" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="drop"
              result="body"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-3" />
            <feGaussianBlur stdDeviation="9" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0392157 0 0 0 0 0.462745 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="body" />
          </filter>
        </defs>

        {/* Destination, visible but unreached */}
        <path d={TARGET} fill={DIM} />

        <motion.path
          d={ARC}
          stroke={litPath ? LIT : DIM}
          strokeWidth={ARC_WEIGHT}
          style={{ pathLength: progress }}
        />

        {/* Origin: always lit; every card starts from somewhere */}
        <motion.g
          filter={`url(#${glow})`}
          style={{
            scale: originScale,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        >
          <path d={ORIGIN} fill={LIT} />
          <path d={ORIGIN_EDGE} stroke={LIT_EDGE} strokeWidth="0.75" />
        </motion.g>

        {/* Arrival: lands as the curve closes the distance */}
        {litTarget && (
          <motion.g filter={`url(#${glow})`} style={{ opacity: arrival }}>
            <path d={TARGET} fill={LIT} />
            <path d={TARGET_EDGE} stroke={LIT_EDGE} strokeWidth="0.75" />
          </motion.g>
        )}
      </svg>
    </span>
  );
};

const TraitCard = ({ trait }: { trait: Trait }) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();

  // Each card draws its own arc off its own travel through the viewport, so the
  // staggered layout hands them off one after another as you scroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const scrolled = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const settled = useMotionValue(1);

  // Reduced motion resolves here rather than at each `style`, so both branches
  // stay MotionValues. That matters: motion only scrapes plain numbers out of
  // `style` for "forced" values like scale, so a literal 1 on `pathLength` is
  // dropped, stranding the arc at the server-rendered 0 and erasing it.
  const progress = reduced ? settled : scrolled;

  // max-w is inert at the 1440 design width (columns are 373px) and only bites
  // past it, holding the measure readable as the columns stretch.
  return (
    <li
      ref={ref}
      className={cn("flex max-w-[420px] flex-col gap-8", trait.stagger)}
    >
      <ArcMark
        progress={progress}
        litPath={trait.litPath}
        litTarget={trait.litTarget}
      />
      <motion.div
        {...riseInView()}
        className="flex flex-col gap-3 text-black/75 will-change-[filter] backface-hidden"
      >
        <h3 className="text-lg font-[450] leading-[1.4]">{trait.title}</h3>
        <p className="text-pretty text-sm font-light leading-[1.4]">
          {trait.body}
        </p>
      </motion.div>
    </li>
  );
};

const DefinesArc = () => {
  return (
    <section className="bg-white px-5 py-28 md:px-12 lg:px-24">
      <motion.h2
        id="what-defines-arc"
        {...riseInView()}
        className="scroll-mt-24 text-[32px] font-semibold leading-none tracking-[-0.03em] text-black will-change-[filter] backface-hidden sm:text-[40px]"
      >
        What defines Arc?
      </motion.h2>

      <ul className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-x-16">
        {TRAITS.map((trait) => (
          <TraitCard key={trait.title} trait={trait} />
        ))}
      </ul>
    </section>
  );
};

export default DefinesArc;
