import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const OverusedGroteskRoman = localFont({
  src: "/fonts/OverusedGroteskRoman.woff",
  variable: "--font-overused",
});

const InstrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Arc - Creative Web Agency",
  description: "Arc is a global web agency focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  keywords: "web agency, creative agency, web development, digital experiences, UI/UX design, web design, digital innovation",
  authors: [{ name: "Arc Creative Agency" }],
  creator: "Arc Creative Agency",
  publisher: "Arc Creative Agency",
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
    url: "https://arc-agency.com",
    title: "Arc - Creative Web Agency",
    description: "Arc is a global web agency focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
    siteName: "Arc Creative Agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arc - Creative Web Agency",
    description: "Arc is a global web agency focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
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
      </head>
      <body
        className={`${OverusedGroteskRoman.variable} ${InstrumentSerif.variable} antialiased dark bg-background font-overused`}
      >
        {children}
      </body>
    </html>
  );
}
