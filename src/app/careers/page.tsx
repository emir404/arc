import type { Metadata } from "next";

import SiteFooter from "@/components/sections/site-footer";
import ApplicationForm from "./application-form";

export const metadata: Metadata = {
  title: "Design at Arc",
  description:
    "We are a small studio shipping brand, web, and product design for AI startups. Applications are reviewed directly by the founders.",
};

const roleCovers = [
  "Brand identity",
  "Marketing sites",
  "Product UI",
  "Occasional front-end in Next.js and Tailwind",
];

const howWeWork = ["30-day sprints", "Small team", "Direct client contact"];

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      <section className="px-5 md:px-12 lg:px-24 xl:px-32 pt-12 pb-20">
        <div className="mx-auto w-full max-w-[640px]">
          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-black text-balance">
            Design at Arc
          </h1>
          <p className="mt-5 max-w-prose text-lg font-light leading-[1.5] text-black/70 text-pretty">
            We are a small studio shipping brand, web, and product design for AI
            startups. Applications are reviewed directly by the founders. Show
            us taste, not volume.
          </p>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <section>
              <h2 className="text-lg font-medium tracking-tight text-black">
                What the role covers
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {roleCovers.map((item) => (
                  <li
                    key={item}
                    className="text-base font-light leading-[1.5] text-black/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium tracking-tight text-black">
                How we work
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {howWeWork.map((item) => (
                  <li
                    key={item}
                    className="text-base font-light leading-[1.5] text-black/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-16 border-t pt-12">
            <h2 className="text-2xl font-medium tracking-tight text-black">
              Apply
            </h2>
            <p className="mt-3 text-base font-light leading-[1.5] text-black/60">
              A few questions. Required fields are marked with an asterisk.
            </p>
            <div className="mt-8">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
