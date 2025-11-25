import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import Header & Footer (correct path)
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://appscrip-task-akhila-demo.com"),
  title: {
    default: "Discover Artisan Goods | Appscrip Task – Akhila Koyada",
    template: "%s | Appscrip Task – Akhila Koyada",
  },
  description:
    "Browse a curated grid of premium lifestyle goods, handcrafted leather accessories, and playful accents inspired by the Appscrip reference layout.",
  applicationName: "Appscrip Merch Catalog",
  keywords: [
    "ecommerce",
    "ssr",
    "appscrip task",
    "next.js",
    "mock api",
    "lifestyle products",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Discover Artisan Goods",
    description:
      "Server-rendered catalog experience for the Appscrip hiring task.",
    url: "https://appscrip-task-akhila-demo.com",
    siteName: "Appscrip Merch Catalog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appscrip SSR Merch Catalog",
    description:
      "A lightweight SSR storefront built with Next.js and fakestoreapi.com.",
  },
  category: "ecommerce",
  authors: [{ name: "Akhila Koyada" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
