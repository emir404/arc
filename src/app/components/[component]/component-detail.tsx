"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Copy, Check } from "lucide-react";

const REGISTRY_NAMESPACE = "@arc";

const RUNNERS = ["npx", "bunx", "pnpx"] as const;
type Runner = (typeof RUNNERS)[number];

const blurIn = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

function CopyButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className="p-2 rounded-lg text-[#909090] hover:text-[#606060] hover:bg-neutral-200 transition-colors duration-200 cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            exit={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Check size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            exit={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Copy size={16} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export function ComponentDetail({
  title,
  slug,
  preview,
  highlightedHtml,
  sourceCode,
}: {
  title: string;
  slug: string;
  preview: React.ReactNode;
  highlightedHtml: string;
  sourceCode: string;
}) {
  const [runner, setRunner] = useState<Runner>("npx");
  const installCommand = `${runner} shadcn@latest add ${REGISTRY_NAMESPACE}/${slug}`;

  return (
    <div className="flex flex-col w-full px-4 pb-24 md:px-12 lg:px-24 xl:px-32 gap-4">
      <motion.div
        {...blurIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="will-change-[filter] backface-hidden"
      >
        <Link
          href="/components"
          className="inline-flex items-center gap-2 text-sm text-[#909090] hover:text-[#606060] transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </motion.div>

      <motion.div
        {...blurIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex bg-neutral-100 rounded-3xl h-[12rem] md:h-[36rem] items-center justify-center relative overflow-hidden will-change-[filter] backface-hidden"
      >
        <p className="font-mono text-[#909090] tracking-wider uppercase absolute top-8 left-8 font-medium">
          {title}
        </p>
        <div className="flex items-center justify-center">{preview}</div>
      </motion.div>

      <motion.div
        {...blurIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex items-center bg-neutral-100 rounded-3xl px-5 py-3 will-change-[filter] backface-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.code
            key={runner}
            initial={{ filter: "blur(4px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            exit={{ filter: "blur(4px)", opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="font-mono text-sm text-neutral-600 select-all"
          >
            {installCommand}
          </motion.code>
        </AnimatePresence>
        <div className="flex items-center gap-1.5 ml-auto">
          <div role="radiogroup" aria-label="Package runner" className="flex items-center gap-1.5">
            {RUNNERS.map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={runner === r}
                onClick={() => setRunner(r)}
                className={`px-2.5 py-1 rounded-lg text-sm font-mono transition-colors duration-200 cursor-pointer ${
                  runner === r
                    ? "bg-neutral-200 text-neutral-900"
                    : "text-[#909090] hover:text-[#606060]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <CopyButton text={installCommand} label="Copy install command" />
        </div>
      </motion.div>

      <motion.div
        {...blurIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="relative rounded-3xl overflow-hidden bg-neutral-100 will-change-[filter] backface-hidden"
      >
        <div className="absolute top-5 right-5 z-10">
          <CopyButton text={sourceCode} label="Copy source code" />
        </div>
        <div
          className="overflow-auto text-sm [&_pre]:p-6 [&_pre]:m-0 [&_pre]:bg-neutral-100! [&_code]:font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </motion.div>
    </div>
  );
}
