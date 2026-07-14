import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "animate.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://stacksanalytics.us"),
  title: "Jacob Stack | Business Intelligence & Analytics",
  description: "Portfolio of Jacob Stack, a Business Intelligence Analyst turning complex data into clear, decision-ready systems.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Jacob Stack | Business Intelligence & Analytics",
    description: "Pipelines, models, dashboards, and narratives built to turn messy data into clear decisions.",
    type: "website",
    images: [{ url: "/og.png", width: 1740, height: 908, alt: "Jacob Stack - Messy data. Clear decisions." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacob Stack | Business Intelligence & Analytics",
    description: "Pipelines, models, dashboards, and narratives built to turn messy data into clear decisions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
