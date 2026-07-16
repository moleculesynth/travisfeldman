import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://travisfeldman.org"),
  title: "Travis Feldman — Enter the system. Change it.",
  description:
    "Poems, circuits, spaces, and sound: the work of Travis Feldman across literature, learning, experimental electronics, photography, and music.",
  openGraph: {
    title: "Travis Feldman — Enter the system. Change it.",
    description:
      "Poems, circuits, spaces, and sound—work made to be entered, questioned, and rearranged.",
    type: "website",
    url: "https://travisfeldman.org",
    siteName: "Travis Feldman",
    images: [
      {
        url: "/og-v2.png",
        width: 1730,
        height: 909,
        alt: "Travis Feldman — Enter the system. Change it.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travis Feldman — Enter the system. Change it.",
    description:
      "Poems, circuits, spaces, and sound—work made to be entered, questioned, and rearranged.",
    images: ["/og-v2.png"],
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
