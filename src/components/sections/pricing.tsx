"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2Icon, CheckCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";

const Pricing = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#101010" },
          dark: { "cal-brand": "#101010" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="flex w-full flex-col gap-10 pb-16 px-5 md:px-12 lg:px-24 xl:px-32">
      <motion.p
        initial={{ filter: "blur(10px)", y: -20 }}
        whileInView={{ filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-6xl font-medium tracking-tight max-w-4xl"
      >
        Simple ways to work with
      </motion.p>
      <div className="flex flex-col lg:flex-row lg:items-end w-full gap-5">
        <motion.div
          initial={{ filter: "blur(10px)", y: -20 }}
          whileInView={{ filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="flex w-full h-[23rem] bg-[#101010] rounded-3xl p-6 flex-col gap-8"
        >
          <div className="flex flex-col gap-1">
            <p className="text-white text-3xl font-medium">Partnership</p>
            <p className="text-white/80 text-base">For ongoing support</p>
          </div>
          <div className="flex flex-col gap-1 h-full">
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-white w-4 h-4" />
              <p className="text-white font-medium">
                No meetings (if preferred)
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-white w-4 h-4" />
              <p className="text-white font-medium">Updates every 48hour</p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-white w-4 h-4" />
              <p className="text-white font-medium">No code development</p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-white w-4 h-4" />
              <p className="text-white font-medium">Private Slack channel</p>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-0">
              <p className="font-medium text-white">Starting at</p>
              <p className="text-3xl font-medium text-white">$4k/mo</p>
            </div>
            <Link
              href={"https://cal.com/emirayaz"}
              target="_blank"
              className=""
            >
              <Button className="bg-white text-black hover:bg-white/80 cursor-pointer">
                Book a call
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ filter: "blur(10px)", y: -20 }}
          whileInView={{ filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="flex w-full h-[21rem] border border-border shadow-xs rounded-3xl p-6 flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <p className="text-foreground text-3xl font-medium">Sprint</p>
            <p className="text-muted-foreground text-base">
              For one-time projects
            </p>
          </div>
          <div className="flex flex-col gap-1 h-full">
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-foreground w-4 h-4" />
              <p className="text-foreground font-medium">
                Custom / no-code development
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-foreground w-4 h-4" />
              <p className="text-foreground font-medium">
                Clear scope, fixed timeline
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-foreground w-4 h-4" />
              <p className="text-foreground font-medium">
                Multiple concept rounds
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <CheckCircle2Icon className="text-foreground w-4 h-4" />
              <p className="text-foreground font-medium">
                Private Slack channel
              </p>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-0">
              <p className="font-medium text-foreground">Starting at</p>
              <p className="text-3xl font-medium text-foreground">$3k</p>
            </div>
            <Link href={"https://cal.com/emirayaz"} target="_blank">
              <Button className="cursor-pointer">Book a call</Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="w-full">
        <Cal
          namespace="30min"
          calLink="emirayaz/30min"
          config={{ layout: "month_view", theme: "light" }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Pricing;
