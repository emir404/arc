"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, AnimatePresence } from "motion/react";

const IMAGE_LINKS = [
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w36URyDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
  "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wtc1hUFMYZjvNFCAUWr1ncwPQR7T4hm8pI5kV",
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
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGE_LINKS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex flex-col w-full p-4 mb-16 will-change-[filter] backface-hidden"
      >
        <Link
          href="/works"
          ref={containerRef}
          onMouseEnter={(e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setIsHovering(true);
          }}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          className="h-96 md:p-12 lg:p-16 xl:p-24 md:h-[64rem] items-center justify-center flex items-center justify-center bg-[#f9f9f9] relative"
          style={{ cursor: isHovering ? "none" : undefined }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
            className="flex rounded-full px-3 py-1.5 bg-black items-center justify-center absolute top-8 left-1/2 translate-x-[-50%] will-change-[filter] backface-hidden"
          >
            <span className="relative flex size-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <p className="text-sm font-mono uppercase text-white">
              2 SLOTS AVAILABLE FOR PARTNERSHIP
            </p>
          </motion.div>
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
        </Link>
      </motion.div>

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              filter: "blur(4px)",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              x: "-50%",
              y: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              filter: "blur(4px)",
              x: "-50%",
              y: "-50%",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          >
            View works
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Showreel;
