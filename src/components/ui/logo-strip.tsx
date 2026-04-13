"use client";

import { motion } from "motion/react";
import Image from "next/image";

const BRANDS = [
  { name: "Sim", src: "/brands/sim.svg", width: 74, height: 36, displayHeight: 25, url: "https://sim.ai" },
  { name: "Lantern", src: "/brands/lantern.svg", width: 120, height: 26, displayHeight: 28, url: "https://withlantern.com" },
  { name: "Langbase", src: "/brands/langbase.svg", width: 130, height: 26, displayHeight: 28, url: "https://langbase.com" },
  { name: "AgentMail", src: "/brands/agentmail.svg", width: 140, height: 26, displayHeight: 28, url: "https://agentmail.to" },
  { name: "Orchid", src: "/brands/orchid.svg", width: 133, height: 32, displayHeight: 30, url: "https://orchid.ai" },
  { name: "Vetted", src: "/brands/vetted.svg", width: 177, height: 33, displayHeight: 24, url: "https://waitlist.vetted.cv" },
  { name: "Databuddy", src: "/brands/databuddy.svg", width: 120, height: 28, displayHeight: 32, url: "https://databuddy.cc" },
  { name: "Fontface", src: "/brands/fontface.svg", width: 110, height: 26, displayHeight: 28, url: "https://fontface.ai" },
  { name: "Parrychain", src: "/brands/parrychain.svg", width: 130, height: 16, displayHeight: 20, url: "https://parrychain.ai" },
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
        <a
          key={brand.name}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
        >
          <Image
            src={brand.src}
            alt={brand.name}
            width={brand.width}
            height={brand.height}
            className="brightness-0 opacity-30 w-auto"
            style={{ height: brand.displayHeight }}
            draggable={false}
          />
        </a>
      ))}
    </motion.div>
  );
};

export default LogoStrip;
