"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  // The homepage hero renders its own header inside the blue banner;
  // the admin panel has its own chrome.
  if (pathname === "/" || pathname.startsWith("/admin")) return null;
  return <Header />;
};

export default HeaderWrapper;
