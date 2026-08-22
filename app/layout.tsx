import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seth Arya | Premium AI/ML & Full-Stack Developer Portfolio",
  description: "Explore the premium portfolio of Seth Arya, an expert AI/ML engineer and full-stack software developer. Discover projects, certifications, and technical dashboard metrics.",
  keywords: ["AI Engineer", "MLOps", "Full Stack Developer", "Next.js Portfolio", "React 19", "FastAPI Developer"],
  authors: [{ name: "Seth Arya" }],
  openGraph: {
    title: "Seth Arya | Premium AI/ML & Full-Stack Developer",
    description: "Sleek, responsive dark-theme developer portfolio featuring vector RAG chatbot tools, task board systems, and live simulated dashboard progress indices.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#020024]">{children}</body>
    </html>
  );
}
