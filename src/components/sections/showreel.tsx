"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { motion } from "motion/react";

const IMAGE_LINKS = [
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w36URyDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wOqI2ETkCmxdvfqiDUQANc63RleuKp0a1ygHt",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wmo2TwcaI0TuRiKvWN36gjOJDhEzkplXCmeAY",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wEwPxiMqhFvnVqJMwHyLro5RN9sWceEY6Dgpl",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wCLBrHN02g0NPOiTH8EVzMJdeZDkqQ5hlp9uf",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wrx0Z3MnFtc80pzOYxZ3yevLma4hXGJluCH9i",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wBIBmaGlvQ6EnK4ZYi1eOC2y9IVwq0JdcbWBS",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w1Rsybv6xglOBVtHY5mXKeI3TMDawiLuErfNZ",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wzcVZxM1pfMwZhC4cjWIA8mLPTOJias9FulD3",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w4UQS1ed5YfAKtoRjdOaDVs1c9Fnql80rEx3B",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wdQY0JGCEtBUvonjplAG039xzaROYHSZCwWbN",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w3ko5lDDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpm",
];

const Showreel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGE_LINKS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ filter: "blur(10px)", y: -20 }}
      animate={{ filter: "none", y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="flex flex-col w-full p-4 mb-16"
    >
      <div className="h-96 md:p-12 lg:p-16 xl:p-24 md:h-[64rem] items-center justify-center flex items-center justify-center bg-[#f9f9f9]">
        <div className="relative w-full h-full overflow-hidden">
          {IMAGE_LINKS.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Showreel image ${index + 1}`}
              fill
              draggable={false}
              className={`object-contain ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Showreel;
