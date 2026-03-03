"use client";

import { motion } from "motion/react";
import Link from "next/link";
import LogoStrip from "@/components/ui/logo-strip";

const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-5 px-5 md:px-12 lg:px-24 xl:px-32 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-[26px] font-[550] tracking-[-0.24px] text-center will-change-[filter] backface-hidden"
      >
        All-in-one design studio for early-stage startups
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="flex flex-col gap-5 max-w-[400px] text-center text-lg font-light text-black/75 leading-[1.4] will-change-[filter] backface-hidden"
      >
        <p>
          For teams moving fast and building with intent. We combine direction, product thinking, design, and development into one focused partnership.
        </p>
        <p>
          From defining what to build to designing and shipping it properly, we work closely with founders to turn early ideas into clear, scalable products built for real traction and long-term growth.
        </p>
        <p>
          Starting from{" "}
          <span className="font-medium text-black">$4,491/month</span>{" "}
          including strategy, design, development.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="flex items-center gap-3 mt-5 will-change-[filter] backface-hidden"
      >
        <Link
          href="https://cal.com/emirayaz"
          target="_blank"
          className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 text-base font-light transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Book a call
        </Link>
        <Link
          href="https://t.me/emirthedev"
          target="_blank"
          className="inline-flex items-center justify-center rounded-full bg-[#f6f6f6] text-black px-5 py-2.5 text-base font-light transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-ring"
        >
          Send a message
        </Link>
      </motion.div>

      <div className="mt-11">
        <LogoStrip />
      </div>
    </section>
  );
};

export default Hero;
