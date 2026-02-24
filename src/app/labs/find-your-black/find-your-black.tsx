"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HexColorPicker } from "react-colorful";

// --- Color math ---

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  if (s === 0) {
    const v = Math.round(l * 255);
    return `#${v.toString(16).padStart(2, "0").repeat(3)}`;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h / 360) * 255);
  const b = Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function deriveBlack(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s] = rgbToHsl(r, g, b);
  const newS = Math.min(s * 0.33, 0.33);
  return hslToHex(h, newS, 0.047);
}

function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(hex);
}

function getContrastColor(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
    ? "#000000"
    : "#ffffff";
}

// --- Contrast ---

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r / 255) + 0.7152 * srgbToLinear(g / 255) + 0.0722 * srgbToLinear(b / 255);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Returns the brand color if it has enough contrast against bg, otherwise white */
function previewTextColor(brandHex: string, bgHex: string): string {
  return contrastRatio(brandHex, bgHex) >= 3 ? brandHex : "#ffffff";
}

// --- RGB → OKLCH ---
function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);

  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bk = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const C = Math.sqrt(a * a + bk * bk);
  let H = (Math.atan2(bk, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return [L, C, H];
}

// --- Format converters ---

type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

function formatColor(hex: string, format: ColorFormat): string {
  if (format === "hex") return hex;
  const [r, g, b] = hexToRgb(hex);
  if (format === "rgb") return `rgb(${r}, ${g}, ${b})`;
  if (format === "hsl") {
    const [h, s, l] = rgbToHsl(r, g, b);
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }
  // oklch
  const [L, C, H] = rgbToOklch(r, g, b);
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;
}

// --- Entrance animation ---

const blur = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const ease = [0.25, 0.1, 0.25, 1] as const;

// --- Small components ---

function CopyButton({
  value,
  variant = "dark",
}: {
  value: string;
  variant?: "dark" | "light";
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  }, [value]);

  const bg =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/20 focus-visible:ring-white/50 text-white"
      : "bg-black/5 hover:bg-black/10 focus-visible:ring-black/20 text-black";

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${bg}`}
      aria-label={`Copy ${value} to clipboard`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <CheckIcon />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <CopyIcon />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="font-mono">{value}</span>
    </button>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted-foreground shrink-0">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// --- Format selector ---

const FORMATS: ColorFormat[] = ["hex", "rgb", "hsl", "oklch"];

function FormatTabs({
  value,
  onChange,
}: {
  value: ColorFormat;
  onChange: (f: ColorFormat) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label="Color format">
      {FORMATS.map((f) => (
        <button
          key={f}
          type="button"
          role="tab"
          aria-selected={value === f}
          onClick={() => onChange(f)}
          className={`relative flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            value === f
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {value === f && (
            <motion.div
              layoutId="format-tab"
              className="absolute inset-0 rounded-md bg-background shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 uppercase">{f}</span>
        </button>
      ))}
    </div>
  );
}

// --- Presets ---

const PRESETS = [
  { label: "Cream", hex: "#efeac9" },
  { label: "Blue", hex: "#3b82f6" },
  { label: "Coral", hex: "#f97066" },
  { label: "Emerald", hex: "#34d399" },
  { label: "Violet", hex: "#8b5cf6" },
  { label: "Amber", hex: "#f59e0b" },
  { label: "Rose", hex: "#f43f5e" },
  { label: "Cyan", hex: "#06b6d4" },
  { label: "Lime", hex: "#84cc16" },
  { label: "Fuchsia", hex: "#d946ef" },
];

// --- Main ---

