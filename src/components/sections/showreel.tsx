"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EASE } from "@/lib/animation";
import { SHOWREEL_IMAGES } from "@/lib/projects";

// One representative design per company, in the order they appear in works.
const IMAGE_LINKS = SHOWREEL_IMAGES;

type ShowreelProps = {
  compact?: boolean;
  link?: string | null;
  linkTitle?: string;
  buttonTitle?: string;
  /** Tailwind background class for the frame (e.g. "bg-transparent"). */
  background?: string;
  /** Delay before the reel fades in; lets a parent reveal finish first. */
  revealDelay?: number;
};

const Showreel = ({
  compact = false,
  link = "/works",
  linkTitle = "View works",
  buttonTitle = "Preview",
  background = "bg-[#f9f9f9]",
  revealDelay = 0.6,
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
    "flex items-center justify-center relative",
    background,
    compact
      ? "w-full h-full p-4 md:p-6 lg:p-8 xl:p-10"
      : "h-96 md:h-[64rem] md:p-12 lg:p-16 xl:p-24",
  ]
    .filter(Boolean)
    .join(" ");
  const interactiveClassName =
    `${baseClassName} ${isHovering ? "cursor-none" : ""}`.trim();

  const content = (
    <div className="relative flex h-full w-full items-center justify-center [container-type:size]">
      {/* Reel images are 5760×4096 (45:32). This wrapper contain-fits that
          exact ratio, so the corner radius hugs the visible bitmap instead
          of a letterboxed element edge. 140.625cqh = 100cqh × 45/32. */}
      <div className="relative aspect-[45/32] w-[min(100%,140.625cqh)]">
        {IMAGE_LINKS.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Showreel image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            draggable={false}
            className={`rounded-2xl object-contain [filter:drop-shadow(0_1px_2px_rgba(3,22,47,0.06))_drop-shadow(0_12px_32px_rgba(3,22,47,0.12))] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: revealDelay }}
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
            onClick={() => setIsHovering(false)}
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
