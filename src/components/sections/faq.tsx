"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="flex flex-col items-center px-5 md:px-12 lg:px-24 xl:px-32 py-16">
      <div className="flex flex-col w-full max-w-[400px]">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-b border-black/10 will-change-[filter] backface-hidden"
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
              className="w-full py-5 text-center text-balance font-normal text-black text-lg leading-[1.4] cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-ring"
            >
              {item.question}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 font-light text-black/75 text-lg text-center text-pretty leading-[1.4]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
