"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import {
  useOthers,
  useUpdateMyPresence,
} from "@liveblocks/react/suspense";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { Cursor } from "./cursor";
import { useCursorIdentity } from "./use-cursor-identity";

export function LiveCursors() {
  const { name, color } = useCursorIdentity();
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Detect pointer: fine (skip cursors on touch-only devices)
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Send identity once available
  useEffect(() => {
    if (name && color) {
      updateMyPresence({ name, color });
    }
  }, [name, color, updateMyPresence]);

  // Throttled pointer tracking (page-relative coords)
  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateMyPresence({
          cursor: {
            x: e.clientX + window.scrollX,
            y: e.clientY + window.scrollY,
          },
        });
      });
    },
    [updateMyPresence],
  );

  const onPointerLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    updateMyPresence({ cursor: null });
  }, [updateMyPresence]);

  useEffect(() => {
    if (!isFinePointer) return;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isFinePointer, onPointerMove, onPointerLeave]);

  if (!isFinePointer) return null;

  return (
    <AnimatePresence>
      {others.map(({ connectionId, presence }) => {
        if (!presence.cursor) return null;
        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            name={presence.name || "Anonymous"}
            color={presence.color || "#7986CB"}
          />
        );
      })}
    </AnimatePresence>
  );
}
