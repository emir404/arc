import React from "react";
import type { Metadata } from "next";

import Hero from "@/components/sections/hero";
import Showreel from "@/components/sections/showreel";
import About from "@/components/sections/about";
import Pricing from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Arc \u2022 Creative Studio",
  description:
    "Arc is a global Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
};

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Showreel />
      <About />
      <Pricing />
    </div>
  );
};

export default Home;
