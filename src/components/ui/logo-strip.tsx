"use client";

import { motion } from "motion/react";
import Image from "next/image";

const BRANDS = [
  { name: "Sim", src: "/brands/sim.svg", width: 74, height: 36, displayHeight: 25 },
  { name: "Lantern", src: "/brands/lantern.svg", width: 120, height: 26, displayHeight: 28 },
  { name: "Langbase", src: "/brands/langbase.svg", width: 130, height: 26, displayHeight: 28 },
  { name: "AgentMail", src: "/brands/agentmail.svg", width: 140, height: 26, displayHeight: 28 },
  { name: "Databuddy", src: "/brands/databuddy.svg", width: 120, height: 28, displayHeight: 32 },
  { name: "Fontface", src: "/brands/fontface.svg", width: 110, height: 26, displayHeight: 28 },
  { name: "Parrychain", src: "/brands/parrychain.svg", width: 130, height: 16, displayHeight: 20 },
  { name: "Tier-1", src: "/brands/tier-1.svg", width: 97, height: 24, displayHeight: 24 },
];

const LogoStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-7"
    >
      {BRANDS.map((brand) => (
        <Image
          key={brand.name}
          src={brand.src}
          alt={brand.name}
          width={brand.width}
          height={brand.height}
          className="brightness-0 opacity-30 w-auto"
          style={{ height: brand.displayHeight }}
          draggable={false}
        />
      ))}
    </motion.div>
  );
};

export default LogoStrip;
