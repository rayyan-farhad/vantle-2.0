import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://vantle-2-0.vercel.app"),
  title: "Vantle | Operational intelligence for supermarkets",
  description:
    "Vantle connects supermarket data, detects operational shifts, and prepares governed actions across demand, stock, procurement, and waste.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vantle | The operational layer for supermarkets",
    description:
      "See demand, stock, and waste risks early—then prepare the next governed action.",
    url: "/",
    siteName: "Vantle",
    locale: "en_MY",
    type: "website",
    images: [
      {
        url: "/vantle-hero-signal-poster.jpg",
        width: 1600,
        height: 1000,
        alt: "Vantle operational intelligence signal field",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantle | The operational layer for supermarkets",
    description:
      "See demand, stock, and waste risks early—then prepare the next governed action.",
    images: ["/vantle-hero-signal-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
