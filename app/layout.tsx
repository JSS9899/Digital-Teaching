import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curriculum Ideas Cymru",
  description: "Browse Curriculum for Wales descriptors and practical teaching ideas for progression steps 1 to 3.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">{children}</body>
    </html>
  );
}
