"use client";

import { motion } from "motion/react";
import { LogoCarousel } from "@/components/ui/logo-carousel";

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 pb-16 xl:flex-row xl:justify-between xl:items-end px-5 md:px-12 lg:px-24 xl:px-32">
      <motion.h1
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl lg:text-7xl xl:text-8xl max-w-3xl font-medium tracking-[-0.03em] leading-[1] will-change-[filter] backface-hidden"
      >
        Design partner for busy founders
      </motion.h1>
      <LogoCarousel />
    </div>
  );
};

export default Hero;
