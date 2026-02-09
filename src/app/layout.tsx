import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/layout/header";

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
  name: "Arc Creative Studio",
  url: "https://witharc.co",
  logo: "https://witharc.co/logo.png",
  description:
    "Arc is a global web Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
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
  title: {
    default: "Arc • Creative Web Studio",
    template: "%s • Arc ",
  },
  description:
    "Arc is a global web Studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  keywords:
    "web Studio, creative Studio, web development, digital experiences, UI/UX design, web design, digital innovation",
  authors: [{ name: "Arc Creative Studio" }],
  creator: "Arc Creative Studio",
  publisher: "Arc Creative Studio",
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
      "Arc is a global web studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
    siteName: "Arc Creative Studio",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://witharc.co/thumbnail.png"],
    title: "Arc - Creative Web Studio",
    description:
      "Arc is a global web studio focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
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
        <Script
          defer
          data-website-id="68165f18fba37b98f0bbc62f"
          data-domain="witharc.co"
          src="https://datafa.st/js/script.js"
        ></Script>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </head>
      <body
        className={`${OverusedGrotesk.variable}  antialiased overflow-x-hidden bg-background font-sans`}
      >
        <Header />
        {process.env.NODE_ENV === "development" && (
          <Agentation endpoint="http://127.0.0.1:4747" />
        )}
        {children}
      </body>
    </html>
  );
}
