import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/sections/footer";
import { LenisWrapper } from "@/components/ui/lenis-wrapper";
import { GridPattern } from "@/components/magicui/grid-pattern";

const ManropeFont = Manrope({
  weight: ["200","300","400","500","600","700","800"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true,
});

const InstrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: 'swap',
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
  "name": "Arc Creative Agency",
  "url": "https://witharc.co",
  "logo": "https://witharc.co/logo.png",
  "description": "Arc is a global web agency focused on blending innovation, creativity, and cutting-edge technology to craft unique, high-impact digital experiences.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@witharc.co"
  },
  "sameAs": [
    "https://instagram.com/witharc.co",
    "https://linkedin.com/company/witharcstudio"
  ]
};

export const metadata: Metadata = {
  title: {
    default: "Arc • Creative Web Agency",
    template: "%s • Arc ",
  },
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
    url: "https://witharc.co",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${ManropeFont.variable} ${InstrumentSerif.variable} antialiased overflow-x-hidden bg-background font-manrope flex justify-center sm:px-20 md:px-72`}
      >
        <div className="sm:border-l sm:border-r relative flex flex-col min-h-screen sm:px-12 md:px-20 ">
          <Header/>
          <LenisWrapper>
            {children}
          </LenisWrapper>
          <Footer />
          <GridPattern className="sm:stroke-gray-400/20 md:stroke-gray-400/20 -z-10"/>
        </div>
      </body>
    </html>
  );
}
