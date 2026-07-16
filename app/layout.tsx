import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travisfeldman.org"),
  title: "Travis Feldman — The life between things",
  description:
    "Poems, circuits, spaces, and sound: the work of Travis Feldman across literature, learning, experimental electronics, photography, and music.",
  openGraph: {
    title: "Travis Feldman — The life between things",
    description:
      "Words, circuits, rooms, and sound—work across literature, learning, electronics, photography, and music.",
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
    title: "Travis Feldman — The life between things",
    description:
      "Words, circuits, rooms, and sound—work across literature, learning, electronics, photography, and music.",
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
