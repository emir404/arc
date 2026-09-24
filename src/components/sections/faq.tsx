"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { EASE } from "@/lib/animation";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "What kind of teams do you work with?",
    answer:
      "Early-stage startups building real products. Small, ambitious teams that care about clarity, craft, and long-term value. If you\u2019re serious about what you\u2019re building, we\u2019ll get along.",
  },
  {
    question: "What exactly do you help with?",
    answer:
      "Product direction, UX/UI design, design systems, landing pages, and development. From early thinking to shipped outcomes, all in one place.",
  },
  {
    question: "Are you just a design studio?",
    answer:
      "No. We act as a product partner. We help define what to build, not just how it looks. Then we design it and develop what actually ships.",
  },
  {
    question: "How involved are you in the process?",
    answer:
      "You'll get direct work from me, not anyone else. I align on direction, challenge assumptions, refine scope, and move fast. Expect honest feedback and structured thinking, not surface-level output.",
  },
  {
    question: "Can you collaborate with our engineers?",
    answer:
      "Yes. We work closely with internal teams or handle development ourselves. Clean handoff, or fully built and production-ready. Your choice.",
  },
  {
    question: "What does working together look like?",
    answer:
      "Focused, async-friendly, and momentum-driven. Clear milestones, tight feedback loops, steady progress. No chaos, no endless back-and-forth.",
  },
  {
    question: "How fast can we move?",
    answer:
      "It depends on scope, but we prioritize speed without sacrificing clarity. Early-stage teams move fast. So do we.",
  },
  {
    question: "Is this a long-term commitment?",
    answer:
      "Not necessarily. Some teams work with us for a specific phase. Others stay longer-term as their product evolves. It\u2019s structured, but flexible.",
  },
  {
    question: "What\u2019s your refund policy?",
    answer:
      "The partnership model is non-refundable. It\u2019s built to be flexible, though \u2014 you can pause anytime and use whatever time is left whenever you\u2019re ready to pick things back up.",
  },
  {
    question: "What if we\u2019re still figuring things out?",
    answer:
      "That\u2019s normal. Early-stage is messy. We help bring structure to ambiguity and turn loose ideas into clear product direction.",
  },
];

const PANEL = { duration: 0.32, ease: EASE } as const;

/** Plus turns into minus: the vertical bar swings out as the dash swings in. */
const Toggle = ({ open }: { open: boolean }) => (
  <span className="relative block size-5 shrink-0" aria-hidden>
    <motion.span
      className="absolute inset-0 text-black"
      animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
      transition={PANEL}
    >
      <PlusIcon />
    </motion.span>
    <motion.span
      className="absolute inset-0 text-black/40"
      animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : -90 }}
      transition={PANEL}
    >
      <MinusIcon />
    </motion.span>
  </span>
);

const Faq = () => {
  // The first answer is open on arrival, as in the design — a column of shut
  // rows gives a reader nothing to read.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" data-nav="faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="sr-only">
        About Arc
      </h2>
      <ul className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => {
          const open = openIndex === i;

          return (
            <li key={item.question} className="flex flex-col">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  id={`faq-trigger-${i}`}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className={cn(
                    "flex w-full touch-manipulation items-center justify-between gap-4 rounded-[12px] px-4 py-3 text-left transition-colors duration-200",
                    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                    open ? "bg-black/5" : "bg-[#f6f6f6] hover:bg-[#ededed]",
                  )}
                >
                  <span className="text-base leading-[1.1] font-medium tracking-[-0.02em] text-black">
                    {item.question}
                  </span>
                  <Toggle open={open} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.section
                    id={`faq-panel-${i}`}
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                    transition={PANEL}
                    className="overflow-hidden backface-hidden will-change-[filter]"
                  >
                    {/* The 6px gap rides inside the panel so it opens and
                        closes with it instead of snapping. */}
                    <div className="pt-1.5">
                      <p className="rounded-[12px] bg-black/5 px-4 py-3 text-sm leading-[1.3] tracking-[0.03em] text-pretty text-black/75">
                        {item.answer}
                      </p>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Faq;
