import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travisfeldman.org"),
  title: "Travis Feldman — Objects, Signals, Images, Language",
  description:
    "Travis Feldman: physical electronics, photography, experimental sound, games, moving images, and shared learning spaces.",
  openGraph: {
    title: "Travis Feldman — Objects, Signals, Images, Language",
    description:
      "Physical electronics, photography, experimental sound, games, moving images, and shared learning spaces.",
    type: "website",
    url: "https://travisfeldman.org",
    siteName: "Travis Feldman",
    images: [
      {
        url: "/og-visual.png",
        width: 1731,
        height: 909,
        alt: "Travis Feldman — Objects, Signals, Images, Language, with Molecule Synth, Micrographia, and BPOW imagery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travis Feldman — Objects, Signals, Images, Language",
    description:
      "Physical electronics, photography, experimental sound, games, moving images, and shared learning spaces.",
    images: ["/og-visual.png"],
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
