import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

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
  title: "Harsh Pandya | Backend & Distributed Systems Engineer",
  description: "Portfolio of Harsh Pandya, a backend-focused Software Engineer specializing in distributed systems, spring boot, caching, and scalable system design.",
  keywords: [
    "Harsh Pandya",
    "Backend Engineer",
    "Software Engineer",
    "Distributed Systems",
    "System Design",
    "Spring Boot",
    "Java Developer",
    "Scalability",
    "Google Software Engineer",
    "Navrachana University",
  ],
  authors: [{ name: "Harsh Pandya", url: "https://github.com/ha31457" }],
  creator: "Harsh Pandya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshpandya.dev", // Placeholder/fallback
    title: "Harsh Pandya | Backend & Distributed Systems Engineer",
    description: "Backend Engineer specialized in building scalable, reliable distributed systems and production-grade architectures.",
    siteName: "Harsh Pandya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Pandya | Backend & Distributed Systems Engineer",
    description: "Backend Engineer specialized in building scalable, reliable distributed systems.",
    creator: "@ha31457",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground scroll-smooth">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
