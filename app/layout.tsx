import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travisfeldman.org"),
  title: "Travis Feldman — Scholar, Maker, Composer & Educator",
  description:
    "The work of Travis Feldman across literature, learning design, makerspaces, experimental electronics, photography, and music.",
  openGraph: {
    title: "Travis Feldman — Scholar, Maker, Composer & Educator",
    description:
      "Literature, learning, experimental sound, physical electronics, and the communities that form when people make something together.",
    type: "website",
    url: "https://travisfeldman.org",
    siteName: "Travis Feldman",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Travis Feldman — Scholar, Maker, Composer, Educator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travis Feldman — Scholar, Maker, Composer & Educator",
    description:
      "Scholarship, learning design, experimental electronics, photography, and music.",
    images: ["/og.png"],
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
