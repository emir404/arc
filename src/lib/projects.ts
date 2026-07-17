export type Project = {
  name: string;
  description: string;
  year: string;
  /** Flips the site into dark mode while the section is centered in view. */
  dark?: boolean;
  images: string[];
};

// Projects whose `images` are still empty are awaiting their design uploads;
// they are filtered out of the showreel and works views until populated.
export const PROJECTS: Project[] = [
  {
    name: "Sim",
    description: "Agent Workflow Builder",
    year: "2025",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wdQY0JGCEtBUvonjplAG039xzaROYHSZCwWbN",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w36URyDVNUM8wsF1VBZOHcvIdTi9DhgQ7Rpmu",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wt8TS6XMYZjvNFCAUWr1ncwPQR7T4hm8pI5kV",
    ],
  },
  {
    name: "AgentMail",
    description: "Email for AI Agents",
    year: "2025",
    dark: true,
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w5LTQDLt1oRY7wDTKfMrq8Sn2isyOdjuzhmc3",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wcMT3iMM5XwSYHFfxQrqugz251M6OZPGKCNso",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wveBSEYQzr6o3qQ0XHuiJjTO9KPEfdgxUynIW",
    ],
  },
  {
    name: "AgentPhone",
    description: "Phone Numbers for AI Agents",
    year: "2025",
    dark: true,
    images: [
      "/works/agentphone-1.webp",
      "/works/agentphone-2.webp",
      "/works/agentphone-3.png",
    ],
  },
  {
    name: "Orchid",
    description: "AI Personal Assistant",
    year: "2025",
    images: [
      "/works/orchid-1.webp",
      "/works/orchid-2.webp",
      "/works/orchid-3.webp",
    ],
  },
  {
    name: "The Hog",
    description: "The Complete Web Intelligence API",
    year: "2025",
    images: [
      "/works/thehog-1.webp",
      "/works/thehog-2.png",
      "/works/thehog-3.png",
    ],
  },
  {
    name: "Bloom",
    description: "The Brand Layer for Agents",
    year: "2025",
    images: [
      "/works/bloom-1.webp",
      "/works/bloom-2.webp",
      "/works/bloom-3.webp",
    ],
  },
  {
    name: "Lantern",
    description: "Your Marketing Team, but 50% Smaller",
    year: "2025",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wFVCkWZEPMGNpU9kvXazwSY5JBur4xRVbDceI",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wlp6RkJeu8cHmb9N4ef5r2S7WwnKEFpXG0QCJ",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wLHFQ4CW2jANIaUiTJPEQpOBsS7c8ltMZRmfn",
    ],
  },
];

/** Projects that currently have at least one design image to show. */
export const PUBLISHED_PROJECTS = PROJECTS.filter(
  (project) => project.images.length > 0,
);

/** One representative image per published project — the showreel "one of each". */
export const SHOWREEL_IMAGES = PUBLISHED_PROJECTS.map(
  (project) => project.images[0],
);
