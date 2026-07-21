"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { riseIn } from "@/lib/animation";
import type { Job } from "@/lib/careers";

const CareersList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <section className="flex flex-col items-start gap-14 bg-white px-5 py-20 md:px-12 lg:px-24">
      <motion.div
        {...riseIn()}
        className="flex flex-col items-start gap-7 will-change-[filter] backface-hidden"
      >
        <h1 className="text-[40px] font-semibold leading-none tracking-[-0.03em] text-black">
          Careers
        </h1>
        <p className="max-w-[461px] text-lg font-light leading-[1.4] text-black/75 text-pretty">
          Arc is a small studio designing brand, product, and web for
          early-stage startups, including 10+ Y&nbsp;Combinator companies. If
          you sweat the details and want your work to ship, we’d love to meet
          you.
        </p>
      </motion.div>

      {jobs.length > 0 ? (
        <motion.ul
          {...riseIn(0.08)}
          className="flex w-full max-w-[720px] flex-col border-t border-black/10 will-change-[filter] backface-hidden"
        >
          {/* border-b lives on each li: on the rounded links it would curve at the ends */}
          {jobs.map((job) => (
            <li key={job.id} className="border-b border-black/10">
              <Link
                href={`/careers/${job.slug}`}
                className="group flex items-center justify-between gap-4 rounded-sm py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-2xl font-[450] leading-[1.2] tracking-[-0.02em] text-black transition-colors duration-200 group-hover:text-primary">
                    {job.title}
                  </span>
                  <span className="text-base font-light leading-[1.4] text-black/50">
                    {job.team} · {job.location} · {job.employment_type}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 shrink-0 text-black/30 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                />
              </Link>
            </li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          {...riseIn(0.08)}
          className="flex max-w-[560px] flex-col items-start gap-6 rounded-2xl border border-black/10 bg-[#fafafa] p-6 will-change-[filter] backface-hidden md:p-8"
        >
          <p className="text-lg font-light leading-[1.4] text-black/75 text-pretty">
            No open roles right now. We still want to hear from you — introduce
            yourself and share your portfolio, and we’ll reach out when
            something opens up.
          </p>
          <Button asChild variant="secondary">
            <Link href="mailto:emir@witharc.co">Introduce yourself</Link>
          </Button>
        </motion.div>
      )}
    </section>
  );
};

export default CareersList;
