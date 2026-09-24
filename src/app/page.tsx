import type { Metadata, Viewport } from "next";
import { Fragment } from "react";
import Booking from "@/components/sections/booking";
import Faq from "@/components/sections/faq";
import HeroRail from "@/components/sections/hero-rail";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import WorksColumn from "@/components/sections/works-column";
import BottomScrim from "@/components/ui/bottom-scrim";
import { PUBLISHED_PROJECTS } from "@/lib/projects";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  description:
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership — trusted by 10+ Y Combinator companies.",
};

type Interlude = "testimonials" | "pricing";

/**
 * Where the other sections sit inside the works run, keyed by the project they
 * follow rather than by position. Add a work — anywhere in the list — and these
 * two stay put: a new project simply joins whichever run it lands in.
 */
const AFTER: Record<string, Interlude> = {
  Axiom: "testimonials",
  Automattic: "pricing",
};

/** The works, cut into runs at each project an interlude follows. */
const runs: { projects: typeof PUBLISHED_PROJECTS; then?: Interlude }[] = [];
let run: typeof PUBLISHED_PROJECTS = [];
for (const project of PUBLISHED_PROJECTS) {
  run.push(project);
  const then = AFTER[project.name];
  if (then) {
    runs.push({ projects: run, then });
    run = [];
  }
}
if (run.length > 0) runs.push({ projects: run });

const Home = () => {
  return (
    <div className="flex flex-col bg-white lg:flex-row lg:items-start">
      <HeroRail />
      {/* One page past the rail: the works, broken by the voices and the
          numbers, then the questions and a way to book. */}
      <div className="rail-column flex min-w-0 flex-1 flex-col gap-5 px-5 pb-10 sm:px-10 lg:py-10 lg:pr-10 lg:pl-0">
        {runs.map(({ projects, then }, index) => (
          <Fragment key={projects[0].name}>
            <WorksColumn projects={projects} lead={index === 0} />
            {then === "testimonials" && <Testimonials />}
            {then === "pricing" && <Pricing heading={false} />}
          </Fragment>
        ))}
        <Faq />
        <Booking />
      </div>
      {/* Outside the column, so its blur is never trapped by a filtered parent. */}
      <BottomScrim />
    </div>
  );
};

export default Home;
