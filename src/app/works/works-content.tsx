"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useCallback } from "react";
import { PUBLISHED_PROJECTS } from "@/lib/projects";

export default function WorksContent() {
  const darkRefs = useRef<Map<number, HTMLElement>>(new Map());

  const setDarkRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      if (el) darkRefs.current.set(index, el);
      else darkRefs.current.delete(index);
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let anyDarkIntersecting = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) anyDarkIntersecting = true;
        });

        if (!anyDarkIntersecting) {
          // Check if any tracked dark section is still intersecting
          // by looking at the observer's tracked entries
          anyDarkIntersecting = false;
        }

        // We need to track all dark sections' intersection state
        // Use a data attribute approach
        entries.forEach((entry) => {
          (entry.target as HTMLElement).dataset.intersecting =
            entry.isIntersecting ? "true" : "false";
        });

        const shouldBeDark = Array.from(darkRefs.current.values()).some(
          (el) => el.dataset.intersecting === "true"
        );

        document.documentElement.classList.toggle("dark", shouldBeDark);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    darkRefs.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="flex flex-col gap-24 px-4 pt-20 pb-24 md:px-12 lg:px-24 xl:px-32">
      {PUBLISHED_PROJECTS.map((project, projectIndex) => (
        <motion.section
          key={project.name}
          ref={project.dark ? setDarkRef(projectIndex) : undefined}
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: projectIndex === 0 ? 0.2 : 0,
          }}
          className="flex flex-col gap-6 will-change-[filter] backface-hidden"
        >
          <div className="flex items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-medium">{project.name}</h2>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <span className="text-sm text-muted-foreground tabular-nums">
              {project.year}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {project.images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`${project.name} ${i + 1}`}
                width={1920}
                height={1080}
                className={`w-full h-auto rounded-2xl${
                  project.borderless ? "" : " border border-border"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
