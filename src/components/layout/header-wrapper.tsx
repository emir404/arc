"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  // The homepage hero renders its own header inside the blue banner.
  if (pathname === "/") return null;
  return <Header />;
};

export default HeaderWrapper;
