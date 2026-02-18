"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CursorProps {
  x: number;
  y: number;
  name: string;
  color: string;
}

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };

export function Cursor({ x, y, name, color }: CursorProps) {
  const motionX = useMotionValue(x);
  const motionY = useMotionValue(y);
  const smoothX = useSpring(motionX, SPRING);
  const smoothY = useSpring(motionY, SPRING);

  useEffect(() => {
    motionX.set(x);
    motionY.set(y);
  }, [x, y, motionX, motionY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-[9999]"
      style={{ x: smoothX, y: smoothY }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* Pointer SVG */}
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        <path
          d="M0.928 0.32L15.168 10.688C15.552 10.944 15.344 11.552 14.88 11.552H8.256L4.704 19.264C4.544 19.616 4.064 19.616 3.904 19.264L0.352 11.552L0.128 0.832C0.112 0.512 0.608 0.096 0.928 0.32Z"
          fill={color}
        />
        <path
          d="M0.928 0.32L15.168 10.688C15.552 10.944 15.344 11.552 14.88 11.552H8.256L4.704 19.264C4.544 19.616 4.064 19.616 3.904 19.264L0.352 11.552L0.128 0.832C0.112 0.512 0.608 0.096 0.928 0.32Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Name label */}
      <div
        className="ml-3 mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap shadow-sm"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </motion.div>
  );
}
