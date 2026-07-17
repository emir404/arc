"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, riseInView } from "@/lib/animation";
import { PUBLISHED_PROJECTS } from "@/lib/projects";

const backdropVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: "blur(12px)",
    transition: { duration: 0.3, ease: EASE },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Works rendered as a dialog over the current page. Mounted by the
 * intercepting route at `@modal/(.)works`; closing navigates back.
 */
const WorksOverlay = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Move focus into the dialog on open, return it to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => previouslyFocused?.focus({ preventScroll: true });
  }, []);

  // Lock page scroll behind the dialog, compensating for the scrollbar.
  useEffect(() => {
    const { style } = document.body;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = style.overflow;
    const previousPaddingRight = style.paddingRight;
    style.overflow = "hidden";
    if (scrollbarWidth > 0) style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      style.overflow = previousOverflow;
      style.paddingRight = previousPaddingRight;
    };
  }, []);

  // Escape closes; Tab stays trapped inside the dialog.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {open && (
        <motion.div
          key="works-overlay"
          className="fixed inset-0 z-[60]"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={backdropVariants}
            onClick={close}
            aria-hidden
            className="absolute inset-0 bg-[#0c0c0c]/50"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 sm:p-6 md:p-10 min-[1440px]:px-[103px] min-[1440px]:py-[92px]">
            <motion.div
              ref={panelRef}
              variants={panelVariants}
              role="dialog"
              aria-modal="true"
              aria-labelledby="works-overlay-title"
              className="pointer-events-auto relative flex h-full max-h-[840px] w-full max-w-[1234px] flex-col gap-6 overflow-hidden rounded-3xl border border-[#f6f6f6] bg-white px-5 pt-5 shadow-[0px_4px_32px_0px_rgba(0,0,0,0.25)] will-change-[filter] backface-hidden md:gap-10 md:px-12 md:pt-12"
            >
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="works-overlay-title"
                  className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-black md:text-[40px]"
                >
                  Works
                </h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close works"
                  className="flex size-[46px] shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#f5f5f5] bg-[#eaeaec] text-black shadow-[0px_4px_8px_0px_rgba(25,25,25,0.03),inset_0px_-4px_24px_0px_#f5f5f5] transition-colors hover:bg-[#e0e0e4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <X className="size-6" strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <section
                // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard-focusable
                tabIndex={0}
                aria-label="Selected works"
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              >
                <div className="flex flex-col gap-16 pb-10 md:pb-12">
                  {PUBLISHED_PROJECTS.map((project, projectIndex) => (
                    <motion.section
                      key={project.name}
                      {...riseInView(projectIndex === 0 ? 0.25 : 0)}
                      className="flex flex-col gap-3 will-change-[filter] backface-hidden"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-lg font-medium text-[#0a0a0a]">
                            {project.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {project.description}
                          </p>
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
                            loading={
                              projectIndex === 0 && i === 0
                                ? "eager"
                                : undefined
                            }
                            className="h-auto w-full rounded-lg border border-[#e5e5e5]"
                            sizes="(max-width: 768px) 95vw, (max-width: 1400px) 88vw, 1138px"
                          />
                        ))}
                      </div>
                    </motion.section>
                  ))}
                </div>
              </section>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-8px_12px_0px_rgba(246,246,246,0.5)]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorksOverlay;
