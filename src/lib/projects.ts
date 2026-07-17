export type Project = {
  name: string;
  description: string;
  year: string;
  /** Flips the site into dark mode while the section is centered in view. */
  dark?: boolean;
  images: string[];
};

export const PROJECTS: Project[] = [
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
    name: "Chonkie",
    description: "Deep Research on Autopilot",
    year: "2025",
    dark: true,
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wFPcqVtEPMGNpU9kvXazwSY5JBur4xRVbDceI",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wsf1MmoKdV43Lz6lOhvKw819nkosQjyH5AJW0",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w05J9KvFgUTyWaSqPprmYFheIGsi3BcZ0MCt2",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wrIx48TnFtc80pzOYxZ3yevLma4hXGJluCH9i",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w0hVmo4bFgUTyWaSqPprmYFheIGsi3BcZ0MCt",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wLRHVRAW2jANIaUiTJPEQpOBsS7c8ltMZRmfn",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wen7FohqjRlPG17m9zJBSoEhDXY8pgaNuTfwM",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wHuJcP5IyKkDSOZiG1hIAbQ39vtTzYqmW5UfC",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wwizPWPeybJe8R9xiXtAMghY0op6WKcvIlBTH",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8weSxhLFqjRlPG17m9zJBSoEhDXY8pgaNuTfwM",
    ],
  },
  {
    name: "Lantern",
    description: "Your Marketing Team, but 50% Smaller",
    year: "2025",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wFVCkWZEPMGNpU9kvXazwSY5JBur4xRVbDceI",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wlp6RkJeu8cHmb9N4ef5r2S7WwnKEFpXG0QCJ",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8w5RL7mEt1oRY7wDTKfMrq8Sn2isyOdjuzhmc3",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wbe5Pc3LBCqzLi02RGOd5NM3WkBlxSgAIyhVc",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wLHFQ4CW2jANIaUiTJPEQpOBsS7c8ltMZRmfn",
    ],
  },
  {
    name: "Toolwind",
    description: "Tools Tailwind Forgot to Ship",
    year: "2025",
    images: [
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wlR0Ucyeu8cHmb9N4ef5r2S7WwnKEFpXG0QCJ",
      "https://494510hkri.ufs.sh/f/3d9AyaVNUM8wy8uOT8Ax91qLQBH2b0rgJkEZ3WhORIzdynMp",
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
