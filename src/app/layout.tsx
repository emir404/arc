import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import { MotionConfig } from "motion/react";

import HeaderWrapper from "@/components/layout/header-wrapper";
import { LiveCursorsProvider } from "@/components/live-cursors/live-cursors-provider";

import { Agentation } from "agentation";

const TWKLausanne = localFont({
  src: [
    { path: "./fonts/TWKLausanne-100.woff2", weight: "100", style: "normal" },
    { path: "./fonts/TWKLausanne-100Italic.woff2", weight: "100", style: "italic" },
    { path: "./fonts/TWKLausanne-200.woff2", weight: "200", style: "normal" },
    { path: "./fonts/TWKLausanne-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/TWKLausanne-300Italic.woff2", weight: "300", style: "italic" },
    { path: "./fonts/TWKLausanne-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/TWKLausanne-400Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/TWKLausanne-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/TWKLausanne-500Italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/TWKLausanne-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/TWKLausanne-600Italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/TWKLausanne-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/TWKLausanne-700Italic.woff2", weight: "700", style: "italic" },
    { path: "./fonts/TWKLausanne-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/TWKLausanne-800Italic.woff2", weight: "800", style: "italic" },
    { path: "./fonts/TWKLausanne-900.woff2", weight: "900", style: "normal" },
    { path: "./fonts/TWKLausanne-900Italic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arc Studio",
  url: "https://witharc.co",
  logo: "https://witharc.co/logo.png",
  description:
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design under one roof.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@witharc.co",
  },
  sameAs: [
    "https://instagram.com/witharc.co",
    "https://linkedin.com/company/witharcstudio",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://witharc.co"),
  title: {
    default: "Arc • All-in-one design studio for early-stage startups",
    template: "%s • Arc",
  },
  description:
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design under one roof.",
  keywords:
    "design studio, startup design, early-stage startups, brand design, product design, web design, UI/UX design, startup branding",
  authors: [{ name: "Arc Studio" }],
  creator: "Arc Studio",
  publisher: "Arc Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://witharc.co",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc • All-in-one design studio for early-stage startups",
    description:
      "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design under one roof.",
    siteName: "Arc Studio",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc • All-in-one design studio for early-stage startups",
    description:
      "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design under one roof.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L6GMH3LB5W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-L6GMH3LB5W');
          `}
        </Script>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </head>
      <body
        className={`${TWKLausanne.variable} antialiased overflow-x-hidden bg-background font-sans`}
      >
        <MotionConfig reducedMotion="user">
          <LiveCursorsProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-ring"
            >
              Skip to content
            </a>
            <HeaderWrapper />
            {process.env.NODE_ENV === "development" && (
              <Agentation endpoint="http://127.0.0.1:4747" />
            )}
            <main id="main">
              {children}
            </main>
          </LiveCursorsProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
