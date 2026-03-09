"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

type ShowreelProps = {
  compact?: boolean;
  link?: string | null;
  linkTitle?: string;
  buttonTitle?: string;
};

const Showreel = ({
  compact = false,
  link = "/works",
  linkTitle = "View works",
  buttonTitle = "Preview",
}: ShowreelProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGE_LINKS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovering]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isHovering) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!isInside) setIsHovering(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [isHovering]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const baseClassName = [
    "flex items-center justify-center bg-[#f9f9f9] relative",
    compact
      ? "w-full h-full p-4 md:p-6 lg:p-8 xl:p-10"
      : "h-96 md:h-[64rem] md:p-12 lg:p-16 xl:p-24",
  ]
    .filter(Boolean)
    .join(" ");
  const interactiveClassName =
    `${baseClassName} ${isHovering ? "cursor-none" : ""}`.trim();

  const content = (
    <div className="relative w-full h-full overflow-hidden">
      {IMAGE_LINKS.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Showreel image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          draggable={false}
          className={`object-contain ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className={`flex flex-col w-full will-change-[filter] backface-hidden ${
          compact ? "h-full p-0 mb-0" : "p-4 mb-16"
        }`}
      >
        {link ? (
          <Link
            href={link}
            ref={containerRef as React.RefObject<HTMLAnchorElement>}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            className={interactiveClassName}
          >
            {content}
          </Link>
        ) : (
          <button
            type="button"
            aria-label={buttonTitle}
            ref={containerRef as React.RefObject<HTMLButtonElement>}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            className={`appearance-none border-0 ${interactiveClassName}`}
          >
            {content}
          </button>
        )}
      </motion.div>

      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white will-change-transform"
                  style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    translate: "-50% -50%",
                  }}
                >
                  {link ? linkTitle : buttonTitle}
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
};

export default Showreel;
