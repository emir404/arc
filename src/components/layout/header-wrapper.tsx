"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

const HeaderWrapper = () => {
  const pathname = usePathname();
  return <Header minimal={pathname === "/"} />;
};

export default HeaderWrapper;
