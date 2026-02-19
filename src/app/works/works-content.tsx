"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useCallback } from "react";

const PROJECTS = [
  {
    name: "Sim",
    description: "Agent Workflow Builder",
    year: "2025",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wdQY0JGCEtBUvonjplAG039xzaROYHSZCwWbN",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w36URyDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wCLBrHN02g0NPOiTH8EVzMJdeZDkqQ5hlp9uf",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wM4Z0THopSFDV0swukhOE7I6jqTUixzNdZ3CP",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wA2LjGCiXFHyYdLri97MVlCEIpf80RoNbWOnm",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wt8TS6XMYZjvNFCAUWr1ncwPQR7T4hm8pI5kV",
    ],
  },
  {
    name: "Someone",
    description: "Email & Profile Platform",
    year: "2026",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wtc1hUFMYZjvNFCAUWr1ncwPQR7T4hm8pI5kV",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w61hDLbScFYCorPq0agZOpEhAJSzi4Ultk93f",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wuXITL7NjtsTx1g45aXMdwHmr9kb62UFJLoez",
    ],
  },
  {
    name: "AgentMail",
    description: "Email for AI Agents",
    year: "2025",
    dark: true,
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8whV9m6KUUAkFG1D3faVQ9uqT45xYKXivR6boO",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w5LTQDLt1oRY7wDTKfMrq8Sn2isyOdjuzhmc3",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w5IsQ3vt1oRY7wDTKfMrq8Sn2isyOdjuzhmc3",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wveBSEYQzr6o3qQ0XHuiJjTO9KPEfdgxUynIW",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wcMT3iMM5XwSYHFfxQrqugz251M6OZPGKCNso",
    ],
  },
];

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
      {PROJECTS.map((project, projectIndex) => (
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
                alt={`${project.name} — ${i + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto border border-border"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
