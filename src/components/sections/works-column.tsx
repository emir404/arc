"use client";

import { motion } from "motion/react";
import WorkFrame from "@/components/works/work-frame";
import { riseInView } from "@/lib/animation";
import { firstImage, type Project } from "@/lib/projects";

/* At lg the rail takes 460px and the column keeps a 40px gutter of its own. */
const SIZES = "(max-width: 1023px) 100vw, calc(100vw - 500px)";

/**
 * A run of published designs, in full — no cover shots and no per-project page
 * to open. The column breaks the works into several runs with other sections
 * between them; every run answers to the same nav pill via `data-nav`.
 */
const WorksColumn = ({
  projects,
  lead = false,
}: {
  projects: Project[];
  /** The run that opens the page: it owns the `#works` anchor and the heading. */
  lead?: boolean;
}) => {
  return (
    <section
      id={lead ? "works" : undefined}
      aria-labelledby={lead ? "works-heading" : undefined}
      aria-label={lead ? undefined : "Works, continued"}
      data-nav="works"
      className="flex flex-col gap-2"
    >
      {lead && (
        <h2 id="works-heading" className="sr-only">
          Works
        </h2>
      )}
      {projects.map((project, projectIndex) => (
        <article
          key={project.name}
          aria-label={`${project.name} — ${project.description}, ${project.year}`}
          className="flex flex-col gap-2"
        >
          {project.images.map((frame, i) => {
            const opens = lead && projectIndex === 0 && i === 0;

            return (
              <motion.div
                key={firstImage(frame).src}
                {...riseInView(opens ? 0.32 : 0)}
                className="backface-hidden will-change-[filter]"
              >
                <WorkFrame
                  frame={frame}
                  alt={
                    i === 0 ? `${project.name} — ${project.description}` : ""
                  }
                  eager={opens}
                  sizes={SIZES}
                  className="rounded-[12px] bg-[#f6f6f6]"
                />
              </motion.div>
            );
          })}
        </article>
      ))}
    </section>
  );
};

export default WorksColumn;
