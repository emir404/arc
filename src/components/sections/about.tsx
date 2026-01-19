"use client";

import React from "react";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col gap-10 pb-16 px-5 md:px-12 lg:px-24 xl:px-32">
      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl font-medium tracking-tight max-w-4xl will-change-[filter] backface-hidden"
      >
        From ideas to brands, products, websites, and experiences.
      </motion.p>
      <div className="flex flex-col gap-6 text-xl text-muted-foreground max-w-2xl">
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="will-change-[filter] backface-hidden"
        >
          We work with{" "}
          <span className="font-medium text-foreground">small</span>,{" "}
          <span className="font-medium text-foreground">ambitious teams</span>{" "}
          building products with intent. Teams that care about what they're
          building and why it matters.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="will-change-[filter] backface-hidden"
        >
          From early direction and first sketches to real, shipped outcomes. We
          help shape ideas, define the product, and turn vision into something
          people can actually use.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="will-change-[filter] backface-hidden"
        >
          We focus on{" "}
          <span className="font-medium text-foreground">clarity</span>,{" "}
          <span className="font-medium text-foreground">craft</span>, and{" "}
          <span className="font-medium text-foreground">momentum</span> at every
          step. Clear thinking, thoughtful design, and steady execution working
          together to move products forward.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="will-change-[filter] backface-hidden"
        >
          Our clients have raised more than{" "}
          <span>
            <Tooltip>
              <TooltipTrigger className="font-medium text-foreground">
                $25M+
              </TooltipTrigger>
              <TooltipContent className="text-lg">
                Roughly 50 brand-new Porsche 911 GT3 RS
              </TooltipContent>
            </Tooltip>
          </span>
          . A reflection of strong products, clear stories, and teams that ship.
        </motion.p>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="will-change-[filter] backface-hidden"
        >
          Designed for teams building long-term value. Not just for today's
          launch, but for{" "}
          <span className="font-medium text-foreground">what comes next</span>.
        </motion.p>
      </div>
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
        className="rounded-3xl p-6 border-border border max-w-2xl gap-8 shadow-xs flex flex-col justify-between will-change-[filter] backface-hidden"
      >
        <p className="text-xl text-foreground font-medium">
          Emir is a talented designer with massive potential. He's both a
          developer and designer, making his skillset highly valuable for
          fast-moving teams.
        </p>
        <div className="flex gap-4 items-center">
          <Image
            src="https://494510hkri.ufs.sh/f/3d9AyaVNUM8wAWpSXJiXFHyYdLri97MVlCEIpf80RoNbWOnm"
            alt="Emir Karabeg"
            width={48}
            height={48}
            className="rounded-full size-10"
          />
          <div className="flex flex-col gap-0">
            <p className="leading-[1] font-medium">Emir Karabeg</p>
            <p className="text-sm text-muted-foreground">CEO, Sim (YC X25)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
