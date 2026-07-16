import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travisfeldman.org"),
  title: "Travis Feldman — Literature, Learning, Experimental Sound, Physical Electronics",
  description:
    "Travis Feldman. Literature, learning, experimental sound, and physical electronics.",
  openGraph: {
    title: "Travis Feldman — Literature, Learning, Experimental Sound, Physical Electronics",
    description:
      "Literature, learning, experimental sound, and physical electronics.",
    type: "website",
    url: "https://travisfeldman.org",
    siteName: "Travis Feldman",
    images: [
      {
        url: "/og-blake.jpg",
        width: 1929,
        height: 1745,
        alt: "William Blake’s Spectre over Los, from Jerusalem plate 6",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travis Feldman — Literature, Learning, Experimental Sound, Physical Electronics",
    description:
      "Literature, learning, experimental sound, and physical electronics.",
    images: ["/og-blake.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
