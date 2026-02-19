import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/layout/header";
import { LiveCursorsProvider } from "@/components/live-cursors/live-cursors-provider";

import { Agentation } from "agentation";

const OverusedGrotesk = localFont({
  src: "../../public/OverusedGroteskRoman-VF.ttf",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  style: "normal",
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
    "Arc is a global Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
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
    default: "Arc • Creative Studio",
    template: "%s • Arc ",
  },
  description:
    "Arc is a global Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  keywords:
    "web Studio, creative Studio, web development, digital experiences, UI/UX design, web design, digital innovation",
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
    title: "Arc - Creative Web Studio",
    description:
      "Arc is a global studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
    siteName: "Arc Studio",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc - Creative Studio",
    description:
      "Arc is a global studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
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
        className={`${OverusedGrotesk.variable} ${GeistMono.variable} antialiased overflow-x-hidden bg-background font-sans`}
      >
        <LiveCursorsProvider>
          <Header />
          {process.env.NODE_ENV === "development" && (
            <Agentation endpoint="http://127.0.0.1:4747" />
          )}
          {children}
        </LiveCursorsProvider>
      </body>
    </html>
  );
}
