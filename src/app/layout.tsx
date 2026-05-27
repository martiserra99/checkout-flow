import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Checkout Flow — Formity",
  description:
    "A multi-step checkout form with a live order summary sidebar. See how to keep an outside component in sync with form values in real time.",
  openGraph: {
    siteName: "Formity",
  },
  appleWebApp: {
    title: "Formity",
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
      className={`${dmSans.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="h-screen overflow-hidden font-sans">{children}</body>
    </html>
  );
}
