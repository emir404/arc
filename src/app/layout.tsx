import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import { MotionConfig } from "motion/react";

import HeaderWrapper from "@/components/layout/header-wrapper";

import { Agentation } from "agentation";

/* Inter, as one variable file (wght 100–900 + an optical-size axis Safari and
   Chrome apply automatically), subset to Latin + Latin Extended-A. */
const inter = localFont({
  src: "./fonts/Inter.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

/* Tiempos Text carries the display line only — one weight, one cut. */
const tiempos = localFont({
  src: "./fonts/TiemposText-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
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
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership, trusted by 10+ Y Combinator companies.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@witharc.co",
  },
  sameAs: [
    "https://instagram.com/witharc.co",
    "https://www.linkedin.com/company/design-studio-arc/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://witharc.co"),
  title: {
    default: "Arc Studio",
    template: "%s • Arc",
  },
  description:
    "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership, trusted by 10+ Y Combinator companies.",
  keywords:
    "design studio, startup design, early-stage startups, Y Combinator startups, brand design, product design, web design, UI/UX design, startup branding",
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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 675,
        alt: "Arc • All-in-one design studio for early-stage startups",
        type: "image/png",
      },
    ],
    title: "Arc • All-in-one design studio for early-stage startups",
    description:
      "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership, trusted by 10+ Y Combinator companies.",
    siteName: "Arc Studio",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arcstudio",
    images: [
      {
        url: "/og.png",
        alt: "Arc • All-in-one design studio for early-stage startups",
      },
    ],
    title: "Arc • All-in-one design studio for early-stage startups",
    description:
      "Arc is the all-in-one design studio for early-stage startups. Brand, product, and web design in one partnership, trusted by 10+ Y Combinator companies.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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
        className={`${inter.variable} ${tiempos.variable} font-sans antialiased overflow-x-clip bg-background`}
      >
        <MotionConfig reducedMotion="user">
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
          {modal}
        </MotionConfig>
      </body>
    </html>
  );
}
