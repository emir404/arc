"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveCursors } from "./live-cursors";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

export function LiveCursorsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (!PUBLIC_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[LiveCursors] Missing NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY — cursors disabled",
      );
    }
    return <>{children}</>;
  }

  const roomId = `arc:${pathname === "/" ? "home" : pathname.slice(1)}`;

  return (
    <LiveblocksProvider publicApiKey={PUBLIC_KEY} throttle={16}>
      <RoomProvider
        key={roomId}
        id={roomId}
        initialPresence={{ cursor: null, name: "", color: "" }}
      >
        <ClientSideSuspense fallback={null}>
          <LiveCursors />
        </ClientSideSuspense>
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
