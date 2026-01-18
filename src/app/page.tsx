import React from "react";

import Hero from "@/components/sections/hero";
import Showreel from "@/components/sections/showreel";
import About from "@/components/sections/about";
import Pricing from "@/components/sections/pricing";

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
