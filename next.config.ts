import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "494510hkri.ufs.sh",
        port: "",
        pathname: "/**",
      },
      // Vercel Blob store holding the newer works (see src/lib/projects.ts).
      {
        protocol: "https",
        hostname: "v5k8hekvpojqzsbx.public.blob.vercel-storage.com",
        port: "",
        pathname: "/works/**",
      },
    ],
  },
};

export default nextConfig;