export function FindYourBlack() {
  const [brandColor, setBrandColor] = useState("#efeac9");
  const [inputValue, setInputValue] = useState("#efeac9");
  const [format, setFormat] = useState<ColorFormat>("hex");
  const inputRef = useRef<HTMLInputElement>(null);

  const yourBlack = deriveBlack(brandColor);
  const brandContrast = getContrastColor(brandColor);

  const brandFormatted = formatColor(brandColor, format);
  const blackFormatted = formatColor(yourBlack, format);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      setInputValue(val);
      if (!val.startsWith("#")) val = `#${val}`;
      if (isValidHex(val)) {
        setBrandColor(val.startsWith("#") ? val : `#${val}`);
      }
    },
    []
  );

  const handlePickerChange = useCallback((hex: string) => {
    setBrandColor(hex);
    setInputValue(hex);
  }, []);

  const handlePreset = useCallback((hex: string) => {
    setBrandColor(hex);
    setInputValue(hex);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (mq.matches && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section className="min-h-[calc(100dvh-8rem)] px-5 md:px-12 lg:px-24 xl:px-32 pt-4 md:pt-8 pb-16 md:pb-24">
      {/* Hero heading */}
      <motion.h1
        {...blur}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-[-0.03em] leading-[1] will-change-[filter] backface-hidden mb-3"
      >
        Find Your Black
      </motion.h1>
      <motion.p
        {...fade}
        transition={{ duration: 0.5, ease, delay: 0.15 }}
        className="text-muted-foreground text-base md:text-lg max-w-md mb-16 md:mb-20"
      >
        Pure #000 is harsh. Derive a near-black tinted with your brand
        color&rsquo;s hue.
      </motion.p>

      {/* Two-column layout */}
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-8">
        {/* Left — picker + input + result */}
        <motion.div
          {...fade}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="flex flex-col gap-6 xl:w-[520px] shrink-0"
        >
          {/* Color picker */}
          <HexColorPicker color={brandColor} onChange={handlePickerChange} />

          {/* Hex input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#efeac9"
            spellCheck={false}
            autoComplete="off"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-shadow"
            aria-label="Brand color hex value"
          />

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.hex}
                type="button"
                onClick={() => handlePreset(p.hex)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer"
                aria-label={`Use ${p.label} preset: ${p.hex}`}
              >
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: p.hex }}
                  aria-hidden="true"
                />
                {p.label}
              </button>
            ))}
          </div>

          {/* Format tabs */}
          <FormatTabs value={format} onChange={setFormat} />

          {/* Result: brand → your black */}
          <div className="flex items-center gap-3">
            <motion.div
              className="flex-1 min-w-0 rounded-xl p-4 flex flex-col justify-between aspect-[3/2]"
              style={{ backgroundColor: brandColor }}
              animate={{ backgroundColor: brandColor }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-[10px] font-medium uppercase tracking-widest opacity-50"
                style={{ color: brandContrast }}
              >
                Brand
              </span>
              <CopyButton
                value={brandFormatted}
                variant={brandContrast === "#000000" ? "light" : "dark"}
              />
            </motion.div>

            <ArrowIcon />

            <motion.div
              className="flex-1 min-w-0 rounded-xl p-4 flex flex-col justify-between aspect-[3/2]"
              style={{ backgroundColor: yourBlack }}
              animate={{ backgroundColor: yourBlack }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                Your Black
              </span>
              <CopyButton value={blackFormatted} />
            </motion.div>
          </div>
        </motion.div>

        {/* Right — comparison cards */}
        <motion.div
          {...fade}
          transition={{ duration: 0.5, ease, delay: 0.45 }}
          className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden"
        >
          {/* With pure #000000 */}
          <div
            className="rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between bg-black overflow-hidden"
          >
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-5">
              With #000000
            </p>
            <motion.p
              className="text-2xl md:text-3xl font-medium leading-[1.2] break-words"
              style={{ color: previewTextColor(brandColor, "#000000") }}
              animate={{ color: previewTextColor(brandColor, "#000000") }}
              transition={{ duration: 0.3 }}
            >
              The quick brown fox jumps over the lazy dog.
            </motion.p>
          </div>

          {/* With your black */}
          <motion.div
            className="rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between overflow-hidden"
            style={{ backgroundColor: yourBlack }}
            animate={{ backgroundColor: yourBlack }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/30 mb-5">
              With {yourBlack}
            </p>
            <motion.p
              className="text-2xl md:text-3xl font-medium leading-[1.2] break-words"
              style={{ color: previewTextColor(brandColor, yourBlack) }}
              animate={{ color: previewTextColor(brandColor, yourBlack) }}
              transition={{ duration: 0.3 }}
            >
              The quick brown fox jumps over the lazy dog.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
