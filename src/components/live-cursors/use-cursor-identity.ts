"use client";

import { useState, useEffect } from "react";
import { CURSOR_NAMES, CURSOR_COLORS } from "./cursor-names";

const STORAGE_KEY = "arc-cursor-identity";

interface CursorIdentity {
  name: string;
  color: string;
}

function generateIdentity(): CursorIdentity {
  return {
    name: CURSOR_NAMES[Math.floor(Math.random() * CURSOR_NAMES.length)],
    color: CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)],
  };
}

export function useCursorIdentity(): CursorIdentity {
  const [identity, setIdentity] = useState<CursorIdentity>({
    name: "",
    color: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIdentity(JSON.parse(stored));
      return;
    }
    const newIdentity = generateIdentity();
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity));
    setIdentity(newIdentity);
  }, []);

  return identity;
}
