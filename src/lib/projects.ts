export type WorkImage = {
  src: string;
  /** Intrinsic pixel size, so the browser reserves the right box before the
      image loads (no layout shift) and the optimizer knows what it serves. */
  width: number;
  height: number;
};

/**
 * One framed image in the works list. A full-page design taller than the
 * image optimizer's 8192px source cap is stored as consecutive segments,
 * which the frame renders seamlessly as one image.
 */
export type WorkFrame = WorkImage | WorkImage[];

export type Project = {
  name: string;
  description: string;
  year: string;
  /** Flips the site into dark mode while the section is centered in view. */
  dark?: boolean;
  /** Drops the hairline image border (for designs whose own light/gradient
      edges make the border read as a partial outline). */
  borderless?: boolean;
  /** Showreel image (45:32); defaults to the first frame's first image. */
  cover?: WorkImage;
  images: WorkFrame[];
};

/**
 * Vercel Blob store `arc-works` (connected to the arc-8o98 project), holding
 * the newer works. Add a design with
 * `vercel blob put <file> --pathname works/<brand>/<name>.webp`, using the
 * BLOB_READ_WRITE_TOKEN from .env.local.
 */
const BLOB = "https://v5k8hekvpojqzsbx.public.blob.vercel-storage.com/works";
const blob = (path: string) => `${BLOB}/${path}`;

// Projects whose `images` are still empty are awaiting their design uploads;
// they are filtered out of the showreel and works views until populated.
export const PROJECTS: Project[] = [
  {
    name: "Axiom",
    description: "The Only Trading Platform You’ll Ever Need",
    year: "2026",
    dark: true,
    cover: { src: blob("axiom/cover.webp"), width: 2000, height: 1422 },
    images: [
      [
        { src: blob("axiom/landing-1.webp"), width: 2000, height: 7538 },
        { src: blob("axiom/landing-2.webp"), width: 2000, height: 7684 },
      ],
    ],
  },
  {
    name: "Automattic",
    description: "Spacefast, the Publishing Layer for Your Agents",
    year: "2026",
    cover: { src: blob("automattic/cover.webp"), width: 2000, height: 1422 },
    images: [
      [
        { src: blob("automattic/landing-1.webp"), width: 2000, height: 4841 },
        { src: blob("automattic/landing-2.webp"), width: 2000, height: 5991 },
      ],
      { src: blob("automattic/banner.webp"), width: 2000, height: 667 },
      { src: blob("automattic/domains.webp"), width: 2000, height: 1422 },
      { src: blob("automattic/members.webp"), width: 2000, height: 1422 },
    ],
  },
  {
    name: "AgentMail",
    description: "Email for AI Agents",
    year: "2026",
    dark: true,
    images: [
      {
        src: "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w5LTQDLt1oRY7wDTKfMrq8Sn2isyOdjuzhmc3",
        width: 5760,
        height: 4096,
      },
      {
        src: "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wcMT3iMM5XwSYHFfxQrqugz251M6OZPGKCNso",
        width: 5760,
        height: 4744,
      },
      {
        src: "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wveBSEYQzr6o3qQ0XHuiJjTO9KPEfdgxUynIW",
        width: 5760,
        height: 5156,
      },
    ],
  },
  {
    name: "Orchid",
    description: "AI Personal Assistant",
    year: "2026",
    images: [
      { src: "/works/orchid-1.webp", width: 2000, height: 1422 },
      { src: "/works/orchid-2.webp", width: 2000, height: 1283 },
      { src: "/works/orchid-3.webp", width: 2000, height: 1686 },
    ],
  },
];

/** A frame's first image: its list key, and the showreel fallback. */
export const firstImage = (frame: WorkFrame): WorkImage =>
  Array.isArray(frame) ? frame[0] : frame;

/** Projects that currently have at least one design image to show. */
export const PUBLISHED_PROJECTS = PROJECTS.filter(
  (project) => project.images.length > 0,
);

/** One representative image per published project — the showreel "one of each". */
export const SHOWREEL_IMAGES = PUBLISHED_PROJECTS.map(
  (project) => (project.cover ?? firstImage(project.images[0])).src,
);
